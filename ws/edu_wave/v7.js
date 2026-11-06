// 视频 7：ドップラー効果（課本 116–117 页）→ 11 幕，无配乐
const GOLD = C.gold, BLU = C.blue, PUR = C.purple, RED = C.red, GRN = C.green;
function person(g, x, y, sc = 1, col = C.ink, a = 1) {
  g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.fillStyle = col; g.lineWidth = 5 * sc; g.lineCap = 'round';
  g.beginPath(); g.arc(x, y - 78 * sc, 13 * sc, 0, 7); g.fill();
  g.beginPath(); g.moveTo(x, y - 62 * sc); g.lineTo(x, y - 26 * sc); g.moveTo(x - 20 * sc, y - 50 * sc); g.lineTo(x + 20 * sc, y - 50 * sc);
  g.moveTo(x, y - 26 * sc); g.lineTo(x - 14 * sc, y); g.moveTo(x, y - 26 * sc); g.lineTo(x + 14 * sc, y); g.stroke(); g.restore();
}
function car(g, x, y, col, a = 1) {
  g.save(); g.globalAlpha *= a; g.fillStyle = col; g.beginPath(); g.roundRect(x - 60, y - 56, 120, 36, 10); g.fill(); g.beginPath(); g.roundRect(x - 34, y - 86, 70, 36, 12); g.fill();
  g.fillStyle = '#0B1322'; [-34, 34].forEach(dx => { g.beginPath(); g.arc(x + dx, y - 18, 13, 0, 7); g.fill(); }); g.fillStyle = col; [-34, 34].forEach(dx => { g.beginPath(); g.arc(x + dx, y - 18, 7, 0, 7); g.fill(); }); g.restore();
}
function crest(g, x, y, h, col, lw = 6, a = 1) {
  if (a <= 0) return; g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = lw; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x - 10, y - h); g.quadraticCurveTo(x + 18, y, x - 10, y + h); g.stroke(); g.restore();
}
function brace(g, x1, x2, y, col, a, w = 4) { arrow(g, (x1 + x2) / 2 - 2, y, x1, y, col, w, 14, a); arrow(g, (x1 + x2) / 2 + 2, y, x2, y, col, w, 14, a); line(g, x1, y - 12, x1, y + 12, col, w, null, a); line(g, x2, y - 12, x2, y + 12, col, w, null, a); }
function box(g, x, y, w, h, col, a, dash = false) { if (a <= 0) return; g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = 3.5; if (dash) g.setLineDash([16, 8]); g.beginPath(); g.roundRect(x, y, w, h, 18); g.stroke(); g.restore(); }
function ring(g, cx, cy, r, col, lw, a) { if (r <= 0 || a <= 0) return; g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = lw; g.beginPath(); g.arc(cx, cy, r, 0, 7); g.stroke(); g.restore(); }
// 移动波源发出的球面波：每隔 T 发一个，中心留在发出点
function DOP(g, t, o) {
  const { x0, y, V, v, T, col = RED, lw = 4, a = 1, rmax = 620 } = o;
  for (let k = 0; k * T < t; k++) { const r = V * (t - k * T); ring(g, x0 + v * k * T, y, r, col, lw, a * clamp(1 - (r - rmax * .6) / (rmax * .4))); }
  dot(g, x0 + v * t, y, 11, GOLD, a, 20);
}
// 列车：x_n = 250 + 110 n + 660 τ（V = 6λ0 / 1 秒）
const LAM = 110, VV = 660, XS = 250;
function TRAIN(g, tau, xp, hiThr, a = 1) {
  for (let n = -14; n <= 7; n++) { const x = XS + LAM * n + VV * tau; if (x < XS) continue; const passed = n <= 7 && n > hiThr; crest(g, x, 540, 52, passed ? RED : BLU, 7, a * clamp((x - XS) / 40)); }
}

