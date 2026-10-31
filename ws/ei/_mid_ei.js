// ---------- Einstein props (part 1) ----------
  var GREEN = '#8fd9a8', ORANGE = '#ff9a4a';
  var PH = new Image(); PH.src = window.PHOTO_URI || ''; window.__PH = PH;           // his portrait (optional)
  function photoCard(g, img, x, y, w, h, a, filt, col) {                                // gold-framed photo
    if (a <= 0 || !img.complete || !img.naturalWidth) return false; col = col || GOLD; g.save(); g.globalAlpha *= a;
    g.fillStyle = '#000'; g.shadowColor = 'rgba(0,0,0,0.8)'; g.shadowBlur = 30; g.fillRect(x - 8, y - 8, w + 16, h + 16); g.shadowBlur = 0;
    g.filter = filt || 'none'; g.drawImage(img, x, y, w, h); g.filter = 'none';
    g.strokeStyle = col; g.lineWidth = 4; g.shadowColor = col; g.shadowBlur = 14; g.strokeRect(x - 8, y - 8, w + 16, h + 16); g.restore(); return true;
  }
  function sun(g, x, y, r, a, lt) {
    if (a <= 0) return; g.save(); g.globalAlpha *= a; var gl = g.createRadialGradient(x, y, r * 0.6, x, y, r * 3); gl.addColorStop(0, 'rgba(255,200,100,0.55)'); gl.addColorStop(1, 'rgba(255,160,60,0)');
    g.fillStyle = gl; g.beginPath(); g.arc(x, y, r * 3, 0, 6.29); g.fill(); var gr = g.createRadialGradient(x - r * 0.3, y - r * 0.3, 2, x, y, r); gr.addColorStop(0, '#fff6c8'); gr.addColorStop(0.6, '#ffc850'); gr.addColorStop(1, '#f08a28');
    g.fillStyle = gr; g.beginPath(); g.arc(x, y, r, 0, 6.29); g.fill();
    g.strokeStyle = 'rgba(255,200,100,0.6)'; g.lineWidth = 3; for (var i = 0; i < 14; i++) { var an = i / 14 * 6.283 + (lt || 0) * 0.15, r0 = r * 1.2, r1 = r * (1.45 + 0.12 * Math.sin(i * 3 + (lt || 0) * 3)); g.beginPath(); g.moveTo(x + Math.cos(an) * r0, y + Math.sin(an) * r0); g.lineTo(x + Math.cos(an) * r1, y + Math.sin(an) * r1); g.stroke(); }
    g.restore();
  }
  function medal(g, x, y, r, a, label) {
    if (a <= 0) return; g.save(); g.globalAlpha *= a; var gr = g.createRadialGradient(x - r * 0.3, y - r * 0.3, 2, x, y, r); gr.addColorStop(0, '#fff0c0'); gr.addColorStop(0.6, '#d9a040'); gr.addColorStop(1, '#8a5c18');
    g.fillStyle = gr; g.shadowColor = GOLD; g.shadowBlur = 20; g.beginPath(); g.arc(x, y, r, 0, 6.29); g.fill(); g.shadowBlur = 0;
    g.strokeStyle = 'rgba(110,70,20,0.7)'; g.lineWidth = 3; g.beginPath(); g.arc(x, y, r * 0.8, 0, 6.29); g.stroke();
    g.font = '900 ' + Math.round(r * 0.5) + 'px ' + SERIF; g.fillStyle = '#6a4410'; g.textAlign = 'center'; g.fillText(label, x, y + r * 0.18); g.restore();
  }
  function calPage(g, x, y, w, h, mon, day, wk, a) {                                      // a tear-off calendar page, centre (x, y)
    if (a <= 0) return; g.save(); g.globalAlpha *= a; g.translate(x, y); g.shadowColor = 'rgba(0,0,0,0.6)'; g.shadowBlur = 24;
    g.fillStyle = '#e9e2d0'; rr(g, -w / 2, -h / 2, w, h, 14); g.fill(); g.shadowBlur = 0; g.fillStyle = '#a8402c'; g.beginPath(); g.moveTo(-w / 2 + 14, -h / 2); g.arcTo(w / 2, -h / 2, w / 2, -h / 2 + 90, 14); g.lineTo(w / 2, -h / 2 + 90); g.lineTo(-w / 2, -h / 2 + 90); g.lineTo(-w / 2, -h / 2 + 14); g.arcTo(-w / 2, -h / 2, -w / 2 + 14, -h / 2, 14); g.fill();
    g.textAlign = 'center'; g.fillStyle = '#fff4e0'; g.font = '900 52px ' + SERIF; g.fillText(mon, 0, -h / 2 + 62); g.fillStyle = '#2a2018'; g.font = '900 ' + Math.round(h * 0.42) + 'px ' + SERIF; g.fillText(day, 0, h * 0.2); g.font = '700 38px ' + SERIF; g.fillStyle = '#a8402c'; g.fillText(wk, 0, h / 2 - 32); g.restore();
  }
  function stairs(g, x, y, w, h, n, a, p, col) {                                          // a staircase (n steps), drawn up to progress p; base-left (x, y)
    if (a <= 0 || p <= 0) return; g.save(); g.globalAlpha *= a; g.strokeStyle = col || GOLD; g.lineWidth = 6; g.lineJoin = 'round'; g.shadowColor = col || GOLD; g.shadowBlur = 14; g.beginPath(); var sw = w / n, sh = h / n, tot = n * 2, k = Math.floor(tot * p + 0.0001);
    g.moveTo(x, y); for (var i = 0; i < n; i++) { if (i * 2 >= k) break; g.lineTo(x + i * sw + sw, y - i * sh); if (i * 2 + 1 >= k) break; g.lineTo(x + i * sw + sw, y - (i + 1) * sh); } g.stroke(); g.restore();
  }
