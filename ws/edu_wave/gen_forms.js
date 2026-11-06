// node gen_forms.js v5  → v5_forms.js（window.FORMS = {id:{w,h,b}}），公式取自 forms_v5.json
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const katex = require('/opt/npm-tools/node_modules/katex'); const KD = '/opt/npm-tools/node_modules/katex/dist/';
const v = process.argv[2]; const forms = JSON.parse(fs.readFileSync(path.join(__dirname, `forms_${v}.json`), 'utf8'));
const macros = { '\\gd': '\\textcolor{##FFC857}{#1}', '\\bl': '\\textcolor{##5EC8FF}{#1}', '\\rd': '\\textcolor{##FF5577}{#1}', '\\gr': '\\textcolor{##5EE0A8}{#1}', '\\pu': '\\textcolor{##B48CFF}{#1}' };
(async () => {
  const html = '<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="file://' + KD + 'katex.min.css"><style>body{margin:0;background:transparent;color:#EEF3FA;font-size:64px}.f{display:inline-block;padding:10px 14px;white-space:nowrap}.f .text{font-family:"Noto Sans CJK JP","Noto Sans CJK SC",sans-serif;font-weight:700}</style></head><body>' +
    Object.keys(forms).map(k => '<div style="display:block;margin:0 0 40px 0"><span class="f" id="f_' + k + '">' + katex.renderToString(forms[k], { displayMode: false, throwOnError: true, macros, strict: 'ignore' }) + '</span></div>').join('') + '</body></html>';
  const tmp = path.join(__dirname, '_forms_tmp.html'); fs.writeFileSync(tmp, html);
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }); const p = await b.newPage({ viewport: { width: 3400, height: 1200 }, deviceScaleFactor: 2 });
  await p.goto('file://' + tmp); await p.waitForTimeout(800); await p.evaluate(() => document.fonts.ready);
  const out = {}; for (const k of Object.keys(forms)) { const el = await p.$('#f_' + k); const bb = await el.boundingBox(); const buf = await el.screenshot({ omitBackground: true }); out[k] = { w: Math.round(bb.width), h: Math.round(bb.height), b: buf.toString('base64') }; }
  fs.writeFileSync(path.join(__dirname, `${v}_forms.js`), 'window.FORMS=' + JSON.stringify(out) + ';'); fs.unlinkSync(tmp); await b.close(); console.log('ok', Object.keys(out).length);
})();
