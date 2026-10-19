# Oracle financing video: scenes, subtitles (one short line each), cues, counts. 300 s timeline.
from scenes_fin import chap

S = []
# ---- 0 opening
S.append('''
        <div class="scene s0" data-start="0" data-end="8.161">
          <h2 class="hero" data-a="0.15,0.9">甲骨文借钱记</h2>
          <p class="hero-sub" data-a="1.1,0.9">一家老牌公司，为了 AI 欠了上千亿美元</p>
          <div class="fl" style="left:20cqw;right:20cqw">
            <p class="fc g" data-a="4.3,0.5">接大单</p><p class="fa" data-a="4.9,0.4">→</p>
            <p class="fc" data-a="5.2,0.5">盖楼</p><p class="fa" data-a="5.8,0.4">→</p>
            <p class="fc i" data-a="6.1,0.5">借钱</p><p class="fa" data-a="6.7,0.4">→</p>
            <p class="fc" data-a="7.0,0.5">还钱</p>
          </div>
          <p class="ht" data-a="2.4,0.7"><b>#FinTalk财智新声#</b> · 信息整理，不构成投资建议</p>
        </div>
''')
S.append(chap(8.161, 10.711, '天量订单', 'THE ORDERS', '订单排到了几年后'))
# ---- 2 s1: orders
S.append('''
        <div class="scene s1" data-start="10.711" data-end="42.205">
          <p class="hd" data-a="0.3,0.7">客户排队下订单，<em>订单越积越多</em></p>
          <div class="cr" style="top:13.4cqw">
            <p class="fc" data-a="1.0,0.5">以前：卖软件、卖数据库</p><p class="fa" data-a="1.6,0.4">→</p>
            <p class="fc g" data-a="4.4,0.5">现在：给 AI 公司出租数据中心</p><p class="fa" data-a="5.0,0.4">→</p>
            <p class="fc i" data-a="8.4,0.5">客户排队下订单</p>
          </div>
          <div class="bars2" style="left:8cqw;top:22cqw;height:18cqw;width:46cqw">
            <div class="bc" style="left:3cqw;--h:11.9cqw" data-a="12.4,0.9"><i class="b"></i><p class="v">5,530</p><p class="m">3 月<small>已签订单</small></p></div>
            <div class="bc" style="left:16cqw;--h:13.8cqw" data-a="13.6,0.9"><i class="b"></i><p class="v">6,380</p><p class="m">6 月<small>已签订单</small></p></div>
            <div class="bc" style="left:29cqw;--h:14.4cqw" data-a="14.8,0.9"><i class="b"></i><p class="v">6,640</p><p class="m">9 月<small>已签订单</small></p></div>
          </div>
          <p class="nt" style="left:8cqw;top:19.2cqw;font-size:1.5cqw;color:var(--dim)" data-a="12.4,0.6">已签订单 · 亿美元 · 2026 年</p>
          <p class="st" style="top:22cqw" data-a="17.4,0.6"><span class="n" data-a="17.4,1.4" data-count="670" data-dec="0">0</span><span class="u">亿美元</span><span class="l">公司一年的收入（约数）</span></p>
          <p class="st" style="top:33.5cqw" data-a="22.4,0.6"><span class="n" data-a="22.4,1.4" data-count="10" data-dec="0">0</span><span class="u">倍</span><span class="l">订单 ÷ 一年收入（我们算的）</span></p>
        </div>
''')
S.append(chap(42.205, 44.755, '盖楼烧钱', 'THE COST', '赚的钱不够花'))
# ---- 4 s2: cost of building
S.append('''
        <div class="scene s2" data-start="44.755" data-end="93.271">
          <p class="hd" data-a="0.3,0.7">盖楼，<em>越来越烧钱</em></p>
          <p class="nt" style="left:8cqw;top:13cqw;font-size:1.5cqw;color:var(--dim)" data-a="4.4,0.6">每年盖楼、买设备花的钱 · 亿美元</p>
          <div class="ch2" style="top:15cqw;height:18cqw;width:46cqw" data-a="4.4,0.5">
            <div class="pb" style="left:4cqw;--h:3.6cqw;--h2:0cqw" data-a="4.8,0.9"><i class="b"></i><p class="v">约 210</p><p class="m">2025 年度<small>已花</small></p></div>
            <div class="pb" style="left:19cqw;--h:8.5cqw;--h2:0cqw" data-a="9.8,0.9"><i class="b"></i><p class="v">约 500</p><p class="m">2026 年度<small>计划</small></p></div>
            <div class="pb" style="left:34cqw;--h:16.6cqw;--h2:0.9cqw" data-a="14.8,0.9"><i class="b"></i><i class="x"></i><p class="v">900–950</p><p class="m">2027 年度<small>计划</small></p></div>
          </div>
          <p class="st" style="top:16cqw" data-a="20.0,0.6"><span class="n" data-a="20.0,1.4" data-count="285" data-dec="0">0</span><span class="u">亿美元</span><span class="l">最近一个季度，一季就花了这么多</span></p>
          <p class="st" style="top:28.5cqw" data-a="25.5,0.6"><span class="n" style="color:var(--hot);text-shadow:none" data-a="25.5,1.4" data-count="54" data-dec="0">0</span><span class="u">亿美元</span><span class="l">收到的钱，比花出去的少这么多</span></p>
          <div class="cr" style="top:40.5cqw;left:24cqw;right:24cqw">
            <p class="fc g" data-a="37.6,0.5">借钱</p><p class="fa" data-a="38.4,0.4">·</p>
            <p class="fc i" data-a="39.4,0.5">卖新股</p><p class="fa" data-a="40.2,0.4">·</p>
            <p class="fc o" data-a="41.2,0.5">租楼</p>
          </div>
        </div>
''')
S.append(chap(93.271, 95.821, '先借钱', 'BORROW', '借钱，卖新股'))
# ---- 6 s3: bonds and shares
def tier(i, top, nm, ds, nu, small, a):
    return f'''          <div class="tier" style="top:{top}cqw" data-a="{a},0.6"><span class="i">0{i}</span><span class="nm">{nm}</span><span class="ds">{ds}</span><span class="nu">{nu}<small>{small}</small></span></div>\n'''
