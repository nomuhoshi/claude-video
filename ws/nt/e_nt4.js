  // ================= Newton: scenes n21-n24 (old age, death, the epitaph, the seashore) =================
  function queen(g, x, yb, h, a, o, lt) { o = o || {}; o.col = '#f0d8a8'; o.dress = true; o.longHair = true; if (o.name === undefined) o.name = '安妮女王'; o.nameCol = GOLD; faraday(g, x, yb, h, a, o, lt);
    if (a > 0.01) { var k = h / 330; g.save(); g.globalAlpha *= a; g.fillStyle = '#ffd36b'; var cy = yb - 330 * k; g.beginPath(); g.moveTo(x - 50 * k, cy); g.lineTo(x - 50 * k, cy - 40 * k); g.lineTo(x - 25 * k, cy - 18 * k); g.lineTo(x, cy - 46 * k); g.lineTo(x + 25 * k, cy - 18 * k); g.lineTo(x + 50 * k, cy - 40 * k); g.lineTo(x + 50 * k, cy); g.closePath(); g.fill(); g.restore(); } }
  function abbey(g, x, yb, s, a) {
    if (a <= 0.003) return;
    g.save(); g.globalAlpha *= a; g.translate(x, yb); g.scale(s, s); g.fillStyle = '#3c3a44';
    g.fillRect(-14, -26, 7, 26); g.fillRect(7, -26, 7, 26); g.fillRect(-7, -18, 14, 18);
    for (var i = 0; i < 3; i++) { g.fillRect(-14 + i * 2.6, -28, 1.4, 2.4); g.fillRect(7 + i * 2.6, -28, 1.4, 2.4); }
    g.beginPath(); g.moveTo(-7, -18); g.lineTo(0, -24); g.lineTo(7, -18); g.closePath(); g.fill();
    g.fillStyle = 'rgba(255,205,130,0.75)';
    g.beginPath(); g.arc(0, -13, 3.2, 0, TAU); g.fill();
    g.fillStyle = '#17151b'; g.beginPath(); g.moveTo(-2.6, 0); g.lineTo(-2.6, -5); g.quadraticCurveTo(0, -8.6, 2.6, -5); g.lineTo(2.6, 0); g.closePath(); g.fill();
    for (i = 0; i < 2; i++) { g.fillStyle = 'rgba(255,205,130,0.55)'; g.fillRect(-12 + i * 19, -20, 3, 6); }
    g.restore();
    glow(g, x, yb - 13 * s, 6 * s, 'rgba(255,200,120,0.9)', 0.35 * a);
  }
  // ---------- n21: president, knight, unmarried ----------
  DRAW.n21 = function (g, lt, L) {
    var i, p1 = W_(lt, 0.1, L[2] - 0.2, 0.7, 0.6);
    if (p1 > 0.01) {
      newton(g, 50, 45, 13, p1, { old: true, name: '会长 · 牛顿' }, lt);
      for (i = 0; i < 6; i++) extra(g, (i < 3 ? 14 + i * 7 : 72 + (i - 3) * 7), 45, 9.5, p1 * A_(lt, 0.4 + i * 0.1, 0.4), { name: '', col: '#6e7688', flip: i < 3 ? false : true }, lt);
      chip(g, 50, 15, '1703 · 皇家学会会长', GOLD, A_(lt, 0.3, 0.6) * p1, 'rgba(48,38,12,0.95)');
      var tl = A_(lt, L[1], 0.6) * p1, q = eio(pr(lt, L[1], 1.4));
      ln(g, 30, 22, mix(30, 70, q), 22, GOLD, 0.4, null, tl);
      tx(g, '1703', 30, 19.5 + 0, 1.6, FG, 'center', 800, SANS, 0);
      tx(g, '一直到 1727', 70, 25.5, 1.6, FG, 'center', 800, SANS, tl * A_(lt, L[1] + 1.2, 0.4));
    }
    var p2 = W_(lt, L[2] - 0.1, L[3] - 0.2, 0.7, 0.6);
    if (p2 > 0.01) {
      queen(g, 36, 45, 14, p2, { pose: 'forward' }, lt);
      newton(g, 56, 45, 11.5, p2, { old: true, name: '', pose: 'down' }, lt);
      ln(g, 41.5, 31, 54, 30.5, '#dfe3ec', 0.35, null, p2 * A_(lt, L[2] + 0.4, 0.4));
      tx(g, '1705 · 封为爵士', 50, 15, 2.6, GOLD, 'center', 900, SANS, p2);
      tx(g, 'Sir Isaac Newton', 76, 22, 2.0, FG, 'center', 700, SANS, p2 * A_(lt, L[2] + 1.0, 0.5));
    }
    // a quiet room: one chair, one lamp
    var p3 = A_(lt, L[3] - 0.1, 0.8);
    if (p3 > 0.01) {
      rbox(g, 56, 14, 16, 20, 0.3, 'rgba(143,208,255,0.35)', 0.2, 'rgba(20,30,50,0.7)', p3);
      ln(g, 64, 14, 64, 34, 'rgba(143,208,255,0.35)', 0.2, null, p3); ln(g, 56, 24, 72, 24, 'rgba(143,208,255,0.35)', 0.2, null, p3);
      moonB(g, 68, 18, 1.2, p3);
      rbox(g, 20, 34, 18, 1.4, 0.2, null, 0, '#5a3e2a', p3); ln(g, 22, 35, 22, 45, '#5a3e2a', 0.5, null, p3); ln(g, 36, 35, 36, 45, '#5a3e2a', 0.5, null, p3);
      dot(g, 28, 32.6, 0.6, '#ffd27a', p3); glow(g, 28, 32.6, 6, 'rgba(255,190,100,0.9)', 0.45 * p3);
      newton(g, 46, 45, 12, p3, { old: true, name: '' }, lt);
    }
  };

  // ---------- n22: March 1727; Westminster Abbey ----------
  DRAW.n22 = function (g, lt, L) {
    var i, p1 = W_(lt, 0.1, L[2] - 0.3, 1.0, 1.0);
    if (p1 > 0.01) {
      // a candle that burns down and goes out, in the dark
      rbox(g, 44, 14, 12, 16, 0.3, 'rgba(143,208,255,0.25)', 0.2, 'rgba(14,20,34,0.7)', p1);
      moonB(g, 51, 19, 1.0, p1 * 0.8);
      var out = sm(L[0] + 2.0, L[0] + 3.4, lt);
      rbox(g, 48.8, 33, 2.4, 7 - 1.5 * out, 0.3, null, 0, '#efe6d2', p1);
      if (out < 1) {
        g.save(); g.globalAlpha *= p1 * (1 - out); g.fillStyle = '#ffd27a'; var fy = 31.6 + 1.5 * out + Math.sin(lt * 8) * 0.2;
        g.beginPath(); g.moveTo(50, fy - 1.6 * (1 - out)); g.quadraticCurveTo(51, fy, 50, fy + 1.0); g.quadraticCurveTo(49, fy, 50, fy - 1.6 * (1 - out)); g.fill(); g.restore();
        glow(g, 50, 31.6, 10, 'rgba(255,190,100,0.9)', 0.5 * p1 * (1 - out));
      }
      for (i = 0; i < 6; i++) { var ph = clamp((lt - L[0] - 3.4 - i * 0.25) / 2.2); dot(g, 50 + Math.sin(ph * 5 + i) * ph * 2, 31.4 - ph * 9, 0.35 + ph * 0.8, 'rgba(200,200,210,0.25)', p1 * (1 - ph) * (ph > 0 ? 1 : 0)); }
      tx(g, '1727 年 3 月', 50, 45, 1.8, DIM, 'center', 700, SANS, p1 * A_(lt, 0.4, 0.8));
      tx(g, '84', 26, 30, 7, NT_OLD, 'center', 900, SANS, A_(lt, L[1], 1.0) * p1);
      tx(g, '岁', 26, 36.5, 2.2, NT_OLD, 'center', 800, SANS, A_(lt, L[1], 1.0) * p1);
    }
    var p2 = A_(lt, L[2] - 0.2, 1.0);
    if (p2 > 0.01) {
      stars(g, 0.6 * p2, lt, 101, 60, 26);
      ground(g, 42, p2, '#22252e', '#0c0d12');
      abbey(g, 50, 42, 1.0, p2);
      chip(g, 50, 11.5, '威斯敏斯特教堂', GOLD, A_(lt, L[2] + 0.3, 0.6) * p2, 'rgba(48,38,12,0.95)');
      var fs = A_(lt, L[3], 0.6) * p2;
      barrow(g, 70, 45, 8.5, fs * (1 - A_(lt, L[4], 0.5)) * 0.85, { col: 'rgba(167,196,232,0.55)' }, lt);
      tx(g, '1677 年葬于此', 70, 32.5, 1.5, DIM, 'center', 600, SANS, fs * (1 - A_(lt, L[4], 0.5)));
      // the procession
      for (i = 0; i < 9; i++) { var px = 6 + i * 3.6 + Math.min(10, (lt - L[2]) * 0.6); extra(g, px, 45, 7.5, p2 * 0.75 * A_(lt, L[2] + 0.4 + i * 0.12, 0.5), { name: '', col: '#5e6474' }, lt); }
      var vo = A_(lt, L[4], 0.6) * p2;
      extra(g, 86, 45, 9.5, vo, { name: '伏尔泰', col: '#c8d4e6', flip: true }, lt);
      tx(g, '法国作家', 86, 31.5, 1.5, DIM, 'center', 600, SANS, vo);
    }
  };

  // ---------- n23: "Nature and Nature's laws lay hid in night ... and all was light" ----------
  DRAW.n23 = function (g, lt, L) {
    var i, A = A_(lt, 0.1, 0.9);
    var light = sm(L[3] - 0.2, L[3] + 1.6, lt), mid = sm(L[2], L[2] + 1.2, lt) * 0.25;
    var lv = Math.max(light, mid);
    // the night sky; dawn floods in on "all was light"
    if (lv > 0.01) {
      g.save(); g.globalAlpha *= lv;
      var gr = g.createLinearGradient(0, 0, 0, 56.25); gr.addColorStop(0, 'rgba(30,50,90,0.0)'); gr.addColorStop(0.5, 'rgba(255,190,110,0.28)'); gr.addColorStop(0.8, 'rgba(255,200,130,0.22)'); gr.addColorStop(1, 'rgba(40,30,20,0.0)');
      g.fillStyle = gr; g.fillRect(0, 0, 100, 56.25); g.restore();
    }
    stars(g, A * (1 - 0.6 * light), lt, 111, 110);
    tx(g, '蒲柏 · 墓志铭', 26, 14, 1.8, DIM, 'center', 700, SANS, A * (1 - light));
    // an apple hanging in the dark; its shadow on the ground holds the orbits of the planets
    var ap = A_(lt, L[1], 1.0);
    var ax = 50, ay = 22 + Math.sin(lt * 0.8) * 0.3;
    ln(g, ax, 10, ax, ay - 1.2, 'rgba(160,140,110,0.5)', 0.12, null, ap);
    apple(g, ax, ay, 1.6, ap * (0.35 + 0.65 * light), 0);
    if (light > 0.01) glow(g, ax - 0.5, ay - 0.6, 6, 'rgba(255,230,180,0.9)', 0.45 * light);
    var sh = A_(lt, L[2] + 0.2, 1.0);
    var gcx = 50, gcy = 40;
    g.save(); g.globalAlpha *= sh * (0.4 + 0.6 * light); g.fillStyle = 'rgba(0,0,0,0.45)'; g.beginPath(); g.ellipse(gcx, gcy, 30, 5.2, 0, 0, TAU); g.fill(); g.restore();
    var orb = [6, 11, 16.5, 23, 29], sp = [1.1, 0.7, 0.45, 0.3, 0.18];
    for (i = 0; i < orb.length; i++) {
      var oa = sh * A_(lt, L[2] + 0.4 + i * 0.2, 0.6) * (0.45 + 0.55 * light);
      ellipsePath(g, gcx, gcy, orb[i], orb[i] * 0.17, light > 0.5 ? 'rgba(255,214,140,0.85)' : 'rgba(242,198,107,0.55)', 0.16, oa);
      var th = lt * sp[i] + i * 1.3; dot(g, gcx + orb[i] * Math.cos(th), gcy + orb[i] * 0.17 * Math.sin(th), 0.45, light > 0.5 ? '#fff2d0' : GOLD, oa);
    }
    dot(g, gcx, gcy, 1.0, '#ffd36b', sh); glow(g, gcx, gcy, 4 + 6 * light, 'rgba(255,200,110,0.9)', 0.5 * sh);
    // rays of light on "all was light"
    if (light > 0.01) {
      g.save(); g.globalCompositeOperation = 'lighter';
      for (i = 0; i < 16; i++) { var t = i / 16 * TAU + lt * 0.05, r1 = 4, r2 = 6 + 20 * light; ln(g, ax + Math.cos(t) * r1, ay + Math.sin(t) * r1, ax + Math.cos(t) * r2, ay + Math.sin(t) * r2, 'rgba(255,225,170,0.5)', 0.22, null, light * 0.55); }
      g.restore();
    }
  };

  // ---------- n24: a child on the seashore; the ocean of truth ----------
  DRAW.n24 = function (g, lt, L) {
    var i, A = A_(lt, 0.1, 1.4);
    // dusk sky
    g.save(); g.globalAlpha *= A; var sk = g.createLinearGradient(0, 0, 0, 30); sk.addColorStop(0, '#0b1426'); sk.addColorStop(1, '#3a3550'); g.fillStyle = sk; g.fillRect(0, 0, 100, 30); g.restore();
    stars(g, 0.5 * A, lt, 121, 50, 22);
    // the ocean to the horizon
    var oc = A * A_(lt, L[0], 1.2);
    g.save(); g.globalAlpha *= oc; var og = g.createLinearGradient(0, 28, 0, 40); og.addColorStop(0, '#1a3554'); og.addColorStop(1, '#0d1d30'); g.fillStyle = og; g.fillRect(0, 28, 100, 12); g.restore();
    for (i = 0; i < 40; i++) {
      var r = rng(i + 3), x = r() * 100, y = 29 + r() * 10, tw = 0.5 + 0.5 * Math.sin(lt * (1 + r()) + i);
      ln(g, x, y, x + 1 + r() * 2, y, 'rgba(200,220,255,0.55)', 0.1, null, oc * tw * (0.3 + (y - 29) / 14));
    }
    // the truth-ocean glows on the last lines
    var tr = A_(lt, L[6], 2.0);
    if (tr > 0.01) { g.save(); g.globalCompositeOperation = 'lighter'; halo(g, 50, 30, 60, 'rgba(255,214,150,0.5)', 0.35 * tr); g.restore();
      for (i = 0; i < 60; i++) { var r2 = rng(i + 50), gx = r2() * 100, gy = 28.5 + r2() * 11; dot(g, gx, gy, 0.12 + r2() * 0.12, '#fff2d0', tr * (0.4 + 0.6 * Math.sin(lt * 2 + i)) * 0.8); } }
    // the beach and the breaking waves
    var sand = A * A_(lt, L[0] + 0.2, 1.2);
    g.save(); g.globalAlpha *= sand; var sg = g.createLinearGradient(0, 38, 0, 56.25); sg.addColorStop(0, '#5c5040'); sg.addColorStop(1, '#2a241c'); g.fillStyle = sg;
    var wv = Math.sin(lt * 0.7) * 1.2;
    g.beginPath(); g.moveTo(0, 41 + wv * 0.4); for (i = 0; i <= 50; i++) g.lineTo(i * 2, 40 + wv + Math.sin(i * 0.5 + lt) * 0.35); g.lineTo(100, 56.25); g.lineTo(0, 56.25); g.closePath(); g.fill(); g.restore();
    g.save(); g.globalAlpha *= sand * 0.7; g.strokeStyle = '#e8eef6'; g.lineWidth = 0.25; g.beginPath(); for (i = 0; i <= 50; i++) { var yy = 40 + wv + Math.sin(i * 0.5 + lt) * 0.35; if (i === 0) g.moveTo(0, yy); else g.lineTo(i * 2, yy); } g.stroke(); g.restore();
    // the child, crouching to pick up a pebble, then a shell
    var ch = A_(lt, L[3] - 0.2, 1.0);
    var kx = 34 + Math.min(8, Math.max(0, lt - L[3]) * 0.9);
    boy(g, kx, 45.5, 7.5, ch, { name: '', walk: lt > L[3] && lt < L[4] ? lt * 5 : null, pose: lt > L[4] ? 'forward' : 'down' }, lt);
    var pb = A_(lt, L[4], 0.6), shl = A_(lt, L[5], 0.6);
    dot(g, kx + 5, 44.6, 0.55, '#dcd6cc', pb); glow(g, kx + 5, 44.6, 2.2, 'rgba(255,240,210,0.9)', 0.6 * pb * (0.6 + 0.4 * Math.sin(lt * 3)));
    if (shl > 0.01) {
      g.save(); g.globalAlpha *= shl; g.translate(kx + 8.5, 44.8); g.fillStyle = '#f4d4c0'; g.beginPath(); g.moveTo(0, 0.6); g.lineTo(-1.1, -0.6); g.quadraticCurveTo(0, -1.4, 1.1, -0.6); g.closePath(); g.fill();
      g.strokeStyle = 'rgba(160,110,90,0.7)'; g.lineWidth = 0.08; for (i = -2; i <= 2; i++) { g.beginPath(); g.moveTo(0, 0.6); g.lineTo(i * 0.45, -0.95); g.stroke(); } g.restore();
      glow(g, kx + 8.5, 44.4, 2.2, 'rgba(255,220,200,0.9)', 0.5 * shl);
    }
  };
