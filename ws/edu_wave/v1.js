// 视频 1：横波与纵波（纵波的横波表示）
const X0 = 240, D = 120, N = 13, XN = X0 + D * (N - 1);
const LAM = 960, K = 2 * Math.PI / LAM, A = 72, AT = 150, F = 0.35, OM = 2 * Math.PI * F, V = LAM * F, XC = 960;
const xs = i => X0 + i * D;
// 从左端出发的波（有波前）
const srcPh = (x, tau) => OM * tau - K * (x - X0);
const srcDisp = (x, tau, amp) => (tau > (x - X0) / V) ? amp * Math.sin(srcPh(x, tau)) * clamp((tau - (x - X0) / V) / 0.35) : 0;
// 课本图的定格：中间是密
const ph = (x, tau) => OM * tau + K * (XC - x);
const xi = (x, tau = 0) => A * Math.sin(ph(x, tau));

function spring(g, pos, yc, R, col, a = 1, lw = 3) {
  if (a <= 0) return; g.save(); g.globalAlpha *= a;
  g.beginPath(); g.rect(X0 - 70, 0, XN - X0 + 140, H); g.clip();
  g.strokeStyle = col; g.lineWidth = lw; g.lineJoin = 'round'; g.beginPath();
  let first = true;
  for (let i = -1; i < N; i++) {
    const a0 = pos(i), b0 = pos(i + 1), n = 2;
    for (let k = 0; k <= 72; k++) {
      const s = k / 72, x = a0 + (b0 - a0) * s - 0.33 * R * Math.sin(2 * Math.PI * n * s), y = yc + R * Math.cos(2 * Math.PI * n * s);
      first ? (g.moveTo(x, y), first = false) : g.lineTo(x, y);
    }
  }
  g.stroke(); g.restore();
}
function vibIcon(g, cx, cy, kind, a) {
  if (a <= 0) return;
  arrow(g, cx - 150, cy + 60, cx + 170, cy + 60, C.blue, 5, 20, a);
  txt(g, '波前进方向', cx + 10, cy + 102, { size: 32, col: C.blue, al: 'center', a });
  if (kind === 'T') { arrow(g, cx - 230, cy + 10, cx - 230, cy - 95, C.red, 5, 18, a); arrow(g, cx - 230, cy + 10, cx - 230, cy + 115, C.red, 5, 18, a);
    txt(g, '振动方向', cx - 255, cy + 10, { size: 32, col: C.red, al: 'right', a }); }
  else { arrow(g, cx + 10, cy - 10, cx - 140, cy - 10, C.red, 5, 18, a); arrow(g, cx + 10, cy - 10, cx + 160, cy - 10, C.red, 5, 18, a);
    txt(g, '振动方向', cx + 10, cy - 50, { size: 32, col: C.red, al: 'center', a }); }
}
function propArrow(g, a) { arrow(g, 1580, 90, 1800, 90, C.ink, 4, 20, a); txt(g, '波の進む向き', 1690, 136, { size: 30, jp: true, col: C.mute, al: 'center', a }); }

