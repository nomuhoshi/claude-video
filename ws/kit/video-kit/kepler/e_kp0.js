  // ================= Kepler: people, Platonic solids, orbits =================
  var KP_COL = '#c9d8f0', KP_NAME = '#9fc4ff', MARS = '#ff7a5c';
  function kepler(g, x, yb, h, a, o, lt) { o = o || {}; o.col = o.col || KP_COL; o.moustache = true; o.beard = !!o.old; if (o.name === undefined) o.name = '开普勒'; o.nameCol = KP_NAME; faraday(g, x, yb, h, a, o, lt); }
  function kboy(g, x, yb, h, a, o, lt) { o = o || {}; o.col = KP_COL; if (o.name === undefined) o.name = '小开普勒'; o.nameCol = KP_NAME; faraday(g, x, yb, h, a, o, lt); }
  function tycho(g, x, yb, h, a, o, lt) {
    o = o || {}; o.col = '#e7cfa2'; o.stout = true; o.moustache = true; if (o.name === undefined) o.name = '第谷'; o.nameCol = GOLD; faraday(g, x, yb, h, a, o, lt);
    if (a > 0.01) { var k = h / 330, f = o.flip ? -1 : 1; dot(g, x + f * 4 * k, yb - 236 * k, 9 * k, '#d9b45a', a); glow(g, x + f * 4 * k, yb - 236 * k, 26 * k, 'rgba(255,214,120,0.9)', 0.6 * a); }
  }
  function katharina(g, x, yb, h, a, o, lt) { o = o || {}; o.col = o.col || '#d8c8e8'; o.dress = true; if (o.name === undefined) o.name = '卡塔琳娜'; o.nameCol = '#d9b8ff'; faraday(g, x, yb, h, a, o, lt); }
  function kmother(g, x, yb, h, a, o, lt) { o = o || {}; o.col = '#f0c8d8'; o.dress = true; o.longHair = true; if (o.name === undefined) o.name = '母亲'; o.nameCol = '#f6a8c8'; faraday(g, x, yb, h, a, o, lt); }
  // ---- Platonic solids (unit circumradius) ----
  var PHI = (1 + Math.sqrt(5)) / 2;
  function norm(P) { var r = Math.sqrt(P[0] * P[0] + P[1] * P[1] + P[2] * P[2]); return [P[0] / r, P[1] / r, P[2] / r]; }
  function edgesOf(V) {
    var E = [], dmin = 1e9, i, j, d;
    for (i = 0; i < V.length; i++) for (j = i + 1; j < V.length; j++) { d = dist3(V[i], V[j]); if (d < dmin) dmin = d; }
    for (i = 0; i < V.length; i++) for (j = i + 1; j < V.length; j++) if (dist3(V[i], V[j]) < dmin * 1.01) E.push([i, j]);
    return E;
  }
  function dist3(A, B) { var x = A[0] - B[0], y = A[1] - B[1], z = A[2] - B[2]; return Math.sqrt(x * x + y * y + z * z); }
  var SOLIDS = (function () {
    var s = {}, i, j, k, a = 1 / PHI;
    s.tetra = [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]].map(norm);
    s.cube = []; for (i = -1; i <= 1; i += 2) for (j = -1; j <= 1; j += 2) for (k = -1; k <= 1; k += 2) s.cube.push(norm([i, j, k]));
    s.octa = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
    s.icosa = []; for (i = -1; i <= 1; i += 2) for (j = -1; j <= 1; j += 2) { s.icosa.push(norm([0, i, j * PHI])); s.icosa.push(norm([i, j * PHI, 0])); s.icosa.push(norm([j * PHI, 0, i])); }
    s.dodeca = s.cube.slice();
    for (i = -1; i <= 1; i += 2) for (j = -1; j <= 1; j += 2) { s.dodeca.push(norm([0, i * a, j * PHI])); s.dodeca.push(norm([i * a, j * PHI, 0])); s.dodeca.push(norm([j * PHI, 0, i * a])); }
    var out = {}; for (var n in s) out[n] = { V: s[n], E: edgesOf(s[n]) };
    return out;
  })();
  // inradius / circumradius for each solid
  var INR = { cube: 1 / Math.sqrt(3), tetra: 1 / 3, dodeca: 0.7947, icosa: 0.7947, octa: 1 / Math.sqrt(3) };
  // Kepler's nesting, outside in: Saturn | cube | Jupiter | tetra | Mars | dodeca | Earth | icosa | Venus | octa | Mercury
  var NEST = ['cube', 'tetra', 'dodeca', 'icosa', 'octa'];
  var NEST_COL = ['#f2c66b', '#ff9a6a', '#7fe0a0', '#8fd0ff', '#c9b8ff'];
  var SOLID_NAME = { tetra: '正四面体', cube: '立方体', octa: '正八面体', dodeca: '正十二面体', icosa: '正二十面体' };
  var PLANET_NAME = ['土星', '木星', '火星', '地球', '金星', '水星'];
  function nestRadii(R) { var r = [R], i; for (i = 0; i < 5; i++) r.push(r[i] * INR[NEST[i]]); return r; }   // sphere radii, Saturn .. Mercury
  function rot(P, ay, ax) {
    var x = P[0], y = P[1], z = P[2], c = Math.cos(ay), s = Math.sin(ay);
    var x1 = c * x + s * z, z1 = -s * x + c * z; c = Math.cos(ax); s = Math.sin(ax);
    return [x1, c * y - s * z1, s * y + c * z1];
  }
  // wireframe solid; far edges dimmer (depth cue), optional draw-on fraction
  function solid(g, name, cx, cy, R, ay, ax, col, w, a, frac) {
    if (a <= 0.003) return;
    var S = SOLIDS[name], P = S.V.map(function (v) { return rot(v, ay, ax); }), n = S.E.length, m = frac == null ? n : Math.floor(n * clamp(frac));
    g.save(); g.lineCap = 'round';
    for (var i = 0; i < m; i++) {
      var A = P[S.E[i][0]], B = P[S.E[i][1]], z = (A[2] + B[2]) / 2;
      g.globalAlpha = a * (0.38 + 0.62 * (z + 1) / 2);
      g.strokeStyle = col; g.lineWidth = w * (0.7 + 0.5 * (z + 1) / 2);
      g.beginPath(); g.moveTo(cx + A[0] * R, cy - A[1] * R); g.lineTo(cx + B[0] * R, cy - B[1] * R); g.stroke();
    }
    g.restore();
  }
  function sphereB(g, cx, cy, R, col, a) {
    if (a <= 0.003) return;
    g.save(); g.globalAlpha *= a;
    var gr = g.createRadialGradient(cx - R * 0.35, cy - R * 0.35, R * 0.1, cx, cy, R);
    gr.addColorStop(0, 'rgba(255,255,255,0.10)'); gr.addColorStop(0.8, 'rgba(143,208,255,0.05)'); gr.addColorStop(1, 'rgba(143,208,255,0.16)');
    g.fillStyle = gr; g.beginPath(); g.arc(cx, cy, R, 0, TAU); g.fill();
    g.strokeStyle = col; g.lineWidth = 0.12; g.beginPath(); g.arc(cx, cy, R, 0, TAU); g.stroke();
    g.beginPath(); g.ellipse(cx, cy, R, R * 0.28, 0, 0, TAU); g.globalAlpha *= 0.5; g.stroke();
    g.restore();
  }
  // the whole nested model; k = how many layers are shown (0..5, fractional ok)
  function nestModel(g, cx, cy, R, ay, ax, a, k, showSph, labels) {
    if (a <= 0.003) return;
    var r = nestRadii(R), i;
    if (showSph) for (i = 0; i < 6; i++) sphereB(g, cx, cy, r[i], 'rgba(143,208,255,0.55)', a * clamp(k - i + 1) * showSph);
    for (i = 0; i < 5; i++) solid(g, NEST[i], cx, cy, r[i], ay * (1 + i * 0.12), ax, NEST_COL[i], 0.22, a * clamp(k - i), clamp((k - i) * 1.3));
    if (labels) for (i = 0; i < 6; i++) {
      var la = a * labels * clamp(k - i + 1); if (la < 0.01) continue;
      var yy = cy - r[i] * 0.98; if (i >= 3) yy = cy + (i - 2) * 3.2 + r[2] * 0.2;
      var xx = i < 3 ? cx + r[i] * 0.72 + 2 : cx + R * 0.82;
      tx(g, PLANET_NAME[i], xx, i < 3 ? cy - r[i] * 0.72 - 0.6 : yy, 1.5, FG, 'left', 800, SANS, la);
      if (i >= 3) ln(g, cx + r[i] * 0.7, cy - r[i] * 0.2, xx - 0.6, yy, 'rgba(238,242,248,0.35)', 0.1, null, la);
    }
  }
  // a planet on an ellipse with Kepler's equation (true motion: fast near the Sun)
  function keplerPos(M, e) { var E = M; for (var i = 0; i < 8; i++) E = M + e * Math.sin(E); return E; }
  function orbitXY(cx, cy, A, e, E) { var b = A * Math.sqrt(1 - e * e); return [cx + A * Math.cos(E), cy + b * Math.sin(E)]; }
  function mars(g, x, y, r, a) {
    if (a <= 0.003) return;
    halo(g, x, y, r * 3, 'rgba(255,110,80,0.6)', 0.5 * a);
    var gr = g.createRadialGradient(x - r * 0.35, y - r * 0.35, r * 0.1, x, y, r); gr.addColorStop(0, '#ffb39a'); gr.addColorStop(1, '#a8361e');
    g.save(); g.globalAlpha *= a; g.fillStyle = gr; g.beginPath(); g.arc(x, y, r, 0, TAU); g.fill(); g.restore();
  }
  function stamp(g, s, x, y, sz, col, a, ang) {
    if (a <= 0.003) return;
    g.save(); g.globalAlpha *= a; g.translate(x, y); g.rotate(ang || -0.15);
    g.strokeStyle = col; g.lineWidth = sz * 0.08; var w = sz * (s.length * 1.05 + 0.8);
    g.strokeRect(-w / 2, -sz * 0.75, w, sz * 1.5); g.restore();
    g.save(); g.translate(x, y); g.rotate(ang || -0.15); tx(g, s, 0, 0.05 * sz, sz, col, 'center', 900, SANS, a); g.restore();
  }
  function snowflake(g, cx, cy, R, a, grow, lt) {
    if (a <= 0.003) return;
    g.save(); g.globalAlpha *= a; g.strokeStyle = '#e6f3ff'; g.lineCap = 'round';
    for (var k = 0; k < 6; k++) {
      var t = k * TAU / 6 + (lt || 0) * 0.05, c = Math.cos(t), s = Math.sin(t), L = R * grow;
      g.lineWidth = R * 0.06; g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx + c * L, cy + s * L); g.stroke();
      for (var j = 1; j <= 3; j++) {
        var d = L * j / 4, bl = R * 0.32 * (1 - j / 5) * clamp(grow * 1.3 - j * 0.15);
        if (bl <= 0) continue;
        var px = cx + c * d, py = cy + s * d;
        g.lineWidth = R * 0.04;
        for (var q = -1; q <= 1; q += 2) { var t2 = t + q * Math.PI / 3; g.beginPath(); g.moveTo(px, py); g.lineTo(px + Math.cos(t2) * bl, py + Math.sin(t2) * bl); g.stroke(); }
      }
    }
    g.restore();
    glow(g, cx, cy, R * 1.2, 'rgba(200,230,255,0.8)', 0.25 * a);
  }
  function hexCell(g, x, y, r, a, fill) {
    g.save(); g.globalAlpha *= a; g.beginPath();
    for (var k = 0; k < 6; k++) { var t = k * TAU / 6 + Math.PI / 6; if (k === 0) g.moveTo(x + Math.cos(t) * r, y + Math.sin(t) * r); else g.lineTo(x + Math.cos(t) * r, y + Math.sin(t) * r); }
    g.closePath(); if (fill) { g.fillStyle = fill; g.fill(); } g.strokeStyle = 'rgba(242,198,107,0.9)'; g.lineWidth = 0.18; g.stroke(); g.restore();
  }
  function horse(g, x, yb, s, a, lt, f) {     // simple horse silhouette, f = gait phase
    if (a <= 0.003) return;
    g.save(); g.globalAlpha *= a; g.translate(x, yb); g.scale(s, s); g.fillStyle = '#6a5a4a'; g.strokeStyle = '#6a5a4a'; g.lineCap = 'round';
    g.beginPath(); g.ellipse(0, -5, 4.2, 1.8, 0, 0, TAU); g.fill();
    g.beginPath(); g.moveTo(3, -6); g.lineTo(5.2, -9); g.lineTo(6.6, -8.6); g.lineTo(4.8, -5.4); g.closePath(); g.fill();
    g.lineWidth = 0.7; var p = f || 0;
    [[-3, 1], [-2, -1], [2.4, -1], [3.2, 1]].forEach(function (q, i) { var sw = Math.sin(p + i * 1.6) * 0.8; g.beginPath(); g.moveTo(q[0], -4); g.lineTo(q[0] + sw, 0); g.stroke(); });
    g.lineWidth = 0.5; g.beginPath(); g.moveTo(-4, -5.5); g.quadraticCurveTo(-5.6, -4, -5.2, -2); g.stroke();
    g.restore();
  }