const S = [];
// 0 片头
S.push({ lines: ['警车鸣笛从身边驶过，音调会突然变低——', '这就是「ドップラー効果」。'], lead: 1.2,
  draw(g, lt) {
    DOP(g, lt + 3, { x0: 420, y: 700, V: 150, v: 55, T: 1.1, a: .5, lw: 3, rmax: 560 });
    txt(g, 'ドップラー効果', W / 2, 330, { size: 140, jp: true, w: 900, al: 'center', a: 1, glow: 'rgba(255,85,119,.35)' });
    txt(g, '（多普勒效应）', W / 2, 480, { size: 54, jp: true, col: GOLD, al: 'center', a: 1, w: 700 });
  } });
// 1 两个原因
S.push({ lines: ['人或波源在运动时，人接收到的波的振动数，会和波源的振动数不同。', '这就是多普勒效应。比起公式，更要理解它为什么会发生。', '原因有两个。第 1，人在动，出合的波的数量变了（图 1）。', '第 2，波源在动，波长变了（图 2）。'],
  draw(g, lt, s) {
    txt(g, '人や波源が動くと，人の受け取る波の振動数は波源の振動数と異なる', W / 2, 140, { size: 44, jp: true, w: 800, al: 'center', a: seg(lt, .2, .6) });
    const a1 = seg(lt, s.L[2], .7), a2 = seg(lt, s.L[3], .7);
    box(g, 130, 240, 810, 560, BLU, a1); box(g, 980, 240, 810, 560, RED, a2);
    txt(g, '第 1 の原因', 190, 310, { size: 50, jp: true, w: 800, col: BLU, a: a1 }); txt(g, '人が動くと', 190, 400, { size: 52, jp: true, w: 800, a: a1 }); txt(g, '出合う波の数が変わる（図 1）', 190, 480, { size: 44, jp: true, w: 700, a: a1 });
    txt(g, '第 2 の原因', 1040, 310, { size: 50, jp: true, w: 800, col: RED, a: a2 }); txt(g, '波源が動くと', 1040, 400, { size: 52, jp: true, w: 800, a: a2 }); txt(g, '波長が変わる（図 2）', 1040, 480, { size: 44, jp: true, w: 700, a: a2 });
    const t = lt;
    dot(g, 300, 660, 10, GOLD, a1); g.save(); g.beginPath(); g.rect(140, 560, 790, 230); g.clip(); for (let k = 0; k < 3; k++) ring(g, 300, 660, ((t * 60 + k * 70) % 210) + 5, RED, 3, a1 * .8); g.restore(); person(g, 620 + 40 * Math.sin(t * 1.6), 700, 1, C.ink, a1); arrow(g, 620 + 40 * Math.sin(t * 1.6) + 30, 640, 740 + 40 * Math.sin(t * 1.6), 640, BLU, 5, 18, a1);
    DOP(g, (t % 5) + 1, { x0: 1250, y: 660, V: 80, v: 30, T: 1, a: a2, lw: 3, rmax: 220 });
  } });
