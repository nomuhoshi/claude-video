// 视频 5：波の式をつくる（y = A sin 2π(t/T − x/λ)）。教科书 1 页 → 9 幕，无配乐
const GOLD = C.gold, BLU = C.blue, PUR = C.purple, RED = C.red, GRN = C.green, TP = 2.4, LM = 500, AMP = 110;
const PHI = (t, x, d = 1) => 2 * Math.PI * (t / TP - d * x / LM);
function bez(p0, c, p1, u) { const v = 1 - u; return [v * v * p0[0] + 2 * v * u * c[0] + u * u * p1[0], v * v * p0[1] + 2 * v * u * c[1] + u * u * p1[1]]; }
function curveArrow(g, p0, c, p1, col, p, a = 1, lw = 6) {
  if (p <= 0 || a <= 0) return; g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = lw; g.lineCap = 'round';
  g.beginPath(); for (let u = 0; u <= p + 1e-6; u += .02) { const q = bez(p0, c, p1, Math.min(u, p)); u === 0 ? g.moveTo(q[0], q[1]) : g.lineTo(q[0], q[1]); } g.stroke(); g.restore();
  if (p > .85) { const q1 = bez(p0, c, p1, p), q0 = bez(p0, c, p1, p - .04); arrow(g, q0[0], q0[1], q1[0], q1[1], col, lw, 24, a); }
}
function box(g, x, y, w, h, col, a, dash = false) { if (a <= 0) return; g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = 3.5; if (dash) g.setLineDash([16, 8]); g.beginPath(); g.roundRect(x, y, w, h, 18); g.stroke(); g.restore(); }
// 把 x、t 画成一张“波”：x 轴 ox..x1，y(x,t)=A sin2π(t/T − d·(x−ox)/λ)
function wavePlot(g, o) { const { ox, x1, oy, t, d = 1, col = BLU, a = 1, lw = 5 } = o; curve(g, x => oy - AMP * Math.sin(PHI(t, x - ox, d)), ox, x1, col, lw, a); }

const S = [];
// 0 片头
S.push({ lines: ['怎样写出一个波的式子？', '它要告诉我们：在位置 x、时刻 t，变位 y 是多少。'], lead: 1.2,
  draw(g, lt) {
    curve(g, x => 800 - 70 * Math.sin(PHI(lt, x)), 0, W, BLU, 3, .35); curve(g, x => 800 - 70 * Math.sin(PHI(lt, x - 160)), 0, W, PUR, 3, .25);
    txt(g, '波の式をつくる', W / 2, 330, { size: 128, jp: true, w: 900, al: 'center', a: seg(lt, 0, .3), glow: 'rgba(94,200,255,.3)' });
    fm(g, 'ysym', W / 2, 520, 110, { al: 'center', a: seg(lt, .1, .35) });
  } });
// 1 x、t 两个变量
S.push({ lines: ['波的式子，说的是：某个位置 x，某个时刻 t，发生了什么（变位 y）。', '它同时含有 x 和 t 两个变量，所以显得难。', '办法：先把 x 固定住，只看这一点随时间怎么动。', '这时 y 就只是 t 的函数了。'],
  draw(g, lt, s) {
    const oy = 540, xP = 640, a0 = seg(lt, .3, .6), pa = seg(lt, s.L[2], .6);
    fm(g, 'ysym', W / 2, 170, 80, { al: 'center', a: a0 });
    axes(g, 160, oy, 1100, oy - 200, oy + 200, a0, 'x', 'y'); wavePlot(g, { ox: 160, x1: 1060, oy, t: lt, a: a0 });
    txt(g, '場所 x', 260, oy + 260, { size: 38, jp: true, col: C.mute, a: a0 }); txt(g, '時刻 t', 560, oy + 260, { size: 38, jp: true, col: C.mute, a: a0 }); 
    if (pa > 0) { const yP = oy - AMP * Math.sin(PHI(lt, xP - 160));
      line(g, xP, oy - 200, xP, oy + 200, GOLD, 2.5, [8, 8], pa); dot(g, xP, yP, 13, GOLD, pa, 20); txt(g, 'P', xP + 26, oy + 190, { size: 40, serif: true, col: GOLD, a: pa, w: 700 });
      axes(g, 1280, oy, 1820, oy - 200, oy + 200, pa, 't', 'y'); const t0 = s.L[2], span = Math.min(lt - t0, 3.4);
      curve(g, X => { const tau = lt - (1780 - X) / 150; return oy - AMP * Math.sin(PHI(tau, xP - 160)); }, 1780 - span * 150, 1780, GOLD, 5, pa);
      dot(g, 1780, yP, 12, GOLD, pa, 20); line(g, xP, yP, 1780, yP, GOLD, 1.4, [4, 8], pa * .5);
      fm(g, 'yP', 1550, 250, 70, { al: 'center', a: seg(lt, s.L[3], .6) }); }
  } });
