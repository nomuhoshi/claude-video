
  // ================= drawing helpers (canvas units: 100 wide, 56.25 high = 1 cqw each) =================
  var TAU = Math.PI * 2;
  var SANS = '"Noto Sans SC","PingFang SC","Microsoft YaHei",sans-serif';
  var MONO = '"IBM Plex Mono",ui-monospace,Menlo,monospace';
  var GOLD = '#f2c66b', ICE = '#8fd0ff', FG = '#eef2f8', DIM = '#93a1b6', HOT = '#ff9d6e', EMB = '#ff7a3c', LEAF = '#62d6a0';
  function sm(a, b, x) { var t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); }
  function pr(lt, s, d) { return clamp((lt - s) / d); }
  function eo(p) { return 1 - Math.pow(1 - p, 3); }
  function eio(p) { return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2; }
  function mix(a, b, t) { return a + (b - a) * t; }
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
  function dot(g, x, y, r, col, a) {
    g.save(); if (a != null) g.globalAlpha *= a;
    g.fillStyle = col; g.beginPath(); g.arc(x, y, r, 0, TAU); g.fill(); g.restore();
  }
  function halo(g, x, y, r, col, a) {
    if (a <= 0.003) return;
    g.save(); g.globalAlpha *= a;
    var gr = g.createRadialGradient(x, y, 0, x, y, r);
    gr.addColorStop(0, col); gr.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = gr; g.beginPath(); g.arc(x, y, r, 0, TAU); g.fill(); g.restore();
  }
  function ring(g, x, y, r, col, w, a) {
    if (a <= 0.003) return;
    g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = w;
    g.beginPath(); g.arc(x, y, r, 0, TAU); g.stroke(); g.restore();
  }
  function arrowHead(g, x, y, ang, s, col, a) {
    g.save(); g.globalAlpha *= a; g.translate(x, y); g.rotate(ang); g.fillStyle = col;
    g.beginPath(); g.moveTo(s, 0); g.lineTo(-s * 0.7, -s * 0.55); g.lineTo(-s * 0.7, s * 0.55); g.closePath(); g.fill(); g.restore();
  }
  function pill(g, x, y, w, h, col, a) {
    g.save(); g.globalAlpha *= a; g.fillStyle = col;
    g.beginPath();
    if (g.roundRect) g.roundRect(x, y, w, h, h / 2); else g.rect(x, y, w, h);
    g.fill(); g.restore();
  }
  // carbon (grey) and oxygen (ice blue) atoms, always the same colours
  function atom(g, x, y, r, kind, a, noLetter) {
    g.save(); if (a != null) g.globalAlpha *= a;
    var c1 = kind === 'C' ? '#eef2f8' : '#e1f4ff', c2 = kind === 'C' ? '#76859b' : '#2c82c6';
    var gr = g.createRadialGradient(x - r * 0.35, y - r * 0.4, r * 0.08, x, y, r);
    gr.addColorStop(0, c1); gr.addColorStop(1, c2);
    g.fillStyle = gr; g.beginPath(); g.arc(x, y, r, 0, TAU); g.fill();
    g.strokeStyle = 'rgba(255,255,255,0.35)'; g.lineWidth = Math.max(0.05, r * 0.06); g.stroke();
    if (!noLetter && r >= 1.5) tx(g, kind, x, y + r * 0.06, r * 1.15, '#0b1220', 'center', 900, SANS);
    g.restore();
  }
  function bond(g, x1, y1, x2, y2, w, col, a) { ln(g, x1, y1, x2, y2, col || 'rgba(238,242,248,0.85)', w, null, a); }
  // stateless flame: every particle's position is a function of time only
  function flame(g, cx, by, w, h, lt, k, seed) {
    if (k <= 0.01) return;
    var r = rng(seed || 5), N = Math.round(26 + 56 * k), i;
    g.save(); g.globalCompositeOperation = 'lighter';
    halo(g, cx, by - h * 0.08, w * 0.85, 'rgba(255,120,40,0.30)', k);
    for (i = 0; i < N; i++) {
      var ph = r(), sp = 0.5 + r() * 0.6, off = r() - 0.5, rr = r();
      var age = (lt * sp * 0.8 + ph) % 1;
      var y = by - age * h * (0.5 + 0.5 * rr);
      var x = cx + Math.sin(lt * 2.6 + ph * 20) * w * 0.05 * age + off * w * (1 - age * 0.85) * 0.55;
      var rad = (1 - age) * w * 0.15 * (0.5 + rr * 0.6) + w * 0.018;
      var col = age < 0.22 ? '255,236,170' : age < 0.55 ? '255,165,55' : '255,85,30';
      halo(g, x, y, rad, 'rgba(' + col + ',' + (0.5 * (1 - age) * k).toFixed(3) + ')', 1);
    }
    g.restore();
  }
  function embers(g, cx, by, w, h, lt, k, seed, n) {
    if (k <= 0.01) return;
    var r = rng(seed || 9), i;
    for (i = 0; i < (n || 22); i++) {
      var ph = r(), sp = 0.12 + r() * 0.12, off = r() - 0.5;
      var age = (lt * sp + ph) % 1;
      var y = by - age * h, x = cx + off * w * (0.4 + age * 0.9) + Math.sin(lt * 1.3 + ph * 30) * w * 0.06 * age;
      dot(g, x, y, 0.16 + r() * 0.12, 'rgb(255,' + Math.round(150 + 80 * (1 - age)) + ',70)', (1 - age) * 0.9 * k * (0.6 + 0.4 * Math.sin(lt * 7 + ph * 40)));
    }
  }
  function leafBlob(g, x, y, r, col, a) { halo(g, x, y, r, col, a); }
