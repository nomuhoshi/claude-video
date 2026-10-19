  // ================= heat video: scenes d0-d5 =================
  var CUPC = '#e9d9c4';
  function cup(g, x, y, s, lt, a, steam) {      // coffee cup, side view; (x, y) = centre of the body
    if (a <= 0.003) return;
    g.save(); g.translate(x, y); g.scale(s, s); g.globalAlpha *= a;
    g.strokeStyle = CUPC; g.lineWidth = 0.9; g.lineCap = 'round';
    g.beginPath(); g.arc(9.2, -0.5, 4.6, -1.35, 1.35); g.stroke();
    g.fillStyle = 'rgba(233,217,196,0.16)'; g.beginPath();
    if (g.roundRect) g.roundRect(-9, -8, 18, 16, [1, 1, 6, 6]); else g.rect(-9, -8, 18, 16); g.fill();
    g.stroke();
    g.fillStyle = 'rgba(120,70,40,0.95)'; g.beginPath(); g.ellipse(0, -6.4, 8.2, 1.6, 0, 0, TAU); g.fill();
    g.strokeStyle = 'rgba(233,217,196,0.45)'; g.lineWidth = 0.6; g.beginPath(); g.moveTo(-13, 8.6); g.lineTo(13, 8.6); g.stroke();
    g.restore();
    if (steam > 0.01) {
      var i;
      for (i = 0; i < 3; i++) {
        g.save(); g.globalAlpha *= a * steam * 0.55; g.strokeStyle = 'rgba(238,242,248,0.8)'; g.lineWidth = 0.5 * s; g.lineCap = 'round'; g.beginPath();
        for (var k = 0; k <= 16; k++) {
          var u = k / 16, yy = y - 9 * s - u * 6 * s, xx = x + (i - 1) * 4 * s + Math.sin(u * 6 + lt * 2 + i * 2) * 1.4 * s * u;
          if (k === 0) g.moveTo(xx, yy); else g.lineTo(xx, yy);
        }
        g.stroke(); g.restore();
      }
    }
  }
  var LENSP = hexG(10.2, 4.3, 0, 0);

  // ---------- d0: opening ----------
  DRAW.d0 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8);
    var move = eio(pr(lt, L[2] - 0.1, 1.2));
    var cx = mix(50, 28, move), cs = mix(1.3, 1.1, move);
    cup(g, cx, 32, cs, lt, A, 1 - 0.5 * move);
    // "hot" = ?
    var q = A_(lt, L[1], 0.7) * (1 - A_(lt, L[2] - 0.1, 0.6));
    if (q > 0.01) {
      glow(g, 83, 30, 12, 'rgba(242,198,107,0.9)', 0.25 * q);
      tx(g, '烫 = ？', 83, 30, 6.4, GOLD, 'center', 900, SANS, q);
    }
    // the lens
    var lz = A_(lt, L[2] + 0.2, 0.9), LX = 69, LY = 32, LR = 13.5;
    if (lz > 0.01) {
      ln(g, cx + 10 * cs, 32, LX - LR, 32, 'rgba(143,208,255,0.5)', 0.18, [0.6, 0.6], lz * (1 - 0.5 * move + 0.5 * move));
      g.save(); g.globalAlpha *= lz;
      g.fillStyle = 'rgba(70,40,25,0.55)'; g.beginPath(); g.arc(LX, LY, LR, 0, TAU); g.fill();
      g.restore();
      var amp = 0.25 + 1.5 * A_(lt, L[3], 1.2), spd = 3 + 7 * A_(lt, L[3], 1.2), k = 0.35 + 0.6 * A_(lt, L[3], 1.2);
      for (i = 0; i < LENSP.length; i++) {
        var p = LENSP[i];
        jat(g, LX + p[0], LY + p[1], 1.15, lt, i * 1.7, amp * 0.8, spd, k, lz * A_(lt, L[2] + 0.5 + i * 0.05, 0.5), true);
      }
      ring(g, LX, LY, LR, ICE, 0.45, lz);
      ring(g, LX, LY, LR + 1.1, 'rgba(143,208,255,0.25)', 0.2, lz);
    }
    var c3 = A_(lt, L[3] + 0.3, 0.7) * (1 - A_(lt, L[4] - 0.1, 0.5));
    chip(g, LX, 14.6, '无数原子，在拼命地振动', HOT, c3, 'rgba(50,24,18,0.95)');
    // imagination
    var e = A_(lt, L[4], 0.9);
    if (e > 0.01) {
      glow(g, 50, 17, 10, 'rgba(242,198,107,0.9)', 0.3 * e);
      h_eye(g, 50, 17, 2.8, GOLD, e, 0.1 * (1 - Math.sin(lt * 1.6) * 0.5 - 0.5));
      chip(g, 50, 24, '想象', GOLD, A_(lt, L[4] + 0.6, 0.6), 'rgba(48,38,12,0.95)');
    }
  };

  // ---------- d1: science needs imagination ----------
  DRAW.d1 = function (g, lt, L) {
    var i, st1 = 1 - A_(lt, L[2] - 0.2, 0.6);
    // stage A: two people
    var pa = A_(lt, 0.2, 0.7) * st1;
    person(g, 30, 40, 2.6, pa, 'rgba(214,224,240,0.85)');
    person(g, 70, 40, 2.6, pa, 'rgba(160,172,190,0.65)');
    var a0 = A_(lt, L[0], 0.6) * st1, a1 = A_(lt, L[1], 0.6) * st1;
    glow(g, 30, 22, 9, 'rgba(98,214,160,0.9)', 0.22 * a0);
    chip(g, 30, 13, '觉得很简单', GRN, a0, 'rgba(12,40,30,0.95)');
    chip(g, 70, 13, '觉得枯燥、很难', DIM, a1);
    for (i = 0; i < 5; i++) { var an = lt * 1.1 + i * 1.256; dot(g, 30 + Math.cos(an) * 8, 22 + Math.sin(an) * 4, 0.28, GOLD, a0 * (0.5 + 0.5 * Math.sin(lt * 3 + i))); }
    // stage B: off-key song
    var sb = A_(lt, L[2], 0.7) * (1 - A_(lt, L[4] - 0.2, 0.6));
    if (sb > 0.01) {
      for (i = 0; i < 5; i++) ln(g, 20, 17 + i * 2.6, 80, 17 + i * 2.6, 'rgba(238,242,248,0.45)', 0.16, null, sb);
      var ny = [28, 25.4, 22.8, 25.4, 20.2, 22.8, 17, 20.2];
      for (i = 0; i < 8; i++) {
        var t0 = L[2] + 0.3 + i * 0.28, na = A_(lt, t0, 0.4) * sb; if (na <= 0.01) continue;
        var off = (i === 4 || i === 6) ? A_(lt, L[3], 0.5) : 0, wob = off * Math.sin(lt * 9 + i) * 0.5;
        var x = 26 + i * 6.8, y = ny[i] + off * (i === 4 ? 1.7 : -1.4) + wob, col = off > 0.4 ? RED : FG;
        glow(g, x, y, 3, off > 0.4 ? 'rgba(255,107,107,0.9)' : 'rgba(242,198,107,0.8)', 0.3 * na);
        dot(g, x, y, 1.15, col, na); ln(g, x + 1.1, y, x + 1.1, y - 4.6, col, 0.22, null, na);
      }
      chip(g, 50, 36, '唱歌总跑调', DIM, A_(lt, L[2] + 0.4, 0.6) * (1 - A_(lt, L[3] - 0.1, 0.5)));
      chip(g, 50, 36, '少了很多乐趣', RED, A_(lt, L[3] + 0.1, 0.6), 'rgba(50,20,20,0.95)');
    }
    // stage C: the eye
    var sc = A_(lt, L[4], 0.8) * (1 - A_(lt, L[6] - 0.1, 0.5));
    var move = eio(pr(lt, L[6] - 0.2, 0.9)), ey = mix(24, 11, move), es = mix(4.8, 2.4, move);
    var eA = A_(lt, L[4] + 0.1, 0.8);
    if (eA > 0.01) {
      glow(g, 50, ey, 18 * es / 4.8 + 4, 'rgba(242,198,107,0.9)', 0.3 * eA);
      for (i = 0; i < 10; i++) { var an2 = i / 10 * TAU + lt * 0.3, r1 = es * 3.6, r2 = es * 4.6; ln(g, 50 + Math.cos(an2) * r1, ey + Math.sin(an2) * r1 * 0.7, 50 + Math.cos(an2) * r2, ey + Math.sin(an2) * r2 * 0.7, 'rgba(242,198,107,0.5)', 0.18, null, eA * (1 - move)); }
      h_eye(g, 50, ey, es, GOLD, eA, 0.1);
    }
    tx(g, '想象力', 50, 37, 6.2, GOLD, 'center', 900, SANS, A_(lt, L[5] - 0.2, 0.7) * (1 - A_(lt, L[6] - 0.1, 0.5)));
    // stage D: the three odd things this video looks at
    var xs = [24, 50, 76], nm = ['烫', '弹跳', '水滴'], ncol = [HOT, GOLD, ICE];
    chip(g, 50, 20.5, '那些离奇的东西', DIM, A_(lt, L[6] + 0.2, 0.6) * (1 - A_(lt, L[7] - 0.1, 0.5)));
    for (i = 0; i < 3; i++) {
      var da = A_(lt, L[6] + 0.3 + i * 0.3, 0.7); if (da <= 0.01) continue;
      var rv = A_(lt, L[7] + 0.1 + i * 0.35, 0.8), cx = xs[i], cy = 32;
      for (var k = 0; k < 5; k++) { var ph = k * 1.3 + i; halo(g, cx + Math.sin(lt * 0.8 + ph) * 2.4, cy + Math.cos(lt * 0.7 + ph * 1.4) * 1.8, 6.5, 'rgba(147,161,182,0.35)', da * (1 - rv)); }
      tx(g, '？', cx, cy, 7, GOLD, 'center', 900, SANS, da * (1 - rv));
      if (rv > 0.01) {
        g.save(); g.globalAlpha *= rv;
        rbox(g, cx - 9.5, cy - 8, 19, 16, 1.4, 'rgba(238,242,248,0.25)', 0.18, 'rgba(255,255,255,0.035)', 1);
        var q;
        if (i === 0) { var hp0 = hexG(5.6, 2.9, cx, cy); for (q = 0; q < hp0.length; q++) jat(g, hp0[q][0], hp0[q][1], 0.95, lt, q * 1.9, 0.8, 9, 0.95, 1, true); }
        if (i === 1) { var bo = bounce(((lt - L[7]) % 2.8 + 2.8) % 2.8, 1.0, 0.72, 9); ln(g, cx - 7, cy + 5.6, cx + 7, cy + 5.6, 'rgba(238,242,248,0.5)', 0.2, null, 1); glow(g, cx, cy + 4.1 - bo[0], 3.2, 'rgba(255,157,110,0.9)', 0.35); dot(g, cx, cy + 4.1 - bo[0], 1.5, HOT, 1); }
        if (i === 2) { var hp2 = hexG(5.8, 2.7, cx, cy); for (q = 0; q < hp2.length; q++) jat(g, hp2[q][0], hp2[q][1], 1.0, lt, q * 1.3, 0.25, 4, 0.1, 1, false); ring(g, cx, cy, 6.6, 'rgba(143,208,255,0.5)', 0.2, 1); }
        g.restore();
        tx(g, nm[i], cx, 21.6, 2.8, ncol[i], 'center', 900, SANS, rv);
      }
    }
    chip(g, 50, 44, '看清它们本来的样子', GOLD, A_(lt, L[7] + 1.2, 0.7), 'rgba(48,38,12,0.95)');
  };

  // ---------- d2: hot = fast jiggling ----------
  DRAW.d2 = function (g, lt, L) {
    var i, j, A = A_(lt, 0.2, 0.7);
    function box(x0, col, name, nm, a) {
      rbox(g, x0, 14, 32, 25, 1.2, col, 0.22, 'rgba(255,255,255,0.03)', a);
      tx(g, name, x0 + 16, 10, 4.2, col, 'center', 900, SANS, a);
    }
    box(12, ICE, '冷', 0, A * A_(lt, L[0], 0.7)); box(56, HOT, '热', 0, A * A_(lt, L[0] + 0.5, 0.7));
    var at = A_(lt, L[1], 0.8), hot = A_(lt, L[2], 1.6), cold = A_(lt, L[3], 1.6);
    for (j = 0; j < 4; j++) for (i = 0; i < 5; i++) {
      var ph = i * 1.7 + j * 2.3, bx = 15.8 + i * 5.6, by = 17.6 + j * 5.3, a = at * A_(lt, L[1] + (i + j) * 0.06, 0.5);
      jat(g, bx, by, 1.35, lt, ph, 0.9 * (1 - 0.75 * cold) + 0.2, 4.5 - 3 * cold, 0.5 - 0.35 * cold, a, true);
      var hx = 59.8 + i * 5.6;
      jat(g, hx, by, 1.35, lt, ph + 3, 0.9 + 0.55 * hot, 4.5 + 8 * hot, 0.5 + 0.5 * hot, a, true);
    }
    chip(g, 50, 44.5, '都在振动，只是快慢不同', DIM, A_(lt, L[1] + 0.8, 0.7) * (1 - A_(lt, L[2] - 0.1, 0.5)));
    chip(g, 72, 44.2, '振动越快，越热', HOT, A_(lt, L[2] + 0.2, 0.6), 'rgba(50,24,18,0.95)');
    chip(g, 28, 44.2, '振动越慢，越冷', ICE, A_(lt, L[3] + 0.2, 0.6));
    glow(g, 72, 26, 20, 'rgba(255,125,60,0.9)', 0.16 * hot);
    glow(g, 28, 26, 18, 'rgba(110,185,255,0.9)', 0.12 * cold);
  };

  // ---------- d3: how heat spreads ----------
  DRAW.d3 = function (g, lt, L) {
    var i, j, A = A_(lt, 0.2, 0.7);
    var wallK = A_(lt, L[3], 2.0), airK = A_(lt, L[5], 2.2), liqK = A_(lt, L[1], 1.2);
    rbox(g, 38.2, 10.5, 10.6, 31, 1.0, 'rgba(233,217,196,0.55)', 0.2, 'rgba(233,217,196,0.10)', A * A_(lt, L[2] - 0.4, 0.6));
    rbox(g, 9, 10.5, 28, 31, 1.0, null, 0, 'rgba(120,70,40,0.35)', A);
    // coffee atoms
    for (j = 0; j < 6; j++) for (i = 0; i < 4; i++) {
      var x = 13.5 + i * 6.8 + (j & 1 ? 1.6 : 0), y = 14 + j * 5.0;
      jat(g, x, y, 1.45, lt, i * 1.9 + j * 2.9, 0.55 + 0.95 * liqK, 4 + 6 * liqK, 0.62 + 0.38 * liqK, A * A_(lt, 0.4 + (i + j) * 0.05, 0.5), true);
    }
    // wall atoms
    for (j = 0; j < 7; j++) for (i = 0; i < 2; i++) {
      var wx = 41.4 + i * 4.6, wy = 13.5 + j * 4.3;
      jat(g, wx, wy, 1.3, lt, i * 2.3 + j * 1.7 + 5, 0.15 + 1.0 * wallK, 2 + 7 * wallK, 0.05 + 0.75 * wallK, A * A_(lt, L[2] - 0.3, 0.6), true);
    }
    // air atoms
    for (j = 0; j < 5; j++) for (i = 0; i < 5; i++) {
      var ax = 55.5 + i * 7.2 + (j & 1 ? 3 : 0), ay = 14.5 + j * 6.0;
      jat(g, ax, ay, 1.05, lt, i * 1.3 + j * 2.1 + 9, 0.2 + 1.0 * airK, 2 + 6 * airK, 0.02 + 0.55 * airK, A * (0.22 + 0.78 * A_(lt, L[4] + 0.4, 0.8)), true);
    }
    // bumps
    var bm = A_(lt, L[2], 0.5) * (1 - A_(lt, L[6], 0.5)), bm2 = A_(lt, L[5], 0.5) * (1 - A_(lt, L[6], 0.5));
    for (j = 0; j < 7; j++) {
      var pul = 0.35 + 0.65 * Math.max(0, Math.sin(lt * 7 + j * 1.9));
      arrow(g, 34.5, 13.5 + j * 4.3, 38.4, 13.5 + j * 4.3, HOT, 0.28, bm * pul * 0.85, 0.8);
      arrow(g, 49.8, 13.5 + j * 4.3, 53.6, 13.5 + j * 4.3, HOT, 0.28, bm2 * pul * 0.7, 0.8);
    }
    chip(g, 23, 46.2, '咖啡里的原子', HOT, A_(lt, L[0] + 0.2, 0.6) * 0, 'rgba(50,24,18,0.95)');
    tx(g, '咖啡', 23, 7.5, 3.2, HOT, 'center', 900, SANS, A_(lt, L[0] + 0.1, 0.7));
    tx(g, '杯壁', 43.5, 7.5, 3.2, CUPC, 'center', 900, SANS, A_(lt, L[2] + 0.2, 0.7));
    tx(g, '空气', 72, 7.5, 3.2, ICE, 'center', 900, SANS, A_(lt, L[5] + 0.2, 0.7));
    var c6 = A_(lt, L[6], 0.7) * (1 - A_(lt, L[7] - 0.1, 0.5)), c7 = A_(lt, L[7], 0.7);
    chip(g, 50, 45.2, '传过去的，只是振动', GOLD, c6, 'rgba(48,38,12,0.95)');
    if (c7 > 0.01) {
      chip(g, 50, 45.2, '一种无规则的乱动', GOLD, c7, 'rgba(48,38,12,0.95)');
    }
  };

  // ---------- d4: a ball stops, atoms never do ----------
  DRAW.d4 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.7), GY = 34;
    // left: ball
    var tb = lt - (L[0] + 0.4), bo = tb > 0 ? bounce(tb, 1.6, 0.8, 17) : [17, 0, 1];
    ln(g, 8, GY, 46, GY, 'rgba(238,242,248,0.5)', 0.25, null, A);
    var ballA = A_(lt, L[0], 0.7);
    glow(g, 27, GY - 3 - bo[0], 5, 'rgba(255,157,110,0.9)', 0.3 * ballA);
    dot(g, 27, GY - 2.8 - bo[0], 2.8, HOT, ballA); dot(g, 26.2, GY - 3.7 - bo[0], 0.9, 'rgba(255,255,255,0.7)', ballA * 0.7);
    tx(g, '小球', 27, 9.5, 3.2, HOT, 'center', 900, SANS, ballA);
    var eb = A_(lt, L[1], 0.7);
    rbox(g, 8, 40.6, 38, 1.8, 0.8, 'rgba(238,242,248,0.4)', 0.15, null, eb);
    rbox(g, 8, 40.6, 38 * (tb > 0 ? bo[2] : 1), 1.8, 0.8, null, 0, HOT, eb);
    tx(g, '小球的能量', 27, 44.8, 1.9, DIM, 'center', 600, SANS, eb);
    // right: atoms in a box
    var ra = A_(lt, L[2], 0.8);
    rbox(g, 54, 14, 38, 20, 1.0, ICE, 0.22, 'rgba(255,255,255,0.03)', ra);
    tx(g, '原子', 73, 9.5, 3.2, ICE, 'center', 900, SANS, ra);
    var sp = [[13.1, 9.3, 0.0, 0.9], [8.2, 12.7, 1.3, 0.2], [10.6, 7.4, 0.7, 1.6]];
    for (i = 0; i < 3; i++) {
      var ax = 56.6 + 32.8 * tri(lt * sp[i][0] / 32.8 + sp[i][2]), ay = 16.6 + 14.8 * tri(lt * sp[i][1] / 14.8 + sp[i][3]);
      var bx = 56.6 + 32.8 * tri((lt - 0.05) * sp[i][0] / 32.8 + sp[i][2]), by = 16.6 + 14.8 * tri((lt - 0.05) * sp[i][1] / 14.8 + sp[i][3]);
      ln(g, ax, ay, bx, by, 'rgba(143,208,255,0.5)', 1.3, null, ra);
      glow(g, ax, ay, 3.4, 'rgba(124,196,255,0.9)', 0.4 * ra); dot(g, ax, ay, 1.5, ELE, ra);
    }
    var er = A_(lt, L[4], 0.7);
    rbox(g, 54, 40.6, 38, 1.8, 0.8, 'rgba(238,242,248,0.4)', 0.15, null, er);
    rbox(g, 54, 40.6, 38, 1.8, 0.8, null, 0, ICE, er);
    tx(g, '原子的能量', 73, 44.8, 1.9, DIM, 'center', 600, SANS, er);
    chip(g, 73, 37, '完美弹性：撞来撞去不丢能量', ICE, A_(lt, L[3] + 0.3, 0.7) * (1 - A_(lt, L[5] - 0.1, 0.5)));
    chip(g, 27, 37, '每弹一次，丢一点', HOT, A_(lt, L[1] + 0.8, 0.7), 'rgba(50,24,18,0.95)');
    chip(g, 73, 37, '永远不会停', GOLD, A_(lt, L[5], 0.7), 'rgba(48,38,12,0.95)');
  };

  // ---------- d5: why the ball stops: order -> disorder ----------
  DRAW.d5 = function (g, lt, L) {
    var i, j, A = A_(lt, 0.2, 0.7), GY = 32.2, bx0 = 50, R = 3.1;
    var t0 = L[0] + 0.5, span = L[5] - L[0] - 0.9, r = 0.78, T0 = (1 - r) * span;
    var tb = lt - t0, bo = tb > 0 ? bounce(tb, T0, r, 14.5) : [14.5, 0, 1];
    var firstHit = t0 + T0 / 2;
    var heatTot = tb > T0 / 2 ? 0.85 * (1 - bo[2]) : 0;
    // impact flashes: last impact time
    var lastHit = -9, tt = T0 / 2, Tn = T0;
    for (i = 0; i < 40 && Tn > 0.1; i++) { if (t0 + tt <= lt) lastHit = t0 + tt; Tn *= r; tt += Tn; }
    var sinceHit = lt - lastHit, spike = lastHit > -1 ? Math.exp(-sinceHit / 0.45) : 0;
    // floor atoms
    var cols = 19, rows = 3;
    for (j = 0; j < rows; j++) for (i = 0; i < cols; i++) {
      var x = 14 + i * 4.0 + (j & 1 ? 2 : 0), y = 35.2 + j * 3.6, d = (x - bx0) / 15, ga = Math.exp(-d * d);
      var k = clamp(heatTot * (0.55 + 0.6 * ga) + 0.5 * spike * ga), amp = 0.2 + 1.6 * heatTot * (0.4 + 0.6 * ga) + 1.2 * spike * ga;
      jat(g, x, y, 1.25, lt, i * 1.7 + j * 2.3, amp, 4 + 8 * k, k * 0.9, A, true);
    }
    ln(g, 10, GY, 90, GY, 'rgba(238,242,248,0.4)', 0.2, null, A);
    // ball
    var by = GY - R - bo[0], ballA = A_(lt, 0.2, 0.7);
    glow(g, bx0, by, 6, 'rgba(255,157,110,0.9)', 0.3 * ballA);
    dot(g, bx0, by, R, HOT, ballA); dot(g, bx0 - 1, by - 1.1, 1.0, 'rgba(255,255,255,0.7)', ballA * 0.7);
    // ordered arrows on the ball while falling / jiggle arrows on the floor
    var oa = A_(lt, L[1], 0.7) * (1 - A_(lt, L[3] + 0.8, 0.7));
    for (i = 0; i < 4; i++) arrow(g, bx0 + (i - 1.5) * 1.7, by - 10, bx0 + (i - 1.5) * 1.7, by - 5, GOLD, 0.25, oa, 0.7);
    chip(g, 24, 15, '整齐：一起向下', GOLD, oa, 'rgba(48,38,12,0.95)');
    var ja = A_(lt, L[3], 0.7) * (1 - A_(lt, L[6] - 0.1, 0.6));
    for (i = 0; i < 9; i++) { var an = lt * 3 + i * 2.1, jxx = 50 + (i - 4) * 4.4, jyy = 37 + (i % 3) * 3.6; arrow(g, jxx, jyy, jxx + Math.cos(an) * 2.4, jyy + Math.sin(an * 1.3) * 2.4, HOT, 0.22, ja * 0.8, 0.6); }
    chip(g, 76, 20, '振动：各动各的', HOT, ja, 'rgba(50,24,18,0.95)');
    ln(g, 70, 22, 60, 33, 'rgba(255,157,110,0.5)', 0.15, [0.5, 0.5], ja);
    chip(g, 50, 9, '总能量没有少', GOLD, A_(lt, L[6], 0.7) * (1 - A_(lt, L[7] - 0.1, 0.5)), 'rgba(48,38,12,0.95)');
    var c7 = A_(lt, L[7], 0.7) * (1 - A_(lt, L[8] - 0.1, 0.5));
    chip(g, 50, 9, '整齐的运动  →  杂乱振动', GOLD, c7, 'rgba(48,38,12,0.95)');
    var c8 = A_(lt, L[8], 0.8);
    chip(g, 50, 9, '地板，悄悄变热了', HOT, c8, 'rgba(50,24,18,0.95)');
    glow(g, 50, 38, 26, 'rgba(255,125,60,0.9)', 0.22 * c8);
  };