// 2 O → P 的时间
S.push({ lines: ['来看向 +x 方向前进的波。在位置 x 处取一点 P。', '暂时把 x 当作常数，比如 x = 2 [m]。', 'O 点的变位传到 P 点，要花时间 Δt = x/v。', 'x 是常数，Δt 也是常数。', '所以，O 点发生的事，隔 Δt 之后，一定会出现在 P 点。'],
  draw(g, lt, s) {
    const oy = 600, xO = 320, xP = 1320, wd = 300, h = 150, a0 = seg(lt, .3, .6);
    const arch = (x, c) => Math.abs(x - c) < wd / 2 ? h * Math.sin(Math.PI * (x - c + wd / 2) / wd) : 0;
    arrow(g, 200, oy, 1700, oy, C.axis, 3, 18, a0); txt(g, 'x', 1730, oy + 4, { size: 44, serif: true, col: C.axis, a: a0 });
    [[xO, 'O', '0'], [xP, 'P', 'x']].forEach(([X, n, c]) => { line(g, X, oy - 8, X, oy + 12, C.axis, 3, null, a0); txt(g, n, X, oy - 40, { size: 44, serif: true, w: 700, col: GOLD, al: 'center', a: a0 }); txt(g, c, X, oy + 50, { size: 38, serif: true, al: 'center', col: C.axis, a: a0 }); });
    const da = seg(lt, s.L[1], .6); arrow(g, xO, oy + 130, xP, oy + 130, C.mute, 3, 14, da); arrow(g, xP, oy + 130, xO, oy + 130, C.mute, 3, 14, da); txt(g, 'x ＝ 2 [m]', (xO + xP) / 2, oy + 180, { size: 40, jp: true, col: C.mute, al: 'center', a: da });
    const ta = seg(lt, s.L[2], .6);
    txt(g, '波は', 400, 150, { size: 52, jp: true, a: ta, w: 700 }); const w1 = fm(g, 'dt', 400 + 120, 150, 70, { a: ta }) || 0; txt(g, '秒かかって伝わる', 400 + 120 + w1 + 20, 150, { size: 52, jp: true, a: ta, w: 700 });
    const t0 = s.L[2] + .3, v = 170, pr = clamp((lt - t0) * v, 0, xP - xO), c = xO + pr;
    if (lt > t0) { curve(g, x => oy - arch(x, xO), xO - wd / 2, xO + wd / 2, RED, 4, .5 * seg(lt, t0, .3), [10, 8], 3);
      txt(g, '時刻 t−Δt', xO, oy + 250, { size: 40, jp: true, col: C.mute, al: 'center', a: seg(lt, t0, .5) }); }
    if (lt > t0 - .3) curve(g, x => oy - arch(x, c), c - wd / 2, c + wd / 2, RED, 7, seg(lt, t0 - .3, .3), null, 3);
    const arr = lt > t0 + (xP - xO) / v; if (arr) txt(g, '時刻 t', xP, oy + 250, { size: 40, jp: true, col: C.mute, al: 'center', a: seg(lt, t0 + (xP - xO) / v, .5) });
    const ha = seg(lt, s.L[4], .6); curveArrow(g, [xO, oy - h - 30], [(xO + xP) / 2, oy - h - 150], [xP, oy - h - 30], GOLD, seg(lt, s.L[4] + .2, 1.2), ha, 6);
    txt(g, '同じ変位！', (xO + xP) / 2, oy - h - 5, { size: 46, jp: true, col: GOLD, w: 800, al: 'center', a: seg(lt, s.L[4] + 1.2, .5) });
  } });
