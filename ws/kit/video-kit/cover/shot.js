// usage: node shot.js cover.html cover.png <fontdir>   -> 1273x716 png (design is 1920x1080, scaled)
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1273 / 1920 });
  await p.goto('file://' + process.argv[2]);
  await p.addStyleTag({ content: '@font-face{font-family:"IBM Plex Mono";font-weight:500;src:url("file://' + process.argv[4] + 'ibm-plex-mono-latin-500-normal.woff2")}' });
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(500);
  await p.screenshot({ path: process.argv[3], type: 'png' });
  await b.close();
})();
