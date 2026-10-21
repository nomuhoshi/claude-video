// 泰勒展开 · 第一部分（笔记 ①–③）：导数 → 零次近似 → 一次近似
// 金色 = 这一步变化/最终结果；冰蓝 = 原函数；红 = 增量与误差；紫 = 近似线
const F = x => 0.5 + 0.9 * x - 0.55 * x * x + 0.12 * x * x * x;          // 笔记草图那样的曲线：先升、变平、再升
const dF = x => 0.9 - 1.1 * x + 0.36 * x * x;
const A0 = 2.4;                                                              // 展开点 a
const S = [];

// ---------- 0 片头 ----------
S.push({ lines: ['泰勒展开只做一件事：', '在一个点附近，用多项式去模仿一个复杂的函数。', '这一部分从导数开始，推到一次近似。'], lead: 1.3,
  draw(g, lt, s) {
    txt(g, '泰勒展开', W / 2, 200, { size: 128, w: 900, serif: true, al: 'center', a: seg(lt, .3, .9), glow: 'rgba(255,200,87,.35)' });
    txt(g, 'TAYLOR EXPANSION', W / 2, 296, { size: 30, mono: true, col: C.mute, al: 'center', a: seg(lt, .7, .8) });
    // 示意：sin x 在 0 点附近，越来越高次的多项式越贴越远
    const P = Plot(360, 752, 120, 120, -5, 5, -1.6, 1.6), ya = seg(lt, s.L[1], .8);
    line(g, P.X(-5), P.Y(0), P.X(5), P.Y(0), 'rgba(169,188,211,.35)', 2, null, ya);
    curve(g, P.fn(Math.sin), P.X(-5), P.X(5), C.blue, 5, ya);
    const ords = [1, 3, 5, 7, 9], cols = ['#B48CFF', '#C69CFF', '#D8ACFF', '#E9C0FF', '#FFC857'];
    const taylor = (x, n) => { let t = 0, term = x; for (let k = 1; k <= n; k += 2) { t += term; term *= -x * x / ((k + 1) * (k + 2)); } return t; };
    ords.forEach((n, j) => { const aj = seg(lt, s.L[1] + 0.9 + j * 0.55, .5) * (j === ords.length - 1 ? 1 : 1 - .65 * seg(lt, s.L[1] + 1.45 + j * 0.55, .5));
      g.save(); g.beginPath(); g.rect(P.X(-5), P.Y(1.6), P.X(5) - P.X(-5), P.Y(-1.6) - P.Y(1.6)); g.clip();
      curve(g, P.fn(x => taylor(x, n)), P.X(-5), P.X(5), cols[j], 3, aj, [10, 8]); g.restore(); });
    dot(g, P.X(0), P.Y(0), 9, C.gold, ya, 20);
    tex(g, 'title_sum', W / 2, 860, { size: .62, al: 'center', a: seg(lt, s.L[2], .8) * .9 });
  } });

// ---------- 1 导数 ----------
S.push({ sec: '① 导数', secEn: 'DERIVATIVE = SLOPE',
  lines: ['先画出函数 f(x) 的曲线，在横轴上取一点 a。', '把 a 附近这一小段放大来看。', '从 a 往右走一小步 h，走到 a + h。',
    '函数值从 f(a) 变到 f(a + h)，升高了 f(a + h) − f(a)。', '升高量除以走过的距离，就是这两点连线的斜率。',
    ['让 h 越来越小，a + h 就向 a 靠拢，', .8], '连线转成了曲线在 a 点的切线。', ['这个极限，就定义为 a 点的导数 f′(a)。', .6]],
  cues: [[s => s.L[7] + .9, 'ding']],
  draw(g, lt, s) {
    const L = s.L, P = Plot(130, 660, 155, 170, 0, 3.6, 0, 2.6);
    const ga = seg(lt, L[0] - .5, .8);
    axes(g, P, ga, 'l_x', 'l_fx');
    curve(g, P.fn(F), P.X(0), P.X(3.5), '#B48CFF', 5, ga, null, seg(lt, L[0], 1.6));
    const xa = P.X(A0), ya = P.Y(F(A0)), aa = seg(lt, L[0] + 1.2, .5);
    line(g, xa, ya, xa, P.Y(0), C.mute, 2, [6, 7], aa); dot(g, xa, ya, 7, C.ink, aa);
    tex(g, 'l_a', xa, P.Y(0) + 34, { size: .7, al: 'center', a: aa }); tex(g, 'l_fa', xa - 14, ya - 44, { size: .6, al: 'right', a: aa });
    // 红框 + 放大箭头（同笔记）
    const za = seg(lt, L[1], .6);
    rrect(g, xa - 34, ya - 50, 120, 70, 6, null, C.red, 3, za);
    const zx0 = 860, zx1 = 1840, zy0 = 150, zy1 = 640;
    arrow(g, xa + 92, ya - 20, zx0 - 20, 330, C.red, 3, 18, za);
    rrect(g, zx0, zy0, zx1 - zx0, zy1 - zy0, 14, 'rgba(8,14,28,.55)', 'rgba(255,85,119,.45)', 2, za);
    // 放大视图：h 从 0.9 缩到很小
    const hs = seg(lt, L[5], 3.2), h = mixN(0.9, 0.035, Math.pow(hs, 0.85));
    const Z = Plot(zx0 + 80, 600, 700, 520, A0 - 0.05, A0 + 1.25, 1.0, 1.85);
    g.save(); g.beginPath(); g.rect(zx0, zy0, zx1 - zx0, zy1 - zy0); g.clip();
    curve(g, Z.fn(F), Z.X(A0 - .05), Z.X(A0 + 1.2), '#B48CFF', 5, za);
    const pa = [Z.X(A0), Z.Y(F(A0))], pb = [Z.X(A0 + h), Z.Y(F(A0 + h))], sa = seg(lt, L[2], .6);
    // 连线（延长到整个面板），h 小了以后变成切线（金色）
    const k = (pb[1] - pa[1]) / (pb[0] - pa[0]), sl = seg(lt, L[4], .6), tg = seg(lt, L[6], .8);
    const sc = tg > 0 ? C.gold : C.ink;
    line(g, zx0, pa[1] + k * (zx0 - pa[0]), zx1, pa[1] + k * (zx1 - pa[0]), sc, 3, null, sl * .9);
    // h 与 Δy
    line(g, pa[0], pa[1], pb[0], pa[1], C.red, 2, [6, 6], sa); line(g, pb[0], pa[1], pb[0], pb[1], C.red, 2, [6, 6], seg(lt, L[3], .5));
    g.restore();
    dot(g, pa[0], pa[1], 8, C.ink, za); dot(g, pb[0], pb[1], 8, C.red, sa, 14);
    tex(g, 'l_fa', pa[0] - 16, pa[1] - 6, { size: .62, al: 'right', a: za });
    const hb = 1 - seg(lt, L[5], .5);
    brace(g, pa[0], pa[1] + 14, pb[0], pa[1] + 14, C.red, sa * hb, -20);
    tex(g, 'l_h', (pa[0] + pb[0]) / 2, pa[1] + 64, { size: .7, al: 'center', a: sa * hb, col: 'red' });
    const db = seg(lt, L[3], .5) * hb;
    brace(g, pb[0] + 14, pa[1], pb[0] + 14, pb[1], C.red, db, 20);
    tex(g, 'l_dy', pb[0] + 46, (pa[1] + pb[1]) / 2, { size: .6, a: db, col: 'red' });
    tex(g, 'l_fah', pb[0] - 10, pb[1] - 40, { size: .6, al: 'center', a: sa * hb });
    // 面板下方：数值读数
    const rd = seg(lt, L[4], .6);
    txt(g, `h = ${h.toFixed(3)}`, zx0 + 30, zy0 + 40, { size: 30, mono: true, col: C.red, a: rd });
    txt(g, `斜率 = ${((F(A0 + h) - F(A0)) / h).toFixed(3)}`, zx0 + 30, zy0 + 82, { size: 30, mono: true, col: tg > 0 ? C.gold : C.ink, a: rd });
    txt(g, `f′(a) = ${dF(A0).toFixed(3)}`, zx0 + 30, zy0 + 124, { size: 30, mono: true, col: C.gold, a: seg(lt, L[6], .6) });
    // 公式区
    const fa1 = seg(lt, L[4] + .3, .5) * (1 - seg(lt, L[7] - .2, .4));
    txt(g, '斜率 =', 900, 800, { size: 46, w: 700, a: Math.max(fa1, seg(lt, L[7], .5)) });
    tex(g, 'd_slope', 1050, 800, { size: .9, a: fa1, rev: lin(lt, L[4] + .3, 1.0) });
    tex(g, 'd_lim', 1050, 800, { size: .9, a: seg(lt, L[7], .5), rev: lin(lt, L[7], 1.2) });
    memo(g, 870, 715, 990, 175, seg(lt, L[7] + 1.4, .6), '导数的定义');
  } });

