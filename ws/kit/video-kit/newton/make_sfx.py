# One-shot sound effects for the Faraday video, synthesized from physics-ish models (modal resonators, shaped noise, grains).
# Writes sfx/<name>.wav (44.1 kHz mono) and sfx_lib.json {name: base64 mp3}, embedded in the page.
import numpy as np, soundfile as sf, os, json, base64, subprocess
from scipy.signal import butter, sosfilt, lfilter
SR = 44100
HERE = os.path.dirname(os.path.abspath(__file__)) + '/'
OUT = HERE + 'sfx/'; os.makedirs(OUT, exist_ok=True)
R = np.random.default_rng(7)

def T(d): return np.arange(int(d * SR)) / SR
def z(d): return np.zeros(int(d * SR))
def noise(d, rng=None): return (rng or R).standard_normal(int(d * SR))
def bp(x, lo, hi, o=2): return sosfilt(butter(o, [lo, hi], 'band', fs=SR, output='sos'), x)
def lp(x, f, o=2): return sosfilt(butter(o, f, 'low', fs=SR, output='sos'), x)
def hp(x, f, o=2): return sosfilt(butter(o, f, 'high', fs=SR, output='sos'), x)
def env_ad(n, a, d, curve=1.0):
    t = np.arange(n) / SR
    e = np.where(t < a, t / max(a, 1e-6), np.exp(-(t - a) / max(d, 1e-6) * curve))
    return e
def add(dst, src, at):
    i = int(at * SR); e = min(len(dst), i + len(src))
    if e > i: dst[i:e] += src[:e - i]
    return dst
def fade(x, fi=0.002, fo=0.02):
    n1, n2 = int(fi * SR), int(fo * SR)
    if n1: x[:n1] *= np.linspace(0, 1, n1)
    if n2: x[-n2:] *= np.linspace(1, 0, n2)
    return x
def modes(d, parts, rng=None):
    """parts: list of (freq, amp, decay_s); random phase, slight detune beating for metal"""
    t = T(d); x = np.zeros_like(t); rg = rng or R
    for f, a, dc in parts:
        ph = rg.uniform(0, 2 * np.pi)
        x += a * np.sin(2 * np.pi * f * t + ph) * np.exp(-t / dc)
    return x
def norm(x, pk=0.9):
    m = np.abs(x).max()
    return x / m * pk if m > 0 else x
def room(x, size=0.05, mix=0.15, rng=None):
    """tiny early reflections so a dry sample sits in a space (the engine adds the big reverb)"""
    rg = rng or R; y = x.copy()
    for k in range(6):
        dl = int(SR * size * rg.uniform(0.15, 1.0)); g = mix * rg.uniform(0.4, 1.0) * (0.75 ** k)
        y[dl:] += g * lp(x, 3500)[:len(x) - dl]
    return y

S = {}

# ---------------- metal ----------------
def anvil(pitch=1.0, vel=1.0, seed=1, light=False):
    rg = np.random.default_rng(seed)
    base = [(1180, 1.0, 1.1), (1612, 0.35, 0.6), (2655, 0.7, 0.9), (3415, 0.5, 0.55), (4982, 0.32, 0.4), (6230, 0.22, 0.3), (7940, 0.14, 0.22), (2662, 0.4, 0.95)]
    parts = [(f * pitch * rg.uniform(0.995, 1.005), a * rg.uniform(0.8, 1.2), dc * (0.45 if light else 1.0)) for f, a, dc in base]
    d = 1.6 if not light else 0.7
    x = modes(d, parts, rg)
    # impact: a sharp, bright click plus the dull body of the hammer and the block
    n = int(0.006 * SR); clk = rg.standard_normal(n) * np.exp(-np.arange(n) / (0.0012 * SR))
    x = add(x * 0.55, hp(clk, 1500) * (2.2 if not light else 1.4), 0)
    body = modes(0.25, [(180 * pitch, 1.0, 0.05), (310 * pitch, 0.6, 0.035), (520, 0.3, 0.02)], rg)
    x = add(x, body * (0.9 if not light else 0.35), 0)
    if not light:   # the hammer bounces once
        x2 = modes(0.6, [(f * 1.002, a * 0.5, dc * 0.5) for f, a, dc in parts], rg)
        x = add(x, x2 * 0.18, 0.055)
    return fade(norm(room(x, 0.04, 0.12, rg)) * vel, 0.0005, 0.08)
S['anvil1'] = anvil(1.0, 1.0, 1); S['anvil2'] = anvil(0.985, 1.0, 2); S['anvil3'] = anvil(1.02, 1.0, 3)
S['anvil_tap'] = anvil(1.06, 0.6, 4, light=True)
def sparks_burst(d=0.7, seed=5):
    rg = np.random.default_rng(seed); x = z(d)
    for i in range(70):
        at = rg.exponential(0.12); amp = rg.uniform(0.1, 1.0) * np.exp(-at / 0.25)
        n = int(rg.uniform(0.0004, 0.002) * SR); g = rg.standard_normal(n) * np.exp(-np.arange(n) / (n / 4))
        add(x, hp(g, 4500) * amp, at)
    return fade(norm(x, 0.7), 0.0005, 0.05)
