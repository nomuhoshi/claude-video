  // ================= Lifespan: scenes l0-l7 =================
  // ---------- l0: an old cell turns young; the ceiling; where we are ----------
  DRAW.l0 = function (g, lt, L) {
    var i, out1 = 1 - A_(lt, L[2] - 0.4, 0.6);
    if (out1 > 0.01) {
      var A = A_(lt, 0.2, 1.0) * out1, front = mix(-1.3, 1.3, eio(pr(lt, L[0] + 0.6, 2.6)));
      var r = rng(4), spots = []; for (i = 0; i < 26; i++) spots.push([r() * 1.8 - 0.9, r() * 1.8 - 0.9, 0.08 + r() * 0.12]);
      dotDisk(g, 34, 27, 14, 0.95, function (u, v, d) {
        var young = clamp((front - u) * 3), blot = 0;
        for (var k = 0; k < spots.length; k++) { var q = spots[k]; if (Math.hypot(u - q[0], v - q[1]) < q[2]) blot = 1; }
        var edge = 1 - sm(0.82, 1, d), nucl = Math.hypot(u - 0.1, v + 0.05) < 0.32 ? 1 : 0;
        var oc = blot ? [70, 74, 84, 0.9, 0.7] : [140, 148, 162, 0.55 + 0.3 * edge, 0.75 + 0.2 * Math.sin(u * 13 + v * 7)];
        var yc = nucl ? [255, 226, 150, 0.95, 1.05] : [242, 198, 107, 0.55 + 0.4 * edge, 1.0];
        return [mix(oc[0], yc[0], young), mix(oc[1], yc[1], young), mix(oc[2], yc[2], young), mix(oc[3], yc[3], young), mix(oc[4], yc[4], young)];
      }, A);
      glow(g, 34, 27, 20, 'rgba(242,198,107,0.9)', 0.35 * clamp((front + 1) / 2.3) * A);
      tx(g, '衰老的细胞', 34, 45.2, 1.9, DIM, 'center', 700, SANS, A * (1 - A_(lt, L[0] + 1.6, 0.6)));
      tx(g, '“变年轻”的细胞', 34, 45.2, 1.9, GOLD, 'center', 800, SANS, A * A_(lt, L[0] + 2.2, 0.6));
      // first time in a formal human trial
      var ea = A_(lt, L[1], 0.7) * out1;
      if (ea > 0.01) {
        ln(g, 49, 27, mix(49, 64, eo(pr(lt, L[1], 0.8))), 27, GOLD, 0.3, [0.8, 0.6], ea);
        eyeIcon(g, 76, 25, 1.7, ea, A_(lt, L[1] + 0.8, 1.0), lt);
        person2(g, 76, 44, 9, ea * 0.0, {}, lt);
        chip(g, 76, 36, '第一次进入正式临床试验', GOLD, A_(lt, L[1] + 0.5, 0.6) * out1, 'rgba(48,38,12,0.95)');
        tx(g, '2026', 76, 14.5, 3.6, GOLD, 'center', 900, SANS, A_(lt, L[1] + 0.2, 0.6) * out1);
      }
    }
    // the ceiling: a crowd walks along the years and piles up before 122
    var ca = A_(lt, L[2] - 0.2, 0.7) * (1 - A_(lt, L[3] - 0.3, 0.6));
    if (ca > 0.01) {
      var X = function (y) { return 10 + y / 150 * 80; };
      ln(g, 10, 34, 90, 34, 'rgba(238,242,248,0.45)', 0.25, null, ca);
      for (i = 0; i <= 150; i += 25) { ln(g, X(i), 34, X(i), 35, 'rgba(238,242,248,0.45)', 0.2, null, ca); tx(g, String(i), X(i), 37, 1.6, DIM, 'center', 700, SANS, ca); }
      tx(g, '岁', 91.5, 37, 1.6, DIM, 'left', 700, SANS, ca);
      var r2 = rng(8), go = eo(pr(lt, L[2], 2.2));
      for (i = 0; i < 70; i++) {
        var tgt = Math.min(121.5, 60 + 22 * Math.pow(r2(), 0.6) + 38 * Math.pow(r2(), 3)), h = 1.2 + r2() * 5;
        var age = tgt * go, x = X(age), y = 33.2 - (i % 9) * 0.0 - r2() * 9;
        dot(g, x, y, 0.42, age > 118 ? GOLD : 'rgba(201,211,227,0.8)', ca * 0.9);
      }
      var wa = A_(lt, L[2] + 1.2, 0.6) * ca;
      ln(g, X(122), 12, X(122), 34, INF, 0.4, [0.8, 0.5], wa);
      tx(g, '122', X(122), 10, 2.6, INF, 'center', 900, SANS, wa);
      tx(g, '卡在哪里？', X(122) + 1.5, 20, 2.2, FG, 'left', 800, SANS, A_(lt, L[2] + 1.8, 0.6) * ca);
    }
    // where we are: mice -> dogs -> humans
    var pa = A_(lt, L[3] - 0.1, 0.7);
    if (pa > 0.01) {
      var nodes = [['小鼠', '多种方法已延长寿命'], ['狗', '大型试验进行中'], ['人', '第一批人体试验']], xs = [24, 50, 76];
      ln(g, 24, 26, 76, 26, 'rgba(238,242,248,0.25)', 0.35, null, pa);
      ln(g, 24, 26, mix(24, 76, eio(pr(lt, L[3], 2.0))), 26, GOLD, 0.45, null, pa);
      for (i = 0; i < 3; i++) {
        var na = A_(lt, L[3] + i * 0.6, 0.5) * pa;
        dot(g, xs[i], 26, 1.3, i === 2 ? GOLD : '#c9d3e3', na); if (i === 2) glow(g, xs[i], 26, 5, 'rgba(242,198,107,0.9)', (0.4 + 0.2 * Math.sin(lt * 5)) * na);
        tx(g, nodes[i][0], xs[i], 21.5, 2.6, FG, 'center', 900, SANS, na); tx(g, nodes[i][1], xs[i], 30.5, 1.7, i === 2 ? GOLD : DIM, 'center', 700, SANS, na);
      }
      if (lt > L[3]) { mouseS(g, 24, 41, 1.1, pa * A_(lt, L[3], 0.5), null, false, lt); dogS(g, 50, 43, 0.9, pa * A_(lt, L[3] + 0.6, 0.5), null, false, lt); person2(g, 76, 44, 9, pa * A_(lt, L[3] + 1.2, 0.5), {}, lt); }
    }
  };

  // ---------- l1: 122 years; average life doubled, the record stalled ----------
  DRAW.l1 = function (g, lt, L) {
    var i, out1 = 1 - A_(lt, L[3] - 0.4, 0.6);
    if (out1 > 0.01) {
      var n = Math.round(122 * eo(pr(lt, L[0] + 0.1, 1.6)));
      bigNum(g, String(n), 36, 21, 11, GOLD, A_(lt, L[0], 0.5) * out1, 0.35);
      tx(g, '岁', 46, 24, 3, GOLD, 'left', 800, SANS, A_(lt, L[0] + 1.4, 0.5) * out1);
      tx(g, '有可靠记录的最长寿命', 36, 31.5, 2.0, DIM, 'center', 700, SANS, A_(lt, L[0] + 0.4, 0.6) * out1);
      var ca = A_(lt, L[1], 0.7) * out1;
      person2(g, 70, 42, 17, ca, { dress: true, longHair: true, name: '雅娜·卡尔芒', nameCol: GOLD, col: '#d9c9e8' }, lt);
      tx(g, '法国 · 1875–1997', 70, 45.6, 1.7, DIM, 'center', 700, SANS, ca);
      var ya = A_(lt, L[2], 0.6) * out1;
      if (ya > 0.01) {
        rbox(g, 17, 36.3, 38, 7, 0.6, 'rgba(238,242,248,0.25)', 0.15, 'rgba(14,20,32,0.9)', ya);
        var yr = Math.round(mix(1997, 2026, eo(pr(lt, L[2] + 0.2, 1.8))));
        tx(g, '1997 → ' + yr, 36, 38.8, 2.2, FG, 'center', 800, SANS, ya);
        tx(g, '没有人超过她', 36, 41.6, 1.7, GOLD, 'center', 700, SANS, A_(lt, L[2] + 1.6, 0.5) * ya);
      }
    }
    // the chart: global life expectancy vs the oldest recorded age
    var ch = A_(lt, L[3] - 0.2, 0.7);
    if (ch > 0.01) {
      var x0 = 14, y0 = 44, w = 72, h = 34, X = function (yr) { return x0 + (yr - 1900) / 126 * w; }, Y = function (v) { return y0 - v / 130 * h; };
      axes(g, x0, y0, w, h, ch, '年份', '岁');
      [0, 50, 100].forEach(function (v) { ln(g, x0, Y(v), x0 + w, Y(v), 'rgba(238,242,248,0.08)', 0.15, null, ch); tx(g, String(v), x0 - 1, Y(v), 1.5, DIM, 'right', 700, SANS, ch); });
      [1900, 1950, 2000, 2026].forEach(function (yr) { tx(g, String(yr), X(yr), y0 + 2.2, 1.5, DIM, 'center', 700, SANS, ch); });
      var LE = [[1900, 32], [1913, 34], [1930, 39], [1950, 46], [1960, 51], [1970, 57], [1980, 61], [1990, 64], [2000, 66.5], [2010, 70], [2019, 72.8], [2021, 71], [2023, 73.2], [2026, 73.5]];
      var P = LE.map(function (q) { return [X(q[0]), Y(q[1])]; });
      polyline(g, P, ICE, 0.55, ch, pr(lt, L[3], 2.4));
      tx(g, '全球平均寿命', X(1990), Y(64) - 4.5, 1.9, ICE, 'center', 800, SANS, A_(lt, L[3] + 1.6, 0.5) * ch);
      tx(g, '32', X(1900) + 1, Y(32) + 2.2, 1.6, ICE, 'left', 800, SANS, A_(lt, L[3] + 0.3, 0.5) * ch);
      tx(g, '73', X(2023), Y(73.2) + 2.4, 1.6, ICE, 'center', 800, SANS, A_(lt, L[3] + 2.2, 0.5) * ch);
      // the oldest recorded age (schematic): slow rise, a peak in 1997, then flat
      var MX = [[1900, 106], [1930, 109], [1960, 112], [1980, 114], [1990, 117], [1997, 122], [2000, 116], [2010, 116], [2020, 118], [2026, 117]];
      var Q = MX.map(function (q) { return [X(q[0]), Y(q[1])]; });
      var ma = A_(lt, L[4] - 0.3, 0.6) * ch;
      polyline(g, Q, GOLD, 0.55, ma, pr(lt, L[4] - 0.3, 1.8));
      dot(g, X(1997), Y(122), 0.8, GOLD, A_(lt, L[4] + 0.6, 0.4) * ch);
      tx(g, '122', X(1997), Y(122) - 2.2, 1.7, GOLD, 'center', 900, SANS, A_(lt, L[4] + 0.6, 0.4) * ch);
      tx(g, '最长寿命（示意）', X(1940), Y(110) - 2.6, 1.9, GOLD, 'center', 800, SANS, A_(lt, L[4] + 0.2, 0.5) * ch);
      var hl = A_(lt, L[4] + 1.4, 0.6) * ch;
      rbox(g, X(1998), Y(124), X(2026) - X(1998), Y(110) - Y(124), 0.5, 'rgba(242,198,107,0.7)', 0.2, 'rgba(242,198,107,0.08)', hl, [0.6, 0.4]);
      chip(g, X(2012), Y(105), '近三十年几乎停住', GOLD, hl, 'rgba(48,38,12,0.95)');
    }
  };

  // ---------- l2: Gompertz: the yearly risk of death doubles about every 8 years ----------
  DRAW.l2 = function (g, lt, L) {
    var i, out1 = 1 - A_(lt, L[1] - 0.3, 0.6);
    if (out1 > 0.01) {
      var A = A_(lt, 0.2, 0.8) * out1;
      rbox(g, 30, 10, 40, 30, 0.6, null, 0, 'rgba(236,226,204,0.92)', A);
      tx(g, 'On the Nature of the Function', 50, 15, 1.8, '#3a2a1a', 'center', 700, SANS, A);
      tx(g, 'Expressive of the Law of Human Mortality', 50, 18, 1.6, '#3a2a1a', 'center', 600, SANS, A);
      for (i = 0; i < 6; i++) ln(g, 34, 22.5 + i * 2.6, 34 + 32 * eo(pr(lt, L[0] + 0.3 + i * 0.2, 0.6)) * (i === 5 ? 0.6 : 1), 22.5 + i * 2.6, 'rgba(58,42,26,0.45)', 0.35, null, A);
      tx(g, '1825', 50, 7, 3, GOLD, 'center', 900, SANS, A);
      person2(g, 82, 42, 17, A_(lt, L[0] + 0.3, 0.6) * out1, { hat: true, name: '冈珀茨', nameCol: GOLD, col: '#cfd8e6', pose: 'forward' }, lt);
    }
    var ca = A_(lt, L[1] - 0.2, 0.7);
    if (ca > 0.01) {
      var x0 = 12, y0 = 44, w = 76, h = 32, X = function (a) { return x0 + (a - 25) / 80 * w; };
      var q = function (a) { return 0.001 * Math.pow(2, (a - 30) / 8.4); }, Y = function (p) { return y0 - p / 0.36 * h; };
      axes(g, x0, y0, w, h, ca, '年龄', '一年内死亡的概率');
      [30, 50, 70, 90, 100].forEach(function (a) { tx(g, String(a), X(a), y0 + 2.2, 1.5, DIM, 'center', 700, SANS, ca); });
      // bars every 8.4 years appear one by one, each twice the last
      var ages = []; for (var a = 30; a <= 100.1; a += 8.4) ages.push(a); ages[ages.length - 1] = 100;
      for (i = 0; i < ages.length; i++) {
        var ba = A_(lt, L[2] + i * 0.32, 0.35) * ca, p = q(ages[i]), bh = y0 - Y(p);
        rbox(g, X(ages[i]) - 1.4, y0 - bh * eo(ba), 2.8, Math.max(0.15, bh * eo(ba)), 0.3, null, 0, i >= ages.length - 2 ? HOT : 'rgba(143,208,255,0.8)', ba);
        if (i > 0 && i < ages.length - 1) tx(g, '×2', X(ages[i]), Math.min(y0 - bh - 1.8, y0 - 1.8), 1.4, GOLD, 'center', 800, SANS, ba * (1 - A_(lt, L[3] - 0.2, 0.5) * 0.6));
      }
      // the smooth curve
      var P = []; for (var aa = 30; aa <= 100; aa += 1) P.push([X(aa), Y(q(aa))]);
      polyline(g, P, GOLD, 0.45, A_(lt, L[5] - 0.2, 0.6) * ca, pr(lt, L[5] - 0.2, 1.6));
      chip(g, X(48), 14, '大约每 8 年翻一倍', GOLD, A_(lt, L[2] + 0.2, 0.6) * ca, 'rgba(48,38,12,0.95)');
      // 30: about 1 in 1000
      var a30 = A_(lt, L[3], 0.5) * ca;
      ln(g, X(30), y0 - 1, X(30), 31, ICE, 0.2, [0.5, 0.4], a30);
      chip(g, X(30) + 3, 29, '30 岁 ≈ 1/1000', ICE, a30);
      // 100: about 1 in 3
      var a100 = A_(lt, L[4], 0.5) * ca;
      chip(g, X(100) - 6, Y(q(100)) - 3, '100 岁 ≈ 1/3', HOT, a100, 'rgba(56,24,14,0.95)');
      for (i = 0; i < 3; i++) person2(g, 52 + i * 4.2, 24, 6, a100 * (i === 2 ? 1 - 0.75 * A_(lt, L[4] + 0.8, 0.6) : 1), {}, lt);
      // steeper and steeper
      var sa = A_(lt, L[5] + 0.8, 0.6) * ca;
      arrow(g, X(86), Y(q(86)) - 2, X(96), Y(q(100)) - 7, HOT, 0.4, sa, 1.1);
      tx(g, '越来越陡', X(84), Y(q(92)) - 6, 2.0, HOT, 'right', 800, SANS, sa);
    }
  };

  // ---------- l3: two estimates of the ceiling: records cap near 115; resilience runs out at 120-150 ----------
  DRAW.l3 = function (g, lt, L) {
    var i, out1 = 1 - A_(lt, L[2] - 0.3, 0.6);
    if (out1 > 0.01) {
      var A = A_(lt, 0.2, 0.7) * out1;
      chip(g, 50, 8, '《自然》 2016', GOLD, A, 'rgba(48,38,12,0.95)');
      var x0 = 16, y0 = 42, w = 68, h = 26, X = function (yr) { return x0 + (yr - 1960) / 50 * w; }, Y = function (v) { return y0 - (v - 104) / 20 * h; };
      axes(g, x0, y0, w, h, A, '年份', '当年最高死亡年龄');
      [1960, 1980, 2000].forEach(function (yr) { tx(g, String(yr), X(yr), y0 + 2.2, 1.5, DIM, 'center', 700, SANS, A); });
      [110, 115, 120].forEach(function (v) { tx(g, String(v), x0 - 1, Y(v), 1.5, DIM, 'right', 700, SANS, A); });
      var r = rng(21);
      for (i = 0; i < 40; i++) {
        var yr = 1968 + i * 1.0, base = yr < 1995 ? 108 + (yr - 1968) * 0.26 : 115, v = base + (r() - 0.5) * 3 + (yr === 1997 ? 7 : 0);
        dot(g, X(yr), Y(Math.min(v, 122)), 0.45, yr === 1997 ? GOLD : 'rgba(201,211,227,0.85)', A * A_(lt, 0.4 + i * 0.04, 0.3));
      }
      var cap = A_(lt, L[1], 0.6) * out1;
      ln(g, X(1962), Y(115), X(2008), Y(115), HOT, 0.4, [0.8, 0.5], cap);
      chip(g, X(1975), Y(117.5), '约 115 岁附近封顶', HOT, cap, 'rgba(56,24,14,0.95)');
      tx(g, '卡尔芒 122', X(1997) + 1.2, Y(122), 1.5, GOLD, 'left', 800, SANS, A_(lt, 1.8, 0.5) * out1);
    }
    // resilience: a ball in a valley gets knocked and rolls back; older valleys are shallower
    var ra = A_(lt, L[2] - 0.2, 0.7);
    if (ra > 0.01) {
      chip(g, 50, 8, '2021 · 恢复力', ICE, A_(lt, L[2], 0.6));
      var cols = [[20, '40 岁', 1.0, ICE], [50, '80 岁', 0.45, '#c9b8ff'], [80, '120–150 岁', 0.0, HOT]];
      for (i = 0; i < 3; i++) {
        var c = cols[i], ca = A_(lt, (i === 0 ? L[3] - 0.2 : i === 1 ? L[4] - 0.2 : L[5] - 0.2), 0.6) * ra;
        if (ca <= 0.01) continue;
        var cx = c[0], depth = 6 * c[2] + 0.5, by = 34;
        var VY = function (k) { return by - depth * (1 - Math.exp(-k * k / 30)); };
        g.save(); g.globalAlpha *= ca; g.strokeStyle = c[3]; g.lineWidth = 0.4; g.beginPath();
        for (var k = -12; k <= 12; k += 0.5) { if (k === -12) g.moveTo(cx + k, VY(k)); else g.lineTo(cx + k, VY(k)); }
        g.stroke(); g.restore();
        // a kick every 3 s; recovery time grows as the valley gets shallower
        var t0 = i === 0 ? L[3] + 0.6 : i === 1 ? L[4] + 0.4 : L[5] + 0.4, ph = Math.max(0, lt - t0) % 3.2, kick = lt > t0;
        var tau = [0.35, 1.3, 99][i], off = kick ? 7 * Math.exp(-ph / tau) * (ph < 0.15 ? ph / 0.15 : 1) : 0;
        if (i === 2 && kick) off = Math.min(9, 7 * clamp((lt - t0) / 0.3)) + 0.4 * (lt - t0);
        off = Math.min(off, 11);
        var bx = cx + off, byy = VY(off);
        dot(g, bx, byy - 1.0, 1.0, c[3], ca); glow(g, bx, byy - 1, 3, 'rgba(255,255,255,0.6)', 0.2 * ca);
        if (kick && ph < 0.3 && i < 2) arrow(g, cx - 5, byy - 1, cx - 1.8, byy - 1, FG, 0.3, ca * (1 - ph / 0.3), 0.8);
        tx(g, c[1], cx, 40, 2.4, c[3], 'center', 900, SANS, ca);
        tx(g, ['很快恢复', '恢复得慢', '恢复力耗尽'][i], cx, 43.4, 1.8, FG, 'center', 700, SANS, ca);
      }
      chip(g, 80, 16.5, '按趋势推算', HOT, A_(lt, L[5] + 1.6, 0.5) * ra, 'rgba(56,24,14,0.95)');
    }
  };

  // ---------- l4: errors every day, repaired but not completely; 12 hallmarks in three layers ----------
  DRAW.l4 = function (g, lt, L) {
    var i, out1 = 1 - A_(lt, L[3] - 0.3, 0.6);
    if (out1 > 0.01) {
      var A = A_(lt, 0.2, 0.7) * out1;
      cell(g, 34, 26, 15, A, { lt: lt, seed: 1 });
      // three kinds of error
      var e1 = A_(lt, L[1], 0.5) * out1, e2 = A_(lt, L[1] + 0.8, 0.5) * out1, e3 = A_(lt, L[1] + 1.6, 0.5) * out1;
      helix(g, 22, 34, 19, 1.0, lt, e1, { gap: [28, 0.8] });
      glow(g, 28, 19, 2.4, 'rgba(255,107,107,0.9)', e1 * (0.5 + 0.4 * Math.sin(lt * 9)));
      tx(g, 'DNA 断了', 28, 15.4, 1.6, INF, 'center', 800, SANS, e1);
      g.save(); g.globalAlpha *= e2; g.strokeStyle = '#c9b8ff'; g.lineWidth = 0.35; g.beginPath();
      for (i = 0; i <= 40; i++) { var t = i / 40 * 9, x = 40 + Math.cos(t * 1.7) * 2.4 + Math.sin(t * 3.1) * 1.2, y = 25 + Math.sin(t * 1.3) * 2.2 + Math.cos(t * 2.3) * 1.0; if (!i) g.moveTo(x, y); else g.lineTo(x, y); }
      g.stroke(); g.restore(); tx(g, '蛋白质折错了', 40, 30.6, 1.6, '#c9b8ff', 'center', 800, SANS, e2);
      var mf = 1 - 0.6 * A_(lt, L[1] + 2.0, 1.0);
      g.save(); g.globalAlpha *= e3; g.fillStyle = 'rgba(255,170,90,' + (0.85 * mf).toFixed(2) + ')'; g.beginPath(); g.ellipse(27, 33, 3.2, 1.6, 0.3, 0, TAU); g.fill();
      g.strokeStyle = 'rgba(60,30,10,0.7)'; g.lineWidth = 0.2; g.beginPath(); for (i = 0; i < 5; i++) { g.moveTo(25 + i * 1.0, 32); g.quadraticCurveTo(25.5 + i, 33.5, 25 + i * 1.0, 34.2); } g.stroke(); g.restore();
      tx(g, '线粒体累了', 27, 37, 1.6, '#ffaa5a', 'center', 800, SANS, e3);
      // repair crews, and the leftover damage piling up with age
      var ra = A_(lt, L[2], 0.6) * out1, age = Math.round(mix(20, 80, eio(pr(lt, L[2] + 0.4, 2.4))));
      if (ra > 0.01) {
        for (i = 0; i < 6; i++) { var an = lt * 0.9 + i * 1.05; dot(g, 34 + Math.cos(an) * 11, 26 + Math.sin(an) * 9, 0.55, GOLD, ra); }
        var r = rng(13), nd = Math.round((age - 20) / 60 * 34);
        for (i = 0; i < nd; i++) { var px = 34 + (r() - 0.5) * 22, py = 26 + (r() - 0.5) * 18; if (Math.hypot((px - 34) / 13, (py - 26) / 13) < 1) dot(g, px, py, 0.45, 'rgba(255,107,107,0.75)', ra); }
        rbox(g, 62, 18, 26, 14, 0.6, 'rgba(238,242,248,0.25)', 0.15, 'rgba(14,20,32,0.9)', ra);
        tx(g, '年龄 ' + age, 75, 22.5, 2.6, FG, 'center', 900, SANS, ra);
        tx(g, '修不干净的，越攒越多', 75, 27.5, 1.7, INF, 'center', 700, SANS, ra);
      }
    }
    // the review: 12 hallmarks in three layers
    var H = [['基因组不稳定', '端粒缩短', '蛋白质稳态失衡', '自噬失灵', '线粒体功能障碍'], ['表观遗传改变', '营养感应失调'], ['细胞衰老', '干细胞耗竭', '细胞间通讯改变', '慢性炎症', '肠道菌群失调']];
    var hd = [['零件坏了', ICE], ['说明书乱了', GOLD], ['系统失控了', HOT]];
    var ha = A_(lt, L[3] - 0.2, 0.6);
    if (ha > 0.01) {
      chip(g, 50, 7.5, '《细胞》 2023 · 衰老的 12 个标志', GOLD, ha, 'rgba(48,38,12,0.95)');
      var grp = eio(pr(lt, L[4] + 0.2, 1.4)), n = 0;
      for (var c = 0; c < 3; c++) {
        for (var k = 0; k < H[c].length; k++, n++) {
          var gx = 14 + (n % 6) * 14.4, gy = 17 + Math.floor(n / 6) * 6;          // a plain 6 x 2 grid first
          var tx_ = 20 + c * 30, ty_ = 17 + k * 4.6;                              // then three columns
          var x = mix(gx, tx_, grp), y = mix(gy, ty_ + 2.5, grp), ta = A_(lt, L[3] + 0.15 * n, 0.3) * ha;
          tile(g, x, y, 13.2, 3.6, H[c][k], grp > 0.5 ? hd[c][1] : '#c9d3e3', ta);
        }
        var la = A_(lt, L[5] + c * 0.5, 0.5) * ha;
        tx(g, hd[c][0], 20 + c * 30, 15, 2.4, hd[c][1], 'center', 900, SANS, la);
        if (la > 0.01) glow(g, 20 + c * 30, 15, 7, c === 0 ? 'rgba(143,208,255,0.8)' : c === 1 ? 'rgba(242,198,107,0.8)' : 'rgba(255,157,110,0.8)', 0.25 * la);
      }
    }
  };

  // ---------- l5: mice pile up mutations ~17x faster, yet both end near the same total ----------
  DRAW.l5 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.7);
    var out1 = 1 - A_(lt, L[5] - 0.3, 0.6);
    chip(g, 50, 7.5, '《自然》 2022 · 16 种哺乳动物', GOLD, A * A_(lt, L[1] - 0.2, 0.5) * out1, 'rgba(48,38,12,0.95)');
    if (out1 > 0.01) {
      var ma = A_(lt, L[1] - 0.2, 0.6) * out1;
      mouseS(g, 20, 21, 1.5, ma, null, false, lt); tx(g, '小鼠', 20, 24, 1.9, FG, 'center', 800, SANS, ma);
      person2(g, 20, 41, 11, ma, {}, lt); tx(g, '人', 20, 43.6, 1.9, FG, 'center', 800, SANS, ma);
      // per year: mouse ~800, human ~47
      var ya = A_(lt, L[2], 0.6) * out1 * (1 - A_(lt, L[3] - 0.2, 0.5));
      if (ya > 0.01) {
        var bm = 46 * eo(pr(lt, L[2] + 0.1, 0.8)), bh = 46 * 47 / 796 * eo(pr(lt, L[2] + 0.1, 0.8));
        rbox(g, 30, 16, bm, 3.2, 0.5, null, 0, HOT, ya); tx(g, '每年约 800 个突变', 31 + bm, 17.6, 1.8, HOT, 'left', 800, SANS, ya);
        rbox(g, 30, 34, Math.max(0.4, bh), 3.2, 0.5, null, 0, ICE, ya); tx(g, '每年约 47 个', 31.5 + bh, 35.6, 1.8, ICE, 'left', 800, SANS, ya);
        chip(g, 64, 26, '快了十几倍', HOT, A_(lt, L[2] + 0.9, 0.5) * ya, 'rgba(56,24,14,0.95)');
      }
      // over a whole life: both totals end up close
      var la = A_(lt, L[3] - 0.1, 0.6) * out1;
      if (la > 0.01) {
        var pm = eo(pr(lt, L[3] + 0.2, 1.0)), ph = eio(pr(lt, L[3] + 0.2, 3.6));
        ln(g, 30, 22.4, 86, 22.4, 'rgba(238,242,248,0.2)', 0.2, null, la); ln(g, 30, 40.4, 86, 40.4, 'rgba(238,242,248,0.2)', 0.2, null, la);
        tx(g, '一生约 3 年', 30, 23.9, 1.4, DIM, 'left', 700, SANS, la); tx(g, '一生约 80 年', 30, 41.9, 1.4, DIM, 'left', 700, SANS, la);
        rbox(g, 30, 17, 46 * 0.82 * pm, 3.2, 0.5, null, 0, HOT, la); rbox(g, 30, 35, 46 * 0.9 * ph, 3.2, 0.5, null, 0, ICE, la);
        tx(g, '终点', 30 + 46 * 0.82 * pm + 1.2, 18.6, 1.6, HOT, 'left', 800, SANS, la * A_(lt, L[3] + 1.2, 0.4));
        tx(g, '终点', 30 + 46 * 0.9 * ph + 1.2, 36.6, 1.6, ICE, 'left', 800, SANS, la * A_(lt, L[3] + 3.8, 0.4));
        var sa = A_(lt, L[4] + 0.2, 0.6) * out1;
        ln(g, 30 + 46 * 0.86, 15, 30 + 46 * 0.86, 39, GOLD, 0.3, [0.6, 0.4], sa);
        chip(g, 70, 28.5, '总数相差不大', GOLD, sa, 'rgba(48,38,12,0.95)');
      }
    }
    // longer-lived species pile up mutations more slowly
    var sa2 = A_(lt, L[5] - 0.2, 0.6);
    if (sa2 > 0.01) {
      var x0 = 18, y0 = 44, w = 66, h = 30, X = function (ls) { return x0 + Math.log(ls) / Math.log(100) * w; }, Y = function (rate) { return y0 - rate / 850 * h; };
      axes(g, x0, y0, w, h, sa2, '物种寿命（对数）', '每年的突变数');
      var sp = [['小鼠', 3.7, 796], ['大鼠', 3.8, 640], ['雪貂', 9, 390], ['兔', 9, 330], ['猫', 15, 250], ['狗', 13, 249], ['马', 30, 140], ['长颈鹿', 24, 99], ['狮', 20, 160], ['奶牛', 22, 160], ['人', 83.6, 47], ['裸鼹鼠', 25, 93]];
      for (i = 0; i < sp.length; i++) {
        var da = A_(lt, L[5] + i * 0.08, 0.3) * sa2, s = sp[i];
        dot(g, X(s[1]), Y(s[2]), 0.7, s[0] === '人' ? ICE : s[0] === '小鼠' ? HOT : 'rgba(201,211,227,0.85)', da);
        if (s[0] === '人' || s[0] === '小鼠') tx(g, s[0], X(s[1]) + 1.2, Y(s[2]) - 1.4, 1.6, FG, 'left', 800, SANS, da);
      }
      var P = []; for (var ls = 3; ls <= 90; ls *= 1.08) P.push([X(ls), Y(3200 / ls)]);
      polyline(g, P, GOLD, 0.35, A_(lt, L[5] + 1.0, 0.5) * sa2, pr(lt, L[5] + 1.0, 1.2), [0.7, 0.5]);
      chip(g, 64, 16, '活得越久，突变攒得越慢', GOLD, A_(lt, L[5] + 1.6, 0.5) * sa2, 'rgba(48,38,12,0.95)');
      tx(g, '示意：只标出人和小鼠的实测值', 84, 46.5, 1.4, DIM, 'right', 700, SANS, sa2);
    }
  };

  // ---------- l6: same DNA, different switches; tags drift with age; the epigenetic clock ----------
  DRAW.l6 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.7), out1 = 1 - A_(lt, L[3] - 0.3, 0.6);
    var kinds = [['神经细胞', '#f2c66b'], ['肌肉细胞', '#ff9d6e'], ['皮肤细胞', '#8fd0ff']];
    if (out1 > 0.01) {
      for (i = 0; i < 3; i++) {
        var cx = 20 + i * 30, ca = A_(lt, 0.3 + i * 0.3, 0.6) * out1;
        if (i === 0) neuron(g, cx, 14, 1.0, ca, kinds[i][1], lt);
        else if (i === 1) { rbox(g, cx - 7, 12, 14, 4, 2, kinds[i][1], 0.3, 'rgba(80,40,30,0.4)', ca); for (var k = 0; k < 6; k++) ln(g, cx - 5 + k * 2, 12.5, cx - 5 + k * 2, 15.5, kinds[i][1], 0.2, null, ca * 0.6); }
        else { for (var k2 = 0; k2 < 4; k2++) rbox(g, cx - 7 + k2 * 3.6, 12.2, 3.2, 3.2, 0.4, kinds[i][1], 0.2, 'rgba(40,70,110,0.4)', ca); }
        tx(g, kinds[i][0], cx, 19.5, 1.8, kinds[i][1], 'center', 800, SANS, ca);
        // the same DNA strip under each, with different switches on
        helix(g, cx - 10, cx + 10, 28, 1.2, lt, ca, { spin: 0.6 });
        var on = [[0, 2, 5], [1, 3, 4], [0, 4, 5]][i];
        for (var s = 0; s < 6; s++) {
          var sx = cx - 8.5 + s * 3.4, isOn = on.indexOf(s) >= 0, sa = A_(lt, L[1] + s * 0.1, 0.4) * ca;
          rbox(g, sx - 1.2, 31.5, 2.4, 1.6, 0.8, isOn ? kinds[i][1] : 'rgba(238,242,248,0.35)', 0.18, isOn ? kinds[i][1] : 'rgba(20,26,38,0.9)', sa);
          dot(g, sx + (isOn ? 0.5 : -0.5), 32.3, 0.5, isOn ? '#0b0f18' : 'rgba(238,242,248,0.6)', sa);
        }
      }
      chip(g, 50, 39, 'DNA 一样，打开的开关不一样', FG, A_(lt, L[1] + 0.6, 0.6) * out1);
      var ta = A_(lt, L[2], 0.6) * out1;
      if (ta > 0.01) {
        for (i = 0; i < 3; i++) helix(g, 20 + i * 30 - 10, 20 + i * 30 + 10, 28, 1.2, lt, ta, { spin: 0.6, marks: function (k) { return k % 3 === 1 ? '#ff6bd0' : null; } });
        chip(g, 50, 44, '化学标记 = 表观遗传', '#ff8fdc', ta, 'rgba(50,16,44,0.95)');
      }
    }
    // with age the tags drift and the cell forgets what it is; the clock reads biological age
    var da = A_(lt, L[3] - 0.2, 0.6);
    if (da > 0.01) {
      var drift = eio(pr(lt, L[3] + 0.3, 3.2)), r = rng(31);
      var ya = 1 - A_(lt, L[5] - 0.3, 0.6);
      if (ya > 0.01) {
        tx(g, '年轻', 24, 12, 2.2, GOLD, 'center', 900, SANS, da * ya); tx(g, '年老', 74, 12, 2.2, DIM, 'center', 900, SANS, da * ya);
        helix(g, 12, 36, 20, 1.3, lt, da * ya, { spin: 0.5, marks: function (k) { return k % 3 === 1 ? '#ff6bd0' : null; } });
        helix(g, 62, 86, 20, 1.3, lt, da * ya, { spin: 0.5, marks: function (k) { var rr = rng(k * 7 + 3)(); return (k % 3 === 1 ? rr > drift * 0.6 : rr < drift * 0.45) ? '#ff6bd0' : null; } });
        arrow(g, 40, 20, 58, 20, 'rgba(238,242,248,0.6)', 0.3, da * ya, 1);
        cell(g, 24, 32, 6, da * ya, { lt: lt, col: GOLD, fill: 'rgba(242,198,107,0.18)' });
        tx(g, '知道自己是谁', 24, 41, 1.7, GOLD, 'center', 700, SANS, da * ya);
        var fz = drift;
        cell(g, 74, 32, 6, da * ya, { lt: lt * 2.5, wob: 0.04 + 0.12 * fz, col: 'rgba(160,170,185,0.8)', fill: 'rgba(90,100,115,0.25)' });
        tx(g, '?', 74 + Math.sin(lt * 3) * 0.6, 32, 3.4, DIM, 'center', 900, SANS, da * ya * A_(lt, L[4], 0.5));
        tx(g, '慢慢忘了该干什么', 74, 41, 1.7, DIM, 'center', 700, SANS, da * ya * A_(lt, L[4], 0.5));
      }
      // the epigenetic clock
      var ka = A_(lt, L[5] - 0.2, 0.6);
      if (ka > 0.01) {
        ring(g, 50, 24, 10, GOLD, 0.45, ka); for (i = 0; i < 12; i++) { var an = i / 12 * TAU; ln(g, 50 + Math.cos(an) * 8.6, 24 + Math.sin(an) * 8.6, 50 + Math.cos(an) * 9.6, 24 + Math.sin(an) * 9.6, GOLD, 0.25, null, ka); }
        var hand = -Math.PI / 2 + eio(pr(lt, L[5], 2.0)) * TAU * 0.78;
        ln(g, 50, 24, 50 + Math.cos(hand) * 7.5, 24 + Math.sin(hand) * 7.5, FG, 0.45, null, ka); dot(g, 50, 24, 0.8, GOLD, ka);
        tx(g, '表观遗传时钟', 50, 38, 2.2, GOLD, 'center', 900, SANS, ka);
        tx(g, '从血液里的化学标记，估算“生物年龄”', 50, 41.6, 1.7, FG, 'center', 700, SANS, ka);
        helix(g, 18, 36, 24, 1.1, lt, ka * 0.8, { spin: 0.5, marks: function (k) { return k % 2 ? '#ff6bd0' : null; } });
        arrow(g, 37, 24, 39.5, 24, GOLD, 0.3, ka, 0.9);
        tx(g, '实际 50 岁', 72, 20, 2.0, FG, 'center', 800, SANS, A_(lt, L[5] + 1.0, 0.5) * ka);
        tx(g, '生物年龄 ?', 72, 26, 2.4, GOLD, 'center', 900, SANS, A_(lt, L[5] + 1.6, 0.5) * ka);
      }
    }
  };

  // ---------- l7: senescent "zombie" cells leak inflammation; stem cells dwindle ----------
  DRAW.l7 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.7), out1 = 1 - A_(lt, L[3] - 0.3, 0.6);
    if (out1 > 0.01) {
      var inf = A_(lt, L[2], 1.2);
      var r = rng(7), nb = [];
      for (i = 0; i < 9; i++) { var an = i / 9 * TAU + 0.3, d = 13 + r() * 3; nb.push([40 + Math.cos(an) * d * 1.5, 25 + Math.sin(an) * d * 0.95]); }
      for (i = 0; i < nb.length; i++) {
        var dd = Math.hypot(nb[i][0] - 40, nb[i][1] - 25), hit = clamp(inf * 1.4 - dd / 40);
        cell(g, nb[i][0], nb[i][1], 3.4, A * out1, { lt: lt, seed: i, col: hit > 0.3 ? 'rgba(255,140,120,0.85)' : CELLC, fill: hit > 0.3 ? 'rgba(120,40,40,0.35)' : 'rgba(40,70,110,0.35)' });
      }
      // the senescent cell: big, grey, not dividing
      cell(g, 40, 25, 7.5, A * out1, { lt: lt * 0.3, col: 'rgba(170,175,185,0.9)', fill: 'rgba(90,92,100,0.55)', nucCol: 'rgba(60,62,70,0.8)', wob: 0.02 });
      tx(g, 'z', 46.5 + Math.sin(lt) * 0.3, 16.5 - (lt % 2) * 0.8, 1.8, DIM, 'center', 900, SANS, A * out1 * A_(lt, L[0] + 0.6, 0.5));
      tx(g, 'z', 48.5, 14 - (lt % 2) * 0.8, 1.4, DIM, 'center', 900, SANS, A * out1 * A_(lt, L[0] + 0.9, 0.5));
      chip(g, 76, 30, '衰老细胞', '#c9d3e3', A_(lt, L[1], 0.5) * out1);
      tx(g, '不分裂 · 不干活 · 也不死', 76, 34, 1.7, DIM, 'center', 700, SANS, A_(lt, L[0] + 1.0, 0.6) * out1);
      // inflammatory signals ripple outward
      if (inf > 0.01) {
        for (i = 0; i < 3; i++) { var rr = ((lt - L[2]) * 6 + i * 6) % 18; if (lt > L[2]) ring(g, 40, 25, 8 + rr, 'rgba(255,107,107,0.8)', 0.3, inf * out1 * (1 - rr / 18)); }
        var r2 = rng(17);
        for (i = 0; i < 24; i++) { var a2 = r2() * TAU, sp = (lt * (0.6 + r2() * 0.6) + r2()) % 1; dot(g, 40 + Math.cos(a2) * (8 + sp * 16) * 1.4, 25 + Math.sin(a2) * (8 + sp * 16) * 0.9, 0.35, INF, inf * out1 * (1 - sp)); }
        chip(g, 76, 14, '炎症信号', INF, inf * out1, 'rgba(56,18,18,0.95)');
        tx(g, '拖累周围的细胞', 76, 18.5, 1.7, FG, 'center', 700, SANS, A_(lt, L[2] + 1.2, 0.6) * out1);
      }
    }
    // stem cells: fewer and slower with age
    var sa = A_(lt, L[3] - 0.2, 0.6);
    if (sa > 0.01) {
      var cols = [[28, '年轻', 1.0], [72, '年老', 0.3]];
      for (i = 0; i < 2; i++) {
        var c = cols[i], cx = c[0], k = c[2], ca = A_(lt, L[3] + i * (L[4] - L[3]), 0.6) * sa;
        if (ca <= 0.01) continue;
        glow(g, cx, 22, 6, 'rgba(98,214,160,0.8)', 0.35 * k * ca);
        cell(g, cx, 22, 4, ca, { lt: lt, col: LEAF, fill: 'rgba(98,214,160,' + (0.15 + 0.25 * k) + ')', nucCol: 'rgba(98,214,160,0.5)' });
        // new cells budding off and drifting down
        var rate = k > 0.5 ? 1.6 : 0.45, n = 6;
        for (var j = 0; j < n; j++) {
          var ph = (lt * rate * 0.25 + j / n) % 1; if (k < 0.5 && j % 3) continue;
          var px = cx + Math.sin(j * 2.1) * 6 * ph, py = 22 + 4 + ph * 14;
          cell(g, px, py, 1.6, ca * (1 - ph) * 0.9, { lt: lt + j, nuc: false, col: CELLC });
        }
        tx(g, c[1], cx, 13.5, 2.4, k > 0.5 ? LEAF : DIM, 'center', 900, SANS, ca);
        tx(g, k > 0.5 ? '干细胞 · 源源不断补充' : '干细胞 · 越来越少、越来越慢', cx, 44, 1.8, k > 0.5 ? LEAF : DIM, 'center', 800, SANS, ca);
      }
      arrow(g, 42, 22, 58, 22, 'rgba(238,242,248,0.5)', 0.3, A_(lt, L[4], 0.5) * sa, 1);
    }
  };
