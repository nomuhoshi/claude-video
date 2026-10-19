# -*- coding: utf-8 -*-
# Scene script for the "fire" video. Timing is computed from the subtitle volume (no fixed 300 s).
import math, random

TITLE = '火，到底是什么？'
SPEED = 6.8        # chars per second for reading
LEAD = {'hero': 0.35, 'c': 0.5, 'recap': 0.3, 'src': 0.3}
TAIL = {'hero': 0.4, 'c': 0.55, 'recap': 0.5, 'src': 0.5}
CHAP_DUR = 2.6
GAP = 0.08

def n_chars(t):
    n = 0.0
    for ch in t:
        n += 0.35 if ch in '，。、：；？！“”‘’… ' else 1.0
    return n

# kind: hero | chap | c (canvas content) | recap | src
SC = [
 dict(key='hero', k='hero', name='开场', draw='d0', lines=[
    ('木头和氧气，天天待在一起。', 0), ('它们为什么不会自己烧起来？', 0), ('烧起来的火，又是从哪来的？', 0.2)]),
 dict(key='ch1', k='chap', name='章节 · 小山与深坑', word='小山与深坑', en='THE HILL', sub='先看碳和氧，怎么相处',
      line='先看碳和氧，怎么相处。'),
 dict(key='s1', k='c', name='第一幕 · 原子的脾气', draw='d1', lines=[
    ('先认识两种原子：碳，和氧。', 0), ('它们彼此“喜欢”：', 0), ('靠得够近，就会紧紧抱在一起。', 0.6),
    ('可要是靠得不够近，', 0), ('它们反而互相排斥，被推开。', 4.4)]),
 dict(key='s2', k='c', name='第二幕 · 小山与深坑', draw='d2', lines=[
    ('想象一个球，前面有座小山，', 0), ('山的另一边，是一个很深的坑。', 0),
    ('球滚得慢，爬到半山腰就滚回来。', 5.0), ('球滚得快，才能冲过山顶，', 2.2), ('掉进那个深坑。', 3.2),
    ('山，是原子之间的排斥；', 0), ('坑，是紧紧抱在一起。', 0),
    ('氧气不停扑向木头里的碳，', 0), ('撞一下，弹开，什么也不会发生。', 3.2)]),
 dict(key='ch2', k='chap', name='章节 · 一点火星', word='一点火星', en='IGNITION', sub='热，让少数原子冲过山顶',
      line='怎样让球，跑得更快？'),
 dict(key='s3', k='c', name='第三幕 · 热就是乱抖', draw='d3', lines=[
    ('让球变快的办法：加热。', 0), ('热，就是原子在乱抖。', 0), ('温度越高，抖得越快。', 2.0),
    ('总有少数几个，跑得特别快，', 0), ('它们冲过山顶，贴近了碳，', 0), ('卡进了深坑里。', 1.6),
    ('木头要加热到几百摄氏度，', 0), ('这样的原子才会够多。', 1.2)]),
 dict(key='s4', k='c', name='第四幕 · 连锁反应', draw='d4', lines=[
    ('掉进深坑的那一刻，', 0), ('会放出很多能量。', 0), ('这些能量变成猛烈的抖动，', 0),
    ('撞到旁边的原子，', 0), ('让它们也跑得更快，冲过山顶。', 0),
    ('更多原子掉进坑里，放出更多的热，', 0), ('一个接一个，越来越快。', 0),
    ('这场连锁反应，就是火。', 1.6), ('所以火一旦点着，就会一直烧下去。', 0)]),
 dict(key='ch3', k='chap', name='章节 · 树从哪来', word='树从哪来', en='WHERE TREES COME FROM', sub='不在土里，在空气里',
      line='火烧的东西，又是哪来的？'),
 dict(key='s5', k='c', name='第五幕 · 树是空气做的', draw='d5', lines=[
    ('木头里的碳，又是从哪来的？', 0), ('它来自一棵树。', 0), ('干木头的重量，大约一半是碳。', 0.8),
    ('树里的碳，是从土里长出来的吗？', 0), ('不是。它们来自空气。', 1.0),
    ('空气里的二氧化碳，进到了树里。', 1.4), ('树的大部分身体，其实来自空气。', 1.4),
    ('土只给了水和一点点矿物质。', 0)]),
 dict(key='s6', k='c', name='第六幕 · 阳光敲开氧和碳', draw='d6', lines=[
    ('二氧化碳里，碳和氧抱得很紧。', 0), ('树是怎么把它们拆开的？', 0), ('靠生命的某种神秘力量吗？', 0),
    ('不，靠的是阳光。', 0.8), ('阳光照下来，把氧从碳身上敲开。', 1.6),
    ('氧气是副产品，被吐回了空气。', 1.4), ('留下的碳，加上水，', 0), ('一点点搭成了树的身体。', 1.6)]),
 dict(key='ch4', k='chap', name='章节 · 储存的太阳', word='储存的太阳', en='STORED SUNLIGHT', sub='烧木头，放出的是阳光',
      line='最后，回到壁炉。'),
 dict(key='s7', k='c', name='第七幕 · 火光是阳光', draw='d7', lines=[
    ('现在，把木头放进壁炉。', 0), ('热让碳和氧，重新靠到一起。', 0.4), ('它们变回二氧化碳。', 0.6),
    ('当年阳光费力拆开它们，', 0), ('现在，这份能量以光和热放了出来。', 0.8),
    ('你看到的火光，', 0), ('就是树存下来的阳光。', 1.0), ('烧木头，是在放出储存的太阳。', 1.6)]),
 dict(key='s8', k='c', name='第八幕 · 留给你想象', draw='d8', lines=[
    ('下一个问题：太阳，为什么这么热？', 1.2), ('这个，就留给你们去想象。', 2.6)]),
 dict(key='recap', k='recap', name='回头看', lines=[
    ('小山挡着，热让少数原子冲过去，', 0), ('连锁反应成了火，烧的是储存的太阳。', 0)], dur_min=9.5),
 dict(key='src', k='src', name='资料来源', lines=[('内容整理自公开资料，来源见画面。', 0)], dur_min=8.0),
]