// ---------- 2 例子：x^2 在 a=1 ----------
S.push({ sec: '① 导数 · 例子', secEn: 'f(x) = x²,  a = 1',
  lines: ['例子：f(x) = x²，在 a = 1 处求导。', '按定义，先写出差商。', '(1 + h)² 展开是 1 + 2h + h²，减去 1，剩下 2h + h²。',
    '分子分母同除以 h，得到 2 + h。', ['让 h 趋于 0，2 + h 就趋于 2：f′(1) = 2。', .4], ['数值上也看得出来：h 越小，差商越接近 2。', .8]],
  cues: [[s => s.L[4] + 1.6, 'ding']],
  draw(g, lt, s) {
    const L = s.L, x0 = 150;
    tex(g, 'ex_head', x0, 200, { size: .9, a: seg(lt, L[0], .6), rev: lin(lt, L[0], .8), base: true });
    tex(g, 'ex1', x0, 360, { size: .82, rev: lin(lt, L[1], 1.6), base: true });
    tex(g, 'ex2', x0 + 40, 520, { size: .82, rev: lin(lt, L[2], 2.4), base: true });
    tex(g, 'ex3', x0 + 40, 640, { size: .9, rev: lin(lt, L[3], .8), base: true });
    stepTag(g, '分子分母同除以 h', x0 + 300, 625, C.blue, seg(lt, L[3] + .4, .5));
    tex(g, 'ex4', x0 + 40, 770, { size: .9, rev: lin(lt, L[4], 1.4), base: true });
    // 表：h 越小，差商越接近 2（页面里真算）
    const ta = seg(lt, L[5] - .2, .6), tx = 1320, ty = 300;
    rrect(g, tx - 40, ty - 80, 520, 420, 16, 'rgba(8,14,28,.6)', 'rgba(94,200,255,.35)', 2, ta);
    tex(g, 'l_h', tx + 40, ty - 28, { size: .7, al: 'center', a: ta }); tex(g, 'ex_q', tx + 300, ty - 28, { size: .5, al: 'center', a: ta });
    line(g, tx - 20, ty + 22, tx + 460, ty + 22, 'rgba(169,188,211,.35)', 2, null, ta);
    [0.1, 0.01, 0.001, 0.0001].forEach((h, j) => { const q = ((1 + h) * (1 + h) - 1) / h, ra = seg(lt, L[5] + j * .45, .4);
      txt(g, String(h), tx + 40, ty + 70 + j * 76, { size: 38, mono: true, al: 'center', a: ra });
      txt(g, q.toFixed(4), tx + 300, ty + 70 + j * 76, { size: 38, mono: true, al: 'center', col: j === 3 ? C.gold : C.ink, a: ra }); });
  } });

// ---------- 3 零次近似 ----------
S.push({ sec: '② 最粗的近似：只看一个点', secEn: 'ZEROTH ORDER',
  lines: ['最粗的近似：只看一个点。', 'x 离 a 很近时，函数值几乎不变，', '于是 f(x) ≈ f(a)，这叫零次近似。', '相当于用一条水平线代替曲线。', ['离 a 一远，水平线和曲线就分开了。', .8]],
  draw(g, lt, s) {
    const L = s.L, P = Plot(240, 820, 280, 220, 0, 3.6, 0, 2.6);
    const ga = seg(lt, .1, .6);
    axes(g, P, ga, 'l_x', 'l_y'); curve(g, P.fn(F), P.X(0), P.X(3.5), C.blue, 5, ga);
    const xa = P.X(A0), ya = P.Y(F(A0));
    line(g, xa, ya, xa, P.Y(0), C.mute, 2, [6, 7], ga); tex(g, 'l_a', xa, P.Y(0) + 34, { size: .7, al: 'center', a: ga });
    dot(g, xa, ya, 9, C.gold, ga, 18);
    const ha = seg(lt, L[3], .8);
    line(g, P.X(0), ya, mixN(xa, P.X(3.6), 1), ya, '#B48CFF', 4, [14, 10], ha);
    line(g, xa, ya, mixN(xa, P.X(0), ha), ya, '#B48CFF', 4, [14, 10], ha);
    tex(g, 'l_yfa', P.X(0.15), ya - 36, { size: .62, a: ha, col: '#B48CFF' });
    tex(g, 'z1', 1250, 260, { size: 1.1, rev: lin(lt, L[2], 1.0) });
    pill(g, '零次近似', 1310, 360, C.gold, { a: seg(lt, L[2] + .8, .5) });
    // 探针：x 从 a 往右走，红色竖线是误差
    const pa = seg(lt, L[4], .4), px = A0 + 1.1 * Math.sin(Math.PI / 2 * lin(lt, L[4] + .2, 2.4)) * (1 - 0) ;
    const X = P.X(px), Yc = P.Y(F(px));
    line(g, X, ya, X, Yc, C.red, 4, null, pa); dot(g, X, Yc, 8, C.blue, pa); dot(g, X, ya, 8, '#B48CFF', pa);
    txt(g, `误差 ${Math.abs(F(px) - F(A0)).toFixed(2)}`, X + 20, (ya + Yc) / 2, { size: 32, w: 700, col: C.red, a: pa });
  } });

