# TSMC Q3 2026 earnings, value-investing view. 300 s timeline, one short subtitle line each.
from scenes_fin import chap

S = []
S.append('''
        <div class="scene s0" data-start="0" data-end="8.161">
          <h2 class="hero" style="top:4.5cqw;font-size:8.6cqw;line-height:1.12" data-a="0.15,0.9">台积电赚翻了<br>股价为什么还跌？</h2>
          <p class="hero-sub" style="top:27.5cqw;font-size:3cqw" data-a="1.1,0.9">用价值投资的眼光，看这份财报</p>
          <div class="fl" style="left:14cqw;right:14cqw">
            <p class="fc g" data-a="4.3,0.5">利润创纪录</p><p class="fa" data-a="4.9,0.4">→</p>
            <p class="fc" data-a="5.2,0.5">股价却下跌</p><p class="fa" data-a="5.8,0.4">→</p>
            <p class="fc i" data-a="6.1,0.5">为什么</p><p class="fa" data-a="6.7,0.4">→</p>
            <p class="fc" data-a="7.0,0.5">怎么看</p>
          </div>
          <p class="ht" data-a="2.4,0.7">信息整理，不构成投资建议</p>
        </div>
''')
S.append(chap(8.161, 10.711, '成绩单', 'THE REPORT', '先看这份成绩单'))

def tier(i, top, nm, ds, nu, small, a):
    return f'''          <div class="tier" style="top:{top}cqw" data-a="{a},0.6"><span class="i">0{i}</span><span class="nm">{nm}</span><span class="ds">{ds}</span><span class="nu">{nu}<small>{small}</small></span></div>\n'''

# ---- s1: the report card
t1 = tier(1, 14, '卖了多少', '比去年同期，多了一半', '14,942 亿', '新台币 · 比去年 +50.9%', 4.5)
t1 += tier(2, 21, '赚了多少', '净利润，单季历史新高', '7,631 亿', '新台币 · 比去年 +68.7%', 9.5)
t1 += tier(3, 28, '赚钱效率', '每卖 100 块，净赚 51 块', '51.1%', '净利率', 14.5)
S.append(f'''
        <div class="scene s1" data-start="10.711" data-end="42.205">
          <p class="hd" data-a="0.3,0.7">这份财报，<em>真的很好</em></p>
{t1}          <p class="st" style="left:8cqw;width:84cqw;top:36.5cqw" data-a="25.5,0.6"><span class="n" style="font-size:5cqw" data-a="25.5,1.4" data-count="2" data-dec="0">0</span><span class="u">%</span><span class="l" style="display:inline;margin-left:1.2cqw;font-size:1.7cqw">净利润，比分析师预期多一点点</span></p>
        </div>
''')
S.append(chap(42.205, 44.755, '股价跌', 'THE DROP', '好成绩，为什么还跌？'))

# ---- s2: price reaction
t2 = tier(1, 14, '芯片板块', '财报前一天，整个板块在跌', '−4.3%', '费城半导体指数 · 10 月 14 日', 4.5)
t2 += tier(2, 21, '台积电美股', '财报前一天收盘，约 430 美元', '−3.4%', '10 月 14 日', 12.5)
t2 += tier(3, 28, '财报公布后', '美股盘前，又往下跌', '约 −2%', '10 月 15 日 · 盘前', 18.5)
S.append(f'''
        <div class="scene s2" data-start="44.755" data-end="93.271">
          <p class="hd" data-a="0.3,0.7">财报前后，<em>股价一直在跌</em></p>
{t2}          <p class="nb" style="left:8cqw;top:36cqw" data-a="27.0,0.6">怕<b>美联储再加息</b>，芯片股被一起卖</p>
          <p class="nb" style="left:8cqw;top:41.5cqw" data-a="36.5,0.6">但台积电今年到现在，仍<b>涨了 57%</b></p>
        </div>
''')
S.append(chap(93.271, 95.821, '预期高', 'EXPECTATIONS', '原因一：好消息早在价格里'))