// ---- 课本图布局 ----
const YR = 170, YD = 400, RS = 42, OY = 720, OXA = 170;
function figTop(g, lt, a = 1, sentenceA = 1) {
  txt(g, '波が来る前', 70, 72, { size: 40, jp: true, w: 700, a });
  txt(g, '各点は静止しており，その位置（力のつり合い位置）が振動中心となる', 330, 72, { size: 31, jp: true, col: C.mute, a: a * sentenceA });
  spring(g, i => xs(i), YR, RS, C.ink, a * .9, 2.6);
  for (let i = 0; i < N; i++) dot(g, xs(i), YR + RS, 8, C.red, a);
}
function eqLines(g, p, a = 1) { for (let i = 0; i < N; i++) line(g, xs(i), YR + RS, xs(i), YR + RS + (830 - YR - RS) * p, C.mute, 1.6, [7, 8], a * .8); }
function figDisp(g, k, a = 1, tau = 0) {
  txt(g, '波が来ると', 70, 318, { size: 40, jp: true, w: 700, a });
  spring(g, i => xs(i) + k * xi(xs(i), tau), YD, RS, C.ink, a, 2.6);
  for (let i = 0; i < N; i++) dot(g, xs(i) + k * xi(xs(i), tau), YD + RS, 8, C.red, a);
}
function dispArrows(g, a, tau = 0) { for (let i = 0; i < N; i++) arrow(g, xs(i), YD + RS + 30, xs(i) + xi(xs(i), tau), YD + RS + 30, C.red, 5, 15, a); }
function rotArrows(g, drop, rot, tau = 0, a = 1) {
  const th = rot * Math.PI / 2;
  for (let i = 0; i < N; i++) {
    const x = xs(i), d = xi(x, tau), y = (YD + RS + 30) + (OY - YD - RS - 30) * drop, r = Math.abs(d);
    if (rot > 0 && r > 3) { g.save(); g.globalAlpha = a * .8; g.setLineDash([4, 6]); g.strokeStyle = C.mute; g.lineWidth = 2; g.beginPath();
      d > 0 ? g.arc(x, y, r, 0, -th, true) : g.arc(x, y, r, Math.PI, Math.PI - th, true); g.stroke(); g.restore(); }
    arrow(g, x, y, x + d * Math.cos(th), y - d * Math.sin(th), C.red, 4, 14, a);
    if (rot >= 1) dot(g, x, y - d, 7, C.red, a);
  }
}
const graphY = (x, tau = 0) => OY - xi(x, tau);
function twoLine(g, a1, a2, x, y, col, a) {
  txt(g, a1, x, y, { size: 33, jp: true, w: 700, col, a }); txt(g, a2, x, y + 44, { size: 33, jp: true, w: 700, col, a });
}

const S = [];
// 0 片头
S.push({ lines: ['横波和纵波，到底差在哪里？', '纵波又怎么画成一条“波形”？'], lead: 1.2,
  draw(g, lt) {
    curve(g, x => 760 - 60 * Math.sin(K * 1.3 * x - OM * lt), 0, W, C.blue, 3, .35);
    txt(g, '横波与纵波', W / 2, 400, { size: 132, serif: true, w: 900, al: 'center', a: seg(lt, .2, .8), glow: 'rgba(94,200,255,.35)' });
    txt(g, '縦波を横波のように表す', W / 2, 545, { size: 46, jp: true, col: C.gold, al: 'center', a: seg(lt, .6, .8) });
  } });
// 1 横波
S.push({ lines: ['先看横波：一排小球，用绳子连在一起。', '波向右传过去，每个小球只在原地上下振动。', ['小球并不跟着波往前走。', .4], '振动方向和波前进的方向互相垂直，这就是横波。', '绳子上的波、电磁波都是横波。'],
  draw(g, lt, s) {
    const Y = 560, tau = lt - s.L[1];
    curve(g, x => Y - srcDisp(x, tau, AT), X0 - 90, XN + 60, C.blue, 3, .9);
    const hl = 5;
    if (lt > s.L[2]) { g.save(); g.globalAlpha = .28 * seg(lt, s.L[2], .5); g.strokeStyle = C.red; g.lineWidth = 16; g.lineCap = 'round';
      g.beginPath(); g.moveTo(xs(hl), Y - AT); g.lineTo(xs(hl), Y + AT); g.stroke(); g.restore(); }
    for (let i = 0; i < N; i++) { const y = Y - srcDisp(xs(i), tau, AT); dot(g, xs(i), Y, 4, C.mute, .6); dot(g, xs(i), y, i === hl ? 16 : 13, i === hl ? C.red : C.ink, 1, i === hl ? 20 : 0); }
    propArrow(g, seg(lt, s.L[1], .6));
    vibIcon(g, 860, 150, 'T', seg(lt, s.L[3], .7));
    txt(g, '横波', 1180, 205, { size: 64, serif: true, w: 900, col: C.gold, a: seg(lt, s.L[3] + .5, .6) });
  } });
