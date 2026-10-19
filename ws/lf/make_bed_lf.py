# Music bed for the lifespan video, on the 90 BPM scene grid.
# A: The Awakening from the start (its climax lands just after the "physics" chapter card)
# B: The New York Nightfall from the "2026" chapter card to the recap
# C: the last bars of The Awakening for the recap and the source list
import json, numpy as np, soundfile as sf, sys
sys.path.insert(0, '.'); import script_lf as F
M = '/tmp/claude-0/-home-claude/7d578916-a400-5c24-bb34-8996a1a97376/scratchpad/mus3/'
bj = json.load(open(M + 'beats.json')); B = F.BEAT; SR = 44100
aw, _ = sf.read(M + 'awak.wav', dtype='float32'); ny, _ = sf.read(M + 'nyn_s.wav', dtype='float32')
aph = bj['aph']; nph = bj['nph'] / 1.02854
T = lambda k: F.TL[F.IDX[k]]['s']
t4, tr, D = T('ch4'), T('recap'), F.DUR
N = int((D + 1) * SR)
def take(src, start_track, n_sec):
    a = int(round(start_track * SR)); n = int(round(n_sec * SR))
    out = np.zeros((n, 2), np.float32)
    if a < 0: off = -a; a = 0
    else: off = 0
    seg = src[a:a + n - off]; out[off:off + len(seg)] = seg; return out
def place(buf, seg, t0, fi, fo):
    s = int(round(t0 * SR)); seg = seg.copy(); n = len(seg)
    if fi: k = int(fi * SR); seg[:k] *= np.sin(np.linspace(0, np.pi / 2, k))[:, None]
    if fo: k = int(fo * SR); seg[-k:] *= np.cos(np.linspace(0, np.pi / 2, k))[:, None]
    e = min(len(buf), s + n); buf[s:e] += seg[:e - s]
bed = np.zeros((N, 2), np.float32)
X = 2.4
oA = aph + 8 * B                                   # track = video + oA (beats line up with the video grid)
place(bed, take(aw, oA, t4 + X / 2), 0, 0.0, X)
place(bed, 0.80 * take(ny, nph - X / 2, (tr + X / 2) - (t4 - X / 2)), t4 - X / 2, X, X)
n = round((246.0 - tr - aph) / B); oC = aph + n * B
place(bed, take(aw, tr - X / 2 + oC, D + 1 - (tr - X / 2)), tr - X / 2, X, 5.0)
print('A climax (track 168) at video', round(168 - oA, 2), '| B track at recap', round(nph + tr - t4, 2), '| C track at recap', round(tr + oC, 2), 'end', round(D + oC, 2), '| peak', float(np.abs(bed).max()))
sf.write('lf_bed.wav', bed, SR, subtype='FLOAT')
