// 视频 4：波の反射（自由端反射と固定端反射）。教科书 3 页 → 10 幕，无配乐
const GOLD = C.gold, BLU = C.blue, PUR = C.purple, RED = C.red, GRN = C.green;
const KK = 2 * Math.PI / 500, OMG = 2 * Math.PI * 0.25;

function hatch(g, x, y0, y1, a = 1, label = true) {
  line(g, x, y0, x, y1, C.ink, 5, null, a);
  for (let y = y0; y < y1; y += 26) line(g, x, y + 26, x + 24, y, C.mute, 2.5, null, a * .8);
  if (label) txt(g, '壁', x + 40, y0 + 34, { size: 40, jp: true, a, col: C.ink });
}
function bez(p0, c, p1, u) { const v = 1 - u; return [v * v * p0[0] + 2 * v * u * c[0] + u * u * p1[0], v * v * p0[1] + 2 * v * u * c[1] + u * u * p1[1]]; }
function curveArrow(g, p0, c, p1, col, p, a = 1, lw = 8) {
  if (p <= 0 || a <= 0) return; g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = lw; g.lineCap = 'round';
  g.beginPath(); for (let u = 0; u <= p + 1e-6; u += .02) { const q = bez(p0, c, p1, Math.min(u, p)); u === 0 ? g.moveTo(q[0], q[1]) : g.lineTo(q[0], q[1]); } g.stroke(); g.restore();
  if (p > .85) { const q1 = bez(p0, c, p1, p), q0 = bez(p0, c, p1, p - .04); arrow(g, q0[0], q0[1], q1[0], q1[1], col, lw, 26, a); }
}
function stepTag(g, n, s, x, y, a, col = GOLD) {
  dot(g, x, y, 24, 'rgba(11,19,34,.9)', a); g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = 3; g.beginPath(); g.arc(x, y, 24, 0, 7); g.stroke(); g.restore();
  txt(g, n, x, y + 1, { size: 32, w: 800, col, al: 'center', a, serif: true });
  txt(g, s, x + 42, y, { size: 42, jp: true, w: 700, col: C.ink, a });
}
// 相量圆：θ 角，竖直投影是位移 y = A sin θ
function phasor(g, cx, cy, r, ang, col, a, lab) {
  g.save(); g.globalAlpha *= a; g.strokeStyle = '#2A3E5C'; g.lineWidth = 3; g.beginPath(); g.arc(cx, cy, r, 0, 7); g.stroke(); g.restore();
  line(g, cx - r - 20, cy, cx + r + 20, cy, C.mute, 1.5, [5, 6], a); line(g, cx, cy - r - 20, cx, cy + r + 20, C.mute, 1.5, [5, 6], a);
  const px = cx + r * Math.cos(ang), py = cy - r * Math.sin(ang), bx = cx + r + 80;
  line(g, px, py, bx, py, col, 1.6, [4, 6], a * .8);
  arrow(g, cx, cy, px, py, col, 5, 20, a);
  g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = 3; g.beginPath(); g.arc(cx, cy, 40, 0, -((ang % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI)), true); g.stroke(); g.restore();
  line(g, bx, cy, bx, py, GOLD, 8, null, a); dot(g, bx, py, 10, GOLD, a, 14);
  txt(g, 'θ', cx + 62 * Math.cos(ang / 2), cy - 62 * Math.sin(ang / 2), { size: 34, col, a, serif: true, al: 'center' });
  txt(g, 'y', bx + 26, (cy + py) / 2, { size: 38, col: GOLD, a, serif: true, w: 700 });
  txt(g, lab, cx, cy + r + 56, { size: 36, jp: true, w: 700, col: C.mute, al: 'center', a });
}
// 脉冲在绳上的位移：入射 + s·反射（s=+1 自由端，−1 固定端），p(x)=h·exp(−((x−c)/w)²)
function pulseRope(g, o, tt, col, lw, a = 1) {
  const { xl, xw, oy, h = 110, w = 70, v = 250, c0 = 170, s } = o; const c = c0 + v * tt;
  const P = x => h * Math.exp(-Math.pow((x - c) / w, 2)), R = x => h * Math.exp(-Math.pow((2 * xw - x - c) / w, 2));
  curve(g, x => oy - P(x) - s * R(x), xl, xw, col, lw, a, null, 3); return oy - P(xw) - s * R(xw);
}