# ---- s3: expectations
S.append('''
        <div class="scene s3" data-start="95.821" data-end="123.06">
          <p class="hd" data-a="0.3,0.7">原因一：<em>好消息，早在价格里</em></p>
          <p class="st" style="left:8cqw;width:70cqw;top:13cqw" data-a="4.6,0.6"><span class="n" data-a="4.6,1.4" data-count="487" data-dec="0">0</span><span class="u">美元</span><span class="l">10 月初的近期高点（台积电美股）</span></p>
          <p class="rkc" style="left:6cqw;top:24.5cqw;width:27cqw;height:12.5cqw" data-a="9.4,0.7"><span class="k">分析师预期</span><span class="t">约 4.4–4.5</span><span class="d">美元 / 每股</span></p>
          <p class="rkc" style="left:36.5cqw;top:24.5cqw;width:27cqw;height:12.5cqw" data-a="13.9,0.7"><span class="k">实际赚到</span><span class="t">4.60</span><span class="d">美元 / 每股</span></p>
          <p class="rkc" style="left:67cqw;top:24.5cqw;width:27cqw;height:12.5cqw" data-a="18.4,0.7"><span class="k">超出预期</span><span class="t">一点点</span><span class="d">不算惊喜</span></p>
          <p class="nb" style="left:8cqw;top:39cqw" data-a="21.6,0.6">好比学霸考 98 分，<b>大家早猜 97</b></p>
        </div>
''')
S.append(chap(123.06, 125.61, '利润率', 'MARGIN', '原因二：赚钱效率在降'))

# ---- s4: margin
S.append('''
        <div class="scene s4" data-start="125.61" data-end="157.104">
          <p class="hd" data-a="0.3,0.7">原因二：<em>利润率在变薄</em></p>
          <p class="nb" style="left:8cqw;top:13.5cqw" data-a="4.5,0.6">毛利率：卖 100 块，扣掉制造成本，<b>还剩多少</b></p>
          <p class="st" style="left:8cqw;width:44cqw;top:21cqw" data-a="9.4,0.6"><span class="n" data-a="9.4,1.4" data-count="1.3" data-dec="1">0</span><span class="u">个百分点</span><span class="l">毛利率比上一季度低（67.7% → 66.4%）</span></p>
          <p class="st" style="left:56cqw;width:38cqw;top:21cqw" data-a="18.4,0.6"><span class="n" style="color:var(--hot);text-shadow:none">3–4%</span><span class="l">海外工厂的拖累：现在约 2%，以后更多</span></p>
          <p class="nb" style="left:8cqw;top:34cqw" data-a="13.9,0.6">新技术 2nm 刚量产，成本高</p>
          <p class="nb" style="left:8cqw;top:40cqw" data-a="27.2,0.6">下一季指引 65%–67%，<b>没说会回升</b></p>
        </div>
''')
S.append(chap(157.104, 159.654, '花钱多', 'CAPEX', '原因三：盖厂特别烧钱'))

# ---- s5: capex
S.append('''
        <div class="scene s5" data-start="159.654" data-end="190">
          <p class="hd" data-a="0.3,0.7">原因三：<em>盖厂，特别烧钱</em></p>
          <p class="st" style="left:8cqw;width:46cqw;top:14cqw" data-a="4.8,0.6"><span class="n">600–640</span><span class="u">亿美元</span><span class="l">今年计划，花在盖厂、买设备上</span></p>
          <p class="st" style="left:60cqw;width:34cqw;top:14cqw" data-a="13.9,0.6"><span class="n" data-a="13.9,1.4" data-count="20" data-dec="0">0</span><span class="u">座</span><span class="l">全球在建的晶圆厂（约数）</span></p>
          <p class="nb" style="left:8cqw;top:27cqw" data-a="9.4,0.6">约占一年收入的 13%–14%</p>
          <p class="nb" style="left:8cqw;top:33cqw" data-a="18.4,0.6">2026–2028 年，会比过去三年<b>花得更多</b></p>
          <p class="nb" style="left:8cqw;top:39cqw" data-a="23.4,0.6">花钱多，<b>能分给股东的</b>就少一些</p>
        </div>
''')

# ---- s6: next year
S.append('''
        <div class="scene s6" data-start="190" data-end="220.937">
          <p class="hd" data-a="0.3,0.7">还有，<em>公司对明年很谨慎</em></p>
          <p class="rkc" style="left:6cqw;top:14cqw;width:27cqw;height:12.5cqw" data-a="4.5,0.7"><span class="k">AI 需求</span><span class="t">很强</span><span class="d">公司说：需求超过产能</span></p>
          <p class="rkc" style="left:36.5cqw;top:14cqw;width:27cqw;height:12.5cqw" data-a="9.0,0.7"><span class="k">手机、电脑等</span><span class="t">偏弱</span><span class="d">零件涨价，客户推迟换机</span></p>
          <p class="rkc" style="left:67cqw;top:14cqw;width:27cqw;height:12.5cqw" data-a="18.4,0.7"><span class="k">高性能计算</span><span class="t">占 68%</span><span class="d">一年收入里，AI 相关占大头</span></p>
          <p class="nb" style="left:8cqw;top:32cqw" data-a="22.6,0.6">公司对 2027 年：<b>保持审慎</b></p>
          <p class="nb" style="left:8cqw;top:38.5cqw" data-a="26.6,0.6">工厂不满，成本就压不下来</p>
        </div>
''')
S.append(chap(220.937, 223.487, '看价值', 'VALUE VIEW', '价值投资怎么看'))

