# -*- coding: utf-8 -*-
# Scene script for the Faraday biography. Timing is computed from the subtitle volume.
import math, random

TITLE = '法拉第：把磁变成电的人'
SPEED = 6.8
LEAD = {'hero': 1.6, 'c': 0.8, 'recap': 0.4, 'src': 0.4}
TAIL = {'hero': 0.4, 'c': 0.55, 'recap': 0.5, 'src': 0.5}
CHAP_DUR = 2.6
GAP = 0.08

def n_chars(t):
    n = 0.0
    for ch in t:
        n += 0.35 if ch in '，。、：；？！“”‘’… ' else 1.0
    return n

SC = [
 dict(key='hero', k='hero', name='开场', draw='d0', lines=[
    ('1831 年夏天，伦敦。', 0), ('一个只上过几年学的人，', 0), ('把一块磁铁，推进一圈铜线。', 0),
    ('电流表的指针，轻轻跳了一下。', 0), ('今天照亮世界的电，', 0), ('就从这一下开始。', 0)]),
 dict(key='ch1', k='chap', name='章节 · 装订学徒', word='装订学徒', line='他的故事，从一家书店开始。'),
 dict(key='s1', k='c', name='第一幕 · 铁匠的儿子', draw='d1', lines=[
    ('1791 年，迈克尔·法拉第出生在伦敦。', 0), ('父亲是个铁匠，', 0), ('家里很穷。', 0),
    ('他只上过几年小学，', 0), ('读、写、算，学了个大概。', 0)]),
 dict(key='s2', k='c', name='第二幕 · 书店学徒', draw='d2', lines=[
    ('14 岁，他到一家书店当学徒，', 0), ('学装订书。', 0), ('一本本书从他手里经过，', 0),
    ('他白天装订，晚上读。', 0), ('一本写给普通人的化学书，', 0), ('让他着了迷。', 0)]),
 dict(key='s3', k='c', name='第三幕 · 自己动手', draw='d3', lines=[
    ('书里写的东西，他都想亲手试一试。', 0), ('他用省下的零钱买材料，', 0),
    ('照着书，做了一个简单的电池。', 0), ('金属片一接通，', 0), ('电，就在他手里流动起来。', 0)]),
 dict(key='ch2', k='chap', name='章节 · 一张门票', word='一张门票', line='机会，来自一张讲座的门票。'),
 dict(key='s4', k='c', name='第四幕 · 戴维的讲座', draw='d4', lines=[
    ('1812 年，一位顾客送给他几张门票，', 0), ('去皇家研究所，听化学家戴维的讲座。', 0),
    ('他坐在高处，一字一句地记，', 0), ('回去再整理、画图，', 0), ('装订成一本三百多页的书。', 0)]),
 dict(key='s5', k='c', name='第五幕 · 走进实验室', draw='d5', lines=[
    ('他把这本笔记，寄给了戴维。', 0), ('1813 年，戴维在一次爆炸里伤了眼睛，', 0),
    ('实验室正缺一个助手。', 0), ('法拉第得到了这份工作，', 0), ('终于走进了实验室。', 0)]),
 dict(key='s6', k='c', name='第六幕 · 欧洲之行', draw='d6', lines=[
    ('同一年，他跟着戴维游历欧洲，', 0), ('走了一年半。', 0), ('名义上是助手，', 0),
    ('路上却常被当成仆人。', 0), ('可他见到了欧洲最好的科学家，', 0), ('这一趟，就是他的大学。', 0)]),
 dict(key='ch3', k='chap', name='章节 · 电生转动', word='电生转动', line='1820 年，一个消息传遍欧洲。'),
 dict(key='s7', k='c', name='第七幕 · 奥斯特的发现', draw='d7', lines=[
    ('丹麦的奥斯特发现：', 0), ('导线一通电，', 0), ('旁边的指南针，就转了个方向。', 0),
    ('电，能产生磁。', 0), ('电流周围，', 0), ('绕着一圈圈看不见的磁场。', 0)]),
 dict(key='s8', k='c', name='第八幕 · 绕着磁铁转', draw='d8', lines=[
    ('1821 年，法拉第想：', 0), ('既然磁场是一圈圈绕着电流的，', 0), ('能不能让导线绕着磁铁，一直转？', 0),
    ('他把磁铁立在一杯水银里，', 0), ('垂下一根导线，一通电——', 0), ('导线绕着磁铁，转了起来。', 0),
    ('电，第一次变成了持续的转动。', 0)]),
 dict(key='s9', k='c', name='第九幕 · 裂痕', draw='d9', lines=[
    ('他兴冲冲地发表了结果，', 0), ('却没提到戴维他们也想过类似的事。', 0), ('有人说他抄袭。', 0),
    ('几年后，他被提名进入皇家学会，', 0), ('据记载，戴维要他撤回提名，他没有。', 0), ('师徒之间，从此有了裂痕。', 0)]),
 dict(key='s10', k='c', name='第十幕 · 化学家', draw='d10', lines=[
    ('这些年，他还是一位出色的化学家：', 0), ('他把氯气压成了液体，', 0), ('还发现了一种新物质：苯。', 0),
    ('可他心里，一直惦记着一个问题。', 0)]),
 dict(key='ch5', k='chap', name='章节 · 磁生电', word='磁生电', line='电能生磁，那磁能不能生电？'),
 dict(key='s11', k='c', name='第十一幕 · 一试就是几年', draw='d11', lines=[
    ('他在笔记里给自己定了个题目：', 0), ('把磁，变成电。', 0), ('一试，就是好几年。', 0),
    ('磁铁放在线圈旁边，', 0), ('电流表，纹丝不动。', 0)]),
 dict(key='s12', k='c', name='第十二幕 · 铁环', draw='d12', lines=[
    ('1831 年 8 月 29 日，', 0), ('他在一个铁环上，绕了两组线圈。', 0), ('一边接电池，一边接电流表。', 0),
    ('接通的一瞬间，指针一跳；', 0), ('断开的一瞬间，又反着跳了一下。', 0), ('可电流一直稳稳流着时，', 0), ('指针却不动。', 0)]),
 dict(key='s13', k='c', name='第十三幕 · 关键在变化', draw='d13', lines=[
    ('关键，不在磁有多强，', 0), ('而在磁正在变化。', 0), ('把磁铁插进线圈，指针一跳；', 0),
    ('拔出来，指针反着跳；', 0), ('磁铁不动，什么都没有。', 0), ('这就是电磁感应。', 0)]),
 dict(key='s14', k='c', name='第十四幕 · 感应定律', draw='d14', lines=[
    ('说得更准确些：', 0), ('穿过线圈的磁感线，数目一变，', 0), ('线圈里就产生电压。', 0),
    ('变得越快，电压越大。', 0), ('这就是法拉第电磁感应定律。', 0)]),
 dict(key='s15', k='c', name='第十五幕 · 铜盘', draw='d15', lines=[
    ('同一年秋天，他做了个更妙的东西：', 0), ('让一块铜盘，在磁铁两极之间转起来。', 0),
    ('铜盘的边缘和中心之间，', 0), ('出现了持续的电流。', 0), ('只要一直转，电就一直有。', 0), ('这是第一台发电机。', 0)]),
 dict(key='s16', k='c', name='第十六幕 · 今天的电站', draw='d16', lines=[
    ('今天的发电站，', 0), ('不管烧煤、用水还是核能，', 0), ('大多在做同一件事：', 0),
    ('让磁铁和线圈相对转动。', 0), ('我们用的大部分电，', 0), ('都来自他发现的这条规律。', 0)]),
 dict(key='ch6', k='chap', name='章节 · 场', word='场', line='他看电和磁的方式，与众不同。'),
 dict(key='s17', k='c', name='第十七幕 · 铁屑', draw='d17', lines=[
    ('把铁屑撒在磁铁周围的纸上，', 0), ('轻轻一敲，', 0), ('铁屑排成了一条条曲线。', 0),
    ('别人看到的是图案，', 0), ('他看到的是：', 0), ('磁铁周围的空间里，布满了“力线”。', 0)]),
 dict(key='s18', k='c', name='第十八幕 · 场', draw='d18', lines=[
    ('当时的主流看法是：', 0), ('力是隔着空间，直接起作用的。', 0), ('法拉第不这么想。', 0),
    ('他认为，空间本身被电和磁“填满”了，', 0), ('力是沿着这些线，一点点传过去的。', 0), ('这就是“场”。', 0)]),
 dict(key='s19', k='c', name='第十九幕 · 磁与光', draw='d19', lines=[
    ('1845 年，他又发现：', 0), ('一束光穿过玻璃时，', 0), ('加上磁场，', 0),
    ('光的振动方向就会转一个角度。', 0), ('他隐约觉得，光和磁之间有联系。', 0)]),
 dict(key='s20', k='c', name='第二十幕 · 没有方程', draw='d20', lines=[
    ('可他不会高深的数学，', 0), ('论文里几乎没有方程，', 0), ('只有实验和图。', 0),
    ('不少人，看不上他的“力线”。', 0)]),
 dict(key='s21', k='c', name='第二十一幕 · 麦克斯韦', draw='d21', lines=[
    ('三十多年后，', 0), ('年轻的麦克斯韦，把他的力线写成了方程。', 0), ('方程算出：', 0),
    ('电和磁的波动，传播速度正好等于光速。', 0), ('光，原来就是电磁波。', 0),
    ('麦克斯韦说：法拉第是一位', 0), ('非常高明的数学家。', 0)]),
 dict(key='ch7', k='chap', name='章节 · 为人', word='为人', line='他不只是一个实验家。'),
 dict(key='s22', k='c', name='第二十二幕 · 一根蜡烛', draw='d22', lines=[
    ('他办起了专门讲给孩子的圣诞讲座，', 0), ('自己讲了十九次。', 0), ('最有名的一次，讲的就是一根蜡烛：', 0),
    ('它为什么会燃烧，', 0), ('火焰里藏着多少学问。', 0), ('这个讲座，今天还在办。', 0)]),
 dict(key='s23', k='c', name='第二十三幕 · 平凡的法拉第先生', draw='d23', lines=[
    ('他两次拒绝担任皇家学会会长，', 0), ('也不要爵位，', 0), ('只想做“平凡的法拉第先生”。', 0),
    ('克里米亚战争时，', 0), ('有人请他研究化学武器，', 0), ('他拒绝了。', 0)]),
 dict(key='s24', k='c', name='第二十四幕 · 告别', draw='d24', lines=[
    ('1867 年 8 月，他在家中去世，', 0), ('终年 75 岁。', 0), ('他没有葬进威斯敏斯特教堂，', 0),
    ('而是安葬在海格特公墓，', 0), ('一块朴素的墓碑下。', 0)]),
 dict(key='s25', k='c', name='第二十五幕 · 墙上的三个人', draw='d25', lines=[
    ('今天，电容的单位，就叫“法拉”。', 0), ('爱因斯坦书房的墙上，挂着三个人的像：', 0),
    ('牛顿、麦克斯韦，', 0), ('还有法拉第。', 0), ('一个书店里的装订学徒，', 0), ('教会了人类，把磁变成电。', 0)]),
 dict(key='recap', k='recap', name='回头看', lines=[
    ('书店学徒，自学成才；', 0), ('电生转动，磁生电；', 0),
    ('他画下的力线，成了“场”；', 0), ('今天的电，几乎都有他的影子。', 0)], dur_min=9.5),
 dict(key='src', k='src', name='资料来源', lines=[('内容整理自公开的史料和资料。', 0)], dur_min=8.0),
]

