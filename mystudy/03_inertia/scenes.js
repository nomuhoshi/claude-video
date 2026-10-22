// 惯性力（科普，配乐卡点）：急刹车钩子 → 路边看 / 车里看 → 推导 → 三步法 → 电梯 ×2 → 电车摆与水面 → 回到公交 → 总结
// 配色：金 = 加速度 α / 结论；红 = 惯性力；冰蓝 = 真实的力；白 = 重力
window.GRID = { b0: 0.391, beat: 0.53194, bar: 4 * 0.53194 };   // vibe.mp3 节拍网格
window.NO_FADE_IN = true;
const S = [];
const RED = '#FF5577';
const RIDER = { kind: 'adult', skin: '#F2C9A0', hair: '#2E2A28', style: 'short', shirt: '#3D8BFF', pants: '#24324D', name: '乘客' };
const WALKER = { kind: 'adult', skin: '#E8B98E', hair: '#4A3020', style: 'short', shirt: '#5EE0A8', pants: '#2E3A40', name: '路边的人' };
const PA = { ...WALKER, name: 'A（地面）' }, PB = { ...RIDER, name: 'B（车上）' };
const IN_EL = { kind: 'adult', skin: '#F4D0AE', hair: '#5A3422', style: 'long', shirt: '#B48CFF', pants: '#6E55B0', name: '电梯里的人' };

// ---------- 道具 ----------
function bus(g, x, y, w, h, a = 1) {                    // 侧视公交车，(x, y) 左上
  if (a <= 0) return;
  rrect(g, x, y, w, h, 36, '#2F6FB0', '#9CC7F0', 3, a);
  for (let k = 0; k < 5; k++) rrect(g, x + 40 + k * (w - 80) / 5, y + 34, (w - 80) / 5 - 22, h * .36, 10, 'rgba(160,215,255,.22)', 'rgba(200,230,255,.6)', 2, a);
  rrect(g, x + w - 70, y + 34, 44, h - 70, 8, 'rgba(160,215,255,.18)', 'rgba(200,230,255,.6)', 2, a);
  g.save(); g.globalAlpha *= a; g.fillStyle = '#FFC857'; g.fillRect(x + w - 12, y + h - 70, 10, 26); g.restore();
  [x + 150, x + w - 180].forEach(cx => { dot(g, cx, y + h, 44, '#1B1F2A', a); dot(g, cx, y + h, 20, '#8A97AD', a); });
}
function road(g, y, off, a = 1) {
  if (a <= 0) return; line(g, 0, y, W, y, '#5A6B85', 4, null, a);
  g.save(); g.globalAlpha *= a; g.fillStyle = 'rgba(255,255,255,.55)';
  for (let x = -((off % 160) + 160) % 160 - 160; x < W + 160; x += 160) g.fillRect(x, y + 34, 80, 8); g.restore();
}
function elevator(g, x, y, w, h, a = 1) {
  if (a <= 0) return; line(g, x + w / 2, 0, x + w / 2, y, '#8A97AD', 4, null, a);
  rrect(g, x, y, w, h, 8, 'rgba(22,32,52,.85)', 'rgba(169,188,211,.85)', 5, a);
}
function car(g, x, y, w, h, a = 1) {
  if (a <= 0) return; rrect(g, x, y, w, h, 18, 'rgba(22,32,52,.85)', 'rgba(169,188,211,.85)', 5, a);
  [x + 110, x + w - 110].forEach(cx => { dot(g, cx, y + h + 18, 26, '#1B1F2A', a); dot(g, cx, y + h + 18, 10, '#8A97AD', a); });
  line(g, 0, y + h + 46, W, y + h + 46, '#5A6B85', 4, null, a);
}
function force(g, x1, y1, x2, y2, col, k, a, lx = 18, ly = 0) {   // 力的箭头 + TeX 标签
  if (a <= 0) return; arrow(g, x1, y1, x2, y2, col, 6, 22, a);
  if (k) tex(g, k, x2 + lx, y2 + ly, { size: .7, a, col: col === C.ink ? null : col });
}
function accel(g, x, y, dx, dy, a, lab = 'l_a') {         // 双线空心的“加速度”箭头
  if (a <= 0) return; arrow(g, x, y, x + dx, y + dy, C.gold, 5, 20, a);
  if (lab) tex(g, lab, x + dx + (dx ? 20 * Math.sign(dx) : 18), y + dy + (dy ? 0 : -6), { size: .75, col: 'gold', a, al: dx < 0 ? 'right' : 'left' });
}

