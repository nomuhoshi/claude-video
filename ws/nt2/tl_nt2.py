# -*- coding: utf-8 -*-
# Newton, remade in the v2 style. Timing, music bed and pictures come from ws/nt (the shipped 8:43 cut);
# this file adds the v2 layer: top-left stacked narration with coloured keywords, chapter cards, counters,
# slams, shakes, an era timeline and the new impact sounds.  Output: tl.json
import sys, re, json, math
sys.path.insert(0, '../nt')
import script_nt as F
exec(open('../nt/sections_nt.py', encoding='utf-8').read())     # gives SRC

TLs, SC, IDX = F.TL, F.SC, F.IDX
DUR = round(F.DUR, 3)
def S(key): return TLs[IDX[key]]['s']
def E(key): return TLs[IDX[key]]['e']
def at(key, li, off=0.0): return round(TLs[IDX[key]]['s'] + TLs[IDX[key]]['ls'][li] + off, 3)

# ---------------- keywords: (text, colour) — first matches win, at most two per line ----------------
KW = [('艾萨克 · 牛顿', 'g'), ('活下来', 'r'), ('84 岁', 'b'), ('整个宇宙运转的规则', 'g'),
      ('父亲三个月前已经去世', 'r'), ('母亲改嫁', 'r'), ('外祖母', 'b'), ('药剂师', 'b'), ('爱做东西', 'g'), ('看书', 'b'), ('读大学', 'g'),
      ('剑桥三一学院', 'g'), ('减费生', 'b'), ('干杂活抵学费', 'r'), ('两千年前', 'r'), ('笛卡尔、伽利略、开普勒', 'g'),
      ('占星书', 'b'), ('三角学', 'b'), ('《几何原本》', 'g'), ('太简单', 'r'), ('“这还用证明？”', 'r'), ('新几何', 'b'), ('巴罗', 'g'), ('答得很差', 'r'),
      ('一条一条重读', 'g'), ('没再跳', 'g'),
      ('大瘟疫', 'r'), ('剑桥就关了门', 'r'), ('将近两年', 'b'), ('一直在想问题的人', 'g'), ('“奇迹年”', 'g'),
      ('“这一瞬间”的速度', 'b'), ('平均速度', 'b'), ('越来越短', 'b'), ('几乎为零', 'b'), ('这一刻的速度', 'g'), ('“流数术”', 'g'), ('微积分', 'g'),
      ('苹果树', 'g'), ('老朋友', 'b'), ('垂直往下掉', 'b'), ('朝着地心', 'g'), ('后人加上去的', 'r'), ('一直伸到月亮', 'g'),
      ('最纯的光', 'b'), ('玻璃加上去的', 'r'), ('小孔', 'b'), ('彩带', 'g'), ('红光', 'r'), ('第二块三棱镜', 'b'), ('不会再变', 'g'), ('不是玻璃造的', 'r'), ('所有颜色', 'g'),
      ('彩边', 'r'), ('折的角度不一样', 'b'), ('凹面镜', 'g'), ('反射望远镜', 'g'), ('十几厘米', 'b'), ('很惊讶', 'g'), ('会员', 'g'),
      ('哈雷', 'g'), ('距离的平方', 'b'), ('椭圆', 'g'), ('“我算过。”', 'g'), ('找不到了', 'r'), ('重算一遍', 'b'),
      ('停不下来', 'g'), ('一年半', 'b'), ('《自然哲学的数学原理》', 'g'), ('哈雷帮忙出的', 'b'), ('三条运动定律', 'g'),
      ('第一条', 'g'), ('一直静止', 'b'), ('沿直线一直走下去', 'b'), ('拦着它', 'r'),
      ('第二条', 'g'), ('速度变得越快', 'b'), ('越难推动', 'b'), ('改变运动', 'g'),
      ('第三条', 'g'), ('同样大的力', 'b'), ('往前推', 'g'),
      ('最大胆的一步', 'r'), ('大炮', 'r'), ('落得更远', 'b'), ('地面往下弯', 'b'), ('永远落不了地', 'g'), ('一直在往地球掉', 'g'),
      ('掉得有多快', 'r'), ('60 倍', 'b'), ('3600 分之一', 'r'), ('4.9 米', 'b'), ('1.4 毫米', 'b'), ('正好对上', 'g'), ('同一种力', 'g'),
      ('任何两个东西之间', 'g'), ('质量越大越强', 'b'), ('距离越远越弱', 'b'), ('同一套规则', 'g'), ('彗星的路线', 'b'), ('潮水的涨落', 'b'),
      ('皇家铸币局的督办', 'g'), ('剪边、熔掉、仿造', 'r'), ('假币到处都是', 'r'), ('闲差', 'b'), ('安插线人', 'r'), ('亲自审问', 'r'), ('一百多次盘问', 'r'),
      ('威廉 · 查洛纳', 'r'), ('反咬', 'r'), ('腐败', 'r'), ('证人', 'b'), ('死刑', 'r'), ('“只有你能救我。”', 'r'), ('没有回信', 'r'),
      ('大争吵', 'r'), ('莱布尼茨', 'g'), ('先发表了微积分', 'b'), ('吵了十几年', 'r'), ('皇家学会', 'b'), ('牛顿自己写的', 'r'), ('各自独立发明', 'g'), ('来自莱布尼茨', 'b'),
      ('皇家学会会长', 'g'), ('爵士', 'g'), ('没有结婚', 'b'),
      ('睡梦中去世', 'b'), ('威斯敏斯特教堂', 'g'), ('也葬在这里', 'g'), ('安葬一位国王', 'g'),
      ('蒲柏', 'g'), ('藏在黑夜里', 'b'), ('让牛顿去吧！', 'g'), ('一切都亮了', 'g'),
      ('海边玩耍的孩子', 'g'), ('更光滑的石子', 'b'), ('更好看的贝壳', 'b'), ('真理的大海', 'g'), ('还没有被发现', 'b'),
      ('早产的乡下孩子', 'g'), ('回头重读', 'g'), ('拆开的阳光', 'g'), ('一直在掉的月亮', 'g'), ('同一套规则', 'g')]
