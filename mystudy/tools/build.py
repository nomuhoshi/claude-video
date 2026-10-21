# 用法: python3 tools/build.py 01_taylor   → 01_taylor/out/video.html（先 node tools/mktex.js 生成 out/tex.json）
import sys, pathlib
d = pathlib.Path(__file__).parent.parent / sys.argv[1]; tools = pathlib.Path(__file__).parent
eng = (tools / 'engine.js').read_text().replace('@@TEX@@', (d / 'out' / 'tex.json').read_text())
js = eng + '\n' + (d / 'scenes.js').read_text()
html = f'<!doctype html><meta charset="utf-8"><style>html,body{{margin:0;background:#000}}canvas{{display:block;width:1920px;height:1080px}}</style>\n<canvas id="cv"></canvas><script>{js}</script>'
out = d / 'out' / 'video.html'; out.write_text(html); print(out, len(html))
