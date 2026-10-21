# 轻音效 + 配乐（不卡点）。用法: python3 tools/audio.py 01_taylor [music.mp3] [音乐增益]
import json, sys, wave, subprocess, numpy as np, pathlib
d = pathlib.Path(__file__).parent.parent / sys.argv[1] / 'out'; m = json.load(open(d / 'meta.json')); SR = 48000
mus = sys.argv[2] if len(sys.argv) > 2 else str(pathlib.Path(__file__).parent.parent.parent / 'ws/kit/video-kit/music/vibe.mp3')
MG = float(sys.argv[3]) if len(sys.argv) > 3 else 0.30
N = int((m['total'] + 0.5) * SR); out = np.zeros(N); rng = np.random.default_rng(7)
def tone(fs, dur, dec, amp):
    t = np.arange(int(dur * SR)) / SR; e = np.exp(-t / dec) * np.minimum(1, t / .004)
    return amp * e * sum(a * np.sin(2 * np.pi * f * t) for f, a in fs)
def whoosh():
    n = int(.7 * SR); x = rng.standard_normal(n); t = np.arange(n) / SR
    x = np.convolve(x, np.ones(40) / 40, 'same') - np.convolve(x, np.ones(400) / 400, 'same')
    return .22 * x * np.sin(np.pi * t / .7) ** 2
S = {'bell': tone([(1318.5, 1), (2637, .25), (3955, .08)], 1.4, .38, .05),
     'tick': tone([(987.8, 1), (1975.5, .2)], .5, .09, .035),
     'ding': tone([(1760, 1), (2640, .45), (3520, .15)], 2.2, .6, .08),
     'whoosh': whoosh()}
for t, ty in m['cues']:
    s = S[ty]; i = int(t * SR); j = min(N, i + len(s)); out[i:j] += s[:j - i]
ir = np.exp(-np.arange(int(1.2 * SR)) / SR / .35) * rng.standard_normal(int(1.2 * SR)) * .012
wet = np.convolve(out, ir)[:N]; fx = np.stack([out + wet, out + np.roll(wet, 331)], 1)
raw = subprocess.run(['ffmpeg', '-loglevel', 'error', '-i', mus, '-f', 's16le', '-ac', '2', '-ar', str(SR), '-'], capture_output=True).stdout
mu = np.frombuffer(raw, '<i2').reshape(-1, 2) / 32768.0
reps = int(np.ceil(N / len(mu))) + 1; X = 0.4 * SR; X = int(X)          # 循环处 0.4 秒交叉淡化
loop = mu.copy()
while len(loop) < N:
    f = np.linspace(0, 1, X)[:, None]; tail = loop[-X:] * (1 - f) + mu[:X] * f
    loop = np.concatenate([loop[:-X], tail, mu[X:]])
loop = loop[:N]; t = np.arange(N) / SR
env = np.minimum(1, t / 2.5) * np.minimum(1, (N / SR - t) / 3.5)
mix = fx + MG * loop * env[:, None]
pk = np.abs(mix).max(); mix *= min(1, 0.89 / pk)
with wave.open(str(d / 'audio.wav'), 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((mix * 32767).astype('<i2').tobytes())
print('audio', round(N / SR, 1), 's  peak', round(pk, 3))
