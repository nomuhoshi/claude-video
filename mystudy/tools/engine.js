// mystudy 推导片引擎（由 ws/edu_wave/engine.js 改来）：canvas 1920×1080，render(T) 是 T 的纯函数。
// 每幕 {sec, lines:[文字 或 [文字, 额外停留秒]], lead, tail, draw(g, lt, S), cues:[[S=>场景内秒, 类型]]}
// 公式：TEX 表由 mktex.js 预渲染成 SVG，tex(g, key, x, y, {size, al, a, rev}) 画出，rev 0→1 从左往右“写”出来。
const W = 1920, H = 1080;
const C = {
  bg: '#0A1120', ink: '#EEF3FA', mute: '#8597B0', axis: '#A9BCD3', grid: 'rgba(120,150,200,.07)',
  red: '#FF5577', purple: '#B48CFF', blue: '#5EC8FF', gold: '#FFC857', green: '#5EE0A8'
};
const SC_FONT = '"Noto Sans CJK SC","Noto Sans SC","PingFang SC",sans-serif';
const SERIF = '"Noto Serif CJK SC","Noto Serif SC",serif';
const MONO = '"IBM Plex Mono","DejaVu Sans Mono",monospace';
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const ease = p => { p = clamp(p); return p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2; };
const seg = (lt, a, d) => ease((lt - a) / d);
const lin = (lt, a, d) => clamp((lt - a) / d);
const mixN = (a, b, t) => a + (b - a) * t;

function txt(g, s, x, y, o = {}) {
  if ((o.a ?? 1) <= 0) return;
  g.save(); g.globalAlpha *= (o.a ?? 1);
  g.font = `${o.w || 500} ${o.size || 40}px ${o.serif ? SERIF : o.mono ? MONO : SC_FONT}`;
  g.fillStyle = o.col || C.ink; g.textAlign = o.al || 'left'; g.textBaseline = o.bl || 'middle';
  if (o.glow) { g.shadowColor = o.glow; g.shadowBlur = 18; }
  g.fillText(s, x, y); g.restore();
}
function arrow(g, x1, y1, x2, y2, col, lw = 4, head = 16, a = 1) {
  const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy); if (L < 1.5 || a <= 0) return;
  const ux = dx / L, uy = dy / L, h = Math.min(head, L * .55);
  g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.fillStyle = col; g.lineWidth = lw; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2 - ux * h * .7, y2 - uy * h * .7); g.stroke();
  g.beginPath(); g.moveTo(x2, y2); g.lineTo(x2 - ux * h - uy * h * .5, y2 - uy * h + ux * h * .5);
  g.lineTo(x2 - ux * h + uy * h * .5, y2 - uy * h - ux * h * .5); g.closePath(); g.fill(); g.restore();
}
function line(g, x1, y1, x2, y2, col, lw = 2, dash = null, a = 1) {
  if (a <= 0) return; g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = lw; g.lineCap = 'round';
  if (dash) g.setLineDash(dash); g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); g.restore();
}
function dot(g, x, y, r, col, a = 1, glow = 0) {
  if (a <= 0) return; g.save(); g.globalAlpha *= a; g.fillStyle = col; if (glow) { g.shadowColor = col; g.shadowBlur = glow; }
  g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill(); g.restore();
}
function rrect(g, x, y, w, h, r, fill, stroke, lw = 2, a = 1, dash = null) {
  if (a <= 0) return; g.save(); g.globalAlpha *= a; g.beginPath(); g.roundRect(x, y, w, h, r);
  if (fill) { g.fillStyle = fill; g.fill(); } if (stroke) { g.strokeStyle = stroke; g.lineWidth = lw; if (dash) g.setLineDash(dash); g.stroke(); } g.restore();
}
function glowDot(g, x, y, r, col, a = 1) {
  if (a <= 0) return; g.save(); g.globalAlpha *= a; g.globalCompositeOperation = 'lighter';
  const gr = g.createRadialGradient(x, y, 0, x, y, r); gr.addColorStop(0, col); gr.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = gr; g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill(); g.restore();
}
// 曲线：fx 是像素坐标的函数 x→y；frac 控制画到哪里
function curve(g, fx, x0, x1, col, lw = 4, a = 1, dash = null, frac = 1) {
  if (a <= 0 || x1 <= x0 || frac <= 0) return; const xe = x0 + (x1 - x0) * clamp(frac);
  g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = lw; g.lineJoin = 'round'; g.lineCap = 'round';
  if (dash) g.setLineDash(dash); g.beginPath();
  for (let x = x0, k = 0; x <= xe + .01; x += 3, k++) { const X = Math.min(x, xe), y = fx(X); k ? g.lineTo(X, y) : g.moveTo(X, y); }
  g.stroke(); g.restore();
}
// 坐标系：数学坐标 → 像素
function Plot(ox, oy, sx, sy, x0, x1, y0, y1) {
  const P = { ox, oy, sx, sy, x0, x1, y0, y1, X: x => ox + (x - x0) * sx, Y: y => oy - (y - y0) * sy };
  P.fn = f => (px => P.Y(f(x0 + (px - ox) / sx)));
  return P;
}
function axes(g, P, a = 1, lx = 'x', ly = 'y') {
  if (a <= 0) return;
  arrow(g, P.X(P.x0) - 10, P.Y(0 > P.y0 ? 0 : P.y0), P.X(P.x1), P.Y(0 > P.y0 ? 0 : P.y0), C.axis, 3, 18, a);
  arrow(g, P.X(0 > P.x0 ? 0 : P.x0), P.Y(P.y0) + 10, P.X(0 > P.x0 ? 0 : P.x0), P.Y(P.y1), C.axis, 3, 18, a);
  if (lx) tex(g, lx, P.X(P.x1) + 16, P.Y(0 > P.y0 ? 0 : P.y0) + 6, { size: .62, a, col: 'axis' });
  if (ly) tex(g, ly, P.X(0 > P.x0 ? 0 : P.x0) - 12, P.Y(P.y1) - 8, { size: .62, a, al: 'right' });
}
// 花括号（竖直或水平），用于标注 h、Δy
function brace(g, x1, y1, x2, y2, col, a = 1, depth = 18) {
  if (a <= 0) return; const L = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L, uy = (y2 - y1) / L, nx = uy, ny = -ux;
  const P = (t, d) => [x1 + ux * t + nx * d, y1 + uy * t + ny * d];
  g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = 3; g.lineCap = 'round'; g.beginPath();
  let p = P(0, 0); g.moveTo(...p); let c = P(0, depth * .55), e = P(L * .12, depth * .55); g.quadraticCurveTo(...c, ...e);
  e = P(L * .44, depth * .55); g.lineTo(...e); c = P(L * .5, depth * .55); e = P(L * .5, depth); g.quadraticCurveTo(...c, ...e);
  c = P(L * .5, depth * .55); e = P(L * .56, depth * .55); g.quadraticCurveTo(...c, ...e);
  e = P(L * .88, depth * .55); g.lineTo(...e); c = P(L, depth * .55); e = P(L, 0); g.quadraticCurveTo(...c, ...e);
  g.stroke(); g.restore();
}


