// 视频 8：ヤングの実験 と 光路差（課本 135–136 页）→ 11 幕，无配乐，第 0 帧显示主题文字
const GOLD = C.gold, BLU = C.blue, PUR = C.purple, RED = C.red, GRN = C.green;
function person(g, x, y, sc = 1, col = C.ink, a = 1) {
  g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.fillStyle = col; g.lineWidth = 5 * sc; g.lineCap = 'round';
  g.beginPath(); g.arc(x, y - 78 * sc, 13 * sc, 0, 7); g.fill();
  g.beginPath(); g.moveTo(x, y - 62 * sc); g.lineTo(x, y - 26 * sc); g.moveTo(x - 20 * sc, y - 50 * sc); g.lineTo(x + 20 * sc, y - 50 * sc);
  g.moveTo(x, y - 26 * sc); g.lineTo(x - 14 * sc, y); g.moveTo(x, y - 26 * sc); g.lineTo(x + 14 * sc, y); g.stroke(); g.restore();
}
function brace(g, x1, x2, y, col, a, w = 4) { arrow(g, (x1 + x2) / 2 - 2, y, x1, y, col, w, 14, a); arrow(g, (x1 + x2) / 2 + 2, y, x2, y, col, w, 14, a); line(g, x1, y - 12, x1, y + 12, col, w, null, a); line(g, x2, y - 12, x2, y + 12, col, w, null, a); }
function vbrace(g, y1, y2, x, col, a, w = 4) { arrow(g, x, (y1 + y2) / 2 - 2, x, y1, col, w, 14, a); arrow(g, x, (y1 + y2) / 2 + 2, x, y2, col, w, 14, a); line(g, x - 12, y1, x + 12, y1, col, w, null, a); line(g, x - 12, y2, x + 12, y2, col, w, null, a); }
function box(g, x, y, w, h, col, a, dash = false) { if (a <= 0) return; g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = 3.5; if (dash) g.setLineDash([16, 8]); g.beginPath(); g.roundRect(x, y, w, h, 18); g.stroke(); g.restore(); }
function ring(g, cx, cy, r, col, lw, a) { if (r <= 0 || a <= 0) return; g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = lw; g.beginPath(); g.arc(cx, cy, r, 0, 7); g.stroke(); g.restore(); }
// 双波源几何（场景 2,3,5,7 共用）：波源在 x=SX，间隔 D，屏幕在 x=SCX
const SX = 300, YC = 540, D = 160, LA = 36, SCX = 1160;
const S1Y = YC + D / 2, S2Y = YC - D / 2;
const dif = y => (Math.hypot(SCX - SX, y - S1Y) - Math.hypot(SCX - SX, y - S2Y)) / LA;   // (S1P−S2P)/λ
const inten = y => Math.cos(Math.PI * dif(y)) ** 2;
function hyp(g, a, col, lw, dash, al) { const c = D / 2, b2 = c * c - a * a; g.save(); g.beginPath(); g.rect(SX, 120, SCX - SX + 2, 840); g.clip();
  for (const sg of [1, -1]) curve(g, x => YC - sg * a * Math.sqrt(1 + ((x - SX) ** 2) / b2), SX, SCX, col, lw, al, dash, 4); g.restore(); }
function srcRings(g, lt, al, col = BLU) { g.save(); g.beginPath(); g.rect(SX, 120, SCX - SX + 2, 840); g.clip(); for (const sy of [S1Y, S2Y]) for (let k = 0; k < 26; k++) { const r = ((60 * lt) % LA) + k * LA; ring(g, SX, sy, r, col, 2, al * clamp(1 - (r - 600) / 300)); } g.restore(); }
function fringeStrip(g, x, w, y0, y1, al) { for (let y = y0; y < y1; y += 3) { g.fillStyle = `rgba(255,236,190,${inten(y) * .95 * al})`; g.fillRect(x, y, w, 3.5); } }
const lab = (g, t, x, y, o = {}) => txt(g, t, x, y, Object.assign({ size: 40, jp: true, w: 700, al: 'center' }, o));

