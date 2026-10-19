  // ================= Faraday: scenes d17-d25 =================
  var FL_N = [57, 27], FL_S = [43, 27];
  var FLINES = traceLines(FL_N[0], FL_N[1], FL_S[0], FL_S[1], 18, [6, 94, 7, 43]);
  var FILINGS = (function () { var r = rng(41), P = [], i; for (i = 0; i < 520; i++) { var x = 8 + r() * 84, y = 8.5 + r() * 34; if (Math.abs(x - 50) < 9 && Math.abs(y - 27) < 3) continue; var b = dipB(x, y, FL_N[0], FL_N[1], FL_S[0], FL_S[1]); P.push([x, y, Math.atan2(b[1], b[0]), r() * TAU, Math.min(1, Math.hypot(b[0], b[1]) * 9)]); } return P; })();
  // ---------- d17: iron filings ----------
  DRAW.d17 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8);
    var sp = A_(lt, L[0] + 0.3, 1.2), al = eio(pr(lt, L[1] + 0.2, 1.4));
    rbox(g, 6, 7, 88, 36.5, 0.6, 'rgba(238,230,210,0.25)', 0.15, 'rgba(236,226,204,0.08)', A);
    for (i = 0; i < FILINGS.length; i++) {
      var f = FILINGS[i], a = sp * A_(lt, L[0] + 0.3 + (i % 40) * 0.025, 0.4);
      if (a <= 0.01) continue;
      var an = mix(f[3], f[2], al) + (1 - al) * 0.1 * Math.sin(lt * 20 + i), l = 0.9;
      ln(g, f[0] - Math.cos(an) * l, f[1] - Math.sin(an) * l, f[0] + Math.cos(an) * l, f[1] + Math.sin(an) * l, 'rgba(200,205,215,' + (0.35 + 0.5 * f[4]) + ')', 0.2, null, a);
    }
    barMag(g, 50, 27, 18, 4.6, 0, A);
    var fl = A_(lt, L[5], 1.4);
    for (i = 0; i < FLINES.length; i++) { drawPath(g, FLINES[i], 'rgba(242,198,107,0.8)', 0.3, fl, eio(pr(lt, L[5] + i * 0.05, 1.4))); }
    chip(g, 50, 46, '别人看到图案', DIM, A_(lt, L[3], 0.6) * (1 - A_(lt, L[5], 0.5)));
    chip(g, 50, 46, '他看到：空间里布满了“力线”', GOLD, A_(lt, L[5], 0.6), 'rgba(48,38,12,0.95)');
  };

  // ---------- d18: the field ----------
  DRAW.d18 = function (g, lt, L) {
    var i, j, A = A_(lt, 0.2, 0.8), x1 = 24, x2 = 76, y = 27;
    var wig = A_(lt, L[4], 0.3) * Math.sin((lt - L[4]) * 8) * pulse(lt, L[4], 1.5) * 1.6;
    chg(g, x1, y + wig, 2.4, 1, A); chg(g, x2, y, 2.4, -1, A);
    var jump = A_(lt, L[1], 0.6) * (1 - A_(lt, L[3], 0.6));
    if (jump > 0.01) {
      g.save(); g.globalAlpha *= jump; g.strokeStyle = DIM; g.lineWidth = 0.3; g.setLineDash([0.8, 0.8]); g.beginPath(); g.moveTo(x1 + 4, y - 3); g.quadraticCurveTo(50, y - 14, x2 - 4, y - 3); g.stroke(); g.restore();
      chip(g, 50, 10, '隔着空间，直接起作用？', DIM, jump);
      var no = A_(lt, L[2], 0.5);
      ln(g, 46, 14, 54, 20, RED, 0.6, null, no * jump); ln(g, 54, 14, 46, 20, RED, 0.6, null, no * jump);
    }
    // field arrows filling space
    var fa = A_(lt, L[3], 1.0);
    if (fa > 0.01) {
      for (j = 0; j < 6; j++) for (i = 0; i < 13; i++) {
        var px = 10 + i * 6.7, py = 9 + j * 6;
        if (Math.hypot(px - x1, py - y) < 4 || Math.hypot(px - x2, py - y) < 4) continue;
        var b = dipB(px, py, x1, y, x2, y), an = Math.atan2(b[1], b[0]), m = Math.min(1, Math.hypot(b[0], b[1]) * 300);
        var aa = fa * A_(lt, L[3] + (Math.hypot(px - 50, py - 27)) * 0.025, 0.5) * (0.35 + 0.65 * m);
        // a ripple from the wiggling charge
        var rr = (lt - L[4]) * 14, dd = Math.hypot(px - x1, py - y), rp = lt > L[4] ? Math.exp(-Math.pow((dd - rr) / 3, 2)) : 0;
        ln(g, px - Math.cos(an) * 1.4, py - Math.sin(an) * 1.4, px + Math.cos(an) * 1.4, py + Math.sin(an) * 1.4, rp > 0.3 ? GOLD : ICE, 0.22 + 0.25 * rp, null, Math.min(1, aa + rp));
        arrowHead(g, px + Math.cos(an) * 1.4, py + Math.sin(an) * 1.4, an, 0.6, rp > 0.3 ? GOLD : ICE, Math.min(1, aa + rp));
      }
      chip(g, 50, 46.5, '一点一点传过去', GOLD, A_(lt, L[4], 0.6) * (1 - A_(lt, L[5], 0.5)), 'rgba(48,38,12,0.95)');
    }
    var fw = A_(lt, L[5], 0.8);
    glow(g, 50, 46.5, 10, 'rgba(242,198,107,0.9)', 0.3 * fw);
    tx(g, '场', 50, 46.5, 4.6, GOLD, 'center', 900, SANS, fw);
  };

  // ---------- d19: magnetism turns light ----------
  DRAW.d19 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8), y = 27;
    chip(g, 50, 7, '1845', GOLD, A_(lt, L[0], 0.6), 'rgba(48,38,12,0.95)');
    // a block of heavy glass (isometric)
    var ga = A_(lt, L[1] - 0.2, 0.8);
    if (true) { g.save(); g.globalAlpha *= 0.85; isoBlock(g, 50, y - 4, 9, 8, { s1: [200, 225, 240], s2: [120, 160, 190], s3: [70, 100, 130] }, ga * 0.75, true); g.restore(); }
    tx(g, '玻璃', 50, 39.5, 1.9, DIM, 'center', 700, SANS, ga);
    // light beam with its vibration direction
    var on = A_(lt, L[2], 0.8), rot = 0.75 * on;
    ln(g, 8, y, 92, y, 'rgba(255,240,200,0.6)', 0.5, null, ga);
    for (i = 0; i < 6; i++) {
      var x = 14 + i * 5.5, ph = Math.sin(lt * 6 - i);
      ln(g, x, y - 3.2 * ph, x, y + 3.2 * ph, '#fff0c8', 0.3, null, ga * 0.8);
    }
    for (i = 0; i < 6; i++) {
      var x2 = 64 + i * 5.2, ph2 = Math.sin(lt * 6 - i - 3), dx = Math.sin(rot) * 3.2 * ph2, dy = Math.cos(rot) * 3.2 * ph2;
      ln(g, x2 - dx, y - dy, x2 + dx, y + dy, rot > 0.1 ? GOLD : '#fff0c8', 0.3, null, ga * 0.8);
    }
    // magnet poles along the beam
    barMag(g, 32, 37.5, 7, 2.6, 0, on, false); barMag(g, 68, 37.5, 7, 2.6, 0, on, false);
    tx(g, '加上磁场', 50, 44, 2.0, NRED, 'center', 800, SANS, on);
    var an = A_(lt, L[3], 0.6);
    if (an > 0.01) { arcl(g, 88, y, 5, -Math.PI / 2, -Math.PI / 2 + rot, GOLD, 0.3, an); tx(g, '转了一个角度', 82, 17, 1.9, GOLD, 'center', 800, SANS, an); }
    chip(g, 50, 13, '光  ↔  磁', GOLD, A_(lt, L[4], 0.7), 'rgba(48,38,12,0.95)');
  };

  // ---------- d20: no equations ----------
  DRAW.d20 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8);
    rbox(g, 22, 9, 30, 34, 0.6, null, 0, 'rgba(236,226,204,0.93)', A);
    for (i = 0; i < 4; i++) ln(g, 25, 12 + i * 1.6, 49, 12 + i * 1.6, 'rgba(90,70,50,0.4)', 0.14, null, A);
    // sketches: a coil, a ring, field lines
    var sk = A_(lt, L[2], 0.8);
    g.save(); g.globalAlpha *= sk; g.strokeStyle = 'rgba(70,50,30,0.8)'; g.lineWidth = 0.25;
    g.beginPath(); g.arc(30, 25, 4, 0, TAU); g.stroke();
    for (i = 0; i < 5; i++) { g.beginPath(); g.ellipse(39 + i * 1.6, 25, 0.6, 2.4, 0, 0, TAU); g.stroke(); }
    for (i = 0; i < 4; i++) { g.beginPath(); g.ellipse(37, 35, 6 + i * 2, 1.4 + i * 1.1, 0, Math.PI, TAU); g.stroke(); }
    g.restore();
    tx(g, '实验 + 图', 37, 46, 2.0, FG, 'center', 800, SANS, sk);
    var eq = A_(lt, L[1], 0.7);
    rbox(g, 58, 9, 24, 34, 0.6, 'rgba(238,242,248,0.25)', 0.18, 'rgba(255,255,255,0.03)', eq);
    tx(g, '方程？', 70, 24, 3.6, DIM, 'center', 900, SANS, eq); tx(g, '几乎没有', 70, 30, 2.0, DIM, 'center', 700, SANS, eq);
    chip(g, 70, 46, '不少人看不上', HOT, A_(lt, L[3], 0.6), 'rgba(50,24,18,0.95)');
  };

  // ---------- d21: Maxwell writes it down ----------
  DRAW.d21 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8);
    chip(g, 50, 7, '1831  →  1865', GOLD, A_(lt, L[0], 0.6) * (1 - A_(lt, L[2], 0.5)), 'rgba(48,38,12,0.95)');
    var eqA = A_(lt, L[1], 0.8) * (1 - A_(lt, L[2] + 0.4, 0.6));
    if (eqA > 0.01) {
      for (i = 0; i < FLINES.length; i += 2) drawPath(g, FLINES[i], 'rgba(242,198,107,0.35)', 0.25, eqA * (1 - A_(lt, L[1] + 0.8, 0.8)), 1);
      var E = ['∇ · E = ρ / ε₀', '∇ · B = 0', '∇ × E = − ∂B / ∂t', '∇ × B = μ₀J + μ₀ε₀ ∂E / ∂t'];
      for (i = 0; i < 4; i++) tx(g, E[i], 50, 15 + i * 5.2, 2.9, GOLD, 'center', 700, SANS, eqA * A_(lt, L[1] + 0.6 + i * 0.25, 0.6));
      tx(g, '麦克斯韦方程组', 50, 38, 2.0, FG, 'center', 800, SANS, eqA * A_(lt, L[1] + 0.6, 0.6));
    }
    maxwell(g, 12, 44, 13, A * (1 - A_(lt, L[2] + 0.4, 0.6)), { name: '麦克斯韦' }, lt);
    var wv = A_(lt, L[2] + 0.4, 0.8);
    if (wv > 0.01) {
      var y = 26, k = 0.42, sp = lt * 5;
      ln(g, 8, y, 92, y, 'rgba(238,242,248,0.35)', 0.2, null, wv); arrowHead(g, 92, y, 0, 1, 'rgba(238,242,248,0.6)', wv);
      g.save(); g.globalAlpha *= wv; g.lineWidth = 0.4;
      g.strokeStyle = HOT; g.beginPath(); for (i = 0; i <= 160; i++) { var x = 8 + i * 0.52, e = Math.sin(x * k - sp) * 8; if (i === 0) g.moveTo(x, y - e); else g.lineTo(x, y - e); } g.stroke();
      g.strokeStyle = ICE; g.beginPath(); for (i = 0; i <= 160; i++) { var x2 = 8 + i * 0.52, b = Math.sin(x2 * k - sp) * 5; if (i === 0) g.moveTo(x2 + b * 0.7, y + b * 0.45); else g.lineTo(x2 + b * 0.7, y + b * 0.45); } g.stroke();
      g.restore();
      tx(g, '电', 12, 15, 2.0, HOT, 'center', 800, SANS, wv); tx(g, '磁', 14, 33, 2.0, ICE, 'center', 800, SANS, wv);
      chip(g, 50, 7, '速度 ≈ 每秒 30 万公里 = 光速', GOLD, A_(lt, L[3], 0.6) * (1 - A_(lt, L[5], 0.5)), 'rgba(48,38,12,0.95)');
      var lg = A_(lt, L[4], 0.8);
      if (lg > 0.01) {
        var grd = g.createLinearGradient(30, 0, 70, 0); grd.addColorStop(0, '#8a5cff'); grd.addColorStop(0.25, '#4f8cff'); grd.addColorStop(0.45, '#4fd08a'); grd.addColorStop(0.65, '#ffe04f'); grd.addColorStop(0.82, '#ff9a3c'); grd.addColorStop(1, '#ff4f4f');
        g.save(); g.globalAlpha *= lg * (1 - A_(lt, L[5], 0.5)); g.fillStyle = grd; g.fillRect(30, 40, 40, 1.6); g.restore();
        tx(g, '光 = 电磁波', 50, 45, 2.6, FG, 'center', 900, SANS, lg * (1 - A_(lt, L[5], 0.5)));
      }
      var qa = A_(lt, L[5], 0.8);
      tx(g, '“法拉第是一位非常高明的数学家。”', 50, 41.5, 2.6, GOLD, 'center', 800, SANS, qa);
      tx(g, '—— 麦克斯韦', 70, 45.5, 1.9, DIM, 'center', 700, SANS, qa);
    }
  };

  // ---------- d22: a candle for children ----------
  DRAW.d22 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8), cx = 50;
    var big = A_(lt, L[3], 1.0);
    var cs = 1 + 0.5 * big, cy = 34;
    rbox(g, cx - 1.6 * cs, cy - 1, 3.2 * cs, 12, 0.4, null, 0, '#efe6d2', A);
    var fh = 7.5 * cs * (1 + 0.05 * Math.sin(lt * 13) + 0.03 * Math.sin(lt * 7.3)), fw = 2.0 * cs, sw = Math.sin(lt * 3.1) * 0.25 * cs, fb = cy - 1.2;
    glow(g, cx, fb - fh * 0.45, fh * 1.6, 'rgba(255,170,70,0.9)', 0.35 * A);
    g.save(); g.globalAlpha *= A;
    var fg = g.createLinearGradient(0, fb, 0, fb - fh); fg.addColorStop(0, 'rgba(90,140,255,0.85)'); fg.addColorStop(0.18, 'rgba(255,240,200,0.98)'); fg.addColorStop(0.6, 'rgba(255,200,90,0.95)'); fg.addColorStop(1, 'rgba(255,120,40,0.0)');
    g.fillStyle = fg; g.beginPath(); g.moveTo(cx, fb + 0.4); g.bezierCurveTo(cx - fw * 1.3, fb - fh * 0.15, cx - fw * 0.6 + sw, fb - fh * 0.7, cx + sw * 2, fb - fh); g.bezierCurveTo(cx + fw * 0.6 + sw, fb - fh * 0.7, cx + fw * 1.3, fb - fh * 0.15, cx, fb + 0.4); g.fill();
    g.restore();
    flame(g, cx, cy - 1, 3 * cs, 8 * cs, lt, 0.5 * A, 5);
    ln(g, cx, cy - 1, cx, cy - 2.4, '#2a1a10', 0.3, null, A);
    // children in the audience
    var au = A_(lt, L[0], 0.8) * (1 - A_(lt, L[3], 0.6)) + A_(lt, L[5], 0.8);
    faraday(g, 36, 41, 17, A_(lt, 0.3, 0.8), { pose: 'forward', name: '法拉第' }, lt);
    for (i = 0; i < 16; i++) { var x = 12 + i * 5 + (i % 2) * 1.5, y = 44 + (i % 3) * 0.8; dot(g, x, y - 2.2, 1.1, 'rgba(200,190,175,0.7)', au); rbox(g, x - 1.4, y - 1.2, 2.8, 2.4, 0.8, null, 0, 'rgba(200,190,175,0.6)', au); }
    chip(g, 26, 9, '圣诞讲座 · 讲给孩子', GOLD, A_(lt, L[0], 0.6) * (1 - A_(lt, L[3], 0.5)), 'rgba(48,38,12,0.95)');
    chip(g, 74, 9, '他亲自讲了 19 次', GOLD, A_(lt, L[1], 0.6) * (1 - A_(lt, L[3], 0.5)), 'rgba(48,38,12,0.95)');
    chip(g, 50, 9, '《蜡烛的化学史》', FG, A_(lt, L[2], 0.6));
    var lab = A_(lt, L[4], 0.6) * (1 - A_(lt, L[5], 0.5));
    if (lab > 0.01) {
      var parts = [['蜡受热变成蒸气', 66, 30, cx + 1, cy - 4], ['蒸气在边缘燃烧', 68, 22, cx + 3, cy - 10], ['碳粒被烧得发亮', 30, 22, cx - 2, cy - 9]];
      for (i = 0; i < 3; i++) { var p = parts[i], a2 = lab * A_(lt, L[4] + i * 0.35, 0.5); ln(g, p[3], p[4], p[1] + (p[1] > 50 ? -7 : 7), p[2], 'rgba(242,198,107,0.6)', 0.15, null, a2); chip(g, p[1], p[2], p[0], GOLD, a2, 'rgba(48,38,12,0.95)'); }
    }
    chip(g, 50, 16, '今天还在办', ICE, A_(lt, L[5], 0.6));
  };

  // ---------- d23: plain Mr Faraday ----------
  DRAW.d23 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8);
    // a chair of office, twice declined
    var ch = A_(lt, L[0], 0.7);
    if (ch > 0.01) {
      g.save(); g.globalAlpha *= ch; g.fillStyle = '#7a3b2e'; g.fillRect(18, 16, 10, 14); g.fillStyle = '#a0522d'; g.fillRect(17, 28, 12, 3); g.fillStyle = '#5a2a1e'; g.fillRect(18, 31, 1.5, 6); g.fillRect(26.5, 31, 1.5, 6); g.restore();
      tx(g, '会长', 23, 40, 2.0, DIM, 'center', 700, SANS, ch);
      bigX(g, 23, 25, 3, A_(lt, L[0] + 0.6, 0.4)); tx(g, '× 2', 31, 15, 2.2, RED, 'left', 900, SANS, A_(lt, L[0] + 0.8, 0.4));
    }
    var kn = A_(lt, L[1], 0.7);
    if (kn > 0.01) {
      var sx = 50, sy = 24;
      g.save(); g.globalAlpha *= kn; g.fillStyle = GOLD; g.beginPath();
      for (i = 0; i < 16; i++) { var an = i / 16 * TAU - Math.PI / 2, r = i % 2 ? 2.6 : 6; g.lineTo(sx + Math.cos(an) * r, sy + Math.sin(an) * r); } g.closePath(); g.fill(); g.restore();
      tx(g, '爵位', sx, 34, 2.0, DIM, 'center', 700, SANS, kn); bigX(g, sx, sy, 3, A_(lt, L[1] + 0.5, 0.4));
    }
    var qq = A_(lt, L[2], 0.8) * (1 - A_(lt, L[3], 0.6));
    tx(g, '“平凡的法拉第先生”', 50, 42.5, 3.2, GOLD, 'center', 900, SANS, qq);
    var wp = A_(lt, L[4], 0.7);
    if (wp > 0.01) {
      var fx = 78, fy = 28;
      g.save(); g.globalAlpha *= wp; g.strokeStyle = 'rgba(220,235,245,0.75)'; g.lineWidth = 0.5; g.beginPath(); g.moveTo(fx - 1.5, fy - 9); g.lineTo(fx - 1.5, fy - 4); g.lineTo(fx - 6, fy + 5); g.lineTo(fx + 6, fy + 5); g.lineTo(fx + 1.5, fy - 4); g.lineTo(fx + 1.5, fy - 9); g.stroke();
      g.fillStyle = 'rgba(170,210,90,0.55)'; g.beginPath(); g.moveTo(fx - 3.6, fy + 0.8); g.lineTo(fx + 3.6, fy + 0.8); g.lineTo(fx + 5.6, fy + 4.6); g.lineTo(fx - 5.6, fy + 4.6); g.closePath(); g.fill(); g.restore();
      for (i = 0; i < 5; i++) { var p = (lt * 0.4 + i / 5) % 1; halo(g, fx + Math.sin(i * 2 + lt) * 2, fy - 9 - p * 8, 2.2, 'rgba(170,210,90,0.6)', wp * (1 - p)); }
      tx(g, '化学武器', fx, 38, 2.0, DIM, 'center', 700, SANS, wp);
      bigX(g, fx, fy, 4, A_(lt, L[5], 0.4));
      chip(g, fx, 12, '1850年代 · 克里米亚战争', DIM, A_(lt, L[3], 0.6));
      chip(g, fx, 44, '拒绝', RED, A_(lt, L[5], 0.5), 'rgba(50,20,20,0.95)');
    }
  };

  // ---------- d24: farewell ----------
  DRAW.d24 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8);
    chip(g, 50, 7, '1867 · 8 · 25', DIM, A_(lt, L[0], 0.6));
    tx(g, '75 岁', 50, 12.5, 2.4, FG, 'center', 800, SANS, A_(lt, L[1], 0.6));
    // grand abbey silhouette, then the simple stone
    var ab = A_(lt, L[2], 0.8) * (1 - 0.7 * A_(lt, L[3], 0.8));
    if (ab > 0.01) {
      g.save(); g.globalAlpha *= ab * 0.7; g.fillStyle = 'rgba(90,84,110,0.9)';
      g.fillRect(14, 22, 6, 20); g.fillRect(28, 22, 6, 20); g.fillRect(18, 30, 12, 12);
      g.beginPath(); g.moveTo(14, 22); g.lineTo(17, 15); g.lineTo(20, 22); g.closePath(); g.fill(); g.beginPath(); g.moveTo(28, 22); g.lineTo(31, 15); g.lineTo(34, 22); g.closePath(); g.fill();
      g.restore();
      tx(g, '威斯敏斯特教堂', 24, 45, 1.9, DIM, 'center', 700, SANS, ab);
      bigX(g, 24, 30, 3, A_(lt, L[2] + 0.6, 0.4) * ab);
    }
    var st = A_(lt, L[3], 1.0);
    if (st > 0.01) {
      ln(g, 40, 42, 90, 42, 'rgba(98,214,160,0.35)', 0.4, null, st);
      g.save(); g.globalAlpha *= st; g.fillStyle = 'rgba(150,150,160,0.9)'; g.beginPath(); g.moveTo(58, 42); g.lineTo(58, 28); g.quadraticCurveTo(58, 22, 65, 22); g.quadraticCurveTo(72, 22, 72, 28); g.lineTo(72, 42); g.closePath(); g.fill(); g.restore();
      tx(g, 'MICHAEL', 65, 29, 1.6, '#3a3a44', 'center', 800, SANS, st); tx(g, 'FARADAY', 65, 31.6, 1.6, '#3a3a44', 'center', 800, SANS, st);
      tx(g, '1791 – 1867', 65, 35, 1.4, '#3a3a44', 'center', 700, SANS, st);
      tx(g, '海格特公墓', 65, 45, 1.9, DIM, 'center', 700, SANS, st);
      halo(g, 65, 30, 14, 'rgba(255,200,140,0.6)', 0.25 * A_(lt, L[4], 1.2));
    }
  };

  // ---------- d25: three portraits on a wall ----------
  DRAW.d25 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8);
    var un = A_(lt, L[0], 0.7) * (1 - A_(lt, L[1], 0.6));
    if (un > 0.01) {
      ln(g, 40, 26, 47, 26, FG, 0.4, null, un); ln(g, 53, 26, 60, 26, FG, 0.4, null, un);
      ln(g, 47, 20, 47, 32, FG, 0.6, null, un); ln(g, 53, 20, 53, 32, FG, 0.6, null, un);
      tx(g, '法拉  F', 50, 38, 4, GOLD, 'center', 900, SANS, un); tx(g, '电容的单位', 50, 43, 2.0, DIM, 'center', 700, SANS, un);
    }
    var wl = A_(lt, L[1], 0.8) * (1 - A_(lt, L[4] - 0.2, 0.7));
    if (wl > 0.01) {
      var nm = ['牛顿', '麦克斯韦', '法拉第'], xs = [28, 50, 72], ts = [L[2], L[2] + 0.8, L[3]];
      for (i = 0; i < 3; i++) {
        var a = wl * A_(lt, ts[i], 0.6);
        frameBox(g, xs[i], 23, 14, 18, a); if (i === 2) faraday(g, xs[i], 31.4, 14.5, a, {}, lt); else bust(g, xs[i], 26, 1.4, a, 'rgba(200,205,215,0.7)', false);
        tx(g, nm[i], xs[i], 36, 2.2, i === 2 ? GOLD : FG, 'center', 800, SANS, a);
      }
      chip(g, 50, 8, '爱因斯坦的书房', DIM, wl);
      glow(g, 72, 23, 14, 'rgba(242,198,107,0.9)', 0.3 * A_(lt, L[3], 0.8) * wl);
    }
    // back to the beginning: magnet, coil, a needle and the lights of a city
    var cb = A_(lt, L[4], 0.9);
    if (cb > 0.01) {
      var mx = 78 - 16 * eio(pr(lt, L[4] + 0.6, 0.8)), d = 0.8 * pulse(lt, L[4] + 1.2, 0.7);
      coil(g, 58, 22, 13, 6.5, 9, cb, d, 'back'); barMag(g, mx, 22, 11, 3.4, Math.PI, cb); coil(g, 58, 22, 13, 6.5, 9, cb, d, 'front');
      wire(g, [[51.5, 19], [51.5, 15], [30, 15], [30, 18]], cb, d, lt); wire(g, [[64.5, 25], [64.5, 30], [30, 30], [30, 27]], cb, d, lt);
      galv(g, 30, 22, 4.2, d, cb, false);
      cityLights(g, A_(lt, L[5], 1.5), lt, 10, 90, 32, 45, 23);
    }
  };

  // ---------- d26: and much more ----------
  DRAW.d26 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8);
    chip(g, 50, 7, '他还做了……', GOLD, A_(lt, L[0], 0.6), 'rgba(48,38,12,0.95)');
    var C = [[22, 19], [50, 19], [78, 19], [22, 37], [50, 37], [78, 37]];
    function card(k, a, title, year) {
      if (a <= 0.01) return;
      rbox(g, C[k][0] - 12.5, C[k][1] - 7.8, 25, 15.6, 1.0, 'rgba(242,198,107,0.45)', 0.18, 'rgba(20,24,34,0.85)', a);
      tx(g, title, C[k][0], C[k][1] + 5.4, 1.9, FG, 'center', 800, SANS, a);
      if (year) tx(g, year, C[k][0] + 11, C[k][1] - 6.2, 1.5, DIM, 'right', 700, SANS, a);
    }
    // 1. laws of electrolysis: a beaker with two electrodes and bubbles
    var a1 = A_(lt, L[1], 0.6), x = C[0][0], y = C[0][1];
    card(0, a1, '电解定律', '1833');
    if (a1 > 0.01) {
      g.save(); g.globalAlpha *= a1; g.strokeStyle = 'rgba(220,235,245,0.7)'; g.lineWidth = 0.3; g.beginPath(); g.moveTo(x - 6, y - 5); g.lineTo(x - 6, y + 2.5); g.lineTo(x + 6, y + 2.5); g.lineTo(x + 6, y - 5); g.stroke();
      g.fillStyle = 'rgba(110,185,255,0.3)'; g.fillRect(x - 5.8, y - 2.5, 11.6, 4.8); g.restore();
      ln(g, x - 3, y - 6.5, x - 3, y + 1.5, FG, 0.5, null, a1); ln(g, x + 3, y - 6.5, x + 3, y + 1.5, FG, 0.5, null, a1);
      for (i = 0; i < 6; i++) { var p = (lt * 0.8 + i / 6) % 1; dot(g, (i % 2 ? x + 3 : x - 3) + Math.sin(i * 3 + lt * 4) * 0.5, y + 1.2 - p * 3.6, 0.28, '#cfeaff', a1 * (1 - p)); }
    }
    // 2. the words
    var a2 = A_(lt, L[2], 0.6); x = C[1][0]; y = C[1][1];
    card(1, a2, '新名词', '');
    tx(g, '阳极  ·  阴极', x, y - 3, 2.2, GOLD, 'center', 800, SANS, a2); tx(g, '电极  ·  离子', x, y + 0.6, 2.2, GOLD, 'center', 800, SANS, a2);
    // 3. the Faraday cage: sparks outside, calm inside
    var a3 = A_(lt, L[3], 0.6); x = C[2][0]; y = C[2][1];
    card(2, a3, '法拉第笼', '1836');
    if (a3 > 0.01) {
      for (i = 0; i <= 4; i++) { ln(g, x - 5 + i * 2.5, y - 5.5, x - 5 + i * 2.5, y + 2.5, 'rgba(200,210,225,0.7)', 0.18, null, a3); }
      for (i = 0; i <= 3; i++) { ln(g, x - 5, y - 5.5 + i * 2.67, x + 5, y - 5.5 + i * 2.67, 'rgba(200,210,225,0.7)', 0.18, null, a3); }
      var fl = 0.5 + 0.5 * Math.sin(lt * 17);
      ln(g, x - 10, y - 6, x - 7, y - 2, '#ffe1a8', 0.35, null, a3 * fl); ln(g, x - 7, y - 2, x - 8.6, y, '#ffe1a8', 0.35, null, a3 * fl);
      ln(g, x + 10, y - 6, x + 7, y - 3, '#ffe1a8', 0.35, null, a3 * (1 - fl)); ln(g, x + 7, y - 3, x + 8.6, y - 0.5, '#ffe1a8', 0.35, null, a3 * (1 - fl));
      faraday(g, x, y + 2.3, 6, a3, {}, lt);
      chip(g, x, y + 11.5, '电荷只在外表面', DIM, A_(lt, L[4], 0.6) * (1 - A_(lt, L[5], 0.5)));
    }
    // 4. diamagnetism: a drop pushed away from a magnet
    var a4 = A_(lt, L[5], 0.6); x = C[3][0]; y = C[3][1];
    card(3, a4, '抗磁性', '1845');
    if (a4 > 0.01) {
      barMag(g, x - 5, y - 1.5, 8, 2.6, 0, a4, false);
      var push = 2.4 * A_(lt, L[6], 0.8) + 0.25 * Math.sin(lt * 3);
      dot(g, x + 4 + push, y - 1.5, 1.6, 'rgba(150,205,255,0.9)', a4); arrow(g, x + 6.5 + push, y - 1.5, x + 9.5 + push, y - 1.5, ICE, 0.25, A_(lt, L[6], 0.6), 0.6);
    }
    // 5. lighthouse
    var a5 = A_(lt, L[7], 0.6); x = C[4][0]; y = C[4][1];
    card(4, a5, '灯塔照明', '');
    if (a5 > 0.01) {
      g.save(); g.globalAlpha *= a5; g.fillStyle = '#c9cfdb'; g.beginPath(); g.moveTo(x - 2, y + 2.5); g.lineTo(x - 1.2, y - 4); g.lineTo(x + 1.2, y - 4); g.lineTo(x + 2, y + 2.5); g.closePath(); g.fill();
      var bd = Math.sin(lt * 2) * 0.6; g.fillStyle = 'rgba(255,230,160,0.35)'; g.beginPath(); g.moveTo(x, y - 5); g.lineTo(x + 11, y - 7 + bd * 4); g.lineTo(x + 11, y - 3 + bd * 4); g.closePath(); g.fill(); g.restore();
      dot(g, x, y - 5, 0.9, '#ffe7a8', a5);
    }
    // 6. a dirty river
    var a6 = A_(lt, L[7] + 0.5, 0.6); x = C[5][0]; y = C[5][1];
    card(5, a6, '矿难与河流污染', '');
    if (a6 > 0.01) {
      g.save(); g.globalAlpha *= a6; g.strokeStyle = 'rgba(150,140,90,0.85)'; g.lineWidth = 0.5;
      for (i = 0; i < 3; i++) { g.beginPath(); for (var k = 0; k <= 30; k++) { var xx = x - 9 + k * 0.6, yy = y - 4 + i * 2.4 + Math.sin(k * 0.6 + lt * 2 + i) * 0.6; if (k === 0) g.moveTo(xx, yy); else g.lineTo(xx, yy); } g.stroke(); }
      g.restore();
    }
  };
