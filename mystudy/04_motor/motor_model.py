# 3 槽 2 极直流电动机的简化模型：三角形接法，换向器 3 片，电刷 +（右，0°）/ −（左，180°）
# 磁场 B 从左（N）指向右（S），即 +x。线圈 k 轴向角 θk = φ + 90° + 120°k（向外为正）。
# 线圈 k 接在铜片 k 与 k+1 之间；电流从铜片 k 流向 k+1 时，线圈 k 外端为 N（磁矩沿 +轴）。
import numpy as np
def seg_at(angle, phi, c, gap=8):
    for j in range(3):
        d = (angle - (phi + c + 120 * j) + 180) % 360 - 180
        if abs(d) < 60 - gap / 2: return j
    return None
def state(phi, c):
    a, b = seg_at(0, phi, c), seg_at(180, phi, c)
    I = np.zeros(3)
    if a is None or b is None or a == b: return I
    # 节点电势：a = 1，b = 0，第三片 c3 在两线圈串联中点 = 0.5
    V = {a: 1.0, b: 0.0}; c3 = 3 - a - b; V[c3] = 0.5
    for k in range(3): I[k] = V[k] - V[(k + 1) % 3]          # 从铜片 k 流向 k+1 的电流（R = 1）
    return I
def torque(phi, c):
    I = state(phi, c); t = 0
    for k in range(3):
        th = np.radians(phi + 90 + 120 * k); m = I[k] * np.array([np.cos(th), np.sin(th)])
        t += -m[1] * 1.0          # τz = mx·By − my·Bx，B = (1, 0)
    return t
for c in range(0, 120, 10):
    ts = np.array([torque(p, c) for p in np.arange(0, 360, 1)])
    nz = ts[np.abs(ts) > 1e-9]
    print(c, 'min %.2f max %.2f mean %.2f zeros %d' % (ts.min(), ts.max(), ts.mean(), (np.abs(ts) < 1e-9).sum()), 'one-sign' if (nz > 0).all() or (nz < 0).all() else '')
