// usage: node frames.js <startFrame> <endFrameExclusive> <out.mp4>
const { chromium } = require('playwright'); const { spawn } = require('child_process'); const { open } = require('./common');
const [, , f0, f1, out] = process.argv; const FPS = 30;
(async () => {
  const { b, p } = await open(chromium);
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '14', '-pix_fmt', 'yuv420p', '-r', String(FPS), out], { stdio: ['pipe', 'inherit', 'inherit'] });
  const t0 = Date.now();
  for (let f = +f0; f < +f1; f++) {
    await p.evaluate(t => window.__setT(t), f / FPS);
    const img = await p.screenshot({ type: 'jpeg', quality: 93, clip: { x: 0, y: 0, width: 1920, height: 1080 } });
    if (!ff.stdin.write(img)) await new Promise(r => ff.stdin.once('drain', r));
    if ((f - f0) % 100 === 0) console.log('frame', f, ((Date.now() - t0) / 1000).toFixed(0) + 's');
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r)); await b.close(); console.log('done', out);
})();
