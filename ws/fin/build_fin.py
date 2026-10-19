import re, sys
sys.path.insert(0, '/tmp/claude-0/-home-claude/7d578916-a400-5c24-bb34-8996a1a97376/scratchpad/fin')
import scenes_fin as F
ICE = '/tmp/claude-0/-home-claude/7d578916-a400-5c24-bb34-8996a1a97376/scratchpad/ice/'
D = '/tmp/claude-0/-home-claude/7d578916-a400-5c24-bb34-8996a1a97376/scratchpad/fin/'
TITLE = 'AI 数据中心是怎么靠借钱建起来的'

# ---- engine: physics draws removed, finance data in
eng = open(ICE + 'engine.js', encoding='utf-8').read().split('\n')
def idx(marker, start=0):
    for i in range(start, len(eng)):
        if marker in eng[i]: return i
    raise SystemExit('marker not found: ' + marker)
i_names = idx('var NAMES'); i_raw_end = idx('  ];', i_names)
i_help = idx('// ================= drawing helpers'); i_rend = idx('// ================= scene rendering')
i_cuesa = idx('var RAWCUES'); i_cuesb = idx('  ];', i_cuesa)
i_counts = idx('var COUNTS')
import json
def js(v): return json.dumps(v, ensure_ascii=False)
raw_js = '  var NAMES = ' + js(F.NAMES) + ';\n  var RAW = [\n' + ',\n'.join('    ' + js(l) for l in F.RAW) + '\n  ];'
cues_js = '  var RAWCUES = [\n' + ',\n'.join('    ' + js(l) for l in F.RAWCUES) + '\n  ];'
counts_js = '  var COUNTS = [' + ', '.join(f'[scenes[{a}].s + {b}, {c}]' for a, b, c in F.COUNTS) + '];'
out = eng[:i_names] + [raw_js] + eng[i_raw_end + 1:i_help] + eng[i_rend:i_cuesa] + [cues_js] + eng[i_cuesb + 1:i_counts] + [counts_js] + eng[i_counts + 1:]
engine = '\n'.join(out)
# the sizeCanvases/applyScene code keeps working with zero canvases

base = open(D + 'css_base.txt', encoding='utf-8').read().split('\n')
new_css = open(D + 'css_new.txt', encoding='utf-8').read() + '\n' + open(D + 'css_fin.txt', encoding='utf-8').read()
def lines(a, b): return '\n'.join(base[a - 1:b])
head = '<title>AI 数据中心的债</title>\n' + lines(2, 3) + '\n<style>\n'
css = lines(5, 59) + '\n' + lines(60, 77) + '\n' + lines(84, 99) + '\n' + lines(171, 212) + '\n' + new_css + '\n</style>\n'
css = re.sub(r'\.dlrow[^\n]*\n', '', css)

# ---- page body: reuse the player/section skeleton of the physics page
src = open(ICE + 'build_ice.py', encoding='utf-8').read()
a = src.index("body = f'''"); b = src.index("page = head")
tmpl = src[a + len("body = f'''"):b].rsplit("'''", 1)[0]
cut = tmpl.index('<section>\n    <h2 class="sec">字幕稿</h2>')
cut2 = tmpl.index('    <section>\n    <h2 class="sec">史实核对</h2>')
music_a = tmpl.index('  <section>\n    <h2 class="sec">音乐卡点</h2>')
player = tmpl[:cut2]
player = player.replace('物理科普 · 2026 诺贝尔物理学奖 · 约 5 分钟', '产业分析 · AI 数据中心融资 · 约 5 分钟')
player = player.replace('<h1>冰下的幽灵</h1>', f'<h1>{TITLE}</h1>')
player = player.replace('六个章节页的“咚”落在音乐的小节强拍上。字幕稿、史实核对、卡点表、名词解释和资料来源在下方。', '六个章节页的“咚”落在音乐的小节强拍上。字幕稿、史实核对、卡点表、名词解释和资料来源在下方。本片为信息整理，不构成投资建议。')
player = player.replace('{scenes_html}', '@@SCENES@@')
music_sec = tmpl[music_a:tmpl.index('  <section>\n    <h2 class="sec">名词解释</h2>')]
for old, new in [('幽灵粒子', '天价账单'), ('冰下探测器', '钱从哪来'), ('第一批证据', '借钱的花样'), ('第一个源头', '租约里的债'), ('新的星图', '私募与保险'), ('还在继续', '怎么观察')]:
    music_sec = music_sec.replace(old, new)

