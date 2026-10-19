# Assemble /home/claude/solid-heat.html from css_base.txt, css_new.txt, the scene markup below, and engine.js
import re, sys
D = '/tmp/claude-0/-home-claude/7d578916-a400-5c24-bb34-8996a1a97376/scratchpad/physics/'
base = open(D + 'css_base.txt', encoding='utf-8').read().split('\n')   # 213 lines of the TSMC head + css
new_css = open(D + 'css_new.txt', encoding='utf-8').read()
engine = open(D + 'engine.js', encoding='utf-8').read()

def lines(a, b):  # 1-based inclusive
    return '\n'.join(base[a - 1:b])

head = '<title>固体比热之谜</title>\n' + lines(2, 3) + '\n<style>\n'
css = lines(5, 59) + '\n' + lines(60, 77) + '\n' + lines(84, 99) + '\n' + lines(171, 212) + '\n' + new_css + '\n</style>\n'
# drop the download-progress row styles that the physics page does not use
css = re.sub(r'\.dlrow[^\n]*\n', '', css)

def chap(start, end, word, en, sub):
    return f'''
        <div class="scene chap" data-start="{start}" data-end="{end}">
          <i class="vline" data-a="0,0.5"></i>
          <div class="flash" data-a="0.35,0.8"></div>
          <div class="parts" data-a="0.35,2.6"></div>
          <div class="wordbox"><span class="word" data-a="0.35,0.4">{word}</span></div>
          <p class="en" data-a="0.9,0.6">{en}</p>
          <p class="csub" data-a="1.2,0.6">{sub}</p>
        </div>
'''

def bar(i, name, mass, val, scale, delay):
    h = round(val * scale, 2)
    return (f'<div class="bc" data-a="{delay},0.9" style="left:{i*10.2}cqw;--h:{h}cqw"><p class="v">{val}</p><i class="b"></i>'
            f'<p class="m">{name}<small>原子量 {mass}</small></p></div>')

bars = '\n          '.join([
    bar(0, '铝', 27, 24.2, 0.76, 6.4), bar(1, '铜', 64, 24.5, 0.76, 7.2), bar(2, '银', 108, 24.9, 0.76, 8.0),
    bar(3, '金', 197, 25.4, 0.76, 8.8), bar(4, '铅', 207, 26.4, 0.76, 9.6)])

