// 知识点 ②：周期边界条件为什么让 k 变成格点（mystudy 推导片：推导逐行写出，配乐不卡点，不放水印）
window.NO_FADE_IN = true;
const S = [];
const VIO = '#B48CFF';
// ---------- 道具 ----------
// 一维固体首尾相接：p = 0 直线，p = 1 圆（弧长保持 Lpx，顶端中点固定）
function morphPts(cx, cy, Lpx, p, n = 160) {
  const pts = [], th = Math.max(1e-4, 2 * Math.PI * p), R = Lpx / th;
  for (let i = 0; i <= n; i++) { const s = (i / n - .5) * Lpx, f = s / R; pts.push([cx + R * Math.sin(f), cy + R * (1 - Math.cos(f))]); }
  return pts;
}
function poly(g, pts, col, lw, a = 1, dash = null) { if (a <= 0) return; g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = lw; g.lineCap = 'round'; g.lineJoin = 'round'; if (dash) g.setLineDash(dash); g.beginPath(); pts.forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y)); g.stroke(); g.restore(); }
// 圈上的波：nEff 个波长绕一圈；接缝在正上方。非整数时接缝处断开，用红色标出
function ringWave(g, cx, cy, R, nEff, ph, amp, col, a = 1, seam = true) {
  if (a <= 0) return; const pts = [];
  for (let i = 0; i <= 360; i++) { const th = 2 * Math.PI * i / 360, r = R + amp * Math.cos(nEff * th - ph); pts.push([cx + r * Math.sin(th), cy - r * Math.cos(th)]); }
  g.save(); g.globalAlpha *= a; g.strokeStyle = 'rgba(169,188,211,.25)'; g.lineWidth = 2; g.beginPath(); g.arc(cx, cy, R, 0, 7); g.stroke(); g.restore();
  poly(g, pts, col, 5, a);
  const bad = Math.abs(nEff - Math.round(nEff)) > .01;
  if (seam && bad) { const r0 = R + amp * Math.cos(-ph), r1 = R + amp * Math.cos(nEff * 2 * Math.PI - ph);
    line(g, cx, cy - r0, cx, cy - r1, C.red, 7, null, a); dot(g, cx, cy - r0, 9, C.red, a, 14); dot(g, cx, cy - r1, 9, C.red, a, 14); }
}
// 三维投影（绕竖直轴转 ψ，再俯视 tilt）
function P3(cx, cy, s, psi, tilt = .42) { return (x, y, z) => { const xr = x * Math.cos(psi) - z * Math.sin(psi), zr = x * Math.sin(psi) + z * Math.cos(psi);
  return [cx + xr * s, cy - (y * Math.cos(tilt) - zr * Math.sin(tilt)) * s, zr * Math.cos(tilt) + y * Math.sin(tilt)]; }; }
function seg3(g, pr, a3, b3, col, lw, a = 1, dash = null) { const p = pr(...a3), q = pr(...b3); line(g, p[0], p[1], q[0], q[1], col, lw, dash, a); }
function arrow3(g, pr, a3, b3, col, lw, a = 1) { const p = pr(...a3), q = pr(...b3); arrow(g, p[0], p[1], q[0], q[1], col, lw, 18, a); }

// ---------- 0 主题 ----------
S.push({ lead: 1.4,
  lines: ['这一节回答一个问题：', '为什么周期边界条件，会让波矢 k 变成格点？', ['先看结论：k = 2π/L ·(n_x, n_y, n_z)。', .8]],
  draw(g, lt, s) {
    const L = s.L;
    txt(g, '知识点 ②', W / 2, 250, { size: 52, w: 700, col: C.gold, al: 'center' });
    txt(g, '周期边界条件', W / 2, 400, { size: 120, w: 900, serif: true, al: 'center', glow: 'rgba(255,200,87,.35)' });
    txt(g, '为什么让 k 变成格点', W / 2, 540, { size: 72, w: 900, serif: true, al: 'center' });
    tex(g, 'title_k', W / 2, 720, { size: 1.2, al: 'center', rev: lin(lt, L[2], 1.2) });
    memo(g, 560, 640, 800, 160, seg(lt, L[2] + 1.2, .5), '结论');
  } });

