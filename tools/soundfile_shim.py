# 轻量替身：PyPI 不可用时用 scipy.io.wavfile 实现 soundfile 的 read/write（仅 WAV）
import numpy as np
from scipy.io import wavfile
def read(path, dtype='float64', always_2d=False, **kw):
    sr, x = wavfile.read(path)
    if x.dtype.kind in 'iu':
        if x.dtype == np.uint8: x = (x.astype(np.float64) - 128) / 128
        else: x = x.astype(np.float64) / float(-np.iinfo(x.dtype).min)
    x = x.astype(dtype)
    if always_2d and x.ndim == 1: x = x[:, None]
    return x, sr
def write(path, data, samplerate, subtype=None, **kw):
    d = np.asarray(data)
    if subtype in (None, 'PCM_16'):
        d = (np.clip(d, -1, 1) * 32767).astype(np.int16)
    elif subtype == 'PCM_24' or subtype == 'PCM_32':
        d = (np.clip(d, -1, 1) * 2147483647).astype(np.int32)
    elif subtype == 'DOUBLE': d = d.astype(np.float64)
    else: d = d.astype(np.float32)
    wavfile.write(path, int(samplerate), d)
