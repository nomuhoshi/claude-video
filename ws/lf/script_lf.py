# -*- coding: utf-8 -*-
# Scene script: what limits human lifespan, and where longevity research stands in 2026.
import math

TITLE = '2026 年，人类离长寿还有多远'
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
 dict(key='hero', k='hero', name='开场', draw='l0', lines=[
    ('2026 年，一种让细胞“变年轻”的疗法，', 0), ('第一次在正式临床试验里，用到了人身上。', 0),
    ('人的寿命，到底被什么卡住了？', 0), ('科学家现在走到了哪一步？', 0)]),
 dict(key='ch1', k='chap', name='章节 · 天花板', word='天花板', line='先看看天花板在哪。'),
 dict(key='s1', k='c', name='第一幕 · 122 岁', draw='l1', lines=[
    ('有可靠记录的最长寿命，是 122 岁：', 0), ('法国的雅娜·卡尔芒，1997 年去世。', 0),
    ('将近三十年过去，没有人超过她。', 0), ('一百多年里，全球平均寿命翻了一倍还多，', 0),
    ('可最长寿命这条线，近三十年几乎停住了。', 0)]),
 dict(key='s2', k='c', dur_min=17.5, name='第二幕 · 每 8 年翻一倍', draw='l2', lines=[
    ('1825 年，英国精算师冈珀茨发现了一条规律：', 0), ('成年以后，一年内死亡的概率，', 0),
    ('大约每 8 年翻一倍。', 0), ('30 岁时，大约千分之一；', 0), ('到 100 岁，大约三分之一。', 0),
    ('翻倍，再翻倍，曲线越来越陡。', 0)]),
 dict(key='s3', k='c', name='第三幕 · 恢复力', draw='l3', lines=[
    ('2016 年《自然》上的一项统计认为，', 0), ('人类最长寿命大约在 115 岁附近封顶。', 0),
    ('2021 年的另一项研究换了个角度：', 0), ('看身体被打乱以后，多久能恢复。', 0),
    ('年纪越大，恢复得越慢；', 0), ('按趋势推算，到 120 到 150 岁，恢复力会耗尽。', 0)]),
 dict(key='ch2', k='chap', name='章节 · 为什么会老', word='为什么会老', line='身体，为什么越修越差？'),
 dict(key='s4', k='c', name='第四幕 · 修不干净', draw='l4', lines=[
    ('你的细胞每天都在出错：', 0), ('DNA 断了，蛋白质折错了，线粒体累了。', 0),
    ('身体一直在修，但修不干净。', 0), ('2023 年，一篇权威综述', 0), ('把衰老的根源归成了 12 类。', 0),
    ('大致可以分成三层：', 0), ('零件坏了，说明书乱了，系统失控了。', 0)]),
 dict(key='s5', k='c', name='第五幕 · 零件', draw='l5', lines=[
    ('先看零件。', 0), ('2022 年，科学家比较了 16 种哺乳动物：', 0), ('小鼠的细胞，每年积累的 DNA 突变，', 0),
    ('是人的十几倍。', 0), ('可到了各自寿命的终点，', 0), ('两者积累的突变总数，却相差不大。', 0),
    ('活得越久的物种，突变攒得越慢。', 0)]),
 dict(key='s6', k='c', name='第六幕 · 说明书', draw='l6', lines=[
    ('再看说明书。你全身的细胞，DNA 几乎一样，', 0), ('区别在于哪些基因打开、哪些关上。', 0),
    ('这些开关上的化学标记，叫表观遗传。', 0), ('年纪越大，标记越乱，', 0),
    ('细胞慢慢忘了自己该干什么。', 0), ('科学家甚至能用这些标记，算出一个人的“生物年龄”。', 0)]),
 dict(key='s7', k='c', name='第七幕 · 系统', draw='l7', lines=[
    ('最后是系统。有些细胞老了，不死，也不干活，', 0), ('叫衰老细胞。', 0),
    ('它们不停往外放炎症信号，拖累周围的细胞。', 0), ('负责补充新细胞的干细胞，', 0),
    ('也越来越少，越来越慢。', 0)]),
 dict(key='ch3', k='chap', name='章节 · 物理限制', word='物理限制', line='衰老，是物理定律吗？'),
 dict(key='s8', k='c', dur_min=18.0, name='第八幕 · 熵', draw='l8', lines=[
    ('常听人说：衰老是熵增，谁也躲不掉。', 0), ('可熵增说的是封闭系统。', 0),
    ('生命是开放的：吃进能量，就能把混乱排出去。', 0), ('证据就在你身上：', 0),
    ('从约 40 亿年前的第一批细胞开始，', 0), ('生命一代传一代，这条线从没断过。', 0),
    ('物理定律，并没有规定身体必须变老。', 0)]),
 dict(key='s9', k='c', name='第九幕 · 进化不管', draw='l9', lines=[
    ('那身体为什么不一直修下去？', 0), ('因为自然选择只看一件事：能不能把基因传下去。', 0),
    ('在野外，大多数动物还没老，就死于天敌、饥饿和疾病。', 0), ('到老年才出问题的基因，几乎不会被淘汰。', 0),
    ('修复要花能量，进化把更多能量押在了长大和繁殖上。', 0)]),
 dict(key='s10', k='c', name='第十幕 · 不同的动物', draw='l10', lines=[
    ('所以不同的物种，修得不一样好。', 0), ('弓头鲸，估计能活 200 多岁；', 0),
    ('格陵兰睡鲨，估计能活到约 400 岁；', 0), ('裸鼹鼠的死亡率，几乎不随年龄上升。', 0),
    ('衰老的快慢，是可以被基因改变的。', 0)]),
 dict(key='s11', k='c', name='第十一幕 · 大脑', draw='l11', lines=[
    ('但有一个零件特别难办：大脑。', 0), ('大脑皮层的神经元，几乎都和你一样大，', 0),
    ('出生后基本不再更新。', 0), ('它换不了，只能保养。', 0),
    ('所以最现实的目标，不是换掉身体，', 0), ('而是让整个身体，连同大脑，老得慢一点。', 0)]),
 dict(key='ch4', k='chap', name='章节 · 2026', word='2026', line='现在，我们走到了哪一步？'),
 dict(key='s12', k='c', name='第十二幕 · 变慢了', draw='l12', lines=[
    ('2024 年的一项研究发现：', 0), ('1990 年以后，最长寿的那些国家，', 0), ('平均寿命的增长明显变慢了。', 0),
    ('治好一种病，人往往会死于另一种和衰老有关的病。', 0), ('研究者的结论是：', 0),
    ('下一步，必须直接减缓衰老本身。', 0)]),
 dict(key='s13', k='c', name='第十三幕 · 已经证实的', draw='l13', lines=[
    ('先看已经在人身上证实的。', 0), ('一项追踪了十几万美国人的研究：', 0),
    ('50 岁时保持五个健康习惯，', 0), ('女性平均多活约 14 年，男性约 12 年。', 0),
    ('2023 年，一项两年的随机试验里，', 0), ('健康成年人少吃约 12% 的热量，', 0), ('衰老的速度慢了 2% 到 3%。', 0)]),
 dict(key='s14', k='c', name='第十四幕 · 小鼠', draw='l14', lines=[
    ('在小鼠身上，已经有药能延长寿命：', 0), ('雷帕霉素，从相当于人 60 岁时才开始吃，', 0),
    ('也能让小鼠多活约一成。', 0), ('2024 年《自然》：阻断一种叫 IL-11 的蛋白，', 0),
    ('中老年小鼠的寿命延长了约四分之一。', 0), ('但小鼠不是人，这些都还要在人身上验证。', 0)]),
 dict(key='s15', k='c', name='第十五幕 · 狗', draw='l15', lines=[
    ('离人更近的一步，是狗。', 0), ('美国 Loyal 公司的一种抗衰老药，', 0),
    ('已经通过了 FDA 的安全性和初步有效性审查。', 0), ('约 1300 只老年犬的双盲试验，', 0),
    ('正在检验它能不能真的延长寿命。', 0)]),
 dict(key='s16', k='c', dur_min=26.0, name='第十六幕 · 重编程', draw='l16', lines=[
    ('最受瞩目的，是“重编程”。', 0), ('2006 年，山中伸弥发现：', 0),
    ('4 个基因，就能把成年细胞变回干细胞。', 0), ('如果只用其中 3 个，只开一小会儿，', 0),
    ('细胞的“说明书”会被刷回更年轻的状态，', 0), ('细胞却还是原来的细胞。', 0),
    ('2020 年，这个方法让老年小鼠的视力恢复了。', 0), ('2026 年，它第一次进入人体临床试验，', 0),
    ('先用来治青光眼这类视神经疾病。', 0)]),
 dict(key='s17', k='c', name='第十七幕 · 换零件', draw='l17', lines=[
    ('还有一条路：给身体换零件。', 0), ('基因改造的猪肾，', 0),
    ('已经在一位病人体内工作了 271 天。', 0), ('2025 年 11 月，', 0), ('美国第一项正式的猪肾移植临床试验，', 0),
    ('完成了第一例手术。', 0)]),
 dict(key='ch5', k='chap', name='章节 · 未来', word='未来', line='接下来，最可能发生什么？'),
 dict(key='s18', k='c', name='第十八幕 · 一步一步', draw='l18', lines=[
    ('不是永生，也不是一夜之间活到 200 岁。', 0), ('更可能的是：先让衰老慢下来，', 0),
    ('让人到了 80、90 岁，还能健康地生活。', 0), ('每一项进展，都要走过一期、二期、三期临床试验，', 0),
    ('一步一步被验证。', 0)]),
 dict(key='s19', k='c', dur_min=24.0, name='第十九幕 · 正在发生', draw='l19', lines=[
    ('1900 年，全球平均寿命大约 32 岁。', 0), ('今天，超过 70 岁。', 0),
    ('这翻了一倍还多的寿命，来自疫苗、抗生素和干净的水。', 0), ('而这一次，科学家瞄准的，是衰老本身。', 0),
    ('更长、更健康的人生，', 0), ('正在一项项试验里，变成现实。', 0)]),
 dict(key='recap', k='recap', name='回顾', lines=[
    ('天花板：最长 122 岁，死亡率每 8 年翻一倍；', 0), ('原因：损伤积累，进化不管；', 0),
    ('物理上：没有定律规定必须变老；', 0), ('2026：减缓衰老的疗法，开始进入人体。', 0)]),
 dict(key='src', k='src', dur_min=9.0, name='资料来源', lines=[('内容整理自公开发表的研究和报道。', 0)]),
]

