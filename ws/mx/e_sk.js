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
    var w = 3.4, ci; for (ci = 0; ci < s.length; ci++) w += s.charCodeAt(ci) >= 0x2e80 ? 1.95 : 1.15;
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
  function sci(g, m, e, x, y, sz, col, a, wt, base) {
    g.save(); if (a != null) g.globalAlpha *= a;
    var fam = SANS; wt = wt || 900;
    var bt = base != null ? base : m + ' × 10';
    g.font = wt + ' ' + sz + 'px ' + fam; var w1 = g.measureText(bt).width;
    g.font = wt + ' ' + sz * 0.58 + 'px ' + fam; var w2 = g.measureText(e).width;
    var x0 = x - (w1 + w2) / 2;
    g.fillStyle = col; g.textBaseline = 'middle'; g.textAlign = 'left';
    g.font = wt + ' ' + sz + 'px ' + fam; g.fillText(bt, x0, y);
    g.font = wt + ' ' + sz * 0.58 + 'px ' + fam; g.fillText(e, x0 + w1, y - sz * 0.38);
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

