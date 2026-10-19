# AI data centre debt video, company-example version. 300 s timeline, one short subtitle line each.
from scenes_fin import chap

S = []
# ---- 0 opening
S.append('''
        <div class="scene s0" data-start="0" data-end="8.161">
          <h2 class="hero" style="top:4.5cqw;font-size:8.6cqw;line-height:1.12" data-a="0.15,0.9">AI 数据中心<br>是借钱盖的吗？</h2>
          <p class="hero-sub" style="top:27.5cqw;font-size:3cqw" data-a="1.1,0.9">看四家真公司，怎么一步步借钱</p>
          <div class="fl" style="left:14cqw;right:14cqw">
            <p class="fc g" data-a="4.3,0.5">盖楼烧钱</p><p class="fa" data-a="4.9,0.4">→</p>
            <p class="fc" data-a="5.2,0.5">钱不够</p><p class="fa" data-a="5.8,0.4">→</p>
            <p class="fc i" data-a="6.1,0.5">借钱</p><p class="fa" data-a="6.7,0.4">→</p>
            <p class="fc" data-a="7.0,0.5">以后还</p>
          </div>
          <p class="ht" data-a="2.4,0.7">信息整理，不构成投资建议</p>
        </div>
''')
S.append(chap(8.161, 10.711, '账单', 'THE BILL', '先看这笔账有多大'))
# ---- 2 s1: the bill
S.append('''
        <div class="scene s1" data-start="10.711" data-end="42.205">
          <p class="hd" data-a="0.3,0.7">几家巨头，<em>今年花得吓人</em></p>
          <p class="nt" style="left:8cqw;top:13cqw;font-size:1.5cqw;color:var(--dim)" data-a="4.4,0.6">2026 年计划花的钱 · 亿美元</p>
          <div class="ch2" style="top:15cqw;height:18cqw;width:46cqw" data-a="4.4,0.5">
            <div class="pb" style="left:4cqw;--h:4.5cqw;--h2:0cqw" data-a="4.8,0.9"><i class="b"></i><p class="v">约 500</p><p class="m">甲骨文<small>2026 年度计划</small></p></div>
            <div class="pb" style="left:19cqw;--h:11.2cqw;--h2:1.8cqw" data-a="9.8,0.9"><i class="b"></i><i class="x"></i><p class="v">1,250–1,450</p><p class="m">Meta<small>2026 年计划</small></p></div>
            <div class="pb" style="left:34cqw;--h:16.6cqw;--h2:0cqw" data-a="14.8,0.9"><i class="b"></i><p class="v">约 1,850</p><p class="m">Alphabet<small>谷歌母公司</small></p></div>
          </div>
          <p class="st" style="top:16cqw" data-a="20.0,0.6"><span class="n" data-a="20.0,1.4" data-count="7000" data-dec="0">0</span><span class="u">亿美元</span><span class="l">亚马逊、微软、谷歌、Meta 四家，今年计划总和超过这个数</span></p>
          <div class="cr" style="top:40.5cqw;left:24cqw;right:24cqw">
            <p class="fc g" data-a="26.0,0.5">盖楼</p><p class="fa" data-a="26.6,0.4">·</p>
            <p class="fc i" data-a="27.5,0.5">买 AI 芯片</p><p class="fa" data-a="28.1,0.4">·</p>
            <p class="fc o" data-a="29.0,0.5">接电力</p>
          </div>
        </div>
''')
S.append(chap(42.205, 44.755, '借条', 'BONDS', '第一招：发借条'))
# ---- 4 s2: bonds
def tier(i, top, nm, ds, nu, small, a):
    return f'''          <div class="tier" style="top:{top}cqw" data-a="{a},0.6"><span class="i">0{i}</span><span class="nm">{nm}</span><span class="ds">{ds}</span><span class="nu">{nu}<small>{small}</small></span></div>\n'''
