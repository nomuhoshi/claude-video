  // ================= Galileo: scenes g16 .. g21 (house arrest, blindness, Two New Sciences, death, Newton, the Moon) =================
  function villaB(g, x, yb, s, a, lit) {                 // a small dark villa; lit = 0..1 window glow
    if (a <= 0.003) return; g.save(); g.globalAlpha *= a; g.translate(x, yb); g.scale(s, s);
    g.fillStyle = '#3d2f2a'; g.fillRect(-10, -8, 20, 8); g.fillStyle = '#5a2e22'; g.beginPath(); g.moveTo(-11.6, -8); g.lineTo(0, -13.4); g.lineTo(11.6, -8); g.closePath(); g.fill();
    g.fillStyle = '#241a16'; g.fillRect(-1.2, -4.6, 2.4, 4.6);
    for (var i = 0; i < 2; i++) { g.fillStyle = 'rgba(255,205,120,' + (0.25 + 0.65 * lit).toFixed(2) + ')'; g.fillRect(i ? 4.2 : -6.6, -6.4, 2.4, 2.6); }
    g.restore(); if (lit > 0.01) glow(g, x, yb - 4 * s, 7 * s, 'rgba(255,205,120,0.9)', 0.16 * lit * a);
  }
  function convB(g, x, yb, s, a) {
    if (a <= 0.003) return; g.save(); g.globalAlpha *= a; g.translate(x, yb); g.scale(s, s);
    g.fillStyle = '#463c44'; g.fillRect(-10, -9, 20, 9); g.fillStyle = '#3a3038'; g.fillRect(4, -17, 5, 17); g.fillStyle = '#54303a'; g.beginPath(); g.moveTo(3.4, -17); g.lineTo(6.5, -20.6); g.lineTo(9.6, -17); g.closePath(); g.fill();
    g.strokeStyle = '#c9b88a'; g.lineWidth = 0.35; g.beginPath(); g.moveTo(6.5, -20.6); g.lineTo(6.5, -23.4); g.moveTo(5.5, -22.2); g.lineTo(7.5, -22.2); g.stroke();
    g.fillStyle = '#241c24'; g.beginPath(); g.moveTo(-8, 0); g.lineTo(-8, -4.4); g.arc(-6, -4.4, 2, Math.PI, 0); g.lineTo(-4, 0); g.closePath(); g.fill();
    for (var i = 0; i < 2; i++) { g.fillStyle = 'rgba(255,205,120,0.5)'; g.fillRect(-1 + i * 2.8, -6.4, 1.6, 2.4); }
    g.restore();
  }
  function letterFly(g, x0, y0, x1, y1, u, a) {         // a small letter flying along an arc, u = 0..1
    if (u <= 0 || u >= 1 || a <= 0.003) return; var x = x0 + (x1 - x0) * u, y = y0 + (y1 - y0) * u - 5.5 * Math.sin(u * Math.PI);
    g.save(); g.translate(x, y); g.rotate(-0.4 + 0.8 * u); g.globalAlpha *= a; g.fillStyle = 'rgba(190,180,152,0.95)'; g.fillRect(-1.3, -0.9, 2.6, 1.8); g.strokeStyle = 'rgba(100,80,56,0.8)'; g.lineWidth = 0.12; g.beginPath(); g.moveTo(-1.3, -0.9); g.lineTo(0, 0.2); g.lineTo(1.3, -0.9); g.stroke(); g.restore();
  }

  // ---------- g16: Arcetri, the villa and the convent next door ----------
  DRAW.g16 = function (g, lt, L) {
    var gr = A_(lt, 0.1, 1.0); ground(g, 49, gr, '#1d2a22', '#0b1210'); stars(g, 0.45 * gr, lt, 9, 50, 40);
    var va = A_(lt, L[0] - 0.2, 0.9); villaB(g, 30, 49, 1.1, va, 0.8);
    chip(g, 30, 25.6, '软禁', '#ff9d6e', A_(lt, L[0] + 0.5, 0.5), 'rgba(56,30,14,0.92)');
    var wk = A_(lt, L[1], 2.4);
    galileo(g, 6 + 17 * wk, 49.4, 12.5, A_(lt, L[1] - 0.2, 0.6), { old: true, walk: wk < 0.98 ? lt * 7 : null, name: wk > 0.9 ? '伽利略' : '' }, lt);
    chip(g, 30, 29.6, '阿切特里 · 佛罗伦萨郊外', GOLD, A_(lt, L[1] + 0.8, 0.5) * (1 - A_(lt, L[2] - 0.1, 0.4)), 'rgba(48,38,12,0.92)');
    var no = (1 - A_(lt, L[4] - 0.2, 0.5));
    noChip(g, 54, 27.6, '不许出门', A_(lt, L[2] + 0.1, 0.4) * no); noChip(g, 54, 31.6, '不许会客', A_(lt, L[2] + 1.0, 0.4) * no); noChip(g, 54, 35.6, '不许出版新书', A_(lt, L[3] + 0.1, 0.4) * no);
    var fn = A_(lt, L[2], 0.8) * no; if (fn > 0.01) { g.save(); g.globalAlpha *= fn * 0.7; g.strokeStyle = '#8a6a48'; g.lineWidth = 0.3; for (var i = 0; i < 6; i++) { g.beginPath(); g.moveTo(41 + i * 1.6, 49); g.lineTo(41 + i * 1.6, 45.6); g.stroke(); } g.beginPath(); g.moveTo(40.6, 47.2); g.lineTo(50.4, 47.2); g.stroke(); g.restore(); }
    var cv = A_(lt, L[4], 0.9); convB(g, 78, 49, 1.15, cv);
    chip(g, 78, 25.4, '修道院', '#c9b8ff', A_(lt, L[4] + 0.5, 0.5) * (1 - A_(lt, L[5] + 0.4, 0.4)), 'rgba(30,24,52,0.92)');
    var mr = A_(lt, L[5], 0.8), fade = 1 - 0.78 * A_(lt, L[9] + 0.2, 1.2);
    maria(g, 66, 49.4, 12, mr * fade, { name: lt > L[6] ? '玛丽亚 · 切莱斯特' : '' }, lt);
    // letters flying across, then a pile
    var lf = A_(lt, L[7], 0.3);
    if (lf > 0.01 && lt < L[9] + 0.6) for (var k = 0; k < 4; k++) letterFly(g, 66, 42, 38, 43, ((lt - L[7] - k * 0.9) / 1.6), 1);
    var pl = A_(lt, L[8], 0.7) * (1 - A_(lt, L[9] + 1.6, 0.5)); if (pl > 0.01) { for (var j = 0; j < 5; j++) { g.save(); g.translate(46 + j * 0.4, 48 - j * 0.7); g.rotate(-0.1 + j * 0.06); g.globalAlpha *= pl; g.fillStyle = 'rgba(180,170,144,0.95)'; g.fillRect(-1.8, -0.6, 3.6, 1.2); g.restore(); } chip(g, 46, 41.6, '信，保存至今', GOLD, pl, 'rgba(48,38,12,0.92)'); }
    var dd = A_(lt, L[9] + 0.3, 0.6); if (dd > 0.01) { tx(g, '1634', 66, 29.4, 3.2, '#b9a8d8', 'center', 900, MONO, dd); chip(g, 66, 33.6, '她去世了', '#c9b8ff', dd, 'rgba(30,24,52,0.92)'); }
  };

  // ---------- g17: blindness ----------
  DRAW.g17 = function (g, lt, L) {
    var fa = A_(lt, 0.1, 0.9);
    glow(g, 26, 40, 11, 'rgba(255,214,150,0.9)', 0.14 * fa * (1 - 0.6 * A_(lt, L[2], 1.5)));
    galileo(g, 26, 51.2, 24, fa, { old: true, pose: 'forward' }, lt);
    // his sky: it blurs, then it is gone
    var px = 50, py = 28, pw = 44, ph = 21, sky = A_(lt, 0.3, 0.9), blur = 12 * A_(lt, L[0] + 0.6, L[2] - L[0] + 0.5), fadeS = 1 - A_(lt, L[2] + 0.2, 1.8), gone = A_(lt, L[4] - 0.2, 1.6);
    g.save(); g.globalAlpha *= sky; rbox(g, px, py, pw, ph, 0.8, 'rgba(160,180,220,0.35)', 0.14, 'rgba(10,14,28,0.9)', 1); g.restore();
    g.save(); g.beginPath(); if (g.roundRect) g.roundRect(px, py, pw, ph, 0.8); else g.rect(px, py, pw, ph); g.clip();
    try { if (blur > 0.2) g.filter = 'blur(' + blur.toFixed(1) + 'px)'; } catch (e) {}
    var cl = sky * fadeS * (1 - gone);
    stars(g, 0.85 * cl, lt, 5, 70, 56);
    moonDetail(g, 82, 36, 4.4, cl, 1, lt, 0.05); jupiterB(g, 62, 41, 2.7, cl);
    for (var m = 0; m < 4; m++) dot(g, 62 + (m < 2 ? -1 : 1) * (4 + (m % 2) * 2.6), 41 + (m - 1.5) * 0.35, 0.34, '#e8e0c4', cl);
    g.filter = 'none'; g.restore();
    chip(g, 72, 24.4, '1638 年初', FG, A_(lt, L[1] + 0.2, 0.5) * (1 - A_(lt, L[3] - 0.2, 0.4)));
    var bl = A_(lt, L[2] + 0.4, 0.7) * (1 - A_(lt, L[3] - 0.2, 0.4)); if (bl > 0.01) chip(g, 72, 49.4, '完全看不见了', '#ff9d6e', bl, 'rgba(56,30,14,0.92)');
    var ta = A_(lt, L[3] - 0.1, 0.9); if (ta > 0.01) { tripod(g, 42, 48, 6, ta); telescope(g, 43.4, 44.6, 14, -0.5, ta * (1 - 0.5 * gone), { glow: 0.5 * (1 - gone) }); chip(g, 72, 49.4, '第一个把望远镜指向天空的人', GOLD, ta * (1 - A_(lt, L[4], 0.4)), 'rgba(48,38,12,0.92)'); }
    var dk = A_(lt, L[4] + 0.3, 1.3); if (dk > 0.01) tx(g, '再也看不到天空了', 72, 38.6, 2.0, 'rgba(200,210,230,0.75)', 'center', 800, SANS, dk);
  };

  // ---------- g18: the manuscript goes to Holland ----------
  DRAW.g18 = function (g, lt, L) {
    var A = W_(lt, 0.2, L[3] - 0.15, 0.8, 0.6);
    if (A > 0.01) {
      rbox(g, 20, 45.4, 40, 2.2, 0.4, null, 0, '#2a1c15', A); galileo(g, 62, 49.4, 14, A, { old: true, pose: 'forward' }, lt);
      for (var j = 0; j < 5; j++) paper(g, 26 + j * 0.3, 43.6 - j * 0.9, 12, 1.6, A, 'rgba(128,120,100,0.95)');
      quill(g, 42, 42, 2.2, A, -0.9); chip(g, 32, 31.6, '一份书稿', GOLD, A * A_(lt, L[0] + 0.5, 0.5), 'rgba(48,38,12,0.92)');
      var sa = A_(lt, L[1] + 0.3, 0.2); if (sa > 0.01) { var ss = 2.2 - 1.2 * eo(sa); g.save(); g.translate(46, 35); g.scale(ss, ss); stamp2(g, '禁止出版', 0, 0, 3.0, '#ef5b43', sa * A, -0.07); g.restore(); }
      var an = A_(lt, L[2], 0.6); if (an > 0.01) chip(g, 46, 40.2, '以后写的也不行', '#ff9d6e', an * A, 'rgba(56,30,14,0.92)');
    }
    var B = W_(lt, L[3], L[4] + 0.6, 0.7, 0.6);
    if (B > 0.01) {
      var fx = 22, fy = 42, lx = 80, ly = 36, p = A_(lt, L[3] + 0.2, 2.2);
      dot(g, fx, fy, 0.9, '#ffd27a', B); dot(g, lx, ly, 0.9, '#8fd0ff', B); chip(g, fx, fy + 4.4, '佛罗伦萨', GOLD, B, 'rgba(48,38,12,0.92)'); chip(g, lx, ly + 4.4, '荷兰 · 莱顿', '#8fd0ff', B * A_(lt, L[3] + 1.2, 0.5), 'rgba(20,34,56,0.92)');
      g.save(); g.globalAlpha *= B * 0.6; g.strokeStyle = '#c9b88a'; g.lineWidth = 0.25; g.setLineDash([0.8, 0.8]); g.beginPath(); for (var i = 0; i <= 40 * p; i++) { var u = i / 40, x = fx + (lx - fx) * u, y = fy + (ly - fy) * u - 8 * Math.sin(u * Math.PI); if (i === 0) g.moveTo(x, y); else g.lineTo(x, y); } g.stroke(); g.restore();
      var u2 = p, bx = fx + (lx - fx) * u2, by = fy + (ly - fy) * u2 - 8 * Math.sin(u2 * Math.PI); paper(g, bx - 2, by - 1.4, 4, 2.8, B * 0.95, 'rgba(190,180,152,0.95)');
      var yr = A_(lt, L[4] + 0.1, 0.5) * B; if (yr > 0.01) chip(g, 80, 28, '1638 年印出', FG, yr);
    }
    var C = W_(lt, L[4] + 0.7, L[7] - 0.2, 0.9, 0.6);
    if (C > 0.01) {
      tome(g, 50, 37, 14.5, 19, C, '#5a3a22', '两门新科学', '', lt);
      chip(g, 50, 49, '《两门新科学》', GOLD, C * A_(lt, L[5] + 0.2, 0.5), 'rgba(48,38,12,0.92)');
      var ex = A_(lt, L[6], 0.6) * C; if (ex > 0.01) chip(g, 74, 33, '几十年的实验', '#8fd0ff', ex, 'rgba(20,34,56,0.92)');
    }
    var D = W_(lt, L[7], L[8] - 0.1, 0.5, 0.5);
    if (D > 0.01) {
      var o = [A_(lt, L[7] + 0.0, 0.5), A_(lt, L[7] + 0.55, 0.5), A_(lt, L[7] + 1.1, 0.5)] ;
      stoneB(g, 24, 33 + ((lt * 1.1) % 1) * 6, 1.4, o[0] * D, '#8c8470'); stoneB(g, 30, 33 + ((lt * 1.1) % 1) * 6, 0.9, o[0] * D, '#8c8470'); chip(g, 27, 46, '落体', GOLD, o[0] * D, 'rgba(48,38,12,0.92)');
      g.save(); g.globalAlpha *= o[1] * D; g.fillStyle = 'rgba(140,120,90,0.6)'; g.beginPath(); g.moveTo(40, 40); g.lineTo(60, 40); g.lineTo(60, 31); g.closePath(); g.fill(); g.restore(); var bu = (lt * 0.5) % 1; dot(g, 41.4 + 17 * bu * bu, 38.8 - 8.6 * bu * bu, 1.0, '#e6dcc0', o[1] * D); chip(g, 50, 46, '斜面', '#8fd0ff', o[1] * D, 'rgba(20,34,56,0.92)');
      var pa = 0.45 * Math.sin(lt * 3.2); g.save(); g.globalAlpha *= o[2] * D; g.strokeStyle = '#c9b88a'; g.lineWidth = 0.25; g.beginPath(); g.moveTo(66, 29); g.lineTo(80, 29); g.stroke(); g.beginPath(); g.moveTo(73, 29); g.lineTo(73 + 9 * Math.sin(pa), 29 + 9 * Math.cos(pa)); g.stroke(); g.restore(); dot(g, 73 + 9 * Math.sin(pa), 29 + 9 * Math.cos(pa), 1.1, '#ffd27a', o[2] * D); chip(g, 73, 46, '摆', '#7fe0a0', o[2] * D, 'rgba(14,44,30,0.92)');
    }
    var E = A_(lt, L[8] + 0.3, 0.8);
    if (E > 0.01) {
      var pr = A_(lt, L[9] + 0.1, 3.0), x0 = 16, x1 = 84, yb = 47, H = 13, i2, tt;
      ln(g, x0, yb, x1, yb, 'rgba(200,215,240,0.4)', 0.2, null, E);
      g.save(); g.globalAlpha *= E; g.strokeStyle = GOLD; g.lineWidth = 0.4; g.beginPath(); for (i2 = 0; i2 <= 60 * pr; i2++) { tt = i2 / 60; var px = x0 + (x1 - x0) * tt, py = yb - 3 - H * 4 * tt * (1 - tt); if (i2 === 0) g.moveTo(px, py); else g.lineTo(px, py); } g.stroke(); g.restore();
      for (i2 = 1; i2 <= 9; i2++) { tt = i2 / 10; if (tt > pr) break; var qx = x0 + (x1 - x0) * tt, qy = yb - 3 - H * 4 * tt * (1 - tt); ln(g, qx, qy, qx, yb, 'rgba(143,208,255,0.35)', 0.14, [0.5, 0.5], E); dot(g, qx, qy, 0.45, '#8fd0ff', E); }
      var bq = Math.min(1, pr); dot(g, x0 + (x1 - x0) * bq, yb - 3 - H * 4 * bq * (1 - bq), 1.0, '#fff1c8', E * (pr < 1 ? 1 : 0)); chip(g, 50, 26.6, '抛物线', GOLD, E * A_(lt, L[9] + 0.4, 0.6), 'rgba(48,38,12,0.92)');
      chip(g, 50, 51.2, '水平：匀速　竖直：越落越快', '#8fd0ff', E * A_(lt, L[9] + 1.6, 0.6), 'rgba(20,34,56,0.92)');
    }
  };

  // ---------- g19: death, burial, and the late acknowledgement ----------
  DRAW.g19 = function (g, lt, L) {
    var A = W_(lt, 0.2, L[2] - 0.15, 0.8, 0.6);
    if (A > 0.01) {
      ground(g, 49, A, '#1d2a22', '#0b1210'); stars(g, 0.4 * A, lt, 4, 40, 40); villaB(g, 50, 49, 1.15, A, 1 - A_(lt, L[1] + 0.6, 1.6));
      tx(g, '1642.1.8', 50, 26.6, 4.4, GOLD, 'center', 900, MONO, A * A_(lt, L[0], 0.7)); chip(g, 50, 32.4, '七十七岁', '#c9d2e4', A * A_(lt, L[1] + 0.3, 0.5), 'rgba(24,30,44,0.92)');
    }
    var B = W_(lt, L[2], L[6] - 0.15, 0.8, 0.7);
    if (B > 0.01) {
      hallBack(g, B * 0.7, lt); chip(g, 50, 24.4, '圣十字教堂', GOLD, B * A_(lt, L[2] + 0.3, 0.5), 'rgba(48,38,12,0.92)');
      g.save(); g.globalAlpha *= B * A_(lt, L[2] + 0.4, 0.7); rbox(g, 47, 41.6, 12, 7.4, 0.4, 'rgba(200,190,170,0.5)', 0.14, '#3a3530', 1); g.restore(); tx(g, '父亲', 53, 45.4, 1.4, '#e8c98a', 'center', 700, SANS, B * A_(lt, L[2] + 0.6, 0.5));
      var gw = A_(lt, L[2] + 0.9, 0.6) * (1 - A_(lt, L[3] - 0.1, 0.4)); if (gw > 0.01) { g.save(); g.globalAlpha *= B * gw * 0.8; g.strokeStyle = GOLD; g.lineWidth = 0.22; g.setLineDash([0.7, 0.7]); g.strokeRect(34, 44, 8, 4); g.restore(); chip(g, 38, 38.4, '想葬在这里', GOLD, B * gw, 'rgba(48,38,12,0.92)'); }
      var cx = 80 - 42 * A_(lt, L[5] + 0.3, 1.8); var ok = A_(lt, L[3] + 0.1, 0.8);
      g.save(); g.globalAlpha *= B * ok; g.translate(cx, 47.2); g.fillStyle = '#4a3624'; g.beginPath(); g.moveTo(-5, 0); g.lineTo(-3.4, -1.5); g.lineTo(3.4, -1.5); g.lineTo(5, 0); g.lineTo(3.4, 1.5); g.lineTo(-3.4, 1.5); g.closePath(); g.fill(); g.strokeStyle = 'rgba(200,170,120,0.5)'; g.lineWidth = 0.15; g.beginPath(); g.moveTo(-3.4, 0); g.lineTo(3.4, 0); g.stroke(); g.restore();
      chip(g, 80, 40.2, '悄悄安放', '#c9d2e4', B * A_(lt, L[3] + 0.4, 0.5) * (1 - A_(lt, L[4], 0.4)), 'rgba(24,30,44,0.92)');
      var yy = A_(lt, L[4], 0.6) * (1 - A_(lt, L[6] - 0.3, 0.4)); tx(g, '1737', 66, 31.2, 4.2, GOLD, 'center', 900, MONO, B * yy);
      var gt = A_(lt, L[5], 0.9); if (gt > 0.01) { g.save(); g.globalAlpha *= B * gt; var mg = g.createLinearGradient(24, 0, 44, 0); mg.addColorStop(0, '#6e6a62'); mg.addColorStop(1, '#46433e'); g.fillStyle = mg; g.fillRect(22, 38, 22, 11); g.fillStyle = '#5a564e'; g.fillRect(20.4, 36.6, 25.2, 2); g.beginPath(); g.moveTo(26, 38); g.lineTo(33, 31); g.lineTo(40, 38); g.closePath(); g.fill(); g.restore(); chip(g, 33, 52.8, '迁进教堂里的墓', GOLD, B * gt * 0.0, null); }
    }
    var C = A_(lt, L[6] - 0.1, 0.9);
    if (C > 0.01) {
      var X = function (y) { return 14 + (y - 1642) * 0.2286; }, yy2 = 41;
      rbox(g, X(1642), yy2, X(1992) - X(1642), 0.7, 0.35, null, 0, 'rgba(200,215,240,0.25)', C);
      [[1642, '去世', '#93a1b6'], [1737, '迁进墓', GOLD], [1992, '公开承认', '#7fe0a0']].forEach(function (m) { var ma = C * (m[0] === 1992 ? A_(lt, L[6] + 0.3, 0.5) : m[0] === 1737 ? 1 : 1); dot(g, X(m[0]), yy2 + 0.35, 0.8, m[2], ma); tx(g, m[0] + '', X(m[0]), yy2 + 3.2, 1.5, m[2], 'center', 700, MONO, ma); tx(g, m[1], X(m[0]), yy2 + 5.6, 1.3, m[2], 'center', 600, SANS, ma); });
      var qa = A_(lt, L[7], 0.8); if (qa > 0.01) { rbox(g, 28, 24.4, 44, 8.4, 0.8, 'rgba(127,224,160,0.7)', 0.18, 'rgba(14,44,30,0.78)', qa); tx(g, '“当年的处理有错”', 50, 28.6, 2.8, '#9be8b4', 'center', 900, SERIF_, qa); }
    }
  };

  // ---------- g20: Newton is born; inertia; the cannon ----------
  DRAW.g20 = function (g, lt, L) {
    var gr = A_(lt, 0.1, 1.0), i;
    var A = W_(lt, 0.1, L[3] - 0.2, 0.8, 0.7);
    if (A > 0.01) {
      ground(g, 49, A, '#2a3a38', '#101a1a'); stars(g, 0.6 * A, lt, 12, 55, 40);
      for (i = 0; i < 40; i++) { var sx = (i * 37.3) % 100, sy = ((lt * (3 + (i % 5)) + i * 11.7) % 30) + 22; dot(g, sx, sy, 0.16 + (i % 3) * 0.05, '#dfe8ff', 0.5 * A); }
      villaB(g, 30, 49, 0.9, A, 0.9); chip(g, 40, 25.6, '1642 · 圣诞节', '#ff9d6e', A * A_(lt, L[0] + 0.3, 0.5), 'rgba(56,30,14,0.92)');
      baby(g, 66, 42, 2.0, A * A_(lt, L[1] + 0.2, 0.8) * 0.6, lt); chip(g, 66, 49.8, '艾萨克 · 牛顿', GOLD, A * A_(lt, L[2] + 0.1, 0.5), 'rgba(48,38,12,0.92)');
    }
    var B = W_(lt, L[3], L[5] - 0.1, 0.7, 0.5);
    if (B > 0.01) {
      ln(g, 12, 46, 90, 46, 'rgba(200,215,240,0.35)', 0.2, null, B); var p = ((lt - L[3]) * 0.12) % 1, bx = 14 + 72 * Math.min(1, (lt - L[3]) / 8);
      for (i = 0; i < 6; i++) { var gx = bx - i * 6; if (gx > 14) dot(g, gx, 44.6, 1.3, '#e6dcc0', B * (0.4 - i * 0.06)); }
      dot(g, bx, 44.6, 1.3, '#fff1c8', B); arrow(g, bx + 2, 44.6, bx + 12, 44.6, GOLD, 0.35, B * 0.8, 0.9);
      chip(g, 50, 31.6, '惯性', GOLD, B * A_(lt, L[3] + 0.4, 0.5), 'rgba(48,38,12,0.92)'); chip(g, 50, 36.6, '没人推，就一直走下去', '#8fd0ff', B * A_(lt, L[4] + 0.1, 0.5), 'rgba(20,34,56,0.92)');
    }
    var T = W_(lt, L[5], L[6] - 0.15, 0.9, 0.6);
    if (T > 0.01) { tome(g, 50, 37, 14.5, 19, T, '#2a3f66', '数学原理', '', lt); chip(g, 50, 50, '运动第一定律', GOLD, T * A_(lt, L[5] + 0.5, 0.5), 'rgba(48,38,12,0.92)'); }
    var C = A_(lt, L[6], 0.9);
    if (C > 0.01) {
      var cx = 66, cy = 40, R = 7; earthB(g, cx, cy, R, C * 0.8, lt); stars(g, 0.5 * C, lt, 3, 40, 30);
      cannon(g, cx - 0.4, cy - R - 0.2, 1.5, -0.35, C); g.save(); g.globalAlpha *= C; g.fillStyle = '#4a4038'; g.beginPath(); g.moveTo(cx - 3, cy - R + 0.6); g.lineTo(cx, cy - R - 2.2); g.lineTo(cx + 3, cy - R + 0.6); g.closePath(); g.fill(); g.restore();
      var arcs = [[0.45, A_(lt, L[6] + 0.2, 1.4), '#8fd0ff'], [1.5, A_(lt, L[6] + 1.8, 1.8), '#ffd27a'], [TAU, A_(lt, L[7] + 0.4, 2.2), '#ff9d6e']];
      arcs.forEach(function (ar) {
        if (ar[1] <= 0.01) return; g.save(); g.globalAlpha *= C * 0.9; g.strokeStyle = ar[2]; g.lineWidth = 0.3; g.beginPath(); var n = Math.round(80 * ar[1]);
        for (var k = 0; k <= n; k++) { var th = ar[0] * k / 80, rr = ar[0] >= TAU ? R + 3.6 : R + 0.3 + (1.6 + 1.4 * ar[0]) * Math.sin(Math.PI * k / 80), ang = -Math.PI / 2 + th, x = cx + Math.cos(ang) * rr, y = cy + Math.sin(ang) * rr; if (k === 0) g.moveTo(x, y); else g.lineTo(x, y); }
        g.stroke(); g.restore();
      });
      var ob = A_(lt, L[7] + 2.0, 0.6); if (ob > 0.01) { var oa = -Math.PI / 2 + (lt - L[7]) * 1.6; dot(g, cx + Math.cos(oa) * (R + 3.6), cy + Math.sin(oa) * (R + 3.6), 0.8, '#fff1c8', C * ob); halo(g, cx + Math.cos(oa) * (R + 3.6), cy + Math.sin(oa) * (R + 3.6), 2.2, 'rgba(255,230,160,0.9)', 0.5 * C * ob); }
      chip(g, 30, 36.4, '再推快一点', '#ffd27a', C * A_(lt, L[6] + 1.6, 0.6) * (1 - A_(lt, L[7] + 0.4, 0.4)), 'rgba(36,30,12,0.92)');
      chip(g, 30, 36.4, '永远落不了地', '#ff9d6e', C * A_(lt, L[7] + 2.4, 0.6), 'rgba(56,30,14,0.92)');
    }
  };

  // ---------- g21: the hammer and the feather, 1971 ----------
  DRAW.g21 = function (g, lt, L) {
    var gr = A_(lt, 0.1, 1.0), tL = L[5], tr = tL - 1.5;
    stars(g, 0.8 * gr, lt, 6, 90, 46); ground(g, 48.4, gr, '#3b3b42', '#16161c');
    g.save(); g.globalAlpha *= gr * 0.5; g.fillStyle = '#2a2a31'; [[14, 51, 7, 1.0], [30, 53, 5, 0.7], [64, 52, 8, 1.0], [86, 50.6, 5, 0.7], [52, 54, 4, 0.5]].forEach(function (c) { g.beginPath(); g.ellipse(c[0], c[1], c[2], c[3], 0, 0, TAU); g.fill(); }); g.restore();
    var ea = A_(lt, 0.4, 1.0) * (1 - A_(lt, L[6] - 0.2, 0.8)); earthB(g, 18, 29, 3.2, ea, lt);
    var ya = A_(lt, L[0], 0.7) * (1 - A_(lt, L[2] - 0.2, 0.4)); chip(g, 66, 30, '1971 · 阿波罗 15 号', FG, ya);
    var ar = A_(lt, L[2] - 0.2, 0.9) * (1 - 0.65 * A_(lt, tr, 0.3));
    astronaut(g, 44, 48.8, 16, A_(lt, L[1], 0.9) * 0.72, { arm: ar }, lt);
    // hammer (right hand) and feather (left hand)
    var hx = 50.1, hy = 34.4, fx = 38.4, fy = 34.4, d = lt < tr ? 0 : Math.min(1, (lt - tr) / 1.5), fall = d * d;
    var hy2 = hy + (45.8 - hy) * fall, fy2 = fy + (47.4 - fy) * fall, show = A_(lt, L[2], 0.7);
    if (show > 0.01) {
      g.save(); g.globalAlpha *= show; g.translate(hx, hy2); g.rotate(0.15 * fall); g.fillStyle = '#6b4a2e'; g.fillRect(-0.3, -1.0, 0.6, 3.6); g.fillStyle = '#8c93a3'; g.fillRect(-1.5, -2.0, 3.0, 1.3); g.restore();
      g.save(); g.globalAlpha *= show; g.translate(fx, fy2); g.rotate(-0.5 + 0.3 * fall); g.fillStyle = '#cfc6ae'; g.beginPath(); g.ellipse(0, 0.6, 0.55, 2.0, 0, 0, TAU); g.fill(); g.strokeStyle = '#8a8268'; g.lineWidth = 0.1; g.beginPath(); g.moveTo(0, -1.8); g.lineTo(0, 2.8); g.stroke(); g.restore();
    }
    var tt = lt - tL; if (tt > 0 && tt < 1.6) { var u = tt / 1.6; [[hx, 4.2], [fx, 3.2]].forEach(function (q) { g.save(); g.globalAlpha *= 0.5 * (1 - u); g.fillStyle = '#9a9aa4'; g.beginPath(); g.ellipse(q[0], 47.8, q[1] * (0.4 + u), 0.5 + u * 0.8, 0, 0, TAU); g.fill(); g.restore(); }); }
    chip(g, 66, 30, '同时松手', '#ffd27a', A_(lt, L[3], 0.5) * (1 - A_(lt, tr + 0.6, 0.3)), 'rgba(36,30,12,0.92)');
    chip(g, 66, 34.2, '没有空气', '#8fd0ff', A_(lt, L[4], 0.5) * (1 - A_(lt, tL, 0.3)), 'rgba(20,34,56,0.92)');
    chip(g, 66, 30, '一起落地', '#7fe0a0', A_(lt, tL, 0.4) * (1 - A_(lt, L[6] - 0.2, 0.4)), 'rgba(14,44,30,0.92)');
    var mo = A_(lt, L[6], 1.0); if (mo > 0.01) { moonDetail(g, 80, 33, 8, mo, 1, lt, 0.05); chip(g, 80, 44.6, '他看见山和坑的月亮', GOLD, mo * A_(lt, L[6] + 0.6, 0.6), 'rgba(48,38,12,0.92)'); }
  };
