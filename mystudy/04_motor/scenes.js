// 3 槽 2 极直流电动机（科普 + 制作，配乐卡点）
// 物理模型（motor_model.py 已验证）：三角形接法，换向器 3 片（铜片中心 = φ + 30° + 120°j，缝隙 8°），
// 电刷 + 在右（0°）、− 在左（180°），磁铁 N 在左、S 在右；在这种接法下，任何角度的力矩都朝顺时针 → 转子顺时针转。
window.GRID = { b0: 0.391, beat: 0.53194, bar: 4 * 0.53194 };
window.NO_FADE_IN = true;
const S = [];
const NC = '#FF5577', SC = '#5EC8FF', CU = '#C7772E', STEEL = '#A9B4C6';
const rad = d => d * Math.PI / 180;
// ---------- 模型 ----------
const COFF = 30, GAP = 8;
function segAt(ang, phi) { for (let j = 0; j < 3; j++) { const d = ((ang - (phi + COFF + 120 * j)) % 360 + 540) % 360 - 180; if (Math.abs(d) < 60 - GAP / 2) return j; } return -1; }
function coilI(phi) {                                    // 线圈 k 中从铜片 k 流向 k+1 的电流（相对值）
  const a = segAt(0, phi), b = segAt(180, phi); if (a < 0 || b < 0 || a === b) return [0, 0, 0];
  const V = [0, 0, 0]; V[a] = 1; V[b] = 0; V[3 - a - b] = .5;
  return [0, 1, 2].map(k => V[k] - V[(k + 1) % 3]);
}
// ---------- 画图 ----------
const P2 = (cx, cy, r, a) => [cx + r * Math.cos(rad(a)), cy - r * Math.sin(rad(a))];
function hexa(g, x, y, r, fill, stroke, a = 1, rot = 0) {
  g.save(); g.globalAlpha *= a; g.beginPath(); for (let k = 0; k < 6; k++) { const t = rot + k * Math.PI / 3; k ? g.lineTo(x + r * Math.cos(t), y + r * Math.sin(t)) : g.moveTo(x + r * Math.cos(t), y + r * Math.sin(t)); }
  g.closePath(); if (fill) { g.fillStyle = fill; g.fill(); } if (stroke) { g.strokeStyle = stroke; g.lineWidth = 2.5; g.stroke(); } g.restore();
}
// 转子（俯视）。o.I = 三个线圈电流；o.poles 显示外端 N/S；o.arms = 显示几条臂（1 = 单线圈演示）；o.wind = 绕线进度 0–1
function rotor(g, cx, cy, sc, phi, o = {}) {
  const a = o.a ?? 1; if (a <= 0) return; const I = o.I || [0, 0, 0], arms = o.arms ?? 3, wind = o.wind ?? 1;
  for (let k = 0; k < arms; k++) {
    const ang = phi + 90 + (arms === 2 ? 180 : 120) * k;
    g.save(); g.globalAlpha *= a; g.translate(cx, cy); g.rotate(-rad(ang)); g.scale(sc, sc);
    g.fillStyle = '#7F8A9E'; g.fillRect(60, -16, 160, 32);
    const live = Math.abs(I[k]) > .01 && o.glow;
    if (wind > 0) { const x1 = 86 + 112 * wind; g.fillStyle = live ? '#E08A3A' : CU; if (live) { g.shadowColor = I[k] > 0 ? NC : SC; g.shadowBlur = 26; } g.fillRect(86, -34, x1 - 86, 68); g.shadowBlur = 0;
      g.strokeStyle = 'rgba(60,30,10,.7)'; g.lineWidth = 2.4; for (let x = 92; x < x1; x += 10) { g.beginPath(); g.moveTo(x, -34); g.lineTo(x + 4, 34); g.stroke(); } }
    g.restore();
    const [ex, ey] = P2(cx, cy, 236 * sc, ang); hexa(g, ex, ey, 30 * sc, STEEL, '#56627A', a, -rad(ang));
    if (o.poles && Math.abs(I[k]) > .01) { const [lx, ly] = P2(cx, cy, 300 * sc, ang), N = I[k] > 0;
      txt(g, N ? 'N' : 'S', lx, ly, { size: 54 * Math.max(.7, sc), w: 900, col: N ? NC : SC, al: 'center', a: a * (o.poles === true ? 1 : o.poles), glow: N ? 'rgba(255,85,119,.6)' : 'rgba(94,200,255,.6)' }); }
  }
  hexa(g, cx, cy, 74 * sc, STEEL, '#56627A', a, rad(-phi));
  dot(g, cx, cy, 52 * sc, '#2A3446', a);
  if (o.comm !== false) for (let j = 0; j < 3; j++) {                   // 换向器 3 片
    const c = phi + COFF + 120 * j, hl = o.hl && (segAt(0, phi) === j ? '#FFC857' : segAt(180, phi) === j ? '#8FB7FF' : null);
    g.save(); g.globalAlpha *= a; g.strokeStyle = hl || '#D88A45'; g.lineWidth = 12 * sc; if (hl) { g.shadowColor = hl; g.shadowBlur = 18; }
    g.beginPath(); g.arc(cx, cy, 40 * sc, -rad(c + 60 - GAP / 2), -rad(c - 60 + GAP / 2)); g.stroke(); g.restore();
  }
  dot(g, cx, cy, 16 * sc, '#D8C08A', a);
}
function brushes(g, cx, cy, sc, a = 1, lab = true) {
  if (a <= 0) return; const r = 47 * sc;
  [[1, '+', '#FFC857'], [-1, '−', '#8FB7FF']].forEach(([s, t, col]) => {
    g.save(); g.globalAlpha *= a; g.strokeStyle = '#D9C27A'; g.lineWidth = 9 * sc; g.lineCap = 'round';
    g.beginPath(); g.moveTo(cx + s * r, cy - 8 * sc); g.lineTo(cx + s * r, cy + 300 * sc); g.lineTo(cx + s * (r + 190 * sc), cy + 330 * sc); g.stroke(); g.restore();
    if (lab) txt(g, t, cx + s * (r + 230 * sc), cy + 330 * sc, { size: 64 * sc + 10, w: 900, col, al: 'center', a });
  });
}
function magnets(g, cx, cy, d, h, a = 1) {
  if (a <= 0) return;
  rrect(g, cx - d - 90, cy - h / 2, 90, h, 18, 'rgba(255,85,119,.28)', NC, 3, a); txt(g, 'N', cx - d - 45, cy, { size: 60, w: 900, col: NC, al: 'center', a });
  rrect(g, cx + d, cy - h / 2, 90, h, 18, 'rgba(94,200,255,.25)', SC, 3, a); txt(g, 'S', cx + d + 45, cy, { size: 60, w: 900, col: SC, al: 'center', a });
}
function cwArrow(g, cx, cy, r, a, col = C.gold) {          // 顺时针转向箭头
  if (a <= 0) return; g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = 6; g.lineCap = 'round';
  g.beginPath(); g.arc(cx, cy, r, rad(-100), rad(-20)); g.stroke();
  const ex = cx + r * Math.cos(rad(-20)), ey = cy + r * Math.sin(rad(-20)); g.fillStyle = col; g.beginPath();
  g.moveTo(ex + 14, ey + 22); g.lineTo(ex - 16, ey + 8); g.lineTo(ex + 10, ey - 12); g.closePath(); g.fill(); g.restore();
}
function wireDot(g, x, y, r, out, a = 1, col = C.ink) {   // ⊙ / ⊗
  if (a <= 0) return; g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = 3; g.beginPath(); g.arc(x, y, r, 0, 7); g.stroke();
  if (out) { g.fillStyle = col; g.beginPath(); g.arc(x, y, r * .25, 0, 7); g.fill(); }
  else { g.beginPath(); g.moveTo(x - r * .6, y - r * .6); g.lineTo(x + r * .6, y + r * .6); g.moveTo(x + r * .6, y - r * .6); g.lineTo(x - r * .6, y + r * .6); g.stroke(); } g.restore();
}
function ring(g, x, y, r, ccw, a, col = C.gold, t = 0) {   // 带箭头的磁力线圆
  if (a <= 0) return; g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = 3; g.setLineDash([10, 8]); g.lineDashOffset = (ccw ? 1 : -1) * t * 40;
  g.beginPath(); g.arc(x, y, r, 0, 7); g.stroke(); g.setLineDash([]);
  [0, 180].forEach(d => { const an = rad(d), px = x + r * Math.cos(an), py = y + r * Math.sin(an), dir = (ccw ? -1 : 1) * (d === 0 ? 1 : -1);
    g.fillStyle = col; g.beginPath(); g.moveTo(px, py + dir * 14); g.lineTo(px - 10, py - dir * 6); g.lineTo(px + 10, py - dir * 6); g.closePath(); g.fill(); });
  g.restore();
}
const SPIN = 70;   // 演示转速：度/秒（顺时针 → φ 减小）