// ---------- 人物（原创卡通）与对话气泡 ----------
function person(g, x, y, sc, P, a = 1, o = {}) {           // (x, y) = 两脚中间的地面点；o.lean 绕脚倾斜（弧度，正 = 向右）
  if (a <= 0) return; const kid = P.kind === 'kid', H = (kid ? 150 : 230) * sc, hr = 30 * sc;
  const legH = H * (kid ? .30 : .38), bodyH = H * (kid ? .36 : .34), bw = (kid ? 52 : 62) * sc;
  const hipY = y - legH, neckY = hipY - bodyH, hy = neckY - hr * .95;
  g.save(); g.globalAlpha *= a; g.lineCap = 'round'; g.lineJoin = 'round';
  if (o.lean) { g.translate(x, y); g.rotate(o.lean); g.translate(-x, -y); }
  g.strokeStyle = P.pants; g.lineWidth = 13 * sc; g.beginPath(); g.moveTo(x - bw * .22, hipY); g.lineTo(x - bw * .24, y - 4 * sc); g.moveTo(x + bw * .22, hipY); g.lineTo(x + bw * .24, y - 4 * sc); g.stroke();
  g.fillStyle = '#1B1F2A'; [-1, 1].forEach(s => { g.beginPath(); g.ellipse(x + s * bw * .28, y - 3 * sc, 11 * sc, 6 * sc, 0, 0, 7); g.fill(); });
  const arm = o.arm || 'down'; g.strokeStyle = P.skin; g.lineWidth = 10 * sc; const sy = neckY + 10 * sc;
  [-1, 1].forEach(s => { g.beginPath(); g.moveTo(x + s * bw * .45, sy);
    if (arm === 'up' || (arm === 'point' && s === 1)) g.lineTo(x + s * bw * .95, sy - 34 * sc);
    else if (arm === 'hold' && s === 1) g.lineTo(x + bw * .55, sy - 70 * sc);
    else if (arm === 'hips') { g.lineTo(x + s * bw * .85, sy + bodyH * .35); g.lineTo(x + s * bw * .5, sy + bodyH * .62); }
    else g.lineTo(x + s * bw * .62, sy + bodyH * .78);
    g.stroke(); });
  g.fillStyle = P.shirt; g.beginPath();
  if (kid || P.style !== 'long') g.roundRect(x - bw / 2, neckY, bw, bodyH + 6 * sc, 14 * sc);
  else { g.moveTo(x - bw * .38, neckY); g.lineTo(x + bw * .38, neckY); g.lineTo(x + bw * .62, hipY + 18 * sc); g.lineTo(x - bw * .62, hipY + 18 * sc); g.closePath(); }
  g.fill();
  if (P.style === 'long') { g.fillStyle = P.hair; g.beginPath(); g.roundRect(x - hr * 1.12, hy - hr * .9, hr * 2.24, hr * 2.5, hr * .9); g.fill(); }
  g.fillStyle = P.skin; g.beginPath(); g.arc(x, hy, hr, 0, 7); g.fill();
  g.fillStyle = P.hair;
  if (P.style === 'spiky') { g.beginPath(); g.moveTo(x - hr, hy - hr * .15); for (let k = 0; k <= 6; k++) g.lineTo(x - hr + k * hr / 3, hy - hr * (k % 2 ? 1.35 : .85)); g.lineTo(x + hr, hy - hr * .15); g.closePath(); g.fill(); }
  else if (P.style === 'curly') { for (let k = 0; k < 7; k++) { const an = Math.PI * (1.05 + k * .15); g.beginPath(); g.arc(x + Math.cos(an) * hr * .95, hy + Math.sin(an) * hr * .95, hr * .38, 0, 7); g.fill(); } }
  else { g.beginPath(); g.arc(x, hy - hr * .15, hr * 1.02, Math.PI * 1.02, Math.PI * 1.98); g.fill(); }
  g.fillStyle = '#1B1F2A'; [-1, 1].forEach(s => { g.beginPath(); g.arc(x + s * hr * .36, hy + hr * .05, 3.6 * sc, 0, 7); g.fill(); });
  g.strokeStyle = '#7A3B2E'; g.lineWidth = 3 * sc; const mood = o.mood || 'smile';
  if (mood === 'shout') { g.fillStyle = '#7A3B2E'; g.beginPath(); g.ellipse(x, hy + hr * .5, hr * .22, hr * .2, 0, 0, 7); g.fill(); }
  else if (mood === 'wow') { g.beginPath(); g.arc(x, hy + hr * .48, hr * .12, 0, 7); g.stroke(); }
  else if (mood === 'think') { g.beginPath(); g.moveTo(x - hr * .25, hy + hr * .5); g.lineTo(x + hr * .25, hy + hr * .45); g.stroke(); }
  else { g.beginPath(); g.arc(x, hy + hr * .28, hr * .3, Math.PI * .15, Math.PI * .85); g.stroke(); }
  g.restore();
  if (o.label !== false && P.name) txt(g, P.name, x, y + (kid ? 22 : 26) * sc, { size: 26, w: 700, col: P.shirt, al: 'center', a });
}
function bubble(g, s, x, y, tx, ty, a) {
  if (a <= 0) return; g.save(); g.globalAlpha *= a; g.font = `700 34px ${SC_FONT}`; const w = g.measureText(s).width + 46, h = 66;
  g.fillStyle = 'rgba(238,243,250,.96)'; g.beginPath(); g.roundRect(x - w / 2, y - h / 2, w, h, 22); g.fill();
  g.beginPath(); g.moveTo(x - 14, y + h / 2 - 2); g.lineTo(tx, ty); g.lineTo(x + 14, y + h / 2 - 2); g.fill();
  g.fillStyle = '#0A1120'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(s, x, y + 2); g.restore();
}