S['sparks'] = sparks_burst()
def clink(f=3200, seed=6, d=0.35):
    rg = np.random.default_rng(seed)
    x = modes(d, [(f, 1, 0.09), (f * 1.58, 0.6, 0.06), (f * 2.37, 0.35, 0.04), (f * 3.1, 0.2, 0.03)], rg)
    n = int(0.003 * SR); x[:n] += hp(rg.standard_normal(n), 3000) * np.linspace(1, 0, n) * 0.8
    return fade(norm(x, 0.8), 0.0005, 0.03)
S['clink_cu'] = clink(2650, 6); S['clink_zn'] = clink(3350, 7); S['clink_hi'] = clink(4400, 8, 0.5)
def glass(f=2200, seed=9):
    rg = np.random.default_rng(seed)
    x = modes(1.2, [(f, 1, 0.5), (f * 2.32, 0.5, 0.3), (f * 4.25, 0.25, 0.18), (f * 6.63, 0.12, 0.1)], rg)
    n = int(0.002 * SR); x[:n] += rg.standard_normal(n) * 0.6
    return fade(norm(x, 0.7), 0.0005, 0.1)
S['glass'] = glass()
def switch_click(seed=10):
    rg = np.random.default_rng(seed); x = z(0.25)
    for at, a in [(0, 1.0), (0.009, 0.6), (0.021, 0.25)]:
        c = modes(0.08, [(2900, 1, 0.012), (4700, 0.6, 0.008), (1300, 0.5, 0.015)], rg)
        n = int(0.002 * SR); c[:n] += rg.standard_normal(n) * 1.5
        add(x, c * a, at)
    add(x, modes(0.12, [(210, 1, 0.03)], rg) * 0.4, 0)
    return fade(norm(room(x, 0.03, 0.15, rg), 0.85), 0.0003, 0.03)
S['switch'] = switch_click()
def metal_clunk(seed=11, f=420):   # magnet set down / padlock
    rg = np.random.default_rng(seed)
    x = modes(0.6, [(f, 1, 0.12), (f * 2.7, 0.5, 0.07), (f * 5.1, 0.3, 0.04), (f * 0.5, 0.6, 0.08)], rg)
    n = int(0.004 * SR); x[:n] += hp(rg.standard_normal(n), 800) * 1.4
    return fade(norm(room(x, 0.04, 0.2, rg), 0.85), 0.0005, 0.05)
S['clunk'] = metal_clunk()
S['lock'] = (lambda: fade(norm(add(add(metal_clunk(12, 980) * 0.6, switch_click(13) * 0.8, 0.0), switch_click(14) * 0.6, 0.16), 0.85), 0.0003, 0.05))()
def needle(seed=15):   # galvanometer needle kicked: tick plus a damped springy twang
    rg = np.random.default_rng(seed); t = T(0.9)
    tw = np.sin(2 * np.pi * (620 * t + 18 * np.sin(2 * np.pi * 7 * t) / (2 * np.pi * 7))) * np.exp(-t / 0.18) * 0.35
    x = add(tw, switch_click(seed) * 0.7, 0)
    return fade(norm(x, 0.8), 0.0005, 0.05)
S['needle'] = needle()

# ---------------- electric ----------------
def zap(d=0.9, seed=20, dense=1.0):
    rg = np.random.default_rng(seed); x = z(d); t = T(d)
    # a buzzing arc (mains-like harmonics, rough) under random cracks
    buzz = np.sign(np.sin(2 * np.pi * 100 * t)) * 0.5 + 0.5 * np.sin(2 * np.pi * 300 * t)
    buzz = bp(buzz * (0.6 + 0.4 * rg.standard_normal(len(t)).clip(-1, 1)), 200, 6000)
    e = np.minimum(1, t / 0.01) * np.exp(-t / (d * 0.45))
    x += buzz * e * 0.25
    k = int(60 * d * dense)
    for i in range(k):
        at = rg.uniform(0, d * 0.85); amp = rg.uniform(0.2, 1) * np.exp(-at / (d * 0.5))
        n = int(rg.uniform(0.0005, 0.004) * SR); g = rg.standard_normal(n) * np.exp(-np.arange(n) / (n / 5))
        add(x, hp(g, 1200) * amp * 1.6, at)
    add(x, hp(rg.standard_normal(int(0.01 * SR)), 300) * 1.5 * np.linspace(1, 0, int(0.01 * SR)), 0)
    return fade(norm(x, 0.85), 0.0005, 0.08)