// ---------- 4 一次近似：笔记原样四行 ----------
S.push({ sec: '③ 一次近似：加上斜率', secEn: 'FIRST ORDER',
  lines: ['一次近似：在零次近似上，加上斜率。', '令 x = a + h，也就是 h = x − a。', '从导数的定义出发。',
    ['h 很小但不是 0 时，去掉极限，等号变成约等号。', .4], ['再把 a + h 换成 x，把 h 换成 x − a。', .4], ['两边同乘 (x − a)。', .3],
    ['把 f(a) 移到右边，', .2], ['就得到一次近似：f(x) ≈ f(a) + f′(a)(x − a)。', .8],
    ['笔记里这里写的是等号；严格说只有 h → 0 时才相等，所以用 ≈。', .6]],
  cues: [[s => s.L[7] + 1.2, 'ding']],
  draw(g, lt, s) {
    const L = s.L, x0 = 190, tagX = 1500;
    // 行 1：令 x = a + h
    const a1 = seg(lt, L[1], .4);
    txt(g, '令', x0, 220, { size: 50, w: 700, a: a1 });
    tex(g, 'eA', x0 + 72, 220, { size: .95, rev: lin(lt, L[1], 1.0) });
    // 行 2：f'(a) = lim ...  →  ≈ ...  →  ≈ (f(x)-f(a))/(x-a)
    const b1 = seg(lt, L[2], .3) * (1 - seg(lt, L[3] + .2, .5)), b2 = seg(lt, L[3] + .2, .5);
    tex(g, 'eB1', x0, 400, { size: .9, a: b1, rev: lin(lt, L[2], 1.4), base: true });
    tex(g, 'eB2', x0, 400, { size: .9, a: b2, base: true });
    stepTag(g, 'h 很小：去掉极限', tagX, 380, C.gold, b2 * (1 - seg(lt, L[4], .4)));
    tex(g, 'eB3', x0 + texW('eB2', .9), 400, { size: .9, rev: lin(lt, L[4] + .2, 1.2), base: true });
    stepTag(g, '代入 a+h=x，h=x−a', tagX, 380, C.gold, seg(lt, L[4] + .4, .4));
    // 代入时，行 1 里对应的式子一起亮
    if (lt > L[4] && lt < L[5]) rrect(g, x0 + 62, 180, texW('eA', .95) + 20, 80, 12, 'rgba(255,200,87,.10)', C.gold, 2, seg(lt, L[4], .3) * (1 - seg(lt, L[5] - .3, .3)));
    // 行 3：两边乘 (x - a)
    tex(g, 'eC', x0, 560, { size: .95, rev: lin(lt, L[5], 1.2), base: true });
    stepTag(g, '两边 ×(x−a)', tagX, 545, C.blue, seg(lt, L[5] + .4, .4));
    // 行 4：移项
    tex(g, 'eD', x0, 700, { size: .95, rev: lin(lt, L[6], 1.2), base: true });
    stepTag(g, '移项', tagX, 685, C.blue, seg(lt, L[6] + .4, .4));
    txt(g, '（一次近似）', x0 + texW('eD', .95) + 30, 686, { size: 40, w: 700, col: C.gold, a: seg(lt, L[7], .5) });
    memo(g, x0 - 40, 630, 1090, 110, seg(lt, L[7] + .6, .6) * (1 - seg(lt, L[7] + 1.3, .4)));
    const ul = seg(lt, L[7] + 1.4, .8); curve(g, px => 742 + 6 * Math.sin((px - x0) / 26), x0, x0 + texW('eD', .95), C.red, 3, ul, null, ul);
    txt(g, '切线', x0 + texW('eD', .95) / 2, 775, { size: 34, w: 700, col: C.red, al: 'center', a: ul });
    // 注：≈ 与 =
    txt(g, '注：严格写法是 ≈，只有 h → 0 时两边才相等。', x0, 840, { size: 32, col: C.mute, a: seg(lt, L[8], .6) });
  } });

// ---------- 5 一次近似 = 切线：画出来、算出来 ----------
const Q = x => x * x, TQ = x => 1 + 2 * (x - 1);
S.push({ sec: '③ 一次近似 · 检验', secEn: 'TANGENT LINE',
  lines: ['画出来看：一次近似就是曲线在 a 点的切线。', '在 a 附近，切线和曲线几乎贴在一起。', '用 f(x) = x² 在 a = 1 检验：f(1) = 1，f′(1) = 2，', '所以切线是 y = 1 + 2(x − 1)。',
    ['x = 1.1 时，真值 1.21，切线给 1.2，只差 0.01。', .4], ['x = 1.5 时，真值 2.25，切线给 2，差了 0.25。', .4],
    ['相减一下，误差正好是 (x − 1)²。', .4], ['离 a 的距离变成 5 倍，误差变成 25 倍。', .6]],
  cues: [[s => s.L[6] + 1.0, 'ding']],
  draw(g, lt, s) {
    const L = s.L, P = Plot(170, 850, 330, 135, 0, 2.2, 0, 4.7);
    const ga = seg(lt, .1, .6);
    axes(g, P, ga, 'l_x', 'l_y');
    curve(g, P.fn(Q), P.X(0), P.X(2.15), C.blue, 5, ga);
    tex(g, 'l_sq', P.X(2.0) - 40, P.Y(4.4), { size: .62, al: 'right', a: ga, col: 'blue' });
    const xa = P.X(1), ya = P.Y(1);
    dot(g, xa, ya, 9, C.gold, ga, 18); line(g, xa, ya, xa, P.Y(0), C.mute, 2, [6, 7], ga);
    tex(g, 'l_one', xa, P.Y(0) + 32, { size: .7, al: 'center', a: ga });
    const ta = seg(lt, L[0] + .4, .8);
    curve(g, P.fn(TQ), P.X(0.45), P.X(2.15), '#B48CFF', 4, ta, [14, 9]);
    tex(g, 'sq_head', 1180, 190, { size: .8, rev: lin(lt, L[2], .9), base: true });
    tex(g, 'l_tan', 1180, 290, { size: .8, rev: lin(lt, L[3], .9), col: '#B48CFF', base: true });
    // 两个探针 + 误差（页面里真算）
    const rows = [[1.1, L[4]], [1.5, L[5]]];
    const tx = 1150, ty = 420;
    const tab = seg(lt, L[4] - .2, .5);
    rrect(g, tx - 30, ty - 60, 700, 260, 16, 'rgba(8,14,28,.6)', 'rgba(94,200,255,.35)', 2, tab);
    ['x', '真值 x²', '切线', '误差'].forEach((h, j) => txt(g, h, tx + 40 + j * 170, ty - 20, { size: 30, w: 700, col: C.mute, al: 'center', a: tab }));
    rows.forEach(([x, t0], j) => {
      const ra = seg(lt, t0, .5), X = P.X(x);
      line(g, X, P.Y(TQ(x)), X, P.Y(Q(x)), C.red, 5, null, ra); dot(g, X, P.Y(Q(x)), 7, C.blue, ra); dot(g, X, P.Y(TQ(x)), 7, '#B48CFF', ra);
      line(g, X, P.Y(TQ(x)), X, P.Y(0), C.mute, 1.5, [4, 6], ra * .7);
      if (j) tex(g, 'l_x5', X, P.Y(0) + 34, { size: .55, al: 'center', a: ra }); else tex(g, 'l_x1', X - 26, P.Y(Q(x)) - 44, { size: .55, al: 'right', a: ra });
      const vals = [x.toFixed(1), Q(x).toFixed(2), TQ(x).toFixed(2), (Q(x) - TQ(x)).toFixed(2)];
      vals.forEach((v, k) => txt(g, v, tx + 40 + k * 170, ty + 50 + j * 80, { size: 38, mono: true, al: 'center', col: k === 3 ? C.red : C.ink, a: ra }));
    });
    tex(g, 'sq_err', 1150, 780, { size: .8, rev: lin(lt, L[6], 1.2), base: true });
    pill(g, '距离 ×5  →  误差 ×25', 1160, 860, C.gold, { a: seg(lt, L[7], .5) });
  } });

