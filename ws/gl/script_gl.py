# -*- coding: utf-8 -*-
# Scene script for the Galileo biography (series #5, v2 engine). Timing is computed from the subtitle volume.
import math

TITLE = '他看见了真相，却被逼着说它是假的'
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
 dict(key='hero', k='hero', name='开场', draw='g0', lines=L(
    '1633 年 6 月 22 日，罗马。', '六十九岁的老人，跪在审判官面前。', '他念着认罪书，保证从此不再相信：',
    '“地球在动”。', '可这件事，是他亲眼看见的。', '他叫伽利略。')),
 dict(key='ch1', k='chap', name='章节 · 少年', word='少年', line='一个爱问“凭什么”的孩子。'),
 dict(key='s1', k='c', name='第一幕 · 琴师的儿子', draw='g1', lines=L(
    '1564 年，伽利略出生在意大利比萨。', '父亲是琴师，也爱做实验：', '他把重物挂在琴弦上，量它的拉力，',
    '发现：音要升高一个八度，', '得挂上四倍的重量。', '十七岁，父亲送他去读医学。',
    '可他更爱数学，', '医学没读完，就放下了。')),
 dict(key='s2', k='c', name='第二幕 · 吊灯', draw='g2', lines=L(
    '据说，年轻的他在比萨大教堂里，', '盯着一盏摇晃的吊灯。', '他用自己的脉搏数时间，',
    '发现：摆得大一点、小一点，', '来回一次的时间，差不多一样。', '这个故事出自他的学生，',
    '他自己没写过。', '可摆的这个性质，他后来认真研究过。')),
 dict(key='ch2', k='chap', name='章节 · 落体', word='落体', line='近两千年的老规矩。'),
 dict(key='s3', k='c', name='第三幕 · 绑在一起', draw='g3', lines=L(
    '古希腊的亚里士多德说过：', '重的东西，落得比轻的快。', '两千年里，人人都这么教。',
    '伽利略想了一个办法：不用扔，只用想。', '把一块重石头和一块轻石头，', '用绳子绑在一起。',
    '轻的会拖慢重的，所以更慢；', '可绑在一起更重，所以更快。', '同一件事，推出了两个结果——',
    '这条老规矩，自己就站不住。')),
 dict(key='s4', k='c', name='第四幕 · 斜面', draw='g4', lines=L(
    '比萨斜塔上扔球的故事很有名，', '但他自己没写过，多半是后人加的。', '真正的实验，在一块斜板上。',
    '落得太快，看不清，', '他就让球沿斜面慢慢滚，', '用水钟计时，一次次记录。',
    '大约 1602 年，他发现：', '滚过的路程，和时间的平方成正比。', '每一小段时间多滚的距离，',
    '正好是 1、3、5、7……')),
 dict(key='ch3', k='chap', name='章节 · 望远镜', word='望远镜', line='一支来自荷兰的窥镜。'),
 dict(key='s5', k='c', name='第五幕 · 磨镜片', draw='g5', lines=L(
    '1609 年，他听说荷兰有人做出了窥镜，', '能把远处的东西拉近。', '他只听说了大概的样子，',
    '就自己动手磨镜片。', '第一支，只放大三四倍；', '很快，是八九倍；', '最后，是二十倍。',
    '1609 年底，他把它指向了夜空。')),
 dict(key='s6', k='c', name='第六幕 · 月亮', draw='g6', lines=L(
    '第一个目标，是月亮。', '两千年来，人们都说：', '天上的东西是完美的，',
    '月亮是一个光滑的球。', '可他看到的，是一座座山，', '和一个个坑。',
    '他量山影的长度，', '算出有的山高好几公里。', '天上和地上，原来是同一种东西。')),
 dict(key='s7', k='c', name='第七幕 · 银河', draw='g7', lines=L(
    '他又看向银河。', '那片白色的雾，', '原来是密密麻麻的小星星。',
    '同一块天空，', '他看到的星星，', '比肉眼多了十倍。')),
 dict(key='s8', k='c', name='第八幕 · 木星', draw='g8', lines=L(
    '1610 年 1 月 7 日的夜里，', '他看向木星，', '旁边有三个小亮点，排成一排。',
    '他以为是远处的恒星。', '可连着几个晚上，', '它们的位置在变，',
    '还多出了第四个。', '它们不是恒星，', '是绕着木星转的卫星。', '不是所有东西，都绕着地球转。')),
 dict(key='s9', k='c', name='第九幕 · 星际信使', draw='g9', lines=L(
    '1610 年 3 月，他把这些发现', '印成了一本小册子：《星际信使》。', '他把木星的卫星，',
    '献给托斯卡纳大公美第奇家族，', '叫它们“美第奇星”。', '有人不信，说是镜片里的幻象。',
    '开普勒写了一封公开信，', '替他作证。', '那年夏天，他回到佛罗伦萨，', '当上了大公的宫廷数学家。')),
 dict(key='s10', k='c', name='第十幕 · 金星', draw='g10', lines=L(
    '后来，他又盯上了金星。', '它像月亮一样，会盈会亏。', '旧模型把金星放在地球和太阳之间，',
    '它永远只能是个月牙。', '可 1610 年底，', '他看到了近乎满圆的金星。', '这是旧模型过不了的一关。')),
 dict(key='ch4', k='chap', name='章节 · 审判', word='审判', line='1616 年，教会开了一次会。'),
 dict(key='s11', k='c', name='第十一幕 · 警告', draw='g11', lines=L(
    '他开始公开说：哥白尼是对的，', '地球绕着太阳转。', '可《圣经》里有几句话，',
    '看上去说的是太阳在动。', '1616 年 2 月，罗马的神学顾问们', '裁定：这个说法“形式上是异端”。',
    '两天后，红衣主教贝拉明找到他，', '警告他：不许持有、传授、捍卫。', '哥白尼的书，被要求修改后才能读。')),
 dict(key='s12', k='c', name='第十二幕 · 对话', draw='g12', lines=L(
    '他沉默了好几年。', '直到一位老朋友当上了教皇，', '他觉得，可以再写一本了。',
    '1632 年，《关于两大世界体系的对话》出版：', '三个人聊天，一个替哥白尼说话，', '一个替旧观念说话，',
    '名字听起来像“头脑简单的人”。', '据说有人对教皇说：他是在影射你。', '那年夏天，书被叫停发行。')),
 dict(key='s13', k='c', name='第十三幕 · 他也错了', draw='g13', lines=L(
    '公平地说，这本书里也有他的错。', '他把潮汐当作最硬的证据，', '说潮起潮落，是地球在动。',
    '这一条，其实是错的。', '他的行星轨道，还是正圆。', '开普勒的椭圆，他始终没采用。')),
 dict(key='s14', k='c', name='第十四幕 · 受审', draw='g14', lines=L(
    '1633 年初，他被叫到罗马受审。', '审判官翻出了十七年前的那份警告。', '6 月 22 日，宣判：',
    '无限期监禁，那本书被禁。', '他被要求跪着，念出认罪书。')),
 dict(key='s15', k='c', name='第十五幕 · 那句话', draw='g15', lines=L(
    '后来流传一句话：“可它还是在动。”', '但他学生写的传记里没有，', '审判记录里也没有。',
    '它最早出现在 1757 年，', '他去世的一百多年之后。')),
 dict(key='ch5', k='chap', name='章节 · 软禁', word='软禁', line='一座看得见修道院的房子。'),
 dict(key='s16', k='c', name='第十六幕 · 阿切特里', draw='g16', lines=L(
    '刑罚改成了软禁。', '十二月，他被允许回到佛罗伦萨郊外的别墅。', '但不许出门，不许会客，',
    '也不许再出版任何书。', '别墅旁边，是一座修道院。', '他的大女儿在里面当修女，',
    '名叫玛丽亚 · 切莱斯特。', '她常给父亲写信，', '信一直保存到了今天。', '1634 年，她去世了。')),
 dict(key='s17', k='c', name='第十七幕 · 失明', draw='g17', lines=L(
    '他的眼睛，也一天天坏下去。', '到 1638 年初，', '他什么都看不见了。',
    '那个第一个把望远镜指向天空的人，', '再也看不到天空了。')),
 dict(key='s18', k='c', name='第十八幕 · 两门新科学', draw='g18', lines=L(
    '可他还有一份没发出去的书稿。', '教会禁止他出版任何书，', '连以后写的也不行。',
    '于是手稿被送到了荷兰，', '1638 年，在莱顿印了出来。', '书名叫《两门新科学》。',
    '里面是他几十年的实验：', '落体、斜面、摆。', '还有一个新结论：', '扔出去的东西，走的是抛物线。')),
 dict(key='ch6', k='chap', name='章节 · 接力', word='接力', line='一个人走了，另一个人来了。'),
 dict(key='s19', k='c', name='第十九幕 · 去世', draw='g19', lines=L(
    '1642 年 1 月 8 日，', '他在别墅里去世，七十七岁。', '他想葬在圣十字教堂，父亲身旁，',
    '可遗体只被悄悄安放。', '直到 1737 年，', '才迁进教堂里的墓。',
    '1992 年，教会公开承认，', '当年的处理有错。')),
 dict(key='s20', k='c', name='第二十幕 · 牛顿', draw='g20', lines=L(
    '他去世的那一年，圣诞节，', '英格兰乡下，一个早产的男孩出生了。', '他叫艾萨克 · 牛顿。',
    '伽利略留下的“惯性”：', '没人推，就一直走下去，', '被牛顿写成了第一定律。',
    '伽利略的抛物线再往前推，', '就是牛顿那门永远落不了地的大炮。')),
 dict(key='s21', k='c', name='第二十一幕 · 月面', draw='g21', lines=L(
    '再往后三百多年，', '1971 年，阿波罗 15 号的宇航员，', '站在月球上，一手锤子，一手羽毛，',
    '同时松手。', '没有空气，', '锤子和羽毛，一起落在了月面上。',
    '那是他曾经看见山和坑的月亮。')),
 dict(key='recap', k='recap', name='回顾', draw='g22', lines=L(
    '一个爱问“凭什么”的孩子；', '一支让天空露出真面目的望远镜；', '一份被逼着念出的认罪书；',
    '一本失明之后写完的书。')),
 dict(key='src', k='src', name='资料来源', draw='g23', lines=L('内容整理自公开的史料和资料。')),
]

# ---- music: four sections, each on its own beat grid; hand-overs on a shared 8 s downbeat ----
#   A  The New York Nightfall            hero .. s4      90 BPM   (the verdict, the boy, falling bodies)
#   C  Entropy (re-cut by bars)          ch3 .. s10     150 BPM   (the telescope years)
#   D  The Awakening, quiet first half   ch4 .. s20      90 BPM   (verdict, house arrest, blindness, the handover)
#   E  The Awakening, climax -> tail     s21 .. end      90 BPM   (hammer and feather)
BEAT_A = 0.6666718; BEAT_E = 0.4
SECT = [('A', 'hero'), ('C', 'ch3'), ('D', 'ch4'), ('E', 's21')]
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


if __name__ == '__main__':
    for i, sc in enumerate(SC):
        t = TL[i]
        print(i, sc['key'], SECT[sect_of(i)][0], round(t['s'], 1), round(t['e'], 1), round(t['dur'], 1), [round(x, 1) for x in t['ls']])
    print('DUR', round(DUR, 1), 'lines', len(LINES))
    for k in ('ch3', 'ch4', 's21'): print(k, T(k))
    for si, a, b, tx in LINES:
        if n_chars(tx) > 21: print('LONG', n_chars(tx), tx)
