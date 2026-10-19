  // ================= Maxwell: scenes m13-m18 (the four equations and the spectrum) =================
  var EQS = ['∇ · E = ρ / ε₀', '∇ · B = 0', '∇ × E = − ∂B / ∂t', '∇ × B = μ₀J + μ₀ε₀ ∂E/∂t'];
  function eqCard(g, n, a, x, y) { if (a <= 0.01) return; chip(g, x || 14, y || 8, ['①', '②', '③', '④'][n] + '  ' + EQS[n], GOLD, a, 'rgba(48,38,12,0.95)'); }

  // ---------- m13: 1865, twenty equations become four ----------
  DRAW.m13 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8);
    var pg = A * (1 - A_(lt, L[3] - 0.3, 0.5)), sl = eio(pr(lt, L[1] - 0.2, 0.8));
    if (pg > 0.01) {
      var px = mix(50, 26, sl);
      rbox(g, px - 13, 10, 26, 32, 0.6, null, 0, 'rgba(236,226,204,0.95)', pg);
      tx(g, 'A DYNAMICAL THEORY', px, 16, 1.6, '#3a2a1a', 'center', 800, SANS, pg); tx(g, 'OF THE ELECTROMAGNETIC FIELD', px, 18.6, 1.3, '#3a2a1a', 'center', 700, SANS, pg);
      tx(g, '电磁场的动力学理论', px, 24, 2.0, '#5a3a1a', 'center', 900, SANS, pg); tx(g, '1865', px, 29, 2.4, '#8a5a2a', 'center', 900, SANS, pg);
      for (i = 0; i < 5; i++) ln(g, px - 9, 33 + i * 1.5, px + 9, 33 + i * 1.5, 'rgba(90,70,50,0.35)', 0.14, null, pg);
      tx(g, 'J. CLERK MAXWELL', px, 31.4, 1.2, '#3a2a1a', 'center', 700, SANS, pg);
    }
    // twenty little equations
    var tw = A_(lt, L[1], 0.4) * (1 - A_(lt, L[2] + 0.6, 0.4)), mg = eio(pr(lt, L[2], 0.8));
    var S = ['dF/dt', 'dG/dt', 'dH/dt', 'μα = dH/dy − dG/dz', 'μβ = dF/dz − dH/dx', 'μγ = dG/dx − dF/dy', 'dγ/dy − dβ/dz = 4πp′', 'dα/dz − dγ/dx = 4πq′', 'dβ/dx − dα/dy = 4πr′', 'P = μ(γ dy/dt − β dz/dt) …', 'Q = …', 'R = …', 'P = k f', 'Q = k g', 'R = k h', 'P = −ξ p', 'Q = −ξ q', 'R = −ξ r', 'e + df/dx + dg/dy + dh/dz = 0', 'de/dt + dp/dx + dq/dy + dr/dz = 0'];
    if (tw > 0.01) for (i = 0; i < 20; i++) {
      var cx = 50 + (i % 4) * 11, cy = 12 + Math.floor(i / 4) * 6.4, tx0 = 70, ty0 = 18 + Math.floor(i / 5) * 4.6;
      var x = mix(cx, tx0, mg), y = mix(cy, ty0, mg), a = tw * A_(lt, L[1] + i * 0.05, 0.25) * (1 - mg);
      rbox(g, x - 5, y - 2.2, 10, 4.4, 0.4, 'rgba(238,242,248,0.25)', 0.12, 'rgba(20,24,34,0.85)', a);
      tx(g, S[i], x, y + 0.6, 1.0, FG, 'center', 600, SANS, a);
    }
    chip(g, 72, 44.5, '最初：二十个方程', DIM, tw * (1 - mg));
    var fo = A_(lt, L[2] + 0.4, 0.6) * (1 - A_(lt, L[3] - 0.3, 0.5));
    for (i = 0; i < 4; i++) tx(g, EQS[i], 72, 16 + i * 5.6, 2.6, GOLD, 'center', 800, SANS, fo * A_(lt, L[2] + 0.4 + i * 0.15, 0.4));
    chip(g, 72, 39, '更简洁的写法：四个', GOLD, fo, 'rgba(48,38,12,0.95)');
    mxOld(g, 9, 45, 11, A * (1 - A_(lt, L[3] - 0.3, 0.5)), { name: '' }, lt);
    // four cards, one idea each
    var cd = A_(lt, L[3] - 0.1, 0.6);
    if (cd > 0.01) {
      var T = ['电荷发出电场', '磁感线总是闭合', '变化的磁 → 电', '电流、变化的电 → 磁'], C = [EC, BC, EC, BC];
      for (i = 0; i < 4; i++) {
        var a2 = cd * A_(lt, L[3] + i * 0.3, 0.4), x2 = 14 + i * 24;
        rbox(g, x2 - 11, 13, 22, 26, 1.2, 'rgba(242,198,107,0.5)', 0.2, 'rgba(20,24,34,0.88)', a2);
        tx(g, ['①', '②', '③', '④'][i], x2, 19, 3.4, GOLD, 'center', 900, SANS, a2);
        tx(g, T[i], x2, 27, 1.9, C[i], 'center', 900, SANS, a2);
        tx(g, EQS[i], x2, 33.5, i === 3 ? 1.25 : 1.5, FG, 'center', 700, SANS, a2);
      }
    }
  };

  // ---------- m14: charges send out electric field lines ----------
  var SPH = (function () { var P = [], n = 40, i; for (i = 0; i < n; i++) { var y = 1 - 2 * (i + 0.5) / n, r = Math.sqrt(1 - y * y), t = i * 2.39996; P.push([r * Math.cos(t), y, r * Math.sin(t)]); } return P; })();
  DRAW.m14 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8), ox = 46, oy = 27;
    eqCard(g, 0, A_(lt, L[0], 0.5), 50, 7.5);
    var two = A_(lt, L[1], 0.8), n = lt < L[1] ? 20 : 40, len = 15;
    var bub = A_(lt, L[0] + 0.8, 0.6);
    // the closed surface around the charge
    g.save(); g.globalAlpha *= bub * 0.5; var bg = g.createRadialGradient(ox - 3, oy - 3, 1, ox, oy, 11); bg.addColorStop(0, 'rgba(143,208,255,0.02)'); bg.addColorStop(1, 'rgba(143,208,255,0.18)');
    g.fillStyle = bg; g.beginPath(); g.arc(ox, oy, 11, 0, TAU); g.fill(); g.restore(); ring(g, ox, oy, 11, 'rgba(143,208,255,0.5)', 0.2, bub);
    // lines: back first, then the charge, then front
    function lines(front) {
      for (var k = 0; k < SPH.length; k++) {
        var d = SPH[k], on = k < 20 ? 1 : two; if (on <= 0.01) continue;
        if ((d[2] < 0) !== front) continue;
        var p0 = P3(ox, oy, d[0] * 2.4, d[1] * 2.4, d[2] * 2.4), p1 = P3(ox, oy, d[0] * len, d[1] * len, d[2] * len);
        var al = A * on * (front ? 0.95 : 0.4);
        ln(g, p0[0], p0[1], p1[0], p1[1], EC, 0.22, null, al); arrowHead(g, p1[0], p1[1], Math.atan2(p1[1] - p0[1], p1[0] - p0[0]), 0.6, EC, al);
        var f = ((lt * 0.5 + k * 0.13) % 1), pf = [mix(p0[0], p1[0], f), mix(p0[1], p1[1], f)]; dot(g, pf[0], pf[1], 0.28, '#ffd2b0', al * (1 - f));
      }
    }
    lines(false);
    glow(g, ox, oy, 5, 'rgba(255,143,107,0.9)', 0.6 * A);
    chg(g, ox - 1.4 * two, oy, 2.2, 1, A); if (two > 0.01) chg(g, ox + 1.4, oy, 2.2, 1, two);
    lines(true);
    var cnt = lt < L[1] ? 20 : Math.round(20 + 20 * two);
    chip(g, 78, 20, lt < L[1] ? '一份电荷' : '两份电荷', EC, A_(lt, L[0], 0.5));
    chip(g, 78, 27, '穿出这个面：' + cnt + ' 条', ICE, bub);
    tx(g, '任意一个包住它的面', ox, 43.5, 1.8, ICE, 'center', 700, SANS, bub);
  };

  // ---------- m15: magnetic lines always close on themselves ----------
  // closed loops: each leaves the N end, arcs round, enters the S end and runs back inside the magnet
  function lobes(g, cx, cy, half, n, scale, a, lt) {
    for (var k = 1; k <= n; k++) {
      var rx = half + 1.5 * k * scale, ry = (2.4 + 2.9 * k) * scale;
      [-1, 1].forEach(function (sd) {
        g.save(); g.globalAlpha *= a * (1 - k * 0.08); g.strokeStyle = 'rgba(143,208,255,0.7)'; g.lineWidth = 0.25; g.beginPath(); g.ellipse(cx, cy, rx, ry, 0, sd < 0 ? Math.PI : 0, sd < 0 ? TAU : Math.PI); g.stroke(); g.restore();
        var f = ((lt * 0.3 + k * 0.17 + (sd > 0 ? 0.5 : 0)) % 1), t = f * Math.PI;    // from the N end (right) round to the S end (left)
        dot(g, cx + Math.cos(t) * rx, cy + sd * Math.sin(t) * ry, 0.38, ICE, a);
        arrowHead(g, cx, cy + sd * ry, Math.PI, 0.7, ICE, a);
      });
    }
    ln(g, cx - half, cy, cx + half, cy, 'rgba(143,208,255,0.7)', 0.2, [0.6, 0.4], a);
  }
  DRAW.m15 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8), cut = A_(lt, L[2], 0.3), sp = 6 * eio(pr(lt, L[2] + 0.4, 0.9));
    eqCard(g, 1, A_(lt, L[0], 0.5), 50, 7.5);
    var whole = A * (1 - cut);
    if (whole > 0.01) {
      lobes(g, 50, 27.5, 9, 4, 1, whole * A_(lt, L[0] + 0.3, 0.8), lt);
      barMag(g, 50, 27, 18, 4.6, 0, whole * 0.9);
      arrow(g, 46, 27, 54, 27, '#ffffff', 0.25, whole * A_(lt, L[1], 0.6), 0.7);
      chip(g, 50, 44, '没有起点，也没有终点：一圈一圈闭合', ICE, A_(lt, L[1], 0.5) * whole);
    }
    if (cut > 0.01) {
      glow(g, 50, 27, 6, 'rgba(255,255,255,0.95)', pulse(lt, L[2], 0.25));
      [-1, 1].forEach(function (s2) {
        var cx = 50 + s2 * (4.5 + sp);
        lobes(g, cx, 27, 4.5, 3, 0.8, cut, lt);
        barMag(g, cx, 27, 9, 4.6, 0, cut);
      });
      chip(g, 50, 44, '切成两半：每一半还是有 N 极和 S 极', GOLD, A_(lt, L[2] + 0.6, 0.5), 'rgba(48,38,12,0.95)');
    }
  };

  // ---------- m16: a changing magnetic field makes a circling electric field ----------
  DRAW.m16 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8), ox = 46, oy = 28;
    eqCard(g, 2, A_(lt, L[0], 0.5), 50, 7.5);
    var bs = 0.55 + 0.45 * Math.sin(lt * 2.2), db = Math.abs(Math.cos(lt * 2.2));
    ring3(g, ox, oy, [0, 0, 0], 13, 'y', EC, 0.5, A * (0.35 + 0.65 * db), 'back', -lt * 3);
    var wl = A_(lt, L[1], 0.6);
    ring3(g, ox, oy, [0, -0.2, 0], 13, 'y', CU, 0.7, wl, 'back');
    for (i = 0; i < 5; i++) {
      var X = (i - 2) * 2.2, Z = (i % 2) * 2 - 1, p0 = P3(ox, oy, X, -10 * bs, Z), p1 = P3(ox, oy, X, 10 * bs, Z);
      ln(g, p0[0], p0[1], p1[0], p1[1], BC, 0.35, null, A); arrowHead(g, p1[0], p1[1], -Math.PI / 2, 0.9, BC, A);
    }
    ring3(g, ox, oy, [0, 0, 0], 13, 'y', EC, 0.5, A * (0.35 + 0.65 * db), 'front', -lt * 3);
    for (i = 0; i < 3; i++) ring3Arrow(g, ox, oy, [0, 0, 0], 13, 'y', lt * 1.6 + i * TAU / 3, EC, A * (0.35 + 0.65 * db));
    ring3(g, ox, oy, [0, -0.2, 0], 13, 'y', CU, 0.7, wl, 'front');
    if (wl > 0.01) { for (i = 0; i < 10; i++) { var t = lt * 1.6 + i * TAU / 10, p = P3(ox, oy, Math.cos(t) * 13, -0.2, Math.sin(t) * 13); dot(g, p[0], p[1], 0.35, '#ffe1a8', wl * db); } }
    tx(g, '变化的磁场', ox - 3, oy - 13, 2.0, BC, 'center', 900, SANS, A); tx(g, '电场（绕着转）', ox + 15, oy + 6, 2.0, EC, 'left', 900, SANS, A);
    chip(g, 78, 18, '磁变得越快，电场越强', DIM, A_(lt, L[0] + 0.6, 0.5));
    chip(g, 78, 38, '放一圈导线：里面就有电流', GOLD, wl, 'rgba(48,38,12,0.95)');
  };

  // ---------- m17: a current, and a changing electric field, make a circling magnetic field ----------
  DRAW.m17 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8);
    eqCard(g, 3, A_(lt, L[0], 0.5), 50, 7.5);
    // left: a wire carrying current, rings of magnetic field around it
    var lx = 24, ly = 29;
    [-7, 0, 7].forEach(function (Y) { ring3(g, lx, ly, [0, Y, 0], 6, 'y', BC, 0.35, A, 'back', -lt * 2); });
    var w0 = P3(lx, ly, 0, -13, 0), w1 = P3(lx, ly, 0, 13, 0); wire(g, [[w1[0], w1[1] + 26], [w1[0], w1[1]]], A, 1, lt);
    arrowHead(g, w1[0], w1[1], -Math.PI / 2, 1, '#ffd9a8', A);
    [-7, 0, 7].forEach(function (Y) { ring3(g, lx, ly, [0, Y, 0], 6, 'y', BC, 0.35, A, 'front', -lt * 2); ring3Arrow(g, lx, ly, [0, Y, 0], 6, 'y', lt * 2, BC, A); });
    tx(g, '电流', lx + 2, ly - 14, 1.9, '#ffd9a8', 'left', 800, SANS, A);
    // right: a charging capacitor; the changing field in the gap is ringed by magnetic field too
    var ra = A_(lt, L[1], 0.6), rx0 = 72, ry0 = 29, q = clamp((lt - L[1]) / 5);
    if (ra > 0.01) {
      ring3(g, rx0, ry0, [0, 0, 0], 9, 'y', GOLD, 0.45, ra, 'back', -lt * 2);
      [-3, 3].forEach(function (Y) { var pts = []; for (var j = 0; j < 30; j++) { var t = j / 30 * TAU; pts.push([Math.cos(t) * 6, Y, Math.sin(t) * 6]); } poly3(g, rx0, ry0, pts, 'rgba(170,190,220,0.45)', 'rgba(220,230,245,0.7)', 0.2, ra); });
      var a0 = P3(rx0, ry0, 0, 3, 0), a1 = P3(rx0, ry0, 0, 13, 0), b0 = P3(rx0, ry0, 0, -13, 0), b1 = P3(rx0, ry0, 0, -3, 0);
      wire(g, [[b0[0], b0[1]], [b1[0], b1[1]]], ra, 1, lt); wire(g, [[a0[0], a0[1]], [a1[0], a1[1]]], ra, 1, lt);
      for (i = 0; i < 5; i++) { var X = (i - 2) * 2, Z = ((i * 7) % 3 - 1) * 2, e0 = P3(rx0, ry0, X, -2.6, Z), e1 = P3(rx0, ry0, X, 2.6, Z); ln(g, e0[0], e0[1], e1[0], e1[1], EC, 0.2 + 0.25 * q, null, ra * (0.4 + 0.6 * q)); arrowHead(g, e1[0], e1[1], -Math.PI / 2, 0.6, EC, ra * (0.4 + 0.6 * q)); }
      ring3(g, rx0, ry0, [0, 0, 0], 9, 'y', GOLD, 0.45, ra, 'front', -lt * 2); ring3Arrow(g, rx0, ry0, [0, 0, 0], 9, 'y', lt * 2, GOLD, ra);
      tx(g, '变化的电场', rx0 + 9, ry0 - 6, 1.9, EC, 'left', 800, SANS, ra); tx(g, '磁场', rx0 + 11, ry0 + 4, 1.9, GOLD, 'left', 800, SANS, ra);
    }
    var hl = A_(lt, L[2], 0.6);
    if (hl > 0.01) { chip(g, 72, 14.5, '+ μ₀ε₀ ∂E/∂t：麦克斯韦的补充', GOLD, hl, 'rgba(48,38,12,0.95)'); glow(g, 72, 14.5, 8, 'rgba(242,198,107,0.9)', 0.3 * hl); mxOld(g, 92, 45, 11, hl, { name: '' }, lt); }
  };

  // ---------- m18: light is a small slice of a long spectrum ----------
  DRAW.m18 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8);
    for (i = 0; i < 4; i++) tx(g, EQS[i], 14 + i * 24, 9, 1.6, GOLD, 'center', 800, SANS, A * (1 - 0.5 * A_(lt, L[1], 0.6)));
    var wa = A_(lt, L[1] - 0.2, 0.8), y = 26;
    if (wa > 0.01) {
      // wavelength shrinks from left to right; the visible part is a narrow rainbow
      var ph = 0;
      g.save(); g.globalAlpha *= wa; g.lineWidth = 0.35;
      var prev = null;
      for (i = 0; i <= 880; i++) {
        var x = 6 + i * 0.1, k = 0.25 * Math.exp((x - 6) / 88 * 4.3);
        ph += k * 0.1;
        var yy = y - 3.2 * Math.sin(ph - lt * 4);
        if (prev) {
          var vis = x > 51 && x < 59, col = vis ? 'hsl(' + Math.round(mix(0, 270, (x - 51) / 8)) + ',90%,62%)' : 'rgba(200,210,225,0.7)';
          g.strokeStyle = col; g.lineWidth = vis ? 0.55 : 0.3; g.beginPath(); g.moveTo(prev[0], prev[1]); g.lineTo(x, yy); g.stroke();
        }
        prev = [x, yy];
      }
      g.restore();
      glow(g, 55, y, 6, 'rgba(255,240,200,0.9)', 0.4 * wa);
      ln(g, 51, 31.5, 59, 31.5, GOLD, 0.25, null, wa); tx(g, '可见光', 55, 34.5, 2.0, GOLD, 'center', 900, SANS, wa);
      tx(g, '波长更长  ←', 22, 16.5, 1.8, DIM, 'center', 700, SANS, wa); tx(g, '→  波长更短', 82, 16.5, 1.8, DIM, 'center', 700, SANS, wa);
    }
    var Lf = [['无线电波', 12], ['微波', 27], ['红外线', 41]], Rt = [['紫外线', 67], ['X 射线', 79], ['伽马射线', 91]];
    for (i = 0; i < 3; i++) {
      var a1 = A_(lt, L[2] + i * 0.4, 0.4), x1 = Lf[i][1];
      tx(g, Lf[i][0], x1, 41.5, 1.9, FG, 'center', 800, SANS, a1);
      if (i === 0) tower(g, x1, 38.5, 5, a1); else if (i === 1) { arcl(g, x1, 37, 2.6, 0.2 * Math.PI, 0.8 * Math.PI, '#cfd6e2', 0.4, a1); ln(g, x1, 37, x1, 39, '#cfd6e2', 0.3, null, a1); } else for (var k = 0; k < 3; k++) { g.save(); g.globalAlpha *= a1; g.strokeStyle = HOT; g.lineWidth = 0.25; g.beginPath(); for (var n = 0; n <= 10; n++) { var yy2 = 38.5 - n * 0.4; if (n === 0) g.moveTo(x1 - 1.5 + k * 1.5 + Math.sin(n + lt * 3) * 0.3, yy2); else g.lineTo(x1 - 1.5 + k * 1.5 + Math.sin(n + lt * 3) * 0.3, yy2); } g.stroke(); g.restore(); }
      var a2 = A_(lt, L[3] + i * 0.4, 0.4), x2 = Rt[i][1];
      tx(g, Rt[i][0], x2, 41.5, 1.9, FG, 'center', 800, SANS, a2);
      if (i === 0) { dot(g, x2, 36.5, 1.4, '#ffd36b', a2); glow(g, x2, 36.5, 3, 'rgba(200,140,255,0.9)', 0.6 * a2); }
      else if (i === 1) { ln(g, x2 - 1.8, 36.5, x2 + 1.8, 36.5, '#e8ecf4', 0.6, null, a2); dot(g, x2 - 2, 36, 0.6, '#e8ecf4', a2); dot(g, x2 - 2, 37, 0.6, '#e8ecf4', a2); dot(g, x2 + 2, 36, 0.6, '#e8ecf4', a2); dot(g, x2 + 2, 37, 0.6, '#e8ecf4', a2); }
      else { dot(g, x2, 36.5, 0.8, '#ff9d6e', a2); ring(g, x2, 36.5, 2.2, 'rgba(143,208,255,0.7)', 0.2, a2); glow(g, x2, 36.5, 3, 'rgba(120,255,180,0.9)', 0.4 * a2); }
    }
  };
