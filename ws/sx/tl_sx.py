# -*- coding: utf-8 -*-
# SpaceX 财报 · v2 引擎时间表（不出章节卡）。配乐 vibe.mp3（112.79 BPM，一拍 0.53194 s，一小节 2.12777 s，首拍 0.391 s）。
# 每行字幕起点落在拍上；锚点幕（hero、s1、s9、s12、recap）落在小节线上；配乐按小节从原曲取段（MUS）。输出 tl.json
import json, math, re, itertools
from script_sx import SC, TITLE
exec(open('sections_sx.py', encoding='utf-8').read())   # SRC

BEAT = 60 / 112.79; BAR = 4 * BEAT; EPH = 0.391
def up(t, q): return math.ceil(t / q - 1e-6) * q
def vis(tx): return re.sub(r'\{[brg]:([^}]*)\}', r'\1', tx).lstrip('!')
def wid(tx): return sum(0.55 if ord(c) < 128 else 1.0 for c in vis(tx))

# ---------------- timing ----------------
TLs, IDX = [], {}
t = 0.0
for key, kind, draw, anchor, lines, hold in SC:
    if anchor: t = up(t, BAR)
    s = t; ls = []
    if kind == 'src':
        e = s + hold * BEAT * 2
    else:
        c = s + (BEAT * 2 if kind == 's' and not anchor else (BEAT * 3 if kind == 'hero' else (BEAT if kind == 's' else 0)))
        for tx in lines:
            w = wid(tx)
            lim = 12 if tx.startswith('!') else (14 if tx.startswith('“') else 18.5)
            assert w <= lim, (key, tx, w)
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

# no chapter cards; a single constant breadcrumb (the user does not want chapters announced)
chaps = []
crumbs = [dict(t=0.6, zh='财报解读 · SpaceX', en='Q3 2026 EARNINGS  SPACEX · NASDAQ: SPCX'), dict(t=S('src'), zh='资料来源', en='SOURCES')]

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
            u = f / max(1, n); v = round(a + (b - a) * u ** pw, max(0, dec - 1))
            if v != prev:
                if prev is not None and (not SFX or SFX[-1][1] < t0 + f / 100 - 0.05): put('count_tick', t0 + f / 100, tick_g, 0.3)
                prev = v
        put('count_roll', t1 - 0.6, 0.28, 0.2)
def slam(text, t, x, y, size, col='#ef5b43', dur=None, en=None):
    slams.append(dict(tx=text, t=round(t, 3), x=x, y=y, size=size, col=col, e=round(dur, 3) if dur else None, en=en))

