# -*- coding: utf-8 -*-
def row(claim, st, note):
    cls = {'已核实': 'ok', '常识': 'ok', '简化': 'warn', '转述': 'warn', '出自文字稿': 'ok', '存疑': 'warn'}[st]
    return f'      <tr><td>{claim}</td><td><span class="badge {cls}">{st}</span></td><td>{note}</td></tr>\n'

rows = ''
rows += row('咖啡会凉、小球会停、水滴会消失，背后都是原子的振动', '简化', '这是视频的主线，来自文字稿的思路：热是原子的无规则运动；三件事分别对应热传导、能量变成热、蒸发。')
rows += row('烫和凉的差别，在于原子振动得多快：振动得快就烫，振动得慢就凉', '简化', '更准确：温度反映大量粒子无规则运动的平均动能（维基百科“Temperature”“Kinetic theory of gases”）。“振动”是通俗说法：固体里的原子在原位附近振动；液体里的分子边振动边挪动；气体分子则是满屋子乱飞（所以讲空气时视频说“跑”）。')
rows += row('室温下空气分子平均每秒跑约 470 米，比声音（约 340 米/秒）还快', '已核实', '用维基百科“Maxwell–Boltzmann distribution”的平均速率公式 v = √(8RT/πM) 算：空气 M ≈ 29 g/mol、T = 300 K，得约 468 m/s；氮气约 476 m/s。20 °C 空气中声速约 343 m/s。')
rows += row('冰里原子还在振动，液氮（−196 °C）里振动得更慢；最冷是零下 273.15 度（绝对零度），不可能更冷', '简化', '维基百科“Absolute zero”：绝对零度是 −273.15 °C。字幕说“几乎不抖”而不说“完全不动”：量子力学里粒子在绝对零度仍有零点运动。液氮沸点约 −196 °C。画面里温度计的刻度不按比例。')
rows += row('热从咖啡传给杯壁、再传给空气，靠的是原子一个撞一个；传过去的不是“热物质”，只是振动', '简化', '热传导的微观图景（维基百科“Thermal conduction”）。历史上曾有“热质说”，认为热是一种物质，后来被否定。现实中还有对流和辐射，视频只讲碰撞。')
rows += row('咖啡会一直变凉，直到和屋子一样；凉咖啡从来不会自己变烫', '已核实', '维基百科“Second law of thermodynamics”：热不会自发地从低温流向高温。画面里的降温曲线是示意，不是测量数据；屋子升温极小。')
rows += row('原子撞来撞去不丢能量，永远不会停', '简化', '文字稿的原话是“我们必须想象”原子是完美弹性的。理想气体分子的碰撞就是这样建模的；固体里的原子是在原位附近来回振动。')
rows += row('小球越弹越矮，失去的运动变成了地板和小球里原子的振动，地板略微变热', '简化', '能量守恒：动能主要变成热，也有一小部分变成声音和形变。温度升高极小，画面里的变色是示意。')
rows += row('倒着放：地板原子恰好一起往上推，把小球弹回去——定律不禁止，但需要亿万个原子同时配合，所以永远等不到', '简化', '维基百科“Second law of thermodynamics”：对日常尺度的系统，违反第二定律的概率“实际上为零”。微观规律本身可以倒过来走，宏观上几乎不可能。这一段是我按文字稿的思路补充的。')
rows += row('锤子每砸一下，整齐的运动就变成铁块里的振动，敲得越多越烫', '常识', '做功变成热。画面里铁块变红是为了好看，普通敲打远不会把铁块敲到发红。')
rows += row('水里的原子互相吸引；表面的原子只有一边有同伴，所以往里挤，水滴挤成圆球：这就是表面张力', '已核实', '维基百科“Surface tension”：表面的分子被往里拉；自由液滴是球形，因为同体积下球的表面积最小。“想要同伴”“人群”是文字稿里的比喻。')
rows += row('水珠表面的原子不断逃进空气，水珠慢慢消失：这就是蒸发', '已核实', '维基百科“Evaporation”：靠近表面、能量够大、方向对的分子能离开液体。')
rows += row('逃走的偏偏是动得最快的原子，剩下的平均慢一点，水变凉；所以出汗会让人凉快', '已核实', '维基百科“Evaporation”：“As the faster-moving molecules escape, the remaining molecules have lower average kinetic energy”，这叫蒸发冷却；“Evaporative cooler”条目也以出汗为例。这一段是我补充的，用来呼应文字稿结尾“跑步的人从出汗中得到乐趣”。')
rows += row('科学难，常常难在需要想象力；想象出来以后，就像跑步的人从出汗里得到快乐，停不下来', '出自文字稿', '费曼的原话和看法，视频里按原意转述（出处见资料来源）。')
rows += row('画面里的原子、杯子、小球、人群、水珠、锤子、曲线', '简化', '全部是示意：原子的大小、数量、速度、间距都不按真实比例。')
check = f"""    <section>
    <h2 class="sec">内容核对</h2>
    <p class="hint">下面是视频里每个说法的核对结果。“已核实”表示我在引用的资料里找到了；“常识”是基础物理知识；“出自文字稿”表示出处是你提供的这段文字稿，是费曼的话，我按原意转述；“简化”表示视频为了好懂做了概括，这里写了更准确的版本。</p>
    <div class="tablewrap"><table><thead><tr><th>说法</th><th>状态</th><th>说明</th></tr></thead><tbody>
{rows}    </tbody></table></div>
  </section>
"""

