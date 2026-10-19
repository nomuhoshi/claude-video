# -*- coding: utf-8 -*-
# Scene script for the classical-atom-collapse video. Timing is computed from the subtitle volume (no fixed 300 s).
import math, random

TITLE = 'You Shouldn\u2019t Exist'
SPEED = 17.0       # chars per second for reading (English)
LEAD = {'hero': 1.6, 'c': 0.8, 'recap': 0.4, 'src': 0.4}   # the picture shows first, the first subtitle comes a moment later (hero: one full bar)
TAIL = {'hero': 0.4, 'c': 0.55, 'recap': 0.5, 'src': 0.5}
CHAP_DUR = 2.6
GAP = 0.08

def n_chars(t):
    return float(len(t))

# kind: hero | chap | c (canvas content) | recap | src
SC = [
 dict(key='hero', k='hero', name='Opening', draw='d0', lines=[
    ('Classical physics once calculated a verdict:', 0), ('every atom should collapse in an instant.', 0),
    ('Tables, the Earth, you and me: all gone.', 0), ('Yet here you are, still watching this video.', 0),
    ('That contradiction forced a brand-new physics.', 0)]),
 dict(key='ch1', k='chap', name='Part 1 · The atom', word='THE ATOM', en='PART 1', sub='Atoms, the classical way',
      line='First, the atom as classical physics saw it.'),
 dict(key='s1', k='c', name='Scene 1 · A tiny solar system', draw='d1', lines=[
    ('All matter is built from atoms.', 0), ('At the center sits a tiny nucleus,', 0), ('and around it circle very light electrons.', 0),
    ('One is positive, the other negative,', 0), ('pulling on each other like the Sun and Earth.', 0)]),
 dict(key='s2', k='c', name='Scene 2 · Empty and fast', draw='d2', lines=[
    ('Atoms are mostly empty space.', 0), ('Blow one up to the size of a stadium,', 0), ('and the nucleus is a grain of rice at the center.', 0),
    ('The electron circles 6.6 quadrillion times a second.', 0), ('That is the atom as classical physics drew it.', 0)]),
 dict(key='ch2', k='chap', name='Part 2 · The trouble', word='THE TROUBLE', en='PART 2', sub='Electrons keep radiating',
      line='The trouble is all that orbiting.'),
 dict(key='s3', k='c', name='Scene 3 · Accelerate, radiate', draw='d3', lines=[
    ('Whenever a charged particle accelerates,', 0), ('it sends out electromagnetic waves.', 0),
    ('Phones and antennas work on exactly this.', 0), ('An orbiting electron keeps changing direction,', 0), ('and changing direction means accelerating.', 0),
    ('So the electron keeps radiating energy away.', 0)]),
 dict(key='s4', k='c', name='Scene 4 · The spiral', draw='d4', lines=[
    ('Every bit of light it emits costs it energy.', 0), ('Less energy means a smaller orbit.', 0),
    ('A smaller orbit means it spins faster,', 0), ('radiates even more, and falls even faster.', 0),
    ('It can only spiral, loop by loop, into the nucleus.', 0)]),
 dict(key='ch3', k='chap', name='Part 3 · Collapse', word='THE COLLAPSE', en='PART 3', sub='How long would it take?',
      line='So how long would it take?'),
 dict(key='s5', k='c', name='Scene 5 · Do the math', draw='d5', lines=[
    ('Take the simplest atom, hydrogen, and calculate.', 0), ('From orbit down onto the nucleus takes only', 0),
    ('about a 60-billionth of a second.', 0), ('One blink is long enough for billions of collapses.', 0),
    ('(A rough estimate, but the magnitude is right.)', 0)]),
 dict(key='s6', k='c', name='Scene 6 · Everything vanishes', draw='d6', lines=[
    ('One atom collapsing would not be alone.', 0), ('Your body holds about 7 octillion atoms.', 0),
    ('They would all collapse in the same instant.', 0), ('Tables, the Earth, the Sun too.', 0),
    ('No chemistry, no life, nothing at all.', 0)]),
 dict(key='ch4', k='chap', name='Part 4 · But', word='BUT IT STANDS', en='PART 4', sub='Facts versus theory',
      line='But the atom does not collapse.'),
 dict(key='s7', k='c', name='Scene 7 · Fact one: stable', draw='d7', lines=[
    ('The facts say the exact opposite.', 0), ('Hydrogen has existed for over ten billion years.', 0),
    ('Prediction and fact are 28 orders of magnitude apart.', 0), ('Theory: must collapse. Experiment: perfectly stable.', 0)]),
 dict(key='s8', k='c', name='Scene 8 · Fact two: sharp lines', draw='d8', lines=[
    ('Another thing does not add up either.', 0), ('Split hydrogen’s glow apart with a prism,', 0),
    ('and you do not get a continuous rainbow,', 0), ('but a few sharp, separate lines.', 0),
    ('A spiraling electron means smoothly changing light.', 0), ('Sharp lines: electrons only sit on certain “steps.”', 0)]),
 dict(key='ch5', k='chap', name='Part 5 · A patch', word='THE PATCH', en='PART 5', sub='A rule first, a reason later',
      line='First a patch: simply make a rule.'),
 dict(key='s9', k='c', name='Scene 9 · A bold rule', draw='d9', lines=[
    ('The first patch came in 1913.', 0), ('A bold rule: electrons stay on a few set orbits.', 0),
    ('On an orbit there is no radiation, so no falling.', 0), ('Only when jumping from one orbit to another', 0),
    ('does it give off or absorb one packet of light.', 0), ('That rule reproduces hydrogen’s sharp lines.', 0)]),
 dict(key='s10', k='c', name='Scene 10 · The problem with the patch', draw='d10', lines=[
    ('But it is a rule, not an explanation.', 0), ('Why exactly these orbits?', 0),
    ('Why does staying on an orbit stop the radiation?', 0), ('And with helium, the rule already fails.', 0),
    ('A deeper, new theory is needed.', 0)]),
 dict(key='ch6', k='chap', name='Part 6 · The electron is a wave', word='THE WAVE', en='PART 6', sub='Enter quantum theory',
      line='The new theory: the electron is a wave.'),
 dict(key='s11', k='c', name='Scene 11 · Standing waves', draw='d11', lines=[
    ('In 1924 came a new idea:', 0), ('the electron is not only a ball, it is also a wave.', 0),
    ('A wave circling the nucleus must join end to end,', 0), ('so only whole numbers of wavelengths fit.', 0),
    ('That leaves only certain orbits, naturally.', 0)]),
 dict(key='s12', k='c', name='Scene 12 · Why it does not collapse', draw='d12', lines=[
    ('The wave answers an even bigger question:', 0), ('why does the electron not fall into the nucleus?', 0),
    ('To pin it onto the nucleus, the wave must be narrow.', 0), ('The narrower it gets, the more restless it becomes,', 0),
    ('its energy soars, and pushes it back out.', 0), ('Pull and restlessness tie at about 0.05 nanometers.', 0),
    ('That is exactly the size of a hydrogen atom.', 0)]),
 dict(key='s13', k='c', name='Scene 13 · The Pauli rule', draw='d13', lines=[
    ('Electrons obey one more rule:', 0), ('no two electrons can share the same state.', 0),
    ('So they have to stack outward, layer by layer.', 0), ('That builds the atom’s shells,', 0),
    ('and the whole periodic table.', 0), ('Matter takes up room, so a chair can hold you.', 0),
    ('Proving this rigorously took until 1967.', 0)]),
 dict(key='recap', k='recap', name='Recap', lines=[
    ('Classical physics says every atom must collapse.', 0), ('Reality refused, and quantum theory was born.', 0),
    ('The electron is not a ball. It is a wave.', 0)], dur_min=9.5),
 dict(key='src', k='src', name='Sources', lines=[('Compiled from published physics sources.', 0)], dur_min=8.0),
]

