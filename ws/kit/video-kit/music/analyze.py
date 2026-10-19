import sys, json
import numpy as np
import librosa

wav = sys.argv[1]
out = sys.argv[2]
y, sr = librosa.load(wav, sr=22050, mono=True)
dur = len(y) / sr
hop = 512

# overall onset strength and a low-band (kick) onset strength
S = np.abs(librosa.stft(y, n_fft=2048, hop_length=hop))
freqs = librosa.fft_frequencies(sr=sr, n_fft=2048)
oenv = librosa.onset.onset_strength(S=librosa.amplitude_to_db(S, ref=np.max), sr=sr, hop_length=hop)
low = S[(freqs >= 35) & (freqs <= 140), :]
low_env = np.maximum(0, np.diff(np.sqrt((low ** 2).sum(axis=0)), prepend=0))

tempo, beat_frames = librosa.beat.beat_track(onset_envelope=oenv, sr=sr, hop_length=hop, trim=False)
tempo = float(np.atleast_1d(tempo)[0])
beats = librosa.frames_to_time(beat_frames, sr=sr, hop_length=hop)
ibi = np.diff(beats)
print("duration %.2f s" % dur)
print("tempo estimate %.2f BPM; beats %d" % (tempo, len(beats)))
print("inter-beat interval median %.4f s, std %.4f s, min %.3f max %.3f" % (np.median(ibi), ibi.std(), ibi.min(), ibi.max()))

# fit a constant grid t = t0 + k*p to the detected beats
k = np.round((beats - beats[0]) / np.median(ibi))
A = np.vstack([np.ones_like(k), k]).T
(t0, p), *_ = np.linalg.lstsq(A, beats, rcond=None)
res = beats - (t0 + p * k)
print("grid fit: t0=%.4f s, period=%.5f s (%.2f BPM), residual std %.1f ms, max %.1f ms" % (t0, p, 60 / p, res.std() * 1000, np.abs(res).max() * 1000))

# is it really constant tempo? compare local periods
n = len(beats)
for a, b in [(0, n // 3), (n // 3, 2 * n // 3), (2 * n // 3, n)]:
    kk = k[a:b]; bb = beats[a:b]
    if len(kk) > 3:
        pp = np.polyfit(kk, bb, 1)[0]
        print("  beats %d-%d local period %.5f s (%.2f BPM)" % (a, b, pp, 60 / pp))

# extend the grid across the whole track
grid = t0 + p * np.arange(-int(t0 / p), int((dur - t0) / p) + 1)
grid = grid[(grid >= 0) & (grid < dur)]
gf = np.clip(np.round(grid * sr / hop).astype(int), 0, len(oenv) - 1)

# downbeat phase: which beat of a 4-beat bar carries the most low-band energy / onset strength
def phase_score(env, m):
    scores = []
    for ph in range(m):
        idx = gf[ph::m]
        win = np.array([env[max(0, i - 1):i + 3].max() for i in idx])
        scores.append(win.mean())
    return np.array(scores)

for m in (4, 8):
    sc_low = phase_score(low_env, m)
    sc_all = phase_score(oenv, m)
    print("phase scores m=%d  low:%s  all:%s" % (m, np.round(sc_low / sc_low.max(), 2).tolist(), np.round(sc_all / sc_all.max(), 2).tolist()))
    print("  best phase low=%d all=%d" % (sc_low.argmax(), sc_all.argmax()))

# energy per second (RMS, dB) to find sections
rms = librosa.feature.rms(y=y, frame_length=2048, hop_length=hop)[0]
rdb = librosa.amplitude_to_db(rms + 1e-9, ref=np.max)
tt = librosa.frames_to_time(np.arange(len(rms)), sr=sr, hop_length=hop)
print("\nenergy (dB re max) every 4 s:")
line = []
for s in range(0, int(dur), 4):
    m = (tt >= s) & (tt < s + 4)
    line.append("%3d:%5.1f" % (s, rdb[m].mean()))
    if len(line) == 8:
        print("  " + "  ".join(line)); line = []
if line: print("  " + "  ".join(line))

# strongest low-band transients (kick / impact) and strongest overall onsets
def peaks(env, count, mindist_s):
    order = np.argsort(env)[::-1]
    chosen = []
    for i in order:
        t = i * hop / sr
        if all(abs(t - c) >= mindist_s for c, _ in chosen):
            chosen.append((t, float(env[i])))
        if len(chosen) >= count: break
    return sorted(chosen)
print("\nstrongest overall onsets (time, strength):")
for t, v in peaks(oenv, 24, 3.0): print("  %7.2f  %.1f" % (t, v))

# bar-level energy: mean RMS dB per 4-beat bar starting at the best phase
bar_len = 4 * p
sc_low = phase_score(low_env, 4)
ph = int(sc_low.argmax())
bar0 = grid[ph]
bars = []
t = bar0
while t + bar_len <= dur:
    m = (tt >= t) & (tt < t + bar_len)
    bars.append((t, float(rdb[m].mean())))
    t += bar_len
print("\nbar0 (downbeat) = %.3f s, bar length %.3f s, %d bars" % (bar0, bar_len, len(bars)))
print("bar energy (bar index @ time: dB):")
row = []
for i, (t, e) in enumerate(bars):
    row.append("%2d@%6.1f:%5.1f" % (i, t, e))
    if len(row) == 6:
        print("  " + "  ".join(row)); row = []
if row: print("  " + "  ".join(row))

json.dump({"duration": dur, "t0": float(t0), "period": float(p), "bpm": 60 / float(p), "downbeat0": float(bar0),
           "bar_len": float(bar_len), "beats_detected": beats.tolist()}, open(out, "w"))
