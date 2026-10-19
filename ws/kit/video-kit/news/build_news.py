import re
SP='/tmp/claude-0/-home-claude/7d578916-a400-5c24-bb34-8996a1a97376/scratchpad/'
t=open(SP+'kit/video-kit/template.html',encoding='utf-8').read()

def chap(start,end,word,en,sub):
    return f'''        <div class="scene chap" data-start="{start}" data-end="{end}">
          <i class="vline" data-a="0,0.5"></i>
          <div class="flash" data-a="0.35,0.8"></div>
          <div class="parts" data-a="0.35,2.6"></div>
          <div class="wordbox"><span class="word" data-a="0.35,0.4">{word}</span></div>
          <p class="en" data-a="0.9,0.6">{en}</p>
          <p class="csub" data-a="1.2,0.6">{sub}</p>
        </div>
'''
S=[]
S.append('''        <div class="scene s0" data-start="0" data-end="6.663">
          <i class="rule"></i>
          <p class="tag"><b>情报简报</b> · 美股</p>
          <h2 class="hero">美股大跌</h2>
          <p class="hero-sub">一份通胀数据，砸向科技股</p>
          <p class="date">NASDAQ −1.88% · S&amp;P 500 −1.11% · 2026.10.14 美东收盘</p>
        </div>
''')
S.append(chap(6.663,9.2,'导火索','TRIGGER','关键数字 1 / 3'))
S.append('''        <div class="scene s1" data-start="9.2" data-end="34.324">
          <p class="tag"><b>关键数字 1 / 3</b> · 通胀</p>
          <p class="bignum"><span class="u">同比</span><span class="n" data-a="0.3,1.8" data-count="3.7" data-dec="1">0.0</span><span class="u">%</span></p>
          <p class="cap">2026 年 9 月美国 CPI（消费者物价指数）</p>
          <div class="chips">
            <p class="chip" data-a="4.5,0.6"><small>8 月</small>3.4%</p>
            <p class="chip" data-a="5.4,0.6"><small>核心 CPI</small>2.6%</p>
          </div>
          <p class="gloss" data-a="6.3,0.7"><b>CPI</b>衡量物价涨了多少。涨得快，美联储就更可能加息。</p>
          <div class="rng">
            <div class="band" data-a="12.3,1" style="left:55.714%;width:2.857%"></div>
            <p class="bandlab" data-a="12.3,1" style="left:50%;width:14.286%">市场预期 <b>3.6%</b></p>
            <div class="gap" data-a="19.5,1.2" style="left:57.143%;width:calc(var(--p) * 14.286%)"></div>
            <div class="act" data-a="18.8,0.8" style="left:71.429%"></div>
            <p class="actlab" data-a="18.8,0.8" style="left:71.429%">实际 <b>3.7%</b></p>
            <p class="diff" data-a="21.5,0.8" style="left:57.143%;width:14.286%">高出 0.1 个百分点</p>
            <div class="axis">
              <span style="left:14.286%">3.3</span><span style="left:28.571%">3.4</span><span style="left:42.857%">3.5</span><span style="left:57.143%">3.6</span><span style="left:71.429%">3.7</span><span style="left:85.714%">3.8</span>
              <span class="unit">同比 %</span>
            </div>
          </div>
          <p class="src">来源：TheStreet、Investrade（10/14）。预期值为经济学家共识，不是实际数据；不同来源对共识略有出入。</p>
        </div>
''')
S.append(chap(34.324,37.2,'大盘','MARKET','关键数字 2 / 3'))
S.append('''        <div class="scene s2" data-start="37.2" data-end="59.857">
          <p class="tag"><b>关键数字 2 / 3</b> · 指数跌幅</p>
          <p class="bignum"><span class="u">纳指 −</span><span class="n" data-a="0.4,1.6" data-count="1.88" data-dec="2">0.00</span><span class="u">%</span></p>
          <p class="unit-tag">四大指数 10 月 14 日单日跌幅（%），小字为收盘点位</p>
          <div class="bars">
            <div class="bcol ghost" data-a="2.5,1" style="--h:0.75cqw"><p class="v">−0.09<small>51,621</small></p><div class="b"></div><p class="m">道琼斯</p></div>
            <div class="bcol" data-a="4,1" style="--h:9.2cqw"><p class="v">−1.11<small>7,719</small></p><div class="b"></div><p class="m">标普 500</p></div>
            <div class="bcol" data-a="5.5,1" style="--h:15.6cqw"><p class="v">−1.88<small>26,693</small></p><div class="b"></div><p class="m">纳斯达克</p></div>
            <div class="bcol" data-a="7,1" style="--h:16cqw"><p class="v">−1.93<small>2,730</small></p><div class="b"></div><p class="m">罗素 2000</p></div>
          </div>
          <div class="side">
            <p class="chip" data-a="5.8,0.6"><small>标普 500</small>7,719</p>
            <p class="chip" data-a="16,0.6"><small>VIX</small>两周新高</p>
            <p class="chip" data-a="19.3,0.6"><small>最弱板块</small>科技 −3%</p>
          </div>
          <p class="src">来源：TheStreet、Investrade（10/14 美东收盘），两处数字一致。柱高为跌幅大小，非指数走势。</p>
        </div>
''')
S.append(chap(59.857,63.2,'利率','RATES','关键数字 3 / 3'))
S.append('''        <div class="scene s3" data-start="63.2" data-end="91.773">
          <p class="tag"><b>关键数字 3 / 3</b> · 利率</p>
          <div class="mrow" style="top:10cqw">
            <h3>美联储基准利率</h3>
            <p class="desc">9 月刚加息 0.25 个百分点，是 2023 年以来第一次</p>
            <div class="mtrack">
              <div class="band" data-a="7.5,1" style="left:25%;width:25%"></div>
              <p class="bandlab" data-a="7.5,1" style="left:25%;width:25%">现在 <b>3.75–4.00%</b></p>
              <div class="dot" data-a="15,0.8" style="left:75%;background:transparent;border:2px dashed var(--gold);box-shadow:none"></div>
              <p class="dotlab" data-a="15,0.8" style="left:75%">若再加息，上限 <b>4.25%</b></p>
              <div class="axis"><span style="left:0%">3.50%</span><span style="left:25%">3.75%</span><span style="left:50%">4.00%</span><span style="left:75%">4.25%</span><span style="left:100%">4.50%</span></div>
            </div>
          </div>
          <div class="mrow" style="top:28cqw">
            <h3>10 年期美债收益率</h3>
            <p class="desc">借给美国政府 10 年，一年能拿多少利息</p>
            <div class="mtrack">
              <p class="dotlab" data-a="22,0.8" style="left:60%">约 <b>5.2%</b></p>
              <div class="dot" data-a="22,0.8" style="left:60%"></div>
              <div class="axis"><span style="left:0%">4.6%</span><span style="left:20%">4.8%</span><span style="left:40%">5.0%</span><span style="left:60%">5.2%</span><span style="left:80%">5.4%</span><span style="left:100%">5.6%</span></div>
            </div>
          </div>
          <p class="src">来源：Investrade（10/14）、Admirals（美联储 9 月加息与 10/28 议息）。10 年期收益率当日各来源在 5.19%–5.28% 之间，取约 5.2%。</p>
        </div>
''')
S.append(chap(91.773,95.2,'科技','TECH','谁被砸得最狠'))
S.append('''        <div class="scene s4" data-start="95.2" data-end="111.987">
          <p class="tag"><b>谁在跌</b> · 科技板块</p>
          <p class="bignum"><span class="u">科技板块 −</span><span class="n" data-a="0.4,1.8" data-count="3.0" data-dec="1">0.0</span><span class="u">%</span></p>
          <p class="cap">标普 500 十一个板块里，单日跌得最多的一个</p>
          <div class="chips"><p class="chip" data-a="7.8,0.6"><small>CoreWeave</small>跌超 15%</p><p class="chip" data-a="9.6,0.6"><small>戴尔</small>−8.3%</p></div>
          <p class="note" data-a="14,0.6">利率越高，靠借钱扩建 AI 的公司压力越大</p>
          <p class="src">来源：TheStreet（板块 −3.00%、戴尔 −8.28%，巴克莱下调评级）；Investrade（CoreWeave，债券抛售所致，仅此一处来源）。</p>
        </div>
''')
S.append(chap(111.987,115.2,'看点','WATCHLIST','接下来看什么'))
S.append('''        <div class="scene s5" data-start="115.2" data-end="136.456">
          <p class="tag"><b>关注</b> · 接下来</p>
          <h2>接下来，看四件事</h2>
          <div class="grid4">
            <div class="item" data-a="0.4,0.7"><p class="k">利率</p><p class="t">10 月 28 日议息会议<br>再加息，还是暂停</p></div>
            <div class="item" data-a="7,0.7"><p class="k">收益率</p><p class="t">10 年期美债收益率<br>继续冲高，还是回落</p></div>
            <div class="item" data-a="13.5,0.7"><p class="k">油价</p><p class="t">WTI 约 95 美元<br>布伦特约 106 美元</p></div>
            <div class="item" data-a="18,0.7"><p class="k">AI 融资</p><p class="t">AI 公司的融资成本<br>债券市场怎么反应</p></div>
          </div>
          <p class="src">来源：Admirals（10/28 议息）、Investrade（油价，10/14 收盘）</p>
        </div>
''')
S.append(chap(136.456,140.2,'风险','RISK','最后要留意的'))
S.append('''        <div class="scene s6" data-start="140.2" data-end="149">
          <p class="tag"><b>风险点</b></p>
          <h2>高估值，最怕高利率</h2>
          <p class="stmt" data-a="1,1.2">利率升高时，未来的利润要打更大的折，所以<em>估值高的成长股</em>通常最敏感。</p>
          <p class="src">说明：一般性的估值逻辑，不是对个股的判断；单日行情不代表之后的走势。</p>
        </div>
''')
S.append('''        <div class="scene s7" data-start="149" data-end="156">
          <p class="tag"><b>数据来源</b> · SOURCES</p>
          <ul class="srclist">
            <li data-a="0.30,0.5"><b>TheStreet（10/14）</b><span>thestreet.com/stock-market-today/stock-market-today-dow-jones-sp-500-nasdaq-updates-oct-14-2026</span></li>
            <li data-a="0.52,0.5"><b>Investrade（10/14）</b><span>investrade.com/market-review-october-14-2026/</span></li>
            <li data-a="0.74,0.5"><b>Admirals（美联储）</b><span>admiralmarkets.com/analytics/traders-blog/fomc-minutes-october-2026</span></li>
            <li data-a="0.96,0.5"><b>CoinGape（美联储）</b><span>coingape.com/prediction-markets/will-the-fed-raise-interest-rates-after-the-october-2026-meeting-odds-split-50-50/</span></li>
          </ul>
          <p class="foot" data-a="1.8,0.6">信息整理，不构成投资建议 · 数据截至 2026-10-15</p>
        </div>

''')
scenes=''.join(S)
a=t.index('        <!-- 0 开场 -->')
b=t.index('        <div class="sub" id="sub"')
t=t[:a]+scenes+t[b:]