// ---------- 6 ④ 为什么还要加项：切线不会弯 ----------
S.push({ sec: '④ 为什么还要加项：切线不会弯', secEn: 'CURVATURE  f″',
  lines: ['为什么还要加项？因为切线不会弯。', '切线是直线，曲线是弯的，', ['离 a 稍远一点，两者就分开了。', .4],
    '二阶导数 f″(a) 是“斜率本身的变化率”，', '也就是曲线在这里弯得有多厉害。',
    ['f″ > 0：斜率越来越大，曲线向上弯，像一只碗。', .6], ['f″ < 0：斜率越来越小，曲线向下弯，像山顶。', .6], ['f″ = 0：斜率不变，这一点不弯。', .6],
    ['要把“弯”也模仿进去，就得加一个 (x − a)² 项。', .6]],
  draw(g, lt, s) {
    const L = s.L;
    // 上半场：x^2 与切线，随着离开 a，缝隙变大
    const top = 1 - seg(lt, L[3] - .3, .5);
    if (top > 0) {
      const P = Plot(520, 880, 340, 140, 0, 2.3, 0, 5.0);
      axes(g, P, top, 'l_x', 'l_y');
      curve(g, P.fn(Q), P.X(0), P.X(2.2), C.blue, 5, top);
      curve(g, P.fn(TQ), P.X(0.4), P.X(2.25), '#B48CFF', 4, top * seg(lt, L[0] + .3, .6), [14, 9]);
      dot(g, P.X(1), P.Y(1), 9, C.gold, top, 18);
      const xp = 1 + 1.1 * ease(lin(lt, L[2], 2.2)), ga = seg(lt, L[2], .4) * top;
      g.save(); g.globalAlpha *= ga; g.fillStyle = 'rgba(255,85,119,.18)'; g.beginPath(); g.moveTo(P.X(1), P.Y(1));
      for (let x = 1; x <= xp; x += .01) g.lineTo(P.X(x), P.Y(Q(x))); for (let x = xp; x >= 1; x -= .01) g.lineTo(P.X(x), P.Y(TQ(x))); g.closePath(); g.fill(); g.restore();
      line(g, P.X(xp), P.Y(TQ(xp)), P.X(xp), P.Y(Q(xp)), C.red, 4, null, ga);
      txt(g, '分开了', P.X(xp) + 18, P.Y((Q(xp) + TQ(xp)) / 2), { size: 34, w: 700, col: C.red, a: ga });
    }
    // 下半场：f'' 的定义 + 三种弯法；一个点沿曲线滑动，切线跟着转，读出斜率
    const bt = seg(lt, L[3] - .1, .6);
    if (bt > 0) {
      tex(g, 'c_def', W / 2, 230, { size: .8, al: 'center', a: bt, rev: lin(lt, L[3], 1.2) });
      txt(g, '斜率的变化率', W / 2, 330, { size: 34, w: 700, col: C.gold, al: 'center', a: seg(lt, L[4], .5) });
      const panels = [['c_pos', x => 0.9 * x * x, x => 1.8 * x, C.green, L[5], '碗（∪）'], ['c_neg', x => -0.9 * x * x, x => -1.8 * x, C.red, L[6], '山顶（∩）'], ['c_zero', x => 0.5 * x, x => 0.5, C.blue, L[7], '直的']];
      panels.forEach(([k, f, df, col, t0, nm], j) => {
        const cx = 360 + j * 600, pa = seg(lt, t0 - .2, .5) * bt; if (pa <= 0) return;
        rrect(g, cx - 260, 400, 520, 470, 16, 'rgba(8,14,28,.55)', 'rgba(169,188,211,.25)', 2, pa);
        tex(g, k, cx, 450, { size: .8, al: 'center', a: pa });
        const P = Plot(cx - 220, 690, 220, 90, -1, 1, -1, 1);
        g.save(); g.beginPath(); g.rect(cx - 250, 480, 500, 330); g.clip();
        curve(g, P.fn(f), P.X(-1), P.X(1), col, 5, pa);
        const u = -0.85 + 1.7 * ((lt - t0) * 0.35 % 1 + 1) % 1, ux = P.X(u), uy = P.Y(f(u)), m = df(u) * 90 / 220;
        line(g, ux - 140, uy + 140 * m, ux + 140, uy - 140 * m, C.gold, 3, null, pa);
        g.restore();
        dot(g, ux, uy, 9, C.gold, pa, 16);
        txt(g, `斜率 ${df(u) >= 0 ? '+' : '−'}${Math.abs(df(u)).toFixed(2)}`, cx, 830, { size: 32, mono: true, col: C.gold, al: 'center', a: pa });
        txt(g, nm, cx, 495, { size: 28, w: 700, col, al: 'center', a: pa * 0 });
      });
      pill(g, '下一步：加上 (x − a)² 项', W / 2, 920 - 30, C.gold, { al: 'center', a: seg(lt, L[8] + .3, .5), size: 30 });
    }
  } });

// ---------- 7 ⑤ 推一般公式：设多项式、求导、代入 x=a ----------
S.push({ sec: '⑤ 推一般公式', secEn: 'MATCH EVERY DERIVATIVE AT x = a',
  lines: ['设想一个多项式，按 (x − a) 的幂排列。', '要求它在 x = a 处和 f 完全一致：', ['函数值、斜率、弯曲……每一阶导数都相同。', .4],
    '对 P 求一次导：每项的指数拿下来当系数，指数减一。', '再求一次导。', ['再求一次。', .2],
    '现在代入 x = a：', ['含 (x − a) 的项全部变成 0，只剩常数项。', .6],
    'P(a) = c₀，要等于 f(a)，所以 c₀ = f(a)。', 'P′(a) = c₁，所以 c₁ = f′(a)。', 'P″(a) = 2c₂，所以 c₂ = f″(a) / 2。', ['P‴(a) = 6c₃，所以 c₃ = f‴(a) / 6。', .6],
    ['笔记里写的“P(x) = f(a)”，意思就是上面这一串条件。', .4]],
  draw(g, lt, s) {
    const L = s.L, x0 = 130, sz = .72, qx = 1170;
    tex(g, 'p0', x0, 230, { size: sz, rev: lin(lt, L[0], 1.6), base: true });
    tex(g, 'req', W / 2, 140, { size: .62, al: 'center', a: seg(lt, L[1], .5) * (1 - seg(lt, L[3] - .3, .4)), rev: lin(lt, L[2], 1.6) });
    tex(g, 'p1', x0, 360, { size: sz, rev: lin(lt, L[3], 1.6), base: true });
    stepTag(g, '求导', 60, 350, C.blue, seg(lt, L[3], .4) * 0);
    tex(g, 'p2', x0, 490, { size: sz, rev: lin(lt, L[4], 1.2), base: true });
    tex(g, 'p3', x0, 620, { size: sz, rev: lin(lt, L[5], 1.0), base: true });
    // 代入 x = a：含 (x-a) 的部分变暗（整行变暗，常数项用右边的结果亮出来）
    const sub = seg(lt, L[6] + .3, .6);
    if (sub > 0) {
      pill(g, '代入 x = a', x0, 730, C.gold, { a: sub });
      [['p0', 230], ['p1', 360], ['p2', 490], ['p3', 620]].forEach(([k, y]) => tex(g, k, x0, y, { size: sz, base: true, col: '#55657E', a: seg(lt, L[7], .6) }));
      // 圈出常数项
      const cs = seg(lt, L[7] + .5, .5);
      [[x0 + 10, 230 - 40, 230], [x0 + 10, 360 - 40, 225], [x0 + 10, 490 - 40, 245], [x0 + 10, 620 - 40, 265]].forEach(([x, y, w]) => rrect(g, x + texW('p3', sz) * 0 + 0, y - 6, 0, 0, 0, null, null, 0, 0));
    }
    // 右列：每一行代入后的值 → 系数
    [['q0', 230, L[8]], ['q1', 360, L[9]], ['q2', 490, L[10]], ['q3', 620, L[11]]].forEach(([k, y, t0]) => tex(g, k, qx, y, { size: sz, rev: lin(lt, t0, 1.2), base: true }));
    const br = seg(lt, L[8], .5); line(g, qx - 40, 190, qx - 40, 660, 'rgba(255,200,87,.5)', 3, null, br);
    txt(g, '笔记：要求 “P(x) = f(a)” = 在 x = a 处，P 和 f 的每一阶导数都相等', W / 2, 860, { size: 30, col: C.mute, al: 'center', a: seg(lt, L[12], .6) });
  } });

