def row(claim, st, note):
    cls = {'已核实': 'ok', '存疑': 'warn', '常识': 'ok', '预测': 'warn', '计算': 'ok'}[st]
    return f'      <tr><td>{claim}</td><td><span class="badge {cls}">{st}</span></td><td>{note}</td></tr>\n'
rows = ''
rows += row('第三季营收 14,942 亿新台币（467.2 亿美元），同比 +50.9%（美元计 +41.2%）；净利 7,631 亿新台币，同比 +68.7%；每股（ADR）盈利 4.60 美元；毛利率 66.4%、净利率 51.1%', '已核实', '台积电官方新闻稿逐项核对。“每卖 100 块净赚 51 块”是净利率 51.1% 的口语说法。')
rows += row('净利比分析师预期（LSEG 7,463 亿新台币）多约 2%', '计算', '路透社给出预期值；763.1 ÷ 746.3 ≈ 1.022。画面说“多一点点”。')
rows += row('分析师预期每股（ADR）约 4.4–4.5 美元，实际 4.60', '存疑', '两个来源给的预期不同：Investing.com 为 4.42，Tradestie 为 4.48。视频写“约 4.4–4.5”。')
rows += row('连续第六个创纪录季度', '已核实', 'GuruFocus 与路透社、Finimize 都说“第六个连续创纪录的季度”（路透社另说是连续第 11 个利润增长季度）。')
rows += row('10 月 14 日费城半导体指数 −4.3%；台积电美股收盘约 430 美元，−3.4%', '已核实', 'Investing.com（两篇）。指数跌幅在页面里另有 −3.55% 的实时快照，视频采用文章正文的 −4.3%。')
rows += row('财报公布后，美股盘前约再跌 2%', '存疑', '来自 FX168 快讯的标题，正文缺失；Investing.com 的另一个快照显示盘中约 −4%（时点不明）。视频只说“盘前又跌约 2%”。')
rows += row('台积电台股在财报公布前收跌 2%；今年到现在仍涨约 57%', '已核实', '路透社：台北上市股收跌 2%，今年累计 +57%（大盘 +62%）。视频只用“今年涨了 57%”。')
rows += row('原因之一：担心美联储再加息，芯片股被一起卖', '已核实', '路透社与 Investing.com 的解释。韩国存储股同日跌超 10% 的背景也来自这两篇。')
rows += row('10 月初近期高点约 487 美元', '存疑', 'Tradestie 财报前预览里的“20 日高点 487.47（10 月 5 日）”，该页面部分内容是 10 月 7 日的旧数据。')
rows += row('毛利率 66.4%，比上一季度（67.7%）低 1.3 个百分点；下一季指引 65%–67%', '已核实', '官方新闻稿给出 66.4% 和 65%–67%；67.7% 来自 TIKR、Finimize。')
rows += row('2nm 刚量产拖累毛利率；海外工厂拖累现在约 2%，以后 3%–4%', '已核实', 'Investing.com 法说会摘要与 TIKR（财务长的说法）。“2nm 成本高”是页面对毛利率下降原因的归因。')
rows += row('2026 年资本开支计划 600–640 亿美元，约占营收 13%–14%；2026–2028 年显著高于过去三年；约 20 座工厂在建', '已核实', 'Investing.com 法说会摘要。预算是维持不变的原有指引，不是新增。')
rows += row('“花钱多，能分给股东的就少一些”', '常识', '推理，不是公司原话。公司财务长说“只要做好，营收增速会超过资本开支增速”，并承诺可持续、稳定增长的现金股息。')
rows += row('对 2027 年“审慎”：消费与价格敏感市场受零件涨价和宏观不确定影响；AI 需求“极为强劲”，需求超过产能', '已核实', '路透社原话：prudent in business planning going into 2027。')
rows += row('高性能计算（HPC）占营收 68%', '已核实', 'Investing.com 英文报道。注意 HPC 不等于单独披露的 AI 收入。')
rows += row('按过去 12 个月利润约 31 倍，5 年中位数约 22.6 倍', '存疑', 'GuruFocus（股价 430 美元）：31.04 倍 vs 22.63 倍。不同网站的市盈率口径不同。“约 31 年回本”是倍数的口语化（假设利润不变）。')
rows += row('按明年预期利润约 19 倍', '计算', 'TIKR 给出 2027 年预期每股 22.30 美元、前瞻市盈率 19.5 倍；430 ÷ 22.3 ≈ 19.3。前提是明年利润如预期，今年预期为 17.04 美元（约 25 倍）。')
rows += row('美国 10 年期国债利率约 5%', '存疑', 'Investing.com 页面的市场快照（5.046%），时点不明。')
rows += row('价值投资四问、“价格是预期，价值是赚钱的能力”', '常识', '是价值投资的通用框架，不是对台积电的买卖结论。')
rows += row('时点说明', '存疑', '数据截至 2026-10-15。美股盘中价格每分钟在变，视频里的跌幅是已报道的片段，不是收盘数。')
check = f"""    <section>
    <h2 class="sec">史实核对</h2>
    <p class="hint">下面是视频里每个说法的核对结果。“已核实”表示在列出的来源里找到；“存疑”表示单一来源、口径不一或是时点不明的快照。资料由工具读取页面后给出摘要，引用前建议再点开原文核对。本片用价值投资的思路解释“利润好、股价却跌”，不预测股价，也不给买卖建议。</p>
    <div class="tablewrap"><table><thead><tr><th>说法</th><th>状态</th><th>说明</th></tr></thead><tbody>
{rows}    </tbody></table></div>
  </section>
"""
gloss = """  <section>
    <h2 class="sec">名词解释（大白话）</h2>
    <dl class="gl">
      <dt>毛利率</dt><dd>卖 100 块，扣掉制造成本，还剩多少。台积电这一季剩 66.4 块。</dd>
      <dt>净利率</dt><dd>卖 100 块，扣掉所有成本、税，最后净赚多少。</dd>
      <dt>资本开支</dt><dd>公司花在盖厂、买设备上的钱。花得多，短期能留给股东的钱就少。</dd>
      <dt>市盈率（倍数）</dt><dd>股价是每股利润的多少倍。31 倍，可以粗略理解为“按现在的利润，大约 31 年回本”。倍数越高，对未来增长的要求越高。</dd>
      <dt>安全边际</dt><dd>价格比你估的价值低多少。打折越多，估错了也越不容易亏。</dd>
      <dt>价值投资</dt><dd>先估公司值多少钱，再看价格是否便宜，不预测短期涨跌。</dd>
    </dl>
  </section>
"""
srcs = [
 ('台积电官方新闻稿（2026 年第三季）', '官方数据', 'https://pr.tsmc.com/english/news/3346'),
 ('路透社：创纪录利润，但对 2027 年谨慎', '2026-10-15', 'https://www.businessday.co.za/world/international-companies/2026-10-15-tsmc-sees-record-profit-but-warns-of-2027-caution/'),
 ('Investing.com：法说会要点', '2026-10-15', 'https://cn.investing.com/news/transcripts/article-93CH-3609807'),
 ('Investing.com：股价与芯片股下跌', '2026-10-15', 'https://cn.investing.com/news/stock-market-news/article-3610151'),
 ('Investing.com（英文）：AI 股与台积电财报', '2026-10-15', 'https://www.investing.com/news/stock-market-news/can-tsmc-earnings-help-settle-ai-jitters-4950915'),
 ('Finimize：为什么对 2027 年谨慎', '2026-10', 'https://finimize.com/content/tsmcs-ai-chip-engine-keeps-setting-profit-records'),
 ('TIKR：财报后估值与预期', '2026-10', 'https://www.tikr.com/blog/tsmc-posts-a-sixth-straight-record-quarter-and-its-q4-guide-says-the-ai-boom-isnt-slowing-heres-the-fuller-picture'),
 ('GuruFocus：市盈率与历史比较', '2026-10-15', 'https://www.gurufocus.com/news/9124828/tsmc-reports-record-q3-2026-profit-stock-ticker-tsm'),
 ('Tradestie：财报前预期与股价位置', '2026-10', 'https://tradestie.com/news/tsm-earnings-oct-15-448-eps-consensus-key-levels-to-watch-20261015/'),
 ('FX168：盘前下跌快讯', '2026-10-15', 'https://www.fx168news.com/express/fastnews/1448742'),
]
sli = '\n'.join(f'      <li><span class="nm">{n}</span> <span>{m}</span><br><a href="{u}" target="_blank" rel="noopener">{u}</a></li>' for n, m, u in srcs)
srcsec = f"""  <section>
    <h2 class="sec">资料来源</h2>
    <ul class="srcs">
{sli}
    </ul>
    <p class="hint" style="margin-top:12px">图都是示意：数字只按各卡片自己的内容。本片是对公开财报的信息整理，不预测走势，不构成投资建议。数据截至 2026-10-15。</p>
  </section>
</main>
"""
