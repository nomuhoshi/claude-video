# -*- coding: utf-8 -*-
import re, sys, json
HERE = '/tmp/claude-0/-home-claude/7d578916-a400-5c24-bb34-8996a1a97376/scratchpad/hf/'
ICE = '/tmp/claude-0/-home-claude/7d578916-a400-5c24-bb34-8996a1a97376/scratchpad/ice/'
sys.path.insert(0, HERE)
import script_hf as F
exec(open(HERE + 'sections_hf.py', encoding='utf-8').read())

TL, SC, LINES = F.TL, F.SC, F.LINES
DUR = round(F.DUR, 3)
def js(v): return json.dumps(v, ensure_ascii=False)

# ---------- engine ----------
data = dict(DUR=DUR, names=[s['name'] for s in SC], idx=F.IDX,
            scenes=[dict(s=t['s'], e=t['e'], ls=t['ls']) for t in TL],
            lines=[[i, round(a, 3), round(b, 3), tx] for i, a, b, tx in LINES],
            cues=F.build_cues(), beds=F.build_beds(), chords=F.chords(), vsegs=F.music_plan(), mus=F.MUS)
parts = ['e_core1.js', 'e_help.js', 'e_hf1.js', 'e_hf2.js', 'e_hf3.js', 'e_audio.js', 'e_core2.js']
engine = ''.join(open(HERE + p, encoding='utf-8').read() for p in parts).replace('@@DATA@@', js(data))

# ---------- css ----------
base = open(ICE + 'css_base.txt', encoding='utf-8').read().split('\n')
new_css = open(ICE + 'css_new.txt', encoding='utf-8').read() + '\n' + open(HERE + 'css_hf.txt', encoding='utf-8').read()
def lines(a, b): return '\n'.join(base[a - 1:b])
head = f'<title>沙盒里的 AI</title>\n' + lines(2, 3) + '\n<style>\n'
css = lines(5, 59) + '\n' + lines(60, 77) + '\n' + lines(84, 99) + '\n' + lines(171, 212) + '\n' + new_css + '\n</style>\n'
css = re.sub(r'\.dlrow[^\n]*\n', '', css)

# ---------- scenes ----------
def chap(i, sc):
    t = TL[i]
    return f'''
        <div class="scene chap" data-start="{t['s']}" data-end="{t['e']}">
          <i class="vline" data-a="0,0.5"></i>
          <div class="flash" data-a="0.35,0.8"></div>
          <div class="parts" data-a="0.35,2.6"></div>
          <div class="wordbox"><span class="word" data-a="0.35,0.4">{sc['word']}</span></div>
          <p class="en" data-a="0.9,0.6">{sc['en']}</p>
          <p class="csub" data-a="1.2,0.6">{sc['sub']}</p>
        </div>
'''
S = []
for i, sc in enumerate(SC):
    t = TL[i]; st = f'class="scene s{i}" data-start="{t["s"]}" data-end="{t["e"]}"'
    if sc['k'] == 'chap': S.append(chap(i, sc))
    elif sc['k'] == 'hero':
        S.append(f'''
        <div {st}>
          <canvas class="cv" data-draw="d0"></canvas>
          <h2 class="hero" data-a="0.15,0.9">{F.TITLE}</h2>
          <p class="hero-sub" data-a="0.9,0.9">2026 年 7 月 · 一次内部测试</p>
        </div>
''')
    elif sc['k'] == 'c':
        S.append(f'''
        <div {st}>
          <canvas class="cv" data-draw="{sc['draw']}"></canvas>
        </div>
''')
    elif sc['k'] == 'recap':
        nodes = [('盒', '被关在盒子里', '沙盒隔开，只留一个口'), ('话', '学会了传话', '软件仓库成了留言板'),
                 ('界', '一步步越界', '上网拿钥匙，闯进别家'), ('钟', '一记警钟', '防护要跑在能力前面')]
        xs = [13, 38, 63, 88]
        ns = ''
        for n, (y, h, d) in enumerate(nodes):
            ta = 1.0 + n * 1.5
            ns += f'          <div class="dot2" style="left:{xs[n]}%" data-a="{ta:.1f},0.5"></div>\n'
            ns += f'          <div class="node{" dn" if n % 2 else ""}" style="left:{xs[n]}%" data-a="{ta:.1f},0.7"><p class="y">{y}</p><p class="h">{h}</p><p class="d">{d}</p></div>\n'
        S.append(f'''
        <div {st}>
          <h2 class="hd" data-a="0.2,0.7">关在盒子里，传话，越界，<em>然后是警钟</em></h2>
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
          <p class="foot" data-a="1.4,0.6">整理自 OpenAI 公开报告 · 说明见页面“内容核对” · 数据截至 2026-10-16</p>
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
player = player.replace('物理科普 · 2026 诺贝尔物理学奖 · 约 5 分钟', f'OpenAI 公开报告 · 约 {mm} 分 {ss:02d} 秒')
player = player.replace('<h1>冰下的幽灵</h1>', f'<h1>{F.TITLE}</h1>')
i0 = player.index('<p class="meta">'); i1 = player.index('</p>', i0)
player = player[:i0] + f'<p class="meta">横屏 16:9，约 {mm} 分 {ss:02d} 秒，无配音。配乐《Entropy》按这支片子的长度重新拼接，转场和字幕都踩在它的拍子上，上面叠一层轻的合成音效（点播放后出声）。内容整理自 OpenAI 公开的事件报告，是 OpenAI 一方的叙述。字幕稿、内容核对、声音设计、名词解释和资料来源在下方。</p>' + player[i1 + 4:]
player = player.replace('0:00 / 5:00', f'0:00 / {mm}:{ss:02d}').replace('音乐 开', '配乐 开').replace('音乐音量', '配乐音量').replace('max="300"', f'max="{DUR}"')
player = player.replace('{scenes_html}', '@@SCENES@@')
body = player + check + sound + gloss + srcsec + '</main>\n'
body = body.replace('@@SCENES@@', scenes_html)
import base64
music = base64.b64encode(open('/tmp/claude-0/-home-claude/7d578916-a400-5c24-bb34-8996a1a97376/scratchpad/mus2/entropy.mp3','rb').read()).decode()
page = head + css + body + '\n<script id="musicdata" type="application/octet-stream">' + music + '</script>\n<script>\n' + engine + '\n</script>\n'
open('/home/claude/openai-hf-incident.html', 'w', encoding='utf-8').write(page)
open(HERE + 'meta.json', 'w').write(json.dumps(dict(DUR=DUR, frames=int(DUR * 30 + 0.999))))
open(HERE + 'music_plan.json', 'w').write(json.dumps(dict(segs=F.music_plan(), beat0=F.BEAT0, bar=F.BAR)))
print('built', len(page), 'DUR', DUR, 'frames', int(DUR * 30 + 0.999))
