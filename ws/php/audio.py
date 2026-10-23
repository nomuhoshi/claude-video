# CoreWeave soundtrack: vibe.mp3 re-cut by bars (tl.json mus) + sfx_ref library; music ducks under hits; master ≈ −15 LUFS.
import json, base64, subprocess, numpy as np, soundfile as sf, os
SR = 44100
TL = json.load(open('tl.json')); END = TL['end']; BAR = TL['bar']; EPH = TL['eph']; N = int(round((END + 0.5) * SR))
if not os.path.exists('vibe.wav'):
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', '../kit/video-kit/music/vibe.mp3', '-ar', str(SR), '-ac', '2', 'vibe.wav'], check=True)
src, sr = sf.read('vibe.wav', dtype='float32'); assert sr == SR
runs, cur = [], [TL['mus'][0]]
for b in TL['mus'][1:]:
    if b == cur[-1] + 1: cur.append(b)
    else: runs.append(cur); cur = [b]
runs.append(cur)
mus = np.zeros((N, 2), np.float32); X = int(0.15 * SR); j = 0
for r in runs:
    s0 = int((EPH + r[0] * BAR) * SR); n = int(round(len(r) * BAR * SR)); d0 = int(round(j * BAR * SR))
    a0 = max(0, s0 - X // 2); seg = src[a0: s0 + n + X // 2].copy()
    if len(seg) < n + X: seg = np.vstack([seg, np.zeros((n + X - len(seg), 2), np.float32)])
    ramp = np.sin(np.linspace(0, np.pi / 2, X))[:, None]; seg[:X] *= ramp; seg[-X:] *= ramp[::-1]
    a = d0 - (s0 - a0)
    if a < 0: seg = seg[-a:]; a = 0
    m = min(len(seg), N - a)
    if m > 0: mus[a:a + m] += seg[:m]
    j += len(r)
t = np.arange(N) / SR; mus *= (np.minimum(1, t / 0.5) * np.clip((END - t) / 4.0, 0, 1) ** 1.5)[:, None]

lib = json.load(open('../kit/video-kit/sfx_ref/sfx_ref_lib.json')); cache = {}
def snd(name):
    if name not in cache:
        raw = base64.b64decode(lib[name].split(',')[-1])
        pcm = subprocess.run(['ffmpeg', '-v', 'error', '-i', '-', '-f', 'f32le', '-ac', '2', '-ar', str(SR), '-'], input=raw, capture_output=True).stdout
        cache[name] = np.frombuffer(pcm, np.float32).reshape(-1, 2)
    return cache[name]
fx = np.zeros((N, 2), np.float32); duck = np.zeros(N, np.float32)
HEAVY = {'slam': 1.0, 'hit_drum': 0.8, 'hit_drum2': 0.6, 'sub_drop': 0.8, 'hit_cane': 0.4, 'hit_cane2': 0.4}
for name, tt, g, p in TL['sfx']:
    x = snd(name); a = int(max(0, tt) * SR); n = min(len(x), N - a)
    if n <= 0: continue
    L, R = np.cos((p + 1) * np.pi / 4) * np.sqrt(2), np.sin((p + 1) * np.pi / 4) * np.sqrt(2)
    fx[a:a + n, 0] += x[:n, 0] * g * L; fx[a:a + n, 1] += x[:n, 1] * g * R
    if name in HEAVY:
        k = np.arange(int(0.5 * SR)); env = HEAVY[name] * g * np.exp(-k / (0.16 * SR)); m = min(len(env), N - a)
        duck[a:a + m] = np.maximum(duck[a:a + m], env[:m])
mus *= (1 - 0.55 * np.clip(duck, 0, 1))[:, None]
mix = mus * 0.62 + fx * 0.8
sf.write('mix_raw.wav', mix, SR, subtype='FLOAT')
def lufs(f):
    e = subprocess.run(['ffmpeg', '-hide_banner', '-i', f, '-af', 'ebur128=peak=true', '-f', 'null', '-'], capture_output=True, text=True).stderr
    return float(e.split('I:')[-1].split('LUFS')[0]), e.split('Peak:')[-1].split('dBFS')[0].strip()
li, _ = lufs('mix_raw.wav'); gain = -15.0 - li
for it in range(3):
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', 'mix_raw.wav', '-af', 'volume=%.2fdB,alimiter=limit=0.84:attack=2:release=80:level=disabled' % gain, '-t', str(END), '-c:a', 'pcm_s16le', 'audio.wav'], check=True)
    lo, pk = lufs('audio.wav'); print('pass', it, 'gain %.2f dB ->' % gain, lo, 'LUFS, true peak', pk)
    if abs(lo + 15) < 0.3: break
    gain += -15.0 - lo
