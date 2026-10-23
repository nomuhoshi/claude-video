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

  function hbar(g, x, y, w, h, col, a, glow) { if (a <= 0 || w === 0) return; g.save(); g.globalAlpha *= a; g.fillStyle = col; g.shadowColor = col; g.shadowBlur = glow == null ? 12 : glow; if (w > 0) g.fillRect(x, y, w, h); else g.fillRect(x + w, y, -w, h); g.restore(); }
  function check(g, x, y, on, col, a) { if (a <= 0) return; g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = 3; g.strokeRect(x - 16, y - 16, 32, 32);
    if (on > 0) { g.lineWidth = 5; g.shadowColor = col; g.shadowBlur = 12; g.beginPath(); g.moveTo(x - 9, y); g.lineTo(x - 2, y + 8 * Math.min(1, on * 2)); if (on > 0.5) g.lineTo(x - 2 + 13 * (on - 0.5) * 2, y + 8 - 18 * (on - 0.5) * 2); g.stroke(); } g.restore(); }
  function rackIcon(g, x, y, h, t, a) { if (a <= 0) return; g.save(); g.globalAlpha *= a; var w = h * 0.45; g.fillStyle = '#141d31'; g.fillRect(x - w / 2, y - h / 2, w, h); g.strokeStyle = 'rgba(200,215,240,0.7)'; g.lineWidth = 3; g.strokeRect(x - w / 2, y - h / 2, w, h);
    for (var i = 0; i < 8; i++) { var yy = y - h / 2 + 10 + i * (h - 20) / 8; g.fillStyle = 'rgba(40,56,90,0.9)'; g.fillRect(x - w / 2 + 8, yy, w - 16, (h - 20) / 8 - 5); g.fillStyle = rnd(i + Math.floor(t * 3)) > 0.4 ? GOLD : BLUE; g.fillRect(x - w / 2 + 14, yy + 6, 5, 4); } g.restore(); }
  // ---------- PHP props ----------
  var CODE = ['<?php', '$order = $_POST[\'menu\'];', 'session_start();', 'echo render($page);', 'if ($user) { ... }', 'include \'kitchen.php\';', '$db->query($sql);', 'return $html;'];
  function codeWall(g, x, y, w, h, a, t, crack) {                  // faint rows of code, optional red crack
    if (a <= 0) return; g.save(); g.globalAlpha *= a; g.beginPath(); g.rect(x, y, w, h); g.clip();
    g.font = '500 22px ' + MONO; g.textAlign = 'left';
    for (var r = 0; r < Math.ceil(h / 34); r++) { var s = CODE[r % CODE.length], off = (r * 137) % 220;
      g.fillStyle = 'rgba(134,182,255,' + (0.10 + 0.08 * rnd(r)).toFixed(3) + ')'; g.fillText(s + '    ' + CODE[(r + 3) % CODE.length] + '    ' + CODE[(r + 5) % CODE.length], x - off, y + 28 + r * 34); }
    if (crack > 0) { g.strokeStyle = RED; g.lineWidth = 4; g.shadowColor = RED; g.shadowBlur = 18; g.beginPath(); var px = x + w * 0.5, py = y; g.moveTo(px, py);
      var n = 12; for (var i = 1; i <= n * crack; i++) { px = x + w * 0.5 + (rnd(i * 7) - 0.5) * 160; py = y + h * i / n; g.lineTo(px, py); } g.stroke(); }
    g.restore();
  }
  function phone(g, x, y, w, h, a) {                              // (x, y) = top-left
    if (a <= 0) return; g.save(); g.globalAlpha *= a; rr(g, x, y, w, h, 44); g.fillStyle = '#0b1019'; g.fill(); g.strokeStyle = 'rgba(200,215,240,0.75)'; g.lineWidth = 4; g.shadowColor = BLUE; g.shadowBlur = 18; g.stroke(); g.shadowBlur = 0;
    rr(g, x + 14, y + 14, w - 28, h - 28, 32); var gr = g.createLinearGradient(0, y, 0, y + h); gr.addColorStop(0, '#16223a'); gr.addColorStop(1, '#0d1424'); g.fillStyle = gr; g.fill();
    g.fillStyle = '#05070c'; rr(g, x + w / 2 - 50, y + 22, 100, 24, 12); g.fill();
    g.font = '500 18px ' + MONO; g.fillStyle = 'rgba(220,225,235,0.8)'; g.textAlign = 'left'; g.fillText('22:41', x + 40, y + 42); g.restore();
  }
  function appIcon(g, cx, cy, s, col, label, a, off) {             // a rounded square app tile; off = 0..1 greys it out
    if (a <= 0) return; g.save(); g.globalAlpha *= a; var c = off > 0 ? 'rgb(' + [Math.round(70 + (parseInt(col.slice(1, 3), 16) - 70) * (1 - off)), Math.round(76 + (parseInt(col.slice(3, 5), 16) - 76) * (1 - off)), Math.round(88 + (parseInt(col.slice(5, 7), 16) - 88) * (1 - off))].join(',') + ')' : col;
    rr(g, cx - s / 2, cy - s / 2, s, s, s * 0.24); var gr = g.createLinearGradient(0, cy - s / 2, 0, cy + s / 2); gr.addColorStop(0, c); gr.addColorStop(1, 'rgba(0,0,0,0.35)');
    g.fillStyle = c; g.fill(); g.fillStyle = gr; g.fill(); g.shadowBlur = 0;
    g.font = '900 ' + Math.round(s * 0.24) + 'px ' + SERIF; g.textAlign = 'center'; g.fillStyle = off > 0.5 ? 'rgba(200,200,205,0.7)' : '#fff'; g.fillText(label, cx, cy + s * 0.09);
    g.font = '700 ' + Math.round(s * 0.2) + 'px ' + SERIF; g.fillStyle = 'rgba(225,230,240,0.85)'; g.fillText(label, cx, cy + s * 0.78);
    if (off > 0) { g.globalAlpha *= off; g.strokeStyle = RED; g.lineWidth = 5; g.beginPath(); g.arc(cx + s * 0.42, cy - s * 0.42, s * 0.16, 0, 6.29); g.fillStyle = RED; g.fill();
      g.strokeStyle = '#fff'; g.lineWidth = 4; g.beginPath(); g.moveTo(cx + s * 0.42 - 8, cy - s * 0.42); g.lineTo(cx + s * 0.42 + 8, cy - s * 0.42); g.stroke(); }
    g.restore();
  }
  function xcard(g, x, y, w, name, body, a, big) {                // a post card in the style of a social feed (no logo)
    if (a <= 0) return; var h = big ? 250 : 200; card(g, x, y, w, h, BLUE, a); avatar(g, x + 60, y + 62, 30, INK, a);
    txt(g, name, x + 110, y + 56, 28, INK, 'left', a, 900); mono(g, '10/21 晚 · X', x + 110, y + 90, 18, DIM, 'left', a);
    if (big) gtxt(g, body, x + w / 2, y + 190, 64, RED, 'center', a); else txt(g, body, x + 40, y + 160, 30, INK, 'left', a, 700);
  }
  function robot(g, cx, cy, s, a, t, col) {                       // a friendly AI head with scanning eyes
    if (a <= 0) return; col = col || GOLD; g.save(); g.globalAlpha *= a; g.translate(cx, cy); g.scale(s, s);
    g.strokeStyle = col; g.lineWidth = 6; g.shadowColor = col; g.shadowBlur = 24; rr(g, -110, -90, 220, 170, 40); g.fillStyle = 'rgba(20,26,40,0.95)'; g.fill(); g.stroke();
    g.beginPath(); g.moveTo(0, -90); g.lineTo(0, -130); g.stroke(); g.fillStyle = col; g.beginPath(); g.arc(0, -138, 10, 0, 6.29); g.fill();
    var sx = Math.sin(t * 2.2) * 14; g.fillStyle = col; g.beginPath(); g.arc(-45 + sx, -10, 18, 0, 6.29); g.arc(45 + sx, -10, 18, 0, 6.29); g.fill();
    g.lineWidth = 5; g.beginPath(); g.moveTo(-40, 40); g.quadraticCurveTo(0, 58, 40, 40); g.stroke(); g.restore();
  }
  function bug(g, cx, cy, s, a, col) {                             // a beetle = the vulnerability
    if (a <= 0) return; col = col || RED; g.save(); g.globalAlpha *= a; g.translate(cx, cy); g.scale(s, s); g.strokeStyle = col; g.fillStyle = rgba(col, 0.85); g.lineWidth = 5; g.shadowColor = col; g.shadowBlur = 18;
    for (var i = -1; i <= 1; i++) { g.beginPath(); g.moveTo(-26, i * 18); g.lineTo(-52, i * 24 - 8); g.stroke(); g.beginPath(); g.moveTo(26, i * 18); g.lineTo(52, i * 24 - 8); g.stroke(); }
    g.beginPath(); g.ellipse(0, 6, 30, 40, 0, 0, 6.29); g.fill(); g.beginPath(); g.arc(0, -40, 16, 0, 6.29); g.fill();
    g.beginPath(); g.moveTo(-6, -52); g.lineTo(-18, -72); g.moveTo(6, -52); g.lineTo(18, -72); g.stroke();
    g.strokeStyle = 'rgba(10,10,10,0.6)'; g.lineWidth = 3; g.beginPath(); g.moveTo(0, -30); g.lineTo(0, 46); g.stroke(); g.restore();
  }
  function shield(g, cx, cy, s, a, col) {
    if (a <= 0) return; col = col || BLUE; g.save(); g.globalAlpha *= a; g.translate(cx, cy); g.scale(s, s); g.strokeStyle = col; g.lineWidth = 7; g.shadowColor = col; g.shadowBlur = 22;
    g.beginPath(); g.moveTo(0, -80); g.lineTo(66, -54); g.quadraticCurveTo(64, 40, 0, 84); g.quadraticCurveTo(-64, 40, -66, -54); g.closePath(); g.fillStyle = rgba(col, 0.18); g.fill(); g.stroke();
    g.lineWidth = 8; g.beginPath(); g.moveTo(-26, 2); g.lineTo(-6, 24); g.lineTo(30, -20); g.stroke(); g.restore();
  }
  function kitchen(g, cx, cy, a, t, hot, intruder) {               // the server kitchen: counter, stove with flames, a pass window
    if (a <= 0) return; card(g, cx - 220, cy - 150, 440, 300, intruder > 0 ? RED : GOLD, a);
    txt(g, '后厨 · PHP', cx, cy - 100, 34, intruder > 0.5 ? RED : GOLD, 'center', a, 900);
    g.save(); g.globalAlpha *= a; g.fillStyle = '#2a3550'; g.fillRect(cx - 160, cy + 20, 320, 60); g.strokeStyle = 'rgba(200,215,240,0.5)'; g.lineWidth = 2; g.strokeRect(cx - 160, cy + 20, 320, 60);
    for (var k = 0; k < 3; k++) { var fx = cx - 100 + k * 100; for (var j = 0; j < 4; j++) { var fh = (18 + 12 * Math.sin(t * 9 + j * 1.7 + k)) * hot;
      g.fillStyle = j % 2 ? 'rgba(255,190,90,0.9)' : 'rgba(255,120,60,0.85)'; g.shadowColor = '#ffa040'; g.shadowBlur = 16; g.beginPath(); g.moveTo(fx - 14 + j * 7, cy + 20); g.quadraticCurveTo(fx - 10 + j * 7, cy + 20 - fh, fx - 6 + j * 7, cy + 20); g.fill(); } }
    g.shadowBlur = 0; g.restore();
    if (intruder > 0) { avatar(g, cx + 120 - 80 * intruder, cy - 20, 40, RED, a * Math.min(1, intruder * 2)); }
  }
  function gauge(g, cx, cy, r, v, a) {                              // 0..10 semicircle gauge, red from 9
    if (a <= 0) return; g.save(); g.globalAlpha *= a; g.lineWidth = 34; g.lineCap = 'butt';
    for (var k = 0; k < 10; k++) { var a0 = Math.PI + k / 10 * Math.PI, a1 = Math.PI + (k + 1) / 10 * Math.PI - 0.02;
      g.strokeStyle = k >= 9 ? rgba(RED, 0.9) : k >= 7 ? rgba('#f08a43', 0.8) : k >= 4 ? rgba(GOLD, 0.55) : rgba(BLUE, 0.45); g.beginPath(); g.arc(cx, cy, r, a0, a1); g.stroke(); }
    g.font = '500 24px ' + MONO; g.fillStyle = DIM; g.textAlign = 'center'; [0, 5, 10].forEach(function (n) { var an = Math.PI + n / 10 * Math.PI; g.fillText(String(n), cx + Math.cos(an) * (r + 50), cy + Math.sin(an) * (r + 50) + 8); });
    var an = Math.PI + v / 10 * Math.PI; g.strokeStyle = INK; g.lineWidth = 7; g.shadowColor = RED; g.shadowBlur = 20; g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx + Math.cos(an) * (r - 40), cy + Math.sin(an) * (r - 40)); g.stroke();
    g.fillStyle = INK; g.beginPath(); g.arc(cx, cy, 14, 0, 6.29); g.fill(); g.restore();
  }
  function rowStamp(g, x, y, w, cat, names, a, st, col) {
    if (a <= 0) return; card(g, x, y, w, 112, col || BLUE, a); chip(g, x + 76, y + 56, cat, col || BLUE, a, 28);
    txt(g, names, x + 150, y + 66, 30, INK, 'left', a, 700);
    if (st > 0) stamp(g, x + w - 110, y + 56, '停止', st, a);
  }

  // ---------- scenes ----------
  var D = {};
  // title card: on screen from frame 0
  D.tt = function (g, lt) {
    codeWall(g, 0, 0, 1920, 1080, 0.9, lt, 0);
    gtxt(g, '一个漏洞，日本半个互联网关门', 960, 470, 92, '#f6dfae', 'center', 1);
    mono(g, 'PHP2SHELL  ·  2026.10  ·  JAPAN', 960, 560, 24, 'rgba(220,210,190,0.85)', 'center', 1);
    chip(g, 960, 650, 'メンテナンス中', RED, 1, 30);
  };
  // hook: the apps on a phone go dark, then the PM's post, then the code, then AI
  D.app = function (g, lt, L) {
    var X = 1290, Y = 190, W = 400, H = 790, ph = ap(lt, 0.1, 0.5) * (1 - ap(lt, L[5] - 0.3, 0.5));
    if (ph > 0) { phone(g, X, Y, W, H, ph);
      var apps = [['すき家', '#e2483a', 1], ['はま寿司', '#e6893a', 2], ['銀行', '#3a7be2', 3], ['証券', '#3aa6a0', 3], ['鉄道', '#4caf50', 3], ['航空', '#7e5ae6', 3]];
      apps.forEach(function (s, i) { var cx = X + 100 + (i % 3) * 100, cy = Y + 170 + Math.floor(i / 3) * 170;
        var t0 = s[2] === 3 ? L[3] + 0.25 * (i - 2) : L[s[2]] + 0.4, off = ap(lt, t0, 0.3); appIcon(g, cx, cy, 78, s[1], s[0], ph, off); });
      var md = wn(lt, L[1] + 0.4, L[2] + 0.2, 0.25);
      if (md > 0) { card(g, X + 40, Y + 470, W - 80, 220, RED, ph * md); txt(g, 'すき家', X + W / 2, Y + 530, 30, INK, 'center', ph * md, 900); txt(g, 'サービス一時停止中', X + W / 2, Y + 590, 30, RED, 'center', ph * md, 900); mono(g, '再開時期は未定です', X + W / 2, Y + 640, 20, DIM, 'center', ph * md); }
      var md2 = wn(lt, L[2] + 0.4, L[3] + 0.1, 0.25);
      if (md2 > 0) { card(g, X + 40, Y + 470, W - 80, 220, RED, ph * md2); txt(g, 'はま寿司', X + W / 2, Y + 530, 30, INK, 'center', ph * md2, 900); txt(g, 'サービス一時停止中', X + W / 2, Y + 590, 30, RED, 'center', ph * md2, 900); }
      var st = ap(lt, L[4] + 0.4, 0.2); if (st > 0) { g.save(); g.globalAlpha *= 0.45 * st * ph; g.fillStyle = '#000'; rr(g, X + 14, Y + 14, W - 28, H - 28, 32); g.fill(); g.restore(); stamp(g, X + W / 2, Y + 600, '先关门', lt - L[4] - 0.4, ph); }
    }
    var xc = ap(lt, L[5], 0.5) * (1 - ap(lt, L[6] - 0.2, 0.5)); if (xc > 0) xcard(g, 1090, 380, 700, '日本首相', '大至急のお願い', xc, true);
    var cw = ap(lt, L[6], 0.5); if (cw > 0) { codeWall(g, 1080, 260, 760, 600, cw * (1 - 0.6 * ap(lt, L[7], 0.5)), lt, eo((lt - L[6] - 0.6) / 0.9)); bug(g, 1460, 560, 1.1, cw * ap(lt, L[6] + 1.2, 0.4) * (1 - ap(lt, L[7], 0.4))); }
    var ai = ap(lt, L[7] + 0.3, 0.5); if (ai > 0) { robot(g, 1460, 560, 1.3, ai, lt); bug(g, 1700, 760, 0.6, ai * 0.9); arrow(g, 1560, 640, 1650, 720, GOLD, ai, eo((lt - L[7] - 0.6) / 0.5)); }
  };
  // what happened: the night of 21 October, then the list of who closed
  D.list = function (g, lt, L) {
    var c1 = ap(lt, L[1], 0.5) * (1 - ap(lt, L[4] - 0.2, 0.5));
    if (c1 > 0) { card(g, 1090, 300, 700, 150, GOLD, c1); txt(g, '10 月 21 日 晚', 1440, 362, 40, GOLD, 'center', c1, 900); mono(g, 'PHP 8.2.35 / 8.3.36 / 8.4.27 / 8.5.12', 1440, 410, 22, INK, 'center', c1); }
    var c2 = ap(lt, L[2], 0.5) * (1 - ap(lt, L[4] - 0.2, 0.5));
    if (c2 > 0) { xcard(g, 1090, 500, 700, '日本首相', '', c2, false); txt(g, '尽快打补丁；', 1130, 650, 32, INK, 'left', c2 * ap(lt, L[3], 0.4), 900); txt(g, '打不上，暂停网站也是办法。', 1130, 692, 32, RED, 'left', c2 * ap(lt, L[3] + 0.5, 0.4), 900); }
    var rows = [['银行', '静冈银行网银 · 瑞穗预约'], ['证券', '大和证券网上开户'], ['交通', '京阪官网 · JAL 部分功能'], ['外食', 'すき家 · はま寿司 · モス']];
    var ra = ap(lt, L[4] + 0.2, 0.4);
    rows.forEach(function (r, i) { var t0 = L[5 + i], q = ap(lt, t0 - 0.1, 0.4) * ra, hl = i === 3 ? ap(lt, L[9], 0.4) : 0;
      rowStamp(g, 1060, 290 + i * 150, 780, r[0], r[1], q, lt - t0 - 0.9, hl > 0.5 ? RED : BLUE); });
    var e = ap(lt, L[9] + 0.6, 0.4); if (e > 0) chip(g, 1450, 910, '10/23 · すき家、はま寿司 App 仍未恢复', RED, e, 26);
  };
  // PHP = the kitchen
  D.php = function (g, lt, L) {
    var a = ap(lt, L[1] - 0.1, 0.5) * (1 - ap(lt, L[4] - 0.2, 0.5)), y = 640;
    if (a > 0) { avatar(g, 1110, y, 50, BLUE, a); txt(g, '你', 1110, y + 90, 26, INK, 'center', a, 900);
      var k = ap(lt, L[2], 0.5); kitchen(g, 1480, y, a * k, lt, 1, 0);
      var p1 = eo((lt - L[3]) / 0.7); arrow(g, 1170, y - 40, 1250, y - 40, BLUE, a * k, p1, lt * 40); txt(g, '点单', 1210, y - 70, 24, BLUE, 'center', a * k * (p1 > 0.5 ? 1 : 0), 900);
      var p2 = eo((lt - L[3] - 0.9) / 0.7); arrow(g, 1250, y + 40, 1170, y + 40, GOLD, a * k, p2, lt * 40); txt(g, '网页', 1210, y + 80, 24, GOLD, 'center', a * k * (p2 > 0.5 ? 1 : 0), 900);
      doc(g, 1790, y - 10, 120, 160, a * ap(lt, L[1] + 0.3, 0.5), 0.05, '网页', 2); }
    var b = ap(lt, L[4], 0.5);
    if (b > 0) { for (var i = 0; i < 10; i++) { var x = 1160 + (i % 5) * 130, yy = 480 + Math.floor(i / 5) * 190, lit = i < 7 ? ap(lt, L[5] + 0.12 * i, 0.3) : 0;
        g.save(); g.globalAlpha *= b; rr(g, x - 50, yy - 70, 100, 140, 12); g.fillStyle = lit > 0 ? rgba(GOLD, 0.2 + 0.5 * lit) : 'rgba(60,70,90,0.5)'; g.fill(); g.strokeStyle = lit > 0 ? GOLD : 'rgba(150,160,180,0.4)'; g.lineWidth = 2; g.shadowColor = GOLD; g.shadowBlur = 14 * lit; g.stroke(); g.restore();
        mono(g, '<?php', x, yy + 8, 20, lit > 0.5 ? '#1a1206' : 'rgba(150,160,180,0.5)', 'center', b * (i < 7 ? Math.max(0.4, lit) : 0.5)); }
      txt(g, '约 7 / 10', 1420, 900, 34, GOLD, 'center', b * ap(lt, L[5] + 1.0, 0.4), 900); }
  };
  // severity: gauge, the stranger in the kitchen, the decade
  D.vuln = function (g, lt, L) {
    var a = ap(lt, L[1] - 0.2, 0.5) * (1 - ap(lt, L[3] - 0.2, 0.5));
    if (a > 0) { gauge(g, 1440, 760, 300, 9.2 * eo((lt - L[1] - 0.2) / 1.1), a); chip(g, 1440, 850, 'CVSS 9.2 · 严重', RED, a * ap(lt, L[2], 0.4), 28); }
    var b = ap(lt, L[3], 0.5) * (1 - ap(lt, L[8] - 0.2, 0.5));
    if (b > 0) { var inv = eo((lt - L[4]) / 1.2), take = ap(lt, L[7], 0.4); kitchen(g, 1450, 640, b, lt, 1, Math.max(inv * 0.6, take));
      lock(g, 1180, 400, 0.9, 0, b * (1 - ap(lt, L[6], 0.4))); chip(g, 1180, 500, '不用登录', RED, b * ap(lt, L[3] + 0.3, 0.4) * (1 - ap(lt, L[6], 0.4)), 26);
      var rq = ap(lt, L[4], 0.4); if (rq > 0) { arrow(g, 1100, 860, 1300, 760, RED, b * rq, eo((lt - L[4]) / 0.6), lt * 40); mono(g, 'POST /  (特制请求)', 1100, 900, 22, RED, 'left', b * rq); }
      var cd = ap(lt, L[5], 0.4); if (cd > 0) { card(g, 1600, 330, 240, 100, RED, b * cd); mono(g, '{ 他写的代码 }', 1720, 390, 22, RED, 'center', b * cd); }
      if (take > 0) stamp(g, 1450, 560, '被接管', lt - L[7], b); }
    var c = ap(lt, L[8], 0.5);
    if (c > 0) { var x0 = 1090, x1 = 1790, y = 680; line(g, x0, y, x1, y, 'rgba(200,210,230,0.5)', 3, c);
      var vs = ['5.4', '5.6', '7.0', '7.4', '8.0', '8.2', '8.4', '8.5'];
      vs.forEach(function (v, i) { var x = x0 + (x1 - x0) * i / (vs.length - 1), q = ap(lt, L[8] + 0.3 + i * 0.15, 0.3); glowDot(g, x, y, 9, RED, c * q); mono(g, v, x, y + 50, 22, INK, 'center', c * q); });
      hbar(g, x0, y - 70, (x1 - x0) * eo((lt - L[8] - 0.3) / 1.4), 24, rgba(RED, 0.6), c);
      txt(g, '藏了十多年', (x0 + x1) / 2, y - 100, 36, RED, 'center', c * ap(lt, L[8] + 1.2, 0.4), 900); mono(g, 'PHP 版本', x0, y + 100, 20, DIM, 'left', c); }
  };
  // the turn: AI found it first — timeline Aug 19 → Oct 21
  D.ai = function (g, lt, L) {
    var r = ap(lt, L[0], 0.5), rx = 1460, ry = 470 - 120 * ap(lt, L[4] - 0.2, 0.6);
    if (r > 0) { codeWall(g, 1080, 260, 760, 420, r * 0.6 * (1 - ap(lt, L[4] - 0.2, 0.5)), lt, 0); robot(g, rx, ry, 1.2 - 0.45 * ap(lt, L[4] - 0.2, 0.6), r * ap(lt, L[1], 0.4) + 0.001, lt);
      var hk = ap(lt, L[1] - 0.6, 0.3) * (1 - ap(lt, L[1] + 0.3, 0.3)); avatar(g, 1700, 520, 44, RED, hk * r); txt(g, '黑客？', 1700, 600, 26, RED, 'center', hk * r, 900);
      var tl = ap(lt, L[2], 0.4) * (1 - ap(lt, L[4] - 0.2, 0.4));
      if (tl > 0) { chip(g, 1460, 680, 'Wiz Research', BLUE, tl, 30); ['Wiz Atlas', 'Gemini', 'GPT'].forEach(function (s, i) { chip(g, 1250 + i * 210, 790, s, GOLD, tl * ap(lt, L[3] + 0.25 * i, 0.3), 24); }); } }
    var T = [['8/19', '发现第一个漏洞', 4], ['8/21', '打通 WordPress', 5], ['8/24', '报告 PHP 团队', 6], ['10/21', '补丁 + 公开', 7]];
    var x0 = 1100, x1 = 1800, y = 700, ax = ap(lt, L[4] - 0.2, 0.5);
    var XS = [1140, 1360, 1580, 1790]; function X(d) { return d === 0 ? XS[0] : d === 2 ? XS[1] : d === 5 ? XS[2] : XS[3]; }   // evenly spaced; a break mark before 10/21
    var days = [0, 2, 5, 63];
    if (ax > 0) { line(g, x0, y, x1, y, 'rgba(200,210,230,0.5)', 3, ax);
      T.forEach(function (s, i) { var q = ap(lt, L[s[2]] + 0.1, 0.4); if (q <= 0) return; var x = X(days[i]), up = i % 2 === 0;
        glowDot(g, x, y, 11, i === 3 ? GOLD : BLUE, q); mono(g, s[0], x, y + (up ? -40 : 52), 24, i === 3 ? GOLD : BLUE, i === 3 ? 'right' : 'center', q);
        txt(g, s[1], x + (i === 3 ? 0 : 0), y + (up ? -76 : 92), 24, INK, i === 3 ? 'right' : (i === 0 ? 'left' : 'center'), q, 700); });
      g.save(); g.globalAlpha *= ax * ap(lt, L[7], 0.4); g.fillStyle = '#0b1019'; g.fillRect(1672, y - 14, 26, 28); g.strokeStyle = 'rgba(200,210,230,0.6)'; g.lineWidth = 2; g.beginPath(); g.moveTo(1672, y + 14); g.lineTo(1680, y - 14); g.moveTo(1690, y + 14); g.lineTo(1698, y - 14); g.stroke(); g.restore();
      var oa = ap(lt, L[7] + 0.4, 0.5); if (oa > 0) { hbar(g, X(5), y + 150, (X(63) - X(5)) * eo((lt - L[7] - 0.4) / 1.0), 14, rgba(GOLD, 0.6), oa); txt(g, 'OpenAI 牵头协调 · 约两个月', (X(5) + X(63)) / 2, y + 205, 26, GOLD, 'center', oa, 900); } }
    var f = ap(lt, L[8] + 0.6, 0.4); if (f > 0) chip(g, 1460, 950, 'AI 先找到 · 先报告 · 先修补', GOLD, f, 28);
  };
  // why close: the patch can be reverse-engineered, attacks come within hours
  D.race = function (g, lt, L) {
    var a = ap(lt, L[1] - 0.2, 0.5) * (1 - ap(lt, L[5] - 0.2, 0.5));
    if (a > 0) { doc(g, 1170, 470, 150, 200, a, -0.05, '补丁', 4); var p = eo((lt - L[2]) / 0.8); arrow(g, 1270, 470, 1470, 470, RED, a, p, lt * 40); txt(g, '倒推', 1370, 440, 28, RED, 'center', a * (p > 0.5 ? 1 : 0), 900);
      bug(g, 1590, 470, 1.0, a * ap(lt, L[2] + 0.7, 0.4));
      var b = ap(lt, L[3], 0.5); if (b > 0) { var x0 = 1100, x1 = 1800; line(g, x0, 720, x1, 720, 'rgba(200,210,230,0.4)', 2, a * b); mono(g, '补丁公开', x0, 760, 20, DIM, 'left', a * b);
        hbar(g, x0, 650, (x1 - x0) * 0.85 * eo((lt - L[3] - 0.3) / 2.5), 26, rgba(BLUE, 0.6), a * b); txt(g, '以前：几周', x0 + 10, 630, 26, BLUE, 'left', a * b, 900);
        hbar(g, x0, 790, (x1 - x0) * 0.12 * eo((lt - L[4] - 0.2) / 0.4), 26, rgba(RED, 0.8), a * ap(lt, L[4], 0.3)); txt(g, '现在：几小时', x0 + 230, 812, 28, RED, 'left', a * ap(lt, L[4] + 0.3, 0.3), 900); } }
    var c = ap(lt, L[5], 0.5) * (1 - ap(lt, L[8] - 0.2, 0.5));
    if (c > 0) { var x0 = 1090, x1 = 1800, y = 760; function X(d) { return x0 + (x1 - x0) * (d - 16) / 6; }  // Oct 16 → Oct 22
      rackIcon(g, 1450, 470, 220, lt, c); txt(g, 'Amazon 诱捕服务器', 1450, 620, 26, INK, 'center', c, 900);
      line(g, x0, y, x1, y, 'rgba(200,210,230,0.5)', 3, c); [17, 21].forEach(function (d) { mono(g, '10/' + d, X(d), y + 46, 22, d === 21 ? GOLD : DIM, 'center', c); });
      line(g, X(21), y - 90, X(21), y + 10, GOLD, 2, c); txt(g, '补丁公开', X(21), y - 104, 22, GOLD, 'center', c, 900);
      for (var k = 0; k < 7; k++) { var q = ap(lt, L[6] + 0.1 + 0.18 * k, 0.2); glowDot(g, X(21) + 12 + k * 14, y - 20 - (k % 3) * 18, 7, RED, c * q); }
      var pr = ap(lt, L[7] + 0.4, 0.3); glowDot(g, X(17), y - 20, 9, RED, c * pr); txt(g, '公开前 4 天：试探', X(17), y - 60, 24, RED, 'center', c * pr, 900); }
    var d = ap(lt, L[8], 0.5);
    if (d > 0) { var sh = eo((lt - L[9] - 0.2) / 1.0);
      for (var i = 0; i < 24; i++) { var x = 1120 + (i % 8) * 92, y2 = 400 + Math.floor(i / 8) * 170; rackIcon(g, x, y2, 130, lt + i, d * ap(lt, L[8] + i * 0.03, 0.3)); }
      if (sh > 0) { g.save(); g.globalAlpha *= d; g.fillStyle = 'rgba(30,36,50,0.95)'; g.fillRect(1060, 300, 780, 520 * sh); g.strokeStyle = 'rgba(200,210,230,0.35)'; g.lineWidth = 2; for (var j = 0; j < 520 * sh; j += 26) { g.beginPath(); g.moveTo(1060, 300 + j); g.lineTo(1840, 300 + j); g.stroke(); } g.restore(); }
      chip(g, 1450, 900, '修好之前，先关门', GOLD, d * ap(lt, L[9] + 0.6, 0.4), 30); }
  };
  // status: no damage reported; it was prevention
  D.status = function (g, lt, L) {
    gtxt(g, '被黑了？', 1450, 400, 96, RED, 'center', ap(lt, 0.2, 0.4) * (1 - ap(lt, L[2] - 0.3, 0.4)));
    var it = [['日本政府', '未收到网络攻击造成损害的报告', 2], ['全国银行协会', '银行间结算没受影响', 3], ['JR 东日本', '列车运行没受影响 · 逐项恢复', 4]];
    it.forEach(function (s, i) { var q = ap(lt, L[s[2]], 0.4), y = 330 + i * 170; if (q <= 0) return; card(g, 1070, y, 780, 130, GOLD, q); check(g, 1130, y + 65, eo((lt - L[s[2]] - 0.5) / 0.5), GOLD, q);
      txt(g, s[0], 1180, y + 52, 26, DIM, 'left', q, 700); txt(g, s[1], 1180, y + 98, 32, INK, 'left', q, 900); });
    var f = ap(lt, L[6] + 0.4, 0.4); if (f > 0) { chip(g, 1300, 900, '预防', GOLD, f, 34); txt(g, '≠', 1450, 912, 44, INK, 'center', f, 900); chip(g, 1600, 900, '事故', RED, f * 0.6, 34); }
  };
  // the future: AI on both sides; who patches faster
  D.future = function (g, lt, L) {
    var a = ap(lt, L[1] - 0.2, 0.5) * (1 - ap(lt, L[3] - 0.2, 0.5));
    if (a > 0) { robot(g, 1450, 420, 0.8, a, lt); shield(g, 1200, 700, 1.2, a * ap(lt, L[1] + 0.2, 0.4)); bug(g, 1700, 700, 1.1, a * ap(lt, L[1] + 0.6, 0.4));
      arrow(g, 1400, 500, 1260, 600, BLUE, a, eo((lt - L[1] - 0.2) / 0.5)); arrow(g, 1500, 500, 1640, 600, RED, a, eo((lt - L[1] - 0.6) / 0.5));
      txt(g, '帮好人', 1200, 840, 28, BLUE, 'center', a, 900); txt(g, '也帮坏人', 1700, 840, 28, RED, 'center', a, 900);
      var sp = ap(lt, L[2], 0.4); if (sp > 0) { for (var k = 0; k < 14; k++) { var yy = 300 + rnd(k) * 600, xx = 1080 + ((lt * 900 + rnd(k + 9) * 760) % 760); line(g, xx, yy, xx + 60, yy, 'rgba(240,189,92,0.35)', 2, a * sp); } } }
    var b = ap(lt, L[3], 0.5);
    if (b > 0) { var days = 14, x0 = 1090, w = 50;
      for (var i = 0; i < days; i++) { var x = x0 + (i % 7) * 104, y = 380 + Math.floor(i / 7) * 150, closed = [2, 6, 9, 11, 12, 13].indexOf(i) >= 0, q = ap(lt, L[3] + 0.1 + i * 0.08, 0.3);
        card(g, x, y, 90, 110, closed ? RED : BLUE, b * q * (closed ? 1 : 0.5)); mono(g, String(i + 1), x + 45, y + 36, 22, DIM, 'center', b * q);
        if (closed) txt(g, '关门', x + 45, y + 84, 26, RED, 'center', b * q * ap(lt, L[4] + 0.15 * i / 3, 0.3), 900); }
      var f = ap(lt, L[5], 0.4); if (f > 0) { chip(g, 1450, 760, '修补', BLUE, f, 30); txt(g, 'vs', 1450, 845, 32, INK, 'center', f, 900); chip(g, 1450, 920, '攻击', RED, f, 30);
        hbar(g, 1520, 745, 280 * eo((lt - L[5] - 0.2) / 0.8), 30, rgba(BLUE, 0.7), f); hbar(g, 1520, 905, 230 * eo((lt - L[5] - 0.2) / 0.8), 30, rgba(RED, 0.7), f); } }
  };
  // three things for ordinary people
  D.you = function (g, lt, L) {
    var it = [['叫你“重新登录”的短信', '别点链接', RED], ['重要账号', '打开两步验证', GOLD], ['App 暂停时', '等官方公告再用', BLUE]];
    it.forEach(function (s, i) { var q = ap(lt, L[1 + i] - 0.1, 0.4), y = 320 + i * 200; if (q <= 0) return; card(g, 1070, y, 780, 160, s[2], q);
      gtxt(g, String(i + 1), 1140, y + 106, 80, s[2], 'center', q); txt(g, s[0], 1220, y + 66, 28, DIM, 'left', q, 700); txt(g, s[1], 1220, y + 118, 40, INK, 'left', q, 900);
      if (i === 0) { var x = 1700, yy = y + 80; g.save(); g.globalAlpha *= q; g.strokeStyle = RED; g.lineWidth = 8; g.shadowColor = RED; g.shadowBlur = 12; g.beginPath(); g.moveTo(x - 30, yy - 30); g.lineTo(x + 30, yy + 30); g.moveTo(x + 30, yy - 30); g.lineTo(x - 30, yy + 30); g.stroke(); g.restore(); }
      if (i === 1) lock(g, 1720, y + 110, 0.7, 1, q);
      if (i === 2) check(g, 1720, y + 80, eo((lt - L[3] - 0.4) / 0.5), BLUE, q); });
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
  var NODES = [['漏', '一个漏洞', 'CVSS 9.2 · 藏了十多年'], ['AI', 'AI 先找到', '8/19 发现 · 8/24 报告'], ['关', '日本先关门', '预防 · 暂无损害报告'], ['快', '比谁修得快', '补丁公开后几小时内']];
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
      var s1 = '一个漏洞，日本半个互联网', s2 = '关门', s3 = '', w1 = g.measureText(s1).width, w2 = g.measureText(s2).width, w3 = g.measureText(s3).width, x0 = 960 - (w1 + w2 + w3) / 2;
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
    g.globalAlpha = E((lt - 1.2) / 0.5); g.textAlign = 'center'; g.font = '700 26px ' + SERIF; g.fillStyle = '#ece6da'; g.fillText('信息整理 · 截至 2026 年 10 月 23 日 · 各公司恢复情况以官方公告为准', 960, 930);
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