// ---------- 8 ⑤ n! 与一般公式 ----------
S.push({ sec: '⑤ 推一般公式', secEn: 'WHERE n! COMES FROM',
  lines: ['除数 2 和 6 从哪来？', '把 (x − a)ⁿ 求 n 次导，指数一个个拿下来当系数，', ['一路乘出 n·(n − 1)·…·2·1，也就是 n!。', .6],
    ['所以要除掉 n!：cₙ = f⁽ⁿ⁾(a) / n!。', .6], '把系数代回多项式，', ['就得到泰勒展开。', 1.0]],
  cues: [[s => s.L[5] + .8, 'ding']],
  draw(g, lt, s) {
    const L = s.L;
    tex(g, 'nfac', W / 2, 220, { size: .82, al: 'center', rev: lin(lt, L[1], 2.0) });
    tex(g, 'facs', W / 2, 345, { size: .7, al: 'center', rev: lin(lt, L[2] + .6, 1.4), col: 'mute' });
    tex(g, 'cn', W / 2, 470, { size: 1.0, al: 'center', rev: lin(lt, L[3], 1.0) });
    tex(g, 'taylor', W / 2, 670, { size: .85, al: 'center', rev: lin(lt, L[4], 2.2) });
    tex(g, 'taylor_sum', W / 2, 820, { size: .75, al: 'center', rev: lin(lt, L[5], 1.2) });
    memo(g, 160, 590, 1600, 320, seg(lt, L[5] + 1.2, .6), '泰勒展开 · 值得直接记住');
  } });

// ---------- 9 ⑥ e^x 在 a=0 展开 ----------
const EXP = Math.exp, part = (x, n) => { let s = 0, t = 1; for (let k = 0; k <= n; k++) { s += t; t *= x / (k + 1); } return s; };
S.push({ sec: '⑥ 例子：eˣ 在 a = 0 展开', secEn: 'e^x  AT  a = 0',
  lines: ['例子：eˣ 在 a = 0 处展开。', 'eˣ 求导还是 eˣ，所以每一阶导数在 0 处都等于 1。', '代入公式：', ['eˣ ≈ 1 + x + x²/2 + x³/6。', .4],
    ['画出来：每多加一项，多项式就在 0 附近多贴住曲线一段。', 1.6], '取 x = 0.5 检验，真值 e^0.5 = 1.648721。',
    '只取常数项，误差 0.65；加到三次，误差 0.003；', ['加到四次，只剩 0.0003。', .8], ['而且每多加一项，误差缩得越来越快。', .4], '展开点离目标点越近，收敛越快。'],
  draw(g, lt, s) {
    const L = s.L, P = Plot(130, 860, 200, 105, -2.2, 1.9, -0.5, 6.2);
    const ga = seg(lt, .1, .6);
    line(g, P.X(-2.2), P.Y(0), P.X(1.9), P.Y(0), C.axis, 3, null, ga); line(g, P.X(0), P.Y(-0.5), P.X(0), P.Y(6.2), C.axis, 3, null, ga);
    g.save(); g.beginPath(); g.rect(P.X(-2.2), P.Y(6.2), P.X(1.9) - P.X(-2.2), P.Y(-0.5) - P.Y(6.2)); g.clip();
    curve(g, P.fn(EXP), P.X(-2.2), P.X(1.85), C.blue, 6, ga);
    const cols = ['#7E6BB8', '#9A7EDB', '#B48CFF', '#D9A6FF', '#FFC857'];
    for (let n = 0; n <= 4; n++) { const pa = seg(lt, L[4] + n * .9, .6) * (n < 4 ? 1 - .55 * seg(lt, L[4] + n * .9 + .9, .5) : 1);
      curve(g, P.fn(x => part(x, n)), P.X(-2.2), P.X(1.9), cols[n], 3.5, pa, [12, 8]); }
    g.restore();
    tex(g, 'l_ex', P.X(1.3), P.Y(5.6), { size: .62, a: ga, col: 'blue', al: 'right' });
    for (let n = 0; n <= 4; n++) txt(g, `${n} 次`, P.X(-2.1), P.Y(5.8) + n * 40, { size: 28, w: 700, col: cols[n], a: seg(lt, L[4] + n * .9, .5) });
    dot(g, P.X(0), P.Y(1), 8, C.gold, ga, 14);
    const rx = 1000;
    tex(g, 'e_der', rx, 190, { size: .7, rev: lin(lt, L[1], 1.4) });
    tex(g, 'e_gen', rx, 315, { size: .64, rev: lin(lt, L[2], 1.4), a: 1 - .5 * seg(lt, L[3] + .4, .5) });
    tex(g, 'e_res', rx, 450, { size: .85, rev: lin(lt, L[3], 1.0) });
    // 表：x = 0.5（真算）
    const ta = seg(lt, L[5], .5), tx = 1000, ty = 590, tv = EXP(.5);
    rrect(g, tx - 20, ty - 50, 800, 380, 16, 'rgba(8,14,28,.62)', 'rgba(94,200,255,.35)', 2, ta);
    txt(g, `x = 0.5    真值 e^0.5 = ${tv.toFixed(6)}`, tx + 10, ty - 14, { size: 28, w: 700, col: C.blue, a: ta });
    ['取到', '近似值', '误差', '缩小到'].forEach((h, j) => txt(g, h, tx + 60 + j * 200, ty + 34, { size: 26, w: 700, col: C.mute, al: 'center', a: ta }));
    for (let n = 0; n <= 4; n++) { const ra = seg(lt, L[6] + n * .45, .4), v = part(.5, n), e = tv - v, ep = n ? tv - part(.5, n - 1) : 0;
      [`${n} 次`, v.toFixed(5), e.toFixed(5), n ? `×${(e / ep).toFixed(2)}` : '—'].forEach((c, j) => txt(g, c, tx + 60 + j * 200, ty + 84 + n * 50, { size: 32, mono: j > 0, w: j ? 500 : 700, al: 'center', col: j === 2 ? C.red : j === 3 ? C.gold : cols[n], a: ra })); }
  } });

