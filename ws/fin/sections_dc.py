def row(claim, st, note):
    cls = {'已核实': 'ok', '存疑': 'warn', '常识': 'ok', '预测': 'warn', '计算': 'ok'}[st]
    return f'      <tr><td>{claim}</td><td><span class="badge {cls}">{st}</span></td><td>{note}</td></tr>\n'
rows = ''
rows += row('Alphabet 2026 年资本开支计划约 1,850 亿美元', '已核实', 'RoIC 转述 2026-02 的公司指引（单一来源）。是计划数，不是实际数，画面标“约”。')
rows += row('Meta 2026 年资本开支计划 1,250–1,450 亿美元（从 1,150–1,350 亿上调）', '已核实', 'Yahoo Finance（2026-05-01）转述 Meta 一季度财报后的指引。')
rows += row('甲骨文 2026 财年资本开支指引约 500 亿美元', '存疑', '来自 Fortune（2026-03-10）报道的指引；是计划数，不是最终实际数。画面标“2026 年度计划”。')
rows += row('亚马逊、微软、谷歌、Meta 今年计划总和“超过 7,000 亿美元”', '存疑', 'Yahoo Finance（2026-05-01）引用路透播客主持人的说法，文章没给出逐家加总；Sherwood、Tom’s Hardware 的标题也是“超过 7,000 亿 / 约 7,250 亿”。画面写“超过这个数”。')
rows += row('Alphabet 2026 年 2 月发行 200 亿美元债券，是它在美国最大的一笔；同时发 100 年期英镑债券', '已核实', 'RoIC 与 Techloy（转述彭博）：美元债 2026-02-09 定价 200 亿（目标 150 亿），英镑债 2026-02-10，其中含 100 年期。视频只说“还发了 100 年期借条”。')
rows += row('Meta 2025 年 10 月发债约 300 亿美元', '已核实', 'RoIC 的汇总报道。')
rows += row('几家巨头 2025 年第四季度发债合计约 600 亿美元', '存疑', 'RoIC 称“hyperscalers 约 600 亿”，没列出具体是哪几家。视频说“几家巨头”。')
rows += row('Meta 的 Hyperion 数据中心总价约 270 亿美元；Blue Owl 占 80%，Meta 占 20%；合资公司发债，评级 A+，发行时收益率 6.58%', '已核实', 'Fortune（2025-10-31）。年息约 6.6% 就是 6.58% 的取整。')
rows += row('“总价大部分靠借”', '存疑', 'Global Data Center Hub（2026-07-20）称合资公司债务约 273 亿、承诺资本约 288 亿，但同一篇的明细加起来对不上；各来源总价口径 270–288 亿不等。视频只说“约 270 亿，大部分靠借”。')
rows += row('Meta 担保了楼将来的价值（残值担保），债不记在 Meta 自己账上', '存疑', '“不在 Meta 账上”来自 Fortune；残值担保来自 Global Data Center Hub 的转述，单一来源。视频里把它说成“担保了楼的价值”。')
rows += row('CoreWeave 2026 年 3 月拿到 85 亿美元 GPU 贷款；评级 A3；固定利率约 5.9%（另一档为 SOFR + 2.25%）', '已核实', 'DCD（2026-03-31）。Moody’s 评级 A3；Global Data Center Hub 称这是首个投资级的 GPU 抵押贷款。')
rows += row('贷款背后是 Meta 的长期合同；2023 年第一笔同类贷款年息约 15%', '存疑', '合同背景来自彭博（经 DCD 转述）；2023 年约 15% 来自 Global Data Center Hub。合同金额各来源口径不同（142 亿 + 50 亿 vs 352 亿），视频不写金额。')
rows += row('CoreWeave 欠债约 250 亿美元', '存疑', 'Global Data Center Hub 引用 2026 年一季度：债务约 249 亿、自有资本约 48 亿。是一季度数据，之后可能已变化。')
rows += row('甲骨文：开发商一笔 380 亿美元贷款，银行牵头，甲骨文是租客', '已核实', 'DCD 转述彭博（2025-09-05）。“15–19 年”是甲骨文数据中心租约的通常期限（路透社引用），不是这笔贷款的期限。')
rows += row('甲骨文还没开始付的租约承诺约 2,600 亿美元，约是欠款（约 1,250 亿）的 2 倍', '存疑', 'R40 对甲骨文 2026 年报的转述，我没有直接打开年报原文。1,253 亿是官方新闻稿的借款合计；2,600 ÷ 1,253 ≈ 2.1。')
rows += row('2026 年 7 月标普把甲骨文评级下调到 BBB−', '已核实', 'Benzinga 经 Yahoo Finance（2026-08-07）。')
rows += row('甲骨文最近一季利息约 14.3 亿美元，同比 +55%', '已核实', '甲骨文 2027 财年一季度新闻稿。')
rows += row('“空窗期靠借钱撑”“利息和租金会一起压上来”', '常识', '是对以上数据的推理，不是来源里的原话。')
rows += row('时点说明', '存疑', '数据截至 2026-10-15。各公司之后的财报和融资可能更新这些数字。')
check = f"""    <section>
    <h2 class="sec">史实核对</h2>
    <p class="hint">下面是视频里每个说法的核对结果。“已核实”表示在列出的来源里找到；“存疑”表示单一来源、口径不一或是计划数。资料是工具读取页面后给的摘要，引用前建议再点开原文核对。本片用几家真实公司讲“AI 数据中心怎么靠借钱建起来”，不预测股价，也不给买卖建议。</p>
    <div class="tablewrap"><table><thead><tr><th>说法</th><th>状态</th><th>说明</th></tr></thead><tbody>
{rows}    </tbody></table></div>
  </section>
"""
gloss = """  <section>
    <h2 class="sec">名词解释（大白话）</h2>
    <dl class="gl">
      <dt>发债</dt><dd>公司向很多人借钱，写一张借条，约定利息和还款日。</dd>
      <dt>合资公司</dt><dd>两家或多家合伙，专门为一个项目新开的公司。借条记在这家公司头上，不直接记在大公司自己账上。</dd>
      <dt>抵押</dt><dd>借钱时押一样东西。还不上钱，银行可以处理这样东西。CoreWeave 押的是 AI 芯片和客户的长期合同。</dd>
      <dt>租约承诺</dt><dd>公司已经签了长期租房合同，楼盖好之后才开始付租金。它不算借款，但租金将来必须付。</dd>
      <dt>信用评级</dt><dd>评级机构给公司借钱信用打的分。BBB− 是“投资级”的最后一档，再往下就叫高风险级，借钱会更贵。</dd>
      <dt>资本开支</dt><dd>公司花在盖楼、买设备上的钱。</dd>
    </dl>
  </section>
"""
srcs = [
 ('Alphabet 等发债与资本开支（RoIC）', '2026-02-26', 'https://www.roic.ai/news/alphabet-and-big-tech-ramp-up-debt-issuance-to-fuel-ai-infrastructure-spending-02-26-2026'),
 ('巨头 2026 年计划超 7,000 亿（Yahoo Finance）', '2026-05-01', 'https://finance.yahoo.com/sectors/technology/articles/hyperscalers-hit-700-billion-2026-111243744.html'),
 ('Alphabet 的 100 年期债券（Techloy）', '2026-02', 'https://www.techloy.com/alphabet-raises-20-billion-in-bond-sale-launches-first-tech-100-year-bond-since-1997/'),
 ('Fortune：Meta 与 Blue Owl 的 270 亿美元', '2025-10-31', 'https://fortune.com/2025/10/31/metas-27-billion-bet-turns-ai-compute-into-wall-streets-hottest-new-investment/'),
 ('Global Data Center Hub：Hyperion 扩建与融资', '2026-07-20', 'https://www.globaldatacenterhub.com/p/meta-scales-hyperion-to-5gw-and-over'),
 ('DCD：CoreWeave 85 亿美元贷款', '2026-03-31', 'https://www.datacenterdynamics.com/en/news/coreweave-secures-85bn-loan-for-gpu-purchases/'),
 ('Global Data Center Hub：CoreWeave 抵押贷款', '2026', 'https://www.globaldatacenterhub.com/p/coreweaves-85b-quarter-when-gpu-debt'),
 ('甲骨文 2027 财年一季度新闻稿', '官方数据', 'https://s23.q4cdn.com/440135859/files/content_files/1q27-pressrelease-September_FINAL.pdf'),
 ('DCD：380 亿美元债务方案', '2025-09-05', 'https://datacenterdynamics.com/en/news/jpmorgan-chase-and-mitsubishi-ufj-lead-38bn-debt-package-for-oracle-linked-data-centers-report/'),
 ('R40：2,600 亿美元租约承诺', '2026 年报解读', 'https://r40.io/blog/orcl-260bn-of-leases-off-the-balance-sheet/'),
 ('Benzinga（Yahoo Finance）：评级调低', '2026-08-07', 'https://finance.yahoo.com/technology/ai/articles/borrowing-brink-oracle-ai-expansion-193022811.html'),
 ('Fortune：甲骨文三季度业绩与融资', '2026-03-10', 'https://dc.fortune.com/2026/03/10/oracle-best-quarter-negative-free-cash-flow-ai-spending'),
]
sli = '\n'.join(f'      <li><span class="nm">{n}</span> <span>{m}</span><br><a href="{u}" target="_blank" rel="noopener">{u}</a></li>' for n, m, u in srcs)
srcsec = f"""  <section>
    <h2 class="sec">资料来源</h2>
    <ul class="srcs">
{sli}
    </ul>
    <p class="hint" style="margin-top:12px">图都是示意：柱子高度只按各图自己的刻度。本片用几家真实公司讲融资，不预测走势，不构成投资建议。数据截至 2026-10-15。</p>
  </section>
</main>
"""