// 2 図1
S.push({ lines: ['人动起来，1 秒内出合的波的数量就会改变。', '离开波源时，遇到的波变少；', '靠近波源时，遇到的波变多。', '但是，人动并不会改变波长。'],
  draw(g, lt, s) {
    const cx = 560, cy = 500, lam = 110, vv = 110, a0 = seg(lt, .2, .6);
    g.save(); g.beginPath(); g.rect(60, 130, 1800, 760); g.clip();
    for (let n = 0; n < 9; n++) ring(g, cx, cy, (vv * lt + n * lam) % (lam * 9) + 4, RED, 5, a0 * .85 * clamp(1 - ((vv * lt + n * lam) % (lam * 9) - 700) / 200)); g.restore();
    dot(g, cx, cy, 11, GOLD, a0, 20); txt(g, '波源', cx, cy + 44, { size: 38, jp: true, col: GOLD, al: 'center', a: a0 });
    pill(g, '波面は「山」と思うとよい', 390, 190, GOLD, { jp: true, size: 36, a: seg(lt, .4, .6) });
    const away = 55 * clamp(lt - s.L[1], 0, 4.6), back = 110 * clamp(lt - s.L[2], 0, 4.4), xp = 1100 + away - back;
    person(g, xp, cy + 40, 1.3, C.ink, a0);
    const m1 = seg(lt, s.L[1], .5) * (1 - seg(lt, s.L[2], .4)), m2 = seg(lt, s.L[2], .5) * (1 - seg(lt, s.L[3], .4));
    if (m1 > 0) { arrow(g, xp + 30, cy - 120, xp + 130, cy - 120, BLU, 6, 22, m1); txt(g, '出合う波の数：減る', xp + 30, cy - 175, { size: 42, jp: true, col: BLU, w: 800, a: m1 }); fm(g, 'fless', xp + 30, cy - 235, 56, { a: m1 }); }
    if (m2 > 0) { arrow(g, xp - 30, cy - 120, xp - 130, cy - 120, GRN, 6, 22, m2); txt(g, '出合う波の数：増える', xp - 130, cy - 175, { size: 42, jp: true, col: GRN, w: 800, a: m2 }); fm(g, 'fmore', xp - 130, cy - 235, 56, { a: m2 }); }
    const w3 = seg(lt, s.L[3], .6); if (w3 > 0) { const r4 = (vv * lt + 4 * lam) % (lam * 9) + 4, r5 = (vv * lt + 5 * lam) % (lam * 9) + 4, ra = Math.min(r4, r5), rb = Math.max(r4, r5); if (rb < 640 && rb - ra < 150) { brace(g, cx + ra, cx + rb, cy + 120, GOLD, w3); fm(g, 'lam0', cx + (ra + rb) / 2, cy + 175, 52, { al: 'center', a: w3 }); } txt(g, '人が動いても波長は変わらない', W / 2, 840, { size: 44, jp: true, col: GOLD, al: 'center', w: 800, a: w3 }); }
  } });
// 3 図2
S.push({ lines: ['波源一动，前方的波长变短，后方的波长变长。', 'a′、b′、c′ 是波源在 a、b、c 的位置发出的波面。', '每一个波面都是完整的球面波！波源现在的位置是 d。', '波面 d′ 从 d 才刚出发，还没有扩散开。'],
  draw(g, lt, s) {
    const xa = 760, cy = 500, sp = 60, VT = 120, p = lin(lt, .8, 6) * 3, a0 = seg(lt, .2, .5), names = ['a', 'b', 'c', 'd'], pr = ['a′', 'b′', 'c′'];
    for (let k = 0; k < 3; k++) if (p > k) { const r = VT * (p - k), cx = xa + sp * k; ring(g, cx, cy, r, RED, 5, a0); if (r > 100) txt(g, pr[k], cx - r * .72, cy - r * .72 - 12, { size: 42, serif: true, w: 700, col: RED, al: 'center', a: seg(lt, s.L[1] - .2 + k * .3, .5) }); }
    const sx = xa + sp * Math.min(p, 3); dot(g, sx, cy, 12, GOLD, a0, 22);
    for (let k = 0; k < 4; k++) if (p > k - .05) { dot(g, xa + sp * k, cy, 6, C.ink, .9); txt(g, names[k], xa + sp * k, cy + 38, { size: 40, serif: true, w: 700, al: 'center', a: .95 }); }
    if (p >= 3) { arrow(g, sx + 20, cy, sx + 110, cy, RED, 6, 20, a0); txt(g, 'v', sx + 70, cy - 28, { size: 44, serif: true, col: RED, w: 700 }); txt(g, '波源', sx + 80, cy + 85, { size: 38, jp: true, col: GOLD, w: 700 }); }
    const b0 = seg(lt, s.L[0] + .5, .6); if (b0 > 0) { brace(g, 400, 580, 640, BLU, b0); txt(g, '後方での波長', 490, 695, { size: 40, jp: true, col: BLU, al: 'center', w: 800, a: b0 }); brace(g, 1060, 1120, 640, GRN, b0); txt(g, '前方での波長', 1090, 695, { size: 40, jp: true, col: GRN, al: 'center', w: 800, a: b0 }); txt(g, '短い', 1090, 745, { size: 36, jp: true, col: GRN, al: 'center', a: b0 }); txt(g, '長い', 490, 745, { size: 36, jp: true, col: BLU, al: 'center', a: b0 }); }
    const d3 = seg(lt, s.L[3], .6); if (d3 > 0) { txt(g, "d′ はまだ広がっていない", 940, 340, { size: 38, jp: true, col: GOLD, al: 'center', a: d3, w: 700 }); arrow(g, 940, 365, 940, 465, GOLD, 4, 16, d3); }
  } });
