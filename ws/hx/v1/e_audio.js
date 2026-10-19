
  // ================= audio: an ethereal score made only of synthesis, drawn live and rendered offline =================
  // Layers: slow pad chords (change with the scenes) + glass bells on the subtitle lines + textures that follow the story
  // (wind, fire crackle and roar, shimmering sunlight, a pitch that follows the rolling ball, the ticking of heat)
  // + hand-made one-shot effects. Everything goes through one big, dark reverb so it sounds like it happens in a large space.
  var AC = null, out = null, revIn = null, bufs = null, S = null;
  var sfxOn = true, musicOn = true, musicLevel = 0.6;
  var T0 = 0, ctxStart = 0, schedT = 0, LOOK = 0.25, CUES = [], OUTG = 0.85;
  var CHORDS = [[38, 45, 52, 57, 66, 69], [47, 54, 57, 61, 66], [43, 50, 59, 66, 69], [45, 52, 59, 64, 71], [42, 49, 57, 64, 68], [40, 47, 54, 59, 67]];
  CUES = DATA.cues.concat(DCUES).sort(function (a, b) { return a[0] - b[0]; });
  var BEDS = DATA.beds.concat(DBEDS);

  var MUS = DATA.mus || { beat0: 0.391, bar: 0.53194 * 4, tr: 0 };   // the bed track: first beat, bar length, transposition (semitones) of the synth layer
  var TR = Math.pow(2, (MUS.tr || 0) / 12);
  function mtof(m) { return 440 * TR * Math.pow(2, (m - 69) / 12); }
  function gainN(v) { var g = AC.createGain(); g.gain.value = v; return g; }
  function route(n, bus, dry, wet) {
    var d, w;
    if (dry > 0) { d = gainN(dry); n.connect(d); d.connect(bus === 'mus' ? S.musVol : S.sfxVol); }
    if (wet > 0) { w = gainN(wet); n.connect(w); w.connect(bus === 'mus' ? S.musRev : S.sfxRev); }
  }
  function panTo(n, pan) {
    if (!pan) return n;
    var p = AC.createStereoPanner(); p.pan.value = pan; n.connect(p); return p;
  }
  function makeBufs(ctx) {
    var sr = ctx.sampleRate, r = rng(1234), i, b = {};
    function mono(sec) { return ctx.createBuffer(1, Math.floor(sr * sec), sr); }
    b.white = mono(4); var d = b.white.getChannelData(0);
    for (i = 0; i < d.length; i++) d[i] = r() * 2 - 1;
    b.pink = mono(6); d = b.pink.getChannelData(0);
    var b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0, w, rp = rng(55);
    for (i = 0; i < d.length; i++) {
      w = rp() * 2 - 1;
      b0 = 0.99886 * b0 + w * 0.0555179; b1 = 0.99332 * b1 + w * 0.0750759; b2 = 0.96900 * b2 + w * 0.1538520;
      b3 = 0.86650 * b3 + w * 0.3104856; b4 = 0.55000 * b4 + w * 0.5329522; b5 = -0.7616 * b5 - w * 0.0168980;
      d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11; b6 = w * 0.115926;
    }
    var N = Math.floor(sr * 6), X = Math.floor(sr * 0.6), tmp = new Float32Array(N + X), y = 0, rb = rng(66), mx = 0.0001;
    for (i = 0; i < N + X; i++) { y = (y + 0.02 * (rb() * 2 - 1)) / 1.02; tmp[i] = y; if (Math.abs(y) > mx) mx = Math.abs(y); }
    b.brown = mono(6); d = b.brown.getChannelData(0);
    for (i = 0; i < N; i++) { var wgt = i < X ? i / X : 1; d[i] = (tmp[i] * wgt + (i < X ? tmp[N + i] * (1 - wgt) : 0)) / mx * 0.9; }
    // fire crackle: pops of random size, wrapped around so the loop has no seam
    var len = Math.floor(sr * 8), cl = new Float32Array(len), cr = new Float32Array(len), rc = rng(321);
    function pop(pos, amp, dur, pan) {
      var n = Math.floor(dur * sr), tau = n / 4, prev = 0;
      for (var k = 0; k < n; k++) {
        var wv = rc() * 2 - 1, v = (wv - prev * 0.65) * amp * Math.exp(-k / tau); prev = wv;
        var ix = (pos + k) % len; cl[ix] += v * (1 - pan); cr[ix] += v * pan;
      }
    }
    for (i = 0; i < 8 * 15; i++) pop(Math.floor(rc() * len), 0.12 + Math.pow(rc(), 3) * 0.85, 0.004 + rc() * 0.03, rc());
    for (i = 0; i < 8 * 80; i++) pop(Math.floor(rc() * len), 0.03 + rc() * 0.1, 0.001 + rc() * 0.004, rc());
    for (i = 0; i < 8 * 3; i++) { var ps = Math.floor(rc() * len); pop(ps, 0.7 + rc() * 0.3, 0.012, 0.5); pop(ps + Math.floor(0.015 * sr), 0.5, 0.01, 0.5); }
    var pk = 0.0001; for (i = 0; i < len; i++) pk = Math.max(pk, Math.abs(cl[i]), Math.abs(cr[i]));
    b.crackle = ctx.createBuffer(2, len, sr);
    var c0 = b.crackle.getChannelData(0), c1 = b.crackle.getChannelData(1);
    for (i = 0; i < len; i++) { c0[i] = cl[i] / pk * 0.8; c1[i] = cr[i] / pk * 0.8; }
    // a very dark, long room
    var il = Math.floor(sr * 4.4); b.ir = ctx.createBuffer(2, il, sr);
    for (var ch = 0; ch < 2; ch++) {
      var data = b.ir.getChannelData(ch), ri = rng(900 + ch * 17), yy = 0;
      for (i = 0; i < il; i++) {
        var t = i / sr, env = Math.exp(-t * 6.9 / 3.6) * (1 - Math.exp(-t * 55)), a = 1 / (1 + t * 8);
        yy += ((ri() * 2 - 1) - yy) * a * 0.9; data[i] = yy * env;
      }
    }
    return b;
  }
  function buildGraph(ctx) {
    AC = ctx;
    bufs = makeBufs(ctx);
    var comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -16; comp.knee.value = 20; comp.ratio.value = 3.2; comp.attack.value = 0.02; comp.release.value = 0.35;
    out = ctx.createGain(); out.gain.value = OUTG;
    var lim = ctx.createDynamicsCompressor(); lim.threshold.value = -2.5; lim.knee.value = 0; lim.ratio.value = 20; lim.attack.value = 0.003; lim.release.value = 0.12;
    out.connect(comp); comp.connect(lim); lim.connect(ctx.destination);
    revIn = ctx.createGain();
    var conv = ctx.createConvolver(); conv.buffer = bufs.ir;
    var hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 160;
    var revOut = gainN(0.85);
    revIn.connect(hp); hp.connect(conv); conv.connect(revOut); revOut.connect(out);
  }
  function applyLevels() {
    if (!S) return;
    var m = musicOn ? musicLevel : 0, s = sfxOn ? 1 : 0, t = AC.currentTime || 0;
    S.musVol.gain.setTargetAtTime(m, t, 0.03); S.musRev.gain.setTargetAtTime(m, t, 0.03);
    S.sfxVol.gain.setTargetAtTime(s, t, 0.03); S.sfxRev.gain.setTargetAtTime(s, t, 0.03);
  }
  function newSession() {
    S = { musVol: gainN(musicOn ? musicLevel : 0), musRev: gainN(musicOn ? musicLevel : 0), sfxVol: gainN(sfxOn ? 1 : 0), sfxRev: gainN(sfxOn ? 1 : 0), nodes: [] };
    S.musVol.connect(out); S.musRev.connect(revIn); S.sfxVol.connect(out); S.sfxRev.connect(revIn);
  }
  function stopAll() {
    if (!S) return;
    var old = S, t = AC.currentTime;
    S = null;
    [old.musVol, old.musRev, old.sfxVol, old.sfxRev].forEach(function (g) { g.gain.cancelScheduledValues(t); g.gain.setTargetAtTime(0, t, 0.03); });
    setTimeout(function () {
      old.nodes.forEach(function (n) { try { n.stop(); } catch (e) {} try { n.disconnect(); } catch (e) {} });
      [old.musVol, old.musRev, old.sfxVol, old.sfxRev].forEach(function (g) { try { g.disconnect(); } catch (e) {} });
    }, 160);
  }
  function W(t) { return ctxStart + (t - T0); }       // video time -> audio-clock time

  // ---- pad chords ----
  function envAt(t, a, b, atk, rel) {
    var x;
    if (t < a) return 0;
    if (t < a + atk) { x = (t - a) / atk; return x * x * (3 - 2 * x); }
    if (t < b) return 1;
    if (t < b + rel) { x = (t - b) / rel; x = x * x * (3 - 2 * x); return 1 - x; }
    return 0;
  }
  function padNote(m, a, b, peak, pan, lpf, lfoGain) {
    var atk = 3.4, rel = 5.2, tEnd = b + rel;
    if (tEnd <= T0 || a >= DUR) return;
    var tS = Math.max(a, T0), f = mtof(m), g = AC.createGain(), lp = AC.createBiquadFilter();
    lp.type = 'lowpass'; lp.frequency.value = lpf; lp.Q.value = 0.5;
    if (lfoGain) lfoGain.connect(lp.frequency);
    [['sawtooth', -7, 0.45], ['sawtooth', 8, 0.45], ['sine', 0, 0.8]].forEach(function (o) {
      var os = AC.createOscillator(), og = gainN(o[2]);
      os.type = o[0]; os.frequency.value = f; os.detune.value = o[1];
      os.connect(og); og.connect(lp);
      os.start(W(tS)); os.stop(W(tEnd) + 0.1); S.nodes.push(os);
    });
    lp.connect(g);
    g.gain.setValueAtTime(envAt(tS, a, b, atk, rel) * peak, W(tS));
    for (var t = Math.ceil(tS * 2) / 2 + 0.5; t < tEnd; t += 0.5) g.gain.linearRampToValueAtTime(envAt(t, a, b, atk, rel) * peak, W(t));
    g.gain.linearRampToValueAtTime(0, W(tEnd));
    route(panTo(g, pan), 'mus', 0.55, 0.8);
  }
  function startScore() {
    DATA.chords.forEach(function (c, ci) {
      var a = c[0], b = c[1], ch = CHORDS[c[2]];
      if (b + 5.2 <= T0) return;
      var lfo = AC.createOscillator(), lg = gainN(190);
      lfo.frequency.value = 0.055 + 0.02 * (ci % 3); lfo.connect(lg); lfo.start(W(Math.max(T0, a))); lfo.stop(W(b + 5.4)); S.nodes.push(lfo);
      var pans = [-0.55, 0.45, -0.25, 0.6, -0.4, 0.25];
      ch.forEach(function (m, i) { padNote(m, a + i * 0.45, b + 1.2, (i === 0 ? 0.075 : 0.05) * (1 - i * 0.04), pans[i], 780 + i * 60, lg); });
      // a very low breathing sine under the root
      var so = AC.createOscillator(), sg = AC.createGain(), tS = Math.max(a, T0);
      so.frequency.value = mtof(ch[0] - ((MUS.tr || 0) < 0 ? 0 : 12)); so.type = 'sine';
      so.connect(sg); sg.gain.setValueAtTime(envAt(tS, a, b + 1.2, 3, 5) * 0.08, W(tS));
      for (var t = Math.ceil(tS * 2) / 2 + 0.5; t < b + 6.4; t += 0.5) sg.gain.linearRampToValueAtTime(envAt(t, a, b + 1.2, 3, 5) * 0.08, W(t));
      sg.gain.linearRampToValueAtTime(0, W(b + 6.4)); route(sg, 'mus', 0.8, 0.1);
      so.start(W(tS)); so.stop(W(b + 6.5)); S.nodes.push(so);
    });
  }

  // ---- textures (beds) ----
  function bedLevel(sp, t) {
    var v = 0, p = sp.pts;
    if (sp.fn) v = sp.fn(t);
    else if (p && p.length) {
      if (t <= p[0][0]) v = p[0][1]; else if (t >= p[p.length - 1][0]) v = p[p.length - 1][1];
      else for (var i = 1; i < p.length; i++) if (t <= p[i][0]) { v = mix(p[i - 1][1], p[i][1], (t - p[i - 1][0]) / Math.max(1e-6, p[i][0] - p[i - 1][0])); break; }
    }
    return v * clamp((t - sp.t0) / Math.max(0.01, sp.fi)) * clamp((sp.t1 - t) / Math.max(0.01, sp.fo));
  }
  function ballState(t) {
    var sc = sc_('s2'), lt = t - sc.s;
    if (lt < 0) return [0, 0];
    var S2 = lt < HILL.L[7] ? HILL.A : HILL.B, j = simAt(S2, lt), v = Math.abs(S2.V[j]);
    return [150 + 820 * v, Math.min(1, v * 2.6)];
  }
  function startBed(sp) {
    if (sp.t1 <= T0 || sp.t0 >= DUR) return;
    var tS = Math.max(sp.t0, T0), g = AC.createGain(), step = 0.2, t, src, filt, osc, i;
    function sched(gn, mul, fnl) {
      gn.gain.setValueAtTime(fnl(tS) * mul, W(tS));
      for (t = Math.ceil(tS / step) * step + step; t < sp.t1; t += step) gn.gain.linearRampToValueAtTime(fnl(t) * mul, W(t));
      gn.gain.linearRampToValueAtTime(0, W(sp.t1));
    }
    function loopSrc(buf, off) {
      var s = AC.createBufferSource(); s.buffer = buf; s.loop = true;
      s.start(W(tS), (off || 0) % buf.duration); s.stop(W(sp.t1) + 0.1); S.nodes.push(s); return s;
    }
    var lv = function (tt) { return bedLevel(sp, tt); };
    if (sp.k === 'crackle') {
      src = loopSrc(bufs.crackle, tS - sp.t0); src.connect(g); sched(g, 1, lv); route(g, 'sfx', 0.85, 0.3);
    } else if (sp.k === 'roar') {
      src = loopSrc(bufs.brown, tS - sp.t0); filt = AC.createBiquadFilter(); filt.type = 'lowpass'; filt.frequency.value = 300; filt.Q.value = 0.7;
      src.connect(filt); filt.connect(g); sched(g, 1.6, lv); route(g, 'sfx', 0.9, 0.2);
    } else if (sp.k === 'wind') {
      src = loopSrc(bufs.pink, tS - sp.t0 + 1.3); filt = AC.createBiquadFilter(); filt.type = 'bandpass'; filt.frequency.value = 520; filt.Q.value = 0.9;
      var lf = AC.createOscillator(), lg = gainN(260); lf.frequency.value = 0.09; lf.connect(lg); lg.connect(filt.frequency); lf.start(W(tS)); lf.stop(W(sp.t1) + 0.1); S.nodes.push(lf);
      var pl = AC.createOscillator(), pg = gainN(0.55), pan = AC.createStereoPanner(); pl.frequency.value = 0.05; pl.connect(pg); pg.connect(pan.pan); pl.start(W(tS)); pl.stop(W(sp.t1) + 0.1); S.nodes.push(pl);
      src.connect(filt); filt.connect(g); g.connect(pan); sched(g, 2.4, lv); route(pan, 'sfx', 0.7, 0.5);
    } else if (sp.k === 'shimmer') {
      [880, 1108.7, 1318.5, 1760, 987.8, 2217.5].forEach(function (f, n) {
        var o = AC.createOscillator(), og = AC.createGain(), tr = AC.createOscillator(), trg = gainN(0.5 + 0.1 * n);
        o.type = 'sine'; o.frequency.value = f; o.detune.value = (n - 2) * 3; tr.frequency.value = 0.11 + 0.043 * n; og.gain.value = 0.5;
        tr.connect(trg); trg.connect(og.gain); o.connect(og); og.connect(g);
        o.start(W(tS)); o.stop(W(sp.t1) + 0.1); tr.start(W(tS)); tr.stop(W(sp.t1) + 0.1); S.nodes.push(o, tr);
      });
      sched(g, 0.075, lv); route(panTo(g, 0), 'mus', 0.25, 1.0);
    } else if (sp.k === 'ball') {
      var o1 = AC.createOscillator(), o2 = AC.createOscillator(), og1 = gainN(0.8), og2 = gainN(0.25), bg = AC.createGain();
      o1.type = 'sine'; o2.type = 'triangle'; o1.connect(og1); o2.connect(og2); og1.connect(bg); og2.connect(bg); bg.connect(g);
      var f0 = ballState(tS); o1.frequency.setValueAtTime(f0[0], W(tS)); o2.frequency.setValueAtTime(f0[0] * 2.003, W(tS)); bg.gain.setValueAtTime(f0[1] * 0.1, W(tS));
      for (t = tS + 0.025; t < sp.t1; t += 0.025) {
        var st = ballState(t);
        o1.frequency.linearRampToValueAtTime(st[0], W(t)); o2.frequency.linearRampToValueAtTime(st[0] * 2.003, W(t)); bg.gain.linearRampToValueAtTime(st[1] * 0.1, W(t));
      }
      o1.start(W(tS)); o2.start(W(tS)); o1.stop(W(sp.t1) + 0.1); o2.stop(W(sp.t1) + 0.1); S.nodes.push(o1, o2);
      sched(g, 1, lv); route(g, 'sfx', 0.45, 0.9);
    }
  }

  // ---- one-shot voices ----
  function tone(type, f0, f1, t, a, d, peak, bus, dry, wet, pan) {
    var o = AC.createOscillator(), g = AC.createGain();
    f0 *= TR; f1 *= TR;
    o.type = type; o.frequency.setValueAtTime(f0, t);
    if (f1 !== f0) o.frequency.exponentialRampToValueAtTime(f1, t + a + d);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(peak, t + a); g.gain.exponentialRampToValueAtTime(0.0001, t + a + d);
    o.connect(g); route(panTo(g, pan), bus, dry, wet); o.start(t); o.stop(t + a + d + 0.05);
  }
  function nz(kind, f0, f1, t, dur, peak, atk, bus, dry, wet, pan, Q) {
    var s = AC.createBufferSource(), f = AC.createBiquadFilter(), g = AC.createGain();
    s.buffer = bufs.white; s.loop = true; f.type = kind; f.Q.value = Q || 1;
    f.frequency.setValueAtTime(f0, t); if (f1 !== f0) f.frequency.exponentialRampToValueAtTime(f1, t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(peak, t + atk); g.gain.exponentialRampToValueAtTime(0.0001, t + dur + 0.05);
    s.connect(f); f.connect(g); route(panTo(g, pan), bus, dry, wet);
    s.start(t, (t * 7.13) % 3); s.stop(t + dur + 0.1);
  }
  function bellAt(f, t, vel, pan, bus, wet) {
    f *= TR;
    [[1, 1, 3.4], [2.0, 0.34, 2.2], [2.76, 0.22, 1.5], [4.1, 0.09, 0.9]].forEach(function (p) {
      var o = AC.createOscillator(), g = AC.createGain();
      o.type = 'sine'; o.frequency.value = f * p[0];
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vel * p[1], t + 0.006); g.gain.exponentialRampToValueAtTime(0.0001, t + p[2]);
      o.connect(g); route(panTo(g, pan), bus || 'mus', 0.35, wet == null ? 1.0 : wet); o.start(t); o.stop(t + p[2] + 0.05);
    });
  }
  var SFX = {
    bell: function (t, a) { bellAt(a[0], t, a[1], (a[0] % 7 - 3.5) / 8, 'mus'); },
    whoosh: function (t) { nz('bandpass', 260, 2600, t, 1.0, 0.2, 0.45, 'sfx', 0.5, 0.9, -0.3, 0.8); },
    riser: function (t) {
      nz('highpass', 700, 9000, t, 1.35, 0.2, 1.2, 'sfx', 0.35, 1.0, 0, 0.7);
      tone('sine', 220, 880, t, 1.2, 0.15, 0.05, 'sfx', 0.4, 1.0, -0.3); tone('sine', 330, 1320, t, 1.2, 0.15, 0.04, 'sfx', 0.4, 1.0, 0.3);
      tone('sine', 110, 440, t, 1.2, 0.15, 0.06, 'sfx', 0.5, 0.8, 0);
    },
    boom: function (t) {
      tone('sine', 96, 38, t, 0.006, 2.3, 0.6, 'sfx', 1.0, 0.25, 0);
      tone('triangle', 190, 62, t, 0.006, 0.7, 0.2, 'sfx', 0.9, 0.4, 0);
      nz('lowpass', 900, 70, t, 0.9, 0.35, 0.01, 'sfx', 0.8, 0.5, 0, 0.7);
      bellAt(587.33, t + 0.02, 0.2, -0.3, 'sfx', 1.2); bellAt(880, t + 0.05, 0.16, 0.3, 'sfx', 1.2); bellAt(1479.98, t + 0.09, 0.1, 0, 'sfx', 1.2);
    },
    bond: function (t) {
      tone('sine', 210, 76, t, 0.004, 0.38, 0.4, 'sfx', 1.0, 0.4, 0);
      bellAt(1568, t + 0.005, 0.2, 0.2, 'sfx', 1.0); bellAt(2349, t + 0.03, 0.08, -0.2, 'sfx', 1.0);
      nz('highpass', 5000, 5000, t, 0.16, 0.05, 0.004, 'sfx', 0.6, 0.6, 0, 0.7);
    },
    repel: function (t) {
      tone('sine', 520, 230, t, 0.004, 0.3, 0.22, 'sfx', 0.9, 0.7, 0.3);
      nz('bandpass', 900, 500, t, 0.13, 0.08, 0.005, 'sfx', 0.7, 0.5, 0.3, 1.2);
    },
    pop: function (t) { tone('sine', 560, 1050, t, 0.004, 0.12, 0.16, 'sfx', 0.7, 0.9, 0); },
    soft: function (t) { bellAt(880, t, 0.12, -0.2, 'sfx'); bellAt(1318.5, t + 0.09, 0.09, 0.2, 'sfx'); },
    ding: function (t) { bellAt(1174.66, t, 0.24, 0, 'sfx'); tone('sine', 150, 70, t, 0.004, 0.3, 0.25, 'sfx', 1.0, 0.2, 0); },
    hit: function (t) {
      tone('sine', 100, 44, t, 0.004, 0.8, 0.55, 'sfx', 1.0, 0.3, 0); bellAt(660, t, 0.2, 0, 'sfx');
      nz('lowpass', 1200, 90, t, 0.5, 0.25, 0.006, 'sfx', 0.8, 0.5, 0, 0.7);
    },
    spark: function (t, f) { bellAt(f || 1760, t, 0.075, ((f || 1760) % 9 - 4.5) / 6, 'sfx', 1.1); },
    tick: function (t, a) { nz('highpass', 4200, 4200, t, 0.012, 0.05 * (a || 1), 0.001, 'sfx', 1.0, 0.25, ((t * 31) % 1) - 0.5, 0.7); },
    flash: function (t) {
      nz('lowpass', 1400, 60, t, 1.0, 0.65, 0.02, 'sfx', 1.0, 0.5, 0, 0.7);
      tone('sine', 72, 34, t, 0.01, 1.3, 0.6, 'sfx', 1.0, 0.3, 0);
      nz('bandpass', 700, 4200, t, 0.7, 0.14, 0.18, 'sfx', 0.5, 1.0, 0, 0.8);
    },
    thump: function (t) { tone('sine', 120, 48, t, 0.005, 0.7, 0.5, 'sfx', 1.0, 0.3, 0); bellAt(392, t, 0.22, 0, 'sfx', 1.2); bellAt(587.33, t + 0.07, 0.12, 0.3, 'sfx', 1.2); },
    photon: function (t) { bellAt(2349.3, t, 0.16, 0.3, 'sfx', 1.1); nz('highpass', 7000, 7000, t, 0.22, 0.06, 0.003, 'sfx', 0.6, 0.8, 0.3, 0.7); },
    bubble: function (t, f) { tone('sine', f || 600, (f || 600) * 1.7, t, 0.003, 0.11, 0.13, 'sfx', 0.6, 1.0, ((f || 600) % 5 - 2.5) / 3); },
    grow: function (t) { tone('triangle', 220, 330, t, 0.9, 1.3, 0.07, 'sfx', 0.5, 1.2, 0); tone('sine', 440, 660, t, 0.9, 1.3, 0.05, 'sfx', 0.5, 1.2, 0.3); },
    sun: function (t) {
      [[146.83, -0.4], [220, 0.3], [293.66, -0.2], [369.99, 0.4], [440, 0], [587.33, 0.2]].forEach(function (p, n) {
        tone('sine', p[0], p[0], t + n * 0.18, 2.6, 3.4, 0.045, 'mus', 0.4, 1.2, p[1]);
      });
    }
  };
  function scheduleCues(tNow, dt) {
    var hz = tNow + LOOK;
    if (AC && S && dt < 0.5) {
      for (var i = 0; i < CUES.length; i++) {
        var ct = CUES[i][0];
        if (ct > schedT && ct <= hz) {
          var at = W(ct);
          if (at < AC.currentTime) at = AC.currentTime + 0.005;
          if (SFX[CUES[i][1]]) SFX[CUES[i][1]](at, CUES[i][2]);
        }
      }
    }
    schedT = hz;
  }

  // ---- music bed (the track in #musicdata), re-arranged by whole bars to fit this video's length ----
  var VBEAT0 = MUS.beat0, VBAR = MUS.bar, vibeBuf = null, vibeBytes = null, vibeLoading = false;
  var VSEGS = DATA.vsegs;   // [video bar, track bar, bars], planned in script_fire.music_plan()
  try {
    var vtxt = document.getElementById('musicdata'), vbin = atob(vtxt.textContent.replace(/\s+/g, ''));
    var vu8 = new Uint8Array(vbin.length);
    for (var vi = 0; vi < vbin.length; vi++) vu8[vi] = vbin.charCodeAt(vi);
    vibeBytes = vu8.buffer;
  } catch (e) { vibeBytes = null; }
  function loadVibe() {
    if (!AC || !vibeBytes || vibeBuf || vibeLoading) return;
    vibeLoading = true;
    new Promise(function (res, rej) { var p = AC.decodeAudioData(vibeBytes.slice(0), res, rej); if (p && p.then) p.then(res, rej); })
      .then(function (b) { vibeBuf = b; if (typeof playing !== 'undefined' && playing) resync(); })
      .catch(function () { vibeLoading = false; });
  }
  function startVibe() {
    if (!AC || !vibeBuf || !S) return;
    var X = 0.15, vg = gainN(0.29), lp = AC.createBiquadFilter(), env = AC.createGain();
    lp.type = 'lowpass'; lp.frequency.value = 11000;
    env.connect(lp); lp.connect(vg); vg.connect(S.musVol); S.nodes.push(env, lp, vg);
    VSEGS.forEach(function (sg, idx) {
      var vs = sg[0] * VBAR, ve = (sg[0] + sg[2]) * VBAR;
      if (ve <= T0 || vs >= DUR) return;
      var begin = Math.max(vs, T0), early = (begin === vs && idx > 0) ? X : 0;
      var off = VBEAT0 + sg[1] * VBAR + (begin - vs) - early, endV = Math.min(ve, DUR + 0.15), when = W(begin - early);
      var s = AC.createBufferSource(), g = AC.createGain();
      s.buffer = vibeBuf; s.connect(g); g.connect(env);
      if (early) { g.gain.setValueAtTime(0, when); g.gain.linearRampToValueAtTime(1, when + X); } else g.gain.setValueAtTime(1, when);
      if (idx < VSEGS.length - 1 && ve < DUR) { var fo = W(ve); if (fo - X > when) { g.gain.setValueAtTime(1, fo - X); g.gain.linearRampToValueAtTime(0, fo); } }
      s.start(when, Math.max(0, off), endV - (begin - early));
      S.nodes.push(s, g);
    });
    var ge = env.gain, fadeFrom = DUR - 3;
    ge.cancelScheduledValues(0);
    ge.setValueAtTime(T0 > 0.5 ? 1 : 0.0001, ctxStart);
    if (T0 <= 0.5) ge.linearRampToValueAtTime(1, ctxStart + 0.6);
    if (T0 < fadeFrom) ge.setValueAtTime(1, W(fadeFrom));
    ge.linearRampToValueAtTime(0.0001, W(DUR));
  }
  function startAudio() {
    stopAll();
    if (!AC || !bufs) return;
    newSession();
    loadVibe();
    startVibe();
    startScore();
    BEDS.forEach(startBed);
    var fadeFrom = DUR - 2.4, ge = out.gain;
    ge.cancelScheduledValues(0);
    ge.setValueAtTime(T0 > 0.5 ? OUTG : 0.0001, ctxStart);
    ge.linearRampToValueAtTime(OUTG, ctxStart + (T0 > 0.5 ? 0.05 : 1.6));
    if (T0 < fadeFrom) ge.setValueAtTime(OUTG, W(fadeFrom));
    ge.linearRampToValueAtTime(0.0001, W(DUR));
  }
  // offline export hook (used by the video renderer only)
  window.__renderAudio = async function () {
    var sr = 44100, ctx = new OfflineAudioContext(2, Math.ceil(sr * DUR), sr);
    buildGraph(ctx); T0 = 0; ctxStart = 0; newSession();
    startScore(); BEDS.forEach(startBed);
    var ge = out.gain; ge.setValueAtTime(0.0001, 0); ge.linearRampToValueAtTime(OUTG, 1.6); ge.setValueAtTime(OUTG, DUR - 2.4); ge.linearRampToValueAtTime(0.0001, DUR);
    CUES.forEach(function (c) { if (SFX[c[1]]) SFX[c[1]](c[0], c[2]); });
    var res = await ctx.startRendering();
    var L = res.getChannelData(0), R = res.getChannelData(1), n = L.length;
    var bytes = new Uint8Array(44 + n * 4), dv = new DataView(bytes.buffer);
    function w4(o, str) { for (var i = 0; i < 4; i++) bytes[o + i] = str.charCodeAt(i); }
    w4(0, 'RIFF'); dv.setUint32(4, 36 + n * 4, true); w4(8, 'WAVE'); w4(12, 'fmt ');
    dv.setUint32(16, 16, true); dv.setUint16(20, 1, true); dv.setUint16(22, 2, true);
    dv.setUint32(24, sr, true); dv.setUint32(28, sr * 4, true); dv.setUint16(32, 4, true); dv.setUint16(34, 16, true);
    w4(36, 'data'); dv.setUint32(40, n * 4, true);
    var o = 44;
    for (var i = 0; i < n; i++) {
      var a = Math.max(-1, Math.min(1, L[i])), b = Math.max(-1, Math.min(1, R[i]));
      dv.setInt16(o, a < 0 ? a * 32768 : a * 32767, true); dv.setInt16(o + 2, b < 0 ? b * 32768 : b * 32767, true); o += 4;
    }
    var bin = '', CH = 0x8000;
    for (var p = 0; p < bytes.length; p += CH) bin += String.fromCharCode.apply(null, bytes.subarray(p, p + CH));
    return btoa(bin);
  };
