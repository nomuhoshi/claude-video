# -*- coding: utf-8 -*-
# 逻辑斯蒂映射 · v2 引擎时间表（不出章节卡）。配乐 vibe.mp3（112.79 BPM，一拍 0.53194 s，一小节 2.12777 s，首拍 0.391 s）。
# 每行旁白起点落在拍上；锚点幕（hero、s1、s10、s12、recap）落在小节线上；配乐按小节从原曲取段（MUS）。输出 tl.json
# 蛛网图的每一步（WEBS）在这里排好时间，画面和音效共用同一张表，保证声画同步。
import json, math, re, itertools
from script_lg import SC, TITLE
exec(open('sections_lg.py', encoding='utf-8').read())   # SRC

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

chaps = []
crumbs = [dict(t=S('hero') + 0.4, zh='混沌 · 一个简单的公式', en='THE LOGISTIC MAP  x → a·x(1−x)'), dict(t=S('src'), zh='资料来源', en='SOURCES')]

# ---------------- effects ----------------
counters, slams, SHAKE, SFX = [], [], [], []
def put(n, t, g=1.0, p=0.0): SFX.append((n, round(t, 3), g, p))
def hit(t, g=0.9, shake=10, big=False):
    put('hit_drum' if big else 'hit_drum2', t, g); put('slam', t, g * (0.8 if big else 0.45))
    if shake: SHAKE.append((round(t, 3), shake))
def counter(label, a, b, unit, t0, t1, hide, col=None, land=None, pw=1.8, dec=0, ticks=True, tick_g=0.22, endtxt=None):
    counters.append(dict(label=label, a=a, b=b, unit=unit, t0=round(t0, 3), t1=round(t1, 3), hide=round(hide, 3), col=col, land=land, pw=pw, dec=dec, endtxt=endtxt))
    if ticks:
        prev = None; n = int((t1 - t0) * 100)
        for f in range(n + 1):
            u = f / max(1, n); v = round(a + (b - a) * u ** pw, max(0, dec - 1))
            if v != prev:
                if prev is not None and (not SFX or SFX[-1][1] < t0 + f / 100 - 0.05): put('count_tick', t0 + f / 100, tick_g, 0.3)
                prev = v
        put('count_roll', t1 - 0.6, 0.24, 0.2)
def slam(text, t, x, y, size, col='#ef5b43', dur=None, en=None):
    slams.append(dict(tx=text, t=round(t, 3), x=x, y=y, size=size, col=col, e=round(dur, 3) if dur else None, en=en))

# ---- cobweb runs: (scene, t0, a, x0, n, dt). Each step = vertical to the curve, then horizontal to the diagonal.
WEBS = []
def web(sc, t0, a, x0, n, dt, sound=0.16, first=None):
    WEBS.append(dict(sc=sc, t0=round(t0, 3), a=a, x0=x0, n=n, dt=dt, first=first))
    f = first or dt
    for k in range(n):                        # step k starts at t0 (k = 0) or t0 + first + (k − 1)·dt; it turns the corner half-way
        tk = t0 if k == 0 else t0 + f + (k - 1) * dt; dk = f if k == 0 else dt
        if sound and dt >= 0.1: put('count_tick', tk + dk * 0.5, sound * (1 if k < 3 else 0.7), 0.25)
# s2: show the recipe slowly — first step takes two narration lines, then quick
web('s2', at('s2', 2, 0.2), 2.6, 0.12, 9, 0.42, first=at('s2', 4, 0.0) - at('s2', 2, 0.2))
web('s3', at('s3', 1, 0.0), 0.8, 0.72, 12, 0.34)
web('s4', at('s4', 0, 0.2), 2.0, 0.08, 7, 0.36)
web('s4', at('s4', 1, 0.2), 2.8, 0.08, 30, 0.2)
web('s6', at('s6', 0, 0.3), 3.2, 0.2, 40, 0.16)
web('s7', at('s7', 0, 0.3), 3.5, 0.2, 48, 0.12)
web('s7', at('s7', 2, 0.1), 3.55, 0.2, 60, 0.1)
web('s8', at('s8', 0, 0.2), 3.7, 0.2, 150, 0.075, sound=0)