// 4 (I) 设定
S.push({ lines: ['再用式子详细追一下。设波的速度为 V，波源的振动数为 f0。', '先看 (I)：人在动，波源静止，人的速度是 u。', '设波长为 λ0，则 V = f0 λ0 ……(1)。'],
  draw(g, lt, s) {
    txt(g, '(I) 人が動く場合（人の速さ u〔m/s〕，波源は静止）', 200, 140, { size: 46, jp: true, w: 800, col: GOLD, a: seg(lt, .2, .6) });
    const a0 = seg(lt, .3, .6), pos = []; for (let n = 0; n < 12; n++) { const x = XS + ((LAM * n + 150 * lt) % (LAM * 12)); pos.push(x); crest(g, x, 540, 52, BLU, 7, a0 * clamp((x - XS) / 40) * clamp((1500 - x) / 40)); }
    dot(g, XS, 540, 12, GOLD, a0, 20); txt(g, '波源', XS, 620, { size: 38, jp: true, col: GOLD, al: 'center', a: a0 }); fm(g, 'f0', XS, 440, 60, { al: 'center', a: seg(lt, s.L[0] + 1.5, .5) });
    person(g, 1560, 580, 1.4, C.ink, a0); arrow(g, 1600, 480, 1720, 480, BLU, 6, 22, seg(lt, s.L[1], .5)); fm(g, 'u', 1670, 435, 56, { al: 'center', a: seg(lt, s.L[1], .5) });
    const w = seg(lt, s.L[2], .5); if (w > 0) { const c1 = pos.filter(x => x > 700 && x < 1100).sort((a, b) => a - b)[0]; if (c1) { brace(g, c1, c1 + LAM, 650, GOLD, w); fm(g, 'lam0', c1 + LAM / 2, 710, 52, { al: 'center', a: w }); } arrow(g, 480, 400, 900, 400, C.ink, 5, 20, seg(lt, s.L[0], .5)); fm(g, 'V', 690, 350, 56, { al: 'center', a: seg(lt, s.L[0], .5) });
      box(g, 440, 790, 880, 150, GOLD, w * .8); fm(g, 'vf', 880, 865, 66, { al: 'center', a: w, p: seg(lt, s.L[2] + .2, 1.2) }); }
  } });
