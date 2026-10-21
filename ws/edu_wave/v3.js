// 视频 3：垂直抗力と摩擦力（2つは元々1つの力）
// 颜色约定：抗力 = 红，垂直抗力 N = 蓝，静止/動摩擦力 F = 金，外力/手の力 = 白，重力 = 紫
const BASE = 760, R = 46, SP = 110, BX = 960, BW = 560, BH = 280;
const CTR = [-4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7].map(k => BX + k * SP).concat([BX - 5 * SP, BX - 6 * SP, BX - 7 * SP, BX - 8 * SP, BX - 9 * SP]);
const UNDER = x => Math.abs(x - BX) < BW / 2 - 20;
const RUB = { fill: '#24324A', edge: '#7F95B5', hot: '#FF8FA8' };
const TW1 = 40, TW2 = 66, SQ = .32, NLEN = 230, FK = .55 / TW1;   // F = NLEN * FK * tw

// 一颗橡胶小球：底部固定在 base，压扁 sq（0..1），顶部向右错开 tw
function blob(g, cx, sq, tw, hot) {
  g.beginPath();
  for (let k = 0; k <= 64; k++) {
    const th = k / 64 * Math.PI * 2, px = R * Math.cos(th), py = R * Math.sin(th), f = (py + R) / (2 * R);
    const X = cx + px * (1 + sq * .55) + tw * f, Y = BASE - (py + R) * (1 - sq);
    k ? g.lineTo(X, Y) : g.moveTo(X, Y);
  }
  g.closePath(); g.fillStyle = RUB.fill; g.fill();
  g.lineWidth = 3; g.strokeStyle = hot > 0 ? mix(RUB.edge, RUB.hot, hot) : RUB.edge; g.stroke();
}
function mix(a, b, t) { const p = s => [1, 3, 5].map(i => parseInt(s.slice(i, i + 2), 16)), A = p(a), B = p(b);
  return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, '0')).join(''); }
// 放大视图：地面 + 小球 + 物体。st: {sq, tw, drop(0..1 物体落下), hot}
function micro(g, st) {
  const { sq = 0, tw = 0, drop = 1, hot = 0, blockA = 1 } = st;
  g.fillStyle = '#16233A'; g.fillRect(-200, BASE, W + 400, 200);
  g.save(); g.strokeStyle = 'rgba(127,149,181,.18)'; g.lineWidth = 2;
  for (let x = -200; x < W + 200; x += 36) { g.beginPath(); g.moveTo(x, BASE + 200); g.lineTo(x + 60, BASE + 12); g.stroke(); } g.restore();
  line(g, -200, BASE, W + 200, BASE, RUB.edge, 2);
  const s = sq * drop;
  CTR.forEach(x => UNDER(x) ? blob(g, x, s, tw, hot) : blob(g, x, 0, 0, 0));
  const bot = BASE - 2 * R * (1 - s) - (1 - drop) * 220;
  if (blockA > 0) { g.save(); g.globalAlpha = blockA; g.fillStyle = 'rgba(255,85,119,.10)'; g.strokeStyle = '#E9D5DD'; g.lineWidth = 3;
    g.beginPath(); g.rect(BX - BW / 2 + tw, bot - BH, BW, BH); g.fill(); g.stroke(); g.restore(); }
  return { bot, ox: BX + tw, top: bot - BH };
}
// 每颗压住的小球给物体的力（从球顶出发）
function ballForces(g, st, bot, a) {
  if (a <= 0) return;
  CTR.filter(UNDER).forEach(x => { const x0 = x + st.tw, up = 78 * (st.sq / SQ), lf = -78 * .55 * st.tw / TW1;
    arrow(g, x0, bot - 4, x0 + lf, bot - 4 - up, C.red, 4, 14, a); });
}
function label(g, s, x, y, tx, ty, col, a, o = {}) {   // 带引线的日文标注
  if (a <= 0) return;
  txt(g, s, x, y, { size: o.size || 34, jp: true, w: 700, col, al: o.al || 'left', a });
  if (tx != null) { line(g, o.lx ?? x, y + (o.ly ?? 26), tx, ty, col, 2, null, a * .9); dot(g, tx, ty, 5, col, a); }
}
// 宏观的木块与地面
function floor(g, y, x0 = 200, x1 = 1720) {
  line(g, x0, y, x1, y, C.axis, 3);
  g.save(); g.strokeStyle = 'rgba(169,188,211,.35)'; g.lineWidth = 2; for (let x = x0; x < x1; x += 30) { g.beginPath(); g.moveTo(x, y + 2); g.lineTo(x - 22, y + 26); g.stroke(); } g.restore();
}
function mblock(g, x, y, w, h, o = {}) {   // x 为中心、y 为底边
  g.save(); g.globalAlpha *= (o.a ?? 1); g.fillStyle = o.ghost ? 'rgba(238,243,250,.04)' : 'rgba(255,85,119,.12)';
  g.strokeStyle = o.ghost ? C.mute : '#E9D5DD'; g.lineWidth = 3; if (o.ghost) g.setLineDash([10, 9]);
  g.beginPath(); g.rect(x - w / 2, y - h, w, h); g.fill(); g.stroke(); g.restore();
}
function flab(g, s, x, y, col, a, o = {}) { txt(g, s, x, y, { size: o.size || 40, w: 700, col, a, al: o.al || 'center', jp: o.jp, serif: o.serif }); }

