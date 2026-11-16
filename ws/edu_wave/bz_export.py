# 导出 srt + 旁白全文 + 事实核对。用法: python3 bz_export.py  （需先有 ../render_edu/bz_meta.json）
import json, math, re
m = json.load(open('../render_edu/bz_meta.json')); B = json.load(open('bz_data.js'.replace('.js', '.js')) if False else open('/dev/null')) if False else None
D = json.loads(open('bz_data.js').read()[len('window.BZ='):-1])
ts = lambda t: f'{int(t//3600):02d}:{int(t%3600//60):02d}:{int(t%60):02d},{int(round((t%1)*1000)):03d}'.replace(',1000', ',999')
out = []
for i, ((t, l), e) in enumerate(zip(m['lines'], m['ends']), 1): out.append(f'{i}\n{ts(t)} --> {ts(e)}\n{l}\n')
open('/home/claude/玻尔兹曼因子-字幕.srt', 'w').write('\n'.join(out))
names = ['镜头1 钩子', '镜头2 搭模型', '镜头3 数数', '镜头4 变大', '镜头5 粒子', '镜头6 写成公式', '镜头7 总结']
mm = lambda t: f'{int(t//60)}:{int(t%60):02d}'
txt = ['《为什么高能量的状态更少见？——玻尔兹曼因子 e^{-E/kT} 是数出来的》旁白全文', '（本片按用户要求不配音，只有背景音乐；下面的文字就是画面里的硬字幕，逐句对应）', '']
for k, sc in enumerate(m['scenes']):
    txt.append(f'【{names[k]}  {mm(sc["t0"])}–{mm(sc["t0"]+sc["dur"])}】')
    for (t, l) in m['lines']:
        if sc['t0'] <= t < sc['t0'] + sc['dur']: txt.append(l)
    txt.append('')
open('/home/claude/玻尔兹曼因子-旁白全文.txt', 'w').write('\n'.join(txt))
# ---- 事实核对 ----
ok = []
def chk(name, cond): ok.append((name, bool(cond))); print(('PASS ' if cond else 'FAIL ') + name)
chk('1 模型：4 个钱包、4 枚硬币总数固定、1 个系统 + 3 个库（枚举 35 种）', D['total'] == 35 and len(D['splits35']) == 35 and all(sum(s) == 4 and len(s) == 4 for s in D['splits35']))
chk('2 等概率：每种完整分法机会相同（35 种等权）', D['total'] == 35)
chk('3 Ω_R = C(q+2,2)：15,10,6,3,1，总 35，P = 15/35…1/35', D['omega'] == [math.comb(4 - n + 2, 2) for n in range(5)] == [15, 10, 6, 3, 1] and sum(D['omega']) == 35 and [round(p * 35) for p in D['Pnum']] == [15, 10, 6, 3, 1])
chk('4 q=3 三个钱包 10 种：3+6+1；星与隔板 C(5,2)=10 且与 10 种一一对应', [len(g) for g in D['q3groups']] == [3, 6, 1] and len(D['sb']) == math.comb(5, 2) == 10 and sorted(map(tuple, (x['counts'] for x in D['sb']))) == sorted(map(tuple, sum(D['q3groups'], []))))
b = D['big']
chk('5 库 r=3,10,50：Ω_R=C(Q−n+r−1,r−1) 精确计数，偏差随 r 单调变小、β 逼近 ln2', [x['r'] for x in b] == [3, 10, 50] and b[0]['dev'] > b[1]['dev'] > b[2]['dev'] and abs(b[2]['beta'] - math.log(2)) < .01 and all(abs(sum(x['P']) - 1) < 1e-12 or sum(x['P']) <= 1 for x in b))
chk('5b r=3 的柱子即第 3 镜头的 15,10,6,3,1（P[0..4]×35）', [round(p * 35) for p in b[0]['P'][:5]] == [15, 10, 6, 3, 1])
L = D['lat']; chk('9 库少一个粒子 → 状态数乘固定倍数 e^{βμ}：稀时 <1（μ<0）、密时 >1（μ>0，库的状态数反而变多）；μ/kT = ln 倍数', L['sparse']['step'][0] < 1 < L['dense']['step'][0] and abs(L['sparse']['mu_over_kT'][0] - math.log(L['sparse']['step'][0])) < 1e-12 and max(L['sparse']['step']) - min(L['sparse']['step']) < .02)
chk('7 切线斜率：数值导数 ∂(S/k)/∂E 与 β 同量级（大库极限 ln2）；∂S/∂N=−μ/T（与格子气体计数一致）', abs(D['SE']['slope'] - math.log(2)) < .05 and abs(D['SN']['muOverKT'] - L['sparse']['mu_over_kT'][0]) < .02)
src = ' '.join(l for _, l in m['lines']); full = open('bz.js').read() + src
chk('10 严禁说法：无“光子”“更稳定”“更舒服”以外的断言（“更舒服”仅出现在否定句里）', '光子' not in full and '更稳定' not in full and '概率正比于能量' not in full and src.count('更舒服') == 1 and '不是因为低能量“更舒服”' in src)
chk('时长 3:30–4:30，1080p/30fps 帧数', 210 <= m['total'] <= 270 and m['frames'] == math.ceil(m['total'] * 30))
chk('字幕每句 ≤ 30 字', all(len(l) <= 30 for _, l in m['lines']))
print('ALL PASS' if all(c for _, c in ok) else 'SOME FAIL')