def sg(i, top, nm, ds, a):
    return f'''          <div class="sg" style="top:{top}cqw" data-a="{a},0.6"><span class="i">0{i}</span><span class="nm">{nm}<span class="ds">{ds}</span></span></div>\n'''
sgs = sg(1, 9, '生意变差了吗', '公司说：需求超过产能', 4.6)
sgs += sg(2, 16, '赚的钱，能变成现金吗', '盖厂花得多，要看还剩多少', 9.1)
sgs += sg(3, 23, '现价里，装了什么假设', '倍数越高，要求越高', 13.6)
sgs += sg(4, 30, '打折够不够多', '这叫“安全边际”', 18.1)
S.append(f'''
        <div class="scene s7" data-start="223.487" data-end="270">
          <p class="disc" data-a="0.4,0.6">信息整理，不构成投资建议</p>
{sgs}          <p class="rkc" style="left:58cqw;top:9cqw;width:35cqw;height:12.5cqw" data-a="22.8,0.7"><span class="k">按过去 12 个月的利润</span><span class="t">约 31 倍</span><span class="d">约 31 年回本；5 年中位数约 22.6 倍</span></p>
          <p class="rkc" style="left:58cqw;top:23.5cqw;width:35cqw;height:12.5cqw" data-a="28.8,0.7"><span class="k">按明年的预期利润</span><span class="t">约 19 倍</span><span class="d">前提：明年利润，真如预期</span></p>
          <p class="qq" style="top:38.4cqw" data-a="40.6,0.7">价格，是别人的预期；价值，是公司赚钱的能力。</p>
        </div>
''')
S.append('''
        <div class="scene s14" data-start="270" data-end="282">
          <h2 class="hd" data-a="0.2,0.7">好公司，<em>还要看价格</em></h2>
          <div class="tl"><i data-a="0.5,8.5"></i></div>
          <div class="dot2" style="left:10%" data-a="0.6,0.5"></div>
          <div class="dot2" style="left:30%" data-a="2.4,0.5"></div>
          <div class="dot2" style="left:50%" data-a="4.2,0.5"></div>
          <div class="dot2" style="left:70%" data-a="6,0.5"></div>
          <div class="dot2" style="left:90%" data-a="8,0.5"></div>
          <div class="node" style="left:10%" data-a="0.6,0.7"><p class="y">利润</p><p class="h">创下新高</p><p class="d">净利 +68.7%</p></div>
          <div class="node dn" style="left:30%" data-a="2.4,0.7"><p class="y">预期</p><p class="h">早涨进价格</p><p class="d">只超一点点</p></div>
          <div class="node" style="left:50%" data-a="4.2,0.7"><p class="y">利润率</p><p class="h">略有下降</p><p class="d">66.4%（−1.3）</p></div>
          <div class="node dn" style="left:70%" data-a="6,0.7"><p class="y">花钱</p><p class="h">盖厂烧钱</p><p class="d">600–640 亿美元</p></div>
          <div class="node" style="left:90%" data-a="8,0.7"><p class="y">估值</p><p class="h">倍数不低</p><p class="d">约 31 倍</p></div>
        </div>
''')
SRC = [
    ('台积电官方新闻稿（2026 年第三季）', 'pr.tsmc.com/english/news/3346'),
    ('路透社：创纪录利润，但对 2027 年谨慎', 'businessday.co.za/world/international-companies/2026-10-15-tsmc-sees-record-profit-but-warns-of-2027-caution/'),
    ('Investing.com：法说会要点', 'cn.investing.com/news/transcripts/article-93CH-3609807'),
    ('Investing.com：股价与芯片股下跌', 'cn.investing.com/news/stock-market-news/article-3610151'),
    ('Investing.com（英文）：AI 股与台积电财报', 'investing.com/news/stock-market-news/can-tsmc-earnings-help-settle-ai-jitters-4950915'),
    ('Finimize：为什么对 2027 年谨慎', 'finimize.com/content/tsmcs-ai-chip-engine-keeps-setting-profit-records'),
    ('TIKR：财报后估值与预期', 'tikr.com/blog/tsmc-posts-a-sixth-straight-record-quarter-and-its-q4-guide-says-the-ai-boom-isnt-slowing-heres-the-fuller-picture'),
    ('GuruFocus：市盈率与历史比较', 'gurufocus.com/news/9124828/tsmc-reports-record-q3-2026-profit-stock-ticker-tsm'),
    ('Tradestie：财报前预期与股价位置', 'tradestie.com/news/tsm-earnings-oct-15-448-eps-consensus-key-levels-to-watch-20261015/'),
]
li = '\n            '.join(f'<li data-a="{0.25 + 0.16 * i:.2f},0.5"><b>{n}</b><span>{u}</span></li>' for i, (n, u) in enumerate(SRC))
S.append(f'''
        <div class="scene s15" data-start="282" data-end="300">
          <ul class="srclist">
            {li}
          </ul>
          <p class="foot" data-a="2.8,0.6" style="top:2.2cqw">信息整理，不构成投资建议 · 数据截至 2026-10-15</p>
        </div>
''')