const S = [];
// 0 片头
S.push({ lines: ['杨氏实验：用两个狭缝，让光发生干涉。', '再看一个关键概念：光路差。'], lead: 1.2,
  draw(g, lt) {
    g.save(); g.globalAlpha = .55; srcRings(g, lt + 2, .6, RED); g.restore();
    txt(g, 'ヤングの実験', W / 2, 330, { size: 140, jp: true, w: 900, al: 'center', a: 1, glow: 'rgba(255,85,119,.35)' });
    txt(g, '（光の干渉と光路差）', W / 2, 480, { size: 54, jp: true, col: GOLD, al: 'center', a: 1, w: 700 });
  } });
// 1 装置
S.push({ lines: ['把平行光照射到两个狭缝上，屏幕上会出现条纹。', '两个狭缝（间隔 d）使光发生衍射，', '各自变成球面波向外扩展，', '在屏幕上相遇发生干涉，就形成了条纹。'],
  draw(g, lt, s) {
    const wx = 560, ys2 = 440, ys1 = 640, sx = 1500, L1 = 24, l1 = sx - wx, a0 = seg(lt, .2, .6), a1 = seg(lt, s.L[1], .6), a2 = seg(lt, s.L[2], .6), a3 = seg(lt, s.L[3], .6);
    const I = y => Math.cos(Math.PI * (Math.hypot(l1, y - ys1) - Math.hypot(l1, y - ys2)) / L1) ** 2;
    for (const [y0, y1] of [[250, ys2 - 16], [ys2 + 16, ys1 - 16], [ys1 + 16, 830]]) line(g, wx, y0, wx, y1, C.ink, 8, null, a0);
    for (let k = 0; k < 4; k++) { const x = 130 + ((110 * k + 90 * lt) % 440); line(g, x, 270, x, 810, BLU, 4, null, a0 * clamp((x - 130) / 40) * clamp((540 - x) / 40) * .9); }
    for (const y of [ys2, ys1]) arrow(g, 130, y, 540, y, RED, 4, 18, a0 * .8);
    lab(g, '波面', 250, 880, { col: BLU, a: a0 }); fm(g, 'S2', 612, ys2 - 30, 52, { al: 'center', a: a1 }); fm(g, 'S1', 612, ys1 + 36, 52, { al: 'center', a: a1 });
    vbrace(g, ys2, ys1, 500, GOLD, a1); fm(g, 'd', 450, 540, 52, { al: 'center', a: a1 });
    g.save(); g.beginPath(); g.rect(wx + 6, 200, sx - wx - 8, 700); g.clip(); for (const y of [ys2, ys1]) for (let k = 0; k < 22; k++) { const r = ((100 * lt) % 60) + k * 60; ring(g, wx, y, r, RED, 3, a1 * .8 * clamp(1 - (r - 700) / 300)); } g.restore();
    lab(g, '回折', 760, 230, { col: RED, a: a1, size: 46, w: 800 });
    if (a2 > 0) { line(g, sx, 250, sx, 830, C.ink, 6, null, a2); lab(g, 'スクリーン', sx + 40, 220, { a: a2 }); brace(g, wx, sx, 900, C.mute, a2); fm(g, 'l', (wx + sx) / 2, 940, 50, { al: 'center', a: a2 }); }
    if (a3 > 0) { fringeStrip2(g, sx + 4, 56, 250, 830, I, a3); lab(g, '干渉', 1250, 230, { col: GOLD, a: a3, size: 46, w: 800 });
      g.save(); g.globalAlpha *= a3; g.strokeStyle = RED; g.lineWidth = 4; g.beginPath(); for (let y = 250; y <= 830; y += 3) { const x = 1650 + 200 * I(y); if (y === 250) g.moveTo(x, y); else g.lineTo(x, y); } g.stroke(); g.restore();
      line(g, 1650, 250, 1650, 830, C.axis, 2, null, a3); lab(g, '明るさ', 1750, 880, { a: a3, size: 34, col: C.mute }); }
  } });