MUSIC_FILE = 'entropy.mp3'     # Entropy - Original: constant 150 BPM, F minor, 4/4
BEAT0 = 1.175                  # time of the first beat (bar 0 of the track) in seconds
BEAT = 0.4
BAR = BEAT * 4
TRANSPOSE = -6                 # synth layer: D major -> Ab major (relative of F minor)
MUS = dict(beat0=BEAT0, bar=BAR, tr=TRANSPOSE)
BAR_KEYS = ('s1', 'ch3', 'ch5', 'ch6', 'recap')   # scenes that must start on a bar line (groove enters / breakdown / drop / outro)
def qc(x, u): return math.ceil(x / u - 1e-9) * u

def timeline():
    raw = []
    lines = []
    t = 0.0
    for i, sc in enumerate(SC):
        ls = []
        if sc['k'] == 'chap':
            dur = CHAP_DUR
            ls = [0.45]
            L = [(0.45, 2.5, sc['line'])]
        else:
            kind = 'hero' if sc['k'] == 'hero' else ('c' if sc['k'] == 'c' else sc['k'])
            cur = LEAD[kind]; L = []
            for text, hold in sc['lines']:
                d = max(2.0, 0.55 + n_chars(text) / SPEED, hold)
                d = max(BEAT * 5, math.ceil((d - 0.2) / BEAT - 1e-9) * BEAT)   # every subtitle change lands on a beat
                cur = qc(cur, BEAT)
                ls.append(cur); L.append((cur, cur + d - GAP, text))
                cur += d
            dur = cur + TAIL[kind]
            if 'dur_min' in sc:
                dur = max(dur, sc['dur_min'])
        raw.append((dur, ls, L))
    out = []
    for i, sc in enumerate(SC):
        dur, ls, L = raw[i]
        e = qc(t + dur, BEAT)                                   # every scene change lands on a beat
        if i + 1 < len(SC) and SC[i + 1]['key'] in BAR_KEYS:    # key changes land on a bar line
            e = qc(e, BAR)
        dur = e - t
        for a, b, tx in L: lines.append((i, a, b, tx))
        out.append(dict(s=round(t, 3), e=round(e, 3), ls=[round(x, 3) for x in ls], dur=round(dur, 3)))
        t = e
    return out, lines, t

