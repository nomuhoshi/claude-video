// 能量守恒 · 什么是能量（教学版，无配乐）
// 积木比喻教学；单位用克、厘米；人物：丹尼斯（孩子）、妈妈、布鲁斯（邻居孩子）
// 配色：冰蓝 = 积木 / 势能；金 = 关键结果 / 动能；红 = 外来 / 划掉
const S = [];
const BL = '#5EC8FF', RED = '#FF5577';
// ---------- 房间与积木 ----------
const RX = 120, RY = 170, RW = 900, RH = 660;            // 房间（俯视）
function gridPos(k) { const c = k % 7, r = Math.floor(k / 7); return [RX + 120 + c * 100, RY + 150 + r * 92]; }
function block(g, x, y, col = BL, a = 1, s = 54, ghost = false) {
  if (a <= 0) return; g.save(); g.globalAlpha *= a;
  if (ghost) { g.setLineDash([6, 5]); g.strokeStyle = col; g.lineWidth = 2.5; g.strokeRect(x - s / 2, y - s / 2, s, s); g.restore(); return; }
  g.fillStyle = col; g.shadowColor = col; g.shadowBlur = 10; g.fillRect(x - s / 2, y - s / 2, s, s);
  g.shadowBlur = 0; g.fillStyle = 'rgba(255,255,255,.28)'; g.fillRect(x - s / 2, y - s / 2, s, s * .22);
  g.strokeStyle = 'rgba(10,17,32,.6)'; g.lineWidth = 2; g.strokeRect(x - s / 2, y - s / 2, s, s); g.restore();
}
function room(g, a, o = {}) {
  if (a <= 0) return;
  rrect(g, RX, RY, RW, RH, 10, 'rgba(22,32,52,.85)', null, 0, a);
  const wall = o.sealed ? C.gold : 'rgba(169,188,211,.8)', lw = o.sealed ? 7 : 6;
  g.save(); g.globalAlpha *= a; g.strokeStyle = wall; g.lineWidth = lw; g.lineCap = 'round';
  if (o.sealed) { g.shadowColor = C.gold; g.shadowBlur = 24; }
  g.beginPath(); g.moveTo(RX + RW, RY + 160); g.lineTo(RX + RW, RY); g.lineTo(RX, RY); g.lineTo(RX, RY + RH); g.lineTo(RX + RW, RY + RH); g.lineTo(RX + RW, RY + 300); g.stroke();
  // 窗户：右墙 RY+160 ~ RY+300
  if (o.winOpen) { g.strokeStyle = 'rgba(94,200,255,.6)'; g.lineWidth = 3; g.setLineDash([8, 8]); g.beginPath(); g.moveTo(RX + RW, RY + 160); g.lineTo(RX + RW + 90, RY + 120); g.stroke(); g.beginPath(); g.moveTo(RX + RW, RY + 300); g.lineTo(RX + RW + 90, RY + 340); g.stroke(); }
  else { g.beginPath(); g.moveTo(RX + RW, RY + 160); g.lineTo(RX + RW, RY + 300); g.stroke(); }
  g.restore();
  txt(g, '窗', RX + RW + 30, RY + 130, { size: 30, w: 700, col: C.mute, a: a * (o.winLabel ?? 0) });
  if (o.carpet) { rrect(g, RX + 600, RY + 470, 260, 160, 12, 'rgba(120,50,70,.85)', 'rgba(255,120,150,.4)', 2, a * o.carpet);
    txt(g, '地毯', RX + 730, RY + 650, { size: 28, w: 700, col: 'rgba(255,150,170,.9)', al: 'center', a: a * o.carpet }); }
  if (o.box) { const bx = RX + 640, by = RY + 470; rrect(g, bx, by, 220, 150, 10, '#6B4A2A', '#C89A5E', 3, a * o.box);
    rrect(g, bx - 10, by - 18, 240, 26, 6, '#8A6238', '#C89A5E', 2, a * o.box);
    txt(g, '玩具箱', bx + 110, by + 80, { size: 32, w: 700, col: '#F2D7A8', al: 'center', a: a * o.box }); }
  if (o.tub) { const tx = RX + 600, ty = RY + 470, tw = 260, th = 160; const lv = o.level ?? 15;   // 水深（厘米），满刻度 20 cm
    rrect(g, tx, ty, tw, th, 40, 'rgba(230,240,255,.06)', 'rgba(230,240,255,.7)', 4, a * o.tub);
    const wh = (th - 20) * lv / 20; rrect(g, tx + 10, ty + th - 10 - wh, tw - 20, wh, 28, 'rgba(110,130,90,.75)', null, 0, a * o.tub);
    txt(g, `水深 ${lv.toFixed(1)} cm`, tx + tw / 2, ty - 30, { size: 30, w: 700, col: '#CFE6C0', al: 'center', a: a * o.tub }); }
}

