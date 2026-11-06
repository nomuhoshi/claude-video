// 视频 9：回折格子（課本 137–138 页）→ 9 幕，无配乐，第 0 帧显示主题文字
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
function wall(g, x, ys, gap, a) { let prev = 160; for (const y of ys) { line(g, x, prev, x, y - gap, C.ink, 9, null, a); prev = y + gap; } line(g, x, prev, x, 940, C.ink, 9, null, a); }
const S = [];
// 0 片头
S.push({ lines: ['回折格子：一块刻了极多条划痕的玻璃板。', '它能把光分成几个清晰的方向。'], lead: 1.2,
  draw(g, lt) {
    for (let k = 0; k < 9; k++) { const y = 640 + k * 28; g.save(); g.globalAlpha = .4; g.beginPath(); g.rect(W / 2 - 400, 600, 800, 400); g.clip(); ring(g, W / 2 - 500, y, ((60 * lt) % 56) + 56 * (k % 3 + 1) * 3, RED, 2, .5); g.restore(); }
    for (let k = 0; k < 24; k++) line(g, 560 + k * 34, 790, 560 + k * 34, 870, C.mute, 3, null, .6);
    txt(g, '回折格子', W / 2, 330, { size: 140, jp: true, w: 900, al: 'center', a: 1, glow: 'rgba(255,85,119,.35)' });
    txt(g, '（多数のスリットによる回折）', W / 2, 480, { size: 54, jp: true, col: GOLD, al: 'center', a: 1, w: 700 });
  } });
// 1 构造
S.push({ lines: ['回折格子：在玻璃板的一面，刻上等间隔的极多条划痕。', '每 1 mm 有 10 到 1000 条。', '光照上去，划痕处不透明，只有其余透明部分能通过。', '这些缝非常窄，所以发生衍射——相当于许多狭缝的衍射。'],
  draw(g, lt, s) {
    const a0 = seg(lt, .2, .6), a1 = seg(lt, s.L[1], .6), a2 = seg(lt, s.L[2], .6), a3 = seg(lt, s.L[3], .6), n = Math.min(11, Math.floor(lin(lt, .5, 3) * 11) + (lt > .5 ? 1 : 0));
    g.save(); g.globalAlpha *= a0; g.fillStyle = 'rgba(120,180,255,.16)'; g.fillRect(700, 220, 80, 680); g.strokeStyle = BLU; g.lineWidth = 3; g.strokeRect(700, 220, 80, 680); g.restore();
    lab(g, '回折格子（板ガラス）', 740, 170, { a: a0, size: 38, col: BLU });
    for (let k = 0; k < 11; k++) { const y = 260 + k * 60; if (k < n) { g.save(); g.fillStyle = C.ink; g.fillRect(764, y - 7, 18, 14); g.restore(); } }
    for (let k = 0; k < 10; k++) { const y = 290 + k * 60; arrow(g, 330, y, 690, y, RED, 3, 14, a0 * .8); }
    g.save(); g.beginPath(); g.rect(786, 200, 200, 720); g.clip(); for (let k = 0; k < 10; k++) { const y = 290 + k * 60; for (let j = 0; j < 4; j++) { const r = ((60 * lt) % 45) + j * 45; ring(g, 780, y, r, RED, 2.5, a3 * .8 * clamp(1 - (r - 120) / 60)); } } g.restore();
    txt(g, 'きわめて多数のすじ（傷）', 1050, 270, { size: 44, jp: true, w: 800, a: a0 }); arrow(g, 1040, 290, 800, 267 + 0, GOLD, 4, 14, a0);
    vbrace(g, 260, 560, 1010, GOLD, a1); txt(g, '1 mm あたり 数 10〜1000 本', 1050, 420, { size: 44, jp: true, w: 800, col: GOLD, a: a1 });
    txt(g, '傷の所は不透明', 1050, 560, { size: 44, jp: true, col: C.mute, w: 800, a: a2 }); txt(g, 'それ以外の透明な部分を通る', 1050, 640, { size: 44, jp: true, col: RED, w: 800, a: a2 });
    txt(g, 'ここは非常に狭い → 回折が起こる', 1050, 760, { size: 44, jp: true, col: GOLD, w: 800, a: a3 }); txt(g, '（いわば多数のスリットによる回折）', 1050, 830, { size: 40, jp: true, a: a3 });
  } });
