# -*- coding: utf-8 -*-
import re, sys, json
HERE = '/tmp/claude-0/-home-claude/7d578916-a400-5c24-bb34-8996a1a97376/scratchpad/mx/'
ICE = '/tmp/claude-0/-home-claude/7d578916-a400-5c24-bb34-8996a1a97376/scratchpad/ice/'
sys.path.insert(0, HERE)
import script_mx as F
exec(open(HERE + 'sections_mx.py', encoding='utf-8').read())

TL, SC, LINES = F.TL, F.SC, F.LINES
DUR = round(F.DUR, 3)
def js(v): return json.dumps(v, ensure_ascii=False)

# ---------- engine ----------
data = dict(DUR=DUR, names=[s['name'] for s in SC], idx=F.IDX,
            scenes=[dict(s=t['s'], e=t['e'], ls=t['ls']) for t in TL],
            lines=[[i, round(a, 3), round(b, 3), tx] for i, a, b, tx in LINES],
            cues=F.build_cues(), beds=F.build_beds(), chords=F.chords(), vsegs=F.music_plan(), mus=F.MUS, hits=__import__('sfx_mx').HITS)
parts = ['e_core1.js', 'e_help.js', 'e_sk.js', 'e_hx0.js', 'e_fd0.js', 'e_mx0.js', 'e_mx1.js', 'e_mx2.js', 'e_mx3.js', 'e_mx4.js', 'e_audio.js', 'e_core2.js']
engine = ''.join(open(HERE + p, encoding='utf-8').read() for p in parts).replace('@@DATA@@', js(data))

# ---------- css ----------
base = open(ICE + 'css_base.txt', encoding='utf-8').read().split('\n')
new_css = open(ICE + 'css_new.txt', encoding='utf-8').read() + '\n' + open(HERE + 'css_mx.txt', encoding='utf-8').read()
def lines(a, b): return '\n'.join(base[a - 1:b])
head = f'<title>麦克斯韦：光是电磁波</title>\n' + lines(2, 3) + '\n<style>\n'
css = lines(5, 59) + '\n' + lines(60, 77) + '\n' + lines(84, 99) + '\n' + lines(171, 212) + '\n' + new_css + '\n</style>\n'
css = re.sub(r'\.dlrow[^\n]*\n', '', css)

# ---------- scenes ----------
def chap(i, sc):
    t = TL[i]
    return f'''
        <div class="scene chap" data-start="{t['s']}" data-end="{t['e']}">
          <div class="wordbox"><span class="word" data-a="0.4,0.9">{sc['word']}</span></div>
          <i class="thread" data-a="0.2,1.5"></i>
        </div>
'''
S = []
for i, sc in enumerate(SC):
    t = TL[i]; st = f'class="scene s{i}" data-start="{t["s"]}" data-end="{t["e"]}"'
    if sc['k'] == 'chap': S.append(chap(i, sc))
    elif sc['k'] == 'hero':
        S.append(f'''
        <div {st}>
          <canvas class="cv" data-draw="m0"></canvas>
          <p class="hero-sub" data-a="0.3,0.9">光是电磁波</p>
        </div>
''')
    elif sc['k'] == 'c':
        S.append(f'''
        <div {st}>
          <canvas class="cv" data-draw="{sc['draw']}"></canvas>
        </div>
''')
    elif sc['k'] == 'recap':
        nodes = [('问', '好奇的孩子', '什么都要问“怎么动”'), ('色', '颜色与土星环', '1861 · 第一张彩色照片'),
                 ('光', '光是电磁波', '1862 · 算出光速'), ('方', '四个方程', '1865 · 电磁场理论')]
        xs = [13, 38, 63, 88]
        ns = ''
        for n, (y, h, d) in enumerate(nodes):
            ta = 1.0 + n * 1.5
            ns += f'          <div class="dot2" style="left:{xs[n]}%" data-a="{ta:.1f},0.5"></div>\n'
            ns += f'          <div class="node{" dn" if n % 2 else ""}" style="left:{xs[n]}%" data-a="{ta:.1f},0.7"><p class="y">{y}</p><p class="h">{h}</p><p class="d">{d}</p></div>\n'
        S.append(f'''
        <div {st}>
          <h2 class="hd" data-a="0.2,0.7">麦克斯韦：<em>光</em>是电磁波</h2>
          <div class="tl"><i data-a="0.8,6"></i></div>
{ns}        </div>
''')
    else:
        li = '\n            '.join(f'<li data-a="{0.25 + 0.18 * n:.2f},0.5"><b>{nm}</b><span>{d}</span></li>' for n, (nm, d, u) in enumerate(SRC))
        S.append(f'''
        <div {st}>
          <ul class="srclist">
            {li}
          </ul>
          <p class="foot" data-a="1.4,0.6">史实整理自公开资料 · 原理为简化讲解</p>
        </div>
''')
scenes_html = ''.join(S)