// ---------- 10 ⑦ 用于势能 ----------
const UM = x => Math.pow(1 - Math.exp(-x), 2);
S.push({ sec: '⑦ 用于势能', secEn: 'POTENTIAL NEAR EQUILIBRIUM',
  lines: ['把势能 U(x) 在平衡点 x₀ 展开。', '平衡点是 U 的最低点，斜率为 0，', ['所以 U′(x₀) = 0，一次项自动消失。', .6], '剩下最低阶的是二次项 ½U″(x₀)(x − x₀)²，', ['它就是弹簧的能量 ½kx²，劲度系数 k = U″(x₀)。', .8]],
  cues: [[s => s.L[4] + 1.2, 'ding']],
  draw(g, lt, s) {
    const L = s.L;
    const cz = seg(lt, L[2], .5);
    tex(g, 'v_gen', 150, 210, { size: .78, rev: lin(lt, L[0], 2.0), a: 1 - cz });
    tex(g, 'v_gen_c', 150, 210, { size: .78, a: cz });
    tex(g, 'v_zero', 150 + 540, 305, { size: .62, a: cz, col: 'red', al: 'center' });
    tex(g, 'v_spring', W / 2, 400, { size: .8, al: 'center', rev: lin(lt, L[3], 1.6) });
    const P = Plot(420, 900, 300, 260, -0.7, 3.2, 0, 1.75), ga = seg(lt, L[0] + .4, .6);
    line(g, P.X(-0.7), P.Y(0), P.X(3.2), P.Y(0), C.axis, 3, null, ga * .8);
    g.save(); g.beginPath(); g.rect(P.X(-0.7), P.Y(1.75), P.X(3.2) - P.X(-0.7), P.Y(0) - P.Y(1.75)); g.clip();
    curve(g, P.fn(UM), P.X(-0.65), P.X(3.2), C.blue, 5, ga);
    curve(g, P.fn(x => x * x), P.X(-0.7), P.X(1.4), C.gold, 4, seg(lt, L[4], .6), [12, 8]);
    g.restore();
    dot(g, P.X(0), P.Y(0), 10, C.gold, ga, 18); tex(g, 'l_x0', P.X(0), P.Y(0) + 34, { size: .62, al: 'center', a: ga });
    tex(g, 'l_u', P.X(2.6), P.Y(1.0) - 40, { size: .62, a: ga, col: 'blue' });
    const sl = seg(lt, L[1], .5); line(g, P.X(-0.45), P.Y(0), P.X(0.45), P.Y(0), C.red, 4, null, sl); txt(g, '斜率 0', P.X(0.5), P.Y(0) - 26, { size: 30, w: 700, col: C.red, a: sl });
    txt(g, '弹簧 ½kx²', P.X(1.0), P.Y(1.6), { size: 30, w: 700, col: C.gold, a: seg(lt, L[4] + .4, .5) });
  } });

// ---------- 11 ⑦ 例子 U=(1-e^{-x})^2（笔记原样） ----------
S.push({ sec: '⑦ 例子', secEn: 'U(x) = (1 − e^(−x))²',
  lines: ['例子：U(x) = (1 − e⁻ˣ)²，平衡点 x₀ = 0。', '先求一阶导，用链式法则：(1 − e⁻ˣ)′ = e⁻ˣ。', ['U′ = 2e⁻ˣ − 2e⁻²ˣ，U′(0) = 0，确实是平衡点。', .4],
    ['再求导：U″ = −2e⁻ˣ + 4e⁻²ˣ，U″(0) = 2。', .4], ['再求一次：U‴ = 2e⁻ˣ − 8e⁻²ˣ，U‴(0) = −6。', .4], ['代入泰勒公式，展开点是 0。', .4],
    'U(0) = 0，一次项是 0，', ['二次项系数 2/2 = 1，三次项系数 −6/6 = −1。', .4], ['所以 U(x) ≈ x² − x³。', .8], ['笔记里写的是等号；截断后的展开都是近似，用 ≈。', .4]],
  cues: [[s => s.L[8] + .8, 'ding']],
  draw(g, lt, s) {
    const L = s.L, x0 = 150, sz = .72;
    tex(g, 'u0', x0, 175, { size: .8, rev: lin(lt, L[0], 1.2), base: true });
    tex(g, 'u1', x0, 280, { size: sz, rev: lin(lt, L[1] + .3, 2.4), base: true });
    stepTag(g, '链式法则', 1560, 266, C.blue, seg(lt, L[1], .4));
    tex(g, 'u2', x0, 370, { size: sz, rev: lin(lt, L[3], 1.6), base: true });
    tex(g, 'u3', x0, 460, { size: sz, rev: lin(lt, L[4], 1.6), base: true });
    tex(g, 'u4', x0, 590, { size: sz, rev: lin(lt, L[5], 2.0), base: true });
    stepTag(g, '代入 x₀ = 0', 1560, 576, C.blue, seg(lt, L[5] + .4, .4));
    tex(g, 'u5', x0 + 120, 710, { size: sz, rev: lin(lt, L[6], 2.4), base: true });
    tex(g, 'u6', x0, 830, { size: 1.0, rev: lin(lt, L[8], 1.0), base: true });
    memo(g, x0 - 40, 770, 560, 100, seg(lt, L[8] + .8, .5), '结果');
  } });

// ---------- 12 ⑦ 数值检验 ----------
S.push({ sec: '⑦ 数值检验', secEn: 'HOW GOOD IS x² ?',
  lines: ['数值检验：x = 0.1 时，真值是 0.009056。', '只留二次项 x²，得到 0.01，偏大约 10%；', ['再加上三次项 −x³，得到 0.009，几乎就是真值。', .4],
    ['位移缩小到 1/10，x = 0.01 时，二次近似的误差也缩小到约 1%。', .6], ['这就是“位移小，三次项可以丢”的意思。', .8]],
  draw(g, lt, s) {
    const L = s.L, P = Plot(200, 860, 1400, 1300, -0.02, 0.45, 0, 0.5), ga = seg(lt, .1, .6);
    line(g, P.X(-0.02), P.Y(0), P.X(0.45), P.Y(0), C.axis, 3, null, ga); line(g, P.X(0), P.Y(0), P.X(0), P.Y(0.48), C.axis, 3, null, ga);
    g.save(); g.beginPath(); g.rect(P.X(-0.02), P.Y(0.5), 760, P.Y(0) - P.Y(0.5)); g.clip();
    curve(g, P.fn(UM), P.X(0), P.X(0.55), C.blue, 6, ga);
    curve(g, P.fn(x => x * x), P.X(0), P.X(0.55), C.gold, 4, seg(lt, L[1], .5), [12, 8]);
    curve(g, P.fn(x => x * x - x * x * x), P.X(0), P.X(0.55), C.green, 4, seg(lt, L[2], .5), [4, 8]);
    g.restore();
    tex(g, 'l_u', P.X(0.36), P.Y(0.2) + 40, { size: .6, a: ga, col: 'blue' });
    tex(g, 'l_uq', P.X(0.42), P.Y(0.17) - 120, { size: .6, a: seg(lt, L[1], .5), col: 'gold' });
    tex(g, 'l_uc', P.X(0.43), P.Y(0.12) + 30, { size: .6, a: seg(lt, L[2], .5), col: 'green' });
    const X1 = P.X(0.1); line(g, X1, P.Y(0), X1, P.Y(0.01), C.mute, 2, [5, 6], seg(lt, L[0], .5)); tex(g, 'l_x', X1, P.Y(0) + 30, { size: .5, a: 0 });
    txt(g, 'x = 0.1', X1, P.Y(0) + 34, { size: 28, mono: true, col: C.mute, al: 'center', a: seg(lt, L[0], .5) });
    const tx = 1060, ty = 300, ta = seg(lt, L[0], .5);
    rrect(g, tx - 20, ty - 70, 760, 330, 16, 'rgba(8,14,28,.62)', 'rgba(94,200,255,.35)', 2, ta);
    ['x', '真值', '只留 x²', '误差', '加上 −x³'].forEach((h, j) => txt(g, h, tx + 50 + j * 160, ty - 20, { size: 26, w: 700, col: C.mute, al: 'center', a: ta }));
    [[0.1, L[0], L[1], L[2]], [0.01, L[3], L[3] + .5, L[3] + 1.0]].forEach(([x, t0, t1, t2], j) => {
      const u = UM(x), q = x * x, c = x * x - x * x * x, y = ty + 50 + j * 90, f = n => n < 0.001 ? n.toFixed(7) : n.toFixed(6);
      txt(g, String(x), tx + 50, y, { size: 30, mono: true, al: 'center', a: seg(lt, t0, .4) });
      txt(g, f(u), tx + 210, y, { size: 26, mono: true, al: 'center', col: C.blue, a: seg(lt, t0, .4) });
      txt(g, f(q), tx + 370, y, { size: 26, mono: true, al: 'center', col: C.gold, a: seg(lt, t1, .4) });
      txt(g, `+${((q / u - 1) * 100).toFixed(1)}%`, tx + 530, y, { size: 28, mono: true, al: 'center', col: C.red, a: seg(lt, t1 + .3, .4) });
      txt(g, f(c), tx + 690, y, { size: 26, mono: true, al: 'center', col: C.green, a: seg(lt, t2, .4) });
    });
    pill(g, '位移 ÷10  →  相对误差 ÷10', tx, 700, C.gold, { a: seg(lt, L[4], .5) });
  } });

