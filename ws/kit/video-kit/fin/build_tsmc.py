import re, sys
sys.path.insert(0, '/tmp/claude-0/-home-claude/7d578916-a400-5c24-bb34-8996a1a97376/scratchpad/fin')
import scenes_tsmc as F
ICE = '/tmp/claude-0/-home-claude/7d578916-a400-5c24-bb34-8996a1a97376/scratchpad/ice/'
D = '/tmp/claude-0/-home-claude/7d578916-a400-5c24-bb34-8996a1a97376/scratchpad/fin/'
TITLE = '台积电赚翻了，股价为什么还跌？'

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
head = '<title>台积电财报解读</title>\n' + lines(2, 3) + '\n<style>\n'
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
player = player.replace('物理科普 · 2026 诺贝尔物理学奖 · 约 5 分钟', '财报解读 · 价值投资视角 · 约 5 分钟')
player = player.replace('<h1>冰下的幽灵</h1>', f'<h1>{TITLE}</h1>')
player = player.replace('六个章节页的“咚”落在音乐的小节强拍上。字幕稿、史实核对、卡点表、名词解释和资料来源在下方。', '六个章节页的“咚”落在音乐的小节强拍上。字幕稿、史实核对、卡点表、名词解释和资料来源在下方。本片为信息整理，不构成投资建议。')
player = player.replace('{scenes_html}', '@@SCENES@@')
music_sec = tmpl[music_a:tmpl.index('  <section>\n    <h2 class="sec">名词解释</h2>')]
for old, new in [('幽灵粒子', '成绩单'), ('冰下探测器', '股价跌'), ('第一批证据', '预期高'), ('第一个源头', '利润率'), ('新的星图', '花钱多'), ('还在继续', '看价值')]:
    music_sec = music_sec.replace(old, new)

exec(open(D + 'sections_tsmc.py', encoding='utf-8').read())
body = player + check + music_sec + gloss + srcsec
body = body.replace('@@SCENES@@', ''.join(F.S))
page = head + css + body + '\n<script id="musicdata" type="application/octet-stream">@@MUSIC@@</script>\n<script>\n' + engine + '\n</script>\n'
open('/home/claude/tsmc-q3.html', 'w', encoding='utf-8').write(page)
print('built', len(page))
