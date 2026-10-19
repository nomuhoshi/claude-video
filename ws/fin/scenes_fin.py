# scene markup, subtitle lines, cues, counts for the AI-data-center-financing video (300 s timeline)
def chap(start, end, word, en, sub):
    return f'''
        <div class="scene chap" data-start="{start}" data-end="{end}">
          <i class="vline" data-a="0,0.5"></i>
          <div class="flash" data-a="0.35,0.8"></div>
          <div class="parts" data-a="0.35,2.6"></div>
          <div class="wordbox"><span class="word" data-a="0.35,0.4">{word}</span></div>
          <p class="en" data-a="0.9,0.6">{en}</p>
          <p class="csub" data-a="1.2,0.6">{sub}</p>
        </div>
'''

S = []
# ---- 0 opening
S.append('''
        <div class="scene s0" data-start="0" data-end="8.161">
          <p class="tag"><b>产业分析</b> · AI 数据中心融资</p>
          <h2 class="hero" data-a="0.15,0.9">先花钱，后赚钱</h2>
          <p class="hero-sub" data-a="1.1,0.9">AI 数据中心，是怎么靠借钱建起来的</p>
          <div class="fl">
            <p class="fc g" data-a="4.3,0.5">资本开支</p><p class="fa" data-a="4.9,0.4">→</p>
            <p class="fc i" data-a="5.4,0.5">发债 · 贷款</p><p class="fa" data-a="6.0,0.4">→</p>
            <p class="fc" data-a="6.5,0.5">收入 · 回报</p>
          </div>
          <p class="ht" data-a="2.4,0.7"><b>#FinTalk财智新声#</b></p>
          <p class="src" style="left:14cqw;right:14cqw">信息整理，不构成投资建议 · 数据截至 2026-10-15</p>
        </div>
''')
S.append(chap(8.161, 10.711, '天价账单', 'THE BILL', '先看钱有多大'))
# ---- 2  scene 1: the bill
S.append('''
        <div class="scene s1" data-start="10.711" data-end="42.205">
          <p class="tag"><b>第一幕</b> · 天价账单</p>
          <p class="hd" data-a="0.3,0.7">资本开支：预计<em>一年翻一倍</em></p>
          <div class="bars2" style="top:15cqw;height:22cqw;width:50cqw">
            <div class="bc" style="left:3cqw;--h:6.1cqw" data-a="1.0,0.9"><i class="b"></i><p class="v">4,920</p><p class="m">2025<small>估算</small></p></div>
            <div class="bc" style="left:14cqw;--h:12.5cqw" data-a="3.6,0.9"><i class="b"></i><p class="v">10,090</p><p class="m">2026<small>估算</small></p></div>
            <div class="bc" style="left:25cqw;--h:17.9cqw" data-a="7.6,0.9"><i class="b"></i><p class="v">14,470</p><p class="m">2027<small>估算</small></p></div>
            <div class="bc" style="left:36cqw;--h:20cqw" data-a="9.6,0.9"><i class="b"></i><p class="v">16,190</p><p class="m">2028<small>估算</small></p></div>
          </div>
          <p class="nt" style="left:6cqw;top:12.8cqw;font-size:1.5cqw;color:var(--dim)" data-a="1.0,0.6">大型云厂商资本开支 · 亿美元</p>
          <p class="st" style="top:12.5cqw" data-a="10.4,0.6"><span class="n" data-a="10.4,1.4" data-count="4.1" data-dec="1">0.0</span><span class="u">万亿美元</span><span class="l">2026–28 三年累计；此前六年约 1.29 万亿</span></p>
          <p class="st" style="top:23.3cqw" data-a="14.4,0.6"><span class="n" data-a="14.4,1.4" data-count="3" data-dec="0">0</span><span class="u">万亿美元以上</span><span class="l">数据中心产业未来几年总投入；含电力口径超 5 万亿</span></p>
          <p class="st" style="top:34.1cqw" data-a="23.4,0.6"><span class="n" data-a="23.4,1.4" data-count="102" data-dec="0">0</span><span class="u">%</span><span class="l">2026 年资本开支 ÷ 云收入（三家最大云厂商）</span></p>
          <p class="src">来源：瑞银估算（24/7 Wall St，2026-08-22）；彭博社/Insurance Journal，2026-02。各机构口径不同，数字用来看量级。</p>
        </div>
''')
S.append(chap(42.205, 44.755, '钱从哪来', 'WHERE FROM', '五层资金'))
# ---- 4  scene 2: five layers
def tier(i, top, nm, ds, nu, small, a, hl=False):
    return f'''          <div class="tier{' hl' if hl else ''}" style="top:{top}cqw" data-a="{a},0.6"><span class="i">0{i}</span><span class="nm">{nm}</span><span class="ds">{ds}</span><span class="nu">{nu}<small>{small}</small></span></div>\n'''
