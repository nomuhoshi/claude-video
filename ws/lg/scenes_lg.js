// CoreWeave · v2 scenes. Everything in 1920×1080 px. Narration sits top-left (x < 1010, y < 450),
// counters top-right; pictures live centre-right and along the bottom.
(function () {
  var TL = window.TL, SCN = TL.scenes;
  var SERIF = '"Noto Serif CJK SC"', MONO = '"IBM Plex Mono", monospace';
  var GOLD = '#f0bd5c', BLUE = '#86b6ff', RED = '#ef5b43', INK = '#ece6da', DIM = '#9aa3b2';
  function cl(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function E(x) { x = cl(x); return x * x * (3 - 2 * x); }
  function eo(x) { x = cl(x); return 1 - Math.pow(1 - x, 3); }
  function bk(x) { x = cl(x); var c = 1.7; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); }
  function rnd(s) { var x = Math.sin(s * 91.7 + 17.3) * 43758.5453; return x - Math.floor(x); }
  function ap(lt, t0, d) { return E((lt - t0) / (d || 0.5)); }               // appear
  function wn(lt, a, b, f) { f = f || 0.5; return E((lt - a) / f) * (1 - E((lt - b + f) / f)); }
  function rgba(hex, a) { var n = parseInt(hex.slice(1), 16); return 'rgba(' + (n >> 16) + ',' + (n >> 8 & 255) + ',' + (n & 255) + ',' + a.toFixed(3) + ')'; }

  // ---------- primitives ----------
  function txt(g, s, x, y, size, col, al, a, wt, font) {
    if (a <= 0) return; g.save(); g.globalAlpha *= a; g.font = (wt || 700) + ' ' + size + 'px ' + (font || SERIF); g.textAlign = al || 'center';
    g.fillStyle = col || INK; g.shadowColor = 'rgba(0,0,0,0.85)'; g.shadowBlur = 12; g.fillText(s, x, y); g.restore();
  }
  function gtxt(g, s, x, y, size, col, al, a, wt) {   // glowing text
    if (a <= 0) return; g.save(); g.globalAlpha *= a; g.font = (wt || 900) + ' ' + size + 'px ' + SERIF; g.textAlign = al || 'center';
    g.fillStyle = col; g.shadowColor = col; g.shadowBlur = 26; g.fillText(s, x, y); g.restore();
  }
  function mono(g, s, x, y, size, col, al, a) { txt(g, s, x, y, size, col || DIM, al, a, 500, MONO); }
  function rr(g, x, y, w, h, r) { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); }
  function chip(g, x, y, s, col, a, size, al) {
    if (a <= 0) return; size = size || 26; g.save(); g.globalAlpha *= a; g.font = '700 ' + size + 'px ' + SERIF;
    var w = g.measureText(s).width + size * 1.2, h = size * 1.7, x0 = al === 'left' ? x : x - w / 2;
    rr(g, x0, y - h / 2, w, h, h / 2); g.fillStyle = 'rgba(8,12,20,0.78)'; g.fill(); g.strokeStyle = col; g.lineWidth = 2; g.shadowColor = col; g.shadowBlur = 12; g.stroke();
    g.shadowBlur = 0; g.fillStyle = col; g.textAlign = 'center'; g.fillText(s, x0 + w / 2, y + size * 0.36); g.restore();
  }
  function card(g, x, y, w, h, col, a) {
    if (a <= 0) return; g.save(); g.globalAlpha *= a; rr(g, x, y, w, h, 14);
    var gr = g.createLinearGradient(0, y, 0, y + h); gr.addColorStop(0, 'rgba(22,30,46,0.92)'); gr.addColorStop(1, 'rgba(10,14,24,0.92)');
    g.fillStyle = gr; g.fill(); g.strokeStyle = rgba(col, 0.7); g.lineWidth = 2; g.shadowColor = col; g.shadowBlur = 16; g.stroke(); g.restore();
  }
  function line(g, x0, y0, x1, y1, col, w, a) { if (a <= 0) return; g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = w || 2; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke(); g.restore(); }
  function arrow(g, x0, y0, x1, y1, col, a, p, dash) {          // grows with p, animated dashes
    if (a <= 0 || p <= 0) return; var x = x0 + (x1 - x0) * p, y = y0 + (y1 - y0) * p;
    g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.fillStyle = col; g.lineWidth = 3; g.shadowColor = col; g.shadowBlur = 10;
    if (dash) { g.setLineDash([14, 10]); g.lineDashOffset = -dash; }
    g.beginPath(); g.moveTo(x0, y0); g.lineTo(x, y); g.stroke(); g.setLineDash([]);
    var an = Math.atan2(y1 - y0, x1 - x0); g.beginPath(); g.moveTo(x, y); g.lineTo(x - 18 * Math.cos(an - 0.45), y - 18 * Math.sin(an - 0.45)); g.lineTo(x - 18 * Math.cos(an + 0.45), y - 18 * Math.sin(an + 0.45)); g.closePath(); g.fill(); g.restore();
  }
  function glowDot(g, x, y, r, col, a) {
    if (a <= 0) return; g.save(); g.globalAlpha *= a; var gr = g.createRadialGradient(x, y, 0, x, y, r * 3); gr.addColorStop(0, rgba(col, 0.6)); gr.addColorStop(1, rgba(col, 0));
    g.fillStyle = gr; g.beginPath(); g.arc(x, y, r * 3, 0, 6.29); g.fill(); g.fillStyle = col; g.beginPath(); g.arc(x, y, r, 0, 6.29); g.fill(); g.restore();
  }
  function ticks(g, x, y, n, lit, col, a, h, gap, colOff) {   // tally bars
    if (a <= 0) return; h = h || 46; gap = gap || 9; g.save(); g.globalAlpha *= a;
    for (var i = 0; i < n; i++) { var on = i < lit; g.fillStyle = on ? col : (colOff || 'rgba(160,170,190,0.18)'); g.shadowColor = on ? col : 'transparent'; g.shadowBlur = on ? 8 : 0; g.fillRect(x + i * gap, y - h, gap * 0.42, h); }
    g.restore();
  }
  function coin(g, x, y, r, a) {
    if (a <= 0) return; g.save(); g.globalAlpha *= a; var gr = g.createRadialGradient(x - r * 0.3, y - r * 0.3, 1, x, y, r); gr.addColorStop(0, '#ffe6a6'); gr.addColorStop(0.7, '#d9a040'); gr.addColorStop(1, '#8a5c18');
    g.fillStyle = gr; g.shadowColor = GOLD; g.shadowBlur = 12; g.beginPath(); g.arc(x, y, r, 0, 6.29); g.fill(); g.shadowBlur = 0;
    g.strokeStyle = 'rgba(120,80,20,0.8)'; g.lineWidth = 1.5; g.beginPath(); g.arc(x, y, r * 0.72, 0, 6.29); g.stroke(); g.restore();
  }
  // a GPU board seen from the front: PCB, shroud, two fans, gold fingers
  function gpu(g, x, y, w, lit, t, a, cold) {
    if (a <= 0) return; var h = w * 0.42; g.save(); g.globalAlpha *= a; g.translate(x, y);
    rr(g, -w / 2, -h / 2, w, h, w * 0.04); var gr = g.createLinearGradient(0, -h / 2, 0, h / 2); gr.addColorStop(0, cold ? '#2a2f38' : '#2b3446'); gr.addColorStop(1, cold ? '#15181d' : '#121826');
    g.fillStyle = gr; g.fill(); g.strokeStyle = cold ? 'rgba(150,150,150,0.4)' : rgba(GOLD, 0.35 + 0.5 * lit); g.lineWidth = 2; g.shadowColor = GOLD; g.shadowBlur = cold ? 0 : 20 * lit; g.stroke(); g.shadowBlur = 0;
    for (var k = 0; k < 2; k++) {
      var fx = (k ? 0.23 : -0.23) * w, r = h * 0.36; g.strokeStyle = 'rgba(200,210,230,0.35)'; g.lineWidth = 2; g.beginPath(); g.arc(fx, 0, r, 0, 6.29); g.stroke();
      var sp = cold ? 0 : t * (6 + 10 * lit);
      for (var b = 0; b < 7; b++) { var an = sp + b / 7 * 6.283; g.strokeStyle = 'rgba(190,200,220,0.55)'; g.lineWidth = 3; g.beginPath(); g.moveTo(fx + Math.cos(an) * r * 0.2, Math.sin(an) * r * 0.2); g.quadraticCurveTo(fx + Math.cos(an + 0.5) * r * 0.7, Math.sin(an + 0.5) * r * 0.7, fx + Math.cos(an + 0.9) * r * 0.92, Math.sin(an + 0.9) * r * 0.92); g.stroke(); }
      g.fillStyle = '#0b0f17'; g.beginPath(); g.arc(fx, 0, r * 0.2, 0, 6.29); g.fill();
    }
    g.fillStyle = cold ? 'rgba(150,140,110,0.5)' : '#c9a052'; for (var i = 0; i < 16; i++) g.fillRect(-w * 0.32 + i * w * 0.035, h / 2, w * 0.022, h * 0.1);
    g.fillStyle = cold ? 'rgba(120,120,120,0.6)' : rgba(BLUE, 0.4 + 0.6 * lit); g.fillRect(-w * 0.44, -h * 0.4, w * 0.88, 3);
    g.restore();
  }
  // oblique box: P(X,Y,Z) = [x + X + 0.5Z, y − Y − 0.32Z]
  function box3(g, x, y, w, h, d, cf, cs, ct, a) {
    if (a <= 0) return; g.save(); g.globalAlpha *= a;
    function P(X, Y, Z) { return [x + X + 0.5 * Z, y - Y - 0.32 * Z]; }
    function poly(ps, c) { g.beginPath(); ps.forEach(function (p, i) { var q = P(p[0], p[1], p[2]); if (i) g.lineTo(q[0], q[1]); else g.moveTo(q[0], q[1]); }); g.closePath(); g.fillStyle = c; g.fill(); g.strokeStyle = 'rgba(160,190,240,0.25)'; g.lineWidth = 1.2; g.stroke(); }
    poly([[w, 0, 0], [w, 0, d], [w, h, d], [w, h, 0]], cs); poly([[0, h, 0], [w, h, 0], [w, h, d], [0, h, d]], ct); poly([[0, 0, 0], [w, 0, 0], [w, h, 0], [0, h, 0]], cf);
    g.restore(); return P;
  }
  function datacenter(g, x, y, w, h, d, t, lit, a) {      // a low building with vents and blinking racks behind glass
    if (a <= 0) return; var P = box3(g, x, y, w, h, d, '#18223a', '#101828', '#24304a', a);
    g.save(); g.globalAlpha *= a;
    var rows = 3, cols = Math.floor(w / 46);
    for (var r = 0; r < rows; r++) for (var c = 0; c < cols; c++) {
      var wx = x + 14 + c * 46, wy = y - h + 18 + r * (h - 30) / rows, on = rnd(r * 31 + c * 7) < lit;
      g.fillStyle = on ? rgba(BLUE, 0.25 + 0.2 * Math.sin(t * 3 + c + r)) : 'rgba(40,50,70,0.6)'; g.fillRect(wx, wy, 32, (h - 30) / rows - 10);
      if (on) { g.fillStyle = rnd(c + r * 9 + Math.floor(t * 4)) > 0.5 ? GOLD : '#7dffb0'; g.fillRect(wx + 4, wy + 6, 3, 3); g.fillRect(wx + 12, wy + 6, 3, 3); }
    }
    for (var k = 0; k < 3; k++) { var q = P(w * (0.2 + 0.3 * k), h, d * 0.5); g.fillStyle = '#2c3a58'; g.fillRect(q[0] - 22, q[1] - 16, 44, 16); g.strokeStyle = 'rgba(160,190,240,0.3)'; g.strokeRect(q[0] - 22, q[1] - 16, 44, 16);
      var an = t * 5 + k; g.strokeStyle = 'rgba(190,210,240,0.5)'; g.beginPath(); g.moveTo(q[0] - 12 * Math.cos(an), q[1] - 8 - 4 * Math.sin(an)); g.lineTo(q[0] + 12 * Math.cos(an), q[1] - 8 + 4 * Math.sin(an)); g.stroke(); }
    g.restore();
  }
  function doc(g, x, y, w, h, a, rot, title, seed) {          // a contract sheet (kept dim so bloom does not wash it out)
    if (a <= 0) return; g.save(); g.globalAlpha *= a; g.translate(x, y); g.rotate(rot || 0);
    g.shadowColor = 'rgba(0,0,0,0.6)'; g.shadowBlur = 20; var gr = g.createLinearGradient(0, -h / 2, 0, h / 2); gr.addColorStop(0, '#8e7f62'); gr.addColorStop(1, '#6f6249');
    g.fillStyle = gr; g.fillRect(-w / 2, -h / 2, w, h); g.shadowBlur = 0;
    g.fillStyle = 'rgba(40,30,20,0.55)'; var n = Math.floor(h / 16) - 3;
    for (var i = 0; i < n; i++) { var lw = (0.55 + 0.4 * rnd(i + (seed || 0) * 13)) * (w - 24); g.fillRect(-w / 2 + 12, -h / 2 + (title ? 44 : 16) + i * 14, lw, 3); }
    if (title) { g.font = '900 ' + Math.round(w * 0.08) + 'px ' + SERIF; g.fillStyle = '#2a1e12'; g.textAlign = 'center'; g.fillText(title, 0, -h / 2 + 32); }
    g.restore();
  }
  function stamp(g, x, y, s, lt0, a) {                       // red stamp that slams down
    if (a <= 0 || lt0 < 0) return; var k = lt0 < 0.12 ? 1.8 - 0.8 * eo(lt0 / 0.12) : 1;
    g.save(); g.globalAlpha *= a * Math.min(1, lt0 / 0.05) * 0.95; g.translate(x, y); g.rotate(-0.08); g.scale(k, k);
    g.font = '900 46px ' + SERIF; var w = g.measureText(s).width + 40; g.strokeStyle = '#d8382a'; g.lineWidth = 6; g.strokeRect(-w / 2, -38, w, 76);
    g.fillStyle = '#e04434'; g.textAlign = 'center'; g.shadowColor = RED; g.shadowBlur = 14; g.fillText(s, 0, 16); g.restore();
  }
  function lock(g, x, y, s, closed, a) {
    if (a <= 0) return; g.save(); g.globalAlpha *= a; g.translate(x, y); g.scale(s, s);
    g.strokeStyle = '#d9b25c'; g.lineWidth = 10; g.shadowColor = GOLD; g.shadowBlur = 14; g.beginPath(); g.arc(0, -40 + (1 - closed) * -22, 30, Math.PI, 0); g.lineTo(30, -40 + (1 - closed) * -22 + (closed ? 14 : 0)); g.stroke();
    g.beginPath(); g.moveTo(-30, -40 + (1 - closed) * -22); g.lineTo(-30, -28); g.stroke();
    rr(g, -48, -32, 96, 78, 10); var gr = g.createLinearGradient(0, -32, 0, 46); gr.addColorStop(0, '#f2cd75'); gr.addColorStop(1, '#a8771f'); g.fillStyle = gr; g.fill();
    g.shadowBlur = 0; g.fillStyle = '#4a3410'; g.beginPath(); g.arc(0, 0, 9, 0, 6.29); g.fill(); g.fillRect(-4, 0, 8, 22); g.restore();
  }
  function chainArc(g, cx, cy, rx, ry, a0, a1, a, t) {        // chain links along part of an ellipse
    if (a <= 0) return; g.save(); g.globalAlpha *= a; var n = Math.max(2, Math.round(Math.abs(a1 - a0) * rx / 34));
    for (var i = 0; i <= n; i++) {
      var an = a0 + (a1 - a0) * i / n, x = cx + rx * Math.cos(an), y = cy + ry * Math.sin(an), tan = Math.atan2(ry * Math.cos(an), -rx * Math.sin(an));
      var front = Math.sin(an) > 0; g.save(); g.translate(x, y); g.rotate(tan); g.strokeStyle = front ? '#e6c06a' : 'rgba(150,120,60,0.8)'; g.lineWidth = 7; g.shadowColor = GOLD; g.shadowBlur = front ? 10 : 0;
      g.beginPath(); if (i % 2) g.ellipse(0, 0, 20, 10, 0, 0, 6.29); else g.ellipse(0, 0, 20, 4, 0, 0, 6.29); g.stroke(); g.restore();
    }
    g.restore();
  }
  function bank(g, x, y, s, a) {                             // a columned bank building
    if (a <= 0) return; g.save(); g.globalAlpha *= a; g.translate(x, y); g.scale(s, s); g.strokeStyle = 'rgba(200,215,240,0.85)'; g.fillStyle = 'rgba(30,40,62,0.9)'; g.lineWidth = 3;
    g.beginPath(); g.moveTo(-120, -150); g.lineTo(0, -210); g.lineTo(120, -150); g.closePath(); g.fill(); g.stroke();
    g.fillRect(-120, -150, 240, 20); g.strokeRect(-120, -150, 240, 20);
    for (var i = 0; i < 5; i++) { g.fillRect(-100 + i * 50 - 9, -128, 18, 112); g.strokeRect(-100 + i * 50 - 9, -128, 18, 112); }
    g.fillRect(-135, -16, 270, 16); g.strokeRect(-135, -16, 270, 16); g.restore();
    txt(g, '贷款方', x, y + 40 * s, 24, DIM, 'center', a);
  }
  function house(g, x, y, s, a) {
    if (a <= 0) return; g.save(); g.globalAlpha *= a; g.translate(x, y); g.scale(s, s); g.strokeStyle = 'rgba(220,225,235,0.85)'; g.fillStyle = 'rgba(28,38,58,0.95)'; g.lineWidth = 3;
    g.beginPath(); g.moveTo(-70, -60); g.lineTo(0, -120); g.lineTo(70, -60); g.lineTo(70, 30); g.lineTo(-70, 30); g.closePath(); g.fill(); g.stroke();
    g.fillStyle = rgba(GOLD, 0.6); g.fillRect(-40, -40, 26, 26); g.fillRect(14, -40, 26, 26); g.fillStyle = 'rgba(120,90,60,0.9)'; g.fillRect(-12, -4, 24, 34); g.restore();
  }
  function tower(g, x, y, s, t, a) {                         // a cooling tower with steam
    if (a <= 0) return; g.save(); g.globalAlpha *= a; g.translate(x, y); g.scale(s, s);
    g.beginPath(); g.moveTo(-70, 0); g.quadraticCurveTo(-30, -110, -48, -200); g.lineTo(48, -200); g.quadraticCurveTo(30, -110, 70, 0); g.closePath();
    var gr = g.createLinearGradient(-70, 0, 70, 0); gr.addColorStop(0, '#2a3550'); gr.addColorStop(0.5, '#4a5878'); gr.addColorStop(1, '#1c2438'); g.fillStyle = gr; g.fill(); g.strokeStyle = 'rgba(200,215,240,0.6)'; g.lineWidth = 2; g.stroke();
    for (var i = 0; i < 9; i++) { var p = (t * 0.25 + i / 9) % 1, sx = Math.sin(i * 2.1 + t) * 20 * p, sy = -200 - p * 160, r = 26 + p * 50;
      var sg = g.createRadialGradient(sx, sy, 0, sx, sy, r); sg.addColorStop(0, 'rgba(210,220,235,' + (0.22 * (1 - p)).toFixed(3) + ')'); sg.addColorStop(1, 'rgba(210,220,235,0)'); g.fillStyle = sg; g.fillRect(sx - r, sy - r, r * 2, r * 2); }
    g.restore();
  }
  function avatar(g, x, y, r, col, a) { if (a === 0) return; g.save(); if (a != null) g.globalAlpha *= a; g.fillStyle = 'rgba(40,52,76,1)'; g.beginPath(); g.arc(x, y, r, 0, 6.29); g.fill(); g.fillStyle = rgba(col, 0.8); g.beginPath(); g.arc(x, y - r * 0.2, r * 0.38, 0, 6.29); g.fill(); g.beginPath(); g.arc(x, y + r * 0.75, r * 0.62, Math.PI, 0); g.fill(); g.restore(); }
  function wrapTxt(g, s, x, y, maxW, lh, size, col, a) {
    if (a <= 0) return; g.save(); g.globalAlpha *= a; g.font = '700 ' + size + 'px ' + SERIF; g.fillStyle = col; g.textAlign = 'left'; var lineS = '', yy = y;
    for (var i = 0; i < s.length; i++) { var test = lineS + s[i]; if (g.measureText(test).width > maxW) { g.fillText(lineS, x, yy); lineS = s[i]; yy += lh; } else lineS = test; }
    g.fillText(lineS, x, yy); g.restore();
  }
  function note(g, s, a) { txt(g, s, 1840, 1050, 18, 'rgba(160,168,182,0.75)', 'right', a, 500); }
  function rig(g, cx, cy, lt, n, t0, cold, a) {              // mining rig: an open frame with n boards on a rail
    if (a <= 0) return; g.save(); g.globalAlpha *= a;
    g.strokeStyle = 'rgba(170,185,210,0.55)'; g.lineWidth = 4; g.strokeRect(cx - 330, cy - 150, 660, 300); g.beginPath(); g.moveTo(cx - 330, cy + 60); g.lineTo(cx + 330, cy + 60); g.stroke();
    g.restore();
    for (var i = 0; i < n; i++) {
      var p = t0 == null ? 1 : bk((lt - t0 - i * 0.18) / 0.45); if (p <= 0) continue;
      g.save(); g.translate(cx - 270 + i * 108, cy - 20 - (1 - p) * 120); g.rotate(-Math.PI / 2); gpu(g, 0, 0, 230, cold ? 0 : 0.6 + 0.4 * Math.sin(lt * 3 + i), lt, a * Math.min(1, p * 1.5), cold); g.restore();
    }
  }

  // ---------- logistic-map props (everything computed live from the formula) ----------
  function LG(a, x) { return a * x * (1 - x); }
  function SN(r, x) { return r * Math.sin(Math.PI * x); }
  var GB = { x: 1090, y: 290, s: 620 };                       // cobweb box (right)
  var SB = { x: 140, y: 590, w: 850, h: 300 };                // time-series panel (bottom-left)
  function gx(b, u) { return b.x + u * b.s; }
  function gy(b, v) { return b.y + b.s - v * b.s; }
  function orbit(f, a, x0, n) { var xs = [x0]; for (var i = 0; i < n; i++) xs.push(f(a, xs[i])); return xs; }

  // bifurcation images, computed once: columns of a, 600 warm-up steps, then 320 plotted steps
  function bifImg(f, a0, a1, w, h, x0) {
    var c = document.createElement('canvas'); c.width = w; c.height = h; var g = c.getContext('2d'), im = g.createImageData(w, h), acc = new Float32Array(w * h);
    for (var i = 0; i < w; i++) {
      var a = a0 + (a1 - a0) * (i + 0.5) / w, x = x0;
      for (var k = 0; k < 600; k++) x = f(a, x);
      for (var k = 0; k < 320; k++) { x = f(a, x); var j = Math.floor((1 - x) * (h - 1)); if (j >= 0 && j < h) acc[j * w + i] += 1; }
    }
    for (var p = 0; p < w * h; p++) { var v = Math.sqrt(Math.min(1, acc[p] / 5)); im.data[p * 4] = 255; im.data[p * 4 + 1] = 216; im.data[p * 4 + 2] = 150; im.data[p * 4 + 3] = Math.round(255 * v); }
    g.putImageData(im, 0, 0); return c;
  }
  var BIF = bifImg(LG, 2.5, 4.0, 1600, 470, 0.5);              // full diagram (2.5 … 4)
  var BIFZ = bifImg(LG, 2.9, 3.6, 840, 440, 0.5);              // the forks (2.9 … 3.6)
  var BIFS = bifImg(SN, 0.6, 1.0, 640, 440, 0.5);              // the sine map, same story

  function axes(g, b, al, labs) {
    if (al <= 0) return; g.save(); g.globalAlpha *= al; g.strokeStyle = 'rgba(200,210,230,0.45)'; g.lineWidth = 2;
    g.beginPath(); g.moveTo(b.x, b.y); g.lineTo(b.x, b.y + b.s); g.lineTo(b.x + b.s, b.y + b.s); g.stroke();
    g.strokeStyle = 'rgba(200,210,230,0.08)'; g.lineWidth = 1; for (var i = 1; i < 4; i++) { g.beginPath(); g.moveTo(b.x + b.s * i / 4, b.y); g.lineTo(b.x + b.s * i / 4, b.y + b.s); g.moveTo(b.x, b.y + b.s * i / 4); g.lineTo(b.x + b.s, b.y + b.s * i / 4); g.stroke(); }
    g.restore();
    mono(g, '0', b.x - 16, b.y + b.s + 26, 18, DIM, 'center', al); mono(g, '1', b.x + b.s, b.y + b.s + 26, 18, DIM, 'center', al); mono(g, '1', b.x - 20, b.y + 8, 18, DIM, 'center', al);
    if (labs !== false) { txt(g, '今年 x  →', b.x + b.s / 2, b.y + b.s + 60, 24, DIM, 'center', al);
      g.save(); g.translate(b.x - 44, b.y + b.s / 2); g.rotate(-Math.PI / 2); txt(g, '明年  →', 0, 0, 24, DIM, 'center', al); g.restore(); }
  }
  function curve(g, b, a, al, p, f) {
    if (al <= 0) return; p = p == null ? 1 : p; f = f || LG; g.save(); g.globalAlpha *= al; g.strokeStyle = GOLD; g.lineWidth = 4; g.shadowColor = GOLD; g.shadowBlur = 14;
    g.beginPath(); var N = 200; for (var i = 0; i <= N * p; i++) { var u = i / N, v = Math.min(1.0, f(a, u)); if (i) g.lineTo(gx(b, u), gy(b, v)); else g.moveTo(gx(b, u), gy(b, v)); }
    g.stroke(); g.restore();
  }
  function diag(g, b, al, p) {
    if (al <= 0) return; p = p == null ? 1 : p; g.save(); g.globalAlpha *= al; g.strokeStyle = BLUE; g.lineWidth = 3; g.shadowColor = BLUE; g.shadowBlur = 10;
    g.beginPath(); g.moveTo(gx(b, 0), gy(b, 0)); g.lineTo(gx(b, p), gy(b, p)); g.stroke(); g.restore();
  }
  function stepT(w, k) { var f = w.first || w.dt; return k === 0 ? w.t0 : w.t0 + f + (k - 1) * w.dt; }
  function stepD(w, k) { return k === 0 ? (w.first || w.dt) : w.dt; }
  function cobweb(g, b, w, t, al) {                           // vertical to the curve, then across to the diagonal
    if (al <= 0 || t < w.t0) return; var xs = orbit(LG, w.a, w.x0, w.n), tip = null;
    g.save(); g.globalAlpha *= al; g.lineWidth = w.n > 100 ? 1.6 : 2.6; g.strokeStyle = 'rgba(240,236,226,0.82)'; g.shadowColor = 'rgba(255,255,255,0.5)'; g.shadowBlur = 6;
    g.beginPath(); g.moveTo(gx(b, w.x0), gy(b, 0)); tip = [w.x0, 0];
    for (var k = 0; k < w.n; k++) {
      var t0 = stepT(w, k), d = stepD(w, k); if (t < t0) break;
      var u = (t - t0) / d, x = xs[k], y = xs[k + 1], ys = k === 0 ? 0 : x;
      var v1 = eo(Math.min(1, u * 2)), h1 = eo(Math.max(0, Math.min(1, u * 2 - 1)));
      tip = [x, ys + (y - ys) * v1]; g.lineTo(gx(b, tip[0]), gy(b, tip[1]));
      if (h1 > 0) { tip = [x + (y - x) * h1, y]; g.lineTo(gx(b, tip[0]), gy(b, tip[1])); }
    }
    g.stroke(); g.restore();
    glowDot(g, gx(b, w.x0), gy(b, 0), 7, BLUE, al);
    if (tip) glowDot(g, gx(b, tip[0]), gy(b, tip[1]), 8, '#ffffff', al);
  }
  function shown(w, t) {                                      // how many x_k are known at time t (x_{k+1} appears when step k reaches the curve)
    if (t < w.t0) return 0; var m = 1; for (var k = 0; k < w.n; k++) { if (t >= stepT(w, k) + stepD(w, k) * 0.5) m = k + 2; else break; } return m;
  }
  function seriesFrame(g, b, al, xlab, N) {
    if (al <= 0) return; line(g, b.x, b.y + b.h, b.x + b.w, b.y + b.h, 'rgba(200,210,230,0.45)', 2, al); line(g, b.x, b.y, b.x, b.y + b.h, 'rgba(200,210,230,0.45)', 2, al);
    line(g, b.x, b.y, b.x + b.w, b.y, 'rgba(200,210,230,0.1)', 1, al); line(g, b.x, b.y + b.h / 2, b.x + b.w, b.y + b.h / 2, 'rgba(200,210,230,0.1)', 1, al);
    mono(g, '1', b.x - 18, b.y + 7, 18, DIM, 'center', al); mono(g, '0', b.x - 18, b.y + b.h + 6, 18, DIM, 'center', al);
    txt(g, xlab || '第几年  →', b.x + b.w - 70, b.y + b.h + 40, 22, DIM, 'center', al);
    g.save(); g.translate(b.x - 46, b.y + b.h / 2); g.rotate(-Math.PI / 2); txt(g, '数量 x', 0, 0, 22, DIM, 'center', al); g.restore();
  }
  function seriesLine(g, b, xs, m, N, col, al, dots, lw) {
    if (al <= 0 || m < 1) return; g.save(); g.globalAlpha *= al; g.strokeStyle = col; g.lineWidth = lw || 2.6; g.shadowColor = col; g.shadowBlur = 10; g.beginPath();
    for (var k = 0; k < m && k < xs.length; k++) { var X = b.x + b.w * k / N, Y = b.y + b.h - xs[k] * b.h; if (k) g.lineTo(X, Y); else g.moveTo(X, Y); }
    g.stroke(); g.restore();
    if (dots !== false) for (var k = 0; k < m && k < xs.length; k++) glowDot(g, b.x + b.w * k / N, b.y + b.h - xs[k] * b.h, N > 80 ? 2.5 : 4.5, col, al);
  }
  function series(g, b, w, t, al) { var xs = orbit(LG, w.a, w.x0, w.n); seriesFrame(g, b, al); seriesLine(g, b, xs, shown(w, t), w.n, GOLD, al); }
  function websOf(key) { return TL.webs.filter(function (w) { return w.sc === key; }); }
  function aChip(g, a, al) { chip(g, GB.x + GB.s - 100, GB.y + 30, 'a = ' + a, BLUE, al, 28); }
  // the standard cobweb scene: curve morphs between the runs of the scene; series bottom-left
  function webScene(key, extra, opt) {
    opt = opt || {};
    return function (g, lt, L, sc) {
      var t = sc.s + lt, ws = websOf(key), i = 0; ws.forEach(function (w, k) { if (t >= w.t0 - 0.6) i = k; });
      var w = ws[i], pv = i > 0 ? ws[i - 1] : null, al = ap(lt, 0.05, 0.5);
      var aD = pv ? pv.a + (w.a - pv.a) * E((t - w.t0 + 0.6) / 0.6) : w.a;
      axes(g, GB, al); diag(g, GB, al, opt.diagP ? opt.diagP(lt, L) : 1); curve(g, GB, aD, al, opt.curveP ? opt.curveP(lt, L) : 1);
      if (pv && t < w.t0) cobweb(g, GB, pv, t, al * (1 - E((t - w.t0 + 0.6) / 0.5)));
      cobweb(g, GB, w, t, al);
      if (!opt.noChip) aChip(g, (Math.round(aD * 100) / 100).toString(), al * ap(lt, 0.2, 0.4));
      var sa = opt.seriesA ? opt.seriesA(lt, L) : al; if (sa > 0) { if (pv && t < w.t0) series(g, SB, pv, t, sa); else series(g, SB, w, t, sa); }
      if (extra) extra(g, lt, L, t, w, al);
    };
  }
  function levels(g, vals, cols, al, labs) {                 // dashed horizontal lines across the series panel at the attractor values
    vals.forEach(function (v, k) { var y = SB.y + SB.h - v * SB.h; g.save(); g.globalAlpha *= al; g.setLineDash([8, 8]); g.strokeStyle = cols || BLUE; g.lineWidth = 1.6; g.beginPath(); g.moveTo(SB.x, y); g.lineTo(SB.x + SB.w, y); g.stroke(); g.restore();
      if (labs) mono(g, v.toFixed(3), SB.x + SB.w - 8, y - 10, 20, BLUE, 'right', al); });
  }
  function attractor(a, n) { var x = 0.3; for (var i = 0; i < 4000; i++) x = LG(a, x); var s = []; for (var i = 0; i < n; i++) { x = LG(a, x); s.push(x); } s.sort(); var u = []; s.forEach(function (v) { if (!u.length || Math.abs(v - u[u.length - 1]) > 1e-4) u.push(v); }); return u; }
  function formula(g, x, y, size, al, hl) {                  // “明年 = a × x × (1 − x)”, parts lit by hl = {a, x, c}
    if (al <= 0) return; var parts = [['明年', INK], [' = ', DIM], ['a', hl && hl.a ? GOLD : INK], [' × ', DIM], ['x', hl && hl.x ? BLUE : INK], [' × ', DIM], ['(1 − x)', hl && hl.c ? RED : INK]];
    g.save(); g.globalAlpha *= al; g.font = '900 ' + size + 'px ' + SERIF; var W2 = 0; parts.forEach(function (p) { W2 += g.measureText(p[0]).width; });
    var cx = x - W2 / 2; g.textAlign = 'left'; g.shadowColor = 'rgba(0,0,0,0.85)'; g.shadowBlur = 14;
    parts.forEach(function (p) { var w = g.measureText(p[0]).width; g.fillStyle = p[1]; if (p[1] !== INK && p[1] !== DIM) { g.shadowColor = p[1]; g.shadowBlur = 24; } else { g.shadowColor = 'rgba(0,0,0,0.85)'; g.shadowBlur = 14; } g.fillText(p[0], cx, y); cx += w; });
    g.restore();
  }

  // ---------- scenes ----------
  var D = {};
  // title card: on screen from frame 0
  D.tt = function (g, lt) {
    g.save(); g.globalAlpha *= 0.2; g.drawImage(BIF, 160, 600, 1600, 400); g.restore();
    gtxt(g, '一个简单的公式，却无法预测', 960, 420, 96, '#f6dfae', 'center', 1);
    formula(g, 960, 550, 54, 1, null);
    mono(g, 'THE LOGISTIC MAP  ·  CHAOS', 960, 625, 22, 'rgba(220,210,190,0.8)', 'center', 1);
  };
  // hook: two runs that start 0.0000001 apart
  D.h0 = function (g, lt, L, sc) {
    var t = sc.s + lt, H = TL.hero, b = { x: 1010, y: 400, w: 780, h: 420 };
    var fa = ap(lt, L[0] - 0.2, 0.5) * (1 - ap(lt, L[6] + 0.6, 0.6));
    if (fa > 0) { card(g, 1080, 250, 640, 100, GOLD, fa); formula(g, 1400, 316, 40, fa, { a: 1 }); }
    var al = ap(lt, L[1] - 0.3, 0.5); if (al <= 0) return;
    var A = orbit(LG, H.a, 0.4, H.n), B = orbit(LG, H.a, 0.4000001, H.n), m = t < H.t0 ? 0 : Math.min(H.n + 1, Math.floor((t - H.t0) / H.dt) + 1);
    seriesFrame(g, b, al, '第几步  →'); chip(g, b.x + b.w - 70, b.y - 34, 'a = 3.9', BLUE, al, 24);
    var mb = t < H.t0 ? 0 : Math.min(H.n + 1, Math.floor((t - (L[2] + sc.s + 0.3)) / H.dt * 2) + 1);   // the second run is drawn fast to catch up
    mb = Math.min(mb, m);
    var dv = ap(lt, L[4] + 0.6, 0.4);
    if (dv > 0) { g.save(); g.globalAlpha *= dv * 0.18; g.fillStyle = RED; g.fillRect(b.x + b.w * 25 / H.n, b.y, b.w * 25 / H.n, b.h); g.restore(); mono(g, '第 25 步', b.x + b.w * 25 / H.n, b.y + b.h + 40, 20, RED, 'center', dv); }
    seriesLine(g, b, A, m, H.n, GOLD, al * 0.9, false, 7);           // wide gold underneath, thin blue on top: while they agree you see one line
    seriesLine(g, b, B, mb, H.n, BLUE, al, false, 2.6);
    txt(g, '从 0.4 出发', b.x + 20, b.y - 26, 24, GOLD, 'left', al, 900);
    txt(g, '从 0.4000001 出发', b.x + 210, b.y - 26, 24, BLUE, 'left', ap(lt, L[2], 0.4), 900);
    var q = ap(lt, L[6], 0.4); if (q > 0) txt(g, '没有随机 · 没有误差', b.x + b.w / 2, b.y + b.h + 90, 30, INK, 'center', q * (1 - ap(lt, L[7] + 2.5, 0.5)), 900);
  };
  // what the formula means: animals in a meadow
  D.model = function (g, lt, L) {
    var al = ap(lt, L[0], 0.5); if (al <= 0) return;
    formula(g, 1400, 330, 58, al, { x: lt > L[2], a: lt > L[3], c: lt > L[4] });
    var xNow = 0.4, seq = orbit(LG, 2.8, 0.1, 7), k6 = -1;
    if (lt > L[6]) { k6 = Math.min(7, Math.floor((lt - L[6] - 0.3) / 0.18)); xNow = seq[Math.max(0, k6)]; }
    var gx0 = 1080, gy0 = 470, cols = 15, rows = 6, cw = 42, n = Math.round(xNow * cols * rows), pa = ap(lt, L[1], 0.5);
    if (pa > 0) {
      g.save(); g.globalAlpha *= pa; rr(g, gx0 - 26, gy0 - 30, cols * cw + 32, rows * cw + 40, 16); g.strokeStyle = 'rgba(200,210,230,0.35)'; g.lineWidth = 2; g.setLineDash([10, 8]); g.stroke(); g.restore();
      txt(g, '最大容量', gx0 + cols * cw / 2 - 10, gy0 + rows * cw + 46, 24, DIM, 'center', pa);
      var crowd = ap(lt, L[4], 0.4) * (1 - ap(lt, L[5] + 0.5, 0.5));
      for (var i = 0; i < cols * rows; i++) { var cx = gx0 + (i % cols) * cw, cy = gy0 + Math.floor(i / cols) * cw, on = i < n;
        if (!on) { g.save(); g.globalAlpha *= pa * 0.25; g.fillStyle = 'rgba(200,210,230,0.5)'; g.beginPath(); g.arc(cx, cy, 4, 0, 6.29); g.fill(); g.restore(); continue; }
        var bob = Math.sin(lt * 3 + i) * 2, pulse = lt > L[3] && lt < L[4] ? 0.3 * Math.max(0, Math.sin((lt - L[3]) * 5 - i * 0.2)) : 0;
        glowDot(g, cx, cy + bob, 9 + 4 * pulse, crowd > 0.5 && i > cols * rows * 0.45 ? RED : BLUE, pa); }
      var xl = ap(lt, L[2], 0.4) * (1 - ap(lt, L[6], 0.3)); if (xl > 0) chip(g, 1400, gy0 - 72, 'x = 0.4：占最大容量的四成', BLUE, pa * xl, 24);
    }
    if (k6 >= 0) { g.save(); g.textAlign = 'center';
      for (var j = 0; j <= k6; j++) { var x = 1080 + j * 92, y = 880; txt(g, seq[j].toFixed(2), x, y, 30, j === k6 ? GOLD : INK, 'center', ap(lt, L[6] + 0.3 + j * 0.18, 0.15), 900); if (j) txt(g, '→', x - 46, y - 2, 22, DIM, 'center', 1); }
      g.restore(); mono(g, 'a = 2.8，从 0.1 开始', 1080 - 20, 930, 20, DIM, 'left', ap(lt, L[6] + 0.3, 0.3)); }
  };
  // the cobweb recipe
  D.web = webScene('s2', function (g, lt, L, t, w, al) {
    var c1 = ap(lt, L[2], 0.4) * (1 - ap(lt, L[4], 0.4)), c2 = ap(lt, L[3], 0.4) * (1 - ap(lt, L[4], 0.4));
    chip(g, 560, 660, '① 竖着走到曲线：明年', GOLD, c1, 28); chip(g, 560, 750, '② 横着走到斜线：明年变“今年”', BLUE, c2, 28);
  }, { curveP: function (lt, L) { return eo((lt - L[1]) / 1.0); }, diagP: function (lt, L) { return eo((lt - L[1] - 1.0) / 0.8); },
       seriesA: function (lt, L) { return ap(lt, L[4], 0.5); }, noChip: false });
  D.die = webScene('s3', function (g, lt, L, t, w, al) {
    var q = ap(lt, L[2], 0.4); if (q > 0) { arrow(g, SB.x + SB.w * 0.6, SB.y + SB.h - 120, SB.x + SB.w * 0.6, SB.y + SB.h - 14, RED, q, eo((lt - L[2]) / 0.5)); txt(g, '归零', SB.x + SB.w * 0.6 + 50, SB.y + SB.h - 60, 32, RED, 'left', q, 900); }
  });
  D.fix = webScene('s4', function (g, lt, L, t, w, al) {
    var xs = 1 - 1 / w.a, q = ap(lt, L[3], 0.4);
    if (q > 0) { var X = gx(GB, xs), Y = gy(GB, xs); g.save(); g.globalAlpha *= q; g.strokeStyle = GOLD; g.lineWidth = 3; g.shadowColor = GOLD; g.shadowBlur = 16; g.beginPath(); g.arc(X, Y, 22 + 4 * Math.sin(lt * 4), 0, 6.29); g.stroke(); g.restore();
      chip(g, X - 150, Y - 64, '不动点', GOLD, ap(lt, L[5], 0.4), 30); }
    var lv = ap(lt, L[0] + 2.2, 0.4); if (lv > 0) levels(g, [xs], GOLD, lv * 0.8, true);
  });
  // why it settles: the slope at the crossing
  D.slope = function (g, lt, L, sc) {
    var al = ap(lt, 0.05, 0.5), a = 2.8;
    if (lt > L[5]) a = 2.8 + 0.5 * E((lt - L[5]) / 0.8);
    if (lt > L[6]) a = 3.3 - 1.8 * E((lt - L[6]) / 0.8) + 2.3 * E((lt - L[6] - 1.0) / 2.6);
    var xs = 1 - 1 / a, s = 2 - a, mag = Math.abs(s), col = mag < 1 ? GOLD : RED;
    axes(g, GB, al); diag(g, GB, al); curve(g, GB, a, al); aChip(g, a.toFixed(2), al);
    var q = ap(lt, L[1], 0.5);
    if (q > 0) { var d = 0.17, X0 = gx(GB, xs - d), Y0 = gy(GB, xs - d * s), X1 = gx(GB, xs + d), Y1 = gy(GB, xs + d * s);
      line(g, X0, Y0, X1, Y1, col, 6, q); glowDot(g, gx(GB, xs), gy(GB, xs), 9, col, q);
      chip(g, gx(GB, xs) + (s < 0 ? 150 : -170), gy(GB, xs) - 70, '陡度 ' + mag.toFixed(1), col, q, 30); }
    // deviation bars: × 0.8 (shrinks), then × 1.3 (grows)
    var b = ap(lt, L[2], 0.5); if (b <= 0) return;
    seriesFrame(g, { x: SB.x, y: SB.y, w: SB.w, h: SB.h }, 0, ''); line(g, SB.x, SB.y + SB.h, SB.x + SB.w, SB.y + SB.h, 'rgba(200,210,230,0.45)', 2, b);
    var grow = lt > L[5], f = grow ? 1.3 : 0.8, t0 = grow ? L[5] + 0.2 : L[2] + 0.4, n = 12;
    var shownN = Math.min(n, Math.floor((lt - t0) / 0.32) + 1), fade = grow ? 1 : 1 - ap(lt, L[5] - 0.2, 0.3);
    for (var k = 0; k < shownN; k++) { var h = Math.min(SB.h - 10, 140 * Math.pow(f, k) * (grow ? 0.5 : 1.4)); var x = SB.x + 40 + k * 66;
      g.save(); g.globalAlpha *= b * fade * ap(lt, t0 + k * 0.32, 0.15); g.fillStyle = grow ? RED : GOLD; g.shadowColor = g.fillStyle; g.shadowBlur = 12; g.fillRect(x, SB.y + SB.h - h, 30, h); g.restore(); }
    txt(g, '偏差', SB.x - 10, SB.y - 20, 26, DIM, 'left', b);
    txt(g, grow ? '每一步 × 1.3：越来越大' : '每一步 × 0.8：越来越小', SB.x + SB.w, SB.y - 20, 28, grow ? RED : GOLD, 'right', b * ap(lt, grow ? L[5] : L[3], 0.4), 900);
    if (lt > L[6]) txt(g, mag < 1 ? '稳' : '不稳', GB.x + 80, GB.y + 60, 40, col, 'center', ap(lt, L[6] + 0.3, 0.3), 900);
  };
  D.p2 = webScene('s6', function (g, lt, L, t, w, al) {
    var q = ap(lt, L[4], 0.5); if (q > 0) levels(g, attractor(3.2, 16), BLUE, q, true);
  });
  D.p4 = webScene('s7', function (g, lt, L, t, w, al) {
    var q = ap(lt, L[1], 0.5) * (1 - ap(lt, L[2] - 0.2, 0.3)); if (q > 0) levels(g, attractor(3.5, 32), BLUE, q * 0.8, false);
    var r = ap(lt, L[2] + 1.2, 0.5); if (r > 0) levels(g, attractor(3.55, 64), BLUE, r * 0.6, false);
  });
  D.chaos = webScene('s8', function (g, lt, L, t, w, al) {
    var q = ap(lt, L[1], 0.5); if (q > 0) txt(g, '永不重复', SB.x + SB.w, SB.y - 20, 30, RED, 'right', q, 900);
  });
  // tease: every a on one picture
  D.ask = function (g, lt, L) {
    var al = ap(lt, 0.05, 0.5), x0 = 260, x1 = 1660, y = 860;
    line(g, x0, y, x1, y, 'rgba(200,210,230,0.5)', 2, al);
    [2.5, 3, 3.5, 4].forEach(function (a) { var x = x0 + (x1 - x0) * (a - 2.5) / 1.5; line(g, x, y - 8, x, y + 8, 'rgba(200,210,230,0.6)', 2, al); mono(g, String(a), x, y + 40, 22, DIM, 'center', al); });
    txt(g, 'a', x1 + 40, y + 8, 30, BLUE, 'center', al, 900);
    var p = cl((lt - 0.4) / (L[1] + 1.6)), xm = x0 + (x1 - x0) * p;
    g.save(); g.globalAlpha *= al * 0.9; g.beginPath(); g.rect(x0, 420, xm - x0, 440); g.clip(); g.globalAlpha *= 0.55; g.filter = 'blur(6px)'; g.drawImage(BIF, x0, 420, x1 - x0, 430); g.restore();
    glowDot(g, xm, y, 10, BLUE, al);
    gtxt(g, '?', 960, 640, 160, 'rgba(240,189,92,0.85)', 'center', ap(lt, L[1] + 0.6, 0.5));
  };
  // the bifurcation diagram
  var BX = { x: 160, y: 470, w: 1600, h: 470 };
  function aX(a) { return BX.x + BX.w * (a - 2.5) / 1.5; }
  D.bif = function (g, lt, L) {
    var al = ap(lt, 0.0, 0.4);
    line(g, BX.x, BX.y + BX.h, BX.x + BX.w, BX.y + BX.h, 'rgba(200,210,230,0.5)', 2, al); line(g, BX.x, BX.y, BX.x, BX.y + BX.h, 'rgba(200,210,230,0.5)', 2, al);
    [2.5, 3, 3.5, 4].forEach(function (a) { mono(g, String(a), aX(a), BX.y + BX.h + 32, 22, DIM, 'center', al); });
    mono(g, '1', BX.x - 22, BX.y + 8, 20, DIM, 'center', al); mono(g, '0', BX.x - 22, BX.y + BX.h + 6, 20, DIM, 'center', al);
    txt(g, '繁殖力 a  →', BX.x + BX.w - 90, BX.y + BX.h + 70, 24, BLUE, 'center', al, 900);
    var ar = 2.5;                                               // revealed up to a = ar
    var keys = [[L[1], 2.95], [L[2], 3.2], [L[3], 3.5], [L[4], 3.566], [L[5], 4.0]];
    keys.forEach(function (k, i) { var prev = i ? keys[i - 1][1] : 2.5; if (lt > k[0]) ar = prev + (k[1] - prev) * eo((lt - k[0]) / (i === 4 ? 0.9 : 1.2)); });
    if (lt > L[0]) ar = Math.max(ar, 2.5 + 0.12 * eo((lt - L[0]) / 1.0));
    g.save(); g.beginPath(); g.rect(BX.x, BX.y - 10, aX(ar) - BX.x, BX.h + 20); g.clip(); g.globalAlpha *= al; g.drawImage(BIF, BX.x, BX.y, BX.w, BX.h);
    g.globalCompositeOperation = 'lighter'; g.globalAlpha *= 0.35; g.filter = 'blur(4px)'; g.drawImage(BIF, BX.x, BX.y, BX.w, BX.h); g.restore();
    if (ar < 4) { line(g, aX(ar), BX.y, aX(ar), BX.y + BX.h, 'rgba(134,182,255,0.6)', 2, al); }
    [[L[2] + 0.5, 3.0, '3'], [L[3] + 0.5, 3.449, '3.45']].forEach(function (m) { var q = ap(lt, m[0], 0.3) * (1 - ap(lt, L[6], 0.5)); if (q <= 0) return;
      g.save(); g.globalAlpha *= q; g.setLineDash([6, 8]); g.strokeStyle = GOLD; g.lineWidth = 2; g.beginPath(); g.moveTo(aX(m[1]), BX.y + 40); g.lineTo(aX(m[1]), BX.y + BX.h); g.stroke(); g.restore(); chip(g, aX(m[1]), BX.y + 18, m[2], GOLD, q, 22); });
    var w6 = ap(lt, L[6], 0.5); if (w6 > 0) { [3.63, 3.74, 3.83].forEach(function (a, i) { var q = w6 * ap(lt, L[6] + 0.3 * i, 0.3); g.save(); g.globalAlpha *= q * (0.5 + 0.3 * Math.sin(lt * 4 + i)); g.fillStyle = BLUE; g.fillRect(aX(a) - 3, BX.y, i === 2 ? 22 : 8, BX.h); g.restore(); }); }
    var w7 = ap(lt, L[7], 0.5); if (w7 > 0) { var X = aX(3.835); chip(g, X, BX.y - 30, '周期 3', BLUE, w7, 26);
      attractor(3.835, 30).forEach(function (v) { glowDot(g, X, BX.y + BX.h - v * BX.h, 7, '#ffffff', w7); }); }
  };
  // why we cannot predict: the gap doubles every step
  D.sens = function (g, lt, L, sc) {
    var t = sc.s + lt, al = ap(lt, 0.05, 0.5), b2 = { x: 1180, y: 330, s: 480 };
    var c1 = al * (1 - ap(lt, L[3] - 0.2, 0.4));
    if (c1 > 0) { axes(g, b2, c1, false); diag(g, b2, c1 * 0.6); curve(g, b2, 4, c1); chip(g, b2.x + b2.s - 80, b2.y + 24, 'a = 4', BLUE, c1, 24);
      var st = ap(lt, L[2], 0.5);
      if (st > 0) { g.save(); g.globalAlpha *= c1 * st; g.strokeStyle = RED; g.lineWidth = 8; g.shadowColor = RED; g.shadowBlur = 18;
        [[0, 0.375], [0.625, 1]].forEach(function (r) { g.beginPath(); for (var i = 0; i <= 60; i++) { var u = r[0] + (r[1] - r[0]) * i / 60; if (i) g.lineTo(gx(b2, u), gy(b2, LG(4, u))); else g.moveTo(gx(b2, u), gy(b2, LG(4, u))); } g.stroke(); }); g.restore();
        chip(g, b2.x + b2.s / 2, b2.y + b2.s + 50, '红色：陡度大于 1', RED, c1 * st, 26); }
    }
    // the gap on a log ladder, from 10⁻⁷ up to 1
    var c2 = ap(lt, L[3], 0.5) * (1 - ap(lt, L[7] - 0.2, 0.4));
    if (c2 > 0) {
      var x0 = 1060, x1 = 1760, yb = 900, yt = 330, A = 0.4, B = 0.4000001, gaps = [1e-7];
      for (var k = 0; k < 24; k++) { A = LG(4, A); B = LG(4, B); gaps.push(Math.max(1e-7, Math.abs(A - B))); }
      line(g, x0, yb, x1, yb, 'rgba(200,210,230,0.5)', 2, c2); line(g, x0, yt, x0, yb, 'rgba(200,210,230,0.5)', 2, c2);
      ['0.0000001', '0.00001', '0.001', '0.1'].forEach(function (s, i) { var y = yb - (yb - yt) * (i * 2) / 7; mono(g, s, x0 - 14, y + 6, 18, DIM, 'right', c2); line(g, x0, y, x1, y, 'rgba(200,210,230,0.08)', 1, c2); });
      txt(g, '两个起点的差距', x0 + 10, yt - 24, 26, DIM, 'left', c2, 700);
      var C = TL.counters.filter(function (c) { return c.label === '算了几步'; })[0], m = 0;
      if (C) m = t < C.t0 ? 0 : Math.min(21, Math.floor(21 * (t - C.t0) / (C.t1 - C.t0)) + 1);
      for (var k = 0; k <= Math.min(m, 21); k++) { var lg = (Math.log10(gaps[k]) + 7) / 7, h = Math.max(4, (yb - yt) * Math.min(1, lg)); var x = x0 + 16 + k * 31;
        g.save(); g.globalAlpha *= c2; g.fillStyle = k >= 19 ? RED : GOLD; g.shadowColor = g.fillStyle; g.shadowBlur = 10; g.fillRect(x, yb - h, 20, h); g.restore(); }
      var q = ap(lt, L[4], 0.4); if (q > 0) txt(g, '每一步 ≈ × 2', x0 + 40, yt + 40, 34, RED, 'left', q * c2, 900);
    }
    // 15 decimal places
    var c3 = ap(lt, L[7], 0.5);
    if (c3 > 0) { var s = '0.400000000000000', n = Math.min(15, Math.floor((lt - L[8] - 0.2) / 0.09) + 1); g.save(); g.globalAlpha *= c3; g.font = '700 64px ' + MONO; g.textAlign = 'left';
      var x = 1000, y = 600; g.fillStyle = INK; g.fillText('0.', x, y); var w0 = g.measureText('0.').width, cw = g.measureText('0').width;
      for (var i = 0; i < 15; i++) { g.fillStyle = i < n && lt > L[8] ? RED : 'rgba(236,230,218,0.75)'; if (i === 0) g.fillStyle = i < n && lt > L[8] ? RED : INK; g.fillText(s[2 + i], x + w0 + i * cw, y); }
      g.restore(); txt(g, '起点要精确到这么多位，才能算准第 50 步', 1380, 690, 28, DIM, 'center', ap(lt, L[8] + 0.4, 0.4), 700);
      var c4 = ap(lt, L[9], 0.4); if (c4 > 0) chip(g, 1380, 800, '电脑常用的数：约 16 位有效数字', BLUE, c4, 28); }
  };
  // Feigenbaum: the forks shrink by the same ratio, and the sine map does it too
  var FX = { x: 150, y: 470, w: 840, h: 440 }, SX = { x: 1120, y: 470, w: 640, h: 440 };
  function fX(a) { return FX.x + FX.w * (a - 2.9) / 0.7; }
  D.feig = function (g, lt, L) {
    var al = ap(lt, 0.05, 0.5);
    g.save(); g.globalAlpha *= al; g.drawImage(BIFZ, FX.x, FX.y, FX.w, FX.h); g.globalCompositeOperation = 'lighter'; g.globalAlpha *= 0.3; g.filter = 'blur(3px)'; g.drawImage(BIFZ, FX.x, FX.y, FX.w, FX.h); g.restore();
    line(g, FX.x, FX.y + FX.h, FX.x + FX.w, FX.y + FX.h, 'rgba(200,210,230,0.5)', 2, al);
    txt(g, '拱形曲线', FX.x + 10, FX.y - 20, 26, GOLD, 'left', al, 900);
    var pts = [3.0, 3.44949, 3.54409, 3.56441], names = ['第 1 段', '第 2 段', '第 3 段'], yb = FX.y + FX.h + 34;
    for (var i = 0; i < 3; i++) { var q = ap(lt, L[1] + 0.5 + i * 0.6, 0.4); if (q <= 0) continue; var xa = fX(pts[i]), xb = fX(pts[i + 1]);
      g.save(); g.globalAlpha *= q; g.strokeStyle = [GOLD, BLUE, RED][i]; g.lineWidth = 3; g.shadowColor = g.strokeStyle; g.shadowBlur = 10; g.beginPath(); g.moveTo(xa, yb - 10); g.lineTo(xa, yb); g.lineTo(xb, yb); g.lineTo(xb, yb - 10); g.stroke();
      g.setLineDash([5, 7]); g.lineWidth = 1.5; g.globalAlpha *= 0.6; g.beginPath(); g.moveTo(xa, FX.y + 30); g.lineTo(xa, yb - 10); g.stroke(); g.restore();
      if (i < 2) txt(g, names[i], (xa + xb) / 2, yb + 34, 22, [GOLD, BLUE, RED][i], 'center', q, 900); }
    var s4 = ap(lt, L[4], 0.6);
    if (s4 > 0) { g.save(); g.globalAlpha *= s4; g.drawImage(BIFS, SX.x + (1 - s4) * 60, SX.y, SX.w, SX.h); g.restore(); line(g, SX.x, SX.y + SX.h, SX.x + SX.w, SX.y + SX.h, 'rgba(200,210,230,0.5)', 2, s4);
      txt(g, '正弦曲线的一段', SX.x + 10, SX.y - 20, 26, BLUE, 'left', s4, 900);
      var mini = { x: SX.x + 24, y: SX.y + 24, s: 150 }; g.save(); g.globalAlpha *= s4 * 0.9; rr(g, mini.x - 12, mini.y - 12, mini.s + 24, mini.s + 24, 10); g.fillStyle = 'rgba(8,12,20,0.85)'; g.fill(); g.restore();
      curve(g, mini, 1, s4, 1, SN); }
  };
  // weather: two runs from 0.506127 and 0.506 (shape is illustrative)
  function wx(u, d) { return 0.5 + 0.22 * Math.sin(u * 9.1) + 0.12 * Math.sin(u * 23.7 + 1) + 0.06 * Math.sin(u * 51 + 2) + d * Math.exp(6 * (u - 0.95)) * (0.4 * Math.sin(u * 31 + 0.5) + 0.25 * Math.sin(u * 13)); }
  function sun(g, x, y, r, a) { if (a <= 0) return; glowDot(g, x, y, r, GOLD, a); g.save(); g.globalAlpha *= a; g.strokeStyle = GOLD; g.lineWidth = 4; for (var i = 0; i < 8; i++) { var an = i / 8 * 6.283; g.beginPath(); g.moveTo(x + Math.cos(an) * r * 1.5, y + Math.sin(an) * r * 1.5); g.lineTo(x + Math.cos(an) * r * 2.1, y + Math.sin(an) * r * 2.1); g.stroke(); } g.restore(); }
  function storm(g, x, y, r, a, lt) { if (a <= 0) return; g.save(); g.globalAlpha *= a; g.fillStyle = 'rgba(150,165,190,0.95)';
    [[-0.6, 0.1, 0.55], [0, -0.2, 0.75], [0.6, 0.1, 0.55], [0, 0.25, 0.6]].forEach(function (c) { g.beginPath(); g.arc(x + c[0] * r, y + c[1] * r, c[2] * r, 0, 6.29); g.fill(); });
    var fl = Math.sin(lt * 9) > 0.6 ? 1 : 0.4; g.strokeStyle = GOLD; g.lineWidth = 5; g.shadowColor = GOLD; g.shadowBlur = 20 * fl; g.globalAlpha *= fl;
    g.beginPath(); g.moveTo(x, y + r * 0.6); g.lineTo(x - r * 0.25, y + r * 1.1); g.lineTo(x + r * 0.1, y + r * 1.1); g.lineTo(x - r * 0.15, y + r * 1.6); g.stroke(); g.restore(); }
  D.weather = function (g, lt, L, sc) {
    var al = ap(lt, L[1], 0.5), b = { x: 1000, y: 380, w: 720, h: 400 }; if (al <= 0) return;
    var p = eo((lt - L[3]) / 6.5); if (lt < L[3]) p = 0;
    line(g, b.x, b.y + b.h, b.x + b.w, b.y + b.h, 'rgba(200,210,230,0.45)', 2, al); txt(g, '时间  →', b.x + b.w - 50, b.y + b.h + 40, 22, DIM, 'center', al);
    g.save(); g.translate(b.x - 40, b.y + b.h / 2); g.rotate(-Math.PI / 2); txt(g, '气温', 0, 0, 22, DIM, 'center', al); g.restore();
    [[0, GOLD], [1, BLUE]].forEach(function (r) { if (p <= 0) return; g.save(); g.globalAlpha *= al; g.strokeStyle = r[1]; g.lineWidth = 3.5; g.shadowColor = r[1]; g.shadowBlur = 12; g.beginPath();
      for (var i = 0; i <= 240 * p; i++) { var u = i / 240, X = b.x + b.w * u, Y = b.y + b.h - b.h * cl(wx(u, r[0])); if (i) g.lineTo(X, Y); else g.moveTo(X, Y); } g.stroke(); g.restore(); });
    var lab = ap(lt, L[4], 0.4); txt(g, '0.506127', b.x + 10, b.y - 50, 28, GOLD, 'left', lab, 900); txt(g, '0.506', b.x + 210, b.y - 50, 28, BLUE, 'left', lab, 900);
    var ic = ap(lt, L[5] + 0.4, 0.5); sun(g, b.x + b.w + 70, b.y + 60, 26, ic); storm(g, b.x + b.w + 70, b.y + b.h - 120, 46, ic, lt);
    var wk = ap(lt, L[7], 0.4); if (wk > 0) chip(g, b.x + b.w / 2, b.y + b.h + 90, '超过一两周，很难算准', RED, wk, 28);
    note(g, '曲线为示意', al);
  };
  D.end = function (g, lt, L) {
    var al = ap(lt, 0.05, 0.8), k = 1 + 0.04 * lt / 12;
    g.save(); g.globalAlpha *= al * 0.35; g.translate(960, 640); g.scale(k, k); g.drawImage(BIF, -800, -235, 1600, 470); g.restore();
    var fa = ap(lt, L[0] + 0.3, 0.6); card(g, 1010, 470, 760, 140, GOLD, fa * 0.9); formula(g, 1390, 562, 60, fa, { a: lt > L[3], x: lt > L[3], c: lt > L[3] });
  };
  // ---------- chapter card, recap, sources ----------
  function chapCard(g, sc, lt, c) {
    var d = lt, cx = 960, cy = 500;
    g.save();
    var w = 900 * eo((lt + 0.2) / 0.9); g.strokeStyle = 'rgba(240,189,92,0.5)'; g.lineWidth = 1.5; g.shadowColor = '#f0bd5c'; g.shadowBlur = 12;
    g.beginPath(); g.moveTo(cx - w / 2, cy + 92); g.lineTo(cx + w / 2, cy + 92); g.stroke(); g.shadowBlur = 0;
    var k = d < 0.16 ? 1.9 - 0.9 * eo(d / 0.16) : 1 + 0.02 * (d - 0.16);
    g.save(); g.globalAlpha *= Math.min(1, d / 0.05); g.translate(cx, cy); g.scale(k, k); g.textAlign = 'center';
    g.font = '900 190px ' + SERIF; g.fillStyle = '#f6dfae'; g.shadowColor = 'rgba(240,180,80,0.85)'; g.shadowBlur = 40;
    if (g.letterSpacing !== undefined) g.letterSpacing = '24px'; g.fillText(c.word, 12, 60); if (g.letterSpacing !== undefined) g.letterSpacing = '0px'; g.restore();
    if (d < 0.6) { g.save(); g.globalAlpha *= 1 - d / 0.6; g.strokeStyle = 'rgba(255,214,140,0.8)'; g.lineWidth = 3;
      for (var i = 0; i < 18; i++) { var an = i / 18 * 6.283, r0 = 230 + d * 520, r1 = r0 + 50 + 40 * rnd(i); g.beginPath(); g.moveTo(cx + Math.cos(an) * r0, cy + Math.sin(an) * r0 * 0.55); g.lineTo(cx + Math.cos(an) * r1, cy + Math.sin(an) * r1 * 0.55); g.stroke(); }
      g.restore(); }
    for (var i = 0; i < 60; i++) { var an = rnd(i + 3) * 6.283, sp = 80 + 380 * rnd(i + 7), dd = Math.min(d, 2.2), x = cx + Math.cos(an) * sp * eo(dd / 2.2), y = cy + Math.sin(an) * sp * 0.6 * eo(dd / 2.2) - 30 * dd;
      g.fillStyle = 'rgba(255,210,140,' + (0.8 * (1 - dd / 2.2)).toFixed(3) + ')'; g.fillRect(x, y, 2.5, 2.5); }
    g.textAlign = 'center';
    g.globalAlpha = E((lt + 0.1) / 0.5); g.font = '700 30px ' + SERIF; g.fillStyle = 'rgba(240,200,130,0.85)'; if (g.letterSpacing !== undefined) g.letterSpacing = '10px'; g.fillText(c.n, cx + 5, cy - 150);
    g.globalAlpha = E((lt - 0.5) / 0.5) * 0.85; g.font = '500 26px ' + MONO; g.fillStyle = 'rgba(220,210,190,0.85)'; if (g.letterSpacing !== undefined) g.letterSpacing = '14px'; g.fillText(c.en, cx + 7, cy + 150);
    if (g.letterSpacing !== undefined) g.letterSpacing = '0px';
    var p = E((lt - 0.8) / 0.5); g.globalAlpha = p; g.font = '700 40px ' + SERIF; g.fillStyle = '#ece6da'; g.shadowColor = 'rgba(0,0,0,0.9)'; g.shadowBlur = 12;
    g.filter = p < 1 ? 'blur(' + ((1 - p) * 8).toFixed(1) + 'px)' : 'none'; g.fillText(c.line, cx, cy + 236); g.filter = 'none';
    g.restore();
  }
  var NODES = [['停', '停住', 'a < 3 · 不动点'], ['跳', '来回跳', 'a = 3.2 · 周期 2'], ['分', '不断分叉', '周期 4、8、16……'], ['乱', '混沌', 'a > 3.57 · 无法预测']];
  function recap(g, sc, lt) {
    var xs = [420, 790, 1160, 1530], y = 600;
    g.save(); var w = 1240 * eo((lt - 0.2) / (sc.ls[3] + 0.6));
    g.strokeStyle = 'rgba(240,189,92,0.6)'; g.lineWidth = 2; g.shadowColor = '#f0bd5c'; g.shadowBlur = 10; g.beginPath(); g.moveTo(360, y); g.lineTo(360 + w, y); g.stroke(); g.shadowBlur = 0;
    NODES.forEach(function (n, k) {
      var p = cl((lt - sc.ls[k] - 0.1) / 0.5); if (p <= 0) return; var x = xs[k], col = k === 3 ? RED : GOLD;
      g.globalAlpha = p; g.fillStyle = col; g.shadowColor = col; g.shadowBlur = 16; g.beginPath(); g.arc(x, y, 9, 0, 6.29); g.fill(); g.shadowBlur = 0;
      g.strokeStyle = rgba(col, 0.8 * (1 - p)); g.beginPath(); g.arc(x, y, 9 + 40 * p, 0, 6.29); g.stroke();
      g.textAlign = 'center'; g.font = '900 96px ' + SERIF; g.fillStyle = k === 3 ? '#ffc9bd' : '#f6dfae'; g.shadowColor = rgba(col, 0.7); g.shadowBlur = 24; g.fillText(n[0], x, y - 44); g.shadowBlur = 0;
      g.font = '700 30px ' + SERIF; g.fillStyle = '#ece6da'; g.fillText(n[1], x, y + 62); g.font = '500 20px ' + MONO; g.fillStyle = 'rgba(200,190,170,0.8)'; g.fillText(n[2], x, y + 98);
    });
    var tp = E((lt - sc.ls[3] - 1.6) / 0.8);
    if (tp > 0) { g.globalAlpha = tp; g.font = '900 56px ' + SERIF; g.shadowColor = 'rgba(0,0,0,0.9)'; g.shadowBlur = 14;
      var s1 = '一个简单的公式，却', s2 = '无法预测', s3 = '', w1 = g.measureText(s1).width, w2 = g.measureText(s2).width, w3 = g.measureText(s3).width, x0 = 960 - (w1 + w2 + w3) / 2;
      g.textAlign = 'left'; g.fillStyle = '#ece6da'; g.fillText(s1, x0, 860); g.fillStyle = GOLD; g.fillText(s2, x0 + w1, 860); g.fillStyle = '#ece6da'; g.fillText(s3, x0 + w1 + w2, 860); }
    g.restore();
  }
  function sources(g, sc, lt) {
    g.save(); g.textAlign = 'left';
    TL.src.forEach(function (s, k) {
      var p = E((lt - 0.2 - k * 0.1) / 0.4); if (p <= 0) return; var col = k < 5 ? 0 : 1, row = k % 5, x = 200 + col * 820, y = 280 + row * 112;
      g.globalAlpha = p; g.font = '700 28px ' + SERIF; g.fillStyle = '#ece6da'; g.fillText(s[0], x, y);
      g.font = '500 19px ' + MONO; g.fillStyle = 'rgba(190,195,205,0.75)'; g.fillText(s[1], x, y + 36);
      g.fillStyle = 'rgba(240,189,92,0.6)'; g.fillRect(x - 22, y - 22, 3, 60);
    });
    g.globalAlpha = E((lt - 1.2) / 0.5); g.textAlign = 'center'; g.font = '700 26px ' + SERIF; g.fillStyle = '#ece6da'; g.fillText('文中曲线、蛛网图、分岔图都由公式实时计算 · 天气曲线为示意', 960, 930);
    g.restore();
  }
  function drawScene(g, i, lt, alpha) {
    if (alpha <= 0) return; var sc = SCN[i];
    g.save(); g.globalAlpha = alpha;
    if (sc.k === 'chap') chapCard(g, sc, lt, TL.chaps.filter(function (c) { return Math.abs(c.s - sc.s) < 0.01; })[0]);
    else if (sc.k === 'recap') recap(g, sc, lt);
    else if (sc.k === 'src') sources(g, sc, lt);
    else if (D[sc.draw]) D[sc.draw](g, lt, sc.ls, sc);
    g.restore();
  }
  window.SCENE = function (g, t) {
    var i = 0; for (var k = 0; k < SCN.length; k++) if (t >= SCN[k].s) i = k;
    var sc = SCN[i], lt = t - sc.s, X = (sc.k === 'chap' || (i > 0 && SCN[i - 1].k === 'chap')) ? 0.25 : 0.5;
    if (i > 0 && lt < X) { var p = E(lt / X); var pv = SCN[i - 1]; drawScene(g, i - 1, pv.e - pv.s, 1 - p); drawScene(g, i, lt, p); }
    else drawScene(g, i, lt, 1);
    var hasText = TL.groups.some(function (gr) { return t >= gr.s && t < gr.e; });
    if (hasText) { var sg = g.createRadialGradient(300, 160, 40, 300, 180, 820); sg.addColorStop(0, 'rgba(5,7,12,0.55)'); sg.addColorStop(1, 'rgba(5,7,12,0)'); g.fillStyle = sg; g.fillRect(-60, -60, 1300, 800); }
  };
})();