function zoom(g, fn) { g.save(); g.translate(960, 790); g.scale(1.24, 1.24); g.translate(-960, -790); fn(); g.restore(); }
const S = [];
// 0 片头
S.push({ lines: ['桌上的物体，为什么会受到向上的力？', '推它推不动时，摩擦力又是从哪里来的？'], lead: 1.2,
  draw(g, lt) {
    g.save(); g.translate(0, -30); g.globalAlpha = .45; micro(g, { sq: 0, tw: 0, blockA: 0 }); g.restore();
    g.fillStyle = 'rgba(11,19,34,.55)'; g.fillRect(0, 0, W, H);
    txt(g, '垂直抗力と摩擦力', W / 2, 380, { size: 120, jp: true, w: 900, al: 'center', a: seg(lt, .2, .8), glow: 'rgba(255,85,119,.35)' });
    txt(g, '2つは元々1つの力', W / 2, 525, { size: 52, jp: true, w: 700, col: C.gold, al: 'center', a: seg(lt, .6, .8) });
  } });
// 1 放大接触面
S.push({ lines: ['把物体和桌面接触的地方放大来看。', ['看起来很平的表面，其实有许多「目には見えない小さな凸凹」。', .6], '这里把这些小凸起想成一颗颗橡胶球。'],
  draw(g, lt, s) {
    const fy = 640, bx = 480;
    floor(g, fy, 120, 860); mblock(g, bx, fy, 260, 170);
    const ma = seg(lt, .4, .8), cx = 1320, cy = 460, cr = 330;
    if (ma > 0) {
      g.save(); g.globalAlpha = ma; g.strokeStyle = C.axis; g.lineWidth = 3;
      g.beginPath(); g.arc(bx + 60, fy, 46, 0, Math.PI * 2); g.stroke();
      line(g, bx + 60 + 30, fy - 35, cx - cr * .62, cy - cr * .78, C.axis, 2, [8, 8]); line(g, bx + 60 + 30, fy + 35, cx - cr * .62, cy + cr * .78, C.axis, 2, [8, 8]);
      g.beginPath(); g.arc(cx, cy, cr, 0, Math.PI * 2); g.fillStyle = C.bg; g.fill(); g.clip();
      g.translate(cx, cy); g.scale(.85, .85); g.translate(-BX, -(BASE - 70));
      micro(g, { sq: 0, tw: 0, drop: 1, blockA: 1 }); g.restore();
      g.save(); g.globalAlpha = ma; g.strokeStyle = C.ink; g.lineWidth = 5; g.beginPath(); g.arc(cx, cy, cr, 0, Math.PI * 2); g.stroke(); g.restore();
    }
    label(g, '目には見えない小さな凸凹', 1060, 880, cx + 250, cy + 70, C.gold, seg(lt, s.L[1], .6), { lx: 1300, ly: -26 });
    pill(g, 'ゴムボールのイメージ', 480, 820, C.mute, { jp: true, al: 'center', size: 32, a: seg(lt, s.L[2], .6) });
  } });