// ---- 波的反射构图（第 6、7 幕、第 8 幕共用）----
function RP(g, lt, o) {
  const { ox = 200, xw = 1000, xr = 1500, oy = 520, A = 130, s = 1, t = 0, pInc = 1, pDash = 0, pFlip = 0, pFold = 0, pComp = 0, bare = false } = o;
  const l = 180, phi = -Math.PI / 2 - KK * l;
  const fy = x => A * Math.sin(KK * (x - xw) + phi - OMG * t);
  const Y = x => oy - fy(x), Yr = x => oy - s * fy(2 * xw - x), Yc = x => oy - (fy(x) + s * fy(2 * xw - x));
  line(g, ox - 20, oy, xr + 30, oy, C.axis, 2.5, null, .8);
  hatch(g, xw, oy - (bare ? 2 * A + 40 : 280), oy + (bare ? A + 40 : 280), 1, !bare);
  curve(g, Y, ox, ox + (xw - ox) * pInc, BLU, 5);
  if (pDash > 0) curve(g, Y, xw, xw + (xr - xw) * pDash, '#D5E4F7', 4, 1 - .6 * pFlip, [12, 10]);
  if (pFlip > 0) { const sf = Math.cos(Math.PI * pFlip); curve(g, x => oy - sf * fy(x), xw, xr, GOLD, 4.5, 1, [12, 10]); }
  if (pFold > 0) curve(g, Yr, xw - (xw - ox) * pFold, xw, PUR, 6);
  if (pComp > 0) curve(g, Yc, ox, ox + (xw - ox) * pComp, RED, 7.5, 1, null, 2);
  return { fy, Y, Yr, Yc, l, A, oy, xw };
}
function legend(g, x, y, col, s, a) { line(g, x, y, x + 90, y, col, 6, null, a); txt(g, s, x + 110, y, { size: 38, jp: true, w: 700, a }); }

const S = [];
// 0 片头
S.push({ lines: ['波碰到墙，会发生什么？', '反射有两种：自由端反射，和固定端反射。'], lead: 1.2,
  draw(g, lt) {
    const t = lt * .5; for (const [s, col] of [[1, BLU], [-1, PUR]]) {
      const f = x => 760 - 60 * Math.sin(KK * (x - 1500) - OMG * 2 * t * 1) ;
      curve(g, x => 760 - 60 * Math.sin(KK * (x - 1500) + 1 - OMG * lt) - s * 0, 0, 1500, col, 3, .32); break; }
    curve(g, x => 760 - 60 * Math.sin(KK * (1500 - x) + 1 - OMG * lt), 0, 1500, PUR, 3, .32);
    curve(g, x => 760 - 60 * Math.sin(KK * (x - 1500) + 1 - OMG * lt) - 60 * Math.sin(KK * (1500 - x) + 1 - OMG * lt), 0, 1500, RED, 4, .5);
    hatch(g, 1500, 640, 880, .8, false);
    txt(g, '波の反射', W / 2, 360, { size: 140, jp: true, w: 900, al: 'center', a: seg(lt, 0, .3), glow: 'rgba(94,200,255,.3)' });
    txt(g, '自由端反射  と  固定端反射', W / 2, 520, { size: 56, jp: true, col: GOLD, al: 'center', a: seg(lt, .1, .35), w: 700 });
  } });
