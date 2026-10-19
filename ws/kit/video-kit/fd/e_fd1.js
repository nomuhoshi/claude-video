  // ================= Faraday: scenes d0-d8 =================
  // ---------- d0: one twitch of a needle ----------
  DRAW.d0 = function (g, lt, L) {
    var A = A_(lt, 0.2, 0.8), out = 1 - A_(lt, L[4] - 0.2, 1.0);
    chip(g, 50, 15.5, '1831 · 伦敦', GOLD, A_(lt, L[0], 0.7) * out, 'rgba(48,38,12,0.95)');
    var la = A * out;
    var mx = 80 - 21 * eio(pr(lt, L[2] + 0.2, 0.9)), v = (mx - (80 - 21 * eio(pr(lt - 0.05, L[2] + 0.2, 0.9)))) / 0.05;
    var d = clamp(-v / 30) * 1.0;
    var de = Math.max(d, 0.85 * pulse(lt, L[2] + 0.75, 0.6)) * (lt < L[3] + 1.2 ? 1 : 0) + 0.25 * Math.sin(lt * 9) * pulse(lt, L[3] - 0.2, 0.7);
    wire(g, [[47, 22], [47, 17], [24, 17], [24, 23]], la, 0, lt);
    wire(g, [[63, 22], [63, 41], [24, 41], [24, 33]], la, de * 0.8, lt);
    coil(g, 55, 26, 16, 8, 11, la, de, 'back');
    barMag(g, mx, 26, 14, 4.2, Math.PI, la * A_(lt, L[1], 0.8));
    coil(g, 55, 26, 16, 8, 11, la, de, 'front');
    faraday(g, mx + 16, 34.5, 20, la * A_(lt, L[1], 0.8), { pose: 'push', flip: true, name: '法拉第' }, lt);
    galv(g, 24, 28, 5.5, de, la);
    if (lt > L[3]) chip(g, 24, 15.5, '跳了一下', GOLD, A_(lt, L[3] + 0.1, 0.5) * out, 'rgba(48,38,12,0.95)');
    var cl = A_(lt, L[4] - 0.2, 1.4);
    cityLights(g, cl, lt, 8, 92, 20, 44, 7);
    tx(g, '从这一下开始', 50, 16.5, 3.4, GOLD, 'center', 900, SANS, A_(lt, L[5], 0.8));
  };

  // ---------- d1: a blacksmith's son ----------
  DRAW.d1 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8);
    tx(g, '1791', 50, 15, 7.5, GOLD, 'center', 900, SANS, A_(lt, L[0], 0.8));
    chip(g, 50, 22.5, '迈克尔 · 法拉第', FG, A_(lt, L[0] + 0.8, 0.7));
    // anvil with sparks
    var an = A_(lt, L[1], 0.7);
    if (an > 0.01) {
      g.save(); g.globalAlpha *= an; g.fillStyle = '#5b6474';
      g.beginPath(); g.moveTo(16, 33); g.lineTo(34, 33); g.quadraticCurveTo(36, 33, 37.5, 31.4); g.lineTo(31, 31.4); g.lineTo(30, 35.5); g.lineTo(32, 39); g.lineTo(19, 39); g.lineTo(21, 35.5); g.lineTo(20, 31.4); g.lineTo(16, 31.4); g.closePath(); g.fill(); g.restore();
      var ph = (lt * 1.25) % 1, hy = 24 + 6.5 * Math.min(1, ph * 4) * (ph < 0.25 ? 1 : 0) + (ph >= 0.25 ? 6.5 - 6.5 * (ph - 0.25) / 0.75 : 0);
      rbox(g, 24, hy - 1.4, 5.5, 2.8, 0.4, null, 0, '#9aa7ba', an); ln(g, 28.5, hy, 34, hy - 4, '#8a5f34', 0.8, null, an);
      if (ph < 0.25) for (i = 0; i < 7; i++) { var a2 = -Math.PI * (0.15 + 0.7 * i / 6), sp = ph * 4; dot(g, 26.7 + Math.cos(a2) * 5 * sp, 31 + Math.sin(a2) * 4 * sp, 0.3, '#ffd27a', an * (1 - sp)); }
      tx(g, '父亲：铁匠', 26, 42.5, 2.0, DIM, 'center', 700, SANS, an);
    }
    // poor house
    var ho = A_(lt, L[2], 0.7);
    if (ho > 0.01) {
      g.save(); g.globalAlpha *= ho; g.fillStyle = 'rgba(70,64,80,0.95)';
      g.beginPath(); g.moveTo(44, 39); g.lineTo(44, 31); g.lineTo(50, 27); g.lineTo(56, 31); g.lineTo(56, 39); g.closePath(); g.fill(); g.restore();
      rbox(g, 48.7, 33, 2.6, 3, 0.2, null, 0, 'rgba(255,200,120,' + (0.4 + 0.2 * Math.sin(lt * 2)) + ')', ho);
      tx(g, '家里很穷', 50, 42.5, 2.0, DIM, 'center', 700, SANS, ho);
      faraday(g, 40, 39, 9, ho, { name: '法拉第' }, lt);
    }
    // a school slate
    var sl = A_(lt, L[3], 0.7);
    if (sl > 0.01) {
      rbox(g, 64, 28, 20, 12, 0.6, '#8a6a46', 0.6, 'rgba(30,40,38,0.95)', sl);
      var w4 = A_(lt, L[4], 0.5);
      tx(g, '读  写  算', 74, 32.5, 2.4, 'rgba(235,240,230,0.9)', 'center', 700, SANS, w4);
      tx(g, 'a b c  1 2 3', 74, 36.5, 1.8, 'rgba(235,240,230,0.6)', 'center', 600, MONO, w4);
      tx(g, '几年小学', 74, 42.5, 2.0, DIM, 'center', 700, SANS, sl);
    }
  };

  // ---------- d2: apprentice bookbinder ----------
  DRAW.d2 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8);
    chip(g, 50, 9, '14 岁 · 书店学徒', GOLD, A_(lt, L[0], 0.7) * (1 - A_(lt, L[3] - 0.2, 0.5)), 'rgba(48,38,12,0.95)');
    // shelf of books moving by
    var cols = ['#7a3b2e', '#2e4a6b', '#4d5b2e', '#6b4a2e', '#5a2e5b', '#2e6b62', '#8a6a2e'];
    var mv = A_(lt, L[2], 0.8), off = mv > 0 ? (lt - L[2]) * 3.2 : 0;
    var sh = A * (1 - A_(lt, L[3] - 0.2, 0.6));
    for (i = 0; i < 26; i++) {
      var x = ((i * 4.6 + off) % 120) - 10, hgt = 9 + (i * 37 % 5), w = 3.4 + (i % 3) * 0.4;
      if (x < 4 || x > 96) continue;
      rbox(g, x, 32 - hgt, w, hgt, 0.3, 'rgba(255,255,255,0.18)', 0.1, cols[i % cols.length], sh);
      ln(g, x + 0.5, 32 - hgt + 1.2, x + w - 0.5, 32 - hgt + 1.2, 'rgba(242,198,107,0.6)', 0.15, null, sh);
    }
    ln(g, 4, 32.2, 96, 32.2, '#6b4a2e', 0.7, null, sh);
    // needle and thread stitching a spine
    var st = A_(lt, L[1], 0.6) * (1 - A_(lt, L[2], 0.5));
    if (st > 0.01) {
      rbox(g, 40, 14, 20, 14, 0.4, null, 0, 'rgba(240,232,214,0.95)', st);
      for (i = 0; i < 5; i++) ln(g, 40, 15.5 + i * 2.6, 60, 15.5 + i * 2.6, 'rgba(120,100,80,0.4)', 0.12, null, st);
      var ny = 15 + ((lt * 1.6) % 1) * 12; ln(g, 50, 13, 50, ny, '#c9a35a', 0.2, null, st); dot(g, 50, ny, 0.4, '#d7dde8', st);
    }
    // day reading -> night reading with a candle
    var nt = A_(lt, L[3], 0.8) * (1 - A_(lt, L[4] - 0.3, 0.5));
    if (nt > 0.01) {
      flame(g, 84, 36, 3.2, 7, lt, nt, 3); rbox(g, 82.8, 36, 2.4, 6, 0.3, null, 0, '#efe6d2', nt);
      faraday(g, 72, 41, 16, nt, { pose: 'book', prop: 'book', name: '法拉第' }, lt);
      chip(g, 50, 9, '白天装订，晚上读', GOLD, nt, 'rgba(48,38,12,0.95)');
    }
    // the chemistry book that hooked him
    var bk = A_(lt, L[4] - 0.2, 0.8);
    if (bk > 0.01) {
      bookShape(g, 50, 26, 16, 20, '#3a5a7a', bk, '化学对话');
      for (i = 0; i < 10; i++) { var p = (lt * 0.35 + i / 10) % 1, x2 = 50 + Math.sin(i * 2.3 + lt) * 9 * p, y2 = 16 - p * 9; jat(g, x2, y2, 0.7, lt, i, 0.2, 3, 0.6, bk * (1 - p) * A_(lt, L[5], 0.7), false); }
      tx(g, '一本写给普通人的化学书', 50, 41, 2.0, DIM, 'center', 700, SANS, bk);
    }
  };

  // ---------- d3: his own little battery ----------
  DRAW.d3 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8), n = Math.floor(clamp((lt - L[1]) / (L[2] - L[1] + 0.8)) * 12);
    chip(g, 50, 9, '照着书，亲手做', GOLD, A_(lt, L[0], 0.7), 'rgba(48,38,12,0.95)');
    var bx = 44, by = 38;
    for (i = 0; i < n; i++) {
      var k = i % 3, col = k === 0 ? CU : k === 1 ? '#b9c2cf' : '#c8a878', hh = k === 2 ? 0.7 : 1.1;
      var y = by - i * 1.15;
      g.save(); g.globalAlpha *= A; g.fillStyle = col; g.beginPath(); g.ellipse(bx, y, 5, 1.3, 0, 0, TAU); g.fill(); g.strokeStyle = 'rgba(0,0,0,0.3)'; g.lineWidth = 0.1; g.stroke(); g.restore();
    }
    var lab = A_(lt, L[1] + 0.6, 0.7);
    faraday(g, 76, 40, 17, A_(lt, L[0] + 0.3, 0.8), { pose: 'forward', flip: true, name: '法拉第' }, lt);
    tx(g, '铜 · 锌 · 盐水纸片', 32, 34, 1.9, DIM, 'right', 700, SANS, lab);
    var on = A_(lt, L[3], 0.4);
    var top = by - 12 * 1.15;
    wire(g, [[bx + 5, by], [62, by], [62, 30]], A_(lt, L[2], 0.6), on, lt);
    wire(g, [[bx, top - 0.5], [bx, top - 4], [62, top - 4], [62, 25 + 2.5 * (1 - on)]], A_(lt, L[2], 0.6), on, lt);
    if (lt > L[3]) for (i = 0; i < 6; i++) { var aa = i / 6 * TAU + lt * 7; ln(g, 62, 27.5, 62 + Math.cos(aa) * 2.2, 27.5 + Math.sin(aa) * 2.2, '#ffe1a8', 0.15, null, 0.7 * (0.5 + 0.5 * Math.sin(lt * 23 + i))); }
    glow(g, 62, 27.5, 4, 'rgba(255,220,150,0.9)', 0.5 * on);
    chip(g, 74, 22, '电，流动起来了', GOLD, A_(lt, L[4], 0.7), 'rgba(48,38,12,0.95)');
  };

  // ---------- d4: Davy's lectures ----------
  DRAW.d4 = function (g, lt, L) {
    var i, j, A = A_(lt, 0.2, 0.8);
    // ticket flying in
    var tk = A_(lt, L[0], 0.6) * (1 - A_(lt, L[1], 0.6));
    if (tk > 0.01) { rbox(g, 40, 20, 20, 9, 0.6, GOLD, 0.25, 'rgba(48,38,12,0.95)', tk); tx(g, '讲座门票 · 1812', 50, 24.5, 2.2, GOLD, 'center', 800, SANS, tk); }
    // amphitheatre rows
    var th = A_(lt, L[1], 0.9) * (1 - 0.75 * A_(lt, L[3], 0.8));
    if (th > 0.01) {
      for (j = 0; j < 5; j++) {
        var R = 12 + j * 5.2;
        arcl(g, 50, 44, R, Math.PI * 1.08, Math.PI * 1.92, 'rgba(160,130,100,0.45)', 0.5, th);
        for (i = 0; i < 9 + j * 3; i++) { var an = Math.PI * (1.12 + 0.76 * (i + 0.5) / (9 + j * 3)); dot(g, 50 + Math.cos(an) * (R - 1.2), 44 + Math.sin(an) * (R - 1.2) - 0.6, 0.55, 'rgba(200,190,175,0.55)', th); }
      }
      // lecturer and a glowing flask
      davy(g, 50, 43.5, 9, th, { pose: 'forward' }, lt);
      glow(g, 54.5, 39.5, 3, 'rgba(143,208,255,0.9)', 0.6 * th * (0.6 + 0.4 * Math.sin(lt * 4)));
      dot(g, 54.5, 39.8, 0.9, 'rgba(160,215,255,0.9)', th);
      chip(g, 50, 7.5, '戴维的化学讲座', ICE, th * (1 - A_(lt, L[3], 0.5)));
      // our note-taker, high at the back
      var fx = 74.5, fy = 21.2;
      dot(g, fx, fy, 0.75, GOLD, th); glow(g, fx, fy, 3, 'rgba(242,198,107,0.9)', 0.6 * th);
      var wr = A_(lt, L[2], 0.6);
      ln(g, fx + 1, fy - 1, 80, 14, 'rgba(242,198,107,0.6)', 0.15, [0.5, 0.4], wr);
      if (wr > 0.01) { rbox(g, 80, 9, 14, 9, 0.4, null, 0, 'rgba(240,232,214,0.92)', wr); for (i = 0; i < 6; i++) ln(g, 81.5, 10.5 + i * 1.2, 81.5 + 11 * clamp((lt - L[2] - i * 0.3) / 0.6), 10.5 + i * 1.2, 'rgba(60,50,40,0.7)', 0.14, null, wr); }
    }
    // pages bound into a book
    var bb = A_(lt, L[3], 0.8);
    if (bb > 0.01) {
      var np = Math.floor(clamp((lt - L[3]) / 2.4) * 14);
      for (i = 0; i < np; i++) rbox(g, 20 + i * 0.25, 30 - i * 0.55, 14, 10, 0.3, 'rgba(0,0,0,0.2)', 0.08, 'rgba(240,232,214,0.95)', bb);
      var bd = A_(lt, L[4], 0.8);
      bookShape(g, 27.5, 26, 14.5, 18, '#5a3a24', bd, '笔记');
      tx(g, '三百多页', 27.5, 44, 2.4, GOLD, 'center', 900, SANS, bd);
    }
  };

  // ---------- d5: into the laboratory ----------
  DRAW.d5 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8);
    // the institution facade
    var fx = 66, fw = 26;
    g.save(); g.globalAlpha *= A; g.fillStyle = 'rgba(60,56,72,0.95)'; g.beginPath(); g.moveTo(fx - fw / 2 - 1, 17); g.lineTo(fx, 11); g.lineTo(fx + fw / 2 + 1, 17); g.closePath(); g.fill(); g.restore();
    rbox(g, fx - fw / 2, 17, fw, 1.6, 0, null, 0, 'rgba(90,84,104,0.95)', A);
    for (i = 0; i < 6; i++) rbox(g, fx - fw / 2 + 1 + i * 4.6, 18.6, 1.8, 20, 0.2, null, 0, 'rgba(120,114,134,0.95)', A);
    rbox(g, fx - fw / 2 - 1, 38.6, fw + 2, 1.6, 0, null, 0, 'rgba(90,84,104,0.95)', A);
    tx(g, '皇家研究所', fx, 44, 2.0, DIM, 'center', 700, SANS, A);
    // door opening with light
    var op = A_(lt, L[3], 1.0);
    rbox(g, fx - 2.4, 27, 4.8, 11.6, 0.2, null, 0, 'rgba(255,214,150,' + (0.15 + 0.75 * op) + ')', A);
    glow(g, fx, 33, 10, 'rgba(255,200,120,0.9)', 0.5 * op);
    // the notebook travelling to the building
    var tr = eio(pr(lt, L[0] + 0.3, 2.0)), bk = A_(lt, L[0], 0.6) * (1 - A_(lt, L[0] + 2.4, 0.4));
    bookShape(g, mix(18, fx, tr), mix(30, 32, tr) - Math.sin(tr * Math.PI) * 10, 7, 9, '#5a3a24', bk, '');
    // the accident
    var ex = A_(lt, L[1], 0.3) * (1 - A_(lt, L[1] + 1.0, 0.8));
    glow(g, 30, 22, 12, 'rgba(255,220,150,0.9)', 0.8 * ex);
    davy(g, 30, 42, 14, A_(lt, L[1], 0.6) * (1 - A_(lt, L[3], 0.5)), {}, lt);
    chip(g, 30, 14, '戴维伤了眼睛', HOT, A_(lt, L[1] + 0.3, 0.6) * (1 - A_(lt, L[3], 0.5)), 'rgba(50,24,18,0.95)');
    chip(g, 30, 18.5, '实验室缺一个助手', DIM, A_(lt, L[2], 0.6) * (1 - A_(lt, L[3], 0.5)));
    // he walks in
    var wk = A_(lt, L[3] + 0.4, 0.6), px = mix(26, fx, eio(pr(lt, L[3] + 0.4, 3.2)));
    faraday(g, px, 38.6, 9, wk * (1 - A_(lt, L[4] + 1.6, 0.6)), { walk: lt * 7, name: '法拉第' }, lt);
    chip(g, 30, 12, '1813 · 化学助手', GOLD, A_(lt, L[3], 0.6), 'rgba(48,38,12,0.95)');
  };

  // ---------- d6: a tour of Europe ----------
  var EU = [['伦敦', 24, 14], ['巴黎', 32, 22], ['蒙彼利埃', 34, 34], ['热那亚', 47, 32], ['佛罗伦萨', 53, 35], ['罗马', 58, 41], ['日内瓦', 44, 25], ['慕尼黑', 58, 22]];
  DRAW.d6 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8), pr0 = eio(pr(lt, L[0], L[2] - L[0]));
    chip(g, 50, 7, '1813 — 1815 · 一年半', GOLD, A_(lt, L[0] + 0.3, 0.6), 'rgba(48,38,12,0.95)');
    var segs = EU.length - 1, upto = pr0 * segs;
    g.save(); g.globalAlpha *= A; g.setLineDash([0.8, 0.6]); g.strokeStyle = 'rgba(242,198,107,0.7)'; g.lineWidth = 0.3; g.beginPath(); g.moveTo(EU[0][1], EU[0][2]);
    for (i = 1; i <= segs; i++) { var f = clamp(upto - (i - 1)); if (f <= 0) break; g.lineTo(mix(EU[i - 1][1], EU[i][1], f), mix(EU[i - 1][2], EU[i][2], f)); }
    g.stroke(); g.restore();
    for (i = 0; i < EU.length; i++) {
      var ca = A * clamp(upto - i + 1), st = A_(lt, L[4] + i * 0.15, 0.5);
      dot(g, EU[i][1], EU[i][2], 0.6, st > 0.5 ? GOLD : FG, ca);
      if (st > 0.01) { glow(g, EU[i][1], EU[i][2], 3, 'rgba(242,198,107,0.9)', 0.6 * st * ca); }
      tx(g, EU[i][0], EU[i][1] + 1.3, EU[i][2] - 1.5, 1.7, DIM, 'left', 700, SANS, ca);
    }
    // assistant or servant
    var tg = A_(lt, L[2], 0.6);
    if (tg > 0.01) {
      faraday(g, 82, 41, 13, tg, { prop: 'case', name: '法拉第' }, lt);
      davy(g, 69, 41, 14, tg, { walk: null }, lt);
      chip(g, 82, 21.5, '助手', GOLD, tg * (1 - A_(lt, L[3], 0.5)), 'rgba(48,38,12,0.95)');
      chip(g, 82, 21.5, '仆人？', HOT, A_(lt, L[3], 0.6) * (1 - A_(lt, L[4], 0.5)), 'rgba(50,24,18,0.95)');
    }
    chip(g, 76, 21.5, '他的大学', GOLD, A_(lt, L[5], 0.7), 'rgba(48,38,12,0.95)');
  };

  // ---------- d7: Oersted: electricity makes magnetism ----------
  DRAW.d7 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8);
    var side = 1 - A_(lt, L[4] - 0.2, 0.7);
    var on = A_(lt, L[1] + 0.3, 0.3);
    if (side > 0.01) {
      battery(g, 16, 22, A * side);
      wire(g, [[17, 19.6], [17, 14], [84, 14], [84, 22], [84, 30], [17, 30], [17, 24.4]], A * side, on, lt);
      compass(g, 50, 21, 4.5, -Math.PI / 2 * 0 + 1.25 * eio(pr(lt, L[2] - 0.6, 1.0)) * 0 + (Math.PI / 2) * 0 + 1.2 * A_(lt, L[2] - 0.6, 1.0) + 0.04 * Math.sin(lt * 5) * on, A * side);
      chip(g, 50, 7, '1820 · 奥斯特', ICE, A_(lt, L[0], 0.6) * side);
      chip(g, 50, 38, '通电 → 指南针转向', GOLD, A_(lt, L[2] + 0.2, 0.6) * side, 'rgba(48,38,12,0.95)');
      chip(g, 50, 43, '电，能产生磁', GOLD, A_(lt, L[3], 0.6) * side, 'rgba(48,38,12,0.95)');
    }
    // end-on view: circles of magnetic field around a current
    var ev = A_(lt, L[4], 0.8);
    if (ev > 0.01) {
      glow(g, 50, 26, 4, 'rgba(255,210,140,0.9)', 0.7 * ev); dot(g, 50, 26, 1.4, CU, ev); dot(g, 50, 26, 0.45, '#2a1a10', ev);
      tx(g, '电流 · 朝你流来', 50, 44, 1.9, DIM, 'center', 700, SANS, ev);
      for (i = 1; i <= 4; i++) {
        var R = i * 4.2, rr = A_(lt, L[4] + 0.3 + i * 0.25, 0.6) * ev;
        g.save(); g.globalAlpha *= rr * (0.9 - i * 0.12); g.strokeStyle = ICE; g.lineWidth = 0.25; g.setLineDash([1.6, 1.0]); g.lineDashOffset = -lt * 2.4 * (5 - i) * 0.3;
        g.beginPath(); g.arc(50, 26, R, 0, TAU); g.stroke(); g.restore();
        arrowHead(g, 50 + R, 26, Math.PI / 2 * -1, 0.8, ICE, rr);
      }
      for (i = 0; i < 8; i++) { var an = i / 8 * TAU; compass(g, 50 + Math.cos(an) * 12.6, 26 + Math.sin(an) * 12.6, 1.6, an + Math.PI, A_(lt, L[5], 0.6) * ev); }
    }
  };

  // ---------- d8: the wire that spins around a magnet ----------
  DRAW.d8 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8);
    var idea = A_(lt, L[0], 0.6) * (1 - A_(lt, L[3] - 0.2, 0.6)), cx0 = 50, cy0 = 26;
    // A. side view: current flows up a wire, the magnetic field wraps around it in rings
    var sA = idea * (1 - A_(lt, L[1] + 0.5, 0.6));
    if (sA > 0.01) {
      wire(g, [[cx0, 44], [cx0, 8]], sA, 1, lt);
      tx(g, '电流', cx0 + 2, 10, 1.9, '#ffd9a8', 'left', 800, SANS, sA); arrowHead(g, cx0, 8.5, -Math.PI / 2, 1, '#ffd9a8', sA);
      [15, 24, 33].forEach(function (yy, k) {
        var ra = sA * A_(lt, L[0] + 0.4 + k * 0.25, 0.5);
        g.save(); g.globalAlpha *= ra; g.lineWidth = 0.3; g.setLineDash([1.1, 0.8]); g.lineDashOffset = -lt * 3;
        g.strokeStyle = 'rgba(143,208,255,0.35)'; g.beginPath(); g.ellipse(cx0, yy, 8, 2.2, 0, Math.PI, TAU); g.stroke();
        g.strokeStyle = ICE; g.beginPath(); g.ellipse(cx0, yy, 8, 2.2, 0, 0, Math.PI); g.stroke(); g.restore();
        var ph = lt * 1.6 + k; dot(g, cx0 + Math.cos(ph) * 8, yy + Math.sin(ph) * 2.2, 0.5, ICE, ra * (Math.sin(ph) > 0 ? 1 : 0.4));
      });
      chip(g, 72, 26, '磁场：一圈圈绕着电流', ICE, sA * A_(lt, L[0] + 1.0, 0.5));
    }
    // B. top view: the rings flow around the wire, compass needles line up along them
    var sB = A_(lt, L[1] + 0.3, 0.6) * (1 - A_(lt, L[2] + 0.2, 0.6)) * idea;
    if (sB > 0.01) {
      glow(g, cx0, cy0, 3, 'rgba(255,210,140,0.9)', 0.6 * sB); dot(g, cx0, cy0, 1.2, CU, sB); dot(g, cx0, cy0, 0.35, '#2a1a10', sB);
      for (var r = 1; r <= 3; r++) {
        g.save(); g.globalAlpha *= sB * 0.85; g.strokeStyle = ICE; g.lineWidth = 0.25; g.setLineDash([1.4, 0.9]); g.lineDashOffset = -lt * 2.2 * (4 - r) * 0.4;
        g.beginPath(); g.arc(cx0, cy0, r * 4.5, 0, TAU); g.stroke(); g.restore();
        for (var q = 0; q < 2; q++) { var an0 = -lt * 0.9 * (4 - r) * 0.35 + q * Math.PI; arrowHead(g, cx0 + Math.cos(an0) * r * 4.5, cy0 + Math.sin(an0) * r * 4.5, an0 - Math.PI / 2, 0.7, ICE, sB); }
      }
      for (var i8 = 0; i8 < 8; i8++) { var a8 = i8 / 8 * TAU; compass(g, cx0 + Math.cos(a8) * 16.5, cy0 + Math.sin(a8) * 16.5, 1.4, a8 - Math.PI / 2 + (1 - A_(lt, L[1] + 0.9 + i8 * 0.06, 0.4)) * 1.4, sB); }
      tx(g, '从上往下看：电流朝你流来', cx0, 46, 1.9, DIM, 'center', 700, SANS, sB);
    }
    // C. swap the roles: a magnet pole in the middle, the wire pushed sideways, always along the circle
    var sC = A_(lt, L[2] + 0.1, 0.6) * idea;
    if (sC > 0.01) {
      for (var j = 0; j < 16; j++) { var aj = j / 16 * TAU; ln(g, cx0 + Math.cos(aj) * 3.2, cy0 + Math.sin(aj) * 3.2, cx0 + Math.cos(aj) * 17, cy0 + Math.sin(aj) * 17, 'rgba(255,107,107,0.28)', 0.2, null, sC); }
      glow(g, cx0, cy0, 4, 'rgba(255,90,90,0.9)', 0.5 * sC); dot(g, cx0, cy0, 2.6, NRED, sC); tx(g, 'N', cx0, cy0 + 0.1, 2.2, '#fff', 'center', 900, SANS, sC);
      tx(g, '磁铁的一端（俯视）', cx0, 46, 1.9, DIM, 'center', 700, SANS, A_(lt, L[2] + 0.8, 0.4) * idea * (1 - A_(lt, L[2] + 2.2, 0.4)));
      var go = A_(lt, L[2] + 0.8, 0.8), th0 = -0.3 + Math.max(0, lt - L[2] - 0.8) * 1.5 * go, R0 = 10.5;
      g.save(); g.globalAlpha *= sC * go; g.strokeStyle = GOLD; g.lineWidth = 0.35; g.setLineDash([1, 0.8]);
      g.beginPath(); g.arc(cx0, cy0, R0, th0 - Math.min(TAU * 0.95, Math.max(0, lt - L[2] - 0.8) * 1.5), th0); g.stroke(); g.restore();
      var wx = cx0 + Math.cos(th0) * R0, wy = cy0 + Math.sin(th0) * R0;
      glow(g, wx, wy, 2.4, 'rgba(255,210,140,0.9)', 0.7 * sC); dot(g, wx, wy, 1.1, CU, sC); dot(g, wx, wy, 0.32, '#2a1a10', sC);
      var tdx = -Math.sin(th0), tdy = Math.cos(th0), fa = sC * A_(lt, L[2] + 0.5, 0.4);
      arrow(g, wx + tdx * 1.6, wy + tdy * 1.6, wx + tdx * 6, wy + tdy * 6, GOLD, 0.4, fa, 0.9);
      chip(g, 80, 16, '导线受的力：总是沿着圆圈', GOLD, fa, 'rgba(48,38,12,0.95)');
      chip(g, 80, 22, '→ 推一下，再推一下……', GOLD, sC * A_(lt, L[2] + 1.4, 0.5), 'rgba(48,38,12,0.95)');
      tx(g, '？', 66, 12, 4.4, GOLD, 'center', 900, SANS, sC * A_(lt, L[2] + 0.3, 0.5) * (1 - A_(lt, L[2] + 1.4, 0.4)));
    }
    var dv = A_(lt, L[3] - 0.1, 0.8);
    if (dv > 0.01) {
      var cx = 50, top = 31, rx = 9, ry = 2.4, bot = top + 12, surf = top + 2.2, sry = ry * 0.92, srx = rx - 0.3;
      // a glass cup seen from the side: back wall, then the mercury, then the magnet standing up through it
      g.save(); g.globalAlpha *= dv;
      g.fillStyle = 'rgba(160,190,220,0.08)'; g.beginPath(); g.moveTo(cx - rx, top); g.lineTo(cx - rx + 0.8, bot); g.ellipse(cx, bot, rx - 0.8, ry * 0.8, 0, Math.PI, 0, true); g.lineTo(cx + rx, top); g.closePath(); g.fill();
      g.restore();
      // the magnet: its lower half stands in the mercury, fixed to the bottom of the cup
      barMag(g, cx, top - 0.5, 15, 2.6, -Math.PI / 2, dv);
      // mercury body: silvery and half see-through, so the submerged half of the magnet shows dimly
      g.save(); g.globalAlpha *= dv;
      var mg = g.createLinearGradient(cx - rx, 0, cx + rx, 0); mg.addColorStop(0, 'rgba(120,130,150,0.78)'); mg.addColorStop(0.35, 'rgba(225,232,242,0.72)'); mg.addColorStop(0.6, 'rgba(170,180,198,0.75)'); mg.addColorStop(1, 'rgba(110,120,140,0.8)');
      g.fillStyle = mg; g.beginPath(); g.moveTo(cx - srx, surf); g.lineTo(cx - rx + 0.9, bot); g.ellipse(cx, bot, rx - 0.9, ry * 0.75, 0, Math.PI, 0, true); g.lineTo(cx + srx, surf); g.ellipse(cx, surf, srx, sry, 0, 0, Math.PI, false); g.closePath(); g.fill();
      // mercury surface (top), with a dimple where the magnet goes in
      var sg = g.createLinearGradient(cx - srx, 0, cx + srx, 0); sg.addColorStop(0, 'rgba(150,160,178,0.95)'); sg.addColorStop(0.45, 'rgba(240,244,250,0.95)'); sg.addColorStop(1, 'rgba(140,150,170,0.95)');
      g.fillStyle = sg; g.beginPath(); g.ellipse(cx, surf, srx, sry, 0, 0, TAU); g.fill();
      g.restore();
      // the part of the magnet above the mercury is drawn again on top, so it clearly pokes out
      g.save(); g.beginPath(); g.rect(cx - 3, top - 10, 6, surf - (top - 10) - 0.2); g.clip(); barMag(g, cx, top - 0.5, 15, 2.6, -Math.PI / 2, dv); g.restore();
      ring(g, cx, surf, 1.9, 'rgba(255,255,255,0.55)', 0.15, dv);
      // glass front: rim and two highlights
      g.save(); g.globalAlpha *= dv; g.strokeStyle = 'rgba(200,225,245,0.55)'; g.lineWidth = 0.25;
      g.beginPath(); g.ellipse(cx, top, rx, ry, 0, 0, TAU); g.stroke();
      g.beginPath(); g.moveTo(cx - rx, top); g.lineTo(cx - rx + 0.8, bot); g.ellipse(cx, bot, rx - 0.8, ry * 0.8, 0, Math.PI, 0, true); g.lineTo(cx + rx, top); g.stroke();
      g.strokeStyle = 'rgba(255,255,255,0.35)'; g.lineWidth = 0.45; g.beginPath(); g.moveTo(cx - rx + 1.3, top + 1.5); g.lineTo(cx - rx + 1.9, bot - 1.5); g.stroke(); g.restore();
      // labels
      var lb = A_(lt, L[3] + 0.4, 0.6);
      ln(g, cx + rx + 0.6, top + 6, cx + rx + 3, top + 6, 'rgba(238,242,248,0.5)', 0.15, null, dv * lb); tx(g, '水银', cx + rx + 3.6, top + 6.1, 2.1, FG, 'left', 800, SANS, dv * lb); tx(g, '液态金属，能导电', cx + rx + 3.6, top + 8.6, 1.6, DIM, 'left', 700, SANS, dv * lb);
      ln(g, cx - 1.5, top + 7, cx - rx - 3, top + 9, 'rgba(238,242,248,0.5)', 0.15, null, dv * lb); tx(g, '磁铁下半截泡在水银里', cx - rx - 3.6, top + 9.6, 1.8, FG, 'right', 700, SANS, dv * lb);
      // hanging wire: its lower end dips into the mercury and is free to swing round
      var wa = A_(lt, L[4], 0.6), on = A_(lt, L[4] + 0.9, 0.3), sp = A_(lt, L[5], 1.5);
      var th = (lt - L[5]) * 3.4 * sp + 0.2, ex = cx + Math.cos(th) * 5.6, ey = surf + Math.sin(th) * 1.5;
      if (wa > 0.01) {
        ln(g, 34, 9, 50, 9, WIRE, 0.3, null, wa); ln(g, 50, 9, 50, 10.5, WIRE, 0.3, null, wa); dot(g, 50, 10.5, 0.5, FG, wa);
        var front = Math.sin(th) > 0;
        ln(g, 50, 10.5, ex, ey, front ? '#ffd9a8' : 'rgba(232,147,90,0.7)', 0.4, null, wa);
        ring(g, ex, ey, 0.9 + 0.3 * Math.sin(lt * 9), 'rgba(255,255,255,0.6)', 0.12, wa);
        glow(g, ex, ey, 2, 'rgba(255,220,150,0.9)', 0.6 * on);
        wire(g, [[34, 9], [14, 9], [14, 22]], wa, on, lt); battery(g, 14, 25, wa); wire(g, [[14, 28], [14, 46], [cx, 46], [cx, bot + 1.8]], wa, on, lt);
        if (sp > 0.05) for (i = 1; i < 6; i++) { var t2 = th - i * 0.25; dot(g, cx + Math.cos(t2) * 5.6, surf + Math.sin(t2) * 1.5, 0.3, '#ffd9a8', wa * sp * (1 - i / 6)); }
      }
      chip(g, 78, 18, '电  →  持续的转动', GOLD, A_(lt, L[6], 0.7), 'rgba(48,38,12,0.95)');
      tx(g, '电动机的雏形', 78, 22.5, 1.9, DIM, 'center', 700, SANS, A_(lt, L[6] + 0.4, 0.7));
      chip(g, 78, 12, '1821', GOLD, A_(lt, L[3], 0.6), 'rgba(48,38,12,0.95)');
      faraday(g, 86, 42, 14, dv, { pose: 'forward', flip: true, name: '法拉第' }, lt);
    }
  };