// ---------- 1 为什么需要边界条件 ----------
S.push({ sec: '1  为什么需要边界条件', secEn: 'WHY BOUNDARY CONDITIONS',
  lines: ['无限长的介质里，任何 k 的波都可以存在。', '但真实的固体有大小，边长记为 L。', ['波必须“装得进”这块固体，所以只有某些 k 被允许。', .4], ['规定边界上怎么处理的，就是边界条件。', .8]],
  draw(g, lt, s) {
    const L = s.L, y1 = 360, y2 = 700;
    line(g, 80, y1, 1840, y1, 'rgba(169,188,211,.35)', 2);
    const ks = [.012, .021, .033]; ks.forEach((k, j) => curve(g, x => y1 + 70 * Math.sin(k * x - lt * 2 + j), 80, 1840, [C.blue, VIO, C.green][j], 3, seg(lt, .2 + j * .3, .4) * .9));
    txt(g, '无限长：任何 k 都行', 1840, y1 - 120, { size: 36, w: 700, col: C.mute, al: 'right', a: seg(lt, .3, .4) });
    const ba = seg(lt, L[1], .5), x0 = 560, x1 = 1360;
    rrect(g, x0, y2 - 110, x1 - x0, 220, 14, 'rgba(94,200,255,.06)', 'rgba(169,188,211,.7)', 3, ba);
    brace(g, x0, y2 + 130, x1, y2 + 130, C.gold, ba, -22); tex(g, 'l_L', (x0 + x1) / 2, y2 + 185, { size: .9, col: 'gold', al: 'center', a: ba });
    const fa = seg(lt, L[2], .5);
    g.save(); g.beginPath(); g.rect(x0, y2 - 110, x1 - x0, 220); g.clip();
    curve(g, x => y2 + 70 * Math.sin(2 * Math.PI * 2 * (x - x0) / (x1 - x0) - lt * 2), x0, x1, C.gold, 4, fa);
    g.restore();
    pill(g, '边界条件：边界上怎么处理', W / 2, 920 - 20, C.gold, { al: 'center', a: seg(lt, L[3], .5), size: 36 });
  } });

// ---------- 2 首尾相接 ----------
S.push({ sec: '2  周期边界条件（一维）', secEn: 'PERIODIC BOUNDARY CONDITION',
  lines: ['把长 L 的一维固体首尾相接，弯成一个圈。', '走到 x = L，就回到了 x = 0，', ['所以位移必须相同：u(x + L) = u(x)，对所有 x 成立。', .8]],
  draw(g, lt, s) {
    const L = s.L, p = ease(lin(lt, L[0] + .3, 2.2)), cx = 700, cy = 300, Lpx = 1100;
    const pts = morphPts(cx, cy, Lpx, p);
    poly(g, pts, C.blue, 8);
    const a0 = pts[0], a1 = pts[pts.length - 1];
    dot(g, a0[0], a0[1], 14, C.gold, 1, 16); dot(g, a1[0], a1[1], 14, VIO, 1, 16);
    const la = 1 - seg(lt, L[0] + 1.6, .4);
    tex(g, 'l_x0', a0[0] - 20, a0[1] - 44, { size: .7, al: 'right', col: 'gold', a: la });
    tex(g, 'l_xL', a1[0] + 20, a1[1] - 44, { size: .7, col: VIO, a: la });
    tex(g, 'l_x0L', a0[0], a0[1] + 60, { size: .75, al: 'center', col: 'gold', a: seg(lt, L[1], .4) });
    const ma = seg(lt, L[1], .5);
    if (p > .95) { g.save(); g.globalAlpha = ma; g.strokeStyle = C.gold; g.lineWidth = 3; g.beginPath(); g.arc(a0[0], a0[1], 40, 0, 7); g.stroke(); g.restore(); }
    tex(g, 'pbc1', 1450, 520, { size: 1.0, al: 'center', rev: lin(lt, L[2], 1.4) });
    memo(g, 1000, 440, 900, 160, seg(lt, L[2] + 1.4, .5), '周期边界条件');
  } });