// ---------- 人物（原创卡通：丹尼斯、妈妈、布鲁斯）----------
const KID_D = { kind: 'kid', skin: '#F2C9A0', hair: '#3B2A1E', style: 'spiky', shirt: '#3D8BFF', pants: '#24324D', name: '丹尼斯' };
const KID_B = { kind: 'kid', skin: '#E8B98E', hair: '#C7772E', style: 'curly', shirt: '#FF5577', pants: '#2E2A40', name: '布鲁斯' };
const MOM = { kind: 'adult', skin: '#F4D0AE', hair: '#5A3422', style: 'long', shirt: '#B48CFF', pants: '#6E55B0', name: '妈妈' };
function person(g, x, y, sc, P, a = 1, o = {}) {           // (x, y) = 两脚中间的地面点
  if (a <= 0) return; const kid = P.kind === 'kid', H = (kid ? 150 : 230) * sc, hr = (kid ? 30 : 30) * sc;
  const legH = H * (kid ? .30 : .38), bodyH = H * (kid ? .36 : .34), bw = (kid ? 52 : 62) * sc;
  const hipY = y - legH, neckY = hipY - bodyH, hy = neckY - hr * .95;
  g.save(); g.globalAlpha *= a; g.lineCap = 'round'; g.lineJoin = 'round';
  // 腿
  g.strokeStyle = P.pants; g.lineWidth = 13 * sc; g.beginPath(); g.moveTo(x - bw * .22, hipY); g.lineTo(x - bw * .24, y - 4 * sc); g.moveTo(x + bw * .22, hipY); g.lineTo(x + bw * .24, y - 4 * sc); g.stroke();
  g.fillStyle = '#1B1F2A'; [-1, 1].forEach(s => { g.beginPath(); g.ellipse(x + s * bw * .28, y - 3 * sc, 11 * sc, 6 * sc, 0, 0, 7); g.fill(); });
  // 手臂
  const arm = o.arm || 'down'; g.strokeStyle = P.skin; g.lineWidth = 10 * sc;
  const sy = neckY + 10 * sc;
  [-1, 1].forEach(s => { g.beginPath(); g.moveTo(x + s * bw * .45, sy);
    if (arm === 'up' || (arm === 'point' && s === 1)) g.lineTo(x + s * bw * .95, sy - 34 * sc); else if (arm === 'hips') { g.lineTo(x + s * bw * .85, sy + bodyH * .35); g.lineTo(x + s * bw * .5, sy + bodyH * .62); } else g.lineTo(x + s * bw * .62, sy + bodyH * .78);
    g.stroke(); });
  // 身体（妈妈是连衣裙）
  g.fillStyle = P.shirt; g.beginPath();
  if (kid) g.roundRect(x - bw / 2, neckY, bw, bodyH + 6 * sc, 14 * sc);
  else { g.moveTo(x - bw * .38, neckY); g.lineTo(x + bw * .38, neckY); g.lineTo(x + bw * .62, hipY + 18 * sc); g.lineTo(x - bw * .62, hipY + 18 * sc); g.closePath(); }
  g.fill();
  // 头
  if (P.style === 'long') { g.fillStyle = P.hair; g.beginPath(); g.roundRect(x - hr * 1.12, hy - hr * .9, hr * 2.24, hr * 2.5, hr * .9); g.fill(); }
  g.fillStyle = P.skin; g.beginPath(); g.arc(x, hy, hr, 0, 7); g.fill();
  g.fillStyle = P.hair;
  if (P.style === 'spiky') { g.beginPath(); g.moveTo(x - hr, hy - hr * .15); for (let k = 0; k <= 6; k++) g.lineTo(x - hr + k * hr / 3, hy - hr * (k % 2 ? 1.35 : .85)); g.lineTo(x + hr, hy - hr * .15); g.closePath(); g.fill(); }
  else if (P.style === 'curly') { for (let k = 0; k < 7; k++) { const an = Math.PI * (1.05 + k * .15); g.beginPath(); g.arc(x + Math.cos(an) * hr * .95, hy + Math.sin(an) * hr * .95, hr * .38, 0, 7); g.fill(); } }
  else { g.beginPath(); g.arc(x, hy - hr * .15, hr * 1.02, Math.PI * 1.02, Math.PI * 1.98); g.fill(); }
  // 脸
  g.fillStyle = '#1B1F2A'; [-1, 1].forEach(s => { g.beginPath(); g.arc(x + s * hr * .36, hy + hr * .05, 3.6 * sc, 0, 7); g.fill(); });
  g.strokeStyle = '#7A3B2E'; g.lineWidth = 3 * sc; const mood = o.mood || 'smile';
  if (mood === 'shout') { g.fillStyle = '#7A3B2E'; g.beginPath(); g.ellipse(x, hy + hr * .5, hr * .22, hr * .2, 0, 0, 7); g.fill(); }
  else if (mood === 'wow') { g.beginPath(); g.arc(x, hy + hr * .48, hr * .12, 0, 7); g.stroke(); }
  else if (mood === 'think') { g.beginPath(); g.moveTo(x - hr * .25, hy + hr * .5); g.lineTo(x + hr * .25, hy + hr * .45); g.stroke(); }
  else { g.beginPath(); g.arc(x, hy + hr * .28, hr * .3, Math.PI * .15, Math.PI * .85); g.stroke(); }
  g.restore();
  if (o.label !== false) txt(g, P.name, x, y + (kid ? 22 : 26) * sc, { size: 26, w: 700, col: P.shirt, al: 'center', a });
  return { headY: hy - hr };
}
function bubble(g, s, x, y, tx, ty, a, col = C.ink) {      // 气泡：中心 (x, y)，尾巴指向 (tx, ty)
  if (a <= 0) return; g.save(); g.globalAlpha *= a; g.font = `700 34px ${SC_FONT}`; const w = g.measureText(s).width + 46, h = 66;
  g.fillStyle = 'rgba(238,243,250,.96)'; g.beginPath(); g.roundRect(x - w / 2, y - h / 2, w, h, 22); g.fill();
  g.beginPath(); g.moveTo(x - 14, y + h / 2 - 2); g.lineTo(tx, ty); g.lineTo(x + 14, y + h / 2 - 2); g.fill();
  g.fillStyle = '#0A1120'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(s, x, y + 2); g.restore();
}
// 右侧计数牌
function counter(g, label, n, a, col = C.ink, y = 300) {
  if (a <= 0) return; rrect(g, 1180, y - 130, 600, 260, 20, 'rgba(8,14,28,.7)', 'rgba(169,188,211,.3)', 2, a);
  txt(g, label, 1480, y - 72, { size: 36, w: 700, col: C.mute, al: 'center', a });
  txt(g, String(n), 1480, y + 40, { size: 140, w: 900, mono: true, col, al: 'center', a, glow: col === C.gold ? 'rgba(255,200,87,.5)' : null });
}
function fitTex(g, k, x, y, maxW, o = {}) { const s = Math.min(o.size ?? 1, maxW / TEXD[k].w); return tex(g, k, x, y, { ...o, size: s }); }

