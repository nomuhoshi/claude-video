  // ================= Galileo: people and props (100 x 56.25 units) =================
  var GL_COL = '#cdb98f', GL_OLD = '#9ea8bf', GL_NAME = '#f2c66b', ROBE = '#9b2f2f', ROBE2 = '#6d1f22';
  function galileo(g, x, yb, h, a, o, lt) {
    o = o || {}; o.col = o.old ? GL_OLD : GL_COL; o.beard = !!o.old || o.beard; o.moustache = true;
    if (o.name === undefined) o.name = '伽利略'; o.nameCol = GL_NAME; faraday(g, x, yb, h, a, o, lt);
  }
  function aristotle(g, x, yb, h, a, o, lt) { o = o || {}; o.col = '#a69d8a'; o.beard = true; o.longHair = true; if (o.name === undefined) o.name = '亚里士多德'; o.nameCol = '#d7d0bf'; faraday(g, x, yb, h, a, o, lt); }
  function vincenzo(g, x, yb, h, a, o, lt) { o = o || {}; o.col = '#b9a678'; o.moustache = true; o.beard = true; if (o.name === undefined) o.name = '父亲 · 琴师'; o.nameCol = '#e8c98a'; faraday(g, x, yb, h, a, o, lt); }
  function boyG(g, x, yb, h, a, o, lt) { o = o || {}; o.col = GL_COL; if (o.name === undefined) o.name = ''; faraday(g, x, yb, h, a, o, lt); }
  // a red-robed judge / cardinal (custom, simple): x centre, yb feet, h height
  function judge(g, x, yb, h, a, o) {
    if (a <= 0.003) return; o = o || {}; var k = h / 10, col = o.col || ROBE;
    g.save(); g.globalAlpha *= a; g.translate(x, yb); g.scale(k, k);
    var gr = g.createLinearGradient(0, -8, 0, 0); gr.addColorStop(0, col); gr.addColorStop(1, o.col2 || ROBE2);
    g.fillStyle = gr; g.beginPath(); g.moveTo(-1.6, -6.4); g.quadraticCurveTo(-3.2, -5.2, -3.4, -0.2); g.lineTo(3.4, -0.2); g.quadraticCurveTo(3.2, -5.2, 1.6, -6.4); g.closePath(); g.fill();
    g.fillStyle = '#f0e6d0'; g.fillRect(-0.55, -6.3, 1.1, 3.0);                              // white band down the front
    g.fillStyle = '#b79774'; g.beginPath(); g.arc(0, -7.6, 1.35, 0, TAU); g.fill();            // face
    g.fillStyle = o.cap || col; g.beginPath(); g.arc(0, -8.0, 1.25, Math.PI, TAU); g.fill();    // cap
    g.restore();
  }
  // Galileo kneeling, holding a paper out (feet at yb; faces right)
  function kneel(g, x, yb, h, a, lt, o) {
    if (a <= 0.003) return; o = o || {}; var k = h / 12, col = '#a9b1c2';
    g.save(); g.globalAlpha *= a; g.translate(x, yb); g.scale(k, k); g.lineCap = 'round'; g.lineJoin = 'round';
    g.strokeStyle = col; g.fillStyle = col;
    g.lineWidth = 2.3; g.beginPath(); g.moveTo(-3.8, -0.9); g.lineTo(1.4, -0.9); g.stroke();             // shin on the floor
    g.lineWidth = 2.6; g.beginPath(); g.moveTo(-3.6, -1.2); g.lineTo(-2.0, -5.6); g.lineTo(-1.2, -9.2); g.stroke();   // thigh + torso
    g.lineWidth = 1.7; g.beginPath(); g.moveTo(-1.1, -8.4); g.lineTo(1.4, -6.8); g.lineTo(3.4, -7.4); g.stroke();   // arm
    g.beginPath(); g.arc(-0.2, -10.7, 1.55, 0, TAU); g.fill();                                           // head
    g.fillStyle = 'rgba(215,220,232,0.95)'; g.beginPath(); g.ellipse(0.5, -9.5, 1.0, 1.1, 0.2, 0, Math.PI); g.fill();   // beard
    g.fillStyle = '#0b0f18'; g.beginPath(); g.arc(0.35, -10.8, 0.16, 0, TAU); g.fill();
    // the paper
    g.save(); g.translate(3.9, -7.6); g.rotate(-0.12); g.fillStyle = 'rgba(214,204,180,0.97)'; g.fillRect(-1.5, -2.0, 3.0, 4.0);
    g.fillStyle = 'rgba(80,70,50,0.7)'; for (var i = 0; i < 6; i++) g.fillRect(-1.1, -1.5 + i * 0.55, 2.2 - (i === 5 ? 1.0 : 0), 0.16); g.restore();
    g.restore();
    if (o.name) tx(g, o.name, x + 0.5 * k, yb - h - 2.0, 1.7, GL_NAME, 'center', 800, SANS, a);
  }
  function bellarmine(g, x, yb, h, a, o, lt) {
    o = o || {}; o.col = '#b05a5a'; o.moustache = true; o.beard = true; if (o.name === undefined) o.name = '贝拉明'; o.nameCol = '#ff9d8a';
    faraday(g, x, yb, h, a, o, lt);
    if (a > 0.01) { var k = h / 330, f = o.flip ? -1 : 1; g.save(); g.globalAlpha *= a; g.fillStyle = '#b02a2a'; g.beginPath(); g.ellipse(x + f * 0 * k, yb - 322 * k, 62 * k, 26 * k, 0, Math.PI, TAU); g.fill(); g.restore(); }
  }
  function pope(g, x, yb, h, a, o, lt) {
    o = o || {}; o.col = '#d9cfae'; o.moustache = true; if (o.name === undefined) o.name = '教皇'; o.nameCol = '#fff2c4';
    faraday(g, x, yb, h, a, o, lt);
    if (a > 0.01) {                // tall pointed mitre
      var k = h / 330; g.save(); g.globalAlpha *= a; g.fillStyle = '#f2d48a'; g.beginPath(); g.moveTo(x - 58 * k, yb - 318 * k); g.lineTo(x, yb - 458 * k); g.lineTo(x + 58 * k, yb - 318 * k); g.closePath(); g.fill();
      g.fillStyle = '#b02a2a'; g.fillRect(x - 6 * k, yb - 440 * k, 12 * k, 110 * k); g.restore();
    }
  }
  function maria(g, x, yb, h, a, o, lt) {
    o = o || {}; o.col = '#968dae'; o.dress = true; if (o.name === undefined) o.name = '玛丽亚 · 切莱斯特'; o.nameCol = '#d9b8ff';
    faraday(g, x, yb, h, a, o, lt);
    if (a > 0.01) {                // dark veil
      var k = h / 330; g.save(); g.globalAlpha *= a; g.fillStyle = '#1a1f33'; g.beginPath(); g.moveTo(x - 76 * k, yb - 190 * k); g.quadraticCurveTo(x - 90 * k, yb - 330 * k, x, yb - 340 * k);
      g.quadraticCurveTo(x + 90 * k, yb - 330 * k, x + 76 * k, yb - 190 * k); g.lineTo(x + 44 * k, yb - 215 * k); g.quadraticCurveTo(x, yb - 300 * k, x - 44 * k, yb - 215 * k); g.closePath(); g.fill();
      g.fillStyle = '#f0e6d0'; g.fillRect(x - 40 * k, yb - 200 * k, 80 * k, 10 * k); g.restore();
    }
  }
  // brass telescope: centre of the tube at (x, y), total length len, pointing at angle ang (radians; 0 = to the right)
  function telescope(g, x, y, len, ang, a, o) {
    if (a <= 0.003) return; o = o || {}; var th = o.th || len * 0.075;
    g.save(); g.globalAlpha *= a; g.translate(x, y); g.rotate(ang);
    var segs = o.segs || [[0.0, 0.34, 1.0], [0.34, 0.68, 0.82], [0.68, 1.0, 0.66]];
    segs.forEach(function (s) {
      var x0 = -len / 2 + s[0] * len, x1 = -len / 2 + s[1] * len, t = th * s[2];
      var gr = g.createLinearGradient(0, -t / 2, 0, t / 2); gr.addColorStop(0, '#f1d28f'); gr.addColorStop(0.35, '#c79a45'); gr.addColorStop(1, '#6b4a1c');
      g.fillStyle = gr; g.fillRect(x0, -t / 2, x1 - x0, t);
      g.fillStyle = 'rgba(40,24,6,0.75)'; g.fillRect(x1 - len * 0.012, -t / 2, len * 0.012, t);
    });
    g.fillStyle = '#3a2810'; g.fillRect(len / 2 - len * 0.03, -th * 0.5, len * 0.03, th);       // eyepiece end
    g.fillStyle = '#2a3a52'; g.beginPath(); g.ellipse(-len / 2, 0, th * 0.12, th * 0.52, 0, 0, TAU); g.fill();   // objective lens
    g.restore();
    if (o.glow) glow(g, x - Math.cos(ang) * len / 2, y - Math.sin(ang) * len / 2, th * 2.2, 'rgba(160,200,255,0.8)', o.glow * a);
  }
  function tripod(g, x, y, h, a) {
    if (a <= 0.003) return; g.save(); g.globalAlpha *= a; g.strokeStyle = '#6b4a2e'; g.lineWidth = 0.55; g.lineCap = 'round';
    g.beginPath(); g.moveTo(x, y); g.lineTo(x - h * 0.45, y + h); g.moveTo(x, y); g.lineTo(x + h * 0.45, y + h); g.moveTo(x, y); g.lineTo(x + h * 0.05, y + h * 0.92); g.stroke(); g.restore();
  }
  // a planet disk with soft bands (Jupiter)
  function jupiterB(g, x, y, r, a) {
    if (a <= 0.003) return; halo(g, x, y, r * 1.9, 'rgba(255,214,160,0.55)', 0.35 * a);
    g.save(); g.globalAlpha *= a; g.beginPath(); g.arc(x, y, r, 0, TAU); g.clip();
    var gr = g.createRadialGradient(x - r * 0.35, y - r * 0.4, r * 0.1, x, y, r); gr.addColorStop(0, '#f5e4c4'); gr.addColorStop(1, '#a8794d'); g.fillStyle = gr; g.fillRect(x - r, y - r, r * 2, r * 2);
    var bands = [[-0.62, 0.16, 'rgba(150,96,60,0.55)'], [-0.3, 0.12, 'rgba(240,222,190,0.5)'], [-0.02, 0.2, 'rgba(158,104,66,0.6)'], [0.34, 0.14, 'rgba(236,214,180,0.5)'], [0.62, 0.15, 'rgba(140,90,56,0.5)']];
    bands.forEach(function (b) { g.fillStyle = b[2]; g.fillRect(x - r, y + b[0] * r - b[1] * r / 2, r * 2, b[1] * r); });
    g.fillStyle = 'rgba(190,80,60,0.7)'; g.beginPath(); g.ellipse(x + r * 0.3, y + r * 0.42, r * 0.18, r * 0.1, 0, 0, TAU); g.fill();
    var sh = g.createRadialGradient(x - r * 0.5, y - r * 0.5, r * 0.4, x, y, r * 1.05); sh.addColorStop(0, 'rgba(0,0,0,0)'); sh.addColorStop(1, 'rgba(0,0,10,0.55)'); g.fillStyle = sh; g.fillRect(x - r, y - r, r * 2, r * 2);
    g.restore();
  }
  // a lit-disc planet with a phase: f = illuminated fraction 0..1 (waxing, lit on the right when side>0)
  function phaseDisc(g, x, y, r, f, a, col, side) {
    if (a <= 0.003) return; side = side || 1; col = col || '#f4ecd0';
    g.save(); g.globalAlpha *= a; g.translate(x, y); g.scale(side, 1);
    g.fillStyle = 'rgba(40,46,64,0.9)'; g.beginPath(); g.arc(0, 0, r, 0, TAU); g.fill();
    var kx = Math.cos(f * Math.PI);             // terminator half-width factor: f=0 -> +1 (all dark), f=0.5 -> 0, f=1 -> -1 (all lit)
    g.beginPath(); g.arc(0, 0, r, -Math.PI / 2, Math.PI / 2, false);
    g.ellipse(0, 0, Math.max(0.0001, Math.abs(kx) * r), r, 0, Math.PI / 2, -Math.PI / 2, kx > 0);
    g.closePath(); g.fillStyle = col; g.fill();
    g.strokeStyle = 'rgba(255,255,255,0.35)'; g.lineWidth = 0.14; g.beginPath(); g.arc(0, 0, r, 0, TAU); g.stroke();
    g.restore();
  }
  function astronaut(g, x, yb, h, a, o, lt) {
    if (a <= 0.003) return; o = o || {}; var k = h / 20, f = o.flip ? -1 : 1;
    g.save(); g.globalAlpha *= a; g.translate(x, yb); g.scale(f * k, k); g.lineCap = 'round'; g.lineJoin = 'round';
    g.fillStyle = '#e9edf4'; g.strokeStyle = '#c6cddc'; g.lineWidth = 0.4;
    g.beginPath(); if (g.roundRect) g.roundRect(-3.2, -9.8, 6.4, 5.6, 1.4); else g.rect(-3.2, -9.8, 6.4, 5.6); g.fill();        // thigh block
    g.fillRect(-3.0, -5.0, 2.6, 5.0); g.fillRect(0.4, -5.0, 2.6, 5.0);                                                       // legs
    g.fillStyle = '#6b7488'; g.fillRect(-3.4, -1.0, 3.2, 1.0); g.fillRect(0.2, -1.0, 3.4, 1.0);                               // boots
    g.fillStyle = '#e9edf4'; g.beginPath(); if (g.roundRect) g.roundRect(-4.6, -18.2, 9.2, 9.6, 2.2); else g.rect(-4.6, -18.2, 9.2, 9.6); g.fill();   // torso
    g.fillStyle = '#d6dbe8'; g.fillRect(-7.4, -17.6, 3.2, 5.4); g.fillRect(4.2, -17.6, 3.2, 5.4);                              // pack edges
    var arm = o.arm == null ? 0 : o.arm;                                                                                     // 0 down .. 1 forward-up
    g.strokeStyle = '#e9edf4'; g.lineWidth = 2.2; g.beginPath(); g.moveTo(3.6, -16.4); g.lineTo(5.4 + 2.2 * arm, -12.6 - 3.6 * arm); g.stroke();
    g.beginPath(); g.moveTo(-3.6, -16.4); g.lineTo(-5.2 - 1.8 * arm, -12.8 - 3.2 * arm); g.stroke();
    var hg = g.createRadialGradient(0.8, -23.4, 0.5, 0, -22.4, 4.4); hg.addColorStop(0, '#f6f8fc'); hg.addColorStop(1, '#bfc8d9');
    g.fillStyle = hg; g.beginPath(); g.arc(0, -22.2, 4.3, 0, TAU); g.fill();                                                  // helmet
    var vg = g.createLinearGradient(-2.8, -24, 3, -20); vg.addColorStop(0, '#f2c768'); vg.addColorStop(0.5, '#8a6a2a'); vg.addColorStop(1, '#2a2218');
    g.fillStyle = vg; g.beginPath(); g.ellipse(1.0, -22.2, 2.9, 2.6, 0, 0, TAU); g.fill();                                       // gold visor
    g.restore();
  }
  // small helpers used across the scenes
  function strokeText(g, s, x, y, sz, col, a, wt, al) { tx(g, s, x, y, sz, col, al || 'center', wt || 800, SANS, a); }
  function xMark(g, x, y, s, col, a, w) {
    if (a <= 0.003) return; g.save(); g.globalAlpha *= a; g.strokeStyle = col || RED; g.lineWidth = w || s * 0.28; g.lineCap = 'round';
    g.beginPath(); g.moveTo(x - s, y - s); g.lineTo(x + s, y + s); g.moveTo(x + s, y - s); g.lineTo(x - s, y + s); g.stroke(); g.restore();
  }
  function stamp2(g, s, x, y, sz, col, a, ang) {
    if (a <= 0.003) return; g.save(); g.globalAlpha *= a; g.translate(x, y); g.rotate(ang || 0); g.font = '900 ' + sz + 'px ' + SANS; g.textAlign = 'center'; g.textBaseline = 'middle';
    var w = g.measureText(s).width + sz * 0.9; g.strokeStyle = col; g.lineWidth = sz * 0.12; g.beginPath(); if (g.roundRect) g.roundRect(-w / 2, -sz * 0.75, w, sz * 1.5, sz * 0.18); else g.rect(-w / 2, -sz * 0.75, w, sz * 1.5); g.stroke();
    g.fillStyle = col; g.fillText(s, 0, sz * 0.04); g.restore();
  }
  // the heliocentric/geocentric little models
  function orbitDiagram(g, cx, cy, R, lt, a, mode) {      // mode 'helio': earth circles the sun
    if (a <= 0.003) return; ring(g, cx, cy, R, 'rgba(200,215,240,0.35)', 0.14, a);
    if (mode === 'geo') { earthB(g, cx, cy, R * 0.16, a, lt); var an = lt * 0.9; sunB(g, cx + Math.cos(an) * R, cy + Math.sin(an) * R, R * 0.14, a, lt); }
    else { sunB(g, cx, cy, R * 0.2, a, lt); var an2 = lt * 0.9; earthB(g, cx + Math.cos(an2) * R, cy + Math.sin(an2) * R, R * 0.13, a, lt); }
  }