// ---------- 3 代入波 ----------
S.push({ sec: '2  代入波', secEn: 'kL = 2πn',
  lines: ['代入波 u = A cos(kx − ωt)。', '把 x 换成 x + L，括号里多了一项 kL。', ['余弦要保持不变，', .2], ['kL 必须正好是 2π 的整数倍。', .4], ['所以 k = 2πn / L，n 取 0、±1、±2……', .8], ['意思是：周长 L 里必须装下整数个波长，λ = L/|n|。', .8]],
  cues: [[s => s.L[4] + .9, 'ding']],
  draw(g, lt, s) {
    const L = s.L, x0 = 260, sz = .95;
    tex(g, 'd1', x0, 220, { size: sz, rev: lin(lt, L[0], 1.0), base: true });
    tex(g, 'd2', x0, 340, { size: sz, rev: lin(lt, L[1], 1.4), base: true }); stepTag(g, 'x → x + L', 1500, 325, C.blue, seg(lt, L[1] + .6, .4));
    tex(g, 'd3', x0, 460, { size: sz, rev: lin(lt, L[2], 1.4), base: true }); stepTag(g, '余弦不变', 1500, 445, C.blue, seg(lt, L[2] + .6, .4));
    tex(g, 'd4', x0, 580, { size: 1.05, rev: lin(lt, L[3], .8), base: true }); stepTag(g, '整数圈', 1500, 565, C.blue, seg(lt, L[3] + .4, .4));
    tex(g, 'd5', x0, 755, { size: 1.1, rev: lin(lt, L[4], 1.2), base: true });
    memo(g, x0 - 40, 652, 1020, 160, seg(lt, L[4] + 1.2, .5), '值得直接记住');
    tex(g, 'd6', 1360, 755, { size: 1.0, rev: lin(lt, L[5], 1.0), base: true });
  } });

// ---------- 4 数值例子 ----------
S.push({ sec: '2  数值例子：L = 1 m', secEn: 'WHOLE WAVELENGTHS ON A RING',
  lines: ['取 L = 1 米。', 'n = ±1：k = ±2π，λ = 1 米，圈里装 1 个波长；', 'n = ±2 装 2 个波长，n = ±3 装 3 个。', ['n = 0 是整体平移，不算振动。', .3],
    ['λ = 0.7 米就不行：1 米里装 1.43 个波长，绕一圈接不上。', .8], ['负的 n 也要数：k > 0 向右走，k < 0 向左走，', .2], ['这是两个不同的模式。', .8]],
  draw(g, lt, s) {
    const L = s.L, cx = 520, cy = 520, R = 230;
    let nEff = 1, col = C.gold;
    if (lt > L[2]) nEff = 2; if (lt > L[2] + 2.2) nEff = 3; if (lt > L[3]) nEff = 0; if (lt > L[4]) { nEff = 1 / .7; col = C.red; } if (lt > L[5]) { nEff = 1; col = C.gold; }
    const dir = lt > L[5] + 2.2 ? -1 : 1;
    if (lt > L[1] - .3) ringWave(g, cx, cy, R, nEff, dir * lt * 2.2, nEff === 0 ? 0 : 46, col, 1);
    if (nEff === 0 && lt > L[3]) { g.save(); g.strokeStyle = C.gold; g.lineWidth = 5; g.beginPath(); g.arc(cx, cy, R + 30 * Math.sin(lt * 3) * .3, 0, 7); g.stroke(); g.restore(); }
    txt(g, lt > L[4] && lt < L[5] ? '1.43 个波长：接不上 ✕' : lt > L[5] ? (dir > 0 ? 'k > 0：绕向一边走' : 'k < 0：绕向另一边走') : nEff === 0 ? 'n = 0：整体平移' : `n = ${Math.round(nEff)}：${Math.round(nEff)} 个波长`, cx, cy + R + 110, { size: 40, w: 900, col: lt > L[4] && lt < L[5] ? C.red : C.gold, al: 'center', a: seg(lt, L[1], .4) });
    if (lt > L[5]) { const t2 = rad => rad; g.save(); g.strokeStyle = C.gold; g.lineWidth = 5; g.beginPath(); g.arc(cx, cy, R - 70, dir > 0 ? -2.4 : -.7, dir > 0 ? -.7 : -2.4, dir < 0); g.stroke(); g.restore(); }
    // 表
    const tx = 1000, ty = 260, ta = seg(lt, L[0], .4);
    rrect(g, tx - 30, ty - 70, 860, 470, 16, 'rgba(8,14,28,.62)', 'rgba(94,200,255,.35)', 2, ta);
    ['n', 'k（rad/m）', 'λ', '含义'].forEach((h, j) => txt(g, h, tx + [40, 220, 430, 640][j], ty - 20, { size: 30, w: 700, col: C.mute, al: 'center', a: ta }));
    const rows = [['0', '0', '—', '整体平移', L[3]], ['±1', '±2π', '1 m', '装 1 个波长', L[1]], ['±2', '±4π', '0.5 m', '装 2 个', L[2]], ['±3', '±6π', '0.33 m', '装 3 个', L[2] + 1.6]];
    rows.forEach((r, j) => r.slice(0, 4).forEach((c, k) => txt(g, c, tx + [40, 220, 430, 640][k], ty + 55 + j * 80, { size: 34, mono: k < 3, w: k === 3 ? 700 : 500, col: k === 3 ? C.ink : C.gold, al: 'center', a: seg(lt, r[4], .4) })));
    txt(g, 'λ = 0.7 m ✕', tx + 400, ty + 380, { size: 40, w: 900, col: C.red, al: 'center', a: seg(lt, L[4], .4) });
  } });

