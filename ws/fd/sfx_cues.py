# Sound design for the Faraday video: sample cues anchored to subtitle lines, and the shared hit schedules
# that both the pictures (DATA.hits) and the sounds use, so every hammer blow lands on screen and in the ear together.
import script_fd as F

def T(key, li=None, off=0.0):
    tl = F.TL[F.IDX[key]]
    return tl['s'] + (tl['ls'][li] if li is not None else 0.0) + off
def rel(key, t): return t - F.TL[F.IDX[key]]['s']

# ---------------- shared schedules (scene-relative seconds) ----------------
def smith_hits():
    """blacksmith rhythm on the 150 BPM grid: heavy, heavy, light tap - per bar of 4 beats (1.6 s)"""
    out, t0, end = [], T('s1', 1, 0.4), F.TL[F.IDX['s1']]['e'] - 0.25
    b = F.BEAT_E; k = 0
    while True:
        bar = t0 + k * 4 * b
        for off, kind in ((0, 'H'), (2 * b, 'H'), (3 * b, 'T')):
            t = bar + off
            if t > end: return out
            out.append([round(rel('s1', t), 3), kind])
        k += 1

def bind_events():
    """bookbinding: stitches on the beat, the press, then finished books landing on the stack"""
    b = F.BEAT_E
    ev = []
    for k in range(4): ev.append([round(F.TL[F.IDX['s2']]['ls'][1] + (k + 1) * b, 3), 'stitch'])
    l2 = F.TL[F.IDX['s2']]['ls'][2]
    ev.append([round(l2, 3), 'press'])
    for k in range(4): ev.append([round(l2 + (k + 1.5) * b, 3), 'book'])
    l3 = F.TL[F.IDX['s2']]['ls'][3]
    ev.append([round(l3 + 0.2, 3), 'match'])
    ev.append([round(l3 + 1.0, 3), 'page']); ev.append([round(l3 + 1.8, 3), 'page'])
    return ev

HITS = {'d1': smith_hits(), 'd2': bind_events()}

# ---------------- cue list ----------------
def S(t, name, gain=1.0, pan=0.0, rate=1.0, wet=0.25, dry=1.0):
    return [round(t, 3), 'smp', [name, round(gain, 3), round(pan, 3), rate, wet, dry]]

def cues():
    c = []
    # ---- s1 / d1: the blacksmith's son ----
    s0 = F.TL[F.IDX['s1']]['s']; L = F.TL[F.IDX['s1']]['ls']
    alt = ['anvil1', 'anvil2', 'anvil3']; n = 0
    for t, kind in HITS['d1']:
        lvl = 1.0 if t < L[2] else 0.8 if t < L[3] else 0.6 if t < L[4] else 0.45
        if kind == 'H':
            c.append(S(s0 + t, alt[n % 3], 0.62 * lvl, -0.35, 1.0, 0.45)); n += 1
            c.append(S(s0 + t + 0.004, 'sparks', 0.22 * lvl, -0.3, 1.0, 0.2))
        else:
            c.append(S(s0 + t, 'anvil_tap', 0.4 * lvl, -0.35, 1.0, 0.4))
    c.append(S(s0 + L[3] + 0.3, 'chalk', 0.5, 0.45, 1.0, 0.15))
    c.append(S(s0 + L[4] + 0.1, 'chalk', 0.45, 0.45, 1.08, 0.15))
    # ---- s2 / d2: the apprentice bookbinder ----
    s0 = F.TL[F.IDX['s2']]['s']; L = F.TL[F.IDX['s2']]['ls']
    c.append(S(s0 + L[0], 'clink_hi', 0.35, 0.2, 0.75, 0.6))          # the shop bell over the door
    for k, st in enumerate([0.0, 0.45, 0.9, 1.35]): c.append(S(s0 + L[0] + 0.3 + st, 'step%d' % (1 + k % 2), 0.38, -0.3 + k * 0.08, 1.0, 0.3))
    pk = 0
    for t, kind in HITS['d2']:
        if kind == 'stitch':
            c.append(S(s0 + t, 'punch', 0.75, 0.05, 1.0, 0.15)); c.append(S(s0 + t + 0.12, 'thread', 0.5, 0.15, 1.0 + 0.05 * pk, 0.15)); pk += 1
        elif kind == 'press': c.append(S(s0 + t - 0.55, 'press', 0.8, 0.0, 1.0, 0.25))
        elif kind == 'book': c.append(S(s0 + t, 'book' if pk % 2 else 'book2', 0.7, 0.3, 1.0, 0.3)); pk += 1
        elif kind == 'match': c.append(S(s0 + t, 'match', 0.55, 0.4, 1.0, 0.3)); c.append(S(s0 + t + 0.3, 'flame', 0.35, 0.4, 1.0, 0.2))
        elif kind == 'page': c.append(S(s0 + t, 'page%d' % (1 + pk % 3), 0.6, 0.1, 1.0, 0.25)); pk += 1
    c.append(S(s0 + L[4], 'book_close', 0.55, 0.0, 1.1, 0.35)); c.append(S(s0 + L[4] + 0.25, 'page2', 0.5, 0.0, 1.0, 0.3))
    c.append(S(s0 + L[5], 'glitter', 0.45, 0.0, 1.0, 0.8))
    c += rest()
    return c

