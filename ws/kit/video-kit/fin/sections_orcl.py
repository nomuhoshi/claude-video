def row(claim, st, note):
    cls = {'已核实': 'ok', '存疑': 'warn', '常识': 'ok', '预测': 'warn', '计算': 'ok'}[st]
    return f'      <tr><td>{claim}</td><td><span class="badge {cls}">{st}</span></td><td>{note}</td></tr>\n'
rows = ''
rows += row('2026 年 9 月一季度（截至 8 月 31 日）：收入 193 亿美元，同比 +30%；已签订单 6,640 亿美元，同比多 2,090 亿；资本开支 285 亿；经营现金流 231 亿；自由现金流 −54 亿；借款合计 1,253 亿；利息 14.3 亿（+55%）', '已核实', '甲骨文官方新闻稿（PDF）逐项核对。“收到的钱 − 花出去的钱 = −54 亿”即 231 − 285，是官方的自由现金流。画面把它说成“收到的钱比花出去的少”。')
rows += row('已签订单（RPO）3 月 5,530 亿、6 月 6,380 亿、9 月 6,640 亿美元', '已核实', '5,530 亿来自 Fortune（2026-03-10），6,380 亿来自 Benzinga/路透引用（2026-08），6,640 亿来自官方新闻稿。图上月份是公布时间。')
rows += row('公司一年的收入约 670 亿美元；订单约是收入的 10 倍', '存疑', '670 亿是 Fortune 报道 3 月时的全年预期（约 67 billion），不是最终数；10 倍是我们用 6,640 ÷ 670 算的，已标“我们算的”。')
rows += row('2025 年度盖楼花钱约 210 亿美元，2026 年度计划约 500 亿美元', '存疑', '来自 Fortune（2026-03-10）：2025 财年 212 亿，2026 财年指引 500 亿。500 亿是指引，不是最终实际数，画面标“计划”。')
rows += row('2027 年度资本开支计划 900–950 亿美元（扣除客户预付后的现金支出不超过 700 亿）', '已核实', '电话会实录与 ERP Today 一致；管理层的指引，不是实际数。')
rows += row('2025 年秋天一次发债 180 亿美元', '已核实', '路透社（2025-11）和 DCD 均提到 180 亿美元债券发行，具体月份各处略有不同，视频只说“2025 年秋天”。')
rows += row('2026 年 2 月筹到 300 亿美元（债券加优先股）；全年计划筹 450–500 亿美元，约一半股票、一半债券', '已核实', 'Fortune（2026-03-10）：上个月通过债券和优先股筹到 300 亿；DCD（2026-02-02）：计划 450–500 亿。视频只用 300 亿。')
rows += row('卖新股约 200 亿美元，已完成', '已核实', '电话会实录和 ERP Today：200 亿美元的在市场发行已在一季度完成。')
rows += row('一座园区的开发商贷款 380 亿美元，由银行安排，甲骨文是租客', '已核实', 'DCD 转述彭博（2025-09-05）：摩根大通和三菱日联牵头，开发商是 Vantage，租客是甲骨文。视频不点开发商名字。“15–19 年”是甲骨文数据中心租约的通常期限（路透社引用），不是这笔贷款本身的期限。')
rows += row('还没开始付的租约承诺约 2,600 亿美元，15–19 年，是账上借款（约 1,295 亿）的约 2 倍', '存疑', '来自 R40 对甲骨文 2026 年报（截至 5 月 31 日）的转述，我没有直接打开年报原文；2 倍是文章自己的算法（260 ÷ 129.5）。')
rows += row('2026 年 7 月标普把评级下调到 BBB−，只比“高风险”高一档', '已核实', 'Benzinga 经 Yahoo Finance（2026-08-07）。标普表示若杠杆继续高于 4.5 倍可能再降。')
rows += row('公司预计约一半订单在三年内变成收入；新订单多为客户预付或自带设备', '已核实', '电话会实录（Motley Fool，2026-09-11）。是管理层的预期，不是已发生的事。')
rows += row('“空窗期靠借钱撑”“利息和租金会一起压上来”', '常识', '是对以上数据的推理，不是来源里的原话。')
rows += row('时点说明', '存疑', '数据截至 2026-10-15。电话会提到 10 月有投资者日，可能会更新资本开支和现金流的指引。')
check = f"""    <section>
    <h2 class="sec">史实核对</h2>
    <p class="hint">下面是视频里每个说法的核对结果。“已核实”表示在列出的来源里找到；“存疑”表示单一来源、口径不一或是预期数。视频里的资料是工具读取页面后给的摘要，引用前建议再点开原文核对。本片以甲骨文为例讲融资，不预测股价，也不给买卖建议。</p>
    <div class="tablewrap"><table><thead><tr><th>说法</th><th>状态</th><th>说明</th></tr></thead><tbody>
{rows}    </tbody></table></div>
  </section>
"""
gloss = """  <section>
    <h2 class="sec">名词解释（大白话）</h2>
    <dl class="gl">
      <dt>已签订单（RPO）</dt><dd>客户已经签了合同、但还没确认成收入的钱。可以理解为“排队排到几年后的订单”。</dd>
      <dt>发债</dt><dd>公司向很多人借钱，写一张借条，约定利息和还款日。</dd>
      <dt>新股</dt><dd>公司把自己切一块卖给投资者换钱。不用还，但老股东的占比会被稀释。</dd>
      <dt>租约承诺</dt><dd>公司已经签了长期租房合同，楼盖好之后才开始付租金。它不算借款，但租金将来必须付。</dd>
      <dt>信用评级</dt><dd>评级机构给公司借钱信用打的分。BBB− 是“投资级”的最后一档，再往下就叫高风险级，借钱会更贵。</dd>
      <dt>自由现金流</dt><dd>公司收到的钱减去盖楼买设备花的钱。为负，说明花得比收得多，缺口要靠借钱或卖股补。</dd>
      <dt>资本开支</dt><dd>公司花在盖楼、买设备上的钱。</dd>
    </dl>
  </section>
"""
srcs = [
 ('甲骨文 2027 财年一季度新闻稿', '官方数据', 'https://s23.q4cdn.com/440135859/files/content_files/1q27-pressrelease-September_FINAL.pdf'),
 ('ERP Today：一季度要点', '2026-09', 'https://erp.today/oracle-q1-fy27-results-664b-backlog-ai-contracts/'),
 ('电话会实录（Motley Fool）', '2026-09-11', 'https://www.fool.com/earnings/call-transcripts/2026/09/11/oracle-orcl-q1-2027-earnings-call-transcript/'),
 ('Fortune：三季度业绩与融资', '2026-03-10', 'https://dc.fortune.com/2026/03/10/oracle-best-quarter-negative-free-cash-flow-ai-spending'),
 ('DCD：甲骨文 2026 年筹资计划', '2026-02-02', 'https://www.datacenterdynamics.com/en/news/oracle-to-raise-up-to-50bn-in-debt-and-equity-in-2026'),
 ('DCD：380 亿美元债务方案', '2025-09-05', 'https://datacenterdynamics.com/en/news/jpmorgan-chase-and-mitsubishi-ufj-lead-38bn-debt-package-for-oracle-linked-data-centers-report/'),
 ('R40：2,600 亿美元租约承诺', '2026 年报解读', 'https://r40.io/blog/orcl-260bn-of-leases-off-the-balance-sheet/'),
 ('Benzinga（Yahoo Finance）：评级调低', '2026-08-07', 'https://finance.yahoo.com/technology/ai/articles/borrowing-brink-oracle-ai-expansion-193022811.html'),
]
sli = '\n'.join(f'      <li><span class="nm">{n}</span> <span>{m}</span><br><a href="{u}" target="_blank" rel="noopener">{u}</a></li>' for n, m, u in srcs)
srcsec = f"""  <section>
    <h2 class="sec">资料来源</h2>
    <ul class="srcs">
{sli}
    </ul>
    <p class="hint" style="margin-top:12px">图都是示意：柱子高度只按各图自己的刻度。本片以甲骨文为例，讲它怎么融资，不预测走势，不构成投资建议。数据截至 2026-10-15。</p>
  </section>
</main>
"""
