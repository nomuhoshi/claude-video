// node shot.js t1 t2 ... -> shots/s_<t>.png
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--font-render-hinting=none'] });
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  p.on('pageerror', e => console.error('pageerror', e.message)); p.on('console', m => console.log('console', m.text()));
  await p.goto('file://' + __dirname + '/php.html'); await p.waitForFunction(() => window.__ready); await p.waitForTimeout(300);
  require('fs').mkdirSync(__dirname + '/shots', { recursive: true });
  for (const t of process.argv.slice(2)) { await p.evaluate(t => window.__setT(t), +t); await p.screenshot({ path: __dirname + '/shots/s_' + t + '.png' }); }
  await b.close();
})();