# ---------- page body: reuse the player skeleton of the physics page ----------
src = open(ICE + 'build_ice.py', encoding='utf-8').read()
a = src.index("body = f'''"); b = src.index("page = head")
tmpl = src[a + len("body = f'''"):b].rsplit("'''", 1)[0]
cut2 = tmpl.index('    <section>\n    <h2 class="sec">史实核对</h2>')
player = tmpl[:cut2]
mm, ss = int(DUR // 60), int(DUR % 60)
player = player.replace('物理科普 · 2026 诺贝尔物理学奖 · 约 5 分钟', f'物理 · 约 {mm} 分 {ss:02d} 秒')
player = player.replace('<h1>冰下的幽灵</h1>', f'<h1>{F.TITLE}</h1>')
i0 = player.index('<p class="meta">'); i1 = player.index('</p>', i0)
player = player[:i0] + f'<p class="meta">横屏 16:9，约 {mm} 分 {ss:02d} 秒，无配音。配乐用了三首曲子：童年和求学部分是《Entropy》；从“力线”到“四个方程”是 Position Music 的《The New York Nightfall》（轻微提速）；从“光谱”开始是 Ivan Torrent 的《The Awakening》，它的高潮落在费曼那句评价上。转场和字幕都落在各段配乐的拍子上。麦克斯韦、法拉第等人物用剪影小人代替，名字标在旁边。史实整理自公开资料，原理部分是简化讲解。字幕稿、内容核对、声音设计、名词解释和资料来源都在下面。</p>' + player[i1 + 4:]
player = player.replace('0:00 / 5:00', f'0:00 / {mm}:{ss:02d}').replace('音乐 开', '配乐 开').replace('音乐音量', '配乐音量').replace('max="300"', f'max="{DUR}"')
player = player.replace('{scenes_html}', '@@SCENES@@')
body = player + check + sound + gloss + srcsec + '</main>\n'
body = body.replace('@@SCENES@@', scenes_html)
import base64
music = base64.b64encode(open('/tmp/claude-0/-home-claude/7d578916-a400-5c24-bb34-8996a1a97376/scratchpad/mx/mx_bed.mp3','rb').read()).decode()
sfxlib = open(HERE + 'sfx_lib.json').read()
page = head + css + body + '\n<script id="musicdata" type="application/octet-stream">' + music + '</script>\n<script id="sfxdata" type="application/json">' + sfxlib + '</script>\n<script>\n' + engine + '\n</script>\n'
open('/home/claude/maxwell.html', 'w', encoding='utf-8').write(page)
open(HERE + 'meta.json', 'w').write(json.dumps(dict(DUR=DUR, frames=int(DUR * 30 + 0.999))))
open(HERE + 'music_plan.json', 'w').write(json.dumps(dict(segs=F.music_plan(), beat0=F.BEAT0, bar=F.BAR)))
print('built', len(page), 'DUR', DUR, 'frames', int(DUR * 30 + 0.999))
