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

