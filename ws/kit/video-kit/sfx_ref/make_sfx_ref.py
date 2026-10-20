# Our own re-synthesis of the sounds the user liked in the reference channel (比特新语 · 擦肩 / 光遗传学).
# Nothing here is sampled from the reference; every sound is built from measurements of it (see NOTES.md).
#   meteor_1..6  : one neutrino/meteor streak = crisp broadband click (~15 ms) + soft glass ping (A-minor pentatonic, 0.6 s) + airy tail
#   count_tick   : one irregular "detector" click for running counters (fire 4-6 per second, irregular)
#   count_roll   : 2 s accelerating digit roll (ticks speed up, pitch creeps up)
#   data_burst   : 3 s broadband granular static swell (centroid ~4.8 kHz) for a reveal at the end of a count
#   sparkle_bed  : 6 s loop of ~22 tiny 2-4 kHz twinkles per second (the "dust" under a meteor shower)
#   sub_pad      : 12 s loopable sub drone 35-70 Hz (the reference keeps ~60% of its energy below 60 Hz)
#   sub_drop     : deep impact with a 2.5 s tail for chapter reveals
#   ui_ping_1..3 : quiet sine blips 1.3 / 1.76 / 2.1 kHz for a label or number appearing
#   riser / downer : 3 s pitch sweeps before / after a reveal
# Writes sfx/<name>.mp3 and sfx_ref_lib.json {name: base64 mp3} next to this script.
import numpy as np, soundfile as sf, os, json, base64, subprocess
from scipy.signal import butter, sosfilt
SR = 44100
HERE = os.path.dirname(os.path.abspath(__file__)) + '/'
OUT = HERE + 'sfx/'; os.makedirs(OUT, exist_ok=True)
R = np.random.default_rng(21)
def T(d): return np.arange(int(d * SR)) / SR
def bp(x, lo, hi, o=2): return sosfilt(butter(o, [lo, hi], 'band', fs=SR, output='sos'), x)
def lp(x, f, o=2): return sosfilt(butter(o, f, 'low', fs=SR, output='sos'), x)
def hp(x, f, o=2): return sosfilt(butter(o, f, 'high', fs=SR, output='sos'), x)
def norm(x, pk=0.9): m = np.abs(x).max(); return x / m * pk if m > 0 else x
def fade(x, fi=0.002, fo=0.05):
    n1, n2 = int(fi * SR), int(fo * SR)
    if n1: x[:n1] *= np.linspace(0, 1, n1)
    if n2: x[-n2:] *= np.linspace(1, 0, n2)
    return x
def add(dst, src, at):
    i = int(at * SR); e = min(len(dst), i + len(src))
    if e > i: dst[i:e] += src[:e - i]
    return dst
def glass_ping(f, d=0.7, amp=1.0):
    t = T(d)
    x = (np.sin(2 * np.pi * f * t) + 0.35 * np.sin(2 * np.pi * f * 2.003 * t) * np.exp(-t / 0.08) + 0.18 * np.sin(2 * np.pi * f * 3.01 * t) * np.exp(-t / 0.04))
    env = np.minimum(1, t / 0.004) * np.exp(-t / 0.22)
    return amp * x * env
def click(d=0.03, bright=1.0, seed=0):
    rg = np.random.default_rng(seed); t = T(d)
    n = rg.standard_normal(len(t)) * np.exp(-t / 0.0035)
    return hp(n, 3500) * bright + bp(n, 1200, 3500) * 0.4
def meteor(f, seed):
    d = 1.0; x = np.zeros(int(d * SR))
    add(x, click(0.04, 1.0, seed) * 1.0, 0)
    t = T(0.35); air = hp(R.standard_normal(len(t)), 7000) * np.exp(-t / 0.018) * 0.2   # airy shimmer right after the click
    add(x, air, 0.002)
    add(x, glass_ping(f, 0.9, 0.55), 0.012)
    return fade(norm(x, 0.85), 0.0005, 0.1)
PENT = [987.8, 1046.5, 1174.7, 1318.5, 1760.0, 2093.0]   # B5 C6 D6 E6 A6 C7 - the pitches measured in the reference
S = {}
for i, f in enumerate(PENT): S['meteor_%d' % (i + 1)] = meteor(f, 40 + i)
def count_tick(seed=3):
    x = np.zeros(int(0.12 * SR)); add(x, click(0.03, 0.9, seed), 0)
    add(x, glass_ping(3150, 0.08, 0.12), 0.001)
    return fade(norm(x, 0.7), 0.0005, 0.02)
