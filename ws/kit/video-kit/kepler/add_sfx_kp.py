# Extra battlefield sounds for the Kepler video (user asked: the war scene needs burning fire, a battlefield feel).
# Appends to sfx/ and sfx_lib.json: fire_roar (6 s bonfire), fire_crackle (1.2 s), cannon_far (4 s), clash (0.8 s), war_crowd (5 s)
import numpy as np, soundfile as sf, os, json, base64, subprocess
from scipy.signal import butter, sosfilt
SR = 44100
HERE = os.path.dirname(os.path.abspath(__file__)) + '/'
R = np.random.default_rng(11)
def T(d): return np.arange(int(d * SR)) / SR
def bp(x, lo, hi, o=2): return sosfilt(butter(o, [lo, hi], 'band', fs=SR, output='sos'), x)
def lp(x, f, o=2): return sosfilt(butter(o, f, 'low', fs=SR, output='sos'), x)
def hp(x, f, o=2): return sosfilt(butter(o, f, 'high', fs=SR, output='sos'), x)
def norm(x, pk=0.9): m = np.abs(x).max(); return x / m * pk if m > 0 else x
def fade(x, fi=0.01, fo=0.3):
    n1, n2 = int(fi * SR), int(fo * SR); x[:n1] *= np.linspace(0, 1, n1); x[-n2:] *= np.linspace(1, 0, n2); return x
def pops(d, rate, seed, lo=1500, hi=7000, amp=1.0):
    rg = np.random.default_rng(seed); x = np.zeros(int(d * SR))
    n = rg.poisson(rate * d)
    for _ in range(n):
        i = rg.integers(0, len(x) - 2000); L = rg.integers(80, 900); a = rg.uniform(0.2, 1.0) ** 2 * amp
        b = rg.standard_normal(L) * np.exp(-np.arange(L) / (L * 0.25)); x[i:i + L] += a * b
    return bp(x, lo, hi)
def fire_roar(d=6.0):
    t = T(d); n = R.standard_normal(len(t))
    roar = lp(n, 380, 3) * (0.75 + 0.25 * np.sin(2 * np.pi * 0.7 * t) * np.sin(2 * np.pi * 0.23 * t + 1))
    hiss = bp(R.standard_normal(len(t)), 2500, 9000) * 0.12
    x = roar * 1.0 + hiss + pops(d, 26, 3) * 1.6 + pops(d, 6, 4, 300, 1800, 2.0)
    return fade(norm(x, 0.85), 0.4, 0.6)
def fire_crackle(d=1.2):
    x = pops(d, 30, 7) * 1.4 + pops(d, 6, 8, 400, 2000, 1.8) + lp(R.standard_normal(int(d * SR)), 500) * 0.25
    return fade(norm(x, 0.85), 0.01, 0.2)
def cannon_far(d=4.0):
    t = T(d); x = np.zeros_like(t)
    thump = np.sin(2 * np.pi * (48 - 18 * t) * t) * np.exp(-t / 0.35)
    body = lp(R.standard_normal(len(t)), 220, 3) * np.exp(-t / 0.9)
    tail = lp(R.standard_normal(len(t)), 120, 2) * np.exp(-t / 1.8) * 0.8
    crack = hp(R.standard_normal(len(t)), 800) * np.exp(-t / 0.04) * 0.25
    x = thump * 1.2 + body + tail + crack
    return fade(norm(x, 0.9), 0.002, 0.8)
def clash(d=0.8):
    t = T(d); x = np.zeros_like(t)
    for f, a, dc in [(2340, 1, 0.25), (3120, 0.7, 0.18), (4580, 0.5, 0.12), (1730, 0.6, 0.3), (5960, 0.3, 0.08)]:
        x += a * np.sin(2 * np.pi * f * t + R.uniform(0, 6)) * np.exp(-t / dc) * (1 + 0.15 * np.sin(2 * np.pi * 7 * t))
    x += hp(R.standard_normal(len(t)), 2000) * np.exp(-t / 0.02) * 0.8
    return fade(norm(x, 0.8), 0.001, 0.2)
def war_crowd(d=5.0):
    t = T(d); x = np.zeros_like(t)
    for k in range(14):
        f0 = R.uniform(110, 260); ph = R.uniform(0, 6); seg = np.sin(2 * np.pi * f0 * t + 3 * np.sin(2 * np.pi * R.uniform(2, 5) * t + ph))
        e = np.clip(np.sin(2 * np.pi * R.uniform(0.2, 0.6) * t + ph), 0, 1) ** 2
        x += seg * e * R.uniform(0.3, 1)
    x = bp(x, 200, 1400) + bp(R.standard_normal(len(t)), 300, 1200) * 0.6
    return fade(norm(lp(x, 2000), 0.7), 0.5, 0.8)
S = {'fire_roar': fire_roar(), 'fire_crackle': fire_crackle(), 'cannon_far': cannon_far(), 'clash': clash(), 'war_crowd': war_crowd()}
lib = json.load(open(HERE + 'sfx_lib.json'))
for k, x in S.items():
    w = HERE + 'sfx/' + k + '.wav'; m = HERE + 'sfx/' + k + '.mp3'
    sf.write(w, x.astype(np.float32), SR)
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', w, '-ac', '1', '-b:a', '96k', m], check=True)
    lib[k] = base64.b64encode(open(m, 'rb').read()).decode(); os.remove(w)
json.dump(lib, open(HERE + 'sfx_lib.json', 'w'))
print('added', list(S), 'lib size', sum(len(v) for v in lib.values()) // 1024, 'KB')
