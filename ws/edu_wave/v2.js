// 视频 2：同位相与逆位相
const OX = 260, OXE = 1760, LAM = 600, K = 2 * Math.PI / LAM, AM = 150, F = 0.4, OM = 2 * Math.PI * F;
const wave = (x, sh, oy, amp = AM, kk = K) => oy - amp * Math.sin(kk * (x - OX - sh));
const PUR = C.purple, RED = C.red;

// 一张图：紫线 + 平移的红色复制（x 从 OX 开始）
function shiftPanel(g, o) {
  const { oy, sh, lab, unit, a = 1, lx = 'x', x1 = OXE, amp = AM, kk = K, ox = OX } = o;
  const W2 = x => oy - amp * Math.sin(kk * (x - ox)), R2 = x => oy - amp * Math.sin(kk * (x - ox - sh));
  axes(g, ox, oy, x1 + 40, oy - amp - 70, oy + amp + 40, a, lx, 'y');
  curve(g, W2, ox, x1, PUR, 5, a);
  if (o.red !== false) {
    if (sh > 2) curve(g, R2, ox, Math.min(ox + sh, x1), RED, 4, a * .45, [10, 10]);
    curve(g, R2, Math.min(ox + sh, x1), x1, RED, 6, a);
    if (sh > 2) { arrow(g, ox, oy, ox + sh, oy, RED, 4, 16, a); line(g, ox + sh, oy - amp - 30, ox + sh, oy + amp + 20, RED, 1.6, [5, 6], a * .7);
      if (lab) txt(g, lab, ox + sh / 2, oy + amp + 42, { size: o.labSize || 44, serif: true, w: 700, col: RED, al: 'center', a }); }
  }
}
function vtrack(g, x, oy, amp, col, a) { g.save(); g.globalAlpha = .22 * a; g.strokeStyle = col; g.lineWidth = 16; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x, oy - amp); g.lineTo(x, oy + amp); g.stroke(); g.restore(); }

const S = [];
// 0 片头
S.push({ lines: ['波上的两个点，什么时候振动完全一样？', '什么时候又刚好相反？'], lead: 1.2,
  draw(g, lt) {
    curve(g, x => 760 - 55 * Math.sin(K * x - OM * lt), 0, W, PUR, 3, .4);
    curve(g, x => 760 + 55 * Math.sin(K * x - OM * lt), 0, W, RED, 3, .4);
    txt(g, '同位相と逆位相', W / 2, 400, { size: 124, jp: true, w: 900, al: 'center', a: seg(lt, .2, .8), glow: 'rgba(180,140,255,.35)' });
    txt(g, '错开多少，步调才会一致？', W / 2, 545, { size: 46, col: C.gold, al: 'center', a: seg(lt, .6, .8) });
  } });