t3 = tier(1, 14, '借钱（发债）', '向很多人借钱，写借条', '180 亿美元', '2025 年秋天', 9.2)
t3 += tier(2, 21, '再借一次', '借条加一种特殊股票', '300 亿美元', '2026 年 2 月', 13.7)
t3 += tier(3, 28, '卖新股', '把公司切一块，卖给股民', '约 200 亿美元', '已经卖完', 18.2)
S.append(f'''
        <div class="scene s3" data-start="95.821" data-end="123.06">
          <p class="hd" data-a="0.3,0.7">缺口怎么补？<em>先借钱，再卖股</em></p>
{t3}          <p class="st" style="left:8cqw;width:84cqw;top:37cqw" data-a="22.7,0.6"><span class="n" style="font-size:6.4cqw" data-a="22.7,1.5" data-count="1253" data-dec="0">0</span><span class="u">亿美元</span><span class="l" style="display:inline;margin-left:1.2cqw;font-size:1.7cqw">到现在，一共还欠这么多</span></p>
        </div>
''')
S.append(chap(123.06, 125.61, '再租楼', 'LEASE', '自己不盖，租别人盖的'))
# ---- 8 s4: leasing
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
          <p class="st" style="left:56cqw;width:38cqw;top:35cqw" data-a="23.2,0.6"><span class="n" style="color:var(--hot);text-shadow:none">2 倍</span><span class="l">比账上的借款还多一倍</span></p>
        </div>
''')
S.append(chap(157.104, 159.654, '信用打分', 'CREDIT SCORE', '借得越多，分越低'))
# ---- 10 s5: rating
S.append('''
        <div class="scene s5" data-start="159.654" data-end="190">
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
# ---- 11 s6: how to repay
S.append('''
        <div class="scene s6" data-start="190" data-end="220.937">
          <p class="hd" data-a="0.3,0.7">还钱，<em>靠订单变成收入</em></p>
          <div class="cr" style="top:13.2cqw">
            <p class="fc g" data-a="0.9,0.5">签下订单</p><p class="fa" data-a="1.6,0.4">→</p>
            <p class="fc" data-a="2.0,0.5">楼盖好、机器上线</p><p class="fa" data-a="2.7,0.4">→</p>
            <p class="fc i" data-a="3.1,0.5">客户付钱</p><p class="fa" data-a="3.8,0.4">→</p>
            <p class="fc o" data-a="4.0,0.5">还债</p>
          </div>
          <p class="rkc" style="left:6cqw;top:24cqw;width:27cqw;height:12.5cqw" data-a="4.8,0.7"><span class="k">公司预计</span><span class="t">约一半</span><span class="d">订单，三年内变成收入</span></p>
          <p class="rkc" style="left:36.5cqw;top:24cqw;width:27cqw;height:12.5cqw" data-a="9.4,0.7"><span class="k">新订单里</span><span class="t">先付款</span><span class="d">不少客户先付一部分钱，有的自带设备</span></p>
          <p class="rkc" style="left:67cqw;top:24cqw;width:27cqw;height:12.5cqw" data-a="27.2,0.7"><span class="k">空窗期</span><span class="t">借钱撑</span><span class="d">楼没盖好前，钱靠借</span></p>
        </div>
''')
S.append(chap(220.937, 223.487, '往后看', "WHAT'S NEXT", '四个能自己查的信号'))
# ---- 13 s7: signals
def sg(i, top, nm, ds, a):
    return f'''          <div class="sg" style="top:{top}cqw" data-a="{a},0.6"><span class="i">0{i}</span><span class="nm">{nm}<span class="ds">{ds}</span></span></div>\n'''