// 1 脉冲波
S.push({ lines: ['连续的波一反射，就乱成一团，不好看清。', '所以先拿一个孤立的波来看，叫脉冲波（図 a）。', '再把脉冲的宽度缩到 0，它就成了一个点（図 a′）。', '这样，只看这个点的位移 y，就能抓住反射的本质。'],
  draw(g, lt, s) {
    const oy = 520, loop = (lt * 80) % 420;
    // 図a
    const pa = seg(lt, s.L[0] + .2, .6);
    line(g, 200, oy, 840, oy, C.axis, 3, null, pa); hatch(g, 840, 360, 650, pa);
    const wA = 55 - 50 * seg(lt, s.L[2], 1.4);
    const x0 = 300 + loop;
    curve(g, x => oy - 110 * Math.exp(-Math.pow((x - x0) / 55, 2)), 200, 840, BLU, 5, pa * (1 - .75 * seg(lt, s.L[2] - .2, .4)), null, 3);
    arrow(g, x0 + 50, oy - 150, x0 + 150, oy - 150, C.mute, 4, 18, pa * (1 - seg(lt, s.L[2] - .2, .4)));
    txt(g, '図a', 200, 300, { size: 44, jp: true, a: pa, col: C.mute });
    txt(g, 'パルス波（孤立した波）', 220, 760, { size: 38, jp: true, a: seg(lt, s.L[1], .6), col: GOLD, w: 700 });
    // 図a′
    const pb = seg(lt, s.L[2], .8);
    if (pb > 0) { line(g, 1040, oy, 1680, oy, C.axis, 3, null, pb); hatch(g, 1680, 360, 650, pb);
      const x1 = 1140 + loop, sh = 110;
      line(g, x1, oy, x1, oy - sh, BLU, 6, null, pb); dot(g, x1, oy - sh, 13, BLU, pb, 18);
      arrow(g, x1 + 24, oy - sh, x1 + 124, oy - sh, C.mute, 4, 18, pb);
      txt(g, '変位 y', x1 - 90, oy - sh - 10, { size: 40, jp: true, a: pb, col: C.ink });
      txt(g, '図a′', 1040, 300, { size: 44, jp: true, a: pb, col: C.mute });
      txt(g, '幅を 0 にして理想化', 1060, 760, { size: 38, jp: true, a: seg(lt, s.L[3], .6), col: GOLD, w: 700 }); }
  } });
// 2 自由端 図b
function bounceStage(g, lt, s, sgn) {
  const oy = 440, x0 = 420, xw = 1300, v = 300, T1 = (xw - 6 - x0) / v, t = lt - (s.L[0] + .2), H = 150;
  line(g, 260, oy, xw, oy, C.axis, 3); hatch(g, xw, oy - 190, oy + 190, 1);
  txt(g, sgn > 0 ? '図b　自由端反射' : '図c　固定端反射', 260, 120, { size: 50, jp: true, w: 800, col: sgn > 0 ? BLU : RED });
  let x = x0, dir = 1, hy = H;
  if (t >= 0) { if (t < T1) x = x0 + v * t; else { x = xw - 6; const t2 = t - T1 - .3; if (t2 > 0) { dir = -1; x = Math.max(xw - 6 - v * t2, x0); } else dir = 0;
      if (sgn < 0) hy = H * (1 - 2 * ease((t - T1) / .3)); } }
  if (sgn < 0 && t >= T1 + .3) hy = -H;
  const col = dir >= 0 && t < T1 + .3 ? BLU : (sgn > 0 ? BLU : RED);
  line(g, x, oy, x, oy - hy, col, 6); dot(g, x, oy - hy, 14, col, 1, 20);
  if (dir !== 0) arrow(g, x + dir * 26, oy - hy + (hy > 0 ? -34 : 34), x + dir * 126, oy - hy + (hy > 0 ? -34 : 34), C.mute, 4, 18);
  if (hy > 0) txt(g, '変位 y', x - 10, oy - hy - 76, { size: 40, jp: true, al: 'center', col: C.ink }); else txt(g, '変位 −y', x + 30, oy - hy - 4, { size: 40, jp: true, al: 'left', col: C.ink });
}
S.push({ lines: ['壁是自由端时，点撞到墙，原样弹回来。', '位移还是 y，没有变（図 b）。', '这时我们说：反射时，位相没有错开。', '位相，就是三角函数里面的角度 θ。', 'θ 不变，位移 y = A sin θ 也就不变。'],
  cues: [[s => s.L[2] + .5, 'ding']],
  draw(g, lt, s) {
    bounceStage(g, lt, s, 1);
    const pa = seg(lt, s.L[2], .7); if (pa > 0) pill(g, '位相変化なし', 1000, 120, GRN, { jp: true, al: 'center', size: 44, a: pa });
    const pp = seg(lt, s.L[3], .7), th = 1.0;
    phasor(g, 440, 760, 95, th, BLU, pp, '反射前'); phasor(g, 960, 760, 95, th, BLU, pp, '反射後');
    arrow(g, 640, 760, 760, 760, C.mute, 4, 18, pp);
    const fa = seg(lt, s.L[4], .6);
    txt(g, 'y = A sin θ', 1330, 700, { size: 60, serif: true, w: 700, a: seg(lt, s.L[3] + .5, .6), col: C.ink });
    txt(g, 'θ が変わらなければ', 1330, 790, { size: 40, jp: true, a: fa, col: GOLD, w: 700 });
    txt(g, 'y も変わらない', 1330, 850, { size: 40, jp: true, a: fa, col: GOLD, w: 700 });
  } });
