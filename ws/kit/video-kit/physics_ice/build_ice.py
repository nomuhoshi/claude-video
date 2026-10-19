# Assemble /home/claude/solid-heat.html from css_base.txt, css_new.txt, the scene markup below, and engine.js
import re, sys
D = '/tmp/claude-0/-home-claude/7d578916-a400-5c24-bb34-8996a1a97376/scratchpad/ice/'
base = open(D + 'css_base.txt', encoding='utf-8').read().split('\n')   # 213 lines of the TSMC head + css
new_css = open(D + 'css_new.txt', encoding='utf-8').read()
engine = open(D + 'engine.js', encoding='utf-8').read()

def lines(a, b):  # 1-based inclusive
    return '\n'.join(base[a - 1:b])

head = '<title>冰下的幽灵</title>\n' + lines(2, 3) + '\n<style>\n'
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


S = []
S.append('''
        <div class="scene s0" data-start="0" data-end="8.161">
          <canvas class="cv" data-draw="d0"></canvas>
          <p class="tag"><b>物理科普</b> · 2026 诺贝尔物理学奖</p>
          <h2 class="hero" data-a="0.15,0.9">冰下的幽灵</h2>
          <p class="hero-sub" data-a="1.1,0.9">南极冰层里，藏着一座“望远镜”</p>
        </div>
''')
S.append(chap(8.161, 10.711, '幽灵粒子', 'NEUTRINO', '几乎不和任何东西作用'))
S.append('''
        <div class="scene s1" data-start="10.711" data-end="42.205">
          <canvas class="cv" data-draw="d1"></canvas>
          <p class="tag"><b>第一幕</b> · 中微子</p>
          <p class="hd" style="left:6cqw;top:7.2cqw" data-a="14.2,0.7">三种信使，<em>只有一种不拐弯</em></p>
          <p class="src">来源：IceCube 合作组公开资料。图为示意。</p>
        </div>
''')
S.append(chap(42.205, 44.755, '冰下探测器', 'ICE AS A DETECTOR', '1988 · 哈尔岑的主意'))
S.append('''
        <div class="scene s2" data-start="44.755" data-end="93.271">
          <canvas class="cv" data-draw="d2"></canvas>
          <p class="tag"><b>第二幕</b> · 把冰变成探测器</p>
          <p class="yr" style="left:6cqw;top:6.4cqw;font-size:6.2cqw" data-a="0.3,0.8">1988</p>
          <p class="who" style="left:25cqw;top:9.2cqw" data-a="0.9,0.8">哈尔岑 · 威斯康星大学</p>
          <p class="bn m" style="left:52cqw;top:4.6cqw" data-a="31.2,0.4"><span class="n" data-a="31.2,1.5" data-count="86" data-dec="0">0</span><span class="u">根缆绳</span></p>
          <p class="bn m" style="left:67cqw;top:4.6cqw" data-a="31.2,0.4"><span class="n" data-a="31.2,1.5" data-count="5160" data-dec="0">0</span><span class="u">个光学传感器</span></p>
          <p class="bn m" style="left:84cqw;top:4.6cqw" data-a="31.2,0.4"><span class="n" data-a="31.2,1.5" data-count="1" data-dec="0">0</span><span class="u">立方公里</span></p>
          <p class="src">来源：IceCube 合作组 arXiv:1111.5188；诺贝尔奖官网与 NPR 报道。图为示意，探测器细节做了简化。</p>
        </div>
''')
S.append(chap(93.271, 95.821, '第一批证据', 'FIRST EVIDENCE', '2013 · Bert 和 Ernie'))
S.append('''
        <div class="scene s3" data-start="95.821" data-end="123.06">
          <canvas class="cv" data-draw="d3"></canvas>
          <p class="tag"><b>第三幕</b> · 来自太阳系之外</p>
          <p class="yr" style="left:6cqw;top:6.4cqw;font-size:6.2cqw" data-a="0.2,0.8">2013</p>
          <p class="who" style="left:25cqw;top:9.2cqw" data-a="0.8,0.8">《科学》杂志</p>
          <p class="bn" style="left:6cqw;top:19cqw" data-a="6.4,0.4"><span class="n" data-a="6.4,1.4" data-count="28" data-dec="0">0</span><span class="u">个极高能事件</span></p>
          <p class="src">来源：Science 342 (2013) 1242856；sci.news 报道。天空位置为示意，不是真实坐标。</p>
        </div>
''')
S.append(chap(123.06, 125.61, '第一个源头', 'FIRST SOURCE', '2017 · TXS 0506+056'))
S.append('''
        <div class="scene s4" data-start="125.61" data-end="157.104">
          <canvas class="cv" data-draw="d4"></canvas>
          <p class="tag"><b>第四幕</b> · 一次警报</p>
          <p class="yr" style="left:6cqw;top:6.4cqw;font-size:6.2cqw" data-a="0.2,0.8">2017</p>
          <p class="who" style="left:25cqw;top:9.2cqw" data-a="0.8,0.8">9 月 22 日</p>
          <p class="bn c" style="left:6cqw;top:18cqw" data-a="0.9,0.4"><span class="n" data-a="0.9,1.4" data-count="300" data-dec="0">0</span><span class="u">TeV · 约 300 万亿电子伏</span></p>
          <div class="card" style="left:54cqw;top:5.6cqw;width:38cqw" data-a="14.3,0.7">
            <p class="k">FERMI · 伽马射线</p>
            <p class="t">十年来最强的耀发</p>
            <p class="d">位置与中微子相差 <b>不到 0.06°</b></p>
          </div>
          <p class="nt" style="left:6cqw;top:36cqw;font-size:1.9cqw;color:var(--dim)" data-a="28,0.7">成果 2018 年 7 月发表</p>
          <p class="src">来源：IceCube 2018 年数据发布；arXiv:1807.08816。图为示意。</p>
        </div>
''')
S.append(chap(157.104, 159.654, '新的星图', 'A NEW MAP', '2022 — 2023'))
S.append('''
        <div class="scene s5" data-start="159.654" data-end="190">
          <canvas class="cv" data-draw="d5"></canvas>
          <p class="tag"><b>第五幕</b> · 一个被包住的源头</p>
          <p class="yr" style="left:6cqw;top:6.4cqw;font-size:6.2cqw" data-a="0.4,0.8">2022</p>
          <p class="who" style="left:25cqw;top:9.2cqw" data-a="1,0.8">NGC 1068 · 约 4700 万光年</p>
          <p class="bn c" style="left:64cqw;top:6.4cqw" data-a="7.5,0.4"><span class="n" data-a="7.5,1.4" data-count="4.2" data-dec="1">0.0</span><span class="u">σ · 证据，还不算发现</span></p>
          <p class="src">来源：arXiv:2211.09972（Science 2022）；Queen's 大学新闻稿。“源头被物质包住”是研究者的解读。图为示意。</p>
        </div>
''')
S.append('''
        <div class="scene s6" data-start="190" data-end="220.937">
          <canvas class="cv" data-draw="d6"></canvas>
          <p class="tag"><b>第六幕</b> · 看见银河系</p>
          <p class="yr" style="left:6cqw;top:6.4cqw;font-size:6.2cqw" data-a="0.3,0.8">2023</p>
          <p class="who" style="left:25cqw;top:9.2cqw" data-a="0.9,0.8">银河系</p>
          <p class="bn c" style="left:74cqw;top:3.4cqw" data-a="15.5,0.4"><span class="n" style="font-size:7cqw" data-a="15.5,1.4" data-count="4.5" data-dec="1">0.0</span><span class="u">σ · 银河系平面</span></p>
          <p class="src">来源：arXiv:2307.04427（Science 380, 2023）。星图为示意，不是真实数据。</p>
        </div>
''')
S.append(chap(220.937, 223.487, '还在继续', 'WHAT NEXT', '2026 · 诺贝尔奖与未来'))
S.append('''
        <div class="scene s7" data-start="223.487" data-end="270">
          <canvas class="cv" data-draw="d7"></canvas>
          <p class="tag"><b>终幕</b> · 奖与未来</p>
          <div class="card" style="left:6cqw;top:7cqw;width:42cqw" data-a="0.33,0.7">
            <p class="k">NOBEL PRIZE · 物理学</p>
            <p class="t">弗朗西斯·哈尔岑</p>
            <p class="d">“对 IceCube 中微子天文台的决定性贡献”</p>
            <p class="d">2026 年 10 月 6 日公布</p>
          </div>
          <p class="bn m" style="left:6cqw;top:30cqw" data-a="16.5,0.4"><span class="n" data-a="16.5,1.5" data-count="450" data-dec="0">0</span><span class="u">位科学家</span></p>
          <p class="bn m" style="left:21cqw;top:30cqw" data-a="16.5,0.4"><span class="n" data-a="16.5,1.5" data-count="58" data-dec="0">0</span><span class="u">家机构</span></p>
          <p class="bn m" style="left:35cqw;top:30cqw" data-a="16.5,0.4"><span class="n" data-a="16.5,1.5" data-count="14" data-dec="0">0</span><span class="u">个国家</span></p>
          <p class="src">来源：诺贝尔奖官网；IceCube 合作组；Sky &amp; Telescope、NPR 等报道。奖项引文为中文意译，规模为约数。</p>
        </div>
''')
S.append('''
        <div class="scene s14" data-start="270" data-end="282">
          <p class="tag"><b>回头看</b></p>
          <h2 class="hd" data-a="0.2,0.7">一个想法，三十多年，<em>一扇新的窗</em></h2>
          <div class="tl"><i data-a="0.5,8.5"></i></div>
          <div class="dot2" style="left:10%" data-a="0.6,0.5"></div>
          <div class="dot2" style="left:30%" data-a="2.4,0.5"></div>
          <div class="dot2" style="left:50%" data-a="4.2,0.5"></div>
          <div class="dot2" style="left:70%" data-a="6,0.5"></div>
          <div class="dot2" style="left:90%" data-a="8,0.5"></div>
          <div class="node" style="left:10%" data-a="0.6,0.7"><p class="y">1988</p><p class="h">哈尔岑的想法</p><p class="d">拿冰当探测器</p></div>
          <div class="node dn" style="left:30%" data-a="2.4,0.7"><p class="y">2010</p><p class="h">IceCube 建成</p><p class="d">86 根缆绳</p></div>
          <div class="node" style="left:50%" data-a="4.2,0.7"><p class="y">2013</p><p class="h">第一批证据</p><p class="d">28 个事件</p></div>
          <div class="node dn" style="left:70%" data-a="6,0.7"><p class="y">2017</p><p class="h">第一个源头</p><p class="d">TXS 0506+056</p></div>
          <div class="node" style="left:90%" data-a="8,0.7"><p class="y">2022–23</p><p class="h">星系与银河系</p><p class="d">NGC 1068 · 银河系平面</p></div>
        </div>
''')
SRC = [
    ('诺贝尔物理学奖 2026 新闻稿', 'nobelprize.org/prizes/physics/2026/press-release'),
    ('NPR：哈尔岑获奖报道', 'opb.org/article/2026/10/06/francis-halzen-wins-nobel-prize-in-physics-for-work-on-high-energy-neutrinos'),
    ('IceCube 探测器（arXiv）', 'arxiv.org/abs/1111.5188'),
    ('2013 年 Science 论文发布', 'www2.wipac.wisc.edu/node/289'),
    ('2013 年报道（sci.news）', 'sci.news/physics/science-icecube-neutrinos-outside-solar-system-01566.html'),
    ('2017–18 年 TXS 0506+056 数据', 'icecube.wisc.edu/data-releases/2018/07/icecube-data-from-2008-to-2017-related-to-analysis-of-txs-0506056'),
    ('多信使观测论文（arXiv）', 'arxiv.org/abs/1807.08816'),
    ('NGC 1068 论文（arXiv）', 'arxiv.org/abs/2211.09972'),
    ('银河系平面论文（arXiv）', 'arxiv.org/abs/2307.04427'),
    ('Queen’s 大学：NGC 1068 解读', 'queensu.ca/physics/lemma/icecube-reports-evidence-neutrino-emission-ngc1068'),
]
li = '\n            '.join(f'<li data-a="{0.25 + 0.16 * i:.2f},0.5"><b>{n}</b><span>{u}</span></li>' for i, (n, u) in enumerate(SRC))
S.append(f'''
        <div class="scene s15" data-start="282" data-end="300">
          <p class="tag"><b>资料来源</b> · SOURCES</p>
          <ul class="srclist">
            {li}
          </ul>
          <p class="foot" data-a="2.8,0.6">科普整理 · 个别细节各来源略有出入，取稳妥说法 · 数据截至 2026-10-15</p>
        </div>
''')
scenes_html = ''.join(S)