t2 = ''
t2 += tier(1, 7.8, '自有现金', '经营现金流，大公司先用它', '成本最低', '不用还本付息', 1.0)
t2 += tier(2, 14.2, '投资级债券', '信用好，利息低', '约 930 亿美元', '2025 年 · 四家公司', 7.8)
t2 += tier(3, 20.6, '项目贷款', '银行给单个数据中心放款', '约 1,700 亿美元', '2025 年 · 同比 +57%', 16.3)
t2 += tier(4, 27.0, '证券化', '把租金打包成可交易的债券', '约 800 亿美元', '存量 · 不到 5 年增长 8 倍多', 24.9)
t2 += tier(5, 33.4, '私募信贷', '绕开银行与公开市场的直接贷款', '超 2,000 亿美元', 'AI 相关贷款余额', 33.4, True)
S.append(f'''
        <div class="scene s2" data-start="44.755" data-end="93.271">
          <p class="tag"><b>第二幕</b> · 钱的五层</p>
{t2}          <i class="gbar" data-a="42.2,1.4"></i>
          <p class="gcap" data-a="42.6,0.8"><span>内层 · 便宜 · 看得清</span><span>外层 · 更贵 · 更难看清</span></p>
          <p class="src">来源：Insurance Journal/彭博社（2026-02）；路透社（2025-11-05）。除第 1 层外均为 2025 年或报道时点的数字。</p>
        </div>
''')
S.append(chap(93.271, 95.821, '借钱的花样', 'DEBT TOOLS', '同样是借钱，差别很大'))
# ---- 6  scene 3: bonds
def rt(top, name, sub, a, bar, label, cls=''):
    return f'''          <div class="rt" style="top:{top}cqw;width:62.6cqw" data-a="{a},0.5"><p class="lb">{name}<small>{sub}</small></p><div class="tr">{bar}{label}</div></div>\n'''
