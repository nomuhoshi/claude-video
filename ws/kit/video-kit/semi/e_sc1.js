  // ================= semiconductor video: extra drawing kit =================
  var SIC = '#9fb4d0', PCOL = '#ffb347', BCOL = '#ff7fb0', HOLEC = '#ff8a8a';
  function siAtom(g, x, y, r, a, col) {
    if (a <= 0.003) return;
    halo(g, x, y, r * 2.0, 'rgba(143,170,215,0.30)', a * 0.5);
    dot(g, x, y, r, col || '#8fa6c8', a); dot(g, x - r * 0.3, y - r * 0.3, r * 0.34, 'rgba(255,255,255,0.55)', a * 0.6);
  }
  function eSmall(g, x, y, r, a) { if (a <= 0.003) return; halo(g, x, y, r * 3, ICEA, 0.5 * a); dot(g, x, y, r, ELE, a); }
  function holeM(g, x, y, r, a) {
    if (a <= 0.003) return;
    halo(g, x, y, r * 3, 'rgba(255,138,138,0.5)', 0.5 * a); ring(g, x, y, r, HOLEC, r * 0.38, a);
  }
  function subs(g, a1, sub, a2, x, y, sz, col, al) {      // text with a hand-drawn subscript, centred
    g.save(); if (al != null) g.globalAlpha *= al;
    g.font = '800 ' + sz + 'px ' + SANS; var w1 = g.measureText(a1).width, w3 = g.measureText(a2 || '').width;
    g.font = '800 ' + sz * 0.62 + 'px ' + SANS; var w2 = g.measureText(sub).width;
    var x0 = x - (w1 + w2 + w3) / 2; g.fillStyle = col; g.textBaseline = 'middle'; g.textAlign = 'left';
    g.font = '800 ' + sz + 'px ' + SANS; g.fillText(a1, x0, y);
    g.font = '800 ' + sz * 0.62 + 'px ' + SANS; g.fillText(sub, x0 + w1, y + sz * 0.28);
    g.font = '800 ' + sz + 'px ' + SANS; if (a2) g.fillText(a2, x0 + w1 + w2, y);
    g.restore();
  }
  function frac_(v) { return v - Math.floor(v); }
  function lamp(g, x, y, r, k, a) {
    if (a <= 0.003) return;
    halo(g, x, y, r * 3.2, 'rgba(255,226,140,0.95)', 0.85 * k * a);
    dot(g, x, y, r, k > 0.05 ? 'rgba(255,238,170,' + (0.25 + 0.75 * k).toFixed(2) + ')' : 'rgba(40,52,74,0.9)', a);
    ring(g, x, y, r, 'rgba(238,242,248,0.65)', 0.22, a);
  }

  // ---------- d0: opening ----------
  DRAW.d0 = function (g, lt, L) {
    var cx = 50, cy = 33, i, ia = A_(lt, 0.2, 1.0);
    var hot = A_(lt, L[2] - 0.2, 0.8), za = A_(lt, L[4] - 0.1, 0.8);
    halo(g, cx, cy, 26, 'rgba(143,208,255,0.9)', (0.10 + 0.14 * hot) * ia);
    // traces from the chip to the four devices
    var devs = [[15, 31, '手机'], [15, 41, '电脑'], [85, 31, '汽车'], [85, 41, 'AI']], pins = [[38, 31], [38, 39], [62, 31], [62, 39]];
    for (i = 0; i < 4; i++) {
      var d = devs[i], p = pins[i], sg = d[0] < 50 ? -1 : 1, da = A_(lt, 0.5 + i * 0.35, 0.7) * (1 - (sg < 0 ? za : 0));
      var xm = d[0] + sg * -8;
      ln(g, p[0], p[1], xm, p[1], 'rgba(143,208,255,0.45)', 0.2, null, da * ia);
      ln(g, xm, p[1], d[0] - sg * 4.2, d[1], 'rgba(143,208,255,0.0)', 0.2, null, 0);
      var q = frac_(lt * 0.55 + i * 0.27);
      var px = mix(p[0], xm, q);
      dot(g, px, p[1], 0.5, '#bfe6ff', da * ia * (0.35 + 0.65 * Math.sin(q * Math.PI)));
      chip(g, d[0], d[1] - (d[1] > 36 ? 0 : 0), d[2], ICE, da * ia);
    }
    // the chip itself
    rbox(g, 38, 24, 24, 18, 1.2, 'rgba(238,242,248,0.85)', 0.28, 'rgba(20,34,56,0.95)', ia);
    for (i = 0; i < 6; i++) {
      var yy = 26.2 + i * 2.9, xx = 40.6 + i * 3.7;
      ln(g, 36.2, yy, 38, yy, 'rgba(238,242,248,0.6)', 0.35, null, ia); ln(g, 62, yy, 63.8, yy, 'rgba(238,242,248,0.6)', 0.35, null, ia);
      ln(g, xx, 22.2, xx, 24, 'rgba(238,242,248,0.6)', 0.35, null, ia); ln(g, xx, 42, xx, 43.8, 'rgba(238,242,248,0.6)', 0.35, null, ia);
    }
    rbox(g, 42.5, 27.5, 15, 11, 0.6, 'rgba(143,208,255,' + (0.5 + 0.4 * hot).toFixed(2) + ')', 0.2, 'rgba(60,110,170,' + (0.2 + 0.25 * hot).toFixed(2) + ')', ia);
    for (i = 0; i < 4; i++) for (var j = 0; j < 3; j++) {
      var bl = 0.35 + 0.65 * Math.max(0, Math.sin(lt * 3 + i * 1.3 + j * 2.1));
      dot(g, 45.6 + i * 3.1, 30 + j * 3.0, 0.5, ICE, ia * bl * (0.5 + 0.5 * hot));
    }
    var sa = A_(lt, L[2] + 0.1, 0.7);
    chip(g, cx, 46.6 - 0, '半导体', GOLD, sa * (1 - A_(lt, L[4] - 0.2, 0.6)), 'rgba(40,30,12,0.95)');
    var qa = A_(lt, L[3] + 0.1, 0.6) * (1 - A_(lt, L[4] - 0.2, 0.6));
    tx(g, '？', 50, 17.8, 4.4, RED, 'center', 900, SANS, qa);
    // L4: a pile of sand under it
    if (za > 0.01) {
      var r = rng(4), k;
      for (k = 0; k < 70; k++) {
        var u = r(), v = r(), x = 9 + u * 22, y = 43.6 - Math.min(u, 1 - u) * 2 * 10 * v;
        dot(g, x, y, 0.3 + r() * 0.14, '#e6c88a', za * 0.9);
      }
      chip(g, 20, 46.2, '沙子', '#e6c88a', za, 'rgba(50,38,16,0.95)');
      arrow(g, 32, 36, 36.4, 36, '#e6c88a', 0.35, za, 1.0);
    }
  };

  // ---------- d1: three kinds of material ----------
  function wire3(g, x, y, w, h, n, spd, lt, a, kk, stuck) {
    rbox(g, x, y, w, h, 1.0, 'rgba(238,242,248,0.5)', 0.2, 'rgba(20,34,56,0.9)', a);
    var i, j, nx = 6, ny = 2;
    for (j = 0; j < ny; j++) for (i = 0; i < nx; i++) siAtom(g, x + w * (i + 0.5) / nx, y + h * (0.28 + 0.44 * j), 0.62, a * 0.8);
    for (i = 0; i < n; i++) {
      var ey = y + h * (0.13 + 0.74 * frac_(i * 0.618 + 0.2));
      if (stuck) {
        var ax = x + w * ((i % nx) + 0.5) / nx, ay = y + h * (0.28 + 0.44 * (i % 2));
        eSmall(g, ax + 1.15 * Math.cos(lt * 6 + i * 1.7), ay + 1.15 * Math.sin(lt * 6 + i * 1.7), 0.32, a * 0.9);
      } else {
        var ex = x + w * frac_(lt * spd + i / n);
        eSmall(g, ex, ey, 0.34, a * kk * (0.45 + 0.55 * frac_(i * 0.37 + 0.1)));
      }
    }
  }
  DRAW.d1 = function (g, lt, L) {
    var cxs = [17, 50, 83], i, W = 26, ym = 20.5;
    var aC = A_(lt, L[0] - 0.2, 0.8), aI = A_(lt, L[1] - 0.2, 0.8), aS = A_(lt, L[2] - 0.2, 0.8);
    // names
    chip(g, cxs[0], 9, '导体', LEAF, aC); chip(g, cxs[2], 9, '绝缘体', '#ff9d9d', aI); chip(g, cxs[1], 9, '半导体', GOLD, aS, 'rgba(40,30,12,0.95)');
    wire3(g, cxs[0] - W / 2, 15, W, 11, 13, 0.42, lt, aC, 1, false);
    wire3(g, cxs[2] - W / 2, 15, W, 11, 8, 0, lt, aI, 1, true);
    // semiconductor: how open the gate is
    var k = 0.5;
    if (lt >= L[3] - 0.1 && lt < L[4] - 0.1) k = 0.5 + 0.5 * Math.sin((lt - L[3]) * 3.4 - 0.4) > 0.5 ? 1 : 0.0;
    else if (lt >= L[4] - 0.1) k = 0.5 + 0.5 * Math.sin((lt - L[4]) * 1.8);
    else k = 0.35 + 0.0 * lt;
    if (lt < L[3] - 0.1) k = 0.35 * aS;
    wire3(g, cxs[1] - W / 2, 15, W, 11, 10, 0.42, lt, aS, k, false);
    // lamps
    var lamC = lamp, ly = 36;
    ln(g, cxs[0], 26, cxs[0], ly - 3.4, 'rgba(238,242,248,0.4)', 0.2, null, aC); lamC(g, cxs[0], ly, 2.4, 1, aC);
    ln(g, cxs[2], 26, cxs[2], ly - 3.4, 'rgba(238,242,248,0.4)', 0.2, null, aI); lamC(g, cxs[2], ly, 2.4, 0, aI);
    ln(g, cxs[1], 26, cxs[1], ly - 3.4, 'rgba(238,242,248,0.4)', 0.2, null, aS); lamC(g, cxs[1], ly, 2.4, lt < L[3] - 0.1 ? 0.35 : k, aS);
    tx(g, '电流很容易过', cxs[0], 42.2, 1.8, LEAF, 'center', 700, SANS, aC);
    tx(g, '几乎不通电', cxs[2], 42.2, 1.8, '#ff9d9d', 'center', 700, SANS, aI);
    var ma = A_(lt, L[2] + 0.2, 0.7) * (lt < L[3] - 0.1 ? 1 : 0);
    tx(g, '在中间', cxs[1], 42.2, 1.8, GOLD, 'center', 700, SANS, ma);
    // L3/L4: a knob that controls it
    var ka = A_(lt, L[4] - 0.1, 0.7);
    if (ka > 0.01) {
      rbox(g, cxs[1] - 8, 40.8, 16, 1.0, 0.5, 'rgba(238,242,248,0.5)', 0.1, 'rgba(238,242,248,0.2)', ka);
      dot(g, cxs[1] - 7 + 14 * k, 41.3, 1.2, GOLD, ka); halo(g, cxs[1] - 7 + 14 * k, 41.3, 3, GOLDA, ka * 0.8);
      tx(g, '我们能控制', cxs[1], 44.4, 1.8, GOLD, 'center', 800, SANS, ka);
    }
    var ba = A_(lt, L[3] - 0.1, 0.6) * (1 - ka);
    tx(g, '时有时无', cxs[1], 42.2, 1.8, GOLD, 'center', 700, SANS, ba);
  };

  // ---------- d2: control = a switch = 1 and 0 ----------
  DRAW.d2 = function (g, lt, L) {
    var y0 = 24, i, a0 = A_(lt, 0.1, 0.8);
    var state = 0;
    if (lt >= L[1] - 0.1 && lt < L[2] - 0.1) state = 1;
    else if (lt >= L[2] - 0.1 && lt < L[3] - 0.1) state = 0;
    else if (lt >= L[3] - 0.1) state = (Math.floor((lt - L[3]) * 2.2) * 7 + 3) % 5 < 3 ? 1 : 0;
    var sw = 0; if (lt >= L[1] - 0.1) sw = state; else sw = 0.5 - 0.5 * Math.cos(lt * 1.6) > 0.5 ? 1 : 0;
    // circuit: battery -> switch -> lamp
    var pc = 'rgba(238,242,248,0.6)';
    ln(g, 12, y0, 20, y0, pc, 0.3, null, a0); ln(g, 20, y0, 20, y0 - 0, pc, 0.3, null, 0);
    dot(g, 22, y0, 0.7, pc, a0); dot(g, 36, y0, 0.7, pc, a0);
    var ang = sw ? 0 : -0.62; ln(g, 22, y0, 22 + 14 * Math.cos(ang), y0 + 14 * Math.sin(ang), GOLD, 0.5, null, a0);
    ln(g, 36, y0, 44, y0, pc, 0.3, null, a0);
    lamp(g, 50, y0, 3.4, sw ? 1 : 0, a0); ln(g, 53.4, y0, 60, y0, pc, 0.3, null, a0);
    rbox(g, 7, y0 - 3, 5, 6, 0.6, 'rgba(143,208,255,0.6)', 0.2, 'rgba(20,34,56,0.9)', a0); tx(g, '电', 9.5, y0 + 0.1, 1.9, ICE, 'center', 800, SANS, a0);
    // the big digit
    var da = A_(lt, L[1] - 0.1, 0.5), dig = state ? '1' : '0', dcol = state ? LEAF : DIM;
    var show = lt >= L[1] - 0.1;
    if (show) {
      halo(g, 80, 22, 14, state ? GRNA : 'rgba(147,161,182,0.25)', 0.5 * da);
      tx(g, dig, 80, 23, 18, dcol, 'center', 900, MONO, da);
      tx(g, state ? '导电' : '不导电', 80, 35.6, 2.2, dcol, 'center', 800, SANS, da);
    }
    // bit stream
    var sa = A_(lt, L[3] - 0.1, 0.7);
    if (sa > 0.01) {
      var step = Math.floor(lt * 2.4);
      for (i = 0; i < 18; i++) {
        var bit = ((i + step) * 7 + (i + step) * (i + step)) % 5 < 2 ? 1 : 0;
        tx(g, '' + bit, 12 + i * 4.6, 40.6, 3.2, bit ? LEAF : DIM, 'center', 800, MONO, sa * (0.45 + 0.55 * Math.sin((i / 17) * Math.PI)));
      }
    }
    var ca = A_(lt, L[4] - 0.1, 0.7);
    chip(g, 28, 33, '记录', ICE, ca); chip(g, 50, 33, '计算', GOLD, A_(lt, L[4] + 0.4, 0.7), 'rgba(40,30,12,0.95)');
  };

  // ---------- d3: energy bands ----------
  function band(g, x, y, w, h, nlev, col, a, glow) {
    rbox(g, x, y, w, h, 0.8, col, 0.2, 'rgba(143,208,255,' + (0.05 + 0.1 * (glow || 0)).toFixed(2) + ')', a);
    for (var i = 0; i < nlev; i++) ln(g, x + 1.2, y + h * (i + 0.5) / nlev, x + w - 1.2, y + h * (i + 0.5) / nlev, 'rgba(143,208,255,0.35)', 0.12, null, a);
  }
  DRAW.d3 = function (g, lt, L) {
    var ax = 14, i, j, a0 = A_(lt, 0.1, 0.8);
    ln(g, ax, 44, ax, 8, 'rgba(238,242,248,0.5)', 0.22, null, a0); arrowHead(g, ax, 8, -Math.PI / 2, 0.9, 'rgba(238,242,248,0.6)', a0);
    tx(g, '能量', ax + 0.2, 5.6, 1.8, DIM, 'center', 700, SANS, a0);
    // L0: an electron that wants to stand anywhere, but there are only a few floors
    var fa = A_(lt, L[1] - 0.2, 0.9), bx = 24, bw = 40;
    var va = fa, ca = A_(lt, L[1] + 0.3, 0.9);
    band(g, bx, 31, bw, 11, 4, 'rgba(143,208,255,0.7)', va, 0);
    band(g, bx, 9, bw, 11, 4, 'rgba(143,208,255,0.7)', ca, 0);
    // L0: free-floating electron trying every height and being refused
    if (lt < L[1]) {
      var ey = 12 + 30 * (0.5 + 0.5 * Math.sin(lt * 2.6)), ex = 44 + 6 * Math.sin(lt * 1.3);
      eSmall(g, ex, ey, 0.9, A_(lt, 0.3, 0.6));
      tx(g, '想站哪就站哪？', 54, 25.5, 2.0, DIM, 'center', 700, SANS, A_(lt, 0.8, 0.6));
    }
    // L2: the lower band is full of electrons
    var ea = A_(lt, L[2] - 0.2, 0.7);
    for (j = 0; j < 4; j++) for (i = 0; i < 9; i++) {
      var ee = A_(lt, L[2] - 0.2 + (i + j * 9) * 0.02, 0.4);
      eSmall(g, bx + 3 + i * 4.3 + (j % 2) * 1.1, 32.4 + j * 2.75, 0.55, ee * 0.95 * (lt > 0 ? 1 : 0));
    }
    chip(g, 79, 36.5, '价带：住满了', ICE, A_(lt, L[2] + 0.2, 0.6));
    // L3: the upper band is empty
    chip(g, 79, 14.5, '导带：空着', '#b8c4d8', A_(lt, L[3] + 0.0, 0.6));
    var ga = A_(lt, L[4] - 0.2, 0.8);
    if (ga > 0.01) {
      rbox(g, bx, 20.2, bw, 10.6, 0.6, 'rgba(242,198,107,0.5)', 0.14, 'rgba(242,198,107,0.07)', ga, [0.7, 0.5]);
      arrow(g, bx + bw + 3, 21, bx + bw + 3, 30.4, GOLD, 0.25, ga, 0.9); arrow(g, bx + bw + 3, 30.4, bx + bw + 3, 21, GOLD, 0.25, ga, 0.9);
      chip(g, 79, 25.6, '带隙：站不了', GOLD, ga, 'rgba(40,30,12,0.95)');
    }
  };

  // ---------- d4: three kinds, three floor plans ----------
  DRAW.d4 = function (g, lt, L) {
    var cxs = [17, 50, 83], bw = 22, i, j;
    var aC = A_(lt, L[0] - 0.2, 0.8), aI = A_(lt, L[1] - 0.2, 0.8), aS = A_(lt, L[2] - 0.2, 0.8);
    chip(g, cxs[0], 8.2, '导体', LEAF, aC); chip(g, cxs[2], 8.2, '绝缘体', '#ff9d9d', aI); chip(g, cxs[1], 8.2, '半导体', GOLD, aS, 'rgba(40,30,12,0.95)');
    var yb = 41.5, hv = 6, gI = 17, gS = 3.6;
    function fillE(x, y, w, h, nr, nc, a, off) {
      for (j = 0; j < nr; j++) for (i = 0; i < nc; i++) eSmall(g, x + 1.9 + i * ((w - 3.8) / Math.max(1, nc - 1)) + (j % 2) * 0.0, y + 1.1 + j * ((h - 2.2) / Math.max(1, nr - 1)), 0.5, a * 0.95);
    }
    // conductor: one wide band, half full
    band(g, cxs[0] - bw / 2, 15, bw, 26.5, 8, 'rgba(98,214,160,0.75)', aC, 0);
    fillE(cxs[0] - bw / 2, 28.5, bw, 13, 3, 6, aC);
    var up = frac_(lt * 0.45), exm = cxs[0] - 1 + 4 * Math.sin(lt * 1.1);
    eSmall(g, exm, 27.5 - 5 * up, 0.6, aC * (1 - up)); 
    tx(g, '上面就有空位', cxs[0], 44.6, 1.8, LEAF, 'center', 700, SANS, aC);
    // insulator: wide gap
    var yv = yb - hv, yc = yv - gI - hv;
    band(g, cxs[2] - bw / 2, yv, bw, hv, 3, 'rgba(143,208,255,0.7)', aI, 0); fillE(cxs[2] - bw / 2, yv, bw, hv, 3, 6, aI);
    band(g, cxs[2] - bw / 2, yc, bw, hv, 3, 'rgba(143,208,255,0.5)', aI, 0);
    rbox(g, cxs[2] - bw / 2, yc + hv, bw, gI, 0.5, 'rgba(255,138,138,0.35)', 0.12, 'rgba(255,138,138,0.05)', aI, [0.6, 0.5]);
    var tr = frac_(lt * 0.5), tH = tr < 0.5 ? tr / 0.5 : (1 - tr) / 0.5;
    if (aI > 0.3) { eSmall(g, cxs[2] + 4, yv - 1 - tH * 5.5, 0.6, aI); }
    chip(g, cxs[2] + 0, yv - gI / 2 - 0.4 + 0, '✕', RED, aI * A_(lt, L[1] + 0.8, 0.5) * (tH > 0.8 ? 1 : 0.55));
    tx(g, '上不去', cxs[2], 44.6, 1.8, '#ff9d9d', 'center', 700, SANS, aI);
    // semiconductor: narrow gap
    var yv2 = yb - hv, yc2 = yv2 - gS - hv;
    band(g, cxs[1] - bw / 2, yv2, bw, hv, 3, 'rgba(143,208,255,0.7)', aS, 0); fillE(cxs[1] - bw / 2, yv2, bw, hv, 3, 6, aS);
    band(g, cxs[1] - bw / 2, yc2, bw, hv, 3, 'rgba(143,208,255,0.5)', aS, 0);
    rbox(g, cxs[1] - bw / 2, yc2 + hv, bw, gS, 0.4, 'rgba(242,198,107,0.5)', 0.12, 'rgba(242,198,107,0.1)', aS, [0.6, 0.5]);
    var ja = A_(lt, L[3] - 0.1, 0.6);
    if (ja > 0.01) {
      var q = frac_((lt - L[3]) * 0.9), bxx = cxs[1] - 6 + 5 * (frac_(lt * 0.37) * 2 - 1) * 0;
      for (j = 0; j < 3; j++) {
        var qq = frac_(q + j / 3), xx = cxs[1] - 6 + j * 6, yy = mix(yv2 + 0.5, yc2 + hv - 1.6 - 0.0, eio(clamp(qq * 1.4))) ;
        if (qq < 0.72) { eSmall(g, xx, yy, 0.6, ja); }
        else holeM(g, xx, yv2 + 1.2, 0.55, ja * clamp((qq - 0.72) / 0.1));
      }
    }
    tx(g, '一点能量就跳', cxs[1], 44.6, 1.8, GOLD, 'center', 700, SANS, aS * (lt > L[3] - 0.1 ? 1 : 0));
    tx(g, '空档很窄', cxs[1], 44.6, 1.8, GOLD, 'center', 700, SANS, aS * (lt > L[3] - 0.1 ? 0 : 1));
    // numbers
    var na = A_(lt, L[4] - 0.1, 0.7);
    if (na > 0.01) {
      chip(g, cxs[2] - 11 - 0.0 + 0, yc + hv + gI / 2 + 0, '5.5', '#ff9d9d', na * 0);
      tx(g, '约 5.5', cxs[2] - bw / 2 - 5.8, yc + hv + gI / 2, 2.0, '#ff9d9d', 'center', 800, MONO, na);
      tx(g, '约 1.1', cxs[1] - bw / 2 - 5.8, yc2 + hv + gS / 2, 2.0, GOLD, 'center', 800, MONO, na);
      tx(g, '空档大小（电子伏）', 50, 4.2, 1.7, DIM, 'center', 700, SANS, na);
    }
  };

  // ---------- d5: holes, and the effect of heat ----------
  DRAW.d5 = function (g, lt, L) {
    var n = 8, x0 = 9, dx = 4.9, yc = 25, i, a0 = A_(lt, 0.1, 0.8);
    // right: conductivity versus temperature
    var gx0 = 60, gx1 = 94, gy0 = 12, gy1 = 40;
    var ga = A_(lt, L[4] - 0.2, 0.8);
    ln(g, gx0, gy1, gx1, gy1, 'rgba(238,242,248,0.45)', 0.2, null, ga); ln(g, gx0, gy1, gx0, gy0, 'rgba(238,242,248,0.45)', 0.2, null, ga);
    tx(g, '导电能力', gx0 + 0.5, gy0 - 2.2, 1.7, DIM, 'left', 700, SANS, ga); tx(g, '温度 →', gx1 - 2, gy1 + 2.4, 1.7, DIM, 'right', 700, SANS, ga);
    function cv(f, col, w, a, sw) {
      if (a <= 0.003) return;
      g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = w; g.beginPath();
      var N = 60, last = Math.floor(N * sw);
      for (var k = 0; k <= last; k++) { var u = k / N, x = gx0 + 2 + u * (gx1 - gx0 - 4), y = f(u); if (k === 0) g.moveTo(x, y); else g.lineTo(x, y); }
      g.stroke(); g.restore();
    }
    cv(function (u) { return gy1 - 2 - (gy1 - gy0 - 5) * (Math.exp(3.0 * u) - 1) / (Math.exp(3.0) - 1); }, GOLD, 0.6, ga, pr(lt, L[4] + 0.2, 1.6));
    cv(function (u) { return gy0 + 5 + 14 * u; }, '#9fb3d9', 0.6, A_(lt, L[6] - 0.1, 0.5), pr(lt, L[6] - 0.1, 1.4));
    var sa = A_(lt, L[5] - 0.1, 0.6); chip(g, 75, 14.6, '半导体：往上', GOLD, sa, 'rgba(40,30,12,0.95)');
    chip(g, 83, 36.4, '金属：往下', '#9fb3d9', A_(lt, L[6] + 0.5, 0.6));
    // left: a row of atoms with a hole that walks
    var wk = lt - (L[2] + 0.2), hole = 3;
    if (wk > 0) hole = 3 - Math.min(3, Math.floor(wk / 0.55));
    var jumped = lt >= L[0] + 0.5;
    for (i = 0; i < n; i++) {
      var sx = x0 + i * dx;
      siAtom(g, sx, yc, 0.95, a0);
      var isHole = jumped && i === hole;
      if (!isHole) eSmall(g, sx, yc - 2.5, 0.5, a0);
    }
    if (jumped) {
      var t = lt - (L[0] + 0.5), up = eo(clamp(t / 0.8));
      var ex = x0 + 3 * dx + (t > 0.8 ? ((t - 0.8) * 2.0) : 0), ey = yc - 2.5 - 7 * up + (t > 0.8 ? 0.6 * Math.sin((t - 0.8) * 5) : 0);
      if (ex < x0 + (n - 1) * dx + 6) eSmall(g, ex, ey, 0.7, a0 * clamp(1 - (ex - (x0 + (n - 1) * dx)) / 6));
      holeM(g, x0 + hole * dx, yc - 2.5, 0.75, a0 * A_(lt, L[0] + 1.0, 0.5));
      var heatA = A_(lt, L[0], 0.7);
      ln(g, x0 - 2, yc + 5.5, x0 + (n - 1) * dx + 2, yc + 5.5, 'rgba(255,157,110,0.55)', 0.35, [0.8, 0.6], heatA);
      tx(g, '热 / 光 给电子能量', 27, yc + 8.6, 1.8, HOT, 'center', 700, SANS, heatA);
    }
    var hl = A_(lt, L[1] - 0.2, 0.6);
    chip(g, x0 + hole * dx, yc - 8.8 - 0, '空穴', HOLEC, hl * (lt < L[3] ? 1 : 0.0));
    var pa = A_(lt, L[3] - 0.1, 0.6);
    tx(g, '+', x0 + hole * dx, yc - 8.6, 4.2, HOLEC, 'center', 900, SANS, pa);
    chip(g, 28, 40.5, '像一个正电荷在移动', HOLEC, pa * (lt < L[4] - 0.2 ? 1 : 0));
    if (lt >= L[2]) arrow(g, x0 + 3.2 * dx, yc - 12.2, x0 + 0.4 * dx, yc - 12.2, HOLEC, 0.25, A_(lt, L[2] + 0.1, 0.5) * (lt < L[4] ? 1 : 0), 0.8);
  };
