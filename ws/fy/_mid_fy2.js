  // radiation reaction: an accelerated charge radiates, so it must feel a drag
  D.rad = function (g, lt, L) {
    var cx = 1450, cy = 560, A = 150, om = 2.1, pos = function (t) { return cx + A * Math.sin(om * t); }, vel = function (t) { return A * om * Math.cos(om * t); };
    var a = ap(lt, L[0] + 0.3, 0.6); g.save(); g.globalAlpha *= a; g.strokeStyle = 'rgba(200,210,230,0.25)'; g.lineWidth = 2; g.setLineDash([8, 10]); g.beginPath(); g.moveTo(cx - A - 40, cy); g.lineTo(cx + A + 40, cy); g.stroke(); g.setLineDash([]); g.restore();
    var rad = ap(lt, L[1], 0.6);
    if (rad > 0) { var T0 = 0.55, fr = (lt / T0) % 1; for (var k = 0; k < 6; k++) { var te = lt - (k + fr) * T0, rd = (lt - te) * 150; if (te < 0) continue; g.save(); g.globalAlpha *= rad * Math.max(0, 1 - (k + fr) / 6) * 0.6; g.strokeStyle = BLUE; g.lineWidth = 3; g.beginPath(); g.arc(pos(te), cy, rd, 0, 6.29); g.stroke(); g.restore(); } }
    var x = pos(lt); glowDot(g, x, cy, 16, GOLD, a); txt(g, 'e', x, cy + 8, 22, '#1a1206', 'center', a, 900);
    chip(g, 1450, 250, '加速的电荷', BLUE, ap(lt, L[1] + 0.2, 0.5), 30);
    fm(g, 'larmor', 112 + 150, 760, 70, 'c', ap(lt, L[2], 0.4), E((lt - L[2] - 0.2) / 1.0)); txt(g, '拉莫尔公式：辐射功率 ∝ a²', 112, 640, 28, DIM, 'left', ap(lt, L[2], 0.4), 700);
    var ar = ap(lt, L[4], 0.5); if (ar > 0) { var v = vel(lt), dir = v >= 0 ? -1 : 1, ml = Math.min(1, Math.abs(v) / 120 + 0.3); aline(g, x, cy + 70, x + dir * 150 * ml, cy + 70, BLUE, ar, 1, 7, true); txt(g, '阻力', x + dir * 80 * ml, cy + 130, 32, BLUE, 'center', ar, 900); }
    var lp = ap(lt, L[5], 0.5); if (lp > 0) { g.save(); g.globalAlpha *= lp; g.strokeStyle = GOLD; g.lineWidth = 4; g.setLineDash([12, 9]); g.lineDashOffset = -lt * 30; g.shadowColor = GOLD; g.shadowBlur = 12; g.beginPath(); g.ellipse(x, cy - 10, 130, 80, 0, 0.3, 6.0); g.stroke(); g.setLineDash([]); g.restore(); txt(g, '自己的场', x, cy - 118, 30, GOLD, 'center', lp, 900); }
    var cr = ap(lt, L[7], 0.4); if (cr > 0) { cross(g, x, cy - 10, 60, RED, cr, E((lt - L[7] - 0.1) / 0.5)); chip(g, 1450, 880, '没有来源：阻力从哪来？', RED, ap(lt, L[8], 0.5), 30); }
  };
  // Wheeler's absorber: the retarded wave goes out, the absorber sends an advanced wave back
  D.absorber = function (g, lt, L) {
    var X0 = 1450, E0 = 640, dx = 280, a = ap(lt, L[0], 0.6);
    g.save(); g.globalAlpha *= a; g.strokeStyle = 'rgba(200,210,230,0.55)'; g.lineWidth = 2.5; g.beginPath(); g.moveTo(1110, 940); g.lineTo(1800, 940); g.moveTo(1110, 940); g.lineTo(1110, 150); g.stroke(); g.restore();
    txt(g, '空间', 1800, 982, 24, DIM, 'right', a, 700); txt(g, '时间', 1100, 140, 24, DIM, 'right', a, 700);
    g.save(); g.globalAlpha *= a; g.setLineDash([6, 9]); g.strokeStyle = 'rgba(200,210,230,0.35)'; g.beginPath(); g.moveTo(X0, 930); g.lineTo(X0, 160); g.stroke(); g.setLineDash([]); g.restore();
    var ab = ap(lt, L[1], 0.6); [X0 - dx, X0 + dx].forEach(function (x) { g.save(); g.globalAlpha *= ab; g.strokeStyle = 'rgba(160,170,190,0.8)'; g.lineWidth = 12; g.beginPath(); g.moveTo(x, 880); g.lineTo(x, 200); g.stroke(); g.restore(); });
    txt(g, '吸收体', X0 - dx, 190, 28, DIM, 'center', ab, 700); txt(g, '吸收体', X0 + dx, 190, 28, DIM, 'center', ab, 700); txt(g, '波源', X0, 980, 26, GOLD, 'center', a, 700);
    glowDot(g, X0, E0, 11, GOLD, ap(lt, L[0] + 0.2, 0.4)); txt(g, '辐射', X0 + 28, E0 + 44, 26, GOLD, 'left', ap(lt, L[2], 0.4), 900);
    var p1 = E((lt - L[2]) / 1.4), half = lt > L[5] + 0.5;
    [-1, 1].forEach(function (s) {
      aline(g, X0 + s * 6, E0 - 8, X0 + s * (dx - 6), E0 - dx + 8, GOLD, ab, p1, 4, true);
      var p2 = E((lt - L[3]) / 1.4); aline(g, X0 + s * (dx + 10), E0 - dx - 4, X0 + s * 16, E0 - 4, BLUE, ab, p2, 4, true);
    });
    txt(g, '推迟波（去）', X0 + 40, E0 - dx * 0.62 - 20, 26, GOLD, 'left', ap(lt, L[2] + 0.8, 0.5), 700); txt(g, '超前波（回）', X0 - 40, E0 - dx * 0.62 - 20, 26, BLUE, 'right', ap(lt, L[3] + 0.8, 0.5), 700);
    if (half) { var h = ap(lt, L[5] + 0.5, 0.6); [-1, 1].forEach(function (s) { aline(g, X0 + s * 10, E0 + 8, X0 + s * (dx - 10), E0 + dx - 8, BLUE, h * 0.8, 1, 3, true); }); txt(g, '一半推迟 + 一半超前', X0, 905, 30, INK, 'center', h, 900); }
    var ok = ap(lt, L[8], 0.5); if (ok > 0) { check(g, 1290, 270, E((lt - L[8] - 0.2) / 0.6), GRN, ok); txt(g, '与吸收体的细节无关', 1318, 280, 30, GRN, 'left', ok, 900); }
  };
  // the action, light cones
  D.act = function (g, lt, L) {
    var a = ap(lt, L[0], 0.6), w1 = function (y) { return 1290 + 26 * Math.sin(y / 80); }, w2 = function (y) { return 1660 + 26 * Math.sin(y / 100 + 1); }, Py = 570, Px = w1(Py);
    g.save(); g.globalAlpha *= a; g.strokeStyle = BLUE; g.lineWidth = 5; g.shadowColor = BLUE; g.shadowBlur = 10; g.beginPath(); for (var y = 930; y >= 170; y -= 6) g.lineTo(w1(y), y); g.stroke();
    g.strokeStyle = RED; g.shadowColor = RED; g.beginPath(); for (var y = 930; y >= 170; y -= 6) g.lineTo(w2(y), y); g.stroke(); g.restore();
    txt(g, '电荷 1', 1290, 975, 26, BLUE, 'center', a, 900); txt(g, '电荷 2', 1660, 975, 26, RED, 'center', a, 900); txt(g, '时间', 1130, 160, 24, DIM, 'center', a, 700);
    function solve(dir) { var y = Py; for (var i = 0; i < 60; i++) { var dxx = w2(y) - Px; y = Py + dir * dxx; } return y; }
    var yf = solve(-1), yp = solve(1); glowDot(g, Px, Py, 10, GOLD, ap(lt, L[4] - 0.4, 0.4));
    var c = ap(lt, L[4], 0.5), p = E((lt - L[4]) / 1.1);
    aline(g, Px, Py, w2(yf), yf, GOLD, c, p, 4, true); aline(g, Px, Py, w2(yp), yp, BLUE, c, E((lt - L[6] + 0.2) / 1.1), 4, true);
    if (c > 0) { glowDot(g, w2(yf), yf, 9, GOLD, c * ap(lt, L[4] + 1.0, 0.3)); txt(g, '未来光锥 · 推迟', 1480, yf - 24, 26, GOLD, 'center', c * ap(lt, L[4] + 1.0, 0.3), 700); }
    var q = ap(lt, L[6] + 0.6, 0.4); if (q > 0) { glowDot(g, w2(yp), yp, 9, BLUE, q); txt(g, '过去光锥 · 超前', 1480, yp + 46, 26, BLUE, 'center', q, 700); }
    fm(g, 'S1', 112, 600, 60, 'l', ap(lt, L[2], 0.4), E((lt - L[2] - 0.2) / 1.0)); fm(g, 'S2', 112, 700, 50, 'l', ap(lt, L[3], 0.4), E((lt - L[3] - 0.2) / 1.6));
    fm(g, 'I2', 112, 810, 48, 'l', ap(lt, L[5], 0.4), E((lt - L[5] - 0.2) / 1.2)); fm(g, 'dI', 112, 920, 44, 'l', ap(lt, L[6], 0.4), E((lt - L[6]) / 1.4));
    var sl = ap(lt, L[8], 0.5); if (sl > 0) { g.save(); g.globalAlpha *= sl; g.strokeStyle = BLUE; g.lineWidth = 4; g.beginPath(); g.arc(Px - 60, 330, 36, 0.6, 5.7); g.stroke(); g.restore(); cross(g, Px - 60, 330, 30, RED, sl, E((lt - L[8] - 0.3) / 0.5)); txt(g, '自作用', Px - 60, 270, 26, RED, 'center', sl, 900); chip(g, 900, 710, 'i ≠ j', RED, ap(lt, L[8], 0.5), 28); }
  };
  // Hamiltonian picture vs the whole history
  D.ham = function (g, lt, L) {
    var ys = [880, 740, 600, 460, 320], a = ap(lt, L[1], 0.6), cx = 1330;
    for (var k = 0; k < 5; k++) { var p = ap(lt, L[2] + k * 0.28, 0.4) * a; if (p <= 0) continue; g.save(); g.globalAlpha *= p; g.strokeStyle = rgba(BLUE, 0.9); g.lineWidth = 3; rr(g, cx - 190, ys[k] - 34, 380, 68, 12); g.fillStyle = 'rgba(14,22,40,0.9)'; g.fill(); g.stroke(); g.restore(); mono(g, 'state at t' + (k + 1), cx, ys[k] + 8, 24, BLUE, 'center', p);
      if (k > 0) aline(g, cx, ys[k - 1] - 36, cx, ys[k] + 40, BLUE, p, 1, 4, true); }
    txt(g, '一步一步推进', 1330, 190, 30, BLUE, 'center', ap(lt, L[3], 0.5), 900);
    var b = ap(lt, L[4], 0.5); if (b > 0) { g.save(); g.globalAlpha *= b; g.strokeStyle = RED; g.lineWidth = 4; g.shadowColor = RED; g.shadowBlur = 12; g.setLineDash([10, 8]); g.lineDashOffset = -lt * 25;
      [[880, 460], [740, 320], [880, 320], [600, 320]].forEach(function (q) { g.beginPath(); g.moveTo(cx + 190, q[0]); g.bezierCurveTo(cx + 290, q[0], cx + 290, q[1], cx + 190, q[1]); g.stroke(); }); g.setLineDash([]); g.restore(); txt(g, '不同时刻绑在一起', 1640, 250, 28, RED, 'center', b, 900); }
    var c = ap(lt, L[6], 0.5); if (c > 0) { for (var k = 0; k < 5; k++) { g.save(); g.globalAlpha *= c; g.strokeStyle = GOLD; g.lineWidth = 3; g.setLineDash([6, 6]); rr(g, cx - 330, ys[k] - 24, 100, 48, 8); g.stroke(); g.setLineDash([]); g.restore(); mono(g, 'field', cx - 280, ys[k] + 7, 18, GOLD, 'center', c); } txt(g, '场变量：记账用', 975, 560, 26, GOLD, 'right', c, 900); }
    var d = ap(lt, L[7], 0.5); if (d > 0) cross(g, 1050, 600, 100, RED, d, E((lt - L[7] - 0.1) / 0.6));
    fm(g, 'sch', 112 + 120, 700, 60, 'c', ap(lt, L[1], 0.4), 1); txt(g, '标准做法', 130, 620, 26, DIM, 'left', ap(lt, L[1], 0.4), 700);
  };