TL, LINES, DUR = timeline()
IDX = {sc['key']: i for i, sc in enumerate(SC)}

def at(key, anchor):
    """anchor: ('L', i, off) | ('T', off) | ('E', off)"""
    i = IDX[key]; tl = TL[i]
    if anchor[0] == 'L': return tl['s'] + tl['ls'][anchor[1]] + anchor[2]
    if anchor[0] == 'T': return tl['s'] + anchor[1]
    return tl['e'] + anchor[1]

# ---- sound cues written by hand ([scene key, anchor, name, arg]) ----
CUE_SPEC = [
 ('hero', ('L', 1, 1.2), 'flash', None), ('hero', ('L', 3, 0.2), 'soft', None),
 ('s1', ('L', 1, 0.2), 'pop', None), ('s1', ('L', 3, 0.15), 'ding', None), ('s1', ('L', 4, 0.3), 'soft', None),
 ('s2', ('L', 2, 0.2), 'pop', None), ('s2', ('L', 3, 0.2), 'tick', 1.0),
 ('s3', ('L', 1, 0.3), 'ding', None), ('s3', ('L', 3, 0.2), 'soft', None), ('s3', ('L', 5, 0.3), 'whoosh', None),
 ('s4', ('L', 2, 0.2), 'soft', None), ('s4', ('L', 4, 0.5), 'whoosh', None),
 ('s5', ('L', 2, 0.2), 'hit', None), ('s5', ('L', 3, 0.2), 'tick', 1.0),
 ('s6', ('L', 2, 0.1), 'flash', None), ('s6', ('L', 4, 0.5), 'thump', None),
 ('s7', ('L', 2, 0.2), 'ding', None), ('s7', ('L', 3, 0.3), 'soft', None),
 ('s8', ('L', 3, 0.2), 'pop', None), ('s8', ('L', 5, 0.2), 'ding', None),
 ('s9', ('L', 3, 0.3), 'whoosh', None), ('s9', ('L', 5, 0.2), 'ding', None),
 ('s10', ('L', 3, 0.2), 'repel', None),
 ('s11', ('L', 2, 0.2), 'soft', None), ('s11', ('L', 4, 0.3), 'ding', None),
 ('s12', ('L', 4, 0.1), 'thump', None), ('s12', ('L', 5, 0.3), 'ding', None),
 ('s13', ('L', 1, 0.3), 'repel', None), ('s13', ('L', 4, 0.2), 'pop', None), ('s13', ('L', 6, 0.2), 'soft', None),
]
BED_SPEC = [
 ('wind',   'hero', ('T', 0), 'ch1', ('T', 0.3), [('hero', ('T', 0), 0.0), ('hero', ('T', 2.5), 0.10), ('hero', ('E', 0), 0.10)], 2.0, 1.2),
 ('shimmer', 's9', ('T', 0.5), 's10', ('E', 0), [('s9', ('T', 0.5), 0.0), ('s9', ('T', 6), 0.14), ('s10', ('E', 0), 0.08)], 1.5, 2.0),
 ('wind',   'recap', ('T', 0), 'src', ('T', 3.0), [('recap', ('T', 0), 0.0), ('recap', ('T', 4), 0.10), ('src', ('T', 0.3), 0.0)], 1.5, 2.5),
]
# chord per scene (index into the engine's chord table): 0 Dadd9, 1 Bm9, 2 Gmaj9, 3 Asus2, 4 F#m9, 5 Emadd9
MUSIC_SPEC = [('hero', 1), ('ch1', 1), ('s1', 2), ('s2', 0), ('ch2', 4), ('s3', 4), ('s4', 1), ('ch3', 5), ('s5', 5), ('s6', 1),
              ('ch4', 2), ('s7', 2), ('s8', 0), ('ch5', 4), ('s9', 4), ('s10', 1), ('ch6', 0), ('s11', 0), ('s12', 3), ('s13', 2), ('recap', 2), ('src', 0)]

