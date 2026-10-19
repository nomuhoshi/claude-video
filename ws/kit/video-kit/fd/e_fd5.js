  // ================= Faraday: the blacksmith and the bookbinder, rebuilt around their sounds =================
  var HITS = DATA.hits || {};
  function lastHit(list, lt) { var p = null, n = null; for (var i = 0; i < list.length; i++) { if (list[i][0] <= lt) p = i; else { n = i; break; } } return [p, n]; }

  // ---------- d1: a blacksmith's son ----------
  var SM_UP = -2.0, SM_HIT = -0.09, SM_TAP = -0.55, SM_REST = 0.9;
  function smithAngle(lt) {
    var H = HITS.d1 || [], pn = lastHit(H, lt), p = pn[0], n = pn[1];
    if (p === null) {   // waiting: hammer hangs, then the first wind-up
      if (n === null) return SM_REST;
      var w = pr(lt, H[n][0] - 0.75, 0.45), f = pr(lt, H[n][0] - 0.3, 0.3);
      return f > 0 ? mix(SM_UP, SM_HIT, f * f) : mix(SM_REST, SM_UP, eio(w));
    }
    if (n === null) { var r = pr(lt, H[p][0] + 0.15, 0.6); return mix(SM_HIT, SM_REST, eio(r)) - 0.18 * Math.sin(Math.PI * clamp((lt - H[p][0]) / 0.15)); }
    var t0 = H[p][0], t1 = H[n][0], dt = t1 - t0, u = (lt - t0) / dt, top = H[n][1] === 'H' ? SM_UP : SM_TAP;
    if (u < 0.14) return SM_HIT - 0.22 * Math.sin(Math.PI * u / 0.14);          // the hammer bounces off the face
    if (u < 0.62) return mix(SM_HIT, top, eio((u - 0.14) / 0.48));             // lift
    var q = (u - 0.62) / 0.38; return mix(top, SM_HIT, q * q);                 // and swing down, accelerating
  }
  DRAW.d1 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8), H = HITS.d1 || [];
    tx(g, '1791', 50, 15, 7.5, GOLD, 'center', 900, SANS, A_(lt, L[0], 0.8));
    chip(g, 50, 22.5, '迈克尔 · 法拉第', FG, A_(lt, L[0] + 0.8, 0.7));
    var an = A_(lt, L[1], 0.7);
    // the most recent blow, for the flash, the shake and the sparks
    var pn = lastHit(H, lt), ph = pn[0] !== null ? H[pn[0]] : null, since = ph ? lt - ph[0] : 9, heavy = ph && ph[1] === 'H';
    var shake = an * (heavy ? 0.22 : 0.07) * Math.exp(-since / 0.05) * (since < 0.25 ? 1 : 0);
    g.save(); g.translate(shake * Math.sin(lt * 211), shake * Math.cos(lt * 173));
    if (an > 0.01) {
      // forge: a brick hearth with breathing coals
      var fx = 1.5, fy = 31;
      glow(g, fx + 3, fy + 1, 9, 'rgba(255,120,40,0.9)', an * (0.35 + 0.08 * Math.sin(lt * 3.1) + 0.05 * Math.sin(lt * 7.7)));
      rbox(g, fx, fy, 6.5, 9.2, 0.3, null, 0, '#3a2a24', an);
      for (i = 0; i < 4; i++) ln(g, fx, fy + 2.3 * (i + 1), fx + 6.5, fy + 2.3 * (i + 1), 'rgba(0,0,0,0.35)', 0.12, null, an);
      for (i = 0; i < 6; i++) dot(g, fx + 0.8 + i * 0.98, fy + 0.4 + 0.3 * Math.sin(i * 2.1), 0.7, 'rgba(255,' + Math.round(120 + 70 * (0.5 + 0.5 * Math.sin(lt * 4 + i * 1.7))) + ',60,0.95)', an);
      // the anvil on its stump
      var ay = 33.6;
      rbox(g, 22, 38.4, 7, 1.9, 0.2, null, 0, '#5a3e2a', an);
      g.save(); g.globalAlpha *= an; g.fillStyle = '#5b6474';
      g.beginPath(); g.moveTo(20.4, ay); g.lineTo(30.6, ay); g.quadraticCurveTo(33.5, ay + 0.1, 35.6, ay + 0.9); g.quadraticCurveTo(32.5, ay + 1.4, 30.6, ay + 1.6);
      g.lineTo(28.3, ay + 2.2); g.lineTo(28.3, ay + 3.6); g.lineTo(30.2, ay + 4.8); g.lineTo(20.8, ay + 4.8); g.lineTo(22.7, ay + 3.6); g.lineTo(22.7, ay + 2.2); g.lineTo(20.4, ay + 1.5); g.closePath(); g.fill();
      g.fillStyle = '#7d8798'; g.fillRect(20.4, ay, 10.2, 0.35); g.restore();
      // the iron being worked: it glows, and the glow flares with each blow
      var heat = 0.62 + (ph ? 0.3 * Math.exp(-since / 0.35) : 0);
      glow(g, 25.6, ay - 0.35, 3.2, 'rgba(255,150,60,0.95)', an * heat * 0.8);
      rbox(g, 22.8, ay - 0.75, 6, 0.75, 0.25, null, 0, heatCol(heat), an);
      ln(g, 28.8, ay - 0.38, 32.5, ay - 1.6, '#4a4f5a', 0.35, null, an);   // tongs
      // the father with his hammer
      faraday(g, 13, 40.2, 15, an, { col: '#cdb397', stout: true, apron: true, armR: smithAngle(lt), tool: 'hammer', name: '' }, lt);
      // impact flash and sparks
      if (ph && since < 0.12) glow(g, 25.4, ay - 0.6, heavy ? 5 : 2.5, 'rgba(255,230,170,0.95)', an * (1 - since / 0.12) * (heavy ? 0.9 : 0.4));
      for (var hI = Math.max(0, (pn[0] || 0) - 2); hI <= (pn[0] === null ? -1 : pn[0]); hI++) {
        if (H[hI][1] !== 'H') continue;
        var s = lt - H[hI][0]; if (s < 0 || s > 0.75) continue;
        var rr = rng(hI * 97 + 13);
        for (i = 0; i < 22; i++) {
          var ang = -Math.PI * (0.08 + 0.84 * rr()), sp = 9 + rr() * 16, life = 0.35 + rr() * 0.4;
          if (s > life) continue;
          var vx = Math.cos(ang) * sp, vy = Math.sin(ang) * sp, px = 25.4 + vx * s, py = ay - 0.6 + vy * s + 0.5 * 34 * s * s;
          var al = an * (1 - s / life);
          ln(g, px, py, px - vx * 0.03, py - (vy + 34 * s) * 0.03, 'rgba(255,214,130,' + (0.95 * al).toFixed(3) + ')', 0.3, null, 1);
        }
      }
      tx(g, '父亲：铁匠', 23, 43.5, 2.0, DIM, 'center', 700, SANS, an);
    }
    g.restore();
    // poor house
    var ho = A_(lt, L[2], 0.7);
    if (ho > 0.01) {
      g.save(); g.globalAlpha *= ho; g.fillStyle = 'rgba(70,64,80,0.95)';
      g.beginPath(); g.moveTo(44, 39.6); g.lineTo(44, 31); g.lineTo(50, 27); g.lineTo(56, 31); g.lineTo(56, 39.6); g.closePath(); g.fill(); g.restore();
      rbox(g, 48.7, 33, 2.6, 3, 0.2, null, 0, 'rgba(255,200,120,' + (0.4 + 0.2 * Math.sin(lt * 2)) + ')', ho);
      tx(g, '家里很穷', 50, 43.5, 2.0, DIM, 'center', 700, SANS, ho);
      faraday(g, 40, 40.2, 9, ho, { name: '法拉第' }, lt);
    }
    // a school slate, written on with chalk
    var sl = A_(lt, L[3], 0.7);
    if (sl > 0.01) {
      rbox(g, 64, 28, 20, 12, 0.6, '#8a6a46', 0.6, 'rgba(30,40,38,0.95)', sl);
      var w1 = clamp((lt - L[3] - 0.3) / 1.1), w2 = clamp((lt - L[4] - 0.1) / 1.2);
      g.save(); g.beginPath(); g.rect(64, 28, 20 * w1, 7); g.rect(64, 35, 20 * w2, 5); g.clip();
      tx(g, '读  写  算', 74, 32.5, 2.4, 'rgba(235,240,230,0.9)', 'center', 700, SANS, sl);
      tx(g, 'a b c  1 2 3', 74, 36.5, 1.8, 'rgba(235,240,230,0.6)', 'center', 600, MONO, sl);
      g.restore();
      if (w1 > 0 && w1 < 1) dot(g, 64 + 20 * w1, 32, 0.45, '#f4f4ea', sl);
      if (w2 > 0 && w2 < 1) dot(g, 64 + 20 * w2, 36.5, 0.45, '#f4f4ea', sl);
      tx(g, '几年小学', 74, 43.5, 2.0, DIM, 'center', 700, SANS, sl);
    }
  };

  // ---------- d2: apprentice bookbinder ----------
  function bindEv(kind) { return (HITS.d2 || []).filter(function (e) { return e[1] === kind; }).map(function (e) { return e[0]; }); }
  DRAW.d2 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8), STI = bindEv('stitch'), BKS = bindEv('book'), PG = bindEv('page'), PRESS = bindEv('press')[0] || L[2], MATCH = bindEv('match')[0] || L[3];
    var cols = ['#7a3b2e', '#2e4a6b', '#4d5b2e', '#6b4a2e', '#5a2e5b', '#2e6b62', '#8a6a2e'];
    var night = A_(lt, L[3], 0.6) * (1 - A_(lt, L[4] - 0.2, 0.5));
    // ---- the shop: shelves, a door with a bell, the bench ----
    var shop = A * (1 - A_(lt, L[1] - 0.1, 0.5));
    if (shop > 0.01) {
      for (var r = 0; r < 2; r++) for (i = 0; i < 18; i++) {
        var bx = 30 + i * 3.4, bh = 6 + (i * 37 % 4);
        rbox(g, bx, 14 + r * 9 - bh + 8, 2.9, bh, 0.25, null, 0, cols[(i + r * 3) % cols.length], shop * 0.75);
      }
      ln(g, 29, 22.2, 92, 22.2, '#6b4a2e', 0.6, null, shop); ln(g, 29, 31.2, 92, 31.2, '#6b4a2e', 0.6, null, shop);
      rbox(g, 6, 14, 9, 26, 0.3, 'rgba(200,170,120,0.5)', 0.2, '#3a2a1c', shop);
      var sw = Math.sin((lt - L[0]) * 14) * Math.exp(-Math.max(0, lt - L[0]) / 0.6) * (lt > L[0] ? 0.5 : 0);
      g.save(); g.globalAlpha *= shop; g.translate(15.5, 13); g.rotate(sw); g.fillStyle = GOLD; g.beginPath(); g.moveTo(-1, 2.2); g.quadraticCurveTo(0, -0.4, 1, 2.2); g.closePath(); g.fill(); g.restore();
      tx(g, '书店', 10.5, 12, 1.9, DIM, 'center', 700, SANS, shop);
      var wk = clamp((lt - L[0] - 0.3) / 1.7), fx = mix(9, 40, eio(wk));
      faraday(g, fx, 40.2, 13, shop * A_(lt, L[0], 0.4), { walk: wk > 0 && wk < 1 ? lt * 7 : null, name: '法拉第' }, lt);
      rbox(g, 46, 35, 30, 1.4, 0.2, null, 0, '#6b4a2e', shop); ln(g, 49, 36.4, 49, 40.2, '#6b4a2e', 0.6, null, shop); ln(g, 73, 36.4, 73, 40.2, '#6b4a2e', 0.6, null, shop);
      for (i = 0; i < 5; i++) rbox(g, 52 + i * 0.3, 34.4 - i * 0.5, 9, 0.5, 0.1, null, 0, 'rgba(240,232,214,0.95)', shop);
      chip(g, 50, 7, '14 岁 · 书店学徒', GOLD, A_(lt, L[0], 0.7) * shop, 'rgba(48,38,12,0.95)');
    }
    // ---- close-up: sewing the folded sheets along the fold ----
    var sew = A_(lt, L[1], 0.5) * (1 - A_(lt, PRESS - 0.75, 0.4));
    if (sew > 0.01) {
      g.save(); g.globalAlpha *= sew;
      for (i = 3; i >= 0; i--) {   // a few stacked signatures, each a folded sheet seen from above
        var o2 = i * 0.7;
        g.fillStyle = i === 0 ? 'rgba(244,236,218,1)' : 'rgba(214,204,184,1)';
        g.beginPath(); g.moveTo(50, 13 + o2); g.lineTo(31 + o2, 15 + o2); g.lineTo(31 + o2, 37 + o2); g.lineTo(50, 35 + o2); g.lineTo(69 - o2, 37 + o2); g.lineTo(69 - o2, 15 + o2); g.closePath(); g.fill();
      }
      g.strokeStyle = 'rgba(120,100,80,0.5)'; g.lineWidth = 0.15; g.beginPath(); g.moveTo(50, 13); g.lineTo(50, 35); g.stroke();
      for (i = 0; i < 6; i++) { ln(g, 34, 18 + i * 3, 47, 17.4 + i * 3, 'rgba(120,100,80,0.28)', 0.12, null, 1); ln(g, 53, 17.4 + i * 3, 66, 18 + i * 3, 'rgba(120,100,80,0.28)', 0.12, null, 1); }
      g.restore();
      var st = [16.5, 21.5, 26.5, 31.5], done = 0, cur = null;
      for (i = 0; i < STI.length; i++) if (lt >= STI[i]) done = i + 1;
      // thread already sewn: a running stitch along the fold
      for (i = 0; i < done; i++) {
        if (i > 0) ln(g, 50, st[i - 1] + 0.4, 50, st[i] - 0.4, '#d9a440', 0.32, null, sew);
        dot(g, 50, st[i], 0.35, '#7a5a2a', sew);
      }
      // the needle travels to the next station and dives in on the beat
      var ni = Math.min(done, STI.length - 1), tn = STI[ni], tp = ni > 0 ? STI[ni - 1] : L[1];
      var u = done >= STI.length ? 1 : clamp((lt - tp) / (tn - tp));
      var fromY = ni > 0 ? st[ni - 1] : 11, toY = st[ni], dip = done >= STI.length ? 1 : (u > 0.7 ? (u - 0.7) / 0.3 : 0);
      var ny = mix(fromY, toY, eio(Math.min(1, u / 0.7))), lift = done >= STI.length ? 2.5 * eio(clamp((lt - STI[STI.length - 1]) / 0.3)) : (1 - dip) * 3.2 * Math.sin(Math.PI * Math.min(1, u / 0.7));
      var nx0 = 50 + 2.2 - dip * 2.2, ny0 = ny - 4.8 - lift + dip * 1.6, nx1 = 50 + 0.3, ny1 = ny - lift + dip * 1.0;
      ln(g, nx0, ny0, nx1, ny1, '#e3e8f0', 0.28, null, sew); dot(g, nx0, ny0, 0.3, '#e3e8f0', sew);
      g.save(); g.globalAlpha *= sew; g.strokeStyle = '#d9a440'; g.lineWidth = 0.22; g.beginPath(); g.moveTo(nx0, ny0); g.quadraticCurveTo(nx0 + 8, ny0 - 6, 76, 10); g.stroke(); g.restore();
      ring(g, 77.5, 10, 1.6, '#d9a440', 0.6, sew); dot(g, 77.5, 10, 0.5, '#6b4a2e', sew);
      if (done > 0 && lt - STI[done - 1] < 0.12) glow(g, 50, st[done - 1], 2, 'rgba(255,230,170,0.9)', sew * 0.6);
      tx(g, '折页 · 穿线 · 缝成书芯', 50, 41.5, 2.0, DIM, 'center', 700, SANS, sew);
    }
    // ---- the press, then finished books landing on the stack ----
    var pa = A_(lt, PRESS - 0.75, 0.4) * (1 - A_(lt, L[3] - 0.2, 0.5));
    if (pa > 0.01) {
      var px = 36, down = eio(clamp((lt - (PRESS - 0.55)) / 0.55)), bounce = lt > PRESS ? 0.25 * Math.sin(Math.min(1, (lt - PRESS) / 0.18) * Math.PI) : 0;
      ln(g, px - 7, 16, px - 7, 38, '#6b4a2e', 0.9, null, pa); ln(g, px + 7, 16, px + 7, 38, '#6b4a2e', 0.9, null, pa);
      rbox(g, px - 8.5, 14.5, 17, 2.2, 0.3, null, 0, '#7a5434', pa); rbox(g, px - 8.5, 38, 17, 2.2, 0.3, null, 0, '#7a5434', pa);
      var py = mix(22, 30.2, down) - bounce;
      ln(g, px, 16.7, px, py, '#9aa7ba', 0.7, null, pa);
      for (i = 0; i < 5; i++) ln(g, px - 0.6, 17.5 + i * ((py - 17.5) / 5), px + 0.6, 18.3 + i * ((py - 17.5) / 5), '#6b7586', 0.15, null, pa);
      ln(g, px - 3.5, 15.2 - (lt - PRESS) * 0, px + 3.5, 15.2, '#9aa7ba', 0.45, null, pa);
      rbox(g, px - 5.5, py, 11, 1.3, 0.2, null, 0, '#8a6a46', pa);
      var nb = 0; for (i = 0; i < BKS.length; i++) if (lt >= BKS[i] - 0.32) nb = i + 1;
      rbox(g, px - 4.5, 31.5 + (1 - down) * 1.2, 9, 6.5 - (1 - down) * 1.2, 0.3, null, 0, 'rgba(240,232,214,0.95)', pa * (lt < PRESS + 0.25 ? 1 : 0));
      // the stack on the right
      for (i = 0; i < BKS.length; i++) {
        var tb = BKS[i], f = clamp((lt - (tb - 0.32)) / 0.32); if (f <= 0) continue;
        var sx = 70, sy = 38 - i * 2.4, cx = mix(px, sx, eio(f)), cy = mix(31, sy, eio(f)) - Math.sin(f * Math.PI) * 6;
        var land = lt > tb ? Math.exp(-(lt - tb) / 0.08) : 0;
        rbox(g, cx - 5, cy - 2.2 + land * 0.3, 10, 2.2, 0.3, 'rgba(255,255,255,0.2)', 0.1, cols[i % cols.length], pa);
        ln(g, cx - 4.2, cy - 1.1, cx + 4.2, cy - 1.1, 'rgba(242,198,107,0.7)', 0.15, null, pa);
        if (land > 0.05) glow(g, sx, sy, 3, 'rgba(242,198,107,0.9)', 0.3 * land * pa);
      }
      faraday(g, 52, 40.2, 12, pa, { pose: 'forward', name: '法拉第' }, lt);
      chip(g, 70, 9, '一本本书，从他手里经过', GOLD, A_(lt, L[2] + 0.3, 0.6) * pa, 'rgba(48,38,12,0.95)');
    }
    // ---- night: a candle and a borrowed book ----
    if (night > 0.01) {
      g.save(); g.globalAlpha *= night * 0.55; g.fillStyle = '#04060b'; g.fillRect(0, 0, 100, 56.25); g.restore();
      var lit = lt > MATCH + 0.15 ? A_(lt, MATCH + 0.15, 0.3) : 0, mf = lt > MATCH && lt < MATCH + 0.5 ? 1 - (lt - MATCH) / 0.5 : 0;
      if (mf > 0) glow(g, 60, 33, 5, 'rgba(255,220,150,0.95)', mf * night);
      glow(g, 60, 33, 14, 'rgba(255,190,100,0.9)', 0.45 * lit * night);
      if (lit > 0) flame(g, 60, 34, 2.6, 6, lt, lit * night, 3);
      rbox(g, 59, 34, 2, 5.6, 0.3, null, 0, '#efe6d2', night);
      faraday(g, 47, 40.2, 15, night, { pose: 'book', prop: 'book', name: '法拉第' }, lt);
      for (i = 0; i < PG.length; i++) {   // a page turning over the book in his hands
        var pf = clamp((lt - PG[i] + 0.1) / 0.35); if (pf <= 0 || pf >= 1) continue;
        var ang2 = Math.PI * pf, cx2 = 47, cy2 = 34.6, wpg = 2.2;
        g.save(); g.globalAlpha *= night; g.fillStyle = '#f4ecd8'; g.beginPath(); g.moveTo(cx2, cy2); g.lineTo(cx2 + Math.cos(ang2) * wpg, cy2 - Math.sin(ang2) * 1.6); g.lineTo(cx2 + Math.cos(ang2) * wpg, cy2 - Math.sin(ang2) * 1.6 - 0.9); g.lineTo(cx2, cy2 - 0.9); g.closePath(); g.fill(); g.restore();
      }
      chip(g, 50, 9, '白天装订，晚上读', GOLD, night, 'rgba(48,38,12,0.95)');
    }
    // ---- the chemistry book that hooked him ----
    var bk = A_(lt, L[4] - 0.1, 0.6);
    if (bk > 0.01) {
      var pop = 1 + 0.06 * Math.exp(-Math.max(0, lt - L[4]) / 0.12) * (lt > L[4] ? 1 : 0);
      bookShape(g, 50, 26, 16 * pop, 20 * pop, '#3a5a7a', bk, '化学对话');
      for (i = 0; i < 10; i++) { var p = (lt * 0.35 + i / 10) % 1, x2 = 50 + Math.sin(i * 2.3 + lt) * 9 * p, y2 = 16 - p * 9; jat(g, x2, y2, 0.7, lt, i, 0.2, 3, 0.6, bk * (1 - p) * A_(lt, L[5], 0.7), false); }
      glow(g, 50, 22, 14, 'rgba(143,208,255,0.9)', 0.25 * A_(lt, L[5], 0.8));
      tx(g, '一本写给普通人的化学书', 50, 41, 2.0, DIM, 'center', 700, SANS, bk);
    }
  };

  // ---------- d14 (3D): a magnet comes up under a loop; count the field lines that pierce it ----------
  var FLX = (function () { var r = rng(77), P = [], i; for (i = 0; i < 15; i++) { var rr = Math.sqrt((i + 0.5) / 15), an = i * 2.39996; P.push([rr * Math.cos(an), rr * Math.sin(an)]); } return P; })();
  DRAW.d14 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8), cx = 34, cy = 25, rx = 10, ry = 3.4;
    function cAt(t) { return t < L[3] ? eio(pr(t, L[1], 1.6)) : 1 - eio(pr(t, L[3], 0.6)); }
    var c = cAt(lt), emf = Math.abs(cAt(lt) - cAt(lt - 0.05)) / 0.05 * 7;
    var my = mix(43, 37.5, c), ytop = my - 4, s = mix(1.6, 0.62, c);
    // the magnet below, N up
    barMag(g, cx, my, 8, 3, -Math.PI / 2, A);
    var lines = [], inside = 0;
    for (i = 0; i < FLX.length; i++) {
      var dx = FLX[i][0] * s, dz = FLX[i][1] * s, inn = dx * dx + dz * dz < 1;
      if (inn) inside++;
      var px = cx + dx * rx, py = cy + dz * ry, x0 = cx + FLX[i][0] * 0.9, tx1 = cx + (px - cx) * 1.5, ty1 = 7;
      lines.push([x0, ytop, px, py, tx1, ty1, inn]);
    }
    // the loop's far half
    g.save(); g.globalAlpha *= A; g.strokeStyle = CUD; g.lineWidth = 0.7; g.beginPath(); g.ellipse(cx, cy, rx, ry, 0, Math.PI, TAU); g.stroke(); g.restore();
    // lower halves of the field lines (from the pole up to the plane of the loop)
    for (i = 0; i < lines.length; i++) { var l = lines[i]; ln(g, l[0], l[1], l[2], l[3], l[6] ? 'rgba(143,208,255,0.75)' : 'rgba(143,208,255,0.3)', 0.22, null, A); }
    // the area inside the loop, tinted by how much field goes through it
    g.save(); g.globalAlpha *= A * (0.08 + 0.22 * inside / FLX.length); g.fillStyle = ICE; g.beginPath(); g.ellipse(cx, cy, rx, ry, 0, 0, TAU); g.fill(); g.restore();
    // upper halves, the piercing points, arrowheads
    for (i = 0; i < lines.length; i++) {
      var m = lines[i];
      ln(g, m[2], m[3], m[4], m[5], m[6] ? 'rgba(143,208,255,0.85)' : 'rgba(143,208,255,0.3)', 0.22, null, A);
      if (m[6]) dot(g, m[2], m[3], 0.42, GOLD, A);
      arrowHead(g, mix(m[2], m[4], 0.75), mix(m[3], m[5], 0.75), Math.atan2(m[5] - m[3], m[4] - m[2]), 0.6, ICE, A * (m[6] ? 0.9 : 0.35));
    }
    // the loop's near half goes over everything
    g.save(); g.globalAlpha *= A; g.strokeStyle = CU; g.lineWidth = 0.8; g.beginPath(); g.ellipse(cx, cy, rx, ry, 0, 0, Math.PI); g.stroke(); g.restore();
    glow(g, cx, cy, 13, 'rgba(255,180,90,0.9)', 0.4 * Math.min(1, emf / 8) * A);
    tx(g, '线圈', cx + rx + 1, cy + 1, 1.8, CU, 'left', 800, SANS, A);
    chip(g, cx + 22, 11, '穿过线圈：' + inside + ' 条', ICE, A_(lt, L[1], 0.6));
    tx(g, lt < L[3] ? '磁铁靠近' : '磁铁抽走', cx + 3, my + 0.6, 1.7, DIM, 'left', 700, SANS, A_(lt, L[1], 0.6));
    // voltage meter
    var vm = A_(lt, L[2], 0.6);
    rbox(g, 56, 18, 3, 20, 1.5, 'rgba(238,242,248,0.5)', 0.18, null, vm);
    var hh = 20 * Math.min(1, emf / 26);
    rbox(g, 56.3, 38 - hh, 2.4, hh, 1.2, null, 0, GOLD, vm);
    tx(g, '电压', 57.5, 41.5, 1.9, DIM, 'center', 700, SANS, vm);
    chip(g, 77, 18, '慢慢变：电压小', DIM, A_(lt, L[2], 0.6) * (1 - A_(lt, L[3], 0.5)));
    chip(g, 77, 18, '变得快：电压大', GOLD, A_(lt, L[3], 0.6) * (1 - A_(lt, L[4], 0.5)), 'rgba(48,38,12,0.95)');
    var fm = A_(lt, L[4], 0.8);
    if (fm > 0.01) {
      glow(g, 77, 25, 14, 'rgba(242,198,107,0.9)', 0.25 * fm);
      rich(g, [['ε = −ΔΦ / Δt', 0]], 77, 25, 4.4, GOLD, fm, 'center', 900, SANS);
      tx(g, '法拉第电磁感应定律', 77, 31.5, 2.1, FG, 'center', 800, SANS, fm);
      tx(g, 'Φ：穿过线圈的磁感线有多少', 77, 35.2, 1.7, DIM, 'center', 600, SANS, fm);
    }
  };

  // ---------- d15 (3D): the copper disc spinning between the poles of a horseshoe magnet ----------
  DRAW.d15 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8), cx = 32, cy = 21, R = 11, rx = R * 0.42, TH = 1.1;
    var spin = A_(lt, L[1], 1.2), th = (lt - L[1]) * 4.2 * spin;
    var cur = A_(lt, L[2] + 0.4, 0.8) * spin;
    var ma = A_(lt, L[1] - 0.3, 0.7);
    function P(phi, r, off) { return [cx + (off || 0) + Math.cos(phi) * rx * r, cy + Math.sin(phi) * R * r]; }
    // horseshoe: the bend below, then the pole behind the disc
    var bx = cx - 3.4, fx = cx + 3.0, py = cy + R - 3.6;
    g.save(); g.globalAlpha *= ma; g.strokeStyle = '#a3383f'; g.lineWidth = 3.2; g.lineCap = 'butt';
    g.beginPath(); g.moveTo(bx, py + 4); g.lineTo(bx, py + 8); g.bezierCurveTo(bx, py + 14, fx, py + 14, fx, py + 8); g.lineTo(fx, py + 4); g.stroke(); g.restore();
    rbox(g, bx - 1.7, py - 0.5, 3.4, 5, 0.3, null, 0, SBLU, ma); tx(g, 'S', bx, py + 2.3, 1.7, '#0b1a33', 'center', 900, SANS, ma);
    // field between the poles, crossing the disc
    for (i = 0; i < 3; i++) { var yy = py + 0.8 + i * 1.5; ln(g, bx + 1.8, yy, fx - 1.8, yy, 'rgba(143,208,255,0.75)', 0.18, [0.6, 0.4], ma * spin); }
    // disc: rim thickness first, then the face
    g.save(); g.globalAlpha *= A;
    g.fillStyle = '#7a3f18'; g.beginPath(); g.ellipse(cx - TH, cy, rx, R, 0, 0, TAU); g.fill();
    g.fillRect(cx - TH, cy - R, TH, 2 * R);
    var dg = g.createLinearGradient(cx - rx, cy - R, cx + rx, cy + R); dg.addColorStop(0, '#f6c08e'); dg.addColorStop(0.5, '#d8874a'); dg.addColorStop(1, '#a9612c');
    g.fillStyle = dg; g.beginPath(); g.ellipse(cx, cy, rx, R, 0, 0, TAU); g.fill(); g.restore();
    for (i = 0; i < 8; i++) { var p1 = P(th + i * TAU / 8, 0.14), p2 = P(th + i * TAU / 8, 0.94); ln(g, p1[0], p1[1], p2[0], p2[1], 'rgba(90,40,10,0.35)', 0.22, null, A); }
    g.save(); g.globalAlpha *= A; g.strokeStyle = 'rgba(255,225,190,0.7)'; g.lineWidth = 0.2; g.beginPath(); g.ellipse(cx, cy, rx, R, 0, 0, TAU); g.stroke(); g.restore();
    // radial current from the centre down to the rim between the poles
    if (cur > 0.01) { wire(g, [[cx, cy], [cx, cy + R - 0.5]], cur, 1, lt); glow(g, cx, cy + R * 0.7, 4, 'rgba(255,220,150,0.9)', 0.5 * cur); }
    // the front pole, over the disc
    rbox(g, fx - 1.7, py - 0.5, 3.4, 5, 0.3, null, 0, NRED, ma); tx(g, 'N', fx, py + 2.3, 1.7, '#2a0d10', 'center', 900, SANS, ma);
    // axle along the disc's axis, with a crank at the end
    var ax1 = cx + 13;
    ln(g, cx, cy, ax1, cy, '#cfd6e2', 0.9, null, A); dot(g, cx, cy, 0.9, '#e3e8f0', A);
    var ka = A_(lt, L[1], 0.6), hx = ax1 + Math.cos(th) * 1.3, hy = cy + Math.sin(th) * 4;
    ln(g, ax1, cy, hx, hy, '#d7dde8', 0.6, null, ka); dot(g, hx, hy, 0.8, '#8a5f34', ka);
    // brushes and wires to the meter: one presses on the axle, one on the rim
    var wa = A_(lt, L[2], 0.6);
    rbox(g, cx + 7.4, cy - 2.2, 1.2, 1.8, 0.2, null, 0, '#9aa7ba', wa);
    rbox(g, cx - 0.6, cy + R - 0.2, 1.2, 1.8, 0.2, null, 0, '#9aa7ba', wa);
    wire(g, [[cx + 8, cy - 2.2], [cx + 8, 7], [76, 7], [76, 21]], wa, cur, lt);
    wire(g, [[cx, cy + R + 1.6], [cx + 9, cy + R + 1.6], [cx + 9, 44], [76, 44], [76, 34]], wa, -cur, lt);
    tx(g, '中心（转轴）', cx + 9.5, 5.4, 1.6, DIM, 'left', 700, SANS, wa);
    tx(g, '边缘', cx - 4.5, cy + R + 3.2, 1.6, DIM, 'right', 700, SANS, wa);
    tx(g, '马蹄形磁铁的两极夹住铜盘', cx - 6, py + 12, 1.6, DIM, 'right', 700, SANS, ma * (1 - A_(lt, L[3], 0.5)));
    galv(g, 76, 28, 5.5, 0.75 * cur + 0.03 * Math.sin(lt * 7) * cur, wa);
    faraday(g, 56, 40, 15, A_(lt, L[0] + 0.3, 0.8), { pose: 'forward', flip: true, name: '法拉第' }, lt);
    chip(g, 76, 14, '持续的电流', GOLD, A_(lt, L[3], 0.6) * (1 - A_(lt, L[5], 0.5)), 'rgba(48,38,12,0.95)');
    chip(g, 76, 14, '只要转，就有电', GOLD, A_(lt, L[4], 0.6) * (1 - A_(lt, L[5], 0.5)), 'rgba(48,38,12,0.95)');
    var fg = A_(lt, L[5], 0.8);
    glow(g, 76, 14, 12, 'rgba(242,198,107,0.9)', 0.3 * fg);
    tx(g, '第一台发电机', 76, 14, 3.2, GOLD, 'center', 900, SANS, fg);
  };

  // ---------- d19 (3D): light through glass, its vibration plane twisted by a magnetic field along the beam ----------
  DRAW.d19 = function (g, lt, L) {
    var i, A = A_(lt, 0.2, 0.8), OX = 46, OY = 27;
    function P(X, Y, Z) { return [OX + X + Z * 0.5, OY - Y - Z * 0.32]; }
    function poly(pts, fill, stroke, w, a) {
      if (a <= 0.003) return; g.save(); g.globalAlpha *= a; g.beginPath();
      pts.forEach(function (q, k) { var p = P(q[0], q[1], q[2]); if (k === 0) g.moveTo(p[0], p[1]); else g.lineTo(p[0], p[1]); }); g.closePath();
      if (fill) { g.fillStyle = fill; g.fill(); } if (stroke) { g.strokeStyle = stroke; g.lineWidth = w || 0.15; g.stroke(); } g.restore();
    }
    function seg(a, b, col, w, al) { var p = P(a[0], a[1], a[2]), q = P(b[0], b[1], b[2]); ln(g, p[0], p[1], q[0], q[1], col, w, null, al); }
    chip(g, 50, 6.5, '1845', GOLD, A_(lt, L[0], 0.6), 'rgba(48,38,12,0.95)');
    var gx = 12, gy = 5.2, gz = 5.2, ga = A_(lt, L[1] - 0.4, 0.8);
    var on = A_(lt, L[2], 0.8), rot = 0.8 * on, beam = A_(lt, L[1], 0.8);
    function phi(X) { return X < -gx ? 0 : X > gx ? rot : rot * (X + gx) / (2 * gx); }
    // coil: far halves of the turns
    var ca = A_(lt, L[2] - 0.2, 0.6);
    function turn(X, front) {
      g.save(); g.globalAlpha *= ca * (front ? 0.8 : 0.5); g.strokeStyle = front ? CU : CUD; g.lineWidth = 0.35; g.beginPath();
      for (var k = 0; k <= 24; k++) { var t = (front ? Math.PI : 0) + k / 24 * Math.PI, p = P(X, 7.6 * Math.cos(t), 7.6 * Math.sin(t)); if (k === 0) g.moveTo(p[0], p[1]); else g.lineTo(p[0], p[1]); }
      g.stroke(); g.restore();
    }
    for (i = -2; i <= 2; i++) turn(i * 5, false);
    // glass: the faces at the back
    poly([[-gx, -gy, gz], [gx, -gy, gz], [gx, gy, gz], [-gx, gy, gz]], 'rgba(120,160,200,0.10)', 'rgba(200,225,245,0.25)', 0.12, ga);
    poly([[-gx, -gy, -gz], [gx, -gy, -gz], [gx, -gy, gz], [-gx, -gy, gz]], 'rgba(120,160,200,0.12)', 'rgba(200,225,245,0.25)', 0.12, ga);
    poly([[-gx, -gy, -gz], [-gx, gy, -gz], [-gx, gy, gz], [-gx, -gy, gz]], 'rgba(160,200,240,0.10)', 'rgba(200,225,245,0.3)', 0.12, ga);
    // the beam along its axis, and the vibration drawn as a wave whose plane can turn
    seg([-46, 0, 0], [46, 0, 0], 'rgba(255,240,200,0.55)', 0.35, beam);
    var amp = 4.2, k0 = 0.55, w0 = 6;
    function wpt(X) { var f = phi(X), v = amp * Math.sin(k0 * X - w0 * lt); return [X, v * Math.cos(f), v * Math.sin(f)]; }
    // the plane of vibration as a faint ribbon
    [[-46, -gx], [gx, 46]].forEach(function (r, n) {
      var f = n ? rot : 0, a = beam * 0.6;
      poly([[r[0], amp * Math.cos(f), amp * Math.sin(f)], [r[1], amp * Math.cos(f), amp * Math.sin(f)], [r[1], -amp * Math.cos(f), -amp * Math.sin(f)], [r[0], -amp * Math.cos(f), -amp * Math.sin(f)]], n && rot > 0.1 ? 'rgba(242,198,107,0.08)' : 'rgba(255,240,200,0.06)', null, 0, a);
    });
    for (var X = -45; X <= 45; X += 1.5) { var q = wpt(X), inside = X > -gx && X < gx, col = X > gx && rot > 0.1 ? GOLD : '#fff0c8'; seg([X, 0, 0], q, col, 0.18, beam * (inside ? 0.45 : 0.75)); }
    g.save(); g.globalAlpha *= beam; g.lineWidth = 0.32; g.beginPath();
    for (X = -45; X <= 45; X += 0.5) { var p = P.apply(null, wpt(X)); if (X === -45) g.moveTo(p[0], p[1]); else g.lineTo(p[0], p[1]); }
    g.strokeStyle = 'rgba(255,240,200,0.85)'; g.stroke(); g.restore();
    // glass: the faces in front, see-through
    poly([[-gx, -gy, -gz], [gx, -gy, -gz], [gx, gy, -gz], [-gx, gy, -gz]], 'rgba(150,190,230,0.16)', 'rgba(210,235,250,0.6)', 0.18, ga);
    poly([[-gx, gy, -gz], [gx, gy, -gz], [gx, gy, gz], [-gx, gy, gz]], 'rgba(190,220,245,0.22)', 'rgba(210,235,250,0.6)', 0.18, ga);
    poly([[gx, -gy, -gz], [gx, gy, -gz], [gx, gy, gz], [gx, -gy, gz]], 'rgba(110,150,190,0.22)', 'rgba(210,235,250,0.6)', 0.18, ga);
    var hl1 = P(-gx + 1.2, gy - 0.8, -gz), hl2 = P(-gx + 1.2, -gy + 0.8, -gz); ln(g, hl1[0], hl1[1], hl2[0], hl2[1], 'rgba(255,255,255,0.35)', 0.35, null, ga);
    var gl = P(0, -gy - 1.8, -gz); tx(g, '重玻璃', gl[0], gl[1] + 1.2, 1.9, DIM, 'center', 700, SANS, ga);
    // coil: near halves, the field arrow along the beam
    for (i = -2; i <= 2; i++) turn(i * 5, true);
    if (ca > 0.01) {
      glow(g, OX, OY, 14, 'rgba(255,180,90,0.9)', 0.18 * on);
      var b1 = P(-6, 10.5, 0), b2 = P(6, 10.5, 0); arrow(g, b1[0], b1[1], b2[0], b2[1], NRED, 0.4, on, 1.0);
      tx(g, '磁场：沿着光的方向', (b1[0] + b2[0]) / 2, b1[1] - 1.6, 1.9, NRED, 'center', 800, SANS, on);
    }
    // end-on dials: the vibration direction before and after
    function dial(x, y, f, col, a, lab) {
      if (a <= 0.01) return;
      ring(g, x, y, 3.2, 'rgba(238,242,248,0.4)', 0.15, a);
      var dx = Math.sin(f) * 2.6, dy = -Math.cos(f) * 2.6;
      ln(g, x - dx, y - dy, x + dx, y + dy, col, 0.4, null, a); arrowHead(g, x + dx, y + dy, Math.atan2(dy, dx), 0.8, col, a); arrowHead(g, x - dx, y - dy, Math.atan2(-dy, -dx), 0.8, col, a);
      tx(g, lab, x, y + 5.2, 1.7, DIM, 'center', 700, SANS, a);
    }
    dial(12, 13, 0, '#fff0c8', beam, '进去前的振动方向');
    dial(88, 13, rot, rot > 0.1 ? GOLD : '#fff0c8', beam, '出来后的振动方向');
    var an = A_(lt, L[3], 0.6);
    if (an > 0.01) { arcl(g, 88, 13, 4.2, -Math.PI / 2, -Math.PI / 2 + rot, GOLD, 0.3, an); tx(g, '转了一个角度', 88, 7.5, 1.9, GOLD, 'center', 800, SANS, an); }
    chip(g, 50, 44.5, '光  ↔  磁', GOLD, A_(lt, L[4], 0.7), 'rgba(48,38,12,0.95)');
  };