// 3 反过来想：曲线平移
S.push({ lines: ['反过来想：P 点在时刻 t 的变位 yP，', '就是 O 点在更早的时刻 t−Δt 的变位。', '把 O 点的 y0(t) 曲线向右平移 Δt，就是 P 点的曲线。', '所以 y0(t−Δt) = yP(t)，两个变位相同。'],
  draw(g, lt, s) {
    const ox = 240, oy = 480, per = 600, sh0 = 180, tN = 1100, a0 = seg(lt, .2, .6), f0 = x => oy - 130 * Math.sin(2 * Math.PI * (x - ox) / per);
    axes(g, ox, oy, 1720, oy - 200, oy + 200, a0, 't', 'y'); curve(g, f0, ox, ox + (1680 - ox) * seg(lt, s.L[0] - .2, 1.4), PUR, 5.5, a0);
    line(g, 360, 170, 450, 170, PUR, 6, null, a0); fm(g, 'y0', 480, 170, 58, { a: a0 });
    const sh = sh0 * seg(lt, s.L[2] + .3, 1.6), ra = seg(lt, s.L[2], .5);
    const fR = x => x < ox + sh ? oy : oy - 130 * Math.sin(2 * Math.PI * (x - ox - sh) / per);
    if (ra > 0) { curve(g, fR, ox, 1680, RED, 5.5, ra); line(g, 860, 170, 950, 170, RED, 6, null, ra); fm(g, 'yP', 980, 170, 58, { a: ra }); }
    line(g, tN, oy - 190, tN, oy + 190, GOLD, 2.5, [8, 8], a0); txt(g, '時刻 t', tN, oy + 240, { size: 40, jp: true, col: GOLD, al: 'center', a: a0, w: 700 });
    const b1 = seg(lt, s.L[1], .6), tB = tN - sh0;
    if (b1 > 0) { line(g, tB, oy - 190, tB, oy + 190, BLU, 2.5, [8, 8], b1); txt(g, '時刻 t−Δt', tB, oy + 240, { size: 40, jp: true, col: BLU, al: 'center', a: b1, w: 700 });
      arrow(g, tB + 4, oy + 175, tN - 4, oy + 175, C.mute, 3, 14, b1); arrow(g, tN - 4, oy + 175, tB + 4, oy + 175, C.mute, 3, 14, b1); txt(g, 'Δt', (tB + tN) / 2, oy + 140, { size: 44, serif: true, col: C.ink, al: 'center', a: b1 });
      dot(g, tB, f0(tB), 13, PUR, b1, 18); }
    const c1 = seg(lt, s.L[2] + 1.8, .5); if (c1 > 0) dot(g, tN, fR(tN), 13, RED, c1, 18);
    const d1 = seg(lt, s.L[3], .6); if (d1 > 0) { line(g, tB, f0(tB), tN, fR(tN), GOLD, 3, [10, 8], d1); txt(g, '同じ変位', (tB + tN) / 2, oy - 235, { size: 42, jp: true, col: GOLD, al: 'center', a: d1, w: 800 }); fm(g, 'same', 960, 860, 78, { al: 'center', a: seg(lt, s.L[3] + .4, .6), p: seg(lt, s.L[3] + .4, 1.4) }); }
  } });
