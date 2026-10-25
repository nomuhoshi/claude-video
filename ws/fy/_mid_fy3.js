  // Jehle, Dirac 1933: "corresponds to" becomes "equals"
  D.jehle = function (g, lt, L) {
    var m = ap(lt, L[0], 0.7); if (m > 0) { g.save(); g.globalAlpha *= m; g.translate(1330, 360); var gr = g.createLinearGradient(0, -90, 0, 90); gr.addColorStop(0, '#f4d98c'); gr.addColorStop(1, '#c9932c'); g.fillStyle = 'rgba(220,235,255,0.14)'; g.strokeStyle = '#d9e6ff'; g.lineWidth = 4;
      g.beginPath(); g.moveTo(-70, -100); g.lineTo(70, -100); g.lineTo(58, 100); g.lineTo(-58, 100); g.closePath(); g.fill(); g.stroke(); g.fillStyle = gr; g.beginPath(); g.moveTo(-64, -40); g.lineTo(64, -40); g.lineTo(58, 98); g.lineTo(-58, 98); g.closePath(); g.fill();
      g.fillStyle = '#fff'; for (var i = 0; i < 4; i++) { g.beginPath(); g.arc(-60 + i * 40, -102, 26, 0, 6.29); g.fill(); } g.strokeStyle = '#d9e6ff'; g.beginPath(); g.moveTo(70, -60); g.bezierCurveTo(130, -60, 130, 40, 66, 40); g.stroke(); g.restore(); txt(g, '普林斯顿 · 酒馆聚会', 1330, 520, 26, DIM, 'center', m, 700); }
    var d = ap(lt, L[2], 0.7); if (d > 0) { g.save(); g.globalAlpha *= d; g.translate(1630, 420); g.rotate(0.05); g.fillStyle = '#8e7f62'; g.shadowColor = 'rgba(0,0,0,0.7)'; g.shadowBlur = 24; g.fillRect(-130, -190, 260, 380); g.shadowBlur = 0; g.fillStyle = 'rgba(30,22,12,0.7)'; g.font = '900 30px ' + SERIF; g.textAlign = 'center'; g.fillText('狄拉克', 0, -130); g.font = '500 20px ' + SERIF; g.fillText('1933', 0, -98);
      for (var i = 0; i < 12; i++) g.fillRect(-100, -60 + i * 22, 140 + 60 * rnd(i + 3), 4); g.restore(); mono(g, 'The Lagrangian in', 1630, 665, 19, DIM, 'center', d); mono(g, 'Quantum Mechanics', 1630, 691, 19, DIM, 'center', d); }
    var f1 = ap(lt, L[4] - 0.4, 0.4); fm(g, 'dirac1', 112, 800, 52, 'l', f1, E((lt - L[4] + 0.2) / 1.2));
    var f2 = ap(lt, L[6], 0.4); if (f2 > 0) { fm(g, 'dirac2', 112, 930, 56, 'l', f2, E((lt - L[6] - 0.1) / 1.2), rgba(GOLD, 0.45)); }
    var x = ap(lt, L[5], 0.5); if (x > 0) { txt(g, '类比', 1120, 800, 30, DIM, 'center', x * (1 - ap(lt, L[6], 0.4)), 700); txt(g, '等号', 1000, 936, 32, GOLD, 'center', ap(lt, L[6] + 0.8, 0.4), 900); }
  };
  // the derivation: short-time kernel -> Schroedinger equation
  D.slice = function (g, lt, L) {
    var a = ap(lt, L[0], 0.6), xs = 1540, yT = 190, yB = 400;
    if (a > 0) { g.save(); g.globalAlpha *= a; g.strokeStyle = 'rgba(200,210,230,0.5)'; g.lineWidth = 2; g.beginPath(); g.moveTo(1150, yT); g.lineTo(1830, yT); g.moveTo(1150, yB); g.lineTo(1830, yB); g.stroke(); g.restore();
      mono(g, 't + eps', 1140, yT + 6, 20, DIM, 'right', a); mono(g, 't', 1140, yB + 6, 20, DIM, 'right', a);
      for (var i = -5; i <= 5; i++) { var xy = xs + i * 58; g.save(); g.globalAlpha *= a * 0.55; g.strokeStyle = rgba(BLUE, 1); g.lineWidth = 1.5; g.beginPath(); g.moveTo(xy, yB); g.lineTo(xs, yT); g.stroke(); g.restore(); glowDot(g, xy, yB, 4 + 3 * Math.exp(-i * i / 12), BLUE, a); }
      glowDot(g, xs, yT, 9, GOLD, a); mono(g, 'x', xs + 22, yT - 14, 24, GOLD, 'left', a); mono(g, 'y', 1830, yB + 36, 22, BLUE, 'right', a);
      g.save(); g.globalAlpha *= a * 0.9; g.strokeStyle = rgba(GOLD, 1); g.lineWidth = 2.5; g.beginPath(); for (var x = 1250; x <= 1830; x += 4) { var u = (x - xs) / 140; g.lineTo(x, yB + 10 + 0 - 0 - 8 * Math.exp(-u * u) * 0 - 0); } g.stroke(); g.restore(); }
    var w = [[ 'sl1', 545, 46, L[1] + 0.3, 1.8 ], [ 'sl2', 672, 42, L[3], 1.6 ], [ 'sl3', 789, 48, L[6], 1.4 ], [ 'sl4', 921, 52, L[8] - 0.3, 1.2 ]];
    w.forEach(function (q) { var al = ap(lt, q[3], 0.3); fm(g, q[0], 112, q[1], q[2], 'l', al, E((lt - q[3]) / q[4]), q[0] === 'sl4' ? rgba(GOLD, 0.5) : null); });
    fbox(g, 100, 856, 620, 130, GOLD, ap(lt, L[8] + 0.4, 0.4), E((lt - L[8] - 0.4) / 0.8));
    var hl = ap(lt, L[2], 0.4) * (1 - ap(lt, L[3], 0.4)); fbox(g, 700, 495, 340, 100, BLUE, hl, E((lt - L[2]) / 0.6)); txt(g, '作用在波函数上', 880, 625, 24, BLUE, 'center', hl, 700);
    var A = ap(lt, L[4], 0.4) * (1 - ap(lt, L[5] + 1.2, 0.4)); txt(g, '高斯积分 → A', 1650, 625, 30, GOLD, 'center', A, 900);
    var o = ap(lt, L[5], 0.4); if (o > 0) { chip(g, 1640, 625, '奇次项积分为零', DIM, o * (1 - ap(lt, L[6] + 1.0, 0.4)), 26); }
    var q2 = ap(lt, L[6], 0.4) * (1 - ap(lt, L[8], 0.4)); txt(g, 'η² 的平均 = iħε/m（纯虚）', 1530, 810, 26, GOLD, 'center', q2 * 0, 700); if (q2 > 0) txt(g, '二次项：系数纯虚', 1600, 765, 30, GOLD, 'center', q2, 900);
  };
  // path integral: slice the time, sum over all paths
  D.sum = function (g, lt, L) {
    var a = ap(lt, L[0], 0.6), N = Math.round(3 + 22 * E((lt - L[1]) / 5)), x0 = 1140, x1 = 1800, yA = 330, yr = 130; var P = { };
    if (a > 0) {
      for (var k = 0; k <= N; k++) { var xx = x0 + (x1 - x0) * k / N; g.save(); g.globalAlpha *= a * 0.35; g.strokeStyle = 'rgba(200,210,230,0.5)'; g.lineWidth = 1; g.beginPath(); g.moveTo(xx, yA - 150); g.lineTo(xx, yA + 150); g.stroke(); g.restore(); }
      for (var p = 0; p < 26; p++) { g.save(); g.globalAlpha *= a * (0.25 + 0.4 * rnd(p + 4)); g.strokeStyle = BLUE; g.lineWidth = 1.8; g.beginPath(); g.moveTo(x0, yA);
        for (var k = 1; k < N; k++) { var u = k / N, off = (rnd(p * 31 + k * 7 + N * 3) - 0.5) * 2 * 170 * Math.sin(u * Math.PI) / Math.pow(N / 3, 0.2); g.lineTo(x0 + (x1 - x0) * u, yA + off); } g.lineTo(x1, yA); g.stroke(); g.restore(); }
      g.save(); g.globalAlpha *= a; g.strokeStyle = GOLD; g.lineWidth = 3.5; g.shadowColor = GOLD; g.shadowBlur = 10; g.beginPath(); g.moveTo(x0, yA); g.lineTo(x1, yA); g.stroke(); g.restore();
      glowDot(g, x0, yA, 8, GOLD, a); glowDot(g, x1, yA, 8, GOLD, a); mono(g, 'A', x0 - 22, yA + 8, 24, GOLD, 'right', a); mono(g, 'B', x1 + 22, yA + 8, 24, GOLD, 'left', a); mono(g, 'N = ' + N, 1470, yA + 190, 24, DIM, 'center', a); }
    fm(g, 'Kslice', 112, 560, 50, 'l', ap(lt, L[1], 0.4), E((lt - L[1] - 0.3) / 1.6));
    fm(g, 'Kpath', 112, 720, 90, 'l', ap(lt, L[2], 0.4), E((lt - L[2]) / 1.4), rgba(GOLD, 0.35));
    fm(g, 'Sx', 112 + 10, 880, 56, 'l', ap(lt, L[4], 0.4), E((lt - L[4]) / 1.0)); fm(g, 'prob', 112 + 560, 880, 56, 'l', ap(lt, L[6], 0.4), E((lt - L[6]) / 1.0));
    var r = ap(lt, L[7], 0.5); if (r > 0) { fbox(g, 100, 665, 1150, 110, GOLD, r, E((lt - L[7]) / 0.8)); chip(g, 1370, 720, '值得记住', GOLD, r, 34); }
  };
  // stationary phase: phasor spiral
  D.sp = function (g, lt, L) {
    var cx = 1470, cy = 650, a = ap(lt, L[0], 0.6);
    var kap = 1 + 59 * E((lt - L[1]) / 5.0), S0 = 330;
    // family of paths (top): colour = phase
    var fa = ap(lt, L[0] + 0.5, 0.6);
    if (fa > 0) { var A = [1140, 330], B = [1800, 330]; for (var i = -12; i <= 12; i++) { var da = i / 12, ph = kap * da * da * 1.0; var hue = ((ph / 6.283) % 1 + 1) % 1 * 360; g.save(); g.globalAlpha *= fa * (i === 0 ? 1 : 0.7); g.strokeStyle = i === 0 ? GOLD : 'hsl(' + hue.toFixed(0) + ',75%,62%)'; g.lineWidth = i === 0 ? 4.5 : 2; g.beginPath();
      for (var j = 0; j <= 40; j++) { var u = j / 40, y = 330 - 150 * 4 * u * (1 - u) * 0 - 110 * Math.sin(Math.PI * u) * 0 - 90 * 4 * u * (1 - u) + da * 70 * Math.sin(Math.PI * u); g.lineTo(A[0] + (B[0] - A[0]) * u, y + 130 * 0 + 90); } g.stroke(); g.restore(); }
      glowDot(g, A[0], A[1] + 90, 7, GOLD, fa); glowDot(g, B[0], B[1] + 90, 7, GOLD, fa); txt(g, '路径族：颜色 = 相位', 1470, 150, 26, DIM, 'center', fa, 700); }
    // spiral
    var sa = ap(lt, L[1], 0.6); if (sa > 0) {
      var n = 700, sx = 0, sy = 0, pts = [], amax = 1.0, da2 = 2 * amax / n; var cut = Math.PI / Math.sqrt(kap) * 0.9; var gold = ap(lt, L[4], 0.5);
      for (var i = 0; i <= n; i++) { var aa = -amax + i * da2; pts.push([sx, sy, aa]); sx += Math.cos(kap * aa * aa) * da2; sy += Math.sin(kap * aa * aa) * da2; }
      var ex = sx, ey = sy, mx = 0, my = 0; var sx0 = pts[0][0], sy0 = pts[0][1];
      // centre the spiral about its midpoint
      var cxm = (pts[0][0] + ex) / 2, cym = (pts[0][1] + ey) / 2; var oxs = cx - cxm * S0, oys = cy - cym * S0;
      g.save(); g.globalAlpha *= sa; g.lineWidth = 3; g.lineJoin = 'round';
      var segs = [[0, 0, BLUE]]; for (var pass = 0; pass < 2; pass++) { g.beginPath(); var on = false; for (var i = 0; i <= n; i++) { var inside = Math.abs(pts[i][2]) <= cut; if ((pass === 1) !== (inside && gold > 0)) { on = false; continue; } var X = oxs + pts[i][0] * S0, Y = oys + pts[i][1] * S0; if (!on) { g.moveTo(X, Y); on = true; } else g.lineTo(X, Y); }
        g.strokeStyle = pass ? GOLD : rgba(BLUE, 0.85); g.lineWidth = pass ? 5 : 3; g.shadowColor = pass ? GOLD : BLUE; g.shadowBlur = pass ? 12 : 4; g.stroke(); }
      g.shadowBlur = 0; g.restore();
      aline(g, oxs + pts[0][0] * S0, oys + pts[0][1] * S0, oxs + ex * S0, oys + ey * S0, RED, sa * ap(lt, L[2], 0.5), 1, 5, true);
      var len = Math.hypot(ex, ey); txt(g, '合成箭头长度 ' + (len * 100).toFixed(0), cx, 940, 28, RED, 'center', sa * ap(lt, L[2], 0.5), 900); mono(g, 'S/hbar = ' + kap.toFixed(0), cx, 995, 24, DIM, 'center', sa);
      var tx = ap(lt, L[3], 0.5); txt(g, '外圈：箭头互相抵消', cx + 300, 760, 26, BLUE, 'center', tx * (1 - ap(lt, L[4], 0.5)), 700); txt(g, '驻值附近：同向叠加', cx, 450, 28, GOLD, 'center', gold, 900); }
    fm(g, 'sp1', 112, 640, 54, 'l', ap(lt, L[1], 0.4), E((lt - L[1] - 0.2) / 1.2)); fm(g, 'sp2', 112, 780, 52, 'l', ap(lt, L[4], 0.4), E((lt - L[4]) / 1.4)); fm(g, 'sp3', 112, 900, 52, 'l', ap(lt, L[6], 0.4), E((lt - L[6]) / 1.2), rgba(GOLD, 0.4));
  };
  // two slits: add arrows, then square
  D.slit = function (g, lt, L) {
    var a = ap(lt, L[0], 0.6), sx = 1150, bx = 1420, scx = 1790, s1 = 330, s2 = 410;
    if (a > 0) { glowDot(g, sx, 370, 10, GOLD, a); g.save(); g.globalAlpha *= a; g.strokeStyle = 'rgba(200,210,230,0.8)'; g.lineWidth = 8; g.beginPath(); g.moveTo(bx, 160); g.lineTo(bx, s1 - 14); g.moveTo(bx, s1 + 14); g.lineTo(bx, s2 - 14); g.moveTo(bx, s2 + 14); g.lineTo(bx, 560); g.stroke(); g.lineWidth = 5; g.beginPath(); g.moveTo(scx, 160); g.lineTo(scx, 580); g.stroke(); g.restore(); }
    var oy = 370 + 150 * Math.sin(lt * 0.9), pa = ap(lt, L[1], 0.5); if (pa > 0) { aline(g, sx, 370, bx, s1, GOLD, pa, 1, 3.5, false); aline(g, bx, s1, scx, oy, GOLD, pa, 1, 3.5, true); aline(g, sx, 370, bx, s2, BLUE, pa, 1, 3.5, false); aline(g, bx, s2, scx, oy, BLUE, pa, 1, 3.5, true); glowDot(g, scx, oy, 8, '#fff', pa); }
    // intensity pattern on the screen
    var pt = ap(lt, L[3], 0.6); if (pt > 0) { g.save(); g.globalAlpha *= pt; g.strokeStyle = GOLD; g.lineWidth = 3.5; g.shadowColor = GOLD; g.shadowBlur = 10; g.beginPath(); for (var y = 170; y <= 570; y += 3) { var d = (y - 370) / 150 * 2.4, I = Math.pow(Math.cos(d * 3.2), 2) * Math.exp(-d * d / 4); g.lineTo(scx + 8 + 90 * I, y); } g.stroke(); g.restore(); }
    // phasor diagram at the observation point
    var ph = (oy - 370) / 150 * 2.4 * 3.2 * 2; var pc = [330, 800], R = 130, p2 = ap(lt, L[1] + 0.5, 0.5);
    if (p2 > 0) { g.save(); g.globalAlpha *= p2; g.strokeStyle = 'rgba(200,210,230,0.3)'; g.lineWidth = 1.5; g.beginPath(); g.arc(pc[0], pc[1], R, 0, 6.29); g.stroke(); g.restore();
      var v1 = [pc[0] - 60 + R * 0.5 * Math.cos(0), pc[1]]; var a1x = R * 0.9, a1y = 0, a2x = R * 0.9 * Math.cos(ph), a2y = -R * 0.9 * Math.sin(ph); var o = [pc[0] - R * 0.9, pc[1] + 0];
      aline(g, o[0], o[1], o[0] + a1x, o[1] + a1y, GOLD, p2, 1, 5, true); aline(g, o[0] + a1x, o[1] + a1y, o[0] + a1x + a2x, o[1] + a1y + a2y, BLUE, p2, 1, 5, true);
      var tp = ap(lt, L[2], 0.5); aline(g, o[0], o[1], o[0] + a1x + a2x, o[1] + a1y + a2y, RED, tp * p2, 1, 6, true); txt(g, '合成', pc[0] + 60, pc[1] + 190, 26, RED, 'center', tp * p2, 900);
      var len = Math.hypot(a1x + a2x, a1y + a2y) / (2 * R * 0.9); txt(g, '强度 = 长度²：' + (len * len).toFixed(2), 760, 800, 28, GOLD, 'left', tp * p2, 900); }
    fm(g, 'slit1', 112, 560, 52, 'l', ap(lt, L[1], 0.4), E((lt - L[1] - 0.4) / 0.8)); fm(g, 'slit2', 112, 640, 46, 'l', ap(lt, L[3], 0.4), E((lt - L[3]) / 1.2));
    chip(g, 1470, 140, '两条路径', GOLD, ap(lt, L[0] + 0.3, 0.5), 28);
    var z = ap(lt, L[6], 0.5); if (z > 0) chip(g, 1470, 700, '同一套预言', GOLD, z, 36);
  };
