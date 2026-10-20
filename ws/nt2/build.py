# Builds nt2.html: tl.json + old Newton drawings (wrapped) + v2 engine + scenes_nt2.js
import json
FONT = '/home/claude/claude-video/ws/render_kp/node_modules/@fontsource/ibm-plex-mono/files/'
OLD = ['e_help.js', 'e_sk.js', 'e_hx0.js', 'e_fd0.js', 'e_mx0.js', 'e_nt0.js', 'e_nt1.js', 'e_nt2.js', 'e_nt3.js', 'e_nt4.js']
old = '(function(){\nvar TL = window.TL, DATA = {idx: TL.idx}, scenes = TL.scenes, K = 19.2, DRAW = {};\n' \
      'function clamp(x){return x<0?0:x>1?1:x;}\n' \
      'function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;var t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}\n' + \
      ''.join(open('old/' + f, encoding='utf-8').read() for f in OLD) + '\nwindow.ODRAW = DRAW;\n})();\n'
tl = open('tl.json').read()
html = f'''<!doctype html><html><head><meta charset="utf-8"><title>牛顿 · v2</title><style>
@font-face{{font-family:"IBM Plex Mono";font-weight:400;src:url("file://{FONT}ibm-plex-mono-latin-400-normal.woff2")}}
@font-face{{font-family:"IBM Plex Mono";font-weight:500;src:url("file://{FONT}ibm-plex-mono-latin-500-normal.woff2")}}
html,body{{margin:0;background:#000;overflow:hidden}} canvas{{display:block;width:1920px;height:1080px}}
.pre{{position:absolute;left:-999px;font-family:"Noto Serif CJK SC";font-weight:900}}</style></head><body>
<canvas id="cv" width="1920" height="1080"></canvas><span class="pre">预载 8′</span><span class="pre" style="font-weight:700">预载</span><span class="pre" style="font-family:'Noto Sans SC';font-weight:500">预载</span><span class="pre" style="font-family:'Noto Sans SC';font-weight:700">预载</span><span class="pre" style="font-family:IBM Plex Mono;font-weight:500">MONO</span><span class="pre" style="font-family:IBM Plex Mono;font-weight:400">MONO</span>
<script>window.TL={tl};</script><script>{old}</script><script>{open('engine.js').read()}</script><script>{open('scenes_nt2.js').read()}</script>
<script>document.fonts.ready.then(function(){{window.__setT(0);window.__ready=1;}});</script></body></html>'''
open('nt2.html', 'w').write(html); print('nt2.html', len(html))
