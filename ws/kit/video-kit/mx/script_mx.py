# -*- coding: utf-8 -*-
# Scene script for the Maxwell biography. Timing is computed from the subtitle volume.
import math, random

TITLE = '麦克斯韦：光是电磁波'
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
 dict(key='hero', k='hero', name='开场', draw='m0', lines=[
    ('你现在看的这段视频，', 0), ('正穿过空气，来到你的手机。', 0), ('这种看不见的波，', 0),
    ('是一个人先用笔算出来的。', 0), ('比人类第一次抓到它，早了二十多年。', 0)]),
 dict(key='ch1', k='chap', name='章节 · 好奇', word='好奇', line='他的故事，从一个问题开始。'),
 dict(key='s1', k='c', name='第一幕 · 乡下的孩子', draw='m1', lines=[
    ('1831 年，詹姆斯·克拉克·麦克斯韦出生在苏格兰爱丁堡。', 0), ('就在这一年，法拉第发现了电磁感应。', 0),
    ('他在乡下的庄园格伦莱尔长大，', 0), ('看到什么都要追着问：', 0), ('“这东西，到底是怎么动的？”', 0)]),
 dict(key='s2', k='c', name='第二幕 · 傻子', draw='m2', lines=[
    ('8 岁那年，母亲病逝。', 0), ('10 岁，他被送进爱丁堡的一所中学，', 0),
    ('穿着乡下的衣服，说话带着口音，', 0), ('同学们叫他“傻子”。', 0), ('可没过几年，他就成了数学最好的学生之一。', 0)]),
 dict(key='s3', k='c', name='第三幕 · 14 岁的论文', draw='m3', lines=[
    ('14 岁，他想出一种画卵形曲线的新办法：', 0), ('两颗钉子，一根线，', 0), ('线在钉子上多绕几圈，', 0),
    ('就能画出各种各样的卵形。', 0), ('这篇论文在爱丁堡皇家学会上宣读，', 0), ('他太年轻，只能由教授替他上台念。', 0)]),
 dict(key='ch2', k='chap', name='章节 · 颜色与土星', word='颜色与土星', line='他什么都想弄明白。'),
 dict(key='s4', k='c', name='第四幕 · 三种颜色', draw='m4', lines=[
    ('19 岁，他去了剑桥，', 0), ('毕业考试考了全年级第二。', 0), ('他好奇：人的眼睛，是怎么看到颜色的？', 0),
    ('他做了一个彩色陀螺：', 0), ('红、绿、蓝三块色片按比例拼在一起，', 0), ('一转，就混出了别的颜色。', 0)]),
 dict(key='s5', k='c', name='第五幕 · 第一张彩色照片', draw='m5', lines=[
    ('1861 年，他用这个道理，', 0), ('和一位摄影师一起，拍下了世界上第一张彩色照片：', 0), ('一条格子呢缎带。', 0),
    ('红、绿、蓝滤镜各拍一张，', 0), ('三张叠着投到幕布上，颜色就回来了。', 0), ('今天你屏幕上的每个像素，也是这三种颜色。', 0)]),
 dict(key='s6', k='c', name='第六幕 · 土星环', draw='m6', lines=[
    ('剑桥还出过一道悬赏题：', 0), ('土星环为什么能稳稳地转，不散架？', 0), ('如果是一整块实心的环，它会失去平衡，撞向土星；', 0),
    ('如果是液体，会碎成一团一团。', 0), ('他算出：土星环只能是无数颗小颗粒，', 0), ('各自绕着土星转。', 0),
    ('后来的观测，证实了他是对的。', 0)]),
 dict(key='ch3', k='chap', name='章节 · 力线', word='力线', line='他接过了法拉第的力线。'),
 dict(key='s7', k='c', name='第七幕 · 教授', draw='m7', lines=[
    ('25 岁，他成了阿伯丁一所大学的教授，', 0), ('娶了院长的女儿凯瑟琳。', 0),
    ('几年后学校合并，他丢了工作。', 0), ('1860 年，他来到伦敦的国王学院。', 0)]),
 dict(key='s8', k='c', name='第八幕 · 两代人', draw='m8', lines=[
    ('在这之前，他已经把法拉第的“力线”写成了数学，', 0), ('寄给了法拉第。', 0),
    ('65 岁的法拉第回信说：“我起初几乎吓了一跳。”', 0), ('在伦敦，两人见了面。', 0),
    ('一个几乎不用方程，一个满脑子方程，', 0), ('却成了一生的朋友。', 0)]),
 dict(key='s9', k='c', name='第九幕 · 涡旋和滚珠', draw='m9', lines=[
    ('1861 年，他给力线搭了一个“机械模型”：', 0), ('空间里塞满了会旋转的小涡旋，', 0),
    ('涡旋之间，夹着一颗颗小滚珠。', 0), ('滚珠一动，就是电流；', 0), ('涡旋一转，就是磁场。', 0),
    ('模型很古怪，却带出了一个关键的新想法。', 0)]),
 dict(key='ch4', k='chap', name='章节 · 光', word='光', line='光，到底是什么？'),
 dict(key='s10', k='c', dur_min=18.7, name='第十幕 · 空着的缝', draw='m10', lines=[
    ('给电容器充电时，导线里有电流，', 0), ('可两块金属板之间是空的，', 0), ('电流在这里断了。', 0),
    ('麦克斯韦说：这里虽然没有电荷在流，', 0), ('电场却在变强。', 0), ('变化的电场，也能像电流一样，在周围产生磁场。', 0)]),
 dict(key='s11', k='c', dur_min=20.0, name='第十一幕 · 一环扣一环', draw='m11', lines=[
    ('把两件事放在一起：', 0), ('变化的磁场，产生电场——这是法拉第发现的；', 0),
    ('变化的电场，产生磁场——这是麦克斯韦补上的。', 0), ('电生磁，磁生电，一环扣一环，', 0),
    ('不需要导线，自己就往前跑了出去。', 0), ('这就是电磁波。', 0)]),
 dict(key='s12', k='c', name='第十二幕 · 算出光速', draw='m12', lines=[
    ('它跑多快？', 0), ('他用实验室里测出的两个电学常数，算了一下：', 0), ('每秒约 31 万公里。', 0),
    ('当时测得的光速：每秒约 31.5 万公里。', 0), ('几乎一模一样。', 0), ('他写道：我们几乎无法回避这个结论——', 0),
    ('光，就是电和磁的波动。', 0)]),
 dict(key='ch5', k='chap', name='章节 · 四个方程', word='四个方程', line='所有的电和磁，写在一页纸上。'),
 dict(key='s13', k='c', name='第十三幕 · 1865', draw='m13', lines=[
    ('1865 年，他发表了《电磁场的动力学理论》。', 0), ('最初写了二十个方程，', 0),
    ('后来人用更简洁的写法，缩成了四个。', 0), ('这四个方程，各说了一件事。', 0)]),
 dict(key='s14', k='c', dur_min=11.3, name='第十四幕 · 第一个方程', draw='m14', lines=[
    ('第一：电荷会向四周发出电场线，', 0), ('电荷越多，穿出来的线越多。', 0)]),
 dict(key='s15', k='c', dur_min=11.3, name='第十五幕 · 第二个方程', draw='m15', lines=[
    ('第二：磁感线没有起点，也没有终点，', 0), ('总是绕成闭合的圈。', 0),
    ('所以把磁铁切成两半，每一半还是有 N 极和 S 极。', 0)]),
 dict(key='s16', k='c', dur_min=10.7, name='第十六幕 · 第三个方程', draw='m16', lines=[
    ('第三：变化的磁场，会在周围产生绕着它转的电场。', 0), ('这就是法拉第的电磁感应。', 0)]),
 dict(key='s17', k='c', dur_min=11.3, name='第十七幕 · 第四个方程', draw='m17', lines=[
    ('第四：电流会在周围产生绕着它转的磁场，', 0), ('变化的电场也会。', 0), ('后半句，就是麦克斯韦自己的补充。', 0)]),
 dict(key='s18', k='c', name='第十八幕 · 光谱', draw='m18', lines=[
    ('四个方程，讲清了电、磁和光。', 0), ('光，只是电磁波里，眼睛看得见的一小段。', 0),
    ('比它波长更长的，是红外线、微波、无线电波；', 0), ('更短的，是紫外线、X 射线、伽马射线。', 0)]),
 dict(key='ch6', k='chap', name='章节 · 小妖', word='小妖', line='他还算过一瓶空气。'),
 dict(key='s19', k='c', name='第十九幕 · 一瓶空气', draw='m19', lines=[
    ('一瓶空气里，有数不清的分子在乱飞。', 0), ('他不去追每一个分子，', 0),
    ('而是算出了它们速度的分布：多少快，多少慢。', 0), ('这是物理学最早用上统计规律的成果之一。', 0)]),
 dict(key='s20', k='c', name='第二十幕 · 麦克斯韦妖', draw='m20', lines=[
    ('他还想象了一个小家伙，', 0), ('守在两个房间之间的小门边，', 0), ('只放快的分子过去，慢的留下。', 0),
    ('一边越来越热，一边越来越冷，', 0), ('好像不费力气，就违反了热力学定律。', 0),
    ('后来人叫它“麦克斯韦妖”，争论了一百多年。', 0)]),
 dict(key='ch7', k='chap', name='章节 · 身后', word='身后', line='他没能看到那一天。'),
 dict(key='s21', k='c', name='第二十一幕 · 实验室', draw='m21', lines=[
    ('1865 年，他辞职回到格伦莱尔，', 0), ('写成了厚厚的《电磁通论》。', 0),
    ('1871 年，剑桥请他筹建一座新的实验室：', 0), ('卡文迪许实验室。', 0), ('后来，这里走出了几十位诺贝尔奖得主。', 0)]),
 dict(key='s22', k='c', name='第二十二幕 · 48 岁', draw='m22', lines=[
    ('1879 年，他病倒了。', 0), ('和母亲一样的病，', 0), ('也和母亲一样，在 48 岁离开。', 0), ('同一年，爱因斯坦出生。', 0)]),
 dict(key='s23', k='c', name='第二十三幕 · 赫兹', draw='m23', lines=[
    ('他去世八年后，德国的赫兹，', 0), ('用电火花发出了电磁波，', 0), ('又在房间另一头收到了它。', 0),
    ('它会反射、会折射，就像光一样。', 0), ('有人问赫兹，这有什么用？', 0), ('他说：没什么用。', 0)]),
 dict(key='s24', k='c', name='第二十四幕 · 今天', draw='m24', lines=[
    ('没过几年，无线电报出现了。', 0), ('今天的广播、电视、手机、Wi-Fi、卫星导航，', 0),
    ('都建立在这几个方程上。', 0), ('爱因斯坦说：', 0), ('一个科学时代随麦克斯韦结束，另一个随他开始。', 0)]),
 dict(key='s25', k='c', name='第二十五幕 · 一万年后', draw='m25', lines=[
    ('费曼说：从一万年后回头看，', 0), ('19 世纪最重要的事件，', 0), ('会是麦克斯韦发现了电动力学的定律。', 0)]),
 dict(key='recap', k='recap', name='回顾', lines=[
    ('一个总在问“怎么动”的孩子；', 0), ('颜色、土星环、气体，都被他算清楚；', 0),
    ('他把力线写成方程，', 0), ('方程告诉我们：光，就是电磁波。', 0)]),
 dict(key='src', k='src', name='资料来源', lines=[('内容整理自公开的史料和资料。', 0)]),
]

