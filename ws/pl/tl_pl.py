# -*- coding: utf-8 -*-
# 普朗克 · v2 时间表。四段配乐：A Nightfall（hero–s2，一拍 0.6667 s）、C Entropy（ch2–s7，一拍 0.4 s）、
# D Awakening 安静段（ch4–s8）、E Awakening 高潮到尾（ch5–end）。每段的起点就是音乐那一段的第一拍，
# 段内旁白落在该段的拍上。输出 tl.json（画面、字幕、音效）和 sections（给 make_bed_hz.py）。
import json, math, re
from script_pl import SC, TITLE
exec(open('sources_pl.py', encoding='utf-8').read())   # SRC

BA, BC = 0.6666718, 0.4
SECT = [('A', 'hero', BA), ('C', 'ch2', BC), ('D', 'ch4', BA), ('E', 'ch5', BA)]
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
    if kind == 'chap':
        e = up(s + 2.6, beat, s0); ls = [0.45]
    elif kind == 'src':
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
        groups.append(dict(s=round(gs, 3), e=round(ge, 3), lines=L))

# ---------------- chapters / crumbs ----------------
chaps, crumbs = [], []
for row, T in zip(SC, TLs):
    if row[1] == 'chap':
        chaps.append(dict(s=T['s'], e=T['e'], word=row[2], en='', line=row[3], n=''))
        crumbs.append(dict(t=T['s'], zh=row[2], en=''))
crumbs.insert(0, dict(t=at('hero', 9, 0.8), zh='人物传记 · 普朗克', en=''))
crumbs.append(dict(t=S('recap'), zh='回顾', en='')); crumbs.append(dict(t=S('src'), zh='资料来源', en=''))

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

