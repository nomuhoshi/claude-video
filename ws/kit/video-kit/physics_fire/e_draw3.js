
  // ================= scene 3: heat is jiggling; a few atoms are fast enough =================
  var HEAT = null, VTH = 2.2;
  function sigmaT(T) { return 0.88 * Math.sqrt(T); }
  function tri(u, W) { var m = ((u % (2 * W)) + 2 * W) % (2 * W); return W - Math.abs(m - W); }
  function buildHeat() {
    var sc = sc_('s3'), L = sc.ls, dur = sc.e - sc.s, N = 64, r = rng(77), i;
    function gauss() { var u = 1 - r(), v = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(TAU * v); }
    var P = [];
    for (i = 0; i < N; i++) {
      var g1 = gauss(), g2 = gauss(), g3 = gauss(), s = Math.sqrt(g1 * g1 + g2 * g2 + g3 * g3), ang = r() * TAU;
      P.push({ x: r(), y: r(), vx: Math.cos(ang), vy: Math.sin(ang), s: s });
    }
    var tRamp0 = L[2] - 0.2, tRamp1 = L[5] + 0.5;
    function Tf(lt) { return 0.14 + 0.03 * sm(0, L[1], lt) + 0.83 * sm(tRamp0, tRamp1, lt); }
    var dt = 1 / 60, n = Math.ceil(dur / dt) + 2, S = new Float32Array(n), acc = 0;
    for (i = 0; i < n; i++) { S[i] = acc; acc += Math.sqrt(Tf(i * dt)) * dt; }
    var order = P.map(function (p, k) { return k; }).sort(function (a, b) { return P[b].s - P[a].s; });
    // the six fastest atoms get captured by the carbon, one by one, as soon as they are fast enough
    var caps = [], j, lastCap = -9;
    for (j = 0; j < order.length && caps.length < 6; j++) {
      var pi = order[j];
      for (i = 0; i < n; i++) {
        var t = i * dt;
        if (P[pi].s * sigmaT(Tf(t)) > VTH + 0.1) {
          var tc = Math.max(t + 0.35, lastCap + 0.75);
          caps.push({ p: pi, t: tc, slot: caps.length }); lastCap = tc; break;
        }
      }
    }
    caps.sort(function (a, b) { return a.t - b.t; });
    caps.forEach(function (c, k) { c.slot = k; });
    HEAT = { P: P, S: S, dt: dt, Tf: Tf, caps: caps, L: L, N: N };
    caps.forEach(function (c) { DCUES.push([sc.s + c.t + 0.45, 'bond', null]); });
    // first moment each atom is fast enough: a little glass ping
    var pings = 0;
    P.forEach(function (p, k) {
      for (var q = 0; q < n; q++) {
        if (p.s * sigmaT(Tf(q * dt)) > VTH) { if (pings < 16) { DCUES.push([sc.s + q * dt, 'spark', PENTH[(pings * 3) % 6]]); pings++; } break; }
      }
    });
    // heat ticks: more and more tiny clicks as it gets hotter
    var rr = rng(5), tt = 0.4;
    while (tt < dur) { var Tn = Tf(tt); DCUES.push([sc.s + tt, 'tick', 0.4 + rr() * 0.6]); tt += 1 / (3 + 46 * Tn * Tn) * (0.6 + rr() * 0.8); }
  }
  var BX = { x0: 6, y0: 9, x1: 50, y1: 37.5 };
  function maxw(v, s) { return v * v * Math.exp(-v * v / (2 * s * s)) / (s * s * s); }
  DRAW.d3 = function (g, lt, L) {
    if (!HEAT) buildHeat();
    var i, W = BX.x1 - BX.x0, H = BX.y1 - BX.y0, T = HEAT.Tf(lt), Si = HEAT.S[Math.max(0, Math.min(HEAT.S.length - 1, Math.round(lt / HEAT.dt)))];
    var ba = eo(pr(lt, L[0] + 0.1, 0.9));
    // the box of atoms
    g.save(); g.globalAlpha *= ba;
    var gr = g.createLinearGradient(0, BX.y0, 0, BX.y1); gr.addColorStop(0, 'rgba(143,208,255,0.10)'); gr.addColorStop(1, 'rgba(143,208,255,0.03)');
    g.fillStyle = gr; g.fillRect(BX.x0, BX.y0, W, H);
    g.strokeStyle = 'rgba(200,230,255,0.3)'; g.lineWidth = 0.14; g.strokeRect(BX.x0, BX.y0, W, H);
    g.restore();
    var Cx = 28, Cy = 32.4, rC = 2.6;
    var heatGlow = clamp((T - 0.3) / 0.7);
    atom(g, Cx, Cy, rC, 'C', ba);
    tx(g, '碳', Cx + 5.4, Cy + 1.2, 1.7, DIM, 'left', 500, SANS, ba);
    var capMap = {};
    HEAT.caps.forEach(function (c) { capMap[c.p] = c; });
    for (i = 0; i < HEAT.N; i++) {
      var p = HEAT.P[i], x = BX.x0 + 1 + tri(p.x * (W - 2) + p.vx * 8.5 * p.s * Si, W - 2), y = BX.y0 + 1 + tri(p.y * (H - 2) + p.vy * 8.5 * p.s * Si, H - 2);
      var v = p.s * sigmaT(T), fast = v > VTH, c = capMap[i];
      if (c && lt >= c.t) {
        var sx = BX.x0 + 1 + tri(p.x * (W - 2) + p.vx * 8.5 * p.s * HEAT.S[Math.round(c.t / HEAT.dt)], W - 2), sy = BX.y0 + 1 + tri(p.y * (H - 2) + p.vy * 8.5 * p.s * HEAT.S[Math.round(c.t / HEAT.dt)], H - 2);
        var q = eo(pr(lt, c.t, 0.45)), ang = c.slot * 1.05 + 0.4, tx_ = Cx + Math.cos(ang) * (rC + 0.9) * 1.55, ty_ = Cy + Math.sin(ang) * (rC + 0.9) * 1.1;
        x = mix(sx, tx_, q) + Math.sin(lt * 31 + c.slot) * 0.09 * q; y = mix(sy, ty_, q) + Math.cos(lt * 27 + c.slot) * 0.09 * q;
        var f = clamp(1 - (lt - c.t - 0.45) / 0.9);
        if (f > 0 && lt > c.t + 0.45) { halo(g, x, y, 5.5, 'rgba(255,225,150,0.8)', f); ring(g, x, y, 0.6 + (1 - f) * 5, 'rgba(255,240,200,0.9)', 0.18, f); }
        halo(g, x, y, 2.4, 'rgba(255,170,70,0.6)', q * 0.8);
        atom(g, x, y, 0.95, 'O', ba, true);
        continue;
      }
      if (fast) {
        halo(g, x, y, 3.2, 'rgba(255,215,120,0.85)', ba * 0.9);
        ln(g, x, y, x - p.vx * 1.6, y - p.vy * 1.6, 'rgba(255,215,120,0.7)', 0.22, null, ba);
      }
      atom(g, x, y, 0.8, 'O', ba * (fast ? 1 : 0.8), true);
    }
    // the speed curve
    var pa = eo(pr(lt, L[2] + 0.2, 1.0));
    var cx0 = 61, cx1 = 94, cy1 = 36, cy0 = 15, vmax = 4.4, ymax = 2.4;
    function CX(v) { return cx0 + (cx1 - cx0) * v / vmax; }
    function CY(f) { return cy1 - (cy1 - cy0) * Math.min(1.08, f / ymax); }
    if (pa > 0.01) {
      var s = sigmaT(T);
      g.save(); g.globalAlpha *= pa;
      ln(g, cx0, cy1, cx1 + 1, cy1, 'rgba(190,210,235,0.45)', 0.15); ln(g, cx0, cy0 - 1, cx0, cy1, 'rgba(190,210,235,0.45)', 0.15);
      tx(g, '运动得越快 →', cx1, cy1 + 2.5, 1.5, DIM, 'right', 500, SANS);
      tx(g, '原子数量', cx0 - 0.3, cy0 - 6.2, 1.5, DIM, 'left', 500, SANS);
      // tail beyond the "can climb the hill" speed
      g.beginPath(); g.moveTo(CX(VTH), cy1);
      for (i = 0; i <= 50; i++) { var vv = VTH + (vmax - VTH) * i / 50; g.lineTo(CX(vv), CY(maxw(vv, s))); }
      g.lineTo(CX(vmax), cy1); g.closePath();
      g.fillStyle = 'rgba(242,198,107,' + (0.35 + 0.35 * clamp((T - 0.3) / 0.7)) + ')'; g.fill();
      g.beginPath();
      for (i = 0; i <= 120; i++) { vv = vmax * i / 120; var yc = CY(maxw(vv, s)); if (i) g.lineTo(CX(vv), yc); else g.moveTo(CX(vv), yc); }
      g.strokeStyle = 'rgb(' + Math.round(mix(143, 255, clamp((T - 0.1) / 0.9))) + ',' + Math.round(mix(208, 157, clamp((T - 0.1) / 0.9))) + ',' + Math.round(mix(255, 110, clamp((T - 0.1) / 0.9))) + ')';
      g.lineWidth = 0.45; g.stroke();
      ln(g, CX(VTH), cy0 - 1, CX(VTH), cy1, GOLD, 0.2, [0.7, 0.5]);
      tx(g, '能冲过山顶的速度', CX(VTH) - 0.6, cy0 - 3, 1.6, GOLD, 'left', 700, SANS, eo(pr(lt, L[4] - 0.2, 0.7)));
      g.restore();
      tx(g, '少数', CX(VTH) + 6.4, cy1 - 5.2, 2.0, GOLD, 'center', 900, SANS, eo(pr(lt, L[3] + 0.3, 0.8)) * pa);
    }
    // thermometer
    var ta = eo(pr(lt, L[2] - 0.3, 0.8));
    if (ta > 0.01) {
      var tx0 = BX.x0, tw = W, ty = 41.4, tt = clamp((T - 0.14) / 0.86);
      g.save(); g.globalAlpha *= ta;
      pill(g, tx0 + 6, ty - 0.5, tw - 6, 1.0, 'rgba(190,210,235,0.18)', 1);
      var tg = g.createLinearGradient(tx0 + 6, 0, tx0 + tw, 0); tg.addColorStop(0, '#8fd0ff'); tg.addColorStop(0.55, '#ffc86a'); tg.addColorStop(1, '#ff6a3c');
      g.fillStyle = tg; g.beginPath(); if (g.roundRect) g.roundRect(tx0 + 6, ty - 0.5, (tw - 6) * tt, 1.0, 0.5); else g.rect(tx0 + 6, ty - 0.5, (tw - 6) * tt, 1.0); g.fill();
      g.restore();
      tx(g, '温度', tx0, ty, 1.6, DIM, 'left', 500, SANS, ta);
      var ga = eo(pr(lt, L[6] + 0.1, 0.8));
      if (ga > 0) {
        dot(g, tx0 + tw, ty, 0.9, '#ff8a5a', ga); halo(g, tx0 + tw, ty, 3.5, 'rgba(255,130,70,0.7)', ga * (0.6 + 0.4 * Math.sin(lt * 5)));
        tx(g, '几百摄氏度', tx0 + tw - 1.6, ty - 2.3, 1.8, HOT, 'right', 700, SANS, ga);
      }
    }
  };