CUE_SPEC = [
 ('hero', ('L', 3, 0.3), 'tick', 1.0),
 ('s3', ('L', 3, 0.4), 'spark', 1760),
 ('s5', ('L', 1, 0.2), 'hit', None),
 ('s7', ('L', 2, 0.2), 'tick', 0.8),
 ('s8', ('L', 5, 0.3), 'whoosh', None),
 ('s12', ('L', 3, 0.4), 'tick', 1.0), ('s12', ('L', 4, 0.4), 'tick', 0.7),
 ('s13', ('L', 2, 0.5), 'tick', 1.0), ('s13', ('L', 3, 0.5), 'tick', 0.7),
 ('s15', ('L', 5, 0.2), 'soft', None),
 ('s25', ('L', 4, 1.2), 'tick', 1.0),
]
BED_SPEC = []
MUSIC_SPEC = []
MUSIC_FILE = 'fd_bed.mp3'      # pre-mixed bed: The Awakening (Ivan Torrent) + The New York Nightfall (Position Music), on a 90 BPM grid
BEAT0 = 0.0
BEAT = 0.6666718
BAR = BEAT * 4
TRANSPOSE = 0
MUS = dict(beat0=BEAT0, bar=BAR, tr=TRANSPOSE)
BAR_KEYS = ('s1', 'ch3', 'ch5', 'ch6', 'recap')
def qc(x, u): return math.ceil(x / u - 1e-9) * u