// 4 例子
S.push({ lines: ['来看一个例子：O 点做简谐振动，y0(t) = A sin(2π/T · t)。', '把里面的 t，换成 t − x/v。', 'yP(t) = y0(t−Δt) = y0(t − x/v)，', '也就是 A sin (2π/T)(t − x/v)。'],
  draw(g, lt, s) {
    fm(g, 'ex0', 200, 230, 82, { a: seg(lt, s.L[0] + .3, .6), p: seg(lt, s.L[0] + .3, 1.6) });
    const ra = seg(lt, s.L[1], .6); if (ra > 0) { box(g, 170, 320, 540, 190, GOLD, ra); fm(g, 'rep', 200, 415, 62, { a: ra, p: seg(lt, s.L[1] + .2, 1.0) }); }
    fm(g, 'ex1', 200, 610, 66, { a: seg(lt, s.L[2], .5), p: seg(lt, s.L[2] + .1, 1.8) });
    fm(g, 'ex2', 200, 770, 66, { a: seg(lt, s.L[3], .5), p: seg(lt, s.L[3] + .1, 1.6) });
    // 右侧：O 与 P 的两个振子，P 比 O 晚 Δt
    const oy = 330, X = [1560, 1760], a0 = seg(lt, s.L[0], .8), dl = .3 * TP;
    [['O', 0, PUR], ['P', dl, RED]].forEach(([n, d, col], k) => { const x = X[k], y = oy - 110 * Math.sin(2 * Math.PI * Math.max(0, lt - d) / TP);
      line(g, x, oy - 130, x, oy + 130, C.grid, 14, null, a0); line(g, x - 40, oy, x + 40, oy, C.mute, 1.5, [5, 6], a0); dot(g, x, y, 17, col, a0, 22); txt(g, n, x, oy - 175, { size: 46, serif: true, w: 700, col, al: 'center', a: a0 }); });
    txt(g, 'P は Δt 遅れて同じ動き', 1660, oy + 200, { size: 34, jp: true, col: C.mute, al: 'center', a: seg(lt, s.L[1], .6) });
  } });
// 5 x 自由 → 换成 λ
S.push({ lines: ['到现在为止，我们都把 x 当作常数。', '现在让 x 自由变化，P 就成了任意一点。', '于是不必再写 yP(t)，直接写成 y 就行。', '代入 v = fλ = λ/T，也就是 vT = λ：', '(2π/T)(t − x/v) = 2π(t/T − x/(vT))，', '就得到 y = A sin 2π(t/T − x/λ)。'],
  cues: [[s => s.L[5] + .6, 'ding']],
  draw(g, lt, s) {
    fm(g, 'ex2b', 200, 180, 52, { a: .85 * seg(lt, .2, .5) * (1 - .5 * seg(lt, s.L[2], .6)) });
    const xa = seg(lt, s.L[1], .6); if (xa > 0) { arrow(g, 1500, 180, 1760, 180, GOLD, 5, 22, xa); txt(g, 'x：定数 → 自由', 1500, 235, { size: 36, jp: true, col: GOLD, a: xa, w: 700 }); }
    const ya = seg(lt, s.L[2], .6); txt(g, '任意の点 P　→　単に y と書く', 200, 262, { size: 40, jp: true, col: C.mute, a: ya });
    fm(g, 'vsub', 200, 405, 62, { a: seg(lt, s.L[3], .5), p: seg(lt, s.L[3] + .1, 1.8) });
    fm(g, 'conv', 200, 592, 58, { a: seg(lt, s.L[4], .5), p: seg(lt, s.L[4] + .1, 2.0) });
    const fa = seg(lt, s.L[5], .6); if (fa > 0) { box(g, 170, 705, 960, 215, GOLD, fa); fm(g, 'fin', 210, 812, 62, { a: fa, p: seg(lt, s.L[5] + .2, 1.4), glow: 'rgba(255,200,87,.35)' }); }
  } });