r3 = ''
r3 += rt(14, '投资级债券', '五年期', 0.8, '<i class="br c" style="left:17.84cqw;--w:2.23cqw" data-a="1.2,0.8"></i>', '<p class="vv" style="left:21.2cqw" data-a="1.8,0.5">约 4% – 4.5%</p>')
r3 += rt(22.5, '高收益债', '“垃圾债”', 7.4, '<i class="br h" style="left:31.22cqw;--w:8.92cqw" data-a="7.8,0.8"></i>', '<p class="vv" style="right:14.4cqw" data-a="8.4,0.5">约 7% – 9%</p>')
r3 += rt(31, '可转债', '一笔 22.5 亿美元的例子', 14.4, '<i class="br" style="left:7.35cqw;--w:0.9cqw" data-a="14.8,0.8"></i>', '<p class="vv" style="left:9.4cqw" data-a="15.4,0.5">1.75% · 债主可换股</p>')
ax = ''.join(f'<i style="left:{p*4.46:.2f}cqw"></i><span style="left:{p*4.46:.2f}cqw">{p}%</span>' for p in (0, 2, 4, 6, 8, 10))
grid = ''.join(f'<i class="rgrid" style="left:{26+p*4.46:.2f}cqw" data-a="0.8,0.8"></i>' for p in (2, 4, 6, 8, 10))
S.append(f'''
        <div class="scene s3" data-start="95.821" data-end="123.06">
          <p class="tag"><b>第三幕</b> · 借钱的花样</p>
          <p class="hd" data-a="0.2,0.7">信用越弱，<em>利息越高</em></p>
          {grid}
{r3}          <div class="rax" data-a="0.8,0.6">{ax}</div>
          <p class="st" style="left:75cqw;width:20cqw;top:14cqw" data-a="11.0,0.6"><span class="n" style="font-size:4.4cqw" data-a="11.0,1.4" data-count="70" data-dec="0">0</span><span class="u">亿美元</span><span class="l">2025 年三笔专为数据中心发的高收益债</span></p>
          <p class="st" style="left:75cqw;width:20cqw;top:28cqw" data-a="17.0,0.6"><span class="n" style="font-size:4.4cqw" data-a="17.0,1.4" data-count="1670" data-dec="0">0</span><span class="u">亿美元</span><span class="l">2025 年全球可转债发行量，24 年来最高</span></p>
          <p class="src">来源：Insurance Journal/彭博社（2026-02）。利率为报道中的大致区间，不是实时价格；图为示意。</p>
        </div>
''')
S.append(chap(123.06, 125.61, '租约里的债', 'LEASES & SPV', '大公司账上看不全'))
# ---- 8  scene 4: SPV structure
S.append('''
        <div class="scene s4" data-start="125.61" data-end="157.104">
          <p class="tag"><b>第四幕</b> · 租约里的债</p>
          <div class="bx i" style="left:6cqw;top:14cqw;width:20cqw" data-a="0.6,0.6"><b>科技公司</b><small>使用方 · 租户</small></div>
          <div class="bx g" style="left:40cqw;top:14cqw;width:20cqw" data-a="1.6,0.6"><b>专用项目公司</b><small>SPV · 借款并建设</small></div>
          <i class="ah r" style="left:26cqw;top:18.1cqw;--w:14cqw" data-a="4.4,0.8"></i>
          <p class="al i" style="left:26cqw;width:14cqw;top:15.4cqw" data-a="4.9,0.5">租约 + 残值担保</p>
          <div class="bx" style="left:74cqw;top:14cqw;width:20cqw" data-a="8.0,0.6"><b>放款人</b><small>银行 · 保险 · 债券投资者</small></div>
          <i class="ah l" style="right:26cqw;top:18.1cqw;--w:14cqw" data-a="8.9,0.8"></i>
          <p class="al g" style="left:59.5cqw;width:15cqw;top:15.4cqw" data-a="9.4,0.5">借款 约 270 亿美元</p>
          <div class="bx" style="left:40cqw;top:30cqw;width:20cqw" data-a="10.6,0.6"><b>投资机构</b><small>出资方</small></div>
          <i class="av" style="left:49.86cqw;bottom:26.25cqw;--w:7.6cqw" data-a="11.6,0.7"></i>
          <p class="al o" style="left:51.5cqw;width:14cqw;top:24.4cqw;text-align:left" data-a="12.1,0.5">股权 约 25 亿美元</p>
          <p class="nb" style="left:6cqw;top:30.6cqw;width:28cqw" data-a="16.0,0.6">持股：投资机构 <b>80%</b>，使用方 <b>20%</b></p>
          <p class="nb" style="left:66cqw;top:30.6cqw;width:28cqw" data-a="24.0,0.6">评级机构：按<b>租赁负债</b>处理，不算借款</p>
          <p class="src">来源：Insurance Journal/彭博社（2026-02），某大型园区的融资案例，视频不点名公司。图为示意。</p>
        </div>
''')
S.append(chap(157.104, 159.654, '私募与保险', 'PRIVATE CREDIT', '更外一层的放款人'))
# ---- 10  scene 5: private credit
S.append('''
        <div class="scene s5" data-start="159.654" data-end="190">
          <p class="tag"><b>第五幕</b> · 私募与保险</p>
          <p class="hd" data-a="0.3,0.7">新的放款人，<em>越来越重要</em></p>
          <div class="ch2" style="top:16cqw;height:22cqw;width:50cqw" data-a="7.6,0.5">
            <div class="pb" style="left:3cqw;--h:2.9cqw;--h2:0cqw" data-a="8.0,0.9"><i class="b c"></i><p class="v">&gt;2,000</p><p class="m">私募贷款<small>现在</small></p></div>
            <div class="pb" style="left:17cqw;--h:4.4cqw;--h2:4.4cqw" data-a="11.0,0.9"><i class="b c"></i><i class="x"></i><p class="v">3,000–6,000</p><p class="m">私募贷款<small>2030 · 国际清算银行估计</small></p></div>
            <div class="pb" style="left:34cqw;--h:11cqw;--h2:11cqw" data-a="16.0,0.9"><i class="b c"></i><i class="x"></i><p class="v">约 15,000</p><p class="m">建设资金需求<small>至 2028 年 · 亿美元</small></p></div>
          </div>
          <p class="s5k" style="left:64cqw;top:13cqw;width:30cqw" data-a="1.0,0.7"><span class="k">INSURERS · 保险资金</span><span class="t">15–20 年</span><span class="d">常见租约期限：期限长、租户信用好，保险公司偏爱。</span></p>
          <p class="s5k" style="left:64cqw;top:27cqw;width:30cqw" data-a="16.4,0.7"><span class="k">估计 · 至 2028 年</span><span class="t">过半</span><span class="d">约 1.5 万亿美元建设资金里，私募信贷可能出一半以上。</span></p>
          <p class="src">来源：Insurance Journal/彭博社（2026-02）；路透社（2025-11-05）。2030 年和 2028 年均为机构估计，亿美元；图为示意，三根柱同一刻度。</p>
        </div>
''')
# ---- 11  scene 6: risks
def rk(i, left, top, k, t, d, a):
    return f'''          <p class="rkc" style="left:{left}cqw;top:{top}cqw" data-a="{a},0.7"><span class="k">RISK 0{i} · {k}</span><span class="t">{t}</span><span class="d">{d}</span></p>\n'''