def chords():
    segs = []
    for key, ci in MUSIC_SPEC:
        i = IDX[key]; s, e = TL[i]['s'], TL[i]['e']
        segs.append([s, e, ci])
    # merge neighbours with the same chord
    m = [segs[0]]
    for s in segs[1:]:
        if s[2] == m[-1][2]: m[-1][1] = s[1]
        else: m.append(s)
    # split anything longer than 20 s into two voicings
    out = []
    for s, e, ci in m:
        if e - s > 20:
            mid = (s + e) / 2
            out.append([s, mid, ci]); out.append([mid, e, (ci + 3) % 6])
        else: out.append([s, e, ci])
    return [[round(a, 2), round(b, 2), c] for a, b, c in out]

# ---- music plan: Entropy re-cut by whole bars: [video bar, track bar, number of bars] ----
# track map (bars of 1.6 s): 0-15 quiet intro (builds from bar 12) | 16-31 groove A | 32-33 silence | 34-65 groove B |
#                            66-69 breakdown | 70-85 mid | 86-101 climax (starts with a drop) | 102-111 outro
# story arc:  hero+ch1 intro build -> s1..ch3 groove (A then B) -> ch3..ch5 breakdown, mid, groove returns ->
#             ch5..s10 quiet reflective bed, building into the drop -> s10..recap climax -> recap/src outro
def music_plan():
    nb = lambda key: int(round(TL[IDX[key]]['s'] / BAR))
    s1, c3, c5, s10, rc = nb('s1'), nb('ch3'), nb('ch5'), nb('ch6'), nb('recap')
    total = int(math.ceil(DUR / BAR)) + 1
    seq = list(range(16 - s1, 16))                         # intro build ends on the bar before the groove
    n1 = c3 - s1; seq += list(range(16, 16 + min(16, n1)))
    seq += [34 + j % 32 for j in range(max(0, n1 - 16))]   # groove B
    n2 = c5 - c3; seq += [66, 67, 68, 69] + list(range(70, 86))
    seq += [34 + j % 32 for j in range(max(0, n2 - 20))]   # the groove comes back
    n3 = s10 - c5
    if n3 >= 18:   # quiet bed: breakdown tail (2 bars) -> intro bars ending on its quietest bar 12 -> intro 0-15 (ends on the build into the drop)
        k = n3 - 18
        seq += [67, 68] + [(13 - k + j) % 13 for j in range(k)] + list(range(16))
    else: seq += list(range(16 - n3, 16))
    n4 = rc - s10; cl = list(range(86, 102))
    if n4 >= 16:   # extra bars: the climax loops a 4-bar phrase (bars 90-93), so the drop at 86 and the last bar 101 stay in place
        e = n4 - 16; q, r = e // 4, e % 4
        seq += cl[:8] + cl[4:8] * q + (cl[8 - r:8] if r else []) + cl[8:]
    else: seq += cl[16 - n4:]
    seq += list(range(102, 112))[:max(0, total - rc)]
    segs = []
    for vb, tb in enumerate(seq):
        if segs and segs[-1][1] + segs[-1][2] == tb and segs[-1][0] + segs[-1][2] == vb: segs[-1][2] += 1
        else: segs.append([vb, tb, 1])
    return segs