// 2 垂直抗力
S.push({ lines: ['物体受到重力，压在小凸起上，把它们压扁了。', ['被压扁的橡胶球想恢复原形，就向上推物体。', .3], '图上写着：「つぶされたゴムボールのように力を出す」。', ['这些向上的力合起来，就是「垂直抗力 N」。', .6], '书上「重力の矢印はカット」：重力省略不画，只看接触面的力。'],
  draw(g, lt, s) { zoom(g, () => {
    const drop = seg(lt, .3, 1.4), sq = SQ, st = { sq, tw: 0 };
    const hot = seg(lt, s.L[1], .6);
    const { bot, ox, top } = micro(g, { sq, tw: 0, drop, hot });
    const gA = seg(lt, .5, .6) * (1 - seg(lt, s.L[4] + 1.2, .6));
    const mid = (bot + top) / 2;
    if (gA > 0) { arrow(g, ox + 160, top + 40, ox + 160, bot - 20, C.purple, 6, 22, gA); flab(g, '重力', ox + 220, mid, C.purple, gA, { jp: true, al: 'left' }); }
    const fa = seg(lt, s.L[1], .7) * (1 - seg(lt, s.L[3] + .6, .6));
    ballForces(g, { sq, tw: 0 }, bot, fa);
    label(g, 'つぶされたゴムボールのように', 1180, 330, BX + 2 * SP, bot + 20, C.red, seg(lt, s.L[2], .6), { lx: 1210 });
    label(g, '力を出す', 1180, 378, null, null, C.red, seg(lt, s.L[2], .6));
    const na = seg(lt, s.L[3], .8);
    if (na > 0) { arrow(g, ox, bot - 8, ox, bot - 8 - NLEN * ease(na), C.blue, 8, 26, 1); flab(g, 'N', ox + 34, bot - NLEN + 30, C.blue, na, { serif: true, al: 'left', size: 52 });
      txt(g, '垂直抗力', ox, top - 46, { size: 46, jp: true, w: 900, col: C.blue, al: 'center', a: na }); }
    const ca = seg(lt, s.L[4], .6);
    if (ca > 0) { pill(g, '重力の矢印はカット', 480, 330, C.purple, { jp: true, al: 'center', size: 34, a: ca });
      if (gA > 0) { const t = seg(lt, s.L[4] + .4, .6); line(g, ox + 120, mid - 40 * t, ox + 200, mid + 40 * t, C.ink, 4, null, ca * gA); line(g, ox + 120, mid + 40 * t, ox + 200, mid - 40 * t, C.ink, 4, null, ca * gA); } }
    });
  } });
