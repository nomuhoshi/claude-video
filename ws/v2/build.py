# Builds demo.html (render page) from tl.json + engine.js + scenes.js
import json, os
FONT = '/home/claude/claude-video/ws/render_kp/node_modules/@fontsource/ibm-plex-mono/files/'
tl = open('tl.json').read()
html = f'''<!doctype html><html><head><meta charset="utf-8"><title>八角分 · 新质感试片</title><style>
@font-face{{font-family:"IBM Plex Mono";font-weight:500;src:url("file://{FONT}ibm-plex-mono-latin-500-normal.woff2")}}
html,body{{margin:0;background:#000;overflow:hidden}} canvas{{display:block;width:1920px;height:1080px}}
.pre{{position:absolute;left:-999px;font-family:"Noto Serif CJK SC";font-weight:900}}</style></head><body>
<canvas id="cv" width="1920" height="1080"></canvas><span class="pre">预载字体 8′ 700</span><span class="pre" style="font-weight:700">预载</span><span class="pre" style="font-family:IBM Plex Mono;font-weight:500">MONO</span>
<script>window.TL={tl};</script><script>{open('engine.js').read()}</script><script>{open('scenes.js').read()}</script>
<script>document.fonts.ready.then(function(){{window.__setT(0);window.__ready=1;}});</script></body></html>'''
open('demo.html', 'w').write(html); print('demo.html', len(html))
