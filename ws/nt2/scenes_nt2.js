// Newton v2: the shipped pictures (ws/nt DRAW.n0..n24, drawn in 100 x 56.25 units) on a layer, plus v2 chapter cards, recap and sources.
(function () {
  var TL = window.TL, ODRAW = window.ODRAW, SCN = TL.scenes;
  var LAYER = document.createElement('canvas'); LAYER.width = 1920; LAYER.height = 1080; var LG = LAYER.getContext('2d');
  var KS = 19.2;
  // per-picture framing: [dx, dy, scale] in old units, to keep the top-left free for the narration
  var OFF = { n6: [4, 5, 1], n9: [10, 5.6, 0.9], n16: [10, 5.6, 0.9], n18: [0, 3, 1], n19: [10, 5.6, 0.9], n20: [10, 5.6, 0.9], n22: function (lt, L) { return [0, 9 * E((lt - (L[2] - 0.7)) / 0.9), 1]; } };
  function cl(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function E(x) { x = cl(x); return x * x * (3 - 2 * x); }
  function eo(x) { x = cl(x); return 1 - Math.pow(1 - x, 3); }
  function rnd(s) { var x = Math.sin(s * 91.7 + 17.3) * 43758.5453; return x - Math.floor(x); }
  var SERIF = '"Noto Serif CJK SC"', MONO = '"IBM Plex Mono", monospace';

  function oldScene(sc, lt) {
    LG.setTransform(1, 0, 0, 1, 0, 0); LG.clearRect(0, 0, 1920, 1080); LG.globalAlpha = 1; LG.filter = 'none';
    var o = OFF[sc.draw] || [0, 0, 1]; if (typeof o === 'function') o = o(lt, sc.ls); LG.setTransform(KS * o[2], 0, 0, KS * o[2], o[0] * KS, o[1] * KS); LG.lineCap = 'round'; LG.lineJoin = 'round'; LG.setLineDash([]);
    var fn = ODRAW[sc.draw]; if (fn) fn(LG, lt, sc.ls);
    return LAYER;
  }
  function chapCard(g, sc, lt, c) {
    var d = lt - 0.35, cx = 960, cy = 500;
    g.save();
    var w = 900 * eo((lt - 0.1) / 0.9); g.strokeStyle = 'rgba(240,189,92,0.5)'; g.lineWidth = 1.5; g.shadowColor = '#f0bd5c'; g.shadowBlur = 12;
    g.beginPath(); g.moveTo(cx - w / 2, cy + 92); g.lineTo(cx + w / 2, cy + 92); g.stroke(); g.shadowBlur = 0;
    if (d >= 0) {
      var k = d < 0.16 ? 1.9 - 0.9 * eo(d / 0.16) : 1 + 0.02 * (d - 0.16);
      g.save(); g.globalAlpha = Math.min(1, d / 0.05); g.translate(cx, cy); g.scale(k, k); g.textAlign = 'center';
      g.font = '900 190px ' + SERIF; g.fillStyle = '#f6dfae'; g.shadowColor = 'rgba(240,180,80,0.85)'; g.shadowBlur = 40;
      if (g.letterSpacing !== undefined) g.letterSpacing = '24px'; g.fillText(c.word, 12, 60); if (g.letterSpacing !== undefined) g.letterSpacing = '0px'; g.restore();
      if (d < 0.6) { g.save(); g.globalAlpha = 1 - d / 0.6; g.strokeStyle = 'rgba(255,214,140,0.8)'; g.lineWidth = 3;
        for (var i = 0; i < 18; i++) { var an = i / 18 * 6.283, r0 = 230 + d * 520, r1 = r0 + 50 + 40 * rnd(i); g.beginPath(); g.moveTo(cx + Math.cos(an) * r0, cy + Math.sin(an) * r0 * 0.55); g.lineTo(cx + Math.cos(an) * r1, cy + Math.sin(an) * r1 * 0.55); g.stroke(); }
        g.restore(); }
      for (var i = 0; i < 60; i++) {           // embers thrown off by the slam
        var an = rnd(i + 3) * 6.283, sp = 80 + 380 * rnd(i + 7), dd = Math.min(d, 2.2), x = cx + Math.cos(an) * sp * eo(dd / 2.2), y = cy + Math.sin(an) * sp * 0.6 * eo(dd / 2.2) - 30 * dd;
        g.fillStyle = 'rgba(255,210,140,' + (0.8 * (1 - dd / 2.2)).toFixed(3) + ')'; g.fillRect(x, y, 2.5, 2.5);
      }
    }
    g.textAlign = 'center';
    g.globalAlpha = E((lt - 0.2) / 0.5); g.font = '700 30px ' + SERIF; g.fillStyle = 'rgba(240,200,130,0.85)'; if (g.letterSpacing !== undefined) g.letterSpacing = '10px'; g.fillText(c.n, cx + 5, cy - 150);
    g.globalAlpha = E((lt - 0.8) / 0.5) * 0.85; g.font = '500 26px ' + MONO; g.fillStyle = 'rgba(220,210,190,0.85)'; if (g.letterSpacing !== undefined) g.letterSpacing = '14px'; g.fillText(c.en, cx + 7, cy + 150);
    if (g.letterSpacing !== undefined) g.letterSpacing = '0px';
    var p = E((lt - 1.0) / 0.5); g.globalAlpha = p; g.font = '700 40px ' + SERIF; g.fillStyle = '#ece6da'; g.shadowColor = 'rgba(0,0,0,0.9)'; g.shadowBlur = 12;
    g.filter = p < 1 ? 'blur(' + ((1 - p) * 8).toFixed(1) + 'px)' : 'none'; g.fillText(c.line, cx, cy + 236); g.filter = 'none';
    g.restore();
  }
  var NODES = [['童', '早产的乡下孩子', '1642 · 伍尔斯索普'], ['书', '回头重读', '1664 · 《几何原本》'], ['光', '拆开阳光 · 掉落的月亮', '1666 · 1687《原理》'], ['律', '天上地上一套规则', '万有引力']];
  function recap(g, sc, lt) {
    var xs = [420, 790, 1160, 1530], y = 650;
    g.save(); var w = 1240 * eo((lt - 0.2) / (sc.ls[3] + 0.6));
    g.strokeStyle = 'rgba(240,189,92,0.6)'; g.lineWidth = 2; g.shadowColor = '#f0bd5c'; g.shadowBlur = 10; g.beginPath(); g.moveTo(360, y); g.lineTo(360 + w, y); g.stroke(); g.shadowBlur = 0;
    NODES.forEach(function (n, k) {
      var p = cl((lt - sc.ls[k] - 0.1) / 0.5); if (p <= 0) return; var x = xs[k];
      g.globalAlpha = p; g.fillStyle = '#f0bd5c'; g.shadowColor = '#f0bd5c'; g.shadowBlur = 16; g.beginPath(); g.arc(x, y, 9, 0, 6.29); g.fill(); g.shadowBlur = 0;
      g.strokeStyle = 'rgba(240,189,92,' + (0.8 * (1 - p)).toFixed(2) + ')'; g.beginPath(); g.arc(x, y, 9 + 40 * p, 0, 6.29); g.stroke();
      g.textAlign = 'center';
      g.font = '900 96px ' + SERIF; g.fillStyle = '#f6dfae'; g.shadowColor = 'rgba(240,180,80,0.7)'; g.shadowBlur = 24; g.fillText(n[0], x, y - 44); g.shadowBlur = 0;
      g.font = '700 28px ' + SERIF; g.fillStyle = '#ece6da'; g.fillText(n[1], x, y + 62);
      g.font = '500 20px ' + MONO; g.fillStyle = 'rgba(200,190,170,0.8)'; g.fillText(n[2], x, y + 98);
    });
    var tp = E((lt - sc.ls[3] - 1.6) / 0.8);
    if (tp > 0) { g.globalAlpha = tp; g.textAlign = 'center'; g.font = '900 54px ' + SERIF; g.fillStyle = '#ece6da'; g.shadowColor = 'rgba(0,0,0,0.9)'; g.shadowBlur = 14;
      var s1 = '从此，宇宙遵循他的', s2 = '方程', s3 = '运行', w1 = g.measureText(s1).width, w2 = g.measureText(s2).width, w3 = g.measureText(s3).width, x0 = 960 - (w1 + w2 + w3) / 2;
      g.textAlign = 'left'; g.fillText(s1, x0, 880); g.fillStyle = '#f0bd5c'; g.fillText(s2, x0 + w1, 880); g.fillStyle = '#ece6da'; g.fillText(s3, x0 + w1 + w2, 880); }
    g.restore();
  }
  function sources(g, sc, lt) {
    g.save(); g.textAlign = 'left';
    TL.src.forEach(function (s, k) {
      var p = E((lt - 0.2 - k * 0.12) / 0.4); if (p <= 0) return; var col = k < 5 ? 0 : 1, row = k % 5, x = 200 + col * 820, y = 360 + row * 112;
      g.globalAlpha = p; g.font = '700 28px ' + SERIF; g.fillStyle = '#ece6da'; g.fillText(s[0], x, y);
      g.font = '500 19px ' + MONO; g.fillStyle = 'rgba(190,195,205,0.75)'; g.fillText(s[1], x, y + 36);
      g.fillStyle = 'rgba(240,189,92,0.6)'; g.fillRect(x - 22, y - 22, 3, 60);
    });
    g.restore();
  }
  function drawScene(g, i, lt, alpha) {
    if (alpha <= 0) return; var sc = SCN[i];
    if (sc.k === 'chap') { g.save(); g.globalAlpha = alpha; chapCard(g, sc, lt, TL.chaps.filter(function (c) { return Math.abs(c.s - sc.s) < 0.01; })[0]); g.restore(); return; }
    if (sc.k === 'recap') { g.save(); g.globalAlpha = alpha; recap(g, sc, lt); g.restore(); return; }
    if (sc.k === 'src') { g.save(); g.globalAlpha = alpha; sources(g, sc, lt); g.restore(); return; }
    var L = oldScene(sc, lt); g.save(); g.setTransform(g.__base || g.getTransform()); g.globalAlpha = alpha; g.drawImage(L, 0, 0); g.restore();
  }
  window.SCENE = function (g, t) {
    var i = 0; for (var k = 0; k < SCN.length; k++) if (t >= SCN[k].s) i = k;
    var sc = SCN[i], lt = t - sc.s, X = (sc.k === 'chap' || (i > 0 && SCN[i - 1].k === 'chap')) ? 0.2 : 0.5;
    g.__base = g.getTransform();
    if (i > 0 && lt < X) { var p = E(lt / X); var pv = SCN[i - 1]; drawScene(g, i - 1, pv.e - pv.s, 1 - p); drawScene(g, i, lt, p); }
    else drawScene(g, i, lt, 1);
    // a soft scrim under the narration so it never fights with the picture
    var hasText = TL.groups.some(function (gr) { return t >= gr.s && t < gr.e; });
    if (hasText) { var sg = g.createRadialGradient(300, 160, 40, 300, 180, 820); sg.addColorStop(0, 'rgba(5,7,12,0.55)'); sg.addColorStop(1, 'rgba(5,7,12,0)'); g.fillStyle = sg; g.fillRect(-60, -60, 1300, 800); }
  };
})();