// 3 拉而不动 → ねじれ → 抗力
S.push({ lines: ['现在用手向右拉物体，但它没有动。', ['小凸起不但被压扁，还被扯得向右歪。', .3], '这就是图上的「ねじれたゴムボールのように」。', ['歪掉的橡胶球想恢复原形，推物体的力就斜向左上方。', .4], ['这些力合起来，是一个斜向左上的力：「抗力」。', .6]],
  draw(g, lt, s) { zoom(g, () => {
    const tw = TW1 * seg(lt, s.L[0] + .3, 2.2), st = { sq: SQ, tw };
    const { bot, ox, top } = micro(g, { sq: SQ, tw, hot: 1 });
    const mid = (bot + top) / 2, br = BX + BW / 2 + tw, hand = NLEN * FK * tw;
    arrow(g, br, mid, br + 40 + hand, mid, C.ink, 7, 24, seg(lt, s.L[0], .4));
    flab(g, '手の力', br + 60 + hand / 2, mid - 46, C.ink, seg(lt, s.L[0], .4), { jp: true });
    if (lt > s.L[1]) { const a = seg(lt, s.L[1], .5) * (1 - seg(lt, s.L[3], .5));
      CTR.filter(UNDER).forEach(x => { line(g, x, BASE, x + tw, bot, C.gold, 2.5, [6, 6], a); }); }
    label(g, 'ねじれたゴムボールのように', 1180, 880, BX + 2 * SP + tw * .5, BASE - 40, C.red, seg(lt, s.L[2], .6), { ly: -26, lx: 1300 });
    const fa = seg(lt, s.L[3], .7) * (1 - seg(lt, s.L[4] + .6, .6));
    ballForces(g, st, bot, fa);
    const ra = seg(lt, s.L[4], .9);
    if (ra > 0) { const fx = -NLEN * FK * tw * ease(ra), fy = -NLEN * ease(ra);
      arrow(g, ox, bot - 8, ox + fx, bot - 8 + fy, C.red, 9, 28, 1);
      txt(g, '抗力', ox - 260, top - 40, { size: 50, jp: true, w: 900, col: C.red, al: 'center', a: ra }); }
    });
  } });
// 4 分解：N と F
S.push({ lines: ['把抗力分解成竖直和水平两个方向。', ['竖直方向的分力，就是「垂直抗力 N」。', .3], ['水平方向的分力，就是「静止摩擦力 F」。', .3], ['所以书上说「2つは元々1つの力」。', .2], '这两个力，本来是同一个「抗力」的两个分力。'],
  cues: [[s => s.L[3] + .2, 'ding']],
  draw(g, lt, s) { zoom(g, () => {
    const tw = TW1, { bot, ox, top } = micro(g, { sq: SQ, tw, hot: 1 });
    const mid = (bot + top) / 2, br = BX + BW / 2 + tw, F = NLEN * FK * tw, oy = bot - 8;
    arrow(g, br, mid, br + 40 + F, mid, C.ink, 7, 24); flab(g, '手の力', br + 60 + F / 2, mid - 46, C.ink, 1, { jp: true });
    const da = seg(lt, s.L[0], .6);
    line(g, ox - F, oy, ox - F, oy - NLEN, C.mute, 2.5, [8, 8], da); line(g, ox - F, oy - NLEN, ox, oy - NLEN, C.mute, 2.5, [8, 8], da);
    const ra = 1 - .55 * seg(lt, s.L[1], .5) * (1 - seg(lt, s.L[3], .6));
    arrow(g, ox, oy, ox - F, oy - NLEN, C.red, 9, 28, ra);
    txt(g, '抗力', ox - F - 20, top - 38, { size: 46, jp: true, w: 900, col: C.red, al: 'center', a: ra });
    const na = seg(lt, s.L[1], .8), fa = seg(lt, s.L[2], .8);
    if (na > 0) { arrow(g, ox, oy, ox, oy - NLEN * ease(na), C.blue, 8, 26); txt(g, '垂直抗力 N', ox + 24, oy - NLEN + 30, { size: 42, jp: true, w: 900, col: C.blue, a: na }); }
    if (fa > 0) { arrow(g, ox, oy - 4, ox - F * ease(fa), oy - 4, C.gold, 8, 24); txt(g, '静止摩擦力 F', ox - F - 20, bot + 150, { size: 42, jp: true, w: 900, col: C.gold, al: 'center', a: fa });
      line(g, ox - F / 2, oy + 10, ox - F - 10, bot + 118, C.gold, 2, null, fa * .8); }
    const pa = seg(lt, s.L[3], .6);
    if (pa > 0) { pill(g, '2つは元々1つの力', 480, 300, C.red, { jp: true, al: 'center', size: 44, a: pa });
      txt(g, 'N ＋ F ＝ 抗力（ベクトル和）', 480, 380, { size: 34, jp: true, w: 700, col: C.ink, al: 'center', a: seg(lt, s.L[4], .6) }); }
    });
  } });
