# -*- coding: utf-8 -*-
# Scene script for the heat / jiggling atoms video. Timing is computed from the subtitle volume.
import math, random

TITLE = '热，是原子在乱抖'
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
    ('你手里这杯咖啡，', 0), ('烫，到底是什么意思？', 0), ('答案藏在你看不见的地方：', 0),
    ('无数原子，正在拼命地抖。', 0), ('想看见它，得靠想象。', 0)]),
 dict(key='ch1', k='chap', name='章节 · 想象', word='想象', line='为什么有人觉得科学枯燥？'),
 dict(key='s1', k='c', name='第一幕 · 科学与想象力', draw='d1', lines=[
    ('有人觉得科学很简单，', 0), ('有人觉得它又枯燥又难。', 0), ('就像有人唱歌总跑调，', 0),
    ('也就少了很多乐趣。', 0), ('科学难，常常是因为，', 0), ('它需要丰富的想象力。', 0),
    ('得去想：那些离奇的东西，', 0), ('本来到底是什么样。', 0)]),
 dict(key='ch2', k='chap', name='章节 · 冷与热', word='冷与热', line='先从最熟悉的东西开始。'),
 dict(key='s2', k='c', name='第二幕 · 热是原子在抖', draw='d2', lines=[
    ('冷和热，看着简单，', 0), ('其实取决于原子振动的快慢。', 0), ('原子抖得越快，就越热；', 0), ('抖得越慢，就越冷。', 0)]),
 dict(key='s3', k='c', name='第三幕 · 热是怎么传开的', draw='d3', lines=[
    ('桌上一杯咖啡，', 0), ('杯里的原子抖得很厉害，', 0), ('不停撞击杯壁；', 0), ('杯子的原子也跟着抖起来，', 0),
    ('杯子，就被加热了。', 0), ('杯子再去撞周围，周围也热了。', 0), ('传过去的，只是振动，', 0), ('一种没有规矩的乱动。', 0)]),
 dict(key='ch3', k='chap', name='章节 · 弹跳', word='弹跳', line='说到振动，你想到了什么？'),
 dict(key='s4', k='c', name='第四幕 · 小球和原子', draw='d4', lines=[
    ('说到振动，你可能想到小球弹跳；', 0), ('它弹着弹着，会慢慢停下来。', 0), ('可原子不一样，', 0),
    ('它们的弹性是完美的，', 0), ('撞来撞去，一点能量都不丢，', 0), ('永远不会停。', 0)]),
 dict(key='s5', k='c', name='第五幕 · 小球为什么停', draw='d5', lines=[
    ('那小球为什么会停？', 0), ('它每撞一次地板，', 0), ('就把整齐的下落运动，', 0), ('变成了地板原子的乱抖。', 0),
    ('每弹一次，就丢一点能量，', 0), ('直到它停在地上。', 0), ('运动并没有消失，', 0), ('只是变成了乱抖，', 0), ('地板，悄悄变热了。', 0)]),
 dict(key='s6', k='c', name='第六幕 · 锤东西', draw='d6', lines=[
    ('听着难以置信，', 0), ('可经常锤东西的人都知道：', 0), ('敲得多了，它就会发热。', 0), ('只因为，你让它抖起来了。', 0)]),
 dict(key='ch5', k='chap', name='章节 · 水滴', word='水滴', line='再看一小滴水。'),
 dict(key='s7', k='c', name='第七幕 · 想要同伴', draw='d7', lines=[
    ('一小滴水里，', 0), ('原子互相吸引，', 0), ('都想有尽可能多的同伴。', 0), ('在中间的，四面都是同伴；', 0),
    ('在表面的，只有一侧有，', 0), ('另一侧是空气。', 0)]),
 dict(key='s8', k='c', name='第八幕 · 挤成一团', draw='d8', lines=[
    ('想象一群人，快速地乱动，', 0), ('都想有最多的同伴。', 0), ('站在边缘的人很着急，', 0), ('不停地往里挤。', 0),
    ('结果，就挤成了紧紧的一团，', 0), ('而不是摊开成一片。', 0), ('这就是表面张力。', 0)]),
 dict(key='ch6', k='c', name='第九幕 · 水珠消失', draw='d9', lines=[
    ('桌上立着一颗圆圆的水珠，', 0), ('表面的原子，都想钻进水里；', 0), ('可同时，也有原子，', 0),
    ('正从表面逃走。', 0), ('于是，水珠慢慢地，', 0), ('消失了。', 0)]),
 dict(key='s10', k='c', name='第十幕 · 想象的乐趣', draw='d10', lines=[
    ('这样去想象一切，', 0), ('本身就是一种乐趣，', 0), ('就像跑步的人，', 0), ('从流汗里得到快乐。', 0),
    ('想着这些现象，', 0), ('就是它的快乐，', 0), ('想着想着，就停不下来。', 0)]),
 dict(key='recap', k='recap', name='回头看', lines=[
    ('热，是原子的乱抖；', 0), ('小球停下，是整齐变成了乱抖；', 0),
    ('水滴成球，是原子想要同伴；', 0), ('看不见的世界，要靠想象去看。', 0)], dur_min=9.5),
 dict(key='src', k='src', name='资料来源', lines=[('内容整理自文字稿和公开的资料。', 0)], dur_min=8.0),
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
 ('hero', ('L', 1, 0.3), 'pop', None), ('hero', ('L', 3, 0.2), 'tick', 1.0), ('hero', ('L', 4, 0.2), 'soft', None),
 ('s1', ('L', 0, 0.3), 'pop', None), ('s1', ('L', 2, 0.2), 'tick', 1.0), ('s1', ('L', 4, 0.2), 'soft', None), ('s1', ('L', 5, 0.3), 'ding', None), ('s1', ('L', 7, 0.3), 'flash', None),
 ('s2', ('L', 1, 0.2), 'pop', None), ('s2', ('L', 2, 0.2), 'tick', 1.0), ('s2', ('L', 3, 0.3), 'soft', None),
 ('s3', ('L', 1, 0.2), 'pop', None), ('s3', ('L', 2, 0.2), 'hit', None), ('s3', ('L', 3, 0.2), 'tick', 1.0), ('s3', ('L', 5, 0.3), 'tick', 1.0), ('s3', ('L', 7, 0.3), 'ding', None),
 ('s4', ('L', 1, 0.3), 'hit', None), ('s4', ('L', 3, 0.2), 'pop', None), ('s4', ('L', 5, 0.3), 'ding', None),
 ('s5', ('L', 1, 0.2), 'hit', None), ('s5', ('L', 3, 0.2), 'tick', 1.0), ('s5', ('L', 5, 0.3), 'soft', None), ('s5', ('L', 8, 0.3), 'ding', None),
 ('s6', ('L', 1, 0.3), 'hit', None), ('s6', ('L', 2, 0.3), 'hit', None), ('s6', ('L', 3, 0.3), 'flash', None),
 ('s7', ('L', 1, 0.2), 'pop', None), ('s7', ('L', 3, 0.2), 'tick', 1.0), ('s7', ('L', 4, 0.2), 'tick', 0.8), ('s7', ('L', 5, 0.3), 'soft', None),
 ('s8', ('L', 2, 0.2), 'pop', None), ('s8', ('L', 4, 0.2), 'thump', None), ('s8', ('L', 6, 0.3), 'ding', None),
 ('ch6', ('L', 1, 0.2), 'tick', 1.0), ('ch6', ('L', 3, 0.2), 'whoosh', None), ('ch6', ('L', 5, 0.3), 'soft', None),
 ('s10', ('L', 1, 0.2), 'flash', None), ('s10', ('L', 3, 0.3), 'pop', None), ('s10', ('L', 6, 0.3), 'ding', None),
]
BED_SPEC = [
 ('wind',   'hero', ('T', 0), 'ch1', ('T', 0.3), [('hero', ('T', 0), 0.0), ('hero', ('T', 2.5), 0.10), ('hero', ('E', 0), 0.10)], 2.0, 1.2),
 ('shimmer', 'ch6', ('T', 0.5), 'ch6', ('E', 0), [('ch6', ('T', 0.5), 0.0), ('ch6', ('T', 6), 0.12), ('ch6', ('E', 0), 0.08)], 1.5, 2.0),
 ('wind',   'recap', ('T', 0), 'src', ('T', 3.0), [('recap', ('T', 0), 0.0), ('recap', ('T', 4), 0.10), ('src', ('T', 0.3), 0.0)], 1.5, 2.5),
]
MUSIC_SPEC = [('hero', 1), ('ch1', 1), ('s1', 2), ('ch2', 4), ('s2', 4), ('s3', 0), ('ch3', 5), ('s4', 5), ('s5', 1), ('s6', 3),
              ('ch5', 2), ('s7', 2), ('s8', 3), ('ch6', 1), ('s10', 4), ('recap', 2), ('src', 0)]

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