// 2 特定方向
S.push({ lines: ['衍射波会朝各个方向前进，', '但所有衍射波互相干涉并加强，只发生在特定的方向。', '看这个方向 θ：各个狭缝的波峰，正好排在同一条波面上。'],
  draw(g, lt, s) {
    const wx = 520, lam = 60, d = 120, ys = [300, 420, 540, 660, 780], th = Math.asin(lam / d), u = [Math.cos(th), -Math.sin(th)];
    const a0 = seg(lt, .2, .6), a1 = seg(lt, s.L[0], .6), a2 = seg(lt, s.L[1], .6), a3 = seg(lt, s.L[2], .6);
    wall(g, wx, ys, 14, a0); for (const y of ys) arrow(g, 160, y, 500, y, RED, 3, 14, a0 * .7);
    g.save(); g.beginPath(); g.rect(wx + 6, 140, 1300, 820); g.clip();
    for (const y of ys) for (let k = 0; k < 24; k++) { const r = ((60 * lt) % lam) + k * lam; ring(g, wx, y, r, BLU, 2, a1 * .5 * clamp(1 - (r - 700) / 300)); }
    if (a2 > 0) { for (const y of ys) for (let ang = -50; ang <= 50; ang += 25) { const t = ang * Math.PI / 180; line(g, wx, y, wx + 380 * Math.cos(t), y - 380 * Math.sin(t), C.mute, 2, [6, 8], a2 * .55); } }
    if (a3 > 0) { const phi = (60 * lt) % lam, nx = [Math.sin(th), Math.cos(th)]; for (let j = 0; j < 12; j++) { const sj = ys[0] * 0 + (wx * u[0] + ys[0] * u[1]) + phi + j * lam; const p0 = [u[0] * sj - 0, 0]; const cx = u[0] * sj, cy = u[1] * sj; const len = 600; line(g, cx - nx[0] * len + 0, cy - nx[1] * len, cx + nx[0] * len, cy + nx[1] * len, GOLD, 2.5, [10, 7], a3 * .9); } }
    g.restore();
    if (a3 > 0) { for (let i = 0; i < 4; i++) { const y = ys[i + 1 > 4 ? 4 : i + 1]; arrow(g, wx, y, wx + 480 * u[0], y + 480 * u[1], RED, 5, 20, a3); } lab(g, 'θ', wx + 330, ys[4] - 30, { a: a3, size: 52, col: GOLD, w: 800 }); const gx = wx + 230, gy = ys[4]; g.save(); g.globalAlpha *= a3; g.strokeStyle = GOLD; g.lineWidth = 3; g.beginPath(); g.arc(wx, ys[4], 190, -th, 0); g.stroke(); g.restore(); line(g, wx, ys[4], wx + 260, ys[4], C.axis, 2, [6, 6], a3); }
    lab(g, '強め合うのは特定の方向だけ', 1450, 880, { a: a3, size: 44, col: GOLD, w: 800 });
  } });
