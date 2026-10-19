# 用法: python3 build.py v1  → ../render_edu/v1.html
import sys, pathlib
v = sys.argv[1]; here = pathlib.Path(__file__).parent
js = (here/'engine.js').read_text() + '\n' + (here/f'{v}.js').read_text()
html = f'''<!doctype html><meta charset="utf-8"><style>html,body{{margin:0;background:#000}}canvas{{display:block;width:1920px;height:1080px}}</style>
<canvas id="cv"></canvas><script>{js}</script>'''
out = here.parent/'render_edu'/f'{v}.html'; out.write_text(html); print(out)