// 2 纵波
S.push({ lines: ['再看纵波：把绳子换成一根弹簧。', '在左端前后推拉，波沿着弹簧传过去。', '这次，每一点都在原地左右振动。', '振动方向和前进方向在同一条直线上，这就是纵波。', '挤在一起的地方叫「密」，散开的地方叫「疎」。', '声音，就是在空气里传播的纵波。'],
  draw(g, lt, s) {
    const Y = 560, tau = lt - s.L[1], hl = 5;
    const pos = i => xs(i) + srcDisp(xs(i), tau, A);
    if (lt > s.L[2]) { g.save(); g.globalAlpha = .28 * seg(lt, s.L[2], .5); g.strokeStyle = C.red; g.lineWidth = 16; g.lineCap = 'round';
      g.beginPath(); g.moveTo(xs(hl) - A, Y + 95); g.lineTo(xs(hl) + A, Y + 95); g.stroke(); g.restore();
      arrow(g, xs(hl), Y + 95, xs(hl) + srcDisp(xs(hl), tau, A), Y + 95, C.red, 4, 12, seg(lt, s.L[2], .5)); }
    spring(g, pos, Y, 60, C.ink, 1, 3);
    for (let i = 0; i < N; i++) dot(g, pos(i), Y + 60, i === hl ? 14 : 9, C.red, 1, i === hl ? 18 : 0);
    const la = seg(lt, s.L[4], .6);
    if (la > 0) for (let m = -2; m < 4; m++) [[0, '密', C.gold], [Math.PI, '疎', C.blue]].forEach(([p0, w, col]) => {
      const x = X0 + (OM * tau - p0 - 2 * Math.PI * m) / K;
      if (x > X0 + 30 && x < Math.min(XN - 30, X0 + V * tau - 60)) { g.save(); g.globalAlpha = .16 * la; g.fillStyle = col; g.fillRect(x - 85, Y - 80, 170, 160); g.restore();
        txt(g, w, x, Y - 120, { size: 54, jp: true, w: 900, col, al: 'center', a: la }); } });
    propArrow(g, seg(lt, s.L[1], .6));
    vibIcon(g, 960, 150, 'L', seg(lt, s.L[3], .7) * (1 - seg(lt, s.L[4] - .4, .4)));
    txt(g, '縦波', 1250, 160, { size: 64, jp: true, w: 900, col: C.gold, a: seg(lt, s.L[3] + .5, .6) * (1 - seg(lt, s.L[4] - .4, .4)) });
    pill(g, '音 ＝ 空気の縦波', W / 2, 820, C.gold, { jp: true, al: 'center', size: 38, a: seg(lt, s.L[5], .6) });
  } });
// 3 问题
S.push({ lines: ['问题来了：纵波的振动是左右方向的。', '直接画出来，看不到横波那样的起伏。', ['所以课本用了一个办法：把纵波“画成”横波的样子。', .3]],
  draw(g, lt, s) {
    const tau = lt + 30, Y = 260;
    const pos = i => xs(i) + srcDisp(xs(i), tau, A);
    spring(g, pos, Y, 55, C.ink, 1, 3); for (let i = 0; i < N; i++) dot(g, pos(i), Y + 55, 9, C.red);
    const a = seg(lt, s.L[1], .6);
    axes(g, OXA, 650, 1800, 470, 830, a);
    txt(g, '?', 960, 560, { size: 200, serif: true, w: 900, col: C.mute, al: 'center', a: a * .8 });
    txt(g, '縦波を横波のように表す', 960, 870, { size: 44, jp: true, w: 700, col: C.gold, al: 'center', a: seg(lt, s.L[2], .6) });
  } });
// 4 波が来る前
S.push({ lines: ['先看图上这句「波が来る前」：波还没来的时候。', '这时弹簧上的各点都静止不动。', '静止的位置叫「力のつり合い位置」，就是力的平衡位置。', ['它就是每一点的「振動中心」：之后就围着它振动。', .4]],
  draw(g, lt, s) {
    figTop(g, lt, seg(lt, .1, .6), seg(lt, s.L[1], .6));
    eqLines(g, seg(lt, s.L[2], 1.4));
    pill(g, '力のつり合い位置', xs(6), 300, C.gold, { jp: true, al: 'center', size: 32, a: seg(lt, s.L[2], .5) });
    pill(g, '振動中心', xs(6), 560, C.gold, { jp: true, al: 'center', size: 40, a: seg(lt, s.L[3], .5) });
    if (lt > s.L[3]) for (let i = 0; i < N; i++) line(g, xs(i), YR + RS, xs(i), 830, C.gold, 3, null, .35 * seg(lt, s.L[3], .5) * (0.6 + 0.4 * Math.sin(lt * 4)));
  } });