// ---------- 0 钩子 ----------
S.push({ lead: 1.6,
  lines: ['几颗螺母、一根竹签、一卷铜线，', '再加两块磁铁和一节电池，', ['它就能一直转下去。', .4], '可是电池的电只往一个方向流，', ['它为什么能一直转，而不是转半圈就停？', .8]],
  cues: [[s => s.L[2] + .1, 'ding']],
  draw(g, lt, s) {
    const L = s.L, ba = seg(lt, 1.2, .5), cx = 960, cy = 470;
    const phi = 30 - (lt > L[2] ? (lt - L[2]) * SPIN * 3 : 0);
    magnets(g, cx, cy, 380, 420, ba * seg(lt, L[1], .4));
    brushes(g, cx, cy, .9, ba * seg(lt, L[1], .4));
    rotor(g, cx, cy, .9, phi, { a: ba, I: lt > L[2] ? coilI(phi) : [0, 0, 0], glow: true });
    txt(g, '？', 1560, 300, { size: 140, w: 900, col: C.gold, al: 'center', a: seg(lt, L[4], .5), glow: 'rgba(255,200,87,.5)' });
    const ta = 1 - seg(lt, .9, .4);
    if (ta > 0) { g.save(); g.globalAlpha = ta * .75; g.fillStyle = '#0A1120'; g.fillRect(0, 0, W, H); g.restore();
      txt(g, '自己做一台电动机', W / 2, 420, { size: 140, w: 900, serif: true, al: 'center', a: ta, glow: 'rgba(255,200,87,.45)' });
      txt(g, '3 槽 2 极 · 原理与制作', W / 2, 590, { size: 56, w: 700, col: C.gold, al: 'center', a: ta }); }
  } });

