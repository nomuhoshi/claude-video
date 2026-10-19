# Builds the music bed for the Faraday video, aligned to the 90 BPM scene grid.
# A: Entropy (opening, 150 BPM grid)  ->  B: The New York Nightfall (the experiments)  ->  C: The Awakening (build and climax at Maxwell)
import json, numpy as np, soundfile as sf, sys
sys.path.insert(0, '.'); import script_fd as F
M = '/tmp/claude-0/-home-claude/7d578916-a400-5c24-bb34-8996a1a97376/scratchpad/mus3/'
bj = json.load(open(M + 'beats.json')); B = F.BEAT; SR = 44100
aw, _ = sf.read(M + 'awak.wav', dtype='float32'); ny, _ = sf.read(M + 'nyn_s.wav', dtype='float32')
aph = bj['aph']; nph = bj['nph'] / 1.02854
T = lambda k: F.TL[F.IDX[k]]['s']
t3, t6, t21, D = T('ch3'), T('ch6'), T('s21'), F.DUR
N = int((D + 1) * SR)
def take(src, start_track, t0, t1):
    """samples of src for video times [t0, t1) where video t -> track (t + start_track - t0)"""
    a = int(round((start_track) * SR)); n = int(round((t1 - t0) * SR))
    out = np.zeros((n, 2), np.float32); seg = src[max(0, a):max(0, a) + n]; out[:len(seg)] = seg; return out
def place(buf, seg, t0, fi, fo):
    s = int(round(t0 * SR)); seg = seg.copy(); n = len(seg)
    if fi: k = int(fi * SR); seg[:k] *= np.sin(np.linspace(0, np.pi / 2, k))[:, None]
    if fo: k = int(fo * SR); seg[-k:] *= np.cos(np.linspace(0, np.pi / 2, k))[:, None]
    e = min(len(buf), s + n); buf[s:e] += seg[:e - s]
bed = np.zeros((N, 2), np.float32)
X = 2.4
# A: video 0..t3(+X/2), track = t + aph
en, _ = sf.read('/tmp/claude-0/-home-claude/7d578916-a400-5c24-bb34-8996a1a97376/scratchpad/mus2/entropy.wav', dtype='float32')
place(bed, 1.15 * take(en, 1.175, 0, t3 + X / 2), 0, 0.3, X)
# B: nightfall from its first beat, starting exactly at the chapter card t3 (pre-rolled by X/2)
s0 = nph
place(bed, 0.80 * take(ny, max(0.0, s0 - X / 2), t3 - X / 2, t6 + X / 2), t3 - X / 2, X, X)
# C: awakening again, its climax (track 165 s) landing on Maxwell's scene
n = round((t21 - 165.0 + aph) / B); oC = n * B - aph
place(bed, take(aw, (t6 - X / 2) - oC, t6 - X / 2, D + 1), t6 - X / 2, X, 6.0)
peak = np.abs(bed).max(); print('t3', round(t3, 2), 't6', round(t6, 2), 'C track at t6', round(t6 - oC, 2), 'climax at video', round(165 + oC, 2), 'end track', round(D - oC, 2), 'peak', peak)
sf.write('fd_bed.wav', bed, SR, subtype='FLOAT')
json.dump(dict(segs=[[0, 0, int(D / F.BAR) + 3]], beat0=0.0, bar=F.BAR), open('music_plan.json', 'w'))