// 5 人静止
S.push({ lines: ['先考虑人远离波源的情形。如果人停着不动，', '1 秒内会遇到 f0 个波（1 个波长算 1 个）。', '也就是遇到了 f0 个山。'],
  draw(g, lt, s) {
    txt(g, '止まったままだと', 200, 140, { size: 50, jp: true, w: 800, col: GOLD, a: seg(lt, .2, .6) });
    const tau = lin(lt, s.L[0] + .3, 4.4), xp = 1020, a0 = seg(lt, .3, .6), thr = 7 - 6 * tau;
    dot(g, XS, 540, 12, GOLD, a0, 20); txt(g, '波源', XS, 620, { size: 38, jp: true, col: GOLD, al: 'center', a: a0 });
    TRAIN(g, tau, xp, thr, a0); person(g, xp, 590, 1.4, C.ink, a0);
    const cnt = Math.max(0, 7 - Math.floor(thr - 1e-9)); const cc = tau <= 0 ? 0 : Math.min(6, cnt);
    const ta = seg(lt, s.L[0] + .3, .4); if (ta > 0) txt(g, `t = ${(tau).toFixed(1)} s`, W / 2, 260, { size: 44, serif: true, w: 700, col: C.mute, al: 'center', a: ta });
    txt(g, '1 s 後', 1020, 190, { size: 38, jp: true, col: C.mute, al: 'center', a: ta * .9 });
    arrow(g, xp, 340, xp + VV * tau + .01, 340, C.ink, 5, 20, ta); if (tau > .15) fm(g, 'V', xp + VV * tau / 2, 295, 56, { al: 'center', a: ta });
    txt(g, `${cc}`, 880, 800, { size: 120, serif: true, w: 800, col: RED, al: 'center', a: ta });
    const fin = seg(lt, s.L[1], .5); if (fin > 0) { brace(g, 1030, 1690, 710, RED, fin); fm(g, 'f0ko', 1480, 780, 60, { al: 'center', a: fin }); txt(g, '出合った波は', 1240, 780, { size: 42, jp: true, col: RED, al: 'center', w: 800, a: fin }); }
  } });
// 6 人动
S.push({ lines: ['实际上，人在 1 秒内移动了 u〔m〕。', '所以出合的波的长度只有 V − u〔m〕。', '其中包含的波的数量，就是人观测到的振动数 f。'],
  draw(g, lt, s) {
    txt(g, '動くと', 200, 140, { size: 50, jp: true, w: 800, col: GOLD, a: seg(lt, .2, .6) });
    const tau = lin(lt, s.L[0] + .3, 4.4), a0 = seg(lt, .3, .6), xp = 1020 + 220 * tau, thr = 7 - 4 * tau;
    dot(g, XS, 540, 12, GOLD, a0, 20); txt(g, '波源', XS, 620, { size: 38, jp: true, col: GOLD, al: 'center', a: a0 });
    TRAIN(g, tau, xp, thr, a0); person(g, 1020, 590, 1.4, C.mute, a0 * .35); person(g, xp, 590, 1.4, C.ink, a0);
    const ta = seg(lt, s.L[0] + .3, .4); txt(g, `t = ${(tau).toFixed(1)} s`, W / 2, 260, { size: 44, serif: true, w: 700, col: C.mute, al: 'center', a: ta });
    arrow(g, 1020, 700, xp + .01, 700, GOLD, 6, 22, ta); if (tau > .3) fm(g, 'u', (1020 + xp) / 2, 745, 56, { al: 'center', a: ta });
    const cc = tau <= 0 ? 0 : Math.max(0, Math.min(4, 7 - Math.floor(thr - 1e-9))); txt(g, `${cc}`, 880, 840, { size: 100, serif: true, w: 800, col: RED, al: 'center', a: ta });
    const b = seg(lt, s.L[1], .5); if (b > 0) { arrow(g, xp, 340, 1680, 340, C.ink, 5, 20, b); fm(g, 'Vu', (xp + 1680) / 2, 295, 56, { al: 'center', a: b }); }
    const c = seg(lt, s.L[2], .5); if (c > 0) { brace(g, xp + 10, 1690, 710, RED, c); fm(g, 'fko', (xp + 1690) / 2 + 130, 810, 60, { al: 'center', a: c }); txt(g, '出合った波は', (xp + 1690) / 2 - 110, 810, { size: 42, jp: true, col: RED, al: 'center', w: 800, a: c }); }
  } });