def eio_inv(y):
    lo, hi = 0.0, 1.0
    for _ in range(40):
        m = (lo + hi) / 2; v = 4 * m ** 3 if m < 0.5 else 1 - (-2 * m + 2) ** 3 / 2
        lo, hi = (m, hi) if v < y else (lo, m)
    return (lo + hi) / 2

def rest():
    c = []
    def at(key):
        s0 = F.TL[F.IDX[key]]['s']; L = F.TL[F.IDX[key]]['ls']
        return s0, L
    def add(t, *a, **k): c.append(S(t, *a, **k))
    # ---- chapter cards get a real low hit under the synth boom ----
    for i, sc in enumerate(F.SC):
        if sc['k'] == 'chap': add(F.TL[i]['s'], 'impact', 0.42, 0, 1.0, 0.5)
    # ---- hero / d0: a magnet pushed into a coil, the needle twitches, a city lights up ----
    s0, L = at('hero')
    add(s0 + L[1] + 0.1, 'step1', 0.3, 0.4); add(s0 + L[1] + 0.55, 'step2', 0.28, 0.4)
    add(s0 + L[2] + 0.2, 'swish', 0.5, 0.25, 0.6, 0.2); add(s0 + L[2] + 1.05, 'clunk', 0.3, 0.1, 1.3, 0.2)
    add(s0 + L[2] + 0.55, 'needle', 0.65, -0.45, 1.0, 0.3); add(s0 + L[3] - 0.2, 'needle', 0.35, -0.45, 1.15, 0.3)
    add(s0 + L[4] - 0.15, 'power_on', 0.6, 0, 1.0, 0.4); add(s0 + L[4] + 0.3, 'hum', 0.22, 0, 1.0, 0.3)
    add(s0 + L[5], 'impact', 0.6, 0, 1.0, 0.5)
    # ---- s3 / d3: a home-made battery, disc by disc ----
    s0, L = at('s3')
    span = L[2] - L[1] + 0.8
    for i in range(1, 13):
        k = (i - 1) % 3; t = s0 + L[1] + i / 12 * span
        if k == 0: add(t, 'clink_cu', 0.42, -0.1, 1.0, 0.2)
        elif k == 1: add(t, 'clink_zn', 0.4, -0.1, 1.0, 0.2)
        else: add(t, 'page3', 0.22, -0.1, 1.8, 0.1)
    add(s0 + L[3], 'switch', 0.7, 0.2, 1.0, 0.25); add(s0 + L[3] + 0.02, 'zap', 0.55, 0.2, 1.0, 0.35); add(s0 + L[3] + 0.15, 'hum', 0.28, 0.2, 1.0, 0.3)
    add(s0 + L[4], 'glitter', 0.3, 0.2, 1.0, 0.7)
    # ---- s4 / d4: a ticket, Davy's lecture hall, notes, a bound book ----
    s0, L = at('s4')
    add(s0 + L[0], 'swish', 0.6, -0.2, 1.0, 0.3)
    add(s0 + L[1], 'murmur', 0.55, 0, 1.0, 0.5); add(s0 + L[1] + 1.7, 'applause', 0.32, 0, 1.0, 0.6)
    add(s0 + L[1] + 0.6, 'glitter', 0.18, 0.1, 1.0, 0.8)
    add(s0 + L[2], 'pen', 0.55, 0.5, 1.0, 0.2)
    for k in range(1, 15, 2): add(s0 + L[3] + k / 14 * 2.4, 'page3', 0.28, -0.4, 1.2 + 0.03 * k, 0.15)
    add(s0 + L[4], 'book_close', 0.75, -0.4, 1.0, 0.3)
    # ---- s5 / d5: the notebook sent, an explosion, a door opens ----
    s0, L = at('s5')
    add(s0 + L[0] + 0.4, 'swish_long', 0.5, -0.1, 1.0, 0.3); add(s0 + L[0] + 2.3, 'book', 0.45, 0.4, 1.2, 0.3)
    add(s0 + L[1], 'explosion', 0.85, -0.3, 1.0, 0.45)
    add(s0 + L[3], 'creak', 0.6, 0.4, 1.0, 0.4); add(s0 + L[3] + 0.6, 'glitter', 0.25, 0.4, 1.0, 0.8)
    for k in range(7): add(s0 + L[3] + 0.5 + k * 0.449, 'step%d' % (1 + k % 2), 0.36 - k * 0.025, -0.3 + k * 0.1, 1.0, 0.35)
    add(s0 + L[4] + 1.6, 'slam', 0.3, 0.4, 1.0, 0.5)
    # ---- s6 / d6: the tour of Europe ----
    s0, L = at('s6')
    add(s0 + L[0], 'waves', 0.3, -0.4, 1.0, 0.4); add(s0 + L[0] + 0.6, 'hooves', 0.45, 0, 1.0, 0.3); add(s0 + L[0] + 2.8, 'hooves', 0.35, 0.2, 1.05, 0.3)
    for i in range(1, 8):
        t = s0 + L[0] + eio_inv((i - 1) / 7 + 0.01) * (L[2] - L[0]); add(t, 'pop', 0.35, (i - 4) / 8, 1.0 + 0.04 * i, 0.4)
    add(s0 + L[3], 'dull', 0.55, 0.3, 1.0, 0.3)
    for i in range(8): add(s0 + L[4] + i * 0.15, 'clink_hi', 0.22, (i - 4) / 8, 0.85 + 0.08 * i, 0.6)
    add(s0 + L[5], 'glitter', 0.4, 0.3, 1.0, 0.8)
    # ---- s7 / d7: Oersted's compass ----
    s0, L = at('s7')
    add(s0 + L[1] + 0.3, 'switch', 0.7, -0.4, 1.0, 0.25); add(s0 + L[1] + 0.35, 'hum', 0.28, 0, 1.0, 0.3); add(s0 + L[1] + 2.6, 'hum', 0.2, 0, 1.0, 0.3)
    add(s0 + L[2] - 0.55, 'needle', 0.6, 0, 0.8, 0.3)
    for i in range(1, 5): add(s0 + L[4] + 0.3 + i * 0.25, 'ripple', 0.4, 0, [1.3, 1.15, 1.0, 0.88][i - 1], 0.5)
    add(s0 + L[5], 'needle', 0.3, 0, 1.4, 0.4); add(s0 + L[5] + 0.1, 'glitter', 0.25, 0, 1.0, 0.7)
    # ---- s8 / d8: the wire that spins ----
    s0, L = at('s8')
    add(s0 + L[0] + 0.1, 'hum', 0.22, 0, 1.0, 0.3)
    for k in range(3): add(s0 + L[0] + 0.4 + k * 0.25, 'ripple', 0.3, 0, 1.2 - 0.12 * k, 0.5)
    add(s0 + L[1] + 0.3, 'swish', 0.35, 0, 1.1, 0.3); add(s0 + L[1] + 0.9, 'needle', 0.3, 0, 1.4, 0.4)
    add(s0 + L[2] + 0.1, 'clunk', 0.4, 0, 0.9, 0.3); add(s0 + L[2] + 0.5, 'pop', 0.35, 0.3, 0.8, 0.4)
    add(s0 + L[2] + 0.8, 'whir', 0.35, 0.2, 0.8, 0.3)
    add(s0 + L[3], 'pour', 0.4, 0, 0.8, 0.3)
    add(s0 + L[4], 'clink_hi', 0.25, 0, 1.0, 0.4); add(s0 + L[4] + 0.9, 'switch', 0.6, -0.5, 1.0, 0.25); add(s0 + L[4] + 0.92, 'zap_small', 0.4, 0, 1.0, 0.3)
    add(s0 + L[5], 'whir', 0.5, 0, 1.0, 0.3); add(s0 + L[5] + 2.6, 'whir', 0.4, 0, 1.08, 0.3)
    add(s0 + L[6], 'glitter', 0.35, 0.4, 1.0, 0.7)
    # ---- s9 / d9: the quarrel ----
    s0, L = at('s9')
    add(s0 + L[0], 'page1', 0.5, 0, 1.0, 0.25); add(s0 + L[0] + 0.35, 'stamp', 0.45, 0, 1.0, 0.3)
    add(s0 + L[2], 'murmur', 0.45, 0, 1.0, 0.5); add(s0 + L[2] + 0.05, 'dull', 0.5, 0, 1.0, 0.3)
    add(s0 + L[3], 'page2', 0.4, 0, 1.0, 0.25)
    add(s0 + L[4], 'dull', 0.5, -0.4, 1.0, 0.3); add(s0 + L[4] + 0.8, 'stamp', 0.7, 0.4, 1.0, 0.35)
    add(s0 + L[5], 'crack', 0.75, 0, 1.0, 0.45)
    # ---- s10 / d10: chlorine ----
    s0, L = at('s10')
    add(s0 + L[1], 'hiss', 0.35, -0.5, 1.0, 0.3); add(s0 + L[1] + 0.1, 'glass', 0.35, -0.5, 1.0, 0.4); add(s0 + L[1] + 0.6, 'bubbles', 0.2, -0.4, 1.0, 0.3)
    add(s0 + L[2], 'glitter', 0.3, 0.4, 1.0, 0.7)
    # ---- s10b / d28: gas lamps and benzene ----
    s0, L = at('s10b')
    for i in range(4): add(s0 + L[0] + i * 0.2, 'whoomp', 0.4 - i * 0.05, -0.75 + i * 0.12, 1.0 + 0.08 * i, 0.4)
    add(s0 + L[0] + 0.6, 'hiss', 0.15, -0.6, 0.8, 0.3)
    add(s0 + L[1], 'glass', 0.35, -0.05, 1.0, 0.4); add(s0 + L[1] + 0.3, 'bubbles', 0.3, -0.05, 1.0, 0.3)
    add(s0 + L[2] + 0.1, 'pour', 0.45, 0.2, 1.0, 0.3); add(s0 + L[2] + 0.3, 'step1', 0.25, 0.6)
    add(s0 + L[3], 'pen', 0.35, 0.3, 1.2, 0.2)
    add(s0 + L[4], 'glass', 0.4, 0.3, 1.3, 0.5)
    add(s0 + L[5], 'glitter', 0.3, 0, 1.0, 0.7); add(s0 + L[5] + 0.05, 'ripple', 0.3, 0, 0.9, 0.5)
    add(s0 + L[6], 'slither', 0.5, 0, 1.0, 0.3)
    add(s0 + L[7], 'impact', 0.55, 0, 1.0, 0.5)
    # ---- s11 / d11: years of nothing ----
    s0, L = at('s11')
    add(s0 + L[0], 'page2', 0.45, 0, 1.0, 0.25); add(s0 + L[1], 'pen', 0.5, 0, 1.0, 0.2)
    for k in range(9): add(s0 + L[2] + k * 0.25, 'tick' if k % 2 == 0 else 'tock', 0.35, 0, 1.0, 0.25)
    add(s0 + L[3], 'clunk', 0.4, 0.4, 1.0, 0.25)
    for k in range(4): add(s0 + L[4] + 0.2 + k * F.BEAT, 'tick' if k % 2 == 0 else 'tock', 0.4, -0.4, 0.9, 0.35)
    # ---- s12 / d12: the iron ring ----
    s0, L = at('s12')
    add(s0 + L[0], 'stamp', 0.6, 0, 1.0, 0.35)
    for k in range(3): add(s0 + L[1] + k * 0.4, 'thread', 0.35, (k - 1) * 0.3, 0.7, 0.2)
    add(s0 + L[2], 'clunk', 0.3, -0.6, 1.2, 0.25)
    c1, o1, c2 = L[3] + 0.4, L[4] + 0.4, L[5] + 0.3
    add(s0 + c1, 'switch', 0.7, -0.5, 1.0, 0.25); add(s0 + c1 + 0.02, 'needle', 0.7, 0.6, 1.0, 0.3)
    add(s0 + o1, 'switch', 0.6, -0.5, 0.9, 0.25); add(s0 + o1 + 0.02, 'needle', 0.65, 0.6, 0.85, 0.3)
    add(s0 + c2, 'switch', 0.6, -0.5, 1.0, 0.25); add(s0 + c2 + 0.02, 'needle', 0.55, 0.6, 1.0, 0.3); add(s0 + c2 + 0.3, 'hum', 0.25, -0.2, 1.0, 0.3)
    # ---- s13 / d13: in and out ----
    s0, L = at('s13')
    add(s0 + L[2] + 0.3, 'swish', 0.45, 0.4, 0.7, 0.2); add(s0 + L[2] + 0.55, 'needle', 0.6, -0.5, 1.0, 0.3)
    add(s0 + L[3] + 0.3, 'swish', 0.45, 0.4, 0.6, 0.2); add(s0 + L[3] + 0.55, 'needle', 0.6, -0.5, 0.85, 0.3)
    add(s0 + L[4] + 0.3, 'tick', 0.3, -0.5, 1.0, 0.3); add(s0 + L[4] + 0.97, 'tock', 0.3, -0.5, 1.0, 0.3)
    add(s0 + L[5], 'impact', 0.6, 0, 1.0, 0.5); add(s0 + L[5] + 0.05, 'glitter', 0.35, 0.4, 1.0, 0.7)
    # ---- s14 / d14: the law ----
    s0, L = at('s14')
    for k in range(4): add(s0 + L[1] + k * 0.4, 'pop', 0.3, -0.3, 0.9 + 0.1 * k, 0.4)
    add(s0 + L[3], 'zap_small', 0.5, -0.3, 1.0, 0.3); add(s0 + L[3] + 0.02, 'sweep', 0.35, 0, 1.2, 0.4)
    add(s0 + L[4], 'impact', 0.45, 0, 1.0, 0.5); add(s0 + L[4] + 0.05, 'glitter', 0.3, 0.4, 1.0, 0.7)
    # ---- s15 / d15: the copper disc ----
    s0, L = at('s15')
    add(s0 + L[1] - 0.3, 'clunk', 0.45, -0.2, 0.9, 0.25)
    for k in range(4): add(s0 + L[1] + k * 2.5, 'whir', 0.5 if k else 0.45, -0.2, 1.0 + (0.06 if k else 0), 0.3)
    for k in range(3): add(s0 + L[2] + 0.5 + k * 2.6, 'hum', 0.25, 0.4, 1.0, 0.3)
    add(s0 + L[2] + 0.4, 'zap_small', 0.35, 0.4, 1.0, 0.3)
    add(s0 + L[5], 'impact', 0.5, 0, 1.0, 0.5)
    # ---- s16 / d16: power stations ----
    s0, L = at('s16')
    for k in range(5): add(s0 + 0.2 + k * 3.0, 'turbine', 0.45, -0.3, 1.0, 0.35)
    for i in range(3): add(s0 + L[1] + i * 0.3, 'pop', 0.35, 0.1 + 0.2 * i, 1.0 + 0.1 * i, 0.4)
    add(s0 + L[4], 'power_on', 0.6, 0.4, 1.0, 0.4)
    add(s0 + L[5], 'glitter', 0.3, 0.4, 1.0, 0.7)
    # ---- s17 / d17: iron filings ----
    s0, L = at('s17')
    add(s0 + L[0] + 0.3, 'sprinkle', 0.55, 0, 1.0, 0.25)
    add(s0 + L[1] + 0.02, 'rattle', 0.7, 0, 1.0, 0.3); add(s0 + L[1] + 0.32, 'knock', 0.35, 0, 1.3, 0.3)
    add(s0 + L[5], 'sweep', 0.35, 0, 1.0, 0.5); add(s0 + L[5] + 0.1, 'glitter', 0.3, 0, 1.0, 0.7)
    # ---- s18 / d18: action at a distance vs. the field ----
    s0, L = at('s18')
    add(s0 + L[1], 'swish', 0.4, 0, 1.0, 0.3); add(s0 + L[2], 'dull', 0.55, 0, 1.0, 0.3)
    add(s0 + L[3], 'glitter', 0.3, 0, 1.0, 0.7)
    add(s0 + L[4], 'ripple', 0.5, -0.5, 0.8, 0.5); add(s0 + L[4] + 0.05, 'sweep', 0.3, 0, 1.0, 0.5)
    add(s0 + L[5], 'impact', 0.6, 0, 1.0, 0.5)
    # ---- s18b / d29: the cage ----
    s0, L = at('s18b')
    for k in range(4): add(s0 + L[1] + 0.1 + k * 0.33, 'knock' if k % 2 == 0 else 'knock_hi', 0.45, 0.05, 1.0, 0.35)
    add(s0 + L[2], 'foil', 0.5, 0.05, 1.0, 0.3)
    add(s0 + L[3], 'whir', 0.3, -0.7, 0.8, 0.3); add(s0 + L[3] + 0.05, 'zap_big', 0.75, -0.3, 1.0, 0.45); add(s0 + L[3] + 1.3, 'zap', 0.6, -0.3, 1.0, 0.45)
    add(s0 + L[4] + 0.5, 'zap', 0.32, -0.4, 1.1, 0.4); add(s0 + L[5] + 0.2, 'zap_small', 0.28, -0.4, 1.0, 0.4); add(s0 + L[6], 'zap_small', 0.22, -0.4, 0.9, 0.4)
    add(s0 + L[4], 'step1', 0.33, 0.05); add(s0 + L[4] + 0.45, 'step2', 0.3, 0.05)
    add(s0 + L[5], 'glitter', 0.25, 0.6, 1.0, 0.7)
    for i in range(3): add(s0 + L[7] + i * 0.3, 'pop', 0.45, -0.5 + 0.5 * i, 1.0 + 0.12 * i, 0.4)
    # ---- s19 / d19: magnetism turns light ----
    s0, L = at('s19')
    add(s0 + L[1] - 0.2, 'glass', 0.4, 0, 0.8, 0.5); add(s0 + L[1], 'sweep', 0.3, -0.3, 0.8, 0.5)
    add(s0 + L[2], 'clunk', 0.5, 0, 0.8, 0.3); add(s0 + L[2] + 0.1, 'hum', 0.25, 0, 1.0, 0.3)
    add(s0 + L[3], 'sweep', 0.3, 0.4, 1.3, 0.5); add(s0 + L[4], 'glitter', 0.3, 0, 1.0, 0.7)
    # ---- s19b / d30: the speaker who ran away ----
    s0, L = at('s19b')
    add(s0 + 0.3, 'murmur', 0.4, 0, 1.0, 0.5); add(s0 + 3.5, 'murmur', 0.35, 0, 1.0, 0.5)
    for k in range(4): add(s0 + L[1] + k * F.BEAT, 'tick' if k % 2 == 0 else 'tock', 0.3, 0.55, 1.0, 0.35)
    for k in range(7): add(s0 + L[2] + 0.5 + k * 0.2, 'step3', 0.42, -0.2 + k * 0.15, 1.15, 0.3)
    add(s0 + L[2] + 0.5, 'murmur', 0.45, 0, 1.1, 0.5); add(s0 + L[2] + 2.0, 'slam', 0.6, 0.85, 1.0, 0.5)
    for k in range(4): add(s0 + L[3] + 0.1 + k * 0.35, 'step%d' % (1 + k % 2), 0.35, -0.5 + k * 0.15, 1.0, 0.35)
    add(s0 + L[4] + 0.2, 'page1', 0.4, 0, 1.0, 0.25); add(s0 + L[4] + 0.6, 'page2', 0.35, 0, 1.0, 0.25)
    add(s0 + L[4] + 1.2, 'tick', 0.3, 0.55, 1.0, 0.35); add(s0 + L[4] + 1.87, 'tock', 0.3, 0.55, 1.0, 0.35)
    add(s0 + L[5], 'pop', 0.4, 0, 1.0, 0.4); add(s0 + L[5] + 0.05, 'glitter', 0.35, 0, 1.0, 0.7)
    add(s0 + L[6], 'sweep', 0.35, 0, 1.0, 0.5); add(s0 + L[6] + 1.0, 'applause', 0.42, 0, 1.0, 0.6)
    add(s0 + L[7], 'creak', 0.45, 0.65, 1.0, 0.4); add(s0 + L[7] + 1.1, 'slam', 0.5, 0.65, 1.0, 0.5)
    add(s0 + L[8] + 0.1, 'lock', 0.65, 0.65, 1.0, 0.35)
    # ---- s20 / d20: no equations ----
    s0, L = at('s20')
    add(s0 + 0.2, 'page1', 0.4, -0.3, 1.0, 0.25); add(s0 + L[1], 'dull', 0.4, 0.4, 1.0, 0.3)
    add(s0 + L[2], 'pen', 0.45, -0.3, 0.9, 0.2); add(s0 + L[3], 'murmur', 0.35, 0.3, 0.95, 0.5); add(s0 + L[3] + 0.05, 'dull', 0.45, 0.3, 0.9, 0.3)
    # ---- s20b / d31: the letter ----
    s0, L = at('s20b')
    add(s0 + L[0] + 0.4, 'swish_long', 0.5, -0.3, 1.0, 0.3); add(s0 + L[0] + 2.6, 'page2', 0.35, 0.6, 1.0, 0.3)
    add(s0 + L[2] + 0.3, 'swish_long', 0.45, 0.3, 1.1, 0.3); add(s0 + L[2] + 2.3, 'page3', 0.35, -0.6, 1.0, 0.3)
    add(s0 + L[3], 'pen', 0.45, 0, 1.0, 0.2); add(s0 + L[4], 'pen', 0.4, 0, 1.05, 0.2)
    add(s0 + L[5], 'glitter', 0.45, -0.6, 1.0, 0.7); add(s0 + L[5] + 0.02, 'impact', 0.35, 0, 1.0, 0.5)
    for k in range(4): add(s0 + L[6] + 0.1 + k * 0.2, 'tick', 0.32, -0.3 + 0.2 * k, 1.0 + 0.05 * k, 0.3)
    add(s0 + L[7], 'glitter', 0.4, 0, 1.0, 0.7); add(s0 + L[7] + 0.02, 'clink_hi', 0.4, 0, 0.75, 0.6)
    # ---- s21 / d21: the equations, light as a wave ----
    s0, L = at('s21')
    add(s0 + L[1] + 0.6, 'chalk', 0.45, 0, 1.0, 0.2); add(s0 + L[1] + 1.4, 'chalk', 0.35, 0, 1.1, 0.2); add(s0 + L[1] + 0.7, 'glitter', 0.25, 0, 1.0, 0.7)
    add(s0 + L[2] + 0.4, 'sweep', 0.5, 0, 1.0, 0.5); add(s0 + L[2] + 0.5, 'hum', 0.25, 0, 1.0, 0.3); add(s0 + L[2] + 0.45, 'zap_small', 0.2, 0, 1.0, 0.4)
    add(s0 + L[3], 'swish', 0.35, 0, 1.4, 0.3)
    add(s0 + L[4], 'glitter', 0.5, 0, 1.0, 0.8); add(s0 + L[4] + 0.02, 'impact', 0.45, 0, 1.0, 0.5)
    add(s0 + L[5], 'clink_hi', 0.25, 0, 0.6, 0.7)
    # ---- s21b / d26: more achievements, card by card ----
    s0, L = at('s21b')
    for t, pan in ((L[1], -0.5), (L[2], 0), (L[3], 0.5), (L[5], -0.5), (L[7], 0), (L[7] + 0.5, 0.5)): add(s0 + t, 'page1', 0.4, pan, 1.1, 0.3)
    add(s0 + L[1] + 0.2, 'bubbles', 0.25, -0.5, 1.0, 0.3); add(s0 + L[3] + 0.2, 'zap_small', 0.35, 0.5, 1.0, 0.3)
    add(s0 + L[5] + 0.2, 'clunk', 0.3, -0.5, 1.0, 0.3); add(s0 + L[6], 'swish', 0.3, -0.4, 1.2, 0.3)
    add(s0 + L[7] + 0.2, 'sweep', 0.22, 0, 0.9, 0.5); add(s0 + L[7] + 0.6, 'waves', 0.22, 0.5, 1.0, 0.3)
    # ---- s22 / d22: a candle for children ----
    s0, L = at('s22')
    add(s0 + 0.25, 'match', 0.45, 0, 1.0, 0.3)
    for k in range(5): add(s0 + 0.5 + k * 2.6, 'flame', 0.3, 0, 1.0, 0.25)
    add(s0 + L[0], 'murmur', 0.35, 0, 1.35, 0.5); add(s0 + L[1], 'jingle', 0.35, 0.4, 1.0, 0.6)
    add(s0 + L[3], 'whoomp', 0.35, 0, 1.0, 0.4)
    for i in range(3): add(s0 + L[4] + i * 0.35, 'pop', 0.35, [0.4, 0.45, -0.4][i], 1.0 + 0.1 * i, 0.4)
    add(s0 + L[5], 'applause', 0.45, 0, 1.08, 0.6); add(s0 + L[5] + 0.3, 'murmur', 0.3, 0, 1.35, 0.5)
    # ---- s23 / d23: plain Mr Faraday ----
    s0, L = at('s23')
    add(s0 + L[0], 'knock', 0.35, -0.5, 1.0, 0.3); add(s0 + L[0] + 0.6, 'stamp', 0.6, -0.5, 1.0, 0.35); add(s0 + L[0] + 0.8, 'stamp', 0.45, -0.4, 1.1, 0.35)
    add(s0 + L[1], 'clink_hi', 0.4, 0, 0.8, 0.5); add(s0 + L[1] + 0.5, 'stamp', 0.6, 0, 1.0, 0.35)
    add(s0 + L[2], 'glitter', 0.3, 0, 1.0, 0.7); add(s0 + L[3], 'dull', 0.4, 0.5, 1.0, 0.3)
    add(s0 + L[4], 'bubbles', 0.3, 0.5, 0.8, 0.3); add(s0 + L[4] + 0.2, 'hiss', 0.22, 0.5, 1.0, 0.3)
    add(s0 + L[5], 'stamp', 0.75, 0.5, 0.95, 0.35)
    # ---- s24 / d24: farewell ----
    s0, L = at('s24')
    add(s0 + L[0], 'toll', 0.5, 0, 1.0, 0.6); add(s0 + L[1] + 0.5, 'toll', 0.35, 0, 1.0, 0.6)
    add(s0 + L[2] + 0.6, 'dull', 0.3, -0.5, 1.0, 0.3)
    add(s0 + L[3], 'book_close', 0.4, 0.3, 0.6, 0.4); add(s0 + L[3] + 0.2, 'waves', 0.22, 0, 0.7, 0.4)
    add(s0 + L[4], 'glitter', 0.25, 0.3, 0.9, 0.8)
    # ---- s25 / d25: the farad, the portraits, back to the beginning ----
    s0, L = at('s25')
    add(s0 + L[0], 'stamp', 0.5, 0, 1.0, 0.35)
    for t, pan in ((L[2], -0.45), (L[2] + 0.8, 0), (L[3], 0.45)): add(s0 + t, 'knock', 0.45, pan, 1.0, 0.35)
    add(s0 + L[4] + 0.6, 'swish', 0.4, 0.5, 0.7, 0.2); add(s0 + L[4] + 1.0, 'needle', 0.55, -0.4, 1.0, 0.3)
    add(s0 + L[5], 'power_on', 0.55, 0, 1.0, 0.4)
    # ---- next / d27: a spotlight on the next story ----
    s0, L = at('next')
    add(s0 + 0.2, 'switch', 0.6, 0, 0.6, 0.4); add(s0 + 0.3, 'hum', 0.2, 0, 1.0, 0.4)
    add(s0 + L[1], 'impact', 0.5, 0, 1.0, 0.5); add(s0 + L[1] + 0.1, 'glitter', 0.3, 0, 1.0, 0.8)
    return c
