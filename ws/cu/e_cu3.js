  // ================= copper video: d11-d15 =================
  function tube(g, x, y0, y1, w, a) {
    if (a <= 0.003) return;
    rbox(g, x - w / 2, y0, w, y1 - y0, 0.8, 'rgba(224,151,90,0.9)', 0.35, 'rgba(224,151,90,0.16)', a);
    ln(g, x - w / 2 + 0.7, y0 + 1, x - w / 2 + 0.7, y1 - 1, 'rgba(255,220,180,0.45)', 0.3, null, a);
  }
  function magV(g, cx, cy, w, h, a) { magnetBar(g, cx - w / 2, cy - h / 2, w, h, a, true); }
  DRAW.d11 = function (g, lt, L) {
    var a0 = A_(lt, 0.1, 0.8), top = 14, bot = 40, tx0 = 30, fx = 70;
    tube(g, tx0, 10, 44, 7.5, a0);
    chip(g, tx0, 7.2, '铜管', COP, A_(lt, L[0] + 0.1, 0.6), 'rgba(50,30,14,0.95)');
    var ma = A_(lt, L[0] + 0.3, 0.7);
    var tt = Math.max(0, lt - (L[2] + 0.2)), T = 9.5;
    var yt = top + (bot - top) * clamp(tt / 7.2), yf = top + (bot - top) * clamp((tt / 1.35) * (tt / 1.35));
    magV(g, tx0, yt, 3.6, 7, ma);
    // a free magnet beside it, same start
    var fa = A_(lt, L[2] - 0.2, 0.7);
    magV(g, fx, yf, 3.6, 7, fa);
    chip(g, fx, 7.2, '自由落下', DIM, fa);
    ln(g, fx - 6, bot + 4, fx + 6, bot + 4, 'rgba(238,242,248,0.35)', 0.25, null, fa);
    var na = A_(lt, L[1] + 0.1, 0.8) * (1 - A_(lt, L[2] + 0.1, 0.5));
    chip(g, 50, 44.2, '铜不吸磁铁', ICE, na);
    var wa = A_(lt, L[3] + 0.2, 0.8);
    chip(g, 50, 44.2, '管里的慢得出奇', GOLD, wa * (1 - A_(lt, L[4] + 0.1, 0.4)), 'rgba(40,30,12,0.95)');
    var ha = A_(lt, L[4] + 0.2, 0.8);
    if (ha > 0.01) {
      arrow(g, tx0 + 9, yt + 4, tx0 + 9, yt - 3.5, RED, 0.4, ha * 0.9, 1.1);
      tx(g, '看不见的手', tx0 + 11, yt, 1.9, RED, 'left', 700, SANS, ha);
    }
  };

  DRAW.d12 = function (g, lt, L) {
    var a0 = A_(lt, 0.1, 0.7), cx = 40, cy = 24, i;
    tube(g, cx, 8, 41, 24, a0 * 0.7);
    var my = cy + Math.sin(lt * 1.3) * 3;
    var ra = A_(lt, L[0] + 0.2, 0.8);
    // field lines around the magnet
    for (i = 1; i <= 3; i++) { g.save(); g.globalAlpha *= a0 * 0.35; g.strokeStyle = '#8fd0ff'; g.lineWidth = 0.2; g.beginPath(); g.ellipse(cx, my, 3 + i * 3.4, 4 + i * 4.4, 0, 0, TAU); g.stroke(); g.restore(); }
    // eddy rings above and below, current arrows run round them
    function eddy(y, dir, a) {
      if (a <= 0.003) return;
      g.save(); g.globalAlpha *= a; g.strokeStyle = COP; g.lineWidth = 0.7; g.beginPath(); g.ellipse(cx, y, 10.5, 2.6, 0, 0, TAU); g.stroke(); g.restore();
      for (var k = 0; k < 5; k++) { var an = dir * lt * 2 + k * TAU / 5; var ex = cx + 10.5 * Math.cos(an), ey = y + 2.6 * Math.sin(an); dot(g, ex, ey, 0.55, '#ffe2b0', a); glow(g, ex, ey, 2.2, 'rgba(255,214,150,0.9)', 0.5 * a); }
    }
    eddy(my + 8.5, 1, ra); eddy(my - 8.5, -1, ra);
    magV(g, cx, my, 4.2, 8.4, a0);
    chip(g, 66, 12, '涡流', COP, A_(lt, L[1] + 0.1, 0.6), 'rgba(50,30,14,0.95)');
    ln(g, 61, 13, 51, my + 8, 'rgba(224,151,90,0.7)', 0.2, [0.6, 0.5], A_(lt, L[1] + 0.2, 0.6));
    var ea = A_(lt, L[2] + 0.1, 0.8);
    for (i = 0; i < 2; i++) { var yy = my + (i ? 8.5 : -8.5); glow(g, cx, yy, 14, 'rgba(255,200,130,0.9)', 0.16 * ea); }
    chip(g, 66, 38, '涡流本身，也是电磁铁', GOLD, ea * (1 - A_(lt, L[3] + 0.2, 0.4)), 'rgba(40,30,12,0.95)');
    var pa = A_(lt, L[3] + 0.1, 0.8);
    arrow(g, cx + 15, my + 14, cx + 15, my + 6, RED, 0.5, pa, 1.2); tx(g, '反推', cx + 18, my + 10.2, 2.0, RED, 'left', 800, SANS, pa);
    chip(g, 50, 44.8, '感应，总是反抗变化', GOLD, A_(lt, L[4] + 0.1, 0.8), 'rgba(40,30,12,0.95)');
  };

  function crank(g, cx, cy, r, ang, a, effort) {
    if (a <= 0.003) return;
    ring(g, cx, cy, r, ICE, 0.7, a); wheelW(g, cx, cy, r * 0.8, ang, a, ICE, 4);
    var hx = cx + r * Math.cos(ang), hy = cy + r * Math.sin(ang);
    ln(g, cx, cy, hx, hy, '#cfe8ff', 0.9, null, a); dot(g, hx, hy, 1.1, GOLD, a);
    if (effort) glow(g, hx, hy, 4, 'rgba(255,120,90,0.9)', 0.3 * effort * a);
  }
  function lamp(g, x, y, on, a) {
    glow(g, x, y, 7, 'rgba(255,224,150,0.95)', 0.5 * on * a); ring(g, x, y, 2.4, 'rgba(255,224,150,0.9)', 0.4, a);
    dot(g, x, y, 1.5 + 0.6 * on, 'rgba(255,224,150,' + (0.25 + 0.75 * on) + ')', a);
    ln(g, x - 1.2, y + 2.4, x + 1.2, y + 2.4, 'rgba(147,161,182,0.9)', 0.4, null, a);
  }
  DRAW.d13 = function (g, lt, L) {
    var a0 = A_(lt, 0.1, 0.7), sw = A_(lt, L[2] - 0.2, 0.7), i;
    var s1 = a0 * (1 - sw);
    // part 1: the slowed-down magnet turns into heat
    tube(g, 34, 10, 44, 8, s1); magV(g, 34, 22 + 10 * Math.min(1, lt / 6), 3.6, 7, s1);
    chip(g, 34, 7.2, '慢下来的动能', ICE, A_(lt, L[0] + 0.1, 0.6) * (1 - sw));
    var ha = A_(lt, L[1] + 0.1, 0.9) * (1 - sw);
    glow(g, 34, 28, 14, 'rgba(255,110,60,0.9)', 0.35 * ha);
    for (i = 0; i < 6; i++) { var q = fr(lt * 0.5 + i / 6), hx = 28 + (i * 5.3) % 14; ln(g, hx, 40 - q * 24, hx + 1.2 * Math.sin(q * 8 + i), 37 - q * 24, 'rgba(255,150,90,0.8)', 0.4, null, ha * Math.sin(q * Math.PI)); }
    arrow(g, 44, 26, 62, 26, GOLD, 0.4, ha, 1.1);
    tx(g, '热', 70, 26, 8, '#ff8a5c', 'center', 900, SANS, ha); chip(g, 70, 34, '变成铜里的热', '#ff8a5c', ha);
    // part 2: more lamps, harder to crank
    var lamps = 1 + (lt > L[3] + 0.2 ? 1 : 0) + (lt > L[3] + 1.2 ? 1 : 0);
    var eff = (lamps - 1) / 2, sp = 3.4 - 1.8 * eff;
    var ang = lt * sp;
    crank(g, 22, 26, 8, ang, sw, 0.3 + eff);
    for (i = 0; i < 3; i++) { var on = i < lamps ? 1 : 0.0; var ly = 14 + i * 12; wire(g, [[30, 26], [48, 26], [48, ly], [70, ly]], COP, 0.5, sw * (i < lamps ? 1 : 0.25)); lamp(g, 74, ly, on, sw * (i < lamps ? 1 : 0.3)); }
    pulses(g, [[30, 26], [48, 26], [48, 14], [70, 14]], lt, 0.5, 3, '#ffe2b0', sw, 0.4);
    chip(g, 22, 39, '摇手柄', ICE, sw);
    var ma = A_(lt, L[3] + 0.3, 0.7), me = A_(lt, L[4] + 0.1, 0.7);
    chip(g, 74, 41, '灯越多，越费力', RED, ma * (1 - me));
    chip(g, 50, 44.4, '电，是用力气换来的', GOLD, me, 'rgba(40,30,12,0.95)');
  };

  DRAW.d14 = function (g, lt, L) {
    var a0 = A_(lt, 0.1, 0.8), i;
    // three examples on top
    var ic = [[22, '钻头马达'], [50, '大坝发电机'], [78, '铜管里的磁铁']], ia = A_(lt, L[0] + 0.1, 0.8);
    motorIcon(g, 22, 10, 2.5, lt * 6, ia, 0.3); tx(g, ic[0][1], 22, 16.4, 1.7, DIM, 'center', 700, SANS, ia);
    wheelW(g, 50, 10, 3.2, lt * 3, A_(lt, L[0] + 0.5, 0.8), ICE, 6); tx(g, ic[1][1], 50, 16.4, 1.7, DIM, 'center', 700, SANS, A_(lt, L[0] + 0.5, 0.8));
    var ma = A_(lt, L[1] + 0.1, 0.8); tube(g, 78, 3.6, 14, 4.6, ma); magV(g, 78, 7 + 3 * Math.sin(lt * 1.3), 2, 3.6, ma); tx(g, ic[2][1], 78, 16.4, 1.7, DIM, 'center', 700, SANS, ma);
    // the triangle
    var ta = A_(lt, L[2] + 0.1, 0.9), N = [[50, 24.5, '电流', COP], [27, 39.5, '磁场', '#8fd0ff'], [73, 39.5, '运动', LEAF]];
    var th = lt;
    function edge(a, b, col, w, al) { ln(g, N[a][0], N[a][1], N[b][0], N[b][1], col, w, null, al); }
    edge(0, 1, 'rgba(147,161,182,0.35)', 0.25, ta); edge(1, 2, 'rgba(147,161,182,0.35)', 0.25, ta); edge(0, 2, 'rgba(147,161,182,0.35)', 0.25, ta);
    var ea = A_(lt, L[3] + 0.1, 0.7), ga = A_(lt, L[4] + 0.1, 0.7), ra = A_(lt, L[5] + 0.1, 0.7);
    if (ea > 0.01) { arrow(g, 55, 26.3, 69.3, 35.7, COP, 0.55, ea, 1.3); chip(g, 70, 28, '电流 + 磁场 → 转：马达', COP, ea, 'rgba(50,30,14,0.95)'); }
    if (ga > 0.01) { arrow(g, 68.1, 37.7, 53.7, 28.3, LEAF, 0.55, ga, 1.3); chip(g, 30, 28, '转 + 磁场 → 电流：发电机', LEAF, ga); }
    if (ra > 0.01) { g.save(); g.globalAlpha *= ra; g.strokeStyle = RED; g.lineWidth = 0.55; g.setLineDash([1.6, 1]); g.beginPath(); g.arc(50, 34, 6, Math.PI * 0.1, Math.PI * 0.9); g.stroke(); g.restore(); chip(g, 50, 44.4, '生出的电，总是反抗运动', RED, ra); }
    for (i = 0; i < 3; i++) { halo(g, N[i][0], N[i][1], 7, N[i][3], 0.18 * ta); dot(g, N[i][0], N[i][1], 4.2, 'rgba(12,20,34,0.95)', ta); ring(g, N[i][0], N[i][1], 4.2, N[i][3], 0.35, ta); tx(g, N[i][2], N[i][0], N[i][1] + 0.1, 2.3, N[i][3], 'center', 900, SANS, ta); }
  };

  DRAW.d15 = function (g, lt, L) {
    var a0 = A_(lt, 0.1, 0.8), i;
    // the drill and the fear
    var da = a0 * (1 - 0.6 * A_(lt, L[2], 0.8));
    drillIcon(g, 6, 30, 1.0, da, lt > L[4] ? lt : 0);
    var ba = A_(lt, L[0] + 0.1, 0.7) * (1 - A_(lt, L[1] + 0.6, 0.6));
    for (i = 0; i < 3; i++) dot(g, mix(14, 24, i / 2), mix(22, 17, i / 2), 0.5 + i * 0.4, 'rgba(143,208,255,0.55)', ba);
    g.save(); g.globalAlpha *= ba; g.beginPath(); g.ellipse(34, 13, 9, 5.5, 0, 0, TAU); g.fillStyle = 'rgba(40,80,130,0.2)'; g.fill(); g.strokeStyle = 'rgba(143,208,255,0.7)'; g.lineWidth = 0.25; g.stroke(); g.restore();
    tx(g, '疼……', 34, 13, 2.2, '#cfeaff', 'center', 800, SANS, ba);
    // the copper chain: drill -> city -> dam
    var wa = A_(lt, L[1] + 0.1, 1.2), cw = A_(lt, L[2] - 0.1, 1.6);
    var P = [[24, 28], [38, 28], [38, 22], [60, 22], [60, 28], [78, 28]];
    var S = polyLen(P), u = eo(clamp((lt - (L[1] + 0.2)) / 2.4)), cut = [P[0]], k;
    for (k = 1; k < P.length; k++) { if (S[k] <= u * S[S.length - 1]) cut.push(P[k]); else { var tt = (u * S[S.length - 1] - S[k - 1]) / (S[k] - S[k - 1]); cut.push([mix(P[k - 1][0], P[k][0], tt), mix(P[k - 1][1], P[k][1], tt)]); break; } }
    if (u > 0.01 && cut.length > 1) { wire(g, cut, COP, 0.8, wa); wire(g, cut, 'rgba(255,214,170,0.4)', 0.3, wa); }
    var ca = A_(lt, L[2] + 0.2, 0.8);
    for (i = 0; i < 5; i++) house(g, 46 + i * 3.6, 22 - (i % 2) * 0.1, 1.5, null, ca);
    wheelW(g, 88, 28, 7, lt * 2.2, ca, ICE, 8); tx(g, '大坝', 88, 39.2, 1.8, DIM, 'center', 700, SANS, ca); tx(g, '城市', 50, 15.6, 1.8, DIM, 'center', 700, SANS, ca);
    // the point: only copper wire and its motion
    var ga = A_(lt, L[3] + 0.1, 0.9);
    if (ga > 0.01) { pulses(g, P, lt, 0.4, 5, '#ffe2b0', ga, 0.45); glow(g, 50, 25, 30, 'rgba(224,151,90,0.9)', 0.12 * ga); }
    tx(g, 'Cu', 50, 34, 13, COP, 'center', 900, MONO, A_(lt, L[5] + 0.1, 1.0) * 0.28);
    chip(g, 50, 44.2, '只有铜线，和铜线的运动', GOLD, W_(lt, L[3] + 0.2, L[4] - 0.1, 0.7, 0.5), 'rgba(40,30,12,0.95)');
    chip(g, 50, 44.2, '下次听见钻头响，想想铜', GOLD, A_(lt, L[5] + 0.2, 0.8), 'rgba(40,30,12,0.95)');
  };
