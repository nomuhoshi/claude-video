  // ---------- chapter card, recap, sources ----------
  function chapCard(g, sc, lt, c) {
    var d = lt, cx = 960, cy = 500;
    g.save();
    var w = 900 * eo((lt + 0.2) / 0.9); g.strokeStyle = 'rgba(240,189,92,0.5)'; g.lineWidth = 1.5; g.shadowColor = '#f0bd5c'; g.shadowBlur = 12;
    g.beginPath(); g.moveTo(cx - w / 2, cy + 92); g.lineTo(cx + w / 2, cy + 92); g.stroke(); g.shadowBlur = 0;
    var k = d < 0.16 ? 1.9 - 0.9 * eo(d / 0.16) : 1 + 0.02 * (d - 0.16);
    g.save(); g.globalAlpha *= Math.min(1, d / 0.05); g.translate(cx, cy); g.scale(k, k); g.textAlign = 'center';
    g.font = '900 190px ' + SERIF; g.fillStyle = '#f6dfae'; g.shadowColor = 'rgba(240,180,80,0.85)'; g.shadowBlur = 40;
    if (g.letterSpacing !== undefined) g.letterSpacing = '24px'; g.fillText(c.word, 12, 60); if (g.letterSpacing !== undefined) g.letterSpacing = '0px'; g.restore();
    if (d < 0.6) { g.save(); g.globalAlpha *= 1 - d / 0.6; g.strokeStyle = 'rgba(255,214,140,0.8)'; g.lineWidth = 3;
      for (var i = 0; i < 18; i++) { var an = i / 18 * 6.283, r0 = 230 + d * 520, r1 = r0 + 50 + 40 * rnd(i); g.beginPath(); g.moveTo(cx + Math.cos(an) * r0, cy + Math.sin(an) * r0 * 0.55); g.lineTo(cx + Math.cos(an) * r1, cy + Math.sin(an) * r1 * 0.55); g.stroke(); }
      g.restore(); }
    for (var i = 0; i < 60; i++) { var an = rnd(i + 3) * 6.283, sp = 80 + 380 * rnd(i + 7), dd = Math.min(d, 2.2), x = cx + Math.cos(an) * sp * eo(dd / 2.2), y = cy + Math.sin(an) * sp * 0.6 * eo(dd / 2.2) - 30 * dd;
      g.fillStyle = 'rgba(255,210,140,' + (0.8 * (1 - dd / 2.2)).toFixed(3) + ')'; g.fillRect(x, y, 2.5, 2.5); }
    g.textAlign = 'center';
    g.globalAlpha = E((lt + 0.1) / 0.5); g.font = '700 30px ' + SERIF; g.fillStyle = 'rgba(240,200,130,0.85)'; if (g.letterSpacing !== undefined) g.letterSpacing = '10px'; g.fillText(c.n, cx + 5, cy - 150);
    g.globalAlpha = E((lt - 0.5) / 0.5) * 0.85; g.font = '500 26px ' + MONO; g.fillStyle = 'rgba(220,210,190,0.85)'; if (g.letterSpacing !== undefined) g.letterSpacing = '14px'; g.fillText(c.en, cx + 7, cy + 150);
    if (g.letterSpacing !== undefined) g.letterSpacing = '0px';
    var p = E((lt - 0.8) / 0.5); g.globalAlpha = p; g.font = '700 40px ' + SERIF; g.fillStyle = '#ece6da'; g.shadowColor = 'rgba(0,0,0,0.9)'; g.shadowBlur = 12;
    g.filter = p < 1 ? 'blur(' + ((1 - p) * 8).toFixed(1) + 'px)' : 'none'; g.fillText(c.line, cx, cy + 236); g.filter = 'none';
    g.restore();
  }
  var NODES = [['卡', '一张周日的明信片', '1900 · 10 · 7'], ['份', '一份一份的能量', '1900 · 12 · 14'], ['疑', '一个不信自己的人', '1905 · 1918'], ['码', '一个称量世界的小数', '2019']];
  function recap(g, sc, lt) {
    var xs = [420, 790, 1160, 1530], y = 600;
    g.save(); var w = 1240 * eo((lt - 0.2) / (sc.ls[3] + 0.6));
    g.strokeStyle = 'rgba(240,189,92,0.6)'; g.lineWidth = 2; g.shadowColor = '#f0bd5c'; g.shadowBlur = 10; g.beginPath(); g.moveTo(360, y); g.lineTo(360 + w, y); g.stroke(); g.shadowBlur = 0;
    NODES.forEach(function (n, k) {
      var p = cl((lt - sc.ls[k] - 0.1) / 0.5); if (p <= 0) return; var x = xs[k], col = k === 3 ? BLUE : GOLD;
      g.globalAlpha = p; g.fillStyle = col; g.shadowColor = col; g.shadowBlur = 16; g.beginPath(); g.arc(x, y, 9, 0, 6.29); g.fill(); g.shadowBlur = 0;
      g.strokeStyle = rgba(col, 0.8 * (1 - p)); g.beginPath(); g.arc(x, y, 9 + 40 * p, 0, 6.29); g.stroke();
      g.textAlign = 'center'; g.font = '900 96px ' + SERIF; g.fillStyle = k === 3 ? '#cfe0ff' : '#f6dfae'; g.shadowColor = rgba(col, 0.7); g.shadowBlur = 24; g.fillText(n[0], x, y - 44); g.shadowBlur = 0;
      g.font = '700 30px ' + SERIF; g.fillStyle = '#ece6da'; g.fillText(n[1], x, y + 62); g.font = '500 20px ' + MONO; g.fillStyle = 'rgba(200,190,170,0.8)'; g.fillText(n[2], x, y + 98);
    });
    var tp = E((lt - sc.ls[3] - 1.6) / 0.8);
    if (tp > 0) { g.globalAlpha = tp; g.font = '900 56px ' + SERIF; g.shadowColor = 'rgba(0,0,0,0.9)'; g.shadowBlur = 14;
      var s1 = '最保守的人，', s2 = '打开了量子的门', s3 = '', w1 = g.measureText(s1).width, w2 = g.measureText(s2).width, w3 = g.measureText(s3).width, x0 = 960 - (w1 + w2 + w3) / 2;
      g.textAlign = 'left'; g.fillStyle = '#ece6da'; g.fillText(s1, x0, 860); g.fillStyle = GOLD; g.fillText(s2, x0 + w1, 860); g.fillStyle = '#ece6da'; g.fillText(s3, x0 + w1 + w2, 860); }
    g.restore();
  }
  function sources(g, sc, lt) {
    g.save(); g.textAlign = 'left';
    TL.src.forEach(function (s, k) {
      var p = E((lt - 0.2 - k * 0.1) / 0.4); if (p <= 0) return; var col = k < 3 ? 0 : 1, row = k % 3, x = 200 + col * 820, y = 330 + row * 150;
      g.globalAlpha = p; g.font = '700 28px ' + SERIF; g.fillStyle = '#ece6da'; g.fillText(s[0], x, y);
      g.font = '500 19px ' + MONO; g.fillStyle = 'rgba(190,195,205,0.75)'; g.fillText(s[1], x, y + 36);
      g.fillStyle = 'rgba(240,189,92,0.6)'; g.fillRect(x - 22, y - 22, 3, 60);
    });
    g.globalAlpha = E((lt - 1.2) / 0.5); g.textAlign = 'center'; g.font = '700 26px ' + SERIF; g.fillStyle = '#ece6da'; g.fillText('10 月报告的具体日期、他到柏林接任的年份，各来源说法不一，片中不写。', 960, 930);
    g.restore();
  }
  function drawScene(g, i, lt, alpha) {
    if (alpha <= 0) return; var sc = SCN[i];
    g.save(); g.globalAlpha = alpha;
    if (sc.k === 'chap') chapCard(g, sc, lt, TL.chaps.filter(function (c) { return Math.abs(c.s - sc.s) < 0.01; })[0]);
    else if (sc.k === 'recap') recap(g, sc, lt);
    else if (sc.k === 'src') sources(g, sc, lt);
    else if (D[sc.draw]) D[sc.draw](g, lt, sc.ls, sc);
    g.restore();
  }
  window.SCENE = function (g, t) {
    var i = 0; for (var k = 0; k < SCN.length; k++) if (t >= SCN[k].s) i = k;
    var sc = SCN[i], lt = t - sc.s, X = (sc.k === 'chap' || (i > 0 && SCN[i - 1].k === 'chap')) ? 0.25 : 0.5;
    if (i > 0 && lt < X) { var p = E(lt / X); var pv = SCN[i - 1]; drawScene(g, i - 1, pv.e - pv.s, 1 - p); drawScene(g, i, lt, p); }
    else drawScene(g, i, lt, 1);
    var hasText = TL.groups.some(function (gr) { return t >= gr.s && t < gr.e; });
    if (hasText) { var sg = g.createRadialGradient(300, 160, 40, 300, 180, 820); sg.addColorStop(0, 'rgba(5,7,12,0.55)'); sg.addColorStop(1, 'rgba(5,7,12,0)'); g.fillStyle = sg; g.fillRect(-60, -60, 1300, 800); }
  };
})();
