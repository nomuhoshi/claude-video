  // ================= quiet isometric dusk world behind every scene =================
  var MVC = document.createElement('canvas');
  MVC.className = 'mvbg';
  MVC.style.cssText = 'position:absolute;left:0;top:0;width:100%;height:100%;display:block;';
  frame.insertBefore(MVC, frame.firstChild);
  var MVG = MVC.getContext('2d');
  // palettes: sky top, sky mid, horizon glow, sun, stone light, stone mid, stone dark, ground
  var MVP = [
    { top: [24, 22, 52], mid: [86, 56, 102], hor: [214, 132, 112], sun: [255, 196, 150], s1: [236, 178, 160], s2: [168, 108, 132], s3: [96, 62, 98], gr: [22, 18, 36] },   // warm dusk
    { top: [14, 34, 48], mid: [40, 92, 104], hor: [140, 206, 186], sun: [220, 250, 230], s1: [178, 226, 214], s2: [92, 156, 158], s3: [44, 92, 104], gr: [10, 24, 32] },     // teal
    { top: [22, 26, 66], mid: [60, 74, 136], hor: [160, 178, 232], sun: [230, 236, 255], s1: [194, 204, 246], s2: [120, 132, 196], s3: [64, 72, 132], gr: [14, 16, 40] },     // lavender
    { top: [34, 22, 54], mid: [110, 62, 110], hor: [238, 172, 122], sun: [255, 222, 160], s1: [246, 196, 170], s2: [178, 116, 136], s3: [104, 64, 100], gr: [26, 18, 34] }  // pink gold
  ];
  function mvKey(k) { return scenes[IDX[k]] ? scenes[IDX[k]].s : 0; }
  var MV_SECT = [[0, 0], [mvKey('ch3'), 1], [mvKey('ch5'), 2], [mvKey('ch7'), 3]];
  function mvPal(T) {
    var p = MVP[0], i;
    for (i = 1; i < MV_SECT.length; i++) {
      var t0 = MV_SECT[i][0];
      if (T >= t0 - 1.2) {
        var f = clamp((T - t0 + 1.2) / 2.4); f = f * f * (3 - 2 * f);
        p = mvMix(MVP[MV_SECT[i - 1][1]], MVP[MV_SECT[i][1]], f);
        if (f < 1) break;
      }
    }
    return p;
  }
  function mvMix(a, b, f) { var o = {}, k; for (k in a) o[k] = [mix(a[k][0], b[k][0], f), mix(a[k][1], b[k][1], f), mix(a[k][2], b[k][2], f)]; return o; }
  function rgb(c, a) { return 'rgba(' + Math.round(c[0]) + ',' + Math.round(c[1]) + ',' + Math.round(c[2]) + ',' + (a == null ? 1 : a) + ')'; }
  function shade(c, f) { return [c[0] * f, c[1] * f, c[2] * f]; }
  // an isometric block: (cx, ty) = centre of its top face; hw = half width; h = height
  function isoBlock(g, cx, ty, hw, h, p, a, glowTop) {
    if (a <= 0.003) return;
    var hd = hw * 0.5;
    g.save(); g.globalAlpha *= a;
    g.fillStyle = rgb(p.s2); g.beginPath(); g.moveTo(cx - hw, ty); g.lineTo(cx, ty + hd); g.lineTo(cx, ty + hd + h); g.lineTo(cx - hw, ty + h); g.closePath(); g.fill();
    g.fillStyle = rgb(p.s3); g.beginPath(); g.moveTo(cx, ty + hd); g.lineTo(cx + hw, ty); g.lineTo(cx + hw, ty + h); g.lineTo(cx, ty + hd + h); g.closePath(); g.fill();
    g.fillStyle = rgb(p.s1); g.beginPath(); g.moveTo(cx, ty - hd); g.lineTo(cx + hw, ty); g.lineTo(cx, ty + hd); g.lineTo(cx - hw, ty); g.closePath(); g.fill();
    if (glowTop) { g.strokeStyle = 'rgba(255,255,255,0.35)'; g.lineWidth = 0.15; g.stroke(); }
    g.restore();
  }
  // a long slab seen from the front-left: top strip + front face + right end
  function isoSlab(g, x0, x1, y, dep, h, p, a) {
    if (a <= 0.003) return;
    var dy = dep * 0.5;
    g.save(); g.globalAlpha *= a;
    var fg = g.createLinearGradient(0, y, 0, y + h); fg.addColorStop(0, rgb(shade(p.s3, 0.78))); fg.addColorStop(1, rgb(shade(p.s3, 0.35), 0.9));
    g.fillStyle = fg; g.fillRect(x0, y, x1 - x0, h);
    g.fillStyle = rgb(shade(p.s3, 0.55)); g.beginPath(); g.moveTo(x1, y); g.lineTo(x1 + dep, y - dy); g.lineTo(x1 + dep, y - dy + h); g.lineTo(x1, y + h); g.closePath(); g.fill();
    g.fillStyle = rgb(p.s2, 0.9); g.beginPath(); g.moveTo(x0, y); g.lineTo(x1, y); g.lineTo(x1 + dep, y - dy); g.lineTo(x0 + dep, y - dy); g.closePath(); g.fill();
    g.strokeStyle = rgb(p.s1, 0.55); g.lineWidth = 0.15; g.beginPath(); g.moveTo(x0, y); g.lineTo(x1, y); g.lineTo(x1 + dep, y - dy); g.stroke();
    g.restore();
  }
  var MV_P = null;           // current palette, also used by scene draws
  function mvStage(g, x0, x1, y, h) { if (MV_P) isoSlab(g, x0, x1, y, 4, h, MV_P, 1); }
  function mvPillar(g, cx, ty, hw, h, a) { if (MV_P) isoBlock(g, cx, ty, hw, h, MV_P, a, true); }
  // far architecture (all original shapes): stepped towers, an arch gate, floating stairs, a lone cube
  function mvWorld(g, T, p) {
    var dr = Math.sin(T * 0.025) * 0.8, a = 0.5;
    function far(c) { return mvMix({ c: c }, { c: p.mid }, 0.45).c; }
    var fp = { s1: far(p.s1), s2: far(p.s2), s3: far(p.s3) };
    // left stepped tower
    var lx = 7 + dr;
    isoBlock(g, lx, 33, 6.5, 9, fp, a); isoBlock(g, lx, 26.5, 4.8, 6.5, fp, a); isoBlock(g, lx, 21.5, 3.2, 5, fp, a); isoBlock(g, lx, 17.6, 1.6, 3.6, fp, a);
    // right slender tower with a window
    var rx = 93 - dr;
    isoBlock(g, rx, 31, 4.2, 12, fp, a); isoBlock(g, rx, 20, 3.2, 11, fp, a); isoBlock(g, rx, 13.5, 2.2, 6.5, fp, a);
    g.save(); g.globalAlpha *= a * 0.9; g.fillStyle = rgb(p.sun, 0.75); g.beginPath(); g.moveTo(rx + 1.0, 22.6); g.lineTo(rx + 2.2, 22.0); g.lineTo(rx + 2.2, 26.0); g.lineTo(rx + 1.0, 26.6); g.closePath(); g.fill(); g.restore();
    // floating stairs (upper left), drifting slowly
    var sy = 9 + Math.sin(T * 0.4) * 0.5, sx = 20 + dr * 0.6;
    for (var i = 0; i < 5; i++) isoBlock(g, sx + i * 2.2, sy - i * 1.1 + i * 1.1 * 0.0 + i * 0.0, 1.6, 1.1 + i * 0.0, fp, a * 0.8);
    // lone floating cube (upper right)
    var cy = 8 + Math.sin(T * 0.5 + 1) * 0.6;
    isoBlock(g, 80 - dr * 0.5, cy, 1.8, 1.8, fp, a * 0.8);
    // arch gate on the horizon
    var gx = 38 + dr * 0.3, gy = 38.5;
    isoBlock(g, gx - 3.4, gy - 6, 1.1, 6, fp, a * 0.7); isoBlock(g, gx + 3.4, gy - 6, 1.1, 6, fp, a * 0.7); isoBlock(g, gx, gy - 7.2, 4.6, 1.2, fp, a * 0.7);
  }
  function mvMonument(g, T, p) {
    // a little tower rising behind each chapter word
    for (var i = 0; i < scenes.length; i++) {
      var sc = scenes[i]; if (!sc.el.classList.contains('chap')) continue;
      var lt = T - sc.s; if (lt < -0.2 || T > sc.e + 0.4) continue;
      var up = eio(clamp(lt / 1.3)), out = 1 - clamp((T - sc.e + 0.4) / 0.5);
      var base = 52 - 20 * up;
      isoBlock(g, 50, base, 8, 10, p, out); isoBlock(g, 50, base - 5.2, 5.2, 5.2, p, out); isoBlock(g, 50, base - 9.2, 3, 4, p, out);
      halo(g, 50, base - 11, 6, rgb(p.sun, 0.6), out * up);
    }
  }
  function mvDraw(T) {
    var w = frame.clientWidth || 1120, dpr = Math.min(2, window.devicePixelRatio || 1), W = Math.round(w * dpr), H = Math.round(w * dpr * 9 / 16);
    if (MVC.width !== W || MVC.height !== H) { MVC.width = W; MVC.height = H; }
    var g = MVG, k = W / 100, p = mvPal(T), HY = 39;
    MV_P = p;
    g.setTransform(k, 0, 0, k, 0, 0);
    var sky = g.createLinearGradient(0, 0, 0, HY);
    sky.addColorStop(0, rgb(p.top)); sky.addColorStop(0.62, rgb(p.mid)); sky.addColorStop(1, rgb(p.hor));
    g.fillStyle = sky; g.fillRect(0, 0, 100, HY + 0.2);
    // sun
    halo(g, 60, HY - 3, 20, rgb(p.sun, 0.3), 1); dot(g, 60, HY - 3, 3.0, rgb(p.sun, 0.32), 1);
    // ground / still water
    var gr = g.createLinearGradient(0, HY, 0, 56.25);
    gr.addColorStop(0, rgb(mvMix({ c: p.hor }, { c: p.gr }, 0.55).c)); gr.addColorStop(0.35, rgb(p.gr)); gr.addColorStop(1, rgb(shade(p.gr, 0.7)));
    g.fillStyle = gr; g.fillRect(0, HY, 100, 56.25 - HY);
    for (var i = 0; i < 6; i++) { var yy = HY + 1 + i * i * 0.5; ln(g, 52 + Math.sin(T * 0.6 + i) * 2 - (8 - i), yy, 76 - Math.sin(T * 0.5 + i) * 2 + (8 - i), yy, rgb(p.sun, 0.18 - i * 0.025), 0.15, null, 1); }
    mvWorld(g, T, p);
    // fog band over the horizon
    var fog = g.createLinearGradient(0, HY - 9, 0, HY + 4);
    fog.addColorStop(0, rgb(p.hor, 0)); fog.addColorStop(0.6, rgb(p.hor, 0.28)); fog.addColorStop(1, rgb(p.hor, 0));
    g.fillStyle = fog; g.fillRect(0, HY - 9, 100, 13);
    // dust motes
    var r = rng(5);
    for (i = 0; i < 26; i++) { var mx = (r() * 100 + T * (0.3 + r() * 0.5)) % 100, my = 4 + r() * 40 + Math.sin(T * 0.3 + i) * 0.8; dot(g, mx, my, 0.12 + r() * 0.12, rgb(p.sun, 0.25 + 0.35 * r()), 1); }
    mvMonument(g, T, p);
    // keep the middle readable: a soft darkening behind the content area
    var vg = g.createRadialGradient(50, 27, 10, 50, 27, 62);
    vg.addColorStop(0, 'rgba(8,8,18,0.28)'); vg.addColorStop(1, 'rgba(8,8,18,0.05)');
    g.fillStyle = vg; g.fillRect(0, 0, 100, 56.25);
  }