// 1 什么是位相
S.push({ lines: ['先说「位相」：它表示振动进行到了哪一步。', ['点从中心出发，向上到最高点，再向下到最低点，再回来。', .6], '回到原来的状态，正好用了一个周期 T。', '两个点每时每刻都在同一步，叫「同位相」。', ['一个在最高点时，另一个正好在最低点，叫「逆位相」。', .6]],
  draw(g, lt, s) {
    const oy = 470, amp = 160, P = 2.4, T0 = 520, TW = 480;  // 一个周期 2.4 秒、画 480px
    const t = Math.max(0, lt - s.L[1]), ta = 1 - seg(lt, s.L[3] - .3, .5);
    const y = tt => oy - amp * Math.sin(2 * Math.PI * tt / P);
    line(g, 160, oy, 460, oy, C.mute, 2, [6, 8], ta);
    txt(g, '振動中心', 160, oy + 36, { size: 28, jp: true, col: C.mute, a: ta });
    const tm = Math.min(t, P * 2.4);
    axes(g, T0, oy, 1820, oy - amp - 70, oy + amp + 50, ta * seg(lt, s.L[1], .5), 't', 'y');
    if (t > 0) { curve(g, x => y((x - T0) / TW * P), T0, T0 + TW * tm / P, PUR, 5, ta);
      line(g, 330, y(tm), T0 + TW * tm / P, y(tm), C.mute, 1.4, [4, 6], ta * .7); }
    dot(g, 330, y(tm), 20, PUR, ta, 22);
    const ma = seg(lt, s.L[2], .5) * ta;
    [[P / 4, '最高点'], [P * 3 / 4, '最低点']].forEach(([tt, w]) => txt(g, w, T0 + TW * tt / P, y(tt) + (tt < P / 2 ? -40 : 44), { size: 30, col: C.mute, al: 'center', a: seg(lt, s.L[1] + (tt < P / 2 ? .6 : 1.6), .5) * ta }));
    if (ma > 0) { arrow(g, T0, oy + amp + 80, T0 + TW, oy + amp + 80, C.gold, 4, 16, ma); txt(g, '1 周期 T', T0 + TW / 2, oy + amp + 120, { size: 36, w: 700, col: C.gold, al: 'center', a: ma }); }
    // 两个点
    const b1 = seg(lt, s.L[3] - .1, .5), b2 = seg(lt, s.L[4] - .2, .7), tt2 = Math.max(0, lt - s.L[3]);
    if (b1 > 0) { const yA = oy - amp * Math.sin(OM * tt2), yB = oy - amp * Math.sin(OM * tt2 + Math.PI * b2);
      [[620, yA, PUR, 'A'], [1300, yB, RED, 'B']].forEach(([x, yy, col, n]) => { vtrack(g, x, oy, amp, col, b1); line(g, x - 90, oy, x + 90, oy, C.mute, 1.5, [6, 8], b1);
        dot(g, x, yy, 22, col, b1, 22); txt(g, n, x + 52, yy, { size: 40, serif: true, w: 700, col, a: b1 }); });
      const ws = b2 > .5 ? ['逆位相', C.red] : ['同位相', C.gold];
      pill(g, ws[0], W / 2, 820, ws[1], { jp: true, al: 'center', size: 44, a: b1 }); }
  } });
// 2 同位相：y–x 平移 λ
S.push({ lines: ['先看 y–x 图：某一瞬间，波的形状。', '把这条波形复制一份，整体向右平移。', '平移一个波长 λ，红线和紫线完全重合。', ['所以，相距 λ 的两个点振动完全同步：同位相。', .8]],
  cues: [[s => s.L[2] + .3, 'ding']],
  draw(g, lt, s) {
    const oy = 470, tau = Math.max(0, lt - s.L[3] - .3);
    const sh = LAM * seg(lt, s.L[1] + .3, 2.6), ra = 1 - seg(lt, s.L[3], .5);
    if (lt < s.L[3]) shiftPanel(g, { oy, sh, lab: 'λ', a: seg(lt, .1, .6), red: lt > s.L[1] });
    else {
      axes(g, OX, oy, OXE + 40, oy - AM - 70, oy + AM + 40); const f = x => oy - AM * Math.sin(K * (x - OX) - OM * tau);
      curve(g, f, OX, OXE, PUR, 5); shiftPanel(g, { oy, sh: LAM, lab: 'λ', a: ra });
      const xp = OX + 270, xq = xp + LAM, pa = seg(lt, s.L[3] + .2, .5);
      [[xp, PUR, 'P'], [xq, RED, 'Q']].forEach(([x, col, n]) => { vtrack(g, x, oy, AM, col, pa); dot(g, x, f(x), 20, col, pa, 22); txt(g, n, x + 34, f(x) - 34, { size: 40, serif: true, w: 700, col, a: pa }); });
      arrow(g, xp, oy + AM + 100, xq, oy + AM + 100, C.gold, 4, 16, pa); arrow(g, xq, oy + AM + 100, xp, oy + AM + 100, C.gold, 4, 16, pa);
      txt(g, 'λ', (xp + xq) / 2, oy + AM + 140, { size: 44, serif: true, w: 700, col: C.gold, al: 'center', a: pa });
      pill(g, '同位相', 1560, 160, C.gold, { jp: true, al: 'center', size: 44, a: pa });
    }
    txt(g, 'y–x 図（ある瞬間の波形）', 260, 110, { size: 34, jp: true, col: C.mute, a: seg(lt, .1, .6) });
  } });
