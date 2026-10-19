# -*- coding: utf-8 -*-
def row(claim, st, note):
    cls = {'已核实': 'ok', '常识': 'ok', '简化': 'warn', '转述': 'warn', '存疑': 'warn'}[st]
    return f'      <tr><td>{claim}</td><td><span class="badge {cls}">{st}</span></td><td>{note}</td></tr>\n'

rows = ''
rows += row('美光 1978 年成立，在美国爱达荷州博伊西，最早做芯片设计咨询', '已核实', '维基百科“Micron Technology”：1978 年 10 月 5 日成立于博伊西，起初做设计咨询。')
rows += row('1981 年建起第一座晶圆厂，做出内存芯片', '已核实', '同上：1981 年第一座晶圆厂，产品是 64K DRAM。视频说“第一批内存芯片”。')
rows += row('全球约有 6.1 万名员工', '已核实', '2026 财年年报（10-K）：截至 2026 年 9 月 3 日约 61,000 人。')
rows += row('主要产品是 DRAM、NAND 和 NOR 三类存储芯片', '已核实', '2026 财年年报：“半导体存储与存储器的全球领导者”，产品为 DRAM、NAND、NOR。')
rows += row('2026 财年收入约 1330 亿美元', '已核实', '美光 2026 年 9 月 30 日公告：全年收入 1331.9 亿美元；上一财年 373.8 亿。注意 2026 财年有 53 周。')
rows += row('DRAM 约占四分之三，NAND 约占四分之一', '简化', '年报：DRAM 1006.8 亿，NAND 317.9 亿，分别约 76% 和 24%（我自己算的）；剩下是 NOR 等，占比很小，视频里略去。')
rows += row('DRAM 速度快、断电丢数据；NAND 断电保留、容量大、更便宜但更慢', '常识', '存储器基础知识，没有专门引用。“更便宜”指每单位容量的价格。')
rows += row('“书桌”和“书柜”的比喻、处理器先搬数据再算再放回', '简化', '真实系统还有多级缓存、闪存控制器等，视频只讲最核心的两层。')
rows += row('AI 模型参数动辄几千亿个；处理器常常要等内存送数据', '简化', '大模型参数量从几十亿到上万亿不等，“几千亿”是常见量级。“内存墙”是计算机体系结构里的常识说法。')
rows += row('HBM：把多层 DRAM 叠起来，用硅通孔相连，紧贴处理器，中间有硅中介层', '已核实', '维基百科“High Bandwidth Memory”。')
rows += row('第一代每叠 1024 条数据通道，第四代翻倍到 2048 条', '已核实', '同上：HBM1 每叠 1024 位接口；HBM4（2025 年 4 月标准）为 2048 位。')
rows += row('目前主要的 HBM 供应商是 SK 海力士、三星和美光', '已核实', '维基百科“High Bandwidth Memory”列出这三家为制造商。')
rows += row('2026 年美光开始量产 HBM4，12 层叠起来，容量 36GB', '已核实', '2026 财年年报：“2026 年，我们开始量产 HBM4 36GB 12-high”。')
rows += row('四块业务的收入：云端内存约 431 亿，核心数据中心约 376 亿，手机和电脑约 366 亿，汽车和嵌入式约 159 亿', '已核实', '年报给出四个业务部门 2026 财年收入：430.9 / 375.9 / 366.0 / 158.9 亿美元。中文名是我的意译，官方叫 Cloud Memory、Core Data Center、Mobile and Client、Automotive and Embedded。')
rows += row('前两块合起来约占六成', '已核实', '我自己算的：(430.9 + 375.9) ÷ 1331.9 ≈ 60.6%。')
rows += row('2026 年第二季度 DRAM 收入份额：三星约 38%，SK 海力士约 25%，美光约 24%；三家约 87%', '转述', '来自 Counterpoint Research 的市场报告，是第三方机构的估计。别的机构给的数字不同；视频没讲 HBM 的份额，因为各家估计差得比较大。87% 是三个数相加。')
rows += row('近八个财年收入：2019–2022 年在 214 亿到 308 亿之间；2023 年 155 亿，亏约 58 亿；2025 年 374 亿；2026 年 1332 亿', '已核实', '2019–2025 年取自维基百科“Micron Technology”的年度财务表（出自公司年报），2026 年取自公告。美元，财年口径。')
rows += row('建厂要好几年；需求涨、产能跟不上则价格飙升；产能多了价格回落', '简化', '这是对行业周期的通俗概括。年报里的原话是“行业有周期，需求变化与市场可用供给并不完全同步”，视频里的最后两句是它的意译。')
rows += row('最近一个季度（截至 2026 年 9 月）收入 542 亿美元，约为去年同期的 4.8 倍', '已核实', '公告：542.3 亿，去年同期 113.2 亿；倍数是我自己算的：54.23 ÷ 11.32 ≈ 4.8。')
rows += row('公司说偏紧的局面预计持续到 2028 年', '转述', '来自第三方整理的财报电话会文字稿（机器转录，可能有误）；稿中说预计市场条件到 2028 年仍“偏紧”。我没有读到电话会原件。')
rows += row('2026 财年资本开支约 274 亿美元', '已核实', '公告：资本开支 273.7 亿美元。')
rows += row('计划在美国总共投入约 2000 亿美元；爱达荷州两座工厂；纽约州最多四座', '转述', '来自 Business Facilities 对 2025 年 6 月公司计划的报道。这是计划，不是已经建成的数字。')
rows += row('爱达荷第一座工厂预计 2027 年中出第一批晶圆', '转述', '来自第三方整理的财报电话会文字稿（见上），是公司预期。')
rows += row('新加坡宣布投资 240 亿美元', '转述', '维基百科“Micron Technology”引述 2026 年 1 月 27 日的公告。我没有读到公告原文。')
rows += row('台湾、日本、马来西亚、印度也有生产基地', '已核实', '年报：生产基地在台湾、新加坡、日本、美国、马来西亚、中国、印度。视频里只举了四个。')
rows += row('HBM 封装产能也在往外扩', '转述', 'Business Facilities 提到美国本土将建 HBM 封装；财报电话会文字稿提到新加坡 HBM 设施明年爬坡。')
rows += row('2025 年 12 月宣布退出 Crucial 消费品牌，2026 年 2 月不再向消费者发货；保修和支持继续', '转述', 'StorageNewsletter 转载的公司公告：2025 年 12 月 5 日宣布，消费品发货持续到 2026 财年第二季度末（2026 年 2 月）；保修和支持继续。')
rows += row('理由：把供应倾向增长更快的大客户', '转述', '同上，公司说法是“改善对更大的战略客户、增长更快的细分市场的供应与支持”。视频里是缩写。')
rows += row('画面里的存储单元、硬币式芯片、HBM 叠层、柱状图、地图和工厂', '简化', '全部是示意：大小、层数、通道数量、位置都不按真实比例；HBM 叠层的层数按讲到的 4、8、12 层示意。')
check = f"""    <section>
    <h2 class="sec">内容核对</h2>
    <p class="hint">下面是视频里每个说法的核对结果。“已核实”表示我在引用的资料里找到了，或者用资料里的数字自己重新算过；“转述”表示出自新闻报道、第三方机构或第三方整理的文字稿，我没有读到一手原件；“简化”表示视频为了好懂做了概括，这里写了更准确的版本。这支视频只讲事实，不构成任何投资建议，也不讲股价。</p>
    <div class="tablewrap"><table><thead><tr><th>说法</th><th>状态</th><th>说明</th></tr></thead><tbody>
{rows}    </tbody></table></div>
  </section>
"""

