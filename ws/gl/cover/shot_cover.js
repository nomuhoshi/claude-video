const { chromium } = require('playwright'); const fs = require('fs');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const src = 'file://' + '/home/claude/claude-video/ws/kit/video-kit/cover/cover_gl.html';
  let p = await b.newPage({ viewport: { width: 1920, height: 1080 } }); await p.goto(src); await p.waitForTimeout(700); await p.screenshot({ path: 'w.png' });
  p = await b.newPage({ viewport: { width: 1080, height: 1440 }, deviceScaleFactor: 1.5 }); await p.goto(src + '#dy'); await p.reload(); await p.waitForTimeout(700); await p.screenshot({ path: 'v.png' });
  await b.close();
})();
