// Style-v2 engine: one 1920x1080 canvas, everything (text included) drawn in canvas so it can blur, glow and shake.
// Learned from the three reference films (see kit/video-kit/sfx_ref/NOTES.md):
//   bloom + vignette + film grain, top-left stacked serif narration with per-character blur-in and underlined keywords,
//   top-right counters, tick bars, screen shake on impacts, a thin era timeline at the bottom.
var W = 1920, H = 1080, TL = window.TL;
var out = document.getElementById('cv'), O = out.getContext('2d');
var main = document.createElement('canvas'); main.width = W; main.height = H; var M = main.getContext('2d');
var small = document.createElement('canvas'); small.width = 480; small.height = 270; var SM = small.getContext('2d');
var COL = { n: '#ece6da', b: '#86b6ff', r: '#ef5b43', g: '#f0bd5c', dim: '#9aa3b2', bg: '#080b12' };
var SERIF = '"Noto Serif CJK SC"', MONO = '"IBM Plex Mono", "DejaVu Sans Mono", monospace';
function cl(x, a, b) { return x < a ? a : x > b ? b : x; }
function E(x) { x = cl(x, 0, 1); return x * x * (3 - 2 * x); }
function eo(x) { x = cl(x, 0, 1); return 1 - Math.pow(1 - x, 3); }
function back(x) { x = cl(x, 0, 1); var c = 1.9; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); }
function win(t, a, b, fi, fo) { return E((t - a) / fi) * (1 - E((t - b + fo) / fo)); }
function rnd(s) { var x = Math.sin(s * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); }

// ---------- grain: a few pre-made noise tiles ----------
var GR = [];
for (var gi = 0; gi < 6; gi++) {
  var c = document.createElement('canvas'); c.width = 640; c.height = 360; var g = c.getContext('2d'), im = g.createImageData(640, 360);
  for (var i = 0; i < im.data.length; i += 4) { var v = 128 + (Math.random() - 0.5) * 255; im.data[i] = im.data[i + 1] = im.data[i + 2] = v; im.data[i + 3] = 255; }
  g.putImageData(im, 0, 0); GR.push(c);
}
// ---------- stars and out-of-focus dust ----------
var STARS = [], DUST = [];
for (var i = 0; i < 260; i++) STARS.push([rnd(i) * W, rnd(i + 99) * H, 0.4 + rnd(i + 7) * 1.4, rnd(i + 3) * 6.28, 0.15 + rnd(i + 5) * 0.5]);
for (var i = 0; i < 22; i++) DUST.push([rnd(i + 500) * W, rnd(i + 600) * H, 14 + rnd(i + 700) * 46, rnd(i + 800) * 6.28, 0.03 + rnd(i + 900) * 0.06]);

