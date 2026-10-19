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
