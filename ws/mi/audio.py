# Michelson soundtrack: the music bed (mi_bed.wav, built by make_bed_gl.py) + the effects layer from tl.json (sfx).
# Music steps back under the effects (side-chain) and harder under every big hit; mastered to about -15 LUFS, true peak limited.
import json, base64, subprocess, numpy as np, soundfile as sf
from scipy.signal import butter, sosfilt
SR = 44100
TL = json.load(open('tl.json')); END = TL['end']; N = int(round(END * SR))
def load(p):
    x, sr = sf.read(p, dtype='float32'); assert sr == SR, (p, sr)
    if x.ndim == 1: x = np.stack([x, x], 1)
    return np.vstack([x, np.zeros((max(0, N - len(x)), 2), np.float32)])[:N]
bed = load('mi_bed.wav')
lib = json.load(open('../kit/video-kit/sfx_ref/sfx_ref_lib.json')); cache = {}
def snd(name):
    if name not in cache:
        raw = base64.b64decode(lib[name].split(',')[-1])
        pcm = subprocess.run(['ffmpeg', '-v', 'error', '-i', '-', '-f', 'f32le', '-ac', '2', '-ar', str(SR), '-'], input=raw, capture_output=True).stdout
        cache[name] = np.frombuffer(pcm, np.float32).reshape(-1, 2)
    return cache[name]
fx = np.zeros((N, 2), np.float32); duck = np.zeros(N, np.float32)
HEAVY = {'slam': 1.0, 'hit_drum': 0.8, 'hit_drum2': 0.6, 'sub_drop': 0.7, 'hit_cane': 0.4, 'hit_cane2': 0.4}
for name, t, g, p in TL['sfx']:
    x = snd(name); a = int(max(0, t) * SR); n = min(len(x), N - a)
    if n <= 0: continue
    L, R = np.cos((p + 1) * np.pi / 4) * np.sqrt(2), np.sin((p + 1) * np.pi / 4) * np.sqrt(2)
    fx[a:a + n, 0] += x[:n, 0] * g * L; fx[a:a + n, 1] += x[:n, 1] * g * R
    if name in HEAVY:
        k = np.arange(int(0.5 * SR)); env = HEAVY[name] * g * np.exp(-k / (0.16 * SR)); m = min(len(env), N - a)
        duck[a:a + m] = np.maximum(duck[a:a + m], env[:m])
fx *= 0.9
mus = sosfilt(butter(2, 11000, 'low', fs=SR, output='sos'), bed, axis=0).astype(np.float32)
t = np.arange(N) / SR; mus *= (np.minimum(1, t / 0.6) * np.minimum(1, (END - t) / 3.0))[:, None] * 0.5
lvl = np.abs(fx).max(axis=1); blk = 441; nb = N // blk + 1
pk = np.array([lvl[i * blk:(i + 1) * blk].max() if i * blk < N else 0 for i in range(nb)])
env = np.zeros(nb); ar = np.exp(-blk / SR / 0.35); aa = np.exp(-blk / SR / 0.01)
for i in range(nb):
    p = pk[i]; pv = env[i - 1] if i else 0
    env[i] = aa * pv + (1 - aa) * p if p > pv else ar * pv + (1 - ar) * p
dd = -4.5 * np.clip((env - 0.05) / 0.25, 0, 1)
gain = np.interp(np.arange(N), np.arange(nb) * blk, 10 ** (dd / 20)).astype(np.float32) * (1 - 0.5 * np.clip(duck, 0, 1))
mix = fx + mus * gain[:, None]
sf.write('mix_raw.wav', mix, SR, subtype='FLOAT')
def lufs(f):
    e = subprocess.run(['ffmpeg', '-hide_banner', '-i', f, '-af', 'ebur128=peak=true', '-f', 'null', '-'], capture_output=True, text=True).stderr
    return float(e.split('I:')[-1].split('LUFS')[0]), e.split('Peak:')[-1].split('dBFS')[0].strip()
li, _ = lufs('mix_raw.wav'); gain_db = -15.0 - li
for it in range(3):
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', 'mix_raw.wav', '-af', 'volume=%.2fdB,alimiter=limit=0.89:attack=2:release=80:level=disabled' % gain_db, '-t', str(END), '-c:a', 'pcm_s16le', 'audio.wav'], check=True)
    lo, pk_ = lufs('audio.wav'); print('pass', it, 'gain %.2f dB ->' % gain_db, lo, 'LUFS, true peak', pk_)
    if abs(lo + 15) < 0.3: break
    gain_db += -15.0 - lo
# balance report: bed alone vs effects alone (RMS dB) so the music/effects ratio can be sanity-checked
rms = lambda x: 20 * np.log10(np.sqrt(np.mean(x ** 2)) + 1e-9)
print('music rms %.1f dB, effects rms %.1f dB (pre-master), effects peak %.2f' % (rms(mus), rms(fx), np.abs(fx).max()))
