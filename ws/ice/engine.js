(function () {
  var DUR = 300;
  var NAMES = ['开场', '章节 · 幽灵粒子', '第一幕 · 宇宙里最诚实的信使', '章节 · 冰下探测器', '第二幕 · 把冰变成探测器', '章节 · 第一批证据', '第三幕 · Bert 和 Ernie',
    '章节 · 第一个源头', '第四幕 · TXS 0506+056', '章节 · 新的星图', '第五幕 · NGC 1068', '第六幕 · 银河系', '章节 · 还在继续', '第七幕 · 诺贝尔奖与未来', '回头看', '资料来源'];
  // [scene index, start, end (seconds from the start of that scene), text]
  var RAW = [
    [0, 0, 4.2, '一个比电子还轻的粒子，能穿过整个地球。'],
    [0, 4.2, 8.1, '科学家把探测器埋进南极冰下，今年，它拿了诺贝尔物理学奖。'],
    [1, 0.45, 2.5, '先认识这位“幽灵”。'],
    [2, 0.3, 7, '中微子，是宇宙里数量最多的粒子之一。它比电子还轻，不带电。'],
    [2, 7, 14, '它几乎不和任何东西作用，穿过你的身体，穿过整个地球，都不留痕迹。'],
    [2, 14, 21, '这听起来是缺点，天文学家却把它当成宝贝：因为它是最诚实的信使。'],
    [2, 21, 27.5, '宇宙线带电，会被磁场带偏；光会被尘埃挡住；只有中微子，一路直线飞来。'],
    [2, 27.5, 31.4, '顺着它的方向找回去，就能找到宇宙里最剧烈的地方。'],
    [3, 0.45, 2.5, '可是，怎么抓住它？'],
    [4, 0.3, 8.2, '1988 年前后，威斯康星大学的哈尔岑想到一个大胆的主意：把南极的冰，当成探测器。'],
    [4, 8.2, 15.5, '中微子几乎不和物质作用，要抓到它，需要一大块透明又安静的材料。南极深处的冰，正合适。'],
    [4, 15.5, 22.5, '偶尔，有一个中微子撞上冰里的原子核，产生带电粒子。它们在冰里飞行，发出一道淡蓝色的光。'],
    [4, 22.5, 30.5, '埋在冰里的传感器，记下光到达的先后，电脑就能反推：中微子从哪个方向来，能量有多大。'],
    [4, 30.5, 40, '整个探测器有 86 根缆绳，5160 个光学传感器，埋在冰下 1450 到 2450 米，体积约一立方公里。'],
    [4, 40, 48.2, '2010 年 12 月，最后一根缆绳放进冰里。哈尔岑说，这是一场赌博：没人知道它会不会成功。'],
    [5, 0.45, 2.5, '它成功了吗？'],
    [6, 0.2, 7, '2013 年，IceCube 发表了第一批成果：在 2010 到 2012 年的数据里，挑出 28 个极高能的事件。'],
    [6, 7, 14, '其中两个，被昵称为 Bert 和 Ernie，是已报告的能量最高的中微子之一。'],
    [6, 14, 21, '这是首次有力证据：有中微子，来自太阳系之外。'],
    [6, 21, 27.1, '可它们散布在整个天空，不指向任何一个具体的天体。来源，成了新的谜。'],
    [7, 0.45, 2.5, '四年后，线索来了。'],
    [8, 0.3, 7.3, '2017 年 9 月 22 日，IceCube 发出警报：一个约 300 TeV 的高能中微子，约 300 万亿电子伏。'],
    [8, 7.3, 14.3, '警报发给了全世界的望远镜，约 20 台观测设备，随后转向同一片天空。'],
    [8, 14.3, 21.3, '费米卫星看到：同一个方向，一个叫 TXS 0506+056 的天体，正经历十年来最强的伽马射线耀发。'],
    [8, 21.3, 28, '它是约 40 亿光年外的耀变体：中心黑洞喷出的喷流，正好指向地球。'],
    [8, 28, 31.4, '宇宙线来源之谜，第一次有了线索。'],
    [9, 0.45, 2.5, '然后，是更多的星图。'],
    [10, 0.36, 7.5, '2022 年 11 月，第二个源头的证据：4700 万光年外的活动星系 NGC 1068。'],
    [10, 7.5, 15.5, '十年的数据里，从它的方向，多出了一批 1 TeV 以上的中微子，显著度 4.2σ。'],
    [10, 15.5, 22.5, '4.2σ 的意思是：偶然的概率很低，但还没到科学界通常要求的 5σ。'],
    [10, 22.5, 30.2, '奇怪的是，那里几乎看不到高能伽马射线。一种解释：源头被厚厚的物质包着，伽马射线出不来，中微子却能穿出。'],
    [11, 0.3, 7.3, '2023 年，IceCube 把目光转向自己的家：银河系。'],
    [11, 7.3, 15.5, '这次，研究者用深度神经网络，从“级联”事件里挑信号，灵敏度提高了约 3 到 4 倍。'],
    [11, 15.5, 23.5, '结果是 4.5σ：银河系的平面，也在发出高能中微子。'],
    [11, 23.5, 30.8, '这是第一次，人类用中微子“看见”了银河系。天文学，多了一扇新的窗。'],
    [12, 0.45, 2.5, '故事还没有结束。'],
    [13, 0.33, 8, '2026 年 10 月 6 日，诺贝尔物理学奖授予弗朗西斯·哈尔岑，表彰他对 IceCube 的决定性贡献。'],
    [13, 8, 16, '这是自 1992 年以来，第一次只有一个人独得物理学奖。'],
    [13, 16, 24, '他自己却说，这是一份迟来的认可，要交给这个约 450 人、来自 14 个国家的大合作组。'],
    [13, 24, 32, 'IceCube 的升级部分，在 2025 到 2026 年安装，今年晚些时候会出第一批数据。'],
    [13, 32, 40, '第二代 Gen2 的体积将是现在的约 8 倍，但它在 2023 年被搁置。有人认为，这个奖或许能让它重启。'],
    [13, 40, 46.4, '哈尔岑说：“科学，也就是天文学，还在后面。”'],
    [14, 0.3, 4, '回头看：一个想法，一块冰，'],
    [14, 4, 8, '一批幽灵粒子，一个又一个源头，'],
    [14, 8, 11.9, '最后变成了一门新的天文学。'],
    [15, 0.5, 17.9, '以上为公开报道和论文整理的科普内容，资料来源见画面。']
  ];

  var $ = function (id) { return document.getElementById(id); };
  var frame = $('frame');
  var sceneEls = Array.prototype.slice.call(document.querySelectorAll('.scene'));
  var DRAW = {};   // filled in below; canvases look their drawing function up by name
  var scenes = sceneEls.map(function (el) {
    var cv = el.querySelector('canvas.cv');
    return {
      el: el, s: +el.dataset.start, e: +el.dataset.end, cv: cv, g: cv ? cv.getContext('2d') : null,
      anims: Array.prototype.slice.call(el.querySelectorAll('[data-a]'))
    };
  });
  var LINES = RAW.map(function (l) { return [l[0], scenes[l[0]].s + l[1], scenes[l[0]].s + l[2], l[3]]; });
  var sub = $('sub'), seek = $('seek'), timeEl = $('time'), pp = $('pp'), bigplay = $('bigplay');
  var T = 0, playing = false, cur = -1, curLine = -2, lastW = 0, K = 10;

  function clamp(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function fmt(t) { t = Math.max(0, Math.floor(t)); return Math.floor(t / 60) + ':' + ('0' + (t % 60)).slice(-2); }

  // decorative dust for the chapter cards (seeded, so every card looks the same on every play)
  function rng(seed) {
    return function () {
      seed |= 0; seed = seed + 0x6D2B79F5 | 0;
      var t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  Array.prototype.forEach.call(document.querySelectorAll('.parts'), function (box, bi) {
    var r = rng(bi + 11);
    for (var k = 0; k < 44; k++) {
      var a = r() * Math.PI * 2, d = 10 + r() * 38;
      var i = document.createElement('i');
      i.style.setProperty('--dx', (Math.cos(a) * d).toFixed(1) + 'cqw');
      i.style.setProperty('--dy', (Math.sin(a) * d * 0.55).toFixed(1) + 'cqw');
      i.style.setProperty('--o', (0.35 + r() * 0.65).toFixed(2));
      i.style.setProperty('--s', (0.3 + r() * 0.5).toFixed(2) + 'cqw');
      if (k % 2) i.className = 'b';
      box.appendChild(i);
    }
  });

  // ================= drawing helpers (canvas units: 100 wide, 56.25 high = 1 cqw each) =================
  var TAU = Math.PI * 2;
  var SANS = '"Noto Sans SC","PingFang SC","Microsoft YaHei",sans-serif';
  var MONO = '"IBM Plex Mono",ui-monospace,Menlo,monospace';
  var GOLD = '#f2c66b', ICE = '#8fd0ff', FG = '#eef2f8', DIM = '#93a1b6', HOT = '#ff9d6e';
  function sm(a, b, x) { var t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); }
  function pr(lt, s, d) { return clamp((lt - s) / d); }
  function eo(p) { return 1 - Math.pow(1 - p, 3); }
  function mix(a, b, t) { return a + (b - a) * t; }
  function rgbm(c1, c2, t) { return 'rgb(' + Math.round(mix(c1[0], c2[0], t)) + ',' + Math.round(mix(c1[1], c2[1], t)) + ',' + Math.round(mix(c1[2], c2[2], t)) + ')'; }
  function tx(g, s, x, y, sz, col, al, wt, fam, a) {
    g.save(); if (a != null) g.globalAlpha *= a;
    g.fillStyle = col; g.font = (wt || 500) + ' ' + sz + 'px ' + (fam || SANS); g.textAlign = al || 'left'; g.textBaseline = 'middle';
    g.fillText(s, x, y); g.restore();
  }
  function ln(g, x1, y1, x2, y2, col, w, dash, a) {
    g.save(); if (a != null) g.globalAlpha *= a;
    g.strokeStyle = col; g.lineWidth = w; if (dash) g.setLineDash(dash);
    g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); g.restore();
  }
  function dot(g, x, y, r, col, a, glow) {
    g.save(); if (a != null) g.globalAlpha *= a;
    if (glow) { g.shadowColor = col; g.shadowBlur = glow * K; }
    g.fillStyle = col; g.beginPath(); g.arc(x, y, r, 0, TAU); g.fill(); g.restore();
  }
  function spring(g, x1, y1, x2, y2, n, amp, col, w) {
    var dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L, pad = 0.14;
    g.save(); g.strokeStyle = col; g.lineWidth = w; g.beginPath(); g.moveTo(x1, y1);
    g.lineTo(x1 + dx * pad, y1 + dy * pad);
    for (var i = 1; i <= n * 2; i++) {
      var f = pad + (1 - 2 * pad) * i / (n * 2), s = (i % 2 ? 1 : -1) * amp;
      g.lineTo(x1 + dx * f + nx * s, y1 + dy * f + ny * s);
    }
    g.lineTo(x2, y2); g.stroke(); g.restore();
  }
  function X(c, v) { return c.x0 + (c.x1 - c.x0) * v / c.xm; }
  function Y(c, v) { return c.y1 - (c.y1 - c.y0) * v / c.ym; }
  function axes(g, c, a, o) {
    g.save(); g.globalAlpha *= a;
    g.strokeStyle = 'rgba(190,210,235,0.4)'; g.lineWidth = 0.14; g.setLineDash([]);
    g.beginPath(); g.moveTo(c.x0, c.y0 - 1); g.lineTo(c.x0, c.y1); g.lineTo(c.x1 + 1, c.y1); g.stroke();
    (o.xt || []).forEach(function (t) { var x = X(c, t[0]); ln(g, x, c.y1, x, c.y1 + 0.6, 'rgba(190,210,235,0.4)', 0.12); tx(g, t[1], x, c.y1 + 1.9, 1.15, DIM, 'center', 400, MONO); });
    (o.yt || []).forEach(function (t) { var y = Y(c, t[0]); ln(g, c.x0 - 0.6, y, c.x0, y, 'rgba(190,210,235,0.4)', 0.12); tx(g, t[1], c.x0 - 1, y, 1.15, DIM, 'right', 400, MONO); });
    if (o.xl) tx(g, o.xl, c.x1, c.y1 + 4.1, 1.25, DIM, 'right', 500);
    if (o.yl) tx(g, o.yl, c.x0 - 1, c.y0 - 2.4, 1.25, DIM, 'left', 500);
    g.restore();
  }
  function curve(g, c, fn, v0, v1, col, w, dash, glow) {
    var n = Math.max(2, Math.round(Math.abs(v1 - v0) / c.xm * 140));
    g.save(); g.strokeStyle = col; g.lineWidth = w; if (dash) g.setLineDash(dash);
    if (glow) { g.shadowColor = col; g.shadowBlur = glow * K; }
    g.beginPath();
    for (var i = 0; i <= n; i++) {
      var v = v0 + (v1 - v0) * i / n, x = X(c, v), y = Y(c, fn(v));
      if (i) g.lineTo(x, y); else g.moveTo(x, y);
    }
    g.stroke(); g.restore();
  }

  // ---- physics functions (all in units of 3R) ----
  function einstein(t) {            // t = T / theta_E
    if (t <= 0.0001) return 0;
    var x = 1 / t; if (x > 60) return 0;
    var ex = Math.exp(x); return x * x * ex / ((ex - 1) * (ex - 1));
  }
  function debye(t) {               // t = T / theta_D
    if (t <= 0.0005) return 0;
    if (t < 0.04) return 4 * Math.pow(Math.PI, 4) / 5 * t * t * t;
    var xm = 1 / t, n = 120, h = xm / n, s = 0;
    for (var i = 0; i <= n; i++) {
      var x = i * h, f = 0;
      if (x > 0) { var e = Math.exp(x); f = x * x * x * x * e / ((e - 1) * (e - 1)); }
      s += (i === 0 || i === n ? 1 : (i % 2 ? 4 : 2)) * f;
    }
    return 3 * t * t * t * s * h / 3;
  }
  var R3 = 24.94;

  // ================= shared bits for the neutrino scenes =================
  var BLUE = '#8fd0ff', WHITEB = '#dff2ff';
  function glowLine(g, x1, y1, x2, y2, col, w, glow, a) {
    g.save(); if (a != null) g.globalAlpha *= a;
    g.strokeStyle = col; g.lineWidth = w; g.shadowColor = col; g.shadowBlur = glow * K;
    g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); g.restore();
  }
  function halo(g, x, y, r, col, a) {
    g.save(); g.globalAlpha *= a;
    var gr = g.createRadialGradient(x, y, 0, x, y, r);
    gr.addColorStop(0, col); gr.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = gr; g.beginPath(); g.arc(x, y, r, 0, TAU); g.fill(); g.restore();
  }
  function star5(g, x, y, r, col, a) { dot(g, x, y, r, col, a, 2.2); }
  function arrowHead(g, x, y, ang, s, col, a) {
    g.save(); g.globalAlpha *= a; g.translate(x, y); g.rotate(ang); g.fillStyle = col;
    g.beginPath(); g.moveTo(s, 0); g.lineTo(-s * 0.7, -s * 0.55); g.lineTo(-s * 0.7, s * 0.55); g.closePath(); g.fill(); g.restore();
  }

  // ================= scene 0: neutrinos fall through the ice, one of them hits =================
  var NU0 = (function () { var r = rng(3), a = []; for (var i = 0; i < 16; i++) a.push([r(), 0.5 + r() * 0.9, 6 + r() * 6, r() * 40 - 10]); return a; })();
  function ice0y(x) { return 15.7 + 0.34 * x; }
  DRAW.d0 = function (g, lt) {
    var i, j, ia = eo(pr(lt, 0.2, 1.2));
    g.save(); g.globalAlpha = ia;
    var gr = g.createLinearGradient(0, 31, 0, 56.25);
    gr.addColorStop(0, 'rgba(143,208,255,0.26)'); gr.addColorStop(1, 'rgba(143,208,255,0.05)');
    g.fillStyle = gr; g.fillRect(0, 31, 100, 25.25);
    ln(g, 0, 31, 100, 31, 'rgba(200,230,255,0.75)', 0.18);
    tx(g, '南极冰层', 94, 29.2, 1.25, DIM, 'right', 500, SANS);
    for (i = 0; i < 11; i++) {
      var sx = 17 + i * 6.6;
      ln(g, sx, 31, sx, 45, 'rgba(190,210,235,0.22)', 0.1);
    }
    g.restore();
    // sensors on the strings
    var hitT = 5.2, Px = 64, Py = ice0y(Px);
    for (i = 0; i < 11; i++) {
      var sx2 = 17 + i * 6.6;
      for (j = 0; j < 9; j++) {
        var sy = 34.4 + j * 1.2, lit = 0;
        if (lt > hitT) {
          var dist = Math.abs(sy - ice0y(sx2)), tl = lt - (hitT + 0.12 + Math.abs(sx2 - Px) / 34 * 1.2 + dist * 0.05);
          if (dist < 4.2 && tl > 0) lit = Math.exp(-tl * 1.3) * (1 - dist / 4.8);
        }
        dot(g, sx2, sy, 0.3 + lit * 0.5, lit > 0.05 ? WHITEB : 'rgba(190,210,235,0.5)', ia * (0.5 + lit * 0.5), lit * 3);
      }
    }
    // background neutrinos: faint streaks that pass through everything
    g.save(); g.globalAlpha = 0.5 * eo(pr(lt, 0.4, 1));
    NU0.forEach(function (n) {
      var s = ((lt * 0.045 * n[1] + n[0]) % 1), x = -8 + s * 120 + n[3] * 0, y = ice0y(x) + (n[3] - 8) * 1.4;
      glowLine(g, x - n[2], y - n[2] * 0.34, x, y, 'rgba(143,208,255,0.55)', 0.12, 0.8);
    });
    g.restore();
    // the neutrino that hits
    var ph = eo(pr(lt, 2.8, 2.4));
    if (ph > 0 && lt < hitT + 0.05) {
      var hx = -6 + (Px + 6) * ph;
      glowLine(g, hx - 12, ice0y(hx - 12), hx, ice0y(hx), '#ffffff', 0.3, 2.5);
      dot(g, hx, ice0y(hx), 0.55, '#ffffff', 1, 3);
    }
    if (lt > hitT) {
      var q = lt - hitT, fl = clamp(1 - q / 1.0);
      if (fl > 0) {
        g.save(); g.globalAlpha = fl; g.strokeStyle = '#fff'; g.lineWidth = 0.25;
        g.beginPath(); g.arc(Px, Py, 0.5 + q * 7, 0, TAU); g.stroke(); g.restore();
        halo(g, Px, Py, 6, 'rgba(255,255,255,0.7)', fl);
      }
      var tp = eo(pr(lt, hitT, 1.3)), ex = Px + 33 * tp;
      glowLine(g, Px, Py, ex, ice0y(ex), BLUE, 0.45, 2.5, clamp(1 - (lt - hitT - 1.5) / 3) * 1);
      tx(g, '撞上一个原子核', Px + 1.6, Py + 4.6, 1.5, GOLD, 'left', 700, SANS, eo(pr(lt, hitT + 0.2, 0.5)));
    }
  };

  // ================= scene 1: neutrinos through the Earth, then three kinds of messengers =================
  var ZIG = (function () { var r = rng(9), a = [0]; for (var i = 1; i <= 20; i++) a.push((r() - 0.5) * 6.4); return a; })();
  DRAW.d1 = function (g, lt) {
    var i;
    var aA = eo(pr(lt, 0.4, 0.9)) * (1 - eo(pr(lt, 13.2, 0.9)));
    if (aA > 0) {
      g.save(); g.globalAlpha = aA;
      var ecx = 74, ecy = 28, er = 12.5;
      var eg = g.createRadialGradient(ecx - 3, ecy - 3, 1, ecx, ecy, er);
      eg.addColorStop(0, '#2b5a8a'); eg.addColorStop(1, '#0d2038');
      g.fillStyle = eg; g.beginPath(); g.arc(ecx, ecy, er, 0, TAU); g.fill();
      g.strokeStyle = 'rgba(143,208,255,0.6)'; g.lineWidth = 0.18; g.stroke();
      g.strokeStyle = 'rgba(143,208,255,0.18)'; g.lineWidth = 0.1;
      for (i = -2; i <= 2; i++) { g.beginPath(); g.ellipse(ecx, ecy, er, er * 0.28 * Math.abs(i) / 2 + 0.01, 0, 0, TAU); g.stroke(); }
      for (i = 0; i < 22; i++) {
        var s = ((lt * 0.14 + i * 0.137) % 1), off = (i % 11 - 5) * 2.3 + (i > 10 ? 1 : 0);
        var x = 38 + s * 70, y = 6 + s * 36 + off * 0.9 - 6;
        glowLine(g, x - 4.5, y - 3.1, x, y, 'rgba(223,242,255,0.8)', 0.12, 1);
      }
      g.restore();
      tx(g, '中微子', 7, 15.8, 5.4, GOLD, 'left', 900, SANS, eo(pr(lt, 0.5, 0.8)) * aA);
      tx(g, '比电子还轻 · 不带电', 7.3, 22.6, 2.2, FG, 'left', 500, SANS, eo(pr(lt, 2, 0.8)) * aA);
      tx(g, '几乎不和任何东西作用', 7.3, 28.6, 2.2, FG, 'left', 500, SANS, eo(pr(lt, 7.4, 0.8)) * aA);
      tx(g, '穿过你的身体，穿过整个地球', 7.3, 33.2, 2.2, BLUE, 'left', 700, SANS, eo(pr(lt, 9, 0.8)) * aA);
    }
    var aB = eo(pr(lt, 14, 0.8));
    if (aB <= 0) return;
    var Ls = [20, 30.5, 41], sxs = 13, exs = 89;
    for (i = 0; i < 3; i++) {
      dot(g, sxs, Ls[i], 1.1, GOLD, aB, 3); dot(g, exs, Ls[i], 1.1, BLUE, aB, 2);
      ln(g, sxs + 1, Ls[i], exs - 1, Ls[i], 'rgba(190,210,235,0.12)', 0.1, [0.5, 0.6], aB);
    }
    tx(g, '宇宙线：带电，会被磁场带偏，认不出来源', sxs, Ls[0] - 3.2, 1.8, GOLD, 'left', 700, SANS, eo(pr(lt, 20.6, 0.6)));
    tx(g, '光：会被尘埃挡住', sxs, Ls[1] - 3.2, 1.8, GOLD, 'left', 700, SANS, eo(pr(lt, 23.3, 0.6)));
    tx(g, '中微子：不带电，不被挡，直线飞来', sxs, Ls[2] - 3.2, 1.8, BLUE, 'left', 700, SANS, eo(pr(lt, 25.3, 0.6)));
    // cosmic ray: random walk
    var pc = eo(pr(lt, 21, 2.5));
    if (pc > 0) {
      g.save(); g.strokeStyle = HOT; g.lineWidth = 0.28; g.shadowColor = HOT; g.shadowBlur = 1.2 * K; g.beginPath();
      var n = Math.floor(20 * pc);
      for (i = 0; i <= n; i++) { var xx = sxs + 1 + (exs - sxs - 2) * i / 20, yy = Ls[0] + ZIG[i] * (i === 20 ? 0.4 : 1); if (i) g.lineTo(xx, yy); else g.moveTo(xx, yy); }
      g.stroke(); g.restore();
    }
    // dust cloud + light
    var cl = eo(pr(lt, 22.8, 0.8));
    if (cl > 0) {
      for (i = 0; i < 7; i++) halo(g, 48 + (i % 4) * 3.2 - 4, Ls[1] + ((i * 7) % 5 - 2) * 1.1, 4.6, 'rgba(160,130,110,0.55)', cl * 0.8);
    }
    var pl = eo(pr(lt, 23.6, 1.8));
    if (pl > 0) {
      var xe = sxs + 1 + (44 - sxs) * pl;
      glowLine(g, sxs + 1, Ls[1], xe, Ls[1], '#fff3cf', 0.3, 1.5, 1 - 0.7 * eo(pr(lt, 25.4, 0.8)));
      if (pl > 0.98) tx(g, '×', 45.2, Ls[1], 2.4, HOT, 'center', 900, SANS, eo(pr(lt, 25.4, 0.4)));
    }
    var pn = eo(pr(lt, 25.5, 2.4));
    if (pn > 0) {
      var xn = sxs + 1 + (exs - sxs - 2) * pn;
      glowLine(g, sxs + 1, Ls[2], xn, Ls[2], BLUE, 0.4, 2.5);
      if (pn > 0.97) arrowHead(g, exs - 1.2, Ls[2], 0, 1.6, BLUE, 1);
    }
    var back = eo(pr(lt, 28.3, 1.6));
    if (back > 0) {
      var pulse = 0.5 + 0.5 * Math.sin(lt * 5);
      halo(g, sxs, Ls[2], 5 + 1.5 * pulse, 'rgba(242,198,107,0.8)', back);
      tx(g, '顺着直线找回去', 51, Ls[2] + 3.2, 1.7, GOLD, 'center', 700, SANS, back);
    }
  };

  // ================= scene 2: the ice becomes a detector =================
  var BX0 = 6, BX1 = 86, BY0 = 17, BY1 = 44;
  var SENS = (function () { var r = rng(33), a = []; for (var i = 0; i < 12; i++) a.push([30 + r() * 44, 22 + r() * 18]); return a; })();
  DRAW.d2 = function (g, lt) {
    var i, j, ba = eo(pr(lt, 0.8, 1.4));
    g.save(); g.globalAlpha = ba;
    var gr = g.createLinearGradient(0, BY0, 0, BY1);
    gr.addColorStop(0, 'rgba(160,215,255,0.28)'); gr.addColorStop(1, 'rgba(160,215,255,0.07)');
    g.fillStyle = gr; g.fillRect(BX0, BY0, BX1 - BX0, BY1 - BY0);
    g.strokeStyle = 'rgba(200,230,255,0.45)'; g.lineWidth = 0.14; g.strokeRect(BX0, BY0, BX1 - BX0, BY1 - BY0);
    ln(g, BX0 - 2, BY0, BX1 + 2, BY0, 'rgba(230,245,255,0.8)', 0.22);
    tx(g, '冰面', BX0 + 0.8, BY0 - 1.4, 1.3, DIM, 'left', 500, SANS);
    g.restore();
    // chips: transparent, quiet, stable
    var chips = [['透明', 24, 9], ['安静', 46, 10.4], ['稳定', 68, 11.8]];
    var chipFade = 1 - eo(pr(lt, 14.4, 0.6));
    chips.forEach(function (c) {
      var a = eo(pr(lt, c[2], 0.6)) * chipFade; if (a <= 0) return;
      g.save(); g.globalAlpha = a; g.strokeStyle = 'rgba(143,208,255,0.7)'; g.lineWidth = 0.18;
      g.beginPath(); g.arc(c[1], 30.5, 5.2, 0, TAU); g.stroke(); g.restore();
      tx(g, c[0], c[1], 30.6, 2.6, FG, 'center', 900, SANS, a);
    });
    // the mechanism
    var ma = eo(pr(lt, 15.2, 0.7)) * (1 - eo(pr(lt, 30.6, 1)));
    if (ma > 0) {
      var P = [38, 27], E2 = [72, 41], dx = E2[0] - P[0], dy = E2[1] - P[1];
      g.save(); g.globalAlpha = ma;
      var pin = eo(pr(lt, 15.6, 1.6));
      // approach line from top-left
      var ap0 = [20, 18.2];
      glowLine(g, ap0[0], ap0[1], ap0[0] + (P[0] - ap0[0]) * pin, ap0[1] + (P[1] - ap0[1]) * pin, '#fff', 0.3, 2);
      var hf = clamp(1 - (lt - 17.4) / 1.2);
      if (lt > 17.2 && hf > 0) halo(g, P[0], P[1], 5.5, 'rgba(255,255,255,0.8)', hf);
      var tp = eo(pr(lt, 17.4, 2));
      var tx2 = P[0] + dx * tp, ty2 = P[1] + dy * tp;
      if (lt > 17.4) {
        glowLine(g, P[0], P[1], tx2, ty2, BLUE, 0.4, 2);
        // Cherenkov cone: short blue strokes fanning back from the track
        var ca = eo(pr(lt, 19.6, 1));
        if (ca > 0) {
          g.save(); g.globalAlpha = ca * 0.9; g.strokeStyle = 'rgba(120,200,255,0.8)'; g.lineWidth = 0.16; g.shadowColor = BLUE; g.shadowBlur = 1.2 * K;
          var ang = Math.atan2(dy, dx);
          for (i = 1; i <= 7; i++) {
            var f = i / 8, bx = P[0] + dx * f * tp, by = P[1] + dy * f * tp;
            [1, -1].forEach(function (sg) { g.beginPath(); g.moveTo(bx, by); g.lineTo(bx - Math.cos(ang - sg * 0.72) * 5.5, by - Math.sin(ang - sg * 0.72) * 5.5); g.stroke(); });
          }
          g.restore();
        }
      }
      // sensors
      SENS.forEach(function (s, k) {
        var d = Math.abs((s[1] - P[1]) * dx - (s[0] - P[0]) * dy) / Math.hypot(dx, dy);
        var along = ((s[0] - P[0]) * dx + (s[1] - P[1]) * dy) / Math.hypot(dx, dy) / Math.hypot(dx, dy);
        var lit = 0;
        if (d < 8 && along > -0.2 && along < 1.1) { var tl = lt - (20 + along * 2 + d * 0.06); if (tl > 0) lit = Math.min(1, tl * 3) * (0.5 + 0.5 * Math.exp(-tl * 0.2)); }
        dot(g, s[0], s[1], 0.55 + 0.5 * lit, lit > 0.05 ? WHITEB : 'rgba(190,210,235,0.55)', 1, lit * 3.5);
      });
      g.restore();
      tx(g, '① 撞上原子核', P[0] + 2.4, P[1] - 3.2, 1.6, GOLD, 'left', 700, SANS, eo(pr(lt, 17.2, 0.5)) * ma);
      tx(g, '② 带电粒子飞行', 54, 31.6, 1.6, BLUE, 'left', 700, SANS, eo(pr(lt, 18.2, 0.5)) * ma);
      tx(g, '③ 发出淡蓝色的光', 21, 38.4, 1.6, BLUE, 'left', 700, SANS, eo(pr(lt, 19.6, 0.5)) * ma);
      tx(g, '④ 传感器记下光到达的时间', 52, 42, 1.6, WHITEB, 'left', 700, SANS, eo(pr(lt, 23, 0.5)) * ma);
    }
    // the real detector: 86 strings of 60 sensors
    var da = eo(pr(lt, 30.8, 1));
    if (da > 0) {
      var ns = 14;
      for (i = 0; i < ns; i++) {
        var sa = eo(pr(lt, 31 + i * 0.12, 0.6));
        var sx = 11 + i * 5.7;
        g.save(); g.globalAlpha = sa;
        ln(g, sx, BY0 + 1, sx, BY1 - 1, 'rgba(190,210,235,0.28)', 0.1);
        for (j = 0; j < 20; j++) dot(g, sx, 20.4 + j * 1.14, 0.26, 'rgba(223,242,255,0.85)', 1);
        g.restore();
      }
      var ra = eo(pr(lt, 33, 0.8));
      ln(g, BX1 + 1.6, 20.4, BX1 + 1.6, 42, GOLD, 0.2, null, ra);
      tx(g, '1450 m', BX1 + 2.6, 20.4, 1.35, GOLD, 'left', 500, MONO, ra);
      tx(g, '2450 m', BX1 + 2.6, 42, 1.35, GOLD, 'left', 500, MONO, ra);
      tx(g, '≈ 1 公里', BX1 + 2.6, 31.2, 1.5, GOLD, 'left', 700, SANS, ra);
    }
    var done = eo(pr(lt, 40.4, 0.8));
    if (done > 0) {
      g.save(); g.globalAlpha = done;
      g.fillStyle = 'rgba(6,8,13,0.72)'; g.fillRect(31, 25, 34, 9);
      g.strokeStyle = GOLD; g.lineWidth = 0.2; g.strokeRect(31, 25, 34, 9); g.restore();
      tx(g, '2010 年 12 月', 48, 28, 2.5, GOLD, 'center', 900, SANS, done);
      tx(g, '最后一根缆绳放进冰里', 48, 32, 1.8, FG, 'center', 500, SANS, done);
    }
  };

  // ================= scene 3: 28 events, Bert and Ernie =================
  var SKY = { cx: 63, cy: 28, rx: 29, ry: 15 };
  var EV = (function () {
    var r = rng(44), a = [];
    for (var i = 0; i < 28; i++) { var t = r() * TAU, u = Math.sqrt(r()); a.push([SKY.cx + Math.cos(t) * u * SKY.rx * 0.95, SKY.cy + Math.sin(t) * u * SKY.ry * 0.95]); }
    return a;
  })();
  DRAW.d3 = function (g, lt) {
    var i, sa = eo(pr(lt, 2, 1.2));
    g.save(); g.globalAlpha = sa; g.strokeStyle = 'rgba(190,210,235,0.45)'; g.lineWidth = 0.16;
    g.beginPath(); g.ellipse(SKY.cx, SKY.cy, SKY.rx, SKY.ry, 0, 0, TAU); g.stroke();
    g.strokeStyle = 'rgba(190,210,235,0.16)'; g.lineWidth = 0.1;
    for (i = -2; i <= 2; i++) { g.beginPath(); g.ellipse(SKY.cx, SKY.cy, SKY.rx * Math.cos(i * 0.5), SKY.ry, 0, 0, TAU); g.stroke(); }
    [-0.5, 0, 0.5].forEach(function (f) { ln(g, SKY.cx - SKY.rx * Math.sqrt(1 - f * f), SKY.cy + SKY.ry * f, SKY.cx + SKY.rx * Math.sqrt(1 - f * f), SKY.cy + SKY.ry * f, 'rgba(190,210,235,0.16)', 0.1); });
    g.restore();
    for (i = 0; i < 28; i++) {
      var a = eo(pr(lt, 6.4 + i * 0.22, 0.5));
      if (a <= 0) continue;
      var isB = i === 5, isE = i === 19;
      var hl = (isB || isE) ? eo(pr(lt, 10.4 + (isE ? 1.4 : 0), 0.8)) : 0;
      dot(g, EV[i][0], EV[i][1], 0.5 + a * 0.15 + hl * 0.5, hl > 0 ? GOLD : BLUE, a, 2.4 + hl * 2);
      if (hl > 0) {
        halo(g, EV[i][0], EV[i][1], 4, 'rgba(242,198,107,0.55)', hl * (0.7 + 0.3 * Math.sin(lt * 4)));
        tx(g, isB ? 'Bert' : 'Ernie', EV[i][0], EV[i][1] - 2.9, 2, GOLD, 'center', 900, MONO, hl);
      }
    }
    var so = eo(pr(lt, 21.2, 0.8));
    if (so > 0) {
      g.save(); g.globalAlpha = so * (0.4 + 0.3 * Math.sin(lt * 3)); g.strokeStyle = HOT; g.lineWidth = 0.2; g.setLineDash([0.7, 0.6]);
      g.beginPath(); g.ellipse(SKY.cx, SKY.cy, SKY.rx + 1.6, SKY.ry + 1.6, 0, 0, TAU); g.stroke(); g.restore();
      tx(g, '散布各处，不指向任何天体', SKY.cx, SKY.cy - SKY.ry - 3.4, 1.8, HOT, 'center', 700, SANS, so);
    }
    var ex = eo(pr(lt, 14.2, 0.8));
    if (ex > 0) tx(g, '来自太阳系之外', 22, 38.4, 2.4, BLUE, 'left', 900, SANS, ex);
  };

  // ================= scene 4: 22 Sep 2017, a blazar =================
  var TLS = (function () { var r = rng(7), a = []; for (var i = 0; i < 20; i++) a.push(r()); return a; })();
  DRAW.d4 = function (g, lt) {
    var i, ya = eo(pr(lt, 0.4, 0.9));
    var Sx = 36, Sy = 31, Ex = 90;
    // jets
    var ja = eo(pr(lt, 21.4, 1.6));
    if (ja > 0) {
      g.save(); g.globalAlpha = ja * 0.9;
      var jg = g.createLinearGradient(Sx, 0, Ex - 5, 0); jg.addColorStop(0, 'rgba(255,230,170,0.65)'); jg.addColorStop(1, 'rgba(255,230,170,0)');
      g.fillStyle = jg; g.beginPath(); g.moveTo(Sx, Sy); g.lineTo(Ex - 4, Sy - 3.6); g.lineTo(Ex - 4, Sy + 3.6); g.closePath(); g.fill();
      var jg2 = g.createLinearGradient(Sx, 0, 10, 0); jg2.addColorStop(0, 'rgba(255,230,170,0.5)'); jg2.addColorStop(1, 'rgba(255,230,170,0)');
      g.fillStyle = jg2; g.beginPath(); g.moveTo(Sx, Sy); g.lineTo(14, Sy - 2.6); g.lineTo(14, Sy + 2.6); g.closePath(); g.fill();
      g.restore();
    }
    var sa = eo(pr(lt, 0.8, 0.9));
    halo(g, Sx, Sy, 4 + 0.6 * Math.sin(lt * 3), 'rgba(242,198,107,0.9)', sa * (0.5 + 0.5 * eo(pr(lt, 14.5, 1))));
    dot(g, Sx, Sy, 1.1, '#fff3cf', sa, 3);
    tx(g, 'TXS 0506+056', Sx, Sy + 4.6, 1.6, GOLD, 'center', 700, MONO, eo(pr(lt, 14.8, 0.7)));
    tx(g, '约 40 亿光年', Sx, Sy + 7, 1.5, DIM, 'center', 500, SANS, eo(pr(lt, 21.8, 0.7)));
    // Earth
    dot(g, Ex, Sy, 1.8, '#4e8fc9', sa, 2); tx(g, '地球', Ex, Sy + 4.2, 1.4, DIM, 'center', 500, SANS, sa);
    // neutrino travelling
    var pn = pr(lt, 1.4, 3.2);
    if (pn > 0) {
      var nx = Sx + (Ex - 3 - Sx) * eo(pn);
      glowLine(g, Math.max(Sx, nx - 14), Sy, nx, Sy, '#ffffff', 0.34, 2.5, 1 - 0.7 * eo(pr(lt, 5, 1)));
      if (pn > 0.99) { var fl = clamp(1 - (lt - 4.6) / 1.2); halo(g, Ex, Sy, 5, 'rgba(255,255,255,0.85)', fl); }
    }
    tx(g, '中微子警报', Ex - 1, Sy - 4.4, 1.6, WHITEB, 'center', 700, SANS, eo(pr(lt, 4.4, 0.6)));
    // telescopes
    var ta = eo(pr(lt, 7.4, 0.8));
    if (ta > 0) {
      tx(g, '约 20 台望远镜 / 观测设备', 50, 40.4, 1.7, BLUE, 'center', 700, SANS, ta);
      for (i = 0; i < 20; i++) {
        var a = eo(pr(lt, 8 + i * 0.25, 0.4)), x = 28 + i * 2.2, lit = 0.5 + 0.5 * Math.sin(lt * 3 + i);
        g.save(); g.globalAlpha = a; g.fillStyle = BLUE; g.shadowColor = BLUE; g.shadowBlur = lit * 1.5 * K;
        g.fillRect(x - 0.6, 43, 1.2, 1.6); g.restore();
      }
    }
  };

  // ================= scene 5: NGC 1068, a source wrapped in matter =================
  var GAL = (function () { var r = rng(61), a = []; for (var i = 0; i < 240; i++) { var t = r() * TAU, d = Math.pow(r(), 0.7); a.push([Math.cos(t) * d, Math.sin(t) * d, 0.12 + r() * 0.22]); } return a; })();
  DRAW.d5 = function (g, lt) {
    var cx = 30, cy = 31, i, ga = eo(pr(lt, 0.8, 1.4));
    g.save(); g.globalAlpha = ga;
    halo(g, cx, cy, 14, 'rgba(143,170,255,0.18)', 1);
    GAL.forEach(function (p) {
      var x = cx + p[0] * 19, y = cy + p[1] * 6.5, c = 1 - Math.hypot(p[0], p[1]);
      dot(g, x, y, p[2] * 0.8, c > 0.55 ? '#ffe3a8' : '#cfdcff', 0.35 + c * 0.55);
    });
    g.restore();
    // dense cloud around the core
    var ca = eo(pr(lt, 22.2, 1.2));
    if (ca > 0) {
      g.save(); g.globalAlpha = ca * 0.9; g.strokeStyle = 'rgba(190,150,120,0.85)'; g.lineWidth = 1.8; g.shadowColor = 'rgba(190,150,120,0.8)'; g.shadowBlur = 1.5 * K;
      g.beginPath(); g.ellipse(cx, cy, 4.4, 4.4, 0, 0, TAU); g.stroke(); g.restore();
      tx(g, '厚厚的物质', cx, cy - 8.2, 1.6, HOT, 'center', 700, SANS, ca);
    }
    dot(g, cx, cy, 0.9, '#fff', ga, 4);
    var Ex = 92;
    dot(g, Ex, cy, 1.5, '#4e8fc9', ga, 2); tx(g, '地球', Ex, cy + 3.8, 1.4, DIM, 'center', 500, SANS, ga);
    // neutrinos stream out
    var ns = eo(pr(lt, 7.5, 1));
    if (ns > 0) {
      for (i = 0; i < 9; i++) {
        var s = (lt * 0.28 + i * 0.113) % 1, x = cx + 5 + s * (Ex - cx - 8), y = cy + (i - 4) * 0.16 * (x - cx) * 0.35;
        glowLine(g, x - 4, y - (i - 4) * 0.02, x, y, BLUE, 0.22, 1.6, ns);
      }
      tx(g, '中微子：穿出来', 62, 25.6, 1.9, BLUE, 'center', 700, SANS, eo(pr(lt, 22.9, 0.7)));
    }
    // gamma rays are stopped
    var gs = eo(pr(lt, 22.5, 0.8));
    if (gs > 0) {
      for (i = 0; i < 6; i++) {
        var a = i * 0.9 + 0.3, f = (lt * 0.5 + i * 0.17) % 1;
        var r0 = 4.4 + 5.5 * f, op = 1 - f;
        glowLine(g, cx + Math.cos(a) * 4.4, cy + Math.sin(a) * 4.4, cx + Math.cos(a) * r0, cy + Math.sin(a) * r0, GOLD, 0.2, 1, gs * op);
      }
      tx(g, '伽马射线：出不来', cx, cy + 10.6, 1.9, GOLD, 'center', 700, SANS, eo(pr(lt, 23.5, 0.7)));
    }
    // sigma scale
    var sc = eo(pr(lt, 15.6, 1));
    if (sc > 0) {
      var x0 = 56, x1 = 92, y = 40.2, f2 = (t) => x0 + (x1 - x0) * t / 6;
      g.save(); g.globalAlpha = sc;
      ln(g, x0, y, x1, y, 'rgba(190,210,235,0.4)', 0.14);
      [0, 1, 2, 3, 4, 5, 6].forEach(function (t) { ln(g, f2(t), y - 0.5, f2(t), y + 0.5, 'rgba(190,210,235,0.5)', 0.12); tx(g, t + 'σ', f2(t), y + 2.2, 1.2, DIM, 'center', 400, MONO); });
      g.restore();
      var m1 = eo(pr(lt, 16, 0.8)); dot(g, f2(4.2), y, 0.9, GOLD, m1, 3); tx(g, 'NGC 1068 · 4.2σ', f2(4.2) + 1.6, y - 2.4, 1.4, GOLD, 'right', 700, MONO, m1);
      var m2 = eo(pr(lt, 18.4, 0.8)); ln(g, f2(5), y - 3.6, f2(5), y + 0.2, HOT, 0.2, [0.4, 0.4], m2); tx(g, '5σ', f2(5), y - 4.4, 1.3, HOT, 'center', 700, MONO, m2);
    }
  };

  // ================= scene 6: the Milky Way in neutrinos =================
  var MWP = (function () { var r = rng(77), a = []; for (var i = 0; i < 700; i++) { var u = r() * 2 - 1, v = (r() + r() + r() - 1.5) / 1.5; a.push([u, v, r()]); } return a; })();
  var MS = { cx: 50, cy: 28.5, rx: 40, ry: 15 };
  function mwBand(u) { return 0.22 * Math.sin(u * 3.1 + 0.4); }
  DRAW.d6 = function (g, lt) {
    var i, sa = eo(pr(lt, 1, 1.2));
    g.save(); g.globalAlpha = sa; g.strokeStyle = 'rgba(190,210,235,0.4)'; g.lineWidth = 0.16;
    g.beginPath(); g.ellipse(MS.cx, MS.cy, MS.rx, MS.ry, 0, 0, TAU); g.stroke(); g.restore();
    // background neutrinos
    g.save(); g.globalAlpha = sa;
    for (i = 0; i < 140; i++) {
      var r0 = rng(i * 13 + 5), t = r0() * TAU, d = Math.sqrt(r0());
      dot(g, MS.cx + Math.cos(t) * d * MS.rx * 0.97, MS.cy + Math.sin(t) * d * MS.ry * 0.97, 0.16, 'rgba(190,210,235,0.5)', 1);
    }
    g.restore();
    // the galactic plane
    var gp = eo(pr(lt, 15.6, 3.5));
    if (gp > 0) {
      var cnt = Math.floor(MWP.length * gp);
      g.save(); g.globalAlpha = 1;
      for (i = 0; i < cnt; i++) {
        var p = MWP[i], u = p[0] * 0.96, y = mwBand(u) + p[1] * 0.2;
        var x = MS.cx + u * MS.rx * Math.sqrt(Math.max(0, 1 - y * y * 0.8)), yy = MS.cy + y * MS.ry * 1.7;
        if (Math.hypot((x - MS.cx) / MS.rx, (yy - MS.cy) / MS.ry) > 0.97) continue;
        dot(g, x, yy, 0.2 + p[2] * 0.22, p[2] > 0.5 ? '#bfe4ff' : '#ffe3a8', 0.45 + 0.5 * (1 - Math.abs(p[1])));
      }
      g.restore();
      halo(g, MS.cx, MS.cy + mwBand(0) * MS.ry * 1.7, 12, 'rgba(143,208,255,0.22)', gp);
      tx(g, '银河系平面', MS.cx - 24, MS.cy + 9.4, 1.8, BLUE, 'center', 700, SANS, eo(pr(lt, 19.2, 0.8)));
    }
    var nn = eo(pr(lt, 7.4, 0.8)) * (1 - eo(pr(lt, 15.5, 0.6)));
    if (nn > 0) {
      var nets = [[24, 14], [50, 8], [76, 14]];
      g.save(); g.globalAlpha = nn;
      tx(g, '深度神经网络', 50, 42.4, 1.8, GOLD, 'center', 700, SANS);
      for (i = 0; i < 3; i++) for (var j = 0; j < 3; j++) { ln(g, 44 + i * 6, 38.4, 44 + j * 6, 36.4, 'rgba(242,198,107,0.4)', 0.1); }
      for (i = 0; i < 3; i++) { dot(g, 44 + i * 6, 38.4, 0.5, GOLD, 1, 2); dot(g, 44 + i * 6, 36.4, 0.5, GOLD, 1, 2); }
      g.restore();
    }
  };

  // ================= scene 7: the prize, the collaboration, the future =================
  var RING = (function () { var r = rng(88), a = []; for (var i = 0; i < 58; i++) a.push([i / 58 * TAU + r() * 0.05, 11 + (i % 3) * 1.8 + r() * 0.8, i % 14]); return a; })();
  var CCOL = ['#8fd0ff', '#f2c66b', '#ff9d6e', '#a7e8b8', '#d5b7ff', '#ffd1e0', '#9fd3ff', '#ffe08a', '#ffb98a', '#b8f0e0', '#c9c2ff', '#ffc8a8', '#a0e0ff', '#ffe9a8'];
  DRAW.d7 = function (g, lt) {
    var i, rcx = 72, rcy = 27;
    var s0 = eo(pr(lt, 0.8, 1)) * (1 - eo(pr(lt, 15.6, 0.8)));
    if (s0 > 0) {
      var ph = (lt / 3.4) % 1, hx = 54 + 36 * ph, hy = 11 + 30 * ph;
      for (i = 0; i < 26; i++) {
        var sy = 11 + i * 1.2, sxx = 72, d = Math.hypot(hx - sxx, hy - sy), lit = Math.exp(-d * d / 14) * (ph > 0.15 && ph < 0.92 ? 1 : 0);
        dot(g, sxx, sy, 0.3 + lit * 0.45, lit > 0.08 ? WHITEB : 'rgba(190,210,235,0.5)', s0 * (0.55 + lit * 0.45), lit * 3);
      }
      ln(g, 72, 10, 72, 42.4, 'rgba(190,210,235,0.22)', 0.1, null, s0);
      glowLine(g, hx - 9, hy - 7.5, hx, hy, '#ffffff', 0.28, 2, s0 * 0.9 * (ph > 0.08 && ph < 0.95 ? 1 : 0));
      tx(g, 'IceCube', 72, 8, 1.6, DIM, 'center', 500, MONO, s0);
    }
    var ring = eo(pr(lt, 16.4, 1)) * (1 - eo(pr(lt, 23.4, 0.8)));
    if (ring > 0) {
      for (i = 0; i < RING.length; i++) {
        var a = eo(pr(lt, 16.5 + i * 0.05, 0.4)), t = RING[i][0] + lt * 0.05;
        dot(g, rcx + Math.cos(t) * RING[i][1] * 1.2, rcy + Math.sin(t) * RING[i][1] * 0.8, 0.5, CCOL[RING[i][2]], a * ring, 2);
      }
      tx(g, '合作组', rcx, rcy - 1.2, 2.6, FG, 'center', 900, SANS, ring);
      tx(g, '58 家机构 · 14 个国家', rcx, rcy + 2.6, 1.5, DIM, 'center', 500, SANS, ring);
    }
    var up = eo(pr(lt, 23.8, 0.8)) * (1 - eo(pr(lt, 39.2, 0.6)));
    if (up > 0) {
      tx(g, 'IceCube Upgrade', 54, 14.4, 2.2, GOLD, 'left', 900, MONO, up);
      tx(g, '2025–2026 年安装 · 2026 年晚些时候出首批数据', 54, 18.2, 1.6, FG, 'left', 500, SANS, up);
      // volume bars
      var b0 = eo(pr(lt, 32.2, 0.9)), b1 = eo(pr(lt, 34, 1.2));
      var base = 39.6;
      g.save(); g.globalAlpha = up;
      ln(g, 56, base, 94, base, 'rgba(190,210,235,0.4)', 0.14);
      g.fillStyle = BLUE; g.fillRect(60, base - 2.05 * b0, 9, 2.05 * b0);
      tx(g, '现在', 64.5, base + 2, 1.5, DIM, 'center', 500, SANS, b0);
      tx(g, '1 立方公里', 64.5, base - 2.05 * b0 - 1.8, 1.5, BLUE, 'center', 700, SANS, b0);
      g.fillStyle = GOLD; g.fillRect(78, base - 16.4 * b1, 9, 16.4 * b1);
      tx(g, 'Gen2', 82.5, base + 2, 1.5, DIM, 'center', 500, SANS, b1);
      tx(g, '约 8 倍', 82.5, base - 16.4 * b1 - 1.8, 1.7, GOLD, 'center', 900, SANS, b1);
      g.restore();
      var hold = eo(pr(lt, 35.4, 0.8));
      if (hold > 0) {
        g.save(); g.globalAlpha = up * hold; g.strokeStyle = HOT; g.lineWidth = 0.2; g.setLineDash([0.7, 0.5]); g.strokeRect(75.6, 20, 14, 19.6); g.restore();
        tx(g, '2023 年被搁置', 74.4, 30, 1.5, HOT, 'right', 700, SANS, hold * up);
      }
    }
    var qa = eo(pr(lt, 40.4, 1));
    if (qa > 0) {
      tx(g, '“科学，也就是天文学，', 73, 22.4, 2.7, FG, 'center', 900, SANS, qa);
      tx(g, '还在后面。”', 73, 27.2, 2.7, GOLD, 'center', 900, SANS, qa);
      tx(g, '—— 弗朗西斯·哈尔岑', 73, 32.4, 1.7, DIM, 'center', 500, SANS, eo(pr(lt, 41.4, 0.8)));
    }
  };

  // ================= scene rendering =================
  function sizeCanvases() {
    var w = frame.clientWidth || 1120, dpr = Math.min(2, window.devicePixelRatio || 1);
    lastW = w;
    scenes.forEach(function (s) { if (s.cv) { s.cv.width = Math.round(w * dpr); s.cv.height = Math.round(w * dpr * 9 / 16); } });
  }
  function applyScene(sc, lt) {
    sc.anims.forEach(function (el) {
      var a = el.dataset.a.split(',');
      var p = clamp((lt - (+a[0])) / (+a[1]));
      var e = 1 - Math.pow(1 - p, 3);
      el.style.setProperty('--p', e.toFixed(4));
      if (el.dataset.count) {
        var v = (+el.dataset.count) * e, d = +el.dataset.dec;
        el.textContent = v.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
      }
    });
    if (sc.cv) {
      var fn = DRAW[sc.cv.dataset.draw], g = sc.g;
      K = sc.cv.width / 100;
      g.setTransform(K, 0, 0, K, 0, 0); g.clearRect(0, 0, 100, 56.25); g.lineCap = 'round'; g.lineJoin = 'round'; g.setLineDash([]);
      if (fn) fn(g, lt);
    }
  }
  function render() {
    if (frame.clientWidth !== lastW) sizeCanvases();
    var i = 0;
    for (var k = 0; k < scenes.length; k++) { if (T >= scenes[k].s) i = k; }
    if (i !== cur) {
      scenes.forEach(function (s, k) { s.el.classList.toggle('on', k === i); });
      cur = i;
    }
    applyScene(scenes[i], T - scenes[i].s);
    var li = -1;
    for (var j = 0; j < LINES.length; j++) { if (T >= LINES[j][1] && T < LINES[j][2]) { li = j; break; } }
    if (T >= DUR) li = LINES.length - 1;
    if (li !== curLine) {
      curLine = li;
      sub.textContent = li >= 0 ? LINES[li][3] : '';
    }
    seek.value = T;
    timeEl.textContent = fmt(T) + ' / ' + fmt(DUR);
  }

  // ---- audio: the music track and the synthesized effects share one clock (the Web Audio clock) ----
  var AC = null, master = null, musicEnv = null, musicVol = null, noiseBuf = null;
  var musicBytes = null, musicBuf = null, musicNodes = [], musicState = 'idle';
  var sfxOn = true, musicOn = true, musicLevel = 0.6;
  var T0 = 0, ctxStart = 0, schedT = 0, countStep = -1, LOOK = 0.2;
  // The track is a constant 112.79 BPM: first beat at 0.391 s, one beat = 0.53194 s, one bar = 4 beats.
  // Video time 0 sits at the start of track bar 4, so every video bar line is at a multiple of BAR seconds.
  var BEAT0 = 0.391, BEAT = 0.53194, BAR = BEAT * 4, S0 = BEAT0 + 4 * BAR;
  // [video bar, track bar, number of bars]: 5 minutes of video are built from the track by joining whole bars.
  // 0-73 plays the track straight through bars 4-77 (intro, groove, quiet breakdown, drop, groove);
  // the groove is then repeated, a second breakdown is inserted, and the groove is repeated once more.
  var SEGS = [[0, 4, 74], [74, 48, 30], [104, 40, 8], [112, 48, 30]];

  function updMusicUI() {
    var b = $('mus'), st = $('mstat');
    b.textContent = musicState === 'failed' ? '音乐 无法加载' : (musicOn ? '音乐 开' : '音乐 关');
    b.setAttribute('aria-pressed', musicOn ? 'true' : 'false');
    st.textContent = (musicState === 'ready' || musicState === 'failed') ? '' : '音乐载入中…';
  }
  function ensureAudio() {
    if (AC) return;
    var C = window.AudioContext || window.webkitAudioContext;
    if (!C) return;
    try {
      AC = new C();
      master = AC.createGain(); master.gain.value = 0.55;
      var comp = AC.createDynamicsCompressor();
      master.connect(comp); comp.connect(AC.destination);
      musicEnv = AC.createGain();
      musicVol = AC.createGain(); musicVol.gain.value = musicOn ? musicLevel : 0;
      musicEnv.connect(musicVol); musicVol.connect(master);
    } catch (e) { AC = null; return; }
    decodeMusic();
  }
  function resumeAudio() {
    if (AC && AC.state === 'suspended' && AC.resume) {
      try { var r = AC.resume(); if (r && r.catch) r.catch(function () {}); } catch (e) {}
    }
  }
  function decodeMusic() {
    if (!AC || !musicBytes || musicState === 'ready' || musicState === 'decoding') return;
    musicState = 'decoding'; updMusicUI();
    var ab = musicBytes.slice(0);
    new Promise(function (res, rej) {
      var p = AC.decodeAudioData(ab, res, rej);
      if (p && p.then) p.then(res, rej);
    }).then(function (buf) {
      musicBuf = buf; musicState = 'ready'; updMusicUI();
      if (playing) resync();
    }).catch(function () { musicState = 'failed'; updMusicUI(); });
  }
  try {
    var bin = atob($('musicdata').textContent.replace(/\s+/g, ''));
    var u8 = new Uint8Array(bin.length);
    for (var mi = 0; mi < bin.length; mi++) u8[mi] = bin.charCodeAt(mi);
    musicBytes = u8.buffer;
  } catch (e) { musicState = 'failed'; }

  function stopMusic() {
    musicNodes.forEach(function (n) {
      try { n.s.stop(); } catch (e) {}
      try { n.s.disconnect(); n.g.disconnect(); } catch (e) {}
    });
    musicNodes = [];
  }
  function startMusic() {
    stopMusic();
    if (!AC || !musicBuf) return;
    var X = 0.02;                                  // seam overlap: the next piece starts 20 ms early and fades in while the last one fades out
    SEGS.forEach(function (sg, idx) {
      var vs = sg[0] * BAR, ve = (sg[0] + sg[2]) * BAR;
      if (ve <= T0 || vs >= DUR) return;
      var begin = Math.max(vs, T0), early = (begin === vs && idx > 0) ? X : 0;
      var off = BEAT0 + sg[1] * BAR + (begin - vs) - early;
      var endV = Math.min(ve, DUR + 0.15), when = ctxStart + (begin - early - T0);
      var s = AC.createBufferSource(), g = AC.createGain();
      s.buffer = musicBuf; s.connect(g); g.connect(musicEnv);
      if (early) { g.gain.setValueAtTime(0, when); g.gain.linearRampToValueAtTime(1, when + X); }
      else g.gain.setValueAtTime(1, when);
      if (idx < SEGS.length - 1 && ve < DUR) {
        var fo = ctxStart + (ve - T0);
        if (fo - X > when) { g.gain.setValueAtTime(1, fo - X); g.gain.linearRampToValueAtTime(0, fo); }
      }
      s.start(when, Math.max(0, off), endV - (begin - early));
      musicNodes.push({ s: s, g: g });
    });
    // envelope: a short fade in, and a fade out over the last 5 s of the video
    var ge = musicEnv.gain, fadeFrom = DUR - 5, fi = T0 < 0.5 ? 0.4 : 0.06;
    ge.cancelScheduledValues(0);
    ge.setValueAtTime(0.0001, ctxStart);
    ge.linearRampToValueAtTime(T0 >= fadeFrom ? Math.max(0.0001, (DUR - T0) / 5) : 1, ctxStart + fi);
    if (T0 < fadeFrom) ge.setValueAtTime(1, ctxStart + (fadeFrom - T0));
    ge.linearRampToValueAtTime(0.0001, ctxStart + (DUR - T0));
  }
  function applyMusicLevel() {
    if (AC && musicVol) musicVol.gain.setTargetAtTime(musicOn ? musicLevel : 0, AC.currentTime, 0.04);
  }

  // ---- transport: while playing, the timeline follows the audio clock ----
  function clock() { return AC ? AC.currentTime : performance.now() / 1000; }
  function resync() {
    if (!playing) return;
    ctxStart = clock() + 0.06; T0 = T; schedT = T; countStep = -1;
    startMusic();
  }
  function setPlaying(on) {
    playing = on;
    pp.textContent = on ? '暂停' : (T >= DUR ? '重播' : '播放');
    bigplay.hidden = on || T > 0.05;
    if (on) { resync(); requestAnimationFrame(tick); } else { stopMusic(); }
  }
  function tick() {
    if (!playing) return;
    var prev = T;
    T = Math.max(T0, T0 + (clock() - ctxStart));
    scheduleCues(T, T - prev);
    if (T >= DUR) { T = DUR; render(); setPlaying(false); bigplay.hidden = true; return; }
    render();
    requestAnimationFrame(tick);
  }
  function toggle() {
    ensureAudio(); resumeAudio();
    if (!playing && T >= DUR - 0.05) T = 0;
    setPlaying(!playing);
    render();
  }
  document.addEventListener('visibilitychange', function () { if (document.hidden && playing) setPlaying(false); });

  // ---- effects ----
  function tone(type, f0, f1, t, a, d, peak) {
    var o = AC.createOscillator(), g = AC.createGain();
    o.type = type;
    o.frequency.setValueAtTime(f0, t);
    if (f1 !== f0) o.frequency.exponentialRampToValueAtTime(f1, t + a + d);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + a);
    g.gain.exponentialRampToValueAtTime(0.0001, t + a + d);
    o.connect(g); g.connect(master);
    o.start(t); o.stop(t + a + d + 0.05);
  }
  function noise() {
    if (!noiseBuf) {
      noiseBuf = AC.createBuffer(1, AC.sampleRate, AC.sampleRate);
      var ch = noiseBuf.getChannelData(0);
      for (var i = 0; i < ch.length; i++) ch[i] = Math.random() * 2 - 1;
    }
    return noiseBuf;
  }
  function filtered(kind, f0, f1, t, dur, peak, atk) {
    var s = AC.createBufferSource(), f = AC.createBiquadFilter(), g = AC.createGain();
    s.buffer = noise(); s.loop = true;
    f.type = kind; f.Q.value = 1.1;
    f.frequency.setValueAtTime(f0, t);
    f.frequency.exponentialRampToValueAtTime(f1, t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + atk);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur + 0.05);
    s.connect(f); f.connect(g); g.connect(master);
    s.start(t); s.stop(t + dur + 0.1);
  }
  var SFX = {
    whoosh: function (t) { filtered('bandpass', 250, 3200, t, 0.55, 0.28, 0.22); },
    // rising noise just before a chapter card lands
    riser: function (t) {
      filtered('highpass', 400, 7000, t, 0.5, 0.32, 0.47);
      tone('sine', 180, 1100, t, 0.45, 0.04, 0.12);
    },
    // chapter card impact: deep drop, body, noise burst, glassy tail
    boom: function (t) {
      tone('sine', 130, 34, t, 0.003, 1.1, 0.85);
      tone('triangle', 240, 70, t, 0.003, 0.35, 0.35);
      tone('sine', 1760, 1760, t, 0.004, 1.3, 0.05);
      filtered('lowpass', 1600, 120, t, 0.65, 0.6, 0.01);
    },
    // number counting up: short blips that rise in pitch
    tick: function (t, p) { tone('square', 480 + 1000 * p, 480 + 1000 * p, t, 0.002, 0.035, 0.05); },
    // a count lands, or a key figure appears: bell plus low thump
    ding: function (t) {
      tone('sine', 880, 880, t, 0.005, 0.8, 0.28);
      tone('sine', 1320, 1320, t, 0.005, 0.55, 0.14);
      tone('sine', 120, 55, t, 0.003, 0.28, 0.45);
    },
    // emphasis: lower, heavier
    hit: function (t) {
      tone('sine', 660, 660, t, 0.005, 0.9, 0.26);
      tone('sine', 990, 990, t, 0.005, 0.6, 0.12);
      tone('sine', 90, 45, t, 0.003, 0.4, 0.6);
    },
    pop: function (t) { tone('sine', 520, 900, t, 0.004, 0.12, 0.22); },
    soft: function (t) {
      tone('triangle', 660, 990, t, 0.05, 0.5, 0.1);
      tone('triangle', 990, 1320, t + 0.06, 0.05, 0.45, 0.07);
    },
    grow: function (t) { tone('triangle', 260, 560, t, 0.1, 0.8, 0.13); }
  };
  // Chapter card starts. The impact is start + 0.35 s and sits on a bar line of the music.
  var CHAPS = [];
  scenes.forEach(function (s) { if (s.el.classList.contains('chap')) CHAPS.push(s.s); });
  // [scene, seconds from scene start, effect]
  var RAWCUES = [
    [0, 0.05, 'whoosh'], [0, 1.1, 'pop'], [0, 5.2, 'hit'],
    [2, 0.4, 'soft'], [2, 7.2, 'pop'], [2, 14.5, 'ding'], [2, 21.1, 'pop'], [2, 23.7, 'pop'], [2, 25.6, 'pop'], [2, 28.4, 'hit'],
    [4, 0.4, 'ding'], [4, 8.4, 'pop'], [4, 10.0, 'pop'], [4, 11.6, 'pop'], [4, 15.6, 'soft'], [4, 17.4, 'hit'], [4, 22.6, 'pop'], [4, 31, 'grow'], [4, 40.5, 'ding'],
    [6, 0.3, 'ding'], [6, 6.6, 'pop'], [6, 10.5, 'hit'], [6, 11.9, 'hit'], [6, 14.2, 'soft'], [6, 21.3, 'pop'],
    [8, 0.3, 'ding'], [8, 4.7, 'hit'], [8, 8, 'pop'], [8, 14.5, 'hit'], [8, 21.5, 'grow'], [8, 28, 'soft'],
    [10, 0.4, 'soft'], [10, 7.5, 'ding'], [10, 15.7, 'pop'], [10, 18.5, 'pop'], [10, 22.6, 'hit'],
    [11, 0.4, 'soft'], [11, 7.4, 'pop'], [11, 15.7, 'ding'], [11, 23.6, 'hit'],
    [13, 0.4, 'ding'], [13, 8, 'pop'], [13, 16.6, 'ding'], [13, 24, 'soft'], [13, 32.3, 'grow'], [13, 35.5, 'pop'], [13, 40.5, 'hit'],
    [14, 0.6, 'pop'], [14, 2.4, 'pop'], [14, 4.2, 'pop'], [14, 6, 'pop'], [14, 8, 'ding'],
    [15, 0.3, 'soft']
  ];
  var CUES = [];
  CHAPS.forEach(function (c) { CUES.push([c - 0.15, 'riser'], [c + 0.35, 'boom']); });
  RAWCUES.forEach(function (c) { CUES.push([scenes[c[0]].s + c[1], c[2]]); });
  // Small effects snap to the nearest half-beat when that moves them by under 90 ms.
  var GRID0 = BEAT0 - S0, HALF = BEAT / 2;
  CUES = CUES.map(function (c) {
    if (c[1] === 'boom' || c[1] === 'riser' || c[1] === 'whoosh') return c;
    var g = GRID0 + Math.round((c[0] - GRID0) / HALF) * HALF;
    return Math.abs(g - c[0]) <= 0.09 ? [g, c[1]] : c;
  });
  CUES.sort(function (a, b) { return a[0] - b[0]; });
  // [start, duration] of each number count-up
  var COUNTS = [[scenes[4].s + 31.2, 1.5], [scenes[6].s + 6.6, 1.4], [scenes[8].s + 0.9, 1.4], [scenes[10].s + 7.5, 1.4], [scenes[11].s + 15.5, 1.4], [scenes[13].s + 16.4, 1.5]];
  // Effects are scheduled slightly ahead, at exact audio-clock times, so they line up with the music.
  function scheduleCues(tNow, dt) {
    var hz = tNow + LOOK;
    if (AC && sfxOn && dt < 0.5) {
      for (var i = 0; i < CUES.length; i++) {
        var ct = CUES[i][0];
        if (ct > schedT && ct <= hz) {
          var at = ctxStart + (ct - T0);
          if (at < AC.currentTime) at = AC.currentTime + 0.005;
          SFX[CUES[i][1]](at);
        }
      }
      var t0 = AC.currentTime + 0.02, inCount = false;
      for (var j = 0; j < COUNTS.length; j++) {
        var w = COUNTS[j];
        if (tNow >= w[0] && tNow < w[0] + w[1]) {
          var e = 1 - Math.pow(1 - clamp((tNow - w[0]) / w[1]), 3);
          var st = Math.floor(e * 24);
          if (st > countStep) { countStep = st; SFX.tick(t0, e); }
          inCount = true;
          break;
        }
      }
      if (!inCount) countStep = -1;
    }
    schedT = hz;
  }
  $('snd').addEventListener('click', function () {
    sfxOn = !sfxOn;
    this.textContent = sfxOn ? '音效 开' : '音效 关';
    this.setAttribute('aria-pressed', sfxOn ? 'true' : 'false');
  });
  $('mus').addEventListener('click', function () {
    if (musicState === 'failed') return;
    musicOn = !musicOn; applyMusicLevel(); updMusicUI();
  });
  $('mvol').addEventListener('input', function () { musicLevel = (+this.value) / 100; applyMusicLevel(); });
  ensureAudio();   // created suspended so the track can decode early; it starts running on the first click
  updMusicUI();

  pp.addEventListener('click', toggle);
  bigplay.addEventListener('click', toggle);
  seek.addEventListener('input', function () {
    T = +seek.value; if (!playing) { pp.textContent = T >= DUR ? '重播' : '播放'; bigplay.hidden = T > 0.05; } else { resync(); } render();
  });
  var wrap = $('stagewrap');
  wrap.addEventListener('keydown', function (ev) {
    if (ev.target.tagName === 'BUTTON' || ev.target.tagName === 'INPUT') return;
    if (ev.code === 'Space') { ev.preventDefault(); toggle(); }
    if (ev.code === 'ArrowRight') { T = Math.min(DUR, T + 5); if (playing) resync(); render(); }
    if (ev.code === 'ArrowLeft') { T = Math.max(0, T - 5); if (playing) resync(); render(); }
  });
  $('fs').addEventListener('click', function () {
    try {
      if (document.fullscreenElement) { document.exitFullscreen(); }
      else if (wrap.requestFullscreen) { var r = wrap.requestFullscreen(); if (r && r.catch) r.catch(function () {}); }
    } catch (e) {}
  });

  // scene ticks on the scrubber
  var ticks = $('ticks');
  scenes.forEach(function (s, k) {
    if (k === 0) return;
    var t = document.createElement('i');
    t.style.left = (s.s / DUR * 100) + '%';
    ticks.appendChild(t);
  });

  // subtitle script table
  var tb = $('scriptbody'), lastScene = -1;
  LINES.forEach(function (l) {
    if (l[0] !== lastScene) {
      lastScene = l[0];
      var h = document.createElement('tr'); h.className = 'sc';
      var hc = document.createElement('td'); hc.colSpan = 2; hc.textContent = NAMES[l[0]];
      h.appendChild(hc); tb.appendChild(h);
    }
    var tr = document.createElement('tr');
    var a = document.createElement('td'); a.className = 't'; a.textContent = fmt(l[1]) + ' – ' + fmt(l[2]);
    var b = document.createElement('td'); b.textContent = l[3];
    tr.appendChild(a); tr.appendChild(b); tb.appendChild(tr);
  });

  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { render(); });
  sizeCanvases();
  render();
})();
