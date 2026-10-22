// 泰勒展开 · 上传版（约 5–6 分钟）：钩子 → 路线图 → ①–⑥ → 总结与下期预告。由 01_taylor 精简改写。
// 金色 = 这一步变化/最终结果；冰蓝 = 原函数；红 = 增量与误差；紫 = 近似线
const F = x => 0.5 + 0.9 * x - 0.55 * x * x + 0.12 * x * x * x;          // 笔记草图那样的曲线：先升、变平、再升
const dF = x => 0.9 - 1.1 * x + 0.36 * x * x;
const A0 = 2.4;                                                              // 展开点 a
const S = [];

// ---------- H 钩子：计算器只会加减乘除 ----------
const EXPH = Math.exp, partH = (x, n) => { let s = 0, t = 1; for (let k = 0; k <= n; k++) { s += t; t *= x / (k + 1); } return s; };
S.push({ lead: 1.0,
  lines: ['计算器只会做加减乘除。', '那 e 的 0.5 次方、sin 1，它是怎么算出来的？', '一种办法是：用多项式去“冒充”这些函数。',
    ['只用加法和乘法，前五项就算出了 1.6484，真值是 1.6487。', .6], ['这类方法的起点，叫泰勒展开。', 1.4]],
  cues: [[s => s.L[4] + .2, 'ding']],
  draw(g, lt, s) {
    const L = s.L, out = 1 - seg(lt, L[4] - .2, .6);
    if (out > 0) {
      g.save(); g.globalAlpha *= out;
      // 计算器
      const ca = seg(lt, .2, .7), cx = 170, cy = 170, cw = 430, ch = 690;
      rrect(g, cx, cy, cw, ch, 36, '#141C2E', 'rgba(169,188,211,.35)', 3, ca);
      rrect(g, cx + 30, cy + 34, cw - 60, 150, 16, '#0B1A14', 'rgba(94,224,168,.45)', 2, ca);
      const shown = lt < L[1] ? '0' : lt < L[3] ? 'e^0.5 = ?' : (lt < L[3] + 2.2 ? partH(.5, Math.min(4, Math.floor((lt - L[3]) / .45))).toFixed(4) : '1.6484');
      txt(g, shown, cx + cw - 56, cy + 110, { size: 54, mono: true, col: C.green, al: 'right', a: ca, glow: 'rgba(94,224,168,.6)' });
      const keys = [['7', '8', '9', '÷'], ['4', '5', '6', '×'], ['1', '2', '3', '−'], ['0', '.', '=', '+']];
      const op = seg(lt, L[0] + .3, .5) * (1 - .6 * seg(lt, L[2], .5)) + .6 * seg(lt, L[3], .4);
      keys.forEach((row, r) => row.forEach((k, c) => {
        const x = cx + 34 + c * 96, y = cy + 230 + r * 106, isOp = c === 3;
        rrect(g, x, y, 82, 88, 16, isOp ? 'rgba(255,200,87,.16)' : '#1E2840', isOp ? C.gold : 'rgba(169,188,211,.25)', isOp ? 3 : 1.5, ca);
        if (isOp && op > 0) { g.save(); g.globalAlpha *= op * ca; g.shadowColor = C.gold; g.shadowBlur = 28; rrect(g, x, y, 82, 88, 16, null, C.gold, 3, 1); g.restore(); }
        txt(g, k, x + 41, y + 46, { size: 44, w: 700, al: 'center', col: isOp ? C.gold : C.ink, a: ca });
      }));
      txt(g, '只有 + − × ÷', cx + cw / 2, cy + ch + 50, { size: 34, w: 700, col: C.gold, al: 'center', a: seg(lt, L[0] + .5, .5) });
      // 问题
      const q = seg(lt, L[1], .5) * (1 - seg(lt, L[2] - .2, .5));
      tex(g, 'hook_e', 1220, 360, { size: 1.5, al: 'center', a: q });
      tex(g, 'hook_s', 1220, 560, { size: 1.5, al: 'center', a: seg(lt, L[1] + 1.4, .5) * (1 - seg(lt, L[2] - .2, .5)) });
      // e^x 与部分和
      const pa = seg(lt, L[2], .6);
      if (pa > 0) {
        const P = Plot(820, 800, 190, 88, -2.2, 2.0, -0.4, 6.4);
        line(g, P.X(-2.2), P.Y(0), P.X(2.0), P.Y(0), C.axis, 3, null, pa); line(g, P.X(0), P.Y(-0.4), P.X(0), P.Y(6.4), C.axis, 3, null, pa);
        g.save(); g.beginPath(); g.rect(P.X(-2.2), P.Y(6.4), P.X(2.0) - P.X(-2.2), P.Y(-0.4) - P.Y(6.4)); g.clip();
        curve(g, P.fn(EXPH), P.X(-2.2), P.X(1.95), C.blue, 6, pa);
        const cols = ['#7E6BB8', '#9A7EDB', '#B48CFF', '#D9A6FF', '#FFC857'];
        for (let n = 0; n <= 4; n++) { const a = seg(lt, L[2] + .8 + n * .55, .45) * (n < 4 ? 1 - .6 * seg(lt, L[2] + 1.35 + n * .55, .45) : 1);
          curve(g, P.fn(x => partH(x, n)), P.X(-2.2), P.X(2.0), cols[n], 3.5, a, [12, 8]); }
        g.restore();
        tex(g, 'l_ex', P.X(1.3), P.Y(4.4), { size: .62, col: 'blue', al: 'right', a: pa });
        tex(g, 'hook_poly', 1250, 105, { size: .82, al: 'center', rev: lin(lt, L[2] + .6, 2.2) });
        const x5 = P.X(.5); line(g, x5, P.Y(0), x5, P.Y(EXPH(.5)), C.gold, 2, [5, 6], seg(lt, L[3], .4)); dot(g, x5, P.Y(EXPH(.5)), 9, C.gold, seg(lt, L[3], .4), 16);
        tex(g, 'hook_val', 1250, 885, { size: .72, al: 'center', rev: lin(lt, L[3] + .3, 2.0) });
      }
      g.restore();
    }
    // 标题
    const ta = seg(lt, L[4], .8);
    txt(g, '泰勒展开', W / 2, 380, { size: 150, w: 900, serif: true, al: 'center', a: ta, glow: 'rgba(255,200,87,.4)' });
    txt(g, 'TAYLOR EXPANSION', W / 2, 500, { size: 34, mono: true, col: C.mute, al: 'center', a: seg(lt, L[4] + .4, .6) });
    tex(g, 'title_sum', W / 2, 680, { size: .8, al: 'center', a: seg(lt, L[4] + .8, .8) });
  } });

