  // ================= Faraday biography: drawing kit =================
  var CU = '#e8935a', CUD = '#a85a2e', IRON = '#8d97a8', NRED = '#ff6b6b', SBLU = '#6fa8ff', WIRE = 'rgba(232,147,90,0.85)';
  function pulse(lt, t0, tau) { return lt < t0 ? 0 : Math.exp(-(lt - t0) / (tau || 0.35)); }
  // a horizontal coil centred at (cx, cy), w long, h tall
  function coil(g, cx, cy, w, h, n, a, glowK) {
    if (a <= 0.003) return;
    var i, x0 = cx - w / 2, dx = w / (n - 1);
    g.save(); g.globalAlpha *= a; g.lineCap = 'round';
    for (i = 0; i < n; i++) { g.strokeStyle = CUD; g.lineWidth = 0.55; g.beginPath(); g.ellipse(x0 + i * dx, cy, h * 0.16, h / 2, 0, Math.PI * 0.5, Math.PI * 1.5); g.stroke(); }
    for (i = 0; i < n; i++) { g.strokeStyle = CU; g.lineWidth = 0.6; g.beginPath(); g.ellipse(x0 + i * dx, cy, h * 0.16, h / 2, 0, -Math.PI * 0.5, Math.PI * 0.5); g.stroke(); }
    g.restore();
    if (glowK) glow(g, cx, cy, w * 0.7, 'rgba(255,180,90,0.9)', 0.25 * glowK * a);
  }
  // galvanometer: dial with a needle; d in -1..1
  function galv(g, x, y, r, d, a, label) {
    if (a <= 0.003) return;
    rbox(g, x - r * 1.15, y - r * 1.05, r * 2.3, r * 1.75, r * 0.2, 'rgba(238,242,248,0.55)', 0.2, 'rgba(14,18,28,0.85)', a);
    arcl(g, x, y + r * 0.45, r * 0.95, Math.PI * 1.15, Math.PI * 1.85, 'rgba(238,242,248,0.6)', 0.18, a);
    for (var i = -4; i <= 4; i++) { var an = -Math.PI / 2 + i * 0.13 * Math.PI / 1.0 * 0.6; ln(g, x + Math.cos(an) * r * 0.8, y + r * 0.45 + Math.sin(an) * r * 0.8, x + Math.cos(an) * r * 0.95, y + r * 0.45 + Math.sin(an) * r * 0.95, 'rgba(238,242,248,0.6)', 0.14, null, a); }
    var na = -Math.PI / 2 + clamp(d * 0.5 + 0.5) * 0 + Math.max(-1, Math.min(1, d)) * 0.62;
    ln(g, x, y + r * 0.45, x + Math.cos(na) * r * 0.9, y + r * 0.45 + Math.sin(na) * r * 0.9, Math.abs(d) > 0.1 ? GOLD : FG, 0.28, null, a);
    dot(g, x, y + r * 0.45, r * 0.09, FG, a);
    if (Math.abs(d) > 0.1) glow(g, x + Math.cos(na) * r * 0.8, y + r * 0.45 + Math.sin(na) * r * 0.8, r * 0.6, 'rgba(242,198,107,0.9)', 0.4 * Math.min(1, Math.abs(d)) * a);
    if (label !== false) tx(g, label || '电流表', x, y + r * 1.25, 1.7, DIM, 'center', 700, SANS, a);
  }
  // bar magnet centred at (x, y), angle ang (N end points to +x when ang = 0)
  function barMag(g, x, y, w, h, ang, a, lab) {
    if (a <= 0.003) return;
    g.save(); g.globalAlpha *= a; g.translate(x, y); g.rotate(ang || 0);
    g.fillStyle = SBLU; g.fillRect(-w / 2, -h / 2, w / 2, h); g.fillStyle = NRED; g.fillRect(0, -h / 2, w / 2, h);
    g.strokeStyle = 'rgba(255,255,255,0.35)'; g.lineWidth = 0.15; g.strokeRect(-w / 2, -h / 2, w, h);
    g.restore();
    if (lab !== false) { var c = Math.cos(ang || 0), s = Math.sin(ang || 0); tx(g, 'N', x + c * w * 0.3, y + s * w * 0.3 + 0.1, h * 0.55, '#2a0d10', 'center', 900, SANS, a); tx(g, 'S', x - c * w * 0.3, y - s * w * 0.3 + 0.1, h * 0.55, '#0b1a33', 'center', 900, SANS, a); }
  }
  function battery(g, x, y, a) {
    if (a <= 0.003) return;
    ln(g, x - 0.9, y - 2.4, x - 0.9, y + 2.4, FG, 0.35, null, a); ln(g, x + 0.9, y - 1.3, x + 0.9, y + 1.3, FG, 0.6, null, a);
    tx(g, '+', x - 2.4, y - 2.6, 1.6, NRED, 'center', 800, SANS, a); tx(g, '电池', x, y + 4, 1.7, DIM, 'center', 700, SANS, a);
  }
  // wire along a polyline; optional moving current dots (k = 0..1 strength)
  function wire(g, P, a, k, lt, col) {
    if (a <= 0.003) return;
    var i; g.save(); g.globalAlpha *= a; g.strokeStyle = col || WIRE; g.lineWidth = 0.3; g.lineJoin = 'round'; g.beginPath(); g.moveTo(P[0][0], P[0][1]);
    for (i = 1; i < P.length; i++) g.lineTo(P[i][0], P[i][1]); g.stroke(); g.restore();
    if (!k || k < 0.02) return;
    var L = [0], tot = 0; for (i = 1; i < P.length; i++) { tot += Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]); L.push(tot); }
    var sp = 3.2, n = Math.floor(tot / 2.6);
    for (var m = 0; m < n; m++) {
      var s = ((m * 2.6 + lt * sp * Math.sign(k)) % tot + tot) % tot, j = 1; while (j < L.length - 1 && L[j] < s) j++;
      var f = (s - L[j - 1]) / Math.max(1e-6, L[j] - L[j - 1]), px = mix(P[j - 1][0], P[j][0], f), py = mix(P[j - 1][1], P[j][1], f);
      dot(g, px, py, 0.32, '#ffe1a8', a * Math.min(1, Math.abs(k))); glow(g, px, py, 1.1, 'rgba(255,210,140,0.9)', 0.3 * a * Math.min(1, Math.abs(k)));
    }
  }
  function compass(g, x, y, r, ang, a) {
    if (a <= 0.003) return;
    ring(g, x, y, r, 'rgba(238,242,248,0.55)', 0.2, a); dot(g, x, y, r * 0.95, 'rgba(14,18,28,0.6)', a);
    g.save(); g.globalAlpha *= a; g.translate(x, y); g.rotate(ang);
    g.fillStyle = NRED; g.beginPath(); g.moveTo(0, -r * 0.82); g.lineTo(r * 0.16, 0); g.lineTo(-r * 0.16, 0); g.closePath(); g.fill();
    g.fillStyle = '#d7dde8'; g.beginPath(); g.moveTo(0, r * 0.82); g.lineTo(r * 0.16, 0); g.lineTo(-r * 0.16, 0); g.closePath(); g.fill();
    g.restore(); dot(g, x, y, r * 0.08, FG, a);
  }
  // generic head-and-shoulders silhouette (not a likeness)
  function bust(g, x, y, s, a, col, flip) {
    if (a <= 0.003) return;
    g.save(); g.globalAlpha *= a; g.fillStyle = col || 'rgba(214,224,240,0.85)'; g.translate(x, y); if (flip) g.scale(-1, 1);
    g.beginPath(); g.ellipse(0, -3.2 * s, 1.9 * s, 2.3 * s, 0, 0, TAU); g.fill();
    g.beginPath(); g.moveTo(-4.2 * s, 3.4 * s); g.quadraticCurveTo(-4 * s, -0.4 * s, 0, -0.6 * s); g.quadraticCurveTo(4 * s, -0.4 * s, 4.2 * s, 3.4 * s); g.closePath(); g.fill();
    g.restore();
  }
  function frameBox(g, x, y, w, h, a) { rbox(g, x - w / 2, y - h / 2, w, h, 0.4, 'rgba(242,198,107,0.8)', 0.45, 'rgba(20,16,12,0.7)', a); rbox(g, x - w / 2 + 0.9, y - h / 2 + 0.9, w - 1.8, h - 1.8, 0.2, 'rgba(242,198,107,0.35)', 0.15, null, a); }
  function bookShape(g, x, y, w, h, col, a, title) {
    rbox(g, x - w / 2, y - h / 2, w, h, 0.4, 'rgba(255,255,255,0.3)', 0.15, col, a);
    ln(g, x - w / 2 + 0.8, y - h / 2 + 0.3, x - w / 2 + 0.8, y + h / 2 - 0.3, 'rgba(0,0,0,0.35)', 0.3, null, a);
    if (title) tx(g, title, x + 0.3, y, Math.min(2.0, w * 0.16), '#f6e6bd', 'center', 800, SANS, a);
  }
  function cityLights(g, a, lt, x0, x1, y0, y1, seed) {
    if (a <= 0.01) return;
    var r = rng(seed || 3), i;
    for (i = 0; i < 160; i++) {
      var u = r(), v = r(), x = mix(x0, x1, u), y = mix(y0, y1, Math.pow(v, 0.7)), d = Math.hypot(u - 0.5, v - 0.6);
      var on = clamp(a * 1.6 - d * 1.2);
      if (on <= 0.01) continue;
      var tw = 0.7 + 0.3 * Math.sin(lt * 3 + i);
      glow(g, x, y, 0.9 + v * 0.8, 'rgba(255,200,120,0.9)', 0.35 * on * tw); dot(g, x, y, 0.16 + v * 0.18, '#ffe2b0', on * tw);
    }
  }
  // magnetic dipole field (two poles) — direction at a point
  function dipB(x, y, nx, ny, sx, sy) {
    var dx1 = x - nx, dy1 = y - ny, r1 = Math.pow(dx1 * dx1 + dy1 * dy1, 1.5) + 1e-6;
    var dx2 = x - sx, dy2 = y - sy, r2 = Math.pow(dx2 * dx2 + dy2 * dy2, 1.5) + 1e-6;
    return [dx1 / r1 - dx2 / r2, dy1 / r1 - dy2 / r2];
  }
  function traceLines(nx, ny, sx, sy, n, box) {
    var out = [], i, k;
    for (i = 0; i < n; i++) {
      var an = (i + 0.5) / n * TAU, x = nx + Math.cos(an) * 0.9, y = ny + Math.sin(an) * 0.9, P = [[x, y]];
      for (k = 0; k < 900; k++) {
        var b = dipB(x, y, nx, ny, sx, sy), m = Math.hypot(b[0], b[1]) || 1;
        x += b[0] / m * 0.35; y += b[1] / m * 0.35; P.push([x, y]);
        if (Math.hypot(x - sx, y - sy) < 0.8 || x < box[0] || x > box[1] || y < box[2] || y > box[3]) break;
      }
      out.push(P);
    }
    return out;
  }
  function drawPath(g, P, col, w, a, frac) {
    if (a <= 0.003) return;
    var n = Math.max(2, Math.floor(P.length * (frac == null ? 1 : frac)));
    g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = w; g.beginPath(); g.moveTo(P[0][0], P[0][1]);
    for (var i = 1; i < n; i++) g.lineTo(P[i][0], P[i][1]); g.stroke(); g.restore();
  }
  function typeOn(g, s, x, y, sz, col, lt, t0, cps, al, wt, fam) {
    var n = Math.floor(clamp((lt - t0) * cps / s.length) * s.length);
    if (n <= 0) return; tx(g, s.slice(0, n), x, y, sz, col, al || 'center', wt || 800, fam || SANS, 1);
  }
  function bigX(g, x, y, s, a) { ln(g, x - s, y - s, x + s, y + s, RED, 0.7, null, a); ln(g, x + s, y - s, x - s, y + s, RED, 0.7, null, a); }