// 7 公式
S.push({ lines: ['观测到的振动数 f，就是 f = (V − u) / λ0。', '代入 (1) 的 λ0，得到 f = (V − u)/V · f0 ……(A)。', '也可以按比例想：V 的长度里有 f0 个，那 V − u 的长度里有多少个呢？'],
  draw(g, lt, s) {
    txt(g, '観測する振動数 f', 200, 120, { size: 46, jp: true, w: 800, col: GOLD, a: seg(lt, .2, .6) });
    fm(g, 'fa', 200, 235, 66, { a: seg(lt, s.L[0] + .3, .5), p: seg(lt, s.L[0] + .3, 1.0) });
    const b = seg(lt, s.L[1], .5); fm(g, 'fb', 200, 455, 66, { a: b, p: seg(lt, s.L[1] + .2, 1.4) }); if (b > 0) { box(g, 170, 365, 1010, 180, GOLD, b * .9); txt(g, '①の λ0 を代入', 1230, 455, { size: 38, jp: true, col: C.mute, a: b }); pill(g, '要暗記', 1620, 455, RED, { jp: true, size: 34, a: seg(lt, s.L[1] + 1.4, .4) }); }
    const c = seg(lt, s.L[2], .6); if (c > 0) { const y1 = 650, y2 = 735; fm(g, 'V', 200, y1, 56, { al: 'left', a: c }); fm(g, 'Vu', 200, y2, 56, { al: 'left', a: c });
      g.save(); g.globalAlpha *= c; g.fillStyle = GOLD; g.fillRect(480, y1 - 14, 660, 28); g.fillStyle = BLU; g.fillRect(480 + 220, y2 - 14, 440, 28); g.restore();
      for (let k = 0; k <= 6; k++) line(g, 480 + 110 * k, y1 - 24, 480 + 110 * k, y1 + 24, C.bg, 4, null, c); for (let k = 2; k <= 6; k++) line(g, 480 + 110 * k, y2 - 24, 480 + 110 * k, y2 + 24, C.bg, 4, null, c);
      fm(g, 'f0ko', 1190, y1, 56, { a: c }); const d = seg(lt, s.L[2] + 1.6, .6); fm(g, 'fko', 1190, y2, 56, { a: d }); txt(g, '?', 1390, y2, { size: 60, serif: true, col: GOLD, w: 800, a: d }); }
    const dd = seg(lt, s.L[2] + 3, .6); if (dd > 0) fm(g, 'prop', 200, 870, 56, { a: dd, p: seg(lt, s.L[2] + 3, 1.6) });
  } });
// 7b 补充：靠近
S.push({ lines: ['补充：人靠近波源时，u 的方向反过来。', '1 秒内遇到的波的长度是 V ＋ u，波的数量增多，f = (V + u)/V · f0。', '要记住：观测者远离用 V − u，靠近用 V + u。'],
  draw(g, lt, s) {
    txt(g, '補足：人が波源に近づく場合', 200, 130, { size: 46, jp: true, w: 800, col: GRN, a: seg(lt, .2, .6) });
    const tau = lin(lt, s.L[0] + .6, 4.4), a0 = seg(lt, .3, .6), xp = 1020 - 220 * tau, thr = 7 - 8 * tau;
    dot(g, XS, 540, 12, GOLD, a0, 20); txt(g, '波源', XS, 620, { size: 38, jp: true, col: GOLD, al: 'center', a: a0 });
    TRAIN(g, tau, xp, thr, a0); person(g, 1020, 590, 1.4, C.mute, a0 * .35); person(g, xp, 590, 1.4, C.ink, a0);
    const ta = seg(lt, s.L[0] + .3, .4); txt(g, `t = ${(tau).toFixed(1)} s`, W / 2, 260, { size: 44, serif: true, w: 700, col: C.mute, al: 'center', a: ta });
    arrow(g, 1020, 700, xp - .01, 700, GRN, 6, 22, ta); if (tau > .3) fm(g, 'u', (1020 + xp) / 2, 745, 56, { al: 'center', a: ta });
    const cc = tau <= 0 ? 0 : Math.max(0, Math.min(8, 7 - Math.floor(thr - 1e-9))); txt(g, `${cc}`, 560, 830, { size: 100, serif: true, w: 800, col: RED, al: 'center', a: ta });
    const b = seg(lt, s.L[1], .5); if (b > 0) { arrow(g, xp, 340, 1680, 340, C.ink, 5, 20, b); fm(g, 'Vpu', (xp + 1680) / 2, 295, 56, { al: 'center', a: b }); brace(g, xp - 10, 1690, 710, RED, b); fm(g, 'fko', 1120, 810, 60, { al: 'center', a: b }); fm(g, 'fmore', 1330, 810, 56, { al: 'center', a: b });
      fm(g, 'near', 1520, 140, 62, { al: 'center', a: seg(lt, s.L[1] + .8, .5), p: seg(lt, s.L[1] + .8, 1.0) }); }
    const c = seg(lt, s.L[2], .6); if (c > 0) { pill(g, '遠ざかる：V − u　／　近づく：V ＋ u', W / 2, 910, GOLD, { jp: true, size: 40, al: 'center', a: c }); }
  } });
