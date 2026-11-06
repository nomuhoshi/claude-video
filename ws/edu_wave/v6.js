// 视频 6：定常波（定在波）。课本 106–107 页 → 13 幕，无配乐
const GOLD = C.gold, BLU = C.blue, PUR = C.purple, RED = C.red, GRN = C.green, TP = 2.4, LM = 500, KK = 2 * Math.PI / LM, OMG = 2 * Math.PI / TP;
function hatchR(g, x, y0, y1, a = 1) { line(g, x, y0, x, y1, C.ink, 5, null, a); for (let y = y0; y < y1; y += 26) line(g, x, y + 26, x + 24, y, C.mute, 2.5, null, a * .8); }
function box(g, x, y, w, h, col, a, dash = false) { if (a <= 0) return; g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = 3.5; if (dash) g.setLineDash([16, 8]); g.beginPath(); g.roundRect(x, y, w, h, 18); g.stroke(); g.restore(); }
function brace(g, x1, x2, y, col, a, w = 4) { arrow(g, (x1 + x2) / 2 - 2, y, x1, y, col, w, 14, a); arrow(g, (x1 + x2) / 2 + 2, y, x2, y, col, w, 14, a); line(g, x1, y - 12, x1, y + 12, col, w, null, a); line(g, x2, y - 12, x2, y + 12, col, w, null, a); }
// 定常波 y = 2A cos k(x−x0) · cos ωt，包络淡红填充
function SW(g, o) {
  const { ox, x1, oy, A, x0, t = 0, a = 1, env = true, lw = 6, col = RED, live = true } = o, f = x => 2 * A * Math.cos(KK * (x - x0));
  if (a <= 0) return;
  if (env) { g.save(); g.globalAlpha *= a * .9; g.fillStyle = 'rgba(255,85,119,.15)'; g.beginPath(); g.moveTo(ox, oy - Math.abs(f(ox)));
    for (let x = ox; x <= x1; x += 4) g.lineTo(x, oy - Math.abs(f(x))); for (let x = x1; x >= ox; x -= 4) g.lineTo(x, oy + Math.abs(f(x))); g.closePath(); g.fill(); g.restore();
    curve(g, x => oy - Math.abs(f(x)), ox, x1, 'rgba(255,85,119,.55)', 2.5, a, [8, 6], 4); curve(g, x => oy + Math.abs(f(x)), ox, x1, 'rgba(255,85,119,.55)', 2.5, a, [8, 6], 4); }
  line(g, ox - 10, oy, x1 + 10, oy, C.axis, 2, null, a * .7);
  if (live) curve(g, x => oy - f(x) * Math.cos(OMG * t), ox, x1, col, lw, a, null, 3);
}
const antis = (ox, x1, x0) => { const r = []; for (let n = -12; n <= 12; n++) { const x = x0 + n * LM / 2; if (x >= ox - 1 && x <= x1 + 1) r.push(x); } return r; };
const nodes = (ox, x1, x0) => { const r = []; for (let n = -12; n <= 12; n++) { const x = x0 + LM / 4 + n * LM / 2; if (x >= ox - 1 && x <= x1 + 1) r.push(x); } return r; };
const tagA = (g, x, y, a) => txt(g, '腹', x, y, { size: 44, jp: true, w: 800, col: GOLD, al: 'center', a });
const tagN = (g, x, y, a) => txt(g, '節', x, y, { size: 44, jp: true, w: 800, col: BLU, al: 'center', a });

const S = [];
// 0 片头
S.push({ lines: ['两个波形相同、方向相反的波重叠在一起，', '会发生什么？这就是「定常波」。'], lead: 1.2,
  draw(g, lt) {
    SW(g, { ox: 0, x1: W, oy: 800, A: 40, x0: 960, t: lt, a: .45, env: false, lw: 3 });
    txt(g, '定常波', W / 2, 350, { size: 150, jp: true, w: 900, al: 'center', a: seg(lt, 0, .3), glow: 'rgba(255,85,119,.35)' });
    txt(g, '（定在波）', W / 2, 510, { size: 56, jp: true, col: GOLD, al: 'center', a: seg(lt, .1, .35), w: 700 });
  } });
