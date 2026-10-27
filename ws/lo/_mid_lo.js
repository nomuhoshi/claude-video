  // ---------- Lorentz props ----------
  var GREEN = '#8fd9a8', SAND = '#a8957a';
  function person(g, x, y, s, col, a, lean) {                          // a small standing figure
    if (a <= 0) return; g.save(); g.globalAlpha *= a; g.translate(x, y); g.scale(s, s); g.rotate(lean || 0);
    g.fillStyle = col; g.shadowColor = col; g.shadowBlur = 8; g.beginPath(); g.arc(0, -86, 15, 0, 6.29); g.fill();
    g.beginPath(); g.moveTo(-18, -66); g.lineTo(18, -66); g.lineTo(24, -4); g.lineTo(-24, -4); g.closePath(); g.fill(); g.restore();
  }
  function clock(g, x, y, r, ang, a, col, hand2) {                      // analogue clock; ang = minute-hand turns
    if (a <= 0) return; col = col || INK; g.save(); g.globalAlpha *= a;
    var gr = g.createRadialGradient(x - r * 0.3, y - r * 0.3, 2, x, y, r); gr.addColorStop(0, 'rgba(36,46,66,0.95)'); gr.addColorStop(1, 'rgba(12,16,26,0.95)');
    g.fillStyle = gr; g.strokeStyle = col; g.lineWidth = 4; g.shadowColor = col; g.shadowBlur = 14; g.beginPath(); g.arc(x, y, r, 0, 6.29); g.fill(); g.stroke(); g.shadowBlur = 0;
    for (var i = 0; i < 12; i++) { var an = i / 12 * 6.283; g.strokeStyle = 'rgba(220,225,235,0.7)'; g.lineWidth = i % 3 ? 2 : 4; g.beginPath(); g.moveTo(x + Math.sin(an) * r * 0.82, y - Math.cos(an) * r * 0.82); g.lineTo(x + Math.sin(an) * r * 0.94, y - Math.cos(an) * r * 0.94); g.stroke(); }
    var hm = ang * 6.283, hh = (hand2 == null ? ang / 12 : hand2) * 6.283; g.lineCap = 'round'; g.strokeStyle = INK; g.lineWidth = 5; g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.sin(hh) * r * 0.5, y - Math.cos(hh) * r * 0.5); g.stroke();
    g.strokeStyle = col; g.lineWidth = 3.5; g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.sin(hm) * r * 0.78, y - Math.cos(hm) * r * 0.78); g.stroke();
    g.fillStyle = col; g.beginPath(); g.arc(x, y, 6, 0, 6.29); g.fill(); g.restore();
  }
  function medal(g, x, y, r, a, label) {
    if (a <= 0) return; g.save(); g.globalAlpha *= a; var gr = g.createRadialGradient(x - r * 0.3, y - r * 0.3, 2, x, y, r); gr.addColorStop(0, '#fff0c0'); gr.addColorStop(0.6, '#d9a040'); gr.addColorStop(1, '#8a5c18');
    g.fillStyle = gr; g.shadowColor = GOLD; g.shadowBlur = 20; g.beginPath(); g.arc(x, y, r, 0, 6.29); g.fill(); g.shadowBlur = 0;
    g.strokeStyle = 'rgba(110,70,20,0.7)'; g.lineWidth = 3; g.beginPath(); g.arc(x, y, r * 0.8, 0, 6.29); g.stroke();
    g.font = '900 ' + Math.round(r * 0.5) + 'px ' + SERIF; g.fillStyle = '#6a4410'; g.textAlign = 'center'; g.fillText(label, x, y + r * 0.18); g.restore();
  }
  function sapling(g, x, y, s, a, sw) {                                 // a nursery seedling
    if (a <= 0) return; g.save(); g.globalAlpha *= a; g.translate(x, y); g.scale(s, s);
    g.strokeStyle = '#8b6b48'; g.lineWidth = 5; g.lineCap = 'round'; g.beginPath(); g.moveTo(0, 0); g.quadraticCurveTo(sw || 0, -24, (sw || 0) * 1.4, -50); g.stroke();
    var gr = g.createRadialGradient(-6, -66, 2, 0, -62, 30); gr.addColorStop(0, '#b4f0c4'); gr.addColorStop(1, '#2f7a4a'); g.fillStyle = gr; g.shadowColor = GREEN; g.shadowBlur = 10;
    g.beginPath(); g.ellipse((sw || 0) * 1.4, -64, 22, 30, 0, 0, 6.29); g.fill(); g.restore();
  }
  function stairs(g, x, y, n, sw, sh, lit, a, dashLast) {               // n steps rising to the right; lit = how many are gold; the last one can be dashed
    if (a <= 0) return; g.save(); g.globalAlpha *= a;
    for (var i = 0; i < n; i++) {
      var x0 = x + i * sw, top = y - (i + 1) * sh, dash = dashLast && i === n - 1;
      if (dash) { g.setLineDash([12, 9]); g.strokeStyle = 'rgba(239,91,67,0.9)'; g.lineWidth = 3; g.strokeRect(x0, top, sw, (i + 1) * sh); g.setLineDash([]); continue; }
      var on = i < lit, gr = g.createLinearGradient(0, top, 0, y); gr.addColorStop(0, on ? '#8b6a2c' : '#2a3550'); gr.addColorStop(1, on ? '#3d2f14' : '#141b2c');
      g.fillStyle = gr; g.shadowColor = on ? GOLD : 'transparent'; g.shadowBlur = on ? 14 : 0; g.fillRect(x0, top, sw, (i + 1) * sh); g.shadowBlur = 0;
      g.strokeStyle = on ? GOLD : 'rgba(170,185,215,0.55)'; g.lineWidth = 3; g.strokeRect(x0, top, sw, (i + 1) * sh);
    }
    g.restore();
  }
  function earth(g, x, y, r, a, ring) {
    if (a <= 0) return; g.save(); g.globalAlpha *= a; var gr = g.createRadialGradient(x - r * 0.35, y - r * 0.35, 4, x, y, r); gr.addColorStop(0, '#7fc0ff'); gr.addColorStop(0.6, '#2c6bb4'); gr.addColorStop(1, '#10264a');
    g.fillStyle = gr; g.shadowColor = '#5aa0ff'; g.shadowBlur = 24; g.beginPath(); g.arc(x, y, r, 0, 6.29); g.fill(); g.shadowBlur = 0;
    g.fillStyle = 'rgba(110,200,140,0.7)'; g.beginPath(); g.ellipse(x - r * 0.25, y - r * 0.2, r * 0.3, r * 0.2, -0.4, 0, 6.29); g.fill(); g.beginPath(); g.ellipse(x + r * 0.3, y + r * 0.25, r * 0.22, r * 0.28, 0.5, 0, 6.29); g.fill();
    if (ring) { g.setLineDash([8, 8]); g.strokeStyle = 'rgba(239,91,67,0.9)'; g.lineWidth = 3; g.beginPath(); g.arc(x, y, r + ring, 0, 6.29); g.stroke(); g.setLineDash([]); }
    g.restore();
  }
  function formula(g, s, x, y, size, col, a) { if (a <= 0) return; g.save(); g.globalAlpha *= a; g.font = '500 ' + size + 'px ' + MONO; g.textAlign = 'center'; g.fillStyle = col; g.shadowColor = col; g.shadowBlur = 16; g.fillText(s, x, y); g.restore(); }

  // ---------- scenes ----------
  var D = {};
  // hook: noon in Haarlem — the wires go quiet for three minutes; the name; the missing last step
  D.h0 = function (g, lt, L) {
    var a = ap(lt, L[0], 0.5), ph = ap(lt, L[8], 0.5), fadeC = 1 - ph;
    chip(g, 1450, 300, '哈勒姆 · 1928 年 2 月 10 日', BLUE, a * fadeC, 28);
    var cl0 = clock(g, 1450, 540, 150, 0, a * fadeC, GOLD, 0);
    var quiet = ap(lt, L[2], 0.5);
    for (var k = 0; k < 3; k++) {                                         // three telegraph lines: pulses run until they stop
      var yy = 790 + k * 46; g.save(); g.globalAlpha *= ap(lt, L[1], 0.5) * fadeC; g.strokeStyle = quiet > 0.5 ? 'rgba(120,130,150,0.45)' : 'rgba(134,182,255,0.8)'; g.lineWidth = 3; g.beginPath(); g.moveTo(1130, yy); g.lineTo(1770, yy); g.stroke();
      if (quiet < 0.5) for (var j = 0; j < 4; j++) { var px = 1130 + (((lt * 220 + j * 160 + k * 60) % 640)); glowDot(g, px, yy, 6, BLUE, 1); }
      g.restore(); }
    if (quiet > 0) { var sw = ap(lt, L[2], 1.2); g.save(); g.globalAlpha *= quiet * fadeC; g.strokeStyle = RED; g.lineWidth = 8; g.shadowColor = RED; g.shadowBlur = 18; g.beginPath(); g.arc(1450, 540, 176, -Math.PI / 2, -Math.PI / 2 + 6.283 * sw); g.stroke(); g.restore();
      mono(g, '3:00', 1450, 720, 44, RED, 'center', quiet * fadeC); }
    chip(g, 1450, 890, '卢瑟福 · 英国皇家学会', INK, ap(lt, L[4], 0.4) * fadeC, 26); chip(g, 1450, 950, '爱因斯坦 · 普鲁士科学院', '#cfe0ff', ap(lt, L[5], 0.4) * fadeC, 26);
    gtxt(g, '洛伦兹', 1450, 520, 160, GOLD, 'center', ph);
    mono(g, '1853 – 1928', 1450, 590, 34, DIM, 'center', ph);
    formula(g, 'γ = 1 / √(1 − v²/c²)', 1450, 690, 52, GOLD, ap(lt, L[9], 0.6));
    var s = ap(lt, L[10], 0.6); stairs(g, 1260, 960, 4, 100, 62, 3, s, true); chip(g, 1770, 840, '最后一步', RED, ap(lt, L[10] + 0.4, 0.4), 28);
  };
  // 1853–1875: a nursery in Arnhem, school, Leiden, night school, the thesis
  D.nursery = function (g, lt, L) {
    var a = ap(lt, L[0], 0.5); chip(g, 1450, 300, '阿纳姆 · 荷兰 · 1853', GOLD, a, 28);
    var f = ap(lt, L[1], 0.6) * (1 - ap(lt, L[3], 0.6));
    if (f > 0) { for (var r = 0; r < 3; r++) for (var c = 0; c < 7; c++) { var s = 0.7 + r * 0.22, x = 1180 + c * (74 + r * 12) - r * 10, y = 640 + r * 105; sapling(g, x, y, s, f * ap(lt, L[1] + 0.1 * (c + r), 0.5), Math.sin(lt * 1.3 + c + r) * 4); }
      chip(g, 1450, 920, '父亲的苗圃', GREEN, f, 28); }
    var m = ap(lt, L[2], 0.5) * (1 - ap(lt, L[3], 0.6)); if (m > 0) chip(g, 1450, 400, '四岁 · 母亲去世', DIM, m, 26);
    var sc = ap(lt, L[3], 0.5); if (sc > 0) { chip(g, 1250, 420, '数学', BLUE, ap(lt, L[4], 0.4), 30); chip(g, 1450, 420, '物理', BLUE, ap(lt, L[4] + 0.4, 0.4), 30); chip(g, 1650, 420, '外语', BLUE, ap(lt, L[5], 0.4), 30); }
    var u = ap(lt, L[6], 0.5); if (u > 0) { card(g, 1130, 500, 640, 110, GOLD, u); txt(g, '莱顿大学 · 1870 · 17 岁', 1450, 570, 40, GOLD, 'center', u, 900); }
    var n = ap(lt, L[8], 0.5); if (n > 0) { chip(g, 1450, 690, '白天 · 夜校教书', INK, n, 30); }
    var t = ap(lt, L[9], 0.5); if (t > 0) { chip(g, 1450, 770, '晚上 · 博士论文 · 1875', INK, t, 30); }
    var mx = ap(lt, L[10], 0.5); if (mx > 0) { card(g, 1130, 830, 640, 130, BLUE, mx); txt(g, '麦克斯韦的电磁理论', 1450, 878, 38, BLUE, 'center', mx, 900); formula(g, '∇ × E = − ∂B/∂t', 1450, 930, 34, INK, mx); }
  };
  // 1878–1912: professor at 24, thirty-four years, Haarlem, Monday mornings
  D.prof = function (g, lt, L) {
    var a = ap(lt, L[0], 0.5); card(g, 1130, 300, 640, 220, GOLD, a);
    txt(g, '莱顿大学', 1450, 365, 44, GOLD, 'center', a, 900); txt(g, '理论物理教授 · 24 岁', 1450, 440, 40, INK, 'center', ap(lt, L[1], 0.5), 900);
    person(g, 1178, 505, 0.55, '#d8c49a', ap(lt, L[1], 0.5), 0);
    var b = ap(lt, L[2], 0.5); if (b > 0) { var p = eo((lt - L[2]) / 1.4); g.save(); g.globalAlpha *= b; g.strokeStyle = 'rgba(200,210,230,0.4)'; g.lineWidth = 3; g.beginPath(); g.moveTo(1150, 660); g.lineTo(1750, 660); g.stroke();
      g.strokeStyle = GOLD; g.lineWidth = 12; g.shadowColor = GOLD; g.shadowBlur = 14; g.beginPath(); g.moveTo(1150, 660); g.lineTo(1150 + 600 * p, 660); g.stroke(); g.restore();
      mono(g, '1878', 1150, 715, 30, GOLD, 'center', b); mono(g, '1912', 1750, 715, 30, GOLD, 'center', b * p); }
    var h = ap(lt, L[3], 0.5); if (h > 0) { arrow(g, 1300, 810, 1500, 810, BLUE, h, eo((lt - L[3]) / 0.8), lt * 40); house(g, 1600, 860, 1.3, ap(lt, L[4], 0.5)); chip(g, 1600, 910, '哈勒姆 · 博物馆', INK, ap(lt, L[4], 0.5), 26); chip(g, 1250, 780, '1912 · 退休', GOLD, h, 26); }
    var w = ap(lt, L[6], 0.5); if (w > 0) { arrow(g, 1500, 930, 1230, 930, GOLD, w, eo((lt - L[6]) / 0.9), lt * 40); chip(g, 1360, 985, '每周一早晨 · 回莱顿', GOLD, ap(lt, L[7], 0.4), 26); }
  };
  // 1880s–90s: the small charges inside matter; the Lorentz force
  D.charge = function (g, lt, L) {
    var a = ap(lt, L[0], 0.5); chip(g, 1450, 300, '光 = 电磁波 · 麦克斯韦', BLUE, a, 28);
    var gx = 1480, gw = 220, gy0 = 380, gy1 = 680, my = 530, up = 1 - ap(lt, L[10], 0.6);
    var sl = ap(lt, L[1], 0.5) * up; if (sl > 0) { g.save(); g.globalAlpha *= sl; g.fillStyle = 'rgba(134,182,255,0.12)'; g.fillRect(gx, gy0, gw, gy1 - gy0); g.strokeStyle = 'rgba(134,182,255,0.8)'; g.lineWidth = 3; g.strokeRect(gx, gy0, gw, gy1 - gy0); g.restore(); chip(g, gx + gw / 2, gy1 + 50, '玻璃', BLUE, sl, 24); }
    var w = ap(lt, L[0], 0.8) * up; if (w > 0) { g.save(); g.globalAlpha *= w; g.strokeStyle = GOLD; g.lineWidth = 4; g.shadowColor = GOLD; g.shadowBlur = 10; g.beginPath(); var run = 0;
      for (var x = 1120; x <= 1780; x += 3) { var inside = x > gx, k = inside ? 0.095 : 0.055; var X = x - 1120; var yy = my - 46 * Math.sin(X * k - lt * 6 + (inside ? (gx - 1120) * (0.055 - 0.095) : 0)); if (x === 1120) g.moveTo(x, yy); else g.lineTo(x, yy); } g.stroke(); g.restore();
      txt(g, '变慢', 1650, 440, 28, GOLD, 'center', w * ap(lt, L[2], 0.5), 700); }
    var q = ap(lt, L[4], 0.6) * up; if (q > 0) { for (var r = 0; r < 3; r++) for (var c = 0; c < 4; c++) { var cx0 = gx + 36 + c * 50, cy0 = 440 + r * 90, osc = Math.sin(lt * 6 - c * 0.5) * 14 * ap(lt, L[6], 0.6);
      g.save(); g.globalAlpha *= q; g.strokeStyle = 'rgba(220,225,235,0.4)'; g.lineWidth = 2; g.beginPath(); g.moveTo(cx0, cy0 - 26); g.lineTo(cx0, cy0 + osc); g.stroke(); g.restore(); glowDot(g, cx0, cy0 + osc, 7, '#ff9a7a', q);
      var em = ap(lt, L[7], 0.5); if (em > 0) { var pr = ((lt * 1.6 + c * 0.2 + r * 0.3) % 1); g.save(); g.globalAlpha *= em * q * (1 - pr) * 0.6; g.strokeStyle = '#ff9a7a'; g.lineWidth = 2; g.beginPath(); g.arc(cx0, cy0 + osc, 6 + pr * 34, 0, 6.29); g.stroke(); g.restore(); } }
      chip(g, gx + gw / 2, gy0 - 40, '带电的小颗粒', '#ff9a7a', q, 28); }
    var n = ap(lt, L[9], 0.5) * up; if (n > 0) { txt(g, '1897 年才有人发现电子', 1450, 790, 32, GOLD, 'center', n, 900); }
    var f = ap(lt, L[10], 0.6); if (f > 0) {                               // the Lorentz force: charge in a magnetic field bends
      var bx = 1450, by = 650; g.save(); g.globalAlpha *= f; g.fillStyle = 'rgba(134,182,255,0.55)'; for (var i = 0; i < 6; i++) for (var j = 0; j < 3; j++) { g.beginPath(); g.arc(1180 + i * 110, 470 + j * 130, 8, 0, 6.29); g.fill(); g.strokeStyle = 'rgba(134,182,255,0.8)'; g.lineWidth = 2; g.beginPath(); g.moveTo(1180 + i * 110 - 6, 470 + j * 130 - 6); g.lineTo(1180 + i * 110 + 6, 470 + j * 130 + 6); g.moveTo(1180 + i * 110 + 6, 470 + j * 130 - 6); g.lineTo(1180 + i * 110 - 6, 470 + j * 130 + 6); g.stroke(); }
      var ang = (lt - L[10]) * 1.6, cx1 = 1450, cy1 = 590, R = 130; g.strokeStyle = 'rgba(255,154,122,0.35)'; g.lineWidth = 2; g.setLineDash([6, 8]); g.beginPath(); g.arc(cx1, cy1, R, 0, 6.29); g.stroke(); g.setLineDash([]); g.restore();
      glowDot(g, cx1 + Math.cos(ang) * R, cy1 + Math.sin(ang) * R, 10, '#ff9a7a', f);
      txt(g, '磁场 B（垂直纸面）', 1450, 780, 28, BLUE, 'center', f, 700); }
    var fl = ap(lt, L[11], 0.5); if (fl > 0) { card(g, 1150, 830, 600, 130, GOLD, fl); txt(g, '洛伦兹力', 1450, 890, 48, GOLD, 'center', fl, 900); formula(g, 'F = q v × B', 1450, 940, 34, INK, fl); }
  };
  // 1896–1902: Zeeman's flame in a magnetic field; the line widens; the ratio matches; the prize
  D.zeeman = function (g, lt, L) {
    var a = ap(lt, L[0], 0.5); chip(g, 1450, 300, '莱顿 · 1896 · 塞曼', BLUE, a, 28);
    var sp = ap(lt, L[4], 0.5); if (sp > 0) {                               // spectrum strip
      g.save(); g.globalAlpha *= sp; g.fillStyle = '#05070c'; g.fillRect(1130, 340, 640, 80); g.strokeStyle = 'rgba(200,210,230,0.7)'; g.lineWidth = 3; g.strokeRect(1130, 340, 640, 80);
      var wid = 6 + 26 * ap(lt, L[4], 1.4), tri = ap(lt, L[7], 0.8);
      function band(x, w, al) { var gr = g.createLinearGradient(x - w, 0, x + w, 0); gr.addColorStop(0, 'rgba(255,210,70,0)'); gr.addColorStop(0.5, 'rgba(255,225,110,' + al + ')'); gr.addColorStop(1, 'rgba(255,210,70,0)'); g.fillStyle = gr; g.fillRect(x - w, 342, 2 * w, 76); }
      if (tri < 0.02) band(1450, wid, 0.95); else { band(1450 - 70 * tri, 10 + 8 * (1 - tri), 0.9); band(1450, 10 + 8 * (1 - tri), 0.9); band(1450 + 70 * tri, 10 + 8 * (1 - tri), 0.9); }
      g.restore(); txt(g, '钠光谱线', 1450, 470, 26, DIM, 'center', sp, 700); }
    var fl = ap(lt, L[2], 0.5) * (1 - ap(lt, L[11], 0.6)); if (fl > 0) {
      var m = ap(lt, L[3], 0.5); hbar(g, 1160, 640, 70, 160, '#d44a4a', fl * m, 8); hbar(g, 1510, 640, 70, 160, '#4a78d4', fl * m, 8); txt(g, 'N', 1195, 735, 40, '#fff', 'center', fl * m, 900); txt(g, 'S', 1545, 735, 40, '#fff', 'center', fl * m, 900);
      if (m > 0) for (var i = 0; i < 5; i++) { g.save(); g.globalAlpha *= fl * m * 0.5; g.strokeStyle = BLUE; g.lineWidth = 2; g.setLineDash([8, 8]); g.lineDashOffset = -lt * 30; g.beginPath(); g.moveTo(1230, 660 + i * 30); g.lineTo(1510, 660 + i * 30); g.stroke(); g.restore(); }
      var fx = 1370, fy = 780; g.save(); g.globalAlpha *= fl; var gr = g.createRadialGradient(fx, fy - 40, 4, fx, fy - 30, 70); gr.addColorStop(0, '#fff6c8'); gr.addColorStop(0.4, '#ffc040'); gr.addColorStop(1, 'rgba(255,120,30,0)'); g.fillStyle = gr; g.beginPath(); g.moveTo(fx, fy - 130 - Math.sin(lt * 9) * 6); g.quadraticCurveTo(fx + 56, fy - 40, fx, fy + 10); g.quadraticCurveTo(fx - 56, fy - 40, fx, fy - 130); g.fill(); g.restore();
      chip(g, 1370, 870, '钠火焰 · 强磁场', GOLD, fl, 26); }
    var r = ap(lt, L[8], 0.5) * (1 - ap(lt, L[11], 0.5)); if (r > 0) { var p = eo((lt - L[8]) / 0.8), eq = ap(lt, L[10], 0.5) * (1 - ap(lt, L[11], 0.5));
      txt(g, '电荷 ÷ 质量', 1450, 520, 36, GOLD, 'center', r, 900);
      hbar(g, 1250, 800 - 200 * p, 80, 200 * p, GOLD, r, 8); txt(g, '洛伦兹 + 塞曼', 1290, 840, 24, GOLD, 'center', r, 900);
      var q = ap(lt, L[9], 0.5) * (1 - ap(lt, L[11], 0.5)); hbar(g, 1560, 800 - 200 * q * eo((lt - L[9]) / 0.8), 80, 200 * q * eo((lt - L[9]) / 0.8), '#cfe0ff', q, 8); txt(g, '汤姆孙 · 1897', 1600, 840, 24, '#cfe0ff', 'center', q, 900);
      if (eq > 0) { g.save(); g.globalAlpha *= eq; g.strokeStyle = '#7dffb0'; g.shadowColor = '#7dffb0'; g.shadowBlur = 14; g.lineWidth = 9; g.lineCap = 'round'; g.beginPath(); g.moveTo(1420, 640); g.lineTo(1452, 676); g.lineTo(1500, 610); g.stroke(); g.restore(); chip(g, 1450, 900, '对上了', '#7dffb0', eq, 30); } }
    var md = ap(lt, L[11], 0.6); if (md > 0) { medal(g, 1450, 640, 130, md, '1902'); chip(g, 1450, 830, '洛伦兹 · 塞曼', GOLD, ap(lt, L[12], 0.4), 30); }
  };
  // 1892: the Earth shrinks by six centimetres
  D.contract = function (g, lt, L) {
    var z = ap(lt, L[0], 0.6) * (1 - ap(lt, L[3], 0.6)); if (z > 0) { g.save(); g.globalAlpha *= z; g.font = '900 280px ' + SERIF; g.textAlign = 'center'; g.fillStyle = '#f6dfae'; g.shadowColor = GOLD; g.shadowBlur = 40; g.fillText('0', 1700, 520); g.restore(); }
    var e = ap(lt, L[1], 0.6); earth(g, 1330, 720, 130, e, ap(lt, L[7], 0.5) * 10);
    var wnd = ap(lt, L[2], 0.5); if (wnd > 0) for (var i = 0; i < 5; i++) { var yy = 600 + i * 60, off = (lt * 160 + i * 70) % 260; g.save(); g.globalAlpha *= wnd * (1 - ap(lt, L[3], 0.4)) * (1 - off / 260) * 0.8; g.strokeStyle = RED; g.lineWidth = 3; g.beginPath(); g.moveTo(1760 - off, yy); g.lineTo(1700 - off, yy); g.stroke(); g.restore(); }
    chip(g, 1600, 590, '以太风 ?', RED, ap(lt, L[2], 0.5) * (1 - ap(lt, L[4], 0.6)), 28);
    var b = ap(lt, L[3], 0.5); if (b > 0) { var sh = E((lt - L[5]) / 1.2), len = 460 - 70 * sh, mv = (lt * 70) % 40; chip(g, 1450, 320, '洛伦兹 · 1892', GOLD, b, 28);
      hbar(g, 1220 + mv, 400, len, 42, '#b8903f', b, 8); arrow(g, 1240, 480, 1440, 480, GOLD, b * ap(lt, L[4], 0.4), eo((lt - L[4]) / 0.7), lt * 40); txt(g, '运动方向', 1340, 525, 26, GOLD, 'center', b * ap(lt, L[4], 0.4), 700);
      txt(g, '缩短一点点', 1450, 385, 36, RED, 'center', b * ap(lt, L[5], 0.5), 900); }
    var cm = ap(lt, L[8], 0.5); if (cm > 0) { txt(g, '地球直径 12 742 公里', 1650, 760, 28, BLUE, 'center', cm, 700); txt(g, '→ 短约 6 厘米', 1650, 810, 38, GOLD, 'center', ap(lt, L[9], 0.5), 900); }
    var f = ap(lt, L[10], 0.5); if (f > 0) { chip(g, 1450, 920, '菲茨杰拉德 · 1889 · 爱尔兰', INK, f, 26); chip(g, 1450, 975, '各自想到同一个办法', DIM, ap(lt, L[11], 0.4), 24); }
  };
  // 1895 / 1904: local time, the transformation, and why we do not notice it
  D.transform = function (g, lt, L) {
    var stat = ap(lt, L[1], 0.5) * (1 - ap(lt, L[9], 0.5)); if (stat > 0) {
      person(g, 1230, 840, 1.0, '#9fb4d8', stat, 0); chip(g, 1230, 880, '静止的人', BLUE, stat, 24);
      var mvp = ap(lt, L[1] + 0.2, 0.5) * (1 - ap(lt, L[9], 0.5)); var sx = 1560 + 30 * Math.sin(lt * 1.2); person(g, sx, 840, 1.0, '#d8c49a', mvp, 0.08); chip(g, 1560, 880, '运动的人', GOLD, mvp, 24); arrow(g, 1500, 560, 1700, 560, GOLD, mvp, eo((lt - L[1]) / 0.8), lt * 40); txt(g, 'v', 1600, 540, 30, GOLD, 'center', mvp, 700);
      clock(g, 1230, 700, 56, (lt * 0.5) % 1, stat, BLUE); var lc = ap(lt, L[3], 0.5); clock(g, 1560, 700, 56, (lt * 0.5 * (1 - 0.3 * lc)) % 1, mvp, GOLD); chip(g, 1560, 780, '局部时间', GOLD, lc, 24);
      txt(g, '长度、时间 都要换算', 1400, 420, 30, INK, 'center', ap(lt, L[5], 0.5), 700); }
    var fm = ap(lt, L[4], 0.6); if (fm > 0) { card(g, 1130, 470, 640, 150, GOLD, fm * (1 - ap(lt, L[9], 0.5)));
      formula(g, "x' = γ ( x − v t )", 1450, 540, 44, GOLD, ap(lt, L[4], 0.6) * (1 - ap(lt, L[9], 0.5))); formula(g, "t' = γ ( t − v x / c² )", 1450, 595, 44, GOLD, ap(lt, L[5], 0.6) * (1 - ap(lt, L[9], 0.5))); }
    chip(g, 1450, 320, '洛伦兹 · 1904', GOLD, ap(lt, L[4], 0.5) * (1 - ap(lt, L[9], 0.5)), 28);
    var nm = ap(lt, L[8], 0.5); if (nm > 0) gtxt(g, '洛伦兹变换', 1450, 410, 56, GOLD, 'center', nm * (1 - ap(lt, L[9], 0.5)));
    var pl = ap(lt, L[9], 0.5); if (pl > 0) {                              // gamma vs v/c
      var X0 = 1180, Y0 = 880, W = 560, H = 360; g.save(); g.globalAlpha *= pl; g.strokeStyle = 'rgba(200,210,230,0.6)'; g.lineWidth = 3; g.beginPath(); g.moveTo(X0, Y0 - H); g.lineTo(X0, Y0); g.lineTo(X0 + W, Y0); g.stroke();
      g.strokeStyle = GOLD; g.lineWidth = 5; g.shadowColor = GOLD; g.shadowBlur = 12; g.beginPath(); var P = eo((lt - L[9]) / 1.4);
      for (var i = 0; i <= 200 * P; i++) { var be = i / 200 * 0.99, gm = 1 / Math.sqrt(1 - be * be), px = X0 + be * W, py = Y0 - Math.min(H, (gm - 1) * H / 6); if (i) g.lineTo(px, py); else g.moveTo(px, py); } g.stroke(); g.shadowBlur = 0; g.restore();
      txt(g, 'γ', X0 - 26, Y0 - H + 20, 34, GOLD, 'center', pl, 900); txt(g, '速度 ÷ 光速', X0 + W / 2, Y0 + 44, 26, DIM, 'center', pl, 700);
      var e = ap(lt, L[10], 0.5); if (e > 0) { glowDot(g, X0 + 4, Y0 - 2, 9, '#7dffb0', e); chip(g, X0 + 150, Y0 - 90, '地球：万分之一光速', '#7dffb0', e, 26); } }
  };
  // 1904–1910: the ether stays; the formula is right, the meaning is one step short
  D.aether = function (g, lt, L) {
    var e = ap(lt, L[1], 0.7), sh = ap(lt, L[5], 0.6);
    if (e > 0) { for (var i = 0; i < 40; i++) { var px = 1130 + rnd(i) * 640, py = 340 + rnd(i + 40) * 330 + Math.sin(lt * 1.5 + i) * 10; glowDot(g, px, py, 3, '#9db4e0', e * 0.45); }
      gtxt(g, '以太', 1450, 520, 140, GOLD, 'center', e); }
    var t = ap(lt, L[2], 0.5); if (t > 0) chip(g, 1450, 620, '真正的时间 · 只有一个', INK, t, 30);
    var c = ap(lt, L[3], 0.5); if (c > 0) { clock(g, 1210, 800, 64, (lt * 0.4) % 1, c, GOLD); chip(g, 1210, 900, '局部时间', GOLD, c, 24); var m = ap(lt, L[4], 0.5); chip(g, 1210, 955, '数学上的方便', BLUE, m, 24); }
    if (sh > 0) { stairs(g, 1380, 980, 4, 95, 62, 3, sh, ap(lt, L[6], 0.5) > 0.01); txt(g, '缩短', 1427, 930, 24, INK, 'center', sh, 700); txt(g, '局部时间', 1522, 868, 24, INK, 'center', sh, 700); txt(g, '变换', 1617, 806, 24, INK, 'center', sh, 700);
      var r = ap(lt, L[6], 0.5); if (r > 0) txt(g, '？', 1712, 760, 70, RED, 'center', r, 900);
      g.save(); g.globalAlpha *= sh; g.strokeStyle = '#7dffb0'; g.shadowColor = '#7dffb0'; g.shadowBlur = 12; g.lineWidth = 8; g.lineCap = 'round'; g.beginPath(); g.moveTo(1290, 700); g.lineTo(1316, 728); g.lineTo(1356, 676); g.stroke(); g.restore(); }
  };
  // 1905: same formulas, another meaning
  D.einstein = function (g, lt, L) {
    var a = ap(lt, L[0], 0.5); chip(g, 1450, 300, '伯尔尼 · 专利局 · 1905', BLUE, a, 28);
    var n = ap(lt, L[1], 0.5); chip(g, 1450, 360, '爱因斯坦', '#cfe0ff', n, 32);
    var bx = ap(lt, L[2], 0.6); if (bx > 0) {
      card(g, 1130, 420, 310, 160, GOLD, bx); card(g, 1480, 420, 310, 160, '#cfe0ff', bx);
      txt(g, '洛伦兹 · 1904', 1285, 458, 22, GOLD, 'center', bx, 700); txt(g, '爱因斯坦 · 1905', 1635, 458, 22, '#cfe0ff', 'center', bx, 700);
      formula(g, "x' = γ(x − vt)", 1285, 515, 28, GOLD, bx); formula(g, "x' = γ(x − vt)", 1635, 515, 28, '#cfe0ff', bx);
      formula(g, "t' = γ(t − vx/c²)", 1285, 555, 26, GOLD, bx); formula(g, "t' = γ(t − vx/c²)", 1635, 555, 26, '#cfe0ff', bx); txt(g, '=', 1460, 520, 60, INK, 'center', bx, 900); }
    var m = ap(lt, L[3], 0.5); if (m > 0) { chip(g, 1285, 625, '以太里的“局部时间”', GOLD, m, 24); }
    var ne = ap(lt, L[4], 0.5); if (ne > 0) { chip(g, 1635, 625, '不需要以太', RED, ne, 26); }
    var tt = ap(lt, L[5], 0.5); if (tt > 0) { clock(g, 1635, 760, 70, (lt * 0.5) % 1, tt, '#cfe0ff'); chip(g, 1635, 860, '就是真的时间', '#7dffb0', ap(lt, L[6], 0.5), 26); }
    var up = ap(lt, L[7], 0.5); if (up > 0) { arrow(g, 1290, 720, 1520, 720, GOLD, up, eo((lt - L[7]) / 0.8), lt * 40); }
    var rl = ap(lt, L[8], 0.5); if (rl > 0) { gtxt(g, '相对论', 1290, 810, 60, GOLD, 'center', rl); }
    var st = ap(lt, L[9], 0.5); if (st > 0) { stairs(g, 1130, 1000, 4, 70, 40, 4, st, false); glowDot(g, 1130 + 4 * 70 - 30, 1000 - 4 * 40 - 30, 10, '#cfe0ff', st); }
    var rem = ap(lt, L[11], 0.5); if (rem > 0) chip(g, 1640, 960, '洛伦兹 · 仍保留以太', DIM, rem, 24);
  };
  // 1911–1953: Solvay table, five councils, readmitting the Germans, Einstein's sentence
  D.solvay = function (g, lt, L) {
    var a = ap(lt, L[1], 0.5); chip(g, 1450, 300, '布鲁塞尔 · 1911 · 第一届索尔维会议', BLUE, a * (1 - ap(lt, L[8], 0.5)), 26);
    var tb = ap(lt, L[3], 0.6) * (1 - ap(lt, L[8], 0.5)); if (tb > 0) { g.save(); g.globalAlpha *= tb; var gr = g.createRadialGradient(1450, 560, 20, 1450, 560, 240); gr.addColorStop(0, '#4a3a28'); gr.addColorStop(1, '#2a2118'); g.fillStyle = gr; g.strokeStyle = SAND; g.lineWidth = 3; g.beginPath(); g.ellipse(1450, 560, 230, 110, 0, 0, 6.29); g.fill(); g.stroke(); g.restore();
      for (var i = 0; i < 18; i++) { var an = i / 18 * 6.283; var gold = i === 0; glowDot(g, 1450 + Math.cos(an) * 285, 560 + Math.sin(an) * 150, gold ? 11 : 7, gold ? GOLD : '#9fb4d8', tb * ap(lt, L[3] + i * 0.05, 0.3)); } }
    chip(g, 1450, 740, '量子', BLUE, ap(lt, L[4], 0.5) * (1 - ap(lt, L[8], 0.5)), 28);
    var ch = ap(lt, L[5], 0.5) * (1 - ap(lt, L[8], 0.5)); if (ch > 0) chip(g, 1450, 560, '主持 · 洛伦兹', GOLD, ch, 28);
    var yr = ap(lt, L[6], 0.5) * (1 - ap(lt, L[8], 0.5)); if (yr > 0) { var Y = [1911, 1913, 1921, 1924, 1927]; var xs = [1190, 1320, 1450, 1580, 1710]; g.save(); g.globalAlpha *= yr; g.strokeStyle = 'rgba(200,210,230,0.5)'; g.lineWidth = 3; g.beginPath(); g.moveTo(1150, 880); g.lineTo(1750, 880); g.stroke(); g.restore();
      Y.forEach(function (y, i) { var q = ap(lt, L[6] + 0.3 + i * 0.3, 0.4); glowDot(g, xs[i], 880, 12, GOLD, yr * q); mono(g, String(y), xs[i], 930, 24, GOLD, 'center', yr * q); }); }
    var w = ap(lt, L[8], 0.5); if (w > 0) { var open = ap(lt, L[10], 0.8); card(g, 1500, 400, 260, 360, BLUE, w); txt(g, '会场', 1630, 450, 30, BLUE, 'center', w, 900);
      chip(g, 1250 + 380 * open, 520, '德国', RED, w, 28); chip(g, 1250 + 380 * open, 600, '奥地利', RED, w, 28); if (open < 0.1) { g.save(); g.globalAlpha *= w; g.fillStyle = 'rgba(239,91,67,0.8)'; g.fillRect(1440, 470, 10, 200); g.restore(); txt(g, '一战后 · 被挡在门外', 1330, 720, 26, RED, 'center', w, 700); } else chip(g, 1310, 700, '1927 · 请回来', '#7dffb0', open, 28); }
    var q = ap(lt, L[11], 0.5) * (1 - ap(lt, L[8], 0.01) * 0); if (q > 0 && lt > L[11]) { card(g, 1130, 790, 640, 200, GOLD, q); mono(g, '1953 · 洛伦兹一百岁诞辰', 1450, 840, 30, GOLD, 'center', q); }
    var qq = ap(lt, L[12], 0.6); if (qq > 0) { gtxt(g, '“', 1230, 960, 130, GOLD, 'center', qq); txt(g, '爱因斯坦', 1600, 960, 40, '#cfe0ff', 'center', qq, 900); }
  };
  // 1918–1932: the Zuiderzee, the dam, the water calculation
  D.dam = function (g, lt, L) {
    var a = ap(lt, L[0], 0.5); chip(g, 1450, 300, '荷兰 · 1918', GOLD, a, 28);
    g.save(); g.globalAlpha *= a;
    var sea = g.createLinearGradient(0, 340, 0, 470); sea.addColorStop(0, 'rgba(40,90,160,0.85)'); sea.addColorStop(1, 'rgba(24,60,110,0.6)'); g.fillStyle = sea; g.fillRect(1120, 340, 660, 130);
    for (var i = 0; i < 6; i++) { g.strokeStyle = 'rgba(160,200,255,0.35)'; g.lineWidth = 2; g.beginPath(); for (var x = 0; x <= 660; x += 6) { var yy = 370 + i * 18 + Math.sin(x * 0.05 + lt * 2 + i) * 5; if (x) g.lineTo(1120 + x, yy); else g.moveTo(1120 + x, yy); } g.stroke(); }
    g.fillStyle = 'rgba(168,149,122,0.55)'; g.fillRect(1120, 470, 230, 480); g.fillRect(1550, 470, 230, 480);                         // land on both sides
    var bay = g.createLinearGradient(0, 470, 0, 940); bay.addColorStop(0, 'rgba(46,110,180,0.85)'); bay.addColorStop(1, 'rgba(30,76,130,0.8)'); g.fillStyle = bay;
    g.beginPath(); g.moveTo(1350, 470); g.lineTo(1550, 470); g.bezierCurveTo(1580, 600, 1640, 760, 1500, 930); g.lineTo(1400, 930); g.bezierCurveTo(1260, 760, 1320, 600, 1350, 470); g.fill();
    g.restore();
    txt(g, '北海', 1230, 410, 30, '#bfe0ff', 'center', a, 900); txt(g, '须德海', 1450, 885, 34, '#e4f0ff', 'center', ap(lt, L[1], 0.5), 900);
    var dm = ap(lt, L[1], 0.5); chip(g, 1450, 980, '把海湾封起来', BLUE, dm * (1 - ap(lt, L[4], 0.5)), 26);
    var tide = ap(lt, L[2], 0.5); if (tide > 0) for (var k = 0; k < 4; k++) { var ph = (lt * 0.8 + k * 0.25) % 1; g.save(); g.globalAlpha *= tide * (1 - ph); g.strokeStyle = '#bfe0ff'; g.lineWidth = 4; var x0 = 1200 + k * 120; g.beginPath(); g.moveTo(x0, 360 + ph * 90); g.lineTo(x0, 440 + ph * 90); g.lineTo(x0 - 10, 425 + ph * 90); g.moveTo(x0, 440 + ph * 90); g.lineTo(x0 + 10, 425 + ph * 90); g.stroke(); g.restore(); }
    chip(g, 1650, 500, '潮水涨多高？', RED, ap(lt, L[3], 0.5), 28);
    var c = ap(lt, L[5], 0.5); if (c > 0) { chip(g, 1450, 980, '洛伦兹委员会 · 1918–1926', GOLD, c, 26); }
    var net = ap(lt, L[7], 0.5); if (net > 0) { var N = [[1385, 545], [1455, 585], [1525, 545], [1410, 650], [1485, 680], [1450, 740]]; var E2 = [[0, 1], [1, 2], [1, 3], [1, 4], [3, 4], [4, 5], [3, 5]];
      g.save(); g.globalAlpha *= net; g.strokeStyle = 'rgba(255,255,255,0.75)'; g.lineWidth = 2.5; E2.forEach(function (e) { g.beginPath(); g.moveTo(N[e[0]][0], N[e[0]][1]); g.lineTo(N[e[1]][0], N[e[1]][1]); g.stroke(); });
      N.forEach(function (n) { glowDot(g, n[0], n[1], 6, GOLD, 1); }); g.restore();
      E2.forEach(function (e, i) { var p = (lt * 0.7 + i * 0.17) % 1; glowDot(g, N[e[0]][0] + (N[e[1]][0] - N[e[0]][0]) * p, N[e[0]][1] + (N[e[1]][1] - N[e[0]][1]) * p, 5, '#fff3c8', net); }); formula(g, '流体力学方程', 1450, 800, 30, GOLD, ap(lt, L[6], 0.5)); }
    var d = ap(lt, L[9], 0.5); if (d > 0) { var p2 = eo((lt - L[9]) / 1.4); g.save(); g.globalAlpha *= d; g.strokeStyle = '#e8d8b0'; g.lineWidth = 16; g.lineCap = 'round'; g.shadowColor = GOLD; g.shadowBlur = 14; g.beginPath(); g.moveTo(1350, 470); g.lineTo(1350 + 200 * p2, 470); g.stroke(); g.restore(); chip(g, 1450, 440, '大坝 · 1932', GOLD, d * ap(lt, L[10], 0.3), 26); }
    var ok = ap(lt, L[12], 0.5); if (ok > 0) { g.save(); g.globalAlpha *= ok; g.strokeStyle = '#7dffb0'; g.shadowColor = '#7dffb0'; g.shadowBlur = 14; g.lineWidth = 9; g.lineCap = 'round'; g.beginPath(); g.moveTo(1640, 560); g.lineTo(1668, 590); g.lineTo(1712, 530); g.stroke(); g.restore(); chip(g, 1670, 640, '预测 · 相当准', '#7dffb0', ok, 26); }
  };
  // today: the dam, the formula, a satellite clock
  D.today = function (g, lt, L) {
    var y0 = ap(lt, L[0], 0.5); mono(g, '1928', 1450, 330, 44, DIM, 'center', y0 * (1 - ap(lt, L[1], 0.5)));
    var d = ap(lt, L[1], 0.5); if (d > 0) { g.save(); g.globalAlpha *= d; var sea = g.createLinearGradient(0, 360, 0, 440); sea.addColorStop(0, 'rgba(40,90,160,0.9)'); sea.addColorStop(1, 'rgba(30,70,130,0.6)'); g.fillStyle = sea; g.fillRect(1130, 360, 330, 90); g.fillStyle = 'rgba(30,76,130,0.7)'; g.fillRect(1560, 400, 210, 50);
      g.fillStyle = '#d8c8a0'; g.shadowColor = GOLD; g.shadowBlur = 12; g.fillRect(1130, 440, 640, 20); g.restore(); chip(g, 1450, 500, '阿夫鲁戴克大坝 · 今天还在', GOLD, d, 26); }
    formula(g, 'γ = 1 / √(1 − v²/c²)', 1450, 620, 50, GOLD, ap(lt, L[2], 0.6));
    var s = ap(lt, L[3], 0.5); if (s > 0) { earth(g, 1450, 810, 80, s); g.save(); g.globalAlpha *= s; g.strokeStyle = 'rgba(200,210,230,0.5)'; g.lineWidth = 2; g.setLineDash([6, 8]); g.beginPath(); g.ellipse(1450, 810, 190, 96, 0, 0, 6.29); g.stroke(); g.setLineDash([]); g.restore();
      var an = lt * 0.9; var sx = 1450 + Math.cos(an) * 190, sy = 810 + Math.sin(an) * 96; glowDot(g, sx, sy, 7, '#cfe0ff', s); clock(g, sx, sy - 40, 22, (lt * 0.6) % 1, s, GOLD); chip(g, 1450, 960, '卫星导航的钟', BLUE, s, 26); }
    var n = ap(lt, L[5], 0.6); if (n > 0) gtxt(g, '洛伦兹', 1700, 740, 60, GOLD, 'center', n);
  };
