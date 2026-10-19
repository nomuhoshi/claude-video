import re
SP = '/tmp/claude-0/-home-claude/7d578916-a400-5c24-bb34-8996a1a97376/scratchpad/'
t = open(SP + 'kit/video-kit/template.html', encoding='utf-8').read()

# scene starts (same timeline as the template, so every chapter "boom" stays on a bar line)
ST = [0, 6.663, 9.2, 34.324, 37.2, 59.857, 63.2, 91.773, 95.2, 111.987, 115.2, 136.456, 140.2, 149]
EN = [6.663, 9.2, 34.324, 37.2, 59.857, 63.2, 91.773, 95.2, 111.987, 115.2, 136.456, 140.2, 149, 156]


def chap(i, word, en, sub):
    return f'''        <div class="scene chap" data-start="{ST[i]}" data-end="{EN[i]}">
          <i class="vline" data-a="0,0.5"></i>
          <div class="flash" data-a="0.35,0.8"></div>
          <div class="parts" data-a="0.35,2.6"></div>
          <div class="wordbox"><span class="word" data-a="0.35,0.4">{word}</span></div>
          <p class="en" data-a="0.9,0.6">{en}</p>
          <p class="csub" data-a="1.2,0.6">{sub}</p>
        </div>
'''


def rk(name, tick, val, txt, grp, cls, t0):
    return f'''            <div class="rk {cls}" data-a="{t0},0.7" style="--w:{val * 2.7:.2f}cqw">
              <p class="nm">{name}<small>{tick}</small></p>
              <div class="trk"><i></i><p class="vv">{txt}</p></div>
              <p class="gp">{grp}</p>
            </div>
'''


def card(name, tick, drop, t0, facts):
    fs = ''
    for ft, tt, good in facts:
        fs += f'              <li class="{"good" if good else ""}" data-a="{tt},0.6">{ft}</li>\n'
    return f'''          <div class="card" data-a="{t0},0.7">
            <p class="ch"><b>{name}</b><small>{tick}</small></p>
            <p class="dr">{drop}</p>
            <ul>
{fs}            </ul>
          </div>
'''


S = []
# ---- 0 opening
S.append('''        <div class="scene s0" data-start="0" data-end="6.663">
          <i class="rule"></i>
          <p class="tag"><b>情报简报</b> · 美股</p>
          <h2 class="hero">AI 股大跌</h2>
          <p class="hero-sub">谁跌得最狠，为什么</p>
          <p class="date">NASDAQ −1.88% · 费城半导体 −4.30% · 2026.10.14 美东收盘</p>
        </div>
''')
# ---- 1 who fell
S.append(chap(1, '谁在跌', 'WHO', '先看名单'))
rows = ''
rows += rk('CoreWeave', 'CRWV', 15.46, '−15.5', '负债型', 'g', 4.4)
rows += rk('戴尔', 'DELL', 11.3, '−11.3', '被降级', 'b', 8.6)
rows += rk('Nebius', 'NBIS', 10.08, '−10.1', '负债型', 'g', 9.4)
rows += rk('甲骨文', 'ORCL', 8.83, '−8.8', '负债型', 'g', 10.2)
rows += rk('慧与', 'HPE', 8.0, '超 −8', '被降级', 'b', 12.8)
rows += rk('美光', 'MU', 4.08, '−4.1', '芯片', 'c', 13.8)
rows += rk('ASML', 'ASML', 3.94, '−3.9', '芯片', 'c', 14.6)
rows += rk('英伟达', 'NVDA', 3.16, '−3.2', '芯片', 'c', 15.4)
S.append(f'''        <div class="scene s1" data-start="{ST[2]}" data-end="{EN[2]}">
          <p class="tag"><b>谁在跌</b> · 10 月 14 日单日跌幅（%）</p>
          <div class="rank">
{rows}          </div>
          <p class="legend" data-a="17,0.7"><span class="g">负债型：靠借钱建 AI 数据中心</span><span class="b">被降级：分析师下调评级</span><span class="c">芯片：好消息也被卖</span></p>
          <p class="src">来源：Yahoo Finance、TechFlow、Invezz（10/14 收盘）。慧与各来源数字不一（盘中 −4.5%，报道称收盘跌超 8%），取“超 8%”。</p>
        </div>
''')
# ---- 2 debt
S.append(chap(3, '负债', 'DEBT', '靠借钱建 AI 的公司'))
cards = ''
cards += card('CoreWeave', 'CRWV', '−15.5%', 1.0, [
    ('债务加租赁约 520 亿美元', 4.5, False),
    ('无担保债券收益率据报约 15%', 6.0, False),
    ('Gartner：2030 年 80% 新云或消失', 8.6, False),
    ('对照：订单积压 1,040 亿美元', 10.0, True)])