// ---------- 13 附：我没想通的地方 ----------
S.push({ sec: '附', secEn: 'APPENDIX',
  lines: ['最后，把推导里没想通的三个问题，单独理清楚。'], tail: .8,
  draw(g, lt, s) {
    txt(g, '附 · 我没想通的地方', W / 2, 330, { size: 84, w: 900, serif: true, al: 'center', a: seg(lt, .2, .7), glow: 'rgba(255,200,87,.3)' });
    ['为什么 U′(x₀) = 0？', '为什么 U″(x₀) ≠ 0，而且 > 0？', 'U″ = 0 的特殊情况'].forEach((t, j) => txt(g, t, W / 2, 500 + j * 90, { size: 44, w: 700, al: 'center', col: j === 1 ? C.gold : C.ink, a: seg(lt, .8 + j * .4, .5) }));
  } });

// ---------- 14 为什么 U'(x0)=0 ----------
S.push({ sec: '附 1 · 为什么 U′(x₀) = 0', secEn: 'FORCE = − SLOPE',
  lines: ['力和势能的关系是 F = −dU/dx = −U′：', ['力总是指向势能下降的方向，大小等于斜率。', .6], '平衡位置的定义：原子放在那里不动，也就是受力为 0。',
    ['所以 F(x₀) = 0，也就是 U′(x₀) = 0。', .4], '从图上看，U′ 是势能曲线的斜率；', ['平衡点在谷底，谷底是平的，斜率为 0。', .8]],
  draw(g, lt, s) {
    const L = s.L, P = Plot(160, 880, 280, 300, -0.7, 3.0, 0, 1.6), ga = seg(lt, .1, .6);
    line(g, P.X(-0.7), P.Y(0), P.X(3.0), P.Y(0), C.axis, 3, null, ga * .8);
    g.save(); g.beginPath(); g.rect(P.X(-0.7), P.Y(1.6), P.X(3.0) - P.X(-0.7), P.Y(0) - P.Y(1.6)); g.clip(); curve(g, P.fn(UM), P.X(-0.65), P.X(3.0), C.blue, 5, ga); g.restore();
    tex(g, 'f_rel', 1250, 220, { size: .9, rev: lin(lt, L[0], 1.2) });
    tex(g, 'f_eq', 1180, 380, { size: .8, rev: lin(lt, L[3], 1.2) });
    // 几个位置上的力箭头：F = -U'
    const dU = x => 2 * Math.exp(-x) - 2 * Math.exp(-2 * x), fa = seg(lt, L[1], .6);
    [-0.45, -0.2, 0.5, 1.0, 1.8].forEach((x, j) => { const X = P.X(x), Y = P.Y(UM(x)), F = -dU(x); dot(g, X, Y, 9, C.ink, fa);
      arrow(g, X, Y - 26, X + Math.max(-150, Math.min(150, F * 120)), Y - 26, C.red, 4, 16, fa * seg(lt, L[1] + j * .2, .4)); });
    const ea = seg(lt, L[2], .6); dot(g, P.X(0), P.Y(0), 12, C.gold, ea, 22);
    txt(g, 'F = 0', P.X(0), P.Y(0) - 95, { size: 34, w: 700, col: C.gold, al: 'center', a: ea });
    const sa = seg(lt, L[5], .5); line(g, P.X(-0.4), P.Y(0), P.X(0.4), P.Y(0), C.gold, 4, null, sa);
    txt(g, '谷底是平的：斜率 0', P.X(0.5), P.Y(0) + 40, { size: 32, w: 700, col: C.gold, a: sa });
  } });

// ---------- 15 为什么 U''(x0) > 0：三种平衡 ----------
S.push({ sec: '附 2 · 为什么 U″(x₀) > 0', secEn: 'STABLE / UNSTABLE / FLAT',
  lines: ['斜率为 0 的点有三种。', ['U″ > 0 是碗底：稍微推开，力把它拉回来，这是稳定平衡。', .6], ['U″ < 0 是山顶：稍微推开，力把它推得更远，不稳定。', .6],
    ['U″ = 0：这一阶是平的，二阶项里没有回复力，要看更高阶。', .6], '固体里的原子能长期待在格点上，', ['说明它处于稳定平衡，也就是碗底：U″(x₀) > 0。', .8]],
  draw(g, lt, s) {
    const L = s.L;
    const P3 = [['s_pos', x => 0.9 * x * x, C.green, L[1], '稳定'], ['s_neg', x => -0.9 * x * x, C.red, L[2], '不稳定'], ['s_zer', x => 0, C.blue, L[3], '要看更高阶']];
    P3.forEach(([k, f, col, t0, nm], j) => {
      const cx = 360 + j * 600, pa = seg(lt, t0 - .2, .5); if (pa <= 0) return;
      const hl = j === 0 ? seg(lt, L[4], .6) : 0;
      rrect(g, cx - 260, 200, 520, 600, 16, 'rgba(8,14,28,.55)', hl > 0 ? C.gold : 'rgba(169,188,211,.25)', hl > 0 ? 3 : 2, pa);
      tex(g, k, cx, 260, { size: .8, al: 'center', a: pa });
      const P = Plot(cx - 220, 560, 220, 140, -1, 1, -1, 1);
      curve(g, P.fn(f), P.X(-1), P.X(1), col, 5, pa);
      // 小球：被推开后怎么动（碗：来回摆；山顶：越滚越远；平：二阶看不出回复）
      const tt = Math.max(0, lt - t0 - .4); let u;
      if (j === 0) u = 0.5 * Math.cos(tt * 3.2); else if (j === 1) u = Math.min(0.8, 0.06 * Math.exp(tt * 1.6)); else u = 0.25;
      dot(g, P.X(u), P.Y(f(u)) - 16, 16, C.ink, pa, 12);
      const F = j === 0 ? -1.8 * u : j === 1 ? 1.8 * u : 0;
      if (Math.abs(F) > .02) arrow(g, P.X(u), P.Y(f(u)) - 50, P.X(u) + Math.max(-120, Math.min(j === 1 ? 40 : 120, F * 90)), P.Y(f(u)) - 50, C.red, 4, 14, pa);
      txt(g, nm, cx, 740, { size: 40, w: 900, col, al: 'center', a: pa });
    });
  } });