// 1 设定
S.push({ lines: ['定常波：波形相同的两个波，朝相反方向前进并重叠时产生。', '先把这个情景设定牢牢记住。', '蓝色的波向右走，紫色的波向左走，振幅都是 A。', '把它们重叠起来，就得到红色的合成波。'],
  draw(g, lt, s) {
    const ox = 200, x1 = 1700, A = 80, x0 = 960, a0 = seg(lt, .2, .6), a1 = seg(lt, s.L[3], .7);
    const yR = x => 330 - A * Math.cos(KK * (x - x0) - OMG * lt), yL = x => 330 - A * Math.cos(KK * (x - x0) + OMG * lt);
    line(g, ox - 10, 330, x1 + 10, 330, C.axis, 2, null, a0 * .7);
    curve(g, yR, ox, x1, BLU, 5, a0); curve(g, yL, ox, x1, PUR, 5, a0 * seg(lt, s.L[2], .6) + (lt < s.L[2] ? .0 : 0));
    txt(g, '右へ進む波', 220, 200, { size: 40, jp: true, col: BLU, a: seg(lt, s.L[2] - .2, .5), w: 700 }); arrow(g, 470, 200, 570, 200, BLU, 5, 20, seg(lt, s.L[2] - .2, .5));
    txt(g, '左へ進む波', 1050, 200, { size: 40, jp: true, col: PUR, a: seg(lt, s.L[2] + .3, .5), w: 700 }); arrow(g, 1040, 200, 940, 200, PUR, 5, 20, seg(lt, s.L[2] + .3, .5));
    const aa = seg(lt, s.L[2] + .8, .5); brace(g, 160, 160, 330, C.mute, 0); arrow(g, 160, 330, 160, 330 - A, C.mute, 3, 12, aa); txt(g, 'A', 125, 290, { size: 40, serif: true, col: C.mute, a: aa });
    if (a1 > 0) { arrow(g, 960, 420, 960, 500, C.ink, 7, 28, a1); txt(g, '重ね合わせ', 1100, 460, { size: 44, jp: true, w: 700, a: a1 }); SW(g, { ox, x1, oy: 720, A, x0, t: lt, a: a1, env: false }); txt(g, '合成波', 220, 620, { size: 40, jp: true, col: RED, a: a1, w: 700 }); }
    else if (lt > s.L[3] - 1) {}
  } });
// 2 山 a 山 b 相遇
S.push({ lines: ['看图：蓝色的波向右走，紫色的波向左走。', '山 a 向右、山 b 向左，马上就要在这个点相遇。', '山和山重叠，位移变成 2A：这个点是腹。'],
  draw(g, lt, s) {
    const ox = 200, x1 = 1700, oy = 520, A = 130, x0 = 950, a0 = seg(lt, .2, .6), tt = -1.4 + 1.4 * seg(lt, s.L[1] + .3, 2.6);
    line(g, ox - 10, oy, x1 + 10, oy, C.axis, 2, null, a0 * .7);
    curve(g, x => oy - A * Math.cos(KK * (x - x0) - OMG * tt), ox, x1, BLU, 5, a0); curve(g, x => oy - A * Math.cos(KK * (x - x0) + OMG * tt), ox, x1, PUR, 5, a0);
    const v = LM / TP, ca = seg(lt, s.L[0], .6);
    dot(g, x0 + v * tt, oy - A, 13, BLU, ca, 18); txt(g, 'a', x0 + v * tt, oy - A - 38, { size: 44, serif: true, w: 700, col: BLU, al: 'center', a: ca });
    dot(g, x0 - v * tt, oy - A, 13, PUR, ca, 18); txt(g, 'b', x0 - v * tt, oy - A - 38, { size: 44, serif: true, w: 700, col: PUR, al: 'center', a: ca });
    const pa = seg(lt, s.L[1], .6); line(g, x0, oy - 260, x0, oy + 180, GOLD, 2.5, [8, 8], pa); arrow(g, x0, oy + 260, x0, oy + 190, GOLD, 5, 22, pa);
    txt(g, 'この点は，間もなく山 a と山 b が出合うので，腹となる', x0, oy + 300, { size: 38, jp: true, col: GOLD, al: 'center', a: pa, w: 700 });
    const ra = seg(lt, s.L[2], .6); if (ra > 0) { const yy = oy - 2 * A * Math.cos(OMG * tt) * 1; dot(g, x0, oy - 2 * A, 16, RED, ra, 26); txt(g, '2A', x0 + 60, oy - 2 * A, { size: 52, serif: true, w: 800, col: RED, a: ra, al: 'left' });
      curve(g, x => oy - 2 * A * Math.cos(KK * (x - x0)) * Math.cos(OMG * tt), ox, x1, RED, 6, ra * .9); }
  } });
