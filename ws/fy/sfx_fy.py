# -*- coding: utf-8 -*-
# 学术深度：克制的音效。公式/图出现用轻 ping，关键句用重音。
_keys = ['s%d' % i for i in range(1, 25)]
for _i, _k in enumerate(_keys):
    try:
        put('ui_ping_%d' % (1 + _i % 3), at(_k, 1, 0.5), 0.22)
        put('ui_ping_%d' % (1 + (_i + 1) % 3), at(_k, 3, 0.4), 0.16)
    except Exception:
        pass
# 关键时刻
put('hit_drum2', at('hero', 4, 0.1), 0.7); put('slam', at('hero', 4, 0.1), 0.35); SHAKE.append((at('hero', 4, 0.1), 8))
put('hit_drum2', at('hero', 5, 0.2), 0.6)
put('hit_drum2', at('s15', 3, 0.9), 0.8); put('slam', at('s15', 3, 0.9), 0.4); SHAKE.append((at('s15', 3, 0.9), 8))
put('hit_drum2', at('s17', 3, 0.9), 0.6)
put('sub_drop', at('s17', 3, 0.9), 0.35)
put('hit_drum2', at('s19', 6, 0.8), 0.7); put('slam', at('s19', 6, 0.8), 0.35)
put('hit_drum', at('s21', 4, 0.4), 0.8); put('slam', at('s21', 4, 0.4), 0.5); SHAKE.append((at('s21', 4, 0.4), 10))
put('whoosh_swing', at('s16', 0, 0.0), 0.35)
put('hit_drum', at('recap', 4, 0.1), 0.85); put('sub_drop', at('recap', 4, 0.1), 0.5); SHAKE.append((at('recap', 4, 0.1), 10))
put('whoosh_swing', S('src') - 0.3, 0.3)