// ---------- 0 主题（第 0 帧起显示）+ 引子 ----------
S.push({ lead: 1.2,
  lines: ['物理学里有一条定律，至今没有发现过例外：', ['能量守恒。', .4], '可是，能量到底是什么？', ['一个很诚实的回答是：我们并不知道。', .6],
    '我们只知道：有一些公式算出来的数，加起来总是不变。', ['先来看一个孩子和积木的故事。', .6]],
  draw(g, lt, s) {
    const L = s.L, ta = 1 - seg(lt, L[3] - .4, .5);
    txt(g, '能量守恒', W / 2, 360, { size: 160, w: 900, serif: true, al: 'center', a: ta, glow: 'rgba(255,200,87,.4)' });
    txt(g, '什么是能量？', W / 2, 520, { size: 62, w: 700, col: C.gold, al: 'center', a: ta });
    txt(g, '物理学最基本的定律之一', W / 2, 640, { size: 40, col: C.mute, al: 'center', a: ta * seg(lt, L[0], .5) * (1 - seg(lt, L[2], .4)) });
    const qa = seg(lt, L[3], .6);
    txt(g, '能量到底是什么？', W / 2, 300, { size: 64, w: 900, serif: true, al: 'center', a: qa });
    txt(g, '—— 我们并不知道。', W / 2, 400, { size: 52, w: 700, col: C.gold, al: 'center', a: qa });
    tex(g, 'sum_const', W / 2, 620, { size: 1.1, al: 'center', rev: lin(lt, L[4] + .3, 1.6) });
    // 一堆积木
    for (let k = 0; k < 7; k++) block(g, W / 2 - 200 + k * 90, 840 - (k % 2) * 10, BL, seg(lt, L[5] + k * .12, .3));
    person(g, W / 2 - 340, 900, 1.0, KID_D, seg(lt, L[5], .5));
  } });