S['zap'] = zap(); S['zap_big'] = zap(1.4, 21, 1.8); S['zap_small'] = zap(0.35, 22, 0.8)
def hum(d=3.0, f=100, seed=23):
    rg = np.random.default_rng(seed); t = T(d)
    x = sum(a * np.sin(2 * np.pi * f * k * t + rg.uniform(0, 6)) for k, a in [(1, 1), (2, 0.5), (3, 0.35), (4, 0.15), (6, 0.08)])
    x *= 1 + 0.1 * np.sin(2 * np.pi * 0.7 * t)
    x += 0.04 * hp(rg.standard_normal(len(t)), 5000)
    e = np.minimum(1, t / 0.35) * np.minimum(1, (d - t) / 0.8)
    return norm(x * e, 0.6)
S['hum'] = hum()
def power_on(seed=24):   # a big relay thunk and the hum swelling up
    rg = np.random.default_rng(seed); t = T(2.2)
    x = metal_clunk(seed, 160) * 0.9
    x = np.concatenate([x, z(2.2 - len(x) / SR)])
    hm = sum(a * np.sin(2 * np.pi * 50 * k * t) for k, a in [(1, 1), (2, 0.6), (3, 0.4), (5, 0.15)])
    hm *= np.minimum(1, t / 0.5) * np.exp(-np.maximum(0, t - 0.8) / 0.6) * 0.35
    return fade(norm(x + hm, 0.85), 0.0005, 0.2)
S['power_on'] = power_on()
def whir(d=3.0, f0=6, f1=14, seed=25):   # a disc spinning up: rotation-rate rumble + brush hiss
    rg = np.random.default_rng(seed); t = T(d)
    fr = f0 + (f1 - f0) * np.minimum(1, t / (d * 0.6)); ph = 2 * np.pi * np.cumsum(fr) / SR
    am = 0.55 + 0.45 * np.sin(ph) ** 2
    n = bp(rg.standard_normal(len(t)), 700, 4000) * am * 0.5
    tone = sum(a * np.sin(ph * k * 8) for k, a in [(1, 1), (2, 0.4), (3, 0.2)]) * 0.35
    e = np.minimum(1, t / 0.4) * np.minimum(1, (d - t) / 0.5)
    return norm((n + tone) * e, 0.6)
S['whir'] = whir()
S['turbine'] = (lambda: norm(lp(whir(3.5, 18, 22, 26), 900) + 0.6 * hum(3.5, 50, 27), 0.6))()

# ---------------- paper, books, wood ----------------
def page_flip(seed=30, d=0.35):
    rg = np.random.default_rng(seed); t = T(d)
    flutter = 1 + 0.6 * np.sin(2 * np.pi * rg.uniform(25, 40) * t + rg.uniform(0, 6))
    e = np.exp(-((t - d * 0.35) / (d * 0.22)) ** 2)
    x = bp(rg.standard_normal(len(t)), 900, 7000) * e * flutter
    x = add(x, lp(rg.standard_normal(int(0.03 * SR)), 900) * np.exp(-np.arange(int(0.03 * SR)) / (0.006 * SR)) * 1.2, d * 0.62)
    return fade(norm(x, 0.7), 0.002, 0.03)
S['page1'] = page_flip(30); S['page2'] = page_flip(31, 0.42); S['page3'] = page_flip(32, 0.3)
def paper_swish(d=0.5, seed=33):   # a sheet or letter sliding through the air
    rg = np.random.default_rng(seed); t = T(d)
    e = np.sin(np.pi * t / d) ** 2
    x = bp(rg.standard_normal(len(t)), 600, 5000) * e * (1 + 0.3 * np.sin(2 * np.pi * 14 * t))
    return fade(norm(x, 0.6), 0.002, 0.02)
S['swish'] = paper_swish(); S['swish_long'] = paper_swish(1.1, 34)
def book_thump(seed=35, f=110, slap=1.0):
    rg = np.random.default_rng(seed)
    x = modes(0.4, [(f, 1, 0.06), (f * 1.9, 0.5, 0.04), (f * 3.3, 0.25, 0.02)], rg)
    n = int(0.04 * SR); s = lp(rg.standard_normal(n), 2500) * np.exp(-np.arange(n) / (0.007 * SR))
    x = add(x, s * 0.9 * slap, 0)
    return fade(norm(room(x, 0.03, 0.2, rg), 0.9), 0.0005, 0.05)
S['book'] = book_thump(); S['book2'] = book_thump(36, 135, 0.7); S['book_close'] = book_thump(37, 90, 1.4)
def needle_punch(seed=38):   # an awl/needle through folded paper, thread drawn after it
    rg = np.random.default_rng(seed); x = z(0.12)
    n = int(0.01 * SR); add(x, bp(rg.standard_normal(n), 1500, 7000) * np.exp(-np.arange(n) / (0.002 * SR)) * 1.0, 0)
    n = int(0.03 * SR); add(x, bp(rg.standard_normal(n), 300, 1800) * np.exp(-np.arange(n) / (0.008 * SR)) * 0.5, 0.004)
    return fade(norm(x, 0.8), 0.0003, 0.02)