// ---------- 5 三维：k 变成矢量 ----------
S.push({ sec: '3  推广到三维', secEn: 'k BECOMES A VECTOR',
  lines: ['三维的波有方向，所以 k 变成矢量 (k_x, k_y, k_z)。', '方向是波传播的方向；大小 |k| = 2π/λ，和一维相同。', ['平面波写成 u = A cos(k·r − ωt)。', .4], ['检验：k 沿 x 轴时，k_y = k_z = 0，', .2], ['就退回一维的 cos(kx − ωt)。', .8]],
  draw(g, lt, s) {
    const L = s.L, cx = 520, cy = 540, ang = lt < L[3] ? .55 + .25 * Math.sin(lt * .6) : .55 * (1 - ease(lin(lt, L[3], 1.2)));
    const ux = Math.cos(ang), uy = -Math.sin(ang), lam = 120;
    g.save(); g.beginPath(); g.rect(160, 220, 720, 640); g.clip();
    for (let k = -8; k <= 8; k++) { const d = k * lam + ((lt * 60) % lam), px = cx + ux * d, py = cy + uy * d;
      line(g, px - uy * 600, py + ux * 600, px + uy * 600, py - ux * 600, k % 2 ? 'rgba(94,200,255,.25)' : 'rgba(94,200,255,.55)', 3); }
    g.restore();
    rrect(g, 160, 220, 720, 640, 14, null, 'rgba(169,188,211,.4)', 2);
    arrow(g, cx, cy, cx + ux * 230, cy + uy * 230, C.gold, 7, 26); tex(g, 'l_k', cx + ux * 260, cy + uy * 260, { size: .9, col: 'gold', al: 'center' });
    txt(g, '波阵面', 300, 260, { size: 30, w: 700, col: C.blue, a: seg(lt, L[1], .4) });
    tex(g, 'kvec', 1000, 300, { size: .9, rev: lin(lt, L[0], 1.4) });
    tex(g, 'plane', 1000, 470, { size: .62, rev: lin(lt, L[2], 1.8) });
    tex(g, 'check', 1000, 640, { size: .8, rev: lin(lt, L[3], 1.6) });
  } });