// 3 合成波 1→5
S.push({ lines: ['时间推移，合成波按 1→2→3→4→5→4→3→2→1 变化。', '平常只画 1 和半周期后的 5，用两侧的曲线表示这是定常波。', '弦的话，因为残像，看起来像一串珠子。', '还有所有位置都是 y = 0 的瞬间，那就是 3。'],
  draw(g, lt, s) {
    const ox = 200, x1 = 1450, oy = 520, A = 90, x0 = 560, a0 = seg(lt, .2, .6), ps = lt * OMG * .5 * 1;
    SW(g, { ox, x1, oy, A, x0, t: lt * .5, a: a0 });
    const cs = [1, .7071, 0, -.7071, -1], names = ['1', '2', '3', '4', '5'];
    cs.forEach((c, i) => { const on = seg(lt, s.L[0] + .2 * i, .5); const cur = Math.cos(OMG * lt * .5); const hi = Math.abs(cur - c) < .17 ? 1 : 0;
      txt(g, names[i], 1560, 330 + i * 70, { size: 48, serif: true, w: 800, col: hi ? RED : C.mute, a: on, al: 'center' }); if (hi) dot(g, 1620, 330 + i * 70, 8, RED, on, 12); });
    txt(g, '（上図の瞬間）', 1700, 330, { size: 30, jp: true, col: C.mute, a: seg(lt, s.L[1], .5), al: 'left' }); txt(g, '（上図の少し後）', 1700, 610, { size: 30, jp: true, col: C.mute, a: seg(lt, s.L[1], .5), al: 'left' });
    const b = seg(lt, s.L[1], .6); curve(g, x => oy - 2 * A * Math.cos(KK * (x - x0)), ox, x1, RED, 3, b * .8, null, 4); curve(g, x => oy + 2 * A * Math.cos(KK * (x - x0)), ox, x1, RED, 3, b * .8, [10, 8], 4);
    txt(g, '1', ox + 60, oy - 2 * A - 28, { size: 36, serif: true, col: RED, a: b }); txt(g, '5', ox + 60, oy + 2 * A + 36, { size: 36, serif: true, col: RED, a: b });
    const c3 = seg(lt, s.L[2], .6); txt(g, '残像でビーズ状に見える', 800, 820, { size: 40, jp: true, col: GOLD, al: 'center', a: c3, w: 700 });
    const d3 = seg(lt, s.L[3], .6); if (d3 > 0) { line(g, ox, oy, x1, oy, GOLD, 8, null, d3 * (.5 + .5 * Math.sin(lt * 5) ** 2)); txt(g, '3：すべての場所が y = 0', 800, 900, { size: 40, jp: true, col: GOLD, al: 'center', a: d3, w: 700 }); }
  } });
// 4 腹と節
S.push({ lines: ['振动最剧烈的点，也就是振幅最大的点，叫「腹」。', '腹是山和山（或谷和谷）相遇的位置，振幅是原来波的 2 倍。', '完全不振动的点，也就是振幅为 0 的点，叫「节」。', '介质的振动幅度，随位置而不同。'],
  draw(g, lt, s) {
    const ox = 200, x1 = 1700, oy = 540, A = 90, x0 = 450, a0 = seg(lt, .2, .6);
    SW(g, { ox, x1, oy, A, x0, t: lt * .6, a: a0 });
    const aa = seg(lt, s.L[0], .6), ba = seg(lt, s.L[2], .6);
    antis(ox, x1, x0).forEach(x => { dot(g, x, oy - 2 * A * Math.cos(OMG * lt * .6), 12, GOLD, aa, 18); tagA(g, x, oy - 2 * A - 40, aa); });
    nodes(ox, x1, x0).forEach(x => { dot(g, x, oy, 11, BLU, ba, 16); tagN(g, x, oy + 2 * A + 50, ba); });
    const ta = seg(lt, s.L[1], .6); if (ta > 0) { const xx = x0 + 3 * LM / 2 * 0 + LM; arrow(g, xx - 80, oy, xx - 80, oy - 2 * A, GOLD, 4, 14, ta); arrow(g, xx - 80, oy, xx - 80, oy + 2 * A, GOLD, 4, 14, ta); pill(g, '2A', xx - 150, oy, GOLD, { size: 44, al: 'center', a: ta }); }
    const ma = seg(lt, s.L[3], .6); if (ma > 0) txt(g, '媒質の振動（振幅は場所により異なる）', W / 2, 860, { size: 42, jp: true, col: C.ink, al: 'center', a: ma, w: 700 });
  } });
