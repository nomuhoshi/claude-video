
  // ================= scene 5: where does a tree come from? =================
  function co2(g, x, y, s, ang, a) {
    var dx = Math.cos(ang) * 1.45 * s, dy = Math.sin(ang) * 1.45 * s;
    bond(g, x - dx, y - dy, x + dx, y + dy, 0.2 * s, 'rgba(238,242,248,0.6)', a);
    atom(g, x - dx, y - dy, 0.62 * s, 'O', a, true); atom(g, x + dx, y + dy, 0.62 * s, 'O', a, true); atom(g, x, y, 0.72 * s, 'C', a, true);
  }
  function treeShape(g, gx, gy, k, a, glow) {   // k = size, base of the trunk at (gx, gy)
    g.save(); g.globalAlpha *= a;
    var tr = g.createLinearGradient(gx - 2.5 * k, 0, gx + 2.5 * k, 0);
    tr.addColorStop(0, '#3a281c'); tr.addColorStop(0.5, '#7a5538'); tr.addColorStop(1, '#3a281c');
    g.fillStyle = tr; g.beginPath(); g.moveTo(gx - 2.4 * k, gy); g.lineTo(gx - 1.5 * k, gy - 13 * k); g.lineTo(gx + 1.5 * k, gy - 13 * k); g.lineTo(gx + 2.4 * k, gy); g.closePath(); g.fill();
    [[0, -19, 8.5], [-5.4, -16.6, 6.2], [5.4, -16.6, 6.2], [-3, -22.5, 6], [3.2, -22.5, 6]].forEach(function (c, n) {
      halo(g, gx + c[0] * k, gy + c[1] * k, c[2] * k, 'rgba(70,200,140,' + (0.62 + 0.1 * Math.sin(n)) + ')', 1);
    });
    if (glow > 0.01) halo(g, gx, gy - 19 * k, 14 * k, 'rgba(160,255,200,0.5)', glow);
    g.restore();
  }
  var CO2P = (function () {
    var rr = rng(51), a = [];
    for (var i = 0; i < 22; i++) {
      var side = i % 2 ? 1 : -1, ph = rr(), sp = 0.16 + rr() * 0.08, y0 = 6 + rr() * 22, x0 = 50 + side * (24 + rr() * 22);
      a.push({ ph: ph, sp: sp, y0: y0, x0: x0, tx: 50 + (rr() - 0.5) * 8, ty: 20 + (rr() - 0.5) * 5 });
    }
    return a;
  })();
  DRAW.d5 = function (g, lt, L) {
    var i, ga = eo(pr(lt, L[0] + 0.1, 1.4)), grow = 1 + 0.1 * eo(pr(lt, L[6], 3.5));
    // soil
    var sa = eo(pr(lt, L[0], 1.0));
    g.save(); g.globalAlpha *= sa;
    var sg = g.createLinearGradient(0, 39.5, 0, 43.5); sg.addColorStop(0, 'rgba(120,84,56,0.75)'); sg.addColorStop(1, 'rgba(60,40,28,0.35)');
    g.fillStyle = sg; g.fillRect(6, 39.5, 88, 4); ln(g, 6, 39.5, 94, 39.5, 'rgba(160,230,190,0.5)', 0.18);
    g.restore();
    tx(g, '土', 11, 41.6, 1.7, DIM, 'left', 500, SANS, sa * 0.9);
    treeShape(g, 50, 39.5, 0.72 * mix(0.2, 1, ga) * grow, ga, eo(pr(lt, L[5], 0.8)) * (0.5 + 0.2 * Math.sin(lt * 3)) * (1 - eo(pr(lt, L[7], 1))));
    // dry wood, by weight (Wood Handbook: 50 % C, 44 % O, 6 % H)
    var wa = eo(pr(lt, L[2] + 0.2, 0.9)) * (1 - eo(pr(lt, L[3] + 0.5, 0.7)));
    if (wa > 0.01) {
      var bx = 8, by = 17, bw = 30, bh = 2.4;
      tx(g, '干木头的成分（按重量）', bx, by - 2.6, 1.6, DIM, 'left', 500, SANS, wa);
      var segs = [[0.5, '#aeb9c9', '碳', '约一半'], [0.44, '#4aa0e6', '氧', ''], [0.06, '#e8eef6', '氢', '']], cx = bx;
      segs.forEach(function (s, n) {
        var w = bw * s[0] * eo(pr(lt, L[2] + 0.3 + n * 0.25, 0.9));
        g.save(); g.globalAlpha *= wa; g.fillStyle = s[1]; g.fillRect(cx, by, w, bh); g.restore();
        if (s[2] && w > 2) tx(g, s[2], cx + w / 2, by + bh + 2.0, 1.5, FG, 'center', 700, SANS, wa * clamp(w / 4));
        cx += w;
      });
      tx(g, '碳 约一半', bx + bw * 0.25, by + bh + 5.3, 2.0, GOLD, 'center', 900, SANS, wa * eo(pr(lt, L[2] + 0.9, 0.7)));
    }
    // "from the soil?"
    var q = eo(pr(lt, L[3] + 0.2, 0.8)) * (1 - eo(pr(lt, L[4] + 1.6, 0.7)));
    if (q > 0.01) {
      for (i = 0; i < 5; i++) {
        var f = (lt * 0.5 + i / 5) % 1, ax = 36 + i * 7;
        ln(g, ax, 39 - f * 5, ax, 33 - f * 5, 'rgba(210,170,120,0.9)', 0.25, [0.6, 0.5], q * Math.sin(f * Math.PI));
      }
      tx(g, '从土里长出来？', 50, 12.5, 3.0, FG, 'center', 900, SANS, q);
    }
    var xx = eo(pr(lt, L[4] + 0.1, 0.5));
    if (xx > 0.01 && xx < 1.01) {
      var xa = xx * (1 - eo(pr(lt, L[4] + 1.8, 0.8)));
      ln(g, 35, 12.6, mix(35, 65, eo(pr(lt, L[4] + 0.1, 0.5))), 12.6, '#ff6a4a', 0.5, null, xa);
    }
    // carbon dioxide from the air flows into the leaves
    var fl = eo(pr(lt, L[4] + 0.6, 1.0)), fl2 = 0.5 + 0.5 * eo(pr(lt, L[5], 1.5));
    var n = Math.round(10 + 12 * fl2), nsoft = 1 - eo(pr(lt, L[7] - 0.5, 1));
    if (fl > 0.01) {
      for (i = 0; i < n; i++) {
        var P = CO2P[i], age = (lt * P.sp + P.ph) % 1;
        var px = mix(P.x0, P.tx, eio(age)), py = mix(P.y0, P.ty, eio(age));
        var al = Math.sin(age * Math.PI) * 0.95 * fl * nsoft, sz = 0.9 * (1 - 0.35 * age);
        co2(g, px + Math.sin(lt + P.ph * 9) * 0.6, py, sz, P.ph * 6.28 + lt * 0.4, al);
      }
      tx(g, '二氧化碳', 84, 17.4, 2.0, ICE, 'center', 700, SANS, eo(pr(lt, L[5] + 0.3, 0.7)) * nsoft);
      co2(g, 84, 21.6, 1.1, 0, eo(pr(lt, L[5] + 0.3, 0.7)) * nsoft);
      tx(g, '空气', 84, 10, 2.4, ICE, 'center', 900, SANS, fl * 0.9 * nsoft);
    }
    var big = eo(pr(lt, L[6] + 0.2, 0.8)) * (1 - eo(pr(lt, L[7], 0.7)));
    if (big > 0.01) { pill(g, 25, 4.8, 50, 6.2, 'rgba(6,8,13,0.5)', big); tx(g, '树的大部分身体 ← 空气', 50, 7.9, 3.0, GOLD, 'center', 900, SANS, big); }
    // water and a pinch of minerals from the soil
    var wt = eo(pr(lt, L[7] + 0.1, 0.8));
    if (wt > 0.01) {
      for (i = 0; i < 5; i++) {
        var f2 = (lt * 0.22 + i / 5) % 1, wx = 44 + i * 3 + Math.sin(f2 * 9 + i) * 0.5, wy = 42 - f2 * 11;
        halo(g, wx, wy, 1.0, 'rgba(120,200,255,0.9)', wt * Math.sin(f2 * Math.PI));
      }
      tx(g, '水', 34, 36, 2.1, ICE, 'center', 900, SANS, wt);
      dot(g, 63, 41.4, 0.35, '#d6b690', wt); dot(g, 66, 40.6, 0.3, '#d6b690', wt); dot(g, 68, 42, 0.32, '#d6b690', wt);
      tx(g, '一点点矿物质', 72, 36, 1.7, '#d6b690', 'center', 700, SANS, wt);
    }
  };