sound = """  <section>
    <h2 class="sec">声音设计</h2>
    <p class="hint">配乐是《Entropy》（Original），速度固定 150 BPM，F 小调。我把它按小节重新拼成这支片子的长度：前奏 → 律动 → 过渡 → 律动回来 → 安静段 → 高潮 → 收尾。每个转场、每句字幕的切换都落在它的拍子上，每一幕的第一句字幕比画面晚 1–2 秒出现。</p>
    <div class="tablewrap"><table><thead><tr><th>层</th><th>做法</th><th>跟画面的对应</th></tr></thead><tbody>
      <tr><td>配乐 Entropy</td><td>按小节切段重拼，接缝用 0.15 秒等功率交叉淡化，高频略收；场景切换对齐到 0.4 秒一拍，章节页、重头戏对齐到 1.6 秒一小节</td><td>前奏对着开场的三个谜；律动从“冷与热”进来；过渡段对着“弹跳”；律动回来对着“倒着放”；安静段对着“水滴”；高潮从“出汗为什么凉快”开始</td></tr>
      <tr><td>和弦底色</td><td>锯齿波加正弦，低通滤波，慢速摇动；整体下移六个半音到 Ab 大调，一个低沉的正弦垫底</td><td>每一幕换一个和弦，和配乐的和声保持协调</td></tr>
      <tr><td>玻璃铃音</td><td>五声音阶，四个泛音，衰减 1–3 秒，进长混响</td><td>隔一句字幕响一声，位置贴着最近的八分音符</td></tr>
      <tr><td>转场音</td><td>章节页前有上升的“光晕”，落点是低沉的次低音；普通场景切换前有一声很轻的气流</td><td>四个章节页和每一次换场</td></tr>
      <tr><td>画面音效</td><td>短促的“叮”“啪”“咚”“嗒”，都是合成的</td><td>原子撞击、小球落地、倒放、锤子敲下、水珠挤成一团、绝对零度出现等关键画面</td></tr>
      <tr><td>风、微光</td><td>粉红噪声和高频的细小闪烁</td><td>开场、回顾，以及绝对零度和水珠消失两幕</td></tr>
    </tbody></table></div>
  </section>
"""

