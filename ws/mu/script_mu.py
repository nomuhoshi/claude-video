# -*- coding: utf-8 -*-
# Scene script for the Micron video. Timing is computed from the subtitle volume.
import math, random

TITLE = 'AI 的“记忆”，是谁造的？'
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
    ('AI 能答题、画图、写代码，', 0), ('可它不是光靠算得快。', 0),
    ('它还得有个地方，随时存取海量数据。', 0), ('造这个“记忆”的，有一家公司，叫美光。', 0),
    ('它到底是一家什么公司？', 0)]),
 dict(key='ch1', k='chap', name='章节 · 美光是谁', word='美光是谁', en='WHO IS MICRON', sub='从小公司，到存储巨头',
      line='先认识一下美光。'),
 dict(key='s1', k='c', name='第一幕 · 起点', draw='d1', lines=[
    ('美光成立于 1978 年，', 0), ('地点在美国爱达荷州的博伊西。', 0),
    ('最早只是一家做芯片设计咨询的小公司，', 0), ('1981 年建起第一座晶圆厂，', 0),
    ('做出了第一批内存芯片。', 0), ('到今天，全球约有六万一千名员工。', 0)]),
 dict(key='s2', k='c', name='第二幕 · 卖什么', draw='d2', lines=[
    ('美光卖的，是存储芯片。', 0), ('主要有三类：DRAM、NAND 和 NOR。', 0),
    ('2026 财年，它的收入约 1330 亿美元。', 0), ('其中 DRAM 约占四分之三，', 0),
    ('NAND 约占四分之一。', 0)]),
 dict(key='ch2', k='chap', name='章节 · 两种记忆', word='两种记忆', en='TWO KINDS OF MEMORY', sub='书桌和书柜',
      line='存储芯片，分两种记忆。'),
 dict(key='s3', k='c', name='第三幕 · DRAM', draw='d3', lines=[
    ('DRAM，像一张书桌。', 0), ('正在用的东西，都摊在桌上，', 0), ('拿取很快。', 0),
    ('可是一断电，桌上就清空了。', 0), ('所以它又叫“内存”。', 0)]),
 dict(key='s4', k='c', name='第四幕 · NAND', draw='d4', lines=[
    ('NAND，像一个书柜。', 0), ('东西放进去，断电也不会丢。', 0), ('容量大，也更便宜，', 0),
    ('就是取起来，比书桌慢一些。', 0), ('手机的存储空间、电脑的固态硬盘，', 0), ('用的就是它。', 0)]),
 dict(key='s5', k='c', name='第五幕 · 配合', draw='d5', lines=[
    ('处理器干活时，', 0), ('先把数据，从书柜搬上书桌，', 0), ('在书桌上算，', 0),
    ('算完再放回书柜。', 0), ('桌子越大、越快，处理器就越不用等。', 0)]),
 dict(key='ch3', k='chap', name='章节 · AI 的胃口', word='AI 的胃口', en='WHY AI NEEDS IT', sub='处理器在等数据',
      line='AI 为什么特别需要内存？'),
 dict(key='s6', k='c', name='第六幕 · 干等', draw='d6', lines=[
    ('AI 模型的参数，动辄几千亿个，', 0), ('每算一步，都要从内存里取数据。', 0),
    ('处理器算得再快，', 0), ('数据送不过来，它也只能干等。', 0), ('内存的速度，成了 AI 的瓶颈。', 0)]),
 dict(key='s7', k='c', name='第七幕 · HBM 叠起来', draw='d7', lines=[
    ('于是有了 HBM，高带宽内存。', 0), ('做法是：把好几层 DRAM 芯片，叠起来。', 0),
    ('层与层之间，用穿过芯片的细小竖孔相连，', 0), ('这叫硅通孔。', 0), ('叠得越高，容量越大。', 0)]),
 dict(key='s8', k='c', name='第八幕 · 贴着处理器', draw='d8', lines=[
    ('HBM 不放在远处，', 0), ('而是紧贴着处理器，', 0), ('中间用一块硅中介层连起来。', 0),
    ('数据通道又多又宽：', 0), ('第一代每叠 1024 条，', 0), ('第四代翻了一倍，2048 条。', 0)]),
 dict(key='s9', k='c', name='第九幕 · 谁在造', draw='d9', lines=[
    ('目前主要的 HBM 供应商，有三家：', 0), ('SK 海力士、三星，和美光。', 0),
    ('2026 年，美光开始量产 HBM4，', 0), ('12 层叠起来，容量 36GB。', 0), ('三家，都在这条赛道上竞争。', 0)]),
 dict(key='ch4', k='chap', name='章节 · 四块业务', word='四块业务', en='FOUR BUSINESSES', sub='存储卖给谁',
      line='这些芯片，卖给谁？'),
 dict(key='s10', k='c', name='第十幕 · 四块业务', draw='d10', lines=[
    ('美光分成四块业务。', 0), ('云端内存，约 431 亿美元；', 0), ('核心数据中心，约 376 亿；', 0),
    ('手机和电脑，约 366 亿；', 0), ('汽车和嵌入式，约 159 亿。', 0), ('前两块合起来，约占六成。', 0)]),
 dict(key='s11', k='c', name='第十一幕 · 三巨头', draw='d11', lines=[
    ('全球做 DRAM 的，也主要是这三家。', 0), ('2026 年第二季度，按收入算：', 0),
    ('三星约 38%，SK 海力士约 25%，', 0), ('美光约 24%。', 0), ('三家加起来，约占 87%。', 0)]),
 dict(key='ch5', k='chap', name='章节 · 起起落落', word='起起落落', en='BOOM AND BUST', sub='存储是个周期行业',
      line='这个行业，起落很大。'),
 dict(key='s12', k='c', name='第十二幕 · 八年收入', draw='d12', lines=[
    ('先看美光近八个财年的收入。', 0), ('前几年，在两百多亿到三百多亿美元之间。', 0),
    ('2023 年跌到 155 亿，亏了约 58 亿。', 0), ('2025 年，回到 374 亿，', 0),
    ('2026 年，一下冲到 1332 亿美元。', 0)]),
 dict(key='s13', k='c', name='第十三幕 · 为什么起落', draw='d13', lines=[
    ('为什么起落这么大？', 0), ('建一座新工厂，要好几年。', 0), ('需求涨起来，产能一时跟不上，', 0),
    ('价格就飙升。', 0), ('工厂建好，产能一多，价格又掉下来。', 0), ('美光年报里也写：行业有周期，', 0),
    ('需求和供给，并不同步。', 0)]),
 dict(key='s14', k='c', name='第十四幕 · 现在', draw='d14', lines=[
    ('现在，是供不应求的一段。', 0), ('AI 数据中心抢着买内存。', 0), ('最近一个季度，收入 542 亿美元，', 0),
    ('是去年同期的约 4.8 倍。', 0), ('公司说，偏紧的局面，预计持续到 2028 年。', 0),
    ('但行业有周期，这一点没有变。', 0)]),
 dict(key='ch6', k='chap', name='章节 · 大扩产', word='大扩产', en='BUILDING FABS', sub='为下一轮备货',
      line='赚了钱，美光在做什么？'),
 dict(key='s15', k='c', name='第十五幕 · 美国', draw='d15', lines=[
    ('2026 财年，它的资本开支约 274 亿美元。', 0), ('计划在美国，总共投入约 2000 亿美元，', 0),
    ('包括制造和研发。', 0), ('爱达荷州建两座工厂，', 0), ('第一座，预计 2027 年中出第一批晶圆。', 0),
    ('纽约州，最多规划四座。', 0)]),
 dict(key='s16', k='c', name='第十六幕 · 全球', draw='d16', lines=[
    ('工厂不只在美国。', 0), ('新加坡，宣布投资 240 亿美元。', 0), ('台湾、日本、马来西亚、印度，', 0),
    ('也有生产基地。', 0), ('HBM 的封装产能，也在往外扩。', 0)]),
 dict(key='s17', k='c', name='第十七幕 · 取舍', draw='d17', lines=[
    ('产能有限，就要取舍。', 0), ('美光有个面向普通消费者的品牌，叫 Crucial。', 0),
    ('2025 年 12 月，宣布退出，', 0), ('2026 年 2 月，不再向消费者发货。', 0),
    ('理由：把供应，倾向增长更快的大客户。', 0), ('已售产品的保修和支持，继续提供。', 0)]),
 dict(key='recap', k='recap', name='回头看', lines=[
    ('美光，是一家做存储芯片的公司。', 0), ('DRAM 是书桌，NAND 是书柜。', 0),
    ('AI 时代，HBM 把书桌叠高、挪近。', 0), ('收入起落，跟着行业周期走。', 0)], dur_min=9.5),
 dict(key='src', k='src', name='资料来源', lines=[('内容整理自公开的资料。', 0)], dur_min=8.0),
]