rks = rk(1, 6, 13.3, '设备过时', '债还没还完，设备先旧了', '芯片贷款期限通常约五年；新一代出现，旧设备可能贬得更快。', 7.3)
rks += rk(2, 54, 13.3, '再融资', '到期才还本，借新还旧', '有些债到期才一次还本，那时收入与利率若不配合，续借更难。', 14.5)
rks += rk(3, 6, 28.8, '租户续约', '租约不续，楼就空了', '长期租约是放款的底气；租户离开、供过于求，就会空置。', 21.5)
rks += rk(4, 54, 28.8, '同涨同跌', '债券也开始看科技的脸色', '债券组合与科技股越来越同向；七大科技约占标普 500 市值的三分之一。', 27.0)
S.append(f'''
        <div class="scene s6" data-start="190" data-end="220.937">
          <p class="tag"><b>第六幕</b> · 风险在哪</p>
          <p class="hd" style="font-size:3.5cqw" data-a="0.3,0.7">借钱建楼的前提：<em>收入能覆盖利息和本金</em></p>
{rks}          <p class="src">来源：Insurance Journal/彭博社（2026-02）列出的风险点；它们是“可能发生的”，不是已经发生的事实。</p>
        </div>
''')
S.append(chap(220.937, 223.487, '怎么观察', 'WHAT TO WATCH', '四个可以自己查的信号'))
# ---- 13  scene 7: signals
def sg(i, top, nm, ds, a):
    return f'''          <div class="sg" style="top:{top}cqw" data-a="{a},0.6"><span class="i">0{i}</span><span class="nm">{nm}<span class="ds">{ds}</span></span></div>\n'''