t2 = tier(1, 21, '谷歌母公司', '它自己最大的一笔美元借款', '200 亿美元', '2026 年 2 月', 17.0)
t2 += tier(2, 28, 'Meta', '同样发借条', '约 300 亿美元', '2025 年 10 月', 23.0)
t2 += tier(3, 35, '几家巨头', '去年最后三个月合计', '约 600 亿美元', '发债总额', 29.5)
S.append(f'''
        <div class="scene s2" data-start="44.755" data-end="93.271">
          <p class="hd" data-a="0.3,0.7">借钱，<em>就是写借条</em></p>
          <div class="cr" style="top:13.4cqw">
            <p class="fc g" data-a="4.4,0.5">向很多人借钱</p><p class="fa" data-a="5.0,0.4">→</p>
            <p class="fc i" data-a="8.0,0.5">写一张借条</p><p class="fa" data-a="8.6,0.4">→</p>
            <p class="fc o" data-a="11.6,0.5">到期还本，按期付利息</p>
          </div>
{t2}          <p class="nb" style="left:8cqw;top:42.8cqw" data-a="40.6,0.6">谷歌母公司还发了一张 <b>100 年</b>才到期的借条</p>
        </div>
''')
S.append(chap(93.271, 95.821, '合伙盖', 'JOINT VENTURE', '第二招：找人合伙'))
# ---- 6 s3: Meta joint venture
S.append('''
        <div class="scene s3" data-start="95.821" data-end="123.06">
          <p class="hd" data-a="0.3,0.7">找人合伙盖楼，<em>借条记在合资公司</em></p>
          <p class="st" style="left:8cqw;width:70cqw;top:13cqw" data-a="4.6,0.6"><span class="n" data-a="4.6,1.4" data-count="270" data-dec="0">0</span><span class="u">亿美元</span><span class="l">Meta 在美国盖的一座超大数据中心，总价（大部分靠借钱）</span></p>
          <p class="rkc" style="left:6cqw;top:24.5cqw;width:27cqw;height:12.5cqw" data-a="9.4,0.7"><span class="k">投资公司 BLUE OWL</span><span class="t">占 80%</span><span class="d">合伙人，大股东</span></p>
          <p class="rkc" style="left:36.5cqw;top:24.5cqw;width:27cqw;height:12.5cqw" data-a="13.9,0.7"><span class="k">META</span><span class="t">占 20%</span><span class="d">小股东，也是租客</span></p>
          <p class="rkc" style="left:67cqw;top:24.5cqw;width:27cqw;height:12.5cqw" data-a="18.4,0.7"><span class="k">借条的年息</span><span class="t">约 6.6%</span><span class="d">评级 A+，信用不错</span></p>
          <p class="nb" style="left:8cqw;top:39cqw" data-a="21.6,0.6">借条记在合资公司头上；<b>但 Meta 担保了楼的价值</b></p>
        </div>
''')
S.append(chap(123.06, 125.61, '租楼', 'LEASE', '第三招：租别人盖的楼'))
# ---- 8 s4: Oracle leasing
S.append('''
        <div class="scene s4" data-start="125.61" data-end="157.104">
          <p class="hd" data-a="0.3,0.7">自己不盖，<em>租别人盖的楼</em></p>
          <div class="bx i" style="left:6cqw;top:14cqw;width:20cqw" data-a="0.9,0.6"><b>甲骨文</b><small>租客</small></div>
          <div class="bx g" style="left:40cqw;top:14cqw;width:20cqw" data-a="2.0,0.6"><b>开发商</b><small>负责盖楼</small></div>
          <div class="bx" style="left:74cqw;top:14cqw;width:20cqw" data-a="4.6,0.6"><b>银行</b><small>借钱给开发商</small></div>
          <i class="ah l" style="right:26cqw;top:18.1cqw;--w:14cqw" data-a="5.2,0.8"></i>
          <p class="al g" style="left:59.5cqw;width:15cqw;top:15.4cqw" data-a="5.8,0.5">借 380 亿美元</p>
          <i class="ah r" style="left:26cqw;top:18.1cqw;--w:14cqw" data-a="9.2,0.8"></i>
          <p class="al i" style="left:26cqw;width:14cqw;top:15.4cqw" data-a="9.8,0.5">长期租金 15–19 年</p>
          <p class="nb" style="left:6cqw;top:27cqw;width:40cqw" data-a="13.6,0.6">楼盖好，租金才开始付</p>
          <p class="st" style="left:8cqw;width:40cqw;top:35cqw" data-a="18.2,0.6"><span class="n" data-a="18.2,1.4" data-count="2600" data-dec="0">0</span><span class="u">亿美元</span><span class="l">还没开始付的租金</span></p>
          <p class="st" style="left:56cqw;width:38cqw;top:35cqw" data-a="23.2,0.6"><span class="n" style="color:var(--hot);text-shadow:none">2 倍</span><span class="l">比它欠的钱（约 1,250 亿）还多</span></p>
        </div>
''')
S.append(chap(157.104, 159.654, '押芯片', 'COLLATERAL', '第四招：拿芯片做抵押'))
# ---- 10 s5: CoreWeave
S.append('''
        <div class="scene s5" data-start="159.654" data-end="190">
          <p class="hd" data-a="0.3,0.7">拿芯片做抵押，<em>借钱更便宜</em></p>
          <div class="cr" style="top:13.2cqw">
            <p class="fc g" data-a="4.5,0.5">买 AI 芯片</p><p class="fa" data-a="5.1,0.4">→</p>
            <p class="fc i" data-a="8.0,0.5">芯片押给银行借钱</p><p class="fa" data-a="8.6,0.4">→</p>
            <p class="fc o" data-a="11.6,0.5">客户付钱，还贷款</p>
          </div>
          <p class="st" style="left:8cqw;width:40cqw;top:24cqw" data-a="20.0,0.6"><span class="n" data-a="20.0,1.4" data-count="85" data-dec="0">0</span><span class="u">亿美元</span><span class="l">CoreWeave 今年 3 月拿到的贷款</span></p>
          <p class="st" style="left:56cqw;width:38cqw;top:24cqw" data-a="24.5,0.6"><span class="n" data-a="24.5,1.4" data-count="5.9" data-dec="1">0</span><span class="u">%</span><span class="l">年息，2023 年第一笔约 15%</span></p>
          <p class="nb" style="left:8cqw;top:35cqw" data-a="15.8,0.6">靠山：Meta 的长期合同</p>
          <p class="nb" style="left:52cqw;top:35cqw" data-a="27.7,0.6">它自己，欠债约 250 亿美元</p>
        </div>
''')
# ---- 11 s6: rating
S.append('''
        <div class="scene s6" data-start="190" data-end="220.937">
          <p class="hd" data-a="0.3,0.7">借得多，<em>信用分就会降</em></p>
          <div class="lad">
            <div class="st5" data-a="0.9,0.5">A<small>很稳</small></div>
            <div class="st5" data-a="1.5,0.5">BBB+<small>稳</small></div>
            <div class="st5" data-a="2.1,0.5">BBB<small>还行</small></div>
            <div class="st5 me" data-a="2.7,0.5">BBB−<small>勉强安全</small></div>
            <div class="st5 bad" data-a="3.3,0.5">BB+<small>高风险</small></div>
          </div>
          <p class="mk" style="left:55cqw;top:16.6cqw" data-a="4.8,0.6">甲骨文 · 2026 年 7 月</p>
          <p class="nb" style="left:8cqw;top:33cqw" data-a="9.3,0.6">只差一级，就掉到高风险</p>
          <p class="nb" style="left:52cqw;top:33cqw" data-a="13.6,0.6">分一降，借钱就更贵</p>
          <p class="st" style="left:8cqw;width:40cqw;top:38.5cqw" data-a="18.2,0.6"><span class="n" style="font-size:4.2cqw" data-a="18.2,1.4" data-count="14" data-dec="0">0</span><span class="u">亿美元</span><span class="l" style="display:inline;margin-left:1cqw;font-size:1.5cqw">最近一季，光利息</span></p>
          <p class="st" style="left:56cqw;width:38cqw;top:38.5cqw" data-a="22.6,0.6"><span class="n" style="font-size:4.2cqw" data-a="22.6,1.4" data-count="55" data-dec="0">0</span><span class="u">%</span><span class="l" style="display:inline;margin-left:1cqw;font-size:1.5cqw">比一年前多</span></p>
        </div>
''')
S.append(chap(220.937, 223.487, '往后看', "WHAT'S NEXT", '四个能自己查的信号'))
# ---- 13 s7: signals
def sg(i, top, nm, ds, a):
    return f'''          <div class="sg" style="top:{top}cqw" data-a="{a},0.6"><span class="i">0{i}</span><span class="nm">{nm}<span class="ds">{ds}</span></span></div>\n'''