// ---------- 1 右手螺旋定则 ----------
S.push({ sec: '① 通电导线的磁场', secEn: 'RIGHT-HAND SCREW RULE',
  lines: ['先看一根通电导线。', '电流周围会产生磁场，磁力线是一圈一圈的圆。', '方向用右手螺旋定则：', ['拇指指向电流，四指弯曲的方向就是磁场方向。', .4], ['从正面看：电流朝里（⊗），磁场顺时针；', .3], ['电流朝外（⊙），磁场逆时针。', .6]],
  draw(g, lt, s) {
    const L = s.L, x = 420, wa = seg(lt, .1, .5);
    rrect(g, x - 22, 180, 44, 620, 20, 'rgba(216,138,69,.85)', '#F2B27A', 2, wa);
    arrow(g, x + 70, 300, x + 70, 680, C.gold, 6, 22, wa); tex(g, 'l_I', x + 96, 500, { size: .9, col: 'gold', a: wa });
    [360, 500, 640].forEach((y, j) => { const a = seg(lt, L[1] + j * .3, .4); g.save(); g.globalAlpha = a; g.strokeStyle = C.blue; g.lineWidth = 3; g.setLineDash([10, 8]); g.lineDashOffset = -lt * 30;
      g.beginPath(); g.ellipse(x, y, 160, 40, 0, 0, 7); g.stroke(); g.restore(); });
    tex(g, 'rh1', 760, 330, { size: .85, rev: lin(lt, L[3], 1.0) }); tex(g, 'rh2', 760, 420, { size: .85, rev: lin(lt, L[3] + .9, 1.0) });
    const c1 = seg(lt, L[4], .4), c2 = seg(lt, L[5], .4);
    wireDot(g, 980, 680, 26, false, c1); ring(g, 980, 680, 90, false, c1, C.blue, lt); txt(g, '电流朝里：顺时针', 980, 830, { size: 34, w: 700, al: 'center', a: c1 });
    wireDot(g, 1460, 680, 26, true, c2); ring(g, 1460, 680, 90, true, c2, C.blue, lt); txt(g, '电流朝外：逆时针', 1460, 830, { size: 34, w: 700, al: 'center', a: c2 });
  } });

// ---------- 2 线圈 = 电磁铁 ----------
S.push({ sec: '② 线圈变成磁铁', secEn: 'A COIL IS A MAGNET',
  lines: ['把导线绕成线圈，再从中间切开看。', '上面一排电流朝外，下面一排电流朝里。', '把每根导线周围的小圆圈叠在一起：', ['线圈里面，磁场方向一致，变强了；', .3], ['磁力线从一端出来，绕回另一端——线圈变成了磁铁。', .4], ['出来的一端是 N 极。电流反过来，N 和 S 就交换。', .6], ['值得直接记住：四指沿电流绕，拇指指向 N 极。', .8]],
  cues: [[s => s.L[6] + .2, 'ding']],
  draw(g, lt, s) {
    const L = s.L, x0 = 560, x1 = 1360, yt = 380, yb = 620, n = 8, a1 = seg(lt, L[1], .5);
    rrect(g, x0 - 40, yt + 30, x1 - x0 + 80, yb - yt - 60, 20, 'rgba(120,130,150,.25)', null, 0, seg(lt, .1, .5));
    for (let k = 0; k < n; k++) { const x = x0 + k * (x1 - x0) / (n - 1);
      wireDot(g, x, yt, 22, true, a1, C.gold); wireDot(g, x, yb, 22, false, a1, C.gold);
      const ra = seg(lt, L[2] + k * .08, .3) * (1 - seg(lt, L[3] + .4, .5));
      ring(g, x, yt, 52, true, ra * .7, C.blue, lt); ring(g, x, yb, 52, false, ra * .7, C.blue, lt); }
    const fa = seg(lt, L[3], .6);
    g.save(); g.globalAlpha = fa; g.strokeStyle = C.blue; g.lineWidth = 4; g.setLineDash([14, 10]); g.lineDashOffset = -lt * 50;
    for (const [dy, ry] of [[0, 0], [1, 1], [-1, 1]]) {
      g.beginPath(); g.moveTo(x0 - 120, 500 + dy * 40); g.lineTo(x1 + 120, 500 + dy * 40); g.stroke(); }
    const a4 = seg(lt, L[4], .6) * (1 - .8 * seg(lt, L[6], .5)); g.globalAlpha = a4;                     // 闭合磁力线：里面向右，从右端出来，绕外面回到左端
    [120, 190].forEach(R => [-1, 1].forEach(s2 => { g.beginPath(); g.ellipse(W / 2, 500 + s2 * (40 + R), (x1 - x0) / 2 + 220, R, 0, 0, 7); g.stroke(); }));
    g.restore();
    arrow(g, x1 + 60, 500, x1 + 200, 500, C.blue, 5, 20, fa);
    const pa = seg(lt, L[5], .5);
    txt(g, 'N', x1 + 260, 500, { size: 90, w: 900, col: NC, al: 'center', a: pa, glow: 'rgba(255,85,119,.6)' });
    txt(g, 'S', x0 - 260, 500, { size: 90, w: 900, col: SC, al: 'center', a: pa, glow: 'rgba(94,200,255,.6)' });
    memo(g, 560, 862, 800, 90, seg(lt, L[6], .5), '值得直接记住'); tex(g, 'coilrule', 960, 908, { size: .72, al: 'center', a: seg(lt, L[6], .5) });
  } });