NAMES = ['开场', '章节 · 成绩单', '成绩单', '章节 · 股价跌', '股价反应', '章节 · 预期高', '原因一：预期', '章节 · 利润率', '原因二：利润率', '章节 · 花钱多', '原因三：盖厂花钱', '对明年谨慎', '章节 · 看价值', '价值投资四问', '回头看', '资料来源']

RAW = [
 [0, 0, 4.2, '台积电利润创了纪录，'],
 [0, 4.2, 8.1, '股价却跌了。为什么？'],
 [1, 0.45, 2.5, '先看这份成绩单。'],
 [2, 0.3, 4.5, '先看成绩单，真的很好。'],
 [2, 4.5, 9.5, '卖了 1.49 万亿新台币，多了一半。'],
 [2, 9.5, 14.5, '净利润 7631 亿，比去年多近七成。'],
 [2, 14.5, 19.5, '每卖 100 块，净赚 51 块。'],
 [2, 19.5, 25.0, '这是单季新高，连续第六次。'],
 [2, 25.0, 31.4, '净利润，还比分析师预期多一点点。'],
 [3, 0.45, 2.5, '成绩这么好，股价为啥跌？'],
 [4, 0.3, 4.4, '好成绩出来了，股价却在跌。'],
 [4, 4.4, 8.0, '财报前一天，芯片板块先大跌，'],
 [4, 8.0, 12.0, '费城半导体指数，跌了 4.3%。'],
 [4, 12.0, 17.5, '台积电美股，当天也跌了 3.4%。'],
 [4, 17.5, 22.5, '财报公布后，美股盘前又跌约 2%。'],
 [4, 22.5, 27.0, '芯片股一起跌，市场在担心什么？'],
 [4, 27.0, 32.5, '有人怕美联储再加息，'],
 [4, 32.5, 36.5, '成长股，先被卖出去。'],
 [4, 36.5, 41.0, '但台积电今年，仍涨了 57%。'],
 [4, 41.0, 44.5, '好财报，不等于股价上涨。'],
 [4, 44.5, 48.4, '接下来，看三个原因。'],
 [5, 0.45, 2.5, '原因一：预期太高。'],
 [6, 0.3, 4.5, '原因一：好消息，早就在价格里。'],
 [6, 4.5, 9.0, '10 月初，股价刚创新高，约 487 美元。'],
 [6, 9.0, 13.5, '分析师预期，每股赚约 4.4 到 4.5 美元。'],
 [6, 13.5, 18.0, '实际赚了 4.60 美元。'],
 [6, 18.0, 21.5, '只多了一点点。'],
 [6, 21.5, 27.1, '学霸考 98，大家本来就猜 97。'],
 [7, 0.45, 2.5, '原因二：赚钱效率在降。'],
 [8, 0.3, 4.4, '原因二：赚钱的效率，在变薄。'],
 [8, 4.4, 9.0, '毛利率，就是卖 100 块，还剩多少。'],
 [8, 9.0, 13.5, '上一季剩 67.7 块，这一季剩 66.4 块。'],
 [8, 13.5, 18.0, '少了 1.3，因为 2nm 刚量产，成本高。'],
 [8, 18.0, 22.5, '海外建厂，也在拖累利润率。'],
 [8, 22.5, 27.0, '现在约 2%，以后会到 3% 到 4%。'],
 [8, 27.0, 31.4, '下一季，公司没说会回升。'],
 [9, 0.45, 2.5, '原因三：花钱多。'],
 [10, 0.4, 4.4, '原因三：盖厂，特别烧钱。'],
 [10, 4.4, 9.0, '今年计划花 600 到 640 亿美元。'],
 [10, 9.0, 13.5, '约占一年收入的 13% 到 14%。'],
 [10, 13.5, 18.0, '全球有约 20 座工厂在建。'],
 [10, 18.0, 23.0, '接下来三年，花得比过去三年更多。'],
 [10, 23.0, 27.5, '花钱多，能分给股东的就少一些。'],
 [10, 27.5, 30.2, '这是市场担心的地方。'],
 [11, 0.4, 4.4, '还有一点：公司对明年很谨慎。'],
 [11, 4.4, 9.0, 'AI 需求很强，公司说需求超过产能。'],
 [11, 9.0, 13.5, '手机、电脑这类需求偏弱。'],
 [11, 13.5, 18.0, '零件涨价，不少客户推迟换机。'],
 [11, 18.0, 22.5, '高性能计算，占一年收入的 68%。'],
 [11, 22.5, 26.5, '公司说，对明年，保持审慎。'],
 [11, 26.5, 30.8, '工厂不满，成本就压不下来。'],
 [12, 0.45, 2.5, '价值投资怎么看？'],
 [13, 0.33, 4.5, '价值投资，看四个问题，不是预测。'],
 [13, 4.5, 9.1, '一，生意变差了吗？公司说需求超过产能。'],
 [13, 9.1, 13.6, '二，赚的钱，能变成现金吗？'],
 [13, 13.6, 18.1, '三，现在的价格里，装了什么假设？'],
 [13, 18.1, 22.6, '四，打折够不够多？这叫安全边际。'],
 [13, 22.6, 28.6, '按过去 12 个月的利润，约 31 倍。'],
 [13, 28.6, 34.6, '按明年的预期利润，约 19 倍。'],
 [13, 34.6, 40.6, '利率约 5%，未来的利润就没那么值钱。'],
 [13, 40.6, 46.4, '价格是预期，价值是赚钱的能力。'],
 [14, 0.3, 4.0, '回头看：利润确实很好，'],
 [14, 4.0, 8.0, '但好消息早在价格里，花钱也多，'],
 [14, 8.0, 11.9, '好公司，还要看价格。'],
 [15, 0.5, 17.9, '以上为公开资料整理，不构成投资建议。'],
]