sgs = sg(1, 9, '订单，变成收入了吗', '看每季度的收入增长', 4.6)
sgs += sg(2, 16, '赚的钱，超过花的钱了吗', '什么时候不再有缺口', 9.1)
sgs += sg(3, 23, '信用分，会不会再降', '一降，借钱就更贵', 13.6)
sgs += sg(4, 30, '利息，涨得快不快', '每个季度都要付', 18.1)
S.append(f'''
        <div class="scene s7" data-start="223.487" data-end="270">
          <p class="disc" data-a="0.4,0.6">信息整理，不构成投资建议</p>
{sgs}          <p class="iff y" style="top:9cqw" data-a="22.6,0.7"><span class="k">如果 · 客户一直按时付钱</span><span class="t">压力慢慢变小</span><span class="d">赚的钱，渐渐能还上利息和本金。</span></p>
          <p class="iff n" style="top:23cqw" data-a="28.6,0.7"><span class="k">如果 · 楼晚了，或客户少付</span><span class="t">压力会变大</span><span class="d">利息和租金，会一起压上来。</span></p>
          <p class="qq" style="top:38.4cqw" data-a="40.6,0.7">你觉得，这些借来的钱，都能还上吗？</p>
        </div>
''')
# ---- 14 recap
S.append('''
        <div class="scene s14" data-start="270" data-end="282">
          <h2 class="hd" data-a="0.2,0.7">钱不够，<em>有四种办法</em></h2>
          <div class="tl"><i data-a="0.5,8.5"></i></div>
          <div class="dot2" style="left:10%" data-a="0.6,0.5"></div>
          <div class="dot2" style="left:30%" data-a="2.4,0.5"></div>
          <div class="dot2" style="left:50%" data-a="4.2,0.5"></div>
          <div class="dot2" style="left:70%" data-a="6,0.5"></div>
          <div class="dot2" style="left:90%" data-a="8,0.5"></div>
          <div class="node" style="left:10%" data-a="0.6,0.7"><p class="y">账单</p><p class="h">越花越多</p><p class="d">四巨头 7,000 亿+</p></div>
          <div class="node dn" style="left:30%" data-a="2.4,0.7"><p class="y">借条</p><p class="h">大公司发债</p><p class="d">谷歌母公司 200 亿</p></div>
          <div class="node" style="left:50%" data-a="4.2,0.7"><p class="y">合伙</p><p class="h">合资盖楼</p><p class="d">Meta 约 270 亿</p></div>
          <div class="node dn" style="left:70%" data-a="6,0.7"><p class="y">租楼</p><p class="h">长期租金</p><p class="d">甲骨文 2,600 亿</p></div>
          <div class="node" style="left:90%" data-a="8,0.7"><p class="y">押芯片</p><p class="h">抵押借钱</p><p class="d">CoreWeave 85 亿</p></div>
        </div>
''')
SRC = [
    ('Alphabet 等发债与资本开支（RoIC）', 'roic.ai/news/alphabet-and-big-tech-ramp-up-debt-issuance-to-fuel-ai-infrastructure-spending-02-26-2026'),
    ('巨头 2026 年计划超 7,000 亿（Yahoo）', 'finance.yahoo.com/sectors/technology/articles/hyperscalers-hit-700-billion-2026-111243744.html'),
    ('Alphabet 的 100 年期借条（Techloy）', 'techloy.com/alphabet-raises-20-billion-in-bond-sale-launches-first-tech-100-year-bond-since-1997/'),
    ('Fortune：Meta 与 Blue Owl 的 270 亿', 'fortune.com/2025/10/31/metas-27-billion-bet-turns-ai-compute-into-wall-streets-hottest-new-investment/'),
    ('Global Data Center Hub：Hyperion 扩建', 'globaldatacenterhub.com/p/meta-scales-hyperion-to-5gw-and-over'),
    ('DCD：CoreWeave 85 亿美元贷款', 'datacenterdynamics.com/en/news/coreweave-secures-85bn-loan-for-gpu-purchases/'),
    ('Global Data Center Hub：CoreWeave 抵押贷款', 'globaldatacenterhub.com/p/coreweaves-85b-quarter-when-gpu-debt'),
    ('甲骨文 2027 财年一季度新闻稿', 's23.q4cdn.com/440135859/files/content_files/1q27-pressrelease-September_FINAL.pdf'),
    ('DCD：380 亿美元贷款', 'datacenterdynamics.com/en/news/jpmorgan-chase-and-mitsubishi-ufj-lead-38bn-debt-package-for-oracle-linked-data-centers-report/'),
    ('R40：2,600 亿租约承诺', 'r40.io/blog/orcl-260bn-of-leases-off-the-balance-sheet/'),
    ('Benzinga：评级调低', 'finance.yahoo.com/technology/ai/articles/borrowing-brink-oracle-ai-expansion-193022811.html'),
    ('Fortune：甲骨文三季度与融资', 'dc.fortune.com/2026/03/10/oracle-best-quarter-negative-free-cash-flow-ai-spending'),
]
li = '\n            '.join(f'<li data-a="{0.25 + 0.14 * i:.2f},0.5"><b>{n}</b><span>{u}</span></li>' for i, (n, u) in enumerate(SRC))
S.append(f'''
        <div class="scene s15" data-start="282" data-end="300">
          <ul class="srclist">
            {li}
          </ul>
          <p class="foot" data-a="2.8,0.6" style="top:2.2cqw">信息整理，不构成投资建议 · 数据截至 2026-10-15</p>
        </div>
''')