for c in chaps: put('riser', c['s'] - 1.0, 0.3); hit(c['s'] + 0.35, 0.9, 12, True); put('sub_drop', c['s'] + 0.35, 0.5)
# hero: Sunday, the visit, the curve that doesn't fit, the postcard
put('sub_pad', 0, 0.35)
put('ui_ping_1', at('hero', 0, 0.4), 0.35); put('ui_ping_2', at('hero', 1, 0.4), 0.3); put('ui_ping_3', at('hero', 2, 0.4), 0.3); put('whoosh_swing', at('hero', 3, 0.3), 0.3)
put('downer', at('hero', 4, 0.5), 0.25); put('ui_ping_1', at('hero', 5, 0.4), 0.3); hit(at('hero', 6, 0.5), 0.8, 8, True); put('sparkle_bed', at('hero', 6, 0.6), 0.3)
put('whoosh_swing', at('hero', 7, 0.3), 0.3); hit(at('hero', 8, 0.5), 1.0, 12, True); put('sparkle_bed', at('hero', 8, 0.6), 0.35); hit(at('hero', 9, 0.4), 1.0, 14, True)
# s1 Kiel
put('ui_ping_1', at('s1', 0, 0.4), 0.35); put('ui_ping_2', at('s1', 1, 0.4), 0.3); put('sparkle_bed', at('s1', 2, 0.3), 0.25); put('whoosh_swing', at('s1', 3, 0.3), 0.25); hit(at('s1', 4, 0.5), 0.8, 8, True)
# s2 Jolly, Berlin, the chair
put('ui_ping_1', at('s2', 0, 0.4), 0.3); put('ui_ping_2', at('s2', 1, 0.4), 0.3); put('downer', at('s2', 2, 0.5), 0.25); put('ui_ping_3', at('s2', 3, 0.4), 0.3)
put('whoosh_swing', at('s2', 5, 0.3), 0.3); put('ui_ping_1', at('s2', 6, 0.4), 0.3); put('ui_ping_2', at('s2', 7, 0.4), 0.3); hit(at('s2', 8, 0.5), 0.7, 6)
# s3 the curve
put('ui_ping_1', at('s3', 0, 0.4), 0.3); put('ui_ping_2', at('s3', 1, 0.4), 0.3); put('ui_ping_3', at('s3', 2, 0.4), 0.3); put('whoosh_swing', at('s3', 3, 0.3), 0.3)
put('ui_ping_1', at('s3', 4, 0.4), 0.3); put('ui_ping_2', at('s3', 5, 0.4), 0.3); put('whoosh_swing', at('s3', 6, 0.3), 0.3); put('ui_ping_3', at('s3', 7, 0.4), 0.3); put('ui_ping_1', at('s3', 8, 0.4), 0.3); put('downer', at('s3', 9, 0.5), 0.3); hit(at('s3', 9, 0.5), 0.6, 4)
# s4 the postcard
put('ui_ping_1', at('s4', 0, 0.4), 0.3); put('ui_ping_2', at('s4', 1, 0.4), 0.3); put('downer', at('s4', 2, 0.5), 0.25); put('ui_ping_3', at('s4', 3, 0.4), 0.3)
hit(at('s4', 4, 0.5), 0.9, 10, True); put('sparkle_bed', at('s4', 4, 0.6), 0.35); put('whoosh_swing', at('s4', 5, 0.3), 0.25); put('ui_ping_1', at('s4', 6, 0.4), 0.3); put('ui_ping_2', at('s4', 7, 0.4), 0.35)
put('ui_ping_3', at('s4', 8, 0.4), 0.3); put('downer', at('s4', 9, 0.5), 0.3); hit(at('s4', 10, 0.5), 0.9, 10, True)
# s5 the desperate weeks: E = h nu
put('ui_ping_1', at('s5', 1, 0.4), 0.3); put('downer', at('s5', 2, 0.5), 0.25); put('ui_ping_2', at('s5', 3, 0.4), 0.3); put('whoosh_swing', at('s5', 5, 0.3), 0.3)
put('ui_ping_3', at('s5', 6, 0.4), 0.35); put('sparkle_bed', at('s5', 6, 0.5), 0.3); put('ui_ping_1', at('s5', 7, 0.4), 0.3); put('ui_ping_2', at('s5', 8, 0.4), 0.3)
hit(at('s5', 9, 0.5), 1.0, 12, True); put('sparkle_bed', at('s5', 9, 0.6), 0.4); put('ui_ping_3', at('s5', 10, 0.4), 0.3); put('ui_ping_1', at('s5', 11, 0.4), 0.3); hit(at('s5', 12, 0.5), 1.0, 14, True); put('sub_drop', at('s5', 12, 0.5), 0.45)
# s6 he did not believe it; Einstein; Nobel
put('ui_ping_1', at('s6', 0, 0.4), 0.3); put('downer', at('s6', 2, 0.5), 0.25); put('ui_ping_2', at('s6', 3, 0.4), 0.3); put('ui_ping_3', at('s6', 5, 0.4), 0.3); put('sparkle_bed', at('s6', 6, 0.3), 0.3)
hit(at('s6', 7, 0.5), 0.7, 6); put('ui_ping_1', at('s6', 8, 0.4), 0.3); put('ui_ping_2', at('s6', 9, 0.4), 0.3); put('whoosh_swing', at('s6', 11, 0.3), 0.3); hit(at('s6', 12, 0.5), 0.8, 8, True)
hit(at('s6', 13, 0.5), 1.0, 12, True); put('sparkle_bed', at('s6', 13, 0.6), 0.4)
# s7 home and the losses: restrained, one low note per loss
put('sub_pad', at('s7', 0, 0.0), 0.3); put('ui_ping_1', at('s7', 1, 0.4), 0.25)
for li in (2, 3, 4, 5): put('downer', at('s7', li, 0.5), 0.28)
# s8 Hitler and Haber
put('sub_pad', at('s8', 0, 0.0), 0.3); put('ui_ping_1', at('s8', 1, 0.4), 0.25); put('ui_ping_2', at('s8', 3, 0.4), 0.3); put('ui_ping_3', at('s8', 4, 0.4), 0.3); put('downer', at('s8', 5, 0.5), 0.3); hit(at('s8', 5, 0.6), 0.5, 4)
put('ui_ping_1', at('s8', 6, 0.4), 0.25); put('ui_ping_2', at('s8', 8, 0.4), 0.25)
# s9 1944 and 1945 (quietest)
put('downer', at('s9', 0, 0.5), 0.28); put('ui_ping_1', at('s9', 2, 0.4), 0.25); put('ui_ping_2', at('s9', 3, 0.4), 0.25); put('ui_ping_3', at('s9', 4, 0.4), 0.25); put('downer', at('s9', 5, 0.5), 0.25)
put('sub_drop', at('s9', 6, 0.5), 0.4); put('downer', at('s9', 7, 0.5), 0.28)
# s10 Goettingen, 1947, the society
put('sub_pad', at('s10', 0, 0.0), 0.3); put('ui_ping_1', at('s10', 1, 0.4), 0.25); put('ui_ping_2', at('s10', 2, 0.4), 0.3); put('whoosh_swing', at('s10', 3, 0.3), 0.25); hit(at('s10', 4, 0.5), 0.9, 8, True); put('sparkle_bed', at('s10', 4, 0.6), 0.3)
# s11 the kilogram
put('ui_ping_1', at('s11', 0, 0.4), 0.3); put('ui_ping_2', at('s11', 1, 0.4), 0.3); put('ui_ping_3', at('s11', 2, 0.4), 0.3); put('downer', at('s11', 3, 0.5), 0.3)
put('whoosh_swing', at('s11', 4, 0.3), 0.3); hit(at('s11', 5, 0.5), 1.0, 12, True); put('sparkle_bed', at('s11', 5, 0.6), 0.4); put('ui_ping_2', at('s11', 6, 0.4), 0.3); put('ui_ping_3', at('s11', 7, 0.4), 0.3)
put('whoosh_swing', at('s11', 8, 0.3), 0.3); hit(at('s11', 9, 0.5), 1.0, 14, True); put('sparkle_bed', at('s11', 9, 0.6), 0.4)
# recap
for k in range(4): put('ui_ping_%d' % (1 + k % 3), at('recap', k, 0.2), 0.4)
hit(at('recap', 3, 0.3), 0.9, 10, True)

