const { chromium } = require('playwright');
(async () => { const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--font-render-hinting=none'] });
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 } }); await p.goto('file://' + __dirname + '/cover_hz.html'); await p.waitForTimeout(800);
  await p.screenshot({ path: __dirname + '/cover_full.png' }); await b.close(); })();
