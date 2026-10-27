const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--font-render-hinting=none'] });
  const src = 'file://' + __dirname + '/cover_lo.html';
  const jobs = [['w', 1920, 1080, 1273 / 1920, 'w.png'], ['f', 1440, 1080, 1280 / 1440, 'f.png'], ['v', 1080, 1440, 1.5, 'v.png']];
  for (const [m, w, h, s, out] of jobs) {
    const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: s });
    await p.goto(src + '#' + m); await p.reload(); await p.waitForFunction('window.__done===true'); await p.waitForTimeout(400);
    await p.screenshot({ path: __dirname + '/' + out }); await p.close();
  }
  await b.close();
})();
