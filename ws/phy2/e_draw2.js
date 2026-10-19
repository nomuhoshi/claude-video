
  // ================= scene 2: a ball, a small hill, a deep pit =================
  var HILL = null;
  function hillU(x) { var a = (x - 0.40) / 0.085, b = (x - 0.66) / 0.075; return Math.exp(-a * a) - Math.exp(-b * b) + 800 * Math.pow(Math.max(0, x - 0.86), 2) + 400 * Math.pow(Math.max(0, 0.06 - x), 2); }
  function hillF(x) { var h = 1e-4; return -(hillU(x + h) - hillU(x - h)) / (2 * h); }
  function simBall(kicks, dur, x0) {
    var dt = 1 / 240, n = Math.ceil(dur / dt) + 2, k = 0.101, ki = 0, x = x0, v = 0;
    var X = new Float32Array(n), V = new Float32Array(n), D = new Float32Array(n);
    for (var i = 0; i < n; i++) {
      var t = i * dt;
      if (ki < kicks.length && t >= kicks[ki][0] && x < 0.16 && v < 0.02) { v = kicks[ki][1]; ki++; }
      X[i] = x; V[i] = v;
      var gam = 0.10 + 0.9 * sm(0.52, 0.60, x), a = k * hillF(x) - gam * v;
      v += a * dt; x += v * dt;
      if (x < 0.04) { x = 0.04; v = Math.abs(v); }
      if (x > 0.88) { x = 0.88; v = -Math.abs(v); }
      D[i] = gam * v * v;
    }
    // smoothed dissipation = "how much heat is being shaken out right now"
    var H = new Float32Array(n), h = 0, mx = 1e-9;
    for (i = 0; i < n; i++) { h = h * 0.985 + D[i] * 0.02; H[i] = h; if (h > mx) mx = h; }
    for (i = 0; i < n; i++) H[i] /= mx;
    // first time the ball is inside the pit after the fast kick
    var fall = -1;
    for (i = 0; i < n; i++) { if (X[i] > 0.60 && i > kicks[kicks.length - 1][0] / dt) { fall = i * dt; break; } }
    return { X: X, V: V, H: H, dt: dt, n: n, fall: fall };
  }
  function simAt(S, lt) { var i = Math.max(0, Math.min(S.n - 1, Math.round(lt / S.dt))); return i; }
  function buildHill() {
    var sc = sc_('s2'), L = sc.ls, dur = sc.e - sc.s;
    HILL = {
      A: simBall([[L[2] + 0.1, 0.30], [L[2] + 3.0, 0.36], [L[3] + 0.15, 0.56]], dur, 0.10),
      B: simBall([[L[7] + 0.3, 0.30]], dur, 0.10), L: L
    };
    DCUES.push([sc.s + HILL.A.fall, 'thump', null]);
    // energy pours out of the pit: soft glass pings while the ball keeps rattling
    for (var q = 0; q < 6; q++) DCUES.push([sc.s + HILL.A.fall + 0.45 + q * 0.62, 'spark', PENTH[(q * 2) % 6] * 0.5]);
  }
  var HX0 = 8, HX1 = 92;
  function hX(x) { return HX0 + (x - 0.05) / 0.83 * (HX1 - HX0); }
  function hY(u) { return 28 - u * 10.5; }
  DRAW.d2 = function (g, lt, L) {
    if (!HILL) buildHill();
    var i, rv = eo(pr(lt, L[0], 1.6)), rv2 = eo(pr(lt, L[1], 1.6));
    // terrain: grows left to right as the sentences arrive
    var xmax = mix(0.05, 0.50, rv) + (0.88 - 0.50) * rv2;
    g.save();
    g.beginPath(); g.moveTo(hX(0.05), 44);
    for (i = 0; i <= 160; i++) { var xx = 0.05 + (xmax - 0.05) * i / 160; g.lineTo(hX(xx), hY(Math.min(hillU(xx), 1.5))); }
    g.lineTo(hX(xmax), 44); g.closePath();
    var gr = g.createLinearGradient(0, 16, 0, 44); gr.addColorStop(0, 'rgba(143,208,255,0.20)'); gr.addColorStop(1, 'rgba(143,208,255,0.03)');
    g.fillStyle = gr; g.fill();
    // highlight the hill, then the pit, while the narration names them
    var hh = eo(pr(lt, L[5], 0.6)) * (1 - eo(pr(lt, L[6], 0.5))), hp = eo(pr(lt, L[6], 0.6)) * (1 - eo(pr(lt, L[7], 0.6)));
    g.beginPath();
    for (i = 0; i <= 160; i++) { xx = 0.05 + (xmax - 0.05) * i / 160; var yy = hY(Math.min(hillU(xx), 1.5)); if (i) g.lineTo(hX(xx), yy); else g.moveTo(hX(xx), yy); }
    g.strokeStyle = 'rgba(190,225,255,0.9)'; g.lineWidth = 0.32; g.stroke();
    g.restore();
    if (hh > 0.01) {
      g.save(); g.beginPath();
      for (i = 0; i <= 60; i++) { xx = 0.29 + 0.22 * i / 60; var y2 = hY(hillU(xx)); if (i) g.lineTo(hX(xx), y2); else g.moveTo(hX(xx), y2); }
      g.strokeStyle = HOT; g.lineWidth = 0.75; g.globalAlpha = hh; g.stroke(); g.restore();
      halo(g, hX(0.40), hY(1.0), 7, 'rgba(255,140,90,0.55)', hh);
    }
    if (hp > 0.01) {
      g.save(); g.beginPath();
      for (i = 0; i <= 60; i++) { xx = 0.56 + 0.20 * i / 60; var y3 = hY(hillU(xx)); if (i) g.lineTo(hX(xx), y3); else g.moveTo(hX(xx), y3); }
      g.strokeStyle = GOLD; g.lineWidth = 0.75; g.globalAlpha = hp; g.stroke(); g.restore();
      halo(g, hX(0.66), hY(-0.9), 8, 'rgba(255,220,140,0.45)', hp);
    }
    tx(g, '小山', hX(0.40), hY(1.0) - 3.2, 2.4, FG, 'center', 900, SANS, eo(pr(lt, L[0] + 0.9, 0.7)));
    tx(g, '深坑', hX(0.66), hY(0.0) - 4.4, 2.4, FG, 'center', 900, SANS, eo(pr(lt, L[1] + 0.9, 0.7)));
    tx(g, '互相排斥', hX(0.40), hY(1.0) - 7.6, 2.0, HOT, 'center', 700, SANS, hh);
    tx(g, '紧紧抱在一起', hX(0.66), hY(0.0) - 7.6, 2.0, GOLD, 'center', 700, SANS, hp);
    tx(g, '二氧化碳', hX(0.66), hY(-1.0) + 3.3, 1.6, ICE, 'center', 500, SANS, hp);
    // ball A (gold): the narrated ball; ball B (blue): oxygen throwing itself at the carbon
    function ballAt(S, col, alpha, glow) {
      var j = simAt(S, lt), bx = hX(S.X[j]), by = hY(hillU(S.X[j])) - 1.25;
      for (var tr = 6; tr >= 1; tr--) {
        var jj = Math.max(0, j - tr * 5), tx2 = hX(S.X[jj]), ty2 = hY(hillU(S.X[jj])) - 1.25;
        dot(g, tx2, ty2, 1.1 * (1 - tr / 8), col, alpha * 0.07 * (7 - tr));
      }
      halo(g, bx, by, 3.6 + glow * 2, col === GOLD ? 'rgba(255,215,130,0.8)' : 'rgba(150,210,255,0.8)', alpha * (0.5 + glow * 0.5));
      dot(g, bx, by, 1.25, col === GOLD ? '#ffe9b0' : '#d6f0ff', alpha);
      return S.H[j];
    }
    var aA = eo(pr(lt, L[0] + 1.4, 0.8)) * (1 - eo(pr(lt, L[7], 0.6)));
    var heat = 0;
    if (aA > 0.01) heat = ballAt(HILL.A, GOLD, aA, 0);
    var aB = eo(pr(lt, L[7] + 0.1, 0.7));
    if (aB > 0.01) ballAt(HILL.B, ICE, aB, 0);
    // after the fall: heat shakes out of the pit
    var tf = lt - HILL.A.fall;
    if (tf > 0) {
      var pxx = hX(0.66), pyy = hY(-1.0);
      halo(g, pxx, pyy, 10, 'rgba(255,170,70,0.65)', Math.min(1, heat * 1.6 + 0.12) * (1 - eo(pr(lt, L[7], 1.2))));
      var rs = rng(4);
      for (i = 0; i < 16; i++) {
        var ang = -Math.PI * (0.08 + 0.84 * rs()), spd = 5 + rs() * 11, ph = rs() * 1.4, age = ((tf - ph * 0.0) * 0.55 + ph) % 1.4 / 1.4;
        if (tf < ph * 0.8) continue;
        dot(g, pxx + Math.cos(ang) * spd * age * 1.4, pyy + Math.sin(ang) * spd * age * 1.15 + age * age * 3, 0.28, 'rgb(255,200,110)', (1 - age) * 0.85 * (1 - eo(pr(lt, L[7], 1.0))));
      }
      var ea = eo(pr(lt, HILL.A.fall + 1.4, 0.8));
      if (ea > 0) {
        var ex = hX(0.82);
        ln(g, ex, hY(0.0), ex, hY(-1.0) - 0.4, GOLD, 0.35, null, ea);
        arrowHead(g, ex, hY(-1.0), Math.PI / 2, 1.0, GOLD, ea);
        ln(g, ex - 1.5, hY(0.0), ex + 1.5, hY(0.0), GOLD, 0.22, [0.5, 0.4], ea);
        tx(g, '放出的能量', ex + 1.8, (hY(0.0) + hY(-1.0)) / 2, 1.9, GOLD, 'left', 700, SANS, ea);
      }
    }
    tx(g, '碳和氧，分开着', hX(0.12), hY(0.0) - 4.2, 1.8, DIM, 'center', 500, SANS, eo(pr(lt, L[1] + 0.2, 0.8)));
  };