// 3 固定端 図c
S.push({ lines: ['壁是固定端时，点撞到墙，位移变成 −y 弹回来。', '上下颠倒了（図 c）。', '这时，我们说位相变了 π。', '因为 −y = −A sin θ = A sin(θ + π)。', 'θ 多转了半圈 π，正弦值就变号。'],
  cues: [[s => s.L[2] + .5, 'ding']],
  draw(g, lt, s) {
    bounceStage(g, lt, s, -1);
    const pa = seg(lt, s.L[2], .7); if (pa > 0) pill(g, '位相は π 変わる', 1000, 120, RED, { jp: true, al: 'center', size: 44, a: pa });
    const pp = seg(lt, s.L[2], .7), th = 1.0, rot = Math.PI * seg(lt, s.L[3], 1.6);
    phasor(g, 440, 760, 95, th, BLU, pp, '反射前'); phasor(g, 960, 760, 95, th + rot, RED, pp, '反射後');
    arrow(g, 640, 760, 760, 760, C.mute, 4, 18, pp);
    txt(g, '−y = −A sin θ', 1290, 690, { size: 56, serif: true, w: 700, a: seg(lt, s.L[3] + .2, .6), col: C.ink });
    txt(g, '= A sin(θ + π)', 1290, 775, { size: 56, serif: true, w: 700, a: seg(lt, s.L[3] + 1.2, .6), col: RED });
    txt(g, 'π 回転 = 半周', 1290, 850, { size: 38, jp: true, a: seg(lt, s.L[4], .6), col: GOLD, w: 700 });
  } });