S['punch'] = needle_punch()
def thread_pull(d=0.45, seed=39):
    rg = np.random.default_rng(seed); t = T(d)
    e = np.sin(np.pi * np.minimum(1, t / d)) ** 1.5
    grains = (rg.random(len(t)) < 0.02) * rg.standard_normal(len(t))
    x = bp(rg.standard_normal(len(t)), 2000, 6500) * 0.5 + bp(grains, 1500, 5000) * 3
    x *= e * (1 + 0.4 * np.sin(2 * np.pi * 9 * t))
    return fade(norm(x, 0.55), 0.003, 0.03)
S['thread'] = thread_pull()
def wood_knock(f=240, seed=40):
    rg = np.random.default_rng(seed)
    x = modes(0.3, [(f, 1, 0.035), (f * 2.4, 0.6, 0.02), (f * 4.1, 0.3, 0.012), (f * 6.3, 0.15, 0.008)], rg)
    n = int(0.003 * SR); x[:n] += rg.standard_normal(n) * 0.8
    return fade(norm(room(x, 0.04, 0.25, rg), 0.9), 0.0003, 0.04)
S['knock'] = wood_knock(); S['knock_hi'] = wood_knock(380, 41)
def press(seed=42):   # a wooden screw press: creak while turning, then the platen bites
    rg = np.random.default_rng(seed); d = 0.9; x = z(d)
    # stick-slip creak: a train of tiny impulses at a wandering rate through a woody resonance
    tt = 0.0
    while tt < 0.55:
        tt += 1 / rg.uniform(55, 85); n = int(0.004 * SR)
        add(x, rg.standard_normal(n) * np.exp(-np.arange(n) / (0.001 * SR)) * 0.6, tt)
    x = bp(x, 400, 2200) * 1.6
    add(x, book_thump(43, 95, 1.6) * 1.0, 0.6)
    add(x, wood_knock(180, 44) * 0.5, 0.6)
    return fade(norm(x, 0.9), 0.003, 0.05)
S['press'] = press()
def glue_brush(d=0.8, seed=45):
    rg = np.random.default_rng(seed); t = T(d)
    strokes = sum(np.exp(-((t - c) / 0.09) ** 2) for c in (0.15, 0.4, 0.62))
    x = lp(rg.standard_normal(len(t)), 3000) * strokes
    return fade(norm(x, 0.45), 0.003, 0.03)
S['brush'] = glue_brush()
def pen_scratch(d=2.0, seed=46, rate=7, bright=1.0):   # a quill writing quickly
    rg = np.random.default_rng(seed); t = T(d); x = np.zeros_like(t); tt = 0.03
    while tt < d - 0.1:
        ln = rg.uniform(0.05, 0.16); n = int(ln * SR); k = np.arange(n) / SR
        e = np.sin(np.pi * k / ln) ** 0.7
        fr = rg.uniform(1800, 3500) * bright
        s = bp(rg.standard_normal(n), fr, min(fr * 2.6, 16000)) * e * (1 + 0.5 * np.sin(2 * np.pi * rg.uniform(30, 60) * k))
        add(x, s * rg.uniform(0.5, 1.0), tt); tt += ln + rg.uniform(0.02, 1 / rate)
    return fade(norm(x, 0.5), 0.005, 0.05)
S['pen'] = pen_scratch()
S['chalk'] = (lambda: norm(pen_scratch(1.3, 47, 5, 0.55) + 0.25 * bp(np.random.default_rng(48).standard_normal(int(1.3 * SR)), 900, 1300) * np.repeat(np.random.default_rng(49).random(13) > 0.5, int(0.1 * SR) + 1)[:int(1.3 * SR)], 0.55))()
def stamp(seed=50):
    x = add(book_thump(seed, 80, 1.3), wood_knock(150, seed + 1) * 0.6, 0.002)
    return norm(x, 0.9)
S['stamp'] = stamp()
def crinkle(d=0.9, seed=52):   # metal foil being wrapped
    rg = np.random.default_rng(seed); x = z(d)
    for i in range(int(220 * d)):
        at = rg.uniform(0, d - 0.01); n = int(rg.uniform(0.0004, 0.003) * SR)
        g = rg.standard_normal(n) * np.exp(-np.arange(n) / (n / 4))
        add(x, hp(g, 2500) * rg.uniform(0.1, 1) * np.sin(np.pi * at / d), at)
    return fade(norm(x, 0.55), 0.003, 0.05)
S['foil'] = crinkle()
def sprinkle(d=1.6, seed=53):   # iron filings pattering on paper
    rg = np.random.default_rng(seed); x = z(d)
    for i in range(int(500 * d)):
        at = rg.beta(2, 3) * (d - 0.02); n = int(rg.uniform(0.0003, 0.0012) * SR)
        g = rg.standard_normal(n) * np.exp(-np.arange(n) / (n / 3))
        add(x, bp(g, 2500, 11000) * rg.uniform(0.1, 1), at)
    return fade(norm(x, 0.5), 0.01, 0.1)
