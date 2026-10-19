import base64, sys
SP = sys.argv[1]
s = open(sys.argv[2], encoding='utf-8').read()
hook = r'''
  // ---- render hooks (offline video export only) ----
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
  window.__renderAudio = async function () {
    var sr = 44100, ctx = new OfflineAudioContext(2, Math.ceil(sr * DUR), sr);
    AC = ctx; noiseBuf = null;
    master = ctx.createGain(); master.gain.value = 0.55;
    var comp = ctx.createDynamicsCompressor(); master.connect(comp); comp.connect(ctx.destination);
    musicEnv = ctx.createGain(); musicVol = ctx.createGain(); musicVol.gain.value = 0.6;
    musicEnv.connect(musicVol); musicVol.connect(master);
    musicBuf = await ctx.decodeAudioData(musicBytes.slice(0));
    T0 = 0; ctxStart = 0; startMusic();
    CUES.forEach(function (c) { SFX[c[1]](c[0]); });
    COUNTS.forEach(function (w) {
      var n = -1;
      for (var t = w[0]; t < w[0] + w[1]; t += 1 / 60) {
        var e = 1 - Math.pow(1 - clamp((t - w[0]) / w[1]), 3), st = Math.floor(e * 24);
        if (st > n) { n = st; SFX.tick(t, e); }
      }
    });
    var out = await ctx.startRendering();
    var L = out.getChannelData(0), R = out.getChannelData(1), n = L.length;
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
'''
marker = "\n  if (document.fonts && document.fonts.ready)"
assert s.count(marker) == 1
s = s.replace(marker, hook + marker)
b = base64.b64encode(open(SP + '/audio_in/vibe.mp3', 'rb').read()).decode()
s = s.replace('@@MUSIC@@', b)
open(SP + '/render_ice/render.html', 'w', encoding='utf-8').write(s)
print('render.html', len(s) / 1e6, 'MB')