// ---------- narration text: top-left stack ----------
var SIZE = { n: 50, q: 64, big: 104 }, X0 = 112, Y0 = 150;
function parse(tx) {           // -> [{ch, c}] with c in n/b/r/g, words for underline
  var out = [], re = /\{([brg]):([^}]*)\}/g, last = 0, m, w = 0;
  while ((m = re.exec(tx))) {
    for (var k = last; k < m.index; k++) out.push({ ch: tx[k], c: 'n', w: -1 });
    for (var k = 0; k < m[2].length; k++) out.push({ ch: m[2][k], c: m[1], w: w });
    w++; last = re.lastIndex;
  }
  for (var k = last; k < tx.length; k++) out.push({ ch: tx[k], c: 'n', w: -1 });
  return out;
}
TL.groups.forEach(function (gr) { gr.lines.forEach(function (L) { L.ch = parse(L.tx); }); });
var RATE = 0.045, FADE = 0.3;
function drawText(g, t) {
  TL.groups.forEach(function (gr) {
    if (t < gr.s - 0.01 || t > gr.e + 0.01) return;
    var go = 1 - E((t - (gr.e - 0.35)) / 0.35);           // whole group blurs out at its end
    if (go <= 0) return;
    var y = Y0;
    gr.lines.forEach(function (L) {
      var sz = SIZE[L.st]; y += (L.st === 'q' ? sz * 1.15 : L.st === 'big' ? sz * 1.05 : sz * 1.25);
      if (t < L.t) return;
      g.font = '900 ' + sz + 'px ' + SERIF; g.textBaseline = 'alphabetic';
      var x = X0, under = {};
      L.ch.forEach(function (o, k) {
        var w = g.measureText(o.ch).width, p = cl((t - L.t - k * RATE) / FADE, 0, 1);
        if (p > 0) {
          var a = E(p) * go, bl = (1 - eo(p)) * 12 + (1 - go) * 10;
          g.save(); g.globalAlpha = a; if (bl > 0.3) g.filter = 'blur(' + bl.toFixed(1) + 'px)';
          g.shadowColor = 'rgba(0,0,0,0.85)'; g.shadowBlur = 18; g.shadowOffsetY = 3;
          g.fillStyle = o.c === 'n' ? (L.st === 'q' ? '#f4ead2' : COL.n) : COL[o.c];
          g.fillText(o.ch, x, y + (1 - eo(p)) * 10); g.restore();
        }
        if (o.w >= 0) { var u = under[o.w] || (under[o.w] = { x0: x, x1: x, c: o.c, k1: k }); u.x1 = x + w; u.k1 = k; }
        x += w;
      });
      for (var key in under) {          // underline grows once the word is in
        var u = under[key], p = cl((t - L.t - u.k1 * RATE - FADE * 0.6) / 0.35, 0, 1); if (p <= 0) continue;
        g.save(); g.globalAlpha = 0.9 * go; g.strokeStyle = COL[u.c]; g.lineWidth = sz > 80 ? 5 : 3;
        g.shadowColor = COL[u.c]; g.shadowBlur = 10; g.beginPath(); g.moveTo(u.x0, y + sz * 0.16); g.lineTo(u.x0 + (u.x1 - u.x0) * eo(p), y + sz * 0.16); g.stroke(); g.restore();
      }
    });
  });
}
// a small breadcrumb above the narration (chapter + a mono English caption)
function crumb(g, t) {
  var c = null, nx = TL.end; TL.crumbs.forEach(function (k, i) { if (t >= k.t) { c = k; nx = i + 1 < TL.crumbs.length ? TL.crumbs[i + 1].t : TL.end; } });
  if (!c) return; var chapOn = TL.chaps.some(function (k) { return t >= k.s && t < k.e; });
  var a = 0.75 * win(t, c.t + (chapOn ? 99 : 0), nx, 0.6, 0.4); if (chapOn) { var k0 = TL.chaps.filter(function (k) { return t >= k.s && t < k.e; })[0]; a = 0.75 * E((t - k0.e + 0.3) / 0.6); }
  if (a <= 0) return;
  g.save(); g.globalAlpha = a; g.fillStyle = COL.g; g.fillRect(X0, 66, 3, 34);
  g.font = '900 26px ' + SERIF; g.fillStyle = '#e8dcc0'; g.fillText(c.zh, X0 + 18, 92); var w = g.measureText(c.zh).width;
  g.font = '500 17px ' + MONO; g.fillStyle = COL.dim; g.fillText(c.en, X0 + 40 + w, 91); g.restore();
}
function fmtN(v) { return String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
function counters(g, t) {
  TL.counters.forEach(function (c) {
    if (t < c.t0 - 0.3 || t > c.hide + 0.01) return;
    var u = cl((t - c.t0) / (c.t1 - c.t0), 0, 1), v = c.a + (c.b - c.a) * Math.pow(u, c.pw), landed = t >= c.t1; v = c.dec ? v.toFixed(c.dec) : Math.round(v);
    var pop = landed ? Math.max(0, 1 - (t - c.t1) / 0.18) * 1.6 : 0;
    var a = E((t - c.t0 + 0.3) / 0.3) * (1 - E((t - c.hide + 0.35) / 0.35));
    counter(g, c.label, (c.endtxt && landed) ? c.endtxt : (+v >= 10000 ? fmtN(v) : String(v)), c.unit, a, landed && c.land ? c.land : c.col, pop);
  });
}
function slams(g, t) {
  TL.slams.forEach(function (s) {
    var d = t - s.t, e = s.e || (s.t + 2.5); if (d < 0 || t > e) return;
    var a = Math.min(1, d / 0.05) * (1 - E((t - e + 0.4) / 0.4)), k = d < 0.16 ? 2.2 - 1.2 * eo(d / 0.16) : 1 + 0.015 * (d - 0.16);
    g.save(); g.globalAlpha = a; g.translate(s.x, s.y); g.scale(k, k); g.textAlign = 'center';
    g.font = '900 ' + s.size + 'px ' + SERIF; g.fillStyle = s.col; g.shadowColor = s.col; g.shadowBlur = 40; g.fillText(s.tx, 0, s.size * 0.35);
    if (s.en) { g.shadowBlur = 0; g.globalAlpha = a * E((d - 0.4) / 0.5) * 0.8; g.font = '500 22px ' + MONO; g.fillStyle = 'rgba(230,215,190,0.9)'; if (g.letterSpacing !== undefined) g.letterSpacing = '6px'; g.fillText(s.en, 0, s.size * 0.35 + 54); if (g.letterSpacing !== undefined) g.letterSpacing = '0px'; }
    g.restore();
    var dd = d; if (dd < 0.5) { g.save(); g.strokeStyle = s.col; g.globalAlpha = 0.85 * (1 - dd / 0.5); g.lineWidth = 4;
      for (var i = 0; i < 14; i++) { var an = i / 14 * 6.283 + 0.2, r0 = s.size * 0.75 + dd * 420, r1 = r0 + 50 + 30 * rnd(i); g.beginPath(); g.moveTo(s.x + Math.cos(an) * r0, s.y + Math.sin(an) * r0 * 0.7); g.lineTo(s.x + Math.cos(an) * r1, s.y + Math.sin(an) * r1 * 0.7); g.stroke(); }
      g.restore(); }
  });
}
// top-right counter: small label, big serif number, unit
function counter(g, label, num, unit, a, col, pop) {
  if (a <= 0) return; g.save(); g.globalAlpha = a; g.textAlign = 'right';
  g.font = '700 24px ' + SERIF; g.fillStyle = COL.dim; g.fillText(label, 1800, 112);
  var s = 1 + 0.18 * (pop || 0);
  g.translate(1800, 206); g.scale(s, s);
  g.font = '900 52px ' + SERIF; g.fillStyle = col || '#f3ede2'; var uw = g.measureText(unit).width; g.fillText(unit, 0, 0);
  g.font = '900 96px ' + SERIF; g.shadowColor = col || 'rgba(255,240,210,0.6)'; g.shadowBlur = 24; g.fillText(num, -uw - 14, 0);
  g.restore();
}
// thin era timeline at the bottom
function timeline(g, t) {
  if (!TL.years.length) return;
  var a = 0; TL.yvis.forEach(function (w) { a = Math.max(a, win(t, w[0], w[1], 0.6, 0.6)); });
  TL.chaps.forEach(function (k) { if (t >= k.s - 0.3 && t < k.e + 0.3) a *= 1 - win(t, k.s - 0.3, k.e + 0.3, 0.3, 0.3); });
  var Ys = TL.years, year = Ys[0][1]; for (var i = 0; i < Ys.length; i++) { if (t >= Ys[i][0]) { year = Ys[i][1]; if (i + 1 < Ys.length && t < Ys[i + 1][0]) year = Ys[i][1] + (Ys[i + 1][1] - Ys[i][1]) * E((t - Ys[i][0]) / Math.max(0.01, Math.min(1.2, Ys[i + 1][0] - Ys[i][0]))); } }
  if (a <= 0) return; var x0 = 560, x1 = 1360, y = 1012, Y0 = TL.yr0, Y1 = TL.yr1;
  function X(yr) { return x0 + (x1 - x0) * (yr - Y0) / (Y1 - Y0); }
  g.save(); g.globalAlpha = a * 0.8; g.strokeStyle = 'rgba(220,205,180,0.35)'; g.lineWidth = 1.5; g.beginPath(); g.moveTo(x0, y); g.lineTo(x1, y); g.stroke();
  g.font = '700 20px ' + SERIF; g.textAlign = 'center';
  TL.ticks.forEach(function (yr) { g.fillStyle = 'rgba(220,205,180,0.55)'; g.fillRect(X(yr) - 0.75, y - 6, 1.5, 12); g.fillText(yr, X(yr), y + 34); });
  var xd = X(year); g.fillStyle = COL.g; g.shadowColor = COL.g; g.shadowBlur = 14; g.beginPath(); g.arc(xd, y, 6, 0, 6.29); g.fill();
  g.strokeStyle = COL.g; g.lineWidth = 1.5; g.beginPath(); g.arc(xd, y, 12, 0, 6.29); g.stroke(); g.restore();
}
function note(g, s, a) { if (a <= 0) return; g.save(); g.globalAlpha = a * 0.6; g.font = '500 18px ' + SERIF; g.fillStyle = COL.dim; g.textAlign = 'right'; g.fillText(s, 1840, 1050); g.restore(); }

// ---------- shake ----------
function shake(t) {
  var x = 0, y = 0;
  TL.shake.forEach(function (s, i) {
    var d = t - s[0]; if (d < 0 || d > 0.6) return; var k = s[1] * Math.exp(-d / 0.11);
    x += k * Math.sin(d * 83 + i) ; y += k * Math.cos(d * 71 + i * 2) * 0.8;
  });
  return [x, y];
}

// ---------- post: bloom, vignette, grain ----------
function post(t) {
  O.globalCompositeOperation = 'source-over'; O.globalAlpha = 1; O.filter = 'none';
  O.filter = 'brightness(1.22) saturate(1.06)'; O.drawImage(main, 0, 0); O.filter = 'none';
  SM.globalCompositeOperation = 'copy'; SM.filter = 'blur(5px) brightness(0.95) contrast(2.4)'; SM.drawImage(main, 0, 0, 480, 270); SM.filter = 'none';
  O.globalCompositeOperation = 'lighter'; O.globalAlpha = 0.34; O.imageSmoothingQuality = 'high'; O.drawImage(small, 0, 0, W, H);
  O.globalAlpha = 0.16; O.filter = 'blur(10px)'; O.drawImage(small, -40, -22, W + 80, H + 45); O.filter = 'none';
  O.globalCompositeOperation = 'source-over'; O.globalAlpha = 1;
  var vg = O.createRadialGradient(W / 2, H * 0.48, H * 0.32, W / 2, H / 2, H * 1.02);
  vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,0.3)'); O.fillStyle = vg; O.fillRect(0, 0, W, H);
  O.globalCompositeOperation = 'overlay'; O.globalAlpha = 0.09; O.drawImage(GR[Math.floor(t * 30) % GR.length], 0, 0, W, H);
  O.globalCompositeOperation = 'source-over'; O.globalAlpha = 1;
}

