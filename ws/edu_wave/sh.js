// 《用球壳把 d³p 换成 p 的积分》——无配音，背景音乐 + 硬字幕。数据全部来自 sh_data.py（window.SH）。
// 配色沿用玻尔兹曼系列：动量空间/球面 = 蓝（系统），权重 e^{-βcp} = 橙（热库），贡献/关键公式 = 金。x = βcp。
const SYS = '#3B82F6', RES = '#F59E0B', GOLD = '#FFD43B';
const SH = window.SH;
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`; };
const mix = (a, b, f) => a + (b - a) * f;
const hash = k => { const x = Math.sin(k * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
function box(g, x, y, w, h, col, a = 1, dash = false, lw = 3.5, fill = null) {
  if (a <= 0) return; g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = lw; if (dash) g.setLineDash([16, 8]);
  g.beginPath(); g.roundRect(x, y, w, h, 18); if (fill) { g.fillStyle = fill; g.fill(); } g.stroke(); g.restore();
}
function tx(g, s, x, y, size, col, a = 1, o = {}) { txt(g, s, x, y, Object.assign({ size, col, a, w: 700, al: 'center' }, o)); }
const f2 = v => v.toFixed(2), f3 = v => v.toFixed(3), f4 = v => v.toFixed(4);
// 三维：绕竖轴转 th，再俯仰 ph
function P3(x, y, z, cx, cy, s, th, ph) {
  const x1 = x * Math.cos(th) + z * Math.sin(th), z1 = -x * Math.sin(th) + z * Math.cos(th);
  return [cx + s * x1, cy - s * (y * Math.cos(ph) - z1 * Math.sin(ph)), y * Math.sin(ph) + z1 * Math.cos(ph)];
}
function wire(g, cx, cy, R, th, ph, col, a, lw = 2.5, fill = null) {
  if (a <= 0) return; g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = lw;
  if (fill) { g.fillStyle = fill; g.beginPath(); g.arc(cx, cy, R, 0, 7); g.fill(); }
  const path = pts => { g.beginPath(); pts.forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y)); g.stroke(); };
  for (let k = 0; k < 8; k++) { const lam = k * Math.PI / 8 * 2, pts = []; for (let i = 0; i <= 48; i++) { const ph2 = -Math.PI / 2 + Math.PI * i / 48; const [X, Y] = P3(Math.cos(ph2) * Math.cos(lam), Math.sin(ph2), Math.cos(ph2) * Math.sin(lam), cx, cy, R, th, ph); pts.push([X, Y]); } path(pts); }
  for (const la of [-60, -30, 0, 30, 60]) { const ph2 = la * Math.PI / 180, pts = []; for (let i = 0; i <= 64; i++) { const lam = 2 * Math.PI * i / 64; const [X, Y] = P3(Math.cos(ph2) * Math.cos(lam), Math.sin(ph2), Math.cos(ph2) * Math.sin(lam), cx, cy, R, th, ph); pts.push([X, Y]); } path(pts); }
  g.restore();
}
function annulus(g, cx, cy, r1, r2, col, a) { if (a <= 0) return; g.save(); g.globalAlpha *= a; g.fillStyle = col; g.beginPath(); g.arc(cx, cy, r2, 0, Math.PI * 2); g.moveTo(cx + r1, cy); g.arc(cx, cy, r1, 0, Math.PI * 2, true); g.fill(); g.restore(); }
function ring(g, cx, cy, r, col, lw, a) { if (r <= 0 || a <= 0) return; g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = lw; g.beginPath(); g.arc(cx, cy, r, 0, 7); g.stroke(); g.restore(); }
const S = [];
// ===================== 1 问题：动量空间里一个点一个点加 =====================
{
  const cx = 960, cy = 690, sc = 86, N = 520, pts = [];
  for (let i = 0; i < N; i++) pts.push([(hash(i * 3 + 1) * 2 - 1) * 3, (hash(i * 3 + 2) * 2 - 1) * 3, (hash(i * 3 + 3) * 2 - 1) * 3]);
  S.push({ target: 24, lead: 1.0, tail: .6,
    lines: ['要在整个动量空间里积分：被积函数是 e^(−βcp)。', '动量空间，就是 (p_x, p_y, p_z) 张成的空间。', '每个点的亮度，就是它的权重 e^(−βcp)。', '这个权重只依赖 p 的大小，', '那就别一个点一个点加，改成一层一层加。'],
    cues: [[s => s.L[4], 'ding']],
    draw(g, lt, s) {
      tx(g, '用球壳，把 d³p 换成 p 的积分', W / 2, 140, 92, C.ink, 1, { w: 900, glow: 'rgba(94,200,255,.25)' });
      fm(g, 'int0', W / 2, 295, 70, { a: 1, al: 'center' });
      const th = .6 + lt * .32, ph = .42, a1 = seg(lt, s.L[1] * .9 + .1, .8), a2 = seg(lt, s.L[2], .7);
      const ax = [[1, 0, 0, 'p_x'], [0, 1, 0, 'p_y'], [0, 0, 1, 'p_z']];
      ax.forEach(([x, y, z, nm]) => { const [X0, Y0] = P3(0, 0, 0, cx, cy, sc, th, ph), [X, Y] = P3(x * 3.5, y * 3.5, z * 3.5, cx, cy, sc, th, ph); arrow(g, X0, Y0, X, Y, C.axis, 3, 16, a1); tx(g, nm, X + (X - X0) * .08, Y + (Y - Y0) * .08 - 10, 36, C.axis, a1, { serif: true }); });
      const order = pts.map((p, i) => [P3(p[0], p[1], p[2], cx, cy, sc, th, ph), p]).sort((a, b) => a[0][2] - b[0][2]);
      order.forEach(([[X, Y], p], i) => { const w = Math.exp(-Math.hypot(p[0], p[1], p[2])); dot(g, X, Y, 6.5, RES, a1 * (.07 + .93 * w) * seg(lt, .2 + i / N * .8, .3), 8 * w); });
      if (a2 > 0) {
        tx(g, '亮度 = 权重 e^(−βcp)', 1560, 520, 34, RES, a2); box(g, 1380, 560, 360, 150, RES, a2, false, 3, rgba(RES, .06));
        [0, 1, 2, 3, 4].forEach(i => { dot(g, 1430 + i * 65, 620, 13, RES, a2 * (.07 + .93 * Math.exp(-i * .9)), 10); }); tx(g, '近 p = 0', 1430, 672, 26, C.mute, a2, { al: 'left' }); tx(g, '远', 1690, 672, 26, C.mute, a2);
      }
      if (lt > s.L[3]) { const a3 = seg(lt, s.L[3], .6); tx(g, '只看 |p|，方向无关', 330, 560, 36, GOLD, a3); }
    } });
}
// ===================== 2 球面与球壳 =====================
{
  const R = 230, CX1 = 560, CX2 = 1330, CY = 560, dR = 38;
  S.push({ target: 26, lead: 0.8, tail: .6,
    lines: ['到原点距离为 p 的所有点，组成一个半径为 p 的球面。', '球面上每一点的 e^(−βcp) 都一样，', '所以这一整层可以一起算。', '再取厚度 dp，就得到一层球壳。'],
    cues: [[s => s.L[3], 'ding']],
    draw(g, lt, s) {
      tx(g, '动量空间的“洋葱”', W / 2, 120, 62, C.ink, seg(lt, .1, .5), { w: 800 });
      const th = .5 + lt * .4, ph = .4, a0 = seg(lt, s.L[0] + .2, .7), a1 = seg(lt, s.L[1], .6), a3 = seg(lt, s.L[3], .8);
      wire(g, CX1, CY, R, th, ph, SYS, a0, 2.6, a1 > 0 ? rgba(RES, .12 * a1) : null);
      wire(g, CX1, CY, R + dR, th, ph, GOLD, a3 * .9, 2.2, null);
      tx(g, '三维', CX1, CY + R + 80, 34, C.mute, a0); tx(g, '截面（切开看）', CX2, CY + R + 80, 34, C.mute, a0);
      // 截面
      const ac = seg(lt, s.L[0] + .6, .7);
      ring(g, CX2, CY, R, SYS, 4, ac);
      if (a1 > 0) { g.save(); g.globalAlpha *= a1 * ac; g.fillStyle = rgba(RES, .14); g.beginPath(); g.arc(CX2, CY, R, 0, 7); g.fill(); g.restore(); }
      if (a3 > 0) { annulus(g, CX2, CY, R, R + dR, rgba(GOLD, .55), a3); ring(g, CX2, CY, R + dR, GOLD, 3, a3); }
      arrow(g, CX2, CY, CX2 + R * .72, CY - R * .72, C.ink, 4, 16, ac); tx(g, 'p', CX2 + R * .32, CY - R * .5, 44, C.ink, ac, { serif: true });
      dot(g, CX2, CY, 6, C.ink, ac);
      if (a1 > 0) tx(g, 'e^(−βcp) 处处相同', CX2 - R * .05, CY + R * .38, 34, RES, a1, { w: 800 });
      if (a3 > 0) { arrow(g, CX2 + R + 90, CY - 70, CX2 + R + dR * .5 + 4, CY - 6, GOLD, 4, 14, a3); tx(g, 'dp', CX2 + R + 120, CY - 90, 44, GOLD, a3, { al: 'left', serif: true }); tx(g, '球壳', CX2 + R + 120, CY - 140, 40, GOLD, a3, { al: 'left' }); }
    } });
}
// ===================== 3 球壳的体积 =====================
{
  const CX = 470, CY = 610, R = 225, dR = 42, sh = SH.shell;
  S.push({ target: 36, lead: 0.8, tail: .6,
    lines: ['球壳的体积是多少？', '球的体积是 V = (4/3)πp³，', '半径增加 dp，多出来的体积就是球壳：', 'dV = (dV/dp)·dp = 4πp² dp。', '这正是：球壳体积 = 表面积 × 厚度。', 'dp 越小，这个近似越准。'],
    cues: [[s => s.L[3] + 1, 'ding'], [s => s.L[4], 'ding']],
    draw(g, lt, s) {
      const L = s.L; tx(g, '球壳体积 = ?', W / 2, 120, 62, C.ink, seg(lt, .1, .5), { w: 800 });
      const a0 = seg(lt, .3, .6), a2 = seg(lt, L[2], .7);
      ring(g, CX, CY, R, SYS, 4, a0); g.save(); g.globalAlpha *= a0; g.fillStyle = rgba(SYS, .1); g.beginPath(); g.arc(CX, CY, R, 0, 7); g.fill(); g.restore();
      if (a2 > 0) { annulus(g, CX, CY, R, R + dR, rgba(GOLD, .6), a2); ring(g, CX, CY, R + dR, GOLD, 3, a2); tx(g, 'dp', CX + R + dR + 50, CY - R * .6, 44, GOLD, a2, { serif: true }); arrow(g, CX + R + dR + 44, CY - R * .6 + 28, CX + R * .93 + dR * .5, CY - R * .38, GOLD, 3.5, 12, a2); }
      arrow(g, CX, CY, CX - R * .72, CY + R * .72, C.ink, 4, 16, a0); tx(g, 'p', CX - R * .5, CY + R * .22, 44, C.ink, a0, { serif: true }); dot(g, CX, CY, 6, C.ink, a0);
      fm(g, 'sphereV', 1300, 205, 56, { a: seg(lt, L[1], .6), al: 'center', p: seg(lt, L[1] + .2, 1) });
      fm(g, 'dV', 1300, 375, 52, { a: seg(lt, L[3], .6), al: 'center', p: seg(lt, L[3] + .2, 1.4) });
      // 把球壳“拉平”成一块板：长 = 表面积 4πp²，厚 = dp
      const a4 = seg(lt, L[4], .6), u = seg(lt, L[4] + .3, 1.4); const SW = 560, TH = 44, SXs = 1030, SY = 520;
      if (a4 > 0) {
        arrow(g, CX + R + 120, CY - 40, SXs - 20, SY + 6, GOLD, 4, 16, a4 * .8); tx(g, '展开', (CX + R + SXs) / 2 + 60, 470, 34, C.mute, a4);
        g.save(); g.globalAlpha *= a4; g.fillStyle = rgba(GOLD, .6); g.strokeStyle = GOLD; g.lineWidth = 3; g.beginPath(); g.roundRect(SXs, SY - TH / 2, SW * u, TH, 6); g.fill(); g.stroke(); g.restore();
        if (u > .9) { tx(g, '长 = 表面积 4πp²', SXs + SW / 2, SY - 50, 34, SYS, a4); tx(g, '厚 = dp', SXs + SW + 14, SY + 3, 36, GOLD, a4, { al: 'left' }); }
      }
      // 近似误差表（p = 1，真实计算）
      const a5 = seg(lt, L[5], .6);
      if (a5 > 0) {
        tx(g, '精确的 ΔV 与 4πp²dp 的比较（p = 1）', 1440, 640, 30, C.mute, a5);
        ['dp', '精确 ΔV', '4πp²dp', '近似偏差'].forEach((h, i) => tx(g, h, [1030, 1190, 1400, 1640][i], 685, 28, C.mute, a5, { al: i ? 'center' : 'left' }));
        sh.forEach((r, i) => { const a = seg(lt, L[5] + .2 + i * .4, .4), y = 735 + i * 44; const col = r.rel < .02 ? C.green : (r.rel < .1 ? GOLD : C.red);
          tx(g, '' + r.dp, 1030, y, 30, C.ink, a, { al: 'left', serif: true }); tx(g, f3(r.exact), 1190, y, 30, C.ink, a, { serif: true }); tx(g, f3(r.approx), 1400, y, 30, C.ink, a, { serif: true }); tx(g, (r.rel * 100).toFixed(1) + '%', 1640, y, 30, col, a, { w: 800, serif: true }); });
      }
    } });
}
// ===================== 4 把各层加起来 =====================
{
  const X0b = 120, scb = 85, YB1 = 400, ysb = 190 / SH.area[SH.area.length - 1], YB2 = 690, ysw = 190;
  const X0p = 950, scp = 105, YBp = 720, ysp = 60;
  const lineChart = (g, x0, sc, yb, ys, arr, col, a, p = 1) => curve(g, X => { const x = (X - x0) / sc, i = Math.min(arr.length - 2, Math.floor(x / .05)), f = x / .05 - i; return yb - ys * mix(arr[i], arr[i + 1], f); }, x0, x0 + 8 * sc * p, col, 5, a, null, 3);
  const axes2 = (g, x0, sc, yb, h, a, lab) => { arrow(g, x0 - 10, yb, x0 + 8 * sc + 30, yb, C.axis, 3, 14, a); arrow(g, x0, yb + 10, x0, yb - h, C.axis, 3, 14, a); tx(g, lab, x0 + 8 * sc + 36, yb + 34, 28, C.axis, a, { serif: true }); for (let x = 0; x <= 8; x += 2) { line(g, x0 + x * sc, yb, x0 + x * sc, yb + 8, C.axis, 2, null, a); tx(g, '' + x, x0 + x * sc, yb + 26, 24, C.mute, a, { serif: true }); } };
  S.push({ target: 46, lead: 0.8, tail: .6,
    lines: ['每一层的贡献 = 权重 × 球壳体积。', '球壳面积 4πp² 往上涨，权重 e^(−βcp) 往下掉，', '乘起来，就是一座小山。', '山顶在 βcp = 2。', '把所有层加起来，层越薄，总和越稳：', '收敛到 8π /(βc)³。', '窍门：∫xⁿe^(−x)dx = n!，这里 n = 2。'],
    cues: [[s => s.L[3], 'ding'], [s => s.L[5], 'ding']],
    draw(g, lt, s) {
      const L = s.L, a0 = seg(lt, .2, .6), a1 = seg(lt, L[1], .6), a2 = seg(lt, L[2], .6), a3 = seg(lt, L[3], .6), a4 = seg(lt, L[4], .6), a5 = seg(lt, L[5], .6), a6 = seg(lt, L[6], .6);
      const aLayer = (1 - a6);
      fm(g, 'layer', W / 2, 135, 66, { a: a0 * aLayer, al: 'center' });
      if (a6 > 0) { box(g, 560, 70, 800, 130, GOLD, a6, false, 4, 'rgba(255,212,59,.08)'); fm(g, 'fact', W / 2, 135, 52, { a: a6, al: 'center', p: seg(lt, L[6] + .2, 1.2) }); tx(g, '（值得背）', 1440, 135, 34, GOLD, a6, { al: 'left' }); }
      // 乘积图
      axes2(g, X0p, scp, YBp, 440, a0, 'x = βcp'); tx(g, '每层贡献 4πx² e^(−x) Δx', X0p + 430, 262, 34, GOLD, a0);
      // 两个因子的小图
      axes2(g, X0b, scb, YB1, 230, a1, ''); tx(g, '球壳面积 4πx²（上涨）', X0b + 340, 215, 32, SYS, a1);
      lineChart(g, X0b, scb, YB1, ysb, SH.area, SYS, a1, seg(lt, L[1] + .1, 1.3));
      axes2(g, X0b, scb, YB2, 230, a1, ''); tx(g, '权重 e^(−x)（下降）', X0b + 340, 505, 32, RES, a1);
      lineChart(g, X0b, scb, YB2, ysw, SH.w, RES, a1, seg(lt, L[1] + .6, 1.3));
      // 小山 + 柱子（真实 Δx = 0.5 的中点柱）
      const nb = SH.bars.x.length;
      SH.bars.x.forEach((x, i) => { const a = seg(lt, L[2] + .1 + i * .09, .4), h = SH.bars.h[i] * ysp * a; g.save(); g.fillStyle = rgba(GOLD, .45); g.strokeStyle = GOLD; g.lineWidth = 2; g.beginPath(); g.rect(X0p + (x - .25) * scp + 2, YBp - h, .5 * scp - 4, h); g.fill(); g.stroke(); g.restore(); });
      lineChart(g, X0p, scp, YBp, ysp, SH.prod, '#FFFFFF', a2, seg(lt, L[2], 1.6));
      if (a3 > 0) { const xp = X0p + SH.peak * scp, yp = YBp - ysp * 4 * Math.PI * SH.peak ** 2 * Math.exp(-SH.peak); line(g, xp, yp, xp, YBp + 4, '#FFFFFF', 2, [8, 6], a3); dot(g, xp, yp, 10, '#FFFFFF', a3, 14); tx(g, 'βcp = 2 最高', xp + 170, yp + 6, 34, '#FFFFFF', a3, { w: 800 }); }
      // 黎曼和表
      if (a4 > 0) {
        tx(g, '各层相加 Σ 4πx² e^(−x) Δx（x = βcp，Δx 是每层厚度）', 700, 780, 28, C.mute, a4);
        SH.riemann.forEach((r, i) => { const a = seg(lt, L[4] + .3 + i * .5, .4), x = 210 + i * 165; tx(g, `Δx = ${r.dx}`, x, 830, 28, C.mute, a, { serif: true }); tx(g, f3(r.sum), x, 880, 36, i === SH.riemann.length - 1 ? GOLD : C.ink, a, { w: 800, serif: true }); });
      }
      if (a5 > 0) { box(g, 1010, 775, 860, 115, GOLD, a5, false, 4, 'rgba(255,212,59,.1)'); fm(g, 'res2', 1440, 832, 50, { a: a5, al: 'center', p: seg(lt, L[5] + .2, 1.2) }); tx(g, `8π = ${f3(SH.eightpi)}`, 1440, 918, 28, GOLD, a5 * seg(lt, L[5] + 1, .5), { al: 'center', serif: true }); }
    } });
}
// ===================== 5 总结 =====================
{
  const items = [['1', 'd³p  →  4πp² dp', '只在被积函数只依赖 |p| 时能用', 'step'], ['2', '∫₀^∞ xⁿ e^(−x) dx = n!', '直接背下来', 'fact'], ['3', '∫ e^(−βcp) d³p = 8π/(βc)³', '4π × 2/(βc)³', 'res2']];
  S.push({ target: 22, lead: 0.8, tail: 1.0,
    lines: ['记住两件事。', '一，只依赖 p 的大小，就能用球壳，', 'd³p 换成 4πp² dp；', '二，∫ xⁿ e^(−x) dx = n!，直接背下来。', '于是 ∫ e^(−βcp) d³p = 8π/(βc)³。'],
    cues: [[s => s.L[4], 'ding']],
    draw(g, lt, s) {
      const L = s.L; tx(g, '小结', W / 2, 120, 72, C.ink, seg(lt, .1, .5), { w: 900 });
      [[1, 'step', 'd³p → 4πp² dp', '只在被积函数只依赖 |p| 时能用', SYS], [3, 'fact', null, '直接背下来', RES], [4, 'res2', null, '4π × 2/(βc)³', GOLD]].forEach(([i, f, , note, col], k) => {
        const a = seg(lt, L[i], .6), y = 330 + k * 190; box(g, 200, y - 75, 1520, 150, col, a, false, 3.5, 'rgba(255,255,255,.03)');
        dot(g, 280, y, 36, col, a); tx(g, '' + (k + 1), 280, y + 2, 42, '#0B1322', a, { w: 900 });
        fm(g, f, 1000, y - 20, f === 'step' ? 70 : (f === 'fact' ? 52 : 54), { a, al: 'center' }); tx(g, note, 1000, y + 55, 30, C.mute, a);
      });
    } });
}
setup(S);
