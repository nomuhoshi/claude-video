  // ================= Micron video: d12-d17 =================
  // ---------- d12: eight fiscal years of revenue ----------
  DRAW.d12 = function (g, lt, L) {
    var a0 = A_(lt, 0.1, 0.8), i;
    var yrs = ['2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026'], vl = [23.4, 21.4, 27.4, 30.8, 15.5, 25.1, 37.4, 133.2];
    var tm = [L[1] + 0.0, L[1] + 0.25, L[1] + 0.5, L[1] + 0.75, L[2] + 0.05, L[3] - 0.9, L[3] + 0.05, L[4] + 0.1];
    var x0 = 14, dx = 9.6, bw = 6.4, yb = 40, hs = 27 / 133.2;
    ln(g, 10, yb, 92, yb, 'rgba(238,242,248,0.4)', 0.22, null, a0);
    tx(g, '收入（亿美元）', 10, 9.4, 1.8, DIM, 'left', 700, SANS, A_(lt, L[0] + 0.1, 0.6));
    for (i = 0; i < 8; i++) {
      var aa = A_(lt, tm[i] - 0.1, 0.4), hv = vl[i] * hs * eo(pr(lt, tm[i], 1.0));
      var x = x0 + i * dx, col = i === 4 ? 'rgba(255,107,107,0.85)' : (i === 7 ? 'rgba(242,198,107,0.9)' : 'rgba(143,208,255,0.75)');
      tx(g, yrs[i], x + bw / 2, yb + 2.6, 1.9, i === 7 ? GOLD : DIM, 'center', 700, MONO, a0);
      if (hv > 0.1) rbox(g, x, yb - hv, bw, hv, 0.5, null, 0, col, 1);
      var shown = Math.round(vl[i] * 10 * eo(pr(lt, tm[i], 1.0)) / 10 * 10) / 10;
      if (aa > 0.01) tx(g, '' + Math.round(vl[i] * 10 * eo(pr(lt, tm[i], 1.0))), x + bw / 2, yb - hv - 1.8, 2.0, i === 7 ? GOLD : i === 4 ? CRIM : FG, 'center', 900, MONO, aa);
    }
    // the 2023 loss
    var la = A_(lt, L[2] + 0.5, 0.6);
    chip(g, 52, 18.6, '净亏约 58 亿', RED, la, 'rgba(50,16,16,0.95)');
    ln(g, 52, 20.4, x0 + 4 * dx + bw / 2, yb - 15.5 * hs - 5, 'rgba(255,107,107,0.6)', 0.2, [0.5, 0.4], la);
    glow(g, x0 + 7 * dx + bw / 2, yb - 66 * hs * 0.5, 14, 'rgba(242,198,107,0.9)', 0.12 * A_(lt, L[4] + 0.6, 0.8));
  };

  // ---------- d13: why the swings ----------
  DRAW.d13 = function (g, lt, L) {
    var a0 = A_(lt, 0.1, 0.8), i;
    // left: a factory that takes years to build
    var fa = W_(lt, L[1] - 0.1, L[4] - 0.2, 0.6, 0.5);
    fab(g, 7, 30, 2.3, ICE, fa, null, 'rgba(143,208,255,0.12)');
    rbox(g, 6, 34, 15, 1.8, 0.9, 'rgba(238,242,248,0.4)', 0.14, null, fa);
    rbox(g, 6, 34, 15 * eo(pr(lt, L[1] + 0.1, 3.4)), 1.8, 0.9, null, 0, ICE, fa);
    chip(g, 13.5, 40.4, '好几年', ICE, fa);
    // the chart
    var x0 = 29, x1 = 94, y0 = 40, y1 = 11, ca = A_(lt, L[2] - 0.3, 0.8);
    ln(g, x0, y0, x1, y0, 'rgba(238,242,248,0.4)', 0.22, null, ca); ln(g, x0, y0, x0, y1, 'rgba(238,242,248,0.4)', 0.22, null, ca);
    tx(g, '价格', x0 + 1, y1 - 1.8, 1.9, GOLD, 'left', 800, SANS, ca); tx(g, '时间 →', x1, y0 + 3, 1.7, DIM, 'right', 700, SANS, ca);
    function P(u) { return 0.5 - 0.40 * Math.sin(u * 5.1 - 0.5) * (1 - 0.15 * u) + 0.04 * u; }
    var u0 = 0, uTo = lt < L[3] ? 0.0 : 0, show;
    // reveal: rise at L2..L3, plateau L3..L4, fall L4..L5, rest L5..
    var rev = lt < L[2] ? 0 : lt < L[3] ? 0.24 * pr(lt, L[2], L[3] - L[2]) + 0.0 : lt < L[4] ? 0.24 + 0.14 * pr(lt, L[3], L[4] - L[3]) : lt < L[5] ? 0.38 + 0.32 * pr(lt, L[4], L[5] - L[4]) : 0.7 + 0.30 * pr(lt, L[5], L[6] - L[5] + 1.0);
    var N = 80, prev = null;
    for (i = 0; i <= N; i++) {
      var u = rev * i / N; if (rev <= 0.001) break;
      var X = x0 + 1 + u * (x1 - x0 - 3), Y = y0 - 2 - (1 - P(u)) * (y0 - y1 - 6) * 1.0;
      if (prev) ln(g, prev[0], prev[1], X, Y, GOLD, 0.5, null, ca);
      prev = [X, Y];
    }
    if (prev) { dot(g, prev[0], prev[1], 0.9, '#fff2c8', ca); glow(g, prev[0], prev[1], 4, 'rgba(242,198,107,0.9)', 0.7 * ca); }
    chip(g, 48, 15.2, '需求涨，产能跟不上', ICE, W_(lt, L[2] + 0.1, L[4] - 0.3, 0.5, 0.4));
    chip(g, 82, 15.2, '价格飙升', LEAF, W_(lt, L[3] + 0.1, L[4] - 0.3, 0.5, 0.4));
    var fl = A_(lt, L[4] + 0.1, 0.8);
    for (i = 0; i < 4; i++) fab(g, 56 + i * 8.5, 35.4, 1.1, ICE, fl * A_(lt, L[4] + 0.2 + i * 0.25, 0.4) * (1 - A_(lt, L[5] + 1.4, 0.6)), null);
    chip(g, 74, 25.4, '产能一多，价格掉下来', CRIM, W_(lt, L[4] + 0.6, L[6] - 0.2, 0.5, 0.5), 'rgba(50,16,16,0.95)');
    chip(g, 62, 45.2, '需求和供给，并不同步', GOLD, A_(lt, L[6] + 0.1, 0.7), 'rgba(40,30,12,0.95)');
  };

  // ---------- d14: right now ----------
  DRAW.d14 = function (g, lt, L) {
    var a0 = A_(lt, 0.1, 0.8), i;
    chip(g, 50, 7.4, '供不应求', GOLD, A_(lt, L[0] + 0.1, 0.6), 'rgba(40,30,12,0.95)');
    // racks + AI
    var ra = W_(lt, L[1] - 0.1, L[4] - 0.2, 0.6, 0.6);
    for (i = 0; i < 3; i++) rack(g, 60 + i * 11, 14, 9, 22, lt, ra);
    chip(g, 77, 41, 'AI 数据中心', ICE, ra);
    ln(g, 54, 25, 59, 25, 'rgba(143,208,255,0.6)', 0.25, null, ra);
    // bars: same quarter last year vs latest quarter
    var xs = [14, 32], vl = [113, 542], hs = 28 / 542, yb = 41;
    ln(g, 8, yb, 46, yb, 'rgba(238,242,248,0.4)', 0.22, null, A_(lt, L[2] - 0.2, 0.6));
    for (i = 0; i < 2; i++) {
      var ta = L[2] + 0.1 + i * 1.6, aa = A_(lt, ta - 0.1, 0.4), hv = vl[i] * hs * eo(pr(lt, ta, 1.3));
      if (hv > 0.1) rbox(g, xs[i], yb - hv, 10, hv, 0.6, null, 0, i ? 'rgba(242,198,107,0.9)' : 'rgba(143,208,255,0.7)', 1);
      tx(g, '' + Math.round(vl[i] * eo(pr(lt, ta, 1.3))), xs[i] + 5, yb - hv - 2.2, 3.0, i ? GOLD : FG, 'center', 900, MONO, aa);
      tx(g, i ? '最近一个季度' : '去年同期', xs[i] + 5, yb + 3.0, 1.9, i ? GOLD : DIM, 'center', 700, SANS, aa);
    }
    tx(g, '亿美元', 8, 11.4, 1.8, DIM, 'left', 700, SANS, A_(lt, L[2], 0.5));
    var ba = A_(lt, L[3] + 0.1, 0.7);
    if (ba > 0.01) {
      arrow(g, 20, 17, 32, 14, 'rgba(98,214,160,0.9)', 0.3, ba, 0.9);
      chip(g, 22, 12, '约 4.8 倍', LEAF, ba);
    }
    // timeline to 2028
    var ta2 = A_(lt, L[4] + 0.1, 0.8);
    if (ta2 > 0.01) {
      var yl = 26, xa = 56, xb = 92;
      ln(g, xa, yl, xb, yl, 'rgba(238,242,248,0.45)', 0.25, null, ta2);
      var tk = [['2026', 58], ['2027', 74], ['2028', 90]];
      for (i = 0; i < 3; i++) { ln(g, tk[i][1], yl - 1, tk[i][1], yl + 1, 'rgba(238,242,248,0.6)', 0.25, null, ta2); tx(g, tk[i][0], tk[i][1], yl + 3.6, 2.0, DIM, 'center', 700, MONO, ta2); }
      rbox(g, 58, yl - 3.4, 32 * eo(pr(lt, L[4] + 0.3, 1.6)), 2.4, 0.6, null, 0, 'rgba(255,157,110,0.8)', ta2);
      chip(g, 74, yl - 9, '公司预计：偏紧', HOT, ta2, 'rgba(50,24,12,0.95)');
    }
    var wa = A_(lt, L[5] + 0.1, 0.7);
    if (wa > 0.01) {
      g.save(); g.globalAlpha *= wa; g.strokeStyle = GOLD; g.lineWidth = 0.4; g.beginPath();
      for (i = 0; i <= 40; i++) { var X = 58 + i * 0.8, Y = 40 - 3 * Math.sin(i / 40 * TAU * 1.5 + lt * 1.2); if (i) g.lineTo(X, Y); else g.moveTo(X, Y); }
      g.stroke(); g.restore();
      tx(g, '周期', 74, 33.4, 2.2, GOLD, 'center', 800, SANS, wa);
    }
  };

  // ---------- d15: building in the USA ----------
  DRAW.d15 = function (g, lt, L) {
    var a0 = A_(lt, 0.1, 0.8), i;
    var c0 = A_(lt, L[0] + 0.1, 0.7);
    tx(g, '2026 财年资本开支', 6, 11, 2.0, DIM, 'left', 700, SANS, c0);
    tx(g, '约 274 亿美元', 6, 17, 4.4, ICE, 'left', 900, SANS, c0);
    var c1 = A_(lt, L[1] + 0.1, 0.7);
    tx(g, '在美国的计划', 6, 26, 2.0, DIM, 'left', 700, SANS, c1);
    var v = 2000 * eo(pr(lt, L[1] + 0.2, 1.4));
    tx(g, '约 ' + Math.round(v) + ' 亿美元', 6, 32.4, 5.2, GOLD, 'left', 900, SANS, c1);
    var sp = A_(lt, L[2] + 0.1, 0.7);
    if (sp > 0.01) {
      rbox(g, 6, 38.4, 33, 4.4, 0.6, 'rgba(238,242,248,0.4)', 0.14, null, sp);
      rbox(g, 6, 38.4, 24.7 * eo(pr(lt, L[2] + 0.2, 1.0)), 4.4, 0.6, null, 0, 'rgba(242,198,107,0.85)', sp);
      rbox(g, 30.7 + 0.3, 38.4, 8.3 * eo(pr(lt, L[2] + 0.8, 0.8)), 4.4, 0.6, null, 0, 'rgba(143,208,255,0.85)', sp);
      tx(g, '制造', 18, 40.7, 2.0, '#2a1c00', 'center', 900, SANS, sp); tx(g, '研发', 35, 40.7, 1.8, '#052a3c', 'center', 900, SANS, sp * A_(lt, L[2] + 1.2, 0.4));
    }
    // Idaho
    var ia = A_(lt, L[3] + 0.1, 0.7);
    rbox(g, 47, 10.6, 47, 14.4, 1.0, 'rgba(242,198,107,0.6)', 0.2, 'rgba(40,30,12,0.5)', ia);
    tx(g, '爱达荷州', 49.5, 14.4, 2.4, GOLD, 'left', 900, SANS, ia);
    fab(g, 50, 23, 1.7, GOLD, ia * A_(lt, L[3] + 0.4, 0.5), null, 'rgba(242,198,107,0.18)'); fab(g, 62.5, 23, 1.7, GOLD, ia * A_(lt, L[3] + 0.9, 0.5), null, 'rgba(242,198,107,0.18)');
    var wa = A_(lt, L[4] + 0.1, 0.7);
    chip(g, 79, 13.2, '2027 年中 · 第一批晶圆', LEAF, wa);
    glow(g, 55, 17, 10, 'rgba(98,214,160,0.9)', 0.2 * wa * (0.6 + 0.4 * Math.sin(lt * 4)));
    // New York
    var na = A_(lt, L[5] + 0.1, 0.7);
    rbox(g, 47, 28.6, 47, 14.4, 1.0, 'rgba(143,208,255,0.6)', 0.2, 'rgba(20,34,56,0.5)', na);
    tx(g, '纽约州', 49.5, 32.4, 2.4, ICE, 'left', 900, SANS, na);
    for (i = 0; i < 4; i++) fab(g, 50 + i * 9.4, 41.2, 1.5, ICE, na * A_(lt, L[5] + 0.3 + i * 0.3, 0.5), [0.5, 0.4]);
    chip(g, 84, 33.4, '最多四座', ICE, na * A_(lt, L[5] + 1.4, 0.5));
  };

  // ---------- d16: and around the world ----------
  DRAW.d16 = function (g, lt, L) {
    var a0 = A_(lt, 0.1, 0.8), i;
    function MX(lon) { return 12 + (lon - 70) * 1.0; } function MY(lat) { return 44 - (lat + 2) * 0.82; }
    for (i = 0; i < 5; i++) ln(g, 6, 12 + i * 8, 94, 12 + i * 8, 'rgba(238,242,248,0.07)', 0.14, null, a0);
    for (i = 0; i < 8; i++) ln(g, 10 + i * 11, 6, 10 + i * 11, 46, 'rgba(238,242,248,0.07)', 0.14, null, a0);
    var P = [['新加坡', 104, 1.3, GOLD, 0, 1], ['台湾', 121, 24.5, ICE, 0, 2], ['日本', 132, 34, ICE, 0, 2], ['马来西亚', 101.7, 4.6, ICE, 1, 2], ['印度', 78, 20, ICE, 0, 2]];
    for (i = 0; i < 5; i++) {
      var p = P[i], x = MX(p[1]), y = MY(p[2]);
      var ta = i === 0 ? L[1] + 0.1 : L[2] + 0.1 + (i - 1) * 0.42, aa = A_(lt, ta, 0.5);
      var rr = 1.0 + 0.5 * (i === 0);
      dot(g, x, y, rr, p[3], aa); ring(g, x, y, rr + 2 * fr(lt * 0.6 + i * 0.2), p[3], 0.18, aa * (1 - fr(lt * 0.6 + i * 0.2)));
      if (p[4]) tx(g, p[0], x - 2.4, y - 1.2, 2.2, p[3], 'right', 800, SANS, aa); else tx(g, p[0], x + 2.4, y + 2.2 * (i === 0 ? 1 : 0), 2.2, p[3], 'left', 800, SANS, aa);
    }
    chip(g, 44, 14, '宣布投资约 240 亿美元', GOLD, A_(lt, L[1] + 0.3, 0.6), 'rgba(40,30,12,0.95)');
    ln(g, MX(104), MY(1.3) - 1.4, 44, 15.6, 'rgba(242,198,107,0.6)', 0.2, [0.5, 0.4], A_(lt, L[1] + 0.3, 0.6));
    chip(g, 84, 44, '生产基地', ICE, A_(lt, L[3] + 0.1, 0.6));
    var ha = A_(lt, L[4] + 0.1, 0.7);
    memChip(g, 22, 33, 8, 3.4, 'rgba(242,198,107,0.95)', ha, null);
    chip(g, 26, 42, 'HBM 封装', GOLD, ha, 'rgba(40,30,12,0.95)');
    arrow(g, 14, 44.4, 6.4, 44.4, 'rgba(242,198,107,0.8)', 0.3, ha, 0.9);
    tx(g, '美国', 7, 40.2, 1.9, GOLD, 'left', 800, SANS, ha);
  };

  // ---------- d17: a trade-off ----------
  DRAW.d17 = function (g, lt, L) {
    var a0 = A_(lt, 0.1, 0.8), i;
    // capacity bar
    tx(g, '产能有限', 50, 9, 2.4, GOLD, 'center', 900, SANS, A_(lt, L[0] + 0.1, 0.6));
    var ca = A_(lt, L[0] + 0.2, 0.7);
    rbox(g, 28, 12.8, 44, 3.2, 0.6, 'rgba(238,242,248,0.4)', 0.16, 'rgba(238,242,248,0.06)', ca);
    var split = A_(lt, L[4] + 0.2, 1.2);
    rbox(g, 28, 12.8, 44 * 0.5, 3.2, 0.6, null, 0, 'rgba(143,208,255,0.55)', ca * (1 - 0.5 * split));
    rbox(g, 28 + 22 * (1 - split * 0.0), 12.8, 22, 3.2, 0.6, null, 0, 'rgba(242,198,107,0.6)', ca);
    // consumer block (left)
    var cons = 1 - A_(lt, L[3] + 0.3, 0.8) * 0.65;
    var ba = A_(lt, L[1] + 0.1, 0.7);
    rbox(g, 8, 20, 32, 20, 1.2, 'rgba(143,208,255,' + (0.8 * cons).toFixed(2) + ')', 0.24, 'rgba(20,34,56,0.9)', ba);
    // RAM stick
    rbox(g, 12, 26, 24, 5.6, 0.4, 'rgba(98,214,160,0.9)', 0.2, 'rgba(30,70,56,0.8)', ba * cons);
    for (i = 0; i < 6; i++) rbox(g, 14 + i * 3.4, 27.2, 2.2, 3.2, 0.2, null, 0, 'rgba(20,20,20,0.85)', ba * cons);
    for (i = 0; i < 20; i++) ln(g, 12.6 + i * 1.1, 31.6, 12.6 + i * 1.1, 33.2, 'rgba(242,198,107,0.8)', 0.3, null, ba * cons);
    tx(g, 'Crucial · 消费者', 24, 23, 2.0, FG, 'center', 800, SANS, ba * cons);
    // data-center block (right)
    var dg = A_(lt, L[4] + 0.2, 1.0);
    rbox(g, 60, 20, 32, 20, 1.2, 'rgba(242,198,107,' + (0.4 + 0.5 * dg).toFixed(2) + ')', 0.24, 'rgba(40,30,12,0.7)', ba);
    for (i = 0; i < 3; i++) rack(g, 65 + i * 8.6, 23, 7, 14, lt, ba, 'rgba(242,198,107,0.8)');
    tx(g, '增长更快的大客户', 76, 43.4, 1.9, GOLD, 'center', 800, SANS, ba);
    glow(g, 76, 30, 20, 'rgba(242,198,107,0.9)', 0.18 * dg * a0);
    // dates
    chip(g, 24, 44.6, '2025.12 宣布退出', CRIM, W_(lt, L[2] + 0.1, L[3] - 0.1, 0.5, 0.4), 'rgba(50,16,16,0.95)');
    chip(g, 24, 44.6, '2026.02 停止发货', CRIM, W_(lt, L[3] + 0.2, L[5] - 0.1, 0.6, 0.4), 'rgba(50,16,16,0.95)');
    // strike
    var sk = A_(lt, L[3] + 0.5, 0.5);
    if (sk > 0.01) { ln(g, 10, 22, 38, 38, 'rgba(255,107,107,0.9)', 0.5, null, sk); }
    // transfer arrow
    var tr = A_(lt, L[4] + 0.1, 0.8);
    arrow(g, 41, 30, 58, 30, GOLD, 0.45, tr, 1.2);
    chip(g, 49.5, 25, '供应倾斜', GOLD, tr, 'rgba(40,30,12,0.95)');
    // warranty
    var wa = A_(lt, L[5] + 0.1, 0.7);
    chip(g, 24, 44.6, '保修和支持继续', LEAF, wa);
  };
