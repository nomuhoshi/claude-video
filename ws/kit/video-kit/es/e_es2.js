  // ================= scenes d5-d10 =================
  // ---------- d5: a tower that barely sways ----------
  DRAW.d5 = function (g, lt, L) {
    var a0 = A_(lt, 0.2, 0.8), i, j;
    var gx = 28, gy = 44;
    ln(g, 4, gy, 54, gy, 'rgba(238,242,248,0.35)', 0.2, null, a0);
    var amp = 0.7 * A_(lt, 0.8, 1.2) * Math.sin(lt * 2.6);
    function sw(h) { return amp * (h / 32) * (h / 32); }
    function piece(w, h0, h1, col) { g.save(); g.globalAlpha *= a0; g.fillStyle = col; g.beginPath(); g.moveTo(gx - w / 2 + sw(h0), gy - h0); g.lineTo(gx + w / 2 + sw(h0), gy - h0); g.lineTo(gx + w / 2 * 0.9 + sw(h1), gy - h1); g.lineTo(gx - w / 2 * 0.9 + sw(h1), gy - h1); g.closePath(); g.fill(); g.restore(); }
    piece(11, 0, 14, 'rgba(176,192,216,0.85)'); piece(8.4, 14, 22, 'rgba(188,203,226,0.88)'); piece(5.6, 22, 28, 'rgba(200,214,234,0.9)'); piece(1.3, 28, 34, 'rgba(214,226,242,0.95)');
    for (j = 0; j < 5; j++) for (i = 0; i < 4; i++) { var hh = 2 + j * 2.6; dot(g, gx - 3.6 + i * 2.4 + sw(hh), gy - hh - 0.8, 0.28, 'rgba(255,224,150,0.8)', a0 * (0.5 + 0.5 * Math.sin(i * 3 + j))); }
    // wind
    var wa = A_(lt, 0.4, 0.5) * (1 - A_(lt, L[2], 0.8)); var r = rng(8);
    for (i = 0; i < 6; i++) { var q = fr(lt * 0.5 + r()), yy = 14 + r() * 24, xx = 2 + q * 24; ln(g, xx, yy, xx + 5, yy, 'rgba(180,215,255,0.8)', 0.16, null, wa * Math.sin(q * Math.PI) * 0.8); }
    // sway bracket
    var b = A_(lt, L[0], 0.7);
    if (b > 0.01) { var tx_ = gx + 1.8, ty = gy - 34; ln(g, gx - 1, ty - 3, gx - 1, ty + 1, 'rgba(255,224,150,0.9)', 0.15, [0.4, 0.3], b); ln(g, gx + 1, ty - 3, gx + 1, ty + 1, 'rgba(255,224,150,0.9)', 0.15, [0.4, 0.3], b); }
    chip(g, gx, 6.4, '摇摆不到 1 英寸', GOLD, A_(lt, L[1] - 0.5, 0.6), 'rgba(48,40,14,0.95)');
    // zoom bubble
    var z = A_(lt, L[2] - 0.2, 0.9), cx = 73, cy = 25, R = 16;
    if (z > 0.01) {
      ln(g, 36, 26, cx - R, cy, 'rgba(143,208,255,0.5)', 0.2, [0.8, 0.7], z);
      g.save(); g.globalAlpha *= z; g.beginPath(); g.arc(cx, cy, R, 0, TAU); g.fillStyle = 'rgba(20,34,58,0.55)'; g.fill(); g.strokeStyle = 'rgba(143,208,255,0.7)'; g.lineWidth = 0.3; g.stroke(); g.restore();
      var n = 4, sp = 5.2, P = [];
      for (j = 0; j < n; j++) for (i = 0; i < n; i++) P.push([cx + (i - 1.5) * sp, cy + (j - 1.5) * sp, (i + j) % 2 ? -1 : 1, i, j]);
      var spr = A_(lt, L[3] - 0.4, 0.8);
      for (i = 0; i < P.length; i++) {
        var p = P[i]; p.x = p[0] + Math.sin(lt * 5 + i * 1.7) * 0.25; p.y = p[1] + Math.cos(lt * 4.3 + i * 2.1) * 0.25;
      }
      for (j = 0; j < n; j++) for (i = 0; i < n; i++) {
        var k = j * n + i; if (i < n - 1) ln(g, P[k].x, P[k].y, P[k + 1].x, P[k + 1].y, 'rgba(98,214,160,0.7)', 0.22, null, spr * z);
        if (j < n - 1) ln(g, P[k].x, P[k].y, P[k + n].x, P[k + n].y, 'rgba(98,214,160,0.7)', 0.22, null, spr * z);
      }
      for (i = 0; i < P.length; i++) chg(g, P[i].x, P[i].y, 1.2, P[i][2], z, 0.7);
      chip(g, cx, 44, '电力，把每个电荷拉在原位', GRN, A_(lt, L[3] - 0.2, 0.6));
    }
  };

  // ---------- d6: leftover forces ----------
  DRAW.d6 = function (g, lt, L) {
    var i, a0 = A_(lt, 0.2, 0.7);
    var fade1 = 1 - 0.78 * A_(lt, L[3], 0.7);
    // tiny cluster
    var cx = 22, cy = 26, signs = [1, 1, 1, -1, -1];
    for (i = 0; i < 5; i++) { var an = i / 5 * TAU - 1.2 + Math.sin(lt * 1.5 + i) * 0.04; chg(g, cx + Math.cos(an) * 6, cy + Math.sin(an) * 6, 1.9, signs[i], A_(lt, 0.2 + i * 0.12, 0.6) * fade1, 0.8); }
    chip(g, cx, 11, '只剩几个原子', ICE, A_(lt, 0.4, 0.6) * fade1);
    chip(g, cx, 41, '正 3 个 · 负 2 个', GOLD, A_(lt, L[1] + 0.2, 0.6) * fade1, 'rgba(48,40,14,0.95)');
    var fa = A_(lt, L[2], 0.8) * fade1;
    if (fa > 0.01) { arrow(g, cx + 9, cy, cx + 9 + 14 * fa, cy, RED, 0.9, fa, 2.2); chip(g, cx + 16, cy - 7, '剩余电力', RED, fa); }
    // two neutral blocks
    var b0 = A_(lt, L[3] + 0.1, 0.8), close = eio(pr(lt, L[5], 1.4));
    var ay = 26, ax = 56 + 3.5 * close, bx = 80 - 3.5 * close, bw = 13, bh = 11;
    function block(x) {
      if (b0 <= 0.01) return;
      rbox(g, x - bw / 2, ay - bh / 2, bw / 2, bh, 0.6, 'rgba(255,143,107,0.8)', 0.22, 'rgba(255,143,107,0.2)', b0);
      rbox(g, x, ay - bh / 2, bw / 2, bh, 0.6, 'rgba(124,196,255,0.8)', 0.22, 'rgba(124,196,255,0.2)', b0);
      for (var q = 0; q < 4; q++) { var yy = ay - 2.6 + (q % 2) * 5.2, xx = (q < 2 ? -2.8 : 2.8); chg(g, x + xx, yy, 0.95, xx < 0 ? 1 : -1, b0, 0.6); }
    }
    block(ax); block(bx);
    chip(g, ax, 15, '中性', DIM, b0 * (1 - A_(lt, L[5] + 0.4, 0.5))); chip(g, bx, 15, '中性', DIM, b0 * (1 - A_(lt, L[5] + 0.4, 0.5)));
    var f4 = A_(lt, L[4], 0.8) * (1 - 0.7 * A_(lt, L[5] + 0.6, 0.6));
    if (f4 > 0.01) {
      var gxl = ax + bw / 2, gxr = bx - bw / 2;
      arrow(g, gxl + 0.2, ay, (gxl + gxr) / 2 + 0.2, ay, GRN, 0.9, f4, 1.8); arrow(g, gxr - 0.2, ay, (gxl + gxr) / 2 - 0.2, ay, GRN, 0.9, f4, 1.8);
      g.save(); g.globalAlpha *= f4 * 0.8; g.strokeStyle = 'rgba(255,107,107,0.7)'; g.lineWidth = 0.22; g.setLineDash([0.7, 0.6]);
      g.beginPath(); g.moveTo(ax - bw / 4, ay - bh / 2 - 0.4); g.quadraticCurveTo((ax + bx) / 2 - bw / 4, ay - bh / 2 - 5, bx - bw / 4, ay - bh / 2 - 0.4); g.stroke();
      g.beginPath(); g.moveTo(ax + bw / 4, ay + bh / 2 + 0.4); g.quadraticCurveTo((ax + bx) / 2 + bw / 4, ay + bh / 2 + 5, bx + bw / 4, ay + bh / 2 + 0.4); g.stroke(); g.restore();
      chip(g, 68, 41, '靠得近的异号电荷，吸引更强', GRN, f4);
    }
    var f5 = A_(lt, L[5] + 0.6, 0.8);
    if (f5 > 0.01) { glow(g, 68, ay, 9, 'rgba(242,198,107,0.9)', 0.35 * f5); chip(g, 68, 14, '化学力 = 电力', GOLD, f5, 'rgba(48,40,14,0.95)'); }
  };

  // ---------- d7: why not stick together ----------
  DRAW.d7 = function (g, lt, L) {
    var a0 = A_(lt, 0.2, 0.8), nx = 28, ny = 27, R = 10;
    ring(g, nx, ny, R, 'rgba(143,208,255,0.35)', 0.16, a0);
    chg(g, nx, ny, 1.7, 1, a0); var ea = lt * 5; chg(g, nx + R * Math.cos(ea), ny + R * Math.sin(ea), 1.0, -1, a0, 0.8);
    var pa = A_(lt, L[1], 0.8);
    if (pa > 0.01) { for (var i = 0; i < 4; i++) { var an = i * TAU / 4 + Math.PI / 4; arrow(g, nx + Math.cos(an) * (R - 0.6), ny + Math.sin(an) * (R - 0.6), nx + Math.cos(an) * 3.6, ny + Math.sin(an) * 3.6, GRN, 0.3, pa * (0.6 + 0.4 * Math.sin(lt * 4 + i)), 0.8); } chip(g, nx, 42, '电吸引：把电子往里拉', GRN, pa); }
    var s = A_(lt, L[2], 0.9);
    if (s > 0.01) {
      var rx = 72, ry = 27; ln(g, 44, 27, 60, 27, 'rgba(238,242,248,0.4)', 0.2, [0.7, 0.6], s);
      chg(g, rx, ry, 1.7, 1, s * 0.85); chg(g, rx + 1.5, ry, 1.0, -1, s * 0.85, 0.6);
      ring(g, rx, ry, 5, 'rgba(255,242,200,0.5)', 0.16, s * (0.5 + 0.5 * Math.sin(lt * 4)));
      chip(g, rx, 42, '最紧密的混合：电子贴着质子', DIM, s);
    }
    var q = A_(lt, L[3], 0.9);
    if (q > 0.01) { glow(g, 72, 18, 12, 'rgba(242,198,107,0.9)', 0.25 * q); tx(g, '？', 72, 15, 10, GOLD, 'center', 900, SANS, q); }
  };

  // ---------- d8: the quantum answer ----------
  DRAW.d8 = function (g, lt, L) {
    var a0 = A_(lt, 0.2, 0.8), cx = 24, cy = 27;
    chip(g, 50, 6, '量子力学', VIO, A_(lt, L[0] + 0.1, 0.6));
    var w = mix(22, 6.5, eio(pr(lt, L[1] + 0.3, 3.2))) , h = w;
    var shown = A_(lt, L[1] - 0.2, 0.8);
    var boxa = shown * (1 - 0.7 * A_(lt, L[4], 0.8));
    rbox(g, cx - w / 2, cy - h / 2, w, h, 0.6, 'rgba(238,242,248,0.8)', 0.3, 'rgba(60,80,120,0.22)', boxa);
    var om = 2.4 * (22 / w), ex = cx + Math.sin(lt * om * 1.0) * w * 0.36, ey = cy + Math.sin(lt * om * 1.31 + 1) * h * 0.36;
    var vx = Math.cos(lt * om) * om * w * 0.36, vy = Math.cos(lt * om * 1.31 + 1) * om * 1.31 * h * 0.36, vl = Math.hypot(vx, vy) + 1e-6;
    var al = Math.min(9, 1 + (22 / w) * 1.2);
    chg(g, ex, ey, 1.0, -1, boxa, 0.8);
    if (boxa > 0.01) arrow(g, ex, ey, ex + vx / vl * al, ey + vy / vl * al, VIO, 0.34, boxa * shown, 0.9);
    chip(g, cx, 11, '把电子关进小盒子', ICE, A_(lt, L[1] + 0.2, 0.6) * (1 - 0.5 * A_(lt, L[4], 0.6)));
    chip(g, cx, 43, '盒子越小，动量越大', VIO, A_(lt, L[3] - 0.2, 0.7) * (1 - 0.5 * A_(lt, L[4], 0.6)));
    // balance in an atom
    var b0 = A_(lt, L[4], 0.9), nx = 74, ny = 27;
    if (b0 > 0.01) {
      ring(g, nx, ny, 9, 'rgba(143,208,255,0.35)', 0.16, b0); chg(g, nx, ny, 1.7, 1, b0);
      var k; for (k = 0; k < 6; k++) { var an = k / 6 * TAU + 0.4 + lt * 0.2; var pa2 = A_(lt, L[5] - 0.2, 0.8), pb = A_(lt, L[4] + 0.6, 0.8);
        arrow(g, nx + Math.cos(an) * 12.5, ny + Math.sin(an) * 12.5, nx + Math.cos(an) * 9.6, ny + Math.sin(an) * 9.6, GRN, 0.3, pb * b0, 0.8);
        arrow(g, nx + Math.cos(an + 0.5) * 6.2, ny + Math.sin(an + 0.5) * 6.2, nx + Math.cos(an + 0.5) * 8.4, ny + Math.sin(an + 0.5) * 8.4, VIO, 0.3, pa2 * b0, 0.8); }
      chip(g, nx, 10, '电吸引：向里', GRN, A_(lt, L[4] + 0.6, 0.6)); chip(g, nx, 43.5, '乱动的劲：向外', VIO, A_(lt, L[5], 0.6));
      var eq = A_(lt, L[6], 0.8); if (eq > 0.01) { glow(g, nx, ny, 12, 'rgba(242,198,107,0.9)', 0.22 * eq); ring(g, nx, ny, 9, GOLD, 0.35, eq * 0.8); }
    }
  };

  // ---------- d9: protons in the nucleus ----------
  DRAW.d9 = function (g, lt, L) {
    var cx = 32, cy = 26, i, a0 = A_(lt, 0.2, 0.8);
    var P = [[0, 0]]; for (i = 0; i < 6; i++) P.push([Math.cos(i / 6 * TAU + 0.3) * 3.7, Math.sin(i / 6 * TAU + 0.3) * 3.7]);
    var jit = 1;
    var rep = A_(lt, L[2], 0.8) * (1 - 0.6 * A_(lt, L[4], 0.8)), hold = A_(lt, L[3], 0.8);
    for (i = 0; i < P.length; i++) chg(g, cx + P[i][0] + Math.sin(lt * 9 + i * 2) * 0.1, cy + P[i][1] + Math.cos(lt * 8 + i) * 0.1, 1.7, 1, a0 * A_(lt, 0.2 + i * 0.1, 0.5), 0.8);
    if (hold > 0.01) {
      var Ls = [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 1]];
      for (i = 0; i < Ls.length; i++) { var p = P[Ls[i][0]], q = P[Ls[i][1]]; ln(g, cx + p[0], cy + p[1], cx + q[0], cy + q[1], 'rgba(98,214,160,0.95)', 0.55, null, hold); }
      glow(g, cx, cy, 11, 'rgba(98,214,160,0.9)', 0.18 * hold);
    }
    if (rep > 0.01) for (i = 1; i < 7; i++) { var ang = i / 6 * TAU + 0.3; arrow(g, cx + Math.cos(ang) * 6.2, cy + Math.sin(ang) * 6.2, cx + Math.cos(ang) * (8.4 + 1.2 * Math.sin(lt * 6)), cy + Math.sin(ang) * (8.4 + 1.2 * Math.sin(lt * 6)), RED, 0.4, rep, 1.1); }
    chip(g, cx, 8.4, '原子核', ICE, A_(lt, 0.4, 0.6));
    chip(g, cx, 43, '全带正电', POS, A_(lt, L[1] + 0.2, 0.6) * (1 - A_(lt, L[2], 0.6)), 'rgba(50,24,18,0.95)');
    chip(g, cx, 43, '互相推开？', RED, A_(lt, L[2] + 0.2, 0.6) * (1 - A_(lt, L[3], 0.6)));
    chip(g, cx, 43, '核力：拉住它们', GRN, A_(lt, L[3] + 0.2, 0.6));
    var b = A_(lt, L[4], 0.8);
    if (b > 0.01) {
      var by = 38, hN = 22 * eo(pr(lt, L[4] + 0.2, 1.2)), hE = 11 * eo(pr(lt, L[4] + 0.6, 1.2));
      ln(g, 56, by, 92, by, 'rgba(238,242,248,0.4)', 0.2, null, b);
      rbox(g, 62, by - hN, 7, hN, 0.3, null, 0, 'rgba(98,214,160,0.9)', b); rbox(g, 78, by - hE, 7, hE, 0.3, null, 0, 'rgba(255,107,107,0.9)', b);
      tx(g, '核力', 65.5, by + 3, 2, GRN, 'center', 700, SANS, b); tx(g, '电力', 81.5, by + 3, 2, RED, 'center', 700, SANS, b);
    }
  };

  // ---------- d10: uranium ----------
  DRAW.d10 = function (g, lt, L) {
    var i, a0 = A_(lt, 0.2, 0.8), gdim = 1 - 0.78 * A_(lt, L[2], 0.8);
    // force-vs-distance graph
    var x0 = 8, y0 = 38, gw = 36, gh = 26;
    ln(g, x0, y0, x0 + gw + 2, y0, 'rgba(238,242,248,0.45)', 0.2, null, a0 * gdim); ln(g, x0, y0, x0, y0 - gh - 3, 'rgba(238,242,248,0.45)', 0.2, null, a0 * gdim);
    tx(g, '距离 →', x0 + gw, y0 + 2.6, 1.8, DIM, 'right', 600, SANS, a0 * gdim); tx(g, '力', x0 + 0.5, y0 - gh - 5, 1.8, DIM, 'left', 600, SANS, a0 * gdim);
    function curve(f, p, col, al) {
      if (p <= 0.01) return; g.save(); g.globalAlpha *= al; g.strokeStyle = col; g.lineWidth = 0.5; g.beginPath(); var n = Math.round(60 * p);
      for (var k = 0; k <= n; k++) { var u = k / 60, y = y0 - f(u); if (k) g.lineTo(x0 + u * gw, y); else g.moveTo(x0 + u * gw, y); } g.stroke(); g.restore();
    }
    curve(function (u) { return 26 * Math.exp(-u * 12); }, eo(pr(lt, L[0], 1.6)), GRN, a0 * gdim);
    curve(function (u) { return 12 / Math.pow(1 + 3.2 * u, 2); }, eo(pr(lt, L[1], 1.6)), ICE, a0 * gdim);
    chip(g, 25, 11, '核力：短程', GRN, A_(lt, L[0] + 0.5, 0.6) * gdim); chip(g, 31, 30, '电力：管得远', ICE, A_(lt, L[1] + 0.8, 0.6) * gdim);
    // nucleus blob
    var cx = 70, cy = 25, r = rng(31), N = 46, pts = [];
    for (i = 0; i < N; i++) { var an = r() * TAU, rd = Math.sqrt(r()) * 8; pts.push([Math.cos(an) * rd, Math.sin(an) * rd, r() > 0.5 ? 1 : 0, r() * 6]); }
    var grow = eio(pr(lt, L[2], 1.8)), nb = Math.round(mix(6, N, grow));
    var jit = 0.12 + 0.55 * A_(lt, L[4], 1.5) + 0.4 * A_(lt, L[5] - 0.4, 0.5) * (1 - A_(lt, L[5] + 0.6, 0.2));
    var hit = L[5] + 1.1, split = eio(pr(lt, hit, 2.4)), neu = pr(lt, L[5], 1.1);
    var ba = A_(lt, L[2] - 0.2, 0.7);
    for (i = 0; i < nb; i++) {
      var p = pts[i], side = p[0] < 0 ? -1 : 1;
      var gs = mix(0.55, 1, grow), ctr = side * 4.2 * gs * (1 - split) + side * 12 * split;
      var x = cx + ctr + (p[0] - side * 4.2) * gs * mix(1, 0.85, split) + Math.sin(lt * 11 + p[3]) * jit, y = cy + p[1] * gs * mix(1, 0.85, split) + Math.cos(lt * 9 + p[3]) * jit;
      dot(g, x, y, 0.85, p[2] ? POS : '#b6c0d0', ba * (p[2] ? 1 : 0.85));
    }
    glow(g, cx, cy, 11 + split * 8, 'rgba(255,143,107,0.9)', (0.14 + 0.1 * jit) * ba * (1 - 0.6 * split));
    chip(g, cx, 6.8, '铀 · 92 个质子', POS, A_(lt, L[3], 0.6), 'rgba(50,24,18,0.95)');
    chip(g, cx, 43, '质子越多，电斥力越强', RED, A_(lt, L[2] + 0.4, 0.6) * (1 - A_(lt, L[3], 0.5)));
    chip(g, cx, 43, '平衡脆弱，快要散开', RED, A_(lt, L[4] + 0.2, 0.6) * (1 - A_(lt, L[5], 0.5)));
    if (neu > 0.001 && neu < 1) { var nx = mix(97, cx + 8.5, eio(neu)); dot(g, nx, cy + 0.4, 0.9, '#d8e0ee', 1); glow(g, nx, cy + 0.4, 3, 'rgba(255,255,255,0.8)', 0.5); }
    if (lt > hit - 0.05) {
      var fl = clamp(1 - (lt - hit) / 1.0); glow(g, cx, cy, 22, 'rgba(255,236,190,1)', fl * 0.6);
      var ra = A_(lt, hit + 0.8, 0.7);
      if (ra > 0.01) { arrow(g, cx - 1.6, cy, cx - 6.4, cy, RED, 0.7, ra, 1.7); arrow(g, cx + 1.6, cy, cx + 6.4, cy, RED, 0.7, ra, 1.7); }
    }
    chip(g, cx, 43, '裂成两半，被电斥力推开', GOLD, A_(lt, L[6] + 0.4, 0.7), 'rgba(48,40,14,0.95)');
  };
