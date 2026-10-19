
  // ---------- d5: how long does the fall take ----------
  DRAW.d5 = function (g, lt, L) {
    var i, ax = 22, ay = 24, R = 10;
    var a0 = A_(lt, 0.0, 0.9);
    halo(g, ax, ay, 16, ICEA, 0.12 * a0);
    // the hydrogen atom collapses again and again
    g.save(); g.globalAlpha *= a0;
    var per = 2.6, ph = (lt % per);
    colAtom(g, ax, ay, R, ph, 0.7, 1.5, null, 1.1, 0);
    g.restore();
    tx(g, 'Hydrogen: one nucleus, one electron', ax, ay + R + 5, 2.0, DIM, 'center', 700, SANS, A_(lt, 0.3, 0.7));
    var ra = A_(lt, L[1] - 0.1, 0.8);
    if (ra > 0.01) {
      var y2 = ay - R - 4.6;
      arrow(g, ax, y2, ax + R, y2, GOLD, 0.22, ra, 0.8); arrow(g, ax, y2, ax - R, y2, GOLD, 0.22, ra, 0.8);
      tx(g, '0.053 nm → 0', ax, y2 - 2.4, 1.9, GOLD, 'center', 700, SANS, ra);
    }
    // the answer
    var na = A_(lt, L[2] - 0.1, 0.9);
    if (na > 0.01) {
      halo(g, 68, 19, 22, GOLDA, 0.12 * na);
      sci(g, '1.6', '−11', 68, 19, 7.6, '#ffe7a8', na, 900);
      tx(g, 's', 68 + 21, 19.5, 3.2, '#ffe7a8', 'left', 900, SANS, na);
      tx(g, 'about a 60-billionth of a second', 68, 27.5, 2.3, DIM, 'center', 700, SANS, na);
    }
    // blink of an eye, and a billion collapses
    var ea = A_(lt, L[3] - 0.1, 0.8);
    if (ea > 0.01) {
      var lid = Math.max(0, 1 - Math.abs(((lt * 1.2) % 1) - 0.5) / 0.08);
      h_eye(g, 47, 41.5, 1.7, ICE, ea, clamp(lid));
      tx(g, 'One blink', 47, 36, 1.9, ICE, 'center', 700, SANS, ea);
      for (i = 0; i < 10; i++) {
        var x = 58 + i * 4.1, pp = (lt * 3.1 + i * 0.37) % 1;
        g.save(); g.globalAlpha *= ea;
        colAtom(g, x, 41.5, 1.7, pp, 0.15, 0.55, null, 0.65, i);
        g.restore();
      }
      tx(g, 'billions of collapses', 79, 36, 1.9, GOLD, 'center', 700, SANS, ea);
    }
    var ca = A_(lt, L[4] - 0.1, 0.8);
    chip(g, 68, 31.6, 'Simplest case: circular orbit, radiation only', DIM, ca);
  };

  // ---------- d6: everything vanishes ----------
  var DOTS6 = (function () {
    var r = rng(61), out = [], i, x, y;
    function add(n, col, f, grp) { var k = 0, guard = 0; while (k < n && guard++ < n * 40) { x = r(); y = r(); var p = f(x, y); if (p) { out.push({ x: p[0], y: p[1], c: col, g: grp, t: r() }); k++; } } }
    add(230, '#9fd4ff', function (u, v) {
      var px = 6 + u * 32, py = 8 + v * 35;
      var head = Math.hypot(px - 22, py - 13.4) < 3.9;
      var torso = px > 16 && px < 28 && py > 18.6 && py < 32.5;
      var arms = ((px > 12.4 && px < 15.4) || (px > 28.6 && px < 31.6)) && py > 19.2 && py < 31;
      var legs = py >= 32.5 && py < 42.4 && ((px > 16 && px < 21.2) || (px > 22.8 && px < 28));
      return (head || torso || arms || legs) ? [px, py] : null;
    }, 0);
    add(90, '#d9b46b', function (u, v) { var px = 44 + u * 18, py = 14 + v * 24; var top = py > 16 && py < 19.5, leg = py >= 19.5 && ((px > 45 && px < 47.6) || (px > 58.4 && px < 61)); return (top || leg) ? [px, py] : null; }, 1);
    add(120, '#5fb3e8', function (u, v) { var px = 64 + u * 15, py = 14 + v * 15; return Math.hypot(px - 71.5, py - 21.5) < 7.2 ? [px, py] : null; }, 2);
    add(120, '#ffd36b', function (u, v) { var px = 80 + u * 16, py = 12 + v * 16; return Math.hypot(px - 88, py - 20) < 7.6 ? [px, py] : null; }, 3);
    return out;
  })();
  DRAW.d6 = function (g, lt, L) {
    var i, d, tc, q;
    var a0 = A_(lt, 0.0, 0.9);
    var win = [L[2] + 0.1, L[3] + 0.4, L[3] + 1.1, L[3] + 1.8];       // when each group starts to collapse
    for (i = 0; i < DOTS6.length; i++) {
      d = DOTS6[i];
      var ap = A_(lt, 0.1 + d.t * 0.8, 0.6);
      if (d.g >= 1) ap *= A_(lt, L[3] - 0.5, 0.6);
      var w0 = win[d.g] + d.t * (d.g === 0 ? 0.5 : 0.45);
      if (lt < w0) { dot(g, d.x, d.y, 0.33, d.c, ap * 0.9); continue; }
      q = lt - w0;
      if (q < 0.35) { halo(g, d.x, d.y, 1.6 * (1 - q / 0.35) + 0.4, 'rgba(255,235,190,0.95)', (1 - q / 0.35) * 0.9); dot(g, d.x, d.y, 0.33 * (1 - q / 0.35), '#fff4d8', ap); }
    }
    // labels
    var sa = A_(lt, L[1] - 0.2, 0.8) * (1 - sm(L[2] + 0.2, L[2] + 0.9, lt));
    tx(g, 'You', 22, 7.4, 2.4, ICE, 'center', 800, SANS, A_(lt, 0.6, 0.7) * (1 - sm(L[2] + 0.2, L[2] + 0.9, lt)));
    sci(g, '7', '27', 22, 44, 2.6, GOLD, sa, 900, null, ' atoms');
    var oa = A_(lt, L[3] - 0.3, 0.7);
    var fade = 1 - sm(L[3] + 2.2, L[3] + 3.0, lt);
    tx(g, 'Tables', 52.5, 40, 2.0, DIM, 'center', 700, SANS, oa * fade); tx(g, 'Earth', 71.5, 40, 2.0, DIM, 'center', 700, SANS, oa * fade); tx(g, 'Sun', 88, 40, 2.0, DIM, 'center', 700, SANS, oa * fade);
    var za = A_(lt, L[4] + 0.6, 1.6);
    tx(g, '∅', 50, 25, 16, '#8fa0b8', 'center', 300, SANS, za * 0.35);
  };

  // ---------- d7: reality says otherwise ----------
  DRAW.d7 = function (g, lt, L) {
    var a0 = A_(lt, 0.0, 0.8);
    rbox(g, 5, 8, 42, 26, 1.2, 'rgba(255,107,107,0.45)', 0.2, 'rgba(255,107,107,0.05)', a0);
    rbox(g, 53, 8, 42, 26, 1.2, 'rgba(98,214,160,0.45)', 0.2, 'rgba(98,214,160,0.05)', a0);
    tx(g, 'Theory predicts', 26, 12.6, 2.4, RED, 'center', 900, SANS, a0); tx(g, 'Reality', 74, 12.6, 2.4, LEAF, 'center', 900, SANS, a0);
    g.save(); g.globalAlpha *= a0; colAtom(g, 26, 21.6, 7.4, (lt % 2.2), 0.6, 1.2, null, 1.0, 0); g.restore();
    var lb = A_(lt, 0.4, 0.7);
        sci(g, '1.6', '−11', 26, 31, 2.1, RED, lb, 800, null, ' s to collapse');
    var sa = A_(lt, L[0] + 0.5, 0.9);
    g.save(); g.globalAlpha *= sa; mini(g, 74, 21.6, 7.4, lt, 0.4); g.restore();
    var hb = A_(lt, L[1] - 0.1, 0.7);
    tx(g, 'Stable for 10+ billion years', 74, 31, 1.9, LEAF, 'center', 700, SANS, hb);
    // the log axis
    var ax0 = 10, ax1 = 90, y = 43.2, xl = function (lg) { return ax0 + (lg + 12) / 30 * (ax1 - ax0); };
    var ga = A_(lt, L[2] - 0.2, 0.8);
    if (ga > 0.01) {
      ln(g, ax0, y, ax1, y, 'rgba(238,242,248,0.4)', 0.18, null, ga);
      var xr = xl(-10.8), xg = xl(17.64);
      dot(g, xr, y, 0.9, RED, ga); dot(g, xg, y, 0.9, LEAF, ga);
      ln(g, xr + 1.2, y - 2.4, xg - 1.2, y - 2.4, GOLD, 0.2, null, ga);
      ln(g, xr + 1.2, y - 3.3, xr + 1.2, y - 1.5, GOLD, 0.2, null, ga); ln(g, xg - 1.2, y - 3.3, xg - 1.2, y - 1.5, GOLD, 0.2, null, ga);
      sci(g, '', '28', (xr + xg) / 2, y - 5.3, 2.2, GOLD, ga, 900, 'off by 10', ' times');
    }
    var ca = A_(lt, L[3] - 0.1, 0.8);
    chip(g, 50, 21.5, '≠', GOLD, ca, 'rgba(40,30,12,0.95)');
  };

  // ---------- d8: the light of hydrogen is a few thin lines ----------
  DRAW.d8 = function (g, lt, L) {
    var i, bx0 = 40, bx1 = 94, wl = function (l) { return bx0 + (l - 400) / 300 * (bx1 - bx0); };
    var a0 = A_(lt, 0.0, 0.8);
    // prism
    var pa = A_(lt, L[1] - 0.2, 0.8);
    if (pa > 0.01) {
      g.save(); g.globalAlpha *= pa; g.fillStyle = 'rgba(143,208,255,0.12)'; g.strokeStyle = ICE; g.lineWidth = 0.3;
      g.beginPath(); g.moveTo(10, 36); g.lineTo(26, 36); g.lineTo(18, 17.5); g.closePath(); g.fill(); g.stroke(); g.restore();
      ln(g, 2, 28.5, 14.5, 28.5, '#ffffff', 0.4, null, pa);
      ln(g, 21.5, 28, 38, 15, 'rgba(255,255,255,0.35)', 0.15, null, pa); ln(g, 21.5, 29, 38, 33, 'rgba(255,255,255,0.35)', 0.15, null, pa);
      tx(g, 'Light from hydrogen', 15, 41, 1.8, DIM, 'center', 700, SANS, pa);
    }
    // predicted: a continuous rainbow
    var ca = A_(lt, L[2] - 0.2, 0.8), x;
    if (ca > 0.01) {
      var gr = g.createLinearGradient(bx0, 0, bx1, 0);
      gr.addColorStop(0, '#8b5cff'); gr.addColorStop(0.2, '#4d7dff'); gr.addColorStop(0.4, '#37d6c8'); gr.addColorStop(0.6, '#8be25c'); gr.addColorStop(0.8, '#ffd84d'); gr.addColorStop(1, '#ff4d4d');
      g.save(); g.globalAlpha *= ca * (lt > L[3] ? 0.35 : 0.9); g.fillStyle = gr; g.fillRect(bx0, 12, bx1 - bx0, 6); g.restore();
      tx(g, 'Classical prediction: a continuous rainbow', (bx0 + bx1) / 2, 9.4, 2.1, DIM, 'center', 700, SANS, ca);
      var xa = A_(lt, L[3] - 0.1, 0.4);
      if (xa > 0.01) { ln(g, 60, 12.4, 74, 17.6, RED, 0.5, null, xa); ln(g, 74, 12.4, 60, 17.6, RED, 0.5, null, xa); }
    }
    // observed: a few lines
    var lines = [[410.2, '#a98bff'], [434.0, '#6f8cff'], [486.1, '#3fe0e8'], [656.3, '#ff5a5a']];
    var oa = A_(lt, L[3] - 0.2, 0.6);
    if (oa > 0.01) {
      g.save(); g.globalAlpha *= oa; g.fillStyle = 'rgba(10,16,28,0.95)'; g.fillRect(bx0, 30, bx1 - bx0, 6); g.restore();
      tx(g, 'Actually seen: a few sharp lines', (bx0 + bx1) / 2, 27.2, 2.1, FG, 'center', 800, SANS, oa);
      for (i = 0; i < 4; i++) {
        var la = A_(lt, L[3] + 0.3 + i * 0.35, 0.4); x = wl(lines[i][0]);
        halo(g, x, 33, 3.2, lines[i][1], 0.6 * la); ln(g, x, 30, x, 36, lines[i][1], 0.55, null, la);
      }
    }
    var ea = A_(lt, L[4] - 0.1, 0.8);
    tx(g, 'Spiral → smooth frequency change → continuous light', 67, 21.4, 1.8, DIM, 'center', 600, SANS, ea * (lt < L[5] ? 1 : 0.3));
    var fa = A_(lt, L[5] - 0.1, 0.8);
    chip(g, 67, 42, 'Specific steps → specific colors', GOLD, fa, 'rgba(40,30,12,0.95)');
  };

  // ---------- d9: the first patch: only some orbits are allowed ----------
  DRAW.d9 = function (g, lt, L) {
    var cx = 28, cy = 27, rs = [4.2, 8.6, 13.6], i;
    var a0 = A_(lt, 0.0, 0.8);
    chip(g, 28, 9.2, '1913', GOLD, a0, 'rgba(40,30,12,0.95)');
    nuc(g, cx, cy, 1.2, A_(lt, 0.2, 0.7));
    for (i = 0; i < 3; i++) {
      var oa = A_(lt, L[1] + i * 0.35, 0.7);
      ring(g, cx, cy, rs[i], 'rgba(143,208,255,0.4)', 0.2, oa);
      tx(g, 'n=' + (i + 1), cx + rs[i] * 0.72 + 1.4, cy - rs[i] * 0.72 - 1.2, 1.5, DIM, 'left', 600, MONO, oa);
    }
    // the electron: n=3 orbit, then it jumps to n=2 and a photon goes out
    var jt = L[3] + 0.3, jd = 0.45, r;
    var ea = A_(lt, L[2] - 0.3, 0.7), ang = lt * 2.4;
    if (lt < jt) r = rs[2]; else if (lt < jt + jd) r = mix(rs[2], rs[1], eio((lt - jt) / jd)); else r = rs[1];
    elec(g, cx + r * Math.cos(ang), cy + r * Math.sin(ang), 0.8, ea);
    var ka = A_(lt, L[2] + 0.2, 0.7) * (lt < L[3] ? 1 : 0);
    chip(g, cx, 44, 'On an orbit: no radiation ✓', LEAF, ka);
    // the photon
    if (lt > jt + jd * 0.5) {
      var pt = lt - jt - jd * 0.5, px = cx + r * Math.cos(ang) + pt * 7.5, py = cy + r * Math.sin(ang) - pt * 1.8;
      var fa = clamp(1 - pt / 4.4);
      if (px < 58 && fa > 0.01) {
        g.save(); g.globalAlpha *= fa; g.strokeStyle = '#ff5a5a'; g.lineWidth = 0.4; g.beginPath();
        for (var k = 0; k <= 26; k++) { var xx = px - k * 0.34, yy = py + k * 0.07 + Math.sin(k * 0.9 - lt * 14) * 0.9; if (k === 0) g.moveTo(xx, yy); else g.lineTo(xx, yy); }
        g.stroke(); halo(g, px, py, 2.2, 'rgba(255,90,90,0.9)', 0.8); g.restore();
      }
    }
    var ta = A_(lt, L[4] - 0.1, 0.7);
    chip(g, 28, 44, 'One jump, one packet of light', RED, ta * (lt < L[5] ? 1 : 0));
    // the matching spectrum
    var sa = A_(lt, L[5] - 0.2, 0.8);
    if (sa > 0.01) {
      var bx0 = 58, bx1 = 94, wl = function (l) { return bx0 + (l - 400) / 300 * (bx1 - bx0); };
      var lines = [[410.2, '#a98bff', '6→2'], [434.0, '#6f8cff', '5→2'], [486.1, '#3fe0e8', '4→2'], [656.3, '#ff5a5a', '3→2']];
      tx(g, 'Calculated positions', 76, 15, 2.1, FG, 'center', 800, SANS, sa);
      g.save(); g.globalAlpha *= sa; g.fillStyle = 'rgba(10,16,28,0.95)'; g.fillRect(bx0, 19, bx1 - bx0, 7); g.restore();
      for (i = 0; i < 4; i++) {
        var la = A_(lt, L[5] + 0.2 + i * 0.35, 0.4), x = wl(lines[i][0]);
        halo(g, x, 22.5, 3.2, lines[i][1], 0.6 * la); ln(g, x, 19, x, 26, lines[i][1], 0.55, null, la);
        tx(g, lines[i][2], x, 29.2 + (i === 1 ? 1.9 : 0), 1.4, lines[i][1], 'center', 600, MONO, la);
      }
      var ck = A_(lt, L[5] + 1.8, 0.7);
      chip(g, 76, 37, 'Matches the measured lines ✓', LEAF, ck);
    }
  };
