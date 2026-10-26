# -*- coding: utf-8 -*-
# 日常物理 · 微波炉 · v2 时间表（无章节卡）。配乐：全片同一首 C Entropy（1.6 s 一小节）。
# 输出 tl.json（画面、字幕、音效）和 secs（给 make_bed_mw.py）。
import json, math, re
from script_mw import SC, TITLE
exec(open('sources_mw.py', encoding='utf-8').read())   # SRC

BA, BC = 0.6666718, 0.4
SECT = [('C', 'hero', BC)]
START = {k: n for n, k, b in SECT}
def vis(tx): return re.sub(r'\{[brg]:([^}]*)\}', r'\1', tx).lstrip('!')
def wid(tx): return sum(0.55 if ord(c) < 128 else 1.0 for c in vis(tx))
def up(t, q, o=0.0): return o + math.ceil((t - o) / q - 1e-6) * q

TLs, IDX = [], {}
t = 0.0; beat = BA; s0 = 0.0; secs = []
for row in SC:
    key, kind = row[0], row[1]
    if key in START:
        beat = [b for n, k, b in SECT if k == key][0]; t = up(t, BA * 4 if beat == BA else 1.6) if t else 0.0; s0 = t
        secs.append(dict(n=START[key], s=round(t, 3)))
    s = t; ls = []
    if kind == 'src':
        e = s + 7.0
    else:
        lines, hold = row[3], row[4]
        c = s + (beat * (4 if kind == 'hero' else 2) if beat == BA else 1.6)
        for tx in lines:
            w = wid(tx); assert w <= 19, (key, tx, w)
            d = max(2.0, 0.55 + w / 7.0)
            c = up(c, beat, s0); ls.append(round(c - s, 3)); c += d
        e = up(c + hold * beat, beat, s0)
    IDX[key] = len(TLs)
    TLs.append(dict(key=key, k=kind, draw=(row[2] if kind not in ('chap', 'recap', 'src') else None), s=round(s, 3), e=round(e, 3), ls=ls))
    t = e
END = round(TLs[-1]['e'], 3)
for i, sc in enumerate(secs): sc['e'] = secs[i + 1]['s'] if i + 1 < len(secs) else END
def S(k): return TLs[IDX[k]]['s']
def Ee(k): return TLs[IDX[k]]['e']
def at(k, li, off=0.0): return round(TLs[IDX[k]]['s'] + TLs[IDX[k]]['ls'][li] + off, 3)

