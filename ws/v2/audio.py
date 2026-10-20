# Mixes the demo soundtrack: Entropy re-cut by bars + the sfx_ref library, then masters to about -15 LUFS.
import json, base64, subprocess, io, numpy as np, soundfile as sf
SR = 44100
TL = json.load(open('tl.json')); END = TL['end']; BAR = TL['bar']
SP = '/home/claude/claude-video/ws/mus2/'
src, sr = sf.read(SP + 'entropy.wav', dtype='float32')
if src.ndim == 1: src = np.stack([src, src], 1)
assert sr == SR
EPH = 1.175
N = int(round((END + 1.0) * SR))

# ---- music: runs of contiguous source bars, joined with 0.15 s equal-power crossfades ----
runs, cur = [], [TL['mus'][0]]
for b in TL['mus'][1:]:
    if b == cur[-1] + 1: cur.append(b)
    else: runs.append(cur); cur = [b]
runs.append(cur)
mus = np.zeros((N, 2), np.float32); X = int(0.15 * SR); j = 0
for r in runs:
    s0 = int((EPH + r[0] * BAR) * SR); n = int(len(r) * BAR * SR); d0 = int(j * BAR * SR)
    seg = src[s0 - X // 2: s0 + n + X // 2].copy()
    ramp = np.sin(np.linspace(0, np.pi / 2, X))[:, None]
    seg[:X] *= ramp; seg[-X:] *= ramp[::-1]
    a = d0 - X // 2
    if a < 0: seg = seg[-a:]; a = 0
    mus[a:a + len(seg)] += seg[:N - a]
    j += len(r)
# the last two bars fade away
f0, f1 = int((END - 3.2) * SR), int(END * SR)
mus[f0:f1] *= np.linspace(1, 0, f1 - f0)[:, None] ** 1.5; mus[f1:] = 0

# ---- sfx ----
lib = json.load(open('/home/claude/claude-video/ws/kit/video-kit/sfx_ref/sfx_ref_lib.json'))
cache = {}
def snd(name):
    if name not in cache:
        raw = base64.b64decode(lib[name].split(',')[-1])
        pcm = subprocess.run(['ffmpeg', '-v', 'error', '-i', '-', '-f', 'f32le', '-ac', '2', '-ar', str(SR), '-'], input=raw, capture_output=True).stdout
        cache[name] = np.frombuffer(pcm, np.float32).reshape(-1, 2)
    return cache[name]
fx = np.zeros((N, 2), np.float32); duck = np.zeros(N, np.float32)
HEAVY = {'slam': 1.0, 'hit_drum': 0.8, 'hit_drum2': 0.6, 'sub_drop': 0.8, 'hit_cane': 0.4, 'hit_cane2': 0.4}
for name, t, g, p in TL['sfx']:
    x = snd(name); a = int(max(0, t) * SR); n = min(len(x), N - a)
    if n <= 0: continue
    L, R = np.cos((p + 1) * np.pi / 4) * np.sqrt(2), np.sin((p + 1) * np.pi / 4) * np.sqrt(2)
    fx[a:a + n, 0] += x[:n, 0] * g * L; fx[a:a + n, 1] += x[:n, 1] * g * R
    if name in HEAVY:                                   # the music steps back under every big hit
        k = np.arange(int(0.5 * SR)); env = HEAVY[name] * g * np.exp(-k / (0.16 * SR))
        m = min(len(env), N - a); duck[a:a + m] = np.maximum(duck[a:a + m], env[:m])
mus *= (1 - 0.55 * np.clip(duck, 0, 1))[:, None]

mix = mus * 0.62 + fx * 0.8
sf.write('mix_raw.wav', mix, SR, subtype='FLOAT')
# ---- master: static gain to about -15 LUFS, then a fast peak limiter (no dynamic loudnorm pumping) ----
def lufs(f):
    e = subprocess.run(['ffmpeg', '-hide_banner', '-i', f, '-af', 'ebur128=peak=true', '-f', 'null', '-'], capture_output=True, text=True).stderr
    return float(e.split('I:')[-1].split('LUFS')[0]), e.split('Peak:')[-1].split('dBFS')[0].strip()
li, _ = lufs('mix_raw.wav'); gain = -15.0 - li
for it in range(3):
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', 'mix_raw.wav', '-af', 'volume=%.2fdB,alimiter=limit=0.89:attack=2:release=80:level=disabled' % gain, '-t', str(END), '-c:a', 'pcm_s16le', 'audio.wav'], check=True)
    lo, pk = lufs('audio.wav'); print('pass', it, 'gain %.2f dB ->' % gain, lo, 'LUFS, true peak', pk)
    if abs(lo + 15) < 0.3: break
    gain += -15.0 - lo