cards += card('Nebius', 'NBIS', '−10.1%', 12.5, [
    ('同样靠融资扩建 AI 云', 12.9, False),
    ('年内已增发超 20 亿美元股票', 14.0, False),
    ('各来源未见公司自身的新消息', 15.0, True)])
cards += card('甲骨文', 'ORCL', '−8.8%', 16.0, [
    ('债务接近 1,670 亿美元', 16.4, False),
    ('评级 BBB−，距垃圾级只差一档', 17.6, False),
    ('OpenAI 合同收入 2027 年才开始', 18.6, False),
    ('对照：最新季度营收 +30%', 19.6, True)])
S.append(f'''        <div class="scene s2" data-start="{ST[4]}" data-end="{EN[4]}">
          <p class="tag"><b>负债型</b> · 先花钱，后赚钱</p>
          <div class="cards">
{cards}          </div>
          <p class="note2" data-a="20.6,0.8">共同点：自由现金流为负，靠融资续命，利率一涨最先受伤</p>
          <p class="src">来源：Yahoo Finance、Motley Fool、TipRanks、24/7 Wall St（10/14）。债券收益率约 15% 出自社交平台上流传的图表，仅一处来源；对照项为公司公布的数字。</p>
        </div>
''')
# ---- 3 hardware + chips
S.append(chap(5, '硬件', 'HARDWARE', '服务器与芯片'))
S.append(f'''        <div class="scene s3" data-start="{ST[6]}" data-end="{EN[6]}">
          <p class="tag"><b>硬件与芯片</b> · 好消息也被卖</p>
          <div class="lp">
            <p class="ph" data-a="0.8,0.7">巴克莱降级：「增持」→「中性」</p>
            <div class="trow th" data-a="2.4,0.6"><span></span><span>近一年涨幅</span><span>目标价 · 昨收</span></div>
            <div class="trow" data-a="3.2,0.6"><span class="n">戴尔 <small>DELL</small></span><span class="u">+273%</span><span>574 · 572</span></div>
            <div class="trow" data-a="4.0,0.6"><span class="n">慧与 <small>HPE</small></span><span class="u">+177%</span><span>77 · 约 69</span></div>
            <div class="trow" data-a="4.8,0.6"><span class="n">NetApp <small>NTAP</small></span><span class="u">+101%</span><span>219 · 239</span></div>
            <p class="q" data-a="6.2,0.8">“估值涨多了，内存涨价推高了营收，还没看到有意义的 AI 拐点。”<small>— 巴克莱分析师 Tim Long（转述）</small></p>
          </div>
          <div class="rp" data-a="15.2,0.7">
            <p class="ph">芯片股</p>
            <p class="big"><span class="n" data-a="15.6,1.6" data-count="4.30" data-dec="2">0.00</span><span class="u">%</span></p>
            <p class="cap2">费城半导体指数单日跌幅，已连跌 6 天</p>
            <ul>
              <li data-a="20.3,0.6"><b>好业绩也被卖</b>美光、ASML 都是</li>
              <li data-a="22.2,0.6"><b>互相融资</b>AI 公司之间的循环融资，机构不买账</li>
              <li data-a="24.2,0.6"><b>年底锁定收益</b>资金转向软件</li>
            </ul>
          </div>
          <p class="src">来源：Yahoo Finance（巴克莱降级）、Invezz、TechFlow（半导体指数）、Yahoo Finance 视频（Baird 策略师 Ted Mortonson 的看法）。目标价与昨收为四舍五入。</p>
        </div>
''')
# ---- 4 why
S.append(chap(7, '原因', 'WHY', '共同的那条链'))
S.append(f'''        <div class="scene s4" data-start="{ST[8]}" data-end="{EN[8]}">
          <p class="tag"><b>为什么</b> · 一条链</p>
          <div class="chain">
            <div class="nd" data-a="0.9,0.7"><p class="k">油价</p><p class="v">布伦特约 106</p><p class="d">美伊冲突，霍尔木兹受阻</p></div>
            <i class="ar" data-a="1.6,0.4">→</i>
            <div class="nd" data-a="3.4,0.7"><p class="k">通胀</p><p class="v">汽油 +9.1%</p><p class="d">9 月环比；CPI 同比 3.7%</p></div>
            <i class="ar" data-a="4.1,0.4">→</i>
            <div class="nd" data-a="7.2,0.7"><p class="k">加息预期</p><p class="v">22% → 约 37%</p><p class="d">美联储 10 月加息概率</p></div>
            <i class="ar" data-a="7.9,0.4">→</i>
            <div class="nd" data-a="9.0,0.7"><p class="k">美债收益率</p><p class="v">10 年期约 5.2%</p><p class="d">2 年期约 4.8%，已高于政策利率</p></div>
          </div>
          <div class="mrow" style="top:27cqw">
            <h3 style="font-size:2.2cqw">股票 vs 国债</h3>
            <p class="desc">股票盈利收益率 = 1 ÷ 前瞻市盈率（19–20 倍）</p>
            <div class="mtrack">
              <div class="band" data-a="12.5,1" style="left:40%;width:30%"></div>
              <p class="bandlab" data-a="12.5,1" style="left:35%;width:40%">标普 500 盈利收益率 <b>5.0–5.3%</b></p>
              <div class="dot" data-a="14,0.8" style="left:60%"></div>
              <p class="dotlab" data-a="14,0.8" style="left:60%;top:-1.8cqw">10 年期国债 <b>约 5.2%</b></p>
              <div class="axis"><span style="left:0%">4.6%</span><span style="left:20%">4.8%</span><span style="left:40%">5.0%</span><span style="left:60%">5.2%</span><span style="left:80%">5.4%</span><span style="left:100%">5.6%</span></div>
            </div>
          </div>
          <p class="src">来源：美国劳工统计局 BLS（CPI）、OPB（油价与战事）、Yahoo Finance（加息概率）、TechFlow（收益率、油价）、Vantage（前瞻市盈率 19.0，10/2）。</p>
        </div>
''')
# ---- 5 next
S.append(chap(9, '接下来', 'NEXT', '日期与情景'))
cal = [('10/21', 'Meta 财报'), ('10/27', '谷歌 财报'), ('10/27–28', '美联储议息'), ('10/28', '微软 财报'), ('10/29', '亚马逊 财报'),
       ('11/2', '苹果 财报'), ('11/17', '英伟达 财报'), ('12/14', '甲骨文 财报')]