# ---------------- narration groups ----------------
groups = []
for row, T in zip(SC, TLs):
    if row[1] not in ('s', 'hero') or not row[3]: continue
    lines = row[3]; n = len(lines); k = max(1, math.ceil(n / 4)); sizes = [n // k + (1 if j < n % k else 0) for j in range(k)]
    idx = 0; chunks = []
    for sz in sizes: chunks.append(list(range(idx, idx + sz))); idx += sz
    inq = False
    for ci, ch in enumerate(chunks):
        L = []
        for li in ch:
            tx = lines[li]
            st = 'big' if tx.startswith('!') else ('q' if tx.startswith('“') or inq else 'n')
            if '“' in tx and '”' not in tx[tx.index('“'):]: inq = True
            if '”' in tx: inq = False
            L.append(dict(t=round(T['s'] + T['ls'][li], 3), st=st, tx=tx.lstrip('!')))
        gs = L[0]['t'] - 0.05
        ge = round(T['s'] + T['ls'][chunks[ci + 1][0]] - 0.02, 3) if ci + 1 < len(chunks) else T['e']
        groups.append(dict(s=round(gs, 3), e=ge, lines=L))

# ---------------- crumbs ----------------
chaps = []
crumbs = [dict(t=S('recap'), zh='回顾', en=''), dict(t=S('src'), zh='资料来源', en='')]

# ---------------- effects ----------------
counters, slams, SHAKE, SFX = [], [], [], []
def put(n, t, g=1.0, p=0.0): SFX.append((n, round(t, 3), g, p))
def hit(t, g=0.9, shake=10, big=False):
    put('hit_drum' if big else 'hit_drum2', t, g); put('slam', t, g * (0.8 if big else 0.45))
    if shake: SHAKE.append((round(t, 3), shake))
def zap(t0, t1, g=0.3, step=0.55):                       # a run of crackling spark pops
    k = 0; t = t0
    while t < t1:
        put('meteor_%d' % (1 + k % 6), t, g * (0.8 + 0.4 * ((k * 7) % 5) / 4), [-0.3, 0.2, -0.1, 0.35][k % 4]); k += 1; t += step * (0.8 + 0.4 * ((k * 3) % 4) / 3)
def counter(label, a, b, unit, t0, t1, hide, col=None, land=None, pw=1.8, dec=0, ticks=True, tick_g=0.22, endtxt=None):
    counters.append(dict(label=label, a=a, b=b, unit=unit, t0=round(t0, 3), t1=round(t1, 3), hide=round(hide, 3), col=col, land=land, pw=pw, dec=dec, endtxt=endtxt))
    if ticks:
        prev = None; n = int((t1 - t0) * 100)
        for f in range(n + 1):
            u = f / max(1, n); v = round(a + (b - a) * u ** pw, max(0, dec))
            if v != prev:
                if prev is not None and (not SFX or SFX[-1][1] < t0 + f / 100 - 0.05): put('count_tick', t0 + f / 100, tick_g, 0.3)
                prev = v
        put('count_roll', t1 - 0.6, 0.24, 0.2)

# hero: fork sparks, the soup is quiet
put('sub_pad', 0, 0.35)
put('ui_ping_1', at('hero', 0, 0.4), 0.35); put('whoosh_swing', at('hero', 1, 0.3), 0.25)
zap(at('hero', 2, 0.15), at('hero', 3, -0.1), 0.34); hit(at('hero', 2, 0.15), 0.7, 6)
put('ui_ping_2', at('hero', 3, 0.4), 0.35); put('whoosh_swing', at('hero', 3, 0.3), 0.25); put('downer', at('hero', 4, 0.5), 0.25)
put('ui_ping_3', at('hero', 5, 0.4), 0.35); hit(at('hero', 6, 0.4), 1.0, 14, True)
# s1 heat
put('ui_ping_1', at('s1', 0, 0.4), 0.35); put('whoosh_swing', at('s1', 1, 0.3), 0.25)
counter('微波炉的频率', 0, 2.45, '吉赫', at('s1', 1, 0.5), at('s1', 1, 1.9), Ee('s1') - 0.3, land='#f0bd5c', dec=2)
hit(at('s1', 1, 1.9), 0.8, 8, True); put('ui_ping_2', at('s1', 3, 0.4), 0.35); put('downer', at('s1', 4, 0.4), 0.25)
put('ui_ping_1', at('s1', 5, 0.4), 0.35); put('ui_ping_2', at('s1', 6, 0.4), 0.35); put('whoosh_swing', at('s1', 7, 0.3), 0.3)
for k in range(5): put('count_tick', at('s1', 8, 0.1 + 0.2 * k), 0.22, 0.2)
put('ui_ping_3', at('s1', 9, 0.4), 0.3); hit(at('s1', 10, 0.4), 0.9, 10, True); put('sparkle_bed', at('s1', 10, 0.5), 0.25)
# s2 metal
hit(at('s2', 0, 0.4), 0.6, 4); put('ui_ping_1', at('s2', 1, 0.4), 0.35); put('whoosh_swing', at('s2', 3, 0.3), 0.3)
put('ui_ping_2', at('s2', 5, 0.4), 0.3); put('whoosh_swing', at('s2', 6, 0.3), 0.3)
put('ui_ping_1', at('s2', 7, 0.4), 0.3); put('ui_ping_2', at('s2', 8, 0.4), 0.3); put('ui_ping_3', at('s2', 9, 0.4), 0.3); hit(at('s2', 10, 0.4), 0.7, 6)
hit(at('s2', 12, 0.4), 0.8, 8)
# s3 tip
put('downer', at('s3', 0, 0.3), 0.3); put('ui_ping_1', at('s3', 1, 0.4), 0.35); put('whoosh_swing', at('s3', 2, 0.3), 0.25); hit(at('s3', 3, 0.5), 0.8, 8)
put('ui_ping_2', at('s3', 4, 0.4), 0.3); put('ui_ping_3', at('s3', 5, 0.4), 0.3); put('ui_ping_1', at('s3', 6, 0.4), 0.3)
put('riser', at('s3', 8, -2.0), 0.28); hit(at('s3', 8, 0.4), 0.95, 12, True); put('ui_ping_2', at('s3', 9, 0.4), 0.3)
zap(at('s3', 10, 0.2), at('s3', 11, 0.3), 0.36); put('sparkle_bed', at('s3', 10, 0.3), 0.3)
put('ui_ping_1', at('s3', 11, 0.4), 0.3)
# s4 grape (Awakening climax)
put('whoosh_swing', at('s4', 0, 0.3), 0.3); hit(at('s4', 1, 0.4), 0.7, 6); put('ui_ping_1', at('s4', 2, 0.4), 0.35); put('ui_ping_2', at('s4', 3, 0.4), 0.3)
zap(at('s4', 4, 0.2), at('s4', 5, -0.1), 0.38); hit(at('s4', 4, 0.2), 0.95, 12, True)
put('ui_ping_3', at('s4', 5, 0.4), 0.3); put('ui_ping_1', at('s4', 6, 0.4), 0.3); put('whoosh_swing', at('s4', 7, 0.3), 0.3); hit(at('s4', 7, 0.6), 0.7, 6)
hit(at('s4', 8, 0.4), 0.8, 8); put('ui_ping_2', at('s4', 9, 0.4), 0.3); hit(at('s4', 10, 0.4), 1.0, 14, True); put('sparkle_bed', at('s4', 10, 0.5), 0.35)
zap(at('s4', 10, 0.6), at('s4', 11, 0.1), 0.3); put('ui_ping_1', at('s4', 11, 0.4), 0.3); put('ui_ping_2', at('s4', 12, 0.4), 0.3); hit(at('s4', 13, 0.4), 0.6, 4); put('sub_pad', at('s4', 14, 0.0), 0.3); put('downer', at('s4', 15, 0.4), 0.25)
# recap
for k in range(3): put('ui_ping_%d' % (1 + k % 3), at('recap', k, 0.2), 0.4)
hit(at('recap', 2, 0.3), 0.9, 10, True)

scenes = [dict(key=T['key'], k=T['k'], draw=T['draw'], s=T['s'], e=T['e'], ls=T['ls']) for T in TLs]
data = dict(end=END, groups=groups, chaps=chaps, crumbs=crumbs, counters=counters, slams=slams, shake=sorted(SHAKE),
            sfx=sorted(SFX, key=lambda x: x[1]), years=[], yvis=[], ticks=[], yr0=0, yr1=1,
            scenes=scenes, idx=IDX, src=[[a, b] for a, b, *_ in SRC], title=TITLE, secs=secs)
json.dump(data, open('tl.json', 'w'), ensure_ascii=False)
if __name__ == '__main__':
    print('dur %.1f s (%d:%04.1f)  groups %d  sfx %d' % (END, END // 60, END % 60, len(groups), len(SFX)))
    for T in TLs: print('%-6s %-5s %6.1f %6.1f  (%4.1f)' % (T['key'], T['k'], T['s'], T['e'], T['e'] - T['s']))
    print(secs)