// ---------- 0 钩子：急刹车（第 0 帧就是主题卡） ----------
S.push({ lead: 1.6,
  lines: ['公交车突然刹车，你会往前一冲。', '好像有一股力，把你往前推。', ['可是，谁在推你？没有人，也没有东西碰到你。', .4], ['这股找不到“施力者”的力，叫惯性力。', .8]],
  cues: [[s => s.L[3] + .1, 'ding']],
  draw(g, lt, s) {
    const L = s.L, tb = L[0] + .3, p = clamp((lt - tb) / 1.4), V = 520;
    const pos = lt < tb ? lt * V : tb * V + V * 1.4 * (p - p * p / 2);
    const ba = seg(lt, 1.2, .5);
    road(g, 800, pos, ba);
    bus(g, 380, 330, 1160, 380, ba);
    const lean = lt < tb ? 0 : .34 * Math.sin(Math.PI * Math.min(1, (lt - tb) / 1.6)) * (lt - tb < 1.6 ? 1 : 0);
    person(g, 1000, 700, 1.15, RIDER, ba, { lean, arm: 'hold', mood: lean > .1 ? 'wow' : 'smile', label: false });
    line(g, 1060, 360, 1060, 420, '#C9D3E3', 4, null, ba);              // 吊环
    const q = seg(lt, L[2], .4) * (1 - seg(lt, L[3] - .2, .3));
    txt(g, '？', 1250, 420, { size: 150, w: 900, col: C.gold, al: 'center', a: q, glow: 'rgba(255,200,87,.5)' });
    arrow(g, 1050, 520, 1230, 520, RED, 7, 26, seg(lt, L[1], .4));
    pill(g, '惯性力', 1290, 520, RED, { a: seg(lt, L[3], .5), size: 44 });
    // 主题卡（0–1.3 s）
    const ta = 1 - seg(lt, .9, .4);
    if (ta > 0) { g.save(); g.globalAlpha = ta * .7; g.fillStyle = '#0A1120'; g.fillRect(0, 0, W, H); g.restore();
      txt(g, '惯性力', W / 2, 420, { size: 180, w: 900, serif: true, al: 'center', a: ta, glow: 'rgba(255,200,87,.45)' });
      txt(g, '急刹车时，是谁推了你？', W / 2, 600, { size: 58, w: 700, col: C.gold, al: 'center', a: ta }); }
  } });

// ---------- 1 站在路边看 ----------
S.push({ sec: '站在路边看', secEn: 'FROM THE ROADSIDE',
  lines: ['先站在路边看。', '刹车时，车在减速；', '可你的身体本来就在往前跑，没有力让它马上停下，', ['它还想保持原来的速度——这就是惯性。', .4], ['车慢了，你没慢，于是你相对车往前冲。', .6], ['在路边看，并没有任何“向前的力”。', .6]],
  draw(g, lt, s) {
    const L = s.L, p = clamp((lt - L[1]) / 2.4), V = 420, pos = lt < L[1] ? lt * V : L[1] * V + V * 2.4 * (p - p * p / 2);
    road(g, 760, pos);
    bus(g, 260, 400, 860, 300);
    const lean = lt > L[1] ? .3 * Math.min(1, (lt - L[1]) / 1.0) : 0;
    person(g, 860, 690, .95, RIDER, 1, { lean, arm: 'hold', label: false });
    person(g, 1500, 900, 1.0, WALKER, seg(lt, L[0] - .2, .5));
    // 速度箭头：车（金）在缩短，人（蓝）不变
    const va = seg(lt, L[1], .4);
    arrow(g, 360, 350, 360 + 320 * (1 - p), 350, C.gold, 6, 22, va);
    txt(g, '车的速度：在减小', 360, 300, { size: 34, w: 700, col: C.gold, a: va });
    const ha = seg(lt, L[2], .4);
    arrow(g, 880, 470, 1200, 470, C.blue, 6, 22, ha);
    txt(g, '你的速度：还想保持', 1220, 470, { size: 34, w: 700, col: C.blue, a: ha });
    pill(g, '惯性：保持原来的运动状态', 1500, 200, C.blue, { a: seg(lt, L[3], .5), al: 'center', size: 36 });
    txt(g, '没有向前的力', 1500, 640, { size: 46, w: 900, col: C.ink, al: 'center', a: seg(lt, L[5], .5) });
  } });

