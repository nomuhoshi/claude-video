# -*- coding: utf-8 -*-
# Scene script for the copper / generator video. Timing is computed from the subtitle volume.
import math, random

TITLE = '牙医椅上，费曼想到了整座城市'
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
    ('想象世界真实的样子，', 0), ('有时，比幻想更有用。', 0), ('有一次费曼去看牙医，钻头嗡嗡响，', 0),
    ('怕疼，就赶紧想点别的。', 0), ('费曼想到了钻头里那个小马达。', 0)]),
 dict(key='ch1', k='chap', name='章节 · 牙医椅上', word='牙医椅上', en='THE DENTIST CHAIR', sub='钻头里的小马达',
      line='先躺回牙医椅上。'),
 dict(key='s1', k='c', name='第一幕 · 小马达', draw='d1', lines=[
    ('费曼盯着钻头里那个小马达：', 0), ('是什么，让它转起来的？', 0), ('有的钻头靠压缩空气转，', 0),
    ('这里说的，是电动的那种。', 0), ('它的电，是从哪来的？', 0)]),
 dict(key='ch2', k='chap', name='章节 · 大坝与铜线', word='大坝铜线', en='THE DAM AND THE WIRES', sub='一个轮子，转动全城',
      line='答案在不远处的大坝。'),
 dict(key='s2', k='c', name='第二幕 · 大坝', draw='d2', lines=[
    ('离这里不远，有一座大坝。', 0), ('水流过去，', 0), ('推着一个巨大的轮子转动。', 0),
    ('这个轮子，连着一根粗铜线。', 0)]),
 dict(key='s3', k='c', name='第三幕 · 铜线铺满城市', draw='d3', lines=[
    ('这根铜线分成更多铜线，', 0), ('再分成更多，', 0), ('一直铺满整个城市。', 0),
    ('每一根的末端，都连着一个小装置，', 0), ('让另一个小轮子转起来。', 0)]),
 dict(key='s4', k='c', name='第四幕 · 全城同转', draw='d4', lines=[
    ('于是，全城所有的轮子，', 0), ('都因为大坝那一个轮子在转。', 0), ('它一停，全城的轮子都停；', 0),
    ('它再转，全城的轮子又都转。', 0), ('牙医钻头里那个，也是其中之一。', 0)]),
 dict(key='ch3', k='chap', name='章节 · 只有铜和铁', word='铜和铁', en='COPPER AND IRON', sub='大自然的神奇',
      line='费曼最爱想的，是这件事。'),
 dict(key='s5', k='c', name='第五幕 · 只有铜和铁', draw='d5', lines=[
    ('费曼觉得，这是大自然最神奇的地方，', 0), ('因为这里面，只有铜和铁。', 0),
    ('我们常觉得，发电机很复杂，', 0), ('可它的核心，其实很简单。', 0)]),
 dict(key='s6', k='c', name='第六幕 · 铜环两端的铁块', draw='d6', lines=[
    ('拿一个又大又长的铜环，', 0), ('两端各放一块铁。', 0), ('这里的铁块，是磁铁或带电的铁芯。', 0),
    ('移动这一端的铁块，', 0), ('另一端的铁块，也会跟着动。', 0)]),
 dict(key='s7', k='c', name='第七幕 · 为什么会跟着动', draw='d7', lines=[
    ('这一端的铁块一动，铜环里就生出电流；', 0), ('电流跑到另一端，', 0), ('又去推那里的铁块。', 0),
    ('一端是发电机，另一端是马达。', 0)]),
 dict(key='s8', k='c', name='第八幕 · 连铁都不要', draw='d8', lines=[
    ('其实，连铁块都可以不要。', 0), ('在这一端，让铜线快速抖动，', 0), ('再绕一绕、解一解，', 0),
    ('远处另一端的铜线，也会跟着动。', 0), ('只有铜线，和铜线的运动。', 0)]),
 dict(key='ch4', k='chap', name='章节 · 有多快', word='有多快', en='HOW FAST', sub='另一端多久才动',
      line='这一端一动，另一端要等多久？'),
 dict(key='s9', k='c', name='第九幕 · 电的速度', draw='d9', lines=[
    ('这一端一动，另一端要等多久？', 0), ('几乎不用等。', 0), ('信号沿着导线传，', 0),
    ('大约是光速的一半到九成九。', 0), ('可导线里的电子自己，', 0), ('在 1 安电流、2 毫米粗的铜线里，', 0),
    ('每秒只漂移约 23 微米。', 0), ('传过去的，是电磁场的变化。', 0)]),
 dict(key='s10', k='c', name='第十幕 · 为什么是铜', draw='d10', lines=[
    ('为什么电线偏偏用铜？', 0), ('铜的导电性，数一数二，', 0), ('只略逊于银，', 0),
    ('可银贵得多。', 0), ('所以大约一半的铜，都拿去做了电线。', 0)]),
 dict(key='ch5', k='chap', name='章节 · 铜里会减速', word='铜里减速', en='A STRANGE DRAG', sub='铜不吸磁铁，却能拖住磁铁',
      line='铜还有一件怪事。'),
 dict(key='s11', k='c', name='第十一幕 · 铜管里的磁铁', draw='d11', lines=[
    ('拿一根铜管，一块强磁铁。', 0), ('铜，并不吸磁铁。', 0), ('可磁铁一松手，', 0),
    ('在管里，慢得出奇。', 0), ('像有只看不见的手，在拖着它。', 0)]),
 dict(key='s12', k='c', name='第十二幕 · 涡流', draw='d12', lines=[
    ('磁铁一动，铜管里就生出环形电流，', 0), ('这叫涡流。', 0), ('涡流自己，也是一块电磁铁，', 0),
    ('它的磁场，反过来推着磁铁。', 0), ('规律很简单：感应，总是反抗变化。', 0)]),
 dict(key='s13', k='c', name='第十三幕 · 力气换来的电', draw='d13', lines=[
    ('慢下来的动能，去哪了？', 0), ('变成了铜里的热。', 0), ('发电机也一样：', 0),
    ('多接几盏灯，就更难摇动。', 0), ('电，是用力气换来的。', 0)]),
 dict(key='ch6', k='chap', name='章节 · 同一件事', word='同一件事', en='ONE IDEA', sub='从钻头到整座城市',
      line='把它们串起来。'),
 dict(key='s14', k='c', name='第十四幕 · 一张三角', draw='d14', lines=[
    ('钻头里的小马达，大坝上的发电机，', 0), ('铜管里变慢的磁铁，', 0), ('讲的是同一件事：', 0),
    ('电流在磁场里受力，就转起来；', 0), ('线圈在磁场里转，就生出电；', 0), ('而生出来的电，总是反抗运动。', 0)]),
 dict(key='s15', k='c', name='第十五幕 · 一个念头', draw='d15', lines=[
    ('一个怕疼的念头，', 0), ('从小小的钻头，', 0), ('一路想到了整座城市。', 0),
    ('里面只有铜线，和铜线的运动。', 0), ('下次听见钻头响，', 0), ('不妨也想想铜。', 0)]),
 dict(key='recap', k='recap', name='回头看', lines=[
    ('电生出转动，是马达；', 0), ('转动生出电，是发电机。', 0),
    ('铜，让电走得顺，', 0), ('也让运动被“拖住”。', 0)], dur_min=9.5),
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
 ('hero', ('L', 2, 0.3), 'pop', None), ('hero', ('L', 3, 0.3), 'repel', None), ('hero', ('L', 4, 0.2), 'flash', None),
 ('s1', ('L', 1, 0.2), 'tick', 1.0), ('s1', ('L', 3, 0.3), 'ding', None),
 ('s2', ('L', 0, 0.3), 'thump', None), ('s2', ('L', 2, 0.2), 'whoosh', None),
 ('s3', ('L', 0, 0.2), 'pop', None), ('s3', ('L', 2, 0.2), 'whoosh', None), ('s3', ('L', 4, 0.2), 'ding', None),
 ('s4', ('L', 2, 0.2), 'hit', None), ('s4', ('L', 3, 0.2), 'flash', None), ('s4', ('L', 4, 0.3), 'soft', None),
 ('s5', ('L', 1, 0.2), 'pop', None), ('s5', ('L', 3, 0.2), 'ding', None),
 ('s6', ('L', 1, 0.2), 'pop', None), ('s6', ('L', 3, 0.2), 'tick', 1.0), ('s6', ('L', 4, 0.2), 'ding', None),
 ('s7', ('L', 0, 0.2), 'tick', 1.0), ('s7', ('L', 2, 0.2), 'whoosh', None), ('s7', ('L', 3, 0.3), 'soft', None),
 ('s8', ('L', 1, 0.2), 'tick', 1.0), ('s8', ('L', 3, 0.2), 'ding', None),
 ('s9', ('L', 1, 0.2), 'flash', None), ('s9', ('L', 3, 0.2), 'whoosh', None), ('s9', ('L', 6, 0.2), 'tick', 0.8), ('s9', ('L', 7, 0.3), 'soft', None),
 ('s10', ('L', 2, 0.2), 'pop', None), ('s10', ('L', 4, 0.2), 'thump', None),
 ('s11', ('L', 2, 0.2), 'whoosh', None), ('s11', ('L', 3, 0.3), 'soft', None), ('s11', ('L', 4, 0.2), 'repel', None),
 ('s12', ('L', 1, 0.2), 'pop', None), ('s12', ('L', 3, 0.2), 'repel', None), ('s12', ('L', 4, 0.3), 'ding', None),
 ('s13', ('L', 1, 0.2), 'hit', None), ('s13', ('L', 3, 0.2), 'thump', None), ('s13', ('L', 4, 0.3), 'soft', None),
 ('s14', ('L', 2, 0.2), 'pop', None), ('s14', ('L', 3, 0.2), 'tick', 1.0), ('s14', ('L', 5, 0.2), 'repel', None),
 ('s15', ('L', 2, 0.2), 'whoosh', None), ('s15', ('L', 3, 0.3), 'flash', None), ('s15', ('L', 5, 0.3), 'ding', None),
]
BED_SPEC = [
 ('wind',   'hero', ('T', 0), 'ch1', ('T', 0.3), [('hero', ('T', 0), 0.0), ('hero', ('T', 2.5), 0.10), ('hero', ('E', 0), 0.10)], 2.0, 1.2),
 ('shimmer', 's9', ('T', 0.5), 's9', ('E', 0), [('s9', ('T', 0.5), 0.0), ('s9', ('T', 6), 0.14), ('s9', ('E', 0), 0.08)], 1.5, 2.0),
 ('wind',   'recap', ('T', 0), 'src', ('T', 3.0), [('recap', ('T', 0), 0.0), ('recap', ('T', 4), 0.10), ('src', ('T', 0.3), 0.0)], 1.5, 2.5),
]
MUSIC_SPEC = [('hero', 1), ('ch1', 1), ('s1', 2), ('ch2', 4), ('s2', 4), ('s3', 1), ('s4', 3),
              ('ch3', 5), ('s5', 5), ('s6', 1), ('s7', 3), ('s8', 2), ('ch4', 0), ('s9', 0), ('s10', 3),
              ('ch5', 4), ('s11', 4), ('s12', 1), ('s13', 2), ('ch6', 0), ('s14', 0), ('s15', 3), ('recap', 2), ('src', 0)]

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
