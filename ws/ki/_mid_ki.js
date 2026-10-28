  // ---------- Kirchhoff props ----------
  var GREEN = '#8fd9a8', ORANGE = '#ff9a4a';
  var PH = new Image(); PH.src = window.PHOTO_URI || ''; window.__PH = PH;           // his portrait (optional)
  function photoCard(g, img, x, y, w, h, a, filt, col) {                                // gold-framed photo
    if (a <= 0 || !img.complete || !img.naturalWidth) return false; col = col || GOLD; g.save(); g.globalAlpha *= a;
    g.fillStyle = '#000'; g.shadowColor = 'rgba(0,0,0,0.8)'; g.shadowBlur = 30; g.fillRect(x - 8, y - 8, w + 16, h + 16); g.shadowBlur = 0;
    g.filter = filt || 'none'; g.drawImage(img, x, y, w, h); g.filter = 'none';
    g.strokeStyle = col; g.lineWidth = 4; g.shadowColor = col; g.shadowBlur = 14; g.strokeRect(x - 8, y - 8, w + 16, h + 16); g.restore(); return true;
  }
  function wl2rgb(nm) {                                                                  // visible wavelength -> [r,g,b] (nm 380..780)
    var r = 0, gg = 0, b = 0, f;
    if (nm >= 380 && nm < 440) { r = -(nm - 440) / 60; b = 1; } else if (nm < 490) { gg = (nm - 440) / 50; b = 1; } else if (nm < 510) { gg = 1; b = -(nm - 510) / 20; }
    else if (nm < 580) { r = (nm - 510) / 70; gg = 1; } else if (nm < 645) { r = 1; gg = -(nm - 645) / 65; } else if (nm <= 780) { r = 1; }
    f = nm < 420 ? 0.3 + 0.7 * (nm - 380) / 40 : nm > 700 ? 0.3 + 0.7 * (780 - nm) / 80 : 1; if (nm < 380 || nm > 780) f = 0.25;
    return [Math.round(255 * Math.pow(r * f, 0.8)), Math.round(255 * Math.pow(gg * f, 0.8)), Math.round(255 * Math.pow(b * f, 0.8))];
  }
  function strip(g, x, y, w, h, a, bright) {                                              // a continuous rainbow strip 400..700 nm
    if (a <= 0) return; g.save(); g.globalAlpha *= a;
    for (var i = 0; i < w; i += 2) { var c = wl2rgb(400 + 300 * i / w); g.fillStyle = 'rgb(' + c[0] + ',' + c[1] + ',' + c[2] + ')'; g.fillRect(x + i, y, 2.5, h); }
    g.globalAlpha *= 1 - (bright == null ? 0.0 : 1 - bright); g.restore();
  }
  function darkStrip(g, x, y, w, h, a) { if (a <= 0) return; g.save(); g.globalAlpha *= a; g.fillStyle = '#05070c'; g.fillRect(x, y, w, h); g.strokeStyle = 'rgba(170,185,215,0.5)'; g.lineWidth = 2; g.strokeRect(x, y, w, h); g.restore(); }
  function spLine(g, x, y, w, h, nm, lo, hi, col, a, wd) {                                // one bright emission line at wavelength nm on a strip spanning lo..hi
    if (a <= 0) return; var px = x + w * (nm - lo) / (hi - lo); g.save(); g.globalAlpha *= a; g.fillStyle = col; g.shadowColor = col; g.shadowBlur = 16; g.fillRect(px - (wd || 4) / 2, y + 3, wd || 4, h - 6); g.restore();
  }
  function drawFlame(g, x, y, s, col, a, lt) {                                            // a candle-like flame, base at (x,y)
    if (a <= 0) return; g.save(); g.globalAlpha *= a; var fl = 1 + 0.05 * Math.sin(lt * 9 + x), w = 34 * s, h = 120 * s * fl;
    var gr = g.createRadialGradient(x, y - h * 0.35, 2, x, y - h * 0.35, h * 0.9); gr.addColorStop(0, '#fffbe6'); gr.addColorStop(0.14, col); gr.addColorStop(1, rgba(col, 0));
    g.fillStyle = gr; g.shadowColor = col; g.shadowBlur = 30; g.beginPath(); g.moveTo(x, y - h); g.bezierCurveTo(x + w * 1.4, y - h * 0.45, x + w * 1.1, y, x, y); g.bezierCurveTo(x - w * 1.1, y, x - w * 1.4, y - h * 0.45, x, y - h); g.fill(); g.restore();
  }
  function burner(g, x, y, s, a) {                                                       // Bunsen burner: base, tube, collar
    if (a <= 0) return; g.save(); g.globalAlpha *= a; g.translate(x, y); g.scale(s, s);
    var gr = g.createLinearGradient(-30, 0, 30, 0); gr.addColorStop(0, '#6a727f'); gr.addColorStop(0.5, '#b4bcc8'); gr.addColorStop(1, '#5a6270');
    g.fillStyle = gr; g.fillRect(-14, -150, 28, 150); g.fillStyle = '#4a5260'; rr(g, -50, -12, 100, 18, 6); g.fill(); g.fillStyle = '#8a929e'; g.fillRect(-20, -92, 40, 18); g.fillStyle = '#2a303c'; g.fillRect(-7, -150, 14, 5); g.restore();
  }
  function sun(g, x, y, r, a, lt) {
    if (a <= 0) return; g.save(); g.globalAlpha *= a; var gl = g.createRadialGradient(x, y, r * 0.6, x, y, r * 3); gl.addColorStop(0, 'rgba(255,200,100,0.55)'); gl.addColorStop(1, 'rgba(255,160,60,0)');
    g.fillStyle = gl; g.beginPath(); g.arc(x, y, r * 3, 0, 6.29); g.fill(); var gr = g.createRadialGradient(x - r * 0.3, y - r * 0.3, 2, x, y, r); gr.addColorStop(0, '#fff6c8'); gr.addColorStop(0.6, '#ffc850'); gr.addColorStop(1, '#f08a28');
    g.fillStyle = gr; g.beginPath(); g.arc(x, y, r, 0, 6.29); g.fill();
    g.strokeStyle = 'rgba(255,200,100,0.6)'; g.lineWidth = 3; for (var i = 0; i < 14; i++) { var an = i / 14 * 6.283 + (lt || 0) * 0.15, r0 = r * 1.2, r1 = r * (1.45 + 0.12 * Math.sin(i * 3 + (lt || 0) * 3)); g.beginPath(); g.moveTo(x + Math.cos(an) * r0, y + Math.sin(an) * r0); g.lineTo(x + Math.cos(an) * r1, y + Math.sin(an) * r1); g.stroke(); }
    g.restore();
  }
  function prism(g, x, y, s, a) {                                                        // a glass triangle, centre (x,y)
    if (a <= 0) return; g.save(); g.globalAlpha *= a; var h = 120 * s;
    g.beginPath(); g.moveTo(x, y - h * 0.6); g.lineTo(x + h * 0.7, y + h * 0.45); g.lineTo(x - h * 0.7, y + h * 0.45); g.closePath();
    var gr = g.createLinearGradient(x - h * 0.7, y, x + h * 0.7, y); gr.addColorStop(0, 'rgba(180,215,255,0.35)'); gr.addColorStop(1, 'rgba(120,170,255,0.15)'); g.fillStyle = gr; g.fill();
    g.strokeStyle = 'rgba(210,230,255,0.9)'; g.lineWidth = 3; g.shadowColor = '#9cc4ff'; g.shadowBlur = 14; g.stroke(); g.restore();
  }
  function medal(g, x, y, r, a, label) {
    if (a <= 0) return; g.save(); g.globalAlpha *= a; var gr = g.createRadialGradient(x - r * 0.3, y - r * 0.3, 2, x, y, r); gr.addColorStop(0, '#fff0c0'); gr.addColorStop(0.6, '#d9a040'); gr.addColorStop(1, '#8a5c18');
    g.fillStyle = gr; g.shadowColor = GOLD; g.shadowBlur = 20; g.beginPath(); g.arc(x, y, r, 0, 6.29); g.fill(); g.shadowBlur = 0;
    g.strokeStyle = 'rgba(110,70,20,0.7)'; g.lineWidth = 3; g.beginPath(); g.arc(x, y, r * 0.8, 0, 6.29); g.stroke();
    g.font = '900 ' + Math.round(r * 0.5) + 'px ' + SERIF; g.fillStyle = '#6a4410'; g.textAlign = 'center'; g.fillText(label, x, y + r * 0.18); g.restore();
  }
  function planck(lam, T) { return Math.pow(lam, -5) / (Math.exp(14.388 / (lam * T)) - 1); }          // lam in micrometres, T in kK (relative units)
  var PK = planck(0.58, 5);
  function bbPlot(g, x0, yB, w, h, a, lt, o) {                                           // axes + curves; o = {T:[..], cols:[..], draw:p, rj:p, dots:p}
    if (a <= 0) return; var lmin = 0.2, lmax = 3.0; g.save(); g.globalAlpha *= a;
    g.strokeStyle = 'rgba(200,210,230,0.65)'; g.lineWidth = 3; g.beginPath(); g.moveTo(x0, yB - h - 20); g.lineTo(x0, yB); g.lineTo(x0 + w, yB); g.stroke();
    for (var i = 0; i < w; i += 3) { var c = wl2rgb(400 + 300 * ((i / w * (lmax - lmin) + lmin) * 1000 - 400) / 300); if ((i / w * (lmax - lmin) + lmin) > 0.4 && (i / w * (lmax - lmin) + lmin) < 0.7) { g.fillStyle = 'rgb(' + c[0] + ',' + c[1] + ',' + c[2] + ')'; g.fillRect(x0 + i, yB + 6, 3.5, 10); } }
    g.restore(); txt(g, '波长 →', x0 + w - 40, yB + 50, 22, DIM, 'center', a, 700); txt(g, '光的强度', x0 + 8, yB - h - 34, 22, DIM, 'left', a, 700);
    var X = function (l) { return x0 + (l - lmin) / (lmax - lmin) * w; }, Y = function (v) { return yB - v / PK * h * 0.92; };
    (o.T || []).forEach(function (T, k) { var p = o.draw == null ? 1 : (Array.isArray(o.draw) ? o.draw[k] : o.draw); if (p <= 0) return; g.save(); g.globalAlpha *= a; g.strokeStyle = o.cols[k]; g.lineWidth = 5; g.shadowColor = o.cols[k]; g.shadowBlur = 12; g.beginPath();
      var n = Math.floor(240 * p); for (var j = 0; j <= n; j++) { var l = lmin + (lmax - lmin) * j / 240, px = X(l), py = Math.max(yB - h - 10, Y(planck(l, T))); if (j) g.lineTo(px, py); else g.moveTo(px, py); } g.stroke(); g.restore(); });
    if (o.dots > 0) { g.save(); g.globalAlpha *= a * o.dots; var T0 = o.dotT || 5; for (var d = 0; d < 26; d++) { var l = 0.26 + d * 0.108, jit = (rnd(d * 3.1) - 0.5) * (1 - (o.tight || 0)) * 0.22 * PK; var v = planck(l, T0) + jit * Math.min(1, planck(l, T0) / PK + 0.15);
      glowDot(g, X(l), Math.max(yB - h - 10, Y(v)), 4.5, '#ffffff', 0.9); } g.restore(); }
    if (o.rj > 0) { g.save(); g.globalAlpha *= a; g.strokeStyle = RED; g.lineWidth = 5; g.setLineDash([12, 9]); g.shadowColor = RED; g.shadowBlur = 12; g.beginPath(); var n2 = Math.floor(240 * o.rj), T1 = o.rjT || 5;
      var topY = yB - h - 10, out = false; for (var j2 = 0; j2 <= n2; j2++) { var l2 = lmin + (lmax - lmin) * j2 / 240, v2 = T1 * Math.pow(l2, -4) / 14.388; var py2 = Y(v2); if (py2 < topY) { out = true; g.lineTo(X(l2), topY); break; } if (j2) g.lineTo(X(l2), py2); else g.moveTo(X(l2), py2); } g.stroke();
      if (out) { g.setLineDash([]); g.fillStyle = RED; var ax = X(lmin + (lmax - lmin) * (j2 - 1) / 240); g.beginPath(); g.moveTo(ax, topY - 24); g.lineTo(ax - 12, topY); g.lineTo(ax + 12, topY); g.closePath(); g.fill(); } g.restore(); }
    return { X: X, Y: Y };
  }

  // ---------- scenes ----------
  var D = {};
  // hook: a circuit node, a flame, the sun
  D.h0 = function (g, lt, L) {
    var a = ap(lt, L[0], 0.5); chip(g, 1450, 300, '高中物理 · 电路', BLUE, a * (1 - ap(lt, L[4], 0.4)), 28);
    var cir = ap(lt, L[1], 0.6) * (1 - ap(lt, L[5], 0.6)); if (cir > 0) {
      var N = [1450, 600], ins = [[1180, 480], [1450, 380], [1180, 740]], outs = [[1720, 520], [1720, 700]];
      g.save(); g.globalAlpha *= cir; g.strokeStyle = 'rgba(200,210,230,0.7)'; g.lineWidth = 5; ins.concat(outs).forEach(function (p) { g.beginPath(); g.moveTo(N[0], N[1]); g.lineTo(p[0], p[1]); g.stroke(); }); g.restore();
      glowDot(g, N[0], N[1], 14, GOLD, cir);
      ins.forEach(function (p, i) { arrow(g, p[0] + (N[0] - p[0]) * 0.1, p[1] + (N[1] - p[1]) * 0.1, p[0] + (N[0] - p[0]) * 0.82, p[1] + (N[1] - p[1]) * 0.82, BLUE, cir * ap(lt, L[1] + 0.2 * i, 0.4), 1, lt * 40); });
      outs.forEach(function (p, i) { arrow(g, N[0] + (p[0] - N[0]) * 0.2, N[1] + (p[1] - N[1]) * 0.2, N[0] + (p[0] - N[0]) * 0.95, N[1] + (p[1] - N[1]) * 0.95, '#ff9a7a', cir * ap(lt, L[2] + 0.2 * i, 0.4), 1, lt * 40); });
      chip(g, 1250, 440, '流进', BLUE, ap(lt, L[1], 0.5) * cir, 24); chip(g, 1690, 600, '流出', '#ff9a7a', ap(lt, L[2], 0.5) * cir, 24);
      var f1 = ap(lt, L[2], 0.6); if (f1 > 0) { card(g, 1230, 810, 440, 80, GOLD, f1 * cir); txt(g, '流进 = 流出', 1450, 862, 40, GOLD, 'center', f1 * cir, 900); }
      var f2 = ap(lt, L[3], 0.6); if (f2 > 0) { card(g, 1230, 910, 440, 80, BLUE, f2 * cir); txt(g, '绕一圈：电压加起来 = 0', 1450, 962, 32, BLUE, 'center', f2 * cir, 900); } }
    var st = ap(lt, L[4], 0.5) * (1 - ap(lt, L[5], 0.5)); if (st > 0) chip(g, 1450, 300, '二十出头 · 学生', GOLD, st, 28);
    var fl = ap(lt, L[5], 0.7) * (1 - ap(lt, L[7], 0.6)); if (fl > 0) { burner(g, 1450, 880, 1.7, fl); drawFlame(g, 1450, 625, 2.0, ap(lt, L[6], 0.6) > 0 ? '#ffd060' : '#7aa8ff', fl, lt); }
    var fx = ap(lt, L[6], 0.6); if (fx > 0) chip(g, 1450, 300, '一道火焰', GOLD, fx * (1 - ap(lt, L[7], 0.6)), 30);
    var sq = ap(lt, L[7], 0.6); if (sq > 0) { sun(g, 1450, 600, 120, sq, lt); chip(g, 1450, 300, '太阳', GOLD, sq, 30); var q = ap(lt, L[8], 0.6); gtxt(g, '？', 1450, 650, 140, '#6a3a08', 'center', q * (0.75 + 0.25 * Math.sin(lt * 3))); chip(g, 1450, 850, '它是由什么做的？', INK, q, 28); }
    chip(g, 1450, 1000, '1824 – 1887', GOLD, ap(lt, L[9], 0.5), 28);
  };
  // 1824-1845: Koenigsberg and the circuit laws of a student
  D.koenig = function (g, lt, L) {
    var a = ap(lt, L[0], 0.5); chip(g, 1450, 300, '柯尼斯堡 · 1824', GOLD, a, 28);
    var yr = ap(lt, L[1], 0.5); if (yr > 0) chip(g, 1450, 360, '1845 · 还在读大学', BLUE, yr, 26);
    var pa = ap(lt, L[3], 0.6) * (1 - ap(lt, L[5], 0.5)); if (pa > 0) { doc(g, 1190, 470, 130, 160, pa, -0.1, '论文', 4); card(g, 1350, 500, 420, 100, GOLD, pa); txt(g, '电流在导线网里', 1560, 545, 30, INK, 'center', pa, 700); txt(g, '怎么分配', 1560, 585, 30, GOLD, 'center', pa, 900); }
    var net = ap(lt, L[5], 0.7); if (net > 0) {
      var Nn = [1450, 640], O = { A: [1210, 560], B: [1450, 450], C: [1690, 560], D: [1290, 840], E: [1610, 840] };
      g.save(); g.globalAlpha *= net; g.strokeStyle = 'rgba(200,210,230,0.7)'; g.lineWidth = 5;
      Object.keys(O).forEach(function (k) { g.beginPath(); g.moveTo(Nn[0], Nn[1]); g.lineTo(O[k][0], O[k][1]); g.stroke(); });
      [['A', 'B'], ['B', 'C'], ['C', 'E'], ['E', 'D'], ['D', 'A']].forEach(function (e) { g.beginPath(); g.moveTo(O[e[0]][0], O[e[0]][1]); g.lineTo(O[e[1]][0], O[e[1]][1]); g.stroke(); }); g.restore();
      Object.keys(O).forEach(function (k) { glowDot(g, O[k][0], O[k][1], 10, DIM, net); });
      var node = ap(lt, L[5] + 0.4, 0.5); glowDot(g, Nn[0], Nn[1], 14, GOLD, net * (0.6 + 0.4 * node));
      var ph = lt * 40; [['A', 1], ['B', 1], ['D', 1]].forEach(function (p, i) { var q = O[p[0]], u = 0.5; arrow(g, q[0] + (Nn[0] - q[0]) * 0.1, q[1] + (Nn[1] - q[1]) * 0.1, q[0] + (Nn[0] - q[0]) * 0.8, q[1] + (Nn[1] - q[1]) * 0.8, BLUE, net * node, 1, ph); });
      [['C', 1], ['E', 1]].forEach(function (p, i) { var q = O[p[0]]; arrow(g, Nn[0] + (q[0] - Nn[0]) * 0.2, Nn[1] + (q[1] - Nn[1]) * 0.2, Nn[0] + (q[0] - Nn[0]) * 0.9, Nn[1] + (q[1] - Nn[1]) * 0.9, '#ff9a7a', net * ap(lt, L[6], 0.5), 1, ph); });
      var lp = ap(lt, L[7], 0.6); if (lp > 0) { g.save(); g.globalAlpha *= lp * (0.6 + 0.4 * Math.sin(lt * 4)); g.strokeStyle = GOLD; g.lineWidth = 8; g.shadowColor = GOLD; g.shadowBlur = 20; g.beginPath(); g.moveTo(O.A[0], O.A[1]); g.lineTo(O.B[0], O.B[1]); g.lineTo(Nn[0], Nn[1]); g.closePath(); g.stroke(); g.restore(); } }
    var f1 = ap(lt, L[6], 0.6) * (1 - ap(lt, L[8], 0.5)); if (f1 > 0) formula(g, '流进 = 流出', 1450, 940, 46, BLUE, f1);
    var f2 = ap(lt, L[7], 0.6) * (1 - ap(lt, L[8], 0.5)); if (f2 > 0) formula(g, '绕一圈 = 0 V', 1450, 1000, 40, GOLD, f2);
    var nm = ap(lt, L[8], 0.6); if (nm > 0) { card(g, 1090, 420, 720, 580, GOLD, nm * 0.97); gtxt(g, '基尔霍夫定律', 1450, 650, 84, GOLD, 'center', nm); chip(g, 1450, 770, '每个学电路的人 · 都要学', INK, ap(lt, L[9], 0.5), 28); }
  };
  function formula(g, s, x, y, size, col, a) { if (a <= 0) return; g.save(); g.globalAlpha *= a; g.font = '500 ' + size + 'px ' + SERIF; g.textAlign = 'center'; g.fillStyle = col; g.shadowColor = col; g.shadowBlur = 16; g.fillText(s, x, y); g.restore(); }
  // 1854: Heidelberg, the partner, the Bunsen burner
  D.bunsen = function (g, lt, L) {
    var a = ap(lt, L[0], 0.5); chip(g, 1450, 300, '海德堡 · 1854', GOLD, a * (1 - ap(lt, L[2], 0.5)), 28);
    var hl = ap(lt, L[0], 0.6) * (1 - ap(lt, L[1], 0.5)); if (hl > 0) { g.save(); g.globalAlpha *= hl; g.fillStyle = '#2c3a58'; g.strokeStyle = 'rgba(170,185,215,0.7)'; g.lineWidth = 3; g.fillRect(1260, 420, 380, 340); g.strokeRect(1260, 420, 380, 340);
      g.fillStyle = 'rgba(170,185,215,0.5)'; g.beginPath(); g.moveTo(1246, 420); g.lineTo(1450, 374); g.lineTo(1654, 420); g.closePath(); g.fill(); g.fillStyle = 'rgba(255,225,150,0.9)'; g.shadowColor = GOLD; g.shadowBlur = 24; g.fillRect(1394, 556, 112, 204); g.restore(); chip(g, 1450, 820, '海德堡大学 · 物理教授', BLUE, hl, 26); }
    var pr = ap(lt, L[1], 0.6) * (1 - ap(lt, L[2], 0.5)); if (pr > 0) { card(g, 1130, 450, 300, 130, GOLD, pr); txt(g, '基尔霍夫', 1280, 515, 44, GOLD, 'center', pr, 900); txt(g, '物理', 1280, 560, 28, INK, 'center', pr, 700);
      card(g, 1480, 450, 300, 130, BLUE, pr); txt(g, '本生', 1630, 515, 44, BLUE, 'center', pr, 900); txt(g, '化学', 1630, 560, 28, INK, 'center', pr, 700);
      line(g, 1430, 515, 1480, 515, GOLD, 5, pr); chip(g, 1455, 640, '搭档', INK, pr, 30); }
    var bu = ap(lt, L[2], 0.7); if (bu > 0) { burner(g, 1450, 900, 2.2, bu); var fa = ap(lt, L[3], 0.6); drawFlame(g, 1450, 570, 1.8, '#6f9bff', bu * (0.55 + 0.35 * fa), lt);
      chip(g, 1450, 300, '本生改进的煤气灯', BLUE, bu, 28); chip(g, 1190, 700, '很热', '#ff9a7a', fa, 26); chip(g, 1190, 760, '自己几乎不发光', DIM, fa, 24); }
    var nm = ap(lt, L[5], 0.6); if (nm > 0) { gtxt(g, '本生灯', 1450, 1000, 64, GOLD, 'center', nm); chip(g, 1720, 760, '今天的实验室 · 还在用', INK, ap(lt, L[4], 0.5), 24); }
  };
  // 1859: flames of different colours, the prism, bright lines like fingerprints
  D.flame = function (g, lt, L) {
    var top = ap(lt, L[0], 0.5); chip(g, 1450, 300, '把盐撒进火里', GOLD, top * (1 - ap(lt, L[4], 0.5)), 28);
    var f0 = ap(lt, L[0], 0.6) * (1 - ap(lt, L[4], 0.6)); if (f0 > 0) { var xs = [1230, 1450, 1670], cols = ['#ffd24a', '#ff4a3a', '#4adf8a'], nm = ['钠 · 黄', '锂 · 红', '铜 · 绿'];
      xs.forEach(function (x, i) { var p = i === 0 ? ap(lt, L[0], 0.6) : ap(lt, L[1], 0.6); burner(g, x, 780, 1.0, f0 * p); drawFlame(g, x, 632, 1.3, cols[i], f0 * p, lt + i); chip(g, x, 840, nm[i], cols[i], f0 * p, 24); });
      var cr = ap(lt, L[2], 0.5); if (cr > 0) chip(g, 1450, 930, '颜色太粗糙', DIM, cr * f0, 26);
      var tw = ap(lt, L[3], 0.5); if (tw > 0) { chip(g, 1230, 990, '这种黄？', '#ffd24a', tw * f0, 24); chip(g, 1670, 990, '还是这种黄？', '#ffd24a', tw * f0, 24); } }
    var pm = ap(lt, L[4], 0.7); if (pm > 0) { var fa = 1 - ap(lt, L[5], 0.5) * 0.0; burner(g, 1190, 560, 0.9, pm); drawFlame(g, 1190, 427, 1.1, '#ffd24a', pm, lt);
      g.save(); g.globalAlpha *= pm; g.strokeStyle = 'rgba(255,230,150,0.9)'; g.lineWidth = 5; g.shadowColor = '#ffd24a'; g.shadowBlur = 12; g.beginPath(); g.moveTo(1230, 395); g.lineTo(1440, 405); g.stroke(); g.restore(); prism(g, 1490, 405, 0.8, pm);
      chip(g, 1490, 300, '三棱镜', BLUE, pm, 26); }
    var S = [['钠', [[589.0, '#ffd24a'], [589.6, '#ffd24a']]], ['锂', [[610, '#ff8a4a'], [671, '#ff3a3a']]], ['铜', [[510, '#6aff9a'], [522, '#6aff9a'], [578, '#ffe27a']]]];
    var sa = ap(lt, L[5], 0.6); if (sa > 0) S.forEach(function (s, i) { var y = 600 + i * 120, x = 1180, w = 580; darkStrip(g, x, y, w, 64, sa); txt(g, s[0], 1140, y + 44, 34, INK, 'right', sa, 900);
      s[1].forEach(function (ln, k) { spLine(g, x, y, w, 64, ln[0], 400, 700, ln[1], ap(lt, L[6] + 0.15 * (k + i * 2), 0.5), 5); }); });
    var nb = ap(lt, L[5], 0.5); if (nb > 0 && ap(lt, L[6], 0.5) < 1) chip(g, 1470, 570, '不是一片颜色', INK, nb * (1 - ap(lt, L[6], 0.4)), 24);
    var fx = ap(lt, L[7], 0.5); if (fx > 0) chip(g, 1470, 570, '位置固定 · 从不出错', GOLD, fx * (1 - ap(lt, L[9], 0.5)), 24);
    var na = ap(lt, L[8], 0.5); if (na > 0) { g.save(); g.globalAlpha *= na * (0.5 + 0.5 * Math.sin(lt * 5)); g.strokeStyle = '#ffd24a'; g.lineWidth = 3; g.shadowColor = '#ffd24a'; g.shadowBlur = 16; g.strokeRect(1180 + 580 * (589 - 400) / 300 - 26, 594, 62, 76); g.restore(); chip(g, 1560, 692, '靠得很近的两条黄线', '#ffd24a', na, 22); }
    var fp = ap(lt, L[9], 0.6); if (fp > 0) { gtxt(g, '元素的指纹', 1470, 540, 52, GOLD, 'center', fp); }
  };
  // 1859: the dark lines in the sun; the sodium flame; the sun contains sodium
  D.sun = function (g, lt, L) {
    var X0 = 1130, W0 = 640;
    var st = ap(lt, L[0], 0.6); chip(g, 1450, 300, '太阳光 · 拆开', GOLD, st * (1 - ap(lt, L[4], 0.5)), 28);
    if (st > 0) { strip(g, X0, 360, W0, 90, st);
      var dk = ap(lt, L[1], 0.8); if (dk > 0) { g.save(); g.globalAlpha *= dk; g.fillStyle = 'rgba(0,0,0,0.85)'; for (var i = 0; i < 60; i++) { var x = X0 + 14 + rnd(i * 2.3) * (W0 - 28), w = 1.5 + rnd(i * 5.1) * 2.5; g.fillRect(x, 360, w, 90); } g.restore(); }
      var nd = ap(lt, L[4], 0.6); var dpx = X0 + W0 * (589 - 400) / 300;
      if (nd > 0) { g.save(); g.globalAlpha *= nd; g.fillStyle = 'rgba(0,0,0,0.95)'; g.fillRect(dpx - 3, 360, 3, 90); g.fillRect(dpx + 2, 360, 3, 90); g.restore(); } }
    chip(g, 1450, 505, '几百条暗线', RED, ap(lt, L[1], 0.5) * (1 - ap(lt, L[4], 0.5)), 28);
    chip(g, 1450, 575, '1814 · 夫琅禾费 · 画了下来', GOLD, ap(lt, L[2], 0.5) * (1 - ap(lt, L[4], 0.5)), 26);
    chip(g, 1450, 645, '四十多年 · 没人知道是什么', DIM, ap(lt, L[3], 0.5) * (1 - ap(lt, L[4], 0.5)), 26);
    var ex = ap(lt, L[4], 0.6); if (ex > 0) { chip(g, 1450, 300, '1859 · 基尔霍夫的实验', BLUE, ex, 28);
      var y = 640; sun(g, 1190, y, 42, ex * ap(lt, L[5], 0.5), lt); arrow(g, 1250, y, 1360, y, '#ffe27a', ex * ap(lt, L[5], 0.5), 1, lt * 40);
      var fl = ap(lt, L[5], 0.6); burner(g, 1450, y + 90, 0.75, ex * fl); drawFlame(g, 1450, y + 14, 1.1, '#ffd24a', ex * fl, lt); chip(g, 1450, y + 120, '钠的火焰', '#ffd24a', ex * fl, 22);
      var pr = ap(lt, L[6], 0.6); arrow(g, 1510, y, 1590, y, '#ffe27a', ex * pr, 1, lt * 40); prism(g, 1650, y, 0.55, ex * pr); chip(g, 1650, y + 100, '三棱镜', BLUE, ex * pr, 22); }
    var exp = ap(lt, L[7], 0.5) * (1 - ap(lt, L[8], 0.4)); if (exp > 0) { chip(g, 1450, 840, '本以为：黄线把暗线填亮', BLUE, exp, 28); var dpx2 = X0 + W0 * (589 - 400) / 300; g.save(); g.globalAlpha *= exp * 0.8; g.fillStyle = '#ffd24a'; g.shadowColor = '#ffd24a'; g.shadowBlur = 18; g.fillRect(dpx2 - 3, 360, 3, 90); g.fillRect(dpx2 + 2, 360, 3, 90); g.restore(); }
    var dr = ap(lt, L[8], 0.5); if (dr > 0) { var dpx3 = X0 + W0 * (589 - 400) / 300; g.save(); g.globalAlpha *= dr; g.fillStyle = '#000'; g.fillRect(dpx3 - 6, 360, 6, 90); g.fillRect(dpx3, 360, 6, 90); g.restore(); chip(g, 1450, 840, '结果：暗线反而更黑', RED, dr * (1 - ap(lt, L[10], 0.5)), 28); }
    var em = ap(lt, L[10], 0.5) * (1 - ap(lt, L[13], 0.5)); if (em > 0) { chip(g, 1310, 900, '发出这两条黄光', '#ffd24a', em, 24); }
    var ab = ap(lt, L[11], 0.5) * (1 - ap(lt, L[13], 0.5)); if (ab > 0) { chip(g, 1610, 900, '也吸收这两条黄光', '#ff9a7a', ab, 24); }
    var on = ap(lt, L[12], 0.5); if (on > 0) { var dpx4 = X0 + W0 * (589 - 400) / 300; g.save(); g.globalAlpha *= on * (0.5 + 0.5 * Math.sin(lt * 5)); g.strokeStyle = GOLD; g.lineWidth = 3; g.shadowColor = GOLD; g.shadowBlur = 16; g.strokeRect(dpx4 - 22, 350, 50, 110); g.restore(); chip(g, dpx4 + 4, 482, 'Na', GOLD, on, 24); }
    var na = ap(lt, L[14], 0.6); if (na > 0) { gtxt(g, '太阳外层，有钠', 1450, 960, 58, GOLD, 'center', na * (1 - ap(lt, L[15], 0.5))); }
    var dist = ap(lt, L[15], 0.6); if (dist > 0) { sun(g, 1200, 940, 40, dist, lt); glowDot(g, 1720, 940, 10, BLUE, dist); line(g, 1250, 940, 1700, 940, 'rgba(200,210,230,0.6)', 3, dist); chip(g, 1720, 880, '地球', BLUE, dist, 22); chip(g, 1460, 890, '约 1.5 亿公里', INK, dist, 26); var fi = ap(lt, L[16], 0.5); chip(g, 1460, 1010, '第一次 · 知道它由什么组成', GOLD, fi, 26); }
  };
  // the banker (a story)
  D.banker = function (g, lt, L) {
    var a = ap(lt, L[0], 0.5); chip(g, 1450, 300, '据说 · 出处不明', DIM, a, 28);
    var bk2 = ap(lt, L[1], 0.6); if (bk2 > 0) { avatar(g, 1250, 620, 70, '#8aa0c8', bk2); g.save(); g.globalAlpha *= bk2; g.fillStyle = '#1e2638'; g.fillRect(1218, 545, 64, 24); g.fillRect(1230, 520, 40, 28); g.restore(); chip(g, 1250, 770, '银行家', BLUE, bk2, 26);
      avatar(g, 1650, 620, 70, GOLD, bk2); chip(g, 1650, 770, '基尔霍夫', GOLD, bk2, 26); }
    var q1 = ap(lt, L[2], 0.5) * (1 - ap(lt, L[4], 0.5)); if (q1 > 0) { card(g, 1170, 380, 340, 110, BLUE, q1); txt(g, '太阳里有金子', 1340, 432, 32, INK, 'center', q1, 900); txt(g, '又怎样？', 1340, 472, 32, INK, 'center', q1, 900); }
    var q2 = ap(lt, L[3], 0.5) * (1 - ap(lt, L[4], 0.5)); if (q2 > 0) { card(g, 1170, 510, 340, 70, RED, q2); txt(g, '你又拿不下来', 1340, 556, 30, RED, 'center', q2, 900); }
    var md = ap(lt, L[4], 0.6); if (md > 0) { var p = eo((lt - L[5]) / 1.2); var mx = 1650 + (1250 - 1650) * (lt > L[5] ? p : 0); medal(g, mx, 470 + (lt > L[5] ? -50 * Math.sin(p * Math.PI) : 0), 52, md, '金'); chip(g, 1450, 360, '英国 · 金质奖章', GOLD, md, 26); }
    var sn = ap(lt, L[6], 0.6); if (sn > 0) { sun(g, 1650, 400, 34, sn, lt); card(g, 1160, 830, 620, 130, GOLD, sn); txt(g, '“我终于从太阳上，', 1470, 886, 34, INK, 'center', sn, 900); txt(g, '拿下了一点金子。”', 1470, 936, 34, GOLD, 'center', ap(lt, L[7], 0.5), 900); }
    var cn = ap(lt, L[7], 0.6); if (cn > 0) { for (var i = 0; i < 6; i++) { var u = ((lt - L[7]) * 0.5 + i * 0.16) % 1; coin(g, 1650 - u * 400 + Math.sin(i * 4) * 20, 420 + u * 200 + Math.sin(u * 6) * 8, 16, cn * (1 - u * 0.5)); } }
  };
  // 1860-61: two new elements, caesium (blue) and rubidium (deep red); the clock
  D.newel = function (g, lt, L) {
    var a = ap(lt, L[0], 0.5); chip(g, 1450, 300, '用指纹 · 找新元素', BLUE, a * (1 - ap(lt, L[7], 0.5)), 28);
    var cs = ap(lt, L[1], 0.6) * (1 - ap(lt, L[7], 0.6)); if (cs > 0) {
      g.save(); g.globalAlpha *= cs; g.fillStyle = 'rgba(120,170,255,0.25)'; g.strokeStyle = 'rgba(170,200,255,0.9)'; g.lineWidth = 4; rr(g, 1240, 380, 110, 170, 22); g.fill(); g.stroke(); g.fillStyle = 'rgba(120,170,255,0.5)'; rr(g, 1248, 440, 94, 102, 16); g.fill(); g.restore(); chip(g, 1295, 590, '矿泉水 · 1860', BLUE, cs, 24);
      darkStrip(g, 1130, 640, 640, 70, cs); var sl = ap(lt, L[2], 0.5); spLine(g, 1130, 640, 640, 70, 449, 400, 800, '#4a7bff', cs * sl, 6); spLine(g, 1130, 640, 640, 70, 466, 400, 800, '#6a9bff', cs * sl, 6);
      chip(g, 1450, 745, '两条从没见过的蓝线', '#7aa8ff', cs * sl, 26);
      var c2 = ap(lt, L[3], 0.6); card(g, 1130, 800, 330, 120, GOLD, c2 * cs); gtxt(g, '铯 Cs', 1295, 880, 52, '#8ab4ff', 'center', c2 * cs);
      chip(g, 1620, 840, '拉丁文 · 天蓝色', '#7aa8ff', ap(lt, L[4], 0.5) * cs, 26);
      var tn = ap(lt, L[5], 0.5); chip(g, 1480, 960, '几十吨矿泉水', INK, tn * cs, 26); chip(g, 1720, 960, '→ 一点点', GOLD, ap(lt, L[6], 0.5) * cs, 26); }
    var rb = ap(lt, L[7], 0.6) * (1 - ap(lt, L[10], 0.6)); if (rb > 0) {
      g.save(); g.globalAlpha *= rb; g.fillStyle = '#7a5a8c'; g.strokeStyle = '#c9a8e0'; g.lineWidth = 3; g.beginPath(); g.moveTo(1240, 520); g.lineTo(1300, 420); g.lineTo(1390, 450); g.lineTo(1400, 540); g.lineTo(1310, 570); g.closePath(); g.fill(); g.stroke(); g.restore(); chip(g, 1320, 610, '一种矿石 · 1861', '#c9a8e0', rb, 24);
      darkStrip(g, 1130, 660, 640, 70, rb); var rl = ap(lt, L[8], 0.5); spLine(g, 1130, 660, 640, 70, 756, 400, 800, '#e02020', rb * rl, 6); spLine(g, 1130, 660, 640, 70, 781, 400, 800, '#b81414', rb * rl, 6);
      chip(g, 1450, 765, '深红色的谱线', '#ff5a4a', rb * rl, 26);
      var r2 = ap(lt, L[9], 0.6); card(g, 1130, 820, 330, 120, GOLD, r2 * rb); gtxt(g, '铷 Rb', 1295, 900, 52, '#ff7a6a', 'center', r2 * rb); chip(g, 1620, 860, '拉丁文 · 深红色', '#ff7a6a', r2 * rb, 26); }
    var ck = ap(lt, L[10], 0.7); if (ck > 0) { var cx = 1450, cy = 600, R = 150; g.save(); g.globalAlpha *= ck; g.strokeStyle = 'rgba(200,210,230,0.8)'; g.lineWidth = 6; g.beginPath(); g.arc(cx, cy, R, 0, 6.29); g.stroke();
      for (var i = 0; i < 60; i++) { var an = i / 60 * 6.283 - 1.5708, r0 = R - (i % 5 === 0 ? 22 : 10); g.beginPath(); g.moveTo(cx + Math.cos(an) * r0, cy + Math.sin(an) * r0); g.lineTo(cx + Math.cos(an) * R, cy + Math.sin(an) * R); g.stroke(); }
      var sa = ((lt * 1) % 60) / 60 * 6.283 - 1.5708; g.strokeStyle = GOLD; g.shadowColor = GOLD; g.shadowBlur = 14; g.lineWidth = 5; g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx + Math.cos(sa * 6) * (R - 30), cy + Math.sin(sa * 6) * (R - 30)); g.stroke(); g.restore();
      chip(g, 1450, 830, '1 秒 · 由铯原子的跳动定义', GOLD, ck, 28); mono(g, 'Cs-133 · 9 192 631 770 次', 1450, 890, 26, DIM, 'center', ap(lt, L[11], 0.5)); }
  };
  // 1859-62: the perfect absorber; temperature fixes the colour; the open question
  D.blackbody = function (g, lt, L) {
    var a = ap(lt, L[0], 0.5); chip(g, 1450, 300, '1859 – 1862', BLUE, a * (1 - ap(lt, L[3], 0.5)), 28);
    var bx = ap(lt, L[1], 0.6) * (1 - ap(lt, L[3], 0.6)); if (bx > 0) { g.save(); g.globalAlpha *= bx; g.fillStyle = '#2c3a58'; g.strokeStyle = 'rgba(170,185,215,0.7)'; g.lineWidth = 4; rr(g, 1370, 380, 160, 130, 12); g.fill(); g.stroke(); g.restore();
      arrow(g, 1220, 445, 1350, 445, BLUE, bx, 1, lt * 40); chip(g, 1270, 395, '光 · 吸收', BLUE, bx, 22); var em = ap(lt, L[2], 0.5); arrow(g, 1550, 445, 1690, 445, '#ff9a7a', bx * em, 1, lt * 40); chip(g, 1650, 395, '光 · 发出', '#ff9a7a', bx * em, 22);
      chip(g, 1450, 570, '越会吸收，就越会发出', INK, bx * em, 26); }
    var cv = ap(lt, L[3], 0.6) * (1 - ap(lt, L[7], 0.5)); if (cv > 0) { g.save(); g.globalAlpha *= cv; g.fillStyle = '#10131c'; g.strokeStyle = 'rgba(200,210,230,0.8)'; g.lineWidth = 5; rr(g, 1350, 360, 200, 150, 14); g.fill(); g.stroke(); g.fillStyle = '#000'; g.beginPath(); g.arc(1350, 435, 14, 0, 6.29); g.fill(); g.restore();
      var rp = ap(lt, L[4], 0.5); if (rp > 0) { var PTH = [[1200, 435], [1350, 435], [1535, 392], [1368, 488], [1532, 476], [1385, 412]]; var ns = Math.min(PTH.length - 1, 1 + Math.floor((lt - L[4]) * 2.2)); g.save(); g.globalAlpha *= cv * rp; g.lineWidth = 4; g.lineCap = 'round';
        for (var i = 0; i < ns; i++) { g.strokeStyle = 'rgba(255,226,122,' + (i < 2 ? 1 : 0.9 - 0.18 * (i - 1)) + ')'; g.shadowColor = '#ffe27a'; g.shadowBlur = 10; g.beginPath(); g.moveTo(PTH[i][0], PTH[i][1]); g.lineTo(PTH[i + 1][0], PTH[i + 1][1]); g.stroke(); } g.restore(); }
      chip(g, 1450, 570, '吸收所有落上去的光', INK, ap(lt, L[4], 0.5) * cv, 26); chip(g, 1450, 625, '一点都不反射', DIM, ap(lt, L[5], 0.5) * cv, 24); }
    var nm = ap(lt, L[6], 0.6); if (nm > 0) { gtxt(g, '黑体', 1700, 460, 64, GOLD, 'center', nm * (1 - ap(lt, L[7], 0.6))); }
    var ic = ap(lt, L[10], 0.6); if (ic > 0) { [['烧红的铁', 1220, '#ff7a3a'], ['炉里的炭', 1450, '#ff4a2a'], ['太阳表面', 1680, '#ffd060']].forEach(function (o, i) { var p = ap(lt, L[10] + 0.25 * i, 0.5); g.save(); g.globalAlpha *= p * (1 - ap(lt, L[12], 0.5)); var gr = g.createRadialGradient(o[1], 800, 4, o[1], 800, 50); gr.addColorStop(0, '#fff6d8'); gr.addColorStop(1, o[2]); g.fillStyle = gr; g.shadowColor = o[2]; g.shadowBlur = 24; g.beginPath(); g.arc(o[1], 800, 44, 0, 6.29); g.fill(); g.restore(); chip(g, o[1], 880, o[0], o[2], p * (1 - ap(lt, L[12], 0.5)), 22); });
      chip(g, 1450, 940, '都近似是黑体', INK, ap(lt, L[11], 0.5) * (1 - ap(lt, L[12], 0.5)), 26); }
    var pl = ap(lt, L[7], 0.7); if (pl > 0 && true) { var vis = pl * (1 - ap(lt, L[10], 0.6) * 0.0);
      var d = [eo((lt - L[7]) / 1.4), eo((lt - L[7] - 0.4) / 1.4), eo((lt - L[7] - 0.8) / 1.4)];
      var hide = ap(lt, L[10], 0.5) * (1 - ap(lt, L[12], 0.5)); var al = vis * (1 - hide * 0.85);
      var PP = bbPlot(g, 1150, 1010, 600, 360, al * ap(lt, L[7], 0.5), lt, { T: [3, 4, 5], cols: ['#ef5b43', '#f0bd5c', '#86b6ff'], draw: d });
      var tc = ap(lt, L[8], 0.5); chip(g, 1690, 700, '5000 K', '#86b6ff', tc * al, 22); chip(g, 1690, 760, '4000 K', '#f0bd5c', tc * al, 22); chip(g, 1690, 820, '3000 K', '#ef5b43', tc * al, 22);
      chip(g, 1450, 300, '颜色分布 · 只看温度', BLUE, ap(lt, L[8], 0.5) * (1 - ap(lt, L[9], 0.0) * 0) * (1 - ap(lt, L[10], 0.5)), 26);
      chip(g, 1450, 360, '和材料无关', GOLD, ap(lt, L[9], 0.5) * (1 - ap(lt, L[10], 0.5)), 26); }
    var qq = ap(lt, L[12], 0.6); if (qq > 0) { gtxt(g, '这条曲线，到底什么样？', 1450, 330, 40, INK, 'center', qq * (1 - ap(lt, L[14], 0.5)));
      var q = ap(lt, L[13], 0.5); gtxt(g, '？', 1500, 760, 150, 'rgba(255,230,160,0.9)', 'center', q * (0.7 + 0.3 * Math.sin(lt * 3))); }
    var lf = ap(lt, L[14], 0.6); if (lf > 0) { chip(g, 1450, 300, '他留下了这个问题', GOLD, lf, 30); }
  };
  // 1875-1887: Berlin, the crutches, the student in the audience
  D.berlin = function (g, lt, L) {
    var ac = ap(lt, L[0], 0.6) * (1 - ap(lt, L[2], 0.6)); if (ac > 0) { g.save(); g.globalAlpha *= ac; g.strokeStyle = 'rgba(200,210,230,0.85)'; g.lineWidth = 7; g.lineCap = 'round';
      g.beginPath(); g.arc(1330, 760, 80, 0, 6.29); g.stroke(); g.beginPath(); g.arc(1330, 760, 12, 0, 6.29); g.stroke();
      g.beginPath(); g.moveTo(1300, 560); g.lineTo(1300, 700); g.lineTo(1420, 700); g.lineTo(1470, 780); g.stroke(); g.beginPath(); g.moveTo(1300, 560); g.lineTo(1360, 560); g.stroke(); g.beginPath(); g.arc(1470, 790, 24, 0, 6.29); g.stroke();
      g.beginPath(); g.moveTo(1630, 540); g.lineTo(1585, 790); g.stroke(); g.beginPath(); g.moveTo(1606, 640); g.lineTo(1652, 648); g.stroke(); g.beginPath(); g.arc(1642, 560, 34, 3.3, 5.6); g.stroke(); g.beginPath(); g.moveTo(1572, 790); g.lineTo(1600, 790); g.stroke(); g.restore();
      chip(g, 1450, 440, '一次意外 · 残疾', DIM, ap(lt, L[0], 0.5) * ac, 28); chip(g, 1450, 920, '拐杖 · 有时轮椅', INK, ap(lt, L[1], 0.5) * ac, 28); }
    var bl = ap(lt, L[2], 0.7) * (1 - ap(lt, L[7], 0.6)); if (bl > 0) { chip(g, 1450, 300, '柏林 · 1875', BLUE, bl, 28);
      g.save(); g.globalAlpha *= bl; g.fillStyle = '#1c2a22'; g.strokeStyle = 'rgba(170,185,215,0.7)'; g.lineWidth = 4; g.fillRect(1180, 380, 540, 250); g.strokeRect(1180, 380, 540, 250);
      g.strokeStyle = 'rgba(240,240,240,0.75)'; g.lineWidth = 3; g.beginPath(); g.moveTo(1230, 440); g.quadraticCurveTo(1300, 410, 1380, 450); g.stroke(); g.beginPath(); g.moveTo(1260, 520); g.lineTo(1420, 520); g.moveTo(1260, 560); g.lineTo(1360, 560); g.stroke(); g.restore();
      avatar(g, 1600, 560, 36, GOLD, bl);
      for (var r = 0; r < 3; r++) for (var c = 0; c < 9; c++) { var x = 1200 + c * 62, y = 720 + r * 70, hi = (r === 1 && c === 4); glowDot(g, x, y, 14, hi ? GOLD : '#5a6a88', bl * (hi ? Math.max(0.35, ap(lt, L[4], 0.5)) : 0.8)); }
      chip(g, 1450, 680, '大学理论物理教授', GOLD, ap(lt, L[3], 0.5) * bl, 26);
      var pk = ap(lt, L[4], 0.5); if (pk > 0) { arrow(g, 1450, 960, 1450, 810, GOLD, pk * bl, 1, lt * 30); chip(g, 1450, 1000, '普朗克', GOLD, pk * bl, 30); }
      chip(g, 1180, 680, '后来回忆 · 字斟句酌，有点干巴', DIM, ap(lt, L[5], 0.5) * bl * (1 - ap(lt, L[7], 0.4)), 22, 'left'); }
    var dt = ap(lt, L[7], 0.8); if (dt > 0) { var ok = photoCard(g, PH, 1290, 360, 320, 400, dt, 'sepia(0.4) contrast(1.05) grayscale(0.2)', GOLD); if (!ok) { g.save(); g.globalAlpha *= dt * 0.8; g.fillStyle = '#10151f'; g.fillRect(1290, 360, 320, 400); g.restore(); avatar(g, 1450, 600, 100, '#8aa0c8', dt); }
      mono(g, '1824 – 1887', 1450, 850, 40, GOLD, 'center', dt); chip(g, 1450, 940, '1887 · 10 · 17 · 柏林', INK, dt, 26); chip(g, 1450, 1000, '终年 63 岁', DIM, ap(lt, L[8], 0.5), 24); }
  };
  // the open problem: measurements vs theory; the student takes the chair; 1900: energy in packets
  D.question = function (g, lt, L) {
    var pa = ap(lt, L[0], 0.6); var al = pa * (1 - ap(lt, L[5], 0.5) * 0.0);
    var PP = bbPlot(g, 1150, 940, 600, 380, al, lt, { T: [5], cols: [GOLD], draw: ap(lt, L[9], 1.0) > 0.01 ? eo((lt - L[9]) / 1.2) : 0, dots: ap(lt, L[0], 0.8), dotT: 5, tight: ap(lt, L[1], 1.0), rj: ap(lt, L[3], 0.5) > 0.01 ? eo((lt - L[3]) / 1.4) * (1 - ap(lt, L[9], 0.5)) : 0, rjT: 5 });
    chip(g, 1450, 300, '黑体曲线 · 越量越准', BLUE, ap(lt, L[1], 0.5) * (1 - ap(lt, L[5], 0.5)), 28);
    chip(g, 1640, 640, '理论算出的线', RED, ap(lt, L[3], 0.5) * (1 - ap(lt, L[9], 0.5)), 24);
    var nf = ap(lt, L[4], 0.5) * (1 - ap(lt, L[9], 0.5)); if (nf > 0) { chip(g, 1300, 520, '紫外一端：对不上', RED, nf * (1 - ap(lt, L[5], 0.4)), 26); }
    var ch = ap(lt, L[5], 0.6) * (1 - ap(lt, L[7], 0.5)); if (ch > 0) { chip(g, 1450, 300, '柏林 · 接任的人', BLUE, ch, 28); avatar(g, 1230, 430, 40, GOLD, ch); chip(g, 1230, 500, '普朗克', GOLD, ch, 24); chip(g, 1600, 440, '接任基尔霍夫的位置', INK, ap(lt, L[6], 0.5) * ch, 24); }
    var yr = ap(lt, L[7], 0.5); if (yr > 0) chip(g, 1450, 300, '1900 · 普朗克', GOLD, yr * (1 - ap(lt, L[10], 0.5)), 30);
    var wp = ap(lt, L[8], 0.5) * (1 - ap(lt, L[9], 0.5)); if (wp > 0) chip(g, 1450, 360, '起初只当权宜之计', DIM, wp, 26);
    var pk = ap(lt, L[9], 0.6); if (pk > 0) { for (var i = 0; i < 12; i++) { var l = 0.3 + i * 0.22, x = PP.X(l), y = PP.Y(planck(l, 5)); g.save(); g.globalAlpha *= pk; g.fillStyle = '#fff6d8'; g.shadowColor = GOLD; g.shadowBlur = 12; g.fillRect(x - 7, y - 7, 14, 14); g.restore(); }
      chip(g, 1450, 420, '能量 · 一份一份', GOLD, pk, 32); }
    var qm = ap(lt, L[10], 0.6); if (qm > 0) { gtxt(g, '量子', 1640, 660, 110, '#cfe0ff', 'center', qm); }
  };