sound = """  <section>
    <h2 class="sec">声音设计</h2>
    <p class="hint">配乐是《Entropy》（Original），速度固定 150 BPM，F 小调。我把它按小节重新拼成这支片子的长度：前奏 → 律动 → 过渡 → 律动回来 → 安静段 → 高潮 → 收尾。每个转场、每句字幕的切换都落在它的拍子上，每一幕的第一句字幕比画面晚出现一两秒。上面再叠一层很轻的合成器音效，整体移到了和配乐同一个调。</p>
    <div class="tablewrap"><table><thead><tr><th>层</th><th>做法</th><th>跟画面的对应</th></tr></thead><tbody>
      <tr><td>配乐 Entropy</td><td>按小节切段重拼，接缝用 0.15 秒等功率交叉淡化，高频略收；每个场景的切换对齐到 0.4 秒一拍，章节页、重头戏对齐到 1.6 秒一小节</td><td>前奏对着开场；律动从“起点”一幕进来；过渡段对着“AI 的胃口”；律动回来对着“四块业务”；安静段对着“起起落落”；高潮的第一拍落在“大扩产”上；收尾对着回顾</td></tr>
      <tr><td>和弦底色</td><td>锯齿波加正弦，低通滤波，慢速摇动；整体下移六个半音到 Ab 大调（F 小调的关系大调），一个低沉的正弦垫底</td><td>每一幕换一个和弦，和配乐的和声保持协调</td></tr>
      <tr><td>玻璃铃音</td><td>五声音阶，四个泛音，衰减 1–3 秒，进长混响</td><td>隔一句字幕响一声，位置贴着最近的八分音符</td></tr>
      <tr><td>转场音</td><td>章节页前有上升的“光晕”，落点是低沉的次低音和三个铃音；普通场景切换前有一声很轻的气流</td><td>六个章节页和每一次换场</td></tr>
      <tr><td>画面音效</td><td>短促的“叮”“啪”“咚”“嗒”，都是合成的</td><td>断电清空、HBM 叠起来、柱子升起、价格暴跌等关键画面</td></tr>
      <tr><td>风</td><td>粉红噪声，带通滤波摇动</td><td>开场，以及最后的回顾</td></tr>
      <tr><td>微光</td><td>高频的细小正弦闪烁</td><td>“现在”一幕</td></tr>
    </tbody></table></div>
  </section>
"""