// 5 间隔
S.push({ lines: ['腹和节，交替排列。', '腹与腹（节与节）的间隔，都是 λ/2。', '腹和相邻的节，间隔就是 λ/4。'],
  draw(g, lt, s) {
    const ox = 200, x1 = 1700, oy = 520, A = 90, x0 = 450, a0 = seg(lt, .2, .6); SW(g, { ox, x1, oy, A, x0, t: lt * .6, a: a0 });
    const aa = seg(lt, s.L[0], .6); antis(ox, x1, x0).forEach(x => { dot(g, x, oy, 9, GOLD, aa, 14); tagA(g, x, oy - 2 * A - 40, aa); }); nodes(ox, x1, x0).forEach(x => { dot(g, x, oy, 9, BLU, aa, 14); tagN(g, x, oy + 2 * A + 50, aa); });
    const b = seg(lt, s.L[1], .6), an = antis(ox, x1, x0), nd = nodes(ox, x1, x0);
    if (b > 0) { brace(g, an[0], an[1], oy - 2 * A - 120, GOLD, b); fm(g, 'lam2', (an[0] + an[1]) / 2, oy - 2 * A - 190, 56, { al: 'center', a: b }); brace(g, nd[0], nd[1], oy + 2 * A + 130, BLU, b); fm(g, 'lam2', (nd[0] + nd[1]) / 2, oy + 2 * A + 205, 56, { al: 'center', a: b }); }
    const c = seg(lt, s.L[2], .6); if (c > 0) { brace(g, an[1], nd[1], oy + 2 * A + 130 + 0, RED, 0); brace(g, an[1], nd[1] > an[1] ? nd[1] : nd[0], 790, GRN, c); fm(g, 'lam4', (an[1] + nd[1]) / 2, 855, 50, { al: 'center', a: c }); }
  } });
// 6 补充：用式子确认
S.push({ lines: ['补充，用式子确认。设两个波是 y1 = A cos(kx − ωt) 和 y2 = A cos(kx + ωt)。', '相加，用 cos(α−β) + cos(α+β) = 2 cos α cos β，', '得到 y = 2A cos kx · cos ωt。', '振幅 2A|cos kx| 随位置变化：|cos kx| = 1 的地方是腹，cos kx = 0 的地方是节。', '相邻两个腹，kx 相差 π，也就是 x 相差 λ/2。'],
  draw(g, lt, s) {
    txt(g, '補足：式で確かめる', 200, 130, { size: 46, jp: true, w: 800, col: GOLD, a: seg(lt, .2, .6) });
    fm(g, 'sum1', 200, 250, 62, { a: seg(lt, s.L[0] + .3, .5), p: seg(lt, s.L[0] + .3, 1.6) }); fm(g, 'kdef', 1500, 560, 56, { a: seg(lt, s.L[2], .5) });
    const ia = seg(lt, s.L[1], .5); fm(g, 'ident', 200, 400, 60, { a: ia, p: seg(lt, s.L[1] + .2, 1.8) }); if (ia > 0) pill(g, '要暗記', 1560, 400, RED, { jp: true, size: 34, a: seg(lt, s.L[1] + 1.8, .4) });
    fm(g, 'sum2', 200, 560, 70, { a: seg(lt, s.L[2], .5), p: seg(lt, s.L[2] + .2, 1.4) });
    const a3 = seg(lt, s.L[3], .5); fm(g, 'amp', 200, 710, 62, { a: a3 }); fm(g, 'ant', 200, 870, 46, { a: seg(lt, s.L[3] + 1, .5), p: seg(lt, s.L[3] + 1, 1.2) }); fm(g, 'nod', 1000, 870, 46, { a: seg(lt, s.L[3] + 2.4, .5), p: seg(lt, s.L[3] + 2.4, 1.2) });
  } });
