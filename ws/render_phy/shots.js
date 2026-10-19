// usage: node shots.js t1 t2 ... -> shot_<t>.png
const { chromium } = require('playwright'); const { open } = require('./common');
(async () => {
  const { b, p } = await open(chromium);
  p.on('console', m => console.log('console', m.text()));
  for (const t of process.argv.slice(2)) {
    await p.evaluate(t => window.__setT(t), +t);
    await p.waitForTimeout(60);
    await p.screenshot({ path: __dirname + '/shot_' + t + '.png', clip: { x: 0, y: 0, width: 1920, height: 1080 } });
  }
  await b.close();
})();