function fringeStrip2(g, x, w, y0, y1, I, al) { for (let y = y0; y < y1; y += 3) { g.fillStyle = `rgba(255,236,190,${I(y) * .95 * al})`; g.fillRect(x, y, w, 3.5); } }
// 2 水面波类比
S.push({ lines: ['原理上，和水面波的干涉相同。', '距离差 S1P − S2P = mλ 的位置 P，互相加强，形成明线。', 'S1P − S2P = (m + ½)λ 的位置，互相削弱，形成暗线（m 为整数）。', '这些“加强线”和屏幕的交点，就是明亮的地方。'],
  draw(g, lt, s) {
    const a0 = seg(lt, .2, .6), a1 = seg(lt, s.L[1], .6), a2 = seg(lt, s.L[2], .6), a3 = seg(lt, s.L[3], .6);
    srcRings(g, lt, a0 * .5); dot(g, SX, S1Y, 9, GOLD, a0, 16); dot(g, SX, S2Y, 9, GOLD, a0, 16); fm(g, 'S1', SX - 50, S1Y, 48, { al: 'center', a: a0 }); fm(g, 'S2', SX - 50, S2Y, 48, { al: 'center', a: a0 });
    line(g, SCX, 140, SCX, 940, C.ink, 6, null, a0); lab(g, 'スクリーン', SCX, 120, { a: a0, size: 34 });
    if (a1 > 0) for (let m = 0; m <= 4; m++) hyp(g, m * LA / 2, GOLD, 4, null, a1 * seg(lt, s.L[1] + .15 * m, .4));
    if (a2 > 0) for (let m = 0; m <= 3; m++) hyp(g, (m + .5) * LA / 2, BLU, 3, [10, 8], a2 * seg(lt, s.L[2] + .15 * m, .4));
    fm(g, 'sp1', 1250, 330, 44, { a: a1, p: seg(lt, s.L[1] + .2, 1.2) }); lab(g, '明線（強め合い）', 1250, 250, { col: GOLD, a: a1, al: 'left', size: 42, w: 800 });
    fm(g, 'sp2', 1250, 600, 36, { a: a2, p: seg(lt, s.L[2] + .2, 1.4) }); lab(g, '暗線（弱め合い）', 1250, 500, { col: BLU, a: a2, al: 'left', size: 42, w: 800 });
    if (a3 > 0) for (let m = -2; m <= 2; m++) { const yb = YC + (m / 2) * 0; }
    if (a3 > 0) { for (let k = -8; k <= 8; k++) { const tgt = k, y = (() => { let lo = 140, hi = 940, f = y => dif(y) - tgt * 1; if (Math.sign(f(lo)) === Math.sign(f(hi))) return null; for (let i = 0; i < 40; i++) { const mid = (lo + hi) / 2; if (Math.sign(f(mid)) === Math.sign(f(lo))) lo = mid; else hi = mid; } return (lo + hi) / 2; })(); if (y) dot(g, SCX, y, 10, GOLD, a3, 24); }
      for (let k = -8; k <= 8; k++) { const tgt = k + .5; let lo = 140, hi = 940; const f = y => dif(y) - tgt; if (Math.sign(f(lo)) !== Math.sign(f(hi))) { for (let i = 0; i < 40; i++) { const mid = (lo + hi) / 2; if (Math.sign(f(mid)) === Math.sign(f(lo))) lo = mid; else hi = mid; } dot(g, SCX, (lo + hi) / 2, 7, BLU, a3, 12); } }
      lab(g, '交点が明るくなる所', SCX + 40, 930, { a: a3, col: GOLD, al: 'left', size: 38 }); }
  } });
