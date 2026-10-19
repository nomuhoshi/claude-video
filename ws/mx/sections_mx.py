# -*- coding: utf-8 -*-
def row(claim, st, note):
    cls = {'已核实': 'ok', '常识': 'ok', '简化': 'warn', '转述': 'warn', '出自文字稿': 'ok', '存疑': 'warn'}[st]
    return f'      <tr><td>{claim}</td><td><span class="badge {cls}">{st}</span></td><td>{note}</td></tr>\n'
M = 'MacTutor 数学史档案“James Clerk Maxwell”传记'
V = 'Victorian Web 麦克斯韦年表'
rows = ''
rows += row('电磁波预言（1865）比实验第一次抓到它（赫兹，1887）早了二十多年', '已核实', '1865 年发表《电磁场的动力学理论》；维基百科“Heinrich Hertz”：赫兹 1886 年秋开始实验，1887 年 11 月起向柏林科学院报告。相差约 22 年。')
rows += row('1831 年生于爱丁堡；同一年法拉第发现电磁感应', '已核实', M + '：1831 年 6 月 13 日生于爱丁堡印度街 14 号。法拉第的铁环实验在 1831 年 8 月 29 日。')
rows += row('在庄园格伦莱尔长大，总问“这东西是怎么动的”', '转述', '坎贝尔与加内特的《麦克斯韦传》（1882）记载，他小时候常问“What\'s the go o\' that?”，得到含糊回答又追问“But what\'s the particular go of it?”。视频为中文意译。' + M + '另记他不到三岁时常说“Show me how it doos”。')
rows += row('8 岁那年母亲病逝', '已核实', V + '：1839 年母亲去世，他 8 岁；《麦克斯韦传》：母亲 1839 年 12 月 6 日去世，生前做过手术。')
rows += row('10 岁进爱丁堡公学，穿乡下衣服、带口音，被叫“傻子”', '已核实', M + '：1841 年起就读爱丁堡公学，被起了绰号“Dafty”；《麦克斯韦传》：他穿着乡下的灰色粗呢上衣和方头鞋，被同学嘲笑。“傻子”是 Dafty 的意译。')
rows += row('14 岁写了画卵形曲线的论文，在爱丁堡皇家学会宣读，由教授代读', '已核实', M + '：1846 年初写成关于卵形曲线的论文，1846 年 4 月 6 日在爱丁堡皇家学会宣读。代读者通常记为詹姆斯·福布斯教授。“线多绕几圈”是对笛卡尔卵形线画法的简化说明。')
rows += row('19 岁去剑桥，毕业考试全年级第二', '已核实', V + '：1850–1854 年在剑桥，数学荣誉考试第二名（Second Wrangler），并与劳斯并列史密斯奖。')
rows += row('彩色陀螺：红绿蓝色片按比例拼合，旋转后混出别的颜色', '简化', M + '：斯托克斯 1857 年来信称赞他的颜色实验和“三种基本颜色感觉”理论。陀螺上的比例和混出的“黄色”是示意；实际旋转混色是按面积比例取平均，混出的颜色会偏暗。')
rows += row('1861 年和一位摄影师拍下世界上第一张彩色照片：格子呢缎带，红绿蓝各拍一张再叠加投影', '已核实', 'Popular Photography（2011）：1861 年 5 月 17 日在皇家研究所的讲座上展示，摄影师是托马斯·萨顿；三张分别透过红、绿、蓝滤镜拍摄，投影时再叠加。当时的底片对红光不够敏感，效果并不完美。')
rows += row('剑桥悬赏题：土星环为什么稳定；实心环、液体环都不行，只能是无数小颗粒', '已核实', 'MacTutor“Maxwell on Saturn\'s rings”：他得出“环必须由互不相连的颗粒组成”。' + M + '：1857 年获亚当斯奖。“撞向土星”是对实心环不稳定的通俗说法。')
rows += row('后来的观测证实了他是对的', '常识', '1895 年基勒用光谱测出环的内圈比外圈转得快，证明是颗粒；后来的旅行者号、卡西尼号近距离拍到了冰块和石块。')
rows += row('25 岁成为阿伯丁的教授，娶了院长的女儿凯瑟琳；学校合并后丢了工作', '已核实', M + '：1856 年 11 月任阿伯丁马里沙尔学院自然哲学教授；与凯瑟琳·玛丽·迪尤尔结婚（她是院长的女儿，婚期各资料记为 1858 或 1859 年）；1860 年两校合并，他作为资历较浅的教授失去职位。')
rows += row('1860 年来到伦敦国王学院', '已核实', M + '：1860 年被任命为国王学院自然哲学教授，1865 年春离开。（国王学院官网写作 1861–1865。）')
rows += row('他把力线写成数学寄给法拉第；65 岁的法拉第回信说“起初几乎吓了一跳”', '已核实', '法拉第书信集第 3260 号：1857 年 3 月 25 日法拉第致麦克斯韦，“I was at first almost frightened…”。论文是《论法拉第的力线》（1855–1856）。')
rows += row('两人在伦敦见面，成了一生的朋友', '已核实', '维基百科“History of Maxwell\'s equations”：在国王学院时期他与法拉第经常来往，成为“life-long friends”。')
rows += row('1861 年的机械模型：旋转的小涡旋，中间夹着小滚珠；滚珠动是电流，涡旋转是磁场', '简化', '维基百科“On Physical Lines of Force”：他用“分子涡旋”的海洋来模拟力线；涡旋之间的“惰轮”粒子代表电，粒子的移动就是电流。画面是示意。')
rows += row('变化的电场也能像电流一样产生磁场（位移电流）', '已核实', '同上条目：位移电流这一项最早出现在 1861 年的这篇论文里，后来成为安培定律的一部分。')
rows += row('算出电磁波速度约每秒 31 万公里；当时测得光速约每秒 31.5 万公里', '已核实', '麦克斯韦 1865 年论文中的数值：由韦伯和科尔劳施的测量算得 310,740,000 米/秒；菲佐测得的光速 314,858,000 米/秒（physics.info 转引原文）。1862 年的论文已得出同样的结论。')
rows += row('他写道：几乎无法回避这个结论——光就是电和磁的波动', '已核实', '1862 年原文：“we can scarcely avoid the inference that light consists in the transverse undulations of the same medium which is the cause of electric and magnetic phenomena.” 视频为中文意译。')
rows += row('1865 年发表《电磁场的动力学理论》，最初二十个方程，后来缩成四个', '已核实', '维基百科“History of Maxwell\'s equations”：1865 年论文第三部分有八组方程，写成分量就是二十个；1884 年前后亥维赛用矢量记号把它们缩成今天的四个。')
rows += row('四个方程各说一件事：电荷发出电场线；磁感线总是闭合；变化的磁场产生电场；电流和变化的电场产生磁场', '简化', '这是四个方程的通俗读法：高斯定律、磁场的高斯定律、法拉第定律、安培–麦克斯韦定律。“线的条数”对应的是通量。')
rows += row('光只是电磁波里眼睛看得见的一小段；更长是红外、微波、无线电，更短是紫外、X 射线、伽马射线', '常识', '电磁波谱：可见光波长约 380–750 纳米。')
rows += row('他算出了气体分子速度的分布；这是物理学最早用上统计规律的成果之一', '简化', '1860 年《气体动力学理论的说明》中给出速度分布；' + M + '：1866 年他用统计方法建立了麦克斯韦–玻尔兹曼气体动理论。“最早之一”是常见评价。')
rows += row('他想象一个小家伙只放快分子过去，好像不费力就违反热力学定律；后来叫“麦克斯韦妖”，争论了一百多年', '已核实', '维基百科“Maxwell\'s demon”：1867 年 12 月 11 日在致泰特的信中首次描述，后写进《热的理论》；“妖”这个名字是开尔文 1874 年起的。今天一般认为：小妖测量、记住并擦除分子信息本身就要付出代价，所以并不违反第二定律。')
rows += row('1865 年辞职回格伦莱尔，写成《电磁通论》；1871 年筹建卡文迪许实验室', '已核实', M + '：1865 年回到格伦莱尔；《电磁通论》1873 年出版；1871 年接受首任卡文迪许物理学教授，实验室 1874 年 6 月 16 日启用。')
rows += row('卡文迪许实验室后来走出了几十位诺贝尔奖得主', '常识', '常见统计为约 30 位诺贝尔奖得主曾在这里工作。')
rows += row('1879 年因和母亲一样的病去世，同样 48 岁；同一年爱因斯坦出生', '已核实', V + '：1879 年死于胃癌，与母亲去世时同岁（48 岁）。' + M + '：1879 年 11 月 5 日在剑桥去世，享年 48 岁。爱因斯坦生于 1879 年 3 月 14 日。')
rows += row('他去世八年后，赫兹用电火花发出电磁波，在房间另一头收到；会反射、会折射', '已核实', '维基百科“Heinrich Hertz”：1886–1889 年在卡尔斯鲁厄的实验产生并探测到电磁波，证实了反射、折射、偏振等性质。')
rows += row('有人问赫兹有什么用，他说“没什么用”', '已核实', '同上：他说这些实验“of no use whatsoever”，只是证明了麦克斯韦是对的。')
rows += row('没过几年出现了无线电报', '常识', '马可尼 1895 年开始无线电报实验，1901 年跨越大西洋。')
rows += row('爱因斯坦：“一个科学时代随麦克斯韦结束，另一个随他开始”', '已核实', '伦敦国王学院官网引用爱因斯坦：“One scientific epoch ended and another began with James Clerk Maxwell.”')
rows += row('费曼：从一万年后回头看，19 世纪最重要的事件会是麦克斯韦发现电动力学定律', '已核实', '《费曼物理学讲义》第二卷第 1 章：“the most significant event of the 19th century will be judged as Maxwell\'s discovery of the laws of electrodynamics.” 他还说，相比之下同一时期的美国南北战争会显得微不足道。')
rows += row('画面里的人物、建筑、实验装置', '简化', '人物都是剪影小人，不是肖像；装置是示意图，比例、细节都不按原物。')
check = f"""    <section>
    <h2 class="sec">内容核对</h2>
    <p class="hint">下面是视频里每个说法的核对结果。“已核实”表示在引用的资料里找到了；“常识”是基础知识；“转述”表示是传记里流传的说法；“简化”表示视频为了好懂做了概括，这里写了更准确的版本。</p>
    <div class="tablewrap"><table><thead><tr><th>说法</th><th>状态</th><th>说明</th></tr></thead><tbody>
{rows}    </tbody></table></div>
  </section>
"""
sound = """  <section>
    <h2 class="sec">声音设计</h2>
    <p class="hint">三首配乐按故事排列：童年和求学用《Entropy》（150 BPM）；从“力线”到“四个方程”用节奏更紧的《The New York Nightfall》（提速约 2.9%，90 BPM）；从“光谱”开始换成《The Awakening》，让它的高潮落在费曼那句评价上。换曲点都在两种拍子共同的强拍上，场景和字幕都落在拍子上。</p>
    <div class="tablewrap"><table><thead><tr><th>层</th><th>做法</th><th>跟画面的对应</th></tr></thead><tbody>
      <tr><td>配乐</td><td>三首曲子按拍子对齐后拼接，交接处 2.4 秒交叉淡化，片尾淡出</td><td>换曲在“力线”章节页和“光谱”一幕</td></tr>
      <tr><td>画面音效</td><td>全部用物理模型合成：粉笔、纸张、钢笔、快门、投影机、开关、电火花、嗡嗡声、旋转、人群、钟声、脚步……</td><td>每一个声音都对准画面上的一个动作</td></tr>
      <tr><td>混音</td><td>音效响起时配乐自动让开几分贝；音效整体是第一版的 80%</td><td>重要的动作听得清，又不吵</td></tr>
    </tbody></table></div>
  </section>
"""
gloss = """  <section>
    <h2 class="sec">名词解释</h2>
    <dl class="gl">
      <dt>麦克斯韦方程组</dt><dd>① ∇·E = ρ/ε₀（电荷是电场线的源头）；② ∇·B = 0（磁感线总是闭合，没有单独的磁极）；③ ∇×E = −∂B/∂t（变化的磁场产生环绕的电场）；④ ∇×B = μ₀J + μ₀ε₀∂E/∂t（电流和变化的电场产生环绕的磁场）。这四条值得直接记住它们各自的“一句话意思”。</dd>
      <dt>位移电流</dt><dd>④ 式里的 ε₀∂E/∂t 一项：没有电荷流动，但电场在变化，它产生磁场的效果和电流一样。这是麦克斯韦加上去的，也是推出电磁波的关键。</dd>
      <dt>电磁波的速度</dt><dd>c = 1/√(μ₀ε₀) ≈ 3.0 × 10⁸ 米/秒。这个公式值得直接记住：两个“静态”的电学、磁学常数，算出的正是光速。</dd>
      <dt>电磁波</dt><dd>电场和磁场互相垂直、又都垂直于传播方向，一起向前传播的波。不需要介质，真空里也能传。</dd>
      <dt>电磁波谱</dt><dd>按波长从长到短：无线电波、微波、红外线、可见光（约 380–750 纳米）、紫外线、X 射线、伽马射线。它们本质相同，只是波长不同。</dd>
      <dt>三原色加色法</dt><dd>红、绿、蓝三种光按不同强度叠加，可以调出眼睛能看到的绝大多数颜色。屏幕的每个像素就是这样工作的。</dd>
      <dt>麦克斯韦速度分布</dt><dd>一定温度下，气体分子速度的分布规律：很慢和很快的都少，中间的多；温度越高，峰越往快的一边移。</dd>
      <dt>麦克斯韦妖</dt><dd>一个想象中的小家伙，只放快分子通过小门，好像不消耗能量就造出了温差。今天的理解：它获取和擦除分子信息本身就要付出代价，所以热力学第二定律依然成立。</dd>
      <dt>卡文迪许实验室</dt><dd>剑桥大学的物理实验室，1874 年启用，麦克斯韦是第一任主任。电子、DNA 双螺旋结构等重要发现都出自这里。</dd>
    </dl>
  </section>
"""
SRC = [
    ('MacTutor：麦克斯韦传记', 'mathshistory.st-andrews.ac.uk · 生平、论文、职位、去世', 'https://mathshistory.st-andrews.ac.uk/Biographies/Maxwell/'),
    ('MacTutor：麦克斯韦论土星环', 'mathshistory.st-andrews.ac.uk · 环由互不相连的颗粒组成', 'https://mathshistory.st-andrews.ac.uk/Extras/Maxwell_Saturn'),
    ('Victorian Web：麦克斯韦年表', 'victorianweb.org · 母亲去世、婚姻、去世年龄', 'https://victorianweb.org/science/maxwell/chron.html'),
    ('坎贝尔与加内特《麦克斯韦传》', 'gutenberg.org · 童年的“What\'s the go o\' that?”', 'https://gutenberg.org/cache/epub/79044/pg79044-images.html'),
    ('Popular Photography：彩色照片 150 年', 'popphoto.com · 1861 年格子呢缎带', 'https://www.popphoto.com/news/2011/05/150-years-ago-first-color-photograph-was-taken'),
    ('维基百科：On Physical Lines of Force', 'en.wikipedia.org · 涡旋模型、位移电流、光的结论', 'https://en.wikipedia.org/wiki/On_Physical_Lines_of_Force'),
    ('维基百科：麦克斯韦方程组的历史', 'en.wikipedia.org · 二十个方程、亥维赛、与法拉第的友谊', 'https://en.wikipedia.org/wiki/History_of_Maxwell%27s_equations'),
    ('physics.info：麦克斯韦原文摘录', 'physics.info · 310,740,000 与 314,858,000 米/秒', 'https://physics.info/em-waves/quote-maxwell.shtml'),
    ('维基百科：麦克斯韦妖', 'en.wikipedia.org · 1867 年致泰特的信', 'https://en.wikipedia.org/wiki/Maxwell%27s_demon'),
    ('维基百科：海因里希·赫兹', 'en.wikipedia.org · 1886–1889 年的实验与“没什么用”', 'https://en.wikipedia.org/wiki/Heinrich_Hertz'),
    ('伦敦国王学院：改变世界的人', 'kcl.ac.uk · 彩色照片与爱因斯坦的评价', 'https://www.kcl.ac.uk/the-man-who-changed-the-world-forever-2'),
    ('费曼物理学讲义第二卷第 1 章', 'johndcook.com 转引 · 19 世纪最重要的事件', 'https://www.johndcook.com/blog/?p=8619'),
]
srcs = ''.join(f'      <li><span class="nm">{n}</span> <span>{d}</span><br><a href="{u}" target="_blank" rel="noopener">{u}</a></li>\n' for n, d, u in SRC)
srcsec = f"""  <section>
    <h2 class="sec">资料来源</h2>
    <ul class="srcs">
{srcs}    </ul>
    <p class="hint" style="margin-top:12px">配乐：《Entropy》、Position Music《The New York Nightfall》、Ivan Torrent《The Awakening》（由你提供）。人物用剪影小人代替，不是肖像。</p>
  </section>
"""
