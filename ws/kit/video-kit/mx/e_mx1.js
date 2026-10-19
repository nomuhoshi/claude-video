  // ================= Maxwell: scenes m0-m6 (opening, childhood, colour, Saturn) =================
  // ---------- m0: an invisible wave, first found with a pen ----------
  DRAW.m0 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8), outA = 1 - A_(lt, L[3] - 0.3, 0.6);
    if (outA > 0.01) {
      tower(g, 18, 43, 20, A * outA);
      waveArcs(g, 18, 23, lt, A * outA * A_(lt, L[0], 0.6), ICE, 4, 14, -0.7, 0.7, 7);
      phone(g, 80, 29, 1.15, A * outA * A_(lt, L[0] + 0.2, 0.6), lt);
      var wa = A_(lt, L[1], 0.6) * outA, faint = 1 - 0.65 * A_(lt, L[2], 0.8);
      if (wa > 0.01) {
        g.save(); g.globalAlpha *= wa * faint; g.strokeStyle = EC; g.lineWidth = 0.4; if (lt > L[2]) g.setLineDash([0.8, 0.8]); g.beginPath();
        for (i = 0; i <= 120; i++) { var x = 21 + i * 0.45, e = Math.min(1, i / 10) * Math.min(1, (120 - i) / 10), y = 24 + (29 - 24) * i / 120 - Math.sin(i * 0.32 - lt * 7) * 2.6 * e; if (i === 0) g.moveTo(x, y); else g.lineTo(x, y); }
        g.stroke(); g.restore();
        glow(g, 80, 29, 8, 'rgba(120,170,255,0.9)', 0.35 * wa);
      }
      chip(g, 50, 39, '看不见的波', ICE, A_(lt, L[2], 0.6) * outA);
    }
    // a pen and a page of equations
    var pa = A_(lt, L[3] - 0.1, 0.7) * (1 - A_(lt, L[4] - 0.2, 0.6));
    if (pa > 0.01) {
      rbox(g, 38, 13, 40, 28, 0.6, null, 0, 'rgba(236,226,204,0.93)', pa);
      var E = ['∇ · E = ρ / ε₀', '∇ · B = 0', '∇ × E = − ∂B / ∂t', '∇ × B = μ₀J + μ₀ε₀ ∂E/∂t'];
      g.save(); g.globalAlpha *= pa; for (i = 0; i < 4; i++) typeOn(g, E[i], 58, 19 + i * 5.6, 2.3, '#3a2a1a', lt, L[3] + 0.2 + i * 0.45, 18, 'center', 700, SANS); g.restore();
      mxOld(g, 25, 42, 18, pa, { pose: 'forward' }, lt);
    }
    // 1865 on paper, 1887 in a laboratory
    var tl = A_(lt, L[4], 0.7);
    if (tl > 0.01) {
      ln(g, 22, 30, 78, 30, 'rgba(238,242,248,0.4)', 0.3, null, tl);
      dot(g, 26, 30, 1.1, GOLD, tl); glow(g, 26, 30, 4, 'rgba(242,198,107,0.9)', 0.5 * tl);
      var hx = mix(26, 74, eio(pr(lt, L[4] + 0.2, 1.4)));
      ln(g, 26, 30, hx, 30, GOLD, 0.45, null, tl);
      dot(g, 74, 30, 1.1, ICE, tl * A_(lt, L[4] + 1.4, 0.4));
      tx(g, '1865', 26, 25.5, 2.6, GOLD, 'center', 900, SANS, tl); tx(g, '用笔算出来', 26, 35, 1.9, FG, 'center', 700, SANS, tl);
      tx(g, '1887', 74, 25.5, 2.6, ICE, 'center', 900, SANS, tl * A_(lt, L[4] + 1.4, 0.4)); tx(g, '实验里第一次抓到', 74, 35, 1.9, FG, 'center', 700, SANS, tl * A_(lt, L[4] + 1.4, 0.4));
      chip(g, 50, 21, '早了二十多年', GOLD, A_(lt, L[4] + 1.6, 0.5), 'rgba(48,38,12,0.95)');
      mxOld(g, 14, 44, 12, tl, { name: '麦克斯韦' }, lt); hertz(g, 87, 44, 12, tl * A_(lt, L[4] + 1.4, 0.4), {}, lt);
    }
  };

  // ---------- m1: born the year of induction; a country boy who asks how things go ----------
  DRAW.m1 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8), out1 = 1 - A_(lt, L[2] - 0.3, 0.6);
    if (out1 > 0.01) {
      tx(g, '1831', 50, 16, 7.5, GOLD, 'center', 900, SANS, A_(lt, L[0], 0.8) * out1);
      chip(g, 50, 23.5, '詹姆斯 · 克拉克 · 麦克斯韦', FG, A_(lt, L[0] + 0.8, 0.7) * out1);
      // Edinburgh: a castle on its rock
      g.save(); g.globalAlpha *= A * out1 * 0.9; g.fillStyle = '#2a2f3d';
      g.beginPath(); g.moveTo(6, 44); g.quadraticCurveTo(14, 33, 24, 34); g.lineTo(26, 31); g.lineTo(28, 31); g.lineTo(28, 29); g.lineTo(30, 29); g.lineTo(30, 31); g.lineTo(34, 31); g.lineTo(34, 28); g.lineTo(36, 28); g.lineTo(36, 31); g.quadraticCurveTo(42, 33, 46, 44); g.closePath(); g.fill(); g.restore();
      tx(g, '爱丁堡', 26, 46.5, 1.8, DIM, 'center', 700, SANS, A * out1);
      // the same year in London
      var fa = A_(lt, L[1], 0.6) * out1;
      if (fa > 0.01) {
        rbox(g, 60, 27, 32, 18, 0.8, 'rgba(242,198,107,0.45)', 0.18, 'rgba(20,24,34,0.85)', fa);
        tx(g, '同一年 · 伦敦', 76, 25.6, 1.8, GOLD, 'center', 800, SANS, fa);
        var d = 0.9 * pulse(lt, L[1] + 1.0, 0.5);
        coil(g, 76, 35, 8, 4.4, 7, fa, d, 'back'); barMag(g, mix(88, 79, eio(pr(lt, L[1] + 0.4, 0.6))), 35, 7, 2.2, Math.PI, fa); coil(g, 76, 35, 8, 4.4, 7, fa, d, 'front');
        galv(g, 65, 35, 3, d, fa, false);
        faraday(g, 88.5, 44, 9, fa, { name: '法拉第' }, lt);
        chip(g, 76, 47.8, '电磁感应', GOLD, A_(lt, L[1] + 1.1, 0.5) * out1, 'rgba(48,38,12,0.95)');
      }
    }
    // Glenlair: hills, a house, and a boy asking about everything
    var gl = A_(lt, L[2] - 0.1, 0.8);
    if (gl > 0.01) {
      g.save(); g.globalAlpha *= gl;
      var hg = g.createLinearGradient(0, 34, 0, 47); hg.addColorStop(0, '#1f3a2c'); hg.addColorStop(1, '#0f1a14'); g.fillStyle = hg;
      g.beginPath(); g.moveTo(0, 47); g.lineTo(0, 38); g.quadraticCurveTo(25, 30, 50, 37); g.quadraticCurveTo(75, 43, 100, 35); g.lineTo(100, 47); g.closePath(); g.fill(); g.restore();
      // the house
      rbox(g, 14, 25, 18, 11, 0.2, null, 0, 'rgba(110,100,120,0.95)', gl);
      g.save(); g.globalAlpha *= gl; g.fillStyle = 'rgba(80,70,90,0.95)'; g.beginPath(); g.moveTo(12.5, 25.2); g.lineTo(23, 19); g.lineTo(33.5, 25.2); g.closePath(); g.fill(); g.restore();
      for (i = 0; i < 3; i++) rbox(g, 16 + i * 5.5, 28, 2.4, 2.6, 0.2, null, 0, 'rgba(255,210,140,0.75)', gl);
      chip(g, 23, 14.5, '格伦莱尔', GOLD, gl, 'rgba(48,38,12,0.95)');
      // things to ask about: a bell on its wire, a clock, a beetle
      var obj = [[50, 23], [66, 27], [80, 39]];
      ln(g, 46, 18, 58, 18, '#9aa7ba', 0.15, [0.5, 0.4], gl); ring(g, 50, 21.2, 1.4, GOLD, 0.35, gl); ln(g, 50, 18, 50, 19.8, '#9aa7ba', 0.15, null, gl);
      ring(g, 66, 27, 2.6, FG, 0.25, gl); ln(g, 66, 27, 66 + Math.cos(lt * 1.2) * 1.8, 27 + Math.sin(lt * 1.2) * 1.8, FG, 0.2, null, gl); ln(g, 66, 27, 66, 25.4, FG, 0.25, null, gl);
      dot(g, 80 + Math.sin(lt * 0.7) * 2, 39.5, 0.7, '#3a2a1a', gl); dot(g, 80.7 + Math.sin(lt * 0.7) * 2, 39.5, 0.45, '#5a4a2a', gl);
      var kx = 40 + 34 * eio(pr(lt, L[3], 2.2)), q = clamp((lt - L[3]) / 2.2);
      mxYoung(g, kx, 43, 8.5, gl * A_(lt, L[2] + 0.4, 0.5), { walk: q > 0 && q < 1 ? lt * 8 : null, name: '小麦克斯韦' }, lt);
      for (i = 0; i < 3; i++) { var qa = A_(lt, L[3] + i * 0.7, 0.3) * gl; tx(g, '？', obj[i][0] + 2.5, obj[i][1] - 4, 3, GOLD, 'center', 900, SANS, qa * (0.7 + 0.3 * Math.sin(lt * 5 + i))); }
      var qq = A_(lt, L[4], 0.6);
      tx(g, '“这东西，到底是怎么动的？”', 62, 13, 2.8, GOLD, 'center', 900, SANS, qq);
    }
  };

  // ---------- m2: a mother lost, a school, a nickname, a mathematician ----------
  DRAW.m2 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8);
    var s1 = A * (1 - A_(lt, L[1] - 0.2, 0.6));
    if (s1 > 0.01) {
      rbox(g, 60, 12, 14, 18, 0.4, 'rgba(200,210,230,0.4)', 0.25, 'rgba(14,20,34,0.9)', s1); ln(g, 67, 12, 67, 30, 'rgba(200,210,230,0.4)', 0.2, null, s1); ln(g, 60, 21, 74, 21, 'rgba(200,210,230,0.4)', 0.2, null, s1);
      dot(g, 70.5, 15.5, 1.3, '#e8ecf4', s1); glow(g, 70.5, 15.5, 4, 'rgba(220,230,255,0.9)', 0.4 * s1);
      var go = A_(lt, L[0] + 0.8, 1.2);
      katherine(g, 40, 42, 15, s1 * (1 - 0.85 * go), { name: '母亲', col: '#d8d0e8' }, lt);
      if (go > 0.01) { glow(g, 40, mix(30, 12, go), 3, 'rgba(255,240,210,0.9)', 0.7 * s1 * go); dot(g, 40, mix(30, 12, go), 0.6, '#fff4dc', s1 * go); }
      mxYoung(g, 50, 42, 8.5, s1, { name: '' }, lt);
      chip(g, 30, 11, '1839 · 他 8 岁', DIM, A_(lt, L[0], 0.6) * s1);
    }
    var s2 = A_(lt, L[1], 0.7) * (1 - A_(lt, L[4] - 0.2, 0.6));
    if (s2 > 0.01) {
      g.save(); g.globalAlpha *= s2; g.fillStyle = 'rgba(70,66,84,0.95)'; g.beginPath(); g.moveTo(10, 20); g.lineTo(28, 13); g.lineTo(46, 20); g.closePath(); g.fill(); g.restore();
      rbox(g, 11, 20, 34, 1.4, 0, null, 0, 'rgba(96,90,110,0.95)', s2);
      for (i = 0; i < 6; i++) rbox(g, 12.5 + i * 5.8, 21.4, 1.8, 18, 0.2, null, 0, 'rgba(126,120,140,0.95)', s2);
      rbox(g, 10, 39.4, 36, 1.4, 0, null, 0, 'rgba(96,90,110,0.95)', s2);
      tx(g, '爱丁堡公学', 28, 44, 1.9, DIM, 'center', 700, SANS, s2);
      mxYoung(g, 56, 42, 10, s2, { col: '#d6b98c', name: '麦克斯韦', nameCol: MX_NAME }, lt);
      var cl = A_(lt, L[2], 0.6);
      chip(g, 56, 12, '乡下的衣服 · 苏格兰口音', DIM, cl * s2);
      var mk = A_(lt, L[3] - 0.4, 0.6);
      for (i = 0; i < 3; i++) extra(g, 70 + i * 7, 42, 10, s2 * mk, { pose: i === 1 ? 'forward' : 'down', flip: true }, lt);
      if (mk > 0.01) {
        rbox(g, 70, 20.5, 14, 6, 1.2, 'rgba(255,107,107,0.6)', 0.2, 'rgba(50,20,20,0.92)', s2 * A_(lt, L[3], 0.4));
        tx(g, '“傻子！”', 77, 24.2, 2.3, RED, 'center', 900, SANS, s2 * A_(lt, L[3], 0.4));
      }
    }
    var s3 = A_(lt, L[4] - 0.1, 0.7);
    if (s3 > 0.01) {
      rbox(g, 46, 12, 40, 24, 0.6, '#8a6a46', 0.6, 'rgba(30,40,38,0.95)', s3);
      g.save(); g.globalAlpha *= s3; g.strokeStyle = 'rgba(235,240,230,0.85)'; g.lineWidth = 0.25;
      var f = clamp((lt - L[4]) / 1.6);
      g.beginPath(); g.moveTo(52, 31); g.lineTo(52 + 14 * Math.min(1, f * 3), 31); g.stroke();
      if (f > 0.33) { g.beginPath(); g.moveTo(66, 31); g.lineTo(mix(66, 58, Math.min(1, (f - 0.33) * 3)), mix(31, 17, Math.min(1, (f - 0.33) * 3))); g.stroke(); }
      if (f > 0.66) { g.beginPath(); g.arc(59, 25.5, 5.4, 0, TAU * Math.min(1, (f - 0.66) * 3)); g.stroke(); }
      g.restore();
      tx(g, 'a² + b² = c²', 77, 22, 2.2, 'rgba(235,240,230,0.85)', 'center', 700, SANS, s3 * A_(lt, L[4] + 0.8, 0.5));
      mxYoung(g, 30, 42, 11, s3, { pose: 'forward', name: '麦克斯韦' }, lt);
      chip(g, 66, 40.5, '数学最好的学生之一', GOLD, A_(lt, L[4] + 0.6, 0.6), 'rgba(48,38,12,0.95)');
    }
  };

  // ---------- m3: two pins and a loop of string ----------
  var OV1 = [42, 28], OV2 = [58, 28];
  function ovalPt(t, k, C) {   // point on r1 + k*r2 = C, at angle t seen from pin 1
    var lo = 0, hi = 40, c = Math.cos(t), s = Math.sin(t);
    for (var n = 0; n < 40; n++) { var r = (lo + hi) / 2, x = OV1[0] + r * c, y = OV1[1] + r * s * 0.82, r2 = Math.hypot(x - OV2[0], (y - OV2[1]) / 0.82); if (r + k * r2 > C) hi = r; else lo = r; }
    var rr = (lo + hi) / 2; return [OV1[0] + rr * c, OV1[1] + rr * s * 0.82];
  }
  DRAW.m3 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8), bo = A * (1 - A_(lt, L[4] - 0.3, 0.6));
    if (bo > 0.01) {
      rbox(g, 22, 10, 56, 35, 0.6, null, 0, 'rgba(236,226,204,0.93)', bo);
      var curves = [[1, 26, L[1] + 0.2, L[2] - 0.2, '#3a5a7a'], [2, 36, L[2] + 0.2, L[3] - 0.2, '#b0502a']];
      var extraC = [[2, 31, '#7a3a7a'], [3, 44, '#2a7a5a'], [1, 21, '#5a5a2a']];
      var ea = A_(lt, L[3], 0.8) * bo;
      for (i = 0; i < 3; i++) {
        g.save(); g.globalAlpha *= ea; g.strokeStyle = extraC[i][2]; g.lineWidth = 0.3; g.beginPath();
        for (var n = 0; n <= 90; n++) { var p = ovalPt(n / 90 * TAU, extraC[i][0], extraC[i][1]); if (n === 0) g.moveTo(p[0], p[1]); else g.lineTo(p[0], p[1]); } g.stroke(); g.restore();
      }
      curves.forEach(function (cv, ci) {
        var f = clamp((lt - cv[2]) / (cv[3] - cv[2])), keep = ci === 0 ? 1 : 1;
        if (f <= 0) return;
        g.save(); g.globalAlpha *= bo * keep; g.strokeStyle = cv[4]; g.lineWidth = 0.4; g.beginPath();
        var N = Math.max(1, Math.floor(f * 120));
        for (var n = 0; n <= N; n++) { var p = ovalPt(n / 120 * TAU, cv[0], cv[1]); if (n === 0) g.moveTo(p[0], p[1]); else g.lineTo(p[0], p[1]); } g.stroke(); g.restore();
        if (f < 1 && (ci === 0 ? lt < L[2] : lt < L[3])) {   // the string, pulled taut by the pencil
          var P = ovalPt(f * TAU, cv[0], cv[1]);
          ln(g, OV1[0], OV1[1], P[0], P[1], '#8a5a2a', 0.18, null, bo);
          for (var s = 0; s < cv[0]; s++) ln(g, P[0], P[1] + s * 0.3, OV2[0], OV2[1] + s * 0.3, '#8a5a2a', 0.18, null, bo);
          if (cv[0] === 1) ln(g, OV1[0], OV1[1], OV2[0], OV2[1], '#8a5a2a', 0.18, null, bo);
          ln(g, P[0], P[1], P[0] + 1.2, P[1] - 3.4, '#c9a35a', 0.6, null, bo); dot(g, P[0], P[1], 0.35, '#3a2a1a', bo);
        }
      });
      for (i = 0; i < 2; i++) { var pp = i ? OV2 : OV1; dot(g, pp[0], pp[1], 0.75, '#5b6474', bo * A_(lt, L[1], 0.4)); }
      tx(g, '线绕一圈：椭圆', 34, 42.5, 1.9, '#3a5a7a', 'center', 800, SANS, bo * A_(lt, L[1] + 0.3, 0.5));
      tx(g, '多绕几圈：卵形', 66, 42.5, 1.9, '#b0502a', 'center', 800, SANS, bo * A_(lt, L[2] + 0.3, 0.5));
    }
    var hl = A_(lt, L[4] - 0.1, 0.7);
    if (hl > 0.01) {
      chip(g, 50, 9, '爱丁堡皇家学会 · 1846', GOLD, hl, 'rgba(48,38,12,0.95)');
      rbox(g, 44, 31, 12, 9, 0.4, 'rgba(200,170,120,0.6)', 0.2, '#5a3a24', hl);
      extra(g, 50, 31.2, 14, hl, { pose: 'book', prop: 'book', name: '教授', col: '#a8b0c0' }, lt);
      for (var r = 0; r < 2; r++) for (i = 0; i < 9; i++) { var xx = 18 + i * 8 + (r % 2) * 4; if (Math.abs(xx - 50) < 8) continue; dot(g, xx, 42 + r * 2.6, 1.0, 'rgba(200,190,175,0.5)', hl); }
      mxYoung(g, 30, 44, 8, hl, { name: '麦克斯韦' }, lt); glow(g, 30, 40, 5, 'rgba(242,198,107,0.9)', 0.3 * hl);
      chip(g, 30, 30.5, '作者：14 岁', GOLD, A_(lt, L[5], 0.6), 'rgba(48,38,12,0.95)');
      // the oval paper he wrote
      rbox(g, 62, 14, 14, 10, 0.4, null, 0, 'rgba(236,226,204,0.9)', hl * A_(lt, L[4] + 0.4, 0.5));
      g.save(); g.globalAlpha *= hl * A_(lt, L[4] + 0.4, 0.5); g.strokeStyle = '#b0502a'; g.lineWidth = 0.25; g.beginPath(); g.ellipse(69, 19, 4.5, 3, 0.1, 0, TAU); g.stroke(); g.restore();
    }
  };

  // ---------- m4: Cambridge, and a top that mixes colours ----------
  DRAW.m4 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8), s1 = A * (1 - A_(lt, L[2] - 0.3, 0.6));
    if (s1 > 0.01) {
      g.save(); g.globalAlpha *= s1 * 0.9; g.fillStyle = '#2a2f3d'; g.fillRect(14, 30, 40, 14);
      for (i = 0; i < 4; i++) { var px = i < 2 ? 14 + i * 3 : 48 + (i - 2) * 3; g.fillRect(px, 22, 2.4, 8); g.beginPath(); g.moveTo(px - 0.3, 22); g.lineTo(px + 1.2, 18.5); g.lineTo(px + 2.7, 22); g.closePath(); g.fill(); }
      g.beginPath(); g.moveTo(14, 30); g.lineTo(34, 25); g.lineTo(54, 30); g.closePath(); g.fill();
      g.fillStyle = 'rgba(255,210,140,0.5)'; for (i = 0; i < 9; i++) { g.fillRect(17 + i * 4, 33, 1.6, 6); } g.restore();
      chip(g, 34, 12.5, '1850 · 剑桥', GOLD, A_(lt, L[0], 0.6) * s1, 'rgba(48,38,12,0.95)');
      var lb = A_(lt, L[1], 0.6) * s1;
      rbox(g, 60, 14, 28, 22, 0.6, 'rgba(238,242,248,0.4)', 0.2, 'rgba(20,24,34,0.88)', lb);
      tx(g, '1854 · 数学荣誉考试', 74, 17.6, 1.7, DIM, 'center', 700, SANS, lb);
      tx(g, '第一名 ……', 74, 23, 2.1, FG, 'center', 700, SANS, lb);
      tx(g, '第二名  麦克斯韦', 74, 28.5, 2.3, GOLD, 'center', 900, SANS, lb * A_(lt, L[1] + 0.5, 0.5));
      mxYoung(g, 74, 46, 9, lb, { name: '' }, lt);
    }
    var s2 = A_(lt, L[2] - 0.1, 0.6) * (1 - A_(lt, L[3] - 0.2, 0.5));
    if (s2 > 0.01) {
      g.save(); g.globalAlpha *= s2; g.fillStyle = '#e8ecf4'; g.beginPath(); g.moveTo(36, 26); g.quadraticCurveTo(50, 15, 64, 26); g.quadraticCurveTo(50, 37, 36, 26); g.fill();
      g.fillStyle = '#4a7ab0'; g.beginPath(); g.arc(50, 26, 5, 0, TAU); g.fill(); g.fillStyle = '#0b0f18'; g.beginPath(); g.arc(50, 26, 2.2, 0, TAU); g.fill(); g.restore();
      [[NRED, -5], [GRN, 0], [SBLU, 5]].forEach(function (c, k) { var t = clamp((lt - L[2] - k * 0.2) / 0.8); ln(g, 8, 26 + c[1] * 2, mix(8, 46, t), mix(26 + c[1] * 2, 26 + c[1] * 0.3, t), c[0], 0.5, null, s2); });
      tx(g, '？', 70, 17, 4.4, GOLD, 'center', 900, SANS, s2 * A_(lt, L[2] + 0.6, 0.4));
    }
    // the colour top
    var tp = A_(lt, L[3] - 0.1, 0.7);
    if (tp > 0.01) {
      var cx = 44, cy = 27, rx = 13, ry = 4.6, spin = A_(lt, L[5], 1.2), th = (lt - L[3]) * 0.4 + Math.max(0, lt - L[5]) * 18 * spin;
      var P = [0.45, 0.45, 0.10], COLS = [[255, 70, 70], [70, 220, 110], [80, 120, 255]];
      ln(g, cx, cy - 9, cx, cy, '#cfd6e2', 0.6, null, tp);
      g.save(); g.globalAlpha *= tp; g.fillStyle = '#3a3f4c'; g.beginPath(); g.ellipse(cx, cy + 0.9, rx, ry, 0, 0, Math.PI); g.lineTo(cx - rx, cy); g.ellipse(cx, cy, rx, ry, 0, Math.PI, 0, true); g.fill(); g.restore();
      var a0 = th;
      for (i = 0; i < 3; i++) {
        var a1 = a0 + P[i] * TAU;
        g.save(); g.globalAlpha *= tp * (1 - spin * 0.92); g.fillStyle = rgb(COLS[i]); g.beginPath(); g.moveTo(cx, cy);
        for (var n = 0; n <= 20; n++) { var t = mix(a0, a1, n / 20); g.lineTo(cx + Math.cos(t) * rx, cy + Math.sin(t) * ry); } g.closePath(); g.fill(); g.restore();
        a0 = a1;
      }
      var mc = [0, 0, 0]; for (i = 0; i < 3; i++) for (var j = 0; j < 3; j++) mc[j] += COLS[i][j] * P[i];
      var br = 255 / Math.max(mc[0], mc[1], mc[2]); mc = mc.map(function (v) { return v * mix(1, br * 0.92, 0.6); });
      g.save(); g.globalAlpha *= tp * spin; g.fillStyle = rgb(mc); g.beginPath(); g.ellipse(cx, cy, rx, ry, 0, 0, TAU); g.fill(); g.restore();
      dot(g, cx, cy, 0.6, '#e3e8f0', tp); ln(g, cx, cy + 0.9, cx, cy + 6, '#cfd6e2', 0.5, null, tp);
      var lb2 = A_(lt, L[4], 0.6) * (1 - spin);
      chip(g, 72, 18, '红 45%', NRED, lb2); chip(g, 72, 24, '绿 45%', GRN, lb2); chip(g, 72, 30, '蓝 10%', SBLU, lb2);
      if (spin > 0.05) { rbox(g, 66, 20, 12, 8, 1, 'rgba(255,255,255,0.4)', 0.2, rgb(mc), spin); tx(g, '混出黄色', 72, 32, 2.0, FG, 'center', 800, SANS, spin); }
      tx(g, '彩色陀螺', cx, 41, 1.9, DIM, 'center', 700, SANS, tp);
    }
  };

  // ---------- m5: the first colour photograph ----------
  function tartan(g, x, y, w, h, a, mono) {
    if (a <= 0.003) return;
    g.save(); g.globalAlpha *= a; g.beginPath(); g.rect(x, y, w, h); g.clip();
    var base = mono === 'r' ? [120, 40, 40] : mono === 'g' ? [40, 110, 50] : mono === 'b' ? [40, 50, 120] : [30, 80, 50];
    g.fillStyle = rgb(base); g.fillRect(x, y, w, h);
    var st = [[200, 40, 40], [240, 200, 60], [40, 60, 160]];
    for (var i = 0; i < 12; i++) {
      var c = st[i % 3];
      if (mono) { var lum = mono === 'r' ? c[0] : mono === 'g' ? c[1] : c[2]; c = mono === 'r' ? [lum, lum * 0.25, lum * 0.25] : mono === 'g' ? [lum * 0.25, lum, lum * 0.25] : [lum * 0.25, lum * 0.25, lum]; }
      g.fillStyle = rgb(c, 0.55); g.fillRect(x + i * w / 12, y, w / 30, h); g.fillRect(x, y + i * h / 12, w, h / 30);
    }
    g.restore();
  }
  function ribbonBow(g, cx, cy, s, a, mono) {
    if (a <= 0.003) return;
    g.save(); g.beginPath();
    g.ellipse(cx - 4.5 * s, cy - 0.5 * s, 4.5 * s, 2.8 * s, -0.25, 0, TAU); g.ellipse(cx + 4.5 * s, cy - 0.5 * s, 4.5 * s, 2.8 * s, 0.25, 0, TAU);
    g.moveTo(cx - 1 * s, cy); g.lineTo(cx - 4 * s, cy + 7 * s); g.lineTo(cx - 2 * s, cy + 7.5 * s); g.lineTo(cx, cy + 1 * s); g.lineTo(cx + 2 * s, cy + 7.5 * s); g.lineTo(cx + 4 * s, cy + 7 * s); g.lineTo(cx + 1 * s, cy);
    g.clip(); tartan(g, cx - 10 * s, cy - 4 * s, 20 * s, 12 * s, a, mono); g.restore();
    g.save(); g.globalAlpha *= a; g.fillStyle = mono ? 'rgba(0,0,0,0.3)' : '#5a2020'; g.beginPath(); g.ellipse(cx, cy - 0.3 * s, 1.4 * s, 1.6 * s, 0, 0, TAU); g.fill(); g.restore();
  }
  DRAW.m5 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8);
    var s1 = A * (1 - A_(lt, L[2] - 0.2, 0.5));
    if (s1 > 0.01) {
      chip(g, 50, 9, '1861 · 伦敦', GOLD, A_(lt, L[0], 0.6) * s1, 'rgba(48,38,12,0.95)');
      ln(g, 46, 30, 42, 42, '#6b5a44', 0.4, null, s1); ln(g, 46, 30, 50, 42, '#6b5a44', 0.4, null, s1); ln(g, 46, 30, 46, 42, '#6b5a44', 0.4, null, s1);
      rbox(g, 41, 22, 10, 8, 0.4, null, 0, '#4a3a2a', s1); rbox(g, 51, 23.5, 3, 5, 0.3, null, 0, '#2a2f3a', s1); ring(g, 54.6, 26, 1.6, '#9aa7ba', 0.3, s1);
      var fl = pulse(lt, L[1] + 1.0, 0.25);
      glow(g, 56, 26, 10, 'rgba(255,255,240,0.95)', 0.8 * fl * s1);
      mxOld(g, 28, 43, 15, s1, {}, lt);
      extra(g, 64, 43, 14, s1 * A_(lt, L[1], 0.5), { pose: 'forward', flip: true, name: '摄影师', nameCol: DIM, col: '#a8b4c4' }, lt);
    }
    var rb = A_(lt, L[2] - 0.1, 0.6) * (1 - A_(lt, L[3] - 0.2, 0.5));
    ribbonBow(g, 50, 24, 1.5, rb);
    tx(g, '格子呢缎带', 50, 41, 2.0, DIM, 'center', 700, SANS, rb);
    // three exposures
    var ex = A_(lt, L[3] - 0.1, 0.5) * (1 - A_(lt, L[4] - 0.2, 0.5));
    if (ex > 0.01) {
      var M = ['r', 'g', 'b'], N = ['红滤镜', '绿滤镜', '蓝滤镜'], C = [NRED, GRN, SBLU];
      for (i = 0; i < 3; i++) {
        var e = ex * A_(lt, L[3] + i * 0.45, 0.3), x = 24 + i * 26;
        rbox(g, x - 10, 15, 20, 18, 0.6, C[i], 0.3, '#0e1118', e);
        ribbonBow(g, x, 22, 0.85, e, M[i]);
        tx(g, N[i], x, 37, 2.0, C[i], 'center', 800, SANS, e);
        glow(g, x, 24, 8, 'rgba(255,255,255,0.9)', 0.6 * pulse(lt, L[3] + i * 0.45, 0.15) * ex);
      }
    }
    // three projectors meet on a screen
    var pj = A_(lt, L[4] - 0.1, 0.6) * (1 - A_(lt, L[5] - 0.2, 0.5));
    if (pj > 0.01) {
      rbox(g, 35, 9, 30, 20, 0.3, 'rgba(238,242,248,0.4)', 0.2, '#0c0f16', pj);
      var cs = ['rgba(255,80,80,0.22)', 'rgba(80,230,120,0.22)', 'rgba(90,130,255,0.22)'];
      for (i = 0; i < 3; i++) {
        var px = 28 + i * 22, py = 42;
        g.save(); g.globalAlpha *= pj; g.globalCompositeOperation = 'lighter'; g.fillStyle = cs[i]; g.beginPath(); g.moveTo(px - 0.8, py); g.lineTo(37, 11); g.lineTo(63, 11); g.lineTo(px + 0.8, py); g.closePath(); g.fill(); g.restore();
        rbox(g, px - 2.4, py - 1, 4.8, 3, 0.3, null, 0, '#3a3f4c', pj);
      }
      var cm = A_(lt, L[4] + 0.6, 0.8);
      ribbonBow(g, 50, 17, 0.95, pj * cm);
      tx(g, '颜色回来了', 50, 32, 2.2, GOLD, 'center', 900, SANS, pj * cm);
    }
    // every pixel on a screen is red, green and blue
    var px2 = A_(lt, L[5] - 0.1, 0.6);
    if (px2 > 0.01) {
      phone(g, 24, 27, 1.4, px2, lt);
      ln(g, 27, 22, 44, 14, 'rgba(238,242,248,0.4)', 0.15, null, px2); ln(g, 27, 32, 44, 40, 'rgba(238,242,248,0.4)', 0.15, null, px2);
      g.save(); g.globalAlpha *= px2; g.beginPath(); g.arc(60, 27, 14, 0, TAU); g.clip(); g.fillStyle = '#05070b'; g.fillRect(44, 11, 32, 32);
      for (var yy = 0; yy < 7; yy++) for (var xx = 0; xx < 7; xx++) {
        var bx = 46 + xx * 4.2, by = 13.5 + yy * 4.2, k = 0.5 + 0.5 * Math.sin(xx * 0.9 + yy * 0.6 + lt * 1.5);
        g.fillStyle = 'rgba(255,60,60,' + (0.3 + 0.7 * k) + ')'; g.fillRect(bx, by, 1.1, 3.4);
        g.fillStyle = 'rgba(60,230,100,' + (0.3 + 0.7 * (1 - k)) + ')'; g.fillRect(bx + 1.3, by, 1.1, 3.4);
        g.fillStyle = 'rgba(70,110,255,' + (0.4 + 0.5 * Math.sin(xx + lt) * 0.5 + 0.25) + ')'; g.fillRect(bx + 2.6, by, 1.1, 3.4);
      }
      g.restore(); ring(g, 60, 27, 14, 'rgba(238,242,248,0.6)', 0.35, px2);
      tx(g, '每个像素 = 红 + 绿 + 蓝', 60, 45, 2.0, FG, 'center', 800, SANS, px2);
    }
  };

  // ---------- m6: why Saturn's rings hold together ----------
  var SAT_P = (function () { var r = rng(61), P = [], i; for (i = 0; i < 420; i++) P.push([0.55 + 0.45 * r(), r() * TAU, 0.4 + 0.6 * r()]); return P; })();
  DRAW.m6 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8), cx = 50, cy = 27, R = 6.5, RX = 21, RY = 5.2;
    chip(g, 50, 8.5, '剑桥的悬赏题 · 亚当斯奖', GOLD, A_(lt, L[0], 0.6) * (1 - A_(lt, L[2] - 0.2, 0.5)), 'rgba(48,38,12,0.95)');
    var solid = A * (1 - A_(lt, L[3] - 0.2, 0.4)), liquid = A_(lt, L[3] - 0.2, 0.4) * (1 - A_(lt, L[4] - 0.2, 0.4)), part = A_(lt, L[4] - 0.2, 0.5);
    var drift = lt > L[2] ? 7.5 * eio(pr(lt, L[2] + 0.8, 2.2)) : 0, hit = lt > L[2] + 3.0 ? pulse(lt, L[2] + 3.0, 0.4) : 0;
    function band(half, alpha, dx, wob) {   // half: -1 back (top), +1 front (bottom)
      if (alpha <= 0.01) return;
      for (var k = 0; k < 8; k++) {
        var f = 0.55 + 0.45 * k / 7;
        g.save(); g.globalAlpha *= alpha * (0.55 + 0.3 * Math.sin(k * 1.7)); g.strokeStyle = k % 3 ? '#cdb489' : '#a68c64'; g.lineWidth = 0.55;
        g.beginPath(); var first = true;
        for (var n = 0; n <= 60; n++) {
          var t = (half < 0 ? Math.PI : 0) + n / 60 * Math.PI, ww = wob ? 1 + wob * Math.sin(t * 9 + k) : 1;
          if (wob && Math.sin(t * 9 + k * 0.3) < -0.2 + 1.2 * (1 - wob * 3)) { first = true; continue; }
          var x = cx + dx + Math.cos(t) * RX * f * ww, y = cy + Math.sin(t) * RY * f * ww;
          if (first) { g.moveTo(x, y); first = false; } else g.lineTo(x, y);
        }
        g.stroke(); g.restore();
      }
    }
    var wob = liquid > 0.01 ? 0.33 * eio(pr(lt, L[3] + 0.3, 1.8)) : 0;
    var blob = clamp((wob - 0.12) / 0.15), lq = liquid * (1 - blob);
    function blobs(front) {
      if (liquid * blob <= 0.01) return;
      for (var k = 0; k < 16; k++) { var t = k / 16 * TAU + 0.2 + (lt - L[3]) * 0.25, sn = Math.sin(t); if ((sn > 0) !== front) continue;
        g.save(); g.globalAlpha *= liquid * blob; g.fillStyle = 'rgba(205,180,137,0.85)'; g.beginPath(); g.ellipse(cx + Math.cos(t) * RX * 0.78, cy + sn * RY * 0.78, 1.8 + 0.6 * Math.sin(k * 2.1), 1.0, 0, 0, TAU); g.fill(); g.restore(); }
    }
    band(-1, solid, -drift, 0); band(-1, lq, 0, wob); blobs(false);
    // particles: behind the planet first
    function parts(front) {
      if (part <= 0.01) return;
      for (var k = 0; k < SAT_P.length; k++) {
        var p = SAT_P[k], w = 0.9 * Math.pow(p[0], -1.5), t = p[1] + (lt - L[4]) * w * 0.6, s = Math.sin(t);
        if ((s > 0) !== front) continue;
        dot(g, cx + Math.cos(t) * RX * p[0], cy + s * RY * p[0], 0.22 + 0.12 * p[2], 'rgba(220,200,160,' + (0.45 + 0.5 * p[2]) + ')', part);
      }
    }
    parts(false);
    saturnBall(g, cx, cy, R, A);
    if (hit > 0.01) glow(g, cx - R, cy, 6, 'rgba(255,200,140,0.95)', hit * solid);
    band(1, solid, -drift, 0); band(1, lq, 0, wob); blobs(true);
    parts(true);
    tx(g, '？', 76, 15, 4, GOLD, 'center', 900, SANS, A_(lt, L[1], 0.5) * (1 - A_(lt, L[2], 0.4)));
    // the verdicts
    chip(g, 50, 43, '一整块实心的环：失去平衡，撞上土星', RED, A_(lt, L[2] + 0.3, 0.5) * (1 - A_(lt, L[3] - 0.2, 0.4)), 'rgba(50,20,20,0.95)');
    chip(g, 50, 43, '液体的环：碎成一团一团', RED, A_(lt, L[3] + 0.3, 0.5) * (1 - A_(lt, L[4] - 0.2, 0.4)), 'rgba(50,20,20,0.95)');
    chip(g, 50, 43, '无数小颗粒，各自绕着土星转', GOLD, A_(lt, L[4] + 0.2, 0.5) * (1 - A_(lt, L[6] - 0.2, 0.4)), 'rgba(48,38,12,0.95)');
    var sp = A_(lt, L[5], 0.6) * (1 - A_(lt, L[6] - 0.2, 0.4));
    if (sp > 0.01) { arcl(g, cx, cy, 13, 0.3, 0.9, GOLD, 0.3, sp); tx(g, '内圈快', 63, 34.5, 1.8, GOLD, 'left', 800, SANS, sp); tx(g, '外圈慢', 74, 30, 1.8, DIM, 'left', 800, SANS, sp); }
    var pr6 = A_(lt, L[6], 0.6);
    if (pr6 > 0.01) {
      var px = mix(6, 88, pr(lt, L[6], 3.6)), py = 12 + Math.sin(pr(lt, L[6], 3.6) * Math.PI) * -2;
      g.save(); g.globalAlpha *= pr6; g.translate(px, py); g.fillStyle = '#d7dde8'; g.beginPath(); g.ellipse(0, 0, 2.2, 0.9, -0.2, 0, TAU); g.fill(); g.fillRect(-0.4, 0, 0.8, 2.4); g.strokeStyle = '#d7dde8'; g.lineWidth = 0.2; g.beginPath(); g.moveTo(0, 0.6); g.lineTo(4.5, 2.4); g.stroke(); g.restore();
      chip(g, 50, 43, '后来的观测：确实是无数颗冰块和石块', GOLD, pr6, 'rgba(48,38,12,0.95)');
    }
  };
