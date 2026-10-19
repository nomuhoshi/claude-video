  // ================= Newton: scenes n8-n14 (light, telescope, Halley, the Principia, three laws) =================
  // a beam that splits into a fan of colours after a prism: entry point (x1,y1) -> exit point (px,py) -> fan to screen x = sx
  function fan(g, px, py, sx, y0, y1, a, k) {
    if (a <= 0.003) return;
    g.save(); g.globalCompositeOperation = 'lighter';
    for (var i = 0; i < 7; i++) {
      var yy = mix(y0, y1, i / 6), xe = mix(px, sx, k), ye = mix(py, yy, k);
      ln(g, px, py, xe, ye, SPEC[i], 0.5, null, a * 0.85); ln(g, px, py, xe, ye, SPEC[i], 1.4, null, a * 0.18);
    }
    g.restore();
  }
  // ---------- n8: the prism ----------
  DRAW.n8 = function (g, lt, L) {
    var i, p1 = W_(lt, 0.1, L[2] - 0.2, 0.7, 0.6);
    if (p1 > 0.01) {
      sunB(g, 14, 18, 3.2, p1, lt);
      beam(g, 17, 20, 40, 29, '#fff6d8', 0.5, p1);
      prismB(g, 45, 30, 6, 0, p1);
      var mis = A_(lt, L[1], 0.6) * p1;
      fan(g, 48, 30, 78, 22, 38, mis, eo(pr(lt, L[1], 0.8)));
      tx(g, '白光 = 最纯的光', 22, 37, 2.0, FG, 'center', 800, SANS, p1);
      tx(g, '彩色 = 玻璃加上去的？', 78, 44, 2.0, DIM, 'center', 800, SANS, mis);
      tx(g, '当时的看法', 50, 14.5, 1.8, DIM, 'center', 700, SANS, A_(lt, 0.3, 0.5) * p1);
    }
    // the dark room: a hole in the shutter, one prism, a long spectrum on the wall
    var p2 = W_(lt, L[2] - 0.1, L[5] - 0.2, 0.7, 0.6);
    if (p2 > 0.01) {
      rbox(g, 4, 10, 4, 36, 0.2, null, 0, '#3a2c20', p2);
      dot(g, 6, 18, 0.5, '#fff6d8', p2); glow(g, 6, 18, 3, 'rgba(255,240,200,0.9)', 0.6 * p2);
      tx(g, '窗板上的小孔', 13, 13, 1.6, DIM, 'center', 700, SANS, p2);
      var b = A_(lt, L[3], 0.5) * p2;
      beam(g, 6, 18, 36, 26, '#fff6d8', 0.5, b);
      prismB(g, 40, 27, 5, 0.1, p2 * A_(lt, L[3] - 0.2, 0.5));
      rbox(g, 88, 12, 2, 34, 0.2, null, 0, '#2a2f3d', p2);
      var sp = A_(lt, L[4], 0.5) * p2;
      fan(g, 43, 27.5, 87.5, 15, 42, sp, eo(pr(lt, L[4], 0.9)));
      for (i = 0; i < 7; i++) rbox(g, 87.7, 15 + i * 3.9 - 1.9, 1.5, 3.9, 0.1, null, 0, SPEC[i], sp * A_(lt, L[4] + 0.8, 0.4));
      chip(g, 72, 46, '长长的彩带', GOLD, A_(lt, L[4] + 1.0, 0.5) * p2, 'rgba(48,38,12,0.95)');
      newton(g, 24, 46, 10, p2, { name: '' }, lt);
    }
    // the crucial experiment: pick out red, send it through a second prism; it stays red
    var p3 = W_(lt, L[5] - 0.1, L[8] - 0.2, 0.7, 0.6);
    if (p3 > 0.01) {
      beam(g, 4, 22, 18, 25, '#fff6d8', 0.5, p3);
      prismB(g, 22, 26, 4.5, 0, p3);
      fan(g, 25, 26.5, 44, 17, 37, p3, 1);
      rbox(g, 44, 14, 1.4, 12, 0.1, null, 0, '#3a4252', p3); rbox(g, 44, 19.4, 1.4, 25, 0.1, null, 0, '#3a4252', p3);
      tx(g, '只留红光', 44.7, 47, 1.6, DIM, 'center', 700, SANS, A_(lt, L[5] + 0.4, 0.5) * p3);
      var rd = A_(lt, L[5] + 0.6, 0.6) * p3;
      beam(g, 45.4, 18.4, 62, 23, SPEC[0], 0.5, rd);
      var p2b = A_(lt, L[6], 0.6) * p3;
      prismB(g, 65, 24, 4.5, 0.15, p2b);
      beam(g, 67.5, 24.4, 90, 33, SPEC[0], 0.5, p2b * A_(lt, L[6] + 0.4, 0.5));
      rbox(g, 90, 26, 2, 14, 0.2, null, 0, '#2a2f3d', p2b);
      rbox(g, 90.2, 31, 1.6, 3.6, 0.1, null, 0, SPEC[0], p2b * A_(lt, L[6] + 0.8, 0.4));
      chip(g, 78, 43, '还是红光', SPEC[0], A_(lt, L[7], 0.5) * p3, 'rgba(56,20,20,0.95)');
    }
    // white is all the colours mixed: the seven beams converge back into white
    var p4 = A_(lt, L[8] - 0.1, 0.7);
    if (p4 > 0.01) {
      var k = eio(pr(lt, L[9] - 0.2, 1.4));
      g.save(); g.globalCompositeOperation = 'lighter';
      for (i = 0; i < 7; i++) {
        var y0 = 16 + i * 4, ye = mix(y0, 30, k);
        ln(g, 8, y0, 46, ye, SPEC[i], 0.8, null, p4 * 0.85); ln(g, 8, y0, 46, ye, SPEC[i], 2.2, null, p4 * 0.15);
      }
      g.restore();
      beam(g, 46, 30, 92, 30, '#ffffff', 0.6 + 0.2 * k, p4 * k);
      glow(g, 46, 30, 6, 'rgba(255,255,255,0.9)', 0.6 * k * p4);
      tx(g, '颜色不是玻璃造的', 50, 13.5, 2.2, FG, 'center', 800, SANS, p4);
      chip(g, 72, 39, '白光 = 所有颜色', GOLD, A_(lt, L[9] + 0.6, 0.5), 'rgba(48,38,12,0.95)');
    }
  };

  // ---------- n9: lenses smear colours; a mirror does not ----------
  DRAW.n9 = function (g, lt, L) {
    var i, p1 = W_(lt, 0.1, L[2] - 0.2, 0.7, 0.6);
    if (p1 > 0.01) {
      // a lens: different colours focus at different points
      g.save(); g.globalAlpha *= p1; g.fillStyle = 'rgba(160,210,255,0.3)'; g.strokeStyle = 'rgba(220,240,255,0.8)'; g.lineWidth = 0.18;
      g.beginPath(); g.ellipse(30, 30, 1.6, 10, 0, 0, TAU); g.fill(); g.stroke(); g.restore();
      for (i = 0; i < 7; i++) {
        var fx = 52 + i * 1.6, k = A_(lt, L[0] + 0.3, 0.8);
        g.save(); g.globalCompositeOperation = 'lighter';
        ln(g, 8, 22, 30, 22, '#fff6d8', 0.3, null, p1 * 0.4); ln(g, 8, 38, 30, 38, '#fff6d8', 0.3, null, p1 * 0.4);
        ln(g, 30, 22, mix(30, fx, k), mix(22, 30, k), SPEC[i], 0.25, null, p1 * 0.85);
        ln(g, 30, 38, mix(30, fx, k), mix(38, 30, k), SPEC[i], 0.25, null, p1 * 0.85);
        g.restore();
      }
      // the star seen through it, with a coloured fringe
      var st = A_(lt, L[0] + 1.0, 0.6) * p1;
      for (i = 6; i >= 0; i--) ring(g, 80, 28, 1.8 + i * 0.35, SPEC[i], 0.3, 0.75 * st);
      dot(g, 80, 28, 1.4, '#ffffff', st);
      tx(g, '透镜里的星星：带彩边', 80, 38, 1.8, FG, 'center', 800, SANS, st);
      chip(g, 58, 43, '颜色不同，折的角度不同', ICE, A_(lt, L[1], 0.5) * p1);
    }
    // a curved mirror: every colour reflects the same way
    var p2 = W_(lt, L[2] - 0.1, L[4] - 0.2, 0.7, 0.6);
    if (p2 > 0.01) {
      g.save(); g.globalAlpha *= p2; g.strokeStyle = '#dfe8ff'; g.lineWidth = 0.6; g.beginPath(); g.arc(98, 30, 30, Math.PI * 0.82, Math.PI * 1.18); g.stroke(); g.restore();
      tx(g, '凹面镜', 84, 16, 2.0, FG, 'center', 800, SANS, p2);
      var k2 = A_(lt, L[2] + 0.4, 0.9);
      for (i = 0; i < 5; i++) {
        var y = 20 + i * 5, xm = 98 - Math.sqrt(900 - (y - 30) * (y - 30));
        g.save(); g.globalCompositeOperation = 'lighter';
        ln(g, 10, y, xm, y, '#fff6d8', 0.3, null, p2 * 0.7);
        ln(g, xm, y, mix(xm, 83, k2), mix(y, 30, k2), '#fff6d8', 0.3, null, p2 * 0.7 * k2);
        g.restore();
      }
      glow(g, 83, 30, 3, 'rgba(255,255,255,0.9)', 0.7 * k2 * p2);
      chip(g, 40, 43, '所有颜色，反射得一样', GOLD, A_(lt, L[2] + 1.2, 0.5) * p2, 'rgba(48,38,12,0.95)');
    }
    // the little telescope (oblique 3D tube on a ball mount)
    var p3 = A_(lt, L[4] - 0.2, 0.7);
    if (p3 > 0.01) {
      var ox = 36, oy = 34;
      tx(g, '1668', 50, 13, 3.6, GOLD, 'center', 900, SANS, A_(lt, L[3], 0.6) * p3);
      g.save(); g.globalAlpha *= p3; g.translate(50, 32); g.rotate(-0.35);
      var gr = g.createLinearGradient(0, -3, 0, 3); gr.addColorStop(0, '#d6c08a'); gr.addColorStop(0.5, '#a88a4a'); gr.addColorStop(1, '#6b5428');
      g.fillStyle = gr; g.fillRect(-12, -3, 24, 6);
      g.fillStyle = '#3a2c20'; g.beginPath(); g.ellipse(12, 0, 0.9, 3, 0, 0, TAU); g.fill();
      g.fillStyle = '#c9b07a'; g.beginPath(); g.ellipse(-12, 0, 0.9, 3, 0, 0, TAU); g.fill();
      g.fillStyle = '#2e3542'; g.fillRect(4, -4.6, 1.2, 1.8);
      g.restore();
      ln(g, 50, 35, 48, 43, '#6b5428', 0.6, null, p3); dot(g, 50, 35, 1.6, '#8a6a3a', p3); ln(g, 44, 43.5, 52, 43.5, '#6b5428', 0.6, null, p3);
      // a ruler showing it is about 15 cm
      var ru = A_(lt, L[4] + 0.2, 0.6) * p3;
      tx(g, '约 15 厘米长', 50, 22, 1.8, ICE, 'center', 800, SANS, ru);
      newton(g, 20, 45, 11, p3, { name: '' }, lt);
      var rs = A_(lt, L[5], 0.6);
      for (i = 0; i < 3; i++) extra(g, 74 + i * 7, 45, 10, rs, { name: '', col: '#8e97a8' }, lt);
      tx(g, '皇家学会', 81, 31.5, 1.9, FG, 'center', 800, SANS, rs);
      chip(g, 81, 27, '1672 · 选为会员', GOLD, A_(lt, L[6], 0.5), 'rgba(48,38,12,0.95)');
    }
  };

  // ---------- n10: Halley's visit ----------
  DRAW.n10 = function (g, lt, L) {
    var i, A = A_(lt, 0.1, 0.7);
    tx(g, '1684', 50, 13, 3.4, GOLD, 'center', 900, SANS, A * (1 - A_(lt, L[1], 0.5)));
    halley(g, 26, 45, 13, A * A_(lt, 0.2, 0.6), { walk: lt < 1.6 ? lt * 7 : null, pose: lt > L[1] && lt < L[4] ? 'forward' : 'down' }, lt);
    newton(g, 74, 45, 13, A * A_(lt, 0.5, 0.6), { flip: true, pose: lt > L[4] && lt < L[7] ? 'forward' : 'down' }, lt);
    // the question: inverse square -> what orbit?
    var q = W_(lt, L[1] - 0.1, L[4] - 0.3, 0.6, 0.5);
    if (q > 0.01) {
      rbox(g, 31, 15, 38, 18, 0.8, 'rgba(127,224,160,0.5)', 0.18, 'rgba(14,26,22,0.95)', q);
      sunB(g, 40, 24, 1.6, q, lt);
      var d = mix(3, 13, 0.5 + 0.5 * Math.sin(lt * 1.6));
      dot(g, 40 + d, 24, 0.7, ICE, q);
      var f = 9 / (d * d) * 6;
      arrow(g, 40 + d - 0.9, 24, 40 + d - 0.9 - Math.min(6, f), 24, GOLD, 0.3, q * A_(lt, L[2], 0.5), 0.8);
      tx(g, '距离 ×2，引力 ÷4', 58, 21, 1.7, GOLD, 'center', 800, SANS, q * A_(lt, L[2], 0.5));
      tx(g, '轨道是什么形状？', 58, 27.5, 1.9, FG, 'center', 800, SANS, q * A_(lt, L[3], 0.5));
    }
    // "an ellipse"
    var e = W_(lt, L[4] - 0.1, L[7] - 0.3, 0.6, 0.5);
    if (e > 0.01) {
      var c = 50, cy = 25, Ax = 13, By = 8, fx = Math.sqrt(Ax * Ax - By * By);
      ellipsePath(g, c, cy, Ax, By, GOLD, 0.35, e, eo(pr(lt, L[4], 1.0)));
      sunB(g, c - fx, cy, 1.4, e, lt);
      var th = lt * 1.3; dot(g, c + Ax * Math.cos(th), cy + By * Math.sin(th), 0.7, ICE, e);
      chip(g, 50, 37, '椭圆', GOLD, A_(lt, L[4] + 0.3, 0.4) * e, 'rgba(48,38,12,0.95)');
      tx(g, '你怎么知道？', 26, 20.5, 1.9, '#7fe0a0', 'center', 800, SANS, A_(lt, L[5], 0.4) * e);
      tx(g, '“我算过。”', 74, 20.5, 2.2, GOLD, 'center', 900, SANS, A_(lt, L[6], 0.4) * e);
    }
    // the missing draft: papers shuffled
    var m = A_(lt, L[7] - 0.1, 0.6);
    if (m > 0.01) {
      for (i = 0; i < 6; i++) {
        var ang = Math.sin(lt * 1.5 + i) * 0.2 + (i - 2.5) * 0.12;
        g.save(); g.translate(52 + (i - 2.5) * 4, 26 + Math.sin(i * 2.3) * 2); g.rotate(ang);
        paper(g, -4, -5, 8, 10, m * 0.9); scribble(g, -3, -3.6, 6, 5, m, lt, -10, 7 + i); g.restore();
      }
      tx(g, '草稿呢？', 52, 15.5, 2.2, HOT, 'center', 800, SANS, A_(lt, L[7] + 0.4, 0.4) * m * (1 - A_(lt, L[8], 0.4)));
      tx(g, '重算一遍，寄过去', 52, 15.5, 2.2, GOLD, 'center', 800, SANS, A_(lt, L[8], 0.4));
    }
  };

  // ---------- n11: eighteen months; the Principia; Halley pays ----------
  DRAW.n11 = function (g, lt, L) {
    var i, p1 = W_(lt, 0.1, L[2] - 0.2, 0.7, 0.6);
    if (p1 > 0.01) {
      // a desk under a lamp; pages pile up
      rbox(g, 30, 36, 40, 2, 0.2, null, 0, '#5a3e2a', p1);
      ln(g, 33, 38, 33, 46, '#5a3e2a', 0.6, null, p1); ln(g, 67, 38, 67, 46, '#5a3e2a', 0.6, null, p1);
      glow(g, 62, 26, 10, 'rgba(255,200,120,0.9)', 0.35 * p1);
      var nP = Math.floor(clamp((lt - L[1]) / 3) * 14);
      for (i = 0; i < nP; i++) paper(g, 44 + Math.sin(i * 2.1) * 0.6, 35.4 - i * 0.35, 10, 0.5, p1, 'rgba(236,226,204,' + (0.7 + 0.02 * i).toFixed(2) + ')');
      newton(g, 24, 45, 12, p1, { name: '', pose: 'book' }, lt);
      quill(g, 52, 34.5, 1, p1, -0.6 + 0.1 * Math.sin(lt * 7));
      var mo = Math.min(18, Math.round(18 * clamp((lt - L[1]) / 2.8)));
      tx(g, mo + ' 个月', 78, 26, 3.0, GOLD, 'center', 900, SANS, A_(lt, L[1], 0.5) * p1);
      tx(g, '几乎闭门不出', 78, 31, 1.7, DIM, 'center', 700, SANS, A_(lt, L[1] + 0.3, 0.5) * p1);
    }
    var p2 = A_(lt, L[2] - 0.1, 0.8);
    if (p2 > 0.01) {
      for (i = 0; i < 3; i++) bookB(g, 34 + i * 9, 28, 8, 22, p2 * A_(lt, L[2] + i * 0.25, 0.5), ['#5a2e22', '#4a2a1e', '#3e2418'][i], ['卷一', '卷二', '卷三'][i]);
      tx(g, '自然哲学的数学原理', 43, 15, 2.4, GOLD, 'center', 900, SANS, p2);
      tx(g, '1687', 43, 43, 2.4, FG, 'center', 900, SANS, p2);
      var hp = A_(lt, L[3], 0.6);
      halley(g, 74, 45, 12, hp, { pose: 'forward' }, lt);
      for (i = 0; i < 4; i++) coinB(g, 64 - i * 1.5 + Math.sin(lt * 3 + i) * 0.2, 31 - i * 1.2, 1.2, hp * A_(lt, L[3] + 0.3 + i * 0.12, 0.3), 0);
      tx(g, '印书的钱', 74, 26.5, 1.8, '#7fe0a0', 'center', 800, SANS, hp);
      var lw = A_(lt, L[4], 0.6);
      chip(g, 43, 47.5 - 0, '三条运动定律', GOLD, 0, null);
      tx(g, '书的开头：三条运动定律', 43, 11, 1.8, ICE, 'center', 800, SANS, lw * 0);
      for (i = 0; i < 3; i++) chip(g, 43 + (i - 1) * 9, 47, ['一', '二', '三'][i], GOLD, 0, null);
      for (i = 0; i < 3; i++) { var la = A_(lt, L[4] + 0.4 + i * 0.35, 0.4); rbox(g, 34 + i * 9 - 3, 19, 6, 3.4, 1.7, null, 0, 'rgba(242,198,107,0.95)', la); tx(g, '定律' + ['一', '二', '三'][i], 34 + i * 9, 20.8, 1.4, '#2a1e08', 'center', 900, SANS, la); }
    }
  };

  // ---------- n12: first law ----------
  DRAW.n12 = function (g, lt, L) {
    var A = A_(lt, 0.1, 0.7), i;
    tx(g, '第一条', 12, 14, 2.4, GOLD, 'left', 900, SANS, A);
    // space: a puck at rest, then one gliding on forever
    var p1 = W_(lt, 0.1, L[3] - 0.2, 0.7, 0.6);
    if (p1 > 0.01) {
      stars(g, 0.7 * p1, lt, 51, 60);
      dot(g, 26, 24, 1.6, ICE, p1 * A_(lt, L[1], 0.5)); tx(g, '静止 → 一直静止', 26, 29, 1.8, FG, 'center', 800, SANS, p1 * A_(lt, L[1], 0.5));
      var ma = A_(lt, L[2], 0.5) * p1, xm = 12 + ((lt - L[2]) * 9) % 96;
      if (ma > 0.01) {
        for (i = 1; i < 10; i++) dot(g, xm - i * 1.4, 38, 1.3 - i * 0.11, ICE, ma * (0.3 - i * 0.03));
        dot(g, xm, 38, 1.4, GOLD, ma); arrow(g, xm + 2, 38, xm + 6, 38, GOLD, 0.3, ma, 0.8);
        tx(g, '运动 → 沿直线一直走', 60, 43.5, 1.8, FG, 'center', 800, SANS, ma);
      }
      tx(g, '（没有力去推它）', 72, 14, 1.7, DIM, 'center', 700, SANS, p1);
    }
    // on the ground: friction slows the ball
    var p2 = A_(lt, L[3] - 0.1, 0.7);
    if (p2 > 0.01) {
      ground(g, 38, p2, '#3a3026', '#1a140e');
      var t = Math.max(0, lt - L[3] - 0.3), v0 = 14, k = 0.55, x = 12 + v0 / k * (1 - Math.exp(-k * t));
      dot(g, x, 36.4, 1.6, GOLD, p2);
      for (i = 0; i < 6; i++) ln(g, x - 1 - i * 0.6, 38.2, x - 2 - i * 0.6, 39, HOT, 0.12, null, p2 * Math.exp(-k * t) * 0.8);
      var fr = A_(lt, L[4], 0.5) * p2;
      arrow(g, x - 2, 32.5, x - 7, 32.5, HOT, 0.3, fr * Math.min(1, Math.exp(-k * t) * 2 + 0.3), 0.8);
      tx(g, '摩擦', x - 5, 30.5, 1.7, HOT, 'center', 800, SANS, fr);
      for (i = 0; i < 4; i++) { var yy = 22 + i * 3, xo = ((lt * 6 + i * 13) % 80) + 10; ln(g, 100 - xo, yy, 104 - xo, yy, 'rgba(143,208,255,0.5)', 0.15, null, fr); }
      tx(g, '空气', 78, 19, 1.7, ICE, 'center', 800, SANS, fr);
      tx(g, '自己停下？', 50, 24, 2.2, FG, 'center', 800, SANS, A_(lt, L[3] + 0.4, 0.5) * p2 * (1 - fr));
    }
  };

  // ---------- n13: second law ----------
  DRAW.n13 = function (g, lt, L) {
    var A = A_(lt, 0.1, 0.7), i;
    tx(g, '第二条', 12, 14, 2.4, GOLD, 'left', 900, SANS, A);
    ground(g, 40, A, '#2a2f3d', '#11141c');
    function cart(x, y, w, h, col, a) { rbox(g, x - w / 2, y - h, w, h, 0.3, null, 0, col, a); dot(g, x - w / 3, y + 0.4, 0.7, '#1a1f2a', a); dot(g, x + w / 3, y + 0.4, 0.7, '#1a1f2a', a); }
    // two equal carts: push harder -> speeds up faster
    var p1 = W_(lt, 0.1, L[2] - 0.2, 0.7, 0.6);
    if (p1 > 0.01) {
      var t = Math.max(0, lt - 0.8), a1 = 1.2, a2 = 3.0;
      var x1 = Math.min(90, 14 + 0.5 * a1 * t * t), x2 = Math.min(90, 14 + 0.5 * a2 * t * t);
      cart(x1, 27, 6, 3.6, '#8fb6ff', p1); arrow(g, x1 - 9, 25.2, x1 - 4, 25.2, GOLD, 0.25, p1, 0.7); tx(g, '轻推', x1 - 7, 22.4, 1.5, GOLD, 'center', 700, SANS, p1);
      cart(x2, 38.6, 6, 3.6, '#8fb6ff', p1); arrow(g, x2 - 12, 36.8, x2 - 4, 36.8, GOLD, 0.55, p1, 1.1); tx(g, '用力推', x2 - 8, 33.8, 1.5, GOLD, 'center', 700, SANS, p1);
      tx(g, '一样的东西', 80, 14, 1.7, DIM, 'center', 700, SANS, p1);
    }
    // same push: heavier cart is harder to move
    var p2 = W_(lt, L[2] - 0.1, L[3] - 0.2, 0.7, 0.6);
    if (p2 > 0.01) {
      var t2 = Math.max(0, lt - L[2] - 0.4), x3 = Math.min(90, 14 + 0.5 * 3.0 * t2 * t2), x4 = Math.min(90, 14 + 0.5 * 0.9 * t2 * t2);
      cart(x3, 27, 6, 3.6, '#8fb6ff', p2); arrow(g, x3 - 10, 25.2, x3 - 4, 25.2, GOLD, 0.4, p2, 0.9);
      cart(x4, 38.6, 11, 7, '#5a6a8a', p2); arrow(g, x4 - 12.5, 35, x4 - 6.5, 35, GOLD, 0.4, p2, 0.9);
      tx(g, '轻', x3, 21.8, 1.6, FG, 'center', 800, SANS, p2); tx(g, '重', x4, 29.6, 1.6, FG, 'center', 800, SANS, p2);
      tx(g, '一样的力', 80, 14, 1.7, DIM, 'center', 700, SANS, p2);
    }
    var p3 = A_(lt, L[3] - 0.1, 0.6);
    if (p3 > 0.01) {
      tx(g, 'F = m a', 50, 24, 5.4, GOLD, 'center', 900, SANS, p3);
      tx(g, '力  =  质量  ×  速度变化的快慢', 50, 31.5, 1.9, FG, 'center', 700, SANS, p3);
      glow(g, 50, 24, 14, 'rgba(242,198,107,0.6)', 0.25 * p3);
    }
  };

  // ---------- n14: third law ----------
  DRAW.n14 = function (g, lt, L) {
    var A = A_(lt, 0.1, 0.7), i;
    tx(g, '第三条', 12, 14, 2.4, GOLD, 'left', 900, SANS, A);
    var p1 = W_(lt, 0.1, L[2] - 0.2, 0.7, 0.6);
    if (p1 > 0.01) {
      ground(g, 42, p1, '#2a3a4a', '#0f1820');
      var t = Math.max(0, lt - L[0] - 0.8), s = Math.min(14, 6 * t);
      extra(g, 44 - s, 44, 12, p1, { name: '你', col: '#8fb6ff', pose: 'push', flip: false }, lt);
      extra(g, 56 + s, 44, 12, p1, { name: '别人', col: '#bfe3c6', pose: 'push', flip: true }, lt);
      var ar = A_(lt, L[1], 0.5) * p1;
      arrow(g, 47 - s, 28, 53 + s, 28, GOLD, 0.35, ar, 0.9); arrow(g, 53 + s, 31, 47 - s, 31, ICE, 0.35, ar, 0.9);
      tx(g, '一样大', 50, 24, 1.8, FG, 'center', 800, SANS, ar);
      tx(g, '（站在冰面上）', 80, 16, 1.6, DIM, 'center', 600, SANS, p1);
    }
    var p2 = A_(lt, L[2] - 0.1, 0.7);
    if (p2 > 0.01) {
      stars(g, 0.8 * p2, lt, 61, 70);
      var t2 = Math.max(0, lt - L[2] - 0.2), y = 32 - 0.6 * t2 * t2;
      g.save(); g.globalAlpha *= p2; g.translate(50, y);
      g.fillStyle = '#dfe3ec'; g.beginPath(); g.moveTo(0, -7); g.quadraticCurveTo(2.4, -3, 2.2, 3); g.lineTo(-2.2, 3); g.quadraticCurveTo(-2.4, -3, 0, -7); g.fill();
      g.fillStyle = '#ff6b6b'; g.beginPath(); g.moveTo(-2.2, 1); g.lineTo(-4, 4); g.lineTo(-2.2, 3.2); g.fill(); g.beginPath(); g.moveTo(2.2, 1); g.lineTo(4, 4); g.lineTo(2.2, 3.2); g.fill();
      g.restore();
      for (i = 0; i < 14; i++) { var fq = (lt * 2.6 + i * 0.071) % 1; glow(g, 50 + Math.sin(i * 3.7) * fq * 1.6, y + 3.6 + fq * 7, 1.4 * (1 - fq) + 0.4, 'rgba(255,170,70,0.9)', p2 * (1 - fq) * 0.8); }
      for (i = 0; i < 10; i++) { var ph = (lt * 1.4 + i * 0.1) % 1; dot(g, 50 + Math.sin(i * 7.1) * ph * 4, y + 4 + ph * 12, 0.5 + ph, 'rgba(200,210,230,0.35)', p2 * (1 - ph)); }
      arrow(g, 58, y + 9, 58, y + 15, ICE, 0.35, p2 * A_(lt, L[2] + 0.4, 0.4), 0.9); tx(g, '气往后', 64, y + 12, 1.7, ICE, 'left', 800, SANS, p2 * A_(lt, L[2] + 0.4, 0.4));
      arrow(g, 42, y + 1, 42, y - 6, GOLD, 0.35, p2 * A_(lt, L[2] + 0.8, 0.4), 0.9); tx(g, '火箭往前', 40, y - 2.5, 1.7, GOLD, 'right', 800, SANS, p2 * A_(lt, L[2] + 0.8, 0.4));
    }
  };