// ---------- 2 坐在车里看 ----------
S.push({ sec: '坐在车里看', secEn: 'FROM INSIDE THE BUS',
  lines: ['再坐到车里看。', '在车里的你看来，自己本来是静止的，', '却突然往前冲——好像受了一个向前的力。', ['车上的人想继续用牛顿定律，就得把这个力补上。', .4], ['它和车的加速度方向相反，大小是 mα。', .6], ['这就是惯性力。', .8]],
  cues: [[s => s.L[5] + .1, 'ding']],
  draw(g, lt, s) {
    const L = s.L;
    rrect(g, 160, 180, 1100, 640, 30, 'rgba(47,111,176,.18)', '#9CC7F0', 4, 1);           // 车厢内
    for (let k = 0; k < 3; k++) rrect(g, 220 + k * 340, 230, 300, 200, 14, 'rgba(160,215,255,.12)', 'rgba(200,230,255,.45)', 2, 1);
    line(g, 160, 760, 1260, 760, '#5A6B85', 4);
    txt(g, '车头 →', 1190, 150, { size: 30, w: 700, col: C.mute, al: 'right' });
    const lean = .3 * seg(lt, L[2], .5);
    person(g, 700, 760, 1.35, RIDER, 1, { lean, arm: 'hold', mood: lean > .1 ? 'wow' : 'smile', label: false });
    line(g, 760, 180, 760, 270, '#C9D3E3', 4);
    const aa = seg(lt, L[4], .5);
    accel(g, 1180, 870, -260, 0, aa);
    txt(g, '刹车：车的加速度向后', 900, 920, { size: 30, w: 700, col: C.gold, al: 'right', a: aa });
    force(g, 760, 520, 1010, 520, RED, 'l_ma', seg(lt, L[3], .5), 18, -4);
    tex(g, 'finert', 1580, 520, { size: 1.1, al: 'center', rev: lin(lt, L[5], 1.0) });
    memo(g, 1360, 450, 440, 140, seg(lt, L[5] + .8, .5), '惯性力');
  } });

