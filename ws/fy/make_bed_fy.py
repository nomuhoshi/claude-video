# Music bed for the Feynman lecture film. Six sections, each ONE continuous run of bars (no seams inside a section):
#  A Nightfall bars 1.. (hero–s4) | B Awakening bars 2.. (ch2–s8) | C vibe.mp3 from bar 0 (ch3–s13) |
#  F Nightfall re-pitched −2 semitones, bars 18.. (ch4–s16) | D Entropy bars 16.. (ch5–ch6, dip at bars 66–69) | E Awakening bars 62.. (ch7–end)
import json, math, numpy as np, soundfile as sf
from scipy.signal import resample_poly
SP = '/home/claude/claude-video/ws/'; SR = 44100
TL = json.load(open('tl.json')); D = TL['end']; secs = {s['n']: s for s in TL['secs']}
bj = json.load(open(SP + 'mus3/beats.json'))
def rd(p):
    x, sr = sf.read(p, dtype='float32'); assert sr == SR, p
    return x if x.ndim == 2 else np.stack([x, x], 1)
aw = rd(SP + 'mus3/awak.wav'); ny = rd(SP + 'mus3/nyn_s.wav'); en = rd(SP + 'mus2/entropy.wav'); vb = rd(SP + 'php/vibe.wav')
R = 8 / 9
nys = np.stack([resample_poly(ny[:, c], 8, 9) for c in range(2)], 1).astype(np.float32)   # played 8/9 as fast -> −2.04 semitones, grid x 9/8
X = 2.4; XF = 0.15
N = int((D + 1) * SR)
def take(src, a, n):
    a = int(round(a * SR)); n = int(round(n * SR)); out = np.zeros((n, 2), np.float32); seg = src[max(0, a):max(0, a) + n]; out[:len(seg)] = seg; return out
def place(buf, seg, t0, fi, fo):
    s = int(round(t0 * SR)); seg = seg.copy(); n = len(seg)
    if fi: k = int(fi * SR); seg[:k] *= np.sin(np.linspace(0, np.pi / 2, k))[:, None]
    if fo: k = int(fo * SR); seg[-k:] *= np.cos(np.linspace(0, np.pi / 2, k))[:, None]
    s0 = max(0, s); e = min(len(buf), s + n); buf[s0:e] += seg[s0 - s:e - s]
def section(src, ph, bar, b0, name, gain, lead=0.0):
    """one continuous run starting at bar b0 of the source, laid at the section start; lead-in/out of X/2 for the cross-fade between sections"""
    sec = secs[name]; dur = sec['e'] - sec['s']
    pre = take(src, ph + b0 * bar - X / 2, X / 2); body = take(src, ph + b0 * bar, dur); post = take(src, ph + b0 * bar + dur, X / 2)
    place(bed, gain * np.vstack([pre, body, post]), sec['s'] - X / 2, X, X)
bed = np.zeros((N, 2), np.float32)
nb, nph = bj['nb'], bj['nph']; ab, aph = bj['ab'], bj['aph']
section(ny, nph, 8 * nb, 1, 'A', 0.9)
section(aw, aph, 4 * ab, 2, 'B', 1.1)
section(vb, 0.391, 4 * 0.53194, 0, 'C', 0.55)
section(nys, nph / R, 8 * nb / R, 18, 'F', 0.9)
section(en, 1.175, 1.6, 16, 'D', 1.05)
section(aw, aph, 4 * ab, 62, 'E', 1.0)
t = np.arange(N) / SR; bed *= np.clip((D - t) / 5.0, 0, 1)[:, None] ** 1.5
sf.write('fy_bed.wav', bed, SR, subtype='FLOAT'); print('bed', round(N / SR, 1), 's  peak', round(float(np.abs(bed).max()), 3))