// 3 P 扫过屏幕
S.push({ lines: ['看屏幕上的点 P：它到两个狭缝的距离不一样。', '距离差正好是 λ 的整数倍时，是明线。', '正好是半个波长的奇数倍时，是暗线。'],
  draw(g, lt, s) {
    const a0 = seg(lt, .2, .6), p = lin(lt, .5, 11), py = YC - 330 * Math.sin(2 * Math.PI * p), df = dif(py);
    srcRings(g, lt, a0 * .25); dot(g, SX, S1Y, 9, GOLD, a0, 16); dot(g, SX, S2Y, 9, GOLD, a0, 16); fm(g, 'S1', SX - 50, S1Y, 48, { al: 'center', a: a0 }); fm(g, 'S2', SX - 50, S2Y, 48, { al: 'center', a: a0 });
    line(g, SCX, 140, SCX, 940, C.ink, 6, null, a0); fringeStrip(g, SCX + 8, 44, 160, 920, a0);
    line(g, SX, S1Y, SCX, py, BLU, 5, null, a0); line(g, SX, S2Y, SCX, py, PUR, 5, null, a0); dot(g, SCX, py, 13, RED, a0, 26); fm(g, 'P', SCX - 34, py, 50, { al: 'center', a: a0 });
    const fr = df - Math.round(df), hr = Math.abs(Math.abs(df % 1) - .5); const bright = Math.abs(fr) < .1, dark = hr < .1 && !bright;
    txt(g, `S1P − S2P ＝ ${df.toFixed(2)} λ`, 1300, 400, { size: 50, jp: true, w: 800, a: seg(lt, .6, .5) });
    const col = bright ? GOLD : dark ? BLU : C.mute; txt(g, bright ? '明線（強め合い）' : dark ? '暗線（弱め合い）' : '── 中間 ──', 1300, 520, { size: 52, jp: true, w: 800, col, a: seg(lt, .6, .5) });
    const bw = 360 * inten(py); g.fillStyle = 'rgba(255,236,190,.9)'; g.fillRect(1300, 600, bw, 30); line(g, 1300, 585, 1300, 645, C.axis, 2); lab(g, '明るさ', 1300, 690, { size: 34, col: C.mute, al: 'left' });
  } });
// 4 回折と干渉
S.push({ lines: ['衍射和干涉，才是波的两大特征。', '所以杨氏实验清楚地表明：光是一种波。'],
  draw(g, lt, s) {
    const a1 = seg(lt, .3, .6), a2 = seg(lt, s.L[1], .6);
    box(g, 160, 200, 720, 520, RED, a1); box(g, 1040, 200, 720, 520, BLU, a1);
    lab(g, '回折', 520, 270, { size: 64, col: RED, w: 800, a: a1 }); lab(g, '干渉', 1400, 270, { size: 64, col: BLU, w: 800, a: a1 });
    line(g, 330, 400, 330, 480, C.ink, 7, null, a1); line(g, 330, 560, 330, 640, C.ink, 7, null, a1); for (let k = 0; k < 3; k++) line(g, 180 + ((110 * k + 60 * lt) % 150), 380, 180 + ((110 * k + 60 * lt) % 150), 650, BLU, 3, null, a1 * .6 * clamp((310 - (180 + ((110 * k + 60 * lt) % 150))) / 40 + 1));
    g.save(); g.beginPath(); g.rect(335, 340, 500, 340); g.clip(); for (let k = 0; k < 6; k++) ring(g, 330, 520, ((50 * lt) % 60) + k * 60, RED, 3, a1 * .8 * clamp(1 - ((50 * lt) % 60 + k * 60 - 250) / 150)); g.restore();
    g.save(); g.beginPath(); g.rect(1060, 330, 680, 360); g.clip(); for (const yy of [460, 560]) for (let k = 0; k < 8; k++) ring(g, 1150, yy, ((50 * lt) % 50) + k * 50, BLU, 3, a1 * .7); g.restore();
    if (a2 > 0) { arrow(g, 960, 780, 960, 840, GOLD, 6, 24, a2); lab(g, 'ヤングの実験は光が波動であることを明確に示している', 960, 900, { size: 46, col: GOLD, w: 800, a: a2 }); }
  } });