// ---------- 1 28 块积木 ----------
S.push({ sec: '积木的故事', secEn: 'DENNIS AND HIS 28 BLOCKS',
  lines: ['有个孩子叫丹尼斯，他有 28 块积木。', '积木不会坏，也不能拆成更小的块，每一块都一模一样。', '每天早上，妈妈把他和 28 块积木留在房间里。', ['晚上，妈妈数一数：', .6], ['还是 28 块。', .6], ['天天如此。这就是一条“守恒定律”：积木数不变。', .8]],
  cues: [[s => s.L[4] + .2, 'ding']],
  draw(g, lt, s) {
    const L = s.L, ra = seg(lt, .1, .6);
    room(g, ra);
    const play = seg(lt, L[2], .6) * (1 - seg(lt, L[3] - .2, .6));
    for (let k = 0; k < 28; k++) { const [x, y] = gridPos(k);
      block(g, x + play * 40 * Math.sin(lt * 2.1 + k * 1.7), y + play * 30 * Math.cos(lt * 1.7 + k * 2.3), BL, seg(lt, L[0] + k * .03, .3)); }
    const ca = seg(lt, L[3], .5), n = Math.min(28, Math.floor(28 * lin(lt, L[3] + .3, 1.6)));
    counter(g, '今晚数到', n, ca, n === 28 && lt > L[4] ? C.gold : C.ink);
    person(g, 180, 785, 1, KID_D, seg(lt, L[0], .5), { arm: play > .3 ? 'up' : 'down' });
    person(g, 1830, 900, 1, MOM, seg(lt, L[2] - .3, .5), { mood: lt > L[4] ? 'smile' : 'think' });
    pill(g, '积木数 = 28　（守恒）', 1480, 560, C.gold, { al: 'center', a: seg(lt, L[5], .5), size: 38 });
  } });

// ---------- 2 地毯下 ----------
S.push({ sec: '积木的故事 · 27 块？', secEn: 'UNDER THE CARPET',
  lines: ['有一天，只数到 27 块。', '妈妈找了找：地毯下面还压着一块。', ['所以要确定总数没变，就得把每个角落都找到。', .8]],
  draw(g, lt, s) {
    const L = s.L; room(g, 1, { carpet: 1 });
    for (let k = 0; k < 27; k++) { const [x, y] = gridPos(k); block(g, x, y); }
    const fa = seg(lt, L[1], .5);
    block(g, RX + 730, RY + 550, BL, .5 + .5 * fa, 54, fa < .5);
    if (fa > 0) { g.save(); g.globalAlpha = fa; g.strokeStyle = C.gold; g.lineWidth = 4; g.beginPath(); g.arc(RX + 730, RY + 550, 52, 0, 7); g.stroke(); g.restore(); }
    counter(g, '看得见的', 27, 1);
    person(g, 180, 785, 1, KID_D, 1);
    person(g, 1830, 900, 1, MOM, 1, { mood: fa > .5 ? 'smile' : 'think', arm: fa > .5 ? 'point' : 'down' });
    txt(g, '+ 地毯下 1 块 = 28', 1480, 520, { size: 46, w: 700, col: C.gold, al: 'center', a: fa });
    pill(g, '找遍每个角落', 1480, 640, C.blue, { al: 'center', a: seg(lt, L[2], .5), size: 36 });
  } });

