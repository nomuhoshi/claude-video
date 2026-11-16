# 《为什么高能量的状态更少见？》——全部图表数据由这里精确计算，输出 bz_data.js（window.BZ）和 forms_bz.json（公式里的数字也来自这里）。
# 用法: python3 bz_data.py
import json, math, itertools
from fractions import Fraction
import numpy as np

C = math.comb
out = {}

# ---------- 1. 四钱包四硬币：暴力枚举所有"完整分法" ----------
W, Q = 4, 4
allsplits = [s for s in itertools.product(range(Q + 1), repeat=W) if sum(s) == Q]
assert len(allsplits) == C(Q + W - 1, W - 1) == 35                     # 总共 35 种
omega = [sum(1 for s in allsplits if s[0] == n) for n in range(Q + 1)]  # 系统(钱包0)拿 n 枚，库里的分法数
assert omega == [C(Q - n + 2, 2) for n in range(Q + 1)] == [15, 10, 6, 3, 1] and sum(omega) == 35
out['omega'] = omega; out['total'] = sum(omega)
out['P'] = [str(Fraction(o, 35)) for o in omega]
out['Pnum'] = [o / 35 for o in omega]

# q=3 在 3 个钱包里的 10 种分法：分三组展示
q3 = [s for s in itertools.product(range(4), repeat=3) if sum(s) == 3]
assert len(q3) == 10
g1 = [s for s in q3 if sorted(s) == [0, 0, 3]]; g2 = [s for s in q3 if sorted(s) == [0, 1, 2]]; g3 = [s for s in q3 if s == (1, 1, 1)]
assert (len(g1), len(g2), len(g3)) == (3, 6, 1)
out['q3groups'] = [g1, g2, g3]
# 星和隔板：3 颗星 + 2 根隔板，5 个位置里选 2 个放隔板
sb = []
for bars in itertools.combinations(range(5), 2):
    i, j = bars; cnt = (i, j - i - 1, 4 - j); sb.append({'bars': list(bars), 'counts': list(cnt)})
assert len(sb) == C(5, 2) == 10 and sorted(tuple(x['counts']) for x in sb) == sorted(q3)
out['sb'] = sb
# 每个 n 对应的库分法（用来画 n=0..4 的小图示的数量）
out['reservoirSplits'] = {str(n): [s for s in itertools.product(range(Q - n + 1), repeat=3) if sum(s) == Q - n] for n in range(Q + 1)}
assert [len(out['reservoirSplits'][str(n)]) for n in range(5)] == omega

# 概率 P(n) 的 8 种示例分法（镜头 2 里随机轮播，均取自 35 种）
out['splits35'] = [list(s) for s in allsplits]

# ---------- 2. 变大：库有 r 个振子，总共 Q=r+1 枚（每个振子平均 1 枚，r=3 就是上面的模型） ----------
def Pn(r, nmax=8):
    Qt = r + 1
    w = [C(Qt - n + r - 1, r - 1) if n <= Qt else 0 for n in range(nmax + 1)]
    tot = sum(C(Qt - n + r - 1, r - 1) for n in range(Qt + 1))
    assert tot == C(Qt + r, r)                                       # 总分法数（系统 1 个振子 + 库 r 个振子，总 Qt 枚）
    return [x / tot for x in w], tot
fitn = 4                                                              # 拟合区间 n=0..4（三种 r 下 P 都大于 0）
big = []
for r in (3, 10, 50):
    P, tot = Pn(r); n = np.arange(fitn + 1); y = np.log(np.array(P[:fitn + 1]))
    slope, ic = np.polyfit(n, y, 1); beta = -slope; A = math.exp(ic)
    fitv = [A * math.exp(-beta * k) for k in range(9)]
    dev = max(abs(P[k] - fitv[k]) / P[k] for k in range(fitn + 1))
    big.append({'r': r, 'Q': r + 1, 'P': P, 'beta': beta, 'A': A, 'fit': fitv, 'dev': dev, 'tot': tot,
                'ratios': [P[k + 1] / P[k] for k in range(fitn)]})
out['big'] = big
# r→∞ 极限：每个振子平均 1 枚 → 相邻比值 → 1/2，β = ln 2
out['betaInf'] = math.log(2)
# 大库极限的理论曲线（几何分布 (1/2)^(n+1)），仅作旁证，画面上只拿实际计数
out['geo'] = [0.5 ** (k + 1) for k in range(9)]

# ---------- 3. 粒子：库是 M 个格子放 k 个小球，Ω_R = C(M,k)；系统拿走 N 个，库剩 k-N ----------
M = 1000
def lattice(k, Nmax=6):
    base = C(M, k); rel = [C(M, k - N) / base for N in range(Nmax + 1)]
    step = [C(M, k - N - 1) / C(M, k - N) for N in range(Nmax)]
    return rel, step
sp = lattice(300); de = lattice(700)
out['lat'] = {'M': M, 'sparse': {'k': 300, 'rel': sp[0], 'step': sp[1], 'mu_over_kT': [math.log(s) for s in sp[1]]},
              'dense': {'k': 700, 'rel': de[0], 'step': de[1], 'mu_over_kT': [math.log(s) for s in de[1]]}}
# 稀：每步 ×0.43（<1）→ μ<0；密：每步 ×2.3（>1）→ μ>0（库的状态数反而变多）