S['sprinkle'] = sprinkle()
def rattle(seed=54):   # the paper is tapped: filings jump and settle
    rg = np.random.default_rng(seed)
    x = wood_knock(330, seed) * 0.7
    x = np.concatenate([x, z(0.9 - len(x) / SR)])
    for i in range(160):
        at = 0.01 + rg.exponential(0.12); n = int(rg.uniform(0.0003, 0.001) * SR)
        if at > 0.85: continue
        add(x, bp(rg.standard_normal(n), 3000, 12000) * rg.uniform(0.05, 0.5) * np.exp(-at / 0.3), at)
    return fade(norm(x, 0.8), 0.0005, 0.05)
S['rattle'] = rattle()

# ---------------- fire, gas, liquid ----------------
def match(seed=55):
    rg = np.random.default_rng(seed); d = 1.0; t = T(d); x = z(d)
    n = int(0.16 * SR); k = np.arange(n) / SR
    add(x, bp(rg.standard_normal(n), 1500, 8000) * np.sin(np.pi * k / 0.16) * (1 + 0.8 * (rg.random(n) < 0.03)), 0)
    flare = lp(rg.standard_normal(len(t)), 1200) * np.exp(-np.maximum(0, t - 0.15) / 0.18) * (t > 0.13) * 1.6
    x += flare
    return fade(norm(x, 0.7), 0.003, 0.1)
S['match'] = match()
def whoomp(seed=56):   # a gas jet catching
    rg = np.random.default_rng(seed); t = T(1.0)
    e = np.minimum(1, t / 0.04) * np.exp(-t / 0.25)
    x = lp(rg.standard_normal(len(t)), 700) * e + 0.3 * bp(rg.standard_normal(len(t)), 2000, 6000) * np.exp(-t / 0.5) * np.minimum(1, t / 0.1)
    return fade(norm(x, 0.8), 0.002, 0.1)
S['whoomp'] = whoomp()
def hiss(d=2.0, seed=57):
    rg = np.random.default_rng(seed); t = T(d)
    x = bp(rg.standard_normal(len(t)), 3500, 11000) * np.minimum(1, t / 0.2) * np.minimum(1, (d - t) / 0.5)
    return norm(x, 0.35)
S['hiss'] = hiss()
def bubbles(d=1.8, seed=58, rate=14):
    rg = np.random.default_rng(seed); x = z(d); tt = 0
    while tt < d - 0.1:
        tt += rg.exponential(1 / rate); r = rg.uniform(1.5, 5) * 1e-3; f0 = 3.26 / r   # Minnaert frequency
        n = int(0.05 * SR); k = np.arange(n) / SR
        ph = 2 * np.pi * f0 * (k + 0.1 * k * k / 0.05 * 3)   # pitch rises as it reaches the surface
        add(x, np.sin(ph) * np.exp(-k / 0.012) * rg.uniform(0.3, 1), tt)
    return fade(norm(x, 0.5), 0.01, 0.1)
S['bubbles'] = bubbles(); S['pour'] = (lambda: norm(bubbles(1.4, 59, 40) + 0.4 * lp(np.random.default_rng(60).standard_normal(int(1.4 * SR)), 1500) * np.sin(np.pi * T(1.4) / 1.4), 0.55))()
def slither(d=1.4, seed=61):
    rg = np.random.default_rng(seed); t = T(d)
    e = np.sin(np.pi * t / d) * (0.7 + 0.3 * np.sin(2 * np.pi * 3 * t))
    x = bp(rg.standard_normal(len(t)), 4500, 10000) * e + 0.4 * lp(rg.standard_normal(len(t)), 500) * e
    return fade(norm(x, 0.45), 0.01, 0.05)
S['slither'] = slither()

# ---------------- big moments ----------------
def explosion(seed=62):
    rg = np.random.default_rng(seed); d = 2.8; t = T(d)
    sub = np.sin(2 * np.pi * np.cumsum(55 * np.exp(-t / 0.4) + 28) / SR) * np.exp(-t / 0.7)
    body = lp(rg.standard_normal(len(t)), 900) * np.minimum(1, t / 0.005) * np.exp(-t / 0.45)
    crack = hp(rg.standard_normal(len(t)), 1500) * np.exp(-t / 0.06)
    x = sub * 1.0 + body * 1.5 + crack * 0.8
    for i in range(60):   # shattering glass and debris
        at = 0.05 + rg.exponential(0.35)
        if at > d - 0.3: continue
        f = rg.uniform(2500, 7000)
        add(x, modes(0.3, [(f, 1, 0.05), (f * 1.7, 0.5, 0.03)], rg) * rg.uniform(0.05, 0.35) * np.exp(-at / 0.8), at)
    return fade(norm(x, 0.95), 0.0005, 0.3)
