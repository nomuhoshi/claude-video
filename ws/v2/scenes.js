// Scenes for the style-v2 test piece: Kepler and the eight arc-minutes.
(function () {
  var TL = window.TL, S = TL.scn;
  var CX = 1180, CY = 640, A = 300, B = 268, C = Math.sqrt(A * A - B * B), ECC = C / A, SX = CX + C, SY = CY, P = 5.6;
  function kep(Mn) { var e = Mn; for (var i = 0; i < 12; i++) e = e - (e - ECC * Math.sin(e) - Mn) / (1 - ECC * Math.cos(e)); return e; }
  function posM(Mn) { var e = kep(Mn); return [CX + A * Math.cos(e), CY - B * Math.sin(e)]; }
  function marsAt(t) { return posM(Math.PI + 2 * Math.PI * (t - 1.0) / P); }
  // the recorded positions: one every 0.4 s of Mars's motion in scene A (dense where it is slow)
  var PTS = []; for (var k = 0; k < 14; k++) { var p = posM(Math.PI + 2 * Math.PI * k / 14); PTS.push({ x: p[0], y: p[1], t: 1.0 + 0.4 * k }); }
  // best-fit circle (what 70 trials converge to) and its three worst points
  var fx = 0, fy = 0; PTS.forEach(function (p) { fx += p.x; fy += p.y; }); fx /= PTS.length; fy /= PTS.length;
  var fr = 0; PTS.forEach(function (p) { fr += Math.hypot(p.x - fx, p.y - fy); }); fr /= PTS.length;
  PTS.forEach(function (p) { p.res = Math.abs(Math.hypot(p.x - fx, p.y - fy) - fr); });
  var order = PTS.slice().sort(function (a, b) { return b.res - a.res; }); order.slice(0, 3).forEach(function (p) { p.bad = true; });
  var WORST = order[0];
  function count(t) { if (t < TL.c0) return 0; var u = Math.min(1, (t - TL.c0) / (TL.c1 - TL.c0)); return Math.max(1, Math.min(70, Math.floor(1 + 69 * Math.pow(u, 2.4)))); }
  function trial(n) {            // circle for trial n: wanders, then settles on the best fit
    var f = Math.exp(-n / 13);
    return [fx + 90 * f * Math.cos(n * 1.7 + 0.4), fy - 60 * f * Math.sin(n * 2.3 + 1), fr - 45 * f * Math.cos(n * 2.9)];
  }
  var HITS = [8.8, 9.6, 10.4, 11.2, 11.6, 12.0, 12.4, 12.8, 13.2, 13.6, 14.0, 14.2, 14.4, 14.6, 14.8, 15.0, 15.2, 15.4, 15.6, 15.8, 16.0, 16.2];
  function since(list, t) { var d = 99; list.forEach(function (h) { if (t >= h && t - h < d) d = t - h; }); return d; }

  function glowDot(g, x, y, r, col, glow) {
    var gr = g.createRadialGradient(x, y, 0, x, y, r * glow); gr.addColorStop(0, col); gr.addColorStop(0.25, col.replace(/[\d.]+\)$/, '0.35)')); gr.addColorStop(1, col.replace(/[\d.]+\)$/, '0)'));
    g.fillStyle = gr; g.beginPath(); g.arc(x, y, r * glow, 0, 6.29); g.fill();
    g.fillStyle = col; g.beginPath(); g.arc(x, y, r, 0, 6.29); g.fill();
  }
  function sun(g, t, a) {
    if (a <= 0) return; g.save(); g.globalAlpha = a;
    var gr = g.createRadialGradient(SX, SY, 0, SX, SY, 190); gr.addColorStop(0, 'rgba(255,215,140,0.55)'); gr.addColorStop(0.3, 'rgba(255,170,80,0.16)'); gr.addColorStop(1, 'rgba(255,150,60,0)');
    g.fillStyle = gr; g.fillRect(SX - 190, SY - 190, 380, 380);
    for (var i = 0; i < 12; i++) { var an = i / 12 * 6.283 + t * 0.15; g.strokeStyle = 'rgba(255,215,150,0.10)'; g.lineWidth = 2; g.beginPath(); g.moveTo(SX + Math.cos(an) * 30, SY + Math.sin(an) * 30); g.lineTo(SX + Math.cos(an) * (70 + 12 * Math.sin(t * 2 + i)), SY + Math.sin(an) * (70 + 12 * Math.sin(t * 2 + i))); g.stroke(); }
    glowDot(g, SX, SY, 20, 'rgba(255,236,190,1)', 2.4); g.restore();
  }
  function mars(g, t, a, label) {
    if (a <= 0) return; g.save(); g.globalAlpha = a;
    for (var i = 24; i >= 1; i--) { var p0 = marsAt(t - i * 0.035), p1 = marsAt(t - (i - 1) * 0.035); g.strokeStyle = 'rgba(255,120,80,' + (0.5 * (1 - i / 24)).toFixed(3) + ')'; g.lineWidth = 4 * (1 - i / 30); g.beginPath(); g.moveTo(p0[0], p0[1]); g.lineTo(p1[0], p1[1]); g.stroke(); }
    var p = marsAt(t); glowDot(g, p[0], p[1], 9, 'rgba(255,110,70,1)', 3.2);
    if (label) { g.font = '700 22px "Noto Serif CJK SC"'; g.fillStyle = 'rgba(255,170,140,0.85)'; g.fillText('火星', p[0] + 16, p[1] - 14); }
    g.restore();
  }
  function cross(g, x, y, s, col, lw) { g.strokeStyle = col; g.lineWidth = lw; g.beginPath(); g.moveTo(x - s, y - s); g.lineTo(x + s, y + s); g.moveTo(x + s, y - s); g.lineTo(x - s, y + s); g.stroke(); }
  // the recorded points.  mode: 'rec' (just recorded), 'fit' (against circle cc), 'final' (3 bad ones red), 'lit' (ellipse found)
  function points(g, t, mode, cc, litT) {
    PTS.forEach(function (p, i) {
      if (t < p.t) return; var age = t - p.t;
      if (age < 0.6) { g.strokeStyle = 'rgba(255,230,180,' + (0.8 * (1 - age / 0.6)).toFixed(3) + ')'; g.lineWidth = 2; g.beginPath(); g.arc(p.x, p.y, 8 + age * 90, 0, 6.29); g.stroke(); }
      var col = 'rgba(240,200,120,0.95)', bad = false;
      if (mode === 'fit' && cc) { var dd = Math.abs(Math.hypot(p.x - cc[0], p.y - cc[1]) - cc[2]); bad = p.bad ? dd > 4 : dd > p.res + 7; }
      if (mode === 'final') bad = p.bad;
      if (bad) col = 'rgba(239,91,67,1)';
      var s = 9;
      if (mode === 'lit') { var d = t - litT[i]; if (d >= 0) { col = 'rgba(255,236,190,1)'; if (d < 0.7) { g.strokeStyle = 'rgba(255,220,150,' + (0.9 * (1 - d / 0.7)).toFixed(3) + ')'; g.lineWidth = 3; g.beginPath(); g.arc(p.x, p.y, 10 + d * 70, 0, 6.29); g.stroke(); } } }
      g.save(); g.shadowColor = col; g.shadowBlur = 14; cross(g, p.x, p.y, s, col, 3);
      if (bad) { g.strokeStyle = col; g.lineWidth = 1.5; g.globalAlpha = 0.6 + 0.4 * Math.sin(t * 9); g.beginPath(); g.arc(p.x, p.y, 20, 0, 6.29); g.stroke(); }
      g.restore();
    });
  }
  function circle(g, cc, a, flash, sweep) {
    if (a <= 0) return; g.save(); g.globalAlpha = a; g.strokeStyle = flash > 0 ? 'rgba(200,225,255,1)' : 'rgba(134,182,255,0.95)'; g.lineWidth = 2.5 + 3 * flash;
    g.shadowColor = '#86b6ff'; g.shadowBlur = 16 + 30 * flash; g.beginPath(); g.arc(cc[0], cc[1], cc[2], -Math.PI / 2, -Math.PI / 2 + 6.2832 * (sweep == null ? 1 : sweep)); g.stroke();
    g.fillStyle = 'rgba(134,182,255,0.8)'; g.beginPath(); g.arc(cc[0], cc[1], 4, 0, 6.29); g.fill(); g.restore();
  }
  function ellipse(g, a, sweep, glow) {
    if (a <= 0) return; g.save(); g.globalAlpha = a; g.strokeStyle = 'rgba(255,214,140,1)'; g.lineWidth = 3.5; g.shadowColor = '#f0bd5c'; g.shadowBlur = 22 + glow;
    g.beginPath(); for (var i = 0; i <= 240 * sweep; i++) { var e = i / 240 * 6.2832; var x = CX + A * Math.cos(e), y = CY - B * Math.sin(e); if (i === 0) g.moveTo(x, y); else g.lineTo(x, y); } g.stroke(); g.restore();
  }
  function label(g, x, y, s, a, col, size) { if (a <= 0) return; g.save(); g.globalAlpha = a; g.font = '700 ' + (size || 24) + 'px "Noto Serif CJK SC"'; g.fillStyle = col || 'rgba(235,225,205,0.9)'; g.textAlign = 'center'; g.shadowColor = 'rgba(0,0,0,0.9)'; g.shadowBlur = 10; g.fillText(s, x, y); g.restore(); }
  // ticks bar, like the reference's tally bars
  function ticks(g, x, y, n, col, a) {
    g.save(); g.globalAlpha = a; g.fillStyle = col; g.shadowColor = col; g.shadowBlur = 8;
    for (var i = 0; i < n; i++) g.fillRect(x + i * 7, y - 34, 3.2, 34); g.restore();
  }
  // the scroll (Astronomia Nova)
  function scroll(g, t, a) {
    if (a <= 0) return; var cx = 1360, cy = 620, w = 40 + 720 * back((t - 36.8) / 0.8), h = 440;
    g.save(); g.globalAlpha = a;
    g.shadowColor = 'rgba(0,0,0,0.7)'; g.shadowBlur = 40;
    var pg = g.createLinearGradient(0, cy - h / 2, 0, cy + h / 2); pg.addColorStop(0, '#b9a37a'); pg.addColorStop(0.5, '#ae976b'); pg.addColorStop(1, '#937d55');
    g.fillStyle = pg; g.fillRect(cx - w / 2, cy - h / 2, w, h); g.shadowBlur = 0;
    g.save(); g.beginPath(); g.rect(cx - w / 2, cy - h / 2, w, h); g.clip();
    for (var i = 0; i < 60; i++) { g.strokeStyle = 'rgba(120,90,50,' + (0.03 + 0.04 * rnd2(i)).toFixed(3) + ')'; g.lineWidth = 1; g.beginPath(); g.moveTo(cx - 400, cy - h / 2 + rnd2(i + 9) * h); g.lineTo(cx + 400, cy - h / 2 + rnd2(i + 19) * h); g.stroke(); }
    g.strokeStyle = 'rgba(140,40,30,0.55)'; g.lineWidth = 2; g.strokeRect(cx - w / 2 + 26, cy - h / 2 + 22, w - 52, h - 44);
    // columns, right to left
    var cols = [[38.4, '单单这八角分', [3, 4, 5]], [40.8, '就将带领我们', []], [41.6, '改革整个天文学', [0, 1]]];
    cols.forEach(function (c, ci) {
      var x = cx + 250 - ci * 100;
      for (var k = 0; k < c[1].length; k++) {
        var p = cl2((t - c[0] - k * 0.07) / 0.3); if (p <= 0) continue; var red = c[2].indexOf(k) >= 0;
        g.save(); g.globalAlpha = p; if (p < 1) g.filter = 'blur(' + ((1 - p) * 6).toFixed(1) + 'px)';
        g.font = '900 ' + (red ? 56 : 48) + 'px "Noto Serif CJK SC"'; g.fillStyle = red ? '#9e1e14' : '#1c140d'; g.textAlign = 'center';
        g.fillText(c[1][k], x, cy - h / 2 + 96 + k * 54); g.restore();
      }
    });
    var sp = cl2((t - 37.6) / 0.6);
    g.globalAlpha = a * sp * 0.75; g.font = '700 26px "Noto Serif CJK SC"'; g.fillStyle = '#5a4630'; g.textAlign = 'center';
    '开普勒 · 新天文学'.split('').forEach(function (ch, k) { g.fillText(ch, cx - 210, cy - h / 2 + 90 + k * 34); });
    // the seal
    var st = t - 44.0;
    if (st >= 0) {
      var s = 1 + 0.7 * Math.exp(-st / 0.06) * (st < 0.12 ? 1 : 0), sx = cx - 300, sy = cy + 90;
      g.globalAlpha = a * Math.min(1, st / 0.05) * 0.92; g.translate(sx, sy); g.scale(s, s); g.rotate(-0.04);
      g.fillStyle = '#b3261a'; g.fillRect(-56, -56, 112, 112); g.fillStyle = '#efd9b8'; g.font = '900 40px "Noto Serif CJK SC"'; g.textAlign = 'center';
      g.fillText('新', 22, -8); g.fillText('天', 22, 40); g.fillText('文', -22, -8); g.fillText('学', -22, 40);
    }
    g.restore();
    // rods
    [-1, 1].forEach(function (sd) {
      var x = cx + sd * w / 2; var rg = g.createLinearGradient(x - 14, 0, x + 14, 0); rg.addColorStop(0, '#3a2414'); rg.addColorStop(0.5, '#8a5a32'); rg.addColorStop(1, '#2a180c');
      g.fillStyle = rg; g.fillRect(x - 13, cy - h / 2 - 26, 26, h + 52); g.fillStyle = '#c9a052'; g.fillRect(x - 16, cy - h / 2 - 34, 32, 12); g.fillRect(x - 16, cy + h / 2 + 22, 32, 12);
    });
    g.restore();
    label(g, cx, cy + h / 2 + 76, '开普勒《新天文学》第 19 章 · 1609', a * sp * 0.7, 'rgba(190,175,150,0.9)', 22);
  }
  function rnd2(s) { var x = Math.sin(s * 91.7 + 17.3) * 43758.5453; return x - Math.floor(x); }
  function cl2(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function impactLines(g, x, y, t0, t, col) {
    var d = t - t0; if (d < 0 || d > 0.5) return; g.save(); g.strokeStyle = col; g.globalAlpha = 1 - d / 0.5; g.lineWidth = 4;
    for (var i = 0; i < 14; i++) { var an = i / 14 * 6.283 + 0.2, r0 = 150 + d * 500, r1 = r0 + 60 + 40 * rnd2(i); g.beginPath(); g.moveTo(x + Math.cos(an) * r0, y + Math.sin(an) * r0 * 0.7); g.lineTo(x + Math.cos(an) * r1, y + Math.sin(an) * r1 * 0.7); g.stroke(); }
    g.restore();
  }
  // circle breaking into dust (scene F)
  var SHARDS = []; for (var i = 0; i < 160; i++) SHARDS.push([i / 160 * 6.283, rnd2(i) * 2 - 1, rnd2(i + 300), rnd2(i + 600)]);
  function breakCircle(g, t, cc) {
    var d = t - 48.0; if (d < 0) { circle(g, cc, 1, 0); return; } if (d > 2.4) return;
    g.save(); SHARDS.forEach(function (s) {
      var r = cc[2] + d * (40 + 120 * s[2]) * (s[1] > 0 ? 1 : 0.6), an = s[0] + d * 0.2 * s[1];
      var x = cc[0] + Math.cos(an) * r, y = cc[1] + Math.sin(an) * r + d * d * 30 * s[3];
      g.fillStyle = 'rgba(160,200,255,' + (0.9 * (1 - d / 2.4)).toFixed(3) + ')'; g.fillRect(x, y, 2.4, 2.4);
    }); g.restore();
  }

  var LAYER = document.createElement('canvas'); LAYER.width = 1920; LAYER.height = 1080; var LG = LAYER.getContext('2d');
  var FINAL = trial(70);
  var LIT = PTS.map(function (p) { var e = Math.atan2(-(p.y - CY) / B, (p.x - CX) / A); if (e < 0) e += 6.2832; return 52.8 + 0.9 * e / 6.2832; });

  function world(g, t) {      // the orbit layer used by scenes A, B, C, F, G
    var n = count(t), cc = t < TL.c0 ? trial(0) : trial(n);
    if (t < S.B[0]) {                                  // A: Mars runs, positions get recorded
      sun(g, t, E2(t / 1.2)); mars(g, t, E2((t - 0.4) / 0.8), true); points(g, t, 'rec');
    } else if (t < S.C[0]) {                           // B: trial circles
      sun(g, t, 1); mars(g, t, 0.45, false);
      var fl = Math.max(0, 1 - since(HITS, t) / 0.12);
      circle(g, cc, E2((t - 6.6) / 0.6), fl, cl2((t - 6.6) / 0.9)); points(g, t, t < TL.c0 ? 'rec' : 'fit', cc);
    } else if (t < S.F[0]) {                           // C (and D/E background): the final circle; three points refuse to fit
      sun(g, t, 1); circle(g, FINAL, 1, 0); points(g, t, 'final');
      var bp = WORST; var pr = cl2((t - 22.4) / 1.6);
      if (pr > 0 && t < 24.0) { g.save(); g.strokeStyle = 'rgba(239,91,67,0.8)'; g.setLineDash([6, 6]); g.lineWidth = 2; var ang = Math.atan2(bp.y - FINAL[1], bp.x - FINAL[0]);
        g.beginPath(); g.moveTo(FINAL[0] + Math.cos(ang) * FINAL[2], FINAL[1] + Math.sin(ang) * FINAL[2]); g.lineTo(bp.x, bp.y); g.stroke(); g.restore(); }
    } else if (t < S.G[0]) {                           // F: the circle breaks
      sun(g, t, 1); breakCircle(g, t, FINAL); points(g, t, 'final');
      if (t > 49) { g.save(); g.globalAlpha = 0.25 + 0.2 * Math.sin(t * 3); g.setLineDash([4, 10]); ellipse(g, 0.35, 1, 0); g.restore(); }
    } else {                                           // G: the ellipse
      var sw = cl2((t - 52.8) / 0.9);
      sun(g, t, 1); ellipse(g, 1, sw, 30 * Math.exp(-(t - 52.8) / 0.6)); points(g, t, 'lit', null, LIT);
      if (sw > 0.2) mars(g, t, E2((t - 53.4) / 0.6), true);
      var fa = E2((t - 57.6) / 0.6);
      label(g, SX + 4, SY + 62, '太阳 = 焦点', fa, 'rgba(255,220,160,0.95)', 26);
      if (fa > 0) { g.save(); g.globalAlpha = fa * 0.7; g.strokeStyle = 'rgba(255,214,140,0.8)'; g.lineWidth = 2; g.beginPath(); g.arc(CX - C, CY, 7, 0, 6.29); g.stroke(); g.restore(); label(g, CX - C, CY + 44, '另一个焦点', fa * 0.6, null, 20);
        g.save(); g.globalAlpha = fa * 0.4; g.setLineDash([3, 7]); g.strokeStyle = 'rgba(255,214,140,0.8)'; g.beginPath(); g.moveTo(CX - C, CY); g.lineTo(SX, SY); g.stroke(); g.restore(); }
    }
  }
  function E2(x) { x = cl2(x); return x * x * (3 - 2 * x); }

  window.SCENE = function (g, t) {
    // camera: zoom toward the worst point during the music's break, hold it as a dim backdrop in D
    var z = 1, zx = WORST.x, zy = WORST.y, wa = 1;
    if (t >= 22.4 && t < S.F[0]) { z = 1 + 1.5 * E2((t - 22.4) / 1.6); }
    if (t >= S.D[0] && t < S.F[0]) wa = 1 - 0.7 * E2((t - S.D[0]) / 0.3);
    if (t >= S.E[0] - 0.4 && t < S.F[0]) wa = 0.3 * (1 - E2((t - (S.E[0] - 0.4)) / 0.8));
    if (t >= S.F[0] - 0.6 && t < S.F[0]) { wa = E2((t - (S.F[0] - 0.6)) / 0.6); z = 1; }
    if (t >= TL.card) wa = 1 - 0.75 * E2((t - TL.card) / 0.6);
    if (wa > 0) {              // the orbit lives on its own layer: it can fade as a whole and go out of focus behind the graphics
      var tr = g.getTransform(); LG.setTransform(1, 0, 0, 1, 0, 0); LG.clearRect(0, 0, 1920, 1080); LG.setTransform(tr);
      if (z !== 1) { LG.translate(zx, zy); LG.scale(z, z); LG.translate(-zx, -zy); }
      world(LG, t);
      var blur = t >= S.D[0] && t < S.F[0] ? 7 * E2((t - S.D[0]) / 0.3) : t >= TL.card ? 5 * E2((t - TL.card) / 0.6) : 0;
      g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = wa; if (blur > 0.3) g.filter = 'blur(' + blur.toFixed(1) + 'px)'; g.drawImage(LAYER, 0, 0); g.restore();
    }
    // counters
    if (t >= TL.c0 - 0.2 && t < S.C[0] + 0.4) {
      var n = count(t), landed = t >= TL.c1, pop = Math.max(0, 1 - since(HITS.concat([TL.c1]), t) / 0.15) * (landed ? 2 : 0.6);
      window.COUNTER(g, '试算 · 正圆模型', String(n), '遍', E2((t - TL.c0 + 0.2) / 0.3) * (1 - E2((t - S.C[0]) / 0.4)), landed ? '#ef5b43' : null, pop);
    }
    if (t >= 53.6 && t < TL.card) {
      var v = t < 54 ? 8 : Math.max(0, 7 - Math.floor((t - 54) / 0.25)), zero = v === 0;
      window.COUNTER(g, '最大偏差', v + '′', '', E2((t - 53.6) / 0.3) * (1 - E2((t - TL.card + 0.4) / 0.4)), zero ? '#f0bd5c' : '#ef5b43', zero ? Math.max(0, 1 - (t - 55.75) / 0.2) : 0);
    }
    // D: the 8' slam and the tally bars
    if (t >= S.D[0] && t < S.E[0]) {
      var d = t - 24.0, a = E2((S.E[0] - t) / 0.4), s = d < 0.16 ? 2.3 - 1.3 * eo2(d / 0.16) : 1;
      g.save(); g.globalAlpha = a * Math.min(1, d / 0.05); g.translate(1450, 470); g.scale(s, s);
      g.font = '900 250px "Noto Serif CJK SC"'; g.textAlign = 'center'; g.fillStyle = '#ef5b43'; g.shadowColor = '#ff6a4a'; g.shadowBlur = 50; g.fillText('8′', 0, 80);
      g.restore(); impactLines(g, 1450, 410, 24.0, t, 'rgba(239,91,67,0.9)');
      label(g, 1450, 610, '1 角分 = 1° 的六十分之一', a * E2((t - 24.6) / 0.5) * 0.85, 'rgba(210,195,170,0.9)', 24);
      var r1 = E2((t - 27.2) / 0.8), x0 = 720;
      if (r1 > 0) { g.save(); g.globalAlpha = a; g.font = '700 26px "Noto Serif CJK SC"'; g.textAlign = 'right'; g.fillStyle = 'rgba(200,215,240,0.9)'; g.fillText('第谷的观测误差', x0 - 24, 702); g.restore();
        ticks(g, x0, 710, Math.floor(24 * r1), '#86b6ff', a); if (r1 >= 1) label(g, x0 + 24 * 7 + 46, 704, '2′', a, '#86b6ff', 40); }
      var steps = Math.max(0, Math.min(8, Math.floor((t - 30.8) / 0.4) + 1)), g2 = cl2((t - 30.8 - (steps - 1) * 0.4) / 0.2);
      if (t >= 30.4) { g.save(); g.globalAlpha = a; g.font = '700 26px "Noto Serif CJK SC"'; g.textAlign = 'right'; g.fillStyle = 'rgba(245,190,175,0.95)'; g.fillText('圆模型的偏差', x0 - 24, 822); g.restore();
        var nt = Math.floor(12 * (Math.max(0, steps - 1) + (steps > 0 ? eo2(g2) : 0))), flash = t > 33.6 && t < 34.0 ? 1 : 0;
        ticks(g, x0, 830, nt, flash ? '#ffb4a4' : '#ef5b43', a);
        if (steps >= 8 && g2 >= 1) { label(g, x0 + nt * 7 + 52, 824, '8′', a, '#ef5b43', 44); g.save(); g.globalAlpha = a * 0.8; g.strokeStyle = '#ef5b43'; g.lineWidth = 2; g.beginPath(); g.ellipse(x0 + nt * 7 + 52, 810, 48, 30, -0.1, 0, 6.29); g.stroke(); g.restore(); }
      }
      label(g, x0 + 96 * 7 + 60, 900, '= 4 × 2′', a * E2((t - 32.0) / 0.4), '#ef5b43', 30);
    }
    // E: the scroll
    if (t >= S.E[0] - 0.1 && t < S.F[0]) scroll(g, t, 1 - E2((t - (S.F[0] - 0.5)) / 0.5));
    // timeline
    var yr = t < 6.4 ? 1601 : t < 19.2 ? 1601 + (t - 6.4) / 12.8 : t < 48 ? 1602 : t < 50.4 ? 1602 + 3 * E2((t - 48) / 2.4) : 1605;
    window.TIMELINE(g, t, yr, (1 - E2((t - TL.card) / 0.5)) * E2((t - 0.6) / 0.8));
    var na = t < S.D[0] || (t >= S.F[0] && t < TL.card) ? 1 : 0; window.NOTE(g, '轨道为示意 · 偏心率已夸大', na * E2((t - 1) / 0.6));
    // end card
    if (t >= TL.card) {
      var d = t - TL.card, s = d < 0.18 ? 1.6 - 0.6 * eo2(d / 0.18) : 1 + 0.02 * (d - 0.18);
      g.save(); g.globalAlpha = Math.min(1, d / 0.08); g.translate(960, 520); g.scale(s, s); g.textAlign = 'center';
      g.font = '900 230px "Noto Serif CJK SC"'; g.fillStyle = '#f2c878'; g.shadowColor = 'rgba(240,170,70,0.8)'; g.shadowBlur = 36; g.fillText('椭圆', 0, 0); g.restore();
      g.save(); g.globalAlpha = E2((d - 0.5) / 0.6); g.textAlign = 'center'; g.font = '500 34px "IBM Plex Mono", monospace'; g.fillStyle = 'rgba(240,210,150,0.9)';
      if (g.letterSpacing !== undefined) g.letterSpacing = '18px'; g.fillText('THE ELLIPSE', 960 + 9, 610); if (g.letterSpacing !== undefined) g.letterSpacing = '0px';
      g.font = '700 32px "Noto Serif CJK SC"'; g.fillStyle = 'rgba(235,225,205,0.85)'; g.globalAlpha = E2((d - 1.1) / 0.6); g.fillText('开普勒第一定律 · 行星沿椭圆绕太阳运行', 960, 690); g.restore();
      impactLines(g, 960, 450, TL.card, t, 'rgba(255,214,140,0.8)');
    }
  };
  function eo2(x) { x = cl2(x); return 1 - Math.pow(1 - x, 3); }
  function back(x) { x = cl2(x); var c = 1.6; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); }
})();
