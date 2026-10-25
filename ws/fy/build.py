# Builds fy.html (render page): tl.json + formula images + v2 engine + scenes_fy.js
import json, base64
FONT = '/home/claude/claude-video/ws/render_kp/node_modules/@fontsource/ibm-plex-mono/files/'
open('scenes_fy.js', 'w').write(open('_head.js').read() + open('_mid_fy.js').read() + open('_foot_fy.js').read())
tl = open('tl.json').read()
meta = json.load(open('fm.json'))
FM = {k: dict(src='data:image/png;base64,' + base64.b64encode(open('fm/%s.png' % k, 'rb').read()).decode(), w=v['w'], h=v['h']) for k, v in meta.items()}
html = f'''<!doctype html><html><head><meta charset="utf-8"><title>费曼诺贝尔演讲</title><style>
@font-face{{font-family:"IBM Plex Mono";font-weight:400;src:url("file://{FONT}ibm-plex-mono-latin-400-normal.woff2")}}
@font-face{{font-family:"IBM Plex Mono";font-weight:500;src:url("file://{FONT}ibm-plex-mono-latin-500-normal.woff2")}}
html,body{{margin:0;background:#000;overflow:hidden}} canvas{{display:block;width:1920px;height:1080px}}
.pre{{position:absolute;left:-999px;font-family:"Noto Serif CJK SC";font-weight:900}}</style></head><body>
<canvas id="cv" width="1920" height="1080"></canvas><span class="pre">预载 8′</span><span class="pre" style="font-weight:700">预载</span><span class="pre" style="font-family:IBM Plex Mono;font-weight:500">MONO</span><span class="pre" style="font-family:IBM Plex Mono;font-weight:400">MONO</span>
<script>window.TL={tl};window.FM={json.dumps(FM)};</script><script>{open('engine.js').read()}</script><script>{open('scenes_fy.js').read()}</script>
<script>Promise.all([document.fonts.ready].concat(Object.keys(window.FIMG||{{}}).map(function(k){{return window.FIMG[k].decode();}}))).then(function(){{window.__setT(0);window.__ready=1;}});</script></body></html>'''
open('fy.html', 'w').write(html); print('fy.html', len(html))