// ---------- R 路线图 ----------
S.push({ lead: .5,
  lines: ['今天从导数出发，一步一步把它推出来。', ['会求导，就能看懂。', 1.0]],
  draw(g, lt, s) {
    const L = s.L, st = ['① 导数', '② 零次近似', '③ 一次近似', '④ 弯曲', '⑤ 一般公式', '⑥ 算 eˣ'], y = 470;
    txt(g, '路线', W / 2, 260, { size: 64, w: 900, serif: true, al: 'center', a: seg(lt, .1, .6) });
    st.forEach((t, j) => {
      const x = 230 + j * 292, a = seg(lt, .4 + j * .35, .45), hot = j === st.length - 1;
      if (j) arrow(g, x - 292 + 118, y, x - 118, y, 'rgba(169,188,211,.6)', 3, 14, a);
      rrect(g, x - 112, y - 64, 224, 128, 22, hot ? 'rgba(255,200,87,.12)' : 'rgba(20,30,50,.8)', hot ? C.gold : 'rgba(94,200,255,.55)', 3, a);
      txt(g, t, x, y, { size: 36, w: 700, al: 'center', col: hot ? C.gold : C.ink, a });
    });
    txt(g, '需要的基础：导数（下面第 ① 步会复习）', W / 2, 680, { size: 36, col: C.mute, al: 'center', a: seg(lt, L[1], .5) });
  } });