calh = ''
for i, (d, n) in enumerate(cal):
    calh += f'            <div class="cr{" hot" if "议息" in n else ""}" data-a="{1.0 + i * 0.35:.2f},0.5"><span class="d">{d}</span><span>{n}</span></div>\n'
S.append(f'''        <div class="scene s5" data-start="{ST[10]}" data-end="{EN[10]}">
          <p class="tag"><b>接下来</b> · 日期与情景推演</p>
          <div class="cal">
{calh}          </div>
          <div class="scn">
            <div class="sc" data-a="9.6,0.7"><p class="k">如果</p><p class="t">不加息，油价回落</p><p class="r">利率压力缓解，负债型公司最先喘口气</p></div>
            <div class="sc" data-a="14.6,0.7"><p class="k">如果</p><p class="t">再加息，30 年期国债收益率升破 5.3%</p><p class="r">高债务、高估值的股票继续承压（8 月长债破 5.3% 时，股市曾下跌）</p></div>
          </div>
          <p class="src">来源：Tickzen 日历（以公司公告为准）、Yahoo Finance（议息）、Motley Fool（甲骨文）、MercoPress（8 月）。情景为推演，不是预测。</p>
        </div>
''')
# ---- 6 judge
S.append(chap(11, '判断', 'YOUR CALL', '三个问题'))
S.append(f'''        <div class="scene s6" data-start="{ST[12]}" data-end="{EN[12]}">
          <p class="tag"><b>自己判断</b> · 三个问题</p>
          <div class="qs">
            <div class="q1" data-a="0.6,0.7"><p class="k">1</p><p class="t">赚的钱，够付利息吗？</p><p class="d">看自由现金流、债务到期</p></div>
            <div class="q1" data-a="3.3,0.7"><p class="k">2</p><p class="t">订单什么时候变成收入？</p><p class="d">CoreWeave 积压 1,040 亿 · 甲骨文 2027</p></div>
            <div class="q1" data-a="6.0,0.7"><p class="k">3</p><p class="t">价格已经反映了多少好消息？</p><p class="d">戴尔一年 +273% · Marvell 市盈率约 91 倍</p></div>
          </div>
          <p class="foot" data-a="7.4,0.6">信息整理，不构成投资建议</p>
        </div>
''')
S.append('''        <div class="scene s7" data-start="149" data-end="156">
          <p class="tag"><b>数据来源</b> · SOURCES</p>
          <ul class="srclist">
            <li data-a="0.30,0.5"><b>BLS · 9 月 CPI</b><span>bls.gov/news.release/cpi.htm</span></li>
            <li data-a="0.45,0.5"><b>Yahoo · CoreWeave</b><span>finance.yahoo.com/…/stock-market-today-oct-14-214836987</span></li>
            <li data-a="0.60,0.5"><b>Motley Fool · 甲骨文</b><span>fool.com/…/oracle-tumbles-on-hotter-cpi-data-…</span></li>
            <li data-a="0.75,0.5"><b>Yahoo · 巴克莱降级</b><span>finance.yahoo.com/…/hpe-dell-ntap-stocks-downgraded-…</span></li>
            <li data-a="0.90,0.5"><b>Invezz · 戴尔、慧与</b><span>invezz.com/…/why-are-dell-and-hpe-stocks-plunging-today</span></li>
            <li data-a="1.05,0.5"><b>TechFlow · 10/15</b><span>techflowpost.com/en-US/article/34583</span></li>
            <li data-a="1.20,0.5"><b>Yahoo · Baird 看法</b><span>finance.yahoo.com/video/…-204044671</span></li>
            <li data-a="1.35,0.5"><b>Yahoo · 加息概率</b><span>finance.yahoo.com/economy/policy/…/fed-interest-rate-hike-seems-…</span></li>
          </ul>
          <p class="foot" data-a="2.2,0.6">信息整理，不构成投资建议 · 数据截至 2026-10-15</p>
        </div>

''')
scenes = ''.join(S)
a = t.index('        <!-- 0 开场 -->')
b = t.index('        <div class="sub" id="sub"')
t = t[:a] + scenes + t[b:]

