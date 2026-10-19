# Variable-length music bed from vibe.mp3 (112.79 BPM) laid under the synthesized ethereal layer.
# usage: python3 mix_music.py vibe.wav audio.wav out.wav [gain]
import sys, numpy as np, wave
from scipy.signal import butter, sosfilt
SR = 44100
def rd(p):
    w = wave.open(p); assert w.getframerate()==SR and w.getnchannels()==2
    return np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).reshape(-1,2).astype(np.float32)/32768
vibe = rd(sys.argv[1]); aud = rd(sys.argv[2]); G = float(sys.argv[4]) if len(sys.argv)>4 else 0.34
N = len(aud)
# (video bar start, track bar start, number of bars)   intro | groove | groove | breakdown | groove | outro
import json, os
PLAN = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'music_plan.json')))
if isinstance(PLAN, list): SEGS, BEAT0, BAR = PLAN, 0.391, 0.53194*4      # old format (the first project)
else: SEGS, BEAT0, BAR = PLAN['segs'], PLAN['beat0'], PLAN['bar']
X = int(0.15*SR)          # equal-power crossfade; the next segment is pre-rolled so its downbeat lands at full level
mus = np.zeros((N+SR*3,2), np.float32)
fin = np.sin(np.linspace(0, np.pi/2, X))[:,None].astype(np.float32); fout = fin[::-1]
for vb, tb, nb in SEGS:
    a = int((BEAT0+tb*BAR)*SR); b = a+int(nb*BAR*SR)
    s0 = int(vb*BAR*SR)
    pre = X if vb>0 else 0
    seg = vibe[max(0,a-pre):min(b,len(vibe))].copy()
    if len(seg)==0: continue
    if pre: seg[:X] *= fin
    seg[-X:] *= fout
    st = s0-pre
    e = min(st+len(seg), len(mus)); mus[st:e] += seg[:e-st]
mus = mus[:N]
sos = butter(2, 11000, 'low', fs=SR, output='sos'); mus = sosfilt(sos, mus, axis=0).astype(np.float32)
t = np.arange(N)/SR; env = np.minimum(1, t/0.6)*np.minimum(1, (N/SR-t)/3.0)
mus *= (env[:,None]*G).astype(np.float32)
out = aud + mus
print('music rms dB', 20*np.log10(np.sqrt((mus**2).mean())), 'mix rms', 20*np.log10(np.sqrt((out**2).mean())), 'peak', np.abs(out).max())
import soundfile as sf
sf.write(sys.argv[3], out, SR, subtype='FLOAT')
