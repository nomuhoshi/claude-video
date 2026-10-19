  // ================= Faraday biography: drawing kit =================
  var CU = '#e8935a', CUD = '#a85a2e', IRON = '#8d97a8', NRED = '#ff6b6b', SBLU = '#6fa8ff', WIRE = 'rgba(232,147,90,0.85)';
  function pulse(lt, t0, tau) { return lt < t0 ? 0 : Math.exp(-(lt - t0) / (tau || 0.35)); }
  // a horizontal coil centred at (cx, cy), w long, h tall
  // part: undefined = whole coil, 'back' = the far half of every turn (draw the magnet after it), 'front' = the near half
  function coil(g, cx, cy, w, h, n, a, glowK, part) {
    if (a <= 0.003) return;
    var i, x0 = cx - w / 2, dx = w / (n - 1);
    g.save(); g.globalAlpha *= a; g.lineCap = 'round';
    if (part !== 'front') {
      g.fillStyle = 'rgba(232,147,90,0.07)'; g.fillRect(x0, cy - h / 2, w, h);
      for (i = 0; i < n; i++) { g.strokeStyle = CUD; g.lineWidth = 0.55; g.beginPath(); g.ellipse(x0 + i * dx, cy, h * 0.16, h / 2, 0, Math.PI * 0.5, Math.PI * 1.5); g.stroke(); }
    }
    if (part !== 'back') for (i = 0; i < n; i++) { g.strokeStyle = CU; g.lineWidth = 0.6; g.beginPath(); g.ellipse(x0 + i * dx, cy, h * 0.16, h / 2, 0, -Math.PI * 0.5, Math.PI * 0.5); g.stroke(); }
    g.restore();
    if (glowK && part !== 'back') glow(g, cx, cy, w * 0.7, 'rgba(255,180,90,0.9)', 0.25 * glowK * a);
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
  function rgb(c, a) { return 'rgba(' + Math.round(c[0]) + ',' + Math.round(c[1]) + ',' + Math.round(c[2]) + ',' + (a == null ? 1 : a) + ')'; }
  function isoBlock(g, cx, ty, hw, h, p, a, glowTop) {
    if (a <= 0.003) return;
    var hd = hw * 0.5;
    g.save(); g.globalAlpha *= a;
    g.fillStyle = rgb(p.s2); g.beginPath(); g.moveTo(cx - hw, ty); g.lineTo(cx, ty + hd); g.lineTo(cx, ty + hd + h); g.lineTo(cx - hw, ty + h); g.closePath(); g.fill();
    g.fillStyle = rgb(p.s3); g.beginPath(); g.moveTo(cx, ty + hd); g.lineTo(cx + hw, ty); g.lineTo(cx + hw, ty + h); g.lineTo(cx, ty + hd + h); g.closePath(); g.fill();
    g.fillStyle = rgb(p.s1); g.beginPath(); g.moveTo(cx, ty - hd); g.lineTo(cx + hw, ty); g.lineTo(cx, ty + hd); g.lineTo(cx - hw, ty); g.closePath(); g.fill();
    if (glowTop) { g.strokeStyle = 'rgba(255,255,255,0.35)'; g.lineWidth = 0.15; g.stroke(); }
    g.restore();
  }
  // ---- the little Faraday: a soft pale silhouette (design C) ----
  // x = centre, yb = feet, h = height in canvas units; o: { pose: 'down'|'candle'|'forward'|'book'|'push'|'up', prop: 'candle'|'book'|'case'|null, walk: phase or null, flip }
  var FD_COL = '#d6dfee';
  function faraday(g, x, yb, h, a, o, lt) {
    if (a <= 0.003) return;
    o = o || {}; var k = h / 330, i;
    var bob = o.walk != null ? Math.abs(Math.sin(o.walk)) * 4 : 0;
    halo(g, x, yb - h * 0.5, h * 0.75, 'rgba(143,208,255,0.9)', 0.12 * a);
    g.save(); g.globalAlpha *= a; g.translate(x, yb); g.scale(o.flip ? -k : k, k); g.translate(0, -bob);
    var COL = o.col || FD_COL; g.fillStyle = COL; g.strokeStyle = COL; g.lineCap = 'round'; g.lineJoin = 'round';
    // legs
    if (o.dress) { g.beginPath(); g.moveTo(-60, -120); g.lineTo(60, -120); g.lineTo(96, -4); g.lineTo(-96, -4); g.closePath(); g.fill(); }
    else if (o.walk != null) {
      var sw = Math.sin(o.walk) * 26; g.lineWidth = 22;
      g.beginPath(); g.moveTo(-18, -56); g.lineTo(-18 + sw, -2 + bob); g.moveTo(18, -56); g.lineTo(18 - sw, -2 + bob); g.stroke();
    } else { g.fillRect(-34, -56, 22, 56); g.fillRect(12, -56, 22, 56); }
    // coat
    g.beginPath(); g.moveTo(-58, -178); g.quadraticCurveTo(-78, -170, -80, -120); g.lineTo(-86, -40); g.lineTo(-30, -48); g.lineTo(0, -120); g.lineTo(30, -48); g.lineTo(86, -40); g.lineTo(80, -120); g.quadraticCurveTo(78, -170, 58, -178); g.closePath(); g.fill();
    // head and hair
    g.beginPath(); g.ellipse(0, -246, 62, 68, 0, 0, TAU); g.fill();
    if (o.curl) { for (i = 0; i < 7; i++) { g.beginPath(); g.arc(-54 + i * 18, -300 - Math.sin(i * 1.3) * 8 - (i > 0 && i < 6 ? 14 : 0), 22, 0, TAU); g.fill(); } }
    if (o.stout) { g.beginPath(); g.ellipse(0, -112, 92, 70, 0, 0, TAU); g.fill(); }
    g.beginPath(); g.moveTo(-66, -262); g.quadraticCurveTo(-70, -318, -10, -326); g.quadraticCurveTo(52, -332, 70, -282); g.quadraticCurveTo(74, -262, 66, -250); g.quadraticCurveTo(40, -292, -14, -288); g.quadraticCurveTo(-40, -286, -56, -246); g.closePath(); g.fill();
    if (o.beard) { g.beginPath(); g.ellipse(0, -212, 54, 44, 0, 0, Math.PI); g.fill(); g.beginPath(); g.moveTo(-56, -232); g.quadraticCurveTo(-60, -180, 0, -168); g.quadraticCurveTo(60, -180, 56, -232); g.closePath(); g.fill(); }
    if (o.hat) { g.fillRect(-50, -330, 100, 14); g.fillRect(-36, -400, 72, 74); }
    if (o.longHair) { g.beginPath(); g.moveTo(-66, -270); g.quadraticCurveTo(-92, -200, -70, -150); g.lineTo(-40, -150); g.lineTo(-52, -250); g.closePath(); g.fill(); g.beginPath(); g.moveTo(66, -270); g.quadraticCurveTo(92, -200, 70, -150); g.lineTo(40, -150); g.lineTo(52, -250); g.closePath(); g.fill(); }
    if (o.moustache) { g.fillStyle = 'rgba(40,60,50,0.35)'; g.beginPath(); g.ellipse(0, -222, 24, 6, 0, 0, TAU); g.fill(); g.fillStyle = COL; }
    // arms
    g.lineWidth = 24; var pose = o.pose || 'down';
    var aw = o.walk != null ? Math.sin(o.walk) * 18 : 0;
    g.beginPath(); g.moveTo(-70, -160);
    if (pose === 'book') { g.lineTo(-62, -112); g.lineTo(-14, -120); } else g.lineTo(-92 - aw, -96);
    g.moveTo(70, -160);
    if (o.armR != null) { g.lineTo(70 + Math.cos(o.armR) * 110, -160 + Math.sin(o.armR) * 110); }
    else if (pose === 'candle' || pose === 'up') { g.lineTo(98, -150); g.lineTo(112, -196); }
    else if (pose === 'forward') { g.lineTo(140, -150); }
    else if (pose === 'push') { g.lineTo(120, -140); g.lineTo(150, -140); }
    else if (pose === 'book') { g.lineTo(62, -112); g.lineTo(14, -120); }
    else g.lineTo(92 + aw, -96);
    g.stroke();
    if (o.apron) { g.fillStyle = '#5a3e2a'; g.beginPath(); g.moveTo(-44, -150); g.lineTo(44, -150); g.lineTo(58, -40); g.lineTo(-58, -40); g.closePath(); g.fill(); g.fillStyle = COL; }
    if (o.armR != null && o.tool === 'hammer') {   // handle continues the arm; the head sits across its end
      var ca = Math.cos(o.armR), sa = Math.sin(o.armR), hx0 = 70 + ca * 100, hy0 = -160 + sa * 100, hx1 = 70 + ca * 200, hy1 = -160 + sa * 200;
      g.strokeStyle = '#8a5f34'; g.lineWidth = 12; g.beginPath(); g.moveTo(hx0, hy0); g.lineTo(hx1, hy1); g.stroke();
      g.save(); g.translate(hx1, hy1); g.rotate(o.armR); g.fillStyle = '#9aa7ba'; g.fillRect(-22, -36, 44, 72); g.fillStyle = '#c9d2de'; g.fillRect(-22, -36, 44, 10); g.restore();
      g.strokeStyle = COL; g.lineWidth = 24;
    }
    // collar notch (cuts back to the night)
    g.fillStyle = '#0b0f18'; g.beginPath(); g.moveTo(-22, -180); g.lineTo(22, -180); g.lineTo(0, -140); g.closePath(); g.fill();
    // props
    if (o.prop === 'candle') {
      g.fillStyle = '#f4ecd8'; g.fillRect(104, -246, 16, 44);
      g.fillStyle = '#ffd27a'; g.beginPath(); g.moveTo(112, -284 + Math.sin((lt || 0) * 11) * 2); g.quadraticCurveTo(124, -262, 112, -250); g.quadraticCurveTo(100, -262, 112, -284); g.fill();
    } else if (o.prop === 'book') {
      g.fillStyle = '#7a4a2e'; g.fillRect(-46, -150, 92, 60); g.fillStyle = '#efe6d2'; g.fillRect(-40, -146, 80, 6);
    } else if (o.prop === 'case') {
      g.fillStyle = '#6b4a2e'; g.fillRect(-122, -84, 56, 40); g.strokeStyle = '#6b4a2e'; g.lineWidth = 6; g.beginPath(); g.moveTo(-104, -84); g.lineTo(-104, -96); g.lineTo(-86, -96); g.lineTo(-86, -84); g.stroke();
    }
    g.restore();
    if (o.name) tx(g, o.name, x, yb - h - (o.hat ? h * 0.22 : 0) - 1.9, Math.max(1.6, h * 0.11), o.nameCol || (o.col ? GOLD : ICE), 'center', 800, SANS, a);
    if (o.prop === 'candle') glow(g, x + (o.flip ? -1 : 1) * 112 * k, yb - 262 * k, 26 * k * 3, 'rgba(255,190,100,0.9)', 0.5 * a);
  }
  var DV_COL = '#e7cfa2';
  function davy(g, x, yb, h, a, o, lt) { o = o || {}; o.col = DV_COL; o.curl = true; o.stout = true; if (o.name === undefined) o.name = '戴维'; o.nameCol = '#f2c66b'; faraday(g, x, yb, h, a, o, lt); }
  function maxwell(g, x, yb, h, a, o, lt) { o = o || {}; o.col = '#bcc6f4'; o.beard = true; if (o.name === undefined) o.name = '麦克斯韦'; o.nameCol = '#c9b8ff'; faraday(g, x, yb, h, a, o, lt); }
  function wheatstone(g, x, yb, h, a, o, lt) { o = o || {}; o.col = '#a7afbd'; o.hat = true; if (o.name === undefined) o.name = '惠斯通'; o.nameCol = '#cfd6e2'; faraday(g, x, yb, h, a, o, lt); }