// ---------- 3 单个电磁铁在磁铁之间 ----------
S.push({ sec: '③ 只会转半圈', secEn: 'ONE COIL STOPS',
  lines: ['把这样的电磁铁放在两块磁铁之间。', '同极相斥，异极相吸，', ['它会转，直到 N 对着 S，然后就停下了。', .6], '要让它继续转，必须在快对齐的时候，', ['把电流反过来，让它的 N 和 S 互换。', .6], ['负责“换方向”的零件，叫换向器。', .8]],
  draw(g, lt, s) {
    const L = s.L, cx = 960, cy = 500, ma = seg(lt, .1, .5);
    magnets(g, cx, cy, 420, 440, ma);
    const p = ease(lin(lt, L[1] + .3, 2.4)), ang = 90 - 90 * p;              // 线圈 N 端从朝上转到朝右（对着 S）
    const flip = lt > L[4] + .2;
    g.save(); g.translate(cx, cy); g.rotate(-rad(ang + (flip ? 30 * ease(lin(lt, L[4] + .4, 1)) : 0)));
    g.fillStyle = '#7F8A9E'; g.fillRect(-230, -16, 460, 32); g.fillStyle = CU; g.fillRect(-170, -40, 340, 80);
    g.strokeStyle = 'rgba(60,30,10,.7)'; g.lineWidth = 2.4; for (let x = -164; x < 170; x += 11) { g.beginPath(); g.moveTo(x, -40); g.lineTo(x + 4, 40); g.stroke(); }
    g.restore();
    const a2 = ang + (flip ? 30 * ease(lin(lt, L[4] + .4, 1)) : 0);
    const [nx, ny] = P2(cx, cy, 290, a2), [sx, sy] = P2(cx, cy, 290, a2 + 180);
    txt(g, flip ? 'S' : 'N', nx, ny, { size: 66, w: 900, col: flip ? SC : NC, al: 'center', a: ma });
    txt(g, flip ? 'N' : 'S', sx, sy, { size: 66, w: 900, col: flip ? NC : SC, al: 'center', a: ma });
    txt(g, '停住了', cx, 860, { size: 50, w: 900, col: NC, al: 'center', a: seg(lt, L[2] + 1.2, .4) * (1 - seg(lt, L[3], .4)) });
    pill(g, '换向器：在恰当的时候把电流反过来', cx, 860, C.gold, { al: 'center', a: seg(lt, L[5], .5), size: 38 });
  } });

// ---------- 4 换向器 ----------
S.push({ sec: '④ 换向器', secEn: 'COMMUTATOR',
  lines: ['换向器是装在转轴上的三片铜片，彼此不接触。', '两根电刷固定不动，一根接正极，一根接负极。', '转子一转，电刷碰到的铜片就换了，', ['流过每个线圈的电流方向也跟着换。', .8]],
  draw(g, lt, s) {
    const L = s.L, cx = 760, cy = 420, phi = 30 - Math.max(0, lt - L[2]) * SPIN;
    rotor(g, cx, cy, 1.25, phi, { I: coilI(phi), glow: lt > L[3], poles: lt > L[3] ? seg(lt, L[3], .4) : 0, hl: lt > L[1] });
    brushes(g, cx, cy, 1.25, seg(lt, L[1], .4));
    const I = coilI(phi);
    ['线圈 1', '线圈 2', '线圈 3'].forEach((t, k) => { const v = I[k], a = seg(lt, L[3], .4), y = 300 + k * 110;
      txt(g, t, 1450, y, { size: 36, w: 700, al: 'right', a });
      txt(g, v > .01 ? '外端 N' : v < -.01 ? '外端 S' : '无电流', 1490, y, { size: 36, w: 900, col: v > .01 ? NC : v < -.01 ? SC : C.mute, a });
    });
    txt(g, '铜片之间留缝', 1450, 700, { size: 34, w: 700, col: C.gold, al: 'center', a: seg(lt, L[0] + .6, .4) * (1 - seg(lt, L[2], .4)) });
  } });