// ---------- 3 窗户与布鲁斯 ----------
S.push({ sec: '积木的故事 · 26 块？30 块？', secEn: 'THE OPEN WINDOW',
  lines: ['又有一天，只有 26 块。', '窗户开着，往外一看，窗外地上躺着 2 块。', ['又有一天，竟然有 30 块！', .3], '原来邻居家的孩子布鲁斯来玩过，留下了 2 块他的积木。',
    '妈妈拿走多余的积木，关上窗，不再让布鲁斯进来。', ['积木可能跑出去，也可能从外面进来——必须看住房间的边界。', .8]],
  draw(g, lt, s) {
    const L = s.L, ph2 = lt >= L[2], ph3 = lt >= L[4];
    room(g, 1, { winOpen: !ph3, sealed: lt > L[5], winLabel: 1 });
    const n = ph2 ? 28 : 26;
    for (let k = 0; k < n; k++) { const [x, y] = gridPos(k); block(g, x, y); }
    const oa = seg(lt, L[1], .5) * (1 - seg(lt, L[2] - .3, .4));
    block(g, RX + RW + 60, RY + 240, BL, oa); block(g, RX + RW + 122, RY + 300, BL, oa);
    txt(g, '窗外', RX + RW + 90, RY + 370, { size: 30, w: 700, col: C.mute, al: 'center', a: oa });
    const ba = seg(lt, L[2], .4) * (1 - seg(lt, L[4], .5));
    block(g, RX + 220, RY + 560, RED, ba); block(g, RX + 320, RY + 560, RED, ba);
    txt(g, '布鲁斯的', RX + 270, RY + 620, { size: 30, w: 700, col: RED, al: 'center', a: seg(lt, L[3], .4) * ba });
    person(g, 620, 785, 1, KID_D, 1, { mood: ph2 && !ph3 ? 'smile' : 'smile' });
    person(g, 1105, 785, 1, KID_B, seg(lt, L[3] - .3, .5) * (1 - seg(lt, L[4] + .4, .5)), { arm: 'up' });
    person(g, 1830, 900, 1, MOM, 1, { mood: ph2 && !ph3 ? 'wow' : 'think', arm: ph3 ? 'hips' : 'down' });
    const cnt = ph3 ? 28 : ph2 ? 30 : 26;
    counter(g, '看得见的', cnt, 1, ph2 && !ph3 ? RED : C.ink, 300);
    txt(g, '+ 窗外 2 块 = 28', 1480, 520, { size: 46, w: 700, col: C.gold, al: 'center', a: oa });
    txt(g, '− 布鲁斯的 2 块 = 28', 1480, 520, { size: 46, w: 700, col: RED, al: 'center', a: seg(lt, L[3], .4) * (1 - seg(lt, L[4], .4)) });
    pill(g, '关上窗：封闭系统', 1480, 640, C.gold, { al: 'center', a: seg(lt, L[5], .5), size: 38 });
  } });

// ---------- 4 玩具箱：称重 ----------
S.push({ sec: '积木的故事 · 25 块？', secEn: 'WEIGH THE BOX',
  lines: ['后来有一天，只数到 25 块。', '房间里有个玩具箱，孩子大喊：别打开我的箱子！', '妈妈想了个办法：她知道一块积木重 50 克，', '空箱子重 200 克。', '她称了称箱子：350 克。', ['多出来 150 克，除以 50：箱子里有 3 块。', .4],
    '于是她写出一条公式：', ['看得见的积木数，加上（箱重 − 200 克）除以 50 克，等于常数。', .8]],
  cues: [[s => s.L[5] + 1.0, 'ding']],
  draw(g, lt, s) {
    const L = s.L; room(g, 1, { box: 1 });
    for (let k = 0; k < 25; k++) { const [x, y] = gridPos(k); block(g, x, y); }
    const ga = seg(lt, L[5], .5); [0, 1, 2].forEach(j => block(g, RX + 680 + j * 70, RY + 540, BL, ga, 46, true));
    counter(g, '看得见的', 25, 1, C.ink, 280);
    const sh = seg(lt, L[1], .3) * (1 - seg(lt, L[2] + .4, .4));
    person(g, 680, 785, 1, KID_D, 1, { mood: sh > .2 ? 'shout' : 'smile', arm: sh > .2 ? 'up' : 'down' });
    bubble(g, '别打开我的箱子！', 560, 520, 665, 585, sh);
    person(g, 1830, 900, 1, MOM, 1, { mood: 'think' });
    const sa = seg(lt, L[2], .5);
    txt(g, '1 块积木 = 50 g', 1480, 470, { size: 38, w: 700, col: C.ink, al: 'center', a: sa });
    txt(g, '空箱子 = 200 g', 1480, 525, { size: 38, w: 700, col: C.ink, al: 'center', a: seg(lt, L[3], .5) });
    txt(g, '这次称得 = 350 g', 1480, 580, { size: 38, w: 700, col: C.gold, al: 'center', a: seg(lt, L[4], .5) });
    fitTex(g, 'ex41', 1480, 690, 560, { size: .9, al: 'center', rev: lin(lt, L[5], 1.4) });
    fitTex(g, 'eq41', W / 2, 900, 1500, { size: .75, al: 'center', rev: lin(lt, L[6] + .3, 2.0) });
  } });

