# Mix the pre-built music bed under the rendered sound-effects track, ducking the music a little whenever an effect hits,
# so hammer blows, sparks and switches cut through without the music ever dropping out.
# usage: python3 mix_fd.py bed16.wav sfx.wav out.wav [music_gain] [max_duck_dB]
import sys, numpy as np, soundfile as sf
from scipy.signal import butter, sosfilt
SR = 44100
bed, _ = sf.read(sys.argv[1], dtype='float32'); fx, _ = sf.read(sys.argv[2], dtype='float32')
G = float(sys.argv[4]) if len(sys.argv) > 4 else 0.62; DUCK = float(sys.argv[5]) if len(sys.argv) > 5 else 4.5
FXG = float(sys.argv[6]) if len(sys.argv) > 6 else 1.0; fx = fx * FXG
N = len(fx); bed = bed[:N] if len(bed) >= N else np.vstack([bed, np.zeros((N - len(bed), 2), np.float32)])
mus = sosfilt(butter(2, 11000, 'low', fs=SR, output='sos'), bed, axis=0).astype(np.float32)
t = np.arange(N) / SR; mus *= (np.minimum(1, t / 0.6) * np.minimum(1, (N / SR - t) / 3.0))[:, None] * G
# side-chain: an envelope of the effects (fast attack, slow release) drives a gentle gain dip on the music
lvl = np.abs(fx).max(axis=1)
blk = 441; nb = N // blk + 1
pk = np.array([lvl[i * blk:(i + 1) * blk].max() if i * blk < N else 0 for i in range(nb)])
env = np.zeros(nb); a_rel = np.exp(-blk / SR / 0.35); a_att = np.exp(-blk / SR / 0.01)
for i in range(nb):
    p = pk[i]; prev = env[i - 1] if i else 0
    env[i] = a_att * prev + (1 - a_att) * p if p > prev else a_rel * prev + (1 - a_rel) * p
duck_db = -DUCK * np.clip((env - 0.05) / 0.25, 0, 1)
gain = np.interp(np.arange(N), np.arange(nb) * blk, 10 ** (duck_db / 20)).astype(np.float32)
out = fx + mus * gain[:, None]
r = lambda x: 20 * np.log10(np.sqrt((x ** 2).mean()) + 1e-12)
print('fx rms', round(r(fx), 1), 'music rms', round(r(mus), 1), 'mix rms', round(r(out), 1), 'peak', round(float(np.abs(out).max()), 3), 'mean duck dB', round(float(duck_db.mean()), 2))
sf.write(sys.argv[3], out, SR, subtype='FLOAT')