RAWCUES = [
 [0, 0.05, 'whoosh'], [0, 1.1, 'pop'], [0, 2.4, 'soft'], [0, 4.3, 'pop'], [0, 5.2, 'pop'], [0, 6.1, 'pop'], [0, 7.0, 'hit'],
 [2, 0.4, 'soft'], [2, 4.5, 'pop'], [2, 9.5, 'pop'], [2, 14.5, 'pop'], [2, 25.5, 'ding'],
 [4, 0.4, 'soft'], [4, 4.5, 'pop'], [4, 12.5, 'pop'], [4, 18.5, 'pop'], [4, 27.0, 'hit'], [4, 36.5, 'ding'],
 [6, 0.3, 'soft'], [6, 4.6, 'ding'], [6, 9.4, 'pop'], [6, 13.9, 'pop'], [6, 18.4, 'pop'], [6, 21.6, 'hit'],
 [8, 0.4, 'soft'], [8, 4.5, 'pop'], [8, 9.4, 'ding'], [8, 13.9, 'pop'], [8, 18.4, 'ding'], [8, 27.2, 'hit'],
 [10, 0.4, 'soft'], [10, 4.8, 'ding'], [10, 9.4, 'pop'], [10, 13.9, 'ding'], [10, 18.4, 'pop'], [10, 23.4, 'hit'],
 [11, 0.4, 'soft'], [11, 4.5, 'pop'], [11, 9.0, 'pop'], [11, 18.4, 'pop'], [11, 22.6, 'pop'], [11, 26.6, 'hit'],
 [13, 0.4, 'soft'], [13, 4.6, 'pop'], [13, 9.1, 'pop'], [13, 13.6, 'pop'], [13, 18.1, 'pop'], [13, 22.8, 'ding'], [13, 28.8, 'ding'], [13, 40.6, 'grow'],
 [14, 0.6, 'pop'], [14, 2.4, 'pop'], [14, 4.2, 'pop'], [14, 6, 'pop'], [14, 8, 'ding'],
 [15, 0.3, 'soft'],
]
COUNTS = [(2, 25.5, 1.4), (6, 4.6, 1.4), (8, 9.4, 1.4), (10, 13.9, 1.4)]