CUE_SPEC = []
BED_SPEC = []
MUSIC_FILE = 'lf_bed.mp3'
BEAT0 = 0.0
BEAT = 0.6666718
BAR = BEAT * 4
TRANSPOSE = 0
MUS = dict(beat0=BEAT0, bar=BAR, tr=TRANSPOSE)
BAR_KEYS = ('s1', 'ch2', 'ch3', 'ch4', 'ch5', 'recap')
def qc(x, u): return math.ceil(x / u - 1e-9) * u
def beat_of(i): return BEAT

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
            kind = sc['k']
            cur = LEAD[kind]; L = []
            for text, hold in sc['lines']:
                d = max(2.0, 0.55 + n_chars(text) / SPEED, hold)
                d = max(B_ * 3, math.ceil((d - 0.2) / B_ - 1e-9) * B_)
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
        e = qc(t + dur, beat_of(i))
        if i + 1 < len(SC) and SC[i + 1]['key'] in BAR_KEYS:
            e = qc(e, 4 * beat_of(i + 1))
        dur = e - t
        for a, b, tx in L: lines.append((i, a, b, tx))
        out.append(dict(s=round(t, 3), e=round(e, 3), ls=[round(x, 3) for x in ls], dur=round(dur, 3)))
        t = e
    return out, lines, t

