// 教学片变长引擎：canvas 1920×1080，render(T) 是 T 的纯函数。
// 每幕 {lines:[文字 或 [文字, 额外停留秒]], lead, tail, draw(g, lt, S), cues:[[场景内秒, 类型]]}
// draw 里用 S.L[i]（第 i 句字幕的场景内起点）把动画挂在字幕上。
const W = 1920, H = 1080;
const C = {
  bg: '#0B1322', bg2: '#101B2E', grid: '#1A2A42', ink: '#EEF3FA', mute: '#8597B0', axis: '#A9BCD3',
  red: '#FF5577', purple: '#B48CFF', blue: '#5EC8FF', gold: '#FFC857', green: '#5EE0A8'
};
const SC_FONT = '"Noto Sans CJK SC","Noto Sans SC","PingFang SC",sans-serif';
const JP_FONT = '"Noto Sans CJK JP","Noto Sans JP","Hiragino Sans",sans-serif';
const SERIF = '"Noto Serif CJK SC","Noto Serif SC",serif';

const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const ease = p => { p = clamp(p); return p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2; };
const seg = (lt, a, d) => ease((lt - a) / d);
const lin = (lt, a, d) => clamp((lt - a) / d);

function txt(g, s, x, y, o = {}) {
  g.save(); g.globalAlpha *= (o.a ?? 1);
  g.font = `${o.w || 500} ${o.size || 40}px ${o.jp ? JP_FONT : (o.serif ? SERIF : SC_FONT)}`;
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
  g.save(); g.globalAlpha *= a; g.fillStyle = col; if (glow) { g.shadowColor = col; g.shadowBlur = glow; }
  g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill(); g.restore();
}
function curve(g, f, x0, x1, col, lw = 4, a = 1, dash = null, step = 3) {
  if (a <= 0 || x1 <= x0) return; g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = lw; g.lineJoin = 'round'; g.lineCap = 'round';
  if (dash) g.setLineDash(dash); g.beginPath();
  for (let x = x0; x <= x1 + .01; x += step) { const y = f(Math.min(x, x1)); x === x0 ? g.moveTo(x, y) : g.lineTo(Math.min(x, x1), y); }
  g.stroke(); g.restore();
}
function axes(g, ox, oy, x1, yTop, yBot, a = 1, lx = 'x', ly = 'y') {
  arrow(g, ox - 20, oy, x1, oy, C.axis, 3, 18, a); arrow(g, ox, yBot, ox, yTop, C.axis, 3, 18, a);
  txt(g, lx, x1 + 14, oy + 4, { size: 44, col: C.axis, w: 500, a, serif: true });
  txt(g, ly, ox - 14, yTop - 4, { size: 44, col: C.axis, w: 500, a, al: 'right', serif: true });
}
function pill(g, s, x, y, col, o = {}) {
  g.save(); g.globalAlpha *= (o.a ?? 1); const size = o.size || 34;
  g.font = `${o.w || 700} ${size}px ${o.jp ? JP_FONT : SC_FONT}`; const w = g.measureText(s).width + size * 1.1, h = size * 1.55;
  const X = o.al === 'center' ? x - w / 2 : x; g.fillStyle = o.bg || 'rgba(11,19,34,.82)'; g.strokeStyle = col; g.lineWidth = 2.5;
  g.beginPath(); g.roundRect(X, y - h / 2, w, h, h / 2); g.fill(); g.stroke();
  g.fillStyle = col; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(s, X + w / 2, y + 1); g.restore();
}

// ---------- 时间轴 ----------
const lineDur = s => Math.max(2.2, 0.6 + [...s].length / 6.8);
function buildTimeline(SCENES) {
  let T = 0;
  SCENES.forEach((s, i) => {
    s.i = i; s.t0 = T; s.L = []; s.LD = []; s.TX = [];
    let t = s.lead ?? (i === 0 ? 1.4 : 0.8);
    s.lines.forEach(l => { const [tx, ex] = Array.isArray(l) ? l : [l, 0]; s.L.push(t); const d = lineDur(tx) + ex; s.LD.push(d); s.TX.push(tx); t += d + 0.12; });
    s.dur = t + (s.tail ?? 0.5); T += s.dur;
  });
  return T;
}

let SCENES = [], TOTAL = 0, cv, g, off, og;
function setup(scenes) {
  SCENES = scenes; TOTAL = buildTimeline(SCENES);
  cv = document.getElementById('cv'); cv.width = W; cv.height = H; g = cv.getContext('2d');
  off = document.createElement('canvas'); off.width = W; off.height = H; og = off.getContext('2d');
  window.__setT = render; window.META = meta(); render(0);
}
function bg(gg) {
  gg.fillStyle = C.bg; gg.fillRect(0, 0, W, H);
  const r = gg.createRadialGradient(W / 2, H * .42, 100, W / 2, H * .42, 1150);
  r.addColorStop(0, 'rgba(40,70,120,.22)'); r.addColorStop(1, 'rgba(0,0,0,0)'); gg.fillStyle = r; gg.fillRect(0, 0, W, H);
}
function drawScene(gg, s, lt) { bg(gg); gg.save(); s.draw(gg, lt, s); gg.restore(); }
function render(T) {
  T = clamp(T, 0, TOTAL - 1e-6);
  let i = SCENES.findIndex(s => T < s.t0 + s.dur); if (i < 0) i = SCENES.length - 1;
  const s = SCENES[i], lt = T - s.t0;
  drawScene(g, s, lt);
  const FADE = 0.5;
  if (i > 0 && lt < FADE) { const p = SCENES[i - 1]; drawScene(og, p, p.dur); g.save(); g.globalAlpha = 1 - ease(lt / FADE); g.drawImage(off, 0, 0); g.restore(); }
  if (i === 0 && lt < 0.6) { g.save(); g.globalAlpha = 1 - lt / 0.6; g.fillStyle = '#000'; g.fillRect(0, 0, W, H); g.restore(); }
  if (T > TOTAL - 1.2) { g.save(); g.globalAlpha = clamp((T - (TOTAL - 1.2)) / 1.2); g.fillStyle = '#000'; g.fillRect(0, 0, W, H); g.restore(); }
  subtitle(s, lt);
}
function subtitle(s, lt) {
  for (let k = 0; k < s.L.length; k++) {
    const a = s.L[k], d = s.LD[k];
    if (lt >= a && lt < a + d + 0.1) {
      const al = Math.min(lin(lt, a, 0.15), 1 - lin(lt, a + d - 0.05, 0.15));
      g.save(); g.globalAlpha = al; g.font = `700 50px ${SC_FONT}`; g.textAlign = 'center'; g.textBaseline = 'middle';
      const w = g.measureText(s.TX[k]).width;
      g.fillStyle = 'rgba(4,8,16,.62)'; g.beginPath(); g.roundRect(W / 2 - w / 2 - 34, 960, w + 68, 84, 14); g.fill();
      g.fillStyle = '#FFFFFF'; g.fillText(s.TX[k], W / 2, 1003); g.restore();
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
