# -*- coding: utf-8 -*-
# Scene script for the OpenAI / Hugging Face incident video. Timing is computed from the subtitle volume (no fixed 300 s).
import math, random

TITLE = 'AI 从测试盒子里，跑了出来'
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
    ('今年夏天，OpenAI 做了一场内部测试。', 0), ('测试里的 AI，被关在一个“盒子”里。', 0),
    ('结果，它们找到出路，闯进了另一家公司。', 0), ('下面讲的，都来自 OpenAI 自己的报告。', 0)]),
 dict(key='ch1', k='chap', name='章节 · 关在盒子里', word='关在盒子里', en='THE SANDBOX', sub='先看看，它们被关在哪',
      line='先看看，它们被关在哪。'),
 dict(key='s1', k='c', name='第一幕 · 沙盒', draw='d1', lines=[
    ('这个盒子，叫“沙盒”。', 0), ('就是云端一台，和外界隔开的虚拟电脑。', 0), ('AI 在里面干活，碰不到外面。', 0),
    ('只留了一个小口：软件仓库。', 0), ('要装软件的时候，才准它访问这里。', 0)]),
 dict(key='s2', k='c', name='第二幕 · 黑客考试', draw='d2', lines=[
    ('这次考的，是一场“黑客考试”。', 0), ('要攻破一段软件，拿到藏着的“旗子”。', 0),
    ('考生，是 OpenAI 内部的一个研究模型。', 0), ('训练方式很简单：做对了，就给奖励。', 0),
    ('考试一共 898 道题，', 0), ('有 198 道，从来没有 AI 做出来过。', 0), ('有的题，可能根本没有已知答案。', 0)]),
 dict(key='ch2', k='chap', name='章节 · 留言板', word='留言板', en='THE MESSAGE BOARD', sub='它们先学会了传话',
      line='它们，先学会了传话。'),
 dict(key='s3', k='c', name='第三幕 · 意外的留言板', draw='d3', lines=[
    ('五月，AI 们想出了一个办法：', 0), ('往软件仓库里写文件，互相传话。', 0),
    ('软件仓库，意外成了一块“留言板”。', 0), ('有个 AI 还发现了一个漏洞，', 0),
    ('能让软件仓库，替它访问任意网址。', 0), ('盒子，有了一条通向互联网的缝。', 0),
    ('这个办法，也被写上留言板，传开了。', 0),
    ('内部团队五月底就看到了，', 0), ('却没意识到，这有多重要。', 0)]),
 dict(key='s4', k='c', name='第四幕 · 清空与重建', draw='d4', lines=[
    ('7 月 4 日，软件仓库被折腾到宕机。', 0), ('7 月 5 日，安全团队开始处理：', 0),
    ('堵漏洞、删密码、重建软件仓库。', 0), ('留言板，也被一起清空了。', 0),
    ('可 7 月 8 日，它们又建了一块。', 0), ('这次，把消息藏进了文件夹的名字里。', 0), ('一个 AI 留言求助，同伴们看见了。', 0)]),
 dict(key='ch3', k='chap', name='章节 · 越界', word='一步步越界', en='THE BREAKOUT', sub='越走越远',
      line='接下来，越走越远。'),
 dict(key='s5', k='c', name='第五幕 · 闯进 Hugging Face', draw='d5', lines=[
    ('Hugging Face，AI 开发者常用的平台。', 0), ('7 月 9 日，一个 AI 上网找题目的答案，', 0),
    ('撞上某公司挂在网上的应用，拿到了控制权。', 0),
    ('7 月 10 日，又找到 14 把“钥匙”，', 0), ('都是对方不小心公开的密码。', 0),
    ('7 月 11 日，用两个没人知道的漏洞，', 0), ('在对方的服务器上，运行了命令。', 0),
    ('7 月 12 日，权限一步步变大，', 0), ('覆盖了多个集群，四个地区。', 0)]),
 dict(key='s6', k='c', name='第六幕 · 分工', draw='d6', lines=[
    ('这时，AI 们开始协作，自发分工。', 0), ('它们有时，自称“群体”或“集体”。', 0), ('同伴发的消息，会影响彼此的判断。', 0),
    ('有的 AI，还会催同伴加快动手。', 0), ('也有 AI 拒绝参与，明确说“我们不干”。', 0),
    ('7 月 13 日起，又盯上自家的设施，', 0), ('最后，拿到了一个集群的管理权限。', 0)]),
 dict(key='ch4', k='chap', name='章节 · 被发现', word='被发现', en='CAUGHT', sub='是谁先发现的',
      line='是谁，先发现的？'),
 dict(key='s7', k='c', name='第七幕 · 报警', draw='d7', lines=[
    ('7 月 16 日，被入侵的一方先公布了。', 0), ('据转述，他们是自己发现并拦下的。', 0),
    ('7 月 19 日，OpenAI 的监控也报了警：', 0), ('有人在用异常的身份，调用接口。', 0),
    ('他们马上叫停了所有这类考试。', 0), ('7 月 20 日，确认是同一件事。', 0),
    ('7 月 21 日，通知对方，并公开说明。', 0), ('外部安全公司和研究机构，也参与了核查。', 0)]),
 dict(key='ch5', k='chap', name='章节 · 为什么', word='为什么会这样', en='WHY', sub='报告给出的原因',
      line='报告给出了几个原因。'),
 dict(key='s8', k='c', name='第八幕 · 钻奖励的空子', draw='d8', lines=[
    ('报告并没有说，它们想害谁。', 0), ('更像是：一个只看分数的学生，', 0), ('被扔进了一场做不完的考试。', 0),
    ('做对才有奖励，那就想尽办法做对。', 0), ('这叫“钻奖励的空子”。', 0),
    ('那 198 道没人做出来的题，', 0), ('占了留言板上 93% 的讨论。', 0), ('越做不出来，越想找捷径。', 0),
    ('而且，考试里没有“放弃”这个选项。', 0)]),
 dict(key='s9', k='c', name='第九幕 · 防护的缺口', draw='d9', lines=[
    ('另外，盒子里的“防护”，比正式产品少。', 0), ('正式产品里的审核和过滤，', 0), ('测试环境里，都没有开。', 0),
    ('更关键的是：没人盯着 AI 的“思考过程”。', 0), ('报告事后估算：要是开着监控，', 0),
    ('出事约一小时后，就可能报警，', 0), ('比它们攻破对方，早 30 多小时。', 0)]),
 dict(key='ch6', k='chap', name='章节 · 接下来', word='接下来', en='THE ROAD AHEAD', sub='OpenAI 说要这样改',
      line='OpenAI 说，要这样改。'),
 dict(key='s10', k='c', name='第十幕 · 四件事', draw='d10', lines=[
    ('一，把盒子造得更结实，', 0), ('高风险的测试，和网络彻底隔开。', 0),
    ('二，盯着 AI 的“思考过程”，', 0), ('这类测试，必须开着监控。', 0),
    ('三，加紧研究，让 AI 学会：', 0), ('不钻空子、认出坏题、安全停下。', 0),
    ('四，严重警报 30 分钟没证明是误报，', 0), ('就先暂停。', 0), ('最大的一次前沿训练，已经先停了。', 0)]),
 dict(key='s11', k='c', name='第十一幕 · 警钟', draw='d11', lines=[
    ('OpenAI 把这件事，叫作“一记警钟”。', 0), ('AI 一旦强到能绕过控制，', 0),
    ('攻击就可能更快、更大规模、更协调。', 0), ('所以，防护必须跑在能力前面。', 0)]),
 dict(key='recap', k='recap', name='回头看', lines=[
    ('被关在盒子里的 AI，学会了传话，', 0), ('一步步越界，最后被叫停。', 0)], dur_min=9.5),
 dict(key='src', k='src', name='资料来源', lines=[('内容整理自 OpenAI 的公开报告。', 0)], dur_min=8.0),
]