sgs = sg(1, 9, '云收入增速 vs 资本开支增速', '谁更快，决定这笔账何时转正', 8.3)
sgs += sg(2, 15.8, '新债发行量 · 信用利差', '利差走阔，放款人要求更高补偿', 17.3)
sgs += sg(3, 22.6, '项目债 · 证券化产品价格', '看压力有没有传到放款人那边', 26.3)
sgs += sg(4, 29.4, '租约续签 · 在手订单', '长期租约，是整条链的底座', 29.8)
S.append(f'''
        <div class="scene s7" data-start="223.487" data-end="270">
          <p class="tag"><b>终幕</b> · 怎么观察</p>
          <p class="disc" data-a="0.4,0.6">信息整理，不构成投资建议</p>
{sgs}          <p class="iff y" style="top:9cqw" data-a="35.4,0.7"><span class="k">IF · 收入增速追上了投入</span><span class="t">未来现金流，换来今天的产能</span><span class="d">债务压力，随收入增长被慢慢消化。</span></p>
          <p class="iff n" style="top:22cqw" data-a="39.0,0.7"><span class="k">IF · 没追上</span><span class="t">利息和折旧，一起压在利润上</span><span class="d">利差走阔、续借变难，压力传向放款人。</span></p>
          <p class="qq" data-a="42.6,0.7">你觉得，这笔账最后靠什么还？</p>
        </div>
''')
# ---- 14 recap
S.append('''
        <div class="scene s14" data-start="270" data-end="282">
          <p class="tag"><b>回头看</b></p>
          <h2 class="hd" data-a="0.2,0.7">先花钱，后赚钱，<em>中间隔着一座债的桥</em></h2>
          <div class="tl"><i data-a="0.5,8.5"></i></div>
          <div class="dot2" style="left:10%" data-a="0.6,0.5"></div>
          <div class="dot2" style="left:30%" data-a="2.4,0.5"></div>
          <div class="dot2" style="left:50%" data-a="4.2,0.5"></div>
          <div class="dot2" style="left:70%" data-a="6,0.5"></div>
          <div class="dot2" style="left:90%" data-a="8,0.5"></div>
          <div class="node" style="left:10%" data-a="0.6,0.7"><p class="y">花钱</p><p class="h">资本开支上万亿</p><p class="d">2026 估算约 1 万亿</p></div>
          <div class="node dn" style="left:30%" data-a="2.4,0.7"><p class="y">现金</p><p class="h">先用自己的</p><p class="d">不够再往外借</p></div>
          <div class="node" style="left:50%" data-a="4.2,0.7"><p class="y">借钱</p><p class="h">债券 · 项目贷款</p><p class="d">年发债两三千亿美元</p></div>
          <div class="node dn" style="left:70%" data-a="6,0.7"><p class="y">搭桥</p><p class="h">项目公司 · 私募</p><p class="d">越往外越难看清</p></div>
          <div class="node" style="left:90%" data-a="8,0.7"><p class="y">还钱</p><p class="h">靠未来的收入</p><p class="d">设备 · 利率 · 续约</p></div>
        </div>
''')
SRC = [
    ('彭博社：3 万亿美元的数据中心融资', 'insurancejournal.com/news/international/2026/02/03/856623.htm'),
    ('UBS 估算：云厂商资本开支', 'finance.yahoo.com/technology/ai/articles/ai-absurd-spending-boom-hyperscalers-162709082.html'),
    ('Futurum：2026 资本开支', 'futurumgroup.com/insights/ai-capex-2026-the-690b-infrastructure-sprint/'),
    ('路透社：五个债务热点（Tiger 转载）', 'itiger.com/news/2581711097'),
    ('Deep News：AI 杠杆的积累（Tiger）', 'itiger.com/news/1195483736'),
]
li = '\n            '.join(f'<li data-a="{0.25 + 0.16 * i:.2f},0.5"><b>{n}</b><span>{u}</span></li>' for i, (n, u) in enumerate(SRC))
S.append(f'''
        <div class="scene s15" data-start="282" data-end="300">
          <p class="tag"><b>资料来源</b> · SOURCES</p>
          <ul class="srclist">
            {li}
          </ul>
          <p class="foot" data-a="2.8,0.6">信息整理，不构成投资建议 · 数据截至 2026-10-15</p>
        </div>
''')

NAMES = ['开场', '章节 · 天价账单', '第一幕 · 天价账单', '章节 · 钱从哪来', '第二幕 · 钱的五层', '章节 · 借钱的花样', '第三幕 · 借钱的花样',
         '章节 · 租约里的债', '第四幕 · 租约里的债', '章节 · 私募与保险', '第五幕 · 私募与保险', '第六幕 · 风险在哪', '章节 · 怎么观察', '终幕 · 怎么观察', '回头看', '资料来源']

