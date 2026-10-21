// SanDisk · v2 scenes. Everything in 1920×1080 px. Narration sits top-left (x < 1010, y < 450),
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

  // ---------- SanDisk props ----------
  function sdcard(g, x, y, w, a, rot, glow, label) {         // a generic SD-style card (notched corner, contacts)
    if (a <= 0) return; var h = w * 1.33; g.save(); g.globalAlpha *= a; g.translate(x, y); g.rotate(rot || 0);
    g.beginPath(); g.moveTo(-w / 2, -h / 2 + w * 0.22); g.lineTo(-w / 2 + w * 0.22, -h / 2); g.lineTo(w / 2, -h / 2); g.lineTo(w / 2, h / 2); g.lineTo(-w / 2, h / 2); g.closePath();
    var gr = g.createLinearGradient(0, -h / 2, 0, h / 2); gr.addColorStop(0, '#2a3654'); gr.addColorStop(1, '#141c30'); g.fillStyle = gr; g.fill();
    g.strokeStyle = rgba(GOLD, 0.5 + 0.5 * (glow || 0)); g.lineWidth = 2.5; g.shadowColor = GOLD; g.shadowBlur = 24 * (glow || 0); g.stroke(); g.shadowBlur = 0;
    g.fillStyle = '#c9a052'; for (var i = 0; i < 7; i++) g.fillRect(-w / 2 + w * 0.2 + i * w * 0.1, -h / 2 + w * 0.06, w * 0.06, w * 0.2);
    g.fillStyle = rgba(BLUE, 0.25); g.fillRect(-w * 0.36, -h * 0.05, w * 0.72, h * 0.42);
    if (label) { g.font = '900 ' + Math.round(w * 0.2) + 'px ' + SERIF; g.fillStyle = rgba(GOLD, 0.9); g.textAlign = 'center'; g.fillText(label, 0, h * 0.24); }
    g.restore();
  }
  function usb(g, x, y, w, a, rot) {
    if (a <= 0) return; var h = w * 0.36; g.save(); g.globalAlpha *= a; g.translate(x, y); g.rotate(rot || 0);
    g.fillStyle = 'rgba(190,200,215,0.85)'; g.fillRect(w * 0.32, -h * 0.32, w * 0.24, h * 0.64); g.fillStyle = '#20283a'; g.fillRect(w * 0.38, -h * 0.18, w * 0.05, h * 0.12); g.fillRect(w * 0.47, -h * 0.18, w * 0.05, h * 0.12);
    rr(g, -w / 2, -h / 2, w * 0.84, h, h * 0.25); var gr = g.createLinearGradient(0, -h / 2, 0, h / 2); gr.addColorStop(0, '#34405f'); gr.addColorStop(1, '#161e32'); g.fillStyle = gr; g.fill();
    g.strokeStyle = rgba(GOLD, 0.6); g.lineWidth = 2; g.stroke(); g.fillStyle = rgba(BLUE, 0.6); g.fillRect(-w * 0.4, -2, w * 0.18, 4); g.restore();
  }
  function wafer(g, cx, cy, r, a, t, lit) {                  // a silicon wafer with a die grid
    if (a <= 0) return; g.save(); g.globalAlpha *= a; var gr = g.createRadialGradient(cx - r * 0.3, cy - r * 0.3, 2, cx, cy, r);
    gr.addColorStop(0, '#5a6a8e'); gr.addColorStop(0.6, '#2c3756'); gr.addColorStop(1, '#1a2238'); g.fillStyle = gr; g.beginPath(); g.arc(cx, cy, r, 0, 6.29); g.fill();
    g.save(); g.beginPath(); g.arc(cx, cy, r * 0.96, 0, 6.29); g.clip(); var s = r / 7;
    for (var i = -7; i < 7; i++) for (var j = -7; j < 7; j++) { var x = cx + i * s, y = cy + j * s; var on = rnd(i * 13 + j * 7 + 99) < (lit == null ? 0.4 : lit);
      g.fillStyle = on ? rgba(GOLD, 0.35 + 0.25 * Math.sin(t * 2 + i + j)) : 'rgba(140,170,230,0.12)'; g.fillRect(x + 1.5, y + 1.5, s - 3, s - 3); }
    g.restore(); g.strokeStyle = 'rgba(200,215,240,0.5)'; g.lineWidth = 2; g.beginPath(); g.arc(cx, cy, r, 0, 6.29); g.stroke(); g.restore();
  }
  function stack3d(g, cx, cy, w, n, lt, a, gap) {            // 3D NAND layers in oblique projection, drawn bottom to top
    if (a <= 0) return; gap = gap || 14; g.save(); g.globalAlpha *= a;
    for (var i = 0; i < n; i++) {
      var p = cl((lt - i * 0.06) / 0.35); if (p <= 0) continue; var y = cy - i * gap - (1 - eo(p)) * 40;
      g.globalAlpha = a * p; g.beginPath(); g.moveTo(cx - w / 2, y); g.lineTo(cx + w / 2, y); g.lineTo(cx + w / 2 + w * 0.3, y - w * 0.19); g.lineTo(cx - w / 2 + w * 0.3, y - w * 0.19); g.closePath();
      g.fillStyle = i % 2 ? 'rgba(60,80,120,0.85)' : 'rgba(40,56,90,0.85)'; g.fill(); g.strokeStyle = rgba(i === n - 1 ? GOLD : BLUE, 0.6); g.lineWidth = 1.4; g.stroke();
      g.fillStyle = 'rgba(20,28,46,0.95)'; g.fillRect(cx - w / 2, y, w, gap * 0.6); g.strokeStyle = 'rgba(134,182,255,0.35)'; g.strokeRect(cx - w / 2, y, w, gap * 0.6);
    }
    g.restore();
  }
  function phone(g, x, y, h, a) { if (a <= 0) return; g.save(); g.globalAlpha *= a; rr(g, x - h * 0.24, y - h / 2, h * 0.48, h, h * 0.07); g.fillStyle = '#18213a'; g.fill(); g.strokeStyle = 'rgba(200,215,240,0.7)'; g.lineWidth = 3; g.stroke(); g.fillStyle = rgba(BLUE, 0.25); g.fillRect(x - h * 0.2, y - h * 0.42, h * 0.4, h * 0.8); g.restore(); }
  function laptop(g, x, y, w, a) { if (a <= 0) return; g.save(); g.globalAlpha *= a; var h = w * 0.6; rr(g, x - w / 2, y - h, w, h, 10); g.fillStyle = '#18213a'; g.fill(); g.strokeStyle = 'rgba(200,215,240,0.7)'; g.lineWidth = 3; g.stroke();
    g.fillStyle = rgba(BLUE, 0.2); g.fillRect(x - w / 2 + 12, y - h + 12, w - 24, h - 24); g.beginPath(); g.moveTo(x - w * 0.6, y + 16); g.lineTo(x + w * 0.6, y + 16); g.lineTo(x + w / 2, y); g.lineTo(x - w / 2, y); g.closePath(); g.fillStyle = '#222c46'; g.fill(); g.stroke(); g.restore(); }
  function rackIcon(g, x, y, h, t, a) { if (a <= 0) return; g.save(); g.globalAlpha *= a; var w = h * 0.45; g.fillStyle = '#141d31'; g.fillRect(x - w / 2, y - h / 2, w, h); g.strokeStyle = 'rgba(200,215,240,0.7)'; g.lineWidth = 3; g.strokeRect(x - w / 2, y - h / 2, w, h);
    for (var i = 0; i < 8; i++) { var yy = y - h / 2 + 10 + i * (h - 20) / 8; g.fillStyle = 'rgba(40,56,90,0.9)'; g.fillRect(x - w / 2 + 8, yy, w - 16, (h - 20) / 8 - 5); g.fillStyle = rnd(i + Math.floor(t * 3)) > 0.4 ? GOLD : BLUE; g.fillRect(x - w / 2 + 14, yy + 6, 5, 4); } g.restore(); }
  function camera(g, x, y, w, a) { if (a <= 0) return; g.save(); g.globalAlpha *= a; var h = w * 0.62; rr(g, x - w / 2, y - h / 2, w, h, 14); g.fillStyle = '#1a2340'; g.fill(); g.strokeStyle = 'rgba(200,215,240,0.75)'; g.lineWidth = 3; g.stroke();
    g.fillRect(x - w * 0.3, y - h / 2 - 16, w * 0.22, 18); g.beginPath(); g.arc(x + w * 0.05, y, h * 0.32, 0, 6.29); g.fillStyle = '#0b1020'; g.fill(); g.stroke(); g.beginPath(); g.arc(x + w * 0.05, y, h * 0.18, 0, 6.29); g.strokeStyle = rgba(BLUE, 0.7); g.stroke(); g.restore(); }
  function fab(g, x, y, s, t, a) { datacenter(g, x, y, 150 * s, 80 * s, 90 * s, t, 0.6, a); }
  function priceLine(g, x0, x1, y0, H, pts, p, col, a) {     // pts: [u(0..1), v(0..1)]
    if (a <= 0 || p <= 0) return; g.save(); g.globalAlpha *= a; g.beginPath(); var last = null;
    for (var i = 0; i < pts.length; i++) { var u = pts[i][0]; if (u > p) { if (i) { var q = pts[i - 1], k = (p - q[0]) / (u - q[0]); last = [x0 + (x1 - x0) * p, y0 - H * (q[1] + (pts[i][1] - q[1]) * k)]; g.lineTo(last[0], last[1]); } break; }
      last = [x0 + (x1 - x0) * u, y0 - H * pts[i][1]]; if (i) g.lineTo(last[0], last[1]); else g.moveTo(last[0], last[1]); }
    g.strokeStyle = col; g.lineWidth = 4; g.shadowColor = col; g.shadowBlur = 16; g.stroke(); g.restore(); return last;
  }
  function vbar(g, x, base, w, h, col, a, lab, val, valCol) {
    if (a <= 0) return; g.save(); g.globalAlpha *= a; g.fillStyle = col; g.shadowColor = col; g.shadowBlur = 14; if (h >= 0) g.fillRect(x - w / 2, base - h, w, h); else g.fillRect(x - w / 2, base, w, -h); g.restore();
    if (lab) txt(g, lab, x, h >= 0 ? base + 38 : base - 16, 24, INK, 'center', a); if (val) txt(g, val, x, h >= 0 ? base - h - 16 : base - h + 34, 28, valCol || col, 'center', a, 900);
  }
  function check(g, x, y, on, col, a) { if (a <= 0) return; g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = 3; g.strokeRect(x - 16, y - 16, 32, 32);
    if (on > 0) { g.lineWidth = 5; g.shadowColor = col; g.shadowBlur = 12; g.beginPath(); g.moveTo(x - 9, y); g.lineTo(x - 2, y + 8 * Math.min(1, on * 2)); if (on > 0.5) g.lineTo(x - 2 + 13 * (on - 0.5) * 2, y + 8 - 18 * (on - 0.5) * 2); g.stroke(); } g.restore(); }

  // ---------- scenes ----------
  var D = {};
  // hero price path (shape is illustrative; only the three marked points are real)
  var PP = [[0, 0.012], [0.05, 0.0], [0.15, 0.03], [0.3, 0.07], [0.45, 0.16], [0.58, 0.36], [0.68, 0.62], [0.74, 0.86], [0.78, 1.0], [0.84, 0.74], [0.9, 0.78], [0.95, 0.66], [1, 0.58]];
  D.h0 = function (g, lt, L) {
    var x0 = 1050, x1 = 1800, y0 = 900, H = 520, ch = ap(lt, 0.2, 0.6) * (1 - ap(lt, L[4] - 0.2, 0.5));
    if (ch > 0) {
      g.save(); g.globalAlpha *= ch; line(g, x0, y0, x1, y0, 'rgba(200,210,230,0.45)', 2, 1);
      mono(g, '2025.04', x0, y0 + 34, 18, DIM, 'left', 1); mono(g, '2026.06', x0 + (x1 - x0) * 0.78, y0 + 34, 18, DIM, 'center', 1); mono(g, '2026.10', x1, y0 + 34, 18, DIM, 'right', 1); g.restore();
      var p = lt < L[2] ? 0.06 : 0.06 + 0.72 * Math.pow(cl((lt - L[2]) / 2.6), 1.6); if (lt > L[3] + 0.6) p = 0.78 + 0.22 * eo((lt - L[3] - 0.6) / 1.4);
      var end = priceLine(g, x0, x1, y0, H, PP, p, p > 0.8 ? GOLD : RED, ch);
      glowDot(g, x0 + (x1 - x0) * 0.05, y0, 8, BLUE, ch * ap(lt, 0.5)); txt(g, '27.89', x0 + (x1 - x0) * 0.05, y0 - 22, 26, BLUE, 'center', ch * ap(lt, 0.5), 900);
      var hp = ch * ap(lt, L[2] + 2.5, 0.3); glowDot(g, x0 + (x1 - x0) * 0.78, y0 - H, 9, RED, hp); txt(g, '2354', x0 + (x1 - x0) * 0.78 - 18, y0 - H - 22, 26, RED, 'right', hp, 900);
      var np = ch * ap(lt, L[3] + 1.8, 0.3); glowDot(g, x1, y0 - H * 0.58, 8, GOLD, np); txt(g, '约 1370', x1, y0 - H * 0.58 - 22, 24, GOLD, 'right', np, 900);
      note(g, '走势为示意，只标出最低、最高和 10 月 20 日', ch);
    }
    var it = ap(lt, L[4], 0.5) * (1 - 0.7 * ap(lt, L[5], 0.4));
    sdcard(g, 1250, 640, 180, it, -0.12, 0.6); usb(g, 1560, 660, 300, it, 0.1); sdcard(g, 1420, 560, 140, it * 0.8, 0.18, 0.4);
    gtxt(g, '?', 1400, 900, 140, GOLD, 'center', ap(lt, L[6] + 0.2));
  };
  D.origin = function (g, lt, L) {
    var c = ap(lt, 0.2, 0.6) * (1 - ap(lt, L[4] - 0.1, 0.5) * 0.85);
    if (c > 0) {
      g.save(); g.globalAlpha *= c; var cx = 1400, cy = 600; rr(g, cx - 180, cy - 140, 360, 280, 18); g.fillStyle = '#121a2e'; g.fill(); g.strokeStyle = rgba(GOLD, 0.7); g.lineWidth = 3; g.shadowColor = GOLD; g.shadowBlur = 18; g.stroke(); g.shadowBlur = 0;
      for (var i = 0; i < 12; i++) { g.fillStyle = '#c9a052'; g.fillRect(cx - 160 + i * 28, cy + 140, 12, 22); g.fillRect(cx - 160 + i * 28, cy - 162, 12, 22); }
      var power = lt > L[3] ? 1 - E((lt - L[3]) / 0.4) : 1;
      for (var r = 0; r < 6; r++) for (var k = 0; k < 8; k++) { var on = rnd(r * 8 + k) > 0.45; g.fillStyle = on ? rgba(GOLD, 0.85) : 'rgba(120,150,210,0.25)'; g.fillRect(cx - 140 + k * 36, cy - 100 + r * 36, 24, 24); }
      g.restore(); txt(g, '闪存', 1400, 830, 34, GOLD, 'center', c, 900);
      var pw = ap(lt, L[3], 0.4); if (pw > 0) { g.save(); g.globalAlpha *= pw * c; g.strokeStyle = RED; g.lineWidth = 6; g.beginPath(); g.moveTo(1640, 470); g.lineTo(1720, 470); g.moveTo(1640, 500); g.lineTo(1720, 500); g.stroke();
        g.beginPath(); g.moveTo(1610, 440); g.lineTo(1750, 530); g.stroke(); g.restore(); txt(g, '断电', 1680, 580, 26, RED, 'center', pw * c); txt(g, '数据还在', 1400, 380, 30, GOLD, 'center', pw * c, 900); }
    }
    var ibm = ap(lt, L[4], 0.5);
    if (ibm > 0) {
      var P = box3(g, 1220, 820, 340, 70, 220, '#1a243e', '#121a2e', '#26324e', ibm);
      txt(g, '20 MB', 1390, 795, 34, INK, 'center', ibm, 900); chip(g, 1390, 520, '1991 · 给 IBM', BLUE, ibm, 26); chip(g, 1390, 920, '约 1000 美元', RED, ap(lt, L[6], 0.4), 30);
    }
  };
  D.cards = function (g, lt, L) {
    var a = ap(lt, 0.1, 0.5);
    camera(g, 1250, 600, 300, a); var q = eo((lt - 0.4) / 0.8); sdcard(g, 1250 + 240 - 120 * q, 420 + 120 * q, 90, a, 0, 0.5);
    laptop(g, 1620, 700, 300, ap(lt, L[1] - 0.3, 0.5)); var u = eo((lt - L[1]) / 0.8); usb(g, 1820 - 80 * u, 690, 160, ap(lt, L[1] - 0.3, 0.5), Math.PI);
    for (var k = 0; k < 14; k++) { var t0 = L[2] + 0.1 + k * 0.12, p = (lt - t0) / 2.2; if (p < 0 || p > 1) continue;
      var x = 1050 + rnd(k) * 760, y = 300 + p * 700; if (k % 2) sdcard(g, x, y, 54, 1 - E((p - 0.75) / 0.25), (rnd(k + 4) - 0.5) * 1.2, 0.3); else usb(g, x, y, 110, 1 - E((p - 0.75) / 0.25), (rnd(k + 4) - 0.5) * 2); }
  };
  D.fab = function (g, lt, L) {
    var a = ap(lt, 0.1, 0.5);
    card(g, 1060, 300, 280, 110, GOLD, a); gtxt(g, '闪迪', 1200, 372, 44, GOLD, 'center', a);
    var tb = 1 - ap(lt, L[2] + 0.2, 0.5), kx = ap(lt, L[2] + 0.2, 0.5);
    card(g, 1500, 300, 280, 110, BLUE, a); txt(g, '东芝', 1640, 372, 44, INK, 'center', a * tb, 900); txt(g, '铠侠', 1640, 372, 44, BLUE, 'center', a * kx, 900);
    line(g, 1340, 355, 1500, 355, GOLD, 3, a * ap(lt, L[0] + 0.6)); txt(g, '合资', 1420, 340, 22, DIM, 'center', a * ap(lt, L[0] + 0.6));
    for (var i = 0; i < 8; i++) { var gx = i < 6 ? 1080 + i * 95 : 1660 + (i - 6) * 95, q = ap(lt, L[1] + i * 0.08, 0.3); fab(g, gx, 620 + (i % 2) * 18, 0.55, lt, a * q); }
    txt(g, '四日市 × 6', 1330, 680, 22, DIM, 'center', ap(lt, L[1] + 0.8)); txt(g, '北上 × 2', 1755, 680, 22, DIM, 'center', ap(lt, L[1] + 0.8));
    var sh = ap(lt, L[3], 0.5); if (sh > 0) { var w = 700, x = 1080, y = 760; g.save(); g.globalAlpha *= sh; g.fillStyle = GOLD; g.shadowColor = GOLD; g.shadowBlur = 12; g.fillRect(x, y, w * 0.499 * eo((lt - L[3]) / 0.6), 40);
      g.fillStyle = rgba(BLUE, 0.85); g.shadowColor = BLUE; g.fillRect(x + w * 0.499, y, w * 0.501 * eo((lt - L[3] - 0.3) / 0.6), 40); g.restore();
      txt(g, '闪迪 49.9%', x, y + 76, 26, GOLD, 'left', sh, 900); txt(g, '铠侠 50.1%', x + w, y + 76, 26, BLUE, 'right', sh, 900); }
    var wf = ap(lt, L[4], 0.4); for (var k = 0; k < 6; k++) { var p = ((lt - L[4]) * 0.6 + k / 6) % 1; if (lt < L[4]) break; wafer(g, 1430 + (k % 2 ? 1 : -1) * 300 * p, 930, 26, wf * (1 - E((p - 0.8) / 0.2)), lt); }
  };
  D.spin = function (g, lt, L) {
    var a = ap(lt, 0.1, 0.5), m = eo((lt - L[0] - 0.6) / 0.8), sp = eo((lt - L[2] - 0.2) / 0.8);
    var wd = a * (1 - ap(lt, L[4], 0.5) * 0.85);
    var x = 1180 + 400 * m - 400 * sp, y = 560 + 90 * m * (1 - sp) + 100 * sp;
    card(g, 1360, 420, 380, 360, BLUE, wd); txt(g, '西部数据', 1550, 490, 40, INK, 'center', wd, 900); txt(g, '硬盘公司', 1550, 530, 24, DIM, 'center', wd);
    card(g, x - 110, y - 55, 220, 110, GOLD, wd); gtxt(g, '闪迪', x, y + 16, 44, GOLD, 'center', wd);
    chip(g, 1550, 370, '2016 · 约 160 亿美元', BLUE, wd * ap(lt, L[1], 0.4), 24); chip(g, 1180, 860, '2025.02 · 拆分上市', GOLD, wd * ap(lt, L[2] + 0.5, 0.4), 24);
    var pc = ap(lt, L[4], 0.5); if (pc > 0) { var x0 = 1060, x1 = 1780, y0 = 920; line(g, x0, y0, x1, y0, 'rgba(200,210,230,0.4)', 2, pc);
      priceLine(g, x0, x1, y0, 180, [[0, 0.75], [0.25, 0.85], [0.5, 0.6], [0.75, 0.35], [0.9, 0.05], [1, 0.0]], eo((lt - L[4]) / 1.4), RED, pc);
      glowDot(g, x1, y0, 8, RED, ap(lt, L[4] + 1.4, 0.3)); txt(g, '27.89 美元 · 2025.04', x1, y0 - 24, 24, RED, 'right', ap(lt, L[4] + 1.4, 0.3), 900); note(g, '走势为示意', pc); }
  };
  D.nand = function (g, lt, L) {
    var a = ap(lt, 0.1, 0.5) * (1 - ap(lt, L[2], 0.5) * 0.85);
    stack3d(g, 1320, 760, 420, 16, lt - 0.2, a, 16); txt(g, '一层层叠起来的存储单元', 1420, 880, 24, DIM, 'center', a);
    var d = ap(lt, L[2], 0.5);
    if (d > 0) { phone(g, 1090, 520, 170, d); txt(g, '手机', 1090, 640, 24, INK, 'center', d);
      laptop(g, 1420, 560, 210, ap(lt, L[2] + 0.4, 0.4)); txt(g, '电脑固态硬盘', 1420, 640, 24, INK, 'center', ap(lt, L[2] + 0.4, 0.4));
      rackIcon(g, 1740, 500, 220, lt, ap(lt, L[3], 0.4)); txt(g, '数据中心', 1740, 640, 24, INK, 'center', ap(lt, L[3], 0.4));
      for (var k = 0; k < 3; k++) arrow(g, 1400 + (k - 1) * 40, 640 + 20, [1090, 1420, 1740][k], 660, GOLD, ap(lt, L[4]) * 0.7, eo((lt - L[4] - k * 0.1) / 0.4), lt * 40); }
  };
  D.segments = function (g, lt, L) {
    var base = 880, k = 0.085, items = [['数据中心', 2977, BLUE, '29.8 亿'], ['边缘：手机 · 电脑', 5432, GOLD, '54.3 亿'], ['消费：U 盘 · 卡', 556, RED, '5.6 亿']];
    line(g, 1060, base, 1800, base, 'rgba(200,210,230,0.45)', 2, ap(lt, 0.1));
    items.forEach(function (it, i) { var a = ap(lt, i === 0 ? 0.2 : L[1 + i] - 0.1, 0.4), x = 1180 + i * 250, p = eo((lt - (i === 0 ? 0.3 : L[1 + i])) / 0.8);
      var hl = i === 2 && lt > L[4] ? 1 : 0; vbar(g, x, base, 140, it[1] * k * p, it[2], a, it[0], p > 0.9 ? it[3] : null);
      if (i === 0) { phone; rackIcon(g, x, base - it[1] * k * p - 120, 110, lt, a * 0.0); }
      if (hl) { g.save(); g.strokeStyle = RED; g.lineWidth = 3; g.globalAlpha *= 0.6 + 0.4 * Math.sin(lt * 8); g.strokeRect(x - 90, base - 150, 180, 200); g.restore(); txt(g, '约 6%', x, base - 170, 40, RED, 'center', 1, 900); }
    });
    mono(g, '2026 财年四季度收入', 1060, 950, 18, DIM, 'left', ap(lt, 0.4) * 0.8);
  };
  D.ai = function (g, lt, L) {
    var net = ap(lt, 0.1, 0.6) * (1 - ap(lt, L[5] - 0.2, 0.5) * 0.8);
    if (net > 0) {
      g.save(); g.globalAlpha *= net; var layers = [4, 6, 4], X = [1100, 1280, 1460], pts = [];
      layers.forEach(function (n, li) { pts.push([]); for (var i = 0; i < n; i++) pts[li].push([X[li], 600 - (n - 1) * 45 + i * 90]); });
      for (var li = 0; li < 2; li++) pts[li].forEach(function (a, i) { pts[li + 1].forEach(function (b, j) { var pulse = 0.5 + 0.5 * Math.sin(lt * 4 - li - (i + j) * 0.3);
        g.strokeStyle = rgba(BLUE, 0.12 + 0.3 * pulse); g.lineWidth = 1.5; g.beginPath(); g.moveTo(a[0], a[1]); g.lineTo(b[0], b[1]); g.stroke(); }); });
      pts.forEach(function (ly) { ly.forEach(function (p) { glowDot(g, p[0], p[1], 7, GOLD, 1); }); }); g.restore();
      var dv = ap(lt, L[2], 0.5); for (var k = 0; k < 4; k++) { box3(g, 1600, 760 - k * 70, 170, 50, 90, '#1a243e', '#121a2e', '#26324e', net * dv * ap(lt, L[2] + k * 0.15, 0.3)); }
      txt(g, '固态硬盘', 1690, 830, 24, GOLD, 'center', net * dv);
      for (var k = 0; k < 6; k++) { var q = ((lt - L[1]) * 0.8 + k / 6) % 1; if (lt < L[1]) break; glowDot(g, 1470 + 150 * q, 600 + 40 * Math.sin(q * 6 + k), 4, BLUE, net * (1 - q)); }
    }
    var b = ap(lt, L[5], 0.5);
    if (b > 0) { var base = 900; line(g, 1080, base, 1760, base, 'rgba(200,210,230,0.45)', 2, b);
      vbar(g, 1260, base, 160, 14.7 * 14 * eo((lt - L[5]) / 0.6), rgba(BLUE, 0.7), b, '上一季', '约 14.7 亿', BLUE);
      vbar(g, 1560, base, 160, 29.8 * 14 * eo((lt - L[5] - 0.4) / 0.7), GOLD, b, '最近一季', '29.8 亿');
      gtxt(g, '×2', 1410, 560, 72, GOLD, 'center', ap(lt, L[6] + 0.6, 0.3)); mono(g, '上一季按环比 +103% 推算', 1080, 960, 18, DIM, 'left', b * 0.8); }
  };
  D.price = function (g, lt, L) {
    var a = ap(lt, 0.1, 0.5) * (1 - ap(lt, L[3] - 0.2, 0.5));
    if (a > 0) {
      fab(g, 1100, 820, 1.2, lt, a); txt(g, '产能：一时扩不了', 1210, 870, 24, DIM, 'center', a);
      var dm = eo((lt - L[1]) / 1.4); arrow(g, 1500, 860, 1500, 860 - 380 * dm, BLUE, a, 1, 0); txt(g, '需求', 1500, 900, 26, BLUE, 'center', a * ap(lt, L[1]));
      var pr = eo((lt - L[2]) / 1.2); g.save(); g.globalAlpha *= a * ap(lt, L[2], 0.3); g.translate(1690, 820 - 380 * pr); g.rotate(0.1 + 0.05 * Math.sin(lt * 3));
      rr(g, -80, -36, 160, 72, 10); g.fillStyle = 'rgba(30,14,14,0.9)'; g.fill(); g.strokeStyle = RED; g.lineWidth = 3; g.shadowColor = RED; g.shadowBlur = 14; g.stroke(); g.shadowBlur = 0;
      g.font = '900 32px ' + SERIF; g.fillStyle = RED; g.textAlign = 'center'; g.fillText('价格 ↑', 0, 12); g.restore();
    }
    var b = ap(lt, L[3], 0.5);
    if (b > 0) { var base = 900, k = 5.2; line(g, 1060, base, 1800, base, 'rgba(200,210,230,0.45)', 2, b);
      vbar(g, 1180, base, 140, 19.0 * k * eo((lt - L[3]) / 0.6), rgba(BLUE, 0.6), b, '一年前', '约 19 亿', BLUE);
      vbar(g, 1420, base, 140, 59.4 * k * eo((lt - L[3] - 0.2) / 0.6), rgba(GOLD, 0.6), b, '上一季', '约 59 亿', GOLD);
      var p4 = eo((lt - L[3] - 0.4) / 0.7); vbar(g, 1660, base, 140, 59.4 * k * p4, rgba(GOLD, 0.6), b, '最近一季', null);
      var inc = 30.3 * k * eo((lt - L[5] - 0.2) / 0.7), x = 1660, top = base - 59.4 * k;
      if (lt > L[3] + 1.1 && lt < L[5]) vbar(g, x, top, 140, 30.3 * k * eo((lt - L[3] - 1.1) / 0.5), GOLD, b, null, null);
      if (lt >= L[5]) { g.save(); g.globalAlpha *= b; g.fillStyle = BLUE; g.fillRect(x - 70, top - 30.3 * k / 3, 140, 30.3 * k / 3); g.fillStyle = RED; g.shadowColor = RED; g.shadowBlur = 16; g.fillRect(x - 70, top - 30.3 * k, 140, 30.3 * k * 2 / 3 * eo((lt - L[5]) / 0.6)); g.restore();
        txt(g, '涨价 ≈ 2/3', x + 86, top - 30.3 * k * 0.6, 24, RED, 'left', ap(lt, L[5] + 0.5), 900); txt(g, '多卖 ≈ 1/3', x + 86, top - 30.3 * k / 6 + 8, 22, BLUE, 'left', ap(lt, L[5] + 0.5)); }
      txt(g, '89.7 亿', 1660, base - 89.7 * k - 16, 30, GOLD, 'center', ap(lt, L[4]), 900);
      mono(g, '一年前、上一季由同比 +372%、环比 +51% 推算', 1060, 960, 18, DIM, 'left', b * 0.8); }
  };
  function tally(g, x, y, n, lit, col, a, h) { ticks(g, x, y, n, lit, col, a, h || 56, 7.2); }
  D.margin = function (g, lt, L) {
    var a = ap(lt, 0.1, 0.5) * (1 - ap(lt, L[3] - 0.2, 0.5));
    if (a > 0) {
      txt(g, '每卖 100 美元', 1060, 470, 28, INK, 'left', a, 900);
      tally(g, 1060, 580, 100, Math.round(85 * eo((lt - L[1] - 0.2) / 1.6)), GOLD, a); txt(g, '闪迪 84.6', 1060 + 85 * 7.2 + 10, 570, 26, GOLD, 'left', ap(lt, L[1] + 1.6) * a, 900);
      mono(g, '金色 = 毛利（收入 − 生产成本）', 1060, 610, 18, DIM, 'left', a * ap(lt, L[1] + 0.5));
      var n2 = ap(lt, L[2], 0.4); tally(g, 1060, 730, 100, Math.round(75 * eo((lt - L[2] - 0.1) / 1.2)), BLUE, a * n2); txt(g, '英伟达 75', 1060 + 75 * 7.2 + 10, 720, 26, BLUE, 'left', ap(lt, L[2] + 1.2) * a, 900);
    }
    var b = ap(lt, L[3], 0.5);
    if (b > 0) { var base = 640, k = 4.2; line(g, 1080, base, 1760, base, 'rgba(200,210,230,0.5)', 2, b);
      vbar(g, 1260, base, 180, -16 * k * eo((lt - L[3] - 0.1) / 0.5), RED, b, '2025 财年全年', '−16 亿');
      vbar(g, 1580, base, 180, 69 * k * eo((lt - L[4] - 0.1) / 0.7), GOLD, ap(lt, L[4], 0.3), '最近一个季度', '+69 亿');
      mono(g, '净利润', 1080, base - 20, 18, DIM, 'left', b * 0.8); }
  };
  D.question = function (g, lt, L) {
    var a = ap(lt, 0.1, 0.5);
    priceLine(g, 1100, 1700, 860, 420, [[0, 0.1], [0.3, 0.3], [0.6, 0.7], [0.8, 0.95], [0.9, 1.0]], eo(lt / 1.6), GOLD, a);
    gtxt(g, '?', 1720, 470, 160, GOLD, 'center', ap(lt, L[1] + 0.3, 0.3) * (0.85 + 0.15 * Math.sin(lt * 5)));
  };
  D.cycle = function (g, lt, L) {
    var a = ap(lt, 0, 0.3) * (1 - ap(lt, L[3] - 0.2, 0.5) * 0.92), x0 = 1040, x1 = 1800, ym = 680, A = 150;
    if (a > 0) {
      var p = eo((lt - 0.1) / 2.4); g.save(); g.globalAlpha *= a; g.beginPath();
      for (var i = 0; i <= 200 * p; i++) { var u = i / 200, x = x0 + (x1 - x0) * u, y = ym - A * Math.sin(u * 6.283 * 1.5 - 0.6); if (i) g.lineTo(x, y); else g.moveTo(x, y); }
      g.strokeStyle = GOLD; g.lineWidth = 4; g.shadowColor = GOLD; g.shadowBlur = 16; g.stroke(); g.restore();
      var labs = [['缺货', 0.08], ['涨价', 0.23], ['扩产', 0.33], ['过剩', 0.45], ['跌价', 0.565], ['减产', 0.72]];
      labs.forEach(function (l, i) { var u = l[1], x = x0 + (x1 - x0) * u, y = ym - A * Math.sin(u * 6.283 * 1.5 - 0.6), q = ap(lt, L[1] + i * 0.35, 0.3);
        glowDot(g, x, y, 6, i >= 3 && i <= 4 ? RED : GOLD, a * q); txt(g, l[0], x, y + (y < ym ? -24 : 44), 26, i >= 3 && i <= 4 ? RED : INK, 'center', a * q, 900); });
      note(g, '周期示意', a);
    }
    var b = ap(lt, L[3], 0.5);
    if (b > 0) { var base = 560, k = 12; line(g, 1080, base, 1760, base, 'rgba(200,210,230,0.5)', 2, b); chip(g, 1420, 470, '2022 年四季度 · 一个季度', BLUE, b, 24);
      vbar(g, 1260, base, 170, -22.8 * k * eo((lt - L[4] - 0.1) / 0.6), RED, ap(lt, L[4], 0.3), '闪存均价', '−22.8%');
      vbar(g, 1580, base, 170, -25 * k * eo((lt - L[5] - 0.1) / 0.6), RED, ap(lt, L[5], 0.3), '全行业收入', '−25%');
      stamp(g, 1600, 930, '减产 · 减记库存', lt - L[7] - 0.4, b); }
  };
  D.now = function (g, lt, L) {
    var a = ap(lt, 0.1, 0.5);
    chip(g, 1420, 330, '四季度闪存合约价预计 +15% ~ 20%', BLUE, ap(lt, L[1] + 0.3, 0.4), 26);
    var u = eo((lt - L[3]) / 1.0), d = eo((lt - L[4]) / 1.0);
    card(g, 1060, 420, 330, 470, GOLD, a); rackIcon(g, 1225, 560, 170, lt, a); txt(g, 'AI 服务器', 1225, 700, 30, INK, 'center', a, 900);
    arrow(g, 1225, 860, 1225, 860 - 120 * u, GOLD, a * ap(lt, L[3]), 1, 0); txt(g, '越要越多', 1225, 880, 24, GOLD, 'center', a * ap(lt, L[3] + 0.4), 900);
    card(g, 1450, 420, 330, 470, RED, a); phone(g, 1560, 560, 140, a); laptop(g, 1680, 610, 120, a); txt(g, '手机 · 电脑', 1615, 700, 30, INK, 'center', a, 900);
    arrow(g, 1540, 790, 1540 + 150 * d, 790 + 40 * d, RED, a * ap(lt, L[4]), 1, 0); txt(g, '买不动了', 1615, 880, 24, RED, 'center', a * ap(lt, L[4] + 0.4), 900);
    chip(g, 1615, 960, '硬盘容量做小', RED, ap(lt, L[5] + 0.3, 0.4), 22);
  };
  D.contracts = function (g, lt, L) {
    var a = ap(lt, 0.1, 0.5) * (1 - ap(lt, L[4] - 0.2, 0.5) * 0.93);
    if (a > 0) {
      for (var i = 0; i < 8; i++) { var q = cl((lt - L[1] - 0.4 - 0.18 * i) / 0.3); doc(g, 1120 + i * 80, 600 - (1 - eo(q)) * 120, 110, 150, a * Math.max(0.12, q), (i - 3.5) * 0.04, i === 0 ? null : null, i); }
      var fl = ap(lt, L[2], 0.4); line(g, 1060, 760, 1780, 760, GOLD, 4, a * fl); txt(g, '保底价', 1780, 745, 24, GOLD, 'right', a * fl, 900); lock(g, 1100, 820, 0.5, 1, a * fl);
      var v = ap(lt, L[3], 0.4); for (var k = 0; k < 10; k++) coin(g, 1300 + k * 40, 900 - (k % 3) * 8, 18, a * v * ap(lt, L[3] + k * 0.08, 0.2)); txt(g, '保证金', 1500, 960, 24, GOLD, 'center', a * v);
    }
    var b = ap(lt, L[4], 0.5);
    if (b > 0) { var x0 = 1100, w = 640;
      function row(y, f, lab, t0) { var p = eo((lt - t0) / 0.7); g.save(); g.globalAlpha *= b * ap(lt, t0 - 0.1, 0.3); g.fillStyle = GOLD; g.shadowColor = GOLD; g.shadowBlur = 12; g.fillRect(x0, y, w * f * p, 60); g.shadowBlur = 0;
        var pulse = lt > L[6] ? 0.35 + 0.3 * Math.sin(lt * 8) : 0.22; g.fillStyle = 'rgba(239,91,67,' + pulse.toFixed(2) + ')'; g.fillRect(x0 + w * f, y, w * (1 - f) * p, 60); g.restore();
        txt(g, lab, x0 - 16, y + 40, 26, INK, 'right', b * ap(lt, t0 - 0.1, 0.3), 900); txt(g, '锁定', x0 + 14, y + 40, 24, '#1b1408', 'left', b * ap(lt, t0 + 0.6, 0.3), 900); txt(g, '随行就市', x0 + w - 14, y + 40, 24, INK, 'right', b * ap(lt, t0 + 0.6, 0.3), 900); }
      row(470, 0.5, '2027 财年', L[4]); row(600, 2 / 3, '2028 财年', L[5]); }
  };
  D.value = function (g, lt, L) {
    var a = ap(lt, 0.1, 0.5);
    chip(g, 1420, 340, '10 月 20 日 收盘约 1370 美元', GOLD, a, 30);
    var r = ap(lt, L[2], 0.5);
    if (r > 0) { var x0 = 1080, x1 = 1760, y = 620; function X(v) { return x0 + (x1 - x0) * v / 25; }
      g.save(); g.globalAlpha *= r; line(g, x0, y, x1, y, 'rgba(200,210,230,0.6)', 3, 1);
      for (var v = 0; v <= 25; v += 5) { line(g, X(v), y - 10, X(v), y + 10, 'rgba(200,210,230,0.6)', 2, 1); mono(g, v + '', X(v), y + 40, 20, DIM, 'center', 1); }
      mono(g, '市盈率（倍）', x1, y + 72, 18, DIM, 'right', 1); g.restore();
      glowDot(g, X(19), y, 12, BLUE, r); txt(g, '过去一年利润：约 19 倍', X(19), y - 34, 26, BLUE, 'center', r, 900);
      var e = ap(lt, L[3] + 0.3, 0.4); glowDot(g, X(8), y, 12, GOLD, e); txt(g, '本季指引 ×4：约 8 倍', X(8), y + 112, 26, GOLD, 'center', e, 900);
      arrow(g, X(19) - 20, y + 30, X(8) + 24, y + 30, GOLD, e * 0.7, eo((lt - L[3] - 0.3) / 0.6), 0); }
    var q = ap(lt, L[4], 0.5); if (q > 0) { card(g, 1180, 830, 500, 120, RED, q); txt(g, '市场不信：', 1430, 880, 28, INK, 'center', q, 900); txt(g, '今天的利润能一直保持', 1430, 924, 28, RED, 'center', ap(lt, L[5], 0.4), 900); }
  };
  D.bet = function (g, lt, L) {
    var a = ap(lt, 0.1, 0.5) * (1 - ap(lt, L[6] - 0.2, 0.5) * 0.93), x0 = 1080, y0 = 640;
    glowDot(g, x0, y0, 12, INK, a); txt(g, '高价能撑多久', x0, y0 + 50, 24, DIM, 'center', a);
    var u = eo((lt - L[2] - 0.1) / 0.8); if (u > 0) { g.save(); g.globalAlpha *= a; g.strokeStyle = GOLD; g.lineWidth = 4; g.shadowColor = GOLD; g.shadowBlur = 14; g.beginPath(); g.moveTo(x0, y0);
      g.bezierCurveTo(x0 + 180, y0, x0 + 200, y0 - 200 * u, x0 + 360 * u, y0 - 200 * u); g.stroke(); g.restore();
      card(g, 1450, y0 - 290, 360, 170, GOLD, a * ap(lt, L[2] + 0.5)); txt(g, '押对：合同托底、AI 要货', 1630, y0 - 232, 24, INK, 'center', a * ap(lt, L[2] + 0.5)); txt(g, '利润还能涨', 1630, y0 - 178, 32, GOLD, 'center', a * ap(lt, L[3]), 900); }
    var d = eo((lt - L[4] - 0.1) / 0.8); if (d > 0) { g.save(); g.globalAlpha *= a; g.strokeStyle = RED; g.lineWidth = 4; g.shadowColor = RED; g.shadowBlur = 14; g.beginPath(); g.moveTo(x0, y0);
      g.bezierCurveTo(x0 + 180, y0, x0 + 200, y0 + 200 * d, x0 + 360 * d, y0 + 200 * d); g.stroke(); g.restore();
      card(g, 1450, y0 + 120, 360, 170, RED, a * ap(lt, L[4] + 0.5)); txt(g, '押错：价格回落', 1630, y0 + 178, 24, INK, 'center', a * ap(lt, L[4] + 0.5)); txt(g, '一半利润掉得快', 1630, y0 + 232, 32, RED, 'center', a * ap(lt, L[5]), 900); }
    var c = ap(lt, L[6], 0.5); if (c > 0) { var cx0 = 1080, cx1 = 1760, cy0 = 920; priceLine(g, cx0, cx1, cy0, 360, [[0, 1.0], [0.3, 0.74], [0.5, 0.78], [0.75, 0.66], [1, 0.58]], eo((lt - L[6]) / 1.0), RED, c);
      glowDot(g, cx0, cy0 - 360, 8, RED, c); txt(g, '2354', cx0 + 14, cy0 - 372, 24, RED, 'left', c, 900); glowDot(g, cx1, cy0 - 360 * 0.58, 8, GOLD, ap(lt, L[6] + 1.0, 0.3));
      txt(g, '约 1370 · −42%', cx1, cy0 - 360 * 0.58 + 44, 26, GOLD, 'right', ap(lt, L[6] + 1.0, 0.3), 900); note(g, '走势为示意', c); }
  };
  D.checklist = function (g, lt, L) {
    var a = ap(lt, 0.1, 0.5);
    card(g, 1040, 330, 760, 330, GOLD, a); txt(g, '这三条都符合，才值得研究', 1080, 390, 30, GOLD, 'left', a, 900);
    ['相信 AI 存储需求还会涨好几年', '能承受股价跌一半', '愿意每季度盯价格和财报'].forEach(function (s, i) { var y = 460 + i * 64, on = cl((lt - L[2 + i] - 0.2) / 0.4);
      check(g, 1100, y - 10, on, GOLD, a); txt(g, s, 1140, y, 28, INK, 'left', a * (0.5 + 0.5 * on)); });
    var b = ap(lt, L[5] - 0.1, 0.4); card(g, 1040, 700, 760, 250, RED, b); txt(g, '特别小心', 1080, 760, 30, RED, 'left', b, 900);
    ['这笔钱需要稳定', '只因为“涨了很多”想追'].forEach(function (s, i) { var y = 830 + i * 60, on = ap(lt, L[5 + i], 0.3); txt(g, '⚠  ' + s, 1100, y, 28, INK, 'left', b * on); });
  };
  D.earnings = function (g, lt, L) {
    var a = ap(lt, 0.1, 0.5) * (1 - ap(lt, L[5], 0.5) * 0.6);
    card(g, 1060, 320, 240, 240, BLUE, a); txt(g, '10 月', 1180, 380, 30, DIM, 'center', a, 900); gtxt(g, '29', 1180, 500, 110, INK, 'center', a);
    var it = [['收入', '103 – 108 亿？'], ['毛利率', '守住 83% 以上？'], ['下一季指引', '继续涨，还是放缓？']];
    it.forEach(function (s, i) { var y = 360 + i * 90, q = ap(lt, L[2 + i], 0.4); txt(g, s[0], 1360, y, 28, DIM, 'left', a * q, 900); txt(g, s[1], 1360, y + 40, 32, i === 2 ? GOLD : INK, 'left', a * q, 900); });
    var d = ap(lt, L[5], 0.5); if (d > 0) { card(g, 560, 840, 800, 130, '#9aa3b2', d); txt(g, '信息整理，不构成投资建议', 960, 896, 34, INK, 'center', d, 900); txt(g, '数据截至 2026 年 10 月 20 日', 960, 942, 24, DIM, 'center', ap(lt, L[6])); }
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
  var NODES = [['闪', '闪存起家', '1988 · SunDisk'], ['存', 'AI 要存储', '数据中心季收入翻倍'], ['涨', '涨价暴赚', '毛利率 84.6%'], ['周', '押的是周期', '高价能撑多久']];
  function recap(g, sc, lt) {
    var xs = [420, 790, 1160, 1530], y = 600;
    g.save(); var w = 1240 * eo((lt - 0.2) / (sc.ls[3] + 0.6));
    g.strokeStyle = 'rgba(240,189,92,0.6)'; g.lineWidth = 2; g.shadowColor = '#f0bd5c'; g.shadowBlur = 10; g.beginPath(); g.moveTo(360, y); g.lineTo(360 + w, y); g.stroke(); g.shadowBlur = 0;
    NODES.forEach(function (n, k) {
      var p = cl((lt - sc.ls[k] - 0.1) / 0.5); if (p <= 0) return; var x = xs[k], col = k === 3 ? BLUE : GOLD;
      g.globalAlpha = p; g.fillStyle = col; g.shadowColor = col; g.shadowBlur = 16; g.beginPath(); g.arc(x, y, 9, 0, 6.29); g.fill(); g.shadowBlur = 0;
      g.strokeStyle = rgba(col, 0.8 * (1 - p)); g.beginPath(); g.arc(x, y, 9 + 40 * p, 0, 6.29); g.stroke();
      g.textAlign = 'center'; g.font = '900 96px ' + SERIF; g.fillStyle = k === 3 ? '#cfe0ff' : '#f6dfae'; g.shadowColor = rgba(col, 0.7); g.shadowBlur = 24; g.fillText(n[0], x, y - 44); g.shadowBlur = 0;
      g.font = '700 30px ' + SERIF; g.fillStyle = '#ece6da'; g.fillText(n[1], x, y + 62); g.font = '500 20px ' + MONO; g.fillStyle = 'rgba(200,190,170,0.8)'; g.fillText(n[2], x, y + 98);
    });
    var tp = E((lt - sc.ls[3] - 1.6) / 0.8);
    if (tp > 0) { g.globalAlpha = tp; g.font = '900 56px ' + SERIF; g.shadowColor = 'rgba(0,0,0,0.9)'; g.shadowBlur = 14;
      var s1 = '卖内存卡的，凭什么涨了', s2 = '几十倍', s3 = '？', w1 = g.measureText(s1).width, w2 = g.measureText(s2).width, w3 = g.measureText(s3).width, x0 = 960 - (w1 + w2 + w3) / 2;
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
    g.globalAlpha = E((lt - 1.2) / 0.5); g.textAlign = 'center'; g.font = '700 26px ' + SERIF; g.fillStyle = '#ece6da'; g.fillText('信息整理，不构成投资建议 · 数据截至 2026 年 10 月 20 日', 960, 930);
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
