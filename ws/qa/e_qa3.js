
  // ---------- d10: the patch is a rule, not an explanation ----------
  DRAW.d10 = function (g, lt, L) {
    var a0 = A_(lt, 0.0, 0.8);
    chip(g, 13, 13, '规定', GOLD, a0, 'rgba(40,30,12,0.95)');
    tx(g, '≠', 26, 13.1, 3.2, DIM, 'center', 900, SANS, a0);
    rbox(g, 33.5, 11.3, 14, 3.4, 1.7, 'rgba(143,208,255,0.7)', 0.18, null, a0, [0.6, 0.5]); tx(g, '解释', 40.5, 13.1, 1.9, ICE, 'center', 700, SANS, a0);
    var qa = A_(lt, L[1] - 0.1, 0.7), qb = A_(lt, L[2] - 0.1, 0.7);
    chip(g, 28, 22, '为什么偏偏是这几条轨道？', RED, qa); tx(g, '？', 8, 22, 3, RED, 'center', 900, SANS, qa * 0);
    chip(g, 28, 30, '为什么待在轨道上，就不辐射？', RED, qb);
    // helium
    var hx = 74, hy = 24, ha = A_(lt, L[3] - 0.3, 0.9);
    if (ha > 0.01) {
      ring(g, hx, hy, 7.5, 'rgba(143,208,255,0.35)', 0.18, ha);
      nuc(g, hx, hy, 1.5, ha);
      elec(g, hx + 7.5 * Math.cos(lt * 2.6), hy + 7.5 * Math.sin(lt * 2.6), 0.75, ha);
      elec(g, hx + 7.5 * Math.cos(lt * 2.6 + Math.PI), hy + 7.5 * Math.sin(lt * 2.6 + Math.PI), 0.75, ha);
      tx(g, '氦原子：两个电子', hx, hy + 12.4, 2.0, DIM, 'center', 700, SANS, ha);
      var xa = A_(lt, L[3] + 0.9, 0.5);
      chip(g, hx, 41, '✕ 算不准', RED, xa);
    }
    var na = A_(lt, L[4] - 0.1, 0.9);
    if (na > 0.01) {
      halo(g, 28, 41, 16, GOLDA, 0.35 * na);
      chip(g, 28, 41, '需要一个更根本的新理论', GOLD, na, 'rgba(40,30,12,0.95)');
    }
  };

  // ---------- d11: electrons are waves; only whole numbers of wavelengths fit ----------
  function waveRing(g, cx, cy, R, n, amp, sweep, col, w, a, shim) {
    if (a <= 0.003 || sweep <= 0.001) return;
    var N = 220, k, th, r, last = Math.floor(N * clamp(sweep));
    g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = w; g.beginPath();
    for (k = 0; k <= last; k++) {
      th = k / N * TAU; r = R + amp * shim * Math.cos(n * th);
      var x = cx + r * Math.cos(th), y = cy + r * Math.sin(th);
      if (k === 0) g.moveTo(x, y); else g.lineTo(x, y);
    }
    g.stroke(); g.restore();
  }
  DRAW.d11 = function (g, lt, L) {
    var cx = 50, cy = 26, i, shim = 0.8 + 0.2 * Math.sin(lt * 4);
    var a0 = A_(lt, 0.0, 0.8);
    chip(g, cx, 8.6, '1924 年', GOLD, a0, 'rgba(40,30,12,0.95)');
    nuc(g, cx, cy, 1.3, a0);
    // L1: the little ball turns into a cloud / wave
    var m = A_(lt, L[1] - 0.2, 1.2), ang = lt * 2.2, R = 13;
    var ballA = 1 - m;
    elec(g, cx + R * Math.cos(ang), cy + R * Math.sin(ang), 0.85, A_(lt, 0.3, 0.6) * ballA);
    if (lt < L[2]) {
      ring(g, cx, cy, R, 'rgba(143,208,255,0.5)', 1.6 * m, 0.35 * m);
      halo(g, cx, cy, R + 4, 'rgba(143,208,255,0.9)', 0.12 * m);
      var wa = A_(lt, L[1] + 0.8, 0.8);
      tx(g, '小球  →  波', cx, 44, 2.2, ICE, 'center', 800, SANS, wa);
    }
    // L2: a wave that closes on itself
    var s2 = pr(lt, L[2] - 0.1, 1.2);
    var okA = lt < L[3] ? 1 : 0;
    if (lt >= L[2] - 0.2 && lt < L[3] + 0.0) {
      waveRing(g, cx, cy, R, 3, 1.3, s2, ICE, 0.45, 1, shim);
      if (s2 >= 1) { halo(g, cx + R + 1.3, cy, 2.2, GRNA, 0.0); }
      var ca = A_(lt, L[2] + 1.0, 0.6);
      chip(g, cx, 44, '首尾相接 ✓', LEAF, ca);
    }
    // L3: 3.5 wavelengths do not close, 4 do
    if (lt >= L[3] && lt < L[4]) {
      var t3 = lt - L[3], bad = t3 < 1.05;
      var s3 = pr(lt, L[3], 0.8);
      if (bad) {
        waveRing(g, cx, cy, R, 3.5, 1.3, s3, '#ff8a8a', 0.45, 1, shim);
        var gx = cx + R + 1.3 * shim * Math.cos(0), gy = cy;
        var ba = clamp((t3 - 0.7) / 0.3);
        ln(g, cx + R - 2.4, cy, cx + R + 3.6, cy, RED, 0.3, null, ba); halo(g, cx + R, cy, 3.4, REDA, 0.8 * ba);
        chip(g, cx, 44, '3.5 个波长：接不上 ✕', RED, A_(lt, L[3] + 0.5, 0.5));
      } else {
        waveRing(g, cx, cy, R, 4, 1.3, 1, ICE, 0.45, 1, shim);
        chip(g, cx, 44, '4 个波长：刚好 ✓', LEAF, A_(lt, L[3] + 1.1, 0.5));
      }
    }
    // L4: only a few rings survive
    if (lt >= L[4]) {
      var rs = [4.2, 8.6, 13.6];
      for (i = 0; i < 3; i++) {
        var ra = A_(lt, L[4] + i * 0.5, 0.6);
        waveRing(g, cx, cy, rs[i], i + 1, 0.8, 1, ICE, 0.4, ra, shim);
        tx(g, 'n=' + (i + 1), cx + rs[i] * 0.72 + 1.2, cy - rs[i] * 0.72 - 1.2, 1.5, DIM, 'left', 600, MONO, ra * 0.8);
      }
      chip(g, cx, 44, '轨道，自然只剩特定几条', GOLD, A_(lt, L[4] + 0.2, 0.7), 'rgba(40,30,12,0.95)');
    }
  };

  // ---------- d12: why the electron cannot fall in ----------
  DRAW.d12 = function (g, lt, L) {
    var i, gx0 = 56, gx1 = 94, gy0 = 12, gy1 = 42, y0 = 28, ky = 9;
    var X = function (r) { return gx0 + (r - 0.3) / 3.0 * (gx1 - gx0); };
    var Y = function (e) { return y0 - e * ky; };
    var a0 = A_(lt, 0.0, 0.8);
    // ---- left: the electron cloud next to the nucleus ----
    var nx = 20, ny = 26;
    nuc(g, nx, ny, 1.1, a0);
    var q = A_(lt, L[1] - 0.2, 0.8), sq = A_(lt, L[2] - 0.1, 1.6);
    var rc = mix(12.5, 3.6, eio(sq));                       // the cloud is squeezed
    halo(g, nx, ny, rc * 1.5, 'rgba(143,208,255,0.9)', 0.16 * a0);
    ring(g, nx, ny, rc, 'rgba(143,208,255,0.7)', 0.35, 0.6 * a0);
    var jit = A_(lt, L[3] - 0.1, 0.8);
    for (i = 0; i < 10; i++) {
      var ag = i / 10 * TAU + 0.3, f = Math.sin(lt * 18 + i * 2.1) * 0.5 + 0.5, len = (1.2 + 7.0 / rc * 1.6) * (0.5 + f * 0.7);
      ln(g, nx + (rc + 0.4) * Math.cos(ag), ny + (rc + 0.4) * Math.sin(ag), nx + (rc + 0.4 + len) * Math.cos(ag), ny + (rc + 0.4 + len) * Math.sin(ag), RED, 0.3, null, jit * 0.85);
    }
    tx(g, '电子的波', nx, 11.4, 2.1, ICE, 'center', 800, SANS, a0);
    var wa = A_(lt, L[3] - 0.1, 0.7);
    tx(g, '挤得越窄，越躁动', nx, 42.8, 2.0, RED, 'center', 800, SANS, wa);
    var qq = A_(lt, L[1] - 0.1, 0.7) * (1 - sm(L[2] - 0.1, L[2] + 0.5, lt));
    tx(g, '？', nx + 12.6, ny - 9, 4.6, RED, 'center', 900, SANS, qq);
    // ---- right: the energy picture ----
    var ga = A_(lt, L[1] - 0.2, 0.8);
    ln(g, gx0, y0, gx1, y0, 'rgba(238,242,248,0.25)', 0.12, null, ga);
    ln(g, gx0, gy0, gx0, gy1, 'rgba(238,242,248,0.45)', 0.2, null, ga);
    tx(g, '能量', gx0 + 2.2, gy0 - 1.8, 1.8, DIM, 'center', 700, SANS, ga); tx(g, '离核距离 →', gx1 - 4, gy1 + 2.2, 1.7, DIM, 'center', 700, SANS, ga);
    function curve(f, col, w, a, sweep) {
      if (a <= 0.003) return;
      g.save(); g.beginPath(); g.rect(gx0, gy0, gx1 - gx0, gy1 - gy0); g.clip();
      g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = w; g.beginPath();
      var n = 90, last = Math.floor(n * sweep);
      for (var k = 0; k <= last; k++) { var r = 3.3 - k / n * 3.0; var x = X(r), yy = Y(f(r)); if (k === 0) g.moveTo(x, yy); else g.lineTo(x, yy); }
      g.stroke(); g.restore();
    }
    curve(function (r) { return -1 / r; }, ICE, 0.45, ga, pr(lt, L[1] + 0.2, 1.4));
    tx(g, '吸引：越近越低', 68, 44.2, 1.7, ICE, 'center', 700, SANS, ga * A_(lt, L[1] + 1.2, 0.6));
    var ha = A_(lt, L[3] - 0.1, 0.8);
    curve(function (r) { return 0.5 / (r * r); }, '#ff8a6a', 0.45, ha, pr(lt, L[3], 1.5));
    tx(g, '躁动：越近越高', 84, 20.6, 1.7, '#ff8a6a', 'center', 700, SANS, ha * A_(lt, L[3] + 1.2, 0.6));
    var ta = A_(lt, L[5] - 0.2, 0.8);
    curve(function (r) { return 0.5 / (r * r) - 1 / r; }, GOLD, 0.7, ta, pr(lt, L[5] - 0.2, 1.2));
    var ma = A_(lt, L[5] + 0.9, 0.6);
    if (ma > 0.01) {
      var mx = X(1), my = Y(-0.5);
      halo(g, mx, my, 3.6, GOLDA, 0.9 * ma); dot(g, mx, my, 0.8, '#ffe7a8', ma);
      ln(g, mx, my + 1, mx, y0 + 6.4, 'rgba(242,198,107,0.55)', 0.15, [0.5, 0.5], ma);
      tx(g, '约 0.05 纳米', 82, 36.6, 1.8, GOLD, 'center', 800, SANS, ma);
      tx(g, '最稳的位置', 82, 39.2, 1.7, GOLD, 'center', 700, SANS, ma * 0.9);
    }
    var ca = A_(lt, L[6] - 0.1, 0.7);
    chip(g, 20, 42.4, '简化估算', DIM, ca, null);
  };

  // ---------- d13: one more rule: no two electrons in the same state ----------
  DRAW.d13 = function (g, lt, L) {
    var i, a0 = A_(lt, 0.0, 0.8);
    // ---- energy ladder: boxes hold at most two electrons (up / down) ----
    var boxes = [[1, 24, 40], [2, 24, 31], [3, 18.6, 22], [4, 24, 22], [5, 29.4, 22]];   // [id, x, y]   2p has three boxes
    var order = [[0, 1], [0, 2], [1, 1], [1, 2], [2, 1], [3, 1], [4, 1], [2, 2], [3, 2], [4, 2]];  // box index, arrow slot  (10 electrons: 1s2 2s2 2p6)
    var la = A_(lt, 0.1, 0.8) * (1 - sm(L[4] + 0.2, L[4] + 0.9, lt) * 0.0);
    var lad = lt < L[5] ? 1 : 0.0;
    var fadeL = 1 - sm(L[5] - 0.2, L[5] + 0.5, lt);
    g.save(); g.globalAlpha *= fadeL;
    tx(g, '1s', 10, 40, 1.9, DIM, 'center', 700, MONO, la); tx(g, '2s', 10, 31, 1.9, DIM, 'center', 700, MONO, la); tx(g, '2p', 10, 22, 1.9, DIM, 'center', 700, MONO, la);
    for (i = 0; i < boxes.length; i++) rbox(g, boxes[i][1] - 2, boxes[i][2] - 1.7, 4, 3.4, 0.4, 'rgba(238,242,248,0.5)', 0.18, null, la);
    function arr(bi, slot, a) { var b = boxes[bi]; tx(g, slot === 1 ? '↑' : '↓', b[1] + (slot === 1 ? -0.7 : 0.8), b[2] + 0.1, 2.6, ICE, 'center', 900, SANS, a); }
    // L1: two fit in the lowest box, the third is turned away
    var e1 = A_(lt, L[1] - 0.1, 0.5), e2 = A_(lt, L[1] + 0.5, 0.5);
    if (lt < L[2]) {
      arr(0, 1, e1); arr(0, 2, e2);
      var t3 = lt - (L[1] + 1.3);
      if (t3 > 0) {
        var bx = mix(46, 28, clamp(t3 / 0.7)), bounce = t3 > 0.7 ? clamp((t3 - 0.7) / 0.7) : 0;
        var px = bx + bounce * 10, py = 36;
        elec(g, px, py, 0.8, clamp(1 - bounce * 1.1));
        if (t3 > 0.65) { chip(g, 40, 36 - 6, '✕ 满了', RED, clamp(1 - (t3 - 1.6) / 0.6)); }
      }
    }
    // L2: the rest fill up level by level
    if (lt >= L[2]) {
      for (i = 0; i < order.length; i++) arr(order[i][0], order[i][1], A_(lt, L[2] + i * 0.32, 0.3));
    }
    g.restore();
    // ---- shells ----
    var hx = 76, hy = 25, sa = A_(lt, L[3] - 0.2, 0.9), nsh = [2, 8], rr = [6.2, 12];
    if (sa > 0.01) {
      nuc(g, hx, hy, 1.5, sa);
      for (var s = 0; s < 2; s++) {
        ring(g, hx, hy, rr[s], 'rgba(143,208,255,0.35)', 0.18, sa);
        for (i = 0; i < nsh[s]; i++) { var an = lt * (s ? 0.7 : 1.4) + i / nsh[s] * TAU; elec(g, hx + rr[s] * Math.cos(an), hy + rr[s] * Math.sin(an), 0.55, sa * A_(lt, L[3] + 0.3 + (s * 2 + i) * 0.12, 0.4)); }
      }
      tx(g, '2 + 8：两层壳', hx, 39.3, 1.9, DIM, 'center', 700, SANS, sa * (lt < L[5] ? 1 : 0));
    }
    // ---- periodic table: the first ten elements ----
    var els = ['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne'], ea = A_(lt, L[4] - 0.1, 0.5) * (1 - sm(L[5] - 0.1, L[5] + 0.4, lt));
    if (ea > 0.01) {
      for (i = 0; i < 10; i++) {
        var x = 51 + i * 4.6 + (i > 1 ? 0 : 0), ai = A_(lt, L[4] + i * 0.12, 0.35) * ea, noble = i === 1 || i === 9;
        rbox(g, x - 2, 41.4, 4.2, 4.2, 0.5, noble ? GOLD : 'rgba(143,208,255,0.6)', 0.18, noble ? 'rgba(242,198,107,0.15)' : 'rgba(143,208,255,0.06)', ai);
        tx(g, els[i], x + 0.1, 43.6, 1.7, noble ? GOLD : FG, 'center', 800, SANS, ai);
      }
    }
    // L5: two shell atoms cannot be pushed into each other
    var xa = A_(lt, L[5] - 0.2, 0.7);
    if (xa > 0.01) {
      var t5 = lt - L[5], mvx = mix(18, 51.4, eo(clamp(t5 / 1.6))), hit = t5 > 1.6 ? lt - L[5] - 1.6 : -1;
      var wob = hit >= 0 ? Math.sin(hit * 22) * Math.exp(-hit * 5) * 1.0 : 0, mx2 = mvx - wob;
      g.save(); g.globalAlpha *= xa;
      nuc(g, mx2, hy, 1.5, 1);
      for (s = 0; s < 2; s++) {
        ring(g, mx2, hy, rr[s], 'rgba(143,208,255,0.35)', 0.18, 1);
        for (i = 0; i < nsh[s]; i++) { var an2 = lt * (s ? -0.7 : -1.4) + i / nsh[s] * TAU; elec(g, mx2 + rr[s] * Math.cos(an2), hy + rr[s] * Math.sin(an2), 0.55, 1); }
      }
      g.restore();
      if (hit >= 0) { halo(g, (mx2 + hx) / 2, hy, 5, 'rgba(255,200,150,0.9)', clamp(1 - hit / 0.5) * 0.9); }
      chip(g, 50, 44.5, '电子不肯让位，物质才有体积', GOLD, A_(lt, L[5] + 1.4, 0.6), 'rgba(40,30,12,0.95)');
    }
    var pa = A_(lt, L[6] - 0.1, 0.7);
    chip(g, 50, 9.2, '严格证明 · 1967 年', LEAF, pa);
  };