// ---------- 5 为什么是 3 个线圈 ----------
S.push({ sec: '⑤ 为什么要三个线圈', secEn: 'NO DEAD SPOT',
  lines: ['为什么要三个线圈？', '如果只有两个，转到某些角度，左右受力正好抵消，', ['停在那里，一通电也不会动——这叫“死点”。', .4], ['三个线圈互成 120°，无论停在哪个角度，', .2], ['总有线圈受力，一通电就能转起来。', .8]],
  draw(g, lt, s) {
    const L = s.L, a1 = seg(lt, L[1], .4), a2 = seg(lt, L[3], .4);
    // 左：两槽转子停在死点（轴对着磁铁）
    magnets(g, 480, 520, 300, 360, a1);
    g.save(); g.globalAlpha = a1; g.translate(480, 520); g.fillStyle = '#7F8A9E'; g.fillRect(-200, -14, 400, 28); g.fillStyle = CU; g.fillRect(-160, -34, 120, 68); g.fillRect(40, -34, 120, 68); g.restore();
    txt(g, 'S', 480 - 250, 520, { size: 50, w: 900, col: SC, al: 'center', a: a1 }); txt(g, 'N', 480 + 250, 520, { size: 50, w: 900, col: NC, al: 'center', a: a1 });
    txt(g, '两个线圈：死点 ✕', 480, 820, { size: 40, w: 900, col: NC, al: 'center', a: seg(lt, L[2], .4) });
    // 右：三槽转子，任意角度都有力矩
    const phi = 30 - Math.max(0, lt - L[4]) * SPIN;
    magnets(g, 1440, 520, 300, 360, a2);
    rotor(g, 1440, 520, .75, phi, { a: a2, I: coilI(phi), glow: true, poles: true });
    cwArrow(g, 1440, 520, 250, seg(lt, L[4], .4));
    txt(g, '三个线圈：任何角度都能启动 ✓', 1440, 820, { size: 40, w: 900, col: C.green, al: 'center', a: seg(lt, L[4], .4) });
  } });

// ---------- 6 讲义问题：三个线圈的极性和转向 ----------
S.push({ sec: '⑥ 判断极性和转向', secEn: 'POLES & DIRECTION',
  lines: ['现在照着讲义的问题，判断三个线圈的极性和转子的转向。', '第一步：从正极电刷出发，沿铜片找出电流流过哪些线圈。', '第二步：用右手螺旋，判断每个线圈朝外的一端是 N 还是 S。',
    ['第三步：同极相斥、异极相吸——左边是 N 极，右边是 S 极。', .3], ['把所有的推和拉加起来：在这种接法下，转子顺时针转。', .6], ['转过一点，换向器换了铜片，极性重新分配，', .3], ['但受力方向始终不变，所以它能一直转下去。', 1.0]],
  cues: [[s => s.L[4] + .4, 'ding']],
  draw(g, lt, s) {
    const L = s.L, cx = 900, cy = 480, sc = .95;
    const phi = lt < L[5] ? 0 : -(lt - L[5]) * SPIN;
    const I = coilI(phi);
    magnets(g, cx, cy, 440, 460, 1);
    rotor(g, cx, cy, sc, phi, { I, glow: lt > L[1], poles: lt > L[2] ? seg(lt, L[2], .5) : 0, hl: lt > L[1] && lt < L[5] });
    brushes(g, cx, cy, sc, 1);
    if (lt > L[3] && lt < L[5]) [0, 1, 2].forEach(k => {           // 每个线圈外端的受力（切向，顺时针）
      if (Math.abs(I[k]) < .01) return; const ang = phi + 90 + 120 * k, [x, y] = P2(cx, cy, 236 * sc, ang), t = rad(ang - 90);
      arrow(g, x, y, x + 90 * Math.cos(t), y - 90 * Math.sin(t), C.gold, 5, 18, seg(lt, L[3] + .3 + k * .2, .4)); });
    cwArrow(g, cx, cy, 380, seg(lt, L[4], .5));
    const steps = ['① 找电流路径', '② 右手螺旋定极性', '③ 推拉 → 转向'];
    steps.forEach((t, j) => { const a = seg(lt, L[1 + j], .4), hot = lt >= L[1 + j] && lt < (L[2 + j] ?? 1e9);
      pill(g, t, 1560, 300 + j * 110, hot ? C.gold : C.blue, { al: 'center', a, size: 36 }); });
    txt(g, '顺时针', 1560, 680, { size: 64, w: 900, col: C.gold, al: 'center', a: seg(lt, L[4], .5) });
    txt(g, '（按本片的接法；接线方式改变，转向也可能反过来）', 1560, 750, { size: 26, col: C.mute, al: 'center', a: seg(lt, L[4], .5) });
  } });