// 5 波が来ると
S.push({ lines: ['再看「波が来ると」：波传过来以后。', '弹簧有的地方被挤紧，有的地方被拉开。', '从振动中心指到现在位置的红箭头，就是「変位」。', '箭头向右，是 +x 方向的変位；向左，是 −x 方向的変位。', ['箭头两两相对的地方，点挤在一起，就是密。', .3]],
  cues: [[s => s.L[2] + .2, 'ding']],
  draw(g, lt, s) {
    figTop(g, lt, .55, 1); eqLines(g, 1, .8);
    const k = seg(lt, s.L[1], 1.6);
    figDisp(g, k, seg(lt, s.L[0], .6));
    const aa = seg(lt, s.L[2], .5); dispArrows(g, aa);
    pill(g, '変位', xs(4) + 36, YD + RS + 80, C.red, { jp: true, al: 'center', size: 34, a: aa });
    const pa = seg(lt, s.L[3], .5);
    txt(g, '+x', xs(4) + 36, YD - 70, { size: 40, serif: true, w: 700, col: C.gold, al: 'center', a: pa });
    txt(g, '−x', xs(8) - 36, YD - 70, { size: 40, serif: true, w: 700, col: C.gold, al: 'center', a: pa });
    const ma = seg(lt, s.L[4], .6);
    if (ma > 0) { g.save(); g.globalAlpha = .18 * ma; g.fillStyle = C.gold; g.beginPath(); g.ellipse(XC, YD, 150, 85, 0, 0, Math.PI * 2); g.fill(); g.restore();
      txt(g, '密', XC, YD - 70, { size: 48, jp: true, w: 900, col: C.gold, al: 'center', a: ma });
      [480, 1440].forEach(x => txt(g, '疎', x, YD - 70, { size: 48, jp: true, w: 900, col: C.blue, al: 'center', a: ma })); }
  } });
// 6 逆时针转 90°
S.push({ lines: [['最关键的一步：把每个変位箭头，逆时针转 90°。', 1.2], '「+x への変位は +y への変位として」：向右画成向上。', '「−x への変位は −y への変位として」：向左画成向下。', '箭头的长度不变，只是换了一个方向。', ['把箭头尖端连起来，就得到纵波的 y–x 图。', .6]],
  cues: [[s => s.L[0] + 1.6, 'whoosh'], [s => s.L[4] + .1, 'ding']],
  draw(g, lt, s) {
    figTop(g, lt, .45, 1); eqLines(g, 1, .7); figDisp(g, 1, .8); dispArrows(g, .8);
    txt(g, '密', XC, YD - 70, { size: 48, jp: true, w: 900, col: C.gold, al: 'center', a: .7 });
    axes(g, OXA, OY, 1820, 600, 840, seg(lt, .1, .6));
    rotArrows(g, seg(lt, s.L[0] + .3, 1.0), seg(lt, s.L[0] + 1.6, 1.8));
    const p1 = seg(lt, s.L[1], .5), p2 = seg(lt, s.L[2], .5);
    twoLine(g, '+x への変位は', '+y への変位として', 250, 845, C.gold, p1);
    twoLine(g, '−x への変位は', '−y への変位として', 1230, 845, C.blue, p2);
    if (p1 > 0) arrow(g, 420, 830, xs(4) - 6, OY - A + 8, C.gold, 2.5, 12, p1 * .8);
    if (p2 > 0) arrow(g, 1400, 830, xs(8) + 6, OY + A - 6, C.blue, 2.5, 12, p2 * .8);
    const c = seg(lt, s.L[4], 2.2);
    if (c > 0) curve(g, x => graphY(x), OXA + 10, OXA + 10 + (1780 - OXA) * c, C.red, 5, 1);
    txt(g, '変位', 650, OY - A - 40, { size: 34, jp: true, w: 700, col: C.red, al: 'center', a: seg(lt, s.L[4] + 1.5, .6) });
  } });
