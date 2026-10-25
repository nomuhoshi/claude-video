# -*- coding: utf-8 -*-
# 费曼诺贝尔演讲 · v2 时间表。配乐分段见 SECT（段起点对齐到该段曲子的小节线，段内旁白落在拍上）。
import json, math, re
from script_fy import SC, TITLE
exec(open('sources_fy.py', encoding='utf-8').read())   # SRC

NB = 0.3428395   # Nightfall beat (175 bpm); A grid = 2 beats
BA = 0.6666718   # Awakening beat (90 bpm)
BE = 0.4         # Entropy beat (150 bpm)
# (name, first scene key, beat grid, bar length)
BV = 0.53194     # vibe.mp3 beat (112.79 bpm)
R = 8 / 9        # Nightfall re-pitched (-2 semitones, slower) for the second use
SECT = [('A', 'hero', 2 * NB, 8 * NB), ('B', 'ch2', BA, 4 * BA), ('C', 'ch3', BV, 4 * BV), ('F', 'ch4', 2 * NB / R, 8 * NB / R),
        ('D', 'ch5', BE, 4 * BE), ('E', 'ch7', BA, 4 * BA)]
START = {k: n for n, k, b, bar in SECT}
def vis(tx): return re.sub(r'\{[brg]:([^}]*)\}', r'\1', tx)
def wid(tx): return sum(0.55 if ord(c) < 128 else 1.0 for c in vis(tx))
def up(t, q, o=0.0): return o + math.ceil((t - o) / q - 1e-6) * q
def split(tx):
    m = re.search(r'@\+([\d.]+)$', tx)
    return (tx[:m.start()], float(m.group(1))) if m else (tx, 0.0)

TLs, IDX = [], {}
t = 0.0; beat = 2 * NB; bar = 8 * NB; s0 = 0.0; secs = []
for row in SC:
    key, kind = row[0], row[1]
    if key in START:
        beat, bar = [(b, br) for n, k, b, br in SECT if k == key][0]
        s0 = t
        secs.append(dict(n=START[key], s=round(t, 3)))
    s = t; ls = []; extra = []
    if kind == 'chap':
        e = up(s + 2.8, beat, s0); ls = [0.45]
    elif kind == 'src':
        e = s + 8.0
    else:
        lines, hold = row[3], row[4]
        c = s + (beat * 4 if kind == 'hero' else beat * 2)
        for tx in lines:
            tx2, ex = split(tx); w = wid(tx2); assert w <= 19, (key, tx, w)
            d = max(2.3, 0.7 + w / 6.4) + ex
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
    if row[1] not in ('s', 'hero', 'recap') or not row[3]: continue
    lines = [split(x)[0] for x in row[3]]; n = len(lines); k = max(1, math.ceil(n / 4)); sizes = [n // k + (1 if j < n % k else 0) for j in range(k)]
    idx = 0; chunks = []
    for sz in sizes: chunks.append(list(range(idx, idx + sz))); idx += sz
    inq = False
    for ci, ch in enumerate(chunks):
        L = []
        for li in ch:
            tx = lines[li]
            st = 'q' if tx.startswith('“') or inq else 'n'
            if '“' in tx and '”' not in tx[tx.index('“'):]: inq = True
            if '”' in tx: inq = False
            L.append(dict(t=round(T['s'] + T['ls'][li], 3), st=st, tx=tx))
        gs = L[0]['t'] - 0.05
        ge = round(T['s'] + T['ls'][chunks[ci + 1][0]] - 0.02, 3) if ci + 1 < len(chunks) else T['e']
        groups.append(dict(s=round(gs, 3), e=round(ge, 3), lines=L))

# ---------------- chapters / crumbs ----------------
chaps, crumbs = [], []
for row, T in zip(SC, TLs):
    if row[1] == 'chap':
        chaps.append(dict(s=T['s'], e=T['e'], word=row[2], en='', line=row[3], n=''))
        crumbs.append(dict(t=T['s'], zh=row[2], en=''))
crumbs.insert(0, dict(t=at('hero', 5, 0.8), zh='费曼 · 诺贝尔演讲 1965', en=''))
crumbs.append(dict(t=S('recap'), zh='回顾', en='')); crumbs.append(dict(t=S('src'), zh='资料来源', en=''))

# ---------------- effects ----------------
counters, slams, SHAKE, SFX = [], [], [], []
def put(n, t, g=1.0, p=0.0): SFX.append((n, round(t, 3), g, p))
def hit(t, g=0.9, shake=10, big=False):
    put('hit_drum' if big else 'hit_drum2', t, g); put('slam', t, g * (0.8 if big else 0.45))
    if shake: SHAKE.append((round(t, 3), shake))
for c in chaps: put('riser', c['s'] - 1.0, 0.3); hit(c['s'] + 0.35, 0.8, 6, True); put('sub_drop', c['s'] + 0.35, 0.45)
exec(open('sfx_fy.py', encoding='utf-8').read()) if __import__('os').path.exists('sfx_fy.py') else None

scenes = [dict(key=T['key'], k=T['k'], draw=T['draw'], s=T['s'], e=T['e'], ls=T['ls']) for T in TLs]
data = dict(end=END, groups=groups, chaps=chaps, crumbs=crumbs, counters=counters, slams=slams, shake=sorted(SHAKE),
            sfx=sorted(SFX, key=lambda x: x[1]), years=[], yvis=[], ticks=[], yr0=0, yr1=1,
            scenes=scenes, idx=IDX, src=[[a, b] for a, b, *_ in SRC], title=TITLE, secs=secs)
json.dump(data, open('tl.json', 'w'), ensure_ascii=False)
if __name__ == '__main__':
    print('dur %.1f s (%d:%04.1f)  groups %d  sfx %d' % (END, END // 60, END % 60, len(groups), len(SFX)))
    for T in TLs: print('%-6s %-5s %6.1f %6.1f  (%4.1f)' % (T['key'], T['k'], T['s'], T['e'], T['e'] - T['s']))
    print(secs)
