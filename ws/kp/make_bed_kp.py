# Music bed for the Kepler video: four sections on the video's beat grid.
#   A  The New York Nightfall (sped 1.02854)  hero .. s5     the beautiful design   (90 BPM)
#   C  Entropy                                 ch3 .. s12     Tycho, the war with Mars, the dream (150 BPM, re-cut by bars)
#   D  The Awakening, quiet first half         ch6 .. s17     mother, harmony, old age, death (music steps back at the death)
#   E  The Awakening, end of the climax        s18 .. end     the climax dies away on "explained all three laws"
import json, numpy as np, soundfile as sf, sys
sys.path.insert(0, '.'); import script_kp as F
SP = '/tmp/claude-0/-home-claude/7d578916-a400-5c24-bb34-8996a1a97376/scratchpad/'
bj = json.load(open(SP + 'mus3/beats.json')); B = F.BEAT_A; SR = 44100
aw, _ = sf.read(SP + 'mus3/awak.wav', dtype='float32'); ny, _ = sf.read(SP + 'mus3/nyn_s.wav', dtype='float32')
en, _ = sf.read(SP + 'mus2/entropy.wav', dtype='float32')
aph = bj['aph']; nph = bj['nph'] / 1.02854; eph = 1.175
D = F.DUR; N = int((D + 1) * SR); X = 2.4; XF = 0.15
tC, tD, tE = F.T('ch3'), F.T('ch6'), F.T('s18')

def take(src, a_track, n_sec):
    a = int(round(a_track * SR)); n = int(round(n_sec * SR))
    out = np.zeros((n, 2), np.float32); seg = src[max(0, a):max(0, a) + n]; out[:len(seg)] = seg; return out
def place(buf, seg, t0, fi, fo):
    s = int(round(t0 * SR)); seg = seg.copy(); n = len(seg)
    if fi: k = int(fi * SR); seg[:k] *= np.sin(np.linspace(0, np.pi / 2, k))[:, None]
    if fo: k = int(fo * SR); seg[-k:] *= np.cos(np.linspace(0, np.pi / 2, k))[:, None]
    s0 = max(0, s); e = min(len(buf), s + n); buf[s0:e] += seg[s0 - s:e - s]
def bars(src, ph, bar, seq):
    n = len(seq); out = np.zeros((int(round((n * bar + 2 * XF) * SR)) + 8, 2), np.float32)
    runs = []; j = 0
    while j < n:
        j1 = j
        while j1 + 1 < n and seq[j1 + 1] == seq[j1] + 1: j1 += 1
        runs.append((j, seq[j], j1 - j + 1)); j = j1 + 1
    k = int(2 * XF * SR)
    for r, (j0, b0, m) in enumerate(runs):
        seg = take(src, ph + b0 * bar - XF, m * bar + 2 * XF)
        if r > 0: seg[:k] *= np.sin(np.linspace(0, np.pi / 2, k))[:, None]
        if r + 1 < len(runs): seg[-k:] *= np.cos(np.linspace(0, np.pi / 2, k))[:, None]
        s = int(round(j0 * bar * SR)); out[s:s + len(seg)] += seg
    return out

bed = np.zeros((N, 2), np.float32)
# A: Nightfall from its first downbeat
place(bed, 0.85 * take(ny, nph, tC + X / 2), 0, 0.3, X)
# C: Entropy, 1.6 s bars. Tycho = intro tail + groove A; Mars = groove B + climax; dream = breakdown + mid + outro
nb = lambda a, b: int(round((F.T(b) - F.T(a)) / 1.6))
nT, nM, nDm = nb('ch3', 'ch4'), nb('ch4', 'ch5'), nb('ch5', 'ch6')
segT = list(range(16 - (nT - 16), 16)) + list(range(16, 32))
segM = list(range(34, 66)) + list(range(86, 86 + nM - 32))
segD = [66, 67, 68, 69] + list(range(70, 86)) + list(range(74, 74 + nDm - 20))
seqC = segT + segM + segD
assert len(segT) == nT and len(segM) == nM and len(segD) == nDm, (nT, nM, nDm, len(segT), len(segM), len(segD))
segC = bars(en, eph, 1.6, seqC)
pre = take(en, eph + seqC[0] * 1.6 - X / 2, X / 2)
segC = np.vstack([pre, segC[int(XF * SR):int(XF * SR) + int(round((tD - tC) * SR))], take(en, eph + seqC[-1] * 1.6 + 1.6, X / 2)])
place(bed, 1.10 * segC, tC - X / 2, X, X)
# D: Awakening from its quiet opening (6 beats in)
oA = aph + 6 * B
place(bed, 1.05 * take(aw, oA - X / 2, tE - tD + X), tD - X / 2, X, X)
# E: the climax's last downbeat (track 263.256) one beat before "explained all three laws" ends -> lands on line 5 start
tgt = F.at('s18', 5) - B
oE = tgt - (aph + 394 * B)
place(bed, 1.0 * take(aw, (tE - X / 2) - oE, D + 1 - (tE - X / 2)), tE - X / 2, X, 6.0)
# restraint: the music steps back while "he died on 15 November" and the lost grave are on screen
t1, t2 = F.at('s17', 4, -0.6), F.at('s17', 7, 0.4)
tt = np.arange(N) / SR
dip = 1 - 0.5 * np.clip(np.minimum((tt - t1) / 1.2, (t2 - tt) / 1.6), 0, 1)
bed *= dip[:, None]
print('nT nM nD', nT, nM, nDm, 'E track at tE', round(tE - oE, 2), 'drop at', round(aph + 394 * B + oE, 2), 'end track', round(D - oE, 2), 'peak', round(float(np.abs(bed).max()), 3))
sf.write('kp_bed.wav', bed, SR, subtype='FLOAT')