S = []
# 0 opening
S.append('''
        <div class="scene s0" data-start="0" data-end="8.161">
          <canvas class="cv" data-draw="d0"></canvas>
          <p class="tag"><b>物理科普</b> · 固体物理</p>
          <h2 class="hero" data-a="0.15,0.9">固体比热之谜</h2>
          <p class="hero-sub" data-a="1.1,0.9">为什么越冷，越“吸不动”热？</p>
        </div>
''')
S.append(chap(8.161, 10.711, '一条定律', 'DULONG–PETIT LAW', '1819 · 杜隆与珀蒂'))
# 2 Dulong-Petit
S.append(f'''
        <div class="scene s1" data-start="10.711" data-end="42.205">
          <canvas class="cv" data-draw="d1"></canvas>
          <p class="tag"><b>第一幕</b> · 杜隆—珀蒂定律</p>
          <p class="yr" style="left:6cqw;top:7.2cqw;font-size:8cqw" data-a="0.3,0.8">1819</p>
          <p class="who" style="left:28.5cqw;top:11cqw" data-a="0.9,0.8">杜隆 · 珀蒂（法国）</p>
          <div class="bars2">
          {bars}
          <div class="ref" data-a="13,1" style="bottom:18.95cqw"></div>
          </div>
          <p class="gl2" style="left:61cqw;top:6.4cqw" data-a="1.2,0.7"><b>比热</b>让 1 摩尔原子升温 1 度，要吸进多少热</p>
          <p class="nt" style="left:61cqw;top:14.2cqw;font-size:1.8cqw;color:var(--dim)" data-a="8.4,0.7">铝 27 → 铅 207：原子量相差约 8 倍</p>
          <p class="bn" style="left:61cqw;top:17.4cqw" data-a="13.3,0.4"><span class="n" data-a="13.3,1.5" data-count="25" data-dec="0">0</span><span class="u">焦耳 /（摩尔·开）</span></p>
          <p class="src">来源：Wikipedia 比热数据表（25 ℃）；Dulong–Petit law；arXiv:1807.02270。</p>
        </div>
''')
S.append(chap(42.205, 44.755, '冷则失灵', 'BREAKDOWN', '越冷，越吸不动热'))
# 4 breakdown
S.append('''
        <div class="scene s2" data-start="44.755" data-end="93.271">
          <canvas class="cv" data-draw="d2"></canvas>
          <p class="tag"><b>第二幕</b> · 冷则失灵</p>
          <p class="bignum" style="left:6cqw;top:7.2cqw"><span class="u">钻石</span><span class="n" data-a="0.4,1.4" data-count="6.1" data-dec="1">0.0</span></p>
          <p class="cap" style="top:20.4cqw;font-size:2cqw;color:var(--dim)" data-a="0.9,0.6">焦耳 /（摩尔·开），室温 25 ℃ 实测</p>
          <p class="chip" style="position:absolute;left:6cqw;top:25.2cqw;font-size:1.9cqw;line-height:1.3" data-a="1.8,0.6"><small>1870 年代</small>韦伯（Weber）</p>
          <p class="chip" style="position:absolute;left:6cqw;top:29.9cqw;font-size:1.9cqw;line-height:1.3" data-a="3.4,0.6">不到 25 的四分之一</p>
          <p class="nt" style="left:6cqw;top:35.6cqw;font-size:2.3cqw;line-height:1.3" data-a="31.85,0.7">经典物理预测 <em>25</em><br>自然给出 <i>→ 0</i></p>
          <p class="src">来源：NIST WebBook；Wikipedia “Heinrich Friedrich Weber”（年份各文献略有出入）。曲线为德拜模型计算，示意。</p>
        </div>
''')
S.append(chap(93.271, 95.821, '量子台阶', 'QUANTUM STAIRS', '爱因斯坦 · 1907'))
# 6 Einstein
S.append('''
        <div class="scene s3" data-start="95.821" data-end="123.06">
          <canvas class="cv" data-draw="d3"></canvas>
          <p class="tag"><b>第三幕</b> · 爱因斯坦的台阶</p>
          <p class="yr" style="left:6cqw;top:6.4cqw;font-size:6.2cqw" data-a="0.2,0.8">1907</p>
          <p class="who" style="left:25cqw;top:9.2cqw" data-a="0.8,0.8">爱因斯坦</p>
          <p class="src">来源：Einstein, Ann. Phys. 22 (1907)；Europhysics News 2011；arXiv:1109.3785。图为示意。</p>
        </div>
''')
S.append(chap(123.06, 125.61, '声波模型', 'DEBYE MODEL', '德拜 · 1912'))
# 8 Debye
S.append('''
        <div class="scene s4" data-start="125.61" data-end="157.104">
          <canvas class="cv" data-draw="d4"></canvas>
          <p class="tag"><b>第四幕</b> · 德拜的声波</p>
          <p class="yr" style="left:6cqw;top:6.4cqw;font-size:6.2cqw" data-a="12.4,0.8">1912</p>
          <p class="who" style="left:25cqw;top:9.2cqw" data-a="12.9,0.8">德拜</p>
          <p class="src">来源：Debye, Ann. Phys. 344 (1912)；Wikipedia “Debye model”；arXiv:1904.11696。曲线为模型计算，示意。</p>
        </div>
''')
S.append(chap(157.104, 159.654, '冷的用处', 'WHY IT MATTERS', '越冷，越灵敏'))
# 10 Planck
S.append('''
        <div class="scene s5" data-start="159.654" data-end="190">
          <canvas class="cv" data-draw="d5"></canvas>
          <p class="tag"><b>应用 ①</b> · 极灵敏的温度计</p>
          <h2 class="hd" data-a="0.3,0.7">比热越小，<em>越灵敏</em></h2>
          <div class="card" style="left:54cqw;top:7cqw;width:40cqw" data-a="21.4,0.7">
            <p class="k">PLANCK · 欧洲航天局</p>
            <p class="t">普朗克卫星</p>
            <p class="d">54 个探测器，工作在 <b>0.1 K</b></p>
            <p class="d">接收 <b>100–857 GHz</b> 的宇宙微波</p>
          </div>
          <p class="src">来源：Planck HFI（planck.ipac.caltech.edu）；Northwestern 超导温度计页面。桶与微波背景图均为示意。</p>
        </div>
''')
# 11 SuperCDMS
S.append('''
        <div class="scene s6" data-start="190" data-end="220.937">
          <canvas class="cv" data-draw="d6"></canvas>
          <p class="tag"><b>应用 ②</b> · 捕捉暗物质</p>
          <h2 class="hd" data-a="0.3,0.7">冷到几乎<em>没有杂音</em></h2>
          <div class="card" style="left:6cqw;top:14cqw;width:38cqw" data-a="7,0.7">
            <p class="k">SuperCDMS · 地下实验室</p>
            <p class="t">锗晶体</p>
            <p class="d">冷到约 <b>0.04 K</b>（零下 273.11 ℃）</p>
            <p class="d">超导温度计读出晶体里的声波</p>
          </div>
          <p class="nt" style="left:6cqw;top:35.6cqw;font-size:1.75cqw;color:var(--dim);width:38cqw" data-a="24,0.7">同类温度计还能数 X 射线光子，能量分辨率可达约 1.4 电子伏。</p>
          <p class="src">来源：SuperCDMS（cdms.phy.queensu.ca）；Northwestern 超导温度计页面。实验尚未探测到暗物质；图为示意。</p>
        </div>
''')
S.append(chap(220.937, 223.487, '白矮星', 'WHITE DWARF', '天上的时钟'))
# 13 white dwarf
S.append('''
        <div class="scene s7" data-start="223.487" data-end="270">
          <canvas class="cv" data-draw="d7"></canvas>
          <p class="tag"><b>应用 ③</b> · 宇宙的时钟</p>
          <h2 class="hd" data-a="0.3,0.7">白矮星：<em>会结晶的星</em></h2>
          <p class="src">来源：arXiv:1212.0806（结晶与德拜冷却）；arXiv:1908.00370（盖亚数据）。图为示意。</p>
        </div>
''')
# 14 recap
S.append('''
        <div class="scene s14" data-start="270" data-end="282">
          <p class="tag"><b>回头看</b></p>
          <h2 class="hd" data-a="0.2,0.7">一条定律，一个反常，<em>一个新物理</em></h2>
          <div class="tl"><i data-a="0.5,8.5"></i></div>
          <div class="dot2" style="left:10%" data-a="0.6,0.5"></div>
          <div class="dot2" style="left:30%" data-a="2.4,0.5"></div>
          <div class="dot2" style="left:50%" data-a="4.2,0.5"></div>
          <div class="dot2" style="left:70%" data-a="6,0.5"></div>
          <div class="dot2" style="left:90%" data-a="8,0.5"></div>
          <div class="node" style="left:10%" data-a="0.6,0.7"><p class="y">1819</p><p class="h">杜隆 & 珀蒂</p><p class="d">定律：约 25</p></div>
          <div class="node dn" style="left:30%" data-a="2.4,0.7"><p class="y">1870s</p><p class="h">钻石的反常</p><p class="d">室温只有约 6</p></div>
          <div class="node" style="left:50%" data-a="4.2,0.7"><p class="y">1907</p><p class="h">爱因斯坦</p><p class="d">量子台阶</p></div>
          <div class="node dn" style="left:70%" data-a="6,0.7"><p class="y">1912</p><p class="h">德拜</p><p class="d">声波 · T³</p></div>
          <div class="node" style="left:90%" data-a="8,0.7"><p class="y">今天</p><p class="h">温度计与星</p><p class="d">宇宙 · 暗物质 · 白矮星</p></div>
        </div>
''')
# 15 sources
SRC = [
    ('杜隆—珀蒂定律', 'en.wikipedia.org/wiki/Dulong–Petit_law'),
    ('比热数据表（25 ℃）', 'en.wikipedia.org/wiki/Table_of_specific_heat_capacities'),
    ('金刚石比热（NIST）', 'webbook.nist.gov/cgi/cbook.cgi?ID=C7782403'),
    ('1819 年的实验（arXiv）', 'arxiv.org/abs/1807.02270'),
    ('索尔维会议与能斯特数据', 'arxiv.org/abs/1109.3785'),
    ('能斯特的低温测量', 'europhysicsnews.org/articles/epn/pdf/2011/05/epn2011425p15.pdf'),
    ('德拜模型', 'en.wikipedia.org/wiki/Debye_model'),
    ('热力学第三定律简史', 'arxiv.org/abs/1904.11696'),
    ('普朗克卫星 HFI', 'planck.ipac.caltech.edu/page/high_frequency_instrument'),
    ('超导温度计', 'figueroa.physics.northwestern.edu/research/tes.html'),
    ('SuperCDMS 暗物质实验', 'cdms.phy.queensu.ca/Public_Docs/SuperCDMS.html'),
    ('白矮星结晶与冷却', 'arxiv.org/abs/1212.0806'),
    ('盖亚数据中的结晶堆积', 'arxiv.org/abs/1908.00370'),
    ('韦伯（Weber）', 'en.wikipedia.org/wiki/Heinrich_Friedrich_Weber'),
]
li = '\n            '.join(f'<li data-a="{0.25 + 0.16 * i:.2f},0.5"><b>{n}</b><span>{u}</span></li>' for i, (n, u) in enumerate(SRC))
S.append(f'''
        <div class="scene s15" data-start="282" data-end="300">
          <p class="tag"><b>资料来源</b> · SOURCES</p>
          <ul class="srclist">
            {li}
          </ul>
          <p class="foot" data-a="2.8,0.6">科普整理 · 个别年份各文献略有出入，取稳妥说法 · 数据截至 2026-10-14</p>
        </div>
''')
scenes_html = ''.join(S)

