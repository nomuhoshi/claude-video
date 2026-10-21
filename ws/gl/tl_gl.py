# -*- coding: utf-8 -*-
# Galileo, v2: timing from script_gl.py (beat-locked), plus the v2 layer: top-left stacked narration with coloured keywords,
# chapter cards, counters, slams, shakes, an era timeline and the impact sounds.  Output: tl.json
import sys, re, json, math
import script_gl as F
exec(open('sources_gl.py', encoding='utf-8').read())          # gives SRC

TLs, SC, IDX = F.TL, F.SC, F.IDX
DUR = round(F.DUR, 3)
def S(key): return TLs[IDX[key]]['s']
def E(key): return TLs[IDX[key]]['e']
def at(key, li, off=0.0): return round(TLs[IDX[key]]['s'] + TLs[IDX[key]]['ls'][li] + off, 3)

# ---------------- keywords: (text, colour) — first matches win, at most two per line ----------------
KW = [('1633 年 6 月 22 日', 'b'), ('跪在审判官面前', 'r'), ('认罪书', 'r'), ('“地球在动”', 'g'), ('亲眼看见', 'g'), ('伽利略', 'g'),
      ('比萨', 'b'), ('琴师', 'g'), ('四倍的重量', 'r'), ('八度', 'b'), ('十七岁', 'b'), ('医学', 'b'), ('数学', 'g'),
      ('据说', 'r'), ('吊灯', 'g'), ('脉搏', 'b'), ('差不多一样', 'g'), ('他自己没写过', 'r'), ('认真研究', 'g'),
      ('亚里士多德', 'g'), ('落得比轻的快', 'b'), ('两千年', 'r'), ('只用想', 'g'), ('绑在一起', 'b'), ('更慢', 'b'), ('更快', 'r'), ('两个结果', 'g'), ('站不住', 'r'),
      ('后人加的', 'r'), ('斜板', 'b'), ('水钟', 'g'), ('1602 年', 'b'), ('时间的平方', 'g'), ('1、3、5、7', 'g'),
      ('荷兰', 'g'), ('窥镜', 'b'), ('自己动手磨镜片', 'g'), ('二十倍', 'r'), ('夜空', 'g'), ('1609 年底', 'b'), ('1609 年', 'b'),
      ('月亮', 'g'), ('完美', 'b'), ('光滑的球', 'b'), ('一座座山', 'g'), ('一个个坑', 'g'), ('山影', 'b'), ('好几公里', 'r'), ('同一种东西', 'g'),
      ('银河', 'g'), ('小星星', 'b'), ('十倍', 'r'),
      ('1610 年 1 月 7 日', 'b'), ('木星', 'g'), ('三个小亮点', 'b'), ('恒星', 'b'), ('位置在变', 'r'), ('第四个', 'r'), ('卫星', 'g'), ('都绕着地球转', 'r'),
      ('1610 年 3 月', 'b'), ('《星际信使》', 'g'), ('美第奇星', 'g'), ('幻象', 'r'), ('开普勒', 'g'), ('公开信', 'b'), ('宫廷数学家', 'g'),
      ('金星', 'g'), ('会盈会亏', 'b'), ('月牙', 'b'), ('近乎满圆', 'g'), ('过不了', 'r'), ('1610 年底', 'b'),
      ('哥白尼', 'g'), ('1616 年 2 月', 'b'), ('形式上是异端', 'r'), ('贝拉明', 'g'), ('不许持有、传授、捍卫', 'r'), ('修改后才能读', 'r'),
      ('老朋友', 'b'), ('教皇', 'g'), ('1632 年', 'b'), ('《关于两大世界体系的对话》', 'g'), ('头脑简单的人', 'r'), ('影射你', 'r'), ('叫停发行', 'r'),
      ('潮汐', 'b'), ('其实是错的', 'r'), ('正圆', 'b'), ('椭圆', 'g'), ('始终没采用', 'r'),
      ('1633 年初', 'b'), ('罗马', 'g'), ('十七年前', 'b'), ('6 月 22 日', 'r'), ('无限期监禁', 'r'), ('跪着', 'r'),
      ('“可它还是在动。”', 'g'), ('1757 年', 'r'), ('一百多年', 'b'), ('没有', 'r'),
      ('软禁', 'r'), ('佛罗伦萨郊外的别墅', 'b'), ('不许出门，不许会客', 'r'), ('修道院', 'g'), ('玛丽亚 · 切莱斯特', 'g'), ('1634 年', 'b'), ('信', 'b'),
      ('1638 年初', 'b'), ('什么都看不见', 'r'), ('第一个把望远镜指向天空', 'g'), ('再也看不到天空', 'r'),
      ('没发出去的书稿', 'g'), ('1638 年', 'b'), ('《两门新科学》', 'g'), ('抛物线', 'g'),
      ('1642 年 1 月 8 日', 'b'), ('七十七岁', 'b'), ('圣十字教堂', 'g'), ('1737 年', 'b'), ('1992 年', 'g'), ('有错', 'r'),
      ('圣诞节', 'g'), ('早产', 'b'), ('艾萨克 · 牛顿', 'g'), ('惯性', 'g'), ('第一定律', 'g'), ('永远落不了地的大炮', 'g'),
      ('1971 年', 'b'), ('阿波罗 15 号', 'g'), ('同时松手', 'r'), ('没有空气', 'g'), ('一起落在了月面上', 'g'), ('山和坑', 'b'),
      ('“凭什么”', 'g'), ('望远镜', 'b'), ('认罪书', 'r'), ('失明', 'r')]
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
EN = {'少年': 'THE BOY', '落体': 'FALLING BODIES', '望远镜': 'THE TELESCOPE', '审判': 'THE TRIAL', '软禁': 'HOUSE ARREST', '接力': 'THE RELAY'}
NUM = '一二三四五六'
chaps, crumbs = [], []
ci = 0
for i, sc in enumerate(SC):
    if sc['k'] == 'chap':
        chaps.append(dict(s=TLs[i]['s'], e=TLs[i]['e'], word=sc['word'], en=EN[sc['word']], line=sc['line'], n='第%s章' % NUM[ci]))
        crumbs.append(dict(t=TLs[i]['s'], zh='第%s章 · %s' % (NUM[ci], sc['word']), en='CH.%d  %s' % (ci + 1, EN[sc['word']])))
        ci += 1