// 7 读图：密与疎
S.push({ lines: ['注意：这条曲线不是弹簧真实的形状。', '纵轴 y 表示的，其实是 x 方向変位的大小。', '对照上面：曲线向下穿过 x 轴的地方，正好是密。', '曲线向上穿过 x 轴的地方，就是疎。', ['看到纵波的图，先把 y 转回 x 方向，再想点在哪里。', .4]],
  draw(g, lt, s) {
    figTop(g, lt, .35, .6); eqLines(g, 1, .5); figDisp(g, 1, 1); dispArrows(g, .45);
    axes(g, OXA, OY, 1820, 600, 840); rotArrows(g, 1, 1, 0, .5); curve(g, x => graphY(x), OXA + 10, 1790, C.red, 5);
    pill(g, '形は本当の形ではない', 1500, 590, C.mute, { jp: true, al: 'center', size: 30, a: seg(lt, s.L[0], .5) * (1 - seg(lt, s.L[1], .4)) });
    pill(g, 'y ＝ x方向の変位', 360, 590, C.gold, { jp: true, al: 'center', size: 32, a: seg(lt, s.L[1], .5) });
    const m = seg(lt, s.L[2], .7), q = seg(lt, s.L[3], .7);
    if (m > 0) { line(g, XC, YD - 40, XC, OY, C.gold, 4, null, m); dot(g, XC, OY, 14, C.gold, m, 20); txt(g, '密', XC, YD - 75, { size: 52, jp: true, w: 900, col: C.gold, al: 'center', a: m });
      txt(g, '下向きに横切る', XC + 20, OY + 110, { size: 32, jp: true, col: C.gold, al: 'center', a: m }); }
    if (q > 0) [480, 1440].forEach(x => { line(g, x, YD - 40, x, OY, C.blue, 4, null, q); dot(g, x, OY, 14, C.blue, q, 20);
      txt(g, '疎', x, YD - 75, { size: 52, jp: true, w: 900, col: C.blue, al: 'center', a: q }); txt(g, '上向きに横切る', x, OY + 110, { size: 32, jp: true, col: C.blue, al: 'center', a: q }); });
  } });
// 8 图的下半部分：动き
const OYB = 500, AG = 170, DX = 110, SAMP = [360, 600, 840, 1080];
const gy = (x, sh = 0) => OYB - AG * Math.sin(K * (XC - (x - sh)));
const vy = x => gy(x, DX) - gy(x, 0);
S.push({ lines: ['最后看图的下半部分：波在前进的时候。', ['实线是现在的波形，虚线是过一小会儿的波形。', .4], '从实线到虚线，有的点往下动，有的点往上动。', '可这里的 y 是“借来”的，要转回去才是真正的运动。', ['顺时针转回 90°：「−y への動き」，実は −x への動き。', .6], ['「+y への動き」，実は +x への動き。', .6]],
  cues: [[s => s.L[4] + .9, 'whoosh']],
  draw(g, lt, s) {
    axes(g, OXA, OYB, 1820, 270, 730, seg(lt, .1, .6));
    curve(g, x => gy(x), OXA + 10, 1790, C.red, 5);
    const sh = DX * seg(lt, s.L[1], 1.2);
    curve(g, x => gy(x, sh), OXA + 10, 1790, C.red, 4, seg(lt, s.L[1], .4), [14, 12]);
    arrow(g, 1560, 250, 1720, 250, C.ink, 4, 18, seg(lt, s.L[1], .5)); txt(g, 'v', 1745, 248, { size: 44, serif: true, a: seg(lt, s.L[1], .5) });
    const va = seg(lt, s.L[2], .6), drop = seg(lt, s.L[4] + .1, .8), rot = seg(lt, s.L[4] + .9, 1.2);
    SAMP.forEach((x, j) => {
      const y0 = gy(x), dv = vy(x), up = dv < 0, col = up ? C.gold : C.blue;
      line(g, x, y0, x, OYB, C.mute, 1.6, [6, 7], va * .8);
      arrow(g, x, y0, x, y0 + dv, col, 5, 16, va);
      if (drop > 0) { const by = y0 + (OYB - y0) * drop, th = rot * Math.PI / 2, m = -dv; // m>0 上
        if (rot > 0) { g.save(); g.globalAlpha = .8; g.setLineDash([4, 6]); g.strokeStyle = C.mute; g.lineWidth = 2; g.beginPath();
          m > 0 ? g.arc(x, by, m, -Math.PI / 2, -Math.PI / 2 + th) : g.arc(x, by, -m, Math.PI / 2, Math.PI / 2 + th); g.stroke(); g.restore(); }
        arrow(g, x, by, x + m * Math.sin(th), by - m * Math.cos(th), col, 5, 16, 1); }
    });
    twoLine(g, '−y への動き', '', 250, 300, C.blue, va);
    if (va > 0) arrow(g, 360, 330, SAMP[0] - 6, gy(SAMP[0]) - 14, C.blue, 2.5, 12, va * .8);
    txt(g, '+y への動き', 900, 290, { size: 33, jp: true, w: 700, col: C.gold, al: 'center', a: va });
    if (va > 0) arrow(g, 880, 315, SAMP[2] + 4, gy(SAMP[2]) - 12, C.gold, 2.5, 12, va * .8);
    twoLine(g, '実は −x', 'への動き', 380, 800, C.blue, seg(lt, s.L[4] + 1.8, .6));
    twoLine(g, '実は +x', 'への動き', 860, 800, C.gold, seg(lt, s.L[5], .6));
  } });