# ---- bells at subtitle line starts (D major pentatonic) ----
PENT = [587.33, 659.25, 739.99, 880.0, 987.77, 1174.66, 1318.51, 1479.98]   # D5 E5 F#5 A5 B5 D6 E6 F#6
def bells():
    rnd = random.Random(7)
    out = []
    pos = 3
    seen = {}
    for (si, a, b, text) in LINES:
        sc = SC[si]
        if sc['k'] in ('chap', 'src'): continue
        step = rnd.choice([-2, -1, 1, 1, 2])
        pos = max(0, min(len(PENT) - 1, pos + step))
        if seen.get(si, 0) % 2: seen[si] += 1; continue          # only every other line gets a chime
        seen[si] = seen.get(si, 0) + 1
        s = TL[si]['s']
        tt = s + a + 0.04
        tt = round(tt / (BEAT / 2)) * (BEAT / 2)                  # chime sits on an eighth note of the music
        vel = 0.10 if sc['k'] != 'recap' else 0.08
        out.append([round(tt, 3), 'bell', [PENT[pos], vel]])
    return out

def build_cues():
    cues = []
    for key, anchor, name, arg in CUE_SPEC:
        cues.append([round(at(key, anchor), 3), name, arg])
    for i, sc in enumerate(SC):
        if sc['k'] == 'chap':
            s = TL[i]['s']
            cues.append([round(s - 1.2, 3), 'riser', None]); cues.append([round(s, 3), 'boom', None])
        elif i > 0 and SC[i - 1]['k'] != 'chap':
            cues.append([round(TL[i]['s'] - 0.45, 3), 'whoosh', None])     # soft sweep that peaks on the scene change
    cues += bells()
    cues.sort(key=lambda c: c[0])
    return cues

def build_beds():
    beds = []
    for k, a, aa, b, ab, pts, fi, fo in BED_SPEC:
        t0 = at(a, aa); t1 = at(b, ab)
        beds.append(dict(k=k, t0=round(t0, 3), t1=round(t1, 3), pts=[[round(at(s, an), 3), l] for s, an, l in pts], fi=fi, fo=fo))
    return beds

if __name__ == '__main__':
    for i, sc in enumerate(SC):
        t = TL[i]
        print(i, sc['key'], round(t['s'], 1), round(t['e'], 1), round(t['dur'], 1), t['ls'])
    print('DUR', round(DUR, 1), 'lines', len(LINES))
    for si, a, b, tx in LINES:
        if len(tx) > 52: print('LONG', len(tx), tx)
