  // Wheeler's phone call: one world line zig-zagging through time
  D.call = function (g, lt, L) {
    var P = [[1250, 930], [1430, 300], [1580, 820], [1740, 230]], a = ap(lt, L[0], 0.6), tp = E((lt - L[4]) / 3.0);
    txt(g, '时间', 1160, 180, 26, DIM, 'center', a, 700); g.save(); g.globalAlpha *= a; g.strokeStyle = 'rgba(200,210,230,0.5)'; g.lineWidth = 2.5; g.beginPath(); g.moveTo(1160, 960); g.lineTo(1160, 210); g.stroke(); g.fillStyle = 'rgba(200,210,230,0.6)'; g.beginPath(); g.moveTo(1160, 200); g.lineTo(1152, 222); g.lineTo(1168, 222); g.fill(); g.restore();
    var tot = 0, lens = []; for (var i = 0; i < 3; i++) { var l = Math.hypot(P[i + 1][0] - P[i][0], P[i + 1][1] - P[i][1]); lens.push(l); tot += l; }
    var run = tp * tot; for (var i = 0; i < 3; i++) { var u = Math.max(0, Math.min(1, run / lens[i])); run -= lens[i]; if (u <= 0) continue; var col = i === 1 ? RED : BLUE; aline(g, P[i][0], P[i][1], P[i][0] + (P[i + 1][0] - P[i][0]) * u, P[i][1] + (P[i + 1][1] - P[i][1]) * u, col, a, 1, 5, false);
      if (u > 0.55) { var mx = P[i][0] + (P[i + 1][0] - P[i][0]) * 0.5, my = P[i][1] + (P[i + 1][1] - P[i][1]) * 0.5, an = Math.atan2(P[i + 1][1] - P[i][1], P[i + 1][0] - P[i][0]); g.save(); g.fillStyle = col; g.translate(mx, my); g.rotate(an); g.beginPath(); g.moveTo(14, 0); g.lineTo(-12, -11); g.lineTo(-12, 11); g.fill(); g.restore(); } }
    var sl = ap(lt, L[5], 0.5); if (sl > 0) { var ys = 585 + 330 * Math.sin((lt - L[5]) * 0.55 + 0.4) * (lt > L[5] ? 1 : 0), cnt = [0, 0];
      g.save(); g.globalAlpha *= sl; g.strokeStyle = GOLD; g.lineWidth = 2.5; g.setLineDash([12, 9]); g.beginPath(); g.moveTo(1190, ys); g.lineTo(1830, ys); g.stroke(); g.setLineDash([]); g.restore();
      for (var i = 0; i < 3; i++) { var y0 = P[i][1], y1 = P[i + 1][1], lo = Math.min(y0, y1), hi = Math.max(y0, y1); if (ys >= lo && ys <= hi) { var u = (ys - y0) / (y1 - y0), x = P[i][0] + (P[i + 1][0] - P[i][0]) * u; glowDot(g, x, ys, 11, i === 1 ? RED : BLUE, sl); i === 1 ? cnt[1]++ : cnt[0]++; } }
      txt(g, '此刻：电子 ' + cnt[0] + ' 个，正电子 ' + cnt[1] + ' 个', 1510, 990, 30, INK, 'center', sl, 900); }
    chip(g, 1700, 600, '电子（向前走）', BLUE, ap(lt, L[4] + 1.0, 0.5), 24); chip(g, 1432, 640, '倒着走', RED, ap(lt, L[4] + 2.2, 0.5), 26);
    var q = ap(lt, L[6], 0.5); if (q > 0) chip(g, 1500, 120, '正电子远没有电子多', RED, q, 28); var q2 = ap(lt, L[7], 0.5); if (q2 > 0) chip(g, 1500, 200, '“也许藏在质子里”', DIM, q2, 26);
  };
  // "That, I stole!": an electron going backward is a positron
  D.stole = function (g, lt, L) {
    var a = ap(lt, L[2], 0.6), xa = 1330, xb = 1670, y0 = 760, y1 = 280;
    if (a > 0) { txt(g, '时间', 1150, 220, 24, DIM, 'center', a, 700); g.save(); g.globalAlpha *= a; g.strokeStyle = 'rgba(200,210,230,0.45)'; g.lineWidth = 2; g.beginPath(); g.moveTo(1150, 800); g.lineTo(1150, 250); g.stroke(); g.fillStyle = 'rgba(200,210,230,0.6)'; g.beginPath(); g.moveTo(1150, 240); g.lineTo(1143, 260); g.lineTo(1157, 260); g.fill(); g.restore();
      var p = E((lt - L[2]) / 1.0); aline(g, xa, y1, xa, y0, BLUE, a, p, 8, true); aline(g, xb, y0, xb, y1, RED, a, p, 8, true);
      txt(g, '电子，倒着走', xa, 850, 32, BLUE, 'center', a, 900); txt(g, '正电子，正着走', xb, 850, 32, RED, 'center', a, 900); txt(g, '≡', 1500, 540, 90, GOLD, 'center', a, 900); txt(g, '电荷符号相反', 1500, 610, 26, DIM, 'center', ap(lt, L[5], 0.5), 700); }
    var q = ap(lt, L[3] - 0.2, 0.7); if (q > 0) { card(g, 112, 560, 900, 200, GOLD, q); g.save(); g.globalAlpha *= q; g.font = 'italic 900 62px ' + SERIF; g.fillStyle = '#f4ead2'; g.textAlign = 'left'; g.shadowColor = 'rgba(240,189,92,0.5)'; g.shadowBlur = 18; g.fillText('“这个，我偷来了。”', 160, 680); g.restore(); txt(g, '— 费曼，谈惠勒的想法', 990, 735, 24, DIM, 'right', q, 500); }
    chip(g, 560, 860, '计算图像', RED, ap(lt, L[7], 0.5), 32); chip(g, 560, 940, '与狄拉克负能量海等价', GOLD, ap(lt, L[8] - 0.8, 0.5), 28);
  };
  function fline(g, pts, col, a, p, arrowAt, rev) {        // fermion line through points with an arrow in the middle of its first part
    if (a <= 0 || p <= 0) return; g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.fillStyle = col; g.lineWidth = 4; g.shadowColor = col; g.shadowBlur = 8; g.lineJoin = 'round'; g.beginPath();
    var tot = 0, ls = []; for (var i = 0; i < pts.length - 1; i++) { var l = Math.hypot(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1]); ls.push(l); tot += l; } var run = tot * p; g.moveTo(pts[0][0], pts[0][1]);
    for (var i = 0; i < pts.length - 1; i++) { var u = Math.min(1, Math.max(0, run / ls[i])); run -= ls[i]; if (u <= 0) break; g.lineTo(pts[i][0] + (pts[i + 1][0] - pts[i][0]) * u, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * u); } g.stroke();
    if (p > 0.6) (arrowAt || [0]).forEach(function (k) { var A = pts[k], B = pts[k + 1], mx = (A[0] + B[0]) / 2, my = (A[1] + B[1]) / 2, an = Math.atan2(B[1] - A[1], B[0] - A[0]) + (rev ? Math.PI : 0); g.save(); g.translate(mx, my); g.rotate(an); g.beginPath(); g.moveTo(11, 0); g.lineTo(-9, -9); g.lineTo(-9, 9); g.fill(); g.restore(); }); g.restore();
  }
  D.graphs = function (g, lt, L) {
    var a = ap(lt, L[0], 0.6), cx = [1260, 1510, 1760], yb = 560, yt = 250, ym = 405, t = lt;
    [0, 1, 2].forEach(function (k) { var p = ap(lt, [L[3], L[8], L[5]][k] - 0.3, 0.7); if (p > 0) { g.save(); g.globalAlpha *= p; g.strokeStyle = 'rgba(160,175,205,0.35)'; g.lineWidth = 2; rr(g, cx[k] - 115, 200, 230, 420, 14); g.stroke(); g.restore(); } });
    var p1 = ap(lt, L[3], 0.7), w1 = E((lt - L[3]) / 1.2);
    if (p1 > 0) { var x = cx[0]; fline(g, [[x - 60, yb], [x - 60, ym], [x - 60, yt]], BLUE, p1, w1, [0]); fline(g, [[x + 60, yb], [x + 60, ym], [x + 60, yt]], BLUE, p1, w1, [0]); wavy(g, x - 60, ym, x + 60, ym, 11, 16, GOLD, p1, E((lt - L[3] - 0.5) / 0.8), t * 6); txt(g, '电子散射', x, 660, 26, INK, 'center', p1, 900); txt(g, '一个光子', x, 696, 22, DIM, 'center', p1, 700); }
    var p2 = ap(lt, L[8] - 0.3, 0.7); if (p2 > 0) { var x = cx[1]; var w2 = E((lt - L[8] + 0.3) / 1.2); fline(g, [[x - 60, yb], [x - 40, ym], [x + 40, ym]], BLUE, p2, w2, [0]); fline(g, [[x + 40, ym], [x + 60, yb]], RED, p2, E((lt - L[8] - 0.4) / 0.8), [0], false);
      wavy(g, x - 40, ym, x - 80, yt, 8, 14, GOLD, p2, E((lt - L[8] - 0.6) / 0.8), t * 6); wavy(g, x + 40, ym, x + 80, yt, 8, 14, GOLD, p2, E((lt - L[8] - 0.6) / 0.8), t * 6); txt(g, '电子 + 正电子 → 两个光子', x, 660, 24, INK, 'center', p2, 900); txt(g, '正电子 = 倒着走的电子', x, 696, 22, RED, 'center', p2, 700); }
    var p3 = ap(lt, L[5] - 0.3, 0.7); if (p3 > 0) { var x = cx[2]; fline(g, [[x - 60, yb], [x - 60, 330 + 180], [x - 60, yt]], BLUE, p3, E((lt - L[5] + 0.3) / 1.0), [0]); fline(g, [[x + 60, yb], [x + 60, yt]], BLUE, p3, E((lt - L[5] + 0.3) / 1.0), [0]);
      wavy(g, x - 60, 380, x + 60, 380, 9, 14, GOLD, p3, E((lt - L[5]) / 0.8), t * 6); wavy(g, x - 60, 470, x + 60, 470, 9, 14, GOLD, p3, E((lt - L[5] - 0.3) / 0.8), t * 6); txt(g, '两个光子', x, 660, 26, INK, 'center', p3, 900); txt(g, '更小的修正', x, 696, 22, DIM, 'center', p3, 700); }
    txt(g, '时间 ↑', 1150, 225, 24, DIM, 'center', ap(lt, L[3], 0.5), 700);
    fm(g, 'series', 112, 700, 56, 'l', ap(lt, L[5], 0.4), E((lt - L[5]) / 1.6));
    var b = ap(lt, L[7], 0.5); if (b > 0) { var items = [['α', '1', GOLD], ['α²', '0.73%', BLUE], ['α³', '0.0053%', VIO]]; items.forEach(function (it, k) { var x = 150 + k * 300, y = 830; g.save(); g.globalAlpha *= b * E((lt - L[7] - k * 0.5) / 0.5); card(g, x, y - 50, 250, 110, it[2], 1); g.restore(); txt(g, it[0], x + 55, y + 18, 44, it[2], 'center', b * E((lt - L[7] - k * 0.5) / 0.5), 900); txt(g, it[1], x + 170, y + 14, 34, INK, 'center', b * E((lt - L[7] - k * 0.5) / 0.5), 900); });
      txt(g, '各项相对大小（系数按 1 估计）', 112, 925, 22, DIM, 'left', b, 500); }
  };
  // war years: complex energies, the 1+1-dimensional checkerboard
  D.war = function (g, lt, L) {
    var a = ap(lt, L[2], 0.6); if (a > 0) { g.save(); g.globalAlpha *= a; g.strokeStyle = 'rgba(200,210,230,0.4)'; g.lineWidth = 2; g.beginPath(); g.moveTo(1130, 250); g.lineTo(1830, 250); g.stroke(); g.restore();
      g.save(); g.globalAlpha *= a; g.strokeStyle = BLUE; g.lineWidth = 3.5; g.shadowColor = BLUE; g.shadowBlur = 8; g.beginPath(); for (var x = 0; x <= 700; x += 4) { var t = x / 700 * 6, env = Math.exp(-0.28 * t * ap(lt, L[2] + 0.5, 1.0)); g.lineTo(1130 + x, 250 - 70 * env * Math.cos(t * 5)); } g.stroke(); g.restore();
      g.save(); g.globalAlpha *= a * 0.7; g.strokeStyle = RED; g.setLineDash([8, 8]); g.beginPath(); for (var x = 0; x <= 700; x += 6) { var t = x / 700 * 6; g.lineTo(1130 + x, 250 - 70 * Math.exp(-0.28 * t)); } g.stroke(); g.setLineDash([]); g.restore(); chip(g, 1480, 140, '能量带虚部：E = a − ib', RED, a, 26); }
    var b = ap(lt, L[3], 0.5); if (b > 0) { var segs = [0.28, 0.22, 0.18, 0.14, 0.1], x = 1150, W = 660, yb = 350, cols = [GOLD, BLUE, VIO, GRN, '#e8a0c8']; segs.forEach(function (s, k) { g.save(); g.globalAlpha *= b; g.fillStyle = rgba(cols[k], 0.85); g.fillRect(x, yb, W * s, 46); g.restore(); x += W * s; });
      g.save(); g.globalAlpha *= b; g.strokeStyle = RED; g.lineWidth = 3; g.setLineDash([6, 6]); g.strokeRect(x, yb, 1150 + W - x, 46); g.setLineDash([]); g.restore(); txt(g, '概率之和 < 1', 1480, yb + 90, 30, RED, 'center', b, 900); }
    var c = ap(lt, L[4], 0.6); if (c > 0) { g.save(); g.globalAlpha *= c * 0.45; g.beginPath(); g.rect(1130, 590, 700, 390); g.clip(); g.strokeStyle = 'rgba(160,175,205,0.6)'; g.lineWidth = 1.5; for (var i = -10; i <= 24; i++) { g.beginPath(); g.moveTo(1100 + i * 60, 980); g.lineTo(1100 + i * 60 + 400, 580); g.stroke(); g.beginPath(); g.moveTo(1100 + i * 60 + 400, 980); g.lineTo(1100 + i * 60, 580); g.stroke(); } g.restore();
      var path = [[1300, 960], [1360, 900], [1420, 840], [1480, 780], [1420, 720], [1480, 660], [1540, 600]]; var pr = E((lt - L[5]) / 3.0), tot = 0; for (var i = 0; i < path.length - 1; i++) tot += Math.hypot(path[i + 1][0] - path[i][0], path[i + 1][1] - path[i][1]);
      var run = pr * tot; g.save(); g.globalAlpha *= c; g.strokeStyle = GOLD; g.lineWidth = 5; g.shadowColor = GOLD; g.shadowBlur = 10; g.beginPath(); g.moveTo(path[0][0], path[0][1]); for (var i = 0; i < path.length - 1; i++) { var l = Math.hypot(path[i + 1][0] - path[i][0], path[i + 1][1] - path[i][1]), u = Math.max(0, Math.min(1, run / l)); run -= l; if (u <= 0) break; g.lineTo(path[i][0] + (path[i + 1][0] - path[i][0]) * u, path[i][1] + (path[i + 1][1] - path[i][1]) * u); } g.stroke(); g.restore();
      var rv = ap(lt, L[6], 0.5); [3, 4, 5].forEach(function (k) { if (rv > 0 && pr > 0.4) glowDot(g, path[k][0], path[k][1], 8, RED, rv); }); if (rv > 0) txt(g, '每折返一次，× 一个因子', 1680, 780, 26, RED, 'center', rv, 900);
      txt(g, '一维 · 粒子只以光速走', 1480, 1030, 26, DIM, 'center', c, 700); }
    var d = ap(lt, L[7], 0.5); if (d > 0) { check(g, 1290, 520, E((lt - L[7] - 0.2) / 0.6), GRN, d); txt(g, '一维狄拉克方程', 1325, 530, 28, GRN, 'left', d, 900); }
    var e = ap(lt, L[8], 0.5); if (e > 0) { txt(g, '三维？', 1690, 890, 44, RED, 'center', e, 900); cross(g, 1690, 878, 64, RED, e, E((lt - L[8] - 0.3) / 0.5)); }
  };
  // Lamb shift
  D.lamb = function (g, lt, L) {
    var a = ap(lt, L[1], 0.6), x0 = 1260, x1 = 1700, yD = 560, sp = E((lt - L[3]) / 1.4);
    if (a > 0) { txt(g, 'n = 2', 1200, 400, 26, DIM, 'center', a, 700); var y2S = yD - 85 * sp, y2P = yD + 85 * sp;
      g.save(); g.globalAlpha *= a; g.lineWidth = 7; g.lineCap = 'round'; g.strokeStyle = GOLD; g.shadowColor = GOLD; g.shadowBlur = 12; g.beginPath(); g.moveTo(x0, y2S); g.lineTo(x1, y2S); g.stroke(); g.strokeStyle = BLUE; g.shadowColor = BLUE; g.beginPath(); g.moveTo(x0, y2P); g.lineTo(x1, y2P); g.stroke(); g.restore();
      txt(g, '2S', x0 - 30, y2S + 10, 34, GOLD, 'right', a, 900); txt(g, '2P', x0 - 30, y2P + 10, 34, BLUE, 'right', a, 900);
      if (sp > 0.5) { aline(g, 1560, y2P - 8, 1560, y2S + 8, RED, a, 1, 4, true); aline(g, 1560, y2S + 8, 1560, y2P - 8, RED, a, 1, 4, true); txt(g, '≈ 1058 MHz', 1600, yD + 12, 32, RED, 'left', a * sp, 900); txt(g, '兰姆位移', 1600, yD + 52, 24, DIM, 'left', a * sp, 700); }
      txt(g, '狄拉克方程：两条线重合', 1480, 760, 26, DIM, 'center', a * (1 - ap(lt, L[3], 0.5)), 700); }
    chip(g, 1480, 250, '兰姆 · 1947 · 实验', GOLD, ap(lt, L[3], 0.5), 28); chip(g, 1480, 880, '贝特 · 1947 · 估算', BLUE, ap(lt, L[4], 0.5), 28);
    fm(g, 'lamb', 112, 640, 60, 'l', ap(lt, L[3], 0.4), E((lt - L[3]) / 1.0));
    var m = ap(lt, L[7], 0.5); if (m > 0) { var x = 112, y = 860, W = 620; g.save(); g.globalAlpha *= m; g.fillStyle = rgba(GOLD, 0.85); g.fillRect(x, y, W * 0.7, 54); g.fillStyle = rgba(RED, 0.8); g.fillRect(x + W * 0.7, y, W * 0.3, 54); g.restore(); txt(g, '裸质量', x + W * 0.35, y + 38, 26, '#1a1206', 'center', m, 900); txt(g, '自能（发散）', x + W * 0.85, y + 38, 22, '#fff', 'center', m, 900);
      var n = ap(lt, L[8], 0.5); txt(g, '= 测得的质量 m', x + W / 2, y + 108, 30, GOLD, 'center', n, 900); }
  };
  // mass renormalisation
  D.renorm = function (g, lt, L) {
    fm(g, 'ren1', 112, 610, 76, 'l', ap(lt, L[1], 0.4), E((lt - L[1]) / 1.2)); fm(g, 'ren2', 112, 770, 76, 'l', ap(lt, L[3], 0.4), E((lt - L[3]) / 1.6), rgba(GOLD, 0.3)); fm(g, 'alpha', 112, 930, 50, 'l', ap(lt, L[3] + 0.6, 0.4), E((lt - L[3] - 0.6) / 1.2));
    var a = ap(lt, L[3], 0.6), gx = 1180, gy = 880, gw = 620, gh = 640; var X = function (v) { return gx + gw * (v + 3.3) / 22.5; }, Y = function (v) { return gy - gh * v / 0.2; };
    if (a > 0) { axes2(g, gx, gy, gw + 30, gh + 20, '', 'δm / m', a, 1); mono(g, 'log10 ( Λ / GeV )', gx + gw / 2, gy + 70, 20, DIM, 'center', a); [0, 5, 10, 15].forEach(function (v) { g.save(); g.globalAlpha *= a; g.strokeStyle = 'rgba(200,210,230,0.5)'; g.beginPath(); g.moveTo(X(v), gy); g.lineTo(X(v), gy + 8); g.stroke(); g.restore(); mono(g, '10^' + v, X(v), gy + 30, 18, DIM, 'center', a); });
      [0.05, 0.1, 0.15, 0.2].forEach(function (v) { mono(g, Math.round(v * 100) + '%', gx - 12, Y(v) + 6, 18, DIM, 'right', a); });
      var p = E((lt - L[4]) / 2.0), xe = -3.3 + 22.4 * p; g.save(); g.globalAlpha *= a; g.strokeStyle = GOLD; g.lineWidth = 5; g.shadowColor = GOLD; g.shadowBlur = 10; g.beginPath(); g.moveTo(X(-3.3), Y(0)); g.lineTo(X(xe), Y(0.008023 * (xe + 3.29))); g.stroke(); g.restore();
      if (p > 0.1) glowDot(g, X(xe), Y(0.008023 * (xe + 3.29)), 9, RED, a);
      var tv = ap(lt, L[5], 0.5); if (tv > 0) { glowDot(g, X(3), Y(0.0505), 7, BLUE, tv); mono(g, '1 TeV: 5%', X(3) + 14, Y(0.0505) + 34, 20, BLUE, 'left', tv); }
      var pl = ap(lt, L[6], 0.5); if (pl > 0) { glowDot(g, X(19.09), Y(0.1795), 11, GOLD, pl); txt(g, '普朗克尺度：18%', X(19.09) - 20, Y(0.1795) - 36, 34, GOLD, 'right', pl, 900); } }
  };
  // Feynman's own cut-off and the unitarity problem
  D.cutoff = function (g, lt, L) {
    var a = ap(lt, L[1], 0.6), yb = 380;
    if (a > 0) { g.save(); g.globalAlpha *= a; g.strokeStyle = 'rgba(200,210,230,0.45)'; g.lineWidth = 2; g.beginPath(); g.moveTo(1140, yb); g.lineTo(1830, yb); g.stroke(); g.restore();
      aline(g, 1290, yb, 1290, yb - 220, GOLD, a, 1, 6, true); txt(g, 'δ', 1330, yb - 200, 40, GOLD, 'left', a, 900); txt(g, '严格的点', 1290, yb + 44, 24, DIM, 'center', a, 700);
      var ww = 90 - 70 * E((lt - L[4]) / 3.0), h = 200 * 90 / ww * 0.5; h = Math.min(h, 230); var p = ap(lt, L[1] + 0.6, 0.5); g.save(); g.globalAlpha *= a * p; g.strokeStyle = BLUE; g.fillStyle = rgba(BLUE, 0.22); g.lineWidth = 4; g.shadowColor = BLUE; g.shadowBlur = 10; g.beginPath(); g.moveTo(1500 - 3 * ww, yb); for (var x = -3 * ww; x <= 3 * ww; x += 3) g.lineTo(1500 + x, yb - h * Math.exp(-x * x / (2 * ww * ww))); g.lineTo(1500 + 3 * ww, yb); g.fill(); g.stroke(); g.restore();
      txt(g, '宽度 a 的窄峰 f', 1500, yb + 44, 24, BLUE, 'center', a * p, 700); }
    var x = 1170, W = 640, yg = 760; var gg = ap(lt, L[7] - 0.5, 0.6); if (gg > 0) { var segs = [0.3, 0.24, 0.18, 0.12], cols = [GOLD, BLUE, VIO, GRN], lost = 0.06 + 0.05 * E((lt - L[8]) / 2.5), xx = x; segs.forEach(function (s, k) { g.save(); g.globalAlpha *= gg; g.fillStyle = rgba(cols[k], 0.85); g.fillRect(xx, yg, W * s, 50); g.restore(); xx += W * s; });
      g.save(); g.globalAlpha *= gg; g.strokeStyle = RED; g.lineWidth = 3; g.setLineDash([6, 6]); g.strokeRect(xx, yg, x + W - xx, 50); g.setLineDash([]); g.fillStyle = rgba(RED, 0.9); g.restore(); txt(g, '各结果的概率', x, yg - 18, 24, DIM, 'left', gg, 700); txt(g, '加起来 < 1', x + W / 2, yg + 100, 34, RED, 'center', gg, 900); }
    fm(g, 'cut1', 112, 640, 58, 'l', ap(lt, L[1], 0.4), E((lt - L[1] - 0.3) / 1.0)); fm(g, 'cut2', 112, 770, 56, 'l', ap(lt, L[3], 0.4), E((lt - L[3]) / 1.0)); fm(g, 'unit', 112, 900, 58, 'l', ap(lt, L[7], 0.4), E((lt - L[7]) / 1.0), rgba(RED, 0.4));
  };
  // "sweep under the rug"
  D.rug = function (g, lt, L) {
    var a = ap(lt, L[3] - 0.2, 0.7);
    if (a > 0) { var x0 = 1140, x1 = 1830, y0 = 400, y1 = 560; g.save(); g.globalAlpha *= a; g.beginPath(); g.moveTo(x0 + 50, y0); g.lineTo(x1, y0); g.lineTo(x1 - 50, y1); g.lineTo(x0, y1); g.closePath(); var gr = g.createLinearGradient(0, y0, 0, y1); gr.addColorStop(0, '#6a2326'); gr.addColorStop(1, '#41141a'); g.fillStyle = gr; g.shadowColor = 'rgba(0,0,0,0.7)'; g.shadowBlur = 20; g.fill(); g.shadowBlur = 0; g.strokeStyle = rgba(GOLD, 0.8); g.lineWidth = 3; g.stroke();
      g.strokeStyle = rgba(GOLD, 0.35); g.lineWidth = 2; for (var i = 0; i < 9; i++) { var u = (i + 0.5) / 9; g.beginPath(); g.moveTo(x0 + 50 + (x1 - x0 - 50) * u - 20, y0 + 20); g.lineTo(x0 + (x1 - x0 - 50) * u + 40, y1 - 20); g.stroke(); }
      g.strokeStyle = '#8a5a3a'; g.lineWidth = 3; for (var i = 0; i < 40; i++) { var xx = x0 + (x1 - x0) * i / 39; g.beginPath(); g.moveTo(xx - 25 * (1 - i / 39) + 25 * 0, y1); g.lineTo(xx - 26 + 26 * (i / 39), y1 + 22); g.stroke(); }
      var lump = ap(lt, L[4], 1.5); var lx = 1480 + 60 * Math.sin(lt * 0.8); g.fillStyle = 'rgba(255,255,255,' + (0.12 * lump).toFixed(3) + ')'; g.beginPath(); g.ellipse(lx, y0 + 80, 150 * lump, 36 * lump, 0, 0, 6.29); g.fill(); g.restore();
      for (var k = 0; k < 4; k++) { var u = ((lt * 0.35 + k / 4) % 1), xx = 1140 + u * 330, al = a * (1 - E((u - 0.8) / 0.2)); txt(g, '∞', xx, 340 - 30 * Math.sin(u * 3.14), 60, RED, 'center', al * ap(lt, L[3], 0.5), 900); }
      txt(g, '重整化', 1480, y0 + 100, 34, '#f6dfae', 'center', a * ap(lt, L[4], 0.5), 900); }
    var b = ap(lt, L[6], 0.6); if (b > 0) { txt(g, '电子磁矩', 1150, 720, 28, DIM, 'left', b, 700); [['理论', 780, GOLD], ['实验', 850, BLUE]].forEach(function (r, k) { g.save(); g.globalAlpha *= b * E((lt - L[6] - 0.3 * k) / 0.8); g.fillStyle = rgba(r[2], 0.85); g.fillRect(1150, r[1], 640 * E((lt - L[6] - 0.3 * k) / 1.0), 44); g.restore(); txt(g, r[0], 1130, r[1] + 33, 26, r[2], 'right', b, 900); }); }
    var c = ap(lt, L[7], 0.5); if (c > 0) chip(g, 1480, 960, '差距小于十亿分之一', GOLD, c, 32);
  };
  D.unused = function (g, lt, L) {
    var items = [['半超前、半推迟的相互作用', 3, 200], ['那个只含世界线的作用量', 4, 330], ['“电荷不作用于自己”', 5, 460]];
    items.forEach(function (it) { var p = ap(lt, L[it[1]] - 0.3, 0.6); if (p > 0) { card(g, 1090, it[2], 740, 100, BLUE, p); txt(g, it[0], 1460, it[2] + 64, 36, INK, 'center', p, 900); strike(g, 1130, 1790, it[2] + 50, p, E((lt - L[it[1]] - 0.2) / 0.5)); } });
    var r = ap(lt, L[7], 0.6); if (r > 0) { card(g, 1090, 660, 740, 190, GOLD, r); txt(g, '真正算出诺奖结果的', 1460, 720, 28, DIM, 'center', r, 700); txt(g, '原来的量子电动力学', 1460, 785, 44, GOLD, 'center', r, 900); txt(g, '只是换了一种写法', 1460, 830, 26, INK, 'center', ap(lt, L[8], 0.5), 700); }
  };
  D.views = function (g, lt, L) {
    var cols = [[330, 'v1', '薛定谔 · 波动力学', GOLD, L[1]], [960, 'v2', '海森堡 · 矩阵力学', BLUE, L[2]], [1590, 'v3', '费曼 · 路径积分', GRN, L[2] + 0.6]];
    cols.forEach(function (c) { var p = ap(lt, c[4], 0.6); if (p > 0) { card(g, c[0] - 280, 520, 560, 250, c[3], p); txt(g, c[2], c[0], 575, 30, c[3], 'center', p, 900); fm(g, c[1], c[0], 665, c[1] === 'v2' ? 58 : 62, 'c', p, E((lt - c[4] - 0.2) / 0.9)); } });
    var e = ap(lt, L[3], 0.6); if (e > 0) { [330, 960, 1590].forEach(function (x) { aline(g, x, 780, 960, 850, DIM, e, 1, 3, true); }); fm(g, 'En', 960, 930, 64, 'c', e, E((lt - L[3] - 0.4) / 0.9), rgba(GOLD, 0.4)); txt(g, '预言完全等价', 1450, 940, 30, GOLD, 'left', e, 900); }
    var f = ap(lt, L[4], 0.6); if (f > 0) { chip(g, 960, 460, '但往未知处走：提示的改动不同', RED, f, 30); }
  };
  D.mother = function (g, lt, L) {
    var a = ap(lt, L[1], 0.7) * (1 - 0.55 * ap(lt, L[3], 0.8)); if (a > 0) { card(g, 1100, 200, 700, 250, BLUE, a); fm(g, 'S2', 1450, 330, 40, 'c', a * 0.75, 1); txt(g, '“电荷不作用于自己”', 1450, 245, 28, DIM, 'center', a, 700); }
    var m = ap(lt, L[3], 0.7); if (m > 0) { glowDot(g, 1450, 600, 40, '#caa24a', m * 0.25); txt(g, '年迈的母亲', 1450, 535, 30, DIM, 'center', m, 700); }
    var kids = [['路径积分', 1180, GOLD], ['倒着走的电子', 1450, BLUE], ['时空图像', 1720, GRN]]; kids.forEach(function (k, i) { var p = ap(lt, L[4] + i * 0.35, 0.7); if (p > 0) { aline(g, 1450, 650, k[1], 760, k[2], p * 0.7, 1, 3, true); g.save(); g.globalAlpha *= p; glowDot(g, k[1], 800, 16, k[2], 1); g.restore(); txt(g, k[0], k[1], 880, 30, k[2], 'center', p, 900); } });
    var n = ap(lt, L[6], 0.7); if (n > 0) { var k = n < 1 ? 1 + 0.2 * (1 - eo(n)) : 1; g.save(); g.globalAlpha *= n; g.translate(1450, 990); g.scale(k, k); var gr = g.createRadialGradient(-10, -10, 4, 0, 0, 56); gr.addColorStop(0, '#fff0b8'); gr.addColorStop(1, '#a8761f'); g.fillStyle = gr; g.shadowColor = GOLD; g.shadowBlur = 24; g.beginPath(); g.arc(0, 0, 54, 0, 6.29); g.fill(); g.shadowBlur = 0; g.fillStyle = '#4a3410'; g.font = '900 30px ' + SERIF; g.textAlign = 'center'; g.fillText('1965', 0, 10); g.restore(); }
  };
