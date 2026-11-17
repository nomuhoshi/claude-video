# 球壳法：d^3p → 4πp²dp。所有数字/曲线由这里精确计算（x = βcp，单位 1/(βc)），输出 sh_data.js 和 forms_sh.json。
import json, math
import numpy as np
from scipy.integrate import quad
out = {}
# 1. 球壳体积 = V(p+dp)-V(p)，与 4πp²dp 比较（p=1）
V = lambda p: 4 / 3 * math.pi * p ** 3
out['shell'] = [{'dp': dp, 'exact': V(1 + dp) - V(1), 'approx': 4 * math.pi * dp, 'rel': (V(1 + dp) - V(1) - 4 * math.pi * dp) / (V(1 + dp) - V(1))} for dp in (0.5, 0.2, 0.1, 0.05, 0.01)]
# 2. 曲线（x=βcp）：4πx²、e^{-x}、乘积
xs = np.arange(0, 8.0001, 0.05)
out['xs'] = xs.tolist(); out['area'] = (4 * math.pi * xs ** 2).tolist(); out['w'] = np.exp(-xs).tolist(); out['prod'] = (4 * math.pi * xs ** 2 * np.exp(-xs)).tolist()
g = np.arange(0, 20, 0.001); out['peak'] = float(g[np.argmax(g ** 2 * np.exp(-g))])
# 3. 把壳加起来：中点黎曼和（到 x=60）
exact = quad(lambda x: 4 * math.pi * x * x * math.exp(-x), 0, np.inf)[0]
rs = []
for dx in (1.0, 0.5, 0.25, 0.1, 0.01):
    xm = np.arange(dx / 2, 60, dx); rs.append({'dx': dx, 'sum': float((4 * math.pi * xm ** 2 * np.exp(-xm) * dx).sum())})
out['riemann'] = rs; out['exact'] = exact; out['eightpi'] = 8 * math.pi
assert abs(exact - 8 * math.pi) < 1e-8 and abs(rs[-1]['sum'] - 8 * math.pi) < 1e-3 and abs(out['peak'] - 2) < 1e-2
xm = np.arange(0.25, 8, 0.5); out['bars'] = {'x': xm.tolist(), 'h': (4 * math.pi * xm ** 2 * np.exp(-xm)).tolist(), 'dx': 0.5}
open('sh_data.js', 'w').write('window.SH=' + json.dumps(out) + ';')
forms = {
    'int0': r'\displaystyle\int e^{-\beta c p}\,d^3p',
    'sphereV': r'V(p)=\dfrac43\pi p^3',
    'dV': r'dV=\dfrac{dV}{dp}\,dp=\gd{4\pi p^2\,dp}',
    'step': r'd^3p\ \to\ \gd{4\pi p^2\,dp}',
    'layer': r'e^{-\beta c p}\cdot 4\pi p^2\,dp',
    'full': r'\displaystyle\int e^{-\beta c p}\,d^3p=4\pi\int_0^\infty p^2\,e^{-\beta c p}\,dp',
    'res': r'=4\pi\cdot\dfrac{2}{(\beta c)^3}=\gd{\dfrac{8\pi}{(\beta c)^3}}',
    'fact': r'\displaystyle\int_0^\infty x^n e^{-x}\,dx=\gd{n!}',
    'sub': r'x=\beta c p',
    'res2': r'\displaystyle\int e^{-\beta c p}\,d^3p=\gd{\dfrac{8\pi}{(\beta c)^3}}',
    'area': r'4\pi p^2',
}
json.dump(forms, open('forms_sh.json', 'w'), ensure_ascii=False, indent=1)
print('exact', exact, '8pi', 8 * math.pi, 'peak', out['peak']); print([ (r['dx'], round(r['sum'], 4)) for r in rs]); print([(s['dp'], round(s['rel'] * 100, 2)) for s in out['shell']])
