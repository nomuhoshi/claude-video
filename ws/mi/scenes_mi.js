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
  // ---------- Michelson props ----------
  var PH = new Image(); PH.src = window.PHOTO_URI || ''; window.__PH = PH;
  var SILV = '#c9d4e6', STONE = '#8b7b64', STONE_D = '#4e4436', VIO = '#b98cff';
  function person(g, x, y, s, col, a, lean) {                          // a small standing figure
    if (a <= 0) return; g.save(); g.globalAlpha *= a; g.translate(x, y); g.scale(s, s); g.rotate(lean || 0);
    g.fillStyle = col; g.shadowColor = col; g.shadowBlur = 8; g.beginPath(); g.arc(0, -86, 15, 0, 6.29); g.fill();
    g.beginPath(); g.moveTo(-18, -66); g.lineTo(18, -66); g.lineTo(24, -4); g.lineTo(-24, -4); g.closePath(); g.fill(); g.restore();
  }
  function seg(g, x0, y0, x1, y1, p, col, w, a) {                      // a partially drawn glowing beam
    if (a <= 0 || p <= 0) return; p = cl(p); g.save(); g.globalAlpha *= a; g.strokeStyle = col || GOLD; g.lineWidth = w || 3; g.shadowColor = col || GOLD; g.shadowBlur = 12;
    g.beginPath(); g.moveTo(x0, y0); g.lineTo(x0 + (x1 - x0) * p, y0 + (y1 - y0) * p); g.stroke(); g.restore();
  }
  function fringes(g, x, y, w, h, shift, a, bright) {                  // vertical bright/dark bands
    if (a <= 0) return; g.save(); g.globalAlpha *= a; g.beginPath(); g.rect(x, y, w, h); g.clip();
    var per = 44; for (var i = 0; i < w; i += 2) { var v = 0.5 + 0.5 * Math.cos(((i - w / 2) / per - shift) * 6.283); g.fillStyle = 'rgba(255,222,150,' + ((bright || 0.8) * (0.1 + 0.9 * v * v)).toFixed(3) + ')'; g.fillRect(x + i, y, 2, h); }
    g.restore(); g.save(); g.globalAlpha *= a; g.strokeStyle = 'rgba(200,210,230,0.7)'; g.lineWidth = 3; g.strokeRect(x, y, w, h); g.restore();
  }
  function slab(g, cx, cy, size, ang, a, beams, lt) {                  // stone slab floating in a mercury trough, seen from above at a slant
    if (a <= 0) return; g.save(); g.globalAlpha *= a;
    var rx = size * 1.32, ry = size * 0.56;
    var gr = g.createRadialGradient(cx - rx * 0.2, cy - ry * 0.3, 10, cx, cy, rx); gr.addColorStop(0, '#9aa6bd'); gr.addColorStop(0.55, '#65718a'); gr.addColorStop(1, '#363e52');
    g.fillStyle = gr; g.shadowColor = 'rgba(160,190,240,0.35)'; g.shadowBlur = 14; g.beginPath(); g.ellipse(cx, cy + 22, rx, ry, 0, 0, 6.29); g.fill(); g.shadowBlur = 0;
    g.strokeStyle = 'rgba(190,205,230,0.7)'; g.lineWidth = 3; g.stroke();
    for (var k = 26; k >= 0; k -= 2) {
      g.save(); g.translate(cx, cy + k * 0.8); g.scale(1, 0.42); g.rotate(ang); g.fillStyle = k ? 'rgb(' + (46 + k) + ',' + (40 + k) + ',' + (32 + k) + ')' : '#6d6049';
      g.fillRect(-size / 2, -size / 2, size, size);
      if (!k) { g.strokeStyle = 'rgba(40,30,20,0.5)'; g.lineWidth = 3; g.strokeRect(-size / 2, -size / 2, size, size); if (beams) beams(g, size); }
      g.restore();
    }
    g.restore();
  }
  function wavePair(g, x, y, w, off, a) {                              // two waves and their sum: off = phase offset in waves
    if (a <= 0) return; g.save(); g.globalAlpha *= a; var k = 6.283 * 3 / w, amp = 34;
    function wave(yy, ph, col, am) { g.strokeStyle = col; g.lineWidth = 4; g.shadowColor = col; g.shadowBlur = 10; g.beginPath(); for (var i = 0; i <= w; i += 3) { var v = Math.sin(k * i + ph) * am; if (i) g.lineTo(x + i, yy - v); else g.moveTo(x + i, yy - v); } g.stroke(); }
    wave(y - 90, 0, GOLD, amp); wave(y, off * 6.283, BLUE, amp);
    var amS = amp * 2 * Math.abs(Math.cos(off * 3.1416)); g.strokeStyle = 'rgba(200,210,230,0.3)'; g.lineWidth = 2; g.beginPath(); g.moveTo(x, y + 110); g.lineTo(x + w, y + 110); g.stroke();
    g.strokeStyle = '#ffffff'; g.lineWidth = 4; g.shadowColor = '#ffffff'; g.shadowBlur = 12; g.beginPath(); for (var j = 0; j <= w; j += 3) { var u = (Math.sin(k * j) + Math.sin(k * j + off * 6.283)) * amp * 0.5; if (j) g.lineTo(x + j, y + 110 - u); else g.moveTo(x + j, y + 110 - u); } g.stroke();
    g.restore();
  }
  function mountain(g, x, y, w, h, a, col) {
    if (a <= 0) return; g.save(); g.globalAlpha *= a; var gr = g.createLinearGradient(0, y - h, 0, y); gr.addColorStop(0, col || '#4a5a7e'); gr.addColorStop(1, '#1a2238');
    g.fillStyle = gr; g.beginPath(); g.moveTo(x - w / 2, y); g.lineTo(x - w * 0.12, y - h * 0.82); g.lineTo(x - w * 0.02, y - h * 0.7); g.lineTo(x + w * 0.04, y - h); g.lineTo(x + w * 0.2, y - h * 0.62); g.lineTo(x + w / 2, y); g.closePath(); g.fill();
    g.strokeStyle = 'rgba(200,215,240,0.5)'; g.lineWidth = 2; g.stroke(); g.restore();
  }
  function medal(g, x, y, r, a) {
    if (a <= 0) return; g.save(); g.globalAlpha *= a; var gr = g.createRadialGradient(x - r * 0.3, y - r * 0.3, 2, x, y, r); gr.addColorStop(0, '#fff0c0'); gr.addColorStop(0.6, '#d9a040'); gr.addColorStop(1, '#8a5c18');
    g.fillStyle = gr; g.shadowColor = GOLD; g.shadowBlur = 20; g.beginPath(); g.arc(x, y, r, 0, 6.29); g.fill(); g.shadowBlur = 0;
    g.strokeStyle = 'rgba(110,70,20,0.7)'; g.lineWidth = 3; g.beginPath(); g.arc(x, y, r * 0.8, 0, 6.29); g.stroke();
    g.font = '900 ' + Math.round(r * 0.5) + 'px ' + SERIF; g.fillStyle = '#6a4410'; g.textAlign = 'center'; g.fillText('1907', x, y + r * 0.18); g.restore();
  }
  function photo(g, x, y, w, a) {                                      // the supplied portrait, grey + warm brown, in a thin gold frame
    if (a <= 0 || !PH.complete || !PH.naturalWidth) return; var h = w * PH.naturalHeight / PH.naturalWidth; g.save(); g.globalAlpha *= a;
    g.shadowColor = 'rgba(0,0,0,0.7)'; g.shadowBlur = 30; g.fillStyle = '#000'; g.fillRect(x - w / 2, y - h / 2, w, h); g.shadowBlur = 0;
    g.filter = 'grayscale(1) sepia(0.5) brightness(0.9)'; g.drawImage(PH, x - w / 2, y - h / 2, w, h); g.filter = 'none';
    g.strokeStyle = '#d3a94f'; g.lineWidth = 5; g.strokeRect(x - w / 2 - 2.5, y - h / 2 - 2.5, w + 5, h + 5); g.restore();
  }

  // ---------- scenes ----------
  var D = {};
  // hook: the slab turns on the mercury; two people watch the fringes; nothing moves
  D.h0 = function (g, lt, L) {
    chip(g, 1400, 320, '克利夫兰 · 1887', BLUE, ap(lt, L[0], 0.4), 30);
    chip(g, 1400, 392, '地下室', DIM, ap(lt, L[1], 0.4), 26);
    var a = ap(lt, L[2], 0.8), spin = lt > L[3] ? E((lt - L[3]) / 1.6) * (lt - L[3]) * 0.35 : 0;
    slab(g, 1400, 650, 230, spin, a, function (gg, s) {
      gg.strokeStyle = 'rgba(240,189,92,0.75)'; gg.lineWidth = 3; gg.beginPath(); gg.moveTo(-s * 0.36, 0); gg.lineTo(s * 0.36, 0); gg.moveTo(0, -s * 0.36); gg.lineTo(0, s * 0.36); gg.stroke();
      gg.fillStyle = '#e8f0ff'; [[-0.38, 0], [0.38, 0], [0, -0.38], [0, 0.38]].forEach(function (p) { gg.fillRect(p[0] * s - 8, p[1] * s - 8, 16, 16); });
    });
    chip(g, 1400, 900, '石板 · 漂在水银上', SILV, ap(lt, L[2], 0.4) * (1 - ap(lt, L[4], 0.5)), 26);
    var p = ap(lt, L[4], 0.6); person(g, 1090, 800, 1.2, '#9fb4d8', p, 0.12); person(g, 1730, 800, 1.2, '#d8c49a', p * ap(lt, L[4] + 0.5, 0.4), -0.12);
    var f = ap(lt, L[5], 0.5); fringes(g, 1580, 270, 250, 120, 0, f); chip(g, 1705, 430, '条纹', GOLD, f, 26);
    var gh = lt > L[6] ? 0.5 + 0.5 * Math.sin((lt - L[6]) * 4) : 0; gh *= ap(lt, L[6], 0.4) * (1 - ap(lt, L[7] - 0.1, 0.2)); if (gh > 0) { fringes(g, 1580, 270, 250, 120, 0.4, 0.35 * gh, 0.7); chip(g, 1705, 490, '等它移动', BLUE, gh, 24); }
    var st = ap(lt, L[7], 0.3); if (st > 0) chip(g, 1705, 490, '一动不动', RED, st, 28);
  };
  // 1852–: Prussia → California → Nevada, a shop in the mining town
  D.town = function (g, lt, L) {
    var A = [1200, 760], B = [1480, 470], C = [1700, 640];
    var a = ap(lt, L[0], 0.5); glowDot(g, A[0], A[1], 14, GOLD, a); chip(g, A[0], A[1] + 62, '普鲁士 · 1852', GOLD, a, 28);
    chip(g, A[0], A[1] + 128, '今天的波兰', BLUE, ap(lt, L[1], 0.4), 24);
    arrow(g, A[0] + 20, A[1] - 20, B[0] - 24, B[1] + 20, BLUE, ap(lt, L[2], 0.3), eo((lt - L[2]) / 1.1), lt * 40); txt(g, '1855 · 两岁', 1290, 600, 26, BLUE, 'right', ap(lt, L[2] + 0.4, 0.4), 900);
    var b = ap(lt, L[3], 0.5); glowDot(g, B[0], B[1], 14, GOLD, b); chip(g, B[0], B[1] - 66, '加州 · 淘金矿镇', GOLD, b, 28);
    arrow(g, B[0] + 24, B[1] + 12, C[0] - 24, C[1] - 24, BLUE, ap(lt, L[4], 0.3), eo((lt - L[4]) / 1.0), lt * 40);
    var c = ap(lt, L[4] + 0.5, 0.5); glowDot(g, C[0], C[1], 14, GOLD, c); chip(g, C[0], C[1] - 66, '内华达 · 银矿镇', GOLD, c, 28);
    var s = ap(lt, L[5], 0.5); house(g, C[0] + 20, C[1] + 230, 1.15, s); chip(g, C[0] + 20, C[1] + 255, '父亲的杂货店', INK, s, 26);
  };
  // 1869: the Naval Academy, the White House, the physics classroom
  D.pres = function (g, lt, L) {
    var a = ap(lt, L[0], 0.5); card(g, 1160, 300, 540, 100, BLUE, a); txt(g, '海军学院', 1430, 366, 44, BLUE, 'center', a, 900);
    txt(g, '16 岁', 1230, 470, 34, GOLD, 'center', ap(lt, L[0], 0.4), 900);
    var x = ap(lt, L[1], 0.4); if (x > 0) { chip(g, 1430, 450, '名额给了别人', RED, x * (1 - ap(lt, L[3], 0.5)), 28); }
    var q = ap(lt, L[2], 0.5); if (q > 0) chip(g, 1250, 560, '据他后来的回忆', DIM, q, 24);
    var w = ap(lt, L[3], 0.5); house(g, 1640, 690, 1.6, w); chip(g, 1640, 720, '白宫 · 华盛顿', INK, w, 26);
    if (w > 0) { var p = eo((lt - L[3]) / 1.4); person(g, 1180 + 330 * p, 760, 0.95, '#d8c49a', w, 0.0); chip(g, 1300, 800, '当面请求', GOLD, ap(lt, L[4], 0.4), 26); }
    var ok = ap(lt, L[5], 0.5); if (ok > 0) { g.save(); g.globalAlpha *= ok; g.strokeStyle = '#7dffb0'; g.shadowColor = '#7dffb0'; g.shadowBlur = 14; g.lineWidth = 9; g.lineCap = 'round'; g.beginPath(); g.moveTo(1590, 330); g.lineTo(1628, 366); g.lineTo(1670, 310); g.stroke(); g.restore(); }
    var t = ap(lt, L[7], 0.5); if (t > 0) { card(g, 1160, 880, 540, 70, GOLD, t); txt(g, '1875 · 回母校 · 教物理', 1430, 928, 32, GOLD, 'center', t, 900); }
  };
  // 1878–79: the rotating mirror
  D.mirror = function (g, lt, L) {
    var e = ap(lt, L[2], 0.5) * (1 - ap(lt, L[4], 0.5)); var cx = 1380, cy = 620;
    if (e > 0) { g.save(); g.globalAlpha *= e; var gr = g.createRadialGradient(cx - 30, cy - 30, 4, cx, cy, 130); gr.addColorStop(0, '#9fd0ff'); gr.addColorStop(0.5, '#2f6db0'); gr.addColorStop(1, '#14305a');
      g.fillStyle = gr; g.beginPath(); g.arc(cx, cy, 130, 0, 6.29); g.fill(); g.strokeStyle = 'rgba(200,225,255,0.7)'; g.lineWidth = 3; g.beginPath(); g.arc(cx, cy, 210, 0, 6.29); g.stroke(); g.restore();
      var pr = lt > L[3] ? (lt - L[3]) * 1.0 : 0; var an = pr * 6.283 * 1.7; if (lt > L[3]) glowDot(g, cx + Math.cos(an) * 210, cy + Math.sin(an) * 210, 10, GOLD, e);
      chip(g, cx, cy + 270, '一秒 · 七圈半', GOLD, e * ap(lt, L[3], 0.4), 30); }
    var s = ap(lt, L[4], 0.6); if (s > 0) {
      var rx = 1160, ry = 640, fx = 1760;                                                 // source/rotating mirror (left), far mirror (right)
      g.save(); g.globalAlpha *= s; g.fillStyle = '#e8f0ff'; g.fillRect(fx, ry - 60, 14, 120); g.restore(); chip(g, fx, ry + 100, '远处的镜子', SILV, s, 24);
      var rot = lt * 7; g.save(); g.globalAlpha *= s; g.translate(rx, ry); g.rotate(rot); g.strokeStyle = '#e8f0ff'; g.lineWidth = 8; g.shadowColor = '#bcd8ff'; g.shadowBlur = 12; g.beginPath(); g.moveTo(-40, 0); g.lineTo(40, 0); g.stroke(); g.restore();
      chip(g, rx, ry + 100, '转镜', BLUE, s * ap(lt, L[5], 0.4), 26);
      var go = eo((lt - L[6]) / 0.7), back = eo((lt - L[7]) / 0.7);
      seg(g, rx, ry, fx, ry - 6, go, GOLD, 4, s); seg(g, fx, ry - 6, rx + 30, ry - 6 + 20 * ap(lt, L[8], 0.5) - 20, back, GOLD, 4, s);
      var sp = ap(lt, L[8], 0.5); if (sp > 0) { glowDot(g, rx + 30, ry + 0 - 6 + 10 * sp, 8, '#fff3c8', sp); }
      var ang = ap(lt, L[9], 0.5); if (ang > 0) { chip(g, 1360, 760, '光点偏了一点点', RED, ang, 28); arrow(g, 1190, 626, 1190, 666, RED, ang, 1, 0); }
      var th = ap(lt, L[11], 0.5); if (th > 0) { chip(g, 1360, 330, '自己花了 10 美元', GOLD, th, 30); }
      var bg = ap(lt, L[13], 0.5); if (bg > 0) chip(g, 1360, 400, '后来拿到 2000 美元，装置做大', BLUE, bg, 26);
    }
    var age = ap(lt, L[16], 0.5); if (age > 0) chip(g, 1650, 880, '26 岁', GOLD, age, 34);
  };
  // 1879 →: light as a wave, the ether, the ether wind
  D.ether = function (g, lt, L) {
    var w = ap(lt, L[0], 0.5) * (1 - ap(lt, L[3], 0.5));
    if (w > 0) { for (var k = 0; k < 4; k++) { var p = ((lt * 0.5) + k / 4) % 1; g.strokeStyle = rgba(BLUE, 0.6 * (1 - p)); g.lineWidth = 3; g.beginPath(); g.arc(1300, 620, 30 + p * 200, 0, 6.29); g.stroke(); }
      txt(g, '水波', 1300, 900, 28, BLUE, 'center', w * ap(lt, L[1], 0.4), 900);
      for (var m = 0; m < 4; m++) { var q = ((lt * 0.7) + m / 4) % 1; g.strokeStyle = rgba(GOLD, 0.5 * (1 - q)); g.beginPath(); g.arc(1650, 620, 20 + q * 150, -0.9, 0.9); g.stroke(); }
      txt(g, '声波', 1700, 900, 28, GOLD, 'center', w * ap(lt, L[1] + 0.3, 0.4), 900); gtxt(g, '光呢？', 1480, 520, 70, INK, 'center', ap(lt, L[2], 0.4)); }
    var h = ap(lt, L[4], 0.8); if (h > 0) {                                              // the ether: a haze of faint dots everywhere
      g.save(); g.globalAlpha *= h * 0.8; for (var i = 0; i < 90; i++) { var x = 1090 + rnd(i) * 740, y = 290 + rnd(i + 91) * 620, dx = (lt * 18 * (ap(lt, L[6], 1) * 0.8 + 0.2)) % 740; var xx = 1090 + ((x - 1090 - dx + 740 * 3) % 740);
        g.fillStyle = 'rgba(185,140,255,' + (0.18 + 0.4 * rnd(i + 5)).toFixed(2) + ')'; g.beginPath(); g.arc(xx, y, 2 + rnd(i + 8) * 3, 0, 6.29); g.fill(); } g.restore();
      gtxt(g, '以太', 1450, 330, 70, VIO, 'center', ap(lt, L[5], 0.4)); }
    var e = ap(lt, L[6], 0.6) * (1 - ap(lt, L[11], 0.4)); if (e > 0) { var ex = 1500 - 30 * Math.sin(lt * 0.5); glowDot(g, ex, 620, 22, '#4ea0ff', e); g.save(); g.globalAlpha *= e; g.fillStyle = '#2d8a5a'; g.beginPath(); g.arc(ex - 14, 612, 12, 0, 6.29); g.fill(); g.restore();
      arrow(g, ex + 50, 520, ex + 220, 520, GOLD, e * ap(lt, L[6], 0.4), eo((lt - L[6]) / 0.8), 0); txt(g, '地球 · 每秒 30 公里', ex + 60, 480, 26, GOLD, 'center', e, 900);
      var wd = ap(lt, L[7], 0.5) * (1 - ap(lt, L[11], 0.4)); if (wd > 0) for (var j = 0; j < 4; j++) { var yy = 700 + j * 50; arrow(g, 1500, yy, 1330, yy, VIO, wd, eo((lt - L[7] - j * 0.15) / 0.6), lt * 60); } txt(g, '以太风', 1420, 940, 36, VIO, 'center', wd, 900); }
    var r = ap(lt, L[8], 0.5); if (r > 0) { chip(g, 1250, 400, '迎风 · 慢一点', RED, r, 26); chip(g, 1650, 400, '侧着 · 快一点', BLUE, r * ap(lt, L[9], 0.4), 26); }
    var q2 = ap(lt, L[11], 0.5); if (q2 > 0) { g.save(); g.globalAlpha *= q2 * 0.65; g.fillStyle = 'rgba(8,12,22,0.8)'; g.fillRect(1100, 560, 720, 200); g.restore(); gtxt(g, '1 / 100,000,000', 1460, 690, 80, GOLD, 'center', q2); }
  };
  // the interferometer: split, reflect, recombine
  D.split = function (g, lt, L) {
    var cx = 1440, cy = 520, s = 1.0, pw = ap(lt, L[7], 0.5) * (1 - ap(lt, L[10], 0.5)), dim = 1 - 0.9 * ap(lt, L[7], 0.6) * (1 - ap(lt, L[10], 0.5));
    g.save(); g.globalAlpha *= dim;
    var a = ap(lt, L[2], 0.5);
    glowDot(g, cx - 260, cy, 14, '#fff3c8', a); chip(g, cx - 260, cy + 60, '光源', GOLD, a, 24);
    seg(g, cx - 260, cy, cx - 12, cy, eo((lt - L[3]) / 0.6), GOLD, 4, 1);
    g.save(); g.translate(cx, cy); g.rotate(-Math.PI / 4); g.fillStyle = 'rgba(190,225,255,0.55)'; g.strokeStyle = '#bcd8ff'; g.lineWidth = 3; g.shadowColor = '#9cc8ff'; g.shadowBlur = 12; g.globalAlpha *= ap(lt, L[3], 0.4); g.fillRect(-4, -46, 8, 92); g.strokeRect(-4, -46, 8, 92); g.restore();
    chip(g, cx + 80, cy + 56, '半透镜', BLUE, ap(lt, L[3] + 0.3, 0.4), 22);
    var p1 = eo((lt - L[4]) / 0.7); seg(g, cx, cy, cx + 230, cy, p1, GOLD, 4, 1); seg(g, cx, cy, cx, cy - 230, p1, GOLD, 4, 1);
    var m = ap(lt, L[4], 0.4); g.save(); g.globalAlpha *= m; g.fillStyle = '#e8f0ff'; g.fillRect(cx + 232, cy - 50, 12, 100); g.fillRect(cx - 50, cy - 244, 100, 12); g.restore();
    var p2 = eo((lt - L[5]) / 0.8); seg(g, cx + 230, cy, cx, cy, p2, '#ffd98a', 4, 1); seg(g, cx, cy - 230, cx, cy, p2, '#ffd98a', 4, 1);
    var p3 = eo((lt - L[6]) / 0.8); seg(g, cx, cy, cx, cy + 230, p3, '#fff3c8', 5, 1);
    var sc = ap(lt, L[6], 0.5); fringes(g, cx - 70, cy + 240, 140, 60, 0.05 + 0.05 * Math.sin(lt), sc); txt(g, '屏幕', cx + 110, cy + 280, 24, DIM, 'left', sc, 700);
    if (lt > L[10]) { var sh = ap(lt, L[10], 0.5); fringes(g, cx - 70, cy + 240, 140, 60, 0.05 + 0.45 * E(((lt - L[11]) % 3) / 1.2) * sh, 1, 0.9); }
    g.restore();
    if (pw > 0) { var off = 0.0 + 0.5 * E((lt - L[8] + 0.4) / 0.9); wavePair(g, 1150, 520, 560, lt > L[8] - 0.2 ? off : 0, pw);
      chip(g, 1430, 340, lt > L[8] - 0.2 ? '错开半个波长 · 暗' : '波峰对波峰 · 亮', lt > L[8] - 0.2 ? BLUE : GOLD, pw, 28); }
    var t = ap(lt, L[12], 0.5); if (t > 0) { card(g, 1170, 870, 520, 72, GOLD, t); txt(g, '迈克尔逊干涉仪', 1430, 920, 38, GOLD, 'center', t, 900); }
  };
  // 1881: shaken in Berlin, moved to Potsdam
  D.potsdam = function (g, lt, L) {
    var a = ap(lt, L[1], 0.5) * (1 - ap(lt, L[4], 0.5)), jit = lt > L[2] ? Math.sin(lt * 40) * 6 * (0.5 + 0.5 * Math.sin(lt * 3)) : 0;
    chip(g, 1250, 320, '柏林 · 1881', BLUE, ap(lt, L[0], 0.4) * (1 - ap(lt, L[4], 0.5)), 28);
    if (a > 0) { g.save(); g.translate(jit, 0); slab(g, 1250, 620, 120, 0.4, a, null); g.restore(); fringes(g, 1100 + jit * 2, 780, 300, 90, lt > L[3] ? 0.3 * Math.sin(lt * 9) : 0, a);
      txt(g, '街上有震动 · 条纹乱晃', 1250, 920, 28, RED, 'center', a * ap(lt, L[2], 0.4), 900); }
    var p = ap(lt, L[4], 0.6); if (p > 0) { g.save(); g.globalAlpha *= p; g.fillStyle = 'rgba(40,52,80,0.95)'; g.strokeStyle = 'rgba(200,215,240,0.8)'; g.lineWidth = 3; g.fillRect(1150, 560, 540, 260); g.strokeRect(1150, 560, 540, 260);
      g.beginPath(); g.arc(1420, 560, 150, Math.PI, 0); g.fill(); g.stroke(); g.fillStyle = '#0a0f1a'; g.fillRect(1395, 440, 50, 130); g.restore();
      chip(g, 1420, 330, '波茨坦天文台', GOLD, p, 30); fringes(g, 1330, 640, 180, 70, 0, p * ap(lt, L[5], 0.4)); }
    var r = ap(lt, L[5], 0.5); if (r > 0) chip(g, 1420, 780, '没有预期的移动', BLUE, r, 28);
    var q = ap(lt, L[6], 0.5); if (q > 0) chip(g, 1420, 880, '仪器太小 · 结论不够硬', RED, q, 28);
  };
  // 1887: the big instrument — 11 m of folded path, expected 0.4 fringe, saw < 1/20
  D.cleve = function (g, lt, L) {
    chip(g, 1330, 300, '克利夫兰 · 1887', BLUE, ap(lt, L[0], 0.4), 28); txt(g, '+ 莫雷（化学家）', 1330, 345, 24, DIM, 'center', ap(lt, L[0] + 0.3, 0.4), 700);
    var a = ap(lt, L[1], 0.6), spin = lt > L[7] ? (lt - L[7]) * 0.45 : 0.3;
    slab(g, 1330, 680, 230, spin, a, function (gg, s) {
      var n = Math.floor(ap(lt, L[2], 1.2) * 8); gg.strokeStyle = 'rgba(240,189,92,0.85)'; gg.lineWidth = 3; gg.shadowColor = GOLD; gg.shadowBlur = 8;
      gg.beginPath(); for (var i = 0; i <= n; i++) { var x = -s * 0.42 + (i % 2 ? s * 0.84 : 0), y = -s * 0.4 + i * s * 0.11; if (i) gg.lineTo(x, y); else gg.moveTo(x, y); } gg.stroke();
      gg.fillStyle = '#e8f0ff'; for (var j = 0; j < 4; j++) { gg.fillRect(-s * 0.46, -s * 0.4 + j * s * 0.22, 8, 22); gg.fillRect(s * 0.42, -s * 0.4 + j * s * 0.22, 8, 22); } });
    chip(g, 1330, 880, '总路程 11 米', GOLD, ap(lt, L[3], 0.4), 30);
    chip(g, 1330, 410, '砂岩石板 · 漂在水银上', SILV, ap(lt, L[4], 0.4), 24);
    var fb = ap(lt, L[7], 0.5); if (fb > 0) fringes(g, 1620, 300, 200, 90, 0, fb);
    var b = ap(lt, L[9], 0.5); if (b > 0) {                                              // expected vs seen
      var bx = 1640, base = 880, hh = 300; g.save(); g.globalAlpha *= b; g.strokeStyle = 'rgba(200,210,230,0.5)'; g.lineWidth = 2; g.beginPath(); g.moveTo(1560, base); g.lineTo(1840, base); g.stroke(); g.restore();
      hbar(g, bx - 30, base - hh * eo((lt - L[9]) / 0.8), 60, hh * eo((lt - L[9]) / 0.8), GOLD, b); txt(g, '预期 0.4 条纹', bx, base + 36, 24, GOLD, 'center', b, 900);
      var o = ap(lt, L[10], 0.5); hbar(g, bx + 110 - 30, base - 14 * o, 60, 14 * o, RED, b); txt(g, '实际', bx + 110, base + 36, 24, RED, 'center', b * o, 900);
      var s = ap(lt, L[11], 0.4); chip(g, bx + 50, base - 360, '不到 1/20', RED, s, 28); }
    var x = ap(lt, L[12], 0.5); if (x > 0) { chip(g, 1330, 520, '没有以太风', RED, x, 30); }
  };
  // the zero, length contraction, Einstein
  D.zero = function (g, lt, L) {
    var z = ap(lt, L[0], 0.6); var shrink = E((lt - L[2]) / 1.0);
    var zs = 340 - 230 * shrink, zx = 1450 + 280 * shrink, zy = 600 - 230 * shrink; var zf = 1 - ap(lt, L[8], 0.4);
    g.save(); g.globalAlpha *= z * zf; g.fillStyle = '#ffffff'; g.shadowColor = GOLD; g.shadowBlur = 40; g.font = '900 ' + Math.round(zs) + 'px ' + SERIF; g.textAlign = 'center'; g.fillStyle = '#f6dfae'; g.fillText('0', zx, zy + zs * 0.33); g.restore();
    var c2 = ap(lt, L[2], 0.6) * (1 - ap(lt, L[8] - 0.2, 0.5)); if (c2 > 0) {
      chip(g, 1330, 300, '想办法救以太', BLUE, c2, 28);
      var len = 560 - 90 * E((lt - L[5]) / 1.2), mv = (lt * 80) % 120; g.save(); g.globalAlpha *= c2; hbar(g, 1100 + mv, 600, len, 40, '#b8903f', 1, 6); g.restore();
      arrow(g, 1130, 700, 1330, 700, GOLD, c2 * ap(lt, L[4], 0.4), eo((lt - L[4]) / 0.7), lt * 40); txt(g, '运动方向', 1230, 750, 26, GOLD, 'center', c2 * ap(lt, L[4], 0.4), 700);
      var sh = ap(lt, L[5], 0.5); txt(g, '缩短一点点', 1400, 820, 40, RED, 'center', c2 * sh, 900);
      chip(g, 1250, 400, '菲茨杰拉德 · 1889', INK, c2 * ap(lt, L[3], 0.4), 24); chip(g, 1250, 470, '洛伦兹 · 1892', GOLD, c2 * ap(lt, L[7], 0.4), 26); }
    var e = ap(lt, L[8], 0.6); if (e > 0) {
      card(g, 1110, 330, 640, 120, GOLD, e); txt(g, '1905 · 26 岁 · 专利局职员', 1430, 405, 36, GOLD, 'center', e, 900);
      var c = ap(lt, L[9], 0.5); chip(g, 1430, 520, '不需要以太', RED, c, 34);
      var d = ap(lt, L[10], 0.5); if (d > 0) { for (var i = 0; i < 2; i++) { var yy = 650 + i * 110; arrow(g, 1130, yy, 1480, yy, GOLD, d, eo((lt - L[10] - i * 0.2) / 0.7), 0); chip(g, 1660, yy, i ? '飞船上的人' : '地面上的人', DIM, d, 22); }
        txt(g, '光速都是 c', 1430, 900, 44, GOLD, 'center', d, 900); }
      var n = ap(lt, L[11], 0.5); if (n > 0) chip(g, 1430, 270, '爱因斯坦', '#cfe0ff', n, 32); }
    var f = ap(lt, L[12], 0.6); if (f > 0) { chip(g, 1430, 590, '相对论的旁证', GOLD, f, 30, 'center'); }
  };
  // 1907: the medal, and the “sixth decimal”
  D.nobel = function (g, lt, L) {
    var a = ap(lt, L[0], 0.7) * (1 - ap(lt, L[4], 0.5)); photo(g, 1300, 610, 520, a); medal(g, 1660, 770, 80, a * ap(lt, L[0] + 0.3, 0.5));
    chip(g, 1300, 330, '1907 · 诺贝尔物理学奖', GOLD, a, 30); var c = ap(lt, L[1], 0.5) * (1 - ap(lt, L[4], 0.5)); chip(g, 1300, 850, '精密光学仪器 + 测量', BLUE, c, 26);
    var f = ap(lt, L[3], 0.5) * (1 - ap(lt, L[4], 0.5)); chip(g, 1250, 900, '第一位美国人', GOLD, f * 0, 26);
    var fa = ap(lt, L[3], 0.6) * (1 - ap(lt, L[4], 0.4)); if (fa > 0) { card(g, 1030, 880, 540, 66, GOLD, fa); txt(g, '第一位获科学奖的美国人', 1300, 925, 28, GOLD, 'center', fa, 900); }
    var q = ap(lt, L[4], 0.6); if (q > 0) { card(g, 1100, 300, 700, 120, BLUE, q); txt(g, '演讲 · 引用了一句话', 1450, 372, 38, BLUE, 'center', q, 900);
      var d = ap(lt, L[6], 0.5); txt(g, '大定律，差不多都发现了', 1450, 520, 40, INK, 'center', d, 900);
      var n = ap(lt, L[7], 0.5); if (n > 0) { g.save(); g.globalAlpha *= n; g.font = '900 100px ' + MONO; g.textAlign = 'center'; g.shadowColor = 'rgba(0,0,0,0.9)'; g.shadowBlur = 12; var s = '0.000001', x0 = 1450 - g.measureText(s).width / 2;
        g.textAlign = 'left'; for (var i = 0; i < s.length; i++) { var w = g.measureText(s.slice(0, i)).width; g.fillStyle = (i === s.length - 1 && lt > L[8]) ? RED : INK; if (i === s.length - 1 && lt > L[8]) { g.shadowColor = RED; g.shadowBlur = 24; } g.fillText(s[i], x0 + w, 700); g.shadowBlur = 12; g.shadowColor = 'rgba(0,0,0,0.9)'; } g.restore();
        chip(g, 1450, 790, '新东西 · 在第六位', RED, ap(lt, L[8], 0.5), 30); }
      var u = ap(lt, L[9], 0.5); chip(g, 1250, 880, '量子', VIO, u, 30); chip(g, 1450, 880, '相对论', GOLD, u * ap(lt, L[9] + 0.3, 0.4), 30);
      var z = ap(lt, L[10], 0.5); if (z > 0) gtxt(g, '0', 1700, 880, 90, GOLD, 'center', z); }
  };
  // 1926: the mountain-to-mountain baseline
  D.peaks = function (g, lt, L) {
    var a = ap(lt, L[1], 0.6); mountain(g, 1220, 800, 360, 320, a); mountain(g, 1700, 800, 340, 260, a * ap(lt, L[2], 0.5), '#3f4f72');
    chip(g, 1220, 420, '威尔逊山 · 转镜', GOLD, a, 28); chip(g, 1700, 520, '另一座山', BLUE, ap(lt, L[2], 0.5), 28);
    var go = eo((lt - L[2] - 0.3) / 1.0), back = eo((lt - L[3]) / 1.0); seg(g, 1250, 540, 1680, 590, go, GOLD, 4, a); seg(g, 1680, 590, 1250, 548, back, '#ffd98a', 4, a);
    var d = ap(lt, L[2], 0.5); if (d > 0) { txt(g, '35 公里', 1470, 520, 36, GOLD, 'center', d, 900); }
    var r = ap(lt, L[4], 0.5); if (r > 0) { chip(g, 1470, 860, '一来一回 · 70 公里', BLUE, r, 30); }
    var v = ap(lt, L[7], 0.5); if (v > 0) chip(g, 1470, 340, '今天：299,792 · 差几公里', GOLD, v, 28);
  };
  // 1929–31: the mile-long vacuum tube
  D.tube = function (g, lt, L) {
    var a = ap(lt, L[1], 0.5); g.save(); g.globalAlpha *= a; var gr = g.createLinearGradient(0, 560, 0, 700); gr.addColorStop(0, '#2f384c'); gr.addColorStop(0.5, '#7d8aa4'); gr.addColorStop(1, '#2a3246');
    g.fillStyle = gr; rr(g, 1110, 570, 700, 120, 60); g.fill(); g.strokeStyle = 'rgba(220,230,250,0.7)'; g.lineWidth = 3; g.stroke(); g.restore();
    chip(g, 1460, 480, '空气会让光慢一点', RED, ap(lt, L[0], 0.4) * (1 - ap(lt, L[3], 0.5)), 28); chip(g, 1460, 480, '真空管 · 一英里长', GOLD, ap(lt, L[3], 0.5), 30);
    var z = ap(lt, L[4], 0.6); if (z > 0) { g.save(); g.globalAlpha *= z; g.strokeStyle = GOLD; g.lineWidth = 3; g.shadowColor = GOLD; g.shadowBlur = 10; var p = eo((lt - L[4]) / 2.0) * 8; g.beginPath(); g.moveTo(1140, 600);
      for (var i = 1; i <= Math.min(8, Math.ceil(p)); i++) { var f = i === Math.ceil(p) ? p - Math.floor(p - 1e-6) : 1; var x = i % 2 ? 1780 : 1140, y = 600 + i * 11; var px = i % 2 ? 1140 : 1780, py = 600 + (i - 1) * 11; g.lineTo(px + (x - px) * f, py + (y - py) * f); } g.stroke(); g.restore(); }
    chip(g, 1460, 780, '来回反射 · 路程 5 英里', BLUE, ap(lt, L[5], 0.5), 28);
    var d = ap(lt, L[6], 0.6); if (d > 0) { var dim = 1 - 0.5 * d; g.save(); g.globalAlpha *= d * 0.0; g.restore(); card(g, 1170, 840, 580, 90, GOLD, d); txt(g, '1931 · 5 · 9', 1460, 902, 46, GOLD, 'center', d, 900); }
    var n = ap(lt, L[8], 0.6); if (n > 0) { g.save(); g.globalAlpha *= n; g.restore(); chip(g, 1460, 400, '36 / 233 组 · 没做完', RED, n, 34); }
    var r = ap(lt, L[10], 0.5); if (r > 0) { chip(g, 1460, 320, '1935 · 299,774 公里/秒', GOLD, r, 30); }
  };
  // 1983: the number, and the metre defined by light
  D.metre = function (g, lt, L) {
    var a = ap(lt, L[1], 0.5); if (a > 0) chip(g, 1460, 320, '国际计量大会 · 1983', BLUE, a, 30);
    var n = ap(lt, L[3], 0.5); if (n > 0) { gtxt(g, '299,792,458', 1460, 520, 96, GOLD, 'center', n); txt(g, '米 / 秒', 1460, 590, 36, INK, 'center', n, 900); }
    var r = ap(lt, L[4], 0.5); if (r > 0) { g.save(); g.globalAlpha *= r; var x0 = 1160, x1 = 1760, y = 760; g.strokeStyle = SILV; g.lineWidth = 6; g.beginPath(); g.moveTo(x0, y); g.lineTo(x1, y); g.stroke();
      for (var i = 0; i <= 10; i++) { g.beginPath(); g.moveTo(x0 + (x1 - x0) * i / 10, y); g.lineTo(x0 + (x1 - x0) * i / 10, y - (i % 5 ? 18 : 32)); g.stroke(); } g.restore();
      txt(g, '1 米', 1460, 830, 40, SILV, 'center', r, 900);
      var p = ((lt - L[4]) * 0.6) % 1.4; if (p < 1) glowDot(g, x0 + (x1 - x0) * p, y - 4, 10, '#fff3c8', r); }
    var b = ap(lt, L[5], 0.5); if (b > 0) chip(g, 1460, 910, '由光速来定义', GOLD, b, 30);
    var t = ap(lt, L[7], 0.6); if (t > 0) { }
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
  var NODES = [['镜', '十块钱的转镜', '1879 · 每秒 29 万 9 千 9 百公里'], ['纹', '一台干涉仪', '1881 · 波茨坦'], ['零', '一个“零”', '1887 · 克利夫兰'], ['米', '一把由光定义的尺', '1983 · 国际计量大会']];
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
      var s1 = '什么也没找到，', s2 = '却改变了物理学', s3 = '', w1 = g.measureText(s1).width, w2 = g.measureText(s2).width, w3 = g.measureText(s3).width, x0 = 960 - (w1 + w2 + w3) / 2;
      g.textAlign = 'left'; g.fillStyle = '#ece6da'; g.fillText(s1, x0, 860); g.fillStyle = GOLD; g.fillText(s2, x0 + w1, 860); g.fillStyle = '#ece6da'; g.fillText(s3, x0 + w1 + w2, 860); }
    g.restore();
  }
  function sources(g, sc, lt) {
    g.save(); g.textAlign = 'left';
    TL.src.forEach(function (s, k) {
      var p = E((lt - 0.2 - k * 0.1) / 0.4); if (p <= 0) return; var col = k < 3 ? 0 : 1, row = k % 3, x = 200 + col * 820, y = 330 + row * 150;
      g.globalAlpha = p; g.font = '700 28px ' + SERIF; g.fillStyle = '#ece6da'; g.fillText(s[0], x, y);
      g.font = '500 19px ' + MONO; g.fillStyle = 'rgba(190,195,205,0.75)'; g.fillText(s[1], x, y + 36);
      g.fillStyle = 'rgba(240,189,92,0.6)'; g.fillRect(x - 22, y - 22, 3, 60);
    });
    g.globalAlpha = E((lt - 1.2) / 0.5); g.textAlign = 'center'; g.font = '700 26px ' + SERIF; g.fillStyle = '#ece6da'; g.fillText('进入海军学院一节为他本人后来的回忆，各资料说法略有出入', 960, 930);
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
