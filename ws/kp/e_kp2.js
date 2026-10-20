  // ================= Kepler: scenes k8-k12 (Mars, 8 arcminutes, the ellipse, snowflake, the dream) =================
  // ---------- k8: circles tweaked again and again; most fit; a few are off by 8' ----------
  DRAW.k8 = function (g, lt, L) {
    var i, A = A_(lt, 0.1, 0.7), p1 = W_(lt, 0.1, L[6] - 0.2, 0.7, 0.6);
    if (p1 > 0.01) {
      var cx = 40, cy = 28, R = 15;
      sunB(g, cx, cy, 1.5, p1, lt);
      // the observed positions (on the true ellipse, e≈0.093, exaggerated ×3 for visibility)
      var e = 0.28, n = 14;
      for (i = 0; i < n; i++) {
        var E = keplerPos(i / n * TAU, e), p = orbitXY(cx - R * e, cy, R, e, E);
        dot(g, p[0], p[1], 0.45, MARS, p1 * A_(lt, 0.3 + i * 0.05, 0.3)); }
      tx(g, '第谷的火星观测', 70, 15, 1.7, MARS, 'center', 800, SANS, p1);
      // the circle model, nudged around
      var tries = clamp((lt - L[2]) / ((L[4] - L[2]) || 1)), wob = (1 - tries) * Math.sin(lt * 5) * 1.2;
      var ca = A_(lt, L[1], 0.5) * p1;
      ring(g, cx - 2.2 + wob * 0.6 - tries * 0.4, cy + wob * 0.3, R * 0.98, GOLD, 0.28, ca);
      dot(g, cx - 2.2 + wob * 0.6 - tries * 0.4, cy + wob * 0.3, 0.4, GOLD, ca * A_(lt, L[2], 0.4));
      tx(g, '正圆', 70, 20, 1.7, GOLD, 'center', 800, SANS, ca);
      var cnt = Math.floor(clamp((lt - L[3]) / 2.4) * 70);
      tx(g, '第 ' + cnt + ' 遍', 70, 26, 2.2, FG, 'center', 900, SANS, A_(lt, L[3], 0.4) * p1);
      tx(g, '至少 70 遍', 70, 30.5, 1.5, DIM, 'center', 700, SANS, A_(lt, L[3] + 2.4, 0.4) * p1);
      // the misfit: a red flag where circle and data part
      var mf = A_(lt, L[5], 0.5) * p1, E2 = keplerPos(1.3, e), q = orbitXY(cx - R * e, cy, R, e, E2);
      ring(g, q[0], q[1], 1.8, RED, 0.25, mf); chip(g, q[0] + 9, q[1] + 4, '偏了 8 角分', RED, mf, 'rgba(56,14,14,0.95)');
      tx(g, '（偏差放大画出）', 20, 44, 1.4, DIM, 'center', 600, SANS, p1);
    }
    var p2 = A_(lt, L[6] - 0.1, 0.7);
    if (p2 > 0.01) {
      moonB(g, 36, 28, 9, p2);
      var w = A_(lt, L[7], 0.6);
      g.save(); g.globalAlpha *= p2 * w; g.fillStyle = 'rgba(255,107,107,0.35)'; g.fillRect(27, 18, 4.5, 20); g.restore();
      ln(g, 27, 40, 31.5, 40, RED, 0.3, null, p2 * w); ln(g, 27, 39, 27, 41, RED, 0.3, null, p2 * w); ln(g, 31.5, 39, 31.5, 41, RED, 0.3, null, p2 * w);
      tx(g, '8′', 29.25, 43, 2, RED, 'center', 900, SANS, p2 * w);
      tx(g, '满月宽约 30 角分', 36, 15, 1.7, FG, 'center', 800, SANS, p2);
      tx(g, '8 角分 ≈ 它的 1/4', 70, 28, 2.6, RED, 'center', 900, SANS, p2 * w);
    }
  };

  // ---------- k9: Tycho's 2' vs 8'; the quote; the egg; the truth in between ----------
  DRAW.k9 = function (g, lt, L) {
    var i, p1 = W_(lt, 0.1, L[3] - 0.2, 0.7, 0.6);
    if (p1 > 0.01) {
      extra(g, 20, 45, 11, p1 * (1 - A_(lt, L[1], 0.5)), { name: '别人', col: '#8e97a8' }, lt);
      tx(g, '差不多就行了', 20, 30, 1.8, DIM, 'center', 800, SANS, p1 * A_(lt, 0.3, 0.5) * (1 - A_(lt, L[1], 0.5)));
      // an error ruler: Tycho ±2', the gap 8'
      var r = A_(lt, L[1], 0.6) * p1, x0 = 30, sc = 4.4, y = 28;
      ln(g, x0, y, x0 + 10 * sc, y, 'rgba(238,242,248,0.4)', 0.2, null, r);
      for (i = 0; i <= 10; i++) { ln(g, x0 + i * sc, y - 0.8, x0 + i * sc, y + 0.8, 'rgba(238,242,248,0.5)', 0.12, null, r); if (i % 2 === 0) tx(g, i + '′', x0 + i * sc, y + 2.6, 1.3, DIM, 'center', 700, SANS, r); }
      rbox(g, x0, y - 3.4, 2 * sc, 2.2, 0.4, null, 0, 'rgba(143,208,255,0.75)', r); tx(g, '第谷的误差 ≈ 2′', x0 + sc, y - 5, 1.5, ICE, 'center', 800, SANS, r);
      var g8 = A_(lt, L[2], 0.6) * p1;
      rbox(g, x0, y + 4, 8 * sc * eo(pr(lt, L[2], 0.8)), 2.2, 0.4, null, 0, 'rgba(255,107,107,0.8)', g8); tx(g, '8′：不可能是看错', x0 + 4 * sc, y + 8.2, 1.6, RED, 'center', 800, SANS, g8);
      kepler(g, 86, 45, 12, p1, { flip: true }, lt);
    }
    var p2 = W_(lt, L[3] - 0.1, L[6] - 0.2, 0.7, 0.6);
    if (p2 > 0.01) {
      paper(g, 22, 13, 56, 28, p2);
      tx(g, '“单单这八角分，', 50, 21, 3.0, '#3a2a1a', 'center', 900, SANS, A_(lt, L[4], 0.6) * p2);
      tx(g, '就将带领我们改革整个天文学。”', 50, 28, 3.0, '#3a2a1a', 'center', 900, SANS, A_(lt, L[5], 0.6) * p2);
      tx(g, '《新天文学》第 19 章', 46, 35.5, 1.6, '#7a5a3a', 'center', 700, SANS, A_(lt, L[5] + 0.6, 0.5) * p2);
      quill(g, 74, 38, 1.4, p2, -0.6 + 0.1 * Math.sin(lt * 6));
    }
    // circle (too far one way), egg (too far the other), the ellipse in between
    var p3 = A_(lt, L[6] - 0.1, 0.7);
    if (p3 > 0.01) {
      var cx = 46, cy = 28, A = 16, Bc = 16, Be = 13.4, Bv = 12.4;
      sunB(g, cx + 4.2, cy, 1.4, p3, lt);
      ellipsePath(g, cx, cy, A, Bc, 'rgba(242,198,107,0.6)', 0.22, p3, 1, [0.8, 0.6]);
      tx(g, '正圆', cx, cy - Bc - 1.6, 1.5, GOLD, 'center', 800, SANS, p3);
      // egg: fatter on the Sun's side
      var eg = A_(lt, L[6] + 0.3, 0.6) * p3;
      g.save(); g.globalAlpha *= eg; g.strokeStyle = 'rgba(143,208,255,0.75)'; g.lineWidth = 0.22; g.setLineDash([0.8, 0.6]); g.beginPath();
      for (i = 0; i <= 96; i++) { var t = i / 96 * TAU, b = Bv * (1 + 0.12 * Math.cos(t)); var px = cx + A * Math.cos(t), py = cy + b * Math.sin(t); if (i === 0) g.moveTo(px, py); else g.lineTo(px, py); }
      g.stroke(); g.restore();
      tx(g, '蛋形', cx + A + 3, cy + 5, 1.5, ICE, 'left', 800, SANS, eg);
      chip(g, 82, 20, '又偏 8′，偏到另一边', ICE, A_(lt, L[7], 0.5), 'rgba(16,30,52,0.95)');
      var tr = A_(lt, L[8], 0.6);
      ellipsePath(g, cx, cy, A, Be, '#ffe2a8', 0.45, tr, eo(pr(lt, L[8], 1.2)));
      glow(g, cx, cy, 20, 'rgba(255,226,168,0.6)', 0.18 * tr);
      chip(g, 82, 32, '真相在中间', '#ffe2a8', tr, 'rgba(48,38,12,0.95)');
      tx(g, '（形状差别已放大）', 20, 44, 1.4, DIM, 'center', 600, SANS, p3);
    }
  };

  // ---------- k10: the ellipse; foci; equal areas; 1609; the circle breaks ----------
  DRAW.k10 = function (g, lt, L) {
    var i, A = A_(lt, 0.1, 0.7);
    var cx = 42, cy = 28, Ax = 22, e = 0.55, Bx = Ax * Math.sqrt(1 - e * e), f = Ax * e;
    var p1 = W_(lt, 0.1, L[6] - 0.2, 0.7, 0.6);
    if (p1 > 0.01) {
      ellipsePath(g, cx, cy, Ax, Bx, '#ffe2a8', 0.4, p1, eo(pr(lt, 0.2, 1.0)));
      tx(g, '椭圆', cx, cy - Bx - 2, 2.0, '#ffe2a8', 'center', 900, SANS, p1 * A_(lt, 0.3, 0.5));
      var fa = A_(lt, L[2], 0.5) * p1;
      sunB(g, cx + f, cy, 1.6, p1 * A_(lt, L[1], 0.5), lt);
      dot(g, cx - f, cy, 0.45, DIM, fa); dot(g, cx, cy, 0.3, 'rgba(238,242,248,0.5)', fa);
      tx(g, '焦点', cx + f, cy + 3.6, 1.5, GOLD, 'center', 800, SANS, fa); tx(g, '焦点', cx - f, cy + 3.6, 1.5, DIM, 'center', 800, SANS, fa);
      tx(g, '中心', cx, cy - 2.2, 1.3, DIM, 'center', 600, SANS, fa);
      chip(g, 82, 15, '第一条', GOLD, A_(lt, L[1], 0.5) * p1, 'rgba(48,38,12,0.95)');
      // equal areas: wedges swept in equal times
      var ar = A_(lt, L[3], 0.6) * p1;
      if (ar > 0.01) {
        chip(g, 82, 22, '第二条', ICE, ar, 'rgba(16,30,52,0.95)');
        var wedges = [[-0.42, 0.42], [2.62, 3.66]], cols = ['rgba(255,140,100,0.35)', 'rgba(143,208,255,0.35)'];
        for (var w = 0; w < 2; w++) {
          var M0 = wedges[w][0], M1 = wedges[w][1], wa = ar * A_(lt, L[4] + w * 0.8, 0.6);
          g.save(); g.globalAlpha *= wa; g.fillStyle = cols[w]; g.beginPath(); g.moveTo(cx + f, cy);
          for (i = 0; i <= 24; i++) { var Mm = M0 + (M1 - M0) * i / 24, E = keplerPos(Mm, e), p = orbitXY(cx, cy, Ax, e, E); g.lineTo(p[0], p[1]); }
          g.closePath(); g.fill(); g.restore();
        }
        tx(g, '近：快', cx + Ax + 4.4, cy, 1.6, HOT, 'left', 800, SANS, ar * A_(lt, L[4], 0.5));
        tx(g, '远：慢', cx - Ax - 4.4, cy, 1.6, ICE, 'right', 800, SANS, ar * A_(lt, L[4] + 0.8, 0.5));
        tx(g, '同样的时间，扫过同样的面积', 82, 40, 1.5, FG, 'center', 800, SANS, A_(lt, L[5], 0.5) * p1);
      }
      // note: the perihelion is on the right of the Sun? keep the Sun at the left focus; perihelion is the left end
      var E2 = keplerPos(lt * 1.1, e), q = orbitXY(cx, cy, Ax, e, E2);
      mars(g, q[0], q[1], 0.9, p1);
    }
    var p2 = A_(lt, L[6] - 0.1, 0.7);
    if (p2 > 0.01) {
      tome(g, 30, 27, 18, 24, p2, '#4a2a1a', '新天文学', '1609', lt);
      // a perfect golden circle that cracks and falls apart
      var ck = A_(lt, L[8] - 0.2, 0.4), fall = clamp((lt - L[8]) / 2.4);
      if (fall <= 0) ring(g, 70, 28, 10, GOLD, 0.6, p2);
      else for (i = 0; i < 10; i++) { var t0 = i / 10 * TAU, t1 = t0 + TAU / 10 - 0.05, dy = fall * fall * 18 * (0.6 + 0.4 * Math.sin(i * 3.1)), dx = Math.cos(t0 + 0.3) * fall * 3;
        arcl(g, 70 + dx, 28 + dy, 10, t0, t1, GOLD, 0.6, p2 * (1 - fall * 0.8)); }
      for (i = 0; i < 6; i++) { var a = i * 1.1; ln(g, 70 + Math.cos(a) * 9, 28 + Math.sin(a) * 9, 70 + Math.cos(a + 0.2) * 11, 28 + Math.sin(a + 0.2) * 11, '#ffffff', 0.15, null, ck * (1 - fall)); }
      tx(g, '天上只能走正圆', 70, 14.5, 1.8, GOLD, 'center', 800, SANS, A_(lt, L[7], 0.5) * (1 - fall * 0.6));
      tx(g, '两千年', 70, 44, 1.8, DIM, 'center', 800, SANS, A_(lt, L[7], 0.5));
    }
  };

  // ---------- k11: the snowflake; honeycomb; cannonballs; the conjecture ----------
  DRAW.k11 = function (g, lt, L) {
    var i, j, p1 = W_(lt, 0.1, L[3] - 0.2, 0.7, 0.6);
    for (i = 0; i < 40; i++) { var r = rng(i + 90), y = (r() * 56 + lt * (1 + r() * 2)) % 50 + 4; dot(g, r() * 100 + Math.sin(lt + i) * 0.8, y, 0.15 + r() * 0.2, '#e6f3ff', 0.5 * A_(lt, 0, 1)); }
    if (p1 > 0.01) {
      tx(g, '1611', 22, 16, 3.4, GOLD, 'center', 900, SANS, p1);
      var pk = A_(lt, L[0] + 0.5, 0.5) * p1;
      rbox(g, 14, 21, 16, 10, 0.4, 'rgba(242,198,107,0.6)', 0.18, 'rgba(32,26,10,0.9)', pk);
      tx(g, '钱包', 22, 24, 1.6, FG, 'center', 800, SANS, pk); tx(g, '空', 22, 28, 2.2, DIM, 'center', 900, SANS, pk);
      paper(g, 40, 14, 18, 24, A_(lt, L[1], 0.5) * p1);
      tx(g, '新年礼物', 49, 17.5, 1.6, '#3a2a1a', 'center', 800, SANS, A_(lt, L[1], 0.5) * p1);
      snowflake(g, 49, 28, 6, A_(lt, L[1] + 0.3, 0.5) * p1, eo(pr(lt, L[1] + 0.3, 1.8)), lt);
      snowflake(g, 78, 26, 9, A_(lt, L[2], 0.5) * p1, eo(pr(lt, L[2], 2.0)), lt);
      tx(g, '为什么总是 6 个角？', 78, 40, 1.8, ICE, 'center', 800, SANS, A_(lt, L[2] + 0.4, 0.5) * p1);
    }
    var p2 = W_(lt, L[3] - 0.1, L[5] - 0.2, 0.7, 0.6);
    if (p2 > 0.01) {
      var n = 0;
      for (j = 0; j < 4; j++) for (i = 0; i < 6; i++) { var hx = 18 + i * 5.2 + (j % 2) * 2.6, hy = 18 + j * 4.5; hexCell(g, hx, hy, 3, p2 * A_(lt, L[3] + n * 0.04, 0.3), 'rgba(242,198,107,0.25)'); n++; }
      tx(g, '蜂巢', 32, 40, 1.8, GOLD, 'center', 800, SANS, A_(lt, L[4], 0.5) * p2);
      for (j = 0; j < 4; j++) for (i = 0; i < 5; i++) { var sx = 64 + i * 3.4 + (j % 2) * 1.7, sy = 18 + j * 3; dot(g, sx, sy, 1.6, '#b4283a', p2 * A_(lt, L[4] + (i + j) * 0.05, 0.3)); dot(g, sx - 0.5, sy - 0.5, 0.5, 'rgba(255,200,200,0.6)', p2 * A_(lt, L[4] + (i + j) * 0.05, 0.3)); }
      tx(g, '石榴籽', 72, 40, 1.8, '#ff9a9a', 'center', 800, SANS, A_(lt, L[4] + 0.3, 0.5) * p2);
      chip(g, 50, 13, '六边形排得最紧', GOLD, A_(lt, L[3] + 0.4, 0.5) * p2, 'rgba(48,38,12,0.95)');
    }
    var p3 = A_(lt, L[5] - 0.1, 0.7);
    if (p3 > 0.01) {
      // cannonballs stacked in a pyramid (front view of layers)
      var rows = 5, R = 2.2, k = 0;
      for (j = 0; j < rows; j++) for (i = 0; i < rows - j; i++) {
        var bx = 30 + i * 2 * R + j * R, by = 42 - j * R * 1.73, ba = p3 * A_(lt, L[6] + k * 0.06, 0.3); k++;
        var gr = g.createRadialGradient(bx - R * 0.35, by - R * 0.35, R * 0.1, bx, by, R); gr.addColorStop(0, '#9aa7ba'); gr.addColorStop(1, '#2e3542');
        g.save(); g.globalAlpha *= ba; g.fillStyle = gr; g.beginPath(); g.arc(bx, by, R, 0, TAU); g.fill(); g.restore();
      }
      tx(g, '一堆炮弹，怎么堆最省地方？', 40, 16, 2.0, FG, 'center', 800, SANS, A_(lt, L[6], 0.5));
      chip(g, 78, 24, '开普勒猜想', GOLD, A_(lt, L[7], 0.5), 'rgba(48,38,12,0.95)');
      var yr = 1611 + Math.round(387 * clamp((lt - L[8]) / 1.8));
      tx(g, '1611 → ' + yr, 78, 31, 2.4, FG, 'center', 900, SANS, A_(lt, L[8], 0.5));
      tx(g, '证明于 1998 年', 78, 36, 1.6, DIM, 'center', 700, SANS, A_(lt, L[8] + 1.8, 0.5));
    }
  };

  // ---------- k12: the dream: a boy, a mother with herbs, a spirit, the Moon ----------
  DRAW.k12 = function (g, lt, L) {
    var i, A = A_(lt, 0.1, 0.7);
    stars(g, 0.8 * A, lt, 61, 90);
    var p1 = W_(lt, 0.1, L[3] - 0.2, 0.7, 0.6);
    if (p1 > 0.01) {
      tome(g, 18, 21, 11, 15, p1, '#2e2a52', '梦', null, lt);
      tx(g, '写于 1608 年前后', 18, 33, 1.4, DIM, 'center', 600, SANS, p1);
      hills(g, p1, 40, '#1a2430'); ground(g, 43, p1, '#1a2430', '#0c1018');
      var b1 = A_(lt, L[1], 0.5) * p1;
      faraday(g, 46, 45, 7, b1, { col: '#bfe3ff', name: '冰岛少年', nameCol: ICE }, lt);
      kmother(g, 56, 45, 10, b1, { name: '会草药的母亲', pose: 'forward' }, lt);
      for (i = 0; i < 5; i++) { var hx = 60 + i * 1.2; ln(g, hx, 45, hx + 0.4, 41.5 - (i % 2), '#62d6a0', 0.25, null, b1); }
      var sp = A_(lt, L[2], 0.6) * p1, sx = 74 + Math.sin(lt * 1.7) * 1.5, sy = 30 + Math.sin(lt * 2.3) * 1.2;
      halo(g, sx, sy, 6, 'rgba(201,184,255,0.8)', 0.5 * sp); dot(g, sx, sy, 1.4, '#e6dcff', sp);
      for (i = 0; i < 8; i++) { var t = lt * 2 + i * 0.8; dot(g, sx + Math.cos(t) * 3, sy + Math.sin(t) * 2, 0.25, '#c9b8ff', sp * 0.7); }
      tx(g, '精灵', sx, sy - 4.6, 1.6, '#c9b8ff', 'center', 800, SANS, sp);
    }
    var p2 = W_(lt, L[3] - 0.1, L[7] - 0.3, 0.7, 0.6);
    if (p2 > 0.01) {
      // flight to the Moon, then Earth seen from the Moon
      var fl = eio(pr(lt, L[3], 2.0));
      earthB(g, mix(80, 72, fl), mix(32, 16, fl), mix(5, 4.5, fl), p2, lt);
      g.save(); g.globalAlpha *= p2; var mg = g.createLinearGradient(0, 38, 0, 56); mg.addColorStop(0, '#8f8c82'); mg.addColorStop(1, '#3a3832'); g.fillStyle = mg;
      g.beginPath(); g.moveTo(0, 56.25); g.lineTo(0, mix(70, 40, fl)); g.quadraticCurveTo(50, mix(64, 36, fl), 100, mix(70, 41, fl)); g.lineTo(100, 56.25); g.closePath(); g.fill(); g.restore();
      for (i = 0; i < 6; i++) { var r = rng(i + 5); g.save(); g.globalAlpha *= p2 * fl; g.strokeStyle = 'rgba(40,38,34,0.6)'; g.lineWidth = 0.2; g.beginPath(); g.ellipse(10 + r() * 80, 44 + r() * 4, 2 + r() * 3, 0.6, 0, 0, TAU); g.stroke(); g.restore(); }
      var tr = 1 - fl; dot(g, mix(30, 40, fl), mix(40, 37, fl), 0.8, '#bfe3ff', p2 * (fl > 0.98 ? 1 : 0.8));
      tx(g, '从月亮上看地球', 72, 25.5, 1.7, ICE, 'center', 800, SANS, A_(lt, L[4], 0.5) * p2);
      chip(g, 28, 18, '最早的科幻之一', GOLD, A_(lt, L[5] + 0.3, 0.5) * p2, 'rgba(48,38,12,0.95)');
      tx(g, '1634 年出版（他去世后）', 28, 23.5, 1.4, DIM, 'center', 600, SANS, A_(lt, L[6], 0.5) * p2);
    }
    var p3 = A_(lt, L[7] - 0.2, 0.8);
    if (p3 > 0.01) {
      tome(g, 34, 27, 12, 16, p3, '#2e2a52', '梦', null, lt);
      // the herb-woman in the story casts a long shadow that becomes a real old woman
      g.save(); g.globalAlpha *= p3 * 0.5; g.fillStyle = '#000'; g.beginPath(); g.ellipse(62, 44.5, 10 * A_(lt, L[7], 1.2), 1.2, 0, 0, TAU); g.fill(); g.restore();
      katharina(g, 62, 44, 11, A_(lt, L[7] + 0.4, 1.0), { name: '' }, lt);
      tx(g, '?', 70, 30, 3, RED, 'center', 900, SANS, A_(lt, L[7] + 1.2, 0.5));
    }
  };
