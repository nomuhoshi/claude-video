
  // ---------- Einstein props (part 2) ----------
  function deskLamp(g, x, y, s, a, glow) {                                              // desk with a lamp; (x,y) = desk top centre
    if (a <= 0) return; g.save(); g.globalAlpha *= a; g.translate(x, y); g.scale(s, s);
    if (glow > 0) { var gr = g.createRadialGradient(30, -110, 5, 30, -20, 300); gr.addColorStop(0, 'rgba(255,224,150,' + (0.5 * glow).toFixed(3) + ')'); gr.addColorStop(1, 'rgba(255,224,150,0)');
      g.fillStyle = gr; g.beginPath(); g.moveTo(-8, -112); g.lineTo(68, -112); g.lineTo(260, 0); g.lineTo(-190, 0); g.closePath(); g.fill(); }
    g.fillStyle = '#3a2f20'; g.fillRect(-210, 0, 420, 22); g.fillStyle = '#2a2218'; g.fillRect(-190, 22, 20, 100); g.fillRect(170, 22, 20, 100);
    g.strokeStyle = '#b9a77e'; g.lineWidth = 7; g.lineCap = 'round'; g.beginPath(); g.moveTo(130, 0); g.lineTo(130, -22); g.lineTo(84, -112); g.lineTo(34, -150); g.stroke();
    g.fillStyle = glow > 0 ? '#e8cf8a' : '#8a7a58'; g.beginPath(); g.moveTo(-4, -150); g.lineTo(64, -150); g.lineTo(84, -108); g.lineTo(-24, -108); g.closePath(); g.fill();
    g.restore();
  }
  function envelope(g, x, y, w, a, rot) {
    if (a <= 0) return; g.save(); g.globalAlpha *= a; g.translate(x, y); g.rotate(rot || 0); var h = w * 0.64;
    g.fillStyle = '#d8ceb4'; g.shadowColor = 'rgba(0,0,0,0.5)'; g.shadowBlur = 12; g.fillRect(-w / 2, -h / 2, w, h); g.shadowBlur = 0;
    g.strokeStyle = 'rgba(90,70,40,0.7)'; g.lineWidth = 2; g.strokeRect(-w / 2, -h / 2, w, h); g.beginPath(); g.moveTo(-w / 2, -h / 2); g.lineTo(0, h * 0.08); g.lineTo(w / 2, -h / 2); g.stroke(); g.restore();
  }
  function crossX(g, x, y, s, col, a) {
    if (a <= 0) return; g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = 12; g.lineCap = 'round'; g.shadowColor = col; g.shadowBlur = 18;
    g.beginPath(); g.moveTo(x - s, y - s); g.lineTo(x + s, y + s); g.moveTo(x + s, y - s); g.lineTo(x - s, y + s); g.stroke(); g.restore();
  }
  function waveP(g, x0, x1, y, amp, wl, ph, col, a, lw) {                              // a sine wave from x0 to x1
    if (a <= 0) return; g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = lw || 5; g.shadowColor = col; g.shadowBlur = 14; g.beginPath();
    for (var x = x0; x <= x1; x += 4) { var yy = y + amp * Math.sin((x - x0) / wl * 6.283 - ph); if (x === x0) g.moveTo(x, yy); else g.lineTo(x, yy); } g.stroke(); g.restore();
  }
  function clockP(g, x, y, r, a, ang) {
    if (a <= 0) return; g.save(); g.globalAlpha *= a; g.translate(x, y); g.fillStyle = 'rgba(20,28,44,0.95)'; g.strokeStyle = 'rgba(220,225,235,0.85)'; g.lineWidth = 4; g.beginPath(); g.arc(0, 0, r, 0, 6.29); g.fill(); g.stroke();
    g.lineWidth = 3; for (var i = 0; i < 12; i++) { var an = i / 12 * 6.283; g.beginPath(); g.moveTo(Math.sin(an) * r * 0.82, -Math.cos(an) * r * 0.82); g.lineTo(Math.sin(an) * r * 0.94, -Math.cos(an) * r * 0.94); g.stroke(); }
    g.strokeStyle = GOLD; g.shadowColor = GOLD; g.shadowBlur = 10; g.lineWidth = 6; g.lineCap = 'round'; g.beginPath(); g.moveTo(0, 0); g.lineTo(Math.sin(ang) * r * 0.7, -Math.cos(ang) * r * 0.7); g.stroke(); g.restore();
  }
  function microview(g, x, y, r, a, tint) {                                              // a round microscope field
    if (a <= 0) return; g.save(); g.globalAlpha *= a; var gr = g.createRadialGradient(x, y, 10, x, y, r); gr.addColorStop(0, 'rgba(60,100,150,' + (0.4 * (tint == null ? 1 : tint)).toFixed(3) + ')'); gr.addColorStop(1, 'rgba(20,40,70,' + (0.55 * (tint == null ? 1 : tint)).toFixed(3) + ')');
    g.fillStyle = gr; g.beginPath(); g.arc(x, y, r, 0, 6.29); g.fill(); g.strokeStyle = 'rgba(200,215,240,0.8)'; g.lineWidth = 6; g.shadowColor = '#9cc4ff'; g.shadowBlur = 16; g.stroke(); g.restore();
  }
  function pie(g, x, y, r, a, lits, cols) {                                               // 3 equal slices; lits[i] in 0..1
    if (a <= 0) return; g.save(); g.globalAlpha *= a;
    for (var i = 0; i < 3; i++) { var a0 = -Math.PI / 2 + i * 2.0944, a1 = a0 + 2.0944 * 0.98, l = lits[i] || 0;
      g.beginPath(); g.moveTo(x, y); g.arc(x, y, r, a0, a1); g.closePath(); g.fillStyle = l > 0 ? rgba(cols[i], 0.1 + 0.26 * l) : 'rgba(40,52,76,0.6)'; g.shadowColor = l > 0 ? cols[i] : 'transparent'; g.shadowBlur = l > 0 ? 8 * l : 0; g.fill();
      g.strokeStyle = 'rgba(200,210,230,0.7)'; g.lineWidth = 3; g.stroke(); }
    g.restore();
  }
  function photon(g, x, y, s, col, a, ph) {                                              // a small wave-packet: glow dot with a short wavy tail to the left
    if (a <= 0) return; g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = 3; g.shadowColor = col; g.shadowBlur = 10; g.beginPath();
    for (var k = 0; k <= 20; k++) { var xx = x - 60 * s + k * 3 * s, yy = y + 9 * s * Math.sin(k * 0.9 - ph) * (k / 20); if (k) g.lineTo(xx, yy); else g.moveTo(xx, yy); } g.stroke(); g.restore(); glowDot(g, x, y, 8 * s, col, a);
  }
  function uni(g, x, y, s, a) {                                                          // a small columned university building
    if (a <= 0) return; g.save(); g.globalAlpha *= a; g.translate(x, y); g.scale(s, s); g.strokeStyle = 'rgba(200,215,240,0.85)'; g.fillStyle = 'rgba(30,40,62,0.9)'; g.lineWidth = 3;
    g.beginPath(); g.moveTo(-130, -150); g.lineTo(0, -215); g.lineTo(130, -150); g.closePath(); g.fill(); g.stroke(); g.fillRect(-130, -150, 260, 20); g.strokeRect(-130, -150, 260, 20);
    for (var i = 0; i < 5; i++) { g.fillRect(-105 + i * 52 - 9, -128, 18, 112); g.strokeRect(-105 + i * 52 - 9, -128, 18, 112); }
    g.fillRect(-145, -16, 290, 16); g.strokeRect(-145, -16, 290, 16); g.restore();
  }
  // random walk of a grain in the microscope view (precomputed, deterministic)
  var WALK = (function () { var p = [[0, 0]], x = 0, y = 0; for (var k = 1; k < 600; k++) { x += (rnd(k * 2.1) - 0.5) * 80 - x * 0.02; y += (rnd(k * 3.7 + 1) - 0.5) * 80 - y * 0.02; p.push([x, y]); } return p; })();
  function walkAt(t) { var u = Math.max(0, t) / 0.1, k = Math.floor(u), f = u - k; if (k >= 598) return WALK[598]; return [WALK[k][0] + (WALK[k + 1][0] - WALK[k][0]) * f, WALK[k][1] + (WALK[k + 1][1] - WALK[k][1]) * f]; }
  function manuscript(g, x, y, w, h, a, rot, sym, col, glow) {                           // a manuscript sheet with a symbol
    if (a <= 0) return; g.save(); g.globalAlpha *= a; g.translate(x, y); g.rotate(rot || 0); g.shadowColor = glow ? col : 'rgba(0,0,0,0.6)'; g.shadowBlur = glow ? 30 : 18;
    g.fillStyle = '#d9cfb4'; g.fillRect(-w / 2, -h / 2, w, h); g.shadowBlur = 0; g.fillStyle = 'rgba(70,55,35,0.55)';
    for (var i = 0; i < 7; i++) g.fillRect(-w / 2 + 14, -h / 2 + h * 0.5 + i * 12, (0.5 + 0.45 * rnd(i + w)) * (w - 28), 3);
    g.textAlign = 'center'; g.font = '900 ' + Math.round(Math.min(w * 0.3, 60)) + 'px ' + SERIF; g.fillStyle = col === GOLD ? '#7a4a0c' : '#1d3a6e'; g.fillText(sym, 0, -h * 0.12); g.restore();
  }

  // ---------- scenes ----------
  var D = {};
  // hook: 1905, the patent office; day job, night papers; five manuscripts; the name
  D.h0 = function (g, lt, L) {
    var c0 = ap(lt, L[0], 0.6) * (1 - ap(lt, L[1], 0.5)); if (c0 > 0) { calPage(g, 1450, 640, 360, 300, '伯尔尼', '1905', '瑞士', c0); chip(g, 1450, 300, '1905 · 瑞士', BLUE, c0, 30); }
    var o = ap(lt, L[1], 0.7) * (1 - ap(lt, L[4], 0.5)); if (o > 0) {
      var night = ap(lt, L[3], 0.8);
      chip(g, 1450, 300, night > 0.5 ? '下班以后 · 自己的论文' : (ap(lt, L[2], 0.5) > 0.5 ? '白天 · 审核专利' : '伯尔尼 · 专利局'), night > 0.5 ? GOLD : BLUE, o, 30);
      deskLamp(g, 1450, 780, 1.5, o, night); avatar(g, 1450, 560, 84, night > 0.5 ? GOLD : '#9aa8c8', o);
      chip(g, 1450, 880, '三级技术员', INK, ap(lt, L[1], 0.5) * o, 26);
      var dy = ap(lt, L[2], 0.6) * (1 - night); if (dy > 0) { sun(g, 1640, 410, 38, dy * o, lt); for (var i = 0; i < 4; i++) doc(g, 1280 + i * 14, 740 - i * 6, 150, 190, dy * o * 0.9, -0.05 + i * 0.03, '', i + 2); stamp(g, 1330, 640, '通过', lt - L[2] - 0.5, dy * o); }
      if (night > 0) { g.save(); g.globalAlpha *= night * o; g.fillStyle = '#e9e2d0'; g.beginPath(); g.arc(1640, 410, 34, 0, 6.29); g.fill(); g.fillStyle = 'rgba(8,10,16,1)'; g.beginPath(); g.arc(1654, 400, 30, 0, 6.29); g.fill(); g.restore();
        manuscript(g, 1330, 720, 150, 190, night * o, -0.06, 'hν', GOLD, false); } }
    var fv = ap(lt, L[4], 0.7) * (1 - ap(lt, L[7], 0.5)); if (fv > 0) {
      var S = [['hν', GOLD, '光子'], ['分子', BLUE, '分子'], ['抖', GOLD, '花粉'], ['Δt', BLUE, '时空'], ['mc²', GOLD, '质能']];
      chip(g, 1450, 300, '这一年 · 五篇论文', GOLD, fv, 30);
      var hi = ap(lt, L[5], 0.5), gl = ap(lt, L[6], 0.6);
      for (var k = 0; k < 5; k++) { var p = eo((lt - L[4] - 0.2 - k * 0.22) / 0.6); if (p <= 0) continue; var xx = 1450 + (k - 2) * 135, yy = 640 - 30 * Math.sin(k * 0.7) - 40 * (k === 2 ? hi : 0);
        manuscript(g, xx, yy + 60 * (1 - p), 150, 210, fv * p, (k - 2) * 0.1, S[k][0], S[k][1], gl * (k === 2 ? 1 : 0.5) > 0.3);
        mono(g, S[k][2], xx, yy + 150, 22, DIM, 'center', fv * p); }
      if (hi > 0) { var gg = g.createRadialGradient(1450, 620, 10, 1450, 620, 330); gg.addColorStop(0, 'rgba(255,214,140,' + (0.28 * gl).toFixed(3) + ')'); gg.addColorStop(1, 'rgba(255,214,140,0)'); g.save(); g.globalAlpha *= fv; g.fillStyle = gg; g.fillRect(1100, 300, 700, 700); g.restore(); } }
    var nm = ap(lt, L[7], 0.7); if (nm > 0) { gtxt(g, '爱因斯坦', 1450, 620, 120, '#ffe7b0', 'center', nm); mono(g, '1879 – 1955', 1450, 700, 34, GOLD, 'center', nm);
      var a26 = ap(lt, L[8], 0.5); if (a26 > 0) { chip(g, 1330, 820, '26 岁', GOLD, a26 * nm, 28); chip(g, 1570, 820, '大学 · 教席', INK, a26 * nm, 26); crossX(g, 1570, 820, 22, RED, ap(lt, L[8] + 0.8, 0.4) * nm * 0.9); } }
  };
  // 1879 Ulm, Munich; the compass
  D.compass = function (g, lt, L) {
    var hm = ap(lt, L[0], 0.6) * (1 - ap(lt, L[2], 0.5)); if (hm > 0) { chip(g, 1450, 300, '乌尔姆 · 1879', BLUE, hm, 30); house(g, 1450, 640, 2.4, hm); chip(g, 1450, 840, '慕尼黑 · 长大', INK, ap(lt, L[1], 0.5) * hm, 26); }
    var cp = ap(lt, L[2], 0.7); if (cp > 0) {
      var w = Math.max(0, lt - L[2] - 0.5), nd = -Math.PI / 2 + 1.2 * Math.exp(-w * 1.3) * Math.cos(w * 7);
      var cr = 0.9 * Math.sin((lt - L[3]) * 1.1) * ap(lt, L[3], 0.5), cx = 1450, cy = 650, R = 150; var dim = 1 - 0.35 * ap(lt, L[6], 0.6);
      avatar(g, 1230, 840, 62, '#9aa8c8', cp); chip(g, 1230, 940, '父亲', INK, cp, 22); avatar(g, 1670, 860, 40, GOLD, cp); chip(g, 1670, 940, '五岁', GOLD, cp, 22);
      g.save(); g.globalAlpha *= cp * dim; g.translate(cx, cy); g.rotate(cr); g.fillStyle = 'rgba(20,28,44,0.95)'; g.strokeStyle = '#c9b27a'; g.lineWidth = 8; g.beginPath(); g.arc(0, 0, R, 0, 6.29); g.fill(); g.stroke();
      g.strokeStyle = 'rgba(200,210,230,0.7)'; g.lineWidth = 3; for (var i = 0; i < 24; i++) { var an = i / 24 * 6.283, r1 = i % 6 === 0 ? R * 0.8 : R * 0.88; g.beginPath(); g.moveTo(Math.cos(an) * R * 0.94, Math.sin(an) * R * 0.94); g.lineTo(Math.cos(an) * r1, Math.sin(an) * r1); g.stroke(); }
      g.restore();
      g.save(); g.globalAlpha *= cp * dim; g.translate(cx, cy); g.rotate(nd + Math.PI / 2); g.fillStyle = RED; g.shadowColor = RED; g.shadowBlur = 12; g.beginPath(); g.moveTo(0, -R * 0.78); g.lineTo(14, 0); g.lineTo(-14, 0); g.closePath(); g.fill();
      g.fillStyle = '#d8dce6'; g.shadowBlur = 0; g.beginPath(); g.moveTo(0, R * 0.78); g.lineTo(14, 0); g.lineTo(-14, 0); g.closePath(); g.fill(); g.fillStyle = '#c9b27a'; g.beginPath(); g.arc(0, 0, 8, 0, 6.29); g.fill(); g.restore();
      chip(g, 1450, 300, '指南针', GOLD, cp * (1 - ap(lt, L[6], 0.5)), 30);
      var f = ap(lt, L[4], 0.6) * (1 - ap(lt, L[6], 0.5)); if (f > 0) { for (var j = 0; j < 8; j++) { var an2 = j / 8 * 6.283 + 0.4, ex = cx + Math.cos(an2) * 300, ey = cy + Math.sin(an2) * 260, ix = cx + Math.cos(an2) * 190, iy = cy + Math.sin(an2) * 170;
          arrow(g, ex, ey, ix, iy, 'rgba(134,182,255,0.8)', f * cp, 1, -lt * 40); }
        chip(g, 1450, 420, '空空的空间里 · 有什么？', BLUE, f * cp, 26); }
      var wd = ap(lt, L[6], 0.7); if (wd > 0) { gtxt(g, '惊奇', 1450, 880, 110, '#ffe7b0', 'center', wd); chip(g, 1450, 300, '一辈子没忘', GOLD, wd, 30); } }
  };
  // school, Italy, the failed exam, Aarau
  D.aarau = function (g, lt, L) {
    var sch = ap(lt, L[0], 0.6) * (1 - ap(lt, L[1], 0.5)); if (sch > 0) { chip(g, 1450, 300, '慕尼黑 · 学校', BLUE, sch, 30); g.save(); g.globalAlpha *= sch; g.fillStyle = '#1f3a2e'; g.fillRect(1230, 400, 440, 240); g.strokeStyle = '#8a6a3a'; g.lineWidth = 8; g.strokeRect(1230, 400, 440, 240);
      g.fillStyle = 'rgba(235,235,225,0.8)'; g.font = '700 38px ' + SERIF; g.textAlign = 'center'; for (var i = 0; i < 3; i++) g.fillText('背 背 背 背 背', 1450, 470 + i * 56); g.restore();
      for (var k = 0; k < 5; k++) avatar(g, 1270 + k * 100, 760, 36, '#9aa8c8', sch); chip(g, 1450, 870, '死记硬背', RED, ap(lt, L[0] + 0.5, 0.5) * sch, 28); }
    var mp = ap(lt, L[1], 0.6) * (1 - ap(lt, L[3], 0.5)); if (mp > 0) { chip(g, 1450, 300, '1894 · 搬去意大利', BLUE, mp, 28);
      var mx = 1290, my = 520, ix = 1590, iy = 790; glowDot(g, mx, my, 12, GOLD, mp); glowDot(g, ix, iy, 12, BLUE, mp); txt(g, '慕尼黑', mx, my - 30, 28, INK, 'center', mp); txt(g, '米兰', ix, iy + 52, 28, INK, 'center', mp);
      var u = eo((lt - L[1] - 0.3) / 1.4); arrow(g, mx + 30, my + 30, ix - 30, iy - 30, 'rgba(236,230,218,0.8)', mp, u, lt * 30); avatar(g, mx + (ix - mx) * u, my + (iy - my) * u, 30, '#9aa8c8', mp * u * (1 - 0.0));
      var kid = ap(lt, L[2], 0.5); avatar(g, mx - 60, my + 50, 28, GOLD, mp * (1 - 0.7 * kid)); if (kid > 0) { chip(g, 1450, 920, '没拿文凭 · 离开中学', RED, kid * mp, 26); crossX(g, 1300, 700, 28, RED, kid * mp * 0.8); doc(g, 1300, 700, 100, 130, kid * mp * 0.7, -0.05, '', 9); } }
    var ex = ap(lt, L[3], 0.7) * (1 - ap(lt, L[6], 0.5)); if (ex > 0) { chip(g, 1450, 300, '1895 · 联邦理工学院', GOLD, ex, 28); card(g, 1200, 380, 500, 120, GOLD, ex); txt(g, '苏黎世联邦理工', 1450, 458, 46, INK, 'center', ex, 900);
      var sc = [['数学', 0.95, GREEN], ['物理', 0.9, GREEN], ['其他科目', 0.38, RED]]; var pass = 1290 + 0.6 * 360;
      sc.forEach(function (s, i) { var on = i < 2 ? ap(lt, L[4] + i * 0.4, 0.5) : ap(lt, L[5], 0.5); txt(g, s[0], 1270, 596 + i * 90, 30, INK, 'right', ex * on, 700); hbar(g, 1290, 570 + i * 90, 360 * s[1] * eo((lt - (i < 2 ? L[4] + i * 0.4 : L[5])) / 0.8), 36, s[2], ex * on, 14); });
      var pl = ap(lt, L[4], 0.5); g.save(); g.globalAlpha *= ex * pl; g.strokeStyle = 'rgba(236,230,218,0.7)'; g.setLineDash([10, 8]); g.lineWidth = 3; g.beginPath(); g.moveTo(pass, 545); g.lineTo(pass, 810); g.stroke(); g.setLineDash([]); g.restore(); txt(g, '及格线', pass, 850, 24, DIM, 'center', ex * pl, 700);
      chip(g, 1450, 920, ap(lt, L[5], 0.5) > 0.5 ? '别的科目 · 没过线' : '数学 · 物理 · 极好', ap(lt, L[5], 0.5) > 0.5 ? RED : GREEN, ex * ap(lt, L[4], 0.5), 28); }
    var ar = ap(lt, L[6], 0.7); if (ar > 0) { chip(g, 1450, 300, '阿劳 · 补读一年', BLUE, ar * (1 - ap(lt, L[7], 0.5)), 30); house(g, 1450, 640, 2.4, ar * (1 - ap(lt, L[7], 0.5)));
      var ok = ap(lt, L[7], 0.6); if (ok > 0) { check(g, 1450, 560, ok, GREEN, ok); gtxt(g, '考上了', 1450, 720, 100, GREEN, 'center', ok); chip(g, 1450, 300, '1896 · 联邦理工', GOLD, ok, 30); } }
  };
  // 16: chasing a beam of light
  D.chase = function (g, lt, L) {
    var vAt = function (s) { return 0.6 * E((s - L[1]) / 0.8) + 0.4 * E((s - L[2]) / 1.2); }; var v = vAt(lt);
    var ph = 0; for (var s = 0; s < lt; s += 0.05) ph += (1 - vAt(s)) * 16 * 0.05;
    var base = ap(lt, L[0], 0.6) * (1 - ap(lt, L[7], 0.5)); if (base > 0) {
      chip(g, 1450, 300, '阿劳 · 十六岁', BLUE, base * (1 - ap(lt, L[1], 0.5)), 30);
      var rs = ap(lt, L[1], 0.6) * (1 - ap(lt, L[7], 0.6)); chip(g, 1450, 300, ap(lt, L[4], 0.5) > 0.5 ? '静止的光波？' : '追着光跑', GOLD, rs, 30);
      var gy = 800; g.save(); g.globalAlpha *= base; g.strokeStyle = 'rgba(200,210,230,0.5)'; g.lineWidth = 3; g.beginPath(); g.moveTo(1180, gy + 50); g.lineTo(1720, gy + 50); g.stroke();
      for (var i = 0; i < 12; i++) { var gx = 1180 + ((i * 60 - lt * v * 380) % 720 + 720) % 720; if (gx < 1720) { g.beginPath(); g.moveTo(gx, gy + 50); g.lineTo(gx, gy + 62); g.stroke(); } } g.restore();
      avatar(g, 1290, 690, 54, GOLD, base); txt(g, '16', 1290, 780, 26, GOLD, 'center', base, 700);
      var wv = ap(lt, L[1], 0.6) * (1 - ap(lt, L[7], 0.6)); waveP(g, 1370, 1720, 650, 44 * (1 - 0.0), 96, ph, '#ffe7b0', wv, 6);
      if (ap(lt, L[1], 0.5) > 0) { arrow(g, 1400, 560, 1650, 560, GOLD, wv * (1 - ap(lt, L[2], 0.5)), 1, -lt * 60); txt(g, '光', 1700, 566, 28, GOLD, 'center', wv * (1 - ap(lt, L[2], 0.5)), 700); }
      var sp = ap(lt, L[2], 0.6) * (1 - ap(lt, L[7], 0.6)); chip(g, 1290, 900, ap(lt, L[2], 0.9) > 0.8 ? '和光一样快' : '越跑越快', ap(lt, L[2], 0.9) > 0.8 ? GOLD : INK, sp, 24);
      var q = ap(lt, L[3], 0.6) * (1 - ap(lt, L[4], 0.5)); gtxt(g, '？', 1450, 480, 150, 'rgba(255,230,160,0.95)', 'center', q * (0.75 + 0.25 * Math.sin(lt * 3)));
      var mx = ap(lt, L[5], 0.6) * (1 - ap(lt, L[6], 0.5)); if (mx > 0) { chip(g, 1450, 420, '麦克斯韦方程 · 没有这种波', BLUE, mx, 26); crossX(g, 1545, 650, 70, RED, mx * 0.9); }
      var pr = ap(lt, L[6], 0.6) * (1 - ap(lt, L[7], 0.5)); if (pr > 0) gtxt(g, '矛盾', 1450, 520, 110, RED, 'center', pr); }
    var tn = ap(lt, L[7], 0.7); if (tn > 0) { var on = Math.floor(10 * eo((lt - L[7] - 0.2) / 2.2)); ticks(g, 1290, 700, 10, on, GOLD, tn, 110, 40);
      gtxt(g, '十年', 1450, 500, 140, GOLD, 'center', tn); mono(g, '1895 → 1905', 1450, 790, 38, INK, 'center', tn); chip(g, 1450, 300, '这个矛盾', GOLD, tn, 30); }
  };
  // 1900-1902: graduation, no assistant post, letters, tutoring, the recommendation, the patent office, three eights
  D.patent = function (g, lt, L) {
    var dp = ap(lt, L[0], 0.6) * (1 - ap(lt, L[1], 0.5)); if (dp > 0) { chip(g, 1450, 300, '1900 · 联邦理工', BLUE, dp, 30); card(g, 1220, 440, 460, 280, GOLD, dp); txt(g, '毕业证书', 1450, 600, 60, INK, 'center', dp, 900); coin(g, 1450, 680, 20, dp); }
    var as = ap(lt, L[1], 0.6) * (1 - ap(lt, L[2], 0.5)); if (as > 0) { chip(g, 1450, 300, '留校 · 当助教', BLUE, as, 30); g.save(); g.globalAlpha *= as; g.fillStyle = '#3a2f20'; g.fillRect(1330, 400, 240, 380); g.strokeStyle = '#8a6a3a'; g.lineWidth = 6; g.strokeRect(1330, 400, 240, 380); g.fillStyle = GOLD; g.beginPath(); g.arc(1540, 600, 10, 0, 6.29); g.fill(); g.restore();
      txt(g, '助教', 1450, 470, 44, INK, 'center', as, 900); crossX(g, 1450, 600, 60, RED, ap(lt, L[1] + 0.8, 0.4) * as * 0.9); avatar(g, 1250, 760, 50, GOLD, as); }
    var lt2 = ap(lt, L[2], 0.6) * (1 - ap(lt, L[3], 0.5)); if (lt2 > 0) { chip(g, 1450, 300, '求职信 · 没有下文', RED, lt2, 28); avatar(g, 1250, 700, 58, GOLD, lt2);
      for (var i = 0; i < 5; i++) { var u = eo((lt - L[2] - i * 0.35) / 1.6); if (u <= 0) continue; envelope(g, 1320 + u * 330, 640 - i * 36 + 20 * Math.sin(u * 3 + i), 80, lt2 * (1 - u * u) , -0.15 + u * 0.3); } }
    var tu = ap(lt, L[3], 0.6) * (1 - ap(lt, L[4], 0.5)); if (tu > 0) { chip(g, 1450, 300, '代课老师 · 家教', BLUE, tu, 30); g.save(); g.globalAlpha *= tu; g.fillStyle = '#1f3a2e'; g.fillRect(1260, 420, 400, 220); g.strokeStyle = '#8a6a3a'; g.lineWidth = 7; g.strokeRect(1260, 420, 400, 220); g.fillStyle = 'rgba(235,235,225,0.85)'; g.font = '700 40px ' + SERIF; g.textAlign = 'center'; g.fillText('a² + b² = c²', 1460, 545); g.restore();
      avatar(g, 1290, 760, 50, GOLD, tu); for (var k = 0; k < 3; k++) avatar(g, 1450 + k * 90, 780, 32, '#9aa8c8', tu); }
    var gm = ap(lt, L[4], 0.6) * (1 - ap(lt, L[6], 0.5)); if (gm > 0) { chip(g, 1450, 300, '同学 · 格罗斯曼', BLUE, gm, 30); avatar(g, 1290, 620, 70, '#9aa8c8', gm); avatar(g, 1290, 620, 0.001, GOLD, 0); chip(g, 1290, 740, '格罗斯曼的父亲', INK, gm, 24);
      var pt = ap(lt, L[5], 0.6); if (pt > 0) { house(g, 1620, 650, 2.0, gm * pt); chip(g, 1620, 790, '伯尔尼专利局', INK, gm * pt, 24); envelope(g, 1290 + 330 * eo((lt - L[5]) / 1.2), 560, 70, gm * pt, 0); arrow(g, 1370, 600, 1520, 600, GOLD, gm * pt, eo((lt - L[5]) / 1.0), lt * 40); chip(g, 1450, 900, '推荐', GOLD, gm * pt, 28); } }
    var pa = ap(lt, L[6], 0.7) * (1 - ap(lt, L[7], 0.5)); if (pa > 0) { chip(g, 1450, 300, '1902 · 三级技术员', GOLD, pa, 30); deskLamp(g, 1450, 800, 1.5, pa, 0); avatar(g, 1450, 580, 78, '#9aa8c8', pa); for (var m = 0; m < 5; m++) doc(g, 1290 + m * 10, 730 - m * 8, 140, 170, pa * 0.85, -0.04 + m * 0.03, '', m + 1); stamp(g, 1620, 700, '通过', lt - L[6] - 0.9, pa); }
    var pe = ap(lt, L[7], 0.7); if (pe > 0) { chip(g, 1450, 300, '一天 · 三份', GOLD, pe, 30); var cols = [BLUE, GOLD, DIM], lits = [ap(lt, L[8], 0.6), ap(lt, L[8] + 1.7, 0.6), ap(lt, L[9], 0.6)];
      pie(g, 1450, 640, 200, pe, lits, cols);
      ['上班', '研究', '睡觉'].forEach(function (nm, i) { var an = -Math.PI / 2 + (i + 0.5) * 2.0944, px = 1450 + Math.cos(an) * 118, py = 640 + Math.sin(an) * 118; txt(g, nm, px, py, 38, '#fff', 'center', pe * lits[i], 900); mono(g, '8 h', px, py + 40, 28, INK, 'center', pe * lits[i]); }); }
  };
  // March: light quanta
  D.photon = function (g, lt, L) {
    var t0 = ap(lt, L[0], 0.6) * (1 - ap(lt, L[1], 0.5)); if (t0 > 0) { chip(g, 1450, 300, '第一篇 · 3 月', GOLD, t0, 30); manuscript(g, 1450, 640, 260, 340, t0, -0.04, 'hν', GOLD, true); mono(g, '光量子', 1450, 860, 34, GOLD, 'center', t0); }
    var ap1 = ap(lt, L[1], 0.7) * (1 - ap(lt, L[5], 0.5)) + ap(lt, L[7], 0.7) * (1 - ap(lt, L[9], 0.5)); ap1 = Math.min(1, ap1);
    if (ap1 > 0) {
      var bright = 0.5 + 0.5 * ap(lt, L[3], 0.8), hiF = ap(lt, L[4], 0.8), pm = ap(lt, L[7], 0.7) * (1 - ap(lt, L[9], 0.5)), col = hiF > 0.5 ? '#c59bff' : BLUE; var hx = 1450, hy = 800;
      g.save(); g.globalAlpha *= ap1; g.fillStyle = '#6a7384'; g.fillRect(1230, 800, 440, 36); g.strokeStyle = 'rgba(220,226,238,0.8)'; g.lineWidth = 3; g.strokeRect(1230, 800, 440, 36); g.restore(); txt(g, '金属板', 1450, 880, 26, DIM, 'center', ap1, 700);
      if (pm < 0.5) { g.save(); g.globalAlpha *= ap1 * ap(lt, L[1], 0.8); g.strokeStyle = rgba(col, 0.25 + 0.5 * bright); g.lineWidth = 10 + 16 * bright; g.shadowColor = col; g.shadowBlur = 20 * bright; g.beginPath(); g.moveTo(1250, 380); g.lineTo(hx, hy); g.stroke(); g.restore(); }
      else { for (var p = 0; p < 6; p++) { var u = ((lt * 0.9 + p / 6) % 1); photon(g, 1250 + (hx - 1250) * u, 380 + (hy - 380) * u, 1.4, col, ap1 * pm, lt * 10);
          var el = ap(lt, L[8], 0.4); if (el > 0 && u < 0.55) { var ag = u / 0.9, an3 = -1.0 + 0.15 * p; glowDot(g, hx + Math.cos(an3) * (150 + 180 * hiF) * ag * 1.2, hy - 4 + Math.sin(an3) * (150 + 180 * hiF) * ag * 1.2, 6, '#ffe7b0', ap1 * pm * el * (1 - u / 0.55)); } } }
      var rate = 2.2 + 3.2 * ap(lt, L[3], 0.8), spd = 150 + 180 * hiF, per = 1 / rate;
      if (pm < 0.5) for (var k = 0; k < 40; k++) { var ts = (L[2] - 0.2) + k * per; if (lt < ts && L[2] > 0) continue; var age = lt - ts; if (age < 0 || age > 1.6) continue; var an = -1.15 + 0.5 * rnd(k + 1.3);
        var ex = hx + Math.cos(an) * spd * age + (rnd(k + 9) - 0.5) * 120, ey = hy - 4 + Math.sin(an) * spd * age; glowDot(g, ex, ey, 6, '#ffe7b0', ap1 * (1 - age / 1.6) * ap(lt, L[2], 0.5)); }
      var ea = ap(lt, L[3], 0.5) * (1 - ap(lt, L[4], 0.5)); if (ea > 0) arrow(g, 1500, 740, 1500 + 150 * 0.8, 740 - 150 * 0.6 * 1.0, GOLD, ea * ap1, 1);
      var eb = ap(lt, L[4], 0.5); if (eb > 0 && pm < 0.5) arrow(g, 1500, 740, 1500 + 330 * 0.8, 740 - 330 * 0.6, GOLD, eb * ap1, 1);
      chip(g, 1450, 300, pm > 0.5 ? (ap(lt, L[8], 0.5) > 0.5 ? '一颗光子 · 一个电子' : '光 = 一颗一颗') : (hiF > 0.5 ? '更高频 · 电子更快' : (ap(lt, L[3], 0.5) > 0.5 ? '更亮 · 速度不变' : (ap(lt, L[2], 0.5) > 0.5 ? '打出电子' : '光电效应 · 赫兹'))), pm > 0.5 ? GOLD : (hiF > 0.5 ? '#c59bff' : BLUE), ap1, 30);
    }
    var st = ap(lt, L[5], 0.6) * (1 - ap(lt, L[7], 0.5)); if (st > 0) { chip(g, 1450, 300, '普朗克 · 一份一份', GOLD, st, 30); stairs(g, 1260, 820, 400, 320, 5, st, eo((lt - L[5]) / 1.4), GOLD); avatar(g, 1700, 520, 44, GOLD, st * ap(lt, L[5] + 0.4, 0.5)); txt(g, '能量交换', 1450, 900, 30, DIM, 'center', st * ap(lt, L[6], 0.5), 700); }
    var ba = ap(lt, L[9], 0.6) * (1 - ap(lt, L[10], 0.5)); if (ba > 0) { chip(g, 1450, 300, '频率越高 · 能量越大', GOLD, ba, 30); gtxt(g, 'E = hν', 1450, 440, 80, GOLD, 'center', ba);
      var B = [['低', 80, '#ff8a6a'], ['中', 160, BLUE], ['高', 250, '#c59bff']]; B.forEach(function (b, i) { var x = 1290 + i * 160, h = b[1] * eo((lt - L[9] - i * 0.3) / 0.8); hbar(g, x, 900 - h, 90, h, b[2], ba * 0.7, 10); txt(g, b[0], x + 45, 940, 28, INK, 'center', ba, 700); photon(g, x + 45, 880 - h, 1, b[2], ba * 0.9, lt * 8); }); }
    var nb = ap(lt, L[10], 0.6) * (1 - ap(lt, L[11], 0.5)); if (nb > 0) { chip(g, 1450, 300, '1921 · 诺贝尔物理学奖', GOLD, nb, 30); medal(g, 1450, 620, 130, nb, '1921'); chip(g, 1450, 840, '光电效应', GOLD, nb, 30); }
    var pk = ap(lt, L[11], 0.6); if (pk > 0) { chip(g, 1450, 300, '1905 · 普朗克', BLUE, pk, 30); avatar(g, 1450, 620, 90, GOLD, pk); crossX(g, 1450, 620, 130, RED, ap(lt, L[11] + 0.6, 0.4) * pk * 0.9); chip(g, 1450, 800, '不同意', RED, ap(lt, L[11] + 0.9, 0.5) * pk, 32); }
  };
  // May: Brownian motion
  D.brown = function (g, lt, L) {
    var cx = 1450, cy = 640, R = 230, mv = ap(lt, L[0], 0.7) * (1 - ap(lt, L[9], 0.6)); var wk = walkAt(lt * 1.0 - L[2] + 0), g0 = walkAt(lt); var gxp = cx + g0[0] * 0.9, gyp = cy + g0[1] * 0.9;
    var rd = Math.sqrt(g0[0] * g0[0] + g0[1] * g0[1]); if (rd > 150) { gxp = cx + g0[0] * 150 / rd; gyp = cy + g0[1] * 150 / rd; }
    if (mv > 0) {
      microview(g, cx, cy, R, mv, 1);
      var mo = ap(lt, L[1], 0.7) * (1 - ap(lt, L[8], 0.6)); if (mo > 0) for (var i = 0; i < 46; i++) { var a0 = rnd(i + 5) * 6.28, b0 = rnd(i + 8) * 6.28, x = cx + 200 * Math.sin(a0 + lt * (0.5 + 1.3 * rnd(i + 11))), y = cy + 200 * Math.sin(b0 + lt * (0.5 + 1.3 * rnd(i + 14))); if ((x - cx) * (x - cx) + (y - cy) * (y - cy) > (R - 14) * (R - 14)) continue; glowDot(g, x, y, 4, '#9cc4ff', mv * mo * 0.9); }
      var tr = ap(lt, L[4], 0.6); if (tr > 0) { g.save(); g.globalAlpha *= mv * tr; g.strokeStyle = 'rgba(255,214,140,0.8)'; g.lineWidth = 3; g.beginPath(); var t1 = Math.max(0, lt - 2.4), first = true; for (var q = t1; q <= lt; q += 0.1) { var w2 = walkAt(q), rr2 = Math.sqrt(w2[0] * w2[0] + w2[1] * w2[1]), sx = cx + w2[0] * 0.9, sy = cy + w2[1] * 0.9; if (rr2 > 150) { sx = cx + w2[0] * 150 / rr2; sy = cy + w2[1] * 150 / rr2; } if (first) { g.moveTo(sx, sy); first = false; } else g.lineTo(sx, sy); } g.stroke(); g.restore(); }
      var pol = ap(lt, L[8], 0.7); g.save(); g.globalAlpha *= mv; g.translate(gxp, gyp);
      if (pol > 0.01) { g.fillStyle = '#e8c04a'; g.shadowColor = '#e8c04a'; g.shadowBlur = 16; g.beginPath(); for (var s = 0; s < 18; s++) { var an = s / 18 * 6.283, rr3 = s % 2 ? 26 : 38; g.lineTo(Math.cos(an) * rr3, Math.sin(an) * rr3); } g.closePath(); g.fill(); }
      else { var gg = g.createRadialGradient(-8, -8, 2, 0, 0, 36); gg.addColorStop(0, '#ffe7b0'); gg.addColorStop(1, '#c9972e'); g.fillStyle = gg; g.shadowColor = GOLD; g.shadowBlur = 20; g.beginPath(); g.arc(0, 0, 34, 0, 6.29); g.fill(); }
      g.restore();
      var hit = ap(lt, L[3], 0.5) * (1 - ap(lt, L[4], 0.5)); if (hit > 0) for (var h = 0; h < 8; h++) { var an2 = h / 8 * 6.283 + lt * 2, ph = (lt * 3 + h * 0.37) % 1; arrow(g, gxp + Math.cos(an2) * (110 - 40 * ph), gyp + Math.sin(an2) * (110 - 40 * ph), gxp + Math.cos(an2) * 50, gyp + Math.sin(an2) * 50, 'rgba(134,182,255,0.9)', mv * hit * (0.5 + 0.5 * (1 - ph)), 1); }
      var ring = ap(lt, L[2], 0.5) * (1 - ap(lt, L[3], 0.5)); if (ring > 0) { g.save(); g.globalAlpha *= mv * ring; g.strokeStyle = GOLD; g.lineWidth = 4; g.shadowColor = GOLD; g.shadowBlur = 14; g.beginPath(); g.arc(gxp, gyp, 54 + 6 * Math.sin(lt * 5), 0, 6.29); g.stroke(); g.restore(); }
      var dist = ap(lt, L[5], 0.6) * (1 - ap(lt, L[6], 0.5)); if (dist > 0) { var o = walkAt(Math.max(0, lt - 2.4)); var ox = cx + o[0] * 0.9, oy = cy + o[1] * 0.9; g.save(); g.globalAlpha *= mv * dist; g.strokeStyle = GREEN; g.lineWidth = 4; g.setLineDash([10, 8]); g.shadowColor = GREEN; g.shadowBlur = 10; g.beginPath(); g.moveTo(ox, oy); g.lineTo(gxp, gyp); g.stroke(); g.setLineDash([]); g.restore(); glowDot(g, ox, oy, 7, GREEN, mv * dist); }
    }
    chip(g, 1450, 300, '第二篇 · 5 月', GOLD, ap(lt, L[0], 0.5) * (1 - ap(lt, L[1], 0.4)) * mv, 30);
    chip(g, 1450, 300, '水里 · 有分子？', BLUE, ap(lt, L[1], 0.5) * (1 - ap(lt, L[2], 0.4)) * mv, 30);
    chip(g, 1450, 300, '悬在水里的小颗粒', GOLD, ap(lt, L[2], 0.5) * (1 - ap(lt, L[3], 0.4)) * mv, 30);
    chip(g, 1450, 300, '四面八方 · 撞', BLUE, ap(lt, L[3], 0.5) * (1 - ap(lt, L[4], 0.4)) * mv, 30);
    chip(g, 1450, 300, '无规则 · 乱抖', GOLD, ap(lt, L[4], 0.5) * (1 - ap(lt, L[5], 0.4)) * mv, 30);
    chip(g, 1450, 300, '抖出多远 · 算得出', GREEN, ap(lt, L[5], 0.5) * (1 - ap(lt, L[6], 0.4)) * mv, 30);
    var ck = ap(lt, L[6], 0.6) * (1 - ap(lt, L[7], 0.5)); if (ck > 0) { chip(g, 1450, 300, '分子 · 能用实验检验', GREEN, ck, 30); check(g, 1450, 640, ap(lt, L[6] + 0.2, 0.6), GREEN, ck); }
    var br = ap(lt, L[7], 0.6); if (br > 0 && mv > 0) { chip(g, 1450, 300, '1827 · 布朗', BLUE, br * (1 - ap(lt, L[8], 0.5)) * mv, 30); avatar(g, 1250, 890, 52, '#9aa8c8', br * mv); chip(g, 1250, 975, '植物学家', INK, br * mv, 22); }
    chip(g, 1450, 300, '显微镜下 · 花粉', GOLD, ap(lt, L[8], 0.5) * mv, 30);
    var dc = ap(lt, L[9], 0.7) * (1 - ap(lt, L[11], 0.5)); if (dc > 0) { chip(g, 1450, 300, ap(lt, L[10], 0.5) > 0.5 ? '资料太粗 · 下不了结论' : '文末 · 这也许就是它', ap(lt, L[10], 0.5) > 0.5 ? RED : GOLD, dc, 28);
      doc(g, 1450, 640, 380, 460, dc, -0.03, '', 4); gtxt(g, ap(lt, L[10], 0.5) > 0.5 ? '？' : '≈', 1450, 700, 150, ap(lt, L[10], 0.5) > 0.5 ? RED : GOLD, 'center', dc); }
    var pe = ap(lt, L[11], 0.7); if (pe > 0) { chip(g, 1450, 300, '几年后 · 法国', BLUE, pe * (1 - ap(lt, L[12], 0.5)), 30); avatar(g, 1450, 600, 90, '#9aa8c8', pe * (1 - ap(lt, L[12], 0.5))); chip(g, 1450, 730, '佩兰', INK, pe * (1 - ap(lt, L[12], 0.5)), 28);
      var ok = ap(lt, L[12], 0.6); if (ok > 0) { chip(g, 1450, 300, '公式 · 被证实', GREEN, ok, 30); check(g, 1450, 560, ok, GREEN, ok); gtxt(g, '证实', 1450, 740, 110, GREEN, 'center', ok); } }
  };
  // June: special relativity
  D.relat = function (g, lt, L) {
    var o = ap(lt, L[0], 0.6) * (1 - ap(lt, L[1], 0.5)); if (o > 0) { chip(g, 1450, 300, '第三篇 · 6 月', GOLD, o, 30); waveP(g, 1260, 1680, 640, 40, 90, lt * 8, '#ffe7b0', o, 5); avatar(g, 1260, 760, 40, GOLD, o); txt(g, '十六岁的问题', 1450, 860, 34, INK, 'center', o, 700); }
    var pg = ap(lt, L[1], 0.6) * (1 - ap(lt, L[2], 0.5)); if (pg > 0) { chip(g, 1450, 300, '三十来页', GOLD, pg, 30); for (var i = 0; i < 6; i++) doc(g, 1400 + i * 18, 640 - i * 10, 280, 380, pg * (0.5 + 0.1 * i), -0.05 + i * 0.02, '', i + 3); mono(g, '参考文献 : 0', 1450, 900, 38, RED, 'center', ap(lt, L[1] + 0.8, 0.5) * pg); }
    var ru = ap(lt, L[2], 0.6) * (1 - ap(lt, L[5], 0.5)); if (ru > 0) { chip(g, 1450, 300, ap(lt, L[4], 0.5) > 0.5 ? '规矩二 · 光速不变' : (ap(lt, L[3], 0.5) > 0.5 ? '规矩一 · 定律处处一样' : '两条规矩'), GOLD, ru, 30);
      if (ap(lt, L[3], 0.5) < 0.01) { card(g, 1230, 420, 220, 300, GOLD, ru); card(g, 1470, 420, 220, 300, GOLD, ru); gtxt(g, '一', 1340, 610, 150, GOLD, 'center', ru); gtxt(g, '二', 1580, 610, 150, GOLD, 'center', ru); }
      var r1 = ap(lt, L[3], 0.6) * (1 - ap(lt, L[4], 0.5)); if (r1 > 0) { var tx = 1250 + 0.0; for (var c = 0; c < 2; c++) { var yy = 520 + c * 200, mvx = c === 0 ? ((lt * 70) % 120) : 0; g.save(); g.globalAlpha *= ru * r1; g.fillStyle = 'rgba(40,52,76,0.95)'; g.strokeStyle = 'rgba(200,215,240,0.8)'; g.lineWidth = 3; rr(g, 1300 + mvx, yy - 70, 300, 120, 14); g.fill(); g.stroke(); g.restore(); avatar(g, 1360 + mvx, yy - 10, 36, c ? '#9aa8c8' : GOLD, ru * r1); mono(g, 'F = ma', 1500 + mvx, yy - 2, 34, INK, 'center', ru * r1); if (c === 0) arrow(g, 1620 + mvx, yy - 10, 1690 + mvx, yy - 10, GOLD, ru * r1, 1); }
        txt(g, '匀速运动', 1220, 480, 24, DIM, 'right', ru * r1, 700); txt(g, '静止', 1220, 680, 24, DIM, 'right', ru * r1, 700); }
      var r2 = ap(lt, L[4], 0.6); if (r2 > 0) { for (var c2 = 0; c2 < 2; c2++) { var xx = 1290 + c2 * 320; avatar(g, xx, 600, 56, c2 ? '#9aa8c8' : GOLD, ru * r2); card(g, xx - 80, 700, 160, 100, GOLD, ru * r2); gtxt(g, 'c', xx, 775, 70, GOLD, 'center', ru * r2); }
        txt(g, '=', 1450, 760, 80, GOLD, 'center', ru * r2, 900); arrow(g, 1330, 560, 1400, 560, GOLD, ru * r2, 1, lt * 30); } }
    var ch = ap(lt, L[5], 0.6) * (1 - ap(lt, L[6], 0.5)); if (ch > 0) { chip(g, 1450, 300, '追上一束光', GOLD, ch, 30); avatar(g, 1290, 660, 54, GOLD, ch); waveP(g, 1400, 1700, 660, 36, 90, lt * 14, '#ffe7b0', ch, 5); crossX(g, 1545, 660, 70, RED, ap(lt, L[5] + 0.4, 0.4) * ch * 0.9); chip(g, 1450, 860, '根本不可能', RED, ap(lt, L[5] + 0.8, 0.5) * ch, 30); }
    var wd = ap(lt, L[6], 0.6) * (1 - ap(lt, L[8], 0.5)); if (wd > 0) { var dis = ap(lt, L[7], 0.8); chip(g, 1450, 300, dis > 0.3 ? '不再是怪事' : '迈克尔逊 · 以太风', dis > 0.3 ? GREEN : BLUE, wd, 30);
      for (var w = 0; w < 5; w++) arrow(g, 1230, 480 + w * 70, 1670, 480 + w * 70, 'rgba(134,182,255,0.8)', wd * (1 - dis), 1, -lt * 60);
      mono(g, '结果 : 0', 1450, 900, 42, GOLD, 'center', wd * (1 - dis)); var ok = dis; if (ok > 0) { check(g, 1450, 640, ok, GREEN, wd * ok); chip(g, 1450, 740, '不需要以太', GREEN, wd * ok, 28); } }
    var sm = ap(lt, L[8], 0.6) * (1 - ap(lt, L[10], 0.5)); if (sm > 0) { chip(g, 1450, 300, '光速 · 对谁都一样', GOLD, sm, 30); card(g, 1230, 440, 220, 150, GOLD, sm); card(g, 1470, 440, 220, 150, GOLD, sm); var ne = ap(lt, L[9], 0.5); gtxt(g, 'c', 1340, 540, 70, GOLD, 'center', sm * (1 - ne)); gtxt(g, 'c', 1580, 540, 70, GOLD, 'center', sm * (1 - ne));
      txt(g, '时间', 1340, 540, 54, INK, 'center', sm * ap(lt, L[9], 0.5), 900); txt(g, '长度', 1580, 540, 54, INK, 'center', sm * ap(lt, L[9] + 0.5, 0.5), 900);
      if (ap(lt, L[9], 0.5) > 0) { gtxt(g, '≠', 1450, 800, 150, RED, 'center', sm * ap(lt, L[9] + 0.8, 0.5)); chip(g, 1450, 900, '不能对谁都一样', RED, sm * ap(lt, L[9] + 1.0, 0.5), 28); } }
    var ck = ap(lt, L[10], 0.6) * (1 - ap(lt, L[11], 0.5)); if (ck > 0) { chip(g, 1450, 300, '运动的钟 · 走得慢', GOLD, ck, 30); clockP(g, 1320, 640, 110, ck, (lt - L[10]) * 2.0); clockP(g, 1580, 640, 110, ck, (lt - L[10]) * 1.2); txt(g, '静止', 1320, 830, 30, INK, 'center', ck, 700); txt(g, '运动', 1580, 830, 30, GOLD, 'center', ck, 700); arrow(g, 1500, 520, 1660, 520, GOLD, ck, 1, lt * 40); }
    var rl = ap(lt, L[11], 0.6) * (1 - ap(lt, L[12], 0.5)); if (rl > 0) { chip(g, 1450, 300, '运动的尺 · 变短', GOLD, rl, 30); var sh = 1 - 0.38 * eo((lt - L[11]) / 1.2);
      [[560, 1, '#9aa8c8', '静止'], [760, sh, GOLD, '运动']].forEach(function (r, i) { g.save(); g.globalAlpha *= rl; g.fillStyle = r[2]; g.shadowColor = r[2]; g.shadowBlur = 10; g.fillRect(1230, r[0], 440 * r[1], 46); g.fillStyle = 'rgba(0,0,0,0.6)'; for (var t = 0; t < 12; t++) g.fillRect(1230 + t * 40 * r[1], r[0], 3, 20); g.restore(); txt(g, r[3], 1210, r[0] + 36, 26, DIM, 'right', rl, 700); }); }
    var lo = ap(lt, L[12], 0.6) * (1 - ap(lt, L[13], 0.5)); if (lo > 0) { chip(g, 1450, 300, '洛伦兹 · 那组公式', BLUE, lo, 30); avatar(g, 1450, 520, 70, '#9aa8c8', lo); card(g, 1200, 640, 500, 190, GOLD, lo); mono(g, "x' = γ (x − vt)", 1450, 718, 40, INK, 'center', lo); mono(g, "t' = γ (t − vx/c²)", 1450, 786, 40, INK, 'center', lo); }
    var fin = ap(lt, L[13], 0.7); if (fin > 0) { var gl = g.createRadialGradient(1450, 620, 10, 1450, 620, 340); gl.addColorStop(0, 'rgba(255,214,140,' + (0.3 * fin).toFixed(3) + ')'); gl.addColorStop(1, 'rgba(255,214,140,0)'); g.fillStyle = gl; g.fillRect(1100, 300, 700, 700);
      chip(g, 1450, 300, '本身的性质', GOLD, fin, 30); gtxt(g, '时空', 1450, 660, 190, GOLD, 'center', fin); }
  };
  // September: E = mc²
  D.emc2 = function (g, lt, L) {
    var t0 = ap(lt, L[0], 0.6) * (1 - ap(lt, L[2], 0.5)); if (t0 > 0) { chip(g, 1450, 300, '第四篇 · 9 月', GOLD, t0, 30); var pgs = ap(lt, L[1], 0.6); manuscript(g, 1450, 640, 250, 330, t0, -0.03, 'mc²', GOLD, true); gtxt(g, '3 页', 1450, 880, 70, GOLD, 'center', pgs * t0); }
    var bd = ap(lt, L[2], 0.6) * (1 - ap(lt, L[4], 0.5)); if (bd > 0) { var sh = 1 - 0.22 * eo((lt - L[3]) / 1.4); chip(g, 1450, 300, ap(lt, L[3], 0.5) > 0.5 ? '质量 · 少一点点' : '放出能量', GOLD, bd, 30);
      g.save(); g.globalAlpha *= bd; g.translate(1450, 650); var s = 110 * sh; var gr = g.createRadialGradient(0, 0, 4, 0, 0, s); gr.addColorStop(0, '#fff3c8'); gr.addColorStop(1, '#c9972e'); g.fillStyle = gr; g.shadowColor = GOLD; g.shadowBlur = 30; g.fillRect(-s, -s, s * 2, s * 2); g.restore();
      for (var r = 0; r < 12; r++) { var an = r / 12 * 6.283, u = ((lt * 0.7 + r / 12) % 1); arrow(g, 1450 + Math.cos(an) * (s + 30), 650 + Math.sin(an) * (s + 30), 1450 + Math.cos(an) * (s + 30 + 130 * u), 650 + Math.sin(an) * (s + 30 + 130 * u), 'rgba(255,224,150,0.9)', bd * (1 - u), 1); } }
    var eq = ap(lt, L[4], 0.6) * (1 - ap(lt, L[5], 0.6)); if (eq > 0) { chip(g, 1450, 300, '同一种东西', GOLD, eq, 30); card(g, 1200, 520, 200, 140, BLUE, eq); card(g, 1500, 520, 200, 140, GOLD, eq); txt(g, '质量', 1300, 612, 56, INK, 'center', eq, 900); txt(g, '能量', 1600, 612, 56, INK, 'center', eq, 900); arrow(g, 1410, 580, 1490, 580, GOLD, eq, 1, lt * 30); arrow(g, 1490, 620, 1410, 620, GOLD, eq, 1, lt * 30); }
    var fm = ap(lt, L[5], 0.7) * (1 - ap(lt, L[7], 0.5)); if (fm > 0) { var gl = g.createRadialGradient(1450, 620, 10, 1450, 620, 360); gl.addColorStop(0, 'rgba(255,214,140,' + (0.4 * fm).toFixed(3) + ')'); gl.addColorStop(1, 'rgba(255,214,140,0)'); g.fillStyle = gl; g.fillRect(1100, 300, 700, 700); gtxt(g, 'E = mc²', 1450, 660, 150, GOLD, 'center', fm);
      var cc = ap(lt, L[6], 0.5); chip(g, 1450, 800, 'c · 光速 ≈ 3 × 10⁸ 米/秒', BLUE, cc * fm, 26); }
    var bg = ap(lt, L[7], 0.6) * (1 - ap(lt, L[8], 0.5)); if (bg > 0) { chip(g, 1450, 300, '一点点质量 · 巨大的能量', GOLD, bg, 30); var u = eo((lt - L[7] - 0.3) / 1.2); glowDot(g, 1450, 650, 8 + 30 * u * (1 - u) * 0 + 0, '#fff3c8', bg * (1 - u)); mono(g, '1 克', 1450, 760, 36, INK, 'center', bg * (1 - u));
      if (u > 0) { g.save(); g.globalAlpha *= bg * u; var gr2 = g.createRadialGradient(1450, 650, 5, 1450, 650, 120 + 220 * u); gr2.addColorStop(0, 'rgba(255,250,220,1)'); gr2.addColorStop(0.4, 'rgba(255,190,80,0.7)'); gr2.addColorStop(1, 'rgba(255,120,40,0)'); g.fillStyle = gr2; g.beginPath(); g.arc(1450, 650, 120 + 220 * u, 0, 6.29); g.fill(); g.restore(); mono(g, '≈ 9 × 10¹³ 焦耳', 1450, 900, 36, GOLD, 'center', bg * u); } }
    var sn = ap(lt, L[8], 0.7); if (sn > 0) { chip(g, 1450, 300, '太阳 · 每一秒', GOLD, sn, 30); sun(g, 1450, 600, 120, sn, lt);
      var n4 = ap(lt, L[9], 0.6); gtxt(g, '四百多万吨', 1450, 860, 96, GOLD, 'center', n4 * sn); mono(g, '≈ 4.3 × 10⁶ t / s', 1450, 930, 34, INK, 'center', n4 * sn);
      for (var m = 0; m < 6; m++) { var um = ((lt * 0.5 + m / 6) % 1); txt(g, 'm', 1450 + Math.cos(m * 1.05) * (160 + 90 * um), 600 + Math.sin(m * 1.05) * (160 + 90 * um), 30, '#ffe7b0', 'center', sn * n4 * (1 - um), 700); } }
  };
  // the same year: thesis, the foundations swapped, no replies, Planck answers, 1909, the next question
  D.year = function (g, lt, L) {
    var th = ap(lt, L[0], 0.6) * (1 - ap(lt, L[2], 0.5)); if (th > 0) { chip(g, 1450, 300, '同一年 · 博士论文', GOLD, th, 30); manuscript(g, 1450, 640, 250, 330, th, -0.03, '博士', GOLD, false); var mo = ap(lt, L[1], 0.6); if (mo > 0) { chip(g, 1450, 880, '分子 · 有多大', BLUE, th * mo, 28); for (var i = 0; i < 4; i++) glowDot(g, 1260 + i * 24, 640, 7, BLUE, th * mo); } }
    var fo = ap(lt, L[2], 0.6) * (1 - ap(lt, L[5], 0.5)); if (fo > 0) { var swap = eo((lt - L[4] + 0.6) / 1.2) * ap(lt, L[4], 0.01); var S = ['hν', '分子', '时空', 'mc²']; chip(g, 1450, 300, ap(lt, L[4], 0.5) > 0.5 ? '地基 · 换了一遍' : (ap(lt, L[3], 0.5) > 0.5 ? '一年之内' : '光子 · 分子 · 时空 · 质能'), GOLD, fo, 30);
      var bl = ap(lt, L[3], 0.6); if (bl > 0) { g.save(); g.globalAlpha *= fo * bl; g.fillStyle = 'rgba(40,52,76,0.95)'; g.strokeStyle = 'rgba(200,215,240,0.85)'; g.lineWidth = 3; g.fillRect(1220, 420, 460, 260); g.strokeRect(1220, 420, 460, 260); g.restore(); txt(g, '物理学', 1450, 570, 80, INK, 'center', fo * bl, 900); }
      for (var k = 0; k < 4; k++) { var x = 1220 + k * 117, enter = eo((lt - L[2] - k * 0.35) / 0.7), sw = eo((lt - L[4]) / 1.3); var oldA = bl * (1 - sw); if (oldA > 0) { g.save(); g.globalAlpha *= fo * oldA; g.fillStyle = '#4a5260'; g.fillRect(x, 690 + 90 * sw, 110, 90); g.restore(); }
        var ny = ap(lt, L[4], 0.01) > 0 ? 690 : 760 - 70 * (bl > 0 ? 1 : 0) + 0; var yy = bl > 0 ? 690 : 740; if (bl > 0 && sw < 1) yy = 690 + 120 * (1 - sw); if (bl <= 0) yy = 800 - 60 * enter;
        g.save(); g.globalAlpha *= fo * enter * (bl > 0 ? sw : 1); g.fillStyle = 'rgba(240,189,92,0.9)'; g.shadowColor = GOLD; g.shadowBlur = 14; g.fillRect(x, yy, 110, 90); g.fillStyle = '#3a2408'; g.font = '900 34px ' + SERIF; g.textAlign = 'center'; g.fillText(S[k], x + 55, yy + 58); g.restore(); } }
    var nr = ap(lt, L[5], 0.6) * (1 - ap(lt, L[6], 0.5)); if (nr > 0) { chip(g, 1450, 300, '几乎没人回信', RED, nr, 30); g.save(); g.globalAlpha *= nr; g.fillStyle = '#3a4560'; rr(g, 1350, 480, 200, 260, 16); g.fill(); g.strokeStyle = 'rgba(200,215,240,0.8)'; g.lineWidth = 4; g.stroke(); g.fillStyle = '#0a0d14'; g.fillRect(1380, 540, 140, 14); g.fillStyle = '#3a4560'; g.fillRect(1440, 740, 20, 120); g.restore(); txt(g, '空', 1450, 650, 70, DIM, 'center', nr * 0.6, 900); }
    var pl = ap(lt, L[6], 0.6) * (1 - ap(lt, L[8], 0.5)); if (pl > 0) { chip(g, 1450, 300, '第一个认真回应的 · 普朗克', GOLD, pl, 28); avatar(g, 1250, 640, 80, GOLD, pl); var u = eo((lt - L[6] - 0.3) / 1.4); envelope(g, 1330 + 280 * u, 610 - 40 * Math.sin(u * 3.14), 100, pl, -0.1 + 0.2 * u); mono(g, '', 1450, 880, 30, DIM, 'center', 0);
      g.save(); g.globalAlpha *= pl; g.fillStyle = '#3a4560'; rr(g, 1560, 520, 160, 210, 14); g.fill(); g.strokeStyle = 'rgba(200,215,240,0.8)'; g.lineWidth = 3; g.stroke(); g.fillStyle = '#0a0d14'; g.fillRect(1584, 566, 112, 12); g.restore();
      var nm = ap(lt, L[7], 0.6); if (nm > 0) gtxt(g, '普朗克', 1450, 860, 80, GOLD, 'center', nm * pl); }
    var yn = ap(lt, L[8], 0.6) * (1 - ap(lt, L[9], 0.5)); if (yn > 0) { chip(g, 1450, 300, '不信光子 · 看出相对论', GOLD, yn, 28); card(g, 1220, 440, 220, 220, RED, yn); card(g, 1480, 440, 220, 220, GREEN, yn); gtxt(g, 'hν', 1330, 580, 80, RED, 'center', yn); gtxt(g, '相对论', 1590, 570, 52, GREEN, 'center', yn); crossX(g, 1330, 550, 70, RED, yn * 0.9); check(g, 1590, 700, ap(lt, L[8] + 0.9, 0.6), GREEN, yn); }
    var lv = ap(lt, L[9], 0.6) * (1 - ap(lt, L[11], 0.5)); if (lv > 0) { chip(g, 1450, 300, '1909 · 离开专利局', BLUE, lv * (1 - ap(lt, L[10], 0.5)), 30); var to = eo((lt - L[10]) / 1.2); house(g, 1300 - 0 * to, 640, 1.8, lv * (1 - 0.7 * to)); uni(g, 1620, 650, 1.2, lv * to); arrow(g, 1400, 600, 1520, 600, GOLD, lv * ap(lt, L[10], 0.5), 1, lt * 40);
      chip(g, 1620, 820, '大学 · 教授', GOLD, lv * to, 26); chip(g, 1300, 820, '专利局', DIM, lv, 24); if (to > 0.5) chip(g, 1450, 300, '大学 · 教授', GOLD, lv * to, 30); }
    var qs = ap(lt, L[11], 0.6); if (qs > 0) { var ph2 = ap(lt, L[12], 0.6), tn = ap(lt, L[13], 0.7);
      if (tn < 0.99) { chip(g, 1450, 300, ph2 > 0 ? '光速不变 · 那引力呢' : '一个问题 · 还没解开', ph2 > 0 ? GOLD : RED, qs * (1 - tn), 30); gtxt(g, '？', ph2 > 0 ? 1380 : 1450, 560, 190, RED, 'center', qs * (1 - ph2 * 0.5) * (1 - tn) * (0.75 + 0.25 * Math.sin(lt * 3)));
        if (ph2 > 0) { g.save(); g.globalAlpha *= ph2 * (1 - tn); g.strokeStyle = '#ffe7b0'; g.lineWidth = 6; g.shadowColor = '#ffe7b0'; g.shadowBlur = 16; g.beginPath(); g.moveTo(1230, 740); g.lineTo(1690, 740); g.stroke(); g.restore(); txt(g, 'c 不变', 1460, 790, 34, '#ffe7b0', 'center', ph2 * (1 - tn), 700);
          var by = 420 + 280 * Math.min(1, Math.pow(((lt - L[12]) % 2.2) / 1.5, 2)); glowDot(g, 1620, by, 16, BLUE, ph2 * (1 - tn)); arrow(g, 1620, 400, 1620, 520, BLUE, ph2 * (1 - tn) * 0.8, 1, lt * 40); txt(g, '引力', 1690, 520, 32, BLUE, 'center', ph2 * (1 - tn), 700); } }
      if (tn > 0) { var on = Math.floor(10 * eo((lt - L[13] - 0.2) / 2.2)); ticks(g, 1290, 720, 10, on, GOLD, tn, 110, 40); gtxt(g, '十年', 1450, 520, 140, GOLD, 'center', tn); mono(g, '1905 → 1915', 1450, 810, 38, INK, 'center', tn); chip(g, 1450, 300, '这个问题 · 又想了', GOLD, tn, 30); } }
  };