def timeline():
    raw = []
    lines = []
    t = 0.0
    for i, sc in enumerate(SC):
        ls = []
        if sc['k'] == 'chap':
            dur = CHAP_DUR
            ls = [0.45]
            L = [(0.45, 2.5, sc['line'])]
        else:
            kind = 'hero' if sc['k'] == 'hero' else ('c' if sc['k'] == 'c' else sc['k'])
            cur = LEAD[kind]; L = []
            for text, hold in sc['lines']:
                d = max(2.0, 0.55 + n_chars(text) / SPEED, hold)
                d = max(BEAT * 3, math.ceil((d - 0.2) / BEAT - 1e-9) * BEAT)   # every subtitle change lands on a beat
                cur = qc(cur, BEAT)
                ls.append(cur); L.append((cur, cur + d - GAP, text))
                cur += d
            dur = cur + TAIL[kind]
            if 'dur_min' in sc:
                dur = max(dur, sc['dur_min'])
        raw.append((dur, ls, L))
    out = []
    for i, sc in enumerate(SC):
        dur, ls, L = raw[i]
        e = qc(t + dur, BEAT)                                   # every scene change lands on a beat
        if i + 1 < len(SC) and SC[i + 1]['key'] in BAR_KEYS:    # key changes land on a bar line
            e = qc(e, BAR)
        dur = e - t
        for a, b, tx in L: lines.append((i, a, b, tx))
        out.append(dict(s=round(t, 3), e=round(e, 3), ls=[round(x, 3) for x in ls], dur=round(dur, 3)))
        t = e
    return out, lines, t