// ---------- 16 用力来看 ----------
S.push({ sec: '附 2 · 用力来看', secEn: 'HOOKE’S LAW',
  lines: ['用力来看：在 x₀ 附近，力也可以泰勒展开。', ['对 U′ 在 x₀ 展开，再加负号。', .6], ['第一项 U′(x₀) 是 0，剩下 F ≈ −U″(x₀)(x − x₀)。', .4],
    '原子往右偏，x − x₀ > 0，', ['力要指向左边才能把它拉回来，这需要 U″(x₀) > 0。', .6], ['这正是胡克定律 F = −kx，劲度系数 k = U″(x₀)。', .6],
    ['回到例子：U″(0) = 2 > 0，是碗底，劲度系数 k = 2。', .6]],
  cues: [[s => s.L[5] + 1.0, 'ding']],
  draw(g, lt, s) {
    const L = s.L;
    tex(g, 'f_exp', 150, 230, { size: .85, rev: lin(lt, L[0] + .8, 2.4) });
    tex(g, 'f_hk', 150, 400, { size: .9, rev: lin(lt, L[2], 1.6) });
    memo(g, 1340, 340, 420, 120, seg(lt, L[5] + .6, .5), '值得记住');
    tex(g, 'k_mem', 1550, 400, { size: .95, al: 'center', a: seg(lt, L[5] + .6, .5) });
    // 弹簧小车
    const ba = seg(lt, L[3] - .2, .6), wall = 300, eqx = 900, y = 700;
    if (ba > 0) {
      g.save(); g.globalAlpha *= ba; g.fillStyle = '#2A3A55'; g.fillRect(wall - 30, y - 120, 30, 200); g.restore();
      line(g, wall - 60, y + 60, 1600, y + 60, C.axis, 3, null, ba);
      const dx = 160 * seg(lt, L[3], .8), mx = eqx + dx;
      g.save(); g.globalAlpha *= ba; g.strokeStyle = C.blue; g.lineWidth = 4; g.beginPath(); g.moveTo(wall, y);
      const n = 14; for (let k = 1; k < n; k++) g.lineTo(wall + (mx - 70 - wall) * k / n, y + (k % 2 ? -26 : 26)); g.lineTo(mx - 70, y); g.stroke(); g.restore();
      rrect(g, mx - 70, y - 70, 140, 130, 12, 'rgba(255,200,87,.18)', C.gold, 3, ba);
      line(g, eqx, y - 110, eqx, y + 80, C.mute, 2, [6, 6], ba); tex(g, 'l_x0', eqx, y + 110, { size: .6, al: 'center', a: ba });
      const fa = seg(lt, L[4], .5) * (dx > 4 ? 1 : 0); arrow(g, mx, y - 100, mx - Math.min(220, dx * 1.6), y - 100, C.red, 5, 18, fa);
      txt(g, 'F < 0（指向左）', mx - 120, y - 150, { size: 32, w: 700, col: C.red, al: 'center', a: fa });
      txt(g, `x − x₀ = +${(dx / 160 * 0.5).toFixed(2)}`, mx + 100, y - 20, { size: 30, mono: true, col: C.gold, a: seg(lt, L[3], .5) });
    }
    txt(g, '例子：U″(0) = 2 > 0  →  碗底，k = 2', W / 2, 890, { size: 38, w: 700, col: C.gold, al: 'center', a: seg(lt, L[6], .5) });
  } });

// ---------- 17 U''=0 的特殊情况 ----------
S.push({ sec: '附 3 · U″ = 0 的特殊情况', secEn: 'FLAT-BOTTOM WELL',
  lines: ['U″ = 0 也可能出现，例如 U = bx⁴。', 'U′ = 4bx³，在 0 处为 0；', ['U″ = 12bx²，在 0 处也为 0。', .6], '它仍然是一只碗，只是碗底特别平，',
    ['回复力来自四次项，弹簧近似完全失效。', .6], '非调和振子 ax² + bx⁴ 里，a 很小、温度高时，', 'bx⁴ 占主导，就是这种情况。',
    '这时平均势能 ⟨bx⁴⟩ = k_BT / 4，', ['而不是弹簧的 ⟨½kx²⟩ = k_BT / 2。', .8], ['真实固体的原子间势能，在平衡点都有 U″ > 0，所以调和近似成立。', .8]],
  draw(g, lt, s) {
    const L = s.L, P = Plot(160, 860, 330, 360, -1.1, 1.1, 0, 1.6), ga = seg(lt, .1, .6);
    line(g, P.X(-1.1), P.Y(0), P.X(1.1), P.Y(0), C.axis, 3, null, ga * .8);
    curve(g, P.fn(x => x * x), P.X(-1.1), P.X(1.1), C.blue, 4, ga * .7, [12, 8]);
    curve(g, P.fn(x => x * x * x * x), P.X(-1.1), P.X(1.1), C.gold, 5, ga);
    tex(g, 'l_uq', P.X(-0.5), P.Y(1.25), { size: .75, col: 'blue', al: 'center', a: ga });
    tex(g, 'b4', P.X(0.3), P.Y(1.25), { size: .7, col: 'gold', al: 'center', a: ga });
    const fb = seg(lt, L[3], .6); rrect(g, P.X(-0.45), P.Y(0.06), P.X(0.45) - P.X(-0.45), 40, 10, 'rgba(255,200,87,.12)', C.gold, 2, fb);
    txt(g, '碗底特别平', P.X(0), P.Y(0) + 50, { size: 32, w: 700, col: C.gold, al: 'center', a: fb });
    const rx = 1000;
    tex(g, 'b4', rx, 200, { size: .9, rev: lin(lt, L[0], .8) });
    tex(g, 'b4d', rx, 300, { size: .8, rev: lin(lt, L[1], 1.2) });
    tex(g, 'b4dd', rx, 390, { size: .8, rev: lin(lt, L[2], 1.2) });
    tex(g, 'anh', rx, 530, { size: .8, rev: lin(lt, L[5], 1.0) });
    tex(g, 'eq4', rx, 650, { size: .85, rev: lin(lt, L[7], 1.0), col: 'gold' });
    txt(g, '而不是', rx + 20, 735, { size: 30, col: C.mute, a: seg(lt, L[8], .4) });
    tex(g, 'eq2', rx + 150, 735, { size: .75, rev: lin(lt, L[8], 1.0) });
  } });

// ---------- 18 一句话总结 ----------
S.push({ sec: '一句话', secEn: 'SUMMARY',
  lines: ['泰勒展开：让多项式在一点处的函数值、斜率、弯曲……都和原函数一致，', ['每一项的系数是 f⁽ⁿ⁾(a) / n!。', .4], '势能在平衡点斜率为 0，展开后第一个非零项是二次项，', '也就是弹簧：k = U″(x₀)。',
    ['考试时，前三项要背熟。', 1.4]], tail: 2.0,
  draw(g, lt, s) {
    const L = s.L;
    tex(g, 'taylor', W / 2, 230, { size: .78, al: 'center', a: seg(lt, L[0], .6) });
    tex(g, 'taylor_sum', W / 2, 370, { size: .7, al: 'center', a: seg(lt, L[1], .6) });
    tex(g, 'v_spring', W / 2, 540, { size: .75, al: 'center', a: seg(lt, L[2], .6) });
    memo(g, 440, 650, 1040, 140, seg(lt, L[4], .5), '考试要背熟');
    tex(g, 'exam', W / 2, 722, { size: .85, al: 'center', a: seg(lt, L[4], .5) });
  } });

setup(S);
