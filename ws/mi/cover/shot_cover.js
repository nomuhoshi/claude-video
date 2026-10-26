const { chromium } = require('playwright'); const fs = require('fs');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const src = 'file://' + __dirname + '/cover_mi.html';
  let p = await b.newPage({ viewport: { width: 1920, height: 1080 } }); await p.goto(src); await p.waitForTimeout(700); await p.screenshot({ path: __dirname + '/w.png' });
  p = await b.newPage({ viewport: { width: 1080, height: 1440 }, deviceScaleFactor: 1.5 }); await p.goto(src + '#dy'); await p.reload(); await p.waitForTimeout(700); await p.screenshot({ path: __dirname + '/v.png' });
  await b.close();
})();