t = t.replace('<title>台积电三季报前瞻</title>', '<title>AI 股大跌复盘</title>')
t = t.replace('<p class="eyebrow">半导体 · 财报前瞻 · 样片</p>', '<p class="eyebrow">美股 · 个股复盘 · 约 2 分半</p>')
t = t.replace('<h1>台积电三季报前瞻</h1>', '<h1>AI 股大跌复盘</h1>')
t = re.sub(r'<p class="meta">.*?</p>', '<p class="meta">横屏 16:9，约 2 分 36 秒，无配音，含固定背景音乐和合成音效（点播放后出声）。六个专场页的“咚”都落在音乐的小节强拍上。口播稿、史实核对、卡点表、名词解释和数据来源在下方。美国市场数据为 2026-10-14 美东收盘，整理于 2026-10-15。</p>', t, count=1, flags=re.S)


def L(i, a, b, s):
    return '    [%d, %.2f, %.2f, %s],\n' % (i, ST[i] + a, ST[i] + b if b is not None else EN[i], "'" + s + "'")


lines = ''
lines += L(0, 0, 3.2, '美股大跌，但不是所有股票一起跌。')
lines += L(0, 3.2, None, '跌得最狠的，是靠借钱建 AI 的公司。')
lines += L(1, 0.4, None, '先看名单：谁跌得最多？')
lines += L(2, 0.3, 4.2, '10 月 14 日，纳指跌 1.88%，费城半导体指数跌 4.3%。')
lines += L(2, 4.2, 8.4, 'CoreWeave 一天跌了 15.5%。')
lines += L(2, 8.4, 12.6, '戴尔跌 11%，Nebius 跌 10%，甲骨文跌 8.8%。')
lines += L(2, 12.6, 16.8, '慧与跌超 8%，美光、ASML、英伟达跌 3% 到 4%。')
lines += L(2, 16.8, None, '这些股票其实分三类：靠借钱的、被降级的、好消息也被卖的。')
lines += L(3, 0.4, None, '第一类，负债。')
lines += L(4, 0.3, 4.3, '第一类，是靠借钱建数据中心的公司。')
lines += L(4, 4.3, 8.5, 'CoreWeave：债务加租赁约 520 亿美元，债券收益率据报升到约 15%。')
lines += L(4, 8.5, 12.3, 'Gartner 还预测，2030 年 80% 的新云公司可能消失。')
lines += L(4, 12.3, 15.8, 'Nebius 同样要大笔融资，今年已增发超 20 亿美元的股票。')
lines += L(4, 15.8, None, '甲骨文债务近 1,670 亿美元，评级只比垃圾级高一档；OpenAI 合同收入要到 2027 年。')
lines += L(5, 0.4, None, '第二类，硬件和芯片。')
lines += L(6, 0.3, 5.3, '第二类，被降级的硬件公司。巴克莱把戴尔、慧与、NetApp 降到“中性”。')
lines += L(6, 5.3, 10.5, '理由：估值涨多了，内存涨价推高了营收，还没看到有意义的 AI 拐点。')
lines += L(6, 10.5, 15.2, '三家过去一年涨了 273%、177%、101%；戴尔的目标价，几乎等于现价。')
lines += L(6, 15.2, 20.0, '芯片股同样在跌：费城半导体指数跌 4.3%，已经连跌六天。')
lines += L(6, 20.0, 25.0, 'Baird 的策略师说：好业绩也被卖，AI 公司互相融资，机构不太买账。')
lines += L(6, 25.0, None, '年底前锁定收益，资金也在转向软件。')
lines += L(7, 0.4, None, '这些下跌，背后是同一条链。')
lines += L(8, 0.3, 4.3, '这些下跌背后，是同一条链。')
lines += L(8, 4.3, 8.3, '美伊冲突推高油价，9 月汽油环比涨 9.1%，CPI 同比升到 3.7%。')
lines += L(8, 8.3, 12.3, '通胀回升，美联储 10 月加息的概率升到三四成，十年期美债收益率约 5.2%。')
lines += L(8, 12.3, None, '而标普 500 的盈利收益率只有 5% 左右：买股票相对国债，几乎没有额外补偿。')
lines += L(9, 0.4, None, '接下来，看日期和情景。')
lines += L(10, 0.3, 5.0, '先看日期：10 月 27、28 日美联储议息，同一周谷歌、微软、亚马逊发财报。')
lines += L(10, 5.0, 9.4, '大厂的资本开支，就是 AI 订单的来源，直接影响芯片和服务器公司。')
lines += L(10, 9.4, 14.4, '如果不加息、油价回落：利率压力缓解，负债型公司最先喘口气。')
lines += L(10, 14.4, None, '如果再加息、30 年期国债收益率升破 5.3%：高债务、高估值的股票继续承压。')
lines += L(11, 0.4, None, '最后，自己判断。')
lines += L(12, 0.2, 3.2, '判断一只 AI 股，可以问三个问题。')
lines += L(12, 3.2, 6.0, '它赚的钱够付利息吗？订单什么时候变成收入？')
lines += L(12, 6.0, None, '现在的价格，已经反映了多少好消息？')
lines += L(13, 0, None, '以上为公开信息整理，不构成投资建议，单日行情不代表之后走势。数据来源见画面。')
new_lines = '''  var NAMES = ['开场', '章节 · 谁在跌', '谁在跌', '章节 · 负债', '负债型：CoreWeave、Nebius、甲骨文', '章节 · 硬件', '硬件与芯片', '章节 · 原因', '共同的那条链', '章节 · 接下来', '日期与情景', '章节 · 判断', '三个问题', '数据来源'];
  // [scene index, start, end, text]
  var LINES = [
''' + lines.rstrip(',\n') + '\n  ];\n\n'
na = t.index("  var NAMES = [")
nb = t.index("  var $ = function")
t = t[:na] + new_lines + t[nb:]