def row(claim, st, note):
    cls = {'已核实': 'ok', '存疑': 'warn', '常识': 'ok', '预测': 'warn'}[st]
    return f'      <tr><td>{claim}</td><td><span class="badge {cls}">{st}</span></td><td>{note}</td></tr>\n'
rows = ''
rows += row('云厂商资本开支（瑞银估算）：2025 年约 4,920 亿，2026 年约 1.009 万亿，2027 年约 1.447 万亿，2028 年约 1.619 万亿美元；2026–28 累计约 4.1 万亿，此前六年约 1.292 万亿', '存疑', '单一来源（24/7 Wall St 转载，2026-08-22），全部是瑞银的估算，不是公司披露。不同机构口径差别大：Futurum 统计的五家公司 2026 年计划约 6,600–6,900 亿，因此画面只用瑞银一套数字，并标“估算”。')
rows += row('2026 年三家最大云厂商资本开支约为云收入的 102%（2027 年 99%，2028 年 94%）', '存疑', '同一来源。原文特别说明：这不等于它们花的比赚的多，因为这些公司的业务比云更大。视频里只说“约等于云收入”。')
rows += row('数据中心产业未来几年总投入 3 万亿美元以上（摩根士丹利、穆迪）；含电力口径超过 5 万亿（摩根大通）', '已核实', '彭博社报道，经 Insurance Journal 转载（2026-02）。是机构估计。')
rows += row('2025 年四家大公司借了约 930 亿美元，约占当年投资级债券发行量的 6%', '已核实', '同上。视频不点名公司。')
rows += row('2015–2024 年 AI 相关科技公司年均发行约 320 亿美元；2025 年 9–10 月两个月约 750 亿，占当年约 1.5 万亿美元的约 5%', '已核实', '美国银行数据，路透社（2025-11-05）与 Deep News 转载均有。这条是背景，视频字幕和画面没有用到。')
rows += row('摩根士丹利预计 2026 年超大云厂商及相关合资公司发债 2,500–3,000 亿美元；摩根大通预计未来五年每年约 3,000 亿', '预测', '是机构的预测，不是已发生的数字。视频只在回顾页用了前一个。')
rows += row('AI 相关公司约占摩根大通投资级债券指数的 14%，比美国银行业还高', '已核实', '2025-11 的数据，可能已经变化。视频字幕里没有讲这条，仅放在这里作背景。')
rows += row('数据中心贷款 2025 年约 1,700 亿美元（总量约 9,500 亿的一部分），同比增长 57%', '已核实', 'IJGlobal 数据，经 Insurance Journal 引用。')
rows += row('数字基础设施证券化（ABS）约 800 亿美元，约占美国 ABS 市场的 5%，不到五年增长八倍多', '已核实', '美国银行数据，路透社（2025-11-05）。“数据中心占其中约 64%”未使用。')
rows += row('私募信贷投向 AI 相关公司的贷款余额超过 2,000 亿美元；国际清算银行估计 2030 年可能达到 3,000–6,000 亿', '已核实', 'Insurance Journal 转引；2030 年是估计。')
rows += row('摩根士丹利估计：到 2028 年约 1.5 万亿美元数据中心建设资金里，私募信贷可能出一半以上', '预测', '路透社（2025-11-05）。是估计。')
rows += row('投资级五年期债券利率约 4%–4.5%；高收益债约 7%–9%；2025 年三笔约 70 亿美元的高收益债专门给数据中心筹钱', '已核实', 'Insurance Journal；是报道里的大致区间，不是实时价格。')
rows += row('一笔 22.5 亿美元的可转债，票面利率 1.75%；2025 年全球可转债发行 1,670 亿美元，24 年来最高', '已核实', 'Insurance Journal。视频没提发行人。')
rows += row('一座园区的融资：债务超过 270 亿美元，股权约 25 亿美元，投资机构占 80%、使用方占 20%，用租约加残值担保，评级机构按租赁负债处理', '已核实', '单一来源（Insurance Journal），原文点名了具体公司，视频有意不提。“某大型园区”只作为结构案例。')
rows += row('保险公司是私募配售的主要放款人，常见 15–20 年租约', '已核实', 'Insurance Journal。')
rows += row('芯片贷款期限通常约五年', '存疑', '来自同一篇对“买芯片出租”结构的描述（“通常五年到期”），不是对所有芯片贷款的统计。')
rows += row('风险点：设备过时、再融资、租约续期、债券与科技股相关性；七大科技公司约占标普 500 市值的三分之一', '已核实', '均为报道列出的“可能的风险”，不是已经发生的事。')
rows += row('“利息和折旧会一起压在利润上”', '常识', '会计常识：设备要折旧、借款要付息，两者都进利润表。不是来自上述来源。')
rows += row('时点说明', '存疑', '多数数字来自 2025 年底到 2026 年初的报道，可能已经变化；视频里已用“2025 年”标注，并在资料页注明数据截至 2026-10-15。')
check = f'''    <section>
    <h2 class="sec">史实核对</h2>
    <p class="hint">下面是视频里每个说法的核对结果。“已核实”表示在列出的来源里找到；“存疑”表示单一来源或口径不一；“预测”表示是机构的预测。本片不点名任何个股，原文里的公司名已改为“某”或省略。抓取的页面由工具读取后摘要，引用数字前建议再点开原文核对。</p>
    <div class="tablewrap"><table><thead><tr><th>说法</th><th>状态</th><th>说明</th></tr></thead><tbody>
{rows}    </tbody></table></div>
  </section>
'''
gloss = '''  <section>
    <h2 class="sec">名词解释</h2>
    <dl class="gl">
      <dt>资本开支（CAPEX）</dt><dd>公司花在买设备、盖厂房、建数据中心上的钱。花出去时不立刻算费用，而是分年折旧。</dd>
      <dt>投资级债券 / 高收益债</dt><dd>信用评级较高的公司发的债叫投资级，利息低；评级较低的叫高收益债（俗称垃圾债），利息高、风险大。</dd>
      <dt>可转债</dt><dd>可以按约定价格换成股票的债。利息通常低，因为债主多了一份换股的权利。</dd>
      <dt>SPV（专用项目公司）</dt><dd>为一个具体项目设立的独立公司。它借钱、盖楼、收租，项目的债务和资产与母公司隔开。</dd>
      <dt>残值担保</dt><dd>租约到期后如果设备或楼的价值低于约定，由使用方补差额的承诺。</dd>
      <dt>私募信贷</dt><dd>非银行机构直接向公司放的贷款，不上市交易，价格不是每天有报价。</dd>
      <dt>证券化（ABS / CMBS）</dt><dd>把一批租金或贷款打包成可以买卖的债券，让更多投资者来分担。</dd>
      <dt>再融资</dt><dd>债务到期时，借新的钱来还旧债。</dd>
      <dt>信用利差</dt><dd>公司债利率比同期限国债高出的部分，是放款人对风险要求的补偿。</dd>
    </dl>
  </section>
'''
srcs = [
 ('彭博社：AI 数据中心 3 万亿美元的建设成为债市焦点', 'Insurance Journal 转载，2026-02', 'https://www.insurancejournal.com/news/international/2026/02/03/856623.htm'),
 ('UBS 估算：云厂商资本开支', '24/7 Wall St，2026-08-22（Yahoo Finance 转载）', 'https://finance.yahoo.com/technology/ai/articles/ai-absurd-spending-boom-hyperscalers-162709082.html'),
 ('Futurum：AI 资本开支 2026', '五家公司的 2026 年计划（背景，口径与瑞银不同）', 'https://futurumgroup.com/insights/ai-capex-2026-the-690b-infrastructure-sprint/'),
 ('路透社：AI 数据中心热潮中的五个债务热点', 'Tiger 转载，2025-11-05', 'https://www.itiger.com/news/2581711097'),
 ('Deep News：AI 杠杆的积累', 'Tiger，2025-11-07', 'https://www.itiger.com/news/1195483736'),
]
sli = '\n'.join(f'      <li><span class="nm">{n}</span> <span>{m}</span><br><a href="{u}" target="_blank" rel="noopener">{u}</a></li>' for n, m, u in srcs)
srcsec = f'''  <section>
    <h2 class="sec">资料来源</h2>
    <ul class="srcs">
{sli}
    </ul>
    <p class="hint" style="margin-top:12px">图都是示意：金额按报道里的数字画，柱子高度只按各图自己的刻度。本片不点名个股，不预测走势，不构成投资建议。数据截至 2026-10-15，部分数字取自更早的报道，可能已有变化。</p>
  </section>
</main>
'''
body = player + check + music_sec + gloss + srcsec
body = body.replace('@@SCENES@@', ''.join(F.S))
page = head + css + body + '\n<script id="musicdata" type="application/octet-stream">@@MUSIC@@</script>\n<script>\n' + engine + '\n</script>\n'
open('/home/claude/ai-datacenter-debt.html', 'w', encoding='utf-8').write(page)
print('built', len(page))