S['explosion'] = explosion()
def impact(seed=63):   # a cinematic hit for chapter cards and reveals
    rg = np.random.default_rng(seed); d = 3.0; t = T(d)
    sub = np.sin(2 * np.pi * np.cumsum(70 * np.exp(-t / 0.25) + 32) / SR) * np.exp(-t / 1.0)
    thud = lp(rg.standard_normal(len(t)), 400) * np.exp(-t / 0.12) * 1.5
    air = bp(rg.standard_normal(len(t)), 300, 3000) * np.exp(-t / 0.5) * 0.3
    return fade(norm(sub + thud + air, 0.95), 0.0005, 0.4)
S['impact'] = impact()
def toll(f=196, seed=64, d=6.0):   # a church bell
    rg = np.random.default_rng(seed)
    parts = [(f * 0.5, 0.6, 4.0), (f, 1.0, 2.8), (f * 1.19, 0.6, 2.0), (f * 1.5, 0.35, 1.6), (f * 2.0, 0.55, 1.4), (f * 2.51, 0.22, 0.9), (f * 3.0, 0.15, 0.7), (f * 4.07, 0.08, 0.5)]
    x = modes(d, [(a * rg.uniform(0.998, 1.002), b, c) for a, b, c in parts], rg)
    n = int(0.004 * SR); x[:n] += rg.standard_normal(n) * 0.5
    return fade(norm(x, 0.8), 0.0005, 0.5)
S['toll'] = toll()
def chime_glitter(d=1.6, seed=65):
    rg = np.random.default_rng(seed); x = z(d)
    for i in range(18):
        at = rg.uniform(0, d * 0.5); f = 2 ** rg.integers(0, 3) * rg.choice([1318.5, 1567.98, 1760, 2093, 2349.3])
        add(x, modes(1.0, [(f, 1, 0.4), (f * 2.0, 0.2, 0.2)], rg) * rg.uniform(0.2, 0.7), at)
    return fade(norm(x, 0.55), 0.002, 0.2)
S['glitter'] = chime_glitter()
def crack(seed=66):   # a rift opening
    rg = np.random.default_rng(seed); d = 1.6; t = T(d); x = z(d)
    add(x, hp(rg.standard_normal(int(0.01 * SR)), 800) * 1.5, 0)
    tt = 0.0
    for i in range(40):
        tt += rg.exponential(0.02)
        n = int(rg.uniform(0.001, 0.006) * SR); add(x, bp(rg.standard_normal(n), 500, 6000) * np.exp(-np.arange(n) / (n / 4)) * np.exp(-tt / 0.5), tt)
    x += lp(rg.standard_normal(len(t)), 200) * np.exp(-t / 0.5) * 0.8
    return fade(norm(x, 0.85), 0.0005, 0.2)
S['crack'] = crack()
def heartbeat_drop(seed=67):   # a low, dull "doubt" hit
    rg = np.random.default_rng(seed); t = T(1.2)
    x = np.sin(2 * np.pi * np.cumsum(90 * np.exp(-t / 0.3) + 45) / SR) * np.exp(-t / 0.35)
    return fade(norm(x, 0.8), 0.001, 0.1)
S['dull'] = heartbeat_drop()

# ---------------- people and rooms ----------------
def footstep(seed=70, f=140, scuff=1.0):
    rg = np.random.default_rng(seed)
    x = modes(0.2, [(f, 1, 0.025), (f * 2.3, 0.5, 0.015)], rg)
    n = int(0.06 * SR); k = np.arange(n) / SR
    add(x, bp(rg.standard_normal(n), 800, 5000) * np.exp(-k / 0.015) * 0.35 * scuff, 0.004)
    return fade(norm(room(x, 0.05, 0.3, rg), 0.8), 0.0005, 0.03)
S['step1'] = footstep(70); S['step2'] = footstep(71, 125); S['step3'] = footstep(72, 155, 0.6)
def door(seed=73):   # creak then a soft latch
    rg = np.random.default_rng(seed); d = 1.4; x = z(d); tt = 0.05; rate = 30
    while tt < 1.0:
        tt += 1 / rate; rate = min(260, rate * 1.035); n = int(0.003 * SR)
        add(x, rg.standard_normal(n) * np.exp(-np.arange(n) / (0.0008 * SR)) * np.sin(np.pi * tt / 1.0), tt)
    x = bp(x, 300, 3000) * 2
    return fade(norm(room(x, 0.06, 0.3, rg), 0.6), 0.003, 0.1)
S['creak'] = door()
def door_slam(seed=74):
    x = add(book_thump(seed, 70, 0.6) * 1.0, wood_knock(120, seed + 1) * 0.6, 0.003)
    return norm(room(x, 0.07, 0.35), 0.95)