// 8 (II) 波源动：速度不加
S.push({ lines: ['(II) 波源在动、人静止的情形：波源的速度是 v〔m/s〕。', '先问一个问题：音速取 340 m/s，', '从以 30 m/s 行驶的音源向前方发出的声音，速度是多少？', '错误答案：340 ＋ 30 ＝ 370 m/s。波可不像从车上扔东西！', '正确答案是 340 m/s：波的速度与波源的速度无关。'],
  draw(g, lt, s) {
    txt(g, '(II) 波源が動く場合（波源の速さ v〔m/s〕，人は静止）', 200, 130, { size: 46, jp: true, w: 800, col: GOLD, a: seg(lt, .2, .6) });
    const q = seg(lt, s.L[1], .6); txt(g, 'まず質問。“音速を 340 m/s とする。30 m/s で動いている音源から', 200, 220, { size: 40, jp: true, a: q, w: 600 }); txt(g, '前方へ出された音の速さは？”', 330, 285, { size: 40, jp: true, a: q, w: 600 });
    const A = seg(lt, s.L[2], .6), B = seg(lt, s.L[3], .6), tau = lt % 4.2, cx = 300 + 90 * tau;
    if (A > 0) { txt(g, '車から物を投げる', 200, 410, { size: 40, jp: true, col: PUR, w: 800, a: A }); line(g, 200, 520, 1500, 520, C.axis, 2, [8, 8], A * .6); car(g, cx, 520, C.mute, A); dot(g, 300 + 294 * tau, 470, 15, PUR, A, 20); arrow(g, cx + 70, 460, cx + 70 + 90, 460, GOLD, 4, 14, A * .8);
      txt(g, '× Miss　340 ＋ 30 ＝ 370 m/s', 1000, 420, { size: 42, jp: true, col: RED, w: 800, a: A }); }
    if (B > 0) { txt(g, '波（音）', 200, 640, { size: 40, jp: true, col: BLU, w: 800, a: B }); line(g, 200, 760, 1500, 760, C.axis, 2, [8, 8], B * .6); car(g, cx, 760, C.mute, B); crest(g, 300 + 204 * tau, 700, 56, BLU, 8, B); line(g, 300, 700, 300, 780, BLU, 2, [6, 6], B * .5);
      txt(g, '✓ 正解　340 m/s', 1000, 660, { size: 42, jp: true, col: GRN, w: 800, a: B }); txt(g, '波の速さは波源の速度に無関係', 1000, 880, { size: 42, jp: true, col: GOLD, w: 800, a: B }); }
    txt(g, '※ 車の速さは強調して描いている', 200, 900, { size: 30, jp: true, col: C.mute, a: A * .8 });
  } });