// 3 光路差 図
S.push({ lines: ['把格子放大一点，看成一排狭缝 A、B、C……，间隔 d 叫“格子定数”。', '平行光垂直照射，衍射光 a、b、c 沿 θ 方向前进。', '来看光线 a、b 的干涉：从狭缝 A 向光线 b 作垂线，垂足记为 A′。', 'BA′ 就是光路差，BA′ = d sinθ。'],
  draw(g, lt, s) {
    txt(g, '少し拡大　スリット化', 200, 120, { size: 44, jp: true, w: 800, col: GOLD, a: seg(lt, .2, .6) });
    const wx = 640, YA = 400, YB = 610, YC2 = 820, dd = 210, th = 35 * Math.PI / 180, u = [Math.cos(th), -Math.sin(th)], R = 480;
    const a0 = seg(lt, s.L[0] + .2, .6), a1 = seg(lt, s.L[1], .6), a2 = seg(lt, s.L[2], .6), a3 = seg(lt, s.L[3], .6);
    wall(g, wx, [YA, YB, YC2], 10, a0 * .9); for (const [y, nm] of [[YA, 'A'], [YB, 'B'], [YC2, 'C']]) { arrow(g, 240, y, wx - 20, y, RED, 4, 16, a0 * .8); lab(g, nm, wx - 60, y - 36, { a: a0, size: 46, w: 800, col: C.ink }); }
    lab(g, '格子定数', 300, (YA + YB) / 2 - 10, { a: a0, size: 34, col: GOLD }); vbrace(g, YA, YB, wx - 110, GOLD, a0); fm(g, 'd', wx - 170, (YA + YB) / 2 + 40, 50, { al: 'center', a: a0 });
    for (const [y, nm] of [[YA, 'a'], [YB, 'b'], [YC2, 'c']]) { arrow(g, wx, y, wx + R * u[0], y + R * u[1], RED, 4, 18, a1); lab(g, nm, wx + R * u[0] + 30, y + R * u[1] - 14, { a: a1, size: 46, serif: true, w: 800 }); }
    g.save(); g.globalAlpha *= a1; g.strokeStyle = GOLD; g.lineWidth = 3; g.beginPath(); g.arc(wx, YC2, 150, -th, 0); g.stroke(); g.restore(); line(g, wx, YC2, wx + 300, YC2, C.axis, 2, [6, 6], a1); fm(g, 'th', wx + 190, YC2 - 28, 50, { al: 'center', a: a1 });
    const hl = dd * Math.sin(th), H = [wx + hl * u[0], YB + hl * u[1]];
    line(g, wx, YA, H[0], H[1], C.ink, 3, [8, 7], a2); dot(g, H[0], H[1], 7, GOLD, a2, 14); lab(g, 'A′', H[0] + 20, H[1] - 36, { a: a2, size: 42, w: 800, col: GOLD, al: 'left' });
    const ca = Math.cos(th), sa = Math.sin(th); line(g, H[0] - 24 * ca, H[1] + 24 * sa, H[0] - 24 * ca + 24 * sa, H[1] + 24 * sa + 24 * ca, C.ink, 2.5, null, a2); line(g, H[0] + 24 * sa, H[1] + 24 * ca, H[0] - 24 * ca + 24 * sa, H[1] + 24 * sa + 24 * ca, C.ink, 2.5, null, a2);
    line(g, wx, YB, H[0], H[1], RED, 10, null, a3); lab(g, 'これが光路差', H[0] + 260, H[1] + 60, { a: a3, size: 40, col: RED, w: 800 }); arrow(g, H[0] + 140, H[1] + 40, (wx + H[0]) / 2 + 10, (YB + H[1]) / 2 + 10, RED, 3, 12, a3);
    fm(g, 'dsn', 1500, 500, 60, { a: a3 }); lab(g, 'BA′ ＝', 1330, 500, { a: a3, size: 44, serif: true, w: 800, col: RED });
  } });
// 4 公式 + 扇形
S.push({ lines: ['垂直照射波长 λ 的平行光，明线出现在满足下式的几个角 θ 方向：', 'd sinθ = mλ（m = 0, 1, 2, ……）。', '整数 m 叫做“次数”。'],
  draw(g, lt, s) {
    const a0 = seg(lt, .2, .6), a1 = seg(lt, s.L[0] + .5, .6), a2 = seg(lt, s.L[1], .6), a3 = seg(lt, s.L[2], .6), gx = 300, gy = 570, sx = 760, ratio = .30;
    g.save(); g.globalAlpha *= a0; g.fillStyle = C.ink; g.fillRect(gx - 8, gy - 22, 16, 44); g.restore(); lab(g, '回折格子', gx - 20, gy + 80, { a: a0, size: 36 }); arrow(g, 120, gy, gx - 12, gy, RED, 5, 20, a0); line(g, sx, 150, sx, 980, C.ink, 5, null, a0); lab(g, 'スクリーン', sx, 100, { a: a0, size: 34 });
    for (let m = 0; m <= 2; m++) for (const sg of (m ? [1, -1] : [1])) { const th = Math.asin(m * ratio), on = a1 * seg(lt, s.L[0] + .5 + m * .5, .5), y = gy - sg * (sx - gx) * Math.tan(th); line(g, gx, gy, sx, y, RED, 5, null, on); dot(g, sx, y, 12, GOLD, on, 24); if (sg === 1) lab(g, `${m}次`, sx + 70, y, { a: on, size: 40, col: GOLD, w: 800 }); else lab(g, `${m}次`, sx + 70, y, { a: on, size: 40, col: GOLD, w: 800 }); }
    lab(g, 'm の値', sx + 70, 150, { a: a1, size: 34, col: C.mute });
    fm(g, 'dsm', 1000, 330, 50, { a: a2, p: seg(lt, s.L[1] + .2, 1.4) }); if (a2 > 0) { box(g, 970, 250, 890, 160, GOLD, a2 * .9); pill(g, '要暗記', 1760, 232, RED, { jp: true, size: 34, al: 'center', a: seg(lt, s.L[1] + 1.4, .4) }); }
    txt(g, '整数 m ＝ 次数', 1000, 560, { size: 50, jp: true, w: 800, col: GOLD, a: a3 }); txt(g, 'm ＝ 0 ：0 次（まっすぐ進む）', 1000, 650, { size: 40, jp: true, a: a3 }); txt(g, 'm ＝ 1, 2, …… ：1 次，2 次，…', 1000, 720, { size: 40, jp: true, a: a3 });
  } });
