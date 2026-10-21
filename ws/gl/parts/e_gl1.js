  // ================= Galileo: scenes g0 .. g5 =================
  function hallBack(g, p, lt) {
    g.save(); g.globalAlpha *= p;
    var wall = g.createLinearGradient(0, 14, 0, 44); wall.addColorStop(0, 'rgba(34,26,24,0)'); wall.addColorStop(1, 'rgba(58,40,32,0.8)');
    g.fillStyle = wall; g.fillRect(0, 14, 100, 30);
    g.strokeStyle = 'rgba(214,176,120,0.22)'; g.lineWidth = 0.28;
    for (var i = 0; i < 8; i++) { var x = 6 + i * 13.5; g.beginPath(); g.moveTo(x - 4.2, 44); g.lineTo(x - 4.2, 27); g.arc(x, 27, 4.2, Math.PI, 0); g.lineTo(x + 4.2, 44); g.stroke(); }
    var fl = g.createLinearGradient(0, 44, 0, 56.25); fl.addColorStop(0, '#221914'); fl.addColorStop(1, '#0a0807'); g.fillStyle = fl; g.fillRect(0, 44, 100, 12.25);
    g.strokeStyle = 'rgba(214,176,120,0.10)'; g.lineWidth = 0.2;
    for (i = 0; i <= 12; i++) { g.beginPath(); g.moveTo(66 + (i - 6) * 1.2, 44); g.lineTo(66 + (i - 6) * 11, 56.25); g.stroke(); }
    for (i = 1; i < 5; i++) { var yy = 44 + i * i * 0.75; g.beginPath(); g.moveTo(0, yy); g.lineTo(100, yy); g.stroke(); }
    g.restore();
  }
  function judgesRow(g, xs, yb, h, t0, lt, a, scale) {
    for (var i = 0; i < xs.length; i++) judge(g, xs[i], yb, h * (scale ? scale[i] : 1), A_(lt, t0 + i * 0.12, 0.7) * a);
  }

  // ---------- g0: Rome, 22 June 1633 -- the old man kneels with the paper ----------
  DRAW.g0 = function (g, lt, L) {
    var p0 = A_(lt, 0.1, 1.6), i;
    hallBack(g, p0, lt);
    // a shaft of light from a high window onto the kneeling man
    var sh = A_(lt, L[0] + 0.2, 1.2) * 0.5;
    if (sh > 0.01) {
      g.save(); g.globalCompositeOperation = 'lighter'; g.globalAlpha = sh;
      var lg = g.createLinearGradient(14, 14, 36, 50); lg.addColorStop(0, 'rgba(255,226,170,0.34)'); lg.addColorStop(1, 'rgba(255,226,170,0.02)');
      g.fillStyle = lg; g.beginPath(); g.moveTo(10, 12); g.lineTo(22, 12); g.lineTo(42, 50); g.lineTo(22, 50); g.closePath(); g.fill(); g.restore();
    }
    chip(g, 63, 22.6, '罗马 · 宗教裁判所', GOLD, A_(lt, L[0] + 0.5, 0.6) * (1 - A_(lt, L[2] + 1.0, 0.6)), 'rgba(48,38,12,0.92)');
    // the court: judges behind a long table
    g.save(); g.globalAlpha *= A_(lt, L[1], 0.8);
    rbox(g, 49, 38.6, 49, 1.6, 0.3, null, 0, '#17100d', 1); g.restore();
    judgesRow(g, [57, 66, 75, 84, 93], 41.5, 11.5, L[1] + 0.1, lt, 1, [0.98, 1.02, 1.08, 1.02, 0.98]);
    g.save(); g.globalAlpha *= A_(lt, L[1], 0.8); rbox(g, 49, 35.6, 49, 5.0, 0.4, 'rgba(240,200,120,0.55)', 0.16, '#2a1c15', 1);
    g.fillStyle = 'rgba(244,236,214,0.25)'; for (i = 0; i < 5; i++) g.fillRect(53 + i * 9, 37.2, 5, 1.1); g.restore();
    // the kneeling man + warm pool of light
    var ka = A_(lt, L[1] + 0.4, 0.9);
    glow(g, 30, 42, 11, 'rgba(255,214,150,0.9)', 0.32 * ka);
    kneel(g, 28, 49.5, 13, ka, lt);
    var pg = A_(lt, L[2], 0.6) * (0.55 + 0.45 * Math.sin(lt * 3.2));
    glow(g, 34.4, 42.4, 3.4, 'rgba(255,230,170,0.9)', 0.5 * pg);
    // "the Earth moves" -- crossed out
    var da = A_(lt, L[3] - 0.15, 0.7);
    if (da > 0.01) {
      var cx = 31, cy = 29.6;
      sunB(g, cx, cy, 1.3, da, lt); ring(g, cx, cy, 4.6, 'rgba(200,215,240,0.4)', 0.14, da);
      earthB(g, cx + Math.cos(lt * 1.1) * 4.6, cy + Math.sin(lt * 1.1) * 4.6, 0.95, da, lt);
      var xs = A_(lt, L[3] + 0.8, 0.22), sc = 2.2 - 1.2 * eo(xs);
      g.save(); g.translate(cx, cy); g.scale(sc, sc); xMark(g, 0, 0, 3.6, '#ef5b43', xs * 0.9, 0.8); g.restore();
    }
    // ...but he saw it: the telescope, off to the left
    var ta = A_(lt, L[4] - 0.1, 0.9);
    if (ta > 0.01) { tripod(g, 11, 41.4, 7, ta); telescope(g, 11, 38.6, 14, -0.95, ta, { glow: 0.6 }); chip(g, 11, 33.2, '亲眼所见', GOLD, A_(lt, L[4] + 0.5, 0.5), 'rgba(48,38,12,0.92)'); }
    // the name
    chip(g, 28, 52.6, '伽利略', GOLD, A_(lt, L[5] + 0.1, 0.5), 'rgba(48,38,12,0.95)');
  };

  // ---------- g1: Pisa 1564 -- a lute-maker's son hangs weights on a string; then medicine becomes geometry ----------
  function leaningTower(g, x, yb, s, a) {
    if (a <= 0.003) return; g.save(); g.globalAlpha *= a; g.translate(x, yb); g.rotate(0.065);
    var gr = g.createLinearGradient(-2.5 * s, 0, 2.5 * s, 0); gr.addColorStop(0, '#8d8472'); gr.addColorStop(0.5, '#d6cdb6'); gr.addColorStop(1, '#a79e88');
    g.fillStyle = gr; g.fillRect(-2.5 * s, -15 * s, 5 * s, 15 * s); g.fillRect(-1.8 * s, -17.4 * s, 3.6 * s, 2.4 * s);
    g.strokeStyle = 'rgba(40,34,26,0.55)'; g.lineWidth = 0.1 * s;
    for (var r = 0; r < 7; r++) { var y0 = -(r + 1) * 2.0 * s; g.beginPath(); g.moveTo(-2.5 * s, y0); g.lineTo(2.5 * s, y0); g.stroke();
      for (var k = 0; k < 5; k++) { g.beginPath(); g.arc(-2.0 * s + k * 1.0 * s, y0 + 1.4 * s, 0.32 * s, Math.PI, 0); g.lineTo(-1.68 * s + k * 1.0 * s, y0 + 1.9 * s); g.lineTo(-2.32 * s + k * 1.0 * s, y0 + 1.9 * s); g.closePath(); g.fillStyle = 'rgba(30,26,22,0.7)'; g.fill(); } }
    g.restore();
  }
  function lute(g, x, y, s, ang, a) {
    if (a <= 0.003) return; g.save(); g.globalAlpha *= a; g.translate(x, y); g.rotate(ang); g.scale(s, s);
    var gr = g.createRadialGradient(-0.6, -0.4, 0.3, 0, 0, 3); gr.addColorStop(0, '#e8bd7c'); gr.addColorStop(1, '#8a5a2a'); g.fillStyle = gr;
    g.beginPath(); g.ellipse(0, 0, 2.7, 1.9, 0, 0, TAU); g.fill(); g.fillStyle = 'rgba(30,18,8,0.8)'; g.beginPath(); g.arc(-0.2, 0, 0.5, 0, TAU); g.fill();
    g.fillStyle = '#4a2f18'; g.fillRect(2.4, -0.28, 3.6, 0.56); g.fillRect(5.9, -0.5, 1.0, 1.0); g.restore();
  }
  function waveTrace(g, x, y, w, h, cycles, col, lw, a, lt) {
    if (a <= 0.003) return; g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = lw; g.lineJoin = 'round'; g.beginPath();
    for (var k = 0; k <= 120; k++) { var u = k / 120, px = x + w * u, py = y + Math.sin(u * TAU * cycles - (lt || 0) * 4) * h * Math.sin(u * Math.PI) ; if (k === 0) g.moveTo(px, py); else g.lineTo(px, py); }
    g.stroke(); g.restore();
  }
  function euclidFig(g, x, y, R, p, a) {          // circle, inscribed triangle, compass arcs: draws itself
    if (a <= 0.003 || p <= 0) return; g.save(); g.globalAlpha *= a; g.lineCap = 'round';
    g.strokeStyle = 'rgba(255,226,160,0.95)'; g.lineWidth = 0.32; g.shadowColor = 'rgba(255,214,120,0.9)'; g.shadowBlur = 10;
    g.beginPath(); g.arc(x, y, R, -Math.PI / 2, -Math.PI / 2 + TAU * Math.min(1, p * 1.6)); g.stroke();
    var pts = [0, 1, 2].map(function (k) { var an = -Math.PI / 2 + k * TAU / 3; return [x + Math.cos(an) * R, y + Math.sin(an) * R]; });
    var q = clamp((p - 0.35) / 0.65);
    g.beginPath(); g.moveTo(pts[0][0], pts[0][1]);
    if (q > 0) { var t1 = Math.min(1, q * 3); g.lineTo(pts[0][0] + (pts[1][0] - pts[0][0]) * t1, pts[0][1] + (pts[1][1] - pts[0][1]) * t1); }
    if (q > 0.33) { var t2 = Math.min(1, (q - 0.33) * 3); g.lineTo(pts[1][0] + (pts[2][0] - pts[1][0]) * t2, pts[1][1] + (pts[2][1] - pts[1][1]) * t2); }
    if (q > 0.66) { var t3 = Math.min(1, (q - 0.66) * 3); g.lineTo(pts[2][0] + (pts[0][0] - pts[2][0]) * t3, pts[2][1] + (pts[0][1] - pts[2][1]) * t3); }
    g.stroke(); g.shadowBlur = 0;
    if (q > 0.9) { g.strokeStyle = 'rgba(255,226,160,0.5)'; g.lineWidth = 0.18; g.beginPath(); g.arc(x, y, R * 0.5, 0, TAU); g.stroke(); }
    g.restore();
  }
  DRAW.g1 = function (g, lt, L) {
    // act 1: Pisa
    var pA = W_(lt, 0.1, L[1] + 0.6, 0.7, 0.9);
    if (pA > 0.01) {
      ground(g, 48, pA, '#1a2018', '#0a0e0a');
      leaningTower(g, 36, 48, 1.4, pA); for (var i = 0; i < 6; i++) { var hx = 50 + i * 8, hh = 6 + (i * 37 % 4); rbox(g, hx, 48 - hh, 6.4, hh, 0.1, null, 0, '#2a2c38', pA); rbox(g, hx + 2.4, 48 - hh + 1.6, 1.5, 1.8, 0.1, null, 0, 'rgba(255,205,130,0.7)', pA * (i % 2 ? 1 : 0.4)); }
      tx(g, '1564', 66, 26, 5.2, GOLD, 'center', 900, SANS, pA * A_(lt, 0.3, 0.6)); chip(g, 66, 32, '意大利 · 比萨', FG, pA * A_(lt, 0.8, 0.5));
      baby(g, 22, 46.5, 1.0, pA * A_(lt, L[0] + 0.2, 0.6), lt);
    }
    // act 2: the father's string
    var pB = W_(lt, L[1] - 0.1, L[5] - 0.2, 0.7, 0.7);
    if (pB > 0.01) {
      vincenzo(g, 17, 49.5, 14.5, pB, { pose: 'forward' }, lt); lute(g, 25.4, 46.8, 1.1, -0.5, pB);
      var wt = 1 + 3 * A_(lt, L[4], 1.8), nb = Math.min(4, Math.floor(wt + 0.02));
      // string: from a peg on the left across a pulley, weights hang from the right end
      var sy = 36, px = 86;
      ln(g, 40, sy, px, sy, 'rgba(240,230,200,0.9)', 0.18, null, pB * A_(lt, L[2] - 0.2, 0.6));
      var pa = A_(lt, L[2] - 0.2, 0.6) * pB;
      rbox(g, 38.4, sy - 1.6, 1.4, 3.2, 0.2, null, 0, '#7a5a34', pa);
      ring(g, px, sy + 1.2, 1.2, 'rgba(240,230,200,0.9)', 0.2, pa); ln(g, px + 1.2, sy + 1.2, px + 1.2, sy + 6.4, 'rgba(240,230,200,0.9)', 0.18, null, pa);
      for (var b = 0; b < nb; b++) { var by = sy + 6.4 + b * 2.0; rbox(g, px - 1.2, by, 4.8, 1.8, 0.2, 'rgba(255,255,255,0.3)', 0.1, b === 0 ? '#8a94a8' : '#a5afc2', pa * A_(lt, L[2] + 0.1 + (b ? L[4] - L[2] + b * 0.45 - 0.1 : 0), 0.35)); }
      var vib = Math.sin(lt * 40) * 0.15 * (0.4 + 0.6 * A_(lt, L[2] + 0.3, 0.5));
      if (pa > 0.01) { g.save(); g.globalAlpha *= pa; g.strokeStyle = 'rgba(255,240,200,0.55)'; g.lineWidth = 0.14; g.beginPath(); g.moveTo(40, sy); g.quadraticCurveTo(63, sy + vib * 5, px, sy); g.stroke(); g.restore(); }
      // the note: a wave that doubles in frequency when the weight is four times larger
      var wa = A_(lt, L[2] + 0.2, 0.6) * pB;
      waveTrace(g, 48, 27.5, 32, 2.4, 2 * Math.sqrt(wt), wt > 1.2 ? '#ffd27a' : '#9fc4ff', 0.34, wa, lt);
      chip(g, 84, 27.5, wt > 3.9 ? '高八度' : '低音', wt > 3.9 ? '#ffd27a' : '#9fc4ff', wa, 'rgba(36,30,12,0.92)');
      tx(g, '1×', px + 6.0, sy + 7.3, 2.6, '#9fc4ff', 'center', 900, SANS, pa * (1 - A_(lt, L[4], 0.3)));
      tx(g, '4×', px + 6.0, sy + 10.4, 3.2, '#ffd27a', 'center', 900, SANS, pa * A_(lt, L[4] + 0.2, 0.4));
    }
    // act 3: medicine -> geometry
    var pC = A_(lt, L[5] - 0.1, 0.7);
    if (pC > 0.01) {
      var med = pC * (1 - A_(lt, L[6] + 0.6, 0.6));
      bookB(g, 36, 40, 11, 14, med, '#8a3a34', '医学', false); xMark(g, 36, 40, 4.4, '#ef5b43', pC * A_(lt, L[7] - 0.2, 0.2) * (1 - A_(lt, L[7] + 1.6, 0.6)), 0.9);
      glow(g, 70, 38, 12, 'rgba(255,214,120,0.8)', 0.25 * A_(lt, L[6], 0.8));
      euclidFig(g, 70, 38, 9, pr(lt, L[6], 3.0), 1);
      chip(g, 36, 49.4, '医学', '#ff9d8a', pC * (1 - A_(lt, L[7] + 1.6, 0.6)), 'rgba(56,24,14,0.92)');
      chip(g, 70, 49.8, '数学', GOLD, A_(lt, L[6] + 1.4, 0.6), 'rgba(48,38,12,0.92)');
      boyG(g, 50, 49.5, 12, pC, { name: '', pose: 'book' }, lt);
    }
  };

  // ---------- g2: the swinging lamp (据说) ----------
  function lamp(g, px, py, len, th, a, flame) {
    if (a <= 0.003) return; var bx = px + Math.sin(th) * len, by = py + Math.cos(th) * len;
    g.save(); g.globalAlpha *= a; g.strokeStyle = 'rgba(214,196,150,0.85)'; g.lineWidth = 0.14; g.beginPath(); g.moveTo(px, py); g.lineTo(bx, by - 1.2); g.stroke(); g.restore();
    glow(g, bx, by + 0.4, 5, 'rgba(255,190,100,0.9)', 0.6 * a * (flame == null ? 1 : flame));
    g.save(); g.globalAlpha *= a; g.translate(bx, by); g.rotate(th * 0.3);
    g.fillStyle = '#c79a45'; g.beginPath(); g.moveTo(-1.5, -1.2); g.lineTo(1.5, -1.2); g.lineTo(1.0, 1.0); g.lineTo(-1.0, 1.0); g.closePath(); g.fill();
    g.fillStyle = '#ffd88a'; g.beginPath(); g.ellipse(0, 0.1, 0.55, 0.8, 0, 0, TAU); g.fill(); g.restore();
  }
  DRAW.g2 = function (g, lt, L) {
    var pN = W_(lt, 0.1, null, 0.9);
    // nave of the cathedral
    g.save(); g.globalAlpha *= pN * 0.8; g.strokeStyle = 'rgba(214,176,120,0.22)'; g.lineWidth = 0.26;
    for (var i = 0; i < 6; i++) { var x = 8 + i * 17; g.beginPath(); g.moveTo(x - 3.6, 56); g.lineTo(x - 3.6, 30); g.arc(x, 30, 3.6, Math.PI, 0); g.lineTo(x + 3.6, 56); g.stroke(); }
    g.beginPath(); g.moveTo(0, 22); g.lineTo(100, 22); g.stroke(); g.restore();
    chip(g, 90, 24.6, '比萨大教堂', FG, A_(lt, 0.8, 0.5) * 0.9);
    stamp2(g, '据说', 58, 30, 3.0, '#ef5b43', A_(lt, L[0] + 0.3, 0.3) * W_(lt, 0.4, L[5] + 1.5, 0.3, 0.8), -0.12);
    var T = 2.2, a1 = 0.5, a2 = 0.2, t = Math.max(0, lt - (L[1] - 0.2));
    var la = A_(lt, L[1] - 0.2, 0.8) * (1 - A_(lt, L[7] - 0.1, 0.6));
    lamp(g, 56, 22, 19, a1 * Math.cos(TAU * t / T), la);
    lamp(g, 82, 22, 19, a2 * Math.cos(TAU * t / T), la);
    chip(g, 56, 46.8, '大幅摆动', '#9fc4ff', la * A_(lt, L[3], 0.5), 'rgba(20,34,56,0.92)'); chip(g, 82, 46.8, '小幅摆动', '#9fc4ff', la * A_(lt, L[3], 0.5), 'rgba(20,34,56,0.92)');
    // pulse beats: one dot per swing, both lamps fill the same number of dots
    var ca = A_(lt, L[2], 0.6) * (1 - A_(lt, L[7] - 0.1, 0.6)), nsw = Math.floor(t / T * 1.0);
    if (ca > 0.01) {
      var beat = (t * 1.5) % 1, hr = 1 + 0.25 * Math.max(0, 1 - beat * 4);
      g.save(); g.translate(18, 36); g.scale(hr, hr); g.globalAlpha *= ca; g.fillStyle = '#ef5b43'; g.beginPath(); g.moveTo(0, 1.6); g.bezierCurveTo(-3.6, -1, -1.6, -3.6, 0, -1.4); g.bezierCurveTo(1.6, -3.6, 3.6, -1, 0, 1.6); g.fill(); g.restore();
      tx(g, '脉搏', 18, 41, 1.8, FG, 'center', 700, SANS, ca);
    }
    var da = A_(lt, L[4] - 0.2, 0.6) * (1 - A_(lt, L[7] - 0.1, 0.6));
    for (i = 0; i < 6; i++) { var on = i < nsw + 1 ? 1 : 0.15; dot(g, 48 + i * 2.4, 49.6, 0.7, '#ffd27a', da * on); dot(g, 74 + i * 2.4, 49.6, 0.7, '#ffd27a', da * on); }
    // "from a pupil's memory, nothing in his hand"
    var ba = A_(lt, L[5], 0.7) * (1 - A_(lt, L[7] - 0.1, 0.6));
    if (ba > 0.01) { bookB(g, 36, 34, 8, 10, ba, '#5a4a7a', '', false); chip(g, 36, 41.4, '学生的回忆', '#c9b8ff', ba, 'rgba(36,30,60,0.92)'); }
    var na = A_(lt, L[6], 0.6) * (1 - A_(lt, L[7] - 0.1, 0.6));
    if (na > 0.01) { g.save(); g.globalAlpha *= na; paper(g, 20, 29, 8, 10, 1, 'rgba(236,226,204,0.2)'); g.restore(); xMark(g, 24, 34, 2.4, '#ef5b43', na, 0.6); chip(g, 24, 41.4, '他没写过', '#ff9d8a', na, 'rgba(56,24,14,0.92)'); }
    // later he studied it for real: longer pendulum = slower
    var pe = A_(lt, L[7] + 0.1, 0.8);
    if (pe > 0.01) {
      var tt = Math.max(0, lt - L[7]);
      lamp(g, 56, 22, 8, 0.4 * Math.cos(TAU * tt / (T / Math.SQRT2)), pe); lamp(g, 82, 22, 16, 0.4 * Math.cos(TAU * tt / T), pe);
      chip(g, 56, 36.6, '短 · 快', '#7fe0a0', pe, 'rgba(14,44,30,0.92)'); chip(g, 82, 44.6, '长 · 慢', '#7fe0a0', pe, 'rgba(14,44,30,0.92)');
    }
  };

  // ---------- g3: tie a heavy stone to a light one ----------
  function stoneB(g, x, y, r, a, col) {
    if (a <= 0.003) return; g.save(); g.globalAlpha *= a; var gr = g.createRadialGradient(x - r * 0.35, y - r * 0.4, r * 0.15, x, y, r); gr.addColorStop(0, shade(col || '#b8b2a4', 1.25)); gr.addColorStop(1, shade(col || '#b8b2a4', 0.55));
    g.fillStyle = gr; g.beginPath(); g.ellipse(x, y, r, r * 0.88, 0.2, 0, TAU); g.fill(); g.restore();
  }
  DRAW.g3 = function (g, lt, L) {
    var floor = 49;
    ground(g, floor, A_(lt, 0.1, 0.8), '#1c2230', '#0a0d14');
    aristotle(g, 13, floor + 0.2, 14, A_(lt, L[0] - 0.3, 0.8), { pose: 'forward' }, lt);
    // act 1: the old rule -- the heavy one lands first
    var p1 = W_(lt, L[1] - 0.1, L[3] + 0.4, 0.6, 0.9);
    if (p1 > 0.01) {
      var t = Math.max(0, lt - (L[1] + 0.4)) % 3.2, fh = Math.min(1, t / 1.0), fl = Math.min(1, t / 1.7);
      var yh = 27 + (floor - 2.4 - 27) * fh * fh, yl = 27 + (floor - 1.4 - 27) * fl * fl;
      stoneB(g, 46, yh, 2.4, p1, '#9a9488'); stoneB(g, 58, yl, 1.4, p1, '#c7c1b3');
      chip(g, 42, 24, '重 · 先落地', '#ffd27a', p1, 'rgba(36,30,12,0.92)'); chip(g, 62, 24, '轻 · 后落地', '#9fc4ff', p1, 'rgba(20,34,56,0.92)');
    }
    // two thousand years: a row of students
    var p2 = W_(lt, L[2], L[3] + 0.2, 0.6, 0.8);
    if (p2 > 0.01) { for (var i = 0; i < 9; i++) person(g, 36 + i * 6.4, floor + 2.6, 1.0, p2 * A_(lt, L[2] + i * 0.1, 0.4), 'rgba(170,184,208,0.7)'); chip(g, 64, 31.6, '两千年', '#ff9d6e', p2, 'rgba(56,30,14,0.92)'); }
    // the thought experiment
    galileo(g, 27, floor + 0.2, 14, A_(lt, L[3] - 0.2, 0.7), { pose: 'up' }, lt);
    var hv = [46, 30], lg = [55.5, 30];
    var s5 = A_(lt, L[4], 0.6) * (1 - A_(lt, L[6] - 0.1, 0.5)), tie = A_(lt, L[5], 0.8);
    if (s5 > 0.01) {
      stoneB(g, hv[0], hv[1], 2.6, s5, '#9a9488'); stoneB(g, lg[0], lg[1] + 0.2, 1.5, s5, '#c7c1b3');
      if (tie > 0.01) { var rx = hv[0] + 2.4 + (lg[0] - 1.3 - hv[0] - 2.4) * tie; ln(g, hv[0] + 2.4, hv[1] + 0.3, rx, lg[1] + 0.3, '#c79a45', 0.34, [0.8, 0.4], 1); }
      chip(g, hv[0], 36, '重', '#ffd27a', s5, 'rgba(36,30,12,0.92)'); chip(g, lg[0], 36, '轻', '#9fc4ff', s5, 'rgba(20,34,56,0.92)');
    }
    // panel 1: the light one holds the heavy one back
    var v1 = A_(lt, L[6], 0.7), L0 = 9;
    if (v1 > 0.01) {
      var x1 = 56, y1 = 28;
      chip(g, x1, 22.6, '① 轻的拖后腿', '#9fc4ff', v1, 'rgba(20,34,56,0.92)');
      stoneB(g, x1 - 2.4, y1, 2.6, v1, '#9a9488'); stoneB(g, x1 + 2.2, y1 + 0.2, 1.5, v1, '#c7c1b3'); ln(g, x1 - 0.2, y1 + 0.3, x1 + 1.0, y1 + 0.3, '#c79a45', 0.34, null, v1);
      g.save(); g.globalAlpha *= v1; g.setLineDash([0.7, 0.5]); g.strokeStyle = 'rgba(255,210,122,0.8)'; g.lineWidth = 0.16; g.beginPath(); g.moveTo(x1 - 8, y1 + 4 + L0); g.lineTo(x1 + 8, y1 + 4 + L0); g.stroke(); g.restore();
      arrow(g, x1, y1 + 4, x1, y1 + 4 + 6 * A_(lt, L[6] + 0.3, 0.6), '#9fc4ff', 0.6, v1, 1.1);
      tx(g, '比重石单独落', x1 + 9.4, y1 + 4 + L0, 1.5, 'rgba(255,210,122,0.9)', 'left', 700, SANS, v1);
      chip(g, x1 + 6.2, y1 + 4 + 3.6, '更慢', '#9fc4ff', v1 * A_(lt, L[6] + 0.8, 0.5), 'rgba(20,34,56,0.92)');
    }
    var v2 = A_(lt, L[7], 0.7);
    if (v2 > 0.01) {
      var x2 = 84, y2 = 28;
      chip(g, x2, 22.6, '② 合起来更重', '#ffd27a', v2, 'rgba(36,30,12,0.92)');
      stoneB(g, x2 - 1.2, y2, 2.6, v2, '#9a9488'); stoneB(g, x2 + 1.6, y2 + 0.4, 1.9, v2, '#a8a294');
      g.save(); g.globalAlpha *= v2; g.setLineDash([0.7, 0.5]); g.strokeStyle = 'rgba(255,210,122,0.8)'; g.lineWidth = 0.16; g.beginPath(); g.moveTo(x2 - 8, y2 + 4 + L0); g.lineTo(x2 + 8, y2 + 4 + L0); g.stroke(); g.restore();
      arrow(g, x2, y2 + 4, x2, y2 + 4 + 13 * A_(lt, L[7] + 0.3, 0.6), '#ffd27a', 0.6, v2, 1.1);
      chip(g, x2, y2 + 4 + 13 + 2.8, '更快', '#ffd27a', v2 * A_(lt, L[7] + 0.8, 0.5), 'rgba(36,30,12,0.92)');
    }
    var v3 = A_(lt, L[8], 0.5) * (1 - A_(lt, L[9] + 1.2, 0.5));
    if (v3 > 0.01) { var pop = 1 + 0.25 * Math.max(0, 1 - (lt - L[8]) * 4); g.save(); g.translate(70, 38); g.scale(pop, pop); tx(g, '矛盾', 0, 0, 3.6, '#ef5b43', 'center', 900, SANS, v3); g.restore(); }
    var v4 = A_(lt, L[9], 0.3);
    if (v4 > 0.01) { stamp2(g, '“重的落得快”不成立', 66, 51.2, 2.2, '#ef5b43', v4, 0); }
  };

  // ---------- g4: the inclined plane ----------
  DRAW.g4 = function (g, lt, L) {
    var pT = W_(lt, 0.1, L[2] + 0.2, 0.6, 0.9);
    if (pT > 0.01) {
      leaningTower(g, 26, 49, 1.7, pT * 0.7);
      var by = 25 + 22 * Math.pow(((lt * 0.5) % 1), 2); dot(g, 31.4, by, 0.9, '#c7c1b3', pT * 0.5 * A_(lt, L[0] + 0.3, 0.5));
      stamp2(g, '多半是后人加的', 58, 38, 2.6, '#ef5b43', A_(lt, L[1] + 0.2, 0.3) * pT, -0.08);
    }
    // the ramp
    var rp = A_(lt, L[2] - 0.2, 0.9), x0 = 36, y0 = 28.5, x1 = 92, y1 = 47, ang = Math.atan2(y1 - y0, x1 - x0), RL = Math.hypot(x1 - x0, y1 - y0);
    if (rp > 0.01) {
      g.save(); g.globalAlpha *= rp; g.strokeStyle = '#c79a45'; g.lineWidth = 0.7; g.lineCap = 'round'; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x0 + (x1 - x0) * eo(rp), y0 + (y1 - y0) * eo(rp)); g.stroke();
      g.strokeStyle = 'rgba(199,154,69,0.4)'; g.lineWidth = 0.2; for (var k = 0; k <= 16; k++) { var u = k / 16; g.beginPath(); g.moveTo(x0 + (x1 - x0) * u, y0 + (y1 - y0) * u + 0.35); g.lineTo(x0 + (x1 - x0) * u, y0 + (y1 - y0) * u + 1.6); g.stroke(); } g.restore();
    }
    // a free fall is too quick to see
    var fa = W_(lt, L[3], L[4] - 0.2, 0.4, 0.5);
    if (fa > 0.01) { var ft = ((lt - L[3]) * 1.7) % 1; var fy = 24 + 22 * ft * ft; dot(g, 20, fy, 1.0, '#c7c1b3', fa); ln(g, 20, fy - 6 * ft, 20, fy - 0.5, 'rgba(199,193,179,0.4)', 0.5, null, fa); chip(g, 20, 52, '太快，看不清', '#ff9d6e', fa, 'rgba(56,30,14,0.92)'); }
    // the ball on the ramp: s = (1/2) a t^2 ; tick every "second"
    var UNIT = RL / 16.8, tau = Math.max(0, lt - (L[4] + 0.4)) / 1.45, cyc = tau % 5.6;
    var pa = A_(lt, L[4] - 0.2, 0.6) * (1 - 0);
    function onRamp(s) { return [x0 + Math.cos(ang) * s * UNIT, y0 + Math.sin(ang) * s * UNIT]; }
    if (pa > 0.01) {
      var s = 0.5 * cyc * cyc * 1.0; if (s > 16.5) s = 16.5; var bp = onRamp(s);
      if (cyc < 5.0 && lt > L[4] + 0.4) { var tr = 3; for (k = 1; k <= tr; k++) { var ss = Math.max(0, 0.5 * (cyc - k * 0.06) * (cyc - k * 0.06)); var q = onRamp(Math.min(ss, 16.5)); dot(g, q[0] + Math.sin(ang) * 0.9, q[1] - Math.cos(ang) * 0.9, 1.0 - k * 0.2, 'rgba(255,230,180,0.5)', pa * (0.35 - k * 0.08)); } }
      dot(g, bp[0] + Math.sin(ang) * 1.0, bp[1] - Math.cos(ang) * 1.0, 1.0, '#e8d9b0', pa);
    }
    // water clock
    var wc = A_(lt, L[5], 0.7);
    if (wc > 0.01) {
      g.save(); g.globalAlpha *= wc; g.strokeStyle = '#9fd0ff'; g.lineWidth = 0.22; g.beginPath(); g.moveTo(84, 21); g.lineTo(85, 29); g.lineTo(90, 29); g.lineTo(91, 21); g.stroke();
      var lv = 8 * (1 - 0.6 * ((lt * 0.2) % 1)); g.fillStyle = 'rgba(100,170,240,0.5)'; g.fillRect(85.1, 29 - lv, 4.8, lv - 0.1); dot(g, 87.5, 30.6 + ((lt * 2) % 1) * 3, 0.3, '#9fd0ff', 0.9);
      g.restore(); tx(g, '水钟', 87.5, 33.6, 1.8, '#9fd0ff', 'center', 700, SANS, wc);
    }
    // the law: marks at t = 1,2,3,4 -> 1, 4, 9, 16
    var mk = A_(lt, L[7] - 0.2, 0.5);
    if (mk > 0.01) {
      for (var n = 1; n <= 4; n++) {
        var pn = A_(lt, L[7] + (n - 1) * 0.55, 0.4); if (pn < 0.01) continue; var q2 = onRamp(n * n);
        ln(g, q2[0], q2[1] + 1.0, q2[0], q2[1] + 3.6, '#ffd27a', 0.22, null, pn); dot(g, q2[0] + Math.sin(ang) * 1.0, q2[1] - Math.cos(ang) * 1.0, 0.75, '#ffd27a', pn * 0.8);
        tx(g, String(n * n), q2[0], q2[1] + 5.0, 2.2, '#ffd27a', 'center', 900, SANS, pn); tx(g, n + ' 秒', q2[0], q2[1] - 3.6, 1.6, DIM, 'center', 700, SANS, pn);
      }
      chip(g, 44, 41.4, '路程 ∝ 时间²', '#ffd27a', A_(lt, L[7] + 0.5, 0.6), 'rgba(36,30,12,0.92)');
    }
    // each new interval adds 1, 3, 5, 7
    var od = A_(lt, L[8], 0.5);
    if (od > 0.01) {
      var prev = 0; for (var m = 1; m <= 4; m++) {
        var pm = A_(lt, L[9] + (m - 1) * 0.5, 0.4); var a1 = onRamp(prev * prev || 0), a2 = onRamp(m * m); prev = m;
        g.save(); g.globalAlpha *= od * pm; g.strokeStyle = m % 2 ? '#7fe0a0' : '#9fc4ff'; g.lineWidth = 0.6; g.beginPath(); g.moveTo(a1[0], a1[1] - 2.8); g.lineTo(a2[0], a2[1] - 2.8); g.stroke(); g.restore();
        tx(g, String(2 * m - 1), (a1[0] + a2[0]) / 2, (a1[1] + a2[1]) / 2 - 5.6, 2.8, m % 2 ? '#7fe0a0' : '#9fc4ff', 'center', 900, SANS, od * pm);
      }
    }
  };

  // ---------- g5: grinding lenses; 3x -> 9x -> 20x ----------
  function lensSide(g, x, y, h, w, a, convex) {
    if (a <= 0.003) return; g.save(); g.globalAlpha *= a; g.fillStyle = 'rgba(160,210,255,0.28)'; g.strokeStyle = 'rgba(200,230,255,0.9)'; g.lineWidth = 0.2; g.beginPath();
    if (convex) { g.moveTo(x, y - h / 2); g.quadraticCurveTo(x + w, y, x, y + h / 2); g.quadraticCurveTo(x - w, y, x, y - h / 2); } else { g.moveTo(x - w * 0.6, y - h / 2); g.quadraticCurveTo(x + w * 0.1, y, x - w * 0.6, y + h / 2); g.lineTo(x + w * 0.6, y + h / 2); g.quadraticCurveTo(x - w * 0.1, y, x + w * 0.6, y - h / 2); g.closePath(); }
    g.fill(); g.stroke(); g.restore();
  }
  DRAW.g5 = function (g, lt, L) {
    // 1. a Dutch spyglass in a rumour
    var p1 = W_(lt, 0.1, L[3] - 0.1, 0.7, 0.7);
    if (p1 > 0.01) {
      chip(g, 24, 29.6, '荷兰 · 窥镜', GOLD, p1, 'rgba(48,38,12,0.92)');
      telescope(g, 24, 38, 9, -0.3, p1, { th: 1.4 });
      var far = A_(lt, 1.6, 0.8) * p1;
      g.save(); g.globalAlpha *= far; var cx = 64, cy = 38; g.strokeStyle = 'rgba(200,220,255,0.5)'; g.lineWidth = 0.2; g.beginPath(); g.arc(cx, cy, 8, 0, TAU); g.stroke();
      g.beginPath(); g.arc(cx, cy, 8, 0, TAU); g.clip(); leaningTower(g, cx, cy + 8, 0.9 + 0.5 * A_(lt, 3.0, 0.8), 1); g.restore();
      chip(g, 64, 49.2, '远处的塔', DIM, far * (1 - A_(lt, 3.0, 0.5)), 'rgba(20,34,56,0.92)'); chip(g, 64, 49.2, '拉近了', '#7fe0a0', far * A_(lt, 3.4, 0.5), 'rgba(14,44,30,0.92)');
    }
    // 2. hearsay -> grinding glass
    var p2 = W_(lt, L[2] - 0.1, L[4] - 0.2, 0.7, 0.7);
    if (p2 > 0.01) {
      var bub = A_(lt, L[2], 0.6) * (1 - A_(lt, L[3] - 0.1, 0.5)) * p2; if (bub > 0.01) { chip(g, 56, 31, '只听说了大概', '#ff9d6e', bub, 'rgba(56,30,14,0.92)'); }
      galileo(g, 26, 49.5, 14, p2, { pose: 'forward' }, lt);
      var gp = A_(lt, L[3], 0.6) * p2; if (gp > 0.01) {
        var an = lt * 3; g.save(); g.globalAlpha *= gp; g.translate(54, 43); g.fillStyle = '#6b4a2e'; g.beginPath(); g.ellipse(0, 0, 8, 2.2, 0, 0, TAU); g.fill();
        g.fillStyle = 'rgba(190,225,255,0.55)'; g.beginPath(); g.ellipse(Math.cos(an) * 0.6, -1.2 + Math.sin(an) * 0.25, 5.2, 1.2, 0, 0, TAU); g.fill(); g.restore();
        lensSide(g, 76, 38, 9, 3.2, gp, true); lensSide(g, 86, 38, 9, 3.2, gp, false);
        var rp2 = 0.7 * gp; for (var k = -1; k <= 1; k++) { ln(g, 66, 38 + k * 2.8, 76, 38 + k * 1.2, 'rgba(255,240,180,0.7)', 0.14, null, rp2); ln(g, 76, 38 + k * 1.2, 94, 38, 'rgba(255,240,180,0.45)', 0.14, null, rp2); }
        chip(g, 54, 49.2, '自己磨镜片', GOLD, gp, 'rgba(48,38,12,0.92)');
      }
    }
    // 3. 3x, 9x, 20x -- longer and longer
    var p3 = A_(lt, L[4] - 0.1, 0.7);
    if (p3 > 0.01) {
      var ln3 = 12 + 6 * A_(lt, L[5], 0.7) + 11 * A_(lt, L[6], 0.8), ang = -0.18 - 0.85 * A_(lt, L[7], 1.2);
      var cx3 = 54, cy3 = 40 - 6 * A_(lt, L[7], 1.2);
      tripod(g, cx3, cy3 + 1, 9, p3);
      telescope(g, cx3, cy3, ln3, ang, p3, { glow: 0.5 * A_(lt, L[6], 0.8), segs: ln3 > 20 ? [[0, 0.25, 1.0], [0.25, 0.5, 0.86], [0.5, 0.75, 0.74], [0.75, 1.0, 0.62]] : undefined });
      var mag = lt < L[5] ? '3×' : lt < L[6] ? '9×' : '20×';
      tx(g, mag, 82, 40, 5.4, lt < L[6] ? '#9fc4ff' : '#ffd27a', 'center', 900, SANS, p3);
      if (lt >= L[7]) { var sk = A_(lt, L[7] + 0.4, 0.8); stars(g, 0.9 * sk, lt, 8, 50, 28); glow(g, cx3 + Math.cos(ang) * ln3 / 2 + 6, cy3 + Math.sin(ang) * ln3 / 2 - 6, 10, 'rgba(255,240,200,0.8)', 0.25 * sk); chip(g, 78, 28.6, '夜空', FG, sk, 'rgba(20,34,56,0.92)'); }
    }
  };
