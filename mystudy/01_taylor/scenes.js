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
    memo(g, x0 - 40, 630, 1090, 110, seg(lt, L[7] + .6, .6));
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

// ---------- 6 下一步 ----------
S.push({ sec: '下一步', secEn: 'TO BE CONTINUED',
  lines: ['切线是直的，曲线是弯的。', '要把“弯”也模仿进去，就要再加一个 (x − a)² 项。', '第一部分到这里：导数、零次近似、一次近似。'], tail: 1.6,
  draw(g, lt, s) {
    const L = s.L, P = Plot(500, 900, 300, 105, 0, 2.2, 0, 4.7), ga = seg(lt, .1, .6);
    curve(g, P.fn(Q), P.X(0.1), P.X(2.1), C.blue, 5, ga);
    curve(g, P.fn(TQ), P.X(0.5), P.X(2.1), '#B48CFF', 4, ga, [14, 9]);
    dot(g, P.X(1), P.Y(1), 9, C.gold, ga, 18);
    tex(g, 'n2', W / 2, 220, { size: .82, al: 'center', rev: lin(lt, L[1], 1.6) });
    pill(g, '下一部分：二次项与 n!', W / 2, 330, C.gold, { al: 'center', a: seg(lt, L[1] + 1.6, .5) });
    const ra = seg(lt, L[2], .6);
    rrect(g, 1260, 520, 560, 300, 16, 'rgba(8,14,28,.7)', 'rgba(255,200,87,.4)', 2, ra);
    ['① 导数 = 差商的极限', '② 零次近似 f(x) ≈ f(a)', '③ 一次近似 = 切线'].forEach((t, j) => txt(g, t, 1300, 580 + j * 82, { size: 36, w: 700, a: seg(lt, L[2] + j * .4, .4), col: j === 2 ? C.gold : C.ink }));
  } });

setup(S);
