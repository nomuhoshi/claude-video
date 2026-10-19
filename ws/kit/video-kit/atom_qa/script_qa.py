# -*- coding: utf-8 -*-
# Scene script for the classical-atom-collapse video. Timing is computed from the subtitle volume (no fixed 300 s).
import math, random

TITLE = '按经典物理，你早已不存在'
SPEED = 6.8        # chars per second for reading
LEAD = {'hero': 1.6, 'c': 0.8, 'recap': 0.4, 'src': 0.4}   # the picture shows first, the first subtitle comes a moment later (hero: one full bar)
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
    ('经典物理，曾经算出一个结论：', 0), ('原子，会在一瞬间塌掉。', 0),
    ('桌子、大地、你我，都会跟着消失。', 0), ('可你现在，还好好地在看视频。', 0),
    ('这个矛盾，逼出了一门新的物理。', 0)]),
 dict(key='ch1', k='chap', name='章节 · 原子长什么样', word='原子的样子', en='THE ATOM', sub='先看经典物理眼里的原子',
      line='先看看，经典物理眼里的原子。'),
 dict(key='s1', k='c', name='第一幕 · 小太阳系', draw='d1', lines=[
    ('一切物质，都是原子搭成的。', 0), ('原子中间，是个很小的原子核，', 0), ('外面，绕着很轻的电子。', 0),
    ('一个带正电，一个带负电，', 0), ('互相吸引，像地球被太阳吸引。', 0)]),
 dict(key='s2', k='c', name='第二幕 · 空与快', draw='d2', lines=[
    ('原子里，其实空得很。', 0), ('把原子放大成一座体育场，', 0), ('原子核，只有中央的一粒小米。', 0),
    ('电子绕着它，每秒转六千多万亿圈。', 0), ('这就是经典物理画出的原子。', 0)]),
 dict(key='ch2', k='chap', name='章节 · 麻烦来了', word='麻烦来了', en='THE TROUBLE', sub='电子会一直发光',
      line='麻烦，出在“转圈”上。'),
 dict(key='s3', k='c', name='第三幕 · 加速就辐射', draw='d3', lines=[
    ('带电的东西一加速，', 0), ('就会向外发出电磁波。', 0),
    ('手机、天线，靠的都是这个。', 0), ('电子绕圈，方向时刻在变，', 0), ('方向在变，就是在加速。', 0),
    ('所以电子会不停向外辐射能量。', 0)]),
 dict(key='s4', k='c', name='第四幕 · 螺旋下坠', draw='d4', lines=[
    ('电子每发出一点光，就少一点能量。', 0), ('能量少了，轨道就缩小。', 0),
    ('轨道小了，转得更快，', 0), ('辐射得更多，掉得更快。', 0),
    ('它只能一圈圈，螺旋着掉向原子核。', 0)]),
 dict(key='ch3', k='chap', name='章节 · 坍缩', word='一瞬间坍缩', en='THE COLLAPSE', sub='算一算要多久',
      line='那么，要多久？'),
 dict(key='s5', k='c', name='第五幕 · 算一算', draw='d5', lines=[
    ('拿最简单的氢原子算一算。', 0), ('电子从原子的大小，掉到核上，', 0),
    ('只要约六百多亿分之一秒。', 0), ('眨一次眼，够它塌几十亿次。', 0),
    ('（这是最简单的估算，量级没错。）', 0)]),
 dict(key='s6', k='c', name='第六幕 · 万物消失', draw='d6', lines=[
    ('一个原子塌了，不会只塌一个。', 0), ('你身体里，约有七千亿亿亿个原子。', 0),
    ('它们会在同一瞬间，全塌。', 0), ('桌子、大地、太阳，也一样。', 0),
    ('没有化学，没有生命，什么都不存在。', 0)]),
 dict(key='ch4', k='chap', name='章节 · 可是', word='可原子没塌', en='BUT IT STANDS', sub='事实和理论打架',
      line='可是，原子没有塌。'),
 dict(key='s7', k='c', name='第七幕 · 事实一：稳', draw='d7', lines=[
    ('事实，正好相反。', 0), ('氢原子，在宇宙里待了一百多亿年。', 0),
    ('预言和事实，差了二十八个数量级。', 0), ('理论说“必塌”，实验说“很稳”。', 0)]),
 dict(key='s8', k='c', name='第八幕 · 事实二：细线', draw='d8', lines=[
    ('还有一件事，也对不上。', 0), ('把氢原子发的光，用棱镜拆开，', 0),
    ('看到的不是连续的彩虹，', 0), ('而是几条分明的细线。', 0),
    ('螺旋坠落的电子，该发出连续变化的光。', 0), ('细线说明：电子只待在特定的“台阶”上。', 0)]),
 dict(key='ch5', k='chap', name='章节 · 先打补丁', word='先打个补丁', en='THE PATCH', sub='先硬性规定，再找原因',
      line='先打个补丁：干脆定规矩。'),
 dict(key='s9', k='c', name='第九幕 · 一个大胆的规定', draw='d9', lines=[
    ('第一个补丁，来自 1913 年。', 0), ('大胆规定：电子只能待在几条特定轨道上。', 0),
    ('待在轨道上，不辐射，就不会掉。', 0), ('只有从一条轨道跳到另一条，', 0),
    ('才放出或吸收一份光。', 0), ('用这条规定，算出了氢的那几条细线。', 0)]),
 dict(key='s10', k='c', name='第十幕 · 补丁的问题', draw='d10', lines=[
    ('可它只是“规定”，不是“解释”。', 0), ('为什么偏偏是这几条轨道？', 0),
    ('为什么待在轨道上，就不辐射？', 0), ('到了氦原子，这套规定就算不准了。', 0),
    ('需要一个更根本的新理论。', 0)]),
 dict(key='ch6', k='chap', name='章节 · 电子是波', word='电子是波', en='THE WAVE', sub='量子理论登场',
      line='新理论：电子，是一团波。'),
 dict(key='s11', k='c', name='第十一幕 · 驻波', draw='d11', lines=[
    ('1924 年，出现了一个新想法：', 0), ('电子，不只是小球，也像一团波。', 0),
    ('绕着核的波，要首尾相接，', 0), ('只能塞下整数个波长。', 0),
    ('于是，轨道自然只剩特定几条。', 0)]),
 dict(key='s12', k='c', name='第十二幕 · 为什么不坍缩', draw='d12', lines=[
    ('波，还回答了一个更大的问题：', 0), ('电子凭什么，不掉进原子核？', 0),
    ('想把电子压到核上，波就得挤得很窄。', 0), ('挤得越窄，它就越“躁动”，', 0),
    ('动能暴涨，把它往外顶。', 0), ('吸引和躁动，在约 0.05 纳米处打成平手。', 0),
    ('这正是氢原子的大小。', 0)]),
 dict(key='s13', k='c', name='第十三幕 · 泡利规矩', draw='d13', lines=[
    ('电子还有一条规矩：', 0), ('两个电子，不能占同一个状态。', 0),
    ('所以，它们只能一层层往外排。', 0), ('排出了原子的“壳层”，', 0),
    ('也排出了元素周期表。', 0), ('物质占得住空间，椅子才坐得住。', 0),
    ('数学上严格证明这一点，晚到 1967 年。', 0)]),
 dict(key='recap', k='recap', name='回头看', lines=[
    ('经典物理，算出原子必塌。', 0), ('事实偏不塌，逼出了量子理论。', 0),
    ('电子，不是小球，是一团波。', 0)], dur_min=9.5),
 dict(key='src', k='src', name='资料来源', lines=[('内容整理自公开的物理文献。', 0)], dur_min=8.0),
]