YEAR = re.compile(r'\d{4} 年')

def mark(tx):
    spans = []
    for w, c in KW:
        i = tx.find(w)
        if i < 0 or any(not (i + len(w) <= a or i >= b) for a, b, _ in spans): continue
        spans.append((i, i + len(w), c))
        if len(spans) >= 2: break
    if len(spans) < 2:
        m = YEAR.search(tx)
        if m and not any(not (m.end() <= a or m.start() >= b) for a, b, _ in spans): spans.append((m.start(), m.end(), 'b'))
    out, last = '', 0
    for a, b, c in sorted(spans):
        out += tx[last:a] + '{%s:%s}' % (c, tx[a:b]); last = b
    return out + tx[last:]

# ---------------- text groups ----------------
groups = []
LINES_BY = {}
for si, a, b, tx in F.LINES: LINES_BY.setdefault(si, []).append((a, b, tx))
for i, sc in enumerate(SC):
    if sc['k'] in ('chap',): continue
    ls = LINES_BY.get(i, []); s0 = TLs[i]['s']; e0 = TLs[i]['e']
    n = len(ls); k = max(1, math.ceil(n / 4)); sizes = [n // k + (1 if j < n % k else 0) for j in range(k)]
    idx = 0; inq = False; chunks = []
    for sz in sizes: chunks.append(ls[idx:idx + sz]); idx += sz
    for ci, ch in enumerate(chunks):
        lines = []
        for a, b, tx in ch:
            st = 'q' if (tx.startswith('“') or inq) else 'n'
            if '“' in tx and '”' not in tx[tx.index('“'):]: inq = True
            if '”' in tx: inq = False
            lines.append(dict(t=round(s0 + a, 3), st=st, tx=mark(tx)))
        gs = lines[0]['t'] - 0.05
        ge = (round(s0 + chunks[ci + 1][0][0], 3) - 0.02) if ci + 1 < len(chunks) else e0
        groups.append(dict(s=round(gs, 3), e=round(ge, 3), lines=lines))

# ---------------- chapter cards ----------------
EN = {'乡下': 'THE VILLAGE', '瘟疫年': 'THE PLAGUE YEARS', '光': 'LIGHT', '原理': 'PRINCIPIA', '另一面': 'THE OTHER SIDE', '晚年': 'THE LAST YEARS'}
NUM = '一二三四五六'
chaps, crumbs = [], []
ci = 0
for i, sc in enumerate(SC):
    if sc['k'] == 'chap':
        chaps.append(dict(s=TLs[i]['s'], e=TLs[i]['e'], word=sc['word'], en=EN[sc['word']], line=sc['line'], n='第%s章' % NUM[ci]))
        crumbs.append(dict(t=TLs[i]['s'], zh='第%s章 · %s' % (NUM[ci], sc['word']), en='CH.%d  %s' % (ci + 1, EN[sc['word']])))
        ci += 1
crumbs.insert(0, dict(t=0.6, zh='人物传记 · 牛顿', en='BIOGRAPHY  ISAAC NEWTON 1642–1727'))
crumbs.append(dict(t=S('recap'), zh='回顾', en='RECAP'))

# ---------------- counters / slams / shakes / sounds ----------------
counters, slams, SHAKE, SFX = [], [], [], []
def put(n, t, g=1.0, p=0.0): SFX.append((n, round(t, 3), g, p))
def hit(t, g=0.9, shake=10, big=False):
    put('hit_drum' if big else 'hit_drum2', t, g); put('slam', t, g * (0.8 if big else 0.45))
    if shake: SHAKE.append((round(t, 3), shake))
def counter(label, a, b, unit, t0, t1, hide, col=None, land=None, pw=1.8, ticks=True, tick_g=0.3, fmt=None, endtxt=None):
    counters.append(dict(label=label, a=a, b=b, unit=unit, t0=round(t0, 3), t1=round(t1, 3), hide=round(hide, 3), col=col, land=land, pw=pw, endtxt=endtxt))
    if ticks:
        prev = None; n = int((t1 - t0) * 100)
        for f in range(n + 1):
            u = f / max(1, n); v = int(a + (b - a) * u ** pw)
            if v != prev:
                if prev is not None and (not SFX or SFX[-1][1] < t0 + f / 100 - 0.045): put('count_tick', t0 + f / 100, tick_g, 0.3)
                prev = v
        put('count_roll', t1 - 0.6, 0.3, 0.2)
def slam(text, t, x, y, size, col='#ef5b43', dur=None, en=None):
    slams.append(dict(tx=text, t=round(t, 3), x=x, y=y, size=size, col=col, e=round(dur, 3) if dur else None, en=en))

# chapter cards: a drum and a slam on every card
for c in chaps: hit(c['s'] + 0.35, 0.95, 14, True); put('riser', c['s'] - 1.4, 0.35); put('sub_drop', c['s'] + 0.35, 0.55)
# hero: lifetime counter, then the name
for k in range(8): put('count_tick', at('hero', 2, 0.1 + 0.2 * k), 0.28, 0.2)
hit(at('hero', 2, 1.6), 0.75, 8)
slam('牛顿', at('hero', 4, 0.15), 560, 690, 200, '#f2d39a', E('hero') - 0.1, 'ISAAC NEWTON · 1642–1727'); hit(at('hero', 4, 0.15), 1.0, 16, True); put('sub_drop', at('hero', 4, 0.15), 0.7)
# s4: Euclid tossed; failing Barrow's exam
hit(at('s4', 5, 1.15), 0.5, 5)
hit(at('s4', 8, 1.2), 0.9, 12, True); slam('考砸了', at('s4', 8, 1.2), 1500, 380, 120, '#ef5b43', at('s4', 9, -0.3))
# s5: almost two years away
put('sparkle_bed', at('s5', 5), 0.4); put('ui_ping_2', at('s5', 5, 0.2), 0.35)
# s6: the instant
put('sub_drop', at('s6', 5), 0.45); put('ui_ping_3', at('s6', 6, 0.3), 0.4)
# s7: the apple and the moon
put('whoosh_swing', at('s7', 2, 0.5), 0.35); hit(at('s7', 2, 1.05), 0.45, 4)
put('riser', at('s7', 7) - 1.0, 0.35); put('sub_drop', at('s7', 7, 0.3), 0.6)
# s8: the second prism
hit(at('s8', 7), 0.7, 8); put('sparkle_bed', at('s8', 9), 0.45); put('data_burst', at('s8', 9, 0.1), 0.25)
# s9: telescope, elected
put('ui_ping_1', at('s9', 3, 0.3), 0.4); hit(at('s9', 6, 0.2), 0.55, 5)
# s10: "I have calculated it"
hit(at('s10', 4, 0.3), 0.6, 6); hit(at('s10', 6), 0.95, 14, True)
# s11: the book
for k in range(10): put('count_tick', at('s11', 1, 0.15 + 0.28 * k * (1 - 0.04 * k)), 0.26, 0.3)
hit(at('s11', 2, 0.2), 1.0, 16, True); put('sub_drop', at('s11', 2, 0.2), 0.7)
for k, key in enumerate(['s12', 's13', 's14']): hit(at(key, 0), 0.9, 12, True)
# s15: the cannon — each faster shot lands further
hit(at('s15', 2, 0.2), 0.7, 8); hit(at('s15', 3, 0.1), 0.75, 9); hit(at('s15', 3, 0.9), 0.8, 10)
put('riser', at('s15', 5) - 0.6, 0.35); put('sub_drop', at('s15', 6), 0.8); SHAKE.append((at('s15', 6), 6))
hit(at('s15', 7, 0.2), 0.8, 10, True)
# s16: 60 times further, 3600 times weaker, then it fits
for k in range(7): put('count_tick', at('s16', 1, 0.05 + 1.6 * (1 - (1 - k / 6) ** 3)), 0.3, 0.2)
counter('引力只剩地面的', 1, 3600, '分之一', at('s16', 3, 0.3), at('s16', 3, 2.6), at('s16', 6, -0.1), col=None, land='#ef5b43', pw=2.2)
hit(at('s16', 3, 2.6), 0.85, 10, True)
for k in range(14): put('meteor_%d' % (1 + k % 6), at('s16', 6, 0.4 + 0.12 * k), 0.4, 0.25)
put('sub_drop', at('s16', 6, 1.6), 0.9); put('data_burst', at('s16', 6, 1.6), 0.4); SHAKE.append((at('s16', 6, 1.6), 10))
slam('对上了', at('s16', 6, 1.6), 1580, 230, 120, '#f0bd5c', at('s16', 7, 1.5))
hit(at('s16', 7), 0.6, 0)
# s17: one set of rules
put('riser', at('s17', 4) - 1.2, 0.4); hit(at('s17', 4), 1.0, 14, True); put('sub_drop', at('s17', 4), 0.8)
# s18: the Mint — a hundred interrogations, struck faster and faster
tt = at('s18', 6, 0.0); t_end = at('s18', 6, 2.2); gap = 0.42; i = 0
while tt < t_end - 0.05:
    put('hit_cane' if i % 2 == 0 else 'hit_cane2', tt - 0.24, 0.72 - 0.01 * i, 0.12 if i % 2 else -0.12); SHAKE.append((round(tt, 3), 3 + 0.15 * i))
    tt += gap; gap = max(0.12, gap * 0.8); i += 1
hit(t_end, 1.0, 14, True)
# s19: Chaloner sentenced; no reply
hit(at('s19', 4, 0.2), 1.0, 18, True); put('sub_drop', at('s19', 4, 0.2), 0.8)
slam('死刑', at('s19', 4, 0.2), 1500, 360, 150, '#ef5b43', at('s19', 5, 0.2))
put('downer', at('s19', 7), 0.5); hit(at('s19', 7, 0.6), 0.5, 4)
# s20: the report
hit(at('s20', 5, 1.4), 0.85, 12, True); put('ui_ping_3', at('s20', 6, 0.3), 0.4)
# s21: knighted
hit(at('s21', 2, 0.6), 0.55, 5)
# s23: and all was light
put('sparkle_bed', at('s23', 3), 0.5); put('sub_drop', at('s23', 3, 0.2), 0.45)
for k in range(10): put('meteor_%d' % (1 + (k * 5) % 6), at('s23', 3, 0.3 + 0.18 * k), 0.28, 0.2)
# recap: one ping per node
for k in range(4): put('ui_ping_%d' % (1 + k % 3), at('recap', k, 0.2), 0.4)
# a continuous sub bed under the quiet parts
for t in [S('s1'), S('s5'), S('s21'), S('s23')]: put('sub_pad', t, 0.35)

# ---------------- era timeline ----------------
YRS = [('hero', 1642, 1642), ('s1', 1642, 1642), ('s2', 1654, 1659), ('s3', 1661, 1661), ('s4', 1663, 1664), ('s5', 1665, 1666), ('s6', 1666, 1666),
       ('s7', 1666, 1666), ('s8', 1666, 1666), ('s9', 1668, 1672), ('s10', 1684, 1684), ('s11', 1685, 1687), ('s12', 1687, 1687), ('s13', 1687, 1687),
       ('s14', 1687, 1687), ('s15', 1687, 1687), ('s16', 1687, 1687), ('s17', 1687, 1687), ('s18', 1696, 1697), ('s19', 1698, 1699), ('s20', 1699, 1716),
       ('s21', 1703, 1705), ('s22', 1727, 1727), ('s23', 1727, 1727), ('s24', 1727, 1727)]
years = []
for key, y0, y1 in YRS: years.append([round(S(key) + 0.6, 3), y0]); years.append([round(E(key) - 0.6, 3), y1])
yvis = [[S('s1') - 0.3, S('recap') - 0.3]]

scenes = []
for i, sc in enumerate(SC):
    scenes.append(dict(key=sc['key'], k=sc['k'], draw=sc.get('draw'), s=TLs[i]['s'], e=TLs[i]['e'], ls=TLs[i]['ls']))
data = dict(end=DUR, groups=groups, chaps=chaps, crumbs=crumbs, counters=counters, slams=slams, shake=sorted(SHAKE), sfx=sorted(SFX, key=lambda x: x[1]),
            years=years, yvis=yvis, ticks=[1642, 1665, 1687, 1696, 1727], yr0=1636, yr1=1733, scenes=scenes, idx=IDX,
            src=[[a, b] for a, b, *_ in SRC], title=F.TITLE)
json.dump(data, open('tl.json', 'w'), ensure_ascii=False)
print('dur', DUR, 'groups', len(groups), 'counters', len(counters), 'slams', len(slams), 'sfx', len(SFX), 'shakes', len(SHAKE))
for g in groups[:6]: print(g['s'], g['e'], [l['tx'] for l in g['lines']])
