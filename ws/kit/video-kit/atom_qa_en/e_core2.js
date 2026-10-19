
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
    });
    if (sc.cv) {
      var fn = DRAW[sc.cv.dataset.draw], g = sc.g;
      K = sc.cv.width / 100;
      g.setTransform(K, 0, 0, K, 0, 0); g.clearRect(0, 0, 100, 56.25); g.lineCap = 'round'; g.lineJoin = 'round'; g.setLineDash([]);
      if (fn) fn(g, lt, sc.ls);
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
    if (li !== curLine) {
      curLine = li;
      sub.textContent = li >= 0 ? LINES[li][3] : '';
    }
    seek.value = T;
    timeEl.textContent = fmt(T) + ' / ' + fmt(DUR);
  }

  // ---- transport: while playing, the timeline follows the audio clock ----
  var musicState = 'idle';
  function updMusicUI() {
    var b = $('mus');
    b.textContent = musicOn ? 'Music on' : 'Music off';
    b.setAttribute('aria-pressed', musicOn ? 'true' : 'false');
  }
  function ensureAudio() {
    if (AC) return;
    var C = window.AudioContext || window.webkitAudioContext;
    if (!C) return;
    try { buildGraph(new C()); } catch (e) { AC = null; }
  }
  function resumeAudio() {
    if (AC && AC.state === 'suspended' && AC.resume) {
      try { var r = AC.resume(); if (r && r.catch) r.catch(function () {}); } catch (e) {}
    }
  }
  function clock() { return AC ? AC.currentTime : performance.now() / 1000; }
  function resync() {
    if (!playing) return;
    ctxStart = clock() + 0.08; T0 = T; schedT = T;
    startAudio();
  }
  function setPlaying(on) {
    playing = on;
    pp.textContent = on ? 'Pause' : (T >= DUR ? 'Replay' : 'Play');
    bigplay.hidden = on || T > 0.05;
    if (on) { resync(); requestAnimationFrame(tick); } else { stopAll(); }
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
  $('snd').addEventListener('click', function () {
    sfxOn = !sfxOn;
    this.textContent = sfxOn ? 'SFX on' : 'SFX off';
    this.setAttribute('aria-pressed', sfxOn ? 'true' : 'false');
    applyLevels();
  });
  $('mus').addEventListener('click', function () { musicOn = !musicOn; applyLevels(); updMusicUI(); });
  $('mvol').addEventListener('input', function () { musicLevel = (+this.value) / 100; applyLevels(); });
  updMusicUI();

  pp.addEventListener('click', toggle);
  bigplay.addEventListener('click', toggle);
  seek.addEventListener('input', function () {
    T = +seek.value; if (!playing) { pp.textContent = T >= DUR ? 'Replay' : 'Play'; bigplay.hidden = T > 0.05; } else { resync(); } render();
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
  seek.max = DUR;
  var ticks = $('ticks');
  scenes.forEach(function (s, k) {
    if (k === 0) return;
    var t = document.createElement('i');
    t.style.left = (s.s / DUR * 100) + '%';
    ticks.appendChild(t);
  });
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
  // offline export hook: show frame at time t (used by the video renderer only)
  window.__DUR = DUR;
  window.__setT = function (t) {
    T = t; render();
    var sc = scenes[cur], fd = sc.el.classList.contains('chap') ? 0.1 : 0.5;
    if (cur > 0 && T - sc.s < fd) applyScene(scenes[cur - 1], scenes[cur - 1].e - scenes[cur - 1].s);
    for (var k = 0; k < scenes.length; k++) {
      var el = scenes[k].el, o = 0;
      if (k === cur) o = k === 0 ? 1 : clamp((T - scenes[k].s) / fd);
      else if (k === cur - 1) o = 1 - clamp((T - scenes[cur].s) / fd);
      el.style.opacity = o.toFixed(3);
    }
  };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { render(); });
  sizeCanvases();
  render();
})();
