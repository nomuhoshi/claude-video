
  // ================= scene 4: one atom falls in, the heat kicks the neighbours, and it runs away =================
  var CHAIN = null;
  function buildChain() {
    var sc = sc_('s4'), L = sc.ls, cols = 12, rows = 5, ox = 5, oy = 2, cells = [], i, j, maxD = 0;
    for (j = 0; j < rows; j++) for (i = 0; i < cols; i++) {
      var d = Math.sqrt((i - ox) * (i - ox) + (j - oy) * (j - oy));
      cells.push({ i: i, j: j, x: 13 + i * 6.7, y: 21 + j * 4.6, d: d });
      if (d > maxD) maxD = d;
    }
    var tStart = L[0] + 0.7, target = (L[6] + 0.2) - tStart, rho = 0.86, m = Math.ceil(maxD);
    var D0 = target * (1 - rho) / (1 - Math.pow(rho, m)), cum = [0], k;
    for (k = 1; k <= m; k++) cum.push(cum[k - 1] + D0 * Math.pow(rho, k - 1));
    function cumAt(d) { var a = Math.floor(d), f = d - a; return a >= m ? cum[m] : cum[a] + (cum[a + 1] - cum[a]) * f; }
    var rr = rng(31);
    cells.forEach(function (c) { c.t = tStart + cumAt(c.d) + (rr() - 0.5) * 0.12; c.tilt = (rr() - 0.5) * 0.5; });
    cells[oy * cols + ox].t = tStart;
    var times = cells.map(function (c) { return c.t; }).sort(function (a, b) { return a - b; });
    CHAIN = { cells: cells, times: times, tStart: tStart, L: L };
    DCUES.push([sc.s + tStart - 0.1, 'flash', null]);
    cells.forEach(function (c, n) { if (n % 2 === 0 || c.d < 1.5) DCUES.push([sc.s + c.t, 'spark', PENTH[(n * 5) % 6] * (c.d < 2 ? 1 : 2)]); });
    var N = cells.length;
    function frac(lt) { var lo = 0, hi = N; while (lo < hi) { var mid = (lo + hi) >> 1; if (times[mid] <= lt) lo = mid + 1; else hi = mid; } return lo / N; }
    CHAIN.frac = frac;
    DBEDS.push({ k: 'crackle', t0: sc.s + tStart - 0.2, t1: sc.e + 0.9, fo: 1.6, fi: 0.5, fn: function (t) { return 0.04 + 0.34 * Math.pow(frac(t - sc.s), 0.8); } });
    DBEDS.push({ k: 'roar', t0: sc.s + tStart - 0.2, t1: sc.e + 0.9, fo: 1.6, fi: 0.6, fn: function (t) { return 0.02 + 0.24 * Math.pow(frac(t - sc.s), 1.1); } });
  }
  DRAW.d4 = function (g, lt, L) {
    if (!CHAIN) buildChain();
    var cells = CHAIN.cells, fr = CHAIN.frac(lt), ia = eo(pr(lt, 0.1, 0.9));
    // under-glow of the burnt region
    g.save(); g.globalCompositeOperation = 'lighter';
    cells.forEach(function (c) {
      if (lt < c.t) return;
      var a = Math.min(1, (lt - c.t) / 0.7);
      halo(g, c.x, c.y, 5.2, 'rgba(255,120,50,' + (0.34 * a * (0.85 + 0.15 * Math.sin(lt * 6 + c.i))).toFixed(3) + ')', 1);
    });
    g.restore();
    cells.forEach(function (c) {
      var done = lt >= c.t, since = lt - c.t;
      var pre = clamp((lt - (c.t - 1.8)) / 1.8) * (done ? 0 : 1);
      var jig = (done ? 0.28 : 0.04 + 0.18 * pre) * Math.sin(lt * (14 + 20 * pre) + c.i * 1.7 + c.j);
      var y = c.y + jig * 0.6, x = c.x + jig;
      if (!done) {
        atom(g, x - 1.5, y, 0.95, 'C', ia, true);
        atom(g, x + 0.3, y, 0.72, 'O', ia, true); atom(g, x + 1.75, y, 0.72, 'O', ia, true);
        if (pre > 0.05) halo(g, x, y, 3.6, 'rgba(255,190,100,0.55)', pre * 0.8);
      } else {
        atom(g, x, y, 0.95, 'C', ia, true);
        atom(g, x - 1.95, y, 0.72, 'O', ia, true); atom(g, x + 1.95, y, 0.72, 'O', ia, true);
        bond(g, x - 1.95, y, x + 1.95, y, 0.18, 'rgba(238,242,248,0.5)', ia);
        if (since < 0.9) {
          halo(g, x, y, 6, 'rgba(255,240,190,0.95)', clamp(1 - since / 0.5));
          ring(g, x, y, 0.8 + since * 7, 'rgba(255,200,110,0.95)', 0.2, clamp(1 - since / 0.9));
        }
      }
    });
    // the flame on top of the burning lattice
    var fk = Math.pow(clamp((fr - 0.04) / 0.8), 0.7) * eo(pr(lt, L[3], 1.2));
    flame(g, 50, 19.5, 34 + 34 * fr, 12 + 6 * fr, lt, fk, 8);
    embers(g, 50, 17, 50, 12, lt, fk, 3, 24);
    // wording
    var a1 = eo(pr(lt, L[7], 0.7)), a2 = eo(pr(lt, L[8], 0.7));
    if (a1 > 0.01) {
      pill(g, 31, 3.6, 38, 6, 'rgba(6,8,13,0.82)', a1 * (1 - a2));
      tx(g, '连锁反应 = 火', 50, 6.6, 3.1, GOLD, 'center', 900, SANS, a1 * (1 - a2));
    }
    if (a2 > 0.01) {
      pill(g, 21, 3.6, 58, 6, 'rgba(6,8,13,0.82)', a2);
      tx(g, '热  →  更多原子冲过山顶  →  更多热', 50, 6.6, 2.5, FG, 'center', 700, SANS, a2);
    }
    var a0 = eo(pr(lt, L[0] + 0.1, 0.7)) * (1 - eo(pr(lt, L[3], 0.6)));
    tx(g, '深坑里掉进了一个', 50, 12.2, 2.0, GOLD, 'center', 700, SANS, a0 * 0.0);
  };
