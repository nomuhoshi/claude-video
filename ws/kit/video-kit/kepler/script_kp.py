# -*- coding: utf-8 -*-
# Scene script for the Kepler biography (series #4). Timing is computed from the subtitle volume.
import math

TITLE = '他追着一个错误的梦，找到了真理'
SPEED = 6.8
LEAD = {'hero': 1.0, 'c': 0.8, 'recap': 0.4, 'src': 0.4}
TAIL = {'hero': 0.4, 'c': 0.55, 'recap': 0.5, 'src': 0.5}
CHAP_DUR = 2.6
GAP = 0.08

def n_chars(t):
    n = 0.0
    for ch in t:
        n += 0.35 if ch in '，。、：；？！“”‘’…《》—  ·' else 1.0
    return n

def L(*xs): return [(x, 0) if isinstance(x, str) else x for x in xs]

SC = [
 dict(key='hero', k='hero', name='开场', draw='k0', lines=L(
    '五个形状，一个套着一个。', '他以为，这就是上帝造宇宙的设计图。', '他错了。',
    '可正是这个错误，', '把他带到了真正的规律面前。', '他叫约翰内斯 · 开普勒。')),
 dict(key='ch1', k='chap', name='章节 · 少年', word='少年', line='一个看不清星星的孩子。'),
 dict(key='s1', k='c', name='第一幕 · 早产', draw='k1', lines=L(
    '1571 年冬天，德国西南部的小城魏尔。', '他早产，从小体弱多病。', '一场天花，',
    '伤了他的眼睛和双手。', '一个看不清东西的孩子，', '后来却算准了行星的路。')),
 dict(key='s2', k='c', name='第二幕 · 彗星', draw='k2', lines=L(
    '六岁那年，母亲带他爬上高处，', '看一颗拖着长尾巴的大彗星。', '九岁，父亲叫他出门，',
    '看月亮在月食里变成暗红色。', '后来他进了图宾根大学，', '本想当一名牧师。',
    '老师在课上悄悄讲哥白尼：', '地球不在中心，太阳才是。', '他一听就信了。')),
 dict(key='ch2', k='chap', name='章节 · 设计图', word='设计图', line='1595 年夏天，一堂数学课。'),
 dict(key='s3', k='c', name='第三幕 · 六颗行星', draw='k3', lines=L(
    '学校缺人，他被派去格拉茨教数学。', '1595 年 7 月，他正在黑板上画图，', '突然想到一个问题：',
    '为什么行星正好是六颗？', '为什么它们离太阳的距离，偏偏是这样？', '总该有个理由吧。')),
 dict(key='s4', k='c', name='第四幕 · 五种形状', draw='k4', lines=L(
    '他想到了一种特别的形状：', '每个面都一模一样的立体。', '这样的立体，世界上只有五种，',
    '一种都多不了。', '他把它们一个套一个：', '每两层之间，夹一个球。', '五个形状，正好隔出六个球——',
    '六个球，正好是六颗行星的轨道！', '1596 年，他把这个想法写成了书。')),
 dict(key='s5', k='c', name='第五幕 · 差一点', draw='k5', lines=L(
    '可是，算出来的距离，', '和观测还差着大约十分之一。', '他不怪自己的模型，',
    '他怪数据不够准。', '全欧洲最准的数据，', '在一个人手里。')),
 dict(key='ch3', k='chap', name='章节 · 第谷', word='第谷', line='一个有金属鼻子的贵族。'),
 dict(key='s6', k='c', name='第六幕 · 岛上的天文台', draw='k6', lines=L(
    '他叫第谷 · 布拉赫，丹麦贵族。', '年轻时和人决斗，削掉了一块鼻子，', '从此戴着一个金属假鼻。',
    '国王送给他一座岛，', '他在岛上建起天文台，', '没有望远镜，只靠巨大的仪器和眼睛，',
    '二十多年里，把行星的位置量到了', '一角分左右的精度。', '1600 年，开普勒来到布拉格，投奔第谷。')),
 dict(key='s7', k='c', name='第七幕 · 一年半', draw='k7', lines=L(
    '两个人谁也不放心谁。', '第谷把数据看得很紧，', '只把最难的一颗——火星——交给了他。',
    '1601 年 10 月，第谷赴宴后病倒，', '十一天后去世。', '据说临终前他一遍遍念叨：',
    '“别让我看起来像白活了一场。”', '开普勒接任了皇家数学家。', '那些观测记录，落到了他手里。')),
 dict(key='ch4', k='chap', name='章节 · 火星', word='火星', line='他说八天就能算完。'),
 dict(key='s8', k='c', name='第八幕 · 八角分', draw='k8', lines=L(
    '他用了好几年，和火星较劲。', '和所有前人一样，他先用正圆，', '圆心挪一挪，速度调一调，',
    '算了一遍又一遍。', '最后，大部分观测都对上了，', '可有几处，偏了八角分。',
    '八角分有多小？', '大约是满月宽度的四分之一。')),
 dict(key='s9', k='c', name='第九幕 · 不肯放过', draw='k9', lines=L(
    '换了别人，大概就算了。', '可第谷的数据，误差只有两角分左右。', '八角分，不可能是看错了。',
    '他写道：', '“单单这八角分，', '就将带领我们改革整个天文学。”', '他试过蛋形，又偏了八角分，',
    '只是偏到了另一边。', '真相，就在两者中间。')),
 dict(key='s10', k='c', name='第十幕 · 椭圆', draw='k10', lines=L(
    '那是一个椭圆。', '第一条：行星绕太阳走椭圆，', '太阳不在正中间，在一个焦点上。',
    '第二条：行星离太阳近时跑得快，', '远时跑得慢；', '连向太阳的线，同样的时间扫过同样大的面积。',
    '1609 年，这两条定律写进了《新天文学》。', '两千年来“天上只能走正圆”的信条，', '就这样被打破了。')),
 dict(key='ch5', k='chap', name='章节 · 梦', word='梦', line='没钱送礼的那一年。'),
 dict(key='s11', k='c', name='第十一幕 · 雪花', draw='k11', lines=L(
    '1611 年，他穷得送不起新年礼物。', '他给朋友写了一本小册子：', '讲雪花为什么总是六个角。',
    '他的猜想是：六边形排得最紧，', '就像蜂巢，就像石榴籽。', '顺着这个问题，他又问：',
    '一堆炮弹，怎么堆最省地方？', '这个“开普勒猜想”，', '过了将近四百年才被证明。')),
 dict(key='s12', k='c', name='第十二幕 · 梦', draw='k12', lines=L(
    '他还写过一个故事，叫《梦》。', '一个冰岛少年，母亲懂得草药，', '能召来精灵。',
    '精灵带人飞上月亮，', '从月亮上回头看地球。', '后来有人把它称作', '最早的科幻小说之一。',
    '可这个故事，后来给他惹了大麻烦。')),
 dict(key='ch6', k='chap', name='章节 · 母亲', word='母亲', line='1615 年，一桩女巫案。'),
 dict(key='s13', k='c', name='第十三幕 · 女巫', draw='k13', lines=L(
    '1615 年，他的母亲卡塔琳娜，', '被邻居告上了法庭。', '邻居说，她喝了老太太给的一碗苦药，',
    '从此病倒了。', '那是一个烧死女巫的年代。', '有人说，《梦》里那个会草药、', '能召精灵的母亲，写的就是她。')),
 dict(key='s14', k='c', name='第十四幕 · 辩护', draw='k14', lines=L(
    '他放下了手头的研究，', '去请教法学家，一条条写辩护。', '1620 年，七十多岁的母亲被捕，',
    '戴着镣铐，关了十四个月。', '他们把刑具摆在她面前。', '她说：我没有什么可招的，',
    '就算死，我也不认。', '1621 年秋天，她被放了出来，', '半年后去世。')),
 dict(key='ch7', k='chap', name='章节 · 和谐', word='和谐', line='他还在找那张设计图。'),
 dict(key='s15', k='c', name='第十五幕 · 第三定律', draw='k15', lines=L(
    '这些年里，他从没放下那几个多面体。', '他还想听见“天体的音乐”：', '行星之间，一定藏着和谐的比例。',
    '1618 年，他找到了一个：', '行星绕一圈的时间，平方一下；', '离太阳的距离，立方一下；',
    '两个数，对每一颗行星都成比例。', '今天八大行星，没有一颗例外。')),
 dict(key='ch8', k='chap', name='章节 · 晚年', word='晚年', line='战争来了。'),
 dict(key='s16', k='c', name='第十六幕 · 欠薪', draw='k16', lines=L(
    '这时，三十年战争已经打起来了。', '他的第一任妻子病逝，', '几个孩子先后夭折。',
    '他给皇帝当数学家，', '薪水却一拖就是好几年。', '1627 年，他终于印出了星表，',
    '按第谷的数据和他的定律，', '能算出行星未来的位置。')),
 dict(key='s17', k='c', name='第十七幕 · 雷根斯堡', draw='k17', lines=L(
    ('1630 年秋天，他五十八岁，', 0), '骑马上路，', '去雷根斯堡向皇帝讨要欠薪。',
    '刚到不久，他就病倒了。', ('11 月 15 日，他去世了。', 3.2), '后来，战火烧毁了那片墓地。',
    '他的墓已经找不到了。', '只留下他为自己写的一句墓志铭：', ('“我曾测量天空，', 3.0), ('如今测量大地的阴影。”', 3.6))),
 dict(key='s18', k='c', name='第十八幕 · 为什么', draw='k18', lines=L(
    '他留下了行星怎么走，', '却没能说清，它们为什么这样走。', '他去世十二年后，',
    '英格兰一个早产的孩子出生了。', '1687 年，那个孩子用一种力，', '把三条定律，全部解释了出来。',
    '至于那五个形状？', '今天我们知道，行星不止六颗，', '那张设计图是错的。',
    '可正是为了证明它，', '他找到了三条真正的规律。')),
 dict(key='recap', k='recap', name='回顾', lines=L(
    '一个看不清星星的孩子；', '一张美丽但错误的设计图；', '八角分，打破了两千年的正圆；',
    '三条定律，等着一个人来解释为什么。')),
 dict(key='src', k='src', name='资料来源', lines=L('内容整理自公开的史料和资料。')),
]