// 7 方法卡
S.push({ lines: ['怎么找腹和节的位置？只要两步。', '第 1 步：先找到一个明确的点。特别注意中点和反射点。', '自由端是腹，固定端是节。', '第 2 步：每隔 λ/2，顺藤摸瓜一路推出去。'],
  draw(g, lt, s) {
    box(g, 220, 130, 1480, 780, RED, seg(lt, .1, .6) * .9, true); txt(g, '定常波：腹や節の位置を探す', W / 2, 200, { size: 54, jp: true, w: 800, al: 'center', a: seg(lt, .2, .6) });
    const a1 = seg(lt, s.L[1], .6), a2 = seg(lt, s.L[2], .6), a3 = seg(lt, s.L[3], .6);
    dot(g, 330, 340, 24, 'rgba(11,19,34,.9)', a1); txt(g, '1', 330, 341, { size: 32, w: 800, col: GOLD, al: 'center', serif: true, a: a1 }); txt(g, '明らかな点を 1 箇所見つける。', 380, 340, { size: 46, jp: true, w: 700, col: RED, a: a1 });
    txt(g, '中点や，反射点に要注意', 380, 430, { size: 42, jp: true, col: C.ink, a: a1 });
    txt(g, '自由端は腹', 380, 540, { size: 46, jp: true, col: GOLD, a: a2, w: 800 }); txt(g, '固定端は節', 900, 540, { size: 46, jp: true, col: BLU, a: a2, w: 800 });
    dot(g, 330, 700, 24, 'rgba(11,19,34,.9)', a3); txt(g, '2', 330, 701, { size: 32, w: 800, col: GOLD, al: 'center', serif: true, a: a3 }); fm(g, 'lam2', 380, 700, 66, { a: a3 }); txt(g, 'ごとのイモヅル式で', 510, 700, { size: 46, jp: true, w: 700, col: RED, a: a3 });
  } });
// 8 イモヅル：固定端から
S.push({ lines: ['比如，右端是固定端：那里是节。', '往左每隔 λ/2，又是一个节。', '两个节的正中间，是腹。', '只要定下一个点，所有的位置就都知道了。'],
  draw(g, lt, s) {
    const ox = 160, xw = 1600, oy = 520, A = 90, x0 = xw - LM / 4, a0 = seg(lt, .2, .6);
    SW(g, { ox, x1: xw, oy, A, x0, t: lt * .6, a: a0 }); hatchR(g, xw, oy - 230, oy + 230, a0); txt(g, '壁', xw + 40, oy - 190, { size: 40, jp: true, a: a0 });
    const na = seg(lt, s.L[0], .6); dot(g, xw, oy, 14, BLU, na, 22); tagN(g, xw, oy + 2 * A + 55, na);
    for (let k = 1; k <= 2; k++) { const x = xw - k * LM / 2, p = seg(lt, s.L[1] + (k - 1) * 1.3, .6); if (p > 0) { brace(g, x, x + LM / 2, oy + 2 * A + 150, BLU, p); fm(g, 'lam2', x + LM / 4, oy + 2 * A + 220, 44, { al: 'center', a: p }); dot(g, x, oy, 14, BLU, p, 22); tagN(g, x, oy + 2 * A + 55, p); } }
    const k3 = seg(lt, s.L[2], .6); [xw - LM / 4, xw - 3 * LM / 4, xw - 5 * LM / 4].forEach((x, i) => { const p = seg(lt, s.L[2] + i * .5, .5); dot(g, x, oy - 2 * A * Math.cos(OMG * lt * .6), 12, GOLD, p, 18); tagA(g, x, oy - 2 * A - 40, p); });
    const z = seg(lt, s.L[3], .6); nodes(ox, xw, x0).forEach(x => { dot(g, x, oy, 11, BLU, z * .8, 14); tagN(g, x, oy + 2 * A + 55, z); }); antis(ox, xw, x0).forEach(x => tagA(g, x, oy - 2 * A - 40, z));
  } });