gloss = """  <section>
    <h2 class="sec">名词解释</h2>
    <dl class="gl">
      <dt>温度、热</dt><dd>温度反映大量粒子无规则运动的平均动能：粒子运动得越剧烈，温度越高。热是因为温度不同而从一处传到另一处的能量。视频里的“抖得快就热”就是这个意思。</dd>
      <dt>绝对零度</dt><dd>最低的温度，−273.15 °C。到这里粒子的无规则运动几乎停止（量子力学说仍有一点“零点运动”）。这个数值得记住。</dd>
      <dt>热力学第二定律</dt><dd>热会自发地从高温流向低温，反过来不会自己发生。微观上并非绝对不可能，但对日常大小的东西，概率小到可以当作零。</dd>
      <dt>蒸发冷却</dt><dd>液体表面动得最快的分子先逃走，剩下的平均更慢，液体就变凉。出汗、扇风、酒精擦皮肤觉得凉，都是这个道理。</dd>
      <dt>平均速率</dt><dd>气体分子的平均速率 v = √(8RT/πM)，温度越高、分子越轻，跑得越快。室温空气约 470 米/秒。公式不用背，记住“几百米每秒、比声音快”就够了。</dd>
      <dt>动能</dt><dd>运动的物体具有的能量，E = ½mv²。这条公式值得直接记住：质量越大、速度越快，动能越大，而且和速度的平方成正比。</dd>
      <dt>弹性碰撞</dt><dd>碰撞前后总动能不变的碰撞，没有能量变成热或形变。小球落地不是弹性碰撞；理想气体里的分子碰撞才近似是。</dd>
      <dt>热传导</dt><dd>热通过粒子之间的碰撞，从温度高的地方传到温度低的地方，传递的是无规则的振动。</dd>
      <dt>表面张力</dt><dd>液体表面像一层绷紧的膜，想让表面积尽量小。原因是表面的分子少了一边的邻居，被往里拉。所以自由的小水滴是球形。</dd>
      <dt>蒸发</dt><dd>液体表面动能足够大、方向又对的分子，挣脱周围分子的吸引，飞进空气里。</dd>
    </dl>
  </section>
"""

SRC = [
    ('费曼：BBC《Fun to Imagine》（1983）', 'flashbak.com · 本片内容出自费曼的这段讲述', 'https://flashbak.com/in-1983-it-was-fun-to-imagine-with-nobel-prize-winning-physicist-richard-feynman-19878/'),
    ('维基百科：温度', 'en.wikipedia.org · 平均动能与温度', 'https://en.wikipedia.org/wiki/Temperature'),
    ('维基百科：气体动理论', 'en.wikipedia.org · 分子的无规则运动与弹性碰撞', 'https://en.wikipedia.org/wiki/Kinetic_theory_of_gases'),
    ('维基百科：热传导', 'en.wikipedia.org · 粒子碰撞传热', 'https://en.wikipedia.org/wiki/Thermal_conduction'),
    ('维基百科：表面张力', 'en.wikipedia.org · 为什么液滴是球形', 'https://en.wikipedia.org/wiki/Surface_tension'),
    ('维基百科：蒸发', 'en.wikipedia.org · 逃走的是最快的分子', 'https://en.wikipedia.org/wiki/Evaporation'),
    ('维基百科：绝对零度', 'en.wikipedia.org · −273.15 °C 与零点运动', 'https://en.wikipedia.org/wiki/Absolute_zero'),
    ('维基百科：麦克斯韦–玻尔兹曼分布', 'en.wikipedia.org · 分子平均速率公式', 'https://en.wikipedia.org/wiki/Maxwell%E2%80%93Boltzmann_distribution'),
    ('维基百科：热力学第二定律', 'en.wikipedia.org · 热不会自己从冷流向热', 'https://en.wikipedia.org/wiki/Second_law_of_thermodynamics'),
]
srcs = ''.join(f'      <li><span class="nm">{n}</span> <span>{d}</span><br><a href="{u}" target="_blank" rel="noopener">{u}</a></li>\n' for n, d, u in SRC)
srcsec = f"""  <section>
    <h2 class="sec">资料来源</h2>
    <ul class="srcs">
{srcs}    </ul>
    <p class="hint" style="margin-top:12px">说明：故事和论述的主线出自费曼的讲述（你提供的文字稿）（费曼的原话，视频里按原意转述）；物理上的细节我用上面的公开资料核对，“内容核对”里逐条写了。画面都是示意。</p>
  </section>
"""
