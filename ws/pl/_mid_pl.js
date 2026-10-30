  // ---------- Planck props ----------
  var GREEN = '#8fd9a8', ORANGE = '#ff9a4a';
  var PH = new Image(); PH.src = window.PHOTO_URI || ''; window.__PH = PH;           // his portrait (optional)
  function wien(lam, T) { return Math.pow(lam, -5) * Math.exp(-14.388 / (lam * T)); }
  function photoCard(g, img, x, y, w, h, a, filt, col) {                                // gold-framed photo
    if (a <= 0 || !img.complete || !img.naturalWidth) return false; col = col || GOLD; g.save(); g.globalAlpha *= a;
    g.fillStyle = '#000'; g.shadowColor = 'rgba(0,0,0,0.8)'; g.shadowBlur = 30; g.fillRect(x - 8, y - 8, w + 16, h + 16); g.shadowBlur = 0;
    g.filter = filt || 'none'; g.drawImage(img, x, y, w, h); g.filter = 'none';
    g.strokeStyle = col; g.lineWidth = 4; g.shadowColor = col; g.shadowBlur = 14; g.strokeRect(x - 8, y - 8, w + 16, h + 16); g.restore(); return true;
  }
  function wl2rgb(nm) {                                                                  // visible wavelength -> [r,g,b] (nm 380..780)
    var r = 0, gg = 0, b = 0, f;
    if (nm >= 380 && nm < 440) { r = -(nm - 440) / 60; b = 1; } else if (nm < 490) { gg = (nm - 440) / 50; b = 1; } else if (nm < 510) { gg = 1; b = -(nm - 510) / 20; }
    else if (nm < 580) { r = (nm - 510) / 70; gg = 1; } else if (nm < 645) { r = 1; gg = -(nm - 645) / 65; } else if (nm <= 780) { r = 1; }
    f = nm < 420 ? 0.3 + 0.7 * (nm - 380) / 40 : nm > 700 ? 0.3 + 0.7 * (780 - nm) / 80 : 1; if (nm < 380 || nm > 780) f = 0.25;
    return [Math.round(255 * Math.pow(r * f, 0.8)), Math.round(255 * Math.pow(gg * f, 0.8)), Math.round(255 * Math.pow(b * f, 0.8))];
  }
  function strip(g, x, y, w, h, a, bright) {                                              // a continuous rainbow strip 400..700 nm
    if (a <= 0) return; g.save(); g.globalAlpha *= a;
    for (var i = 0; i < w; i += 2) { var c = wl2rgb(400 + 300 * i / w); g.fillStyle = 'rgb(' + c[0] + ',' + c[1] + ',' + c[2] + ')'; g.fillRect(x + i, y, 2.5, h); }
    g.globalAlpha *= 1 - (bright == null ? 0.0 : 1 - bright); g.restore();
  }
  function darkStrip(g, x, y, w, h, a) { if (a <= 0) return; g.save(); g.globalAlpha *= a; g.fillStyle = '#05070c'; g.fillRect(x, y, w, h); g.strokeStyle = 'rgba(170,185,215,0.5)'; g.lineWidth = 2; g.strokeRect(x, y, w, h); g.restore(); }
  function spLine(g, x, y, w, h, nm, lo, hi, col, a, wd) {                                // one bright emission line at wavelength nm on a strip spanning lo..hi
    if (a <= 0) return; var px = x + w * (nm - lo) / (hi - lo); g.save(); g.globalAlpha *= a; g.fillStyle = col; g.shadowColor = col; g.shadowBlur = 16; g.fillRect(px - (wd || 4) / 2, y + 3, wd || 4, h - 6); g.restore();
  }
  function drawFlame(g, x, y, s, col, a, lt) {                                            // a candle-like flame, base at (x,y)
    if (a <= 0) return; g.save(); g.globalAlpha *= a; var fl = 1 + 0.05 * Math.sin(lt * 9 + x), w = 34 * s, h = 120 * s * fl;
    var gr = g.createRadialGradient(x, y - h * 0.35, 2, x, y - h * 0.35, h * 0.9); gr.addColorStop(0, '#fffbe6'); gr.addColorStop(0.14, col); gr.addColorStop(1, rgba(col, 0));
    g.fillStyle = gr; g.shadowColor = col; g.shadowBlur = 30; g.beginPath(); g.moveTo(x, y - h); g.bezierCurveTo(x + w * 1.4, y - h * 0.45, x + w * 1.1, y, x, y); g.bezierCurveTo(x - w * 1.1, y, x - w * 1.4, y - h * 0.45, x, y - h); g.fill(); g.restore();
  }
  function burner(g, x, y, s, a) {                                                       // Bunsen burner: base, tube, collar
    if (a <= 0) return; g.save(); g.globalAlpha *= a; g.translate(x, y); g.scale(s, s);
    var gr = g.createLinearGradient(-30, 0, 30, 0); gr.addColorStop(0, '#6a727f'); gr.addColorStop(0.5, '#b4bcc8'); gr.addColorStop(1, '#5a6270');
    g.fillStyle = gr; g.fillRect(-14, -150, 28, 150); g.fillStyle = '#4a5260'; rr(g, -50, -12, 100, 18, 6); g.fill(); g.fillStyle = '#8a929e'; g.fillRect(-20, -92, 40, 18); g.fillStyle = '#2a303c'; g.fillRect(-7, -150, 14, 5); g.restore();
  }
  function sun(g, x, y, r, a, lt) {
    if (a <= 0) return; g.save(); g.globalAlpha *= a; var gl = g.createRadialGradient(x, y, r * 0.6, x, y, r * 3); gl.addColorStop(0, 'rgba(255,200,100,0.55)'); gl.addColorStop(1, 'rgba(255,160,60,0)');
    g.fillStyle = gl; g.beginPath(); g.arc(x, y, r * 3, 0, 6.29); g.fill(); var gr = g.createRadialGradient(x - r * 0.3, y - r * 0.3, 2, x, y, r); gr.addColorStop(0, '#fff6c8'); gr.addColorStop(0.6, '#ffc850'); gr.addColorStop(1, '#f08a28');
    g.fillStyle = gr; g.beginPath(); g.arc(x, y, r, 0, 6.29); g.fill();
    g.strokeStyle = 'rgba(255,200,100,0.6)'; g.lineWidth = 3; for (var i = 0; i < 14; i++) { var an = i / 14 * 6.283 + (lt || 0) * 0.15, r0 = r * 1.2, r1 = r * (1.45 + 0.12 * Math.sin(i * 3 + (lt || 0) * 3)); g.beginPath(); g.moveTo(x + Math.cos(an) * r0, y + Math.sin(an) * r0); g.lineTo(x + Math.cos(an) * r1, y + Math.sin(an) * r1); g.stroke(); }
    g.restore();
  }
  function prism(g, x, y, s, a) {                                                        // a glass triangle, centre (x,y)
    if (a <= 0) return; g.save(); g.globalAlpha *= a; var h = 120 * s;
    g.beginPath(); g.moveTo(x, y - h * 0.6); g.lineTo(x + h * 0.7, y + h * 0.45); g.lineTo(x - h * 0.7, y + h * 0.45); g.closePath();
    var gr = g.createLinearGradient(x - h * 0.7, y, x + h * 0.7, y); gr.addColorStop(0, 'rgba(180,215,255,0.35)'); gr.addColorStop(1, 'rgba(120,170,255,0.15)'); g.fillStyle = gr; g.fill();
    g.strokeStyle = 'rgba(210,230,255,0.9)'; g.lineWidth = 3; g.shadowColor = '#9cc4ff'; g.shadowBlur = 14; g.stroke(); g.restore();
  }
  function medal(g, x, y, r, a, label) {
    if (a <= 0) return; g.save(); g.globalAlpha *= a; var gr = g.createRadialGradient(x - r * 0.3, y - r * 0.3, 2, x, y, r); gr.addColorStop(0, '#fff0c0'); gr.addColorStop(0.6, '#d9a040'); gr.addColorStop(1, '#8a5c18');
    g.fillStyle = gr; g.shadowColor = GOLD; g.shadowBlur = 20; g.beginPath(); g.arc(x, y, r, 0, 6.29); g.fill(); g.shadowBlur = 0;
    g.strokeStyle = 'rgba(110,70,20,0.7)'; g.lineWidth = 3; g.beginPath(); g.arc(x, y, r * 0.8, 0, 6.29); g.stroke();
    g.font = '900 ' + Math.round(r * 0.5) + 'px ' + SERIF; g.fillStyle = '#6a4410'; g.textAlign = 'center'; g.fillText(label, x, y + r * 0.18); g.restore();
  }
  function planck(lam, T) { return Math.pow(lam, -5) / (Math.exp(14.388 / (lam * T)) - 1); }          // lam in micrometres, T in kK (relative units)
  var PK = planck(0.58, 5);
  function bbPlot(g, x0, yB, w, h, a, lt, o) {                                           // axes + curves; o = {T:[..], cols:[..], draw:p, rj:p, dots:p}
    if (a <= 0) return; var lmin = 0.2, lmax = 3.0; g.save(); g.globalAlpha *= a;
    g.strokeStyle = 'rgba(200,210,230,0.65)'; g.lineWidth = 3; g.beginPath(); g.moveTo(x0, yB - h - 20); g.lineTo(x0, yB); g.lineTo(x0 + w, yB); g.stroke();
    for (var i = 0; i < w; i += 3) { var c = wl2rgb(400 + 300 * ((i / w * (lmax - lmin) + lmin) * 1000 - 400) / 300); if ((i / w * (lmax - lmin) + lmin) > 0.4 && (i / w * (lmax - lmin) + lmin) < 0.7) { g.fillStyle = 'rgb(' + c[0] + ',' + c[1] + ',' + c[2] + ')'; g.fillRect(x0 + i, yB + 6, 3.5, 10); } }
    g.restore(); txt(g, '波长 →', x0 + w - 40, yB + 50, 22, DIM, 'center', a, 700); txt(g, '光的强度', x0 + 8, yB - h - 34, 22, DIM, 'left', a, 700);
    var X = function (l) { return x0 + (l - lmin) / (lmax - lmin) * w; }, Y = function (v) { return yB - v / PK * h * 0.92; };
    (o.T || []).forEach(function (T, k) { var p = o.draw == null ? 1 : (Array.isArray(o.draw) ? o.draw[k] : o.draw); if (p <= 0) return; g.save(); g.globalAlpha *= a; g.strokeStyle = o.cols[k]; g.lineWidth = 5; g.shadowColor = o.cols[k]; g.shadowBlur = 12; g.beginPath();
      var n = Math.floor(240 * p); for (var j = 0; j <= n; j++) { var l = lmin + (lmax - lmin) * j / 240, px = X(l), py = Math.max(yB - h - 10, Y(planck(l, T))); if (j) g.lineTo(px, py); else g.moveTo(px, py); } g.stroke(); g.restore(); });
    if (o.wien > 0) { g.save(); g.globalAlpha *= a; var WC = o.wienCol || BLUE; g.strokeStyle = WC; g.lineWidth = 5; g.setLineDash([12, 9]); g.shadowColor = WC; g.shadowBlur = 10; g.beginPath(); var nw = Math.floor(240 * o.wien);
      for (var jw = 0; jw <= nw; jw++) { var lw = lmin + (lmax - lmin) * jw / 240, pyw = Math.max(yB - h - 10, Y(wien(lw, o.wienT || 5))); if (jw) g.lineTo(X(lw), pyw); else g.moveTo(X(lw), pyw); } g.stroke(); g.restore(); }
    if (o.zoom > 0) { var zx = x0 + 250, zy = yB - h - 18, zw = 340, zh = 215, T5 = o.wienT || 5; g.save(); g.globalAlpha *= a * o.zoom; card(g, zx, zy, zw, zh, GOLD, 1); g.beginPath(); g.rect(zx + 6, zy + 6, zw - 12, zh - 12); g.clip();
      var l0 = 2.2, l1 = 3.0, ym = planck(l0, T5) * 1.06, ZX = function (l) { return zx + 22 + (l - l0) / (l1 - l0) * (zw - 44); }, ZY = function (v) { return zy + zh - 22 - v / ym * (zh - 62); };
      g.strokeStyle = WC; g.lineWidth = 4; g.setLineDash([10, 7]); g.beginPath(); for (var q = 0; q <= 40; q++) { var lq = l0 + (l1 - l0) * q / 40; if (q) g.lineTo(ZX(lq), ZY(wien(lq, T5))); else g.moveTo(ZX(lq), ZY(wien(lq, T5))); } g.stroke(); g.setLineDash([]);
      g.strokeStyle = GOLD; g.lineWidth = 3; g.globalAlpha *= 0.5; g.beginPath(); for (var q2 = 0; q2 <= 40; q2++) { var lq2 = l0 + (l1 - l0) * q2 / 40; if (q2) g.lineTo(ZX(lq2), ZY(planck(lq2, T5))); else g.moveTo(ZX(lq2), ZY(planck(lq2, T5))); } g.stroke(); g.globalAlpha /= 0.5;
      for (var d2 = 0; d2 < 8; d2++) { var ld = l0 + 0.05 + d2 * 0.108; glowDot(g, ZX(ld), ZY(planck(ld, T5)), 5, '#ffffff', 0.95); }
      g.restore(); txt(g, '放大 · 长波一头', zx + zw / 2, zy - 12, 22, DIM, 'center', a * o.zoom, 700); }
    if (o.dots > 0) { g.save(); g.globalAlpha *= a * o.dots; var T0 = o.dotT || 5; for (var d = 0; d < 26; d++) { var l = 0.26 + d * 0.108; if (l < (o.dotsFrom || 0)) continue; var jit = (rnd(d * 3.1) - 0.5) * (1 - (o.tight || 0)) * 0.22 * PK; var v = planck(l, T0) + jit * Math.min(1, planck(l, T0) / PK + 0.15);
      glowDot(g, X(l), Math.max(yB - h - 10, Y(v)), 4.5, '#ffffff', 0.9); } g.restore(); }
    if (o.rj > 0) { g.save(); g.globalAlpha *= a; g.strokeStyle = RED; g.lineWidth = 5; g.setLineDash([12, 9]); g.shadowColor = RED; g.shadowBlur = 12; g.beginPath(); var n2 = Math.floor(240 * o.rj), T1 = o.rjT || 5;
      var topY = yB - h - 10, out = false; for (var j2 = 0; j2 <= n2; j2++) { var l2 = lmin + (lmax - lmin) * j2 / 240, v2 = T1 * Math.pow(l2, -4) / 14.388; var py2 = Y(v2); if (py2 < topY) { out = true; g.lineTo(X(l2), topY); break; } if (j2) g.lineTo(X(l2), py2); else g.moveTo(X(l2), py2); } g.stroke();
      if (out) { g.setLineDash([]); g.fillStyle = RED; var ax = X(lmin + (lmax - lmin) * (j2 - 1) / 240); g.beginPath(); g.moveTo(ax, topY - 24); g.lineTo(ax - 12, topY); g.lineTo(ax + 12, topY); g.closePath(); g.fill(); } g.restore(); }
    return { X: X, Y: Y };
  }

  // ---------- small props for Planck ----------
  function calPage(g, x, y, w, h, mon, day, wk, a) {                                      // a tear-off calendar page, centre (x, y)
    if (a <= 0) return; g.save(); g.globalAlpha *= a; g.translate(x, y); g.shadowColor = 'rgba(0,0,0,0.6)'; g.shadowBlur = 24;
    g.fillStyle = '#e9e2d0'; rr(g, -w / 2, -h / 2, w, h, 14); g.fill(); g.shadowBlur = 0; g.fillStyle = '#a8402c'; g.beginPath(); g.moveTo(-w / 2 + 14, -h / 2); g.arcTo(w / 2, -h / 2, w / 2, -h / 2 + 90, 14); g.lineTo(w / 2, -h / 2 + 90); g.lineTo(-w / 2, -h / 2 + 90); g.lineTo(-w / 2, -h / 2 + 14); g.arcTo(-w / 2, -h / 2, -w / 2 + 14, -h / 2, 14); g.fill();
    g.textAlign = 'center'; g.fillStyle = '#fff4e0'; g.font = '900 52px ' + SERIF; g.fillText(mon, 0, -h / 2 + 62); g.fillStyle = '#2a2018'; g.font = '900 ' + Math.round(h * 0.42) + 'px ' + SERIF; g.fillText(day, 0, h * 0.2); g.font = '700 38px ' + SERIF; g.fillStyle = '#a8402c'; g.fillText(wk, 0, h / 2 - 32); g.restore();
  }
  function postcardP(g, x, y, w, h, a, rot, mark) {                                       // a postcard: cream card, address lines, small gold curve, stamp
    if (a <= 0) return; g.save(); g.globalAlpha *= a; g.translate(x, y); g.rotate(rot || 0); g.shadowColor = 'rgba(0,0,0,0.6)'; g.shadowBlur = 20;
    g.fillStyle = '#e8dfc8'; g.fillRect(-w / 2, -h / 2, w, h); g.shadowBlur = 0; g.strokeStyle = 'rgba(60,45,30,0.5)'; g.lineWidth = 2; g.beginPath(); g.moveTo(w * 0.06, -h / 2 + 16); g.lineTo(w * 0.06, h / 2 - 16); g.stroke();
    g.fillStyle = 'rgba(60,45,30,0.55)'; for (var i = 0; i < 3; i++) g.fillRect(w * 0.12, h * 0.05 + i * 22, w * (0.28 - i * 0.04), 3);
    g.strokeStyle = '#8a5c18'; g.lineWidth = 4; g.beginPath(); for (var k = 0; k <= 40; k++) { var u = k / 40, px = -w / 2 + 22 + u * (w * 0.5 - 30), py = h * 0.28 - Math.sin(u * 3.2) * Math.exp(-u * 1.6) * h * 0.5; if (k) g.lineTo(px, py); else g.moveTo(px, py); } g.stroke();
    g.fillStyle = '#c85a3a'; g.fillRect(w / 2 - 52, -h / 2 + 12, 40, 46); g.strokeStyle = '#7a2c18'; g.lineWidth = 2; g.strokeRect(w / 2 - 47, -h / 2 + 17, 30, 36); if (mark) { g.fillStyle = 'rgba(90,60,40,0.8)'; g.font = '700 20px ' + MONO; g.textAlign = 'center'; g.fillText(mark, 0, -h / 2 + 34); } g.restore();
  }
  function keysP(g, x, y, w, h, a, lt, hot) {                                             // a row of piano keys; `hot` keys glow while playing
    if (a <= 0) return; g.save(); g.globalAlpha *= a; var n = 8, kw = w / n;
    for (var i = 0; i < n; i++) { var on = hot && Math.sin(lt * 3 + i * 1.7) > 0.55; g.fillStyle = on ? '#ffe9b0' : '#e6e2d8'; g.shadowColor = on ? GOLD : 'transparent'; g.shadowBlur = on ? 16 : 0; g.fillRect(x + i * kw + 2, y, kw - 4, h); }
    g.shadowBlur = 0; g.fillStyle = '#16181f'; [0, 1, 3, 4, 5].forEach(function (k) { g.fillRect(x + (k + 1) * kw - kw * 0.28, y, kw * 0.56, h * 0.6); }); g.restore();
  }
  function stairs(g, x, y, w, h, n, a, p, col) {                                          // a staircase (n steps), drawn up to progress p; base-left (x, y)
    if (a <= 0 || p <= 0) return; g.save(); g.globalAlpha *= a; g.strokeStyle = col || GOLD; g.lineWidth = 6; g.lineJoin = 'round'; g.shadowColor = col || GOLD; g.shadowBlur = 14; g.beginPath(); var sw = w / n, sh = h / n, tot = n * 2, k = Math.floor(tot * p + 0.0001);
    g.moveTo(x, y); for (var i = 0; i < n; i++) { if (i * 2 >= k) break; g.lineTo(x + i * sw + sw, y - i * sh); if (i * 2 + 1 >= k) break; g.lineTo(x + i * sw + sw, y - (i + 1) * sh); } g.stroke(); g.restore();
  }
  function cyl(g, x, y, w, h, a, col) {                                                   // a metal cylinder (the old kilogram), base-centre (x, y)
    if (a <= 0) return; g.save(); g.globalAlpha *= a; var gr = g.createLinearGradient(x - w / 2, 0, x + w / 2, 0); gr.addColorStop(0, '#6e7886'); gr.addColorStop(0.45, '#d6dce6'); gr.addColorStop(1, '#5a6472');
    g.fillStyle = gr; g.shadowColor = col || 'rgba(160,190,230,0.5)'; g.shadowBlur = 18; g.fillRect(x - w / 2, y - h, w, h); g.shadowBlur = 0; g.fillStyle = '#e4eaf2'; g.beginPath(); g.ellipse(x, y - h, w / 2, w * 0.14, 0, 0, 6.29); g.fill();
    g.fillStyle = '#4a5462'; g.beginPath(); g.ellipse(x, y, w / 2, w * 0.14, 0, 0, Math.PI); g.fill(); g.restore();
  }
  function jar(g, x, y, w, h, a) {                                                        // a glass bell jar outline
    if (a <= 0) return; g.save(); g.globalAlpha *= a; g.strokeStyle = 'rgba(190,215,255,0.8)'; g.lineWidth = 4; g.shadowColor = '#9cc4ff'; g.shadowBlur = 12; g.beginPath(); g.moveTo(x - w / 2, y); g.lineTo(x - w / 2, y - h + w / 2); g.arc(x, y - h + w / 2, w / 2, Math.PI, 0); g.lineTo(x + w / 2, y); g.stroke(); g.restore();
  }
  function scale2(g, x, y, tilt, a, wt) {                                                 // a balance scale; tilt in radians; wt = label on the right pan
    if (a <= 0) return; g.save(); g.globalAlpha *= a; g.strokeStyle = 'rgba(220,226,238,0.9)'; g.lineWidth = 6; g.lineCap = 'round'; g.beginPath(); g.moveTo(x, y + 170); g.lineTo(x, y - 30); g.stroke(); g.beginPath(); g.moveTo(x - 60, y + 172); g.lineTo(x + 60, y + 172); g.stroke();
    g.save(); g.translate(x, y - 30); g.rotate(tilt); g.beginPath(); g.moveTo(-150, 0); g.lineTo(150, 0); g.stroke();
    [[-150, 0], [150, 1]].forEach(function (p) { g.save(); g.translate(p[0], 0); g.rotate(-tilt); g.lineWidth = 3; g.beginPath(); g.moveTo(0, 0); g.lineTo(-40, 90); g.moveTo(0, 0); g.lineTo(40, 90); g.stroke(); g.fillStyle = 'rgba(200,210,230,0.8)'; g.fillRect(-52, 90, 104, 10);
      if (wt === '') { g.fillStyle = 'rgba(200,210,230,0.45)'; g.fillRect(-22, 62, 44, 28); }
      else if (p[1]) { g.fillStyle = GOLD; g.shadowColor = GOLD; g.shadowBlur = 16; g.fillRect(-24, 58, 48, 32); g.shadowBlur = 0; g.fillStyle = '#4a3208'; g.font = '900 28px ' + SERIF; g.textAlign = 'center'; g.fillText(wt || 'h', 0, 83); }
      else { g.fillStyle = '#d6dce6'; g.fillRect(-22, 52, 44, 38); g.fillStyle = '#4a5462'; g.font = '900 22px ' + SERIF; g.textAlign = 'center'; g.fillText('1 kg', 0, 79); } g.restore(); });
    g.restore(); g.restore();
  }
  function flameFx(g, x, y, s, lt, a) {                                                   // a flickering fire on top of a roof / paper
    if (a <= 0) return; for (var i = 0; i < 5; i++) { var fx = x + (i - 2) * 26 * s, fy = y - 6 * Math.sin(lt * 7 + i * 2.1) * s; drawFlame(g, fx, fy, s * (0.55 + 0.25 * rnd(i + 4)), i % 2 ? '#ff9a3a' : '#ff6a2a', a, lt + i); }
  }

  // ---------- scenes ----------
  var D = {};
  // hook: Sunday, 7 Oct 1900. A visit, a curve that doesn't fit, a postcard
  D.h0 = function (g, lt, L) {
    var c0 = ap(lt, L[0], 0.6) * (1 - ap(lt, L[1], 0.5)); if (c0 > 0) { calPage(g, 1450, 640, 300, 360, '10 月', '7', '星期天', c0); chip(g, 1450, 300, '1900 · 柏林', BLUE, c0, 30); }
    var pp = ap(lt, L[1], 0.6) * (1 - ap(lt, L[3], 0.5)); if (pp > 0) { avatar(g, 1290, 640, 80, GOLD, pp); avatar(g, 1610, 640, 80, BLUE, pp); chip(g, 1290, 770, '主人', GOLD, pp, 26); chip(g, 1610, 770, '来客 · 实验家', BLUE, pp, 26); chip(g, 1450, 300, '做客', INK, pp, 28);
      var sp = ap(lt, L[2], 0.5); if (sp > 0) { g.save(); g.globalAlpha *= sp * pp; card(g, 1500, 470, 200, 80, BLUE, 1); mono(g, '数据', 1600, 522, 30, BLUE, 'center', 1); g.restore(); } }
    var pl = ap(lt, L[3], 0.7) * (1 - ap(lt, L[5], 0.5)) + ap(lt, L[6], 0.7) * (1 - ap(lt, L[7], 0.5)); pl = Math.min(1, pl); if (pl > 0) {
      var gold = ap(lt, L[6], 0.5);
      var PP = bbPlot(g, 1150, 940, 600, 380, pl, lt, { T: gold > 0.01 ? [5] : [], cols: [GOLD], draw: gold > 0.01 ? eo((lt - L[6]) / 1.8) : 0, wien: gold > 0.01 ? 0 : eo((lt - L[3]) / 1.2), wienT: 5, dots: ap(lt, L[3], 0.8), dotT: 5, tight: 1, dotsFrom: 1.5, zoom: gold > 0.01 ? 0 : ap(lt, L[4], 0.6) });
      chip(g, 1450, 300, gold > 0.01 ? '新公式 · 两头都对上' : '长波一头 · 对不上', gold > 0.01 ? GOLD : RED, pl, 28);
      if (gold < 0.01 && ap(lt, L[4], 0.5) > 0) { var xa = PP.X(1.9), ya = PP.Y(planck(1.9, 5)); chip(g, xa + 130, ya - 60, '已有的公式', BLUE, ap(lt, L[4], 0.5) * pl, 24); } }
    var sh = ap(lt, L[5], 0.6) * (1 - ap(lt, L[6], 0.4)); if (sh > 0) { doc(g, 1450, 620, 300, 380, sh, -0.04, '', 3); avatar(g, 1300, 880, 60, GOLD, sh); chip(g, 1450, 300, '客人走后 · 坐下来算', GOLD, sh, 28); }
    var pc = ap(lt, L[7], 0.6) * (1 - ap(lt, L[8], 0.5)); if (pc > 0) { var u = eo((lt - L[7]) / 1.6); postcardP(g, 1250 + 330 * u, 640 - 40 * Math.sin(u * 3.14), 330, 210, pc, -0.12 + 0.2 * u, '1900'); avatar(g, 1650, 800, 60, BLUE, pc * u); chip(g, 1450, 300, '明信片 · 寄给鲁本斯', GOLD, pc, 28); }
    var fp = ap(lt, L[8], 0.7) * (1 - ap(lt, L[9], 0.4)); if (fp > 0) { g.save(); g.globalAlpha *= fp; var gr = g.createRadialGradient(1450, 620, 10, 1450, 620, 330); gr.addColorStop(0, 'rgba(255,214,140,0.35)'); gr.addColorStop(1, 'rgba(255,214,140,0)'); g.fillStyle = gr; g.fillRect(1100, 300, 700, 700); g.restore();
      card(g, 1250, 480, 400, 280, GOLD, fp); gtxt(g, '量子时代', 1450, 600, 62, GOLD, 'center', fp); txt(g, '第 一 页', 1450, 690, 40, INK, 'center', fp, 700); }
    var nm = ap(lt, L[9], 0.7); if (nm > 0) { gtxt(g, '普朗克', 1450, 640, 120, '#ffe7b0', 'center', nm); mono(g, '1858 – 1947', 1450, 720, 34, GOLD, 'center', nm); }
  };
  // 1858: Kiel; family of professors; piano or physics
  D.kiel = function (g, lt, L) {
    var k0 = ap(lt, L[0], 0.6); chip(g, 1450, 300, '基尔 · 1858', BLUE, k0 * (1 - ap(lt, L[3], 0.5)), 30);
    var hs = k0 * (1 - ap(lt, L[2], 0.6)); if (hs > 0) house(g, 1450, 640, 2.4, hs);
    var fam = ap(lt, L[1], 0.6) * (1 - ap(lt, L[2], 0.6)); if (fam > 0) { chip(g, 1290, 840, '祖辈 · 神学教授', INK, fam, 24); chip(g, 1610, 840, '父亲 · 法学教授', INK, fam, 24); }
    var ky = ap(lt, L[2], 0.6) * (1 - ap(lt, L[3], 0.5)); if (ky > 0) { keysP(g, 1230, 520, 440, 190, ky, lt, true); chip(g, 1450, 780, '钢琴 · 管风琴', GOLD, ky, 28); }
    var ch = ap(lt, L[3], 0.6); if (ch > 0) { var pick = ap(lt, L[4], 0.6);
      card(g, 1180, 480, 240, 260, rgbDim(pick), ch); txt(g, '音乐', 1300, 640, 54, pick > 0.5 ? DIM : INK, 'center', ch, 900);
      card(g, 1480, 480, 240, 260, GOLD, ch); txt(g, '物理', 1600, 640, 54, pick > 0.01 ? '#ffe7b0' : INK, 'center', ch, 900);
      txt(g, '？', 1450, 630, 60, GOLD, 'center', ch * (1 - pick), 900);
      if (pick > 0) { g.save(); g.globalAlpha *= pick; g.strokeStyle = GOLD; g.lineWidth = 6; g.shadowColor = GOLD; g.shadowBlur = 24; rr(g, 1472, 472, 256, 276, 18); g.stroke(); g.restore(); chip(g, 1450, 830, '选了物理', GOLD, pick, 32); } }
  };
  function rgbDim(p) { return p > 0.5 ? '#6a7080' : BLUE; }
  // Munich: "physics is nearly finished" — Berlin: Helmholtz, Kirchhoff — the chair
  D.jolly = function (g, lt, L) {
    var m = ap(lt, L[0], 0.6) * (1 - ap(lt, L[3], 0.4)); if (m > 0) { chip(g, 1450, 300, '慕尼黑', BLUE, m, 30); avatar(g, 1300, 640, 84, '#9aa8c8', m); chip(g, 1300, 770, '约利 · 教授', INK, m, 24);
      var bb = ap(lt, L[1], 0.6); if (bb > 0) { card(g, 1380, 420, 340, 110, '#9aa8c8', bb * m); txt(g, '差不多做完了', 1550, 492, 38, INK, 'center', bb * m, 900); }
      var cr = ap(lt, L[2], 0.6); if (cr > 0) { g.save(); g.globalAlpha *= cr * m; g.fillStyle = '#2b3446'; g.fillRect(1400, 580, 320, 220); g.strokeStyle = 'rgba(190,200,220,0.8)'; g.lineWidth = 3; g.strokeRect(1400, 580, 320, 220);
        g.strokeStyle = RED; g.lineWidth = 3; [[1450, 620, 1480, 690], [1580, 650, 1560, 740], [1660, 600, 1630, 680]].forEach(function (c) { g.beginPath(); g.moveTo(c[0], c[1]); g.lineTo((c[0] + c[2]) / 2 + 10, (c[1] + c[3]) / 2); g.lineTo(c[2], c[3]); g.stroke(); }); g.restore(); chip(g, 1560, 850, '剩下的 · 补补漏洞', DIM, cr * m, 24); }
    }
    var fnd = ap(lt, L[3], 0.7) * (1 - ap(lt, L[5], 0.5)); if (fnd > 0) { g.save(); g.globalAlpha *= fnd; card(g, 1180, 400, 540, 420, GOLD, 1); avatar(g, 1450, 560, 80, GOLD, 1);
      g.fillStyle = 'rgba(190,175,150,0.85)'; for (var r = 0; r < 3; r++) for (var c = 0; c < 4; c++) g.fillRect(1230 + c * 120 + (r % 2) * 30, 690 + r * 34, 108, 28); g.restore(); chip(g, 1450, 300, '想弄清楚 · 已有的基础', GOLD, fnd, 28); }
    var br = ap(lt, L[5], 0.7); if (br > 0) { chip(g, 1450, 300, '柏林', BLUE, br * (1 - ap(lt, L[7], 0.5)), 30);
      var lec = br * (1 - ap(lt, L[6], 0.5)); if (lec > 0) { avatar(g, 1290, 600, 70, '#9aa8c8', lec); avatar(g, 1610, 600, 70, '#9aa8c8', lec); chip(g, 1290, 720, '亥姆霍兹', INK, lec, 24); chip(g, 1610, 720, '基尔霍夫', GOLD, lec, 24); }
      var th = ap(lt, L[6], 0.6) * (1 - ap(lt, L[7], 0.5)); if (th > 0) { gtxt(g, '热力学', 1450, 640, 100, GOLD, 'center', th); }
      var chr = ap(lt, L[7], 0.6); if (chr > 0) { g.save(); g.globalAlpha *= chr; g.fillStyle = '#3a2f20'; rr(g, 1380, 560, 140, 20, 6); g.fill(); g.fillRect(1390, 460, 20, 110); g.fillRect(1390, 580, 14, 120); g.fillRect(1500, 580, 14, 120); g.restore();
        var sit = ap(lt, L[8], 0.8); txt(g, '基尔霍夫 · 的位置', 1450, 780, 30, DIM, 'center', chr * (1 - sit), 700); avatar(g, 1470, 500, 60, GOLD, sit); chip(g, 1450, 850, '接位置的，是这个学生', GOLD, sit, 28); } }
  };
  // the curve Kirchhoff left: a mountain; Wien matches the short side only
  D.curve = function (g, lt, L) {
    var wi = ap(lt, L[7], 0.5);
    var hd = 1 - ap(lt, L[7], 0.6); var PP = bbPlot(g, 1150, 940, 600, 380, ap(lt, L[1], 0.7), lt, { T: [4, 5], cols: ['#f0bd5c', '#86b6ff'], draw: [ap(lt, L[3], 0.6) * eo((lt - L[3]) / 1.8) * hd, ap(lt, L[6], 0.6) * eo((lt - L[6]) / 1.2)], dots: ap(lt, L[2], 0.8) * hd, dotT: 4, tight: ap(lt, L[2], 1.6), wien: wi > 0 ? eo((lt - L[7]) / 1.2) : 0, wienT: 5, wienCol: GOLD, zoom: ap(lt, L[9], 0.6) });
    chip(g, 1450, 300, '黑体曲线', BLUE, ap(lt, L[0], 0.5) * (1 - ap(lt, L[7], 0.5)), 30);
    chip(g, 1450, 360, '实验家 · 越量越准', GOLD, ap(lt, L[2], 0.5) * (1 - ap(lt, L[3], 0.4)), 26);
    var pk = ap(lt, L[4], 0.5) * (1 - ap(lt, L[7], 0.5)); if (pk > 0 && PP) { var xp = PP.X(0.72), yp = PP.Y(planck(0.72, 4)); glowDot(g, xp, yp, 9, '#fff6d8', pk); chip(g, xp + 10, yp - 50, '峰', GOLD, pk, 26); chip(g, 1360, 700, '短波一头低', DIM, ap(lt, L[4], 0.5) * (1 - ap(lt, L[5], 0.4)), 24); }
    chip(g, 1650, 700, '长波一头落下', DIM, ap(lt, L[5], 0.5) * (1 - ap(lt, L[6], 0.4)), 24);
    chip(g, 1450, 360, '温度越高 · 峰越往蓝移', BLUE, ap(lt, L[6], 0.5) * (1 - ap(lt, L[7], 0.5)), 26);
    if (wi > 0) { g.save(); g.globalAlpha *= wi; chip(g, 1450, 300, '维恩 · 的公式', GOLD, 1, 30); g.restore(); }
    var sh = ap(lt, L[8], 0.5); if (sh > 0 && PP) { chip(g, 1250, 800, '短波 · 对得很好', GREEN, sh * (1 - ap(lt, L[9], 0.4)), 24); }
    var lg = ap(lt, L[9], 0.6); if (lg > 0 && PP) { chip(g, 1450, 360, '长波 · 越来越偏', RED, lg, 28); }
  };
  // Rubens measures the long-wave end; Planck "patches" a formula that fits both sides; the October report
  D.postcard = function (g, lt, L) {
    var pl = ap(lt, L[0], 0.6); var gold = ap(lt, L[4], 0.5);
    var PP = bbPlot(g, 1150, 940, 600, 380, pl * (1 - ap(lt, L[9], 0.5)), lt, { T: gold > 0.01 ? [5] : [], cols: [GOLD], draw: gold > 0.01 ? eo((lt - L[4]) / 1.6) : 0, wien: eo((lt - L[0]) / 1.0) * (1 - ap(lt, L[4], 0.5) * 0.35), wienT: 5, dots: ap(lt, L[1], 0.8), dotT: 5, tight: 1, dotsFrom: 1.5, zoom: ap(lt, L[2], 0.6) * (1 - ap(lt, L[3], 0.5)) });
    chip(g, 1450, 300, '鲁本斯 · 长波', BLUE, ap(lt, L[0], 0.5) * (1 - ap(lt, L[3], 0.4)), 30);
    chip(g, 1450, 360, '远红外 · 库尔鲍姆', DIM, ap(lt, L[1], 0.5) * (1 - ap(lt, L[3], 0.4)), 24);
    chip(g, 1450, 420, '和维恩 · 对不上', RED, ap(lt, L[2], 0.5) * (1 - ap(lt, L[3], 0.4)), 26);
    chip(g, 1450, 300, '10 月 7 日 · 那晚', GOLD, ap(lt, L[3], 0.5) * (1 - ap(lt, L[6], 0.4)), 30);
    if (ap(lt, L[4], 0.5) > 0) chip(g, 1450, 360, '新公式 · 两头都对上', GOLD, ap(lt, L[4], 0.5) * (1 - ap(lt, L[6], 0.4)), 26);
    var ck = ap(lt, L[6], 0.6) * (1 - ap(lt, L[8], 0.5)); if (ck > 0) { avatar(g, 1450, 560, 90, BLUE, ck); chip(g, 1450, 300, '几天后 · 鲁本斯回话', BLUE, ck, 28);
      var c2 = ap(lt, L[7], 0.5); if (c2 > 0) { g.save(); g.globalAlpha *= ck; check(g, 1450, 760, true, GREEN, c2); gtxt(g, '全部吻合', 1450, 840, 50, GREEN, 'center', c2); g.restore(); } }
    var rp = ap(lt, L[8], 0.6) * (1 - ap(lt, L[9], 0.4)); if (rp > 0) { chip(g, 1450, 300, '德国物理学会 · 10 月', GOLD, rp, 28);
      g.save(); g.globalAlpha *= rp; g.fillStyle = '#2a303c'; g.fillRect(1300, 700, 300, 120); g.fillStyle = '#4a5260'; g.fillRect(1280, 690, 340, 16); avatar(g, 1450, 560, 80, GOLD, 1); g.restore(); txt(g, '报告', 1450, 770, 40, INK, 'center', rp, 900); }
    var qq = ap(lt, L[9], 0.6); if (qq > 0) { chip(g, 1450, 300, '只是“凑”出来的', RED, qq * (1 - ap(lt, L[10], 0.5)), 30); var wq = ap(lt, L[10], 0.6); gtxt(g, '为什么对？', 1450, 640, 100, GOLD, 'center', wq); gtxt(g, '？', 1450, 520, 170, 'rgba(255,230,160,0.9)', 'center', qq * (0.7 + 0.3 * Math.sin(lt * 3)) * (1 - wq * 0.3)); }
  };
  // desperate weeks: old methods fail; Boltzmann's counting; energy in portions; E = h nu; h is tiny; 14 Dec
  D.quantum = function (g, lt, L) {
    var fl = ap(lt, L[1], 0.6) * (1 - ap(lt, L[3], 0.5)); if (fl > 0) { chip(g, 1450, 300, '最紧张的日子', GOLD, fl, 30); for (var i = 0; i < 3; i++) { var p = ap(lt, L[2] + i * 0.4, 0.5); doc(g, 1260 + i * 190, 620 + (i % 2) * 24, 170, 220, fl * (0.45 + 0.4 * p), -0.08 + i * 0.07, '', i + 1); if (p > 0) { g.save(); g.globalAlpha *= fl * p; g.strokeStyle = RED; g.lineWidth = 7; g.beginPath(); g.moveTo(1230 + i * 190, 560); g.lineTo(1290 + i * 190, 690); g.moveTo(1290 + i * 190, 560); g.lineTo(1230 + i * 190, 690); g.stroke(); g.restore(); } }
      chip(g, 1450, 840, '熟悉的办法 · 都不行', RED, ap(lt, L[2], 0.5) * fl, 26); }
    var bz = ap(lt, L[3], 0.6) * (1 - ap(lt, L[5], 0.5)); if (bz > 0) { chip(g, 1450, 300, '玻尔兹曼 · 数一数', BLUE, bz, 30); g.save(); g.globalAlpha *= bz;
      for (var b = 0; b < 4; b++) { g.strokeStyle = 'rgba(180,195,225,0.7)'; g.lineWidth = 3; g.strokeRect(1210 + b * 130, 540, 110, 190); var nn = [5, 2, 6, 1][b]; for (var c = 0; c < nn; c++) glowDot(g, 1236 + b * 130 + (c % 3) * 30, 700 - Math.floor(c / 3) * 34, 8, c % 2 ? GOLD : '#9cc4ff', 1); } g.restore(); }
    var sl = ap(lt, L[5], 0.6) * (1 - ap(lt, L[7], 0.5)); if (sl > 0) { chip(g, 1450, 300, '奇怪的假设', RED, sl, 30);
      var smooth = 1 - ap(lt, L[6], 0.8); g.save(); g.globalAlpha *= sl * smooth; g.strokeStyle = BLUE; g.lineWidth = 6; g.shadowColor = BLUE; g.shadowBlur = 12; g.beginPath(); g.moveTo(1230, 800); g.lineTo(1670, 480); g.stroke(); g.restore();
      stairs(g, 1230, 800, 440, 320, 5, sl, eo((lt - L[6]) / 1.4), GOLD);
      g.save(); g.globalAlpha *= sl; g.fillStyle = 'rgba(200,210,230,0.6)'; g.font = '700 26px ' + SERIF; g.textAlign = 'right'; txt(g, '能量', 1190, 520, 28, DIM, 'right', sl, 700); g.restore();
      chip(g, 1450, 860, '一份一份 · 地交换', GOLD, ap(lt, L[6], 0.5) * sl, 28); }
    var fm = ap(lt, L[7], 0.6) * (1 - ap(lt, L[10], 0.5)); if (fm > 0) { var ee = ap(lt, L[9], 0.5); card(g, 1190, 520, 520, 220, GOLD, fm); gtxt(g, ee > 0.01 ? 'E = hν' : 'E = ? × ?', 1450, 650, ee > 0.01 ? 100 : 70, GOLD, 'center', fm);
      chip(g, 1450, 440, '每一份 = 常数 × 频率', BLUE, ap(lt, L[7], 0.5) * fm, 26); chip(g, 1450, 800, 'h · 普朗克常数', GOLD, ap(lt, L[8] + 0.2, 0.5) * fm * (1 - ap(lt, L[10], 0.5)), 26); }
    var sm = ap(lt, L[10] + 0.5, 0.6) * (1 - ap(lt, L[11], 0.5)); if (sm > 0) { gtxt(g, 'h', 1450, 640, 190, GOLD, 'center', sm); mono(g, '0.000 ··· 0662', 1450, 760, 40, INK, 'center', sm); chip(g, 1450, 300, '小得惊人', GOLD, sm, 30); }
    var dc = ap(lt, L[11], 0.6); if (dc > 0) { calPage(g, 1450, 640, 300, 360, '12 月', '14', '1900', dc * (1 - ap(lt, L[12], 0.5))); chip(g, 1450, 300, '报告 · 推导', GOLD, dc * (1 - ap(lt, L[12], 0.5)), 30); }
    var ds = ap(lt, L[12], 0.7); if (ds > 0) { gtxt(g, '绝望之举', 1450, 640, 110, RED, 'center', ds); mono(g, '— 后来的说法', 1450, 720, 30, DIM, 'center', ds); }
  };
  // he did not believe it; Einstein; relativity; Nobel
  D.doubt = function (g, lt, L) {
    var tr = ap(lt, L[0], 0.6) * (1 - ap(lt, L[5], 0.5)); if (tr > 0) { chip(g, 1450, 300, '数学上的一个技巧', INK, tr * (1 - ap(lt, L[3], 0.4)), 30);
      var er = ap(lt, L[2], 1.0); stairs(g, 1260, 800, 400, 300, 5, tr * (1 - 0.85 * er), 1, GOLD);
      if (er > 0) { g.save(); g.globalAlpha *= tr * er; g.strokeStyle = BLUE; g.lineWidth = 6; g.shadowColor = BLUE; g.shadowBlur = 12; g.beginPath(); g.moveTo(1260, 800); g.lineTo(1660, 500); g.stroke(); g.restore(); chip(g, 1450, 400, '去掉台阶 · 变回平滑', BLUE, tr * er, 24); }
      var yy = ap(lt, L[3], 0.6); if (yy > 0) { chip(g, 1450, 300, '十几年 · 想改掉', BLUE, yy * tr, 30); for (var i = 0; i < 12; i++) { var on = ap(lt, L[3] + 0.2 + i * 0.12, 0.3); ticks(g, 1290 + i * 30, 900, 1, on > 0.5 ? 1 : 0, GOLD, tr * yy, 48, 12); } } }
    var pt = ap(lt, L[5], 0.6) * (1 - ap(lt, L[8], 0.5)); if (pt > 0) { chip(g, 1450, 300, '1905 · 伯尔尼', BLUE, pt, 30); house(g, 1300, 620, 1.6, pt); chip(g, 1300, 760, '专利局', INK, pt, 24); avatar(g, 1300, 540, 40, '#9aa8c8', 0);
      var ph = ap(lt, L[6], 0.6); if (ph > 0) { g.save(); g.globalAlpha *= pt * ph; g.strokeStyle = BLUE; g.lineWidth = 4; g.beginPath(); for (var k = 0; k <= 30; k++) { var xx = 1500 + k * 7, yy2 = 560 + 30 * Math.sin(k * 0.6); if (k) g.lineTo(xx, yy2); else g.moveTo(xx, yy2); } g.stroke(); g.restore(); for (var d = 0; d < 5; d++) glowDot(g, 1520 + d * 46, 680 + (d % 2) * 14, 8, GOLD, pt * ph); chip(g, 1600, 780, '光 · 一份一份', GOLD, pt * ph, 26); }
      var ng = ap(lt, L[7], 0.5); if (ng > 0) { g.save(); g.globalAlpha *= pt * ng; g.strokeStyle = RED; g.lineWidth = 12; g.shadowColor = RED; g.shadowBlur = 20; g.beginPath(); g.moveTo(1520, 560); g.lineTo(1690, 730); g.moveTo(1690, 560); g.lineTo(1520, 730); g.stroke(); g.restore(); chip(g, 1600, 860, '普朗克 · 不同意', RED, pt * ng, 26); } }
    var rl = ap(lt, L[8], 0.6) * (1 - ap(lt, L[11], 0.5)); if (rl > 0) { chip(g, 1450, 300, '同一年 · 相对论', BLUE, rl, 30); gtxt(g, '相对论', 1450, 600, 110, '#cfe0ff', 'center', rl);
      var sp = ap(lt, L[9], 0.6); if (sp > 0) { check(g, 1450, 760, true, GREEN, sp * rl); chip(g, 1450, 840, '立刻看出分量', GREEN, sp * rl, 28); }
      var su = ap(lt, L[10], 0.6); if (su > 0) chip(g, 1450, 920, '最早的支持者', GOLD, su * rl, 28); }
    var bl = ap(lt, L[11], 0.6) * (1 - ap(lt, L[13], 0.5)); if (bl > 0) { chip(g, 1450, 300, '柏林', BLUE, bl, 30); avatar(g, 1290, 620, 80, GOLD, bl); avatar(g, 1610, 620, 80, '#9aa8c8', bl); arrow(g, 1390, 620, 1530, 620, GOLD, bl, eo((lt - L[11]) / 0.8), lt * 40); chip(g, 1290, 750, '普朗克', GOLD, bl, 26); chip(g, 1610, 750, '爱因斯坦', INK, ap(lt, L[12], 0.5) * bl, 26); }
    var nb = ap(lt, L[13], 0.7); if (nb > 0) { chip(g, 1450, 300, '1918 · 诺贝尔物理学奖', GOLD, nb, 30); medal(g, 1450, 600, 130, nb, '1918'); chip(g, 1450, 830, '发现能量量子', GOLD, ap(lt, L[14], 0.5) * nb, 30); }
  };
  // home: music, then the losses (quiet; candles go out)
  D.home = function (g, lt, L) {
    var hm = ap(lt, L[0], 0.7) * (1 - ap(lt, L[2], 0.6)); if (hm > 0) { chip(g, 1450, 300, '柏林郊外 · 音乐沙龙', BLUE, hm, 28); house(g, 1450, 700, 2.4, hm);
      for (var i = 0; i < 6; i++) { var u = (lt * 0.35 + i / 6) % 1; txt(g, i % 2 ? '♪' : '♫', 1280 + i * 70, 560 - u * 120, 44, GOLD, 'center', hm * Math.sin(u * 3.14) * 0.9, 700); }
      var pe = ap(lt, L[1], 0.6); if (pe > 0) { chip(g, 1310, 840, '普朗克 · 钢琴', GOLD, pe * hm, 24); chip(g, 1610, 840, '爱因斯坦 · 常客', INK, pe * hm, 24); } }
    var lo = ap(lt, L[2], 0.6); if (lo > 0) { var NM = [['妻子', '1909', 2], ['长子卡尔', '1916', 3], ['女儿格蕾特', '1917', 4], ['女儿艾玛', '1919', 5]];
      NM.forEach(function (n, i) { var y = 400 + i * 150, on = ap(lt, L[n[2]] - 0.2, 0.5), p = ap(lt, L[Math.min(i + 2, 5)] - 0.1, 0.5); if (i === 0) { p = ap(lt, L[2], 0.5); on = p; }
        var seen = i === 0 ? ap(lt, L[2], 0.5) : i === 1 ? ap(lt, L[3], 0.5) : i === 2 ? ap(lt, L[4], 0.5) : ap(lt, L[5], 0.5); if (seen <= 0) return;
        glowDot(g, 1250, y, 10, i % 2 ? '#c8c0b0' : GOLD, lo * seen * (1 - 0.0)); g.save(); g.globalAlpha *= lo * seen; g.fillStyle = 'rgba(14,18,28,0.9)'; g.beginPath(); g.arc(1250, y, 14, 0, 6.29); g.fill(); g.restore();
        txt(g, n[0], 1300, y + 10, 36, INK, 'left', lo * seen, 700); mono(g, n[1], 1690, y + 10, 34, DIM, 'right', lo * seen); }); }
  };
  // 1933: Jewish scientists driven out; he pleads for Haber; no result; he stays
  D.hitler = function (g, lt, L) {
    var h1 = ap(lt, L[0], 0.6) * (1 - ap(lt, L[3], 0.5)); if (h1 > 0) { chip(g, 1450, 300, '1933 · 柏林', RED, h1, 30); g.save(); g.globalAlpha *= h1; g.fillStyle = '#1b2231'; g.fillRect(1180, 430, 540, 400); g.strokeStyle = 'rgba(190,200,220,0.7)'; g.lineWidth = 4; g.strokeRect(1180, 430, 540, 400); g.fillStyle = '#0a0d14'; g.fillRect(1560, 560, 100, 270); g.restore();
      var ex = ap(lt, L[1], 0.6); for (var i = 0; i < 4; i++) { var u = eo((lt - L[1] - i * 0.35) / 1.8); avatar(g, 1260 + i * 80 + u * (1610 - (1260 + i * 80)), 700 - u * 40, 36, '#9aa8c8', h1 * ex * (1 - u * 0.9)); }
      chip(g, 1450, 880, '犹太科学家 · 被赶出大学', RED, ap(lt, L[1], 0.5) * h1, 26); }
    var l2 = ap(lt, L[2], 0.6) * (1 - ap(lt, L[6], 0.5)); if (l2 > 0) { avatar(g, 1290, 620, 80, GOLD, l2); chip(g, 1290, 750, '普朗克 · 科学界领袖', GOLD, l2, 24);
      var ht = ap(lt, L[3], 0.6); if (ht > 0) { g.save(); g.globalAlpha *= l2 * ht; g.fillStyle = '#331418'; g.beginPath(); g.arc(1610, 620, 80, 0, 6.29); g.fill(); g.fillStyle = 'rgba(190,60,50,0.8)'; g.beginPath(); g.arc(1610, 600, 30, 0, 6.29); g.fill(); g.beginPath(); g.arc(1610, 700, 50, Math.PI, 0); g.fill(); g.restore(); chip(g, 1610, 750, '希特勒', RED, l2 * ht, 24); arrow(g, 1380, 620, 1520, 620, GOLD, l2 * ht, eo((lt - L[3]) / 0.8), lt * 40); }
      var hb = ap(lt, L[4], 0.6); if (hb > 0) { chip(g, 1450, 450, '为哈伯求情 · 化学家', GOLD, hb * l2, 26); }
      var nr = ap(lt, L[5], 0.5); if (nr > 0) { g.save(); g.globalAlpha *= l2 * nr; g.strokeStyle = RED; g.lineWidth = 12; g.shadowColor = RED; g.shadowBlur = 18; g.beginPath(); g.moveTo(1420, 560); g.lineTo(1480, 620); g.moveTo(1480, 560); g.lineTo(1420, 620); g.stroke(); g.restore(); chip(g, 1450, 880, '大发雷霆 · 毫无结果', RED, l2 * nr, 26); } }
    var st = ap(lt, L[6], 0.7); if (st > 0) { chip(g, 1450, 300, '他没有离开', INK, st * (1 - ap(lt, L[8], 0.5)), 30); g.save(); g.globalAlpha *= st * (1 - ap(lt, L[8], 0.5)); g.strokeStyle = 'rgba(190,200,220,0.7)'; g.lineWidth = 4; g.setLineDash([14, 10]); g.strokeRect(1230, 440, 440, 380); g.setLineDash([]); g.restore(); avatar(g, 1450, 620, 90, GOLD, st * (1 - ap(lt, L[8], 0.5))); chip(g, 1450, 880, '也没有公开反抗', DIM, ap(lt, L[7], 0.5) * st * (1 - ap(lt, L[8], 0.5)), 26);
      var sc = ap(lt, L[8], 0.7); if (sc > 0) { chip(g, 1450, 300, '评价两极', INK, sc, 30); scale2(g, 1450, 620, 0.1 * Math.sin(lt * 1.4), sc, ''); chip(g, 1290, 900, '留下 · 保住能保的', GOLD, sc, 24); chip(g, 1610, 900, '沉默 · 没有反抗', RED, sc, 24); } }
  };
  // 1944-45: house bombed, Erwin arrested and executed; he is 86 (restrained)
  D.erwin = function (g, lt, L) {
    var b = ap(lt, L[0], 0.7) * (1 - ap(lt, L[2], 0.6)); if (b > 0) { chip(g, 1450, 300, '1944 · 2 月', RED, b, 30); house(g, 1450, 640, 2.4, b * (1 - 0.35 * ap(lt, L[1], 1.2))); flameFx(g, 1450, 560, 1.4, lt, b * 0.9); var bd = ap(lt, L[1], 0.7); if (bd > 0) { for (var i = 0; i < 6; i++) { var u = (lt * 0.5 + i / 6) % 1; doc(g, 1280 + i * 70, 800 - u * 220, 70, 90, b * bd * (1 - u), 0.4 * Math.sin(i), '', i); } chip(g, 1450, 880, '书信 · 手稿', DIM, bd * b, 26); } }
    var ar = ap(lt, L[2], 0.6) * (1 - ap(lt, L[6], 0.5)); if (ar > 0) { chip(g, 1450, 300, '1944 · 7 月', RED, ar, 30); avatar(g, 1450, 600, 90, '#9aa8c8', ar); chip(g, 1450, 730, '埃尔温 · 被捕', GOLD, ar, 28);
      var cn = ap(lt, L[3], 0.6); if (cn > 0) chip(g, 1450, 820, '卷入刺杀希特勒的密谋', RED, cn * ar, 26);
      var lt5 = ap(lt, L[4], 0.6); if (lt5 > 0) { doc(g, 1620, 480, 150, 190, lt5 * ar * (1 - ap(lt, L[5], 0.5)), 0.1, '信', 7); arrow(g, 1560, 440, 1450, 460, GOLD, lt5 * ar * (1 - ap(lt, L[5], 0.5)), 1, lt * 30); chip(g, 1620, 610, '求饶他一命', GOLD, lt5 * ar * (1 - ap(lt, L[5], 0.5)), 24); }
      var nr2 = ap(lt, L[5], 0.5); if (nr2 > 0) chip(g, 1450, 920, '没有回音', DIM, nr2 * ar, 28); }
    var ex = ap(lt, L[6], 0.7); if (ex > 0) { chip(g, 1450, 300, '1945 · 1 月', RED, ex, 30); glowDot(g, 1450, 600, 14, '#c8c0b0', ex * (1 - ap(lt, L[7], 0.6) * 0.0)); g.save(); g.globalAlpha *= ex; g.fillStyle = 'rgba(14,18,28,0.9)'; g.beginPath(); g.arc(1450, 600, 22, 0, 6.29); g.fill(); g.restore(); txt(g, '埃尔温', 1450, 700, 40, INK, 'center', ex, 700);
      var ag = ap(lt, L[7], 0.7); if (ag > 0) { gtxt(g, '86 岁', 1450, 860, 90, GOLD, 'center', ag); } }
  };
  // Göttingen, 1947; the society that carries his name
  D.gott = function (g, lt, L) {
    var go = ap(lt, L[0], 0.7) * (1 - ap(lt, L[2], 0.6)); if (go > 0) { chip(g, 1450, 300, '哥廷根', BLUE, go, 30); house(g, 1450, 620, 2.2, go); mono(g, '1947 · 10 · 4', 1450, 840, 38, GOLD, 'center', ap(lt, L[1], 0.6) * go); glowDot(g, 1450, 500, 10, '#ffe7b0', ap(lt, L[1], 0.6) * go * (1 - ap(lt, L[1] + 1.6, 1.0))); }
    var sc = ap(lt, L[2], 0.7); if (sc > 0) { chip(g, 1450, 300, '1948 · 改名', BLUE, sc, 30); card(g, 1180, 460, 540, 280, GOLD, sc); gtxt(g, '马克斯·普朗克学会', 1450, 620, 54, GOLD, 'center', ap(lt, L[4], 0.7) * sc); txt(g, '德国最大的科研机构', 1450, 560, 34, INK, 'center', ap(lt, L[2], 0.5) * sc * (1 - ap(lt, L[4], 0.5)), 700); txt(g, '改以他的名字命名', 1450, 680, 34, INK, 'center', ap(lt, L[3], 0.5) * sc * (1 - ap(lt, L[4], 0.5)), 700); }
  };
  // 2019: the kilogram stops being a piece of metal and becomes a number
  D.kilo = function (g, lt, L) {
    var o = ap(lt, L[0], 0.6) * (1 - ap(lt, L[4], 0.6)); if (o > 0) { chip(g, 1450, 300, '一千克 · 原器', BLUE, o, 30); jar(g, 1450, 800, 220, 330, o); cyl(g, 1450, 770, 110, 150, o); chip(g, 1450, 870, '铂铱合金 · 法国', INK, ap(lt, L[1], 0.5) * o, 26);
      var cp = ap(lt, L[2], 0.6); if (cp > 0) { [1250, 1650].forEach(function (x, i) { cyl(g, x, 770, 70, 100, o * cp, '#7aa8ff'); }); chip(g, 1450, 930, '复制品', DIM, cp * o, 24); var ne = ap(lt, L[3], 0.6); if (ne > 0) gtxt(g, '≠', 1450, 440, 90, RED, 'center', ne * o * (0.7 + 0.3 * Math.sin(lt * 4))); } }
    var nw = ap(lt, L[4], 0.7); if (nw > 0) { chip(g, 1450, 300, '2019 · 5 · 20', GOLD, nw, 30); var hh = ap(lt, L[5], 0.6); gtxt(g, 'h', 1450, 600, 220, GOLD, 'center', hh * (1 - ap(lt, L[8], 0.6)));
      var vv = ap(lt, L[6], 0.6); if (vv > 0) { g.save(); g.globalAlpha *= nw * (1 - ap(lt, L[8], 0.6)); mono(g, '6.62607015', 1450, 700, 52, INK, 'center', vv); mono(g, '× 10⁻³⁴  J·s', 1450, 770, 40, DIM, 'center', ap(lt, L[7], 0.6)); g.restore(); } }
    var sc = ap(lt, L[8], 0.7); if (sc > 0) { var wob = 0.16 * Math.exp(-(lt - L[8]) * 0.7) * Math.cos((lt - L[8]) * 5); scale2(g, 1450, 640, wob, sc, 'h'); chip(g, 1450, 300, '称量世界的砝码', GOLD, ap(lt, L[9], 0.5) * sc, 32); }
  };
