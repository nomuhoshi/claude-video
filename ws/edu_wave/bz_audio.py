# 《玻尔兹曼因子》配乐：Entropy（用户提供的固定纯音乐）按小节（1.6 s）重拼到片长，避开第 32 小节的真空、第 66–68 小节的变轻；
# 同曲跳小节的接缝用 0.3 s 线性淡化；叠加轻 whoosh（转场）和 ding（要点）；静态增益到约 −20 LUFS（无配音，底噪般安静）。
# 用法: python3 bz_audio.py   → bz_audio.wav
import json, subprocess, re, numpy as np, soundfile as sf, glob
SR = 44100; m = json.load(open('bz_meta.json')); D = m['total'] + 1.0
src = glob.glob('/mnt/user-data/attachments/*/7b5bef81-Entropy_-_Original.mp3')[0]
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', src, '-ar', str(SR), '-ac', '2', '/tmp/bzm_entropy.wav'], check=True)
en, _ = sf.read('/tmp/bzm_entropy.wav', dtype='float32'); eph, BAR, XF = 1.175, 1.6, 0.15
N = int(D * SR)
seq = list(range(13, 32)) + list(range(34, 66)) + list(range(70, 102)) + list(range(34, 66)) + list(range(70, 102)) + list(range(34, 51))
nb = int(np.ceil(D / BAR)); assert len(seq) >= nb, (len(seq), nb); seq = seq[:nb]
def take(a, n):
    a = int(round(a * SR)); n = int(round(n * SR)); out = np.zeros((n, 2), np.float32); s = en[max(0, a):max(0, a) + n]; out[:len(s)] = s; return out
runs = []; j = 0
while j < len(seq):
    j1 = j
    while j1 + 1 < len(seq) and seq[j1 + 1] == seq[j1] + 1: j1 += 1
    runs.append((j, seq[j], j1 - j + 1)); j = j1 + 1
bed = np.zeros((N + int(5 * SR), 2), np.float32); k = int(2 * XF * SR)
for r, (j0, b0, mm) in enumerate(runs):
    seg = take(eph + b0 * BAR - XF, mm * BAR + 2 * XF)
    if r > 0: seg[:k] *= np.linspace(0, 1, k)[:, None]
    if r + 1 < len(runs): seg[-k:] *= np.linspace(1, 0, k)[:, None]
    s = int(round(j0 * BAR * SR)); bed[s:s + len(seg)] += seg
bed = bed[:N]; t = np.arange(N) / SR
bed *= np.clip(t / 2.5, 0, 1)[:, None] ** 1.5                      # 开头 2.5 s 淡入（第 0 帧有画面，声音轻轻进来）
bed *= np.clip((D - t) / 6.0, 0, 1)[:, None] ** 1.5                # 结尾 6 s 淡出
rng = np.random.default_rng(7)
def tone(fs, dur, dec, amp):
    tt = np.arange(int(dur * SR)) / SR; e = np.exp(-tt / dec) * np.minimum(1, tt / .004); return amp * e * sum(a * np.sin(2 * np.pi * f * tt) for f, a in fs)
def whoosh():
    n = int(.8 * SR); x = rng.standard_normal(n); tt = np.arange(n) / SR
    x = np.convolve(x, np.ones(40) / 40, 'same') - np.convolve(x, np.ones(400) / 400, 'same'); return .16 * x * np.sin(np.pi * tt / .8) ** 2
SFX = {'whoosh': whoosh(), 'ding': tone([(1760, 1), (2640, .45), (3520, .15)], 2.4, .6, .05)}
sx = np.zeros(N)
for tc, ty in m['cues']:
    if ty not in SFX: continue
    s = SFX[ty]; i = int(tc * SR); e = min(N, i + len(s)); sx[i:e] += s[:e - i]
mixd = bed.copy(); mixd[:, 0] += sx; mixd[:, 1] += np.roll(sx, 331)
def lufs(x):
    sf.write('/tmp/bzm_tmp.wav', x, SR, subtype='FLOAT')
    p = subprocess.run(['ffmpeg', '-nostats', '-i', '/tmp/bzm_tmp.wav', '-af', 'ebur128=peak=true', '-f', 'null', '-'], capture_output=True, text=True).stderr
    return float(re.findall(r'I:\s+(-?[\d.]+) LUFS', p)[-1])
cur = lufs(mixd); g = 10 ** ((-20 - cur) / 20); mixd *= g
pk = np.abs(mixd).max(); print('LUFS before', cur, 'gain', round(g, 3), 'peak', round(float(pk), 3))
if pk > .75: mixd *= .75 / pk
sf.write('bz_audio.wav', mixd, SR, subtype='PCM_16'); print('final LUFS', lufs(mixd), 'dur', round(N / SR, 1), 'bars', nb, 'runs', len(runs))