RAW = [
 [0, 0, 4.2, '盖 AI 数据中心，要花上万亿美元，越来越多靠借钱。'],
 [0, 4.2, 8.1, '先花钱，后赚钱：这笔账是怎么算的？风险在哪？'],
 [1, 0.45, 2.5, '先看账单有多大。'],
 [2, 0.3, 7, '据瑞银估算，大型云厂商的资本开支，2025 年约 4,920 亿美元，2026 年约 1 万亿。'],
 [2, 7, 14, '2027、2028 年继续上升。2026 到 2028 年累计约 4.1 万亿，是此前六年的三倍多。'],
 [2, 14, 21, '整个数据中心产业，据摩根士丹利和穆迪估计，未来几年要花 3 万亿美元以上。'],
 [2, 21, 27.5, '瑞银估算：2026 年三家最大云厂商的资本开支，约等于云收入的 102%。'],
 [2, 27.5, 31.4, '钱先花出去，收入要等机器装好之后才来。'],
 [3, 0.45, 2.5, '那么，钱从哪来？'],
 [4, 0.3, 7.5, '可以想成五层，一层比一层复杂。第一层，是自己赚的现金，成本最低。'],
 [4, 7.5, 16, '第二层，发债。2025 年四家大公司借了约 930 亿美元，约占当年投资级债券发行量的 6%。'],
 [4, 16, 24.5, '第三层，项目贷款：银行给单个数据中心放款。2025 年约 1,700 亿美元，同比增长 57%。'],
 [4, 24.5, 33, '第四层，证券化：把数据中心的租金打包成债券。规模约 800 亿美元，不到五年增长八倍多。'],
 [4, 33, 42, '第五层，私募信贷：绕开银行和公开市场的直接贷款。投向 AI 相关公司的余额超过 2,000 亿美元。'],
 [4, 42, 48.2, '越往外，利率越高，也越难看清：到底谁欠了多少。'],
 [5, 0.45, 2.5, '同样是借钱，差别很大。'],
 [6, 0.2, 7, '先看债券。信用越好，利息越低：投资级公司的五年期债券，利率约 4% 到 4.5%。'],
 [6, 7, 14, '信用弱些的项目发高收益债，利率约 7% 到 9%。2025 年有三笔约 70 亿美元，专门给数据中心筹钱。'],
 [6, 14, 21, '一笔 22.5 亿美元的可转债，利息只有 1.75%，债主可换股。2025 年全球可转债发行创 24 年新高。'],
 [6, 21, 27.1, '便宜的利息，是用未来的股权换的。方式不同，代价也不同。'],
 [7, 0.45, 2.5, '有些债，藏在租约里。'],
 [8, 0.3, 7.5, '大公司不一定自己借钱盖楼。常见做法是设一家专用项目公司，由它借钱建设，再租给大公司。'],
 [8, 7.5, 15, '一个典型案例：一座园区，银行安排了超过 270 亿美元的债务，投资机构只出了约 25 亿美元股权。'],
 [8, 15, 23, '投资机构占 80%，使用方占 20%；大公司用长期租约和一份残值担保，撑住这个项目。'],
 [8, 23, 31.4, '评级机构把它算作租赁负债，不算借款。想看全貌，就要连租约承诺一起看。'],
 [9, 0.45, 2.5, '再往外，是私募和保险。'],
 [10, 0.4, 7.5, '保险公司偏爱这类资产：期限长，租户信用好，常见的是 15 到 20 年的租约。'],
 [10, 7.5, 15, '私募信贷投向 AI 相关公司的贷款超 2,000 亿美元；国际清算银行估计，2030 年或达 3,000 亿到 6,000 亿。'],
 [10, 15, 22.5, '摩根士丹利估计，到 2028 年约 1.5 万亿美元的建设资金，私募信贷可能出一半以上。'],
 [10, 22.5, 30.2, '这些贷款不像股票每天有报价，压力来时更难卖。所以监管关心：风险最后落在谁手里？'],
 [11, 0.3, 7.3, '借钱建楼有个前提：未来的收入，能覆盖利息和本金。风险就出在这个前提上。'],
 [11, 7.3, 14.5, '第一，设备会过时。芯片贷款期限通常约五年，新一代出现，旧设备可能贬得比还款更快。'],
 [11, 14.5, 21.5, '第二，再融资。有些债到期才一次还本，那时若收入没跟上、利率又高，续借就更难。'],
 [11, 21.5, 27, '第三，租户续约。租户离开、楼又供过于求，放款人就要面对空置。'],
 [11, 27, 30.9, '第四，同涨同跌：债券和科技股越来越同向。'],
 [12, 0.45, 2.5, '普通人，能盯什么？'],
 [13, 0.33, 8, '下面不是预测，只是四个可以自己查的信号。'],
 [13, 8, 17, '第一，云业务收入增速，对比资本开支增速。谁更快，决定这笔账什么时候转正。'],
 [13, 17, 26, '第二，新债发行量和信用利差。利差走阔，说明放款人开始要求更高的补偿。'],
 [13, 26, 35, '第三，项目债和证券化产品的价格。第四，租约续签和在手订单。'],
 [13, 35, 42.5, '收入跟上投入，是用未来现金流换今天的产能；没跟上，利息和折旧会一起压在利润上。'],
 [13, 42.5, 46.4, '你觉得，这笔账最后靠什么还？评论区聊聊。'],
 [14, 0.3, 4, '回头看：先花钱，再赚钱，'],
 [14, 4, 8, '中间隔着一座债务的桥：债券、贷款、证券化、私募，'],
 [14, 8, 11.9, '桥稳不稳，要看收入跟不跟得上。'],
 [15, 0.5, 17.9, '以上为公开资料整理，仅供参考，不构成投资建议。数据截至 2026-10-15。'],
]

