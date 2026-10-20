  // ================= Newton: people and props =================
  var NT_COL = '#ead9b0', NT_OLD = '#dfe3ec', NT_NAME = '#f2c66b';
  var SKY = '#0b1220';
  function newton(g, x, yb, h, a, o, lt) { o = o || {}; o.col = o.old ? NT_OLD : NT_COL; o.longHair = true; if (o.name === undefined) o.name = '牛顿'; o.nameCol = NT_NAME; faraday(g, x, yb, h, a, o, lt); }
  function boy(g, x, yb, h, a, o, lt) { o = o || {}; o.col = NT_COL; if (o.name === undefined) o.name = '小牛顿'; o.nameCol = NT_NAME; faraday(g, x, yb, h, a, o, lt); }
  function mother(g, x, yb, h, a, o, lt) { o = o || {}; o.col = '#f0c8d8'; o.dress = true; o.longHair = true; if (o.name === undefined) o.name = '母亲'; o.nameCol = '#f6a8c8'; faraday(g, x, yb, h, a, o, lt); }
  function granny(g, x, yb, h, a, o, lt) { o = o || {}; o.col = '#c9bfe0'; o.dress = true; if (o.name === undefined) o.name = '外祖母'; o.nameCol = '#c9b8ff'; faraday(g, x, yb, h, a, o, lt); }
  function barrow(g, x, yb, h, a, o, lt) { o = o || {}; o.col = '#a7c4e8'; o.longHair = true; o.moustache = true; if (o.name === undefined) o.name = '巴罗'; o.nameCol = ICE; faraday(g, x, yb, h, a, o, lt); }
  function halley(g, x, yb, h, a, o, lt) { o = o || {}; o.col = '#9fdcc8'; o.longHair = true; if (o.name === undefined) o.name = '哈雷'; o.nameCol = '#7fe0a0'; faraday(g, x, yb, h, a, o, lt); }
  function leibniz(g, x, yb, h, a, o, lt) { o = o || {}; o.col = '#c9b8ff'; o.longHair = true; o.curl = true; if (o.name === undefined) o.name = '莱布尼茨'; o.nameCol = '#c9b8ff'; faraday(g, x, yb, h, a, o, lt); }
  function chaloner(g, x, yb, h, a, o, lt) { o = o || {}; o.col = '#ff9d8a'; o.hat = true; if (o.name === undefined) o.name = '查洛纳'; o.nameCol = '#ff9d8a'; faraday(g, x, yb, h, a, o, lt); }
  function stars(g, a, lt, seed, n, y1) {
    if (a <= 0.003) return;
    var r = rng(seed || 3), i; y1 = y1 || 56;
    for (i = 0; i < (n || 90); i++) {
      var x = r() * 100, y = r() * y1, s = 0.06 + r() * 0.16, tw = 0.55 + 0.45 * Math.sin(lt * (0.8 + r() * 1.6) + r() * 9);
      dot(g, x, y, s, '#dfe8ff', a * tw * (0.4 + r() * 0.6));
    }
  }
  function ground(g, y, a, c1, c2) {
    if (a <= 0.003) return;
    g.save(); g.globalAlpha *= a; var gr = g.createLinearGradient(0, y, 0, 56.25); gr.addColorStop(0, c1 || '#1d2a22'); gr.addColorStop(1, c2 || '#0b1210');
    g.fillStyle = gr; g.fillRect(0, y, 100, 56.25 - y); g.restore();
  }
  function hills(g, a, y0, col) {
    if (a <= 0.003) return;
    g.save(); g.globalAlpha *= a; g.fillStyle = col || '#16261d';
    g.beginPath(); g.moveTo(0, 56.25); g.lineTo(0, y0); g.quadraticCurveTo(22, y0 - 6, 45, y0 - 1); g.quadraticCurveTo(70, y0 + 4, 100, y0 - 4); g.lineTo(100, 56.25); g.closePath(); g.fill(); g.restore();
  }
  function cottage(g, x, yb, s, a, lit) {
    if (a <= 0.003) return;
    g.save(); g.globalAlpha *= a; g.translate(x, yb); g.scale(s, s);
    g.fillStyle = '#6f6656'; g.fillRect(-9, -9, 18, 9);
    g.fillStyle = 'rgba(0,0,0,0.18)'; for (var i = 0; i < 4; i++) g.fillRect(-9, -8.6 + i * 2.2, 18, 0.25);
    g.fillStyle = '#4a3f33'; g.beginPath(); g.moveTo(-10.2, -9); g.lineTo(0, -15.5); g.lineTo(10.2, -9); g.closePath(); g.fill();
    g.fillStyle = '#5c544a'; g.fillRect(5, -16, 2, 4);
    g.fillStyle = lit ? 'rgba(255,205,130,0.9)' : 'rgba(40,40,40,0.9)'; g.fillRect(-6.5, -6.5, 2.6, 2.4); g.fillRect(3.9, -6.5, 2.6, 2.4);
    g.fillStyle = '#3a2c20'; g.fillRect(-1.3, -4.6, 2.6, 4.6);
    g.restore();
    if (lit) { halo(g, x - 5.2 * s, yb - 5.3 * s, 3 * s, 'rgba(255,200,120,0.8)', 0.5 * a); halo(g, x + 5.2 * s, yb - 5.3 * s, 3 * s, 'rgba(255,200,120,0.8)', 0.5 * a); }
  }
  function apple(g, x, y, r, a, ang) {
    if (a <= 0.003) return;
    g.save(); g.globalAlpha *= a; g.translate(x, y); g.rotate(ang || 0);
    var gr = g.createRadialGradient(-r * 0.35, -r * 0.35, r * 0.1, 0, 0, r * 1.05);
    gr.addColorStop(0, '#ff8f7a'); gr.addColorStop(0.6, '#d8352c'); gr.addColorStop(1, '#7a1414');
    g.fillStyle = gr; g.beginPath(); g.moveTo(0, -r * 0.62);
    g.bezierCurveTo(r * 0.55, -r * 1.1, r * 1.15, -r * 0.5, r * 0.95, r * 0.25); g.bezierCurveTo(r * 0.8, r * 0.95, r * 0.25, r * 1.05, 0, r * 0.88);
    g.bezierCurveTo(-r * 0.25, r * 1.05, -r * 0.8, r * 0.95, -r * 0.95, r * 0.25); g.bezierCurveTo(-r * 1.15, -r * 0.5, -r * 0.55, -r * 1.1, 0, -r * 0.62); g.fill();
    g.strokeStyle = '#4a2e1a'; g.lineWidth = r * 0.12; g.beginPath(); g.moveTo(0, -r * 0.6); g.quadraticCurveTo(r * 0.05, -r * 0.95, r * 0.18, -r * 1.15); g.stroke();
    g.fillStyle = '#4fae5a'; g.beginPath(); g.ellipse(r * 0.42, -r * 0.98, r * 0.32, r * 0.13, -0.5, 0, TAU); g.fill();
    g.restore();
  }
  function tree(g, x, yb, s, a, lt, apples) {
    if (a <= 0.003) return;
    g.save(); g.globalAlpha *= a;
    g.fillStyle = '#3d2b1d'; g.beginPath(); g.moveTo(x - 1.1 * s, yb); g.lineTo(x - 0.6 * s, yb - 10 * s); g.lineTo(x + 0.6 * s, yb - 10 * s); g.lineTo(x + 1.1 * s, yb); g.closePath(); g.fill();
    var bl = [[0, -16, 8], [-6, -13, 6], [6, -13, 6.4], [-3, -19, 5.5], [4, -19, 5.2]], i;
    for (i = 0; i < bl.length; i++) { var sw = Math.sin((lt || 0) * 0.8 + i) * 0.15 * s; g.fillStyle = i % 2 ? '#1f4a2e' : '#24573a'; g.beginPath(); g.arc(x + bl[i][0] * s + sw, yb + bl[i][1] * s, bl[i][2] * s, 0, TAU); g.fill(); }
    g.restore();
    if (apples) for (i = 0; i < apples.length; i++) apple(g, x + apples[i][0] * s, yb + apples[i][1] * s, 0.75 * s, a);
  }
  function earthB(g, x, y, r, a, lt) {
    if (a <= 0.003) return;
    halo(g, x, y, r * 1.6, 'rgba(90,160,255,0.55)', 0.5 * a);
    g.save(); g.globalAlpha *= a;
    var gr = g.createRadialGradient(x - r * 0.4, y - r * 0.4, r * 0.1, x, y, r);
    gr.addColorStop(0, '#6fb6ff'); gr.addColorStop(0.7, '#1f5fae'); gr.addColorStop(1, '#0d2a52');
    g.fillStyle = gr; g.beginPath(); g.arc(x, y, r, 0, TAU); g.fill();
    g.save(); g.beginPath(); g.arc(x, y, r, 0, TAU); g.clip(); g.fillStyle = 'rgba(80,170,110,0.85)';
    var o = ((lt || 0) * 0.05) % 1;
    for (var i = -1; i < 3; i++) { var cx = x + (i + o) * r * 1.2 - r * 0.6; g.beginPath(); g.ellipse(cx, y - r * 0.2, r * 0.32, r * 0.5, 0.4, 0, TAU); g.fill(); g.beginPath(); g.ellipse(cx + r * 0.35, y + r * 0.45, r * 0.22, r * 0.2, 0, 0, TAU); g.fill(); }
    g.restore(); g.restore();
  }
  function moonB(g, x, y, r, a) {
    if (a <= 0.003) return;
    halo(g, x, y, r * 2.2, 'rgba(230,230,210,0.6)', 0.35 * a);
    g.save(); g.globalAlpha *= a;
    var gr = g.createRadialGradient(x - r * 0.35, y - r * 0.35, r * 0.1, x, y, r);
    gr.addColorStop(0, '#f6f2e4'); gr.addColorStop(1, '#8f8c82'); g.fillStyle = gr; g.beginPath(); g.arc(x, y, r, 0, TAU); g.fill();
    g.fillStyle = 'rgba(90,88,80,0.35)'; g.beginPath(); g.arc(x + r * 0.3, y - r * 0.2, r * 0.22, 0, TAU); g.fill(); g.beginPath(); g.arc(x - r * 0.3, y + r * 0.3, r * 0.16, 0, TAU); g.fill();
    g.restore();
  }
  function sunB(g, x, y, r, a, lt) {
    if (a <= 0.003) return;
    halo(g, x, y, r * 3.2, 'rgba(255,190,90,0.7)', 0.6 * a);
    var gr = g.createRadialGradient(x, y, 0, x, y, r); gr.addColorStop(0, '#fff6d8'); gr.addColorStop(0.6, '#ffd36b'); gr.addColorStop(1, '#ff9a3c');
    g.save(); g.globalAlpha *= a; g.fillStyle = gr; g.beginPath(); g.arc(x, y, r, 0, TAU); g.fill(); g.restore();
  }
  var SPEC = ['#ff3b3b', '#ff8a2a', '#ffe14a', '#4fd36b', '#3fa8ff', '#5a5cff', '#a35cff'];
  function prismB(g, x, y, s, ang, a) {
    if (a <= 0.003) return;
    g.save(); g.globalAlpha *= a; g.translate(x, y); g.rotate(ang || 0);
    g.beginPath(); g.moveTo(0, -s); g.lineTo(s * 0.87, s * 0.5); g.lineTo(-s * 0.87, s * 0.5); g.closePath();
    var gr = g.createLinearGradient(-s, -s, s, s); gr.addColorStop(0, 'rgba(200,230,255,0.38)'); gr.addColorStop(1, 'rgba(120,170,230,0.16)');
    g.fillStyle = gr; g.fill(); g.strokeStyle = 'rgba(220,240,255,0.85)'; g.lineWidth = 0.22; g.stroke();
    g.restore();
  }
  function beam(g, x1, y1, x2, y2, col, w, a) {
    if (a <= 0.003) return;
    g.save(); g.globalCompositeOperation = 'lighter'; ln(g, x1, y1, x2, y2, col, w * 2.6, null, a * 0.18); ln(g, x1, y1, x2, y2, col, w, null, a * 0.9); g.restore();
  }
  function coinB(g, x, y, r, a, clip, label) {
    if (a <= 0.003) return;
    g.save(); g.globalAlpha *= a;
    var gr = g.createRadialGradient(x - r * 0.3, y - r * 0.3, r * 0.1, x, y, r); gr.addColorStop(0, '#f4f6fb'); gr.addColorStop(1, '#8c95a6');
    g.fillStyle = gr; g.beginPath();
    if (clip) { for (var k = 0; k <= 40; k++) { var t = k / 40 * TAU, rr = r * (1 - clip * (0.12 + 0.1 * Math.sin(t * 7 + 1.3) + 0.06 * Math.sin(t * 13))); var px = x + Math.cos(t) * rr, py = y + Math.sin(t) * rr; if (k === 0) g.moveTo(px, py); else g.lineTo(px, py); } }
    else g.arc(x, y, r, 0, TAU);
    g.fill(); g.strokeStyle = 'rgba(255,255,255,0.5)'; g.lineWidth = r * 0.06; g.stroke();
    if (!clip) { g.setLineDash([r * 0.08, r * 0.08]); g.strokeStyle = 'rgba(60,70,90,0.6)'; g.beginPath(); g.arc(x, y, r * 0.92, 0, TAU); g.stroke(); g.setLineDash([]); }
    g.fillStyle = 'rgba(60,70,90,0.55)'; g.beginPath(); g.ellipse(x, y - r * 0.05, r * 0.32, r * 0.42, 0, 0, TAU); g.fill();
    g.restore();
  }
  function paper(g, x, y, w, h, a, col) { rbox(g, x, y, w, h, 0.4, null, 0, col || 'rgba(236,226,204,0.94)', a); }
  function scribble(g, x, y, w, rows, a, lt, t0, seed, col) {
    if (a <= 0.003) return;
    var r = rng(seed || 4), i, k;
    for (i = 0; i < rows; i++) {
      var p = clamp((lt - t0 - i * 0.18) / 0.5); if (p <= 0) break;
      var len = w * (0.55 + r() * 0.45) * p;
      g.save(); g.globalAlpha *= a; g.strokeStyle = col || 'rgba(58,42,26,0.85)'; g.lineWidth = 0.22; g.beginPath(); g.moveTo(x, y + i * 1.6);
      for (k = 0; k <= 24; k++) g.lineTo(x + len * k / 24, y + i * 1.6 + Math.sin(k * 2.1 + i) * 0.25);
      g.stroke(); g.restore();
    }
  }
  function cup(g, x, y, s, a) {
    if (a <= 0.003) return;
    g.save(); g.globalAlpha *= a; g.strokeStyle = '#d9c9a4'; g.lineWidth = 0.35 * s; g.fillStyle = 'rgba(90,72,52,0.55)';
    g.beginPath(); g.moveTo(x - 4 * s, y - 5 * s); g.lineTo(x - 3.3 * s, y + 4 * s); g.lineTo(x + 3.3 * s, y + 4 * s); g.lineTo(x + 4 * s, y - 5 * s); g.closePath(); g.fill(); g.stroke();
    g.beginPath(); g.ellipse(x, y - 5 * s, 4 * s, 0.9 * s, 0, 0, TAU); g.stroke();
    g.beginPath(); g.arc(x + 4.6 * s, y - 0.6 * s, 2 * s, -1.2, 1.2); g.stroke();
    g.restore();
  }
  function baby(g, x, y, s, a, lt) {
    if (a <= 0.003) return;
    halo(g, x, y, 4 * s, 'rgba(255,220,170,0.7)', 0.35 * a);
    g.save(); g.globalAlpha *= a;
    g.fillStyle = '#efe6d2'; g.beginPath(); g.ellipse(x, y + 0.6 * s, 1.4 * s, 2.3 * s, 0, 0, TAU); g.fill();
    g.fillStyle = '#f4d9bd'; g.beginPath(); g.arc(x, y - 1.6 * s, 1.05 * s, 0, TAU); g.fill();
    g.strokeStyle = 'rgba(160,140,110,0.8)'; g.lineWidth = 0.12 * s; g.beginPath(); g.moveTo(x - 1.2 * s, y); g.quadraticCurveTo(x, y + 0.8 * s, x + 1.2 * s, y - 0.2 * s); g.stroke();
    g.restore();
  }
  function bookB(g, x, y, w, h, a, col, title, open) {
    if (a <= 0.003) return;
    if (open) {
      rbox(g, x - w, y, w, h, 0.3, null, 0, 'rgba(236,226,204,0.95)', a); rbox(g, x, y, w, h, 0.3, null, 0, 'rgba(228,216,192,0.95)', a);
      ln(g, x, y, x, y + h, 'rgba(120,100,70,0.6)', 0.2, null, a); return;
    }
    rbox(g, x - w / 2, y - h / 2, w, h, 0.35, 'rgba(255,255,255,0.18)', 0.12, col || '#6b3e2a', a);
    ln(g, x - w / 2 + 0.9, y - h / 2, x - w / 2 + 0.9, y + h / 2, 'rgba(0,0,0,0.3)', 0.25, null, a);
    if (title) tx(g, title, x + 0.4, y, Math.min(2.0, w * 0.16), '#f2dfb0', 'center', 800, SANS, a);
  }
  function cannon(g, x, y, s, ang, a) {
    if (a <= 0.003) return;
    g.save(); g.globalAlpha *= a; g.translate(x, y);
    g.fillStyle = '#5a3c26'; g.beginPath(); g.arc(-0.6 * s, 0.8 * s, 1.2 * s, 0, TAU); g.fill();
    g.rotate(ang || 0); g.fillStyle = '#2e3542'; g.fillRect(-1.6 * s, -0.75 * s, 5.4 * s, 1.5 * s); g.fillStyle = '#4a5466'; g.fillRect(3.4 * s, -0.95 * s, 0.6 * s, 1.9 * s);
    g.restore();
  }
  function ellipsePath(g, cx, cy, A, Bv, col, w, a, frac, dash) {
    if (a <= 0.003) return;
    g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = w; if (dash) g.setLineDash(dash); g.beginPath();
    var n = Math.max(2, Math.round(96 * (frac == null ? 1 : frac)));
    for (var k = 0; k <= n; k++) { var t = k / 96 * TAU; var px = cx + A * Math.cos(t), py = cy + Bv * Math.sin(t); if (k === 0) g.moveTo(px, py); else g.lineTo(px, py); }
    g.stroke(); g.restore();
  }
  function quill(g, x, y, s, a, ang) {
    if (a <= 0.003) return;
    g.save(); g.globalAlpha *= a; g.translate(x, y); g.rotate(ang == null ? -0.7 : ang);
    g.fillStyle = '#f4f0e6'; g.beginPath(); g.moveTo(0, 0); g.quadraticCurveTo(1.2 * s, -4 * s, 0.3 * s, -8 * s); g.quadraticCurveTo(-0.9 * s, -4 * s, 0, 0); g.fill();
    g.strokeStyle = '#2a2a2a'; g.lineWidth = 0.15 * s; g.beginPath(); g.moveTo(0, 0.9 * s); g.lineTo(0.15 * s, -6 * s); g.stroke();
    g.restore();
  }
  function title2(g, s, y, col, a, sz) { tx(g, s, 50, y, sz || 2.6, col || GOLD, 'center', 900, SANS, a); }
