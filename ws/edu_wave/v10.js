// 视频 10：気柱の共鳴（課本 110–111 页）→ 10 幕，无配乐，第 0 帧显示主题文字
const GOLD = C.gold, BLU = C.blue, PUR = C.purple, RED = C.red, GRN = C.green;
function person(g, x, y, sc = 1, col = C.ink, a = 1) {
  g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.fillStyle = col; g.lineWidth = 5 * sc; g.lineCap = 'round';
  g.beginPath(); g.arc(x, y - 78 * sc, 13 * sc, 0, 7); g.fill();
  g.beginPath(); g.moveTo(x, y - 62 * sc); g.lineTo(x, y - 26 * sc); g.moveTo(x - 20 * sc, y - 50 * sc); g.lineTo(x + 20 * sc, y - 50 * sc);
  g.moveTo(x, y - 26 * sc); g.lineTo(x - 14 * sc, y); g.moveTo(x, y - 26 * sc); g.lineTo(x + 14 * sc, y); g.stroke(); g.restore();
}
function brace(g, x1, x2, y, col, a, w = 4) { arrow(g, (x1 + x2) / 2 - 2, y, x1, y, col, w, 14, a); arrow(g, (x1 + x2) / 2 + 2, y, x2, y, col, w, 14, a); line(g, x1, y - 12, x1, y + 12, col, w, null, a); line(g, x2, y - 12, x2, y + 12, col, w, null, a); }
function vbrace(g, y1, y2, x, col, a, w = 4) { arrow(g, x, (y1 + y2) / 2 - 2, x, y1, col, w, 14, a); arrow(g, x, (y1 + y2) / 2 + 2, x, y2, col, w, 14, a); line(g, x - 12, y1, x + 12, y1, col, w, null, a); line(g, x - 12, y2, x + 12, y2, col, w, null, a); }
function box(g, x, y, w, h, col, a, dash = false) { if (a <= 0) return; g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = 3.5; if (dash) g.setLineDash([16, 8]); g.beginPath(); g.roundRect(x, y, w, h, 18); g.stroke(); g.restore(); }
function ring(g, cx, cy, r, col, lw, a) { if (r <= 0 || a <= 0) return; g.save(); g.globalAlpha *= a; g.strokeStyle = col; g.lineWidth = lw; g.beginPath(); g.arc(cx, cy, r, 0, 7); g.stroke(); g.restore(); }

const lab = (g, t, x, y, o = {}) => txt(g, t, x, y, Object.assign({ size: 40, jp: true, w: 700, al: 'center' }, o));
const OM = 2 * Math.PI / 2.4;
// 管 + 定常波：closed=封闭（右端为底=節），n 为倍数（闭管奇数，开管整数）
function TUBE(g, o) {
  const { x0, y, L, H, closed, n, t = 0, a = 1, live = true, ext = 0 } = o, A = H / 2 * .84, Le = L + ext;
  const f = x => closed ? Math.cos(n * Math.PI * (x - (x0 - ext)) / (2 * Le)) : Math.cos(n * Math.PI * (x - (x0 - ext)) / Le);
  if (a <= 0) return;
  line(g, x0, y - H / 2, x0 + L, y - H / 2, C.ink, 5, null, a); line(g, x0, y + H / 2, x0 + L, y + H / 2, C.ink, 5, null, a); if (closed) line(g, x0 + L, y - H / 2, x0 + L, y + H / 2, C.ink, 9, null, a);
  const xs = x0 - ext, xe = x0 + L + (closed ? 0 : ext); g.save(); g.globalAlpha *= a * .9; g.fillStyle = 'rgba(255,85,119,.17)'; g.beginPath(); g.moveTo(xs, y - Math.abs(A * f(xs)));
  for (let x = xs; x <= xe; x += 4) g.lineTo(x, y - Math.abs(A * f(x))); for (let x = xe; x >= xs; x -= 4) g.lineTo(x, y + Math.abs(A * f(x))); g.closePath(); g.fill(); g.restore();
  curve(g, x => y - Math.abs(A * f(x)), xs, xe, 'rgba(255,85,119,.55)', 2.5, a, [8, 6], 4); curve(g, x => y + Math.abs(A * f(x)), xs, xe, 'rgba(255,85,119,.55)', 2.5, a, [8, 6], 4);
  if (live) curve(g, x => y - A * f(x) * Math.cos(OM * t), xs, xe, RED, 5, a, null, 3);
}
const S = [];
// 0 片头
S.push({ lines: ['对着管口吹一下，管子就“嗡——”地响起来。', '这就是「気柱の共鳴」。'], lead: 1.2,
  draw(g, lt) {
    TUBE(g, { x0: 360, y: 760, L: 1200, H: 150, closed: true, n: 1, t: lt, a: .5 });
    txt(g, '気柱の共鳴', W / 2, 330, { size: 140, jp: true, w: 900, al: 'center', a: 1, glow: 'rgba(255,85,119,.35)' });
    txt(g, '（空气柱的共鸣：闭管・开管）', W / 2, 480, { size: 54, jp: true, col: GOLD, al: 'center', a: 1, w: 700 });
  } });