// ---------- 3 为什么可以补一个力 ----------
S.push({ sec: '为什么可以“补”一个力', secEn: 'WHERE −mα COMES FROM',
  lines: ['为什么可以“补”一个力？从牛顿定律出发。', '地面上的人 A，看到物体的加速度是 a，', ['他写下：ma = F。', .3], '车上的人 B 自己有加速度 α，看到物体的加速度是 a′。', ['从地面看，a = α + a′。', .3], ['代进去：m(α + a′) = F，', .3], ['移项：ma′ = F + (−mα)。', .6],
    ['左边是 B 看到的加速度，右边多出来的 −mα，就是惯性力。', .8], ['它不是谁施加的真实的力，是换了参考系后补上的一项。', .8]],
  cues: [[s => s.L[6] + 1.0, 'ding']],
  draw(g, lt, s) {
    const L = s.L;
    line(g, 120, 470, 560, 470, '#5A6B85', 4);
    person(g, 260, 470, .95, PA, seg(lt, L[1] - .3, .4));
    const ca = seg(lt, L[3] - .3, .4), cx = 260 + 60 * Math.max(0, lt - L[3]) % 1;
    line(g, 120, 860, 760, 860, '#5A6B85', 4, null, ca);
    rrect(g, 160, 818, 220, 22, 8, '#3A4660', null, 0, ca); dot(g, 190, 848, 12, '#1B1F2A', ca); dot(g, 350, 848, 12, '#1B1F2A', ca);
    person(g, 270, 818, .95, PB, ca, { label: false }); txt(g, 'B（车上）', 270, 900, { size: 26, w: 700, col: PB.shirt, al: 'center', a: ca });
    accel(g, 420, 760, 160, 0, ca);
    const ma = seg(lt, L[0], .4);
    dot(g, 560, 280, 26, '#C9D3E3', ma, 10); tex(g, 'l_m', 560, 228, { size: .7, al: 'center', a: ma });
    force(g, 592, 280, 780, 280, C.blue, 'l_F', ma);
    const fx = 960, sz = .95;
    tex(g, 'newtA', fx, 230, { size: sz, rev: lin(lt, L[2], .8) }); txt(g, 'A：', fx - 20, 230, { size: 40, w: 700, col: PA.shirt, al: 'right', a: seg(lt, L[2], .3) });
    tex(g, 'rel', fx, 360, { size: sz, rev: lin(lt, L[4], .9) });
    tex(g, 'sub', fx, 480, { size: sz, rev: lin(lt, L[5], 1.0) });
    tex(g, 'res', fx, 620, { size: 1.05, rev: lin(lt, L[6], 1.2) }); txt(g, 'B：', fx - 20, 620, { size: 40, w: 700, col: PB.shirt, al: 'right', a: seg(lt, L[6], .3) });
    const la = seg(lt, L[7], .5);
    txt(g, '看到的加速度', fx + 60, 712, { size: 30, w: 700, col: C.ink, al: 'center', a: la });
    txt(g, '真实的力', fx + 255, 712, { size: 30, w: 700, col: C.blue, al: 'center', a: la });
    txt(g, '惯性力', fx + 440, 712, { size: 30, w: 700, col: RED, al: 'center', a: la });
    pill(g, '换参考系时补上的一项，不是谁施加的力', 1300, 840, C.gold, { al: 'center', a: seg(lt, L[8], .5), size: 34 });
  } });

// ---------- 4 三步法 ----------
S.push({ sec: '三步解题', secEn: 'THREE STEPS',
  lines: ['用惯性力解题，只要三步：', '第一，找出你所在的车、电梯的加速度 α；', '第二，在物体上加一个惯性力：和 α 反向，大小 mα；', ['第三，物体看起来静止，就列力平衡；看起来在动，就列运动方程。', 1.0]],
  draw(g, lt, s) {
    const L = s.L, cards = [['①', '找乘物的加速度 α', L[1]], ['②', '加惯性力：与 α 反向，大小 mα', L[2]], ['③', '静止 → 力平衡\n在动 → 运动方程', L[3]]];
    cards.forEach(([n, t2, t0], j) => {
      const y = 260 + j * 200, a = seg(lt, t0, .5), hot = lt >= t0 && (j === 2 || lt < cards[j + 1][2]);
      rrect(g, 360, y - 75, 1200, 150, 22, hot ? 'rgba(255,200,87,.09)' : 'rgba(8,14,28,.6)', hot ? C.gold : 'rgba(169,188,211,.3)', hot ? 3 : 2, a);
      txt(g, n, 440, y, { size: 64, w: 900, col: C.gold, al: 'center', a });
      t2.split('\n').forEach((ln, k, arr) => txt(g, ln, 520, y + (k - (arr.length - 1) / 2) * 50, { size: 44, w: 700, a }));
    });
  } });