# hero: two runs of a = 3.9 from 0.4 and 0.4000001; step 25 (they part) lands on line 4
HSTEP0 = at('hero', 1, 0.2); HDT = (at('hero', 4, 0.6) - HSTEP0) / 25
hero = dict(t0=round(HSTEP0, 3), dt=round(HDT, 4), a=3.9, n=50)
for k in range(0, 50, 2): put('count_tick', HSTEP0 + k * HDT, 0.12, -0.2)
hit(at('hero', 4, 0.6), 0.9, 12, True); put('sub_drop', at('hero', 4, 0.6), 0.6)
hit(at('hero', 5, 0.2), 0.7, 8); put('downer', at('hero', 7, 0.2), 0.45)
put('sub_pad', 0, 0.35)
# s1 model
put('riser', S('s1') - 1.2, 0.3); hit(S('s1'), 0.8, 8, True)
for k in (2, 3, 4): put('ui_ping_%d' % (k - 1), at('s1', k, 0.3), 0.36)
hit(at('s1', 5, 0.6), 0.6, 4)
for k in range(8): put('meteor_%d' % (1 + k % 6), at('s1', 6, 0.3 + 0.18 * k), 0.16, 0.25)
# s2 web recipe
put('whoosh_swing', at('s2', 1, 0.2), 0.3); hit(at('s2', 5, 0.4), 0.55, 4)
# s3 die
put('downer', at('s3', 2, 0.6), 0.45); hit(at('s3', 3, 0.3), 0.5, 3)
# s4 fixed point
hit(at('s4', 0, 2.2), 0.6, 4); put('ui_ping_2', at('s4', 3, 0.5), 0.4); hit(at('s4', 5, 0.3), 0.85, 10, True)
# s5 slope
put('ui_ping_1', at('s5', 1, 0.4), 0.35); hit(at('s5', 4, 0.6), 0.6, 4); put('downer', at('s5', 5, 0.6), 0.35); hit(at('s5', 5, 0.6), 0.7, 8)
# s6 period 2
hit(at('s6', 0, 0.2), 0.8, 10, True)
counter('周期', 2, 2, '', at('s6', 6, 0.1), at('s6', 6, 0.3), S('s7') + 0.4, land='#f0bd5c', ticks=False); hit(at('s6', 6, 0.3), 0.8, 8)
# s7 period doubling cascade: a counter that goes 4, 8, 16, 32, 64, ∞ (faster and faster)
seq = [(at('s7', 1, 0.6), 4), (at('s7', 2, 0.6), 8), (at('s7', 3, 0.3), 16), (at('s7', 3, 0.9), 32), (at('s7', 3, 1.3), 64)]
for i, (tt, v) in enumerate(seq):
    nx = seq[i + 1][0] if i + 1 < len(seq) else at('s7', 5, 0.8)
    counter('周期', v, v, '', tt - 0.05, tt, nx, land='#f0bd5c', ticks=False); hit(tt, 0.5 + 0.08 * i, 3 + 2 * i, i >= 3)
counter('周期', 0, 0, '', at('s7', 5, 0.8) - 0.05, at('s7', 5, 0.8), S('s8') + 0.3, land='#ef5b43', ticks=False, endtxt='∞')
hit(at('s7', 5, 0.8), 1.0, 16, True); put('sub_drop', at('s7', 5, 0.8), 0.6)
for k in range(10): put('meteor_%d' % (1 + k % 6), at('s7', 4, 0.2 + 0.11 * k), 0.15, 0.3)
# s8 chaos
put('data_burst', at('s8', 1, 0.2), 0.3); put('sparkle_bed', at('s8', 2, 0.3), 0.3); hit(at('s8', 4, 0.3), 0.9, 12, True)
# s9 → the pause bar, then the drop on the bifurcation diagram
put('riser', S('s10') - 1.3, 0.5)
hit(S('s10'), 1.0, 22, True); put('sub_drop', S('s10'), 0.9); put('data_burst', S('s10') + 0.05, 0.3)
hit(at('s10', 2, 0.5), 0.6, 5); hit(at('s10', 3, 0.5), 0.7, 6)
for k in range(6): put('meteor_%d' % (1 + k % 6), at('s10', 4, 0.2 + 0.2 * k), 0.2, 0.2)
hit(at('s10', 5, 0.5), 1.0, 16, True); put('data_burst', at('s10', 5, 0.5), 0.35)
put('ui_ping_3', at('s10', 7, 0.6), 0.4); hit(at('s10', 7, 1.2), 0.7, 6)
# s11 sensitivity: the gap doubles every step; a counter counts the steps
counter('算了几步', 0, 21, '步', at('s11', 5, 0.1), at('s11', 6, 0.4), at('s11', 7, 0.0), land='#ef5b43', pw=1.0)
hit(at('s11', 6, 0.4), 0.9, 12, True)
counter('需要的小数位', 0, 15, '位', at('s11', 8, 0.2), at('s11', 8, 1.6), at('s11', 9, 2.2), land='#ef5b43', pw=1.2)
hit(at('s11', 8, 1.6), 0.8, 8); put('downer', at('s11', 9, 0.3), 0.4)
# s12 Feigenbaum: ratios land one by one, then the slam
hit(S('s12'), 1.0, 18, True); put('sub_drop', S('s12'), 0.8)
for i, (v, tt) in enumerate([(4.751, at('s12', 2, 0.6)), (4.656, at('s12', 3, 0.0)), (4.668, at('s12', 3, 0.7))]):
    nx = [at('s12', 3, 0.0), at('s12', 3, 0.7), at('s12', 3, 1.5)][i]
    counter('相邻两段之比', v, v, '', tt - 0.05, tt, nx, land='#f0bd5c', dec=3, ticks=False); put('ui_ping_%d' % (1 + i), tt, 0.4)