// 4 为什么：自由端 / 固定端
S.push({ lines: ['自由端和固定端，区别在哪里？', '看墙那个位置的介质：能自由振动，就是自由端反射。', '不能振动，就是固定端反射。', '固定端被墙按住，位移必须一直是 0。', '入射的 +y 到了墙边，要被反射回来的 −y 抵消。'],
  draw(g, lt, s) {
    const tt = (lt % 11), xl = 260, xw = 1500;
    [[1, 330, '自由端反射', BLU, '壁の位置の媒質が自由に振動できる'], [-1, 730, '固定端反射', RED, '壁の位置の媒質が振動できない']].forEach(([sg, oy, name, col, note], k) => {
      const o = { xl, xw, oy, s: sg };
      line(g, xl - 20, oy, xw, oy, C.mute, 1.6, [6, 8]);
      txt(g, name, 260, oy - 200, { size: 46, jp: true, w: 800, col });
      const on = k === 0 ? seg(lt, s.L[1], .6) : seg(lt, s.L[2], .6);
      txt(g, note, 260, oy - 150, { size: 32, jp: true, col: C.mute, a: on, w: 500 });
      if (on > 0) pill(g, k === 0 ? '自由に振動できる' : '振動できない', 1040, oy - 200, col, { jp: true, al: 'center', size: 36, a: on });
      if (k === 0) { line(g, xw, oy - 260, xw, oy + 130, C.ink, 4); hatch(g, xw, oy - 260, oy + 130, 0, false); for (let y = oy - 260; y < oy + 130; y += 26) line(g, xw, y + 26, xw + 24, y, C.mute, 2.5, null, .7); }
      else hatch(g, xw, oy - 260, oy + 130, 1, false);
      const ga = seg(lt, s.L[4] - .3, .6);
      if (ga > 0) { const c = o.c0 || 170; const P = x => 110 * Math.exp(-Math.pow((x - (c + 250 * tt)) / 70, 2)), R = x => 110 * Math.exp(-Math.pow((2 * xw - x - (c + 250 * tt)) / 70, 2));
        curve(g, x => oy - P(x), xl, xw, BLU, 3, ga * .75, [8, 8], 4); curve(g, x => oy - sg * R(x), xl, xw, PUR, 3, ga * .75, [8, 8], 4); }
      const ye = pulseRope(g, o, tt, '#EAF2FF', 6);
      dot(g, xw, ye, 14, k === 0 ? BLU : RED, 1, 18);
      if (k === 1) { const fa = seg(lt, s.L[3], .6); txt(g, '位移 = 0', xw - 20, oy + 70, { size: 38, jp: true, al: 'right', col: GOLD, w: 700, a: fa }); }
    });
  } });
// 5 三步画法
S.push({ lines: ['连续的波，怎么画出反射波？只要三步。', '第 1 步：先画出没有墙时的入射波。', '第 2 步：自由端不用改；固定端，把它 +− 反转。', '第 3 步：在墙的位置，像镜子一样折返。'],
  draw(g, lt, s) {
    g.save(); g.strokeStyle = RED; g.globalAlpha = seg(lt, .1, .6) * .85; g.lineWidth = 4; g.setLineDash([16, 8]); g.beginPath(); g.roundRect(240, 150, 1440, 760, 24); g.stroke(); g.restore();
    txt(g, '反射波を描く', W / 2, 205, { size: 54, jp: true, w: 800, col: C.ink, al: 'center', a: seg(lt, .2, .6) });
    const a1 = seg(lt, s.L[1], .6), a2 = seg(lt, s.L[2], .6), a3 = seg(lt, s.L[3], .6);
    stepTag(g, '1', '壁がなかった場合の入射波を描く。', 360, 330, a1);
    line(g, 960, 375, 960, 430, C.mute, 3, null, a2); line(g, 640, 430, 1280, 430, C.mute, 3, null, a2);
    arrow(g, 640, 430, 640, 480, C.mute, 3, 14, a2); arrow(g, 1280, 430, 1280, 480, C.mute, 3, 14, a2);
    stepTag(g, '2', '自由端', 450, 530, a2); stepTag(g, '2', '固定端', 1090, 530, a2);
    txt(g, 'はなし', 640, 600, { size: 42, jp: true, a: a2, col: GRN, al: 'center', w: 700 });
    txt(g, '1 の波を +− 反転する。', 1280, 620, { size: 42, jp: true, a: seg(lt, s.L[2] + 1.2, .6), col: RED, al: 'center', w: 700 });
    line(g, 640, 650, 640, 700, C.mute, 3, null, a3); line(g, 1280, 660, 1280, 700, C.mute, 3, null, a3); line(g, 640, 700, 1280, 700, C.mute, 3, null, a3);
    arrow(g, 960, 700, 960, 750, C.mute, 3, 14, a3);
    stepTag(g, '3', '壁の所で鏡のように折り返す。', 450, 800, a3);
  } });