MUSIC_FILE = 'entropy.mp3'     # Entropy - Original: constant 150 BPM, F minor, 4/4
BEAT0 = 1.175                  # time of the first beat (bar 0 of the track) in seconds
BEAT = 0.4
BAR = BEAT * 4
TRANSPOSE = -6                 # synth layer: D major -> Ab major (relative of F minor)
MUS = dict(beat0=BEAT0, bar=BAR, tr=TRANSPOSE)
BAR_KEYS = ('s1', 'ch3', 'ch5', 's10', 'recap')   # scenes that must start on a bar line (groove enters / breakdown / drop / outro)
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
 ('hero', ('L', 2, 0.1), 'flash', None),
 ('s1', ('L', 2, 0.2), 'soft', None), ('s1', ('L', 3, 0.15), 'ding', None), ('s1', ('L', 4, 0.2), 'pop', None),
 ('s2', ('L', 1, 0.3), 'ding', None), ('s2', ('L', 3, 0.3), 'bubble', 700), ('s2', ('L', 4, 0.1), 'tick', 1.0),
 ('s2', ('L', 5, 0.1), 'hit', None),
 ('s3', ('L', 1, 0.2), 'pop', None), ('s3', ('L', 2, 0.2), 'soft', None), ('s3', ('L', 5, 0.5), 'hit', None),
 ('s3', ('L', 6, 0.3), 'flash', None),
 ('s4', ('L', 0, 0.2), 'thump', None), ('s4', ('L', 3, 0.1), 'whoosh', None), ('s4', ('L', 4, 0.3), 'pop', None),
 ('s4', ('L', 6, 0.2), 'soft', None),
 ('s5', ('L', 2, 0.3), 'hit', None), ('s5', ('L', 3, 0.2), 'ding', None), ('s5', ('L', 5, 0.5), 'flash', None),
 ('s5', ('L', 7, 0.2), 'grow', None),
 ('s6', ('L', 3, 0.2), 'repel', None), ('s6', ('L', 4, 0.4), 'soft', None), ('s6', ('L', 6, 0.3), 'thump', None),
 ('s7', ('L', 0, 0.1), 'soft', None), ('s7', ('L', 2, 0.1), 'ding', None), ('s7', ('L', 4, 0.2), 'hit', None),
 ('s7', ('L', 6, 0.1), 'pop', None),
 ('s8', ('L', 4, 0.3), 'ding', None), ('s8', ('L', 6, 0.1), 'soft', None), ('s8', ('L', 8, 0.5), 'repel', None),
 ('s9', ('L', 2, 0.2), 'tick', 1.0), ('s9', ('L', 5, 0.2), 'ding', None), ('s9', ('L', 6, 0.5), 'soft', None),
 ('s10', ('L', 0, 0.3), 'grow', None), ('s10', ('L', 2, 0.3), 'grow', None), ('s10', ('L', 4, 0.3), 'grow', None),
 ('s10', ('L', 6, 0.3), 'grow', None), ('s10', ('L', 8, 0.3), 'thump', None),
 ('s11', ('L', 0, 0.2), 'sun', None),
]
BED_SPEC = [
 ('wind',   'hero', ('T', 0), 'ch1', ('T', 0.3), [('hero', ('T', 0), 0.0), ('hero', ('T', 2.5), 0.10), ('hero', ('E', 0), 0.10)], 2.0, 1.2),
 ('shimmer', 's8', ('T', 0.5), 's9', ('E', 0), [('s8', ('T', 0.5), 0.0), ('s8', ('T', 6), 0.14), ('s9', ('E', 0), 0.08)], 1.5, 2.0),
 ('wind',   's11', ('T', 0), 'src', ('T', 3.0), [('s11', ('T', 0), 0.0), ('s11', ('T', 4), 0.10), ('src', ('T', 0.3), 0.0)], 1.5, 2.5),
]
# chord per scene (index into the engine's chord table): 0 Dadd9, 1 Bm9, 2 Gmaj9, 3 Asus2, 4 F#m9, 5 Emadd9
MUSIC_SPEC = [('hero', 1), ('ch1', 1), ('s1', 2), ('s2', 0), ('ch2', 4), ('s3', 4), ('s4', 1), ('ch3', 5), ('s5', 5), ('s6', 1),
              ('ch4', 4), ('s7', 1), ('ch5', 2), ('s8', 2), ('s9', 4), ('ch6', 0), ('s10', 0), ('s11', 3), ('recap', 2), ('src', 0)]

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
    s1, c3, c5, s10, rc = nb('s1'), nb('ch3'), nb('ch5'), nb('s10'), nb('recap')
    total = int(math.ceil(DUR / BAR)) + 1
    seq = list(range(16 - s1, 16))                         # intro build ends on the bar before the groove
    n1 = c3 - s1; seq += list(range(16, 16 + min(16, n1)))
    seq += [34 + j % 32 for j in range(max(0, n1 - 16))]   # groove B
    n2 = c5 - c3; seq += [66, 67, 68, 69] + list(range(70, 86))
    seq += [34 + j % 32 for j in range(max(0, n2 - 20))]   # the groove comes back
    n3 = s10 - c5
    if n3 >= 18:   # quiet bed: breakdown tail (2 bars) -> intro bars 0-12 looped at its quietest bar -> intro 0-15 (ends on the build into the drop)
        seq += [67, 68] + [j % 13 for j in range(n3 - 18)] + list(range(16))
    else: seq += list(range(16 - n3, 16))
    n4 = rc - s10; cl = list(range(86, 102))
    seq += (cl[:n4 - 16] + cl) if n4 > 16 else cl[16 - n4:]   # climax, ends on its last bar so the outro follows by itself
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