# hero
counter('季度收入', 0, 145.8, '亿美元', at('hero', 2, 0.2), at('hero', 2, 2.2), at('hero', 4, -0.1), land='#f0bd5c', dec=1, pw=2.0)
hit(at('hero', 0, 0.2), 0.6, 4); hit(at('hero', 2, 2.2), 0.9, 12, True)
slam('×2.6', at('hero', 3, 0.3), 1300, 620, 150, '#f0bd5c', at('hero', 4, -0.1)); hit(at('hero', 3, 0.3), 1.0, 16, True); put('sub_drop', at('hero', 3, 0.3), 0.7)
counter('净利润', 0, 44.0, '亿美元', at('hero', 4, 0.3), at('hero', 4, 1.9), at('hero', 5, -0.1), land='#f0bd5c', dec=1)
hit(at('hero', 4, 1.9), 0.85, 10, True)
put('downer', at('hero', 5, 0.2), 0.5); slam('−196 亿', at('hero', 5, 0.6), 1360, 600, 150, '#ef5b43', at('hero', 6, -0.1), 'CAPEX · Q3 2026'); hit(at('hero', 5, 0.6), 1.0, 18, True); put('sub_drop', at('hero', 5, 0.6), 0.7)
put('ui_ping_1', at('hero', 6, 0.3), 0.35)
put('sub_pad', 0, 0.4)
# s1 who
put('riser', S('s1') - 1.2, 0.3); hit(S('s1'), 0.8, 8, True)
hit(at('s1', 2, 0.4), 0.5, 3); put('whoosh_swing', at('s1', 3, 0.3), 0.35); hit(at('s1', 3, 1.0), 0.6, 5)
for k in range(3): put('ui_ping_%d' % (1 + k), at('s1', 5 + k, 0.3), 0.38)
# s2 rev
for k in range(3): hit(at('s2', 1 + k, 0.4), 0.5 + 0.15 * k, 3 + 3 * k, k == 2)
hit(at('s2', 5, 0.8), 0.9, 12, True); put('sub_drop', at('s2', 5, 0.8), 0.5); hit(at('s2', 7, 0.8), 0.8, 10, True)
# s3 si
hit(at('s3', 1, 0.1), 0.9, 12, True); put('data_burst', at('s3', 2, 0.3), 0.3)
counter('算力装机', 0.6, 1.7, '吉瓦', at('s3', 5, 0.2), at('s3', 5, 1.6), at('s3', 7, 2.0), land='#f0bd5c', dec=1)
hit(at('s3', 5, 1.6), 0.8, 8); put('sparkle_bed', at('s3', 7, 0.3), 0.35)
# s4 op
hit(at('s4', 1, 0.5), 0.6, 5); hit(at('s4', 3, 0.5), 0.9, 12, True); hit(at('s4', 4, 0.5), 0.5, 3); put('downer', at('s4', 5, 0.4), 0.4); hit(at('s4', 7, 0.8), 0.7, 6)
# s5 net
counter('净利润', 0, 44.0, '亿美元', at('s5', 1, 0.2), at('s5', 1, 1.6), at('s5', 4, 1.6), land='#f0bd5c', dec=1, ticks=False)
put('ui_ping_2', at('s5', 3, 0.4), 0.35); put('ui_ping_3', at('s5', 4, 0.4), 0.35); put('downer', at('s5', 6, 0.3), 0.45); hit(at('s5', 6, 1.0), 0.8, 10, True)
# s6 starlink
counter('星链个人用户', 0, 1360, '万', at('s6', 1, 0.2), at('s6', 1, 1.8), at('s6', 4, 0.0), land='#f0bd5c')
hit(at('s6', 3, 0.8), 0.7, 6); put('downer', at('s6', 3, 0.4), 0.35); put('ui_ping_1', at('s6', 4, 0.4), 0.35)
# s7 ship
put('riser', at('s7', 1, -0.6), 0.35); hit(at('s7', 1, 0.8), 0.9, 12, True); put('whoosh_swing', at('s7', 2, 0.3), 0.4)
for k in range(8): put('meteor_%d' % (1 + k % 6), at('s7', 2, 0.4 + 0.15 * k), 0.24, 0.25)
hit(at('s7', 4, 1.2), 0.7, 6)
# s8 question -> the pause bar
put('riser', S('s9') - 1.3, 0.5)
# s9 capex: the drop
hit(S('s9'), 1.0, 22, True); put('sub_drop', S('s9'), 0.9); put('data_burst', S('s9') + 0.05, 0.35)
counter('资本开支 · 三季度', 0, 195.9, '亿美元', at('s9', 1, 0.2), at('s9', 1, 2.0), at('s9', 3, 2.2), land='#ef5b43', dec=1, pw=2.0)
hit(at('s9', 1, 2.0), 0.9, 12, True); hit(at('s9', 2, 0.8), 0.7, 6); hit(at('s9', 5, 0.8), 0.9, 14, True); put('downer', at('s9', 6, 0.3), 0.4); hit(at('s9', 7, 0.6), 0.9, 12, True)
# s10 cash
counter('现金和证券', 0, 899, '亿美元', at('s10', 1, 0.3), at('s10', 1, 2.0), at('s10', 3, 0.0), land='#f0bd5c')
hit(at('s10', 2, 0.6), 0.6, 5); put('ui_ping_2', at('s10', 4, 0.4), 0.35); hit(at('s10', 6, 0.6), 0.7, 6)
# s11 guide
counter('明年一季度收入 · 指引上限', 0, 370, '亿美元', at('s11', 2, 0.1), at('s11', 2, 1.8), at('s11', 4, 0.0), land='#f0bd5c')
hit(at('s11', 3, 0.6), 0.9, 12, True); put('ui_ping_1', at('s11', 4, 0.4), 0.35); hit(at('s11', 5, 0.8), 0.8, 8)
# s12 value: the climax
hit(S('s12'), 1.0, 18, True); put('sub_drop', S('s12'), 0.8)
counter('市销率 · 本季收入 ×4', 0, 34, '倍', at('s12', 3, 0.3), at('s12', 3, 1.8), at('s12', 4, 0.0), land='#ef5b43')
counter('市销率 · 明年一季度指引 ×4', 34, 14, '倍', at('s12', 4, 0.3), at('s12', 4, 1.8), at('s12', 6, 2.2), land='#f0bd5c', pw=1.2)
hit(at('s12', 4, 1.8), 0.85, 10, True)
# s13 bet
hit(at('s13', 1, 0.1), 0.95, 14, True); put('sparkle_bed', at('s13', 3, 0.3), 0.35)
put('downer', at('s13', 4, 0.4), 0.45); hit(at('s13', 5, 1.0), 0.8, 10); hit(at('s13', 7, 1.0), 0.9, 12, True)
# s14 checklist
for k in range(3): put('ui_ping_%d' % (1 + k), at('s14', 2 + k, 0.3), 0.4); hit(at('s14', 2 + k, 0.3), 0.45, 3)
hit(at('s14', 5, 0.3), 0.6, 5); hit(at('s14', 6, 0.3), 0.6, 5); hit(at('s14', 7, 0.5), 0.9, 12, True)
# s15 next
for k in range(3): put('ui_ping_%d' % (1 + k), at('s15', 1 + k, 0.3), 0.35)
hit(at('s15', 4, 0.3), 0.6, 5)
# recap
for k in range(4): put('ui_ping_%d' % (1 + k % 3), at('recap', k, 0.2), 0.4)
hit(at('recap', 3, 2.0), 0.7, 6)
for k in [S('s3'), S('s9'), S('s14')]: put('sub_pad', k + 0.5, 0.35)

