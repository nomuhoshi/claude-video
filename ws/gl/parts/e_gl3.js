  // ================= Galileo: scenes g11 .. g15 (the warning, the Dialogue, his mistakes, the trial, the famous line) =================
  var HALLFG = 'rgba(240,200,120,0.55)';
  function crossBar(g, x, y, s, col, a) { xMark(g, x, y, s, col, a, s * 0.32); }
  function noChip(g, x, y, s, a, delay) {           // a red chip with a small cross on its left
    chip(g, x, y, s, '#ff7a6e', a, 'rgba(56,22,18,0.92)');
    var w = 3.4; for (var i = 0; i < s.length; i++) w += s.charCodeAt(i) >= 0x2e80 ? 1.95 : 1.15;
    crossBar(g, x - w / 2 - 1.7, y, 0.9, '#ef5b43', a);
  }
  function scrollBox(g, x, y, w, h, a, col) { rbox(g, x, y, w, h, 0.4, 'rgba(120,100,70,0.55)', 0.12, col || 'rgba(214,202,176,0.9)', a); }

  // ---------- g11: the Bible lines, the 1616 ruling, Bellarmine's warning, Copernicus's book ----------
  DRAW.g11 = function (g, lt, L) {
    var hl = W_(lt, 0.2, L[4] - 0.2, 0.8, 0.5);
    if (hl > 0.01) {
      var cx = 30, cy = 38;
      sunB(g, cx, cy, 2.0, hl, lt); ring(g, cx, cy, 8.4, 'rgba(200,215,240,0.4)', 0.14, hl);
      earthB(g, cx + Math.cos(lt * 0.9) * 8.4, cy + Math.sin(lt * 0.9) * 8.4, 1.5, hl, lt);
      chip(g, cx, 49.6, '哥白尼：地球绕着太阳', '#8fd0ff', hl * A_(lt, L[0] + 0.3, 0.5), 'rgba(20,34,56,0.92)');
      var ok = A_(lt, L[0] + 1.0, 0.4) * (1 - A_(lt, L[2] - 0.2, 0.3)); if (ok > 0.01) { g.save(); g.globalAlpha *= ok; g.strokeStyle = '#7fe0a0'; g.lineWidth = 0.9; g.lineCap = 'round'; g.beginPath(); g.moveTo(cx + 9, 27.5); g.lineTo(cx + 11.4, 30.4); g.lineTo(cx + 16, 24.6); g.stroke(); g.restore(); }
    }
    // the Bible, open, with the sun "moving" over it
    var bb = W_(lt, L[2], L[4] - 0.2, 0.8, 0.5);
    if (bb > 0.01) {
      var bx = 68, by = 29; bookB(g, bx, by, 13, 17, bb * 0.5, null, '', true);
      g.save(); g.globalAlpha *= bb * 0.5; g.fillStyle = 'rgba(70,56,40,0.9)'; for (var i = 0; i < 8; i++) { g.fillRect(bx - 11.4, by + 2 + i * 1.7, 9.4 - (i % 3), 0.35); g.fillRect(bx + 1.6, by + 2 + i * 1.7, 9.6 - (i % 4), 0.35); } g.restore();
      tx(g, '《圣经》', bx, 25.2, 1.5, GOLD, 'center', 800, SERIF_, bb);
      var sm = A_(lt, L[3], 0.9); if (sm > 0.01) { var sx = 54 + 28 * sm, sy = 37 - 4.2 * Math.sin(sm * 3.14); sunB(g, sx, sy, 1.5, sm * bb, lt); arrow(g, 54, 42.4, 82, 42.4, '#ffd27a', 0.3, sm * bb * 0.8, 0.8); chip(g, 68, 47.6, '“太阳在动？”', '#ffd27a', sm * bb, 'rgba(36,30,12,0.92)'); }
    }
    // the ruling
    var ct = W_(lt, L[4], L[6] - 0.2, 0.8, 0.5);
    if (ct > 0.01) {
      chip(g, 50, 24.6, '罗马 · 神学顾问们', GOLD, ct, 'rgba(48,38,12,0.92)');
      g.save(); g.globalAlpha *= ct; rbox(g, 20, 38.4, 60, 1.6, 0.3, null, 0, '#17100d', 1); g.restore();
      judgesRow(g, [30, 40, 50, 60, 70], 41, 11.5, L[4] + 0.1, lt, ct, [1, 1.04, 1.08, 1.04, 1]);
      var fi = A_(lt, L[5] + 0.7, 0.2); if (fi > 0.01) { var sc = 2.2 - 1.2 * eo(fi); g.save(); g.translate(50, 33); g.scale(sc, sc); stamp2(g, '形式上是异端', 0, 0, 3.0, '#ef5b43', fi, -0.05); g.restore(); }
    }
    // the cardinal's warning
    var bl = W_(lt, L[6], null, 0.8);
    if (bl > 0.01) {
      glow(g, 40, 40, 10, 'rgba(255,214,150,0.9)', 0.22 * bl);
      galileo(g, 26, 49.4, 13.5, bl, { pose: 'forward' }, lt);
      bellarmine(g, 52, 49.4, 14.5, A_(lt, L[6] + 0.2, 0.8), { flip: true }, lt);
      chip(g, 52, 24.4, '红衣主教 · 警告', '#ff9d8a', A_(lt, L[6] + 0.6, 0.5), 'rgba(56,22,18,0.92)');
      var cs2 = ['不许持有', '不许传授', '不许捍卫'];
      for (var k = 0; k < 3; k++) { var aa = A_(lt, L[7] + 0.3 + k * 0.55, 0.4) * (1 - A_(lt, L[8] + 0.2, 0.4)); if (aa > 0.01) noChip(g, 22 + k * 15.5, 29.0, cs2[k], aa); }
      // the book, to be corrected
      var tb = A_(lt, L[8], 0.9);
      if (tb > 0.01) { tome(g, 84, 37, 12, 16, tb, '#5a2c2c', '天体运行论', '', lt); chip(g, 84, 47.6, '哥白尼 · 的书', GOLD, tb, 'rgba(48,38,12,0.92)'); var st = A_(lt, L[8] + 1.1, 0.2); if (st > 0.01) { var s3 = 2.2 - 1.2 * eo(st); g.save(); g.translate(84, 42.2); g.scale(s3, s3); stamp2(g, '待修改', 0, 0, 2.0, '#ef5b43', st, 0.12); g.restore(); } }
    }
  };

  // ---------- g12: the Dialogue, three speakers, a whisper to the pope, the ban ----------
  DRAW.g12 = function (g, lt, L) {
    var sil = W_(lt, 0.2, L[1] + 0.3, 0.8, 0.6);
    if (sil > 0.01) {
      galileo(g, 26, 49.4, 14, sil, { old: true, pose: 'forward' }, lt);
      var pg = A_(lt, 0.6, 5.0) * 1.0; var x0 = 40, x1 = 86; rbox(g, x0, 36, x1 - x0, 1.1, 0.5, 'rgba(200,215,240,0.35)', 0.12, null, sil);
      rbox(g, x0, 36, (x1 - x0) * pg, 1.1, 0.5, null, 0, GOLD, sil); tx(g, '1616', x0, 33, 1.5, DIM, 'center', 600, MONO, sil); tx(g, '1632', x1, 33, 1.5, DIM, 'center', 600, MONO, sil);
      chip(g, 63, 42.8, '沉默', '#93a1b6', sil * A_(lt, 0.8, 0.5), 'rgba(24,30,44,0.92)');
    }
    var pp = W_(lt, L[1], L[3] - 0.2, 0.8, 0.6);
    if (pp > 0.01) { pope(g, 72, 49.4, 14.5, pp, { flip: true }, lt); galileo(g, 36, 49.4, 14, pp, { old: true, pose: 'forward' }, lt); chip(g, 54, 27.4, '老朋友 · 当上了教皇', '#fff2c4', A_(lt, L[1] + 0.5, 0.5), 'rgba(48,44,26,0.92)'); }
    var qw = W_(lt, L[2], L[3] - 0.1, 0.7, 0.5);
    if (qw > 0.01) { paper(g, 56, 36, 14, 10, qw * 0.75, 'rgba(160,150,128,0.9)'); quill(g, 66, 40, 2.4, qw, -0.7); chip(g, 63, 30.6, '再写一本', GOLD, qw, 'rgba(48,38,12,0.92)'); }
    // the book itself
    var bk = W_(lt, L[3], L[4] - 0.1, 0.9, 0.6);
    if (bk > 0.01) { tome(g, 50, 36, 14.5, 19, bk, '#2a3f66', '对话', '', lt); chip(g, 50, 49, '1632 · 佛罗伦萨', FG, bk * A_(lt, L[3] + 0.6, 0.5)); tx(g, '关于两大世界体系的对话', 50, 25.6, 1.5, 'rgba(242,223,176,0.85)', 'center', 700, SERIF_, bk); }
    // three speakers
    var th = W_(lt, L[4], L[7] - 0.1, 0.8, 0.6);
    if (th > 0.01) {
      var xs = [30, 50, 70], nm = ['替哥白尼说话', '旁听的聪明人', '替旧观念说话'], cl = ['#8fd0ff', '#c9d2e4', '#ff9d6e'];
      for (var i = 0; i < 3; i++) {
        var ai = A_(lt, L[4] + 0.2 + i * 0.4, 0.6) * th;
        var act = i === 0 ? A_(lt, L[4], 0.3) * (1 - A_(lt, L[5] - 0.1, 0.4) * 0.6) : i === 2 ? 0.45 + 0.55 * A_(lt, L[5], 0.4) : 0.6;
        glow(g, xs[i], 38, 8, cl[i], 0.16 * ai * act); person(g, xs[i], 45.6, 1.9, ai, i === 1 ? 'rgba(200,208,224,0.8)' : i === 0 ? 'rgba(160,208,255,0.95)' : 'rgba(255,170,130,0.95)');
        chip(g, xs[i], 49.2, nm[i], cl[i], ai * A_(lt, L[4] + 0.5 + i * 0.4, 0.4) * (i === 2 ? A_(lt, L[5], 0.4) : 1), 'rgba(18,26,40,0.92)');
      }
      var sp = A_(lt, L[6], 0.6); if (sp > 0.01) { tx(g, '辛普利西奥', 70, 22.8, 1.8, '#ff9d6e', 'center', 800, SANS, sp); tx(g, '≈ “头脑简单的人”', 70, 25.6, 1.4, DIM, 'center', 600, SANS, sp * A_(lt, L[6] + 0.8, 0.5)); }
    }
    // the whisper
    var ws = W_(lt, L[7], L[8] - 0.1, 0.8, 0.6);
    if (ws > 0.01) {
      pope(g, 78, 49.4, 14.5, ws, { flip: true }, lt); person(g, 56, 46.4, 1.9, ws, 'rgba(255,170,130,0.95)'); person(g, 40, 46.4, 1.9, ws * 0.8, 'rgba(200,208,224,0.8)');
      var a2 = A_(lt, L[7] + 0.5, 0.8); arrow(g, 60, 36, 72, 36, '#ff9d6e', 0.35, a2 * ws, 0.9);
      chip(g, 66, 30.4, '“他在影射你”', '#ff9d6e', a2 * ws, 'rgba(56,30,14,0.92)'); stamp2(g, '据说', 34, 30, 2.2, '#9aa8c0', ws * A_(lt, L[7] + 0.2, 0.4), -0.05);
    }
    // stopped
    var bn = A_(lt, L[8], 0.8);
    if (bn > 0.01) { tome(g, 50, 36, 14.5, 19, bn, '#2a3f66', '对话', '', lt); var sx = A_(lt, L[8] + 1.0, 0.2); if (sx > 0.01) { var s4 = 2.2 - 1.2 * eo(sx); g.save(); g.translate(50, 36); g.scale(s4, s4); stamp2(g, '叫停发行', 0, 0, 3.2, '#ef5b43', sx, -0.12); g.restore(); } chip(g, 50, 49, '1632 · 夏', FG, bn * A_(lt, L[8] + 0.4, 0.5)); }
  };

  // ---------- g13: he was wrong too: tides, circles ----------
  DRAW.g13 = function (g, lt, L) {
    var ti = W_(lt, L[0] + 0.6, L[4] - 0.2, 0.8, 0.6);
    if (ti > 0.01) {
      var cx = 32, cy = 38;
      earthB(g, cx, cy, 5.2, ti, lt);
      g.save(); g.globalAlpha *= ti * 0.8; g.strokeStyle = '#6fb4ff'; g.lineWidth = 0.5; g.beginPath(); g.ellipse(cx, cy, 7.6 + 0.5 * Math.sin(lt * 2.2), 5.9, 0, 0, TAU); g.stroke(); g.restore();
      chip(g, cx, 27.6, '潮汐', '#8fd0ff', ti, 'rgba(20,34,56,0.92)');
      var sh = A_(lt, L[2], 0.6) * ti; if (sh > 0.01) { arrow(g, cx - 12, 47, cx - 6, 47, GOLD, 0.35, sh * (0.6 + 0.4 * Math.sin(lt * 3)), 0.9); arrow(g, cx + 12, 47, cx + 6, 47, GOLD, 0.35, sh * (0.6 + 0.4 * Math.sin(lt * 3)), 0.9); }
      chip(g, cx, 50.6, '“地球在晃，所以有潮汐”', '#ffd27a', ti * A_(lt, L[1] + 0.4, 0.5), 'rgba(36,30,12,0.92)');
      var xs = A_(lt, L[3] + 0.2, 0.22); if (xs > 0.01) { var sc = 2.2 - 1.2 * eo(xs); g.save(); g.translate(cx, cy); g.scale(sc, sc); xMark(g, 0, 0, 7.2, '#ef5b43', xs, 1.0); g.restore(); }
      var mo = A_(lt, L[3] + 0.8, 0.7); if (mo > 0.01) { dot(g, 62, 36, 1.3, '#e6e0c8', mo * ti); halo(g, 62, 36, 3.4, 'rgba(230,230,210,0.8)', 0.4 * mo * ti); arrow(g, 59.4, 36.6, 45, 37.6, '#7fe0a0', 0.3, mo * ti * 0.7, 0.8); chip(g, 62, 31.4, '月球和太阳的引力', '#7fe0a0', mo * ti, 'rgba(14,44,30,0.92)'); }
    }
    var ob = W_(lt, L[4], null, 0.8);
    if (ob > 0.01) {
      sunB(g, 30, 38, 1.2, ob, lt); ring(g, 30, 38, 8.0, 'rgba(255,230,160,0.8)', 0.3, ob * A_(lt, L[4], 1.2)); chip(g, 30, 48.8, '他的轨道：正圆', '#ffd27a', ob * A_(lt, L[4] + 0.4, 0.5), 'rgba(36,30,12,0.92)');
      var el = A_(lt, L[5], 1.6); if (el > 0.01) {
        sunB(g, 62, 38, 1.2, el, lt); ellipsePath(g, 66, 38, 10.2, 7.4, '#8fd0ff', 0.3, el, el, null);
        earthB(g, 66 + 10.2 * Math.cos(lt * 0.9), 38 + 7.4 * Math.sin(lt * 0.9), 0.9, el, lt);
        chip(g, 66, 48.8, '开普勒的椭圆：没采用', '#8fd0ff', el * A_(lt, L[5] + 0.5, 0.5), 'rgba(20,34,56,0.92)');
      }
    }
    var er = A_(lt, 0.3, 0.6) * (1 - A_(lt, L[4] - 0.3, 0.4)); if (er > 0.01) chip(g, 70, 24.2, '他也错了', '#ffb86b', er, 'rgba(56,36,14,0.92)');
  };

  // ---------- g14: the trial in Rome, 1633 ----------
  DRAW.g14 = function (g, lt, L) {
    var p0 = A_(lt, 0.1, 1.2), i; hallBack(g, p0, lt);
    chip(g, 63, 22.6, '罗马 · 宗教裁判所', GOLD, A_(lt, 0.5, 0.6), 'rgba(48,38,12,0.92)');
    g.save(); g.globalAlpha *= A_(lt, 0.4, 0.8); rbox(g, 49, 38.6, 49, 1.6, 0.3, null, 0, '#17100d', 1); g.restore();
    judgesRow(g, [57, 66, 75, 84, 93], 41.5, 11.5, 0.5, lt, 1, [0.98, 1.02, 1.08, 1.02, 0.98]);
    g.save(); g.globalAlpha *= A_(lt, 0.4, 0.8); rbox(g, 49, 35.6, 49, 5.0, 0.4, HALLFG, 0.16, '#2a1c15', 1); g.restore();
    var stand = 1 - A_(lt, L[4] - 0.2, 0.6), kn = A_(lt, L[4] - 0.2, 0.7);
    glow(g, 28, 42, 11, 'rgba(255,214,150,0.9)', 0.3 * A_(lt, 0.3, 0.8));
    galileo(g, 28, 49.4, 14, A_(lt, 0.3, 0.8) * stand, { old: true, pose: 'forward' }, lt);
    kneel(g, 28, 49.5, 13, kn, lt);
    var ch = A_(lt, 0.7, 0.5) * (1 - A_(lt, L[1] - 0.1, 0.4)); if (ch > 0.01) chip(g, 28, 27, '1633 年初', FG, ch);
    // the old warning is dug out
    var wn = W_(lt, L[1], L[2] - 0.2, 0.7, 0.4);
    if (wn > 0.01) { paper(g, 42, 25.4, 12, 8, wn * 0.8, 'rgba(160,150,128,0.9)'); tx(g, '1616 的警告', 48, 29.6, 1.5, '#ffb08a', 'center', 800, SANS, wn); chip(g, 28, 27.0, '十七年前', '#ff9d6e', wn, 'rgba(56,30,14,0.92)'); }
    // the verdict
    var dt = W_(lt, L[2], L[3] - 0.1, 0.7, 0.5);
    if (dt > 0.01) { tx(g, '1633.6.22', 28, 30.4, 4.2, GOLD, 'center', 900, MONO, dt); tx(g, '宣判', 28, 35.0, 1.9, FG, 'center', 800, SANS, dt); }
    var vs = A_(lt, L[3], 0.2); if (vs > 0.01) {
      var s5 = 2.2 - 1.2 * eo(vs); g.save(); g.translate(28, 29.6); g.scale(s5, s5); stamp2(g, '无限期监禁', 0, 0, 3.0, '#ef5b43', vs, -0.06); g.restore();
      var bn = A_(lt, L[3] + 0.9, 0.5); bookB(g, 47, 30, 8, 11, bn, '#2a3f66', '对话', false); stamp2(g, '禁', 47, 30, 3.6, '#ef5b43', bn * A_(lt, L[3] + 1.1, 0.2), 0.1);
    }
  };

  // ---------- g15: the famous line he never said (as far as the records show) ----------
  DRAW.g15 = function (g, lt, L) {
    var qa = A_(lt, 0.2, 0.9);
    g.save(); g.globalAlpha *= qa; rbox(g, 24, 25.6, 52, 8.6, 0.8, 'rgba(242,198,107,0.75)', 0.2, 'rgba(48,38,12,0.7)', 1);
    tx(g, '“可它还是在动。”', 50, 29.2, 3.2, GOLD, 'center', 900, SERIF_, 1); g.restore();
    var qn = A_(lt, L[0] + 0.3, 0.6) * qa; tx(g, 'E PUR SI MUOVE', 50, 32.6, 1.0, 'rgba(242,198,107,0.7)', 'center', 600, MONO, qn);
    var dc = W_(lt, L[1], L[3] - 0.15, 0.8, 0.5);
    if (dc > 0.01) {
      bookB(g, 32, 41, 12, 14, dc * A_(lt, L[1], 0.6), '#4a3a28', '', false); tx(g, '学生写的传记', 32, 49.6, 1.5, FG, 'center', 700, SANS, dc * A_(lt, L[1] + 0.2, 0.5));
      var x1 = A_(lt, L[1] + 0.7, 0.2); if (x1 > 0.01) { var s1 = 2.2 - 1.2 * eo(x1); g.save(); g.translate(32, 41); g.scale(s1, s1); xMark(g, 0, 0, 6, '#ef5b43', x1, 0.9); g.restore(); }
      paper(g, 62, 34.2, 12, 14, dc * A_(lt, L[2], 0.6) * 0.85, 'rgba(160,150,128,0.9)'); tx(g, '审判记录', 68, 49.6, 1.5, FG, 'center', 700, SANS, dc * A_(lt, L[2] + 0.2, 0.5));
      var x2 = A_(lt, L[2] + 0.7, 0.2); if (x2 > 0.01) { var s2 = 2.2 - 1.2 * eo(x2); g.save(); g.translate(68, 41); g.scale(s2, s2); xMark(g, 0, 0, 6, '#ef5b43', x2, 0.9); g.restore(); }
    }
    // the bar: 1633 ... 1757
    var tl = A_(lt, L[3] - 0.2, 0.9);
    if (tl > 0.01) {
      var X = function (y) { return 12 + (y - 1633) * 0.66; }, yy = 44;
      rbox(g, X(1633), yy, X(1757) - X(1633), 0.7, 0.35, null, 0, 'rgba(200,215,240,0.25)', tl);
      [[1633, '审判', '#ff9d6e'], [1642, '去世', '#93a1b6'], [1757, '最早出现', GOLD]].forEach(function (m, i) {
        var ma = tl * (m[0] === 1757 ? A_(lt, L[3] + 0.4, 0.5) : 1); dot(g, X(m[0]), yy + 0.35, 0.8, m[2], ma); tx(g, m[0] + '', X(m[0]), yy + 3.2, 1.4, m[2], 'center', 700, MONO, ma); tx(g, m[1], X(m[0]), yy + 5.6, 1.3, m[2], 'center', 600, SANS, ma);
      });
      var sp = A_(lt, L[4] + 0.2, 0.9); if (sp > 0.01) {
        var bx0 = X(1642), bx1 = X(1642) + (X(1757) - X(1642)) * sp; rbox(g, bx0, yy - 0.2, bx1 - bx0, 1.1, 0.5, null, 0, 'rgba(242,198,107,0.9)', 1);
        chip(g, (X(1642) + X(1757)) / 2, yy - 3.4, '一百多年（115 年）', GOLD, sp, 'rgba(48,38,12,0.92)');
      }
      arrow(g, X(1757), 36.8, X(1757), 42.2, GOLD, 0.3, tl * A_(lt, L[3] + 0.6, 0.5) * 0.8, 0.8);
    }
  };
