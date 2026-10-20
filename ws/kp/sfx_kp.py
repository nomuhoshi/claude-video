# Sound cues for the Kepler video. Each cue is anchored to the same line times the pictures use.
import script_kp as F
HITS = {}

def S(t, name, gain=1.0, pan=0.0, rate=1.0, wet=0.25, dry=1.0):
    return [round(t, 3), 'smp', [name, round(gain, 3), round(pan, 3), rate, wet, dry]]

def cues():
    c = []
    def at(key): return F.TL[F.IDX[key]]['s'], F.TL[F.IDX[key]]['ls']
    def add(t, *a, **k): c.append(S(t, *a, **k))
    for i, sc in enumerate(F.SC):
        if sc['k'] == 'chap': add(F.TL[i]['s'], 'impact', 0.42, 0, 1.0, 0.5)
    # hero: solids appear one by one, "he was wrong", an ellipse, the name
    s0, L = at('hero')
    for k in range(5): add(s0 + 0.3 + k * 0.52, 'glass', 0.22, -0.5 + 0.25 * k, 0.8 + 0.1 * k, 0.5)
    add(s0 + L[1], 'glitter', 0.35, 0, 0.9, 0.7)
    add(s0 + L[2], 'dull', 0.45, 0.4, 0.9, 0.4); add(s0 + L[2] + 0.05, 'crack', 0.3, 0.4, 1.0, 0.4)
    add(s0 + L[3], 'sweep', 0.4, -0.2, 1.0, 0.5); add(s0 + L[4], 'whoomp', 0.35, 0, 1.0, 0.5)
    add(s0 + L[5], 'impact', 0.3, 0.5, 1.3, 0.5)
    # s1: a small town, a baby, smallpox, blurred stars that come into focus
    s0, L = at('s1')
    add(s0 + L[0], 'wind', 0.3, 0, 1.0, 0.5); add(s0 + L[0] + 0.4, 'toll', 0.22, -0.3, 1.3, 0.7)
    add(s0 + L[1] + 0.3, 'bell_small', 0.25, 0, 1.4, 0.5)
    add(s0 + L[2], 'dull', 0.3, 0, 0.8, 0.5); add(s0 + L[3], 'hum', 0.15, 0, 0.7, 0.5)
    add(s0 + L[5], 'sweep', 0.35, 0.2, 1.1, 0.5); add(s0 + L[5] + 1.2, 'glitter', 0.35, 0.3, 1.0, 0.7)
    # s2: comet, eclipse, the university, the teacher
    s0, L = at('s2')
    add(s0 + L[1], 'swish_long', 0.4, 0.5, 0.7, 0.6); add(s0 + L[1] + 0.4, 'glitter', 0.3, 0.6, 0.8, 0.7)
    add(s0 + L[2], 'creak', 0.3, -0.4, 1.1, 0.3); add(s0 + L[3] + 0.5, 'whoomp', 0.3, 0.4, 0.8, 0.6)
    add(s0 + L[4], 'toll', 0.3, -0.3, 1.2, 0.7); add(s0 + L[5], 'page1', 0.3, 0.3, 1.0, 0.3)
    add(s0 + L[6], 'chalk', 0.45, -0.4, 1.0, 0.2); add(s0 + L[7], 'chalk', 0.4, -0.3, 1.1, 0.2); add(s0 + L[8], 'bell_small', 0.35, 0.4, 1.2, 0.5)
    # s3: a classroom, a triangle drawing, six planets
    s0, L = at('s3')
    add(s0 + L[0], 'murmur', 0.3, 0, 1.2, 0.5)
    for k in range(6): add(s0 + L[1] + 0.3 + k * 0.5, 'chalk', 0.3, -0.3 + 0.1 * k, 1.0 + 0.04 * k, 0.2)
    add(s0 + L[2], 'beep', 0.3, 0, 1.0, 0.4)
    for k in range(6): add(s0 + L[3] + k * 0.15, 'pop', 0.22, -0.6 + 0.24 * k, 0.9 + 0.08 * k, 0.4)
    add(s0 + L[4], 'tick', 0.3, 0, 1.0, 0.3)
    # s4: five solids, nesting, the book
    s0, L = at('s4')
    for k in range(5): add(s0 + L[1] + k * 0.35, 'glass', 0.25, -0.6 + 0.3 * k, 0.9 + 0.1 * k, 0.5)
    add(s0 + L[2], 'bell_small', 0.35, 0, 1.0, 0.5)
    for k in range(5): add(s0 + L[4] + 0.6 + k * 0.84, 'clink_hi', 0.25, 0, 0.8 + 0.12 * k, 0.6)
    add(s0 + L[7], 'glitter', 0.45, 0, 1.0, 0.8); add(s0 + L[8], 'book', 0.4, 0.4, 1.0, 0.3)
    # s5: bars, blame the data, a light in the north
    s0, L = at('s5')
    for k in range(6): add(s0 + 0.3 + k * 0.12, 'tick', 0.2, -0.3, 1.0 + 0.05 * k, 0.3)
    add(s0 + L[1] + 0.8, 'dull', 0.35, 0.3, 1.0, 0.3); add(s0 + L[3], 'knock', 0.3, 0.5, 1.0, 0.3)
    add(s0 + L[5], 'sweep', 0.35, 0.3, 1.0, 0.6); add(s0 + L[5] + 0.4, 'glitter', 0.35, 0.3, 1.0, 0.7)
    # s6: Tycho, the duel, the island, the quadrant, the journey
    s0, L = at('s6')
    add(s0 + L[1] + 0.2, 'swish', 0.45, 0.3, 1.2, 0.2); add(s0 + L[1] + 0.35, 'clink_cu', 0.4, 0.3, 1.3, 0.3)
    add(s0 + L[2], 'clink_hi', 0.35, 0, 0.9, 0.4)
    add(s0 + L[3], 'waves', 0.35, -0.3, 1.0, 0.5); add(s0 + L[4], 'stamp', 0.3, -0.3, 0.9, 0.3)
    add(s0 + L[5], 'creak', 0.35, 0.3, 0.8, 0.3); add(s0 + L[7], 'beep', 0.3, 0.5, 1.2, 0.4)
    for k in range(6): add(s0 + L[8] + 0.2 + k * 0.33, 'hooves', 0.18, -0.4 + 0.15 * k, 1.0, 0.3)
    # s7: wary partners, Mars handed over, the banquet, the sickbed, the records
    s0, L = at('s7')
    add(s0 + L[1], 'lock', 0.4, -0.5, 1.0, 0.3); add(s0 + L[2] + 0.4, 'page2', 0.35, 0, 1.0, 0.3)
    add(s0 + L[3], 'clink_hi', 0.3, 0, 1.0, 0.4); add(s0 + L[3] + 0.4, 'murmur', 0.3, 0, 1.0, 0.5)
    add(s0 + L[4], 'toll', 0.25, 0, 1.1, 0.8); add(s0 + L[6], 'wind', 0.2, 0, 0.9, 0.6)
    add(s0 + L[7], 'stamp', 0.35, -0.3, 1.0, 0.3)
    for k in range(6): add(s0 + L[8] + k * 0.15, 'book', 0.22, 0.3, 1.0 + 0.05 * k, 0.3)
    # s8: circles tweaked, counting, the misfit, the Moon
    s0, L = at('s8')
    for k in range(10): add(s0 + L[3] + k * 0.24, 'pen', 0.16, 0, 1.0 + 0.03 * k, 0.2)
    add(s0 + L[5], 'beep_long', 0.35, 0.3, 0.8, 0.4)
    add(s0 + L[7], 'pop', 0.35, -0.3, 1.0, 0.4)
    # s9: error ruler, the quote, circle/egg/ellipse
    s0, L = at('s9')
    add(s0 + L[1], 'tick', 0.3, -0.3, 1.0, 0.3); add(s0 + L[2], 'dull', 0.4, 0, 1.0, 0.3)
    add(s0 + L[3], 'page1', 0.35, 0, 1.0, 0.3); add(s0 + L[4], 'pen', 0.35, 0.3, 1.0, 0.2); add(s0 + L[5], 'impact', 0.3, 0, 1.2, 0.5)
    add(s0 + L[6] + 0.3, 'swish', 0.3, 0.3, 1.0, 0.3); add(s0 + L[8], 'glitter', 0.45, 0, 1.0, 0.8)
    # s10: the ellipse, foci, equal areas, the book, the circle breaks
    s0, L = at('s10')
    add(s0 + 0.2, 'sweep', 0.4, 0, 1.0, 0.5); add(s0 + L[2], 'pop', 0.3, -0.3, 1.0, 0.4)
    add(s0 + L[4], 'whir', 0.3, 0.4, 1.4, 0.4); add(s0 + L[4] + 0.8, 'whir', 0.25, -0.4, 0.8, 0.4)
    add(s0 + L[6], 'book', 0.45, -0.3, 1.0, 0.3)
    add(s0 + L[8], 'crack', 0.45, 0.4, 1.0, 0.4); add(s0 + L[8] + 0.3, 'glass', 0.4, 0.4, 0.7, 0.5)
    # s11: snowflakes, honeycomb, cannonballs
    s0, L = at('s11')
    add(s0 + L[0] + 0.5, 'jingle', 0.2, -0.4, 0.8, 0.3)
    add(s0 + L[1] + 0.3, 'glitter', 0.4, 0, 1.2, 0.7); add(s0 + L[2], 'glitter', 0.35, 0.4, 1.4, 0.7)
    add(s0 + L[4], 'pop', 0.25, -0.3, 1.2, 0.3)
    for k in range(6): add(s0 + L[6] + k * 0.25, 'knock', 0.22, -0.2 + 0.08 * k, 0.8, 0.3)
    add(s0 + L[8], 'tick', 0.3, 0.4, 1.0, 0.3); add(s0 + L[8] + 1.8, 'bell_small', 0.35, 0.4, 1.2, 0.5)
    # s12: the dream
    s0, L = at('s12')
    add(s0 + L[0], 'page2', 0.35, -0.4, 1.0, 0.3); add(s0 + L[1], 'wind', 0.3, 0, 1.1, 0.5)
    add(s0 + L[2], 'glitter', 0.4, 0.5, 0.8, 0.8); add(s0 + L[3], 'sweep', 0.45, 0, 0.8, 0.6)
    add(s0 + L[5], 'bell_small', 0.3, -0.3, 1.0, 0.5); add(s0 + L[7], 'dull', 0.35, 0.3, 0.8, 0.5)
    # s13: the accusation
    s0, L = at('s13')
    add(s0 + L[1], 'murmur', 0.35, 0.4, 1.0, 0.5); add(s0 + L[2], 'pour', 0.3, 0, 1.0, 0.3)
    add(s0 + L[4] - 0.3, 'fire_roar', 0.32, 0.6, 1.0, 0.5); add(s0 + L[4] + 0.5, 'fire_crackle', 0.2, 0.6, 1.0, 0.4); add(s0 + L[5], 'page1', 0.3, -0.5, 1.0, 0.3)
    # s14: the defense, arrest, chains, the instruments, release
    s0, L = at('s14')
    for k in range(6): add(s0 + L[1] + k * 0.35, 'pen', 0.2, 0.1, 1.0, 0.2)
    add(s0 + L[2], 'slam', 0.4, 0, 0.9, 0.5); add(s0 + L[3], 'rattle', 0.4, 0, 0.8, 0.4)
    add(s0 + L[4], 'clunk', 0.3, 0.5, 0.8, 0.5); add(s0 + L[6], 'toll', 0.25, 0, 1.0, 0.8)
    add(s0 + L[7], 'creak', 0.35, 0, 1.0, 0.4); add(s0 + L[7] + 0.4, 'wind', 0.2, 0, 1.0, 0.6)
    # s15: the music of the spheres, the third law
    s0, L = at('s15')
    import math
    notes = [1.0, 1.122, 1.26, 1.335, 1.498, 1.682, 1.888, 2.0]
    for k in range(8): add(s0 + L[1] + 0.2 + k * 0.12, 'bell_small', 0.18, -0.6 + 0.17 * k, notes[k], 0.6)
    add(s0 + L[3], 'stamp', 0.3, 0, 1.0, 0.3)
    for k in range(6): add(s0 + L[5] + k * 0.2, 'pop', 0.22, -0.4 + 0.15 * k, 0.9 + 0.1 * k, 0.4)
    add(s0 + L[6], 'glitter', 0.45, 0, 1.0, 0.8); add(s0 + L[7], 'pop', 0.3, 0.5, 1.4, 0.4); add(s0 + L[7] + 0.3, 'pop', 0.3, 0.6, 1.5, 0.4)
    # s16: war, graves, unpaid wages, the tables
    s0, L = at('s16')
    # battlefield: burning fires all across the line, distant cannon, steel, men shouting far away
    tw = s0 + L[3] - 0.2
    for k, t in enumerate([s0 - 0.6, s0 + 3.6, s0 + 7.8]):
        if t < tw: add(t, 'fire_roar', 0.55, [-0.5, 0.4, -0.1][k], [1.0, 0.92, 1.06][k], 0.35)
    for k in range(9): add(s0 + 0.4 + k * 0.95, 'fire_crackle', 0.35, -0.7 + 0.17 * k, 0.9 + 0.05 * (k % 3), 0.3)
    add(s0 + 0.2, 'war_crowd', 0.28, 0.3, 1.0, 0.6); add(s0 + 4.6, 'war_crowd', 0.22, -0.4, 0.95, 0.6)
    for t, pan, g_ in [(0.3, -0.6, 0.55), (2.4, 0.5, 0.45), (L[1] + 0.9, -0.2, 0.5), (L[2] + 0.5, 0.6, 0.42), (L[2] + 2.2, -0.5, 0.38)]: add(s0 + t, 'cannon_far', g_, pan, 1.0, 0.6)
    for k in range(6): add(s0 + 1.1 + k * 1.3, 'clash', 0.16, (-1) ** k * 0.6, 0.9 + 0.08 * (k % 3), 0.5)
    add(s0 + L[1], 'toll', 0.24, 0, 1.0, 0.8); add(s0 + L[2], 'toll', 0.18, 0, 1.15, 0.8)
    for k in range(6): add(s0 + L[4] + k * 0.2, 'stamp', 0.25, 0.3, 1.0, 0.3)
    add(s0 + L[5], 'book', 0.4, -0.3, 1.0, 0.3); add(s0 + L[7], 'glitter', 0.35, 0.4, 1.0, 0.7)
    # s17: the ride in the rain, the candle, the lost grave, the epitaph
    s0, L = at('s17')
    add(s0 + L[1], 'wind', 0.3, 0, 0.9, 0.6)
    for k in range(10): add(s0 + L[1] + 0.2 + k * 0.5, 'hooves', 0.16, -0.5 + 0.1 * k, 0.95, 0.4)
    add(s0 + L[4], 'toll', 0.35, 0, 0.8, 0.9); add(s0 + L[4] + 2.0, 'hiss', 0.15, 0, 1.6, 0.7)
    add(s0 + L[5] - 0.3, 'fire_roar', 0.4, 0, 0.95, 0.5); add(s0 + L[5] + 0.6, 'fire_crackle', 0.25, -0.3, 1.0, 0.4); add(s0 + L[5] + 1.6, 'cannon_far', 0.25, 0.5, 1.0, 0.7)
    add(s0 + L[8], 'glitter', 0.3, 0, 0.7, 0.9); add(s0 + L[9], 'sweep', 0.25, 0, 0.7, 0.8)
    # s18: how/why; the baby; Newton; one force; the design fades; the laws stay
    s0, L = at('s18')
    add(s0 + L[1], 'bell_small', 0.3, 0.3, 1.0, 0.5)
    add(s0 + L[3], 'clink_hi', 0.3, -0.3, 0.8, 0.5); add(s0 + L[4], 'impact', 0.3, -0.3, 1.2, 0.5)
    add(s0 + L[4] + 0.8, 'dull', 0.3, -0.2, 1.3, 0.3)
    add(s0 + L[6], 'glass', 0.3, -0.4, 0.8, 0.5); add(s0 + L[8], 'dull', 0.3, -0.4, 0.8, 0.5)
    add(s0 + L[9], 'glitter', 0.4, 0.4, 0.9, 0.8)
    s0, L = at('recap')
    for k in range(4): add(s0 + 1.0 + k * 1.5, 'pop', 0.25, -0.6 + 0.4 * k, 1.0 + 0.1 * k, 0.4)
    c.sort(key=lambda x: x[0])
    return c