# ---------------- era timeline ----------------
# The marker eases to the next keyframe within <=1.2 s, so a long range needs a keyframe every ~1.2 s or it jumps to the end year at once.
YRS = [('s1', 1858, 1858), ('s2', 1874, 1887), ('s3', 1887, 1900), ('s4', 1900, 1900), ('s5', 1900, 1900), ('s6', 1900, 1918),
       ('s7', 1909, 1919), ('s8', 1933, 1933), ('s9', 1944, 1945), ('s10', 1945, 1947)]
ANCH = {'s6': [(0, 1900), (5, 1905), (13, 1918)], 's7': [(0, 1905), (2, 1909), (3, 1916), (4, 1917), (5, 1919)], 's9': [(0, 1944), (2, 1944), (6, 1945)], 's10': [(0, 1945), (1, 1947)]}      # (line index, year)
years = []
def ykey(t, y):
    if not years or t > years[-1][0] + 0.01: years.append([round(t, 3), round(y, 1)])
for key, y0, y1 in YRS:
    t0, t1 = S(key) + 0.6, Ee(key) - 0.6
    pts = [(t0, y0), (t1, y1)]
    if key in ANCH: pts = [(at(key, li, 0.0) if li else t0, yy) for li, yy in ANCH[key]]; pts[-1] = (max(pts[-1][0], pts[-2][0] + 0.5), pts[-1][1])
    for (ta, ya), (tb, yb) in zip(pts, pts[1:]):
        n = max(1, int(round((tb - ta) / 1.2)))
        for k in range(n): ykey(ta + (tb - ta) * k / n, ya + (yb - ya) * k / n)
    ykey(pts[-1][0], pts[-1][1])
    hh = pts[-1][0] + 1.2
    while hh < Ee(key) - 0.3: ykey(hh, pts[-1][1]); hh += 1.2      # hold the year until the scene ends (the marker eases to the next key at once)
yvis = [[S('s1') - 0.3, Ee('s10') - 0.3]]

scenes = [dict(key=T['key'], k=T['k'], draw=T['draw'], s=T['s'], e=T['e'], ls=T['ls']) for T in TLs]
data = dict(end=END, groups=groups, chaps=chaps, crumbs=crumbs, counters=counters, slams=slams, shake=sorted(SHAKE),
            sfx=sorted(SFX, key=lambda x: x[1]), years=years, yvis=yvis, ticks=[1858, 1900, 1918, 1933, 1947], yr0=1850, yr1=1955,
            scenes=scenes, idx=IDX, src=[[a, b] for a, b, *_ in SRC], title=TITLE, secs=secs)
json.dump(data, open('tl.json', 'w'), ensure_ascii=False)
if __name__ == '__main__':
    print('dur %.1f s (%d:%04.1f)  groups %d  sfx %d' % (END, END // 60, END % 60, len(groups), len(SFX)))
    for T in TLs: print('%-6s %-5s %6.1f %6.1f  (%4.1f)' % (T['key'], T['k'], T['s'], T['e'], T['e'] - T['s']))
    print(secs)
