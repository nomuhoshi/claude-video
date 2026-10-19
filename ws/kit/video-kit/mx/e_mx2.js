  // ================= Maxwell: scenes m7-m12 (Aberdeen, Faraday, vortices, the gap, the wave, the speed) =================
  // ---------- m7: a professor, a wife, a lost job, London ----------
  DRAW.m7 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8), s1 = A * (1 - A_(lt, L[3] - 0.3, 0.6));
    if (s1 > 0.01) {
      chip(g, 50, 8.5, '阿伯丁 · 1856 · 25 岁', GOLD, A_(lt, L[0], 0.6) * s1, 'rgba(48,38,12,0.95)');
      rbox(g, 10, 14, 30, 18, 0.6, '#8a6a46', 0.6, 'rgba(30,40,38,0.95)', s1);
      tx(g, '自然哲学', 25, 21, 2.4, 'rgba(235,240,230,0.85)', 'center', 700, SANS, s1); tx(g, 'F = m a', 25, 26.5, 2.0, 'rgba(235,240,230,0.65)', 'center', 600, SANS, s1);
      for (i = 0; i < 6; i++) dot(g, 12 + i * 5, 44, 1.0, 'rgba(200,190,175,0.5)', s1 * (1 - A_(lt, L[1], 0.5)));
      mxOld(g, 47, 43, 15, s1, { pose: 'forward', flip: true }, lt);
      var k = A_(lt, L[1], 0.7) * (1 - A_(lt, L[2] - 0.2, 0.5));
      katherine(g, 64, 43, 14, s1 * A_(lt, L[1], 0.7), {}, lt);
      if (k > 0.01) { ring(g, 54.5, 23, 1.6, GOLD, 0.4, k * s1); ring(g, 57, 23, 1.6, GOLD, 0.4, k * s1); glow(g, 55.7, 23, 5, 'rgba(242,198,107,0.9)', 0.4 * k * s1); tx(g, '院长的女儿', 64, 15.5, 1.8, '#f6a8c8', 'center', 700, SANS, k * s1); }
      var mg = A_(lt, L[2], 0.6) * s1;
      if (mg > 0.01) {
        var m = eio(pr(lt, L[2] + 0.2, 1.0));
        for (i = 0; i < 2; i++) { var bx = mix(i ? 88 : 72, 80, m); rbox(g, bx - 5, 18, 10, 9, 0.2, null, 0, 'rgba(110,100,120,' + (0.9 - 0.4 * m) + ')', mg); }
        tx(g, '两所学校合并', 80, 31, 1.8, DIM, 'center', 700, SANS, mg);
        chip(g, 80, 14, '丢了工作', RED, A_(lt, L[2] + 1.0, 0.5) * s1, 'rgba(50,20,20,0.95)');
        rbox(g, 40, 34.5, 14, 3.2, 0.3, 'rgba(242,198,107,0.6)', 0.15, 'rgba(48,38,12,0.95)', mg); tx(g, '麦克斯韦 教授', 47, 36.6, 1.6, GOLD, 'center', 800, SANS, mg); bigX(g, 47, 36.1, 2.2, A_(lt, L[2] + 1.0, 0.4) * s1);
      }
    }
    var s2 = A_(lt, L[3] - 0.2, 0.7);
    if (s2 > 0.01) {
      chip(g, 50, 8.5, '1860 · 伦敦国王学院', GOLD, s2, 'rgba(48,38,12,0.95)');
      g.save(); g.globalAlpha *= s2 * 0.9; g.fillStyle = '#2a2f3d'; g.fillRect(14, 16, 6, 28); g.beginPath(); g.moveTo(13.5, 16); g.lineTo(17, 10); g.lineTo(20.5, 16); g.closePath(); g.fill(); g.restore();
      ring(g, 17, 20, 1.8, 'rgba(255,220,160,0.8)', 0.3, s2); glow(g, 17, 20, 3, 'rgba(255,220,160,0.9)', 0.4 * s2);
      rbox(g, 58, 22, 34, 22, 0.2, null, 0, 'rgba(90,86,104,0.95)', s2);
      for (i = 0; i < 8; i++) rbox(g, 60 + i * 4, 25, 2, 15, 0.2, null, 0, 'rgba(126,120,140,0.95)', s2);
      tx(g, '国王学院', 75, 46.5, 1.8, DIM, 'center', 700, SANS, s2);
      var w = clamp((lt - L[3]) / 2.4);
      mxOld(g, mix(28, 44, eio(w)), 44, 14, s2, { walk: w > 0 && w < 1 ? lt * 7 : null }, lt);
      katherine(g, mix(20, 36, eio(w)), 44, 13, s2, { name: '' }, lt);
    }
  };

  // ---------- m8: two generations, one idea ----------
  DRAW.m8 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8), s1 = A * (1 - A_(lt, L[3] - 0.3, 0.6));
    if (s1 > 0.01) {
      // field lines turn into mathematics on a sheet
      var mo = A_(lt, L[0] + 1.0, 1.2), fly = eio(pr(lt, L[1], 1.6)), px = mix(36, 70, fly), py = 22 - Math.sin(fly * Math.PI) * 8;
      var pa = s1 * (1 - A_(lt, L[2], 0.4));
      rbox(g, px - 9, py - 7, 18, 14, 0.4, null, 0, 'rgba(236,226,204,0.93)', pa);
      for (i = 0; i < 5; i++) { g.save(); g.globalAlpha *= pa * (1 - mo); g.strokeStyle = '#3a5a7a'; g.lineWidth = 0.22; g.beginPath(); g.ellipse(px, py, 2 + i * 1.5, 1 + i * 1.1, 0, 0, TAU); g.stroke(); g.restore(); }
      g.save(); g.globalAlpha *= pa * mo; ['dα/dx + dβ/dy', '= 4π ρ', 'a = dγ/dy − dβ/dz'].forEach(function (s, k) { tx(g, s, px, py - 3 + k * 3.2, 1.6, '#3a2a1a', 'center', 700, SANS, 1); }); g.restore();
      chip(g, 36, 33, '《论法拉第的力线》', FG, A_(lt, L[0] + 0.4, 0.5) * (1 - A_(lt, L[1], 0.4)) * s1);
      mxYoung(g, 18, 43, 14, s1, { name: '麦克斯韦' }, lt);
      faraday(g, 84, 43, 15, s1, { name: '法拉第' }, lt);
      var rp = A_(lt, L[2], 0.6) * s1;
      tx(g, '“我起初几乎吓了一跳。”', 50, 14, 3.0, GOLD, 'center', 900, SANS, rp);
      tx(g, '—— 法拉第的回信，1857', 62, 18.5, 1.7, DIM, 'center', 700, SANS, rp);
      var bk = eio(pr(lt, L[2] + 0.2, 1.4)), ea = rp * (1 - A_(lt, L[2] + 1.6, 0.3));
      rbox(g, mix(76, 26, bk) - 3, 28 - Math.sin(bk * Math.PI) * 6, 6, 4, 0.3, 'rgba(242,198,107,0.6)', 0.15, 'rgba(236,226,204,0.95)', ea);
    }
    var s2 = A_(lt, L[3] - 0.2, 0.7);
    if (s2 > 0.01) {
      var w = eio(pr(lt, L[3], 1.4));
      mxOld(g, mix(26, 43, w), 44, 15, s2, { walk: w > 0 && w < 1 ? lt * 7 : null, pose: w >= 1 ? 'forward' : 'down' }, lt);
      faraday(g, mix(74, 57, w), 44, 15, s2, { walk: w > 0 && w < 1 ? lt * 7 : null, pose: w >= 1 ? 'forward' : 'down', flip: true }, lt);
      if (lt > L[3] + 1.4) glow(g, 50, 37, 5, 'rgba(242,198,107,0.9)', 0.5 * pulse(lt, L[3] + 1.4, 0.6) * s2);
      var bb = A_(lt, L[4], 0.6) * (1 - A_(lt, L[5], 0.6));
      // thought bubbles: pictures for one, symbols for the other
      if (bb > 0.01) {
        rbox(g, 16, 10, 22, 13, 2, 'rgba(201,184,255,0.6)', 0.2, 'rgba(20,24,34,0.9)', bb * s2);
        tx(g, '∇ × E = − ∂B/∂t', 27, 15, 1.9, MX_NAME, 'center', 700, SANS, bb * s2); tx(g, '∇ · B = 0', 27, 19.5, 1.9, MX_NAME, 'center', 700, SANS, bb * s2);
        rbox(g, 62, 10, 22, 13, 2, 'rgba(143,208,255,0.6)', 0.2, 'rgba(20,24,34,0.9)', bb * s2);
        for (i = 0; i < 4; i++) { g.save(); g.globalAlpha *= bb * s2; g.strokeStyle = ICE; g.lineWidth = 0.22; g.beginPath(); g.ellipse(73, 16.5, 2 + i * 2.2, 1 + i * 1.3, 0, 0, TAU); g.stroke(); g.restore(); }
        dot(g, 38, 25, 0.6, 'rgba(201,184,255,0.6)', bb * s2); dot(g, 40, 28, 0.4, 'rgba(201,184,255,0.6)', bb * s2);
        dot(g, 62, 25, 0.6, 'rgba(143,208,255,0.6)', bb * s2); dot(g, 60, 28, 0.4, 'rgba(143,208,255,0.6)', bb * s2);
        tx(g, '一个满脑子方程', 27, 26, 1.7, DIM, 'center', 700, SANS, bb * s2); tx(g, '一个几乎不用方程', 73, 26, 1.7, DIM, 'center', 700, SANS, bb * s2);
      }
      var mg = A_(lt, L[5], 0.8);
      if (mg > 0.01) {
        rbox(g, 34, 9, 32, 16, 2.4, 'rgba(242,198,107,0.7)', 0.25, 'rgba(24,22,18,0.92)', mg);
        for (i = 0; i < 4; i++) { g.save(); g.globalAlpha *= mg * 0.7; g.strokeStyle = ICE; g.lineWidth = 0.2; g.beginPath(); g.ellipse(50, 17, 3 + i * 3, 1.5 + i * 1.6, 0, 0, TAU); g.stroke(); g.restore(); }
        tx(g, '∇ × E = − ∂B/∂t', 50, 17.6, 2.2, GOLD, 'center', 800, SANS, mg);
        glow(g, 50, 17, 16, 'rgba(242,198,107,0.9)', 0.25 * mg);
        chip(g, 50, 29.5, '一生的朋友', GOLD, mg, 'rgba(48,38,12,0.95)');
      }
    }
  };

  // ---------- m9: a mechanical sea of vortices and idle wheels ----------
  var VX = (function () { var P = [], r, c; for (r = 0; r < 4; r++) for (c = 0; c < 8; c++) P.push([16 + c * 9.6 + (r % 2) * 4.8, 13 + r * 8.6, r]); return P; })();
  DRAW.m9 = function (g, lt, L) {
    var i, j, A = A_(lt, 0.2, 0.8);
    chip(g, 50, 6.5, '1861 · 力线的“机械模型”', GOLD, A_(lt, L[0], 0.6) * (1 - A_(lt, L[5], 0.5)), 'rgba(48,38,12,0.95)');
    var mv = A_(lt, L[3], 0.6), mg = A_(lt, L[4], 0.6);
    // the moving row of balls is between rows 1 and 2; vortices next to it spin
    var shift = Math.max(0, lt - L[3]) * 3.2 * mv;
    for (i = 0; i < VX.length; i++) {
      var v = VX[i], a = A_(lt, L[1] + (i % 8) * 0.06 + v[2] * 0.12, 0.5);
      if (a <= 0.01) continue;
      var dir = v[2] <= 1 ? 1 : -1, near = (v[2] === 1 || v[2] === 2) ? 1 : 0.35;
      var ang = (lt - L[1]) * 0.6 + dir * Math.max(0, lt - L[3]) * 2.6 * mv * near;
      g.save(); g.globalAlpha *= a; g.strokeStyle = 'rgba(143,208,255,' + (0.35 + 0.4 * mg * near) + ')'; g.lineWidth = 0.22; g.beginPath();
      for (j = 0; j <= 6; j++) { var t = j / 6 * TAU + Math.PI / 6; if (j === 0) g.moveTo(v[0] + Math.cos(t) * 4.6, v[1] + Math.sin(t) * 4.6); else g.lineTo(v[0] + Math.cos(t) * 4.6, v[1] + Math.sin(t) * 4.6); }
      g.stroke(); g.restore();
      arcl(g, v[0], v[1], 2.6, ang, ang + 4.4, ICE, 0.3, a); arrowHead(g, v[0] + Math.cos(ang + 4.4) * 2.6, v[1] + Math.sin(ang + 4.4) * 2.6, ang + 4.4 + Math.PI / 2, 0.7, ICE, a);
      if (mg > 0.01 && near > 0.5) glow(g, v[0], v[1], 4, 'rgba(143,208,255,0.9)', 0.35 * mg * a);
    }
    // idle wheels between the rows
    var ba = A_(lt, L[2], 0.6);
    for (j = 0; j < 3; j++) {
      var yy = 13 + j * 8.6 + 4.3, moving = j === 1;
      for (i = 0; i < 18; i++) {
        var x = 10 + i * 4.8 + (moving ? (shift % 4.8) : 0);
        if (x > 92) continue;
        dot(g, x, yy, 0.75, moving && mv > 0.05 ? GOLD : '#c9cfdb', ba * A_(lt, L[2] + i * 0.03, 0.3));
      }
    }
    if (mv > 0.01) { arrow(g, 70, 30.2, 80, 30.2, GOLD, 0.35, mv, 1); chip(g, 86, 30.2, '电流', GOLD, mv, 'rgba(48,38,12,0.95)'); }
    if (mg > 0.01) chip(g, 86, 19, '磁场', ICE, mg);
    tx(g, '涡旋', 12, 46, 1.8, ICE, 'center', 700, SANS, A_(lt, L[1], 0.5)); tx(g, '滚珠', 24, 46, 1.8, '#c9cfdb', 'center', 700, SANS, ba);
    var bl = A_(lt, L[5], 0.6);
    if (bl > 0.01) { glow(g, 50, 7, 6, 'rgba(255,230,150,0.9)', 0.6 * bl); dot(g, 50, 7, 1.4, '#ffe7a8', bl); chip(g, 50, 46, '古怪，却带出了一个新想法', GOLD, bl, 'rgba(48,38,12,0.95)'); }
  };

  // ---------- m10: the gap in the capacitor ----------
  DRAW.m10 = function (g, lt, L) {
    var i, j, A = A_(lt, 0.2, 0.8), ox = 50, oy = 26.5, gap = 5, R = 7.5;
    var q = clamp((lt - 0.6) / 14);                         // charge builds up all the way through the scene
    // back halves of the rings around the wire
    var rA = A_(lt, L[0] + 0.4, 0.6), gA = A_(lt, L[5], 0.8);
    [-24, 24].forEach(function (X) { ring3(g, ox, oy, [X, 0, 0], 3.6, 'x', 'rgba(143,208,255,0.5)', 0.3, rA, 'back', -lt * 2); });
    ring3(g, ox, oy, [0, 0, 0], 10, 'x', 'rgba(242,198,107,0.5)', 0.35, gA, 'back', -lt * 2);
    // wire, battery, current
    var W1 = [P3(ox, oy, -44, 0, 0), P3(ox, oy, -gap, 0, 0)], W2 = [P3(ox, oy, gap, 0, 0), P3(ox, oy, 44, 0, 0)];
    wire(g, [[W1[0][0], W1[0][1]], [W1[1][0], W1[1][1]]], A, 1, lt); wire(g, [[W2[0][0], W2[0][1]], [W2[1][0], W2[1][1]]], A, 1, lt);
    tx(g, '电流', 14, 22, 1.9, '#ffd9a8', 'center', 800, SANS, A_(lt, L[0], 0.5));
    // plates: discs facing each other
    [-gap, gap].forEach(function (X, k) {
      var pts = []; for (j = 0; j < 36; j++) { var t = j / 36 * TAU; pts.push([X, Math.cos(t) * R, Math.sin(t) * R]); }
      poly3(g, ox, oy, pts, k ? 'rgba(150,170,200,0.35)' : 'rgba(170,190,220,0.45)', 'rgba(220,230,245,0.75)', 0.2, A);
      var n = Math.floor(q * 14);
      for (j = 0; j < n; j++) { var t2 = j * 2.39996, rr = Math.sqrt((j + 0.5) / 14) * R * 0.8, p = P3(ox, oy, X, Math.cos(t2) * rr, Math.sin(t2) * rr); tx(g, k ? '−' : '+', p[0], p[1] + 0.1, 1.5, k ? NEG : POS, 'center', 900, SANS, A); }
    });
    // the field between the plates grows with the charge
    var ef = A_(lt, L[4] - 0.3, 0.6);
    for (j = 0; j < 7; j++) {
      var t3 = j * 2.39996, rr3 = Math.sqrt((j + 0.5) / 7) * R * 0.7, Y = Math.cos(t3) * rr3, Z = Math.sin(t3) * rr3;
      var p0 = P3(ox, oy, -gap + 0.3, Y, Z), p1 = P3(ox, oy, gap - 0.3, Y, Z);
      ln(g, p0[0], p0[1], p1[0], p1[1], EC, 0.2 + 0.3 * q, null, ef * (0.3 + 0.7 * q)); arrowHead(g, p1[0], p1[1], Math.atan2(p1[1] - p0[1], p1[0] - p0[0]), 0.5 + 0.4 * q, EC, ef * (0.3 + 0.7 * q));
    }
    // front halves
    [-24, 24].forEach(function (X) { ring3(g, ox, oy, [X, 0, 0], 3.6, 'x', BC, 0.35, rA, 'front', -lt * 2); ring3Arrow(g, ox, oy, [X, 0, 0], 3.6, 'x', -lt * 1.6, BC, rA); });
    tx(g, '磁场', 26, 33.5, 1.8, BC, 'center', 800, SANS, rA * (1 - A_(lt, L[5], 0.4))); tx(g, '磁场', 74, 33.5, 1.8, BC, 'center', 800, SANS, rA * (1 - A_(lt, L[5], 0.4)));
    ring3(g, ox, oy, [0, 0, 0], 10, 'x', GOLD, 0.45, gA, 'front', -lt * 2); ring3Arrow(g, ox, oy, [0, 0, 0], 10, 'x', -lt * 1.2, GOLD, gA);
    // what is said
    chip(g, 50, 43, '两块板之间：空的', DIM, A_(lt, L[1], 0.5) * (1 - A_(lt, L[2], 0.4)));
    var br = A_(lt, L[2], 0.5) * (1 - A_(lt, L[4] - 0.2, 0.4));
    if (br > 0.01) { ring3(g, ox, oy, [0, 0, 0], 5, 'x', 'rgba(255,107,107,0.8)', 0.3, br, undefined, -lt); tx(g, '？', 58, 15, 4, RED, 'center', 900, SANS, br); chip(g, 50, 43, '电流在这里断了？', RED, br, 'rgba(50,20,20,0.95)'); }
    mxOld(g, 88, 45, 12, A_(lt, L[3], 0.6), {}, lt);
    chip(g, 50, 43, '没有电荷在流，但电场在变强', GOLD, A_(lt, L[4], 0.5) * (1 - A_(lt, L[5], 0.4)), 'rgba(48,38,12,0.95)');
    chip(g, 50, 43, '变化的电场 → 也能产生磁场', GOLD, gA, 'rgba(48,38,12,0.95)');
    tx(g, 'E', 54, 21, 2.2, EC, 'center', 900, SANS, ef);
  };

  // ---------- m11: changing B makes E, changing E makes B, and off it goes ----------
  DRAW.m11 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8);
    var pA = A_(lt, L[1], 0.6) * (1 - A_(lt, L[3] - 0.3, 0.5)), pB = A_(lt, L[2], 0.6) * (1 - A_(lt, L[3] - 0.3, 0.5));
    function pair(ox, oy, a, axisCol, ringCol, axisName, ringName) {
      if (a <= 0.01) return;
      var grow = 0.6 + 0.4 * Math.sin(lt * 2.4);
      ring3(g, ox, oy, [0, 0, 0], 12, 'y', ringCol, 0.45, a, 'back', -lt * 2.5);
      var p0 = P3(ox, oy, 0, -9 * grow, 0), p1 = P3(ox, oy, 0, 11 * grow, 0);
      ln(g, p0[0], p0[1], p1[0], p1[1], axisCol, 0.8, null, a); arrowHead(g, p1[0], p1[1], -Math.PI / 2, 1.3, axisCol, a);
      ring3(g, ox, oy, [0, 0, 0], 12, 'y', ringCol, 0.45, a, 'front', -lt * 2.5); ring3Arrow(g, ox, oy, [0, 0, 0], 12, 'y', lt * 2, ringCol, a); ring3Arrow(g, ox, oy, [0, 0, 0], 12, 'y', lt * 2 + Math.PI, ringCol, a);
      tx(g, axisName, ox, oy - 15, 2.0, axisCol, 'center', 900, SANS, a); tx(g, ringName, ox + 14, oy + 3.4, 2.0, ringCol, 'left', 900, SANS, a);
    }
    pair(26, 27, pA, BC, EC, '变化的磁场', '电场');
    pair(70, 27, pB, EC, BC, '变化的电场', '磁场');
    chip(g, 26, 43, '法拉第发现的', ICE, pA); chip(g, 70, 43, '麦克斯韦补上的', MX_NAME, pB);
    chip(g, 50, 7.5, '把两件事放在一起', GOLD, A_(lt, L[0], 0.5) * (1 - A_(lt, L[1], 0.4)), 'rgba(48,38,12,0.95)');
    // a chain of loops, each making the next
    var ch = A_(lt, L[3] - 0.1, 0.5) * (1 - A_(lt, L[5] - 0.3, 0.5)), ox = 50, oy = 27, slide = Math.max(0, lt - L[4]) * 6;
    if (ch > 0.01) {
      for (i = 0; i < 9; i++) {
        var X = -36 + i * 8.6 + slide, a = ch * A_(lt, L[3] + i * 0.28, 0.35);
        if (X > 46) continue;
        if (i % 2 === 0) { ring3(g, ox, oy, [X, 0, 0], 5.4, 'z', EC, 0.45, a, undefined); }
        else { ring3(g, ox, oy, [X, 0, 0], 5.4, 'y', BC, 0.45, a, 'back'); ring3(g, ox, oy, [X, 0, 0], 5.4, 'y', BC, 0.45, a, 'front'); }
      }
      tx(g, '电', 12, 18, 2.2, EC, 'center', 900, SANS, ch); tx(g, '磁', 18, 35, 2.2, BC, 'center', 900, SANS, ch);
      chip(g, 50, 43, '电生磁，磁生电，一环扣一环', GOLD, ch * (1 - A_(lt, L[4], 0.4)), 'rgba(48,38,12,0.95)');
      chip(g, 50, 43, '不需要导线，自己往前跑', GOLD, ch * A_(lt, L[4], 0.4), 'rgba(48,38,12,0.95)');
    }
    // the travelling wave
    var wv = A_(lt, L[5] - 0.3, 0.7);
    if (wv > 0.01) {
      var k = 0.5, w = 5;
      seg3(g, ox, oy, [-44, 0, 0], [44, 0, 0], 'rgba(238,242,248,0.4)', 0.25, wv); var tip = P3(ox, oy, 45, 0, 0); arrowHead(g, tip[0], tip[1], Math.atan2(-0.0, 1), 1, 'rgba(238,242,248,0.6)', wv);
      g.save(); g.globalAlpha *= wv; g.lineWidth = 0.45;
      g.strokeStyle = EC; g.beginPath(); for (i = 0; i <= 176; i++) { var X2 = -44 + i * 0.5, p = P3(ox, oy, X2, 8 * Math.sin(k * X2 - w * lt), 0); if (i === 0) g.moveTo(p[0], p[1]); else g.lineTo(p[0], p[1]); } g.stroke();
      g.strokeStyle = BC; g.beginPath(); for (i = 0; i <= 176; i++) { var X3 = -44 + i * 0.5, q = P3(ox, oy, X3, 0, 8 * Math.sin(k * X3 - w * lt)); if (i === 0) g.moveTo(q[0], q[1]); else g.lineTo(q[0], q[1]); } g.stroke();
      g.restore();
      for (i = 0; i <= 44; i++) { var X4 = -44 + i * 2, e = 8 * Math.sin(k * X4 - w * lt), b = 8 * Math.sin(k * X4 - w * lt); seg3(g, ox, oy, [X4, 0, 0], [X4, e, 0], EC, 0.15, wv * 0.6); seg3(g, ox, oy, [X4, 0, 0], [X4, 0, b], BC, 0.15, wv * 0.6); }
      tx(g, '电场', 8, 15, 2.0, EC, 'left', 900, SANS, wv); tx(g, '磁场', 10, 40, 2.0, BC, 'left', 900, SANS, wv);
      chip(g, 50, 7.5, '电磁波', GOLD, wv, 'rgba(48,38,12,0.95)');
    }
  };

  // ---------- m12: how fast? as fast as light ----------
  DRAW.m12 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8);
    var s0 = A * (1 - A_(lt, L[1], 0.5));
    if (s0 > 0.01) {
      g.save(); g.globalAlpha *= s0; g.strokeStyle = EC; g.lineWidth = 0.4; g.beginPath(); for (i = 0; i <= 160; i++) { var x = 10 + i * 0.5, y = 26 - 4 * Math.sin(i * 0.25 - lt * 8); if (i === 0) g.moveTo(x, y); else g.lineTo(x, y); } g.stroke(); g.restore();
      tx(g, '它跑多快？', 50, 40, 3, GOLD, 'center', 900, SANS, s0);
    }
    var fa = A_(lt, L[1], 0.6) * (1 - A_(lt, L[5] - 0.3, 0.5));
    if (fa > 0.01) {
      rich(g, [['v = 1 / √(μ₀ ε₀)', 0]], 50, 13, 3.6, GOLD, fa, 'center', 900, SANS);
      chip(g, 24, 13, 'ε₀ · 电的常数', EC, fa); chip(g, 76, 13, 'μ₀ · 磁的常数', BC, fa);
      tx(g, '都在实验室里测得', 50, 18.5, 1.7, DIM, 'center', 700, SANS, fa);
      var b1 = A_(lt, L[2], 0.4), v1 = 310740 * eo(pr(lt, L[2], 1.6)), b2 = A_(lt, L[3], 0.4), v2 = 314858 * eo(pr(lt, L[3], 1.6));
      tx(g, '算出的电磁波速度', 12, 25, 1.9, FG, 'left', 800, SANS, fa * b1);
      rbox(g, 12, 26.5, 54 * v1 / 330000, 3, 0.6, null, 0, GOLD, fa * b1);
      tx(g, counterNum(v1) + ' 公里/秒', 12 + 54 * v1 / 330000 + 1.5, 29, 2.0, GOLD, 'left', 900, MONO, fa * b1);
      tx(g, '当时测得的光速', 12, 34, 1.9, FG, 'left', 800, SANS, fa * b2);
      rbox(g, 12, 35.5, 54 * v2 / 330000, 3, 0.6, null, 0, ICE, fa * b2);
      tx(g, counterNum(v2) + ' 公里/秒', 12 + 54 * v2 / 330000 + 1.5, 38, 2.0, ICE, 'left', 900, MONO, fa * b2);
      chip(g, 50, 44.5, '几乎一模一样', GOLD, A_(lt, L[4], 0.5) * fa, 'rgba(48,38,12,0.95)');
    }
    var qa = A_(lt, L[5] - 0.2, 0.6);
    if (qa > 0.01) {
      mxOld(g, 18, 44, 15, qa, { pose: 'forward' }, lt);
      g.save(); g.globalAlpha *= qa; typeOn(g, '“我们几乎无法回避这个结论——”', 58, 16, 2.6, FG, lt, L[5], 9, 'center', 800, SANS); g.restore();
      var big = A_(lt, L[6], 0.8);
      glow(g, 58, 28, 18, 'rgba(242,198,107,0.9)', 0.3 * big);
      tx(g, '光，就是电和磁的波动', 58, 28.5, 4.2, GOLD, 'center', 900, SANS, big);
      var grd = g.createLinearGradient(36, 0, 80, 0); grd.addColorStop(0, '#8a5cff'); grd.addColorStop(0.25, '#4f8cff'); grd.addColorStop(0.45, '#4fd08a'); grd.addColorStop(0.65, '#ffe04f'); grd.addColorStop(0.82, '#ff9a3c'); grd.addColorStop(1, '#ff4f4f');
      g.save(); g.globalAlpha *= big; g.fillStyle = grd; g.fillRect(36, 34, 44 * eo(pr(lt, L[6] + 0.2, 1.2)), 1.4); g.restore();
    }
  };
