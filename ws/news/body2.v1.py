def _r(c, st, note):
    cls = {'已核实': 'ok', '常识': 'ok', '计算': 'ok', '单一来源': 'warn', '存疑': 'warn'}[st]
    return '      <tr><td>%s</td><td><span class="badge %s">%s</span></td><td>%s</td></tr>\n' % (c, cls, st, note)

_rows = ''.join([
 _r('纳指 −1.88%（26,693）、标普 −1.11%（7,719）、道指 −0.09%', '存疑', '多数来源如此；个别来源写纳指 −1.85%、标普 −1.08%，小数点后有出入，视频取前者。'),
 _r('费城半导体指数 −4.30%', '已核实', 'TechFlow 与 Newscord 一致。“连跌 6 天”只有 TechFlow 提到。'),
 _r('CoreWeave 收盘 −15.46%（65.78 美元）；Nebius −10.08%；甲骨文 −8.83%（130.55 美元）', '已核实', 'Yahoo Finance 与 Motley Fool 页面、TechFlow、Newscord 数字一致。'),
 _r('CoreWeave：债务加租赁约 520 亿美元（6 月底）、年内融资超 350 亿美元', '单一来源', 'TipRanks。'),
 _r('CoreWeave：订单积压 1,040 亿美元', '单一来源', '24/7 Wall St，称来自最近一季财报。积压是将来的收入，不是利润。'),
 _r('CoreWeave 无担保债券收益率约 15%', '存疑', '出处是投资人在社交平台发的图表（马斯克回复“Yikes”）；Yahoo 的文章明确说没有核实实际收益率。视频写“据报”。'),
 _r('Gartner：2030 年 80% 的“新云”公司可能消失', '单一来源', 'Yahoo Finance（Motley Fool 稿）；同日其他文章没有提到。'),
 _r('Nebius：年内增发超 20 亿美元股票；当日没有公司自身的新消息', '单一来源', 'TipRanks；24/7 Wall St 也说没有公司层面的原因。'),
 _r('甲骨文：债务近 1,670 亿美元、评级 BBB−、OpenAI 合同收入 2027 年才开始、最新季度营收 +30%（193 亿美元）', '单一来源', 'Motley Fool 一篇文章。'),
 _r('戴尔收盘约 −11%', '存疑', 'CNBC 标题与 TechFlow、Newscord 写 11% 以上；Invezz（盘中）写 8% 多、TheStreet 写 8.28%，应是盘中数字。视频取收盘。'),
 _r('慧与（HPE）跌超 8%', '存疑', 'TechFlow 写“超过 8%”；Invezz 盘中写 4.47%。视频写“超 8%”。'),
 _r('巴克莱把戴尔、慧与、NetApp 降到“中性”；目标价戴尔 574、慧与 77、NetApp 219 美元', '已核实', 'Yahoo Finance 与 Invezz 一致，分析师为 Tim Long。'),
 _r('三家过去一年涨幅 +273% / +177% / +101%；昨收价', '单一来源', 'Yahoo Finance（引用 Koyfin 数据），昨收为四舍五入。'),
 _r('巴克莱认为内存涨价推高了这些公司的营收', '单一来源', 'Invezz，是巴克莱的观点，不是事实。'),
 _r('美光 −4.08%、ASML −3.94%、英伟达 约 −3.2%', '存疑', '美光、ASML 取 Yahoo 收盘后页面；英伟达 TechFlow 写 −3.16%，另一来源写 −2.70%（疑似盘中）。'),
 _r('Baird 策略师 Ted Mortonson 的三点看法', '单一来源', 'Yahoo Finance 视频页。是他个人的判断，视频里写“策略师说”。'),
 _r('9 月 CPI：同比 3.7%（8 月 3.4%）；汽油环比 +9.1%，同比 +34.2%；能源环比 +5.2%；核心 CPI 环比 +0.3%、同比 2.6%', '已核实', '美国劳工统计局（BLS）原始数据。'),
 _r('市场预期：总体同比 3.6%、环比 0.6%；核心环比 0.2%、同比 2.5%', '单一来源', 'Vantage 引用的共识。总体环比 0.6% 与预期一致，更热的是核心（环比 0.3%，预期 0.2%）和同比的约整。'),
 _r('油价上涨与美伊冲突、霍尔木兹海峡受阻有关；布伦特约 106、WTI 约 95 美元', '已核实', 'OPB（9 月 9 日，布伦特首次突破 100 美元）；TechFlow 给出收盘价。'),
 _r('10 月加息概率从 22% 升到约 37%（盘中近 50%）', '存疑', 'Yahoo 写 35%，TechFlow 写 37%，Newscord 写 37%–47% 且前后不一。视频取约 37%。'),
 _r('10 年期美债收益率约 5.2%，2 年期约 4.81%', '已核实', 'TechFlow 与 Motley Fool 页面（5.19%）一致。'),
 _r('美联储 9 月 16 日加息 25 个基点至 3.75%–4.00%，投票 12–0；10 月 27–28 日开会', '已核实', 'Yahoo Finance、Vantage 一致。'),
 _r('标普 500 前瞻市盈率 19–20 倍；盈利收益率 5.0%–5.3%', '计算', '前瞻市盈率 19.0（Vantage，10/2）与 20.0（MercoPress）；盈利收益率 = 1 ÷ 市盈率，是我自己算的，只是粗略对比。'),
 _r('今年 8 月 30 年期美债收益率升破 5.3% 时股市下跌，回落后反弹', '单一来源', 'MercoPress。'),
 _r('财报日期：Meta 10/21、谷歌 10/27、微软 10/28、亚马逊 10/29、苹果 11/2、英伟达 11/17；甲骨文 12/14', '存疑', 'Tickzen 日历页没有明说是否为公司确认；甲骨文来自 Motley Fool。以公司公告为准。'),
 _r('Marvell 市盈率约 91 倍', '单一来源', 'TradingKey，页面声明可能含 AI 生成内容；该来源写当日跌 5.8%，Newscord 写 8.7%，因此视频没有放 Marvell 跌幅。'),
 _r('“利率升高 → 借钱贵、估值高的股票更敏感”', '常识', '通用的估值与融资逻辑，不是对个股的判断。'),
])