// 9 两个波源
S.push({ lines: ['有两个波源的情形：着眼于中点。', '波源同位相振动：山和山在中点相遇，互相加强，中点是腹。', '波源逆位相：山和谷在中点相遇，互相削弱，中点是节。'],
  draw(g, lt, s) {
    const xs1 = 260, xs2 = 1660, mid = 960, K2 = 2 * Math.PI / 350, A = 60;
    [[1, 300, '同位相', GOLD, 1], [-1, 700, '逆位相', GRN, 2]].forEach(([sg, oy, nm, col, idx]) => {
      const on = idx === 1 ? seg(lt, .3, .6) : seg(lt, s.L[2] - .3, .6); if (on <= 0) return;
      line(g, xs1, oy, xs2, oy, C.axis, 2, null, on * .7);
      const yL = x => A * Math.sin(OMG * lt - K2 * (x - xs1)), yR = x => sg * A * Math.sin(OMG * lt - K2 * (xs2 - x));
      curve(g, x => oy - yL(x), xs1, xs2, BLU, 3, on * .8); curve(g, x => oy - yR(x), xs1, xs2, PUR, 3, on * .8); curve(g, x => oy - yL(x) - yR(x), xs1, xs2, RED, 6, on);
      [[xs1, 'L'], [xs2, 'R']].forEach(([x]) => { dot(g, x, oy, 12, C.ink, on, 14); txt(g, '波源', x, oy + 60, { size: 36, jp: true, col: C.mute, al: 'center', a: on }); });
      line(g, mid, oy - 150, mid, oy + 100, C.mute, 2, [6, 8], on); txt(g, '中点', mid, oy + 130, { size: 38, jp: true, col: C.mute, al: 'center', a: on });
      dot(g, mid, oy - yL(mid) - yR(mid), 13, RED, on, 22);
      const pl = idx === 1 ? seg(lt, s.L[1], .6) : seg(lt, s.L[2], .6); pill(g, nm, 400, oy - 150, col, { jp: true, size: 40, al: 'center', a: on });
      if (pl > 0) { (idx === 1 ? tagA : tagN)(g, mid + 140, oy - 215, pl); txt(g, idx === 1 ? '強め合い' : '弱め合い', mid + 140, oy - 165, { size: 34, jp: true, col: C.mute, al: 'center', a: pl }); }
    });
  } });
// 10 反射产生定常波
S.push({ lines: ['反射的情形：入射波和反射波，是逆向前进的两个波。', '它们重叠，就形成定常波。', '反射，是产生定常波最直接的情形。', '自由端的位置是腹，固定端的位置是节。'],
  draw(g, lt, s) {
    const ox = 200, xw = 1500, A = 80, a0 = seg(lt, .2, .6);
    [[300, '自由端は腹', xw, GOLD], [720, '固定端は節', xw - LM / 4, BLU]].forEach(([oy, nm, x0, col], k) => {
      SW(g, { ox, x1: xw, oy, A, x0, t: lt * .6, a: a0 }); hatchR(g, xw, oy - 220, oy + 220, a0);
      txt(g, '定常波', 250, oy - 190, { size: 40, jp: true, col: C.ink, a: a0, w: 700 });
      const pa = seg(lt, s.L[3] + k * 1.2, .6); dot(g, xw, oy - (k ? 0 : 2 * A * Math.cos(OMG * lt * .6)), 14, col, pa, 22); txt(g, nm, xw - 40, oy + 2 * A + 70, { size: 46, jp: true, col, al: 'right', a: pa, w: 800 });
    });
    const ia = seg(lt, s.L[0], .6); txt(g, '入射波 →　← 反射波', 900, 130, { size: 40, jp: true, col: C.mute, al: 'center', a: ia * .9 });
  } });
