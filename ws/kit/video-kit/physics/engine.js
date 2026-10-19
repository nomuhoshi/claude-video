(function () {
  var DUR = 300;
  var NAMES = ['开场', '章节 · 一条定律', '第一幕 · 杜隆—珀蒂定律', '章节 · 冷则失灵', '第二幕 · 冷则失灵', '章节 · 量子台阶', '第三幕 · 爱因斯坦的台阶',
    '章节 · 声波模型', '第四幕 · 德拜的声波', '章节 · 冷的用处', '应用 ① · 极灵敏的温度计', '应用 ② · 捕捉暗物质', '章节 · 白矮星', '应用 ③ · 宇宙的时钟', '回头看', '资料来源'];
  // [scene index, start, end (seconds from the start of that scene), text]
  var RAW = [
    [0, 0, 4.2, '固体越冷，吸热的本事就越弱，最后几乎消失。'],
    [0, 4.2, 8.1, '这个小反常，难住了经典物理，也成了量子论的一块早期证据。'],
    [1, 0.45, 2.5, '先从一条老定律说起。'],
    [2, 0.3, 6.3, '1819 年，法国的杜隆和珀蒂，测量了一批元素的比热。'],
    [2, 6.3, 13.3, '结果很怪：原子的轻重差了好几倍，每个原子吸热的本事却几乎一样。'],
    [2, 13.3, 20.3, '换句话说：每一摩尔原子，约 6×10²³ 个，升温 1 度，都大约要吸进 25 焦耳。'],
    [2, 20.3, 26.3, '五十多年后，玻尔兹曼给出解释：每个原子像一个挂在三根弹簧上的小球。'],
    [2, 26.3, 31.5, '每根弹簧分到的热一样多，所以和原子种类无关。'],
    [3, 0.45, 2.5, '可是，事情开始不对劲。'],
    [4, 0.25, 6.75, '但这条定律有个例外：钻石。1870 年代，韦伯测到它室温下只有约 6 焦耳。'],
    [4, 6.75, 14.25, '20 世纪初，低温实验越做越冷，结果更怪：所有固体的比热，都在往下掉。'],
    [4, 14.25, 22.25, '越冷，掉得越多。冷到接近绝对零度，比热几乎降到 0。'],
    [4, 22.25, 31.85, '经典物理的算盘是：只要有原子、有弹簧、有热，就该是 25。'],
    [4, 31.85, 40.25, '可自然给出的答案是：越冷，越接近 0。'],
    [4, 40.25, 48.4, '弹簧还在，原子还在，热也在，它们却“抖不起来”了。为什么？'],
    [5, 0.45, 2.5, '转机，出现在 1907 年。'],
    [6, 0.2, 6.7, '1907 年，爱因斯坦把普朗克“能量一份一份”的想法，用到了固体上。'],
    [6, 6.7, 13.7, '他设想：弹簧上的原子，吸收能量只能一级一级地要，像爬楼梯，不能只爬半级。'],
    [6, 13.7, 20.2, '热量充足时，每一级都爬得上去，结果就是老规矩：25。'],
    [6, 20.2, 27.2, '温度太低，热量连一级台阶都付不起，原子就“冻住”了，吸不进热。'],
    [7, 0.45, 2.5, '但还差一点。'],
    [8, 0.3, 5.9, '能斯特的低温实验大体支持了他，但低温处总有偏差：实测比他的曲线降得慢。'],
    [8, 5.9, 12.4, '原因是：爱因斯坦让所有原子用同一个频率各抖各的，像一支只会一个音的乐队。'],
    [8, 12.4, 20.4, '德拜在 1912 年想到：原子是互相牵着的，抖动会变成一列列声波，有长有短。'],
    [8, 20.4, 27.4, '长波的“台阶”特别矮，再冷也总有一些能被激发，所以比热只是缓缓下降，约按温度的三次方。'],
    [8, 27.4, 31.4, '高温回到 25；更精细的晶格理论，后来补齐了细节。'],
    [9, 0.45, 2.5, '这个谜底，有什么用？'],
    [10, 0.36, 6.36, '它让我们造出了极其灵敏的温度计。'],
    [10, 6.36, 13.86, '原理很简单：吸进同样一点热，比热越小的东西，温度升得越高，越容易被测到。'],
    [10, 13.86, 21.36, '而德拜告诉我们：晶体冷到 0.1 开尔文，也就是零下 273.05 摄氏度，比热会小得惊人。'],
    [10, 21.36, 30.3, '普朗克卫星的探测器，就工作在 0.1 开尔文，用它拍下了宇宙大爆炸留下的微波“婴儿照”。'],
    [11, 0.3, 6.9, '第二个应用：捕捉暗物质，也就是宇宙里看不见的那部分物质。'],
    [11, 7, 14.4, 'SuperCDMS 实验把锗晶体冷到约 0.04 开尔文，放在深深的地下，等暗物质粒子路过。'],
    [11, 14.5, 22.4, '要是有一个撞上原子，晶体里就会泛起一阵微弱的声波，正是德拜讲的那种声波。'],
    [11, 22.5, 30.9, '晶体够冷，自己的热抖动几乎冻住，这点微弱信号才不会被淹没，超导温度计就能把它读出来。'],
    [12, 0.45, 2.5, '最后一个应用，在天上。'],
    [13, 0.33, 7.4, '像太阳这样的恒星死去后，会留下一颗白矮星。'],
    [13, 7.5, 14.7, '它不再产生能量，只是慢慢散热变冷，一冷就是几十亿年。'],
    [13, 15.1, 22.4, '冷到某个时刻，内核里的碳和氧原子会排成整齐的晶格，星的中心，长出一块巨大的晶体。'],
    [13, 22.5, 30.4, '结晶会放出热，让它冷得慢一阵；结晶之后比热掉下来，它又会冷得越来越快。'],
    [13, 30.5, 38.4, '2019 年，盖亚卫星的数据里，天文学家看到了白矮星“堆积”的一段，部分被拖慢约 10 亿年。'],
    [13, 38.5, 46.4, '于是，比热成了一把尺子：看白矮星冷到哪一步，就能反推它的年龄。它们是宇宙的时钟。'],
    [14, 0.3, 4, '回头看：1819 年的一条定律，'],
    [14, 4, 8, '钻石的反常，爱因斯坦的台阶，德拜的声波，'],
    [14, 8, 11.9, '最后变成了看宇宙、抓暗物质、读星龄的温度计。'],
    [15, 0.5, 17.9, '以上为公开文献整理的科普内容，资料来源见画面。']
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

  // ================= scene 0: a lattice that calms down as it cools =================
  var LAT = (function () { var r = rng(5), a = []; for (var i = 0; i < 400; i++) a.push([r() * TAU, r() * TAU, 0.75 + r() * 0.7, 0.75 + r() * 0.7]); return a; })();
  function lattice(g, cols, rows, x0, y0, dx, dy, A, t, fr, la, aa, rad) {
    var pts = [], hot = [255, 157, 110], cold = [143, 208, 255];
    for (var j = 0; j < rows; j++) for (var i = 0; i < cols; i++) {
      var p = LAT[(j * cols + i) % LAT.length];
      pts.push([x0 + i * dx + A * Math.sin(t * p[2] * 9 + p[0]), y0 + j * dy + A * Math.sin(t * p[3] * 9 + p[1])]);
    }
    g.save(); g.lineWidth = 0.12; g.strokeStyle = rgbm(cold, hot, fr); g.globalAlpha *= la; g.beginPath();
    for (j = 0; j < rows; j++) for (i = 0; i < cols; i++) {
      var k = j * cols + i;
      if (i < cols - 1) { g.moveTo(pts[k][0], pts[k][1]); g.lineTo(pts[k + 1][0], pts[k + 1][1]); }
      if (j < rows - 1) { g.moveTo(pts[k][0], pts[k][1]); g.lineTo(pts[k + cols][0], pts[k + cols][1]); }
    }
    g.stroke(); g.restore();
    g.save(); g.globalAlpha *= aa; g.fillStyle = rgbm([242, 198, 107], hot, fr * 0.6);
    for (k = 0; k < pts.length; k++) { g.beginPath(); g.arc(pts[k][0], pts[k][1], rad, 0, TAU); g.fill(); }
    g.restore();
  }
  DRAW.d0 = function (g, lt) {
    var temp = 300 - 295 * eo(pr(lt, 0.2, 7.2)), fr = temp / 300;
    lattice(g, 21, 11, 0, 0.6, 5, 5, 0.1 + 1.45 * Math.sqrt(fr), lt, fr, 0.2, 0.42, 0.5);
    tx(g, 'TEMPERATURE', 50, 33.6, 1.3, DIM, 'center', 400, MONO, 0.9);
    tx(g, Math.round(temp) + ' K', 50, 37.4, 3.6, rgbm([143, 208, 255], [255, 190, 130], fr), 'center', 500, MONO);
  };

  // ================= scene 1: an atom on three springs =================
  DRAW.d1 = function (g, lt) {
    var a = eo(pr(lt, 19.8, 0.8)); if (a <= 0) return;
    g.save(); g.globalAlpha = a;
    var t = lt, cx = 78, cy = 37;
    var bx = cx + 1.5 * Math.sin(t * 5.1) - 0.7 * Math.sin(t * 6.7 + 1);
    var by = cy + 1.2 * Math.sin(t * 4.3 + 2) + 0.7 * Math.sin(t * 6.7 + 1);
    var ends = [[92, 37, 'x'], [78, 31.2, 'y'], [66, 43, 'z']];
    ends.forEach(function (e) {
      spring(g, e[0], e[1], bx, by, 8, 0.85, 'rgba(143,208,255,0.85)', 0.16);
      g.fillStyle = 'rgba(190,210,235,0.5)'; g.fillRect(e[0] - 0.5, e[1] - 0.5, 1, 1);
      tx(g, e[2], e[0] + (e[2] === 'x' ? 1.6 : e[2] === 'y' ? 0 : -1.6), e[1] + (e[2] === 'y' ? -1.6 : 0), 1.5, DIM, 'center', 500, MONO);
    });
    var gr = g.createRadialGradient(bx - 0.5, by - 0.5, 0.2, bx, by, 1.8);
    gr.addColorStop(0, '#fff3cf'); gr.addColorStop(1, '#e0a93f');
    g.shadowColor = GOLD; g.shadowBlur = 3 * K; g.fillStyle = gr;
    g.beginPath(); g.arc(bx, by, 1.7, 0, TAU); g.fill();
    g.restore();
    var b = eo(pr(lt, 26.3, 0.9));
    if (b > 0) {
      g.save(); g.globalAlpha = b;
      [81, 85, 89].forEach(function (x, i) {
        g.fillStyle = GOLD; g.globalAlpha = b * 0.9; g.fillRect(x - 1, 42.6 - 3.4 * b, 2, 3.4 * b);
        tx(g, ['x', 'y', 'z'][i], x, 43.7, 1.2, DIM, 'center', 400, MONO, b);
      });
      g.restore();
    }
  };

  // ================= scene 2: heat capacity falls when it gets cold =================
  var CH2 = { x0: 54, y0: 12, x1: 93, y1: 40, xm: 300, ym: 27 };
  function leadC(T) { return R3 * debye(T / 105); }
  function diaC(T) { return R3 * debye(T / 1860); }
  DRAW.d2 = function (g, lt) {
    var c = CH2, a = eo(pr(lt, 0.5, 0.8));
    axes(g, c, a, { xt: [[0, '0'], [100, '100'], [200, '200'], [300, '300']], yt: [[0, '0'], [10, '10'], [20, '20']], xl: '温度 (K)', yl: '比热  J/(mol·K)' });
    var a3 = eo(pr(lt, 1.0, 0.9));
    if (a3 > 0) {
      g.save(); g.globalAlpha = a3;
      ln(g, c.x0, Y(c, R3), c.x0 + (c.x1 - c.x0) * a3, Y(c, R3), GOLD, 0.2, [0.8, 0.6]);
      tx(g, '经典物理：25', c.x0 + 1, Y(c, R3) - 1.5, 1.35, GOLD, 'left', 500);
      g.restore();
    }
    var am = eo(pr(lt, 1.4, 0.6));
    if (am > 0) {
      dot(g, X(c, 298), Y(c, 6.1), 0.85, GOLD, am, 2);
      tx(g, '钻石 6.1', X(c, 298) - 1.6, Y(c, 6.1) - 2.1, 1.35, GOLD, 'right', 700, SANS, am);
    }
    var pl = pr(lt, 8.5, 7.5);
    if (pl > 0) {
      curve(g, c, leadC, 300, 300 - 299 * pl, ICE, 0.32, null, 1.5);
      tx(g, '铅', X(c, 270), Y(c, 21.8), 1.6, ICE, 'center', 700, SANS, eo(pr(lt, 8.8, 0.6)));
    }
    var pd = pr(lt, 17, 8);
    if (pd > 0) {
      curve(g, c, diaC, 300, 300 - 299 * pd, GOLD, 0.32, null, 1.5);
    }
    var q = eo(pr(lt, 31.85, 0.8));
    if (q > 0) {
      var pulse = 0.55 + 0.45 * Math.sin(lt * 4);
      g.save(); g.globalAlpha = q;
      g.strokeStyle = HOT; g.lineWidth = 0.22; g.setLineDash([0.6, 0.5]); g.globalAlpha = q * (0.5 + 0.5 * pulse);
      g.beginPath(); g.ellipse(X(c, 28), Y(c, 3), 6.6, 4.4, 0, 0, TAU); g.stroke(); g.restore();
      tx(g, '→ 0', X(c, 52), Y(c, 8.8), 1.8, HOT, 'left', 700, MONO, q);
      tx(g, '?', X(c, 120), Y(c, 11), 6, FG, 'center', 900, SANS, q * (0.35 + 0.35 * pulse));
    }
  };

  // ================= scene 3: Einstein's quantum staircase =================
  var U3 = (function () { var r = rng(21), a = []; for (var i = 0; i < 12; i++) a.push(-Math.log(0.05 + 0.95 * r())); return a; })();
  var CH3 = { x0: 55, y0: 14, x1: 93, y1: 40, xm: 2.6, ym: 1.05 };
  function stairY(level) { return 39.5 - 4.9 * level; }
  DRAW.d3 = function (g, lt) {
    // temperature in units of the step height
    var Tn;
    if (lt < 13.7) Tn = 0.05;
    else if (lt < 14.8) Tn = mix(0.05, 2.6, eo(pr(lt, 13.7, 1.1)));
    else if (lt < 20.4) Tn = 2.6;
    else Tn = mix(2.6, 0.12, eo(pr(lt, 20.4, 6.2)));
    var ia = eo(pr(lt, 1.4, 0.9)) * (1 - eo(pr(lt, 6.0, 0.6)));
    if (ia > 0) {
      g.save(); g.globalAlpha = ia;
      tx(g, '光滑的斜坡', 17.5, 15.6, 1.7, DIM, 'center', 700);
      tx(g, '一级一级的台阶', 39, 15.6, 1.7, DIM, 'center', 700);
      ln(g, 8, 38.5, 27, 19.5, ICE, 0.3);
      var sp = 0.5 + 0.5 * Math.sin(lt * 1.3 - 1.2);
      dot(g, 8 + 19 * sp, 38.5 - 19 * sp - 1.1, 1.1, GOLD, 1, 2);
      g.strokeStyle = GOLD; g.lineWidth = 0.3; g.beginPath(); g.moveTo(31, 38.5);
      for (var q = 0; q < 5; q++) { g.lineTo(31 + 3.2 * q, 38.5 - 3.8 * (q + 1)); g.lineTo(31 + 3.2 * (q + 1), 38.5 - 3.8 * (q + 1)); }
      g.stroke();
      var sv = (0.5 + 0.5 * Math.sin(lt * 1.3 - 1.2)) * 4.999, sl = Math.floor(sv) + sm(0.78, 1, sv - Math.floor(sv));
      dot(g, sl < 1 ? mix(29.2, 32.6, sl) : 31 + 3.2 * (sl - 1) + 1.6, 38.5 - 3.8 * sl - 1.1, 1.1, GOLD, 1, 2);
      tx(g, '想要多少给多少', 17.5, 42.2, 1.45, ICE, 'center', 500, SANS, eo(pr(lt, 3.2, 0.7)));
      tx(g, '只能一份一份地要', 39, 42.2, 1.45, GOLD, 'center', 500, SANS, eo(pr(lt, 4.2, 0.7)));
      g.restore();
    }
    var ta2 = eo(pr(lt, 1.8, 0.8)) * (1 - eo(pr(lt, 12.4, 0.6)));
    if (ta2 > 0) {
      tx(g, '普朗克（1900 年）的想法：', 58, 20, 1.9, DIM, 'left', 500, SANS, ta2);
      tx(g, '能量不能连续地给，', 58, 24.6, 2.8, FG, 'left', 900, SANS, ta2);
      tx(g, '只能一份一份地给。', 58, 29.2, 2.8, GOLD, 'left', 900, SANS, ta2);
    }
    var demoLevel = Math.min(5, Math.floor(pr(lt, 7.1, 5.3) * 5.999));          // the ball that climbs one step at a time
    var vis = eo(pr(lt, 6.5, 0.8));
    // ladders
    g.save(); g.globalAlpha = vis;
    for (var i = 0; i < 12; i++) {
      var x = 8.5 + 3.3 * i;
      for (var L = 0; L <= 5; L++) ln(g, x - 1.2, stairY(L), x + 1.2, stairY(L), 'rgba(190,210,235,0.35)', 0.14);
    }
    g.restore();
    // balls
    for (i = 0; i < 12; i++) {
      var xx = 8.5 + 3.3 * i, lev, frozen;
      var E = Tn * U3[i];
      if (lt < 13.7) { lev = i === 0 ? demoLevel + sm(0.55, 1, (pr(lt, 7.1, 5.3) * 5.999) % 1) * (demoLevel < 5 ? 1 : 0) : 0; }
      else lev = Math.min(5, Math.floor(E) + sm(0.82, 1, E - Math.floor(E)));
      frozen = lev < 0.05;
      var yy = stairY(lev) - 1.1 + (frozen ? 0 : 0.18 * Math.sin(lt * 9 + i * 1.7));
      var col = frozen ? ICE : rgbm([242, 198, 107], [255, 157, 110], Math.min(1, lev / 5));
      var big = (i === 0 && lt < 13.7) ? 1.25 : 0.9;
      dot(g, xx, yy, big, col, vis, frozen ? 0 : 1.6);
    }
    if (lt > 6.8 && lt < 13.7) {
      tx(g, '一级 = 一份能量', 24.5, 12.8, 1.7, GOLD, 'center', 700, SANS, eo(pr(lt, 7.2, 0.6)) * (1 - eo(pr(lt, 12.6, 0.8))));
      tx(g, '只能停在整数级，不能停半级', 24.5, 15.4, 1.45, DIM, 'center', 500, SANS, eo(pr(lt, 9.4, 0.8)) * (1 - eo(pr(lt, 12.6, 0.8))));
    }
    // thermometer + chart (appear once temperature matters)
    var ta = eo(pr(lt, 13.1, 0.8));
    if (ta > 0) {
      g.save(); g.globalAlpha = ta;
      g.strokeStyle = 'rgba(190,210,235,0.5)'; g.lineWidth = 0.15; g.strokeRect(47.4, 16, 1.6, 24);
      var h = 24 * Tn / 2.6;
      g.fillStyle = rgbm([143, 208, 255], [255, 157, 110], Tn / 2.6); g.fillRect(47.4, 40 - h, 1.6, h);
      tx(g, '温度', 48.2, 14, 1.3, DIM, 'center', 500);
      g.restore();
      var c = CH3;
      axes(g, c, ta, { xt: [], yt: [[0, '0'], [1, '25']], xl: '温度  冷 ← → 热', yl: '比热' });
      curve(g, c, einstein, 2.6, 0.02, 'rgba(143,208,255,0.22)', 0.2, null, 0);
      if (Tn < 2.59) curve(g, c, einstein, 2.6, Tn, ICE, 0.34, null, 1.6);
      dot(g, X(c, Tn), Y(c, einstein(Tn)), 0.85, GOLD, ta, 2.4);
      ln(g, c.x0, Y(c, 1), c.x1, Y(c, 1), GOLD, 0.14, [0.8, 0.6], ta * 0.7);
      var st = lt >= 20.4 ? (Tn < 0.7 ? '冻住了' : '') : '';
      if (st) tx(g, st, X(c, Tn) + 2.4, Y(c, einstein(Tn)) - 2.6, 1.8, ICE, 'left', 700, SANS, sm(0.7, 0.3, Tn));
    }
  };

  // ================= scene 4: Debye's waves =================
  var CH4 = { x0: 55, y0: 14, x1: 93, y1: 40, xm: 0.9, ym: 1.05 };
  function einsteinD(v) { return einstein(v / 0.75); }   // plotted against T / theta_Debye (theta_E is about 0.75 theta_D)
  DRAW.d4 = function (g, lt) {
    var c = CH4, a = eo(pr(lt, 0.3, 0.8));
    axes(g, c, a, { xt: [], yt: [[0, '0'], [1, '25']], xl: '温度  冷 ← → 热', yl: '比热' });
    ln(g, c.x0, Y(c, 1), c.x1, Y(c, 1), GOLD, 0.14, [0.8, 0.6], a * 0.7);
    var pe = pr(lt, 0.6, 3);
    if (pe > 0) curve(g, c, einsteinD, c.xm, c.xm - (c.xm - 0.02) * pe, GOLD, 0.3, [0.9, 0.6], 1.2);
    if (pe > 0.9) {
      tx(g, '爱因斯坦', X(c, 0.4), Y(c, einsteinD(0.4)) + 3.6, 1.5, GOLD, 'center', 700, SANS, eo(pr(lt, 3.3, 0.5)));
      var an = eo(pr(lt, 3.6, 0.7)) * (1 - eo(pr(lt, 12, 0.6)));
      if (an > 0) {
        var ax = X(c, 0.2), ay0 = Y(c, 0.37), ay1 = Y(c, 0.57);
        g.save(); g.globalAlpha = an; g.strokeStyle = HOT; g.fillStyle = HOT; g.lineWidth = 0.22;
        g.beginPath(); g.moveTo(ax, ay0); g.lineTo(ax, ay1 + 0.8); g.stroke();
        g.beginPath(); g.moveTo(ax - 0.8, ay1 + 1.2); g.lineTo(ax, ay1 - 0.3); g.lineTo(ax + 0.8, ay1 + 1.2); g.closePath(); g.fill();
        g.restore();
        tx(g, '实测更高', ax + 1.6, (ay0 + ay1) / 2, 1.5, HOT, 'left', 700, SANS, an);
      }
    }
    var na = eo(pr(lt, 0.7, 0.8)) * (1 - eo(pr(lt, 5.3, 0.5)));
    if (na > 0) {
      tx(g, '能斯特 · 柏林', 6, 18, 2.1, DIM, 'left', 500, SANS, na);
      tx(g, '1909 年起，系统测量低温比热', 6, 23.2, 2.9, FG, 'left', 900, SANS, na);
      tx(g, '1910 年的结果：大体支持爱因斯坦', 6, 28.4, 2.9, GOLD, 'left', 900, SANS, na * eo(pr(lt, 2.4, 0.8)));
    }
    // left side: chains of atoms
    var N = 12, x0 = 8.5, dx = 3.3;
    var ea = eo(pr(lt, 5.9, 0.8)), ed = 1 - 0.65 * eo(pr(lt, 12.4, 0.8));
    if (ea > 0) {
      g.save(); g.globalAlpha = ea * ed;
      tx(g, '爱因斯坦：各抖各的，同一个频率', 6, 14.4, 1.5, GOLD, 'left', 700);
      for (var i = 0; i < N; i++) {
        var x = x0 + dx * i, y = 19.5 + 1.3 * Math.sin(lt * 7.5 + i * 1.9);
        g.strokeStyle = 'rgba(190,210,235,0.35)'; g.lineWidth = 0.14;
        g.beginPath(); g.arc(x, 22.8, 1.6, 0.1 * Math.PI, 0.9 * Math.PI); g.stroke();
        dot(g, x, y + 1, 0.85, GOLD, 1, 1.4);
      }
      g.restore();
    }
    var da = eo(pr(lt, 12.4, 0.9));
    if (da > 0) {
      g.save(); g.globalAlpha = da;
      var rows = [{ y: 29.5, n: 1, w: 3.0, lab: '长波 · 低频', note: '台阶矮，冷了也能激发', col: ICE }, { y: 39.2, n: 5, w: 7.0, lab: '短波 · 高频', note: '台阶高，冷了就冻住', col: GOLD }];
      rows.forEach(function (r, ri) {
        tx(g, r.lab, 6, r.y - 4.6, 1.5, r.col, 'left', 700);
        var nt = eo(pr(lt, 20.4 + ri * 0.7, 0.8));
        if (nt > 0) tx(g, r.note, 24, r.y - 4.6, 1.45, DIM, 'left', 500, SANS, nt);
        var pts = [];
        for (var k = 0; k < N; k++) {
          var xk = x0 + dx * k, mode = Math.sin(r.n * Math.PI * (k + 0.5) / N);
          pts.push([xk, r.y + 1.7 * mode * Math.cos(lt * r.w + 0.6)]);
        }
        g.strokeStyle = 'rgba(190,210,235,0.5)'; g.lineWidth = 0.16; g.beginPath();
        pts.forEach(function (p, k) { if (k) g.lineTo(p[0], p[1]); else g.moveTo(p[0], p[1]); });
        g.stroke();
        pts.forEach(function (p) { dot(g, p[0], p[1], 0.8, r.col, 1, 1.2); });
      });
      g.restore();
    }
    var pdb = pr(lt, 14, 6.4);
    if (pdb > 0) {
      curve(g, c, debye, c.xm, c.xm - (c.xm - 0.02) * pdb, ICE, 0.34, null, 1.6);
      tx(g, '德拜', X(c, 0.82), Y(c, debye(0.82)) + 3.4, 1.5, ICE, 'center', 700, SANS, eo(pr(lt, 17, 0.6)));
    }
    var t3 = eo(pr(lt, 20.6, 0.8));
    if (t3 > 0) {
      tx(g, '∝ T³', X(c, 0.45), Y(c, 0.33), 3.4, ICE, 'left', 700, MONO, t3);
      tx(g, '温度减半，比热变成 1/8', X(c, 0.45), Y(c, 0.33) + 3.6, 1.35, DIM, 'left', 500, SANS, t3);
    }
    var hi = eo(pr(lt, 27.6, 0.7));
    if (hi > 0) tx(g, '高温：回到 25', X(c, c.xm - 0.01), Y(c, 1) - 2.1, 1.4, GOLD, 'right', 700, SANS, hi);
  };

  // ================= scene 5: buckets, then Planck =================
  var CMB = (function () {
    var r = rng(77), a = [], pal = ['#2f5fb3', '#4f8fd6', '#8cc6e8', '#f2c66b', '#e8793f', '#c23b3b'];
    for (var i = 0; i < 620; i++) a.push([r(), r(), 0.45 + r() * 1.15, pal[Math.floor(Math.pow(r(), 0.9) * pal.length)], 0.2 + r() * 0.3]);
    return a;
  })();
  DRAW.d5 = function (g, lt) {
    var ab = eo(pr(lt, 6.4, 0.8)) * (1 - eo(pr(lt, 13.2, 0.6)));
    if (ab > 0) {
      g.save(); g.globalAlpha = ab;
      var bx0 = 8, bx1 = 26, tx0 = 34, tx1 = 37.5, top = 22, bot = 37;
      var vol = 0;
      [0, 1, 2].forEach(function (k) { vol += 6 * eo(pr(lt, 8.15 + 1.5 * k, 0.5)); });
      var hBig = 5 + vol / (bx1 - bx0), hTube = 5 + vol / (tx1 - tx0);
      var vessel = function (x0, x1, h, col) {
        g.fillStyle = col; g.globalAlpha = ab * 0.35; g.fillRect(x0, bot - h, x1 - x0, h);
        g.globalAlpha = ab; ln(g, x0, bot - h, x1, bot - h, ICE, 0.18);
        g.strokeStyle = 'rgba(238,242,248,0.8)'; g.lineWidth = 0.22; g.beginPath(); g.moveTo(x0, top); g.lineTo(x0, bot); g.lineTo(x1, bot); g.lineTo(x1, top); g.stroke();
      };
      vessel(bx0, bx1, hBig, ICE); vessel(tx0, tx1, hTube, ICE);
      [0, 1, 2].forEach(function (k) {
        var t0 = 7.6 + 1.5 * k, p = pr(lt, t0, 0.55);
        if (p > 0 && p < 1) {
          [17, 35.75].forEach(function (x, j) { dot(g, x, mix(16.6, bot - (j ? hTube : hBig), p * p), 0.85, GOLD, 1, 2); });
        }
      });
      tx(g, '同样的一点热', 26.5, 14.8, 1.6, GOLD, 'center', 700, SANS, eo(pr(lt, 7.0, 0.5)));
      tx(g, '比热大', 17, 39.4, 1.7, FG, 'center', 700, SANS);
      tx(g, '比热小', 35.75, 39.4, 1.7, FG, 'center', 700, SANS);
      tx(g, '水位 = 温度', 6, 18.2, 1.3, DIM, 'left', 500, SANS);
      var rs = eo(pr(lt, 11.3, 0.6));
      tx(g, '升温小', 17, 20.3, 1.6, ICE, 'center', 700, SANS, rs);
      tx(g, '升温大：约 5 倍', 35.75, 20.3, 1.6, HOT, 'center', 700, SANS, rs);
      g.restore();
    }
    var cb = eo(pr(lt, 13.9, 0.7));
    if (cb > 0) {
      tx(g, '0.1 K', 6, 20.6, 7, ICE, 'left', 500, MONO, cb);
      tx(g, '零下 273.05 ℃', 6, 26, 1.9, DIM, 'left', 500, SANS, cb);
      var a1 = eo(pr(lt, 16, 0.6)), a2 = eo(pr(lt, 17.6, 0.6));
      tx(g, '室温下的比热', 6, 30.3, 1.45, FG, 'left', 500, SANS, a1);
      g.save(); g.globalAlpha = a1; g.fillStyle = GOLD; g.fillRect(6, 31.5, 36 * a1, 1.6); g.restore();
      tx(g, '0.1 K 的比热', 6, 35.2, 1.45, FG, 'left', 500, SANS, a2);
      var w2 = mix(36, 0.3, eo(pr(lt, 18.2, 2.2)));
      g.save(); g.globalAlpha = a2; g.fillStyle = ICE; g.fillRect(6, 36.4, w2, 1.6); g.restore();
      tx(g, '几乎为零（约按 T³ 骤降）', 6 + w2 + 1.4, 37.2, 1.4, ICE, 'left', 700, SANS, eo(pr(lt, 20.2, 0.7)));
    }
    var mp = eo(pr(lt, 22.2, 1.2));
    if (mp > 0) {
      var cx = 74, cy = 31.6, rx = 18, ry = 8.4;
      g.save(); g.globalAlpha = mp;
      g.beginPath(); g.ellipse(cx, cy, rx, ry, 0, 0, TAU); g.save(); g.clip();
      g.fillStyle = '#12304f'; g.fillRect(cx - rx, cy - ry, 2 * rx, 2 * ry);
      CMB.forEach(function (b) {
        g.globalAlpha = mp * b[4]; g.fillStyle = b[3];
        g.beginPath(); g.arc(cx - rx + b[0] * 2 * rx, cy - ry + b[1] * 2 * ry, b[2], 0, TAU); g.fill();
      });
      g.restore(); g.globalAlpha = mp;
      g.strokeStyle = 'rgba(143,208,255,0.7)'; g.lineWidth = 0.2; g.beginPath(); g.ellipse(cx, cy, rx, ry, 0, 0, TAU); g.stroke();
      tx(g, '宇宙微波背景（示意图）', cx, 41.6, 1.35, DIM, 'center', 500, SANS);
      g.restore();
    }
  };

  // ================= scene 6: a particle hits a cold crystal =================
  DRAW.d6 = function (g, lt) {
    var cols = 15, rows = 8, dx = 2.6, ox = 56.5, oy = 11.4, ccx = ox + dx * 7, ccy = oy + dx * 3.5;
    var arr = eo(pr(lt, 7.6, 1)), hit = 15, v = 7;
    if (arr > 0) {
      var pts = [];
      for (var j = 0; j < rows; j++) for (var i = 0; i < cols; i++) {
        var x = ox + i * dx, y = oy + j * dx, d = Math.hypot(x - ccx, y - ccy) || 0.01, rr = (lt - hit) * v, o = 0;
        if (lt > hit) { var w = d - rr; o = 1.15 * Math.sin(w * 1.45) * Math.exp(-(w * w) / 22) * Math.exp(-d / 26); }
        var p = LAT[(j * cols + i) % LAT.length];
        o += 0.05 * Math.sin(lt * 6 * p[2] + p[0]);
        pts.push([x + o * (x - ccx) / d, y + o * (y - ccy) / d]);
      }
      g.save(); g.globalAlpha = arr;
      g.strokeStyle = 'rgba(143,208,255,0.3)'; g.lineWidth = 0.12; g.beginPath();
      for (j = 0; j < rows; j++) for (i = 0; i < cols; i++) {
        var k = j * cols + i;
        if (i < cols - 1) { g.moveTo(pts[k][0], pts[k][1]); g.lineTo(pts[k + 1][0], pts[k + 1][1]); }
        if (j < rows - 1) { g.moveTo(pts[k][0], pts[k][1]); g.lineTo(pts[k + cols][0], pts[k + cols][1]); }
      }
      g.stroke();
      g.fillStyle = ICE; pts.forEach(function (p) { g.beginPath(); g.arc(p[0], p[1], 0.5, 0, TAU); g.fill(); });
      // frame and sensors
      g.strokeStyle = 'rgba(238,242,248,0.5)'; g.lineWidth = 0.2; g.strokeRect(ox - 1.8, oy - 1.8, dx * 14 + 3.6, dx * (rows - 1) + 3.6);
      [[ox - 1.8, oy - 1.8], [ox + dx * 14 + 1.8, oy - 1.8], [ox - 1.8, oy + dx * (rows - 1) + 1.8], [ox + dx * 14 + 1.8, oy + dx * (rows - 1) + 1.8]].forEach(function (s) {
        var dd = Math.hypot(s[0] - ccx, s[1] - ccy), lit = lt > hit ? sm(dd / v, dd / v + 0.7, lt - hit) : 0;
        g.save(); if (lit > 0) { g.shadowColor = GOLD; g.shadowBlur = 3 * K * lit; }
        g.fillStyle = lit > 0.02 ? rgbm([143, 208, 255], [242, 198, 107], lit) : 'rgba(143,208,255,0.6)';
        g.fillRect(s[0] - 0.9, s[1] - 0.9, 1.8, 1.8); g.restore();
      });
      tx(g, '锗晶体', ox + dx * 7, oy - 3.4, 1.45, DIM, 'center', 500, SANS);
      g.restore();
    }
    // the incoming particle
    var pp0 = pr(lt, 13.6, 1.4);
    if (pp0 > 0 && lt < hit + 0.45) {
      var px = mix(47.5, ccx, pp0), py = mix(6.6, ccy, pp0);
      ln(g, mix(47.5, ccx, Math.max(0, pp0 - 0.35)), mix(6.6, ccy, Math.max(0, pp0 - 0.35)), px, py, 'rgba(255,157,110,0.6)', 0.3);
      dot(g, px, py, 0.95, HOT, 1, 3);
      if (lt < 14.8) tx(g, '暗物质粒子', px + 1.6, py - 1.4, 1.35, HOT, 'left', 700, SANS, 1);
    }
    if (lt > hit && lt < hit + 1.1) {
      var fl = 1 - (lt - hit) / 1.1;
      dot(g, ccx, ccy, 1.2 + 4 * (1 - fl), '#fff3cf', fl * 0.8, 6);
    }
    // two thermometer traces: cold (clear) and not cold enough (buried)
    var tr = eo(pr(lt, 15.5, 1));
    if (tr > 0) {
      var t0 = 12, t1 = 30.9, xa = ox - 1.8, xb = 93;
      var trace = function (base, noise, label, col, la) {
        g.save(); g.globalAlpha = tr; g.strokeStyle = col; g.lineWidth = 0.2; g.beginPath();
        var n = 150, upto = Math.min(1, (lt - t0) / (t1 - t0));
        for (var q = 0; q <= n * upto; q++) {
          var tt = t0 + (t1 - t0) * q / n, s = tt - 17.4;
          var sig = s > 0 ? 3.2 * (1 - Math.exp(-s / 0.3)) * Math.exp(-s / 3.5) : 0;
          var nz = noise * (Math.sin(tt * 37) * 0.5 + Math.sin(tt * 91 + 1) * 0.35 + Math.sin(tt * 151 + 2) * 0.25);
          var xx = xa + (xb - xa) * q / n, yy = base - sig - nz;
          if (q) g.lineTo(xx, yy); else g.moveTo(xx, yy);
        }
        g.stroke(); g.restore();
        tx(g, label, xa, base - 3.5, 1.25, col, 'left', 500, SANS, tr * la);
      };
      var wm = eo(pr(lt, 22.5, 0.8));
      if (wm > 0) trace(38.4, 1.1 * wm, '不够冷：自己的热抖动淹没了信号', HOT, wm);
      trace(43.4, 0.08, '冷到 0.04 K：信号清楚', ICE, 1);
    }
  };

  // ================= scene 7: a white dwarf that crystallises =================
  var CH7 = { x0: 55, y0: 14, x1: 93, y1: 40 };
  var CURVE7 = (function () {
    var n = 100, a = [0], tot = 0, cum = [0];
    function slope(s) { return mix(mix(1, 0.2, sm(0.34, 0.4, s)), 2, sm(0.6, 0.66, s)); }
    for (var i = 1; i <= n; i++) { tot += slope(i / n) / n; cum.push(tot); }
    return cum.map(function (v) { return v / tot; });
  })();
  var HRP = (function () {
    var r = rng(404), a = [];
    while (a.length < 300) {
      var s = r(), dens = 0.35 + 2.6 * Math.exp(-Math.pow((s - 0.5) / 0.06, 2));
      if (r() * 2.95 > dens) continue;
      var u = (r() + r() + r() - 1.5) * 1.5;
      a.push([s, u]);
    }
    return a;
  })();
  var WD_COLORS = [[214, 232, 255], [255, 236, 170], [255, 160, 90], [190, 70, 60]];
  function wdColor(tc) {
    var f = tc * 3, i = Math.min(2, Math.floor(f));
    return rgbm(WD_COLORS[i], WD_COLORS[i + 1], f - i);
  }
  DRAW.d7 = function (g, lt) {
    var cx = 26, cy = 26.8, R = 12.5;
    var grow = eo(pr(lt, 0.5, 1.6)), tc = 0.85 * pr(lt, 6, 17);
    var rr = R * grow;
    if (rr > 0.1) {
      var gr = g.createRadialGradient(cx - R * 0.25, cy - R * 0.25, R * 0.1, cx, cy, rr);
      gr.addColorStop(0, '#ffffff'); gr.addColorStop(0.55, wdColor(tc)); gr.addColorStop(1, wdColor(Math.min(1, tc + 0.18)));
      g.save(); g.shadowColor = wdColor(tc); g.shadowBlur = (6 + 14 * (1 - tc)) * K;
      g.fillStyle = gr; g.beginPath(); g.arc(cx, cy, rr, 0, TAU); g.fill(); g.restore();
    }
    var rc = 9.2 * eo(pr(lt, 15.1, 7.5));
    if (rc > 0.2) {
      g.save(); g.beginPath(); g.arc(cx, cy, rc, 0, TAU); g.clip();
      g.fillStyle = 'rgba(10,20,40,0.55)'; g.fillRect(cx - rc, cy - rc, 2 * rc, 2 * rc);
      g.strokeStyle = 'rgba(143,208,255,0.55)'; g.lineWidth = 0.12; g.beginPath();
      for (var i = -7; i <= 7; i++) {
        g.moveTo(cx + i * 1.55, cy - 11); g.lineTo(cx + i * 1.55, cy + 11);
        g.moveTo(cx - 11, cy + i * 1.55); g.lineTo(cx + 11, cy + i * 1.55);
      }
      g.stroke(); g.fillStyle = ICE;
      for (i = -7; i <= 7; i++) for (var j = -7; j <= 7; j++) { g.beginPath(); g.arc(cx + i * 1.55, cy + j * 1.55, 0.3, 0, TAU); g.fill(); }
      g.restore();
      g.save(); g.strokeStyle = ICE; g.lineWidth = 0.25; g.shadowColor = ICE; g.shadowBlur = 2 * K;
      g.beginPath(); g.arc(cx, cy, rc, 0, TAU); g.stroke(); g.restore();
      tx(g, '碳、氧原子排成晶格', cx, 42.4, 1.5, ICE, 'center', 700, SANS, eo(pr(lt, 18, 0.8)));
    }
    var c = CH7;
    // panel A: cooling curve
    var pa = eo(pr(lt, 22.4, 0.8)) * (1 - eo(pr(lt, 30.2, 0.6)));
    if (pa > 0) {
      axes(g, c, pa, { xt: [], yt: [], xl: '年龄 →', yl: '亮度（上亮 下暗）' });
      var zx0 = c.x0 + (c.x1 - c.x0) * 0.37, zx1 = c.x0 + (c.x1 - c.x0) * 0.63;
      g.save(); g.globalAlpha = pa * 0.14; g.fillStyle = ICE; g.fillRect(zx0, c.y0, zx1 - zx0, c.y1 - c.y0); g.restore();
      var p = pr(lt, 22.8, 7), m = Math.floor(p * 100);
      g.save(); g.globalAlpha = pa; g.strokeStyle = GOLD; g.lineWidth = 0.34; g.shadowColor = GOLD; g.shadowBlur = 1.5 * K; g.beginPath();
      for (i = 0; i <= m; i++) {
        var xx = c.x0 + (c.x1 - c.x0) * i / 100, yy = c.y0 + 1.5 + (c.y1 - c.y0 - 3) * CURVE7[i];
        if (i) g.lineTo(xx, yy); else g.moveTo(xx, yy);
      }
      g.stroke(); g.restore();
      tx(g, '结晶放热：冷得慢', (zx0 + zx1) / 2, c.y0 + 2.2, 1.45, ICE, 'center', 700, SANS, pa * eo(pr(lt, 25, 0.6)));
      tx(g, '结晶后：比热骤降，冷得更快', c.x1, c.y1 - 3.2, 1.45, HOT, 'right', 700, SANS, pa * eo(pr(lt, 28.2, 0.6)));
    }
    // panel B: pile-up in the colour-brightness diagram (schematic)
    var pb = eo(pr(lt, 30.5, 0.8)) * (1 - eo(pr(lt, 38.2, 0.6)));
    if (pb > 0) {
      axes(g, c, pb, { xt: [], yt: [], xl: '颜色  热 → 冷', yl: '亮度（上亮 下暗）' });
      var cnt = Math.floor(HRP.length * eo(pr(lt, 30.8, 4)));
      g.save(); g.globalAlpha = pb;
      for (i = 0; i < cnt; i++) {
        var s = HRP[i][0], u = HRP[i][1];
        dot(g, c.x0 + 2.5 + (c.x1 - c.x0 - 5) * s + u * 0.5, c.y0 + 2.5 + (c.y1 - c.y0 - 5) * s * 0.92 + u * 0.8, 0.32, wdColor(s), 0.95, 0);
      }
      g.restore();
      var hb = eo(pr(lt, 34.4, 0.7));
      if (hb > 0) {
        var ex = c.x0 + 2.5 + (c.x1 - c.x0 - 5) * 0.5, ey = c.y0 + 2.5 + (c.y1 - c.y0 - 5) * 0.46;
        g.save(); g.globalAlpha = pb * hb; g.strokeStyle = ICE; g.lineWidth = 0.22; g.setLineDash([0.7, 0.5]);
        g.beginPath(); g.ellipse(ex, ey, 7.5, 3.2, 0.53, 0, TAU); g.stroke(); g.restore();
        tx(g, '堆积：被拖慢约 10 亿年', ex + 1.5, ey - 7.4, 1.5, ICE, 'left', 700, SANS, pb * hb);
      }
    }
    // panel C: the ruler
    var pc = eo(pr(lt, 38.7, 0.6));
    if (pc > 0) {
      for (i = 0; i < 4; i++) {
        var a = eo(pr(lt, 38.9 + i * 0.9, 0.6)), x = 60 + i * 9.5;
        var gr2 = g.createRadialGradient(x - 0.8, 24.2, 0.3, x, 25, 3.4);
        gr2.addColorStop(0, '#ffffff'); gr2.addColorStop(1, wdColor(i / 3));
        g.save(); g.globalAlpha = a; g.fillStyle = gr2; g.shadowColor = wdColor(i / 3); g.shadowBlur = 2.5 * K;
        g.beginPath(); g.arc(x, 25, 3.2, 0, TAU); g.fill(); g.restore();
        tx(g, ['年轻', '', '', '年老'][i], x, 30.4, 1.5, DIM, 'center', 500, SANS, a);
      }
      var ar = eo(pr(lt, 41.8, 0.8));
      ln(g, 59, 33.6, 59 + 31 * ar, 33.6, GOLD, 0.22, null, ar);
      tx(g, '冷到哪一步  →  反推年龄', 74.5, 36.6, 2.2, GOLD, 'center', 900, SANS, eo(pr(lt, 43, 0.8)));
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
    [0, 0.05, 'whoosh'], [0, 1.1, 'pop'],
    [2, 0.3, 'ding'], [2, 0.9, 'soft'], [2, 6.4, 'pop'], [2, 7.2, 'pop'], [2, 8, 'pop'], [2, 8.8, 'pop'], [2, 9.6, 'pop'], [2, 13.3, 'hit'], [2, 19.8, 'soft'], [2, 26.3, 'pop'],
    [4, 0.4, 'ding'], [4, 1.8, 'pop'], [4, 3.4, 'pop'], [4, 8.5, 'grow'], [4, 17, 'grow'], [4, 22.25, 'hit'], [4, 31.85, 'hit'], [4, 40.25, 'soft'],
    [6, 0.2, 'ding'], [6, 6.7, 'soft'], [6, 7.78, 'pop'], [6, 8.67, 'pop'], [6, 9.55, 'pop'], [6, 10.43, 'pop'], [6, 11.32, 'pop'], [6, 13.7, 'hit'], [6, 20.4, 'grow'],
    [8, 0.3, 'soft'], [8, 5.9, 'soft'], [8, 12.4, 'ding'], [8, 14, 'grow'], [8, 20.4, 'hit'], [8, 27.4, 'pop'],
    [10, 0.4, 'soft'], [10, 7.6, 'pop'], [10, 9.1, 'pop'], [10, 10.6, 'pop'], [10, 13.9, 'ding'], [10, 21.4, 'hit'],
    [11, 0.3, 'soft'], [11, 7.2, 'ding'], [11, 13.8, 'whoosh'], [11, 15, 'hit'], [11, 22.5, 'soft'],
    [13, 0.4, 'soft'], [13, 14.8, 'hit'], [13, 15.4, 'soft'], [13, 22.5, 'grow'], [13, 30.5, 'ding'], [13, 38.5, 'hit'],
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
  var COUNTS = [[scenes[2].s + 13.3, 1.5], [scenes[4].s + 0.4, 1.4]];
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
