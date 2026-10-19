
  var $ = function (id) { return document.getElementById(id); };
  var frame = $('frame');
  var sceneEls = Array.prototype.slice.call(document.querySelectorAll('.scene'));
  var DRAW = {};   // filled in below; canvases look their drawing function up by name
  var scenes = sceneEls.map(function (el) {
    var cv = el.querySelector('canvas.cv');
    return {
      el: el, s: +el.dataset.start, e: +el.dataset.end, cv: cv, g: cv ? cv.getContext('2d') : null,
      anims: Array.prototype.slice.call(el.querySelectorAll('[data-a]'))
    };
  });
  var LINES = RAW.map(function (l) { return [l[0], scenes[l[0]].s + l[1], scenes[l[0]].s + l[2], l[3]]; });
  var sub = $('sub'), seek = $('seek'), timeEl = $('time'), pp = $('pp'), bigplay = $('bigplay');
  var T = 0, playing = false, cur = -1, curLine = -2, lastW = 0, K = 10;

  function clamp(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function fmt(t) { t = Math.max(0, Math.floor(t)); return Math.floor(t / 60) + ':' + ('0' + (t % 60)).slice(-2); }

  // decorative dust for the chapter cards (seeded, so every card looks the same on every play)
  function rng(seed) {
    return function () {
      seed |= 0; seed = seed + 0x6D2B79F5 | 0;
      var t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  Array.prototype.forEach.call(document.querySelectorAll('.parts'), function (box, bi) {
    var r = rng(bi + 11);
    for (var k = 0; k < 44; k++) {
      var a = r() * Math.PI * 2, d = 10 + r() * 38;
      var i = document.createElement('i');
      i.style.setProperty('--dx', (Math.cos(a) * d).toFixed(1) + 'cqw');
      i.style.setProperty('--dy', (Math.sin(a) * d * 0.55).toFixed(1) + 'cqw');
      i.style.setProperty('--o', (0.35 + r() * 0.65).toFixed(2));
      i.style.setProperty('--s', (0.3 + r() * 0.5).toFixed(2) + 'cqw');
      if (k % 2) i.className = 'b';
      box.appendChild(i);
    }
  });

  // ================= drawing helpers (canvas units: 100 wide, 56.25 high = 1 cqw each) =================
  var TAU = Math.PI * 2;
  var SANS = '"Noto Sans SC","PingFang SC","Microsoft YaHei",sans-serif';
  var MONO = '"IBM Plex Mono",ui-monospace,Menlo,monospace';
  var GOLD = '#f2c66b', ICE = '#8fd0ff', FG = '#eef2f8', DIM = '#93a1b6', HOT = '#ff9d6e';
  function sm(a, b, x) { var t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); }
  function pr(lt, s, d) { return clamp((lt - s) / d); }
  function eo(p) { return 1 - Math.pow(1 - p, 3); }
  function mix(a, b, t) { return a + (b - a) * t; }
  function rgbm(c1, c2, t) { return 'rgb(' + Math.round(mix(c1[0], c2[0], t)) + ',' + Math.round(mix(c1[1], c2[1], t)) + ',' + Math.round(mix(c1[2], c2[2], t)) + ')'; }
  function tx(g, s, x, y, sz, col, al, wt, fam, a) {
    g.save(); if (a != null) g.globalAlpha *= a;
    g.fillStyle = col; g.font = (wt || 500) + ' ' + sz + 'px ' + (fam || SANS); g.textAlign = al || 'left'; g.textBaseline = 'middle';
    g.fillText(s, x, y); g.restore();
  }
  function ln(g, x1, y1, x2, y2, col, w, dash, a) {
    g.save(); if (a != null) g.globalAlpha *= a;
    g.strokeStyle = col; g.lineWidth = w; if (dash) g.setLineDash(dash);
    g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); g.restore();
  }
  function dot(g, x, y, r, col, a, glow) {
    g.save(); if (a != null) g.globalAlpha *= a;
    if (glow) { g.shadowColor = col; g.shadowBlur = glow * K; }
    g.fillStyle = col; g.beginPath(); g.arc(x, y, r, 0, TAU); g.fill(); g.restore();
  }
  function spring(g, x1, y1, x2, y2, n, amp, col, w) {
    var dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L, pad = 0.14;
    g.save(); g.strokeStyle = col; g.lineWidth = w; g.beginPath(); g.moveTo(x1, y1);
    g.lineTo(x1 + dx * pad, y1 + dy * pad);
    for (var i = 1; i <= n * 2; i++) {
      var f = pad + (1 - 2 * pad) * i / (n * 2), s = (i % 2 ? 1 : -1) * amp;
      g.lineTo(x1 + dx * f + nx * s, y1 + dy * f + ny * s);
    }
    g.lineTo(x2, y2); g.stroke(); g.restore();
  }
  function X(c, v) { return c.x0 + (c.x1 - c.x0) * v / c.xm; }
  function Y(c, v) { return c.y1 - (c.y1 - c.y0) * v / c.ym; }
  function axes(g, c, a, o) {
    g.save(); g.globalAlpha *= a;
    g.strokeStyle = 'rgba(190,210,235,0.4)'; g.lineWidth = 0.14; g.setLineDash([]);
    g.beginPath(); g.moveTo(c.x0, c.y0 - 1); g.lineTo(c.x0, c.y1); g.lineTo(c.x1 + 1, c.y1); g.stroke();
    (o.xt || []).forEach(function (t) { var x = X(c, t[0]); ln(g, x, c.y1, x, c.y1 + 0.6, 'rgba(190,210,235,0.4)', 0.12); tx(g, t[1], x, c.y1 + 1.9, 1.15, DIM, 'center', 400, MONO); });
    (o.yt || []).forEach(function (t) { var y = Y(c, t[0]); ln(g, c.x0 - 0.6, y, c.x0, y, 'rgba(190,210,235,0.4)', 0.12); tx(g, t[1], c.x0 - 1, y, 1.15, DIM, 'right', 400, MONO); });
    if (o.xl) tx(g, o.xl, c.x1, c.y1 + 4.1, 1.25, DIM, 'right', 500);
    if (o.yl) tx(g, o.yl, c.x0 - 1, c.y0 - 2.4, 1.25, DIM, 'left', 500);
    g.restore();
  }
  function curve(g, c, fn, v0, v1, col, w, dash, glow) {
    var n = Math.max(2, Math.round(Math.abs(v1 - v0) / c.xm * 140));
    g.save(); g.strokeStyle = col; g.lineWidth = w; if (dash) g.setLineDash(dash);
    if (glow) { g.shadowColor = col; g.shadowBlur = glow * K; }
    g.beginPath();
    for (var i = 0; i <= n; i++) {
      var v = v0 + (v1 - v0) * i / n, x = X(c, v), y = Y(c, fn(v));
      if (i) g.lineTo(x, y); else g.moveTo(x, y);
    }
    g.stroke(); g.restore();
  }

  // ---- physics functions (all in units of 3R) ----
  function einstein(t) {            // t = T / theta_E
    if (t <= 0.0001) return 0;
    var x = 1 / t; if (x > 60) return 0;
    var ex = Math.exp(x); return x * x * ex / ((ex - 1) * (ex - 1));
  }
  function debye(t) {               // t = T / theta_D
    if (t <= 0.0005) return 0;
    if (t < 0.04) return 4 * Math.pow(Math.PI, 4) / 5 * t * t * t;
    var xm = 1 / t, n = 120, h = xm / n, s = 0;
    for (var i = 0; i <= n; i++) {
      var x = i * h, f = 0;
      if (x > 0) { var e = Math.exp(x); f = x * x * x * x * e / ((e - 1) * (e - 1)); }
      s += (i === 0 || i === n ? 1 : (i % 2 ? 4 : 2)) * f;
    }
    return 3 * t * t * t * s * h / 3;
  }
  var R3 = 24.94;

