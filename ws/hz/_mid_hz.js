  function hbar(g, x, y, w, h, col, a, glow) { if (a <= 0 || w === 0) return; g.save(); g.globalAlpha *= a; g.fillStyle = col; g.shadowColor = col; g.shadowBlur = glow == null ? 12 : glow; if (w > 0) g.fillRect(x, y, w, h); else g.fillRect(x + w, y, -w, h); g.restore(); }
  function check(g, x, y, on, col, a) { if (a <= 0) return; g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = 3; g.strokeRect(x - 16, y - 16, 32, 32);
    if (on > 0) { g.lineWidth = 5; g.shadowColor = col; g.shadowBlur = 12; g.beginPath(); g.moveTo(x - 9, y); g.lineTo(x - 2, y + 8 * Math.min(1, on * 2)); if (on > 0.5) g.lineTo(x - 2 + 13 * (on - 0.5) * 2, y + 8 - 18 * (on - 0.5) * 2); g.stroke(); } g.restore(); }
  // ---------- Hertz props ----------
  var VIO = '#b98cff', BRASS = '#d9a95a';
  function bolt(g, x0, y0, x1, y1, t, a, col, w) {                    // a flickering jagged spark
    if (a <= 0) return; g.save(); g.globalAlpha *= a * (0.6 + 0.4 * rnd(Math.floor(t * 30)));
    g.strokeStyle = col || '#e8f2ff'; g.lineWidth = w || 4; g.shadowColor = '#9cc8ff'; g.shadowBlur = 26; g.beginPath(); g.moveTo(x0, y0);
    var n = 6; for (var i = 1; i < n; i++) { var u = i / n; g.lineTo(x0 + (x1 - x0) * u + (rnd(i * 13 + Math.floor(t * 30)) - 0.5) * 14, y0 + (y1 - y0) * u + (rnd(i * 7 + Math.floor(t * 30)) - 0.5) * 18); }
    g.lineTo(x1, y1); g.stroke(); g.lineWidth = (w || 4) * 0.4; g.strokeStyle = '#ffffff'; g.stroke(); g.restore();
  }
  function rods(g, cx, cy, s, a, t, fire) {                            // Hertz's dipole: two brass rods, balls at the ends, a gap in the middle
    if (a <= 0) return; g.save(); g.globalAlpha *= a; g.translate(cx, cy); g.scale(s, s);
    var gr = g.createLinearGradient(0, -8, 0, 8); gr.addColorStop(0, '#f6d89a'); gr.addColorStop(1, '#8a6224');
    g.fillStyle = gr; g.fillRect(-230, -7, 216, 14); g.fillRect(14, -7, 216, 14);
    [[-250, 34], [250, 34], [-16, 12], [16, 12]].forEach(function (b) { var rg = g.createRadialGradient(b[0] - b[1] * 0.3, -b[1] * 0.3, 2, b[0], 0, b[1]); rg.addColorStop(0, '#ffe9b8'); rg.addColorStop(0.7, BRASS); rg.addColorStop(1, '#6b4a18');
      g.fillStyle = rg; g.shadowColor = GOLD; g.shadowBlur = 14; g.beginPath(); g.arc(b[0], 0, b[1], 0, 6.29); g.fill(); });
    g.restore(); if (fire > 0) bolt(g, cx - 4 * s, cy, cx + 4 * s, cy, t, fire, null, 5 * s);
  }
  function loop(g, cx, cy, r, a, t, fire, col) {                      // the receiver: a wire ring with a tiny gap on top
    if (a <= 0) return; g.save(); g.globalAlpha *= a; g.strokeStyle = col || '#c9d4e6'; g.lineWidth = 6; g.shadowColor = BLUE; g.shadowBlur = 10;
    g.beginPath(); g.arc(cx, cy, r, -Math.PI / 2 + 0.06, -Math.PI / 2 - 0.06 + 6.283); g.stroke();
    [-1, 1].forEach(function (k) { g.fillStyle = BRASS; g.beginPath(); g.arc(cx + k * r * 0.07, cy - r, 6, 0, 6.29); g.fill(); }); g.restore();
    if (fire > 0) { bolt(g, cx - r * 0.06, cy - r, cx + r * 0.06, cy - r, t, fire, null, 3); glowDot(g, cx, cy - r, 5, '#dff0ff', fire); }
  }
  function ripples(g, cx, cy, a, t, rmax, col) {                      // expanding rings from a source
    if (a <= 0) return; g.save(); g.globalAlpha *= a; for (var k = 0; k < 6; k++) { var p = (t * 0.6 + k / 6) % 1, r = 30 + p * (rmax || 600);
      g.strokeStyle = rgba(col || BLUE, 0.5 * (1 - p)); g.lineWidth = 3; g.beginPath(); g.arc(cx, cy, r, -1.1, 1.1); g.stroke(); } g.restore();
  }
  function coil(g, cx, cy, s, a) {                                    // an induction coil: a drum with windings and two terminals
    if (a <= 0) return; g.save(); g.globalAlpha *= a; g.translate(cx, cy); g.scale(s, s);
    var gr = g.createLinearGradient(0, -50, 0, 50); gr.addColorStop(0, '#7a4a2a'); gr.addColorStop(1, '#3a2010'); g.fillStyle = gr; rr(g, -110, -50, 220, 100, 18); g.fill();
    g.strokeStyle = 'rgba(230,170,110,0.65)'; g.lineWidth = 2; for (var i = -100; i <= 100; i += 9) { g.beginPath(); g.moveTo(i, -48); g.lineTo(i + 4, 48); g.stroke(); }
    g.fillStyle = '#2a3046'; g.fillRect(-130, -60, 20, 120); g.fillRect(110, -60, 20, 120); g.fillStyle = BRASS; g.beginPath(); g.arc(-120, -74, 9, 0, 6.29); g.arc(120, -74, 9, 0, 6.29); g.fill(); g.restore();
  }
  function emwave(g, x0, x1, y, amp, a, t, pE, pB) {                 // E (gold, vertical) and B (blue, drawn as a flattened sine) moving right
    if (a <= 0) return; var k = 2 * Math.PI / 260, w = 4.2;
    [[GOLD, 1, pE], [BLUE, 0.45, pB]].forEach(function (c, j) { if (c[2] <= 0) return; g.save(); g.globalAlpha *= a * c[2]; g.strokeStyle = c[0]; g.lineWidth = 4; g.shadowColor = c[0]; g.shadowBlur = 14; g.beginPath();
      var xe = x0 + (x1 - x0) * c[2];
      for (var x = x0; x <= xe; x += 4) { var v = Math.sin(k * (x - x0) - w * t) * amp * c[1]; if (j) { g.lineTo(x + v * 0.6, y + v * 0.35); } else g.lineTo(x, y - v); }
      g.stroke(); g.restore(); });
    line(g, x0, y, x1, y, 'rgba(200,210,230,0.35)', 2, a);
  }
  function gear(g, cx, cy, r, a, rot, col) {
    if (a <= 0) return; g.save(); g.globalAlpha *= a; g.translate(cx, cy); g.rotate(rot); g.fillStyle = col || '#8d9ab4'; g.shadowColor = col || BLUE; g.shadowBlur = 12; g.beginPath();
    for (var i = 0; i < 24; i++) { var an = i / 24 * 6.283, rr2 = i % 2 ? r : r * 1.18; g.lineTo(Math.cos(an) * rr2, Math.sin(an) * rr2); } g.closePath(); g.fill();
    g.fillStyle = '#0b1019'; g.beginPath(); g.arc(0, 0, r * 0.38, 0, 6.29); g.fill(); g.restore();
  }

  // ---------- scenes ----------
  var D = {};
  // hook: the dark classroom, the dipole fires, the ring a few metres away sparks
  D.h0 = function (g, lt, L) {
    var a = ap(lt, 0.2, 0.8), fireT = lt > L[2] + 0.4 ? (rnd(Math.floor(lt * 1.1)) > 0.2 ? 1 : 0) * wn(lt % 0.9, 0, 0.25, 0.05) : 0;
    rods(g, 1230, 560, 0.85, a, lt, fireT); ripples(g, 1230, 560, a * ap(lt, L[2] + 0.4, 0.6), lt, 520);
    var lp = ap(lt, L[1], 0.6), rf = lt > L[4] ? fireT * (0.4 + 0.6 * ap(lt, L[4], 0.3)) : 0; loop(g, 1680, 600, 90, lp, lt, rf);
    var m = ap(lt, L[5], 0.4); if (m > 0) { g.save(); g.globalAlpha *= m; g.setLineDash([12, 10]); g.strokeStyle = rgba(RED, 0.8); g.lineWidth = 3; g.beginPath(); g.moveTo(1460, 780); g.lineTo(1660, 780); g.stroke(); g.setLineDash([]); g.restore();
      txt(g, '几米 · 没有电线', 1560, 830, 30, RED, 'center', m, 900); }
    var mx = ap(lt, L[7], 0.5) * (1 - ap(lt, L[8] - 0.2, 0.4)); if (mx > 0) { card(g, 1260, 290, 460, 110, GOLD, mx); txt(g, '麦克斯韦的预言 · 1865', 1490, 358, 32, GOLD, 'center', mx, 900); }
  };
  D.boy = function (g, lt, L) {
    chip(g, 1440, 320, '汉堡 · 1857', BLUE, ap(lt, L[0], 0.4), 30);
    var a = ap(lt, L[2], 0.5) * (1 - ap(lt, L[6] - 0.2, 0.5)); gear(g, 1340, 600, 110, a, lt * 0.6); gear(g, 1530, 520, 70, a, -lt * 0.95, '#b38a4a');
    txt(g, '工程师？', 1440, 800, 36, INK, 'center', a * ap(lt, L[3], 0.4), 900);
    gtxt(g, '为什么？', 1440, 600, 110, GOLD, 'center', ap(lt, L[5], 0.4) * (1 - ap(lt, L[6] - 0.2, 0.4)));
    var b = ap(lt, L[6], 0.5); if (b > 0) { card(g, 1170, 470, 540, 200, GOLD, b); txt(g, '柏林', 1440, 545, 40, GOLD, 'center', b, 900); txt(g, '师从 亥姆霍兹', 1440, 615, 34, INK, 'center', b * ap(lt, L[7], 0.4), 900); }
  };
  D.prize = function (g, lt, L) {
    var a = ap(lt, L[0], 0.5); doc(g, 1440, 600, 380, 480, a, -0.03, '题目 · 1879', 3);
    var b = ap(lt, L[1], 0.4); if (b > 0) { card(g, 1180, 640, 520, 100, GOLD, b); txt(g, '检验麦克斯韦理论的一个预言', 1440, 702, 30, GOLD, 'center', b, 900); }
    chip(g, 1440, 820, '当时的仪器做不到', DIM, ap(lt, L[2], 0.4), 26);
    stamp(g, 1520, 470, '没接', lt - L[3] - 0.2, a);
    var c = ap(lt, L[4], 0.4); if (c > 0) { g.save(); g.globalAlpha *= c; g.fillStyle = RED; g.shadowColor = RED; g.shadowBlur = 14; g.beginPath(); g.moveTo(1590, 350); g.lineTo(1630, 350); g.lineTo(1630, 470); g.lineTo(1610, 450); g.lineTo(1590, 470); g.closePath(); g.fill(); g.restore(); txt(g, '记着', 1680, 420, 28, RED, 'left', c, 900); }
  };
  D.maxwell = function (g, lt, L) {
    var a = ap(lt, L[0], 0.5); emwave(g, 1080, 1820, 620, 150, a, lt, eo((lt - L[1]) / 1.2), eo((lt - L[2]) / 1.2));
    txt(g, '电', 1110, 440, 40, GOLD, 'center', a * ap(lt, L[2], 0.4), 900); txt(g, '磁', 1110, 760, 40, BLUE, 'center', a * ap(lt, L[1], 0.4), 900);
    arrow(g, 1600, 860, 1800, 860, GOLD, a * ap(lt, L[3], 0.4), eo((lt - L[3]) / 0.6), lt * 40); txt(g, '往外跑', 1700, 900, 26, GOLD, 'center', a * ap(lt, L[3], 0.4), 900);
    chip(g, 1450, 320, '电磁波', GOLD, ap(lt, L[4], 0.4), 34);
    var q = ap(lt, L[7], 0.4); if (q > 0) { g.save(); g.globalAlpha *= q; g.setLineDash([14, 10]); g.strokeStyle = RED; g.lineWidth = 3; g.strokeRect(1070, 430, 760, 380); g.setLineDash([]); g.restore(); chip(g, 1450, 980, '只是算出来的 · 没人见过', RED, q, 28); }
  };
  D.spark = function (g, lt, L) {
    var a = ap(lt, L[1], 0.5) * (1 - ap(lt, L[7] - 0.2, 0.5));
    if (a > 0) { coil(g, 1260, 560, 1, a); coil(g, 1640, 560, 1, a * ap(lt, L[3], 0.4)); var f1 = lt > L[3] ? wn((lt - L[3]) % 1.2, 0, 0.3, 0.05) : 0;
      bolt(g, 1140, 486, 1100, 440, lt, f1 * a); var f2 = lt > L[5] ? f1 : 0; bolt(g, 1520, 486, 1490, 450, lt, f2 * a, null, 3);
      txt(g, '没连电线', 1640, 700, 30, RED, 'center', a * ap(lt, L[4], 0.4), 900); }
    var b = ap(lt, L[7], 0.5);
    if (b > 0) { var fire = lt > L[9] ? wn((lt - L[9]) % 1.0, 0, 0.3, 0.05) : 0;
      rods(g, 1250, 520, 0.7, b, lt, fire); chip(g, 1250, 400, '发射器', BLUE, b, 28); ripples(g, 1250, 520, b * ap(lt, L[12], 0.5), lt, 520);
      var c = ap(lt, L[10], 0.5); loop(g, 1680, 600, 80, b * c, lt, lt > L[13] + 0.3 ? fire : 0); chip(g, 1680, 450, '接收器', GOLD, b * c, 28);
      txt(g, '几米', 1470, 760, 28, DIM, 'center', b * ap(lt, L[13], 0.4), 900); }
  };
  D.uv = function (g, lt, L) {
    var fire = wn(lt % 1.0, 0, 0.3, 0.05); rods(g, 1180, 560, 0.55, 1, lt, fire);
    var box = ap(lt, L[1], 0.5), shr = ap(lt, L[2], 0.6); loop(g, 1640, 600, 70, 1, lt, fire * (1 - 0.6 * shr));
    if (box > 0) { g.save(); g.globalAlpha *= box * 0.9; g.fillStyle = 'rgba(6,8,12,0.75)'; g.fillRect(1530, 470, 220, 230); g.strokeStyle = 'rgba(200,210,230,0.6)'; g.lineWidth = 3; g.strokeRect(1530, 470, 220, 230); g.restore(); chip(g, 1640, 440, '黑盒子', BLUE, box, 24); }
    if (shr > 0) txt(g, '火花变短', 1640, 760, 28, RED, 'center', shr * (1 - ap(lt, L[4], 0.4)), 900);
    var uv = ap(lt, L[4], 0.5); if (uv > 0) { for (var k = 0; k < 5; k++) { var p = ((lt * 0.8) + k / 5) % 1; arrow(g, 1210, 560 - 20 + k * 10, 1210 + 380 * p, 545 + k * 6, VIO, uv * (1 - p), 1, 0); }
      txt(g, '紫外线', 1400, 500, 30, VIO, 'center', uv, 900); }
    var p1 = ap(lt, L[7], 0.4); if (p1 > 0) doc(g, 1300, 830, 160, 200, p1, -0.04, '1887', 5);
    chip(g, 1560, 860, '爱因斯坦 · 1905', GOLD, ap(lt, L[9], 0.4), 28); chip(g, 1560, 940, '光电效应', GOLD, ap(lt, L[10], 0.4), 32);
  };
  D.stand = function (g, lt, L) {
    var x0 = 1110, x1 = 1780, y = 600, a = ap(lt, L[0], 0.5) * (1 - ap(lt, L[8] - 0.2, 0.5));
    if (a > 0) { rods(g, x0, y, 0.35, a, lt, wn(lt % 1.0, 0, 0.3, 0.05));
      var pl = ap(lt, L[1], 0.5); g.save(); g.globalAlpha *= a * pl; var gr = g.createLinearGradient(x1, 0, x1 + 30, 0); gr.addColorStop(0, '#c9d3e2'); gr.addColorStop(1, '#5b6578'); g.fillStyle = gr; g.fillRect(x1, y - 220, 30, 440); g.restore();
      txt(g, '金属板', x1 + 15, y + 270, 26, INK, 'center', a * pl, 900);
      var go = ap(lt, L[2], 0.4), sw = ap(lt, L[3], 0.6);
      if (go > 0 && sw < 1) { for (var k = 0; k < 4; k++) { var p = ((lt * 0.7) + k / 4) % 1; glowDot(g, x0 + 60 + (x1 - x0 - 60) * p, y, 6, BLUE, a * go * (1 - sw)); } }
      if (sw > 0) { var lam = (x1 - x0) / 2.5, kk = 2 * Math.PI / lam; g.save(); g.globalAlpha *= a * sw;
        [1, -1].forEach(function (sg) { g.strokeStyle = rgba(GOLD, 0.35); g.lineWidth = 2; g.beginPath(); for (var x = x0 + 40; x <= x1; x += 4) { var v = 110 * Math.abs(Math.sin(kk * (x1 - x))); g.lineTo(x, y - sg * v); } g.stroke(); });
        g.strokeStyle = GOLD; g.lineWidth = 4; g.shadowColor = GOLD; g.shadowBlur = 12; g.beginPath(); for (var x = x0 + 40; x <= x1; x += 4) { var v = 110 * Math.sin(kk * (x1 - x)) * Math.cos(lt * 5); g.lineTo(x, y - v); } g.stroke(); g.restore();
        for (var n = 0; n <= 2; n++) { var xn = x1 - n * lam / 2; if (xn < x0 + 40) continue; glowDot(g, xn, y, 7, RED, a * ap(lt, L[4] + 0.2, 0.4)); }
        var u = eo((lt - L[5]) / 3.0), lx = x1 - 40 - u * (x1 - x0 - 120); if (lt > L[5]) { var amp = Math.abs(Math.sin(kk * (x1 - lx))); loop(g, lx, y + 200, 34, a, lt, amp > 0.3 ? amp * wn(lt % 1.0, 0, 0.3, 0.05) : 0); }
        var br = ap(lt, L[7], 0.4); if (br > 0) { var xa = x1 - lam / 2, xb = x1 - lam; line(g, xb, y - 170, xa, y - 170, GOLD, 3, a * br); line(g, xb, y - 185, xb, y - 155, GOLD, 3, a * br); line(g, xa, y - 185, xa, y - 155, GOLD, 3, a * br); txt(g, '半个波长', (xa + xb) / 2, y - 200, 30, GOLD, 'center', a * br, 900); } } }
    var b = ap(lt, L[8], 0.5);
    if (b > 0) { ['反射', '折射', '偏振'].forEach(function (s, i) { chip(g, 1250 + i * 200, 400, s, BLUE, b * ap(lt, L[8] + 0.3 * i, 0.3), 30); }); chip(g, 1450, 500, '和光一模一样', GOLD, b * ap(lt, L[9], 0.4), 32);
      var c = ap(lt, L[10], 0.5); if (c > 0) { txt(g, '赫兹的波', 1120, 690, 28, INK, 'left', b * c, 900); hbar(g, 1290, 668, 480 * eo((lt - L[10]) / 0.8), 30, rgba(GOLD, 0.8), b * c); txt(g, '几米', 1790, 692, 26, GOLD, 'left', b * c, 900);
        var d = ap(lt, L[11], 0.4); txt(g, '可见光', 1120, 790, 28, INK, 'left', b * d, 900); hbar(g, 1290, 768, 4, 30, rgba(BLUE, 0.9), b * d); txt(g, '< 1 微米', 1310, 792, 26, BLUE, 'left', b * d, 900); } }
  };
  D.nouse = function (g, lt, L) {
    var e = ap(lt, L[0], 0.5) * (1 - ap(lt, L[2] - 0.2, 0.5)); if (e > 0) { for (var i = 0; i < 6; i++) { var x = 1150 + (i % 3) * 230, y = 470 + Math.floor(i / 3) * 230; rods(g, x, y, 0.3, e * ap(lt, L[1] + 0.12 * i, 0.3), lt + i, wn((lt + i * 0.37) % 1.1, 0, 0.3, 0.05)); } txt(g, '全欧洲在重复他的实验', 1450, 860, 30, INK, 'center', e * ap(lt, L[1], 0.4), 900); }
    var q = ap(lt, L[3], 0.5); if (q > 0) { card(g, 1100, 420, 700, 300, RED, q); txt(g, '“没什么用。', 1150, 520, 48, INK, 'left', q * ap(lt, L[4], 0.4), 900); txt(g, '只是证明了，', 1150, 600, 40, INK, 'left', q * ap(lt, L[5], 0.4), 700); txt(g, '麦克斯韦大师是对的。”', 1150, 670, 40, INK, 'left', q * ap(lt, L[5] + 0.3, 0.4), 700);
      chip(g, 1450, 800, '流传 · 原始出处不明', RED, q * ap(lt, L[6], 0.4), 28); }
  };
  D.bonn = function (g, lt, L) {
    chip(g, 1450, 330, '波恩大学 · 1889', BLUE, ap(lt, L[0], 0.4), 32);
    var c = ap(lt, L[1], 0.5) * (1 - ap(lt, L[3] - 0.2, 0.5)); if (c > 0) { card(g, 1200, 440, 500, 200, GOLD, c); txt(g, '接替 克劳修斯', 1450, 515, 34, INK, 'center', c, 900); gtxt(g, '熵  S', 1450, 600, 52, GOLD, 'center', c * ap(lt, L[2], 0.4)); }
    var q = ap(lt, L[3], 0.5); gtxt(g, '力？', 1450, 580, 120, BLUE, 'center', q * (1 - ap(lt, L[5] - 0.2, 0.4)));
    var b = ap(lt, L[5], 0.5); if (b > 0) doc(g, 1450, 620, 300, 400, b, 0.02, '力学原理', 7);
  };
  D.ill = function (g, lt, L) {                                       // restraint: a dim room, a letter, a date
    var a = ap(lt, L[3], 0.8); if (a > 0) { doc(g, 1450, 600, 420, 520, a * 0.95, -0.02, '', 11);
      txt(g, '你们不要难过，', 1290, 560, 36, '#2a1e12', 'left', a * ap(lt, L[5], 0.6), 900); txt(g, '要有一点骄傲。', 1290, 630, 36, '#2a1e12', 'left', a * ap(lt, L[6], 0.6), 900); }
    mono(g, '1894 · 1 · 1', 1450, 960, 30, INK, 'center', ap(lt, L[7], 0.8));
    if (lt < L[3]) { g.save(); g.globalAlpha *= ap(lt, 0.2, 0.6) * (1 - ap(lt, L[3] - 0.4, 0.4)); for (var i = 0; i < 3; i++) { glowDot(g, 1300 + i * 150, 600 + Math.sin(lt + i) * 10, 14, RED, 0.35); } g.restore(); }
  };
  D.marconi = function (g, lt, L) {
    var a = ap(lt, L[1], 0.5), y = 760;
    if (a > 0) { g.save(); g.globalAlpha *= a; g.fillStyle = 'rgba(40,70,120,0.35)'; g.fillRect(1180, y, 540, 120); g.restore(); txt(g, '大西洋', 1450, y + 75, 30, BLUE, 'center', a, 900);
      [[1150, '英国'], [1750, '纽芬兰']].forEach(function (s, i) { line(g, s[0], y, s[0], y - 260, '#c9d4e6', 5, a * (i ? ap(lt, L[4], 0.4) : 1)); for (var k = 0; k < 4; k++) line(g, s[0], y - 260, s[0] + (k - 1.5) * 40, y, 'rgba(200,210,230,0.4)', 1.5, a * (i ? ap(lt, L[4], 0.4) : 1));
        txt(g, s[1], s[0], y + 160, 26, INK, 'center', a * (i ? ap(lt, L[4], 0.4) : 1), 900); });
      var p = eo((lt - L[4]) / 1.4); if (p > 0) { g.save(); g.strokeStyle = GOLD; g.lineWidth = 4; g.shadowColor = GOLD; g.shadowBlur = 18; g.globalAlpha *= a; g.beginPath(); for (var u = 0; u <= p; u += 0.01) { var x = 1150 + 600 * u, yy = y - 260 - Math.sin(u * Math.PI) * 200; if (u === 0) g.moveTo(x, yy); else g.lineTo(x, yy); } g.stroke(); g.restore(); chip(g, 1450, 360, '1901', GOLD, ap(lt, L[4] + 1.0, 0.4), 34); }
      ripples(g, 1150, y - 260, a * ap(lt, L[2], 0.5) * (1 - ap(lt, L[4], 0.5)), lt, 400, GOLD); }
  };
  D.name = function (g, lt, L) {
    var a = ap(lt, L[1] - 0.3, 0.5) * (1 - ap(lt, L[3] - 0.2, 0.5));
    if (a > 0) { gtxt(g, 'Hz', 1450, 580, 220, GOLD, 'center', a); var ph = lt * 2 * Math.PI * 0.5; glowDot(g, 1450 + 200 * Math.sin(ph), 760, 12, BLUE, a * ap(lt, L[2], 0.4)); line(g, 1250, 760, 1650, 760, 'rgba(200,210,230,0.3)', 2, a * ap(lt, L[2], 0.4)); txt(g, '1 赫兹 = 每秒振动一次', 1450, 840, 30, INK, 'center', a * ap(lt, L[2], 0.4), 900); chip(g, 1450, 340, 'IEC · 1930', BLUE, a, 28); }
    var b = ap(lt, L[3], 0.5) * (1 - ap(lt, L[6] - 0.2, 0.5));
    if (b > 0) { var w = eo((lt - L[5]) / 2.0); [0, 1, 2].forEach(function (i) { avatar(g, 1300 + i * 90 + w * 250, 600, i ? 34 : 44, INK, b * (1 - 0.6 * w)); }); arrow(g, 1580, 700, 1800, 700, RED, b * ap(lt, L[5], 0.4), eo((lt - L[5]) / 0.8)); txt(g, '离开德国', 1690, 750, 28, RED, 'center', b * ap(lt, L[5], 0.4), 900); }
    var c = ap(lt, L[6], 0.5); if (c > 0) { doc(g, 1450, 600, 340, 420, c, -0.03, '改名提议', 9); stamp(g, 1460, 600, '拒绝', lt - L[7] - 0.3, c); }
  };
  D.today = function (g, lt, L) {
    var x0 = 1100, x1 = 1800, y = 760, a = ap(lt, L[0], 0.5); function X(e) { return x0 + (x1 - x0) * (e - 5) / 5; }   // 10^5 .. 10^10 Hz
    if (a > 0) { line(g, x0, y, x1, y, 'rgba(200,210,230,0.5)', 3, a); for (var e = 5; e <= 10; e++) { line(g, X(e), y - 8, X(e), y + 8, 'rgba(200,210,230,0.6)', 2, a); mono(g, '10' + ['⁵', '⁶', '⁷', '⁸', '⁹', '¹⁰'][e - 5], X(e), y + 46, 22, DIM, 'center', a); }
      mono(g, '赫兹', x1, y + 84, 20, DIM, 'right', a);
      var r = ap(lt, L[1], 0.5); if (r > 0) { hbar(g, X(5.3), y - 120, (X(8.05) - X(5.3)) * eo((lt - L[1]) / 0.8), 30, rgba(BLUE, 0.7), r); txt(g, '收音机', X(6.6), y - 140, 28, BLUE, 'center', r, 900); }
      var p = ap(lt, L[2], 0.5); if (p > 0) { hbar(g, X(8.85), y - 220, (X(9.6) - X(8.85)) * eo((lt - L[2]) / 0.6), 30, rgba(GOLD, 0.8), p); txt(g, '手机', X(9.2), y - 240, 28, GOLD, 'center', p, 900); }
      var w = ap(lt, L[3], 0.5); if (w > 0) { [9.38, 9.7].forEach(function (e) { glowDot(g, X(e), y - 40, 10, GOLD, w); }); txt(g, 'WiFi', X(9.54), y - 70, 26, GOLD, 'center', w, 900); } }
    var f = ap(lt, L[4], 0.6); if (f > 0) { g.save(); g.globalAlpha *= f * 0.35; ripples(g, 1450, 420, 1, lt, 360, GOLD); g.restore(); gtxt(g, 'Hz', 1450, 470, 120, GOLD, 'center', f * ap(lt, L[5], 0.5)); }
  };
  D.teaser = function (g, lt, L) {
    var a = ap(lt, 0.3, 0.6); g.save(); g.globalAlpha *= a * 0.9;
    var p = (lt * 0.5) % 1; g.strokeStyle = 'rgba(255,240,200,0.85)'; g.lineWidth = 4; g.shadowColor = '#fff2c8'; g.shadowBlur = 20; g.beginPath(); g.moveTo(1150, 640); g.lineTo(1150 + 600 * Math.min(1, p * 2), 640); if (p > 0.5) { g.lineTo(1750 - 600 * (p - 0.5) * 2, 640 - 120 * (p - 0.5) * 2); } g.stroke(); g.restore();
    g.save(); g.globalAlpha *= a; g.fillStyle = '#c9d3e2'; g.fillRect(1750, 540, 14, 200); g.restore();
    avatar(g, 1100, 640, 50, DIM, a * 0.6); gtxt(g, '?', 1450, 470, 120, BLUE, 'center', ap(lt, L[1], 0.4) * (0.85 + 0.15 * Math.sin(lt * 4)));
  };
