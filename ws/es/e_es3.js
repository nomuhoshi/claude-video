  // ================= scenes d11-d15 =================
  function richChip(g, segs, x, y, col, a, bg) {
    if (a <= 0.003) return;
    g.save(); var i, w = 0; for (i = 0; i < segs.length; i++) { g.font = '700 ' + (segs[i][1] ? 1.9 * 0.62 : 1.9) + 'px ' + SANS; w += g.measureText(segs[i][0]).width; } g.restore();
    w += 3.4; pill(g, x - w / 2, y - 1.55, w, 3.1, bg || 'rgba(20,34,56,0.92)', a);
    g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = 0.18; g.beginPath(); if (g.roundRect) g.roundRect(x - w / 2, y - 1.55, w, 3.1, 1.55); else g.rect(x - w / 2, y - 1.55, w, 3.1); g.stroke(); g.restore();
    rich(g, segs, x, y + 0.08, 1.9, col, a, 'center', 700);
  }
  // ---------- d11: what holds the electron together ----------
  DRAW.d11 = function (g, lt, L) {
    var cx = 50, cy = 25, i, a0 = A_(lt, 0.2, 0.8), r = rng(5), N = 18, pts = [];
    for (i = 0; i < N; i++) { var an = r() * TAU, rd = Math.sqrt(r()) * 6.2; pts.push([Math.cos(an) * rd, Math.sin(an) * rd, r() * 6]); }
    var f = 1 + 1.2 * eio(pr(lt, L[3] + 0.3, 2.6)), blob = 1 - 0.7 * A_(lt, L[2], 0.9);
    glow(g, cx, cy, 11 * f, 'rgba(124,196,255,0.9)', 0.3 * a0 * (1 - 0.5 * eio(pr(lt, L[3] + 0.3, 2.6))));
    for (i = 0; i < N; i++) { var p = pts[i]; chg(g, cx + p[0] * f + Math.sin(lt * 3 + p[2]) * 0.2, cy + p[1] * f + Math.cos(lt * 2.6 + p[2]) * 0.2, 1.05, -1, a0 * A_(lt, 0.2 + i * 0.03, 0.5), 0.6); }
    var ba = A_(lt, L[1], 0.7);
    chip(g, cx, 9, '一个电子', NEG, A_(lt, L[0] + 0.3, 0.6), 'rgba(14,34,56,0.95)');
    chip(g, cx, 43, '带负电', NEG, ba * (1 - A_(lt, L[2], 0.5)), 'rgba(14,34,56,0.95)');
    chip(g, cx, 43, '假设：由一团东西构成', ICE, A_(lt, L[2] + 0.2, 0.6) * (1 - A_(lt, L[3], 0.5)));
    var ra = A_(lt, L[3], 0.8) * (1 - 0.5 * A_(lt, L[4] + 1.0, 0.8));
    if (ra > 0.01) for (i = 0; i < 10; i++) { var an2 = i / 10 * TAU + 0.3; arrow(g, cx + Math.cos(an2) * 8 * f * 0.55, cy + Math.sin(an2) * 8 * f * 0.55, cx + Math.cos(an2) * (8 * f * 0.55 + 4), cy + Math.sin(an2) * (8 * f * 0.55 + 4), RED, 0.35, ra * 0.9, 0.9); }
    chip(g, cx, 43, '各部分互相排斥', RED, A_(lt, L[3] + 0.2, 0.6) * (1 - A_(lt, L[4], 0.5)));
    var q = A_(lt, L[4], 0.9);
    if (q > 0.01) { chip(g, cx, 43, '为什么没有飞散？', GOLD, q, 'rgba(48,40,14,0.95)'); tx(g, '？', 76, 25, 10, GOLD, 'center', 900, SANS, q * 0.9); }
  };

  // ---------- d12: perhaps just a point ----------
  DRAW.d12 = function (g, lt, L) {
    var i, r = rng(5), N = 18, a0 = A_(lt, 0.1, 0.5);
    var conv = eio(pr(lt, L[0], 2.2)), shift = eio(pr(lt, L[3], 1.0));
    var cx = mix(50, 24, shift), cy = mix(25, 22, shift), sc = mix(1, 0.8, shift);
    var f = mix(2.6, 0, conv);
    for (i = 0; i < N; i++) { var an = r() * TAU, rd = Math.sqrt(r()) * 6.2; chg(g, cx + Math.cos(an) * rd * f * sc, cy + Math.sin(an) * rd * f * sc, 1.0 * (1 - 0.3 * conv), -1, a0 * (1 - 0.85 * conv), 0.6); }
    var pa = A_(lt, L[0] + 1.2, 0.9);
    if (pa > 0.01) { glow(g, cx, cy, 6, 'rgba(124,196,255,0.9)', 0.4 * pa); chg(g, cx, cy, 1.2 * sc, -1, pa, 1); }
    var cA = A_(lt, L[1] + 0.2, 0.6) * (1 - A_(lt, L[2], 0.5)), cB = A_(lt, L[2] + 0.4, 0.6) * (1 - A_(lt, L[3], 0.5)), cC = A_(lt, L[3] + 0.3, 0.7);
    chip(g, cx, cy + 9.5, '一个点', NEG, cA, 'rgba(14,34,56,0.95)');
    var s = A_(lt, L[2], 0.9);
    if (s > 0.01) {
      g.save(); g.globalAlpha *= s; g.strokeStyle = RED; g.lineWidth = 0.4; g.beginPath(); g.moveTo(cx, cy - 1.6 * sc); g.bezierCurveTo(cx - 8 * sc, cy - 11 * sc, cx + 8 * sc, cy - 11 * sc, cx, cy - 1.8 * sc); g.stroke(); g.restore();
      arrowHead(g, cx, cy - 1.9 * sc, Math.atan2(8, -6), 1.0, RED, s);
      var xx = cx, yy = cy - 8.2 * sc; ln(g, xx - 1.4, yy - 1.4, xx + 1.4, yy + 1.4, RED, 0.5, null, s); ln(g, xx + 1.4, yy - 1.4, xx - 1.4, yy + 1.4, RED, 0.5, null, s);
    }
    chip(g, cx, cy + 9.5, '不推自己', RED, cB);
    chip(g, cx, cy + 9.5, '讲义：问题没有解答', VIO, cC, 'rgba(30,24,60,0.95)');
    // nested sizes
    var n = A_(lt, L[4] - 0.2, 0.9), nx = 68, ny = 25;
    if (n > 0.01) {
      glow(g, nx, ny, 20, 'rgba(143,208,255,0.9)', 0.1 * n);
      ring(g, nx, ny, 17, 'rgba(143,208,255,0.7)', 0.3, n); chg(g, nx, ny, 0.5, -1, n, 0.5);
      ring(g, nx, ny, 1.6, GOLD, 0.25, n * (0.5 + 0.5 * Math.sin(lt * 5)));
      richChip(g, [['原子 约 10', 0], ['−10', 2], [' 米', 0]], nx, 5.4, ICE, A_(lt, L[4] + 0.2, 0.6));
      richChip(g, [['电子半径：小于 10', 0], ['−22', 2], [' 米', 0]], nx, 44.8, GOLD, A_(lt, L[4] + 0.9, 0.6), 'rgba(48,40,14,0.95)');
      ln(g, nx, ny + 1.8, nx, 43, 'rgba(242,198,107,0.6)', 0.2, [0.6, 0.5], A_(lt, L[4] + 0.9, 0.6));
    }
  };

  // ---------- d13: materials ----------
  DRAW.d13 = function (g, lt, L) {
    var xs = [17, 39, 61, 83], cy = 26, tw = 19, th = 17, i, j, k;
    chip(g, 50, 8, '电力 + 量子力学', VIO, A_(lt, L[0] + 0.1, 0.6));
    var fall = 1 - 0.88 * A_(lt, L[5], 0.8);
    var names = ['硬', '软', '导体', '绝缘体'];
    var t0 = [L[2], L[2] + 0.5, L[3], L[3] + 0.5];
    for (k = 0; k < 4; k++) {
      var a = A_(lt, L[1] + k * 0.15, 0.7) * fall; if (a <= 0.01) continue;
      rbox(g, xs[k] - tw / 2, cy - th / 2, tw, th, 0.8, 'rgba(143,208,255,0.6)', 0.25, 'rgba(20,34,58,0.5)', a);
      var c = A_(lt, t0[k], 0.7) * a; if (c <= 0.01) continue;
      var P = []; for (j = 0; j < 3; j++) for (i = 0; i < 3; i++) {
        var bx = xs[k] + (i - 1) * 5.2, by = cy + (j - 1) * 4.6, jx = 0, jy = 0;
        if (k === 1) { jx = Math.sin(lt * 3.2 + i * 2 + j) * 0.9; jy = Math.cos(lt * 2.7 + i + j * 2) * 0.9; } else { jx = Math.sin(lt * 9 + i + j) * 0.08; jy = Math.cos(lt * 8 + i * 2 + j) * 0.08; }
        P.push([bx + jx, by + jy]);
      }
      if (k < 2) for (j = 0; j < 3; j++) for (i = 0; i < 3; i++) { var q = j * 3 + i; if (i < 2) ln(g, P[q][0], P[q][1], P[q + 1][0], P[q + 1][1], k ? 'rgba(98,214,160,0.45)' : 'rgba(98,214,160,0.9)', k ? 0.18 : 0.4, null, c); if (j < 2) ln(g, P[q][0], P[q][1], P[q + 3][0], P[q + 3][1], k ? 'rgba(98,214,160,0.45)' : 'rgba(98,214,160,0.9)', k ? 0.18 : 0.4, null, c); }
      for (i = 0; i < 9; i++) dot(g, P[i][0], P[i][1], 0.95, k < 2 ? '#c8d3e6' : '#aab6cc', c);
      if (k === 2) for (i = 0; i < 7; i++) { var ph = i * 1.7, ex = xs[k] + Math.sin(lt * 1.6 + ph) * 7.5, ey = cy + Math.sin(lt * 2.3 + ph * 1.3) * 6.2; chg(g, ex, ey, 0.7, -1, c, 0.7); }
      if (k === 3) for (i = 0; i < 9; i++) { var ang = lt * 6 + i * 1.3; dot(g, P[i][0] + Math.cos(ang) * 1.5, P[i][1] + Math.sin(ang) * 1.5, 0.4, NEG, c); }
      chip(g, xs[k], cy + th / 2 + 3.6, names[k], k < 2 ? GRN : ICE, c);
    }
    chip(g, 50, 44.5, '以后再讲', DIM, A_(lt, L[4] + 0.2, 0.6) * (1 - A_(lt, L[5], 0.5)));
    var s = A_(lt, L[5] + 0.3, 0.9);
    if (s > 0.01) { chg(g, 40, 26, 2.4, 1, s); chg(g, 60, 26, 2.4, -1, s); ln(g, 44, 26, 56, 26, 'rgba(238,242,248,0.5)', 0.2, [0.7, 0.6], s); chip(g, 50, 44.5, '最简单的情形：两个电荷', GOLD, s, 'rgba(48,40,14,0.95)'); }
  };

  // ---------- d14: the inverse-square law ----------
  DRAW.d14 = function (g, lt, L) {
    var a0 = A_(lt, 0.15, 0.6);
    var fa = A_(lt, L[0], 0.7) * (1 - A_(lt, L[3] - 0.2, 0.6));
    rich(g, [['F = k q', 0], ['1', 1], [' q', 0], ['2', 1], [' / r', 0], ['2', 2]], 50, 8, 4.6, GOLD, fa, 'center', 900);
    var p1 = A_(lt, L[0] + 0.3, 0.7) * (1 - A_(lt, L[3], 0.6)), p2 = A_(lt, L[1], 0.7) * (1 - A_(lt, L[3], 0.6));
    if (p1 > 0.01) {
      chg(g, 36, 21, 2, 1, p1); chg(g, 64, 21, 2, 1, p1);
      arrow(g, 33, 21, 25, 21, RED, 0.7, p1, 1.6); arrow(g, 67, 21, 75, 21, RED, 0.7, p1, 1.6);
      ln(g, 36, 25, 64, 25, 'rgba(238,242,248,0.45)', 0.18, null, p1); chip(g, 50, 25, '距离 r', DIM, p1);
      chip(g, 90, 21, '力 F', RED, p1);
    }
    if (p2 > 0.01) {
      chg(g, 26, 34, 2, 1, p2); chg(g, 74, 34, 2, 1, p2);
      arrow(g, 23.4, 34, 20.6, 34, RED, 0.35, p2, 0.9); arrow(g, 76.6, 34, 79.4, 34, RED, 0.35, p2, 0.9);
      ln(g, 26, 38, 74, 38, 'rgba(238,242,248,0.45)', 0.18, null, p2); chip(g, 50, 38, '距离 2r', DIM, p2);
      chip(g, 90, 34, '力 F / 4', RED, p2);
    }
    var lw = A_(lt, L[2], 0.7) * (1 - A_(lt, L[3], 0.6));
    if (lw > 0.01) { glow(g, 50, 8, 22, 'rgba(242,198,107,0.9)', 0.2 * lw); chip(g, 50, 44.5, '库仑定律：力与距离的平方成反比', GOLD, lw, 'rgba(48,40,14,0.95)'); }
    // moving charges
    var m = A_(lt, L[3], 0.8);
    if (m > 0.01) {
      var shift = (lt - L[3]) * 1.2;
      chg(g, 34, 26, 2.2, 1, m); chg(g, 66, 26, 2.2, 1, m);
      arrow(g, 34, 22, 43, 22, GRN, 0.4, m, 1.2); arrow(g, 66, 22, 75, 22, GRN, 0.4, m, 1.2); tx(g, 'v', 39, 19.6, 2, GRN, 'center', 700, SANS, m); tx(g, 'v', 71, 19.6, 2, GRN, 'center', 700, SANS, m);
      chip(g, 50, 8, '电荷一动，库仑定律就不准了', RED, A_(lt, L[3] + 0.3, 0.6) * (1 - A_(lt, L[4], 0.5)));
      var mg = A_(lt, L[4], 0.8);
      if (mg > 0.01) {
        arrow(g, 34, 31, 34, 39, VIO, 0.5, mg, 1.2); arrow(g, 66, 31, 66, 39, VIO, 0.5, mg, 1.2);
        arrow(g, 38, 26, 62, 26, 'rgba(255,107,107,0.8)', 0.4, mg * 0.8, 1.0);
        chip(g, 50, 8, '多出来的一部分：磁力', VIO, mg, 'rgba(30,24,60,0.95)'); chip(g, 50, 37, '磁力', VIO, mg, 'rgba(30,24,60,0.95)');
      }
      var em = A_(lt, L[5], 0.8);
      if (em > 0.01) { chip(g, 50, 44.5, '电 + 磁 = 电磁学', GOLD, em, 'rgba(48,40,14,0.95)'); glow(g, 50, 30, 24, 'rgba(183,156,255,0.9)', 0.12 * em); }
    }
  };

  // ---------- d15: one rule ----------
  DRAW.d15 = function (g, lt, L) {
    var qx = 50, qy = 29, a0 = A_(lt, 0.2, 0.8), i;
    var r = rng(17), N = 22, oth = [];
    for (i = 0; i < N; i++) { var an = r() * TAU, rd = 12 + r() * 20; oth.push([an, rd, r() > 0.5 ? 1 : -1, r() * 6, r() * 0.6 + 0.4]); }
    var show = A_(lt, L[1], 0.9) * (1 - A_(lt, L[2] + 0.4, 1.3)), conv = eio(pr(lt, L[2] + 0.2, 1.8));
    for (i = 0; i < N; i++) {
      var o = oth[i], x = qx + Math.cos(o[0] + lt * 0.18 * o[4]) * o[1] * 1.15, y = qy + Math.sin(o[0] + lt * 0.18 * o[4]) * o[1] * 0.42;
      x = mix(x, o[2] > 0 ? 24 : 76, conv * 0.9); y = mix(y, 21, conv * 0.9);
      chg(g, x, y, 0.85, o[2], show * 0.85, 0.5);
      if (conv < 0.5) arrow(g, x, y, x + Math.cos(o[3] + lt) * 2.6, y + Math.sin(o[3] + lt) * 2.6, 'rgba(154,167,186,0.8)', 0.14, show * 0.7, 0.5);
    }
    chip(g, 50, 45.5, '周围：数不清的电荷，各自在动', DIM, A_(lt, L[1] + 0.3, 0.6) * (1 - A_(lt, L[2], 0.5)));
    // E and B orbs
    var ob = A_(lt, L[2] + 0.8, 0.9);
    if (ob > 0.01) {
      glow(g, 24, 21, 11, 'rgba(124,196,255,0.9)', 0.35 * ob); dot(g, 24, 21, 4.2, 'rgba(60,110,170,0.55)', ob); ring(g, 24, 21, 4.2, NEG, 0.25, ob); tx(g, 'E', 24, 21.2, 4.2, '#e8f4ff', 'center', 900, SANS, ob);
      glow(g, 76, 21, 11, 'rgba(183,156,255,0.9)', 0.35 * ob); dot(g, 76, 21, 4.2, 'rgba(90,70,160,0.55)', ob); ring(g, 76, 21, 4.2, VIO, 0.25, ob); tx(g, 'B', 76, 21.2, 4.2, '#f0eaff', 'center', 900, SANS, ob);
      chip(g, 24, 29, '电场', NEG, ob); chip(g, 76, 29, '磁场', VIO, ob);
    }
    // the charge
    chg(g, qx, qy, 2.6, 1, a0);
    var va = A_(lt, L[3] - 0.3, 0.7); arrow(g, qx + 3.6, qy, qx + 12, qy, GRN, 0.4, va, 1.3); tx(g, 'v', qx + 8, qy - 2.6, 2.2, GRN, 'center', 700, SANS, va);
    chip(g, qx - 17, qy + 8, '位置', ICE, A_(lt, L[3], 0.6)); chip(g, qx, qy + 8, '速度', GRN, A_(lt, L[3] + 0.4, 0.6)); chip(g, qx + 17, qy + 8, '电量', POS, A_(lt, L[3] + 0.8, 0.6), 'rgba(50,24,18,0.95)');
    tx(g, 'q', qx - 3.8, qy - 2.2, 2.2, POS, 'center', 700, SANS, A_(lt, L[3] + 0.8, 0.6));
    var fo = A_(lt, L[4], 0.9);
    if (fo > 0.01) { glow(g, 50, 9, 32, 'rgba(242,198,107,0.9)', 0.16 * fo); tx(g, 'F = q(E + v × B)', 50, 9, 6.6, GOLD, 'center', 900, SANS, fo); }
    var fl = A_(lt, L[5], 0.9);
    if (fl > 0.01) { ring(g, 24, 21, 6.2, NEG, 0.3, fl * (0.6 + 0.4 * Math.sin(lt * 4))); ring(g, 76, 21, 6.2, VIO, 0.3, fl * (0.6 + 0.4 * Math.sin(lt * 4))); }
  };