// ---------- 7 制作①：转子与转轴 ----------
S.push({ sec: '⑦ 制作：转子', secEn: 'BUILD THE ROTOR',
  lines: ['接下来动手做。先做转子。', '两个大螺母叠起来做中心，三根螺栓拧上小螺母，做成三个铁心。', ['用瞬间胶薄薄地粘好——千万别粘到手上。', .4], '在每个铁心上绕铜线，做成三个线圈，绕的方向要一致。',
    '转轴用一根直径 6 毫米、长 11 厘米的竹签，', ['缠上胶带调到和螺母孔一样粗，拧进去固定。', .6]],
  draw(g, lt, s) {
    const L = s.L, cx = 620, cy = 470;
    const asm = seg(lt, L[1] + .3, 1.2), wind = lin(lt, L[3], 2.2);
    if (asm < 1) { const a = seg(lt, L[1], .4) * (1 - asm);                      // 零件
      hexa(g, cx, cy - 40, 74, STEEL, '#56627A', a); hexa(g, cx, cy + 40, 74, STEEL, '#56627A', a);
      [[cx - 300, cy + 220], [cx + 300, cy + 220], [cx, cy - 280]].forEach(([x, y]) => { rrect(g, x - 70, y - 14, 140, 28, 6, '#7F8A9E', null, 0, a); hexa(g, x + 90, y, 28, STEEL, '#56627A', a); }); }
    rotor(g, cx, cy, .85, 0, { a: asm, wind, comm: false });
    rrect(g, 1110, 330, 600, 120, 18, 'rgba(255,85,119,.1)', NC, 3, seg(lt, L[2], .4) * (1 - seg(lt, L[3], .4)));
    txt(g, '⚠ 瞬间胶别粘到手上', 1410, 390, { size: 40, w: 900, col: NC, al: 'center', a: seg(lt, L[2], .4) * (1 - seg(lt, L[3], .4)) });
    txt(g, '三个线圈，绕向一致', 1410, 390, { size: 40, w: 900, col: CU, al: 'center', a: seg(lt, L[3] + .3, .4) * (1 - seg(lt, L[4] - .2, .4)) });
    const sa = seg(lt, L[4], .5), sx0 = 1060, sx1 = 1760, sy = 640;
    g.save(); g.globalAlpha = sa; g.fillStyle = '#D8C08A'; g.beginPath(); g.moveTo(sx0, sy); g.lineTo(sx0 + 90, sy - 12); g.lineTo(sx1, sy - 12); g.lineTo(sx1, sy + 12); g.lineTo(sx0 + 90, sy + 12); g.closePath(); g.fill(); g.restore();
    line(g, sx0, sy + 60, sx1, sy + 60, C.mute, 2, null, sa); txt(g, '11 cm', (sx0 + sx1) / 2, sy + 95, { size: 34, w: 700, col: C.ink, al: 'center', a: sa });
    txt(g, '竹签 ⌀ 6 mm', sx1, sy - 50, { size: 32, w: 700, col: '#D8C08A', al: 'right', a: sa });
    rrect(g, 1300, sy - 20, 70, 40, 4, '#3A3F4A', null, 0, seg(lt, L[5], .4)); txt(g, '胶带', 1335, sy - 52, { size: 28, w: 700, col: C.mute, al: 'center', a: seg(lt, L[5], .4) });
  } });

