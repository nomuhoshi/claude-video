  // ---------- fy helpers ----------
  var FM = window.FM || {}, FIMG = window.FIMG = {};
  Object.keys(FM).forEach(function (k) { var im = new Image(); im.src = FM[k].src; FIMG[k] = im; });
  var VIO = '#b98cff', GRN = '#7ddba0';
  function fm(g, id, x, y, fs, al, a, p, glow) {        // typeset formula (KaTeX png). fs = font size in px, al = l/c/r, p = left-to-right wipe 0..1
    if (a <= 0 || p <= 0) return; var m = FM[id], im = FIMG[id], s = fs / 64, w = m.w * s, h = m.h * s, x0 = al === 'l' ? x : al === 'r' ? x - w : x - w / 2;
    g.save(); g.globalAlpha *= a; if (p < 1) { g.beginPath(); g.rect(x0 - 6, y - h / 2 - 6, (w + 12) * p, h + 12); g.clip(); }
    g.shadowColor = glow || 'rgba(255,244,222,0.34)'; g.shadowBlur = glow ? 24 : 7; g.drawImage(im, x0, y - h / 2, w, h); g.restore();
  }
  function fw(id, fs) { return FM[id].w * fs / 64; }
  function fbox(g, x, y, w, h, col, a, p) {               // thin frame that draws itself
    if (a <= 0) return; p = p == null ? 1 : p; if (p <= 0) return; g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = 3; g.shadowColor = col; g.shadowBlur = 14;
    rr(g, x, y, w, h, 10); g.setLineDash([2 * (w + h) * p, 2 * (w + h)]); g.stroke(); g.setLineDash([]); g.restore();
  }
  function cross(g, x, y, r, col, a, p) {                  // a red X
    if (a <= 0 || p <= 0) return; g.save(); g.globalAlpha *= a; g.strokeStyle = col || RED; g.lineWidth = 7; g.shadowColor = col || RED; g.shadowBlur = 14; g.lineCap = 'round';
    g.beginPath(); g.moveTo(x - r, y - r); g.lineTo(x - r + 2 * r * Math.min(1, p * 2), y - r + 2 * r * Math.min(1, p * 2)); g.stroke();
    if (p > 0.5) { g.beginPath(); g.moveTo(x + r, y - r); g.lineTo(x + r - 2 * r * (p - 0.5) * 2, y - r + 2 * r * (p - 0.5) * 2); g.stroke(); } g.restore();
  }
  function strike(g, x0, x1, y, a, p) { if (a <= 0 || p <= 0) return; g.save(); g.globalAlpha *= a; g.strokeStyle = RED; g.lineWidth = 6; g.shadowColor = RED; g.shadowBlur = 12; g.beginPath(); g.moveTo(x0, y); g.lineTo(x0 + (x1 - x0) * p, y); g.stroke(); g.restore(); }
  function wavy(g, x0, y0, x1, y1, amp, wl, col, a, p, ph) {   // photon line
    if (a <= 0 || p <= 0) return; var L = Math.hypot(x1 - x0, y1 - y0), ux = (x1 - x0) / L, uy = (y1 - y0) / L, nx = -uy, ny = ux, n = Math.max(2, Math.floor(L * p / 3));
    g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = 3.5; g.shadowColor = col; g.shadowBlur = 10; g.beginPath();
    for (var i = 0; i <= n; i++) { var d = L * p * i / n, w = Math.sin(d / wl * 6.283 + (ph || 0)) * amp; g.lineTo(x0 + ux * d + nx * w, y0 + uy * d + ny * w); } g.stroke(); g.restore();
  }
  function aline(g, x0, y0, x1, y1, col, a, p, lw, head) {     // straight line growing with p, optional arrow head at the tip (head=true)
    if (a <= 0 || p <= 0) return; var x = x0 + (x1 - x0) * p, y = y0 + (y1 - y0) * p; g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.fillStyle = col; g.lineWidth = lw || 3.5; g.shadowColor = col; g.shadowBlur = 10; g.lineCap = 'round';
    g.beginPath(); g.moveTo(x0, y0); g.lineTo(x, y); g.stroke();
    if (head) { var an = Math.atan2(y1 - y0, x1 - x0), s = 14 + (lw || 3.5) * 1.5; g.beginPath(); g.moveTo(x, y); g.lineTo(x - s * Math.cos(an - 0.42), y - s * Math.sin(an - 0.42)); g.lineTo(x - s * Math.cos(an + 0.42), y - s * Math.sin(an + 0.42)); g.closePath(); g.fill(); } g.restore();
  }
  function plabel(g, s, x, y, size, col, al, a) { txt(g, s, x, y, size, col, al, a, 700); }
  function axes2(g, x, y, w, h, xl, yl, a, p) {                // origin bottom-left (x,y); w right, h up
    if (a <= 0) return; p = p == null ? 1 : p; g.save(); g.globalAlpha *= a; g.strokeStyle = 'rgba(200,210,230,0.6)'; g.lineWidth = 2.5; g.beginPath(); g.moveTo(x, y); g.lineTo(x, y - h * p); g.moveTo(x, y); g.lineTo(x + w * p, y); g.stroke();
    g.fillStyle = 'rgba(200,210,230,0.7)'; g.beginPath(); g.moveTo(x + w * p, y); g.lineTo(x + w * p - 12, y - 6); g.lineTo(x + w * p - 12, y + 6); g.fill(); g.beginPath(); g.moveTo(x, y - h * p); g.lineTo(x - 6, y - h * p + 12); g.lineTo(x + 6, y - h * p + 12); g.fill(); g.restore();
    if (p > 0.9) { txt(g, xl, x + w + 8, y + 36, 24, DIM, 'right', a, 700); txt(g, yl, x - 12, y - h - 14, 24, DIM, 'left', a, 700); }
  }
  function qcard(g, x, y, w, h, col, num, s, a) {              // a numbered question card
    if (a <= 0) return; card(g, x, y, w, h, col, a); g.save(); g.globalAlpha *= a; g.fillStyle = col; g.shadowColor = col; g.shadowBlur = 16; g.font = '900 56px ' + SERIF; g.textAlign = 'center'; g.fillText(num, x + 54, y + h / 2 + 20);
    g.shadowBlur = 0; g.fillStyle = INK; g.font = '700 33px ' + SERIF; g.textAlign = 'left'; g.fillText(s, x + 108, y + h / 2 + 12); g.restore();
  }
  // ---------- scenes ----------
  var D = {};
  // hook: the fan of paths from A to B behind the title; the unsolved goal gets stamped
  D.h0 = function (g, lt, L) {
    var a = ap(lt, 0.2, 1.0), A = [1180, 840], B = [1790, 330];
    for (var k = 0; k < 46; k++) {
      var ph = rnd(k + 3) * 6.283, am = (rnd(k + 9) - 0.5) * 2, m2 = 1 + Math.floor(rnd(k + 20) * 2); g.save(); g.globalAlpha *= a * 0.5 * (0.35 + 0.65 * rnd(k + 40)); g.strokeStyle = rgba(BLUE, 1); g.lineWidth = 1.6; g.beginPath();
      for (var i = 0; i <= 60; i++) { var u = i / 60, x = A[0] + (B[0] - A[0]) * u, y = A[1] + (B[1] - A[1]) * u, bump = Math.sin(u * Math.PI) * (110 + 70 * rnd(k + 60)) * am * (0.8 + 0.2 * Math.sin(lt * 0.9 + ph)) + Math.sin(u * Math.PI * m2 * 2 + ph) * 18 * Math.sin(u * Math.PI);
        g.lineTo(x + bump * 0.7, y + bump * 0.7); } g.stroke(); g.restore();
    }
    g.save(); g.globalAlpha *= a; g.strokeStyle = GOLD; g.lineWidth = 4; g.shadowColor = GOLD; g.shadowBlur = 14; g.beginPath(); g.moveTo(A[0], A[1]); g.lineTo(B[0], B[1]); g.stroke(); g.restore();
    glowDot(g, A[0], A[1], 8, GOLD, a); glowDot(g, B[0], B[1], 8, GOLD, a); plabel(g, 'A', A[0] - 26, A[1] + 12, 34, GOLD, 'center', a); plabel(g, 'B', B[0] + 30, B[1] - 6, 34, GOLD, 'center', a);
    fm(g, 'hero', 1500, 190, 70, 'c', ap(lt, 0.6, 0.8) * 0.9, E((lt - 0.6) / 1.4), rgba(GOLD, 0.5));
    var c1 = ap(lt, L[3], 0.5); if (c1 > 0) { card(g, 1130, 470, 700, 120, GOLD, c1 * (1 - 0.0)); txt(g, '最初的目标', 1480, 520, 28, DIM, 'center', c1, 700); txt(g, '消除电动力学里的无穷大', 1480, 565, 38, INK, 'center', c1, 900); }
    var st = lt - L[4]; if (st > 0) { var k2 = st < 0.14 ? 1.7 - 0.7 * eo(st / 0.14) : 1; g.save(); g.translate(1640, 650); g.rotate(-0.1); g.scale(k2, k2); g.globalAlpha *= Math.min(1, st / 0.05); g.font = '900 56px ' + SERIF; g.textAlign = 'center'; g.strokeStyle = '#d8382a'; g.lineWidth = 7; var w2 = g.measureText('未实现').width + 50; g.strokeRect(-w2 / 2, -46, w2, 78);
      g.fillStyle = '#e04434'; g.shadowColor = RED; g.shadowBlur = 16; g.fillText('未实现', 0, 14); g.restore(); }
    var nm = lt - L[5]; if (nm > 0) { var kk = nm < 0.16 ? 2 - 1.0 * eo(nm / 0.16) : 1 + 0.01 * (nm - 0.16); g.save(); g.globalAlpha *= Math.min(1, nm / 0.05); g.translate(1480, 840); g.scale(kk, kk); g.textAlign = 'center'; g.font = '900 150px ' + SERIF; g.fillStyle = '#f6dfae'; g.shadowColor = 'rgba(240,180,80,0.9)'; g.shadowBlur = 40;
      if (g.letterSpacing !== undefined) g.letterSpacing = '30px'; g.fillText('费曼', 15, 0); if (g.letterSpacing !== undefined) g.letterSpacing = '0px'; g.restore(); }
    var tt = ap(lt, L[0] + 0.3, 0.8); if (tt > 0) { txt(g, '诺贝尔物理学奖演讲 · 1965', 1480, 90, 26, GOLD, 'center', tt * 0.9, 700);
      mono(g, 'The Development of the Space-Time View', 1480, 925, 20, DIM, 'center', tt * 0.85); mono(g, 'of Quantum Electrodynamics', 1480, 953, 20, DIM, 'center', tt * 0.85); }
  };
  // roadmap: three questions, two prerequisites
  D.road = function (g, lt, L) {
    var qs = [['1', '为什么要有不同的数学描述？', GOLD], ['2', '为什么要把所有路径都算上？', BLUE], ['3', '诺奖级的工作，为何仍有没解决的问题？', RED]];
    qs.forEach(function (q, k) { var p = ap(lt, L[4 + k], 0.5); qcard(g, 1090 + (1 - p) * 60, 190 + k * 150, 730, 112, q[2], q[0], q[1], p); });
    var c0 = ap(lt, L[7], 0.5); txt(g, '预备知识', 130, 640, 30, DIM, 'left', c0, 700);
    var p1 = ap(lt, L[8], 0.5); card(g, 112, 680, 520, 250, BLUE, p1); fm(g, 'Lag', 372, 780, 50, 'c', p1, E((lt - L[8] - 0.2) / 0.8)); fm(g, 'Sx', 372, 880, 52, 'c', p1, E((lt - L[8] - 0.8) / 0.8)); txt(g, '拉格朗日量与作用量', 372, 718, 24, BLUE, 'center', p1, 700);
    var p2 = ap(lt, L[9], 0.5); card(g, 672, 680, 420, 250, GOLD, p2); fm(g, 'sch', 882, 800, 58, 'c', p2, E((lt - L[9] - 0.2) / 0.8)); txt(g, '薛定谔方程', 882, 718, 24, GOLD, 'center', p2, 700);
  };
  // Dirac's last sentence
  D.dirac = function (g, lt, L) {
    var a = ap(lt, L[1], 0.7);                                   // the book
    if (a > 0) { g.save(); g.globalAlpha *= a; g.translate(1530, 400); var gr = g.createLinearGradient(-150, 0, 150, 0); gr.addColorStop(0, '#3a2112'); gr.addColorStop(0.5, '#5a3820'); gr.addColorStop(1, '#2a180c');
      g.fillStyle = gr; g.shadowColor = 'rgba(0,0,0,0.8)'; g.shadowBlur = 30; rr(g, -150, -200, 300, 400, 8); g.fill(); g.shadowBlur = 0; g.strokeStyle = rgba(GOLD, 0.8); g.lineWidth = 3; rr(g, -132, -182, 264, 364, 4); g.stroke();
      g.strokeStyle = rgba(GOLD, 0.45); g.lineWidth = 1.5; rr(g, -122, -172, 244, 344, 2); g.stroke(); g.fillStyle = '#e8c680'; g.textAlign = 'center'; g.font = '900 21px ' + SERIF;
      g.fillText('THE PRINCIPLES OF', 0, -90); g.fillText('QUANTUM', 0, -55); g.fillText('MECHANICS', 0, -20); g.fillRect(-70, 8, 140, 2); g.font = '700 28px ' + SERIF; g.fillText('P. A. M. DIRAC', 0, 62); g.restore(); }
    chip(g, 1530, 650, '麻省理工 · 本科时代', BLUE, ap(lt, L[0] + 0.2, 0.5), 28);
    var q = ap(lt, L[3] - 0.3, 0.8); if (q > 0) { card(g, 112, 560, 1090, 300, GOLD, q); g.save(); g.globalAlpha *= q; g.fillStyle = rgba(GOLD, 0.55); g.font = '900 140px ' + SERIF; g.fillText('“', 140, 690);
      g.font = 'italic 700 46px ' + SERIF; g.fillStyle = '#f4ead2'; g.textAlign = 'left'; g.fillText('…some essentially new physical', 220, 680); g.fillText('ideas are here needed.', 220, 745); g.restore();
      txt(g, '— 狄拉克，谈到量子电动力学的无穷大', 1170, 830, 24, DIM, 'right', q, 500); }
    var c = ap(lt, L[4], 0.5); chip(g, 1530, 760, '挑战', GOLD, c, 40); var d2 = ap(lt, L[5], 0.5); chip(g, 1530, 860, '不必照着前人的方法', BLUE, d2, 30);
  };
  // self-energy of a charged shell
  D.selfE = function (g, lt, L) {
    var a1 = ap(lt, L[1], 0.6), rr0 = 1.0;
    // shrink r: 1 -> 0.12 across line 4 .. 5
    var u = E((lt - L[4]) / 2.4), r = 150 - 135 * u; if (lt > L[6]) r = 150 - 135 * 0.992;
    // charged shell with field energy glow
    if (a1 > 0) { var cx = 1470, cy = 810; g.save(); g.globalAlpha *= a1; var gl = Math.min(1, 14 / Math.max(r, 14)); var gr = g.createRadialGradient(cx, cy, 0, cx, cy, r * 3.4); gr.addColorStop(0, rgba(GOLD, 0.0)); gr.addColorStop(0.3, rgba(GOLD, 0.18 * (0.5 + gl))); gr.addColorStop(1, rgba(GOLD, 0)); g.fillStyle = gr; g.beginPath(); g.arc(cx, cy, r * 3.4, 0, 6.29); g.fill();
      g.strokeStyle = BLUE; g.lineWidth = 4; g.shadowColor = BLUE; g.shadowBlur = 14; g.beginPath(); g.arc(cx, cy, r, 0, 6.29); g.stroke(); g.shadowBlur = 0;
      var n = 14; for (var i = 0; i < n; i++) { var an = i / n * 6.283; g.fillStyle = BLUE; g.font = '900 ' + Math.max(12, Math.min(30, r * 0.26)) + 'px ' + SERIF; g.textAlign = 'center'; g.fillText('+', cx + Math.cos(an) * r, cy + Math.sin(an) * r + 8); }
      g.strokeStyle = rgba(GOLD, 0.5); g.lineWidth = 1.6; for (var i = 0; i < 16; i++) { var an = i / 16 * 6.283; g.beginPath(); g.moveTo(cx + Math.cos(an) * r, cy + Math.sin(an) * r); g.lineTo(cx + Math.cos(an) * (r + 70 + 30 * Math.sin(lt * 2 + i)), cy + Math.sin(an) * (r + 70 + 30 * Math.sin(lt * 2 + i))); g.stroke(); } g.restore();
      txt(g, '带电球壳 · 半径 r', cx, cy + 210, 24, DIM, 'center', a1, 700); }
    // U(r) curve
    var gx = 1150, gy = 560, gw = 640, gh = 360, ga = ap(lt, L[2], 0.6);
    if (ga > 0) { axes2(g, gx, gy, gw, gh, 'r', 'U', ga, 1); g.save(); g.globalAlpha *= ga; g.strokeStyle = GOLD; g.lineWidth = 4; g.shadowColor = GOLD; g.shadowBlur = 10; g.beginPath();
      var rmin = r / 150; for (var i = 0; i <= 120; i++) { var rv = 1.0 - (1.0 - 0.02) * i / 120; if (rv < rmin * 0.0 + 0.0) break; var x = gx + gw * 0.93 * rv, yv = 0.045 / rv; if (yv > 1.05) { yv = 1.05; } g.lineTo(x, gy - gh * yv * 0.97); } g.stroke();
      var rv2 = Math.max(0.02, r / 150 * (1.0 - 0.02) + 0.02 - 0.0); var rn = Math.max(0.025, (r - 15) / 135); var xm = gx + gw * 0.93 * rn, ym = gy - gh * Math.min(1.05, 0.045 / rn) * 0.97; if (lt > L[3]) glowDot(g, xm, ym, 9, RED, ga); g.restore(); }
    fm(g, 'U', 112 + 175, 670, 64, 'c', ap(lt, L[2], 0.4), E((lt - L[2] - 0.2) / 0.9));
    fm(g, 'Uinf', 112, 800, 58, 'l', ap(lt, L[4], 0.4), E((lt - L[4] - 0.2) / 0.9), rgba(RED, 0.4));
    fm(g, 're', 112, 930, 52, 'l', ap(lt, L[5] + 0.6, 0.4), E((lt - L[5] - 0.6) / 1.4));
    var cm = ap(lt, L[8], 0.5); if (cm > 0) chip(g, 1470, 330, '实验：至今没测出电子的大小', RED, cm, 28);
  };
  // field modes
  D.dof = function (g, lt, L) {
    var a = ap(lt, L[0], 0.6), x0 = 1130, x1 = 1800;
    if (a > 0) { for (var k = 0; k < 24; k++) { var xx = x0 + (x1 - x0) * k / 23, yy = 250 + 18 * Math.sin(lt * 3 + k * 0.5) * ap(lt, L[1], 0.5); glowDot(g, xx, yy, 5, BLUE, a * 0.9); } txt(g, '空间每一点都能振动', 1465, 170, 28, DIM, 'center', a * ap(lt, L[1], 0.4), 700); }
    var m = 5; for (var n = 1; n <= m; n++) { var p = ap(lt, L[2] + (n - 1) * 0.35, 0.5); if (p <= 0) continue; var y = 330 + n * 95; g.save(); g.globalAlpha *= p; g.strokeStyle = n % 2 ? BLUE : VIO; g.lineWidth = 3.5; g.shadowColor = g.strokeStyle; g.shadowBlur = 10; g.beginPath();
      for (var x = x0; x <= x1; x += 5) { var u = (x - x0) / (x1 - x0); g.lineTo(x, y - 34 * Math.sin(n * Math.PI * u) * Math.cos(lt * (2 + n * 1.1))); } g.stroke(); g.restore(); mono(g, 'n = ' + n, x0 - 18, y + 8, 20, DIM, 'right', p); 
      var zp = ap(lt, L[3] + (n - 1) * 0.18, 0.4); txt(g, '½ħω', x1 + 6, y + 8, 1, GOLD, 'left', 0); if (zp > 0) txt(g, '+ 零点能', x1 - 10, y - 38, 22, GOLD, 'right', zp * 0.9, 700); }
    if (ap(lt, L[2] + 1.8, 0.4) > 0) txt(g, '⋮', 1465, 860, 44, DIM, 'center', ap(lt, L[2] + 1.8, 0.4));
    fm(g, 'zpe', 112, 820, 62, 'l', ap(lt, L[4], 0.5), E((lt - L[4] - 0.1) / 1.0), rgba(RED, 0.4));
  };
  // no field, no self-action
  D.nofield = function (g, lt, L) {
    var a = ap(lt, 0.2, 0.7), c1 = [1330, 640], c2 = [1690, 640];
    var fl = a * (1 - ap(lt, L[1], 0.7)) * 0.9;                    // field lines fade out
    if (fl > 0) { g.save(); g.globalAlpha *= fl; g.strokeStyle = rgba(GOLD, 0.55); g.lineWidth = 2; for (var i = 0; i < 9; i++) { var an = i / 9 * 6.283 + 0.3; g.beginPath(); g.moveTo(c1[0] + Math.cos(an) * 30, c1[1] + Math.sin(an) * 30); g.bezierCurveTo(c1[0] + Math.cos(an) * 160, c1[1] + Math.sin(an) * 230, c2[0] - Math.cos(an) * 160, c2[1] + Math.sin(an) * 230 * (i % 2 ? -1 : 1), c2[0] - Math.cos(an) * 30, c2[1] + Math.sin(an) * 30); g.stroke(); } g.restore(); txt(g, '电磁场', 1510, 400, 34, GOLD, 'center', fl * 0.9, 900); cross(g, 1510, 390, 70, RED, a * ap(lt, L[1] + 0.2, 0.3), E((lt - L[1] - 0.2) / 0.5)); }
    glowDot(g, c1[0], c1[1], 20, BLUE, a); glowDot(g, c2[0], c2[1], 20, RED, a); txt(g, '+', c1[0], c1[1] + 12, 36, '#fff', 'center', a, 900); txt(g, '−', c2[0], c2[1] + 12, 36, '#fff', 'center', a, 900);
    var d = ap(lt, L[2], 0.6); aline(g, c1[0] + 34, c1[1] + 12, c2[0] - 34, c2[1] + 12, GOLD, d, E((lt - L[2]) / 0.8), 4, true); aline(g, c2[0] - 34, c2[1] - 12, c1[0] + 34, c1[1] - 12, GOLD, d, E((lt - L[2] - 0.2) / 0.8), 4, true);
    if (d > 0) txt(g, '直接作用', 1510, 720, 32, GOLD, 'center', d, 900);
    var s = ap(lt, L[3], 0.5); if (s > 0) { g.save(); g.globalAlpha *= s; g.strokeStyle = BLUE; g.lineWidth = 4; g.shadowColor = BLUE; g.shadowBlur = 10; g.beginPath(); g.arc(c1[0] - 20, c1[1] - 90, 52, 0.9, 5.4); g.stroke(); g.restore(); cross(g, c1[0] - 20, c1[1] - 120, 40, RED, s, E((lt - L[3] - 0.4) / 0.5)); txt(g, '自作用', c1[0] - 20, c1[1] - 190, 28, RED, 'center', s, 900); }
    var e1 = ap(lt, L[4], 0.5); chip(g, 1510, 300, '自能 = 0', GOLD, e1, 34); var e2 = ap(lt, L[5], 0.5); chip(g, 1510, 220, '自由度 = 电荷的坐标', BLUE, e2, 28);
  };
