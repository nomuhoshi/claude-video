  // ================= Faraday: story scenes (benzene, cage, the Friday discourse, the letter, next episode) =================
  function gasLamp(g, x, yb, s, a, lt) {
    if (a <= 0.003) return;
    ln(g, x, yb, x, yb - 22 * s, '#5b6474', 0.6 * s + 0.2, null, a);
    rbox(g, x - 2 * s, yb - 26 * s, 4 * s, 4.2 * s, 0.4 * s, 'rgba(200,190,160,0.6)', 0.15, 'rgba(40,36,30,0.9)', a);
    glow(g, x, yb - 24 * s, 7 * s, 'rgba(255,200,110,0.9)', (0.55 + 0.1 * Math.sin(lt * 9 + x)) * a);
    dot(g, x, yb - 24 * s, 0.9 * s, '#ffe2a0', a);
  }
  function benzRing(g, cx, cy, R, a, rot) {
    if (a <= 0.003) return;
    var P = [], i;
    for (i = 0; i < 6; i++) { var an = -Math.PI / 2 + i * TAU / 6 + (rot || 0); P.push([cx + Math.cos(an) * R, cy + Math.sin(an) * R]); }
    for (i = 0; i < 6; i++) { var p = P[i], q = P[(i + 1) % 6]; ln(g, p[0], p[1], q[0], q[1], FG, 0.35, null, a); if (i % 2 === 0) ln(g, mix(p[0], cx, 0.2), mix(p[1], cy, 0.2), mix(q[0], cx, 0.2), mix(q[1], cy, 0.2), FG, 0.28, null, a); }
    for (i = 0; i < 6; i++) { dot(g, P[i][0], P[i][1], 1.3, '#3b4250', a); tx(g, 'C', P[i][0], P[i][1] + 0.1, 1.6, FG, 'center', 800, SANS, a); }
  }

  // ---------- d28: benzene from the gas lamps ----------
  DRAW.d28 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8);
    var early = A * (1 - A_(lt, L[5] - 0.2, 0.7));
    // street of gas lamps
    for (i = 0; i < 4; i++) gasLamp(g, 12 + i * 7, 42 - i * 1.2, 1 - i * 0.18, early * A_(lt, L[0] + i * 0.2, 0.6), lt);
    chip(g, 22, 9, '伦敦 · 煤气灯', GOLD, A_(lt, L[0] + 0.3, 0.6) * (1 - A_(lt, L[2], 0.5)), 'rgba(48,38,12,0.95)');
    // flask with oily residue
    var fa = A_(lt, L[1], 0.7) * early, fx = 46, fy = 33;
    if (fa > 0.01) {
      g.save(); g.globalAlpha *= fa; g.strokeStyle = 'rgba(220,235,245,0.7)'; g.lineWidth = 0.35;
      g.beginPath(); g.arc(fx, fy, 6, -Math.PI * 0.38, Math.PI * 1.38, false); g.lineTo(fx - 1.3, fy - 11); g.moveTo(fx + 1.3, fy - 11); g.lineTo(fx + 1.3, fy - 5.6); g.stroke();
      g.fillStyle = 'rgba(60,40,20,0.9)'; g.beginPath(); g.arc(fx, fy, 5.6, 0.15, Math.PI - 0.15); g.closePath(); g.fill(); g.restore();
      tx(g, '残渣', fx, fy + 9, 1.9, DIM, 'center', 700, SANS, fa);
    }
    // a clear new liquid
    var va = A_(lt, L[2], 0.7) * early, vx = 64, vy = 30;
    if (va > 0.01) {
      arrow(g, fx + 7, fy - 4, vx - 3, vy - 2, 'rgba(242,198,107,0.7)', 0.25, va, 0.8);
      rbox(g, vx - 1.8, vy - 7, 3.6, 12, 1.6, 'rgba(220,235,245,0.7)', 0.25, null, va);
      rbox(g, vx - 1.5, vy - 1, 3, 5.6, 1.4, null, 0, 'rgba(200,230,255,0.55)', va);
      chip(g, vx, 9, '1825', GOLD, va * (1 - A_(lt, L[5] - 0.2, 0.5)), 'rgba(48,38,12,0.95)');
      faraday(g, 80, 41, 15, va, { pose: 'forward', flip: true, name: '法拉第' }, lt);
    }
    chip(g, 64, 15, '“氢的二碳化物”', FG, A_(lt, L[3], 0.6) * early);
    tx(g, '= 苯', 64, 42, 3.2, GOLD, 'center', 900, SANS, A_(lt, L[4], 0.6) * early);
    // the ring, and the snake
    var rg = A_(lt, L[5], 0.9) * (1 - A_(lt, L[7] - 0.1, 0.6));
    benzRing(g, 50, 26, 7.5, rg, 0.15 * Math.sin(lt * 0.6));
    tx(g, '六个碳围成一个环', 50, 41, 2.0, FG, 'center', 800, SANS, rg * (1 - A_(lt, L[6], 0.5)));
    var sn = A_(lt, L[6], 1.0) * (1 - A_(lt, L[7] - 0.1, 0.6));
    if (sn > 0.01) {
      var R = 13, a0 = lt * 0.6, len = TAU * 0.9 * eo(pr(lt, L[6], 1.4));
      g.save(); g.globalAlpha *= sn; g.lineCap = 'round';
      for (i = 0; i < 60; i++) { var t0 = a0 + len * i / 60, t1 = a0 + len * (i + 1) / 60; g.strokeStyle = 'rgba(98,214,160,' + (0.35 + 0.6 * i / 60) + ')'; g.lineWidth = 0.6 + 1.6 * (i / 60); g.beginPath(); g.moveTo(50 + Math.cos(t0) * R, 26 + Math.sin(t0) * R); g.lineTo(50 + Math.cos(t1) * R, 26 + Math.sin(t1) * R); g.stroke(); }
      var hx = 50 + Math.cos(a0 + len) * R, hy = 26 + Math.sin(a0 + len) * R; dot(g, hx, hy, 1.5, GRN, 1); g.restore();
      tx(g, '一个梦：蛇咬住了自己的尾巴', 50, 44, 2.0, GRN, 'center', 800, SANS, sn);
    }
    var q = A_(lt, L[7], 0.8);
    glow(g, 50, 26, 16, 'rgba(242,198,107,0.9)', 0.3 * q);
    tx(g, '磁  →  电 ？', 50, 26, 6, GOLD, 'center', 900, SANS, q);
  };

  // ---------- d29: the Faraday cage ----------
  DRAW.d29 = function (g, lt, L) {
    var i, j, A = A_(lt, 0.2, 0.8), cx = 52, ty = 18, hw = 14, h = 17;
    var out = 1 - A_(lt, L[7] - 0.1, 0.7);
    chip(g, 50, 7, '1836', GOLD, A_(lt, L[0], 0.6) * out, 'rgba(48,38,12,0.95)');
    var fr = A_(lt, L[1], 0.8) * out, mesh = A_(lt, L[2], 0.8) * out, hd = hw * 0.5;
    var LT = [cx - hw, ty], TOP = [cx, ty - hd], RT = [cx + hw, ty], FR = [cx, ty + hd];
    function edge(p, q, col, w, a) { ln(g, p[0], p[1], q[0], q[1], col, w, null, a); }
    function down(p) { return [p[0], p[1] + h]; }
    // the man inside, seen through the mesh
    faraday(g, cx, ty + hd + h - 1.5, 13, A_(lt, L[4], 0.6) * out, { pose: 'forward', name: '' }, lt);
    if (lt > L[4]) { ln(g, cx + 5.5, ty + h - 3, cx + 5.5, ty + h + 0.5, '#d7dde8', 0.3, null, out); ln(g, cx + 5.5, ty + h + 0.5, cx + 5.2, ty + h + 2, '#d7dde8', 0.2, null, out); ln(g, cx + 5.5, ty + h + 0.5, cx + 5.8, ty + h + 2, '#d7dde8', 0.2, null, out); }
    // mesh on the two front faces
    for (i = 1; i < 8; i++) {
      var f = i / 8;
      edge([mix(LT[0], FR[0], f), mix(LT[1], FR[1], f)], [mix(LT[0], FR[0], f), mix(LT[1], FR[1], f) + h], 'rgba(200,210,225,0.55)', 0.12, mesh);
      edge([mix(FR[0], RT[0], f), mix(FR[1], RT[1], f)], [mix(FR[0], RT[0], f), mix(FR[1], RT[1], f) + h], 'rgba(200,210,225,0.55)', 0.12, mesh);
    }
    for (j = 1; j < 6; j++) { var dy = h * j / 6; edge([LT[0], LT[1] + dy], [FR[0], FR[1] + dy], 'rgba(200,210,225,0.55)', 0.12, mesh); edge([FR[0], FR[1] + dy], [RT[0], RT[1] + dy], 'rgba(200,210,225,0.55)', 0.12, mesh); }
    // wooden frame
    var W = '#b5895a';
    [[LT, TOP], [TOP, RT], [RT, FR], [FR, LT], [LT, down(LT)], [FR, down(FR)], [RT, down(RT)], [down(LT), down(FR)], [down(FR), down(RT)]].forEach(function (e) { edge(e[0], e[1], W, 0.45, fr); });
    // the generator and its sparks
    var sp = A_(lt, L[3], 0.4) * out;
    if (sp > 0.01) {
      ring(g, 14, 30, 5, 'rgba(200,210,225,0.7)', 0.3, sp); for (i = 0; i < 6; i++) { var an = lt * 3 + i; ln(g, 14, 30, 14 + Math.cos(an) * 5, 30 + Math.sin(an) * 5, 'rgba(200,210,225,0.5)', 0.15, null, sp); }
      tx(g, '高压起电机', 14, 38, 1.8, DIM, 'center', 700, SANS, sp);
      var r = rng(Math.floor(lt * 9));
      for (i = 0; i < 3; i++) {
        var tx0 = 19, ty0 = 28 + i * 2, tgx = LT[0] + r() * 6, tgy = LT[1] + 2 + r() * (h - 2);
        g.save(); g.globalAlpha *= sp * (0.5 + 0.5 * r()); g.strokeStyle = '#ffe9b0'; g.lineWidth = 0.3; g.shadowColor = 'rgba(255,220,150,0.9)'; g.shadowBlur = 3;
        g.beginPath(); g.moveTo(tx0, ty0); for (var k = 1; k <= 6; k++) { var u = k / 6; g.lineTo(mix(tx0, tgx, u) + (k < 6 ? (r() - 0.5) * 3 : 0), mix(ty0, tgy, u) + (k < 6 ? (r() - 0.5) * 3 : 0)); } g.stroke(); g.restore();
      }
    }
    chip(g, 82, 22, '里面：一点电都没有', GRN, A_(lt, L[5], 0.6) * out, 'rgba(12,40,30,0.95)');
    chip(g, 82, 28, '电荷只在外表面', GOLD, A_(lt, L[6], 0.6) * out, 'rgba(48,38,12,0.95)');
    // everyday cages
    var ev = A_(lt, L[7], 0.8);
    if (ev > 0.01) {
      var xs = [26, 50, 74], nm = ['汽车', '飞机', '微波炉'];
      for (i = 0; i < 3; i++) { rbox(g, xs[i] - 10, 16, 20, 20, 1.2, 'rgba(242,198,107,0.45)', 0.18, 'rgba(20,24,34,0.85)', ev * A_(lt, L[7] + i * 0.3, 0.5)); tx(g, nm[i], xs[i], 32.5, 2.0, FG, 'center', 800, SANS, ev * A_(lt, L[7] + i * 0.3, 0.5)); }
      var a1 = ev * A_(lt, L[7], 0.5), a2 = ev * A_(lt, L[7] + 0.3, 0.5), a3 = ev * A_(lt, L[7] + 0.6, 0.5);
      g.save(); g.globalAlpha *= a1; g.fillStyle = '#9aa7ba'; g.beginPath(); g.moveTo(18, 27); g.lineTo(20, 23); g.lineTo(31, 23); g.lineTo(34, 27); g.closePath(); g.fill(); g.restore(); dot(g, 21.5, 27.5, 1.2, '#2a2f3a', a1); dot(g, 30.5, 27.5, 1.2, '#2a2f3a', a1);
      g.save(); g.globalAlpha *= a2; g.fillStyle = '#9aa7ba'; g.beginPath(); g.ellipse(50, 25, 8, 1.5, 0, 0, TAU); g.fill(); g.beginPath(); g.moveTo(48, 25); g.lineTo(52, 25); g.lineTo(48, 19); g.closePath(); g.fill(); g.beginPath(); g.moveTo(48, 25); g.lineTo(52, 25); g.lineTo(48, 30); g.closePath(); g.fill(); g.restore();
      rbox(g, 67, 20, 14, 9, 0.6, 'rgba(200,210,225,0.7)', 0.2, 'rgba(40,46,60,0.9)', a3); for (i = 0; i < 4; i++) ln(g, 68.5, 21.5 + i * 2, 76, 21.5 + i * 2, 'rgba(200,210,225,0.4)', 0.1, null, a3);
      for (i = 0; i < 2; i++) { var fl = 0.5 + 0.5 * Math.sin(lt * 15 + i * 2); ln(g, xs[i] - 6 + i * 3, 13, xs[i] - 3 + i * 3, 19, '#ffe9b0', 0.3, null, (i ? a2 : a1) * fl); }
    }
  };

  // ---------- d30: the speaker who ran away ----------
  DRAW.d30 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8), hideTop = 1 - A_(lt, L[5] - 0.3, 0.5);
    // stage: curtains, podium, a clock
    g.save(); g.globalAlpha *= A * 0.75; g.fillStyle = '#4a1f28'; g.fillRect(4, 6, 10, 40); g.fillRect(86, 6, 10, 40); g.restore();
    rbox(g, 44, 34, 12, 8, 0.4, 'rgba(200,170,120,0.6)', 0.2, '#5a3a24', A);
    var CA = A * hideTop;
    ring(g, 78, 13, 4, 'rgba(238,242,248,0.7)', 0.3, CA);
    var mins = 50 + Math.min(10, (lt - L[0]) * 1.4) + Math.max(0, lt - L[4]) * 2.5, ang = mins / 60 * TAU - Math.PI / 2;
    ln(g, 78, 13, 78 + Math.cos(ang) * 3.2, 13 + Math.sin(ang) * 3.2, FG, 0.25, null, CA); ln(g, 78, 13, 78 + Math.cos(-Math.PI / 2 + 9 / 12 * TAU) * 2, 13 + Math.sin(-Math.PI / 2 + 9 / 12 * TAU) * 2, FG, 0.35, null, CA);
    tx(g, '晚上 9 点', 78, 19.5, 1.7, DIM, 'center', 700, SANS, CA);
    chip(g, 36, 9, '周五晚间讲座', GOLD, A_(lt, L[0], 0.6) * hideTop, 'rgba(48,38,12,0.95)');
    chip(g, 36, 14, '1846 · 4 月', DIM, A_(lt, L[1], 0.6) * (1 - A_(lt, L[4], 0.5)));
    // the speaker who runs away
    var ra = A_(lt, L[1] + 0.3, 0.6), run = eio(pr(lt, L[2] + 0.4, 1.6)), wx = mix(36, 104, run);
    wheatstone(g, wx, 42, 14, ra * (1 - A_(lt, L[3] + 1.0, 0.4)), { walk: run > 0.01 && run < 0.99 ? lt * 11 : null }, lt);
    if (run > 0.02 && run < 0.95) for (i = 0; i < 3; i++) dot(g, wx - 3 - i * 1.5, 26 + i * 0.8, 0.4, ICE, 0.7);
    chip(g, 64, 26, '怯场，跑了！', HOT, A_(lt, L[2] + 0.3, 0.5) * (1 - A_(lt, L[3] + 0.5, 0.5)), 'rgba(50,24,18,0.95)');
    // Faraday steps in
    var fa = A_(lt, L[3], 0.6), fx = mix(16, 50, eio(pr(lt, L[3], 1.2)));
    faraday(g, fx, 34.5, 13, fa, { walk: lt > L[3] && lt < L[3] + 1.2 ? lt * 9 : null, pose: lt > L[3] + 1.4 ? 'forward' : 'down', name: lt < L[5] - 0.3 ? '法拉第' : '' }, lt);
    chip(g, 26, 26, '材料不够了……', DIM, A_(lt, L[4], 0.5) * (1 - A_(lt, L[5], 0.5)));
    // his guess: light as a trembling of the lines of force
    var gs = A_(lt, L[5], 0.8);
    if (gs > 0.01) {
      rbox(g, 20, 6.5, 60, 15, 2, 'rgba(242,198,107,0.5)', 0.2, 'rgba(20,24,34,0.88)', gs);
      for (i = 0; i < 4; i++) {
        g.save(); g.globalAlpha *= gs; g.strokeStyle = 'rgba(143,208,255,0.75)'; g.lineWidth = 0.25; g.beginPath();
        for (var k = 0; k <= 80; k++) { var x = 23 + k * 0.67, w = Math.exp(-Math.pow((x - 23 - ((lt - L[5]) * 16 % 60)) / 6, 2)) * 1.4 * A_(lt, L[6], 0.6), y = 9.5 + i * 2.6 + Math.sin(x * 1.2 - lt * 8) * w; if (k === 0) g.moveTo(x, y); else g.lineTo(x, y); }
        g.stroke(); g.restore();
      }
      dot(g, 48, 24, 0.6, 'rgba(242,198,107,0.6)', gs); dot(g, 49.5, 22.5, 0.9, 'rgba(242,198,107,0.6)', gs);
      tx(g, '光 = 力线的振动？', 72, 19.5, 1.9, GOLD, 'center', 800, SANS, A_(lt, L[6], 0.6) * (1 - A_(lt, L[7], 0.5)));
    }
    // the locked room
    var lk = A_(lt, L[7], 0.7);
    if (lk > 0.01) {
      rbox(g, 82, 26, 9, 16, 0.4, 'rgba(200,170,120,0.6)', 0.25, '#3a2a1c', lk);
      ring(g, 86.5, 31, 1.4, GOLD, 0.35, lk); rbox(g, 85, 31.6, 3, 2.6, 0.3, null, 0, GOLD, lk);
      chip(g, 72, 46, '主讲人：先关起来', GOLD, A_(lt, L[8], 0.6), 'rgba(48,38,12,0.95)');
    }
  };

  // ---------- d31: a letter between two generations ----------
  DRAW.d31 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8);
    var nm = A_(lt, L[5], 0.6);
    maxwell(g, 20, 41, 16, A, { name: nm > 0.5 ? '麦克斯韦' : '' }, lt);
    if (nm > 0.01) glow(g, 20, 32, 12, 'rgba(201,184,255,0.9)', 0.35 * nm);
    faraday(g, 80, 41, 17, A, { name: '法拉第' }, lt);
    chip(g, 20, 45.5, '25 岁', DIM, A_(lt, L[0], 0.6));
    chip(g, 80, 45.5, '65 岁', DIM, A_(lt, L[2], 0.6));
    // the paper going right
    var p1 = eio(pr(lt, L[0] + 0.4, 2.2)), pa = A_(lt, L[0] + 0.3, 0.5) * (1 - A_(lt, L[2], 0.5));
    if (pa > 0.01) { var px = mix(28, 70, p1), py = 30 - Math.sin(p1 * Math.PI) * 10; rbox(g, px - 4, py - 3, 8, 6, 0.3, null, 0, 'rgba(240,232,214,0.95)', pa); for (i = 0; i < 3; i++) ln(g, px - 3, py - 1.5 + i * 1.4, px + 3, py - 1.5 + i * 1.4, 'rgba(60,50,40,0.6)', 0.12, null, pa); }
    chip(g, 50, 9, '《论法拉第的力线》', FG, A_(lt, L[1], 0.6) * (1 - A_(lt, L[3] - 0.2, 0.5)));
    // the reply going left
    var p2 = eio(pr(lt, L[2] + 0.3, 2.0)), ra = A_(lt, L[2] + 0.2, 0.5) * (1 - A_(lt, L[5], 0.5));
    if (ra > 0.01) { var qx = mix(72, 30, p2), qy = 30 - Math.sin(p2 * Math.PI) * 8; rbox(g, qx - 3.5, qy - 2.4, 7, 4.8, 0.3, 'rgba(242,198,107,0.6)', 0.15, 'rgba(236,226,204,0.95)', ra); ln(g, qx - 3.5, qy - 2.4, qx, qy, 'rgba(120,90,60,0.6)', 0.12, null, ra); ln(g, qx + 3.5, qy - 2.4, qx, qy, 'rgba(120,90,60,0.6)', 0.12, null, ra); }
    var qa = A_(lt, L[3], 0.6) * (1 - A_(lt, L[6] - 0.1, 0.5));
    tx(g, '“看到这么强的数学用在这个问题上，', 50, 14, 2.5, GOLD, 'center', 800, SANS, qa);
    tx(g, '我起初几乎吓了一跳。”', 50, 18.5, 2.5, GOLD, 'center', 800, SANS, A_(lt, L[4], 0.6) * (1 - A_(lt, L[6] - 0.1, 0.5)));
    tx(g, '—— 法拉第致麦克斯韦，1857', 62, 22.5, 1.7, DIM, 'center', 700, SANS, qa);
    // 1831: the same year
    var tl = A_(lt, L[6], 0.8);
    if (tl > 0.01) {
      var X0 = 30, X1 = 70, yy = 15; function tX(y) { return X0 + (y - 1791) / (1867 - 1791) * (X1 - X0); }
      ln(g, X0, yy, X1, yy, 'rgba(238,242,248,0.45)', 0.25, null, tl);
      var pts = [[1791, '法拉第出生', ICE], [1831, '1831', GOLD], [1857, '回信', DIM], [1865, '方程', '#c9b8ff']];
      for (i = 0; i < 4; i++) { var x = tX(pts[i][0]); dot(g, x, yy, i === 1 ? 1.1 : 0.6, pts[i][2], tl); tx(g, pts[i][1], x, yy + (i % 2 ? -2.8 : 2.8), 1.7, pts[i][2], 'center', 800, SANS, tl); }
      var hl = A_(lt, L[7], 0.6), x31 = tX(1831);
      glow(g, x31, yy, 6, 'rgba(242,198,107,0.9)', 0.5 * hl);
      chip(g, x31 - 6, 7, '麦克斯韦出生', '#c9b8ff', hl);
      chip(g, x31 + 12, 7, '电磁感应', GOLD, hl, 'rgba(48,38,12,0.95)');
    }
  };

  // ---------- d27: next time ----------
  DRAW.d27 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 1.0);
    g.save(); g.globalAlpha *= A * 0.5; var cg = g.createLinearGradient(0, 4, 0, 44); cg.addColorStop(0, 'rgba(201,184,255,0.0)'); cg.addColorStop(1, 'rgba(201,184,255,0.35)');
    g.fillStyle = cg; g.beginPath(); g.moveTo(47, 4); g.lineTo(53, 4); g.lineTo(62, 44); g.lineTo(38, 44); g.closePath(); g.fill(); g.restore();
    var E = ['∇ · E = ρ / ε₀', '∇ · B = 0', '∇ × E = − ∂B / ∂t', '∇ × B = μ₀J + μ₀ε₀ ∂E / ∂t'];
    for (i = 0; i < 4; i++) tx(g, E[i], i % 2 ? 80 : 20, 14 + i * 7, 2.2, 'rgba(201,184,255,0.45)', 'center', 700, SANS, A * (0.5 + 0.5 * Math.sin(lt * 1.2 + i)));
    maxwell(g, 50, 43, 22, A, { name: '' }, lt);
    tx(g, '下一期', 50, 8.5, 2.2, DIM, 'center', 800, SANS, A_(lt, L[1], 0.6));
    tx(g, '麦克斯韦', 50, 13.5, 4.6, '#c9b8ff', 'center', 900, SANS, A_(lt, L[1] + 0.2, 0.8));
  };