TL, LINES, DUR = timeline()
IDX = {sc['key']: i for i, sc in enumerate(SC)}

def at(key, anchor):
    """anchor: ('L', i, off) | ('T', off) | ('E', off)"""
    i = IDX[key]; tl = TL[i]
    if anchor[0] == 'L': return tl['s'] + tl['ls'][anchor[1]] + anchor[2]
    if anchor[0] == 'T': return tl['s'] + anchor[1]
    return tl['e'] + anchor[1]


def chords():
    return []
def chords_old():
    segs = []
    for key, ci in MUSIC_SPEC:
        i = IDX[key]; s, e = TL[i]['s'], TL[i]['e']
        segs.append([s, e, ci])
    # merge neighbours with the same chord
    m = [segs[0]]
    for s in segs[1:]:
        if s[2] == m[-1][2]: m[-1][1] = s[1]
        else: m.append(s)
    # split anything longer than 20 s into two voicings
    out = []
    for s, e, ci in m:
        if e - s > 20:
            mid = (s + e) / 2
            out.append([s, mid, ci]); out.append([mid, e, (ci + 3) % 6])
        else: out.append([s, e, ci])
    return [[round(a, 2), round(b, 2), c] for a, b, c in out]

# ---- music plan: Entropy re-cut by whole bars: [video bar, track bar, number of bars] ----
# track map (bars of 1.6 s): 0-15 quiet intro (builds from bar 12) | 16-31 groove A | 32-33 silence | 34-65 groove B |
#                            66-69 breakdown | 70-85 mid | 86-101 climax (starts with a drop) | 102-111 outro
# story arc:  hero+ch1 intro build -> s1..ch3 groove (A then B) -> ch3..ch5 breakdown, mid, groove returns ->
#             ch5..s10 quiet reflective bed, building into the drop -> s10..recap climax -> recap/src outro
def music_plan():
    return [[0, 0, int(DUR / BAR) + 3]]
