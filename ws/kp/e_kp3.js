  // ================= Kepler: scenes k13-k18 (mother, third law, old age, death, Newton) =================
  // ---------- k13: 1615, the accusation ----------
  DRAW.k13 = function (g, lt, L) {
    var i, A = A_(lt, 0.1, 0.7), p1 = W_(lt, 0.1, L[4] - 0.2, 0.7, 0.6);
    if (p1 > 0.01) {
      ground(g, 42, p1, '#232733', '#0d0f15');
      tx(g, '1615', 50, 14, 3.4, GOLD, 'center', 900, SANS, p1);
      katharina(g, 34, 45, 11, p1, { name: '卡塔琳娜' }, lt);
      extra(g, 70, 45, 12, A_(lt, L[1], 0.5) * p1, { name: '邻居', col: '#b4a090', pose: 'forward', flip: true }, lt);
      var bw = A_(lt, L[2], 0.5) * p1;
      g.save(); g.globalAlpha *= bw; g.fillStyle = '#6a4a2a'; g.beginPath(); g.moveTo(47, 30); g.lineTo(55, 30); g.quadraticCurveTo(54, 35, 51, 35); g.quadraticCurveTo(48, 35, 47, 30); g.fill();
      g.fillStyle = '#3e5a2a'; g.beginPath(); g.ellipse(51, 30.2, 4, 0.7, 0, 0, TAU); g.fill(); g.restore();
      for (i = 0; i < 3; i++) { var ph = (lt * 0.6 + i / 3) % 1; ln(g, 50 + i, 29 - ph * 4, 50.5 + i, 28 - ph * 4, 'rgba(160,200,120,0.6)', 0.2, null, bw * (1 - ph)); }
      tx(g, '一碗苦药', 51, 25, 1.7, FG, 'center', 800, SANS, bw);
      tx(g, '“喝了就病了”', 70, 26, 1.7, '#ffb8a8', 'center', 800, SANS, A_(lt, L[3], 0.5) * p1);
    }
    var p2 = A_(lt, L[4] - 0.1, 0.8);
    if (p2 > 0.01) {
      // a dark square, a faint fire on the horizon
      ground(g, 42, p2, '#1c1a20', '#0a0a0d');
      flame(g, 80, 42, 8, 10, lt, 0.55 * p2, 3);
      for (i = 0; i < 7; i++) extra(g, 50 + i * 4, 45, 7, p2 * 0.5, { name: '', col: '#4e5464' }, lt);
      tx(g, '烧死女巫的年代', 30, 20, 2.2, HOT, 'center', 900, SANS, A_(lt, L[4], 0.5) * p2 * (1 - A_(lt, L[5] - 0.2, 0.4)));
      tx(g, '那几十年，德意志各地处死了数以千计的“女巫”', 30, 25, 1.4, DIM, 'center', 600, SANS, A_(lt, L[4] + 0.6, 0.5) * p2 * (1 - A_(lt, L[5], 0.5)));
      var bk = A_(lt, L[5], 0.6);
      bookB(g, 24, 32, 10, 13, bk, '#2a2a4a', ''); tx(g, '梦', 24.5, 32, 2.6, '#f2dfb0', 'center', 900, SANS, bk);
      ln(g, 30, 32, 38, 34, 'rgba(255,107,107,0.6)', 0.25, [0.6, 0.5], bk); katharina(g, 42, 45, 10, bk, { name: '' }, lt);
      tx(g, '有人说写的就是她', 33, 22, 1.7, '#ffb8a8', 'center', 800, SANS, A_(lt, L[6], 0.5));
    }
  };

  // ---------- k14: the defense; chains; "I have nothing to confess"; release ----------
  DRAW.k14 = function (g, lt, L) {
    var i, p1 = W_(lt, 0.1, L[2] - 0.2, 0.7, 0.6);
    if (p1 > 0.01) {
      rbox(g, 30, 34, 40, 2, 0.3, null, 0, '#5a3e2a', p1);
      kepler(g, 26, 45, 12, p1, { pose: 'book' }, lt);
      var n = Math.floor(clamp((lt - L[1]) / 2.4) * 9);
      for (i = 0; i < n; i++) paper(g, 46 + Math.sin(i * 2.1) * 0.6, 33.4 - i * 0.4, 12, 0.6, p1);
      quill(g, 58, 33, 1.1, p1, -0.6 + 0.1 * Math.sin(lt * 7));
      chip(g, 62, 18, '放下研究', FG, A_(lt, L[0] + 0.3, 0.5) * p1);
      chip(g, 62, 24, '请教法学家 · 写辩护', GOLD, A_(lt, L[1], 0.5) * p1, 'rgba(48,38,12,0.95)');
    }
    var p2 = W_(lt, L[2] - 0.1, L[7] - 0.3, 0.7, 0.6);
    if (p2 > 0.01) {
      tx(g, '1620 年 8 月', 24, 16, 2.0, GOLD, 'center', 800, SANS, p2);
      // a cell: bars in front of her (bars drawn after the figure)
      rbox(g, 34, 14, 32, 31, 0.3, null, 0, 'rgba(30,28,34,0.9)', p2);
      katharina(g, 50, 44, 12, p2, { name: '72 岁' }, lt);
      var ch = A_(lt, L[3], 0.5) * p2;
      for (i = 0; i < 6; i++) ring(g, 46 + i * 1.6, 42.5 + Math.sin(i) * 0.3, 0.6, '#9aa7ba', 0.25, ch);
      for (i = 0; i < 7; i++) ln(g, 35 + i * 5, 14, 35 + i * 5, 45, '#6e7688', 0.6, null, p2);
      ln(g, 34, 14, 66, 14, '#6e7688', 0.8, null, p2);
      var d = Math.min(405, Math.round(405 * clamp((lt - L[3]) / 2.2)));
      tx(g, '第 ' + d + ' 天', 80, 22, 2.4, FG, 'center', 900, SANS, ch);
      tx(g, '约 14 个月', 80, 27, 1.6, DIM, 'center', 700, SANS, ch);
      // the instruments, as shadows on a table
      var tl = A_(lt, L[4], 0.6) * p2;
      rbox(g, 70, 36, 20, 1.4, 0.2, null, 0, '#3a2a20', tl);
      for (i = 0; i < 3; i++) { g.save(); g.globalAlpha *= tl * 0.8; g.fillStyle = '#2a2f3d'; g.fillRect(72 + i * 6, 31.5 - i * 0.8, 3.4, 4.5 + i * 0.8); g.restore(); }
      tx(g, '刑具', 80, 40, 1.6, DIM, 'center', 700, SANS, tl);
      var q = A_(lt, L[5], 0.6) * p2;
      rbox(g, 6, 28, 26, 10, 0.6, 'rgba(217,184,255,0.6)', 0.18, 'rgba(24,18,34,0.95)', q);
      tx(g, '没有什么可招的', 19, 31.4, 1.7, '#e6dcff', 'center', 800, SANS, q);
      tx(g, '就算死，也不认', 19, 35, 1.7, '#e6dcff', 'center', 900, SANS, A_(lt, L[6], 0.5) * p2);
    }
    var p3 = A_(lt, L[7] - 0.2, 0.8);
    if (p3 > 0.01) {
      ground(g, 42, p3, '#2a2a22', '#12120e');
      for (i = 0; i < 20; i++) { var r = rng(i + 11), ph = (lt * 0.15 + r()) % 1; g.save(); g.globalAlpha *= p3 * (1 - ph) * 0.8; g.fillStyle = i % 2 ? '#c9803a' : '#a85a2a'; g.translate(r() * 100, 10 + ph * 34); g.rotate(lt + i); g.fillRect(-0.5, -0.3, 1, 0.6); g.restore(); }
      tx(g, '1621 年秋', 30, 16, 2.4, GOLD, 'center', 900, SANS, p3);
      var w = clamp((lt - L[7] - 0.3) / 2.4);
      katharina(g, mix(42, 52, w), 45, 11, p3 * (1 - A_(lt, L[8] + 0.6, 1.2)), { name: '', walk: w > 0 && w < 1 ? lt * 4 : null }, lt);
      kepler(g, mix(52, 60, w), 45, 12, p3, { name: '' }, lt);
      tx(g, '半年后去世', 74, 24, 2.0, DIM, 'center', 800, SANS, A_(lt, L[8], 0.8));
    }
  };

  // ---------- k15: still searching for harmony; T² ∝ a³ ----------
  var PT = [[0.3871, 87.969], [0.7233, 224.70], [1.0, 365.26], [1.5237, 686.98], [5.2034, 4332.8], [9.5371, 10775.6], [19.191, 30687], [30.069, 60190]];
  var PN8 = ['水星', '金星', '地球', '火星', '木星', '土星', '天王星', '海王星'];
  DRAW.k15 = function (g, lt, L) {
    var i, p1 = W_(lt, 0.1, L[3] - 0.2, 0.7, 0.6);
    if (p1 > 0.01) {
      nestModel(g, 26, 28, 12, lt * 0.3, 0.42, p1 * 0.75, 5, 0.3, 0);
      // a staff with notes: each planet sings
      var st = A_(lt, L[1], 0.6) * p1;
      for (i = 0; i < 5; i++) ln(g, 48, 20 + i * 2, 92, 20 + i * 2, 'rgba(238,242,248,0.45)', 0.12, null, st);
      var notes = [[52, 4], [57, 3], [62, 3.5], [67, 2], [72, 1], [77, 0.5], [82, 2.5], [87, 1.5]];
      for (i = 0; i < notes.length; i++) { var na = st * A_(lt, L[1] + 0.2 + i * 0.12, 0.3), ny = 20 + notes[i][1] * 2 + Math.sin(lt * 2 + i) * 0.2; g.save(); g.globalAlpha *= na; g.fillStyle = PL_C[i % 6]; g.beginPath(); g.ellipse(notes[i][0], ny, 1.0, 0.7, -0.4, 0, TAU); g.fill(); g.restore(); ln(g, notes[i][0] + 0.9, ny, notes[i][0] + 0.9, ny - 5, PL_C[i % 6], 0.15, null, na); }
      tx(g, '天体的音乐', 70, 15, 2.0, GOLD, 'center', 800, SANS, st);
      tx(g, '和谐的比例', 70, 34, 1.8, FG, 'center', 800, SANS, A_(lt, L[2], 0.5) * p1);
    }
    var p2 = A_(lt, L[3] - 0.1, 0.7);
    if (p2 > 0.01) {
      tx(g, '1618', 14, 14, 3, GOLD, 'center', 900, SANS, p2);
      // log-log plot: T² against a³ is a straight line
      var x0 = 30, y0 = 43, W = 40, H = 28, lmin = Math.log10(0.05), lmax = Math.log10(30000);
      function X(a) { return x0 + (Math.log10(a * a * a) - lmin) / (lmax - lmin) * W; }
      function Y(T) { var t = T / 365.26; return y0 - (Math.log10(t * t) - lmin) / (lmax - lmin) * H; }
      var ax = A_(lt, L[4], 0.5) * p2;
      ln(g, x0, y0, x0 + W + 2, y0, DIM, 0.2, null, ax); ln(g, x0, y0, x0, y0 - H - 2, DIM, 0.2, null, ax);
      tx(g, '距离³', x0 + W + 3, y0 + 1.8, 1.5, ICE, 'center', 800, SANS, A_(lt, L[5], 0.5) * p2);
      tx(g, '周期²', x0 - 2, y0 - H - 3, 1.5, GOLD, 'center', 800, SANS, A_(lt, L[4], 0.5) * p2);
      tx(g, '（对数刻度）', x0 + W / 2, y0 + 2.6, 1.3, DIM, 'center', 600, SANS, ax);
      var lnA = A_(lt, L[6], 0.8) * p2;
      ln(g, X(0.3), Y(0.3 ** 1.5 * 365.26), X(32), Y(32 ** 1.5 * 365.26), 'rgba(255,226,168,0.7)', 0.25, null, lnA * eo(pr(lt, L[6], 1.2)));
      for (i = 0; i < 8; i++) {
        var pa = p2 * A_(lt, (i < 6 ? L[5] + i * 0.2 : L[7] + (i - 6) * 0.3), 0.4), px = X(PT[i][0]), py = Y(PT[i][1]);
        dot(g, px, py, 0.7, i < 6 ? PL_C[i] : '#9fe0ff', pa); tx(g, PN8[i], px + (i % 2 ? 1.4 : -1.4), py + (i % 2 ? 1.6 : -1.6), 1.3, FG, i % 2 ? 'left' : 'right', 700, SANS, pa);
      }
      chip(g, 82, 22, '周期² ∝ 距离³', GOLD, A_(lt, L[6], 0.5) * p2, 'rgba(48,38,12,0.95)');
      tx(g, '第三条', 82, 16.5, 1.8, FG, 'center', 800, SANS, A_(lt, L[6], 0.5) * p2);
      tx(g, '天王星、海王星', 82, 30, 1.6, '#9fe0ff', 'center', 800, SANS, A_(lt, L[7], 0.5));
      tx(g, '他那时还不知道它们', 82, 34, 1.4, DIM, 'center', 600, SANS, A_(lt, L[7] + 0.5, 0.5));
    }
  };

  // ---------- k16: war, losses, unpaid wages, the Rudolphine Tables ----------
  DRAW.k16 = function (g, lt, L) {
    var i, p1 = W_(lt, 0.1, L[3] - 0.2, 0.7, 0.6);
    if (p1 > 0.01) {
      ground(g, 40, p1, '#241c1a', '#0d0a09');
      for (i = 0; i < 3; i++) flame(g, 20 + i * 30, 40, 7, 9, lt + i, 0.45 * p1, 5 + i);
      for (i = 0; i < 10; i++) { var px = ((lt * 2 + i * 11) % 110) - 5; extra(g, px, 41, 4.5, p1 * 0.55, { name: '', col: '#3e4252', walk: lt * 6 + i }, lt); }
      tx(g, '三十年战争 · 1618—1648', 50, 15, 2.2, HOT, 'center', 900, SANS, p1);
      var lo = A_(lt, L[1], 0.6) * p1;
      for (i = 0; i < 4; i++) { var cx = 34 + i * 10, a2 = lo * A_(lt, L[1] + (i ? L[2] - L[1] + (i - 1) * 0.4 : 0), 0.5);
        g.save(); g.globalAlpha *= a2; g.fillStyle = '#5a5a66'; g.fillRect(cx - 0.4, 24, 0.8, 7); g.fillRect(cx - 2, 26, 4, 0.8); g.restore(); }
      tx(g, '妻子', 34, 34, 1.5, DIM, 'center', 700, SANS, lo); tx(g, '孩子', 54, 34, 1.5, DIM, 'center', 700, SANS, A_(lt, L[2], 0.5) * p1);
    }
    var p2 = W_(lt, L[3] - 0.1, L[5] - 0.2, 0.7, 0.6);
    if (p2 > 0.01) {
      paper(g, 30, 13, 40, 30, p2);
      tx(g, '皇家数学家 · 薪水', 50, 16.5, 1.8, '#3a2a1a', 'center', 900, SANS, p2);
      for (i = 0; i < 6; i++) { var y = 21 + i * 3.4, ya = A_(lt, L[3] + 0.3 + i * 0.25, 0.3) * p2;
        tx(g, (1621 + i) + ' 年', 36, y, 1.5, '#3a2a1a', 'left', 700, SANS, ya); ln(g, 46, y, 60, y, 'rgba(58,42,26,0.35)', 0.12, [0.5, 0.4], ya);
        stamp(g, '欠', 64, y, 1.4, '#b4283a', A_(lt, L[4] + i * 0.2, 0.2) * p2, -0.2); }
    }
    var p3 = A_(lt, L[5] - 0.1, 0.7);
    if (p3 > 0.01) {
      bookB(g, 28, 28, 18, 24, p3, '#2a3a5a', '');
      tx(g, '鲁道夫星表', 28.6, 24, 2.0, '#f2dfb0', 'center', 900, SANS, p3); tx(g, '1627', 28.6, 31, 2.0, '#f2dfb0', 'center', 800, SANS, p3);
      var pa = A_(lt, L[6], 0.6) * p3, cx = 66, cy = 28;
      sunB(g, cx, cy, 1.5, pa, lt);
      ellipsePath(g, cx, cy, 8, 7, 'rgba(111,182,255,0.5)', 0.15, pa); ellipsePath(g, cx + 1.4, cy, 13, 12, 'rgba(255,122,92,0.5)', 0.15, pa);
      var fut = A_(lt, L[7], 0.6);
      for (i = 0; i < 6; i++) { var t = lt * 0.4 + i * 0.5; dot(g, cx + 1.4 + 13 * Math.cos(t), cy + 12 * Math.sin(t), 0.4, MARS, fut * (1 - i * 0.14)); }
      tx(g, '未来的位置', 66, 44, 1.7, GOLD, 'center', 800, SANS, fut);
    }
  };

  // ---------- k17: the last journey; 15 November 1630; the lost grave; the epitaph ----------
  DRAW.k17 = function (g, lt, L) {
    var i, p1 = W_(lt, 0.1, L[3] - 0.2, 0.9, 0.8);
    if (p1 > 0.01) {
      // late autumn: rain, a road
      ground(g, 40, p1, '#22261e', '#0d0f0b');
      for (i = 0; i < 70; i++) { var r = rng(i + 3), x = (r() * 110 - lt * 6 + 200) % 110 - 5, y = (r() * 56 + lt * 30) % 52; ln(g, x, y, x - 0.6, y + 1.8, 'rgba(180,200,220,0.35)', 0.1, null, p1 * A_(lt, L[1], 1)); }
      var q = clamp((lt - L[1]) / ((L[3] - L[1]) || 1));
      tx(g, '萨根', 10, 44.5, 1.6, DIM, 'center', 700, SANS, p1); tx(g, '雷根斯堡', 90, 44.5, 1.6, GOLD, 'center', 800, SANS, p1);
      ln(g, 10, 41.5, 90, 41.5, 'rgba(238,242,248,0.25)', 0.2, [0.6, 0.6], p1);
      var hx = mix(14, 84, q); horse(g, hx, 41, 1.0, p1, lt, lt * 7);
      kepler(g, hx + 0.4, 35, 6.5, p1, { name: '', old: true }, lt);
      tx(g, '1630 年 10 月', 50, 15, 2.2, GOLD, 'center', 900, SANS, p1); tx(g, '58 岁', 50, 20, 1.8, FG, 'center', 800, SANS, p1 * A_(lt, L[0] + 0.5, 0.5));
    }
    var p2 = W_(lt, L[3] - 0.2, L[5] - 0.2, 1.0, 1.0);
    if (p2 > 0.01) {
      rbox(g, 44, 14, 12, 16, 0.3, 'rgba(143,208,255,0.25)', 0.2, 'rgba(14,20,34,0.7)', p2);
      for (i = 0; i < 20; i++) { var r2 = rng(i + 40), x2 = 44.5 + r2() * 11, y2 = (14 + r2() * 16 + lt * 8) % 16 + 14; ln(g, x2, y2, x2 - 0.2, y2 + 0.8, 'rgba(180,200,220,0.4)', 0.08, null, p2); }
      var out = sm(L[4] + 1.0, L[4] + 2.4, lt);
      rbox(g, 48.8, 33, 2.4, 7, 0.3, null, 0, '#efe6d2', p2);
      if (out < 1) { dot(g, 50, 31.8, 0.6 * (1 - out), '#ffd27a', p2); glow(g, 50, 31.6, 9, 'rgba(255,190,100,0.9)', 0.45 * p2 * (1 - out)); }
      tx(g, '11 月 15 日', 50, 45, 2.0, FG, 'center', 800, SANS, A_(lt, L[4], 1.0) * p2);
    }
    var p3 = W_(lt, L[5] - 0.2, L[7] - 0.2, 0.9, 0.8);
    if (p3 > 0.01) {
      ground(g, 40, p3, '#1c1a18', '#0a0908');
      var burn = A_(lt, L[5], 1.4), gone = A_(lt, L[6], 1.4);
      rbox(g, 46, 28, 8, 12, 1.4, null, 0, '#5a5a5e', p3 * (1 - gone));
      tx(g, '开普勒', 50, 32, 1.3, '#2a2a2e', 'center', 800, SANS, p3 * (1 - gone));
      for (i = 0; i < 3; i++) flame(g, 36 + i * 14, 40, 8, 10, lt + i, burn * (1 - gone * 0.7) * p3, 9 + i);
      tx(g, '墓地毁于战火', 50, 16, 1.9, DIM, 'center', 800, SANS, burn * p3);
    }
    // the epitaph across the night sky; the shadow of the earth on the ground
    var p4 = A_(lt, L[7] - 0.2, 1.2);
    if (p4 > 0.01) {
      stars(g, 0.9 * p4, lt, 71, 110, 36);
      ground(g, 40, p4, '#0f1112', '#060707');
      var s1 = A_(lt, L[8], 1.2), s2 = A_(lt, L[9], 1.2);
      // a sky full of measured arcs (above) and a long shadow (below)
      for (i = 0; i < 4; i++) arcl(g, 50, 56, 24 + i * 9, Math.PI * 1.08, Math.PI * 1.92, 'rgba(159,196,255,0.25)', 0.15, s1);
      tx(g, '“我曾测量天空，', 50, 21, 3.0, '#e6eeff', 'center', 900, SANS, s1);
      g.save(); g.globalAlpha *= s2 * 0.6; g.fillStyle = '#000'; g.beginPath(); g.ellipse(50, 44, 34 * s2, 2.2, 0, 0, TAU); g.fill(); g.restore();
      tx(g, '如今测量大地的阴影。”', 50, 27.5, 3.0, '#e6eeff', 'center', 900, SANS, s2);
      tx(g, '— 他为自己写的墓志铭', 66, 33, 1.5, DIM, 'center', 600, SANS, s2);
    }
  };

  // ---------- k18: how, not why; an apple; one force; the design was wrong, the laws are right ----------
  DRAW.k18 = function (g, lt, L) {
    var i, A = A_(lt, 0.1, 0.8);
    stars(g, 0.7 * A, lt, 81, 80);
    var p1 = W_(lt, 0.1, L[2] - 0.2, 0.8, 0.6);
    if (p1 > 0.01) {
      var lab = [['椭圆', GOLD], ['等面积', ICE], ['周期² ∝ 距离³', '#ffe2a8']];
      for (i = 0; i < 3; i++) chip(g, 24 + i * 26, 22, lab[i][0], lab[i][1], A_(lt, 0.3 + i * 0.3, 0.5) * p1, 'rgba(20,24,34,0.95)');
      tx(g, '怎么走 ✓', 50, 31, 2.4, FG, 'center', 900, SANS, A_(lt, L[0] + 0.6, 0.5) * p1);
      tx(g, '为什么？', 50, 38, 2.8, HOT, 'center', 900, SANS, A_(lt, L[1], 0.5) * p1);
    }
    var p2 = W_(lt, L[2] - 0.1, L[6] - 0.2, 0.8, 0.8);
    if (p2 > 0.01) {
      // a timeline: 1630 -> 1642 -> 1687
      ln(g, 14, 40, 86, 40, 'rgba(238,242,248,0.3)', 0.25, null, p2);
      var yrs = [[1630, '开普勒去世', KP_NAME], [1642, '英格兰 · 一个早产儿', GOLD], [1687, '《原理》', '#ffe2a8']];
      for (i = 0; i < 3; i++) {
        var x = 14 + (yrs[i][0] - 1625) / 67 * 72, ya = A_(lt, [L[2], L[3], L[4]][i], 0.6) * p2;
        dot(g, x, 40, 0.9, yrs[i][2], ya); tx(g, String(yrs[i][0]), x, 43.6, 1.8, yrs[i][2], 'center', 900, SANS, ya);
      }
      tx(g, '12 年后', 30, 36, 1.6, DIM, 'center', 700, SANS, A_(lt, L[2] + 0.4, 0.5) * p2 * (1 - A_(lt, L[4] - 0.2, 0.4)));
      var bb = A_(lt, L[3], 0.6) * p2 * (1 - A_(lt, L[4], 0.5));
      cup(g, 32, 24, 1.3, bb); baby(g, 32, 22.6, 0.9, bb, lt);
      tx(g, '英格兰 · 一个早产的孩子', 32, 15, 1.7, GOLD, 'center', 800, SANS, bb);
      var nw = A_(lt, L[4], 0.6) * p2;
      newton(g, 30, 36.5, 10, nw, { name: '牛顿', pose: 'up' }, lt);
      // one force: lines from the Sun to a planet on an ellipse
      var cx = 64, cy = 21, Ax = 14, e = 0.5, f = Ax * e, E = keplerPos(lt * 1.2, e), p = orbitXY(cx, cy, Ax, e, E);
      var fo = A_(lt, L[4] + 0.6, 0.6) * p2;
      ellipsePath(g, cx, cy, Ax, Ax * Math.sqrt(1 - e * e), 'rgba(255,226,168,0.6)', 0.25, fo);
      sunB(g, cx + f, cy, 1.4, fo, lt); mars(g, p[0], p[1], 0.8, fo);
      arrow(g, p[0], p[1], mix(p[0], cx + f, 0.35), mix(p[1], cy, 0.35), GOLD, 0.3, fo, 0.8);
      apple(g, 42, 16 + ((lt * 0.8) % 1) * 15, 1.0, fo);
      chip(g, 64, 36.4, '一种力 → 三条定律', GOLD, A_(lt, L[5], 0.5) * p2, 'rgba(48,38,12,0.95)');
    }
    var p3 = A_(lt, L[6] - 0.1, 0.8);
    if (p3 > 0.01) {
      var fade = A_(lt, L[8], 1.0), cx2 = 30, cy2 = 28;
      nestModel(g, cx2, cy2, 13, lt * 0.3, 0.42, p3 * (1 - 0.6 * fade), 5, 0.3, 0);
      tx(g, '5 个形状 → 6 颗行星', cx2, 45, 1.6, GOLD, 'center', 800, SANS, p3 * (1 - fade * 0.5));
      // eight real orbits
      var ox = 72, oy = 28, oa = A_(lt, L[7], 0.8);
      sunB(g, ox, oy, 1.2, oa, lt);
      for (i = 0; i < 8; i++) { var r = 2.4 + Math.sqrt(PT[i][0]) * 3.2; ellipsePath(g, ox, oy, r, r * 0.45, 'rgba(159,196,255,0.4)', 0.12, oa * A_(lt, L[7] + i * 0.1, 0.4)); var t = lt * (1.2 / Math.sqrt(PT[i][0] * PT[i][0] * PT[i][0])) + i; dot(g, ox + r * Math.cos(t), oy + r * 0.45 * Math.sin(t), 0.4, i < 6 ? PL_C[i] : '#9fe0ff', oa); }
      tx(g, '今天：8 颗行星', ox, 45, 1.6, ICE, 'center', 800, SANS, oa);
      tx(g, '设计图是错的', cx2, 12.5 + 1.5, 1.9, DIM, 'center', 800, SANS, fade);
      var tr = A_(lt, L[9], 0.8);
      glow(g, ox, oy, 18, 'rgba(255,226,168,0.7)', 0.3 * tr);
      chip(g, ox, 14, '三条规律，至今成立', '#ffe2a8', A_(lt, L[10], 0.6), 'rgba(48,38,12,0.95)');
    }
  };
