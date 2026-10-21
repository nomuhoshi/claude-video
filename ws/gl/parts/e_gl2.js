  // ================= Galileo: scenes g6 .. g10 (the telescope years) =================
  // the Moon with a wobbly terminator, craters and sunlit peaks in the dark: rug 0 = smooth ball, 1 = mountains and pits
  function moonDetail(g, x, y, r, a, rug, lt, ter) {
    if (a <= 0.003) return; ter = ter == null ? 0.05 : ter;
    halo(g, x, y, r * 1.9, 'rgba(230,230,210,0.5)', 0.28 * a);
    g.save(); g.globalAlpha *= a; g.beginPath(); g.arc(x, y, r, 0, TAU); g.clip();
    g.fillStyle = '#1a2032'; g.fillRect(x - r, y - r, 2 * r, 2 * r);
    var k, u, v, tr = [];
    for (k = 0; k <= 48; k++) { u = k / 48; v = u * 2 - 1; tr.push([x + ter * r * Math.sqrt(Math.max(0, 1 - v * v)) + rug * r * 0.035 * (Math.sin(u * 41) + 0.6 * Math.sin(u * 97 + 1.3)), y + v * r]); }
    g.beginPath(); g.moveTo(tr[0][0], tr[0][1]); for (k = 1; k < tr.length; k++) g.lineTo(tr[k][0], tr[k][1]); g.lineTo(x + r * 1.1, y + r); g.lineTo(x + r * 1.1, y - r); g.closePath();
    var gr = g.createLinearGradient(x - r * 0.4, 0, x + r, 0); gr.addColorStop(0, '#9c9784'); gr.addColorStop(1, '#cfc8b0'); g.fillStyle = gr; g.fill();
    var rr = rng(11), i;
    g.fillStyle = 'rgba(120,116,104,0.30)'; for (i = 0; i < 4; i++) { g.beginPath(); g.ellipse(x + r * (0.15 + rr() * 0.5), y + r * (-0.6 + rr() * 1.2), r * (0.14 + rr() * 0.12), r * (0.1 + rr() * 0.1), rr() * 3, 0, TAU); g.fill(); }
    var N = Math.round(34 * rug);
    for (i = 0; i < N; i++) {
      var cx = x + r * (-0.1 + rr() * 1.0), cy = y + r * (-0.85 + rr() * 1.7), cr = r * (0.025 + 0.075 * rr() * rr()), dxm = Math.hypot(cx - x, cy - y); if (dxm > r - cr) continue;
      g.fillStyle = 'rgba(50,46,40,0.5)'; g.beginPath(); g.arc(cx, cy, cr, 0, TAU); g.fill();
      g.fillStyle = 'rgba(240,236,220,0.5)'; g.beginPath(); g.arc(cx - cr * 0.25, cy - cr * 0.25, cr * 0.72, Math.PI * 0.6, Math.PI * 1.7); g.fill();
    }
    for (i = 0; i < Math.round(14 * rug); i++) { var py = y + r * (-0.8 + rr() * 1.6), pxx = x + ter * r * Math.sqrt(Math.max(0, 1 - Math.pow((py - y) / r, 2))) - r * (0.03 + 0.14 * rr()); if (Math.hypot(pxx - x, py - y) < r - 0.2) dot(g, pxx, py, r * 0.013, '#fff3d0', 0.95); }
    g.restore();
    g.save(); g.globalAlpha *= a; g.strokeStyle = 'rgba(255,255,255,0.22)'; g.lineWidth = 0.14; g.beginPath(); g.arc(x, y, r, 0, TAU); g.stroke(); g.restore();
  }

  // ---------- g6: the Moon is not a perfect ball ----------
  DRAW.g6 = function (g, lt, L) {
    var mx = 70, my = 33, R = 10.5;
    var ma = A_(lt, 0.2, 1.0);
    var rug = A_(lt, L[4], 2.0);
    // the old belief: a perfect circle
    var pf = A_(lt, L[2], 0.5) * (1 - A_(lt, L[4] + 0.2, 0.6));
    if (pf > 0.01) { ring(g, mx, my, R + 1.6, 'rgba(255,226,160,0.9)', 0.3, pf); chip(g, mx, my - R - 4.2, '完美', GOLD, pf, 'rgba(48,38,12,0.92)'); }
    moonDetail(g, mx, my, R, ma, rug, lt, 0.05);
    chip(g, mx - 0.0, my + R + 3.8, '光滑的球', '#c8cfdc', A_(lt, L[3], 0.5) * (1 - A_(lt, L[4] + 0.2, 0.5)), 'rgba(28,36,52,0.92)');
    var pk = A_(lt, L[4] + 0.6, 0.5) * (1 - A_(lt, L[6] - 0.2, 0.5));
    if (pk > 0.01) { chip(g, mx - R - 6.5, my - 5.4, '山', '#ffd27a', pk, 'rgba(36,30,12,0.92)'); chip(g, mx + 1, my + R + 3.8, '坑', '#ffd27a', A_(lt, L[5], 0.5) * (1 - A_(lt, L[6] - 0.2, 0.5)), 'rgba(36,30,12,0.92)'); }
    // the telescope, bottom left, aimed at it
    var ta = A_(lt, 0.2, 0.9); tripod(g, 18, 45.6, 7, ta); telescope(g, 18, 43.6, 17, -0.62, ta, { glow: 0.5 });
    // measuring a mountain from its shadow
    var ms = W_(lt, L[6] - 0.1, L[8] - 0.2, 0.6, 0.7);
    if (ms > 0.01) {
      g.save(); g.globalAlpha *= ms; var bx = 44, by = 50;
      g.fillStyle = 'rgba(20,28,44,0.7)'; g.strokeStyle = 'rgba(200,215,240,0.4)'; g.lineWidth = 0.18; g.beginPath(); if (g.roundRect) g.roundRect(30, 28, 29, 22.4, 1.2); else g.rect(30, 28, 29, 22.4); g.fill(); g.stroke();
      g.fillStyle = '#8f8a7c'; g.beginPath(); g.moveTo(30, by - 1.4); g.lineTo(59, by - 1.4); g.lineTo(59, by); g.lineTo(30, by); g.closePath(); g.fill();   // the lunar ground
      g.fillStyle = '#d9d2bc'; g.beginPath(); g.moveTo(bx - 4.4, by - 1.4); g.lineTo(bx, by - 11.8); g.lineTo(bx + 4.4, by - 1.4); g.closePath(); g.fill();                  // the mountain
      g.fillStyle = 'rgba(8,10,20,0.85)'; g.beginPath(); g.moveTo(bx + 4.4, by - 1.4); g.lineTo(bx, by - 11.8); g.lineTo(bx + 13.2, by - 1.4); g.closePath(); g.fill();         // its shadow
      var ra = A_(lt, L[6] + 0.3, 0.6); ln(g, 32, by - 15.8, bx, by - 11.8, 'rgba(255,226,160,0.9)', 0.2, [0.8, 0.5], ra); ln(g, bx, by - 11.8, bx + 13.2, by - 1.4, 'rgba(255,226,160,0.9)', 0.2, [0.8, 0.5], ra);
      tx(g, '阳光', 35.4, by - 17.6, 1.6, GOLD, 'center', 700, SANS, ra);
      var sl = A_(lt, L[6] + 0.9, 0.7); ln(g, bx + 4.4, by + 0.9, bx + 4.4 + 8.8 * sl, by + 0.9, '#7fe0a0', 0.34, null, 1); tx(g, '山影有多长', bx + 8.8, by + 2.8, 1.5, '#7fe0a0', 'center', 700, SANS, sl);
      g.restore();
    }
    var hk = A_(lt, L[7], 0.8);
    if (hk > 0.01) chip(g, 44.5, 25.4, '山高：好几公里', '#ff9d6e', hk * (1 - A_(lt, L[8] + 3.5, 0.5)), 'rgba(56,30,14,0.92)');
    // same stuff up there and down here
    var eq = W_(lt, L[8], null, 0.8);
    if (eq > 0.01) {
      chip(g, 46, 44.6, '月球的山', '#d9d2bc', eq, 'rgba(34,32,26,0.92)'); tx(g, '＝', 54.6, 44.6, 3.6, GOLD, 'center', 900, SANS, eq);
      g.save(); g.globalAlpha *= eq; g.fillStyle = '#6a8a62'; g.beginPath(); g.moveTo(58, 49); g.lineTo(62.5, 43.6); g.lineTo(65, 46); g.lineTo(69, 41.8); g.lineTo(75, 49); g.closePath(); g.fill(); g.restore();
      chip(g, 83, 46.6, '地上的山', '#9fe0b0', eq, 'rgba(14,44,30,0.92)');
    }
  };

  // ---------- g7: the Milky Way resolves into stars; ten times as many ----------
  function skyView(g, x, y, r, a, nStars, fog, lt, seed) {
    if (a <= 0.003) return; g.save(); g.globalAlpha *= a; g.beginPath(); g.arc(x, y, r, 0, TAU); g.clip();
    g.fillStyle = '#070a14'; g.fillRect(x - r, y - r, 2 * r, 2 * r);
    if (fog > 0.01) { g.save(); g.rotate(0); var gr = g.createLinearGradient(x - r, y + r, x + r, y - r); gr.addColorStop(0, 'rgba(0,0,0,0)'); gr.addColorStop(0.35, 'rgba(170,190,230,' + (0.42 * fog).toFixed(3) + ')'); gr.addColorStop(0.65, 'rgba(200,215,245,' + (0.5 * fog).toFixed(3) + ')'); gr.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = gr; g.fillRect(x - r, y - r, 2 * r, 2 * r); g.restore(); }
    var rr = rng(seed || 5);
    for (var i = 0; i < nStars; i++) {
      var an = rr() * TAU, rad = Math.sqrt(rr()) * r, bandBias = rr() < 0.55; var px = x + Math.cos(an) * rad, py = y + Math.sin(an) * rad;
      if (bandBias) { var t = (rr() - 0.5) * 2 * r * 1.2; var d = (rr() + rr() - 1) * r * 0.32; px = x + t * 0.707 - d * 0.707; py = y - t * 0.707 - d * 0.707; }
      var tw = 0.6 + 0.4 * Math.sin((lt || 0) * (1 + rr() * 2) + rr() * 6); dot(g, px, py, 0.1 + rr() * 0.2, '#eaf0ff', (0.45 + rr() * 0.5) * tw);
    }
    g.restore(); ring(g, x, y, r, 'rgba(200,215,240,0.5)', 0.2, a);
  }
  DRAW.g7 = function (g, lt, L) {
    var a1 = A_(lt, L[0] - 0.2, 0.8), a2 = A_(lt, L[2], 0.8), fg = A_(lt, L[1], 1.0);
    skyView(g, 48, 36, 11.5, a1, 26, fg * (1 - 0.65 * a2), lt, 5);
    chip(g, 48, 49.8, '肉眼', '#c8cfdc', a1, 'rgba(28,36,52,0.92)');
    tripod(g, 18, 47.2, 6, a1); telescope(g, 18, 45.2, 13, -0.4, a1, { glow: 0.4 });
    skyView(g, 80, 36, 11.5, a2, 260, 0.22 * (1 - a2) + 0.05, lt, 5);
    chip(g, 80, 49.8, '望远镜', GOLD, a2, 'rgba(48,38,12,0.92)');
    var lk = A_(lt, L[3], 0.6); if (lk > 0.01) { arrow(g, 60, 36, 66, 36, '#ffd27a', 0.5, lk, 1.0); tx(g, '同一块天空', 63, 31.4, 1.7, '#ffd27a', 'center', 700, SANS, lk); }
    var x10 = A_(lt, L[5], 0.6); if (x10 > 0.01) tx(g, '×10', 80, 21.6, 5.6, '#ef5b43', 'center', 900, SANS, x10 * (1 - 0.0));
  };

  // ---------- g8: four lights beside Jupiter ----------
  var JM = [[5.9, 1.769, 0.6, '#ffe9a8'], [9.4, 3.551, 2.4, '#bfe2ff'], [15.0, 7.155, 4.1, '#ffd0a0'], [26.4, 16.69, 1.1, '#d9c8ff']];
  function jOff(i, day) { return JM[i][0] * Math.sin(TAU * day / JM[i][1] + JM[i][2]); }
  DRAW.g8 = function (g, lt, L) {
    // night 1: three dots beside a bright planet
    var bigA = W_(lt, L[0] + 0.2, L[4] - 0.2, 0.8, 0.8);
    if (bigA > 0.01) {
      chip(g, 24, 32.6, '1610 年 1 月 7 日', '#8fd0ff', A_(lt, L[0] + 0.3, 0.5) * bigA, 'rgba(20,34,56,0.92)');
      stars(g, 0.5 * bigA, lt, 12, 40, 56);
      var jx = 62, jy = 36, ja = A_(lt, L[1], 0.9) * bigA;
      jupiterB(g, jx, jy, 5.0, ja);
      var ex = [[-17.5, 0.3], [-11.5, -0.4], [11.2, 0.2]], i; for (i = 0; i < 3; i++) { var da = A_(lt, L[2] + 0.3 + i * 0.35, 0.5) * bigA; glow(g, jx + ex[i][0], jy + ex[i][1], 2.4, 'rgba(255,240,200,0.9)', 0.6 * da); dot(g, jx + ex[i][0], jy + ex[i][1], 0.5, '#fff6dc', da); }
      chip(g, jx, jy + 9.4, '三个小亮点', '#ffd27a', A_(lt, L[2] + 1.0, 0.5) * bigA, 'rgba(36,30,12,0.92)');
      var st = A_(lt, L[3], 0.6) * bigA; chip(g, jx - 14, jy - 8.4, '远处的恒星？', '#ff9d6e', st, 'rgba(56,30,14,0.92)');
    }
    // the next nights: the dots move
    var rows = W_(lt, L[4] - 0.1, L[7] + 1.0, 0.5, 0.9);
    if (rows > 0.01) {
      var x0 = 66, y0 = 26.4, dy = 4.5, SCl = 0.95;
      tx(g, '木星（示意）', 36, y0 - 2.6, 1.6, DIM, 'left', 700, SANS, rows);
      for (var n = 0; n < 5; n++) {
        var pn = A_(lt, L[5] + n * 0.5, 0.4) * rows; if (pn < 0.01) continue; var yy = y0 + n * dy, day = 0.2 + n * 0.95;
        tx(g, '第 ' + (n + 1) + ' 夜', 34.8, yy, 1.6, DIM, 'left', 700, SANS, pn);
        ln(g, 44, yy, 92, yy, 'rgba(160,180,210,0.12)', 0.14, null, pn);
        dot(g, x0, yy, 0.95, '#f0d9b4', pn); halo(g, x0, yy, 3, 'rgba(255,214,160,0.7)', 0.4 * pn);
        for (var m = 0; m < 4; m++) {
          var fourth = A_(lt, L[6] + 1.5 + (n - 3) * 0.1, 0.4); var vis = m < 3 ? 1 : (n >= 3 ? fourth : 0); if (vis < 0.01) continue;
          var px = x0 + jOff(m, day) * SCl, ang = Math.abs(jOff(m, day)) < 2.0 ? 0.35 : 1; dot(g, px, yy, 0.42, JM[m][3], pn * vis * ang); halo(g, px, yy, 1.8, JM[m][3], 0.35 * pn * vis * ang);
          if (m === 3 && n >= 3) ring(g, px, yy, 1.5, '#ef5b43', 0.2, pn * vis * (0.5 + 0.5 * Math.sin(lt * 6)));
        }
      }
    }
    // not stars -- moons in orbit; not everything goes around the Earth
    var orb = A_(lt, L[8] - 0.1, 0.8);
    if (orb > 0.01) {
      var cx = 72, cy = 36; ring(g, cx, cy, 0.0001, '#000', 0.1, 0);
      var Rs = [4.2, 6.8, 10.4, 16.0];
      for (var k = 0; k < 4; k++) { ring(g, cx, cy, Rs[k], 'rgba(190,205,230,0.25)', 0.14, orb); var an = TAU * (lt - L[8]) / (JM[k][1] * 1.2) + JM[k][2]; dot(g, cx + Math.cos(an) * Rs[k], cy + Math.sin(an) * Rs[k], 0.7, JM[k][3], orb); halo(g, cx + Math.cos(an) * Rs[k], cy + Math.sin(an) * Rs[k], 2.4, JM[k][3], 0.45 * orb); }
      jupiterB(g, cx, cy, 2.4, orb); chip(g, cx, cy - 20.6, '绕着木星转', '#7fe0a0', A_(lt, L[8] + 0.4, 0.5), 'rgba(14,44,30,0.92)');
    }
    var nt = A_(lt, L[7], 0.6) * (1 - A_(lt, L[8] + 0.6, 0.5)); if (nt > 0.01) stamp2(g, '不是恒星', 82, 22.6, 2.6, '#ef5b43', nt, -0.06);
    var ge = A_(lt, L[9], 0.8);
    if (ge > 0.01) { earthB(g, 34, 36, 3.2, ge, lt); ring(g, 34, 36, 8.4, 'rgba(200,215,240,0.3)', 0.14, ge); xMark(g, 34, 36, 7.4, '#ef5b43', ge * A_(lt, L[9] + 0.5, 0.2), 0.9); chip(g, 34, 47.4, '都绕着地球？', '#ff9d6e', ge, 'rgba(56,30,14,0.92)'); }
  };

  // ---------- g9: the Starry Messenger, the Medici, Kepler's open letter ----------
  function medici(g, x, y, s, a) {
    if (a <= 0.003) return; g.save(); g.globalAlpha *= a; g.translate(x, y); g.scale(s, s);
    g.beginPath(); g.moveTo(-4, -5); g.lineTo(4, -5); g.lineTo(4, 1); g.quadraticCurveTo(4, 5, 0, 7); g.quadraticCurveTo(-4, 5, -4, 1); g.closePath(); g.fillStyle = '#e8c261'; g.fill(); g.strokeStyle = '#8a6a1c'; g.lineWidth = 0.3; g.stroke();
    var P = [[0, -3.0, '#2c52a0', 1.15], [-2.0, -3.0, '#c33a2c', 0.9], [2.0, -3.0, '#c33a2c', 0.9], [-2.0, -0.4, '#c33a2c', 0.9], [2.0, -0.4, '#c33a2c', 0.9], [0, 1.9, '#c33a2c', 0.9]];
    P.forEach(function (p) { g.fillStyle = p[2]; g.beginPath(); g.arc(p[0], p[1], p[3], 0, TAU); g.fill(); }); g.restore();
  }
  function domeB(g, x, yb, s, a) {
    if (a <= 0.003) return; g.save(); g.globalAlpha *= a; g.translate(x, yb); g.scale(s, s);
    g.fillStyle = '#8f7e6a'; g.fillRect(-9, -7, 18, 7); g.fillStyle = '#8a4a2c'; g.beginPath(); g.moveTo(-6.6, -7); g.quadraticCurveTo(-6.4, -17, 0, -19); g.quadraticCurveTo(6.4, -17, 6.6, -7); g.closePath(); g.fill();
    g.strokeStyle = 'rgba(80,36,18,0.6)'; g.lineWidth = 0.18; for (var k = -3; k <= 3; k++) { g.beginPath(); g.moveTo(k * 1.8, -7); g.quadraticCurveTo(k * 1.2, -16, 0, -19); g.stroke(); }
    g.fillStyle = '#b9ad94'; g.fillRect(-0.9, -23, 1.8, 4); g.beginPath(); g.moveTo(-1.2, -23); g.lineTo(0, -25.4); g.lineTo(1.2, -23); g.closePath(); g.fill(); g.restore();
  }
  DRAW.g9 = function (g, lt, L) {
    var bk = A_(lt, L[1], 0.9);
    // the little book
    if (bk > 0.01) {
      g.save(); g.globalAlpha *= bk; rbox(g, 54, 25, 15, 20, 0.5, 'rgba(255,255,255,0.25)', 0.14, '#2c3a5c', 1); rbox(g, 55.2, 26.2, 12.6, 17.6, 0.3, 'rgba(242,198,107,0.7)', 0.14, null, 1);
      tx(g, '星际', 61.5, 31.6, 2.4, '#f2dfb0', 'center', 900, SERIF_, 1); tx(g, '信使', 61.5, 35.4, 2.4, '#f2dfb0', 'center', 900, SERIF_, 1);
      tx(g, 'SIDEREUS NUNCIUS', 61.5, 40.8, 0.95, 'rgba(242,223,176,0.8)', 'center', 600, MONO, 1); g.restore();
      chip(g, 61.5, 47.6, '1610 · 威尼斯', FG, bk * A_(lt, L[1] + 0.4, 0.5));
    }
    var qa = A_(lt, 0.2, 0.7) * (1 - bk); quill(g, 60, 36, 2.4, qa, -0.7); paper(g, 54, 30, 12, 9, qa * 0.7, 'rgba(150,140,118,0.9)');
    // the moons, named after the Medici
    var jm = A_(lt, L[2], 0.8);
    if (jm > 0.01) { jupiterB(g, 84, 31.2, 2.8, jm); for (var m = 0; m < 4; m++) { var px = 84 + jOff(m, 0.4 + 0.3 * m) * 0.5, py = 31.2 + (m - 1.5) * 0.4; dot(g, px, py, 0.4, JM[m][3], jm); halo(g, px, py, 1.6, JM[m][3], 0.5 * jm); } }
    var md = A_(lt, L[3], 0.8) * (1 - 0.0);
    if (md > 0.01) { medici(g, 84, 43.2, 1.05, md); chip(g, 84, 52.2, '美第奇家族', GOLD, md, 'rgba(48,38,12,0.92)'); }
    var mn = A_(lt, L[4], 0.6); if (mn > 0.01) chip(g, 84, 25.4, '“美第奇星”', '#ffd27a', mn, 'rgba(36,30,12,0.92)');
    // the doubters, then Kepler's letter
    var sk = W_(lt, L[5], L[7] + 0.4, 0.6, 0.7);
    if (sk > 0.01) { judge(g, 38, 49, 11, sk, { col: '#3b4358', col2: '#1d2230', cap: '#262d40' }); chip(g, 38, 35.8, '镜片里的幻象？', '#ff9d6e', sk * A_(lt, L[5] + 0.4, 0.5) * (1 - A_(lt, L[7] - 0.1, 0.3)), 'rgba(56,30,14,0.92)'); }
    var kp = W_(lt, L[6], null, 0.7);
    if (kp > 0.01) {
      kepler(g, 18, 49.2, 13.5, kp, { pose: 'forward', name: '开普勒' }, lt);
      var fl = A_(lt, L[6] + 0.3, 1.4); paper(g, 24 + 12 * fl, 41 - 4 * Math.sin(fl * 3.14), 5.4, 4, kp * 0.95); tx(g, '公开信', 24 + 12 * fl + 2.7, 43.4 - 4 * Math.sin(fl * 3.14) + 3.4, 1.3, GOLD, 'center', 700, SANS, kp * fl);
    }
    var ck = A_(lt, L[7], 0.4); if (ck > 0.01) { g.save(); g.globalAlpha *= ck; g.strokeStyle = '#7fe0a0'; g.lineWidth = 0.9; g.lineCap = 'round'; g.beginPath(); g.moveTo(44, 36); g.lineTo(46.6, 39); g.lineTo(52, 32); g.stroke(); g.restore(); chip(g, 38, 31.4, '替他作证', '#7fe0a0', ck, 'rgba(14,44,30,0.92)'); }
    // back to Florence
    var fl2 = A_(lt, L[8], 0.9);
    if (fl2 > 0.01) { g.save(); g.globalAlpha *= fl2; g.fillStyle = 'rgba(8,10,20,0.97)'; g.fillRect(0, 21, 100, 33); g.restore(); stars(g, 0.5 * fl2, lt, 7, 40, 56); domeB(g, 68, 49, 0.9, fl2); ground(g, 49, fl2, '#1d2a22', '#0b1210'); chip(g, 22, 31, '帕多瓦', DIM, fl2, 'rgba(20,28,40,0.92)'); arrow(g, 28, 31, 42, 31, GOLD, 0.4, fl2, 1.0); chip(g, 49, 31, '佛罗伦萨', GOLD, fl2, 'rgba(48,38,12,0.92)'); }
    var cw = A_(lt, L[9], 0.7); if (cw > 0.01) { chip(g, 62, 23.6, '宫廷数学家 · 哲学家', '#ffd27a', cw, 'rgba(36,30,12,0.92)'); medici(g, 83, 38, 1.0, cw); galileo(g, 44, 49.4, 13, cw, { pose: 'forward' }, lt); }
  };
  var SERIF_ = '"Noto Serif CJK SC",serif';

  // ---------- g10: Venus has phases; the old model forbids a full Venus ----------
  DRAW.g10 = function (g, lt, L) {
    // Venus: waxing through the phases
    var va = A_(lt, 0.2, 0.9) * (1 - A_(lt, L[2] - 0.2, 0.6));
    if (va > 0.01) { glow(g, 66, 36, 11, 'rgba(255,240,200,0.9)', 0.25 * va); phaseDisc(g, 66, 36, 5.2, 0.5 + 0.0, va, '#f4ecd0', 1); }
    var pw = A_(lt, L[1], 0.6) * (1 - A_(lt, L[2] - 0.2, 0.6));
    if (pw > 0.01) { for (var k = 0; k < 6; k++) { var f = [0.12, 0.25, 0.4, 0.58, 0.78, 0.96][k]; phaseDisc(g, 44 + k * 8.4, 46.6, 2.3, f, pw * A_(lt, L[1] + k * 0.18, 0.4), '#f4ecd0', 1); } chip(g, 66, 27.4, '像月亮一样盈亏', GOLD, pw, 'rgba(48,38,12,0.92)'); }
    // the old model: Venus between us and the Sun, so only crescents
    var po = A_(lt, L[2], 0.8);
    if (po > 0.01) {
      var cx = 34, cy = 38, i;
      g.save(); g.globalAlpha *= po; tx(g, '旧模型：地球在中心', cx, 25.8, 1.8, '#ff9d6e', 'center', 700, SANS, 1); g.restore();
      earthB(g, cx, cy, 2.0, po, lt); ring(g, cx + 4.0, cy, 2.2, 'rgba(200,215,240,0.3)', 0.14, po); ring(g, cx, cy, 4.6, 'rgba(200,215,240,0.25)', 0.14, po);
      var vang = lt * 1.1; var vx = cx + 4.0 + Math.cos(vang) * 2.2, vy = cy + Math.sin(vang) * 2.2; dot(g, vx, vy, 0.7, '#f4ecd0', po); halo(g, vx, vy, 2.0, 'rgba(255,240,200,0.9)', 0.5 * po);
      sunB(g, cx + 12.4, cy, 1.5, po, lt); ln(g, cx, cy, cx + 12.4, cy, 'rgba(255,210,122,0.35)', 0.14, [0.6, 0.5], po);
      var cr = A_(lt, L[3], 0.6); for (i = 0; i < 3; i++) phaseDisc(g, 24 + i * 5.2, 47.6, 1.6, [0.12, 0.22, 0.32][i], cr * po, '#f4ecd0', 1);
      chip(g, 38, 51.4, '只会是月牙', '#ff9d6e', cr * po, 'rgba(56,30,14,0.92)');
    }
    // the telescope, then a nearly full Venus
    var dec = A_(lt, L[4], 0.6) * (1 - A_(lt, L[5] + 0.2, 0.5)); if (dec > 0.01) chip(g, 78, 33.6, '1610 年底', '#8fd0ff', dec, 'rgba(20,34,56,0.92)');
    var tt = A_(lt, L[4], 0.8); if (tt > 0.01) { tripod(g, 90, 46, 7, tt); telescope(g, 90, 44, 14, -2.5, tt, { glow: 0.4 }); }
    var fl = A_(lt, L[5], 0.9);
    if (fl > 0.01) { glow(g, 66, 38, 12, 'rgba(255,240,200,0.9)', 0.3 * fl); phaseDisc(g, 66, 38, 6.2, 0.93, fl, '#f4ecd0', 1); chip(g, 66, 47.2, '近乎满圆', '#7fe0a0', fl, 'rgba(14,44,30,0.92)'); }
    var xa = A_(lt, L[6], 0.3); if (xa > 0.01) { var sc = 2.2 - 1.2 * eo(xa); g.save(); g.translate(34, 38); g.scale(sc, sc); xMark(g, 0, 0, 6.2, '#ef5b43', xa, 1.0); g.restore(); }
  };
