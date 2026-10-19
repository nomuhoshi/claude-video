// usage: node shot_wh.js cover.html out.png W H   -> W x H png at 1:1
const { chromium } = require('playwright');
(async () => { const [,, f, out, W, H, S] = process.argv;
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const p = await b.newPage({ viewport: { width: +W, height: +H }, deviceScaleFactor: +(S||1) });
  await p.goto('file://' + f); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(500);
  await p.screenshot({ path: out }); await b.close(); })();