// 5 补充：近似 dx/l
S.push({ lines: ['补充：课本说这一步在下一个 EX 里推导，这里先看一遍。', '当 l 远大于 d 和 x 时，两条光线几乎平行。', '从 S2 向 S1P 作垂线，S1P − S2P 就约等于 d sinθ。', 'θ 很小时 sinθ ≒ tanθ = x/l，所以距离差 ≒ dx/l。'],
  draw(g, lt, s) {
    txt(g, '補足：S1P − S2P ≒ dx/l の導き方', 200, 110, { size: 44, jp: true, w: 800, col: GRN, a: seg(lt, .2, .6) });
    const th = 30 * Math.PI / 180, u = [Math.cos(th), -Math.sin(th)], X1 = 480, Y1 = 760, dd = 200, Y2 = Y1 - dd, R = 720;
    const a0 = seg(lt, s.L[0] + .3, .6), a1 = seg(lt, s.L[1], .6), a2 = seg(lt, s.L[2], .6), a3 = seg(lt, s.L[3], .6);
    dot(g, X1, Y1, 10, GOLD, a0, 16); dot(g, X1, Y2, 10, GOLD, a0, 16); fm(g, 'S1', X1 - 50, Y1, 46, { al: 'center', a: a0 }); fm(g, 'S2', X1 - 50, Y2, 46, { al: 'center', a: a0 });
    vbrace(g, Y2, Y1, X1 - 110, GOLD, a0); fm(g, 'd', X1 - 160, (Y1 + Y2) / 2, 48, { al: 'center', a: a0 });
    arrow(g, X1, Y1, X1 + R * u[0], Y1 + R * u[1], BLU, 5, 20, a1); arrow(g, X1, Y2, X1 + R * u[0], Y2 + R * u[1], PUR, 5, 20, a1);
    txt(g, 'Pへ', X1 + R * u[0] + 20, Y2 + R * u[1] - 10, { size: 36, jp: true, col: C.mute, a: a1 }); lab(g, 'ほぼ平行', 1000, 640, { a: a1, size: 38, col: C.mute });
    const hl = dd * Math.sin(th), H = [X1 + hl * u[0], Y1 + hl * u[1]];
    line(g, X1, Y2, H[0], H[1], C.ink, 3, [8, 7], a2); line(g, X1, Y1, H[0], H[1], RED, 9, null, a2); dot(g, H[0], H[1], 7, C.ink, a2, 10);
    const ca = Math.cos(th), sa = Math.sin(th); line(g, H[0] - 22 * ca - 0, H[1] + 22 * sa - 0, H[0] - 22 * ca + 22 * sa, H[1] + 22 * sa + 22 * ca, C.ink, 2.5, null, a2); line(g, H[0] + 22 * sa, H[1] + 22 * ca, H[0] - 22 * ca + 22 * sa, H[1] + 22 * sa + 22 * ca, C.ink, 2.5, null, a2);
    g.save(); g.globalAlpha *= a2; g.strokeStyle = GOLD; g.lineWidth = 3; g.beginPath(); g.arc(X1, Y1, 130, -th, 0); g.stroke(); g.restore(); line(g, X1, Y1, X1 + 250, Y1, C.axis, 2, [6, 6], a2); fm(g, 'th', X1 + 165, Y1 - 28, 48, { al: 'center', a: a2 });
    fm(g, 'dsin', H[0] + 110, H[1] + 70, 48, { al: 'center', a: a2 }); lab(g, '= S1P − S2P', H[0] + 330, H[1] + 70, { a: a2, size: 38, col: RED, al: 'left' });
    fm(g, 'dsin', 1250, 330, 62, { a: a2 }); fm(g, 'tanx', 1230, 520, 52, { a: a3, p: seg(lt, s.L[3] + .2, 1.2) }); fm(g, 'ap', 1230, 740, 54, { a: seg(lt, s.L[3] + 1.4, .5), p: seg(lt, s.L[3] + 1.4, 1.2) });
  } });