// 5 手の力を増す
S.push({ lines: ['手拉得更用力，凸起就歪得更厉害。', ['抗力变得更斜，水平分力 F 也跟着变大。', .4], 'F 一直和手的力一样大（在一定限度内），所以物体还是不动。', ['摩擦真正的原因很复杂，这只是一个帮助理解的图像。', .4]],
  draw(g, lt, s) { zoom(g, () => {
    const tw = TW1 + (TW2 - TW1) * seg(lt, s.L[0] + .2, 2.0), { bot, ox, top } = micro(g, { sq: SQ, tw, hot: 1 });
    const mid = (bot + top) / 2, br = BX + BW / 2 + tw, F = NLEN * FK * tw, oy = bot - 8;
    arrow(g, br, mid, br + 40 + F, mid, C.ink, 7, 24); flab(g, '手の力', br + 60 + F / 2, mid - 46, C.ink, 1, { jp: true });
    line(g, ox - F, oy, ox - F, oy - NLEN, C.mute, 2.5, [8, 8]); line(g, ox - F, oy - NLEN, ox, oy - NLEN, C.mute, 2.5, [8, 8]);
    arrow(g, ox, oy, ox - F, oy - NLEN, C.red, 9, 28, .5);
    arrow(g, ox, oy, ox, oy - NLEN, C.blue, 8, 26); txt(g, 'N', ox + 24, oy - NLEN + 30, { size: 46, serif: true, w: 700, col: C.blue });
    arrow(g, ox, oy - 4, ox - F, oy - 4, C.gold, 8, 24); txt(g, 'F', ox - F / 2, oy - 34, { size: 46, serif: true, w: 700, col: C.gold, al: 'center' });
    const ea = seg(lt, s.L[2], .6);
    if (ea > 0) { txt(g, '|F| ＝ |手の力|', 480, 320, { size: 44, jp: true, w: 900, col: C.gold, al: 'center', a: ea });
      line(g, ox - F, oy + 40, ox, oy + 40, C.gold, 4, null, ea); line(g, br + 40, mid + 40, br + 40 + F, mid + 40, C.ink, 4, null, ea); }
    pill(g, '摩擦の原因は実際にはとても複雑 ― 今はこのイメージで', W / 2, 250, C.mute, { jp: true, al: 'center', size: 32, a: seg(lt, s.L[3], .6) });
    });
  } });
// 6 摩擦力の向き：動摩擦力と、外力が1つのとき
S.push({ lines: ['那摩擦力朝哪个方向？先看「動摩擦力」。', ['物体在滑动时，動摩擦力和滑动的方向相反。', .6], ['静止摩擦力：如果只有一个外力，就和这个外力的方向相反。', .8]],
  draw(g, lt, s) {
    txt(g, '摩擦力の向き', 160, 120, { size: 56, jp: true, w: 900, col: C.gold });
    const y1 = 440, y2 = 820;
    floor(g, y1, 160, 1760); floor(g, y2, 160, 1760);
    const ka = seg(lt, s.L[0] + .3, .5), t = Math.max(0, lt - s.L[0] - .3), x = 360 + ((t * 160) % 1100);
    mblock(g, x, y1, 220, 150, { a: ka });
    for (let k = 0; k < 3; k++) line(g, x - 140 - k * 30, y1 - 40 - k * 35, x - 200 - k * 30, y1 - 40 - k * 35, C.mute, 3, null, ka * .7);
    arrow(g, x - 60, y1 - 190, x + 80, y1 - 190, C.ink, 5, 18, ka); txt(g, '滑る向き', x + 100, y1 - 190, { size: 32, jp: true, col: C.ink, a: ka });
    const fa = seg(lt, s.L[1], .6);
    arrow(g, x, y1 - 6, x - 150, y1 - 6, C.gold, 8, 24, fa); txt(g, '動摩擦力', x - 75, y1 + 50, { size: 36, jp: true, w: 900, col: C.gold, al: 'center', a: fa });
    const sa = seg(lt, s.L[2], .6), xb = 960;
    if (sa > 0) { mblock(g, xb, y2, 220, 150, { a: sa }); arrow(g, xb + 110, y2 - 75, xb + 300, y2 - 75, C.ink, 7, 24, sa); txt(g, '外力', xb + 205, y2 - 120, { size: 36, jp: true, w: 700, al: 'center', a: sa });
      const f2 = seg(lt, s.L[2] + .6, .6); arrow(g, xb, y2 - 6, xb - 190, y2 - 6, C.gold, 8, 24, f2); txt(g, '静止摩擦力', xb - 95, y2 + 50, { size: 36, jp: true, w: 900, col: C.gold, al: 'center', a: f2 });
      txt(g, '外力が1つ → その逆向き', 1300, y2 - 220, { size: 38, jp: true, w: 700, col: C.gold, a: f2 }); }
  } });