BEAT = 0.53194                 # vibe.mp3 is a constant 112.79 BPM
BAR = BEAT * 4
BAR_KEYS = ('s1', 'ch3', 's6', 's8')   # scenes that must start on a bar line (music drop / breakdown / groove returns / outro)
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

# ---- sound cues written by hand ([scene key, anchor, name, arg]) ----
CUE_SPEC = [
 ('hero', ('L', 2, 0.1), 'flash', None),
 ('s1', ('L', 0, 0.2), 'pop', None), ('s1', ('L', 0, 1.3), 'pop', None),
 ('s1', ('L', 1, 0.15), 'soft', None),
 ('s1', ('L', 2, 1.75), 'bond', None),
 ('s1', ('L', 3, 0.1), 'pop', None),
 ('s1', ('L', 4, 0.15), 'whoosh', None),
 ('s1', ('L', 4, 1.45), 'repel', None), ('s1', ('L', 4, 3.55), 'repel', None),
 ('s2', ('L', 0, 0.3), 'soft', None), ('s2', ('L', 1, 0.2), 'soft', None),
 ('s2', ('L', 5, 0.1), 'hit', None), ('s2', ('L', 6, 0.1), 'ding', None),
 ('s3', ('L', 1, 0.1), 'soft', None),
 ('s4', ('L', 7, 0.2), 'hit', None),
 ('s5', ('L', 1, 0.1), 'pop', None), ('s5', ('L', 4, 0.1), 'soft', None), ('s5', ('L', 6, 0.1), 'grow', None),
 ('s6', ('L', 3, 0.0), 'sun', None), ('s6', ('L', 5, 0.3), 'bubble', 520), ('s6', ('L', 5, 0.65), 'bubble', 640),
 ('s6', ('L', 5, 1.1), 'bubble', 760),
 ('s7', ('L', 1, 0.2), 'flash', None), ('s7', ('L', 4, 0.2), 'grow', None), ('s7', ('L', 7, 0.3), 'hit', None),
 ('s8', ('L', 0, 0.2), 'sun', None),
]
# beds: [kind, scene a, anchor a, scene b, anchor b, [(scene,anchor,level),...], fade in, fade out]
BED_SPEC = [
 ('wind',   'hero', ('T', 0), 'ch1', ('T', 0.3), [('hero', ('T', 0), 0.0), ('hero', ('T', 2.5), 0.10), ('hero', ('E', 0), 0.12)], 2.0, 1.2),
 ('crackle', 'hero', ('L', 2, -0.2), 'ch1', ('T', 1.2), [('hero', ('L', 2, -0.2), 0.0), ('hero', ('E', 0), 0.30)], 0.5, 1.0),
 ('roar',   'hero', ('L', 2, -0.2), 'ch1', ('T', 1.2), [('hero', ('L', 2, -0.2), 0.0), ('hero', ('E', 0), 0.16)], 0.5, 1.0),
 ('ball',   's2', ('L', 2, -0.1), 's2', ('E', 0.4), [('s2', ('L', 2, -0.1), 0.0), ('s2', ('E', 0), 0.9)], 0.6, 1.0),
 ('wind',   'ch3', ('T', 0.4), 's6', ('L', 3, 0.2), [('ch3', ('T', 0.4), 0.0), ('s5', ('T', 1.0), 0.17), ('s6', ('L', 3, 0.0), 0.12)], 1.5, 1.5),
 ('shimmer', 's6', ('L', 3, 0.0), 's6', ('E', 0.6), [('s6', ('L', 3, 0.0), 0.0), ('s6', ('L', 5, 0.0), 0.16), ('s6', ('E', 0), 0.12)], 1.0, 1.4),
 ('crackle', 'ch4', ('T', 1.4), 's8', ('L', 0, 1.2), [('ch4', ('T', 1.4), 0.0), ('s7', ('L', 1, 0.0), 0.12), ('s7', ('L', 4, 0.0), 0.34), ('s7', ('L', 7, 0.0), 0.38), ('s8', ('T', 0.3), 0.12)], 0.8, 2.0),
 ('roar',   'ch4', ('T', 1.4), 's8', ('L', 0, 1.2), [('ch4', ('T', 1.4), 0.0), ('s7', ('L', 1, 0.0), 0.10), ('s7', ('L', 4, 0.0), 0.20), ('s7', ('L', 7, 0.0), 0.22), ('s8', ('T', 0.3), 0.06)], 0.8, 2.0),
 ('shimmer', 's7', ('L', 5, 0.0), 'src', ('T', 3.0), [('s7', ('L', 5, 0.0), 0.0), ('s7', ('L', 7, 0.0), 0.15), ('s8', ('T', 0.5), 0.20), ('recap', ('T', 2.0), 0.08), ('src', ('T', 0.3), 0.0)], 1.5, 2.5),
]

