  // ================= heat video: kit =================
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


  // ---- heat-video helpers ----
  function heatCol(k, a) {                       // 0 = cold blue .. 1 = hot orange
    k = clamp(k); var r = Math.round(mix(110, 255, k)), gg = Math.round(mix(185, 125, k)), b = Math.round(mix(255, 70, k));
    return 'rgba(' + r + ',' + gg + ',' + b + ',' + (a == null ? 1 : a) + ')';
  }
  function jx(lt, ph, amp, spd) { return amp * (Math.sin(lt * spd + ph) + 0.6 * Math.sin(lt * spd * 2.37 + ph * 1.7 + 1)) / 1.6; }
  function jy(lt, ph, amp, spd) { return amp * (Math.cos(lt * spd * 1.13 + ph * 1.3) + 0.6 * Math.sin(lt * spd * 2.11 + ph * 0.7 + 2)) / 1.6; }
  // a jiggling atom: base position (x,y), amplitude and speed of its shaking, heat colour k
  function jat(g, x, y, r, lt, ph, amp, spd, k, a, streak) {
    if (a <= 0.003) return;
    var px = x + jx(lt, ph, amp, spd), py = y + jy(lt, ph, amp, spd);
    if (streak && amp * spd > 6) {
      var qx = x + jx(lt - 0.05, ph, amp, spd), qy = y + jy(lt - 0.05, ph, amp, spd);
      ln(g, px, py, qx, qy, heatCol(k, 0.5), r * 0.9, null, a * clamp((amp * spd - 6) / 8));
    }
    halo(g, px, py, r * 2.3, heatCol(k, 0.32), a);
    dot(g, px, py, r, heatCol(k * 0.8 + 0.1), a);
    dot(g, px - r * 0.3, py - r * 0.3, r * 0.33, 'rgba(255,255,255,0.75)', a * 0.7);
  }
  function tri(u) { u = u - Math.floor(u / 2) * 2; return u < 1 ? u : 2 - u; }   // triangle wave 0..1..0 with period 2
  // bouncing ball, starts at its apex at t = 0: returns [height, bounce index, energy fraction left]
  function bounce(t, T0, r, H) {
    var n = 0, Tn = T0; t += T0 / 2;
    while (t > Tn && Tn > 0.06) { t -= Tn; Tn *= r; n++; }
    if (Tn <= 0.06) return [0, n, 0];
    var u = t / Tn * 2 - 1;
    return [H * Math.pow(r, 2 * n) * (1 - u * u), n, Math.pow(r, 2 * n)];
  }
  function hexG(R, sp, ox, oy) {                 // hex-packed points inside a disc
    var P = [], rows = Math.ceil(R / (sp * 0.866)) + 1, i, j;
    for (j = -rows; j <= rows; j++) for (i = -rows; i <= rows; i++) {
      var x = (i + (j & 1 ? 0.5 : 0)) * sp, y = j * sp * 0.866;
      if (x * x + y * y <= R * R + 0.01) P.push([x + (ox || 0), y + (oy || 0)]);
    }
    return P;
  }
