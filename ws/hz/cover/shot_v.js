const { chromium } = require('playwright');
(async () => { const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--font-render-hinting=none'] });
  const p = await b.newPage({ viewport: { width: 1080, height: 1440 } }); await p.goto('file://' + __dirname + '/cover_hz_v.html'); await p.waitForTimeout(800);
  await p.screenshot({ path: '/home/claude/cover_hertz_vertical_1080x1440.png' }); await b.close(); })();
