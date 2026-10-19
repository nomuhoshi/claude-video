const fs = require('fs'), path = require('path');
const FONT = path.join(__dirname, 'node_modules/@fontsource/ibm-plex-mono/files/');
const css = `
@font-face{font-family:"IBM Plex Mono";font-weight:400;src:url("file://${FONT}ibm-plex-mono-latin-400-normal.woff2")}
@font-face{font-family:"IBM Plex Mono";font-weight:500;src:url("file://${FONT}ibm-plex-mono-latin-500-normal.woff2")}
.stagewrap{position:fixed!important;inset:0;z-index:99;background:#000;display:block!important;padding:0!important}
.frame{width:1920px!important;height:1080px!important;max-width:none!important;border:0!important;border-radius:0!important}
.ctrl,.bigplay{display:none!important}
.scene,.scene.chap{transition:none!important}`;
async function open(chromium, vp) {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--font-render-hinting=none'] });
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  p.on('pageerror', e => console.error('pageerror', e.message));
  await p.goto('file://' + path.join(__dirname, 'render.html'));
  await p.addStyleTag({ content: css });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(800);
  return { b, p };
}
module.exports = { open };