// ---------- 6 三个方向各自首尾相接 ----------
S.push({ sec: '3  立方体：三个方向各自首尾相接', secEn: 'PBC IN 3D',
  lines: ['固体取边长 L 的立方体，体积 V = L³。', 'x、y、z 三个方向，各自首尾相接。', ['x 方向：u(x + L, y, z) = u(x, y, z)，', .2], ['所以 k_x L = 2π n_x。', .4], ['y、z 方向同理。', .3], ['合起来：k = 2π/L ·(n_x, n_y, n_z)。', 1.0]],
  cues: [[s => s.L[5] + 1.0, 'ding']],
  draw(g, lt, s) {
    const L = s.L, pr = P3(470, 560, 230, .65 + .12 * Math.sin(lt * .4)), ca = seg(lt, .1, .5);
    const v = [-1, 1], E = [];
    v.forEach(a => v.forEach(b => { E.push([[-1, a, b], [1, a, b]]); E.push([[a, -1, b], [a, 1, b]]); E.push([[a, b, -1], [a, b, 1]]); }));
    E.forEach(([p, q]) => seg3(g, pr, p, q, 'rgba(169,188,211,.8)', 3, ca));
    const wrap = (ax, col, t0) => { const a = seg(lt, t0, .5); if (a <= 0) return; const o = [0, 0, 0], e = [0, 0, 0], st = [0, 0, 0]; e[ax] = 1.45; st[ax] = -1.45; o[ax] = 1.0;
      arrow3(g, pr, o, e, col, 6, a); const s2 = [...st], s3 = [...st]; s3[ax] = -1.0; arrow3(g, pr, s2, s3, col, 6, a); };
    wrap(0, C.gold, L[1]); wrap(1, VIO, L[1] + .5); wrap(2, C.green, L[1] + 1.0);
    const lb = (k, p3, col) => { const [x, y] = pr(...p3); tex(g, k, x, y, { size: .8, col, al: 'center', a: seg(lt, L[1], .5) }); };
    lb('l_rx', [1.75, 0, 0], 'gold'); lb('l_ry', [0, 1.75, 0], VIO); lb('l_rz', [0, 0, 1.8], C.green);
    tex(g, 'c1', 1000, 240, { size: 1.0, rev: lin(lt, L[0], .8) });
    tex(g, 'c2', 1000, 380, { size: .8, rev: lin(lt, L[2], 2.0) });
    tex(g, 'c3', 1000, 500, { size: .8, rev: lin(lt, L[4], 1.4) });
    tex(g, 'title_k', 1080, 680, { size: 1.15, rev: lin(lt, L[5], 1.2) });
    memo(g, 1020, 600, 760, 160, seg(lt, L[5] + 1.2, .5), '值得直接记住');
  } });

// ---------- 7 k 空间格点 ----------
S.push({ sec: '4  为什么叫“格点”', secEn: 'k-SPACE LATTICE',
  lines: ['以 k_x、k_y、k_z 为坐标轴，画一个空间，叫 k 空间。', '允许的 k，坐标都是 2π/L 的整数倍，', ['排成间距 2π/L 的立方格子，像三维的围棋盘。', .4], ['每个格点，就是一个允许的波（固定一种偏振时）。', 1.0]],
  draw(g, lt, s) {
    const L = s.L, pr = P3(640, 540, 82, .5 + lt * .12), N = 3, aa = seg(lt, .1, .5);
    arrow3(g, pr, [-3.8, 0, 0], [3.9, 0, 0], C.axis, 3, aa); arrow3(g, pr, [0, -3.8, 0], [0, 3.9, 0], C.axis, 3, aa); arrow3(g, pr, [0, 0, -3.8], [0, 0, 3.9], C.axis, 3, aa);
    const lab = (k, p3) => { const [x, y] = pr(...p3); tex(g, k, x, y, { size: .75, al: 'center', a: aa }); };
    lab('l_kx', [4.4, 0, 0]); lab('l_ky', [0, 4.4, 0]); lab('l_kz', [0, 0, 4.5]);
    const pts = []; for (let i = -N; i <= N; i++) for (let j = -N; j <= N; j++) for (let k = -N; k <= N; k++) { const [x, y, d] = pr(i, j, k); pts.push([x, y, d, i, j, k]); }
    pts.sort((a, b) => a[2] - b[2]);
    pts.forEach(([x, y, d, i, j, k], idx) => { const a = seg(lt, L[1] + idx * .004, .3); const r = 4 + 2.2 * (d + 4) / 8;
      const hot = i === 2 && j === 1 && k === 1 && lt > L[3]; dot(g, x, y, hot ? 12 : r, hot ? C.gold : 'rgba(94,200,255,.85)', a, hot ? 20 : 0); });
    if (lt > L[3]) { const [hx, hy] = pr(2, 1, 1), [ox, oy] = pr(0, 0, 0); arrow(g, ox, oy, hx, hy, C.gold, 5, 18, seg(lt, L[3], .4));
      bubble(g, '一个格点 = 一个允许的波', hx + 120, hy - 90, hx + 10, hy - 14, seg(lt, L[3] + .3, .4)); }
    if (lt > L[2]) { const [ax, ay] = pr(1, 0, 0), [bx, by] = pr(2, 0, 0); brace(g, ax, ay + 18, bx, by + 18, C.gold, seg(lt, L[2], .4), -16);
      tex(g, 'l_sp', (ax + bx) / 2, (ay + by) / 2 + 70, { size: .7, col: 'gold', al: 'center', a: seg(lt, L[2], .4) }); }
    txt(g, '间距 2π/L 的立方格子', 1500, 300, { size: 44, w: 900, col: C.gold, al: 'center', a: seg(lt, L[2], .5) });
    txt(g, '（固定一种偏振）', 1500, 370, { size: 32, col: C.mute, al: 'center', a: seg(lt, L[3], .5) });
  } });

