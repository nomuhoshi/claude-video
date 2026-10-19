# -*- coding: utf-8 -*-
# Scene script for the copper / generator video. Timing is computed from the subtitle volume.
import math, random

TITLE = '电力：比引力强 10³⁶ 倍的力'
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
    ('想象一种力：它也和距离的平方成反比，', 0), ('却比万有引力强得多，', 0), ('强约 10 的 36 次方倍。', 0),
    ('而且，它有两种：正的，和负的。', 0), ('这样的世界，会是什么样？', 0)]),
 dict(key='ch1', k='chap', name='章节 · 两种电荷', word='两种电荷', line='先看这两种“东西”。'),
 dict(key='s1', k='c', name='第一幕 · 同号相斥', draw='d1', lines=[
    ('一堆正的，会互相推开，', 0), ('向四面八方散开；', 0), ('一堆负的，也一样。', 0),
    ('同种的，相斥；', 0), ('不同种的，相吸。', 0)]),
 dict(key='s2', k='c', name='第二幕 · 混在一起', draw='d2', lines=[
    ('可把正、负均匀地混在一起，', 0), ('它们互相拉住，', 0), ('斥力几乎被抵消，', 0),
    ('紧紧挤成一团。', 0), ('两团这样的混合物，', 0), ('彼此之间，几乎没有力。', 0)]),
 dict(key='ch2', k='chap', name='章节 · 完美平衡', word='完美平衡', line='世界，正是这样的混合物。'),
 dict(key='s3', k='c', name='第三幕 · 万物是混合物', draw='d3', lines=[
    ('世间万物，都是这样的混合物：', 0), ('带正电的质子，', 0), ('和带负电的电子。', 0),
    ('平衡得这么好，', 0), ('你站在别人身边，', 0), ('什么力也感觉不到。', 0)]),
 dict(key='s4', k='c', name='第四幕 · 差一点点', draw='d4', lines=[
    ('可只要差一点点：', 0), ('两个人相距一臂，', 0), ('各多出 1% 的电子，', 0),
    ('斥力能举起帝国大厦吗？不。', 0), ('能举起珠穆朗玛峰吗？也不。', 0), ('它能举起整个地球的重量。', 0)]),
 dict(key='ch3', k='chap', name='章节 · 硬，是电力', word='硬，是电力', line='这股巨力，让东西变得又硬又牢。'),
 dict(key='s5', k='c', name='第五幕 · 帝国大厦', draw='d5', lines=[
    ('帝国大厦在风里，', 0), ('摇摆不到一英寸。', 0), ('是电力，把每个电子和质子，', 0),
    ('差不多，拉在各自的位置上。', 0)]),
 dict(key='s6', k='c', name='第六幕 · 剩余的电力', draw='d6', lines=[
    ('放大到只剩几个原子，', 0), ('正负电荷，未必刚好相等，', 0), ('就会剩下很强的电力。', 0),
    ('就算两小块都是中性的，', 0), ('靠得近的异号电荷，吸引更强，', 0), ('原子间的化学力，其实都是电力。', 0)]),
 dict(key='ch4', k='chap', name='章节 · 两个疑问', word='两个疑问', line='可你也许会问两件事。'),
 dict(key='s7', k='c', name='第七幕 · 为什么不贴紧', draw='d7', lines=[
    ('电力这么强，', 0), ('质子和电子，为什么不贴在一起？', 0), ('它们想要最紧密的混合，', 0),
    ('为什么不能再紧一点？', 0)]),
 dict(key='s8', k='c', name='第八幕 · 量子的回答', draw='d8', lines=[
    ('答案要靠量子力学。', 0), ('把电子限制在越小的地方，', 0), ('按不确定性原理，', 0),
    ('它的动量就越大。', 0), ('这股乱动的劲，', 0), ('顶住了电的吸引，', 0), ('不让两个电荷靠得更近。', 0)]),
 dict(key='s9', k='c', name='第九幕 · 核里的质子', draw='d9', lines=[
    ('原子核里有好几个质子，', 0), ('全都带正电，', 0), ('为什么不互相推开？', 0),
    ('因为核里还有核力，', 0), ('它比电力还大，', 0), ('把质子拉在一起。', 0)]),
 dict(key='s10', k='c', name='第十幕 · 铀', draw='d10', lines=[
    ('可核力是短程力，只管最近的邻居；', 0), ('电力却能管到很远。', 0), ('质子越多，电的排斥越强。', 0),
    ('铀有 92 个质子，', 0), ('平衡已脆弱得快要散开。', 0), ('轻轻一敲，它就裂成两半，', 0),
    ('两半被电斥力推开，放出能量。', 0)]),
 dict(key='ch5', k='chap', name='章节 · 电子自己', word='电子自己', line='还剩最后一个问题。'),
 dict(key='s11', k='c', name='第十一幕 · 电子的各部分', draw='d11', lines=[
    ('是什么，把电子自己束缚在一起？', 0), ('电子带负电，', 0), ('要是它由一团东西构成，', 0),
    ('各部分应该互相排斥，', 0), ('为什么没有飞散？', 0)]),
 dict(key='s12', k='c', name='第十二幕 · 一个点', draw='d12', lines=[
    ('或许，电子根本没有“各部分”，', 0), ('它只是一个点，', 0), ('不会推自己。', 0),
    ('讲义说，这个问题没有解答。', 0), ('今天的实验，也没看到电子有内部结构。', 0)]),
 dict(key='ch6', k='chap', name='章节 · 一条公式', word='一条公式', line='最后，把话说成一条公式。'),
 dict(key='s13', k='c', name='第十三幕 · 材料的性质', draw='d13', lines=[
    ('电力加上量子力学，', 0), ('决定了整块材料的性质：', 0), ('有的硬，有的软；', 0),
    ('有的导电，有的绝缘。', 0), ('这些以后再讲，', 0), ('先看最简单的情形。', 0)]),
 dict(key='s14', k='c', name='第十四幕 · 库仑定律', draw='d14', lines=[
    ('两个电荷之间的力，', 0), ('和距离的平方成反比，', 0), ('这叫库仑定律。', 0),
    ('可电荷一动，它就不准了，', 0), ('多出来的一部分，是磁力。', 0), ('所以这门学问，叫电磁学。', 0)]),
 dict(key='s15', k='c', name='第十五幕 · 一条规律', draw='d15', lines=[
    ('好在有一条普遍的规律：', 0), ('不管周围有多少电荷、怎么动，', 0), ('作用在某个电荷上的力，', 0),
    ('只取决于它的位置、速度和电量。', 0), ('写成公式：F = q(E + v × B)。', 0), ('E 和 B 是什么，先不展开。', 0)]),
 dict(key='recap', k='recap', name='回头看', lines=[
    ('电力，比引力强得多，', 0), ('却几乎被抵消得看不见。', 0),
    ('量子和核力，守住了原子和原子核；', 0), ('一条公式，写下了电磁学的起点。', 0)], dur_min=9.5),
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
 ('hero', ('L', 1, 0.3), 'pop', None), ('hero', ('L', 2, 0.2), 'flash', None), ('hero', ('L', 3, 0.2), 'repel', None), ('hero', ('L', 4, 0.2), 'soft', None),
 ('s1', ('L', 0, 0.3), 'repel', None), ('s1', ('L', 2, 0.2), 'repel', None), ('s1', ('L', 4, 0.2), 'ding', None),
 ('s2', ('L', 1, 0.2), 'whoosh', None), ('s2', ('L', 3, 0.2), 'thump', None), ('s2', ('L', 5, 0.3), 'soft', None),
 ('s3', ('L', 1, 0.2), 'pop', None), ('s3', ('L', 2, 0.2), 'pop', None), ('s3', ('L', 5, 0.3), 'ding', None),
 ('s4', ('L', 2, 0.2), 'tick', 1.0), ('s4', ('L', 3, 0.2), 'hit', None), ('s4', ('L', 4, 0.2), 'hit', None), ('s4', ('L', 5, 0.3), 'flash', None),
 ('s5', ('L', 1, 0.2), 'tick', 1.0), ('s5', ('L', 2, 0.3), 'pop', None), ('s5', ('L', 3, 0.3), 'ding', None),
 ('s6', ('L', 2, 0.2), 'flash', None), ('s6', ('L', 4, 0.2), 'whoosh', None), ('s6', ('L', 5, 0.3), 'ding', None),
 ('s7', ('L', 1, 0.2), 'whoosh', None), ('s7', ('L', 3, 0.3), 'soft', None),
 ('s8', ('L', 1, 0.2), 'pop', None), ('s8', ('L', 3, 0.2), 'thump', None), ('s8', ('L', 5, 0.2), 'ding', None),
 ('s9', ('L', 2, 0.2), 'repel', None), ('s9', ('L', 4, 0.2), 'thump', None), ('s9', ('L', 5, 0.3), 'ding', None),
 ('s10', ('L', 3, 0.2), 'tick', 1.0), ('s10', ('L', 5, 0.2), 'hit', None), ('s10', ('L', 6, 0.3), 'flash', None),
 ('s11', ('L', 1, 0.2), 'pop', None), ('s11', ('L', 3, 0.2), 'repel', None), ('s11', ('L', 4, 0.3), 'whoosh', None),
 ('s12', ('L', 1, 0.2), 'pop', None), ('s12', ('L', 3, 0.3), 'soft', None), ('s12', ('L', 4, 0.2), 'ding', None),
 ('s13', ('L', 2, 0.2), 'thump', None), ('s13', ('L', 3, 0.2), 'tick', 1.0), ('s13', ('L', 5, 0.3), 'soft', None),
 ('s14', ('L', 2, 0.2), 'ding', None), ('s14', ('L', 4, 0.2), 'whoosh', None), ('s14', ('L', 5, 0.3), 'flash', None),
 ('s15', ('L', 3, 0.2), 'pop', None), ('s15', ('L', 4, 0.2), 'flash', None), ('s15', ('L', 5, 0.3), 'ding', None),
]
BED_SPEC = [
 ('wind',   'hero', ('T', 0), 'ch1', ('T', 0.3), [('hero', ('T', 0), 0.0), ('hero', ('T', 2.5), 0.10), ('hero', ('E', 0), 0.10)], 2.0, 1.2),
 ('shimmer', 's10', ('T', 0.5), 's10', ('E', 0), [('s10', ('T', 0.5), 0.0), ('s10', ('T', 6), 0.14), ('s10', ('E', 0), 0.08)], 1.5, 2.0),
 ('wind',   'recap', ('T', 0), 'src', ('T', 3.0), [('recap', ('T', 0), 0.0), ('recap', ('T', 4), 0.10), ('src', ('T', 0.3), 0.0)], 1.5, 2.5),
]
MUSIC_SPEC = [('hero', 1), ('ch1', 1), ('s1', 2), ('s2', 4), ('ch2', 4), ('s3', 4), ('s4', 1), ('ch3', 5), ('s5', 5), ('s6', 1),
              ('ch4', 2), ('s7', 2), ('s8', 0), ('s9', 3), ('s10', 1), ('ch5', 4), ('s11', 4), ('s12', 2), ('ch6', 0), ('s13', 0), ('s14', 3), ('s15', 1), ('recap', 2), ('src', 0)]

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
