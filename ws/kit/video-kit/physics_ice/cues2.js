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
