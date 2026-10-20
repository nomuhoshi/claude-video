# -*- coding: utf-8 -*-
# CoreWeave · v2 引擎时间表。配乐 vibe.mp3（112.79 BPM，一拍 0.53194 s，一小节 2.12777 s，首拍 0.391 s）。
# 每行字幕起点落在拍上；章节卡和锚点幕落在小节线上；配乐按小节从原曲取段（MUS），自动补长。输出 tl.json
import json, math, re, itertools
from script_cw import SC, CHAP, TITLE
exec(open('sections_cw.py', encoding='utf-8').read())   # SRC

BEAT = 60 / 112.79; BAR = 4 * BEAT; EPH = 0.391
def up(t, q): return math.ceil(t / q - 1e-6) * q
def vis(tx): return re.sub(r'\{[brg]:([^}]*)\}', r'\1', tx).lstrip('!')
def wid(tx):            # 视觉宽度（汉字 = 1，ASCII ≈ 0.55）
    return sum(0.55 if ord(c) < 128 else 1.0 for c in vis(tx))

# ---------------- timing ----------------
TLs, IDX = [], {}
t = 0.0
for key, kind, draw, anchor, lines, hold in SC:
    if anchor or kind == 'chap': t = up(t, BAR)
    s = t; ls = []
    if kind == 'chap':
        e = s + 2 * BAR
    elif kind == 'src':
        e = s + hold * BEAT * 2
    else:
        c = s + (BEAT * 2 if kind == 's' and not anchor else (BEAT * 3 if kind == 'hero' else 0))
        for tx in lines:
            w = wid(tx); assert w <= 21.5 or tx.startswith('!'), (key, tx, w)
            d = max(2.0, 0.55 + w / 7.0) if not tx.startswith('!') else 2.4
            ls.append(round(c - s, 3)); c = up(c + d, BEAT)
        e = up(c + hold * BEAT, BEAT)
    IDX[key] = len(TLs)
    TLs.append(dict(key=key, k=kind, draw=draw, s=round(s, 3), e=round(e, 3), ls=ls))
    t = e
END = round(TLs[-1]['e'], 3)
def S(k): return TLs[IDX[k]]['s']
def Ee(k): return TLs[IDX[k]]['e']
def at(k, li, off=0.0): return round(TLs[IDX[k]]['s'] + TLs[IDX[k]]['ls'][li] + off, 3)