# title & header
t=t.replace('<title>台积电三季报前瞻</title>','<title>美股大跌复盘</title>')
t=t.replace('<p class="eyebrow">半导体 · 财报前瞻 · 样片</p>','<p class="eyebrow">美股 · 市场复盘 · 约 2 分半</p>')
t=t.replace('<h1>台积电三季报前瞻</h1>','<h1>美股大跌复盘</h1>')
t=re.sub(r'<p class="meta">.*?</p>','<p class="meta">横屏 16:9，约 2 分 36 秒，无配音，含固定背景音乐和合成音效（点播放后出声）。六个专场页的“咚”都落在音乐的小节强拍上。口播稿、史实核对、卡点表、名词解释和数据来源在下方。美国市场数据为 2026-10-14 美东收盘，整理于 2026-10-15。</p>',t,count=1,flags=re.S)

# NAMES + LINES
na=t.index("  var NAMES = [")
nb=t.index("  var $ = function")
new_lines='''  var NAMES = ['开场', '章节 · 导火索', '关键数字 1 · 通胀', '章节 · 大盘', '关键数字 2 · 指数跌幅', '章节 · 利率', '关键数字 3 · 利率', '章节 · 科技', '谁在跌', '章节 · 看点', '接下来看什么', '章节 · 风险', '风险与声明', '数据来源'];
  // [scene index, start, end, text]
  var LINES = [
    [0, 0, 3, '美股大跌，纳斯达克一天跌了将近 2%。'],
    [0, 3, 6.663, '导火索，是一份比预期更热的通胀数据。'],
    [1, 7.06, 9.2, '第一个数字：物价涨了多少。'],
    [2, 9.4, 15.5, '9 月美国 CPI，同比上涨 3.7%，比 8 月的 3.4% 更高。'],
    [2, 15.5, 21.5, '先解释一个词：CPI，就是衡量物价涨了多少。涨得快，美联储就更可能加息。'],
    [2, 21.5, 28, '市场原本预期的是 3.6%。'],
    [2, 28, 34.324, '实际 3.7%，高出 0.1 个百分点；核心 CPI 也比预期高。'],
    [3, 34.72, 37.2, '第二个数字：大盘跌了多少。'],
    [4, 37.4, 45, '纳斯达克指数下跌 1.88%，标普 500 下跌 1.11%。'],
    [4, 45, 53, '小盘股罗素 2000 跌得更多，1.93%；道琼斯几乎没动，只跌 0.09%。'],
    [4, 53, 59.857, '同样是大盘，差距为什么这么大？因为被砸的主要是科技股。'],
    [5, 60.26, 63.2, '第三个数字：利率。'],
    [6, 63.4, 70, '利率，就是借钱的价格：利率越高，企业和个人借钱都越贵。'],
    [6, 70, 78, '美联储 9 月刚加息一次，基准利率在 3.75% 到 4.00%。'],
    [6, 78, 85, '数据一出，押注 10 月或年内再加息的人变多了：再加一次，上限就是 4.25%。'],
    [6, 85, 91.773, '十年期美债收益率约 5.2%；30 年期房贷利率升到 7.5%，是 2023 年 11 月以来最高。'],
    [7, 92.17, 95.2, '谁被砸得最狠？'],
    [8, 95.4, 103, '科技板块是标普 500 里跌得最多的，单日下跌约 3%，半导体和 AI 基础设施公司首当其冲。'],
    [8, 103, 109, 'AI 云公司 CoreWeave 据报跌超 15%；戴尔被巴克莱下调评级，跌 8.3%。'],
    [8, 109, 111.987, '原因：AI 要靠借钱扩建，利率越高，压力越大。'],
    [9, 112.39, 115.2, '接下来，看这四件事。'],
    [10, 115.4, 122, '第一，10 月 28 日美联储议息会议：再加息一次，还是暂停。'],
    [10, 122, 128.5, '第二，美债收益率：继续冲高，还是回落。'],
    [10, 128.5, 133, '第三，油价：WTI 约 95 美元，布伦特约 106 美元，仍在推高物价。'],
    [10, 133, 136.456, '第四，AI 公司的融资成本：债券市场会怎么反应。'],
    [11, 136.86, 140.2, '最后，一个风险。'],
    [12, 140.4, 149, '利率升高时，未来的利润要打更大的折，估值高的成长股通常最敏感。这次最先被卖的，是 AI 相关公司。'],
    [13, 149, 156, '以上为公开信息整理，不构成投资建议，单日行情不代表之后走势。数据来源见画面。']
  ];

'''
t=t[:na]+new_lines+t[nb:]
t=t.replace("[70.7, 'hit'], [78.2, 'soft'], [85.2, 'hit'], [87.7, 'soft'],","[70.7, 'hit'], [78.2, 'soft'], [85.2, 'hit'],")

