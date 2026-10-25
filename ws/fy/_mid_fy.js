  function hbar(g, x, y, w, h, col, a, glow) { if (a <= 0 || w === 0) return; g.save(); g.globalAlpha *= a; g.fillStyle = col; g.shadowColor = col; g.shadowBlur = glow == null ? 12 : glow; if (w > 0) g.fillRect(x, y, w, h); else g.fillRect(x + w, y, -w, h); g.restore(); }
  function check(g, x, y, on, col, a) { if (a <= 0) return; g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = 3; g.strokeRect(x - 16, y - 16, 32, 32);
    if (on > 0) { g.lineWidth = 5; g.shadowColor = col; g.shadowBlur = 12; g.beginPath(); g.moveTo(x - 9, y); g.lineTo(x - 2, y + 8 * Math.min(1, on * 2)); if (on > 0.5) g.lineTo(x - 2 + 13 * (on - 0.5) * 2, y + 8 - 18 * (on - 0.5) * 2); g.stroke(); } g.restore(); }
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
  // radiation reaction: an accelerated charge radiates, so it must feel a drag
  D.rad = function (g, lt, L) {
    var cx = 1450, cy = 560, A = 150, om = 2.1, pos = function (t) { return cx + A * Math.sin(om * t); }, vel = function (t) { return A * om * Math.cos(om * t); };
    var a = ap(lt, L[0] + 0.3, 0.6); g.save(); g.globalAlpha *= a; g.strokeStyle = 'rgba(200,210,230,0.25)'; g.lineWidth = 2; g.setLineDash([8, 10]); g.beginPath(); g.moveTo(cx - A - 40, cy); g.lineTo(cx + A + 40, cy); g.stroke(); g.setLineDash([]); g.restore();
    var rad = ap(lt, L[1], 0.6);
    if (rad > 0) { var T0 = 0.55, fr = (lt / T0) % 1; for (var k = 0; k < 6; k++) { var te = lt - (k + fr) * T0, rd = (lt - te) * 150; if (te < 0) continue; g.save(); g.globalAlpha *= rad * Math.max(0, 1 - (k + fr) / 6) * 0.6; g.strokeStyle = BLUE; g.lineWidth = 3; g.beginPath(); g.arc(pos(te), cy, rd, 0, 6.29); g.stroke(); g.restore(); } }
    var x = pos(lt); glowDot(g, x, cy, 16, GOLD, a); txt(g, 'e', x, cy + 8, 22, '#1a1206', 'center', a, 900);
    chip(g, 1450, 250, '加速的电荷', BLUE, ap(lt, L[1] + 0.2, 0.5), 30);
    fm(g, 'larmor', 112 + 150, 760, 70, 'c', ap(lt, L[2], 0.4), E((lt - L[2] - 0.2) / 1.0)); txt(g, '拉莫尔公式：辐射功率 ∝ a²', 112, 640, 28, DIM, 'left', ap(lt, L[2], 0.4), 700);
    var ar = ap(lt, L[4], 0.5); if (ar > 0) { var v = vel(lt), dir = v >= 0 ? -1 : 1, ml = Math.min(1, Math.abs(v) / 120 + 0.3); aline(g, x, cy + 70, x + dir * 150 * ml, cy + 70, BLUE, ar, 1, 7, true); txt(g, '阻力', x + dir * 80 * ml, cy + 130, 32, BLUE, 'center', ar, 900); }
    var lp = ap(lt, L[5], 0.5); if (lp > 0) { g.save(); g.globalAlpha *= lp; g.strokeStyle = GOLD; g.lineWidth = 4; g.setLineDash([12, 9]); g.lineDashOffset = -lt * 30; g.shadowColor = GOLD; g.shadowBlur = 12; g.beginPath(); g.ellipse(x, cy - 10, 130, 80, 0, 0.3, 6.0); g.stroke(); g.setLineDash([]); g.restore(); txt(g, '自己的场', x, cy - 118, 30, GOLD, 'center', lp, 900); }
    var cr = ap(lt, L[7], 0.4); if (cr > 0) { cross(g, x, cy - 10, 60, RED, cr, E((lt - L[7] - 0.1) / 0.5)); chip(g, 1450, 880, '没有来源：阻力从哪来？', RED, ap(lt, L[8], 0.5), 30); }
  };
  // Wheeler's absorber: the retarded wave goes out, the absorber sends an advanced wave back
  D.absorber = function (g, lt, L) {
    var X0 = 1450, E0 = 640, dx = 280, a = ap(lt, L[0], 0.6);
    g.save(); g.globalAlpha *= a; g.strokeStyle = 'rgba(200,210,230,0.55)'; g.lineWidth = 2.5; g.beginPath(); g.moveTo(1110, 940); g.lineTo(1800, 940); g.moveTo(1110, 940); g.lineTo(1110, 150); g.stroke(); g.restore();
    txt(g, '空间', 1800, 982, 24, DIM, 'right', a, 700); txt(g, '时间', 1100, 140, 24, DIM, 'right', a, 700);
    g.save(); g.globalAlpha *= a; g.setLineDash([6, 9]); g.strokeStyle = 'rgba(200,210,230,0.35)'; g.beginPath(); g.moveTo(X0, 930); g.lineTo(X0, 160); g.stroke(); g.setLineDash([]); g.restore();
    var ab = ap(lt, L[1], 0.6); [X0 - dx, X0 + dx].forEach(function (x) { g.save(); g.globalAlpha *= ab; g.strokeStyle = 'rgba(160,170,190,0.8)'; g.lineWidth = 12; g.beginPath(); g.moveTo(x, 880); g.lineTo(x, 200); g.stroke(); g.restore(); });
    txt(g, '吸收体', X0 - dx, 190, 28, DIM, 'center', ab, 700); txt(g, '吸收体', X0 + dx, 190, 28, DIM, 'center', ab, 700); txt(g, '波源', X0, 980, 26, GOLD, 'center', a, 700);
    glowDot(g, X0, E0, 11, GOLD, ap(lt, L[0] + 0.2, 0.4)); txt(g, '辐射', X0 + 28, E0 + 44, 26, GOLD, 'left', ap(lt, L[2], 0.4), 900);
    var p1 = E((lt - L[2]) / 1.4), half = lt > L[5] + 0.5;
    [-1, 1].forEach(function (s) {
      aline(g, X0 + s * 6, E0 - 8, X0 + s * (dx - 6), E0 - dx + 8, GOLD, ab, p1, 4, true);
      var p2 = E((lt - L[3]) / 1.4); aline(g, X0 + s * (dx + 10), E0 - dx - 4, X0 + s * 16, E0 - 4, BLUE, ab, p2, 4, true);
    });
    txt(g, '推迟波（去）', X0 + 40, E0 - dx * 0.62 - 20, 26, GOLD, 'left', ap(lt, L[2] + 0.8, 0.5), 700); txt(g, '超前波（回）', X0 - 40, E0 - dx * 0.62 - 20, 26, BLUE, 'right', ap(lt, L[3] + 0.8, 0.5), 700);
    if (half) { var h = ap(lt, L[5] + 0.5, 0.6); [-1, 1].forEach(function (s) { aline(g, X0 + s * 10, E0 + 8, X0 + s * (dx - 10), E0 + dx - 8, BLUE, h * 0.8, 1, 3, true); }); txt(g, '一半推迟 + 一半超前', X0, 905, 30, INK, 'center', h, 900); }
    var ok = ap(lt, L[8], 0.5); if (ok > 0) { check(g, 1290, 270, E((lt - L[8] - 0.2) / 0.6), GRN, ok); txt(g, '与吸收体的细节无关', 1318, 280, 30, GRN, 'left', ok, 900); }
  };
  // the action, light cones
  D.act = function (g, lt, L) {
    var a = ap(lt, L[0], 0.6), w1 = function (y) { return 1290 + 26 * Math.sin(y / 80); }, w2 = function (y) { return 1660 + 26 * Math.sin(y / 100 + 1); }, Py = 570, Px = w1(Py);
    g.save(); g.globalAlpha *= a; g.strokeStyle = BLUE; g.lineWidth = 5; g.shadowColor = BLUE; g.shadowBlur = 10; g.beginPath(); for (var y = 930; y >= 170; y -= 6) g.lineTo(w1(y), y); g.stroke();
    g.strokeStyle = RED; g.shadowColor = RED; g.beginPath(); for (var y = 930; y >= 170; y -= 6) g.lineTo(w2(y), y); g.stroke(); g.restore();
    txt(g, '电荷 1', 1290, 975, 26, BLUE, 'center', a, 900); txt(g, '电荷 2', 1660, 975, 26, RED, 'center', a, 900); txt(g, '时间', 1130, 160, 24, DIM, 'center', a, 700);
    function solve(dir) { var y = Py; for (var i = 0; i < 60; i++) { var dxx = w2(y) - Px; y = Py + dir * dxx; } return y; }
    var yf = solve(-1), yp = solve(1); glowDot(g, Px, Py, 10, GOLD, ap(lt, L[4] - 0.4, 0.4));
    var c = ap(lt, L[4], 0.5), p = E((lt - L[4]) / 1.1);
    aline(g, Px, Py, w2(yf), yf, GOLD, c, p, 4, true); aline(g, Px, Py, w2(yp), yp, BLUE, c, E((lt - L[6] + 0.2) / 1.1), 4, true);
    if (c > 0) { glowDot(g, w2(yf), yf, 9, GOLD, c * ap(lt, L[4] + 1.0, 0.3)); txt(g, '未来光锥 · 推迟', 1480, yf - 24, 26, GOLD, 'center', c * ap(lt, L[4] + 1.0, 0.3), 700); }
    var q = ap(lt, L[6] + 0.6, 0.4); if (q > 0) { glowDot(g, w2(yp), yp, 9, BLUE, q); txt(g, '过去光锥 · 超前', 1480, yp + 46, 26, BLUE, 'center', q, 700); }
    fm(g, 'S1', 112, 600, 60, 'l', ap(lt, L[2], 0.4), E((lt - L[2] - 0.2) / 1.0)); fm(g, 'S2', 112, 700, 50, 'l', ap(lt, L[3], 0.4), E((lt - L[3] - 0.2) / 1.6));
    fm(g, 'I2', 112, 810, 48, 'l', ap(lt, L[5], 0.4), E((lt - L[5] - 0.2) / 1.2)); fm(g, 'dI', 112, 920, 44, 'l', ap(lt, L[6], 0.4), E((lt - L[6]) / 1.4));
    var sl = ap(lt, L[8], 0.5); if (sl > 0) { g.save(); g.globalAlpha *= sl; g.strokeStyle = BLUE; g.lineWidth = 4; g.beginPath(); g.arc(Px - 60, 330, 36, 0.6, 5.7); g.stroke(); g.restore(); cross(g, Px - 60, 330, 30, RED, sl, E((lt - L[8] - 0.3) / 0.5)); txt(g, '自作用', Px - 60, 270, 26, RED, 'center', sl, 900); chip(g, 900, 710, 'i ≠ j', RED, ap(lt, L[8], 0.5), 28); }
  };
  // Hamiltonian picture vs the whole history
  D.ham = function (g, lt, L) {
    var ys = [880, 740, 600, 460, 320], a = ap(lt, L[1], 0.6), cx = 1330;
    for (var k = 0; k < 5; k++) { var p = ap(lt, L[2] + k * 0.28, 0.4) * a; if (p <= 0) continue; g.save(); g.globalAlpha *= p; g.strokeStyle = rgba(BLUE, 0.9); g.lineWidth = 3; rr(g, cx - 190, ys[k] - 34, 380, 68, 12); g.fillStyle = 'rgba(14,22,40,0.9)'; g.fill(); g.stroke(); g.restore(); mono(g, 'state at t' + (k + 1), cx, ys[k] + 8, 24, BLUE, 'center', p);
      if (k > 0) aline(g, cx, ys[k - 1] - 36, cx, ys[k] + 40, BLUE, p, 1, 4, true); }
    txt(g, '一步一步推进', 1330, 190, 30, BLUE, 'center', ap(lt, L[3], 0.5), 900);
    var b = ap(lt, L[4], 0.5); if (b > 0) { g.save(); g.globalAlpha *= b; g.strokeStyle = RED; g.lineWidth = 4; g.shadowColor = RED; g.shadowBlur = 12; g.setLineDash([10, 8]); g.lineDashOffset = -lt * 25;
      [[880, 460], [740, 320], [880, 320], [600, 320]].forEach(function (q) { g.beginPath(); g.moveTo(cx + 190, q[0]); g.bezierCurveTo(cx + 290, q[0], cx + 290, q[1], cx + 190, q[1]); g.stroke(); }); g.setLineDash([]); g.restore(); txt(g, '不同时刻绑在一起', 1640, 250, 28, RED, 'center', b, 900); }
    var c = ap(lt, L[6], 0.5); if (c > 0) { for (var k = 0; k < 5; k++) { g.save(); g.globalAlpha *= c; g.strokeStyle = GOLD; g.lineWidth = 3; g.setLineDash([6, 6]); rr(g, cx - 330, ys[k] - 24, 100, 48, 8); g.stroke(); g.setLineDash([]); g.restore(); mono(g, 'field', cx - 280, ys[k] + 7, 18, GOLD, 'center', c); } txt(g, '场变量：记账用', 975, 560, 26, GOLD, 'right', c, 900); }
    var d = ap(lt, L[7], 0.5); if (d > 0) cross(g, 1050, 600, 100, RED, d, E((lt - L[7] - 0.1) / 0.6));
    fm(g, 'sch', 112 + 120, 700, 60, 'c', ap(lt, L[1], 0.4), 1); txt(g, '标准做法', 130, 620, 26, DIM, 'left', ap(lt, L[1], 0.4), 700);
  };
  // Jehle, Dirac 1933: "corresponds to" becomes "equals"
  D.jehle = function (g, lt, L) {
    var m = ap(lt, L[0], 0.7); if (m > 0) { g.save(); g.globalAlpha *= m; g.translate(1330, 360); var gr = g.createLinearGradient(0, -90, 0, 90); gr.addColorStop(0, '#f4d98c'); gr.addColorStop(1, '#c9932c'); g.fillStyle = 'rgba(220,235,255,0.14)'; g.strokeStyle = '#d9e6ff'; g.lineWidth = 4;
      g.beginPath(); g.moveTo(-70, -100); g.lineTo(70, -100); g.lineTo(58, 100); g.lineTo(-58, 100); g.closePath(); g.fill(); g.stroke(); g.fillStyle = gr; g.beginPath(); g.moveTo(-64, -40); g.lineTo(64, -40); g.lineTo(58, 98); g.lineTo(-58, 98); g.closePath(); g.fill();
      g.fillStyle = '#fff'; for (var i = 0; i < 4; i++) { g.beginPath(); g.arc(-60 + i * 40, -102, 26, 0, 6.29); g.fill(); } g.strokeStyle = '#d9e6ff'; g.beginPath(); g.moveTo(70, -60); g.bezierCurveTo(130, -60, 130, 40, 66, 40); g.stroke(); g.restore(); txt(g, '普林斯顿 · 酒馆聚会', 1330, 520, 26, DIM, 'center', m, 700); }
    var d = ap(lt, L[2], 0.7); if (d > 0) { g.save(); g.globalAlpha *= d; g.translate(1630, 420); g.rotate(0.05); g.fillStyle = '#8e7f62'; g.shadowColor = 'rgba(0,0,0,0.7)'; g.shadowBlur = 24; g.fillRect(-130, -190, 260, 380); g.shadowBlur = 0; g.fillStyle = 'rgba(30,22,12,0.7)'; g.font = '900 30px ' + SERIF; g.textAlign = 'center'; g.fillText('狄拉克', 0, -130); g.font = '500 20px ' + SERIF; g.fillText('1933', 0, -98);
      for (var i = 0; i < 12; i++) g.fillRect(-100, -60 + i * 22, 140 + 60 * rnd(i + 3), 4); g.restore(); mono(g, 'The Lagrangian in', 1630, 665, 19, DIM, 'center', d); mono(g, 'Quantum Mechanics', 1630, 691, 19, DIM, 'center', d); }
    var f1 = ap(lt, L[4] - 0.4, 0.4); fm(g, 'dirac1', 112, 800, 52, 'l', f1, E((lt - L[4] + 0.2) / 1.2));
    var f2 = ap(lt, L[6], 0.4); if (f2 > 0) { fm(g, 'dirac2', 112, 930, 56, 'l', f2, E((lt - L[6] - 0.1) / 1.2), rgba(GOLD, 0.45)); }
    var x = ap(lt, L[5], 0.5); if (x > 0) { txt(g, '类比', 1120, 800, 30, DIM, 'center', x * (1 - ap(lt, L[6], 0.4)), 700); txt(g, '等号', 1000, 936, 32, GOLD, 'center', ap(lt, L[6] + 0.8, 0.4), 900); }
  };
  // the derivation: short-time kernel -> Schroedinger equation
  D.slice = function (g, lt, L) {
    var a = ap(lt, L[0], 0.6), xs = 1540, yT = 190, yB = 400;
    if (a > 0) { g.save(); g.globalAlpha *= a; g.strokeStyle = 'rgba(200,210,230,0.5)'; g.lineWidth = 2; g.beginPath(); g.moveTo(1150, yT); g.lineTo(1830, yT); g.moveTo(1150, yB); g.lineTo(1830, yB); g.stroke(); g.restore();
      mono(g, 't + eps', 1140, yT + 6, 20, DIM, 'right', a); mono(g, 't', 1140, yB + 6, 20, DIM, 'right', a);
      for (var i = -5; i <= 5; i++) { var xy = xs + i * 58; g.save(); g.globalAlpha *= a * 0.55; g.strokeStyle = rgba(BLUE, 1); g.lineWidth = 1.5; g.beginPath(); g.moveTo(xy, yB); g.lineTo(xs, yT); g.stroke(); g.restore(); glowDot(g, xy, yB, 4 + 3 * Math.exp(-i * i / 12), BLUE, a); }
      glowDot(g, xs, yT, 9, GOLD, a); mono(g, 'x', xs + 22, yT - 14, 24, GOLD, 'left', a); mono(g, 'y', 1830, yB + 36, 22, BLUE, 'right', a);
      g.save(); g.globalAlpha *= a * 0.9; g.strokeStyle = rgba(GOLD, 1); g.lineWidth = 2.5; g.beginPath(); for (var x = 1250; x <= 1830; x += 4) { var u = (x - xs) / 140; g.lineTo(x, yB + 10 + 0 - 0 - 8 * Math.exp(-u * u) * 0 - 0); } g.stroke(); g.restore(); }
    var w = [[ 'sl1', 545, 46, L[1] + 0.3, 1.8 ], [ 'sl2', 672, 42, L[3], 1.6 ], [ 'sl3', 789, 48, L[6], 1.4 ], [ 'sl4', 921, 52, L[8] - 0.3, 1.2 ]];
    w.forEach(function (q) { var al = ap(lt, q[3], 0.3); fm(g, q[0], 112, q[1], q[2], 'l', al, E((lt - q[3]) / q[4]), q[0] === 'sl4' ? rgba(GOLD, 0.5) : null); });
    fbox(g, 100, 856, 620, 130, GOLD, ap(lt, L[8] + 0.4, 0.4), E((lt - L[8] - 0.4) / 0.8));
    var hl = ap(lt, L[2], 0.4) * (1 - ap(lt, L[3], 0.4)); fbox(g, 700, 495, 340, 100, BLUE, hl, E((lt - L[2]) / 0.6)); txt(g, '作用在波函数上', 880, 625, 24, BLUE, 'center', hl, 700);
    var A = ap(lt, L[4], 0.4) * (1 - ap(lt, L[5] + 1.2, 0.4)); txt(g, '高斯积分 → A', 1650, 625, 30, GOLD, 'center', A, 900);
    var o = ap(lt, L[5], 0.4); if (o > 0) { chip(g, 1640, 625, '奇次项积分为零', DIM, o * (1 - ap(lt, L[6] + 1.0, 0.4)), 26); }
    var q2 = ap(lt, L[6], 0.4) * (1 - ap(lt, L[8], 0.4)); txt(g, 'η² 的平均 = iħε/m（纯虚）', 1530, 810, 26, GOLD, 'center', q2 * 0, 700); if (q2 > 0) txt(g, '二次项：系数纯虚', 1600, 765, 30, GOLD, 'center', q2, 900);
  };
  // path integral: slice the time, sum over all paths
  D.sum = function (g, lt, L) {
    var a = ap(lt, L[0], 0.6), N = Math.round(3 + 22 * E((lt - L[1]) / 5)), x0 = 1140, x1 = 1800, yA = 330, yr = 130; var P = { };
    if (a > 0) {
      for (var k = 0; k <= N; k++) { var xx = x0 + (x1 - x0) * k / N; g.save(); g.globalAlpha *= a * 0.35; g.strokeStyle = 'rgba(200,210,230,0.5)'; g.lineWidth = 1; g.beginPath(); g.moveTo(xx, yA - 150); g.lineTo(xx, yA + 150); g.stroke(); g.restore(); }
      for (var p = 0; p < 26; p++) { g.save(); g.globalAlpha *= a * (0.25 + 0.4 * rnd(p + 4)); g.strokeStyle = BLUE; g.lineWidth = 1.8; g.beginPath(); g.moveTo(x0, yA);
        for (var k = 1; k < N; k++) { var u = k / N, off = (rnd(p * 31 + k * 7 + N * 3) - 0.5) * 2 * 170 * Math.sin(u * Math.PI) / Math.pow(N / 3, 0.2); g.lineTo(x0 + (x1 - x0) * u, yA + off); } g.lineTo(x1, yA); g.stroke(); g.restore(); }
      g.save(); g.globalAlpha *= a; g.strokeStyle = GOLD; g.lineWidth = 3.5; g.shadowColor = GOLD; g.shadowBlur = 10; g.beginPath(); g.moveTo(x0, yA); g.lineTo(x1, yA); g.stroke(); g.restore();
      glowDot(g, x0, yA, 8, GOLD, a); glowDot(g, x1, yA, 8, GOLD, a); mono(g, 'A', x0 - 22, yA + 8, 24, GOLD, 'right', a); mono(g, 'B', x1 + 22, yA + 8, 24, GOLD, 'left', a); mono(g, 'N = ' + N, 1470, yA + 190, 24, DIM, 'center', a); }
    fm(g, 'Kslice', 112, 560, 50, 'l', ap(lt, L[1], 0.4), E((lt - L[1] - 0.3) / 1.6));
    fm(g, 'Kpath', 112, 720, 90, 'l', ap(lt, L[2], 0.4), E((lt - L[2]) / 1.4), rgba(GOLD, 0.35));
    fm(g, 'Sx', 112 + 10, 880, 56, 'l', ap(lt, L[4], 0.4), E((lt - L[4]) / 1.0)); fm(g, 'prob', 112 + 560, 880, 56, 'l', ap(lt, L[6], 0.4), E((lt - L[6]) / 1.0));
    var r = ap(lt, L[7], 0.5); if (r > 0) { fbox(g, 100, 665, 1150, 110, GOLD, r, E((lt - L[7]) / 0.8)); chip(g, 1370, 720, '值得记住', GOLD, r, 34); }
  };
  // stationary phase: phasor spiral
  D.sp = function (g, lt, L) {
    var cx = 1470, cy = 650, a = ap(lt, L[0], 0.6);
    var kap = 1 + 59 * E((lt - L[1]) / 5.0), S0 = 330;
    // family of paths (top): colour = phase
    var fa = ap(lt, L[0] + 0.5, 0.6);
    if (fa > 0) { var A = [1140, 330], B = [1800, 330]; for (var i = -12; i <= 12; i++) { var da = i / 12, ph = kap * da * da * 1.0; var hue = ((ph / 6.283) % 1 + 1) % 1 * 360; g.save(); g.globalAlpha *= fa * (i === 0 ? 1 : 0.7); g.strokeStyle = i === 0 ? GOLD : 'hsl(' + hue.toFixed(0) + ',75%,62%)'; g.lineWidth = i === 0 ? 4.5 : 2; g.beginPath();
      for (var j = 0; j <= 40; j++) { var u = j / 40, y = 330 - 150 * 4 * u * (1 - u) * 0 - 110 * Math.sin(Math.PI * u) * 0 - 90 * 4 * u * (1 - u) + da * 70 * Math.sin(Math.PI * u); g.lineTo(A[0] + (B[0] - A[0]) * u, y + 130 * 0 + 90); } g.stroke(); g.restore(); }
      glowDot(g, A[0], A[1] + 90, 7, GOLD, fa); glowDot(g, B[0], B[1] + 90, 7, GOLD, fa); txt(g, '路径族：颜色 = 相位', 1470, 150, 26, DIM, 'center', fa, 700); }
    // spiral
    var sa = ap(lt, L[1], 0.6); if (sa > 0) {
      var n = 700, sx = 0, sy = 0, pts = [], amax = 1.0, da2 = 2 * amax / n; var cut = Math.PI / Math.sqrt(kap) * 0.9; var gold = ap(lt, L[4], 0.5);
      for (var i = 0; i <= n; i++) { var aa = -amax + i * da2; pts.push([sx, sy, aa]); sx += Math.cos(kap * aa * aa) * da2; sy += Math.sin(kap * aa * aa) * da2; }
      var ex = sx, ey = sy, mx = 0, my = 0; var sx0 = pts[0][0], sy0 = pts[0][1];
      // centre the spiral about its midpoint
      var cxm = (pts[0][0] + ex) / 2, cym = (pts[0][1] + ey) / 2; var oxs = cx - cxm * S0, oys = cy - cym * S0;
      g.save(); g.globalAlpha *= sa; g.lineWidth = 3; g.lineJoin = 'round';
      var segs = [[0, 0, BLUE]]; for (var pass = 0; pass < 2; pass++) { g.beginPath(); var on = false; for (var i = 0; i <= n; i++) { var inside = Math.abs(pts[i][2]) <= cut; if ((pass === 1) !== (inside && gold > 0)) { on = false; continue; } var X = oxs + pts[i][0] * S0, Y = oys + pts[i][1] * S0; if (!on) { g.moveTo(X, Y); on = true; } else g.lineTo(X, Y); }
        g.strokeStyle = pass ? GOLD : rgba(BLUE, 0.85); g.lineWidth = pass ? 5 : 3; g.shadowColor = pass ? GOLD : BLUE; g.shadowBlur = pass ? 12 : 4; g.stroke(); }
      g.shadowBlur = 0; g.restore();
      aline(g, oxs + pts[0][0] * S0, oys + pts[0][1] * S0, oxs + ex * S0, oys + ey * S0, RED, sa * ap(lt, L[2], 0.5), 1, 5, true);
      var len = Math.hypot(ex, ey); txt(g, '合成箭头长度 ' + (len * 100).toFixed(0), cx, 940, 28, RED, 'center', sa * ap(lt, L[2], 0.5), 900); mono(g, 'S/hbar = ' + kap.toFixed(0), cx, 995, 24, DIM, 'center', sa);
      var tx = ap(lt, L[3], 0.5); txt(g, '外圈：箭头互相抵消', cx + 300, 760, 26, BLUE, 'center', tx * (1 - ap(lt, L[4], 0.5)), 700); txt(g, '驻值附近：同向叠加', cx, 450, 28, GOLD, 'center', gold, 900); }
    fm(g, 'sp1', 112, 640, 54, 'l', ap(lt, L[1], 0.4), E((lt - L[1] - 0.2) / 1.2)); fm(g, 'sp2', 112, 780, 52, 'l', ap(lt, L[4], 0.4), E((lt - L[4]) / 1.4)); fm(g, 'sp3', 112, 900, 52, 'l', ap(lt, L[6], 0.4), E((lt - L[6]) / 1.2), rgba(GOLD, 0.4));
  };
  // two slits: add arrows, then square
  D.slit = function (g, lt, L) {
    var a = ap(lt, L[0], 0.6), sx = 1150, bx = 1420, scx = 1790, s1 = 330, s2 = 410;
    if (a > 0) { glowDot(g, sx, 370, 10, GOLD, a); g.save(); g.globalAlpha *= a; g.strokeStyle = 'rgba(200,210,230,0.8)'; g.lineWidth = 8; g.beginPath(); g.moveTo(bx, 160); g.lineTo(bx, s1 - 14); g.moveTo(bx, s1 + 14); g.lineTo(bx, s2 - 14); g.moveTo(bx, s2 + 14); g.lineTo(bx, 560); g.stroke(); g.lineWidth = 5; g.beginPath(); g.moveTo(scx, 160); g.lineTo(scx, 580); g.stroke(); g.restore(); }
    var oy = 370 + 150 * Math.sin(lt * 0.9), pa = ap(lt, L[1], 0.5); if (pa > 0) { aline(g, sx, 370, bx, s1, GOLD, pa, 1, 3.5, false); aline(g, bx, s1, scx, oy, GOLD, pa, 1, 3.5, true); aline(g, sx, 370, bx, s2, BLUE, pa, 1, 3.5, false); aline(g, bx, s2, scx, oy, BLUE, pa, 1, 3.5, true); glowDot(g, scx, oy, 8, '#fff', pa); }
    // intensity pattern on the screen
    var pt = ap(lt, L[3], 0.6); if (pt > 0) { g.save(); g.globalAlpha *= pt; g.strokeStyle = GOLD; g.lineWidth = 3.5; g.shadowColor = GOLD; g.shadowBlur = 10; g.beginPath(); for (var y = 170; y <= 570; y += 3) { var d = (y - 370) / 150 * 2.4, I = Math.pow(Math.cos(d * 3.2), 2) * Math.exp(-d * d / 4); g.lineTo(scx + 8 + 90 * I, y); } g.stroke(); g.restore(); }
    // phasor diagram at the observation point
    var ph = (oy - 370) / 150 * 2.4 * 3.2 * 2; var pc = [330, 800], R = 130, p2 = ap(lt, L[1] + 0.5, 0.5);
    if (p2 > 0) { g.save(); g.globalAlpha *= p2; g.strokeStyle = 'rgba(200,210,230,0.3)'; g.lineWidth = 1.5; g.beginPath(); g.arc(pc[0], pc[1], R, 0, 6.29); g.stroke(); g.restore();
      var v1 = [pc[0] - 60 + R * 0.5 * Math.cos(0), pc[1]]; var a1x = R * 0.9, a1y = 0, a2x = R * 0.9 * Math.cos(ph), a2y = -R * 0.9 * Math.sin(ph); var o = [pc[0] - R * 0.9, pc[1] + 0];
      aline(g, o[0], o[1], o[0] + a1x, o[1] + a1y, GOLD, p2, 1, 5, true); aline(g, o[0] + a1x, o[1] + a1y, o[0] + a1x + a2x, o[1] + a1y + a2y, BLUE, p2, 1, 5, true);
      var tp = ap(lt, L[2], 0.5); aline(g, o[0], o[1], o[0] + a1x + a2x, o[1] + a1y + a2y, RED, tp * p2, 1, 6, true); txt(g, '合成', pc[0] + 60, pc[1] + 190, 26, RED, 'center', tp * p2, 900);
      var len = Math.hypot(a1x + a2x, a1y + a2y) / (2 * R * 0.9); txt(g, '强度 = 长度²：' + (len * len).toFixed(2), 760, 800, 28, GOLD, 'left', tp * p2, 900); }
    fm(g, 'slit1', 112, 560, 52, 'l', ap(lt, L[1], 0.4), E((lt - L[1] - 0.4) / 0.8)); fm(g, 'slit2', 112, 640, 46, 'l', ap(lt, L[3], 0.4), E((lt - L[3]) / 1.2));
    chip(g, 1470, 140, '两条路径', GOLD, ap(lt, L[0] + 0.3, 0.5), 28);
    var z = ap(lt, L[6], 0.5); if (z > 0) chip(g, 1470, 700, '同一套预言', GOLD, z, 36);
  };
  // Wheeler's phone call: one world line zig-zagging through time
  D.call = function (g, lt, L) {
    var P = [[1250, 930], [1430, 300], [1580, 820], [1740, 230]], a = ap(lt, L[0], 0.6), tp = E((lt - L[4]) / 3.0);
    txt(g, '时间', 1160, 180, 26, DIM, 'center', a, 700); g.save(); g.globalAlpha *= a; g.strokeStyle = 'rgba(200,210,230,0.5)'; g.lineWidth = 2.5; g.beginPath(); g.moveTo(1160, 960); g.lineTo(1160, 210); g.stroke(); g.fillStyle = 'rgba(200,210,230,0.6)'; g.beginPath(); g.moveTo(1160, 200); g.lineTo(1152, 222); g.lineTo(1168, 222); g.fill(); g.restore();
    var tot = 0, lens = []; for (var i = 0; i < 3; i++) { var l = Math.hypot(P[i + 1][0] - P[i][0], P[i + 1][1] - P[i][1]); lens.push(l); tot += l; }
    var run = tp * tot; for (var i = 0; i < 3; i++) { var u = Math.max(0, Math.min(1, run / lens[i])); run -= lens[i]; if (u <= 0) continue; var col = i === 1 ? RED : BLUE; aline(g, P[i][0], P[i][1], P[i][0] + (P[i + 1][0] - P[i][0]) * u, P[i][1] + (P[i + 1][1] - P[i][1]) * u, col, a, 1, 5, false);
      if (u > 0.55) { var mx = P[i][0] + (P[i + 1][0] - P[i][0]) * 0.5, my = P[i][1] + (P[i + 1][1] - P[i][1]) * 0.5, an = Math.atan2(P[i + 1][1] - P[i][1], P[i + 1][0] - P[i][0]); g.save(); g.fillStyle = col; g.translate(mx, my); g.rotate(an); g.beginPath(); g.moveTo(14, 0); g.lineTo(-12, -11); g.lineTo(-12, 11); g.fill(); g.restore(); } }
    var sl = ap(lt, L[5], 0.5); if (sl > 0) { var ys = 585 + 330 * Math.sin((lt - L[5]) * 0.55 + 0.4) * (lt > L[5] ? 1 : 0), cnt = [0, 0];
      g.save(); g.globalAlpha *= sl; g.strokeStyle = GOLD; g.lineWidth = 2.5; g.setLineDash([12, 9]); g.beginPath(); g.moveTo(1190, ys); g.lineTo(1830, ys); g.stroke(); g.setLineDash([]); g.restore();
      for (var i = 0; i < 3; i++) { var y0 = P[i][1], y1 = P[i + 1][1], lo = Math.min(y0, y1), hi = Math.max(y0, y1); if (ys >= lo && ys <= hi) { var u = (ys - y0) / (y1 - y0), x = P[i][0] + (P[i + 1][0] - P[i][0]) * u; glowDot(g, x, ys, 11, i === 1 ? RED : BLUE, sl); i === 1 ? cnt[1]++ : cnt[0]++; } }
      txt(g, '此刻：电子 ' + cnt[0] + ' 个，正电子 ' + cnt[1] + ' 个', 1510, 990, 30, INK, 'center', sl, 900); }
    chip(g, 1700, 600, '电子（向前走）', BLUE, ap(lt, L[4] + 1.0, 0.5), 24); chip(g, 1432, 640, '倒着走', RED, ap(lt, L[4] + 2.2, 0.5), 26);
    var q = ap(lt, L[6], 0.5); if (q > 0) chip(g, 1500, 120, '正电子远没有电子多', RED, q, 28); var q2 = ap(lt, L[7], 0.5); if (q2 > 0) chip(g, 1500, 200, '“也许藏在质子里”', DIM, q2, 26);
  };
  // "That, I stole!": an electron going backward is a positron
  D.stole = function (g, lt, L) {
    var a = ap(lt, L[2], 0.6), xa = 1330, xb = 1670, y0 = 760, y1 = 280;
    if (a > 0) { txt(g, '时间', 1150, 220, 24, DIM, 'center', a, 700); g.save(); g.globalAlpha *= a; g.strokeStyle = 'rgba(200,210,230,0.45)'; g.lineWidth = 2; g.beginPath(); g.moveTo(1150, 800); g.lineTo(1150, 250); g.stroke(); g.fillStyle = 'rgba(200,210,230,0.6)'; g.beginPath(); g.moveTo(1150, 240); g.lineTo(1143, 260); g.lineTo(1157, 260); g.fill(); g.restore();
      var p = E((lt - L[2]) / 1.0); aline(g, xa, y1, xa, y0, BLUE, a, p, 8, true); aline(g, xb, y0, xb, y1, RED, a, p, 8, true);
      txt(g, '电子，倒着走', xa, 850, 32, BLUE, 'center', a, 900); txt(g, '正电子，正着走', xb, 850, 32, RED, 'center', a, 900); txt(g, '≡', 1500, 540, 90, GOLD, 'center', a, 900); txt(g, '电荷符号相反', 1500, 610, 26, DIM, 'center', ap(lt, L[5], 0.5), 700); }
    var q = ap(lt, L[3] - 0.2, 0.7); if (q > 0) { card(g, 112, 560, 900, 200, GOLD, q); g.save(); g.globalAlpha *= q; g.font = 'italic 900 62px ' + SERIF; g.fillStyle = '#f4ead2'; g.textAlign = 'left'; g.shadowColor = 'rgba(240,189,92,0.5)'; g.shadowBlur = 18; g.fillText('“这个，我偷来了。”', 160, 680); g.restore(); txt(g, '— 费曼，谈惠勒的想法', 990, 735, 24, DIM, 'right', q, 500); }
    chip(g, 560, 860, '计算图像', RED, ap(lt, L[7], 0.5), 32); chip(g, 560, 940, '与狄拉克负能量海等价', GOLD, ap(lt, L[8] - 0.8, 0.5), 28);
  };
  function fline(g, pts, col, a, p, arrowAt, rev) {        // fermion line through points with an arrow in the middle of its first part
    if (a <= 0 || p <= 0) return; g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.fillStyle = col; g.lineWidth = 4; g.shadowColor = col; g.shadowBlur = 8; g.lineJoin = 'round'; g.beginPath();
    var tot = 0, ls = []; for (var i = 0; i < pts.length - 1; i++) { var l = Math.hypot(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1]); ls.push(l); tot += l; } var run = tot * p; g.moveTo(pts[0][0], pts[0][1]);
    for (var i = 0; i < pts.length - 1; i++) { var u = Math.min(1, Math.max(0, run / ls[i])); run -= ls[i]; if (u <= 0) break; g.lineTo(pts[i][0] + (pts[i + 1][0] - pts[i][0]) * u, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * u); } g.stroke();
    if (p > 0.6) (arrowAt || [0]).forEach(function (k) { var A = pts[k], B = pts[k + 1], mx = (A[0] + B[0]) / 2, my = (A[1] + B[1]) / 2, an = Math.atan2(B[1] - A[1], B[0] - A[0]) + (rev ? Math.PI : 0); g.save(); g.translate(mx, my); g.rotate(an); g.beginPath(); g.moveTo(11, 0); g.lineTo(-9, -9); g.lineTo(-9, 9); g.fill(); g.restore(); }); g.restore();
  }
  D.graphs = function (g, lt, L) {
    var a = ap(lt, L[0], 0.6), cx = [1260, 1510, 1760], yb = 560, yt = 250, ym = 405, t = lt;
    [0, 1, 2].forEach(function (k) { var p = ap(lt, [L[3], L[8], L[5]][k] - 0.3, 0.7); if (p > 0) { g.save(); g.globalAlpha *= p; g.strokeStyle = 'rgba(160,175,205,0.35)'; g.lineWidth = 2; rr(g, cx[k] - 115, 200, 230, 420, 14); g.stroke(); g.restore(); } });
    var p1 = ap(lt, L[3], 0.7), w1 = E((lt - L[3]) / 1.2);
    if (p1 > 0) { var x = cx[0]; fline(g, [[x - 60, yb], [x - 60, ym], [x - 60, yt]], BLUE, p1, w1, [0]); fline(g, [[x + 60, yb], [x + 60, ym], [x + 60, yt]], BLUE, p1, w1, [0]); wavy(g, x - 60, ym, x + 60, ym, 11, 16, GOLD, p1, E((lt - L[3] - 0.5) / 0.8), t * 6); txt(g, '电子散射', x, 660, 26, INK, 'center', p1, 900); txt(g, '一个光子', x, 696, 22, DIM, 'center', p1, 700); }
    var p2 = ap(lt, L[8] - 0.3, 0.7); if (p2 > 0) { var x = cx[1]; var w2 = E((lt - L[8] + 0.3) / 1.2); fline(g, [[x - 60, yb], [x - 40, ym], [x + 40, ym]], BLUE, p2, w2, [0]); fline(g, [[x + 40, ym], [x + 60, yb]], RED, p2, E((lt - L[8] - 0.4) / 0.8), [0], false);
      wavy(g, x - 40, ym, x - 80, yt, 8, 14, GOLD, p2, E((lt - L[8] - 0.6) / 0.8), t * 6); wavy(g, x + 40, ym, x + 80, yt, 8, 14, GOLD, p2, E((lt - L[8] - 0.6) / 0.8), t * 6); txt(g, '电子 + 正电子 → 两个光子', x, 660, 24, INK, 'center', p2, 900); txt(g, '正电子 = 倒着走的电子', x, 696, 22, RED, 'center', p2, 700); }
    var p3 = ap(lt, L[5] - 0.3, 0.7); if (p3 > 0) { var x = cx[2]; fline(g, [[x - 60, yb], [x - 60, 330 + 180], [x - 60, yt]], BLUE, p3, E((lt - L[5] + 0.3) / 1.0), [0]); fline(g, [[x + 60, yb], [x + 60, yt]], BLUE, p3, E((lt - L[5] + 0.3) / 1.0), [0]);
      wavy(g, x - 60, 380, x + 60, 380, 9, 14, GOLD, p3, E((lt - L[5]) / 0.8), t * 6); wavy(g, x - 60, 470, x + 60, 470, 9, 14, GOLD, p3, E((lt - L[5] - 0.3) / 0.8), t * 6); txt(g, '两个光子', x, 660, 26, INK, 'center', p3, 900); txt(g, '更小的修正', x, 696, 22, DIM, 'center', p3, 700); }
    txt(g, '时间 ↑', 1150, 225, 24, DIM, 'center', ap(lt, L[3], 0.5), 700);
    fm(g, 'series', 112, 700, 56, 'l', ap(lt, L[5], 0.4), E((lt - L[5]) / 1.6));
    var b = ap(lt, L[7], 0.5); if (b > 0) { var items = [['α', '1', GOLD], ['α²', '0.73%', BLUE], ['α³', '0.0053%', VIO]]; items.forEach(function (it, k) { var x = 150 + k * 300, y = 830; g.save(); g.globalAlpha *= b * E((lt - L[7] - k * 0.5) / 0.5); card(g, x, y - 50, 250, 110, it[2], 1); g.restore(); txt(g, it[0], x + 55, y + 18, 44, it[2], 'center', b * E((lt - L[7] - k * 0.5) / 0.5), 900); txt(g, it[1], x + 170, y + 14, 34, INK, 'center', b * E((lt - L[7] - k * 0.5) / 0.5), 900); });
      txt(g, '各项相对大小（系数按 1 估计）', 112, 925, 22, DIM, 'left', b, 500); }
  };
  // war years: complex energies, the 1+1-dimensional checkerboard
  D.war = function (g, lt, L) {
    var a = ap(lt, L[2], 0.6); if (a > 0) { g.save(); g.globalAlpha *= a; g.strokeStyle = 'rgba(200,210,230,0.4)'; g.lineWidth = 2; g.beginPath(); g.moveTo(1130, 250); g.lineTo(1830, 250); g.stroke(); g.restore();
      g.save(); g.globalAlpha *= a; g.strokeStyle = BLUE; g.lineWidth = 3.5; g.shadowColor = BLUE; g.shadowBlur = 8; g.beginPath(); for (var x = 0; x <= 700; x += 4) { var t = x / 700 * 6, env = Math.exp(-0.28 * t * ap(lt, L[2] + 0.5, 1.0)); g.lineTo(1130 + x, 250 - 70 * env * Math.cos(t * 5)); } g.stroke(); g.restore();
      g.save(); g.globalAlpha *= a * 0.7; g.strokeStyle = RED; g.setLineDash([8, 8]); g.beginPath(); for (var x = 0; x <= 700; x += 6) { var t = x / 700 * 6; g.lineTo(1130 + x, 250 - 70 * Math.exp(-0.28 * t)); } g.stroke(); g.setLineDash([]); g.restore(); chip(g, 1480, 140, '能量带虚部：E = a − ib', RED, a, 26); }
    var b = ap(lt, L[3], 0.5); if (b > 0) { var segs = [0.28, 0.22, 0.18, 0.14, 0.1], x = 1150, W = 660, yb = 350, cols = [GOLD, BLUE, VIO, GRN, '#e8a0c8']; segs.forEach(function (s, k) { g.save(); g.globalAlpha *= b; g.fillStyle = rgba(cols[k], 0.85); g.fillRect(x, yb, W * s, 46); g.restore(); x += W * s; });
      g.save(); g.globalAlpha *= b; g.strokeStyle = RED; g.lineWidth = 3; g.setLineDash([6, 6]); g.strokeRect(x, yb, 1150 + W - x, 46); g.setLineDash([]); g.restore(); txt(g, '概率之和 < 1', 1480, yb + 90, 30, RED, 'center', b, 900); }
    var c = ap(lt, L[4], 0.6); if (c > 0) { g.save(); g.globalAlpha *= c * 0.45; g.beginPath(); g.rect(1130, 590, 700, 390); g.clip(); g.strokeStyle = 'rgba(160,175,205,0.6)'; g.lineWidth = 1.5; for (var i = -10; i <= 24; i++) { g.beginPath(); g.moveTo(1100 + i * 60, 980); g.lineTo(1100 + i * 60 + 400, 580); g.stroke(); g.beginPath(); g.moveTo(1100 + i * 60 + 400, 980); g.lineTo(1100 + i * 60, 580); g.stroke(); } g.restore();
      var path = [[1300, 960], [1360, 900], [1420, 840], [1480, 780], [1420, 720], [1480, 660], [1540, 600]]; var pr = E((lt - L[5]) / 3.0), tot = 0; for (var i = 0; i < path.length - 1; i++) tot += Math.hypot(path[i + 1][0] - path[i][0], path[i + 1][1] - path[i][1]);
      var run = pr * tot; g.save(); g.globalAlpha *= c; g.strokeStyle = GOLD; g.lineWidth = 5; g.shadowColor = GOLD; g.shadowBlur = 10; g.beginPath(); g.moveTo(path[0][0], path[0][1]); for (var i = 0; i < path.length - 1; i++) { var l = Math.hypot(path[i + 1][0] - path[i][0], path[i + 1][1] - path[i][1]), u = Math.max(0, Math.min(1, run / l)); run -= l; if (u <= 0) break; g.lineTo(path[i][0] + (path[i + 1][0] - path[i][0]) * u, path[i][1] + (path[i + 1][1] - path[i][1]) * u); } g.stroke(); g.restore();
      var rv = ap(lt, L[6], 0.5); [3, 4, 5].forEach(function (k) { if (rv > 0 && pr > 0.4) glowDot(g, path[k][0], path[k][1], 8, RED, rv); }); if (rv > 0) txt(g, '每折返一次，× 一个因子', 1680, 780, 26, RED, 'center', rv, 900);
      txt(g, '一维 · 粒子只以光速走', 1480, 1030, 26, DIM, 'center', c, 700); }
    var d = ap(lt, L[7], 0.5); if (d > 0) { check(g, 1290, 520, E((lt - L[7] - 0.2) / 0.6), GRN, d); txt(g, '一维狄拉克方程', 1325, 530, 28, GRN, 'left', d, 900); }
    var e = ap(lt, L[8], 0.5); if (e > 0) { txt(g, '三维？', 1690, 890, 44, RED, 'center', e, 900); cross(g, 1690, 878, 64, RED, e, E((lt - L[8] - 0.3) / 0.5)); }
  };
  // Lamb shift
  D.lamb = function (g, lt, L) {
    var a = ap(lt, L[1], 0.6), x0 = 1260, x1 = 1700, yD = 560, sp = E((lt - L[3]) / 1.4);
    if (a > 0) { txt(g, 'n = 2', 1200, 400, 26, DIM, 'center', a, 700); var y2S = yD - 85 * sp, y2P = yD + 85 * sp;
      g.save(); g.globalAlpha *= a; g.lineWidth = 7; g.lineCap = 'round'; g.strokeStyle = GOLD; g.shadowColor = GOLD; g.shadowBlur = 12; g.beginPath(); g.moveTo(x0, y2S); g.lineTo(x1, y2S); g.stroke(); g.strokeStyle = BLUE; g.shadowColor = BLUE; g.beginPath(); g.moveTo(x0, y2P); g.lineTo(x1, y2P); g.stroke(); g.restore();
      txt(g, '2S', x0 - 30, y2S + 10, 34, GOLD, 'right', a, 900); txt(g, '2P', x0 - 30, y2P + 10, 34, BLUE, 'right', a, 900);
      if (sp > 0.5) { aline(g, 1560, y2P - 8, 1560, y2S + 8, RED, a, 1, 4, true); aline(g, 1560, y2S + 8, 1560, y2P - 8, RED, a, 1, 4, true); txt(g, '≈ 1058 MHz', 1600, yD + 12, 32, RED, 'left', a * sp, 900); txt(g, '兰姆位移', 1600, yD + 52, 24, DIM, 'left', a * sp, 700); }
      txt(g, '狄拉克方程：两条线重合', 1480, 760, 26, DIM, 'center', a * (1 - ap(lt, L[3], 0.5)), 700); }
    chip(g, 1480, 250, '兰姆 · 1947 · 实验', GOLD, ap(lt, L[3], 0.5), 28); chip(g, 1480, 880, '贝特 · 1947 · 估算', BLUE, ap(lt, L[4], 0.5), 28);
    fm(g, 'lamb', 112, 640, 60, 'l', ap(lt, L[3], 0.4), E((lt - L[3]) / 1.0));
    var m = ap(lt, L[7], 0.5); if (m > 0) { var x = 112, y = 860, W = 620; g.save(); g.globalAlpha *= m; g.fillStyle = rgba(GOLD, 0.85); g.fillRect(x, y, W * 0.7, 54); g.fillStyle = rgba(RED, 0.8); g.fillRect(x + W * 0.7, y, W * 0.3, 54); g.restore(); txt(g, '裸质量', x + W * 0.35, y + 38, 26, '#1a1206', 'center', m, 900); txt(g, '自能（发散）', x + W * 0.85, y + 38, 22, '#fff', 'center', m, 900);
      var n = ap(lt, L[8], 0.5); txt(g, '= 测得的质量 m', x + W / 2, y + 108, 30, GOLD, 'center', n, 900); }
  };
  // mass renormalisation
  D.renorm = function (g, lt, L) {
    fm(g, 'ren1', 112, 610, 76, 'l', ap(lt, L[1], 0.4), E((lt - L[1]) / 1.2)); fm(g, 'ren2', 112, 770, 76, 'l', ap(lt, L[3], 0.4), E((lt - L[3]) / 1.6), rgba(GOLD, 0.3)); fm(g, 'alpha', 112, 930, 50, 'l', ap(lt, L[3] + 0.6, 0.4), E((lt - L[3] - 0.6) / 1.2));
    var a = ap(lt, L[3], 0.6), gx = 1180, gy = 880, gw = 620, gh = 640; var X = function (v) { return gx + gw * (v + 3.3) / 22.5; }, Y = function (v) { return gy - gh * v / 0.2; };
    if (a > 0) { axes2(g, gx, gy, gw + 30, gh + 20, '', 'δm / m', a, 1); mono(g, 'log10 ( Λ / GeV )', gx + gw / 2, gy + 70, 20, DIM, 'center', a); [0, 5, 10, 15].forEach(function (v) { g.save(); g.globalAlpha *= a; g.strokeStyle = 'rgba(200,210,230,0.5)'; g.beginPath(); g.moveTo(X(v), gy); g.lineTo(X(v), gy + 8); g.stroke(); g.restore(); mono(g, '10^' + v, X(v), gy + 30, 18, DIM, 'center', a); });
      [0.05, 0.1, 0.15, 0.2].forEach(function (v) { mono(g, Math.round(v * 100) + '%', gx - 12, Y(v) + 6, 18, DIM, 'right', a); });
      var p = E((lt - L[4]) / 2.0), xe = -3.3 + 22.4 * p; g.save(); g.globalAlpha *= a; g.strokeStyle = GOLD; g.lineWidth = 5; g.shadowColor = GOLD; g.shadowBlur = 10; g.beginPath(); g.moveTo(X(-3.3), Y(0)); g.lineTo(X(xe), Y(0.008023 * (xe + 3.29))); g.stroke(); g.restore();
      if (p > 0.1) glowDot(g, X(xe), Y(0.008023 * (xe + 3.29)), 9, RED, a);
      var tv = ap(lt, L[5], 0.5); if (tv > 0) { glowDot(g, X(3), Y(0.0505), 7, BLUE, tv); mono(g, '1 TeV: 5%', X(3) + 14, Y(0.0505) + 34, 20, BLUE, 'left', tv); }
      var pl = ap(lt, L[6], 0.5); if (pl > 0) { glowDot(g, X(19.09), Y(0.1795), 11, GOLD, pl); txt(g, '普朗克尺度：18%', X(19.09) - 20, Y(0.1795) - 36, 34, GOLD, 'right', pl, 900); } }
  };
  // Feynman's own cut-off and the unitarity problem
  D.cutoff = function (g, lt, L) {
    var a = ap(lt, L[1], 0.6), yb = 380;
    if (a > 0) { g.save(); g.globalAlpha *= a; g.strokeStyle = 'rgba(200,210,230,0.45)'; g.lineWidth = 2; g.beginPath(); g.moveTo(1140, yb); g.lineTo(1830, yb); g.stroke(); g.restore();
      aline(g, 1290, yb, 1290, yb - 220, GOLD, a, 1, 6, true); txt(g, 'δ', 1330, yb - 200, 40, GOLD, 'left', a, 900); txt(g, '严格的点', 1290, yb + 44, 24, DIM, 'center', a, 700);
      var ww = 90 - 70 * E((lt - L[4]) / 3.0), h = 200 * 90 / ww * 0.5; h = Math.min(h, 230); var p = ap(lt, L[1] + 0.6, 0.5); g.save(); g.globalAlpha *= a * p; g.strokeStyle = BLUE; g.fillStyle = rgba(BLUE, 0.22); g.lineWidth = 4; g.shadowColor = BLUE; g.shadowBlur = 10; g.beginPath(); g.moveTo(1500 - 3 * ww, yb); for (var x = -3 * ww; x <= 3 * ww; x += 3) g.lineTo(1500 + x, yb - h * Math.exp(-x * x / (2 * ww * ww))); g.lineTo(1500 + 3 * ww, yb); g.fill(); g.stroke(); g.restore();
      txt(g, '宽度 a 的窄峰 f', 1500, yb + 44, 24, BLUE, 'center', a * p, 700); }
    var x = 1170, W = 640, yg = 760; var gg = ap(lt, L[7] - 0.5, 0.6); if (gg > 0) { var segs = [0.3, 0.24, 0.18, 0.12], cols = [GOLD, BLUE, VIO, GRN], lost = 0.06 + 0.05 * E((lt - L[8]) / 2.5), xx = x; segs.forEach(function (s, k) { g.save(); g.globalAlpha *= gg; g.fillStyle = rgba(cols[k], 0.85); g.fillRect(xx, yg, W * s, 50); g.restore(); xx += W * s; });
      g.save(); g.globalAlpha *= gg; g.strokeStyle = RED; g.lineWidth = 3; g.setLineDash([6, 6]); g.strokeRect(xx, yg, x + W - xx, 50); g.setLineDash([]); g.fillStyle = rgba(RED, 0.9); g.restore(); txt(g, '各结果的概率', x, yg - 18, 24, DIM, 'left', gg, 700); txt(g, '加起来 < 1', x + W / 2, yg + 100, 34, RED, 'center', gg, 900); }
    fm(g, 'cut1', 112, 640, 58, 'l', ap(lt, L[1], 0.4), E((lt - L[1] - 0.3) / 1.0)); fm(g, 'cut2', 112, 770, 56, 'l', ap(lt, L[3], 0.4), E((lt - L[3]) / 1.0)); fm(g, 'unit', 112, 900, 58, 'l', ap(lt, L[7], 0.4), E((lt - L[7]) / 1.0), rgba(RED, 0.4));
  };
  // "sweep under the rug"
  D.rug = function (g, lt, L) {
    var a = ap(lt, L[3] - 0.2, 0.7);
    if (a > 0) { var x0 = 1140, x1 = 1830, y0 = 400, y1 = 560; g.save(); g.globalAlpha *= a; g.beginPath(); g.moveTo(x0 + 50, y0); g.lineTo(x1, y0); g.lineTo(x1 - 50, y1); g.lineTo(x0, y1); g.closePath(); var gr = g.createLinearGradient(0, y0, 0, y1); gr.addColorStop(0, '#6a2326'); gr.addColorStop(1, '#41141a'); g.fillStyle = gr; g.shadowColor = 'rgba(0,0,0,0.7)'; g.shadowBlur = 20; g.fill(); g.shadowBlur = 0; g.strokeStyle = rgba(GOLD, 0.8); g.lineWidth = 3; g.stroke();
      g.strokeStyle = rgba(GOLD, 0.35); g.lineWidth = 2; for (var i = 0; i < 9; i++) { var u = (i + 0.5) / 9; g.beginPath(); g.moveTo(x0 + 50 + (x1 - x0 - 50) * u - 20, y0 + 20); g.lineTo(x0 + (x1 - x0 - 50) * u + 40, y1 - 20); g.stroke(); }
      g.strokeStyle = '#8a5a3a'; g.lineWidth = 3; for (var i = 0; i < 40; i++) { var xx = x0 + (x1 - x0) * i / 39; g.beginPath(); g.moveTo(xx - 25 * (1 - i / 39) + 25 * 0, y1); g.lineTo(xx - 26 + 26 * (i / 39), y1 + 22); g.stroke(); }
      var lump = ap(lt, L[4], 1.5); var lx = 1480 + 60 * Math.sin(lt * 0.8); g.fillStyle = 'rgba(255,255,255,' + (0.12 * lump).toFixed(3) + ')'; g.beginPath(); g.ellipse(lx, y0 + 80, 150 * lump, 36 * lump, 0, 0, 6.29); g.fill(); g.restore();
      for (var k = 0; k < 4; k++) { var u = ((lt * 0.35 + k / 4) % 1), xx = 1140 + u * 330, al = a * (1 - E((u - 0.8) / 0.2)); txt(g, '∞', xx, 340 - 30 * Math.sin(u * 3.14), 60, RED, 'center', al * ap(lt, L[3], 0.5), 900); }
      txt(g, '重整化', 1480, y0 + 100, 34, '#f6dfae', 'center', a * ap(lt, L[4], 0.5), 900); }
    var b = ap(lt, L[6], 0.6); if (b > 0) { txt(g, '电子磁矩', 1150, 720, 28, DIM, 'left', b, 700); [['理论', 780, GOLD], ['实验', 850, BLUE]].forEach(function (r, k) { g.save(); g.globalAlpha *= b * E((lt - L[6] - 0.3 * k) / 0.8); g.fillStyle = rgba(r[2], 0.85); g.fillRect(1150, r[1], 640 * E((lt - L[6] - 0.3 * k) / 1.0), 44); g.restore(); txt(g, r[0], 1130, r[1] + 33, 26, r[2], 'right', b, 900); }); }
    var c = ap(lt, L[7], 0.5); if (c > 0) chip(g, 1480, 960, '差距小于十亿分之一', GOLD, c, 32);
  };
  D.unused = function (g, lt, L) {
    var items = [['半超前、半推迟的相互作用', 3, 200], ['那个只含世界线的作用量', 4, 330], ['“电荷不作用于自己”', 5, 460]];
    items.forEach(function (it) { var p = ap(lt, L[it[1]] - 0.3, 0.6); if (p > 0) { card(g, 1090, it[2], 740, 100, BLUE, p); txt(g, it[0], 1460, it[2] + 64, 36, INK, 'center', p, 900); strike(g, 1130, 1790, it[2] + 50, p, E((lt - L[it[1]] - 0.2) / 0.5)); } });
    var r = ap(lt, L[7], 0.6); if (r > 0) { card(g, 1090, 660, 740, 190, GOLD, r); txt(g, '真正算出诺奖结果的', 1460, 720, 28, DIM, 'center', r, 700); txt(g, '原来的量子电动力学', 1460, 785, 44, GOLD, 'center', r, 900); txt(g, '只是换了一种写法', 1460, 830, 26, INK, 'center', ap(lt, L[8], 0.5), 700); }
  };
  D.views = function (g, lt, L) {
    var cols = [[330, 'v1', '薛定谔 · 波动力学', GOLD, L[1]], [960, 'v2', '海森堡 · 矩阵力学', BLUE, L[2]], [1590, 'v3', '费曼 · 路径积分', GRN, L[2] + 0.6]];
    cols.forEach(function (c) { var p = ap(lt, c[4], 0.6); if (p > 0) { card(g, c[0] - 280, 520, 560, 250, c[3], p); txt(g, c[2], c[0], 575, 30, c[3], 'center', p, 900); fm(g, c[1], c[0], 665, c[1] === 'v2' ? 58 : 62, 'c', p, E((lt - c[4] - 0.2) / 0.9)); } });
    var e = ap(lt, L[3], 0.6); if (e > 0) { [330, 960, 1590].forEach(function (x) { aline(g, x, 780, 960, 850, DIM, e, 1, 3, true); }); fm(g, 'En', 960, 930, 64, 'c', e, E((lt - L[3] - 0.4) / 0.9), rgba(GOLD, 0.4)); txt(g, '预言完全等价', 1450, 940, 30, GOLD, 'left', e, 900); }
    var f = ap(lt, L[4], 0.6); if (f > 0) { chip(g, 960, 460, '但往未知处走：提示的改动不同', RED, f, 30); }
  };
  D.mother = function (g, lt, L) {
    var a = ap(lt, L[1], 0.7) * (1 - 0.55 * ap(lt, L[3], 0.8)); if (a > 0) { card(g, 1100, 200, 700, 250, BLUE, a); fm(g, 'S2', 1450, 330, 40, 'c', a * 0.75, 1); txt(g, '“电荷不作用于自己”', 1450, 245, 28, DIM, 'center', a, 700); }
    var m = ap(lt, L[3], 0.7); if (m > 0) { glowDot(g, 1450, 600, 40, '#caa24a', m * 0.25); txt(g, '年迈的母亲', 1450, 535, 30, DIM, 'center', m, 700); }
    var kids = [['路径积分', 1180, GOLD], ['倒着走的电子', 1450, BLUE], ['时空图像', 1720, GRN]]; kids.forEach(function (k, i) { var p = ap(lt, L[4] + i * 0.35, 0.7); if (p > 0) { aline(g, 1450, 650, k[1], 760, k[2], p * 0.7, 1, 3, true); g.save(); g.globalAlpha *= p; glowDot(g, k[1], 800, 16, k[2], 1); g.restore(); txt(g, k[0], k[1], 880, 30, k[2], 'center', p, 900); } });
    var n = ap(lt, L[6], 0.7); if (n > 0) { var k = n < 1 ? 1 + 0.2 * (1 - eo(n)) : 1; g.save(); g.globalAlpha *= n; g.translate(1450, 990); g.scale(k, k); var gr = g.createRadialGradient(-10, -10, 4, 0, 0, 56); gr.addColorStop(0, '#fff0b8'); gr.addColorStop(1, '#a8761f'); g.fillStyle = gr; g.shadowColor = GOLD; g.shadowBlur = 24; g.beginPath(); g.arc(0, 0, 54, 0, 6.29); g.fill(); g.shadowBlur = 0; g.fillStyle = '#4a3410'; g.font = '900 30px ' + SERIF; g.textAlign = 'center'; g.fillText('1965', 0, 10); g.restore(); }
  };