MUSIC_FILE = 'entropy.mp3'     # Entropy - Original: constant 150 BPM, F minor, 4/4
BEAT0 = 1.175                  # time of the first beat (bar 0 of the track) in seconds
BEAT = 0.4
BAR = BEAT * 4
TRANSPOSE = -6                 # synth layer: D major -> Ab major (relative of F minor)
MUS = dict(beat0=BEAT0, bar=BAR, tr=TRANSPOSE)
BAR_KEYS = ('s1', 'ch3', 'ch5', 'ch6', 'recap')   # scenes that must start on a bar line (groove enters / breakdown / drop / outro)
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

# ---- sound cues written by hand ([scene key, anchor, name, arg]) ----
CUE_SPEC = [
 ('hero', ('L', 1, 1.2), 'flash', None), ('hero', ('L', 3, 0.2), 'soft', None),
 ('s1', ('L', 1, 0.2), 'pop', None), ('s1', ('L', 3, 0.15), 'ding', None), ('s1', ('L', 4, 0.3), 'soft', None),
 ('s2', ('L', 2, 0.2), 'pop', None), ('s2', ('L', 3, 0.2), 'tick', 1.0),
 ('s3', ('L', 1, 0.3), 'ding', None), ('s3', ('L', 3, 0.2), 'soft', None), ('s3', ('L', 5, 0.3), 'whoosh', None),
 ('s4', ('L', 2, 0.2), 'soft', None), ('s4', ('L', 4, 0.5), 'whoosh', None),
 ('s5', ('L', 2, 0.2), 'hit', None), ('s5', ('L', 3, 0.2), 'tick', 1.0),
 ('s6', ('L', 2, 0.1), 'flash', None), ('s6', ('L', 4, 0.5), 'thump', None),
 ('s7', ('L', 2, 0.2), 'ding', None), ('s7', ('L', 3, 0.3), 'soft', None),
 ('s8', ('L', 3, 0.2), 'pop', None), ('s8', ('L', 5, 0.2), 'ding', None),
 ('s9', ('L', 3, 0.3), 'whoosh', None), ('s9', ('L', 5, 0.2), 'ding', None),
 ('s10', ('L', 3, 0.2), 'repel', None),
 ('s11', ('L', 2, 0.2), 'soft', None), ('s11', ('L', 4, 0.3), 'ding', None),
 ('s12', ('L', 4, 0.1), 'thump', None), ('s12', ('L', 5, 0.3), 'ding', None),
 ('s13', ('L', 1, 0.3), 'repel', None), ('s13', ('L', 4, 0.2), 'pop', None), ('s13', ('L', 6, 0.2), 'soft', None),
]
BED_SPEC = [
 ('wind',   'hero', ('T', 0), 'ch1', ('T', 0.3), [('hero', ('T', 0), 0.0), ('hero', ('T', 2.5), 0.10), ('hero', ('E', 0), 0.10)], 2.0, 1.2),
 ('shimmer', 's9', ('T', 0.5), 's10', ('E', 0), [('s9', ('T', 0.5), 0.0), ('s9', ('T', 6), 0.14), ('s10', ('E', 0), 0.08)], 1.5, 2.0),
 ('wind',   'recap', ('T', 0), 'src', ('T', 3.0), [('recap', ('T', 0), 0.0), ('recap', ('T', 4), 0.10), ('src', ('T', 0.3), 0.0)], 1.5, 2.5),
]
# chord per scene (index into the engine's chord table): 0 Dadd9, 1 Bm9, 2 Gmaj9, 3 Asus2, 4 F#m9, 5 Emadd9
MUSIC_SPEC = [('hero', 1), ('ch1', 1), ('s1', 2), ('s2', 0), ('ch2', 4), ('s3', 4), ('s4', 1), ('ch3', 5), ('s5', 5), ('s6', 1),
              ('ch4', 2), ('s7', 2), ('s8', 0), ('ch5', 4), ('s9', 4), ('s10', 1), ('ch6', 0), ('s11', 0), ('s12', 3), ('s13', 2), ('recap', 2), ('src', 0)]

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
