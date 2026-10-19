# Variable-length music bed from vibe.mp3 (112.79 BPM) laid under the synthesized ethereal layer.
# usage: python3 mix_music.py vibe.wav audio.wav out.wav [gain]
import sys, numpy as np, wave
from scipy.signal import butter, sosfilt
BEAT0, BEAT = 0.391, 0.53194; BAR = BEAT*4; SR = 44100
def rd(p):
    w = wave.open(p); assert w.getframerate()==SR and w.getnchannels()==2
    return np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).reshape(-1,2).astype(np.float32)/32768
vibe = rd(sys.argv[1]); aud = rd(sys.argv[2]); G = float(sys.argv[4]) if len(sys.argv)>4 else 0.34
N = len(aud)
# (video bar start, track bar start, number of bars)   intro | groove | groove | breakdown | groove | outro
import json, os
SEGS = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'music_plan.json')))
X = int(0.02*SR)
mus = np.zeros((N+SR*3,2), np.float32)
for vb, tb, nb in SEGS:
    a = int((BEAT0+tb*BAR)*SR); b = a+int(nb*BAR*SR)
    seg = vibe[a:min(b,len(vibe))].copy()
    if len(seg)==0: continue
    s0 = int(vb*BAR*SR)
    # 20 ms crossfade at both seams
    if vb>0: seg[:X] *= np.linspace(0,1,X)[:,None]
    seg[-X:] *= np.linspace(1,0,X)[:,None]
    e = min(s0+len(seg), len(mus)); mus[s0:e] += seg[:e-s0]
mus = mus[:N]
sos = butter(2, 11000, 'low', fs=SR, output='sos'); mus = sosfilt(sos, mus, axis=0).astype(np.float32)
t = np.arange(N)/SR; env = np.minimum(1, t/0.6)*np.minimum(1, (N/SR-t)/3.0)
mus *= (env[:,None]*G).astype(np.float32)
out = aud + mus
print('music rms dB', 20*np.log10(np.sqrt((mus**2).mean())), 'mix rms', 20*np.log10(np.sqrt((out**2).mean())), 'peak', np.abs(out).max())
import soundfile as sf
sf.write(sys.argv[3], out, SR, subtype='FLOAT')