counter('相邻两段之比', 4.669, 4.669, '', at('s12', 3, 1.5) - 0.05, at('s12', 3, 1.5), at('s12', 6, 0.4), land='#f0bd5c', dec=3, ticks=False)
hit(at('s12', 3, 1.5), 0.95, 14, True)
slam('4.669', at('s12', 6, 0.5), 1440, 330, 170, '#f0bd5c', at('s12', 7, -0.1), 'FEIGENBAUM  δ = 4.6692…'); hit(at('s12', 6, 0.5), 1.0, 18, True); put('sub_drop', at('s12', 6, 0.5), 0.7)
put('sparkle_bed', at('s12', 7, 0.3), 0.35)
# s13 weather
put('whoosh_swing', at('s13', 1, 0.2), 0.3); hit(at('s13', 4, 0.6), 0.8, 8); put('downer', at('s13', 5, 0.4), 0.4); hit(at('s13', 7, 0.6), 0.8, 10, True)
# s14 end
put('sub_pad', at('s14', 0, 0.0), 0.4); hit(at('s14', 3, 0.4), 0.9, 12, True); put('sparkle_bed', at('s14', 3, 0.5), 0.35)
# recap
for k in range(4): put('ui_ping_%d' % (1 + k % 3), at('recap', k, 0.2), 0.4)
hit(at('recap', 3, 0.3), 0.9, 10, True)

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
MUS += fill(range(0, 8), range(4, 8), nbars(0, S('s1')))                                   # intro under title + hook
n = nbars(S('s1'), S('s10')); assert n >= 16, n
MUS += fill(range(8, 40), range(24, 40), n - 8) + list(range(40, 48))                       # groove, then the break; bar 47 (pause) under “都画在同一张图上呢？”
MUS += fill(range(48, 64), range(56, 64), nbars(S('s10'), S('s12')))                       # drop on the bifurcation diagram
MUS += fill(range(64, 78), range(64, 72), nbars(S('s12'), S('recap')))                     # climax under 4.669, weather, ending
MUS += fill(range(74, 86), [85], NB - len(MUS))                                            # outro
for k in ('hero', 's1', 's10', 's12', 'recap'): assert abs(S(k) / BAR - round(S(k) / BAR)) < 1e-3, k

scenes = [dict(key=T['key'], k=T['k'], draw=T['draw'], s=T['s'], e=T['e'], ls=T['ls']) for T in TLs]
data = dict(end=END, groups=groups, chaps=chaps, crumbs=crumbs, counters=counters, slams=slams, shake=sorted(SHAKE),
            sfx=sorted(SFX, key=lambda x: x[1]), years=years, yvis=yvis, ticks=[], yr0=0, yr1=1,
            scenes=scenes, idx=IDX, src=[[a, b] for a, b, *_ in SRC], title=TITLE, mus=MUS, bar=BAR, eph=EPH,
            webs=WEBS, hero=hero)
json.dump(data, open('tl.json', 'w'), ensure_ascii=False)
if __name__ == '__main__':
    print('dur %.1f s (%d:%04.1f)  groups %d  sfx %d  bars %d' % (END, END // 60, END % 60, len(groups), len(SFX), len(MUS)))
    for T in TLs: print('%-6s %-5s %6.1f %6.1f  (%4.1f)  bar %.2f' % (T['key'], T['k'], T['s'], T['e'], T['e'] - T['s'], T['s'] / BAR))
