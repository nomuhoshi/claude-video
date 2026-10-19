  // ================= copper / generator video: kit and scenes d0-d5 =================
  var COP = '#e0975a', COPD = 'rgba(224,151,90,0.9)', CRIM = '#ff9d9d', WATER = '#5aa9e6', NRED = '#ff7a6e', SBLU = '#6fb3ff';
  function fr(v) { return v - Math.floor(v); }
  function W_(lt, t0, t1, fi, fo) { return A_(lt, t0, fi || 0.6) * (t1 == null ? 1 : 1 - A_(lt, t1, fo || 0.5)); }
  function glow(g, x, y, r, col, a) { if (a <= 0.003) return; g.save(); g.globalCompositeOperation = 'lighter'; halo(g, x, y, r, col, a); g.restore(); }
  function polyLen(P) { var s = [0], i; for (i = 1; i < P.length; i++) s.push(s[i - 1] + Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1])); return s; }
  function polyAt(P, S, u) {
    var d = u * S[S.length - 1], i = 1; while (i < S.length - 1 && S[i] < d) i++;
    var t = (d - S[i - 1]) / Math.max(1e-6, S[i] - S[i - 1]); return [mix(P[i - 1][0], P[i][0], t), mix(P[i - 1][1], P[i][1], t)];
  }
  function wire(g, P, col, w, a, dash) {
    if (a <= 0.003) return; g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = w; g.lineJoin = 'round'; if (dash) g.setLineDash(dash);
    g.beginPath(); g.moveTo(P[0][0], P[0][1]); for (var i = 1; i < P.length; i++) g.lineTo(P[i][0], P[i][1]); g.stroke(); g.restore();
  }
  function pulses(g, P, lt, spd, n, col, a, r) {
    var S = polyLen(P), i; if (a <= 0.003) return;
    for (i = 0; i < n; i++) { var u = fr(lt * spd + i / n), p = polyAt(P, S, u); glow(g, p[0], p[1], (r || 0.9) * 3, 'rgba(255,214,150,0.9)', 0.6 * a); dot(g, p[0], p[1], r || 0.45, col || '#ffe2b0', a); }
  }
  function wheelW(g, x, y, r, ang, a, col, nsp) {
    if (a <= 0.003) return; var i; nsp = nsp || 6;
    ring(g, x, y, r, col || ICE, Math.max(0.2, r * 0.12), a);
    for (i = 0; i < nsp; i++) { var t = ang + i * TAU / nsp; ln(g, x, y, x + r * Math.cos(t), y + r * Math.sin(t), col || ICE, Math.max(0.15, r * 0.07), null, a); }
    dot(g, x, y, Math.max(0.35, r * 0.16), col || ICE, a);
  }
  function magnetBar(g, x, y, w, h, a, vert) {     // x,y = top-left; N red, S blue
    if (a <= 0.003) return;
    if (vert) {
      rbox(g, x, y, w, h / 2, 0.3, null, 0, NRED, a); rbox(g, x, y + h / 2, w, h / 2, 0.3, null, 0, SBLU, a);
      tx(g, 'N', x + w / 2, y + h * 0.25, Math.min(w * 0.75, 2.4), '#2a0a06', 'center', 900, SANS, a); tx(g, 'S', x + w / 2, y + h * 0.75, Math.min(w * 0.75, 2.4), '#06213a', 'center', 900, SANS, a);
    } else {
      rbox(g, x, y, w / 2, h, 0.3, null, 0, NRED, a); rbox(g, x + w / 2, y, w / 2, h, 0.3, null, 0, SBLU, a);
      tx(g, 'N', x + w * 0.25, y + h / 2, Math.min(h * 0.75, 2.4), '#2a0a06', 'center', 900, SANS, a); tx(g, 'S', x + w * 0.75, y + h / 2, Math.min(h * 0.75, 2.4), '#06213a', 'center', 900, SANS, a);
    }
  }
  function coilV(g, cx, y0, y1, rx, ry, a, col) {          // a vertical coil: stacked flat ellipses
    if (a <= 0.003) return; var n = Math.max(3, Math.round((y1 - y0) / (ry * 1.7))), i;
    for (i = 0; i < n; i++) { var y = y0 + (y1 - y0) * (i + 0.5) / n; g.save(); g.globalAlpha *= a; g.strokeStyle = col || COP; g.lineWidth = 0.5; g.beginPath(); g.ellipse(cx, y, rx, ry, 0, 0, TAU); g.stroke(); g.restore(); }
  }
  function motorIcon(g, cx, cy, R, ang, a, hot) {
    if (a <= 0.003) return;
    g.save(); g.globalAlpha *= a;
    g.lineWidth = R * 0.30; g.lineCap = 'butt';
    g.strokeStyle = NRED; g.beginPath(); g.arc(cx, cy, R * 1.45, Math.PI * 0.72, Math.PI * 1.28); g.stroke();
    g.strokeStyle = SBLU; g.beginPath(); g.arc(cx, cy, R * 1.45, -Math.PI * 0.28, Math.PI * 0.28); g.stroke();
    g.restore();
    tx(g, 'N', cx - R * 1.06, cy, R * 0.42, NRED, 'center', 900, SANS, a); tx(g, 'S', cx + R * 1.06, cy, R * 0.42, SBLU, 'center', 900, SANS, a);
    var c = Math.cos(ang), i;
    for (i = 0; i < 3; i++) {
      g.save(); g.globalAlpha *= a; g.strokeStyle = COP; g.lineWidth = R * 0.14; g.beginPath(); g.ellipse(cx, cy, Math.max(0.08, R * 0.82 * Math.abs(c)) * (1 - i * 0.12), R * (0.92 - i * 0.12), 0, 0, TAU); g.stroke(); g.restore();
    }
    dot(g, cx, cy, R * 0.12, FG, a);
    if (hot) glow(g, cx, cy, R * 2.4, 'rgba(224,151,90,0.9)', 0.25 * hot * a);
  }
  function house(g, x, y, s, col, a) {       // x,y = bottom-centre
    if (a <= 0.003) return; g.save(); g.globalAlpha *= a; g.fillStyle = col || 'rgba(143,208,255,0.22)'; g.strokeStyle = ICE; g.lineWidth = 0.2;
    g.beginPath(); g.rect(x - s, y - s * 1.2, s * 2, s * 1.2); g.fill(); g.stroke();
    g.beginPath(); g.moveTo(x - s * 1.2, y - s * 1.2); g.lineTo(x, y - s * 2.2); g.lineTo(x + s * 1.2, y - s * 1.2); g.closePath(); g.fill(); g.stroke(); g.restore();
  }
  function drillIcon(g, x, y, s, a, vib) {   // handpiece, x,y = left-middle of handle
    if (a <= 0.003) return; var o = vib ? Math.sin(vib * 60) * 0.12 * s : 0;
    rbox(g, x, y - 1.6 * s + o, 15 * s, 3.2 * s, 1.4 * s, 'rgba(238,242,248,0.9)', 0.28, 'rgba(60,80,110,0.9)', a);
    ln(g, x + 15 * s, y + o, x + 19 * s, y - 4 * s + o, 'rgba(238,242,248,0.9)', 1.8 * s, null, a);
    rbox(g, x + 17 * s, y - 7 * s + o, 6 * s, 3.4 * s, 1.1 * s, 'rgba(238,242,248,0.9)', 0.28, 'rgba(60,80,110,0.9)', a);
    ln(g, x + 20 * s, y - 3.6 * s + o, x + 20 * s, y + 0.6 * s + o, '#cfd8e6', 0.5 * s, null, a);
  }

  // ---------- d0: opening ----------
  DRAW.d0 = function (g, lt, L) {
    var ia = A_(lt, 0.2, 1.0), i, bx = 74, by = 31.5;
    // thought bubble that grows
    var b0 = A_(lt, 0.4, 1.2), b4 = A_(lt, L[4] - 0.2, 0.9);
    for (i = 0; i < 3; i++) dot(g, mix(44, 59, i / 2), mix(36, 33, i / 2), 0.7 + i * 0.5, 'rgba(143,208,255,0.55)', b0 * ia);
    g.save(); g.globalAlpha *= b0 * ia; g.strokeStyle = 'rgba(143,208,255,0.75)'; g.lineWidth = 0.3; g.setLineDash(b4 > 0.5 ? [] : [0.8, 0.6]);
    g.beginPath(); g.ellipse(bx, by, 16, 11.5, 0, 0, TAU); g.fillStyle = 'rgba(40,80,130,0.18)'; g.fill(); g.stroke(); g.restore();
    glow(g, bx, by, 18, 'rgba(143,208,255,0.9)', 0.13 * b0);
    var r = rng(5); for (i = 0; i < 9; i++) { var q = fr(lt * 0.25 + r()), sx = bx + (r() - 0.5) * 24, sy = by + (r() - 0.5) * 16; dot(g, sx, sy, 0.3, '#cfeaff', b0 * (1 - b4) * Math.sin(q * Math.PI)); }
    motorIcon(g, bx, by, 5.2, lt * 7, b4, 0.6);
    // the drill
    var da = A_(lt, L[2] - 0.2, 0.8);
    drillIcon(g, 10, 39, 1.25, da, lt > L[2] ? lt : 0);
    if (lt > L[3] - 0.1) { var pa = A_(lt, L[3], 0.5); for (i = 0; i < 3; i++) { var s = lt * 9 + i; ln(g, 36 + i * 1.4, 28 - i * 0.6, 37.2 + i * 1.4, 28 - i * 0.6 + Math.sin(s) * 1.2, '#ff6b6b', 0.28, null, pa * 0.9); } tx(g, '疼！', 33, 24.4, 2.4, '#ff6b6b', 'center', 900, SANS, pa * (1 - b4)); }
    chip(g, 24, 45, '牙医的钻头', ICE, da);
    chip(g, bx, 45.6, '那个小马达', COP, b4, 'rgba(50,30,14,0.95)');
  };

  // ---------- d1: the little motor ----------
  DRAW.d1 = function (g, lt, L) {
    var a0 = A_(lt, 0.1, 0.8), cx = 44, cy = 27, R = 10;
    motorIcon(g, cx, cy, R, lt * 6, a0, 0.7);
    chip(g, cx, 10, '钻头里的小马达', COP, A_(lt, L[0] + 0.1, 0.6), 'rgba(50,30,14,0.95)');
    var qa = A_(lt, L[1] + 0.1, 0.6); tx(g, '？', cx, cy - R * 1.9, 3.6, RED, 'center', 900, SANS, qa * (1 - A_(lt, L[4] + 0.2, 0.5)));
    // compressed-air version (dim)
    var aa = W_(lt, L[2] + 0.1, null, 0.6) * (1 - 0.55 * A_(lt, L[3] + 0.1, 0.6));
    wheelW(g, 84, 27, 6, lt * 14, aa, '#9fb4d0', 8);
    for (var i = 0; i < 3; i++) { var q = fr(lt * 1.2 + i / 3); ln(g, 70 + q * 6, 21 + i * 6, 74 + q * 6, 21 + i * 6, 'rgba(159,180,208,0.6)', 0.25, null, aa * (1 - q)); }
    chip(g, 84, 38, '压缩空气款', '#9fb4d0', aa);
    chip(g, cx, 44, '电动款', COP, A_(lt, L[3] + 0.1, 0.6), 'rgba(50,30,14,0.95)');
    // the wire leaving to the left
    var wa = A_(lt, L[4] - 0.1, 0.8); var P = [[cx - 16, cy], [6, cy]];
    wire(g, P, COP, 0.5, wa); pulses(g, [[6, cy], [cx - 16, cy]], lt, 0.5, 3, '#ffe2b0', wa);
    arrow(g, 14, cy - 5, 6, cy - 5, 'rgba(224,151,90,0.9)', 0.3, wa, 0.8);
    chip(g, 17, cy + 6.2, '电，从哪来？', GOLD, wa, 'rgba(40,30,12,0.95)');
  };

  // ---------- d2: the dam ----------
  DRAW.d2 = function (g, lt, L) {
    var a0 = A_(lt, 0.1, 0.8), i, wx = 66, wy = 35, wr = 8.5;
    // reservoir
    var da = A_(lt, L[0] - 0.1, 0.8);
    rbox(g, 5, 16, 33, 25, 0.3, null, 0, 'rgba(90,169,230,0.30)', da);
    g.save(); g.globalAlpha *= da; g.strokeStyle = 'rgba(160,215,255,0.8)'; g.lineWidth = 0.25; g.beginPath();
    for (i = 0; i <= 33; i++) { var yy = 16.6 + Math.sin(lt * 2 + i * 0.6) * 0.35; if (i) g.lineTo(5 + i, yy); else g.moveTo(5, yy); } g.stroke(); g.restore();
    g.save(); g.globalAlpha *= da; g.fillStyle = 'rgba(150,160,175,0.95)'; g.strokeStyle = 'rgba(238,242,248,0.8)'; g.lineWidth = 0.25;
    g.beginPath(); g.moveTo(38, 13); g.lineTo(46, 13); g.lineTo(52, 41); g.lineTo(38, 41); g.closePath(); g.fill(); g.stroke(); g.restore();
    chip(g, 21, 10, '大坝', FG, da);
    // water over the spillway and down onto the wheel
    var fa = A_(lt, L[1] + 0.05, 0.6);
    for (i = 0; i < 22; i++) { var q = fr(lt * 0.9 + i / 22), x = mix(46, 62, Math.pow(q, 0.8)), y = mix(14, 30, q * q * 0.6 + q * 0.4) + (i % 3) * 0.2; dot(g, x, y, 0.45, 'rgba(160,215,255,0.9)', fa * Math.sin(Math.min(1, q * 1.1) * Math.PI)); }
    ln(g, 46, 13.4, 48.5, 13.4, 'rgba(160,215,255,0.9)', 0.5, null, fa);
    // wheel
    var wa = A_(lt, L[2] - 0.1, 0.8), sp = 1.0 + 4 * A_(lt, L[2], 1.2);
    wheelW(g, wx, wy, wr, lt * sp, wa, ICE, 8);
    for (i = 0; i < 8; i++) { var t = lt * sp + i * TAU / 8; rbox(g, wx + (wr + 0.1) * Math.cos(t) - 0.9, wy + (wr + 0.1) * Math.sin(t) - 0.9, 1.8, 1.8, 0.3, null, 0, 'rgba(143,208,255,0.9)', wa); }
    chip(g, wx, 46, '巨大的轮子', ICE, wa);
    // copper wire out
    var ca = A_(lt, L[3] - 0.1, 0.8), P = [[wx + wr + 0.2, wy], [80, wy], [80, 22], [95, 22]];
    wire(g, P, COP, 0.8, ca); pulses(g, P, lt, 0.4, 4, '#ffe2b0', ca);
    chip(g, 86, 29, '粗铜线', COP, ca, 'rgba(50,30,14,0.95)');
  };

  // ---------- d3: wires spread over the city ----------
  DRAW.d3 = function (g, lt, L) {
    var xs = [8, 24, 40, 56, 72], ys8 = [], i, j, k;
    for (i = 0; i < 8; i++) ys8.push(9 + i * 5.2);
    var lv = [ys8]; for (k = 0; k < 3; k++) { var p = lv[0], q = []; for (j = 0; j < p.length; j += 2) q.push((p[j] + p[j + 1]) / 2); lv.unshift(q); }
    // lv[0] = [root], lv[1] = 2, lv[2] = 4, lv[3] = 8
    var shows = [L[0] - 0.1, L[0] + 0.9, L[1] + 0.1, L[2] + 0.1], allP = [];
    for (k = 1; k <= 3; k++) {
      var aa = A_(lt, shows[k], 0.7), n = lv[k].length;
      for (j = 0; j < n; j++) {
        var par = lv[k - 1][Math.floor(j / 2)], x0 = xs[k - 1], x1 = xs[k], xm = (x0 + x1) / 2, P = [[x0, par], [xm, par], [xm, lv[k][j]], [x1, lv[k][j]]];
        wire(g, P, COP, 0.5 - k * 0.07, aa);
        if (k === 3) allP.push(P);
      }
    }
    var ra = A_(lt, L[0] - 0.2, 0.7), PR = [[2, lv[0][0]], [xs[0], lv[0][0]]];
    wire(g, PR, COP, 0.9, ra); dot(g, xs[0], lv[0][0], 0.9, COP, ra);
    chip(g, 10, lv[0][0] + 6.2, '一根粗铜线', COP, W_(lt, L[0], L[1], 0.6, 0.5), 'rgba(50,30,14,0.95)');
    chip(g, 10, lv[0][0] + 6.2, '分成更多', COP, W_(lt, L[1], L[2], 0.5, 0.5), 'rgba(50,30,14,0.95)');
    chip(g, 10, lv[0][0] + 6.2, '铺满整个城市', COP, W_(lt, L[2], L[3], 0.5, 0.5), 'rgba(50,30,14,0.95)');
    // the little devices at the leaf ends
    var da = A_(lt, L[3] + 0.1, 0.8), wa = A_(lt, L[4] + 0.1, 0.8);
    for (j = 0; j < 8; j++) {
      var y = ys8[j]; ln(g, 56, y, 80, y, COP, 0.35, null, da);
      rbox(g, 80, y - 2.3, 8, 4.6, 0.6, 'rgba(143,208,255,0.7)', 0.18, 'rgba(20,34,56,0.9)', da);
      wheelW(g, 84, y, 1.7, lt * 5 + j, da * (0.3 + 0.7 * wa), ICE, 4);
      if (j % 2 === 0) house(g, 92.5, y + 1.7, 1.6, null, da * 0.8);
    }
    for (j = 0; j < 8; j++) { var Pj = [].concat(allP[j]); Pj.push([80, ys8[j]]); pulses(g, [[2, lv[0][0]]].concat([[xs[0], lv[0][0]]]).concat(allP[j].slice(0)), lt + j * 0.17, 0.45, 1, '#ffe2b0', wa * 0.9, 0.38); }
    chip(g, 84, 47.4, '每一根的末端都有一个小轮子', ICE, wa * 0.0);
  };

  // ---------- d4: the whole city turns with one wheel ----------
  DRAW.d4 = function (g, lt, L) {
    var a0 = A_(lt, 0.1, 0.8), i, j;
    var ts = L[2] + 0.1, te = L[3] + 0.4, A = 4.0 * (lt - clamp((lt - ts) / (te - ts)) * (te - ts) * (lt >= te ? 1 : 1));
    var stopped = lt > ts + 0.15 && lt < te;
    A = 4.0 * (lt - Math.max(0, Math.min(lt, te) - ts));
    wheelW(g, 15, 28, 9, A, a0, ICE, 8); chip(g, 15, 41, '大坝的轮子', ICE, a0);
    var cols = 6, rows = 3, pts = [];
    for (j = 0; j < rows; j++) for (i = 0; i < cols; i++) pts.push([44 + i * 9.4, 14 + j * 13]);
    var la = A_(lt, L[0] - 0.1, 0.9);
    for (j = 0; j < rows; j++) { var yy = 14 + j * 13; wire(g, [[24, 28], [34, 28], [34, yy], [90, yy]], COP, 0.3, la * 0.8); }
    pulses(g, [[24, 28], [34, 28], [34, 14], [90, 14]], lt, stopped ? 0 : 0.5, 3, '#ffe2b0', la * (stopped ? 0 : 1), 0.4);
    pulses(g, [[24, 28], [34, 28], [34, 27], [90, 27]], lt, stopped ? 0 : 0.5, 3, '#ffe2b0', la * (stopped ? 0 : 1), 0.4);
    pulses(g, [[24, 28], [34, 28], [34, 40], [90, 40]], lt, stopped ? 0 : 0.5, 3, '#ffe2b0', la * (stopped ? 0 : 1), 0.4);
    for (i = 0; i < pts.length; i++) { rbox(g, pts[i][0] - 3.6, pts[i][1] - 3.6, 7.2, 7.2, 0.8, 'rgba(143,208,255,0.55)', 0.15, 'rgba(20,34,56,0.9)', la); wheelW(g, pts[i][0], pts[i][1], 2.6, A * 1.3, la, ICE, 5); }
    chip(g, 50, 6.6, '全部停下', CRIM, W_(lt, ts + 0.3, te - 0.1, 0.4, 0.4), 'rgba(50,16,16,0.95)');
    chip(g, 50, 6.6, '又全部转起来', LEAF, W_(lt, te + 0.2, L[4] - 0.1, 0.4, 0.4));
    var ha = A_(lt, L[4] + 0.1, 0.7);
    if (ha > 0.01) { var p = pts[10]; ring(g, p[0], p[1], 5.4, GOLD, 0.35, ha); glow(g, p[0], p[1], 9, 'rgba(242,198,107,0.9)', 0.35 * ha); chip(g, 70, 45.4, '牙医钻头里的这一个', GOLD, ha, 'rgba(40,30,12,0.95)'); }
  };

  // ---------- d5: only copper and iron ----------
  DRAW.d5 = function (g, lt, L) {
    var a0 = A_(lt, 0.1, 0.8), i;
    chip(g, 50, 7.2, '大自然最神奇的地方', GOLD, A_(lt, L[0] + 0.1, 0.6), 'rgba(40,30,12,0.95)');
    var ta = A_(lt, L[1] - 0.1, 0.8);
    rbox(g, 20, 13, 17, 14, 1.2, COPD, 0.3, 'rgba(224,151,90,0.22)', ta); tx(g, 'Cu', 28.5, 18.6, 5.2, COP, 'center', 900, MONO, ta); tx(g, '铜', 28.5, 24.2, 2.2, COP, 'center', 800, SANS, ta);
    rbox(g, 63, 13, 17, 14, 1.2, 'rgba(180,196,220,0.9)', 0.3, 'rgba(150,165,190,0.22)', ta); tx(g, 'Fe', 71.5, 18.6, 5.2, '#b4c4dc', 'center', 900, MONO, ta); tx(g, '铁', 71.5, 24.2, 2.2, '#b4c4dc', 'center', 800, SANS, ta);
    tx(g, '+', 50, 20, 5, DIM, 'center', 700, SANS, ta); tx(g, '就这两样', 50, 25.6, 1.8, DIM, 'center', 700, SANS, ta);
    // the "complicated" generator
    var ca = W_(lt, L[2] - 0.1, L[3] + 0.5, 0.7, 0.9), cx = 50, cy = 37;
    rbox(g, 28, 31, 44, 12, 1.0, 'rgba(238,242,248,0.6)', 0.2, 'rgba(60,80,110,0.5)', ca);
    var r = rng(4); for (i = 0; i < 12; i++) { var gx = 31 + (i % 6) * 6.6 + r() * 1.2, gy = 34 + Math.floor(i / 6) * 5.4; wheelW(g, gx, gy, 1.9 + r() * 0.5, lt * (i % 2 ? 2.2 : -2.6) + i, ca, '#9fb4d0', 6); }
    chip(g, 50, 46.4, '发电机：看着很复杂', DIM, ca);
    // the simple core
    var sa = A_(lt, L[3] + 0.2, 0.9);
    coilV(g, 50, 29, 41, 5.6, 1.2, sa, COP); magnetBar(g, 48, 28, 4, 14, sa, true);
    chip(g, 50, 45.6, '核心：铜线圈 + 铁', COP, sa, 'rgba(50,30,14,0.95)');
  };