TL, LINES, DUR = timeline()
IDX = {sc['key']: i for i, sc in enumerate(SC)}

def at(key, anchor):
    i = IDX[key]; tl = TL[i]
    if anchor[0] == 'L': return tl['s'] + tl['ls'][anchor[1]] + anchor[2]
    if anchor[0] == 'T': return tl['s'] + anchor[1]
    return tl['e'] + anchor[1]

def chords(): return []
def music_plan(): return [[0, 0, int(DUR / BAR) + 3]]

def build_cues():
    cues = []
    for i, sc in enumerate(SC):
        if sc['k'] == 'chap':
            s = TL[i]['s']
            cues.append([round(s - 1.2, 3), 'riser', None]); cues.append([round(s, 3), 'boom', None])
        elif i > 0 and SC[i - 1]['k'] != 'chap':
            cues.append([round(TL[i]['s'] - 0.45, 3), 'whoosh', None])
    import sfx_lf; cues += sfx_lf.cues()
    cues.sort(key=lambda c: c[0])
    return cues

def build_beds(): return []

if __name__ == '__main__':
    for i, sc in enumerate(SC):
        t = TL[i]
        print(i, sc['key'], round(t['s'], 1), round(t['e'], 1), round(t['dur'], 1), t['ls'])
    print('DUR', round(DUR, 1), 'lines', len(LINES))
    for si, a, b, tx in LINES:
        if n_chars(tx) > 24: print('LONG', n_chars(tx), tx)
