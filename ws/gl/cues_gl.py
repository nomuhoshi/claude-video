# -*- coding: utf-8 -*-
# Sound / impact design for the Galileo cut. Executed inside tl_gl.py (uses put, hit, counter, slam, SHAKE, at, S, E, chaps).
# chapter cards: riser into the card, a drum + slam + sub drop on it
for c in chaps: hit(c['s'] + 0.35, 0.95, 14, True); put('riser', c['s'] - 1.4, 0.35); put('sub_drop', c['s'] + 0.35, 0.55)
# hero: a held low note, the paper, the stamp on "the earth moves", the name
put('sub_pad', 0.2, 0.5); put('sparkle_bed', at('hero', 2, 0.2), 0.3)
hit(at('hero', 3, 0.9), 0.8, 8)
slam('伽利略', at('hero', 5, 0.15), 1300, 410, 190, '#f2d39a', E('hero') - 0.1, 'GALILEO GALILEI · 1564–1642'); hit(at('hero', 5, 0.15), 1.0, 16, True); put('sub_drop', at('hero', 5, 0.15), 0.7)

# ---------------- s1: the octave needs four times the weight ----------------
counter('挂的重量', 1, 4, '倍', at('s1', 4, 0.2), at('s1', 4, 1.7), at('s1', 6, -0.1), col=None, land='#f2c66b', pw=1.6); hit(at('s1', 4, 1.7), 0.7, 8)
put('ui_ping_2', at('s1', 3, 0.3), 0.3)
# s2: the lamp
put('ui_ping_2', at('s2', 4, 0.4), 0.3); put('ui_ping_1', at('s2', 5, 0.3), 0.3)
# s3: two thousand years of "heavier falls faster", then the rope trick
put('whoosh_swing', at('s3', 5, 0.3), 0.4); hit(at('s3', 8, 1.0), 0.8, 10); hit(at('s3', 9, 0.3), 1.0, 14, True); put('sub_drop', at('s3', 9, 0.3), 0.6)
# s4: 1, 3, 5, 7
for k in range(4): put('ui_ping_%d' % (1 + k % 3), at('s4', 9, 0.35 + 0.42 * k), 0.35)
hit(at('s4', 7, 0.3), 0.6, 6)
# s5: grinding lenses: 3x, 9x, 20x, then up at the sky
counter('望远镜倍数', 3, 20, '倍', at('s5', 4, 0.2), at('s5', 6, 1.6), at('s5', 7, -0.2), col=None, land='#f2c66b', pw=1.5); hit(at('s5', 6, 1.6), 0.7, 8)
put('riser', at('s5', 7, -1.0), 0.4); hit(at('s5', 7, 0.3), 1.0, 14, True); put('sub_drop', at('s5', 7, 0.3), 0.6)
# s6: the Moon is mountains and craters
put('riser', at('s6', 4, -0.9), 0.35); hit(at('s6', 4, 0.3), 0.9, 12, True)
put('ui_ping_1', at('s6', 6, 0.3), 0.3); put('ui_ping_2', at('s6', 7, 0.3), 0.3); put('ui_ping_3', at('s6', 8, 0.3), 0.4)
# s7: ten times more stars
counter('看到的星星', 1, 10, '倍', at('s7', 4, 0.3), at('s7', 5, 1.2), E('s7') - 0.1, col=None, land='#f2c66b', pw=1.5); hit(at('s7', 5, 1.2), 0.9, 10, True)
# s8: Jupiter's moons; the fourth point lands on the music's peak at 200.0 s
for k in range(3): put('ui_ping_%d' % (1 + k), at('s8', 5, 0.2 + 0.6 * k), 0.3)
put('riser', 198.9, 0.4)
counter('木星旁的亮点', 3, 4, '个', at('s8', 6, 0.3), 200.0, at('s8', 8, -0.1), col=None, land='#7fe0a0', pw=1.0, ticks=False)
hit(200.0, 1.0, 16, True); put('sub_drop', 200.0, 0.7); put('data_burst', 200.0, 0.35)
hit(at('s8', 7, 0.3), 0.6, 6)
hit(at('s8', 9, 0.2), 1.0, 14, True); put('sub_drop', at('s8', 9, 0.2), 0.8)
# s9: the book, the Medici, Kepler's letter
put('ui_ping_2', at('s9', 1, 0.3), 0.35); put('sparkle_bed', at('s9', 4, 0.2), 0.3); hit(at('s9', 5, 0.3), 0.6, 6)
put('ui_ping_3', at('s9', 7, 0.4), 0.4); hit(at('s9', 9, 0.2), 0.7, 8)
# s10: Venus has phases and the old model cannot have a full one
put('ui_ping_1', at('s10', 1, 0.3), 0.3); hit(at('s10', 5, 0.4), 0.8, 10, True); hit(at('s10', 6, 0.3), 1.0, 14, True); put('sub_drop', at('s10', 6, 0.3), 0.6)

