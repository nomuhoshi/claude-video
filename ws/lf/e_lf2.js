  // ================= Lifespan: scenes l8-l13 =================
  // ---------- l8: entropy rises in a closed box; life is open; the germ line has never broken ----------
  DRAW.l8 = function (g, lt, L) {
    var i, r, out1 = 1 - A_(lt, L[2] - 0.3, 0.6);
    if (out1 > 0.01) {
      var A = A_(lt, 0.2, 0.7) * out1, mixK = eio(pr(lt, L[0] + 0.3, 3.0));
      rbox(g, 30, 10, 40, 30, 0.6, 'rgba(238,242,248,0.6)', 0.35, 'rgba(14,20,32,0.7)', A);
      r = rng(3);
      for (i = 0; i < 140; i++) {
        var ox = 32 + r() * 9, oy = 12 + r() * 26, fx = 32 + r() * 36, fy = 12 + r() * 26;
        var x = mix(ox, fx, mixK) + Math.sin(lt * 3 + i) * 0.4 * mixK, y = mix(oy, fy, mixK) + Math.cos(lt * 2.6 + i * 1.7) * 0.4 * mixK;
        dot(g, x, y, 0.38, i % 2 ? HOT : ICE, A);
      }
      tx(g, '整齐', 36.5, 8, 1.8, FG, 'center', 800, SANS, A * (1 - mixK));
      tx(g, '越来越乱：熵增', 50, 8, 2.0, HOT, 'center', 800, SANS, A * mixK);
      var la = A_(lt, L[1], 0.5) * out1;
      if (la > 0.01) {
        rbox(g, 30, 10, 40, 30, 0.6, GOLD, 0.5, null, la);
        rbox(g, 47.8, 40.6, 4.4, 3.4, 0.4, null, 0, GOLD, la); arcl(g, 50, 40.8, 1.5, Math.PI, TAU, GOLD, 0.45, la);
        chip(g, 50, 46.5, '封闭系统：不进不出', GOLD, la, 'rgba(48,38,12,0.95)');
      }
    }
    // open system: energy in, disorder out, order kept inside
    var oa = A_(lt, L[2] - 0.2, 0.6) * (1 - A_(lt, L[3] - 0.3, 0.6));
    if (oa > 0.01) {
      cell(g, 50, 25, 10, oa, { lt: lt, col: GOLD, fill: 'rgba(242,198,107,0.12)', nuc: false });
      for (i = 0; i < 18; i++) { var an = i / 18 * TAU + lt * 0.6; dot(g, 50 + Math.cos(an) * 6, 25 + Math.sin(an) * 6, 0.5, i % 2 ? GOLD : ICE, oa); }
      for (i = 0; i < 4; i++) { var p1 = ((lt * 0.8 + i / 4) % 1); dot(g, mix(20, 39, p1), 21 + i * 2.6, 0.55, GOLD, oa * (1 - Math.abs(p1 - 0.5) * 1.2)); }
      arrow(g, 18, 25, 38, 25, GOLD, 0.45, oa, 1.2);
      tx(g, '吃进能量', 26, 18, 2.0, GOLD, 'center', 800, SANS, oa); tx(g, '食物 · 阳光', 26, 32, 1.6, DIM, 'center', 700, SANS, oa);
      for (i = 0; i < 4; i++) { var p2 = ((lt * 0.8 + i / 4) % 1); dot(g, mix(61, 82, p2) + Math.sin(i * 5 + lt * 4) * 0.8, 21 + i * 2.6 + (p2 - 0.5) * 3 * (i - 1.5), 0.45, HOT, oa * (1 - p2)); }
      arrow(g, 62, 25, 82, 25, HOT, 0.45, oa, 1.2);
      tx(g, '排出混乱', 74, 18, 2.0, HOT, 'center', 800, SANS, oa); tx(g, '热量 · 废物', 74, 32, 1.6, DIM, 'center', 700, SANS, oa);
      chip(g, 50, 41, '生命是开放系统：里面可以一直保持有序', FG, A_(lt, L[2] + 0.8, 0.6) * oa);
    }
    // the unbroken line: from the first cells to you
    var ta = A_(lt, L[3] - 0.2, 0.7) * (1 - A_(lt, L[6] - 0.3, 0.6));
    if (ta > 0.01) {
      tx(g, '证据就在你身上', 50, 9, 2.4, GOLD, 'center', 900, SANS, ta * (1 - A_(lt, L[4] - 0.3, 0.4)));
      var x0 = 9, x1 = 86, y = 26, prog = eio(pr(lt, L[4], 3.4));
      // faint side branches: other lineages that split off
      r = rng(9);
      for (i = 0; i < 16; i++) { var bx = mix(x0, x1, r() * 0.9 + 0.03), up = r() < 0.5 ? -1 : 1, len = 4 + r() * 9; if ((bx - x0) / (x1 - x0) > prog) continue; polyline(g, [[bx, y], [bx + len * 0.6, y + up * len * 0.5], [bx + len, y + up * (len * 0.6 + 1)]], 'rgba(143,208,255,0.35)', 0.2, ta); }
      ln(g, x0, y, mix(x0, x1, prog), y, GOLD, 0.55, null, ta);
      glow(g, mix(x0, x1, prog), y, 4, 'rgba(242,198,107,0.9)', 0.6 * ta * (prog < 1 ? 1 : 0.4));
      // little dividing cells riding the line
      for (i = 0; i < 12; i++) { var cx = mix(x0, x1, (i + 0.5) / 12); if ((cx - x0) / (x1 - x0) > prog) continue; cell(g, cx, y, 1.3, ta * 0.9, { lt: lt + i, nuc: false, col: GOLD, fill: 'rgba(242,198,107,0.25)' }); }
      dot(g, x0, y, 1.0, ICE, ta); tx(g, '约 40 亿年前', x0, y + 4, 1.8, ICE, 'center', 800, SANS, ta * A_(lt, L[4], 0.5)); tx(g, '最早的细胞', x0, y + 6.6, 1.5, DIM, 'center', 700, SANS, ta * A_(lt, L[4], 0.5));
      var ya = A_(lt, L[4] + 3.2, 0.6) * ta;
      person2(g, x1 + 4, 34, 11, ya, { name: '你', nameCol: GOLD }, lt);
      tx(g, '今天', x1 + 4, 36.6, 1.6, GOLD, 'center', 800, SANS, ya);
      chip(g, 50, 40, '一代传一代，生命这条线从没断过', GOLD, A_(lt, L[5], 0.6) * ta, 'rgba(48,38,12,0.95)');
      tx(g, '每一代，都从一个“重置”过的年轻细胞重新开始', 50, 44.5, 1.7, FG, 'center', 700, SANS, A_(lt, L[5] + 1.0, 0.6) * ta);
    }
    // the conclusion
    var ca = A_(lt, L[6] - 0.1, 0.7);
    if (ca > 0.01) {
      glow(g, 50, 24, 26, 'rgba(242,198,107,0.6)', 0.3 * ca);
      tx(g, '物理定律', 50, 18, 4.2, FG, 'center', 900, SANS, ca);
      tx(g, '没有规定身体必须变老', 50, 26, 4.6, GOLD, 'center', 900, SANS, A_(lt, L[6] + 0.4, 0.6));
      tx(g, '修复，在原理上是允许的', 50, 34, 2.2, FG, 'center', 700, SANS, A_(lt, L[6] + 1.2, 0.6));
    }
  };

  // ---------- l9: natural selection only cares about passing genes on ----------
  DRAW.l9 = function (g, lt, L) {
    var i, out1 = 1 - A_(lt, L[2] - 0.3, 0.6);
    if (out1 > 0.01) {
      var A = A_(lt, 0.2, 0.7) * out1;
      cell(g, 50, 20, 7, A * (1 - A_(lt, L[1] - 0.3, 0.5)), { lt: lt, col: 'rgba(170,175,185,0.9)', fill: 'rgba(90,92,100,0.4)' });
      tx(g, '?', 50, 20, 6, GOLD, 'center', 900, SANS, A * (1 - A_(lt, L[1] - 0.3, 0.5)));
      tx(g, '为什么不一直修下去？', 50, 33, 2.6, FG, 'center', 900, SANS, A * (1 - A_(lt, L[1] - 0.3, 0.5)));
      var pa = A_(lt, L[1], 0.6) * out1;
      if (pa > 0.01) {
        person2(g, 24, 38, 16, pa, { name: '父母' }, lt);
        helix(g, 32, 48, 24, 1.2, lt, pa * A_(lt, L[1] + 0.6, 0.5), { spin: 1 });
        var hx = mix(32, 52, eo(pr(lt, L[1] + 0.8, 1.2)));
        arrow(g, 30, 30, hx + 2, 30, GOLD, 0.45, pa * A_(lt, L[1] + 0.8, 0.4), 1.1);
        for (i = 0; i < 3; i++) person2(g, 60 + i * 9, 38, 10, pa * A_(lt, L[1] + 1.4 + i * 0.25, 0.4), {}, lt);
        tx(g, '后代', 69, 41.5, 1.8, FG, 'center', 800, SANS, pa * A_(lt, L[1] + 1.6, 0.4));
        chip(g, 50, 9, '自然选择只看：基因能不能传下去', GOLD, A_(lt, L[1] + 0.3, 0.6) * out1, 'rgba(48,38,12,0.95)');
      }
    }
    // in the wild most animals die young: the survival curve, and the fading force of selection
    var wa = A_(lt, L[2] - 0.2, 0.6) * (1 - A_(lt, L[4] - 0.3, 0.6));
    if (wa > 0.01) {
      var x0 = 12, y0 = 42, w = 76, h = 30, X = function (u) { return x0 + u * w; }, Y = function (v) { return y0 - v * h; };
      axes(g, x0, y0, w, h, wa, '年龄 →', '');
      tx(g, '年轻', X(0.08), y0 + 2.2, 1.6, DIM, 'center', 700, SANS, wa); tx(g, '老年', X(0.9), y0 + 2.2, 1.6, DIM, 'center', 700, SANS, wa);
      var surv = function (u) { return Math.exp(-u * 4.2); }, prog = eo(pr(lt, L[2] + 0.2, 2.4));
      var r = rng(5);
      for (i = 0; i < 90; i++) {
        var u0 = r(), v0 = r(), death = -Math.log(1 - r() * 0.985) / 4.2, u = Math.min(prog, death);
        var alive = prog < death;
        dot(g, X(u * 0.98), Y(0.04 + v0 * 0.86 * surv(u)), 0.42, alive ? 'rgba(201,211,227,0.9)' : 'rgba(255,107,107,0.35)', wa * (alive ? 1 : 0.6));
      }
      var P = []; for (var uu = 0; uu <= prog; uu += 0.02) P.push([X(uu), Y(0.9 * surv(uu))]);
      polyline(g, P, ICE, 0.45, wa);
      var la = A_(lt, L[2] + 1.0, 0.5) * wa;
      tx(g, '天敌', X(0.12), Y(0.62), 1.8, INF, 'left', 800, SANS, la); tx(g, '饥饿', X(0.22), Y(0.46), 1.8, INF, 'left', 800, SANS, A_(lt, L[2] + 1.3, 0.5) * wa); tx(g, '疾病', X(0.32), Y(0.33), 1.8, INF, 'left', 800, SANS, A_(lt, L[2] + 1.6, 0.5) * wa);
      tx(g, '野外：活到老的很少', X(0.62), Y(0.3), 2.0, ICE, 'center', 800, SANS, A_(lt, L[2] + 2.0, 0.5) * wa);
      // selection gets weaker with age
      var sa = A_(lt, L[3], 0.6) * wa;
      var Q = []; for (var u2 = 0; u2 <= 1; u2 += 0.02) Q.push([X(u2), Y(0.95 * (u2 < 0.2 ? 1 : Math.exp(-(u2 - 0.2) * 4.5)))]);
      polyline(g, Q, GOLD, 0.4, sa, pr(lt, L[3], 1.2), [0.8, 0.5]);
      tx(g, '自然选择的力度', X(0.3), Y(0.93), 1.8, GOLD, 'left', 800, SANS, sa);
      var ga = A_(lt, L[3] + 1.2, 0.6) * wa;
      chip(g, X(0.82), Y(0.62), '晚年才出问题的基因', HOT, ga, 'rgba(56,24,14,0.95)');
      tx(g, '几乎不会被淘汰', X(0.82), Y(0.62) + 3.6, 1.8, FG, 'center', 800, SANS, ga);
    }
    // the energy budget
    var ba = A_(lt, L[4] - 0.2, 0.6);
    if (ba > 0.01) {
      tx(g, '身体的能量预算', 50, 11, 2.4, FG, 'center', 900, SANS, ba);
      var sp = eio(pr(lt, L[4] + 0.3, 1.4)), W = 64, x = 18;
      rbox(g, x, 18, W, 7, 1, 'rgba(238,242,248,0.4)', 0.2, 'rgba(14,20,32,0.9)', ba);
      var parts = [['长大', 0.36, LEAF], ['繁殖', 0.42, GOLD], ['修复', 0.22, ICE]], cx = x;
      for (i = 0; i < 3; i++) {
        var pw = W * parts[i][1] * sp; rbox(g, cx + 0.2, 18.4, Math.max(0, pw - 0.4), 6.2, 0.8, null, 0, parts[i][2], ba * 0.85);
        tx(g, parts[i][0], cx + pw / 2, 21.5, 2.0, '#0b0f18', 'center', 900, SANS, ba * sp); cx += pw;
      }
      tx(g, '修复要花能量；进化把更多押在了长大和繁殖上', 50, 31, 2.0, FG, 'center', 800, SANS, A_(lt, L[4] + 1.4, 0.6));
      tx(g, '（“可抛弃体细胞”理论，1977）', 50, 35, 1.6, DIM, 'center', 700, SANS, A_(lt, L[4] + 1.8, 0.6));
    }
  };

  // ---------- l10: some species repair better: whales, sharks, naked mole-rats ----------
  DRAW.l10 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.7), out1 = 1 - A_(lt, L[3] - 0.3, 0.6);
    if (out1 > 0.01) {
      var x0 = 30, w = 56, X = function (v) { return x0 + v / 520 * w; };
      var rows = [['小鼠', 4, null, 0.2, 13], ['人', 122, null, 0.2, 20.5], ['弓头鲸', 211, null, L[1], 29], ['格陵兰睡鲨', 392, [272, 512], L[2], 38.5]];
      ln(g, x0, 10, x0, 43, 'rgba(238,242,248,0.35)', 0.2, null, A * out1);
      [0, 100, 200, 300, 400, 500].forEach(function (v) { tx(g, String(v), X(v), 45.5, 1.5, DIM, 'center', 700, SANS, A * out1); ln(g, X(v), 43, X(v), 43.8, 'rgba(238,242,248,0.35)', 0.2, null, A * out1); });
      tx(g, '岁', X(520) + 1, 45.5, 1.5, DIM, 'left', 700, SANS, A * out1);
      for (i = 0; i < rows.length; i++) {
        var R = rows[i], ra = A_(lt, R[3], 0.5) * out1, gw = eo(pr(lt, R[3] + 0.1, 1.0));
        if (ra <= 0.01) continue;
        rbox(g, x0, R[4] - 1.4, Math.max(0.5, (X(R[1]) - x0) * gw), 2.8, 0.5, null, 0, i === 1 ? ICE : i === 3 ? GOLD : '#9fb3cc', ra);
        tx(g, R[0], x0 - 1.4, R[4], 2.0, FG, 'right', 800, SANS, ra);
        tx(g, (R[2] ? '约 ' : '') + R[1], X(R[1]) * 1 + (R[2] ? 0 : 1.2) + (R[2] ? 0 : 0), R[4] - (R[2] ? 3.2 : 0), 1.8, i === 3 ? GOLD : FG, R[2] ? 'center' : 'left', 900, SANS, ra * gw);
        if (R[2]) { ln(g, X(R[2][0]), R[4], X(R[2][1]), R[4], FG, 0.25, null, ra * gw); ln(g, X(R[2][0]), R[4] - 1, X(R[2][0]), R[4] + 1, FG, 0.25, null, ra * gw); ln(g, X(R[2][1]), R[4] - 1, X(R[2][1]), R[4] + 1, FG, 0.25, null, ra * gw); tx(g, '估算范围 272–512', X(392), R[4] + 2.6, 1.4, DIM, 'center', 700, SANS, ra * gw); }
      }
      mouseS(g, 13, 14.4, 0.8, A_(lt, 0.2, 0.5) * out1, null, false, lt);
      person2(g, 14, 22.5, 6, A_(lt, 0.2, 0.5) * out1, {}, lt);
      whaleS(g, 11, 29, 0.75, A_(lt, L[1], 0.5) * out1, null, lt);
      sharkS(g, 9.5, 38.5, 0.7, A_(lt, L[2], 0.5) * out1, null, lt);
    }
    // naked mole-rat: risk of death barely rises with age
    var ma = A_(lt, L[3] - 0.2, 0.6);
    if (ma > 0.01) {
      moleRatS(g, 20, 22, 2.4, ma, null, lt); tx(g, '裸鼹鼠', 20, 26, 2.2, '#e8b4a8', 'center', 900, SANS, ma);
      tx(g, '能活 37 年以上', 20, 29.6, 1.7, DIM, 'center', 700, SANS, ma);
      var x0 = 40, y0 = 40, w = 48, h = 26;
      axes(g, x0, y0, w, h, ma, '年龄 →', '每年的死亡风险');
      var P = [], Q = [], pg = pr(lt, L[3] + 0.3, 1.8);
      for (var u = 0; u <= 1.001; u += 0.02) { P.push([x0 + u * w, y0 - h * 0.92 * Math.pow(2, (u - 1) * 7)]); Q.push([x0 + u * w, y0 - h * 0.1]); }
      polyline(g, P, ICE, 0.45, ma, pg); polyline(g, Q, '#e8b4a8', 0.55, ma, pg);
      tx(g, '人：越老越陡', x0 + w * 0.72, y0 - h * 0.62, 1.8, ICE, 'right', 800, SANS, A_(lt, L[3] + 1.6, 0.5) * ma);
      tx(g, '裸鼹鼠：几乎是平的', x0 + w * 0.5, y0 - h * 0.1 - 2.2, 1.8, '#e8b4a8', 'right', 800, SANS, A_(lt, L[3] + 2.0, 0.5) * ma);
      chip(g, 50, 46.5, '衰老的快慢，可以被基因改变', GOLD, A_(lt, L[4], 0.6), 'rgba(48,38,12,0.95)');
    }
  };

  // ---------- l11: the brain: neurons are as old as you; keep it, slow it down ----------
  DRAW.l11 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.7), out1 = 1 - A_(lt, L[4] - 0.3, 0.6);
    if (out1 > 0.01) {
      brainS(g, 26, 21, 1.6, A * out1, lt, 0.5 + 0.5 * A_(lt, L[0], 1.0));
      tx(g, '大脑', 26, 33.5, 2.4, GOLD, 'center', 900, SANS, A * out1);
      var rows = [['肠道内壁细胞', '几天就换一批', 0.08, LEAF], ['红细胞', '约 4 个月', 0.3, '#ff8f8f'], ['大脑皮层神经元', '基本不再更新', 1.0, GOLD]];
      for (i = 0; i < 3; i++) {
        var ra = A_(lt, L[1] + i * 0.7, 0.5) * out1, y = 15 + i * 9, bw = 34 * rows[i][2] * eo(pr(lt, L[1] + i * 0.7 + 0.2, 0.9));
        tx(g, rows[i][0], 50, y, 2.0, FG, 'left', 800, SANS, ra);
        rbox(g, 50, y + 2, Math.max(0.4, bw), 2, 0.6, null, 0, rows[i][3], ra);
        tx(g, rows[i][1], 51 + Math.max(0.4, bw) + (i === 2 ? -bw : 0), y + (i === 2 ? 5.6 : 3), 1.7, rows[i][3], 'left', 800, SANS, ra);
        if (i < 2) { var fl = (lt * (i === 0 ? 2 : 0.6)) % 1; dot(g, 50 + bw, y + 3, 0.6, '#fff', ra * (1 - fl)); }
      }
      var na = A_(lt, L[1] + 1.8, 0.6) * out1;
      chip(g, 26, 40, '几乎都和你一样大', GOLD, na, 'rgba(48,38,12,0.95)');
      var wa = A_(lt, L[3], 0.6) * out1;
      if (wa > 0.01) {
        // a wrench taps the brain: keep it, don't swap it
        g.save(); g.globalAlpha *= wa; g.translate(38, 13); g.rotate(-0.7 + Math.sin(lt * 4) * 0.15); g.fillStyle = '#c9d3e3';
        g.fillRect(-0.5, 0, 1, 6); g.beginPath(); g.arc(0, 0, 1.6, 0, TAU); g.fill(); g.fillStyle = '#0b0f18'; g.fillRect(-0.5, -1.8, 1, 1.8); g.restore();
        chip(g, 26, 46, '换不了，只能保养', ICE, wa);
      }
    }
    // the realistic goal: slow the whole body down
    var ga = A_(lt, L[4] - 0.2, 0.6);
    if (ga > 0.01) {
      person2(g, 34, 42, 26, ga, {}, lt);
      var sp = 1 - 0.6 * eio(pr(lt, L[5], 2.0));
      ring(g, 66, 25, 9, GOLD, 0.45, ga); for (i = 0; i < 12; i++) { var an = i / 12 * TAU; ln(g, 66 + Math.cos(an) * 7.8, 25 + Math.sin(an) * 7.8, 66 + Math.cos(an) * 8.8, 25 + Math.sin(an) * 8.8, GOLD, 0.25, null, ga); }
      var hand = -Math.PI / 2 + lt * 1.6 * sp;
      ln(g, 66, 25, 66 + Math.cos(hand) * 7, 25 + Math.sin(hand) * 7, FG, 0.45, null, ga); dot(g, 66, 25, 0.8, GOLD, ga);
      tx(g, '衰老的时钟', 66, 38, 2.2, GOLD, 'center', 900, SANS, ga);
      chip(g, 50, 46.5, '最现实的目标：整个身体，老得慢一点', GOLD, A_(lt, L[5], 0.6), 'rgba(48,38,12,0.95)');
    }
  };

  // ---------- l12: gains in life expectancy have slowed; cure one disease, another follows; aim at the root ----------
  DRAW.l12 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.7), out1 = 1 - A_(lt, L[3] - 0.3, 0.6);
    if (out1 > 0.01) {
      chip(g, 50, 7.5, '《自然 · 衰老》 2024', GOLD, A * out1, 'rgba(48,38,12,0.95)');
      var x0 = 14, y0 = 42, w = 70, h = 28, X = function (yr) { return x0 + (yr - 1950) / 70 * w; }, Y = function (v) { return y0 - (v - 55) / 33 * h; };
      var ca = A_(lt, L[1] - 0.2, 0.6) * out1;
      axes(g, x0, y0, w, h, ca, '年份', '平均寿命（岁）');
      [1950, 1970, 1990, 2010].forEach(function (yr) { tx(g, String(yr), X(yr), y0 + 2.2, 1.5, DIM, 'center', 700, SANS, ca); });
      [60, 70, 80].forEach(function (v) { tx(g, String(v), x0 - 1, Y(v), 1.5, DIM, 'right', 700, SANS, ca); ln(g, x0, Y(v), x0 + w, Y(v), 'rgba(238,242,248,0.08)', 0.15, null, ca); });
      var D = [[1950, 59.2], [1960, 67.8], [1970, 72.0], [1980, 76.1], [1990, 78.9], [2000, 81.2], [2010, 82.9], [2019, 84.4]];
      polyline(g, D.map(function (q) { return [X(q[0]), Y(q[1])]; }), ICE, 0.55, ca, pr(lt, L[1], 2.2));
      tx(g, '日本（最长寿的国家之一）', X(1990), Y(84) - 3, 1.7, ICE, 'center', 800, SANS, A_(lt, L[1] + 1.6, 0.5) * out1);
      var sa = A_(lt, L[2], 0.6) * out1;
      arrow(g, X(1952), Y(60.5) - 3, X(1972), Y(72.5) - 3, GOLD, 0.4, sa, 1); tx(g, '每 10 年 +4~9 岁', X(1958), Y(70) - 3.4, 1.7, GOLD, 'center', 800, SANS, sa);
      arrow(g, X(1992), Y(79.5) - 3, X(2018), Y(84.3) - 3, HOT, 0.4, A_(lt, L[2] + 0.6, 0.6) * out1, 1); tx(g, '每 10 年 +1.5~2.3 岁', X(2005), Y(77) + 2, 1.7, HOT, 'center', 800, SANS, A_(lt, L[2] + 0.6, 0.6) * out1);
      tx(g, '数值为近似值', x0 + w, y0 + 4.6, 1.3, DIM, 'right', 700, SANS, ca);
    }
    // whack-a-mole, then the root
    var wa = A_(lt, L[3] - 0.2, 0.6) * (1 - A_(lt, L[4] - 0.3, 0.6));
    if (wa > 0.01) {
      var ds = ['心脏病', '癌症', '阿尔茨海默病'];
      for (i = 0; i < 3; i++) {
        var t0 = L[3] + i * 0.8, da = A_(lt, t0, 0.3) * wa, cur = lt < t0 + 0.8 || i === 2;
        tile(g, 25 + i * 25, 22, 18, 5, ds[i], i === 2 ? HOT : '#c9d3e3', da);
        if (i < 2) { var xa = A_(lt, t0 + 0.6, 0.3) * wa; ln(g, 17 + i * 25, 20, 33 + i * 25, 24, LEAF, 0.4, null, xa); tx(g, '治好了', 25 + i * 25, 28, 1.7, LEAF, 'center', 800, SANS, xa); }
        if (i < 2) arrow(g, 35 + i * 25, 22, 39 + i * 25, 22, 'rgba(238,242,248,0.5)', 0.3, A_(lt, t0 + 0.7, 0.3) * wa, 0.8);
      }
      tx(g, '和衰老有关的病，一个接一个', 50, 36, 2.2, FG, 'center', 800, SANS, A_(lt, L[3] + 2.2, 0.6) * wa);
      person2(g, 50, 47, 0, 0, {}, lt);
    }
    var ra = A_(lt, L[4] - 0.2, 0.6);
    if (ra > 0.01) {
      // a tree: diseases are the branches, ageing is the root
      ln(g, 50, 34, 50, 20, '#9a7a5a', 1.2, null, ra);
      var br = [['心脏病', 26, 12], ['癌症', 40, 9], ['阿尔茨海默病', 60, 9], ['糖尿病', 74, 12], ['骨质疏松', 50, 6]];
      for (i = 0; i < br.length; i++) { ln(g, 50, 21, br[i][1], br[i][2] + 1.5, '#9a7a5a', 0.5, null, ra); tile(g, br[i][1], br[i][2], i === 2 ? 15 : 11, 3.4, br[i][0], '#c9d3e3', ra); }
      for (i = 0; i < 5; i++) ln(g, 50, 34, 50 + (i - 2) * 5, 38 + Math.abs(i - 2) * 0.6, '#9a7a5a', 0.5, null, ra);
      var rt = A_(lt, L[5], 0.6);
      rbox(g, 38, 36.5, 24, 5, 1, GOLD, 0.35, 'rgba(48,38,12,0.95)', rt);
      tx(g, '根：衰老本身', 50, 39, 2.2, GOLD, 'center', 900, SANS, rt);
      glow(g, 50, 39, 10, 'rgba(242,198,107,0.9)', 0.4 * rt * (0.7 + 0.3 * Math.sin(lt * 4)));
      arrow(g, 76, 44, 63, 40, GOLD, 0.45, A_(lt, L[5] + 0.4, 0.5), 1.1);
      tx(g, '直接减缓衰老', 78, 45.5, 1.8, GOLD, 'left', 800, SANS, A_(lt, L[5] + 0.4, 0.5));
    }
  };

  // ---------- l13: what is proven in people: healthy habits; calorie restriction slows the pace of ageing ----------
  DRAW.l13 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.7), out1 = 1 - A_(lt, L[4] - 0.3, 0.6);
    chip(g, 50, 7.5, '已经在人身上证实', LEAF, A * out1, 'rgba(14,44,30,0.95)');
    if (out1 > 0.01) {
      var ca = A_(lt, L[1], 0.6) * out1;
      if (ca > 0.01) {
        var r = rng(2);
        for (i = 0; i < 120; i++) dot(g, 10 + (i % 15) * 1.6, 13 + Math.floor(i / 15) * 1.6, 0.45, 'rgba(201,211,227,' + (0.5 + 0.4 * r()).toFixed(2) + ')', ca * A_(lt, L[1] + i * 0.006, 0.2));
        tx(g, '约 12.3 万名美国人', 21.5, 28.5, 1.9, FG, 'center', 800, SANS, ca); tx(g, '追踪约 30 年', 21.5, 31.5, 1.6, DIM, 'center', 700, SANS, ca);
      }
      var habits = ['不吸烟', '体重正常', '每天运动 ≥30 分钟', '饮食健康', '不过量饮酒'];
      for (i = 0; i < 5; i++) {
        var ha = A_(lt, L[2] + i * 0.3, 0.4) * out1;
        tile(g, 50, 13.5 + i * 4.2, 18, 3.4, habits[i], LEAF, ha); checkMark(g, 61, 13.5 + i * 4.2, 0.9, LEAF, ha);
      }
      tx(g, '50 岁时', 50, 36.5, 1.7, DIM, 'center', 700, SANS, A_(lt, L[2], 0.5) * out1);
      var ba = A_(lt, L[3], 0.5) * out1;
      if (ba > 0.01) {
        var g1 = eo(pr(lt, L[3] + 0.1, 1.0));
        tx(g, '女性', 72, 42.6, 2.0, '#f6a8c8', 'center', 800, SANS, ba); tx(g, '男性', 84, 42.6, 2.0, ICE, 'center', 800, SANS, ba); tx(g, '平均多活', 78, 12.5, 1.8, DIM, 'center', 700, SANS, ba);
        rbox(g, 69, 40 - 18 * g1, 6, 18 * g1, 0.5, null, 0, '#f6a8c8', ba); rbox(g, 81, 40 - 15.6 * g1, 6, 15.6 * g1, 0.5, null, 0, ICE, ba);
        tx(g, '+14 年', 72, 40 - 18 * g1 - 2, 2.2, '#f6a8c8', 'center', 900, SANS, ba * g1); tx(g, '+12 年', 84, 40 - 15.6 * g1 - 2, 2.2, ICE, 'center', 900, SANS, ba * g1);
        ln(g, 66, 40, 90, 40, 'rgba(238,242,248,0.4)', 0.2, null, ba);
      }
    }
    // CALERIE: about 12% fewer calories for two years; pace of ageing 2-3% slower
    var ka = A_(lt, L[4] - 0.2, 0.6);
    if (ka > 0.01) {
      chip(g, 50, 7.5, '2023 · 随机对照试验 · 两年', GOLD, ka, 'rgba(48,38,12,0.95)');
      var pa = A_(lt, L[5], 0.6), cut = 0.12 * eo(pr(lt, L[5] + 0.3, 0.8));
      if (pa > 0.01) {
        ring(g, 30, 26, 10.5, 'rgba(238,242,248,0.5)', 0.3, pa);
        g.save(); g.globalAlpha *= pa; g.fillStyle = 'rgba(242,198,107,0.85)'; g.beginPath(); g.moveTo(30, 26); g.arc(30, 26, 9, -Math.PI / 2 + cut * TAU, -Math.PI / 2 + TAU); g.closePath(); g.fill();
        g.fillStyle = 'rgba(242,198,107,0.25)'; g.beginPath(); g.moveTo(30 + Math.cos(-Math.PI / 2 + cut * TAU / 2) * 2, 26 + Math.sin(-Math.PI / 2 + cut * TAU / 2) * 2); g.arc(30 + Math.cos(-Math.PI / 2 + cut * TAU / 2) * 2, 26 + Math.sin(-Math.PI / 2 + cut * TAU / 2) * 2, 9, -Math.PI / 2, -Math.PI / 2 + cut * TAU); g.closePath(); g.fill(); g.restore();
        tx(g, '少吃约 12%', 30, 40, 2.2, GOLD, 'center', 900, SANS, pa); tx(g, '健康成年人 · 每天的热量', 30, 43.4, 1.6, DIM, 'center', 700, SANS, pa);
      }
      var sa = A_(lt, L[6], 0.6);
      if (sa > 0.01) {
        var cx = 70, cy = 30, R = 11;
        arcl(g, cx, cy, R, Math.PI, TAU, 'rgba(238,242,248,0.35)', 1.2, sa);
        arcl(g, cx, cy, R, Math.PI, Math.PI * 1.75, 'rgba(98,214,160,0.6)', 1.2, sa); arcl(g, cx, cy, R, Math.PI * 1.75, TAU, 'rgba(255,157,110,0.6)', 1.2, sa);
        var ang = Math.PI * (1.62 - 0.12 * eio(pr(lt, L[6] + 0.3, 1.4)));
        ln(g, cx, cy, cx + Math.cos(ang) * (R - 1.5), cy + Math.sin(ang) * (R - 1.5), FG, 0.5, null, sa); dot(g, cx, cy, 1, GOLD, sa);
        tx(g, '衰老速度', cx, cy + 4, 2.2, FG, 'center', 900, SANS, sa);
        chip(g, cx, cy + 9, '慢了 2%–3%', LEAF, A_(lt, L[6] + 1.4, 0.5), 'rgba(14,44,30,0.95)');
        tx(g, '用血液里的表观遗传标记测量', cx, cy + 13.4, 1.5, DIM, 'center', 700, SANS, A_(lt, L[6] + 1.6, 0.5));
      }
    }
  };
