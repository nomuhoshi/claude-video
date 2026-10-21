# Music bed for the Galileo video (v2): four sections on the video's beat grid.
#   A  The New York Nightfall (sped 1.02854)   hero .. s4     the verdict, the boy, falling bodies   (90 BPM)
#   C  Entropy, re-cut by 1.6 s bars           ch3 .. s10    the telescope years                    (150 BPM)
#        j0-19 bars 12-31 (intro tail + groove A) | j20-35 bars 34-49 (groove B) | j36-59 bars 78-101 (build -> climax; the climax
#        lands on 200.0 s, "it was not a star, it was a moon") | j60-79 bars 66-85 (break + mid, for the Medici / Venus)
#   D  The Awakening, quiet and mid bars       ch4 .. s20    verdict, house arrest, blindness, handover (re-cut by 2.667 s bars)
#   E  The Awakening, climax -> tail           s21 .. end    the climax's last downbeat (track 263.256) lands on "hammer and feather land"
import json, numpy as np, soundfile as sf, sys
sys.path.insert(0, '.'); import script_gl as F
SP = '/home/claude/claude-video/ws/'
bj = json.load(open(SP + 'mus3/beats.json')); B = F.BEAT_A; SR = 44100
aw, _ = sf.read(SP + 'mus3/awak.wav', dtype='float32'); ny, _ = sf.read(SP + 'mus3/nyn_s.wav', dtype='float32')
en, _ = sf.read(SP + 'mus2/entropy.wav', dtype='float32')
aph = bj['aph']; nph = bj['nph'] / 1.02854; eph = 1.175; ABAR = 4 * bj['ab']
D = F.DUR; N = int((D + 1) * SR); X = 2.4; XF = 0.15
tC, tD, tE = F.T('ch3'), F.T('ch4'), F.T('s21')

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
# A: Nightfall from its first downbeat, slightly under so the verdict stays dark
place(bed, 0.85 * take(ny, nph, tC - 0 + X / 2), 0, 0.3, X)
# C: Entropy
nC = int(round((tD - tC) / 1.6)); assert nC == 80, nC
seqC = list(range(12, 32)) + list(range(34, 50)) + list(range(78, 102)) + list(range(66, 86))
assert len(seqC) == nC
segC = bars(en, eph, 1.6, seqC)
pre = take(en, eph + seqC[0] * 1.6 - X / 2, X / 2)
segC = np.vstack([pre, segC[int(XF * SR):int(XF * SR) + int(round((tD - tC) * SR))], take(en, eph + seqC[-1] * 1.6 + 1.6, X / 2)])
place(bed, 1.10 * segC, tC - X / 2, X, X)
# D: Awakening, re-cut by bars. quiet/mid for the verdict, quiet again for the arrest and blindness, a rise for the new book,
#    a dip for the death, a rise for Newton.
nD = int(round((tE - tD) / ABAR)); assert nD == 78, nD
seqD = (list(range(1, 21)) + list(range(21, 38)) + list(range(6, 21)) + list(range(38, 47)) + list(range(13, 21)) + list(range(47, 56)))
assert len(seqD) == nD, len(seqD)
segD = bars(aw, aph, ABAR, seqD)
preD = take(aw, aph + seqD[0] * ABAR - X / 2, X / 2)
segD = np.vstack([preD, segD[int(XF * SR):int(XF * SR) + int(round((tE - tD) * SR))], take(aw, aph + seqD[-1] * ABAR + ABAR, X / 2)])
place(bed, 1.05 * segD, tD - X / 2, X, X)
# E: the climax's last downbeat (track 263.256) lands on "the hammer and the feather land together" (line 5 of s21)
tgt = F.at('s21', 5)
oE = tgt - (aph + 394 * B)
place(bed, 1.0 * take(aw, (tE - X / 2) - oE, D + 1 - (tE - X / 2)), tE - X / 2, X, 6.0)
# restraint: the music steps back during the death and the burial (s19 lines 0-3)
t1, t2 = F.at('s19', 0, -0.4), F.at('s19', 4, 0.2)
tt = np.arange(N) / SR
dip = 1 - 0.5 * np.clip(np.minimum((tt - t1) / 1.2, (t2 - tt) / 1.6), 0, 1)
bed *= dip[:, None]
print('E track at tE', round(tE - oE, 2), 'drop at video', round(aph + 394 * B + oE, 2), 'end track', round(D - oE, 2), 'peak', round(float(np.abs(bed).max()), 3))
sf.write('gl_bed.wav', bed, SR, subtype='FLOAT')
m = np.abs(bed).mean(1); n4 = 8 * SR
print([ (i // SR, round(float(np.sqrt((m[i:i+n4]**2).mean())), 2)) for i in range(0, len(m) - n4, n4)])