// ---------- 8 格点有多密 ----------
S.push({ sec: '4  格点有多密', secEn: 'HOW DENSE',
  lines: ['格点有多密？取 L = 1 厘米：间距 2π/L ≈ 628 rad/m。', '而 k 最大到 π/a 左右，a ≈ 3×10⁻¹⁰ 米是原子间距，', ['约 10¹⁰ rad/m。', .3], ['每个方向上，格点有 10¹⁰ / 628，约 10⁷ 个。', .4], ['极其密集，所以后面可以把“数格点”换成“算体积”。', 1.0]],
  draw(g, lt, s) {
    const L = s.L, z = 1 + 30 * ease(lin(lt, L[3], 2.4)), sp = 70 / z, cx = 520, cy = 540, a0 = seg(lt, .1, .4);
    g.save(); g.beginPath(); g.rect(140, 200, 760, 680); g.clip();
    if (sp > 6) { for (let i = -Math.ceil(380 / sp); i <= Math.ceil(380 / sp); i++) for (let j = -Math.ceil(340 / sp); j <= Math.ceil(340 / sp); j++) dot(g, cx + i * sp, cy + j * sp, Math.max(1.2, 6 / Math.sqrt(z)), 'rgba(94,200,255,.85)', a0); }
    else { g.globalAlpha = a0 * .55; g.fillStyle = C.blue; g.fillRect(140, 200, 760, 680); }
    g.restore(); rrect(g, 140, 200, 760, 680, 14, null, 'rgba(169,188,211,.4)', 2, a0);
    txt(g, sp > 6 ? '放大看：一个个点' : '缩小看：连成一片', cx, 920 - 20, { size: 36, w: 700, col: C.gold, al: 'center', a: a0 });
    tex(g, 'dens1', 1000, 280, { size: .82, rev: lin(lt, L[0], 1.4) });
    tex(g, 'dens2', 1000, 440, { size: .8, rev: lin(lt, L[1], 1.8) });
    tex(g, 'dens3', 1000, 600, { size: .9, rev: lin(lt, L[3], 1.2) });
    pill(g, '数格点  →  算体积', 1360, 760, C.gold, { al: 'center', a: seg(lt, L[4], .5), size: 44 });
  } });

