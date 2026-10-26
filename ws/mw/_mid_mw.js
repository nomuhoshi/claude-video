  // ---------- microwave-oven props ----------
  var SILV = '#c9d4e6', VIO = '#b98cff', GRN = '#7dffb0', GRAPE = '#8fcf5a';
  function bolt(g, x0, y0, x1, y1, t, a, col, w) {                    // a flickering jagged spark
    if (a <= 0) return; var fr = Math.floor(t * 30); g.save(); g.globalAlpha *= a * (0.6 + 0.4 * rnd(fr));
    g.strokeStyle = col || '#ffe9c0'; g.lineWidth = w || 4; g.shadowColor = '#ffb060'; g.shadowBlur = 26; g.beginPath(); g.moveTo(x0, y0);
    var n = 6; for (var i = 1; i < n; i++) { var u = i / n; g.lineTo(x0 + (x1 - x0) * u + (rnd(i * 13 + fr) - 0.5) * 16, y0 + (y1 - y0) * u + (rnd(i * 7 + fr) - 0.5) * 20); }
    g.lineTo(x1, y1); g.stroke(); g.lineWidth = (w || 4) * 0.4; g.strokeStyle = '#ffffff'; g.stroke(); g.restore();
  }
  function flare(g, x, y, r, a, t) {                                   // a hot plasma blob
    if (a <= 0) return; var f = 0.75 + 0.25 * rnd(Math.floor(t * 24)); var gr = g.createRadialGradient(x, y, 0, x, y, r * 2.4 * f);
    g.save(); g.globalAlpha *= a; gr.addColorStop(0, 'rgba(255,255,240,0.95)'); gr.addColorStop(0.25, 'rgba(255,205,120,0.8)'); gr.addColorStop(0.6, 'rgba(255,120,60,0.35)'); gr.addColorStop(1, 'rgba(255,90,40,0)');
    g.fillStyle = gr; g.beginPath(); g.arc(x, y, r * 2.4 * f, 0, 6.29); g.fill(); g.restore();
  }
  function oven(g, cx, cy, w, h, a, inner) {                           // front view; inner() draws inside the window (clipped)
    if (a <= 0) return; g.save(); g.globalAlpha *= a;
    rr(g, cx - w / 2, cy - h / 2, w, h, 16); var gr = g.createLinearGradient(0, cy - h / 2, 0, cy + h / 2); gr.addColorStop(0, '#5f6b85'); gr.addColorStop(1, '#2f3649');
    g.fillStyle = gr; g.shadowColor = 'rgba(0,0,0,0.6)'; g.shadowBlur = 24; g.fill(); g.shadowBlur = 0; g.strokeStyle = 'rgba(200,215,240,0.6)'; g.lineWidth = 3; g.stroke();
    var wx = cx - w / 2 + 22, wy = cy - h / 2 + 22, ww = w - 130, wh = h - 44;
    g.save(); rr(g, wx, wy, ww, wh, 8); g.clip(); var wg = g.createLinearGradient(0, wy, 0, wy + wh); wg.addColorStop(0, '#1e2840'); wg.addColorStop(1, '#0f1626'); g.fillStyle = wg; g.fillRect(wx, wy, ww, wh);
    g.fillStyle = 'rgba(130,160,200,0.28)'; g.beginPath(); g.ellipse(wx + ww / 2, wy + wh - 22, ww * 0.42, 13, 0, 0, 6.29); g.fill();
    if (inner) inner(g, wx, wy, ww, wh); g.restore();
    rr(g, wx, wy, ww, wh, 8); g.strokeStyle = 'rgba(190,208,238,0.6)'; g.lineWidth = 3; g.stroke();
    var px = cx + w / 2 - 92; g.fillStyle = 'rgba(18,24,38,0.85)'; rr(g, px, wy, 70, wh, 8); g.fill();
    g.fillStyle = 'rgba(120,140,175,0.7)'; for (var i = 0; i < 4; i++) g.fillRect(px + 12, wy + 18 + i * 22, 46, 12);
    g.strokeStyle = SILV; g.lineWidth = 3; g.beginPath(); g.arc(px + 35, wy + wh - 52, 24, 0, 6.29); g.stroke(); g.beginPath(); g.moveTo(px + 35, wy + wh - 52); g.lineTo(px + 35, wy + wh - 72); g.stroke();
    g.restore();
  }
  function fork(g, x, y, s, a, rot) {                                  // upright fork; (x, y) = bottom of the handle
    if (a <= 0) return; g.save(); g.globalAlpha *= a; g.translate(x, y); g.rotate(rot || 0); g.scale(s, s);
    var gr = g.createLinearGradient(-24, 0, 24, 0); gr.addColorStop(0, '#6f7c96'); gr.addColorStop(0.45, '#c3cde0'); gr.addColorStop(1, '#627089');
    g.fillStyle = gr; g.shadowColor = 'rgba(190,210,240,0.25)'; g.shadowBlur = 6;
    g.beginPath(); g.moveTo(-6, 0); g.lineTo(-7, -105); g.lineTo(-27, -128); g.lineTo(-27, -142); g.lineTo(27, -142); g.lineTo(27, -128); g.lineTo(7, -105); g.lineTo(6, 0); g.closePath(); g.fill();
    for (var i = 0; i < 4; i++) { var tx = -27 + i * 18; g.fillRect(tx, -196, 9, 58); g.beginPath(); g.moveTo(tx, -196); g.lineTo(tx + 4.5, -204); g.lineTo(tx + 9, -196); g.closePath(); g.fill(); }
    g.restore();
  }
  function forkTip(x, y, s, i) { return [x + (-22.5 + i * 18) * s, y - 204 * s]; }
  function bowl(g, x, y, s, a, t, steam) {                             // a bowl of soup, steam rising
    if (a <= 0) return; g.save(); g.globalAlpha *= a; g.translate(x, y); g.scale(s, s);
    var gr = g.createLinearGradient(0, -60, 0, 50); gr.addColorStop(0, '#dfe6f2'); gr.addColorStop(1, '#8e9ab2');
    g.fillStyle = gr; g.beginPath(); g.moveTo(-90, -50); g.quadraticCurveTo(-80, 50, 0, 52); g.quadraticCurveTo(80, 50, 90, -50); g.closePath(); g.fill();
    g.fillStyle = '#c2763a'; g.beginPath(); g.ellipse(0, -50, 90, 17, 0, 0, 6.29); g.fill(); g.strokeStyle = '#eef3fb'; g.lineWidth = 4; g.stroke();
    if (steam > 0) for (var k = 0; k < 3; k++) { g.strokeStyle = 'rgba(230,236,248,' + (0.5 * steam).toFixed(2) + ')'; g.lineWidth = 5; g.lineCap = 'round'; g.beginPath();
      for (var j = 0; j <= 10; j++) { var u = j / 10, ph = (t * 0.8 + k * 0.33) % 1, yy = -64 - u * 90, xx = -34 + k * 34 + Math.sin(u * 5 + t * 2 + k) * 10; if (j) g.lineTo(xx, yy); else g.moveTo(xx, yy); } g.stroke(); }
    g.restore();
  }
  function mol(g, x, y, s, ang, a, glow) {                             // a water molecule: O (blue) + 2 H; ang rotates it
    if (a <= 0) return; g.save(); g.globalAlpha *= a; g.translate(x, y); g.rotate(ang);
    var bl = 46 * s, th = 0.912;                                       // half of 104.5°
    [[-1], [1]].forEach(function (k) { var hx = Math.sin(th) * bl * k[0], hy = -Math.cos(th) * bl; g.strokeStyle = 'rgba(210,225,250,0.7)'; g.lineWidth = 5 * s; g.beginPath(); g.moveTo(0, 0); g.lineTo(hx, hy); g.stroke(); });
    g.shadowColor = glow || BLUE; g.shadowBlur = 16;
    g.fillStyle = '#4ea0ff'; g.beginPath(); g.arc(0, 0, 26 * s, 0, 6.29); g.fill();
    [[-1], [1]].forEach(function (k) { var hx = Math.sin(th) * bl * k[0], hy = -Math.cos(th) * bl; g.fillStyle = '#eef3fb'; g.beginPath(); g.arc(hx, hy, 15 * s, 0, 6.29); g.fill(); });
    g.shadowBlur = 0; g.restore();
  }
  function grape(g, x, y, r, a, col, trans) {
    if (a <= 0) return; g.save(); g.globalAlpha *= a; var gr = g.createRadialGradient(x - r * 0.35, y - r * 0.35, 2, x, y, r);
    if (trans) { gr.addColorStop(0, 'rgba(210,235,255,0.9)'); gr.addColorStop(1, 'rgba(70,130,210,0.55)'); } else { gr.addColorStop(0, '#d6f2a4'); gr.addColorStop(0.55, col || GRAPE); gr.addColorStop(1, '#3f7a28'); }
    g.fillStyle = gr; g.shadowColor = 'rgba(0,0,0,0.5)'; g.shadowBlur = 14; g.beginPath(); g.arc(x, y, r, 0, 6.29); g.fill(); g.shadowBlur = 0;
    g.fillStyle = 'rgba(255,255,255,0.35)'; g.beginPath(); g.ellipse(x - r * 0.35, y - r * 0.4, r * 0.18, r * 0.1, -0.7, 0, 6.29); g.fill(); g.restore();
  }
  function emwave(g, x0, x1, y, amp, a, t, p) {                        // a gold E-field wave running right
    if (a <= 0 || p <= 0) return; var k = 2 * Math.PI / 260;
    g.save(); g.globalAlpha *= a; g.strokeStyle = GOLD; g.lineWidth = 4; g.shadowColor = GOLD; g.shadowBlur = 14; g.beginPath(); var xe = x0 + (x1 - x0) * p;
    for (var x = x0; x <= xe; x += 4) { var v = Math.sin(k * (x - x0) - 4.2 * t) * amp; if (x > x0) g.lineTo(x, y - v); else g.moveTo(x, y - v); } g.stroke(); g.restore();
    line(g, x0, y, x1, y, 'rgba(200,210,230,0.35)', 2, a);
  }
  function dots(g, pts, r, col, a) { if (a <= 0) return; g.save(); g.globalAlpha *= a; g.fillStyle = col; g.shadowColor = col; g.shadowBlur = 8; pts.forEach(function (p) { g.beginPath(); g.arc(p[0], p[1], r, 0, 6.29); g.fill(); }); g.restore(); }

  // ---------- scenes ----------
  var D = {};
  // hook: the same microwaves — the fork sparks, the soup just warms up
  D.h0 = function (g, lt, L) {
    var o1 = ap(lt, 0.3, 0.7), o2 = ap(lt, L[3], 0.6), cy = 610, FS = 1.0;
    oven(g, 1250, cy, 370, 360, o1, function (gg, wx, wy, ww, wh) {
      var f = ap(lt, L[0], 0.5); var fx = wx + ww / 2, fy = wy + wh - 18; fork(gg, fx, fy, FS, f, 0);
      var on = lt > L[2] ? (rnd(Math.floor(lt * 9)) > 0.15 ? 1 : 0.35) * ap(lt, L[2], 0.15) : 0;
      if (on > 0) { for (var i = 0; i < 3; i++) { var p = forkTip(fx, fy, FS, i), q = forkTip(fx, fy, FS, i + 1); bolt(gg, p[0], p[1], q[0], q[1], lt + i * 0.07, on, null, 4); }
        var p0 = forkTip(fx, fy, FS, 0); bolt(gg, p0[0], p0[1], wx + 8, p0[1] - 40, lt + 0.2, on * 0.8, null, 4); var p3 = forkTip(fx, fy, FS, 3); bolt(gg, p3[0], p3[1], wx + ww - 8, p3[1] - 30, lt + 0.4, on * 0.7, null, 3); flare(gg, fx, fy - 200 * FS, 26, on * 0.9, lt); }
    });
    oven(g, 1660, cy, 370, 360, o2, function (gg, wx, wy, ww, wh) {
      bowl(gg, wx + ww / 2, wy + wh - 56, 1.15, ap(lt, L[3] + 0.1, 0.5), lt, ap(lt, L[4], 1.2));
    });
    chip(g, 1250, 850, '叉子', INK, ap(lt, L[0], 0.4), 32); chip(g, 1250, 920, '打火', RED, ap(lt, L[2], 0.3), 32);
    chip(g, 1660, 850, '汤', INK, ap(lt, L[3], 0.4), 32); chip(g, 1660, 920, '慢慢变热', BLUE, ap(lt, L[4], 0.4), 32);
    chip(g, 1455, 380, '同样的微波', GOLD, ap(lt, L[5], 0.4), 38);
  };
  // microwaves heat water: the field flips, the molecule turns, collisions make heat
  D.heat = function (g, lt, L) {
    var w = ap(lt, L[0], 0.5); emwave(g, 1070, 1830, 440, 70, w, lt, eo((lt - L[0]) / 1.2)); chip(g, 1450, 310, '电磁波', GOLD, w, 34);
    var br = ap(lt, L[3], 0.5); if (br > 0) { g.save(); g.globalAlpha *= br; g.strokeStyle = GOLD; g.lineWidth = 3; g.beginPath(); g.moveTo(1070, 548); g.lineTo(1070, 562); g.lineTo(1330, 562); g.lineTo(1330, 548); g.stroke(); g.restore(); txt(g, '波长 ≈ 12 厘米', 1200, 612, 30, GOLD, 'center', br, 900); }
    var nr = ap(lt, L[4], 0.4) * (1 - ap(lt, L[5], 0.4)); if (nr > 0) { chip(g, 1600, 590, '并不是水的“共振点”', RED, nr, 28); }
    var m = ap(lt, L[6], 0.5), sw = lt > L[7] ? lt - L[7] : 0, dr = Math.sin(sw * 2.6), ang = sw > 0 ? 1.25 * Math.sin(sw * 2.6 - 0.8) : 0;
    var cl2 = ap(lt, L[8], 0.5), hot = ap(lt, L[10], 0.6);
    var cx = 1290, cy = 830, tint = hot > 0 ? '#ff7a50' : BLUE;
    if (hot > 0) { var rg = g.createRadialGradient(1500, 830, 10, 1500, 830, 300); rg.addColorStop(0, 'rgba(255,120,60,' + (0.35 * hot).toFixed(2) + ')'); rg.addColorStop(1, 'rgba(255,90,40,0)'); g.fillStyle = rg; g.fillRect(1100, 500, 820, 580); }
    mol(g, cx, cy, 1.9, ang, m, tint);
    if (m > 0) { txt(g, '水分子', cx, cy + 118, 30, BLUE, 'center', m, 900); chip(g, cx, 990, '一头偏正 · 一头偏负', DIM, ap(lt, L[6] + 0.3, 0.4), 24); }
    var ea = ap(lt, L[7], 0.4); if (ea > 0) { var dir = dr >= 0 ? 1 : -1; arrow(g, dir > 0 ? 1130 : 1450, 690, dir > 0 ? 1450 : 1130, 690, GOLD, ea, 1, 0); chip(g, 1290, 650, dir > 0 ? '电场 →' : '电场 ←', GOLD, ea, 26); }
    if (cl2 > 0) { for (var j = 0; j < 6; j++) { var px = 1560 + (j % 3) * 120, py = 780 + Math.floor(j / 3) * 150 + (j % 2) * 20; mol(g, px, py, 0.95, 1.2 * Math.sin(sw * 2.6 - 0.8 + j * 0.7) + (lt > L[9] ? 0.35 * Math.sin(lt * 13 + j * 2) : 0), cl2, tint); } }
    if (lt > L[9] && lt < L[10] + 0.3) for (var c2 = 0; c2 < 6; c2++) { var ph = (lt * 3 + c2 * 0.17) % 1; var ax = 1560 + (rnd(c2 + Math.floor(lt * 3)) - 0.2) * 300, ay = 780 + (rnd(c2 + 9) - 0.2) * 220; glowDot(g, ax, ay, 5, GOLD, (1 - ph) * ap(lt, L[9], 0.3)); }
    if (hot > 0) gtxt(g, '热', 1740, 660, 110, RED, 'center', hot);
  };
  // metal: electrons slosh; a smooth surface reflects; the door screen blocks
  D.metal = function (g, lt, L) {
    var bar = ap(lt, L[1], 0.5) * (1 - ap(lt, L[7], 0.4) * (1 - ap(lt, L[11], 0.5)));
    chip(g, 1450, 330, '金属', SILV, ap(lt, L[0], 0.4) * (1 - ap(lt, L[7], 0.4) * (1 - ap(lt, L[11], 0.4))), 34);
    var ea = ap(lt, L[2], 0.4) * (1 - ap(lt, L[6], 0.4)), sw = lt > L[3] ? lt - L[3] : 0, off = 46 * Math.sin(sw * 2.6);
    if (bar > 0) { g.save(); g.globalAlpha *= bar; rr(g, 1160, 600, 580, 120, 60); var gr = g.createLinearGradient(0, 600, 0, 720); gr.addColorStop(0, '#b3bdd0'); gr.addColorStop(0.5, '#7b879f'); gr.addColorStop(1, '#4a566e'); g.fillStyle = gr; g.shadowColor = 'rgba(170,200,245,0.25)'; g.shadowBlur = 10; g.fill(); g.restore();
      var pts = []; for (var i = 0; i < 7; i++) for (var j = 0; j < 2; j++) pts.push([1230 + i * 83 + off, 635 + j * 50 + (i % 2) * 8]); dots(g, pts, 9, BLUE, bar * ap(lt, L[1] + 0.2, 0.5));
      chip(g, 1450, 780, '自由电子', BLUE, bar * ap(lt, L[1] + 0.3, 0.4) * (1 - ap(lt, L[6], 0.3)), 28); }
    if (ea > 0) { var dir = Math.sin(sw * 2.6) >= 0 ? 1 : -1; arrow(g, dir > 0 ? 1300 : 1600, 480, dir > 0 ? 1600 : 1300, 480, GOLD, ea, 1, 0); chip(g, 1450, 420, dir > 0 ? '电场 →' : '电场 ←', GOLD, ea, 26); }
    var sm = ap(lt, L[5], 0.5) * (1 - ap(lt, L[6], 0.3)); if (sm > 0) { var tp = []; for (var k = 0; k < 15; k++) tp.push([1200 + k * 40, 590]); dots(g, tp, 5, '#ffd27a', sm); chip(g, 1450, 540, '表面光滑 · 电荷铺得很匀', GOLD, sm, 26); }
    var rf = ap(lt, L[6], 0.5) * (1 - ap(lt, L[7], 0.4)); if (rf > 0) { arrow(g, 1120, 440, 1330, 590, GOLD, rf, eo((lt - L[6]) / 0.6), 0); arrow(g, 1330, 590, 1540, 440, BLUE, rf * ap(lt, L[6] + 0.5, 0.3), eo((lt - L[6] - 0.5) / 0.6), 0); chip(g, 1450, 880, '大部分被反射', BLUE, rf, 28); }
    var dr = ap(lt, L[7], 0.6) * (1 - ap(lt, L[11], 0.5)); if (dr > 0) {
      g.save(); g.globalAlpha *= dr; card(g, 1230, 350, 440, 330, SILV, 1); var holes = []; for (var a2 = 0; a2 < 9; a2++) for (var b2 = 0; b2 < 6; b2++) holes.push([1262 + a2 * 46, 384 + b2 * 52]); g.fillStyle = 'rgba(8,12,22,0.95)'; holes.forEach(function (p) { g.beginPath(); g.arc(p[0] + 4, p[1] + 10, 6, 0, 6.29); g.fill(); }); g.restore();
      chip(g, 1450, 310, '炉门上的金属网', SILV, dr, 28);
      var hb = ap(lt, L[8], 0.5); if (hb > 0) { chip(g, 1450, 740, '孔 ≈ 1 毫米', RED, hb, 28); }
      var cm = ap(lt, L[9], 0.5); if (cm > 0) { g.save(); g.globalAlpha *= cm; g.strokeStyle = GOLD; g.lineWidth = 6; g.shadowColor = GOLD; g.shadowBlur = 10; g.beginPath(); g.moveTo(1170, 840); g.lineTo(1650, 840); g.stroke(); g.fillStyle = RED; g.fillRect(1654, 833, 5, 14); g.restore(); txt(g, '波长 12 厘米', 1410, 892, 28, GOLD, 'center', cm, 900); }
      var ou = ap(lt, L[10], 0.4); if (ou > 0) { chip(g, 1450, 950, '微波出不来', RED, ou, 32); arrow(g, 1100, 520, 1210, 520, GOLD, ou, 1, lt * 40); } }
    var ok = ap(lt, L[11], 0.5); if (ok > 0) { g.save(); g.globalAlpha *= ok; g.strokeStyle = GRN; g.shadowColor = GRN; g.shadowBlur = 14; g.lineWidth = 11; g.lineCap = 'round'; g.beginPath(); g.moveTo(1380, 480); g.lineTo(1430, 530); g.lineTo(1520, 420); g.stroke(); g.restore(); }
    chip(g, 1450, 880, '往往不会打火', GRN, ap(lt, L[12], 0.4), 34);
  };
  // sharp tips: charge crowds, the field soars, air breaks down, sparks
  D.tip = function (g, lt, L) {
    var part1 = 1 - ap(lt, L[4], 0.5);
    if (part1 > 0) {
      var cx = 1450, cy = 640, sm = ap(lt, L[0], 0.5), pt = ap(lt, L[1], 0.7), cr = ap(lt, L[2], 0.8), fld = ap(lt, L[3], 0.6);
      g.save(); g.globalAlpha *= part1 * sm;
      var gr = g.createRadialGradient(cx - 40, cy - 40, 10, cx, cy, 190); gr.addColorStop(0, '#b8c2d6'); gr.addColorStop(1, '#4c5870'); g.fillStyle = gr;
      var tipx = cx + 190 + 130 * pt; g.beginPath(); for (var an = 0; an <= 360; an += 3) { var r = 170, a = an / 57.3, x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r; if (an === 0) g.moveTo(x, y); else g.lineTo(x, y); }
      g.fill(); if (pt > 0) { g.beginPath(); g.moveTo(cx + 150, cy - 70); g.lineTo(tipx, cy); g.lineTo(cx + 150, cy + 70); g.closePath(); g.fill(); } g.restore();
      var pts = []; for (var i = 0; i < 18; i++) { var aa = i / 18 * 6.283 + 0.1, rr0 = 150; var x0 = cx + Math.cos(aa) * rr0, y0 = cy + Math.sin(aa) * rr0; var tx = cx + 150 + 140 * pt - 8, ty = cy + (aa > 3.14 ? aa - 6.283 : aa) * 6;
        var mx = x0 + (tx - x0) * cr * (Math.cos(aa) > 0.2 ? 0.9 : 0.15) * 0.8, my = y0 + (ty - y0) * cr * (Math.cos(aa) > 0.2 ? 0.9 : 0.15) * 0.8; pts.push([mx, my]); }
      dots(g, pts, 8, '#ffd27a', part1 * sm);
      chip(g, cx, 380, pt > 0.1 ? '尖角 · 边缘' : '光滑', pt > 0.1 ? RED : INK, part1 * Math.max(sm, 0.01), 32);
      if (cr > 0.3) chip(g, cx, 900, '电荷挤在一起', GOLD, part1 * cr, 28);
      if (fld > 0) { for (var k = 0; k < 4; k++) { var p = ((lt * 0.8) + k / 4) % 1; g.strokeStyle = rgba(RED, 0.7 * (1 - p) * fld * part1); g.lineWidth = 4; g.beginPath(); g.arc(tipx - 6, cy, 24 + p * 120, -1.0, 1.0); g.stroke(); } flare(g, tipx, cy, 18, 0.5 * fld * part1, lt); chip(g, tipx, 520, '电场特别强', RED, fld * part1, 28); }
    }
    var fk = ap(lt, L[4], 0.6) * (1 - ap(lt, L[11], 0.5));
    if (fk > 0) {
      var fx = 1450, fy = 900, s = 2.1; fork(g, fx, fy, s, fk, 0);
      var hl = ap(lt, L[5], 0.5); if (hl > 0) for (var i = 0; i < 4; i++) { var tp = forkTip(fx, fy, s, i); glowDot(g, tp[0], tp[1], 7, RED, hl * fk); }
      chip(g, 1700, 520, '一排尖角', RED, hl * fk, 30);
      var gp = ap(lt, L[6], 0.5); if (gp > 0) { chip(g, 1180, 520, '齿尖 · 缝隙', GOLD, gp * fk, 28); }
      var st = ap(lt, L[7], 0.8); if (st > 0) { for (var i2 = 0; i2 < 4; i2++) { var q = forkTip(fx, fy, s, i2); for (var k2 = 0; k2 < 3; k2++) { var p2 = ((lt * 0.9) + k2 / 3 + i2 * 0.1) % 1; g.strokeStyle = rgba(RED, 0.55 * (1 - p2) * st * fk); g.lineWidth = 3; g.beginPath(); g.arc(q[0], q[1], 16 + p2 * 60, Math.PI * 1.1, Math.PI * 1.9); g.stroke(); } } }
      var ar = ap(lt, L[8], 0.3); if (ar > 0) { var on = lt > L[8] ? (rnd(Math.floor(lt * 9)) > 0.15 ? 1 : 0.4) * ar : 0; for (var i3 = 0; i3 < 3; i3++) { var a1 = forkTip(fx, fy, s, i3), b1 = forkTip(fx, fy, s, i3 + 1); bolt(g, a1[0], a1[1], b1[0], b1[1], lt + i3 * 0.07, on * fk, null, 5); } }
      var pl = ap(lt, L[9], 0.5); if (pl > 0) { var mid = forkTip(fx, fy, s, 1.5); flare(g, mid[0], mid[1] - 10, 30, pl * fk, lt); chip(g, 1180, 400, '空气被击穿 · 等离子体', VIO, pl * fk, 28); }
      var sp = ap(lt, L[10], 0.4); if (sp > 0) chip(g, 1700, 400, '火花', RED, sp * fk, 36);
    }
    var fo = ap(lt, L[11], 0.5); if (fo > 0) {                                     // crumpled foil: tips and creases everywhere
      var cx2 = 1450, cy2 = 640; g.save(); g.globalAlpha *= fo; var pts2 = []; for (var i4 = 0; i4 < 15; i4++) { var an2 = i4 / 15 * 6.283, rr2 = 150 + 70 * rnd(i4 * 3 + 1) * (i4 % 2 ? 1 : 0.5); pts2.push([cx2 + Math.cos(an2) * rr2, cy2 + Math.sin(an2) * rr2 * 0.8]); }
      var fg = g.createLinearGradient(cx2 - 200, cy2 - 150, cx2 + 200, cy2 + 150); fg.addColorStop(0, '#aab5ca'); fg.addColorStop(0.5, '#6c7892'); fg.addColorStop(1, '#bcc6d9'); g.fillStyle = fg; g.strokeStyle = 'rgba(40,50,70,0.6)'; g.lineWidth = 2;
      g.beginPath(); pts2.forEach(function (p, i) { if (i) g.lineTo(p[0], p[1]); else g.moveTo(p[0], p[1]); }); g.closePath(); g.fill(); g.stroke();
      for (var i5 = 0; i5 < 12; i5++) { var u = pts2[(i5 * 5) % 15], v = pts2[(i5 * 7 + 3) % 15]; g.beginPath(); g.moveTo(u[0] * 0.5 + cx2 * 0.5, u[1] * 0.5 + cy2 * 0.5); g.lineTo(v[0] * 0.55 + cx2 * 0.45, v[1] * 0.55 + cy2 * 0.45); g.stroke(); } g.restore();
      var on2 = (rnd(Math.floor(lt * 9)) > 0.2 ? 1 : 0.4) * fo; [0, 3, 6, 9, 12].forEach(function (ix, n) { var p = pts2[ix]; bolt(g, p[0], p[1], p[0] + (p[0] > cx2 ? 34 : -34), p[1] + (n % 2 ? -26 : 26), lt + n * 0.09, on2 * ((n + Math.floor(lt * 5)) % 2 ? 1 : 0.6), null, 4); });
      chip(g, 1450, 380, '皱起来的锡纸', SILV, fo, 32); chip(g, 1450, 920, '到处是尖角和缝隙', RED, ap(lt, L[12], 0.4), 28);
    }
  };
  // grapes: nothing to do with metal — two water balls close together
  D.grape = function (g, lt, L) {
    var gone = 1 - ap(lt, L[12], 0.5);
    chip(g, 1450, 310, '另一种打火', GOLD, ap(lt, L[0], 0.4), 34);
    var nm = ap(lt, L[1], 0.5) * (1 - ap(lt, L[2], 0.5)); if (nm > 0) { fork(g, 1450, 780, 1.4, nm, 0); g.save(); g.globalAlpha *= nm; g.strokeStyle = RED; g.shadowColor = RED; g.shadowBlur = 14; g.lineWidth = 14; g.lineCap = 'round'; g.beginPath(); g.moveTo(1330, 460); g.lineTo(1570, 700); g.moveTo(1570, 460); g.lineTo(1330, 700); g.stroke(); g.restore(); chip(g, 1450, 840, '和金属无关', RED, nm, 30); }
    var gp = ap(lt, L[2], 0.5), bk0 = bk((lt - L[2]) / 0.7);
    if (gp > 0 && gone > 0) { g.save(); g.globalAlpha *= gone; var wet = ap(lt, L[6], 0.6);
      grape(g, 1380, 640 - 40 * (1 - bk0), 76, gp, null, false); grape(g, 1544, 640 - 40 * (1 - bk0), 76, gp, null, false);
      if (wet > 0) { g.save(); g.globalAlpha *= wet * 0.5; g.fillStyle = 'rgba(80,150,255,0.5)'; g.beginPath(); g.arc(1380, 640, 76, 0, 6.29); g.moveTo(1620, 640); g.arc(1544, 640, 76, 0, 6.29); g.fill(); g.restore(); chip(g, 1250, 780, '含水多的小球', BLUE, wet * gone, 26); }
      var of = ap(lt, L[3], 0.4); if (of > 0) { g.save(); g.globalAlpha *= of * 0.7; g.strokeStyle = 'rgba(190,208,238,0.6)'; g.lineWidth = 3; g.setLineDash([16, 10]); rr(g, 1100, 400, 726, 520, 14); g.stroke(); g.restore(); chip(g, 1180, 400, '微波炉里', DIM, of * gone, 26); }
      var hs = ap(lt, L[7], 0.5); if (hs > 0) { arrow(g, 1100, 640, 1290, 640, GOLD, hs, eo((lt - L[7]) / 0.7), lt * 40); arrow(g, 1820, 640, 1630, 640, GOLD, hs, eo((lt - L[7]) / 0.7), lt * 40); chip(g, 1462, 800, '微波聚在缝上', GOLD, hs, 28); }
      var ef = ap(lt, L[8], 0.5); if (ef > 0) { for (var k = 0; k < 4; k++) { var p = ((lt * 0.9) + k / 4) % 1; g.strokeStyle = rgba(RED, 0.7 * (1 - p) * ef); g.lineWidth = 4; g.beginPath(); g.arc(1462, 640, 14 + p * 80, 0, 6.29); g.stroke(); } flare(g, 1462, 640, 12, 0.45 * ef, lt); chip(g, 1462, 470, '电场特别强', RED, ef, 28); }
      var ion = ap(lt, L[9], 0.5); if (ion > 0) { var ip = []; for (var j = 0; j < 8; j++) { var an = j / 8 * 6.283 + lt * 0.8; ip.push([1462 + Math.cos(an) * 46, 640 + Math.sin(an) * 40]); } dots(g, ip, 6, VIO, ion); chip(g, 1700, 520, '钠离子 · 钾离子', VIO, ion, 26); }
      var pl = ap(lt, L[4], 0.2) * (lt > L[4] ? 1 : 0); if (pl > 0) { var fl = (rnd(Math.floor(lt * 9)) > 0.15 ? 1 : 0.45) * pl * (1 - 0.35 * (1 - ap(lt, L[10], 0.4)) * (lt < L[10] ? 1 : 0)); flare(g, 1462, 640, 26 + 20 * ap(lt, L[10], 0.4), fl, lt); if (fl > 0.3) { bolt(g, 1462, 640, 1462 + (rnd(Math.floor(lt * 9)) - 0.5) * 70, 540, lt, fl * 0.8, null, 4); } }
      if (lt > L[10]) gtxt(g, '等离子体', 1700, 700, 54, GOLD, 'center', ap(lt, L[10], 0.4) * gone);
      var gap = ap(lt, L[11], 0.5); if (gap > 0) { g.save(); g.globalAlpha *= gap; g.strokeStyle = GOLD; g.lineWidth = 3; g.beginPath(); g.moveTo(1460, 740); g.lineTo(1464, 740); g.moveTo(1440, 730); g.lineTo(1440, 750); g.moveTo(1484, 730); g.lineTo(1484, 750); g.stroke(); g.restore(); txt(g, '只隔几毫米', 1462, 794, 26, GOLD, 'center', gap * 0.0, 900); chip(g, 1462, 880, '间隔 · 几毫米', GOLD, gap, 26); }
      g.restore(); }
    var hy = ap(lt, L[12], 0.5); if (hy > 0) {
      grape(g, 1368, 640, 62, hy, null, true); grape(g, 1496, 640, 62, hy, null, true);
      var f2 = (rnd(Math.floor(lt * 9)) > 0.15 ? 1 : 0.45) * ap(lt, L[13], 0.3); flare(g, 1432, 640, 20, f2, lt); if (f2 > 0.3) bolt(g, 1432, 640, 1432 + (rnd(Math.floor(lt * 9)) - 0.5) * 60, 560, lt, f2 * 0.8, null, 4);
      chip(g, 1432, 440, '含水的凝胶小球', BLUE, hy, 30); chip(g, 1432, 800, '也一样', GOLD, ap(lt, L[13], 0.4), 34);
    }
    var qs = ap(lt, L[14], 0.5); if (qs > 0) { gtxt(g, '？', 1700, 700, 140, DIM, 'center', qs); chip(g, 1450, 900, '具体机制仍在讨论', DIM, qs, 30); }
  };

