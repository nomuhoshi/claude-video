# -*- coding: utf-8 -*-
def row(claim, st, note):
    cls = {'已核实': 'ok', '存疑': 'warn', '常识': 'ok', '简化': 'warn'}[st]
    return f'      <tr><td>{claim}</td><td><span class="badge {cls}">{st}</span></td><td>{note}</td></tr>\n'

rows = ''
rows += row('内容改编自 1983 年 BBC 节目《Fun to Imagine》里谈“火”的一段', '已核实', 'Marginalian 与 NPR（Krulwich Wonders）都标注该片段出自 BBC 1983 年《Fun to Imagine》。视频依据的是用户提供的中文字幕稿（机器翻译、语句有错乱），意思按原节目的讲法重新整理，没有逐字照搬。')
rows += row('碳和氧靠得够近会紧紧抱在一起，靠得不够近反而互相排斥', '简化', '这是节目里的“小山和深坑”比喻（化学里叫活化能，能垒）。真实反应更复杂，例如氧气要先断开氧分子内部的键。视频只讲到比喻这一层。')
rows += row('球滚得慢爬不上山，滚得快才能冲过山顶掉进深坑', '常识', '反应需要最低能量才能发生，叫活化能（LibreTexts《8.5 温度对反应速率的影响》）。')
rows += row('热就是原子在乱抖，温度越高抖得越快；总有少数原子特别快', '常识', '同上页：同一温度下分子的动能有一个分布（麦克斯韦–玻尔兹曼分布），温度升高时，动能超过活化能的比例会迅速增加。画面里的速度曲线是这个分布的示意形状，横轴不带真实数值。')
rows += row('木头要加热到几百摄氏度才会开始烧', '已核实', 'Kirk-Othmer《Wood》条目（美国农业部林务局作者）：明火引燃约 300–350 °C，无明火自燃约 250 °C。视频只说“几百摄氏度”。')
rows += row('原子掉进深坑会放出能量，变成抖动，撞到旁边的原子，形成连锁反应，这就是火', '简化', '这是节目用的“热反馈”图景：放热让更多反应发生。真实的火焰里还有自由基链式反应，木头也是先受热分解出可燃气体，火焰主要烧的是这些气体。视频没有展开。')
rows += row('干木头的重量大约一半是碳', '已核实', 'Kirk-Othmer《Wood》条目：干木头平均约 50% 碳、6% 氢、44% 氧（不含矿物质，按重量）。画面的三色条用的就是这三个数。')
rows += row('树里的碳不是从土里长出来的，而是来自空气中的二氧化碳', '已核实', 'Krulwich 文章：树的质量主要来自空气和水，不是土壤。氢来自水，土壤矿物质只占很小一部分。视频说“大部分身体来自空气”，“土只给了水和一点点矿物质”。')
rows += row('阳光把氧从碳身上敲开，氧是副产品，被吐回空气', '简化', '这是原节目的简化说法，画面照此演示。更准确地说：光合作用放出的氧气来自水的分解（Wikipedia《Photosynthesis》），二氧化碳里的碳最终进入糖和木质素。整体上“用阳光的能量把碳固定下来、放出氧气”不变。画面右上角有“简化”小注。')
rows += row('火光和热是树存下来的阳光（储存的太阳）', '已核实', '与原话意思一致；NPR 与 Marginalian 都概括为“火的光和热就是太阳的光和热，借树储存起来”。能量上说：木头的化学能最初来自光合作用吸收的阳光。')
rows += row('结尾“下一个问题：太阳为什么这么热，留给你们想象”', '已核实', '节目这段话的最后一句，字幕稿末句。')
rows += row('原子大小、画面里的距离和速度', '简化', '全部是示意，不是真实比例。')
check = f"""    <section>
    <h2 class="sec">史实核对</h2>
    <p class="hint">下面是视频里每个说法的核对结果。“已核实”表示在列出的来源里找到；“简化”表示节目或视频为了好懂做了简化，页面里写了更准确的版本；“常识”表示教科书常识。</p>
    <div class="tablewrap"><table><thead><tr><th>说法</th><th>状态</th><th>说明</th></tr></thead><tbody>
{rows}    </tbody></table></div>
  </section>
"""

