import sys, json
import numpy as np
import librosa

wav = sys.argv[1]
out = sys.argv[2]
y, sr = librosa.load(wav, sr=22050, mono=True)
dur = len(y) / sr
hop = 128  # 5.8 ms resolution
S = np.abs(librosa.stft(y, n_fft=1024, hop_length=hop))
freqs = librosa.fft_frequencies(sr=sr, n_fft=1024)

def band_flux(lo, hi):
    b = S[(freqs >= lo) & (freqs <= hi), :]
    e = np.log1p(b.sum(axis=0))
    d = np.maximum(0, np.diff(e, prepend=e[0]))
    return d / (d.max() + 1e-9)

kick = band_flux(35, 160)
mid = band_flux(160, 5000)
hat = band_flux(5000, 10000)
env = 1.0 * kick + 0.6 * mid + 0.3 * hat
fps = sr / hop

def comb_score(p, t0, e, t_from=0.0, t_to=None):
    t_to = dur if t_to is None else t_to
    ts = np.arange(t0 + np.ceil((t_from - t0) / p) * p, t_to, p)
    idx = np.round(ts * fps).astype(int)
    idx = idx[(idx > 1) & (idx < len(e) - 2)]
    return sum(e[i - 1:i + 2].max() for i in idx) / max(1, len(idx))

# coarse-to-fine grid search for the period and phase over the whole track
best = (0, 0, 0)
for p in np.arange(0.520, 0.548, 0.0004):
    for t0 in np.arange(0, p, 0.006):
        s = comb_score(p, t0, env)
        if s > best[0]: best = (s, p, t0)
s0_, p0, t00 = best
for p in np.arange(p0 - 0.0006, p0 + 0.0006, 0.00002):
    for t0 in np.arange(t00 - 0.012, t00 + 0.012, 0.001):
        s = comb_score(p, t0 % p, env)
        if s > best[0]: best = (s, p, t0 % p)
score, p, t0 = best
print("global comb fit: period %.5f s (%.2f BPM), t0 %.3f s, score %.3f" % (p, 60 / p, t0, score))

# does a single grid hold across the track? best phase for each 20 s window with the global period
print("phase drift by window (ms; 0 means the grid fits):")
row = []
for a in range(0, int(dur) - 10, 20):
    bp = max(np.arange(-0.15, 0.15, 0.004), key=lambda d: comb_score(p, (t0 + d) % p, env, a, a + 20))
    row.append("%3d-%3ds:%+5.0f" % (a, a + 20, bp * 1000))
print("  " + "  ".join(row))

# which beat of the bar is strongest (kick), checked per section
grid = t0 + p * np.arange(0, int((dur - t0) / p))
gi = np.round(grid * fps).astype(int)
kscore = np.array([kick[max(0, i - 2):i + 4].max() for i in gi])
for m in (4,):
    ph = [kscore[k::m].mean() for k in range(m)]
    print("kick strength by beat-in-bar (4):", np.round(np.array(ph) / max(ph), 2).tolist())

# bar boundary: the strongest of the four phases using kick + low-mid weight
phase_energy = np.zeros(4)
for k in range(4):
    sel = gi[k::4]
    phase_energy[k] = np.mean([env[max(0, i - 2):i + 4].max() for i in sel])
bar_phase = int(phase_energy.argmax())
print("downbeat phase (beat index mod 4) = %d; phase energy %s" % (bar_phase, np.round(phase_energy / phase_energy.max(), 2).tolist()))
downbeat0 = grid[bar_phase]
print("first downbeat %.3f s, bar length %.3f s" % (downbeat0, 4 * p))

json.dump({"duration": dur, "period": float(p), "t0": float(t0), "bpm": 60 / float(p),
           "bar_phase": bar_phase, "downbeat0": float(downbeat0)}, open(out, "w"))