S['slam'] = door_slam()
def murmur(d=3.5, seed=75, voices=18):   # a hall full of quiet talk
    rg = np.random.default_rng(seed); t = T(d); x = np.zeros_like(t)
    for v in range(voices):
        src = rg.standard_normal(len(t))
        f0 = rg.uniform(95, 230); tt = rg.uniform(0, 0.3)
        voice = np.zeros_like(t)
        while tt < d:
            syl = rg.uniform(0.08, 0.22); n = int(syl * SR); i = int(tt * SR)
            if i + n >= len(t): break
            F1, F2 = rg.uniform(300, 800), rg.uniform(900, 2400)
            k = np.arange(n) / SR
            glott = np.sign(np.sin(2 * np.pi * f0 * (1 + 0.05 * rg.standard_normal()) * k)) * 0.4 + src[i:i + n] * 0.3
            s = bp(glott, F1 * 0.8, F1 * 1.25) + 0.6 * bp(glott, F2 * 0.85, F2 * 1.15)
            voice[i:i + n] += s * np.sin(np.pi * k / syl) * rg.uniform(0.4, 1)
            tt += syl + (rg.uniform(0.3, 0.9) if rg.random() < 0.18 else rg.uniform(0.01, 0.06))
        x += voice * rg.uniform(0.3, 1)
    x = lp(x, 2800)
    e = np.minimum(1, t / 0.6) * np.minimum(1, (d - t) / 0.8)
    return norm(room(x * e, 0.09, 0.4), 0.45)
S['murmur'] = murmur()
def applause(d=3.0, seed=76, people=26):
    rg = np.random.default_rng(seed); x = z(d)
    for p in range(people):
        rate = rg.uniform(3.5, 5.5); tt = rg.uniform(0, 0.4); f = rg.uniform(900, 2200); g = rg.uniform(0.4, 1)
        while tt < d - 0.05:
            n = int(0.012 * SR); c = bp(rg.standard_normal(n), f * 0.6, f * 1.6) * np.exp(-np.arange(n) / (0.0025 * SR))
            env = min(1, tt / 0.3) * min(1, (d - tt) / 1.0)
            add(x, c * g * env, tt); tt += 1 / rate * rg.uniform(0.85, 1.15)
    return fade(norm(room(x, 0.08, 0.4), 0.6), 0.01, 0.2)
S['applause'] = applause()
def clock_tick(seed=77, f=1900):
    rg = np.random.default_rng(seed)
    x = modes(0.12, [(f, 1, 0.012), (f * 1.9, 0.5, 0.008), (f * 0.42, 0.4, 0.02)], rg)
    n = int(0.0015 * SR); x[:n] += rg.standard_normal(n) * 0.7
    return fade(norm(x, 0.6), 0.0003, 0.02)
S['tick'] = clock_tick(); S['tock'] = clock_tick(78, 1450)
def hooves(d=2.6, seed=79):   # carriage on a road: hooves + wheels
    rg = np.random.default_rng(seed); x = z(d); tt = 0.05
    pat = [0, 0.11, 0.33, 0.44]
    while tt < d - 0.3:
        for p in pat: add(x, wood_knock(rg.uniform(380, 520), int(rg.integers(1000))) * rg.uniform(0.3, 0.6), tt + p + rg.uniform(-0.01, 0.01))
        tt += 0.66
    wheels = lp(rg.standard_normal(int(d * SR)), 600) * 0.12 * (1 + 0.5 * np.sin(2 * np.pi * 2.2 * T(d)))
    x += wheels
    t = T(d); x *= np.minimum(1, t / 0.4) * np.minimum(1, (d - t) / 0.6)
    return norm(x, 0.5)
S['hooves'] = hooves()
def waves(d=3.0, seed=80):
    rg = np.random.default_rng(seed); t = T(d)
    e = 0.4 + 0.6 * np.sin(np.pi * t / 1.5) ** 2
    x = lp(rg.standard_normal(len(t)), 1200) * e + 0.3 * hp(rg.standard_normal(len(t)), 3000) * e ** 3
    return norm(x * np.minimum(1, t / 0.5) * np.minimum(1, (d - t) / 0.8), 0.45)
S['waves'] = waves()
def ripple(f=520, seed=81):   # a soft "bloop" for a field ring spreading out
    t = T(0.5)
    x = np.sin(2 * np.pi * np.cumsum(f * (1 + 0.5 * np.exp(-t / 0.05))) / SR) * np.exp(-t / 0.12)
    return fade(norm(x, 0.5), 0.002, 0.03)
S['ripple'] = ripple()
def sweep(d=1.4, seed=82):   # a light, rising shimmer (light beam / wave)
    rg = np.random.default_rng(seed); t = T(d)
    f = 400 * (8 ** (t / d)); ph = 2 * np.pi * np.cumsum(f) / SR
    x = (np.sin(ph) + 0.4 * np.sin(2 * ph) + 0.2 * np.sin(3.01 * ph)) * np.sin(np.pi * t / d) ** 2
    x += 0.3 * hp(rg.standard_normal(len(t)), 6000) * np.sin(np.pi * t / d) ** 2
    return norm(x, 0.4)