// 6 看懂这个式子
S.push({ lines: ['y = A sin 2π(t/T − x/λ)，括号里是 t/T 和 x/λ 的差。', 'x 固定时：t 每过一个周期 T，括号变 1，振动一次。', 't 固定时：x 每过一个波长 λ，括号变 1，波形重复一次。', '括号保持不变的地方，波峰就在那里：x = vt + 定数。', '所以这个波，以速度 v 向 +x 方向前进。'],
  draw(g, lt, s) {
    const oy = 600, xP = 760, ox = 160, a0 = seg(lt, .2, .5);
    fm(g, 'fin', W / 2, 170, 70, { al: 'center', a: a0 });
    axes(g, ox, oy, 1100, oy - 200, oy + 200, a0, 'x', 'y'); wavePlot(g, { ox, x1: 1060, oy, t: lt, a: a0 });
    axes(g, 1280, oy, 1820, oy - 200, oy + 200, a0, 't', 'y');
    const yP = oy - AMP * Math.sin(PHI(lt, xP - ox)); line(g, xP, oy - 200, xP, oy + 200, GOLD, 2.2, [8, 8], a0 * .7); dot(g, xP, yP, 12, GOLD, a0, 18);
    curve(g, X => oy - AMP * Math.sin(PHI(lt - (1780 - X) / 150, xP - ox)), 1780 - 3.4 * 150, 1780, GOLD, 5, a0); dot(g, 1780, yP, 11, GOLD, a0, 18);
    const Ta = seg(lt, s.L[1], .6); if (Ta > 0) { const tt = 1780 - 1 * TP * 150; arrow(g, 1780 - TP * 150, oy + 240, 1780, oy + 240, GOLD, 4, 16, Ta); arrow(g, 1780, oy + 240, 1780 - TP * 150, oy + 240, GOLD, 4, 16, Ta); txt(g, '周期 T', 1780 - TP * 75, oy + 285, { size: 40, jp: true, col: GOLD, al: 'center', a: Ta, w: 700 }); }
    const La = seg(lt, s.L[2], .6); if (La > 0) { arrow(g, ox + 40, oy + 240, ox + 40 + LM, oy + 240, BLU, 4, 16, La); arrow(g, ox + 40 + LM, oy + 240, ox + 40, oy + 240, BLU, 4, 16, La); txt(g, '波長 λ', ox + 40 + LM / 2, oy + 285, { size: 40, jp: true, col: BLU, al: 'center', a: La, w: 700 }); }
    const ca = seg(lt, s.L[3], .6); if (ca > 0) { for (let n = -2; n < 4; n++) { const xc = ox + LM * (lt / TP - .25 + n); if (xc > ox + 6 && xc < 1060) dot(g, xc, oy - AMP, 10, n === 1 ? RED : GOLD, ca * (n === 1 ? 1 : .45), 16); }
      const xc1 = ox + LM * (((lt / TP - .25) % 1 + 1) % 1); dot(g, xc1, oy - AMP, 14, RED, ca, 22); arrow(g, xc1 + 20, oy - AMP - 50, xc1 + 120, oy - AMP - 50, RED, 5, 20, ca); txt(g, 'v', xc1 + 150, oy - AMP - 52, { size: 44, serif: true, col: RED, a: ca, w: 700 });
      fm(g, 'cr', 1500, 330, 56, { al: 'center', a: ca }); }
  } });
