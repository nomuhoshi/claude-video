# Builds lo.html (render page): tl.json + v2 engine + scenes_lo.js (+ the supplied portrait as a data URI)
import base64
FONT = '/home/claude/claude-video/ws/render_kp/node_modules/@fontsource/ibm-plex-mono/files/'
open('scenes_lo.js', 'w').write(open('_head.js').read() + open('_props_common.js').read() + open('_mid_lo.js').read() + open('_foot.js').read())
tl = open('tl.json').read()
ph = ''
html = f'''<!doctype html><html><head><meta charset="utf-8"><title>洛伦兹 · v2</title><style>
@font-face{{font-family:"IBM Plex Mono";font-weight:400;src:url("file://{FONT}ibm-plex-mono-latin-400-normal.woff2")}}
@font-face{{font-family:"IBM Plex Mono";font-weight:500;src:url("file://{FONT}ibm-plex-mono-latin-500-normal.woff2")}}
html,body{{margin:0;background:#000;overflow:hidden}} canvas{{display:block;width:1920px;height:1080px}}
.pre{{position:absolute;left:-999px;font-family:"Noto Serif CJK SC";font-weight:900}}</style></head><body>
<canvas id="cv" width="1920" height="1080"></canvas><span class="pre">预载 8′</span><span class="pre" style="font-weight:700">预载</span><span class="pre" style="font-family:IBM Plex Mono;font-weight:500">MONO</span><span class="pre" style="font-family:IBM Plex Mono;font-weight:400">MONO</span>
<script>window.TL={tl};window.PHOTO_URI="{ph}";</script><script>{open('engine.js').read()}</script><script>{open('scenes_lo.js').read()}</script>
<script>Promise.all([document.fonts.ready, new Promise(function(r){{var p=window.__PH; if(!p||p.complete) r(); else {{p.onload=r; p.onerror=r;}}}})]).then(function(){{window.__setT(0);window.__ready=1;}});</script></body></html>'''
open('lo.html', 'w').write(html); print('lo.html', len(html))
