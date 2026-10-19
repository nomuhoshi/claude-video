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