// 3 同位相：y–t 平移 T
S.push({ lines: ['再看 y–t 图：一个点的位置随时间怎么变。', '把它向右平移一个周期 T，同样完全重合。', '相隔 T 的两个时刻，这个点的状态完全一样。', ['平移 2λ、3λ，或者 2T、3T，也都是同位相。', .8]],
  cues: [[s => s.L[1] + 2.8, 'ding']],
  draw(g, lt, s) {
    const oy = 470, sh = LAM * seg(lt, s.L[1] + .2, 2.4) + LAM * seg(lt, s.L[3] + .3, 1.8);
    shiftPanel(g, { oy, sh, lab: sh > LAM * 1.5 ? '2T' : 'T', lx: 't' });
    txt(g, 'y–t 図（ある点の振動）', 260, 110, { size: 34, jp: true, col: C.mute, a: seg(lt, .1, .6) });
    const ca = seg(lt, s.L[2], .5);
    if (ca > 0) [OX + 150, OX + 150 + LAM].forEach((x, j) => { dot(g, x, oy - AM * Math.sin(K * 150), 16, j ? RED : PUR, ca, 18); line(g, x, oy - AM * Math.sin(K * 150), x, oy + AM + 30, C.gold, 1.6, [5, 6], ca); });
    pill(g, '同位相', 1560, 160, C.gold, { jp: true, al: 'center', size: 44, a: seg(lt, s.L[3], .5) });
  } });
// 4 逆位相：y–x 平移 λ/2
S.push({ lines: ['换一种平移：只移半个波长 λ/2。', '红线和紫线正好上下颠倒：这边是山，那边就是谷。', ['相距 λ/2 的两个点，振动方向时时相反：逆位相。', .8]],
  cues: [[s => s.L[1] - .1, 'ding']],
  draw(g, lt, s) {
    const oy = 470, tau = Math.max(0, lt - s.L[2] - .3), sh = LAM / 2 * seg(lt, s.L[0] + .3, 2.0);
    txt(g, 'y–x 図（ある瞬間の波形）', 260, 110, { size: 34, jp: true, col: C.mute, a: 1 });
    if (lt < s.L[2]) {
      shiftPanel(g, { oy, sh, lab: 'λ/2', labSize: 40 });
      const ha = seg(lt, s.L[1], .6);
      if (ha > 0) [OX + LAM * .75, OX + LAM * 1.25].forEach(x => { line(g, x, wave(x, 0, oy), x, wave(x, LAM / 2, oy), C.gold, 3, [6, 6], ha);
        dot(g, x, wave(x, 0, oy), 12, PUR, ha); dot(g, x, wave(x, LAM / 2, oy), 12, RED, ha); });
    } else {
      axes(g, OX, oy, OXE + 40, oy - AM - 70, oy + AM + 40); const f = x => oy - AM * Math.sin(K * (x - OX) - OM * tau);
      curve(g, f, OX, OXE, PUR, 5); shiftPanel(g, { oy, sh: LAM / 2, lab: 'λ/2', labSize: 40, a: 1 - seg(lt, s.L[2], .5) });
      const xp = OX + 420, xq = xp + LAM / 2, pa = seg(lt, s.L[2] + .2, .5);
      [[xp, PUR, 'P'], [xq, RED, 'Q']].forEach(([x, col, n]) => { vtrack(g, x, oy, AM, col, pa); dot(g, x, f(x), 20, col, pa, 22); txt(g, n, x + 34, f(x) - 34, { size: 40, serif: true, w: 700, col, a: pa }); });
      arrow(g, xp, oy + AM + 100, xq, oy + AM + 100, C.gold, 4, 16, pa); arrow(g, xq, oy + AM + 100, xp, oy + AM + 100, C.gold, 4, 16, pa);
      txt(g, 'λ/2', (xp + xq) / 2, oy + AM + 140, { size: 40, serif: true, w: 700, col: C.gold, al: 'center', a: pa });
      pill(g, '逆位相', 1560, 160, C.red, { jp: true, al: 'center', size: 44, a: pa });
    }
  } });