sgs = sg(1, 9, '订单，变成收入了吗', '看每季度的收入增长', 4.6)
sgs += sg(2, 16, '赚的钱，超过花的钱了吗', '什么时候不再有缺口', 9.1)
sgs += sg(3, 23, '信用分，会不会再降', '从 BBB− 再降就是高风险', 13.6)
sgs += sg(4, 30, '利息，涨得快不快', '每个季度都要付', 18.1)
S.append(f'''
        <div class="scene s7" data-start="223.487" data-end="270">
          <p class="disc" data-a="0.4,0.6">信息整理，不构成投资建议</p>
{sgs}          <p class="iff y" style="top:9cqw" data-a="22.6,0.7"><span class="k">如果 · 订单顺利变成收入</span><span class="t">压力慢慢变小</span><span class="d">赚的钱，渐渐能还上利息和本金。</span></p>
          <p class="iff n" style="top:23cqw" data-a="28.6,0.7"><span class="k">如果 · 楼晚了，或客户少付</span><span class="t">压力会变大</span><span class="d">利息和租金，会一起压上来。</span></p>
          <p class="qq" style="top:38.4cqw" data-a="40.6,0.7">你觉得，这些订单，能全变成收入吗？</p>
        </div>
''')
# ---- 14 recap
S.append('''
        <div class="scene s14" data-start="270" data-end="282">
          <h2 class="hd" data-a="0.2,0.7">先接单，再盖楼，<em>钱不够就想办法</em></h2>
          <div class="tl"><i data-a="0.5,8.5"></i></div>
          <div class="dot2" style="left:10%" data-a="0.6,0.5"></div>
          <div class="dot2" style="left:30%" data-a="2.4,0.5"></div>
          <div class="dot2" style="left:50%" data-a="4.2,0.5"></div>
          <div class="dot2" style="left:70%" data-a="6,0.5"></div>
          <div class="dot2" style="left:90%" data-a="8,0.5"></div>
          <div class="node" style="left:10%" data-a="0.6,0.7"><p class="y">接单</p><p class="h">已签订单</p><p class="d">6,640 亿美元</p></div>
          <div class="node dn" style="left:30%" data-a="2.4,0.7"><p class="y">盖楼</p><p class="h">越来越烧钱</p><p class="d">缺口 54 亿 / 季</p></div>
          <div class="node" style="left:50%" data-a="4.2,0.7"><p class="y">借钱</p><p class="h">发债、卖新股</p><p class="d">欠债 1,253 亿</p></div>
          <div class="node dn" style="left:70%" data-a="6,0.7"><p class="y">租楼</p><p class="h">长期租金</p><p class="d">未开始 2,600 亿</p></div>
          <div class="node" style="left:90%" data-a="8,0.7"><p class="y">还钱</p><p class="h">靠订单变收入</p><p class="d">要看楼盖得快不快</p></div>
        </div>
''')
SRC = [
    ('甲骨文 2027 财年一季度新闻稿', 's23.q4cdn.com/440135859/files/content_files/1q27-pressrelease-September_FINAL.pdf'),
    ('ERP Today：一季度要点', 'erp.today/oracle-q1-fy27-results-664b-backlog-ai-contracts/'),
    ('电话会实录（Motley Fool）', 'fool.com/earnings/call-transcripts/2026/09/11/oracle-orcl-q1-2027-earnings-call-transcript/'),
    ('Fortune：三季度与融资', 'dc.fortune.com/2026/03/10/oracle-best-quarter-negative-free-cash-flow-ai-spending'),
    ('DCD：2026 年筹资计划', 'datacenterdynamics.com/en/news/oracle-to-raise-up-to-50bn-in-debt-and-equity-in-2026'),
    ('DCD：380 亿美元贷款', 'datacenterdynamics.com/en/news/jpmorgan-chase-and-mitsubishi-ufj-lead-38bn-debt-package-for-oracle-linked-data-centers-report/'),
    ('R40：2,600 亿租约承诺', 'r40.io/blog/orcl-260bn-of-leases-off-the-balance-sheet/'),
    ('Benzinga：评级调低', 'finance.yahoo.com/technology/ai/articles/borrowing-brink-oracle-ai-expansion-193022811.html'),
]
li = '\n            '.join(f'<li data-a="{0.25 + 0.16 * i:.2f},0.5"><b>{n}</b><span>{u}</span></li>' for i, (n, u) in enumerate(SRC))
S.append(f'''
        <div class="scene s15" data-start="282" data-end="300">
          <ul class="srclist" style="top:6cqw">
            {li}
          </ul>
          <p class="foot" data-a="2.8,0.6" style="top:2.2cqw">信息整理，不构成投资建议 · 数据截至 2026-10-15</p>
        </div>
''')