// ---------- 8 制作②：换向器 ----------
S.push({ sec: '⑧ 制作：换向器', secEn: 'BUILD THE COMMUTATOR',
  lines: ['换向器：剪三条铜片，用夹具和竹签头压成弧形。', '在转轴上贴双面胶，把三片铜片贴上去，彼此留出缝隙，不能相碰。', ['把线圈引出的线头接到铜片上，用电烙铁焊牢。', .3], ['接线要想清楚电流怎么流——它决定了每个线圈的极性。', .6]],
  draw(g, lt, s) {
    const L = s.L, a0 = seg(lt, .1, .4);
    [0, 1, 2].forEach(k => rrect(g, 160, 260 + k * 60, 420, 26, 4, '#D88A45', '#F2B27A', 2, a0 * (1 - seg(lt, L[1], .4))));
    rrect(g, 660, 260, 260, 150, 12, '#4A5568', '#8A97AD', 2, a0 * (1 - seg(lt, L[1], .4)));
    g.save(); g.globalAlpha = a0 * (1 - seg(lt, L[1], .4)); g.fillStyle = '#0A1120'; g.beginPath(); g.arc(790, 260, 34, 0, Math.PI); g.fill(); g.restore();
    txt(g, '夹具', 790, 450, { size: 30, w: 700, col: C.mute, al: 'center', a: a0 * (1 - seg(lt, L[1], .4)) });
    arrow(g, 600, 330, 650, 330, C.mute, 3, 14, a0 * (1 - seg(lt, L[1], .4)));
    const xa = seg(lt, L[1], .5), cx = 600, cy = 560;                       // 断面放大
    dot(g, cx, cy, 110, '#D8C08A', xa); txt(g, '转轴', cx, cy, { size: 34, w: 700, col: '#3A2A10', al: 'center', a: xa });
    for (let j = 0; j < 3; j++) { g.save(); g.globalAlpha = xa; g.strokeStyle = '#D88A45'; g.lineWidth = 16; g.beginPath(); g.arc(cx, cy, 128, rad(j * 120 + 8), rad(j * 120 + 112)); g.stroke(); g.restore(); }
    txt(g, '缝隙：三片互不接触', cx, cy + 210, { size: 34, w: 700, col: C.gold, al: 'center', a: xa });
    const so = seg(lt, L[2], .5);
    rotor(g, 1380, 520, .8, 0, { a: so, I: [0, 0, 0] });
    [0, 1, 2].forEach(k => { const [x, y] = P2(1380, 520, 34, COFF + 120 * k + 60 - 60); dot(g, x, y, 9, '#E8E8E8', so, 12); });
    txt(g, '焊点', 1380, 820, { size: 32, w: 700, col: C.ink, al: 'center', a: so });
    pill(g, '电流怎么流 → 线圈的极性', 1380, 900, C.gold, { al: 'center', a: seg(lt, L[3], .5), size: 34 });
  } });

// ---------- 9 制作③：盒子、磁铁、电刷，通电 ----------
S.push({ sec: '⑨ 制作：盒子和电刷', secEn: 'BOX, MAGNETS & BRUSHES',
  lines: ['盒子：厚纸剪成 12 × 6 厘米，两头各留 2 厘米折成边，中心打孔。', '用双面胶把厚纸贴进盒子，离底约 1 厘米；贴之前用酒精擦掉油污。', '盖子中心用阶梯钻打一个 7 到 8 毫米的孔，用力别太猛，盖子会裂。', '盒子两侧贴上磁铁，一边 N，一边 S。',
    '电刷：两根黄铜棒贴在一次性筷子的断头上，用胶带缠紧。', ['装好转子，让两根电刷轻轻贴住换向器，接上电池——', .4], ['转起来了。', 1.6]],
  cues: [[s => s.L[6], 'ding']],
  draw(g, lt, s) {
    const L = s.L, a0 = seg(lt, .1, .4) * (1 - seg(lt, L[5] - .3, .5));
    if (a0 > 0) {
      const x0 = 160, y0 = 220, w = 720, h = 360;                           // 厚纸 12×6（1 cm = 60 px）
      rrect(g, x0, y0, w, h, 4, 'rgba(230,210,170,.15)', '#E6D2AA', 2, a0);
      line(g, x0 + 120, y0, x0 + 120, y0 + h, '#E6D2AA', 2, [8, 8], a0); line(g, x0 + w - 120, y0, x0 + w - 120, y0 + h, '#E6D2AA', 2, [8, 8], a0);
      dot(g, x0 + w / 2, y0 + h / 2, 14, '#0A1120', a0); g.save(); g.globalAlpha = a0; g.strokeStyle = '#E6D2AA'; g.lineWidth = 2; g.beginPath(); g.arc(x0 + w / 2, y0 + h / 2, 14, 0, 7); g.stroke(); g.restore();
      txt(g, '12 cm', x0 + w / 2, y0 + h + 40, { size: 32, w: 700, al: 'center', a: a0 }); txt(g, '6 cm', x0 - 20, y0 + h / 2, { size: 32, w: 700, al: 'right', a: a0 });
      txt(g, '2 cm', x0 + 60, y0 - 30, { size: 28, w: 700, col: C.mute, al: 'center', a: a0 }); txt(g, '2 cm', x0 + w - 60, y0 - 30, { size: 28, w: 700, col: C.mute, al: 'center', a: a0 });
      const ba = seg(lt, L[1], .4) * a0, bx = 1100, by = 240;               // 盒子侧视
      g.save(); g.globalAlpha = ba; g.strokeStyle = '#C9D3E3'; g.lineWidth = 4; g.beginPath(); g.moveTo(bx, by); g.lineTo(bx + 20, by + 340); g.lineTo(bx + 560, by + 340); g.lineTo(bx + 580, by); g.stroke(); g.restore();
      line(g, bx + 30, by + 280, bx + 550, by + 280, '#E6D2AA', 6, null, ba); txt(g, '厚纸（离底约 1 cm）', bx + 290, by + 250, { size: 28, w: 700, col: '#E6D2AA', al: 'center', a: ba });
      const la = seg(lt, L[2], .4) * a0; line(g, bx - 20, by - 30, bx + 600, by - 30, '#C9D3E3', 6, null, la); dot(g, bx + 290, by - 30, 10, '#0A1120', la);
      txt(g, '盖子：7–8 mm 孔（阶梯钻）', bx + 290, by - 74, { size: 30, w: 700, col: C.ink, al: 'center', a: la });
      const ma = seg(lt, L[3], .4) * a0; rrect(g, bx - 14, by + 120, 18, 160, 6, NC, null, 0, ma); rrect(g, bx + 576, by + 120, 18, 160, 6, SC, null, 0, ma);
      txt(g, 'N', bx - 50, by + 200, { size: 44, w: 900, col: NC, al: 'center', a: ma }); txt(g, 'S', bx + 630, by + 200, { size: 44, w: 900, col: SC, al: 'center', a: ma });
      const ea = seg(lt, L[4], .4) * a0, ex = 1180, ey = 760;               // 电刷：筷子头 + 两根黄铜棒
      rrect(g, ex, ey - 22, 160, 44, 6, '#D8C08A', null, 0, ea);
      line(g, ex + 40, ey - 6, ex + 460, ey - 50, '#D9C27A', 6, null, ea); line(g, ex + 40, ey + 8, ex + 460, ey + 60, '#D9C27A', 6, null, ea);
      rrect(g, ex + 30, ey - 30, 60, 60, 4, 'rgba(40,44,52,.85)', null, 0, ea); txt(g, '黄铜棒 + 筷子 + 胶带', ex + 250, ey + 110, { size: 30, w: 700, al: 'center', a: ea });
    }
    const fa = seg(lt, L[5] - .2, .6), cx = 960, cy = 480;
    if (fa > 0) { const phi = 30 - Math.max(0, lt - L[6]) * SPIN * 4;
      magnets(g, cx, cy, 400, 440, fa); brushes(g, cx, cy, .9, fa);
      rotor(g, cx, cy, .9, phi, { a: fa, I: lt > L[6] ? coilI(phi) : [0, 0, 0], glow: true });
      rrect(g, 1600, 760, 120, 60, 10, '#2A3446', '#C9D3E3', 3, fa); txt(g, '电池', 1660, 790, { size: 30, w: 700, al: 'center', a: fa });
      txt(g, '转起来了！', cx, 160, { size: 72, w: 900, col: C.gold, al: 'center', a: seg(lt, L[6], .4), glow: 'rgba(255,200,87,.5)' }); }
  } });

