# -*- coding: utf-8 -*-
# 闪迪 · v2 引擎时间表（不出章节卡）。配乐 vibe.mp3（112.79 BPM，一拍 0.53194 s，一小节 2.12777 s，首拍 0.391 s）。
# 每行字幕起点落在拍上；锚点幕（hero、s1、s11、s14、recap）落在小节线上；配乐按小节从原曲取段（MUS）。输出 tl.json
import json, math, re, itertools
from script_sd import SC, TITLE
exec(open('sections_sd.py', encoding='utf-8').read())   # SRC

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
crumbs = [dict(t=0.6, zh='公司介绍 · 闪迪', en='COMPANY PROFILE  SANDISK · NASDAQ: SNDK'), dict(t=S('src'), zh='资料来源', en='SOURCES')]

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

# hero: the price climbs 27.89 -> 2354.39
counter('股价', 27.89, 2354.39, '美元', at('hero', 1, 0.2), at('hero', 2, 2.6), at('hero', 4, -0.2), land='#ef5b43', pw=4.0, dec=2)
hit(at('hero', 1, 1.0), 0.6, 4); hit(at('hero', 2, 2.6), 0.9, 12, True)
slam('×84', at('hero', 3, 0.3), 1480, 330, 150, '#f0bd5c', at('hero', 4, -0.2)); hit(at('hero', 3, 0.3), 1.0, 16, True); put('sub_drop', at('hero', 3, 0.3), 0.7)
put('whoosh_swing', at('hero', 4, 0.3), 0.4)
slam('闪迪', at('hero', 5, 0.4), 1340, 560, 170, '#f2d39a', at('hero', 6, -0.1), 'SANDISK · NASDAQ: SNDK')
hit(at('hero', 5, 0.4), 1.0, 16, True); put('sub_drop', at('hero', 5, 0.4), 0.6)
put('ui_ping_1', at('hero', 6, 0.3), 0.35); put('ui_ping_2', at('hero', 7, 0.3), 0.35)
put('sub_pad', 0, 0.4)
# s1 origin
put('riser', S('s1') - 1.2, 0.3); hit(S('s1'), 0.8, 8, True)
put('sparkle_bed', at('s1', 2, 0.2), 0.4); hit(at('s1', 6, 0.6), 0.6, 5)
# s2 cards
for k in range(3): hit(at('s2', k, 0.3), 0.5, 3)
for k in range(8): put('meteor_%d' % (1 + k % 6), at('s2', 2, 0.2 + 0.15 * k), 0.26, 0.25)
# s3 fab
put('whoosh_swing', at('s3', 0, 0.4), 0.3); put('ui_ping_3', at('s3', 3, 0.6), 0.35); hit(at('s3', 4, 0.6), 0.5, 4)
# s4 spin
hit(at('s4', 1, 0.6), 0.7, 6); put('whoosh_swing', at('s4', 2, 0.4), 0.35); put('downer', at('s4', 4, 0.5), 0.45); hit(at('s4', 4, 1.6), 0.6, 6)
# s5 nand
hit(at('s5', 1, 0.1), 0.9, 12, True); put('sub_drop', at('s5', 1, 0.1), 0.5)
# s6 segments
for k in range(3): put('ui_ping_%d' % (1 + k), at('s6', 1 + k, 0.3), 0.35)
hit(at('s6', 4, 1.0), 0.7, 8)
# s7 ai
counter('企业级 SSD 需求', 0, 80, '%', at('s7', 4, 0.2), at('s7', 4, 1.8), at('s7', 5, 0.0), land='#f0bd5c')
counter('数据中心季度收入', 0, 29.8, '亿美元', at('s7', 5, 0.3), at('s7', 5, 2.2), at('s7', 6, 2.2), land='#f0bd5c', dec=1)
hit(at('s7', 6, 0.8), 0.85, 10, True)
# s8 price
hit(at('s8', 0, 1.2), 0.7, 6)
counter('季度收入', 0, 89.7, '亿美元', at('s8', 3, 0.3), at('s8', 3, 2.2), at('s8', 5, 2.4), land='#f0bd5c', dec=1, pw=2.2)
hit(at('s8', 4, 0.8), 0.9, 12, True); hit(at('s8', 5, 1.4), 0.6, 5)
# s9 margin
counter('毛利率', 0, 84.6, '%', at('s9', 1, 0.3), at('s9', 1, 2.0), at('s9', 3, 0.0), land='#f0bd5c', dec=1)
hit(at('s9', 1, 2.0), 0.9, 12, True); hit(at('s9', 2, 0.8), 0.5, 4)
put('downer', at('s9', 3, 0.5), 0.4); hit(at('s9', 4, 1.0), 1.0, 16, True); put('sub_drop', at('s9', 4, 1.0), 0.6)
# s10 question -> the pause bar
put('riser', S('s11') - 1.3, 0.5)
# s11 cycle: the drop
hit(S('s11'), 1.0, 22, True); put('sub_drop', S('s11'), 0.9); put('data_burst', S('s11') + 0.05, 0.35)
put('downer', at('s11', 2, 0.4), 0.5); hit(at('s11', 4, 0.8), 0.9, 14, True); hit(at('s11', 5, 0.8), 0.8, 10)
# s12 now
put('ui_ping_1', at('s12', 2, 0.6), 0.4); put('downer', at('s12', 4, 0.6), 0.4); hit(at('s12', 5, 0.8), 0.5, 4)
# s13 contracts
for k in range(8): put('hit_drum2', at('s13', 1, 0.4 + 0.18 * k), 0.3 + 0.03 * k)
counter('客户保证金', 0, 165, '亿美元', at('s13', 3, 0.2), at('s13', 3, 1.9), at('s13', 6, 2.0), land='#f0bd5c')
hit(at('s13', 4, 0.6), 0.6, 5); hit(at('s13', 5, 0.6), 0.7, 6); put('downer', at('s13', 6, 0.5), 0.4)
# s14 value: the climax
hit(S('s14'), 1.0, 18, True); put('sub_drop', S('s14'), 0.8)
counter('市盈率 · 过去一年利润', 0, 19, '倍', at('s14', 2, 0.3), at('s14', 2, 1.8), at('s14', 3, 0.0), land='#86b6ff')
counter('市盈率 · 本季指引 ×4', 19, 8, '倍', at('s14', 3, 0.3), at('s14', 3, 1.8), at('s14', 5, 2.2), land='#f0bd5c', pw=1.2)
hit(at('s14', 3, 1.8), 0.85, 10, True)
# s15 bet
hit(at('s15', 1, 0.1), 0.95, 14, True); put('sparkle_bed', at('s15', 3, 0.3), 0.35)
put('downer', at('s15', 4, 0.4), 0.45); hit(at('s15', 5, 1.0), 0.8, 10); hit(at('s15', 6, 1.0), 0.9, 12, True)
# s16 checklist
for k in range(3): put('ui_ping_%d' % (1 + k), at('s16', 2 + k, 0.3), 0.4); hit(at('s16', 2 + k, 0.3), 0.45, 3)
hit(at('s16', 5, 0.3), 0.6, 5); hit(at('s16', 6, 0.3), 0.6, 5); hit(at('s16', 7, 0.5), 0.9, 12, True)
# s17 earnings
for k in range(3): put('ui_ping_%d' % (1 + k), at('s17', 2 + k, 0.3), 0.35)
hit(at('s17', 5, 0.3), 0.6, 5)
# recap
for k in range(4): put('ui_ping_%d' % (1 + k % 3), at('recap', k, 0.2), 0.4)
hit(at('recap', 3, 2.0), 0.7, 6)
for k in [S('s5'), S('s11'), S('s16')]: put('sub_pad', k + 0.5, 0.35)

