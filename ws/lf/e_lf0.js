  // ================= Lifespan video: shared helpers =================
  var OLD = '#8a93a3', YOUNG = '#f2c66b', INF = '#ff6b6b', CELLC = 'rgba(143,208,255,0.85)';
  function person2(g, x, yb, h, a, o, lt) { o = o || {}; o.col = o.col || '#c9d3e3'; if (o.name === undefined) o.name = ''; faraday(g, x, yb, h, a, o, lt); }
  // a halftone disk: dots on a hex grid inside a circle; colFn(u, v) -> [r,g,b,alpha, radiusScale]
  function dotDisk(g, cx, cy, R, step, colFn, a) {
    if (a <= 0.003) return;
    g.save(); g.globalAlpha *= a;
    for (var y = -R; y <= R; y += step * 0.87) {
      var row = Math.round(y / (step * 0.87));
      for (var x = -R; x <= R; x += step) {
        var xx = x + (row % 2 ? step / 2 : 0);
        var d = Math.hypot(xx, y); if (d > R) continue;
        var c = colFn(xx / R, y / R, d / R); if (!c || c[3] <= 0.01) continue;
        g.fillStyle = 'rgba(' + Math.round(c[0]) + ',' + Math.round(c[1]) + ',' + Math.round(c[2]) + ',' + c[3].toFixed(3) + ')';
        g.beginPath(); g.arc(cx + xx, cy + y, step * 0.36 * (c[4] == null ? 1 : c[4]), 0, TAU); g.fill();
      }
    }
    g.restore();
  }
  // a simple cell: soft membrane, a nucleus, optional wobble
  function cell(g, x, y, r, a, o) {
    if (a <= 0.003) return; o = o || {};
    var col = o.col || CELLC, fill = o.fill || 'rgba(40,70,110,0.35)', lt = o.lt || 0, wob = o.wob == null ? 0.04 : o.wob;
    g.save(); g.globalAlpha *= a; g.beginPath();
    for (var k = 0; k <= 40; k++) {
      var t = k / 40 * TAU, rr = r * (1 + wob * Math.sin(t * 3 + lt * 1.3 + (o.seed || 0)) + wob * 0.6 * Math.sin(t * 5 - lt * 0.9));
      var px = x + Math.cos(t) * rr * (o.sx || 1), py = y + Math.sin(t) * rr * (o.sy || 1);
      if (k === 0) g.moveTo(px, py); else g.lineTo(px, py);
    }
    g.closePath(); g.fillStyle = fill; g.fill(); g.strokeStyle = col; g.lineWidth = o.lw || 0.3; g.stroke();
    if (o.nuc !== false) { g.beginPath(); g.ellipse(x + r * 0.12, y - r * 0.05, r * 0.36, r * 0.3, 0.3, 0, TAU); g.fillStyle = o.nucCol || 'rgba(143,208,255,0.35)'; g.fill(); g.strokeStyle = col; g.lineWidth = 0.18; g.stroke(); }
    g.restore();
  }
  // horizontal DNA double helix from x0 to x1 at y; gap = [gx, gw] leaves a break; marks = function(i) -> colour for a tag on rung i
  function helix(g, x0, x1, y, amp, lt, a, o) {
    if (a <= 0.003) return; o = o || {};
    var n = Math.max(8, Math.round((x1 - x0) / 0.5)), ph = (o.ph || 0) + lt * (o.spin == null ? 1.2 : o.spin), i, k;
    var c1 = o.c1 || '#8fd0ff', c2 = o.c2 || '#c9b8ff', rung = Math.round((x1 - x0) / 1.6);
    g.save(); g.globalAlpha *= a; g.lineCap = 'round';
    for (k = 0; k <= rung; k++) {
      var xr = mix(x0, x1, k / rung); if (o.gap && Math.abs(xr - o.gap[0]) < o.gap[1]) continue;
      var s = Math.sin((xr - x0) * 0.55 + ph);
      ln(g, xr, y + s * amp, xr, y - s * amp, 'rgba(238,242,248,0.28)', 0.18, null, 1);
      if (o.marks) { var mc = o.marks(k, xr); if (mc) dot(g, xr, y - Math.abs(s) * amp - 0.9, 0.42, mc, 1); }
    }
    [[c1, 0], [c2, Math.PI]].forEach(function (st) {
      g.strokeStyle = st[0]; g.lineWidth = o.w || 0.42; g.beginPath(); var first = true;
      for (i = 0; i <= n; i++) {
        var x = mix(x0, x1, i / n); if (o.gap && Math.abs(x - o.gap[0]) < o.gap[1]) { first = true; continue; }
        var yy = y + Math.sin((x - x0) * 0.55 + ph + st[1]) * amp;
        if (first) { g.moveTo(x, yy); first = false; } else g.lineTo(x, yy);
      }
      g.stroke();
    });
    g.restore();
  }
  function axes(g, x0, y0, w, h, a, xl, yl, col) {
    if (a <= 0.003) return; col = col || 'rgba(238,242,248,0.55)';
    ln(g, x0, y0, x0 + w * eo(clamp(a * 1.4)), y0, col, 0.22, null, a); ln(g, x0, y0, x0, y0 - h * eo(clamp(a * 1.4)), col, 0.22, null, a);
    if (xl) tx(g, xl, x0 + w + 1, y0, 1.6, DIM, 'left', 700, SANS, a);
    if (yl) tx(g, yl, x0 - 0.6, y0 - h - 1.6, 1.6, DIM, 'left', 700, SANS, a);
  }
  function polyline(g, P, col, w, a, frac, dash) {
    if (a <= 0.003 || P.length < 2) return;
    var n = P.length - 1, upto = n * clamp(frac == null ? 1 : frac), k = Math.floor(upto), f = upto - k;
    g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = w; if (dash) g.setLineDash(dash); g.beginPath(); g.moveTo(P[0][0], P[0][1]);
    for (var i = 1; i <= k; i++) g.lineTo(P[i][0], P[i][1]);
    if (k < n) g.lineTo(mix(P[k][0], P[k + 1][0], f), mix(P[k][1], P[k + 1][1], f));
    g.stroke(); g.restore();
  }
  function capsule(g, x, y, s, a, c1, c2) {
    if (a <= 0.003) return;
    g.save(); g.globalAlpha *= a; g.translate(x, y); g.rotate(-0.5);
    g.fillStyle = c1 || '#f2c66b'; g.beginPath(); if (g.roundRect) g.roundRect(-2.2 * s, -0.9 * s, 2.2 * s, 1.8 * s, [0.9 * s, 0, 0, 0.9 * s]); else g.rect(-2.2 * s, -0.9 * s, 2.2 * s, 1.8 * s); g.fill();
    g.fillStyle = c2 || '#eef2f8'; g.beginPath(); if (g.roundRect) g.roundRect(0, -0.9 * s, 2.2 * s, 1.8 * s, [0, 0.9 * s, 0.9 * s, 0]); else g.rect(0, -0.9 * s, 2.2 * s, 1.8 * s); g.fill();
    g.restore();
  }
  // ---- animal silhouettes (x = centre, yb = ground / waterline, s = scale; about 10*s long) ----
  function shapeFill(g, a, col, fn) { if (a <= 0.003) return; g.save(); g.globalAlpha *= a; g.fillStyle = col; g.strokeStyle = col; fn(); g.restore(); }
  function mouseS(g, x, yb, s, a, col, flip, lt) {
    shapeFill(g, a, col || '#b9c3d3', function () {
      g.translate(x, yb); if (flip) g.scale(-1, 1);
      g.beginPath(); g.ellipse(0, -1.4 * s, 2.6 * s, 1.4 * s, 0, 0, TAU); g.fill();
      g.beginPath(); g.moveTo(1.8 * s, -2.2 * s); g.quadraticCurveTo(3.8 * s, -2.0 * s, 4.1 * s, -1.0 * s); g.lineTo(1.8 * s, -0.6 * s); g.closePath(); g.fill();
      g.beginPath(); g.arc(2.0 * s, -2.6 * s, 0.75 * s, 0, TAU); g.fill();
      g.lineWidth = 0.25 * s; g.beginPath(); g.moveTo(-2.4 * s, -1.0 * s); g.quadraticCurveTo(-4.5 * s, -0.2 * s, -5.6 * s, -1.6 * s + Math.sin((lt || 0) * 3) * 0.3 * s); g.stroke();
      g.fillStyle = '#0b0f18'; g.beginPath(); g.arc(3.0 * s, -1.75 * s, 0.22 * s, 0, TAU); g.fill();
    });
  }
  function dogS(g, x, yb, s, a, col, flip, lt) {
    shapeFill(g, a, col || '#d8c39a', function () {
      g.translate(x, yb); if (flip) g.scale(-1, 1);
      g.beginPath(); g.ellipse(0, -4.2 * s, 3.6 * s, 1.7 * s, 0, 0, TAU); g.fill();
      g.lineWidth = 0.8 * s; g.lineCap = 'round';
      [[-2.6, 0.2], [-1.6, -0.2], [2.0, 0.2], [2.9, -0.2]].forEach(function (L) { g.beginPath(); g.moveTo(L[0] * s, -3.6 * s); g.lineTo((L[0] + L[1]) * s, 0); g.stroke(); });
      g.beginPath(); g.moveTo(-3.4 * s, -4.8 * s); g.quadraticCurveTo(-5.0 * s, -6.6 * s + Math.sin((lt || 0) * 6) * 0.5 * s, -5.4 * s, -7.0 * s); g.stroke();
      g.beginPath(); g.ellipse(4.0 * s, -6.2 * s, 1.5 * s, 1.25 * s, 0.2, 0, TAU); g.fill();
      g.beginPath(); g.ellipse(5.4 * s, -5.8 * s, 1.0 * s, 0.6 * s, 0.2, 0, TAU); g.fill();
      g.beginPath(); g.ellipse(3.4 * s, -6.6 * s, 0.55 * s, 1.3 * s, 0.4, 0, TAU); g.fillStyle = 'rgba(120,90,60,0.9)'; g.fill();
      g.fillStyle = '#0b0f18'; g.beginPath(); g.arc(4.6 * s, -6.5 * s, 0.22 * s, 0, TAU); g.fill();
    });
  }
  function whaleS(g, x, y, s, a, col, lt) {
    shapeFill(g, a, col || '#6f87a8', function () {
      g.translate(x, y + Math.sin((lt || 0) * 0.8) * 0.3 * s);
      g.beginPath(); g.moveTo(-7 * s, 0); g.quadraticCurveTo(-6 * s, -3.2 * s, 0, -3.0 * s); g.quadraticCurveTo(6.5 * s, -2.8 * s, 7 * s, -0.4 * s); g.quadraticCurveTo(6.5 * s, 2.0 * s, 0, 2.1 * s); g.quadraticCurveTo(-5 * s, 2.0 * s, -7 * s, 0); g.fill();
      var f = Math.sin((lt || 0) * 1.6) * 0.8 * s;
      g.beginPath(); g.moveTo(-6.6 * s, 0); g.lineTo(-9.4 * s, -1.6 * s + f); g.lineTo(-8.6 * s, 0); g.lineTo(-9.4 * s, 1.6 * s + f); g.closePath(); g.fill();
      g.fillStyle = 'rgba(255,255,255,0.18)'; g.beginPath(); g.ellipse(3.5 * s, 1.2 * s, 3 * s, 0.6 * s, 0, 0, TAU); g.fill();
      g.fillStyle = '#0b0f18'; g.beginPath(); g.arc(4.2 * s, -0.4 * s, 0.25 * s, 0, TAU); g.fill();
    });
  }
  function sharkS(g, x, y, s, a, col, lt) {
    shapeFill(g, a, col || '#7f8f9a', function () {
      g.translate(x, y);
      var f = Math.sin((lt || 0) * 1.2) * 0.7 * s;
      g.beginPath(); g.moveTo(-7.5 * s, 0); g.quadraticCurveTo(-3 * s, -2.2 * s, 3 * s, -1.6 * s); g.quadraticCurveTo(6.8 * s, -1.0 * s, 7.4 * s, 0.2 * s); g.quadraticCurveTo(6 * s, 1.4 * s, 2 * s, 1.5 * s); g.quadraticCurveTo(-4 * s, 1.4 * s, -7.5 * s, 0); g.fill();
      g.beginPath(); g.moveTo(-7 * s, 0); g.lineTo(-9.6 * s, -2.4 * s + f); g.lineTo(-8.6 * s, 0.2 * s); g.lineTo(-9.2 * s, 1.6 * s + f); g.closePath(); g.fill();
      g.beginPath(); g.moveTo(-0.5 * s, -1.9 * s); g.lineTo(-1.6 * s, -3.4 * s); g.lineTo(1.4 * s, -1.8 * s); g.closePath(); g.fill();
      g.beginPath(); g.moveTo(1.5 * s, 1.2 * s); g.lineTo(0.4 * s, 2.8 * s); g.lineTo(3.0 * s, 1.3 * s); g.closePath(); g.fill();
      g.fillStyle = '#0b0f18'; g.beginPath(); g.arc(5.4 * s, -0.4 * s, 0.22 * s, 0, TAU); g.fill();
    });
  }
  function moleRatS(g, x, yb, s, a, col, lt) {
    shapeFill(g, a, col || '#e8b4a8', function () {
      g.translate(x, yb);
      g.beginPath(); g.ellipse(0, -1.6 * s, 3.6 * s, 1.6 * s, 0, 0, TAU); g.fill();
      g.beginPath(); g.ellipse(3.4 * s, -1.7 * s, 1.5 * s, 1.15 * s, 0, 0, TAU); g.fill();
      g.fillStyle = '#fff6e0'; g.fillRect(4.5 * s, -1.5 * s, 0.35 * s, 0.9 * s); g.fillRect(4.95 * s, -1.5 * s, 0.35 * s, 0.9 * s);
      g.strokeStyle = 'rgba(160,100,90,0.6)'; g.lineWidth = 0.12 * s; for (var i = 0; i < 4; i++) { g.beginPath(); g.arc(-1.6 * s + i * 1.0 * s, -1.6 * s, 1.2 * s, 1.2, 1.9); g.stroke(); }
      g.fillStyle = '#0b0f18'; g.beginPath(); g.arc(3.9 * s, -2.1 * s, 0.14 * s, 0, TAU); g.fill();
    });
  }
  function pigS(g, x, yb, s, a, col) {
    shapeFill(g, a, col || '#f0b7c4', function () {
      g.translate(x, yb);
      g.beginPath(); g.ellipse(0, -3.6 * s, 3.8 * s, 2.4 * s, 0, 0, TAU); g.fill();
      g.fillRect(-2.6 * s, -2 * s, 0.9 * s, 2 * s); g.fillRect(-1.2 * s, -2 * s, 0.9 * s, 2 * s); g.fillRect(1.4 * s, -2 * s, 0.9 * s, 2 * s); g.fillRect(2.6 * s, -2 * s, 0.9 * s, 2 * s);
      g.beginPath(); g.ellipse(4.0 * s, -4.0 * s, 1.6 * s, 1.5 * s, 0, 0, TAU); g.fill();
      g.beginPath(); g.ellipse(5.5 * s, -3.8 * s, 0.6 * s, 0.75 * s, 0, 0, TAU); g.fillStyle = '#d98ea0'; g.fill();
      g.beginPath(); g.moveTo(3.2 * s, -5.2 * s); g.lineTo(3.8 * s, -6.6 * s); g.lineTo(4.4 * s, -5.3 * s); g.closePath(); g.fillStyle = '#e59db0'; g.fill();
      g.fillStyle = '#0b0f18'; g.beginPath(); g.arc(4.5 * s, -4.5 * s, 0.2 * s, 0, TAU); g.fill();
    });
  }
  function kidney(g, x, y, s, a, col) {
    shapeFill(g, a, col || '#d86a6a', function () {
      g.translate(x, y); g.beginPath();
      g.moveTo(0, -3 * s); g.bezierCurveTo(3.2 * s, -3.2 * s, 3.4 * s, 3.2 * s, 0, 3 * s); g.bezierCurveTo(-1.6 * s, 2.9 * s, -1.2 * s, 1.0 * s, -0.4 * s, 0.6 * s);
      g.bezierCurveTo(0.2 * s, 0.2 * s, 0.2 * s, -0.2 * s, -0.4 * s, -0.6 * s); g.bezierCurveTo(-1.2 * s, -1.0 * s, -1.6 * s, -2.9 * s, 0, -3 * s); g.fill();
      g.fillStyle = 'rgba(255,255,255,0.22)'; g.beginPath(); g.ellipse(1.2 * s, -1.2 * s, 0.8 * s, 1.2 * s, 0.3, 0, TAU); g.fill();
    });
  }
  function eyeIcon(g, x, y, s, a, k, lt) {
    if (a <= 0.003) return;
    g.save(); g.globalAlpha *= a; g.translate(x, y);
    g.beginPath(); g.moveTo(-5 * s, 0); g.quadraticCurveTo(0, -4.2 * s, 5 * s, 0); g.quadraticCurveTo(0, 4.2 * s, -5 * s, 0); g.closePath();
    g.fillStyle = 'rgba(230,236,245,0.9)'; g.fill(); g.strokeStyle = 'rgba(238,242,248,0.8)'; g.lineWidth = 0.2; g.stroke();
    g.save(); g.clip();
    var ir = g.createRadialGradient(0, 0, 0.2 * s, 0, 0, 2.2 * s); ir.addColorStop(0, '#2a1a10'); ir.addColorStop(0.45, mix(0, 1, k) > 0.5 ? '#3f8fd0' : '#4d6a80'); ir.addColorStop(1, '#1a3048');
    g.fillStyle = ir; g.beginPath(); g.arc(0, 0, 2.2 * s, 0, TAU); g.fill();
    g.fillStyle = '#05070c'; g.beginPath(); g.arc(0, 0, 0.9 * s, 0, TAU); g.fill();
    g.fillStyle = 'rgba(255,255,255,0.85)'; g.beginPath(); g.arc(-0.6 * s, -0.7 * s, 0.35 * s, 0, TAU); g.fill();
    g.restore(); g.restore();
    if (k > 0.01) glow(g, x, y, 7 * s, 'rgba(242,198,107,0.9)', 0.4 * k);
  }
  // a brain seen from the side (front to the right): outline, folds, cerebellum, stem; k = glow 0..1
  function brainS(g, cx, cy, s, a, lt, k) {
    if (a <= 0.003) return; k = k == null ? 0.6 : k;
    g.save(); g.globalAlpha *= a; g.translate(cx, cy); g.scale(s, s);
    // stem and cerebellum behind
    g.fillStyle = 'rgba(150,120,110,0.9)'; g.beginPath(); g.moveTo(-1.2, 2.0); g.quadraticCurveTo(-1.0, 4.2, -0.4, 5.6); g.lineTo(0.9, 5.6); g.quadraticCurveTo(0.6, 3.6, 0.8, 2.0); g.closePath(); g.fill();
    g.fillStyle = 'rgba(205,160,150,0.95)'; g.beginPath(); g.ellipse(-3.6, 2.6, 2.4, 1.5, -0.15, 0, TAU); g.fill();
    g.strokeStyle = 'rgba(120,80,80,0.6)'; g.lineWidth = 0.12; for (var i = 0; i < 4; i++) { g.beginPath(); g.ellipse(-3.6, 2.6, 2.2 - i * 0.1, 1.3 - i * 0.28, -0.15, 0.2, Math.PI - 0.2); g.stroke(); }
    // cerebrum
    g.beginPath(); g.moveTo(5.6, 1.4);
    g.bezierCurveTo(6.8, -0.4, 6.4, -3.4, 3.6, -4.4); g.bezierCurveTo(1.6, -5.4, -2.2, -5.4, -4.4, -3.8); g.bezierCurveTo(-6.4, -2.4, -6.6, 0.6, -5.4, 1.6);
    g.bezierCurveTo(-4.2, 2.4, -2.4, 1.6, -1.2, 2.0); g.bezierCurveTo(0.0, 3.0, 2.6, 3.4, 3.8, 2.6); g.bezierCurveTo(4.6, 2.2, 5.0, 2.0, 5.6, 1.4); g.closePath();
    var gr = g.createRadialGradient(1, -1.5, 0.5, 0, 0, 7); gr.addColorStop(0, 'rgba(' + Math.round(mix(235, 255, k)) + ',' + Math.round(mix(190, 214, k)) + ',' + Math.round(mix(185, 140, k)) + ',1)'); gr.addColorStop(1, 'rgba(190,140,140,1)');
    g.fillStyle = gr; g.fill(); g.strokeStyle = 'rgba(120,70,70,0.8)'; g.lineWidth = 0.16; g.stroke();
    g.save(); g.clip(); g.strokeStyle = 'rgba(130,75,75,0.65)'; g.lineWidth = 0.14;
    var F_ = [[[4.8, -3.0], [3.6, -1.4], [4.6, 0.4]], [[2.6, -4.6], [1.6, -2.4], [2.6, -0.6]], [[0.4, -5.0], [0.8, -2.8], [-0.2, -1.0]], [[-1.8, -4.8], [-1.0, -2.6], [-2.2, -0.8]], [[-4.0, -3.8], [-3.0, -2.2], [-4.2, -0.2]],
              [[-3.6, 0.6], [-0.4, 0.0], [3.4, 0.4]], [[-1.0, 1.4], [1.2, 1.0], [3.6, 1.8]], [[2.0, -3.4], [0.0, -3.6], [-2.6, -3.4]]];
    F_.forEach(function (f) { g.beginPath(); g.moveTo(f[0][0], f[0][1]); g.quadraticCurveTo(f[1][0] + Math.sin(f[0][0]) * 0.4, f[1][1], f[2][0], f[2][1]); g.stroke(); });
    g.restore();
    g.restore();
    if (k > 0.5) glow(g, cx, cy - s, 8 * s, 'rgba(242,198,107,0.8)', 0.25 * a * (k - 0.5) * 2);
  }
  function neuron(g, x, y, s, a, col, lt) {
    if (a <= 0.003) return; col = col || '#f2c66b';
    g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = 0.25 * s; g.lineCap = 'round';
    for (var i = 0; i < 6; i++) { var t = i / 6 * TAU + 0.3; g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + Math.cos(t + 0.3) * 2 * s, y + Math.sin(t + 0.3) * 2 * s, x + Math.cos(t) * 3.4 * s, y + Math.sin(t) * 3.4 * s); g.stroke(); }
    g.lineWidth = 0.3 * s; g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + 4 * s, y + 1 * s, x + 7 * s, y + 0.4 * s); g.stroke();
    g.fillStyle = col; g.beginPath(); g.arc(x, y, 1.1 * s, 0, TAU); g.fill(); g.restore();
  }
  // a lit tile with a short label
  function tile(g, x, y, w, h, s, col, a, bg) {
    if (a <= 0.003) return;
    rbox(g, x - w / 2, y - h / 2, w, h, 0.6, col, 0.18, bg || 'rgba(16,24,38,0.92)', a);
    tx(g, s, x, y + 0.05, Math.min(1.6, h * 0.42), col, 'center', 700, SANS, a);
  }
  function checkMark(g, x, y, s, col, a) {
    if (a <= 0.003) return;
    g.save(); g.globalAlpha *= a; g.strokeStyle = col || LEAF; g.lineWidth = 0.45 * s; g.lineCap = 'round'; g.lineJoin = 'round';
    g.beginPath(); g.moveTo(x - 1 * s, y); g.lineTo(x - 0.25 * s, y + 0.8 * s); g.lineTo(x + 1.2 * s, y - 0.9 * s); g.stroke(); g.restore();
  }
  function bigNum(g, s, x, y, sz, col, a, glowA) {
    if (a <= 0.003) return;
    if (glowA) glow(g, x, y, sz * 1.6, 'rgba(242,198,107,0.8)', glowA * a);
    tx(g, s, x, y, sz, col, 'center', 900, SANS, a);
  }