NAMES = ['开场', '章节 · 账单', '巨头的账单', '章节 · 借条', '发借条', '章节 · 合伙盖', 'Meta 合伙盖楼', '章节 · 租楼', '甲骨文租楼', '章节 · 押芯片', 'CoreWeave 押芯片', '信用打分', '章节 · 往后看', '四个信号', '回头看', '资料来源']

RAW = [
 [0, 0, 4.2, 'AI 数据中心，特别烧钱。'],
 [0, 4.2, 8.1, '钱不够，就借。看四家公司。'],
 [1, 0.45, 2.5, '先看这笔账有多大。'],
 [2, 0.3, 4.5, '先看几家巨头，今年要花多少。'],
 [2, 4.5, 9.5, '甲骨文，计划花约 500 亿美元。'],
 [2, 9.5, 14.5, 'Meta，1250 到 1450 亿美元。'],
 [2, 14.5, 19.8, '谷歌母公司，约 1850 亿美元。'],
 [2, 19.8, 23.0, '亚马逊、微软、谷歌、Meta，'],
 [2, 23.0, 25.8, '加起来超过 7000 亿美元。'],
 [2, 25.8, 31.4, '盖楼、买芯片、接电力，都要钱。'],
 [3, 0.45, 2.5, '钱不够，第一招：借钱。'],
 [4, 0.3, 4.4, '最直接的办法，是向别人借。'],
 [4, 4.4, 8.0, '这叫“发债”，说白了，写借条。'],
 [4, 8.0, 11.6, '向很多人借钱，写一张借条，'],
 [4, 11.6, 16.5, '到期还本金，中间按期付利息。'],
 [4, 16.5, 22.5, '今年 2 月，谷歌母公司借了 200 亿美元。'],
 [4, 22.5, 29.0, '去年 10 月，Meta 借了约 300 亿美元。'],
 [4, 29.0, 35.5, '去年最后三个月，几家巨头借了约 600 亿美元。'],
 [4, 35.5, 40.5, '借条，成了它们最直接的办法。'],
 [4, 40.5, 44.5, '谷歌母公司，还发了 100 年期借条。'],
 [4, 44.5, 48.4, '一百年后，才要还本金。'],
 [5, 0.45, 2.5, '第二招：找人合伙。'],
 [6, 0.3, 4.5, 'Meta 要盖一座超大数据中心。'],
 [6, 4.5, 9.0, '总价约 270 亿美元，大部分靠借。'],
 [6, 9.0, 13.5, '它找 Blue Owl 合伙，对方占 80%。'],
 [6, 13.5, 18.0, 'Meta 自己占 20%，也是租客。'],
 [6, 18.0, 21.5, '借条的年息，约 6.6%。'],
 [6, 21.5, 24.5, '借条记在合资公司头上，'],
 [6, 24.5, 27.1, '但 Meta 担保了楼的价值。'],
 [7, 0.45, 2.5, '第三招：租别人盖的楼。'],
 [8, 0.3, 4.5, '甲骨文，让开发商替它盖楼。'],
 [8, 4.5, 9.0, '开发商向银行借了 380 亿美元。'],
 [8, 9.0, 13.5, '甲骨文签下长期租约，15 到 19 年。'],
 [8, 13.5, 18.0, '楼盖好了，租金才开始付。'],
 [8, 18.0, 23.0, '这种还没开始付的租金，约 2600 亿美元。'],
 [8, 23.0, 27.5, '比它欠的钱，约 1250 亿，还多一倍。'],
 [8, 27.5, 31.4, '这些租金，将来都要付。'],
 [9, 0.45, 2.5, '第四招：拿芯片做抵押。'],
 [10, 0.4, 4.4, 'CoreWeave，专门出租 AI 算力。'],
 [10, 4.4, 8.0, '它先借钱，买一批 AI 芯片，'],
 [10, 8.0, 11.6, '再把芯片押给银行，'],
 [10, 11.6, 15.5, '抵押，就是押东西借钱。'],
 [10, 15.5, 19.8, 'Meta 签了长期合同，银行更放心。'],
 [10, 19.8, 24.5, '今年 3 月，借到 85 亿美元。'],
 [10, 24.5, 27.6, '年息 5.9%，2023 年约 15%。'],
 [10, 27.6, 30.2, '它自己，已欠债约 250 亿美元。'],
 [11, 0.4, 4.5, '借得多，机构会给公司打信用分。'],
 [11, 4.5, 9.0, '2026 年 7 月，甲骨文被调低了。'],
 [11, 9.0, 13.5, '现在是 BBB−，离高风险只差一级。'],
 [11, 13.5, 18.0, '分一降，借钱就更贵。'],
 [11, 18.0, 22.5, '最近一季，光利息就 14 亿美元。'],
 [11, 22.5, 26.5, '比一年前，多了 55%。'],
 [11, 26.5, 30.8, '这些利息，每个季度都要付。'],
 [12, 0.45, 2.5, '接下来，盯什么？'],
 [13, 0.33, 4.5, '这不是预测，只是四个能自己查的信号。'],
 [13, 4.5, 9.0, '一，订单，有没有变成收入。'],
 [13, 9.0, 13.5, '二，赚的钱，什么时候超过花的钱。'],
 [13, 13.5, 18.0, '三，信用分，会不会再降。'],
 [13, 18.0, 22.5, '四，借钱的利息，涨得快不快。'],
 [13, 22.5, 28.5, '如果客户一直按时付钱，压力会变小。'],
 [13, 28.5, 34.5, '如果楼晚了、客户少付，压力会变大。'],
 [13, 34.5, 40.5, '结果怎样，看之后每一季的数字。'],
 [13, 40.5, 46.4, '你觉得，这些钱都能还上吗？'],
 [14, 0.3, 4.0, '回头看，钱不够，有四种办法：'],
 [14, 4.0, 8.0, '发借条、找人合伙、租楼、押芯片，'],
 [14, 8.0, 11.9, '最后，都要靠客户付钱来还。'],
 [15, 0.5, 17.9, '以上为公开资料整理，不构成投资建议。'],
]

