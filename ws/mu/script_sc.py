# -*- coding: utf-8 -*-
# Scene script for the "what is a semiconductor" video. Timing is computed from the subtitle volume.
import math, random

TITLE = '沙子，怎么变成了芯片？'
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
    ('手机、电脑、汽车、AI……', 0), ('它们的“大脑”，都靠同一种材料。', 0),
    ('这种材料，叫半导体。', 0), ('可它到底是什么？', 0), ('为什么沙子，能变成芯片？', 0)]),
 dict(key='ch1', k='chap', name='章节 · 三种材料', word='三种材料', en='THREE KINDS', sub='导体、绝缘体、半导体',
      line='先分清三种材料。'),
 dict(key='s1', k='c', name='第一幕 · 夹在中间', draw='d1', lines=[
    ('金属，电流很容易通过，叫导体。', 0), ('橡胶、玻璃，几乎不通电，叫绝缘体。', 0),
    ('半导体，正好夹在中间。', 0), ('它有时导电，有时不导电，', 0), ('而且这个“有时”，我们能控制。', 0)]),
 dict(key='s2', k='c', name='第二幕 · 能控制才有用', draw='d2', lines=[
    ('能控制，就有大用处。', 0), ('导电，当作“1”；', 0), ('不导电，当作“0”。', 0),
    ('一个能自己开关的东西，', 0), ('就能用来记录和计算。', 0)]),
 dict(key='ch2', k='chap', name='章节 · 电子的楼层', word='电子的楼层', en='ENERGY BANDS', sub='为什么差这么多',
      line='为什么三种材料，差这么多？'),
 dict(key='s3', k='c', name='第三幕 · 能带', draw='d3', lines=[
    ('固体里的电子，不能随便站。', 0), ('能量像楼层，只有几层能站。', 0),
    ('下面住满的那层，叫价带；', 0), ('上面空着的那层，叫导带。', 0), ('两层之间的空档，叫带隙。', 0)]),
 dict(key='s4', k='c', name='第四幕 · 三种楼层图', draw='d4', lines=[
    ('导体：楼层没住满，电子一抬脚就能动。', 0), ('绝缘体：空档很宽，电子上不去。', 0),
    ('半导体：空档很窄，', 0), ('给点能量，电子就跳上去了。', 0), ('硅约 1.1 电子伏，金刚石约 5.5。', 0)]),
 dict(key='s5', k='c', name='第五幕 · 空穴', draw='d5', lines=[
    ('电子跳走后，原位留下一个空位，', 0), ('叫空穴。', 0), ('邻居电子过来填，空位就换了地方。', 0),
    ('看上去，像一个正电荷在移动。', 0), ('温度越高，跳上去的电子越多，', 0),
    ('所以半导体越热，越能导电，', 0), ('金属，恰恰相反。', 0)]),
 dict(key='ch3', k='chap', name='章节 · 掺杂', word='掺点杂质', en='DOPING', sub='一点点，就能改变性格',
      line='纯硅还不够，要掺点杂质。'),
 dict(key='s6', k='c', name='第六幕 · N 型', draw='d6', lines=[
    ('纯净的硅，导电能力很差。', 0), ('每个硅原子，都和四个邻居手拉手，', 0), ('电子被牢牢占住。', 0),
    ('掺进一点磷，磷多一个电子，', 0), ('这个多出来的，可以到处跑。', 0), ('这叫 N 型半导体。', 0)]),
 dict(key='s7', k='c', name='第七幕 · P 型', draw='d7', lines=[
    ('换成硼，硼少一个电子，', 0), ('晶格里就多出一个空位。', 0), ('邻居来填，空位又换了地方，', 0),
    ('等于一个正电荷在跑。', 0), ('这叫 P 型半导体。', 0), ('轻掺杂，约一亿个硅原子掺一个。', 0)]),
 dict(key='ch4', k='chap', name='章节 · PN 结', word='拼在一起', en='THE P-N JUNCTION', sub='最简单的半导体器件',
      line='把 P 型和 N 型，拼在一起。'),
 dict(key='s8', k='c', name='第八幕 · 交界处', draw='d8', lines=[
    ('P 型和 N 型一碰面，', 0), ('N 边的电子，跑去填 P 边的空位。', 0), ('交界处的电荷互相抵消，', 0),
    ('形成一层几乎没有自由电荷的区域。', 0), ('这层区域里有电场，', 0), ('会挡住后面的电子继续过来。', 0)]),
 dict(key='s9', k='c', name='第九幕 · 二极管', draw='d9', lines=[
    ('接上电池，方向对了，', 0), ('这层区域变薄，电流顺利通过。', 0), ('方向反了，这层变厚，', 0),
    ('电流几乎过不去。', 0), ('电流只能单向走，这就是二极管。', 0), ('LED 灯、太阳能电池，也靠它。', 0)]),
 dict(key='ch5', k='chap', name='章节 · 晶体管', word='晶体管', en='THE TRANSISTOR', sub='一个小开关，撑起数字世界',
      line='再往前一步：晶体管。'),
 dict(key='s10', k='c', name='第十幕 · 电压开关', draw='d10', lines=[
    ('晶体管，是个用电压控制的开关。', 0), ('左边叫源极，右边叫漏极，', 0), ('中间隔着一段不导电的硅。', 0),
    ('上面的栅极，一加电压，', 0), ('电场把电子吸到表面，', 0), ('连成一条通道，电流就通了。', 0),
    ('撤掉电压，通道消失，电流就停。', 0)]),
 dict(key='s11', k='c', name='第十一幕 · 开关变逻辑', draw='d11', lines=[
    ('开，是 1；关，是 0。', 0), ('两个开关串起来，', 0), ('要两个都开，灯才亮，这叫“与”。', 0),
    ('几个开关这样接，', 0), ('就能算加法、存数据，', 0), ('再堆下去，就是整台电脑。', 0)]),
 dict(key='s12', k='c', name='第十二幕 · 数量', draw='d12', lines=[
    ('1971 年，一颗芯片有两千多个晶体管。', 0), ('2023 年的手机芯片，有一百九十亿个。', 0),
    ('涨了八百多万倍。', 0), ('这背后，是一代代不停地缩小。', 0)]),
 dict(key='ch6', k='chap', name='章节 · 沙子变芯片', word='沙子变芯片', en='SAND TO CHIP', sub='最后一站：怎么造',
      line='最后，沙子怎么变成芯片？'),
 dict(key='s13', k='c', name='第十三幕 · 提纯', draw='d13', lines=[
    ('沙子的主要成分，是二氧化硅。', 0), ('加碳，在两千度的高温炉里，', 0), ('抢走氧，得到纯度约 98% 的硅。', 0),
    ('再变成气体，反复蒸馏提纯，', 0), ('最后纯到九个九：99.9999999%。', 0)]),
 dict(key='s14', k='c', name='第十四幕 · 晶圆', draw='d14', lines=[
    ('纯硅熔化，慢慢拉成一根单晶硅棒，', 0), ('切成薄片，叫晶圆。', 0), ('再在晶圆上掺杂，刻上电路，', 0),
    ('一层层叠出上百亿个开关。', 0)]),
 dict(key='recap', k='recap', name='回头看', lines=[
    ('半导体，导电能力在中间，', 0), ('掺一点杂质，就能调它。', 0),
    ('拼成结，做成开关，', 0), ('就有了芯片。', 0)], dur_min=9.5),
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
 ('hero', ('L', 2, 0.3), 'flash', None), ('hero', ('L', 4, 0.2), 'soft', None),
 ('s1', ('L', 0, 0.3), 'ding', None), ('s1', ('L', 2, 0.2), 'pop', None), ('s1', ('L', 4, 0.3), 'soft', None),
 ('s2', ('L', 1, 0.2), 'tick', 1.0), ('s2', ('L', 2, 0.2), 'tick', 0.8), ('s2', ('L', 4, 0.3), 'ding', None),
 ('s3', ('L', 2, 0.2), 'pop', None), ('s3', ('L', 3, 0.2), 'pop', None), ('s3', ('L', 4, 0.3), 'ding', None),
 ('s4', ('L', 2, 0.2), 'whoosh', None), ('s4', ('L', 3, 0.3), 'ding', None), ('s4', ('L', 4, 0.3), 'soft', None),
 ('s5', ('L', 1, 0.2), 'pop', None), ('s5', ('L', 2, 0.2), 'soft', None), ('s5', ('L', 5, 0.3), 'whoosh', None),
 ('s6', ('L', 3, 0.2), 'pop', None), ('s6', ('L', 5, 0.3), 'ding', None),
 ('s7', ('L', 1, 0.2), 'pop', None), ('s7', ('L', 4, 0.3), 'ding', None),
 ('s8', ('L', 1, 0.3), 'whoosh', None), ('s8', ('L', 3, 0.2), 'hit', None), ('s8', ('L', 5, 0.2), 'repel', None),
 ('s9', ('L', 1, 0.2), 'ding', None), ('s9', ('L', 3, 0.2), 'repel', None), ('s9', ('L', 5, 0.3), 'soft', None),
 ('s10', ('L', 3, 0.2), 'hit', None), ('s10', ('L', 5, 0.2), 'whoosh', None), ('s10', ('L', 6, 0.3), 'soft', None),
 ('s11', ('L', 0, 0.3), 'tick', 1.0), ('s11', ('L', 2, 0.3), 'ding', None), ('s11', ('L', 5, 0.3), 'thump', None),
 ('s12', ('L', 1, 0.2), 'hit', None), ('s12', ('L', 2, 0.2), 'thump', None),
 ('s13', ('L', 1, 0.2), 'whoosh', None), ('s13', ('L', 2, 0.3), 'flash', None), ('s13', ('L', 4, 0.3), 'ding', None),
 ('s14', ('L', 1, 0.2), 'pop', None), ('s14', ('L', 3, 0.3), 'thump', None),
]
BED_SPEC = [
 ('wind',   'hero', ('T', 0), 'ch1', ('T', 0.3), [('hero', ('T', 0), 0.0), ('hero', ('T', 2.5), 0.10), ('hero', ('E', 0), 0.10)], 2.0, 1.2),
 ('shimmer', 's12', ('T', 0.5), 's12', ('E', 0), [('s12', ('T', 0.5), 0.0), ('s12', ('T', 6), 0.14), ('s12', ('E', 0), 0.08)], 1.5, 2.0),
 ('wind',   'recap', ('T', 0), 'src', ('T', 3.0), [('recap', ('T', 0), 0.0), ('recap', ('T', 4), 0.10), ('src', ('T', 0.3), 0.0)], 1.5, 2.5),
]
MUSIC_SPEC = [('hero', 1), ('ch1', 1), ('s1', 2), ('s2', 0), ('ch2', 4), ('s3', 4), ('s4', 1), ('s5', 3), ('ch3', 5), ('s6', 5), ('s7', 1),
              ('ch4', 2), ('s8', 2), ('s9', 0), ('ch5', 4), ('s10', 4), ('s11', 1), ('s12', 3), ('ch6', 0), ('s13', 0), ('s14', 3), ('recap', 2), ('src', 0)]

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