NAMES = ['开场', '章节 · 天量订单', '订单', '章节 · 盖楼烧钱', '盖楼烧钱', '章节 · 先借钱', '借钱和卖新股', '章节 · 再租楼', '租楼', '章节 · 信用打分', '信用打分', '还钱靠什么', '章节 · 往后看', '四个信号', '回头看', '资料来源']

RAW = [
 [0, 0, 4.2, '一家老牌软件公司，'],
 [0, 4.2, 8.1, '为了 AI，欠了一千多亿美元。'],
 [1, 0.45, 2.5, '先看它接了多少单。'],
 [2, 0.3, 4.2, '甲骨文以前，卖软件、卖数据库。'],
 [2, 4.2, 8.2, '现在，它给 AI 公司出租数据中心。'],
 [2, 8.2, 12.2, '客户排着队，下订单。'],
 [2, 12.2, 17.2, '已经签下的订单，6640 亿美元。'],
 [2, 17.2, 22.2, '它一年的收入，约 670 亿美元。'],
 [2, 22.2, 27.2, '订单，差不多是收入的十倍。'],
 [2, 27.2, 31.4, '好事。但得先盖楼。'],
 [3, 0.45, 2.5, '盖楼，要花多少钱？'],
 [4, 0.3, 4.5, '数据中心，特别烧钱。'],
 [4, 4.5, 9.5, '2025 年度，花了约 210 亿美元。'],
 [4, 9.5, 14.5, '2026 年度，计划约 500 亿美元。'],
 [4, 14.5, 19.8, '2027 年度，计划 900 到 950 亿美元。'],
 [4, 19.8, 25.3, '最近一个季度，就花了 285 亿美元。'],
 [4, 25.3, 31, '收到的钱，比花出去的少 54 亿美元。'],
 [4, 31, 37, '这个缺口，得想办法补。'],
 [4, 37, 42.5, '办法有三个：借钱、卖股、租楼。'],
 [4, 42.5, 48.2, '我们一个个看。'],
 [5, 0.45, 2.5, '先说借钱和卖新股。'],
 [6, 0.2, 4.5, '办法一：借钱，也就是发债。'],
 [6, 4.5, 9, '发债，就是向很多人借钱，写借条。'],
 [6, 9, 13.5, '2025 年秋天，一次借了 180 亿美元。'],
 [6, 13.5, 18, '2026 年 2 月，又筹到 300 亿美元。'],
 [6, 18, 22.5, '办法二：卖新股，约 200 亿美元。'],
 [6, 22.5, 27.1, '到现在，一共还欠 1250 亿美元。'],
 [7, 0.45, 2.5, '还有第三招：租楼。'],
 [8, 0.3, 4.5, '办法三：自己不盖，租别人盖的。'],
 [8, 4.5, 9, '银行借给开发商 380 亿美元。'],
 [8, 9, 13.5, '甲骨文签下长期租约，15 到 19 年。'],
 [8, 13.5, 18, '楼盖好了，租金才开始付。'],
 [8, 18, 23, '这种还没开始的租金，约 2600 亿美元。'],
 [8, 23, 27.5, '比账上的借款，还多一倍。'],
 [8, 27.5, 31.4, '这些租金，将来都要付。'],
 [9, 0.45, 2.5, '借这么多，会怎样？'],
 [10, 0.4, 4.5, '借得多，银行会给公司打信用分。'],
 [10, 4.5, 9, '2026 年 7 月，甲骨文被调低了。'],
 [10, 9, 13.5, '现在是 BBB−，离高风险只差一级。'],
 [10, 13.5, 18, '分一降，借钱就更贵。'],
 [10, 18, 22.5, '最近一季，光利息就 14 亿美元。'],
 [10, 22.5, 26.5, '比一年前，多了 55%。'],
 [10, 26.5, 30.2, '这些利息，每个季度都要付。'],
 [11, 0.3, 4.5, '那怎么还？靠订单变成收入。'],
 [11, 4.5, 9, '公司预计，约一半订单，三年内变收入。'],
 [11, 9, 13.5, '新订单里，不少客户先付一部分钱。'],
 [11, 13.5, 18, '有的客户，还自己出设备。'],
 [11, 18, 22.5, '这样，甲骨文不用全部垫钱。'],
 [11, 22.5, 27, '但要等楼盖好，机器上线。'],
 [11, 27, 30.9, '中间这段空窗期，靠借钱撑。'],
 [12, 0.45, 2.5, '接下来，盯什么？'],
 [13, 0.33, 4.5, '这不是预测，只是四个能自己查的信号。'],
 [13, 4.5, 9, '一，订单，有没有变成收入。'],
 [13, 9, 13.5, '二，赚的钱，什么时候超过花的钱。'],
 [13, 13.5, 18, '三，信用分，会不会再降。'],
 [13, 18, 22.5, '四，借钱的利息，涨得快不快。'],
 [13, 22.5, 28.5, '如果订单顺利变成收入，压力会变小。'],
 [13, 28.5, 34.5, '如果楼晚了、客户少付，压力会变大。'],
 [13, 34.5, 40.5, '结果怎样，看之后每一季的数字。'],
 [13, 40.5, 46.4, '留言说说，你怎么看？'],
 [14, 0.3, 4, '回头看：先接单，再盖楼，'],
 [14, 4, 8, '钱不够，就借、就卖股、就租楼，'],
 [14, 8, 11.9, '最后，靠订单变成收入来还。'],
 [15, 0.5, 17.9, '以上为公开资料整理，不构成投资建议。'],
]