# cues: local times -> global
def g(i, l):
    return round(ST[i] + l, 2)

cues = []
for l, ty in [(0.4, 'ding'), (4.4, 'hit'), (8.6, 'pop'), (9.4, 'pop'), (10.2, 'pop'), (12.8, 'pop'), (13.8, 'pop'), (14.6, 'pop'), (15.4, 'pop'), (17, 'soft')]:
    cues.append((g(2, l), ty))
for l, ty in [(1.0, 'ding'), (4.5, 'pop'), (6.0, 'pop'), (8.6, 'pop'), (10.0, 'soft'), (12.5, 'ding'), (13.0, 'pop'), (14.0, 'pop'), (16.0, 'ding'), (16.4, 'pop'), (17.6, 'pop'), (18.6, 'pop'), (19.6, 'soft'), (20.6, 'hit')]:
    cues.append((g(4, l), ty))
for l, ty in [(0.8, 'ding'), (3.2, 'pop'), (4.0, 'pop'), (4.8, 'pop'), (6.2, 'soft'), (15.2, 'hit'), (20.3, 'pop'), (22.2, 'pop'), (24.2, 'pop')]:
    cues.append((g(6, l), ty))
for l, ty in [(0.9, 'ding'), (3.4, 'pop'), (7.2, 'pop'), (9.0, 'hit'), (12.5, 'soft'), (14.0, 'hit')]:
    cues.append((g(8, l), ty))