// 7 外力が複数：もしも摩擦がなかったら？
S.push({ lines: ['可如果有好几个外力，就不能「速断」，不能一眼下结论。', ['这时问自己：「もしも摩擦がなかったらどちらへ動くのか？」', .6], ['没有摩擦的话，物体会向右动。', .8], ['静止摩擦力就朝它的反方向：向左，大小 5 − 3 ＝ 2 N。', .6]],
  cues: [[s => s.L[3] + .3, 'ding']],
  draw(g, lt, s) {
    const fy = 700, xb = 960; floor(g, fy, 260, 1660);
    const ga = seg(lt, s.L[1] + .4, .5) * (1 - seg(lt, s.L[3], .5)), gt = (Math.max(0, lt - s.L[1] - .4) % 2.6) / 2.6;
    if (ga > 0) { mblock(g, xb + 260 * ease(gt), fy, 240, 160, { ghost: true, a: ga * (1 - gt * .6) });
      pill(g, 'もしも摩擦がなかったら？', xb, 230, C.mute, { jp: true, al: 'center', size: 38, a: ga }); }
    mblock(g, xb, fy, 240, 160);
    arrow(g, xb + 120, fy - 80, xb + 120 + 250, fy - 80, C.ink, 7, 24); txt(g, '5 N', xb + 245, fy - 125, { size: 40, w: 700, al: 'center' });
    arrow(g, xb - 120, fy - 80, xb - 120 - 150, fy - 80, C.ink, 7, 24); txt(g, '3 N', xb - 195, fy - 125, { size: 40, w: 700, al: 'center' });
    const ra = seg(lt, s.L[2], .6) * (1 - seg(lt, s.L[3], .5));
    if (ra > 0) { arrow(g, xb - 100, 330, xb + 140, 330, C.green, 7, 24, ra); txt(g, '右へ動くはず', xb + 170, 330, { size: 38, jp: true, w: 700, col: C.green, a: ra }); }
    const fa = seg(lt, s.L[3], .7);
    if (fa > 0) { arrow(g, xb, fy - 6, xb - 100, fy - 6, C.gold, 9, 26, fa); txt(g, '静止摩擦力 2 N', xb - 50, fy + 60, { size: 40, jp: true, w: 900, col: C.gold, al: 'center', a: fa });
      txt(g, '「速断は禁物」', 330, 300, { size: 40, jp: true, w: 900, col: C.red, a: seg(lt, s.L[0], .6) }); }
    else txt(g, '「速断は禁物」', 330, 300, { size: 40, jp: true, w: 900, col: C.red, a: seg(lt, s.L[0], .6) });
  } });
