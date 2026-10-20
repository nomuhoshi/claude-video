# -*- coding: utf-8 -*-
# Timeline for the style-v2 test piece: "开普勒 · 八角分" (about 69 s).
# Everything sits on the music's bar grid (Entropy, 150 BPM: beat 0.4 s, bar 1.6 s),
# so the hits, the counter and the text all land on beats.
# Markup inside a line: {b:蓝色关键词} {r:红色} {g:金色}.  Line styles: n = normal, q = quote, big = one big word.
import json
BAR = 1.6
def J(j, beat=0): return round(j * BAR + beat * 0.4, 3)

# text groups: (start, end, [(t, style, text)])
G = [
 (J(0), J(4), [(0.4, 'n', '1601 年，{g:第谷}去世。'), (2.0, 'n', '他二十多年的火星记录，'), (3.6, 'n', '落到了{b:开普勒}手里。')]),
 (J(4), J(9), [(J(4), 'n', '开普勒先用{b:正圆}去套：'), (8.8, 'n', '圆心挪一挪，速度调一调，'), (11.2, 'n', '算一遍，不对，{r:再算一遍}。')]),
 (J(9), J(12), [(14.4, 'n', '他在书里写：'), (15.2, 'q', '“你若嫌这算法冗长，'), (16.4, 'q', '就可怜可怜我吧：'), (17.6, 'q', '我至少算了{r:七十遍}。”')]),
 (J(12), J(15), [(19.2, 'n', '大部分观测，都对上了。'), (22.4, 'n', '可有几处，偏了——')]),
 (J(15), J(23), [(24.0, 'big', '{r:八角分}。'), (27.2, 'n', '第谷的误差，只有{b:两角分}左右。'), (30.4, 'n', '八角分，是它的{r:四倍}。'), (33.6, 'n', '这{r:不可能}是看错了。')]),
 (J(23), J(30), [(36.8, 'n', '他写道：'), (38.4, 'q', '“单单这{r:八角分}，'), (40.8, 'q', '就将带领我们{b:改革整个天文学}。”')]),
 (J(30), J(33), [(48.0, 'n', '他放弃了{b:正圆}。'), (50.4, 'n', '1605 年，他终于想通了：')]),
 (J(33), J(38), [(52.8, 'n', '火星走的，是一个{g:椭圆}。'), (56.0, 'n', '太阳不在正中，'), (57.6, 'n', '而在它的一个{g:焦点}上。')]),
]
END = J(43)          # 68.8 s
CARD = J(38)         # end card: 椭圆 / THE ELLIPSE

# ---- scene clock (visual) ----
SCN = dict(A=(0, J(4)), B=(J(4), J(12)), C=(J(12), J(15)), D=(J(15), J(23)), E=(J(23), J(30)), F=(J(30), J(33)), G=(J(33), END))

# ---- counter in scene B: 1 -> 70, accelerating, lands on 17.6 ----
C0, C1 = 8.8, 17.6
def count_at(t):
    if t < C0: return 0
    u = min(1, (t - C0) / (C1 - C0)); return max(1, min(70, int(1 + 69 * u ** 2.4)))

# ---- sounds: (name, t, gain, pan) from sfx_ref_lib ----
S = []
def put(n, t, g=1.0, p=0.0): S.append((n, round(t, 3), g, p))
# A: a glass ping for each recorded position, every half beat
for k in range(14): put('meteor_%d' % (1 + k % 6), 1.0 + 0.4 * k, 0.55, 0.25)
put('sparkle_bed', 0.0, 0.35); put('sparkle_bed', 4.0, 0.3)
# B: caning-style hits, accelerating with the counter, then the roll and the landing slam
hits = [8.8, 9.6, 10.4, 11.2, 11.6, 12.0, 12.4, 12.8, 13.2, 13.6, 14.0, 14.2, 14.4, 14.6, 14.8, 15.0, 15.2, 15.4, 15.6, 15.8, 16.0, 16.2]
for i, t in enumerate(hits): put('hit_cane' if i % 2 == 0 else 'hit_cane2', t - 0.24, 0.75 - 0.012 * i, 0.12 if i % 2 else -0.12)  # the cane's crack sits 0.24 s into the sample
prev = 0
for f in range(int(C0 * 100), int(C1 * 100) + 1):
    n = count_at(f / 100)
    if n != prev and f / 100 < 16.3: put('count_tick', f / 100, 0.35, 0.3); prev = n
put('count_roll', 16.3, 0.45, 0.2); put('slam', 17.6, 1.0); put('hit_drum', 17.6, 0.8)
# C: tension into the music's break, a riser into the drop
put('downer', 19.2, 0.4); put('riser', 21.0, 0.5); put('sub_pad', 22.4, 0.7)
# D: the 8' slam on the drop, then the bars
put('slam', 24.0, 1.0); put('hit_drum', 24.0, 0.95); put('sub_drop', 24.0, 0.8); put('data_burst', 24.05, 0.35)
for k in range(2): put('count_tick', 27.6 + 0.2 * k, 0.4, -0.2)
put('ui_ping_1', 28.0, 0.4)
for k in range(8): put('hit_drum2' if k % 2 else 'hit_drum', 30.8 + 0.4 * k, 0.42 + 0.04 * k, 0.0)   # one drum per arc-minute
put('ui_ping_2', 34.0, 0.45); put('hit_drum', 33.6, 0.85)
# E: the scroll unrolls, the seal stamps
put('whoosh_swing', 36.7, 0.6); put('hit_drum', 44.0, 1.0); put('slam', 44.0, 0.6)
# F: the circle breaks apart
put('downer', 48.0, 0.55); put('sparkle_bed', 48.2, 0.45)
# G: the ellipse arrives on the drop; every recorded point lights up as the curve passes it
put('sub_drop', 52.8, 0.9); put('slam', 52.8, 0.75); put('data_burst', 52.9, 0.4)
for k in range(14): put('meteor_%d' % (1 + (k * 2) % 6), 53.0 + 0.1 * k, 0.4, 0.25)
for k in range(8): put('count_tick', 54.0 + 0.25 * k, 0.32, 0.3)   # the error counts down 8' -> 0'
put('ui_ping_3', 56.0, 0.5)
put('riser', 59.3, 0.45); put('slam', CARD, 0.9); put('hit_drum', CARD, 0.9); put('sub_drop', CARD, 0.7)
put('sparkle_bed', CARD + 0.2, 0.5)
for t in [0, 11.4, 30.0, 41.4, 57.0]: put('sub_pad', t, 0.5)

# ---- screen shakes (t, px) ----
SHAKE = [(17.6, 10), (24.0, 22), (33.6, 8), (44.0, 14), (52.8, 12), (CARD, 14)] + [(t, 3 + 0.18 * i) for i, t in enumerate(hits)]

# ---- music: which source bars of Entropy play under each demo bar ----
MUS = list(range(2, 6)) + list(range(6, 16)) + [32] + list(range(33, 48)) + [66, 67, 68] + list(range(69, 79))
assert len(MUS) == 43, len(MUS)

data = dict(groups=[dict(s=s, e=e, lines=[dict(t=t, st=st, tx=tx) for t, st, tx in L]) for s, e, L in G],
            end=END, card=CARD, scn=SCN, c0=C0, c1=C1, shake=SHAKE, sfx=S, mus=MUS, bar=BAR)
json.dump(data, open('tl.json', 'w'), ensure_ascii=False, indent=0)
print('end', END, 'sfx', len(S))
