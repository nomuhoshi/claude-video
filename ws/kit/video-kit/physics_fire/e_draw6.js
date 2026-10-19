
  // ================= scene 6: sunlight knocks the oxygen off the carbon =================
  var SUN6 = null;
  function buildSun() {
    var sc = sc_('s6'), L = sc.ls;
    // [which molecule, atom side, knock time, final O2 spot x offset]
    var hits = [{ m: 0, side: -1, t: L[4] + 0.95 }, { m: 0, side: 1, t: L[4] + 1.3 }, { m: 1, side: -1, t: L[4] + 1.1 }, { m: 1, side: 1, t: L[4] + 1.45 }];
    var cx = [38, 62];
    hits.forEach(function (h, n) {
      h.sx = cx[h.m] + h.side * 4.6; h.sy = 27; h.ex = cx[h.m] + h.side * 2.1; h.ey = 15.5; h.fl = 1.1;
      DCUES.push([sc.s + h.t, 'photon', null]);
    });
    SUN6 = { hits: hits, cx: cx, L: L };
    DCUES.push([sc.s + L[4] + 2.5, 'spark', 1760], [sc.s + L[4] + 2.7, 'spark', 2349]);
  }
  function sunDisc(g, x, y, r, a, lt) {
    halo(g, x, y, r * 3.2, 'rgba(255,214,120,0.55)', a);
    halo(g, x, y, r * 1.8, 'rgba(255,238,170,0.8)', a);
    for (var i = 0; i < 18; i++) {
      var ang = i / 18 * TAU + lt * 0.08, l0 = r * 1.2, l1 = r * (1.8 + 0.4 * Math.sin(lt * 1.3 + i * 2.1));
      ln(g, x + Math.cos(ang) * l0, y + Math.sin(ang) * l0, x + Math.cos(ang) * l1, y + Math.sin(ang) * l1, 'rgba(255,225,140,0.7)', 0.22, null, a * 0.8);
    }
    dot(g, x, y, r, '#ffe9a8', a);
    halo(g, x - r * 0.2, y - r * 0.2, r, 'rgba(255,255,255,0.9)', a * 0.7);
  }
  DRAW.d6 = function (g, lt, L) {
    if (!SUN6) buildSun();
    var i, pa = eo(pr(lt, L[0] - 0.2, 1.0));
    // the leaf
    g.save(); g.globalAlpha *= pa;
    var gr = g.createLinearGradient(0, 11, 0, 37); gr.addColorStop(0, 'rgba(70,200,140,0.20)'); gr.addColorStop(1, 'rgba(70,200,140,0.07)');
    g.fillStyle = gr; g.beginPath(); if (g.roundRect) g.roundRect(24, 11, 52, 26, 3); else g.rect(24, 11, 52, 26); g.fill();
    g.strokeStyle = 'rgba(120,230,180,0.35)'; g.lineWidth = 0.16; g.stroke();
    g.restore();
    tx(g, '这是简化的说法 · 真实的光合作用步骤更多', 50, 44, 1.45, 'rgba(147,161,182,0.85)', 'center', 500, SANS, pa);
    tx(g, '叶子里面', 25.2, 13.6, 1.5, 'rgba(160,235,195,0.8)', 'left', 500, SANS, pa);
    // carbon dioxide molecules
    var atomsC = [{ x: 38 }, { x: 62 }];
    var move = eio(pr(lt, L[6] + 0.2, 1.8));
    atomsC.forEach(function (m, n) {
      var a = eo(pr(lt, L[0] + 0.2 + n * 0.35, 0.8)), cxm = m.x, cym = 27;
      var cX = mix(cxm, 50 + (n ? 4 : -4), move), cY = mix(cym, 33, move);
      var grip = a * (1 - eo(pr(lt, L[4] + 1.0, 0.5)));
      // the O atoms (unless the light has taken them)
      var hs = SUN6.hits.filter(function (h) { return h.m === n; });
      hs.forEach(function (h) {
        var tk = h.t, p = eo(pr(lt, tk, h.fl)), ox = mix(h.sx, h.ex, p), oy = mix(h.sy, h.ey, p) - Math.sin(p * Math.PI) * 3.2;
        if (p < 0.02) bond(g, cX, cY, ox, oy, 0.5, 'rgba(242,198,107,' + (0.35 + 0.4 * Math.sin(lt * 3)) + ')', a);
        var lift = eo(pr(lt, L[5], 3.0)), al2 = 1 - eo(pr(lt, L[5] + 2.2, 1.2));
        ox += (n ? 1 : -1) * 6 * lift; oy -= 8 * lift;
        h.cur = [ox, oy, p, al2];
        atom(g, ox, oy, 2.0, 'O', a * al2);
        if (p > 0.02 && p < 0.9) halo(g, ox, oy, 3.5, 'rgba(255,230,160,0.6)', (1 - p));
      });
      atom(g, cX, cY, 2.2, 'C', a);
      if (n === 0) { /* label added once */ }
    });
    // O2 formation: bond between the two O atoms once both have landed up above
    [0, 1].forEach(function (n) {
      var hs = SUN6.hits.filter(function (h) { return h.m === n; });
      if (hs[0].cur && hs[1].cur && hs[0].cur[2] > 0.95 && hs[1].cur[2] > 0.95) {
        var oo = hs[0].cur, o2 = hs[1].cur;
        bond(g, oo[0], oo[1], o2[0], o2[1], 0.4, 'rgba(238,242,248,0.85)', oo[3]);
      }
    });
    tx(g, '二氧化碳 CO₂', 50, 40.2, 1.8, ICE, 'center', 700, SANS, eo(pr(lt, L[0] + 0.5, 0.8)) * (1 - eo(pr(lt, L[6], 0.6))));
    // narration: is it some mysterious life force?
    var qa = eo(pr(lt, L[1] + 0.2, 0.8)) * (1 - eo(pr(lt, L[3], 0.5)));
    if (qa > 0.01) {
      for (i = 0; i < 2; i++) tx(g, '？', 38 + i * 24, 17 + Math.sin(lt * 2 + i) * 0.8, 5, 'rgba(143,208,255,0.85)', 'center', 900, SANS, qa);
    }
    var la = eo(pr(lt, L[2] + 0.2, 0.8)) * (1 - eo(pr(lt, L[3], 0.5)));
    if (la > 0.01) {
      for (i = 0; i < 26; i++) {
        var ang = i / 26 * TAU + lt * 0.6, rad = 8 + 1.2 * Math.sin(lt * 2 + i * 1.7);
        dot(g, 50 + Math.cos(ang) * rad * 1.5, 6.5 + Math.sin(ang) * rad * 0.28, 0.22, 'rgba(190,160,255,0.9)', la * 0.8);
      }
      tx(g, '神秘的生命力？', 50, 6.4, 2.2, 'rgba(205,185,255,0.95)', 'center', 700, SANS, la);
    }
    // the sun
    var sa = eo(pr(lt, L[3] + 0.1, 1.2));
    if (sa > 0.01) {
      sunDisc(g, 12, 14, 3.4, sa, lt);
      tx(g, '阳光', 12, 24.4, 2.4, GOLD, 'center', 900, SANS, sa);
      // sun rays toward the leaf
      for (i = 0; i < 4; i++) {
        var f = (lt * 0.5 + i / 4) % 1;
        ln(g, 17 + f * 6, 16 + f * 2, 19 + f * 6, 16.6 + f * 2, 'rgba(255,225,140,0.8)', 0.2, null, sa * Math.sin(f * Math.PI) * 0.6 * (1 - eo(pr(lt, L[4] + 3, 1))));
      }
    }
    // photons
    SUN6.hits.forEach(function (h) {
      var t0 = h.t - 0.8, p = pr(lt, t0, 0.8);
      if (p > 0 && p < 1) {
        var px = mix(14.5, h.sx, p), py = mix(15, h.sy, p);
        for (var tr = 4; tr >= 0; tr--) { var pp2 = Math.max(0, p - tr * 0.03); dot(g, mix(14.5, h.sx, pp2), mix(15, h.sy, pp2), 0.5 * (1 - tr * 0.17), 'rgb(255,226,140)', 0.9 - tr * 0.17); }
        halo(g, px, py, 2.2, 'rgba(255,230,160,0.8)', 1);
      }
      var q = lt - h.t;
      if (q >= 0 && q < 0.7) { ring(g, h.sx, h.sy, 1 + q * 6, 'rgba(255,240,190,0.95)', 0.22, 1 - q / 0.7); halo(g, h.sx, h.sy, 6, 'rgba(255,240,190,0.9)', 1 - q / 0.7); }
    });
    // oxygen is given back to the air (the atoms above rise and fade)
    var oa = eo(pr(lt, L[5] + 0.3, 0.8)) * (1 - eo(pr(lt, L[6] + 0.6, 0.8)));
    tx(g, '氧气 O₂：副产品', 78, 8.5, 2.2, ICE, 'left', 700, SANS, oa);
    ln(g, 70, 8.5, 75, 8.5, ICE, 0.25, null, oa); arrowHead(g, 76, 8.5, 0, 0.9, ICE, oa);
    // water and the growing tree
    var wa = eo(pr(lt, L[6] + 0.6, 0.8));
    if (wa > 0.01) {
      for (i = 0; i < 2; i++) {
        var wx = 50 + (i ? 4 : -4) + (i ? 5.2 : -5.2) * eio(pr(lt, L[6] + 1.0, 1.3)), wy = mix(46, 33, eo(pr(lt, L[6] + 0.7, 1.2)));
        halo(g, wx, wy, 2.0, 'rgba(120,200,255,0.9)', wa); dot(g, wx, wy, 0.9, '#bfe4ff', wa);
      }
      tx(g, '碳 + 水', 50, 40.4, 2.0, FG, 'center', 700, SANS, wa);
    }
    var ta = eo(pr(lt, L[7] + 0.2, 0.9));
    if (ta > 0.01) {
      var prog = eo(pr(lt, L[7] + 0.4, 3.4)), bx = 86, nb = 6;
      for (i = 0; i < nb; i++) {
        var a2 = clamp(prog * (nb + 1) - i);
        if (a2 <= 0) continue;
        g.save(); g.globalAlpha *= a2 * ta; g.fillStyle = i % 2 ? '#9b7248' : '#8a6540';
        g.beginPath(); if (g.roundRect) g.roundRect(bx - 2.4, 38.6 - (i + 1) * 2.7, 4.8, 2.5, 0.6); else g.rect(bx - 2.4, 38.6 - (i + 1) * 2.7, 4.8, 2.5); g.fill();
        g.restore();
        atom(g, bx, 38.6 - (i + 1) * 2.7 + 1.25, 0.55, 'C', a2 * ta, true);
      }
      var cn = clamp(prog * (nb + 1) - nb);
      if (cn > 0) { halo(g, bx, 38.6 - nb * 2.7 - 2, 8, 'rgba(70,200,140,0.65)', cn * ta); halo(g, bx - 4, 38.6 - nb * 2.7 + 0.5, 5, 'rgba(70,200,140,0.5)', cn * ta); halo(g, bx + 4, 38.6 - nb * 2.7 + 0.5, 5, 'rgba(70,200,140,0.5)', cn * ta); }
      tx(g, '树的身体', bx, 41.6, 1.8, DIM, 'center', 500, SANS, ta);
    }
  };

  // ================= scene 7: burning gives the sunlight back =================
  var BURN = null;
  function buildBurn() {
    var sc = sc_('s7'), L = sc.ls;
    BURN = { L: L };
    DBEDS.push({ k: 'shimmer2', t0: sc.s + L[4], t1: sc.s + L[7] + 2, fo: 1.0, fi: 0.6, fn: function (t) { return 0.0; } });
  }
  DRAW.d7 = function (g, lt, L) {
    var i, ia = eo(pr(lt, 0.1, 0.8));
    var burn = eo(pr(lt, L[1] + 0.3, 2.4)), release = eo(pr(lt, L[4], 1.6));
    var fk = burn * (0.85 + 0.3 * release);
    logs(g, 50, 40, fk, ia);
    // carbon in the log
    var r = rng(88);
    for (i = 0; i < 9; i++) atom(g, 41 + r() * 18, 39.2 + (r() - 0.5) * 1.6, 0.7, 'C', ia * (1 - 0.7 * burn), true);
    // oxygen pairs flying in
    var oa = eo(pr(lt, L[1], 0.8)) * (1 - 0.5 * eo(pr(lt, L[3], 1)));
    if (oa > 0.01) {
      for (i = 0; i < 8; i++) {
        var side = i % 2 ? 1 : -1, f = (lt * 0.28 + i / 8) % 1, x = 50 + side * mix(36, 7, eo(f)), y = 34 + Math.sin(i * 3.1) * 3.5 + f * 4;
        var ang = Math.sin(lt + i) * 0.6;
        bond(g, x - Math.cos(ang) * 0.85, y - Math.sin(ang) * 0.85, x + Math.cos(ang) * 0.85, y + Math.sin(ang) * 0.85, 0.16, 'rgba(238,242,248,0.6)', oa * Math.sin(f * Math.PI));
        atom(g, x - Math.cos(ang) * 0.85, y - Math.sin(ang) * 0.85, 0.65, 'O', oa * Math.sin(f * Math.PI), true);
        atom(g, x + Math.cos(ang) * 0.85, y + Math.sin(ang) * 0.85, 0.65, 'O', oa * Math.sin(f * Math.PI), true);
      }
    }
    // the stored sunlight inside the log, then let out
    var sa = eo(pr(lt, L[3] + 0.1, 1.4));
    if (sa > 0.01) {
      halo(g, 50, 38.6, 10, 'rgba(255,225,140,0.85)', sa * (1 - 0.6 * release) * (0.8 + 0.2 * Math.sin(lt * 4)));
      sunDisc(g, 13, 13, 3.0, sa * (1 - eo(pr(lt, L[5] - 0.5, 0.8))), lt);
      tx(g, '当年的阳光', 13, 22.2, 2.0, GOLD, 'center', 900, SANS, sa * (1 - eo(pr(lt, L[5] - 0.2, 0.6))));
      for (i = 0; i < 5; i++) {
        var f2 = (lt * 0.35 + i / 5) % 1;
        dot(g, mix(16, 47, f2), mix(15, 37, eo(f2)), 0.45, 'rgb(255,226,140)', sa * Math.sin(f2 * Math.PI) * (1 - release));
      }
    }
    flame(g, 50, 39.4, 20, 23, lt, fk, 5);
    embers(g, 50, 36, 18, 24, lt, fk, 12, 30);
    // carbon dioxide leaves with the smoke
    var ca = eo(pr(lt, L[2] + 0.2, 0.9));
    if (ca > 0.01) {
      var rr = rng(61);
      for (i = 0; i < 9; i++) {
        var ph = rr(), age = (lt * 0.11 + ph) % 1, x2 = 50 + (rr() - 0.5) * 14 + Math.sin(lt * 0.8 + ph * 9) * 3 * age, y2 = 28 - age * 18;
        co2(g, x2, y2, 0.95, ph * 6 + lt * 0.3, ca * Math.sin(age * Math.PI) * 0.85 * (0.4 + 0.6 * burn));
      }
      tx(g, '二氧化碳', 72, 24, 1.9, ICE, 'center', 700, SANS, ca * (1 - eo(pr(lt, L[5], 0.6))));
    }
    // the light and heat that comes out: gold photons radiating from the flame
    if (release > 0.01) {
      var rp = rng(19);
      for (i = 0; i < 46; i++) {
        var ph2 = rp(), sp = 0.28 + rp() * 0.3, ang2 = -Math.PI * (0.05 + 0.9 * rp()), age2 = (lt * sp + ph2) % 1, d = 6 + age2 * 36;
        dot(g, 50 + Math.cos(ang2) * d * 1.45, 36 + Math.sin(ang2) * d * 0.82, 0.22 + 0.22 * rp(), 'rgb(255,' + Math.round(205 + 40 * (1 - age2)) + ',120)', (1 - age2) * 0.9 * release);
      }
      tx(g, '光', 79, 26, 2.8, GOLD, 'center', 900, SANS, eo(pr(lt, L[4] + 0.5, 0.7)) * (1 - eo(pr(lt, L[5], 0.6))));
      tx(g, '热', 21, 26, 2.8, HOT, 'center', 900, SANS, eo(pr(lt, L[4] + 0.8, 0.7)) * (1 - eo(pr(lt, L[5], 0.6))));
    }
    // sun -> tree -> firelight
    var c1 = eo(pr(lt, L[5] + 0.1, 0.8)), c2 = eo(pr(lt, L[5] + 1.0, 0.8)), c3 = eo(pr(lt, L[6] + 0.2, 0.8)), c4 = eo(pr(lt, L[7], 1.2));
    if (c1 > 0.01) {
      pill(g, 12, 2.6, 76, 14.2, 'rgba(6,8,13,0.5)', c1);
      sunDisc(g, 24, 8.6, 1.5, c1, lt); tx(g, '阳光', 24, 14.2, 1.8, GOLD, 'center', 700, SANS, c1);
      if (c2 > 0) { ln(g, 31, 8.6, 42, 8.6, GOLD, 0.3, null, c2); arrowHead(g, 42, 8.6, 0, 1.0, GOLD, c2); treeShape(g, 50, 13.2, 0.27, c2, 0); tx(g, '存进树里', 50, 14.9, 1.7, LEAF, 'center', 700, SANS, c2); }
      if (c3 > 0) { ln(g, 58, 8.6, 69, 8.6, GOLD, 0.3, null, c3); arrowHead(g, 69, 8.6, 0, 1.0, GOLD, c3); flame(g, 78, 12.8, 5.5, 8, lt, c3, 2); tx(g, '火光', 78, 14.9, 1.7, HOT, 'center', 700, SANS, c3); }
      if (c4 > 0) {
        for (i = 0; i < 6; i++) { var f3 = (lt * 0.4 + i / 6) % 1; dot(g, mix(28, 76, f3), 8.6, 0.5, 'rgb(255,232,160)', c4 * Math.sin(f3 * Math.PI)); halo(g, mix(28, 76, f3), 8.6, 2.2, 'rgba(255,225,140,0.7)', c4 * Math.sin(f3 * Math.PI) * 0.6); }
      }
    }
    if (c4 > 0.01) halo(g, 50, 28, 40, 'rgba(255,225,150,0.18)', c4 * (0.7 + 0.3 * Math.sin(lt * 2)));
  };

  // ================= scene 8: the sun, left to the imagination =================
  DRAW.d8 = function (g, lt, L) {
    var ia = eo(pr(lt, 0.0, 1.6)), zoom = 1 + 0.12 * pr(lt, 0, 9), i;
    halo(g, 50, 21, 46 * zoom, 'rgba(255,190,90,0.28)', ia);
    halo(g, 50, 21, 24 * zoom, 'rgba(255,214,120,0.5)', ia);
    var rr = rng(40);
    for (i = 0; i < 40; i++) {
      var ang = i / 40 * TAU + lt * 0.05, l0 = 11 * zoom, l1 = (14 + rr() * 10 + 2 * Math.sin(lt * 1.2 + i)) * zoom;
      ln(g, 50 + Math.cos(ang) * l0 * 1.4, 21 + Math.sin(ang) * l0, 50 + Math.cos(ang) * l1 * 1.4, 21 + Math.sin(ang) * l1, 'rgba(255,225,150,0.5)', 0.2, null, ia * 0.7);
    }
    halo(g, 50, 21, 11 * zoom, 'rgba(255,245,200,1)', ia);
    dot(g, 50, 21, 8.2 * zoom, '#ffeab0', ia);
    for (i = 0; i < 22; i++) {
      var a2 = rr() * TAU + lt * 0.05, d = rr() * 7 * zoom;
      halo(g, 50 + Math.cos(a2) * d, 21 + Math.sin(a2) * d, 2.2 * zoom, 'rgba(255,170,60,0.28)', ia * (0.6 + 0.4 * Math.sin(lt * 1.5 + i)));
    }
  };
  [buildHill, buildHeat, buildChain, buildSun, buildBurn].forEach(function (f) { f(); });