function background(g, t) {
  var bg = g.createRadialGradient(1180, 600, 50, 1000, 540, 1300);
  bg.addColorStop(0, '#161c2a'); bg.addColorStop(0.5, '#0d121d'); bg.addColorStop(1, '#06080e'); g.fillStyle = bg; g.fillRect(-60, -60, W + 120, H + 120);
  STARS.forEach(function (s) { var a = s[4] * (0.6 + 0.4 * Math.sin(t * 1.3 + s[3])); g.fillStyle = 'rgba(255,240,215,' + a.toFixed(3) + ')'; g.fillRect(s[0], s[1], s[2], s[2]); });
}
function dust(g, t) {          // big soft out-of-focus motes in front: depth of field
  DUST.forEach(function (d) {
    var x = (d[0] + t * 9 * (0.5 + d[4] * 10)) % (W + 200) - 100, y = d[1] + Math.sin(t * 0.3 + d[3]) * 30;
    var gr = g.createRadialGradient(x, y, 0, x, y, d[2]); gr.addColorStop(0, 'rgba(255,200,130,' + d[4] + ')'); gr.addColorStop(1, 'rgba(255,200,130,0)');
    g.fillStyle = gr; g.fillRect(x - d[2], y - d[2], d[2] * 2, d[2] * 2);
  });
}

window.COUNTER = counter; window.TIMELINE = timeline; window.NOTE = note;
window.__setT = function (t) {
  var sh = shake(t);
  M.setTransform(1, 0, 0, 1, 0, 0); M.globalAlpha = 1; M.filter = 'none'; M.fillStyle = COL.bg; M.fillRect(0, 0, W, H);
  M.translate(sh[0], sh[1]);
  background(M, t);
  window.SCENE(M, t);
  dust(M, t);
  crumb(M, t);
  counters(M, t); slams(M, t); timeline(M, t);
  drawText(M, t);
  M.setTransform(1, 0, 0, 1, 0, 0);
  var fade = 1 - E((t - (TL.end - 1.2)) / 1.2);          // no fade-in: the title card is on screen from frame 0
  post(t);
  if (fade < 1) { O.fillStyle = 'rgba(0,0,0,' + (1 - fade).toFixed(3) + ')'; O.fillRect(0, 0, W, H); }
};