# no era timeline in an earnings video
years, yvis = [], []

# ---------------- music ----------------
def fill(seq, loop, n):
    out = list(seq[:n])
    for b in itertools.cycle(loop):
        if len(out) >= n: break
        out.append(b)
    return out
def nbars(a, b): return int(round((b - a) / BAR))
NB = int(math.ceil(END / BAR)) + 1
MUS = []
MUS += fill(range(0, 8), range(4, 8), nbars(0, S('s1')))                                   # intro under the hook
n = nbars(S('s1'), S('s9')); MUS += fill(range(8, 40), range(24, 40), n - 8) + list(range(40, 48))   # groove A, then the break; bar 47 (pause) under “这些收入，是拿什么换来的？”
MUS += fill(range(48, 64), range(56, 64), nbars(S('s9'), S('s12')))                        # drop on “花钱，比赚钱快”
MUS += fill(range(64, 78), range(64, 72), nbars(S('s12'), S('recap')))                      # climax under “贵不贵 / 押什么”
MUS += fill(range(74, 86), [85], NB - len(MUS))                                             # outro
for k in ('s1', 's9', 's12', 'recap'): assert abs(S(k) / BAR - round(S(k) / BAR)) < 1e-3, k

scenes = [dict(key=T['key'], k=T['k'], draw=T['draw'], s=T['s'], e=T['e'], ls=T['ls']) for T in TLs]
data = dict(end=END, groups=groups, chaps=chaps, crumbs=crumbs, counters=counters, slams=slams, shake=sorted(SHAKE),
            sfx=sorted(SFX, key=lambda x: x[1]), years=years, yvis=yvis, ticks=[], yr0=2025, yr1=2027,
            scenes=scenes, idx=IDX, src=[[a, b] for a, b, *_ in SRC], title=TITLE, mus=MUS, bar=BAR, eph=EPH)
json.dump(data, open('tl.json', 'w'), ensure_ascii=False)
if __name__ == '__main__':
    print('dur %.1f s (%d:%04.1f)  groups %d  sfx %d  bars %d' % (END, END // 60, END % 60, len(groups), len(SFX), len(MUS)))
    for T in TLs: print('%-6s %-5s %6.1f %6.1f  (%4.1f)  bar %.2f' % (T['key'], T['k'], T['s'], T['e'], T['e'] - T['s'], T['s'] / BAR))