// 5 逆位相：y–t 平移 T/2
S.push({ lines: ['y–t 图上平移半个周期 T/2，同样上下颠倒。', '这时两边的変位大小相等、方向相反，速度也相反。', ['平移 3λ/2、5λ/2 这样的奇数个半波长，也都是逆位相。', .8]],
  cues: [[s => s.L[0] + 2.3, 'ding']],
  draw(g, lt, s) {
    const oy = 470, sh = LAM / 2 * seg(lt, s.L[0] + .2, 2.0) + LAM * seg(lt, s.L[2] + .3, 1.8);
    shiftPanel(g, { oy, sh, lab: sh > LAM ? '3T/2' : 'T/2', labSize: 40, lx: 't' });
    txt(g, 'y–t 図（ある点の振動）', 260, 110, { size: 34, jp: true, col: C.mute });
    const ha = seg(lt, s.L[1], .5) * (1 - seg(lt, s.L[2], .4));
    if (ha > 0) { const x = OX + LAM * .75 + LAM / 2, yp = wave(x, 0, oy), yr = wave(x, LAM / 2, oy);
      dot(g, x, yp, 14, PUR, ha, 16); dot(g, x, yr, 14, RED, ha, 16); arrow(g, x, oy, x, yp, PUR, 5, 16, ha); arrow(g, x, oy, x, yr, RED, 5, 16, ha);
      txt(g, '大きさ同じ・向き逆', x, oy - AM - 45, { size: 32, jp: true, w: 700, col: C.gold, al: 'center', a: ha }); }
    pill(g, '逆位相', 1560, 160, C.red, { jp: true, al: 'center', size: 44, a: seg(lt, s.L[2], .5) });
  } });
// 6 总结（照手绘图）
S.push({ lines: ['把四张图放在一起比较。', '同位相：错开 λ 或 T 的整数倍，波形完全重合。', '逆位相：错开 λ/2 或 T/2 的奇数倍，波形上下颠倒。', ['用位相差来说：同位相差 0，逆位相差 π。', 1.2]], tail: 1.6,
  draw(g, lt, s) {
    const amp = 72, lam = 220, kk = 2 * Math.PI / lam, a1 = seg(lt, s.L[1], .6), a2 = seg(lt, s.L[2], .6), a0 = seg(lt, .1, .6);
    const panels = [[150, 260, lam, 'λ', 'x', a1], [150, 600, lam, 'T', 't', a1], [1030, 260, lam / 2, 'λ/2', 'x', a2], [1030, 600, lam / 2, 'T/2', 't', a2]];
    panels.forEach(([ox, oy, sh, lab, lx, a]) => shiftPanel(g, { ox, oy, sh: sh * a, lab, labSize: 34, lx, amp, kk, x1: ox + 660, a: Math.max(a0 * .35, a) }));
    txt(g, '同位相', 480, 820, { size: 56, jp: true, w: 900, col: C.gold, al: 'center', a: a1 });
    txt(g, '逆位相', 1360, 820, { size: 56, jp: true, w: 900, col: C.red, al: 'center', a: a2 });
    const pa = seg(lt, s.L[3], .6);
    txt(g, '位相差 0（2π の整数倍）', 480, 885, { size: 34, jp: true, col: C.ink, al: 'center', a: pa });
    txt(g, '位相差 π', 1360, 885, { size: 34, jp: true, col: C.ink, al: 'center', a: pa });
  } });
setup(S);