# s11: the 1616 ruling and the warning
put('riser', at('s11', 5, -0.2), 0.4)
hit(at('s11', 5, 0.7), 1.0, 16, True); put('sub_drop', at('s11', 5, 0.7), 0.7)
slam('异端', at('s11', 5, 0.7), 1500, 360, 170, '#ef5b43', at('s11', 6, -0.2))
for k in range(3): put('hit_cane' if k % 2 == 0 else 'hit_cane2', at('s11', 7, 0.3 + 0.55 * k) - 0.24, 0.7, -0.1 + 0.1 * k); SHAKE.append((at('s11', 7, 0.3 + 0.55 * k), 5))
hit(at('s11', 8, 1.1), 0.8, 10)
# s12: silence, the pope, the Dialogue, the ban
put('sub_pad', at('s12', 0, 0.0), 0.4); put('ui_ping_2', at('s12', 1, 0.5), 0.3); hit(at('s12', 3, 0.4), 0.7, 8)
put('ui_ping_1', at('s12', 7, 0.5), 0.3)
hit(at('s12', 8, 1.0), 1.0, 16, True); put('sub_drop', at('s12', 8, 1.0), 0.7); slam('叫停', at('s12', 8, 1.0), 1500, 360, 160, '#ef5b43', E('s12') - 0.1)
# s13: his own mistakes
put('ui_ping_1', at('s13', 0, 0.5), 0.3); hit(at('s13', 3, 0.2), 0.9, 12, True)
slam('错的', at('s13', 3, 0.2), 1500, 360, 140, '#ef5b43', at('s13', 4, -0.2)); put('ui_ping_2', at('s13', 5, 0.5), 0.3)
# s14: the trial
put('sub_pad', at('s14', 0, 0.0), 0.45); put('ui_ping_2', at('s14', 1, 0.5), 0.3)
hit(at('s14', 2, 0.3), 0.9, 12, True); put('sub_drop', at('s14', 2, 0.3), 0.6)
hit(at('s14', 3, 0.0), 1.0, 18, True); put('sub_drop', at('s14', 3, 0.0), 0.9)
put('downer', at('s14', 4, 0.2), 0.5)
# s15: the sentence that was never recorded
put('ui_ping_2', at('s15', 0, 0.3), 0.35)
put('hit_cane', at('s15', 1, 0.7) - 0.24, 0.6); SHAKE.append((at('s15', 1, 0.7), 5)); put('hit_cane2', at('s15', 2, 0.7) - 0.24, 0.6); SHAKE.append((at('s15', 2, 0.7), 5))
put('riser', at('s15', 3, -0.5), 0.35); hit(at('s15', 3, 0.5), 0.9, 12, True); put('sub_drop', at('s15', 4, 0.2), 0.6)

# s16: house arrest, the daughter's letters
counter('软禁', 0, 8, '年多', at('s16', 2, 0.0), at('s16', 8, 0.0), E('s16') - 0.1, col=None, land='#ff9d6e', pw=1.0)
put('sub_pad', at('s16', 0, 0.0), 0.4); put('hit_cane', at('s16', 2, 0.5) - 0.24, 0.55, -0.1); put('hit_cane2', at('s16', 2, 1.4) - 0.24, 0.55); put('hit_cane', at('s16', 3, 0.5) - 0.24, 0.55, 0.1)
put('ui_ping_1', at('s16', 7, 0.3), 0.3); put('ui_ping_2', at('s16', 8, 0.3), 0.3)
put('downer', at('s16', 9, 0.3), 0.6); hit(at('s16', 9, 0.5), 0.6, 4)
# s17: blindness, quiet
put('sub_pad', at('s17', 0, 0.0), 0.5); put('downer', at('s17', 2, 0.3), 0.6); hit(at('s17', 2, 0.3), 0.7, 4); hit(at('s17', 4, 0.3), 0.7, 4)
# s18: the manuscript leaves Italy
put('ui_ping_1', at('s18', 0, 0.4), 0.3); hit(at('s18', 1, 0.3), 0.8, 10, True); put('whoosh_swing', at('s18', 3, 0.2), 0.4)
put('ui_ping_2', at('s18', 4, 0.9), 0.35); hit(at('s18', 5, 0.2), 0.9, 12, True); put('sub_drop', at('s18', 5, 0.2), 0.5)
for k in range(3): put('ui_ping_%d' % (1 + k), at('s18', 7, 0.55 * k), 0.35)
put('riser', at('s18', 9, -0.8), 0.4); hit(at('s18', 9, 3.2), 0.9, 12, True)
# s19: the death, the burial, the late apology
put('sub_drop', at('s19', 0, 0.2), 0.6); hit(at('s19', 0, 0.2), 0.7, 6); put('downer', at('s19', 1, 1.0), 0.5)
put('downer', at('s19', 3, 0.3), 0.45); put('ui_ping_2', at('s19', 4, 0.3), 0.35); hit(at('s19', 5, 0.4), 0.7, 8)
put('riser', at('s19', 6, -0.8), 0.3); hit(at('s19', 7, 0.1), 0.9, 12, True); put('sub_drop', at('s19', 7, 0.1), 0.6)
# s20: Newton
put('sparkle_bed', at('s20', 1, 0.3), 0.35); put('ui_ping_2', at('s20', 3, 0.4), 0.35); hit(at('s20', 5, 0.2), 0.8, 10, True)
put('riser', at('s20', 6, -0.5), 0.3); put('ui_ping_3', at('s20', 7, 2.4), 0.4); hit(at('s20', 7, 2.4), 0.8, 10, True)
# s21: the hammer and the feather land together at 477.33 s (music peak), then quiet
put('riser', at('s21', 5, -2.6), 0.4); hit(at('s21', 5, 0.0), 1.0, 18, True); put('sub_drop', at('s21', 5, 0.0), 1.0)
put('sparkle_bed', at('s21', 6, 0.4), 0.3)
# recap
for k in range(4): put('ui_ping_3', at('recap', k, 0.2), 0.35)
put('sub_drop', at('recap', 3, 1.0), 0.8)
