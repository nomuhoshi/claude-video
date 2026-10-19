  // ---------- d11: switches become logic ----------
  function swt(g, x, y, closed, a, name, col) {
    dot(g, x, y, 0.7, 'rgba(238,242,248,0.8)', a); dot(g, x + 10, y, 0.7, 'rgba(238,242,248,0.8)', a);
    var ang = closed ? 0 : -0.6; ln(g, x, y, x + 10.4 * Math.cos(ang), y + 10.4 * Math.sin(ang), col || GOLD, 0.5, null, a);
    tx(g, name, x + 5, y - 6.4, 2.0, DIM, 'center', 800, MONO, a);
  }
  DRAW.d11 = function (g, lt, L) {
    var y0 = 24, a0 = A_(lt, 0.1, 0.8), pc = 'rgba(238,242,248,0.6)', i, j;
    var ca = a0 * (1 - sm(L[3] - 0.2, L[3] + 0.6, lt));
    var A = 0, B = 1, bShow = A_(lt, L[1] - 0.1, 0.6);
    if (lt < L[1]) A = (Math.floor(lt / 1.1) % 2 === 0) ? 0 : 1;
    else if (lt < L[2] - 0.1) { A = (Math.floor((lt - L[1]) / 1.0) % 2 === 0) ? 1 : 0; B = 1; }
    else { var q = Math.floor((lt - (L[2] - 0.1)) / 1.3) % 4; A = q % 2 === 1 || q === 3 ? 1 : 0; B = q >= 2 ? 1 : 0; A = (q === 1 || q === 3) ? 1 : 0; }
    if (lt >= L[1] && lt < L[2] - 0.1) { B = 1; A = (Math.floor((lt - L[1]) / 1.0) % 2 === 0) ? 1 : 0; B = (Math.floor((lt - L[1]) / 1.0) % 2 === 0) ? 1 : 1; }
    var on = A && (lt < L[1] ? 1 : B);
    ln(g, 12, y0, 22, y0, pc, 0.3, null, ca);
    rbox(g, 7, y0 - 3, 5, 6, 0.6, 'rgba(143,208,255,0.6)', 0.2, 'rgba(20,34,56,0.9)', ca); tx(g, '电', 9.5, y0 + 0.1, 1.9, ICE, 'center', 800, SANS, ca);
    swt(g, 22, y0, A, ca, 'A');
    if (bShow > 0.01) { ln(g, 32.4, y0, 40, y0, pc, 0.3, null, ca); swt(g, 40, y0, B, ca * bShow, 'B'); ln(g, 50.4, y0, 58, y0, pc, 0.3, null, ca * bShow); }
    else ln(g, 32.4, y0, 58, y0, pc, 0.3, null, ca);
    lamp(g, 62, y0, 3.2, on ? 1 : 0, ca); ln(g, 65.2, y0, 70, y0, pc, 0.3, null, ca * 0);
    tx(g, on ? '1' : '0', 62, y0 + 9, 5.0, on ? LEAF : DIM, 'center', 900, MONO, ca);
    // truth table
    var ta = A_(lt, L[2] - 0.1, 0.8) * ca / Math.max(0.001, a0);
    if (ta > 0.01) {
      var rows = [[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 1]], cx0 = [76, 83, 91];
      tx(g, 'A', cx0[0], 11.6, 1.9, DIM, 'center', 800, MONO, ta); tx(g, 'B', cx0[1], 11.6, 1.9, DIM, 'center', 800, MONO, ta); tx(g, '灯', cx0[2], 11.6, 1.9, DIM, 'center', 800, SANS, ta);
      var cur = Math.floor((lt - (L[2] - 0.1)) / 1.3) % 4;
      for (j = 0; j < 4; j++) {
        if (j === cur) rbox(g, 72.5, 14.2 + j * 4.6, 22.5, 4.2, 0.5, null, 0, 'rgba(242,198,107,0.18)', ta);
        for (i = 0; i < 3; i++) tx(g, '' + rows[j][i], cx0[i], 16.4 + j * 4.6, 2.2, rows[j][2] && i === 2 ? LEAF : FG, 'center', 800, MONO, ta);
      }
      chip(g, 83, 36, '“与”：都开才亮', GOLD, A_(lt, L[2] + 0.9, 0.6) * ca, 'rgba(40,30,12,0.95)');
    }
    // gate grid
    var cnt = 0;
    if (lt >= L[3] - 0.1) cnt = lt < L[4] ? 3 * eo(pr(lt, L[3] - 0.1, 0.8)) : (lt < L[5] ? 3 + 9 * pr(lt, L[4], 1.2) : 12 + 28 * eo(pr(lt, L[5], 1.6)));
    var syms = ['&', '≥1', '1', '&', '≥1'];
    for (j = 0; j < 4; j++) for (i = 0; i < 10; i++) {
      var n = j * 10 + i, aa = clamp(cnt - n);
      if (aa <= 0.01) continue;
      var gx = 12 + i * 8, gy = 10.2 + j * 8.2;
      if (i < 9) ln(g, gx + 5.6, gy + 2.4, gx + 8, gy + 2.4, 'rgba(143,208,255,0.35)', 0.18, null, aa);
      rbox(g, gx, gy, 5.6, 4.8, 0.6, 'rgba(143,208,255,0.75)', 0.18, 'rgba(60,110,170,0.25)', aa);
      tx(g, syms[(i + j) % 5], gx + 2.8, gy + 2.5, 1.7, ICE, 'center', 800, MONO, aa * (0.6 + 0.4 * Math.sin(lt * 3 + n)));
    }
    chip(g, 50, 44.4, '算加法、存数据', GOLD, A_(lt, L[4] + 0.2, 0.6) * (lt < L[5] ? 1 : 0), 'rgba(40,30,12,0.95)');
    chip(g, 50, 44.4, '堆下去：整台电脑', LEAF, A_(lt, L[5] + 0.3, 0.6));
  };

  // ---------- d12: how many ----------
  DRAW.d12 = function (g, lt, L) {
    var x0 = 22, sc = 68 / 11, a0 = A_(lt, 0.1, 0.8), i;
    var yb = 29;
    ln(g, x0, yb, x0 + 68, yb, 'rgba(238,242,248,0.4)', 0.2, null, a0);
    var tk = [[0, '1'], [4, '万'], [8, '亿'], [10, '百亿']];
    for (i = 0; i < tk.length; i++) { ln(g, x0 + tk[i][0] * sc, yb - 0.8, x0 + tk[i][0] * sc, yb + 0.8, 'rgba(238,242,248,0.5)', 0.2, null, a0); tx(g, tk[i][1], x0 + tk[i][0] * sc, yb + 2.6, 1.7, DIM, 'center', 700, SANS, a0); }
    tx(g, '对数刻度', 90, yb + 5.2, 1.5, DIM, 'right', 600, SANS, a0 * 0.8);
    var b1 = A_(lt, 0.3, 0.6) , w1 = Math.log10(2250) * sc * eo(pr(lt, 0.3, 1.2)), w2 = Math.log10(1.9e10) * sc * eo(pr(lt, L[1] - 0.1, 1.8));
    tx(g, '1971', 11.5, 15.5, 2.6, GOLD, 'center', 900, MONO, a0); tx(g, '2023', 11.5, 24.5, 2.6, LEAF, 'center', 900, MONO, A_(lt, L[1] - 0.2, 0.6));
    rbox(g, x0, 12.8, Math.max(0.01, w1), 5.4, 0.7, null, 0, 'rgba(242,198,107,0.75)', 1);
    rbox(g, x0, 21.8, Math.max(0.01, w2), 5.4, 0.7, null, 0, 'rgba(98,214,160,0.75)', A_(lt, L[1] - 0.2, 0.4));
    if (w1 > 14) tx(g, '2,250 个', x0 + w1 - 1, 15.6, 2.2, '#2a1c00', 'right', 900, SANS, 1);
    if (w2 > 40) tx(g, '190 亿个', x0 + w2 - 1, 24.6, 2.2, '#052a1c', 'right', 900, SANS, 1);
    var ra = A_(lt, L[2] - 0.1, 0.8);
    chip(g, 50, 35.6, '涨了八百多万倍', RED, ra, 'rgba(50,16,16,0.95)');
    // shrinking squares
    var sa = A_(lt, L[3] - 0.1, 0.7);
    if (sa > 0.01) {
      tx(g, '晶体管尺寸', 12, 41.4, 1.8, DIM, 'center', 700, SANS, sa);
      for (i = 0; i < 9; i++) {
        var s = 5.6 * Math.pow(0.7, i), ai = A_(lt, L[3] + i * 0.18, 0.4);
        rbox(g, 24 + i * 7.6 + (5.6 - s) / 2, 41.4 - s / 2, s, s, 0.2, 'rgba(143,208,255,0.9)', 0.18, 'rgba(143,208,255,0.2)', ai * sa);
      }
      arrow(g, 90, 41.4, 94, 41.4, ICE, 0.3, sa, 0.8);
    }
  };

  // ---------- d13: from sand to pure silicon ----------
  DRAW.d13 = function (g, lt, L) {
    var i, y0 = 27, dim = 1 - 0.55 * A_(lt, L[4] - 0.2, 0.6);
    // sand
    var sa = A_(lt, 0.2, 0.7) * dim, r = rng(3);
    for (i = 0; i < 60; i++) { var u = r(), v = r(), x = 5 + u * 14, yy = 36 - Math.min(u, 1 - u) * 2 * 9 * v; dot(g, x, yy, 0.3 + r() * 0.15, '#e6c88a', sa * 0.9); }
    subs(g, 'SiO', '2', '', 12, 38.4, 2.2, '#e6c88a', sa);
    arrow(g, 21, 31, 26, 31, 'rgba(238,242,248,0.7)', 0.3, A_(lt, L[1] - 0.2, 0.5) * dim, 1.0);
    // furnace
    var fa = A_(lt, L[1] - 0.2, 0.8) * dim;
    rbox(g, 27, 21, 13, 16, 1.0, 'rgba(255,157,110,0.8)', 0.25, 'rgba(60,30,20,0.9)', fa);
    if (fa > 0.05) { g.save(); g.globalAlpha *= fa; flame(g, 33.5, 36, 9, 11, lt, 1, 7); g.restore(); }
    chip(g, 33.5, 16.4, '加碳 C', '#c7d2e3', fa);
    tx(g, '约 2000 度', 33.5, 39.4, 1.9, HOT, 'center', 800, SANS, fa);
    arrow(g, 42, 31, 48, 31, 'rgba(238,242,248,0.7)', 0.3, A_(lt, L[2] - 0.2, 0.5) * dim, 1.0);
    // silicon lump
    var la = A_(lt, L[2] - 0.2, 0.8) * dim;
    g.save(); g.globalAlpha *= la; g.fillStyle = '#7e8da6'; g.beginPath(); g.moveTo(49, 34); g.lineTo(52, 26); g.lineTo(58, 24); g.lineTo(63, 29); g.lineTo(62, 35); g.closePath(); g.fill();
    g.fillStyle = 'rgba(255,255,255,0.25)'; g.beginPath(); g.moveTo(52, 26); g.lineTo(58, 24); g.lineTo(57, 29); g.closePath(); g.fill(); g.restore();
    chip(g, 56, 39.0, '纯度约 98%', ICE, la);
    arrow(g, 66, 31, 71, 31, 'rgba(238,242,248,0.7)', 0.3, A_(lt, L[3] - 0.2, 0.5) * dim, 1.0);
    // distillation column
    var da = A_(lt, L[3] - 0.2, 0.8) * dim;
    rbox(g, 73, 15, 11, 23, 1.0, 'rgba(143,208,255,0.7)', 0.22, 'rgba(20,34,56,0.9)', da);
    for (i = 1; i < 6; i++) ln(g, 73.8, 15 + i * 3.8, 83.2, 15 + i * 3.8, 'rgba(143,208,255,0.35)', 0.14, null, da);
    for (i = 0; i < 8; i++) { var q = frac_(lt * 0.32 + i / 8); dot(g, 75 + (i * 7 % 8) * 0.95 + 0.5 * Math.sin(lt * 3 + i), 37 - q * 21, 0.4, '#bfe6ff', da * (1 - q)); }
    chip(g, 78.5, 39.6, '蒸馏', ICE, da);
    // nine nines
    var na = A_(lt, L[4] - 0.2, 0.7);
    if (na > 0.01) {
      tx(g, '99.9999999%', 50, 9.2, 3.8, GOLD, 'center', 900, MONO, na);
      for (i = 0; i < 9; i++) {
        var ti = A_(lt, L[4] + 0.2 + i * 0.22, 0.3);
        rbox(g, 25 + i * 5.6, 42.8, 4.4, 3.8, 0.5, GOLD, 0.16, 'rgba(242,198,107,' + (0.1 + 0.35 * ti).toFixed(2) + ')', na);
        tx(g, '9', 27.2 + i * 5.6, 44.8, 2.5, GOLD, 'center', 900, MONO, na * ti);
      }
      tx(g, '九个九', 80, 44.8, 2.0, GOLD, 'left', 800, SANS, na * A_(lt, L[4] + 2.3, 0.5));
    }
  };

  // ---------- d14: ingot, wafer, chip ----------
  DRAW.d14 = function (g, lt, L) {
    var i, j, a0 = A_(lt, 0.1, 0.8);
    var h = 6 + 20 * eo(pr(lt, 0.3, 3.0)), bx = 14, bt = 37 - h, sl = A_(lt, L[1] - 0.2, 0.6);
    // ingot
    var ia = a0 * (1 - 0.0);
    g.save(); g.globalAlpha *= ia;
    var gr = g.createLinearGradient(bx - 5, 0, bx + 5, 0); gr.addColorStop(0, '#5f7088'); gr.addColorStop(0.45, '#c6d2e4'); gr.addColorStop(1, '#6d7e97');
    g.fillStyle = gr; g.fillRect(bx - 5, bt, 10, h);
    g.beginPath(); g.ellipse(bx, 37, 5, 1.6, 0, 0, TAU); g.fill();
    g.fillStyle = '#dfe8f5'; g.beginPath(); g.ellipse(bx, bt, 5, 1.6, 0, 0, TAU); g.fill();
    g.restore();
    for (i = 1; i < 6; i++) { var ly = bt + i * h / 6; ln(g, bx - 5, ly, bx + 5, ly, 'rgba(255,255,255,0.7)', 0.18, null, sl * ia); }
    chip(g, bx, 43.6, '单晶硅棒', '#c7d2e3', ia);
    ln(g, bx, bt - 1.6, bx, 9, 'rgba(238,242,248,0.5)', 0.2, [0.5, 0.4], ia * (1 - sl));
    // wafer
    var wa = A_(lt, L[1] + 0.2, 0.9), wx = 52, wy = 26, wr = 14.5;
    arrow(g, 22, 30, 34, 30, 'rgba(238,242,248,0.6)', 0.3, A_(lt, L[1] - 0.1, 0.5), 1.0);
    if (wa > 0.01) {
      g.save(); g.globalAlpha *= wa; var wg = g.createRadialGradient(wx - 5, wy - 6, 1, wx, wy, wr); wg.addColorStop(0, '#dbe5f5'); wg.addColorStop(1, '#6f819d');
      g.fillStyle = wg; g.beginPath(); g.arc(wx, wy, wr, 0, TAU); g.fill(); g.restore();
      chip(g, wx, 44.6, '晶圆', ICE, A_(lt, L[1] + 0.6, 0.5));
    }
    // dies
    var da = A_(lt, L[2] - 0.1, 0.9);
    if (da > 0.01) {
      g.save(); g.beginPath(); g.arc(wx, wy, wr - 0.3, 0, TAU); g.clip(); g.globalAlpha *= da;
      for (j = -4; j <= 4; j++) for (i = -4; i <= 4; i++) {
        var dx = wx + i * 3.4, dy = wy + j * 3.4;
        rbox(g, dx - 1.5, dy - 1.5, 3, 3, 0.2, 'rgba(10,20,40,0.7)', 0.12, 'rgba(70,110,180,' + (0.35 + 0.25 * Math.sin(lt * 2 + i * 0.8 + j * 1.3)).toFixed(2) + ')', 1);
      }
      g.restore();
      var sw2 = frac_(lt * 0.5) * 2 * wr - wr;
      g.save(); g.beginPath(); g.arc(wx, wy, wr, 0, TAU); g.clip(); ln(g, wx + sw2, wy - wr, wx + sw2, wy + wr, 'rgba(180,230,255,0.9)', 0.4, null, da * (lt < L[3] ? 1 : 0.4)); halo(g, wx + sw2, wy, 6, 'rgba(180,230,255,0.9)', da * 0.25); g.restore();
      chip(g, 33, 10.4, '掺杂', GOLD, A_(lt, L[2] + 0.2, 0.5) * (lt < L[3] + 0.8 ? 1 : 1), 'rgba(40,30,12,0.95)');
      chip(g, 52, 10.4, '刻电路', ICE, A_(lt, L[2] + 0.9, 0.5));
    }
    // zoom
    var za = A_(lt, L[3] - 0.2, 0.9);
    if (za > 0.01) {
      ln(g, wx + 3.4, wy - 3.4, 77, 17, 'rgba(242,198,107,0.6)', 0.18, [0.5, 0.4], za); ln(g, wx + 3.4, wy - 0.4, 77, 33, 'rgba(242,198,107,0.6)', 0.18, [0.5, 0.4], za);
      rbox(g, wx + 1.9, wy - 4.9, 3, 3, 0.2, GOLD, 0.2, 'rgba(242,198,107,0.4)', za);
      rbox(g, 77, 17, 17, 16, 0.8, GOLD, 0.25, 'rgba(10,20,40,0.95)', za);
      for (j = 0; j < 7; j++) for (i = 0; i < 7; i++) {
        var tw = 0.35 + 0.65 * Math.max(0, Math.sin(lt * 3.2 + i * 1.7 + j * 2.3));
        dot(g, 79 + i * 2.35, 19 + j * 2.1, 0.5, '#bfe6ff', za * tw);
        if (i < 6) ln(g, 79 + i * 2.35, 19 + j * 2.1, 79 + (i + 1) * 2.35, 19 + j * 2.1, 'rgba(143,208,255,0.25)', 0.1, null, za);
      }
      chip(g, 85.5, 39.4, '上百亿个开关', GOLD, A_(lt, L[3] + 0.4, 0.6), 'rgba(40,30,12,0.95)');
    }
  };
