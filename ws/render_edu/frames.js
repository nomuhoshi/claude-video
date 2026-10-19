// node frames.js v1 start end out.mp4   |  node frames.js v1 meta  |  node frames.js v1 shots t1,t2,...
const { chromium } = require('playwright'); const { spawn } = require('child_process'); const path = require('path'), fs = require('fs');
const [, , v, a1, a2, out] = process.argv;
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--font-render-hinting=none'] });
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  p.on('pageerror', e => console.error('pageerror', e.message)); p.on('console', m => m.type() === 'error' && console.error(m.text()));
  await p.goto('file://' + path.join(__dirname, v + '.html')); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(500);
  if (a1 === 'meta') { fs.writeFileSync(path.join(__dirname, v + '_meta.json'), JSON.stringify(await p.evaluate(() => window.META))); }
  else if (a1 === 'shots') { for (const t of a2.split(',')) { await p.evaluate(t => window.__setT(t), +t); await p.screenshot({ path: path.join(__dirname, 'shots', `${v}_${t}.jpg`), type: 'jpeg', quality: 80 }); } }
  else {
    const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', '30', '-c:v', 'mjpeg', '-i', '-', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '15', '-pix_fmt', 'yuv420p', out], { stdio: ['pipe', 'inherit', 'inherit'] });
    for (let f = +a1; f < +a2; f++) { await p.evaluate(t => window.__setT(t), f / 30);
      const img = await p.screenshot({ type: 'jpeg', quality: 93 }); if (!ff.stdin.write(img)) await new Promise(r => ff.stdin.once('drain', r)); }
    ff.stdin.end(); await new Promise(r => ff.on('close', r));
  }
  await b.close();
})();
