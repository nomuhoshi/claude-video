# -*- coding: utf-8 -*-
import re
M = {
'e_qa1.js': [
("现实里，它们都好好的","In reality, they are all fine"),("经典物理 ≠ 现实","Classical physics ≠ reality"),
("'原子核', cx - 9.4","'nucleus', cx - 9.4"),("'电子', cx + (R + 3.4)","'electron', cx + (R + 3.4)"),
("正电  +","positive  +"),("负电  −","negative  −"),("'太阳'","'Sun'"),("'地球'","'Earth'"),("'像'","'like'"),
("行星绕太阳","Planets orbit the Sun"),("几乎全是空的","Mostly empty space"),
("sci(g, '6.6', '15', cx, cy + R + 4.4, 2.5, GOLD, sc, 900); tx(g, '圈 / 秒', cx + 10.5, cy + R + 4.8, 1.9, GOLD, 'left', 700, SANS, sc);",
 "sci(g, '6.6', '15', cx, cy + R + 4.4, 2.5, GOLD, sc, 900, null, ' laps / s');"),
("原子 = 体育场","atom = stadium"),("原子核 = 一粒小米","nucleus = a grain of rice"),("经典物理画出的原子","The classical picture"),
("带电的东西来回动","A charge moving back and forth"),("'电磁波'","'EM wave'"),("'手机'","'Phone'"),("'天线'","'Antenna'"),("'无线电'","'Radio'"),
("'速度'","'velocity'"),("'加速'","'accel.'"),("方向一变，就是加速","Direction changes = acceleration"),("向外辐射能量","Radiating energy outward"),
("轨道大小","Orbit size"),("转得多快","Speed"),("发出一点光，少一点能量","Emit light, lose energy"),("一圈一圈，掉向核","Loop by loop, falling inward"),("坠入原子核","Into the nucleus"),
],
'e_qa2.js': [
("氢原子 · 一个核，一个电子","Hydrogen: one nucleus, one electron"),("0.053 纳米 → 0","0.053 nm → 0"),
("'秒', 68 + 21","'s', 68 + 21"),("约六百多亿分之一秒","about a 60-billionth of a second"),("眨一次眼","One blink"),("塌了几十亿次","billions of collapses"),
("最简单的圆轨道 · 只算辐射","Simplest case: circular orbit, radiation only"),
("'你', 22","'You', 22"),
("sci(g, '7', '27', 22, 44, 2.6, GOLD, sa, 900); tx(g, '个原子', 32.6, 44.3, 1.9, GOLD, 'left', 700, SANS, sa);","sci(g, '7', '27', 22, 44, 2.6, GOLD, sa, 900, null, ' atoms');"),
("'桌子'","'Tables'"),("'大地'","'Earth'"),("'太阳'","'Sun'"),("理论预言","Theory predicts"),("实际情况","Reality"),
("sci(g, '1.6', '−11', 22.5, 31, 2.1, RED, lb, 800); tx(g, '秒就塌', 31.2, 31.2, 1.9, RED, 'left', 700, SANS, lb);","sci(g, '1.6', '−11', 26, 31, 2.1, RED, lb, 800, null, ' s to collapse');"),
("稳稳待了一百多亿年","Stable for 10+ billion years"),
("sci(g, '', '28', (xr + xg) / 2 - 2, y - 5.3, 2.2, GOLD, ga, 900, '差了 10'); tx(g, '倍', (xr + xg) / 2 + 4.0, y - 5.0, 2.0, GOLD, 'left', 900, SANS, ga);","sci(g, '', '28', (xr + xg) / 2, y - 5.3, 2.2, GOLD, ga, 900, 'off by 10', ' times');"),
("螺旋下坠 → 频率连续变 → 连续的光","Spiral → smooth frequency change → continuous light"),("氢原子发的光","Light from hydrogen"),
("按经典物理：连续的彩虹","Classical prediction: a continuous rainbow"),("实际看到：几条细线","Actually seen: a few sharp lines"),
("特定的台阶 → 特定的颜色","Specific steps → specific colors"),("'1913 年'","'1913'"),("待在轨道上：不辐射 ✓","On an orbit: no radiation ✓"),
("跳一次，放出一份光","One jump, one packet of light"),("算出来的位置","Calculated positions"),("和实测的细线对上了 ✓","Matches the measured lines ✓"),
],
'e_qa3.js': [
("'规定'","'Rule'"),("'解释'","'Explanation'"),("为什么偏偏是这几条轨道？","Why exactly these orbits?"),("为什么待在轨道上，就不辐射？","Why no radiation on an orbit?"),
("氦原子：两个电子","Helium: two electrons"),("✕ 算不准","✕ Prediction fails"),("需要一个更根本的新理论","A deeper theory is needed"),
("'1924 年'","'1924'"),("小球  →  波","Ball  →  wave"),("首尾相接 ✓","Ends meet ✓"),("3.5 个波长：接不上 ✕","3.5 wavelengths: no fit ✕"),("4 个波长：刚好 ✓","4 wavelengths: fits ✓"),
("轨道，自然只剩特定几条","Only certain orbits remain"),("电子的波","The electron wave"),("挤得越窄，越躁动","Narrower = more restless"),
("'能量'","'Energy'"),("离核距离 →","Distance from nucleus →"),("吸引：越近越低","Pull: lower when closer"),("躁动：越近越高","Restless: higher up close"),
("约 0.05 纳米","about 0.05 nm"),("最稳的位置","most stable spot"),("简化估算","Simplified estimate"),("✕ 满了","✕ Full"),("2 + 8：两层壳","2 + 8: two shells"),
("电子不肯让位，物质才有体积","Electrons won\\u2019t yield, so matter has volume"),("严格证明 · 1967 年","Rigorous proof · 1967"),
],
'e_core2.js': [
("配乐 开","Music on"),("配乐 关","Music off"),("暂停","Pause"),("重播","Replay"),("播放","Play"),("音效 开","SFX on"),("音效 关","SFX off"),
],
}
for f, lst in M.items():
    t = open(f, encoding='utf-8').read()
    for a, b in lst:
        assert a in t, (f, a)
        t = t.replace(a, b)
    open(f, 'w', encoding='utf-8').write(t)
