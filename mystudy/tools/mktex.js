// 把一支视频的 TeX 公式表渲染成 SVG（MathJax，无网络），输出 tex.json
// 用法: node mktex.js ../01_taylor/tex_src.js ../01_taylor/out/tex.json
// 依赖: 本目录 npm install（package.json 里有 mathjax-full@3.2.1）
const fs = require('fs'), path = require('path');
const { mathjax } = require('mathjax-full/js/mathjax.js');
const { TeX } = require('mathjax-full/js/input/tex.js');
const { SVG } = require('mathjax-full/js/output/svg.js');
const { liteAdaptor } = require('mathjax-full/js/adaptors/liteAdaptor.js');
const { RegisterHTMLHandler } = require('mathjax-full/js/handlers/html.js');
const { AllPackages } = require('mathjax-full/js/input/tex/AllPackages.js');
const ad = liteAdaptor(); RegisterHTMLHandler(ad);
const doc = mathjax.document('', { InputJax: new TeX({ packages: AllPackages }), OutputJax: new SVG({ fontCache: 'none' }) });
const [, , src, out] = process.argv;
const TEX = eval(fs.readFileSync(src, 'utf8') + '\n;TEX');
const EM = 60, INK = '#EEF3FA';            // 1em = 60px（画面里再按 size 缩放）
const res = {};
for (const [k, t] of Object.entries(TEX)) {
  let s = ad.innerHTML(doc.convert(t, { display: true }));
  if (/merror|data-mjx-error/.test(s)) { console.error('TeX error in', k, t); process.exit(1); }
  const vb = s.match(/viewBox="([-\d.]+) ([-\d.]+) ([-\d.]+) ([-\d.]+)"/).slice(1).map(Number);
  const w = vb[2] * EM / 1000, h = vb[3] * EM / 1000, base = -vb[1] * EM / 1000;   // base: 基线到顶边的距离
  s = s.replace(/ style="[^"]*"/, '').replace(/width="[^"]*ex"/, `width="${w.toFixed(1)}px"`).replace(/height="[^"]*ex"/, `height="${h.toFixed(1)}px"`)
       .replace(/currentColor/g, INK).replace(/font-family="serif"/g, 'font-family="Noto Serif CJK SC, serif"');
  res[k] = { svg: s, w: +w.toFixed(2), h: +h.toFixed(2), base: +base.toFixed(2) };
}
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify(res)); console.log('tex', Object.keys(res).length, '->', out);