// 9 补充：波长变化
S.push({ lines: ['补充：为什么波源一动，波长就变了？看 1 个周期 T。', '这段时间里，波前进 VT，波源前进 vT。', '前方的波长缩短为 (V − v)T，也就是 (V − v)/f0。', '后方的波长伸长为 (V + v)/f0。', '所以前方静止的人听到 f = V/(V − v) · f0：波长短，振动数变大。'],
  draw(g, lt, s) {
    txt(g, '補足：波源が動くと波長が変わる理由', 200, 70, { size: 42, jp: true, w: 800, col: GRN, a: seg(lt, .2, .6) });
    const cx = 560, cy = 570, R = 330, p = lin(lt, s.L[1], 4.5), a0 = seg(lt, .3, .6), sx = cx + 110 * p;
    ring(g, cx, cy, R * p + .01, RED, 5, a0); dot(g, cx, cy, 6, C.mute, a0 * .8); dot(g, sx, cy, 12, GOLD, a0, 22); txt(g, '波源', sx, cy + 44, { size: 36, jp: true, col: GOLD, al: 'center', a: a0 });
    const b = seg(lt, s.L[1] + 1.2, .6); if (b > 0) { brace(g, cx, cx + R, 160, C.ink, b); fm(g, 'VT', cx + R + 90, 160, 54, { a: b }); brace(g, cx, cx + 110, 215, GOLD, b); fm(g, 'vT', cx + 200, 215, 54, { a: b }); }
    const c = seg(lt, s.L[2], .6), d = seg(lt, s.L[3], .6); if (p >= 1 && c > 0) { brace(g, cx + 110, cx + R, 640, GRN, c); fm(g, 'VvT', cx + 110 + 110, 700, 50, { al: 'center', a: c }); txt(g, '前', cx + 340, 640, { size: 36, jp: true, col: GRN, w: 800, a: c }); }
    if (p >= 1 && d > 0) { brace(g, cx - R, cx + 110, 640, BLU, d); fm(g, 'VpvT', cx - 110, 700, 50, { al: 'center', a: d }); txt(g, '後', cx - R - 20, 640, { size: 36, jp: true, col: BLU, w: 800, al: 'right', a: d }); }
    fm(g, 'lamF', 1050, 330, 60, { a: c, p: seg(lt, s.L[2] + .2, 1.0) }); fm(g, 'lamB', 1050, 520, 60, { a: d, p: seg(lt, s.L[3] + .2, 1.0) });
    const e = seg(lt, s.L[4], .6); if (e > 0) { box(g, 1020, 620, 780, 190, GOLD, e * .9); fm(g, 'fF', 1050, 715, 60, { a: e, p: seg(lt, s.L[4] + .2, 1.4) }); }
  } });
// 10 总结
S.push({ lines: ['总结：多普勒效应有两个原因——人动，出合的波数变；波源动，波长变。', '人远离波源时 f = (V − u)/V · f0，靠近时 u 前面换成加号。', '波的速度与波源的速度无关，不能像扔东西那样做加法。', '波源在动时，前方波长变短，后方波长变长。'],
  draw(g, lt, s) {
    txt(g, 'ドップラー効果　まとめ', 260, 140, { size: 56, jp: true, w: 800, a: seg(lt, .2, .6) });
    const a1 = seg(lt, s.L[0], .6), a2 = seg(lt, s.L[1], .6), a3 = seg(lt, s.L[2], .6), a4 = seg(lt, s.L[3], .6);
    txt(g, '① 人が動く → 出合う波の数が変わる', 260, 290, { size: 44, jp: true, col: BLU, w: 800, a: a1 }); txt(g, '② 波源が動く → 波長が変わる', 260, 370, { size: 44, jp: true, col: RED, w: 800, a: a1 });
    fm(g, 'fb', 260, 520, 62, { a: a2 }); box(g, 230, 440, 980, 160, GOLD, a2 * .8); txt(g, '遠ざかる：V − u　／　近づく：V ＋ u', 1250, 520, { size: 38, jp: true, a: a2, col: C.ink, w: 700 });
    txt(g, '波の速さは波源の速度に無関係（足し算しない）', 260, 710, { size: 44, jp: true, col: GOLD, w: 800, a: a3 });
    txt(g, '波源が動く：前方は波長が短く，後方は長くなる', 260, 810, { size: 44, jp: true, a: a4 });
  } });
setup(S);