// 6 自由端 描く
const SL = (s, i, d = 0) => s.L[i] + d;
S.push({ lines: ['来实际画一遍。先看自由端反射。', '第 1 步：假设没有墙，入射波继续往右走（虚线）。', '第 2 步：自由端，什么都不用做。', '第 3 步：以墙为对称轴折返，得到反射波。', '本来要多走 l 的谷 a，折返后停在墙左边 l 处的 a′。', '入射波和反射波叠加，就得到红色的合成波。', ['让波动起来，看合成波怎么走。', 2.6]],
  cues: [[s => s.L[5] + .5, 'ding']],
  draw(g, lt, s) {
    const tp = Math.max(0, lt - (s.L[6] + .2)), env = { s: 1, pInc: seg(lt, s.L[0] + .3, 1.6), pDash: seg(lt, s.L[1] + .2, 1.4), pFold: seg(lt, s.L[3] + 1, 2), pComp: seg(lt, s.L[5] + .2, 2.2), t: tp };
    const R = RP(g, lt, env), { l, A, oy, xw } = R, xa = xw + l, xb = xw - l;
    txt(g, '自由端反射', 200, 160, { size: 48, jp: true, w: 800, col: BLU });
    legend(g, 200, 230, BLU, '入射波', seg(lt, s.L[0] + .6, .5)); legend(g, 200, 290, PUR, '反射波', seg(lt, s.L[3] + 1.4, .5)); legend(g, 200, 350, RED, '合成波', seg(lt, s.L[5] + .6, .5));
    stepTag(g, '1', '壁がないとして', 1530, 330, seg(lt, s.L[1] + .4, .5)); stepTag(g, '2', 'はなし', 1530, 500, seg(lt, s.L[2], .5)); stepTag(g, '3', '折り返す', 1530, 670, seg(lt, s.L[3], .5));
    const ma = tp > 0 ? 0 : 1;
    const aA = seg(lt, s.L[3], .5) * ma, aB = seg(lt, s.L[3] + 1.5, .5) * ma;
    dot(g, xa, oy + A, 11, GOLD, aA, 14); txt(g, 'a', xa, oy + A + 36, { size: 38, serif: true, col: GOLD, al: 'center', a: aA, w: 700 });
    dot(g, xb, oy + A, 11, GOLD, aB, 14); txt(g, 'a′', xb, oy + A + 38, { size: 38, serif: true, col: GOLD, al: 'center', a: aB, w: 700 });
    curveArrow(g, [xa - 16, oy + A + 22], [xw, oy + A + 150], [xb + 16, oy + A + 22], '#8FA2BC', seg(lt, s.L[3] + .2, 1.2), ma * seg(lt, s.L[3], .3), 9);
    const la = seg(lt, s.L[4], .6) * ma;
    arrow(g, xw - 6, 810, xb, 810, C.axis, 3, 14, la); arrow(g, xw + 6, 810, xa, 810, C.axis, 3, 14, la); line(g, xw, 790, xw, 830, C.axis, 3, null, la);
    txt(g, 'l', (xw + xb) / 2, 780, { size: 40, serif: true, al: 'center', a: la, col: C.ink }); txt(g, 'l', (xw + xa) / 2, 780, { size: 40, serif: true, al: 'center', a: la, col: C.ink });
  } });