// 7 正负号
S.push({ lines: ['如果波往 −x 方向走呢？', '那 P 的情形，要过 x/v 才传到 O，所以 t 换成 t + x/v。', '所以：t − x/v 是向 +x 的波，t + x/v 是向 −x 的波。', '写成 λ 的形式，就是括号里的符号不同。'],
  draw(g, lt, s) {
    const a0 = seg(lt, .3, .6), ox = 160;
    [[1, 330, 'fin', '+x', RED], [-1, 730, 'finp', '−x', GRN]].forEach(([d, oy, id, dr, col], k) => {
      const on = k === 0 ? a0 : seg(lt, s.L[0], .6); axes(g, ox, oy, 1100, oy - 150, oy + 150, on, 'x', 'y'); wavePlot(g, { ox, x1: 1060, oy, t: lt, d, a: on, col: k ? PUR : BLU });
      const xc = ox + LM * (((lt / TP - .25) * d % 1 + 1) % 1 + (d < 0 ? 0 : 0)); const xcc = d > 0 ? ox + LM * (((lt / TP - .25) % 1 + 1) % 1) : ox + LM * (((.25 - lt / TP) % 1 + 1) % 1 + 0);
      dot(g, d > 0 ? xcc : xcc, oy - AMP, 13, col, on, 20); arrow(g, xcc + d * 24, oy - AMP - 50, xcc + d * 124, oy - AMP - 50, col, 5, 20, on);
      fm(g, id, 1250, oy - 70, 54, { a: on }); pill(g, dr + ' 方向の波', 1520, oy + 60, col, { jp: true, al: 'center', size: 36, a: on });
      fm(g, d > 0 ? 'tm' : 'tp', 1800, oy + 62, 44, { a: seg(lt, s.L[d > 0 ? 2 : 1], .5) * on, al: 'center' });
    });
  } });
// 8 总结
S.push({ lines: ['总结：做波的式子，只要两步。', '第 1 步：先写出原点 O 的单振动 y0(t)。', '第 2 步：把 t 换成 t ∓ x/v。x/v 是波从 O 传到 x 的时间。', '减号是向 +x 方向的波，加号是向 −x 方向的波。'],
  draw(g, lt, s) {
    box(g, 220, 150, 1480, 760, RED, seg(lt, .1, .6) * .9, true);
    txt(g, '波の式をつくる', W / 2, 215, { size: 56, jp: true, w: 800, al: 'center', a: seg(lt, .2, .6) });
    const a1 = seg(lt, s.L[1], .6), a2 = seg(lt, s.L[2], .6), a3 = seg(lt, s.L[3], .6);
    dot(g, 330, 330, 24, 'rgba(11,19,34,.9)', a1); txt(g, '1', 330, 331, { size: 32, w: 800, col: GOLD, al: 'center', serif: true, a: a1 }); txt(g, '原点 O での媒質の単振動を表す式', 380, 330, { size: 44, jp: true, w: 700, a: a1 }); fm(g, 'y0', 1170, 330, 62, { a: a1 }); txt(g, 'をつくる。', 1370, 330, { size: 44, jp: true, w: 700, a: a1 });
    dot(g, 330, 450, 24, 'rgba(11,19,34,.9)', a2); txt(g, '2', 330, 451, { size: 32, w: 800, col: GOLD, al: 'center', serif: true, a: a2 }); txt(g, '波が伝わる時間 x/v を考えて、', 380, 450, { size: 44, jp: true, w: 700, a: a2 });
    fm(g, 'y0', 380, 550, 60, { a: a2 }); txt(g, 'の t を', 575, 550, { size: 44, jp: true, w: 700, a: a2 }); fm(g, 'tpm', 745, 550, 56, { a: a2 }); txt(g, 'に置き換える。', 960, 550, { size: 44, jp: true, w: 700, a: a2 });
    txt(g, '− は +x 方向への波', 380, 660, { size: 42, jp: true, col: RED, a: a3, w: 700 }); txt(g, '+ は −x 方向への波', 960, 660, { size: 42, jp: true, col: GRN, a: a3, w: 700 });
    fm(g, 'fin', 960, 780, 60, { al: 'center', a: seg(lt, s.L[3] + .8, .6) });
  } });
setup(S);