// 1 三步法
S.push({ lines: ['解气柱共鸣题，按三步走。', '第 1 步：画出“口是腹、底是节”的定常波。', '第 2 步：找出波长 λ 和管长的关系。', '第 3 步：V = fλ 里的 V（音速）一定，f 和音源的振动数一致。'],
  draw(g, lt, s) {
    box(g, 220, 130, 1480, 780, RED, seg(lt, .1, .6) * .9, true); lab(g, '気柱の共鳴を解く', W / 2, 205, { size: 56, w: 800, a: seg(lt, .2, .6) });
    const it = [[330, '口が腹，底が節となる定常波を描く。', 1], [500, '波長 λ と管の長さの関係を調べる。', 2], [670, '', 3]];
    it.forEach(([y, tx, i]) => { const a = seg(lt, s.L[i], .6); dot(g, 330, y, 28, 'rgba(11,19,34,.9)', a); txt(g, `${i}`, 330, y + 1, { size: 36, w: 800, col: GOLD, al: 'center', serif: true, a }); if (tx) txt(g, tx, 400, y, { size: 46, jp: true, w: 700, col: RED, a }); });
    const a3 = seg(lt, s.L[3], .6); fm(g, 'vf', 400, 670, 62, { a: a3 }); txt(g, 'の V（音速）は一定，', 740, 670, { size: 44, jp: true, w: 700, col: RED, a: a3, al: 'left' }); txt(g, 'f は音源の振動数と一致', 740, 750, { size: 44, jp: true, w: 700, col: RED, a: a3, al: 'left' });
  } });
// 2 解説
S.push({ lines: ['气柱的共鸣，是入射波和反射波重叠形成了定常波。', '声波是纵波，所以空气像图中那样沿 ←→ 方向振动。', '但管子封闭的底部，空气想振动也动不了，所以底部的位移始终是 0，也就是节。', '反射当然是固定端反射。', '另一方面，管口的空气可以自由活动，所以管口是腹。'],
  draw(g, lt, s) {
    const x0 = 300, L = 1300, y0 = 540, H = 220, a0 = seg(lt, .2, .6), a1 = seg(lt, s.L[1], .6), a2 = seg(lt, s.L[2], .6), a3 = seg(lt, s.L[3], .6), a4 = seg(lt, s.L[4], .6);
    line(g, x0, y0 - H / 2, x0 + L, y0 - H / 2, C.ink, 5, null, a0); line(g, x0, y0 + H / 2, x0 + L, y0 + H / 2, C.ink, 5, null, a0); line(g, x0 + L, y0 - H / 2, x0 + L, y0 + H / 2, C.ink, 10, null, a0);
    curve(g, x => 300 - 18 * Math.sin((x - 300) / 38 - lt * 5), x0 + 60, x0 + L - 100, RED, 4, a0, null, 3); arrow(g, x0 + L - 90, 300, x0 + L - 40, 300, RED, 4, 16, a0); lab(g, '入射波', x0 + 140, 245, { a: a0, size: 38, col: RED });
    const a01 = seg(lt, s.L[0] + .5, .6); curve(g, x => 790 - 18 * Math.sin((x - 300) / 38 + lt * 5), x0 + 100, x0 + L - 60, RED, 4, a01, null, 3); arrow(g, x0 + 110, 790, x0 + 60, 790, RED, 4, 16, a01); lab(g, '反射波', x0 + L - 140, 845, { a: a01, size: 38, col: RED });
    for (let i = 0; i <= 12; i++) { const xi = x0 + 60 + i * 100, dx = 38 * Math.sin(Math.PI / 2 * (x0 + L - xi) / (L - 60 + 40)) * Math.cos(OM * lt * 1.2); for (const yy of [y0 - 60, y0, y0 + 60]) dot(g, xi + dx * a1, yy, 10, BLU, a1, 14); }
    if (a1 > 0) { arrow(g, x0 + 130, y0 - 110, x0 + 230, y0 - 110, GOLD, 5, 18, a1); arrow(g, x0 + 230, y0 - 110, x0 + 130, y0 - 110, GOLD, 5, 18, a1); lab(g, '媒質の振動', x0 + 180, y0 - 150, { a: a1, size: 34, col: GOLD }); }
    if (a2 > 0) { g.save(); g.globalAlpha *= a2; g.strokeStyle = BLU; g.lineWidth = 5; g.beginPath(); g.roundRect(x0 + L - 70, y0 - H / 2 - 10, 80, H + 20, 14); g.stroke(); g.restore(); lab(g, '底：動けない → 変位は常に 0 → 節', x0 + L - 330, 715, { a: a2, size: 40, col: BLU, w: 800 }); arrow(g, x0 + L - 40, 700, x0 + L - 30, y0 + H / 2 + 22, BLU, 4, 16, a2); }
    if (a3 > 0) pill(g, '固定端反射', 1450, 160, GOLD, { jp: true, size: 40, al: 'center', a: a3 });
    if (a4 > 0) { g.save(); g.globalAlpha *= a4; g.strokeStyle = GOLD; g.lineWidth = 5; g.beginPath(); g.roundRect(x0 - 40, y0 - H / 2 - 10, 80, H + 20, 14); g.stroke(); g.restore(); lab(g, '口は自由に動ける → 腹', x0 - 20, 715, { a: a4, size: 40, col: GOLD, w: 800, al: 'left' }); arrow(g, x0 + 10, 700, x0, y0 + H / 2 + 22, GOLD, 4, 16, a4); }
  } });