CUE_SPEC = []                 # every sound now lives in sfx_cues.py
BED_SPEC = []
MUSIC_SPEC = []
MUSIC_FILE = 'mx_bed.mp3'      # pre-mixed bed: Entropy (opening) + The New York Nightfall + The Awakening
BEAT0 = 0.0
BEAT = 0.6666718
BAR = BEAT * 4
TRANSPOSE = 0
MUS = dict(beat0=BEAT0, bar=BAR, tr=TRANSPOSE)
BAR_KEYS = ('s1', 'ch3', 'ch5', 'ch6', 'recap')
def qc(x, u): return math.ceil(x / u - 1e-9) * u

BEAT_E = 0.4                   # Entropy (150 BPM) grid for the opening section
I_CH3 = [i for i, sc in enumerate(SC) if sc['key'] == 'ch3'][0]
def beat_of(i): return BEAT_E if i < I_CH3 else BEAT
def timeline():
    raw = []
    lines = []
    t = 0.0
    for i, sc in enumerate(SC):
        ls = []; B_ = beat_of(i)
        if sc['k'] == 'chap':
            dur = CHAP_DUR
            ls = [0.45]
            L = [(0.45, 2.5, sc['line'])]
        else:
            kind = 'hero' if sc['k'] == 'hero' else ('c' if sc['k'] == 'c' else sc['k'])
            cur = LEAD[kind]; L = []
            for text, hold in sc['lines']:
                d = max(2.0, 0.55 + n_chars(text) / SPEED, hold)
                d = max(B_ * 3 if B_ > 0.5 else B_ * 5, math.ceil((d - 0.2) / B_ - 1e-9) * B_)   # every subtitle change lands on a beat
                cur = qc(cur, B_)
                ls.append(cur); L.append((cur, cur + d - GAP, text))
                cur += d
            dur = cur + TAIL[kind]
            if 'dur_min' in sc:
                dur = max(dur, sc['dur_min'])
        raw.append((dur, ls, L))
    out = []
    for i, sc in enumerate(SC):
        dur, ls, L = raw[i]
        e = qc(t + dur, beat_of(i))                              # every scene change lands on a beat
        if i + 1 == I_CH3:
            e = qc(e, 8.0)                                       # the hand-over lands on a shared downbeat of both grids
        elif i + 1 < len(SC) and SC[i + 1]['key'] in BAR_KEYS:  # key changes land on a bar line
            e = qc(e, 4 * beat_of(i + 1))
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
    import sfx_mx; cues += sfx_mx.cues()
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
