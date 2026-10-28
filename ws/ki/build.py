# Builds ki.html (render page): tl.json + v2 engine + scenes_ki.js (+ optional portrait as a data URI)
import base64
FONT = '/home/claude/claude-video/ws/render_kp/node_modules/@fontsource/ibm-plex-mono/files/'
open('scenes_ki.js', 'w').write(open('_head.js').read() + open('_props_common.js').read() + open('_mid_ki.js').read() + open('_foot.js').read())
tl = open('tl.json').read()
from PIL import Image
import io
def uri(p, fmt, q=88):
    im = Image.open(p).convert('RGB'); b = io.BytesIO(); im.save(b, fmt, quality=q); return 'data:image/%s;base64,' % fmt.lower() + base64.b64encode(b.getvalue()).decode()
import os
ph = uri('cover/kirchhoff_photo.png', 'JPEG') if os.path.exists('cover/kirchhoff_photo.png') else ''
html = f'''<!doctype html><html><head><meta charset="utf-8"><title>基尔霍夫 · v2</title><style>
@font-face{{font-family:"IBM Plex Mono";font-weight:400;src:url("file://{FONT}ibm-plex-mono-latin-400-normal.woff2")}}
@font-face{{font-family:"IBM Plex Mono";font-weight:500;src:url("file://{FONT}ibm-plex-mono-latin-500-normal.woff2")}}
html,body{{margin:0;background:#000;overflow:hidden}} canvas{{display:block;width:1920px;height:1080px}}
.pre{{position:absolute;left:-999px;font-family:"Noto Serif CJK SC";font-weight:900}}</style></head><body>
<canvas id="cv" width="1920" height="1080"></canvas><span class="pre">预载 8′</span><span class="pre" style="font-weight:700">预载</span><span class="pre" style="font-family:IBM Plex Mono;font-weight:500">MONO</span><span class="pre" style="font-family:IBM Plex Mono;font-weight:400">MONO</span>
<script>window.TL={tl};window.PHOTO_URI="{ph}";</script><script>{open('engine.js').read()}</script><script>{open('scenes_ki.js').read()}</script>
<script>Promise.all([document.fonts.ready, new Promise(function(r){{var ps=[window.__PH].filter(function(p){{return p&&p.src;}}), k=ps.length; if(!k) r(); ps.forEach(function(p){{ if(p.complete) {{ if(!--k) r(); }} else {{ p.onload=p.onerror=function(){{ if(!--k) r(); }}; }} }});}})]).then(function(){{window.__setT(0);window.__ready=1;}});</script></body></html>'''
open('ki.html', 'w').write(html); print('ki.html', len(html))