S['count_tick'] = count_tick()
def count_roll(d=2.0):
    x = np.zeros(int(d * SR)); t = 0.0; k = 0
    while t < d - 0.05:
        f = 2400 + 1400 * (t / d); y = np.zeros(int(0.05 * SR)); add(y, click(0.02, 0.6, 100 + k), 0); add(y, glass_ping(f, 0.05, 0.15), 0)
        add(x, y * (0.5 + 0.5 * t / d), t); t += 0.11 * (1 - 0.75 * t / d) * (0.8 + 0.4 * R.random()); k += 1
    return fade(norm(x, 0.75), 0.002, 0.15)
S['count_roll'] = count_roll()
def data_burst(d=3.0):
    t = T(d); n = R.standard_normal(len(t))
    grains = np.zeros_like(t)
    for _ in range(900):
        a = R.integers(0, len(t) - 600); L = R.integers(40, 500); grains[a:a + L] += R.standard_normal(L) * np.exp(-np.arange(L) / (L * 0.3)) * R.uniform(0.2, 1)
    x = hp(n, 1500) * 0.5 + bp(grains, 900, 6000) * 1.2
    env = np.clip(t / 1.6, 0, 1) ** 2 * np.exp(-np.clip(t - 2.0, 0, None) / 0.35)
    return fade(norm(x * env, 0.8), 0.01, 0.2)
S['data_burst'] = data_burst()
def sparkle_bed(d=6.0):
    x = np.zeros(int(d * SR)); n = int(22 * d)
    for _ in range(n):
        f = R.uniform(2000, 4000); y = np.sin(2 * np.pi * f * T(0.05)) * np.exp(-T(0.05) / 0.012) * R.uniform(0.15, 1)
        add(x, y, R.uniform(0, d - 0.06))
    return fade(norm(x, 0.5), 0.3, 0.3)
S['sparkle_bed'] = sparkle_bed()
def sub_pad(d=12.0):
    t = T(d)
    x = np.sin(2 * np.pi * 41.2 * t) + 0.7 * np.sin(2 * np.pi * 41.2 * 1.5 * t + 1) + 0.5 * np.sin(2 * np.pi * 55.0 * t + 2)
    x *= 0.85 + 0.15 * np.sin(2 * np.pi * t / d * 2)                 # whole cycles over the loop, so it loops seamlessly
    x += lp(R.standard_normal(len(t)), 90, 3) * 0.6
    return fade(norm(x, 0.8), 0.6, 0.6)
S['sub_pad'] = sub_pad()
def sub_drop(d=3.0):
    t = T(d); f = 70 * np.exp(-t / 0.6) + 32
    x = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.9) + lp(R.standard_normal(len(t)), 150, 3) * np.exp(-t / 0.25) * 0.6
    x += hp(R.standard_normal(len(t)), 2000) * np.exp(-t / 0.01) * 0.3
    return fade(norm(x, 0.9), 0.001, 0.5)
S['sub_drop'] = sub_drop()
for i, f in enumerate([1318.5, 1760.0, 2093.0]): S['ui_ping_%d' % (i + 1)] = fade(norm(glass_ping(f, 0.5, 1.0), 0.5), 0.001, 0.08)
def sweep(d=3.0, up=True):
    t = T(d); u = t / d if up else 1 - t / d
    f = 200 * (30 ** u); ph = 2 * np.pi * np.cumsum(f) / SR
    tone = np.sin(ph) * 0.25 + np.sin(ph * 1.5) * 0.12
    nz = R.standard_normal(len(t)); out = np.zeros_like(t); step = int(0.05 * SR)
    for i in range(0, len(t), step):
        fc = min(16000, 300 * (40 ** u[i])); out[i:i + step] = bp(nz[max(0, i - 2000):i + step], fc * 0.6, min(19000, fc * 1.6))[-(min(step, len(t) - i)):]
    env = (t / d) ** 2 if up else (1 - t / d) ** 1.5
    return fade(norm((tone + out * 0.8) * env, 0.8), 0.01, 0.05 if up else 0.3)
S['riser'] = sweep(3.0, True); S['downer'] = sweep(2.5, False)

# ---- impacts, learned from the 来龙去脉《宵禁》 drum and caning (see NOTES.md): click + pitch-dropped body + huge sub bloom + grainy slap ----
def impact(body_f0=180, body_f1=48, sub_f=41, sub_len=0.42, crack=1.0, grain=1.0, seed=1, d=1.4):
    rg = np.random.default_rng(seed); t = T(d); x = np.zeros_like(t)
    f = body_f1 + (body_f0 - body_f1) * np.exp(-t / 0.045); body = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.16)
    sub = np.sin(2 * np.pi * (sub_f + 25 * np.exp(-t / 0.05)) * t) * np.minimum(1, t / 0.008) * np.exp(-t / sub_len)
    clk = hp(rg.standard_normal(len(t)), 2500) * np.exp(-t / 0.004) * crack
    gl = 380 + 2700 * np.exp(-t / 0.028); glide = np.sin(2 * np.pi * np.cumsum(gl) / SR) * np.exp(-t / 0.045) * 0.22
    n = np.zeros_like(t)
    for _ in range(int(160 * grain)):
        a = rg.integers(0, int(0.16 * SR)); L = rg.integers(30, 260); n[a:a + L] += rg.standard_normal(L) * np.exp(-np.arange(L) / (L * 0.3))
    gr = bp(n, 1000, 8000) * np.exp(-t / 0.07) * 0.5 * grain
    x = sub * 1.25 + body * 0.75 + clk * 0.9 + glide + gr
    return fade(norm(x, 0.95), 0.0005, 0.25)
