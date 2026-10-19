  // ================= scene helpers shared by draws and sound =================
  var IDX = DATA.idx;
  var DCUES = [], DBEDS = [];            // sound events that depend on the animation (none in this video: all cues are line-anchored)
  var PENTH = [1174.66, 1318.51, 1479.98, 1760.0, 1975.53, 2349.32];
  function sc_(key) { return scenes[IDX[key]]; }

  // ================= drawing kit for the "classical atom collapses" story =================
  var RED = '#ff6b6b', ICEA = 'rgba(143,208,255,0.55)', REDA = 'rgba(255,107,107,0.6)', GOLDA = 'rgba(242,198,107,0.55)', GRNA = 'rgba(98,214,160,0.5)';
  var NUC = '#ff9d6e', NUCA = 'rgba(255,120,70,0.55)', ELE = '#cfeaff';
  function A_(lt, s, d) { return eo(pr(lt, s, d)); }
  function rbox(g, x, y, w, h, r, stroke, lw, fill, a, dash) {
    if (a <= 0.003) return;
    g.save(); g.globalAlpha *= a; g.beginPath();
    if (g.roundRect) g.roundRect(x, y, w, h, r); else g.rect(x, y, w, h);
    if (fill) { g.fillStyle = fill; g.fill(); }
    if (stroke) { g.strokeStyle = stroke; g.lineWidth = lw; if (dash) g.setLineDash(dash); g.stroke(); }
    g.restore();
  }
  function arrow(g, x1, y1, x2, y2, col, w, a, hs) {
    if (a <= 0.003) return;
    var ang = Math.atan2(y2 - y1, x2 - x1), s = hs || 0.9;
    ln(g, x1, y1, x2 - Math.cos(ang) * s * 0.6, y2 - Math.sin(ang) * s * 0.6, col, w, null, a);
    arrowHead(g, x2 - Math.cos(ang) * s * 0.7, y2 - Math.sin(ang) * s * 0.7, ang, s, col, a);
  }
  function chip(g, x, y, s, col, a, bg) {
    if (a <= 0.003) return;
    g.save(); g.font = '700 1.9px ' + SANS; var w = 3.6 + g.measureText(s).width; g.restore();
    pill(g, x - w / 2, y - 1.55, w, 3.1, bg || 'rgba(20,34,56,0.92)', a);
    g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = 0.18; g.beginPath();
    if (g.roundRect) g.roundRect(x - w / 2, y - 1.55, w, 3.1, 1.55); else g.rect(x - w / 2, y - 1.55, w, 3.1);
    g.stroke(); g.restore();
    tx(g, s, x, y + 0.08, 1.9, col, 'center', 700, SANS, a);
  }
  function nuc(g, x, y, r, a) {
    if (a <= 0.003) return;
    halo(g, x, y, r * 3.4, NUCA, 0.6 * a); dot(g, x, y, r, NUC, a); dot(g, x - r * 0.3, y - r * 0.3, r * 0.35, 'rgba(255,255,255,0.85)', a * 0.7);
  }
  function elec(g, x, y, r, a) {
    if (a <= 0.003) return;
    halo(g, x, y, r * 3.6, ICEA, 0.65 * a); dot(g, x, y, r, ELE, a); dot(g, x - r * 0.3, y - r * 0.3, r * 0.35, 'rgba(255,255,255,0.9)', a * 0.7);
  }
  function arcl(g, cx, cy, r, a0, a1, col, w, a) {
    if (a <= 0.003) return;
    g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = w; g.beginPath(); g.arc(cx, cy, r, a0, a1); g.stroke(); g.restore();
  }
  // number in scientific notation:  m x 10^e   (superscript drawn by hand so no special glyph is needed)
  function sci(g, m, e, x, y, sz, col, a, wt, base, suf) {
    g.save(); if (a != null) g.globalAlpha *= a;
    var fam = SANS; wt = wt || 900;
    var bt = base != null ? base : m + ' \u00d7 10', sf = suf || '';
    g.font = wt + ' ' + sz + 'px ' + fam; var w1 = g.measureText(bt).width;
    g.font = wt + ' ' + sz * 0.58 + 'px ' + fam; var w2 = g.measureText(e).width;
    g.font = wt + ' ' + sz * 0.8 + 'px ' + fam; var w3 = sf ? g.measureText(sf).width : 0;
    var x0 = x - (w1 + w2 + w3) / 2;
    g.fillStyle = col; g.textBaseline = 'middle'; g.textAlign = 'left';
    g.font = wt + ' ' + sz + 'px ' + fam; g.fillText(bt, x0, y);
    g.font = wt + ' ' + sz * 0.58 + 'px ' + fam; g.fillText(e, x0 + w1, y - sz * 0.38);
    if (sf) { g.font = wt + ' ' + sz * 0.8 + 'px ' + fam; g.fillText(sf, x0 + w1 + w2, y + sz * 0.04); }
    g.restore();
  }
  // the classical death spiral:  r^3 shrinks linearly in time, so the angle sweeps a finite total and speeds up
  var TH_ALL = TAU * 9;
  function spiral(u, R) { var v = clamp(u); return [R * Math.pow(Math.max(1e-4, 1 - v), 1 / 3), TH_ALL * (1 - Math.sqrt(Math.max(0, 1 - v)))]; }
  // an atom that orbits steadily, then (from tc, over td seconds) spirals into the nucleus, flashes, and optionally comes back at tr
  function colAtom(g, x, y, R, lt, tc, td, tr, sz, ph) {
    sz = sz || 1; ph = ph || 0;
    var w = 5.0, base = lt * w + ph, i;
    if (tr != null && lt >= tr) {
      var f = A_(lt, tr, 0.9);
      ring(g, x, y, R, 'rgba(143,208,255,0.3)', 0.14 * sz, f); nuc(g, x, y, 0.85 * sz, f);
      elec(g, x + R * Math.cos(base), y + R * Math.sin(base), 0.5 * sz, f); return;
    }
    if (lt < tc) {
      ring(g, x, y, R, 'rgba(143,208,255,0.3)', 0.14 * sz, 1); nuc(g, x, y, 0.85 * sz, 1);
      elec(g, x + R * Math.cos(base), y + R * Math.sin(base), 0.5 * sz, 1); return;
    }
    var u = (lt - tc) / td;
    if (u < 1) {
      var a0 = tc * w + ph, p = spiral(u, R), n = 150;
      for (i = 0; i < n; i++) {
        var uu = Math.max(0, u - 0.3 * (n - i) / n), q = spiral(uu, R), ag = a0 + q[1] + 0;
        var q2 = spiral(Math.max(0, u - 0.3 * (n - i - 1) / n), R), ag2 = a0 + q2[1];
        ln(g, x + q[0] * Math.cos(ag), y + q[0] * Math.sin(ag), x + q2[0] * Math.cos(ag2), y + q2[0] * Math.sin(ag2), 'rgba(143,208,255,' + (0.55 * i / n).toFixed(3) + ')', 0.22 * sz, null, 1);
      }
      nuc(g, x, y, 0.85 * sz, 1); elec(g, x + p[0] * Math.cos(a0 + p[1]), y + p[0] * Math.sin(a0 + p[1]), 0.5 * sz, 1);
    } else {
      var q3 = lt - tc - td;
      nuc(g, x, y, 0.85 * sz + 0.5 * sz * clamp(1 - q3 / 0.4), 1);
      halo(g, x, y, R * 1.1, 'rgba(255,230,180,0.9)', clamp(1 - q3 / 0.5) * 0.7);
      ring(g, x, y, 1 + q3 * R * 2.2, 'rgba(255,220,170,0.9)', 0.2 * sz, clamp(1 - q3 / 0.7));
    }
  }
  function h_eye(g, x, y, s, col, a, lid) {      // lid 0 open .. 1 closed
    if (a <= 0.003) return;
    g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = 0.3 * s; g.lineCap = 'round';
    var o = (1 - lid) * 1.6 * s;
    g.beginPath(); g.moveTo(x - 3 * s, y); g.quadraticCurveTo(x, y - 2 * o - 0.1, x + 3 * s, y); g.quadraticCurveTo(x, y + 2 * o + 0.1, x - 3 * s, y); g.stroke();
    if (lid < 0.7) dot(g, x, y, 0.85 * s * (1 - lid), col, 1);
    g.restore();
  }
  function mini(g, x, y, R, lt, ph) {       // a calm little atom
    ring(g, x, y, R, 'rgba(143,208,255,0.3)', 0.12, 1); nuc(g, x, y, 0.6, 1);
    elec(g, x + R * Math.cos(lt * 5 + ph), y + R * Math.sin(lt * 5 + ph), 0.38, 1);
  }

  // ---------- d0: opening ----------
  DRAW.d0 = function (g, lt, L) {
    var cx = 40, cy = 31, R = 11, i;
    var ia = A_(lt, 0.3, 1.2);
    halo(g, cx, cy, 24, ICEA, 0.14 * ia);
    g.save(); g.globalAlpha *= ia;
    colAtom(g, cx, cy, R, lt, L[1] + 0.5, 3.2, L[3] + 0.1, 1.15, 0.3);
    g.restore();
    // a row of small atoms that fall together with it
    for (i = 0; i < 9; i++) {
      var x = 14 + i * 9, a = A_(lt, 1.0 + i * 0.12, 0.6);
      if (a <= 0.01) continue;
      g.save(); g.globalAlpha *= a;
      colAtom(g, x, 44.4, 2.1, lt, L[2] + 0.1 + i * 0.13, 0.9, L[3] + 0.4 + i * 0.1, 0.8, i * 1.3);
      g.restore();
    }
    var ch = A_(lt, L[3] + 0.4, 0.8);
    chip(g, 80, cy, 'In reality, they are all fine', GRN_(), ch);
    var c2 = A_(lt, L[4] + 0.2, 0.8);
    chip(g, 80, cy, 'Classical physics ≠ reality', GOLD, c2, 'rgba(40,30,12,0.95)');
  };
  function GRN_() { return LEAF; }

  // ---------- d1: the little solar system ----------
  DRAW.d1 = function (g, lt, L) {
    var cx = 29, cy = 27, R = 13, i, j;
    // L0: matter is made of atoms (a grid of small atoms), then one of them is picked out
    var ga = A_(lt, 0.1, 0.8) * (1 - sm(L[1] - 0.2, L[1] + 0.6, lt));
    if (ga > 0.01) {
      g.save(); g.globalAlpha *= ga;
      for (i = 0; i < 6; i++) for (j = 0; j < 4; j++) mini(g, 7 + i * 8.4, 12.5 + j * 8.4, 2.6, lt, i * 0.9 + j * 1.7);
      g.restore();
    }
    var ba = A_(lt, L[1] - 0.1, 0.9);
    g.save(); g.globalAlpha *= ba;
    ring(g, cx, cy, R, 'rgba(143,208,255,0.35)', 0.2, 1);
    nuc(g, cx, cy, 1.5, 1);
    var ea = A_(lt, L[2] - 0.1, 0.7), ang = lt * 1.8;
    elec(g, cx + R * Math.cos(ang), cy + R * Math.sin(ang), 0.95, ea);
    g.restore();
    var la = A_(lt, L[1] + 0.2, 0.6);
    ln(g, cx - 1.2, cy - 1.2, cx - 9, cy - 9.5, NUC, 0.15, null, la); tx(g, 'nucleus', cx - 9.4, cy - 11, 2.2, NUC, 'center', 800, SANS, la);
    var lb = A_(lt, L[2] + 0.2, 0.6);
    tx(g, 'electron', cx + (R + 3.4) * Math.cos(ang), cy + (R + 3.4) * Math.sin(ang), 2.2, ICE, 'center', 800, SANS, lb);
    // L3: opposite charges, L4: the solar system picture
    var pc = A_(lt, L[3] - 0.1, 0.7);
    chip(g, cx - 12.5, 43, 'positive  +', NUC, pc); chip(g, cx + 12.5, 43, 'negative  −', ICE, pc);
    var at = A_(lt, L[3] + 0.5, 0.8);
    if (at > 0.01) {
      var ex = cx + R * Math.cos(ang), ey = cy + R * Math.sin(ang), d = Math.hypot(ex - cx, ey - cy) || 1;
      arrow(g, ex - (ex - cx) / d * 1.2, ey - (ey - cy) / d * 1.2, cx + (ex - cx) / d * 3.6, cy + (ey - cy) / d * 3.6, GOLD, 0.25, at * 0.85, 0.9);
    }
    var sa = A_(lt, L[4] - 0.1, 0.9), sx = 76, sy = 27;
    if (sa > 0.01) {
      halo(g, sx, sy, 7, 'rgba(255,200,90,0.9)', 0.5 * sa); dot(g, sx, sy, 2.3, '#ffd36b', sa);
      ring(g, sx, sy, R, 'rgba(238,242,248,0.3)', 0.2, sa);
      var pa = lt * 1.1; dot(g, sx + R * Math.cos(pa), sy + R * Math.sin(pa), 1.0, '#6bc3ff', sa); dot(g, sx + R * Math.cos(pa) - 0.3, sy + R * Math.sin(pa) - 0.3, 0.35, 'rgba(255,255,255,0.8)', sa * 0.8);
      tx(g, 'Sun', sx, sy - 5, 2.0, '#ffd36b', 'center', 800, SANS, sa); tx(g, 'Earth', sx + R * Math.cos(pa), sy + R * Math.sin(pa) - 2.4, 2.0, '#6bc3ff', 'center', 800, SANS, sa * 0.9);
      tx(g, 'like', (cx + R + sx - R) / 2, sy, 2.4, GOLD, 'center', 900, SANS, sa);
      chip(g, sx, 43, 'Planets orbit the Sun', DIM, sa);
    }
  };

  // ---------- d2: mostly empty, and very fast ----------
  DRAW.d2 = function (g, lt, L) {
    var cx = 24, cy = 25, R = 14, i;
    var a0 = A_(lt, 0.0, 0.9);
    ring(g, cx, cy, R, 'rgba(143,208,255,0.35)', 0.2, a0); nuc(g, cx, cy, 0.9, a0);
    var ang = lt * (lt > L[3] ? 9 : 1.7), ea = A_(lt, 0.3, 0.6);
    // L3: speed blur
    var blur = A_(lt, L[3], 0.8);
    if (blur > 0.01) {
      for (i = 0; i < 18; i++) { var aa = ang - i * 0.1; elec(g, cx + R * Math.cos(aa), cy + R * Math.sin(aa), 0.5, ea * (1 - i / 18) * 0.7); }
      ring(g, cx, cy, R, 'rgba(143,208,255,0.55)', 0.5, blur * 0.7);
    }
    elec(g, cx + R * Math.cos(ang), cy + R * Math.sin(ang), 0.8, ea);
    var e0 = A_(lt, 0.4, 0.8) * (1 - sm(L[1] - 0.3, L[1] + 0.5, lt));
    tx(g, 'Mostly empty space', cx, cy + R + 4.4, 2.2, DIM, 'center', 700, SANS, e0);
    var sc = A_(lt, L[3] + 0.5, 0.7);
    sci(g, '6.6', '15', cx, cy + R + 4.4, 2.5, GOLD, sc, 900, null, ' laps / s');
    // the stadium: the nucleus is one grain of millet
    var st = A_(lt, L[1] - 0.1, 0.9), sx = 70, sy = 24.5;
    if (st > 0.01) {
      rbox(g, sx - 19, sy - 10.5, 38, 21, 9, 'rgba(238,242,248,0.6)', 0.3, 'rgba(143,208,255,0.05)', st);
      rbox(g, sx - 14.5, sy - 7, 29, 14, 5, 'rgba(238,242,248,0.25)', 0.18, null, st);
      ln(g, sx, sy - 7, sx, sy + 7, 'rgba(238,242,248,0.18)', 0.15, null, st);
      tx(g, 'atom = stadium', sx, sy + 15.4, 2.2, FG, 'center', 800, SANS, st);
    }
    var gr = A_(lt, L[2] - 0.1, 0.9);
    if (gr > 0.01) {
      halo(g, sx, sy, 3.2, NUCA, 0.9 * gr * (0.7 + 0.3 * Math.sin(lt * 6))); dot(g, sx, sy, 0.38, NUC, gr);
      ln(g, sx, sy - 0.8, sx, sy - 12.2, NUC, 0.15, null, gr); tx(g, 'nucleus = a grain of rice', sx, sy - 13.8, 2.0, NUC, 'center', 800, SANS, gr);
    }
    var ck = A_(lt, L[4] - 0.1, 0.8);
    chip(g, 70, 45.2, 'The classical picture', GOLD, ck, 'rgba(40,30,12,0.95)');
  };

  // ---------- d3: accelerating charges radiate ----------
  DRAW.d3 = function (g, lt, L) {
    var ax = 24, ay = 26, i;
    var a0 = A_(lt, 0.0, 0.8);
    ln(g, ax, 13, ax, 39, 'rgba(238,242,248,0.5)', 0.4, null, a0);
    tx(g, 'Shaking charge', ax, 9.8, 2.1, DIM, 'center', 700, SANS, a0);
    var qy = ay + Math.sin(lt * 3.2) * 7.5, qa = A_(lt, 0.2, 0.7);
    // electromagnetic waves expand from the antenna once line 1 starts
    var wa = A_(lt, L[1] - 0.2, 0.6);
    for (i = 0; i < 6; i++) {
      var age = ((lt * 0.85) + i / 6) % 1;
      ring(g, ax, ay, 2 + age * 20, 'rgba(242,198,107,0.9)', 0.25, (1 - age) * 0.8 * wa);
    }
    elec(g, ax, qy, 0.95, qa);
    tx(g, 'EM wave', ax + 17, ay - 14.5, 2.2, GOLD, 'center', 800, SANS, wa);
    var ca = A_(lt, L[2] - 0.1, 0.7);
    chip(g, 10, 43, 'Phone', ICE, ca); chip(g, 24, 43, 'Antenna', ICE, ca); chip(g, 38, 43, 'Radio', ICE, ca);
    // right: the electron on its orbit
    var bx = 72, by = 26, R = 11, aa = A_(lt, L[3] - 0.3, 0.9);
    ring(g, bx, by, R, 'rgba(143,208,255,0.3)', 0.18, aa); nuc(g, bx, by, 1.0, aa);
    var th = lt * 2.0, ex = bx + R * Math.cos(th), ey = by + R * Math.sin(th);
    elec(g, ex, ey, 0.8, aa);
    var va = A_(lt, L[3] + 0.2, 0.7);
    arrow(g, ex, ey, ex - Math.sin(th) * 6.5, ey + Math.cos(th) * 6.5, GOLD, 0.3, va, 1.0);
    tx(g, 'velocity', ex - Math.sin(th) * 8.7, ey + Math.cos(th) * 8.7, 1.8, GOLD, 'center', 700, SANS, va);
    var ac = A_(lt, L[4] - 0.1, 0.7);
    arrow(g, ex, ey, ex - Math.cos(th) * 5.5, ey - Math.sin(th) * 5.5, RED, 0.3, ac, 1.0);
    tx(g, 'accel.', bx + 2.2 * Math.cos(th + 0.5) + 0, by + 2.2 * Math.sin(th + 0.5), 1.8, RED, 'center', 700, SANS, ac * 0);
    chip(g, bx, 43, 'Direction changes = acceleration', RED, ac);
    // L5: the orbiting electron radiates
    var ra = A_(lt, L[5] - 0.1, 0.6);
    for (i = 0; i < 5; i++) {
      var ag = ((lt * 0.9) + i / 5) % 1, te = lt - ag * 1.1, tt = te * 2.0;
      ring(g, bx + R * Math.cos(tt), by + R * Math.sin(tt), 0.8 + ag * 9, 'rgba(242,198,107,0.9)', 0.2, (1 - ag) * 0.7 * ra);
    }
    tx(g, 'Radiating energy outward', bx, 4.6, 2.2, GOLD, 'center', 800, SANS, ra);
  };

  // ---------- d4: the death spiral ----------
  DRAW.d4 = function (g, lt, L) {
    var cx = 50, cy = 25.5, R = 16.5, w = 3.2, T0 = L[1] - 0.2, TD = 8.6, i;
    function state(t) { var u = clamp((t - T0) / TD), s = spiral(u, R), ag = w * Math.min(t, T0) + s[1]; return { u: u, r: s[0], x: cx + s[0] * Math.cos(ag), y: cy + s[0] * Math.sin(ag) }; }
    var a0 = A_(lt, 0.0, 0.8), st = state(lt);
    ring(g, cx, cy, R, 'rgba(143,208,255,0.16)', 0.14, a0 * (1 - st.u));
    // trail
    for (i = 0; i < 200; i++) {
      var t1 = lt - (200 - i) * 0.022, t2 = lt - (199 - i) * 0.022;
      if (t1 < T0 - 1) continue;
      var s1 = state(Math.max(t1, 0)), s2 = state(Math.max(t2, 0));
      ln(g, s1.x, s1.y, s2.x, s2.y, 'rgba(143,208,255,' + (0.55 * i / 200).toFixed(3) + ')', 0.24, null, a0);
    }
    // waves leaving from where the electron was
    for (i = 0; i < 9; i++) {
      var te = lt - i * 0.42, age = lt - te;
      if (te < 0.8 || te > T0 + TD) continue;
      var p = state(te);
      ring(g, p.x, p.y, age * 2.6, 'rgba(242,198,107,0.9)', 0.18, (1 - age / 3.8) * 0.5 * a0);
    }
    nuc(g, cx, cy, 1.2, a0);
    var fl = lt > T0 + TD ? lt - T0 - TD : -1;
    if (fl >= 0) { halo(g, cx, cy, 14, 'rgba(255,230,180,0.95)', clamp(1 - fl / 0.7) * 0.8); ring(g, cx, cy, 1 + fl * 18, 'rgba(255,220,170,0.9)', 0.25, clamp(1 - fl / 1.1)); }
    else elec(g, st.x, st.y, 0.85, a0);
    // left bar: orbit size; right bar: spinning speed
    var ba = A_(lt, L[1] - 0.3, 0.7), bb = A_(lt, L[2] - 0.3, 0.7);
    function bar(x, lab, k, col, a) {
      rbox(g, x - 1.2, 11, 2.4, 28, 1.2, 'rgba(238,242,248,0.4)', 0.15, null, a);
      rbox(g, x - 1.2, 39 - 28 * clamp(k), 2.4, 28 * clamp(k), 1.2, null, 0, col, a);
      tx(g, lab, x, 8.2, 2.0, col, 'center', 800, SANS, a);
    }
    bar(11, 'Orbit size', st.r / R, ICE, ba);
    bar(89, 'Speed', 1 - Math.sqrt(Math.max(0, 1 - st.u)), RED, bb);
    var ea = A_(lt, L[0] + 0.1, 0.7) * (1 - sm(L[1] - 0.2, L[1] + 0.4, lt));
    chip(g, cx, 44, 'Emit light, lose energy', GOLD, ea, 'rgba(40,30,12,0.95)');
    var fa = A_(lt, L[4] + 0.3, 0.8) * (fl >= 0 ? 0 : 1);
    chip(g, cx, 44, 'Loop by loop, falling inward', RED, fa);
    var ga = A_(lt, T0 + TD + 0.6, 0.8);
    chip(g, cx, 44, 'Into the nucleus', RED, ga);
  };