// 7 固定端 描く
S.push({ lines: ['再看固定端反射。', '第 1 步和刚才一样：画出没有墙时的入射波（虚线）。', '第 2 步：把它 +− 反转，谷 a 就变成峰 a′。', '第 3 步：以墙为对称轴折返，a′ 折回到 a″。', '入射波和反射波叠加，就得到合成波。', '注意：墙的位置，合成波的位移始终是 0。', ['再让波动起来看看。', 2.2]],
  cues: [[s => s.L[2] + 1.4, 'ding'], [s => s.L[5] + .3, 'ding']],
  draw(g, lt, s) {
    const tp = Math.max(0, lt - (s.L[6] + .2)), env = { s: -1, pInc: seg(lt, s.L[0] + .3, 1.2), pDash: seg(lt, s.L[1] + .2, 1.4), pFlip: seg(lt, s.L[2] + .3, 1.4), pFold: seg(lt, s.L[3] + 1, 2), pComp: seg(lt, s.L[4] + .2, 2.2), t: tp };
    const R = RP(g, lt, env), { l, A, oy, xw } = R, xa = xw + l, xb = xw - l;
    txt(g, '固定端反射', 200, 160, { size: 48, jp: true, w: 800, col: RED });
    legend(g, 200, 230, BLU, '入射波', seg(lt, s.L[0] + .6, .5)); legend(g, 200, 290, PUR, '反射波', seg(lt, s.L[3] + 1.4, .5)); legend(g, 200, 350, RED, '合成波', seg(lt, s.L[4] + .6, .5));
    stepTag(g, '1', '壁がないとして', 1530, 700, seg(lt, s.L[1] + .4, .5)); stepTag(g, '2', '+− 反転', 1530, 800, seg(lt, s.L[2], .5), GOLD); stepTag(g, '3', '折り返す', 1530, 270, seg(lt, s.L[3], .5));
    const ma = tp > 0 ? 0 : 1, fl = seg(lt, s.L[2] + 1.4, .4) * ma;
    const aA = seg(lt, s.L[2], .5) * ma, aB = seg(lt, s.L[2] + 1.6, .5) * ma, aC = seg(lt, s.L[3] + 3, .5) * ma;
    dot(g, xa, oy + A, 11, GOLD, aA, 14); txt(g, 'a', xa, oy + A + 36, { size: 38, serif: true, col: GOLD, al: 'center', a: aA, w: 700 });
    dot(g, xa, oy - A, 11, GOLD, aB, 14); txt(g, 'a′', xa + 6, oy - A - 36, { size: 38, serif: true, col: GOLD, al: 'center', a: aB, w: 700 });
    dot(g, xb, oy - A, 11, GOLD, aC, 14); txt(g, 'a″', xb, oy - A - 36, { size: 38, serif: true, col: GOLD, al: 'center', a: aC, w: 700 });
    curveArrow(g, [xa + 40, oy + A - 10], [xa + 150, oy], [xa + 40, oy - A + 10], '#8FA2BC', seg(lt, s.L[2] + .3, 1.1), ma * seg(lt, s.L[2], .3), 9);
    curveArrow(g, [xa - 16, oy - A - 10], [xw, oy - A - 160], [xb + 16, oy - A - 10], '#8FA2BC', seg(lt, s.L[3] + .2, 1.2), ma * seg(lt, s.L[3], .3), 9);
    const la = seg(lt, s.L[3] + 3.2, .6) * ma;
    arrow(g, xw - 6, 810, xb, 810, C.axis, 3, 14, la); arrow(g, xw + 6, 810, xa, 810, C.axis, 3, 14, la); line(g, xw, 790, xw, 830, C.axis, 3, null, la);
    txt(g, 'l', (xw + xb) / 2, 780, { size: 40, serif: true, al: 'center', a: la }); txt(g, 'l', (xw + xa) / 2, 780, { size: 40, serif: true, al: 'center', a: la });
    const za = seg(lt, s.L[5], .6); if (za > 0) { dot(g, xw, oy - (R.fy(xw) - R.fy(xw)), 13, GOLD, za, 22); txt(g, '位移 0', xw + 30, oy - 24, { size: 36, jp: true, col: GOLD, w: 700, a: za }); }
  } });
