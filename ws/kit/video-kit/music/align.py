import sys, json
import numpy as np
import librosa

wav = sys.argv[1]
g = json.load(open(sys.argv[2]))
p, t0 = g["period"], g["t0"]
bar = 4 * p
y, sr = librosa.load(wav, sr=22050, mono=True)
rms = librosa.feature.rms(y=y, frame_length=2048, hop_length=512)[0]
rdb = librosa.amplitude_to_db(rms + 1e-9, ref=np.max)
tt = librosa.frames_to_time(np.arange(len(rms)), sr=sr, hop_length=512)

# bar energies on the corrected grid
nb = int((len(y) / sr - t0) / bar)
ben = []
for k in range(nb):
    m = (tt >= t0 + k * bar) & (tt < t0 + (k + 1) * bar)
    ben.append(rdb[m].mean())
ben = np.array(ben)
print("bar energy dB (bar: start s):")
row = []
for k in range(nb):
    row.append("%2d@%5.1f:%5.1f" % (k, t0 + k * bar, ben[k]))
    if len(row) == 8:
        print("  " + "  ".join(row)); row = []
if row: print("  " + "  ".join(row))

# section changes = bars where energy jumps by more than 2.5 dB versus the previous 2 bars
print("\nsection changes (bar, start s, dB step):")
for k in range(2, nb):
    step = ben[k] - ben[max(0, k - 2):k].mean()
    if abs(step) > 2.5 and (k % 4 == 0):
        print("  bar %2d @ %6.2f s  %+5.1f dB" % (k, t0 + k * bar, step))

C = np.array([6.35, 34.35, 60.35, 92.35, 112.35, 137.35])  # current chapter impact times in the video
names = ["营收", "九月", "利润率", "预期", "看点", "风险"]

def errs(s0):
    b = (C + s0 - t0) / p
    e = (b - np.round(b)) * p          # >0: impact is after the nearest beat
    bb = (C + s0 - t0) / bar
    eb = (bb - np.round(bb)) * bar     # distance to nearest bar line
    return e, eb

print("\ncandidate music offsets s0 (music time at video t=0), scored by worst beat error:")
cands = []
for s0 in np.arange(0, 40, 0.002):
    e, eb = errs(s0)
    cands.append((np.abs(e).max(), s0))
cands.sort()
shown = []
for worst, s0 in cands:
    if all(abs(s0 - q) > 0.6 for q in shown):
        shown.append(s0)
        e, eb = errs(s0)
        beat_in_bar = np.round(((C + s0 - e - t0) / p)) % 4
        bar_idx = np.floor((C + s0 - e - t0) / bar + 1e-6).astype(int)
        print("  s0=%6.3f worst %3.0f ms | err ms %s | beat-in-bar %s | bars %s | bar-line dist ms %s" % (
            s0, worst * 1000, np.round(e * 1000).astype(int).tolist(), beat_in_bar.astype(int).tolist(),
            bar_idx.tolist(), np.round(eb * 1000).astype(int).tolist()))
    if len(shown) >= 8: break

print("\nconstrained search: chapter 1 near the groove start (bar 8), chapter 4 near the drop (bar 48)")
best = None
for s0 in np.arange(8, 14, 0.001):
    e, eb = errs(s0)
    bar_idx = (C + s0 - e - t0) / bar
    # ch1 should land on bar 8, ch4 on bar 48 (within half a beat)
    c1 = abs(bar_idx[0] - 8) * bar
    c4 = abs(bar_idx[3] - 48) * bar
    score = np.abs(e).max() + 0.3 * (c1 + c4)
    if best is None or score < best[0]: best = (score, s0, e, eb, c1, c4)
score, s0, e, eb, c1, c4 = best
print("  best s0=%.3f | beat err ms %s | ch1 dist to bar 8: %.0f ms | ch4 dist to bar 48: %.0f ms" % (
    s0, np.round(e * 1000).astype(int).tolist(), c1 * 1000, c4 * 1000))
print("  bar index of each chapter after snapping:", np.round((C + s0 - e - t0) / bar, 2).tolist())
print("  bar-line distance ms:", np.round(eb * 1000).astype(int).tolist())
