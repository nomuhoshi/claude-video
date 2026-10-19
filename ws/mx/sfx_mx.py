# Sound cues for the Maxwell video. Each cue is anchored to the same line times the pictures use.
import script_mx as F
HITS = {}

def S(t, name, gain=1.0, pan=0.0, rate=1.0, wet=0.25, dry=1.0):
    return [round(t, 3), 'smp', [name, round(gain, 3), round(pan, 3), rate, wet, dry]]

def cues():
    c = []
    def at(key):
        return F.TL[F.IDX[key]]['s'], F.TL[F.IDX[key]]['ls']
    def add(t, *a, **k): c.append(S(t, *a, **k))
    B = F.BEAT
    for i, sc in enumerate(F.SC):
        if sc['k'] == 'chap': add(F.TL[i]['s'], 'impact', 0.42, 0, 1.0, 0.5)
    # ---- hero: a wave reaches a phone, a pen writes, 1865 → 1887 ----
    s0, L = at('hero')
    add(s0 + L[0], 'power_on', 0.4, -0.6, 1.0, 0.4); add(s0 + L[0] + 0.3, 'hum', 0.2, -0.5, 1.2, 0.3)
    add(s0 + L[1], 'sweep', 0.4, 0.2, 1.0, 0.5); add(s0 + L[1] + 1.0, 'pop', 0.35, 0.6, 1.2, 0.4)
    add(s0 + L[2], 'swish', 0.3, 0, 0.8, 0.4)
    add(s0 + L[3] + 0.2, 'pen', 0.5, 0.2, 1.0, 0.2)
    add(s0 + L[4], 'tick', 0.35, -0.5, 1.0, 0.3); add(s0 + L[4] + 0.2, 'sweep', 0.35, 0, 1.1, 0.4); add(s0 + L[4] + 1.4, 'zap_small', 0.4, 0.6, 1.0, 0.4); add(s0 + L[4] + 1.6, 'glitter', 0.3, 0, 1.0, 0.7)
    # ---- s1: 1831, Faraday's needle, Glenlair, a boy asking ----
    s0, L = at('s1')
    add(s0 + L[0], 'impact', 0.35, 0, 1.2, 0.5)
    add(s0 + L[1] + 0.4, 'swish', 0.35, 0.6, 0.7, 0.2); add(s0 + L[1] + 1.0, 'needle', 0.5, 0.5, 1.0, 0.3)
    add(s0 + L[2], 'wind', 0.35, 0, 1.0, 0.4); add(s0 + L[2] + 0.4, 'bird', 0.35, -0.5, 1.0, 0.4); add(s0 + L[2] + 2.0, 'bird2', 0.3, 0.5, 1.1, 0.4)
    for k in range(5): add(s0 + L[3] + 0.1 + k * 0.45, 'step%d' % (1 + k % 2), 0.25, -0.1 + k * 0.12, 1.3, 0.3)
    add(s0 + L[3], 'bell_small', 0.3, 0, 1.0, 0.5); add(s0 + L[3] + 0.7, 'tick', 0.35, 0.3, 1.0, 0.3); add(s0 + L[3] + 1.4, 'pop', 0.3, 0.6, 1.3, 0.4)
    add(s0 + L[4], 'glitter', 0.35, 0.3, 1.0, 0.7)
    # ---- s2: the mother, the school, the nickname, the blackboard ----
    s0, L = at('s2')
    add(s0 + L[0] + 0.8, 'toll', 0.3, 0, 1.4, 0.7)
    add(s0 + L[1], 'bell_small', 0.35, -0.4, 0.8, 0.5); add(s0 + L[1] + 0.2, 'murmur', 0.35, 0.2, 1.35, 0.5)
    add(s0 + L[3], 'murmur', 0.45, 0.6, 1.45, 0.5); add(s0 + L[3] + 0.1, 'dull', 0.4, 0, 1.0, 0.3)
    add(s0 + L[4], 'chalk', 0.5, 0.3, 1.0, 0.2); add(s0 + L[4] + 0.6, 'glitter', 0.3, 0.3, 1.0, 0.7)
    # ---- s3: pins and string, the Royal Society ----
    s0, L = at('s3')
    add(s0 + L[1] - 0.1, 'knock_hi', 0.4, -0.2, 1.3, 0.2); add(s0 + L[1] + 0.1, 'knock_hi', 0.4, 0.2, 1.4, 0.2)
    add(s0 + L[1] + 0.2, 'pen', 0.4, 0, 0.8, 0.2); add(s0 + L[2] + 0.2, 'thread', 0.4, 0.2, 0.9, 0.2); add(s0 + L[2] + 0.3, 'pen', 0.4, 0.1, 0.85, 0.2)
    add(s0 + L[3], 'glitter', 0.3, 0, 1.0, 0.6)
    add(s0 + L[4], 'murmur', 0.4, 0, 1.0, 0.6); add(s0 + L[4] + 0.6, 'page2', 0.4, 0, 1.0, 0.4)
    add(s0 + L[5], 'applause', 0.35, 0, 1.0, 0.6)
    # ---- s4: Cambridge, the exam, the eye, the colour top ----
    s0, L = at('s4')
    add(s0 + L[0], 'toll', 0.25, -0.3, 1.6, 0.7)
    add(s0 + L[1] + 0.5, 'stamp', 0.45, 0.4, 1.0, 0.3)
    add(s0 + L[2], 'sweep', 0.35, -0.4, 1.0, 0.5)
    add(s0 + L[3], 'clunk', 0.35, 0, 1.5, 0.3)
    for k in range(3): add(s0 + L[4] + k * 0.3, 'pop', 0.3, 0.5, 1.0 + 0.12 * k, 0.4)
    add(s0 + L[5], 'whir', 0.45, 0, 1.4, 0.3); add(s0 + L[5] + 1.0, 'glitter', 0.3, 0.4, 1.0, 0.7)
    # ---- s5: the colour photograph ----
    s0, L = at('s5')
    add(s0 + L[1] + 1.0, 'shutter', 0.6, 0.1, 1.0, 0.3); add(s0 + L[1] + 1.0, 'whoomp', 0.25, 0.1, 1.5, 0.4)
    add(s0 + L[2], 'swish', 0.35, 0, 1.2, 0.3)
    for k in range(3): add(s0 + L[3] + k * 0.45, 'shutter', 0.5, -0.5 + 0.5 * k, 1.0 + 0.05 * k, 0.3)
    add(s0 + L[4], 'whir', 0.35, 0, 1.6, 0.4); add(s0 + L[4] + 0.6, 'glitter', 0.4, 0, 1.0, 0.7)
    add(s0 + L[5], 'key', 0.35, -0.4, 1.0, 0.3); add(s0 + L[5] + 0.4, 'sweep', 0.3, 0.3, 1.3, 0.5)
    # ---- s6: Saturn's rings ----
    s0, L = at('s6')
    add(s0 + L[0], 'stamp', 0.35, 0, 1.1, 0.3); add(s0 + L[1], 'pop', 0.3, 0.5, 0.9, 0.4)
    add(s0 + L[2] + 0.8, 'whir', 0.3, 0, 0.6, 0.4); add(s0 + L[2] + 3.0, 'explosion', 0.4, -0.3, 1.4, 0.5)
    add(s0 + L[3] + 0.4, 'pour', 0.35, 0, 0.7, 0.4); add(s0 + L[3] + 1.8, 'crack', 0.35, 0, 1.4, 0.4)
    add(s0 + L[4], 'sprinkle', 0.45, 0, 1.0, 0.4); add(s0 + L[4] + 0.2, 'glitter', 0.35, 0, 1.0, 0.7)
    add(s0 + L[6], 'sweep', 0.35, -0.6, 0.8, 0.5)
    # ---- s7: Aberdeen, Katherine, the merger, London ----
    s0, L = at('s7')
    add(s0 + L[0], 'chalk', 0.4, -0.5, 1.0, 0.2)
    add(s0 + L[1], 'bell_small', 0.4, 0.2, 1.0, 0.6); add(s0 + L[1] + 0.2, 'bell_small', 0.3, 0.3, 1.26, 0.6)
    add(s0 + L[2] + 0.2, 'swish', 0.35, 0.6, 0.8, 0.3); add(s0 + L[2] + 1.0, 'stamp', 0.55, 0, 0.9, 0.3); add(s0 + L[2] + 1.05, 'dull', 0.35, 0, 1.0, 0.3)
    add(s0 + L[3], 'toll', 0.35, -0.6, 1.0, 0.6)
    for k in range(5): add(s0 + L[3] + 0.2 + k * 0.45, 'step%d' % (1 + k % 2), 0.28, -0.3 + k * 0.1, 1.0, 0.3)
    # ---- s8: the letter, the meeting, the friendship ----
    s0, L = at('s8')
    add(s0 + L[0] + 0.3, 'page1', 0.4, -0.3, 1.0, 0.3); add(s0 + L[0] + 1.0, 'pen', 0.4, -0.3, 1.0, 0.2)
    add(s0 + L[1], 'swish_long', 0.45, 0, 1.0, 0.3); add(s0 + L[1] + 1.6, 'page3', 0.35, 0.6, 1.0, 0.3)
    add(s0 + L[2] + 0.2, 'swish', 0.4, 0, 1.1, 0.3); add(s0 + L[2] + 1.6, 'page2', 0.3, -0.5, 1.0, 0.3)
    for k in range(3): add(s0 + L[3] + 0.1 + k * 0.45, 'step%d' % (1 + k % 2), 0.28, -0.2, 1.0, 0.3); add(s0 + L[3] + 0.3 + k * 0.45, 'step%d' % (2 - k % 2), 0.28, 0.2, 0.95, 0.3)
    add(s0 + L[3] + 1.4, 'glitter', 0.3, 0, 1.0, 0.6)
    add(s0 + L[4], 'pop', 0.3, -0.5, 1.0, 0.4); add(s0 + L[4] + 0.3, 'pop', 0.3, 0.5, 1.2, 0.4)
    add(s0 + L[5], 'impact', 0.35, 0, 1.2, 0.5); add(s0 + L[5] + 0.05, 'glitter', 0.4, 0, 1.0, 0.7)
    # ---- s9: vortices and idle wheels ----
    s0, L = at('s9')
    add(s0 + L[1], 'whir', 0.3, 0, 1.2, 0.4)
    add(s0 + L[2], 'sprinkle', 0.3, 0, 1.4, 0.3)
    add(s0 + L[3], 'clunk', 0.35, 0.3, 1.4, 0.3); add(s0 + L[3] + 0.1, 'whir', 0.45, 0.2, 1.0, 0.3)
    add(s0 + L[4], 'hum', 0.3, 0, 1.0, 0.4); add(s0 + L[4] + 0.1, 'whir', 0.35, -0.2, 0.9, 0.3)
    add(s0 + L[5], 'pop', 0.35, 0, 1.0, 0.4); add(s0 + L[5] + 0.1, 'glitter', 0.35, 0, 1.0, 0.7)
    # ---- s10: the capacitor's gap ----
    s0, L = at('s10')
    add(s0 + 0.4, 'switch', 0.5, -0.6, 1.0, 0.3); add(s0 + 0.5, 'hum', 0.25, -0.3, 1.0, 0.3)
    add(s0 + L[1], 'pop', 0.3, 0, 0.8, 0.4); add(s0 + L[2], 'dull', 0.45, 0, 1.0, 0.3)
    add(s0 + L[4] - 0.3, 'zap_small', 0.3, 0, 1.0, 0.4); add(s0 + L[4], 'sweep', 0.35, 0, 0.9, 0.5)
    add(s0 + L[5], 'impact', 0.35, 0, 1.2, 0.5); add(s0 + L[5] + 0.05, 'glitter', 0.4, 0, 1.0, 0.7)
    # ---- s11: two halves, a chain, a wave ----
    s0, L = at('s11')
    add(s0 + L[1], 'ripple', 0.4, -0.5, 1.0, 0.5); add(s0 + L[1] + 0.3, 'hum', 0.25, -0.5, 1.0, 0.4)
    add(s0 + L[2], 'ripple', 0.4, 0.5, 1.2, 0.5); add(s0 + L[2] + 0.3, 'hum', 0.25, 0.5, 1.1, 0.4)
    for k in range(9): add(s0 + L[3] + k * 0.28, 'clink_hi', 0.2, -0.8 + 0.2 * k, 0.8 + 0.06 * k, 0.6)
    add(s0 + L[4], 'swish_long', 0.4, 0.4, 0.9, 0.4)
    add(s0 + L[5] - 0.3, 'sweep', 0.45, 0, 1.0, 0.5); add(s0 + L[5], 'impact', 0.4, 0, 1.0, 0.5)
    # ---- s12: how fast ----
    s0, L = at('s12')
    add(s0 + L[0], 'swish', 0.35, 0, 1.2, 0.3)
    add(s0 + L[1], 'chalk', 0.4, 0, 1.0, 0.2)
    for k in range(8): add(s0 + L[2] + k * 0.2, 'tick', 0.25, -0.2, 1.0 + 0.04 * k, 0.2)
    add(s0 + L[2] + 1.6, 'bell_small', 0.35, -0.2, 1.0, 0.5)
    for k in range(8): add(s0 + L[3] + k * 0.2, 'tock', 0.25, 0.2, 1.0 + 0.04 * k, 0.2)
    add(s0 + L[3] + 1.6, 'bell_small', 0.35, 0.2, 1.06, 0.5)
    add(s0 + L[4], 'glitter', 0.4, 0, 1.0, 0.7)
    add(s0 + L[5], 'pen', 0.45, -0.3, 1.0, 0.2)
    add(s0 + L[6], 'impact', 0.55, 0, 1.0, 0.5); add(s0 + L[6] + 0.1, 'sweep', 0.4, 0, 1.2, 0.6)
    # ---- s13: 1865, twenty become four ----
    s0, L = at('s13')
    add(s0 + L[0], 'book_close', 0.5, 0, 1.0, 0.3); add(s0 + L[0] + 0.3, 'page1', 0.35, 0, 1.0, 0.3)
    for k in range(10): add(s0 + L[1] + k * 0.1, 'key', 0.22, -0.4 + 0.1 * k, 1.0 + 0.03 * k, 0.2)
    add(s0 + L[2], 'swish_long', 0.4, 0.3, 1.2, 0.4); add(s0 + L[2] + 0.5, 'glitter', 0.35, 0.3, 1.0, 0.7)
    for k in range(4): add(s0 + L[3] + k * 0.3, 'page3', 0.3, -0.6 + 0.4 * k, 1.1, 0.3)
    # ---- s14-s17: the four equations ----
    s0, L = at('s14')
    add(s0 + L[0], 'pop', 0.35, 0, 1.0, 0.4); add(s0 + L[0] + 0.8, 'ripple', 0.35, 0, 1.0, 0.5)
    add(s0 + L[1], 'zap_small', 0.3, 0, 1.2, 0.4); add(s0 + L[1] + 0.1, 'glitter', 0.3, 0, 1.0, 0.7)
    s0, L = at('s15')
    add(s0 + L[0], 'pop', 0.35, 0, 1.0, 0.4); add(s0 + L[0] + 0.3, 'whir', 0.3, 0, 0.8, 0.4)
    add(s0 + L[2], 'crack', 0.45, 0, 1.6, 0.3); add(s0 + L[2] + 0.02, 'clunk', 0.4, 0, 1.2, 0.3)
    s0, L = at('s16')
    add(s0 + L[0], 'pop', 0.35, 0, 1.0, 0.4); add(s0 + L[0] + 0.3, 'hum', 0.3, 0, 1.0, 0.4); add(s0 + L[0] + 2.8, 'hum', 0.25, 0, 1.0, 0.4)
    add(s0 + L[1], 'switch', 0.4, 0, 1.0, 0.3); add(s0 + L[1] + 0.05, 'zap_small', 0.35, 0, 1.0, 0.4)
    s0, L = at('s17')
    add(s0 + L[0], 'pop', 0.35, 0, 1.0, 0.4); add(s0 + L[0] + 0.2, 'hum', 0.25, -0.5, 1.0, 0.4)
    add(s0 + L[1], 'sweep', 0.35, 0.5, 1.0, 0.5)
    add(s0 + L[2], 'impact', 0.35, 0, 1.2, 0.5); add(s0 + L[2] + 0.05, 'glitter', 0.4, 0.4, 1.0, 0.7)
    # ---- s18: the spectrum ----
    s0, L = at('s18')
    add(s0 + L[1] - 0.2, 'sweep', 0.45, 0, 0.8, 0.5); add(s0 + L[1] + 0.6, 'glitter', 0.35, 0.1, 1.0, 0.7)
    for k in range(3): add(s0 + L[2] + k * 0.4, 'pop', 0.3, -0.8 + 0.3 * k, 0.8 + 0.1 * k, 0.4)
    for k in range(3): add(s0 + L[3] + k * 0.4, 'pop', 0.3, 0.2 + 0.3 * k, 1.2 + 0.15 * k, 0.4)
    # ---- s19: a bottle of air ----
    s0, L = at('s19')
    add(s0 + 0.3, 'sprinkle', 0.3, -0.4, 1.6, 0.3); add(s0 + 2.0, 'sprinkle', 0.25, -0.4, 1.8, 0.3)
    add(s0 + L[1], 'swish', 0.3, -0.4, 1.4, 0.3)
    for k in range(10): add(s0 + L[2] + k * 0.22, 'key', 0.22, 0.4, 0.9 + 0.04 * k, 0.2)
    add(s0 + L[2] + 2.3, 'sweep', 0.3, 0.4, 1.0, 0.5)
    add(s0 + L[3], 'glitter', 0.35, 0.4, 1.0, 0.7)
    # ---- s20: the demon ----
    s0, L = at('s20')
    add(s0 + L[0], 'pop', 0.4, 0, 0.8, 0.4); add(s0 + L[0] + 0.1, 'jingle', 0.2, 0, 1.2, 0.5)
    t = L[2] + 0.3
    for k in range(14): add(s0 + t + k * 0.55 + 0.05, 'clink_hi' if k % 2 == 0 else 'knock_hi', 0.25, 0, 1.2 if k % 2 == 0 else 1.6, 0.3)
    add(s0 + L[3], 'whoomp', 0.25, 0.5, 1.2, 0.4); add(s0 + L[3] + 0.3, 'wind', 0.2, -0.5, 1.4, 0.4)
    add(s0 + L[4], 'dull', 0.45, 0, 1.0, 0.3)
    add(s0 + L[5], 'impact', 0.35, 0, 1.3, 0.5); add(s0 + L[5] + 0.05, 'glitter', 0.3, 0, 0.9, 0.7)
    # ---- s21: Glenlair, the Treatise, the laboratory ----
    s0, L = at('s21')
    add(s0 + 0.3, 'bird', 0.3, -0.6, 1.0, 0.4); add(s0 + 0.6, 'pen', 0.35, -0.2, 1.0, 0.2)
    add(s0 + L[1] + 0.35, 'book_close', 0.7, 0.2, 0.8, 0.3)
    for k in range(10): add(s0 + L[2] + 0.1 + k * 0.28, 'knock' if k % 2 else 'knock_hi', 0.3, -0.4 + 0.08 * k, 0.9 + 0.03 * k, 0.4)
    add(s0 + L[3], 'toll', 0.3, 0, 1.3, 0.6); add(s0 + L[3] + 0.1, 'glitter', 0.3, 0, 1.0, 0.7)
    for k in range(10): add(s0 + L[4] + k * 0.12, 'clink_hi', 0.18, -0.8 + 0.16 * k, 1.0 + 0.04 * k, 0.5)
    # ---- s22: 1879 ----
    s0, L = at('s22')
    add(s0 + 0.3, 'flame', 0.3, -0.4, 1.0, 0.3)
    add(s0 + L[1], 'toll', 0.35, 0, 1.0, 0.7)
    add(s0 + L[2] + 0.4, 'whoomp', 0.2, -0.4, 0.6, 0.6); add(s0 + L[2] + 1.0, 'glitter', 0.25, 0, 0.8, 0.8)
    add(s0 + L[3], 'bell_small', 0.35, 0.5, 1.0, 0.7); add(s0 + L[3] + 0.3, 'glitter', 0.3, 0.5, 1.1, 0.8)
    # ---- s23: Hertz ----
    s0, L = at('s23')
    for k in range(10): add(s0 + L[1] + 0.05 + k * 0.9, 'zap_small', 0.3 - 0.015 * k, -0.7, 1.0 + 0.05 * (k % 3), 0.3)
    add(s0 + L[1] + 0.2, 'hum', 0.2, -0.6, 1.0, 0.4)
    for k in range(6): add(s0 + L[2] + 0.4 + k * 0.9, 'clink_hi', 0.22, 0.7, 1.6, 0.4)
    add(s0 + L[3], 'ripple', 0.35, 0.8, 0.9, 0.5); add(s0 + L[3] + 0.4, 'sweep', 0.3, 0, 1.2, 0.5)
    add(s0 + L[4], 'pop', 0.35, 0.4, 0.9, 0.4); add(s0 + L[5], 'pop', 0.35, -0.3, 1.2, 0.4)
    # ---- s24: radio, everything since, Einstein ----
    s0, L = at('s24')
    add(s0 + 0.2, 'waves', 0.3, 0, 1.0, 0.4)
    for k, d in enumerate([0, 0.18, 0.5, 0.68, 0.86, 1.2, 1.38, 1.56]): add(s0 + L[0] + 0.3 + d, 'beep_long' if k in (1, 5, 6) else 'beep', 0.25, 0.3, 1.0, 0.3)
    for k in range(5): add(s0 + L[1] + k * 0.35, 'pop', 0.3, -0.7 + 0.35 * k, 0.9 + 0.08 * k, 0.4)
    add(s0 + L[2], 'sweep', 0.4, 0, 0.9, 0.5); add(s0 + L[2] + 0.3, 'glitter', 0.35, 0, 1.0, 0.7)
    add(s0 + L[4], 'impact', 0.35, 0, 1.2, 0.5)
    # ---- s25: Feynman ----
    s0, L = at('s25')
    add(s0 + L[0], 'swish_long', 0.4, 0.4, 0.6, 0.6); add(s0 + L[0] + 1.6, 'swish_long', 0.3, 0.6, 0.5, 0.6)
    add(s0 + L[2], 'glitter', 0.4, 0, 1.0, 0.8)
    return c