gloss = """  <section>
    <h2 class="sec">名词解释</h2>
    <dl class="gl">
      <dt>DRAM（内存）</dt><dd>动态随机存取存储器。速度快，断电后数据消失，电脑和手机里的“内存”就是它。</dd>
      <dt>NAND（闪存）</dt><dd>一种断电后也能保存数据的存储芯片，手机的存储空间、固态硬盘用的就是它。</dd>
      <dt>NOR</dt><dd>另一种闪存，读取很快，常用来存放设备启动所需的程序。视频里没有展开。</dd>
      <dt>HBM（高带宽内存）</dt><dd>把多层 DRAM 芯片叠起来，紧贴处理器放置，用很宽的通道传数据，主要用在 AI 加速器上。</dd>
      <dt>硅通孔（TSV）</dt><dd>穿过芯片的细小竖孔，里面填上金属，用来把叠起来的各层芯片连在一起。</dd>
      <dt>硅中介层</dt><dd>一块很薄的硅片，上面布了密集的线路，让处理器和 HBM 能用很多条通道直接相连。</dd>
      <dt>晶圆厂</dt><dd>在晶圆上制造芯片的工厂，建设周期长、花费大。</dd>
      <dt>财年</dt><dd>公司自己定的会计年度。美光的 2026 财年到 2026 年 9 月 3 日结束，共 53 周。</dd>
      <dt>资本开支</dt><dd>公司用来建厂房、买设备的钱。</dd>
    </dl>
  </section>
"""

SRC = [
    ('美光 2026 财年第四季度公告', 'investors.micron.com · 收入、业务部门', 'https://investors.micron.com/news/press-release/2026/Micron-Technology-Inc--Reports-Record-Fiscal-Fourth-Quarter-and-Full-Year-2026-Results/'),
    ('美光 2026 财年年报（10-K）', 'sec.gov · 产品、员工、周期', 'https://www.sec.gov/Archives/edgar/data/0000723125/000072312526000023/mu-20260903.htm'),
    ('维基百科：Micron Technology', 'en.wikipedia.org · 历史与历年收入', 'https://en.wikipedia.org/wiki/Micron_Technology'),
    ('维基百科：High Bandwidth Memory', 'en.wikipedia.org · HBM 结构与规格', 'https://en.wikipedia.org/wiki/High_Bandwidth_Memory'),
    ('Counterpoint：DRAM 与 HBM 份额', 'counterpointresearch.com · 2026 年第二季度', 'https://counterpointresearch.com/en/insights/global-dram-and-hbm-market-share'),
    ('Business Facilities：美光 2000 亿美元计划', 'businessfacilities.com · 美国扩产', 'https://businessfacilities.com/micron-plans-200b-investment-across-u-s'),
    ('财报电话会文字稿（第三方）', 'fool.com · 2028 与爱达荷', 'https://www.fool.com/earnings/call-transcripts/2026/10/01/micron-mu-q4-2026-earnings-call-transcript/'),
    ('StorageNewsletter：退出 Crucial', 'storagenewsletter.com · 公司公告转载', 'https://www.storagenewsletter.com/2025/12/05/micron-announces-exit-from-crucial-consumer-business/'),
]
srcs = ''.join(f'      <li><span class="nm">{n}</span> <span>{d}</span><br><a href="{u}" target="_blank" rel="noopener">{u}</a></li>\n' for n, d, u in SRC)
srcsec = f"""  <section>
    <h2 class="sec">资料来源</h2>
    <ul class="srcs">
{srcs}    </ul>
    <p class="hint" style="margin-top:12px">说明：视频内容整理自上面这些公开资料，只讲事实，不构成投资建议。数字有的是我用资料里的数字重新算过的，页面“内容核对”里逐条写了。画面都是示意。</p>
  </section>
"""
