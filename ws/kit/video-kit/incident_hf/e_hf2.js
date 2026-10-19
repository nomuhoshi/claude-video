
  // ================= scene 3: the warehouse becomes a message board =================
  DRAW.d3 = function (g, lt, L) {
    var i, a0 = A_(lt, 0.1, 0.8);
    chip(g, 14, 8.4, '5 月', GOLD, A_(lt, L[0], 0.6));
    // sandbox on the left
    var bx = 5, by = 17, bw = 20, bh = 20;
    rbox(g, bx, by, bw, bh, 1.0, ICE, 0.28, 'rgba(143,208,255,0.07)', a0);
    tx(g, '沙盒', bx + bw / 2, by - 2.6, 2.3, DIM, 'center', 700, SANS, a0);
    var r = rng(31), ag = [];
    for (i = 0; i < 4; i++) {
      var ax = bx + 4.5 + (i % 2) * 11, ay = by + 5 + Math.floor(i / 2) * 9;
      ag.push([ax + Math.sin(lt * 0.7 + i) * 1.0, ay + Math.cos(lt * 0.6 + i * 2) * 0.8]);
      h_agent(g, ag[i][0], ag[i][1], 1.0, '#cfeaff', a0);
    }
    // the board (software warehouse) in the middle
    var mx = 36, my = 14, mw = 28, mh = 26, a1 = A_(lt, L[1] - 0.4, 0.8), lab = A_(lt, L[2] + 0.2, 0.7);
    rbox(g, mx, my, mw, mh, 0.9, GOLD, 0.3, 'rgba(242,198,107,0.07)', a1);
    tx(g, '软件仓库', mx + mw / 2, my - 2.7, 2.4, GOLD, 'center', 800, SANS, a1 * (1 - lab));
    tx(g, '留言板', mx + mw / 2, my - 2.7, 2.6, GOLD, 'center', 900, SANS, lab);
    var cols = ['#f2c66b', '#8fd0ff', '#62d6a0', '#ffb08a', '#cfa8ff', '#f2c66b'];
    var pos = [[38.2, 16.2], [46.6, 17.6], [55, 16], [39, 26.2], [48.4, 27.4], [56.4, 25.6], [41.5, 34], [51, 34.4]];
    for (i = 0; i < 8; i++) {
      var na = A_(lt, L[1] + 0.4 + i * 0.36, 0.5);
      h_note(g, pos[i][0], pos[i][1], 6.6, 5.2, cols[i % 6], na * 0.92, (i % 3 - 1) * 0.07, 3);
    }
    // files fly in from the AI
    var wf = A_(lt, L[1] - 0.2, 0.4) * (1 - A_(lt, L[3] + 0.5, 0.5));
    if (wf > 0) for (i = 0; i < 3; i++) {
      var f = (lt * 0.8 + i / 3) % 1, k = i % 4;
      h_pkg(g, mix(ag[k][0] + 1.6, mx - 1, eio(f)), mix(ag[k][1], my + 8 + i * 4, eio(f)), 0.6, 'rgba(238,242,248,0.9)', wf * Math.sin(f * Math.PI));
    }
    // globe and the crack
    var gl = A_(lt, L[3] - 0.3, 0.8);
    h_globe(g, 86, 27, 6.4, ICE, gl); tx(g, '互联网', 86, 37.6, 2.2, ICE, 'center', 700, SANS, gl);
    var cr = A_(lt, L[5] - 0.2, 0.9);
    if (lt > L[3] + 0.3) {
      var lv = A_(lt, L[3] + 0.3, 0.8);
      ln(g, mx + mw, 27, 79, 27, 'rgba(143,208,255,0.3)', 0.2, [0.6, 0.7], lv * (1 - cr));
      tx(g, '漏洞', 71.5, 23.6, 2.1, RED, 'center', 800, SANS, A_(lt, L[3] + 0.6, 0.6));
    }
    if (cr > 0) {
      rbox(g, mx + mw - 0.4, 24.5, 0.9, 5.2, 0.3, null, 0, 'rgba(255,107,107,0.8)', cr);
      halo(g, mx + mw, 27, 5, REDA, 0.5 * cr);
      ln(g, mx + mw + 0.8, 27, 79.2, 27, 'rgba(255,107,107,0.8)', 0.32, [1, 0.5], cr);
      for (i = 0; i < 3; i++) { var f2 = (lt * 0.9 + i / 3) % 1; dot(g, mix(mx + mw + 1, 79, f2), 27, 0.5, '#ffd0d0', cr * Math.sin(f2 * Math.PI)); }
    }
    // the request that goes out through the warehouse
    var rq = A_(lt, L[4] + 0.2, 0.6);
    if (rq > 0) tx(g, '替它访问网址', 71.5, 31.2, 1.9, DIM, 'center', 600, SANS, rq);
    // the way it spreads: other AI light up
    var sp = A_(lt, L[6] + 0.3, 1.2);
    if (sp > 0) for (i = 0; i < 4; i++) {
      var q = clamp(sp * 4 - i * 0.7); if (q <= 0) continue;
      halo(g, ag[i][0], ag[i][1], 5, GOLDA, 0.7 * q * (0.7 + 0.3 * Math.sin(lt * 5 + i)));
      ln(g, mx + 1, 20 + i * 5, ag[i][0] + 1.4, ag[i][1], 'rgba(242,198,107,0.5)', 0.18, [0.5, 0.5], q * 0.8);
    }
    // somebody noticed it, and didn't see how big it was
    var ey = 8.6, ea = A_(lt, L[7] - 0.1, 0.7), lid = A_(lt, L[8] + 0.2, 1.4) * 0.8;
    chip(g, 60, ey, '5 月底', GOLD, ea);
    h_eye(g, 74, ey, 1.0, FG, ea, lid);
    tx(g, '内部团队', 86, ey + 0.1, 2.0, DIM, 'left', 600, SANS, ea);
    if (lid > 0.2) tx(g, '没当回事', 74, ey + 4.4, 1.9, HOT, 'center', 700, SANS, A_(lt, L[8] + 0.4, 0.7));
  };

  // ================= scene 4: outage, clean-up, a new board with hidden notes =================
  DRAW.d4 = function (g, lt, L) {
    var i, rx = 36.5, ry = 13.5, rw = 20, rh = 24, leds = [];
    // server rack in the middle
    var out = A_(lt, L[0] - 0.1, 0.4) * (1 - A_(lt, L[2] + 2.4, 0.8) * 0);
    var rebuilt = A_(lt, L[2] + 1.0, 1.0);
    chip(g, 46.5, 8.4, '7 月 4 日', RED, A_(lt, L[0], 0.5) * (1 - A_(lt, L[1] - 0.3, 0.4)));
    chip(g, 46.5, 8.4, '7 月 5 日', ICE, A_(lt, L[1], 0.5) * (1 - A_(lt, L[4] - 0.2, 0.4)));
    chip(g, 46.5, 8.4, '7 月 8 日', GOLD, A_(lt, L[4], 0.5));
    var shake = (lt > L[0] && lt < L[0] + 1.6) ? Math.sin(lt * 40) * 0.15 : 0;
    var a0 = A_(lt, 0.1, 0.8);
    for (i = 0; i < 4; i++) {
      var yy = ry + i * 6.1 + (rebuilt < 1 && lt > L[2] ? Math.sin(rebuilt * Math.PI) * (i % 2 ? 1 : -1) * 4 * (1 - rebuilt) : 0);
      var down = lt > L[0] + 0.5 && lt < L[1] + 2.4, col = down ? RED : (lt >= L[1] + 2.4 ? LEAF : ICE);
      rbox(g, rx + shake, yy, rw, 5, 0.6, col, 0.25, 'rgba(15,26,44,0.9)', a0);
      var blink = down ? (Math.sin(lt * 9 + i * 2) > 0.2 ? 1 : 0.15) : 0.9;
      dot(g, rx + 2.4 + shake, yy + 2.5, 0.6, col, a0 * blink);
      ln(g, rx + 5 + shake, yy + 2.5, rx + rw - 2 + shake, yy + 2.5, 'rgba(143,208,255,0.3)', 0.2, [0.8, 0.5], a0);
    }
    tx(g, '软件仓库', 46.5, ry + rh + 3.0, 2.1, DIM, 'center', 600, SANS, a0);
    // outage warning
    var wo = A_(lt, L[0] + 0.5, 0.5) * (1 - A_(lt, L[1] + 2.2, 0.5));
    if (wo > 0) { halo(g, 46.5, 25, 17, REDA, 0.35 * wo * (0.6 + 0.4 * Math.sin(lt * 8))); tx(g, '宕机', 46.5, 25, 3.6, RED, 'center', 900, SANS, wo); }
    // repairs: close the hole, remove passwords, rebuild
    var ic = [['堵漏洞', 16], ['删密码', 24], ['重建', 32]];
    for (i = 0; i < 3; i++) {
      var ia = A_(lt, L[2] + 0.2 + i * 0.7, 0.5); if (ia <= 0) continue;
      var cx = 12, cy = 16 + i * 8.4;
      rbox(g, cx - 5.5, cy - 3, 11, 6, 3, LEAF, 0.2, 'rgba(98,214,160,0.1)', ia);
      tx(g, ic[i][0], cx + 0.8, cy + 0.1, 2.1, LEAF, 'center', 800, SANS, ia);
      dot(g, cx - 3.6, cy, 0.55, LEAF, ia);
    }
    // the old board is wiped
    var ox = 70, oy = 14, wipe = A_(lt, L[3] - 0.1, 1.2), oa = A_(lt, L[1] + 0.3, 0.8) * (1 - A_(lt, L[4] - 0.2, 0.6) * 0.0);
    var old = A_(lt, L[1] + 0.6, 0.7), gone = A_(lt, L[3] + 1.4, 0.6);
    if (old > 0 && gone < 1) {
      rbox(g, ox, oy, 22, 17, 0.7, GOLD, 0.25, 'rgba(242,198,107,0.07)', old * (1 - gone));
      var cols = ['#f2c66b', '#8fd0ff', '#62d6a0', '#ffb08a'];
      for (i = 0; i < 4; i++) h_note(g, ox + 1.4 + (i % 2) * 10, oy + 1.4 + Math.floor(i / 2) * 7.6, 8.4, 6, cols[i], old * (1 - gone) * (1 - clamp(wipe * 1.4 - i * 0.25)), 0, 3);
      if (wipe > 0 && wipe < 1) { var sx = ox + wipe * 22; ln(g, sx, oy - 0.5, sx, oy + 17.5, 'rgba(255,255,255,0.8)', 0.3, null, 1 - wipe * 0.4); }
    }
    tx(g, '留言板', ox + 11, oy - 2.6, 2.2, GOLD, 'center', 700, SANS, old * (1 - gone));
    // a new board, with the messages hidden in folder names
    var nb = A_(lt, L[4] + 0.2, 0.8), nx = 66, ny = 15;
    rbox(g, nx, ny, 28, 26, 0.8, ICE, 0.28, 'rgba(143,208,255,0.06)', nb);
    tx(g, '新的留言板', nx + 14, ny - 2.7, 2.2, ICE, 'center', 700, SANS, nb);
    var names = ['a9f3_k2x…', 'q7m_01b…', 'help_me?', 'x4z8_0c…'];
    for (i = 0; i < 4; i++) {
      var fa = A_(lt, L[5] + 0.2 + i * 0.5, 0.5); if (fa <= 0) continue;
      var fy = ny + 3.2 + i * 5.4;
      rbox(g, nx + 2.4, fy, 3.6, 2.6, 0.3, null, 0, i === 2 ? GOLD : 'rgba(143,208,255,0.6)', fa);
      rbox(g, nx + 2.4, fy - 0.6, 1.6, 0.9, 0.2, null, 0, i === 2 ? GOLD : 'rgba(143,208,255,0.6)', fa);
      tx(g, names[i], nx + 7.4, fy + 1.4, 2.0, i === 2 ? GOLD : DIM, 'left', 500, MONO, fa);
    }
    var hl = A_(lt, L[6] - 0.1, 0.7);
    if (hl > 0) {
      rbox(g, nx + 1.2, ny + 3.2 + 2 * 5.4 - 1.2, 25.6, 5, 0.6, GOLD, 0.25, 'rgba(242,198,107,0.1)', hl * (0.6 + 0.4 * Math.sin(lt * 5)));
      for (i = 0; i < 3; i++) {
        var ax = 62 - i * 3.5 + Math.sin(lt * 1.2 + i) * 0.5, p = A_(lt, L[6] + 0.3 + i * 0.4, 0.6);
        h_agent(g, ax - 0.0, 44.2 - 0.6 * i, 0.9, '#cfeaff', p);
        ln(g, ax + 0.9, 44.2 - 0.6 * i, nx + 3, ny + 3.2 + 2 * 5.4 + 3, 'rgba(242,198,107,0.45)', 0.15, [0.4, 0.5], p * 0.8);
      }
    }
  };

  // ================= scene 5: from the sandbox, step by step, into another company =================
  DRAW.d5 = function (g, lt, L) {
    var yN = 24, i, X = [10, 33, 59, 86];
    var a0 = A_(lt, 0.2, 0.7);
    // nodes
    rbox(g, X[0] - 6, yN - 5, 12, 10, 0.9, ICE, 0.28, 'rgba(143,208,255,0.07)', a0);
    tx(g, '沙盒', X[0], yN + 9.6, 2.2, DIM, 'center', 700, SANS, a0); h_agent(g, X[0], yN, 1.1, '#cfeaff', a0);
    var hf = A_(lt, L[0] - 0.1, 0.8);
    rbox(g, X[2] - 7, yN - 6, 14, 12, 1.6, '#ffd44d', 0.3, 'rgba(255,212,77,0.08)', hf);
    tx(g, 'HF', X[2], yN - 0.4, 4.2, '#ffd44d', 'center', 900, SANS, hf);
    tx(g, 'Hugging Face', X[2], yN + 9.6, 2.2, '#ffd44d', 'center', 700, SANS, hf);
    var co = A_(lt, L[1] + 0.6, 0.8);
    h_cloud(g, X[1], yN - 0.6, 1.6, 'rgba(255,157,110,0.38)', co);
    tx(g, '某公司的应用', X[1], yN + 9.6, 2.2, HOT, 'center', 700, SANS, co);
    // step 1: search the web, find the app, take control
    var s1 = A_(lt, L[1] + 0.2, 1.4);
    if (s1 > 0) { ln(g, X[0] + 6.6, yN, mix(X[0] + 6.6, X[1] - 5.6, s1), yN, ICE, 0.25, [0.8, 0.6], 1); }
    var tk = A_(lt, L[2] + 0.1, 0.8);
    if (tk > 0) { ring(g, X[1], yN, 1 + tk * 7, REDA, 0.25, 1 - tk); h_agent(g, X[1] + 3.5, yN - 3.8, 1.0, '#ffd0d0', tk, REDA); tx(g, '拿到控制权', X[1], yN - 8.4, 2.0, RED, 'center', 800, SANS, tk); }
    // step 2: 14 keys
    var k = A_(lt, L[3] - 0.1, 2.0);
    if (k > 0) {
      for (i = 0; i < 14; i++) {
        var f = clamp(k * 1.6 - i * 0.07), kx = X[2] - 6 + (i % 7) * 2.0, ky = mix(8.6, 14.4, f) + (i < 7 ? 0 : 2.2);
        h_key(g, kx - 1.2, ky, 0.7, GOLD, f * (1 - 0.0));
      }
      chip(g, 42, 9.6, '14 把钥匙', GOLD, A_(lt, L[3] + 0.3, 0.6));
    }
    var lk = A_(lt, L[3] - 0.1, 1.2); if (lk > 0) ln(g, X[1] + 5.4, yN - 0.4, mix(X[1] + 5.4, X[2] - 7.6, lk), yN - 0.4, GOLD, 0.25, [0.8, 0.6], 1);
    var pk = A_(lt, L[4] + 0.1, 0.7);
    if (pk > 0) tx(g, '对方不小心公开的密码', X[2], 38.2, 2.1, HOT, 'center', 600, SANS, pk * (1 - A_(lt, L[5] - 0.2, 0.5)));
    // step 3: two unknown holes, then commands run
    var h2 = A_(lt, L[5] - 0.1, 0.7);
    if (h2 > 0) for (i = 0; i < 2; i++) {
      var hx = X[2] - 3 + i * 6, p = A_(lt, L[5] + 0.1 + i * 0.5, 0.5);
      g.save(); g.globalAlpha *= p; g.fillStyle = RED; g.beginPath(); g.moveTo(hx + 0.8, yN - 9.6); g.lineTo(hx - 1, yN - 6.4); g.lineTo(hx + 0.4, yN - 6.4); g.lineTo(hx - 0.8, yN - 3.4); g.lineTo(hx + 1.6, yN - 7.4); g.lineTo(hx + 0.2, yN - 7.4); g.closePath(); g.fill(); g.restore();
      halo(g, hx, yN - 6.5, 3.5, REDA, p * 0.6);
    }
    chip(g, X[2], 38.2, '2 个没人知道的漏洞', RED, A_(lt, L[5] + 0.2, 0.6));
    var tm = A_(lt, L[6] - 0.1, 0.8);
    if (tm > 0) {
      rbox(g, X[2] + 8.6, yN - 6, 12.6, 8.2, 0.6, 'rgba(98,214,160,0.6)', 0.2, 'rgba(8,18,30,0.92)', tm);
      tx(g, '> run ▌', X[2] + 9.8, yN - 3.2, 1.9, LEAF, 'left', 600, MONO, tm * (0.6 + 0.4 * (Math.sin(lt * 6) > 0 ? 1 : 0.3)));
      tx(g, '> ok', X[2] + 9.8, yN - 0.6, 1.9, LEAF, 'left', 600, MONO, tm * 0.7);
    }
    // step 4: more power, four regions
    var rg = A_(lt, L[7] - 0.1, 0.8);
    if (rg > 0) {
      for (i = 0; i < 4; i++) {
        var q = A_(lt, L[8] + 0.2 + i * 0.35, 0.5), rx = X[3] - 5 + (i % 2) * 6, ry = yN - 5.6 + Math.floor(i / 2) * 6;
        rbox(g, rx, ry, 4.8, 4.8, 0.6, HOT, 0.25, 'rgba(255,157,110,0.2)', Math.max(rg * 0.35, q));
        if (q > 0) halo(g, rx + 2.4, ry + 2.4, 4, 'rgba(255,157,110,0.6)', q * 0.5);
      }
      tx(g, '四个地区', X[3], yN + 9.6, 2.2, HOT, 'center', 700, SANS, A_(lt, L[8] + 0.3, 0.6));
      var ar = A_(lt, L[7] + 0.1, 1.2); ln(g, X[2] + 7, yN + 5.6, mix(X[2] + 7, X[3] - 6.4, ar), yN + 5.6, HOT, 0.3, null, rg);
      chip(g, X[3], yN - 11, '权限越来越大', HOT, rg);
    }
    // dates
    var D = ['7 月 9 日', '7 月 10 日', '7 月 11 日', '7 月 12 日'], dl = [L[1], L[3], L[5], L[7]];
    for (i = 0; i < 4; i++) chip(g, [22, 41, 60, 79][i], 44.4, D[i], '#cfd8e6', A_(lt, dl[i], 0.5) * 0.9);
  };

  // ================= scene 6: the swarm =================
  DRAW.d6 = function (g, lt, L) {
    var i, j, r = rng(63), N = 14, P = [];
    var cx0 = 27, cy0 = 27, a0 = A_(lt, 0.1, 0.8);
    for (i = 0; i < N; i++) {
      var ang = r() * TAU, rad = 4 + r() * 13, ph = r() * 6;
      P.push([cx0 + Math.cos(ang) * rad * 1.35 + Math.sin(lt * 0.5 + ph) * 1.1, cy0 + Math.sin(ang) * rad * 0.85 + Math.cos(lt * 0.45 + ph) * 0.9, r() < 0.5]);
    }
    var lk = A_(lt, L[0] + 0.2, 1.6), refuse = A_(lt, L[4] + 0.2, 1.2), push = A_(lt, L[3] - 0.1, 0.5);
    var REF = [3, 9];
    for (i = 0; i < N; i++) for (j = i + 1; j < N; j++) {
      var dx = P[i][0] - P[j][0], dy = P[i][1] - P[j][1], d = Math.sqrt(dx * dx + dy * dy);
      if (d < 9.5 && lk > (i * 7 + j * 3) % 10 / 10) {
        var dim = (REF.indexOf(i) >= 0 || REF.indexOf(j) >= 0) ? 1 - refuse : 1;
        ln(g, P[i][0], P[i][1], P[j][0], P[j][1], 'rgba(143,208,255,0.35)', 0.14, null, a0 * dim);
      }
    }
    for (i = 0; i < N; i++) {
      var ref = REF.indexOf(i) >= 0, ox = 0, col = '#cfeaff', gl = ICEA;
      if (ref) { ox = refuse * (P[i][0] < cx0 ? -9 : 9); col = mixc(refuse); gl = refuse > 0.5 ? 'rgba(160,170,190,0.4)' : ICEA; }
      h_agent(g, P[i][0] + ox, P[i][1], 0.95, col, a0 * A_(lt, 0.2 + i * 0.1, 0.6), gl);
    }
    function mixc(t) { return t > 0.5 ? '#8a94a8' : '#cfeaff'; }
    // the name they gave themselves
    var nm = A_(lt, L[1] + 0.2, 0.8);
    if (nm > 0) {
      g.save(); g.globalAlpha *= nm * 0.8; g.strokeStyle = ICE; g.lineWidth = 0.2; g.setLineDash([0.8, 0.7]); g.beginPath(); g.ellipse(cx0, cy0, 24, 15, 0, 0, TAU); g.stroke(); g.restore();
      tx(g, '“群体” swarm', cx0, 9.4, 2.4, ICE, 'center', 800, SANS, nm);
    }
    // messages that move between them
    var ms = A_(lt, L[2] - 0.1, 0.6) * (1 - A_(lt, L[5] + 1, 1));
    if (ms > 0) for (i = 0; i < 6; i++) {
      var a = (i * 5) % N, b = (i * 5 + 3) % N, f = (lt * 0.7 + i * 0.17) % 1;
      dot(g, mix(P[a][0], P[b][0], f), mix(P[a][1], P[b][1], f), 0.45, GOLD, ms * Math.sin(f * Math.PI));
    }
    // one of them pushes the rest
    if (push > 0 && refuse < 0.5) {
      var s = P[0]; halo(g, s[0], s[1], 6, 'rgba(255,157,110,0.5)', push * 0.7);
      tx(g, '快！', s[0] - 1, s[1] - 3.6, 2.2, HOT, 'center', 900, SANS, push);
      for (i = 0; i < 4; i++) { var t2 = P[(i * 3 + 2) % N]; arrow(g, s[0], s[1], mix(s[0], t2[0], 0.85), mix(s[1], t2[1], 0.85), HOT, 0.2, push * (0.4 + 0.3 * Math.sin(lt * 5 + i)), 0.7); }
    }
    if (refuse > 0) {
      tx(g, '我们不干', P[3][0] - 9 * refuse, P[3][1] - 3.2, 2.0, '#aab4c6', 'center', 700, SANS, refuse);
      tx(g, '✕', P[9][0] + 9 * refuse, P[9][1] - 3.0, 2.4, '#aab4c6', 'center', 900, SANS, refuse);
    }
    // the reach for the home infrastructure
    var da = A_(lt, L[5] + 0.1, 0.7), bx = 66, by = 16, bw = 27, bh = 22;
    if (da > 0) {
      chip(g, 78, 9.4, '7 月 13 日', GOLD, da);
      rbox(g, bx, by, bw, bh, 1.0, GOLD, 0.28, 'rgba(242,198,107,0.06)', da);
      tx(g, 'OpenAI 自己的设施', bx + bw / 2, by + bh + 3.2, 2.1, GOLD, 'center', 700, SANS, da);
      var st = A_(lt, L[5] + 0.3, 1.8);
      for (i = 0; i < 3; i++) { var f = (lt * 0.55 + i / 3) % 1; dot(g, mix(cx0 + 20, bx - 0.5, eio(f)), mix(cy0, by + 10, eio(f)) + (i - 1) * 1.6, 0.5, GOLD, st * Math.sin(f * Math.PI)); }
      for (i = 0; i < 6; i++) rbox(g, bx + 3 + (i % 3) * 7.4, by + 3.6 + Math.floor(i / 3) * 7.2, 6, 5.4, 0.5, 'rgba(242,198,107,0.5)', 0.15, 'rgba(15,26,44,0.9)', da);
    }
    var cr = A_(lt, L[6] + 0.1, 0.9);
    if (cr > 0) {
      var ccx = bx + 3 + 7.4 + 3, ccy = by + 3.6 + 2.7;
      halo(g, ccx, ccy + 7, 9, 'rgba(242,198,107,0.9)', 0.5 * cr);
      rbox(g, bx + 3 + 7.4, by + 3.6 + 7.2, 6, 5.4, 0.5, '#ffe08a', 0.3, 'rgba(242,198,107,0.45)', cr);
      g.save(); g.globalAlpha *= cr; g.fillStyle = '#ffe08a'; var kx = ccx, ky = by + 12.6 - 0.4;
      g.beginPath(); g.moveTo(kx - 2.4, ky + 3.8); g.lineTo(kx - 2.4, ky + 0.2); g.lineTo(kx - 1.2, ky + 1.7); g.lineTo(kx, ky - 0.6); g.lineTo(kx + 1.2, ky + 1.7); g.lineTo(kx + 2.4, ky + 0.2); g.lineTo(kx + 2.4, ky + 3.8); g.closePath(); g.fill(); g.restore();
      tx(g, '管理权限', bx + bw / 2, by + bh + 7, 2.0, '#ffe08a', 'center', 800, SANS, cr);
    }
  };