// ---------- 5 例一：电梯里的拉力 ----------
const ELX = 300, ELY = 180, ELW = 520, ELH = 640;
S.push({ sec: '例一：电梯里的绳子', secEn: 'TENSION IN A RISING ELEVATOR',
  lines: ['例一：电梯以加速度 α 向上加速，里面用绳子吊着质量 m 的重物。', '在电梯里的人看来，重物是静止的。', '它受到：向上的拉力 T、向下的重力 mg，', ['再加上向下的惯性力 mα。', .3], ['静止，所以力平衡：T = m(g + α)。', .8], ['电梯启动上升时，你觉得身体变重，就是这个道理。', .6]],
  cues: [[s => s.L[4] + .8, 'ding']],
  draw(g, lt, s) {
    const L = s.L; elevator(g, ELX, ELY, ELW, ELH);
    accel(g, ELX + ELW + 60, 500, 0, -180, seg(lt, L[0], .5));
    const mx = ELX + 220, my = 470;
    line(g, mx, ELY, mx, my - 30, '#C9D3E3', 3);
    rrect(g, mx - 34, my - 30, 68, 60, 8, '#C9D3E3', null, 0, 1); tex(g, 'l_m', mx, my, { size: .6, al: 'center', col: '#0A1120' });
    person(g, ELX + 410, ELY + ELH, 1.0, IN_EL, 1, { label: false });
    force(g, mx, my - 34, mx, my - 200, C.blue, 'l_T', seg(lt, L[2], .4), 18, 10);
    force(g, mx - 12, my + 34, mx - 12, my + 200, C.ink, 'l_mg', seg(lt, L[2] + .6, .4), -90, -10);
    force(g, mx + 14, my + 34, mx + 14, my + 140, RED, 'l_ma', seg(lt, L[3], .4), 18, -10);
    tex(g, 'el_T', 1400, 420, { size: 1.0, al: 'center', rev: lin(lt, L[4], 1.2) });
    txt(g, '比静止时的 mg 更大', 1400, 540, { size: 38, w: 700, col: C.gold, al: 'center', a: seg(lt, L[5], .5) });
    txt(g, '静止 → 力平衡', 1400, 300, { size: 40, w: 700, col: C.mute, al: 'center', a: seg(lt, L[1], .5) });
  } });

// ---------- 6 例二：剪断绳子 ----------
S.push({ sec: '例二：剪断绳子', secEn: 'FREE FALL INSIDE AN ELEVATOR',
  lines: ['如果这时剪断绳子，重物离地板 h，多久落地？', '在地面上看很麻烦：重物先像被往上抛，地板又在往上追它。', '在电梯里看就简单了：重物受 mg 和 mα，都向下，', ['所以 a = g + α。', .3], ['从静止开始匀加速：h = ½(g + α)t²，', .3], ['t = √(2h / (g + α))。', .8],
    ['在电梯里，就像重力加速度变成了 g + α，叫“等效重力加速度”。', .8]],
  cues: [[s => s.L[5] + .6, 'ding']],
  draw(g, lt, s) {
    const L = s.L; elevator(g, ELX, ELY, ELW, ELH);
    accel(g, ELX + ELW + 60, 500, 0, -180, 1);
    const mx = ELX + 220, my0 = 470, fl = ELY + ELH - 30;
    const ft = Math.max(0, lt - (L[2] + .4)), fall = Math.min(fl - my0, 0.5 * 420 * ft * ft);
    const cut = lt > L[2] + .4;
    line(g, mx, ELY, mx, cut ? ELY + 120 : my0 - 30, '#C9D3E3', 3);
    if (cut) { line(g, mx - 16, ELY + 132, mx + 16, ELY + 156, RED, 4); line(g, mx + 16, ELY + 132, mx - 16, ELY + 156, RED, 4); }
    const my = my0 + fall;
    rrect(g, mx - 34, my - 30, 68, 60, 8, '#C9D3E3', null, 0, 1); tex(g, 'l_m', mx, my, { size: .6, al: 'center', col: '#0A1120' });
    const ha = seg(lt, L[0], .4) * (1 - seg(lt, L[2] + .3, .3));
    brace(g, mx + 70, my0 + 30, mx + 70, fl + 30, C.gold, ha, 22); tex(g, 'l_h', mx + 116, (my0 + fl) / 2 + 30, { size: .8, col: 'gold', a: ha });
    const fa = seg(lt, L[2], .4) * (1 - seg(lt, L[2] + .35, .2));
    force(g, mx - 12, my + 34, mx - 12, my + 170, C.ink, 'l_mg', fa, -90, -10);
    force(g, mx + 14, my + 34, mx + 14, my + 120, RED, 'l_ma', fa, 18, -10);
    person(g, ELX + 410, ELY + ELH, 1.0, IN_EL, 1, { label: false, mood: cut ? 'wow' : 'smile' });
    txt(g, '地面上看：上抛 + 地板追赶，很麻烦', 1400, 260, { size: 34, w: 700, col: C.mute, al: 'center', a: seg(lt, L[1], .4) });
    tex(g, 'el_a', 1400, 400, { size: .95, al: 'center', rev: lin(lt, L[3], 1.0) });
    tex(g, 'el_h', 1400, 520, { size: .95, al: 'center', rev: lin(lt, L[4], 1.0) });
    tex(g, 'el_t', 1400, 660, { size: 1.0, al: 'center', rev: lin(lt, L[5], 1.0) });
    pill(g, '等效重力加速度 g + α', 1400, 800, C.gold, { al: 'center', a: seg(lt, L[6], .5), size: 38 });
  } });