# ---- page body ----
body = f'''
<main class="wrap">
  <header class="top">
    <p class="eyebrow">物理科普 · 固体物理 · 约 5 分钟</p>
    <h1>固体比热之谜</h1>
    <p class="meta">横屏 16:9，约 5 分钟，无配音，含固定背景音乐和合成音效（点播放后出声）。六个专场页的“咚”落在音乐的小节强拍上。字幕稿、史实核对、卡点表、名词解释和资料来源在下方。</p>
  </header>

  <section aria-label="视频播放器">
    <div class="stagewrap" id="stagewrap" tabindex="0">
      <div class="frame" id="frame">
{scenes_html}
        <div class="sub" id="sub" aria-live="off"></div>
        <button class="bigplay" id="bigplay" type="button">▶ 播放</button>
      </div>

      <div class="ctrl">
        <button class="btn" id="pp" type="button">播放</button>
        <div class="scrub">
          <input id="seek" type="range" min="0" max="300" step="0.1" value="0" aria-label="播放进度">
          <div class="ticks" id="ticks" aria-hidden="true"></div>
        </div>
        <span class="time" id="time">0:00 / 5:00</span>
        <button class="btn" id="snd" type="button" aria-pressed="true">音效 开</button>
        <button class="btn" id="mus" type="button" aria-pressed="true">音乐 开</button>
        <label class="vol"><span>音乐音量</span><input id="mvol" type="range" min="0" max="100" value="60" aria-label="音乐音量"></label>
        <span class="time" id="mstat" aria-live="polite"></span>
        <button class="btn" id="fs" type="button">全屏</button>
      </div>
    </div>
  </section>

  <section>
    <h2 class="sec">字幕稿</h2>
    <p class="hint">时间码对应画面字幕，可直接交给配音或 TTS。画面内的来源小字不需要念出。</p>
    <div class="tablewrap"><table><thead><tr><th>时间</th><th>字幕</th></tr></thead><tbody id="scriptbody"></tbody></table></div>
  </section>

  <section>
    <h2 class="sec">史实核对</h2>
    <p class="hint">下面是视频里每个说法的核对结果。“已核实”表示能在列出的来源里找到；“存疑”表示不同来源说法不一，视频里取了更稳妥的说法。</p>
    <div class="tablewrap"><table><thead><tr><th>说法</th><th>状态</th><th>说明</th></tr></thead><tbody>
      <tr><td>1819 年，杜隆和珀蒂发现多数固体每摩尔比热约 25 J/(mol·K)</td><td><span class="badge ok">已核实</span></td><td>实验在 1819 年发表；定律名字的先后顺序其实是“珀蒂—杜隆”（珀蒂为第一作者），习惯写成“杜隆—珀蒂”。实验用的是冷却法，不是直接加热测量。</td></tr>
      <tr><td>各元素比热：铝 24.2、铜 24.5、银 24.9、金 25.4、铅 26.4</td><td><span class="badge ok">已核实</span></td><td>来自 Wikipedia 比热数据表（25 ℃）。</td></tr>
      <tr><td>钻石室温只有约 6.1</td><td><span class="badge ok">已核实</span></td><td>NIST：298.15 K 时 6.117 J/(mol·K)。</td></tr>
      <tr><td>韦伯在 1870 年代发现钻石的反常</td><td><span class="badge warn">存疑</span></td><td>各来源写 1872、1874、1875、1876 都有，视频只说“1870 年代”。</td></tr>
      <tr><td>玻尔兹曼用能量均分解释了定律</td><td><span class="badge warn">存疑</span></td><td>年份有 1871 与 1877 两种说法，视频只说“五十多年后”。</td></tr>
      <tr><td>20 世纪初的低温实验显示所有固体比热在低温都下降</td><td><span class="badge ok">已核实</span></td><td>能斯特 1909 年起系统测量，1910 年的结果与爱因斯坦的预言“定性相符”。杜瓦 1905 年的测量只有单一来源，视频未采用。</td></tr>
      <tr><td>爱因斯坦 1907 年用量子假设解释了低温比热下降</td><td><span class="badge ok">已核实</span></td><td>Ann. Phys. 22, 180–190 (1907)。</td></tr>
      <tr><td>能斯特的数据完全证实了爱因斯坦</td><td><span class="badge warn">已更正</span></td><td>实际是“大体吻合，但低温处有系统偏差”：爱因斯坦的曲线下降得太快。视频按这个说法讲。</td></tr>
      <tr><td>德拜 1912 年用声波和 3N 个模式的截断，得到低温 T³ 和高温 25</td><td><span class="badge ok">已核实</span></td><td>Ann. Phys. 344, 789–839 (1912)。玻恩与冯·卡门随后（1912–1913）用真实晶格给出更完整的处理。</td></tr>
      <tr><td>T³ 被实验精确证实</td><td><span class="badge warn">未核实</span></td><td>没能取得可读的原始来源，视频只说这是德拜模型的预言，没有说“某年被证实”。</td></tr>
      <tr><td>普朗克卫星探测器工作在 0.1 K，共 54 个</td><td><span class="badge ok">已核实</span></td><td>Planck HFI 页面：54 个探测器，100–857 GHz。</td></tr>
      <tr><td>SuperCDMS 把锗晶体冷到约 40 mK，用超导温度计读出声子</td><td><span class="badge ok">已核实</span></td><td>实验尚未探测到暗物质。</td></tr>
      <tr><td>白矮星结晶、德拜冷却、盖亚数据中的“堆积”约延迟 10 亿年</td><td><span class="badge ok">已核实</span></td><td>Tremblay 等 2019；“冷得更快”是德拜区比热下降的结果，来源未给出具体指数。</td></tr>
      <tr><td>钻石的德拜温度</td><td><span class="badge warn">存疑</span></td><td>来源给出 1860 K 与 2230 K 两个值；示意曲线用 1860 K，它与 NIST 的 6.1 吻合。</td></tr>
    </tbody></table></div>
  </section>

  <section>
    <h2 class="sec">音乐卡点</h2>
    <p class="hint">背景音乐是固定的 112.8 拍每分钟，每小节约 2.13 秒。这支曲子可用的部分只有约 2 分 40 秒，5 分钟的视频把整齐的段落按小节接起来：开头铺垫 4 小节，之后顺着原曲走到第 77 小节，再把“正式律动段”重复两次，中间插入一段安静的低谷。所有拼接点都落在专场页的“咚”上，听不到接缝。</p>
    <div class="tablewrap"><table><thead><tr><th>专场页</th><th>“咚”的时间</th><th>音乐位置</th></tr></thead><tbody>
      <tr><td>一条定律</td><td class="t">0:08.5</td><td>原曲第 9 小节，鼓组进入</td></tr>
      <tr><td>冷则失灵</td><td class="t">0:42.6</td><td>原曲第 25 小节</td></tr>
      <tr><td>量子台阶</td><td class="t">1:33.6</td><td>原曲第 49 小节：低谷段结束，鼓组重新炸开</td></tr>
      <tr><td>声波模型</td><td class="t">2:03.4</td><td>原曲第 63 小节</td></tr>
      <tr><td>冷的用处</td><td class="t">2:37.5</td><td>接缝：回到第 49 小节，律动段再来一遍</td></tr>
      <tr><td>白矮星</td><td class="t">3:41.3</td><td>接缝：回到低谷段（第 41 小节）；3:58.3 鼓组第三次炸开</td></tr>
    </tbody></table></div>
  </section>

  <section>
    <h2 class="sec">名词解释</h2>
    <dl class="gl">
      <dt>比热</dt><dd>物质升温 1 度要吸进多少热。吸得多，就是比热大。视频里说的是“每摩尔”比热：同样数量（约 6×10²³ 个）的原子，升温 1 度吸多少热。</dd>
      <dt>摩尔</dt><dd>一堆原子的计数单位，1 摩尔约 6×10²³ 个，就像“一打”是 12 个。</dd>
      <dt>开尔文（K）</dt><dd>绝对温标。0 K 是绝对零度，约零下 273.15 ℃；0.1 K 就是零下 273.05 ℃。</dd>
      <dt>量子</dt><dd>能量不是想要多少就多少，而是一份一份的，像台阶，只能停在整数级上。</dd>
      <dt>声波 / 声子</dt><dd>固体里原子的集体抖动会以波的形式传播，就是声波；它的一份能量叫声子。</dd>
      <dt>T³</dt><dd>温度的三次方。温度减半，比热变成原来的八分之一。</dd>
      <dt>超导温度计</dt><dd>在超导状态边缘工作的温度计，温度变一点点，电阻就变很多，能读出极微弱的热信号。</dd>
      <dt>暗物质</dt><dd>看不见、不发光，但从引力效应推断存在的物质，占宇宙物质的大部分。</dd>
      <dt>宇宙微波背景</dt><dd>宇宙大爆炸后留下的微波，可以看作宇宙的“婴儿照”。</dd>
      <dt>白矮星</dt><dd>类似太阳的恒星燃料耗尽后留下的致密残骸，只靠散热慢慢变冷。</dd>
    </dl>
  </section>

  <section>
    <h2 class="sec">资料来源</h2>
    <ul class="srcs">
      <li><span class="nm">杜隆—珀蒂定律</span> <span>定律数值、钻石与铍的例外</span><br><a href="https://en.wikipedia.org/wiki/Dulong%E2%80%93Petit_law" target="_blank" rel="noopener">https://en.wikipedia.org/wiki/Dulong%E2%80%93Petit_law</a></li>
      <li><span class="nm">Table of specific heat capacities</span> <span>铝、铜、银、金、铅、铁、钻石的摩尔比热</span><br><a href="https://en.wikipedia.org/wiki/Table_of_specific_heat_capacities" target="_blank" rel="noopener">https://en.wikipedia.org/wiki/Table_of_specific_heat_capacities</a></li>
      <li><span class="nm">NIST WebBook：金刚石</span> <span>298.15 K 比热 6.117</span><br><a href="https://webbook.nist.gov/cgi/cbook.cgi?ID=C7782403&amp;Units=SI&amp;Mask=2" target="_blank" rel="noopener">https://webbook.nist.gov/cgi/cbook.cgi?ID=C7782403&amp;Units=SI&amp;Mask=2</a></li>
      <li><span class="nm">Petit 与 Dulong 的 1819 年工作（arXiv）</span> <span>实验日期与方法</span><br><a href="https://arxiv.org/pdf/1807.02270" target="_blank" rel="noopener">https://arxiv.org/pdf/1807.02270</a></li>
      <li><span class="nm">Heinrich Friedrich Weber</span> <span>钻石比热的反常</span><br><a href="https://en.wikipedia.org/wiki/Heinrich_Friedrich_Weber" target="_blank" rel="noopener">https://en.wikipedia.org/wiki/Heinrich_Friedrich_Weber</a></li>
      <li><span class="nm">1911 年索尔维会议与能斯特数据（arXiv）</span> <span>爱因斯坦曲线与数据的系统偏差</span><br><a href="https://arxiv.org/pdf/1109.3785" target="_blank" rel="noopener">https://arxiv.org/pdf/1109.3785</a></li>
      <li><span class="nm">Europhysics News 2011</span> <span>能斯特热定理、1909–1910 年的测量</span><br><a href="https://www.europhysicsnews.org/articles/epn/pdf/2011/05/epn2011425p15.pdf" target="_blank" rel="noopener">https://www.europhysicsnews.org/articles/epn/pdf/2011/05/epn2011425p15.pdf</a></li>
      <li><span class="nm">Einstein solid</span> <span>爱因斯坦模型</span><br><a href="https://en.wikipedia.org/wiki/Einstein_solid" target="_blank" rel="noopener">https://en.wikipedia.org/wiki/Einstein_solid</a></li>
      <li><span class="nm">Debye model</span> <span>德拜 1912，3N 个模式截断，T³ 定律</span><br><a href="https://en.wikipedia.org/wiki/Debye_model" target="_blank" rel="noopener">https://en.wikipedia.org/wiki/Debye_model</a></li>
      <li><span class="nm">热力学第三定律简史（arXiv）</span> <span>爱因斯坦公式下降过快、能斯特—林德曼、德拜 T³</span><br><a href="https://arxiv.org/pdf/1904.11696" target="_blank" rel="noopener">https://arxiv.org/pdf/1904.11696</a></li>
      <li><span class="nm">Planck HFI</span> <span>54 个探测器，0.1 K，100–857 GHz</span><br><a href="https://planck.ipac.caltech.edu/page/high_frequency_instrument" target="_blank" rel="noopener">https://planck.ipac.caltech.edu/page/high_frequency_instrument</a></li>
      <li><span class="nm">Northwestern：超导温度计</span> <span>约 100 mK、比热小、X 射线分辨率约 1.4 eV</span><br><a href="https://figueroa.physics.northwestern.edu/research/tes.html" target="_blank" rel="noopener">https://figueroa.physics.northwestern.edu/research/tes.html</a></li>
      <li><span class="nm">SuperCDMS</span> <span>锗晶体，约 40 mK，超导温度计读出声子</span><br><a href="https://cdms.phy.queensu.ca/Public_Docs/SuperCDMS.html" target="_blank" rel="noopener">https://cdms.phy.queensu.ca/Public_Docs/SuperCDMS.html</a></li>
      <li><span class="nm">白矮星结晶与宇宙年代学（arXiv）</span> <span>结晶、德拜区冷却</span><br><a href="https://arxiv.org/pdf/1212.0806" target="_blank" rel="noopener">https://arxiv.org/pdf/1212.0806</a></li>
      <li><span class="nm">Tremblay 等 2019（arXiv）</span> <span>盖亚数据中的结晶“堆积”，约 10 亿年的冷却延迟</span><br><a href="https://arxiv.org/pdf/1908.00370" target="_blank" rel="noopener">https://arxiv.org/pdf/1908.00370</a></li>
      <li><span class="nm">LibreTexts：固体的热容</span> <span>钻石德拜温度 1860 K</span><br><a href="https://phys.libretexts.org/Bookshelves/Thermodynamics_and_Statistical_Mechanics/Heat_and_Thermodynamics_(Tatum)/08:_Heat_Capacity_and_the_Expansion_of_Gases/8.10:_Heat_Capacities_of_Solids" target="_blank" rel="noopener">https://phys.libretexts.org/…/8.10:_Heat_Capacities_of_Solids</a></li>
    </ul>
    <p class="hint" style="margin-top:12px">图都是示意：铅与钻石的曲线按德拜模型计算（德拜温度取 105 K 和 1860 K），爱因斯坦与德拜两条曲线按各自公式计算，宇宙微波背景图和白矮星图是手绘风格的示意，不是真实观测数据。</p>
  </section>
</main>
'''

page = head + css + body + '\n<script id="musicdata" type="application/octet-stream">@@MUSIC@@</script>\n<script>\n' + engine + '\n</script>\n'
open('/home/claude/solid-heat.html', 'w', encoding='utf-8').write(page)
print('built', len(page))
