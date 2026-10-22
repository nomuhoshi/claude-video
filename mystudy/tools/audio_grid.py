# 卡点配乐：把 vibe.mp3 按小节重新拼到视频长度（字幕在拍上、转场在小节线上，由引擎 window.GRID 保证）
# 用法: python3 tools/audio_grid.py 03_inertia
# vibe.mp3：112.79 BPM，首拍 0.391 s，一拍 0.53194 s，一小节 2.12776 s；89 小节
# 段落（按每小节能量）：前奏 0–7，律动 A 8–39，安静 40–47，律动 B 48–77，收尾 78–85
import json, sys, wave, subprocess, pathlib, numpy as np
SR = 48000
d = pathlib.Path(__file__).parent.parent / sys.argv[1] / 'out'; m = json.load(open(d / 'meta.json'))
mus = pathlib.Path(__file__).parent.parent.parent / 'ws/kit/video-kit/music/vibe.mp3'
B0, BAR = 0.391, 4 * 0.53194
raw = subprocess.run(['ffmpeg', '-loglevel', 'error', '-i', str(mus), '-f', 's16le', '-ac', '2', '-ar', str(SR), '-'], capture_output=True).stdout
mu = np.frombuffer(raw, '<i2').reshape(-1, 2) / 32768.0
N = int(round((m['total'] - B0) / BAR))                       # 视频总小节数（引擎已把结尾补齐到小节线）
INTRO, A, Q, Bb, OUT = list(range(0, 8)), list(range(8, 40)), list(range(40, 48)), list(range(48, 78)), list(range(78, 86))
mid, k = [], 0
cyc = [A, Q, Bb]
while len(mid) < max(0, N - len(INTRO) - len(OUT)): mid += cyc[k % 3]; k += 1
mid = mid[:max(0, N - len(INTRO) - len(OUT))]
plan = (INTRO + mid + OUT)[:N] if N >= 16 else (INTRO + OUT)[:N]
X = int(.02 * SR)                                              # 20 ms 交叉淡化
def bar(i): s = int((B0 + i * BAR) * SR); return mu[s:s + int(BAR * SR) + X].copy()
bed = [mu[:int(B0 * SR)]]
out = np.concatenate(bed + [np.zeros((0, 2))])
for i in plan:
    b = bar(i)
    if len(out) >= X:
        f = np.linspace(0, 1, X)[:, None]; out[-X:] = out[-X:] * (1 - f) + b[:X] * f; out = np.concatenate([out, b[X:]])
    else: out = np.concatenate([out, b])
Ntot = int((m['total'] + .5) * SR); out = np.pad(out, ((0, max(0, Ntot - len(out))), (0, 0)))[:Ntot]
t = np.arange(Ntot) / SR; env = np.minimum(1, (Ntot / SR - t) / 3.0)
out = out * env[:, None] * 0.55
# 轻音效：转场 whoosh、结论 ding（不要每句提示音）
rng = np.random.default_rng(7)
def tone(fs, dur, dec, amp):
    tt = np.arange(int(dur * SR)) / SR; e = np.exp(-tt / dec) * np.minimum(1, tt / .004)
    return amp * e * sum(a * np.sin(2 * np.pi * f * tt) for f, a in fs)
def whoosh():
    n = int(.7 * SR); x = rng.standard_normal(n); tt = np.arange(n) / SR
    x = np.convolve(x, np.ones(40) / 40, 'same') - np.convolve(x, np.ones(400) / 400, 'same')
    return .12 * x * np.sin(np.pi * tt / .7) ** 2
S = {'ding': tone([(1760, 1), (2640, .45), (3520, .15)], 2.2, .6, .05), 'whoosh': whoosh()}
fx = np.zeros(Ntot)
for tc, ty in m['cues']:
    if ty not in S: continue
    s = S[ty]; i = int(tc * SR); j = min(Ntot, i + len(s)); fx[i:j] += s[:j - i]
mix = out + fx[:, None]
pk = np.abs(mix).max(); mix *= min(1, 0.89 / pk)
with wave.open(str(d / 'audio.wav'), 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((mix * 32767).astype('<i2').tobytes())
print('audio', round(Ntot / SR, 1), 's  bars', N, ' plan', plan[:10], '...', plan[-9:])
