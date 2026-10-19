  // ================= Lifespan: scenes l14-l19 =================
  function survCurve(g, x0, y0, w, h, med, col, a, frac) {
    var P = []; for (var u = 0; u <= 1.001; u += 0.01) { var age = u * 1.6, s = 1 / (1 + Math.exp((age - med) * 9)); P.push([x0 + u * w, y0 - h * s]); }
    polyline(g, P, col, 0.55, a, frac);
  }
  // ---------- l14: mice: rapamycin late in life ~10%; blocking IL-11 ~25% ----------
  DRAW.l14 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.7), out1 = 1 - A_(lt, L[5] - 0.3, 0.6);
    if (out1 > 0.01) {
      for (i = 0; i < 4; i++) mouseS(g, 10 + i * 8.5, 15, 0.9, A * out1 * A_(lt, 0.2 + i * 0.15, 0.4), null, false, lt + i);
      tx(g, '小鼠实验', 22, 8.5, 2.2, FG, 'center', 900, SANS, A * out1);
      var x0 = 46, y0 = 40, w = 42, h = 26;
      var ca = A_(lt, L[1] - 0.2, 0.6) * out1;
      axes(g, x0, y0, w, h, ca, '年龄 →', '还活着的比例');
      survCurve(g, x0, y0, w, h, 0.75, 'rgba(201,211,227,0.85)', ca, pr(lt, L[1], 1.2));
      tx(g, '对照组', x0 + w * 0.36, y0 - h * 0.35, 1.6, DIM, 'right', 800, SANS, A_(lt, L[1] + 0.8, 0.4) * out1);
      // rapamycin
      var ra = A_(lt, L[1], 0.5) * out1 * (1 - A_(lt, L[3] - 0.3, 0.5));
      capsule(g, 20, 27, 1.8, ra, '#8fd0ff', '#eef2f8'); tx(g, '雷帕霉素', 20, 31.5, 2.0, ICE, 'center', 900, SANS, ra);
      tx(g, '开始时 ≈ 人的 60 岁', 20, 34.8, 1.6, DIM, 'center', 700, SANS, ra);
      var sa = A_(lt, L[2], 0.5) * out1;
      survCurve(g, x0, y0, w, h, 0.75 * 1.1, ICE, sa, pr(lt, L[2], 1.2));
      chip(g, x0 + w * 0.62, y0 - h * 0.86, '多活约一成', ICE, A_(lt, L[2] + 1.0, 0.5) * out1);
      // IL-11
      var ia = A_(lt, L[3], 0.5) * out1;
      if (ia > 0.01) {
        var bx = 20, by = 40;
        for (i = 0; i < 4; i++) { var px = bx - 7 + i * 4.6 + Math.sin(lt * 2 + i) * 0.5, py = by - 1 + Math.cos(lt * 1.7 + i) * 0.4; dot(g, px, py, 0.8, INF, ia); }
        g.save(); g.globalAlpha *= ia; g.strokeStyle = GOLD; g.lineWidth = 0.45;
        for (i = 0; i < 2; i++) { var yx = bx - 4.7 + i * 9.2, yy = by - 1 - 3.2 * eo(pr(lt, L[3] + 0.4, 0.6)); g.beginPath(); g.moveTo(yx, yy + 3.6); g.lineTo(yx, yy + 1.6); g.lineTo(yx - 1.2, yy + 0.2); g.moveTo(yx, yy + 1.6); g.lineTo(yx + 1.2, yy + 0.2); g.stroke(); }
        g.restore();
        tx(g, '阻断 IL-11', bx, by + 4, 1.9, GOLD, 'center', 900, SANS, ia);
        chip(g, bx, by - 7.5, '《自然》 2024', GOLD, ia, 'rgba(48,38,12,0.95)');
        var ka = A_(lt, L[4], 0.5) * out1;
        survCurve(g, x0, y0, w, h, 0.75 * 1.25, GOLD, ka, pr(lt, L[4], 1.2));
        chip(g, x0 + w * 0.82, y0 - h * 0.62, '+约 25%', GOLD, A_(lt, L[4] + 1.0, 0.5) * out1, 'rgba(48,38,12,0.95)');
        tx(g, '75 周龄才开始用药', x0 + w * 0.5, y0 + 4.4, 1.5, DIM, 'center', 700, SANS, ka);
      }
    }
    var ma = A_(lt, L[5] - 0.2, 0.6);
    if (ma > 0.01) {
      mouseS(g, 30, 30, 2.6, ma, null, false, lt);
      tx(g, '≠', 50, 26, 7, FG, 'center', 900, SANS, ma);
      person2(g, 70, 36, 18, ma, {}, lt);
      chip(g, 50, 42, '还要在人身上验证', GOLD, A_(lt, L[5] + 0.6, 0.5), 'rgba(48,38,12,0.95)');
    }
  };

  // ---------- l15: dogs: a lifespan drug moving through FDA; 1300 dogs in a blinded trial ----------
  DRAW.l15 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.7), out1 = 1 - A_(lt, L[3] - 0.3, 0.6);
    if (out1 > 0.01) {
      dogS(g, 22, 40, 2.2, A * out1, '#cdbb98', false, lt);
      tx(g, '老年犬', 22, 43.5, 2.0, FG, 'center', 800, SANS, A * out1);
      var pa = A_(lt, L[1], 0.5) * out1;
      capsule(g, 22, 11, 2.0, pa, '#f2c66b', '#eef2f8'); tx(g, 'LOY-002 · Loyal 公司', 22, 16, 1.8, GOLD, 'center', 800, SANS, pa);
      var items = [['有效性的合理预期', '2025 年 2 月', 1], ['安全性', '2026 年 1 月', 1], ['生产质量', '尚待提交', 0]];
      var ca = A_(lt, L[2] - 0.2, 0.5) * out1;
      if (ca > 0.01) {
        rbox(g, 44, 11, 44, 27, 0.8, 'rgba(238,242,248,0.3)', 0.18, 'rgba(14,20,32,0.92)', ca);
        tx(g, 'FDA 兽药中心 · 有条件批准的三项审查', 66, 14.5, 1.8, FG, 'center', 800, SANS, ca);
        for (i = 0; i < 3; i++) {
          var ia = A_(lt, L[2] + 0.3 + i * 0.5, 0.4) * out1, y = 20 + i * 6;
          rbox(g, 47, y - 1.4, 2.8, 2.8, 0.4, items[i][2] ? LEAF : DIM, 0.25, null, ia);
          if (items[i][2]) checkMark(g, 48.4, y, 0.9, LEAF, ia);
          tx(g, items[i][0], 52, y, 1.9, items[i][2] ? FG : DIM, 'left', 800, SANS, ia);
          tx(g, items[i][1], 86, y, 1.6, items[i][2] ? LEAF : DIM, 'right', 700, SANS, ia);
        }
      }
    }
    var ta = A_(lt, L[3] - 0.2, 0.6);
    if (ta > 0.01) {
      tx(g, '约 1300 只老年犬 · 双盲试验', 50, 8.5, 2.4, FG, 'center', 900, SANS, ta);
      var r = rng(6), shown = Math.round(1300 * eo(pr(lt, L[3], 1.4)));
      for (i = 0; i < shown; i++) {
        var cx = 14 + (i % 52) * 1.4, cy = 13 + Math.floor(i / 52) * 1.05, isDrug = r() < 0.5;
        dot(g, cx, cy, 0.33, 'rgba(201,211,227,0.75)', ta);
      }
      tx(g, '谁吃药、谁吃安慰剂，主人和兽医都不知道', 50, 41.5, 1.8, DIM, 'center', 700, SANS, A_(lt, L[3] + 1.2, 0.5) * ta);
      var ha = A_(lt, L[4], 0.6);
      chip(g, 50, 46, '能不能真的延长寿命？结果还要等几年', GOLD, ha, 'rgba(48,38,12,0.95)');
    }
  };

  // ---------- l16: reprogramming: Yamanaka factors, partial reset, mouse vision, first human trial ----------
  DRAW.l16 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.7);
    var F = [['O', '#ff9d6e'], ['S', '#8fd0ff'], ['K', '#62d6a0'], ['M', '#c9b8ff']];
    var out1 = 1 - A_(lt, L[3] - 0.3, 0.6);
    if (out1 > 0.01) {
      tx(g, '重编程', 50, 9, 3.6, GOLD, 'center', 900, SANS, A * out1);
      var ya = A_(lt, L[1], 0.6) * out1;
      person2(g, 14, 42, 18, ya, { name: '山中伸弥', nameCol: GOLD, col: '#d6dde8' }, lt);
      tx(g, '2006 · 2012 年诺贝尔奖', 14, 45.6, 1.5, DIM, 'center', 700, SANS, ya);
      // four factors fly into an adult skin cell, which turns into a round, glowing stem cell
      var fa = A_(lt, L[2], 0.5) * out1, fly = eio(pr(lt, L[2] + 0.2, 1.2)), morph = eio(pr(lt, L[2] + 1.4, 1.4));
      if (fa > 0.01) {
        for (i = 0; i < 4; i++) {
          var sx = 30 + i * 6, sy = 16, ex = 56 + Math.cos(i * 1.6) * 3, ey = 28 + Math.sin(i * 1.6) * 3;
          var x = mix(sx, ex, fly), y = mix(sy, ey, fly) - Math.sin(fly * Math.PI) * 3;
          dot(g, x, y, 1.3, F[i][1], fa * (1 - morph)); tx(g, F[i][0], x, y + 0.1, 1.5, '#0b0f18', 'center', 900, SANS, fa * (1 - morph));
        }
        tx(g, '4 个基因', 39, 12, 1.8, FG, 'center', 800, SANS, fa * (1 - fly));
        var sq = 1 - morph;
        g.save(); g.globalAlpha *= fa;
        rbox(g, 56 - 7, 28 - 4.5 * (1 + morph * 0.4), 14, 9 * (1 + morph * 0.4), 1 + 5.5 * morph, morph > 0.5 ? LEAF : CELLC, 0.35, morph > 0.5 ? 'rgba(98,214,160,0.25)' : 'rgba(40,70,110,0.35)', 1);
        g.restore();
        glow(g, 56, 28, 9, 'rgba(98,214,160,0.9)', 0.45 * morph * fa);
        tx(g, '成年细胞', 56, 37, 1.8, FG, 'center', 800, SANS, fa * sq);
        tx(g, '干细胞', 56, 37.5, 2.2, LEAF, 'center', 900, SANS, fa * morph);
        arrow(g, 66, 28, 72, 28, 'rgba(238,242,248,0.5)', 0.3, fa * morph, 0.9);
        tx(g, '什么细胞都能变', 82, 28, 1.8, LEAF, 'center', 800, SANS, fa * morph);
      }
    }
    // partial: three factors, briefly; the tags reset; the cell stays itself
    var pa = A_(lt, L[3] - 0.2, 0.6) * (1 - A_(lt, L[6] - 0.3, 0.6));
    if (pa > 0.01) {
      for (i = 0; i < 4; i++) {
        var fx = 20 + i * 5.5; dot(g, fx, 12, 1.3, F[i][1], pa * (i === 3 ? 0.35 : 1)); tx(g, F[i][0], fx, 12.1, 1.5, '#0b0f18', 'center', 900, SANS, pa);
      }
      var xa = A_(lt, L[3] + 0.3, 0.4) * pa; ln(g, 34.6, 10, 38.6, 14, INF, 0.45, null, xa); ln(g, 38.6, 10, 34.6, 14, INF, 0.45, null, xa);
      tx(g, '只用 3 个', 26, 16.5, 1.7, FG, 'center', 800, SANS, pa);
      // a short "on" window
      var on = lt > L[3] + 0.8 && lt < L[3] + 2.6;
      rbox(g, 48, 10.6, 22, 2.8, 1.4, 'rgba(238,242,248,0.4)', 0.2, 'rgba(14,20,32,0.9)', pa);
      rbox(g, 48.4, 11, 21.2 * clamp((lt - L[3] - 0.8) / 1.8), 2, 1, null, 0, on ? GOLD : 'rgba(242,198,107,0.35)', pa);
      tx(g, on ? '开' : '只开一小会儿', 74, 12, 1.7, on ? GOLD : FG, 'left', 800, SANS, pa);
      // the instruction tags tidy up
      var tidy = eio(pr(lt, L[4] + 0.2, 2.2));
      helix(g, 20, 80, 24, 1.6, lt, pa * A_(lt, L[3] + 0.6, 0.5), { spin: 0.5, marks: function (k) { var rr = rng(k * 13 + 1)(); var young = k % 3 === 1, old = rr < 0.4; return (tidy > 0.5 ? young : old) ? (tidy > 0.5 ? GOLD : '#ff6bd0') : null; } });
      tx(g, tidy > 0.5 ? '标记回到年轻时的样子' : '老细胞：乱掉的标记', 50, 30, 1.9, tidy > 0.5 ? GOLD : '#ff8fdc', 'center', 800, SANS, pa * A_(lt, L[3] + 0.6, 0.5));
      var ca = A_(lt, L[5], 0.6) * pa;
      neuron(g, 42, 39, 0.9, ca, GOLD, lt); tx(g, '还是原来的神经细胞', 58, 38, 1.9, FG, 'left', 800, SANS, ca); tx(g, '不会变回干细胞', 58, 41.4, 1.6, DIM, 'left', 700, SANS, ca);
    }
    // 2020: old mice see again
    var ma = A_(lt, L[6] - 0.2, 0.6) * (1 - A_(lt, L[7] - 0.3, 0.6));
    if (ma > 0.01) {
      mouseS(g, 34, 34, 3.2, ma, null, false, lt);
      var vis = A_(lt, L[6] + 1.0, 1.2);
      glow(g, 43.6, 28.4, 3 + 3 * vis, 'rgba(242,198,107,0.9)', 0.7 * vis * ma);
      for (i = 0; i < 3; i++) { var rr2 = ((lt - L[6]) * 4 + i * 4) % 12; if (lt > L[6] + 1) arcl(g, 44, 28.4, 2 + rr2, -0.5, 0.5, GOLD, 0.3, ma * vis * (1 - rr2 / 12)); }
      tx(g, '老年小鼠：视力恢复', 66, 26, 2.4, GOLD, 'center', 900, SANS, ma * A_(lt, L[6] + 0.8, 0.5));
      chip(g, 66, 31.5, '《自然》 2020', GOLD, ma * A_(lt, L[6] + 1.0, 0.5), 'rgba(48,38,12,0.95)');
    }
    // 2026: the first human trial, in the eye
    var ha = A_(lt, L[7] - 0.2, 0.6);
    if (ha > 0.01) {
      eyeIcon(g, 34, 25, 2.6, ha, A_(lt, L[7] + 1.2, 1.2), lt);
      g.save(); g.globalAlpha *= ha; var nx = mix(52, 42, eo(pr(lt, L[7] + 0.3, 0.8)));
      ln(g, nx, 17, nx + 10, 11, '#c9d3e3', 0.45, null, 1); ln(g, nx - 3, 18.8, nx, 17, '#eef2f8', 0.18, null, 1); g.restore();
      tx(g, '2026 · ER-100', 70, 18, 3.0, GOLD, 'center', 900, SANS, ha);
      tx(g, '第一期人体临床试验', 70, 23, 2.2, FG, 'center', 800, SANS, ha);
      tx(g, '先测安全性，再看视力', 70, 26.6, 1.6, DIM, 'center', 700, SANS, A_(lt, L[7] + 0.8, 0.5) * ha);
      var oa = A_(lt, L[8], 0.6);
      polyline(g, [[39, 26], [46, 32], [54, 35], [62, 36]], GOLD, 0.6, oa, pr(lt, L[8], 1.0));
      tx(g, '视神经', 64, 36, 1.8, GOLD, 'left', 800, SANS, oa);
      chip(g, 50, 44, '青光眼 · 缺血性视神经病变', GOLD, A_(lt, L[8] + 0.6, 0.5), 'rgba(48,38,12,0.95)');
    }
  };

  // ---------- l17: replacing parts: a gene-edited pig kidney, 271 days; the first formal trial ----------
  DRAW.l17 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.7), out1 = 1 - A_(lt, L[3] - 0.3, 0.6);
    if (out1 > 0.01) {
      person2(g, 24, 44, 32, A * out1, { col: 'rgba(201,211,227,0.5)' }, lt);
      var ka = A_(lt, L[1] + 0.6, 0.6) * out1;
      kidney(g, 21.4, 34.5, 0.8, A * out1 * 0.6, '#7a4040'); kidney(g, 26.6, 34.5, 0.8, A * out1, '#d86a6a');
      glow(g, 26.6, 34.5, 4, 'rgba(255,140,140,0.9)', 0.5 * ka);
      var pa = A_(lt, L[1], 0.6) * out1;
      pigS(g, 55, 30, 2.0, pa);
      helix(g, 45, 65, 36, 1.0, lt, pa * A_(lt, L[1] + 0.4, 0.5), { spin: 0.8, marks: function (k) { return k % 4 === 2 ? LEAF : null; } });
      tx(g, '基因改造', 55, 40, 1.8, LEAF, 'center', 800, SANS, pa * A_(lt, L[1] + 0.4, 0.5));
      var fx = mix(54, 27, eio(pr(lt, L[1] + 0.8, 1.2))), fy = mix(24, 34.5, eio(pr(lt, L[1] + 0.8, 1.2)));
      if (lt < L[1] + 2.0) kidney(g, fx, fy, 0.9, pa * A_(lt, L[1] + 0.6, 0.3), '#e88080');
      var ca = A_(lt, L[2], 0.5) * out1, n = Math.round(271 * eo(pr(lt, L[2] + 0.2, 2.0)));
      if (ca > 0.01) {
        rbox(g, 70, 12, 22, 12, 0.6, 'rgba(238,242,248,0.3)', 0.15, 'rgba(14,20,32,0.92)', ca);
        tx(g, String(n), 81, 17, 4.4, GOLD, 'center', 900, SANS, ca); tx(g, '天 · 人体内的纪录', 81, 21.4, 1.6, FG, 'center', 700, SANS, ca);
      }
    }
    var ta = A_(lt, L[3] - 0.2, 0.6);
    if (ta > 0.01) {
      tx(g, '2025 年 11 月', 50, 10, 3, GOLD, 'center', 900, SANS, ta);
      rbox(g, 30, 15, 40, 22, 0.8, 'rgba(238,242,248,0.35)', 0.2, 'rgba(14,20,32,0.92)', ta);
      // a little hospital cross
      rbox(g, 47.5, 18, 5, 1.6, 0.2, null, 0, INF, ta); rbox(g, 49.2, 16.3, 1.6, 5, 0.2, null, 0, INF, ta);
      tx(g, '美国 · 第一项正式的猪肾移植临床试验', 50, 26, 1.9, FG, 'center', 800, SANS, A_(lt, L[4], 0.5) * ta);
      var fa = A_(lt, L[5], 0.5);
      checkMark(g, 44, 31.6, 1.2, LEAF, fa); tx(g, '第一例手术完成', 46.5, 31.6, 2.2, LEAF, 'left', 900, SANS, fa);
      kidney(g, 22, 26, 1.2, ta * 0.9); pigS(g, 80, 30, 1.4, ta * 0.9);
      tx(g, '目标：缓解器官短缺', 50, 42, 1.8, DIM, 'center', 700, SANS, A_(lt, L[5] + 0.8, 0.5));
    }
  };

  // ---------- l18: not immortality; slow ageing so 80 and 90 stay healthy; trials step by step ----------
  DRAW.l18 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.7), out1 = 1 - A_(lt, L[1] - 0.3, 0.6);
    if (out1 > 0.01) {
      tile(g, 34, 22, 18, 6, '永生', '#c9d3e3', A * out1); tile(g, 66, 22, 30, 6, '一夜之间活到 200 岁', '#c9d3e3', A_(lt, 0.8, 0.5) * out1);
      bigX(g, 34, 22, 2.6, 0.8 * A_(lt, 0.9, 0.3) * out1); bigX(g, 66, 22, 2.6, 0.8 * A_(lt, 1.6, 0.3) * out1);
    }
    var ha = A_(lt, L[1] - 0.2, 0.6) * (1 - A_(lt, L[3] - 0.3, 0.6));
    if (ha > 0.01) {
      var x0 = 14, y0 = 40, w = 56, h = 26, X = function (age) { return x0 + age / 100 * w; };
      axes(g, x0, y0, w, h, ha, '年龄', '健康程度');
      [0, 50, 80, 100].forEach(function (a) { tx(g, String(a), X(a), y0 + 2.2, 1.5, DIM, 'center', 700, SANS, ha); });
      var P = [], Q = [];
      for (var a = 0; a <= 100; a += 1) { P.push([X(a), y0 - h * (0.9 / (1 + Math.exp((a - 70) / 7)))]); Q.push([X(a), y0 - h * (0.9 / (1 + Math.exp((a - 86) / 5)))]); }
      polyline(g, P, 'rgba(201,211,227,0.7)', 0.45, ha, pr(lt, L[1], 1.0));
      polyline(g, Q, GOLD, 0.6, A_(lt, L[1] + 0.8, 0.5) * ha, pr(lt, L[1] + 0.8, 1.4));
      tx(g, '现在', X(66), y0 - h * 0.25, 1.7, DIM, 'right', 800, SANS, ha);
      tx(g, '衰老变慢以后', X(88), y0 - h * 0.86, 1.8, GOLD, 'center', 800, SANS, A_(lt, L[1] + 1.6, 0.5) * ha);
      var ea = A_(lt, L[2], 0.6) * ha;
      rbox(g, X(80), y0 - h, X(90) - X(80), h, 0.4, 'rgba(242,198,107,0.5)', 0.18, 'rgba(242,198,107,0.08)', ea, [0.6, 0.4]);
      var q = ((lt - L[2]) * 0.5) % 1;
      person2(g, 84, 40, 13, ea, { walk: lt * 6, name: '' }, lt);
      tx(g, '80、90 岁 · 还健康', 84, 43.5, 1.8, GOLD, 'center', 800, SANS, ea);
    }
    var sa = A_(lt, L[3] - 0.2, 0.6);
    if (sa > 0.01) {
      var st = [['一期', '安全吗？'], ['二期', '有效吗？剂量多少？'], ['三期', '大规模确认'], ['获批', '']];
      for (i = 0; i < 4; i++) {
        var x = 14 + i * 20, y = 38 - i * 7, ia = A_(lt, L[3] + i * 0.5, 0.4) * sa;
        rbox(g, x, y, 20, 46 - y, 0.3, 'rgba(238,242,248,0.3)', 0.18, i === 3 ? 'rgba(242,198,107,0.25)' : 'rgba(20,30,46,0.9)', ia);
        tx(g, st[i][0], x + 10, y + 3, 2.4, i === 3 ? GOLD : FG, 'center', 900, SANS, ia); tx(g, st[i][1], x + 10, y + 6.4, 1.6, DIM, 'center', 700, SANS, ia);
      }
      var cl = clamp((lt - L[4]) / 2.4) * 3, k = Math.min(3, Math.floor(cl)), f = cl - k;
      var px = 24 + k * 20 + (k < 3 ? f * 20 : 0), py = 38 - k * 7 - (k < 3 ? Math.sin(f * Math.PI) * 3 + f * 7 * (f > 0.5 ? 1 : 0) : 0);
      dot(g, px, Math.min(py, 38 - k * 7) - 1.5, 1.1, GOLD, A_(lt, L[4], 0.4)); glow(g, px, py - 1.5, 3.5, 'rgba(242,198,107,0.9)', 0.5 * A_(lt, L[4], 0.4));
    }
  };

  // ---------- l19: from 32 to over 70; this time the target is ageing itself; a sunrise ----------
  DRAW.l19 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.7), out1 = 1 - A_(lt, L[3] - 0.3, 0.7);
    if (out1 > 0.01) {
      var x0 = 14, y0 = 42, w = 72, h = 30, X = function (yr) { return x0 + (yr - 1900) / 126 * w; }, Y = function (v) { return y0 - v / 90 * h; };
      axes(g, x0, y0, w, h, A * out1, '年份', '全球平均寿命');
      [1900, 1950, 2000].forEach(function (yr) { tx(g, String(yr), X(yr), y0 + 2.2, 1.5, DIM, 'center', 700, SANS, A * out1); });
      var LE = [[1900, 32], [1913, 34], [1930, 39], [1950, 46], [1960, 51], [1970, 57], [1980, 61], [1990, 64], [2000, 66.5], [2010, 70], [2019, 72.8], [2023, 73.2]];
      var prog = pr(lt, L[0] + 0.6, (L[1] + 1.2) - (L[0] + 0.6));
      polyline(g, LE.map(function (q) { return [X(q[0]), Y(q[1])]; }), GOLD, 0.65, A * out1, prog);
      bigNum(g, '32', X(1900) + 3, Y(32) + 4.5, 4.4, ICE, A_(lt, L[0], 0.5) * out1, 0);
      bigNum(g, '73', X(2023) - 2, Y(73.2) - 5, 4.4, GOLD, A_(lt, L[1] + 0.6, 0.5) * out1, 0.3);
      var ic = [['干净的水', 1915, '#8fd0ff'], ['抗生素', 1945, '#c9b8ff'], ['疫苗', 1965, LEAF]];
      for (i = 0; i < 3; i++) {
        var ia = A_(lt, L[2] + 0.2 + i * 0.6, 0.4) * out1, yv = LE.filter(function (q) { return q[0] <= ic[i][1]; }).pop()[1];
        chip(g, X(ic[i][1]) + 2, Y(yv) - 7 - i * 1.5, ic[i][0], ic[i][2], ia);
        ln(g, X(ic[i][1]) + 2, Y(yv) - 5.4 - i * 1.5, X(ic[i][1]), Y(yv) - 0.6, ic[i][2], 0.2, [0.4, 0.3], ia);
      }
    }
    // this time: ageing itself
    var ta = A_(lt, L[3] - 0.2, 0.6) * (1 - A_(lt, L[4] - 0.3, 0.6));
    if (ta > 0.01) {
      var rr = 13 - 3 * eo(pr(lt, L[3], 0.9));
      ring(g, 50, 24, rr, GOLD, 0.4, ta);
      ln(g, 50 - rr - 3, 24, 50 - rr * 0.8, 24, GOLD, 0.3, null, ta); ln(g, 50 + rr * 0.8, 24, 50 + rr + 3, 24, GOLD, 0.3, null, ta);
      ln(g, 50, 24 - rr - 3, 50, 24 - rr * 0.8, GOLD, 0.3, null, ta); ln(g, 50, 24 + rr * 0.8, 50, 24 + rr + 3, GOLD, 0.3, null, ta);
      tx(g, '衰老本身', 50, 24, 3.2, FG, 'center', 900, SANS, ta);
      glow(g, 50, 24, 14, 'rgba(242,198,107,0.9)', 0.3 * ta);
    }
    // the sunrise
    var sa = A_(lt, L[4] - 0.2, 1.0);
    if (sa > 0.01) {
      var rise = eo(pr(lt, L[4] - 0.2, 4.0)), sy = mix(40, 30, rise);
      g.save(); g.globalAlpha *= sa; var sk = g.createLinearGradient(0, 10, 0, 40); sk.addColorStop(0, 'rgba(10,14,24,0)'); sk.addColorStop(1, 'rgba(242,170,90,' + (0.28 * rise).toFixed(3) + ')'); g.fillStyle = sk; g.fillRect(0, 10, 100, 30); g.restore();
      glow(g, 50, sy, 30, 'rgba(255,200,120,0.9)', 0.45 * sa * rise);
      g.save(); g.beginPath(); g.rect(0, 0, 100, 40); g.clip(); dot(g, 50, sy, 6.5, '#ffd98a', sa); g.restore();
      ln(g, 0, 40, 100, 40, 'rgba(255,217,138,0.6)', 0.3, null, sa);
      g.save(); g.globalAlpha *= sa; var gd = g.createLinearGradient(0, 40, 0, 50); gd.addColorStop(0, 'rgba(242,198,107,0.18)'); gd.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = gd; g.fillRect(0, 40, 100, 10); g.restore();
      var r = rng(12);
      for (i = 0; i < 14; i++) {
        var px = 6 + i * 6.6 + r() * 2, hh = 6 + r() * 3, wk = lt * (5 + r() * 2) + i;
        person2(g, px + Math.sin(lt * 0.2 + i) * 0.3, 40, hh, sa * (0.55 + 0.45 * r()), { walk: wk, col: 'rgba(20,24,34,0.95)', name: '' }, lt);
      }
      tx(g, '更长、更健康的人生', 50, 14, 3.4, '#fff0cc', 'center', 900, SANS, A_(lt, L[4] + 0.2, 0.8));
      tx(g, '正在一项项试验里，变成现实', 50, 20, 2.6, GOLD, 'center', 800, SANS, A_(lt, L[5] + 0.2, 0.8));
    }
  };
