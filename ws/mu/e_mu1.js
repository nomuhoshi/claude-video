  // ================= Micron video: drawing kit and scenes d0-d5 =================
  var CRIM = '#ff9d9d', SIC = '#9fb4d0';
  function fr(v) { return v - Math.floor(v); }
  function W_(lt, t0, t1, fi, fo) { return A_(lt, t0, fi || 0.6) * (t1 == null ? 1 : 1 - A_(lt, t1, fo || 0.5)); }
  function glow(g, x, y, r, col, a) {
    if (a <= 0.003) return;
    g.save(); g.globalCompositeOperation = 'lighter'; halo(g, x, y, r, col, a); g.restore();
  }
  function pwrLamp(g, x, y, on, a) {         // a little power indicator: green when on
    if (a <= 0.003) return;
    glow(g, x, y, 4, 'rgba(98,214,160,0.9)', 0.7 * on * a);
    dot(g, x, y, 1.1, on > 0.05 ? 'rgba(98,214,160,' + (0.3 + 0.7 * on).toFixed(2) + ')' : 'rgba(46,58,80,0.95)', a);
    ring(g, x, y, 1.1, 'rgba(238,242,248,0.6)', 0.2, a);
    tx(g, '电源', x, y + 3.3, 1.5, on > 0.05 ? LEAF : DIM, 'center', 700, SANS, a);
  }
  function memChip(g, x, y, w, h, col, a, lab) {      // a generic memory chip with pins
    if (a <= 0.003) return;
    var i, n = Math.max(3, Math.round(w / 3));
    for (i = 0; i < n; i++) {
      var px = x + w * (i + 0.5) / n;
      ln(g, px, y - 1.4, px, y, 'rgba(238,242,248,0.55)', 0.3, null, a); ln(g, px, y + h, px, y + h + 1.4, 'rgba(238,242,248,0.55)', 0.3, null, a);
    }
    rbox(g, x, y, w, h, 0.9, col, 0.3, 'rgba(20,34,56,0.95)', a);
    rbox(g, x + w * 0.12, y + h * 0.18, w * 0.76, h * 0.64, 0.5, 'rgba(143,208,255,0.35)', 0.15, 'rgba(60,110,170,0.22)', a);
    if (lab) tx(g, lab, x + w / 2, y + h / 2 + 0.1, Math.min(2.6, w / 4.2), col, 'center', 900, MONO, a);
  }
  function fab(g, x, y, s, col, a, dash, fill) {      // factory with a saw-tooth roof; x,y = bottom-left
    if (a <= 0.003) return;
    g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = 0.25; if (dash) g.setLineDash(dash);
    g.beginPath(); g.moveTo(x, y); g.lineTo(x, y - 3 * s); g.lineTo(x + 2 * s, y - 4.6 * s); g.lineTo(x + 2 * s, y - 3 * s);
    g.lineTo(x + 4 * s, y - 4.6 * s); g.lineTo(x + 4 * s, y - 3 * s); g.lineTo(x + 6 * s, y - 4.6 * s); g.lineTo(x + 6 * s, y); g.closePath();
    if (fill) { g.fillStyle = fill; g.fill(); } g.stroke(); g.restore();
  }
  function rack(g, x, y, w, h, lt, a, col) {          // a server rack with blinking lights
    if (a <= 0.003) return;
    var i, n = 5, rh = h / n;
    for (i = 0; i < n; i++) {
      rbox(g, x, y + i * rh + 0.2, w, rh - 0.5, 0.4, col || 'rgba(143,208,255,0.8)', 0.18, 'rgba(20,34,56,0.95)', a);
      dot(g, x + 1.4, y + i * rh + rh / 2, 0.38, LEAF, a * (0.35 + 0.65 * Math.max(0, Math.sin(lt * 4 + i * 1.9))));
      dot(g, x + 2.8, y + i * rh + rh / 2, 0.38, GOLD, a * (0.35 + 0.65 * Math.max(0, Math.sin(lt * 3 + i * 2.7))));
      ln(g, x + w * 0.5, y + i * rh + rh / 2, x + w - 1.2, y + i * rh + rh / 2, 'rgba(143,208,255,0.4)', 0.2, null, a);
    }
  }
  function dramCell(g, x, y, s, on, a) {
    rbox(g, x, y, s, s, 0.4, 'rgba(143,208,255,0.55)', 0.14, 'rgba(20,34,56,0.9)', a);
    if (on > 0.01) { glow(g, x + s / 2, y + s / 2, s * 0.9, 'rgba(242,198,107,0.8)', 0.5 * on * a); dot(g, x + s / 2, y + s / 2, s * 0.26, GOLD, a * on); }
  }
  function cpuBox(g, x, y, w, h, a, col, lab) {
    var i;
    for (i = 0; i < 4; i++) {
      var px = x + w * (i + 0.5) / 4;
      ln(g, px, y - 1.2, px, y, 'rgba(238,242,248,0.55)', 0.3, null, a); ln(g, px, y + h, px, y + h + 1.2, 'rgba(238,242,248,0.55)', 0.3, null, a);
      var py = y + h * (i + 0.5) / 4;
      ln(g, x - 1.2, py, x, py, 'rgba(238,242,248,0.55)', 0.3, null, a); ln(g, x + w, py, x + w + 1.2, py, 'rgba(238,242,248,0.55)', 0.3, null, a);
    }
    rbox(g, x, y, w, h, 1.0, col || 'rgba(238,242,248,0.85)', 0.28, 'rgba(20,34,56,0.95)', a);
    if (lab) tx(g, lab, x + w / 2, y + h / 2, Math.min(2.6, w / 4), col || FG, 'center', 900, SANS, a);
  }
  function bookShelf(g, x0, y0, w, rows, rh, lt, t0, tn, a, seed) {    // rows of books, filling over tn seconds from t0
    var r = rng(seed || 3), j, cols = ['#6fb3e8', '#8fd0ff', '#f2c66b', '#62d6a0', '#ff9d6e', '#b9c7e6'], idx = 0;
    for (j = 0; j < rows; j++) {
      var yb = y0 + (j + 1) * rh, x = x0 + 0.8;
      rbox(g, x0, yb, w, 0.7, 0.2, null, 0, 'rgba(238,242,248,0.5)', a);
      while (x < x0 + w - 2.4) {
        var bw = 1.0 + r() * 1.1, bh = rh * (0.62 + 0.34 * r()), ci = Math.floor(r() * cols.length);
        var ba = clamp((lt - t0 - idx * (tn / 60)) / 0.25);
        rbox(g, x, yb - bh, bw, bh, 0.15, null, 0, cols[ci], a * ba * 0.85);
        x += bw + 0.25; idx++;
      }
    }
  }

  // ---------- d0: opening ----------
  DRAW.d0 = function (g, lt, L) {
    var ia = A_(lt, 0.2, 1.0), i, hot = W_(lt, L[2] - 0.2, null, 0.8);
    // processor in the middle, memory blocks on both sides
    glow(g, 50, 34, 22, 'rgba(143,208,255,0.9)', (0.10 + 0.10 * hot) * ia);
    cpuBox(g, 41, 27, 18, 13, ia, 'rgba(238,242,248,0.85)', 'AI 芯片');
    var ma = A_(lt, L[2] - 0.3, 0.9);
    var sides = [-1, 1];
    for (var s = 0; s < 2; s++) {
      var sg = sides[s], bx = sg < 0 ? 12 : 70;
      for (i = 0; i < 3; i++) {
        var by = 25 + i * 5.6;
        memChip(g, bx + (sg < 0 ? 0 : 0), by, 18, 4.2, 'rgba(143,208,255,0.9)', ma, null);
        var q = fr(lt * 0.7 + i * 0.31 + s * 0.17);
        var x1 = sg < 0 ? bx + 18 : bx, x2 = sg < 0 ? 41 : 59, xm = mix(x1, x2, sg < 0 ? q : 1 - q);
        ln(g, x1, by + 2.1, x2, by + 2.1, 'rgba(143,208,255,0.3)', 0.18, null, ma);
        dot(g, xm, by + 2.1, 0.45, '#bfe6ff', ma * (0.3 + 0.7 * Math.sin(q * Math.PI)));
      }
    }
    chip(g, 21, 44, '海量数据', ICE, W_(lt, L[2] + 0.3, L[3] + 0.2, 0.6, 0.5));
    chip(g, 79, 44, '海量数据', ICE, W_(lt, L[2] + 0.3, L[3] + 0.2, 0.6, 0.5));
    var na = A_(lt, L[3] + 0.5, 0.8);
    chip(g, 21, 44, '美光', GOLD, na, 'rgba(40,30,12,0.95)'); chip(g, 79, 44, '美光', GOLD, na, 'rgba(40,30,12,0.95)');
    glow(g, 21, 31, 12, 'rgba(242,198,107,0.9)', 0.18 * na); glow(g, 79, 31, 12, 'rgba(242,198,107,0.9)', 0.18 * na);
    tx(g, '？', 50, 44.6, 4.2, RED, 'center', 900, SANS, A_(lt, L[4] + 0.1, 0.6));
  };

  // ---------- d1: the starting point ----------
  DRAW.d1 = function (g, lt, L) {
    var ty = 26, xs = [14, 36, 80], i, j;
    var tl = A_(lt, 0.1, 1.0) * 1;
    ln(g, 8, ty, 8 + 84 * eo(pr(lt, 0.2, 1.6)), ty, 'rgba(238,242,248,0.45)', 0.25, null, 1);
    var da = [A_(lt, L[0], 0.5), A_(lt, L[3], 0.5), A_(lt, L[5], 0.5)], yr = ['1978', '1981', '2026'];
    for (i = 0; i < 3; i++) {
      dot(g, xs[i], ty, 1.1, i === 2 ? LEAF : GOLD, da[i]); glow(g, xs[i], ty, 4.5, i === 2 ? 'rgba(98,214,160,0.8)' : 'rgba(242,198,107,0.8)', 0.6 * da[i]);
      tx(g, yr[i], xs[i], ty - 5, 3.2, i === 2 ? LEAF : GOLD, 'center', 900, MONO, da[i]);
    }
    tx(g, '成立', xs[0], ty + 4, 2.0, FG, 'center', 700, SANS, da[0]);
    tx(g, '今天', xs[2], ty - 9.4, 2.0, DIM, 'center', 700, SANS, da[2]);
    // L1: where
    var pa = A_(lt, L[1], 0.6);
    if (pa > 0.01) {
      var px = xs[0], py = 11.6 - 1.0 * (1 - pa);
      g.save(); g.globalAlpha *= pa; g.fillStyle = HOT; g.beginPath(); g.arc(px, py, 1.4, 0, TAU); g.fill();
      g.beginPath(); g.moveTo(px - 1.2, py + 0.7); g.lineTo(px + 1.2, py + 0.7); g.lineTo(px, py + 3.2); g.closePath(); g.fill(); g.restore();
      dot(g, px, py, 0.5, '#2a1208', pa);
      chip(g, px + 44, py + 0.2, '美国 · 爱达荷州 · 博伊西', HOT, pa, 'rgba(50,24,12,0.95)');
    }
    // L2: design consulting
    chip(g, xs[0], 36, '芯片设计咨询', ICE, A_(lt, L[2], 0.6));
    // L3-L4: first fab and memory chips
    var fa = A_(lt, L[3] + 0.1, 0.7);
    fab(g, xs[1] - 3.6, ty - 8.6, 1.2, GOLD, fa, null, 'rgba(242,198,107,0.15)');
    chip(g, xs[1], 36, '第一座晶圆厂', GOLD, fa, 'rgba(40,30,12,0.95)');
    var ca = A_(lt, L[4] + 0.1, 0.7);
    memChip(g, xs[1] - 4, 40.3, 8, 3.6, 'rgba(143,208,255,0.9)', ca, null);
    tx(g, '内存芯片', xs[1] + 8.6, 42.2, 1.9, ICE, 'left', 700, SANS, ca);
    // L5: people
    var cnt = 61 * eo(pr(lt, L[5] + 0.2, 1.8));
    for (j = 0; j < 5; j++) for (i = 0; i < 13; i++) {
      var n = j * 13 + i; if (n >= 61) continue;
      var aa = clamp(cnt - n);
      if (aa > 0.01) dot(g, 66.6 + i * 2.2, 31 + j * 2.2, 0.62, LEAF, aa * 0.85);
    }
    chip(g, 80, 44, '约 6.1 万名员工', LEAF, A_(lt, L[5] + 0.8, 0.6));
  };

  // ---------- d2: what Micron sells ----------
  DRAW.d2 = function (g, lt, L) {
    var a0 = A_(lt, 0.1, 0.8), i;
    // L0: a memory chip in the middle
    var ca = W_(lt, 0.2, L[2] - 0.2, 0.8, 0.5);
    memChip(g, 40, 15, 20, 13, 'rgba(238,242,248,0.9)', ca, '存储');
    chip(g, 50, 34, '存储芯片', GOLD, ca, 'rgba(40,30,12,0.95)');
    // L1: three kinds, always at the bottom afterwards
    var names = [['DRAM', GOLD], ['NAND', ICE], ['NOR', DIM]], xs = [30, 50, 70];
    for (i = 0; i < 3; i++) {
      var aa = A_(lt, L[1] + 0.15 + i * 0.5, 0.6);
      if (aa > 0.01) chip(g, xs[i], 44, names[i][0], names[i][1], aa, 'rgba(20,34,56,0.95)');
    }
    // L2..: revenue and split bar
    var ra = A_(lt, L[2] + 0.1, 0.8);
    if (ra > 0.01) {
      var v = 1330 * eo(pr(lt, L[2] + 0.1, 1.6));
      tx(g, '≈ ' + Math.round(v) + ' 亿美元', 50, 12.2, 5.4, GOLD, 'center', 900, SANS, ra);
      tx(g, '2026 财年收入', 50, 18.4, 2.0, DIM, 'center', 700, SANS, ra);
      var bx = 15, bw = 70, by = 24, bh = 7;
      rbox(g, bx, by, bw, bh, 0.8, 'rgba(238,242,248,0.35)', 0.18, 'rgba(20,34,56,0.9)', ra);
      var d = 0.756 * bw * eo(pr(lt, L[3] + 0.1, 1.4)), n2 = 0.239 * bw * eo(pr(lt, L[4] + 0.1, 1.2));
      if (d > 0.2) rbox(g, bx, by, d, bh, 0.8, null, 0, 'rgba(242,198,107,0.85)', ra);
      if (n2 > 0.2) rbox(g, bx + bw - n2, by, n2, bh, 0.8, null, 0, 'rgba(143,208,255,0.85)', ra);
      if (d > 14) tx(g, 'DRAM 约 3/4', bx + d / 2, by + bh / 2 + 0.1, 2.4, '#2a1c00', 'center', 900, SANS, 1);
      if (n2 > 10) tx(g, 'NAND 约 1/4', bx + bw - n2 / 2 + 0.4, by + bh / 2 + 0.1, 2.0, '#052a3c', 'center', 900, SANS, 1);
    }
  };

  // ---------- d3: DRAM is a desk ----------
  DRAW.d3 = function (g, lt, L) {
    var a0 = A_(lt, 0.1, 0.8), i, j, cols = 10, rows = 4, s = 3.6, sp = 4.7, x0 = 26.5, y0 = 14;
    var offT = L[3] + 0.15;                              // power cut
    var on = lt < offT ? 1 : Math.max(0, 1 - (lt - offT) / 0.25);
    var r = rng(11);
    // the desk
    rbox(g, 21, 35.2, 58, 1.6, 0.5, 'rgba(238,242,248,0.6)', 0.2, 'rgba(120,90,50,0.55)', a0);
    ln(g, 25, 36.8, 25, 44.6, 'rgba(238,242,248,0.5)', 0.4, null, a0); ln(g, 75, 36.8, 75, 44.6, 'rgba(238,242,248,0.5)', 0.4, null, a0);
    chip(g, 50, 7.6, '书桌 = DRAM', GOLD, A_(lt, L[0], 0.6), 'rgba(40,30,12,0.95)');
    var scanX = lt >= L[2] && lt < L[3] + 0.1 ? fr((lt - L[2]) * 1.6) * (cols + 2) - 1 : -9;
    for (j = 0; j < rows; j++) for (i = 0; i < cols; i++) {
      var n = j * cols + i, r1 = r(), r2 = r(), fill = A_(lt, L[1] + 0.05 + (n / 40) * 1.2, 0.3) * (r1 > 0.4 ? 1 : 0);
      var lose = lt >= offT ? clamp((lt - offT - 0.25 - (r2 * 1.3)) / 0.35) : 0;
      var lv = fill * (1 - lose);
      dramCell(g, x0 + i * sp, y0 + j * sp, s, lv, a0);
      if (scanX > -5) { var d = Math.abs(i - scanX); if (d < 1.1) glow(g, x0 + i * sp + s / 2, y0 + j * sp + s / 2, 4, 'rgba(143,208,255,0.9)', 0.6 * (1 - d / 1.1) * a0); }
    }
    pwrLamp(g, 88, 14, on, a0);
    chip(g, 50, 41, '读取很快', ICE, W_(lt, L[2] + 0.1, L[3] - 0.1, 0.5, 0.4));
    chip(g, 50, 41, '断电 → 全部清空', RED, W_(lt, L[3] + 0.5, L[4] - 0.1, 0.5, 0.4), 'rgba(50,16,16,0.95)');
    chip(g, 50, 41, '所以叫“内存”', GOLD, A_(lt, L[4] + 0.2, 0.6), 'rgba(40,30,12,0.95)');
  };

  // ---------- d4: NAND is a bookcase ----------
  DRAW.d4 = function (g, lt, L) {
    var a0 = A_(lt, 0.1, 0.8);
    var offT = L[1] + 0.3, on = lt < offT ? 1 : Math.max(0, 1 - (lt - offT) / 0.25);
    rbox(g, 23, 10.4, 54, 35.4, 0.6, 'rgba(238,242,248,0.5)', 0.22, 'rgba(20,34,56,0.5)', a0);
    bookShelf(g, 24, 10.6, 52, 3, 11.4, lt, 0.3, 2.2, a0, 5);
    chip(g, 50, 6.4, '书柜 = NAND', ICE, A_(lt, L[0], 0.6));
    var rf = 1 - A_(lt, L[4] - 0.2, 0.5);
    pwrLamp(g, 88, 14, on, a0 * rf);
    chip(g, 88, 25, '断电', CRIM, W_(lt, offT, L[4] - 0.2, 0.4, 0.5), 'rgba(50,16,16,0.95)');
    chip(g, 88, 32, '数据还在', LEAF, W_(lt, offT + 0.5, L[4] - 0.2, 0.5, 0.5));
    var w2 = W_(lt, L[2] + 0.1, L[4] - 0.1, 0.6, 0.5);
    chip(g, 11, 22, '容量大', GOLD, w2, 'rgba(40,30,12,0.95)'); chip(g, 11, 29, '更便宜', GOLD, w2 * A_(lt, L[2] + 0.9, 0.5), 'rgba(40,30,12,0.95)');
    var w3 = W_(lt, L[3] + 0.1, L[4] - 0.1, 0.6, 0.5);
    if (w3 > 0.01) {
      var q = eo(pr(lt, L[3] + 0.1, 3.0));
      ln(g, 4, 41, 20, 41, 'rgba(238,242,248,0.3)', 0.3, [0.6, 0.5], w3); dot(g, 4 + 16 * q, 41, 0.9, DIM, w3);
      chip(g, 12, 36.2, '取得慢一些', DIM, w3);
    }
    // phone and SSD
    var pa = A_(lt, L[4] + 0.1, 0.7), sa = A_(lt, L[5] + 0.1, 0.7);
    rbox(g, 5.5, 14, 9, 17, 1.4, 'rgba(238,242,248,0.85)', 0.28, 'rgba(20,34,56,0.95)', pa); rbox(g, 7, 16.4, 6, 11.4, 0.4, null, 0, 'rgba(143,208,255,0.25)', pa);
    chip(g, 10, 35, '手机存储', ICE, pa);
    rbox(g, 82, 14, 13, 8, 0.8, 'rgba(238,242,248,0.85)', 0.28, 'rgba(20,34,56,0.95)', sa);
    rbox(g, 84, 16, 3.6, 3.6, 0.3, null, 0, 'rgba(143,208,255,0.55)', sa); rbox(g, 89, 16, 3.6, 3.6, 0.3, null, 0, 'rgba(143,208,255,0.55)', sa);
    chip(g, 88.5, 26.4, '固态硬盘', ICE, sa);
    ln(g, 15, 22, 23, 22, 'rgba(143,208,255,0.5)', 0.2, [0.5, 0.4], pa); ln(g, 77, 18, 82, 18, 'rgba(143,208,255,0.5)', 0.2, [0.5, 0.4], sa);
  };

  // ---------- d5: shelf -> desk -> processor ----------
  DRAW.d5 = function (g, lt, L) {
    var a0 = A_(lt, 0.1, 0.8), i, ys = 27;
    var big = eio(pr(lt, L[4] + 0.1, 1.2));
    // shelf
    rbox(g, 7, ys - 8, 17, 16, 0.6, 'rgba(238,242,248,0.5)', 0.2, 'rgba(20,34,56,0.5)', a0);
    bookShelf(g, 7.4, ys - 7.8, 16.2, 3, 4.8, lt, 0.1, 0.8, a0, 5);
    // desk
    var dw = mix(18, 28, big), dx = 50 - dw / 2;
    rbox(g, dx, ys + 3, dw, 1.4, 0.4, 'rgba(238,242,248,0.6)', 0.2, 'rgba(120,90,50,0.55)', a0);
    var cc = Math.round(mix(4, 6, big));
    for (i = 0; i < cc * 2; i++) dramCell(g, dx + 1.4 + (i % cc) * (dw - 2.8) / cc, ys - 5 + Math.floor(i / cc) * 4.2, 3.0, 0.6 + 0.4 * Math.sin(lt * 3 + i), a0);
    // processor
    cpuBox(g, 73, ys - 6, 18, 12, a0, 'rgba(238,242,248,0.85)', '处理器');
    var busy = lt < L[1] ? 0 : (lt < L[4] ? 0.6 + 0.4 * Math.sin(lt * 7) : 1);
    if (lt >= L[2]) glow(g, 82, ys, 12, 'rgba(143,208,255,0.9)', (0.14 + 0.10 * Math.sin(lt * 6)) * a0 * (lt < L[4] ? 1 : 1.6));
    // labels
    tx(g, '书柜 · NAND', 15.5, 39.2, 2.0, ICE, 'center', 800, SANS, a0); tx(g, '书桌 · DRAM', 50, 39.2, 2.0, GOLD, 'center', 800, SANS, a0); tx(g, '处理器', 82, 39.2, 2.0, FG, 'center', 800, SANS, a0);
    // arrows and packets
    var fa = W_(lt, L[1] - 0.2, L[3] - 0.2, 0.4, 0.3), ba = W_(lt, L[3] - 0.1, null, 0.4);
    arrow(g, 25.5, ys - 1.6, dx - 1.5, ys - 1.6, 'rgba(143,208,255,0.55)', 0.25, a0 * 0.5, 0.8);
    arrow(g, dx + dw + 1.5, ys - 1.6, 71, ys - 1.6, 'rgba(143,208,255,0.55)', 0.25, a0 * 0.5, 0.8);
    for (i = 0; i < 5; i++) {
      var q = fr(lt * 0.9 + i / 5);
      if (fa > 0.01) {
        dot(g, mix(25.5, dx - 1.5, q), ys - 1.6, 0.55, ICE, fa * Math.sin(q * Math.PI));
        dot(g, mix(dx + dw + 1.5, 71, q), ys - 1.6, 0.55, ICE, fa * Math.sin(q * Math.PI) * (lt > L[2] - 0.2 ? 1 : 0));
      }
      if (ba > 0.01 && lt < L[4]) {
        dot(g, mix(71, dx + dw + 1.5, q), ys + 1.6, 0.55, LEAF, ba * Math.sin(q * Math.PI));
        dot(g, mix(dx - 1.5, 25.5, q), ys + 1.6, 0.55, LEAF, ba * Math.sin(q * Math.PI));
      }
    }
    chip(g, 50, 45, '搬上来', ICE, W_(lt, L[1] + 0.1, L[2] - 0.1, 0.5, 0.4));
    chip(g, 50, 45, '在桌上算', GOLD, W_(lt, L[2] + 0.1, L[3] - 0.1, 0.5, 0.4), 'rgba(40,30,12,0.95)');
    chip(g, 50, 45, '放回去', LEAF, W_(lt, L[3] + 0.1, L[4] - 0.1, 0.5, 0.4));
    chip(g, 50, 45, '桌子越大越快，处理器越不用等', GOLD, A_(lt, L[4] + 0.4, 0.6), 'rgba(40,30,12,0.95)');
  };