// ---------- 5 浴缸 ----------
S.push({ sec: '积木的故事 · 又对不上了', secEn: 'THE DIRTY BATHWATER',
  lines: ['后来，数字又对不上了。', '原来浴缸里的水很脏，孩子把积木扔进了水里，她看不见。', '水原来深 15 厘米，每扔进一块积木，水面升高 0.5 厘米。', ['于是公式里再加一项。', .4],
    ['这次：看得见 23 块，箱子算出 3 块，水深 16 厘米算出 2 块。', .4], ['23 + 3 + 2 = 28。', .8], ['公式越来越复杂，但算出来的总数，始终是 28。', .8]],
  cues: [[s => s.L[5] + .4, 'ding']],
  draw(g, lt, s) {
    const L = s.L, lv = 15 + 1 * seg(lt, L[2] + .6, 1.2);
    room(g, 1, { tub: 1, level: lv });
    // 箱子挪到左下角
    const bx = RX + 360, by = RY + 470; rrect(g, bx, by, 200, 140, 10, '#6B4A2A', '#C89A5E', 3, 1); txt(g, '玩具箱', bx + 100, by + 75, { size: 30, w: 700, col: '#F2D7A8', al: 'center' });
    for (let k = 0; k < 23; k++) { const [x, y] = gridPos(k); if (y < RY + 450) block(g, x, y); else block(g, x - 0, y, BL, 1); }
    const ga = seg(lt, L[4], .5); [0, 1].forEach(j => block(g, RX + 690 + j * 80, RY + 560, BL, ga, 46, true));
    counter(g, '看得见的', 23, 1, C.ink, 280);
    person(g, 180, 785, 1, KID_D, 1, { arm: lt > L[1] && lt < L[3] ? 'point' : 'down' });
    person(g, 1830, 900, 1, MOM, 1, { mood: lt > L[5] ? 'smile' : 'think' });
    fitTex(g, 'ex42', 1480, 520, 600, { size: .9, al: 'center', rev: lin(lt, L[4], 2.0) });
    fitTex(g, 'eq42', W / 2, 900, 1700, { size: .72, al: 'center', rev: lin(lt, L[3], 2.4) });
    pill(g, '总数 = 28', 1480, 660, C.gold, { al: 'center', a: seg(lt, L[5], .5), size: 44 });
  } });

// ---------- 6 根本没有积木 ----------
S.push({ sec: '关键一步', secEn: 'THERE ARE NO BLOCKS',
  lines: ['现在，把这个比喻里最重要的东西拿掉：', ['根本没有积木。', .8], '把公式里“看得见的积木数”这一项划掉，', '剩下的每一项，都只是用测量值算出来的数。', ['把它们加起来，结果总是同一个数，“28”。', .6], ['能量守恒，就是这种类型的定律。', 1.0]],
  cues: [[s => s.L[1] + .3, 'ding']],
  draw(g, lt, s) {
    const L = s.L, fa = 1 - seg(lt, L[1], .9);
    for (let k = 0; k < 28; k++) { const [x, y] = gridPos(k); block(g, x + 380, y - 40 - (1 - fa) * 60 * ((k % 5) / 4), BL, fa * .9); }
    txt(g, '根本没有积木', W / 2, 480, { size: 110, w: 900, serif: true, col: RED, al: 'center', a: seg(lt, L[1] + .2, .5) * (1 - seg(lt, L[2] - .5, .4)), glow: 'rgba(255,85,119,.4)' });
    const ea = seg(lt, L[2] - .3, .5);
    tex(g, 'eq42', W / 2, 360, { size: .95, al: 'center', a: ea * (1 - seg(lt, L[2] + .6, .5)) });
    tex(g, 'eq42c', W / 2, 360, { size: .95, al: 'center', a: seg(lt, L[2] + .6, .5) });
    txt(g, '每一项：一个测量值代进公式算出的数', W / 2, 520, { size: 40, w: 700, col: C.blue, al: 'center', a: seg(lt, L[3], .5) });
    txt(g, '总和 = 28', W / 2, 680, { size: 96, w: 900, col: C.gold, al: 'center', a: seg(lt, L[4], .5), glow: 'rgba(255,200,87,.5)' });
    txt(g, '能量守恒：某个算出来的总数不变', W / 2, 820, { size: 48, w: 700, al: 'center', a: seg(lt, L[5], .5) });
  } });