sound = """  <section>
    <h2 class="sec">声音设计</h2>
    <p class="hint">配乐沿用固定的 vibe.mp3（节拍固定，按小节重新拼成这支片子的长度：片头安静的前奏 → 主体律动 → 讲“树从哪来”时的安静段 → 壁炉再起 → 讲太阳时渐渐收尾），上面再叠一层用合成器做的“空灵”声场：大空间混响里的缓慢和弦、落在每句字幕上的玻璃铃音，再加上跟着故事走的环境声。长短都由内容定。</p>
    <div class="tablewrap"><table><thead><tr><th>层</th><th>做法</th><th>跟画面的对应</th></tr></thead><tbody>
      <tr><td>配乐 vibe.mp3</td><td>按小节切段重拼，接缝 20 毫秒交叉淡化，高频略收，音量比音效低约 11 dB</td><td>前奏对着开场，律动从第一幕开始，安静段对着“树从哪来”，渐弱对着“太阳”一幕</td></tr>
      <tr><td>和弦底色</td><td>三根锯齿波加一根正弦，低通滤波，慢速摇动，进出各 3–5 秒；一个极低的正弦垫底</td><td>每一幕换一个和弦：小山幕偏明亮，热和连锁反应偏暗，阳光和结尾回到明亮的 D 大调</td></tr>
      <tr><td>玻璃铃音</td><td>D 大调五声音阶，四个泛音，衰减 1–3 秒，直接送进长混响</td><td>每句字幕开始时响一声，音高缓缓起伏</td></tr>
      <tr><td>风</td><td>粉红噪声，带通滤波摇动，左右慢慢飘</td><td>开场、讲树和空气的两幕</td></tr>
      <tr><td>火的噼啪和低吼</td><td>噼啪声用随机爆裂音合成（循环无缝），低吼是棕噪声低通</td><td>开场点着火；连锁反应一幕音量随“已烧起来的原子比例”增长；壁炉一幕再回来</td></tr>
      <tr><td>随球变调的音</td><td>正弦加三角波，音高和音量跟着小球的速度变</td><td>小球爬山、滚回、冲过山顶、掉进坑里，声音同步</td></tr>
      <tr><td>热的“嗒嗒”</td><td>很细的高频噪声点，频率随温度上升</td><td>热的一幕，越热越密</td></tr>
      <tr><td>连锁反应的琶音</td><td>每个原子“烧起来”时响一声小铃，音高随机落在五声音阶上</td><td>铃声越来越密，和画面里扩散的速度一致</td></tr>
      <tr><td>章节页</td><td>上升的“光晕”声，落点是低沉的次低音加三个铃音</td><td>四个章节页</td></tr>
      <tr><td>阳光</td><td>高频的细小正弦闪烁，长颤音</td><td>光合作用一幕和壁炉一幕的后半</td></tr>
    </tbody></table></div>
  </section>
"""

gloss = """  <section>
    <h2 class="sec">名词解释</h2>
    <dl class="gl">
      <dt>活化能（视频里的“小山”）</dt><dd>让反应发生需要先越过的最低能量。山越高，反应越难自己开始。</dd>
      <dt>热（视频里的“乱抖”）</dt><dd>原子和分子的无规则运动。温度越高，运动越剧烈。</dd>
      <dt>速度分布</dt><dd>同一温度下，原子的速度有快有慢，大多数在中间，少数特别快。升温后，特别快的那一小部分会明显变多。</dd>
      <dt>放热反应</dt><dd>反应后放出能量的反应。木头燃烧就是。</dd>
      <dt>二氧化碳</dt><dd>一个碳原子和两个氧原子抱在一起，空气里约占万分之四。</dd>
      <dt>光合作用</dt><dd>植物用阳光的能量，把二氧化碳和水变成糖等物质，同时放出氧气。</dd>
    </dl>
  </section>
"""

SRC = [
    ('BBC 节目整理：Marginalian', 'themarginalian.org', 'https://www.themarginalian.org/2012/09/27/richard-feynman-fire-trees/'),
    ('NPR Krulwich：树来自空气', 'npr.org/sections/krulwich/2012/09/25/161753383', 'https://www.npr.org/sections/krulwich/2012/09/25/161753383/trees-come-from-out-of-the-air-says-nobel-laureate-richard-feynman-really'),
    ('Kirk-Othmer《Wood》条目', 'fpl.fs.usda.gov/documnts/pdf2007/fpl_2007_kretschmann001.pdf', 'https://www.fpl.fs.usda.gov/documnts/pdf2007/fpl_2007_kretschmann001.pdf'),
    ('温度对反应速率的影响', 'chem.libretexts.org · 8.5 Effect of Temperature on Reaction Rates', 'https://chem.libretexts.org/Courses/Pacific_Union_College/Kinetics/08%3A_Chemical_Kinetics/8.05%3A_The_Effect_of_Temperature_on_Reaction_Rates'),
    ('光合作用', 'en.wikipedia.org/wiki/Photosynthesis', 'https://en.wikipedia.org/wiki/Photosynthesis'),
]
srcs = ''.join(f'      <li><span class="nm">{n}</span> <span>{d}</span><br><a href="{u}" target="_blank" rel="noopener">{u}</a></li>\n' for n, d, u in SRC)
srcsec = f"""  <section>
    <h2 class="sec">资料来源</h2>
    <ul class="srcs">
{srcs}    </ul>
    <p class="hint" style="margin-top:12px">说明：字幕稿来自用户提供的 BBC 节目中文机翻文本，原文语句有错乱，视频的字幕是据此重新整理的；图都是示意，不是真实比例。数据截至 2026-10-16。</p>
  </section>
"""
