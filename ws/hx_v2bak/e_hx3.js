  // ================= heat video v2: new and rewritten scenes =================
  function dome(g, x, y, R, a) {
    if (a <= 0.003 || R <= 0.2) return;
    g.save(); g.globalAlpha *= a; g.fillStyle = 'rgba(110,185,255,0.30)'; g.strokeStyle = 'rgba(143,208,255,0.8)'; g.lineWidth = 0.22;
    g.beginPath(); g.arc(x, y, R, Math.PI, 0); g.closePath(); g.fill(); g.stroke(); g.restore();
    dot(g, x - R * 0.35, y - R * 0.55, R * 0.16, 'rgba(255,255,255,0.7)', a * 0.8);
  }
  function bigX(g, x, y, s, a) { ln(g, x - s, y - s, x + s, y + s, RED, 0.7, null, a); ln(g, x + s, y - s, x - s, y + s, RED, 0.7, null, a); }

  // ---------- d0: three small mysteries, one picture ----------
  DRAW.d0 = function (g, lt, L) {
    var i, j;
    var dimP = 1 - A_(lt, L[5] - 0.3, 0.9);
    var pull = 0;
    var PX = [mix(20, 25, pull), 50, mix(80, 75, pull)];
    var hl = A_(lt, L[3], 0.6) * (1 - A_(lt, L[5] - 0.3, 0.6));
    function panel(k, a, col) {
      rbox(g, PX[k] - 12.5, 13, 25, 23.5, 1.4, hl > 0.05 ? col : 'rgba(238,242,248,0.22)', 0.18 + 0.12 * hl, 'rgba(255,255,255,0.03)', a);
    }
    // 1. the coffee cools
    var a0 = A_(lt, L[0] - 0.8, 0.7) * dimP;
    if (a0 > 0.01) {
      panel(0, a0, HOT);
      var cool = A_(lt, L[0] + 0.3, 5.5);
      glow(g, PX[0] - 1, 27, 9, 'rgba(255,140,60,0.9)', 0.4 * (1 - cool) * a0);
      cup(g, PX[0] - 1.5, 27.5, 0.6, lt, a0, 1 - cool);
      rbox(g, PX[0] + 8.6, 16, 1.4, 16, 0.7, 'rgba(238,242,248,0.4)', 0.12, null, a0);
      var hh = 14.5 * (1 - 0.72 * cool);
      rbox(g, PX[0] + 8.6, 32 - hh, 1.4, hh, 0.7, null, 0, heatCol(1 - 0.8 * cool), a0);
      tx(g, '凉了', PX[0], 40.5, 2.6, ICE, 'center', 900, SANS, a0 * A_(lt, L[0] + 1.2, 0.6));
    }
    // 2. the ball stops
    var a1 = A_(lt, L[1] - 0.8, 0.7) * dimP;
    if (a1 > 0.01) {
      panel(1, a1, GOLD);
      var tb = lt - (L[1] - 0.4), bo = tb > 0 ? bounce(tb, 1.25, 0.74, 14) : [14, 0, 1];
      ln(g, 40, 33.6, 60, 33.6, 'rgba(238,242,248,0.5)', 0.2, null, a1);
      glow(g, 50, 33.6 - 1.6 - bo[0], 3.6, 'rgba(255,157,110,0.9)', 0.35 * a1);
      dot(g, 50, 33.6 - 1.6 - bo[0], 1.6, HOT, a1); dot(g, 49.5, 33.1 - 1.6 - bo[0], 0.5, 'rgba(255,255,255,0.7)', a1 * 0.7);
      tx(g, '停了', 50, 40.5, 2.6, GOLD, 'center', 900, SANS, a1 * A_(lt, L[1] + 1.2, 0.6));
    }
    // 3. the drop disappears
    var a2 = A_(lt, L[2] - 0.8, 0.7) * dimP;
    if (a2 > 0.01) {
      panel(2, a2, ICE);
      var sh = eio(pr(lt, L[2] + 0.1, 4.2)), R = 7.2 * (1 - 0.94 * sh);
      ln(g, PX[2] - 10, 33.6, PX[2] + 10, 33.6, 'rgba(238,242,248,0.5)', 0.2, null, a2);
      dome(g, PX[2], 33.6, R, a2);
      for (i = 0; i < 9; i++) {
        var te = L[2] + 0.1 + i * 0.45, tau = lt - te; if (tau < 0 || tau > 2.2) continue;
        var ang = -Math.PI * (0.2 + 0.6 * ((i * 0.618) % 1)), R0 = 7.2 * (1 - 0.94 * eio(pr(te, L[2] + 0.1, 4.2)));
        var ex = PX[2] + Math.cos(ang) * (R0 + tau * 3), ey = 33.6 + Math.sin(ang) * (R0 + tau * 3) - tau * 1.5;
        dot(g, ex, ey, 0.45, ELE, a2 * (1 - tau / 2.2));
      }
      tx(g, '没了', PX[2], 40.5, 2.6, DIM, 'center', 900, SANS, a2 * A_(lt, L[2] + 1.2, 0.6));
    }
    // "one picture"
    chip(g, 50, 44.6, '背后：同一幅画面', GOLD, A_(lt, L[4], 0.6) * dimP, 'rgba(48,38,12,0.95)');
    // the picture: a field of jiggling atoms sweeping in from the left
    var af = A_(lt, L[5] - 0.5, 1.0);
    if (af > 0.01) {
      var r = rng(91);
      for (j = 0; j < 6; j++) for (i = 0; i < 16; i++) {
        var x = 12 + i * 5.1 + (j & 1 ? 2.5 : 0), y = 15 + j * 5.0, k = 0.25 + 0.7 * r(), ph = r() * 9;
        var a = af * A_(lt, L[5] - 0.5 + (x - 12) / 76 * 0.9, 0.5);
        jat(g, x, y, 1.05, lt, ph, 0.6 + 0.9 * k, 5 + 6 * k, k, a, true);
      }
      chip(g, 50, 44.6, '原子在振动', GOLD, A_(lt, L[5] + 0.8, 0.6), 'rgba(48,38,12,0.95)');
    }
  };

  // ---------- d2: hot = fast jiggling; air molecules outrun sound ----------
  DRAW.d2 = function (g, lt, L) {
    var i, j, A = A_(lt, 0.2, 0.7), out = 1 - A_(lt, L[4] - 0.2, 0.7);
    function box(x0, col, name, a) {
      rbox(g, x0, 14, 32, 25, 1.2, col, 0.22, 'rgba(255,255,255,0.03)', a);
      tx(g, name, x0 + 16, 10, 4.2, col, 'center', 900, SANS, a);
    }
    if (out > 0.01) {
      box(12, ICE, '凉', A * out); box(56, HOT, '烫', A * out);
      var at = A_(lt, L[1], 0.8) * out, hot = A_(lt, L[2], 1.6), cold = A_(lt, L[3], 1.6);
      for (j = 0; j < 4; j++) for (i = 0; i < 5; i++) {
        var ph = i * 1.7 + j * 2.3, bx = 15.8 + i * 5.6, by = 17.6 + j * 5.3, a = at * A_(lt, L[1] + (i + j) * 0.06, 0.5);
        jat(g, bx, by, 1.35, lt, ph, 0.9 * (1 - 0.75 * cold) + 0.2, 4.5 - 3 * cold, 0.5 - 0.35 * cold, a, true);
        jat(g, 59.8 + i * 5.6, by, 1.35, lt, ph + 3, 0.9 + 0.55 * hot, 4.5 + 8 * hot, 0.5 + 0.5 * hot, a, true);
      }
      chip(g, 50, 44.5, '差别只在：振动得多快', GOLD, A_(lt, L[1] + 0.6, 0.7) * (1 - A_(lt, L[2] - 0.1, 0.5)) * out, 'rgba(48,38,12,0.95)');
      chip(g, 72, 44.2, '振动快 = 烫', HOT, A_(lt, L[2] + 0.2, 0.6) * out, 'rgba(50,24,18,0.95)');
      chip(g, 28, 44.2, '振动慢 = 凉', ICE, A_(lt, L[3] + 0.2, 0.6) * out);
      glow(g, 72, 26, 20, 'rgba(255,125,60,0.9)', 0.16 * hot * out);
    }
    // air molecules racing
    var la = A_(lt, L[4], 0.8);
    if (la > 0.01) {
      tx(g, '屋里的空气分子', 50, 9.5, 2.6, ICE, 'center', 800, SANS, la);
      for (i = 0; i < 9; i++) {
        var sp = 0.42 + 0.22 * ((i * 0.37) % 1), ph2 = (i * 0.61) % 1, y = 14 + i * 2.1;
        var u = (lt * sp + ph2) % 1, x = 8 + u * 84, x2 = Math.max(8, x - 9);
        g.save(); g.globalAlpha *= la * clamp(Math.min(u, 1 - u) * 8);
        var gr = g.createLinearGradient(x2, 0, x, 0); gr.addColorStop(0, 'rgba(143,208,255,0)'); gr.addColorStop(1, 'rgba(143,208,255,0.8)');
        g.strokeStyle = gr; g.lineWidth = 0.6; g.beginPath(); g.moveTo(x2, y); g.lineTo(x, y); g.stroke(); g.restore();
        dot(g, x, y, 0.65, ELE, la * clamp(Math.min(u, 1 - u) * 8));
      }
      var b1 = eo(pr(lt, L[5], 1.2)), b2 = eo(pr(lt, L[6], 1.0));
      var s1 = A_(lt, L[5], 0.5), s2 = A_(lt, L[6], 0.5);
      tx(g, '空气分子：平均约 470 米/秒', 14, 34.2, 2.0, ICE, 'left', 700, SANS, s1);
      rbox(g, 14, 35.6, 64 * b1, 2.0, 1.0, null, 0, ICE, s1);
      tx(g, '声音：约 340 米/秒', 14, 40.6, 2.0, DIM, 'left', 700, SANS, s2);
      rbox(g, 14, 42.0, 64 * 340 / 470 * b2, 2.0, 1.0, null, 0, 'rgba(147,161,182,0.8)', s2);
      glow(g, 14 + 64 * b1, 36.6, 4, 'rgba(143,208,255,0.9)', 0.5 * s1);
    }
  };

  // ---------- d11: how cold can it get ----------
  DRAW.d11 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.7), TX = 16, TT = 11, TB = 41;
    function yT(T) { var P = [[30, TT], [20, 13.5], [0, 20], [-196, 34], [-273.15, 40.2]], i; for (i = 1; i < P.length; i++) if (T >= P[i][0]) return mix(P[i - 1][1], P[i][1], (P[i - 1][0] - T) / (P[i - 1][0] - P[i][0])); return 40.2; }
    var T = 20;
    T = mix(T, 0, eio(pr(lt, L[1], 1.0)));
    T = mix(T, -196, eio(pr(lt, L[2], 1.2)));
    T = mix(T, -262, eio(pr(lt, L[3], 1.2)));
    T = mix(T, -273.15, eio(pr(lt, L[4], 1.2)));
    var f = (T + 273.15) / 293.15;          // fraction of room-temperature jiggling (by temperature)
    // thermometer
    rbox(g, TX - 1.4, TT - 1, 2.8, TB - TT + 2, 1.4, 'rgba(238,242,248,0.5)', 0.18, 'rgba(255,255,255,0.03)', A);
    var yy = yT(T);
    rbox(g, TX - 0.8, yy, 1.6, TB + 0.6 - yy, 0.8, null, 0, heatCol(0.1 + 0.8 * f), A);
    glow(g, TX, yy, 3, 'rgba(242,198,107,0.9)', 0.5 * A);
    var marks = [[20, '20 °C  室温', L[0] - 0.4, FG], [0, '0 °C  冰', L[1], ICE], [-196, '−196 °C  液氮', L[2], ICE], [-273.15, '−273.15 °C  绝对零度', L[4], GOLD]];
    for (i = 0; i < marks.length; i++) {
      var m = marks[i], ma = A * A_(lt, m[2], 0.6), my = yT(m[0]);
      ln(g, TX + 1.6, my, TX + 3.4, my, 'rgba(238,242,248,0.6)', 0.18, null, ma);
      tx(g, m[1], TX + 4.4, my, 1.95, m[3], 'left', i === 3 ? 900 : 700, SANS, ma);
    }
    // the lens: a crystal of atoms that slows down
    var LX = 66, LY = 24, LR = 14, lz = A_(lt, 0.4, 0.8);
    g.save(); g.globalAlpha *= lz; g.fillStyle = 'rgba(30,40,58,0.6)'; g.beginPath(); g.arc(LX, LY, LR, 0, TAU); g.fill(); g.restore();
    var hp = hexG(11, 4.4, LX, LY), amp = 0.06 + 1.25 * Math.pow(f, 0.6), spd = 1.5 + 7 * f;
    for (i = 0; i < hp.length; i++) jat(g, hp[i][0], hp[i][1], 1.3, lt, i * 1.7, amp, spd, 0.08 + 0.75 * f, lz, true);
    ring(g, LX, LY, LR, ICE, 0.45, lz);
    var big = A_(lt, L[5] - 0.2, 0.8);
    glow(g, LX, 43, 16, 'rgba(242,198,107,0.9)', 0.25 * big);
    tx(g, '−273.15 °C', LX, 43, 4.6, GOLD, 'center', 900, SANS, big);
    chip(g, LX, 6.5, '再也不可能更冷了', GOLD, A_(lt, L[6], 0.7), 'rgba(48,38,12,0.95)');
  };

  // ---------- d3: how heat spreads ----------
  DRAW.d3 = function (g, lt, L) {
    var i, j, A = A_(lt, 0.2, 0.7);
    var wallK = A_(lt, L[3], 2.0), airK = A_(lt, L[4], 2.2), liqK = A_(lt, L[1], 1.2);
    rbox(g, 38.2, 10.5, 10.6, 31, 1.0, 'rgba(233,217,196,0.55)', 0.2, 'rgba(233,217,196,0.10)', A);
    rbox(g, 9, 10.5, 28, 31, 1.0, null, 0, 'rgba(120,70,40,0.35)', A);
    for (j = 0; j < 6; j++) for (i = 0; i < 4; i++)
      jat(g, 13.5 + i * 6.8 + (j & 1 ? 1.6 : 0), 14 + j * 5.0, 1.45, lt, i * 1.9 + j * 2.9, 0.55 + 0.95 * liqK, 4 + 6 * liqK, 0.62 + 0.38 * liqK, A * A_(lt, 0.4 + (i + j) * 0.05, 0.5), true);
    for (j = 0; j < 7; j++) for (i = 0; i < 2; i++)
      jat(g, 41.4 + i * 4.6, 13.5 + j * 4.3, 1.3, lt, i * 2.3 + j * 1.7 + 5, 0.15 + 1.0 * wallK, 2 + 7 * wallK, 0.05 + 0.75 * wallK, A, true);
    for (j = 0; j < 5; j++) for (i = 0; i < 5; i++)
      jat(g, 55.5 + i * 7.2 + (j & 1 ? 3 : 0), 14.5 + j * 6.0, 1.05, lt, i * 1.3 + j * 2.1 + 9, 0.2 + 1.0 * airK, 2 + 6 * airK, 0.02 + 0.55 * airK, A * (0.3 + 0.7 * A_(lt, L[4] - 0.4, 0.8)), true);
    var bm = A_(lt, L[2], 0.5) * (1 - A_(lt, L[5], 0.5)), bm2 = A_(lt, L[4], 0.5) * (1 - A_(lt, L[5], 0.5));
    for (j = 0; j < 7; j++) {
      var pul = 0.35 + 0.65 * Math.max(0, Math.sin(lt * 7 + j * 1.9));
      arrow(g, 34.5, 13.5 + j * 4.3, 38.4, 13.5 + j * 4.3, HOT, 0.28, bm * pul * 0.85, 0.8);
      arrow(g, 49.8, 13.5 + j * 4.3, 53.6, 13.5 + j * 4.3, HOT, 0.28, bm2 * pul * 0.7, 0.8);
    }
    tx(g, '咖啡', 23, 7.5, 3.2, HOT, 'center', 900, SANS, A);
    tx(g, '杯壁', 43.5, 7.5, 3.2, CUPC, 'center', 900, SANS, A_(lt, L[2] - 0.2, 0.7));
    tx(g, '空气', 72, 7.5, 3.2, ICE, 'center', 900, SANS, A_(lt, L[4], 0.7));
    var c5 = A_(lt, L[5], 0.7) * (1 - A_(lt, L[6] - 0.1, 0.5));
    chip(g, 50, 45.2, '传的不是“热物质”', DIM, c5);
    if (c5 > 0.3) bigX(g, 50, 45.2, 1.0, 0);
    chip(g, 50, 45.2, '只是振动，一个撞一个', GOLD, A_(lt, L[6], 0.7), 'rgba(48,38,12,0.95)');
  };

  // ---------- d12: the coffee cools down ----------
  DRAW.d12 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.7), X0 = 12, X1 = 58, Y0 = 41, Y1 = 11;
    function yT(T) { return Y0 - T / 90 * (Y0 - Y1); }
    ln(g, X0, Y0, X1 + 1, Y0, 'rgba(238,242,248,0.5)', 0.2, null, A); ln(g, X0, Y0, X0, Y1 - 1, 'rgba(238,242,248,0.5)', 0.2, null, A);
    arrowHead(g, X1 + 1.6, Y0, 0, 0.9, 'rgba(238,242,248,0.6)', A); arrowHead(g, X0, Y1 - 1.6, -Math.PI / 2, 0.9, 'rgba(238,242,248,0.6)', A);
    tx(g, '温度', X0 - 1, Y1 - 3.2, 1.9, DIM, 'left', 700, SANS, A); tx(g, '时间', X1 - 1, Y0 + 2.6, 1.9, DIM, 'right', 700, SANS, A);
    var p = eio(pr(lt, L[0] + 0.2, L[3] - L[0] + 0.4)), N = 80;
    function Tc(u) { return 22 + 58 * Math.exp(-u * 4.2); }
    function Tr(u) { return 20 + 2 * (1 - Math.exp(-u * 4.2)); }
    g.save(); g.globalAlpha *= A; g.lineCap = 'round';
    g.strokeStyle = HOT; g.lineWidth = 0.55; g.beginPath();
    for (i = 0; i <= N * p; i++) { var u = i / N, x = X0 + u * (X1 - X0), y = yT(Tc(u)); if (i === 0) g.moveTo(x, y); else g.lineTo(x, y); } g.stroke();
    g.strokeStyle = ICE; g.lineWidth = 0.45; g.beginPath();
    for (i = 0; i <= N * p; i++) { var u2 = i / N, x2 = X0 + u2 * (X1 - X0), y2 = yT(Tr(u2)); if (i === 0) g.moveTo(x2, y2); else g.lineTo(x2, y2); } g.stroke();
    g.restore();
    var hx = X0 + p * (X1 - X0);
    dot(g, hx, yT(Tc(p)), 0.8, HOT, A * (p > 0.01 ? 1 : 0)); dot(g, hx, yT(Tr(p)), 0.7, ICE, A * (p > 0.01 ? 1 : 0));
    tx(g, '咖啡 80 °C', X0 + 1.4, yT(80) - 2.2, 1.9, HOT, 'left', 700, SANS, A_(lt, L[0], 0.6));
    tx(g, '屋子 20 °C', X0 + 1.4, yT(20) + 2.6, 1.9, ICE, 'left', 700, SANS, A_(lt, L[1], 0.6));
    var eq = A_(lt, L[2] + 0.6, 0.7);
    tx(g, '一样了', X1 - 4, yT(22) - 2.6, 2.0, GOLD, 'center', 800, SANS, eq);
    // the reverse curve that never happens
    var rv = A_(lt, L[4] + 0.2, 0.8);
    if (rv > 0.01) {
      g.save(); g.globalAlpha *= rv * 0.8; g.strokeStyle = RED; g.lineWidth = 0.4; g.setLineDash([0.9, 0.7]); g.beginPath();
      var q = eio(pr(lt, L[4] + 0.2, 1.4));
      for (i = 0; i <= N * q; i++) { var u3 = i / N, x3 = X0 + u3 * (X1 - X0), y3 = yT(22 + 58 * (1 - Math.exp(-u3 * 4.2))); if (i === 0) g.moveTo(x3, y3); else g.lineTo(x3, y3); }
      g.stroke(); g.restore();
      bigX(g, X0 + 0.55 * (X1 - X0), yT(68), 2.2, A_(lt, L[5], 0.5));
      chip(g, 35, 7, '凉咖啡自己变烫？从来没有', RED, A_(lt, L[5] + 0.2, 0.6), 'rgba(50,20,20,0.95)');
    }
    // the two crowds of atoms, mixing to the same jiggle
    var kc = mix(0.95, 0.5, p), kr = mix(0.25, 0.42, p);
    rbox(g, 64, 11, 26, 13, 1.0, HOT, 0.18, 'rgba(120,70,40,0.25)', A);
    rbox(g, 64, 28, 26, 13, 1.0, ICE, 0.18, 'rgba(255,255,255,0.03)', A);
    for (i = 0; i < 10; i++) {
      jat(g, 67 + (i % 5) * 5, 14.5 + Math.floor(i / 5) * 5.5, 1.15, lt, i * 1.9, 0.3 + 1.4 * kc, 2 + 9 * kc, kc, A, true);
      jat(g, 67 + (i % 5) * 5, 31.5 + Math.floor(i / 5) * 5.5, 1.15, lt, i * 2.3 + 4, 0.3 + 1.4 * kr, 2 + 9 * kr, kr, A, true);
    }
    tx(g, '咖啡', 77, 8.6, 2.2, HOT, 'center', 900, SANS, A); tx(g, '屋子', 77, 43.8, 2.2, ICE, 'center', 900, SANS, A);
  };

  // ---------- d4: a ball stops, atoms never do ----------
  DRAW.d4 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.7), GY = 34;
    var tb = lt - (L[0] - 0.2), bo = tb > 0 ? bounce(tb, 1.5, 0.8, 17) : [17, 0, 1];
    ln(g, 8, GY, 46, GY, 'rgba(238,242,248,0.5)', 0.25, null, A);
    var ballA = A_(lt, 0.2, 0.7);
    glow(g, 27, GY - 3 - bo[0], 5, 'rgba(255,157,110,0.9)', 0.3 * ballA);
    dot(g, 27, GY - 2.8 - bo[0], 2.8, HOT, ballA); dot(g, 26.2, GY - 3.7 - bo[0], 0.9, 'rgba(255,255,255,0.7)', ballA * 0.7);
    tx(g, '小球', 27, 9.5, 3.2, HOT, 'center', 900, SANS, ballA);
    var eb = A_(lt, L[0] + 0.4, 0.7);
    rbox(g, 8, 40.6, 38, 1.8, 0.8, 'rgba(238,242,248,0.4)', 0.15, null, eb);
    rbox(g, 8, 40.6, 38 * (tb > 0 ? bo[2] : 1), 1.8, 0.8, null, 0, HOT, eb);
    tx(g, '小球的能量', 27, 44.8, 1.9, DIM, 'center', 600, SANS, eb);
    var ra = A_(lt, L[1] - 0.2, 0.8);
    rbox(g, 54, 14, 38, 20, 1.0, ICE, 0.22, 'rgba(255,255,255,0.03)', ra);
    tx(g, '原子', 73, 9.5, 3.2, ICE, 'center', 900, SANS, ra);
    var sp = [[13.1, 9.3, 0.0, 0.9], [8.2, 12.7, 1.3, 0.2], [10.6, 7.4, 0.7, 1.6], [11.7, 10.4, 0.35, 1.1]];
    for (i = 0; i < 4; i++) {
      var ax = 56.6 + 32.8 * tri(lt * sp[i][0] / 32.8 + sp[i][2]), ay = 16.6 + 14.8 * tri(lt * sp[i][1] / 14.8 + sp[i][3]);
      var bx = 56.6 + 32.8 * tri((lt - 0.05) * sp[i][0] / 32.8 + sp[i][2]), by = 16.6 + 14.8 * tri((lt - 0.05) * sp[i][1] / 14.8 + sp[i][3]);
      ln(g, ax, ay, bx, by, 'rgba(143,208,255,0.5)', 1.3, null, ra);
      glow(g, ax, ay, 3.4, 'rgba(124,196,255,0.9)', 0.4 * ra); dot(g, ax, ay, 1.5, ELE, ra);
    }
    var er = A_(lt, L[2], 0.7);
    rbox(g, 54, 40.6, 38, 1.8, 0.8, 'rgba(238,242,248,0.4)', 0.15, null, er);
    rbox(g, 54, 40.6, 38, 1.8, 0.8, null, 0, ICE, er);
    tx(g, '原子的能量', 73, 44.8, 1.9, DIM, 'center', 600, SANS, er);
    chip(g, 27, 37, '每弹一次，丢一点', HOT, A_(lt, L[0] + 1.6, 0.7), 'rgba(50,24,18,0.95)');
    chip(g, 73, 37, '完美弹性：撞了也不丢能量', ICE, A_(lt, L[2] + 0.2, 0.7) * (1 - A_(lt, L[3] - 0.1, 0.5)));
    chip(g, 73, 37, '永远不会停', GOLD, A_(lt, L[3], 0.7), 'rgba(48,38,12,0.95)');
    var qq = A_(lt, L[4], 0.8);
    glow(g, 27, 20, 10, 'rgba(242,198,107,0.9)', 0.3 * qq);
    tx(g, '？', 27, 20, 9, GOLD, 'center', 900, SANS, qq);
  };

  // ---------- d13: play it backwards ----------
  DRAW.d13 = function (g, lt, L) {
    var i, j, A = A_(lt, 0.2, 0.7), GY = 32.2, bx0 = 50, R = 3.1, H = 14.5;
    var Ts = L[3] - L[0] - 1.0, r = 0.78, T0 = (1 - r) * Ts, t0 = L[0] + 0.5;
    var tau = clamp((lt - t0) / Ts) * Ts, f = Ts - tau;
    var bo = bounce(f, T0, r, H);
    if (lt < t0) bo = [0, 30, 0];
    var heat = 0.85 * (1 - bo[2]);
    // forward impact times -> reversed launch times
    var kick = 0, tt = T0 / 2, Tn = T0;
    for (i = 0; i < 30 && Tn > 0.1; i++) { var tk = Ts - tt; kick = Math.max(kick, Math.exp(-Math.abs(tau - tk) / 0.22) * (lt > t0 && lt < t0 + Ts + 0.3 ? 1 : 0) * Math.pow(r, i * 0.5)); Tn *= r; tt += Tn; }
    var later = A_(lt, L[4], 0.7), dimAll = 1 - 0.7 * A_(lt, L[5], 0.7);
    var sync = later * (1 - A_(lt, L[5], 0.6));
    for (j = 0; j < 3; j++) for (i = 0; i < 19; i++) {
      var x = 14 + i * 4.0 + (j & 1 ? 2 : 0), y = 35.2 + j * 3.6, d = (x - bx0) / 15, ga = Math.exp(-d * d);
      var k = clamp(heat * (0.55 + 0.6 * ga)), amp = 0.2 + 1.6 * heat * (0.4 + 0.6 * ga);
      jat(g, x, y, 1.25, lt, i * 1.7 + j * 2.3, amp * (1 - kick * ga * 0.8), 4 + 8 * k, k * 0.9, A * dimAll, true);
      var up = Math.max(kick * ga, sync * (0.5 + 0.5 * Math.sin(lt * 7)));
      if (up > 0.05) arrow(g, x, y - 0.3, x, y - 3.2, GOLD, 0.25, up * dimAll, 0.6);
    }
    ln(g, 10, GY, 90, GY, 'rgba(238,242,248,0.4)', 0.2, null, A * dimAll);
    var by = GY - R - bo[0], bA = A * dimAll * (1 - A_(lt, L[6] - 0.2, 0.5));
    glow(g, bx0, by, 6, 'rgba(255,157,110,0.9)', 0.3 * bA);
    dot(g, bx0, by, R, HOT, bA); dot(g, bx0 - 1, by - 1.1, 1.0, 'rgba(255,255,255,0.7)', 0.7 * bA);
    // rewind tag and a faint film tint while playing backwards
    var rw = A_(lt, L[0], 0.5) * (1 - A_(lt, L[3], 0.5));
    chip(g, 14, 7, '◀◀ 倒放', DIM, rw);
    if (rw > 0.01) { g.save(); g.globalAlpha *= rw * 0.08; g.fillStyle = '#8fb6ff'; g.fillRect(0, 0, 100, 56.25); g.restore(); }
    chip(g, 50, 7, '地板的原子一起往上推', GOLD, A_(lt, L[1] + 0.2, 0.6) * (1 - A_(lt, L[3], 0.5)), 'rgba(48,38,12,0.95)');
    chip(g, 50, 7, '物理定律：允许', GRN, A_(lt, L[3], 0.6) * (1 - A_(lt, L[4], 0.5)), 'rgba(12,40,30,0.95)');
    chip(g, 50, 7, '要亿万个原子同时配合', GOLD, A_(lt, L[4] + 0.1, 0.6) * (1 - A_(lt, L[5], 0.5)), 'rgba(48,38,12,0.95)');
    var nx = A_(lt, L[5], 0.6) * (1 - A_(lt, L[6] - 0.1, 0.5));
    bigX(g, 50, 22, 5, nx);
    chip(g, 50, 7, '你永远等不到', RED, nx, 'rgba(50,20,20,0.95)');
    // easy one way, (nearly) impossible the other
    var e1 = A_(lt, L[6], 0.6), e2 = A_(lt, L[7], 0.6);
    if (e1 > 0.01) {
      tx(g, '整齐', 30, 12, 3.2, GOLD, 'center', 900, SANS, e1); tx(g, '杂乱振动', 74, 12, 3.2, HOT, 'center', 900, SANS, e1);
      arrow(g, 36, 10.8, 63.5, 10.8, GRN, 0.4, e1, 1.2); tx(g, '很容易', 50, 8.6, 1.9, GRN, 'center', 800, SANS, e1);
      g.save(); g.globalAlpha *= e2; g.setLineDash([0.8, 0.6]); g.strokeStyle = RED; g.lineWidth = 0.4; g.beginPath(); g.moveTo(63.5, 14); g.lineTo(37, 14); g.stroke(); g.restore();
      arrowHead(g, 36.2, 14, Math.PI, 1.2, RED, e2); tx(g, '几乎不可能', 50, 16.4, 1.9, RED, 'center', 800, SANS, e2);
    }
  };

  // ---------- d14: evaporation cools: the fastest atoms leave ----------
  var SWEAT = (function () { var r = rng(55), P = [], i; for (i = 0; i < 39; i++) P.push([16 + (i % 13) * 5.6 + (Math.floor(i / 13) & 1 ? 2.8 : 0), 27 + Math.floor(i / 13) * 3.6, 0.15 + 0.85 * r(), r() * 9]); return P; })();
  var SW_ORDER = (function () { var idx = [], i; for (i = 0; i < SWEAT.length; i++) if (SWEAT[i][2] > 0.7 && SWEAT[i][1] < 31) idx.push(i); idx.sort(function (a, b) { return SWEAT[b][2] - SWEAT[a][2]; }); return idx; })();
  DRAW.d14 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.7);
    // skin
    g.save(); g.globalAlpha *= A; var sg = g.createLinearGradient(0, 37.5, 0, 46); sg.addColorStop(0, 'rgba(232,170,140,0.75)'); sg.addColorStop(1, 'rgba(120,70,60,0.2)');
    g.fillStyle = sg; g.fillRect(10, 37.5, 80, 8.5); g.restore();
    tx(g, '皮肤', 12, 43.5, 1.9, 'rgba(255,230,215,0.8)', 'left', 700, SANS, A);
    // which atoms have left
    var left = {}, sum = 0, n = 0;
    for (i = 0; i < SW_ORDER.length; i++) {
      var te = L[0] + 0.6 + i * 0.55, k = SW_ORDER[i], P = SWEAT[k], tau = lt - te;
      if (tau >= 0) {
        left[k] = 1;
        if (tau < 3) {
          var ex = P[0] + Math.sin(i * 2.3) * tau * 2, ey = P[1] - tau * 7 - tau * tau * 0.5, fa = clamp(1 - tau / 3);
          ln(g, ex, ey, ex - Math.sin(i * 2.3) * 0.4, ey + 2.4, heatCol(P[2], 0.5), 0.8, null, fa * A);
          glow(g, ex, ey, 2.2, 'rgba(255,140,70,0.9)', 0.4 * fa * A); dot(g, ex, ey, 1.0, heatCol(P[2]), fa * A);
        }
      }
    }
    for (i = 0; i < SWEAT.length; i++) {
      var Q = SWEAT[i]; if (left[i]) continue;
      sum += Q[2]; n++;
      jat(g, Q[0], Q[1], 1.15, lt, Q[3], 0.25 + 1.2 * Q[2], 3 + 9 * Q[2], Q[2], A, true);
    }
    var avg = n ? sum / n : 0, avg0 = 0;
    for (i = 0; i < SWEAT.length; i++) avg0 += SWEAT[i][2]; avg0 /= SWEAT.length;
    // average-jiggle meter
    var ma = A_(lt, L[1], 0.7);
    rbox(g, 92, 12, 2.4, 30, 1.2, 'rgba(238,242,248,0.5)', 0.18, null, ma);
    var hh = 30 * (avg / 0.75) * 0.85;
    rbox(g, 92.3, 42 - hh, 1.8, hh, 0.9, null, 0, heatCol(avg * 1.1), ma);
    ln(g, 90.6, 42 - 30 * (avg0 / 0.75) * 0.85, 95.8, 42 - 30 * (avg0 / 0.75) * 0.85, 'rgba(238,242,248,0.6)', 0.18, [0.4, 0.3], ma);
    tx(g, '平均', 93.2, 9.4, 1.8, DIM, 'center', 700, SANS, ma);
    chip(g, 50, 7, '先逃走的，是动得最快的', HOT, A_(lt, L[0] + 0.4, 0.7) * (1 - A_(lt, L[1], 0.5)), 'rgba(50,24,18,0.95)');
    chip(g, 50, 7, '剩下的，平均慢一点', ICE, A_(lt, L[1] + 0.2, 0.7) * (1 - A_(lt, L[3], 0.5)));
    chip(g, 50, 13, '水变凉了', ICE, A_(lt, L[2], 0.7) * (1 - A_(lt, L[3], 0.5)));
    chip(g, 50, 7, '出汗  →  蒸发  →  凉快', GOLD, A_(lt, L[3], 0.7), 'rgba(48,38,12,0.95)');
    chip(g, 50, 13, '带走了最“烫”的原子', HOT, A_(lt, L[4] + 0.2, 0.7), 'rgba(50,24,18,0.95)');
  };
