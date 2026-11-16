// 《为什么高能量的状态更少见？——玻尔兹曼因子是数出来的》7 镜头，无配音，背景音乐 + 硬字幕。
// 全部图表数据来自 bz_data.py 的精确计数（window.BZ），这里只负责画。
const SYS = '#3B82F6', RES = '#F59E0B', COIN = '#FFD43B', COINE = '#B7860B', BALL = '#5EE0A8';
const BZ = window.BZ;
const hash = k => { const x = Math.sin(k * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`; };
const mix = (a, b, f) => a + (b - a) * f;

function coin(g, x, y, r, a = 1) {
  if (a <= 0) return; g.save(); g.globalAlpha *= a; g.shadowColor = 'rgba(255,212,59,.55)'; g.shadowBlur = 14;
  const gr = g.createRadialGradient(x - r * .3, y - r * .3, r * .1, x, y, r); gr.addColorStop(0, '#FFF1A8'); gr.addColorStop(1, COIN);
  g.fillStyle = gr; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); g.shadowBlur = 0;
  g.strokeStyle = COINE; g.lineWidth = Math.max(2, r * .14); g.stroke(); g.beginPath(); g.arc(x, y, r * .62, 0, 7); g.lineWidth = Math.max(1.5, r * .08); g.stroke(); g.restore();
}
function wallet(g, x, y, w, h, col, a = 1, fill = .14, lw = 4.5) {   // x,y 左上角
  if (a <= 0) return; g.save(); g.globalAlpha *= a; g.fillStyle = rgba(col, fill); g.strokeStyle = col; g.lineWidth = lw;
  g.beginPath(); g.roundRect(x, y, w, h, Math.min(22, h * .2)); g.fill(); g.stroke();
  g.beginPath(); g.moveTo(x + 8, y + h * .24); g.lineTo(x + w - 8, y + h * .24); g.lineWidth = lw * .55; g.globalAlpha *= .6; g.stroke();
  g.globalAlpha = a; g.fillStyle = col; g.beginPath(); g.arc(x + w - 22, y + h * .24, Math.max(3, w * .035), 0, 7); g.fill(); g.restore();
}
const SLOT = [[-1, -1], [1, -1], [-1, 1], [1, 1]];
function slotPos(cx, cy, i, d = 48) { return [cx + SLOT[i][0] * d, cy + 28 + SLOT[i][1] * d * .95]; }
function box(g, x, y, w, h, col, a = 1, dash = false, lw = 3.5, fill = null) {
  if (a <= 0) return; g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = lw; if (dash) g.setLineDash([16, 8]);
  g.beginPath(); g.roundRect(x, y, w, h, 18); if (fill) { g.fillStyle = fill; g.fill(); } g.stroke(); g.restore();
}
function tx(g, s, x, y, size, col, a = 1, o = {}) { txt(g, s, x, y, Object.assign({ size, col, a, w: 700, al: 'center' }, o)); }
function ring(g, cx, cy, r, col, lw, a) { if (r <= 0 || a <= 0) return; g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = lw; g.beginPath(); g.arc(cx, cy, r, 0, 7); g.stroke(); g.restore(); }
const f2 = v => v.toFixed(2), f3 = v => v.toFixed(3);
const sgn = v => (v >= 0 ? '+' : '−') + Math.abs(v).toFixed(2);

const S = [];
// ===================== 镜头 1：钩子 =====================
{
  const RX0 = 760, RX1 = 1800, RY0 = 560, RY1 = 900, SX0 = 190, SX1 = 400, SY0 = 660, SY1 = 800;
  const wR = (k, t) => [RX0 + 70 + (RX1 - RX0 - 140) * (.5 + .5 * Math.sin(t * .7 + k * 2.1)), RY0 + 60 + (RY1 - RY0 - 120) * (.5 + .5 * Math.sin(t * .9 + k * 1.3))];
  const wS = (k, t) => [SX0 + 34 + (SX1 - SX0 - 68) * (.5 + .5 * Math.sin(t * 1.3 + k)), SY0 + 34 + (SY1 - SY0 - 68) * (.5 + .5 * Math.sin(t * 1.1 + k * .7))];
  function coinPos(k, t) {
    const P = 7 + (k % 4) * 1.4, u = (t / P + hash(k)) % 1; let w;
    if (u < .4) w = 0; else if (u < .48) w = ease((u - .4) / .08); else if (u < .88) w = 1; else if (u < .96) w = 1 - ease((u - .88) / .08); else w = 0;
    const a = wR(k, t), b = wS(k, t); return [mix(a[0], b[0], w), mix(a[1], b[1], w) - 110 * Math.sin(Math.PI * w)];
  }
  S.push({ target: 20, lead: 1.0, tail: .6,
    lines: ['同一个系统，处在高能量状态，和低能量状态，哪个更常见？', '答案是低能量。', '可这不是因为低能量“更舒服”，', '而是因为——数数。'],
    cues: [[s => s.L[1], 'ding'], [s => s.L[3], 'ding']],
    draw(g, lt, s) {
      // 第 0 帧就有标题（alpha 恒为 1）
      tx(g, '为什么高能量的状态更少见？', W / 2, 170, 104, C.ink, 1, { w: 900, glow: 'rgba(94,200,255,.25)' });
      const wA = 336, wB = fmw('title', 76), wC = 290, gap = 26, x0 = W / 2 - (wA + wB + wC + gap * 2) / 2;
      txt(g, '玻尔兹曼因子', x0, 312, { size: 58, w: 700, col: C.mute }); fm(g, 'title', x0 + wA + gap, 312, 76); txt(g, '是数出来的', x0 + wA + wB + gap * 2, 312, { size: 58, w: 700, col: C.mute });
      // 高 / 低 能量
      const ah = seg(lt, s.L[0] + .6, .5), al = seg(lt, s.L[0] + 1.6, .5), aa = seg(lt, s.L[1], .5), ad = seg(lt, s.L[3], .6);
      const pw = 360; box(g, 360, 400, pw, 96, C.red, ah, false, 4, 'rgba(255,85,119,.1)'); tx(g, '高能量状态', 360 + pw / 2, 449, 48, C.red, ah);
      tx(g, 'VS', W / 2, 449, 44, C.mute, Math.min(ah, al)); box(g, 1200, 400, pw, 96, C.green, al, false, 4, 'rgba(94,224,168,.1)'); tx(g, '低能量状态', 1200 + pw / 2, 449, 48, C.green, al);
      tx(g, '更常见！', 1380, 530, 44, C.green, aa); tx(g, '？', 540, 530, 44, C.mute, ah * (1 - aa));
      // 系统（蓝，小）与热库（橙，巨大）
      box(g, SX0, SY0, SX1 - SX0, SY1 - SY0, SYS, 1, false, 5, rgba(SYS, .16)); tx(g, '系统', (SX0 + SX1) / 2, SY1 + 38, 40, SYS);
      box(g, RX0, RY0, RX1 - RX0, RY1 - RY0, RES, 1, false, 5, rgba(RES, .1)); tx(g, '热库', RX0 + 70, RY0 + 36, 40, RES);
      for (let k = 0; k < 20; k++) { const [x, y] = coinPos(k < 6 ? k : 6 + k, lt + 4); coin(g, x, y, 15); }
      if (ad > 0) { tx(g, '数数', W / 2, 640, 150, COIN, ad, { w: 900, glow: 'rgba(255,212,59,.5)' }); }
    } });
}
// ===================== 镜头 2：搭模型 =====================
{
  const WX = [430, 790, 1150, 1510], WY = 360, WW = 260, WH = 230, CY = WY + WH / 2 - 10;
  const SPL = [[1, 1, 1, 1], [0, 2, 1, 1], [2, 0, 1, 1], [0, 0, 3, 1], [1, 0, 2, 1], [0, 1, 0, 3], [4, 0, 0, 0], [1, 2, 0, 1]];
  SPL.forEach(sp => { if (!BZ.splits35.some(q => q.join() === sp.join())) throw new Error('split not in 35: ' + sp); });
  const coinAt = (sp, i) => { let c = 0, w = 0; while (c + sp[w] <= i) { c += sp[w]; w++; } const [x, y] = slotPos(WX[w], CY, i - c); return [x, y]; };
  S.push({ target: 40, lead: 0.8, tail: .6,
    lines: ['我们用一个能数出来的小模型。', '四个振子，每个就是一个钱包，能量子就是硬币。', '钱包里有几枚硬币，这个振子就有几份能量。', '总共四枚硬币，在四个钱包之间自由分配。', '分法有很多种，先看几个。', '蓝色的是我们关心的系统，其余三个是热库。', '唯一的规则：每一种完整的分法，出现的机会一样多。'],
    cues: [[s => s.L[3], 'ding'], [s => s.L[6], 'ding']],
    draw(g, lt, s) {
      tx(g, '一个能数出来的小模型', W / 2, 130, 66, C.ink, seg(lt, .1, .5), { w: 800 });
      const aw = seg(lt, s.L[0] + .3, .6), ac = seg(lt, s.L[1] + 1.2, .6), a3 = seg(lt, s.L[5], .6), a4 = seg(lt, s.L[6], .6);
      WX.forEach((x, i) => { wallet(g, x - WW / 2, WY, WW, WH, i === 0 ? SYS : RES, seg(lt, s.L[0] + .3 + i * .18, .5)); });
      // 图例
      if (ac > 0) { coin(g, 560, 240, 22, ac); tx(g, '= 能量子 ε（硬币）', 740, 240, 40, COIN, ac); wallet(g, 1090, 210, 70, 60, RES, ac, .14, 3.5); tx(g, '= 振子（钱包）', 1330, 240, 40, C.ink, ac); }
      // 硬币分配：L2 之后随机换分法
      const tt = lt - s.L[3], idx = Math.max(0, Math.floor(tt / 1.9)), cur = SPL[idx % SPL.length], prv = SPL[(idx + SPL.length - 1) % SPL.length];
      const ph = idx === 0 ? 1 : ease(((tt - idx * 1.9) / .8));
      for (let i = 0; i < 4; i++) {
        let [x1, y1] = coinAt(cur, i); let x, y;
        if (tt < 0) { x = x1; y = y1; const [xs, ys] = coinAt(SPL[0], i); x = xs; y = ys; }
        else { const [x0, y0] = coinAt(prv, i); x = mix(x0, x1, ph); y = mix(y0, y1, ph) - 60 * Math.sin(Math.PI * ph) * (x0 === x1 ? 0 : 1); }
        const dropA = seg(lt, s.L[1] + 1.2 + i * .15, .5); coin(g, x, y - (1 - dropA) * 80, 24, dropA);
      }
      // 括号标注
      if (a3 > 0) {
        const by = WY + WH + 50; arrow(g, WX[0] - 120, by, WX[0] + 120, by, SYS, 4, 12, a3); arrow(g, WX[0] + 120, by, WX[0] - 120, by, SYS, 4, 12, a3);
        tx(g, '系统（1 个振子）', WX[0], by + 50, 38, SYS, a3);
        arrow(g, WX[1] - 120, by, WX[3] + 120, by, RES, 4, 12, a3); arrow(g, WX[3] + 120, by, WX[1] - 120, by, RES, 4, 12, a3); tx(g, '热库（3 个振子）', (WX[1] + WX[3]) / 2, by + 50, 38, RES, a3);
      }
      // 角落一行字：从 L2 起反复出现
      const cyc = (lt - s.L[3]) % 5.5, ap = lt < s.L[3] ? 0 : Math.min(lin(cyc, 0, .4), 1 - lin(cyc, 3.2, .5)) * .9 + (lt > s.L[6] ? .1 : 0);
      tx(g, '每一种分法，机会一样', 1620, 86, 36, COIN, Math.max(0, ap), { w: 700 });
      if (a4 > 0) { box(g, 380, 780, 1160, 130, COIN, a4, false, 4, 'rgba(255,212,59,.08)'); tx(g, '等概率原理：每一种完整的分法，机会一样多', 960, 845, 52, C.ink, a4, { w: 800 }); }
    } });
}
// ===================== 镜头 3：数数 =====================
{
  const bx = i => 270 + i * 172, base = 800, bh = v => v / 15 * 470;
  const q3 = BZ.q3groups, rowY = [330, 545, 760], cx0 = 900, pitch = 160;
  const cell = (g, c, x, y, a, hi = false) => { for (let i = 0; i < 3; i++) { const X = x + i * 50; wallet(g, X, y - 28, 44, 56, RES, a, hi ? .32 : .12, 3); tx(g, '' + c[i], X + 22, y + 8, 34, c[i] ? COIN : C.mute, a, { w: 800, serif: true }); } };
  S.push({ target: 60, lead: 0.8, tail: .6,
    lines: ['怎么数？先固定系统手里的硬币数 n。', '比如系统拿 1 枚，库里就剩 3 枚。', '三枚分给三个钱包。先看独得三枚的：3 种；', '再看 2、1、0 的分法，排列出 6 种；', '最后三个钱包各一枚：1 种。合计 10 种。', '还有个窍门：星和隔板。', '三颗星、两根隔板排成一行，选 2 个位置放隔板：', '照这个数法，系统拿零枚，库里分四枚：15 种；', '拿一枚：10 种；拿两枚：6 种；', '三枚：3 种；四枚：只有 1 种。', '一共 35 种，机会相同。', '所以系统拿零枚的概率是 35 分之 15，', '拿四枚，只有 35 分之 1。', '系统拿走的能量越多，库剩下的越少，', '库能排的方式就越少，这个状态就越少见。'],
    cues: [[s => s.L[2] + 1.2, 'ding'], [s => s.L[6] + 1.6, 'ding'], [s => s.L[7], 'ding'], [s => s.L[10], 'ding']],
    draw(g, lt, s) {
      const L = s.L, pA = 1 - seg(lt, L[7] - .1, .5);                    // 前半段（逐一数 + 星隔板）整体淡出
      const pB = seg(lt, L[7] + .1, .6);                                  // 后半段柱状图
      if (pA > 0) {
        g.save(); g.globalAlpha *= pA;
        const a0 = seg(lt, .2, .6), a1 = seg(lt, L[1], .7);
        tx(g, '系统拿 n 枚，库里就剩 q = 4 − n 枚', W / 2, 110, 54, C.ink, a0, { w: 800 });
        wallet(g, 110, 380, 260, 230, SYS, a0); tx(g, '系统', 240, 345, 40, SYS, a0); tx(g, 'n = ' + (lt >= L[1] + .6 ? 1 : 0), 240, 650, 46, SYS, a0, { w: 800 });
        const ca = seg(lt, L[1] + .1, .9); coin(g, mix(520, 240 - 0, ca), mix(430, 460, ca) - 60 * Math.sin(Math.PI * ca), 24, a1);
        tx(g, '库', 520, 345, 40, RES, a0); for (let i = 0; i < 3; i++) wallet(g, 440 + i * 80 - 0, 380, 64, 80, RES, a0, .14, 3.5);
        tx(g, 'q = ' + (lt >= L[1] + .6 ? 3 : 4), 520, 520, 46, RES, a0, { w: 800 });
        if (lt >= L[1]) { tx(g, '库：3 枚 → 3 个钱包', 520, 590, 34, C.mute, a1); }
        // 10 种分法：三组
        const t3 = [L[2] + 1.2, L[3] + .9, L[4] + .7];
        let k = 0;
        q3.forEach((grp, gi) => {
          const y = rowY[gi], ga = seg(lt, t3[gi] - .6, .5);
          if (ga > 0) { box(g, 720, y - 78, 1160, 156, RES, ga * .35, true, 2.5); pill(g, grp.length + ' 种', 790, y, COIN, { size: 42, al: 'center', a: ga }); }
          grp.forEach((c, ci) => { const a = seg(lt, t3[gi] + ci * .22, .4); cell(g, c, cx0 + ci * pitch, y, a, a > .5); k++; });
        });
        // 库的小图随 10 种分法轮换
        const cyc = Math.floor(Math.max(0, lt - L[2]) / .55) % 10, cc = q3.flat()[cyc]; if (lt > L[2] && lt < L[5]) { for (let i = 0; i < 3; i++) tx(g, '' + cc[i], 440 + i * 80 + 32, 438, 36, cc[i] ? COIN : C.mute, 1, { w: 800, serif: true }); }
        // 星和隔板覆盖层
        const ao = seg(lt, L[5], .5) * (1 - seg(lt, L[7] - .5, .4));
        if (ao > 0) {
          g.fillStyle = `rgba(11,19,34,${.97 * ao})`; g.fillRect(0, 150, W, 800);
          tx(g, '星和隔板', W / 2, 230, 56, COIN, ao, { w: 800 });
          const ts = Math.max(0, lt - L[6]), idx = Math.floor(ts / .85) % 10, e = BZ.sb[idx], bars = e.bars; if (lt < L[6]) { /* 先展示一种 */ }
          const e0 = lt < L[6] ? BZ.sb[0] : e; const bb = e0.bars, X0 = 560, P = 135;
          for (let i = 0; i < 5; i++) { const x = X0 + i * P; box(g, x - 52, 360, 104, 130, C.grid, ao, false, 2.5); const isBar = bb.includes(i); tx(g, isBar ? '|' : '★', x, 428, isBar ? 110 : 80, isBar ? SYS : COIN, ao, { w: 900 }); }
          tx(g, '3 颗星 ★ + 2 根隔板 |，排成一行', W / 2, 555, 42, C.ink, ao);
          tx(g, `→ 三个钱包分到  ${e0.counts[0]}  ${e0.counts[1]}  ${e0.counts[2]}`, W / 2, 625, 56, C.ink, ao, { w: 800, serif: true });
          const af = seg(lt, L[6] + 1.2, .6) * ao; fm(g, 'sbC', 800, 790, 58, { a: af, al: 'center', p: seg(lt, L[6] + 1.2, 1) });
          tx(g, '选 2 个位置放隔板', 1000, 790, 42, C.mute, af, { al: 'left' });
        }
        g.restore();
      }
      if (pB > 0) {
        g.save(); g.globalAlpha *= pB;
        tx(g, '系统拿走的能量 E = nε   →   库里的分法数 Ω_R(n)', 680, 120, 44, C.ink, 1, { w: 800 });
        line(g, 170, base, 1160, base, C.axis, 3); tx(g, 'n（系统硬币数）', 1000, base + 90, 38, SYS, 1);
        BZ.omega.forEach((v, i) => {
          const t = [L[7] + .4, L[8] + .1, L[8] + 1.0, L[9] + .1, L[9] + 1.0][i], gr = seg(lt, t, .8), h = bh(v) * gr, ha = (lt > L[11] && (i === 0 || i === 4)) ? 1 : 0;
          g.save(); g.fillStyle = rgba(RES, .85); g.beginPath(); g.roundRect(bx(i) - 55, base - h, 110, h, 8); g.fill(); g.restore();
          if (gr > .02) tx(g, '' + v, bx(i), base - h - 34, 50, COIN, gr, { w: 800, serif: true });
          tx(g, '' + i, bx(i), base + 38, 46, SYS, 1, { w: 800, serif: true });
          if (ha) box(g, bx(i) - 70, base - h - 80, 140, h + 100, COIN, seg(lt, L[11], .5), true, 3);
        });
        // 右侧：合计与概率
        const as = seg(lt, L[10], .6); fm(g, 'omegaSum', 1480, 270, 52, { a: as, al: 'center', p: seg(lt, L[10], 1) }); tx(g, '一共 35 种，机会相同', 1480, 350, 40, C.mute, as);
        BZ.Pnum.forEach((p, i) => { const a = seg(lt, L[11] + .3 + i * .35, .5), y = 470 + i * 84; tx(g, `P(${i}) = ${BZ.omega[i]}/${BZ.total}`, 1240, y, 42, C.ink, a, { al: 'left', serif: true, w: 700 }); tx(g, `≈ ${f2(p)}`, 1590, y, 40, i === 0 ? C.green : (i === 4 ? C.red : C.mute), a, { al: 'left', serif: true, w: 700 }); });
        const ac = seg(lt, L[13], .6);
        if (ac > 0) { tx(g, '能量越高 → 库剩下的越少 → 分法越少 → 越少见', 680, 190, 46, COIN, ac, { w: 800 }); arrow(g, bx(0) - 40, base - bh(15) - 90, bx(4) + 20, base - bh(1) - 70, COIN, 5, 22, ac * seg(lt, L[13], 1.4)); }
        g.restore();
      }
    } });
}
// ===================== 镜头 4：变大 =====================
{
  const base = 810, gx = i => 270 + i * 125, ph = 520 / .6, big = BZ.big;
  S.push({ target: 35, lead: 0.8, tail: .6,
    lines: ['刚才的库只有三个钱包，柱子有点弯。', '把库加大：先到 10 个钱包，', '再到 50 个钱包。', '总硬币数也按比例加，平均每个钱包还是 1 枚。', '库越大，这条曲线越接近指数。', '这就是玻尔兹曼因子 e^(−E/kT) 的来源：', '不是定律，是数出来的。'],
    cues: [[s => s.L[1], 'ding'], [s => s.L[2], 'ding'], [s => s.L[5], 'ding']],
    draw(g, lt, s) {
      const L = s.L; tx(g, '系统拿走的能量 E = nε 的概率 P(n)', 760, 120, 50, C.ink, seg(lt, .1, .5), { w: 800 });
      // 形变参数 m∈[0,2]
      const m = seg(lt, L[1], 1.6) + seg(lt, L[2], 1.6), i0 = Math.min(1, Math.floor(m)), f = m >= 2 ? 1 : m - i0, B0 = big[i0], B1 = big[Math.min(2, i0 + 1)];
      const near = Math.round(m), Bn = big[near];
      const P = k => mix(B0.P[k], B1.P[k], f), A = mix(B0.A, B1.A, f), be = mix(B0.beta, B1.beta, f);
      // 坐标轴
      line(g, 190, base, 1330, base, C.axis, 3); line(g, 190, base, 190, base - 540, C.axis, 3);
      [0, .2, .4, .6].forEach(v => { const y = base - v * ph; line(g, 182, y, 198, y, C.axis, 2); txt(g, f2(v).replace(/0$/, ''), 168, y, { size: 30, col: C.mute, al: 'right', serif: true }); if (v > 0) line(g, 198, y, 1330, y, C.grid, 1.5); });
      for (let k = 0; k <= 8; k++) {
        const v = P(k), h = v * ph; g.save(); g.fillStyle = rgba(RES, .85); if (h > .5) { g.beginPath(); g.roundRect(gx(k) - 40, base - h, 80, h, 6); g.fill(); } g.restore();
        tx(g, '' + k, gx(k), base + 38, 40, SYS, 1, { w: 800, serif: true });
      }
      tx(g, 'n', 1360, base + 6, 40, SYS, 1, { serif: true }); tx(g, 'P(n)', 210, base - 565, 38, C.ink, 1, { serif: true, al: 'left' });
      // 指数拟合线
      const af = seg(lt, L[0] + 2.2, .8), ax = x => 270 + x * 125 - 0; const nx = x => base - A * Math.exp(-be * x) * ph;
      curve(g, X => nx((X - 270) / 125), 270, 270 + 8 * 125, '#FFFFFF', 4, af * .95, [14, 9], 3);
      tx(g, '白色虚线：指数拟合  A·e^(−βE)', 800, 400, 34, '#FFFFFF', af, { al: 'left' });
      // 右栏：库的示意
      const R = Bn.r, cols = R === 3 ? 3 : R === 10 ? 5 : 10, rows = Math.ceil(R / cols), cs = Math.min(380 / cols, 190 / rows), bxw = 440, by0 = 300;
      tx(g, `库：r = ${R} 个振子   （共 Q = ${Bn.Q} 枚）`, 1640, 250, 34, RES, 1); box(g, 1420, by0, bxw, 240, RES, 1, false, 3, rgba(RES, .08));
      for (let i = 0; i < R; i++) { const c = i % cols, r = Math.floor(i / cols), x = 1420 + (bxw - cols * cs) / 2 + c * cs, y = by0 + (240 - rows * cs) / 2 + r * cs; wallet(g, x + cs * .1, y + cs * .12, cs * .8, cs * .76, RES, 1, .16, Math.max(1.5, cs * .05)); }
      tx(g, `拟合  ${'β·ε = ' + f3(Bn.beta)}`, 1640, 600, 44, '#FFFFFF', af, { w: 800, serif: true });
      tx(g, `与指数的最大偏差 ${(Bn.dev * 100).toFixed(1)}%`, 1640, 660, 36, Bn.dev < .02 ? C.green : (Bn.dev < .1 ? COIN : C.red), af, { w: 700 });
      tx(g, '（n = 0…4）', 1640, 705, 30, C.mute, af);
      const a5 = seg(lt, L[5], .6); if (a5 > 0) { box(g, 1440, 740, 400, 150, COIN, a5, false, 4, 'rgba(255,212,59,.08)'); fm(g, 'bf2', 1640, 805, 84, { a: a5, al: 'center', p: seg(lt, L[5] + .3, 1) }); tx(g, '玻尔兹曼因子', 1640, 868, 30, C.mute, a5); }
      const a6 = seg(lt, L[6], .6); if (a6 > 0) { tx(g, '不是定律，是数出来的', 760, 190, 64, COIN, a6, { w: 900, glow: 'rgba(255,212,59,.4)' }); }
    } });
}
// ===================== 镜头 5：粒子 =====================
{
  const lat = BZ.lat, gx = N => 250 + N * 125, LY0 = 610, LH = 280, ly = v => LY0 + LH - (Math.log10(v) + 3) / 6 * LH, cols = 40, rows = 6, RX0 = 560, RY0 = 150, pitchX = 28.5, pitchY = 33;
    S.push({ target: 35, lead: 0.8, tail: .6,
    lines: ['系统不只能拿能量，还能拿粒子。', '拿走一个粒子，库里就少一个小球，', '库的状态数就乘上同一个倍数。', '库足够大时，每一步的倍数几乎不变。', '这个倍数就是 e 的 βμ 次方，', '所以化学势 μ，就是这个倍数的对数。', 'μ > 0 时，系统多拿粒子，库的状态数反而变多。'],
    cues: [[s => s.L[2], 'ding'], [s => s.L[4], 'ding'], [s => s.L[6], 'ding']],
    draw(g, lt, s) {
      const L = s.L, a0 = seg(lt, .2, .6);
      box(g, 140, 150, 300, 200, SYS, a0, false, 5, rgba(SYS, .16)); tx(g, '系统', 290, 122, 38, SYS, a0);
      box(g, 520, 100, 1330, 270, RES, a0, false, 5, rgba(RES, .08)); tx(g, `热库：M 个格子，放 k 个小球`, 1000, 76, 34, RES, a0); tx(g, '（示意：实际计算用 M = 1000）', 1600, 76, 26, C.mute, a0);
      const fly = seg(lt, L[1] + .3, 1.0), pick = 100;               // 被拿走的那个小球所在格
      for (let i = 0; i < cols * rows; i++) {
        const c = i % cols, r = Math.floor(i / cols), x = 560 + c * 31.4, y = 138 + r * 44; const has = hash(i * 1.7 + 3.3) < .3 && i !== pick;
        if (has) dot(g, x, y, 10, BALL, a0, 8); else dot(g, x, y, 4, 'rgba(133,151,176,.45)', a0);
      }
      { const x = 560 + (pick % cols) * 31.4, y = 138 + Math.floor(pick / cols) * 44; if (fly < 1) { const X = mix(x, 290, fly), Y = mix(y, 250, fly) - 100 * Math.sin(Math.PI * fly); dot(g, X, Y, 12, BALL, a0, 14); }
        else dot(g, 290, 250, 12, BALL, 1, 14); if (fly > 0) ring(g, x, y, 14, BALL, 2, (1 - fly) * a0); }
      tx(g, `系统：${fly >= 1 ? 1 : 0} 个小球`, 290, 395, 34, C.ink, a0 * seg(lt, L[1], .4)); tx(g, `库：${fly >= 1 ? 'k−1' : 'k'} 个小球`, 1185, 410, 34, C.ink, a0 * seg(lt, L[1], .4));
      // 对数坐标图
      const ac = seg(lt, L[2], .6);
      if (ac > 0) {
        line(g, 150, LY0 + LH, 1000, LY0 + LH, C.axis, 3, null, ac); line(g, 150, LY0, 150, LY0 + LH, C.axis, 3, null, ac);
        [-3, -2, -1, 0, 1, 2, 3].forEach(e => { const y = ly(Math.pow(10, e)); line(g, 150, y, 1000, y, e === 0 ? C.axis : C.grid, e === 0 ? 2 : 1.2, e === 0 ? [8, 6] : null, ac); });
        // 刻度上标（用文本代替）
        ['10⁻³', '10⁻²', '10⁻¹', '1', '10', '10²', '10³'].forEach((lb, i) => { const y = ly(Math.pow(10, i - 3)); g.save(); g.globalAlpha *= ac; g.fillStyle = C.bg; g.fillRect(40, y - 14, 106, 28); g.restore(); txt(g, lb, 140, y, { size: 24, col: C.mute, al: 'right', a: ac, serif: true }); });
        tx(g, '系统拿走 N 个粒子后，库的状态数（相对）', 580, LY0 - 28, 30, C.mute, ac); tx(g, 'N', 1030, LY0 + LH + 6, 34, C.ink, ac, { serif: true });
        for (let N = 0; N <= 6; N++) tx(g, '' + N, gx(N) - 0 + 0, LY0 + LH + 30, 28, C.ink, ac, { serif: true });
        const drawSeries = (arr, col, t0, dash, lbl, ly0) => {
          const p = seg(lt, t0, 2.2); if (p <= 0) return; const pts = arr.map((v, N) => [gx(N), ly(v)]);
          g.save(); g.strokeStyle = col; g.lineWidth = 5; if (dash) g.setLineDash(dash); g.beginPath(); const nSeg = p * 6;
          pts.forEach(([x, y], i) => { if (i === 0) g.moveTo(x, y); else if (i <= nSeg) g.lineTo(x, y); else if (i - 1 < nSeg) { const f = nSeg - (i - 1); const [x0, y0] = pts[i - 1]; g.lineTo(mix(x0, x, f), mix(y0, y, f)); } }); g.stroke(); g.restore();
          pts.forEach(([x, y], i) => { if (i <= nSeg + .01) dot(g, x, y, 9, col, 1, 8); }); tx(g, lbl, pts[6][0] + 20, pts[6][1] + ly0, 28, col, p > .95 ? 1 : p, { al: 'left' });
        };
        drawSeries(lat.sparse.rel, RES, L[2] + .6, null, '稀', 0); if (lt > L[6] - .2) drawSeries(lat.dense.rel, '#FFB45E', L[6] + .2, [14, 8], '密', 0);
        tx(g, `稀：每拿一个，×${f3(lat.sparse.step[0])}`, 680, ly(.4), 30, RES, seg(lt, L[2] + 2.4, .5), { al: 'left', w: 700 });
        tx(g, `密：每拿一个，×${f3(lat.dense.step[0])}`, 200, ly(80), 30, '#FFB45E', seg(lt, L[6] + 2.2, .5), { al: 'left', w: 700 });
        tx(g, '对数坐标里是直线：每一步乘同一个倍数', 580, LY0 - 62, 30, COIN, seg(lt, L[2] + 2.8, .6));
      }
      // 右栏：公式
      const a3 = seg(lt, L[4], .6), a4 = seg(lt, L[5], .6);
      if (a3 > 0) { tx(g, '库少一个粒子：熵 +μ/T，状态数 × e^(βμ)', 1450, 470, 34, C.mute, a3); box(g, 1180, 510, 540, 140, COIN, a3, false, 4, 'rgba(255,212,59,.08)'); fm(g, 'mult', 1450, 580, 72, { a: a3, al: 'center', p: seg(lt, L[4] + .2, 1) }); }
      if (a4 > 0) { fm(g, 'mu', 1450, 720, 56, { a: a4, al: 'center', p: seg(lt, L[5] + .2, 1.1) }); tx(g, `稀：βμ = ${sgn(lat.sparse.mu_over_kT[0])}（μ<0）`, 1250, 810, 32, RES, a4 * seg(lt, L[5] + 1, .5), { al: 'left', w: 700 }); }
      const a5 = seg(lt, L[6], .6); if (a5 > 0) tx(g, `密：βμ = ${sgn(lat.dense.mu_over_kT[0])}（μ>0）`, 1250, 860, 32, '#FFB45E', a5, { al: 'left', w: 700 });
    } });
}
// ===================== 镜头 6：写成公式 =====================
{
  const SE = BZ.SE, SN = BZ.SN, X0 = 130, X1 = 780, YB = 880, YT = 420;
  const e0 = SE.E[0], e1 = SE.E[SE.E.length - 1], sMin = Math.min(...SE.S), sMax = Math.max(...SE.S);
  const ex = e => X0 + (e - e0) / (e1 - e0) * (X1 - X0), ey = v => YB - (v - sMin) / (sMax - sMin) * (YB - YT);
  const n0 = SN.N[0], n1 = SN.N[SN.N.length - 1], nMin = Math.min(...SN.S), nMax = Math.max(...SN.S);
  const nx = n => X0 + (n - n0) / (n1 - n0) * (X1 - X0), ny = v => YB - (v - nMin) / (nMax - nMin) * (YB - YT);
  const RX = 1360;
  S.push({ target: 45, lead: 0.8, tail: .6,
    lines: ['把这个数数的规律写成公式。', '玻尔兹曼说，状态数等于 e 的 S 除以 kB 次方。', '所以系统某个状态的概率，正比于库的分法数，', '也就是 e 的 S_R 除以 kB 次方。', '系统拿走一点点能量，库的熵沿切线下降，', '降的量是能量乘以斜率，而这个斜率，', '正是温度的倒数。', '粒子同理，斜率是负的 μ 除以 T。', '合起来，概率正比于 e 的负 β 乘以 E 减 μN。'],
    cues: [[s => s.L[1] + 1, 'ding'], [s => s.L[4], 'ding'], [s => s.L[8], 'ding']],
    draw(g, lt, s) {
      const L = s.L, pE = 1 - seg(lt, L[7] - .2, .6), pN = seg(lt, L[7] + .1, .6);
      // ---- 左：图 ----
      const a0 = seg(lt, .3, .6);
      if (pE > 0) {
        g.save(); g.globalAlpha *= pE;
        tx(g, '库的熵 S_R / k_B = ln Ω_R（真实计数）', 450, 330, 32, C.mute, a0); arrow(g, X0 - 20, YB, X1 + 30, YB, C.axis, 3, 16, a0); arrow(g, X0, YB + 20, X0, YT - 30, C.axis, 3, 16, a0);
        tx(g, '库的能量 E_R', X1 - 40, YB + 44, 30, C.ink, a0); tx(g, 'S_R', X0 - 14, YT - 50, 32, C.ink, a0, { serif: true });
        const cp = seg(lt, L[1] + .2, 2.0); curve(g, X => { const e = e0 + (X - X0) / (X1 - X0) * (e1 - e0), i = Math.min(SE.S.length - 2, Math.max(0, Math.floor(e - e0))), f = e - e0 - i; return ey(mix(SE.S[i], SE.S[i + 1], f)); }, X0, X0 + (X1 - X0) * cp, RES, 5, a0, null, 2);
        const at = seg(lt, L[4], .8), tg = e => ey(SE.S0 + SE.slope * (e - SE.Etot));
        line(g, ex(SE.Etot), YB, ex(SE.Etot), ey(SE.S0), C.mute, 2, [8, 6], at); tx(g, 'E_tot', ex(SE.Etot), YB + 34, 28, C.mute, at, { serif: true }); dot(g, ex(SE.Etot), ey(SE.S0), 9, COIN, at, 10);
        curve(g, X => tg(e0 + (X - X0) / (X1 - X0) * (e1 - e0)), ex(SE.Etot - 30), ex(SE.Etot + 26), COIN, 4, at, [14, 8], 3); tx(g, '切线', ex(SE.Etot + 26) + 10, tg(SE.Etot + 26) - 10, 30, COIN, at, { al: 'left' });
        const Ex = 14, ad = seg(lt, L[4] + 1.2, 1.2), exx = ex(SE.Etot - Ex), tvv = SE.S0 - SE.slope * Ex;
        if (ad > 0) { const xx = mix(ex(SE.Etot), exx, ad), yy = mix(ey(SE.S0), ey(tvv), ad); arrow(g, ex(SE.Etot), ey(SE.S0), xx, yy, '#FFFFFF', 5, 18, 1); line(g, exx, YB, exx, ey(tvv), C.mute, 2, [8, 6], ad); tx(g, 'E_tot − E', exx, YB + 34, 28, C.mute, ad, { serif: true }); }
        const af = seg(lt, L[5], .6); if (af > 0) tx(g, '下降 ≈ E × 斜率', ex(SE.Etot) + 90, ey(SE.S0) + 80, 32, '#FFFFFF', af);
        g.restore();
      }
      if (pN > 0) {
        g.save(); g.globalAlpha *= pN;
        tx(g, '库的熵 S_R / k_B = ln Ω_R（格子里的小球）', 450, 330, 32, C.mute); arrow(g, X0 - 20, YB, X1 + 30, YB, C.axis, 3, 16); arrow(g, X0, YB + 20, X0, YT - 30, C.axis, 3, 16);
        tx(g, '库的粒子数 N_R', X1 - 40, YB + 44, 30, C.ink); tx(g, 'S_R', X0 - 14, YT - 50, 32, C.ink, 1, { serif: true });
        curve(g, X => { const n = n0 + (X - X0) / (X1 - X0) * (n1 - n0), i = Math.min(SN.S.length - 2, Math.max(0, Math.floor(n - n0))), f = n - n0 - i; return ny(mix(SN.S[i], SN.S[i + 1], f)); }, X0, X1, RES, 5, 1, null, 2);
        const tgn = n => ny(SN.S0 + SN.slope * (n - SN.k)); dot(g, nx(SN.k), ny(SN.S0), 9, COIN, 1, 10);
        curve(g, X => tgn(n0 + (X - X0) / (X1 - X0) * (n1 - n0)), nx(SN.k - 70), nx(SN.k + 70), COIN, 4, 1, [14, 8], 3); tx(g, '切线', nx(SN.k + 70) + 10, tgn(SN.k + 70) - 10, 30, COIN, 1, { al: 'left' });
        const Nx = 45; arrow(g, nx(SN.k), ny(SN.S0), nx(SN.k - Nx), ny(SN.S0 - SN.slope * Nx), '#FFFFFF', 5, 18, seg(lt, L[7] + .6, .8)); tx(g, '斜率 = −μ/T', nx(SN.k) + 110, ny(SN.S0) + 90, 34, COIN, seg(lt, L[7] + 1, .6));
        g.restore();
      }
      // ---- 右：公式 ----
      const a1 = seg(lt, L[1] + .3, .6), a2 = seg(lt, L[3], .6), a4 = seg(lt, L[4] + .4, .6), a6 = seg(lt, L[6], .6), a7 = seg(lt, L[7] + .4, .6), a8 = seg(lt, L[8], .6), dim = 1 - .45 * seg(lt, L[8] - .2, .6);
      const hl = (lt > L[5] && lt < L[6] + 1.4) ? 1 : 0;
      fm(g, 'f6a', RX - 240, 220, 62, { a: a1 * dim, al: 'center', p: seg(lt, L[1] + .3, .9) }); tx(g, '⇒', RX + 10, 220, 50, C.mute, a1 * dim); fm(g, 'f6b', RX + 240, 220, 62, { a: a1 * dim, al: 'center', p: seg(lt, L[1] + 1.0, .9) });
      fm(g, 'prop', RX, 345, 62, { a: a2 * dim, al: 'center', p: seg(lt, L[2] + .5, 1.2) });
      fm(g, 'f7a', RX, 470, 44, { a: a4 * dim, al: 'center', p: seg(lt, L[4] + .4, 1.4) }); fm(g, 'f7b', RX, 560, 44, { a: a4 * dim, al: 'center', p: seg(lt, L[5], 1.2) });
      if (hl) box(g, RX - 280, 505, 560, 110, '#FFFFFF', .8, true, 2.5);
      fm(g, 'dsE', RX - 250, 685, 56, { a: a6 * dim, al: 'center', p: seg(lt, L[6] + .1, .9) }); fm(g, 'dsN', RX + 240, 685, 56, { a: a7 * dim, al: 'center', p: seg(lt, L[7] + .5, .9) });
      if (a8 > 0) { box(g, RX - 520, 780, 1040, 130, COIN, a8, false, 5, 'rgba(255,212,59,.1)'); fm(g, 'f8', RX, 845, 41, { a: a8, al: 'center', p: seg(lt, L[8] + .2, 1.4) }); }
    } });
}
// ===================== 镜头 7：总结 =====================
{
  const items = [['1', '概率取决于库剩下多少种分法，不是正比于能量', null], ['2', '能量越高越少见，所以是指数下降', 'bf2'], ['3', '粒子的影响由化学势 μ 决定', 'mult']];
  S.push({ target: 25, lead: 0.8, tail: 1.0,
    lines: ['记住三件事。', '一，概率取决于库剩下多少种分法，不是正比于能量；', '二，能量越高越少见，所以是指数下降；', '三，粒子的影响由化学势 μ 决定。', '下一集，我们把这些权重加起来，', '看看它给了我们什么。'],
    cues: [[s => s.L[4], 'ding']],
    draw(g, lt, s) {
      const L = s.L; tx(g, '记住三件事', W / 2, 120, 72, C.ink, seg(lt, .1, .5), { w: 900 });
      items.forEach(([n, t, f], i) => {
        const a = seg(lt, L[i + 1], .6), y = 270 + i * 140; box(g, 150, y - 55, 1620, 110, i === 0 ? SYS : (i === 1 ? RES : COIN), a, false, 3.5, 'rgba(255,255,255,.03)');
        dot(g, 230, y, 34, i === 0 ? SYS : (i === 1 ? RES : COIN), a); tx(g, n, 230, y + 2, 40, '#0B1322', a, { w: 900 });
        tx(g, t, 310, y, 46, C.ink, a, { al: 'left', w: 700 }); if (f) fm(g, f, 1560, y, f === 'bf2' ? 58 : 50, { a, al: 'center' });
      });
      const a4 = seg(lt, L[4], .7), a5 = seg(lt, L[5], .7);
      if (a4 > 0) {
        box(g, 330, 650, 1260, 280, COIN, a4, true, 3.5);
        tx(g, '权重', 560, 710, 40, C.mute, a4, { al: 'left' }); fm(g, 'f8s', 690, 710, 52, { a: a4 }); tx(g, '还不是概率', 1030, 710, 40, C.ink, a4, { al: 'left' });
        tx(g, '概率 = 权重 ÷ 所有权重之和 Ξ', 960, 778, 38, C.ink, a4);
        pill(g, '下一集：这些权重加起来是多少？', W / 2, 862, COIN, { size: 50, al: 'center', a: a5 });
      }
    } });
}
setup(S);