// 5 垂线=波面
S.push({ lines: ['b、c …… 的光路差也同样是 d sinθ，', '所以在满足上式的 θ 方向上，所有的光都互相加强。', '这样，平行光线的光路差，作垂线就看得见了。', '射线的垂线，同时也是波面。'],
  draw(g, lt, s) {
    const wx = 520, d = 130, ys = [400, 530, 660, 790], th = 35 * Math.PI / 180, u = [Math.cos(th), -Math.sin(th)], R = 470, ds = d * Math.sin(th), nx = [Math.sin(th), Math.cos(th)], nm = ['A', 'B', 'C', 'D'];
    const a0 = seg(lt, .2, .6), a1 = seg(lt, s.L[0], .6), a2 = seg(lt, s.L[1], .6), a3 = seg(lt, s.L[2], .6), a4 = seg(lt, s.L[3], .6);
    wall(g, wx, ys, 10, a0 * .9); ys.forEach((y, i) => { arrow(g, 160, y, wx - 20, y, RED, 3, 14, a0 * .7); lab(g, nm[i], wx - 50, y - 34, { a: a0, size: 42, w: 800 }); arrow(g, wx, y, wx + R * u[0], y + R * u[1], RED, 4, 16, a0); });
    ys.forEach((y, i) => { if (i === 0) return; const yy = y; const fx = wx + ds * u[0] * 0, k = i; const S = [wx, ys[i - 1]], F = [wx + ds * u[0], y + ds * u[1]]; const on = a1 * seg(lt, s.L[0] + .3 * i, .4); line(g, wx, ys[i - 1], F[0], F[1], C.ink, 3, [8, 7], on); line(g, wx, y, F[0], F[1], RED, 9, null, on); dot(g, F[0], F[1], 6, GOLD, on, 12); });
    if (a2 > 0) { lab(g, '光路差はどれも d sinθ', 1250, 330, { a: a2, size: 44, col: RED, w: 800 }); lab(g, '→ すべての光が強め合う', 1250, 410, { a: a2, size: 44, col: GOLD, w: 800 }); }
    if (a3 > 0) { const A0 = [wx, ys[0]]; line(g, A0[0] - nx[0] * 10, A0[1] - nx[1] * 10, A0[0] + nx[0] * 520, A0[1] + nx[1] * 520, GOLD, 3.5, [12, 8], a3); lab(g, '垂線', A0[0] + nx[0] * 560 + 50, A0[1] + nx[1] * 560 - 20, { a: a3, size: 40, col: GOLD, w: 800 }); }
    if (a4 > 0) { lab(g, '射線に対する垂線 ＝ 波面', 1250, 640, { a: a4, size: 46, col: GOLD, w: 800 }); lab(g, '平行光線の光路差は垂線を入れると見えてくる', 1250, 720, { a: a4, size: 36, col: C.ink }); }
  } });
// 6 ちょっと一言
S.push({ lines: ['小提示：波的山到达狭缝时，A 的山在屏幕上遇到的对手，是 A′ 处的波。', 'A′ 若是山，就加强。', 'BA′ 是山到山的距离，所以等于 λ 的整数倍。'],
  draw(g, lt, s) {
    txt(g, 'ちょっと一言', 200, 120, { size: 46, jp: true, w: 800, col: GRN, a: seg(lt, .2, .6) });
    const wx = 640, YA = 380, YB = 600, dd = 220, th = 35 * Math.PI / 180, u = [Math.cos(th), -Math.sin(th)], R = 760, lam = dd * Math.sin(th) / 2;
    const a0 = seg(lt, .4, .6), a1 = seg(lt, s.L[0] + .5, .6), a2 = seg(lt, s.L[1], .6), a3 = seg(lt, s.L[2], .6);
    wall(g, wx, [YA, YB], 12, a0); arrow(g, 240, YA, wx - 20, YA, RED, 4, 16, a0 * .8); arrow(g, 240, YB, wx - 20, YB, RED, 4, 16, a0 * .8); lab(g, 'A', wx - 55, YA - 36, { a: a0, size: 46, w: 800 }); lab(g, 'B', wx - 55, YB - 36, { a: a0, size: 46, w: 800 });
    arrow(g, wx, YB, wx + R * u[0], YB + R * u[1], RED, 4, 18, a0); const hl = dd * Math.sin(th), H = [wx + hl * u[0], YB + hl * u[1]]; line(g, wx, YA, H[0], H[1], C.ink, 3, [8, 7], a0);
    dot(g, wx, YA, 15, GOLD, a1, 30); dot(g, wx, YB, 15, GOLD, a1, 30); lab(g, '山', wx - 100, YA + 6, { a: a1, size: 40, col: GOLD }); lab(g, '山', wx - 100, YB + 6, { a: a1, size: 40, col: GOLD });
    for (let k = 1; k <= 4; k++) { const p = [wx + k * lam * u[0], YB + k * lam * u[1]]; dot(g, p[0], p[1], k === 2 ? 15 : 11, k === 2 ? GOLD : BLU, a2 * seg(lt, s.L[1] + .2 * k, .3), k === 2 ? 30 : 16); }
    dot(g, H[0], H[1], 8, C.ink, a2, 10); lab(g, 'A′', H[0] - 50, H[1] - 26, { a: a2, size: 44, w: 800, col: GOLD }); lab(g, 'Aの山の出合う相手', H[0] + 200, H[1] - 90, { a: a2, size: 36, col: GOLD });
    if (a3 > 0) { const off = [-(Math.sin(th)) * 70, -(Math.cos(th)) * 70]; arrow(g, wx + off[0] + 0, YB + off[1] - 0, H[0] + off[0], H[1] + off[1], RED, 4, 16, a3 * 0); line(g, wx, YB, H[0], H[1], RED, 10, null, a3); lab(g, 'BA′ ＝ 山から山への距離 ＝ λ の整数倍', 1200, 820, { a: a3, size: 46, col: RED, w: 800 }); }
  } });
