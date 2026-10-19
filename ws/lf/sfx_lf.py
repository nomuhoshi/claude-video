# Sound cues for the lifespan video. Every cue is anchored to the same line times the pictures use.
import script_lf as F
HITS = {}

def S(t, name, gain=1.0, pan=0.0, rate=1.0, wet=0.25, dry=1.0):
    return [round(t, 3), 'smp', [name, round(gain, 3), round(pan, 3), rate, wet, dry]]

def cues():
    c = []
    def at(key):
        return F.TL[F.IDX[key]]['s'], F.TL[F.IDX[key]]['ls']
    def add(t, *a, **k): c.append(S(t, *a, **k))
    for i, sc in enumerate(F.SC):
        if sc['k'] == 'chap': add(F.TL[i]['s'], 'impact', 0.42, 0, 1.0, 0.5)
    # hero: a cell turns young, the eye, the ceiling, mice -> dogs -> people
    s0, L = at('hero')
    add(s0 + 0.3, 'hum', 0.22, 0, 0.8, 0.4)
    add(s0 + L[0] + 0.6, 'sweep', 0.45, -0.4, 0.9, 0.5); add(s0 + L[0] + 2.2, 'glitter', 0.4, 0, 1.0, 0.7)
    add(s0 + L[1], 'swish', 0.3, 0.5, 1.0, 0.4); add(s0 + L[1] + 0.8, 'power_on', 0.35, 0.5, 1.2, 0.5)
    for k in range(6): add(s0 + L[2] + 0.1 + k * 0.33, 'step%d' % (1 + k % 2), 0.22, -0.4 + k * 0.12, 1.3, 0.3)
    add(s0 + L[2] + 1.2, 'slam', 0.4, 0.4, 1.0, 0.4)
    for k in range(3): add(s0 + L[3] + k * 0.6, 'pop', 0.32, -0.5 + 0.5 * k, 1.0 + 0.15 * k, 0.4)
    add(s0 + L[3] + 1.2, 'glitter', 0.3, 0.5, 1.2, 0.7)
    # s1: 122, Calment, 1997 -> 2026, the chart
    s0, L = at('s1')
    add(s0 + L[0], 'whir', 0.35, 0, 1.6, 0.3); add(s0 + L[0] + 1.7, 'impact', 0.3, 0, 1.3, 0.5)
    add(s0 + L[1], 'swish', 0.3, 0.5, 1.0, 0.3)
    for k in range(5): add(s0 + L[2] + 0.2 + k * 0.36, 'tick', 0.28, -0.3, 1.0 + 0.04 * k, 0.3)
    add(s0 + L[3], 'sweep', 0.35, -0.3, 1.0, 0.5); add(s0 + L[4], 'pen', 0.4, 0.2, 1.0, 0.2); add(s0 + L[4] + 1.4, 'stamp', 0.35, 0.5, 1.0, 0.3)
    # s2: Gompertz: a paper, then bars doubling
    s0, L = at('s2')
    add(s0 + L[0], 'page2', 0.45, 0, 1.0, 0.4); add(s0 + L[0] + 0.4, 'pen', 0.4, 0.1, 0.9, 0.2)
    add(s0 + L[1], 'swish', 0.3, 0, 1.0, 0.3)
    for k in range(9): add(s0 + L[2] + k * 0.32, 'knock_hi', 0.22 + 0.03 * k, -0.6 + 0.15 * k, 0.8 + 0.08 * k, 0.2)
    add(s0 + L[3], 'beep', 0.3, -0.5, 1.0, 0.3); add(s0 + L[4], 'beep', 0.35, 0.5, 0.75, 0.3); add(s0 + L[4] + 0.8, 'dull', 0.35, 0.5, 1.0, 0.3)
    add(s0 + L[5] + 0.8, 'swish_long', 0.35, 0.4, 1.0, 0.4)
    # s3: records cap; the valley and the ball
    s0, L = at('s3')
    for k in range(6): add(s0 + 0.4 + k * 0.25, 'pop', 0.18, -0.6 + 0.2 * k, 1.2 + 0.05 * k, 0.4)
    add(s0 + L[1], 'stamp', 0.4, 0, 1.0, 0.3)
    add(s0 + L[2], 'sweep', 0.3, 0, 1.0, 0.5)
    for t0, pan in ((L[3] + 0.6, -0.6), (L[4] + 0.4, 0.0), (L[5] + 0.4, 0.6)):
        add(s0 + t0, 'knock', 0.4, pan, 1.0, 0.3)
    add(s0 + L[3] + 3.8, 'knock', 0.35, -0.6, 1.0, 0.3)
    add(s0 + L[5] + 1.6, 'dull', 0.35, 0.6, 0.9, 0.4)
    # s4: errors, repair, 12 hallmarks
    s0, L = at('s4')
    add(s0 + L[1], 'crack', 0.35, -0.4, 1.3, 0.3); add(s0 + L[1] + 0.8, 'slither', 0.35, 0.1, 1.2, 0.3); add(s0 + L[1] + 1.6, 'hum', 0.3, -0.3, 0.6, 0.4)
    add(s0 + L[2], 'whir', 0.3, 0, 1.2, 0.3)
    for k in range(12): add(s0 + L[3] + 0.15 * k, 'tick', 0.22, -0.6 + 0.1 * k, 1.0 + 0.03 * k, 0.3)
    add(s0 + L[4] + 0.2, 'swish_long', 0.35, 0, 1.0, 0.4)
    for k in range(3): add(s0 + L[5] + k * 0.5, 'impact', 0.22, -0.5 + 0.5 * k, 1.3, 0.5)
    # s5: mutation counters
    s0, L = at('s5')
    add(s0 + L[1] - 0.2, 'pop', 0.3, -0.4, 1.4, 0.3)
    add(s0 + L[2], 'whir', 0.3, 0.2, 1.6, 0.3); add(s0 + L[2] + 0.9, 'stamp', 0.35, 0.3, 1.0, 0.3)
    add(s0 + L[3] + 0.2, 'sweep', 0.3, -0.2, 1.4, 0.5); add(s0 + L[3] + 0.2, 'whir', 0.25, 0.2, 1.0, 0.3)
    add(s0 + L[4] + 0.2, 'glitter', 0.35, 0.3, 1.0, 0.7)
    for k in range(12): add(s0 + L[5] + k * 0.08, 'tick', 0.16, -0.5 + 0.08 * k, 1.2, 0.3)
    # s6: switches, tags, drift, the clock
    s0, L = at('s6')
    for k in range(3): add(s0 + 0.3 + k * 0.3, 'pop', 0.25, -0.6 + 0.6 * k, 1.0, 0.4)
    for k in range(6): add(s0 + L[1] + k * 0.1, 'switch', 0.22, -0.5 + 0.2 * k, 1.0 + 0.05 * k, 0.2)
    add(s0 + L[2], 'sprinkle', 0.35, 0, 1.0, 0.4)
    add(s0 + L[3] + 0.3, 'swish_long', 0.3, 0.4, 0.8, 0.4); add(s0 + L[4], 'murmur', 0.2, 0.5, 1.3, 0.5)
    for k in range(8): add(s0 + L[5] + k * 0.25, 'tock' if k % 2 else 'tick', 0.3, 0, 1.0, 0.3)
    # s7: zombie cells and inflammation; stem cells
    s0, L = at('s7')
    add(s0 + L[0] + 0.6, 'hum', 0.3, 0, 0.5, 0.4); add(s0 + L[1], 'dull', 0.3, 0, 1.0, 0.3)
    add(s0 + L[2], 'ripple', 0.4, 0, 1.0, 0.4); add(s0 + L[2] + 1.0, 'hiss', 0.25, 0.3, 1.0, 0.4)
    add(s0 + L[3], 'glitter', 0.3, -0.5, 1.0, 0.6)
    for k in range(4): add(s0 + L[3] + 0.6 + k * 0.62, 'bubbles', 0.18, -0.5, 1.3, 0.4)
    add(s0 + L[4], 'bubbles', 0.18, 0.5, 0.8, 0.4)
    # s8: entropy, open system, the unbroken line, the conclusion
    s0, L = at('s8')
    add(s0 + L[0] + 0.3, 'pour', 0.3, 0, 1.0, 0.4)
    add(s0 + L[1], 'lock', 0.5, 0, 1.0, 0.3)
    add(s0 + L[2], 'power_on', 0.35, -0.5, 1.0, 0.4); add(s0 + L[2] + 0.4, 'hiss', 0.2, 0.5, 1.0, 0.4)
    add(s0 + L[4], 'sweep', 0.4, -0.6, 0.8, 0.5)
    for k in range(10): add(s0 + L[4] + 0.3 + k * 0.32, 'pop', 0.16, -0.6 + 0.12 * k, 0.9 + 0.05 * k, 0.4)
    add(s0 + L[4] + 3.2, 'glitter', 0.4, 0.6, 1.0, 0.7)
    add(s0 + L[6], 'impact', 0.4, 0, 1.0, 0.6); add(s0 + L[6] + 0.4, 'glitter', 0.35, 0, 0.9, 0.8)
    # s9: parents -> children; the wild; the energy budget
    s0, L = at('s9')
    add(s0 + L[1], 'swish', 0.3, -0.4, 1.0, 0.3); add(s0 + L[1] + 1.4, 'pop', 0.25, 0.3, 1.2, 0.4); add(s0 + L[1] + 1.65, 'pop', 0.25, 0.45, 1.3, 0.4); add(s0 + L[1] + 1.9, 'pop', 0.25, 0.6, 1.4, 0.4)
    add(s0 + L[2] + 0.2, 'sweep', 0.3, 0, 0.8, 0.5); add(s0 + L[2] + 1.0, 'dull', 0.3, -0.5, 1.0, 0.3); add(s0 + L[2] + 1.3, 'dull', 0.28, -0.3, 1.1, 0.3); add(s0 + L[2] + 1.6, 'dull', 0.26, -0.1, 1.2, 0.3)
    add(s0 + L[3], 'pen', 0.35, 0, 1.0, 0.2); add(s0 + L[3] + 1.2, 'stamp', 0.35, 0.5, 1.0, 0.3)
    add(s0 + L[4] + 0.3, 'whir', 0.3, 0, 1.2, 0.3)
    # s10: animals
    s0, L = at('s10')
    add(s0 + 0.3, 'pop', 0.25, -0.5, 1.5, 0.3); add(s0 + 0.5, 'pop', 0.25, -0.5, 1.1, 0.3)
    add(s0 + L[1], 'waves', 0.4, -0.3, 0.8, 0.5); add(s0 + L[1] + 0.2, 'whir', 0.25, 0.2, 1.0, 0.3)
    add(s0 + L[2], 'waves', 0.35, -0.3, 0.6, 0.6); add(s0 + L[2] + 0.2, 'whir', 0.25, 0.4, 0.8, 0.3)
    add(s0 + L[3], 'slither', 0.3, -0.5, 1.1, 0.3); add(s0 + L[3] + 0.4, 'sweep', 0.3, 0.4, 1.0, 0.5)
    add(s0 + L[4], 'glitter', 0.35, 0, 1.0, 0.7)
    # s11: brain, renewal rows, wrench, clock
    s0, L = at('s11')
    add(s0 + 0.3, 'hum', 0.25, -0.4, 1.1, 0.4); add(s0 + L[0], 'glitter', 0.3, -0.4, 0.8, 0.7)
    for k in range(3): add(s0 + L[1] + k * 0.7, 'pop', 0.28, 0.4, 1.0 + 0.1 * k, 0.3)
    add(s0 + L[3], 'clink_hi', 0.35, -0.2, 1.0, 0.3); add(s0 + L[3] + 0.4, 'clink_hi', 0.3, -0.2, 1.1, 0.3)
    for k in range(8): add(s0 + L[4] + k * (0.4 + k * 0.08), 'tock' if k % 2 else 'tick', 0.26, 0.4, 1.0, 0.3)
    # s12: chart, whack-a-mole, the root
    s0, L = at('s12')
    add(s0 + L[1], 'pen', 0.4, -0.2, 1.0, 0.2); add(s0 + L[2], 'swish', 0.3, -0.4, 1.0, 0.3); add(s0 + L[2] + 0.6, 'dull', 0.3, 0.4, 0.9, 0.3)
    for k in range(3): add(s0 + L[3] + k * 0.8, 'punch', 0.28, -0.5 + 0.5 * k, 1.0, 0.3)
    add(s0 + L[4], 'creak', 0.3, 0, 1.0, 0.4); add(s0 + L[5], 'impact', 0.3, 0, 1.2, 0.5); add(s0 + L[5] + 0.4, 'glitter', 0.3, 0.2, 1.0, 0.7)
    # s13: crowd, habits, bars, plate, speedometer
    s0, L = at('s13')
    add(s0 + L[0], 'bell_small', 0.3, 0, 1.0, 0.5); add(s0 + L[1], 'murmur', 0.3, -0.5, 1.0, 0.5)
    for k in range(5): add(s0 + L[2] + k * 0.3, 'switch', 0.25, 0, 1.0 + 0.05 * k, 0.2)
    add(s0 + L[3], 'whir', 0.3, 0.5, 1.4, 0.3); add(s0 + L[3] + 1.0, 'glitter', 0.3, 0.5, 1.0, 0.7)
    add(s0 + L[4], 'stamp', 0.35, 0, 1.0, 0.3); add(s0 + L[5] + 0.3, 'clink_hi', 0.3, -0.3, 0.8, 0.3)
    add(s0 + L[6] + 0.3, 'whir', 0.3, 0.3, 0.8, 0.3); add(s0 + L[6] + 1.4, 'bell_small', 0.3, 0.3, 1.2, 0.5)
    # s14: mice, pills, curves, antibodies
    s0, L = at('s14')
    for k in range(4): add(s0 + 0.2 + k * 0.15, 'pop', 0.18, -0.7 + 0.15 * k, 1.6, 0.3)
    add(s0 + L[1], 'rattle', 0.35, -0.5, 1.0, 0.3); add(s0 + L[2], 'pen', 0.35, 0.4, 1.1, 0.2); add(s0 + L[2] + 1.0, 'pop', 0.3, 0.4, 1.2, 0.3)
    add(s0 + L[3] + 0.4, 'zap_small', 0.3, -0.5, 1.4, 0.3); add(s0 + L[3] + 0.6, 'lock', 0.3, -0.5, 1.4, 0.3)
    add(s0 + L[4], 'pen', 0.35, 0.4, 1.0, 0.2); add(s0 + L[4] + 1.0, 'glitter', 0.35, 0.5, 1.0, 0.7)
    add(s0 + L[5], 'dull', 0.3, 0, 1.0, 0.3)
    # s15: dog, checklist, 1300 dogs, hourglass
    s0, L = at('s15')
    add(s0 + 0.4, 'jingle', 0.25, -0.5, 1.0, 0.4); add(s0 + L[1], 'rattle', 0.3, -0.4, 1.1, 0.3)
    for k in range(3): add(s0 + L[2] + 0.3 + k * 0.5, 'stamp' if k < 2 else 'tick', 0.32, 0.4, 1.0, 0.3)
    add(s0 + L[3], 'sprinkle', 0.35, 0, 1.0, 0.4); add(s0 + L[4], 'swish_long', 0.3, 0, 0.8, 0.4)
    # s16: reprogramming
    s0, L = at('s16')
    add(s0 + L[0], 'glitter', 0.35, 0, 0.9, 0.7)
    add(s0 + L[1], 'swish', 0.3, -0.6, 1.0, 0.3)
    for k in range(4): add(s0 + L[2] + 0.2 + k * 0.15, 'pop', 0.25, -0.3 + 0.15 * k, 1.0 + 0.1 * k, 0.4)
    add(s0 + L[2] + 1.4, 'power_on', 0.35, 0.2, 1.3, 0.5); add(s0 + L[2] + 2.2, 'glitter', 0.3, 0.4, 1.1, 0.7)
    add(s0 + L[3] + 0.3, 'punch', 0.3, -0.2, 1.2, 0.3); add(s0 + L[3] + 0.8, 'switch', 0.35, 0.2, 1.0, 0.2); add(s0 + L[3] + 2.6, 'switch', 0.3, 0.2, 0.9, 0.2)
    add(s0 + L[4] + 0.2, 'sweep', 0.35, 0, 1.2, 0.5); add(s0 + L[4] + 1.4, 'glitter', 0.35, 0, 1.2, 0.7)
    add(s0 + L[5], 'pop', 0.3, -0.2, 0.9, 0.3)
    add(s0 + L[6] + 1.0, 'power_on', 0.35, 0.2, 1.0, 0.5); add(s0 + L[6] + 1.4, 'glitter', 0.35, 0.2, 1.0, 0.7)
    add(s0 + L[7], 'impact', 0.3, 0, 1.2, 0.5); add(s0 + L[7] + 0.4, 'clink_hi', 0.3, 0.4, 1.5, 0.3); add(s0 + L[7] + 1.2, 'beep', 0.3, 0.4, 1.0, 0.3)
    add(s0 + L[8], 'sweep', 0.3, 0.3, 1.0, 0.5)
    # s17: kidney, pig, counter, hospital
    s0, L = at('s17')
    add(s0 + L[1], 'swish', 0.3, 0.4, 1.0, 0.3); add(s0 + L[1] + 0.8, 'sweep', 0.3, -0.2, 1.0, 0.5)
    add(s0 + L[2] + 0.2, 'whir', 0.35, 0.5, 1.5, 0.3); add(s0 + L[2] + 2.2, 'stamp', 0.35, 0.5, 1.0, 0.3)
    add(s0 + L[3], 'impact', 0.3, 0, 1.2, 0.5); add(s0 + L[5], 'bell_small', 0.35, 0, 1.0, 0.5); add(s0 + L[5] + 0.2, 'glitter', 0.3, 0, 1.0, 0.7)
    # s18: crossed out, the health curve, the walker, the steps
    s0, L = at('s18')
    add(s0 + 0.9, 'punch', 0.32, -0.4, 1.0, 0.3); add(s0 + 1.6, 'punch', 0.32, 0.4, 0.95, 0.3)
    add(s0 + L[1] + 0.8, 'sweep', 0.3, 0, 1.0, 0.5)
    for k in range(4): add(s0 + L[2] + k * 0.45, 'step%d' % (1 + k % 2), 0.22, 0.5, 1.2, 0.3)
    for k in range(4): add(s0 + L[3] + k * 0.5, 'knock_hi', 0.28, -0.6 + 0.4 * k, 0.9 + 0.1 * k, 0.2)
    for k in range(3): add(s0 + L[4] + 0.8 * k + 0.4, 'pop', 0.3, -0.3 + 0.3 * k, 1.0 + 0.15 * k, 0.4)
    add(s0 + L[4] + 2.4, 'glitter', 0.4, 0.5, 1.0, 0.7)
    # s19: the long climb, the icons, the target, the sunrise
    s0, L = at('s19')
    add(s0 + L[0] + 0.6, 'sweep', 0.35, -0.5, 0.7, 0.6)
    for k in range(3): add(s0 + L[2] + 0.2 + k * 0.6, 'pop', 0.3, -0.5 + 0.4 * k, 1.0 + 0.1 * k, 0.4)
    add(s0 + L[3], 'impact', 0.35, 0, 1.0, 0.5); add(s0 + L[3] + 0.6, 'lock', 0.3, 0, 1.2, 0.3)
    add(s0 + L[4] - 0.2, 'swish_long', 0.35, 0, 0.7, 0.6); add(s0 + L[4] + 0.4, 'glitter', 0.45, 0, 0.8, 0.9)
    add(s0 + L[5] + 0.2, 'glitter', 0.35, 0.3, 1.1, 0.9)
    c.sort(key=lambda x: x[0])
    return c