// 8 重ね合わせ
S.push({ lines: ['入射波和反射波，在同一根绳上重叠，成了合成波。', '绳上每一点的位移，等于两个波位移的和。', '这就是「重ね合わせの原理」（叠加原理）。', '上面是自由端，下面是固定端，规则完全相同。', '合成波，才是真正实现出来的波。'],
  draw(g, lt, s) {
    const t = lt * 1.0;
    [[1, 300, '自由端', BLU], [-1, 700, '固定端', RED]].forEach(([sg, oy, name, col]) => {
      const R = RP(g, lt, { s: sg, oy, A: 90, pInc: 1, pDash: 0, pFold: 1, pComp: 1, t, bare: true, xr: 1000 });
      txt(g, name, 1060, oy - 120, { size: 44, jp: true, w: 800, col });
      const ma = seg(lt, s.L[1], .6);
      [560, 800].forEach(xm => { const y1 = R.fy(xm), y2 = sg * R.fy(2 * 1000 - xm);
        line(g, xm - 4, oy, xm - 4, oy - y1, BLU, 9, null, ma); line(g, xm + 4, oy - y1, xm + 4, oy - y1 - y2, PUR, 9, null, ma); dot(g, xm, oy - y1 - y2, 11, GOLD, ma, 18); });
    });
    const la = seg(lt, s.L[0], .5);
    legend(g, 1060, 330, BLU, '入射波', la); legend(g, 1060, 390, PUR, '反射波', la); legend(g, 1060, 450, RED, '合成波', la);
    txt(g, '重ね合わせの原理', 1060, 690, { size: 46, jp: true, w: 800, col: GOLD, a: seg(lt, s.L[2], .6) });
    txt(g, '合成波 ＝ 入射波 ＋ 反射波', 1060, 755, { size: 38, jp: true, col: C.ink, a: seg(lt, s.L[2] + .6, .6) });
    txt(g, '（各点の変位の和）', 1060, 805, { size: 34, jp: true, col: C.mute, a: seg(lt, s.L[2] + 1, .6) });
  } });
// 9 总结
S.push({ lines: ['总结：自由端反射，位移不变，位相不变。', '固定端反射，位移 +− 逆转，位相变 π。', '画图时：自由端直接折返；固定端先反转，再折返。', '壁处的介质能自由振动，是自由端；不能振动，是固定端。'],
  draw(g, lt, s) {
    const cx = [1000, 1530], rows = [['変位', 'そのまま y', '+− 逆転　−y'], ['位相', '変化なし', 'π 変わる'], ['描き方', '2：はなし', '2：+− 反転'], ['壁の位置の媒質', '自由に振動できる', '振動できない']];
    txt(g, '波の反射　まとめ', 260, 150, { size: 54, jp: true, w: 800, a: seg(lt, .2, .6) });
    pill(g, '自由端反射', cx[0], 260, BLU, { jp: true, al: 'center', size: 42, a: seg(lt, s.L[0] - .3, .5) }); pill(g, '固定端反射', cx[1], 260, RED, { jp: true, al: 'center', size: 42, a: seg(lt, s.L[1] - .3, .5) });
    rows.forEach(([n, a, b], i) => { const y = 380 + i * 135, ra = i < 2 ? seg(lt, s.L[0], .5) : seg(lt, s.L[2] + (i - 2) * 2.2, .5), rb = i < 2 ? seg(lt, s.L[1], .5) : ra;
      line(g, 230, y + 62, 1790, y + 62, C.grid, 2, null, Math.max(ra, rb)); txt(g, n, 260, y, { size: 40, jp: true, col: C.mute, a: Math.max(ra, rb), w: 700 });
      txt(g, a, cx[0], y, { size: 44, jp: true, col: BLU, al: 'center', a: ra, w: 700 }); txt(g, b, cx[1], y, { size: 44, jp: true, col: RED, al: 'center', a: rb, w: 700 }); });
  } });
setup(S);
