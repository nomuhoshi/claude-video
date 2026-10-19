# -*- coding: utf-8 -*-
# Scene script for the Newton biography (series #3). Timing is computed from the subtitle volume.
import math

TITLE = '牛顿：一个苹果，管着整个宇宙'
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
 dict(key='hero', k='hero', name='开场', draw='n0', lines=L(
    '他生下来，小得能装进一只杯子。', '没人以为他能活下来。', '后来，他活了 84 岁，',
    '还写下了整个宇宙运转的规则。', '他叫艾萨克 · 牛顿。')),
 dict(key='ch1', k='chap', name='章节 · 乡下', word='乡下', line='故事从一座石头农舍开始。'),
 dict(key='s1', k='c', name='第一幕 · 圣诞节', draw='n1', lines=L(
    '1642 年圣诞节，英格兰林肯郡。', '一座叫伍尔斯索普的石头农舍里，', '他出生了。父亲三个月前已经去世。',
    '他三岁那年，母亲改嫁，', '搬去了继父家，', '把他留给了外祖母。')),
 dict(key='s2', k='c', name='第二幕 · 做东西的少年', draw='n2', lines=L(
    '十二岁，他去镇上读书，', '寄住在一位药剂师家里。', '他不爱跟同学玩，爱做东西：',
    '会转的风车，会走的水钟，', '还在风筝上挂灯笼，夜里放上天。',
    '十几岁时，母亲叫他回家种地。', '他放羊的时候也在看书。', '老师和舅舅劝母亲：让他去读大学吧。')),
 dict(key='s3', k='c', name='第三幕 · 减费生', draw='n3', lines=L(
    '1661 年，他进了剑桥三一学院。', '身份是“减费生”：', '一边读书，一边给别人干杂活抵学费。',
    '课堂上讲的，还是两千年前那一套。', '他在自己的笔记本上，', '抄起了新东西：笛卡尔、伽利略、开普勒……')),
 dict(key='s4', k='c', name='第四幕 · 几何原本', draw='n4', lines=L(
    '1663 年，剑桥附近有个大集市。', '他买了一本占星书，', '书里有张星图，他看不懂：缺三角学。',
    '于是他又买了一本《几何原本》。', '翻了几条定理，他觉得太简单：', '“这还用证明？”随手丢在一边，',
    '跳过去，直接啃更难的新几何。', '第二年考奖学金，', '考官巴罗考他欧几里得，他答得很差。',
    '他回过头，把《几何原本》一条一条重读。', '这一次，他没再跳。')),
 dict(key='ch2', k='chap', name='章节 · 瘟疫年', word='瘟疫年', line='1665 年，大学关门了。'),
 dict(key='s5', k='c', name='第五幕 · 回到乡下', draw='n5', lines=L(
    '1665 年，伦敦闹起了大瘟疫。', '他刚拿到学士学位，剑桥就关了门。', '他回到乡下老家，一待就是将近两年。',
    '没有老师，没有同学，', '只有一个一直在想问题的人。', '后来，人们把这段日子叫做“奇迹年”。')),
 dict(key='s6', k='c', name='第六幕 · 这一瞬间', draw='n6', lines=L(
    '第一个问题：', '“这一瞬间”的速度，到底怎么算？', '一段路除以一段时间，只是平均速度。',
    '把时间切得越来越短，', '短到几乎为零，', '就得到了这一刻的速度。', '他叫它“流数术”，今天叫微积分。')),
 dict(key='s7', k='c', name='第七幕 · 苹果', draw='n7', lines=L(
    '第二个问题，从一棵苹果树开始。', '很多年后，他对一位老朋友回忆：', '花园里，一只苹果落了下来。',
    '他想：苹果为什么总是垂直往下掉？', '不往旁边，也不往上，而是朝着地心。', '砸到头？那是后人加上去的。',
    '他接着想：', '这股力，能不能一直伸到月亮？')),
 dict(key='ch3', k='chap', name='章节 · 光', word='光', line='白光里，藏着什么？'),
 dict(key='s8', k='c', name='第八幕 · 三棱镜', draw='n8', lines=L(
    '那时人们以为，白光是最纯的光，', '三棱镜里出来的彩色，是玻璃加上去的。', '他在窗板上开了一个小孔，',
    '让一束阳光穿过三棱镜，', '在墙上拉出一条长长的彩带。', '他只挑出其中的红光，', '再让它穿过第二块三棱镜——',
    '红光还是红光，不会再变。', '颜色不是玻璃造的，', '白光，本来就是所有颜色混在一起。')),
 dict(key='s9', k='c', name='第九幕 · 一面镜子', draw='n9', lines=L(
    '透镜做的望远镜，看星星总带彩边，', '因为不同颜色的光，折的角度不一样。', '他干脆不用透镜，改用一面凹面镜。',
    '1668 年，他亲手做出第一架反射望远镜。', '只有十几厘米长，', '皇家学会看了很惊讶，', '1672 年，选他做了会员。')),
 dict(key='ch4', k='chap', name='章节 · 原理', word='原理', line='一次拜访，催生了一本书。'),
 dict(key='s10', k='c', name='第十幕 · 哈雷来访', draw='n10', lines=L(
    '1684 年，天文学家哈雷来剑桥找他。', '哈雷问：如果太阳的引力，', '随距离的平方变弱，',
    '行星会走出什么样的轨道？', '他立刻回答：椭圆。', '哈雷问：你怎么知道？', '“我算过。”',
    '可那份草稿，他一时找不到了。', '他答应重算一遍，寄过去。')),
 dict(key='s11', k='c', name='第十一幕 · 一本书', draw='n11', lines=L(
    '这一算，就停不下来了。', '他几乎闭门不出，写了一年半。', '1687 年，《自然哲学的数学原理》出版。',
    '印书的钱，是哈雷帮忙出的。', '书一开头，先立下三条运动定律。')),
 dict(key='s12', k='c', name='第十二幕 · 第一条', draw='n12', lines=L(
    '第一条：没有力去推它，', '静止的东西，就一直静止；', '运动的东西，就沿直线一直走下去。',
    '我们觉得东西会自己停下，', '是因为地面和空气在拦着它。')),
 dict(key='s13', k='c', name='第十三幕 · 第二条', draw='n13', lines=L(
    '第二条：同样的东西，推得越用力，', '速度变得越快；', '同样的力，东西越重，越难推动。',
    '力，就是用来改变运动的。')),
 dict(key='s14', k='c', name='第十四幕 · 第三条', draw='n14', lines=L(
    '第三条：你推别人一下，', '别人也用同样大的力推你。', '火箭把气往后喷，气就把火箭往前推。')),
 dict(key='s15', k='c', name='第十五幕 · 大炮', draw='n15', lines=L(
    '然后，是书里最大胆的一步。', '想象在高山顶上架一门大炮，', '平着打出去，炮弹落在不远处。',
    '打得更快，就落得更远。', '快到一定程度，地面往下弯，', '正好赶上炮弹往下掉——',
    '它一直在掉，却永远落不了地。', '月亮就是这样：它一直在往地球掉。')),
 dict(key='s16', k='c', name='第十六幕 · 3600', draw='n16', lines=L(
    '那么，月亮掉得有多快？', '月亮离地心，大约是地球半径的 60 倍。', '如果引力随距离的平方变弱，',
    '那里的引力，只有地面的 3600 分之一。', '地面上，苹果第一秒落下约 4.9 米；',
    '月亮一秒钟，只往地球掉约 1.4 毫米。', '拿月亮的真实轨道一算——正好对上。', '苹果和月亮，被同一种力拉着。')),
 dict(key='s17', k='c', name='第十七幕 · 万有引力', draw='n17', lines=L(
    '而且不只是地球。', '太阳拉着行星，行星拉着卫星，', '任何两个东西之间，都有引力：',
    '质量越大越强，距离越远越弱。', '天上和地上，第一次用同一套规则来算。', '彗星的路线、潮水的涨落，都算得出来。')),
 dict(key='ch5', k='chap', name='章节 · 另一面', word='另一面', line='他不只是书斋里的人。'),
 dict(key='s18', k='c', name='第十八幕 · 铸币局', draw='n18', lines=L(
    '1696 年，他离开剑桥，', '去伦敦当了皇家铸币局的督办。', '那时英国的银币，',
    '被人剪边、熔掉、仿造，假币到处都是。', '他没把这当成闲差：', '他安插线人，亲自审问，',
    '一年多里，做了一百多次盘问。')),
 dict(key='s19', k='c', name='第十九幕 · 查洛纳', draw='n19', lines=L(
    '最狡猾的对手，叫威廉 · 查洛纳。', '他造假币，还反咬铸币局的人腐败，', '想让自己去管铸币局。',
    '牛顿一个个找来证人。', '1699 年，查洛纳被判死刑。', '临刑前，他给牛顿写信：', '“只有你能救我。”',
    '牛顿没有回信。')),
 dict(key='s20', k='c', name='第二十幕 · 谁先发明', draw='n20', lines=L(
    '晚年，他还卷进一场大争吵。', '德国的莱布尼茨，', '1684 年先发表了微积分。',
    '到底谁先发明？两边吵了十几年。', '皇家学会出面调查，', '可调查报告的结论，有一部分是牛顿自己写的。',
    '今天的看法是：两人各自独立发明。', '我们现在用的符号，大多来自莱布尼茨。')),
 dict(key='ch6', k='chap', name='章节 · 晚年', word='晚年', line='他活得很久。'),
 dict(key='s21', k='c', name='第二十一幕 · 会长', draw='n21', lines=L(
    '1703 年，他当上了皇家学会会长，', '一直当到去世。', '1705 年，女王封他为爵士。',
    '他一生没有结婚。')),
 dict(key='s22', k='c', name='第二十二幕 · 1727', draw='n22', lines=L(
    ('1727 年 3 月，他在睡梦中去世，', 0), ('84 岁。', 2.6), '他被葬进威斯敏斯特教堂，',
    '当年考倒他的巴罗，也葬在这里。', '一位法国作家看着这场葬礼，', '后来写道：他们像安葬一位国王一样安葬他。')),
 dict(key='s23', k='c', name='第二十三幕 · 墓志铭', draw='n23', lines=L(
    '诗人蒲柏，为他写了两行墓志铭：', ('“自然和自然的规律，藏在黑夜里。', 3.2),
    ('上帝说：让牛顿去吧！', 2.8), ('于是，一切都亮了。”', 3.6))),
 dict(key='s24', k='c', name='第二十四幕 · 海边', draw='n24', lines=L(
    '可据说，在去世前不久，', '他是这样说自己的：', ('“我不知道世人怎么看我。', 2.8),
    ('我只觉得，自己像个在海边玩耍的孩子，', 3.4), '偶尔捡到一块更光滑的石子、', '一只更好看的贝壳，就高兴起来；',
    ('而真理的大海，就在我面前，', 3.2), ('全都还没有被发现。”', 4.0))),
 dict(key='recap', k='recap', name='回顾', lines=L(
    '一个早产的乡下孩子；', '一本被他嫌简单、又回头重读的书；', '一束拆开的阳光，一个一直在掉的月亮；',
    '他让天上和地上，第一次服从同一套规则。')),
 dict(key='src', k='src', name='资料来源', lines=L('内容整理自公开的史料和资料。')),
]

# ---- music: four sections, each on its own beat grid; hand-overs on a shared 8 s downbeat ----
#   A  The Awakening (quiet build)       hero .. s7      90 BPM
#   B  The New York Nightfall (sped up)  ch3 .. s17      90 BPM
#   C  Entropy                           ch5 .. s20     150 BPM
#   D  The Awakening (climax -> tail)    ch6 .. end      90 BPM
BEAT_A = 0.6666718; BEAT_E = 0.4
SECT = [('A', 'hero'), ('B', 'ch3'), ('C', 'ch5'), ('D', 'ch6')]
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
    import sfx_nt; cues += sfx_nt.cues()
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