// ---------- 7 三点对应 ----------
const FORMS = ['引力能', '动能', '热能', '弹性能', '电能', '化学能', '辐射能', '核能', '质能'];
S.push({ sec: '比喻 ↔ 能量', secEn: 'THREE LESSONS',
  lines: ['比喻和能量守恒，有三点对应。', '第一：能量会离开系统，也会从外面进来。', ['要验证守恒，就得看住边界，像关上窗户。', .4], '第二：能量有很多种形式，每一种都有自己的公式，', ['就像箱子一项、浴缸一项。', .3],
    '引力能、动能、热能、弹性能、电能、化学能、辐射能、核能、质能。', ['把这些公式全部加起来，只要没有能量进出，总和不变。', .6], '第三：我们并不知道能量“是”什么。', ['它不是一颗颗的小块，只是一个算出来的数。', 1.0]],
  draw(g, lt, s) {
    const L = s.L;
    const cards = [['① 看住边界', '窗户、布鲁斯', '能量进出系统', L[1]], ['② 很多种形式', '箱子一项、浴缸一项', '每种能量一个公式', L[3]], ['③ 不知道“是”什么', '根本没有积木', '只是算出来的数', L[7]]];
    cards.forEach(([h, a1, a2, t0], j) => {
      const x = 330 + j * 630, a = seg(lt, t0, .5), hot = lt >= t0 && (j === 2 || lt < cards[j + 1][3]);
      rrect(g, x - 280, 190, 560, 420, 20, hot ? 'rgba(255,200,87,.08)' : 'rgba(8,14,28,.6)', hot ? C.gold : 'rgba(169,188,211,.3)', hot ? 3 : 2, a);
      txt(g, h, x, 260, { size: 46, w: 900, col: hot ? C.gold : C.ink, al: 'center', a });
      txt(g, '比喻里：' + a1, x, 380, { size: 34, w: 700, col: C.blue, al: 'center', a });
      arrow(g, x, 420, x, 480, 'rgba(169,188,211,.7)', 3, 14, a);
      txt(g, '物理里：' + a2, x, 530, { size: 34, w: 700, col: C.ink, al: 'center', a });
    });
    FORMS.forEach((f, j) => { const a = seg(lt, L[5] + j * .32, .35); pill(g, f, 160 + j * 200, 720, j === 8 ? C.gold : C.blue, { a, size: 32 }); });
    tex(g, 'summ', W / 2, 860, { size: .75, al: 'center', rev: lin(lt, L[6], 1.4) });
  } });

