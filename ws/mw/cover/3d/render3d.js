const { chromium } = require('playwright'); const fs = require('fs'); const { spawn } = require('child_process');
(async () => {
  const srv = spawn('python3', ['-m', 'http.server', '8765', '--bind', '127.0.0.1'], { cwd: __dirname, stdio: 'ignore' });
  await new Promise(r => setTimeout(r, 800));
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const modes = process.argv[2] ? [process.argv[2]] : ['w', 'v'];
  for (const m of modes) {
    const p = await b.newPage({ viewport: { width: m === 'w' ? 1920 : 1080, height: m === 'w' ? 1080 : 1440 } });
    p.on('console', x => console.log('[page]', x.text())); p.on('pageerror', e => console.log('[err]', e.message));
    await p.goto('http://127.0.0.1:8765/scene.html' + (m === 'v' ? '#dy' : '')); if (m === 'v') await p.reload();
    await p.waitForFunction('window.__done===true', null, { timeout: 120000 });
    const d = await p.evaluate(() => document.querySelector('canvas').toDataURL('image/png'));
    fs.writeFileSync(__dirname + '/scene_' + m + '.png', Buffer.from(d.split(',')[1], 'base64'));
    const o = await p.evaluate(() => window.__out); fs.writeFileSync(__dirname + '/pts_' + m + '.js', 'window.PTS=' + JSON.stringify(o) + ';');
    console.log(m, 'ok');
  }
  await b.close(); srv.kill();
})();