// ---------- 1 导数 ----------
S.push({ sec: '① 导数', secEn: 'DERIVATIVE = SLOPE',
  lines: ["在曲线上取一点 a。", "把 a 附近放大来看。", "往右走一小步 h，", "函数值升高了 f(a + h) − f(a)。", "升高量除以 h，就是这两点连线的斜率。", ["让 h 越来越小，", 0.8], "连线就变成了 a 点的切线。", ["这个极限，就是导数 f′(a)。", 0.6]],
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

// ---------- 3 零次近似 ----------
S.push({ sec: '② 最粗的近似：只看一个点', secEn: 'ZEROTH ORDER',
  lines: ["最粗的近似：只看一个点。", "x 离 a 很近时，函数值几乎不变，", "所以 f(x) ≈ f(a)，叫零次近似。", "也就是用一条水平线代替曲线。", ["可离 a 一远，误差就大了。", 0.6]],
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
  lines: ["一次近似：再加上斜率。", "令 x = a + h，也就是 h = x − a。", "从导数的定义出发。", ["h 很小时，去掉极限，等号变成约等号。", 0.3], ["再把 a + h 换成 x，h 换成 x − a。", 0.3], ["两边同乘 (x − a)，", 0.2], ["把 f(a) 移到右边，", 0.2], ["就得到一次近似。", 0.8]],
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
    
  } });

// ---------- 5 一次近似 = 切线：画出来、算出来 ----------
const Q = x => x * x, TQ = x => 1 + 2 * (x - 1);
S.push({ sec: '③ 一次近似 · 检验', secEn: 'TANGENT LINE',
  lines: ["画出来，一次近似就是 a 点的切线。", "在 a 附近，两者几乎贴在一起。", "拿 f(x) = x² 在 a = 1 试试：", "切线是 y = 1 + 2(x − 1)。", ["x = 1.1：真值 1.21，切线 1.2，只差 0.01。", 0.3], ["x = 1.5：真值 2.25，切线 2，差了 0.25。", 0.3], ["相减，误差正好是 (x − 1)²。", 0.3], ["距离变成 5 倍，误差变成 25 倍。", 0.5]],
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
  lines: ["误差为什么越来越大？因为切线不会弯。", "切线是直的，曲线是弯的，", ["离 a 一远，两者就分开了。", 0.3], "弯得多厉害，由二阶导数 f″(a) 决定：", "它是“斜率的变化率”。", ["f″ > 0，向上弯，像一只碗；", 0.3], ["f″ < 0，向下弯，像山顶；", 0.3], ["f″ = 0，这一点不弯。", 0.3], ["要模仿弯曲，就得加上 (x − a)² 项。", 0.5]],
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
  lines: ["那就干脆设一个多项式，按 (x − a) 的幂排开。", "要求它在 x = a 处和 f 一模一样：", ["函数值、斜率、弯曲……每一阶导数都相同。", 0.2], "对 P 求一次导，", "再求一次，", ["再求一次。", 0.1], "现在代入 x = a：", ["带 (x − a) 的项全部变成 0，只剩常数项。", 0.4], "P(a) = c₀，所以 c₀ = f(a)。", "P′(a) = c₁，所以 c₁ = f′(a)。", "P″(a) = 2c₂，所以 c₂ = f″(a) / 2。", ["P‴(a) = 6c₃，所以 c₃ = f‴(a) / 6。", 0.5]],
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
  } });

