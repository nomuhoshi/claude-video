(function () {
  var DATA = @@DATA@@;
  var DUR = DATA.DUR, NAMES = DATA.names, RAW = DATA.lines;
  var $ = function (id) { return document.getElementById(id); };
  var frame = $('frame');
  var sceneEls = Array.prototype.slice.call(document.querySelectorAll('.scene'));
  var DRAW = {};
  var scenes = sceneEls.map(function (el, i) {
    var cv = el.querySelector('canvas.cv');
    return {
      el: el, s: +el.dataset.start, e: +el.dataset.end, ls: DATA.scenes[i].ls, cv: cv, g: cv ? cv.getContext('2d') : null,
      anims: Array.prototype.slice.call(el.querySelectorAll('[data-a]'))
    };
  });
  var LINES = RAW.map(function (l) { return [l[0], scenes[l[0]].s + l[1], scenes[l[0]].s + l[2], l[3]]; });
  var sub = $('sub'), seek = $('seek'), timeEl = $('time'), pp = $('pp'), bigplay = $('bigplay');
  var T = 0, playing = false, cur = -1, curLine = -2, lastW = 0, K = 10;

  function clamp(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function fmt(t) { t = Math.max(0, Math.floor(t)); return Math.floor(t / 60) + ':' + ('0' + (t % 60)).slice(-2); }
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
