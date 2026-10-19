import sys, json
import numpy as np

g = json.load(open(sys.argv[1]))
p, t0 = g["period"], g["t0"]
bar = 4 * p
C = np.array([6.35, 34.35, 60.35, 92.35, 112.35, 137.35])   # current chapter impact times
names = ["营收", "九月", "利润率", "预期", "看点", "风险"]
MAXBAR = 0.8   # snap to a bar line only if the move is at most this many seconds

def plan(s0):
    rows = []
    total = 0.0
    for i, c in enumerate(C):
        m = c + s0                       # music time of the current impact
        kb = (m - t0) / bar
        bar_target = t0 + round(kb) * bar
        if i == 0:
            target = t0 + 8 * bar        # groove starts here
        elif i == 3:
            target = t0 + 48 * bar       # the drop
        elif abs(bar_target - m) <= MAXBAR:
            target = bar_target
        else:
            kb2 = (m - t0) / p
            target = t0 + round(kb2) * p
        shift = target - m
        total += abs(shift)
        beat = (target - t0) / p
        rows.append((names[i], c, c + shift, shift, int(np.floor(beat / 4 + 1e-6)), int(round(beat)) % 4))
    return total, rows

best = None
for s0 in np.arange(10.4, 11.3, 0.001):
    total, rows = plan(s0)
    forced = abs(rows[0][3]) + abs(rows[3][3])
    score = total + 0.5 * forced
    if best is None or score < best[0]: best = (score, s0, rows, total)
score, s0, rows, total = best
print("chosen s0 = %.3f s (music time at video 0), total |shift| = %.2f s" % (s0, total))
print("chapter  old impact -> new impact  shift   bar beat-in-bar")
for r in rows:
    print("  %-4s %8.2f -> %8.2f  %+6.2f   %3d   %d" % (r[0], r[1], r[2], r[3], r[4], r[5]))

# structural facts for the page
print("\nmusic bars on the video timeline:")
for k in (0, 8, 40, 48, 78):
    print("  bar %2d starts at music %.2f s = video %.2f s" % (k, t0 + k * bar, t0 + k * bar - s0))
print("video 156 s corresponds to music time %.2f s (track length %.2f s)" % (156 + s0, g["duration"]))
out = {"s0": round(s0, 3), "period": p, "t0": t0, "chapters": [round(r[2], 3) for r in rows]}
json.dump(out, open(sys.argv[2], "w"))
print(json.dumps(out))