// ---------- 公式 ----------
const TEXD = @@TEX@@, TEXI = {}, TEXC = {};
function loadTex() {
  return Promise.all(Object.entries(TEXD).map(([k, d]) => new Promise(r => {
    const im = new Image(); im.onload = () => { TEXI[k] = im; r(); }; im.onerror = () => { console.error('tex load fail', k); r(); };
    im.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(d.svg);
  })));
}
// 同一条公式换颜色（如整条变暗、变金）：用离屏画布做 source-in 着色并缓存
function tinted(k, col) {
  const key = k + '|' + col; if (TEXC[key]) return TEXC[key]; const d = TEXD[k], im = TEXI[k];
  const c = document.createElement('canvas'); c.width = Math.ceil(d.w) + 2; c.height = Math.ceil(d.h) + 2; const x = c.getContext('2d');
  x.drawImage(im, 0, 0, d.w, d.h); x.globalCompositeOperation = 'source-in'; x.fillStyle = col; x.fillRect(0, 0, c.width, c.height);
  return TEXC[key] = c;
}
function texW(k, size = 1) { return TEXD[k].w * size; }
function tex(g, k, x, y, o = {}) {
  const d = TEXD[k], im = TEXI[k]; if (!d || !im) { if (!d) console.error('no tex', k); return; }
  const a = o.a ?? 1, rev = clamp(o.rev ?? 1), s = o.size ?? 1; if (a <= 0 || rev <= 0) return;
  const w = d.w * s, h = d.h * s, X = o.al === 'center' ? x - w / 2 : o.al === 'right' ? x - w : x, Y = o.base ? y - d.base * s : y - h / 2;
  g.save(); g.globalAlpha *= a;
  if (rev < 1) { g.beginPath(); g.rect(X - 4, Y - 20, w * rev + 4, h + 40); g.clip(); }
  const src = o.col ? tinted(k, C[o.col] || o.col) : im;
  if (o.glow) { g.shadowColor = o.glow; g.shadowBlur = 22; }
  g.drawImage(src, X, Y, o.col ? (src.width) * s : w, o.col ? src.height * s : h);
  g.restore();
  if (rev < 1 && rev > 0) glowDot(g, X + w * rev, Y + h * .55, 26, 'rgba(255,200,87,.85)', a);   // 笔尖
  return { x: X, y: Y, w, h };
}
// 推导的一行：公式 + 右侧“这一步做了什么”的标签
function stepTag(g, s, x, y, col, a) { if (a <= 0) return; pill(g, s, x, y, col, { a, size: 30 }); }
function pill(g, s, x, y, col, o = {}) {
  if ((o.a ?? 1) <= 0) return; g.save(); g.globalAlpha *= (o.a ?? 1); const size = o.size || 34;
  g.font = `${o.w || 700} ${size}px ${SC_FONT}`; const w = g.measureText(s).width + size * 1.1, h = size * 1.55;
  const X = o.al === 'center' ? x - w / 2 : o.al === 'right' ? x - w : x; g.fillStyle = o.bg || 'rgba(10,17,32,.86)'; g.strokeStyle = col; g.lineWidth = 2.5;
  g.beginPath(); g.roundRect(X, y - h / 2, w, h, h / 2); g.fill(); g.stroke();
  g.fillStyle = col; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(s, X + w / 2, y + 1); g.restore();
}
// “值得记住”框
function memo(g, x, y, w, h, a, label = '值得直接记住') {
  if (a <= 0) return; rrect(g, x, y, w, h, 18, 'rgba(255,200,87,.07)', C.gold, 3, a);
  g.save(); g.globalAlpha *= a; g.shadowColor = 'rgba(255,200,87,.5)'; g.shadowBlur = 30; rrect(g, x, y, w, h, 18, null, 'rgba(255,200,87,.5)', 2, 1); g.restore();
  pill(g, '★ ' + label, x + 26, y, C.gold, { a, size: 28, bg: '#151A26' });
}

