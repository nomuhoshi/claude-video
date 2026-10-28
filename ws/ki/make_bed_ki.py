# Music bed for Lorentz: A Nightfall (hero–s3) | C Entropy re-cut by 1.6 s bars (the spark years) |
# D Awakening quiet bars (Bonn, illness) | E Awakening climax → tail (Marconi, the unit, today). Sections start on tl.json secs.
import json, numpy as np, soundfile as sf
SP = '/home/claude/claude-video/ws/'; SR = 44100
TL = json.load(open('tl.json')); D = TL['end']; secs = {s['n']: s for s in TL['secs']}
bj = json.load(open(SP + 'mus3/beats.json'))
aw, _ = sf.read(SP + 'mus3/awak.wav', dtype='float32'); ny, _ = sf.read(SP + 'mus3/nyn_s.wav', dtype='float32'); en, _ = sf.read(SP + 'mus2/entropy.wav', dtype='float32')
aph = bj['aph']; ABAR = 4 * bj['ab']; nph = 0.112; eph = 1.175; X = 2.4; XF = 0.15
N = int((D + 1) * SR)
def take(src, a, n):
    a = int(round(a * SR)); n = int(round(n * SR)); out = np.zeros((n, 2), np.float32); seg = src[max(0, a):max(0, a) + n]; out[:len(seg)] = seg; return out
def place(buf, seg, t0, fi, fo):
    s = int(round(t0 * SR)); seg = seg.copy(); n = len(seg)
    if fi: k = int(fi * SR); seg[:k] *= np.sin(np.linspace(0, np.pi / 2, k))[:, None]
    if fo: k = int(fo * SR); seg[-k:] *= np.cos(np.linspace(0, np.pi / 2, k))[:, None]
    s0 = max(0, s); e = min(len(buf), s + n); buf[s0:e] += seg[s0 - s:e - s]
def bars(src, ph, bar, seq):
    n = len(seq); out = np.zeros((int(round((n * bar + 2 * XF) * SR)) + 8, 2), np.float32); runs = []; j = 0
    while j < n:
        j1 = j
        while j1 + 1 < n and seq[j1 + 1] == seq[j1] + 1: j1 += 1
        runs.append((j, seq[j], j1 - j + 1)); j = j1 + 1
    k = int(2 * XF * SR)
    for r, (j0, b0, m) in enumerate(runs):
        seg = take(src, ph + b0 * bar - XF, m * bar + 2 * XF)
        if r > 0: seg[:k] *= np.linspace(0, 1, k)[:, None]
        if r + 1 < len(runs): seg[-k:] *= np.linspace(1, 0, k)[:, None]
        s = int(round(j0 * bar * SR)); out[s:s + len(seg)] += seg
    return out
def section(src, ph, bar, seq, t0, t1, gain, fin=None, fout=None, pre=None, post=None):
    # fin/fout: fade lengths; pre/post: audio kept before t0 / after t1. Defaults = the short 2.4 s crossfade used between same-track sections.
    fin = X if fin is None else fin; fout = X if fout is None else fout; pre = X / 2 if pre is None else pre; post = X / 2 if post is None else post
    seg = bars(src, ph, bar, seq); a = take(src, ph + seq[0] * bar - pre, pre) if pre > 0 else np.zeros((0, 2), np.float32)
    seg = np.vstack([a, seg[int(XF * SR):int(XF * SR) + int(round((t1 - t0) * SR))], take(src, ph + (seq[-1] + 1) * bar, post)])
    place(bed, gain * seg, t0 - pre, fin, fout)
def fit(seq, loop, n):
    out = list(seq)[:n]; i = 0
    while len(out) < n: out.append(loop[i % len(loop)]); i += 1
    return out
bed = np.zeros((N, 2), np.float32)
A, C, Dd, E = secs['A'], secs['C'], secs['D'], secs['E']
place(bed, 0.85 * take(ny, nph, A['e'] - A['s'] + 2.0), 0, 0.3, 9.5)   # long fade-out into the chapter card
# every seam is an overlapped long crossfade centred on the chapter card: the new music starts LEAD s early (no near-silent intro bars) and fades in over ~6 s while the old one fades out over ~9 s
LC, LD, LE = 5.0, 5.5, 5.0
nC = int(np.ceil((C['e'] - C['s'] + LC) / 1.6))
section(en, eph, 1.6, fit(list(range(12, 32)) + list(range(34, 66)) + list(range(69, 86)) + list(range(34, 44)) + list(range(86, 102)), list(range(34, 50)), nC), C['s'] - LC, C['e'], 1.05, fin=6.5, pre=0, fout=9.5, post=2.0)
nD = int(np.ceil((Dd['e'] - Dd['s'] + LD) / ABAR))
section(aw, aph, ABAR, fit(list(range(2, 16)), list(range(6, 16)), nD), Dd['s'] - LD, Dd['e'], 1.1, fin=6.5, pre=0, fout=8.0, post=3.0)   # enter on bar 2 (bars 0-1 of the source are near-silent)
nE = int(np.ceil((E['e'] - E['s'] + LE) / ABAR))
section(aw, aph, ABAR, fit(list(range(56, 99)), list(range(70, 78)), nE), E['s'] - LE, E['e'], 1.0, fin=6.0, pre=0)
t = np.arange(N) / SR; bed *= np.clip((D - t) / 5.0, 0, 1)[:, None] ** 1.5
sf.write('ki_bed.wav', bed, SR, subtype='FLOAT'); print('bed', round(N / SR, 1), 's  nC', nC, 'nD', nD, 'nE', nE, 'peak', round(float(np.abs(bed).max()), 3))