# ---- page body ----
body = f'''
<main class="wrap">
  <header class="top">
    <p class="eyebrow">物理科普 · 2026 诺贝尔物理学奖 · 约 5 分钟</p>
    <h1>冰下的幽灵</h1>
    <p class="meta">横屏 16:9，约 5 分钟，无配音，含固定背景音乐和合成音效（点播放后出声）。六个章节页的“咚”落在音乐的小节强拍上。字幕稿、史实核对、卡点表、名词解释和资料来源在下方。</p>
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
    <p class="hint">下面是视频里每个说法的核对结果。“已核实”表示在列出的来源里找到；“存疑”表示来源说法不一或只有单一来源，视频里取了更稳妥的说法。</p>
    <div class="tablewrap"><table><thead><tr><th>说法</th><th>状态</th><th>说明</th></tr></thead><tbody>
      <tr><td>2026 年诺贝尔物理学奖授予弗朗西斯·哈尔岑，2026-10-06 公布</td><td><span class="badge ok">已核实</span></td><td>多家媒体报道与诺贝尔奖官网页面一致；奖项引文“对 IceCube 的决定性贡献”为中文意译。</td></tr>
      <tr><td>1992 年以来第一次只有一人独得物理学奖</td><td><span class="badge warn">存疑</span></td><td>来自 Sky &amp; Telescope 的单一说法，未在官网核对到；视频里按“据报道”讲。</td></tr>
      <tr><td>1988 年前后，哈尔岑想到用南极冰做探测器</td><td><span class="badge warn">存疑</span></td><td>Fermilab 写 1988 年，S&amp;T 写“八十年代末”，视频说“1988 年前后”。</td></tr>
      <tr><td>86 根缆绳、5160 个光学传感器、冰下 1450–2450 米、约 1 立方公里</td><td><span class="badge ok">已核实</span></td><td>IceCube 官方资料与 arXiv:1111.5188。</td></tr>
      <tr><td>2010 年 12 月最后一根缆绳放入冰中</td><td><span class="badge warn">存疑</span></td><td>IceCube 官网为 2010 年 12 月，Fermilab 写 2011 年；视频采用 IceCube 官网。</td></tr>
      <tr><td>“这是一场赌博”“没人知道能不能成功”</td><td><span class="badge ok">已核实</span></td><td>哈尔岑在获奖后访谈中的说法，视频用转述。</td></tr>
      <tr><td>2013 年 Science：2010–2012 年数据中 28 个极高能事件，Bert 和 Ernie，未指向源头</td><td><span class="badge ok">已核实</span></td><td>Science 342, 1242856；sci.news 报道。</td></tr>
      <tr><td>2017-09-22 警报，约 300 TeV，TXS 0506+056 约 40 亿光年，Fermi 十年来最强耀发，位置相差不到 0.06°，约 20 台设备跟进，2018 年 7 月发表</td><td><span class="badge ok">已核实</span></td><td>IceCube 2018 年数据发布与 arXiv:1807.08816。</td></tr>
      <tr><td>NGC 1068：4.2σ，约 4700 万光年，十年数据，几乎没有高能伽马射线</td><td><span class="badge ok">已核实</span></td><td>arXiv:2211.09972；2022-11 公布。</td></tr>
      <tr><td>“源头被厚物质包住，所以伽马射线出不来”</td><td><span class="badge warn">存疑</span></td><td>这是研究者的解读，不是直接观测，视频里说“可能是”。</td></tr>
      <tr><td>2023 年银河系平面 4.5σ，用深度神经网络识别“级联”事件</td><td><span class="badge ok">已核实</span></td><td>arXiv:2307.04427（Science 380）。灵敏度提高“约 3–4 倍”取自摘要的相关表述。</td></tr>
      <tr><td>合作组约 450 位科学家、58 家机构、14 个国家</td><td><span class="badge ok">已核实</span></td><td>来自 IceCube 合作组与媒体报道，均为约数。</td></tr>
      <tr><td>IceCube Upgrade 2025–2026 年安装；Gen2 约 8 倍体积，2023 年被搁置</td><td><span class="badge warn">存疑</span></td><td>搁置的说法主要来自 Sky &amp; Telescope，“或许能让它重启”是报道里的评论，视频按“有人认为”处理。</td></tr>
      <tr><td>“中微子是宇宙中数量最多的粒子之一，比电子轻、不带电”</td><td><span class="badge ok">常识</span></td><td>标准粒子物理常识，不是来自上述新闻来源。</td></tr>
    </tbody></table></div>
  </section>

  <section>
    <h2 class="sec">音乐卡点</h2>
    <p class="hint">背景音乐是固定的 112.8 拍每分钟，每小节约 2.13 秒。这支曲子可用的部分只有约 2 分 40 秒，5 分钟的视频把整齐的段落按小节接起来：开头铺垫 4 小节，之后顺着原曲走到第 77 小节，再把“正式律动段”重复两次，中间插入一段安静的低谷。所有拼接点都落在章节页的“咚”上，听不到接缝。</p>
    <div class="tablewrap"><table><thead><tr><th>章节页</th><th>“咚”的时间</th><th>音乐位置</th></tr></thead><tbody>
      <tr><td>幽灵粒子</td><td class="t">0:08.5</td><td>原曲第 9 小节，鼓组进入</td></tr>
      <tr><td>冰下探测器</td><td class="t">0:42.6</td><td>原曲第 25 小节</td></tr>
      <tr><td>第一批证据</td><td class="t">1:33.6</td><td>原曲第 49 小节：低谷段结束，鼓组重新炸开</td></tr>
      <tr><td>第一个源头</td><td class="t">2:03.4</td><td>原曲第 63 小节</td></tr>
      <tr><td>新的星图</td><td class="t">2:37.5</td><td>接缝：回到第 49 小节，律动段再来一遍</td></tr>
      <tr><td>还在继续</td><td class="t">3:41.3</td><td>接缝：回到低谷段（第 41 小节）；3:58.3 鼓组第三次炸开</td></tr>
    </tbody></table></div>
  </section>

  <section>
    <h2 class="sec">名词解释</h2>
    <dl class="gl">
      <dt>中微子</dt><dd>一种极轻、不带电的粒子，几乎不和物质作用，所以能轻松穿过地球。</dd>
      <dt>宇宙线</dt><dd>从太空射来的高能带电粒子，被磁场带偏，认不出方向。</dd>
      <dt>切伦科夫光</dt><dd>带电粒子在冰里跑得比光在冰里还快时发出的淡蓝色光。</dd>
      <dt>耀变体（blazar）</dt><dd>中心有超大质量黑洞、喷流恰好指向地球的星系。</dd>
      <dt>TeV</dt><dd>万亿电子伏，粒子能量单位。300 TeV 约是大型强子对撞机单个质子能量的几十分之一。</dd>
      <dt>σ（西格玛）</dt><dd>衡量“结果是偶然的”可能性有多小。4σ 级是证据，5σ 才是粒子物理里通行的“发现”标准。</dd>
      <dt>级联事件</dt><dd>中微子在冰里打出的一团球形光，方向不好判断，但能量好测。</dd>
    </dl>
  </section>

  <section>
    <h2 class="sec">资料来源</h2>
    <ul class="srcs">
      <li><span class="nm">诺贝尔物理学奖 2026</span> <span>获奖信息</span><br><a href="https://www.nobelprize.org/prizes/physics/2026/press-release/" target="_blank" rel="noopener">https://www.nobelprize.org/prizes/physics/2026/press-release/</a></li>
      <li><span class="nm">NPR：Halzen 获奖</span> <span>获奖报道</span><br><a href="https://www.opb.org/article/2026/10/06/francis-halzen-wins-nobel-prize-in-physics-for-work-on-high-energy-neutrinos/" target="_blank" rel="noopener">https://www.opb.org/article/2026/10/06/francis-halzen-wins-nobel-prize-in-physics-for-work-on-high-energy-neutrinos/</a></li>
      <li><span class="nm">IceCube: Astrophysics and Astroparticle Physics at the South Pole</span> <span>探测器参数</span><br><a href="https://arxiv.org/abs/1111.5188" target="_blank" rel="noopener">https://arxiv.org/abs/1111.5188</a></li>
      <li><span class="nm">WIPAC：2013 年 Science 论文</span> <span>28 个事件</span><br><a href="https://www2.wipac.wisc.edu/node/289" target="_blank" rel="noopener">https://www2.wipac.wisc.edu/node/289</a></li>
      <li><span class="nm">sci.news：来自太阳系之外的中微子</span> <span>2013 年报道</span><br><a href="https://www.sci.news/physics/science-icecube-neutrinos-outside-solar-system-01566.html" target="_blank" rel="noopener">https://www.sci.news/physics/science-icecube-neutrinos-outside-solar-system-01566.html</a></li>
      <li><span class="nm">IceCube 数据发布 2018（TXS 0506+056）</span> <span>2017 警报</span><br><a href="https://icecube.wisc.edu/data-releases/2018/07/icecube-data-from-2008-to-2017-related-to-analysis-of-txs-0506056" target="_blank" rel="noopener">https://icecube.wisc.edu/data-releases/2018/07/icecube-data-from-2008-to-2017-related-to-analysis-of-txs-0506056</a></li>
      <li><span class="nm">Multimessenger observations of a flaring blazar</span> <span>Science 2018</span><br><a href="https://arxiv.org/abs/1807.08816" target="_blank" rel="noopener">https://arxiv.org/abs/1807.08816</a></li>
      <li><span class="nm">Evidence for neutrino emission from NGC 1068</span> <span>4.2σ</span><br><a href="https://arxiv.org/abs/2211.09972" target="_blank" rel="noopener">https://arxiv.org/abs/2211.09972</a></li>
      <li><span class="nm">Observation of high-energy neutrinos from the Galactic plane</span> <span>4.5σ</span><br><a href="https://arxiv.org/abs/2307.04427" target="_blank" rel="noopener">https://arxiv.org/abs/2307.04427</a></li>
      <li><span class="nm">Queen’s 大学：NGC 1068</span> <span>解读</span><br><a href="https://www.queensu.ca/physics/lemma/icecube-reports-evidence-neutrino-emission-ngc1068" target="_blank" rel="noopener">https://www.queensu.ca/physics/lemma/icecube-reports-evidence-neutrino-emission-ngc1068</a></li>
    </ul>
    <p class="hint" style="margin-top:12px">图都是示意：探测器、星图和事件位置都是手绘风格，不是真实观测数据。注意：本片的 Sky &amp; Telescope、Fermilab、Daily Maverick 等报道是核对时参考的二手来源，未列入画面。</p>
  </section>
</main>
'''

page = head + css + body + '\n<script id="musicdata" type="application/octet-stream">@@MUSIC@@</script>\n<script>\n' + engine + '\n</script>\n'
open('/home/claude/icecube.html', 'w', encoding='utf-8').write(page)
print('built', len(page))
