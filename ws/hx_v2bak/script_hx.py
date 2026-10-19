# -*- coding: utf-8 -*-
# Scene script for the heat / jiggling atoms video. Timing is computed from the subtitle volume.
import math, random

TITLE = '热，是原子在振动'
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
    ('一杯咖啡，放着放着就凉了；', 0), ('一个小球，弹着弹着就停了；', 0), ('一滴水，放着放着就没了。', 0),
    ('这三件小事，', 0), ('背后是同一幅画面：', 0), ('无数原子，在不停地振动。', 0)]),
 dict(key='ch1', k='chap', name='章节 · 冷与热', word='冷与热', line='先从“烫”说起。'),
 dict(key='s1', k='c', name='第一幕 · 烫是什么', draw='d2', lines=[
    ('烫和凉，到底差在哪？', 0), ('差在原子振动得多快。', 0), ('振动得快，就烫；', 0), ('振动得慢，就凉。', 0),
    ('屋里的空气分子，', 0), ('每秒能跑四五百米，', 0), ('比声音还快。', 0)]),
 dict(key='s2', k='c', name='第二幕 · 最冷能有多冷', draw='d11', lines=[
    ('要是振动越来越慢呢？', 0), ('冰块里，原子还在振动；', 0), ('液氮里，振动得更慢；', 0), ('慢到几乎不再振动，', 0),
    ('就是最冷的温度：', 0), ('零下 273.15 度。', 0), ('再也不可能更冷了。', 0)]),
 dict(key='s3', k='c', name='第三幕 · 热怎么传开', draw='d3', lines=[
    ('热，是怎么传开的？', 0), ('杯里的原子振动得很剧烈，', 0), ('一下下撞在杯壁上，', 0), ('杯壁的原子也跟着振动起来；', 0),
    ('杯壁再去撞空气。', 0), ('传过去的，不是什么“热物质”，', 0), ('只是这种无规则的振动。', 0)]),
 dict(key='s4', k='c', name='第四幕 · 咖啡为什么会凉', draw='d12', lines=[
    ('振动会一直往外传，', 0), ('直到咖啡和屋子，', 0), ('振动得一样剧烈为止。', 0), ('咖啡凉了，屋子暖了一点点。', 0),
    ('可反过来，', 0), ('凉咖啡从来不会自己变烫。', 0)]),
 dict(key='ch3', k='chap', name='章节 · 弹跳', word='弹跳', line='再看一个会停下来的东西。'),
 dict(key='s5', k='c', name='第五幕 · 小球和原子', draw='d4', lines=[
    ('小球弹着弹着，就停了。', 0), ('可原子撞来撞去，', 0), ('一点能量都不丢，', 0), ('永远不会停。', 0),
    ('那小球的能量，去哪了？', 0)]),
 dict(key='s6', k='c', name='第六幕 · 能量去哪了', draw='d5', lines=[
    ('看清楚每一次落地：', 0), ('整齐往下的运动，', 0), ('撞进地板，', 0), ('变成了地板原子的振动。', 0),
    ('每弹一次，就交出去一点，', 0), ('直到它停下。', 0), ('能量一点没少，', 0), ('只是从整齐，变成了杂乱的振动：', 0), ('地板，悄悄变热了。', 0)]),
 dict(key='s7', k='c', name='第七幕 · 倒着放', draw='d13', lines=[
    ('要是把这段倒着放呢？', 0), ('地板的原子恰好一起往上推，', 0), ('把小球弹回原来的高度。', 0),
    ('物理定律并不禁止，', 0), ('可这要亿万个原子同时配合，', 0), ('所以，你永远等不到。', 0),
    ('整齐变杂乱，很容易；', 0), ('杂乱变回整齐，几乎不可能。', 0)]),
 dict(key='s8', k='c', name='第八幕 · 锤东西', draw='d6', lines=[
    ('所以，敲东西会发热。', 0), ('锤子每砸一下，', 0), ('整齐的运动，就变成铁块里的振动。', 0),
    ('敲得越多，振动越剧烈，', 0), ('铁块就越烫。', 0)]),
 dict(key='ch5', k='chap', name='章节 · 水滴', word='水滴', line='最后，看一小滴水。'),
 dict(key='s9', k='c', name='第九幕 · 想要同伴', draw='d7', lines=[
    ('水里的原子，互相吸引，', 0), ('都想要尽可能多的同伴。', 0), ('中间的，四面八方都是同伴；', 0),
    ('表面的，只有一边有，', 0), ('另一边，是空气。', 0)]),
 dict(key='s10', k='c', name='第十幕 · 挤成一团', draw='d8', lines=[
    ('想象一群人，都想挤在人堆里。', 0), ('站在边上的，最着急，', 0), ('拼命往里挤。', 0),
    ('结果，大家挤成了紧紧的一团，', 0), ('而不是摊成一片。', 0), ('这就是表面张力，', 0), ('所以露珠和小雨滴，都是圆的。', 0)]),
 dict(key='s11', k='c', name='第十一幕 · 水滴消失', draw='d9', lines=[
    ('可水珠表面，也有原子在逃走：', 0), ('它们挣脱同伴，飞进空气里。', 0), ('一个、两个……越逃越多，', 0),
    ('水珠慢慢变小，', 0), ('最后，消失了。', 0), ('这就是蒸发。', 0)]),
 dict(key='ch6', k='c', name='第十二幕 · 出汗为什么凉快', draw='d14', lines=[
    ('逃走的，偏偏是动得最快的那些。', 0), ('剩下的，平均动得慢一点，', 0), ('水就变凉了。', 0),
    ('所以出汗会让人凉快：', 0), ('汗水蒸发，带走了最“烫”的原子。', 0)]),
 dict(key='ch7', k='chap', name='章节 · 想象', word='想象', line='这些，谁也没亲眼见过。'),
 dict(key='s13', k='c', name='第十三幕 · 想象的乐趣', draw='d10', lines=[
    ('原子太小，谁也看不见它们在振动。', 0), ('科学难，常常就难在这里：', 0), ('它需要想象力。', 0),
    ('可一旦想象出来，', 0), ('就像跑步的人，从出汗里得到快乐，', 0), ('想着想着，就停不下来。', 0)]),
 dict(key='recap', k='recap', name='回头看', lines=[
    ('热，是原子在振动；', 0), ('咖啡会凉，小球会停，都回不去；', 0),
    ('水滴成球，又一点点逃走；', 0), ('看不见的世界，靠想象去看。', 0)], dur_min=9.5),
 dict(key='src', k='src', name='资料来源', lines=[('内容出自费曼的讲述，物理整理自公开资料。', 0)], dur_min=8.0),
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
 ('hero', ('L', 0, 0.3), 'soft', None), ('hero', ('L', 1, 0.6), 'hit', None), ('hero', ('L', 2, 0.3), 'whoosh', None), ('hero', ('L', 5, 0.2), 'flash', None),
 ('s1', ('L', 2, 0.2), 'tick', 1.0), ('s1', ('L', 3, 0.2), 'soft', None), ('s1', ('L', 5, 0.2), 'whoosh', None), ('s1', ('L', 6, 0.2), 'ding', None),
 ('s2', ('L', 1, 0.3), 'tick', 0.8), ('s2', ('L', 2, 0.3), 'tick', 0.6), ('s2', ('L', 5, 0.2), 'flash', None), ('s2', ('L', 6, 0.3), 'soft', None),
 ('s3', ('L', 2, 0.2), 'hit', None), ('s3', ('L', 3, 0.2), 'tick', 1.0), ('s3', ('L', 4, 0.2), 'tick', 1.0), ('s3', ('L', 6, 0.3), 'ding', None),
 ('s4', ('L', 2, 0.3), 'soft', None), ('s4', ('L', 5, 0.3), 'repel', None),
 ('s5', ('L', 1, 0.2), 'pop', None), ('s5', ('L', 3, 0.3), 'ding', None), ('s5', ('L', 4, 0.2), 'soft', None),
 ('s6', ('L', 2, 0.2), 'hit', None), ('s6', ('L', 3, 0.2), 'tick', 1.0), ('s6', ('L', 6, 0.3), 'soft', None), ('s6', ('L', 8, 0.3), 'ding', None),
 ('s7', ('L', 0, 0.3), 'whoosh', None), ('s7', ('L', 3, 0.2), 'ding', None), ('s7', ('L', 5, 0.2), 'repel', None), ('s7', ('L', 7, 0.3), 'flash', None),
 ('s8', ('L', 2, 0.3), 'tick', 1.0), ('s8', ('L', 4, 0.3), 'flash', None),
 ('s9', ('L', 1, 0.2), 'pop', None), ('s9', ('L', 2, 0.2), 'tick', 1.0), ('s9', ('L', 3, 0.2), 'tick', 0.8), ('s9', ('L', 4, 0.3), 'soft', None),
 ('s10', ('L', 1, 0.2), 'pop', None), ('s10', ('L', 3, 0.2), 'thump', None), ('s10', ('L', 5, 0.3), 'ding', None),
 ('s11', ('L', 1, 0.2), 'whoosh', None), ('s11', ('L', 4, 0.3), 'soft', None), ('s11', ('L', 5, 0.2), 'ding', None),
 ('ch6', ('L', 0, 0.4), 'whoosh', None), ('ch6', ('L', 2, 0.2), 'tick', 0.8), ('ch6', ('L', 4, 0.3), 'flash', None),
 ('s13', ('L', 2, 0.2), 'flash', None), ('s13', ('L', 4, 0.3), 'pop', None), ('s13', ('L', 5, 0.3), 'ding', None),
]
BED_SPEC = [
 ('wind',   'hero', ('T', 0), 'ch1', ('T', 0.3), [('hero', ('T', 0), 0.0), ('hero', ('T', 2.5), 0.10), ('hero', ('E', 0), 0.10)], 2.0, 1.2),
 ('shimmer', 's2', ('L', 3, 0), 's2', ('E', 0), [('s2', ('L', 3, 0), 0.0), ('s2', ('L', 5, 0), 0.12), ('s2', ('E', 0), 0.06)], 1.5, 1.5),
 ('shimmer', 's11', ('T', 0.5), 's11', ('E', 0), [('s11', ('T', 0.5), 0.0), ('s11', ('T', 6), 0.10), ('s11', ('E', 0), 0.06)], 1.5, 2.0),
 ('wind',   'recap', ('T', 0), 'src', ('T', 3.0), [('recap', ('T', 0), 0.0), ('recap', ('T', 4), 0.10), ('src', ('T', 0.3), 0.0)], 1.5, 2.5),
]
MUSIC_SPEC = [('hero', 1), ('ch1', 1), ('s1', 2), ('s2', 4), ('s3', 0), ('s4', 3), ('ch3', 5), ('s5', 5), ('s6', 1), ('s7', 3), ('s8', 2),
              ('ch5', 2), ('s9', 2), ('s10', 3), ('s11', 1), ('ch6', 4), ('ch7', 4), ('s13', 0), ('recap', 2), ('src', 0)]

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
