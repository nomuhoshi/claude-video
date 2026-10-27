  // ---------- Boltzmann props ----------
  var GREEN = '#8fd9a8', SAND = '#a8957a', MARBLE = '#d9d6cf';
  var PH = new Image(); PH.src = window.PHOTO_URI || ''; window.__PH = PH;           // his portrait
  var TB = new Image(); TB.src = window.TOMB_URI || ''; window.__TB = TB;             // the engraving on his tomb
  function formula(g, s, x, y, size, col, a) { if (a <= 0) return; g.save(); g.globalAlpha *= a; g.font = '500 ' + size + 'px ' + MONO; g.textAlign = 'center'; g.fillStyle = col; g.shadowColor = col; g.shadowBlur = 16; g.fillText(s, x, y); g.restore(); }
  function photoCard(g, img, x, y, w, h, a, filt, col) {                                // gold-framed photo
    if (a <= 0 || !img.complete || !img.naturalWidth) return; col = col || GOLD; g.save(); g.globalAlpha *= a;
    g.fillStyle = '#000'; g.shadowColor = 'rgba(0,0,0,0.8)'; g.shadowBlur = 30; g.fillRect(x - 8, y - 8, w + 16, h + 16); g.shadowBlur = 0;
    g.filter = filt || 'none'; g.drawImage(img, x, y, w, h); g.filter = 'none';
    g.strokeStyle = col; g.lineWidth = 4; g.shadowColor = col; g.shadowBlur = 14; g.strokeRect(x - 8, y - 8, w + 16, h + 16); g.restore();
  }
  function tri(v, lo, hi) { var s = hi - lo, p = ((v - lo) % (2 * s) + 2 * s) % (2 * s); return lo + (p > s ? 2 * s - p : p); }   // a ball bouncing between two walls
  function ball(g, x, y, r, col, a) { if (a <= 0) return; g.save(); g.globalAlpha *= a; var gr = g.createRadialGradient(x - r * 0.35, y - r * 0.35, 1, x, y, r); gr.addColorStop(0, '#fff6dc'); gr.addColorStop(0.35, col); gr.addColorStop(1, 'rgba(60,40,20,0.9)'); g.fillStyle = gr; g.shadowColor = col; g.shadowBlur = 8; g.beginPath(); g.arc(x, y, r, 0, 6.29); g.fill(); g.restore(); }
  function slab(g, x, y, w, h, a) {                                                      // a marble tombstone with a niche for a bust
    if (a <= 0) return; g.save(); g.globalAlpha *= a; var gr = g.createLinearGradient(x, y, x + w, y + h); gr.addColorStop(0, '#9a968c'); gr.addColorStop(1, '#5c5850');
    g.fillStyle = gr; g.shadowColor = 'rgba(255,240,200,0.18)'; g.shadowBlur = 22; rr(g, x, y, w, h, 14); g.fill(); g.shadowBlur = 0; g.strokeStyle = 'rgba(80,76,70,0.6)'; g.lineWidth = 3; g.stroke();
    g.fillStyle = 'rgba(30,28,24,0.25)'; for (var i = 0; i < 9; i++) g.fillRect(x + 20, y + 20 + i * (h - 40) / 9, w - 40, 1.5); g.restore();
  }
  function bust(g, x, y, s, a) {                                                         // a bronze-ish bust silhouette
    if (a <= 0) return; g.save(); g.globalAlpha *= a; g.translate(x, y); g.scale(s, s); var gr = g.createLinearGradient(-40, -90, 40, 40); gr.addColorStop(0, '#8a7556'); gr.addColorStop(1, '#4a3d2a');
    g.fillStyle = gr; g.beginPath(); g.arc(0, -52, 24, 0, 6.29); g.fill(); g.beginPath(); g.moveTo(-50, 30); g.quadraticCurveTo(-48, -14, 0, -18); g.quadraticCurveTo(48, -14, 50, 30); g.closePath(); g.fill();
    g.fillStyle = '#3d3326'; g.fillRect(-60, 30, 120, 16); g.restore();
  }
  function hall(g, x, y, w, h, open, a) {                                                // a university door
    if (a <= 0) return; g.save(); g.globalAlpha *= a; g.fillStyle = '#2c3a58'; g.strokeStyle = 'rgba(170,185,215,0.7)'; g.lineWidth = 3; g.fillRect(x, y, w, h); g.strokeRect(x, y, w, h);
    g.fillStyle = 'rgba(170,185,215,0.5)'; g.beginPath(); g.moveTo(x - 14, y); g.lineTo(x + w / 2, y - 46); g.lineTo(x + w + 14, y); g.closePath(); g.fill();
    var dw = w * 0.42, dx = x + w / 2 - dw / 2, dy = y + h - h * 0.62, dh = h * 0.62; g.fillStyle = open > 0.5 ? 'rgba(255,225,150,0.9)' : '#141b2c'; g.shadowColor = open > 0.5 ? GOLD : 'transparent'; g.shadowBlur = open > 0.5 ? 24 : 0; g.fillRect(dx, dy, dw, dh); g.shadowBlur = 0;
    g.strokeStyle = open > 0.5 ? GOLD : 'rgba(200,210,230,0.8)'; g.strokeRect(dx, dy, dw, dh); g.restore();
  }

  // ---------- scenes ----------
  var D = {};
  // hook: the white tomb with the engraved formula
  D.h0 = function (g, lt, L) {
    var a = ap(lt, L[0], 0.5); chip(g, 1450, 300, '维也纳中央公墓', BLUE, a, 28);
    slab(g, 1230, 340, 440, 600, ap(lt, L[1], 0.7));
    var b = ap(lt, L[2], 0.6); bust(g, 1450, 480, 1.35, b); chip(g, 1450, 560, '半身像', DIM, b, 22);
    var f = ap(lt, L[3], 0.6); photoCard(g, TB, 1260, 640, 380, 140, f, 'brightness(0.66) contrast(1.5)', GOLD);
    if (f > 0) { g.save(); g.globalAlpha *= f * (0.5 + 0.5 * Math.sin(lt * 2)); g.shadowColor = GOLD; g.shadowBlur = 40; g.strokeStyle = 'rgba(240,189,92,0.6)'; g.lineWidth = 2; g.strokeRect(1250, 630, 400, 160); g.restore(); }
    chip(g, 1450, 840, '1844 – 1906', GOLD, ap(lt, L[9], 0.5), 28);
    var gl = ap(lt, L[7], 0.6); if (gl > 0) { chip(g, 1450, 985, '热 · 混乱 · 时间的方向', INK, gl, 26); }
  };
  // 1844–1869: Vienna, carnival, a father lost, the best pupil, Graz
  D.birth = function (g, lt, L) {
    var a = ap(lt, L[0], 0.5); chip(g, 1450, 300, '维也纳 · 1844', GOLD, a, 28);
    var sk = a * (1 - ap(lt, L[4], 0.6)); if (sk > 0) { g.save(); g.globalAlpha *= sk; g.fillStyle = 'rgba(40,52,84,0.9)';                  // skyline with a cathedral spire
      for (var i = 0; i < 9; i++) { var bx = 1130 + i * 70, bh = 90 + rnd(i + 3) * 120; g.fillRect(bx, 760 - bh, 56, bh); }
      g.beginPath(); g.moveTo(1450, 470); g.lineTo(1480, 760); g.lineTo(1420, 760); g.closePath(); g.fill(); g.restore();
      var cf = ap(lt, L[1], 0.5) * (1 - ap(lt, L[3], 0.8)); if (cf > 0) for (var j = 0; j < 36; j++) { var cx = 1140 + rnd(j) * 620, cy = 330 + ((rnd(j + 50) * 400 + lt * 40 * (0.5 + rnd(j + 9))) % 400); glowDot(g, cx, cy, 5, ['#ff6a52', '#ffd98a', '#86b6ff', '#8fd9a8'][j % 4], cf * sk); }
      var gr = ap(lt, L[3], 0.8); if (gr > 0) { g.save(); g.globalAlpha *= gr * sk * 0.5; g.fillStyle = '#05080f'; g.fillRect(1100, 330, 700, 460); g.restore(); }
      chip(g, 1450, 840, '狂欢节 → 大斋期', GOLD, ap(lt, L[2], 0.5) * sk, 26); }
    var fa = ap(lt, L[4], 0.5) * (1 - ap(lt, L[7], 0.5)); if (fa > 0) { chip(g, 1250, 420, '15 岁 · 父亲去世', DIM, fa, 26);
      var gp = ap(lt, L[5], 0.5); for (var k = 0; k < 6; k++) coin(g, 1520 + (k % 3) * 70, 580 - Math.floor(k / 3) * 28, 24, fa * gp * (1 - ap(lt, L[6], 0.8) * (k % 2 ? 0.0 : 1)));
      chip(g, 1600, 700, '母亲的家产', GOLD, fa * gp, 24); chip(g, 1600, 760, '全花在读书上', INK, fa * ap(lt, L[6], 0.5), 24);
      for (var b = 0; b < 4; b++) hbar(g, 1250 + b * 38, 700 - b * 6, 30, 90 + b * 8, ['#b8903f', '#5a78a8', '#8a5a4a', '#5a8a6a'][b], fa * ap(lt, L[6] + 0.1 * b, 0.4), 6); }
    var m = ap(lt, L[7], 0.5) * (1 - ap(lt, L[9], 0.5)); if (m > 0) { medal(g, 1450, 560, 110, m, '第一'); chip(g, 1450, 720, '几乎年年班里第一名', GOLD, m, 28); chip(g, 1450, 780, '维也纳大学 · 斯特藩', BLUE, ap(lt, L[8], 0.5), 28); }
    var gz = ap(lt, L[9], 0.5); if (gz > 0) { card(g, 1130, 480, 640, 240, GOLD, gz); txt(g, '格拉茨大学', 1450, 560, 48, GOLD, 'center', gz, 900); txt(g, '数学物理教授 · 1869', 1450, 630, 38, INK, 'center', gz, 900); txt(g, '25 岁', 1450, 690, 40, GOLD, 'center', ap(lt, L[10], 0.5), 900); }
  };
  function medal(g, x, y, r, a, label) {
    if (a <= 0) return; g.save(); g.globalAlpha *= a; var gr = g.createRadialGradient(x - r * 0.3, y - r * 0.3, 2, x, y, r); gr.addColorStop(0, '#fff0c0'); gr.addColorStop(0.6, '#d9a040'); gr.addColorStop(1, '#8a5c18');
    g.fillStyle = gr; g.shadowColor = GOLD; g.shadowBlur = 20; g.beginPath(); g.arc(x, y, r, 0, 6.29); g.fill(); g.shadowBlur = 0;
    g.strokeStyle = 'rgba(110,70,20,0.7)'; g.lineWidth = 3; g.beginPath(); g.arc(x, y, r * 0.8, 0, 6.29); g.stroke();
    g.font = '900 ' + Math.round(r * 0.5) + 'px ' + SERIF; g.fillStyle = '#6a4410'; g.textAlign = 'center'; g.fillText(label, x, y + r * 0.18); g.restore();
  }
  // 1872–1876: Henrietta, the closed door, the appeal, the open door
  D.henrietta = function (g, lt, L) {
    var a = ap(lt, L[0], 0.5); chip(g, 1450, 300, '格拉茨 · 1872', BLUE, a, 28);
    var open = ap(lt, L[5], 0.5) > 0.5 ? 1 : 0; hall(g, 1260, 420, 380, 340, open, ap(lt, L[1], 0.6));
    var no = ap(lt, L[2], 0.5) * (1 - ap(lt, L[4], 0.4)); if (no > 0) { g.save(); g.globalAlpha *= no; g.strokeStyle = RED; g.lineWidth = 10; g.shadowColor = RED; g.shadowBlur = 14; g.lineCap = 'round'; g.beginPath(); g.moveTo(1415, 590); g.lineTo(1485, 660); g.moveTo(1485, 590); g.lineTo(1415, 660); g.stroke(); g.restore(); chip(g, 1450, 800, '不收女生', RED, no, 28); }
    var rj = ap(lt, L[3], 0.5) * (1 - ap(lt, L[4], 0.4)); if (rj > 0) chip(g, 1450, 860, '连旁听也被拒绝', DIM, rj, 26);
    var ap2 = ap(lt, L[4], 0.5); if (ap2 > 0) { doc(g, 1190, 830, 120, 140, ap2 * (1 - ap(lt, L[5], 0.5)), -0.12, '上诉', 3); arrow(g, 1320, 860, 1440, 780, GOLD, ap2 * (1 - ap(lt, L[5], 0.4)), eo((lt - L[4]) / 0.8), lt * 40); chip(g, 1520, 850, '玻尔兹曼支持她上诉', GOLD, ap2 * (1 - ap(lt, L[5], 0.4)), 26); }
    var win = ap(lt, L[5], 0.5); if (win > 0) { check(g, 1730, 560, 1, '#7dffb0', win); chip(g, 1450, 800, '上诉成功', '#7dffb0', win, 30); }
    var w = ap(lt, L[6], 0.6); if (w > 0) { g.save(); g.globalAlpha *= w; g.strokeStyle = GOLD; g.lineWidth = 8; g.shadowColor = GOLD; g.shadowBlur = 16; g.beginPath(); g.arc(1420, 930, 36, 0, 6.29); g.stroke(); g.beginPath(); g.arc(1480, 930, 36, 0, 6.29); g.stroke(); g.restore(); chip(g, 1450, 1000, '1876 · 结婚', GOLD, w, 26); }
  };
  // gas: the room full of little balls, pressure, the speed distribution
  D.gas = function (g, lt, L) {
    var a = ap(lt, L[0], 0.5); var bx0 = 1110, by0 = 330, bw = 400, bh = 360;
    var box = ap(lt, L[1], 0.6) * (1 - ap(lt, L[4], 0.5) * 0); if (box > 0) { g.save(); g.globalAlpha *= box; g.strokeStyle = 'rgba(170,185,215,0.8)'; g.lineWidth = 4; g.strokeRect(bx0, by0, bw, bh); g.fillStyle = 'rgba(134,182,255,0.07)'; g.fillRect(bx0, by0, bw, bh); g.restore(); }
    var cont = ap(lt, L[1], 0.6) * (1 - ap(lt, L[3], 0.6)); if (cont > 0) { g.save(); g.globalAlpha *= cont * 0.8; var gr = g.createRadialGradient(bx0 + bw / 2, by0 + bh / 2, 20, bx0 + bw / 2, by0 + bh / 2, 260); gr.addColorStop(0, 'rgba(180,200,240,0.55)'); gr.addColorStop(1, 'rgba(60,80,130,0.15)'); g.fillStyle = gr; g.fillRect(bx0 + 4, by0 + 4, bw - 8, bh - 8); g.restore(); chip(g, 1310, 280, '一团连续的东西？', DIM, cont, 26); }
    var m = ap(lt, L[3], 0.6); if (m > 0) { chip(g, 1310, 280, '无数个小分子', GOLD, m, 26); var sp = 1 + 1.6 * ap(lt, L[5], 0.8);
      for (var i = 0; i < 38; i++) { var vx = (40 + rnd(i) * 160) * sp * (rnd(i + 70) > 0.5 ? 1 : -1), vy = (40 + rnd(i + 20) * 160) * sp * (rnd(i + 90) > 0.5 ? 1 : -1);
        var px = tri(bx0 + 20 + rnd(i + 40) * (bw - 40) + vx * lt, bx0 + 12, bx0 + bw - 12), py = tri(by0 + 20 + rnd(i + 60) * (bh - 40) + vy * lt, by0 + 12, by0 + bh - 12); ball(g, px, py, 8, Math.hypot(vx, vy) > 220 * sp ? '#ff7a58' : '#86b6ff', m); } }
    var heat = ap(lt, L[5], 0.5); if (heat > 0) { chip(g, 1700, 400, '热 = 撞得有多快', GOLD, heat, 26); }
    var pr = ap(lt, L[7], 0.5); if (pr > 0) { for (var k = 0; k < 5; k++) { var ph = (lt * 1.4 + k * 0.2) % 1; arrow(g, bx0 + bw + 30 + ph * 30, by0 + 60 + k * 60, bx0 + bw + 4 + ph * 30, by0 + 60 + k * 60, '#ff7a58', pr * (1 - ph), 1, 0); } chip(g, 1700, 520, '压力 = 撞墙有多狠', '#ff7a58', pr, 26); }
    var cv = ap(lt, L[9], 0.6); if (cv > 0) { var X0 = 1160, Y0 = 930, Wd = 600, Hh = 190, p = eo((lt - L[9]) / 1.6); g.save(); g.globalAlpha *= cv; g.strokeStyle = 'rgba(200,210,230,0.6)'; g.lineWidth = 3; g.beginPath(); g.moveTo(X0, Y0 - Hh); g.lineTo(X0, Y0); g.lineTo(X0 + Wd, Y0); g.stroke();
      g.strokeStyle = GOLD; g.lineWidth = 5; g.shadowColor = GOLD; g.shadowBlur = 12; g.beginPath(); for (var j = 0; j <= 200 * p; j++) { var v = j / 200 * 3.2, f = v * v * Math.exp(-v * v / 1.1), px2 = X0 + j / 200 * Wd, py2 = Y0 - f * Hh * 1.65; if (j) g.lineTo(px2, py2); else g.moveTo(px2, py2); } g.stroke(); g.shadowBlur = 0; g.restore();
      txt(g, '速度', X0 + Wd / 2, Y0 + 40, 24, DIM, 'center', cv, 700); txt(g, '分子数', X0 - 10, Y0 - Hh - 10, 24, DIM, 'center', cv, 700); }
    var nm = ap(lt, L[12], 0.6); if (nm > 0) { chip(g, 1650, 770, '麦克斯韦－玻尔兹曼分布', GOLD, nm, 26); }
  };
  // entropy: a hundred coins, one arrangement vs about 10^29, then the formula
  D.entropy = function (g, lt, L) {
    var a = ap(lt, L[0], 0.5); var cup = a * (1 - ap(lt, L[7], 0.6)); if (cup > 0) {
      var heat = 1 - ap(lt, L[0] + 0.5, 3.0) * 0.75; g.save(); g.globalAlpha *= cup; g.fillStyle = 'rgba(255,255,255,0.12)'; rr(g, 1230, 420, 180, 220, 18); g.fill(); g.strokeStyle = 'rgba(210,220,240,0.8)'; g.lineWidth = 4; g.stroke();
      var gr = g.createLinearGradient(0, 470, 0, 640); gr.addColorStop(0, 'rgba(' + Math.round(100 + 155 * heat) + ',' + Math.round(110 + 40 * heat) + ',' + Math.round(240 - 150 * heat) + ',0.8)'); gr.addColorStop(1, 'rgba(60,80,140,0.6)'); g.fillStyle = gr; rr(g, 1238, 470, 164, 164, 14); g.fill();
      for (var s = 0; s < 3; s++) { g.strokeStyle = 'rgba(255,255,255,' + (0.5 * heat) + ')'; g.lineWidth = 3; g.beginPath(); g.moveTo(1290 + s * 36, 410); g.quadraticCurveTo(1280 + s * 36 + Math.sin(lt * 3 + s) * 12, 380, 1290 + s * 36, 350); g.stroke(); } g.restore();
      chip(g, 1320, 700, '热水 → 慢慢变凉', GOLD, cup, 26); var cold = ap(lt, L[1], 0.5); if (cold > 0) { arrow(g, 1560, 560, 1700, 560, DIM, cold * cup, 1, 0); txt(g, '✗', 1740, 575, 50, RED, 'center', cold * cup, 900); chip(g, 1640, 640, '凉水不会自己变热', DIM, cold * cup, 24); }
      var sn = ap(lt, L[3], 0.5); if (sn > 0) chip(g, 1450, 800, '熵 · 只增不减', BLUE, sn * cup, 30); }
    var cn = ap(lt, L[7], 0.6); if (cn > 0) {
      var allH = ap(lt, L[8], 0.5) * (1 - ap(lt, L[9], 0.4)), mixed = ap(lt, L[9], 0.5);
      for (var i = 0; i < 100; i++) { var cx = 1130 + (i % 10) * 44, cy = 340 + Math.floor(i / 10) * 44, shuf = Math.floor(lt * 2.2 + i * 0.7), heads = mixed > 0.5 ? (rnd(i * 13 + shuf * 7.3) > 0.5 ? 1 : 0) : 1; var on = heads;
        g.save(); g.globalAlpha *= cn; var gr2 = g.createRadialGradient(cx - 5, cy - 5, 1, cx, cy, 19); gr2.addColorStop(0, on ? '#fff0c0' : '#6a7aa0'); gr2.addColorStop(1, on ? '#c08a30' : '#1e2840'); g.fillStyle = gr2; g.shadowColor = on ? GOLD : 'transparent'; g.shadowBlur = on ? 8 : 0; g.beginPath(); g.arc(cx, cy, 19, 0, 6.29); g.fill(); g.restore(); }
      chip(g, 1360, 810, '一百枚硬币', INK, cn, 28);
      if (allH > 0) chip(g, 1710, 400, '全是正面：1 种', '#7dffb0', allH, 28);
      if (mixed > 0) { chip(g, 1710, 400, '五十正五十反', GOLD, mixed, 28); chip(g, 1710, 470, '约 10²⁹ 种排法', GOLD, ap(lt, L[10], 0.5), 30); } }
    var al = ap(lt, L[11], 0.5); if (al > 0) { chip(g, 1710, 560, '几乎永远：接近一半一半', INK, al, 24); }
    var nz = ap(lt, L[13], 0.5); if (nz > 0) { chip(g, 1710, 640, '全是正面：不是不可能', DIM, nz, 24); chip(g, 1710, 690, '但宇宙寿命里等不到', RED, ap(lt, L[14], 0.5), 24); }
    var lg = ap(lt, L[15], 0.6); if (lg > 0) { card(g, 1130, 850, 650, 110, GOLD, lg); txt(g, '熵 = 排法数量 的对数', 1455, 920, 40, GOLD, 'center', lg, 900); }
    var yr = ap(lt, L[16], 0.5); if (yr > 0) chip(g, 1640, 810, '1877 · 论文', BLUE, yr, 26);
    var pl = ap(lt, L[18], 0.6); if (pl > 0) { g.save(); g.globalAlpha *= pl; g.fillStyle = 'rgba(8,12,24,0.92)'; g.fillRect(1090, 300, 720, 700); g.restore(); photoCard(g, TB, 1130, 480, 640, 235, pl, 'brightness(0.66) contrast(1.5)', GOLD); chip(g, 1450, 400, '普朗克 · 写成今天的样子', BLUE, pl, 28); formula(g, 'S = k log W', 1450, 830, 64, GOLD, pl); }
  };
  // reversibility: the film played backwards
  D.loschmidt = function (g, lt, L) {
    var a = ap(lt, L[0], 0.5); chip(g, 1450, 300, '洛施密特的问题', BLUE, a, 28);
    var bx = 1130, by = 380, bw = 300, bh = 260, bx2 = 1480; var b1 = ap(lt, L[1], 0.6); if (b1 > 0) { [bx, bx2].forEach(function (x0, q) { g.save(); g.globalAlpha *= b1; g.strokeStyle = 'rgba(170,185,215,0.8)'; g.lineWidth = 3; g.strokeRect(x0, by, bw, bh); g.restore();
      var sp = q === 0 ? eo((lt - L[1]) / 5) : 1 - eo((lt - L[1]) / 5); for (var i = 0; i < 24; i++) { var tx = x0 + 18 + rnd(i) * (bw - 36), ty = by + 18 + rnd(i + 30) * (bh - 36); var cxp = x0 + 24 + (tx - x0 - 24) * sp, cyp = by + bh - 24 - (by + bh - 24 - ty) * sp; ball(g, cxp, cyp, 8, q === 0 ? '#86b6ff' : '#ff9a7a', b1); } });
      txt(g, '正着放', bx + bw / 2, by + bh + 46, 28, BLUE, 'center', b1, 700); txt(g, '倒着放', bx2 + bw / 2, by + bh + 46, 28, '#ff9a7a', 'center', b1, 700); arrow(g, bx + bw + 20, by + bh / 2, bx2 - 20, by + bh / 2, DIM, b1, 1, 0); txt(g, '都成立', 1455, by + bh / 2 - 16, 26, DIM, 'center', b1, 700); }
    chip(g, 1450, 780, '那为什么只往一个方向走？', RED, ap(lt, L[2], 0.5), 30);
    var an = ap(lt, L[4], 0.6); if (an > 0) { g.save(); g.globalAlpha *= an; g.fillStyle = 'rgba(255,255,255,0.1)'; g.fillRect(1130, 850, 650, 28); g.fillStyle = RED; g.fillRect(1130, 850, 1.5, 28); g.restore(); chip(g, 1450, 930, '倒回去 · 小到惊人', RED, ap(lt, L[5], 0.5), 28); }
    var y = ap(lt, L[6], 0.5); if (y > 0) chip(g, 1450, 990, '争了很多年', DIM, y, 24);
  };
  // 1895 Lübeck: do you see the atom?
  D.atoms = function (g, lt, L) {
    var a = ap(lt, L[0], 0.5); chip(g, 1450, 300, '反对原子的人', RED, a, 28);
    var m = ap(lt, L[1], 0.5); if (m > 0) { card(g, 1130, 360, 300, 150, BLUE, m); txt(g, '马赫', 1280, 420, 44, BLUE, 'center', m, 900); txt(g, '看不见 = 不该进科学', 1280, 475, 22, INK, 'center', ap(lt, L[2], 0.5), 700); }
    var q = ap(lt, L[4], 0.5); if (q > 0) { g.save(); g.globalAlpha *= q; g.fillStyle = 'rgba(8,12,24,0.9)'; g.strokeStyle = RED; g.lineWidth = 3; rr(g, 1130, 540, 300, 80, 16); g.fill(); g.stroke(); g.restore(); txt(g, '你见过原子吗？', 1280, 595, 34, RED, 'center', q, 900); chip(g, 1280, 650, '（据说）', DIM, ap(lt, L[3], 0.5), 22); }
    var o = ap(lt, L[5], 0.5); if (o > 0) { card(g, 1500, 360, 300, 150, GOLD, o); txt(g, '奥斯特瓦尔德', 1650, 420, 38, GOLD, 'center', o, 900); txt(g, '基础是能量', 1650, 475, 28, INK, 'center', ap(lt, L[6], 0.5), 700); }
    var l = ap(lt, L[7], 0.5); if (l > 0) { chip(g, 1450, 740, '吕贝克 · 1895 · 当面辩论', BLUE, l, 28); }
    var v = ap(lt, L[9], 0.5); if (v > 0) { for (var i = 0; i < 20; i++) { var left = i < 14, p = eo((lt - L[10] - i * 0.05) / 0.8), x0 = 1280 + (i % 10) * 24, tx = left ? 1200 + (i % 7) * 26 : 1560 + (i % 6) * 26, ty = 830 + (left ? Math.floor(i / 7) * 30 : Math.floor((i - 14) / 6) * 30); glowDot(g, x0 + (tx - x0) * p, 900 + (ty - 900) * p, 9, left ? GOLD : RED, v); }
      chip(g, 1250, 960, '支持原子论', GOLD, ap(lt, L[10], 0.5), 24); chip(g, 1620, 960, '反对', RED, ap(lt, L[10], 0.5), 24); }
    var w = ap(lt, L[11], 0.5); if (w > 0) chip(g, 1450, 1010, '可他们在学界很有分量', DIM, w, 24);
  };
  // 1890s: moving from city to city; the preface of 1898
  D.moves = function (g, lt, L) {
    var a = ap(lt, L[0], 0.5); chip(g, 1450, 300, '换了一所又一所', BLUE, a, 28);
    var C = [['格拉茨', 1170, 470], ['维也纳', 1380, 400], ['慕尼黑', 1570, 480], ['莱比锡', 1740, 420]];
    C.forEach(function (c, i) { var p = ap(lt, L[1] + i * 0.4, 0.5); if (p > 0) { if (i) arrow(g, C[i - 1][1] + 30, C[i - 1][2], c[1] - 30, c[2], DIM, p, eo((lt - L[1] - i * 0.4) / 0.5), lt * 30); glowDot(g, c[1], c[2], 11, GOLD, p); txt(g, c[0], c[1], c[2] + 50, 28, INK, 'center', p, 700); } });
    var ph = ap(lt, L[5], 0.7); if (ph > 0) { photoCard(g, PH, 1150, 560, 278, 340, ph, 'sepia(0.5) contrast(1.05)', GOLD); chip(g, 1289, 950, '1898 · 《气体理论讲义》序言', GOLD, ph, 22); }
    var q = ap(lt, L[6], 0.6); if (q > 0) { card(g, 1500, 580, 320, 330, BLUE, q); txt(g, '“微弱地逆着', 1660, 660, 32, INK, 'center', q, 900); txt(g, '时代潮流挣扎”', 1660, 706, 32, INK, 'center', ap(lt, L[7], 0.5), 900); var q2 = ap(lt, L[10], 0.6); txt(g, '“让后人不必', 1660, 790, 30, GOLD, 'center', q2, 900); txt(g, '重新发现一遍”', 1660, 834, 30, GOLD, 'center', ap(lt, L[11], 0.6), 900); }
  };
  // 1906: the sea at Duino; restraint
  D.duino = function (g, lt, L) {
    var f = ap(lt, L[0], 0.8); if (f > 0) { g.save(); g.globalAlpha *= f * 0.9; var sky = g.createLinearGradient(0, 330, 0, 650); sky.addColorStop(0, '#162040'); sky.addColorStop(1, '#4a4a6a'); g.fillStyle = sky; g.fillRect(1130, 330, 640, 320);
      var sea = g.createLinearGradient(0, 650, 0, 850); sea.addColorStop(0, '#2a3c68'); sea.addColorStop(1, '#0a1226'); g.fillStyle = sea; g.fillRect(1130, 650, 640, 200);
      for (var i = 0; i < 8; i++) { g.strokeStyle = 'rgba(180,200,240,' + (0.25 - i * 0.02) + ')'; g.lineWidth = 2; g.beginPath(); for (var x = 0; x <= 640; x += 8) { var y = 665 + i * 26 + Math.sin(x * 0.04 + lt * 1.2 + i) * 3; if (x) g.lineTo(1130 + x, y); else g.moveTo(1130 + x, y); } g.stroke(); }
      g.fillStyle = 'rgba(255,200,130,0.45)'; g.beginPath(); g.arc(1450, 650, 54, Math.PI, 0); g.fill();                                  // low sun on the horizon
      g.fillStyle = '#0a0f1c'; g.fillRect(1130, 850, 640, 34); g.fillRect(1290, 812, 8, 38); g.fillRect(1350, 812, 8, 38); g.fillRect(1280, 800, 90, 12); g.fillRect(1280, 750, 10, 52);   // an empty chair on the quay
      g.restore(); }
    chip(g, 1450, 300, '杜伊诺 · 亚得里亚海', BLUE, ap(lt, L[3], 0.6), 28);
    var d = ap(lt, L[4], 0.8); if (d > 0) { mono(g, '1906 · 9 · 5', 1450, 960, 40, GOLD, 'center', d); }
    var ag = ap(lt, L[5], 0.8); if (ag > 0) chip(g, 1450, 1010, '享年 62 岁', DIM, ag, 26);
    var rs = ap(lt, L[1], 0.6) * (1 - ap(lt, L[2], 0.6)); if (rs > 0) chip(g, 1450, 360, '1906 · 5 月 · 辞去教职', INK, rs, 28);
  };
  // 1905–1908: Einstein's calculation, Perrin's measurement, the numbers match
  D.proof = function (g, lt, L) {
    var a = ap(lt, L[0], 0.5); chip(g, 1450, 300, '1905', BLUE, a, 30);
    var bp = ap(lt, L[2], 0.6); if (bp > 0) { g.save(); g.globalAlpha *= bp; g.strokeStyle = 'rgba(170,185,215,0.8)'; g.lineWidth = 3; g.beginPath(); g.arc(1450, 520, 170, 0, 6.29); g.stroke(); g.fillStyle = 'rgba(134,182,255,0.07)'; g.fill();
      var x = 1450, y = 520; g.strokeStyle = '#ffd98a'; g.lineWidth = 3; g.shadowColor = GOLD; g.shadowBlur = 8; g.beginPath(); g.moveTo(x, y); var n = Math.floor(160 * ap(lt, L[2], 4.0)); for (var i = 0; i < n; i++) { x += (rnd(i * 2.1) - 0.5) * 22; y += (rnd(i * 3.7 + 1) - 0.5) * 22; x = Math.max(1310, Math.min(1590, x)); y = Math.max(390, Math.min(650, y)); g.lineTo(x, y); } g.stroke(); g.restore();
      glowDot(g, x, y, 10, GOLD, bp); var hit = ap(lt, L[3], 0.5); for (var m = 0; m < 14; m++) glowDot(g, 1290 + rnd(m + 5) * 320 + Math.sin(lt * 4 + m) * 12, 400 + rnd(m + 25) * 280 + Math.cos(lt * 5 + m) * 12, 4, '#86b6ff', bp * hit * 0.7); chip(g, 1450, 735, '水里的花粉在乱抖', INK, bp, 26); }
    var ei = ap(lt, L[1], 0.5); chip(g, 1450, 360, '爱因斯坦 · 理论', '#cfe0ff', ei, 28);
    var pe = ap(lt, L[4], 0.6); if (pe > 0) { chip(g, 1450, 795, '1908 · 佩兰 · 显微镜下', GOLD, pe, 28); }
    var mt = ap(lt, L[6], 0.6); if (mt > 0) { g.save(); g.globalAlpha *= mt; g.strokeStyle = '#7dffb0'; g.shadowColor = '#7dffb0'; g.shadowBlur = 14; g.lineWidth = 9; g.lineCap = 'round'; g.beginPath(); g.moveTo(1740, 470); g.lineTo(1770, 505); g.lineTo(1820, 440); g.stroke(); g.restore(); chip(g, 1750, 560, '数字对上了', '#7dffb0', mt, 26); }
    var rl = ap(lt, L[7], 0.6); if (rl > 0) { gtxt(g, '原子是真的', 1450, 880, 56, GOLD, 'center', rl); }
    var os = ap(lt, L[8], 0.5); if (os > 0) { chip(g, 1450, 940, '奥斯特瓦尔德 · 约 1908 · 改口', INK, os, 26); }
  };
  // the constant, the students, and the tomb again
  D.tomb = function (g, lt, L) {
    var k = ap(lt, L[0], 0.6) * (1 - ap(lt, L[6], 0.6)); if (k > 0) { card(g, 1130, 330, 650, 120, GOLD, k); txt(g, '玻尔兹曼常数 k', 1455, 385, 36, GOLD, 'center', k, 900); formula(g, '1.380649 × 10⁻²³ J/K', 1455, 430, 38, INK, ap(lt, L[1], 0.5) * k); }
    var kv = ap(lt, L[2], 0.5) * (1 - ap(lt, L[6], 0.6)); if (kv > 0) { chip(g, 1450, 520, '2019 起 · 精确值', BLUE, ap(lt, L[1], 0.5) * (1 - ap(lt, L[6], 0.6)), 26);
      g.save(); g.globalAlpha *= kv; g.strokeStyle = 'rgba(200,210,230,0.8)'; g.lineWidth = 4; rr(g, 1420, 570, 60, 220, 28); g.stroke(); g.fillStyle = RED; var lv = 0.4 + 0.3 * Math.sin(lt * 1.5); g.fillRect(1428, 790 - 210 * lv, 44, 210 * lv); g.beginPath(); g.arc(1450, 810, 38, 0, 6.29); g.fill(); g.restore(); chip(g, 1450, 880, '开尔文 · 温度的单位', GOLD, kv, 26); }
    var s1 = ap(lt, L[3], 0.5) * (1 - ap(lt, L[6], 0.6)); if (s1 > 0) { chip(g, 1250, 960, '迈特纳 · 核裂变', GOLD, s1, 26); chip(g, 1650, 960, '埃伦费斯特', BLUE, ap(lt, L[5], 0.5) * (1 - ap(lt, L[6], 0.6)), 26); }
    var tb = ap(lt, L[6], 0.7); if (tb > 0) { chip(g, 1450, 320, '教科书 · 信息论', INK, ap(lt, L[7], 0.5), 28);
      slab(g, 1240, 380, 420, 580, tb); bust(g, 1450, 530, 1.25, tb); var fm = ap(lt, L[9], 0.6); photoCard(g, TB, 1260, 700, 380, 140, fm, 'brightness(0.66) contrast(1.5)', GOLD); }
    var big = ap(lt, L[11], 0.6); if (big > 0) { g.save(); g.globalAlpha *= big; g.fillStyle = 'rgba(8,12,24,0.88)'; g.fillRect(1090, 300, 720, 720); g.restore(); photoCard(g, TB, 1130, 520, 640, 235, big, 'brightness(0.66) contrast(1.5)', GOLD); formula(g, 'S = k log W', 1450, 870, 70, GOLD, big); chip(g, 1450, 440, '维也纳中央公墓', BLUE, big, 28); }
  };