// 6 公式
S.push({ lines: ['所以，明线的条件：dx/l = mλ。', '暗线的条件：dx/l = (m + ½)λ。', '补充：相邻两条明线 m 相差 1，间隔 Δx = λl/d。', '要记住：条纹间隔 Δx = λl/d，d 越小、l 越大，条纹越稀。'],
  draw(g, lt, s) {
    txt(g, '明線', 200, 190, { size: 54, jp: true, col: RED, w: 800, a: seg(lt, s.L[0], .5) }); fm(g, 'br', 360, 190, 66, { a: seg(lt, s.L[0] + .2, .5), p: seg(lt, s.L[0] + .2, 1.0) });
    txt(g, '暗線', 960, 190, { size: 54, jp: true, col: BLU, w: 800, a: seg(lt, s.L[1], .5) }); fm(g, 'dk', 1120, 190, 60, { a: seg(lt, s.L[1] + .2, .5), p: seg(lt, s.L[1] + .2, 1.2) });
    const a0 = seg(lt, s.L[2] - .5, .6), x0 = 960, pitch = 250; if (a0 > 0) { for (let x = 160; x < 1760; x += 3) { const I = Math.cos(Math.PI * (x - x0) / pitch) ** 2; g.fillStyle = `rgba(255,236,190,${I * .95 * a0})`; g.fillRect(x, 470, 3.5, 90); }
      line(g, 160, 590, 1780, 590, C.axis, 2, null, a0); arrow(g, 1700, 590, 1790, 590, C.ink, 4, 16, a0); fm(g, 'x', 1830, 590, 44, { al: 'center', a: a0 });
      for (let m = -3; m <= 3; m++) { const xx = x0 + m * pitch; txt(g, `m = ${m}`, xx, 650, { size: 36, serif: true, col: m === 0 ? GOLD : C.mute, al: 'center', a: a0 }); } }
    const b = seg(lt, s.L[2], .6); if (b > 0) { brace(g, x0, x0 + pitch, 410, GRN, b); fm(g, 'dxf', x0 + pitch / 2 + 220, 360, 60, { al: 'center', a: b, p: seg(lt, s.L[2] + .3, 1.0) }); pill(g, '補足', 170, 360, GRN, { jp: true, size: 34, a: b }); }
    const c = seg(lt, s.L[3], .6); if (c > 0) { box(g, 780, 700, 700, 190, GOLD, c * .9); fm(g, 'dxf', 960, 795, 64, { al: 'center', a: c }); pill(g, '要暗記', 1370, 730, RED, { jp: true, size: 34, a: c }); lab(g, '← 条纹间隔：d 小 ・ l 大 → 稀', 1260, 870, { size: 0.1, a: 0 }); }
  } });
// 7 音波
S.push({ lines: ['水面波、音波等也会发生同样的现象。', '音波的话，在屏幕所在的位置，可以听到声音忽强忽弱。'],
  draw(g, lt, s) {
    const a0 = seg(lt, .3, .6), a1 = seg(lt, s.L[1], .6);
    srcRings(g, lt, a0 * .6, PUR); for (const sy of [S1Y, S2Y]) { dot(g, SX, sy, 14, GOLD, a0, 22); } lab(g, 'スピーカー', SX - 40, S1Y + 80, { a: a0, size: 36, col: GOLD });
    line(g, SCX, 140, SCX, 940, C.axis, 2, [8, 8], a0);
    const p = lin(lt, s.L[1], 9), py = YC - 330 * Math.sin(2 * Math.PI * p); person(g, SCX + 60, py + 45, 1.1, C.ink, a1); const loud = inten(py) > .5;
    if (a1 > 0) { for (let y = 160; y < 920; y += 6) { g.fillStyle = `rgba(255,236,190,${inten(y) * .9 * a1})`; g.fillRect(SCX - 40, y, 30, 6.5); }
      txt(g, loud ? '強' : '弱', SCX + 230, py, { size: 80, jp: true, w: 900, col: loud ? GOLD : BLU, al: 'center', a: a1 }); }
    lab(g, '音の強・弱が観測される', 1400, 860, { a: a1, size: 40, col: C.ink, al: 'center' });
  } });