// ---------- 9 为什么选首尾相接 ----------
S.push({ sec: '5  为什么偏偏选“首尾相接”', secEn: 'WHY PERIODIC',
  lines: ['真实的固体当然不是首尾相接的。', '也可以选“两端固定”：u(0) = u(L) = 0，', ['得到驻波 k = πn/L：间距减半，但 n 只取正的。', .4], ['数一数 |k| < K 里的点：两种算法都是 KL/π 个。', .6],
    ['格点密度一样，最后得到的 D(ω) 完全相同。', .4], 'L 很大时，边界只影响表面附近极少数原子，', ['选周期边界条件，只是因为它给出行波，计算最方便。', 1.0]],
  draw(g, lt, s) {
    const L = s.L, x0 = 960, u = 70, y1 = 330, y2 = 560;
    const axisRow = (y, a, lab) => { line(g, 220, y, 1700, y, C.axis, 3, null, a); txt(g, lab, 200, y, { size: 32, w: 700, al: 'right', a }); dot(g, x0, y, 5, C.mute, a); txt(g, '0', x0, y - 36, { size: 26, mono: true, col: C.mute, al: 'center', a }); };
    const a1 = seg(lt, .1, .4), a2 = seg(lt, L[1], .4);
    axisRow(y1, a1, '周期'); axisRow(y2, a2, '两端固定');
    for (let n = -5; n <= 5; n++) dot(g, x0 + n * 2 * u, y1, 11, C.gold, a1 * (n === 0 ? .5 : 1), 10);
    for (let n = 1; n <= 10; n++) dot(g, x0 + n * u, y2, 11, VIO, seg(lt, L[2] + n * .05, .3), 10);
    txt(g, 'k = 2πn/L，n ∈ ℤ', 1720, y1 - 60, { size: 30, w: 700, col: C.gold, al: 'right', a: a1 });
    txt(g, 'k = πn/L，n = 1, 2, …', 1720, y2 - 60, { size: 30, w: 700, col: VIO, al: 'right', a: seg(lt, L[2], .4) });
    const ka = seg(lt, L[3], .4), K = 6.5 * u;
    g.save(); g.globalAlpha = ka * .14; g.fillStyle = C.green; g.fillRect(x0 - K, y1 - 40, 2 * K, 80); g.fillRect(x0, y2 - 40, K, 80); g.restore();
    txt(g, '≈ KL/π 个', x0, y1 + 70, { size: 34, w: 900, col: C.green, al: 'center', a: ka }); txt(g, '≈ KL/π 个', x0 + K / 2, y2 + 70, { size: 34, w: 900, col: C.green, al: 'center', a: ka });
    tex(g, 'cnt', W / 2, 760, { size: .85, al: 'center', rev: lin(lt, L[3] + .4, 1.4) });
    tex(g, 'fix1', W / 2, 870, { size: .75, al: 'center', a: seg(lt, L[2], .4) * (1 - seg(lt, L[3] + .2, .3)) });
    pill(g, '密度一样 → D(ω) 相同', W / 2, 880, C.gold, { al: 'center', a: seg(lt, L[4], .4) * (1 - seg(lt, L[5], .3)), size: 36 });
    pill(g, '选周期：给出行波，计算最方便', W / 2, 880, C.blue, { al: 'center', a: seg(lt, L[6], .4), size: 36 });
  } });

// ---------- 10 一句话 ----------
S.push({ sec: '一句话', secEn: 'SUMMARY',
  lines: ['一句话：固体首尾相接成圈，周长必须装下整数个波长，', ['所以 k = 2πn/L；', .3], ['三维时每个方向各自满足，允许的 k 排成间距 2π/L 的格点。', .6], ['考试：这个式子要写出来，它是计算的第一步。', .8], ['下一节：数格点，得到态密度。', 1.6]], tail: 1.6,
  draw(g, lt, s) {
    const L = s.L;
    ringWave(g, 400, 440, 170, 3, lt * 2, 34, C.gold, seg(lt, L[0], .5), false);
    tex(g, 'd5', 1180, 330, { size: .9, al: 'center', a: seg(lt, L[1], .5) });
    tex(g, 'title_k', 1180, 500, { size: 1.15, al: 'center', a: seg(lt, L[2], .5) });
    memo(g, 760, 600, 840, 140, seg(lt, L[3], .5), '考试要写出来');
    tex(g, 'title_k', 1180, 670, { size: .95, al: 'center', a: seg(lt, L[3], .5) });
    txt(g, '下一节 ③：数格点 → 态密度', 1180, 860, { size: 44, w: 900, col: C.gold, al: 'center', a: seg(lt, L[4], .5) });
  } });

window.OVERLAY = (g, T) => {     // 只有进度条，不放水印
  g.save(); g.fillStyle = 'rgba(169,188,211,.12)'; g.fillRect(0, 0, W, 6); g.fillStyle = 'rgba(255,200,87,.85)'; g.fillRect(0, 0, W * T / TOTAL, 6);
  SCENES.forEach(c => { if (c.t0 > 0) { g.fillStyle = 'rgba(10,17,32,.9)'; g.fillRect(W * c.t0 / TOTAL - 1, 0, 2, 6); } }); g.restore();
};
setup(S);
