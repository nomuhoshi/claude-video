# -*- coding: utf-8 -*-
# 逻辑斯蒂映射 · v2 引擎时间表（不出章节卡）。配乐 vibe.mp3（112.79 BPM，一拍 0.53194 s，一小节 2.12777 s，首拍 0.391 s）。
# 每行旁白起点落在拍上；锚点幕（hero、s1、s10、s12、recap）落在小节线上；配乐按小节从原曲取段（MUS）。输出 tl.json
# 蛛网图的每一步（WEBS）在这里排好时间，画面和音效共用同一张表，保证声画同步。
import json, math, re, itertools
from script_php import SC, TITLE
exec(open('sections_php.py', encoding='utf-8').read())   # SRC

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
crumbs = [dict(t=S('hero') + 0.4, zh='信息差 · PHP 漏洞', en='PHP2SHELL  ·  CVE-2026-109618 / 109619'), dict(t=S('src'), zh='资料来源', en='SOURCES')]

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


# ---------------- per-scene effects ----------------
put('sub_pad', 0, 0.35)
# hero: phone apps go dark one by one
hit(at('hero', 1, 0.5), 0.8, 8); hit(at('hero', 2, 0.4), 0.7, 6)
for k in range(5): put('meteor_%d' % (1 + k), at('hero', 3, 0.2 + 0.25 * k), 0.18, 0.2)
hit(at('hero', 4, 0.5), 0.9, 12, True)
put('ui_ping_2', at('hero', 5, 0.4), 0.4); hit(at('hero', 5, 1.2), 0.7, 6)
put('downer', at('hero', 6, 0.3), 0.4); hit(at('hero', 7, 0.6), 1.0, 16, True); put('sub_drop', at('hero', 7, 0.6), 0.6)
# s1: the list, each row stamped “停止中”
put('riser', S('s1') - 1.2, 0.3); hit(S('s1'), 0.8, 8, True)
put('ui_ping_1', at('s1', 1, 0.4), 0.4); put('ui_ping_2', at('s1', 2, 0.4), 0.4)
for i in range(4): hit(at('s1', 5 + i, 0.9), 0.6, 5)
hit(at('s1', 9, 0.6), 0.8, 8); put('downer', at('s1', 9, 0.8), 0.35)
# s2: the kitchen
put('whoosh_swing', at('s2', 1, 0.2), 0.3); put('ui_ping_1', at('s2', 3, 0.4), 0.4)
counter('用 PHP 的网站', 0, 69.3, '%', at('s2', 5, 0.1), at('s2', 5, 1.4), S('s3') + 0.3, land='#f0bd5c', dec=1)
hit(at('s2', 5, 1.4), 0.85, 10, True)
# s3: severity
counter('严重程度', 0, 9.2, '/ 10', at('s3', 1, 0.2), at('s3', 1, 1.3), at('s3', 6, 0.0), land='#ef5b43', dec=1)
hit(at('s3', 1, 1.3), 0.9, 12, True)
hit(at('s3', 3, 0.4), 0.7, 6); put('data_burst', at('s3', 5, 0.3), 0.3); hit(at('s3', 7, 0.4), 0.9, 12, True)
counter('漏洞藏了', 0, 10, '年以上', at('s3', 8, 0.2), at('s3', 8, 1.2), at('s3', 9, 2.4), land='#ef5b43')
hit(at('s3', 8, 1.2), 0.8, 8)
# s4: the turn — AI found it (drop)
put('riser', S('s4') - 1.3, 0.5); hit(at('s4', 1, 0.5), 1.0, 20, True); put('sub_drop', at('s4', 1, 0.5), 0.9); put('data_burst', at('s4', 1, 0.55), 0.3)
for k in (4, 5, 6): put('ui_ping_%d' % (k - 3), at('s4', k, 0.4), 0.4)
put('sparkle_bed', at('s4', 8, 0.3), 0.35); hit(at('s4', 8, 1.0), 0.8, 8)
# s5: the race
hit(at('s5', 2, 0.8), 0.7, 6); put('whoosh_swing', at('s5', 4, 0.2), 0.3)
counter('补丁公开后', 0, 6, '小时内', at('s5', 4, 0.3), at('s5', 4, 1.3), at('s5', 5, 0.2), land='#ef5b43', ticks=False)
for k in range(6): put('count_tick', at('s5', 6, 0.1 + 0.18 * k), 0.25, 0.3)
hit(at('s5', 7, 0.8), 0.9, 12, True); put('downer', at('s5', 8, 0.4), 0.35); hit(at('s5', 9, 0.6), 0.8, 8, True)
# s6: status
for k in (2, 3, 4): put('ui_ping_%d' % (k - 1), at('s6', k, 0.6), 0.4)
hit(at('s6', 6, 0.6), 0.9, 10, True)
# s7: future
put('riser', S('s7') - 1.2, 0.35); hit(S('s7'), 0.9, 12, True); put('sub_drop', S('s7'), 0.6)
put('whoosh_swing', at('s7', 2, 0.2), 0.3); hit(at('s7', 4, 0.5), 0.8, 8); hit(at('s7', 5, 0.5), 1.0, 14, True)
# s8: three things
for k in (1, 2, 3): put('ui_ping_%d' % k, at('s8', k, 0.5), 0.45)
put('sparkle_bed', at('s8', 3, 0.8), 0.3)
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
MUS += fill(range(0, 8), range(4, 8), nbars(0, S('s1')))                                   # intro under title + phone hook
n = nbars(S('s1'), S('s4')); assert n >= 12, n
MUS += fill(range(8, 40), range(24, 40), n - 4) + list(range(44, 48))                       # groove, then the break into “可这一次……”
MUS += fill(range(48, 64), range(56, 64), nbars(S('s4'), S('s7')))                          # drop on the AI turn
MUS += fill(range(64, 78), range(64, 72), nbars(S('s7'), S('recap')))                      # climax under the future + tips
MUS += fill(range(74, 86), [85], NB - len(MUS))                                            # outro
for k in ('hero', 's1', 's4', 's7', 'recap'): assert abs(S(k) / BAR - round(S(k) / BAR)) < 1e-3, k

scenes = [dict(key=T['key'], k=T['k'], draw=T['draw'], s=T['s'], e=T['e'], ls=T['ls']) for T in TLs]
data = dict(end=END, groups=groups, chaps=chaps, crumbs=crumbs, counters=counters, slams=slams, shake=sorted(SHAKE),
            sfx=sorted(SFX, key=lambda x: x[1]), years=years, yvis=yvis, ticks=[], yr0=0, yr1=1,
            scenes=scenes, idx=IDX, src=[[a, b] for a, b, *_ in SRC], title=TITLE, mus=MUS, bar=BAR, eph=EPH)
json.dump(data, open('tl.json', 'w'), ensure_ascii=False)
if __name__ == '__main__':
    print('dur %.1f s (%d:%04.1f)  groups %d  sfx %d  bars %d' % (END, END // 60, END % 60, len(groups), len(SFX), len(MUS)))
    for T in TLs: print('%-6s %-5s %6.1f %6.1f  (%4.1f)  bar %.2f' % (T['key'], T['k'], T['s'], T['e'], T['e'] - T['s'], T['s'] / BAR))