// 8 斜面
const TH = Math.atan2(520, 1180);
S.push({ lines: ['斜面上的物体也用同样的方法。', ['如果斜面没有摩擦，物体会沿着斜面往下滑。', .8], ['所以静止摩擦力沿斜面向上。', .8]],
  draw(g, lt, s) {
    const x0 = 300, y0 = 860, x1 = 1480, yTop = y0 - 520;
    g.save(); g.fillStyle = '#16233A'; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y0); g.lineTo(x0, yTop); g.closePath(); g.fill(); g.restore();
    line(g, x0, yTop, x1, y0, C.axis, 3); line(g, x0, y0, x1, y0, C.axis, 3); line(g, x0, y0, x0, yTop, C.axis, 3);
    const u = .42, cx = x0 + (x1 - x0) * u, cy = yTop + (y0 - yTop) * u;   // 接触点
    const put = (d, o) => { g.save(); g.translate(cx + d * Math.cos(TH), cy + d * Math.sin(TH)); g.rotate(TH); mblock(g, 0, 0, 220, 140, o); g.restore(); };
    const ga = seg(lt, s.L[1], .5) * (1 - seg(lt, s.L[2], .5)), gt = (Math.max(0, lt - s.L[1]) % 2.6) / 2.6;
    if (ga > 0) { put(300 * ease(gt), { ghost: true, a: ga * (1 - gt * .6) }); pill(g, 'もしも摩擦がなかったら？', 1200, 260, C.mute, { jp: true, al: 'center', size: 38, a: ga }); }
    put(0, {});
    const mx = cx + 70 * Math.sin(TH), my = cy - 70 * Math.cos(TH);
    arrow(g, mx, my, mx, my + 200, C.purple, 6, 22, seg(lt, .3, .6)); txt(g, '重力', mx + 20, my + 190, { size: 36, jp: true, w: 700, col: C.purple, a: seg(lt, .3, .6) });
    const da = seg(lt, s.L[1] + .3, .6);
    arrow(g, cx + 140 * Math.cos(TH) + 60 * Math.sin(TH), cy + 140 * Math.sin(TH) - 60 * Math.cos(TH) + 160, cx + 340 * Math.cos(TH) + 60 * Math.sin(TH), cy + 340 * Math.sin(TH) - 60 * Math.cos(TH) + 160, C.green, 6, 22, da * (1 - seg(lt, s.L[2], .5)));
    txt(g, '滑り落ちるはず', cx + 250, cy + 300, { size: 34, jp: true, w: 700, col: C.green, al: 'center', a: da * (1 - seg(lt, s.L[2], .5)) });
    const fa = seg(lt, s.L[2], .7);
    if (fa > 0) { arrow(g, cx - 4 * Math.sin(TH), cy + 4 * Math.cos(TH) - 8, cx - 190 * Math.cos(TH), cy - 190 * Math.sin(TH) - 8, C.gold, 9, 26, fa);
      txt(g, '静止摩擦力', cx - 260, cy - 150, { size: 42, jp: true, w: 900, col: C.gold, al: 'center', a: fa }); }
  } });
// 9 まとめ
S.push({ lines: ['总结一下。', '垂直抗力和静止摩擦力，本来是同一个「抗力」的两个分力。', '動摩擦力：和滑动的方向相反。', '静止摩擦力：和「没有摩擦时会动的方向」相反。', ['两种摩擦力，方向都是「動きを妨げる向き」：阻碍运动的方向。', 1.4]], tail: 1.6,
  draw(g, lt, s) {
    txt(g, 'まとめ', W / 2, 120, { size: 64, jp: true, w: 900, al: 'center', col: C.gold, a: seg(lt, .1, .6) });
    const rows = [['抗力', '垂直抗力 N ＋ 静止摩擦力 F（元々1つの力）', C.red], ['動摩擦力', '滑っている向きと逆向き', C.gold], ['静止摩擦力', '摩擦がなかったら動く向きと逆向き', C.gold], ['まとめると', '「動きを妨げる向き」', C.green]];
    rows.forEach(([h, b, col], j) => { const a = seg(lt, s.L[j + 1], .6), y = 260 + j * 165;
      g.save(); g.globalAlpha = a * .9; g.fillStyle = C.bg2; g.strokeStyle = col; g.lineWidth = 2; g.beginPath(); g.roundRect(240, y - 62, 1440, 124, 18); g.fill(); g.stroke(); g.restore();
      txt(g, h, 290, y, { size: 44, jp: true, w: 900, col, a }); txt(g, b, 640, y, { size: 42, jp: true, w: j === 3 ? 900 : 500, a, col: j === 3 ? C.green : C.ink }); });
  } });
setup(S);