// 11 为什么
S.push({ lines: ['自由端为什么是腹？想想入射波的山刚到反射点的时候。', '自由端的反射波也是山，山和山重叠，位移最大。', '固定端：入射波的位移是 y，反射波的位移就是 −y。', '合起来始终是 0，所以是节。'],
  draw(g, lt, s) {
    const tt = lt % 11, xl = 260, xw = 1500, c0 = 170, v = 250, h = 110, w = 70, tA = (xw - c0) / v;
    [[1, 330, '自由端', BLU], [-1, 730, '固定端', RED]].forEach(([sg, oy, nm, col], k) => {
      line(g, xl - 20, oy, xw, oy, C.mute, 1.6, [6, 8]); txt(g, nm, 260, oy - 200, { size: 46, jp: true, w: 800, col });
      if (k === 0) line(g, xw, oy - 260, xw, oy + 130, C.ink, 4); else hatchR(g, xw, oy - 260, oy + 130);
      const c = c0 + v * tt, P = x => h * Math.exp(-Math.pow((x - c) / w, 2)), R = x => h * Math.exp(-Math.pow((2 * xw - x - c) / w, 2));
      curve(g, x => oy - P(x), xl, xw, BLU, 3, .7, [8, 8], 4); curve(g, x => oy - sg * R(x), xl, xw, PUR, 3, .7, [8, 8], 4);
      const ye = oy - P(xw) - sg * R(xw); curve(g, x => oy - P(x) - sg * R(x), xl, xw, '#EAF2FF', 6); dot(g, xw, ye, 14, col, 1, 18);
      const near = Math.abs(tt - tA) < .55; const ra = seg(lt, k === 0 ? s.L[1] : s.L[2], .5) * (near ? 1 : .0);
      if (near) { pill(g, k === 0 ? '山 ＋ 山 ＝ 大きく振れる' : 'y ＋ (−y) ＝ 0', 1020, oy - 200, col, { jp: true, size: 36, al: 'center', a: seg(lt, k === 0 ? s.L[1] : s.L[2], .4) }); }
    });
  } });
// 12 总结
S.push({ lines: ['总结：定常波，是波形相同、逆向前进的两个波重叠的结果。', '腹的振幅是 2A，节的振幅是 0，间隔都是 λ/2。', '找位置：先抓一个明确的点，中点或者反射点。', '同位相的两个波源，中点是腹；自由端是腹，固定端是节。', '然后每隔 λ/2，一路推出去。'],
  draw(g, lt, s) {
    txt(g, '定常波　まとめ', 260, 140, { size: 56, jp: true, w: 800, a: seg(lt, .2, .6) });
    const a1 = seg(lt, s.L[0], .6), a2 = seg(lt, s.L[1], .6), a3 = seg(lt, s.L[2], .6), a4 = seg(lt, s.L[3], .6), a5 = seg(lt, s.L[4], .6);
    txt(g, '波形が同じ 2 つの波が逆向きに進んで重なる', 260, 260, { size: 42, jp: true, a: a1, col: C.ink, w: 700 });
    tagA(g, 330, 380, a2); txt(g, '振幅 2A　強め合い', 400, 380, { size: 42, jp: true, a: a2, col: GOLD, w: 700 }); tagN(g, 1100, 380, a2); txt(g, '振幅 0　弱め合い', 1170, 380, { size: 42, jp: true, a: a2, col: BLU, w: 700 });
    txt(g, '腹と腹（節と節）の間隔は', 260, 470, { size: 42, jp: true, a: a2, w: 700 }); fm(g, 'lam2', 860, 470, 58, { a: a2 });
    txt(g, '見つけ方', 260, 580, { size: 46, jp: true, col: RED, w: 800, a: a3 }); txt(g, '① 中点や反射点', 460, 580, { size: 42, jp: true, a: a3 });
    txt(g, '同位相の波源の中点 → 腹　／　逆位相 → 節', 460, 660, { size: 40, jp: true, a: a4, col: C.ink }); txt(g, '自由端 → 腹　／　固定端 → 節', 460, 730, { size: 40, jp: true, a: a4, col: C.ink });
    txt(g, '②', 460, 820, { size: 42, jp: true, a: a5 }); fm(g, 'lam2', 520, 820, 56, { a: a5 }); txt(g, 'ごとのイモヅル式で', 650, 820, { size: 42, jp: true, a: a5 });
  } });
setup(S);