// 3 音速と温度
S.push({ lines: ['音速 V 会随温度变化。', 't〔℃〕时的音速是 V = 331.5 + 0.6t〔m/s〕。', '要知道：温度升高，音速增大。'],
  draw(g, lt, s) {
    txt(g, '音速と温度', 200, 120, { size: 52, jp: true, w: 800, col: GOLD, a: seg(lt, .2, .6) });
    fm(g, 'vt', 200, 270, 70, { a: seg(lt, s.L[1] + .2, .5), p: seg(lt, s.L[1] + .2, 1.2) });
    const a0 = seg(lt, s.L[0] + .3, .6), ox = 260, oy = 880, w = 1100, h = 420, tt = 40; line(g, ox, oy, ox + w, oy, C.axis, 3, null, a0); line(g, ox, oy, ox, oy - h, C.axis, 3, null, a0);
    const X = t => ox + t / tt * w, Y = v => oy - (v - 325) / 35 * h;
    curve(g, x => Y(331.5 + 0.6 * ((x - ox) / w * tt)), ox, ox + w, BLU, 6, a0, null, 4);
    txt(g, 't (℃)', ox + w + 30, oy + 10, { size: 36, jp: true, col: C.mute, a: a0 }); txt(g, 'V (m/s)', ox - 40, oy - h - 40, { size: 36, jp: true, col: C.mute, a: a0 });
    for (const t of [0, 10, 20, 30, 40]) { txt(g, `${t}`, X(t), oy + 40, { size: 32, serif: true, col: C.mute, al: 'center', a: a0 }); line(g, X(t), oy - 8, X(t), oy + 8, C.axis, 2, null, a0); }
    const p = lin(lt, s.L[1] + 1.4, 5), tc = 40 * p; const e = seg(lt, s.L[1] + 1.4, .4); dot(g, X(tc), Y(331.5 + .6 * tc), 13, GOLD, e, 24); txt(g, `t = ${tc.toFixed(0)} ℃　→　V = ${(331.5 + .6 * tc).toFixed(1)} m/s`, 330, 480, { size: 42, jp: true, w: 800, col: GOLD, al: 'left', a: e });
    const c = seg(lt, s.L[2], .6); if (c > 0) { arrow(g, 330, 560, 530, 560, RED, 6, 22, c); txt(g, '温度 ↑ → 音速 ↑', 330, 620, { size: 44, jp: true, w: 800, col: RED, a: c, al: 'left' }); }
  } });