# ---- music: chord per scene (index into the chord table in the engine) ----
# 0 Dadd9, 1 Bm9, 2 Gmaj9, 3 Asus2, 4 F#m9, 5 Emadd9
MUSIC_SPEC = [('hero', 0), ('ch1', 1), ('s1', 1), ('s2', 2), ('ch2', 4), ('s3', 4), ('s4', 1), ('ch3', 2), ('s5', 2), ('s6', 0),
              ('ch4', 1), ('s7', 4), ('s8', 0), ('recap', 2), ('src', 0)]

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

# ---- music plan: vibe.mp3 re-cut by whole bars: [video bar, track bar, number of bars] ----
def music_plan():
    nb = lambda key: int(round(TL[IDX[key]]['s'] / BAR))
    s1, c3, s6, s8 = nb('s1'), nb('ch3'), nb('s6'), nb('s8')
    total = int(math.ceil(DUR / BAR))
    seq = []                                   # one track bar per video bar
    seq += list(range(8 - s1, 8))              # quiet intro (track bars 0-7)
    g = c3 - s1; groove = list(range(8, 40))
    if g > 32: groove = list(range(8, 8 + (g - 32))) + groove
    seq += groove[:g]
    k = s6 - c3; head = [40 + (j % 4) for j in range(max(0, k - 4))]
    seq += (head + [44, 45, 46, 47])[-k:] if k >= 4 else list(range(40, 40 + k))
    p = s8 - s6; seq += [48 + (j % 30) for j in range(p)]
    seq += list(range(78, 87))[:max(0, total - s8)]
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