// ---------- 10 总结 ----------
S.push({ sec: '总结', secEn: 'SUMMARY',
  lines: ['总结一下：', '通电线圈变成电磁铁，和外面的磁铁相吸相斥；', '换向器在恰当的时候把电流反过来，', ['三个线圈保证任何角度都能启动。', .4], ['值得直接记住：四指沿电流绕，拇指指向 N 极。', .8], ['关注 X物理，下期见。', 1.6]], tail: 1.6,
  cues: [[s => s.L[4] + .2, 'ding']],
  draw(g, lt, s) {
    const L = s.L, phi = 30 - lt * SPIN * 2;
    rotor(g, 480, 520, .65, phi, { I: coilI(phi), glow: true, poles: true }); magnets(g, 480, 520, 280, 320, 1);
    [['电磁铁：相吸相斥', L[1]], ['换向器：适时反向', L[2]], ['三个线圈：没有死点', L[3]]].forEach(([t, t0], j) =>
      pill(g, t, 1300, 260 + j * 110, j === 2 ? C.green : C.blue, { al: 'center', a: seg(lt, t0, .4), size: 40 }));
    memo(g, 960, 600, 700, 110, seg(lt, L[4], .5), '值得直接记住'); tex(g, 'coilrule', 1310, 656, { size: .72, al: 'center', a: seg(lt, L[4], .5) });
    txt(g, 'X物理  ·  关注，下期见', 1310, 840, { size: 44, w: 700, col: C.gold, al: 'center', a: seg(lt, L[5], .5) });
  } });

window.OVERLAY = (g, T) => {
  g.save(); g.fillStyle = 'rgba(169,188,211,.12)'; g.fillRect(0, 0, W, 6); g.fillStyle = 'rgba(255,200,87,.85)'; g.fillRect(0, 0, W * T / TOTAL, 6);
  SCENES.forEach(c => { if (c.t0 > 0) { g.fillStyle = 'rgba(10,17,32,.9)'; g.fillRect(W * c.t0 / TOTAL - 1, 0, 2, 6); } }); g.restore();
  txt(g, 'X物理', W - 60, 62, { size: 30, w: 700, col: 'rgba(238,243,250,.42)', al: 'right' });
};
setup(S);
