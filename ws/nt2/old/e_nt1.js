  // ================= Newton: scenes n0-n7 (opening, childhood, Cambridge, Euclid, plague year) =================
  // ---------- n0: a baby small enough for a cup -> 84 years -> the rules of the universe ----------
  DRAW.n0 = function (g, lt, L) {
    stars(g, 0.8 * A_(lt, 0, 1.2), lt, 7, 80);
    var p1 = W_(lt, 0.0, L[2] - 0.4, 0.7, 0.6);
    if (p1 > 0.01) {
      halo(g, 50, 30, 16, 'rgba(255,200,120,0.6)', 0.25 * p1);
      var by = 31 - 2.2 * eo(pr(lt, 0.4, 1.2));
      baby(g, 50, by, 1.55, p1 * A_(lt, 0.3, 0.8), lt);
      cup(g, 50, 33, 2.1, p1);
      chip(g, 50, 44.5, '早产', HOT, A_(lt, 1.0, 0.5) * p1, 'rgba(56,24,14,0.95)');
      // a candle that gutters while "nobody thought he would live"
      var c = A_(lt, L[1], 0.5) * p1, fl = 1 - 0.55 * sm(L[1] + 0.3, L[1] + 1.6, lt);
      if (c > 0.01) {
        rbox(g, 71, 30, 2.4, 9, 0.3, null, 0, '#efe6d2', c);
        g.save(); g.globalAlpha *= c * fl; g.fillStyle = '#ffd27a'; g.beginPath(); var fy = 28.6 + Math.sin(lt * 9) * 0.25;
        g.moveTo(72.2, fy - 1.6); g.quadraticCurveTo(73.2, fy, 72.2, fy + 1.0); g.quadraticCurveTo(71.2, fy, 72.2, fy - 1.6); g.fill(); g.restore();
        glow(g, 72.2, 28.6, 6, 'rgba(255,190,100,0.9)', 0.45 * c * fl);
      }
    }
    // 1642 ------------------- 1727 : 84 years
    var p2 = W_(lt, L[2] - 0.2, L[3] - 0.3, 0.6, 0.6);
    if (p2 > 0.01) {
      var q = eio(pr(lt, L[2], 1.6)), x0 = 20, x1 = 80, xe = mix(x0, x1, q);
      ln(g, x0, 30, x1, 30, 'rgba(238,242,248,0.25)', 0.3, null, p2);
      ln(g, x0, 30, xe, 30, GOLD, 0.55, null, p2); glow(g, xe, 30, 3, 'rgba(242,198,107,0.9)', 0.6 * p2);
      dot(g, x0, 30, 0.9, GOLD, p2); dot(g, xe, 30, 0.9, GOLD, p2);
      tx(g, '1642', x0, 25.5, 2.6, FG, 'center', 900, SANS, p2);
      tx(g, '1727', x1, 25.5, 2.6, FG, 'center', 900, SANS, p2 * A_(lt, L[2] + 1.4, 0.4));
      tx(g, Math.round(84 * q) + ' 岁', 50, 36.5, 4.2, GOLD, 'center', 900, SANS, p2);
    }
    // the solar system, running on one rule
    var p3 = A_(lt, L[3] - 0.2, 0.9);
    if (p3 > 0.01) {
      var cx = 50, cy = 29, i, orb = [[7, 2.6, 0.95, '#c9b28a', 0.55], [11, 3.8, 0.62, '#e8c27a', 0.75], [15.5, 5.3, 0.42, '#6fb6ff', 0.85], [21, 7.0, 0.28, '#ff8a6a', 0.7], [28, 9.3, 0.15, '#f2d6a0', 1.4]];
      sunB(g, cx, cy, 2.4, p3, lt);
      for (i = 0; i < orb.length; i++) {
        var o = orb[i];
        ellipsePath(g, cx, cy, o[0], o[1], 'rgba(143,208,255,0.28)', 0.14, p3, eo(pr(lt, L[3] + i * 0.15, 0.8)));
        var th = lt * o[2] + i * 1.7; dot(g, cx + o[0] * Math.cos(th), cy + o[1] * Math.sin(th), o[4] * 0.6, o[3], p3);
      }
      var np = A_(lt, L[4] - 0.1, 0.7);
      newton(g, 84, 46, 15, np, { pose: 'up' }, lt);
    }
  };

  // ---------- n1: Christmas 1642, a stone farmhouse, a father already gone, a mother who leaves ----------
  DRAW.n1 = function (g, lt, L) {
    var A = A_(lt, 0.1, 0.8);
    stars(g, 0.7 * A, lt, 11, 70, 30);
    ground(g, 40, A, '#1a2430', '#0b1018');
    // falling snow
    var r = rng(5), i;
    for (i = 0; i < 50; i++) { var sx = r() * 100, sp = 1.5 + r() * 2, yy = (r() * 50 + lt * sp) % 50 + 4; dot(g, sx + Math.sin(lt + i) * 0.6, yy, 0.12 + r() * 0.12, '#eef2f8', 0.55 * A); }
    var p1 = W_(lt, 0.2, L[1] - 0.2, 0.7, 0.6);
    tx(g, '1642', 50, 22, 8, GOLD, 'center', 900, SANS, p1);
    chip(g, 50, 30.5, '圣诞节 · 英格兰林肯郡', FG, A_(lt, 0.8, 0.6) * p1);
    tx(g, '按当时英国用的旧历；按今天的公历是 1643 年 1 月 4 日', 50, 36, 1.5, DIM, 'center', 600, SANS, A_(lt, 1.2, 0.6) * p1);
    var p2 = A_(lt, L[1] - 0.1, 0.8), ex = L[3] - 0.2;
    var cot = p2 * (1 - 0.6 * A_(lt, ex, 0.8));
    cottage(g, 26, 40, 1.15, cot, true);
    chip(g, 26, 43.5, '伍尔斯索普', GOLD, cot * A_(lt, L[1] + 0.4, 0.5), 'rgba(48,38,12,0.95)');
    baby(g, 26 - 6, 36.4, 0.55, A_(lt, L[2], 0.6) * (1 - A_(lt, ex, 0.6)), lt);
    // the father: a dashed outline that fades
    var fa = W_(lt, L[2] + 0.5, ex, 0.8, 0.6);
    if (fa > 0.01) {
      g.save(); g.globalAlpha *= 0.5; extra(g, 56, 44, 13, fa, { col: 'rgba(160,170,190,0.55)', name: '' }, lt); g.restore();
      tx(g, '父亲', 56, 28.5, 1.9, DIM, 'center', 800, SANS, fa);
      chip(g, 56, 47 - 0.0 - 0, '三个月前去世', DIM, 0, null);
      tx(g, '三个月前去世', 56, 47.0, 1.6, DIM, 'center', 600, SANS, 0);
      tx(g, '1642 年 10 月去世', 56, 25.8, 1.5, DIM, 'center', 600, SANS, fa);
    }
    // age three: mother remarries and moves away; the boy stays with his grandmother
    var p4 = A_(lt, ex, 0.8);
    if (p4 > 0.01) {
      var walk = clamp((lt - L[4]) / 2.4), mx = mix(46, 80, eio(walk));
      cottage(g, 86, 40, 0.85, p4 * A_(lt, L[4], 0.6), true);
      tx(g, '继父家', 86, 24.5, 1.8, DIM, 'center', 800, SANS, p4 * A_(lt, L[4], 0.6));
      mother(g, mx, 44, 12, p4, { walk: walk > 0 && walk < 1 ? lt * 7 : null, flip: false }, lt);
      boy(g, 38, 44, 6.5, p4, { name: '三岁' }, lt);
      granny(g, 31, 44, 11, A_(lt, L[5], 0.7), {}, lt);
      if (lt > L[4] + 0.6) {
        g.save(); g.globalAlpha *= p4 * 0.6 * A_(lt, L[4] + 0.6, 0.6); g.setLineDash([0.6, 0.6]); g.strokeStyle = DIM; g.lineWidth = 0.18;
        g.beginPath(); g.moveTo(41, 38); g.lineTo(mx - 3, 38); g.stroke(); g.restore();
      }
    }
  };

  // ---------- n2: a boy who builds things; sent home to farm; sent back to study ----------
  function windmill(g, x, yb, s, a, lt) {
    if (a <= 0.003) return;
    g.save(); g.globalAlpha *= a; g.fillStyle = '#7a6448'; g.beginPath(); g.moveTo(x - 2 * s, yb); g.lineTo(x - 1.2 * s, yb - 8 * s); g.lineTo(x + 1.2 * s, yb - 8 * s); g.lineTo(x + 2 * s, yb); g.closePath(); g.fill(); g.restore();
    for (var k = 0; k < 4; k++) {
      var t = lt * 1.6 + k * TAU / 4, ex = x + Math.cos(t) * 6 * s, ey = yb - 8 * s + Math.sin(t) * 6 * s;
      ln(g, x, yb - 8 * s, ex, ey, '#d9c9a4', 0.25 * s, null, a);
      g.save(); g.globalAlpha *= a * 0.75; g.fillStyle = '#efe6d2'; g.translate(x, yb - 8 * s); g.rotate(t); g.fillRect(1.6 * s, 0, 4.2 * s, 1.1 * s); g.restore();
    }
    dot(g, x, yb - 8 * s, 0.4 * s, '#3a2c20', a);
  }
  function waterClock(g, x, y, s, a, lt) {
    if (a <= 0.003) return;
    rbox(g, x - 2.2 * s, y - 7 * s, 4.4 * s, 4.4 * s, 0.3, '#9fd0ff', 0.15, 'rgba(60,120,190,0.35)', a);
    rbox(g, x - 2.2 * s, y + 1 * s, 4.4 * s, 5 * s, 0.3, '#9fd0ff', 0.15, 'rgba(20,30,50,0.4)', a);
    var lev = (lt * 0.12) % 1;
    rbox(g, x - 2.0 * s, y + 6 * s - 4.8 * s * lev, 4 * s, 4.8 * s * lev, 0.2, null, 0, 'rgba(90,170,255,0.55)', a);
    var dy = (lt * 3) % 1; dot(g, x, y - 2.4 * s + dy * 3.4 * s, 0.25 * s, '#bfe3ff', a * (1 - dy));
    ln(g, x + 2.9 * s, y + 6 * s, x + 2.9 * s, y + 1 * s, FG, 0.12, null, a);
    for (var k = 0; k < 5; k++) ln(g, x + 2.6 * s, y + 6 * s - k * 1.2 * s, x + 3.3 * s, y + 6 * s - k * 1.2 * s, FG, 0.1, null, a);
  }
  function sheep(g, x, y, s, a, lt, ph) {
    if (a <= 0.003) return;
    var b = Math.abs(Math.sin(lt * 5 + ph)) * 0.25 * s;
    g.save(); g.globalAlpha *= a; g.fillStyle = '#e9e6dc';
    for (var k = 0; k < 5; k++) { g.beginPath(); g.arc(x - 1.6 * s + k * 0.8 * s, y - 1.2 * s - b + (k % 2) * 0.3 * s, 1.0 * s, 0, TAU); g.fill(); }
    g.fillStyle = '#2b2b2b'; g.beginPath(); g.ellipse(x + 2.2 * s, y - 1.3 * s - b, 0.6 * s, 0.75 * s, 0.3, 0, TAU); g.fill();
    g.fillRect(x - 1.2 * s, y - 0.4 * s, 0.3 * s, 1.0 * s); g.fillRect(x + 1.0 * s, y - 0.4 * s, 0.3 * s, 1.0 * s);
    g.restore();
  }
  DRAW.n2 = function (g, lt, L) {
    var i, p1 = W_(lt, 0.1, L[2] - 0.2, 0.7, 0.6);
    if (p1 > 0.01) {
      ground(g, 42, p1, '#1e2430', '#0c1018');
      // a market town street; the apothecary's shop with bottles in the window
      for (i = 0; i < 5; i++) { var hx = 8 + i * 9, hh = 9 + (i % 3) * 2; rbox(g, hx, 42 - hh, 8, hh, 0.2, null, 0, i === 2 ? '#4c4256' : '#363d4c', p1); }
      rbox(g, 55, 26, 22, 16, 0.3, null, 0, '#4f3f33', p1);
      rbox(g, 57, 29, 18, 7, 0.3, 'rgba(242,198,107,0.5)', 0.15, 'rgba(255,210,140,0.18)', p1);
      var cols = ['#7fe0a0', '#ff9d6e', '#8fd0ff', '#c9b8ff', '#ffd36b'];
      for (i = 0; i < 5; i++) { rbox(g, 58.4 + i * 3.4, 31.6, 1.6, 3.6, 0.5, null, 0, cols[i], p1 * 0.85); dot(g, 59.2 + i * 3.4, 31.2, 0.45, cols[i], p1 * 0.85); }
      chip(g, 66, 27, '药剂师家', GOLD, A_(lt, L[1], 0.6) * p1, 'rgba(48,38,12,0.95)');
      chip(g, 27, 27, '格兰瑟姆镇', FG, A_(lt, L[0] + 0.4, 0.6) * p1);
      boy(g, 47, 44, 9, p1 * A_(lt, L[0] + 0.3, 0.6), { name: '12 岁', walk: lt < L[1] ? lt * 7 : null, prop: 'case' }, lt);
    }
    // things he made
    var p2 = W_(lt, L[2] - 0.1, L[5] - 0.3, 0.7, 0.6);
    if (p2 > 0.01) {
      var night = A_(lt, L[4] - 0.2, 0.8);
      stars(g, p2 * night * 0.8, lt, 12, 60, 30);
      ground(g, 42, p2, '#1d2a22', '#0b1210');
      windmill(g, 20, 41, 1.1, p2 * A_(lt, L[3], 0.6), lt);
      chip(g, 20, 45, '风车', FG, p2 * A_(lt, L[3] + 0.2, 0.5));
      waterClock(g, 48, 30, 1.0, p2 * A_(lt, L[3] + 0.9, 0.6), lt);
      chip(g, 48, 45, '水钟', FG, p2 * A_(lt, L[3] + 1.1, 0.5));
      var ka = p2 * A_(lt, L[4], 0.6), kx = 78 + Math.sin(lt * 0.9) * 2, ky = 20 + Math.sin(lt * 1.3) * 1.2;
      if (ka > 0.01) {
        g.save(); g.globalAlpha *= ka; g.fillStyle = '#c8a46a'; g.beginPath(); g.moveTo(kx, ky - 4); g.lineTo(kx + 3, ky); g.lineTo(kx, ky + 4.5); g.lineTo(kx - 3, ky); g.closePath(); g.fill(); g.restore();
        ln(g, kx, ky + 4.5, 70, 41, 'rgba(238,242,248,0.5)', 0.12, null, ka);
        dot(g, kx, ky + 6.4, 0.6, '#ffd27a', ka); glow(g, kx, ky + 6.4, 4, 'rgba(255,190,100,0.9)', 0.6 * ka * night);
        chip(g, 82, 45, '带灯笼的风筝', GOLD, ka * A_(lt, L[4] + 0.3, 0.5), 'rgba(48,38,12,0.95)');
        boy(g, 68, 44, 8, ka, { name: '', pose: 'up' }, lt);
      }
    }
    // back to the farm: sheep wander while he reads
    var p3 = W_(lt, L[5] - 0.2, L[7] - 0.2, 0.7, 0.6);
    if (p3 > 0.01) {
      ground(g, 36, p3, '#22412c', '#0f1d14');
      cottage(g, 16, 36, 0.8, p3, false);
      for (i = 0; i < 4; i++) sheep(g, 50 + i * 8 + (lt - L[6]) * (i % 2 ? 1.4 : 0.9) * (lt > L[6] ? 1 : 0), 41 + (i % 2) * 2.5, 1.0, p3 * A_(lt, L[6], 0.6), lt, i);
      boy(g, 32, 44, 9.5, p3, { name: '', pose: 'book', prop: 'book' }, lt);
      chip(g, 32, 30, '回家种地', FG, A_(lt, L[5] + 0.3, 0.5) * p3);
    }
    // a teacher and an uncle persuade his mother
    var p4 = A_(lt, L[7] - 0.2, 0.7);
    if (p4 > 0.01) {
      extra(g, 24, 44, 12, p4, { name: '老师', col: '#a7c4e8' }, lt);
      extra(g, 34, 44, 12, p4, { name: '舅舅', col: '#bfe3c6' }, lt);
      mother(g, 46, 44, 12, p4, {}, lt);
      arrow(g, 54, 33, 70, 33, GOLD, 0.35, A_(lt, L[7] + 0.8, 0.6), 1.1);
      chip(g, 80, 33, '去读大学', GOLD, A_(lt, L[7] + 1.0, 0.5), 'rgba(48,38,12,0.95)');
    }
  };

  // ---------- n3: Trinity College, a sizar, a notebook of new ideas ----------
  DRAW.n3 = function (g, lt, L) {
    var i, p1 = W_(lt, 0.1, L[3] - 0.2, 0.7, 0.6);
    if (p1 > 0.01) {
      ground(g, 42, p1, '#1e2430', '#0c1018');
      // a college gate: two towers and an arch
      g.save(); g.globalAlpha *= p1; g.fillStyle = '#5b4a3e';
      g.fillRect(36, 18, 7, 24); g.fillRect(57, 18, 7, 24); g.fillRect(43, 24, 14, 18);
      for (i = 0; i < 4; i++) { g.fillRect(36 + i * 2, 16.6, 1.2, 1.6); g.fillRect(57 + i * 2, 16.6, 1.2, 1.6); }
      g.fillStyle = '#16120f'; g.beginPath(); g.moveTo(46, 42); g.lineTo(46, 31); g.quadraticCurveTo(50, 26.5, 54, 31); g.lineTo(54, 42); g.closePath(); g.fill();
      g.restore();
      tx(g, '1661', 50, 13, 4, GOLD, 'center', 900, SANS, A_(lt, 0.3, 0.6) * p1);
      chip(g, 50, 21, '剑桥 · 三一学院', FG, A_(lt, 0.8, 0.6) * p1);
      var sz = A_(lt, L[1], 0.6) * p1;
      chip(g, 18, 22, '减费生', GOLD, sz, 'rgba(48,38,12,0.95)');
      // carrying things for others
      var w = clamp((lt - L[2]) / 2.8);
      newton(g, mix(14, 30, w), 44, 11, sz, { name: '', walk: w > 0 && w < 1 ? lt * 7 : null, prop: 'case' }, lt);
      extra(g, 80, 44, 12, A_(lt, L[2] + 0.4, 0.6) * p1, { name: '同学', col: '#8e97a8', pose: 'forward' }, lt);
      tx(g, '干杂活，抵学费', 18, 27, 1.7, DIM, 'center', 700, SANS, A_(lt, L[2] + 0.3, 0.5) * p1);
    }
    var p2 = A_(lt, L[3] - 0.1, 0.7);
    if (p2 > 0.01) {
      var old = p2 * (1 - 0.55 * A_(lt, L[4], 0.8));
      bookB(g, 26, 29, 15, 19, old, '#4a3a2c', '旧课本');
      tx(g, '两千年前的那一套', 26, 41.5, 1.7, DIM, 'center', 700, SANS, old);
      // the notebook
      var nb = A_(lt, L[4], 0.6);
      bookB(g, 72, 18, 15, 22, nb, null, null, true);
      var names = ['笛卡尔', '伽利略', '开普勒'];
      for (i = 0; i < 3; i++) {
        var a2 = A_(lt, L[5] + 0.4 + i * 0.55, 0.4);
        tx(g, names[i], 64.5, 22 + i * 5.5, 2.0, '#3a2a1a', 'center', 800, SANS, a2 * nb);
        scribble(g, 74, 21 + i * 5.5, 11, 2, nb, lt, L[5] + 0.5 + i * 0.55, 3 + i);
      }
      quill(g, 86, 38, 1.2, nb * A_(lt, L[5], 0.4), -0.5 + 0.08 * Math.sin(lt * 6));
      newton(g, 47, 45, 12, nb, { name: '', pose: 'book' }, lt);
    }
  };

  // ---------- n4: the fair, the astrology book, Euclid tossed aside, Barrow's exam, Euclid again ----------
  function stall(g, x, yb, w, a, col) {
    rbox(g, x - w / 2, yb - 5, w, 5, 0.2, null, 0, '#4a3a2c', a);
    g.save(); g.globalAlpha *= a; g.fillStyle = col; g.beginPath(); g.moveTo(x - w / 2 - 0.8, yb - 5); g.lineTo(x, yb - 9.5); g.lineTo(x + w / 2 + 0.8, yb - 5); g.closePath(); g.fill(); g.restore();
  }
  function euclidFig(g, x, y, s, a, lt, t0) {     // the right triangle with a square on each side (proposition 47)
    if (a <= 0.003) return;
    var A = [x - 3 * s, y + 2 * s], B = [x + 3 * s, y + 2 * s], C = [x - 3 * s + 6 * s * 0.36, y + 2 * s - 6 * s * 0.48];
    var q = eo(pr(lt, t0, 1.2));
    g.save(); g.globalAlpha *= a; g.strokeStyle = '#3a2a1a'; g.lineWidth = 0.22;
    g.beginPath(); g.moveTo(A[0], A[1]); g.lineTo(B[0], B[1]); g.lineTo(C[0], C[1]); g.closePath(); g.stroke();
    g.globalAlpha *= q; g.strokeStyle = 'rgba(58,42,26,0.7)';
    g.strokeRect(A[0], A[1], 6 * s, 6 * s * 0.45);
    g.restore();
  }
  DRAW.n4 = function (g, lt, L) {
    var i, p1 = W_(lt, 0.1, L[3] - 0.2, 0.7, 0.6);
    if (p1 > 0.01) {
      ground(g, 40, p1, '#26302a', '#0f1612');
      var cs = ['#b4483a', '#3a6fb4', '#c9a43a', '#4a9a5a'];
      for (i = 0; i < 4; i++) stall(g, 12 + i * 11, 40, 8, p1 * A_(lt, 0.2 + i * 0.15, 0.5), cs[i]);
      chip(g, 76, 12, '1663 · 剑桥附近的集市', GOLD, A_(lt, 0.5, 0.6) * p1, 'rgba(48,38,12,0.95)');
      newton(g, 56, 44, 11, p1 * A_(lt, L[1] - 0.3, 0.6), { name: '', pose: 'book' }, lt);
      // the astrology book with a chart he cannot read
      var ab = A_(lt, L[1], 0.6) * p1;
      if (ab > 0.01) {
        rbox(g, 66, 16, 26, 24, 0.5, 'rgba(242,198,107,0.4)', 0.15, 'rgba(14,18,30,0.95)', ab);
        tx(g, '占星书', 79, 18.8, 1.8, GOLD, 'center', 800, SANS, ab);
        ring(g, 79, 29, 7.5, 'rgba(242,198,107,0.6)', 0.15, ab); ring(g, 79, 29, 5, 'rgba(242,198,107,0.4)', 0.12, ab);
        for (i = 0; i < 12; i++) { var t = i / 12 * TAU; ln(g, 79 + Math.cos(t) * 5, 29 + Math.sin(t) * 5, 79 + Math.cos(t) * 7.5, 29 + Math.sin(t) * 7.5, 'rgba(242,198,107,0.5)', 0.1, null, ab); }
        ln(g, 72, 34, 86, 23, ICE, 0.18, [0.5, 0.4], ab); ln(g, 74, 22, 85, 35, ICE, 0.18, [0.5, 0.4], ab);
        var qm = A_(lt, L[2] + 0.3, 0.5) * ab;
        tx(g, '?', 79, 29.4, 6, HOT, 'center', 900, SANS, qm);
        chip(g, 79, 43.2, '要用三角学', HOT, A_(lt, L[2] + 0.9, 0.5) * ab, 'rgba(56,24,14,0.95)');
      }
    }
    // Euclid: too easy, thrown aside, jump to new geometry
    var p2 = W_(lt, L[3] - 0.1, L[7] - 0.2, 0.7, 0.6);
    if (p2 > 0.01) {
      var toss = eio(pr(lt, L[5] + 0.4, 0.9)), bx = mix(32, 17, toss), by = mix(31, 35, toss), rot = -0.45 * toss, sc = mix(1, 0.7, toss);
      g.save(); g.translate(bx, by); g.rotate(rot); g.scale(sc, sc); g.translate(-bx, -by);
      rbox(g, bx - 11, by - 8, 22, 16, 0.4, null, 0, 'rgba(236,226,204,0.95)', p2);
      tx(g, '几何原本', bx, by - 5.6, 1.9, '#3a2a1a', 'center', 900, SANS, p2);
      euclidFig(g, bx, by + 0.6, 1.6, p2, lt, L[4]);
      g.restore();
      var chk = A_(lt, L[4] + 0.4, 0.5) * (1 - toss);
      tx(g, '太简单', 32, 43.2, 2.0, HOT, 'center', 800, SANS, chk * p2);
      // the harder, newer geometry: a curve on axes
      var ng = A_(lt, L[6], 0.7) * p2;
      if (ng > 0.01) {
        rbox(g, 56, 13, 32, 26, 0.5, 'rgba(143,208,255,0.4)', 0.15, 'rgba(14,22,36,0.95)', ng);
        tx(g, '新几何（笛卡尔）', 72, 15.8, 1.7, ICE, 'center', 800, SANS, ng);
        ln(g, 60, 35, 85, 35, DIM, 0.15, null, ng); ln(g, 61, 36, 61, 18, DIM, 0.15, null, ng);
        g.save(); g.globalAlpha *= ng; g.strokeStyle = GOLD; g.lineWidth = 0.3; g.beginPath();
        var qn = eo(pr(lt, L[6] + 0.3, 1.2));
        for (i = 0; i <= 40 * qn; i++) { var u = i / 40, px = 61 + u * 22, py = 35 - 15 * u * u; if (i === 0) g.moveTo(px, py); else g.lineTo(px, py); }
        g.stroke(); g.restore();
        tx(g, 'y = x²', 68, 21, 2.0, GOLD, 'center', 700, SANS, ng * qn);
        arrow(g, 40, 22, 54, 22, GOLD, 0.3, ng, 1.0);
        tx(g, '跳过去', 47, 19.5, 1.6, GOLD, 'center', 700, SANS, ng);
      }
    }
    // the scholarship exam
    var p3 = W_(lt, L[7] - 0.1, L[9] - 0.2, 0.7, 0.6);
    if (p3 > 0.01) {
      tx(g, '1664 · 奖学金考试', 78, 12, 2.4, GOLD, 'center', 900, SANS, p3);
      barrow(g, 30, 44, 13, p3 * A_(lt, L[8] - 0.4, 0.6), { pose: 'forward' }, lt);
      newton(g, 66, 44, 12, p3, { name: '', pose: 'down' }, lt);
      var qb = A_(lt, L[8] + 0.2, 0.5) * p3;
      rbox(g, 38, 19, 20, 8, 0.6, 'rgba(143,208,255,0.6)', 0.15, 'rgba(14,22,36,0.95)', qb);
      tx(g, '欧几里得？', 48, 23.2, 2.0, ICE, 'center', 800, SANS, qb);
      var x = A_(lt, L[8] + 1.2, 0.4) * p3;
      bigX(g, 66, 26, 3.5, x);
      tx(g, '答得很差', 66, 19.5, 2.0, HOT, 'center', 800, SANS, x);
    }
    // reading Euclid again, proposition by proposition
    var p4 = A_(lt, L[9] - 0.1, 0.7);
    if (p4 > 0.01) {
      bookB(g, 50, 19, 20, 26, p4, null, null, true);
      tx(g, '几何原本', 40, 22, 1.8, '#3a2a1a', 'center', 900, SANS, p4);
      var n = Math.min(10, Math.floor(clamp((lt - L[9] - 0.3) / 2.6) * 10));
      for (i = 0; i < 10; i++) {
        var a3 = A_(lt, L[9] + 0.3 + i * 0.26, 0.25) * p4, col = i < 5 ? 0 : 1, yy = 25.5 + (i % 5) * 3.7, xx = col ? 52 : 32;
        tx(g, '命题 ' + (i < 9 ? i + 1 : 47), xx, yy, 1.6, '#3a2a1a', 'left', 700, SANS, a3);
        tx(g, '✓', xx + 13, yy, 1.8, '#2f8a4a', 'left', 900, SANS, a3 * A_(lt, L[9] + 0.5 + i * 0.26, 0.2));
      }
      newton(g, 82, 45, 12, p4, { name: '', pose: 'book', prop: 'book' }, lt);
      chip(g, 50, 49.5, '一条一条，不再跳', GOLD, A_(lt, L[10], 0.6), 'rgba(48,38,12,0.95)');
    }
  };

  // ---------- n5: 1665, the plague, home for almost two years ----------
  DRAW.n5 = function (g, lt, L) {
    var i, p1 = W_(lt, 0.1, L[2] - 0.2, 0.7, 0.6);
    if (p1 > 0.01) {
      ground(g, 40, p1, '#1b1f28', '#0b0d12');
      for (i = 0; i < 12; i++) {
        var hx = 4 + i * 8, hh = 8 + ((i * 37) % 7);
        rbox(g, hx, 40 - hh, 7, hh, 0.1, null, 0, '#2c3140', p1);
        g.save(); g.globalAlpha *= p1; g.fillStyle = '#2c3140'; g.beginPath(); g.moveTo(hx - 0.4, 40 - hh); g.lineTo(hx + 3.5, 40 - hh - 3); g.lineTo(hx + 7.4, 40 - hh); g.closePath(); g.fill(); g.restore();
        if (i % 3 === 1) { var ca = A_(lt, 0.8 + i * 0.12, 0.4) * p1; ln(g, hx + 2, 34.5, hx + 5, 37.5, '#d43a3a', 0.4, null, ca); ln(g, hx + 5, 34.5, hx + 2, 37.5, '#d43a3a', 0.4, null, ca); }
      }
      chip(g, 76, 12, '1665 · 伦敦大瘟疫', HOT, A_(lt, 0.3, 0.6) * p1, 'rgba(56,24,14,0.95)');
      tx(g, '门上的红十字：这家有人染病', 50, 45.5, 1.5, DIM, 'center', 600, SANS, A_(lt, 1.3, 0.5) * p1 * (1 - A_(lt, L[1], 0.4)));
      var cl = A_(lt, L[1] + 0.4, 0.5) * p1;
      rbox(g, 30, 22, 40, 9, 0.6, 'rgba(255,107,107,0.7)', 0.2, 'rgba(40,14,14,0.95)', cl);
      tx(g, '剑桥大学：暂时关闭', 50, 26.6, 2.4, '#ffb0a0', 'center', 900, SANS, cl);
    }
    var p2 = A_(lt, L[2] - 0.1, 0.8);
    if (p2 > 0.01) {
      var night = 0.5 + 0.5 * Math.cos(lt * 0.9);
      stars(g, p2 * 0.8, lt, 21, 70, 30);
      hills(g, p2, 38, '#16261d'); ground(g, 41, p2);
      cottage(g, 50, 41, 1.6, p2, true);
      glow(g, 50 - 8.3, 41 - 8.5, 5, 'rgba(255,200,120,0.9)', 0.4 * p2 * A_(lt, L[4], 0.8));
      var dd = Math.min(660, Math.round(660 * clamp((lt - L[2]) / ((L[5] - L[2]) || 1))));
      tx(g, '第 ' + dd + ' 天', 84, 20, 2.6, FG, 'center', 900, SANS, p2 * A_(lt, L[2] + 0.4, 0.5));
      tx(g, '1665 年夏 → 1667 年春', 84, 24.4, 1.5, DIM, 'center', 600, SANS, p2 * A_(lt, L[2] + 0.4, 0.5));
      var al = A_(lt, L[3], 0.6) * p2;
      tx(g, '没有老师', 16, 30, 2.0, DIM, 'center', 800, SANS, al); tx(g, '没有同学', 16, 34.2, 2.0, DIM, 'center', 800, SANS, al * A_(lt, L[3] + 0.6, 0.5));
      newton(g, 70, 46, 10, A_(lt, L[4], 0.6) * p2, { name: '牛顿 · 22 岁' }, lt);
      chip(g, 68, 14, '奇迹年', GOLD, A_(lt, L[5] + 0.2, 0.6), 'rgba(48,38,12,0.95)');
    }
  };

  // ---------- n6: the speed at an instant (secant -> tangent) ----------
  DRAW.n6 = function (g, lt, L) {
    var i, A = A_(lt, 0.1, 0.7);
    var X0 = 22, Y0 = 44, W = 46, H = 28;
    function S(u) { return u * u; }                      // distance grows like t^2: a falling stone
    function P(u) { return [X0 + u * W, Y0 - S(u) * H]; }
    ln(g, X0, Y0, X0 + W + 3, Y0, DIM, 0.2, null, A); ln(g, X0, Y0, X0, Y0 - H - 3, DIM, 0.2, null, A);
    tx(g, '时间', X0 + W + 4, Y0 + 1.6, 1.6, DIM, 'center', 700, SANS, A); tx(g, '路程', X0 - 3, Y0 - H - 2, 1.6, DIM, 'center', 700, SANS, A);
    g.save(); g.globalAlpha *= A; g.strokeStyle = ICE; g.lineWidth = 0.35; g.beginPath();
    var qc_ = eo(pr(lt, 0.3, 1.2));
    for (i = 0; i <= 60 * qc_; i++) { var p = P(i / 60); if (i === 0) g.moveTo(p[0], p[1]); else g.lineTo(p[0], p[1]); }
    g.stroke(); g.restore();
    // a stone falling alongside, so the curve has something to mean
    var u0 = 0.5, ph = (lt * 0.35) % 1;
    dot(g, 93, 14 + 30 * ph * ph, 0.9, FG, A * 0.85);
    tx(g, '下落的石头', 93, 46, 1.5, DIM, 'center', 600, SANS, A);
    var sec = A_(lt, L[2] - 0.2, 0.6);
    var shrink = eio(pr(lt, L[3], (L[5] - L[3]) * 0.9)), du = mix(0.45, 0.004, shrink);
    var pa = P(u0), pb = P(u0 + du), slope = (pb[1] - pa[1]) / (pb[0] - pa[0]);
    if (sec > 0.01) {
      var ex = 9;
      ln(g, pa[0] - ex, pa[1] - slope * ex, pb[0] + ex, pb[1] + slope * ex, shrink > 0.97 ? GOLD : HOT, 0.3, null, sec);
      dot(g, pa[0], pa[1], 0.75, GOLD, sec); dot(g, pb[0], pb[1], 0.75, HOT, sec * (1 - sm(0.9, 1, shrink)));
      ln(g, pa[0], Y0, pb[0], Y0, HOT, 0.6, null, sec * (1 - sm(0.9, 1, shrink)));
      tx(g, 'Δt', (pa[0] + pb[0]) / 2, Y0 + 2, 1.6, HOT, 'center', 800, SANS, sec * (1 - sm(0.8, 0.95, shrink)));
      var lab = shrink > 0.97 ? '这一刻的速度' : '平均速度';
      chip(g, 81, 26, lab, shrink > 0.97 ? GOLD : HOT, sec, shrink > 0.97 ? 'rgba(48,38,12,0.95)' : 'rgba(56,24,14,0.95)');
      tx(g, 'Δt = ' + (du * 2).toFixed(du < 0.05 ? 3 : 2) + ' 秒', 81, 31.5, 1.7, FG, 'center', 700, SANS, sec * A_(lt, L[3], 0.5));
    }
    var nm = A_(lt, L[6], 0.6);
    chip(g, 81, 40, '流数术 → 微积分', GOLD, nm, 'rgba(48,38,12,0.95)');
    tx(g, '第一个问题', 34, 14.5, 2.0, FG, 'center', 800, SANS, 0 * A_(lt, 0.2, 0.5) * (1 - A_(lt, L[2], 0.5)));
  };

  // ---------- n7: the apple, falling toward the centre of the Earth; up to the Moon? ----------
  DRAW.n7 = function (g, lt, L) {
    var i, A = A_(lt, 0.1, 0.7);
    var p1 = W_(lt, 0.1, L[4] - 0.2, 0.7, 0.6);
    if (p1 > 0.01) {
      stars(g, 0.5 * p1, lt, 31, 50, 25);
      ground(g, 41, p1, '#22412c', '#0f1d14');
      tree(g, 30, 41, 1.25, p1, lt, [[-6, -13], [5, -15.5], [2, -20]]);
      // years later, telling the story over tea
      var rm = A_(lt, L[1], 0.6) * p1 * (1 - A_(lt, L[2] - 0.2, 0.5));
      newton(g, 62, 44, 12, rm, { old: true, name: '晚年的牛顿' }, lt);
      extra(g, 76, 44, 12, rm, { name: '老朋友', col: '#a7c4e8' }, lt);
      tx(g, '1726 年', 69, 25.5, 1.8, DIM, 'center', 700, SANS, rm);
      // the apple falls (from the branch at (36, 22.3))
      var tf = lt - (L[2] + 0.5), ax = 30 + 6 * 1.25, ay0 = 41 - 15.5 * 1.25 + 0.0;
      var ay = tf < 0 ? ay0 : Math.min(40.2, ay0 + 9.8 * 1.6 * tf * tf);
      if (lt > L[2] - 0.3) {
        newton(g, 46, 44, 11, A_(lt, L[2] - 0.3, 0.5) * p1, { name: '23 岁', pose: 'book' }, lt);
        apple(g, ax, ay, 1.1, p1, tf > 0 ? Math.min(1.4, tf * 2) : 0);
        if (tf > 0 && ay < 40.2) for (i = 1; i < 5; i++) dot(g, ax, ay - i * 1.0, 0.25, 'rgba(255,140,120,0.6)', p1 * (1 - i / 5));
      }
      var ar = A_(lt, L[3] + 0.3, 0.5) * p1;
      arrow(g, ax + 4, 20, ax + 4, 39, GOLD, 0.35, ar, 1.1);
      tx(g, '总是垂直往下', ax + 13, 30, 1.9, GOLD, 'center', 800, SANS, ar);
    }
    // toward the centre of the Earth
    var p2 = W_(lt, L[4] - 0.1, L[6] - 0.2, 0.7, 0.6);
    if (p2 > 0.01) {
      earthB(g, 50, 32, 9, p2, lt);
      for (i = 0; i < 8; i++) {
        var t = i / 8 * TAU + 0.3, r0 = 18, r1 = 10.5, fall = ((lt - L[4]) * 0.6 + i * 0.13) % 1;
        var rr = mix(r0, r1, fall);
        apple(g, 50 + Math.cos(t) * rr, 32 + Math.sin(t) * rr * 0.8, 0.75, p2 * A_(lt, L[4] + i * 0.08, 0.4));
        arrow(g, 50 + Math.cos(t) * 16, 32 + Math.sin(t) * 16 * 0.8, 50 + Math.cos(t) * 12, 32 + Math.sin(t) * 12 * 0.8, 'rgba(242,198,107,0.7)', 0.2, p2, 0.7);
      }
      chip(g, 50, 32, '地心', GOLD, p2 * A_(lt, L[4] + 0.6, 0.4), 'rgba(48,38,12,0.95)');
      var myth = A_(lt, L[5], 0.5) * p2;
      if (myth > 0.01) {
        rbox(g, 70, 15, 24, 13, 0.6, 'rgba(255,107,107,0.6)', 0.18, 'rgba(30,14,14,0.95)', myth);
        apple(g, 82, 18.2, 1, myth); tx(g, '砸到头？', 82, 24.6, 2.0, '#ffb0a0', 'center', 800, SANS, myth);
        bigX(g, 82, 18.4, 2.4, A_(lt, L[5] + 0.6, 0.3) * p2);
        tx(g, '后人加的', 82, 30.5, 1.6, DIM, 'center', 700, SANS, A_(lt, L[5] + 0.8, 0.4) * p2);
      }
    }
    // reach all the way to the Moon?
    var p3 = A_(lt, L[6] - 0.1, 0.8);
    if (p3 > 0.01) {
      stars(g, 0.8 * p3, lt, 41, 80);
      earthB(g, 18, 38, 6.5, p3, lt);
      tree(g, 18, 31.6, 0.35, p3, lt, null);
      apple(g, 18, 29.3, 0.6, p3);
      moonB(g, 84, 17, 2.6, p3 * A_(lt, L[6] + 0.3, 0.6));
      var reach = eio(pr(lt, L[7] - 0.1, 1.6));
      g.save(); g.globalAlpha *= p3; g.setLineDash([0.8, 0.7]); g.lineDashOffset = -lt * 3; g.strokeStyle = GOLD; g.lineWidth = 0.3;
      g.beginPath(); g.moveTo(22, 34.5); g.lineTo(mix(22, 81.5, reach), mix(34.5, 18.6, reach)); g.stroke(); g.restore();
      tx(g, '同一股力？', 52, 22, 2.6, GOLD, 'center', 900, SANS, A_(lt, L[7] + 1.2, 0.6));
    }
  };