// ---------- 7 例三：电车里的摆和水面 ----------
const TH = Math.atan(0.4);                                    // α = 0.4 g 时的偏角（约 21.8°）
S.push({ sec: '例三：电车里的摆和水面', secEn: 'PENDULUM & WATER IN A TRAIN',
  lines: ['例三：电车以加速度 α 向右加速，车顶吊着一个摆。', '车里的人看到，摆偏向后方一个角度，静止不动。', '摆受到：拉力 T、重力 mg，和向后的惯性力 mα。', ['力平衡：tanθ = α / g，T = m√(g² + α²)。', .6], '重力和惯性力合起来，就像一个斜着的“等效重力”。', ['所以车里杯子的水面也会斜过来，总是和等效重力垂直。', .8]],
  cues: [[s => s.L[3] + .8, 'ding']],
  draw(g, lt, s) {
    const L = s.L; car(g, 160, 260, 900, 520);
    accel(g, 860, 200, 220, 0, 1);
    const px = 520, py = 270, len = 300, th = TH * seg(lt, L[1], 1.0);
    const bx = px - len * Math.sin(th), by = py + len * Math.cos(th);
    line(g, px - 30, py, px + 30, py, '#C9D3E3', 6);
    line(g, px, py, px, py + len + 40, 'rgba(169,188,211,.35)', 2, [8, 8], seg(lt, L[1], .4));
    line(g, px, py, bx, by, '#C9D3E3', 3); dot(g, bx, by, 24, '#C9D3E3', 1, 10);
    if (th > .05) { g.save(); g.strokeStyle = C.gold; g.lineWidth = 3; g.beginPath(); g.arc(px, py, 90, Math.PI / 2, Math.PI / 2 + th); g.stroke(); g.restore();
      tex(g, 'l_th', px + 30, py + 118, { size: .7, col: 'gold', al: 'center', a: seg(lt, L[1] + .8, .4) }); }
    const fa = seg(lt, L[2], .4);
    force(g, bx, by, bx + (px - bx) * .42, by + (py - by) * .42, C.blue, 'l_T', fa, -40, 6);
    force(g, bx, by + 24, bx, by + 190, C.ink, 'l_mg', fa, 14, 0);
    force(g, bx - 24, by, bx - 100, by, RED, 'l_ma', seg(lt, L[2] + .6, .4), -78, -40);
    const ga = seg(lt, L[4], .5);
    force(g, bx, by, bx - 0.4 * 190 * .9, by + 190 * .9, C.gold, 'l_gp', ga, -120, 10);
    // 杯子与水面：水面垂直于等效重力，后（左）高前（右）低
    const cx = 880, cyb = 760, cw = 140, ch = 170, tilt = Math.atan(0.4) * seg(lt, L[5], 1.0), wl = cyb - 90;
    rrect(g, cx - cw / 2, cyb - ch, cw, ch, 10, 'rgba(230,240,255,.06)', 'rgba(230,240,255,.75)', 3, seg(lt, L[4], .4));
    g.save(); g.globalAlpha = seg(lt, L[4], .4); g.beginPath(); g.rect(cx - cw / 2 + 3, cyb - ch, cw - 6, ch - 3); g.clip();
    const dy = Math.tan(tilt) * cw / 2; g.fillStyle = 'rgba(94,200,255,.45)'; g.beginPath();
    g.moveTo(cx - cw / 2, wl - dy); g.lineTo(cx + cw / 2, wl + dy); g.lineTo(cx + cw / 2, cyb); g.lineTo(cx - cw / 2, cyb); g.closePath(); g.fill(); g.restore();
    tex(g, 'pd_tan', 1450, 330, { size: 1.0, al: 'center', rev: lin(lt, L[3], .9) });
    tex(g, 'pd_T', 1450, 460, { size: .95, al: 'center', rev: lin(lt, L[3] + 1.0, .9) });
    tex(g, 'geff', 1450, 590, { size: .95, al: 'center', rev: lin(lt, L[4], .9) });
    txt(g, '水面 ⟂ 等效重力', 1450, 720, { size: 40, w: 700, col: C.blue, al: 'center', a: seg(lt, L[5], .5) });
    txt(g, '图中取 α = 0.4g，θ ≈ 21.8°', 1450, 820, { size: 30, col: C.mute, al: 'center', a: seg(lt, L[3], .5) });
  } });