// 8 距離差から光路差へ
S.push({ lines: ['接下来，从“距离差”走向“光路差”。', '在折射率 n 的介质中，波长变成 λ/n，所以 S1P − S2P = mλ/n ……(1)。', '两边乘以 n，得 nS1P − nS2P = mλ ……(2)。', '折射率与距离的乘积叫光学距离（光路长），光学距离之差叫光路差。', '式 (2) 说的是：光路差等于真空中波长 λ 的整数倍时，变亮。'],
  draw(g, lt, s) {
    txt(g, '距離差から光路差へ', 200, 120, { size: 52, jp: true, w: 800, col: GOLD, a: seg(lt, .2, .6) });
    fm(g, 'se1', 200, 290, 56, { a: seg(lt, s.L[1] + .2, .5), p: seg(lt, s.L[1] + .2, 1.4) });
    const b = seg(lt, s.L[2], .5); if (b > 0) { arrow(g, 330, 400, 330, 470, GOLD, 5, 20, b); lab(g, '両辺に n を掛ける', 380, 435, { al: 'left', size: 38, col: GOLD, a: b }); fm(g, 'se2', 200, 560, 56, { a: b, p: seg(lt, s.L[2] + .2, 1.4) }); box(g, 170, 490, 1060, 140, GOLD, b * .9); }
    const c = seg(lt, s.L[3], .6); if (c > 0) { txt(g, '光学距離（光路長）＝ 絶対屈折率 × 距離', 200, 720, { size: 46, jp: true, w: 800, col: BLU, a: c }); txt(g, '光路差 ＝ 光学距離の差', 200, 800, { size: 46, jp: true, w: 800, col: RED, a: seg(lt, s.L[3] + 1.2, .5) }); }
    const d = seg(lt, s.L[4], .6); if (d > 0) txt(g, '光路差が真空中の波長 λ の整数倍 → 明るい', 200, 890, { size: 44, jp: true, w: 800, col: GOLD, a: d });
  } });