MUSIC_FILE = 'entropy.mp3'     # Entropy - Original: constant 150 BPM, F minor, 4/4
BEAT0 = 1.175                  # time of the first beat (bar 0 of the track) in seconds
BEAT = 0.4
BAR = BEAT * 4
TRANSPOSE = -6                 # synth layer: D major -> Ab major (relative of F minor)
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
                d = max(BEAT * 5, math.ceil((d - 0.2) / BEAT - 1e-9) * BEAT)   # every subtitle change lands on a beat
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

CUE_SPEC = [
 ('hero', ('L', 3, 0.3), 'flash', None), ('hero', ('L', 4, 0.2), 'soft', None),
 ('s1', ('L', 0, 0.3), 'ding', None), ('s1', ('L', 3, 0.2), 'pop', None), ('s1', ('L', 5, 0.3), 'soft', None),
 ('s2', ('L', 0, 0.3), 'pop', None), ('s2', ('L', 3, 0.2), 'whoosh', None), ('s2', ('L', 4, 0.3), 'ding', None),
 ('s3', ('L', 0, 0.2), 'pop', None), ('s3', ('L', 3, 0.2), 'thump', None), ('s3', ('L', 4, 0.3), 'ding', None),
 ('s4', ('L', 0, 0.2), 'pop', None), ('s4', ('L', 1, 0.2), 'ding', None), ('s4', ('L', 3, 0.3), 'soft', None),
 ('s5', ('L', 1, 0.2), 'whoosh', None), ('s5', ('L', 2, 0.2), 'tick', 1.0), ('s5', ('L', 3, 0.3), 'whoosh', None),
 ('s6', ('L', 1, 0.2), 'tick', 1.0), ('s6', ('L', 3, 0.3), 'repel', None), ('s6', ('L', 4, 0.2), 'hit', None),
 ('s7', ('L', 0, 0.3), 'ding', None), ('s7', ('L', 1, 0.2), 'pop', None), ('s7', ('L', 3, 0.2), 'tick', 0.8),
 ('s8', ('L', 1, 0.2), 'whoosh', None), ('s8', ('L', 3, 0.2), 'pop', None), ('s8', ('L', 5, 0.3), 'ding', None),
 ('s9', ('L', 1, 0.2), 'pop', None), ('s9', ('L', 3, 0.3), 'hit', None),
 ('s10', ('L', 1, 0.2), 'pop', None), ('s10', ('L', 2, 0.2), 'pop', None), ('s10', ('L', 5, 0.3), 'ding', None),
 ('s11', ('L', 2, 0.2), 'pop', None), ('s11', ('L', 3, 0.2), 'pop', None), ('s11', ('L', 4, 0.3), 'thump', None),
 ('s12', ('L', 2, 0.2), 'repel', None), ('s12', ('L', 4, 0.3), 'hit', None),
 ('s13', ('L', 3, 0.2), 'whoosh', None), ('s13', ('L', 4, 0.2), 'repel', None), ('s13', ('L', 6, 0.3), 'soft', None),
 ('s14', ('L', 2, 0.2), 'hit', None), ('s14', ('L', 3, 0.2), 'thump', None), ('s14', ('L', 5, 0.3), 'soft', None),
 ('s15', ('L', 1, 0.2), 'whoosh', None), ('s15', ('L', 4, 0.2), 'ding', None),
 ('s16', ('L', 1, 0.2), 'pop', None), ('s16', ('L', 3, 0.2), 'pop', None),
 ('s17', ('L', 2, 0.2), 'repel', None), ('s17', ('L', 4, 0.3), 'whoosh', None),
]
BED_SPEC = [
 ('wind',   'hero', ('T', 0), 'ch1', ('T', 0.3), [('hero', ('T', 0), 0.0), ('hero', ('T', 2.5), 0.10), ('hero', ('E', 0), 0.10)], 2.0, 1.2),
 ('shimmer', 's14', ('T', 0.5), 's14', ('E', 0), [('s14', ('T', 0.5), 0.0), ('s14', ('T', 6), 0.14), ('s14', ('E', 0), 0.08)], 1.5, 2.0),
 ('wind',   'recap', ('T', 0), 'src', ('T', 3.0), [('recap', ('T', 0), 0.0), ('recap', ('T', 4), 0.10), ('src', ('T', 0.3), 0.0)], 1.5, 2.5),
]
MUSIC_SPEC = [('hero', 1), ('ch1', 1), ('s1', 2), ('s2', 0), ('ch2', 4), ('s3', 4), ('s4', 1), ('s5', 3),
              ('ch3', 5), ('s6', 5), ('s7', 1), ('s8', 3), ('s9', 2),
              ('ch4', 2), ('s10', 2), ('s11', 0), ('ch5', 4), ('s12', 4), ('s13', 1), ('s14', 3),
              ('ch6', 0), ('s15', 0), ('s16', 3), ('s17', 1), ('recap', 2), ('src', 0)]

def chords():
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
