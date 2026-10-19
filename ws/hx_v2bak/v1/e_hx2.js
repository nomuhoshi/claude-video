  // ================= heat video: scenes d6-d10 =================
  // ---------- d6: hammering heats the metal ----------
  DRAW.d6 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.7);
    var hs = L[1] + 0.5, per = 0.9, nh = lt > hs ? Math.floor((lt - hs) / per) + 1 : 0;
    var u = lt > hs ? ((lt - hs) / per) % 1 : 0.5;
    var heat = 1 - Math.exp(-nh / 6.5);
    // block
    // a block of iron that slowly glows
    var bc = heat < 0.5 ? [mix(118, 150, heat * 2), mix(128, 70, heat * 2), mix(146, 58, heat * 2)] : [mix(150, 255, heat * 2 - 1), mix(70, 140, heat * 2 - 1), mix(58, 60, heat * 2 - 1)];
    var bcs = 'rgb(' + Math.round(bc[0]) + ',' + Math.round(bc[1]) + ',' + Math.round(bc[2]) + ')';
    g.save(); g.globalAlpha *= A; var bg = g.createLinearGradient(0, 31, 0, 42); bg.addColorStop(0, bcs); bg.addColorStop(1, 'rgba(20,22,30,0.95)');
    g.fillStyle = bg; g.beginPath(); if (g.roundRect) g.roundRect(12, 31, 36, 11, 0.8); else g.rect(12, 31, 36, 11); g.fill();
    g.strokeStyle = 'rgba(233,236,242,0.35)'; g.lineWidth = 0.2; g.stroke(); g.restore();
    ln(g, 12.6, 31.4, 47.4, 31.4, 'rgba(255,255,255,0.35)', 0.25, null, A);
    tx(g, '铁块', 21, 38.5, 1.9, 'rgba(238,242,248,0.6)', 'center', 700, SANS, A * (1 - heat));
    glow(g, 30, 36, 26, 'rgba(255,125,60,0.9)', 0.25 * heat * A);
    // hammer: swings about the wrist; flat at the moment it lands
    var th = Math.PI + (lt > hs ? 0.95 * Math.pow(Math.sin(Math.PI * u), 0.8) : 0.35);
    g.save(); g.globalAlpha *= A; g.translate(48.5, 25.4); g.rotate(th);
    g.lineCap = 'round'; g.strokeStyle = '#8a5f34'; g.lineWidth = 1.5; g.beginPath(); g.moveTo(-3.2, 0); g.lineTo(17.6, 0); g.stroke();
    g.strokeStyle = '#c8955a'; g.lineWidth = 0.5; g.beginPath(); g.moveTo(-2.8, -0.35); g.lineTo(17, -0.35); g.stroke();
    g.strokeStyle = '#3a2a1c'; g.lineWidth = 1.9; g.beginPath(); g.moveTo(-3.4, 0); g.lineTo(2.2, 0); g.stroke();
    var hg = g.createLinearGradient(16, 0, 21, 0); hg.addColorStop(0, '#6f7a8c'); hg.addColorStop(0.5, '#e3e8f0'); hg.addColorStop(1, '#7c879a');
    g.fillStyle = hg; g.beginPath(); if (g.roundRect) g.roundRect(16.3, -5.4, 4.4, 9.4, 0.7); else g.rect(16.3, -5.4, 4.4, 9.4); g.fill();
    g.fillStyle = '#c9d1dd'; g.beginPath(); if (g.roundRect) g.roundRect(15.8, 3.4, 5.4, 1.9, 0.5); else g.rect(15.8, 3.4, 5.4, 1.9); g.fill();
    g.restore();
    // sparks at the last hit
    var lh = nh > 0 ? hs + (nh - 1) * per : -9, sh = lt - lh;
    if (sh < 0.5 && sh >= 0) for (i = 0; i < 8; i++) {
      var an = -Math.PI * (0.1 + 0.8 * i / 7), v = 9 + (i % 3) * 3;
      dot(g, 30 + Math.cos(an) * v * sh * 1.2, 31 + Math.sin(an) * v * sh + 18 * sh * sh, 0.35, 'rgb(255,214,120)', 1 - sh / 0.5);
      glow(g, 30, 31, 4, 'rgba(255,220,150,0.9)', 0.6 * (1 - sh / 0.5));
    }
    // the lens
    var lz = A_(lt, L[1] + 0.3, 0.9), LX = 72, LY = 25, LR = 14;
    if (lz > 0.01) {
      ln(g, 49, 34, LX - LR + 1, LY + 5, 'rgba(143,208,255,0.5)', 0.18, [0.6, 0.6], lz);
      g.save(); g.globalAlpha *= lz; g.fillStyle = 'rgba(40,40,52,0.6)'; g.beginPath(); g.arc(LX, LY, LR, 0, TAU); g.fill(); g.restore();
      var hp = hexG(11, 4.4, LX, LY);
      for (i = 0; i < hp.length; i++) jat(g, hp[i][0], hp[i][1], 1.3, lt, i * 1.7, 0.25 + 1.5 * heat, 3 + 8 * heat, 0.1 + 0.85 * heat, lz, true);
      ring(g, LX, LY, LR, ICE, 0.45, lz);
    }
    // thermometer
    var th = A_(lt, L[2], 0.8);
    rbox(g, 56, 40.2, 30, 1.6, 0.8, 'rgba(238,242,248,0.4)', 0.15, null, th);
    rbox(g, 56, 40.2, 30 * (0.12 + 0.88 * heat), 1.6, 0.8, null, 0, heatCol(heat), th);
    tx(g, '温度', 71, 44.4, 1.9, DIM, 'center', 600, SANS, th);
    var q = A_(lt, L[0], 0.7) * (1 - A_(lt, L[1], 0.5));
    glow(g, 50, 16, 9, 'rgba(242,198,107,0.9)', 0.25 * q);
    tx(g, '？', 50, 16, 9, GOLD, 'center', 900, SANS, q);
    chip(g, 30, 46, '敲得越多，越热', HOT, A_(lt, L[2] + 0.2, 0.6) * (1 - A_(lt, L[3], 0.5)), 'rgba(50,24,18,0.95)');
    chip(g, 30, 46, '你让原子抖起来了', GOLD, A_(lt, L[3] + 0.1, 0.7), 'rgba(48,38,12,0.95)');
  };

  // ---------- d7: atoms want company ----------
  var DROP = hexG(14, 3.5, 40, 28);
  function nbrs(P, k) { var c = [], i; for (i = 0; i < P.length; i++) if (i !== k) { var dx = P[i][0] - P[k][0], dy = P[i][1] - P[k][1]; if (dx * dx + dy * dy < 3.9 * 3.9) c.push(i); } return c; }
  var DIN = (function () { var b = 0, bd = 1e9, i; for (i = 0; i < DROP.length; i++) { var d = Math.hypot(DROP[i][0] - 38, DROP[i][1] - 27); if (d < bd) { bd = d; b = i; } } return b; })();
  var DOUT = (function () { var b = 0, bd = -1, i; for (i = 0; i < DROP.length; i++) { var an = Math.atan2(DROP[i][1] - 28, DROP[i][0] - 40); if (Math.abs(an - 0.35) < 0.3) { var d = Math.hypot(DROP[i][0] - 40, DROP[i][1] - 28); if (d > bd) { bd = d; b = i; } } } return b; })();
  DRAW.d7 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8), P = DROP;
    var ln_a = A_(lt, L[1], 0.9) * (1 - 0.65 * A_(lt, L[3] - 0.1, 0.6));
    var inI = A_(lt, L[3], 0.7), outI = A_(lt, L[4], 0.7);
    glow(g, 40, 28, 22, 'rgba(110,185,255,0.9)', 0.16 * A);
    ring(g, 40, 28, 15.6, 'rgba(143,208,255,0.35)', 0.2, A);
    // faint links
    for (i = 0; i < P.length; i++) { var nb = nbrs(P, i), q; for (q = 0; q < nb.length; q++) if (nb[q] > i) ln(g, P[i][0], P[i][1], P[nb[q]][0], P[nb[q]][1], 'rgba(143,208,255,0.55)', 0.12, null, ln_a * 0.55); }
    for (i = 0; i < P.length; i++) jat(g, P[i][0], P[i][1], 1.25, lt, i * 1.31, 0.35, 3.2, 0.12, A * A_(lt, 0.3 + (i % 9) * 0.06, 0.5), false);
    // inner atom
    var ni = nbrs(P, DIN), no = nbrs(P, DOUT), q2;
    for (q2 = 0; q2 < ni.length; q2++) ln(g, P[DIN][0], P[DIN][1], P[ni[q2]][0], P[ni[q2]][1], GRN, 0.45, null, inI);
    ring(g, P[DIN][0], P[DIN][1], 2.1, GRN, 0.3, inI);
    ln(g, P[DIN][0] + 2, P[DIN][1] - 1, 62, 17, 'rgba(98,214,160,0.6)', 0.15, [0.5, 0.5], inI);
    chip(g, 74, 17, ni.length + ' 个同伴：很满足', GRN, inI, 'rgba(12,40,30,0.95)');
    // surface atom
    for (q2 = 0; q2 < no.length; q2++) ln(g, P[DOUT][0], P[DOUT][1], P[no[q2]][0], P[no[q2]][1], HOT, 0.45, null, outI);
    ring(g, P[DOUT][0], P[DOUT][1], 2.1, HOT, 0.3, outI);
    ln(g, P[DOUT][0] + 2, P[DOUT][1] + 0.6, 62, 32, 'rgba(255,157,110,0.6)', 0.15, [0.5, 0.5], outI);
    chip(g, 74, 32, no.length + ' 个同伴：想往里钻', HOT, outI, 'rgba(50,24,18,0.95)');
    // air side
    var air = A_(lt, L[5], 0.8);
    for (i = 0; i < 9; i++) { var ax = 58 + ((i * 37) % 11), ay = 22 + ((i * 53) % 16); dot(g, ax + Math.sin(lt * 1.3 + i) * 0.8, ay + Math.cos(lt * 1.1 + i * 2) * 0.8, 0.45, 'rgba(147,161,182,0.7)', air * 0.8); }
    chip(g, 74, 42, '另一侧：只有空气', DIM, air);
    var ax2 = P[DOUT][0], ay2 = P[DOUT][1];
    arrow(g, ax2 + 5.5, ay2 - 0.4, ax2 + 1.8, ay2 - 0.1, RED, 0.35, air * (0.6 + 0.4 * Math.sin(lt * 5)), 1.0);
    chip(g, 40, 8, '一滴水里的原子', ICE, A_(lt, L[0] + 0.3, 0.7));
    chip(g, 40, 47.4, '互相吸引，都想有同伴', GOLD, 0);
  };

  // ---------- d8: a crowd squeezes into a ball ----------
  var CROWD = (function () { var r = rng(77), P = hexG(10.4, 2.9, 0, 0), i; for (i = 0; i < P.length; i++) { P[i][0] += (r() - 0.5) * 1.3; P[i][1] += (r() - 0.5) * 1.3; } return P; })();
  DRAW.d8 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8), CX = 50, CY = 25;
    var sq = eio(pr(lt, L[4], 1.6)) , edge = A_(lt, L[2], 0.7), pull = A_(lt, L[3], 0.7);
    var sc = 1.0 - 0.12 * sq;
    for (i = 0; i < CROWD.length; i++) {
      var p = CROWD[i], rad = Math.hypot(p[0], p[1]), isE = rad > 7.4, ea = isE ? edge : 0;
      var x = CX + p[0] * sc, y = CY + p[1] * sc * (1 - 0.0), jam = 1 - 0.55 * sq;
      var px = x + jx(lt, i * 1.7, 0.9 * jam, 6), py = y + jy(lt, i * 1.7, 0.9 * jam, 6);
      var a = A * A_(lt, L[0] + (i % 11) * 0.06, 0.5);
      glow(g, px, py, 1.9, ea > 0.3 ? 'rgba(255,107,107,0.9)' : 'rgba(242,198,107,0.9)', 0.4 * a);
      dot(g, px, py, 0.95, ea > 0.3 ? mixCol(ea) : GOLD, a);
      if (isE && pull > 0.01) {
        var an = Math.atan2(p[1], p[0]), bump = 0.6 + 0.4 * Math.sin(lt * 6 + i);
        arrow(g, px + Math.cos(an) * 3.6, py + Math.sin(an) * 3.6, px + Math.cos(an) * 1.5, py + Math.sin(an) * 1.5, RED, 0.22, pull * bump * (1 - 0.7 * sq), 0.6);
      }
    }
    function mixCol(e) { return e > 0.6 ? RED : '#ffb070'; }
    chip(g, CX, 9, '一群人，都想有最多的同伴', GOLD, A_(lt, L[1], 0.7) * (1 - A_(lt, L[2], 0.5)), 'rgba(48,38,12,0.95)');
    chip(g, CX, 9, '边缘的人最着急，不停往里挤', RED, A_(lt, L[2] + 0.3, 0.7) * (1 - A_(lt, L[4], 0.5)), 'rgba(50,20,20,0.95)');
    // ball outline
    var ring_a = A_(lt, L[4] + 0.8, 0.8);
    ring(g, CX, CY, 11.6 * sc, 'rgba(242,198,107,0.75)', 0.3, ring_a);
    glow(g, CX, CY, 17, 'rgba(242,198,107,0.9)', 0.15 * ring_a);
    chip(g, CX, 9, '挤成紧紧的一团', GOLD, ring_a * (1 - A_(lt, L[6], 0.5)), 'rgba(48,38,12,0.95)');
    // ghost: a flat sheet
    var gh = A_(lt, L[5], 0.8);
    if (gh > 0.01) {
      g.save(); g.globalAlpha *= gh * 0.7; g.setLineDash([0.9, 0.7]); g.strokeStyle = DIM; g.lineWidth = 0.2; g.beginPath(); g.ellipse(CX, 41.5, 26, 3.2, 0, 0, TAU); g.stroke(); g.restore();
      for (i = 0; i < 12; i++) dot(g, CX - 22 + i * 4, 41.5 + Math.sin(i * 2.1 + lt * 3) * 0.9, 0.55, 'rgba(147,161,182,0.7)', gh * 0.7);
      var xa = A_(lt, L[5] + 0.6, 0.5);
      ln(g, CX - 3, 38.4, CX + 3, 44.6, RED, 0.5, null, xa); ln(g, CX + 3, 38.4, CX - 3, 44.6, RED, 0.5, null, xa);
      tx(g, '摊开成一片', CX + 33, 41.5, 1.9, DIM, 'left', 600, SANS, gh * 0.9);
    }
    var st = A_(lt, L[6], 0.9);
    glow(g, CX, 9, 18, 'rgba(242,198,107,0.9)', 0.22 * st);
    tx(g, '表面张力', CX, 9, 5.6, GOLD, 'center', 900, SANS, st);
  };

  // ---------- d9: the droplet slowly disappears ----------
  var DOME = (function () { var P = hexG(15, 3.4, 0, 0), Q = [], i; for (i = 0; i < P.length; i++) if (P[i][1] <= 0.2) Q.push(P[i]); return Q; })();
  DRAW.d9 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8), TY = 36.5, CX = 50;
    var shr = eio(pr(lt, L[4] - 0.2, 3.4)) * 0.78 + 0.22 * eio(pr(lt, L[5] + 0.1, 1.2));
    var s = 1 - shr, R = 15.5 * s;
    ln(g, 12, TY, 88, TY, 'rgba(238,242,248,0.45)', 0.25, null, A);
    if (R > 0.4) {
      g.save(); g.globalAlpha *= A; g.fillStyle = 'rgba(110,185,255,0.18)'; g.strokeStyle = 'rgba(143,208,255,0.65)'; g.lineWidth = 0.25;
      g.beginPath(); g.arc(CX, TY, R, Math.PI, 0); g.closePath(); g.fill(); g.stroke(); g.restore();
      glow(g, CX, TY - R * 0.3, R * 1.3, 'rgba(110,185,255,0.9)', 0.18 * A);
      for (i = 0; i < DOME.length; i++) {
        var p = DOME[i], x = CX + p[0] * s, y = TY - 1.4 + p[1] * s * 1.0;
        var a = A * A_(lt, 0.3 + (i % 8) * 0.06, 0.5) * (1 - A_(lt, L[5] + 0.7 + (i % 5) * 0.12, 0.7));
        jat(g, x, y, 1.2 * (0.55 + 0.45 * s), lt, i * 1.43, 0.3, 3.2, 0.12, a, false);
      }
      var inw = A_(lt, L[1], 0.8) * (1 - A_(lt, L[2] - 0.1, 0.6));
      for (i = 0; i < 9; i++) {
        var an = -Math.PI + (i + 0.5) / 9 * Math.PI, bump = 0.65 + 0.35 * Math.sin(lt * 5 + i);
        arrow(g, CX + Math.cos(an) * (R + 4.2), TY - 1.4 + Math.sin(an) * (R + 4.2), CX + Math.cos(an) * (R + 0.7), TY - 1.4 + Math.sin(an) * (R + 0.7), RED, 0.25, inw * bump, 0.7);
      }
    }
    // escaping atoms
    var K = 9;
    for (i = 0; i < K; i++) {
      var te = L[2] + 0.4 + i * 0.62, tau = lt - te; if (tau < 0 || tau > 3.2) continue;
      var an2 = -Math.PI + (0.12 + 0.76 * ((i * 0.618) % 1)) * Math.PI, R0 = 15.5 * (1 - 0.7 * eio(pr(te, L[4] - 0.2, 3.4)));
      var sx = CX + Math.cos(an2) * R0, sy = TY - 1.4 + Math.sin(an2) * R0;
      var vx = Math.cos(an2) * 4.5, vy = Math.sin(an2) * 4.5 - 1.5;
      var ex = sx + vx * tau, ey = sy + vy * tau, fa = clamp(1 - tau / 3.2) * clamp(tau / 0.2);
      var tx0 = sx + vx * Math.max(0, tau - 0.18), ty0 = sy + vy * Math.max(0, tau - 0.18);
      ln(g, ex, ey, tx0, ty0, 'rgba(143,208,255,0.55)', 0.7, null, fa);
      glow(g, ex, ey, 2.2, 'rgba(143,208,255,0.9)', 0.4 * fa); dot(g, ex, ey, 0.85, ELE, fa);
    }
    chip(g, CX, 8, '表面的原子，都想往里钻', RED, A_(lt, L[1] + 0.2, 0.7) * (1 - A_(lt, L[2], 0.5)), 'rgba(50,20,20,0.95)');
    chip(g, CX, 8, '同时，也有原子正在逃走', ICE, A_(lt, L[2] + 0.4, 0.7) * (1 - A_(lt, L[4], 0.5)));
    chip(g, CX, 8, '这就是蒸发', GOLD, A_(lt, L[4] + 0.3, 0.7) * (1 - A_(lt, L[5] + 0.4, 0.6)), 'rgba(48,38,12,0.95)');
    var wet = A_(lt, L[5] + 0.6, 1.0);
    if (wet > 0.01) {
      g.save(); g.globalAlpha *= wet * 0.6; g.strokeStyle = 'rgba(143,208,255,0.5)'; g.lineWidth = 0.25; g.setLineDash([0.6, 0.6]);
      g.beginPath(); g.ellipse(CX, TY + 0.4, 15.5, 1.6, 0, 0, TAU); g.stroke(); g.restore();
      chip(g, CX, 44, '原子，都跑进了空气里', ICE, A_(lt, L[5] + 1.0, 0.7));
    }
  };

  // ---------- d10: the joy of imagining ----------
  function runner(g, x, y, lt, a) {
    var w = 7.5, sw = Math.sin(lt * w), sw2 = Math.sin(lt * w + Math.PI);
    g.save(); g.globalAlpha *= a; g.strokeStyle = 'rgba(214,224,240,0.92)'; g.fillStyle = 'rgba(214,224,240,0.92)'; g.lineWidth = 1.15; g.lineCap = 'round'; g.lineJoin = 'round';
    var bob = Math.abs(Math.sin(lt * w)) * 0.6, hx = x + 1.3, hy = y - 8.2 - bob;
    g.beginPath(); g.arc(x + 2.1, y - 17.4 - bob, 1.9, 0, TAU); g.fill();
    g.beginPath(); g.moveTo(x + 1.8, y - 15.2 - bob); g.lineTo(hx, hy); g.stroke();
    function limb(x0, y0, a1, l1, a2, l2) { var kx = x0 + Math.sin(a1) * l1, ky = y0 + Math.cos(a1) * l1; g.beginPath(); g.moveTo(x0, y0); g.lineTo(kx, ky); g.lineTo(kx + Math.sin(a2) * l2, ky + Math.cos(a2) * l2); g.stroke(); }
    limb(hx, hy, 0.95 * sw, 4.3, 0.95 * sw - 0.9 - 0.6 * sw, 4.2);
    limb(hx, hy, 0.95 * sw2, 4.3, 0.95 * sw2 - 0.9 - 0.6 * sw2, 4.2);
    limb(x + 1.6, y - 14.2 - bob, -0.9 * sw + 0.2, 3.2, -0.9 * sw - 1.2, 3.0);
    limb(x + 1.6, y - 14.2 - bob, -0.9 * sw2 + 0.2, 3.2, -0.9 * sw2 - 1.2, 3.0);
    g.restore();
    var i;
    for (i = 0; i < 6; i++) {
      var p = (lt * 0.9 + i / 6) % 1, sx = x + 0.5 - p * 8, sy = y - 20 + p * 6 + 12 * p * p;
      dot(g, sx, sy, 0.5 * (1 - p * 0.4), ICE, a * (1 - p) * 0.95);
    }
  }
  DRAW.d10 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.7);
    // eye + joy
    var e = A_(lt, L[0] + 0.1, 0.8) * (1 - A_(lt, L[2] - 0.1, 0.6));
    glow(g, 50, 22, 20, 'rgba(242,198,107,0.9)', 0.3 * e);
    for (i = 0; i < 12; i++) { var an = i / 12 * TAU + lt * 0.4; ln(g, 50 + Math.cos(an) * 14, 22 + Math.sin(an) * 9.5, 50 + Math.cos(an) * 18, 22 + Math.sin(an) * 12.5, 'rgba(242,198,107,0.5)', 0.2, null, e); }
    h_eye(g, 50, 22, 4.6, GOLD, e, 0.1 * (1 - Math.sin(lt * 1.6) * 0.5 - 0.5));
    chip(g, 50, 38, '想象，本身就是乐趣', GOLD, A_(lt, L[1] + 0.3, 0.7) * (1 - A_(lt, L[2] - 0.1, 0.6)), 'rgba(48,38,12,0.95)');
    // runner
    var ra = A_(lt, L[2], 0.8);
    runner(g, 27, 41, lt, ra);
    ln(g, 12, 41.2, 42, 41.2, 'rgba(238,242,248,0.3)', 0.2, [0.8, 0.8], ra);
    chip(g, 27, 8.5, '跑步的人，从流汗里得到快乐', ICE, A_(lt, L[3], 0.7) * (1 - A_(lt, L[4] - 0.1, 0.6)));
    // thought bubble
    var tb = A_(lt, L[4], 0.9);
    if (tb > 0.01) {
      dot(g, 36, 23, 0.7, 'rgba(238,242,248,0.5)', tb); dot(g, 39, 19.5, 1.1, 'rgba(238,242,248,0.5)', tb); dot(g, 43, 15.5, 1.6, 'rgba(238,242,248,0.5)', tb);
      g.save(); g.globalAlpha *= tb; g.fillStyle = 'rgba(30,44,70,0.75)'; g.strokeStyle = 'rgba(238,242,248,0.5)'; g.lineWidth = 0.22;
      g.beginPath(); g.ellipse(68, 20, 22, 12.5, 0, 0, TAU); g.fill(); g.stroke(); g.restore();
      // three small scenes from this video
      var ia = tb * A_(lt, L[4] + 0.4, 0.7), ib = tb * A_(lt, L[4] + 1.0, 0.7), ic = tb * A_(lt, L[5], 0.7), sp = 1 + 0.8 * A_(lt, L[6], 1.0), q;
      var hp0 = hexG(4.2, 2.5, 55, 18.5); for (q = 0; q < hp0.length; q++) jat(g, hp0[q][0], hp0[q][1], 0.85, lt * sp, q * 1.9, 0.75, 9, 0.95, ia, true);
      tx(g, '热', 55, 27.6, 2.0, HOT, 'center', 800, SANS, ia);
      var bo = bounce(((lt * sp) % 2.4), 1.0, 0.7, 7.5); ln(g, 63.5, 24.4, 72.5, 24.4, 'rgba(238,242,248,0.45)', 0.2, null, ib);
      glow(g, 68, 23 - bo[0], 3, 'rgba(255,157,110,0.9)', 0.35 * ib); dot(g, 68, 23 - bo[0], 1.4, HOT, ib);
      tx(g, '弹跳', 68, 27.6, 2.0, GOLD, 'center', 800, SANS, ib);
      g.save(); g.globalAlpha *= ic; g.fillStyle = 'rgba(110,185,255,0.4)'; g.strokeStyle = 'rgba(143,208,255,0.8)'; g.lineWidth = 0.22; g.beginPath(); g.arc(81, 24.4, 4.8, Math.PI, 0); g.closePath(); g.fill(); g.stroke(); g.restore();
      for (q = 0; q < 3; q++) { var pe = ((lt * sp * 0.6 + q / 3) % 1); dot(g, 81 + (q - 1) * 2.2 + (q - 1) * pe * 2, 19.4 - pe * 7, 0.55, ELE, ic * (1 - pe)); }
      tx(g, '水滴', 81, 27.6, 2.0, ICE, 'center', 800, SANS, ic);
    }
    var ca = A_(lt, L[5] + 0.2, 0.7) * (1 - A_(lt, L[6] - 0.1, 0.6));
    chip(g, 68, 38, '想着这些现象，就是它的快乐', GOLD, ca, 'rgba(48,38,12,0.95)');
    var lp = A_(lt, L[6], 0.8);
    chip(g, 68, 38, '想着想着，就停不下来……', GOLD, lp, 'rgba(48,38,12,0.95)');
  };
