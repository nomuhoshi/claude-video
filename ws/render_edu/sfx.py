# 轻音效（无配乐）：字幕铃、轻 tick、转场 whoosh、重点 ding。用法 python3 sfx.py v1
import json, sys, wave, numpy as np
v = sys.argv[1]; m = json.load(open(f'{v}_meta.json')); SR = 48000
out = np.zeros(int((m['total'] + 1) * SR)); rng = np.random.default_rng(7)
def tone(fs, dur, dec, amp):
    t = np.arange(int(dur * SR)) / SR; e = np.exp(-t / dec) * np.minimum(1, t / .004)
    return amp * e * sum(a * np.sin(2 * np.pi * f * t) for f, a in fs)
def whoosh():
    n = int(.7 * SR); x = rng.standard_normal(n); t = np.arange(n) / SR
    k = np.ones(40) / 40; x = np.convolve(x, k, 'same') - np.convolve(x, np.ones(400) / 400, 'same')
    return .22 * x * np.sin(np.pi * t / .7) ** 2
S = {'bell': tone([(1318.5, 1), (2637, .25), (3955, .08)], 1.4, .38, .045),
     'tick': tone([(987.8, 1), (1975.5, .2)], .5, .09, .03),
     'ding': tone([(1760, 1), (2640, .45), (3520, .15)], 2.2, .6, .07),
     'whoosh': whoosh()}
for t, ty in m['cues']:
    s = S[ty]; i = int(t * SR); j = min(len(out), i + len(s)); out[i:j] += s[:j - i]
# 简单混响尾巴
ir = np.exp(-np.arange(int(1.2 * SR)) / SR / .35) * rng.standard_normal(int(1.2 * SR)) * .012
wet = np.convolve(out, ir)[:len(out)]
L = out + wet; R = out + np.roll(wet, 331)
st = np.stack([L, R], 1); st *= .5 / max(1e-9, np.abs(st).max()) if np.abs(st).max() > .5 else 1
with wave.open(f'{v}_audio.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((st * 32767).astype('<i2').tobytes())
print(v, 'audio ok', round(len(out) / SR, 1), 's')
