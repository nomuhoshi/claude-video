const { chromium } = require('playwright'); const fs = require('fs'); const { open } = require('./common');
(async () => {
  const { b, p } = await open(chromium);
  const b64 = await p.evaluate(() => window.__renderAudio());
  fs.writeFileSync(__dirname + '/audio.wav', Buffer.from(b64, 'base64'));
  console.log('wav bytes', fs.statSync(__dirname + '/audio.wav').size);
  await b.close();
})();