# the name must not show before the narration says it (hero line 5)
crumbs.insert(0, dict(t=at('hero', 5, 0.8), zh='人物传记 · 伽利略', en='BIOGRAPHY  GALILEO GALILEI 1564–1642'))
crumbs.append(dict(t=S('recap'), zh='回顾', en='RECAP'))

# ---------------- counters / slams / shakes / sounds ----------------
counters, slams, SHAKE, SFX = [], [], [], []
def put(n, t, g=1.0, p=0.0): SFX.append((n, round(t, 3), g, p))
def hit(t, g=0.9, shake=10, big=False):
    put('hit_drum' if big else 'hit_drum2', t, g); put('slam', t, g * (0.8 if big else 0.45))
    if shake: SHAKE.append((round(t, 3), shake))
def counter(label, a, b, unit, t0, t1, hide, col=None, land=None, pw=1.8, ticks=True, tick_g=0.3, endtxt=None):
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

exec(open('cues_gl.py', encoding='utf-8').read())               # the sound/impact design (needs the helpers above)

# ---------------- era timeline ----------------
YRS = [('s1', 1564, 1581), ('s2', 1581, 1585), ('s3', 1589, 1592), ('s4', 1602, 1604), ('s5', 1609, 1609), ('s6', 1609, 1609), ('s7', 1610, 1610),
       ('s8', 1610, 1610), ('s9', 1610, 1610), ('s10', 1610, 1610), ('s11', 1616, 1616), ('s12', 1632, 1632), ('s13', 1632, 1632), ('s14', 1633, 1633),
       ('s15', 1633, 1633), ('s16', 1633, 1634), ('s17', 1637, 1638), ('s18', 1638, 1638), ('s19', 1642, 1642)]
years = [[round(S('s1') + 0.6, 3), 1564]]
for key, y0, y1 in YRS: years.append([round(S(key) + 0.6, 3), y0]); years.append([round(E(key) - 0.6, 3), y1])
yvis = [[S('s1') - 0.3, S('s20') - 0.3]]

scenes = []
for i, sc in enumerate(SC):
    scenes.append(dict(key=sc['key'], k=sc['k'], draw=sc.get('draw'), s=TLs[i]['s'], e=TLs[i]['e'], ls=TLs[i]['ls']))
data = dict(end=DUR, groups=groups, chaps=chaps, crumbs=crumbs, counters=counters, slams=slams, shake=sorted(SHAKE), sfx=sorted(SFX, key=lambda x: x[1]),
            years=years, yvis=yvis, ticks=[1564, 1609, 1633, 1642], yr0=1556, yr1=1650, scenes=scenes, idx=IDX,
            src=[[a, b] for a, b, *_ in SRC], title=F.TITLE)
json.dump(data, open('tl.json', 'w'), ensure_ascii=False)
print('dur', DUR, 'groups', len(groups), 'counters', len(counters), 'slams', len(slams), 'sfx', len(SFX), 'shakes', len(SHAKE))
