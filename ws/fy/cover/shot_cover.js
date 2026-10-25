const { chromium } = require('playwright');
(async () => { const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--font-render-hinting=none'] });
  const photo = process.argv[2] ? '&photo=' + encodeURIComponent(process.argv[2]) : '';
  for (const [n, w, h] of [['16x9', 1273, 716], ['4x3', 1280, 960], ['v', 1080, 1440]]) {
    const p = await b.newPage({ viewport: { width: w, height: h } }); await p.goto('file://' + __dirname + '/cover_fy.html?w=' + w + '&h=' + h + photo); await p.waitForTimeout(700);
    await p.screenshot({ path: __dirname + '/cover_' + n + '.png' }); await p.close(); }
  await b.close(); })();