RAWCUES = [
 [0, 0.05, 'whoosh'], [0, 1.1, 'pop'], [0, 2.4, 'soft'], [0, 4.3, 'pop'], [0, 5.2, 'pop'], [0, 6.1, 'pop'], [0, 7.0, 'hit'],
 [2, 0.4, 'soft'], [2, 4.8, 'pop'], [2, 9.8, 'pop'], [2, 14.8, 'ding'], [2, 20.0, 'ding'], [2, 26.0, 'pop'], [2, 27.5, 'pop'], [2, 29.0, 'hit'],
 [4, 0.4, 'soft'], [4, 4.4, 'pop'], [4, 8.0, 'pop'], [4, 11.6, 'pop'], [4, 17.0, 'ding'], [4, 23.0, 'ding'], [4, 29.5, 'ding'], [4, 40.6, 'hit'],
 [6, 0.3, 'soft'], [6, 4.6, 'ding'], [6, 9.4, 'pop'], [6, 13.9, 'pop'], [6, 18.4, 'pop'], [6, 21.6, 'hit'],
 [8, 0.5, 'soft'], [8, 0.9, 'pop'], [8, 2.0, 'pop'], [8, 4.6, 'pop'], [8, 5.2, 'grow'], [8, 9.2, 'grow'], [8, 13.6, 'pop'], [8, 18.2, 'ding'], [8, 23.2, 'hit'],
 [10, 0.4, 'soft'], [10, 4.5, 'pop'], [10, 8.0, 'pop'], [10, 11.6, 'pop'], [10, 15.8, 'pop'], [10, 20.0, 'ding'], [10, 24.5, 'ding'], [10, 27.7, 'hit'],
 [11, 0.4, 'soft'], [11, 0.9, 'pop'], [11, 1.5, 'pop'], [11, 2.1, 'pop'], [11, 2.7, 'pop'], [11, 3.3, 'pop'], [11, 4.8, 'ding'], [11, 9.3, 'hit'], [11, 13.6, 'pop'], [11, 18.2, 'ding'], [11, 22.6, 'ding'],
 [13, 0.4, 'soft'], [13, 4.6, 'pop'], [13, 9.1, 'pop'], [13, 13.6, 'pop'], [13, 18.1, 'pop'], [13, 22.6, 'ding'], [13, 28.6, 'hit'], [13, 40.6, 'grow'],
 [14, 0.6, 'pop'], [14, 2.4, 'pop'], [14, 4.2, 'pop'], [14, 6, 'pop'], [14, 8, 'ding'],
 [15, 0.3, 'soft'],
]
COUNTS = [(2, 20.0, 1.4), (6, 4.6, 1.4), (8, 18.2, 1.4), (10, 20.0, 1.4), (10, 24.5, 1.4), (11, 18.2, 1.4), (11, 22.6, 1.4)]