# ---------------- narration groups (≤4 lines stacked top-left) ----------------
groups = []
for (key, kind, draw, anchor, lines, hold), T in zip(SC, TLs):
    if kind not in ('s', 'hero') or not lines: continue
    n = len(lines); k = max(1, math.ceil(n / 4)); sizes = [n // k + (1 if j < n % k else 0) for j in range(k)]
    idx = 0; chunks = []
    for sz in sizes: chunks.append(list(range(idx, idx + sz))); idx += sz
    for ci, ch in enumerate(chunks):
        L = []
        for li in ch:
            tx = lines[li]; op = li > 0 and lines[li - 1].count('“') > lines[li - 1].count('”')
            st = 'big' if tx.startswith('!') else ('q' if tx.startswith('“') or op else 'n')
            L.append(dict(t=round(T['s'] + T['ls'][li], 3), st=st, tx=tx.lstrip('!')))
        gs = L[0]['t'] - 0.05
        ge = round(T['s'] + T['ls'][chunks[ci + 1][0]] - 0.02, 3) if ci + 1 < len(chunks) else T['e']
        groups.append(dict(s=round(gs, 3), e=round(ge, 3), lines=L))

# ---------------- chapters / crumbs ----------------
NUM = '一二三四五六'
chaps, crumbs = [], [dict(t=0.6, zh='公司介绍 · CoreWeave', en='COMPANY PROFILE  NASDAQ: CRWV')]
for i, T in enumerate(TLs):
    if T['k'] == 'chap':
        w, en, line = CHAP[T['key']]; n = len(chaps)
        chaps.append(dict(s=T['s'], e=T['e'], word=w, en=en, line=line, n='第%s章' % NUM[n]))
        crumbs.append(dict(t=T['s'], zh='第%s章 · %s' % (NUM[n], w), en='CH.%d  %s' % (n + 1, en)))
crumbs.append(dict(t=S('recap'), zh='回顾', en='RECAP'))
crumbs.append(dict(t=S('src'), zh='资料来源', en='SOURCES'))

# ---------------- effects ----------------
counters, slams, SHAKE, SFX = [], [], [], []
def put(n, t, g=1.0, p=0.0): SFX.append((n, round(t, 3), g, p))
def hit(t, g=0.9, shake=10, big=False):
    put('hit_drum' if big else 'hit_drum2', t, g); put('slam', t, g * (0.8 if big else 0.45))
    if shake: SHAKE.append((round(t, 3), shake))
def counter(label, a, b, unit, t0, t1, hide, col=None, land=None, pw=1.8, dec=0, ticks=True, tick_g=0.28):
    counters.append(dict(label=label, a=a, b=b, unit=unit, t0=round(t0, 3), t1=round(t1, 3), hide=round(hide, 3), col=col, land=land, pw=pw, dec=dec))
    if ticks:
        prev = None; n = int((t1 - t0) * 100)
        for f in range(n + 1):
            u = f / max(1, n); v = round(a + (b - a) * u ** pw, dec)
            if v != prev:
                if prev is not None and (not SFX or SFX[-1][1] < t0 + f / 100 - 0.05): put('count_tick', t0 + f / 100, tick_g, 0.3)
                prev = v
        put('count_roll', t1 - 0.6, 0.28, 0.2)
def slam(text, t, x, y, size, col='#ef5b43', dur=None, en=None):
    slams.append(dict(tx=text, t=round(t, 3), x=x, y=y, size=size, col=col, e=round(dur, 3) if dur else None, en=en))
def beat_after(t): return round(up(t, BEAT), 3)

for c in chaps: hit(c['s'], 0.95, 14, True); put('riser', c['s'] - 1.25, 0.35); put('sub_drop', c['s'], 0.55)

# hero
counter('在手订单', 0, 1040, '亿美元', at('hero', 0, 0.5), at('hero', 0, 2.6), at('hero', 3, -0.2), land='#f0bd5c', pw=2.2)
hit(at('hero', 0, 2.6), 0.8, 8)
hit(at('hero', 1, 1.0), 0.7, 6); hit(at('hero', 2, 1.0), 0.85, 10, True)
slam('利息 > 亏损', at('hero', 2, 1.3), 1380, 860, 84, '#ef5b43', at('hero', 3, -0.2))
slam('CoreWeave', at('hero', 3, 0.5), 1290, 540, 150, '#f2d39a', at('hero', 4, -0.1), 'NASDAQ · CRWV')
hit(at('hero', 3, 0.5), 1.0, 16, True); put('sub_drop', at('hero', 3, 0.5), 0.7)
put('whoosh_swing', at('hero', 4, 0.2), 0.4); hit(at('hero', 4, 1.6), 0.5, 4)
put('sub_pad', 0, 0.4)

# s1 mining: coins pop
for k in range(10): put('meteor_%d' % (1 + k % 6), at('s1', 2, 0.4 + 0.27 * k), 0.3, 0.25)
put('ui_ping_1', at('s1', 3, 0.8), 0.35)
# s2 gpu: thousands of cores light at once
put('sparkle_bed', at('s2', 3), 0.45); put('data_burst', at('s2', 3, 0.3), 0.4); hit(at('s2', 3, 0.3), 0.55, 5)
# s3 crash
put('downer', at('s3', 0, 0.3), 0.55); hit(at('s3', 1, 0.2), 0.7, 8)
put('riser', at('s3', 3) - 0.9, 0.3); hit(at('s3', 3, 0.3), 0.75, 8, True)
# s4 ai + IPO
put('sparkle_bed', at('s4', 2), 0.4)
for k in range(12): put('meteor_%d' % (1 + (k * 5) % 6), at('s4', 2, 0.2 + 0.12 * k), 0.26, 0.2)
counter('发行价', 0, 40, '美元', at('s4', 4, 0.2), at('s4', 4, 1.6), Ee('s4') - 0.3, land='#f0bd5c')
hit(at('s4', 3, 0.8), 0.8, 8, True)
# s5 sell
hit(at('s5', 1, 0.1), 0.9, 12, True); put('sub_drop', at('s5', 1, 0.1), 0.5)
for k in range(3): put('whoosh_swing', at('s5', 2 + k, 0.3), 0.25)
# s6 landlord
put('ui_ping_2', at('s6', 1, 0.6), 0.3); hit(at('s6', 4, 0.4), 0.6, 5)
# s7 scale
counter('数据中心', 0, 43, '个', at('s7', 0, 0.3), at('s7', 0, 2.2), at('s7', 1, 0.0), land='#f0bd5c')
counter('已签电力', 0, 3.7, '吉瓦', at('s7', 2, 0.1), at('s7', 2, 1.6), at('s7', 3, 2.4), land='#f0bd5c', dec=1)
hit(at('s7', 3, 1.3), 0.7, 6)
# s8 contract
hit(at('s8', 1, 0.6), 0.85, 10, True); put('ui_ping_3', at('s8', 3, 0.6), 0.4)
# s9 msft
counter('微软占收入', 0, 67, '%', at('s9', 1, 0.3), at('s9', 2, 0.8), at('s9', 4, 2.0), land='#ef5b43', pw=1.6)
hit(at('s9', 2, 0.8), 0.9, 12, True)
# s10 spread
counter('最大客户占比', 67, 36, '%', at('s10', 1, 0.3), at('s10', 1, 2.2), at('s10', 3, 2.4), land='#f0bd5c', pw=1.4)
hit(at('s10', 2, 0.6), 0.6, 5); hit(at('s10', 3, 0.6), 0.6, 5)
# s11 nvidia
put('whoosh_swing', at('s11', 1, 0.3), 0.3); put('whoosh_swing', at('s11', 2, 0.3), 0.3); hit(at('s11', 3, 0.6), 0.6, 5)
# s12 cost: price tags; the source pause bar sits under “钱从哪来？”
hit(at('s12', 1, 0.6), 0.5, 4)
# s13 borrow: the drop
hit(S('s13'), 1.0, 22, True); put('sub_drop', S('s13'), 0.9); put('data_burst', S('s13') + 0.05, 0.35)
counter('抵押借款', 0, 23, '亿美元', at('s13', 2, 0.2), at('s13', 2, 1.4), at('s13', 4, 2.0), land='#f0bd5c')
hit(at('s13', 1, 1.2), 0.75, 8)       # the lock snaps shut
# s14 debt
counter('债务 + 租约', 0, 520, '亿美元', at('s14', 1, 0.3), at('s14', 1, 2.6), at('s14', 2, 0.0), land='#ef5b43', pw=2.4)
hit(at('s14', 1, 2.6), 0.95, 14, True)
hit(at('s14', 2, 0.8), 0.6, 5); hit(at('s14', 4, 0.8), 0.6, 5)
# s15 interest
counter('季度利息', 2.7, 6.4, '亿美元', at('s15', 1, 0.6), at('s15', 1, 2.3), at('s15', 2, 2.2), land='#ef5b43', dec=1)
hit(at('s15', 1, 2.3), 0.85, 10, True); hit(at('s15', 3, 1.0), 0.55, 4); hit(at('s15', 4, 0.9), 0.9, 12, True)
# s16 aging
for k in range(6): put('hit_drum2', at('s16', 3, 0.3 + 0.27 * k), 0.35 + 0.05 * k)
# s17 bond
counter('债券收益率', 0, 15.0, '%', at('s17', 2, 0.2), at('s17', 2, 2.0), at('s17', 3, 0.0), land='#ef5b43', dec=1, pw=2.0)
hit(at('s17', 2, 2.0), 0.9, 12, True); put('downer', at('s17', 4, 0.4), 0.45)
# s18 post
put('ui_ping_1', at('s18', 0, 0.3), 0.4); put('ui_ping_2', at('s18', 2, 0.3), 0.4)
put('riser', at('s18', 3) - 1.1, 0.4)
slam('Yikes.', at('s18', 3, 0.1), 1380, 820, 150, '#ef5b43', Ee('s18') - 0.1)
hit(at('s18', 3, 0.1), 1.0, 20, True); put('sub_drop', at('s18', 3, 0.1), 0.8)
# s19 wood
slam('−15%', at('s19', 0, 0.9), 1500, 300, 130, '#ef5b43', at('s19', 1, 0.1)); hit(at('s19', 0, 0.9), 0.95, 16, True)
counter('ARK 买入', 0, 188665, '股', at('s19', 1, 0.6), at('s19', 1, 2.6), at('s19', 2, 0.0), land='#f0bd5c', pw=1.5, tick_g=0.22)
counter('ARK 两天合计', 188665, 381231, '股', at('s19', 2, 0.3), at('s19', 2, 1.9), at('s19', 5, 2.2), land='#f0bd5c', pw=1.2, tick_g=0.22)
hit(at('s19', 2, 1.9), 0.75, 8)
# s20 two views
hit(at('s20', 2, 0.6), 0.85, 12, True); hit(at('s20', 3, 0.6), 0.85, 12, True)
# s21 signals: one card per line
for k in range(4): hit(at('s21', 1 + k, 0.15), 0.55 + 0.05 * k, 4); put('ui_ping_%d' % (1 + k % 3), at('s21', 1 + k, 0.3), 0.3)
# s22 if/then
put('downer', at('s22', 0, 0.6), 0.35); put('sparkle_bed', at('s22', 2), 0.4); hit(at('s22', 2, 0.3), 0.7, 6)
# recap / sources
for k in range(4): put('ui_ping_%d' % (1 + k % 3), at('recap', k, 0.2), 0.4)
hit(at('recap', 3, 2.0), 0.7, 6)
for k in [S('c1'), S('c4'), S('c6')]: put('sub_pad', k + 0.5, 0.35)

# ---------------- era timeline ----------------
YRS = [('s1', 2017, 2017), ('s2', 2017, 2017), ('s3', 2018, 2019), ('s4', 2022, 2025)]
years = []
for key, y0, y1 in YRS: years.append([round(S(key) + 0.6, 3), y0]); years.append([round(Ee(key) - 0.6, 3), y1])
yvis = [[S('s1') - 0.3, Ee('s4') - 0.3]]

# ---------------- music: source bars under each video bar ----------------
def fill(seq, loop, n):
    out = list(seq[:n])
    for b in itertools.cycle(loop):
        if len(out) >= n: break
        out.append(b)
    return out
def nbars(a, b): return int(round((b - a) / BAR))
NB = int(math.ceil(END / BAR)) + 1
MUS = []
MUS += fill(range(0, 8), range(4, 8), nbars(0, S('c1')))                              # intro under the hook
MUS += fill(range(8, 40), range(24, 40), nbars(S('c1'), S('c4')))                     # groove A
n = nbars(S('c4'), S('s13')); MUS += fill(range(40, 47), range(43, 47), n - 1) + [47]   # the break, the pause bar right before “借”
MUS += fill(range(48, 64), range(56, 64), nbars(S('s13'), S('c5')))                   # drop on “借”
MUS += fill(range(64, 78), range(64, 72), nbars(S('c5'), S('c6')))                    # the climax under the Oct 13–16 chapter
MUS += fill(range(12, 40), range(24, 40), nbars(S('c6'), S('recap')))                 # groove A again
MUS += fill(range(74, 86), [85], NB - len(MUS))                                       # outro
assert abs(S('s13') / BAR - round(S('s13') / BAR)) < 1e-3

scenes = [dict(key=T['key'], k=T['k'], draw=T['draw'], s=T['s'], e=T['e'], ls=T['ls']) for T in TLs]
data = dict(end=END, groups=groups, chaps=chaps, crumbs=crumbs, counters=counters, slams=slams, shake=sorted(SHAKE),
            sfx=sorted(SFX, key=lambda x: x[1]), years=years, yvis=yvis, ticks=[2017, 2019, 2022, 2025], yr0=2016, yr1=2026,
            scenes=scenes, idx=IDX, src=[[a, b] for a, b, *_ in SRC], title=TITLE, mus=MUS, bar=BAR, eph=EPH)
json.dump(data, open('tl.json', 'w'), ensure_ascii=False)
if __name__ == '__main__':
    print('dur %.1f s (%d:%04.1f)  groups %d  sfx %d  bars %d' % (END, END // 60, END % 60, len(groups), len(SFX), len(MUS)))
    for T in TLs: print('%-6s %-5s %6.1f %6.1f  (%4.1f)' % (T['key'], T['k'], T['s'], T['e'], T['e'] - T['s']))