// ---------- 8 ⑤ n! 与一般公式 ----------
S.push({ sec: '⑤ 推一般公式', secEn: 'WHERE n! COMES FROM',
  lines: ["除数 2 和 6 是从哪来的？", "把 (x − a)ⁿ 求 n 次导，指数一个个拿下来，", ["乘出来正好是 n!。", 0.4], ["所以 cₙ = f⁽ⁿ⁾(a) / n!。", 0.4], "把系数代回多项式，", ["就是泰勒展开。", 1.0]],
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
  lines: ["回到开头：用它算 eˣ，展开点 a = 0。", "eˣ 的每一阶导数还是 eˣ，在 0 处都等于 1。", "代入公式，", ["eˣ ≈ 1 + x + x²/2 + x³/6。", 0.3], ["每多加一项，多项式就在 0 附近多贴住曲线一段。", 1.2], "e^0.5 的真值是 1.648721。", "只取常数项，误差 0.65；加到三次，误差 0.003；", ["加到四次，只剩 0.0003。", 0.6], ["而且越往后，误差缩得越快。", 0.3], "只用加减乘除，就能算到需要的精度。"],
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


// ---------- 总结 + 下期预告 ----------
const UW = x => Math.pow(1 - Math.exp(-x), 2);
S.push({ sec: '总结', secEn: 'SUMMARY',
  lines: ['总结一下。', '让多项式在一点处的函数值、斜率、弯曲……都和原函数一致，', ['每一项的系数，就是 f⁽ⁿ⁾(a) / n!。', .4], ['前三项，值得直接记住。', .8],
    '它在物理里最重要的用处是：', ['为什么几乎所有微小的振动，都可以看成弹簧。', .8], ['下一期细讲。', 2.4]], tail: 1.6,
  cues: [[s => s.L[3] + .2, 'ding']],
  draw(g, lt, s) {
    const L = s.L, up = 1 - seg(lt, L[4] - .3, .6);
    g.save(); g.globalAlpha *= up;
    tex(g, 'taylor', W / 2, 260, { size: .8, al: 'center', rev: lin(lt, L[1], 2.0) });
    tex(g, 'taylor_sum', W / 2, 410, { size: .72, al: 'center', rev: lin(lt, L[2], 1.0) });
    memo(g, 420, 560, 1080, 150, seg(lt, L[3], .5), '考试和物理里都常用');
    tex(g, 'exam', W / 2, 640, { size: .9, al: 'center', a: seg(lt, L[3], .5) });
    g.restore();
    const na = seg(lt, L[4], .6);
    if (na > 0) {
      const P = Plot(560, 820, 300, 330, -0.7, 2.8, 0, 1.5);
      line(g, P.X(-0.7), P.Y(0), P.X(2.8), P.Y(0), C.axis, 3, null, na * .8);
      g.save(); g.beginPath(); g.rect(P.X(-0.7), P.Y(1.5), P.X(2.8) - P.X(-0.7), P.Y(0) - P.Y(1.5)); g.clip();
      curve(g, P.fn(UW), P.X(-0.65), P.X(2.8), C.blue, 5, na);
      curve(g, P.fn(x => x * x), P.X(-0.7), P.X(1.3), C.gold, 4, seg(lt, L[5], .6), [12, 8]);
      g.restore();
      const u = 0.32 * Math.cos(Math.max(0, lt - L[5]) * 3.0) * seg(lt, L[5], .5);
      dot(g, P.X(u), P.Y(UW(u)) - 16, 16, C.ink, na, 12);
      txt(g, '势能', P.X(2.3), P.Y(1.0) - 50, { size: 34, w: 700, col: C.blue, al: 'center', a: na });
      txt(g, '弹簧 ½kx²', P.X(1.25), P.Y(1.45), { size: 34, w: 700, col: C.gold, a: seg(lt, L[5] + .4, .5) });
      txt(g, '下期：为什么一切微小振动都像弹簧', W / 2, 250, { size: 52, w: 900, serif: true, al: 'center', a: seg(lt, L[5], .6), glow: 'rgba(255,200,87,.3)' });
      txt(g, 'X物理  ·  关注，下期见', W / 2, 920 - 30, { size: 40, w: 700, col: C.gold, al: 'center', a: seg(lt, L[6], .6) });
    }
  } });

// 上传版叠层：顶部进度条 + 右上角水印
window.OVERLAY = (g, T, s, lt) => {
  const p = T / TOTAL;
  g.save(); g.fillStyle = 'rgba(169,188,211,.12)'; g.fillRect(0, 0, W, 6); g.fillStyle = 'rgba(255,200,87,.85)'; g.fillRect(0, 0, W * p, 6);
  SCENES.forEach(c => { if (c.t0 > 0) { g.fillStyle = 'rgba(10,17,32,.9)'; g.fillRect(W * c.t0 / TOTAL - 1, 0, 2, 6); } });
  g.restore();
  txt(g, 'X物理', W - 60, 62, { size: 30, w: 700, col: 'rgba(238,243,250,.42)', al: 'right' });
};
setup(S);
