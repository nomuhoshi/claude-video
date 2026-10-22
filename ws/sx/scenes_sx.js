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

  // ---------- SpaceX props ----------
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
  function hbar(g, x, y, w, h, col, a, glow) { if (a <= 0 || w === 0) return; g.save(); g.globalAlpha *= a; g.fillStyle = col; g.shadowColor = col; g.shadowBlur = glow == null ? 12 : glow; if (w > 0) g.fillRect(x, y, w, h); else g.fillRect(x + w, y, -w, h); g.restore(); }
  function check(g, x, y, on, col, a) { if (a <= 0) return; g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = 3; g.strokeRect(x - 16, y - 16, 32, 32);
    if (on > 0) { g.lineWidth = 5; g.shadowColor = col; g.shadowBlur = 12; g.beginPath(); g.moveTo(x - 9, y); g.lineTo(x - 2, y + 8 * Math.min(1, on * 2)); if (on > 0.5) g.lineTo(x - 2 + 13 * (on - 0.5) * 2, y + 8 - 18 * (on - 0.5) * 2); g.stroke(); } g.restore(); }
  function rackIcon(g, x, y, h, t, a) { if (a <= 0) return; g.save(); g.globalAlpha *= a; var w = h * 0.45; g.fillStyle = '#141d31'; g.fillRect(x - w / 2, y - h / 2, w, h); g.strokeStyle = 'rgba(200,215,240,0.7)'; g.lineWidth = 3; g.strokeRect(x - w / 2, y - h / 2, w, h);
    for (var i = 0; i < 8; i++) { var yy = y - h / 2 + 10 + i * (h - 20) / 8; g.fillStyle = 'rgba(40,56,90,0.9)'; g.fillRect(x - w / 2 + 8, yy, w - 16, (h - 20) / 8 - 5); g.fillStyle = rnd(i + Math.floor(t * 3)) > 0.4 ? GOLD : BLUE; g.fillRect(x - w / 2 + 14, yy + 6, 5, 4); } g.restore(); }
  function rocket(g, x, y, s, a, flame, t) {                  // a slim two-stage rocket pointing up, (x, y) = nose tip
    if (a <= 0) return; g.save(); g.globalAlpha *= a; g.translate(x, y); g.scale(s, s);
    if (flame > 0) { var fl = g.createRadialGradient(0, 330, 4, 0, 360, 120 * flame); fl.addColorStop(0, 'rgba(255,250,230,1)'); fl.addColorStop(0.3, 'rgba(255,200,110,0.9)'); fl.addColorStop(1, 'rgba(255,110,50,0)');
      g.fillStyle = fl; g.beginPath(); g.moveTo(-22, 318); g.quadraticCurveTo(0, 318 + (150 + 20 * Math.sin((t || 0) * 30)) * flame, 22, 318); g.closePath(); g.shadowColor = '#ffb460'; g.shadowBlur = 40; g.fill(); g.shadowBlur = 0; }
    var gr = g.createLinearGradient(-26, 0, 26, 0); gr.addColorStop(0, '#9aa6bc'); gr.addColorStop(0.45, '#f1f4f8'); gr.addColorStop(1, '#7d889e');
    g.fillStyle = gr; g.beginPath(); g.moveTo(0, 0); g.quadraticCurveTo(26, 30, 26, 80); g.lineTo(26, 310); g.lineTo(-26, 310); g.lineTo(-26, 80); g.quadraticCurveTo(-26, 30, 0, 0); g.fill();
    g.fillStyle = '#1b2236'; g.fillRect(-26, 120, 52, 6); g.fillRect(-26, 250, 52, 4);
    g.fillStyle = '#2a3350'; g.beginPath(); g.moveTo(-26, 260); g.lineTo(-48, 320); g.lineTo(-26, 310); g.fill(); g.beginPath(); g.moveTo(26, 260); g.lineTo(48, 320); g.lineTo(26, 310); g.fill();
    g.restore();
  }
  function sat(g, x, y, s, a, rot) {                          // a flat-panel satellite
    if (a <= 0) return; g.save(); g.globalAlpha *= a; g.translate(x, y); g.rotate(rot || 0); g.scale(s, s);
    g.fillStyle = '#26324e'; g.fillRect(-60, -8, 120, 16); g.strokeStyle = rgba(BLUE, 0.8); g.lineWidth = 1.5; g.strokeRect(-60, -8, 120, 16);
    for (var i = 0; i < 6; i++) { g.strokeStyle = rgba(BLUE, 0.4); g.beginPath(); g.moveTo(-60 + i * 20, -8); g.lineTo(-60 + i * 20, 8); g.stroke(); }
    g.fillStyle = '#d9dee8'; g.fillRect(-12, -14, 24, 28); g.fillStyle = GOLD; g.shadowColor = GOLD; g.shadowBlur = 10; g.beginPath(); g.arc(0, 0, 4, 0, 6.29); g.fill(); g.restore();
  }
  function globeArc(g, cx, cy, r, a) {                        // the curve of the Earth with a thin atmosphere
    if (a <= 0) return; g.save(); g.globalAlpha *= a; var gr = g.createRadialGradient(cx, cy, r * 0.8, cx, cy, r * 1.06); gr.addColorStop(0, 'rgba(40,80,150,0.55)'); gr.addColorStop(0.93, 'rgba(90,150,230,0.45)'); gr.addColorStop(1, 'rgba(90,150,230,0)');
    g.fillStyle = gr; g.beginPath(); g.arc(cx, cy, r * 1.06, 0, 6.29); g.fill(); g.strokeStyle = 'rgba(134,182,255,0.6)'; g.lineWidth = 2; g.beginPath(); g.arc(cx, cy, r, 0, 6.29); g.stroke(); g.restore();
  }
  function tally(g, x, y, n, lit, col, a, h) { ticks(g, x, y, n, lit, col, a, h || 56, 7.2); }

  // ---------- scenes ----------
  var D = {};
  D.h0 = function (g, lt, L) {
    var rk = ap(lt, 0.1, 0.5) * (1 - ap(lt, L[2] - 0.3, 0.5)), up = eo(lt / 4.5);
    if (rk > 0) { for (var k = 0; k < 40; k++) { var yy = (rnd(k) * 900 + lt * 500) % 900 + 150; line(g, 1100 + rnd(k + 3) * 660, yy, 1100 + rnd(k + 3) * 660, yy + 40, 'rgba(200,215,240,0.25)', 2, rk); }
      rocket(g, 1420, 560 - 200 * up, 1.1, rk, 1, lt); chip(g, 1420, 360, '2026 年三季度财报', GOLD, rk * ap(lt, L[1], 0.4), 28); }
    var b = ap(lt, L[2], 0.5) * (1 - ap(lt, L[4] - 0.2, 0.5)), base = 920, k = 1.7;
    if (b > 0) { line(g, 1080, base, 1760, base, 'rgba(200,210,230,0.45)', 2, b);
      vbar(g, 1250, base, 170, 55.8 * k * eo((lt - L[2]) / 0.6), rgba(BLUE, 0.7), b, '一年前', '55.8 亿', BLUE);
      vbar(g, 1590, base, 170, 145.8 * k * eo((lt - L[2] - 0.3) / 1.6), GOLD, b, '这一季', lt > L[2] + 1.9 ? '145.8 亿' : null); }
    var p = ap(lt, L[4], 0.5) * (1 - ap(lt, L[5] - 0.1, 0.4));
    if (p > 0) { card(g, 1150, 760, 540, 150, GOLD, p); txt(g, '上市后第一个赚钱的季度', 1420, 822, 30, INK, 'center', p, 900); txt(g, '净利润 +44 亿美元', 1420, 870, 30, GOLD, 'center', p, 900); }
    var c = ap(lt, L[5], 0.4);
    if (c > 0) { datacenter(g, 1420, 900, 380, 110, 150, lt, 0.8, c);
      for (var i = 0; i < 18; i++) { var q = ((lt - L[5]) * 0.9 + i / 18) % 1; coin(g, 1260 + rnd(i) * 320, 320 + q * 480, 16, c * (1 - E((q - 0.75) / 0.25))); } }
    gtxt(g, '?', 1720, 470, 150, GOLD, 'center', ap(lt, L[6] + 0.2, 0.3) * (0.85 + 0.15 * Math.sin(lt * 5)));
  };
  D.who = function (g, lt, L) {
    var a = ap(lt, L[1] - 0.2, 0.5) * (1 - ap(lt, L[4] - 0.2, 0.5));
    if (a > 0) { card(g, 1100, 330, 640, 150, BLUE, a); txt(g, 'NASDAQ · SPCX', 1420, 390, 34, BLUE, 'center', a, 900); mono(g, '2026.06.12 上市', 1420, 440, 22, DIM, 'center', a);
      chip(g, 1420, 540, '发行价 135 美元', GOLD, a * ap(lt, L[2], 0.4), 30);
      var m = ap(lt, L[3], 0.4), j = 0.45 * eo((lt - L[3] - 0.5) / 0.8);
      card(g, 1110 + 120 * j, 650, 260, 110, GOLD, a * m); gtxt(g, 'SpaceX', 1240 + 120 * j, 718, 40, GOLD, 'center', a * m);
      card(g, 1470 - 120 * j, 650, 260, 110, BLUE, a * m); txt(g, 'xAI', 1600 - 120 * j, 718, 44, BLUE, 'center', a * m, 900);
      txt(g, '2026.02 · 收购', 1420, 820, 24, DIM, 'center', a * ap(lt, L[3] + 1.2, 0.4)); }
    var cols = [['航天', '发火箭', BLUE], ['连接', '星链上网', GOLD], ['超级智能', 'AI · 算力', GOLD]], xs = [1170, 1420, 1670];
    cols.forEach(function (c, i) { var q = ap(lt, L[4] + (i ? L[5 + i] - L[4] : 0.2), 0.4); if (q <= 0) return; var x = xs[i];
      card(g, x - 110, 340, 220, 560, c[2], q);
      if (i === 0) rocket(g, x, 400, 0.62, q, 0.6, lt); else if (i === 1) { sat(g, x, 520, 1.1, q, -0.2); for (var k = 0; k < 3; k++) { g.save(); g.globalAlpha *= q * (0.6 - 0.15 * k); g.strokeStyle = GOLD; g.lineWidth = 2; g.beginPath(); g.arc(x, 520, 60 + k * 30 + 10 * Math.sin(lt * 3), 1.1, 2.0); g.stroke(); g.restore(); } }
      else rackIcon(g, x, 540, 220, lt, q);
      txt(g, c[0], x, 790, 36, c[2], 'center', q, 900); txt(g, c[1], x, 840, 24, INK, 'center', q); });
  };
  D.rev = function (g, lt, L) {
    var a = ap(lt, 0.2, 0.5) * (1 - ap(lt, L[6] - 0.2, 0.5)), base = 900, k = 7.0;
    if (a > 0) { line(g, 1060, base, 1800, base, 'rgba(200,210,230,0.45)', 2, a);
      var it = [['航天', 17.7, BLUE], ['星链', 52.5, BLUE], ['AI', 75.6, GOLD]];
      it.forEach(function (s, i) { var t0 = L[1 + i], p = eo((lt - t0) / 0.8); vbar(g, 1190 + i * 250, base, 160, s[1] * k * p, i === 2 ? GOLD : rgba(BLUE, 0.7), a * ap(lt, t0 - 0.1, 0.3), s[0], p > 0.9 ? s[1] + ' 亿' : null, s[2]); });
      var h = ap(lt, L[5], 0.4); if (h > 0) { g.save(); g.globalAlpha *= a * h * (0.6 + 0.4 * Math.sin(lt * 6)); g.strokeStyle = GOLD; g.lineWidth = 3; g.strokeRect(1690 - 100, base - 75.6 * k - 70, 200, 75.6 * k + 120); g.restore();
        chip(g, 1440, 330, '超过一半：51.9%', GOLD, a * h, 30); }
      mono(g, '2026 年三季度收入（美元）', 1060, 960, 18, DIM, 'left', a * 0.8); }
    var b = ap(lt, L[6], 0.5);
    if (b > 0) { var bs = 880, kk = 6.0; line(g, 1160, bs, 1700, bs, 'rgba(200,210,230,0.5)', 2, b);
      vbar(g, 1300, bs, 180, 8.1 * kk * eo((lt - L[6]) / 0.5), rgba(BLUE, 0.7), b, '一年前', '8.1 亿', BLUE);
      vbar(g, 1560, bs, 180, 75.6 * kk * eo((lt - L[6] - 0.3) / 0.8), GOLD, b, '这一季', '75.6 亿');
      txt(g, 'AI 业务', 1160, 360, 28, DIM, 'left', b, 900); gtxt(g, '×9.3', 1300, 560, 80, GOLD, 'center', ap(lt, L[7] + 0.4, 0.3)); }
  };
  D.si = function (g, lt, L) {
    var a = ap(lt, 0.1, 0.5) * (1 - ap(lt, L[4] - 0.2, 0.5));
    if (a > 0) { datacenter(g, 1300, 760, 420, 140, 180, lt, ap(lt, L[1], 0.6), a); chip(g, 1300, 360, '出租算力', GOLD, a * ap(lt, L[1], 0.4), 34);
      var c = ap(lt, L[3], 0.4); ['别的公司', '自己用'].forEach(function (s, i) { var y = 520 + i * 200; card(g, 1580, y - 50, 200, 100, i ? BLUE : GOLD, a * c); txt(g, s, 1680, y + 12, 28, i ? BLUE : GOLD, 'center', a * c, 900);
        arrow(g, 1500, 640, 1575, y, i ? BLUE : GOLD, a * c * 0.8, eo((lt - L[3]) / 0.5), lt * 40); }); }
    var b = ap(lt, L[4], 0.5);
    if (b > 0) { var x0 = 1080, W = 640, sc = W / 2.0, y = 520; txt(g, '装好的算力（吉瓦）', x0, 430, 26, DIM, 'left', b, 900);
      hbar(g, x0, y, 0.6 * sc * eo((lt - L[4]) / 0.5), 56, rgba(BLUE, 0.75), b); txt(g, '一年前 0.6', x0 + 0.6 * sc + 16, y + 38, 26, BLUE, 'left', b, 900);
      var p = ap(lt, L[5], 0.3); hbar(g, x0, y + 100, 1.7 * sc * eo((lt - L[5]) / 0.8), 56, GOLD, p); txt(g, '现在 1.7', x0 + 1.7 * sc * eo((lt - L[5]) / 0.8) - 16, y + 138, 26, '#1b1408', 'right', ap(lt, L[5] + 0.8, 0.3), 900);
      var q = ap(lt, L[6], 0.4); if (q > 0) { card(g, 1080, 780, 640, 150, GOLD, q); txt(g, '按现在的租价', 1400, 840, 26, INK, 'center', q); txt(g, '新装算力 不到一年回本', 1400, 892, 34, GOLD, 'center', ap(lt, L[7], 0.4), 900); }
      note(g, '回本说法来自管理层', b); }
  };
  D.op = function (g, lt, L) {
    var a = ap(lt, 0.1, 0.5), x0 = 1260, sc = 18, rows = [['星链', 23.7, GOLD, '+23.7 亿', 3], ['AI', 4.3, BLUE, '+4.3 亿', 4], ['火箭', -0.07, RED, '−0.07 亿', 5]];
    if (lt < L[2] - 0.2) { var b0 = ap(lt, 0.2, 0.4) * (1 - ap(lt, L[2] - 0.6, 0.4)); vbar(g, 1250, 860, 170, 75.6 * 6, rgba(GOLD, 0.6), b0, '收入最多', null); vbar(g, 1590, 860, 170, 52.5 * 6, rgba(BLUE, 0.6), b0, '赚得最多？', null); gtxt(g, '?', 1590, 470, 90, BLUE, 'center', b0 * ap(lt, L[1], 0.3)); return; }
    txt(g, '运营利润 · 三季度', 1080, 380, 28, DIM, 'left', ap(lt, L[2], 0.4), 900); line(g, x0, 420, x0, 900, 'rgba(200,210,230,0.5)', 2, ap(lt, L[2], 0.4));
    rows.forEach(function (r, i) { var t0 = L[r[4]], q = ap(lt, t0, 0.3), y = 470 + i * 130, w = r[1] * sc * eo((lt - t0) / 0.7);
      txt(g, r[0], x0 - 20, y + 40, 32, INK, 'right', q, 900); hbar(g, x0, y, r[1] < 0 ? -6 : w, 60, r[2], q); txt(g, r[3], x0 + Math.max(w, 0) + 18, y + 42, 30, r[2], 'left', q * ap(lt, t0 + 0.6, 0.3), 900); });
    var c = ap(lt, L[7], 0.4); if (c > 0) { var y = 600; g.save(); g.globalAlpha *= c; g.setLineDash([8, 6]); g.strokeStyle = RED; g.lineWidth = 2; g.strokeRect(x0 + 4.3 * sc, y, 12.2 * sc * eo((lt - L[7]) / 0.6), 60); g.restore();
      txt(g, '收购 Cursor 的股票奖励 −12.2 亿', x0 + 4.3 * sc, y + 100, 24, RED, 'left', c, 900); }
  };
  D.net = function (g, lt, L) {
    var a = ap(lt, 0.1, 0.5) * (1 - ap(lt, L[5] - 0.2, 0.5)), base = 900, k = 10;
    if (a > 0) { line(g, 1060, base, 1800, base, 'rgba(200,210,230,0.45)', 2, a);
      var s1 = ap(lt, L[2], 0.4), s2 = ap(lt, L[3] + 0.3, 0.4), s3 = ap(lt, L[4] + 0.3, 0.4);
      vbar(g, 1180, base, 130, 27.9 * k * eo((lt - L[2]) / 0.6), rgba(BLUE, 0.75), a * s1, '运营利润', '27.9', BLUE);
      g.save(); g.globalAlpha *= a * s2; g.fillStyle = rgba(GOLD, 0.55); g.fillRect(1360 - 65, base - 27.9 * k - 12.2 * k * eo((lt - L[3] - 0.3) / 0.6), 130, 12.2 * k * eo((lt - L[3] - 0.3) / 0.6)); g.restore();
      txt(g, '+12.2', 1360, base - 40.1 * k - 16, 26, GOLD, 'center', a * s2, 900); txt(g, '利息等', 1360, base + 38, 24, INK, 'center', a * s2);
      g.save(); g.globalAlpha *= a * s3; g.fillStyle = rgba(GOLD, 0.55); g.fillRect(1540 - 65, base - 40.1 * k - 3.9 * k * eo((lt - L[4] - 0.3) / 0.6), 130, 3.9 * k * eo((lt - L[4] - 0.3) / 0.6)); g.restore();
      txt(g, '+3.9', 1540, base - 44 * k - 16, 26, GOLD, 'center', a * s3, 900); txt(g, '税收抵免', 1540, base + 38, 24, INK, 'center', a * s3);
      vbar(g, 1710, base, 130, 44 * k * eo((lt - L[4] - 1.0) / 0.6), GOLD, a * ap(lt, L[4] + 1.0, 0.3), '净利润', '44.0');
      mono(g, '亿美元 · 三季度', 1060, 960, 18, DIM, 'left', a * 0.8); }
    var b = ap(lt, L[5], 0.5);
    if (b > 0) { var bs = 560; line(g, 1160, bs, 1700, bs, 'rgba(200,210,230,0.5)', 2, b);
      vbar(g, 1300, bs, 180, 44 * 6 * eo((lt - L[5]) / 0.5), GOLD, b, '三季度', '+44.0');
      vbar(g, 1560, bs, 180, -4.1 * 6 * 3 * eo((lt - L[6]) / 0.6), RED, ap(lt, L[6], 0.3), '前三季合计', '−4.1');
      mono(g, '净利润 · 亿美元', 1160, 960, 18, DIM, 'left', b * 0.8); }
  };
  D.starlink = function (g, lt, L) {
    var a = ap(lt, 0.1, 0.6);
    globeArc(g, 1420, 1650, 900, a);
    for (var i = 0; i < 14; i++) { var u = ((lt * 0.05 + i / 14) % 1), x = 1000 + u * 860, y = 900 - Math.sqrt(Math.max(0, 1100 * 1100 - Math.pow(x - 1420, 2))) + 1650 - 1100 - 120; sat(g, x, y + (i % 2) * 40, 0.4, a * 0.8, 0.2); }
    var b = ap(lt, L[2], 0.4) * (1 - ap(lt, L[4] - 0.2, 0.4)), base = 760, k = 1.6;
    if (b > 0) { vbar(g, 1300, base, 170, 160 * k * eo((lt - L[2]) / 0.6), GOLD, b, '实际新增', '160 万');
      var e = ap(lt, L[3], 0.3); g.save(); g.globalAlpha *= b * e; g.setLineDash([8, 6]); g.strokeStyle = RED; g.lineWidth = 3; g.strokeRect(1560 - 85, base - 229 * k, 170, 229 * k); g.restore();
      txt(g, '预期 229 万', 1560, base - 229 * k - 18, 28, RED, 'center', b * e, 900); txt(g, '市场预期', 1560, base + 38, 24, INK, 'center', b * e); }
    var c = ap(lt, L[4], 0.4);
    if (c > 0) { var bs = 760, kk = 4.2; vbar(g, 1300, bs, 170, 83 * kk * eo((lt - L[5]) / 0.6), rgba(BLUE, 0.7), ap(lt, L[5], 0.3), '一年前', '83 美元', BLUE);
      vbar(g, 1560, bs, 170, 69 * kk * eo((lt - L[4]) / 0.6), GOLD, c, '现在', '69 美元'); txt(g, '每户每月', 1080, 400, 28, DIM, 'left', c, 900);
      txt(g, '用户 ↑  每户 ↓', 1430, 920, 30, INK, 'center', ap(lt, L[6], 0.4), 900); }
  };
  D.ship = function (g, lt, L) {
    var a = ap(lt, 0.1, 0.5);
    globeArc(g, 1420, 1800, 1000, a);
    var p = eo((lt - L[1]) / 2.2), ang = -2.3 + 1.6 * p, R = 1180, x = 1420 + Math.cos(ang) * R, y = 1800 + Math.sin(ang) * R;
    g.save(); g.globalAlpha *= a * 0.6; g.setLineDash([6, 10]); g.strokeStyle = GOLD; g.lineWidth = 2; g.beginPath(); g.arc(1420, 1800, R, -2.3, -2.3 + 1.6 * p); g.stroke(); g.restore();
    if (lt < L[3]) { g.save(); g.translate(x, y); g.rotate(ang + Math.PI / 2); rocket(g, 0, -100, 0.55, a * (1 - ap(lt, L[3] - 0.4, 0.4)), 0.8, lt); g.restore(); }
    chip(g, 1420, 340, '星舰第 14 次试飞 · 首次入轨', GOLD, ap(lt, L[1] + 0.4, 0.4), 28);
    var d = ap(lt, L[2], 0.3) * (1 - ap(lt, L[3] - 0.3, 0.4)); for (var i = 0; i < 26; i++) { var q = cl((lt - L[2] - i * 0.04) / 1.4); if (q <= 0) continue; var aa = -0.9 - 0.05 * i * q - 0.3 * q; sat(g, 1420 + Math.cos(aa) * (R + 30), 1800 + Math.sin(aa) * (R + 30), 0.28, d * q, aa); }
    txt(g, '26 颗新一代星链卫星', 1700, 520, 26, BLUE, 'center', d, 900);
    var t = ap(lt, L[3], 0.5);
    if (t > 0) { g.save(); g.globalAlpha *= t; g.fillStyle = '#1a2340'; g.fillRect(1180, 470, 40, 460); g.strokeStyle = 'rgba(200,215,240,0.7)'; g.lineWidth = 3; g.strokeRect(1180, 470, 40, 460);
      for (var k = 0; k < 10; k++) { g.beginPath(); g.moveTo(1180, 480 + k * 45); g.lineTo(1220, 520 + k * 45); g.stroke(); }
      var arm = 0.4 * (1 - eo((lt - L[4] - 0.4) / 0.6)); g.strokeStyle = GOLD; g.lineWidth = 8; g.shadowColor = GOLD; g.shadowBlur = 12; [600, 640].forEach(function (yy, i) { g.save(); g.translate(1220, yy); g.rotate(i ? arm : -arm); g.beginPath(); g.moveTo(0, 0); g.lineTo(220, 0); g.stroke(); g.restore(); }); g.restore();
      var dn = eo((lt - L[3] - 0.2) / 1.6); rocket(g, 1380, 240 + 260 * dn, 0.75, t, 0.9 * (1 - dn * 0.5), lt); chip(g, 1600, 900, '下一次：试着接住', BLUE, ap(lt, L[4], 0.4), 26); }
  };
  D.question = function (g, lt, L) {
    var a = ap(lt, 0.1, 0.5);
    rocket(g, 1350, 420, 0.9, a, 0.6, lt);
    for (var i = 0; i < 12; i++) { var q = ((lt * 0.7 + i / 12) % 1); coin(g, 1350 + (rnd(i) - 0.5) * 120, 760 + q * 260, 15, a * (1 - q)); }
    gtxt(g, '?', 1640, 560, 170, GOLD, 'center', ap(lt, L[1] + 0.3, 0.3) * (0.85 + 0.15 * Math.sin(lt * 5)));
  };
  D.capex = function (g, lt, L) {
    var a = ap(lt, L[1], 0.4) * (1 - ap(lt, L[4] - 0.2, 0.5));
    if (a > 0) { var base = 900, k = 300; line(g, 1060, base, 1800, base, 'rgba(200,210,230,0.45)', 2, a);
      var s = ap(lt, L[2], 0.4); vbar(g, 1230, base, 180, 1.0 * k * eo((lt - L[2]) / 0.6), GOLD, s, '收入', '1 美元');
      vbar(g, 1500, base, 180, 1.34 * k * eo((lt - L[2] - 0.4) / 0.8), RED, s * ap(lt, L[2] + 0.4, 0.3), '资本开支', '1.34 美元');
      var c = ap(lt, L[3], 0.4); if (c > 0) { g.save(); g.globalAlpha *= a * c; g.fillStyle = 'rgba(255,170,150,0.9)'; g.fillRect(1500 - 90, base - 1.34 * k, 180, 1.34 * k * (164.4 / 195.9)); g.restore();
        txt(g, 'AI 算力 164 亿', 1610, base - 1.34 * k * 0.5, 26, RED, 'left', a * c, 900); } }
    var b = ap(lt, L[4], 0.5) * (1 - ap(lt, L[6] - 0.2, 0.5));
    if (b > 0) { var bs = 900, kk = 1.05; line(g, 1060, bs, 1800, bs, 'rgba(200,210,230,0.45)', 2, b); txt(g, '前九个月', 1080, 380, 28, DIM, 'left', b, 900);
      vbar(g, 1250, bs, 200, 131 * kk * eo((lt - L[4]) / 0.6), GOLD, b, '生意进账', '131 亿');
      vbar(g, 1560, bs, 200, 481 * kk * eo((lt - L[5]) / 0.9), RED, ap(lt, L[5], 0.3), '花出去', '481 亿'); }
    var c2 = ap(lt, L[6], 0.5);
    if (c2 > 0) { var bs2 = 900, k3 = 1.05; line(g, 1060, bs2, 1800, bs2, 'rgba(200,210,230,0.45)', 2, c2);
      vbar(g, 1250, bs2, 200, 196 * k3 * eo((lt - L[6]) / 0.6), rgba(RED, 0.6), c2, '三季度', '196 亿', RED);
      var p = eo((lt - L[7]) / 0.9); g.save(); g.globalAlpha *= c2 * ap(lt, L[7], 0.3); g.fillStyle = RED; g.shadowColor = RED; g.shadowBlur = 16; g.fillRect(1560 - 100, bs2 - 350 * k3 * p, 200, 350 * k3 * p);
      g.fillStyle = rgba(RED, 0.35); g.fillRect(1560 - 100, bs2 - 400 * k3 * p, 200, 50 * k3 * p); g.restore();
      txt(g, '四季度（计划）', 1560, bs2 + 38, 24, INK, 'center', ap(lt, L[7], 0.3)); txt(g, '350–400 亿', 1560, bs2 - 400 * k3 - 16, 30, RED, 'center', ap(lt, L[7] + 0.9, 0.3), 900); }
  };
  D.cash = function (g, lt, L) {
    var a = ap(lt, L[1] - 0.2, 0.5) * (1 - ap(lt, L[5] - 0.2, 0.5)), base = 900, k = 0.62;
    if (a > 0) { line(g, 1060, base, 1800, base, 'rgba(200,210,230,0.45)', 2, a); mono(g, '2026.09.30 · 亿美元', 1060, 960, 18, DIM, 'left', a * 0.8);
      vbar(g, 1250, base, 200, 899 * k * eo((lt - L[1]) / 0.8), GOLD, a, '现金和证券', '约 899');
      vbar(g, 1560, base, 200, 388 * k * eo((lt - L[2]) / 0.6), rgba(BLUE, 0.7), a * ap(lt, L[2], 0.3), '负债', '约 388', BLUE);
      chip(g, 1250, 330, '大多来自上市融资', GOLD, a * ap(lt, L[3], 0.4), 24);
      var d = ap(lt, L[4], 0.4); for (var i = 0; i < 4; i++) doc(g, 1480 + i * 60, 420 - (1 - eo(cl((lt - L[4] - i * 0.15) / 0.4))) * 60, 90, 120, a * d, (i - 1.5) * 0.06, null, i); }
    var q = ap(lt, L[5], 0.5); if (q > 0) { card(g, 1080, 470, 680, 260, RED, q); txt(g, '分析师（财报前）', 1420, 550, 26, DIM, 'center', q, 900);
      txt(g, '“再融资，是最大的隐忧。”', 1420, 640, 40, INK, 'center', ap(lt, L[6], 0.4), 900); note(g, '摩根士丹利分析师观点，经雅虎财经转述', q); }
  };
  D.guide = function (g, lt, L) {
    var a = ap(lt, 0.2, 0.5) * (1 - ap(lt, L[4] - 0.2, 0.5)), base = 900, k = 1.45;
    if (a > 0) { line(g, 1060, base, 1800, base, 'rgba(200,210,230,0.45)', 2, a); mono(g, '季度收入 · 亿美元', 1060, 960, 18, DIM, 'left', a * 0.8);
      vbar(g, 1250, base, 200, 145.8 * k * eo((lt - 0.3) / 0.6), rgba(BLUE, 0.7), a, '2026 年三季度', '145.8', BLUE);
      var p = eo((lt - L[1] - 0.4) / 1.0); g.save(); g.globalAlpha *= a * ap(lt, L[1] + 0.3, 0.3); g.fillStyle = GOLD; g.shadowColor = GOLD; g.shadowBlur = 14; g.fillRect(1560 - 100, base - 330 * k * p, 200, 330 * k * p);
      g.fillStyle = rgba(GOLD, 0.35); g.fillRect(1560 - 100, base - 370 * k * p, 200, 40 * k * p); g.restore();
      txt(g, '2027 年一季度（指引）', 1560, base + 38, 24, INK, 'center', a * ap(lt, L[1] + 0.3, 0.3)); txt(g, '330–370', 1560, base - 370 * k - 16, 30, GOLD, 'center', a * ap(lt, L[2] + 0.6, 0.3), 900);
      gtxt(g, '×2+', 1400, 520, 72, GOLD, 'center', ap(lt, L[3] + 0.5, 0.3)); }
    var b = ap(lt, L[4], 0.5);
    if (b > 0) { var x0 = 1080, x1 = 1760, y0 = 880, H = 440; txt(g, '算力（吉瓦）', 1080, 390, 28, DIM, 'left', b, 900); line(g, x0, y0, x1, y0, 'rgba(200,210,230,0.45)', 2, b);
      var pts = [['现在', 1.7, 0.1, BLUE], ['今年底', 2.75, 0.45, GOLD], ['明年底', 13, 0.88, GOLD]];
      pts.forEach(function (s, i) { var q = ap(lt, i < 2 ? L[4] + i * 0.5 : L[5], 0.4), x = x0 + (x1 - x0) * s[2], y = y0 - H * s[1] / 13;
        glowDot(g, x, y, 10, s[3], b * q); txt(g, s[0], x, y0 + 38, 24, INK, 'center', b * q); txt(g, i === 1 ? '2.5–3' : i === 2 ? '≥ 13' : '1.7', x, y - 26, 30, s[3], 'center', b * q, 900);
        if (i) line(g, x0 + (x1 - x0) * pts[i - 1][2], y0 - H * pts[i - 1][1] / 13, x, y, rgba(GOLD, 0.7), 3, b * q); });
      note(g, '指引与目标来自电话会；明年底为马斯克的说法', b); }
  };
  D.value = function (g, lt, L) {
    var a = ap(lt, L[1] - 0.2, 0.5);
    chip(g, 1420, 340, '10 月 21 日 收盘 159.31 美元', GOLD, a, 30); chip(g, 1420, 430, '市值约 2 万亿美元', BLUE, ap(lt, L[2], 0.4), 28);
    var r = ap(lt, L[3], 0.5);
    if (r > 0) { var x0 = 1080, x1 = 1760, y = 640; function X(v) { return x0 + (x1 - x0) * v / 40; }
      g.save(); g.globalAlpha *= r; line(g, x0, y, x1, y, 'rgba(200,210,230,0.6)', 3, 1);
      for (var v = 0; v <= 40; v += 10) { line(g, X(v), y - 10, X(v), y + 10, 'rgba(200,210,230,0.6)', 2, 1); mono(g, v + '', X(v), y + 40, 20, DIM, 'center', 1); }
      mono(g, '市销率（倍）= 市值 ÷ 年收入', x1, y + 72, 18, DIM, 'right', 1); g.restore();
      glowDot(g, X(34), y, 12, RED, r); txt(g, '这一季 ×4：约 34 倍', X(34) - 40, y - 34, 26, RED, 'center', r, 900);
      var e = ap(lt, L[4] + 0.3, 0.4); glowDot(g, X(14), y, 12, GOLD, e); txt(g, '明年一季度指引 ×4：约 14 倍', X(14) + 60, y + 112, 26, GOLD, 'center', e, 900);
      arrow(g, X(34) - 20, y + 30, X(14) + 24, y + 30, GOLD, e * 0.7, eo((lt - L[4] - 0.3) / 0.6), 0); note(g, '市销率为自算估算', r); }
    var q = ap(lt, L[5], 0.5); if (q > 0) { card(g, 1130, 830, 600, 120, GOLD, q); txt(g, '价格里，已经算进了', 1430, 880, 28, INK, 'center', q, 900); txt(g, '明年的翻倍', 1430, 924, 30, GOLD, 'center', ap(lt, L[6], 0.4), 900); }
  };
  D.bet = function (g, lt, L) {
    var a = ap(lt, 0.1, 0.5) * (1 - ap(lt, L[7] - 0.2, 0.5)), x0 = 1080, y0 = 640;
    glowDot(g, x0, y0, 12, INK, a); txt(g, '算力能不能一直赚钱', x0 + 30, y0 + 50, 24, DIM, 'center', a);
    var u = eo((lt - L[2] - 0.1) / 0.8); if (u > 0) { g.save(); g.globalAlpha *= a; g.strokeStyle = GOLD; g.lineWidth = 4; g.shadowColor = GOLD; g.shadowBlur = 14; g.beginPath(); g.moveTo(x0, y0);
      g.bezierCurveTo(x0 + 180, y0, x0 + 200, y0 - 200 * u, x0 + 360 * u, y0 - 200 * u); g.stroke(); g.restore();
      card(g, 1450, y0 - 290, 360, 170, GOLD, a * ap(lt, L[2] + 0.5)); txt(g, '押对：租得出去、一年回本', 1630, y0 - 232, 24, INK, 'center', a * ap(lt, L[2] + 0.5)); txt(g, '收入翻倍', 1630, y0 - 178, 32, GOLD, 'center', a * ap(lt, L[3]), 900); }
    var d = eo((lt - L[4] - 0.1) / 0.8); if (d > 0) { g.save(); g.globalAlpha *= a; g.strokeStyle = RED; g.lineWidth = 4; g.shadowColor = RED; g.shadowBlur = 14; g.beginPath(); g.moveTo(x0, y0);
      g.bezierCurveTo(x0 + 180, y0, x0 + 200, y0 + 200 * d, x0 + 360 * d, y0 + 200 * d); g.stroke(); g.restore();
      card(g, 1450, y0 + 120, 360, 170, RED, a * ap(lt, L[4] + 0.5)); txt(g, '押错：租价回落、需求放缓', 1630, y0 + 178, 24, INK, 'center', a * ap(lt, L[4] + 0.5)); txt(g, '回本变慢、要借更多', 1630, y0 + 232, 30, RED, 'center', a * ap(lt, L[5]), 900); }
    var c = ap(lt, L[7], 0.5); if (c > 0) { var cx0 = 1080, cx1 = 1760, cy0 = 900, H = 420; function V(p) { return (p - 100) / 130; }
      priceLine(g, cx0, cx1, cy0, H, [[0, V(161)], [0.08, V(225.64)], [0.2, V(170)], [0.38, V(104.83)], [0.55, V(140)], [0.8, V(171.92)], [0.93, V(147.79)], [1, V(159.31)]], eo((lt - L[7]) / 1.2), GOLD, c);
      glowDot(g, cx0 + (cx1 - cx0) * 0.08, cy0 - H * V(225.64), 8, RED, c); txt(g, '6 月高点 225.64', cx0 + (cx1 - cx0) * 0.08 + 16, cy0 - H * V(225.64) - 14, 24, RED, 'left', c, 900);
      var lo = ap(lt, L[7] + 0.5, 0.3); glowDot(g, cx0 + (cx1 - cx0) * 0.38, cy0 - H * V(104.83), 8, RED, lo); txt(g, '8 月低点 104.83', cx0 + (cx1 - cx0) * 0.38, cy0 - H * V(104.83) + 40, 24, RED, 'center', lo, 900);
      var nw = ap(lt, L[7] + 1.2, 0.3); glowDot(g, cx1, cy0 - H * V(159.31), 8, GOLD, nw); txt(g, '159.31 · 约 −29%', cx1, cy0 - H * V(159.31) - 22, 26, GOLD, 'right', nw, 900); note(g, '走势为示意，只标出几个真实价格点', c); }
  };
  D.checklist = function (g, lt, L) {
    var a = ap(lt, 0.1, 0.5);
    card(g, 1040, 330, 760, 330, GOLD, a); txt(g, '这三条都符合，才值得研究', 1080, 390, 30, GOLD, 'left', a, 900);
    ['相信 AI 算力还会缺好几年', '能承受股价跌一半', '愿意每季度盯开支和借钱'].forEach(function (s, i) { var y = 460 + i * 64, on = cl((lt - L[2 + i] - 0.2) / 0.4);
      check(g, 1100, y - 10, on, GOLD, a); txt(g, s, 1140, y, 28, INK, 'left', a * (0.5 + 0.5 * on)); });
    mono(g, '上市后，它就从 225.64 跌到过 104.83', 1140, 640, 18, DIM, 'left', a * ap(lt, L[3] + 0.4));
    var b = ap(lt, L[5] - 0.1, 0.4); card(g, 1040, 700, 760, 250, RED, b); txt(g, '特别小心', 1080, 760, 30, RED, 'left', b, 900);
    ['这笔钱需要稳定', '只因为“马斯克”想买'].forEach(function (s, i) { var y = 830 + i * 60, on = ap(lt, L[5 + i], 0.3); txt(g, '⚠  ' + s, 1100, y, 28, INK, 'left', b * on); });
  };
  D.next = function (g, lt, L) {
    var a = ap(lt, 0.1, 0.5) * (1 - ap(lt, L[4], 0.5) * 0.6);
    card(g, 1060, 320, 240, 240, BLUE, a); txt(g, '下一季', 1180, 380, 30, DIM, 'center', a, 900); gtxt(g, '3', 1180, 500, 110, INK, 'center', a);
    var it = [['算力', '到 2.5–3 吉瓦了吗？'], ['现金', '花掉三四百亿后还剩多少？'], ['星链', '新增用户回升了吗？']];
    it.forEach(function (s, i) { var y = 360 + i * 90, q = ap(lt, L[1 + i], 0.4); txt(g, s[0], 1360, y, 28, DIM, 'left', a * q, 900); txt(g, s[1], 1360, y + 40, 32, i === 1 ? GOLD : INK, 'left', a * q, 900); });
    var d = ap(lt, L[4], 0.5); if (d > 0) { card(g, 560, 840, 800, 130, '#9aa3b2', d); txt(g, '信息整理，不构成投资建议', 960, 896, 34, INK, 'center', d, 900); txt(g, '数据截至 2026 年 10 月 21 日', 960, 942, 24, DIM, 'center', ap(lt, L[5])); }
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
  var NODES = [['火', '火箭起家', '2002 · 发射业务'], ['智', 'AI 收入最多', '75.6 亿 · 过半'], ['网', '星链最赚钱', '运营利润 23.7 亿'], ['钱', '花得比赚得快', '一季开支 196 亿']];
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
      var s1 = 'SpaceX 第一次赚钱了，它在', s2 = '押什么', s3 = '？', w1 = g.measureText(s1).width, w2 = g.measureText(s2).width, w3 = g.measureText(s3).width, x0 = 960 - (w1 + w2 + w3) / 2;
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
    g.globalAlpha = E((lt - 1.2) / 0.5); g.textAlign = 'center'; g.font = '700 26px ' + SERIF; g.fillStyle = '#ece6da'; g.fillText('信息整理，不构成投资建议 · 数据截至 2026 年 10 月 21 日', 960, 930);
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