BODY = '''  <section>
    <h2 class="sec">史实核对</h2>
    <p class="hint">“已核实”表示至少两个独立来源一致或来自原始数据；“单一来源”只在一个来源找到，视频里用了“据报”“约”；“存疑”是各来源说法不一，取了更稳妥的说法。“计算”是我自己算的。</p>
    <div class="tablewrap"><table><thead><tr><th>说法</th><th>状态</th><th>说明</th></tr></thead><tbody>
''' + _rows + '''    </tbody></table></div>
  </section>

  <section>
    <h2 class="sec">名词解释</h2>
    <dl class="gl">
      <dt>负债型</dt><dd>本片的说法：先借钱建数据中心，再靠未来的租金和订单还钱的公司。利率升高，利息变多，压力最先出现。</dd>
      <dt>自由现金流</dt><dd>公司一年赚进来的现金，扣掉必须花出去的建设和设备开支后剩下的钱。为负，说明还得靠外部融资。</dd>
      <dt>评级（增持 / 中性）</dt><dd>分析师对股票的建议。从“增持”降到“中性”，意思是不再特别看好，但也没有叫人卖出。</dd>
      <dt>投资级 / 垃圾级</dt><dd>信用评级的两档。BBB− 是投资级的最低一档，再降一档就是垃圾级，借钱会更贵。</dd>
      <dt>债券收益率</dt><dd>买这家公司的债券，每年能拿到的回报。收益率越高，说明市场认为它越危险，它借钱也就越贵。</dd>
      <dt>新云（neocloud）</dt><dd>专门为 AI 提供算力租赁的新兴云公司，如 CoreWeave、Nebius。</dd>
      <dt>循环融资</dt><dd>AI 公司之间互相投资、互相下订单，钱在圈子里转。好处是推高订单，风险是需求可能没有表面那么大。</dd>
      <dt>前瞻市盈率 / 盈利收益率</dt><dd>前瞻市盈率是股价除以未来 12 个月预期利润；它的倒数就是盈利收益率，可以粗略和国债收益率比较。</dd>
      <dt>CPI / 核心 CPI</dt><dd>CPI 衡量物价涨了多少；核心 CPI 扣掉食品和能源，更能反映物价的底色。</dd>
      <dt>基准利率、美债收益率</dt><dd>美联储设定的政策利率，和买美国国债能拿到的回报。后者是全球资产定价的锚。</dd>
    </dl>
  </section>

  <section>
    <h2 class="sec">数据来源</h2>
    <ul class="srcs">
      <li><span class="nm">美国劳工统计局 BLS：9 月 CPI 新闻稿</span> <span>CPI、核心 CPI、汽油与能源</span><br><a href="https://www.bls.gov/news.release/cpi.htm" target="_blank" rel="noopener">https://www.bls.gov/news.release/cpi.htm</a></li>
      <li><span class="nm">Yahoo Finance：Stock Market Today, Oct. 14（CoreWeave）</span> <span>CoreWeave、Nebius、Gartner 警告</span><br><a href="https://finance.yahoo.com/markets/stocks/articles/stock-market-today-oct-14-214836987.html" target="_blank" rel="noopener">https://finance.yahoo.com/markets/stocks/articles/stock-market-today-oct-14-214836987.html</a></li>
      <li><span class="nm">Motley Fool：Oracle Tumbles on Hotter CPI Data</span> <span>甲骨文债务、评级、OpenAI</span><br><a href="https://www.fool.com/coverage/stock-market-today/2026/10/14/stock-market-today-oct-14-oracle-tumbles-on-hotter-cpi-data-lifting-treasury-yields/" target="_blank" rel="noopener">https://www.fool.com/coverage/stock-market-today/2026/10/14/stock-market-today-oct-14-oracle-tumbles-on-hotter-cpi-data-lifting-treasury-yields/</a></li>
      <li><span class="nm">Yahoo Finance：HPE, DELL, NTAP Stocks Downgraded</span> <span>巴克莱降级、目标价、涨幅</span><br><a href="https://finance.yahoo.com/markets/stocks/articles/hpe-dell-ntap-stocks-downgraded-102255493.html" target="_blank" rel="noopener">https://finance.yahoo.com/markets/stocks/articles/hpe-dell-ntap-stocks-downgraded-102255493.html</a></li>
      <li><span class="nm">Invezz：Why are Dell and HPE stocks plunging today?</span> <span>降级理由、内存涨价</span><br><a href="https://invezz.com/news/2026/10/14/why-are-dell-and-hpe-stocks-plunging-today/" target="_blank" rel="noopener">https://invezz.com/news/2026/10/14/why-are-dell-and-hpe-stocks-plunging-today/</a></li>
      <li><span class="nm">TechFlow：US Stock Trends (October 15)</span> <span>半导体指数、收益率、油价、加息概率</span><br><a href="https://www.techflowpost.com/en-US/article/34583" target="_blank" rel="noopener">https://www.techflowpost.com/en-US/article/34583</a></li>
      <li><span class="nm">Yahoo Finance 视频：CoreWeave, Intel, Micron… plummeting</span> <span>Baird 策略师的看法、个股跌幅</span><br><a href="https://finance.yahoo.com/video/coreweave-intel-micron--other-tech-stocks-are-plummeting-heres-why-204044671.html" target="_blank" rel="noopener">https://finance.yahoo.com/video/coreweave-intel-micron--other-tech-stocks-are-plummeting-heres-why-204044671.html</a></li>
      <li><span class="nm">Yahoo Finance：Fed Interest Rate Hike Seems More Likely</span> <span>9 月加息、10 月议息、加息概率</span><br><a href="https://finance.yahoo.com/economy/policy/articles/fed-interest-rate-hike-seems-195052044.html" target="_blank" rel="noopener">https://finance.yahoo.com/economy/policy/articles/fed-interest-rate-hike-seems-195052044.html</a></li>
      <li><span class="nm">Newscord：11 家媒体对比</span> <span>指数收盘、个股、Bowman 讲话</span><br><a href="https://newscord.org/article/us-stocks-slide-after-inflation-accelerates-to-37-nasdaq-drops-19--Story_20261015_USstocksdroptotheirw0e2c9bc0_efd59204dca2" target="_blank" rel="noopener">https://newscord.org/article/us-stocks-slide-after-inflation-accelerates-to-37-nasdaq-drops-19--Story_20261015_USstocksdroptotheirw0e2c9bc0_efd59204dca2</a></li>
      <li><span class="nm">TipRanks：Why Are Nebius and CoreWeave Stocks Falling</span> <span>CoreWeave 融资、Nebius 增发</span><br><a href="https://www.tipranks.com/news/why-are-nebius-and-coreweave-stocks-falling-in-premarket-today-october-14" target="_blank" rel="noopener">https://www.tipranks.com/news/why-are-nebius-and-coreweave-stocks-falling-in-premarket-today-october-14</a></li>
      <li><span class="nm">24/7 Wall St：CoreWeave Falls 10% as Bond Yield Touches 15%</span> <span>订单积压、债券收益率</span><br><a href="https://247wallst.com/investing/2026/10/14/coreweave-falls-10-as-bond-yield-touches-15-and-elon-musk-says-yikes-nebius-drops-6-oracle-slips/" target="_blank" rel="noopener">https://247wallst.com/investing/2026/10/14/coreweave-falls-10-as-bond-yield-touches-15-and-elon-musk-says-yikes-nebius-drops-6-oracle-slips/</a></li>
      <li><span class="nm">OPB：Oil surges above $100 a barrel</span> <span>油价上涨与美伊冲突</span><br><a href="https://www.opb.org/article/2026/09/09/oil-surges-above-dollar100-a-barrel-as-us-and-iran-launch-new-attacks-while-gasoline-prices-also-jump/" target="_blank" rel="noopener">https://www.opb.org/article/2026/09/09/oil-surges-above-dollar100-a-barrel-as-us-and-iran-launch-new-attacks-while-gasoline-prices-also-jump/</a></li>
      <li><span class="nm">Vantage Markets：S&amp;P 500 Sits 0.17% Off Record</span> <span>前瞻市盈率、预期共识、9 月加息</span><br><a href="https://www.vantagemarkets.com/market-analysis/why-sp500-held-near-record-earnings-fed-hike-cpi-october-14-2026/" target="_blank" rel="noopener">https://www.vantagemarkets.com/market-analysis/why-sp500-held-near-record-earnings-fed-hike-cpi-october-14-2026/</a></li>
      <li><span class="nm">MercoPress：S&amp;P 500 Price Prediction</span> <span>盈利收益率与国债、8 月情形</span><br><a href="https://en.mercopress.com/2026/10/12/s-p-500-price-prediction-what-macro-signals-say-about-the-index-in-2026" target="_blank" rel="noopener">https://en.mercopress.com/2026/10/12/s-p-500-price-prediction-what-macro-signals-say-about-the-index-in-2026</a></li>
      <li><span class="nm">Tickzen：Big Tech Earnings Calendar</span> <span>大厂财报日期</span><br><a href="https://tickzen.app/stock-analysis/earnings-calendar/big-tech" target="_blank" rel="noopener">https://tickzen.app/stock-analysis/earnings-calendar/big-tech</a></li>
      <li><span class="nm">TradingKey：Marvell (MRVL) Moved Down on Oct 14</span> <span>Marvell 估值（仅作旁证）</span><br><a href="https://www.tradingkey.com/news/market-movers/262216770-market-movers-mrvl-20261014" target="_blank" rel="noopener">https://www.tradingkey.com/news/market-movers/262216770-market-movers-mrvl-20261014</a></li>
    </ul>
    <p class="hint" style="margin-top:12px">说明：以上为公开信息整理，不构成投资建议。条形图的长度是单日跌幅大小，不是走势；“如果…那么…”是条件推演，不是预测。</p>
  </section>
'''