# ---------------- era timeline (history scenes) ----------------
YRS = [('s1', 1988, 1991), ('s2', 1995, 2005), ('s3', 2000, 2000), ('s4', 2016, 2025)]
years = []
for key, y0, y1 in YRS: years.append([round(S(key) + 0.6, 3), y0]); years.append([round(Ee(key) - 0.6, 3), y1])
yvis = [[S('s1') - 0.3, Ee('s4') - 0.3]]

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
n = nbars(S('s1'), S('s11')); MUS += fill(range(8, 40), range(24, 40), n - 8) + list(range(40, 48))   # groove A, then the break; bar 47 (pause) under “涨价会一直涨下去吗？”
MUS += fill(range(48, 64), range(56, 64), nbars(S('s11'), S('s14')))                        # drop on “存储是周期生意”
MUS += fill(range(64, 78), range(64, 72), nbars(S('s14'), S('recap')))                      # climax under “押什么”
MUS += fill(range(74, 86), [85], NB - len(MUS))                                             # outro
for k in ('s1', 's11', 's14', 'recap'): assert abs(S(k) / BAR - round(S(k) / BAR)) < 1e-3, k

scenes = [dict(key=T['key'], k=T['k'], draw=T['draw'], s=T['s'], e=T['e'], ls=T['ls']) for T in TLs]
data = dict(end=END, groups=groups, chaps=chaps, crumbs=crumbs, counters=counters, slams=slams, shake=sorted(SHAKE),
            sfx=sorted(SFX, key=lambda x: x[1]), years=years, yvis=yvis, ticks=[1988, 2000, 2016, 2025], yr0=1985, yr1=2027,
            scenes=scenes, idx=IDX, src=[[a, b] for a, b, *_ in SRC], title=TITLE, mus=MUS, bar=BAR, eph=EPH)
json.dump(data, open('tl.json', 'w'), ensure_ascii=False)
if __name__ == '__main__':
    print('dur %.1f s (%d:%04.1f)  groups %d  sfx %d  bars %d' % (END, END // 60, END % 60, len(groups), len(SFX), len(MUS)))
    for T in TLs: print('%-6s %-5s %6.1f %6.1f  (%4.1f)  bar %.2f' % (T['key'], T['k'], T['s'], T['e'], T['e'] - T['s'], T['s'] / BAR))