// 9 动起来对照
const HL = [5, 9];
S.push({ lines: ['让它动起来，对照一下。', ['图上的点往上走时，弹簧上对应的点正往右走。', .6], ['图上的点往下走时，对应的点正往左走。', .6]],
  draw(g, lt, s) {
    const tau = Math.max(0, lt - .6) * 0.6;
    figTop(g, lt, .3, .5); eqLines(g, 1, .5); figDisp(g, 1, 1, tau); dispArrows(g, .6, tau);
    axes(g, OXA, OY, 1820, 600, 840); rotArrows(g, 1, 1, tau, .45);
    curve(g, x => graphY(x, tau), OXA + 10, 1790, C.red, 5);
    const ha = seg(lt, s.L[1] - .3, .6);
    HL.forEach(i => { const x = xs(i), v = A * OM * 0.6 * Math.cos(ph(x, tau)) * 1.5, col = v > 0 ? C.gold : C.blue;
      dot(g, x, graphY(x, tau), 13, col, ha, 18); arrow(g, x, graphY(x, tau), x, graphY(x, tau) - v, col, 6, 16, ha);
      const px = x + xi(x, tau); dot(g, px, YD + RS, 13, col, ha, 18); arrow(g, px, YD + RS + 34, px + v, YD + RS + 34, col, 6, 16, ha); });
  } });
// 10 总结
S.push({ lines: ['总结一下。', '横波：振动方向和前进方向垂直。', '纵波：振动方向和前进方向在一条线上，有密有疎。', '画纵波的图：x 方向的変位逆时针转 90°，当作 y 来画。', ['曲线向下穿过 x 轴是密，向上穿过是疎。', 1.0]], tail: 1.6,
  draw(g, lt, s) {
    txt(g, 'まとめ', W / 2, 120, { size: 64, jp: true, w: 900, al: 'center', col: C.gold, a: seg(lt, .1, .6) });
    const rows = [['横波', '振動方向 ⊥ 波の進む向き', C.blue], ['縦波', '振動方向 ∥ 波の進む向き　密・疎', C.red], ['縦波のグラフ', '+x の変位 → +y　/　−x の変位 → −y', C.gold], ['読み方', '下向きに横切る＝密　上向きに横切る＝疎', C.green]];
    rows.forEach(([h, b, col], j) => { const a = seg(lt, s.L[j + 1], .6), y = 260 + j * 165;
      g.save(); g.globalAlpha = a * .9; g.fillStyle = C.bg2; g.strokeStyle = col; g.lineWidth = 2; g.beginPath(); g.roundRect(260, y - 62, 1400, 124, 18); g.fill(); g.stroke(); g.restore();
      txt(g, h, 310, y, { size: 44, jp: true, w: 900, col, a }); txt(g, b, 700, y, { size: 40, jp: true, w: 500, a }); });
  } });
setup(S);