S['sweep'] = sweep()
def candle(d=2.5, seed=83):   # quiet flame flutter
    rg = np.random.default_rng(seed); t = T(d)
    x = lp(rg.standard_normal(len(t)), 300) * (0.6 + 0.4 * lp(rg.standard_normal(len(t)), 4) * 8).clip(0, 2)
    return norm(x * np.minimum(1, t / 0.3) * np.minimum(1, (d - t) / 0.6), 0.35)
S['flame'] = candle()
def sleigh(d=1.6, seed=84):   # tiny bells for the Christmas lectures
    rg = np.random.default_rng(seed); x = z(d)
    for i in range(30):
        at = rg.uniform(0, d - 0.4); f = rg.uniform(3800, 5200)
        add(x, modes(0.3, [(f, 1, 0.06), (f * 1.5, 0.4, 0.04)], rg) * rg.uniform(0.2, 0.8), at)
    return fade(norm(x, 0.5), 0.003, 0.1)
S['jingle'] = sleigh()
def pop_soft(f=900, seed=85):
    t = T(0.18)
    x = np.sin(2 * np.pi * np.cumsum(f * (1 + 0.8 * np.exp(-t / 0.01))) / SR) * np.exp(-t / 0.04)
    return fade(norm(x, 0.6), 0.001, 0.02)
S['pop'] = pop_soft()
def type_key(seed=86):
    rg = np.random.default_rng(seed)
    x = modes(0.1, [(2100, 1, 0.01), (3300, 0.5, 0.006), (600, 0.4, 0.015)], rg)
    n = int(0.002 * SR); x[:n] += rg.standard_normal(n)
    return fade(norm(x, 0.6), 0.0003, 0.02)
S['key'] = type_key()

# ---------------- extra (Maxwell) ----------------
def shutter(seed=90):
    rg = np.random.default_rng(seed); x = z(0.3)
    add(x, switch_click(seed) * 0.9, 0); add(x, switch_click(seed + 1) * 0.7, 0.07)
    n = int(0.06 * SR); add(x, bp(rg.standard_normal(n), 1500, 6000) * np.exp(-np.arange(n) / (0.015 * SR)) * 0.5, 0.01)
    return fade(norm(x, 0.85), 0.0003, 0.03)
S['shutter'] = shutter()
def beep(f=780, d=0.12):
    t = T(d); x = np.sin(2 * np.pi * f * t) * np.minimum(1, t / 0.005) * np.minimum(1, (d - t) / 0.01)
    return norm(x, 0.5)
S['beep'] = beep(); S['beep_long'] = beep(780, 0.34)
def bird(seed=91):
    rg = np.random.default_rng(seed); x = z(1.2); tt = 0.0
    for i in range(5):
        d = rg.uniform(0.06, 0.12); t = T(d); f0 = rg.uniform(3200, 4200); f1 = f0 * rg.uniform(1.2, 1.5)
        ph = 2 * np.pi * np.cumsum(f0 + (f1 - f0) * (t / d) ** 0.6) / SR
        add(x, np.sin(ph) * np.sin(np.pi * t / d) * rg.uniform(0.5, 1), tt); tt += d + rg.uniform(0.03, 0.15)
    return fade(norm(x, 0.45), 0.002, 0.05)
S['bird'] = bird(); S['bird2'] = bird(92)
S['bell_small'] = (lambda: fade(norm(modes(1.6, [(1760, 1, 0.6), (1760 * 2.76, 0.4, 0.3), (1760 * 5.4, 0.2, 0.15)]), 0.6), 0.0005, 0.2))()
S['wind'] = (lambda: norm(lp(np.random.default_rng(93).standard_normal(int(3 * SR)), 500) * (0.6 + 0.4 * np.sin(2 * np.pi * 0.4 * T(3))) * np.minimum(1, T(3) / 0.8) * np.minimum(1, (3 - T(3)) / 0.8), 0.4))()

# ---------------- write ----------------
lib = {}; tot = 0
for k, x in S.items():
    x = np.asarray(x, np.float64)
    x = x[:max(1, np.max(np.nonzero(np.abs(x) > 1e-4)[0]) + 200)] if np.any(np.abs(x) > 1e-4) else x
    sf.write(OUT + k + '.wav', x.astype(np.float32), SR, subtype='PCM_16')
    # mp3 adds a decoder delay; pad the head so the delay is a known 1105-sample gap that the engine skips
    subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', OUT + k + '.wav', '-ac', '1', '-b:a', '96k', OUT + k + '.mp3'], check=True)
    b = open(OUT + k + '.mp3', 'rb').read(); tot += len(b)
    lib[k] = base64.b64encode(b).decode()
json.dump(lib, open(HERE + 'sfx_lib.json', 'w'))
print(len(S), 'samples', round(tot / 1024), 'KB mp3,', round(sum(len(v) for v in lib.values()) / 1024), 'KB base64')