# ---- music: four sections, each on its own beat grid; hand-overs on a shared 8 s downbeat ----
#   A  The Awakening (quiet build)       hero .. s7      90 BPM
#   B  The New York Nightfall (sped up)  ch3 .. s17      90 BPM
#   C  Entropy                           ch5 .. s20     150 BPM
#   D  The Awakening (climax -> tail)    ch6 .. end      90 BPM
BEAT_A = 0.6666718; BEAT_E = 0.4
SECT = [('A', 'hero'), ('C', 'ch3'), ('D', 'ch6'), ('E', 's18')]
BEAT0 = 0.0
BEAT = BEAT_A
BAR = BEAT * 4
MUS = dict(beat0=BEAT0, bar=BAR, tr=0)
def qc(x, u): return math.ceil(x / u - 1e-9) * u
_IDX0 = {sc['key']: i for i, sc in enumerate(SC)}
STARTS = [_IDX0[k] for _, k in SECT]
def sect_of(i): return max(j for j, s in enumerate(STARTS) if s <= i)
def beat_of(i): return BEAT_E if SECT[sect_of(i)][0] == 'C' else BEAT_A

def timeline():
    raw = []; lines = []; t = 0.0
    for i, sc in enumerate(SC):
        ls = []; B_ = beat_of(i)
        if sc['k'] == 'chap':
            dur = CHAP_DUR; ls = [0.45]; Ls = [(0.45, 2.5, sc['line'])]
        else:
            kind = sc['k']; cur = LEAD[kind]; Ls = []
            for text, hold in sc['lines']:
                d = max(2.0, 0.55 + n_chars(text) / SPEED, hold)
                d = max(B_ * 3 if B_ > 0.5 else B_ * 5, math.ceil((d - 0.2) / B_ - 1e-9) * B_)
                cur = qc(cur, B_)
                ls.append(cur); Ls.append((cur, cur + d - GAP, text)); cur += d
            dur = cur + TAIL[kind]
        raw.append((dur, ls, Ls))
    out = []
    for i, sc in enumerate(SC):
        dur, ls, Ls = raw[i]
        e = qc(t + dur, beat_of(i))
        if i + 1 in STARTS: e = qc(e, 8.0)                               # section hand-over on a shared downbeat
        elif i + 1 < len(SC) and SC[i + 1]['k'] in ('chap', 'recap'): e = qc(e, 4 * beat_of(i + 1))
        for a, b, tx in Ls: lines.append((i, a, b, tx))
        out.append(dict(s=round(t, 3), e=round(e, 3), ls=[round(x, 3) for x in ls], dur=round(e - t, 3)))
        t = e
    return out, lines, t