// 7 补充
S.push({ lines: ['补充：格子常数 d = 1/（每 mm 的条数），', '例如每 mm 500 条，就是 d = 2 μm。', '又因为 sinθ ≦ 1，所以次数 m 最大不超过 d/λ，明线只有有限几条。', '例如 λ = 500 nm，则 sinθ1 = 0.25，m 最大是 4。'],
  draw(g, lt, s) {
    pill(g, '補足', 200, 130, GRN, { jp: true, size: 38, a: seg(lt, .2, .5) }); txt(g, '格子定数と次数の上限', 320, 130, { size: 46, jp: true, w: 800, col: GRN, a: seg(lt, .2, .6) });
    fm(g, 'gd1', 200, 290, 64, { a: seg(lt, s.L[0] + .3, .5), p: seg(lt, s.L[0] + .3, 1.0) }); txt(g, '（N：1 mm あたりの本数）', 900, 290, { size: 38, jp: true, col: C.mute, a: seg(lt, s.L[0] + .6, .5) });
    fm(g, 'gdex', 200, 470, 56, { a: seg(lt, s.L[1] + .2, .5), p: seg(lt, s.L[1] + .2, 1.4) });
    const c = seg(lt, s.L[2], .5); fm(g, 'mmax', 200, 680, 62, { a: c, p: seg(lt, s.L[2] + .2, 1.5) }); if (c > 0) box(g, 170, 590, 1020, 190, GOLD, c * .9);
    fm(g, 'ex2', 200, 865, 54, { a: seg(lt, s.L[3] + .2, .5), p: seg(lt, s.L[3] + .2, 1.6) });
  } });
// 8 总结
S.push({ lines: ['总结：回折格子是许多等间隔狭缝，光经衍射后只在特定方向互相加强。', '明线条件：d sinθ = mλ（m = 0, 1, 2, ……），m 叫次数。', '光路差 BA′ = d sinθ，是从狭缝向相邻光线作垂线得到的。', '这条垂线也是波面。'],
  draw(g, lt, s) {
    txt(g, '回折格子　まとめ', 200, 130, { size: 56, jp: true, w: 800, a: seg(lt, .2, .6) });
    const a1 = seg(lt, s.L[0], .6), a2 = seg(lt, s.L[1], .6), a3 = seg(lt, s.L[2], .6), a4 = seg(lt, s.L[3], .6);
    txt(g, '多数のスリット → 回折波 → 特定の方向でのみ強め合う', 200, 270, { size: 44, jp: true, a: a1, w: 700 });
    fm(g, 'dsm', 200, 440, 62, { a: a2 }); box(g, 170, 350, 1060, 180, GOLD, a2 * .9);
    txt(g, '光路差 ＝ BA′ ＝', 200, 650, { size: 46, jp: true, col: RED, w: 800, a: a3 }); fm(g, 'dsn', 690, 650, 60, { a: a3 });
    txt(g, '平行光線の光路差 ＝ 垂線（波面）を入れて考える', 200, 780, { size: 46, jp: true, col: GOLD, w: 800, a: a4 });
  } });
setup(S);