// ---------- 8 例子：落下的球 ----------
const M = 1, G = 9.8, H0 = 5;
S.push({ sec: '例子：落下的球', secEn: 'mgh + ½mv² = CONST',
  lines: ['举个最简单的例子：1 千克的球，从 5 米高处静止落下。', '它有两种能量：重力势能 mgh，和动能 ½mv²。', ['开始时：势能 49 焦，动能 0。', .4], ['落到 3 米：势能 29.4 焦，动能 19.6 焦。', .4], ['落到地面：势能 0，动能 49 焦。', .4],
    ['一项减少，另一项增加，总和始终是 49 焦。', .8], ['这里取 g = 9.8 米每二次方秒，忽略空气阻力。', .4]],
  cues: [[s => s.L[5] + .4, 'ding']],
  draw(g, lt, s) {
    const L = s.L, ox = 420, y0 = 840, sc = 112;          // 高度刻度：1 m = 112 px
    const ga = seg(lt, .1, .6);
    line(g, ox, y0, ox, y0 - 5.6 * sc, C.axis, 3, null, ga); line(g, ox - 4, y0, ox + 240, y0, C.axis, 4, null, ga);
    for (let m = 0; m <= 5; m++) { line(g, ox - 12, y0 - m * sc, ox, y0 - m * sc, C.axis, 3, null, ga); txt(g, `${m} m`, ox - 26, y0 - m * sc, { size: 28, mono: true, col: C.mute, al: 'right', a: ga }); }
    let h = H0; if (lt > L[3]) h = 5 - 2 * ease(lin(lt, L[3], 1.2)); if (lt > L[4]) h = 3 - 3 * ease(lin(lt, L[4], 1.1));
    dot(g, ox + 110, y0 - h * sc - 26, 26, C.ink, ga, 18);
    const Ep = M * G * h, Ek = M * G * (H0 - h);
    // 能量柱：49 J = 490 px
    const bx = 1150, bw = 150, by = 840, k = 10;
    const ba = seg(lt, L[1], .5);
    rrect(g, bx, by - Ep * k, bw, Ep * k, 4, 'rgba(94,200,255,.75)', null, 0, ba);
    rrect(g, bx, by - Ep * k - Ek * k, bw, Ek * k, 4, 'rgba(255,200,87,.8)', null, 0, ba);
    line(g, bx - 40, by - 490, bx + bw + 40, by - 490, C.gold, 3, [10, 8], ba);
    txt(g, '总和 49 J', bx + bw + 56, by - 490, { size: 34, w: 700, col: C.gold, a: seg(lt, L[5], .5) });
    line(g, bx - 40, by, bx + bw + 40, by, C.axis, 3, null, ba);
    tex(g, 'ep', bx + bw + 56, by - Ep * k / 2, { size: .62, col: 'blue', a: ba * (Ep > 3 ? 1 : 0) });
    tex(g, 'ek', bx + bw + 56, by - Ep * k - Ek * k / 2, { size: .62, col: 'gold', a: ba * (Ek > 3 ? 1 : 0) });
    // 数值表
    const tx = 1560, ta = seg(lt, L[2], .4);
    txt(g, `h = ${h.toFixed(2)} m`, tx, 300, { size: 34, mono: true, a: ta });
    txt(g, `势能 = ${Ep.toFixed(1)} J`, tx, 360, { size: 34, mono: true, col: C.blue, a: ta });
    txt(g, `动能 = ${Ek.toFixed(1)} J`, tx, 420, { size: 34, mono: true, col: C.gold, a: ta });
    txt(g, `总和 = ${(Ep + Ek).toFixed(1)} J`, tx, 480, { size: 34, mono: true, w: 700, a: ta });
    tex(g, 'etot', 760, 200, { size: .9, al: 'center', rev: lin(lt, L[5], 1.2) });
  } });

// ---------- 9 总结 ----------
S.push({ sec: '总结', secEn: 'SUMMARY',
  lines: ['总结一下。', '能量守恒：把各种形式的能量，按各自的公式算出来，', ['在没有能量进出的系统里，总和不变。', .4], ['最常用的两个公式，值得直接记住：动能 ½mv²，重力势能 mgh。', .8],
    ['能量守恒告诉我们什么不变，却没有告诉我们为什么不变。', 1.4]], tail: 2.0,
  cues: [[s => s.L[3] + .3, 'ding']],
  draw(g, lt, s) {
    const L = s.L;
    tex(g, 'summ', W / 2, 250, { size: 1.0, al: 'center', rev: lin(lt, L[1], 2.0) });
    memo(g, 460, 420, 1000, 190, seg(lt, L[3], .5), '值得直接记住');
    tex(g, 'ek', W / 2 - 220, 520, { size: 1.0, al: 'center', a: seg(lt, L[3], .5) });
    tex(g, 'ep', W / 2 + 230, 520, { size: 1.0, al: 'center', a: seg(lt, L[3], .5) });
    txt(g, '“什么不变”  ≠  “为什么不变”', W / 2, 740, { size: 54, w: 900, serif: true, al: 'center', a: seg(lt, L[4], .6) });
  } });

window.NO_FADE_IN = true;
window.OVERLAY = (g, T) => {
  g.save(); g.fillStyle = 'rgba(169,188,211,.12)'; g.fillRect(0, 0, W, 6); g.fillStyle = 'rgba(255,200,87,.85)'; g.fillRect(0, 0, W * T / TOTAL, 6);
  SCENES.forEach(c => { if (c.t0 > 0) { g.fillStyle = 'rgba(10,17,32,.9)'; g.fillRect(W * c.t0 / TOTAL - 1, 0, 2, 6); } }); g.restore();
  txt(g, 'X物理', W - 60, 62, { size: 30, w: 700, col: 'rgba(238,243,250,.42)', al: 'right' });
};
setup(S);
