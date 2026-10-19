  // ================= Maxwell: scenes m19-m25 (gas, the demon, the laboratory, the end, Hertz, today, Feynman) =================
  // speeds drawn from a Maxwell distribution (3D: magnitude of three gaussians), fixed by a seed
  function mbSpeeds(n, seed) { var r = rng(seed), out = [], i; for (i = 0; i < n; i++) { var s = 0; for (var k = 0; k < 3; k++) { var u = Math.max(1e-6, r()), v = r(); var z = Math.sqrt(-2 * Math.log(u)) * Math.cos(TAU * v); s += z * z; } out.push([Math.sqrt(s), r(), r(), r()]); } return out; }
  var GAS = mbSpeeds(60, 19), GASMAX = (function () { var c = [], i; for (i = 0; i < 12; i++) c[i] = 0; GAS.forEach(function (m) { c[Math.min(11, Math.floor(m[0] / 4 * 12))]++; }); return Math.max.apply(null, c); })();

  // ---------- m19: a bottle of air, counted by speed ----------
  DRAW.m19 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8), x0 = 12, y0 = 14, W = 30, H = 26;
    // a box, drawn in 3D
    poly3(g, x0, y0 + H, [[0, 0, 6], [W, 0, 6], [W, H, 6], [0, H, 6]], 'rgba(120,160,200,0.06)', 'rgba(200,225,245,0.25)', 0.15, A);
    for (i = 0; i < GAS.length; i++) {
      var m = GAS[i], sp = m[0] * 0.18, x = x0 + 1 + tri(m[1] * 2 + lt * sp * 0.9 / W * 10) * (W - 2), y = y0 + 1 + tri(m[2] * 2 + lt * sp * 1.1 / H * 10) * (H - 2);
      var hl = i === 7 && lt > L[1] && lt < L[2] + 0.2;
      dot(g, x, y, hl ? 0.9 : 0.6, speedCol(m[0] / 3.2), A);
      if (hl) { glow(g, x, y, 3, 'rgba(255,255,255,0.9)', 0.6); for (var k = 1; k < 12; k++) { var tt = lt - k * 0.05, xx = x0 + 1 + tri(m[1] * 2 + tt * sp * 0.9 / W * 10) * (W - 2), yy = y0 + 1 + tri(m[2] * 2 + tt * sp * 1.1 / H * 10) * (H - 2); dot(g, xx, yy, 0.3, 'rgba(255,255,255,0.6)', 1 - k / 12); } }
    }
    poly3(g, x0, y0 + H, [[0, 0, 0], [W, 0, 0], [W, H, 0], [0, H, 0]], null, 'rgba(210,235,250,0.55)', 0.2, A);
    poly3(g, x0, y0 + H, [[0, H, 0], [W, H, 0], [W, H, 6], [0, H, 6]], 'rgba(190,220,245,0.08)', 'rgba(210,235,250,0.5)', 0.18, A);
    poly3(g, x0, y0 + H, [[W, 0, 0], [W, H, 0], [W, H, 6], [W, 0, 6]], 'rgba(150,190,230,0.08)', 'rgba(210,235,250,0.5)', 0.18, A);
    tx(g, '一瓶空气', x0 + W / 2, 45, 1.9, DIM, 'center', 700, SANS, A);
    chip(g, 27, 9, '不去追每一个分子', DIM, A_(lt, L[1], 0.5) * (1 - A_(lt, L[2], 0.5)));
    // histogram builds up, then the curve
    var hs = A_(lt, L[2], 0.5);
    if (hs > 0.01) {
      var bx = 54, by = 40, bw = 38, bh = 26, NB = 12, cnt = [], f = clamp((lt - L[2]) / 2.2), nIn = Math.floor(f * GAS.length);
      for (i = 0; i < NB; i++) cnt[i] = 0;
      for (i = 0; i < nIn; i++) { var b = Math.min(NB - 1, Math.floor(GAS[i][0] / 4 * NB)); cnt[b]++; }
      ln(g, bx, by, bx + bw, by, 'rgba(238,242,248,0.5)', 0.2, null, hs); ln(g, bx, by, bx, by - bh, 'rgba(238,242,248,0.5)', 0.2, null, hs);
      for (i = 0; i < NB; i++) { var hh = cnt[i] / GASMAX * bh * 0.85; rbox(g, bx + i * bw / NB + 0.3, by - hh, bw / NB - 0.6, hh, 0.2, null, 0, speedCol((i + 0.5) / NB * 4 / 3.2), hs * 0.85); }
      var cv = A_(lt, L[2] + 2.2, 0.8);
      g.save(); g.globalAlpha *= cv; g.strokeStyle = GOLD; g.lineWidth = 0.4; g.beginPath();
      for (i = 0; i <= 80; i++) { var v = i / 80 * 4, fv = v * v * Math.exp(-v * v / 2), xx2 = bx + v / 4 * bw, yy2 = by - fv / 0.7358 * bh * 0.82; if (i === 0) g.moveTo(xx2, yy2); else g.lineTo(xx2, yy2); }
      g.stroke(); g.restore();
      tx(g, '慢', bx + 2, by + 2.8, 1.8, ICE, 'center', 700, SANS, hs); tx(g, '快', bx + bw - 2, by + 2.8, 1.8, HOT, 'center', 700, SANS, hs); tx(g, '速度 →', bx + bw / 2, by + 2.8, 1.7, DIM, 'center', 700, SANS, hs);
      tx(g, '分子个数', bx - 1, by - bh - 1.5, 1.7, DIM, 'left', 700, SANS, hs);
      chip(g, 73, 9, '麦克斯韦速度分布', GOLD, cv, 'rgba(48,38,12,0.95)');
    }
    chip(g, 73, 45.5, '物理学最早的统计规律之一', GOLD, A_(lt, L[3], 0.6), 'rgba(48,38,12,0.95)');
  };

  // ---------- m20: Maxwell's demon ----------
  var DEM = (function () {
    var M = mbSpeeds(44, 23), out = [], i, tl = [], tr = [];
    for (i = 0; i < M.length; i++) out.push({ v: M[i][0], px: M[i][1], py: M[i][2], side: i % 2, T: null });
    var fastL = out.filter(function (m) { return m.side === 0 && m.v > 1.9; }), slowR = out.filter(function (m) { return m.side === 1 && m.v < 1.4; });
    return { M: out, fastL: fastL, slowR: slowR };
  })();
  DRAW.m20 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8), Lx = 10, Rx = 52, W = 38, y0 = 12, H = 28, dx = 49, dy0 = 23, dy1 = 29;
    // schedule the transfers once we know the line times
    if (!DEM.ready) { var t = L[2] + 0.3, k = 0; for (i = 0; i < 8; i++) { if (DEM.fastL[i]) { DEM.fastL[i].T = t; t += 0.55; } if (DEM.slowR[i]) { DEM.slowR[i].T = t; t += 0.55; } } DEM.ready = true; }
    rbox(g, Lx, y0, W, H, 0.4, 'rgba(200,225,245,0.45)', 0.2, 'rgba(120,160,200,0.05)', A);
    rbox(g, Rx, y0, W, H, 0.4, 'rgba(200,225,245,0.45)', 0.2, 'rgba(120,160,200,0.05)', A);
    var open = 0;
    function boxPos(m, side, tt) { var x0 = side ? Rx : Lx, sp = m.v * 1.6; return [x0 + 1 + tri(m.px * 2 + tt * sp / W) * (W - 2), y0 + 1 + tri(m.py * 2 + tt * sp * 1.3 / H) * (H - 2)]; }
    var sum = [0, 0], n = [0, 0];
    for (i = 0; i < DEM.M.length; i++) {
      var m = DEM.M[i], side = m.side, p;
      if (m.T != null && lt >= m.T - 0.35) {
        var ns = 1 - m.side, u = (lt - (m.T - 0.35)) / 1.0;
        var door = [dx + (m.side ? 2.5 : -2.5), 26], door2 = [dx + (m.side ? -2.5 : 2.5) + (m.side ? -1 : 1), 26];
        if (u < 0.35) { var a0 = boxPos(m, m.side, m.T - 0.35); p = [mix(a0[0], door[0], u / 0.35), mix(a0[1], door[1], u / 0.35)]; open = Math.max(open, 1); }
        else if (u < 0.6) { p = [mix(door[0], door2[0], (u - 0.35) / 0.25), 26]; open = 1; side = ns; }
        else { var b0 = boxPos(m, ns, lt), w = clamp((u - 0.6) / 0.4); p = [mix(door2[0], b0[0], w), mix(26, b0[1], w)]; side = ns; }
      } else p = boxPos(m, side, lt);
      sum[side] += m.v * m.v; n[side]++;
      dot(g, p[0], p[1], 0.65, speedCol(m.v / 3), A);
    }
    // the wall and its little door
    ln(g, dx, y0, dx, dy0, '#cfd6e2', 0.8, null, A); ln(g, dx, dy1, dx, y0 + H, '#cfd6e2', 0.8, null, A);
    ln(g, dx, dy0, dx, dy1, '#cfd6e2', 0.8, null, A * (1 - open));
    demon(g, dx, 9, 1, A_(lt, L[0], 0.6), lt);
    // thermometers: the average energy on each side
    for (var s = 0; s < 2; s++) {
      var Tm = n[s] ? sum[s] / n[s] : 0, lev = clamp((Tm - 1.5) / 6), tx0 = s ? 93 : 7;
      rbox(g, tx0 - 0.8, 16, 1.6, 20, 0.8, 'rgba(238,242,248,0.5)', 0.15, null, A);
      rbox(g, tx0 - 0.5, 36 - 19.4 * lev, 1.0, 19.4 * lev, 0.5, null, 0, heatCol(lev), A); dot(g, tx0, 37, 1.2, heatCol(lev), A);
    }
    tx(g, '越来越冷', 29, 44, 2.0, ICE, 'center', 900, SANS, A_(lt, L[3], 0.6)); tx(g, '越来越热', 71, 44, 2.0, HOT, 'center', 900, SANS, A_(lt, L[3], 0.6));
    chip(g, 50, 46.8, '不费力气 → 违反热力学定律？', RED, A_(lt, L[4], 0.5) * (1 - A_(lt, L[5], 0.4)), 'rgba(50,20,20,0.95)');
    chip(g, 50, 46.8, '“麦克斯韦妖” · 争论了一百多年', MX_NAME, A_(lt, L[5], 0.5));
    tx(g, '只放快的过去，慢的留下', 50, 5.2, 1.8, GOLD, 'center', 800, SANS, A_(lt, L[2], 0.5) * (1 - A_(lt, L[4], 0.4)));
  };

  // ---------- m21: Glenlair, the Treatise, the Cavendish ----------
  DRAW.m21 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8), s1 = A * (1 - A_(lt, L[2] - 0.3, 0.6));
    if (s1 > 0.01) {
      chip(g, 50, 8.5, '1865 · 回到格伦莱尔', GOLD, s1, 'rgba(48,38,12,0.95)');
      rbox(g, 10, 24, 18, 12, 0.2, null, 0, 'rgba(110,100,120,0.95)', s1);
      g.save(); g.globalAlpha *= s1; g.fillStyle = 'rgba(80,70,90,0.95)'; g.beginPath(); g.moveTo(8.5, 24.2); g.lineTo(19, 17.5); g.lineTo(29.5, 24.2); g.closePath(); g.fill(); g.restore();
      for (i = 0; i < 3; i++) rbox(g, 12 + i * 5.5, 27, 2.4, 2.6, 0.2, null, 0, 'rgba(255,210,140,0.75)', s1);
      rbox(g, 40, 34, 26, 1.4, 0.2, null, 0, '#6b4a2e', s1); ln(g, 43, 35.4, 43, 43, '#6b4a2e', 0.6, null, s1); ln(g, 63, 35.4, 63, 43, '#6b4a2e', 0.6, null, s1);
      mxOld(g, 36, 43, 14, s1, { pose: 'forward', flip: false }, lt);
      var bk = A_(lt, L[1], 0.3), dropY = mix(14, 30, eo(pr(lt, L[1], 0.35)));
      if (bk > 0.01) { rbox(g, 49, dropY - 2, 14, 4.4, 0.4, null, 0, '#4a2f28', bk); rbox(g, 49.6, dropY - 1.3, 12.8, 3, 0.3, null, 0, '#efe6d2', bk); rbox(g, 49, dropY - 2, 14, 1.2, 0.3, null, 0, '#5a3a24', bk); tx(g, '《电磁通论》 1873', 56, 27, 1.9, GOLD, 'center', 800, SANS, A_(lt, L[1] + 0.4, 0.5) * s1); }
      if (bk > 0.01) glow(g, 56, 31, 6, 'rgba(242,198,107,0.9)', 0.5 * pulse(lt, L[1] + 0.35, 0.3));
    }
    var s2 = A_(lt, L[2] - 0.2, 0.7);
    if (s2 > 0.01) {
      chip(g, 50, 8.5, '1871 · 剑桥', GOLD, s2 * (1 - A_(lt, L[3], 0.4)), 'rgba(48,38,12,0.95)');
      var rows = Math.floor(clamp((lt - L[2]) / 2.8) * 10);
      for (var r = 0; r < 10; r++) for (i = 0; i < 12; i++) { if (r >= rows) continue; rbox(g, 26 + i * 4 + (r % 2) * 1, 40 - r * 2, 3.7, 1.8, 0.15, null, 0, 'rgba(150,110,90,0.9)', s2); }
      ln(g, 82, 42, 82, 10, '#d0a040', 0.5, null, s2 * (1 - A_(lt, L[3], 0.5))); ln(g, 66, 10, 86, 10, '#d0a040', 0.4, null, s2 * (1 - A_(lt, L[3], 0.5)));
      var fin = A_(lt, L[3], 0.6);
      if (fin > 0.01) {
        g.save(); g.globalAlpha *= fin; g.fillStyle = 'rgba(120,90,80,0.95)'; g.beginPath(); g.moveTo(24, 20); g.lineTo(50, 14); g.lineTo(78, 20); g.closePath(); g.fill(); g.restore();
        for (i = 0; i < 6; i++) rbox(g, 30 + i * 7.5, 26, 3, 5, 0.3, null, 0, 'rgba(255,210,140,0.75)', fin);
        chip(g, 50, 9, '卡文迪许实验室 · 1874', GOLD, fin, 'rgba(48,38,12,0.95)');
      }
      var md = A_(lt, L[4], 0.5);
      for (i = 0; i < 30; i++) { var a = md * A_(lt, L[4] + i * 0.04, 0.3), x = 10 + (i % 15) * 5.6, y = 44.5 + Math.floor(i / 15) * 3; dot(g, x, y, 1.1, GOLD, a); dot(g, x - 0.3, y - 0.3, 0.4, '#fff3c4', a); }
      tx(g, '诺贝尔奖得主 · 几十位', 92, 41, 1.8, GOLD, 'right', 800, SANS, md);
    }
  };

  // ---------- m22: 1879 ----------
  DRAW.m22 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8);
    chip(g, 30, 8.5, '1879', DIM, A_(lt, L[0], 0.6));
    var out = A_(lt, L[2] + 0.4, 0.8);
    flame(g, 30, 30, 2.4, 6 * (1 - out), lt, A * (1 - out), 3); rbox(g, 29, 30, 2, 8 * (1 - 0.4 * A_(lt, L[0], 6)), 0.3, null, 0, '#efe6d2', A);
    glow(g, 30, 26, 10, 'rgba(255,190,100,0.9)', 0.4 * A * (1 - out));
    for (i = 0; i < 6; i++) { var p = (lt * 0.4 + i / 6) % 1; dot(g, 30 + Math.sin(i * 2 + lt) * p * 2, 28 - p * 10, 0.5, 'rgba(200,200,210,0.5)', out * (1 - p)); }
    var two = A_(lt, L[1], 0.6);
    katherine(g, 12, 44, 12, two * 0.8, { name: '母亲', col: '#d8d0e8' }, lt); mxOld(g, 48, 44, 13, two * (1 - 0.6 * out), { name: '麦克斯韦' }, lt);
    tx(g, '1839 · 48 岁', 12, 46.8, 1.7, DIM, 'center', 700, SANS, two); tx(g, '1879 · 48 岁', 48, 46.8, 1.7, DIM, 'center', 700, SANS, two * A_(lt, L[2], 0.5));
    var st = A_(lt, L[2] + 0.8, 1.0);
    if (st > 0.01) { var sy = mix(30, 14, eo(pr(lt, L[2] + 0.8, 2))); glow(g, 48, sy, 4, 'rgba(201,184,255,0.9)', 0.6 * st); dot(g, 48, sy, 0.7, '#efeaff', st); }
    var nb = A_(lt, L[3], 0.8);
    if (nb > 0.01) {
      glow(g, 76, 28, 8 + Math.sin(lt * 3), 'rgba(255,230,160,0.9)', 0.5 * nb); dot(g, 76, 28, 1.1, '#fff4d6', nb);
      chip(g, 76, 38, '同一年 · 爱因斯坦出生', GOLD, nb, 'rgba(48,38,12,0.95)');
    }
  };

  // ---------- m23: Hertz catches the wave ----------
  DRAW.m23 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8);
    chip(g, 50, 8, '1887 · 德国 · 赫兹的实验室', GOLD, A_(lt, L[0], 0.6), 'rgba(48,38,12,0.95)');
    hertz(g, 40, 45, 13, A_(lt, L[0] + 0.3, 0.6), { pose: 'forward', flip: false }, lt);
    // transmitter: two rods with balls, a spark jumping between them
    var ta = A_(lt, L[1] - 0.2, 0.6), sp = (Math.sin(lt * 7) > 0.5) ? 1 : 0;
    if (ta > 0.01) {
      rbox(g, 6, 21, 3, 6, 0.2, '#cfd6e2', 0.2, 'rgba(160,170,190,0.3)', ta); rbox(g, 21, 21, 3, 6, 0.2, '#cfd6e2', 0.2, 'rgba(160,170,190,0.3)', ta);
      ln(g, 9, 24, 14.2, 24, '#cfd6e2', 0.35, null, ta); ln(g, 15.8, 24, 21, 24, '#cfd6e2', 0.35, null, ta); dot(g, 14.2, 24, 0.6, '#e3e8f0', ta); dot(g, 15.8, 24, 0.6, '#e3e8f0', ta);
      if (lt > L[1]) { glow(g, 15, 24, 3, 'rgba(255,240,200,0.95)', ta * sp); ln(g, 14.4, 24, 15.6, 24, '#fff6d8', 0.3, null, ta * sp); }
      waveArcs(g, 15, 24, lt, ta * A_(lt, L[1], 0.4) * 0.8, ICE, 5, 62, -0.32, 0.32, 14);
      tx(g, '发射', 15, 31, 1.8, DIM, 'center', 700, SANS, ta);
    }
    // receiver: a ring with a tiny gap, sparking when the wave arrives
    var ra = A_(lt, L[2] - 0.2, 0.6);
    if (ra > 0.01) {
      arcl(g, 80, 24, 4, 0.25, TAU - 0.25, '#cfd6e2', 0.35, ra);
      var hit = lt > L[2] ? (Math.sin(lt * 7 - 2.4) > 0.5 ? 1 : 0) : 0;
      glow(g, 84, 24, 2.4, 'rgba(255,240,200,0.95)', ra * hit); dot(g, 84, 24, 0.35, '#fff6d8', ra * hit);
      ring(g, 88, 15, 4, 'rgba(238,242,248,0.5)', 0.2, ra); ln(g, 84.6, 22.8, 85.5, 18, 'rgba(238,242,248,0.4)', 0.12, null, ra);
      glow(g, 88, 15, 2.5, 'rgba(255,240,200,0.95)', ra * hit); tx(g, '收到！', 88, 21.4, 1.7, GOLD, 'center', 800, SANS, ra * hit);
      tx(g, '房间另一头', 80, 31, 1.8, DIM, 'center', 700, SANS, ra);
    }
    // reflection off a metal sheet, bending through a prism
    var rf = A_(lt, L[3], 0.6) * (1 - A_(lt, L[4], 0.5));
    if (rf > 0.01) {
      rbox(g, 92, 12, 1.4, 22, 0.2, null, 0, '#9aa7ba', rf);
      for (i = 0; i < 3; i++) { var r = ((lt * 10 + i * 7) % 20); arcl(g, 93, 24, r, Math.PI - 0.5, Math.PI + 0.5, GOLD, 0.3, rf * (1 - r / 20)); }
      g.save(); g.globalAlpha *= rf; g.fillStyle = 'rgba(80,70,60,0.8)'; g.beginPath(); g.moveTo(56, 36); g.lineTo(68, 36); g.lineTo(62, 26); g.closePath(); g.fill(); g.restore();
      ln(g, 46, 30, 59, 31, GOLD, 0.35, null, rf); ln(g, 59, 31, 65, 32.5, GOLD, 0.35, null, rf); ln(g, 65, 32.5, 76, 38, GOLD, 0.35, null, rf);
      chip(g, 50, 16, '会反射，会折射：就像光一样', GOLD, rf, 'rgba(48,38,12,0.95)');
    }
    var qa = A_(lt, L[4], 0.5);
    if (qa > 0.01) {
      extra(g, 66, 45, 12, qa, { flip: true, name: '学生', nameCol: DIM }, lt);
      rbox(g, 60, 26, 16, 5.6, 1.2, 'rgba(238,242,248,0.5)', 0.2, 'rgba(20,24,34,0.92)', qa); tx(g, '这有什么用？', 68, 29.5, 1.9, FG, 'center', 800, SANS, qa);
      var an = A_(lt, L[5], 0.5);
      rbox(g, 24, 20, 16, 5.6, 1.2, 'rgba(127,224,160,0.6)', 0.2, 'rgba(14,30,20,0.92)', an); tx(g, '没什么用。', 32, 23.5, 1.9, '#7fe0a0', 'center', 900, SANS, an);
    }
  };

  // ---------- m24: everything since ----------
  DRAW.m24 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8), s1 = A * (1 - A_(lt, L[3] - 0.3, 0.6));
    if (s1 > 0.01) {
      // a ship sending dots and dashes
      var sa = s1 * (1 - A_(lt, L[1], 0.5));
      g.save(); g.globalAlpha *= sa; g.fillStyle = '#2a2f3d'; g.beginPath(); g.moveTo(30, 34); g.lineTo(58, 34); g.lineTo(54, 39); g.lineTo(33, 39); g.closePath(); g.fill(); g.fillRect(40, 30, 10, 4); g.restore();
      ln(g, 44, 30, 44, 16, '#9aa7ba', 0.35, null, sa); waveArcs(g, 44, 16, lt, sa, ICE, 4, 16, -1.2, 1.2, 8);
      tx(g, '· — ·  · · ·  — —', 70, 18, 2.4, GOLD, 'center', 900, MONO, sa * (0.6 + 0.4 * Math.sin(lt * 6)));
      for (i = 0; i < 4; i++) ln(g, 10, 40 + i * 1.2, 90, 40 + i * 1.2, 'rgba(90,140,200,' + (0.3 - i * 0.05) + ')', 0.25, null, sa);
      chip(g, 50, 8.5, '无线电报', GOLD, sa, 'rgba(48,38,12,0.95)');
      // the things built on the same equations
      var nm = ['广播', '电视', '手机', 'Wi-Fi', '卫星导航'], xs = [14, 32, 50, 68, 86];
      for (i = 0; i < 5; i++) {
        var a = s1 * A_(lt, L[1] + i * 0.35, 0.4), x = xs[i], y = 31;
        if (a <= 0.01) continue;
        if (i === 0) { rbox(g, x - 4, y - 3, 8, 6, 0.8, '#cfd6e2', 0.25, 'rgba(60,50,40,0.9)', a); ring(g, x + 1.6, y, 1.6, '#cfd6e2', 0.25, a); }
        else if (i === 1) { rbox(g, x - 4.5, y - 3.2, 9, 6.4, 0.5, '#cfd6e2', 0.25, 'rgba(70,110,180,0.6)', a); }
        else if (i === 2) phone(g, x, y, 0.55, a, lt);
        else if (i === 3) { for (var k = 1; k <= 3; k++) arcl(g, x, y + 2, k * 1.5, -Math.PI * 0.75, -Math.PI * 0.25, '#cfd6e2', 0.35, a); dot(g, x, y + 2, 0.5, '#cfd6e2', a); }
        else { rbox(g, x - 1.2, y - 1.2, 2.4, 2.4, 0.2, null, 0, '#cfd6e2', a); rbox(g, x - 5, y - 0.8, 3.4, 1.6, 0.1, null, 0, '#4f8cff', a); rbox(g, x + 1.6, y - 0.8, 3.4, 1.6, 0.1, null, 0, '#4f8cff', a); }
        tx(g, nm[i], x, y + 6.2, 1.9, FG, 'center', 800, SANS, a);
        var la = A_(lt, L[2], 0.6) * s1; ln(g, x, y - 4, 50, 15, 'rgba(242,198,107,0.5)', 0.18, null, la * a);
      }
      var eqa = A_(lt, L[2], 0.6) * s1;
      for (i = 0; i < 2; i++) tx(g, i ? EQS[2] + '      ' + EQS[3] : EQS[0] + '      ' + EQS[1], 50, 10 + i * 4, 1.9, GOLD, 'center', 800, SANS, eqa);
      glow(g, 50, 12, 16, 'rgba(242,198,107,0.9)', 0.25 * eqa);
    }
    var qa = A_(lt, L[3] - 0.2, 0.7);
    if (qa > 0.01) {
      extra(g, 18, 44, 15, qa, { col: '#e8e0c8', curl: true, name: '爱因斯坦', nameCol: '#f0e0b0' }, lt);
      tx(g, '“一个科学时代随麦克斯韦结束，', 58, 22, 3.0, GOLD, 'center', 900, SANS, A_(lt, L[4], 0.6));
      tx(g, '另一个时代随他开始。”', 58, 28, 3.0, GOLD, 'center', 900, SANS, A_(lt, L[4] + 0.6, 0.6));
      tx(g, '—— 爱因斯坦', 72, 33.5, 1.9, DIM, 'center', 700, SANS, A_(lt, L[4] + 0.6, 0.6));
    }
  };

  // ---------- m25: ten thousand years from now ----------
  DRAW.m25 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8), z = eio(pr(lt, L[0], 3.0)), sc = Math.exp(mix(Math.log(1.2), Math.log(0.0075), z)), cx = 26, y = 32;
    function X(yr) { return cx + (yr - 1865) * sc; }
    ln(g, 4, y, 96, y, 'rgba(238,242,248,0.4)', 0.25, null, A);
    var ev = [[1861, '南北战争', 0], [1865, '麦克斯韦方程', 1], [1879, '爱因斯坦出生', 0], [1887, '赫兹', 0], [1969, '登月', 0], [2026, '今天', 2]];
    for (i = 0; i < ev.length; i++) {
      var x = X(ev[i][0]); if (x < 3 || x > 97) continue;
      var key = ev[i][2] === 1, now = ev[i][2] === 2, a = A * (key ? 1 : (1 - 0.85 * z));
      dot(g, x, y, key ? 1.0 : 0.5, key ? GOLD : now ? ICE : FG, a);
      if (key) glow(g, x, y, 4 + 3 * z, 'rgba(242,198,107,0.9)', 0.6 * A);
      tx(g, ev[i][1], x, y + (i % 2 ? 3.6 : -2.6), key ? 2.0 : 1.6, key ? GOLD : now ? ICE : DIM, 'center', 800, SANS, a);
    }
    var far = X(11865); if (far < 97) { dot(g, far, y, 0.8, ICE, A * z); tx(g, '一万年后', far, y + 3.6, 1.8, ICE, 'center', 800, SANS, A * z); }
    var qa = A_(lt, L[1], 0.6);
    tx(g, '“19 世纪最重要的事件，', 54, 13, 3.0, GOLD, 'center', 900, SANS, qa);
    tx(g, '会是麦克斯韦发现了电动力学的定律。”', 54, 19, 3.0, GOLD, 'center', 900, SANS, A_(lt, L[2], 0.6));
    tx(g, '—— 费曼', 80, 24, 1.9, DIM, 'center', 700, SANS, A_(lt, L[2], 0.6));
    mxOld(g, 90, 46, 11, A_(lt, L[2] + 0.5, 0.8), {}, lt);
  };
