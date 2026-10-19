  // ---------- silicon lattice shared by d6 / d7 ----------
  var SX = [12, 22, 32, 42, 52], SY = [14, 25, 36];
  function lattice(g, a, hole, sub, subCol, subTxt, hi) {
    var i, j, bonds = [];
    for (j = 0; j < 3; j++) for (i = 0; i < 5; i++) {
      if (i < 4) bonds.push([SX[i], SY[j], SX[i + 1], SY[j], (SX[i] + SX[i + 1]) / 2, SY[j], 0]);
      if (j < 2) bonds.push([SX[i], SY[j], SX[i], SY[j + 1], SX[i], (SY[j] + SY[j + 1]) / 2, 1]);
    }
    for (i = 0; i < bonds.length; i++) {
      var b = bonds[i], isHi = hi && (Math.abs(b[0] - 32) < 0.1 && Math.abs(b[1] - 25) < 0.1 || Math.abs(b[2] - 32) < 0.1 && Math.abs(b[3] - 25) < 0.1);
      ln(g, b[0], b[1], b[2], b[3], isHi ? 'rgba(242,198,107,0.8)' : 'rgba(143,170,215,0.28)', isHi ? 0.34 : 0.2, null, a);
      if (hole && Math.abs(hole[0] - b[4]) < 0.3 && Math.abs(hole[1] - b[5]) < 0.3) continue;
      var ox = b[6] ? 0.55 : 0, oy = b[6] ? 0 : 0.55;
      eSmall(g, b[4] - ox, b[5] - oy, 0.4, a); eSmall(g, b[4] + ox, b[5] + oy, 0.4, a);
    }
    for (j = 0; j < 3; j++) for (i = 0; i < 5; i++) {
      var isSub = sub && i === 2 && j === 1;
      siAtom(g, SX[i], SY[j], 1.95, a, isSub ? subCol : null);
      tx(g, isSub ? subTxt : 'Si', SX[i], SY[j] + 0.1, isSub ? 1.7 : 1.35, '#0b1220', 'center', 900, SANS, a);
    }
  }
  function legend(g, y, col, name, desc, a) {
    dot(g, 69, y, 1.2, col, a); tx(g, name, 72.5, y, 2.0, FG, 'left', 800, SANS, a); tx(g, desc, 72.5, y + 3, 1.7, DIM, 'left', 600, SANS, a);
  }

  // ---------- d6: N type ----------
  DRAW.d6 = function (g, lt, L) {
    var a0 = A_(lt, 0.1, 0.8), sub = lt >= L[3] - 0.1, pa = A_(lt, L[3] - 0.1, 0.7);
    lattice(g, a0, null, sub, PCOL, 'P', lt >= L[1] && lt < L[3] - 0.1);
    chip(g, 32, 8.4, '纯硅：每个原子 4 个邻居', ICE, A_(lt, L[1] - 0.1, 0.6) * (lt < L[3] - 0.1 ? 1 : 0));
    tx(g, '电子都被占住，没有能跑的', 32, 42.8, 1.9, DIM, 'center', 700, SANS, A_(lt, L[2] - 0.1, 0.6) * (lt < L[3] - 0.1 ? 1 : 0));
    legend(g, 14, '#8fa6c8', '硅', '4 个外层电子', a0 * A_(lt, L[1] - 0.1, 0.6));
    legend(g, 24, PCOL, '磷', '5 个外层电子', pa);
    // the extra electron
    var x0 = 32, y0 = 25;
    if (sub) {
      var w = lt - L[4] + 0.4, exx, eyy;
      if (lt < L[4] - 0.4) { exx = x0 + 3.2 * Math.cos(lt * 4); eyy = y0 + 3.2 * Math.sin(lt * 4); }
      else {
        var s = clamp((lt - (L[4] - 0.4)) / 1.0);
        var wx = x0 + 17 * Math.sin(0.8 * (lt - L[4] + 0.4) + 0.3), wy = y0 + 9.5 * Math.sin(1.3 * (lt - L[4] + 0.4) + 1.0);
        exx = mix(x0 + 3.2 * Math.cos(lt * 4), wx, s); eyy = mix(y0 + 3.2 * Math.sin(lt * 4), wy, s);
        for (var k = 1; k <= 12; k++) {
          var tt = lt - k * 0.05, wx2 = x0 + 17 * Math.sin(0.8 * (tt - L[4] + 0.4) + 0.3), wy2 = y0 + 9.5 * Math.sin(1.3 * (tt - L[4] + 0.4) + 1.0);
          dot(g, wx2, wy2, 0.45, ELE, pa * (1 - k / 13) * 0.5 * s);
        }
      }
      halo(g, exx, eyy, 3.2, 'rgba(143,208,255,0.9)', 0.4 * pa); eSmall(g, exx, eyy, 0.85, pa);
      chip(g, 32, 8.4, '多出 1 个电子', PCOL, pa * (lt < L[4] ? 1 : 0) * A_(lt, L[3] + 0.4, 0.5), 'rgba(50,34,10,0.95)');
      chip(g, 32, 8.4, '多出来的可以到处跑', ICE, A_(lt, L[4] - 0.1, 0.6) * (lt < L[5] - 0.1 ? 1 : 0));
    }
    var na = A_(lt, L[5] - 0.1, 0.8);
    if (na > 0.01) {
      halo(g, 81, 38, 11, 'rgba(143,208,255,0.9)', 0.2 * na);
      tx(g, 'N', 81, 37.5, 12, ICE, 'center', 900, SANS, na);
      tx(g, '靠电子导电', 81, 45.6, 1.9, ICE, 'center', 800, SANS, na);
      chip(g, 32, 8.4, 'N 型半导体', ICE, na);
    }
  };

  // ---------- d7: P type ----------
  DRAW.d7 = function (g, lt, L) {
    var a0 = A_(lt, 0.1, 0.8), HP = [[37, 25], [47, 25], [52, 19.5], [47, 14]], hop = 0;
    if (lt >= L[2] - 0.1) hop = Math.min(3, Math.floor((lt - (L[2] - 0.1)) / 0.75));
    var holeP = lt >= L[1] - 0.1 ? HP[hop] : null;
    var ha = lt >= L[1] - 0.1 ? A_(lt, L[1] - 0.1, 0.6) : 0;
    lattice(g, a0, holeP, true, BCOL, 'B', false);
    var lg = 1 - A_(lt, L[5] - 0.3, 0.5);
    legend(g, 14, '#8fa6c8', '硅', '4 个外层电子', a0 * lg);
    legend(g, 24, BCOL, '硼', '只有 3 个', A_(lt, 0.2, 0.7) * lg);
    chip(g, 32, 8.4, '少一个电子', BCOL, A_(lt, L[0] - 0.1, 0.6) * (lt < L[1] ? 1 : 0), 'rgba(50,16,30,0.95)');
    if (holeP) {
      holeM(g, holeP[0], holeP[1], 0.95, ha);
      chip(g, 32, 8.4, '多出一个空位', HOLEC, ha * (lt < L[2] - 0.1 ? 1 : 0));
      if (lt >= L[2] - 0.1) chip(g, 32, 8.4, '邻居来填，空位在走', HOLEC, A_(lt, L[2] - 0.1, 0.5) * (lt < L[3] ? 1 : 0));
      if (lt >= L[3]) { tx(g, '+', holeP[0], holeP[1] - 4.3, 3.6, HOLEC, 'center', 900, SANS, A_(lt, L[3], 0.5)); chip(g, 32, 8.4, '像正电荷在跑', HOLEC, A_(lt, L[3], 0.5) * (lt < L[4] - 0.1 ? 1 : 0)); }
    }
    var na = A_(lt, L[4] - 0.1, 0.8);
    if (na > 0.01 && lt < L[5] - 0.2) {
      halo(g, 81, 36, 12, 'rgba(255,138,138,0.9)', 0.2 * na);
      tx(g, 'P', 81, 35, 14, HOLEC, 'center', 900, SANS, na);
      tx(g, '靠空穴导电', 81, 44.6, 1.9, HOLEC, 'center', 800, SANS, na);
      chip(g, 32, 8.4, 'P 型半导体', HOLEC, na);
    }
    // L5: how little is mixed in
    var ra = A_(lt, L[5] - 0.2, 0.8);
    if (ra > 0.01) {
      tx(g, '掺杂有多少？', 81, 13.4, 2.1, DIM, 'center', 700, SANS, ra);
      var r = rng(8), k;
      for (k = 0; k < 100; k++) { var gx = 69 + (k % 10) * 2.4, gy = 17.5 + Math.floor(k / 10) * 2.4; dot(g, gx, gy, 0.55, k === 37 ? BCOL : '#8fa6c8', ra * (k === 37 ? 1 : 0.55)); }
      halo(g, 69 + 7 * 2.4, 17.5 + 3 * 2.4, 3.4, 'rgba(255,127,176,0.9)', ra * 0.7);
      sci(g, '', '8', 81, 43.2, 2.5, GOLD, ra, 900, '约 1 : 10');
      tx(g, '（每格代表一百万个）', 81, 47.2, 1.5, DIM, 'center', 600, SANS, ra * 0);
    }
  };

  // ---------- d8: the P-N junction ----------
  DRAW.d8 = function (g, lt, L) {
    var rows = [19, 24.6, 30.2, 35.8], j, i, a0 = A_(lt, 0.1, 0.8);
    var slide = (1 - eo(pr(lt, L[0] - 0.3, 1.1))) * 9;
    var px = function (c) { return 10 + c * 7 - slide; }, nx = function (c) { return 54 + c * 7 + slide; };
    rbox(g, 8 - slide, 14, 41, 26.6, 1.0, 'rgba(255,138,138,0.6)', 0.18, 'rgba(255,138,138,0.05)', a0);
    rbox(g, 49 + slide, 14, 43, 26.6, 1.0, 'rgba(143,208,255,0.6)', 0.18, 'rgba(143,208,255,0.05)', a0);
    chip(g, 28 - slide, 9, 'P 型：空穴多', HOLEC, a0); chip(g, 72 + slide, 9, 'N 型：电子多', ICE, a0);
    var t1 = lt - (L[1] + 0.2), mv = eio(clamp(t1 / 1.0)), gone = t1 > 1.05 ? 1 : 0, fl = clamp(1 - (t1 - 1.0) / 0.5);
    for (j = 0; j < 4; j++) {
      for (i = 0; i < 6; i++) {            // P side holes
        var hxx = px(i), isNear = i >= 4;
        if (isNear && gone) continue;
        holeM(g, hxx, rows[j], 0.8, a0);
      }
      for (i = 0; i < 6; i++) {            // N side electrons
        var exx = nx(i), isNear2 = i <= 1;
        if (isNear2) {
          if (gone) continue;
          var tx2 = i === 0 ? px(5) : px(4);
          eSmall(g, mix(exx, tx2, mv), rows[j], 0.55, a0);
        } else eSmall(g, exx + 0.7 * Math.sin(lt * 5 + i + j * 2), rows[j] + 0.7 * Math.cos(lt * 4.3 + i * 1.7 + j), 0.55, a0);
      }
      if (t1 > 1.0 && t1 < 1.7) { g.save(); g.globalCompositeOperation = 'lighter'; halo(g, px(5), rows[j], 3.6, 'rgba(255,240,200,0.95)', fl * 0.8); halo(g, px(4), rows[j], 3.6, 'rgba(255,240,200,0.95)', fl * 0.8); g.restore(); }
    }
    // depletion zone and its fixed charges
    var da = A_(lt, L[3] - 0.1, 0.9);
    if (da > 0.01) {
      rbox(g, px(4) - 3.6, 14.4, (nx(1) - px(4)) + 7.2, 25.8, 0.6, 'rgba(242,198,107,0.7)', 0.18, 'rgba(242,198,107,0.09)', da, [0.7, 0.5]);
      for (j = 0; j < 4; j++) {
        tx(g, '−', px(5), rows[j], 3.0, '#7fb6ff', 'center', 900, SANS, da); tx(g, '−', px(4), rows[j], 3.0, '#7fb6ff', 'center', 900, SANS, da);
        tx(g, '+', nx(0), rows[j], 3.0, '#ff9d6e', 'center', 900, SANS, da); tx(g, '+', nx(1), rows[j], 3.0, '#ff9d6e', 'center', 900, SANS, da);
      }
      chip(g, 50, 44.2, '耗尽层：几乎没有自由电荷', GOLD, A_(lt, L[3] + 0.2, 0.6) * (lt < L[4] - 0.1 ? 1 : 0), 'rgba(40,30,12,0.95)');
    }
    var ea = A_(lt, L[4] - 0.1, 0.8);
    if (ea > 0.01) {
      arrow(g, nx(1) + 3.5, 44.2, px(4) - 3.5, 44.2, GOLD, 0.45, ea, 1.2);
      tx(g, '电场', nx(1) + 6.2, 44.2, 1.9, GOLD, 'left', 800, SANS, ea);
    }
    var ba = A_(lt, L[5] - 0.1, 0.8);
    if (ba > 0.01) {
      var q = frac_((lt - L[5]) * 0.6), bxp = nx(2) - 3.5 * eio(q < 0.6 ? q / 0.6 : 1) + 0;
      eSmall(g, bxp, rows[1] + 3, 0.8, ba * (1 - clamp((q - 0.8) / 0.2)));
      chip(g, nx(1) - 3, rows[1] + 3, '✕', RED, ba * (q > 0.45 ? 1 : 0.35));
    }
  };

  // ---------- d9: the diode ----------
  DRAW.d9 = function (g, lt, L) {
    var a0 = A_(lt, 0.1, 0.8), pc = 'rgba(238,242,248,0.6)';
    var fwd, ts, prevFwd;
    if (lt < L[2] - 0.1) { fwd = 1; ts = lt; prevFwd = 1; }
    else if (lt < L[4] - 0.1) { fwd = 0; ts = lt - (L[2] - 0.1); prevFwd = 1; }
    else { var kk = Math.floor((lt - (L[4] - 0.1)) / 2.4); fwd = kk % 2 === 0 ? 1 : 0; ts = (lt - (L[4] - 0.1)) - kk * 2.4; prevFwd = 1 - fwd; }
    var wOf = function (f) { return f ? 3.2 : 13; };
    var w = mix(wOf(prevFwd), wOf(fwd), eo(clamp(ts / 0.5)));
    var state = lt < L[0] + 0.9 ? 1 : fwd;
    // block
    rbox(g, 30, 22, 20, 10, 0.8, 'rgba(255,138,138,0.7)', 0.2, 'rgba(255,138,138,0.07)', a0);
    rbox(g, 50, 22, 20, 10, 0.8, 'rgba(143,208,255,0.7)', 0.2, 'rgba(143,208,255,0.07)', a0);
    tx(g, 'P', 36, 27, 3.4, HOLEC, 'center', 900, SANS, a0); tx(g, 'N', 64, 27, 3.4, ICE, 'center', 900, SANS, a0);
    rbox(g, 50 - w / 2, 22.2, w, 9.6, 0.4, 'rgba(242,198,107,0.8)', 0.14, 'rgba(242,198,107,0.22)', a0, [0.6, 0.5]);
    // circuit
    var path = [[47, 12], [22, 12], [22, 27], [30, 27], [70, 27], [78, 27], [78, 12], [53, 12]];
    for (var i = 0; i < path.length - 1; i++) if (i !== 3) ln(g, path[i][0], path[i][1], path[i + 1][0], path[i + 1][1], pc, 0.3, null, a0);
    var plusLeft = fwd || lt < L[2] - 0.1;
    var xl = 48.2, xr = 51.8;
    ln(g, xl, 12 - (plusLeft ? 3.4 : 1.8), xl, 12 + (plusLeft ? 3.4 : 1.8), '#eef2f8', 0.5, null, a0); ln(g, xr, 12 - (plusLeft ? 1.8 : 3.4), xr, 12 + (plusLeft ? 1.8 : 3.4), '#eef2f8', 0.5, null, a0);
    tx(g, '+', plusLeft ? 45.2 : 54.8, 8.2, 2.2, GOLD, 'center', 900, SANS, a0);
    // current
    var segs = [], tot = 0, k;
    for (k = 0; k < path.length - 1; k++) { var dl = Math.hypot(path[k + 1][0] - path[k][0], path[k + 1][1] - path[k][1]); segs.push(dl); tot += dl; }
    var flowing = fwd && lt >= L[0] + 0.3;
    var dirs = plusLeft ? 1 : -1;
    if (flowing) for (k = 0; k < 16; k++) {
      var u = frac_(lt * 0.28 + k / 16) * tot, acc = 0, s = 0;
      while (s < segs.length - 1 && acc + segs[s] < u) { acc += segs[s]; s++; }
      var f2 = (u - acc) / segs[s];
      dot(g, mix(path[s][0], path[s + 1][0], f2), mix(path[s][1], path[s + 1][1], f2), 0.55, GOLD, a0 * clamp(ts / 0.4));
    }
    if (!fwd && lt >= L[2]) { tx(g, '✕', 50, 17.5, 3.2, RED, 'center', 900, SANS, A_(lt, L[2] + 0.3, 0.4) * (1)); }
    var st = lt >= L[0] + 0.8;
    if (st) chip(g, 50, 40.4, fwd ? '通' : '断', fwd ? LEAF : RED, A_(lt, L[0] + 0.8, 0.4));
    // diode symbol and uses
    var sa = A_(lt, L[4] - 0.1, 0.7);
    if (sa > 0.01) {
      var sx = 86, sy = 40;
      g.save(); g.globalAlpha *= sa; g.fillStyle = 'rgba(238,242,248,0.9)'; g.beginPath(); g.moveTo(sx - 3, sy - 3); g.lineTo(sx - 3, sy + 3); g.lineTo(sx + 2, sy); g.closePath(); g.fill(); g.restore();
      ln(g, sx + 2.4, sy - 3.2, sx + 2.4, sy + 3.2, 'rgba(238,242,248,0.9)', 0.5, null, sa); ln(g, sx - 8, sy, sx + 8, sy, 'rgba(238,242,248,0.5)', 0.25, null, sa * 0.8);
      tx(g, '二极管', sx, sy + 6.2, 1.9, FG, 'center', 800, SANS, sa);
    }
    var ua = A_(lt, L[5] - 0.1, 0.8);
    if (ua > 0.01) {
      // LED
      halo(g, 14, 38, 6, 'rgba(255,226,140,0.95)', 0.6 * ua * (0.7 + 0.3 * Math.sin(lt * 4)));
      dot(g, 14, 38, 1.6, '#fff0b8', ua); for (k = 0; k < 6; k++) { var an = k / 6 * TAU + 0.4; ln(g, 14 + 2.6 * Math.cos(an), 38 + 2.6 * Math.sin(an), 14 + 4 * Math.cos(an), 38 + 4 * Math.sin(an), 'rgba(255,226,140,0.8)', 0.22, null, ua); }
      tx(g, 'LED 灯', 14, 44.6, 1.9, '#ffe28c', 'center', 800, SANS, ua);
      // solar
      rbox(g, 30, 36, 12, 6, 0.5, 'rgba(143,208,255,0.8)', 0.2, 'rgba(40,80,130,0.5)', ua);
      for (k = 1; k < 4; k++) ln(g, 30 + k * 3, 36, 30 + k * 3, 42, 'rgba(143,208,255,0.5)', 0.12, null, ua);
      ln(g, 30, 39, 42, 39, 'rgba(143,208,255,0.5)', 0.12, null, ua);
      dot(g, 27, 36, 1.1, GOLD, ua); halo(g, 27, 36, 3, GOLDA, ua);
      tx(g, '太阳能电池', 36, 44.6, 1.9, ICE, 'center', 800, SANS, ua);
    }
  };

  // ---------- d10: the transistor (an N-channel MOSFET) ----------
  DRAW.d10 = function (g, lt, L) {
    var a0 = A_(lt, 0.1, 0.9), i, r = rng(12);
    rbox(g, 14, 28, 72, 11, 0.8, 'rgba(255,138,138,0.35)', 0.16, 'rgba(120,140,170,0.20)', a0);
    tx(g, 'P 型硅', 24, 36.4, 1.8, DIM, 'center', 700, SANS, a0);
    rbox(g, 18, 28, 20, 5.2, 0.6, 'rgba(98,214,160,0.7)', 0.18, 'rgba(98,214,160,0.35)', a0);
    rbox(g, 62, 28, 20, 5.2, 0.6, 'rgba(98,214,160,0.7)', 0.18, 'rgba(98,214,160,0.35)', a0);
    tx(g, 'N', 28, 31, 1.8, LEAF, 'center', 800, SANS, a0); tx(g, 'N', 72, 31, 1.8, LEAF, 'center', 800, SANS, a0);
    rbox(g, 38, 26.2, 24, 1.8, 0.3, 'rgba(238,242,248,0.6)', 0.1, 'rgba(238,242,248,0.35)', a0);
    var on = 0;
    if (lt >= L[3] && lt < L[6] - 0.1) on = 1;
    var gk = on ? A_(lt, L[3], 0.5) : (lt >= L[6] - 0.1 ? 1 - A_(lt, L[6] - 0.1, 0.4) : 0);
    rbox(g, 40, 21, 20, 5, 0.5, GOLD, 0.2, 'rgba(242,198,107,' + (0.18 + 0.45 * gk).toFixed(2) + ')', a0);
    if (gk > 0.02) { halo(g, 50, 23.5, 14, GOLDA, 0.7 * gk); for (i = 0; i < 4; i++) tx(g, '+', 43 + i * 4.6, 23.5, 2.2, '#fff0c0', 'center', 900, SANS, gk); }
    // terminals
    ln(g, 28, 28, 28, 15, 'rgba(238,242,248,0.55)', 0.3, null, a0); ln(g, 72, 28, 72, 15, 'rgba(238,242,248,0.55)', 0.3, null, a0); ln(g, 50, 21, 50, 15, 'rgba(238,242,248,0.55)', 0.3, null, a0);
    chip(g, 28, 11.6, '源极', LEAF, A_(lt, L[1] - 0.1, 0.5)); chip(g, 72, 11.6, '漏极', LEAF, A_(lt, L[1] + 0.5, 0.5)); chip(g, 50, 11.6, '栅极', GOLD, A_(lt, L[3] - 0.2, 0.5), 'rgba(40,30,12,0.95)');
    var ma = A_(lt, L[2] - 0.1, 0.7) * (lt < L[4] - 0.1 ? 1 : 0), mc = (lt < L[3] - 0.1 ? 1 : 0);
    if (ma > 0.01) {
      rbox(g, 38, 28.2, 24, 8, 0.5, 'rgba(255,138,138,0.6)', 0.14, 'rgba(255,138,138,0.08)', ma, [0.6, 0.5]);
      tx(g, '✕', 50, 33.4, 3.0, RED, 'center', 900, SANS, ma * 0.9);
      chip(g, 50, 43.6, '中间：不导电', '#ff9d9d', ma * mc);
    }
    // electrons in the substrate get pulled up to the surface
    var pull = 0;
    if (lt >= L[4] - 0.1 && lt < L[6] - 0.1) pull = eo(clamp((lt - (L[4] - 0.1)) / 1.5));
    else if (lt >= L[6] - 0.1) pull = 1 - eo(clamp((lt - (L[6] - 0.1)) / 0.6));
    for (i = 0; i < 9; i++) {
      var sx = 40 + r() * 20, sy = 33.5 + r() * 4.5, cx2 = 38.5 + i * 2.9, cy2 = 29.2;
      eSmall(g, mix(sx, cx2, pull), mix(sy, cy2, pull), 0.45, a0 * (0.35 + 0.65 * pull) * A_(lt, L[3], 0.6) * (lt > 0 ? 1 : 0));
    }
    if (pull > 0.05) { rbox(g, 38, 28.2, 24, 2.2, 0.4, 'rgba(143,208,255,0.9)', 0.1, 'rgba(143,208,255,' + (0.35 * pull).toFixed(2) + ')', 1); }
    // the current
    var cur = (lt >= L[5] - 0.1 && lt < L[6] - 0.1) ? A_(lt, L[5] - 0.1, 0.5) : 0;
    if (cur > 0.01) {
      arrow(g, 30, 17.5, 70, 17.5, GOLD, 0.0, 0, 0.8);
      for (i = 0; i < 8; i++) {
        var u = frac_(lt * 0.5 + i / 8); eSmall(g, mix(26, 74, u), u < 0.18 || u > 0.82 ? 30.2 : 29.2, 0.55, cur);
      }
      halo(g, 50, 29.2, 14, ICEA, 0.5 * cur);
    }
    var sc2 = lt >= L[5] - 0.1 && lt < L[6] - 0.1 ? 1 : 0;
    chip(g, 50, 43.6, '开：电流通了', LEAF, A_(lt, L[5] + 0.3, 0.5) * sc2);
    chip(g, 50, 43.6, '关：电流停了', '#9fb3d9', A_(lt, L[6] + 0.4, 0.5));
    chip(g, 50, 43.6, '栅极加电压 → 电场', GOLD, A_(lt, L[3] + 0.3, 0.5) * (lt < L[5] - 0.1 ? 1 : 0), 'rgba(40,30,12,0.95)');
  };