def music_plan_old():
    nb = lambda key: int(round(TL[IDX[key]]['s'] / BAR))
    s1, c3, c5, s10, rc = nb('s1'), nb('ch3'), nb('ch5'), nb('ch6'), nb('recap')
    total = int(math.ceil(DUR / BAR)) + 1
    seq = list(range(16 - s1, 16))                         # intro build ends on the bar before the groove
    n1 = c3 - s1; seq += list(range(16, 16 + min(16, n1)))
    seq += [34 + j % 32 for j in range(max(0, n1 - 16))]   # groove B
    n2 = c5 - c3; seq += [66, 67, 68, 69] + list(range(70, 86))
    seq += [34 + j % 32 for j in range(max(0, n2 - 20))]   # the groove comes back
    n3 = s10 - c5
    if n3 >= 18:   # quiet bed: breakdown tail (2 bars) -> intro bars ending on its quietest bar 12 -> intro 0-15 (ends on the build into the drop)
        k = n3 - 18
        seq += [67, 68] + [(13 - k + j) % 13 for j in range(k)] + list(range(16))
    else: seq += list(range(16 - n3, 16))
    n4 = rc - s10; cl = list(range(86, 102))
    if n4 >= 16:   # extra bars: the climax loops a 4-bar phrase (bars 90-93), so the drop at 86 and the last bar 101 stay in place
        e = n4 - 16; q, r = e // 4, e % 4
        seq += cl[:8] + cl[4:8] * q + (cl[8 - r:8] if r else []) + cl[8:]
    else: seq += cl[16 - n4:]
    seq += list(range(102, 112))[:max(0, total - rc)]
    segs = []
    for vb, tb in enumerate(seq):
        if segs and segs[-1][1] + segs[-1][2] == tb and segs[-1][0] + segs[-1][2] == vb: segs[-1][2] += 1
        else: segs.append([vb, tb, 1])
    return segs

# ---- bells at subtitle line starts (D major pentatonic) ----
PENT = [587.33, 659.25, 739.99, 880.0, 987.77, 1174.66, 1318.51, 1479.98]   # D5 E5 F#5 A5 B5 D6 E6 F#6
def bells():
    return []
def bells_old():
    rnd = random.Random(7)
    out = []
    pos = 3
    seen = {}
    for (si, a, b, text) in LINES:
        sc = SC[si]
        if sc['k'] in ('chap', 'src'): continue
        step = rnd.choice([-2, -1, 1, 1, 2])
        pos = max(0, min(len(PENT) - 1, pos + step))
        if seen.get(si, 0) % 2: seen[si] += 1; continue          # only every other line gets a chime
        seen[si] = seen.get(si, 0) + 1
        s = TL[si]['s']
        tt = s + a + 0.04
        tt = round(tt / (BEAT / 2)) * (BEAT / 2)                  # chime sits on an eighth note of the music
        vel = 0.10 if sc['k'] != 'recap' else 0.08
        out.append([round(tt, 3), 'bell', [PENT[pos], vel]])
    return out

def build_cues():
    cues = []
    for key, anchor, name, arg in CUE_SPEC:
        cues.append([round(at(key, anchor), 3), name, arg])
    for i, sc in enumerate(SC):
        if sc['k'] == 'chap':
            s = TL[i]['s']
            cues.append([round(s - 1.2, 3), 'riser', None]); cues.append([round(s, 3), 'boom', None])
        elif i > 0 and SC[i - 1]['k'] != 'chap':
            cues.append([round(TL[i]['s'] - 0.45, 3), 'whoosh', None])     # soft sweep that peaks on the scene change
    cues += bells()
    cues.sort(key=lambda c: c[0])
    return cues

def build_beds():
    beds = []
    for k, a, aa, b, ab, pts, fi, fo in BED_SPEC:
        t0 = at(a, aa); t1 = at(b, ab)
        beds.append(dict(k=k, t0=round(t0, 3), t1=round(t1, 3), pts=[[round(at(s, an), 3), l] for s, an, l in pts], fi=fi, fo=fo))
    return beds

if __name__ == '__main__':
    for i, sc in enumerate(SC):
        t = TL[i]
        print(i, sc['key'], round(t['s'], 1), round(t['e'], 1), round(t['dur'], 1), t['ls'])
    print('DUR', round(DUR, 1), 'lines', len(LINES))
    for si, a, b, tx in LINES:
        if len(tx) > 25: print('LONG', len(tx), tx)