for l, ty in [(1.0, 'pop'), (2.4, 'pop'), (3.8, 'pop'), (9.6, 'hit'), (14.6, 'hit')]:
    cues.append((g(10, l), ty))
for l, ty in [(0.6, 'ding'), (3.3, 'ding'), (6.0, 'ding'), (7.4, 'soft')]:
    cues.append((g(12, l), ty))
cues.append((149.4, 'soft'))
cue_txt = ',\n    '.join('[%s, \'%s\']' % (a_, b_) for a_, b_ in cues)
ca = t.index('  CUES.push(\n')
cb = t.index('  // Small effects snap')
t = t[:ca] + '  CUES.push(\n    ' + cue_txt + '\n  );\n' + t[cb:]
t = t.replace('var COUNTS = [[9.5, 1.8], [37.6, 1.6], [95.6, 1.8]];', 'var COUNTS = [[%s, 1.6]];' % g(6, 15.6))

# music table
for a_, b_ in [('<td>营收</td><td class="t">0:07.0</td>', '<td>谁在跌</td><td class="t">0:07.0</td>'), ('<td>九月</td><td class="t">0:34.7</td>', '<td>负债</td><td class="t">0:34.7</td>'),
               ('<td>利润率</td><td class="t">1:00.2</td>', '<td>硬件</td><td class="t">1:00.2</td>'), ('<td>预期</td><td class="t">1:32.1</td>', '<td>原因</td><td class="t">1:32.1</td>'),
               ('<td>看点</td><td class="t">1:52.3</td>', '<td>接下来</td><td class="t">1:52.3</td>'), ('<td>风险</td><td class="t">2:16.8</td>', '<td>判断</td><td class="t">2:16.8</td>')]:
    assert a_ in t, a_
    t = t.replace(a_, b_)

# body sections
ga = t.index('  <section>\n    <h2 class="sec">名词解释</h2>')
gb = t.index('</main>')
exec(open(SP + 'news/body2.py', encoding='utf-8').read())
t = t[:ga] + BODY + t[gb:]

css = open(SP + 'news/css2.txt', encoding='utf-8').read()
t = t.replace('@media (prefers-reduced-motion: reduce) {', css + '@media (prefers-reduced-motion: reduce) {', 1)
a = t.index('  // ---- save the rendered mp4')
b = t.index('  ensureAudio();   // created suspended')
t = t[:a] + t[b:]
t = re.sub(r'\s*<button class="btn" id="dl"[^>]*>保存视频</button>', '', t)
t = re.sub(r'\s*<div class="dlrow" id="dlrow" hidden>.*?</div>\s*</div>\s*</div>', '\n      </div>\n    </div>', t, count=1, flags=re.S)
open('/home/claude/us-selloff.html', 'w', encoding='utf-8').write(t)
print(len(t))