// 4 闭管 基本振动
S.push({ lines: ['先看闭管（一端封闭）：管长 l，数成 λ/4 的几倍就行。', '基本振动：口是腹、底是节，所以 l = λ1/4。', '于是 f1 = V/λ1 = V/(4l) ……(1)。'],
  draw(g, lt, s) {
    txt(g, '閉管　基本振動（横波表示）', 200, 110, { size: 46, jp: true, w: 800, col: GOLD, a: seg(lt, .2, .6) });
    const x0 = 360, L = 1200, y = 440, a0 = seg(lt, .2, .6);
    TUBE(g, { x0, y, L, H: 220, closed: true, n: 1, t: lt, a: a0 }); lab(g, '口は腹', x0 - 110, y, { a: a0, size: 40, col: GOLD, w: 800 }); lab(g, '底は節', x0 + L + 110, y, { a: a0, size: 40, col: BLU, w: 800 });
    const a1 = seg(lt, s.L[0] + .5, .6); if (a1 > 0) { brace(g, x0, x0 + L, 620, C.ink, a1); fm(g, 'lam1_4', x0 + L / 2, 690, 54, { al: 'center', a: a1 }); }
    const b = seg(lt, s.L[1] + .8, .6); fm(g, 'c1', 360, 830, 66, { a: b, p: seg(lt, s.L[1] + .8, 1.0) });
    const c = seg(lt, s.L[2] + .2, .6); fm(g, 'c1f', 920, 830, 66, { a: c, p: seg(lt, s.L[2] + .2, 1.6) }); if (c > 0) box(g, 890, 745, 960, 170, GOLD, c * .9);
  } });
// 5 闭管 3 倍 5 倍
S.push({ lines: ['接下来的倍振动：λ/4 有 3 个，所以 l = (λ/4)×3。', '于是 f = V/λ = 3V/(4l) = 3f1 ……(2)，这是 3 倍振动。', '以后 λ/4 有 5 个、7 个……，把 (2) 的 3 换成 5、7 就行。', '结论：闭管只产生奇数倍的倍振动。'],
  draw(g, lt, s) {
    txt(g, '閉管', 140, 110, { size: 52, jp: true, w: 800, col: GOLD, a: seg(lt, .2, .6) });
    const x0 = 160, L = 820, a0 = seg(lt, .2, .6), a1 = seg(lt, s.L[0], .6), a2 = seg(lt, s.L[1], .6), a3 = seg(lt, s.L[2], .6), a4 = seg(lt, s.L[3], .6), rows = [[270, 1, '基本振動'], [510, 3, '3 倍振動'], [750, 5, '5 倍振動']];
    rows.forEach(([y, n, nm], i) => { const on = i === 0 ? a0 : i === 1 ? a1 : a3; TUBE(g, { x0, y, L, H: 130, closed: true, n, t: lt, a: on }); lab(g, nm, x0 + L / 2, y - 98, { a: on, size: 36, col: C.mute });
      for (let k = 0; k <= n; k++) line(g, x0 + L * (1 - k / n), y + 80, x0 + L * (1 - k / n), y + 100, C.mute, 3, null, on * .9); if (on > 0) { brace(g, x0 + L - L / n, x0 + L, y + 90, GRN, on * seg(lt, (i ? s.L[i === 1 ? 0 : 2] : s.L[0]) + .8, .5), 3); } });
    fm(g, 'lam4', x0 + L - L / 6, 380, 46, { al: 'center', a: a1 });
    fm(g, 'c3l', 1090, 450, 54, { a: a1, p: seg(lt, s.L[0] + .3, 1.0) }); fm(g, 'c3f', 1090, 620, 46, { a: a2, p: seg(lt, s.L[1] + .2, 1.4) }); if (a2 > 0) box(g, 1060, 550, 790, 140, GOLD, a2 * .9);
    txt(g, '3 → 5, 7, ……', 1090, 780, { size: 46, jp: true, col: RED, w: 800, a: a3 }); fm(g, 'oddf', 1090, 900, 46, { a: a4, p: seg(lt, s.L[3] + .2, 1.2) }); txt(g, '閉管は奇数倍の倍振動だけ', 1090, 330, { size: 46, jp: true, col: GOLD, w: 800, a: a4 });
  } });
