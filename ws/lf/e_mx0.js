  // ================= Maxwell: shared helpers =================
  var MX_COL = '#bcc6f4', MX_NAME = '#c9b8ff', EC = '#ff9d6e', BC = '#8fd0ff';     // E field warm, B field cold
  function mxYoung(g, x, yb, h, a, o, lt) { o = o || {}; o.col = MX_COL; if (o.name === undefined) o.name = '麦克斯韦'; o.nameCol = MX_NAME; faraday(g, x, yb, h, a, o, lt); }
  function mxOld(g, x, yb, h, a, o, lt) { o = o || {}; o.col = MX_COL; o.beard = true; if (o.name === undefined) o.name = '麦克斯韦'; o.nameCol = MX_NAME; faraday(g, x, yb, h, a, o, lt); }
  function katherine(g, x, yb, h, a, o, lt) { o = o || {}; o.col = '#f0c8d8'; o.dress = true; o.longHair = true; if (o.name === undefined) o.name = '凯瑟琳'; o.nameCol = '#f6a8c8'; faraday(g, x, yb, h, a, o, lt); }
  function hertz(g, x, yb, h, a, o, lt) { o = o || {}; o.col = '#bfe3c6'; o.moustache = true; if (o.name === undefined) o.name = '赫兹'; o.nameCol = '#7fe0a0'; faraday(g, x, yb, h, a, o, lt); }
  function extra(g, x, yb, h, a, o, lt) { o = o || {}; o.col = o.col || '#8e97a8'; if (o.name === undefined) o.name = ''; faraday(g, x, yb, h, a, o, lt); }
  // oblique 3D: X to the right, Y up, Z into the screen (drawn up and to the right)
  function P3(ox, oy, X, Y, Z) { return [ox + X + Z * 0.5, oy - Y - Z * 0.32]; }
  function seg3(g, ox, oy, A, B, col, w, a) { var p = P3(ox, oy, A[0], A[1], A[2]), q = P3(ox, oy, B[0], B[1], B[2]); ln(g, p[0], p[1], q[0], q[1], col, w, null, a); }
  function poly3(g, ox, oy, pts, fill, stroke, w, a) {
    if (a <= 0.003) return; g.save(); g.globalAlpha *= a; g.beginPath();
    pts.forEach(function (q, k) { var p = P3(ox, oy, q[0], q[1], q[2]); if (k === 0) g.moveTo(p[0], p[1]); else g.lineTo(p[0], p[1]); }); g.closePath();
    if (fill) { g.fillStyle = fill; g.fill(); } if (stroke) { g.strokeStyle = stroke; g.lineWidth = w || 0.15; g.stroke(); } g.restore();
  }
  // a ring around an axis: axis 'x' (ring in Y-Z plane) or 'y' (ring in X-Z plane); part 'back' | 'front' | undefined
  function ring3(g, ox, oy, c, r, axis, col, w, a, part, dashOff) {
    if (a <= 0.003) return; g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = w; if (dashOff != null) { g.setLineDash([1.1, 0.8]); g.lineDashOffset = dashOff; }
    g.beginPath(); var first = true;
    for (var k = 0; k <= 48; k++) {
      var t = k / 48 * TAU, u = Math.cos(t) * r, v = Math.sin(t) * r, X = c[0], Y = c[1], Z = c[2];
      if (axis === 'x') { Y += u; Z += v; } else if (axis === 'z') { X += u; Y += v; } else { X += u; Z += v; }
      var back = axis === 'z' ? false : v > 0;
      if (part === 'back' && !back || part === 'front' && back) { first = true; continue; }
      var p = P3(ox, oy, X, Y, Z); if (first) { g.moveTo(p[0], p[1]); first = false; } else g.lineTo(p[0], p[1]);
    }
    g.stroke(); g.restore();
  }
  // a little arrow running round a ring3, to show the sense of circulation
  function ring3Arrow(g, ox, oy, c, r, axis, t, col, a) {
    var u = Math.cos(t) * r, v = Math.sin(t) * r, u2 = Math.cos(t + 0.15) * r, v2 = Math.sin(t + 0.15) * r;
    var A = axis === 'x' ? [c[0], c[1] + u, c[2] + v] : axis === 'z' ? [c[0] + u, c[1] + v, c[2]] : [c[0] + u, c[1], c[2] + v], B = axis === 'x' ? [c[0], c[1] + u2, c[2] + v2] : axis === 'z' ? [c[0] + u2, c[1] + v2, c[2]] : [c[0] + u2, c[1], c[2] + v2];
    var p = P3(ox, oy, A[0], A[1], A[2]), q = P3(ox, oy, B[0], B[1], B[2]); arrowHead(g, q[0], q[1], Math.atan2(q[1] - p[1], q[0] - p[0]), 0.8, col, a);
  }
  function phone(g, x, y, s, a, lt) {
    if (a <= 0.003) return;
    rbox(g, x - 3.2 * s, y - 6 * s, 6.4 * s, 12 * s, 1 * s, 'rgba(220,230,245,0.8)', 0.25, '#11151f', a);
    rbox(g, x - 2.7 * s, y - 5.1 * s, 5.4 * s, 9.8 * s, 0.5 * s, null, 0, 'rgba(90,140,220,' + (0.55 + 0.1 * Math.sin(lt * 2)) + ')', a);
    g.save(); g.globalAlpha *= a; g.fillStyle = '#fff'; g.beginPath(); g.moveTo(x - 0.8 * s, y - 1.6 * s); g.lineTo(x + 1.2 * s, y - 0.2 * s); g.lineTo(x - 0.8 * s, y + 1.2 * s); g.closePath(); g.fill(); g.restore();
  }
  function tower(g, x, yb, h, a) {
    if (a <= 0.003) return;
    ln(g, x, yb, x - h * 0.22, yb, FG, 0.2, null, 0); ln(g, x - h * 0.2, yb, x, yb - h, '#9aa7ba', 0.35, null, a); ln(g, x + h * 0.2, yb, x, yb - h, '#9aa7ba', 0.35, null, a);
    for (var i = 1; i < 4; i++) { var yy = yb - h * i / 4, w = h * 0.2 * (1 - i / 4); ln(g, x - w, yy, x + w, yy, '#9aa7ba', 0.2, null, a); }
    dot(g, x, yb - h, 0.6, NRED, a);
  }
  function waveArcs(g, x, y, lt, a, col, n, maxR, ang0, ang1, spd) {
    for (var i = 0; i < (n || 4); i++) { var r = ((lt * (spd || 6) + i * (maxR || 20) / (n || 4)) % (maxR || 20)); arcl(g, x, y, r, ang0 == null ? -0.6 : ang0, ang1 == null ? 0.6 : ang1, col || ICE, 0.3, a * (1 - r / (maxR || 20))); }
  }
  function demon(g, x, y, s, a, lt) {
    if (a <= 0.003) return;
    g.save(); g.globalAlpha *= a; g.translate(x, y); g.scale(s, s);
    g.fillStyle = '#b48cff'; g.beginPath(); g.ellipse(0, 0, 2.2, 2.6, 0, 0, TAU); g.fill();
    g.beginPath(); g.moveTo(-1.6, -1.8); g.lineTo(-2.2, -3.6); g.lineTo(-0.8, -2.3); g.closePath(); g.fill(); g.beginPath(); g.moveTo(1.6, -1.8); g.lineTo(2.2, -3.6); g.lineTo(0.8, -2.3); g.closePath(); g.fill();
    g.strokeStyle = '#b48cff'; g.lineWidth = 0.35; g.beginPath(); g.moveTo(1.8, 1.4); g.quadraticCurveTo(3.6, 2.4, 3.2, 0.4); g.stroke();
    g.fillStyle = '#fff'; g.beginPath(); g.arc(-0.8, -0.5, 0.55, 0, TAU); g.arc(0.8, -0.5, 0.55, 0, TAU); g.fill();
    g.fillStyle = '#1a1030'; var bl = Math.sin(lt * 0.9) > 0.97 ? 0.1 : 1; g.beginPath(); g.ellipse(-0.75, -0.45, 0.25, 0.25 * bl, 0, 0, TAU); g.ellipse(0.85, -0.45, 0.25, 0.25 * bl, 0, 0, TAU); g.fill();
    g.restore();
  }
  function speedCol(v) { var k = clamp(v); return 'rgb(' + Math.round(mix(110, 255, k)) + ',' + Math.round(mix(170, 120, k)) + ',' + Math.round(mix(255, 90, k)) + ')'; }
  function saturnBall(g, x, y, r, a) {
    if (a <= 0.003) return;
    g.save(); g.globalAlpha *= a; var sg = g.createRadialGradient(x - r * 0.35, y - r * 0.4, r * 0.1, x, y, r); sg.addColorStop(0, '#f6e2b0'); sg.addColorStop(0.7, '#c9a36a'); sg.addColorStop(1, '#7a5d36');
    g.fillStyle = sg; g.beginPath(); g.arc(x, y, r, 0, TAU); g.fill();
    g.globalAlpha *= 0.25; g.strokeStyle = '#8a6a40'; g.lineWidth = r * 0.12; for (var i = -2; i <= 2; i++) { g.beginPath(); g.ellipse(x, y + i * r * 0.3, r * Math.sqrt(1 - Math.pow(i * 0.3, 2)), r * 0.08, 0, 0, Math.PI); g.stroke(); }
    g.restore();
  }
  function counterNum(n) { var s = String(Math.round(n)); return s.replace(/\B(?=(\d{3})+(?!\d))/g, ' '); }