# body sections: music table names, glossary, sources, add checks
for a_,b_ in [('<td>营收</td><td class="t">0:07.0</td>','<td>导火索</td><td class="t">0:07.0</td>'),('<td>九月</td><td class="t">0:34.7</td>','<td>大盘</td><td class="t">0:34.7</td>'),
              ('<td>利润率</td><td class="t">1:00.2</td>','<td>利率</td><td class="t">1:00.2</td>'),('<td>预期</td><td class="t">1:32.1</td>','<td>科技</td><td class="t">1:32.1</td>'),
              ('<td>看点</td><td class="t">1:52.3</td>','<td>看点</td><td class="t">1:52.3</td>')]:
    assert a_ in t,a_; t=t.replace(a_,b_)
ga=t.index('  <section>\n    <h2 class="sec">名词解释</h2>')
gb=t.index('</main>')
check='''  <section>
    <h2 class="sec">史实核对</h2>
    <p class="hint">“已核实”表示至少两个来源数字一致；“单一来源”表示只在一个来源找到，视频里用了“据报”“约”；“存疑”表示各来源说法不一，取了更稳妥的说法。</p>
    <div class="tablewrap"><table><thead><tr><th>说法</th><th>状态</th><th>说明</th></tr></thead><tbody>
      <tr><td>纳指 −1.88%（26,693）、标普 −1.11%（7,719）、道指 −0.09%（51,621）、罗素 2000 −1.93%（2,730）</td><td><span class="badge ok">已核实</span></td><td>TheStreet 与 Investrade 数字一致（标普跌幅一处写 1.11%，一处写 1.10%）。</td></tr>
      <tr><td>9 月 CPI 同比 3.7%，8 月 3.4%；核心 CPI 同比 2.6%</td><td><span class="badge ok">已核实</span></td><td>两个来源一致；两者都说比预期更热。</td></tr>
      <tr><td>市场预期同比 3.6%（核心 2.5%）</td><td><span class="badge warn">存疑</span></td><td>TheStreet 写预期 3.6%；Investrade 对共识的写法前后不一（3.6% 与 3.7%）。视频取 TheStreet 的 3.6%。</td></tr>
      <tr><td>科技板块当日 −3%，是标普 500 跌得最多的板块</td><td><span class="badge ok">已核实</span></td><td>TheStreet：信息技术 −3.00%；Investrade：XLK 约 −3%。</td></tr>
      <tr><td>戴尔 −8.28%，巴克莱下调至“与大市同步”</td><td><span class="badge ok">已核实</span></td><td>TheStreet；Investrade 也提到巴克莱下调戴尔、HPE、NetApp。</td></tr>
      <tr><td>CoreWeave 跌超 15%，与债券抛售有关</td><td><span class="badge warn">单一来源</span></td><td>只有 Investrade 提到，视频用“据报”。</td></tr>
      <tr><td>美联储 9 月加息 0.25 个百分点，基准利率 3.75%–4.00%，10 月 27–28 日开会</td><td><span class="badge ok">已核实</span></td><td>Admirals 与 CoinGape 一致，均为 10 月初以前的文章；10 月议息结果尚未公布。</td></tr>
      <tr><td>押注 10 月或年内再加息的人变多</td><td><span class="badge warn">单一来源</span></td><td>Investrade。具体概率各来源时点不同，视频不引用概率数字。</td></tr>
      <tr><td>10 年期美债收益率约 5.2%</td><td><span class="badge warn">存疑</span></td><td>TheStreet 写 5.278%，Investrade 写 5.19%–5.21%，且该来源对涨跌幅前后不一致；视频取“约 5.2%”。</td></tr>
      <tr><td>30 年期房贷利率 7.50%，2023 年 11 月以来最高</td><td><span class="badge warn">单一来源</span></td><td>Investrade。</td></tr>
      <tr><td>WTI 约 95 美元、布伦特约 106 美元；油价与中东冲突有关</td><td><span class="badge warn">单一来源</span></td><td>Investrade（收盘价）；Admirals 提到美伊冲突与油价偏高。</td></tr>
      <tr><td>VIX 升至两周新高</td><td><span class="badge warn">单一来源</span></td><td>Investrade。</td></tr>
      <tr><td>“利率升高 → 估值高的成长股更敏感”</td><td><span class="badge ok">常识</span></td><td>通用的估值逻辑，不是来自上述来源，也不是对个股的判断。</td></tr>
    </tbody></table></div>
  </section>

  <section>
    <h2 class="sec">名词解释</h2>
    <dl class="gl">
      <dt>CPI</dt><dd>消费者物价指数，衡量一篮子消费品和服务的价格涨了多少。同比是和去年同期比。</dd>
      <dt>核心 CPI</dt><dd>扣掉波动大的食品和能源之后的 CPI，更能反映物价的“底色”。</dd>
      <dt>加息</dt><dd>美联储调高基准利率。借钱变贵，经济和物价降温，但股票尤其是估值高的成长股通常承压。</dd>
      <dt>基准利率（联邦基金利率）</dt><dd>美联储设定的银行间隔夜借款利率目标区间，是其他利率的锚。</dd>
      <dt>美债收益率</dt><dd>买美国国债能拿到的年化回报。10 年期是全球资产定价的重要参考。</dd>
      <dt>VIX</dt><dd>俗称“恐慌指数”，衡量市场对未来波动的预期，越高越紧张。</dd>
      <dt>估值</dt><dd>市场愿意为公司未来利润付多少钱。利率升高时，未来的钱要打更大的折，估值就容易被压低。</dd>
    </dl>
  </section>

  <section>
    <h2 class="sec">数据来源</h2>
    <ul class="srcs">
      <li><span class="nm">TheStreet：Stock Market Today (Oct. 14, 2026)</span> <span>指数收盘、CPI 数字、板块与个股、国债收益率</span><br><a href="https://www.thestreet.com/stock-market-today/stock-market-today-dow-jones-sp-500-nasdaq-updates-oct-14-2026" target="_blank" rel="noopener">https://www.thestreet.com/stock-market-today/stock-market-today-dow-jones-sp-500-nasdaq-updates-oct-14-2026</a></li>
      <li><span class="nm">Investrade：Market Review October 14, 2026</span> <span>收盘、CPI、利率、油价、科技与 AI 板块</span><br><a href="https://investrade.com/market-review-october-14-2026/" target="_blank" rel="noopener">https://investrade.com/market-review-october-14-2026/</a></li>
      <li><span class="nm">Admirals：FOMC 议息与利率预期</span> <span>美联储 9 月加息、10 月 27–28 日议息</span><br><a href="https://admiralmarkets.com/analytics/traders-blog/fomc-minutes-october-2026" target="_blank" rel="noopener">https://admiralmarkets.com/analytics/traders-blog/fomc-minutes-october-2026</a></li>
      <li><span class="nm">CoinGape：美联储 10 月加息概率</span> <span>9 月加息至 3.75%–4.00%、会议日期</span><br><a href="https://coingape.com/prediction-markets/will-the-fed-raise-interest-rates-after-the-october-2026-meeting-odds-split-50-50/" target="_blank" rel="noopener">https://coingape.com/prediction-markets/will-the-fed-raise-interest-rates-after-the-october-2026-meeting-odds-split-50-50/</a></li>
    </ul>
    <p class="hint" style="margin-top:12px">说明：以上为公开信息整理，不构成投资建议。柱状图是跌幅大小，不是指数走势；利率轴上的“若再加息 4.25%”是假设情形，不是已发生的事。</p>
  </section>
'''
t=t[:ga]+check+t[gb:]
# css: badge + hide download
css_add='''.badge { font-family: var(--mono); font-size: 12px; letter-spacing: 0.06em; padding: 1px 8px; border-radius: 99px; border: 1px solid var(--line); white-space: nowrap; text-align: center; }
.badge.ok { color: var(--ice); border-color: var(--ice); }
.badge.warn { color: var(--gold); border-color: var(--gold); }
#dl, .dlrow { display: none !important; }
.s2 .bignum .u:first-child { font-size: 3cqw; }
.s2 .bars { top: 18cqw; height: 22.5cqw; }
.s1 .rng { top: 28.2cqw; }
'''
t=t.replace('@media (prefers-reduced-motion: reduce) {',css_add+'@media (prefers-reduced-motion: reduce) {',1)
a=t.index('  // ---- save the rendered mp4')
b=t.index('  ensureAudio();   // created suspended')
t=t[:a]+t[b:]
t=re.sub(r'\s*<button class="btn" id="dl"[^>]*>保存视频</button>','',t)
t=re.sub(r'\s*<div class="dlrow" id="dlrow" hidden>.*?</div>\s*</div>\s*</div>','\n      </div>\n    </div>',t,count=1,flags=re.S)
open('/home/claude/us-selloff.html','w',encoding='utf-8').write(t)
print(len(t))