// 6 开管
S.push({ lines: ['再看开管（两端开口）：管长 l，数成 λ/2 的几倍。', '基本振动：两端都是腹，所以 l = λ1/2，f1 = V/λ1 = V/(2l)。', '下一个倍振动：l = (λ/2)×2，f = V/λ = 2V/(2l) = 2f1，是 2 倍振动。', '以后 λ/2 有 3 个、4 个……，出现的是整数倍的倍振动。'],
  draw(g, lt, s) {
    txt(g, '開管', 140, 110, { size: 52, jp: true, w: 800, col: GOLD, a: seg(lt, .2, .6) });
    const x0 = 200, L = 780, a0 = seg(lt, .2, .6), a1 = seg(lt, s.L[1], .6), a2 = seg(lt, s.L[2], .6), a3 = seg(lt, s.L[3], .6), rows = [[270, 1, '基本振動', a0], [510, 2, '2 倍振動', a2], [750, 3, '3 倍振動', a3]];
    rows.forEach(([y, n, nm, on]) => { TUBE(g, { x0, y, L, H: 130, closed: false, n, t: lt, a: on }); lab(g, nm, x0 + L / 2, y - 98, { a: on, size: 36, col: C.mute }); });
    lab(g, '口は腹', x0 - 80, 270, { a: a0, size: 34, col: GOLD, w: 800 }); lab(g, '口は腹', x0 + L + 80, 270, { a: a0, size: 34, col: GOLD, w: 800 });
    const b0 = seg(lt, s.L[0] + .6, .5); if (b0 > 0) { brace(g, x0, x0 + L, 380, GRN, b0); fm(g, 'lam1_2', x0 + L / 2 + 130, 380, 44, { a: b0 }); }
    const b2 = seg(lt, s.L[2] + .6, .5); if (b2 > 0) { brace(g, x0, x0 + L / 2, 620, GRN, b2); fm(g, 'lam2', x0 + L / 4 + 0, 690, 44, { al: 'center', a: b2 }); }
    fm(g, 'o1', 1230, 300, 52, { a: a1, p: seg(lt, s.L[1] + .2, .8) }); fm(g, 'o1f', 1230, 460, 52, { a: a1, p: seg(lt, s.L[1] + .8, 1.2) });
    fm(g, 'o2l', 1230, 640, 52, { a: a2, p: seg(lt, s.L[2] + .2, .8) }); fm(g, 'o2f', 1230, 800, 52, { a: a2, p: seg(lt, s.L[2] + .9, 1.3) });
    txt(g, '整数倍の倍振動', 1230, 925, { size: 46, jp: true, col: GOLD, w: 800, a: a3 });
  } });
// 7 开口端补正
S.push({ lines: ['实际上，腹会出现在比管口稍微靠外一点的位置。', '这段伸出去的长度，叫做开口端修正。', '开管的话，两侧都会伸出去。', '除非特别说明，开口端修正在各个倍振动中都可以当作一定值。', '补充：闭管基本振动时，实际是 λ = 4(l + Δl)。'],
  draw(g, lt, s) {
    txt(g, '開口端補正', 200, 110, { size: 52, jp: true, w: 800, col: GOLD, a: seg(lt, .2, .6) });
    const x0 = 520, L = 1000, ext = 110, a0 = seg(lt, .2, .6), a1 = seg(lt, s.L[0] + .3, .6), a2 = seg(lt, s.L[1], .6), a3 = seg(lt, s.L[2], .6), a4 = seg(lt, s.L[3], .6), a5 = seg(lt, s.L[4], .6);
    TUBE(g, { x0, y: 300, L, H: 150, closed: true, n: 1, t: lt, a: a0, ext: ext * a1 }); lab(g, '管の口', x0, 405, { a: a0, size: 34, col: C.mute }); line(g, x0, 210, x0, 390, C.axis, 2, [6, 6], a0);
    if (a1 > 0) { lab(g, '腹は管の口より少し外側にできる', x0 + L / 2 - 100, 160, { a: a1, size: 40, col: GOLD, w: 800 }); dot(g, x0 - ext * a1, 300 - 150 / 2 * .84, 10, GOLD, a1, 18); }
    if (a2 > 0) { brace(g, x0 - ext, x0, 450, RED, a2); lab(g, 'はみ出した長さ ＝ 開口端補正', x0 - ext - 20, 505, { a: a2, size: 38, col: RED, w: 800, al: 'left' }); }
    TUBE(g, { x0, y: 720, L, H: 150, closed: false, n: 1, t: lt, a: a3, ext: ext * a3 }); lab(g, '開管：両側にはみ出す', x0 + L / 2, 610, { a: a3, size: 40, col: GOLD, w: 800 });
    if (a3 > 0) { brace(g, x0 - ext, x0, 835, RED, a3); brace(g, x0 + L, x0 + L + ext, 835, RED, a3); }
    lab(g, '断りがない限り，倍振動を通じて一定としてよい', 960, 905, { a: a4, size: 40, col: C.ink, w: 700 });
    if (a5 > 0) { pill(g, '補足', 1260, 540, GRN, { jp: true, size: 34, a: a5 }); fm(g, 'ocorr', 1360, 540, 60, { a: a5, p: seg(lt, s.L[4] + .2, 1.2) }); }
  } });
