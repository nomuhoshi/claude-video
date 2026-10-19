// usage: node shot43.js cover.html out.png fontdir -> 4:3 crop (center 1440x1080 of the 1920x1080 design) at 1280x960
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1280 / 1440 });
  await p.goto('file://' + process.argv[2]); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(500);
  await p.screenshot({ path: process.argv[3], type: 'png', clip: { x: 240, y: 0, width: 1440, height: 1080 } });
  await b.close();
})();
