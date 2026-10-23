// node frames.js <f0> <f1> <out.mp4>  — renders demo.html frames at 30 fps
const { chromium } = require('playwright'); const { spawn } = require('child_process');
const [, , f0, f1, out] = process.argv; const FPS = 30;
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--font-render-hinting=none'] });
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  p.on('pageerror', e => console.error('pageerror', e.message));
  await p.goto('file://' + __dirname + '/php.html'); await p.waitForFunction(() => window.__ready); await p.waitForTimeout(300);
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '14', '-pix_fmt', 'yuv420p', '-r', String(FPS), out], { stdio: ['pipe', 'inherit', 'inherit'] });
  const t0 = Date.now();
  for (let f = +f0; f < +f1; f++) {
    await p.evaluate(t => window.__setT(t), f / FPS);
    const img = await p.screenshot({ type: 'jpeg', quality: 94 });
    if (!ff.stdin.write(img)) await new Promise(r => ff.stdin.once('drain', r));
    if ((f - f0) % 100 === 0) console.log('frame', f, ((Date.now() - t0) / 1000).toFixed(0) + 's');
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r)); await b.close(); console.log('done', out);
})();