// 9 Q&A
S.push({ lines: ['例子：两条光线在 A 处同位相。', '一条在真空中前进距离 l，到达 B；', '另一条在折射率 n 的介质中前进同样的距离 l，到达 C。', '介质中波长是 λ/n，波更密；放大 n 倍，就和真空中的波长 λ 一样。', '这时波的长度是 nl。能否加强，就变成了距离差 nl − l 的问题。', '所以强め合う条件：光路差 = nl − l = mλ。'],
  draw(g, lt, s) {
    const n = 2, lam = 100, x0 = 260, xl = 960, a0 = seg(lt, .2, .6), a1 = seg(lt, s.L[1], .6), a2 = seg(lt, s.L[2], .6), a3 = seg(lt, s.L[3], .6), a4 = seg(lt, s.L[4], .6), a5 = seg(lt, s.L[5], .6), ph = lt * 4;
    const wv = (x, y, lm, a, xe) => curve(g, xx => y - 30 * Math.sin(2 * Math.PI * (xx - x0) / lm - ph), x0, xe, RED, 5, a, null, 3);
    box(g, x0, 190, xl - x0, 120, C.mute, a1); txt(g, '真空', (x0 + xl) / 2 - 30, 160, { size: 40, jp: true, a: a1, w: 800 }); wv(x0, 250, lam, a1, xl); lab(g, 'A', x0 - 30, 250, { a: a1, size: 44 }); lab(g, 'B', xl + 36, 250, { a: a1, size: 44 }); line(g, x0 - 20, 250, xl + 20, 250, C.ink, 2, null, a1 * .7);
    brace(g, x0, xl, 340, C.mute, a1); fm(g, 'l', (x0 + xl) / 2, 380, 46, { al: 'center', a: a1 });
    g.save(); g.globalAlpha *= a2 * .25; g.fillStyle = C.mute; g.fillRect(x0, 440, xl - x0, 120); g.restore(); box(g, x0, 440, xl - x0, 120, C.mute, a2); txt(g, 'n', x0 + 40, 540, { size: 36, serif: true, w: 800, a: a2 }); wv(x0, 500, lam / n, a2, xl); lab(g, 'A', x0 - 30, 500, { a: a2, size: 44 }); lab(g, 'C', xl + 36, 500, { a: a2, size: 44 }); line(g, x0 - 20, 500, xl + 20, 500, C.ink, 2, null, a2 * .7);
    lab(g, '波長', 1200, 250, { a: a1, size: 38, col: RED, al: 'left' }); fm(g, 'lam', 1320, 250, 48, { a: a1 }); lab(g, '波長', 1200, 500, { a: a2, size: 38, col: RED, al: 'left' }); fm(g, 'lamn', 1330, 500, 46, { a: a2 });
    if (a3 > 0) { arrow(g, 620, 590, 620, 680, GOLD, 6, 22, a3); lab(g, 'n 倍に拡大', 680, 635, { a: a3, size: 40, col: GOLD, al: 'left', w: 800 }); wv(x0, 750, lam, a3, x0 + n * (xl - x0)); lab(g, 'A', x0 - 30, 750, { a: a3, size: 44 }); lab(g, 'C', x0 + n * (xl - x0) + 36, 750, { a: a3, size: 44 }); }
    if (a4 > 0) { brace(g, x0, x0 + n * (xl - x0), 925, C.ink, a4); fm(g, 'nl', 600, 885, 44, { al: 'center', a: a4 }); line(g, xl, 700, xl, 830, GOLD, 3, [8, 8], a4); brace(g, xl, x0 + n * (xl - x0), 815, RED, a4); fm(g, 'nlml', (xl + x0 + n * (xl - x0)) / 2, 865, 44, { al: 'center', a: a4 }); }
    if (a5 > 0) { box(g, 1130, 330, 700, 130, GOLD, a5 * .9); fm(g, 'ds', 1160, 395, 54, { a: a5, p: seg(lt, s.L[5] + .2, 1.4) }); }
  } });
// 10 总结
S.push({ lines: ['总结：杨氏实验里，光经两个狭缝衍射，再在屏幕上干涉。', '明线 dx/l = mλ，暗线 dx/l = (m + ½)λ，条纹间隔 Δx = λl/d。', '介质中要用光路差：光学距离 = n × 距离。', '干涉式的右边，必须用真空中的波长 λ。'],
  draw(g, lt, s) {
    txt(g, 'ヤングの実験　まとめ', 200, 130, { size: 56, jp: true, w: 800, a: seg(lt, .2, .6) });
    const a1 = seg(lt, s.L[0], .6), a2 = seg(lt, s.L[1], .6), a3 = seg(lt, s.L[2], .6), a4 = seg(lt, s.L[3], .6);
    txt(g, '2 つのスリット → 回折 → スクリーン上で干渉', 200, 260, { size: 44, jp: true, a: a1, w: 700 });
    fm(g, 'br', 200, 420, 60, { a: a2 }); fm(g, 'dk', 720, 420, 56, { a: a2 }); fm(g, 'dxf', 1480, 420, 56, { a: a2 });
    txt(g, '光路差 ＝ 光学距離の差　（光学距離 ＝ n × 距離）', 200, 600, { size: 44, jp: true, col: BLU, w: 800, a: a3 });
    txt(g, '干渉の式の右辺は必ず真空中の波長 λ', 200, 720, { size: 48, jp: true, col: GOLD, w: 800, a: a4 }); box(g, 170, 660, 1100, 120, GOLD, a4 * .9);
  } });
setup(S);
