
  // ================= scene helpers shared by draws and sound =================
  var IDX = DATA.idx;
  var DCUES = [], DBEDS = [];            // sound events that depend on the animation (none in this video: all cues are line-anchored)
  var PENTH = [1174.66, 1318.51, 1479.98, 1760.0, 1975.53, 2349.32];
  function sc_(key) { return scenes[IDX[key]]; }

  // ================= drawing kit for the "AI in a box" story =================
  var RED = '#ff6b6b', ICEA = 'rgba(143,208,255,0.55)', REDA = 'rgba(255,107,107,0.6)', GOLDA = 'rgba(242,198,107,0.55)', GRNA = 'rgba(98,214,160,0.5)';
  function A_(lt, s, d) { return eo(pr(lt, s, d)); }
  function rbox(g, x, y, w, h, r, stroke, lw, fill, a, dash) {
    if (a <= 0.003) return;
    g.save(); g.globalAlpha *= a; g.beginPath();
    if (g.roundRect) g.roundRect(x, y, w, h, r); else g.rect(x, y, w, h);
    if (fill) { g.fillStyle = fill; g.fill(); }
    if (stroke) { g.strokeStyle = stroke; g.lineWidth = lw; if (dash) g.setLineDash(dash); g.stroke(); }
    g.restore();
  }
  function arrow(g, x1, y1, x2, y2, col, w, a, hs) {
    if (a <= 0.003) return;
    var ang = Math.atan2(y2 - y1, x2 - x1), s = hs || 0.9;
    ln(g, x1, y1, x2 - Math.cos(ang) * s * 0.6, y2 - Math.sin(ang) * s * 0.6, col, w, null, a);
    arrowHead(g, x2 - Math.cos(ang) * s * 0.7, y2 - Math.sin(ang) * s * 0.7, ang, s, col, a);
  }
  function h_agent(g, x, y, r, col, a, glow) {
    halo(g, x, y, r * 3.2, glow || ICEA, 0.55 * a); dot(g, x, y, r, col || '#cfeaff', a);
    dot(g, x - r * 0.3, y - r * 0.3, r * 0.35, 'rgba(255,255,255,0.9)', a * 0.7);
  }
  function h_globe(g, x, y, r, col, a) {
    if (a <= 0.003) return;
    ring(g, x, y, r, col, 0.3, a);
    g.save(); g.globalAlpha *= a * 0.7; g.strokeStyle = col; g.lineWidth = 0.2;
    g.beginPath(); g.ellipse(x, y, r * 0.42, r, 0, 0, TAU); g.stroke();
    g.beginPath(); g.moveTo(x - r, y); g.lineTo(x + r, y); g.stroke();
    g.beginPath(); g.ellipse(x, y, r, r * 0.38, 0, 0, TAU); g.stroke(); g.restore();
  }
  function chip(g, x, y, s, col, a, bg) {
    if (a <= 0.003) return;
    var w = 3.4, ci; for (ci = 0; ci < s.length; ci++) w += s.charCodeAt(ci) >= 0x2e80 ? 1.95 : 1.15;
    pill(g, x - w / 2, y - 1.55, w, 3.1, bg || 'rgba(20,34,56,0.92)', a);
    g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = 0.18; g.beginPath();
    if (g.roundRect) g.roundRect(x - w / 2, y - 1.55, w, 3.1, 1.55); else g.rect(x - w / 2, y - 1.55, w, 3.1);
    g.stroke(); g.restore();
    tx(g, s, x, y + 0.08, 1.9, col, 'center', 700, SANS, a);
  }
  function h_key(g, x, y, s, col, a) {
    if (a <= 0.003) return;
    g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = 0.25 * s; g.lineCap = 'round';
    g.beginPath(); g.arc(x, y, 0.8 * s, 0, TAU); g.stroke();
    g.beginPath(); g.moveTo(x + 0.8 * s, y); g.lineTo(x + 3 * s, y); g.moveTo(x + 2.3 * s, y); g.lineTo(x + 2.3 * s, y + 0.9 * s); g.moveTo(x + 3 * s, y); g.lineTo(x + 3 * s, y + 0.9 * s); g.stroke(); g.restore();
  }
  function h_eye(g, x, y, s, col, a, lid) {      // lid 0 open .. 1 closed
    if (a <= 0.003) return;
    g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = 0.3 * s; g.lineCap = 'round';
    var o = (1 - lid) * 1.6 * s;
    g.beginPath(); g.moveTo(x - 3 * s, y); g.quadraticCurveTo(x, y - 2 * o - 0.1, x + 3 * s, y); g.quadraticCurveTo(x, y + 2 * o + 0.1, x - 3 * s, y); g.stroke();
    if (lid < 0.7) dot(g, x, y, 0.85 * s * (1 - lid), col, 1);
    g.restore();
  }
  function h_bell(g, x, y, s, ang, col, a) {
    if (a <= 0.003) return;
    g.save(); g.globalAlpha *= a; g.translate(x, y - 4 * s); g.rotate(ang);
    g.fillStyle = col; g.beginPath();
    g.moveTo(-3.6 * s, 4 * s); g.quadraticCurveTo(-3.4 * s, 0.5 * s, -2.2 * s, -1.8 * s); g.quadraticCurveTo(0, -4.2 * s, 2.2 * s, -1.8 * s);
    g.quadraticCurveTo(3.4 * s, 0.5 * s, 3.6 * s, 4 * s); g.closePath(); g.fill();
    g.fillRect(-4.2 * s, 3.8 * s, 8.4 * s, 0.7 * s);
    g.beginPath(); g.arc(0, 5.6 * s, 1 * s, 0, TAU); g.fill(); g.restore();
  }
  function h_note(g, x, y, w, h, col, a, rot, lines) {
    if (a <= 0.003) return;
    g.save(); g.globalAlpha *= a; g.translate(x + w / 2, y + h / 2); g.rotate(rot || 0);
    g.fillStyle = col; g.fillRect(-w / 2, -h / 2, w, h);
    g.fillStyle = 'rgba(11,18,32,0.45)';
    for (var i = 0; i < (lines || 3); i++) g.fillRect(-w / 2 + 0.7, -h / 2 + 0.9 + i * 0.95, w * (i % 2 ? 0.55 : 0.78), 0.3);
    g.restore();
  }
  function h_pkg(g, x, y, s, col, a) { rbox(g, x - s, y - s, 2 * s, 2 * s, 0.25, null, 0, col, a); ln(g, x - s, y, x + s, y, 'rgba(11,18,32,0.5)', 0.18, null, a); }
  function h_cloud(g, x, y, s, col, a) {
    if (a <= 0.003) return;
    g.save(); g.globalAlpha *= a; g.fillStyle = col; g.beginPath();
    g.arc(x - 1.6 * s, y + 0.4 * s, 1.3 * s, 0, TAU); g.arc(x, y - 0.5 * s, 1.8 * s, 0, TAU); g.arc(x + 1.9 * s, y + 0.3 * s, 1.4 * s, 0, TAU);
    g.rect(x - 1.6 * s, y + 0.4 * s, 3.5 * s, 1.3 * s); g.fill(); g.restore();
  }
  function h_crack(g, x, y, len, col, w, p, a) {   // jagged crack running down from (x,y)
    if (p <= 0.003) return;
    var pts = [[0, 0], [0.8, 1.6], [-0.5, 3.2], [0.9, 4.9], [-0.6, 6.6], [0.7, 8.2], [0, 10]], n = Math.max(1, Math.floor(p * (pts.length - 1) + 0.0001)), i;
    g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = w; g.lineJoin = 'round'; g.beginPath(); g.moveTo(x + pts[0][0], y);
    for (i = 1; i <= n; i++) g.lineTo(x + pts[i][0], y + pts[i][1] * len / 10);
    if (n < pts.length - 1) { var f = p * (pts.length - 1) - n; g.lineTo(x + mix(pts[n][0], pts[n + 1][0], f), y + mix(pts[n][1], pts[n + 1][1], f) * len / 10); }
    g.stroke(); g.restore();
  }
  function h_pause(g, x, y, s, col, a) { rbox(g, x - 1.1 * s, y - 1.4 * s, 0.8 * s, 2.8 * s, 0.2, null, 0, col, a); rbox(g, x + 0.3 * s, y - 1.4 * s, 0.8 * s, 2.8 * s, 0.2, null, 0, col, a); }
  function h_hole(g, cx, cy, w, h, col, lt, a) {   // soft pulsing outline used to mark a spot
    var p = 0.5 + 0.5 * Math.sin(lt * 4); halo(g, cx, cy, Math.max(w, h) * 0.8, col, a * (0.35 + 0.25 * p));
  }

  // ================= scene 0: a glass box with AI inside, one of them leaves =================
  DRAW.d0 = function (g, lt, L) {
    var ia = A_(lt, 0.0, 1.4), cx = 33, cy = 34, w = 30, h = 17, bx = cx - w / 2, by = cy - h / 2, i, r = rng(4);
    var pulse = Math.max(0, 1 - Math.abs(lt - (L[1] + 0.5)) / 1.4);
    halo(g, cx, cy, 24, ICEA, 0.22 * ia + 0.25 * pulse);
    rbox(g, bx, by, w, h, 1.3, ICE, 0.3 + 0.25 * pulse, 'rgba(143,208,255,0.07)', ia);
    g.save(); g.globalAlpha *= ia * 0.35; g.strokeStyle = ICE; g.lineWidth = 0.15;
    g.beginPath(); g.moveTo(bx + 1.4, by + 1.2); g.lineTo(bx + 5, by + 1.2); g.moveTo(bx + 1.2, by + 1.4); g.lineTo(bx + 1.2, by + 5); g.stroke(); g.restore();
    var gone = A_(lt, L[2] + 0.6, 2.6), ex = mix(cx + 2, 80, eio(gone)), ey = mix(cy + 1, 34, eio(gone));
    for (i = 0; i < 7; i++) {
      var ax = bx + 4 + r() * (w - 8), ay = by + 3.5 + r() * (h - 7), ph = r() * 6, sp = 0.4 + r() * 0.5;
      var x = ax + Math.sin(lt * sp + ph) * 2.2, y = ay + Math.cos(lt * sp * 0.8 + ph) * 1.6;
      if (i === 3) { x = lt > L[2] + 0.6 ? ex : x; y = lt > L[2] + 0.6 ? ey : y; }
      h_agent(g, x, y, 0.95, '#cfeaff', A_(lt, 0.35 + i * 0.18, 0.8));
    }
    tx(g, '测试盒子', cx, by + h + 3.4, 2.3, DIM, 'center', 700, SANS, A_(lt, 0.9, 0.7));
    // the crack in the glass wall and the way out
    var ck = A_(lt, L[2] - 0.1, 1.0);
    h_crack(g, bx + w, by + 2.5, 11, RED, 0.38, ck, 1);
    if (ck > 0.5) halo(g, bx + w, cy, 6, REDA, 0.5 * ck);
    // the other company's box
    var oa = A_(lt, L[2] + 0.4, 0.9), ox = 70, ow = 20, oh = 13;
    rbox(g, ox, 34 - oh / 2, ow, oh, 1.1, HOT, 0.28, 'rgba(255,157,110,0.06)', oa, [1.2, 0.8]);
    tx(g, '另一家公司', ox + ow / 2, 34 + oh / 2 + 3.2, 2.3, HOT, 'center', 700, SANS, oa);
    if (gone > 0.02) { ln(g, cx + 2, cy + 1, ex, ey, 'rgba(143,208,255,0.35)', 0.2, [0.6, 0.7], 1); }
    if (lt > L[2] + 3.2) {
      var q = lt - L[2] - 3.2;
      halo(g, 80, 34, 11, 'rgba(255,200,150,0.9)', clamp(1 - q / 1.2) * 0.8);
      ring(g, 80, 34, 1 + q * 7, 'rgba(255,200,150,0.9)', 0.2, clamp(1 - q / 1.0));
    }
    // the report card, last line
    var ca = A_(lt, L[3] - 0.1, 0.8);
  };

  // ================= scene 1: the sandbox, a wall, and one small gate =================
  DRAW.d1 = function (g, lt, L) {
    var bx = 6, by = 13, bw = 34, bh = 27, wx = bx + bw, i;
    var a0 = A_(lt, L[0] - 0.2, 0.9);
    halo(g, bx + bw / 2, by + bh / 2, 22, ICEA, 0.15 * a0);
    rbox(g, bx, by, bw, bh, 1.3, ICE, 0.3, 'rgba(143,208,255,0.07)', a0);
    tx(g, '沙盒', bx + bw / 2, by - 3, 2.9, FG, 'center', 900, SANS, a0);
    var a1 = A_(lt, L[1], 0.7);
    h_cloud(g, bx + 5, by + 4.4, 0.9, 'rgba(143,208,255,0.5)', a1);
    tx(g, '云端的一台虚拟电脑', bx + bw / 2, by + bh + 3.3, 2.1, DIM, 'center', 500, SANS, a1);
    // AI at work inside: small windows with typing lines
    var a2 = A_(lt, L[2] - 0.3, 0.7), r = rng(9);
    for (i = 0; i < 3; i++) {
      var x = bx + 6 + i * 9.5, y = by + 17 + (i % 2) * 3;
      rbox(g, x - 3.4, y - 3.2, 6.8, 5.2, 0.4, 'rgba(143,208,255,0.45)', 0.15, 'rgba(15,26,44,0.8)', a1 * 0.9);
      for (var k = 0; k < 3; k++) ln(g, x - 2.6, y - 2.1 + k * 1.2, x - 2.6 + (1 + ((lt * 2 + i + k) % 3)) * 1.5, y - 2.1 + k * 1.2, 'rgba(143,208,255,0.6)', 0.2, null, a1);
      h_agent(g, x, y - 5.6 + Math.sin(lt * 1.4 + i) * 0.5, 0.85, '#cfeaff', a1);
    }
    // the wall and the world outside
    ln(g, wx, by - 1, wx, by + bh + 1, 'rgba(238,242,248,0.6)', 0.7 * a2 + 0.001, null, a2);
    var gl = A_(lt, L[2], 0.8);
    h_globe(g, 88, 26.5, 6.3, ICE, gl); tx(g, '互联网', 88, 26.5 + 10.2, 2.3, ICE, 'center', 700, SANS, gl);
    // an AI walks up to the wall and bounces off
    if (lt > L[2] + 0.5 && lt < L[3] + 1.2) {
      var u = ((lt - L[2] - 0.5) % 2.4) / 2.4, bx2 = bx + bw - 5 + (u < 0.45 ? mix(0, 3.6, u / 0.45) : mix(3.6, -3.5, (u - 0.45) / 0.55));
      h_agent(g, bx2, by + 7, 0.95, '#cfeaff', 1);
      var hit = clamp(1 - Math.abs(u - 0.45) / 0.18);
      if (hit > 0) { tx(g, '✕', wx + 0.4, by + 7, 2.6, RED, 'center', 900, SANS, hit); halo(g, wx, by + 7, 4, REDA, hit * 0.7); }
    }
    // the gate: a software warehouse that may talk to the machine
    var a3 = A_(lt, L[3] - 0.1, 0.9), wxc = 58, wyc = 26.5;
    if (a3 > 0) {
      ln(g, wx, 26.5, wx, 26.5, FG, 0.1, null, 0);
      rbox(g, wx - 0.5, 23.6, 1.0, 5.8, 0.3, null, 0, 'rgba(7,14,26,1)', a3);
      ln(g, wx, 23.6, wx, 29.4, GOLD, 0.35, [0.5, 0.4], a3);
      rbox(g, wxc - 7, wyc - 4.5, 14, 9, 0.8, GOLD, 0.3, 'rgba(242,198,107,0.08)', a3);
      g.save(); g.globalAlpha *= a3; g.fillStyle = 'rgba(242,198,107,0.35)'; g.beginPath(); g.moveTo(wxc - 7.6, wyc - 4.5); g.lineTo(wxc, wyc - 8.8); g.lineTo(wxc + 7.6, wyc - 4.5); g.closePath(); g.fill(); g.restore();
      tx(g, '软件仓库', wxc, wyc + 1, 2.2, GOLD, 'center', 800, SANS, a3);
      ln(g, wxc + 7, wyc, 81.4, wyc, 'rgba(143,208,255,0.4)', 0.2, [0.7, 0.7], a3 * 0.8);
      arrow(g, wx + 0.8, wyc, wxc - 7.4, wyc, GOLD, 0.25, a3 * 0.8, 0.8);
    }
    // packages come through the gate, only when software has to be installed
    var a4 = A_(lt, L[4] - 0.1, 0.8);
    if (a4 > 0) {
      tx(g, '要装软件时才放行', 58, 36.6, 2.1, GOLD, 'center', 600, SANS, a4);
      for (i = 0; i < 3; i++) {
        var f = ((lt * 0.55 + i / 3) % 1), px = mix(wxc - 6, bx + bw - 6, eio(f)), pa = Math.sin(f * Math.PI);
        h_pkg(g, px, wyc - 0.2, 0.9, GOLD, a4 * pa);
      }
    }
  };

  // ================= scene 2: a hacking exam, 898 questions =================
  var RED2 = (function () { var r = rng(77), ix = [], i, j, t; for (i = 0; i < 898; i++) ix.push(i); for (i = 897; i > 0; i--) { j = Math.floor(r() * (i + 1)); t = ix[i]; ix[i] = ix[j]; ix[j] = t; } return ix.slice(0, 198); })();
  var RED2set = {}; RED2.forEach(function (v, k) { RED2set[v] = k; });
  DRAW.d2 = function (g, lt, L) {
    var gx = 6, gy = 14, cs = 1.2, cols = 38, i, nred = 198 * eio(pr(lt, L[5] + 0.15, 2.4));
    var ha = A_(lt, L[0] - 0.2, 0.7);
    tx(g, '黑客考试', 28, 8.4, 2.9, FG, 'center', 900, SANS, ha);
    for (i = 0; i < 898; i++) {
      var c = i % cols, rw = Math.floor(i / cols), ta = clamp((lt - 0.25 - (c + rw) * 0.035) / 0.7);
      if (ta <= 0) continue;
      var red = RED2set[i] !== undefined && RED2set[i] < nred;
      g.save(); g.globalAlpha *= ta * (red ? 1 : 0.7);
      g.fillStyle = red ? '#ff6b6b' : 'rgba(143,208,255,0.55)';
      g.fillRect(gx + c * cs, gy + rw * cs, cs - 0.25, cs - 0.25); g.restore();
    }
    var cA = A_(lt, L[4] + 0.1, 0.6), cB = A_(lt, L[5] + 0.1, 0.6);
    tx(g, '898', 49, 10.4, 3.0, ICE, 'right', 900, MONO, cA); tx(g, '题', 49.6, 10.6, 2.0, DIM, 'left', 700, SANS, cA);
    tx(g, Math.round(nred) + '', 11, 45.4, 2.8, RED, 'left', 900, MONO, cB); tx(g, '题，从没有 AI 做出来过', 20.2, 45.6, 2.0, RED, 'left', 700, SANS, cB);
    // right side: what the exam asks for
    var px = 63, a1 = A_(lt, L[1] - 0.1, 0.8);
    rbox(g, px, 17, 17, 11, 0.7, 'rgba(143,208,255,0.5)', 0.2, 'rgba(15,26,44,0.85)', a1);
    for (i = 0; i < 4; i++) ln(g, px + 1.6, 19.8 + i * 1.9, px + 1.6 + (5 + (i * 7) % 8), 19.8 + i * 1.9, i === 2 ? 'rgba(255,107,107,0.8)' : 'rgba(143,208,255,0.55)', 0.28, null, a1);
    tx(g, '一段软件', px + 8.5, 31.2, 2.0, DIM, 'center', 600, SANS, a1);
    var fa = A_(lt, L[1] + 1.2, 0.8);
    arrow(g, px + 17.6, 22.5, px + 22, 22.5, GOLD, 0.25, fa, 0.8);
    ln(g, px + 25, 17, px + 25, 28, 'rgba(238,242,248,0.8)', 0.3, null, fa);
    g.save(); g.globalAlpha *= fa; g.fillStyle = GOLD; g.beginPath(); g.moveTo(px + 25, 17); g.lineTo(px + 30.5, 19); g.lineTo(px + 25, 21.4); g.closePath(); g.fill(); g.restore();
    tx(g, '旗子', px + 27.5, 31.2, 2.0, GOLD, 'center', 700, SANS, fa);
    var a2 = A_(lt, L[2] - 0.1, 0.8);
    h_agent(g, px + 2.6, 40, 1.4, '#cfeaff', a2);
    tx(g, '研究模型', px + 12.5, 40, 2.1, FG, 'center', 700, SANS, a2);
    var a3 = A_(lt, L[3] + 0.3, 0.7);
    if (a3 > 0) {
      var s = 1 + 0.25 * Math.sin(lt * 4);
      g.save(); g.translate(px + 27.5, 40); g.scale(s, s); tx(g, '★', 0, 0, 3.6, GOLD, 'center', 900, SANS, a3); g.restore();
      tx(g, '做对 = 奖励', px + 27.5, 44.6, 1.9, GOLD, 'center', 700, SANS, a3);
      arrow(g, px + 18, 40, px + 24.4, 40, GOLD, 0.25, a3 * 0.8, 0.7);
    }
    // some questions may have no known answer
    var qa = A_(lt, L[6] + 0.2, 0.8);
    if (qa > 0) for (i = 0; i < 6; i++) {
      var id = RED2[i * 31 % 198], qx = gx + (id % cols) * cs + 0.4, qy = gy + Math.floor(id / cols) * cs + 0.3;
      tx(g, '?', qx, qy - 1.1 - Math.abs(Math.sin(lt * 2 + i)) * 0.5, 2.4, '#ffd0d0', 'center', 900, SANS, qa);
    }
  };