// 8 例
S.push({ lines: ['补充：算个具体的例子。管长 l = 0.85 m，音速 V = 340 m/s。', '闭管：f1 = V/(4l) = 100 Hz，之后只有 300 Hz、500 Hz ……', '开管：f1 = V/(2l) = 200 Hz，之后 400 Hz、600 Hz ……', '同样的管长，闭管的基本音比开管低（低一个八度）。'],
  draw(g, lt, s) {
    pill(g, '補足', 200, 120, GRN, { jp: true, size: 36, a: seg(lt, .2, .5) }); txt(g, 'l ＝ 0.85 m，V ＝ 340 m/s の例', 320, 120, { size: 46, jp: true, w: 800, col: GRN, a: seg(lt, .2, .6) });
    const a1 = seg(lt, s.L[1], .6), a2 = seg(lt, s.L[2], .6), a3 = seg(lt, s.L[3], .6);
    txt(g, '閉管', 200, 270, { size: 50, jp: true, col: BLU, w: 800, a: a1 }); fm(g, 'ex1', 360, 270, 52, { a: a1, p: seg(lt, s.L[1] + .3, 1.4) });
    for (const [i, f] of [[0, 100], [1, 300], [2, 500]]) { const on = a1 * seg(lt, s.L[1] + 1.6 + i * .5, .4); txt(g, `${f} Hz`, 460 + i * 260, 420, { size: 46, serif: true, w: 800, col: BLU, al: 'center', a: on }); }
    txt(g, '開管', 200, 600, { size: 50, jp: true, col: RED, w: 800, a: a2 }); fm(g, 'ex2', 360, 600, 52, { a: a2, p: seg(lt, s.L[2] + .3, 1.4) });
    for (const [i, f] of [[0, 200], [1, 400], [2, 600]]) { const on = a2 * seg(lt, s.L[2] + 1.6 + i * .5, .4); txt(g, `${f} Hz`, 460 + i * 260, 750, { size: 46, serif: true, w: 800, col: RED, al: 'center', a: on }); }
    txt(g, '同じ管長：閉管の基本音は開管の半分', 200, 900, { size: 46, jp: true, col: GOLD, w: 800, a: a3 });
  } });
// 9 总结
S.push({ lines: ['总结：解气柱共鸣，先画“口为腹、底为节”的定常波，再找 λ 和管长的关系。', '闭管：l 是 λ/4 的奇数倍；开管：l 是 λ/2 的整数倍。', '弦和开管都是整数倍的倍振动，所以“只有闭管是奇数倍”，记住它。'],
  draw(g, lt, s) {
    txt(g, '気柱の共鳴　まとめ', 200, 130, { size: 56, jp: true, w: 800, a: seg(lt, .2, .6) });
    const a1 = seg(lt, s.L[0], .6), a2 = seg(lt, s.L[1], .6), a3 = seg(lt, s.L[2], .6);
    txt(g, '口が腹，底が節の定常波 → 波長 λ と管の長さ l', 200, 270, { size: 46, jp: true, a: a1, w: 700 });
    txt(g, '閉管', 200, 430, { size: 50, jp: true, col: BLU, w: 800, a: a2 }); txt(g, 'l は λ/4 の奇数倍', 400, 430, { size: 46, jp: true, a: a2 });
    txt(g, '開管', 200, 540, { size: 50, jp: true, col: RED, w: 800, a: a2 }); txt(g, 'l は λ/2 の整数倍', 400, 540, { size: 46, jp: true, a: a2 });
    txt(g, '弦も開管も整数倍の倍振動', 200, 700, { size: 46, jp: true, a: a3, w: 700 }); txt(g, '「閉管だけが奇数倍の倍振動」', 200, 800, { size: 52, jp: true, col: GOLD, w: 800, a: a3 }); box(g, 170, 735, 1000, 120, GOLD, a3 * .9);
  } });
setup(S);
