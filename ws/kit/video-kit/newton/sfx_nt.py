# Sound cues for the Newton video. Each cue is anchored to the same line times the pictures use.
import script_nt as F
HITS = {}

def S(t, name, gain=1.0, pan=0.0, rate=1.0, wet=0.25, dry=1.0):
    return [round(t, 3), 'smp', [name, round(gain, 3), round(pan, 3), rate, wet, dry]]

def cues():
    c = []
    def at(key): return F.TL[F.IDX[key]]['s'], F.TL[F.IDX[key]]['ls']
    def add(t, *a, **k): c.append(S(t, *a, **k))
    for i, sc in enumerate(F.SC):
        if sc['k'] == 'chap': add(F.TL[i]['s'], 'impact', 0.42, 0, 1.0, 0.5)
    # hero: a cup, a guttering candle, a line of years, the planets
    s0, L = at('hero')
    add(s0 + 0.4, 'clink_hi', 0.4, 0, 0.8, 0.5); add(s0 + 1.0, 'glitter', 0.3, 0, 1.0, 0.6)
    add(s0 + L[1], 'match', 0.35, 0.5, 1.0, 0.4); add(s0 + L[1] + 1.2, 'wind', 0.25, 0.4, 1.2, 0.5)
    add(s0 + L[2], 'sweep', 0.4, -0.3, 1.0, 0.4); add(s0 + L[2] + 1.5, 'tick', 0.35, 0.4, 1.0, 0.3)
    add(s0 + L[3], 'whoomp', 0.35, 0, 1.0, 0.5); add(s0 + L[3] + 0.4, 'glitter', 0.35, 0, 0.9, 0.7)
    add(s0 + L[4], 'impact', 0.3, 0.4, 1.3, 0.5)
    # s1: snow, the farmhouse, a mother walking away
    s0, L = at('s1')
    add(s0 + L[0], 'wind', 0.35, 0, 0.9, 0.5); add(s0 + L[0] + 0.3, 'toll', 0.25, -0.3, 1.2, 0.7)
    add(s0 + L[1] + 0.3, 'creak', 0.3, -0.4, 1.0, 0.3)
    add(s0 + L[2] + 0.6, 'toll', 0.2, 0.3, 1.5, 0.8)
    for k in range(6): add(s0 + L[4] + k * 0.42, 'step%d' % (1 + k % 2), 0.22, 0.1 + k * 0.1, 1.2, 0.3)
    add(s0 + L[5], 'bell_small', 0.25, -0.4, 0.8, 0.5)
    # s2: town, models, sheep, persuasion
    s0, L = at('s2')
    add(s0 + L[0], 'bell_small', 0.3, 0, 1.0, 0.5); add(s0 + L[1] + 0.3, 'clink_hi', 0.3, 0.4, 1.3, 0.3)
    add(s0 + L[3], 'whir', 0.35, -0.5, 1.0, 0.3); add(s0 + L[3] + 1.0, 'tock', 0.3, 0, 1.0, 0.3); add(s0 + L[3] + 1.6, 'pour', 0.25, 0, 1.4, 0.3)
    add(s0 + L[4], 'wind', 0.3, 0.5, 1.1, 0.5); add(s0 + L[4] + 0.4, 'match', 0.3, 0.5, 1.0, 0.4)
    add(s0 + L[5], 'bird', 0.3, -0.3, 1.0, 0.4); add(s0 + L[6], 'page1', 0.35, -0.3, 1.0, 0.3); add(s0 + L[6] + 0.8, 'bird2', 0.25, 0.5, 1.0, 0.4)
    add(s0 + L[7] + 0.8, 'swish', 0.3, 0.3, 1.0, 0.3); add(s0 + L[7] + 1.0, 'glitter', 0.3, 0.4, 1.0, 0.6)
    # s3: the gate, chores, the notebook
    s0, L = at('s3')
    add(s0 + L[0], 'toll', 0.3, 0, 1.3, 0.7); add(s0 + L[1], 'stamp', 0.35, -0.4, 1.0, 0.3)
    for k in range(4): add(s0 + L[2] + 0.2 + k * 0.42, 'step%d' % (1 + k % 2), 0.22, -0.4 + k * 0.2, 1.2, 0.3)
    add(s0 + L[3], 'book_close', 0.35, -0.4, 0.9, 0.3); add(s0 + L[4], 'page2', 0.35, 0.4, 1.0, 0.3)
    for k in range(3): add(s0 + L[5] + 0.4 + k * 0.55, 'pen', 0.35, 0.4, 1.0 + 0.05 * k, 0.2)
    # s4: the fair, the star chart, Euclid tossed, the exam, Euclid again
    s0, L = at('s4')
    add(s0 + L[0], 'murmur', 0.35, 0, 1.2, 0.5); add(s0 + L[1], 'page3', 0.35, 0.3, 1.0, 0.3)
    add(s0 + L[2] + 0.3, 'pop', 0.3, 0.4, 0.8, 0.3)
    add(s0 + L[3], 'book', 0.4, -0.3, 1.0, 0.3); add(s0 + L[4], 'page1', 0.3, -0.3, 1.2, 0.3)
    add(s0 + L[5] + 0.4, 'swish', 0.4, -0.5, 1.0, 0.3); add(s0 + L[5] + 1.2, 'book2', 0.45, -0.6, 1.0, 0.3)
    add(s0 + L[6], 'pen', 0.35, 0.4, 1.0, 0.2)
    add(s0 + L[7], 'bell_small', 0.3, 0, 1.0, 0.5); add(s0 + L[8] + 1.2, 'dull', 0.45, 0.3, 1.0, 0.3)
    for k in range(10): add(s0 + L[9] + 0.5 + k * 0.26, 'page%d' % (1 + k % 3), 0.16, 0, 1.1, 0.3)
    add(s0 + L[10], 'glitter', 0.35, 0, 1.0, 0.6)
    # s5: the plague, the closed university, the long stay
    s0, L = at('s5')
    add(s0 + L[0], 'toll', 0.4, 0, 0.9, 0.8); add(s0 + L[0] + 2.0, 'toll', 0.3, 0, 0.9, 0.8)
    add(s0 + L[1] + 0.4, 'slam', 0.45, 0, 1.0, 0.4); add(s0 + L[1] + 0.6, 'lock', 0.4, 0.2, 1.0, 0.3)
    add(s0 + L[2], 'wind', 0.3, 0, 1.0, 0.5); add(s0 + L[3], 'tock', 0.2, 0.3, 0.9, 0.5)
    add(s0 + L[5], 'glitter', 0.4, 0, 1.0, 0.7)
    # s6: a falling stone, the secant shrinking
    s0, L = at('s6')
    add(s0 + L[1], 'tick', 0.3, 0, 1.0, 0.3); add(s0 + L[2], 'pen', 0.35, 0, 1.0, 0.2)
    for k in range(5): add(s0 + L[3] + k * 0.5, 'tick', 0.22, -0.2 + 0.1 * k, 1.0 + 0.15 * k, 0.3)
    add(s0 + L[5], 'beep', 0.35, 0, 1.0, 0.4); add(s0 + L[6], 'glitter', 0.35, 0, 1.0, 0.6)
    # s7: the apple
    s0, L = at('s7')
    add(s0 + L[0], 'bird', 0.3, -0.4, 1.0, 0.4); add(s0 + L[1], 'clink_hi', 0.25, 0.4, 1.4, 0.3)
    add(s0 + L[2] + 0.5, 'swish', 0.3, -0.2, 1.4, 0.2); add(s0 + L[2] + 0.5 + 0.4, 'dull', 0.55, -0.2, 1.3, 0.2)
    add(s0 + L[3] + 0.3, 'sweep', 0.3, 0, 0.8, 0.4)
    add(s0 + L[5] + 0.6, 'knock', 0.35, 0.5, 1.2, 0.3)
    add(s0 + L[7], 'sweep', 0.4, -0.2, 1.1, 0.5); add(s0 + L[7] + 1.6, 'glitter', 0.4, 0.5, 1.0, 0.7)
    # s8: light
    s0, L = at('s8')
    add(s0 + L[1], 'glass', 0.35, 0, 1.0, 0.5)
    add(s0 + L[2], 'creak', 0.3, -0.6, 1.2, 0.3); add(s0 + L[3], 'sweep', 0.35, -0.3, 1.2, 0.5)
    add(s0 + L[4], 'glitter', 0.45, 0.4, 1.0, 0.7)
    add(s0 + L[5] + 0.5, 'clunk', 0.3, 0, 1.4, 0.3); add(s0 + L[6], 'glass', 0.3, 0.3, 1.2, 0.5)
    add(s0 + L[7], 'bell_small', 0.3, 0.5, 1.2, 0.5)
    add(s0 + L[9] - 0.2, 'whoomp', 0.35, 0, 1.0, 0.5); add(s0 + L[9] + 0.8, 'glitter', 0.4, 0, 0.9, 0.7)
    # s9: the telescope
    s0, L = at('s9')
    add(s0 + L[0] + 1.0, 'glitter', 0.3, 0.5, 1.2, 0.6)
    add(s0 + L[2] + 0.4, 'sweep', 0.35, 0.4, 1.0, 0.5)
    add(s0 + L[3], 'brush', 0.4, 0, 1.0, 0.3); add(s0 + L[3] + 0.8, 'clink_cu', 0.3, 0, 1.0, 0.3)
    add(s0 + L[5], 'murmur', 0.35, 0.5, 1.2, 0.5); add(s0 + L[6], 'applause', 0.35, 0.4, 1.0, 0.6)
    # s10: Halley
    s0, L = at('s10')
    for k in range(4): add(s0 + 0.2 + k * 0.42, 'step%d' % (1 + k % 2), 0.25, -0.5, 1.2, 0.3)
    add(s0 + 1.9, 'knock', 0.4, 0.3, 1.0, 0.3)
    add(s0 + L[4], 'impact', 0.3, 0.4, 1.4, 0.4); add(s0 + L[4] + 0.3, 'glitter', 0.35, 0, 1.0, 0.6)
    add(s0 + L[6], 'bell_small', 0.35, 0.5, 1.0, 0.5)
    add(s0 + L[7], 'page1', 0.35, 0, 1.0, 0.3); add(s0 + L[7] + 0.4, 'page2', 0.35, 0.2, 1.1, 0.3); add(s0 + L[7] + 0.8, 'page3', 0.35, -0.2, 0.9, 0.3)
    # s11: writing, the books, Halley pays
    s0, L = at('s11')
    for k in range(6): add(s0 + L[1] + k * 0.5, 'pen', 0.25, 0, 1.0 + 0.04 * k, 0.2)
    for k in range(3): add(s0 + L[2] + k * 0.25, 'book', 0.4, -0.3 + 0.3 * k, 1.0, 0.3)
    add(s0 + L[3] + 0.3, 'jingle', 0.4, 0.5, 1.0, 0.3)
    for k in range(3): add(s0 + L[4] + 0.4 + k * 0.35, 'stamp', 0.3, -0.3 + 0.3 * k, 1.1, 0.3)
    # s12-s14: three laws
    s0, L = at('s12')
    add(s0 + L[1], 'pop', 0.3, -0.3, 0.9, 0.4); add(s0 + L[2], 'swish_long', 0.35, 0, 1.0, 0.4)
    add(s0 + L[3] + 0.3, 'slither', 0.4, -0.3, 1.0, 0.3); add(s0 + L[4], 'wind', 0.3, 0.4, 1.2, 0.4)
    s0, L = at('s13')
    add(s0 + 0.8, 'knock', 0.3, -0.4, 1.0, 0.2); add(s0 + 0.85, 'punch', 0.4, -0.4, 1.0, 0.2)
    add(s0 + L[2] + 0.4, 'punch', 0.4, -0.4, 0.9, 0.2); add(s0 + L[3], 'impact', 0.35, 0, 1.2, 0.5); add(s0 + L[3] + 0.2, 'glitter', 0.35, 0, 1.0, 0.6)
    s0, L = at('s14')
    add(s0 + 0.8, 'punch', 0.45, 0, 1.0, 0.3); add(s0 + 1.0, 'slither', 0.35, -0.4, 1.0, 0.3); add(s0 + 1.0, 'slither', 0.35, 0.4, 1.1, 0.3)
    add(s0 + L[2] + 0.1, 'hiss', 0.5, 0, 0.8, 0.4); add(s0 + L[2] + 0.2, 'turbine', 0.4, 0, 1.0, 0.4)
    # s15: the cannon
    s0, L = at('s15')
    add(s0 + L[1], 'clunk', 0.35, 0, 0.9, 0.3)
    add(s0 + L[2], 'explosion', 0.45, 0, 1.3, 0.4); add(s0 + L[3], 'explosion', 0.4, 0, 1.4, 0.4); add(s0 + L[3] + 1.2, 'explosion', 0.38, 0, 1.5, 0.4)
    add(s0 + L[4], 'explosion', 0.45, 0, 1.2, 0.5); add(s0 + L[5] - 0.1, 'explosion', 0.5, 0, 1.1, 0.5)
    add(s0 + L[5] + 0.2, 'swish_long', 0.35, 0.3, 0.8, 0.5); add(s0 + L[6] + 0.5, 'glitter', 0.35, 0, 1.0, 0.7)
    add(s0 + L[7] - 0.3, 'whoomp', 0.4, 0, 0.9, 0.6)
    # s16: 60 radii, 1/3600, 4.9 m vs 1.4 mm
    s0, L = at('s16')
    for k in range(7): add(s0 + L[1] + k * 0.23, 'tick', 0.2, -0.6 + 0.2 * k, 1.0 + 0.05 * k, 0.3)
    add(s0 + L[3], 'beep_long', 0.3, 0.4, 1.0, 0.4)
    add(s0 + L[4] + 0.2, 'swish', 0.3, -0.4, 1.4, 0.2); add(s0 + L[4] + 1.2, 'dull', 0.45, -0.4, 1.2, 0.2)
    add(s0 + L[5] + 0.4, 'tick', 0.3, 0.4, 1.5, 0.3)
    add(s0 + L[6] + 1.0, 'bell_small', 0.45, 0.2, 1.3, 0.5); add(s0 + L[7], 'impact', 0.35, 0, 1.2, 0.5); add(s0 + L[7] + 0.3, 'glitter', 0.4, 0, 1.0, 0.7)
    # s17: universal gravitation
    s0, L = at('s17')
    add(s0 + L[1], 'sweep', 0.35, 0, 1.0, 0.5); add(s0 + L[2], 'pop', 0.3, -0.5, 1.2, 0.3)
    add(s0 + L[3], 'pen', 0.35, 0.5, 1.0, 0.2)
    add(s0 + L[4], 'whoomp', 0.35, 0, 1.0, 0.5); add(s0 + L[5], 'swish_long', 0.3, -0.4, 1.0, 0.5); add(s0 + L[5] + 0.5, 'waves', 0.35, 0.5, 1.0, 0.4)
    # s18: the Mint
    s0, L = at('s18')
    for k in range(5): add(s0 + 0.5 + k * 0.5, 'step%d' % (1 + k % 2), 0.22, -0.6 + 0.12 * k, 1.1, 0.3)
    add(s0 + L[1], 'anvil1', 0.4, 0.3, 1.0, 0.4); add(s0 + L[1] + 0.6, 'press', 0.35, 0.3, 1.0, 0.3)
    add(s0 + L[2], 'jingle', 0.35, -0.4, 1.0, 0.3); add(s0 + L[3], 'clink_hi', 0.35, 0, 1.2, 0.3)
    for k in range(4): add(s0 + L[3] + 0.3 + k * 0.12, 'clink_zn', 0.2, 0.3, 1.4, 0.2)
    add(s0 + L[3] + 1.0, 'clink_cu', 0.35, 0.5, 0.9, 0.3)
    add(s0 + L[4], 'stamp', 0.4, 0, 1.0, 0.3); add(s0 + L[5], 'murmur', 0.3, 0.5, 0.9, 0.5)
    for k in range(10): add(s0 + L[6] + k * 0.22, 'tick', 0.2, -0.4, 1.0 + 0.04 * k, 0.3)
    # s19: Chaloner
    s0, L = at('s19')
    add(s0 + 0.4, 'jingle', 0.35, -0.5, 0.9, 0.3); add(s0 + L[1], 'slam', 0.35, 0.3, 1.2, 0.4)
    for k in range(5): add(s0 + L[3] + 0.3 + k * 0.3, 'step%d' % (1 + k % 2), 0.22, -0.2 + 0.1 * k, 1.2, 0.3)
    add(s0 + L[4], 'anvil_tap', 0.45, 0, 0.7, 0.5); add(s0 + L[4] + 0.6, 'toll', 0.3, 0, 1.2, 0.8)
    add(s0 + L[5], 'page2', 0.35, 0.4, 1.0, 0.3); add(s0 + L[5] + 0.4, 'pen', 0.3, 0.2, 0.8, 0.2)
    add(s0 + L[7] + 0.2, 'tock', 0.25, 0.4, 0.8, 0.6)
    # s20: Leibniz
    s0, L = at('s20')
    add(s0 + L[1], 'pop', 0.3, 0.6, 1.0, 0.3); add(s0 + L[2], 'stamp', 0.35, 0.4, 1.0, 0.3)
    add(s0 + L[3], 'murmur', 0.4, 0, 1.3, 0.5); add(s0 + L[3] + 0.4, 'slam', 0.3, -0.4, 1.3, 0.3); add(s0 + L[3] + 1.3, 'slam', 0.3, 0.4, 1.4, 0.3)
    add(s0 + L[4], 'page1', 0.35, 0, 1.0, 0.3); add(s0 + L[5], 'pen', 0.4, 0.2, 1.0, 0.2); add(s0 + L[5] + 0.6, 'stamp', 0.4, 0.2, 0.9, 0.3)
    add(s0 + L[6], 'bell_small', 0.35, 0, 1.0, 0.5); add(s0 + L[7], 'chalk', 0.4, 0, 1.0, 0.2)
    # s21: president, knight, quiet room
    s0, L = at('s21')
    add(s0 + 0.4, 'applause', 0.3, 0, 1.0, 0.6); add(s0 + L[1], 'tick', 0.25, 0, 1.0, 0.3)
    add(s0 + L[2] + 0.4, 'clink_cu', 0.35, -0.2, 0.7, 0.6); add(s0 + L[2] + 0.5, 'toll', 0.25, 0, 1.3, 0.7)
    add(s0 + L[3], 'tock', 0.18, 0.4, 0.8, 0.6)
    # s22: the candle goes out; the Abbey
    s0, L = at('s22')
    add(s0 + L[0] + 3.2, 'hiss', 0.18, 0, 1.6, 0.7)
    add(s0 + L[2], 'toll', 0.4, 0, 0.8, 0.9); add(s0 + L[2] + 3.0, 'toll', 0.3, 0, 0.8, 0.9)
    for k in range(8): add(s0 + L[2] + 0.6 + k * 0.6, 'step%d' % (1 + k % 3), 0.14, -0.6 + 0.08 * k, 0.9, 0.6)
    add(s0 + L[4], 'murmur', 0.2, 0.5, 0.9, 0.6)
    # s23: night to light
    s0, L = at('s23')
    add(s0 + L[1], 'wind', 0.25, 0, 0.8, 0.7)
    add(s0 + L[3] - 0.2, 'sweep', 0.35, 0, 0.8, 0.7); add(s0 + L[3] + 0.3, 'glitter', 0.45, 0, 0.8, 0.8)
    # s24: the seashore
    s0, L = at('s24')
    for k in range(9): add(s0 + 0.3 + k * 3.0, 'waves', 0.32 if k < 7 else 0.22, -0.3 + 0.08 * k, 0.9 + 0.03 * (k % 3), 0.6)
    add(s0 + L[4] + 0.2, 'clink_hi', 0.2, 0.2, 1.6, 0.6); add(s0 + L[5] + 0.2, 'clink_hi', 0.2, 0.3, 1.8, 0.6)
    add(s0 + L[6] + 0.5, 'glitter', 0.3, 0, 0.7, 0.9)
    # recap
    s0, L = at('recap')
    for k in range(4): add(s0 + 1.0 + k * 1.5, 'pop', 0.25, -0.6 + 0.4 * k, 1.0 + 0.1 * k, 0.4)
    c.sort(key=lambda x: x[0])
    return c