# sci with suffix, SANS font -> Inter
t = open('e_qa1.js', encoding='utf-8').read()
old = t[t.index('  function sci('):t.index('  // the classical death spiral')]
new = '''  function sci(g, m, e, x, y, sz, col, a, wt, base, suf) {
    g.save(); if (a != null) g.globalAlpha *= a;
    var fam = SANS; wt = wt || 900;
    var bt = base != null ? base : m + ' \\u00d7 10', sf = suf || '';
    g.font = wt + ' ' + sz + 'px ' + fam; var w1 = g.measureText(bt).width;
    g.font = wt + ' ' + sz * 0.58 + 'px ' + fam; var w2 = g.measureText(e).width;
    g.font = wt + ' ' + sz * 0.8 + 'px ' + fam; var w3 = sf ? g.measureText(sf).width : 0;
    var x0 = x - (w1 + w2 + w3) / 2;
    g.fillStyle = col; g.textBaseline = 'middle'; g.textAlign = 'left';
    g.font = wt + ' ' + sz + 'px ' + fam; g.fillText(bt, x0, y);
    g.font = wt + ' ' + sz * 0.58 + 'px ' + fam; g.fillText(e, x0 + w1, y - sz * 0.38);
    if (sf) { g.font = wt + ' ' + sz * 0.8 + 'px ' + fam; g.fillText(sf, x0 + w1 + w2, y + sz * 0.04); }
    g.restore();
  }
'''
t = t.replace(old, new)
# chip: measure real text width
a = t.index('    var w = 3.4, ci;'); b = t.index('\n', a)
t = t[:a] + "    g.save(); g.font = '700 1.9px ' + SANS; var w = 3.6 + g.measureText(s).width; g.restore();" + t[b:]
open('e_qa1.js', 'w', encoding='utf-8').write(t)
h = open('e_help.js', encoding='utf-8').read()
h = h.replace('''var SANS = '"Noto Sans SC","PingFang SC","Microsoft YaHei",sans-serif';''', '''var SANS = '"Inter","Noto Sans SC",sans-serif';''')
open('e_help.js', 'w', encoding='utf-8').write(h)
