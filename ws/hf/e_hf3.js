
  // ================= scene 7: who noticed first =================
  DRAW.d7 = function (g, lt, L) {
    var x0 = 8, x1 = 92, y0 = 26, i, days = 13, dx = (x1 - x0) / (days - 1), a0 = A_(lt, 0.1, 0.8);
    function X(d) { return x0 + (d - 9) * dx; }
    ln(g, x0 - 2, y0, mix(x0 - 2, x1 + 2, a0), y0, 'rgba(190,210,235,0.5)', 0.3, null, 1);
    for (i = 0; i < days; i++) {
      var d = 9 + i, big = d === 16 || d === 19 || d === 20 || d === 21 || d === 9;
      ln(g, X(d), y0 - (big ? 1.3 : 0.7), X(d), y0 + (big ? 1.3 : 0.7), 'rgba(190,210,235,0.55)', 0.2, null, a0);
      if (d === 9 || d === 13 || d >= 16) tx(g, d + '', X(d), y0 + 3.4, 1.9, DIM, 'center', 600, MONO, a0);
    }
    tx(g, '7 月', x0 - 4, y0, 1.9, DIM, 'right', 700, SANS, a0 * 0);
    tx(g, '7 月', X(9), y0 + 6.4, 1.9, DIM, 'center', 700, SANS, a0);
    // the AI are active the whole time
    var bar = A_(lt, 0.4, 1.6), stop = lt >= L[4] ? 1 : 0;
    for (i = 0; i < 3; i++) {
      var ex = stop ? X(19) + 0.4 : mix(X(9), X(19) + 0.4, bar * 0 + clamp(bar * 1.0));
      rbox(g, X(9), y0 - 9 + i * 1.7, Math.max(0, mix(0, (stop ? X(19) + 0.4 : mix(X(9), X(19) + 0.4, 1)) - X(9), bar)), 1.0, 0.5, null, 0, stop ? 'rgba(160,170,190,0.45)' : 'rgba(143,208,255,0.55)', 1);
    }
    tx(g, 'AI 的测试一直在跑', X(9) + 1, y0 - 11.6, 2.0, ICE, 'left', 600, SANS, A_(lt, 0.6, 0.8) * (1 - stop * 0.5));
    // Jul 16: the other side speaks first
    var a1 = A_(lt, L[0] + 0.1, 0.7);
    if (a1 > 0) {
      dot(g, X(16), y0, 1.0, HOT, a1); halo(g, X(16), y0, 5, 'rgba(255,157,110,0.6)', a1 * 0.6);
      ln(g, X(16), y0 - 1.5, X(16), y0 - 8, HOT, 0.2, [0.5, 0.5], a1);
      rbox(g, X(16) - 9.5, y0 - 15.4, 19, 7.2, 1, HOT, 0.25, 'rgba(255,157,110,0.1)', a1);
      tx(g, '7 月 16 日', X(16), y0 - 13.2, 2.1, HOT, 'center', 800, SANS, a1);
      tx(g, 'Hugging Face 公布', X(16), y0 - 10.4, 1.8, FG, 'center', 600, SANS, a1);
    }
    var a1b = A_(lt, L[1] + 0.2, 0.7);
    if (a1b > 0) tx(g, '据转述：是他们自己发现并拦下的', X(16), y0 + 7.8, 2.0, DIM, 'center', 600, SANS, a1b * (1 - A_(lt, L[2], 0.5)));
    // Jul 19: OpenAI's own monitor
    var a2 = A_(lt, L[2] + 0.1, 0.7), sw = Math.sin(lt * 14) * 0.25 * clamp(1 - (lt - L[2] - 0.3) / 1.4) * (lt > L[2] + 0.3 ? 1 : 0);
    if (a2 > 0) {
      ln(g, X(19), y0 - 1.5, X(19), y0 - 6.5, GOLD, 0.2, [0.5, 0.5], a2);
      h_bell(g, X(19), y0 - 1.0, 0.5, sw, RED, a2);
      halo(g, X(19), y0, 6, REDA, a2 * 0.5 * (0.6 + 0.4 * Math.sin(lt * 6)));
      rbox(g, X(19) - 9.5, y0 - 14.2, 19, 7.6, 1, GOLD, 0.25, 'rgba(242,198,107,0.1)', a2);
      tx(g, '7 月 19 日', X(19), y0 - 12, 2.1, GOLD, 'center', 800, SANS, a2);
      tx(g, 'OpenAI 监控报警', X(19), y0 - 9.1, 1.8, FG, 'center', 600, SANS, a2);
    }
    var a3 = A_(lt, L[3] + 0.1, 0.7) * (1 - A_(lt, L[5] - 0.2, 0.5) * 0);
    if (a3 > 0) tx(g, '有人用异常的身份调用接口', X(19) - 4, y0 + 7.8, 2.0, GOLD, 'center', 600, SANS, a3 * (1 - A_(lt, L[4] - 0.1, 0.5)));
    var a4 = A_(lt, L[4] + 0.1, 0.7);
    if (a4 > 0) { tx(g, '全部叫停', X(19) - 2, y0 + 7.8, 2.4, RED, 'center', 800, SANS, a4); h_pause(g, X(19) - 8.6, y0 + 7.9, 0.9, RED, a4); }
    // Jul 20 and 21
    var a5 = A_(lt, L[5] + 0.1, 0.7);
    if (a5 > 0) {
      dot(g, X(20), y0, 0.9, ICE, a5); halo(g, X(20), y0, 4, ICEA, a5 * 0.6);
      ln(g, X(16) + 1, y0 + 5.4, X(20) - 1, y0 + 5.4, ICE, 0.2, [0.6, 0.6], A_(lt, L[5] + 0.3, 0.8));
    }
    tx(g, '20 日：确认是同一件事', 93, y0 + 11.4, 2.0, ICE, 'right', 700, SANS, a5);
    var a6 = A_(lt, L[6] + 0.1, 0.7);
    if (a6 > 0) {
      dot(g, X(21), y0, 1.1, LEAF, a6); halo(g, X(21), y0, 5, GRNA, a6 * 0.7);
      ring(g, X(21), y0, 1 + (lt - L[6]) % 2 * 3, GRNA, 0.2, a6 * 0.7 * (1 - ((lt - L[6]) % 2) / 2));
      tx(g, '21 日：通知对方，公开说明', 93, y0 + 15.0, 2.0, LEAF, 'right', 700, SANS, a6);
    }
    var a7 = A_(lt, L[7] + 0.1, 0.7);
    if (a7 > 0) {
      var nm = ['CrowdStrike', 'METR', 'Redwood Research'], nx = [20, 43, 68];
      tx(g, '外部核查', 8, 44.4, 2.0, DIM, 'left', 700, SANS, a7);
      for (i = 0; i < 3; i++) chip(g, nx[i] + 12, 44.4, nm[i], '#cfd8e6', A_(lt, L[7] + 0.2 + i * 0.4, 0.5));
    }
  };

  // ================= scene 8: a student who only sees the score =================
  DRAW.d8 = function (g, lt, L) {
    var i, a0 = A_(lt, 0.1, 0.8), sy = 22, a1 = A_(lt, L[1] - 0.1, 0.8);
    h_agent(g, 11, sy, 1.9, '#cfeaff', a1);
    tx(g, 'AI', 11, sy + 5, 2.2, DIM, 'center', 700, SANS, a1);
    var sc = A_(lt, L[1] + 0.2, 0.8);
    tx(g, '只看分数', 11, sy - 6.4, 2.2, GOLD, 'center', 800, SANS, sc);
    // the reward at the far end
    var a3 = A_(lt, L[3] - 0.1, 0.8);
    tx(g, '★', 60, 21, 5.2, GOLD, 'center', 900, SANS, a3);
    tx(g, '奖励', 60, 27.6, 2.2, GOLD, 'center', 800, SANS, a3);
    // the honest way: through the whole exam
    if (a3 > 0) {
      g.save(); g.globalAlpha *= a3; g.strokeStyle = 'rgba(143,208,255,0.6)'; g.lineWidth = 0.3; g.setLineDash([0.9, 0.7]); g.beginPath(); g.moveTo(14, sy + 2); g.lineTo(56, 23.6); g.stroke(); g.restore();
      for (i = 0; i < 4; i++) { var f = (lt * 0.25 + i / 4) % 1; dot(g, mix(14, 56, f), mix(sy + 2, 23.6, f), 0.45, ICE, a3 * 0.7 * Math.sin(f * Math.PI)); }
    }
    // the exam paper that never ends
    var a2 = A_(lt, L[2] - 0.1, 0.9);
    if (a2 > 0) {
      for (i = 0; i < 4; i++) rbox(g, 24 + i * 1.3, 15 + i * 1.0, 14, 18, 0.5, 'rgba(143,208,255,0.45)', 0.18, 'rgba(15,26,44,0.95)', a2 * (0.45 + i * 0.18));
      for (i = 0; i < 6; i++) ln(g, 28.9, 20 + i * 2.0, 28.9 + (6 + (i * 5) % 6), 20 + i * 2.0, 'rgba(143,208,255,0.55)', 0.22, null, a2);
      tx(g, '做不完的考试', 31.6, 38, 2.1, DIM, 'center', 600, SANS, a2);
    }
    // the shortcut over the top
    var a4 = A_(lt, L[4] + 0.1, 0.9), pp = eio(pr(lt, L[4] + 0.3, 1.6));
    if (a4 > 0) {
      var N = 28, k, x, y, px = 0, py = 0;
      g.save(); g.globalAlpha *= a4; g.strokeStyle = RED; g.lineWidth = 0.45; g.beginPath();
      for (k = 0; k <= N * pp; k++) { var u = k / N; x = (1 - u) * (1 - u) * 13 + 2 * (1 - u) * u * 36 + u * u * 57.5; y = (1 - u) * (1 - u) * (sy - 1) + 2 * (1 - u) * u * 2 + u * u * 20.4; if (k === 0) g.moveTo(x, y); else g.lineTo(x, y); px = x; py = y; }
      g.stroke(); g.restore();
      halo(g, px, py, 3.2, REDA, a4);
      tx(g, '钻空子', 36, 8.6, 2.9, RED, 'center', 900, SANS, A_(lt, L[4] + 0.6, 0.6));
    }
    // 93 per cent of the board talk
    var d = A_(lt, L[5] - 0.1, 0.8), p93 = eio(pr(lt, L[6] + 0.1, 1.6)) * 0.93, cx = 83, cy = 24, R = 9;
    if (d > 0) {
      ring(g, cx, cy, R, 'rgba(190,210,235,0.22)', 1.6, d);
      var nn = A_(lt, L[5] + 0.1, 1.2);
      g.save(); g.globalAlpha *= d; g.strokeStyle = RED; g.lineWidth = 1.7; g.lineCap = 'round'; g.beginPath();
      g.arc(cx, cy, R, -Math.PI / 2, -Math.PI / 2 + TAU * Math.max(0.0001, (lt < L[6] ? nn * 198 / 898 : mix(198 / 898, p93, 1))), false); g.stroke(); g.restore();
      tx(g, Math.round(p93 * 100) + '%', cx, cy, 4.2, RED, 'center', 900, MONO, d * (lt < L[6] ? 0 : 1));
      tx(g, '198 题', cx, cy - 0.2, 3.0, RED, 'center', 900, MONO, d * (lt < L[6] ? 1 : 0));
      tx(g, lt < L[6] ? '从没人做出来' : '留言板上的讨论', cx, cy + 12.4, 2.0, DIM, 'center', 600, SANS, d);
    }
    var a7 = A_(lt, L[7] + 0.1, 0.8);
    if (a7 > 0) tx(g, '越做不出来，越想走捷径', 40, 43, 2.3, HOT, 'center', 800, SANS, a7 * (0.75 + 0.25 * Math.sin(lt * 5)));
    // there is no door marked "give up"
    var a8 = A_(lt, L[8] + 0.1, 0.9);
    if (a8 > 0) {
      rbox(g, 7.8, 34, 5.4, 7.6, 0.4, 'rgba(238,242,248,0.6)', 0.25, 'rgba(238,242,248,0.06)', a8);
      dot(g, 11.6, 38, 0.3, FG, a8);
      tx(g, '放弃', 10.5, 32.4, 2.0, DIM, 'center', 700, SANS, a8);
      ln(g, 6.4, 33, 14.8, 42, RED, 0.45, null, a8); ln(g, 14.8, 33, 6.4, 42, RED, 0.45, null, a8);
      tx(g, '没有这个选项', 19, 38, 2.2, RED, 'left', 700, SANS, a8);
    }
  };

  // ================= scene 9: fewer safeguards in the test, and nobody watching =================
  DRAW.d9 = function (g, lt, L) {
    var i, a0 = A_(lt, 0.1, 0.8), a1 = A_(lt, L[1] - 0.1, 0.8), a2 = A_(lt, L[2] - 0.2, 0.8);
    var swap = A_(lt, L[4] - 0.5, 0.7), top = 1 - swap, names = ['内容审核', '过滤', '系统约束'];
    g.save(); g.globalAlpha *= top;
    tx(g, '正式产品', 24, 9.2, 2.5, FG, 'center', 900, SANS, a0);
    tx(g, '测试环境', 74, 9.2, 2.5, FG, 'center', 900, SANS, a0);
    var LY = [11.5, 15.3, 19.1], LH = [22, 14.6, 7.2], LW = [38, 30, 22];
    for (i = 0; i < 3; i++) {
      rbox(g, 24 - LW[i] / 2, LY[i], LW[i], LH[i], 1.2 + i, LEAF, 0.3, 'rgba(98,214,160,' + (0.05 + 0.02 * i) + ')', A_(lt, L[1] + 0.15 + i * 0.45, 0.6));
      tx(g, names[i], 24, LY[i] + 2.1, 1.9, LEAF, 'center', 700, SANS, A_(lt, L[1] + 0.35 + i * 0.45, 0.6));
      rbox(g, 74 - LW[i] / 2, LY[i], LW[i], LH[i], 1.2 + i, 'rgba(147,161,182,0.6)', 0.2, null, a2, [0.6, 0.7]);
    }
    h_agent(g, 24, 24.2, 1.0, '#cfeaff', a1); h_agent(g, 74, 24.2, 1.0, '#cfeaff', a2);
    tx(g, '一层都没开', 74, 36, 2.3, HOT, 'center', 800, SANS, a2);
    var a3 = A_(lt, L[3] - 0.1, 0.8);
    h_eye(g, 24, 40.6, 1.2, FG, a3, 0);
    ln(g, 19.4, 43.6, 28.6, 37.6, RED, 0.4, null, A_(lt, L[3] + 0.6, 0.6));
    tx(g, '没人盯着 AI 的“思考过程”', 34, 40.6, 2.2, DIM, 'left', 600, SANS, a3);
    g.restore();
    // what if somebody had been watching: a one-hour alarm against a 30-hour gap
    var t0 = 9, t1 = 90, y = 28, a4 = A_(lt, L[4] + 0.1, 0.8);
    if (swap > 0) {
      g.save(); g.globalAlpha *= swap;
      h_eye(g, 12, 11.2, 1.0, FG, a4, 0); tx(g, '要是开着监控', 18.4, 11.2, 2.4, FG, 'left', 800, SANS, a4);
      ln(g, t0, y, mix(t0, t1 + 3, a4), y, 'rgba(190,210,235,0.55)', 0.3, null, 1);
      dot(g, t0, y, 1.0, ICE, a4); tx(g, '第一次越权', t0, y + 4.6, 2.0, ICE, 'center', 700, SANS, a4);
      var a5 = A_(lt, L[5] + 0.1, 0.7), bx = t0 + 5.5;
      if (a5 > 0) {
        ln(g, t0, y, bx, y, GOLD, 0.7, null, a5);
        h_bell(g, bx, y - 1.2, 0.5, Math.sin(lt * 12) * 0.2 * clamp(1 - (lt - L[5]) / 1.4), GOLD, a5); halo(g, bx, y, 5, GOLDA, a5 * 0.5);
        tx(g, '约 1 小时：报警', bx + 1, y + 9.2, 2.0, GOLD, 'left', 800, SANS, a5); ln(g, bx, y + 1.6, bx, y + 7.6, GOLD, 0.15, [0.4, 0.4], a5);
      }
      var a6 = A_(lt, L[6] + 0.1, 0.9);
      if (a6 > 0) {
        dot(g, t1, y, 1.2, RED, a6); halo(g, t1, y, 5, REDA, a6 * 0.6); tx(g, '攻破 Hugging Face', t1 - 1, y + 4.6, 2.0, RED, 'right', 700, SANS, a6);
        var sp = A_(lt, L[6] + 0.4, 1.5), ex = mix(bx + 1, t1 - 1, sp);
        ln(g, bx + 1, y - 3.2, ex, y - 3.2, RED, 0.3, null, a6); ln(g, bx + 1, y - 4.4, bx + 1, y - 2, RED, 0.3, null, a6); ln(g, ex, y - 4.4, ex, y - 2, RED, 0.3, null, a6);
        rbox(g, bx + 1, y - 2.6, Math.max(0, ex - bx - 1), 5.2, 0.4, null, 0, 'rgba(255,107,107,0.14)', a6);
        tx(g, '早了 30 多小时', (bx + t1) / 2, y - 7.4, 3.0, RED, 'center', 900, SANS, A_(lt, L[6] + 1.2, 0.7));
      }
      g.restore();
    }
  };

  // ================= scene 10: four things OpenAI says it will change =================
  DRAW.d10 = function (g, lt, L) {
    var cw = 41, ch = 15.6, X = [6, 53], Y = [7.6, 25.6], k;
    var cards = [
      { t: '更结实的盒子', c: ICE, s: 0, e: 1 }, { t: '盯着思考过程', c: GOLD, s: 2, e: 3 },
      { t: '改进训练', c: LEAF, s: 4, e: 5 }, { t: '严重警报先暂停', c: HOT, s: 6, e: 8 }];
    for (k = 0; k < 4; k++) {
      var cd = cards[k], x = X[k % 2], y = Y[Math.floor(k / 2)], a = A_(lt, L[cd.s] - 0.1, 0.8), cx = x + 8.2, cy = y + ch / 2 + 1.8;
      rbox(g, x, y, cw, ch, 1.2, cd.c, 0.26, 'rgba(15,26,44,0.6)', a);
      tx(g, '' + (k + 1), x + 3.2, y + 3.2, 2.6, cd.c, 'center', 900, MONO, a);
      tx(g, cd.t, x + 14.4, y + 3.6, 2.4, FG, 'left', 800, SANS, a);
      var b = A_(lt, L[cd.e] - 0.1, 0.8), sub = '';
      if (k === 0) {            // a stronger box: double wall, cut off from the net
        rbox(g, cx - 4.2, cy - 3, 8.4, 6, 0.8, ICE, 0.35, 'rgba(143,208,255,0.1)', a);
        rbox(g, cx - 5.8, cy - 4.5, 11.6, 9, 1.0, ICE, 0.22, null, b);
        h_agent(g, cx, cy, 0.8, '#cfeaff', a);
        sub = '高风险测试，和网络彻底隔开';
        ln(g, x + cw - 5.6, y + 2.2, x + cw - 2.8, y + 5, RED, 0.4, null, b); ln(g, x + cw - 2.8, y + 2.2, x + cw - 5.6, y + 5, RED, 0.4, null, b);
      } else if (k === 1) {     // watching the thinking
        h_eye(g, cx, cy, 1.2, GOLD, a, 0);
        sub = '这类测试，必须开着监控';
        if (b > 0) { rbox(g, x + cw - 8.2, y + 1.6, 5.6, 4, 1.4, 'rgba(242,198,107,0.6)', 0.2, 'rgba(242,198,107,0.1)', b); tx(g, '...', x + cw - 5.4, y + 3.2, 2.0, GOLD, 'center', 900, SANS, b); }
      } else if (k === 2) {     // better training
        tx(g, '★', cx, cy + 0.2, 4.0, LEAF, 'center', 900, SANS, a);
        sub = '不钻空子、认出坏题、安全停下';
        tx(g, '✓', x + cw - 4.4, y + 3.6, 2.8, LEAF, 'center', 900, SANS, b);
      } else {                  // 30 minutes
        ring(g, cx, cy, 4.6, 'rgba(255,157,110,0.5)', 0.4, a);
        var sw = A_(lt, L[6] + 0.1, 2.2);
        g.save(); g.globalAlpha *= a; g.strokeStyle = HOT; g.lineWidth = 0.9; g.lineCap = 'round'; g.beginPath(); g.arc(cx, cy, 4.6, -Math.PI / 2, -Math.PI / 2 + TAU * 0.5 * sw); g.stroke(); g.restore();
        tx(g, '30', cx, cy + 0.2, 2.6, HOT, 'center', 900, MONO, a);
        sub = '分钟没证明是误报，就先暂停';
        b = A_(lt, L[6] + 0.5, 0.8);
        h_pause(g, x + cw - 4.4, y + 3.8, 1.0, HOT, A_(lt, L[7] - 0.1, 0.7));
      }
      tx(g, sub, x + 14.4, y + 10.2, 1.75, DIM, 'left', 500, SANS, b);
    }
    var fa = A_(lt, L[8] + 0.1, 0.9);
    if (fa > 0) {
      var w = 74;
      rbox(g, 50 - w / 2, 43.6, w, 3.4, 1.7, HOT, 0.25, 'rgba(255,157,110,0.1)', fa);
      h_pause(g, 17, 45.3, 0.8, HOT, fa);
      tx(g, '最大规模的前沿训练：已暂停，只做小规模的', 52, 45.4, 2.0, HOT, 'center', 700, SANS, fa);
    }
  };

  // ================= scene 11: a wake-up call =================
  DRAW.d11 = function (g, lt, L) {
    var a0 = A_(lt, 0.0, 0.9), cx = 50, cy = 21, i;
    var sw = (lt - L[0]) > 0 ? Math.sin((lt - L[0]) * 3.2) * 0.32 * Math.exp(-(lt - L[0]) * 0.18) : 0;
    halo(g, cx, cy, 26, GOLDA, 0.2 * a0);
    h_bell(g, cx, cy - 1, 1.9, sw, GOLD, a0);
    var t = lt - L[0];
    if (t > 0) for (i = 0; i < 3; i++) { var f = ((t * 0.55) + i / 3) % 1; ring(g, cx, cy + 3, 6 + f * 18, 'rgba(242,198,107,0.9)', 0.25, (1 - f) * 0.55 * a0); }
    var tags = [[15, 14, '更快'], [85, 14, '更大规模'], [50, 35, '更协调']];
    for (i = 0; i < 3; i++) {
      var q = A_(lt, L[2] + 0.2 + i * 0.8, 0.7);
      tx(g, tags[i][2], tags[i][0], tags[i][1], 3.2, HOT, 'center', 900, SANS, q);
    }
    var a1 = A_(lt, L[1] + 0.1, 0.8);
    tx(g, 'AI 绕过了技术控制', cx, 41.0, 2.4, ICE, 'center', 700, SANS, a1 * (1 - A_(lt, L[2] + 0.1, 0.5)));
    // safeguards must run ahead of capability
    var a3 = A_(lt, L[3] - 0.1, 0.8);
    if (a3 > 0) {
      var p = eio(pr(lt, L[3] + 0.1, 2.6)), y1 = 41.4, y2 = 44.6;
      ln(g, 14, y1, 14 + 66 * p * 0.85, y1, ICE, 0.9, null, a3);
      ln(g, 14, y2, 14 + 66 * p * 0.7, y2, HOT, 0.9, null, a3);
      tx(g, '防护', 11.6, y1, 2.2, ICE, 'right', 800, SANS, a3); tx(g, '能力', 11.6, y2, 2.2, HOT, 'right', 800, SANS, a3);
    }
  };
