  // ================= Faraday: scenes d9-d16 =================
  // ---------- d9: a rift with his teacher ----------
  DRAW.d9 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8);
    var gap = 6 * A_(lt, L[5], 1.2);
    bust(g, 30 - gap, 28, 2.2, A, 'rgba(180,190,210,0.85)', false);
    bust(g, 70 + gap, 28, 2.0, A, 'rgba(242,198,107,0.9)', true);
    tx(g, '戴维', 30 - gap, 39.5, 2.0, DIM, 'center', 700, SANS, A); tx(g, '法拉第', 70 + gap, 39.5, 2.0, GOLD, 'center', 700, SANS, A);
    var pa = A_(lt, L[0], 0.6) * (1 - A_(lt, L[3] - 0.2, 0.5));
    if (pa > 0.01) { rbox(g, 44, 14, 12, 15, 0.4, null, 0, 'rgba(240,232,214,0.92)', pa); for (i = 0; i < 7; i++) ln(g, 45.5, 16.5 + i * 1.6, 54.5, 16.5 + i * 1.6, 'rgba(60,50,40,0.6)', 0.14, null, pa); tx(g, '论文 · 1821', 50, 32, 1.9, DIM, 'center', 700, SANS, pa); }
    chip(g, 50, 8, '没提别人想过类似的事', DIM, A_(lt, L[1], 0.6) * (1 - A_(lt, L[2], 0.5)));
    chip(g, 50, 8, '“抄袭？”', RED, A_(lt, L[2], 0.6) * (1 - A_(lt, L[3], 0.5)), 'rgba(50,20,20,0.95)');
    var sc = A_(lt, L[3], 0.6) * (1 - A_(lt, L[5], 0.5));
    if (sc > 0.01) {
      rbox(g, 43, 15, 14, 12, 0.6, GOLD, 0.25, 'rgba(48,38,12,0.9)', sc); tx(g, '皇家学会', 50, 19.5, 2.0, GOLD, 'center', 800, SANS, sc); tx(g, '会员提名', 50, 23, 1.8, GOLD, 'center', 700, SANS, sc);
      var w4 = A_(lt, L[4], 0.6);
      arrow(g, 38, 21, 42, 21, RED, 0.3, w4, 0.9); chip(g, 30, 13, '撤回！', RED, w4, 'rgba(50,20,20,0.95)'); chip(g, 70, 13, '不撤', GOLD, A_(lt, L[4] + 0.8, 0.6), 'rgba(48,38,12,0.95)');
    }
    var ck = A_(lt, L[5], 1.0);
    if (ck > 0.01) {
      g.save(); g.globalAlpha *= ck; g.strokeStyle = 'rgba(255,107,107,0.75)'; g.lineWidth = 0.35; g.beginPath();
      var yy = 12; g.moveTo(50, yy);
      for (i = 0; i < 9; i++) { yy += 3.4 * Math.min(1, ck * 1.2); g.lineTo(50 + (i % 2 ? 1.4 : -1.4), yy); }
      g.stroke(); g.restore();
      chip(g, 50, 46, '师徒之间，有了裂痕', HOT, ck, 'rgba(50,24,18,0.95)');
    }
  };

  // ---------- d10: the chemist ----------
  DRAW.d10 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8);
    chip(g, 50, 7, '出色的化学家', GOLD, A_(lt, L[0], 0.6) * (1 - A_(lt, L[3] - 0.2, 0.5)), 'rgba(48,38,12,0.95)');
    var c1 = A_(lt, L[1], 0.7) * (1 - 0.6 * A_(lt, L[3], 0.6));
    if (c1 > 0.01) {
      g.save(); g.globalAlpha *= c1; g.strokeStyle = 'rgba(220,235,245,0.7)'; g.lineWidth = 0.6; g.lineCap = 'round';
      g.beginPath(); g.moveTo(18, 18); g.lineTo(18, 34); g.quadraticCurveTo(18, 37, 22, 37); g.lineTo(30, 37); g.quadraticCurveTo(33, 37, 33, 34); g.lineTo(33, 26); g.stroke(); g.restore();
      var lv = A_(lt, L[1] + 0.5, 1.6);
      g.save(); g.globalAlpha *= c1 * lv; g.fillStyle = 'rgba(190,220,90,0.75)'; g.beginPath(); g.ellipse(31, 35.4, 1.6, 1.4, 0, 0, TAU); g.fill(); g.restore();
      halo(g, 21, 26, 6, 'rgba(190,220,90,0.6)', c1 * (1 - lv * 0.6));
      tx(g, '氯气 → 液体', 25.5, 42, 2.1, '#cfe27a', 'center', 800, SANS, c1); tx(g, '1823', 25.5, 14.5, 1.9, DIM, 'center', 700, SANS, c1);
    }
    var c2 = A_(lt, L[2], 0.7) * (1 - 0.6 * A_(lt, L[3], 0.6));
    if (c2 > 0.01) {
      var cx = 70, cy = 27, R = 6.5, P = [];
      for (i = 0; i < 6; i++) { var an = -Math.PI / 2 + i * TAU / 6 + Math.sin(lt * 0.5) * 0.05; P.push([cx + Math.cos(an) * R, cy + Math.sin(an) * R]); }
      for (i = 0; i < 6; i++) { var a = P[i], b = P[(i + 1) % 6]; ln(g, a[0], a[1], b[0], b[1], FG, 0.3, null, c2); if (i % 2 === 0) ln(g, mix(a[0], cx, 0.18), mix(a[1], cy, 0.18), mix(b[0], cx, 0.18), mix(b[1], cy, 0.18), FG, 0.25, null, c2); }
      for (i = 0; i < 6; i++) { dot(g, P[i][0], P[i][1], 1.1, '#3b4250', c2); tx(g, 'C', P[i][0], P[i][1] + 0.1, 1.4, FG, 'center', 800, SANS, c2); }
      tx(g, '苯', cx, 42, 2.4, FG, 'center', 800, SANS, c2); tx(g, '1825', cx, 14.5, 1.9, DIM, 'center', 700, SANS, c2);
    }
    var q = A_(lt, L[3] + 0.2, 0.8);
    if (q > 0.01) {
      glow(g, 50, 26, 16, 'rgba(242,198,107,0.9)', 0.3 * q);
      tx(g, '磁  →  电 ？', 50, 26, 6, GOLD, 'center', 900, SANS, q);
    }
  };

  // ---------- d11: years of nothing ----------
  DRAW.d11 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8);
    var pg = A_(lt, L[0], 0.7) * (1 - 0.75 * A_(lt, L[3] - 0.2, 0.7));
    if (pg > 0.01) {
      rbox(g, 30, 9, 40, 22, 0.6, null, 0, 'rgba(236,226,204,0.93)', pg);
      for (i = 0; i < 8; i++) ln(g, 32, 12 + i * 2.4, 68, 12 + i * 2.4, 'rgba(120,100,80,0.25)', 0.12, null, pg);
      g.save(); g.globalAlpha *= pg; typeOn(g, '把磁，变成电。', 50, 19.5, 4.2, '#5a3a1a', lt, L[1], 4, 'center', 800, SANS); g.restore();
      tx(g, 'Convert magnetism into electricity', 50, 25, 1.7, 'rgba(90,60,30,0.7)', 'center', 600, SANS, pg * A_(lt, L[1] + 1.0, 0.6));
    }
    var yr = A_(lt, L[2], 0.6) * (1 - A_(lt, L[3] - 0.2, 0.5));
    if (yr > 0.01) { var y = 1822 + Math.min(9, Math.floor((lt - L[2]) * 4)); tx(g, String(y), 50, 37, 5, GOLD, 'center', 900, SANS, yr); }
    var ex = A_(lt, L[3], 0.7);
    if (ex > 0.01) {
      coil(g, 54, 33, 14, 7, 9, ex); barMag(g, 72, 33, 10, 3.4, Math.PI, ex);
      wire(g, [[47, 30], [47, 26], [24, 26], [24, 31]], ex, 0, lt); wire(g, [[61, 36], [61, 44], [24, 44], [24, 39]], ex, 0, lt);
      galv(g, 24, 34, 4.6, 0.02 * Math.sin(lt * 3), ex, false);
      chip(g, 24, 46.5, '纹丝不动', DIM, A_(lt, L[4], 0.6));
    }
  };

  // ---------- d12: the iron ring, 29 August 1831 ----------
  DRAW.d12 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8), cx = 50, cy = 27, R = 9.5;
    chip(g, 50, 7, '1831 · 8 · 29', GOLD, A_(lt, L[0], 0.6), 'rgba(48,38,12,0.95)');
    var ra = A_(lt, L[1] - 0.2, 0.8);
    var c1 = L[3] + 0.4, o1 = L[4] + 0.4, c2 = L[5] + 0.3;
    var closed = (lt > c1 && lt < o1) || lt > c2;
    var d = 0.95 * pulse(lt, c1, 0.4) - 0.95 * pulse(lt, o1, 0.4) + 0.95 * pulse(lt, c2, 0.4);
    // ring
    g.save(); g.globalAlpha *= ra; g.strokeStyle = '#6f7888'; g.lineWidth = 3.4; g.beginPath(); g.arc(cx, cy, R, 0, TAU); g.stroke();
    g.strokeStyle = 'rgba(255,255,255,0.18)'; g.lineWidth = 0.4; g.beginPath(); g.arc(cx, cy, R - 1.2, Math.PI * 1.1, Math.PI * 1.6); g.stroke(); g.restore();
    if (closed) { g.save(); g.globalAlpha *= ra * 0.5; g.strokeStyle = ICE; g.lineWidth = 0.4; g.setLineDash([1.2, 1]); g.lineDashOffset = -lt * 3; g.beginPath(); g.arc(cx, cy, R, 0, TAU); g.stroke(); g.restore(); }
    // coils on the two sides
    for (i = 0; i < 7; i++) {
      var an = Math.PI - 0.6 + i * 0.2, an2 = -0.6 + i * 0.2;
      var x1 = cx + Math.cos(an) * R, y1 = cy + Math.sin(an) * R, x2 = cx + Math.cos(an2) * R, y2 = cy + Math.sin(an2) * R;
      g.save(); g.globalAlpha *= ra; g.strokeStyle = CU; g.lineWidth = 0.55; g.beginPath(); g.ellipse(x1, y1, 2.6, 0.7, an, 0, TAU); g.stroke(); g.beginPath(); g.ellipse(x2, y2, 2.6, 0.7, an2, 0, TAU); g.stroke(); g.restore();
    }
    var w1 = A_(lt, L[2], 0.6);
    battery(g, 20, 27, w1);
    var sw = closed ? 0 : 1;
    wire(g, [[cx - R - 1.5, cy - 4], [26, 20], [20, 20], [20, 24.6]], w1, closed ? 1 : 0, lt);
    wire(g, [[20, 29.4], [20, 34], [24, 34]], w1, closed ? 1 : 0, lt);
    ln(g, 24, 34, 28, 34 - 2.4 * sw, WIRE, 0.35, null, w1); dot(g, 24, 34, 0.4, FG, w1); dot(g, 28.4, 34, 0.4, FG, w1);
    wire(g, [[28.4, 34], [cx - R - 1.5, cy + 4]], w1, closed ? 1 : 0, lt);
    tx(g, closed ? '接通' : '断开', 26, 38, 1.7, closed ? GOLD : DIM, 'center', 700, SANS, w1);
    wire(g, [[cx + R + 1.5, cy - 4], [80, 20], [80, 22]], w1, d, lt); wire(g, [[cx + R + 1.5, cy + 4], [80, 38], [80, 35]], w1, d, lt);
    galv(g, 80, 28, 5, d, w1);
    chip(g, 80, 13, '跳了！', GOLD, (pulse(lt, c1, 0.8) + pulse(lt, c2, 0.8)) * w1, 'rgba(48,38,12,0.95)');
    chip(g, 80, 13, '反着跳', HOT, pulse(lt, o1, 0.8) * w1, 'rgba(50,24,18,0.95)');
    chip(g, 50, 44, '电流稳定时：指针不动', DIM, A_(lt, L[6], 0.6));
    glow(g, cx, cy, 14, 'rgba(143,208,255,0.9)', 0.4 * (pulse(lt, c1, 0.5) + pulse(lt, o1, 0.5) + pulse(lt, c2, 0.5)));
  };

  // ---------- d13: it's the change that matters ----------
  DRAW.d13 = function (g, lt, L) {
    var A = A_(lt, 0.2, 0.8);
    function mxAt(t) { return 82 - 22 * eio(pr(t, L[2] + 0.3, 0.7)) + 22 * eio(pr(t, L[3] + 0.3, 0.7)); }
    var mx = mxAt(lt), v = (mx - mxAt(lt - 0.04)) / 0.04, d = Math.max(-1, Math.min(1, -v / 28));
    chip(g, 50, 7, '关键：磁在变化', GOLD, A_(lt, L[1], 0.6), 'rgba(48,38,12,0.95)');
    wire(g, [[48, 22], [48, 17], [22, 17], [22, 21]], A, d, lt); wire(g, [[64, 30], [64, 41], [22, 41], [22, 33]], A, d, lt);
    coil(g, 56, 26, 16, 8, 11, A, Math.abs(d));
    barMag(g, mx, 26, 14, 4.2, Math.PI, A);
    if (Math.abs(v) > 3) { arrow(g, mx + (v < 0 ? 9 : -9), 19.5, mx + (v < 0 ? 3 : -3), 19.5, GOLD, 0.35, Math.min(1, Math.abs(v) / 20), 1); }
    galv(g, 22, 27, 5.5, d, A);
    chip(g, 82, 36, '插进去：跳', GOLD, A_(lt, L[2] + 0.4, 0.5) * (1 - A_(lt, L[3], 0.4)), 'rgba(48,38,12,0.95)');
    chip(g, 82, 36, '拔出来：反着跳', HOT, A_(lt, L[3] + 0.4, 0.5) * (1 - A_(lt, L[4], 0.4)), 'rgba(50,24,18,0.95)');
    chip(g, 82, 36, '不动：没有电', DIM, A_(lt, L[4], 0.5) * (1 - A_(lt, L[5], 0.4)));
    var em = A_(lt, L[5], 0.8);
    glow(g, 50, 46, 18, 'rgba(242,198,107,0.9)', 0.2 * em);
    tx(g, '电磁感应', 82, 36, 3.6, GOLD, 'center', 900, SANS, em);
  };

  // ---------- d14: the law ----------
  DRAW.d14 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8), cx = 34, cy = 27;
    // number of field lines through the loop changes, faster in the second half
    var n1 = 2 + 7 * eio(pr(lt, L[1], 1.6)), n2 = 9 - 7 * eio(pr(lt, L[3], 0.6)), n = lt < L[3] ? n1 : n2;
    function nAt(t) { return t < L[3] ? 2 + 7 * eio(pr(t, L[1], 1.6)) : 9 - 7 * eio(pr(t, L[3], 0.6)); }
    var emf = Math.abs(nAt(lt) - nAt(lt - 0.05)) / 0.05;
    // field lines (vertical)
    for (i = 0; i < 9; i++) {
      var x = cx - 8 + i * 2, on = clamp(n - Math.abs(i - 4) * 2);
      var aa = A * clamp(on);
      ln(g, x, 11, x, 43, 'rgba(143,208,255,0.7)', 0.25, null, aa); arrowHead(g, x, 13, -Math.PI / 2, 0.8, ICE, aa);
    }
    // the loop (in perspective)
    g.save(); g.globalAlpha *= A; g.strokeStyle = CU; g.lineWidth = 0.7; g.beginPath(); g.ellipse(cx, cy, 10, 3.2, 0, 0, TAU); g.stroke(); g.restore();
    glow(g, cx, cy, 12, 'rgba(255,180,90,0.9)', 0.35 * Math.min(1, emf / 8) * A);
    tx(g, '穿过线圈的磁感线', cx, 46, 1.9, DIM, 'center', 700, SANS, A_(lt, L[1], 0.6));
    // voltage meter
    var vm = A_(lt, L[2], 0.6);
    rbox(g, 56, 18, 3, 20, 1.5, 'rgba(238,242,248,0.5)', 0.18, null, vm);
    var hh = 20 * Math.min(1, emf / 26);
    rbox(g, 56.3, 38 - hh, 2.4, hh, 1.2, null, 0, GOLD, vm);
    tx(g, '电压', 57.5, 41.5, 1.9, DIM, 'center', 700, SANS, vm);
    chip(g, 77, 18, '慢慢变：电压小', DIM, A_(lt, L[2], 0.6) * (1 - A_(lt, L[3], 0.5)));
    chip(g, 77, 18, '变得快：电压大', GOLD, A_(lt, L[3], 0.6) * (1 - A_(lt, L[4], 0.5)), 'rgba(48,38,12,0.95)');
    var fm = A_(lt, L[4], 0.8);
    if (fm > 0.01) {
      glow(g, 77, 25, 14, 'rgba(242,198,107,0.9)', 0.25 * fm);
      rich(g, [['ε = −ΔΦ / Δt', 0]], 77, 25, 4.4, GOLD, fm, 'center', 900, SANS);
      tx(g, '法拉第电磁感应定律', 77, 31.5, 2.1, FG, 'center', 800, SANS, fm);
      tx(g, 'Φ：穿过线圈的磁通量', 77, 35.2, 1.7, DIM, 'center', 600, SANS, fm);
    }
  };

  // ---------- d15: the copper disc, the first generator ----------
  DRAW.d15 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8), cx = 38, cy = 21.5, R = 10;
    var spin = A_(lt, L[1], 1.2), th = (lt - L[1]) * 4.2 * spin;
    var cur = A_(lt, L[2] + 0.4, 0.8) * spin;
    // horseshoe magnet gripping the lower edge
    var ma = A_(lt, L[1] - 0.3, 0.7);
    g.save(); g.globalAlpha *= ma; g.strokeStyle = '#b8434a'; g.lineWidth = 3.4; g.lineCap = 'butt';
    g.beginPath(); g.moveTo(cx - 4, cy + R - 3); g.lineTo(cx - 4, cy + R + 6); g.arc(cx, cy + R + 6, 4, Math.PI, 0, true); g.lineTo(cx + 4, cy + R - 3); g.stroke(); g.restore();
    // disc
    g.save(); g.globalAlpha *= A; var dg = g.createRadialGradient(cx - 3, cy - 3, 1, cx, cy, R); dg.addColorStop(0, '#f2b07a'); dg.addColorStop(1, '#b8682e');
    g.fillStyle = dg; g.beginPath(); g.arc(cx, cy, R, 0, TAU); g.fill(); g.restore();
    for (i = 0; i < 8; i++) { var an = th + i * TAU / 8; ln(g, cx + Math.cos(an) * 1.5, cy + Math.sin(an) * 1.5, cx + Math.cos(an) * (R - 0.6), cy + Math.sin(an) * (R - 0.6), 'rgba(90,40,10,0.35)', 0.25, null, A); }
    ring(g, cx, cy, R, 'rgba(255,220,180,0.6)', 0.2, A);
    // the magnet's pole pieces in front
    rbox(g, cx - 5.8, cy + R - 4.5, 3.6, 4.5, 0.3, null, 0, NRED, ma); rbox(g, cx + 2.2, cy + R - 4.5, 3.6, 4.5, 0.3, null, 0, SBLU, ma);
    // crank
    var ka = A_(lt, L[1], 0.6);
    ln(g, cx, cy, cx + Math.cos(th) * 4, cy + Math.sin(th) * 4, '#d7dde8', 0.6, null, ka); dot(g, cx + Math.cos(th) * 4, cy + Math.sin(th) * 4, 0.7, '#8a5f34', ka);
    dot(g, cx, cy, 0.9, '#d7dde8', A);
    // radial current under the magnet
    if (cur > 0.01) { ln(g, cx, cy, cx, cy + R, '#ffe1a8', 0.5, null, cur * (0.6 + 0.4 * Math.sin(lt * 9))); glow(g, cx, cy + R * 0.6, 4, 'rgba(255,220,150,0.9)', 0.5 * cur); }
    // brushes and wires to the meter
    var wa = A_(lt, L[2], 0.6);
    wire(g, [[cx, cy], [cx, 8], [76, 8], [76, 21]], wa, cur, lt); wire(g, [[cx, cy + R], [cx + 9, 41], [76, 41], [76, 34]], wa, -cur, lt);
    tx(g, '中心', cx - 3.2, cy - 1.2, 1.7, DIM, 'right', 700, SANS, wa); tx(g, '边缘', cx - 6.5, cy + R + 1, 1.7, DIM, 'right', 700, SANS, wa);
    galv(g, 76, 28, 5.5, 0.75 * cur + 0.03 * Math.sin(lt * 7) * cur, wa);
    chip(g, 76, 14, '持续的电流', GOLD, A_(lt, L[3], 0.6) * (1 - A_(lt, L[5], 0.5)), 'rgba(48,38,12,0.95)');
    chip(g, 76, 14, '只要转，就有电', GOLD, A_(lt, L[4], 0.6) * (1 - A_(lt, L[5], 0.5)), 'rgba(48,38,12,0.95)');
    var fg = A_(lt, L[5], 0.8);
    glow(g, 76, 14, 12, 'rgba(242,198,107,0.9)', 0.3 * fg);
    tx(g, '第一台发电机', 76, 14, 3.2, GOLD, 'center', 900, SANS, fg);
  };

  // ---------- d16: every power station since ----------
  DRAW.d16 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8), cx = 30, cy = 25, R = 11;
    var th = lt * 2.2;
    for (i = 0; i < 8; i++) {
      var an = i * TAU / 8;
      g.save(); g.globalAlpha *= A; g.translate(cx + Math.cos(an) * (R + 1.5), cy + Math.sin(an) * (R + 1.5)); g.rotate(an);
      g.fillStyle = '#7a4a2a'; g.fillRect(-1.6, -2.2, 3.2, 4.4); g.strokeStyle = CU; g.lineWidth = 0.3;
      for (var k = 0; k < 4; k++) { g.beginPath(); g.moveTo(-1.6, -1.8 + k * 1.2); g.lineTo(1.6, -1.8 + k * 1.2); g.stroke(); }
      g.restore();
    }
    ring(g, cx, cy, R + 4, 'rgba(160,170,190,0.6)', 0.6, A);
    barMag(g, cx, cy, 15, 4.6, th, A);
    tx(g, '线圈（不动）', cx, 43.5, 1.8, DIM, 'center', 700, SANS, A); tx(g, '磁铁（转动）', cx, 8.5, 1.8, DIM, 'center', 700, SANS, A);
    // output wave
    var wv = A_(lt, L[0] + 0.4, 0.8);
    g.save(); g.globalAlpha *= wv; g.strokeStyle = GOLD; g.lineWidth = 0.4; g.beginPath();
    for (i = 0; i <= 80; i++) { var x = 50 + i * 0.5, y = 18 - Math.sin(th * 2 - i * 0.18) * 5; if (i === 0) g.moveTo(x, y); else g.lineTo(x, y); }
    g.stroke(); g.restore();
    ln(g, 50, 18, 91, 18, 'rgba(238,242,248,0.3)', 0.15, null, wv);
    tx(g, '交流电', 92, 11, 1.8, GOLD, 'right', 700, SANS, wv);
    var src = [['煤', '#c9905a'], ['水', ICE], ['核', GRN]];
    for (i = 0; i < 3; i++) chip(g, 56 + i * 12, 31, src[i][0], src[i][1], A_(lt, L[1] + i * 0.3, 0.5));
    chip(g, 70, 36.5, '都在让磁铁和线圈相对转动', GOLD, A_(lt, L[3], 0.6) * (1 - A_(lt, L[4], 0.5)), 'rgba(48,38,12,0.95)');
    cityLights(g, A_(lt, L[4], 1.6), lt, 52, 92, 34, 45, 11);
    chip(g, 70, 46.6, '来自他发现的规律', GOLD, A_(lt, L[5], 0.6), 'rgba(48,38,12,0.95)');
  };