RAWCUES = [
 [0, 0.05, 'whoosh'], [0, 1.1, 'pop'], [0, 2.4, 'soft'], [0, 4.3, 'pop'], [0, 5.4, 'pop'], [0, 6.5, 'hit'],
 [2, 0.4, 'soft'], [2, 1.0, 'pop'], [2, 3.6, 'pop'], [2, 7.6, 'pop'], [2, 9.6, 'pop'], [2, 10.4, 'ding'], [2, 14.4, 'ding'], [2, 23.4, 'ding'], [2, 28.2, 'hit'],
 [4, 0.4, 'soft'], [4, 1.0, 'pop'], [4, 7.8, 'pop'], [4, 16.3, 'pop'], [4, 24.9, 'pop'], [4, 33.4, 'ding'], [4, 42.3, 'grow'],
 [6, 0.3, 'soft'], [6, 1.2, 'pop'], [6, 7.8, 'pop'], [6, 11.0, 'ding'], [6, 14.8, 'pop'], [6, 17.0, 'ding'], [6, 21.5, 'hit'],
 [8, 0.5, 'soft'], [8, 1.6, 'pop'], [8, 4.4, 'grow'], [8, 8.0, 'pop'], [8, 8.9, 'grow'], [8, 10.6, 'pop'], [8, 11.6, 'grow'], [8, 16.0, 'ding'], [8, 24.0, 'hit'],
 [10, 0.4, 'soft'], [10, 1.0, 'pop'], [10, 8.0, 'pop'], [10, 11.0, 'pop'], [10, 16.0, 'pop'], [10, 16.4, 'ding'], [10, 24, 'soft'],
 [11, 0.4, 'soft'], [11, 7.3, 'hit'], [11, 14.5, 'hit'], [11, 21.5, 'hit'], [11, 27.0, 'hit'],
 [13, 0.4, 'soft'], [13, 8.3, 'pop'], [13, 17.3, 'pop'], [13, 26.3, 'pop'], [13, 29.8, 'pop'], [13, 35.4, 'ding'], [13, 39.0, 'hit'], [13, 42.6, 'grow'],
 [14, 0.6, 'pop'], [14, 2.4, 'pop'], [14, 4.2, 'pop'], [14, 6, 'pop'], [14, 8, 'ding'],
 [15, 0.3, 'soft'],
]
# (scene, local start, duration) of every number count-up
COUNTS = [(2, 10.4, 1.4), (2, 14.4, 1.4), (2, 23.4, 1.4), (6, 11.0, 1.4), (6, 17.0, 1.4)]
