# -*- coding: utf-8 -*-
# Builds the published web page: the v2 canvas player driven by the embedded soundtrack, plus titles, check table and sources.
import json, base64, subprocess, html
exec(open('sections_sd.py', encoding='utf-8').read())
from script_sd import TITLE
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', 'audio.wav', '-c:a', 'libmp3lame', '-b:a', '128k', 'audio_web.mp3'], check=True)
mp3 = base64.b64encode(open('audio_web.mp3', 'rb').read()).decode()
tl = open('tl.json').read()
eng = open('engine.js').read().replace("var SERIF = '\"Noto Serif CJK SC\"'", "var SERIF = '\"Noto Serif CJK SC\", \"Noto Serif SC\", serif'")
sc = open('scenes_sd.js').read().replace("var SERIF = '\"Noto Serif CJK SC\"'", "var SERIF = '\"Noto Serif CJK SC\", \"Noto Serif SC\", serif'")
TAG = {'已核实': 'ok', '常识': 'c', '简化': 's', '转述': 'r', '估算': 'e', '示意': 'i'}
rows = ''.join('<tr><td>%s</td><td><span class="t %s">%s</span></td><td>%s</td></tr>' % (html.escape(a), TAG[b], b, html.escape(c)) for a, b, c in CHECK)
srcs = ''.join('<li><span>%s</span><a href="%s" target="_blank" rel="noopener">%s</a></li>' % (html.escape(a), u, html.escape(u)) for a, d, u in SRC)
page = f'''<title>卖内存卡的，凭什么涨了几十倍？</title><meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@700;900&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
:root{{color-scheme:dark;--bg:#070a12;--fg:#ece6da;--dim:#9aa3b2;--gold:#f0bd5c;--line:rgba(160,175,200,.18);--card:#0e1422}}
/* single dark look by choice: a video player page */
*{{box-sizing:border-box}} body{{margin:0;background:var(--bg);color:var(--fg);font-family:"Noto Serif SC","Noto Serif CJK SC",serif}}
.wrap{{max-width:1180px;margin:0 auto;padding-block:28px 80px;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px))}}
h1{{font-size:clamp(24px,4vw,40px);margin:4px 0 6px;font-weight:900}} .kick{{font-family:"IBM Plex Mono",monospace;color:var(--dim);letter-spacing:.2em;font-size:13px}}
.player{{position:relative;width:100%;max-width:100%;aspect-ratio:16/9;background:#000;border-radius:10px;overflow:hidden;border:1px solid var(--line)}}
canvas{{width:100%;height:100%;display:block}}
.big{{position:absolute;inset:0;margin:auto;width:92px;height:92px;border-radius:50%;border:2px solid var(--gold);background:rgba(8,12,20,.6);color:var(--gold);font-size:34px;cursor:pointer}}
.ctl{{display:flex;align-items:center;gap:12px;margin-top:10px;font-family:"IBM Plex Mono",monospace;font-size:13px;color:var(--dim)}}
.ctl button:focus-visible,.big:focus-visible{{outline:2px solid #f0bd5c;outline-offset:2px}} .ctl button{{background:var(--card);color:var(--fg);border:1px solid var(--line);border-radius:6px;padding:6px 12px;cursor:pointer;font:inherit}}
.ctl input{{flex:1;accent-color:#f0bd5c}}
h2{{font-size:22px;margin:40px 0 12px;border-left:3px solid var(--gold);padding-left:10px}}
.tbl{{overflow-x:auto}} table{{border-collapse:collapse;width:100%;font-size:15px}} td{{border-bottom:1px solid var(--line);padding:9px 8px;vertical-align:top}}
.t{{font-size:12px;padding:2px 8px;border-radius:10px;white-space:nowrap;border:1px solid}} .ok{{color:#7fd6a0}} .c{{color:#86b6ff}} .s{{color:#f0bd5c}} .r{{color:#ef8f6b}} .e{{color:#c9a3ff}} .i{{color:#9aa3b2}}
ol{{padding-left:20px}} li{{margin:8px 0}} li span{{display:block}} li a{{color:var(--dim);font-family:"IBM Plex Mono",monospace;font-size:12px;word-break:break-all}}
.note{{color:var(--dim);font-size:14px;line-height:1.7}}
</style><div class="wrap">
<div class="kick">COMPANY PROFILE · NASDAQ: SNDK</div><h1>{TITLE}</h1>
<p class="note">闪迪是什么公司、怎么赚钱、股价为什么涨了几十倍，以及买它到底在押什么。信息整理，不构成投资建议；数据截至 2026 年 10 月 20 日。</p>
<div class="player"><canvas id="cv" width="1920" height="1080"></canvas><button class="big" id="big" aria-label="播放">▶</button></div>
<div class="ctl"><button id="pp">播放</button><input id="sk" type="range" min="0" max="1000" value="0"><span id="tm">0:00</span></div>
<h2>史实与数据核对</h2><div class="tbl"><table>{rows}</table></div>
<h2>资料来源</h2><ol>{srcs}</ol>
</div>
<script id="aud" type="application/octet-stream">{mp3}</script>
<script>window.TL={tl};</script><script>{eng}</script><script>{sc}</script>
<script>
(function(){{
  var END = TL.end, a = new Audio('data:audio/mpeg;base64,' + document.getElementById('aud').textContent.trim());
  var pp = document.getElementById('pp'), big = document.getElementById('big'), sk = document.getElementById('sk'), tm = document.getElementById('tm'), drag = false;
  function fmt(s) {{ s = Math.max(0, s | 0); return (s / 60 | 0) + ':' + ('0' + s % 60).slice(-2); }}
  function frame() {{ var t = a.currentTime; window.__setT(Math.min(t, END - 0.01)); if (!drag) sk.value = 1000 * t / END; tm.textContent = fmt(t) + ' / ' + fmt(END); if (!a.paused) requestAnimationFrame(frame); }}
  function toggle() {{ if (a.paused) {{ a.play(); pp.textContent = '暂停'; big.hidden = true; requestAnimationFrame(frame); }} else {{ a.pause(); pp.textContent = '播放'; }} }}
  pp.onclick = toggle; big.onclick = toggle; document.getElementById('cv').onclick = function () {{ if (!a.paused) toggle(); }};
  sk.oninput = function () {{ drag = true; a.currentTime = END * sk.value / 1000; window.__setT(a.currentTime); tm.textContent = fmt(a.currentTime) + ' / ' + fmt(END); }};
  sk.onchange = function () {{ drag = false; }};
  a.onended = function () {{ pp.textContent = '播放'; }};
  var poster = TL.scenes[0].s + TL.scenes[0].ls[4] + 1.2;
  Promise.all([document.fonts.load('900 50px "Noto Serif SC"', '一千亿'), document.fonts.load('700 30px "Noto Serif SC"', '一千亿'), document.fonts.load('500 20px "IBM Plex Mono"')]).catch(function () {{}}).then(function () {{ window.__setT(poster); }});
}})();
</script>'''
open('sd_page.html', 'w', encoding='utf-8').write(page); print('page', len(page) / 1e6, 'MB')
