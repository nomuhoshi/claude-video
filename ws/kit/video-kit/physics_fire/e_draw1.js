
  // ================= scene helpers shared by draws and sound =================
  var IDX = DATA.idx;
  var DCUES = [], DBEDS = [];            // sound events that depend on the animation (filled while the scenes are set up)
  var PENTH = [1174.66, 1318.51, 1479.98, 1760.0, 1975.53, 2349.32];
  function sc_(key) { return scenes[IDX[key]]; }

  // ================= scene 0: the question, a quiet log and a few drifting atoms =================
  function logs(g, cx, cy, glow, a) {
    g.save(); g.globalAlpha *= a;
    if (glow > 0.01) halo(g, cx, cy - 1, 17, 'rgba(255,110,40,0.5)', glow);
    [[-8, 0.2, 1], [8, -0.2, -1]].forEach(function (p) {
      g.save(); g.translate(cx + p[0] * 0.2, cy + (p[2] > 0 ? 0.3 : -0.3)); g.rotate(p[1]);
      var gr = g.createLinearGradient(0, -1.6, 0, 1.6);
      gr.addColorStop(0, '#6a4a34'); gr.addColorStop(0.5, '#3f2b1f'); gr.addColorStop(1, '#21160f');
      g.fillStyle = gr; g.beginPath();
      if (g.roundRect) g.roundRect(-13, -1.7, 26, 3.4, 1.7); else g.rect(-13, -1.7, 26, 3.4);
      g.fill();
      if (glow > 0.01) { g.fillStyle = 'rgba(255,120,50,' + (0.5 * glow) + ')'; g.fillRect(-12, 0.2, 24, 1.1); }
      g.restore();
    });
    g.restore();
  }
  DRAW.d0 = function (g, lt, L) {
    var i, r = rng(21), ia = eo(pr(lt, 0.0, 1.4));
    for (i = 0; i < 10; i++) {
      var kind = i % 2 ? 'O' : 'C', bx = (i % 4 < 2) ? 8 + r() * 18 : 74 + r() * 18, by = 22 + r() * 20, ph = r() * 6, sp = 0.25 + r() * 0.3;
      var x = bx + Math.sin(lt * sp + ph) * 3, y = by + Math.cos(lt * sp * 0.8 + ph) * 2.2, rr = 0.9 + r() * 0.5;
      atom(g, x, y, rr, kind, 0.5 * ia * eo(pr(lt, 0.3 + i * 0.22, 1)), true);
    }
    var fk = eo(pr(lt, L[2] - 0.1, 2.6));
    logs(g, 50, 40, fk, ia);
    flame(g, 50, 39.4, 17, 21, lt, fk, 5);
    embers(g, 50, 36, 16, 20, lt, fk, 12, 26);
  };

  // ================= scene 1: carbon and oxygen like each other, if they get close enough =================
  DRAW.d1 = function (g, lt, L) {
    var rC = 4.2, rO = 3.7;
    tx(g, '靠得够近', 27, 12, 2.9, GOLD, 'center', 900, SANS, eo(pr(lt, L[2] - 0.3, 0.6)));
    tx(g, '没靠够近', 76, 12, 2.9, HOT, 'center', 900, SANS, eo(pr(lt, L[3] + 0.1, 0.6)));
    ln(g, 52, 10, 52, 40, 'rgba(190,210,235,0.16)', 0.12, [0.6, 0.6], eo(pr(lt, L[3], 0.8)));
    // ---- left pair: they pull together and hold on ----
    var Cx = 24, Cy = 26, aC = eo(pr(lt, L[0] + 0.1, 0.7)), aO = eo(pr(lt, L[0] + 1.2, 0.7));
    var tb = L[2] + 0.4, dMove = 1.3, pm = eio(pr(lt, tb, dMove)), contact = Cx + rC + rO - 0.3;
    var jig = lt > tb + dMove ? Math.sin(lt * 34) * 0.07 * Math.exp(-(lt - tb - dMove) * 1.2) : 0;
    var Ox = mix(42, contact, pm) + (1 - pm) * Math.sin(lt * 1.6) * 0.5 + jig, Oy = Cy + (1 - pm) * Math.cos(lt * 1.3) * 0.8;
    // the pull: a few small arrows that breathe while they are still apart
    var pull = eo(pr(lt, L[1], 0.6)) * (1 - pm);
    if (pull > 0.01) {
      for (var k = 0; k < 3; k++) {
        var f = (lt * 0.7 + k / 3) % 1, ax = mix(Cx + rC + 1.5, Ox - rO - 1.5, 0.5) + (f - 0.5) * 7;
        var al = pull * Math.sin(f * Math.PI) * 0.9;
        ln(g, ax - 1.6, Cy + (k - 1) * 2.0, ax + 1.0, Cy + (k - 1) * 2.0, 'rgba(242,198,107,0.9)', 0.3, null, al);
        arrowHead(g, ax + 1.6, Cy + (k - 1) * 2.0, 0, 0.9, 'rgba(242,198,107,0.95)', al);
      }
    }
    bond(g, Cx, Cy, Ox, Oy, 0.6, 'rgba(242,198,107,0.9)', pm > 0.98 ? 1 : 0);
    atom(g, Cx + jig, Cy, rC, 'C', aC); atom(g, Ox, Oy, rO, 'O', aO);
    var tBond = tb + dMove;
    if (lt > tBond) {
      var q = lt - tBond;
      halo(g, (Cx + Ox) / 2, Cy, 9, 'rgba(255,230,160,0.8)', clamp(1 - q / 1.0) * 0.9);
      ring(g, (Cx + Ox) / 2, Cy, 1 + q * 9, 'rgba(255,240,200,0.9)', 0.2, clamp(1 - q / 0.9));
      halo(g, (Cx + Ox) / 2, Cy, 8, 'rgba(242,198,107,0.35)', 0.5 + 0.2 * Math.sin(lt * 3));
      tx(g, '抱在一起', (Cx + Ox) / 2, Cy + 9.4, 2.5, GOLD, 'center', 700, SANS, eo(pr(lt, tBond + 0.3, 0.6)));
    } else {
      tx(g, '碳', Cx, Cy + 8.2, 2.3, FG, 'center', 700, SANS, aC);
      tx(g, '氧', Ox, Cy + 8.2, 2.3, FG, 'center', 700, SANS, aO);
    }
    // ---- right pair: not close enough, it gets pushed away ----
    var C2x = 66, C2y = 26, aC2 = eo(pr(lt, L[3] + 0.1, 0.7)), aO2 = eo(pr(lt, L[3] + 0.4, 0.7));
    var near = C2x + rC + rO + 2.2, far = 91;
    var t1c = L[4] + 1.45, t2c = L[4] + 3.55, tOut = 0.95;
    var O2x = far;
    if (lt < t1c) O2x = mix(far, near, eio(pr(lt, L[3] + 0.8, t1c - L[3] - 0.8)));
    else if (lt < t1c + tOut) O2x = mix(near, far, eo(pr(lt, t1c, tOut)));
    else if (lt < t2c) O2x = mix(far, near, eio(pr(lt, t1c + tOut, t2c - t1c - tOut)));
    else O2x = mix(near, far, eo(pr(lt, t2c, tOut)));
    O2x += Math.sin(lt * 1.5) * 0.25;
    var rep = 0;
    [t1c, t2c].forEach(function (tc) { rep = Math.max(rep, clamp(1 - (lt - tc) / 0.9) * (lt >= tc ? 1 : 0)); });
    atom(g, C2x, C2y, rC, 'C', aC2); atom(g, O2x, C2y, rO, 'O', aO2);
    if (rep > 0) {
      var gx = (C2x + rC + O2x - rO) / 2;
      halo(g, gx, C2y, 6, 'rgba(255,140,90,0.8)', rep);
      for (var j = -1; j <= 1; j += 2) { ln(g, gx, C2y, gx + j * (2.6 + (1 - rep) * 3), C2y, HOT, 0.3, null, rep); arrowHead(g, gx + j * (2.6 + (1 - rep) * 3), C2y, j > 0 ? 0 : Math.PI, 0.9, HOT, rep); }
    }
    tx(g, '排斥', 76, 37, 2.6, HOT, 'center', 700, SANS, eo(pr(lt, L[4] + 0.9, 0.6)));
    // legend
    var la = eo(pr(lt, L[0] + 1.6, 0.8)) * 0.9;
    atom(g, 8, 39, 1.1, 'C', la, true); tx(g, '碳', 10.4, 39, 1.9, DIM, 'left', 500, SANS, la);
    atom(g, 16.5, 39, 1.1, 'O', la, true); tx(g, '氧', 18.9, 39, 1.9, DIM, 'left', 500, SANS, la);
  };