TL, LINES, DUR = timeline()
IDX = _IDX0
def T(key): return TL[IDX[key]]['s']
def at(key, li, off=0.0): return TL[IDX[key]]['s'] + TL[IDX[key]]['ls'][li] + off

def chords(): return []
def music_plan(): return [[0, 0, int(DUR / BAR) + 3]]

def build_cues():
    cues = []
    for i, sc in enumerate(SC):
        if sc['k'] == 'chap':
            s = TL[i]['s']; cues.append([round(s - 1.2, 3), 'riser', None]); cues.append([round(s, 3), 'boom', None])
        elif i > 0 and SC[i - 1]['k'] != 'chap':
            cues.append([round(TL[i]['s'] - 0.45, 3), 'whoosh', None])
    import sfx_kp; cues += sfx_kp.cues()
    cues.sort(key=lambda c: c[0])
    return cues
def build_beds(): return []

if __name__ == '__main__':
    for i, sc in enumerate(SC):
        t = TL[i]
        print(i, sc['key'], SECT[sect_of(i)][0], round(t['s'], 1), round(t['e'], 1), round(t['dur'], 1))
    print('DUR', round(DUR, 1), 'lines', len(LINES))
    for k in ('ch3', 'ch5', 'ch6'): print(k, T(k))
    for si, a, b, tx in LINES:
        if n_chars(tx) > 21: print('LONG', n_chars(tx), tx)
