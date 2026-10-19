  // ================= copper video: d6-d10 =================
  function loopPath(x0, y0, x1, y1, r) {
    var P = [], n = 8, i, a;
    P.push([x0 + r, y0]); P.push([x1 - r, y0]);
    for (i = 1; i <= n; i++) { a = -Math.PI / 2 + (Math.PI / 2) * i / n; P.push([x1 - r + r * Math.cos(a), y0 + r + r * Math.sin(a)]); }
    P.push([x1, y1 - r]);
    for (i = 1; i <= n; i++) { a = (Math.PI / 2) * i / n; P.push([x1 - r + r * Math.cos(a), y1 - r + r * Math.sin(a)]); }
    P.push([x0 + r, y1]);
    for (i = 1; i <= n; i++) { a = Math.PI / 2 + (Math.PI / 2) * i / n; P.push([x0 + r + r * Math.cos(a), y1 - r + r * Math.sin(a)]); }
    P.push([x0, y0 + r]);
    for (i = 1; i <= n; i++) { a = Math.PI + (Math.PI / 2) * i / n; P.push([x0 + r + r * Math.cos(a), y0 + r + r * Math.sin(a)]); }
    return P;
  }
  function ironBlock(g, x, y, w, h, a) {
    rbox(g, x, y, w, h, 0.6, 'rgba(210,220,236,0.9)', 0.25, 'rgba(150,165,190,0.55)', a);
    tx(g, 'Fe', x + w / 2, y + h / 2 + 0.1, 3.2, '#e6eefb', 'center', 900, MONO, a);
  }
  function loopScene(g, lt, L, mode) {
    var x0 = 12, y0 = 12, x1 = 88, y1 = 36, P = loopPath(x0, y0, x1, y1, 5);
    var la = A_(lt, 0.2, 0.9);
    wire(g, P, COP, 0.9, la); wire(g, P, 'rgba(255,214,170,0.35)', 0.3, la);
    var mv = mode ? A_(lt, 0.2, 0.8) : A_(lt, L[3] - 0.1, 0.5);
    var t0 = mode ? 0.2 : L[3];
    var ex = mv * Math.sin((lt - t0) * 3.2) * 2.6, ex2 = mv * Math.sin((lt - t0 - 0.22) * 3.2) * 2.2 * A_(lt, t0 + 0.2, 0.4);
    var ba = mode ? A_(lt, 0.0, 0.6) : A_(lt, L[1] - 0.1, 0.8);
    ironBlock(g, 17 + ex, 17, 9, 14, ba); ironBlock(g, 74 + ex2, 17, 9, 14, ba);
    if (mv > 0.05) {
      pulses(g, P, lt, 0.28, 6, '#ffe2b0', mv * 0.9, 0.42);
      glow(g, 21.5 + ex, 24, 9, 'rgba(255,200,130,0.9)', 0.18 * mv * (0.5 + 0.5 * Math.sin((lt - t0) * 6.4)));
    }
    return { ex: ex, ex2: ex2, P: P };
  }
  DRAW.d6 = function (g, lt, L) {
    var r = loopScene(g, lt, L, false);
    chip(g, 50, 8.2, '又大又长的铜环', COP, W_(lt, L[0] + 0.1, L[1] - 0.1, 0.6, 0.4), 'rgba(50,30,14,0.95)');
    var ca = A_(lt, L[1] + 0.2, 0.7);
    chip(g, 21.5, 41, '铁块', '#b4c4dc', ca); chip(g, 78.5, 41, '铁块', '#b4c4dc', ca);
    chip(g, 50, 41.6, '磁铁或带电的铁芯', GOLD, A_(lt, L[2] + 0.1, 0.7) * (1 - A_(lt, L[3] + 0.1, 0.5)), 'rgba(40,30,12,0.95)');
    var da = A_(lt, L[3] + 0.1, 0.6);
    arrow(g, 14, 44, 26, 44, GOLD, 0.35, da, 1.0); tx(g, '推这一头', 33, 44.4, 1.9, GOLD, 'left', 700, SANS, da);
    var fa = A_(lt, L[4] + 0.2, 0.7);
    arrow(g, 86, 44, 74, 44, LEAF, 0.35, fa, 1.0); tx(g, '那一头跟着动', 71, 44.4, 1.9, LEAF, 'right', 700, SANS, fa);
  };
  DRAW.d7 = function (g, lt, L) {
    var r = loopScene(g, lt, L, true);
    chip(g, 50, 8.2, '铁块一动，铜环里生出电流', GOLD, W_(lt, L[0] + 0.1, L[1] - 0.2, 0.6, 0.4), 'rgba(40,30,12,0.95)');
    var ca = A_(lt, L[1] + 0.1, 0.7);
    arrow(g, 34, 9.5, 66, 9.5, COP, 0.35, ca, 1.0); tx(g, '电流 →', 50, 6.2, 1.9, COP, 'center', 700, SANS, ca * (1 - A_(lt, L[2] + 0.6, 0.5)));
    var pa = A_(lt, L[2] + 0.1, 0.7);
    ring(g, 78.5, 24, 9.4, LEAF, 0.3, pa * (0.5 + 0.5 * Math.sin(lt * 7)));
    chip(g, 50, 41.6, '电流去推另一头的铁块', LEAF, pa * (1 - A_(lt, L[3] + 0.1, 0.5)));
    var ga = A_(lt, L[3] + 0.2, 0.8);
    chip(g, 21.5, 41, '发电机', GOLD, ga, 'rgba(40,30,12,0.95)'); chip(g, 78.5, 41, '马达', LEAF, ga);
  };

  DRAW.d8 = function (g, lt, L) {
    var a0 = A_(lt, 0.2, 0.8), y = 26, i;
    // near wire: shaken hard; far wire: a separate piece that answers weakly
    var sk = A_(lt, L[1] - 0.1, 0.8), kn = W_(lt, L[2], L[3] - 0.1, 0.5, 0.5);
    function waveY(x, amp, ph) { return y + amp * Math.sin(x * 0.55 - lt * 7 + ph) * Math.exp(-Math.max(0, x - 8) / 22); }
    var pts = [], n = 60;
    for (i = 0; i <= n; i++) { var x = 6 + 44 * i / n; pts.push([x, waveY(x - 6, 3.2 * sk + 0.15, 0)]); }
    wire(g, pts, COP, 0.8, a0); wire(g, pts, 'rgba(255,214,170,0.35)', 0.25, a0);
    // knotting: a loop that ties and unties near the hand end
    if (kn > 0.01) {
      var kk = 0.5 + 0.5 * Math.sin(lt * 4), kp = [], m = 40;
      for (i = 0; i <= m; i++) { var tt = i / m * TAU; kp.push([12 + 3 * Math.cos(tt) * (0.4 + kk), 26 - 6.5 + 4.2 * Math.sin(tt) * (0.4 + kk)]); }
      wire(g, kp, COP, 0.7, kn);
    }
    var ha = A_(lt, L[1] - 0.3, 0.7);
    dot(g, 6, y, 1.2, '#ffe2b0', a0); glow(g, 6, y, 6, 'rgba(255,214,170,0.9)', 0.4 * sk);
    chip(g, 14, 15, '这一端：抖、绕、解', GOLD, ha * (1 - A_(lt, L[3] + 0.1, 0.5)), 'rgba(40,30,12,0.95)');
    // far wire
    var fa = A_(lt, L[0] + 0.3, 0.8), amp = 1.1 * A_(lt, L[3] - 0.1, 0.9) * sk;
    var fp = [];
    for (i = 0; i <= 40; i++) { var xx = 62 + 32 * i / 40; fp.push([xx, y + amp * Math.sin(xx * 0.55 - (lt - 0.35) * 7) * Math.min(1, (xx - 62) / 6)]); }
    wire(g, fp, COP, 0.8, fa); wire(g, fp, 'rgba(255,214,170,0.35)', 0.25, fa);
    // invisible field between
    var fl = A_(lt, L[3] - 0.1, 0.9);
    for (i = 0; i < 4; i++) { var q = fr(lt * 0.6 + i / 4); ring(g, 56, y, 3 + q * 7, 'rgba(143,208,255,0.9)', 0.18, fl * (1 - q) * 0.7); }
    chip(g, 78, 15, '远处的铜线也跟着动', LEAF, A_(lt, L[3] + 0.1, 0.8));
    tx(g, '示意：远端动得更弱', 78, 34.4, 1.6, DIM, 'center', 600, SANS, fl);
    var ga = A_(lt, L[4] + 0.1, 0.8);
    chip(g, 50, 43.6, '只有铜线，和铜线的运动', GOLD, ga, 'rgba(40,30,12,0.95)');
  };

  DRAW.d9 = function (g, lt, L) {
    var a0 = A_(lt, 0.1, 0.8), wy = 18, i;
    wire(g, [[10, wy], [90, wy]], COP, 0.8, a0);
    // two ends: a wheel (this end) and a lamp (the other end)
    var shake = A_(lt, 0.4, 0.6);
    wheelW(g, 6, wy, 3.6, lt * 3, a0, ICE, 6);
    var lampOn = clamp(0.0 + sm(L[2] + 0.5, L[2] + 1.2, lt) * 1.0);
    glow(g, 94, wy, 9, 'rgba(255,224,150,0.95)', 0.55 * lampOn);
    ring(g, 94, wy, 3, 'rgba(255,224,150,0.9)', 0.5, a0); dot(g, 94, wy, 1.6 + 0.8 * lampOn, 'rgba(255,224,150,' + (0.2 + 0.8 * lampOn) + ')', a0);
    chip(g, 8, 8, '这一端', ICE, A_(lt, 0.3, 0.6)); chip(g, 92, 8, '另一端', GOLD, A_(lt, 0.3, 0.6), 'rgba(40,30,12,0.95)');
    // the signal: a fast bright pulse
    var sa = A_(lt, L[1] + 0.1, 0.5) * (1 - A_(lt, L[4] - 0.2, 0.6));
    var u = fr(lt * 1.6); if (sa > 0.01) { var sx = 10 + 80 * u; glow(g, sx, wy, 8, 'rgba(255,235,190,0.95)', 0.7 * sa * (1 - Math.abs(u - 0.5) * 0.4)); dot(g, sx, wy, 1.0, '#fff4da', sa); ln(g, Math.max(10, sx - 12), wy, sx, wy, 'rgba(255,235,190,0.6)', 0.5, null, sa); }
    chip(g, 50, 9.6, '几乎不用等', GOLD, W_(lt, L[1] + 0.1, L[2], 0.5, 0.5), 'rgba(40,30,12,0.95)');
    chip(g, 50, 9.6, '信号 ≈ 光速的 50%–99%', GOLD, W_(lt, L[3] + 0.1, L[4] - 0.2, 0.6, 0.5), 'rgba(40,30,12,0.95)');
    // electrons: slow drift, shown with a magnifier
    var ea = A_(lt, L[4] + 0.1, 0.8), r = rng(3);
    for (i = 0; i < 16; i++) { var ex0 = 14 + i * 4.9, drift = (lt - L[4]) * 0.06, jy = (r() - 0.5) * 0.8; dot(g, ex0 + drift + Math.sin(lt * 5 + i) * 0.05, wy + jy, 0.42, '#bfe3ff', ea * 0.9); }
    var mz = A_(lt, L[5] + 0.1, 0.8) * (1 - A_(lt, L[7] - 0.1, 0.5)), mx = 50, my = 36, mr = 9;
    if (mz > 0.01) {
      ln(g, 46, wy + 1, mx - mr * 0.5, my - mr + 1, 'rgba(143,208,255,0.35)', 0.2, [0.6, 0.5], mz); ln(g, 54, wy + 1, mx + mr * 0.5, my - mr + 1, 'rgba(143,208,255,0.35)', 0.2, [0.6, 0.5], mz);
      g.save(); g.globalAlpha *= mz; g.beginPath(); g.arc(mx, my, mr, 0, TAU); g.fillStyle = 'rgba(10,20,36,0.85)'; g.fill(); g.strokeStyle = ICE; g.lineWidth = 0.3; g.stroke(); g.clip();
      for (i = 0; i < 6; i++) { var sx2 = mx - mr + ((i * 6.3 + (lt - L[5]) * 0.4) % (mr * 2 + 2)); dot(g, sx2, my + (i % 3 - 1) * 3, 0.9, '#bfe3ff', 1); }
      g.restore();
      tx(g, '放大看：电子在慢慢挪', 31, my, 1.8, DIM, 'center', 700, SANS, mz);
      tx(g, '23 μm / 秒', 78, my - 1.6, 3.6, ICE, 'center', 900, SANS, A_(lt, L[6] + 0.1, 0.7));
    }
    chip(g, 78, my + 4.4, '每秒只漂移这么多', ICE, A_(lt, L[6] + 0.3, 0.7) * (1 - A_(lt, L[7] + 0.1, 0.4)));
    var fa = A_(lt, L[7] + 0.1, 0.8);
    for (i = 0; i < 3; i++) { var q = fr(lt * 0.7 + i / 3); ring(g, 50, wy, 2 + q * 9, 'rgba(143,208,255,0.9)', 0.2, fa * (1 - q) * 0.8); }
    chip(g, 50, 44, '传过去的，是电磁场的变化', LEAF, fa);
  };

  DRAW.d10 = function (g, lt, L) {
    var items = [['银', 63, '#d8dee8', 0], ['铜', 59.6, COP, 1], ['金', 45, '#f2c66b', 2], ['铝', 37.7, '#a9b6c8', 3], ['铁', 10, '#8a97ab', 4]];
    var i, bx = 24, sc = 0.55, y0 = 14;
    var a0 = A_(lt, L[0] + 0.1, 0.8);
    chip(g, 40, 7.4, '导电性（百万西门子 / 米）', DIM, a0);
    for (i = 0; i < items.length; i++) {
      var it = items[i], a = A_(lt, L[1] - 0.1 + i * 0.28, 0.7), y = y0 + i * 6.8, w = it[1] * sc * eo(pr(lt, L[1] + i * 0.28, 0.9));
      var hi = (i === 1) ? 1 : 0, hs = (i === 0) ? A_(lt, L[2] + 0.1, 0.5) : 0;
      tx(g, it[0], bx - 3, y, 2.6, it[2], 'right', 900, SANS, a);
      rbox(g, bx, y - 1.9, Math.max(0.3, w), 3.8, 0.9, null, 0, it[2], a * (hi ? 1 : 0.8));
      if (hi) glow(g, bx + w, y, 6, 'rgba(224,151,90,0.9)', 0.25 * a);
      tx(g, it[1], bx + w + 1.4, y + 0.1, 1.8, it[2], 'left', 700, MONO, a * eo(pr(lt, L[1] + i * 0.28 + 0.7, 0.6)));
      if (hs > 0.01) ring(g, bx + w * 0.5, y, 0.1, it[2], 0.1, 0);
    }
    var sa = A_(lt, L[2] + 0.1, 0.6) * (1 - A_(lt, L[4] - 0.1, 0.5));
    chip(g, 34, 44, '铜：数一数二', COP, A_(lt, L[1] + 1.6, 0.7) * (1 - A_(lt, L[2] + 0.1, 0.4)), 'rgba(50,30,14,0.95)');
    chip(g, 34, 44, '只略逊于银', '#d8dee8', W_(lt, L[2] + 0.1, L[3] + 0.1, 0.5, 0.4));
    chip(g, 34, 44, '银贵得多', RED, W_(lt, L[3] + 0.2, L[4] - 0.1, 0.5, 0.4));
    // half donut: about half of the mined copper becomes wire
    var da = A_(lt, L[4] + 0.1, 0.8), cx = 80, cy = 30, R = 10;
    if (da > 0.01) {
      g.save(); g.globalAlpha *= da; g.lineCap = 'butt'; g.lineWidth = 4.2;
      g.strokeStyle = 'rgba(147,161,182,0.4)'; g.beginPath(); g.arc(cx, cy, R, 0, TAU); g.stroke();
      g.strokeStyle = COP; g.beginPath(); g.arc(cx, cy, R, -Math.PI / 2, -Math.PI / 2 + Math.PI * eo(pr(lt, L[4] + 0.3, 1.2))); g.stroke();
      g.restore();
      tx(g, '≈ 一半', cx, cy - 0.8, 2.6, COP, 'center', 900, SANS, da); tx(g, '做成电线', cx, cy + 3.0, 1.8, FG, 'center', 700, SANS, da);
    }
  };