// ---------- 时间轴 ----------
const lineDur = s => Math.max(2.4, 0.7 + [...s].length / 6.0);
// 节拍网格（可选）：window.GRID = {b0: 首拍秒, beat: 一拍秒, bar: 一小节秒}
// 有网格时：每幕从小节线开始，每句字幕在拍点上出现，幕尾补齐到小节线（卡点）
const snapUp = (x, b0, p) => x <= b0 + 1e-6 ? b0 : b0 + Math.ceil((x - b0) / p - 1e-6) * p;
function buildTimeline(SCENES) {
  let T = 0; const G = window.GRID;
  SCENES.forEach((s, i) => {
    const t0 = G && i > 0 ? snapUp(T, G.b0, G.bar) : T;
    s.i = i; s.t0 = t0; s.L = []; s.LD = []; s.TX = [];
    let t = s.lead ?? (i === 0 ? 1.4 : 0.9);
    s.lines.forEach(l => { const [tx, ex] = Array.isArray(l) ? l : [l, 0];
      let ta = t0 + t; if (G) ta = snapUp(ta, G.b0, G.beat);
      s.L.push(ta - t0); const d = lineDur(tx) + ex; s.LD.push(d); s.TX.push(tx); t = ta - t0 + d + 0.14; });
    let e = t0 + t + (s.tail ?? 0.6); if (G) e = snapUp(e, G.b0, G.bar);
    s.dur = e - t0; T = e;
  });
  return T;
}
let SCENES = [], TOTAL = 0, cv, g, off, og;
function setup(scenes) {
  SCENES = scenes; TOTAL = buildTimeline(SCENES);
  cv = document.getElementById('cv'); cv.width = W; cv.height = H; g = cv.getContext('2d');
  off = document.createElement('canvas'); off.width = W; off.height = H; og = off.getContext('2d');
  window.__setT = render; window.META = meta();
  window.__ready = Promise.all([loadTex(), document.fonts.ready]).then(() => { render(0); return true; });
}
function bg(gg) {
  gg.fillStyle = C.bg; gg.fillRect(0, 0, W, H);
  const r = gg.createRadialGradient(W * .5, H * .4, 80, W * .5, H * .45, 1250);
  r.addColorStop(0, 'rgba(40,70,125,.28)'); r.addColorStop(1, 'rgba(0,0,0,0)'); gg.fillStyle = r; gg.fillRect(0, 0, W, H);
  gg.save(); gg.strokeStyle = C.grid; gg.lineWidth = 1;
  for (let x = 0; x <= W; x += 60) { gg.beginPath(); gg.moveTo(x, 0); gg.lineTo(x, H); gg.stroke(); }
  for (let y = 0; y <= H; y += 60) { gg.beginPath(); gg.moveTo(0, y); gg.lineTo(W, y); gg.stroke(); }
  gg.restore();
  const v = gg.createRadialGradient(W / 2, H / 2, 500, W / 2, H / 2, 1200); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,.55)');
  gg.fillStyle = v; gg.fillRect(0, 0, W, H);
}
function header(gg, s, lt) {   // 左上角：本节编号与名称
  if (!s.sec) return; const a = seg(lt, .1, .6);
  txt(gg, s.sec, 72, 70, { size: 34, w: 700, col: C.gold, a });
  if (s.secEn) txt(gg, s.secEn, 72, 108, { size: 22, mono: true, col: C.mute, a });
}
function drawScene(gg, s, lt) { bg(gg); gg.save(); header(gg, s, lt); s.draw(gg, lt, s); gg.restore(); }
function render(T) {
  T = clamp(T, 0, TOTAL - 1e-6);
  let i = SCENES.findIndex(s => T < s.t0 + s.dur); if (i < 0) i = SCENES.length - 1;
  const s = SCENES[i], lt = T - s.t0;
  drawScene(g, s, lt);
  const FADE = 0.6;
  if (i > 0 && lt < FADE) { const p = SCENES[i - 1]; drawScene(og, p, p.dur); g.save(); g.globalAlpha = 1 - ease(lt / FADE); g.drawImage(off, 0, 0); g.restore(); }
  if (i === 0 && lt < 0.8 && !window.NO_FADE_IN) { g.save(); g.globalAlpha = 1 - lt / 0.8; g.fillStyle = '#000'; g.fillRect(0, 0, W, H); g.restore(); }
  if (T > TOTAL - 1.5) { g.save(); g.globalAlpha = clamp((T - (TOTAL - 1.5)) / 1.5); g.fillStyle = '#000'; g.fillRect(0, 0, W, H); g.restore(); }
  subtitle(s, lt);
  if (typeof window.OVERLAY === 'function') window.OVERLAY(g, T, s, lt);   // 上传版：进度条、水印
}
function subtitle(s, lt) {
  for (let k = 0; k < s.L.length; k++) {
    const a = s.L[k], d = s.LD[k];
    if (lt >= a && lt < a + d + 0.1) {
      const al = Math.min(lin(lt, a, 0.15), 1 - lin(lt, a + d - 0.05, 0.15));
      g.save(); g.globalAlpha = al; g.font = `700 46px ${SC_FONT}`; g.textAlign = 'center'; g.textBaseline = 'middle';
      const w = g.measureText(s.TX[k]).width;
      g.fillStyle = 'rgba(4,8,16,.66)'; g.beginPath(); g.roundRect(W / 2 - w / 2 - 32, 968, w + 64, 78, 14); g.fill();
      g.fillStyle = '#FFFFFF'; g.fillText(s.TX[k], W / 2, 1008); g.restore();
    }
  }
}
function meta() {
  const cues = [];
  SCENES.forEach((s, i) => {
    if (i > 0) cues.push([s.t0, 'whoosh']);
    s.L.forEach((t, k) => cues.push([s.t0 + t, k % 2 ? 'tick' : 'bell']));
    (s.cues || []).forEach(([t, ty]) => cues.push([s.t0 + t(s), ty]));
  });
  return { total: TOTAL, frames: Math.ceil(TOTAL * 30), cues,
    lines: SCENES.flatMap(s => s.L.map((t, k) => [+(s.t0 + t).toFixed(2), s.TX[k]])) };
}