# ---------- 4. 公式镜头：S_R/k_B = ln Ω_R 随库能量的曲线，及切线 ----------
r = 50; Et = r + 1                                                    # 库 50 个振子，总 51 枚（与第 4 镜头最大库相同）
Er = np.arange(15, 91)
S = [math.log(C(e + r - 1, r - 1)) for e in Er]
slope = math.log(C(Et + r, r - 1) / C(Et + r - 1, r - 1)) if False else math.log((Et + r) / (Et + 1))  # 占位，下面用精确数值差分覆盖
Sat = lambda e: math.log(C(e + r - 1, r - 1))
slope = (Sat(Et + 1) - Sat(Et - 1)) / 2                               # 数值导数 ∂(S/k_B)/∂E，E 以 ε 为单位 → β
out['SE'] = {'r': r, 'Etot': Et, 'E': [int(x) for x in Er], 'S': S, 'S0': Sat(Et), 'slope': slope,
             'drops': [{'E': E, 'actual': Sat(Et) - Sat(Et - E), 'tangent': slope * E} for E in (0, 4, 8, 12, 16, 20)]}
# 粒子方向：S_R(N)/k_B = ln C(M,N)，在 k=300 处切线斜率 = -βμ
Nn = np.arange(180, 421)
SN = [math.log(C(M, int(n))) for n in Nn]
sN = (math.log(C(M, 301)) - math.log(C(M, 299))) / 2
out['SN'] = {'M': M, 'k': 300, 'N': [int(x) for x in Nn], 'S': SN, 'S0': math.log(C(M, 300)), 'slope': sN,
             'muOverKT': -sN}
# 一致性：大库斜率 ≈ 拟合 β（r=50）
out['check'] = {'slopeE': slope, 'betaFit50': big[2]['beta'], 'betaInf': out['betaInf']}

# ---------- 5. 输出 ----------
open('bz_data.js', 'w').write('window.BZ=' + json.dumps(out) + ';')
f = lambda x, d=2: f'{x:.{d}f}'
P = out['Pnum']
forms = {
    'title': r'e^{-E/k_BT}',
    'rule': r'\text{每一种分法，机会一样}',
    'omegaSum': r'15+10+6+3+1=\gd{35}',
    'sbC': r'\dbinom{5}{2}=10',
    'q3': r'10=3+6+1',
    'bf': r'P(n)\ \propto\ e^{-\beta E}\,,\quad E=n\varepsilon',
    'bf2': r'e^{-E/k_BT}',
    'omegaR': r'P(n)=\dfrac{\Omega_R(n)}{35}',
    'omegaR2': r'\Omega_R=\dbinom{q+2}{2}',
    'omegaBig': r'\Omega_R=\dbinom{Q-n+r-1}{r-1}',
    'mult': r'\text{倍数}=\gd{e^{\beta\mu}}',
    'mu': r'\mu=k_BT\,\ln(\text{倍数})',
    'omegaLat': r'\Omega_R=\dbinom{M}{k}',
    'f6a': r'S=k_B\ln\Omega',
    'f6b': r'\Omega=e^{S/k_B}',
    'f7': r'S_R(E_{\rm tot}-E,\,N_{\rm tot}-N)\ \approx\ S_R(E_{\rm tot},N_{\rm tot})\ -\ E\,\dfrac{\partial S}{\partial E}\ -\ N\,\dfrac{\partial S}{\partial N}',
    'f7a': r'S_R(E_{\rm tot}-E,\,N_{\rm tot}-N)\ \approx\ S_R(E_{\rm tot},N_{\rm tot})',
    'f7b': r'\qquad-\ E\,\dfrac{\partial S}{\partial E}\ -\ N\,\dfrac{\partial S}{\partial N}',
    'dsE': r'\dfrac{\partial S}{\partial E}=\gd{\dfrac1T}',
    'dsN': r'\dfrac{\partial S}{\partial N}=\gd{-\dfrac{\mu}{T}}',
    'f8': r'P(N,j)\ \propto\ \gd{e^{-\beta\,(E_j(N)-\mu N)}}\,,\qquad \beta=\dfrac{1}{k_BT}',
    'f8s': r'e^{-\beta\,(E-\mu N)}',
    'prop': r'P\ \propto\ \Omega_R\ \propto\ e^{S_R/k_B}',
    'xi': r'P=\dfrac{\text{权重}}{\Xi}\,,\quad \Xi=\sum\text{权重}',
    'sumP': r'\sum_n P(n)=1',
    'slopeE': r'\text{斜率}=\dfrac{\partial S}{\partial E}=\dfrac1T',
    'dropE': r'\text{下降}\ \approx\ \dfrac{E}{T}',
}
for i, o in enumerate(out['omega']):
    forms[f'p{i}'] = r'\dfrac{%d}{35}' % o
    forms[f'o{i}'] = str(o)
for b in big:
    forms[f'beta{b["r"]}'] = r'\beta\varepsilon=%s' % f(b['beta'], 3)
forms['betaInf'] = r'\beta\varepsilon=\ln 2\approx %s' % f(out['betaInf'], 3)
json.dump(forms, open('forms_bz.json', 'w'), ensure_ascii=False, indent=1)
print('omega', omega, 'tot', sum(omega), 'P', out['P'])
for b in big: print('r', b['r'], 'beta %.4f' % b['beta'], 'dev %.1f%%' % (100 * b['dev']), 'ratios', [round(x, 3) for x in b['ratios']])
print('betaInf', out['betaInf'], 'slopeE', slope)
print('lattice sparse', [round(x, 4) for x in sp[1][:3]], 'dense', [round(x, 4) for x in de[1][:3]], 'mu/kT', math.log(sp[1][0]), math.log(de[1][0]), 'SN slope', sN)