RAWCUES = [
 [0, 0.05, 'whoosh'], [0, 1.1, 'pop'], [0, 2.4, 'soft'], [0, 4.3, 'pop'], [0, 5.2, 'pop'], [0, 6.1, 'pop'], [0, 7.0, 'hit'],
 [2, 0.4, 'soft'], [2, 1.0, 'pop'], [2, 4.4, 'pop'], [2, 8.4, 'pop'], [2, 12.4, 'pop'], [2, 13.6, 'pop'], [2, 14.8, 'ding'], [2, 17.4, 'ding'], [2, 22.4, 'ding'], [2, 27.4, 'hit'],
 [4, 0.4, 'soft'], [4, 4.8, 'pop'], [4, 9.8, 'pop'], [4, 14.8, 'pop'], [4, 20.0, 'ding'], [4, 25.5, 'hit'], [4, 37.6, 'pop'], [4, 39.4, 'pop'], [4, 41.2, 'pop'],
 [6, 0.3, 'soft'], [6, 9.2, 'pop'], [6, 13.7, 'pop'], [6, 18.2, 'pop'], [6, 22.7, 'ding'],
 [8, 0.5, 'soft'], [8, 0.9, 'pop'], [8, 2.0, 'pop'], [8, 4.6, 'pop'], [8, 5.2, 'grow'], [8, 9.2, 'grow'], [8, 13.6, 'pop'], [8, 18.2, 'ding'], [8, 23.2, 'hit'],
 [10, 0.4, 'soft'], [10, 0.9, 'pop'], [10, 1.5, 'pop'], [10, 2.1, 'pop'], [10, 2.7, 'pop'], [10, 3.3, 'pop'], [10, 4.8, 'ding'], [10, 9.3, 'hit'], [10, 13.6, 'pop'], [10, 18.2, 'ding'], [10, 22.6, 'ding'],
 [11, 0.4, 'soft'], [11, 0.9, 'pop'], [11, 2.0, 'pop'], [11, 3.1, 'pop'], [11, 4.0, 'pop'], [11, 4.8, 'pop'], [11, 9.4, 'pop'], [11, 27.2, 'hit'],
 [13, 0.4, 'soft'], [13, 4.6, 'pop'], [13, 9.1, 'pop'], [13, 13.6, 'pop'], [13, 18.1, 'pop'], [13, 22.6, 'ding'], [13, 28.6, 'hit'], [13, 40.6, 'grow'],
 [14, 0.6, 'pop'], [14, 2.4, 'pop'], [14, 4.2, 'pop'], [14, 6, 'pop'], [14, 8, 'ding'],
 [15, 0.3, 'soft'],
]
COUNTS = [(2, 17.4, 1.4), (2, 22.4, 1.4), (4, 20.0, 1.4), (4, 25.5, 1.4), (6, 22.7, 1.5), (8, 18.2, 1.4), (10, 18.2, 1.4), (10, 22.6, 1.4)]
