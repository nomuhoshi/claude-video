  // ================= Micron video: d6-d11 =================
  function dieStack(g, cx, yb, w, n, lh, a, col, glowK) {       // n thin dies stacked upwards from yb (bottom)
    var i, sk = 1.2;
    for (i = 0; i < n; i++) {
      var f = Math.min(1, n - i), y = yb - (i + 1) * lh;
      var sh = i % 2 ? 'rgba(70,120,190,0.6)' : 'rgba(90,150,215,0.6)';
      g.save(); g.globalAlpha *= a * f; g.fillStyle = sh; g.strokeStyle = col || 'rgba(143,208,255,0.9)'; g.lineWidth = 0.14;
      g.beginPath(); g.moveTo(cx - w / 2, y + lh - 0.25); g.lineTo(cx + w / 2, y + lh - 0.25); g.lineTo(cx + w / 2 + sk, y + lh - 0.25 - 0.7); g.lineTo(cx - w / 2 + sk, y + lh - 0.25 - 0.7); g.closePath();
      g.fill(); g.stroke(); g.restore();
    }
  }

  // ---------- d6: the processor waits ----------
  DRAW.d6 = function (g, lt, L) {
    var a0 = A_(lt, 0.1, 0.8), i, j, r = rng(21);
    // memory on the right, full of parameter dots
    rbox(g, 58, 11, 34, 32, 1.0, 'rgba(143,208,255,0.7)', 0.22, 'rgba(20,34,56,0.9)', a0);
    var nd = 14 * 9 * eo(pr(lt, L[0] + 0.1, 2.0));
    for (j = 0; j < 9; j++) for (i = 0; i < 14; i++) {
      var n = j * 14 + i, aa = clamp(nd - n);
      if (aa > 0.01) dot(g, 60.4 + i * 2.2, 14 + j * 3.4, 0.55, GOLD, aa * 0.85 * (0.6 + 0.4 * Math.sin(lt * 2 + n)));
    }
    tx(g, '参数 · 几千亿个', 75, 8, 2.0, GOLD, 'center', 800, SANS, A_(lt, L[0] + 0.2, 0.6));
    tx(g, '内存', 75, 46.2, 2.0, ICE, 'center', 800, SANS, a0);
    // the processor on the left
    cpuBox(g, 7, 17, 22, 20, a0, 'rgba(238,242,248,0.85)', null);
    tx(g, '处理器', 18, 21, 2.2, FG, 'center', 800, SANS, a0);
    // gauge
    var gx = 18, gy = 31.5, gr = 6.4;
    var fast = A_(lt, L[2] - 0.1, 0.5), stall = A_(lt, L[3] + 0.1, 0.6);
    var v = fast * (1 - stall) * (0.92 + 0.06 * Math.sin(lt * 14)) + stall * 0.1 + (1 - fast) * (1 - stall) * 0.5;
    arcl(g, gx, gy, gr, Math.PI, TAU, 'rgba(238,242,248,0.3)', 0.6, a0);
    arcl(g, gx, gy, gr, Math.PI, Math.PI + Math.PI * v, v > 0.5 ? LEAF : CRIM, 0.6, a0);
    var ang = Math.PI + Math.PI * v; ln(g, gx, gy, gx + (gr - 1.2) * Math.cos(ang), gy + (gr - 1.2) * Math.sin(ang), FG, 0.35, null, a0); dot(g, gx, gy, 0.6, FG, a0);
    glow(g, 18, 27, 14, 'rgba(98,214,160,0.9)', 0.16 * fast * (1 - stall) * a0);
    chip(g, 18, 41, '算得很快', LEAF, W_(lt, L[2] + 0.05, L[3] - 0.1, 0.5, 0.4));
    var dots = '.'.repeat(1 + Math.floor(lt * 2) % 3);
    chip(g, 18, 41, '干等' + dots, CRIM, A_(lt, L[3] + 0.4, 0.6), 'rgba(50,16,16,0.95)');
    // the narrow pipe
    var hot = A_(lt, L[4] - 0.1, 0.6);
    rbox(g, 30, 25.6, 28, 1.8, 0.5, hot > 0.1 ? 'rgba(255,107,107,0.9)' : 'rgba(238,242,248,0.4)', 0.2, 'rgba(238,242,248,0.06)', a0);
    var sp = L[2] < lt ? 0.5 : 0.9, run = lt >= L[1] - 0.1;
    if (run) for (i = 0; i < 4; i++) {
      var q = fr(lt * 0.35 + i / 4); dot(g, mix(58, 30, q), 26.5, 0.5, GOLD, a0 * Math.sin(q * Math.PI));
    }
    arrow(g, 44, 21.4, 33, 21.4, 'rgba(143,208,255,0.6)', 0.25, A_(lt, L[1], 0.5) * a0, 0.8);
    chip(g, 44, 17.2, '取数据', ICE, A_(lt, L[1], 0.5));
    chip(g, 44, 34, '瓶颈', RED, hot, 'rgba(50,16,16,0.95)');
    glow(g, 44, 26.5, 8, 'rgba(255,107,107,0.9)', 0.25 * hot * (0.6 + 0.4 * Math.sin(lt * 6)));
  };

  // ---------- d7: stacking DRAM into HBM ----------
  DRAW.d7 = function (g, lt, L) {
    var a0 = A_(lt, 0.1, 0.8), i, cx = 50, yb = 42, lh = 2.5, w = 24;
    var n = 1 + 3 * eo(pr(lt, L[1] + 0.1, 1.0)) + 4 * eo(pr(lt, L[1] + 1.4, 1.4)) + 4 * eo(pr(lt, L[1] + 3.0, 1.4));
    if (lt < L[1]) n = 1;
    chip(g, 50, 7.8, '一片 DRAM 芯片', ICE, W_(lt, L[0] - 0.3, L[1] - 0.1, 0.6, 0.4));
    chip(g, 50, 7.8, 'HBM = 叠起来的 DRAM', GOLD, A_(lt, L[1] + 0.2, 0.6), 'rgba(40,30,12,0.95)');
    dieStack(g, cx, yb, w, n, lh, a0, null);
    // the base die
    rbox(g, cx - w / 2 - 1, yb - 0.1, w + 2, 1.6, 0.4, 'rgba(238,242,248,0.6)', 0.18, 'rgba(238,242,248,0.2)', a0);
    // TSVs
    var ta = A_(lt, L[2] + 0.2, 0.8), top = yb - n * lh - 0.4;
    if (ta > 0.01) for (i = 0; i < 5; i++) {
      var x = cx - 8 + i * 4 + 0.3;
      ln(g, x, yb, x, top, 'rgba(242,198,107,0.9)', 0.4, null, ta);
      var q = fr(lt * 0.7 + i * 0.21); dot(g, x, mix(yb, top, i % 2 ? q : 1 - q), 0.55, '#fff2c8', ta);
      glow(g, x, mix(yb, top, i % 2 ? q : 1 - q), 2.4, 'rgba(242,198,107,0.9)', 0.6 * ta);
    }
    var la = A_(lt, L[3] + 0.1, 0.6);
    if (la > 0.01) {
      arrow(g, 77, 19, cx + 5.5, mix(yb, top, 0.5) + 0.2, 'rgba(242,198,107,0.9)', 0.25, la, 0.8);
      chip(g, 82, 17.8, '硅通孔', GOLD, la, 'rgba(40,30,12,0.95)');
    }
    var ua = A_(lt, L[4] + 0.1, 0.6);
    if (ua > 0.01) {
      arrow(g, 18, 36, 18, 15 + 3 * (1 - ua), LEAF, 0.4, ua, 1.1);
      chip(g, 18, 40.4, '叠得越高', LEAF, ua); chip(g, 18, 11.6, '容量越大', LEAF, ua);
    }
  };

  // ---------- d8: HBM sits right next to the processor ----------
  DRAW.d8 = function (g, lt, L) {
    var a0 = A_(lt, 0.1, 0.8), i, k;
    var mv = eio(pr(lt, L[1] + 0.1, 1.2));
    var lx = mix(5, 25, mv), rx = mix(85, 65, mv);
    var pa = A_(lt, L[2] + 0.1, 0.9);
    // interposer plate
    rbox(g, 19, 13, 62, 30, 1.4, 'rgba(143,170,215,0.6)', 0.2, 'rgba(143,170,215,0.10)', pa, [0.7, 0.5]);
    tx(g, '硅中介层', 50, 45.4, 1.9, SIC, 'center', 700, SANS, pa);
    // GPU die in the middle
    rbox(g, 40, 21, 20, 14, 0.9, GOLD, 0.28, 'rgba(60,45,16,0.9)', a0);
    tx(g, '处理器', 50, 28, 2.4, GOLD, 'center', 900, SANS, a0);
    glow(g, 50, 28, 16, 'rgba(242,198,107,0.9)', 0.12 * a0);
    // four HBM stacks (two per side)
    var ys = [14.8, 29.8];
    for (k = 0; k < 2; k++) for (i = 0; i < 2; i++) {
      var x = k ? rx : lx, y = ys[i];
      var hs = 'rgba(70,120,190,0.55)';
      for (var t = 0; t < 4; t++) rbox(g, x + t * 0.5, y + t * 0.5, 10, 8, 0.5, 'rgba(143,208,255,0.9)', 0.15, hs, a0);
      tx(g, 'HBM', x + 6, y + 5, 1.8, FG, 'center', 800, MONO, a0);
    }
    // wires: long and sparse -> short and dense
    var nl = lt < L[3] ? 3 : lt < L[4] ? 8 : lt < L[5] ? 16 : 30;
    var nlA = Math.round(nl * (lt < L[1] ? 1 : 1));
    for (k = 0; k < 2; k++) for (i = 0; i < 2; i++) {
      var yy = ys[i], x1 = k ? 40 + 20 : lx + 10.5, x2 = k ? rx : 40;
      var xa = k ? 60 : lx + 10.5, xb = k ? rx : 40;
      var m = Math.max(3, Math.min(nlA, 30));
      for (var q = 0; q < m; q++) {
        var yw = yy + 0.5 + 7 * (q + 0.5) / m, yg = 21 + 14 * (q + 0.5) / m;
        var pp = fr(lt * 0.9 + q * 0.173 + i * 0.3);
        g.save(); g.globalAlpha *= a0 * 0.7; g.strokeStyle = 'rgba(143,208,255,0.55)'; g.lineWidth = lt >= L[5] ? 0.1 : 0.14;
        g.beginPath(); g.moveTo(xa, yw); g.lineTo(xb, yg); g.stroke(); g.restore();
        if (m <= 16 || q % 2 === 0) dot(g, mix(xa, xb, k ? 1 - pp : pp), mix(yw, yg, k ? 1 - pp : pp), 0.28, '#fff2c8', a0 * Math.sin(pp * Math.PI));
      }
    }
    // numbers
    chip(g, 50, 7.6, '离得远，路很窄', DIM, W_(lt, L[0] - 0.2, L[1] + 0.1, 0.5, 0.4));
    chip(g, 50, 7.6, '紧贴着，路又宽又短', LEAF, W_(lt, L[1] + 0.9, L[4] - 0.1, 0.5, 0.4));
    var n1 = A_(lt, L[4] + 0.1, 0.6), n2 = A_(lt, L[5] + 0.1, 0.6);
    tx(g, '第一代', 36, 6.6, 2.0, DIM, 'center', 700, SANS, n1 * (1 - 0.5 * n2));
    tx(g, '1024', 36, 11, 4.0, ICE, 'center', 900, MONO, n1 * (1 - 0.5 * n2));
    tx(g, '第四代', 64, 6.6, 2.0, GOLD, 'center', 700, SANS, n2);
    tx(g, '2048', 64, 11, 4.0, GOLD, 'center', 900, MONO, n2);
    tx(g, '条 / 每叠', 50, 11, 1.8, DIM, 'center', 700, SANS, n1);
  };

  // ---------- d9: who builds it ----------
  DRAW.d9 = function (g, lt, L) {
    var a0 = A_(lt, 0.1, 0.8), i, ys = [17, 28, 39], nm = ['SK 海力士', '三星', '美光'], cl = [LEAF, ICE, GOLD];
    var race = pr(lt, L[4] + 0.1, 3.4);
    for (i = 0; i < 3; i++) {
      var na = A_(lt, i === 2 ? L[1] + 0.35 : L[1] + (i === 0 ? 0.0 : 0.35) - 0.05, 0.5) ;
      if (i === 1) na = A_(lt, L[1] + 0.35, 0.5); if (i === 0) na = A_(lt, L[1] - 0.05, 0.5);
      if (i === 2) na = A_(lt, L[1] + 0.8, 0.5);
      var hi = i === 2 ? A_(lt, L[2] + 0.1, 0.7) : 0;
      tx(g, nm[i], 6, ys[i], 2.6, hi > 0.2 ? GOLD : cl[i], 'left', 900, SANS, na);
      ln(g, 28, ys[i] + 4.2, 90, ys[i] + 4.2, 'rgba(238,242,248,0.3)', 0.2, [0.6, 0.5], a0 * na);
      // the stack: layers grow for Micron at L2
      var nLay = i === 2 ? Math.round(4 + 8 * eo(pr(lt, L[2] + 0.2, 1.4))) : 8;
      var xs = 35 + (i === 2 ? 1 : 0.9 + 0.08 * i) * 44 * eio(race) * (0.92 + 0.08 * Math.sin(i * 2 + race * 5)) ;
      if (i === 2) xs = 35 + 46 * eio(race);
      var lh = 0.78;
      dieStack(g, xs, ys[i] + 4.1, 8, nLay, lh, na, null);
      glow(g, xs, ys[i] + 1, 7, i === 2 ? 'rgba(242,198,107,0.9)' : 'rgba(143,208,255,0.8)', (i === 2 ? 0.3 : 0.15) * na * (race > 0 ? 1 : 0));
    }
    chip(g, 74, 11.2, '2026 · HBM4 开始量产', GOLD, W_(lt, L[2] + 0.3, L[3] - 0.1, 0.5, 0.4), 'rgba(40,30,12,0.95)');
    chip(g, 74, 11.2, '12 层 · 36GB', GOLD, A_(lt, L[3] + 0.2, 0.6), 'rgba(40,30,12,0.95)');
    ln(g, 90, 11, 90, 44, 'rgba(98,214,160,0.7)', 0.4, null, A_(lt, L[4], 0.6));
    chip(g, 74, 45.4, '同一条赛道', LEAF, A_(lt, L[4] + 0.2, 0.6));
  };

  // ---------- d10: four businesses ----------
  DRAW.d10 = function (g, lt, L) {
    var a0 = A_(lt, 0.1, 0.8), i;
    var nm = ['云端内存', '核心数据中心', '手机和电脑', '汽车和嵌入式'], vl = [430.9, 375.9, 366.0, 158.9], sc = 44 / 430.9;
    chip(g, 50, 7.4, '2026 财年各业务收入（亿美元）', DIM, A_(lt, L[0] + 0.1, 0.7));
    var hi = A_(lt, L[5] + 0.1, 0.8);
    for (i = 0; i < 4; i++) {
      var y = 13.4 + i * 8.6, ta = L[i + 1], aa = A_(lt, ta - 0.05, 0.5);
      var wv = vl[i] * sc * eo(pr(lt, ta + 0.05, 1.2));
      var col = i < 2 ? mix(0, 1, hi) : 0;
      tx(g, nm[i], 7, y + 3, 2.4, FG, 'left', 800, SANS, aa);
      var c1 = i < 2 ? 'rgba(143,208,255,' + (0.55 + 0.35 * hi).toFixed(2) + ')' : 'rgba(147,161,182,' + (0.7 - 0.3 * hi).toFixed(2) + ')';
      rbox(g, 30, y, 44, 6, 0.8, 'rgba(238,242,248,0.15)', 0.14, null, aa);
      if (wv > 0.2) rbox(g, 30, y, wv, 6, 0.8, null, 0, c1, 1);
      tx(g, '' + Math.round(vl[i] * eo(pr(lt, ta + 0.05, 1.2))), 30 + wv + 1.4, y + 3.1, 3.0, i < 2 && hi > 0.3 ? ICE : FG, 'left', 900, MONO, aa);
    }
    if (hi > 0.01) {
      var bx = 82.5;
      ln(g, bx - 1, 13.4, bx, 13.4, GOLD, 0.35, null, hi); ln(g, bx, 13.4, bx, 28.6, GOLD, 0.35, null, hi); ln(g, bx, 28.6, bx - 1, 28.6, GOLD, 0.35, null, hi);
      ln(g, bx, 21, bx + 1.4, 21, GOLD, 0.35, null, hi);
      chip(g, 90, 21, '约占六成', GOLD, hi, 'rgba(40,30,12,0.95)');
    }
  };

  // ---------- d11: the three giants ----------
  DRAW.d11 = function (g, lt, L) {
    var a0 = A_(lt, 0.1, 0.8), cx = 34, cy = 27, R = 13, i;
    var seg = [['三星', 0.38, ICE], ['SK 海力士', 0.25, LEAF], ['美光', 0.24, GOLD], ['其他', 0.13, 'rgba(147,161,182,0.7)']];
    arcl(g, cx, cy, R, 0, TAU, 'rgba(238,242,248,0.14)', 5.4, a0);
    var t = [0, 0.38, 0.63, 0.87, 1], sw = [pr(lt, L[2] + 0.1, 1.0), pr(lt, L[2] + 0.5, 1.0), pr(lt, L[3] + 0.1, 1.0), pr(lt, L[4] + 0.5, 0.8)];
    var asw = [Math.min(sw[0] * 1, 1), sw[1], sw[2], sw[3]];
    for (i = 0; i < 4; i++) {
      var s0 = t[i] * TAU - Math.PI / 2, s1 = t[i + 1] * TAU - Math.PI / 2, e = s0 + (s1 - s0) * eo(asw[i]);
      if (asw[i] > 0.001) { g.save(); g.lineCap = 'butt'; arcl(g, cx, cy, R, s0, e, seg[i][2], 5.4, a0); g.restore(); }
    }
    var three = A_(lt, L[4] + 0.1, 0.8);
    tx(g, 'DRAM', cx, cy - 1.2, 2.6, DIM, 'center', 800, MONO, a0 * (1 - three));
    tx(g, '收入份额', cx, cy + 2.2, 1.7, DIM, 'center', 700, SANS, a0 * (1 - three));
    tx(g, '87%', cx, cy - 0.6, 5.0, GOLD, 'center', 900, MONO, three);
    tx(g, '三家合计', cx, cy + 3.8, 1.8, FG, 'center', 700, SANS, three);
    glow(g, cx, cy, 16, 'rgba(242,198,107,0.9)', 0.12 * three);
    chip(g, 74, 11.4, '2026 年第二季度 · 估计', DIM, A_(lt, L[1] + 0.2, 0.6));
    var rows = [[0, L[2] + 0.1], [1, L[2] + 0.5], [2, L[3] + 0.1], [3, L[4] + 0.5]], pc = ['38%', '25%', '24%', '13%'];
    for (i = 0; i < 4; i++) {
      var y = 20 + i * 7.2, ra = A_(lt, rows[i][1], 0.5), me = i === 2;
      dot(g, 58, y, 1.0, seg[i][2], ra);
      tx(g, seg[i][0], 62, y, 2.5, me ? GOLD : FG, 'left', me ? 900 : 700, SANS, ra);
      tx(g, '约 ' + pc[i], 92, y, 3.0, me ? GOLD : seg[i][2], 'right', 900, MONO, ra);
    }
  };