S['hit_drum'] = impact(160, 55, 41, 0.45, 0.6, 0.4, 3)                  # a big temple drum
S['hit_drum2'] = impact(150, 52, 39, 0.4, 0.5, 0.35, 4)
def swing(d=0.28, seed=6):
    rg = np.random.default_rng(seed); t = T(d); u = t / d
    n = rg.standard_normal(len(t)); out = np.zeros_like(t); step = int(0.01 * SR)
    for i in range(0, len(t), step):
        fc = 600 + 5000 * u[i] ** 2; seg = bp(n[max(0, i - 1500):i + step], fc * 0.5, min(18000, fc * 1.8)); out[i:i + step] = seg[-min(step, len(t) - i):]
    return out * np.sin(np.pi * u) ** 1.5
def cane(seed=7):                                                         # a stick swung and landing: whoosh, then a slap with a sub thump
    d = 1.6; x = np.zeros(int(d * SR)); add(x, swing(0.26, seed) * 0.5, 0)
    hit = impact(260, 70, 46, 0.32, 1.4, 1.6, seed + 10)
    add(x, hit, 0.24); return fade(norm(x, 0.95), 0.002, 0.2)
S['hit_cane'] = cane(7); S['hit_cane2'] = cane(8)
S['whoosh_swing'] = fade(norm(swing(0.35, 9), 0.8), 0.005, 0.05)
def slam(seed=11):                                                        # a big word stamped onto the screen
    x = impact(220, 60, 44, 0.35, 1.0, 0.8, seed); t = np.arange(len(x)) / SR
    x = x + hp(np.random.default_rng(seed).standard_normal(len(x)), 300) * np.exp(-t / 0.03) * 0.25
    return fade(norm(x, 0.95), 0.0005, 0.25)
S['slam'] = slam()

lib = {}
for k, x in S.items():
    w = OUT + k + '.wav'; m = OUT + k + '.mp3'
    sf.write(w, x.astype(np.float32), SR); subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', w, '-ac', '1', '-b:a', '96k', m], check=True); os.remove(w)
    lib[k] = base64.b64encode(open(m, 'rb').read()).decode()
json.dump(lib, open(HERE + 'sfx_ref_lib.json', 'w'))
print(len(lib), 'sounds', sum(len(v) for v in lib.values()) // 1024, 'KB')
# a 20 s audition: sub pad + sparkle dust + one meteor per second over a running counter, then a roll into a data burst and a drop
D = 31.0; mix = np.zeros((int(D * SR), 2))
def put(name, at, g=1.0, pan=0.0):
    x = S[name]; L = np.sqrt((1 - pan) / 2); Rr = np.sqrt((1 + pan) / 2)
    i = int(at * SR); e = min(len(mix), i + len(x)); mix[i:e, 0] += x[:e - i] * g * L; mix[i:e, 1] += x[:e - i] * g * Rr
for t in np.arange(0, 31, 11.4): put('sub_pad', t, 0.55)
for t in np.arange(0.5, 12, 5.4): put('sparkle_bed', t, 0.18, 0.2)
order = [4, 4, 4, 1, 6, 5, 4, 5, 3, 2, 5, 1]
for k in range(12): put('meteor_%d' % order[k], 1.0 + k, 0.5, 0.25)
put('count_roll', 13.0, 0.5, 0.1); put('riser', 12.6, 0.35); put('data_burst', 13.4, 0.45); put('sub_drop', 16.4, 0.8); put('ui_ping_2', 16.5, 0.35, 0.3)
for k, t in enumerate([20.5, 21.6, 22.4, 22.9, 23.3]): put('hit_drum' if k % 2 == 0 else 'hit_drum2', t, 0.9)
for k, t in enumerate([24.6, 25.6, 26.3, 26.8, 27.2, 27.55, 27.85]): put('hit_cane' if k % 2 == 0 else 'hit_cane2', t, 0.85, 0.15)
put('slam', 29.0, 0.95)
sf.write(HERE + 'audition.wav', norm(mix, 0.85).astype(np.float32), SR)
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', HERE + 'audition.wav', '-b:a', '192k', HERE + 'audition.mp3'], check=True); os.remove(HERE + 'audition.wav')
print('audition.mp3 written')