// ---------- 8 回到公交 ----------
S.push({ sec: '回到急刹车', secEn: 'BACK TO THE BUS',
  lines: ['回到开头的急刹车。', '刹车时，车的加速度向后，', ['惯性力就向前：你被“推”向前，扶手的拉力把你拉住。', .6], '惯性力找不到施力物体，', ['但在加速的车里把它算进去，牛顿定律就又能用了。', .8]],
  draw(g, lt, s) {
    const L = s.L; road(g, 800, 0); bus(g, 380, 330, 1160, 380);
    person(g, 1000, 700, 1.15, RIDER, 1, { lean: .26, arm: 'hold', mood: 'wow', label: false });
    line(g, 1060, 360, 1060, 420, '#C9D3E3', 4);
    accel(g, 900, 260, -240, 0, seg(lt, L[1], .4));
    force(g, 1000, 520, 1210, 520, RED, 'l_ma', seg(lt, L[2], .4), 18, -4);
    force(g, 1080, 440, 1040, 360, C.blue, null, seg(lt, L[2] + .8, .4));
    txt(g, '扶手的拉力', 1080, 300, { size: 30, w: 700, col: C.blue, al: 'center', a: seg(lt, L[2] + .8, .4) });
    pill(g, '没有施力物体 ≠ 不能用', W / 2, 900, C.gold, { al: 'center', a: seg(lt, L[4], .5), size: 38 });
  } });

// ---------- 9 总结 ----------
S.push({ sec: '总结', secEn: 'SUMMARY',
  lines: ['总结一下。', '在加速度为 α 的车、电梯里，给每个物体加一个惯性力 −mα，', ['就可以照常用牛顿定律。', .4], ['值得直接记住：惯性力 −mα；竖直加速时，等效重力加速度 g + α。', .8], ['关注 X物理，下期见。', 1.6]], tail: 1.6,
  cues: [[s => s.L[3] + .2, 'ding']],
  draw(g, lt, s) {
    const L = s.L;
    txt(g, '加速的参考系 + 惯性力 = 牛顿定律照常用', W / 2, 260, { size: 52, w: 900, serif: true, al: 'center', a: seg(lt, L[1], .6) });
    memo(g, 420, 400, 1080, 260, seg(lt, L[3], .5), '值得直接记住');
    tex(g, 'mem1', W / 2, 480, { size: 1.0, al: 'center', a: seg(lt, L[3], .5) });
    tex(g, 'mem2', W / 2, 590, { size: .9, al: 'center', a: seg(lt, L[3] + .3, .5) });
    txt(g, 'X物理  ·  关注，下期见', W / 2, 820, { size: 44, w: 700, col: C.gold, al: 'center', a: seg(lt, L[4], .5) });
  } });

window.OVERLAY = (g, T) => {
  g.save(); g.fillStyle = 'rgba(169,188,211,.12)'; g.fillRect(0, 0, W, 6); g.fillStyle = 'rgba(255,200,87,.85)'; g.fillRect(0, 0, W * T / TOTAL, 6);
  SCENES.forEach(c => { if (c.t0 > 0) { g.fillStyle = 'rgba(10,17,32,.9)'; g.fillRect(W * c.t0 / TOTAL - 1, 0, 2, 6); } }); g.restore();
  txt(g, 'X物理', W - 60, 62, { size: 30, w: 700, col: 'rgba(238,243,250,.42)', al: 'right' });
};
setup(S);
