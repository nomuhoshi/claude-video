  // ================= Newton: scenes n15-n20 (the cannon, 3600, universal gravitation, the Mint, Chaloner, Leibniz) =================
  // trajectories of a cannonball fired horizontally from a mountain top, under an inverse-square pull (cached, integrated once)
  var CAN = null;
  function canPaths() {
    if (CAN) return CAN;
    CAN = [];
    var R = 1, h = 0.12, r0 = R + h, vc = Math.sqrt(1 / r0), sp = [0.6, 0.74, 0.85, 0.94, 1.0], k, n;
    for (k = 0; k < sp.length; k++) {
      var x = 0, y = r0, vx = sp[k] * vc, vy = 0, dt = 0.004, P = [[x, y]], ang = 0;
      for (n = 0; n < 9000; n++) {
        var r = Math.sqrt(x * x + y * y), a = -1 / (r * r * r);
        vx += a * x * dt; vy += a * y * dt; x += vx * dt; y += vy * dt;
        P.push([x, y]);
        if (Math.sqrt(x * x + y * y) < R) break;
        ang += Math.abs(vx * y - vy * x) / (r * r) * dt;
        if (ang > TAU * 1.0 && k === sp.length - 1) break;
      }
      CAN.push(P);
    }
    return CAN;
  }
  DRAW.n15 = function (g, lt, L) {
    var i, k, A = A_(lt, 0.1, 0.7);
    stars(g, 0.8 * A, lt, 71, 80);
    var zoom = eio(pr(lt, L[7] - 0.4, 1.4));
    var p1 = A * (1 - zoom);
    var cx = 50, cy = mix(52, 30, eio(pr(lt, L[4] - 0.3, 1.2))), R = mix(22, 10, eio(pr(lt, L[4] - 0.3, 1.2)));
    if (p1 > 0.01) {
      earthB(g, cx, cy, R, p1, lt);
      // the mountain
      g.save(); g.globalAlpha *= p1; g.fillStyle = '#5a5246'; g.beginPath(); g.moveTo(cx - R * 0.14, cy - R * 0.99); g.lineTo(cx, cy - R * 1.12); g.lineTo(cx + R * 0.14, cy - R * 0.99); g.closePath(); g.fill(); g.restore();
      cannon(g, cx - R * 0.02, cy - R * 1.13, R * 0.05, 0, p1 * A_(lt, L[1], 0.5));
      var P = canPaths(), shots = [[L[2], 0], [L[3], 1], [L[3] + 1.2, 2], [L[4], 3], [L[5] - 0.1, 4]];
      for (k = 0; k < shots.length; k++) {
        var t0 = shots[k][0], path = P[shots[k][1]], ga = A_(lt, t0, 0.2) * p1;
        if (ga <= 0.01) continue;
        var dur = k < 3 ? 1.0 : (k === 3 ? 2.0 : 3.2), m = Math.floor(path.length * clamp((lt - t0) / dur));
        if (k === 4) m = Math.floor(path.length * clamp((lt - t0) / dur));
        g.save(); g.globalAlpha *= ga * (k === 4 ? 1 : 0.75); g.strokeStyle = k === 4 ? GOLD : 'rgba(242,198,107,0.85)'; g.lineWidth = 0.38; g.beginPath();
        for (i = 0; i < m; i += 6) { var X = cx + path[i][0] * R, Y = cy - path[i][1] * R; if (i === 0) g.moveTo(X, Y); else g.lineTo(X, Y); }
        g.stroke(); g.restore();
        if (m > 0) { var q = path[Math.min(m, path.length - 1)]; dot(g, cx + q[0] * R, cy - q[1] * R, 0.45, '#ffffff', ga); }
        if (lt > t0 && lt < t0 + 0.3) glow(g, cx + R * 0.05, cy - R * 1.13, 3, 'rgba(255,200,120,0.9)', ga * (1 - (lt - t0) / 0.3));
      }
      tx(g, '平着打', 26, 18, 1.9, FG, 'center', 800, SANS, A_(lt, L[2], 0.5) * p1 * (1 - A_(lt, L[4] - 0.3, 0.5)));
      var ab = A_(lt, L[4] + 0.4, 0.5) * p1;
      tx(g, '地面往下弯', 80, 20, 1.9, ICE, 'center', 800, SANS, ab);
      tx(g, '炮弹往下掉', 80, 24.4, 1.9, GOLD, 'center', 800, SANS, ab * A_(lt, L[5], 0.5));
      chip(g, 20, 40, '一直在掉，永远落不了地', GOLD, A_(lt, L[6], 0.5) * p1, 'rgba(48,38,12,0.95)');
    }
    // zoom out: the Moon does the same thing
    if (zoom > 0.01) {
      var ex = 30, ey = 30, mr = 26, th = -0.9 + (lt - L[7]) * 0.22, mx = ex + mr * Math.cos(th), my = ey + mr * 0.55 * Math.sin(th);
      earthB(g, ex, ey, 5, zoom, lt);
      ellipsePath(g, ex, ey, mr, mr * 0.55, 'rgba(143,208,255,0.35)', 0.15, zoom, 1, [0.6, 0.6]);
      moonB(g, mx, my, 1.8, zoom);
      var tdx = -Math.sin(th), tdy = 0.55 * Math.cos(th), tn = Math.sqrt(tdx * tdx + tdy * tdy);
      g.save(); g.globalAlpha *= zoom; g.setLineDash([0.6, 0.5]); g.strokeStyle = 'rgba(238,242,248,0.6)'; g.lineWidth = 0.18;
      g.beginPath(); g.moveTo(mx, my); g.lineTo(mx + tdx / tn * 14, my + tdy / tn * 14); g.stroke(); g.restore();
      tx(g, '没有引力：直线飞走', mx + tdx / tn * 14 + 2, my + tdy / tn * 14, 1.6, DIM, 'left', 700, SANS, zoom);
      arrow(g, mx, my, mix(mx, ex, 0.22), mix(my, ey, 0.22), GOLD, 0.35, zoom, 0.9);
      chip(g, 74, 40, '月亮一直在往地球掉', GOLD, A_(lt, L[7] + 0.8, 0.5), 'rgba(48,38,12,0.95)');
    }
  };

  // ---------- n16: 60 Earth radii, 1/3600, 4.9 m vs 1.4 mm ----------
  DRAW.n16 = function (g, lt, L) {
    var i, A = A_(lt, 0.1, 0.7);
    stars(g, 0.6 * A, lt, 81, 60);
    var p1 = W_(lt, 0.1, L[4] - 0.2, 0.7, 0.6);
    if (p1 > 0.01) {
      var ex = 8, ey = 30, u = 1.4;                // 1 Earth radius = 1.4 units: the Moon sits 60 radii away
      earthB(g, ex, ey, u, p1, lt);
      var mx = ex + 60 * u;
      moonB(g, mx, ey, 0.38, p1);
      tx(g, '月亮', mx, ey - 3, 1.7, FG, 'center', 800, SANS, p1); tx(g, '地球', ex + 0.5, ey - 4, 1.7, FG, 'center', 800, SANS, p1);
      var ru = A_(lt, L[1], 0.6) * p1, q = eo(pr(lt, L[1], 1.6));
      ln(g, ex, ey + 4, mix(ex, mx, q), ey + 4, ICE, 0.2, null, ru);
      for (i = 0; i <= 6; i++) { var xx = ex + i * 10 * u; if (xx <= mix(ex, mx, q) + 0.01) { ln(g, xx, ey + 3.2, xx, ey + 4.8, ICE, 0.18, null, ru); tx(g, String(i * 10), xx, ey + 6.6, 1.5, ICE, 'center', 700, SANS, ru); } }
      tx(g, '地球半径的 60 倍', 50, ey + 10.5, 2.0, FG, 'center', 800, SANS, ru * A_(lt, L[1] + 1.2, 0.5));
      var sq = A_(lt, L[2], 0.6) * p1;
      tx(g, '距离 × 60', 50, 15.5, 2.4, FG, 'center', 900, SANS, sq);
      tx(g, '引力 ÷ 60²', 50, 20.5, 2.4, GOLD, 'center', 900, SANS, sq * A_(lt, L[2] + 0.6, 0.5));
      var r3 = A_(lt, L[3], 0.6) * p1;
      chip(g, mx - 6, 21, '只剩 1/3600', GOLD, r3, 'rgba(48,38,12,0.95)');
      // field lines thinning out
      for (i = 0; i < 12; i++) { var t = i / 12 * TAU, len = 3 + 3 * r3; ln(g, ex + Math.cos(t) * (u + 0.4), ey + Math.sin(t) * (u + 0.4), ex + Math.cos(t) * (u + len), ey + Math.sin(t) * (u + len), 'rgba(242,198,107,0.5)', 0.12, null, p1); }
    }
    // one second of falling: apple 4.9 m, Moon 1.4 mm
    var p2 = A_(lt, L[4] - 0.1, 0.7);
    if (p2 > 0.01) {
      var fin = A_(lt, L[6] - 0.1, 0.6);
      var tt = clamp((lt - L[4] - 0.2) / 1.0), ay = 15 + 25 * tt * tt;
      tx(g, '苹果', 22, 12.5, 1.9, FG, 'center', 800, SANS, p2);
      ln(g, 26, 15, 26, 40, 'rgba(238,242,248,0.4)', 0.15, null, p2);
      for (i = 0; i <= 5; i++) { ln(g, 25.3, 15 + i * 5, 26.7, 15 + i * 5, 'rgba(238,242,248,0.5)', 0.12, null, p2); }
      apple(g, 22, ay, 1.1, p2);
      tx(g, '1 秒 · 4.9 米', 22, 44.5, 2.0, GOLD, 'center', 900, SANS, p2 * A_(lt, L[4] + 1.1, 0.4));
      // the Moon with a magnifier
      var ma = A_(lt, L[5], 0.6) * p2;
      moonB(g, 64, 22, 3.2, ma);
      ring(g, 80, 31, 7, ICE, 0.3, ma); ln(g, 85, 36, 89, 40, ICE, 0.6, null, ma);
      ln(g, 66.5, 24.5, 74, 27, 'rgba(143,208,255,0.4)', 0.12, [0.4, 0.4], ma);
      var mm = clamp((lt - L[5] - 0.4) / 1.0);
      ln(g, 76, 28, 84, 28, DIM, 0.15, null, ma); ln(g, 76, 28 + 5.6 * mm, 84, 28 + 5.6 * mm, GOLD, 0.25, null, ma);
      arrow(g, 86, 27.6, 86, 28.2 + 5.6 * mm, GOLD, 0.2, ma * (mm > 0.1 ? 1 : 0), 0.6);
      tx(g, '1 秒 · 约 1.4 毫米', 72, 44.5, 2.0, GOLD, 'center', 900, SANS, ma * A_(lt, L[5] + 1.2, 0.4));
      tx(g, '（放大）', 80, 21.6, 1.5, DIM, 'center', 700, SANS, ma);
      // the check: predicted vs from the real orbit
      if (fin > 0.01) {
        rbox(g, 33, 32.5, 34, 9.5, 0.6, 'rgba(242,198,107,0.6)', 0.18, 'rgba(32,26,10,0.96)', fin);
        tx(g, '按 1/3600 推算：1.36 毫米', 48, 35.6, 1.8, FG, 'center', 800, SANS, fin);
        tx(g, '按月亮轨道实算：1.36 毫米', 48, 39.3, 1.8, FG, 'center', 800, SANS, fin * A_(lt, L[6] + 0.6, 0.4));
        tx(g, '✓', 64, 37.5, 3.0, '#7fe0a0', 'center', 900, SANS, A_(lt, L[6] + 1.0, 0.3));
      }
      var same = A_(lt, L[7], 0.6);
      chip(g, 45, 24, '同一种力', GOLD, same, 'rgba(48,38,12,0.95)');
      arrow(g, 38, 24, 29, 24, GOLD, 0.25, same, 0.8); arrow(g, 52, 24, 59, 22.5, GOLD, 0.25, same, 0.8);
    }
  };

  // ---------- n17: universal gravitation ----------
  DRAW.n17 = function (g, lt, L) {
    var i, A = A_(lt, 0.1, 0.7);
    stars(g, 0.8 * A, lt, 91, 90);
    var p1 = W_(lt, 0.1, L[4] - 0.2, 0.7, 0.6);
    if (p1 > 0.01) {
      var cx = 50, cy = 29;
      sunB(g, cx, cy, 2.6, p1, lt);
      var orb = [[9, 0.9, '#c9b28a'], [15, 0.55, '#6fb6ff'], [23, 0.32, '#e8c27a']];
      for (i = 0; i < orb.length; i++) {
        var R = orb[i][0], th = lt * orb[i][1] + i * 2, px = cx + R * Math.cos(th), py = cy + R * 0.5 * Math.sin(th);
        ellipsePath(g, cx, cy, R, R * 0.5, 'rgba(143,208,255,0.25)', 0.12, p1 * A_(lt, L[1], 0.6));
        dot(g, px, py, 0.9, orb[i][2], p1 * A_(lt, L[1], 0.6));
        arrow(g, px, py, mix(px, cx, 0.25), mix(py, cy, 0.25), 'rgba(242,198,107,0.8)', 0.18, p1 * A_(lt, L[1] + 0.4, 0.5), 0.6);
        if (i === 1) { var mth = lt * 3; dot(g, px + 2.2 * Math.cos(mth), py + 1.3 * Math.sin(mth), 0.35, '#e8e6dc', p1 * A_(lt, L[1] + 0.8, 0.5)); }
      }
      // any two things: two apples on a table pull on each other
      var two = A_(lt, L[2], 0.6) * p1;
      if (two > 0.01) {
        apple(g, 14, 42, 1.1, two); apple(g, 24, 42, 1.1, two);
        arrow(g, 16, 42, 19, 42, GOLD, 0.2, two, 0.6); arrow(g, 22, 42, 19.2, 42, GOLD, 0.2, two, 0.6);
        tx(g, '也有（极弱的）引力', 19, 46, 1.5, DIM, 'center', 700, SANS, two);
      }
      var fm = A_(lt, L[3], 0.6) * p1;
      rbox(g, 66, 36, 30, 10, 0.6, 'rgba(242,198,107,0.5)', 0.15, 'rgba(32,26,10,0.92)', fm);
      tx(g, 'F = G m₁ m₂ / r²', 81, 40.2, 2.4, GOLD, 'center', 900, SANS, fm);
      tx(g, '质量越大越强 · 距离越远越弱', 81, 44, 1.4, FG, 'center', 700, SANS, fm);
    }
    var p2 = A_(lt, L[4] - 0.1, 0.7);
    if (p2 > 0.01) {
      // sky and earth under one rule
      tx(g, '天上', 25, 14, 2.2, ICE, 'center', 900, SANS, p2 * (1 - A_(lt, L[5], 0.5)));
      tx(g, '地上', 75, 14, 2.2, '#7fe0a0', 'center', 900, SANS, p2 * (1 - A_(lt, L[5], 0.5)));
      tx(g, '=', 50, 14, 3, GOLD, 'center', 900, SANS, p2 * (1 - A_(lt, L[5], 0.5)));
      // a comet on a long ellipse
      var cA = 22, cB = 7, cfx = Math.sqrt(cA * cA - cB * cB), ccx = 30, ccy = 30;
      sunB(g, ccx - cfx, ccy, 1.4, p2, lt);
      ellipsePath(g, ccx, ccy, cA, cB, 'rgba(143,208,255,0.3)', 0.14, p2, 1, [0.6, 0.6]);
      var M = (lt * 0.5) % TAU, E = M; for (i = 0; i < 6; i++) E = M + 0.9 * Math.sin(E);
      var kx = ccx + cA * Math.cos(E), ky = ccy + cB * Math.sin(E), sx = ccx - cfx;
      var dx = kx - sx, dy = ky - ccy, dl = Math.sqrt(dx * dx + dy * dy) || 1;
      ln(g, kx, ky, kx + dx / dl * 5, ky + dy / dl * 5, 'rgba(200,230,255,0.6)', 0.5, null, p2);
      dot(g, kx, ky, 0.7, '#ffffff', p2);
      chip(g, 30, 42, '彗星的路线', ICE, A_(lt, L[5], 0.5) * p2);
      // tides: the ocean bulges toward the Moon
      var ex = 74, ey = 29, th = lt * 0.4;
      g.save(); g.globalAlpha *= p2 * 0.55; g.fillStyle = '#3fa8ff'; g.translate(ex, ey); g.rotate(th);
      g.beginPath(); g.ellipse(0, 0, 7.6, 6.4, 0, 0, TAU); g.fill(); g.restore();
      earthB(g, ex, ey, 6, p2, lt);
      moonB(g, ex + 15 * Math.cos(th), ey + 9 * Math.sin(th), 1.3, p2);
      chip(g, 74, 42, '潮水的涨落', '#7fe0a0', A_(lt, L[5] + 0.5, 0.5) * p2);
    }
  };

  // ---------- n18: the Royal Mint, clipped coins, a hundred interrogations ----------
  DRAW.n18 = function (g, lt, L) {
    var i, p1 = W_(lt, 0.1, L[2] - 0.2, 0.7, 0.6);
    if (p1 > 0.01) {
      ground(g, 42, p1, '#232733', '#0d0f15');
      // a stone fortress (the Mint stood inside the Tower of London)
      g.save(); g.globalAlpha *= p1; g.fillStyle = '#4b4a52'; g.fillRect(38, 24, 24, 18);
      for (i = 0; i < 4; i++) { g.fillRect(36 + i * 9, 18, 6, 24); for (var k = 0; k < 3; k++) g.fillRect(36 + i * 9 + k * 2.2, 16.6, 1.4, 1.6); }
      g.fillStyle = '#16141a'; g.beginPath(); g.moveTo(47, 42); g.lineTo(47, 35); g.quadraticCurveTo(50, 31.5, 53, 35); g.lineTo(53, 42); g.closePath(); g.fill(); g.restore();
      tx(g, '1696', 50, 12.5, 3.2, GOLD, 'center', 900, SANS, A_(lt, 0.2, 0.5) * p1);
      chip(g, 80, 24, '皇家铸币局', GOLD, A_(lt, L[1], 0.5) * p1, 'rgba(48,38,12,0.95)');
      tx(g, '（在伦敦塔里）', 80, 29, 1.5, DIM, 'center', 700, SANS, A_(lt, L[1] + 0.3, 0.5) * p1);
      var w = clamp((lt - 0.4) / 2.6);
      newton(g, mix(8, 28, w), 44, 11, p1, { walk: w > 0 && w < 1 ? lt * 7 : null, name: '牛顿 · 53 岁', prop: 'case' }, lt);
    }
    var p2 = W_(lt, L[2] - 0.1, L[4] - 0.2, 0.7, 0.6);
    if (p2 > 0.01) {
      coinB(g, 26, 28, 7, p2, 0);
      tx(g, '完整的银币', 26, 39, 1.8, FG, 'center', 800, SANS, p2);
      var cl = A_(lt, L[3], 0.6) * p2;
      coinB(g, 52, 28, 7, cl, 1);
      // silver shavings
      for (i = 0; i < 7; i++) { var sx = 58 + (i % 4) * 2.4, sy = 36 + Math.floor(i / 4) * 1.8 + 0.4 * Math.sin(i); ln(g, sx, sy, sx + 1.2, sy - 0.4, '#c9d2de', 0.3, null, cl * A_(lt, L[3] + 0.3 + i * 0.08, 0.3)); }
      tx(g, '剪掉一圈边', 52, 39, 1.8, HOT, 'center', 800, SANS, cl);
      var fk = A_(lt, L[3] + 1.0, 0.6) * p2;
      coinB(g, 78, 28, 7, fk, 0);
      g.save(); g.globalAlpha *= fk * 0.35; g.fillStyle = '#c9a43a'; g.beginPath(); g.arc(78, 28, 7, 0, TAU); g.fill(); g.restore();
      tx(g, '仿造的假币', 78, 39, 1.8, HOT, 'center', 800, SANS, fk);
    }
    var p3 = A_(lt, L[4] - 0.1, 0.7);
    if (p3 > 0.01) {
      // a desk, a candle, a ledger of interrogations
      rbox(g, 46, 38.5, 14, 1.6, 0.2, null, 0, '#5a3e2a', p3);
      newton(g, 44, 45, 11, p3, { name: '', pose: 'forward', flip: false }, lt);
      extra(g, 64, 45, 11, p3 * A_(lt, L[5], 0.5), { name: '嫌犯', col: '#8e97a8', flip: true }, lt);
      for (i = 0; i < 3; i++) extra(g, 80 + i * 5, 45, 9, p3 * A_(lt, L[5] + 0.3 + i * 0.2, 0.4) * 0.6, { name: '', col: '#6e7688', flip: true }, lt);
      tx(g, '线人', 85, 33, 1.6, DIM, 'center', 700, SANS, p3 * A_(lt, L[5] + 0.6, 0.4));
      var nn = Math.round(Math.min(100, 100 * clamp((lt - L[6]) / 2.2)));
      tx(g, nn + (nn >= 100 ? '+' : ''), 22, 26, 6, GOLD, 'center', 900, SANS, A_(lt, L[6], 0.4) * p3);
      tx(g, '次盘问', 22, 32.5, 2.0, FG, 'center', 800, SANS, A_(lt, L[6], 0.4) * p3);
      tx(g, '1698 年 6 月 — 1699 年圣诞', 22, 36.5, 1.4, DIM, 'center', 600, SANS, A_(lt, L[6] + 0.4, 0.4) * p3);
    }
  };

  // ---------- n19: William Chaloner ----------
  DRAW.n19 = function (g, lt, L) {
    var i, p1 = W_(lt, 0.1, L[3] - 0.2, 0.7, 0.6);
    if (p1 > 0.01) {
      chaloner(g, 30, 45, 13, p1, { pose: L[1] < lt ? 'forward' : 'down' }, lt);
      for (i = 0; i < 5; i++) coinB(g, 14 + (i % 3) * 3, 40 - Math.floor(i / 3) * 3, 1.3, p1 * A_(lt, 0.4 + i * 0.1, 0.3), 0);
      tx(g, '假币', 17, 44.5, 1.5, HOT, 'center', 700, SANS, p1);
      var ac = A_(lt, L[1], 0.5) * p1;
      rbox(g, 44, 16, 26, 9, 1.2, 'rgba(255,157,138,0.7)', 0.18, 'rgba(40,18,14,0.95)', ac);
      tx(g, '“铸币局的人腐败！”', 57, 20.6, 1.9, '#ffb8a8', 'center', 800, SANS, ac);
      var wa = A_(lt, L[2], 0.5) * p1;
      tx(g, '让我来管铸币局', 57, 30, 1.9, FG, 'center', 800, SANS, wa);
      arrow(g, 45, 30.5, 40, 33, FG, 0.18, wa, 0.6);
    }
    var p2 = W_(lt, L[3] - 0.1, L[5] - 0.2, 0.7, 0.6);
    if (p2 > 0.01) {
      newton(g, 18, 45, 12, p2, {}, lt);
      for (i = 0; i < 5; i++) extra(g, 36 + i * 7, 45, 10, p2 * A_(lt, L[3] + 0.3 + i * 0.3, 0.4), { name: '', col: ['#a7c4e8', '#bfe3c6', '#f0c8d8', '#c9bfe0', '#e7cfa2'][i] }, lt);
      tx(g, '证人', 50, 30, 2.0, FG, 'center', 800, SANS, p2 * A_(lt, L[3] + 0.6, 0.4));
      chaloner(g, 84, 45, 12, p2, { flip: true }, lt);
      var gv = A_(lt, L[4], 0.4) * p2;
      chip(g, 50, 16, '1699 年 3 月 · 判处死刑', HOT, gv, 'rgba(56,24,14,0.95)');
    }
    // the letter, never answered
    var p3 = A_(lt, L[5] - 0.1, 0.7);
    if (p3 > 0.01) {
      var lw = eo(pr(lt, L[5], 1.0));
      g.save(); g.translate(mix(70, 40, lw), 26); g.rotate(-0.06);
      paper(g, -10, -9, 20, 18, p3);
      scribble(g, -8, -6, 16, 3, p3, lt, L[5] + 0.4, 9);
      tx(g, '只有你能救我。', 0, 3.5, 2.0, '#5a2a1a', 'center', 900, SANS, A_(lt, L[6], 0.6) * p3);
      g.restore();
      newton(g, 80, 45, 12, p3 * A_(lt, L[7] - 0.6, 0.6), { flip: true, name: '' }, lt);
      tx(g, '没有回信', 80, 27, 2.0, DIM, 'center', 800, SANS, A_(lt, L[7] + 0.2, 0.6));
      tx(g, '查洛纳 · 1699 年 3 月 22 日被处决', 40, 43.5, 1.5, DIM, 'center', 600, SANS, A_(lt, L[7] + 0.8, 0.6));
    }
  };

  // ---------- n20: who invented calculus? ----------
  DRAW.n20 = function (g, lt, L) {
    var i, A = A_(lt, 0.1, 0.7);
    newton(g, 14, 45, 12, A, { old: true }, lt);
    leibniz(g, 86, 45, 12, A * A_(lt, L[1], 0.6), { flip: true }, lt);
    var p1 = W_(lt, L[1] - 0.1, L[4] - 0.2, 0.7, 0.6);
    if (p1 > 0.01) {
      ln(g, 24, 32, 76, 32, 'rgba(238,242,248,0.35)', 0.25, null, p1);
      var ys = [[1666, '牛顿的笔记（没发表）', NT_NAME, 0], [1684, '莱布尼茨发表', '#c9b8ff', 1]];
      for (i = 0; i < 2; i++) {
        var x = mix(24, 76, (ys[i][0] - 1660) / 30), a2 = A_(lt, i === 0 ? L[1] + 0.2 : L[2], 0.5) * p1;
        dot(g, x, 32, 0.9, ys[i][2], a2); tx(g, String(ys[i][0]), x, 28.5, 2.2, ys[i][2], 'center', 900, SANS, a2); tx(g, ys[i][1], x, 36, 1.6, FG, 'center', 700, SANS, a2);
      }
      var fight = A_(lt, L[3], 0.5) * p1;
      tx(g, '谁先？', 50, 19, 3.2, HOT, 'center', 900, SANS, fight);
      var yr = 1699 + Math.round(17 * clamp((lt - L[3] - 0.2) / 2.2));
      tx(g, '1699 → ' + yr, 50, 42.5, 2.0, DIM, 'center', 800, SANS, fight);
      for (i = 0; i < 6; i++) { var ph = (lt * 1.5 + i / 6) % 1; dot(g, 26 + ph * 48, 22 + Math.sin(i * 2.3) * 2, 0.3, i % 2 ? '#c9b8ff' : GOLD, fight * Math.sin(ph * Math.PI)); }
    }
    var p2 = W_(lt, L[4] - 0.1, L[6] - 0.2, 0.7, 0.6);
    if (p2 > 0.01) {
      paper(g, 34, 13, 32, 30, p2);
      tx(g, '皇家学会 · 调查报告', 50, 16.6, 1.9, '#3a2a1a', 'center', 900, SANS, p2);
      scribble(g, 37, 20, 26, 6, p2, lt, L[4] + 0.3, 13);
      ring(g, 60, 38, 2.2, '#b4483a', 0.5, p2); dot(g, 60, 38, 1.6, 'rgba(180,72,58,0.6)', p2);
      var nw = A_(lt, L[5], 0.5) * p2;
      rbox(g, 36, 30, 20, 5, 0.3, 'rgba(242,198,107,0.9)', 0.2, 'rgba(242,198,107,0.18)', nw);
      tx(g, '结论：牛顿执笔', 46, 32.6, 1.7, '#7a4a0a', 'center', 900, SANS, nw);
      quill(g, 58, 33, 1.1, nw, -0.6 + 0.1 * Math.sin(lt * 7));
    }
    var p3 = A_(lt, L[6] - 0.1, 0.7);
    if (p3 > 0.01) {
      chip(g, 50, 16, '各自独立发明', '#7fe0a0', p3, 'rgba(14,36,22,0.95)');
      var sy = A_(lt, L[7], 0.6);
      tx(g, 'dy/dx', 40, 29, 4.0, '#c9b8ff', 'center', 900, SANS, sy);
      tx(g, '∫', 60, 29, 5.6, '#c9b8ff', 'center', 900, SANS, sy);
      tx(g, '今天用的符号：莱布尼茨的', 50, 37, 1.8, FG, 'center', 800, SANS, sy);
      tx(g, '牛顿的“点”记号，如今多见于物理', 50, 41.2, 1.5, DIM, 'center', 600, SANS, sy * A_(lt, L[7] + 0.8, 0.5));
    }
  };
