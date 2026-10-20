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

  // ---------- scenes: D[draw](g, lt, L, sc) ----------
  var D = {};
  D.h0 = function (g, lt, L) {
    var back = 1 - 0.75 * ap(lt, L[2], 0.6), gone = 1 - ap(lt, L[4] - 0.2, 0.4);
    // contract sheets fly in and stack
    var p = E((lt - L[1] - 0.2) / 2.1), n = Math.floor(84 * p);
    for (var i = 0; i < n; i++) {
      var c = i % 12, r = Math.floor(i / 12), x = 1060 + c * 62 + (r % 2) * 10, y = 900 - r * 26, q = cl((lt - L[1] - 0.2 - i * 0.025) / 0.3);
      doc(g, x + (1 - eo(q)) * 260, y - (1 - eo(q)) * 120, 54, 70, back * gone * Math.min(1, q * 2), (rnd(i) - 0.5) * 0.08, null, i);
    }
    txt(g, '已签下、还没交付的订单', 1420, 990, 24, DIM, 'center', ap(lt, L[1] + 1.0) * back * gone);
    // loss vs interest
    var bars = ap(lt, L[2] + 0.1) * gone, H = 44;
    if (bars > 0) {
      var hl = 6.26 * H * eo((lt - L[2] - 0.2) / 0.8), hi = 6.4 * H * eo((lt - L[3] - 0.2) / 0.8);
      g.save(); g.globalAlpha *= bars;
      ticks(g, 1150, 760, 9, 9, rgba(RED, 0.55), 1, 0); g.fillStyle = rgba(RED, 0.5); g.fillRect(1120, 760 - hl, 150, hl); txt(g, '二季度净亏损', 1195, 800, 26, INK, 'center', 1); txt(g, '6.26 亿美元', 1195, 760 - hl - 18, 30, RED, 'center', E((lt - L[2] - 0.9) / 0.3));
      if (lt > L[3]) { g.fillStyle = RED; g.shadowColor = RED; g.shadowBlur = 20; g.fillRect(1420, 760 - hi, 150, hi); g.shadowBlur = 0; txt(g, '二季度利息', 1495, 800, 26, INK, 'center', ap(lt, L[3])); txt(g, '6.4 亿美元', 1495, 760 - hi - 18, 30, RED, 'center', E((lt - L[3] - 0.9) / 0.3)); }
      line(g, 1080, 760, 1620, 760, 'rgba(200,210,230,0.5)', 2, 1); g.restore();
    }
    // CoreWeave: a dim row of racks behind the name
    var nm = wn(lt, L[4] + 0.3, L[5] + 0.2, 0.5);
    for (var k = 0; k < 7; k++) gpu(g, 960 + k * 150, 760, 130, 0.5 + 0.5 * Math.sin(lt * 2 + k), lt, nm * 0.5);
    // the two takes
    var two = ap(lt, L[5], 0.5);
    if (two > 0) {
      card(g, 1010, 520, 360, 240, RED, two); avatar(g, 1070, 590, 34, RED, two); txt(g, '马斯克', 1120, 600, 32, INK, 'left', two); gtxt(g, '“Yikes.”', 1190, 690, 54, RED, 'center', two);
      var w2 = ap(lt, L[6], 0.5); card(g, 1420, 520, 360, 240, GOLD, w2); avatar(g, 1480, 590, 34, GOLD, w2); txt(g, '木头姐 · ARK', 1530, 600, 30, INK, 'left', w2); gtxt(g, '买入', 1600, 694, 60, GOLD, 'center', w2);
      gtxt(g, '?', 1395, 900, 130, GOLD, 'center', ap(lt, L[7] + 0.2));
    }
  };
  D.mine = function (g, lt, L) {
    chip(g, 1440, 300, '美国新泽西 · 2017', BLUE, ap(lt, L[0]));
    chip(g, 1440, 380, 'Atlantic Crypto', GOLD, ap(lt, L[1]), 30);
    rig(g, 1400, 680, lt, 6, L[2], false, 1);
    var eth = ap(lt, L[3], 0.6);
    if (eth > 0) {                         // a generic diamond glyph
      g.save(); g.globalAlpha *= eth; g.translate(1770, 360); g.strokeStyle = BLUE; g.lineWidth = 3; g.shadowColor = BLUE; g.shadowBlur = 18;
      g.beginPath(); g.moveTo(0, -70); g.lineTo(44, 4); g.lineTo(0, 30); g.lineTo(-44, 4); g.closePath(); g.stroke(); g.beginPath(); g.moveTo(0, 42); g.lineTo(44, 14); g.lineTo(0, 76); g.lineTo(-44, 14); g.closePath(); g.stroke(); g.restore();
      txt(g, '以太坊', 1770, 480, 26, BLUE, 'center', eth);
    }
    for (var k = 0; k < 10; k++) { var q = (lt - L[2] - 0.4 - 0.27 * k) / 1.6; if (q < 0 || q > 1) continue; coin(g, 1130 + 60 * k, 600 - 260 * eo(q), 15, 1 - E((q - 0.6) / 0.4)); }
  };
  D.gpu = function (g, lt, L) {
    var big = 1 - ap(lt, L[2], 0.5);
    gpu(g, 1380, 620, 560, 0.8, lt, ap(lt, 0.2) * big); txt(g, 'GPU · 显卡', 1380, 820, 30, GOLD, 'center', ap(lt, 0.6) * big);
    var mon = ap(lt, L[1], 0.5) * big;
    if (mon > 0) {
      g.save(); g.globalAlpha *= mon; g.strokeStyle = 'rgba(200,215,240,0.6)'; g.lineWidth = 3; g.strokeRect(1520, 300, 290, 170);
      for (var i = 0; i < 6; i++) { g.fillStyle = rgba(i % 2 ? BLUE : GOLD, 0.6); g.beginPath(); g.moveTo(1530 + i * 46, 460); g.lineTo(1560 + i * 46, 360 + 30 * rnd(i)); g.lineTo(1600 + i * 46, 460); g.closePath(); g.fill(); }
      g.restore(); txt(g, '游戏画面', 1665, 505, 22, DIM, 'center', mon);
    }
    var cmp = ap(lt, L[2], 0.5);
    if (cmp > 0) {
      g.save(); g.globalAlpha *= cmp;
      // CPU: 8 big cores lighting one by one
      txt(g, 'CPU', 1120, 470, 34, BLUE, 'center', 1, 900);
      for (var i = 0; i < 8; i++) { var x = 1010 + (i % 4) * 58, y = 510 + Math.floor(i / 4) * 58, on = lt > L[3] && Math.floor((lt - L[3]) * 2.2) % 8 === i;
        g.fillStyle = on ? BLUE : 'rgba(80,100,140,0.45)'; g.shadowColor = BLUE; g.shadowBlur = on ? 18 : 0; g.fillRect(x, y, 48, 48); }
      g.shadowBlur = 0; txt(g, '几个大核，一件件做', 1120, 690, 24, DIM, 'center', ap(lt, L[3] + 0.6));
      // GPU: a grid of tiny cores, all lit at once in a wave
      txt(g, 'GPU', 1560, 470, 34, GOLD, 'center', 1, 900);
      for (var r = 0; r < 12; r++) for (var c = 0; c < 26; c++) {
        var x = 1400 + c * 12.5, y = 500 + r * 13, w0 = lt - L[3] - (c + r) * 0.012, on = w0 > 0 ? 0.6 + 0.4 * Math.sin(lt * 9 + c * 0.7 + r) : 0.12;
        g.fillStyle = rgba(GOLD, on); g.fillRect(x, y, 9, 9);
      }
      txt(g, '成千上万个小核，同时做', 1560, 690, 24, GOLD, 'center', ap(lt, L[3] + 0.6));
      g.restore();
    }
  };
  D.crash = function (g, lt, L) {
    var ch = wn(lt, L[0], L[1] + 1.0, 0.5);
    if (ch > 0) {
      g.save(); g.globalAlpha *= ch; var x0 = 1060, x1 = 1780, y0 = 820, p = cl((lt - L[0]) / 2.0);
      line(g, x0, y0, x1, y0, 'rgba(200,210,230,0.4)', 2, 1);
      g.beginPath(); var N = 60; for (var i = 0; i <= N * p; i++) { var u = i / N, v = u < 0.55 ? 0.2 + 0.75 * Math.pow(u / 0.55, 1.6) + 0.05 * Math.sin(u * 40) : 0.95 - 0.8 * eo((u - 0.55) / 0.3) + 0.03 * Math.sin(u * 50);
        var x = x0 + (x1 - x0) * u, y = y0 - 380 * v; if (i) g.lineTo(x, y); else g.moveTo(x, y); }
      g.strokeStyle = p > 0.6 ? RED : GOLD; g.lineWidth = 4; g.shadowColor = g.strokeStyle; g.shadowBlur = 16; g.stroke(); g.restore();
      txt(g, '币价（示意）', 1420, 870, 24, DIM, 'center', ch);
      rig(g, 1420, 700, lt, 6, null, true, ap(lt, L[1], 0.4) * ch * 0.0);
    }
    var cold = wn(lt, L[1], L[3] + 0.3, 0.4), warm = ap(lt, L[2] + 0.3, 0.8);
    if (cold > 0) { g.save(); g.globalAlpha *= cold; for (var k = 0; k < 5; k++) gpu(g, 1120 + k * 150, 600, 130, warm * 0.6, lt * warm, 1, warm < 0.3); g.restore();
      txt(g, '不赚钱了', 1420, 470, 40, RED, 'center', cold * (1 - warm), 900); txt(g, '显卡还在', 1420, 470, 40, GOLD, 'center', cold * warm, 900); }
    var rn = ap(lt, L[3], 0.4);
    if (rn > 0) {
      txt(g, 'Atlantic Crypto', 1420, 360, 36, DIM, 'center', rn * (1 - ap(lt, L[4], 0.6)));
      line(g, 1270, 348, 1270 + 300 * eo((lt - L[3] - 0.1) / 0.3), 348, RED, 4, rn * (1 - ap(lt, L[4], 0.6)));
      gtxt(g, 'CoreWeave', 1420, 470 - 20 * ap(lt, L[4], 0.6), 76, GOLD, 'center', ap(lt, L[3] + 0.3, 0.3));
      var r4 = ap(lt, L[4], 0.5);
      if (r4 > 0) {
        for (var k = 0; k < 3; k++) gpu(g, 1180 + k * 150, 640, 120, 0.8, lt, r4);
        for (var j = 0; j < 3; j++) { var tx = 1150 + j * 230, ty = 900; card(g, tx - 90, ty - 50, 180, 90, BLUE, r4); txt(g, '租客', tx, ty + 10, 28, INK, 'center', r4);
          arrow(g, 1330, 700, tx, ty - 56, BLUE, r4 * 0.8, eo((lt - L[4] - 0.2 - j * 0.15) / 0.5), lt * 40); }
      }
    }
  };
  D.ai = function (g, lt, L) {
    var net = wn(lt, L[0], L[3] + 0.2, 0.6);
    if (net > 0) {
      g.save(); g.globalAlpha *= net; var layers = [4, 6, 6, 3], X = [1120, 1320, 1520, 1720], pts = [];
      layers.forEach(function (n, li) { pts.push([]); for (var i = 0; i < n; i++) pts[li].push([X[li], 560 - (n - 1) * 40 + i * 80]); });
      for (var li = 0; li < 3; li++) pts[li].forEach(function (a, i) { pts[li + 1].forEach(function (b, j) { var pulse = 0.5 + 0.5 * Math.sin(lt * 4 - li - (i + j) * 0.3);
        g.strokeStyle = rgba(BLUE, 0.12 + 0.3 * pulse); g.lineWidth = 1.5; g.beginPath(); g.moveTo(a[0], a[1]); g.lineTo(b[0], b[1]); g.stroke(); }); });
      pts.forEach(function (ly) { ly.forEach(function (p, i) { glowDot(g, p[0], p[1], 8, GOLD, 1); }); }); g.restore();
    }
    var farm = wn(lt, L[1] + 0.4, L[3] + 0.2, 0.5);
    if (farm > 0) { for (var r = 0; r < 3; r++) for (var c = 0; c < 8; c++) { var q = cl((lt - L[2] - 0.2 - (r * 8 + c) * 0.04) / 0.3); gpu(g, 1060 + c * 100, 840 + r * 0 - (r ? 0 : 0) + r * 0, 88, q, lt, farm * (0.35 + 0.65 * q)); } }
    var ipo = ap(lt, L[3], 0.5);
    if (ipo > 0) {
      card(g, 1110, 440, 600, 260, GOLD, ipo); mono(g, 'NASDAQ', 1410, 510, 28, DIM, 'center', ipo);
      gtxt(g, 'CRWV', 1410, 610, 96, GOLD, 'center', ipo); mono(g, '2025 · 03 · 28', 1410, 670, 26, INK, 'center', ipo);
    }
  };
  D.sell = function (g, lt, L) {
    var clk = wn(lt, 0.2, L[2] + 0.2, 0.5);
    if (clk > 0) {
      gpu(g, 1400, 640, 520, 0.9, lt, clk);
      g.save(); g.globalAlpha *= clk; var cx = 1400, cy = 640, R = 150; g.strokeStyle = 'rgba(240,220,170,0.85)'; g.lineWidth = 5; g.shadowColor = GOLD; g.shadowBlur = 18; g.beginPath(); g.arc(cx, cy, R, 0, 6.29); g.stroke();
      g.fillStyle = 'rgba(8,12,20,0.6)'; g.fill(); for (var i = 0; i < 12; i++) { var an = i / 12 * 6.283; line(g, cx + Math.cos(an) * R * 0.82, cy + Math.sin(an) * R * 0.82, cx + Math.cos(an) * R * 0.95, cy + Math.sin(an) * R * 0.95, INK, 3, 1); }
      var an = -Math.PI / 2 + (lt - L[1]) * 2.4; line(g, cx, cy, cx + Math.cos(an) * R * 0.75, cy + Math.sin(an) * R * 0.75, GOLD, 6, 1); line(g, cx, cy, cx + Math.cos(an / 12) * R * 0.5, cy + Math.sin(an / 12) * R * 0.5, INK, 6, 1); g.restore();
    }
    var fl = ap(lt, L[2], 0.5), y = 790;
    if (fl > 0) {
      card(g, 180, y - 70, 240, 140, BLUE, fl); txt(g, '英伟达', 300, y + 12, 36, INK, 'center', fl, 900);
      for (var k = 0; k < 3; k++) { var q = cl((lt - L[2] - 0.4 - k * 0.5) / 1.2); if (q > 0 && q < 1) gpu(g, 440 + q * 360, y, 110, 0.7, lt, fl * (1 - E((q - 0.85) / 0.15))); }
      arrow(g, 430, y, 820, y, BLUE, fl * 0.5, eo((lt - L[2] - 0.2) / 0.5), lt * 40);
      datacenter(g, 860, y + 90, 380, 170, 160, lt, ap(lt, L[3], 1.2), ap(lt, L[3] - 0.3, 0.5));
      var pw = ap(lt, L[3] + 0.6, 0.5); txt(g, '⚡ 电', 1050, y - 200, 28, GOLD, 'center', pw); txt(g, '网络', 1180, y - 200, 28, BLUE, 'center', pw);
      for (var j = 0; j < 3; j++) { var ty = y - 120 + j * 120, rr_ = ap(lt, L[4] + j * 0.2, 0.4); card(g, 1560, ty - 42, 240, 84, GOLD, rr_); txt(g, 'AI 公司', 1680, ty + 10, 28, INK, 'center', rr_);
        arrow(g, 1330, y - 10, 1550, ty, GOLD, rr_ * 0.8, eo((lt - L[4] - j * 0.2) / 0.5), lt * 40);
        for (var c = 0; c < 2; c++) { var q = ((lt - L[4] - 0.6 - j * 0.3 - c * 0.7) % 1.4) / 1.4; if (lt > L[4] + 0.6 && q >= 0) coin(g, 1550 - q * 220, ty + 26 - 10 * Math.sin(q * 3.14), 11, rr_ * (1 - E((q - 0.8) / 0.2))); }
      }
    }
  };
  D.landlord = function (g, lt, L) {
    var b = wn(lt, 0.1, L[2] + 0.3, 0.5);
    if (b > 0) {
      var P = box3(g, 1200, 900, 360, 420, 180, '#18223a', '#101828', '#24304a', b);
      g.save(); g.globalAlpha *= b;
      for (var r = 0; r < 5; r++) for (var c = 0; c < 4; c++) { var on = lt > L[1] + (r * 4 + c) * 0.06; g.fillStyle = on ? rgba(GOLD, 0.55 + 0.2 * Math.sin(lt * 2 + r + c)) : 'rgba(40,50,70,0.6)'; g.fillRect(1225 + c * 85, 520 + r * 72, 60, 46); }
      g.restore();
      for (var k = 0; k < 8; k++) { var q = (lt - L[1] - 0.5 - k * 0.25) / 1.0; if (q < 0 || q > 1) continue; coin(g, 1250 + (k % 4) * 85, 600 + Math.floor(k / 4) * 120 + 380 * q * q, 13, b * (1 - E((q - 0.8) / 0.2))); }
      txt(g, '租客按月交租', 1380, 980, 26, GOLD, 'center', ap(lt, L[1] + 0.6) * b);
    }
    var s1 = ap(lt, L[2], 0.5);
    if (s1 > 0) {
      card(g, 1000, 470, 400, 420, BLUE, s1); txt(g, '大型云', 1200, 530, 34, INK, 'center', s1, 900); txt(g, '亚马逊 · 微软 · 谷歌', 1200, 570, 22, DIM, 'center', s1);
      var items = ['存储', '数据库', '网站', '邮件', '分析', '安全', 'GPU', '视频', '…'];
      items.forEach(function (it, i) { var q = ap(lt, L[3] + 0.15 * i, 0.3); chip(g, 1080 + (i % 3) * 120, 640 + Math.floor(i / 3) * 76, it, it === 'GPU' ? GOLD : BLUE, q * s1, 22); });
      var s2 = ap(lt, L[5], 0.5); card(g, 1440, 470, 380, 420, GOLD, s2); gtxt(g, 'CoreWeave', 1630, 534, 36, GOLD, 'center', s2); txt(g, '几乎只做一件事', 1630, 572, 22, DIM, 'center', s2);
      for (var k = 0; k < 4; k++) gpu(g, 1630, 640 + k * 64, 220, 0.7 + 0.3 * Math.sin(lt * 3 + k), lt, s2 * ap(lt, L[6] + k * 0.12, 0.3));
    }
  };
  D.scale = function (g, lt, L) {
    var dots = wn(lt, 0.1, L[1] + 0.2, 0.5);
    if (dots > 0) {
      for (var i = 0; i < 43; i++) { var x = 1060 + rnd(i + 3) * 720, y = 420 + rnd(i + 50) * 480, q = cl((lt - L[0] - 0.3 - i * 0.04) / 0.25); glowDot(g, x, y, 6, i % 5 ? GOLD : BLUE, dots * q); }
      note(g, '分布为示意', dots);
    }
    var pw = ap(lt, L[1], 0.5) * (1 - ap(lt, L[4], 0.5) * 0.4);
    if (pw > 0) {
      txt(g, '正在用', 1060, 560, 28, BLUE, 'left', pw); ticks(g, 1060, 650, 15, Math.round(15 * eo((lt - L[2]) / 1.0)), BLUE, pw, 60, 17); txt(g, '1.5 吉瓦', 1060 + 15 * 17 + 20, 640, 30, BLUE, 'left', ap(lt, L[2] + 0.9) * pw);
      txt(g, '已签下', 1060, 730, 28, GOLD, 'left', ap(lt, L[3]) * pw); ticks(g, 1060, 820, 37, Math.round(37 * eo((lt - L[3]) / 1.4)), GOLD, ap(lt, L[3]) * pw, 60, 17);
      txt(g, '3.7 吉瓦', 1060 + 37 * 17 - 8, 870, 30, GOLD, 'right', ap(lt, L[3] + 1.3) * pw); mono(g, '每一格 = 0.1 吉瓦', 1060, 900, 18, DIM, 'left', pw * 0.8);
    }
    var nu = ap(lt, L[4], 0.6);
    if (nu > 0) { tower(g, 1700, 600, 0.9, lt, nu); txt(g, '大型核电站一座', 1700, 650, 24, INK, 'center', nu); txt(g, '≈ 1 吉瓦', 1700, 690, 30, BLUE, 'center', nu, 900); }
  };
  D.contract = function (g, lt, L) {
    var one = 1 - ap(lt, L[2], 0.5) * 0.92;
    doc(g, 1390, 640, 420, 520, ap(lt, 0.2) * one, -0.03, '算力租赁合同', 3);
    txt(g, '多年 · 固定算力', 1390, 450, 22, '#2a1e12', 'center', ap(lt, 0.5) * one, 700);
    stamp(g, 1440, 760, '用不用都要付', lt - L[1] - 0.6, one);
    var st = ap(lt, L[2], 0.6);
    for (var i = 0; i < 40; i++) { var q = cl((lt - L[2] - i * 0.04) / 0.35); if (q <= 0) continue; var c = i % 10, r = Math.floor(i / 10);
      doc(g, 1060 + c * 74, 930 - r * 34 - (1 - eo(q)) * 80, 64, 84, st * q, (rnd(i) - 0.5) * 0.1, null, i); }
    gtxt(g, '订单积压 ≈ 1040 亿美元', 1390, 380, 44, GOLD, 'center', ap(lt, L[3] + 0.4));
    txt(g, '签下了、还没交付的生意', 1390, 990, 24, DIM, 'center', ap(lt, L[3] + 0.8));
  };
  function tally100(g, lt, groups, a, y0) {               // 100 ticks in two rows of 50
    if (a <= 0) return; g.save(); g.globalAlpha *= a; var k = 0;
    for (var i = 0; i < 100; i++) { var gr = null, acc = 0; for (var j = 0; j < groups.length; j++) { acc += groups[j][0]; if (i < acc) { gr = groups[j]; break; } }
      var x = 1050 + (i % 50) * 15, y = y0 + Math.floor(i / 50) * 92, col = gr ? gr[1] : 'rgba(160,170,190,0.2)';
      g.fillStyle = col; g.shadowColor = gr ? col : 'transparent'; g.shadowBlur = gr ? 8 : 0; g.fillRect(x, y - 64, 6.5, 64); }
    g.restore();
  }
  D.msft = function (g, lt, L) {
    gtxt(g, '?', 1420, 640, 220, GOLD, 'center', wn(lt, 0.1, L[1] + 0.2, 0.4));
    var a = ap(lt, L[1], 0.5), n = Math.round(67 * eo((lt - L[1] - 0.3) / (L[2] + 0.8 - L[1] - 0.3)));
    if (a > 0) {
      var sh = lt > L[4] ? Math.sin(lt * 30) * 4 * (1 - E((lt - L[4] - 1.2) / 0.6)) : 0;
      g.save(); g.translate(sh, 0); tally100(g, lt, [[n, RED]], a, 600); g.restore();
      txt(g, '微软 ≈ 67%', 1050, 745, 30, RED, 'left', ap(lt, L[2] + 0.8), 900); txt(g, '其他客户', 1800, 745, 24, DIM, 'right', ap(lt, L[2] + 0.8));
      mono(g, '2025 年收入 · 每格 1%', 1050, 785, 18, DIM, 'left', a * 0.8);
      var w = ap(lt, L[3], 0.5); if (w > 0) { card(g, 1150, 830, 560, 120, RED, w); txt(g, '一个客户少租一点', 1430, 882, 30, INK, 'center', w); txt(g, '收入就少一大块', 1430, 926, 30, RED, 'center', ap(lt, L[4] + 0.4), 900); }
    }
  };
  D.spread = function (g, lt, L) {
    var a = ap(lt, 0.1, 0.5), m = eo((lt - L[1] - 0.3) / 1.9);
    var g1 = Math.round(67 + (36 - 67) * m), g2 = Math.round(26 * m), g3 = Math.round(10 * m);
    tally100(g, lt, [[g1, m > 0.5 ? GOLD : RED], [g2, BLUE], [g3, '#b48cff']], a, 500);
    var lb = ap(lt, L[1] + 2.0);
    txt(g, '最大 ≈ 36%', 1050, 640, 26, GOLD, 'left', lb, 900); txt(g, '第二 ≈ 26%', 1290, 640, 26, BLUE, 'left', lb, 900); txt(g, '第三 ≈ 10%', 1530, 640, 26, '#b48cff', 'left', lb, 900);
    mono(g, '2026 年二季度收入占比（据季报摘录）', 1050, 690, 18, DIM, 'left', lb * 0.8);
    var o = ap(lt, L[2], 0.5); card(g, 1040, 780, 360, 170, GOLD, o); txt(g, 'OpenAI', 1220, 840, 34, INK, 'center', o, 900); txt(g, '据报合计约 224 亿美元', 1220, 900, 24, GOLD, 'center', ap(lt, L[3]));
    var mt = ap(lt, L[4], 0.5); card(g, 1440, 780, 360, 170, GOLD, mt); txt(g, 'Meta', 1620, 840, 34, INK, 'center', mt, 900); txt(g, '最多约 210 亿美元', 1620, 900, 24, GOLD, 'center', ap(lt, L[4] + 0.6));
  };
  D.nvidia = function (g, lt, L) {
    var a = ap(lt, 0.2, 0.5), y = 640;
    card(g, 1000, y - 90, 300, 180, BLUE, a); txt(g, '英伟达', 1150, y + 14, 42, INK, 'center', a, 900);
    card(g, 1520, y - 90, 300, 180, GOLD, a); gtxt(g, 'CoreWeave', 1670, y + 14, 38, GOLD, 'center', a);
    var s = ap(lt, L[1], 0.4); if (s > 0) {
      g.save(); g.globalAlpha *= s; g.strokeStyle = BLUE; g.lineWidth = 3; g.setLineDash([14, 10]); g.lineDashOffset = -lt * 40; g.beginPath(); g.moveTo(1180, y - 100); g.quadraticCurveTo(1410, y - 260, 1640, y - 100); g.stroke(); g.setLineDash([]); g.restore();
      for (var k = 0; k < 3; k++) { var q = ((lt - L[1]) * 0.45 + k / 3) % 1, x = (1 - q) * (1 - q) * 1180 + 2 * q * (1 - q) * 1410 + q * q * 1640, yy = (1 - q) * (1 - q) * (y - 100) + 2 * q * (1 - q) * (y - 260) + q * q * (y - 100); gpu(g, x, yy, 80, 0.8, lt, s); }
      txt(g, '卖 GPU（供货商）', 1410, y - 250, 26, BLUE, 'center', s);
    }
    var h = ap(lt, L[2], 0.4); if (h > 0) {
      g.save(); g.globalAlpha *= h; g.strokeStyle = GOLD; g.lineWidth = 3; g.setLineDash([14, 10]); g.lineDashOffset = -lt * 40; g.beginPath(); g.moveTo(1640, y + 100); g.quadraticCurveTo(1410, y + 260, 1180, y + 100); g.stroke(); g.setLineDash([]); g.restore();
      for (var k = 0; k < 4; k++) { var q = ((lt - L[2]) * 0.45 + k / 4) % 1, x = (1 - q) * (1 - q) * 1180 + 2 * q * (1 - q) * 1410 + q * q * 1640, yy = (1 - q) * (1 - q) * (y + 100) + 2 * q * (1 - q) * (y + 260) + q * q * (y + 100); coin(g, x, yy, 13, h); }
      txt(g, '投钱入股（股东）', 1410, y + 250, 26, GOLD, 'center', h);
    }
    chip(g, 1410, y + 310, '2026 年 1 月 · 20 亿美元', GOLD, ap(lt, L[3] + 0.4), 26);
  };
  D.cost = function (g, lt, L) {
    var a = ap(lt, 0.2, 0.5);
    gpu(g, 1180, 640, 300, 0.7, lt, a);
    function tag(x, y, s, col, p) { if (p <= 0) return; g.save(); g.globalAlpha *= p; g.translate(x, y); g.rotate(0.12 + 0.05 * Math.sin(lt * 2)); line(g, 0, -70, 0, -20, 'rgba(200,210,230,0.6)', 2, 1);
      rr(g, -80, -20, 160, 70, 10); g.fillStyle = 'rgba(30,14,14,0.9)'; g.fill(); g.strokeStyle = col; g.lineWidth = 3; g.shadowColor = col; g.shadowBlur = 14; g.stroke(); g.shadowBlur = 0;
      g.font = '900 34px ' + SERIF; g.fillStyle = col; g.textAlign = 'center'; g.fillText(s, 0, 28); g.restore(); }
    tag(1250, 520, '很贵', RED, ap(lt, 0.6, 0.4));
    datacenter(g, 1420, 860, 340, 200, 150, lt, 0.8, ap(lt, L[1], 0.5));
    tag(1640, 560, '更贵', RED, ap(lt, L[1] + 0.6, 0.3));
    gtxt(g, '?', 1430, 420, 150, GOLD, 'center', ap(lt, L[2] + 0.2, 0.4));
  };
  D.borrow = function (g, lt, L) {
    var cx = 1380, cy = 640, pile = ap(lt, 0, 0.3) * (1 - ap(lt, L[3], 0.5) * 0.7);
    var ch = eo((lt - L[1] - 0.2) / 1.0), lk = lt > L[1] + 1.2 ? 1 : 0;
    // back half of the chain, then the boards, then the front half
    chainArc(g, cx, cy + 20, 300, 110, Math.PI + 0.05, Math.PI + 0.05 + Math.PI * ch, pile);
    for (var r = 0; r < 3; r++) for (var c = 0; c < 4 - (r === 2 ? 1 : 0); c++) gpu(g, cx - 210 + c * 140 + (r === 2 ? 70 : 0), cy + 70 - r * 74, 130, 0.7 + 0.3 * Math.sin(lt * 3 + r + c), lt, pile);
    chainArc(g, cx, cy + 20, 300, 110, 0.05, 0.05 + Math.PI * ch, pile);
    lock(g, cx, cy + 150, 0.9, lk, pile * ap(lt, L[1] + 0.8, 0.3));
    var bk_ = ap(lt, L[2], 0.5) * (1 - ap(lt, L[3], 0.5));
    if (bk_ > 0) { bank(g, 1740, 900, 0.7, bk_); for (var k = 0; k < 6; k++) { var q = ((lt - L[2] - k * 0.25) % 1.5) / 1.5; if (lt < L[2] + k * 0.25) continue; coin(g, 1700 - q * 260, 780 - 120 * Math.sin(q * 3.14), 14, bk_ * (1 - E((q - 0.8) / 0.2))); }
      txt(g, '借款 23 亿美元', 1560, 990, 28, GOLD, 'center', bk_); }
    var an = ap(lt, L[3], 0.5);
    if (an > 0) {
      house(g, 1150, 920, 1.0, an); lock(g, 1150, 940, 0.45, 1, an); txt(g, '房贷：房子做抵押', 1150, 1000, 26, INK, 'center', an);
      gpu(g, 1620, 860, 220, 0.8, lt, ap(lt, L[4], 0.5)); lock(g, 1620, 930, 0.45, 1, ap(lt, L[4], 0.5)); txt(g, '这次：芯片做抵押', 1620, 1000, 26, GOLD, 'center', ap(lt, L[4], 0.5));
    }
  };
  D.debt = function (g, lt, L) {
    var a = ap(lt, L[1], 0.5) * (1 - ap(lt, L[3], 0.5) * 0.75), n = Math.round(52 * eo((lt - L[2] - 0.2) / 2.1));
    if (a > 0) { txt(g, '债务 + 租约（2026 年 6 月底）', 1050, 520, 26, DIM, 'left', a);
      ticks(g, 1050, 640, 26, Math.min(26, n), RED, a, 80, 28); ticks(g, 1050, 750, 26, Math.max(0, n - 26), RED, a, 80, 28); mono(g, '每一格 = 10 亿美元', 1050, 790, 18, DIM, 'left', a * 0.8); }
    var s = ap(lt, L[3], 0.5);
    if (s > 0) {
      var x0 = 1040, x1 = 1800, y = 900; function X(v) { return x0 + (x1 - x0) * v / 400; }
      g.save(); g.globalAlpha *= s; line(g, x0, y, x1, y, 'rgba(200,210,230,0.5)', 2, 1);
      [0, 100, 200, 300, 400].forEach(function (v) { line(g, X(v), y - 8, X(v), y + 8, 'rgba(200,210,230,0.5)', 2, 1); mono(g, v + '', X(v), y + 36, 20, DIM, 'center', 1); });
      mono(g, '亿美元', x1, y + 64, 18, DIM, 'right', 1); g.restore();
      var p1 = eo((lt - L[3] - 0.2) / 0.6); g.save(); g.globalAlpha *= s; g.fillStyle = rgba(BLUE, 0.85); g.shadowColor = BLUE; g.shadowBlur = 16; g.fillRect(X(350), y - 120, (X(390) - X(350)) * p1, 50); g.restore();
      txt(g, '今年要花 350–390', X(370), y - 140, 26, BLUE, 'center', ap(lt, L[3] + 0.6));
      var p2 = eo((lt - L[5] - 0.2) / 0.6), r2 = ap(lt, L[5], 0.4); g.save(); g.globalAlpha *= r2; g.fillStyle = rgba(GOLD, 0.9); g.shadowColor = GOLD; g.shadowBlur = 16; g.fillRect(X(124), y - 60, (X(132) - X(124)) * p2, 50); g.restore();
      txt(g, '全年收入 124–132', X(128), y - 80, 26, GOLD, 'center', ap(lt, L[5] + 0.6));
    }
  };
  D.interest = function (g, lt, L) {
    var a = ap(lt, 0.2, 0.5) * (1 - ap(lt, L[4], 0.5)), base = 880, H = 48;
    if (a > 0) {
      g.save(); g.globalAlpha *= a; line(g, 1040, base, 1780, base, 'rgba(200,210,230,0.5)', 2, 1);
      function bar(x, v, col, p, lab, val) { var h = v * H * eo(p); g.fillStyle = col; g.shadowColor = col; g.shadowBlur = 14; g.fillRect(x - 70, base - h, 140, h); g.shadowBlur = 0; txt(g, lab, x, base + 40, 24, INK, 'center', 1); if (p > 0.9) txt(g, val, x, base - h - 16, 28, col, 'center', 1, 900); }
      bar(1170, 2.67, rgba(BLUE, 0.8), (lt - L[2]) / 0.6, '2025 年二季度', '2.7 亿');
      bar(1410, 6.4, RED, (lt - L[1] - 0.3) / 0.8, '2026 年二季度', '6.4 亿');
      var p3 = ap(lt, L[3], 0.5); if (p3 > 0) { g.globalAlpha = a * p3; g.strokeStyle = RED; g.lineWidth = 3; g.setLineDash([10, 8]); g.strokeRect(1580, base - 9.4 * H, 140, 9.4 * H); g.setLineDash([]);
        g.fillStyle = rgba(RED, 0.25); g.fillRect(1580, base - 9.4 * H, 140, 0.8 * H); g.fillStyle = rgba(RED, 0.5); g.fillRect(1580, base - 8.6 * H, 140, 8.6 * H);
        txt(g, '三季度（指引）', 1650, base + 40, 24, INK, 'center', 1); txt(g, '8.6–9.4 亿', 1650, base - 9.4 * H - 16, 28, RED, 'center', 1, 900); }
      g.restore();
    }
    var w = ap(lt, L[4], 0.5);
    if (w > 0) {
      var y0 = 560, k = 50; g.save(); g.globalAlpha *= w; line(g, 1060, y0, 1780, y0, 'rgba(200,210,230,0.6)', 2, 1); mono(g, '0', 1040, y0 + 6, 20, DIM, 'right', 1); g.restore();
      var pg = eo((lt - L[5] - 0.1) / 0.5); g.save(); g.globalAlpha *= w; g.fillStyle = GOLD; g.shadowColor = GOLD; g.shadowBlur = 16; g.fillRect(1160, y0 - 1.28 * k * pg, 160, 1.28 * k * pg); g.restore();
      txt(g, '经营（调整后）', 1240, y0 + 40, 24, INK, 'center', w); txt(g, '+1.28 亿', 1240, y0 - 1.28 * k - 16, 28, GOLD, 'center', ap(lt, L[5] + 0.5), 900);
      var pr = eo((lt - L[6] - 0.1) / 0.6); g.save(); g.globalAlpha *= w; g.fillStyle = RED; g.shadowColor = RED; g.shadowBlur = 18; g.fillRect(1440, y0 - 1.28 * k, 160, 6.4 * k * pr); g.restore();
      line(g, 1320, y0 - 1.28 * k, 1440, y0 - 1.28 * k, 'rgba(240,189,92,0.6)', 2, ap(lt, L[6]));
      txt(g, '− 利息 6.4 亿', 1520, y0 - 1.28 * k - 16, 28, RED, 'center', ap(lt, L[6]), 900);
      gtxt(g, '亏损', 1690, y0 + 5.1 * k * pr, 56, RED, 'center', ap(lt, L[6] + 0.7, 0.3));
      note(g, '示意：未列出税、股票奖励等其他项目', w);
    }
  };
  D.aging = function (g, lt, L) {
    var a = ap(lt, 0.2, 0.5), age = eo((lt - L[0] - 0.8) / 2.5) * (1 - ap(lt, L[1], 0.5));
    gpu(g, 1400, 620, 440, 0.8 * (1 - age), lt, a * (1 - ap(lt, L[1], 0.5)), age > 0.6);
    if (age > 0.05) { g.save(); g.globalAlpha *= age * a * 0.9; for (var i = 0; i < 160; i++) { g.fillStyle = 'rgba(150,140,120,0.5)'; g.fillRect(1180 + rnd(i) * 440, 530 + rnd(i + 9) * 180, 3, 3); } g.restore(); }
    var y = 560, x0 = 1060, u = 110, b = ap(lt, L[1], 0.5);
    if (b > 0) {
      g.save(); g.globalAlpha *= b; for (var k = 0; k <= 6; k++) { line(g, x0 + k * u, y + 220, x0 + k * u, y + 230, 'rgba(200,210,230,0.5)', 2, 1); mono(g, k + ' 年', x0 + k * u, y + 262, 18, DIM, 'center', 1); }
      line(g, x0, y + 225, x0 + 6 * u, y + 225, 'rgba(200,210,230,0.5)', 2, 1); g.restore();
      var p1 = eo((lt - L[1] - 0.2) / 0.8); g.save(); g.globalAlpha *= b; g.fillStyle = GOLD; g.shadowColor = GOLD; g.shadowBlur = 14; g.fillRect(x0, y + 40, 6 * u * p1, 44); g.restore(); txt(g, 'CoreWeave：6 年', x0, y + 22, 26, GOLD, 'left', b);
      var r2 = ap(lt, L[2], 0.4), p2 = eo((lt - L[2] - 0.2) / 0.8); g.save(); g.globalAlpha *= r2; g.fillStyle = BLUE; g.shadowColor = BLUE; g.shadowBlur = 14; g.fillRect(x0, y + 140, 4 * u * p2, 44); g.restore(); txt(g, 'Nebius：4 年', x0, y + 122, 26, BLUE, 'left', r2);
      for (var k = 1; k <= 6; k++) { var q = ap(lt, L[3] + 0.3 + 0.27 * (k - 1), 0.2); chip(g, x0 + k * u, y - 30, '新一代', RED, q, 20); }
      var rc = ap(lt, L[4], 0.5); if (rc > 0) { g.save(); g.globalAlpha *= rc; g.strokeStyle = RED; g.lineWidth = 3; g.shadowColor = RED; g.shadowBlur = 12; g.beginPath();
        for (var i = 0; i <= 60 * eo((lt - L[4]) / 1.2); i++) { var v = i / 60, xx = x0 + v * 6 * u, yy = y + 330 + 120 * (1 - Math.exp(-2.2 * v)); if (i) g.lineTo(xx, yy); else g.moveTo(xx, yy); } g.stroke(); g.restore();
        txt(g, '旧卡租金（示意）', x0 + 6 * u, y + 470, 22, RED, 'right', rc); }
    }
  };
  D.bond = function (g, lt, L) {
    var a = ap(lt, 0.2, 0.5) * (1 - ap(lt, L[4], 0.5)), x0 = 1060, x1 = 1760, y0 = 900, H = 34;
    if (a > 0) {
      g.save(); g.globalAlpha *= a; line(g, x0, y0, x1, y0, 'rgba(200,210,230,0.5)', 2, 1); line(g, x0, y0, x0, y0 - 16 * H, 'rgba(200,210,230,0.3)', 2, 1);
      [5, 10, 15].forEach(function (v) { line(g, x0, y0 - v * H, x1, y0 - v * H, 'rgba(200,210,230,0.12)', 1, 1); mono(g, v + '%', x0 - 12, y0 - v * H + 6, 20, DIM, 'right', 1); });
      var p = eo((lt - L[1]) / 2.2), N = 80; g.beginPath();
      for (var i = 0; i <= N * p; i++) { var u = i / N, v = 9 + 1.8 * u + 3.6 * Math.pow(u, 6) + 0.4 * Math.sin(u * 30) * (1 - u); if (u > 0.985) v = 14.5 + (15 - 14.5) * (1 - (u - 0.985) / 0.015) * 0; var x = x0 + (x1 - x0) * u, y = y0 - v * H; if (i) g.lineTo(x, y); else g.moveTo(x, y); }
      g.strokeStyle = RED; g.lineWidth = 4; g.shadowColor = RED; g.shadowBlur = 16; g.stroke(); g.restore();
      var hp = ap(lt, L[2] + 1.6, 0.3); line(g, x1 - 100, y0 - 15 * H, x1 + 20, y0 - 15 * H, RED, 2, hp); txt(g, '一度 15%', x1 - 110, y0 - 15 * H - 14, 24, RED, 'right', hp, 900);
      glowDot(g, x1, y0 - 14.5 * H, 8, RED, ap(lt, L[3], 0.3)); txt(g, '收 14.5% · 10 月 13 日', x1, y0 - 14.5 * H + 44, 22, INK, 'right', ap(lt, L[3], 0.3));
      txt(g, '2032 年到期的一笔债券 · 收益率', x0, 330, 24, DIM, 'left', a); note(g, '走势为示意，只标出 10 月 13 日的数值', a);
    }
    var s = ap(lt, L[4], 0.5);
    if (s > 0) {
      var tilt = 0.28 * eo((lt - L[4] - 0.4) / 0.8), cx = 1400, cy = 680;
      g.save(); g.globalAlpha *= s; g.translate(cx, cy); g.fillStyle = 'rgba(200,210,230,0.7)'; g.beginPath(); g.moveTo(-30, 70); g.lineTo(30, 70); g.lineTo(0, 0); g.closePath(); g.fill();
      g.rotate(-tilt); g.fillStyle = 'rgba(200,210,230,0.85)'; g.fillRect(-340, -8, 680, 12);
      card(g, -360, -110, 200, 96, BLUE, 1); txt(g, '债券价格', -260, -52, 28, INK, 'center', 1); card(g, 160, -110, 200, 96, RED, 1); txt(g, '收益率', 260, -52, 28, RED, 'center', 1, 900); g.restore();
      txt(g, '价格跌 → 收益率涨', cx, cy + 140, 26, DIM, 'center', s);
      var m = ap(lt, L[6], 0.5); if (m > 0) { txt(g, '市场的担心', cx, 920, 26, INK, 'center', m); ticks(g, cx - 200, 990, 20, Math.round(20 * eo((lt - L[6] - 0.2) / 1.0)), RED, m, 36, 20); }
    }
  };
  D.post = function (g, lt, L) {
    var a = ap(lt, 0.2, 0.5);
    card(g, 1030, 300, 760, 300, '#9aa3b2', a); avatar(g, 1090, 360, 32, BLUE, a); txt(g, '一位知名投资人', 1140, 370, 28, INK, 'left', a, 900); mono(g, '10 月 13 日', 1760, 368, 18, DIM, 'right', a);
    wrapTxt(g, 'AI 建设，是不是在制造私募信贷泡沫？', 1070, 440, 680, 44, 32, INK, ap(lt, L[1], 0.4));
    if (lt > L[0]) { g.save(); g.globalAlpha *= ap(lt, L[0] + 0.4); g.strokeStyle = 'rgba(200,210,230,0.3)'; g.strokeRect(1070, 490, 300, 90); g.beginPath();
      for (var i = 0; i <= 40; i++) { var u = i / 40; g.lineTo(1080 + u * 280, 570 - 60 * Math.pow(u, 3) - 6 * Math.sin(u * 20)); } g.strokeStyle = RED; g.lineWidth = 3; g.stroke(); g.restore();
      txt(g, 'CoreWeave 债券收益率', 1390, 545, 20, DIM, 'left', ap(lt, L[0] + 0.4)); }
    var r = ap(lt, L[3], 0.5); line(g, 1100, 600, 1100, 660, 'rgba(200,210,230,0.4)', 2, r);
    card(g, 1130, 640, 560, 130, RED, r); avatar(g, 1190, 705, 30, RED, r); txt(g, '马斯克 · 回复', 1240, 690, 26, INK, 'left', r, 900); txt(g, 'Yikes.', 1240, 738, 32, RED, 'left', ap(lt, L[4]), 900);
  };
  D.wood = function (g, lt, L) {
    var a = ap(lt, 0.2, 0.5) * (1 - ap(lt, L[1], 0.5) * 0.85);
    if (a > 0) { g.save(); g.globalAlpha *= a;
      for (var i = 0; i < 9; i++) { var x = 1080 + i * 70, o = 560 + 20 * Math.sin(i * 1.7), c = o + (i % 3 - 1) * 26, up = c < o, last = i === 8;
        var cc = last ? 560 + 210 * eo((lt - L[0] - 0.6) / 0.4) : c; g.strokeStyle = 'rgba(200,210,230,0.5)'; line(g, x, Math.min(o, cc) - 24, x, Math.max(o, cc) + 24, 'rgba(200,210,230,0.45)', 2, 1);
        g.fillStyle = last ? RED : (up ? rgba(BLUE, 0.8) : rgba(RED, 0.6)); g.shadowColor = g.fillStyle; g.shadowBlur = last ? 18 : 0; g.fillRect(x - 20, Math.min(o, cc), 40, Math.max(6, Math.abs(cc - o))); }
      g.restore(); note(g, 'K 线为示意', a); txt(g, '10 月 14 日 收 65.78 美元', 1640, 900, 24, INK, 'right', ap(lt, L[0] + 1.0) * a); }
    var bl = ap(lt, L[1], 0.5) * (1 - ap(lt, L[4], 0.5) * 0.7);
    if (bl > 0) {
      txt(g, 'ARK 买入（每格 1 万股）', 1050, 520, 26, DIM, 'left', bl);
      var n1 = Math.round(19 * eo((lt - L[2] - 0.2) / 1.8)), n2 = Math.round(19 * eo((lt - L[3] - 0.3) / 1.6));
      ticks(g, 1050, 640, 19, n1, GOLD, bl, 80, 34); txt(g, '10 月 14 日', 1050 + 19 * 34 + 20, 615, 24, GOLD, 'left', bl * ap(lt, L[2] + 1.0));
      ticks(g, 1050, 760, 19, n2, GOLD, bl * ap(lt, L[3]), 80, 34); txt(g, '10 月 15 日', 1050 + 19 * 34 + 20, 735, 24, GOLD, 'left', bl * ap(lt, L[3] + 1.0));
    }
    var q = ap(lt, L[4], 0.5);
    if (q > 0) { card(g, 1040, 800, 760, 210, GOLD, q); avatar(g, 1100, 860, 30, GOLD, q); txt(g, '木头姐的理由', 1150, 870, 28, INK, 'left', q, 900);
      wrapTxt(g, '年轻公司在高利率时借钱，成本高很常见；她相信它能挺过债务这一关。', 1080, 925, 690, 40, 28, '#f3e3bd', ap(lt, L[5], 0.4)); mono(g, '据 TheStreet 转引彭博采访', 1780, 870, 16, DIM, 'right', q); }
  };
  D.scale2 = function (g, lt, L) {
    var p = ap(lt, 0.2, 0.5) * (1 - ap(lt, L[1], 0.5) * 0.8);
    chip(g, 1250, 470, '发行价 40 美元', BLUE, p, 26); chip(g, 1580, 470, '10 月 16 日 约 61 美元', GOLD, p, 26);
    var s = ap(lt, L[1], 0.5); if (s <= 0) return;
    var tl = lt > L[3] ? 0.22 - 0.22 * eo((lt - L[3] - 0.2) / 0.9) + 0.03 * Math.sin((lt - L[3]) * 6) * Math.exp(-(lt - L[3])) : lt > L[2] ? 0.22 * eo((lt - L[2] - 0.2) / 0.6) : 0;
    var cx = 1410, cy = 600;
    g.save(); g.globalAlpha *= s; g.fillStyle = 'rgba(200,210,230,0.75)'; g.fillRect(cx - 6, cy, 12, 320); g.fillRect(cx - 120, cy + 320, 240, 14);
    g.translate(cx, cy); g.rotate(-tl); g.fillRect(-360, -6, 720, 12);
    function pan(x, lab, col, on) { g.save(); g.translate(x, 0); g.rotate(tl); g.strokeStyle = 'rgba(200,210,230,0.6)'; g.lineWidth = 2; g.beginPath(); g.moveTo(0, 0); g.lineTo(-80, 150); g.moveTo(0, 0); g.lineTo(80, 150); g.stroke();
      g.fillStyle = 'rgba(30,40,60,0.95)'; g.beginPath(); g.ellipse(0, 150, 100, 22, 0, 0, 6.29); g.fill(); g.strokeStyle = col; g.shadowColor = col; g.shadowBlur = 14; g.stroke();
      if (on > 0) { g.globalAlpha *= on; g.font = '900 90px ' + SERIF; g.fillStyle = col; g.textAlign = 'center'; g.fillText(lab, 0, 130); } g.restore(); }
    pan(-330, '债', RED, ap(lt, L[2], 0.3)); pan(330, '订单', GOLD, ap(lt, L[3], 0.3)); g.restore();
    txt(g, '马斯克：Yikes', cx - 330 * Math.cos(tl), cy + 260 + 330 * Math.sin(tl), 24, RED, 'center', ap(lt, L[2] + 0.4) * s);
    txt(g, '木头姐：买入', cx + 330 * Math.cos(tl), cy + 260 - 330 * Math.sin(tl), 24, GOLD, 'center', ap(lt, L[3] + 0.4) * s);
  };
  D.signals = function (g, lt, L) {
    var C = [['1', '大客户', '最大客户占比 · 降还是升', BLUE], ['2', '借钱成本', '债券收益率 · 新借款利率', RED], ['3', '订单变收入', '每季度收入 vs 订单积压', GOLD], ['4', '旧 GPU', '旧卡出租率 · 租金走势', '#b48cff']];
    C.forEach(function (c, i) {
      var x = 1030 + (i % 2) * 400, y = 300 + Math.floor(i / 2) * 330, a = ap(lt, L[1 + i] - 0.05, 0.4);
      if (a <= 0) return; var k = 1 + 0.08 * (1 - eo((lt - L[1 + i]) / 0.3));
      g.save(); g.translate(x + 180, y + 140); g.scale(k, k); g.translate(-x - 180, -y - 140);
      card(g, x, y, 360, 280, c[3], a); gtxt(g, c[0], x + 60, y + 90, 64, c[3], 'center', a); txt(g, c[1], x + 110, y + 82, 40, INK, 'left', a, 900);
      txt(g, c[2], x + 180, y + 200, 22, DIM, 'center', a); g.restore();
    });
  };
  D.ifthen = function (g, lt, L) {
    var a = ap(lt, 0.1, 0.5) * (1 - ap(lt, L[4], 0.5) * 0.6), x0 = 1060, y0 = 640;
    glowDot(g, x0, y0, 12, INK, a); txt(g, '接下来', x0, y0 + 50, 24, DIM, 'center', a);
    var r = eo((lt - L[0] - 0.1) / 0.8); if (r > 0) { g.save(); g.globalAlpha *= a; g.strokeStyle = RED; g.lineWidth = 4; g.shadowColor = RED; g.shadowBlur = 14; g.beginPath(); g.moveTo(x0, y0);
      g.bezierCurveTo(x0 + 200, y0, x0 + 220, y0 + 190 * r, x0 + 380 * r, y0 + 190 * r); g.stroke(); g.restore();
      card(g, 1450, y0 + 120, 360, 140, RED, a * ap(lt, L[0] + 0.6)); txt(g, '利息涨得比收入快', 1630, y0 + 178, 26, INK, 'center', a * ap(lt, L[0] + 0.6)); txt(g, '压力越来越大', 1630, y0 + 226, 30, RED, 'center', a * ap(lt, L[1] + 0.3), 900); }
    var u = eo((lt - L[2] - 0.1) / 0.8); if (u > 0) { g.save(); g.globalAlpha *= a; g.strokeStyle = GOLD; g.lineWidth = 4; g.shadowColor = GOLD; g.shadowBlur = 14; g.beginPath(); g.moveTo(x0, y0);
      g.bezierCurveTo(x0 + 200, y0, x0 + 220, y0 - 190 * u, x0 + 380 * u, y0 - 190 * u); g.stroke(); g.restore();
      card(g, 1450, y0 - 260, 360, 140, GOLD, a * ap(lt, L[2] + 0.6)); txt(g, '订单按时兑现，利息占比降', 1630, y0 - 202, 24, INK, 'center', a * ap(lt, L[2] + 0.6)); txt(g, '另一个故事', 1630, y0 - 152, 30, GOLD, 'center', a * ap(lt, L[3] + 0.3), 900); }
    var d = ap(lt, L[4], 0.5); if (d > 0) { card(g, 560, 860, 800, 130, '#9aa3b2', d); txt(g, '信息整理，不构成投资建议', 960, 916, 34, INK, 'center', d, 900); txt(g, '数据截至 2026 年 10 月 16 日', 960, 962, 24, DIM, 'center', ap(lt, L[5])); }
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
  var NODES = [['矿', '挖矿起家', '2017 · 新泽西'], ['租', '出租 GPU', '43 个数据中心'], ['客', '三分之二靠微软', '2025 年收入'], ['债', '借了五百多亿', '债务 + 租约 · 2026.06']];
  function recap(g, sc, lt) {
    var xs = [420, 790, 1160, 1530], y = 600;
    g.save(); var w = 1240 * eo((lt - 0.2) / (sc.ls[3] + 0.6));
    g.strokeStyle = 'rgba(240,189,92,0.6)'; g.lineWidth = 2; g.shadowColor = '#f0bd5c'; g.shadowBlur = 10; g.beginPath(); g.moveTo(360, y); g.lineTo(360 + w, y); g.stroke(); g.shadowBlur = 0;
    NODES.forEach(function (n, k) {
      var p = cl((lt - sc.ls[k] - 0.1) / 0.5); if (p <= 0) return; var x = xs[k], col = k === 3 ? RED : GOLD;
      g.globalAlpha = p; g.fillStyle = col; g.shadowColor = col; g.shadowBlur = 16; g.beginPath(); g.arc(x, y, 9, 0, 6.29); g.fill(); g.shadowBlur = 0;
      g.strokeStyle = rgba(col, 0.8 * (1 - p)); g.beginPath(); g.arc(x, y, 9 + 40 * p, 0, 6.29); g.stroke();
      g.textAlign = 'center'; g.font = '900 96px ' + SERIF; g.fillStyle = k === 3 ? '#f6b5a8' : '#f6dfae'; g.shadowColor = rgba(col, 0.7); g.shadowBlur = 24; g.fillText(n[0], x, y - 44); g.shadowBlur = 0;
      g.font = '700 30px ' + SERIF; g.fillStyle = '#ece6da'; g.fillText(n[1], x, y + 62); g.font = '500 20px ' + MONO; g.fillStyle = 'rgba(200,190,170,0.8)'; g.fillText(n[2], x, y + 98);
    });
    var tp = E((lt - sc.ls[3] - 1.6) / 0.8);
    if (tp > 0) { g.globalAlpha = tp; g.font = '900 56px ' + SERIF; g.shadowColor = 'rgba(0,0,0,0.9)'; g.shadowBlur = 14;
      var s1 = '一千亿的订单，为什么还在', s2 = '亏钱', s3 = '？', w1 = g.measureText(s1).width, w2 = g.measureText(s2).width, w3 = g.measureText(s3).width, x0 = 960 - (w1 + w2 + w3) / 2;
      g.textAlign = 'left'; g.fillStyle = '#ece6da'; g.fillText(s1, x0, 860); g.fillStyle = RED; g.fillText(s2, x0 + w1, 860); g.fillStyle = '#ece6da'; g.fillText(s3, x0 + w1 + w2, 860); }
    g.restore();
  }
  function sources(g, sc, lt) {
    g.save(); g.textAlign = 'left';
    TL.src.forEach(function (s, k) {
      var p = E((lt - 0.2 - k * 0.1) / 0.4); if (p <= 0) return; var col = k < 6 ? 0 : 1, row = k % 6, x = 200 + col * 820, y = 250 + row * 104;
      g.globalAlpha = p; g.font = '700 28px ' + SERIF; g.fillStyle = '#ece6da'; g.fillText(s[0], x, y);
      g.font = '500 19px ' + MONO; g.fillStyle = 'rgba(190,195,205,0.75)'; g.fillText(s[1], x, y + 36);
      g.fillStyle = 'rgba(240,189,92,0.6)'; g.fillRect(x - 22, y - 22, 3, 60);
    });
    g.globalAlpha = E((lt - 1.2) / 0.5); g.textAlign = 'center'; g.font = '700 26px ' + SERIF; g.fillStyle = '#ece6da'; g.fillText('信息整理，不构成投资建议 · 数据截至 2026 年 10 月 16 日', 960, 930);
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
