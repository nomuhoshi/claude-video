  // ================= electric force video: kit and scenes d0-d4 =================
  var POS = '#ff8f6b', NEG = '#7cc4ff', GRN = '#62d6a0', VIO = '#b79cff', GRY = '#9aa7ba';
  function fr(v) { return v - Math.floor(v); }
  function glow(g, x, y, r, col, a) { if (a <= 0.003) return; g.save(); g.globalCompositeOperation = 'lighter'; halo(g, x, y, r, col, a); g.restore(); }
  function W_(lt, t0, t1, fi, fo) { return A_(lt, t0, fi || 0.6) * (t1 == null ? 1 : 1 - A_(lt, t1, fo || 0.5)); }
  // a charge: warm dot with + / cool dot with -
  function chg(g, x, y, r, s, a, gl) {
    if (a <= 0.003) return;
    halo(g, x, y, r * 3.2, s > 0 ? 'rgba(255,143,107,0.55)' : 'rgba(124,196,255,0.55)', a * (gl == null ? 1 : gl));
    dot(g, x, y, r, s > 0 ? POS : NEG, a);
    var w = Math.max(0.1, r * 0.2);
    ln(g, x - r * 0.5, y, x + r * 0.5, y, '#1a1015', w, null, a * 0.9);
    if (s > 0) ln(g, x, y - r * 0.5, x, y + r * 0.5, '#1a1015', w, null, a * 0.9);
  }
  function person(g, x, yb, s, a, col) {       // x = centre, yb = feet; about 10*s tall
    if (a <= 0.003) return;
    g.save(); g.globalAlpha *= a; g.fillStyle = col || 'rgba(214,224,240,0.85)'; g.strokeStyle = col || 'rgba(214,224,240,0.85)'; g.lineWidth = 0.9 * s; g.lineCap = 'round';
    g.beginPath(); g.arc(x, yb - 8.5 * s, 1.5 * s, 0, TAU); g.fill();
    g.beginPath(); if (g.roundRect) g.roundRect(x - 1.9 * s, yb - 6.7 * s, 3.8 * s, 4.2 * s, 1.1 * s); else g.rect(x - 1.9 * s, yb - 6.7 * s, 3.8 * s, 4.2 * s); g.fill();
    g.beginPath(); g.moveTo(x - 0.9 * s, yb - 2.6 * s); g.lineTo(x - 0.9 * s, yb); g.moveTo(x + 0.9 * s, yb - 2.6 * s); g.lineTo(x + 0.9 * s, yb); g.stroke();
    g.restore();
  }
  // text with subscript (mode 1) and superscript (mode 2) pieces, centred or left at x
  function rich(g, segs, x, y, sz, col, a, al, wt, fam) {
    if (a != null && a <= 0.003) return;
    g.save(); if (a != null) g.globalAlpha *= a; fam = fam || SANS; wt = wt || 700;
    var i, w = 0, ws = [];
    for (i = 0; i < segs.length; i++) { var m = segs[i][1] || 0; g.font = wt + ' ' + (m ? sz * 0.62 : sz) + 'px ' + fam; ws.push(g.measureText(segs[i][0]).width); w += ws[i]; }
    var x0 = al === 'left' ? x : al === 'right' ? x - w : x - w / 2; g.fillStyle = col; g.textBaseline = 'middle'; g.textAlign = 'left';
    for (i = 0; i < segs.length; i++) {
      var m2 = segs[i][1] || 0; g.font = wt + ' ' + (m2 ? sz * 0.62 : sz) + 'px ' + fam;
      g.fillText(segs[i][0], x0, y + (m2 === 1 ? sz * 0.3 : m2 === 2 ? -sz * 0.34 : 0)); x0 += ws[i];
    }
    g.restore();
  }
  // "m x 10^e unit", centred as a whole
  function sciU(g, m, e, unit, x, y, sz, col, a, wt) {
    var segs = [[m + ' × 10', 0], [e, 2]]; if (unit) segs.push([' ' + unit, 0]);
    rich(g, segs, x, y, sz, col, a, 'center', wt || 900);
  }
  function hexPts(n, R) { var P = [[0, 0]], k = 0, ring_ = 1; while (P.length < n) { for (k = 0; k < 6 * ring_ && P.length < n; k++) { var ang = k / (6 * ring_) * TAU + ring_; P.push([R * ring_ * Math.cos(ang), R * ring_ * Math.sin(ang)]); } ring_++; } return P; }

  // ---------- d0: opening ----------
  DRAW.d0 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8);
    // pair of particles (always there, then dims)
    var dim = 1 - A_(lt, L[1], 0.5);
    var pa = A_(lt, 0.4, 0.8) * dim + A_(lt, L[3], 0.7) * (1 - 0.6 * A_(lt, L[4], 0.6));
    var px = lt < L[3] ? 36 : 36, px2 = 64, py = 27;
    var isOpp = A_(lt, L[3], 0.6);
    chg(g, px, py, 2.4, 1, pa); chg(g, px2, py, 2.4, isOpp > 0.5 ? -1 : 1, pa);
    ln(g, px + 3.6, py, px2 - 3.6, py, 'rgba(238,242,248,0.5)', 0.18, [0.7, 0.6], pa * dim);
    chip(g, 50, py - 6, '距离 r', DIM, A_(lt, 0.5, 0.5) * dim);
    chip(g, 50, 38, 'F ∝ 1 / r²', ICE, A_(lt, 0.9, 0.5) * dim);
    // gravity vs electric bars
    var b = A_(lt, L[1], 0.7) * (1 - 0.8 * A_(lt, L[3] - 0.1, 0.6));
    if (b > 0.01) {
      var by = 43;
      ln(g, 56, by, 92, by, 'rgba(238,242,248,0.4)', 0.2, null, b);
      var h2 = 24 * eo(pr(lt, L[1] + 0.5, 1.6));
      rbox(g, 62, by - 0.7, 6, 0.7, 0.15, null, 0, GOLD, 1, b);
      rbox(g, 80, by - h2, 6, h2, 0.3, null, 0, 'rgba(255,143,107,0.9)', b);
      if (h2 > 20) { ln(g, 79, by - 12.5, 87, by - 13.5, '#0b1018', 0.8, null, b); ln(g, 79, by - 11, 87, by - 12, '#0b1018', 0.8, null, b); }
      tx(g, '引力', 65, by + 3, 1.9, DIM, 'center', 700, SANS, b); tx(g, '电力', 83, by + 3, 1.9, POS, 'center', 700, SANS, b);
    }
    var s = A_(lt, L[2], 0.8) * (1 - A_(lt, L[3] - 0.1, 0.6));
    if (s > 0.01) {
      sciU(g, '1.2', '36', '', 30, 22, 7.2, GOLD, s);
      chip(g, 30, 31, '质子对质子：电力 ÷ 引力', ICE, A_(lt, L[2] + 0.5, 0.6) * (1 - A_(lt, L[3] - 0.1, 0.6)));
    }
    // + and - labels
    var l3 = A_(lt, L[3] + 0.3, 0.7) * (1 - 0.7 * A_(lt, L[4], 0.6));
    chip(g, px, 37, '正', POS, l3, 'rgba(50,24,18,0.95)'); chip(g, px2, 37, '负', NEG, l3, 'rgba(14,34,56,0.95)');
    // question
    var q = A_(lt, L[4], 0.9);
    if (q > 0.01) { glow(g, 50, 24, 16, 'rgba(242,198,107,0.9)', 0.25 * q); tx(g, '？', 50, 24, 14, GOLD, 'center', 900, SANS, q); }
  };

  // ---------- d1: like charges repel ----------
  DRAW.d1 = function (g, lt, L) {
    var i, N = 13, r1 = rng(11), r2 = rng(23);
    var cl = 1 - A_(lt, L[3] - 0.2, 0.6);
    function cluster(cx, cy, sgn, t0, r) {
      var a0 = A_(lt, 0.15, 0.7), ex = eo(pr(lt, t0, 2.2));
      for (i = 0; i < N; i++) {
        var ang = r() * TAU, fin = 5 + r() * 9, st = 0.6 + r() * 1.2, ph = r() * 6;
        var rad = mix(st, fin, ex);
        var jx = Math.sin(lt * 3 + ph) * 0.22 * (1 - ex), jy = Math.cos(lt * 2.7 + ph) * 0.22 * (1 - ex);
        chg(g, cx + Math.cos(ang) * rad + jx, cy + Math.sin(ang) * rad * 0.8 + jy, 1.0, sgn, a0 * cl);
      }
      if (ex < 0.95) for (i = 0; i < 8; i++) { var an = i / 8 * TAU; arrow(g, cx + Math.cos(an) * 3, cy + Math.sin(an) * 3, cx + Math.cos(an) * (4.5 + 6 * ex), cy + Math.sin(an) * (4.5 + 6 * ex), sgn > 0 ? 'rgba(255,143,107,0.8)' : 'rgba(124,196,255,0.8)', 0.22, (1 - ex) * 0.9 * a0 * cl, 0.7); }
    }
    cluster(27, 22, 1, L[0] + 0.2, r1); cluster(73, 22, -1, L[2] + 0.2, r2);
    chip(g, 27, 38, '一堆正的', POS, A_(lt, L[0] + 0.1, 0.6) * cl, 'rgba(50,24,18,0.95)');
    chip(g, 73, 38, '一堆负的', NEG, A_(lt, L[2] + 0.1, 0.6) * cl, 'rgba(14,34,56,0.95)');
    // pairs
    var pa = A_(lt, L[3], 0.7);
    function pair(cx, s1, s2, t0, lab, col, attract) {
      var a = A_(lt, t0, 0.6); if (a <= 0.01) return;
      var dd = attract ? 7 - 3.4 * eio(pr(lt, t0 + 0.4, 1.6)) : 4.0 + 1.2 * eio(pr(lt, t0 + 0.4, 1.6));
      chg(g, cx - dd, 27, 2.4, s1, a); chg(g, cx + dd, 27, 2.4, s2, a);
      var ar = 5.5;
      if (attract) { arrow(g, cx - dd + 3.4, 27, cx - 0.9, 27, GRN, 0.3, a, 1.0); arrow(g, cx + dd - 3.4, 27, cx + 0.9, 27, GRN, 0.3, a, 1.0); }
      else { arrow(g, cx - dd - 3.4, 27, cx - dd - 8.2, 27, RED, 0.3, a, 1.0); arrow(g, cx + dd + 3.4, 27, cx + dd + 8.2, 27, RED, 0.3, a, 1.0); }
      chip(g, cx, 37, lab, col, A_(lt, t0 + 0.3, 0.6));
    }
    pair(16, 1, 1, L[3] + 0.1, '同种：相斥', RED, false);
    pair(50, -1, -1, L[3] + 0.9, '同种：相斥', RED, false);
    pair(84, 1, -1, L[4] + 0.1, '不同种：相吸', GRN, true);
    chip(g, 50, 45, '引力只有吸引，电力有吸有斥', DIM, A_(lt, L[4] + 1.2, 0.7) * 0.9);
  };

  // ---------- d2: mixed together ----------
  DRAW.d2 = function (g, lt, L) {
    var cols = 5, rows = 4, sp = 3.4, i, j;
    function blob(cx, cy, t0, seed, shrink) {
      var a0 = A_(lt, t0, 0.8); if (a0 <= 0.01) return; var r = rng(seed);
      var ex = eio(pr(lt, L[1], 1.8)); var sc = 1 - 0.12 * shrink;
      for (j = 0; j < rows; j++) for (i = 0; i < cols; i++) {
        var gx = (i - (cols - 1) / 2) * sp * sc, gy = (j - (rows - 1) / 2) * sp * sc, s = (i + j) % 2 ? -1 : 1;
        var ra = r() * TAU, rr = 4 + r() * 8, rx = Math.cos(ra) * rr * 1.3, ry = Math.sin(ra) * rr * 0.8;
        var sc2 = lt < L[1] ? 1 : 0;
        var x = cx + mix(rx, gx, ex), y = cy + mix(ry, gy, ex);
        if (ex < 1) { x += Math.sin(lt * 2 + i * 3 + j) * 0.5 * (1 - ex); y += Math.cos(lt * 2.3 + i + j * 2) * 0.5 * (1 - ex); }
        chg(g, x, y, 1.15, s, a0, 0.7);
      }
    }
    var shr = A_(lt, L[3], 0.8), lx = mix(50, 27, eio(pr(lt, L[4] - 0.2, 1.0)));
    blob(lx, 25, 0.2, 5, shr);
    // forces on the middle charge
    var f2 = A_(lt, L[2], 0.7) * (1 - A_(lt, L[4], 0.6));
    if (f2 > 0.01) {
      var mx = lx, my = 25 + 0, dx = [[-1, 0], [1, 0], [0, -1], [0, 1]];
      for (i = 0; i < 4; i++) arrow(g, mx + dx[i][0] * 6.5, my + dx[i][1] * 5.5, mx + dx[i][0] * 3.2, my + dx[i][1] * 3.0, GRN, 0.28, f2, 0.8);
      chip(g, lx, 38, '吸引 ≈ 排斥', GOLD, f2);
    }
    chip(g, lx, 13, '正负均匀混合', ICE, A_(lt, L[0] + 0.2, 0.6));
    blob(73, 25, L[4], 9, shr);
    chip(g, 73, 13, '另一团混合物', ICE, A_(lt, L[4] + 0.2, 0.6));
    var m = A_(lt, L[5], 0.8);
    if (m > 0.01) {
      ln(g, 40, 25, 60, 25, 'rgba(238,242,248,0.45)', 0.2, [0.8, 0.7], m);
      chip(g, 50, 25, '几乎没有力', GOLD, m, 'rgba(48,40,14,0.95)');
      tx(g, '≈ 0', 50, 33, 3.4, GOLD, 'center', 900, SANS, m);
    }
  };

  // ---------- d3: everything is such a mixture ----------
  DRAW.d3 = function (g, lt, L) {
    var cols = 9, rows = 5, sp = 4.6, i, j;
    var shrink = eio(pr(lt, L[3], 1.2));
    var sc = mix(1, 0.42, shrink), cy = mix(25, 12.5, shrink), a = mix(1, 0.7, shrink);
    for (j = 0; j < rows; j++) for (i = 0; i < cols; i++) {
      var ph = i * 0.13 + j * 0.09, ap = A_(lt, 0.2 + ph, 0.6); if (ap <= 0.01) continue;
      var s = (i + j) % 2 ? -1 : 1;
      var pulseP = s > 0 ? W_(lt, L[1], L[2], 0.3, 0.3) : W_(lt, L[2], L[3] - 0.2, 0.3, 0.3);
      var x = 50 + (i - (cols - 1) / 2) * sp * sc, y = cy + (j - (rows - 1) / 2) * sp * sc;
      chg(g, x, y, 1.45 * sc * (1 + 0.25 * pulseP * (0.5 + 0.5 * Math.sin(lt * 6))), s, ap * a, 0.8 + 0.6 * pulseP);
    }
    chip(g, 28, 5.2, '质子（正）', POS, A_(lt, L[1] + 0.1, 0.5) * (1 - 0.0), 'rgba(50,24,18,0.95)');
    chip(g, 72, 5.2, '电子（负）', NEG, A_(lt, L[2] + 0.1, 0.5), 'rgba(14,34,56,0.95)');
    // two people
    var pp = A_(lt, L[4], 0.8);
    person(g, 30, 44, 3.0, pp); person(g, 70, 44, 3.0, pp);
    var k;
    for (k = 0; k < 2; k++) { var px = k ? 70 : 30; chg(g, px - 1.6, 33, 0.9, 1, pp, 0.5); chg(g, px + 1.6, 33, 0.9, -1, pp, 0.5); }
    var f = A_(lt, L[5], 0.8);
    if (f > 0.01) {
      arrow(g, 40, 36, 60, 36, 'rgba(154,167,186,0.55)', 0.2, f, 0.8); arrow(g, 60, 39, 40, 39, 'rgba(154,167,186,0.55)', 0.2, f, 0.8);
      chip(g, 50, 29, '力 ≈ 0', GOLD, f, 'rgba(48,40,14,0.95)');
    }
  };

  // ---------- d4: a tiny imbalance ----------
  DRAW.d4 = function (g, lt, L) {
    var pa = A_(lt, 0.2, 0.8), i;
    var x1 = 16, x2 = 84, yb = 28;
    var ex = A_(lt, L[2], 0.8);
    person(g, x1, yb, 2.2, pa); person(g, x2, yb, 2.2, pa);
    // arm's length bracket
    var br = A_(lt, L[1], 0.7);
    if (br > 0.01) { ln(g, x1 + 5, yb - 12, x2 - 5, yb - 12, 'rgba(238,242,248,0.5)', 0.18, null, br); ln(g, x1 + 5, yb - 13, x1 + 5, yb - 11, 'rgba(238,242,248,0.5)', 0.18, null, br); ln(g, x2 - 5, yb - 13, x2 - 5, yb - 11, 'rgba(238,242,248,0.5)', 0.18, null, br); chip(g, 50, yb - 12, '相距一臂', DIM, br); }
    // extra electrons halo
    if (ex > 0.01) {
      var r = rng(4); for (i = 0; i < 9; i++) { var an = r() * TAU, rd = 3.6 + r() * 1.4; chg(g, x1 + Math.cos(an + lt * 0.5) * rd, yb - 10.5 + Math.sin(an + lt * 0.5) * rd * 1.3, 0.7, -1, ex * 0.9, 0.6); chg(g, x2 + Math.cos(an - lt * 0.5) * rd, yb - 10.5 + Math.sin(an - lt * 0.5) * rd * 1.3, 0.7, -1, ex * 0.9, 0.6); }
      chip(g, x1, 4.2, '多 1% 的电子', NEG, ex, 'rgba(14,34,56,0.95)'); chip(g, x2, 4.2, '多 1% 的电子', NEG, ex, 'rgba(14,34,56,0.95)');
    }
    // repulsion arrows
    var ra = A_(lt, L[3] - 0.5, 1.2);
    if (ra > 0.01) { arrow(g, 28, yb - 8, 21, yb - 8, RED, 0.8, ra, 1.8); arrow(g, 72, yb - 8, 79, yb - 8, RED, 0.8, ra, 1.8); ln(g, 30, yb - 8, 70, yb - 8, 'rgba(255,107,107,0.35)', 0.2, [0.8, 0.8], ra); tx(g, '互相排斥', 50, yb - 8, 2.4, RED, 'center', 900, SANS, ra); }
    // comparisons: building, mountain, earth
    var y0 = 40;
    function bld(x, a) {
      if (a <= 0.01) return; g.save(); g.globalAlpha *= a; g.fillStyle = 'rgba(190,205,228,0.8)';
      g.fillRect(x - 2.2, y0 - 6.5, 4.4, 6.5); g.fillRect(x - 1.5, y0 - 9.5, 3, 3); g.fillRect(x - 0.9, y0 - 12, 1.8, 2.5); g.fillRect(x - 0.15, y0 - 14.5, 0.3, 2.5); g.restore();
    }
    function mtn(x, a) {
      if (a <= 0.01) return; g.save(); g.globalAlpha *= a; g.fillStyle = 'rgba(160,185,215,0.8)';
      g.beginPath(); g.moveTo(x - 6, y0); g.lineTo(x - 1.5, y0 - 10); g.lineTo(x + 0.8, y0 - 6.5); g.lineTo(x + 2.5, y0 - 9); g.lineTo(x + 6, y0); g.closePath(); g.fill();
      g.fillStyle = 'rgba(240,246,255,0.95)'; g.beginPath(); g.moveTo(x - 2.6, y0 - 7.4); g.lineTo(x - 1.5, y0 - 10); g.lineTo(x - 0.4, y0 - 7.9); g.lineTo(x - 1.5, y0 - 7.2); g.closePath(); g.fill(); g.restore();
    }
    function earth(x, a) {
      if (a <= 0.01) return; var gr = g.createRadialGradient(x - 2, y0 - 9, 1, x, y0 - 6, 7); gr.addColorStop(0, '#9bd0ff'); gr.addColorStop(0.6, '#2a74b8'); gr.addColorStop(1, '#0d3a63');
      g.save(); g.globalAlpha *= a; g.fillStyle = gr; g.beginPath(); g.arc(x, y0 - 6, 6.2, 0, TAU); g.fill();
      g.fillStyle = 'rgba(98,214,160,0.75)'; g.beginPath(); g.ellipse(x - 1.8, y0 - 7.5, 2.2, 1.5, 0.5, 0, TAU); g.fill(); g.beginPath(); g.ellipse(x + 2.4, y0 - 4.2, 1.8, 1.2, -0.3, 0, TAU); g.fill(); g.restore();
    }
    var a3 = A_(lt, L[3], 0.6), a4 = A_(lt, L[4], 0.6), a5 = A_(lt, L[5], 0.6);
    bld(33, a3); chip(g, 33, y0 + 3.6, '帝国大厦', DIM, a3);
    mtn(50, a4); chip(g, 50, y0 + 3.6, '珠穆朗玛峰', DIM, a4);
    earth(67, a5); chip(g, 67, y0 + 3.6, '整个地球的重量', GOLD, a5, 'rgba(48,40,14,0.95)');
    // crosses and tick
    function cross(x, y, a) { ln(g, x - 1.6, y - 1.6, x + 1.6, y + 1.6, RED, 0.5, null, a); ln(g, x + 1.6, y - 1.6, x - 1.6, y + 1.6, RED, 0.5, null, a); }
    cross(39, y0 - 11, A_(lt, L[3] + 0.8, 0.4)); cross(56, y0 - 11, A_(lt, L[4] + 0.8, 0.4));
    if (a5 > 0.01) { g.save(); g.globalAlpha *= A_(lt, L[5] + 0.8, 0.4); g.strokeStyle = LEAF; g.lineWidth = 0.6; g.beginPath(); g.moveTo(72, y0 - 12); g.lineTo(73.6, y0 - 10.2); g.lineTo(76.6, y0 - 13.6); g.stroke(); g.restore(); glow(g, 67, y0 - 6, 14, 'rgba(242,198,107,0.9)', 0.2 * a5); }
  };
