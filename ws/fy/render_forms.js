// node render_forms.js -> fm/<id>.png + fm.json {id:{w,h}} (CSS px at font-size 64px, rendered @2x)
const { chromium } = require('playwright'); const fs = require('fs'); const cp = require('child_process');
const KD = '/opt/npm-tools/node_modules/katex/dist/';
const katex = require('/opt/npm-tools/node_modules/katex');
const forms = JSON.parse(cp.execSync('python3 -c "import json;from forms_fy import FORMS;print(json.dumps(FORMS))"', { cwd: __dirname }).toString());
const macros = { '\\gd': '\\textcolor{##f0bd5c}{#1}', '\\bl': '\\textcolor{##86b6ff}{#1}', '\\rd': '\\textcolor{##ef5b43}{#1}' };
(async () => {
  fs.mkdirSync(__dirname + '/fm', { recursive: true });
  const html = '<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="file://' + KD + 'katex.min.css"><style>body{margin:0;background:transparent;color:#ece6da;font-size:64px}' +
    '.f{display:inline-block;padding:10px 14px;white-space:nowrap;font-family:KaTeX_Main,"Noto Serif CJK SC"} .f .katex{font-size:1em} .f .text,.f .mord.text{font-family:"Noto Serif CJK SC",serif;font-weight:700}</style></head><body>' +
    Object.keys(forms).map(k => '<div style="display:block;margin:0 0 40px 0"><span class="f" id="f_' + k + '">' + katex.renderToString(forms[k], { displayMode: false, throwOnError: true, macros, strict: 'ignore' }) + '</span></div>').join('') + '</body></html>';
  fs.writeFileSync(__dirname + '/fm/_forms.html', html);
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const p = await b.newPage({ viewport: { width: 3000, height: 1200 }, deviceScaleFactor: 2 });
  await p.goto('file://' + __dirname + '/fm/_forms.html'); await p.waitForTimeout(800); await p.evaluate(() => document.fonts.ready);
  const meta = {};
  for (const k of Object.keys(forms)) {
    const el = await p.$('#f_' + k); const bb = await el.boundingBox();
    await el.screenshot({ path: __dirname + '/fm/' + k + '.png', omitBackground: true });
    meta[k] = { w: Math.round(bb.width), h: Math.round(bb.height) };
  }
  fs.writeFileSync(__dirname + '/fm.json', JSON.stringify(meta)); await b.close(); console.log('ok', Object.keys(meta).length);
})();
