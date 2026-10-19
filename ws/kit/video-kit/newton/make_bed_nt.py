# Music bed for the Newton video: four sections, each locked to the video's beat grid.
#   A  The Awakening, quiet build            hero .. s7   (track starts 6 beats in, skipping the silent lead-in)
#   B  The New York Nightfall (sped 1.02854) ch3 .. s17   (75 bars; a 9-bar stretch of the groove is played twice)
#   C  Entropy                                ch5 .. s20   (build bars 12-15, groove B 34-65, mid 70+)
#   D  The Awakening, climax -> quiet tail    ch6 .. end   (the climax dies away right as the "seashore" scene begins)
import json, numpy as np, soundfile as sf, sys
sys.path.insert(0, '.'); import script_nt as F
SP = '/tmp/claude-0/-home-claude/7d578916-a400-5c24-bb34-8996a1a97376/scratchpad/'
bj = json.load(open(SP + 'mus3/beats.json')); B = F.BEAT_A; SR = 44100
aw, _ = sf.read(SP + 'mus3/awak.wav', dtype='float32'); ny, _ = sf.read(SP + 'mus3/nyn_s.wav', dtype='float32')
en, _ = sf.read(SP + 'mus2/entropy.wav', dtype='float32')
aph = bj['aph']; nph = bj['nph'] / 1.02854; eph = 1.175   # first downbeat of each track
D = F.DUR; N = int((D + 1) * SR); X = 2.4; XF = 0.15
tA, tB, tC, tD = F.T('hero'), F.T('ch3'), F.T('ch5'), F.T('ch6')

def take(src, a_track, n_sec):
    a = int(round(a_track * SR)); n = int(round(n_sec * SR))
    out = np.zeros((n, 2), np.float32); seg = src[max(0, a):max(0, a) + n]; out[:len(seg)] = seg; return out
def place(buf, seg, t0, fi, fo):
    s = int(round(t0 * SR)); seg = seg.copy(); n = len(seg)
    if fi: k = int(fi * SR); seg[:k] *= np.sin(np.linspace(0, np.pi / 2, k))[:, None]
    if fo: k = int(fo * SR); seg[-k:] *= np.cos(np.linspace(0, np.pi / 2, k))[:, None]
    s0 = max(0, s); e = min(len(buf), s + n); buf[s0:e] += seg[s0 - s:e - s]
def bars(src, ph, bar, seq, t0):
    """play whole bars of src (bar numbers counted from its first downbeat ph) starting at video time t0; equal-power joins"""
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
    return out, t0 - XF

bed = np.zeros((N, 2), np.float32)
# A
oA = aph + 6 * B
place(bed, 1.05 * take(aw, oA, tB + X / 2), 0, 0.4, X)
# B: 75 bars of 4 beats
nB = int(round((tC - tB) / (4 * B)))
k = 40; seqB = list(range(0, k)) + list(range(k - 9, k - 9 + nB - k))
assert len(seqB) == nB, (len(seqB), nB)
segB, sB = bars(ny, nph, 4 * B, seqB, tB)
pre = take(ny, max(0.0, nph - X / 2), X / 2)                          # pre-roll so the cross-fade has material
segB = np.vstack([pre, segB[int(XF * SR):]]); sB = tB - X / 2
tail = take(ny, nph + seqB[-1] * 4 * B + 4 * B, X / 2); segB = np.vstack([segB[:int(round((tC - sB) * SR))], tail])
place(bed, 0.80 * segB, sB, X, X)
# C: Entropy, bar = 1.6 s
nC = int(round((tD - tC) / 1.6))
seqC = [12, 13, 14, 15] + list(range(34, 66)) + list(range(70, 70 + nC - 36))
assert len(seqC) == nC
segC, _ = bars(en, eph, 1.6, seqC, tC)
pre = take(en, eph + 12 * 1.6 - X / 2, X / 2)
segC = np.vstack([pre, segC[int(XF * SR):int(XF * SR) + int(round((tD - tC) * SR))], take(en, eph + seqC[-1] * 1.6 + 1.6, X / 2)])
place(bed, 1.10 * segC, tC - X / 2, X, X)
# D: the climax's last downbeat (track 263.256) one beat before the seashore scene
oD = (F.T('s24') - B) - (aph + 394 * B)
tE = 762 * B                                                        # ~508 s: the quiet tail runs out; recap gets the opening bars again
segD = take(aw, (tD - X / 2) - oD, tE + X / 2 - (tD - X / 2))
place(bed, 1.0 * segD, tD - X / 2, X, X)
place(bed, 1.05 * take(aw, oA - X / 2, D + 1 - (tE - X / 2)), tE - X / 2, X, 6.0)
# a moment of restraint: the music steps back while "he died in his sleep ... aged 84" is on screen
t1, t2 = F.at('s22', 0, -0.6), F.at('s22', 2, 0.4)
tt = np.arange(N) / SR
dip = 1 - 0.5 * np.clip(np.minimum((tt - t1) / 1.2, (t2 - tt) / 1.6), 0, 1)
bed *= dip[:, None]
peak = np.abs(bed).max()
print('A..', round(tB, 2), 'B bars', nB, 'C bars', nC, 'D track at tD', round(tD - oD, 2), 'drop at video', round(aph + 394 * B + oD, 2), 'end track', round(D - oD, 2), 'peak', round(float(peak), 3))
sf.write('nt_bed.wav', bed, SR, subtype='FLOAT')
