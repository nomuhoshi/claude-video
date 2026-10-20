  // ================= Kepler: scenes k0-k7 =================
  // ---------- k0: the nested solids; "he was wrong"; an ellipse; his name ----------
  DRAW.k0 = function (g, lt, L) {
    stars(g, 0.8 * A_(lt, 0, 1.2), lt, 13, 90);
    var build = clamp((lt - 0.3) / 2.6) * 5, dim = 1 - 0.6 * A_(lt, L[2], 0.6);
    var cx = 50, cy = 28, R = 17;
    glow(g, cx, cy, 22, 'rgba(242,198,107,0.8)', 0.18 * A_(lt, L[1], 0.8) * dim);
    nestModel(g, cx, cy, R, lt * 0.35, 0.42, dim, build, 0.6 * A_(lt, L[1], 0.8), 0);
    var de = A_(lt, L[1] + 0.3, 0.5) * (1 - A_(lt, L[3], 0.5));
    chip(g, 80, 16, '上帝的设计图？', GOLD, de, 'rgba(48,38,12,0.95)');
    tx(g, '✕', 80, 16, 3, RED, 'center', 900, SANS, A_(lt, L[2], 0.3) * (1 - A_(lt, L[3], 0.5)));
    // a true orbit draws itself through the old design
    var el = A_(lt, L[3], 0.6);
    if (el > 0.01) {
      var q = eo(pr(lt, L[3], 2.2)), e = 0.45, A = 27, fx = cx + A * e;
      ellipsePath(g, cx, cy, A, A * Math.sqrt(1 - e * e) * 0.62, '#ffe2a8', 0.45, el, q);
      sunB(g, fx, cy, 1.6, el * A_(lt, L[3] + 0.6, 0.6), lt);
      var E = keplerPos(lt * 0.9, e), p = orbitXY(cx, cy, A, e, E);
      dot(g, p[0], cy + (p[1] - cy) * 0.62, 0.8, MARS, el * A_(lt, L[4], 0.5)); glow(g, p[0], cy + (p[1] - cy) * 0.62, 3, 'rgba(255,140,100,0.9)', 0.5 * el * A_(lt, L[4], 0.5));
      chip(g, 18, 40, '真正的规律', '#ffe2a8', A_(lt, L[4], 0.5), 'rgba(48,38,12,0.95)');
    }
    kepler(g, 86, 46, 14, A_(lt, L[5] - 0.1, 0.6), { pose: 'up' }, lt);
  };

  // ---------- k1: 1571, Weil der Stadt; smallpox; blurred eyes; yet the planets' paths ----------
  DRAW.k1 = function (g, lt, L) {
    var i, p1 = W_(lt, 0.1, L[2] - 0.2, 0.7, 0.6);
    if (p1 > 0.01) {
      stars(g, 0.6 * p1, lt, 21, 50, 25);
      ground(g, 40, p1, '#1e2430', '#0c1018');
      for (i = 0; i < 8; i++) { var hx = 8 + i * 11, hh = 7 + (i * 37 % 5); rbox(g, hx, 40 - hh, 8, hh, 0.1, null, 0, '#34384a', p1);
        g.save(); g.globalAlpha *= p1; g.fillStyle = '#2a2d3c'; g.beginPath(); g.moveTo(hx - 0.6, 40 - hh); g.lineTo(hx + 4, 40 - hh - 4.5); g.lineTo(hx + 8.6, 40 - hh); g.closePath(); g.fill(); g.restore();
        rbox(g, hx + 3, 40 - hh + 2, 2, 2.2, 0.1, null, 0, 'rgba(255,205,130,0.75)', p1 * (i % 2 ? 1 : 0.4)); }
      tx(g, '1571', 50, 15, 6, GOLD, 'center', 900, SANS, p1 * A_(lt, 0.3, 0.6));
      chip(g, 50, 22, '魏尔 · 德国西南部', FG, A_(lt, 0.8, 0.5) * p1);
      var b = A_(lt, L[1], 0.6) * p1; baby(g, 50, 43, 1.1, b, lt);
      chip(g, 64, 43, '早产 · 体弱', HOT, A_(lt, L[1] + 0.4, 0.5) * p1, 'rgba(56,24,14,0.95)');
    }
    // smallpox: the eye and the hands
    var p2 = W_(lt, L[2] - 0.1, L[4] - 0.2, 0.7, 0.6);
    if (p2 > 0.01) {
      var blur = A_(lt, L[3], 0.8);
      for (i = 0; i < 5; i++) h_eye(g, 34 + (i - 2) * 0.7 * blur, 27, 2.4, 'rgba(201,216,240,' + (i === 2 ? 0.95 : 0.25 * blur) + ')', p2, 0);
      tx(g, '眼睛', 34, 36, 1.9, FG, 'center', 800, SANS, p2 * blur);
      // a hand, slightly trembling
      g.save(); g.globalAlpha *= p2 * blur; g.translate(66, 30 + Math.sin(lt * 9) * 0.15 * blur); g.fillStyle = '#c9d8f0';
      g.beginPath(); g.ellipse(0, 2, 3, 3.4, 0, 0, TAU); g.fill();
      for (i = 0; i < 4; i++) { g.fillRect(-2.6 + i * 1.5, -4.6, 1.1, 5); } g.fillRect(2.6, 0, 2.6, 1.1); g.restore();
      tx(g, '双手', 66, 38, 1.9, FG, 'center', 800, SANS, p2 * blur);
      chip(g, 50, 16, '天花', HOT, p2 * A_(lt, L[2], 0.5), 'rgba(56,24,14,0.95)');
      for (i = 0; i < 26; i++) { var rr = rng(i + 7); dot(g, 20 + rr() * 60, 14 + rr() * 30, 0.25 + rr() * 0.3, 'rgba(255,150,120,0.6)', p2 * A_(lt, L[2] + 0.2, 0.6) * (1 - blur) * 0.8); }
    }
    // blurry stars -> a sharp orbit
    var p3 = A_(lt, L[4] - 0.1, 0.7);
    if (p3 > 0.01) {
      var sharp = A_(lt, L[5], 1.4);
      for (i = 0; i < 40; i++) { var r2 = rng(i + 30), x = 10 + r2() * 80, y = 10 + r2() * 34; halo(g, x, y, 1.6 * (1 - sharp) + 0.3, 'rgba(230,236,255,0.9)', p3 * 0.5); dot(g, x, y, 0.15, '#eef2f8', p3 * sharp); }
      var cx = 56, cy = 27;
      sunB(g, cx + 6, cy, 1.6, p3 * sharp, lt);
      ellipsePath(g, cx, cy, 20, 12, GOLD, 0.35, p3 * sharp, eo(pr(lt, L[5], 1.6)));
      var E = keplerPos(lt * 0.8, 0.3), p = orbitXY(cx, cy, 20, 0.3, E); dot(g, p[0], cy + (p[1] - cy) * 12 / (20 * Math.sqrt(1 - 0.09)), 0.7, MARS, p3 * sharp);
      kboy(g, 18, 46, 9, p3, { name: '', pose: 'up' }, lt);
    }
  };

  // ---------- k2: the comet, the red moon, Tübingen, Copernicus ----------
  DRAW.k2 = function (g, lt, L) {
    var i, p1 = W_(lt, 0.1, L[2] - 0.2, 0.7, 0.6);
    stars(g, 0.8 * A_(lt, 0, 0.8) * (1 - A_(lt, L[4] - 0.2, 0.6)), lt, 31, 90, 40);
    if (p1 > 0.01) {
      hills(g, p1, 38, '#141f1a'); ground(g, 41, p1, '#141f1a', '#0a110d');
      // the Great Comet of 1577
      var cx = 70, cy = 15, ca = A_(lt, L[1], 0.8) * p1;
      g.save(); g.globalCompositeOperation = 'lighter';
      for (i = 0; i < 30; i++) { var u = i / 30; halo(g, cx - u * 30 * 0.9, cy + u * 30 * 0.25 - u * u * 3, 2.6 * (1 - u) + 0.6, 'rgba(200,225,255,0.8)', ca * 0.35 * (1 - u)); }
      g.restore(); dot(g, cx, cy, 0.8, '#ffffff', ca); glow(g, cx, cy, 4, 'rgba(220,240,255,0.9)', ca * 0.8);
      tx(g, '1577 · 大彗星', 76, 22, 1.8, ICE, 'center', 800, SANS, ca);
      kmother(g, 30, 42, 11, p1, { pose: 'up' }, lt);
      kboy(g, 38, 42, 6.5, p1, { name: '6 岁', pose: 'up' }, lt);
    }
    var p2 = W_(lt, L[2] - 0.1, L[4] - 0.2, 0.7, 0.6);
    if (p2 > 0.01) {
      hills(g, p2, 38, '#141f1a'); ground(g, 41, p2, '#141f1a', '#0a110d');
      var red = A_(lt, L[3], 1.6);
      halo(g, 66, 18, 8, 'rgba(255,90,60,0.6)', 0.4 * red * p2);
      g.save(); g.globalAlpha *= p2; var gr = g.createRadialGradient(65, 17, 0.4, 66, 18, 4);
      gr.addColorStop(0, red > 0.5 ? '#d26a4a' : '#f6f2e4'); gr.addColorStop(1, red > 0.5 ? '#6a1c10' : '#8f8c82'); g.fillStyle = gr; g.beginPath(); g.arc(66, 18, 4, 0, TAU); g.fill(); g.restore();
      if (red < 0.5) { g.save(); g.globalAlpha *= p2 * (red * 2); g.fillStyle = 'rgba(120,30,20,0.75)'; g.beginPath(); g.arc(66, 18, 4.05, 0, TAU); g.fill(); g.restore(); }
      tx(g, '1580 · 月食', 66, 26, 1.8, HOT, 'center', 800, SANS, p2 * A_(lt, L[3], 0.5));
      extra(g, 30, 42, 12, p2, { name: '父亲', col: '#a7b4c8', pose: 'up' }, lt);
      kboy(g, 39, 42, 7.5, p2, { name: '9 岁', pose: 'up' }, lt);
    }
    // Tübingen: a priest's path; a teacher whispering Copernicus
    var p3 = A_(lt, L[4] - 0.1, 0.7);
    if (p3 > 0.01) {
      ground(g, 42, p3, '#1e2430', '#0c1018');
      g.save(); g.globalAlpha *= p3 * (1 - A_(lt, L[6] - 0.2, 0.5)); g.fillStyle = '#4b4552'; g.fillRect(16, 22, 34, 20);
      g.beginPath(); g.moveTo(14, 22); g.lineTo(33, 13); g.lineTo(52, 22); g.closePath(); g.fill(); g.fillStyle = 'rgba(255,205,130,0.6)';
      for (i = 0; i < 5; i++) g.fillRect(19 + i * 6, 27, 2.6, 4); g.restore();
      tx(g, '图宾根大学', 33, 45.2, 1.7, DIM, 'center', 700, SANS, p3 * (1 - A_(lt, L[6] - 0.2, 0.5)));
      kepler(g, 64, 45, 12, p3, { name: '' }, lt);
      chip(g, 64, 26, '想当牧师', FG, A_(lt, L[5], 0.5) * (1 - A_(lt, L[6] - 0.2, 0.5)));
      var bb = A_(lt, L[6] - 0.1, 0.6);
      if (bb > 0.01) {
        rbox(g, 14, 14, 36, 24, 0.4, 'rgba(160,140,110,0.6)', 0.25, '#1d2a24', bb);
        var s = eo(pr(lt, L[7], 1.0));
        sunB(g, 32, 26, 1.8, bb * s, lt);
        ring(g, 32, 26, 6, 'rgba(238,242,248,0.6)', 0.15, bb * s); ring(g, 32, 26, 10, 'rgba(238,242,248,0.6)', 0.15, bb * s);
        var th = lt * 0.9; dot(g, 32 + 6 * Math.cos(th), 26 + 6 * Math.sin(th), 0.6, '#6fb6ff', bb * s); dot(g, 32 + 10 * Math.cos(th * 0.55 + 2), 26 + 10 * Math.sin(th * 0.55 + 2), 0.55, MARS, bb * s);
        extra(g, 9, 45, 12, bb, { name: '老师', col: '#a7c4e8', pose: 'forward' }, lt);
        tx(g, '太阳在中心', 32, 35.6, 1.5, GOLD, 'center', 800, SANS, bb * s);
        glow(g, 64, 32, 10, 'rgba(159,196,255,0.9)', 0.35 * A_(lt, L[8], 0.6));
        chip(g, 64, 26, '信了', KP_NAME, A_(lt, L[8], 0.5), 'rgba(16,30,52,0.95)');
      }
    }
  };

  // ---------- k3: Graz; the blackboard; why six, why these distances ----------
  var PL_A = [0.387, 0.723, 1.0, 1.524, 5.203, 9.537], PL_C = ['#c9b28a', '#f2cf86', '#6fb6ff', MARS, '#e8c27a', '#f2d6a0'];
  DRAW.k3 = function (g, lt, L) {
    var i, A = A_(lt, 0.1, 0.7);
    rbox(g, 8, 11, 76, 34, 0.6, 'rgba(160,140,110,0.6)', 0.3, '#18261f', A);
    tx(g, '格拉茨', 16, 14.6, 1.6, DIM, 'left', 700, SANS, A * (1 - A_(lt, L[1], 0.4)));
    kepler(g, 91, 46, 12, A, { pose: lt > L[1] && lt < L[3] ? 'forward' : 'down', flip: true, name: '23 岁' }, lt);
    // triangles of Saturn-Jupiter conjunctions inscribed in the zodiac
    var p1 = W_(lt, L[1] - 0.1, L[3] - 0.2, 0.6, 0.5);
    if (p1 > 0.01) {
      tx(g, '1595 年 7 月', 22, 15, 1.8, GOLD, 'center', 800, SANS, p1);
      var cx = 40, cy = 28, R = 13; ring(g, cx, cy, R, 'rgba(238,242,248,0.8)', 0.2, p1);
      var n = Math.floor(clamp((lt - L[1] - 0.2) / 3) * 12);
      for (i = 0; i < n; i++) { var t = -Math.PI / 2 + i * (TAU / 3 + 0.14); for (var k = 0; k < 3; k++) { var t1 = t + k * TAU / 3, t2 = t1 + TAU / 3; ln(g, cx + R * Math.cos(t1), cy + R * Math.sin(t1), cx + R * Math.cos(t2), cy + R * Math.sin(t2), 'rgba(238,242,248,0.55)', 0.14, null, p1); } }
      ring(g, cx, cy, R * 0.5, GOLD, 0.25, p1 * A_(lt, L[1] + 2.6, 0.6));
      tx(g, '里面空出一个小圆', 64, 22, 1.7, GOLD, 'center', 800, SANS, p1 * A_(lt, L[1] + 2.8, 0.5));
      tx(g, '土星与木星相遇的位置', 64, 34, 1.5, DIM, 'center', 700, SANS, p1 * A_(lt, L[1] + 0.6, 0.5));
    }
    // six planets at their real distances
    var p2 = A_(lt, L[3] - 0.1, 0.7);
    if (p2 > 0.01) {
      var x0 = 16, sc = 6.6, y = 30;
      sunB(g, x0, y, 1.8, p2, lt);
      for (i = 0; i < 6; i++) {
        var x = x0 + Math.sqrt(PL_A[i]) * 20, a2 = A_(lt, L[3] + 0.15 * i, 0.4) * p2;
        dot(g, x, y, 0.75 + (i > 3 ? 0.5 : 0), PL_C[i], a2); tx(g, PLANET_NAME[5 - i], x, y + 3.4, 1.4, FG, 'center', 700, SANS, a2);
        tx(g, PL_A[i].toFixed(2), x, y - 3, 1.3, DIM, 'center', 600, SANS, a2 * A_(lt, L[4], 0.5));
      }
      tx(g, '离太阳的距离（地球 = 1，按平方根压缩）', 50, 41.5, 1.4, DIM, 'center', 600, SANS, p2 * A_(lt, L[4], 0.5));
      tx(g, '为什么是 6 颗？', 50, 16.5, 2.4, FG, 'center', 900, SANS, p2 * A_(lt, L[3], 0.5));
      tx(g, '为什么是这些距离？', 50, 21.5, 2.0, GOLD, 'center', 800, SANS, A_(lt, L[4], 0.5));
    }
  };

  // ---------- k4: the five regular solids, nested ----------
  DRAW.k4 = function (g, lt, L) {
    var i, nest = eio(pr(lt, L[4], 2.2)), A = A_(lt, 0.1, 0.7);
    var order = ['tetra', 'cube', 'octa', 'dodeca', 'icosa'];
    if (nest < 0.999) for (i = 0; i < 5; i++) {
      var a = A_(lt, L[1] + i * 0.35, 0.5) * (1 - nest), x = 14 + i * 18, y = 27;
      solid(g, order[i], x, y, 5.2, lt * 0.6 + i, 0.5, NEST_COL[(i + 1) % 5], 0.24, a);
      tx(g, SOLID_NAME[order[i]], x, y + 8.4, 1.6, FG, 'center', 800, SANS, a);
    }
    chip(g, 50, 15, '每个面都一模一样', FG, A_(lt, L[1], 0.5) * (1 - nest));
    var five = A_(lt, L[2], 0.5) * (1 - nest);
    tx(g, '只有 5 种', 50, 43, 2.6, GOLD, 'center', 900, SANS, five);
    if (nest > 0.001) {
      var cx = 44, cy = 28, R = mix(8, 17, nest), ay = lt * 0.3;
      var k = mix(0, 5, eo(pr(lt, L[4] + 0.6, 4.2)));
      nestModel(g, cx, cy, R, ay, 0.42, nest, k, A_(lt, L[5], 0.6), A_(lt, L[7], 0.6));
      var pa = A_(lt, L[6], 0.5);
      var bk = A_(lt, L[8], 0.7), ko = 1 - bk;
      tx(g, '5 个形状', 82, 22, 2.4, GOLD, 'center', 900, SANS, pa * ko); tx(g, '↓', 82, 26.5, 2.0, FG, 'center', 800, SANS, pa * ko);
      tx(g, '6 个球', 82, 31, 2.4, ICE, 'center', 900, SANS, pa * ko); tx(g, '= 6 颗行星', 82, 35.6, 2.0, FG, 'center', 800, SANS, A_(lt, L[7], 0.5) * ko);
      if (bk > 0.01) tome(g, 82, 27 + 3 * (1 - eo(bk)), 13, 18, bk, '#5a2e22', '宇宙的奥秘', '1596', lt);
    }
  };

  // ---------- k5: about a tenth off; blame the data; the best data in Europe ----------
  DRAW.k5 = function (g, lt, L) {
    var i, A = A_(lt, 0.1, 0.7), p1 = W_(lt, 0.1, L[4] - 0.2, 0.7, 0.6);
    if (p1 > 0.01) {
      var mod = [1, 0.62, 0.21, 0.13, 0.095, 0.05], obs = [1, 0.57, 0.17, 0.11, 0.08, 0.045];   // schematic: ~10% off
      tx(g, '六个球的大小（示意）', 50, 14, 1.8, DIM, 'center', 700, SANS, p1);
      for (i = 0; i < 6; i++) {
        var y = 18 + i * 4.2, a = A_(lt, 0.3 + i * 0.12, 0.4) * p1;
        tx(g, PLANET_NAME[i], 20, y, 1.6, FG, 'right', 800, SANS, a);
        var w1 = 50 * Math.sqrt(mod[i]), w2 = 50 * Math.sqrt(obs[i]) * A_(lt, L[1], 0.8);
        rbox(g, 23, y - 1.4, w1, 1.2, 0.3, null, 0, 'rgba(242,198,107,0.85)', a);
        rbox(g, 23, y + 0.2, w2, 1.2, 0.3, null, 0, 'rgba(143,208,255,0.85)', a);
      }
      tx(g, '■ 模型', 82, 18, 1.5, GOLD, 'left', 800, SANS, p1); tx(g, '■ 观测', 82, 21.5, 1.5, ICE, 'left', 800, SANS, p1 * A_(lt, L[1], 0.5));
      chip(g, 82, 30, '差约 1/10', HOT, A_(lt, L[1] + 0.8, 0.5) * p1, 'rgba(56,24,14,0.95)');
      var bl = A_(lt, L[2], 0.5) * p1;
      kepler(g, 88, 46, 10, bl, { name: '', pose: 'forward', flip: true }, lt);
      chip(g, 74, 40, '是数据不够准', FG, A_(lt, L[3], 0.5) * p1);
    }
    var p2 = A_(lt, L[4] - 0.1, 0.8);
    if (p2 > 0.01) {
      stars(g, 0.6 * p2, lt, 41, 60, 40);
      // a map of Europe, schematic: one light far to the north
      g.save(); g.globalAlpha *= p2 * 0.5; g.strokeStyle = 'rgba(143,208,255,0.6)'; g.lineWidth = 0.18; g.setLineDash([0.6, 0.6]);
      g.beginPath(); g.moveTo(10, 44); g.quadraticCurveTo(30, 30, 46, 34); g.quadraticCurveTo(56, 22, 70, 24); g.quadraticCurveTo(84, 18, 92, 30); g.stroke(); g.restore();
      var lit = A_(lt, L[5], 0.8);
      for (i = 0; i < 30; i++) { var r = rng(i + 70); dot(g, 14 + r() * 74, 18 + r() * 24, 0.3, 'rgba(238,242,248,0.5)', p2 * (1 - lit * 0.6)); }
      dot(g, 62, 22, 1.0, GOLD, p2 * lit); glow(g, 62, 22, 9, 'rgba(242,198,107,0.9)', 0.7 * lit * p2);
      tx(g, '全欧洲最准的数据', 62, 15.5, 2.0, GOLD, 'center', 800, SANS, p2 * A_(lt, L[4], 0.5));
      tycho(g, 62, 38, 9, lit, { name: '?' }, lt);
    }
  };

  // ---------- k6: Tycho, his nose, his island, his arcminute ----------
  DRAW.k6 = function (g, lt, L) {
    var i, p1 = W_(lt, 0.1, L[3] - 0.2, 0.7, 0.6);
    if (p1 > 0.01) {
      tycho(g, 40, 45, 18, p1, { name: '第谷 · 布拉赫' }, lt);
      chip(g, 72, 18, '丹麦贵族', GOLD, A_(lt, L[0] + 0.3, 0.5) * p1, 'rgba(48,38,12,0.95)');
      var du = A_(lt, L[1], 0.4) * p1, sw = pr(lt, L[1] + 0.2, 0.5);
      if (sw > 0 && sw < 1) ln(g, 56 + sw * 10, 20, 64 + sw * 6, 32, '#dfe8ff', 0.3, null, du * (1 - sw));
      tx(g, '1566 · 决斗', 72, 26, 1.8, FG, 'center', 800, SANS, du);
      var no = A_(lt, L[2], 0.5) * p1;
      ring(g, 40.2, 32.1, 2.0, GOLD, 0.25, no); ln(g, 42.2, 31.6, 60, 33, 'rgba(242,198,107,0.6)', 0.15, null, no);
      chip(g, 72, 33, '金属假鼻', GOLD, no, 'rgba(48,38,12,0.95)');
    }
    // the island: an observatory and a huge quadrant
    var p2 = W_(lt, L[3] - 0.1, L[8] - 0.2, 0.7, 0.6);
    if (p2 > 0.01) {
      stars(g, 0.8 * p2, lt, 51, 80, 30);
      g.save(); g.globalAlpha *= p2; g.fillStyle = '#16324a'; g.fillRect(0, 36, 100, 20.25); g.restore();
      g.save(); g.globalAlpha *= p2; g.fillStyle = '#2a3a28'; g.beginPath(); g.ellipse(30, 37, 22, 4, 0, Math.PI, TAU); g.fill(); g.restore();
      var ob = A_(lt, L[4], 0.6) * p2;
      g.save(); g.globalAlpha *= ob; g.fillStyle = '#6a5a4c'; g.fillRect(24, 26, 12, 9); g.beginPath(); g.arc(30, 26, 4, Math.PI, TAU); g.fill();
      g.fillRect(21, 29, 3, 6); g.fillRect(36, 29, 3, 6); g.restore();
      tx(g, '汶岛 · 天文台', 30, 40.6, 1.6, FG, 'center', 800, SANS, ob);
      // the mural quadrant: a quarter circle with a sight line
      var qa = A_(lt, L[5], 0.6) * p2, qx = 58, qy = 38, qr = 18;
      arcl(g, qx, qy, qr, -Math.PI / 2, 0, GOLD, 0.45, qa);
      ln(g, qx, qy, qx + qr, qy, GOLD, 0.35, null, qa); ln(g, qx, qy, qx, qy - qr, GOLD, 0.35, null, qa);
      for (i = 0; i <= 18; i++) { var t = -Math.PI / 2 + i * Math.PI / 36; ln(g, qx + Math.cos(t) * (qr - 1), qy + Math.sin(t) * (qr - 1), qx + Math.cos(t) * qr, qy + Math.sin(t) * qr, GOLD, 0.12, null, qa); }
      var sa = -0.55 + Math.sin(lt * 0.4) * 0.08; ln(g, qx, qy, qx + Math.cos(sa) * 30, qy + Math.sin(sa) * 30, 'rgba(255,240,200,0.7)', 0.15, [0.5, 0.5], qa);
      dot(g, qx + Math.cos(sa) * 30, qy + Math.sin(sa) * 30, 0.6, MARS, qa);
      tx(g, '没有望远镜', 82, 40, 1.7, DIM, 'center', 700, SANS, qa);
      var pa = A_(lt, L[7], 0.5) * p2;
      chip(g, 80, 16, '约 1 角分', GOLD, pa, 'rgba(48,38,12,0.95)');
      tx(g, '= 一度的 1/60', 80, 21, 1.5, FG, 'center', 700, SANS, pa);
      tx(g, '20 多年', 14, 16, 2.4, FG, 'center', 900, SANS, A_(lt, L[6], 0.5) * p2);
    }
    var p3 = A_(lt, L[8] - 0.1, 0.7);
    if (p3 > 0.01) {
      ln(g, 24, 36, 60, 22, 'rgba(238,242,248,0.25)', 0.25, [0.6, 0.6], p3);
      var q = eio(pr(lt, L[8] + 0.2, 2)); dot(g, 24, 36, 1, KP_NAME, p3); dot(g, 60, 22, 1, GOLD, p3);
      tx(g, '格拉茨', 24, 40, 1.7, FG, 'center', 800, SANS, p3); tx(g, '布拉格', 60, 18, 1.7, GOLD, 'center', 800, SANS, p3);
      kepler(g, mix(24, 60, q), mix(36, 22, q) + 0, 7, p3, { name: '', walk: q > 0 && q < 1 ? lt * 7 : null, prop: 'case' }, lt);
      tx(g, '1600', 80, 30, 4, GOLD, 'center', 900, SANS, p3);
    }
  };

  // ---------- k7: wary partners; Mars; the banquet; "not lived in vain"; the records ----------
  DRAW.k7 = function (g, lt, L) {
    var i, p1 = W_(lt, 0.1, L[3] - 0.2, 0.7, 0.6);
    if (p1 > 0.01) {
      tycho(g, 26, 45, 14, p1, { pose: lt > L[2] ? 'forward' : 'down' }, lt);
      kepler(g, 76, 45, 13, p1, { flip: true }, lt);
      // stacks of ledgers behind Tycho, locked
      for (i = 0; i < 4; i++) spineBook(g, 10 + i * 0.3, 42 - i * 3.1, 10, 2.8, p1, ['#5a2e22', '#3e4a2a', '#2a3a5a', '#4a2a4a'][i]);
      var lk = A_(lt, L[1], 0.5) * p1; rbox(g, 13, 27, 4, 3, 0.4, null, 0, '#c9a43a', lk); arcl(g, 15, 27, 1.4, Math.PI, TAU, '#c9a43a', 0.4, lk);
      tx(g, '？', 50, 24, 3.5, DIM, 'center', 900, SANS, A_(lt, L[0] + 0.3, 0.5) * (1 - A_(lt, L[2], 0.4)) * p1);
      var gv = A_(lt, L[2] + 0.3, 0.5) * p1, gx = mix(36, 64, eio(pr(lt, L[2] + 0.4, 1.4)));
      paper(g, gx - 3.5, 22, 7, 8, gv); mars(g, gx, 26, 1.3, gv);
      chip(g, gx, 34, '火星', MARS, gv, 'rgba(56,20,14,0.95)');
      tx(g, '最难算的一颗', 50, 16, 1.8, HOT, 'center', 800, SANS, A_(lt, L[2] + 1.6, 0.5) * p1);
    }
    var p2 = W_(lt, L[3] - 0.1, L[7] - 0.2, 0.7, 0.6);
    if (p2 > 0.01) {
      // the banquet table, then a sickbed candle
      var bq = 1 - A_(lt, L[4], 0.7);
      rbox(g, 20, 34, 60, 2, 0.3, null, 0, '#5a3e2a', p2 * bq);
      for (i = 0; i < 6; i++) { dot(g, 26 + i * 10, 32.6, 1.2, '#c9d2de', p2 * bq); rbox(g, 25 + i * 10, 29, 1.2, 3, 0.3, null, 0, '#9a3a3a', p2 * bq * (i % 2)); }
      for (i = 0; i < 5; i++) extra(g, 22 + i * 14, 45, 9, p2 * bq * 0.7, { name: '', col: '#6e7688' }, lt);
      tx(g, '1601 年 10 月', 50, 18, 2.2, GOLD, 'center', 900, SANS, p2 * A_(lt, L[3], 0.5));
      var sk = A_(lt, L[4], 0.8) * p2;
      if (sk > 0.01) {
        rbox(g, 30, 36, 34, 4, 0.4, null, 0, '#3a3046', sk); rbox(g, 30, 33, 6, 3, 0.6, null, 0, '#d8d0c0', sk);
        rbox(g, 70, 31, 1.4, 6, 0.2, null, 0, '#efe6d2', sk); glow(g, 70.7, 30.2, 5, 'rgba(255,190,100,0.9)', 0.5 * sk * (0.8 + 0.2 * Math.sin(lt * 7)));
        dot(g, 70.7, 30.2, 0.4, '#ffd27a', sk);
        var d = Math.min(11, Math.floor(clamp((lt - L[4]) / 1.6) * 11));
        tx(g, '第 ' + d + ' 天', 50, 24, 2.0, DIM, 'center', 800, SANS, sk * (1 - A_(lt, L[5], 0.5)));
        glow(g, 33, 34.5, 6, 'rgba(255,214,150,0.6)', 0.3 * A_(lt, L[5], 0.8) * p2);
      }
    }
    var p3 = A_(lt, L[7] - 0.1, 0.8);
    if (p3 > 0.01) {
      kepler(g, 30, 45, 13, p3, { pose: 'book' }, lt);
      chip(g, 30, 25, '皇家数学家', GOLD, A_(lt, L[7], 0.5), 'rgba(48,38,12,0.95)');
      for (i = 0; i < 6; i++) { var y = 42 - i * 3.2; spineBook(g, 64 + (i % 2) * 0.6, y, 15, 2.9, p3 * A_(lt, L[8] + i * 0.15, 0.3), ['#5a2e22', '#3e4a2a', '#2a3a5a', '#4a2a4a', '#5a3a1a', '#2a4a4a'][i], ['火星', '', '恒星', '', '木星', ''][i]); }
      glow(g, 64, 34, 14, 'rgba(242,198,107,0.8)', 0.4 * A_(lt, L[8], 0.8));
      tx(g, '20 多年的观测记录', 64, 20, 1.8, GOLD, 'center', 800, SANS, A_(lt, L[8] + 0.6, 0.5));
    }
  };
