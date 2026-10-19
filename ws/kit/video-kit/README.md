# video-kit

Companion files for the SOP "短视频制作 SOP（投资 / 物理科普）".

- template.html      Video page engine + the TSMC Q3 sample content. Replace the scene markup, LINES, CUES, COUNTS, CHAPS, glossary and sources.
                     Placeholders: @@MUSIC@@ (filled by the build step with base64 of the mp3) and @@VIDEO_URL@@ (filled after the mp4 is uploaded as an asset).
- music/vibe.mp3     The fixed background track (112.79 BPM, first beat 0.391 s, S0 = 10.4 s, 166.4 s long).
- music/*.py         Beat analysis: analyze.py -> grid.py -> align.py -> plan.py (needs librosa; run `python3 -I`).
- render/            Offline mp4 render. Needs node + playwright + Chromium, ffmpeg with libx264/aac, npm i @fontsource/ibm-plex-mono.

Render commands (run inside render/):
  python3 mkrender.py ../template.html ../music/vibe.mp3 render.html   # placeholders: @@VIDEO_URL@@ stays; fine for rendering
  node audio.js                                  # -> audio.wav
  node frames.js 0 2340 seg1.mp4 & node frames.js 2340 4680 seg2.mp4   # 30 fps, 156 s -> 4680 frames
  ffmpeg -f concat -safe 0 -i list.txt -c copy master.mp4
  ffmpeg -i master.mp4 -i audio.wav -map 0:v -map 1:a -c:v libx264 -preset slow -crf 19 -pix_fmt yuv420p -c:a aac -b:a 192k -shortest -movflags +faststart out.mp4
Change 4680 to DUR*30 when the video length changes.

Cover (Bilibili, 1273x716): edit cover/cover.html, then
  NODE_PATH=$(npm root -g) node shot.js $PWD/cover.html $PWD/cover.png <path-to>/ibm-plex-mono/files/
Output 1273x716 png (design canvas 1920x1080, scaled down). Keep the text short and big; reuse the video's gold/ice duotone title.

Note: in template.html, VIDEO_BYTES (the mp4 size in bytes, used for the download progress bar when the server sends no content-length) should be set to the real mp4 size.

## Physics sample (固体比热之谜, 5 min) — added later
- physics/build.py     Assembles the page: css_base.txt + css_new.txt + scene HTML + engine.js -> solid-heat.html (@@MUSIC@@ placeholder). Adjust the paths at the top of the script.
- physics/engine.js    Engine for the physics page: scene-local subtitles (RAW) and cues (RAWCUES), per-scene canvas drawing DRAW.dN(g, lt), music SEGS (loops vibe.mp3 by bars for videos longer than the track).
- render/mkrender2.py  Like mkrender.py for the physics page (adds window.__setT / __renderAudio hooks, handles fading previous scene).
- render/run_chunks.sh Renders frames in chunks of 1500 (resumable: `./run_chunks.sh 0 1 2` and `./run_chunks.sh 3 4 5` in parallel on 2 cores), then concat the ch/c*.mp4 files and mux with audio.wav as above.
- cover/cover_physics.html  Cover for the physics sample.

## news/ 行情复盘类（《美股大跌复盘》）
- news/build_news2.py（+ body2.py 史实核对/名词解释/来源，css2.txt 样式）：个股复盘版，从 template.html 生成。build_news.py 是第一版（只摆数据，被用户批评，仅作参考）。
- 复盘类必须以分析为主：谁跌了、为什么、共同因果链、接下来的日期与情景、让观众自己判断的问题。
- 渲染：render/mkrender.py 生成 render.html → audio.js → frames.js（4 段 1500 帧，runA.sh）→ mux.sh（需后台运行）。
- 只改了某几个场景时，只重渲染受影响的那几段再重新 mux。
- 封面：cover/cover_news2.html（个股跌幅条形图）。新闻页不放“保存视频”按钮。

## 封面安全区（B站同时展示 16:9 和 4:3）
- B站会从 16:9 图中间裁出 4:3，两边各切掉约 12.5%。所有文字和主体放在画面中间 x 12.5%–87.5%（1920 宽下为 240–1680），底部留出约 10% 给播放数据。
- cover/shot.js 出 1273×716（16:9），cover/shot43.js 出 1280×960（4:3，取中间 1440×1080）。视频开场画面也要遵守同样的安全区，因为用户可能直接选视频帧当封面。

## fin/ — 产业分析类 5 分钟（AI 数据中心融资）
- `build_fin.py` + `scenes_fin.py` + `css_fin.txt`：用 `physics/` 里的 5 分钟引擎（场景 0–15，专场页和音乐分段不变）做不点名个股的产业分析。引擎从 `physics/engine.js` 里去掉 canvas 画图部分，换成 `scenes_fin.py` 里的 NAMES / RAW 字幕 / RAWCUES / COUNTS。所有图用页面元素（柱子、层级条、利率尺、结构图、卡片）。
- 用法：先把 `physics/` 下的 css_base.txt、css_new.txt、engine.js、build_ice.py 放在同级 `ice/` 目录，再 `python3 build_fin.py`，输出 `/home/claude/ai-datacenter-debt.html`；渲染同 physics（mkrender3.py → audio.js → frames.js 分块 → mux）。
- 画面内容不要超过 y≈43cqw（两行字幕占 y 45–52）；开场画面文字放在 x 12.5%–87.5% 内。
- 封面：`cover/cover_fin.html`（`shot.js` 16:9、`shot43.js` 4:3）。

## 公司案例类（甲骨文版，沉浸式大白话）
- `fin/scenes_orcl.py` + `sections_orcl.py` + `build_orcl.py`：以一家具体公司为主角的 5 分钟版本。
- 规则：画面不放左上角场景标签、不放左下角来源小字（来源只放在页面“来源”区和回复里）；少用专有名词，必须用时当场用大白话解释；字幕一次只一行、≤25 字；主角公司先给用户 3–4 个选项再做；封面不放数据。
- 封面：`cover/cover_orcl.html`（1920×1080 设计，shot.js 出 16:9，shot43.js 中心裁切出 4:3）。

## 公司举例类（最新版：AI 数据中心借钱，四家公司举例）
- `fin/scenes_dc.py` + `sections_dc.py` + `build_dc.py`：主题是“AI 数据中心怎么靠借钱建起来”，用 Alphabet/Meta（发债、合资）、甲骨文（租楼）、CoreWeave（芯片抵押）四个例子，各讲一种借法。
- 先前的 `scenes_orcl.py` 等是“只讲甲骨文”的版本，主题被用户纠正后弃用，仅留作参考。
- 封面：`cover/cover_dc.html`（无数据）。
- #FinTalk 话题只在投稿时添加，不放进视频画面。

## 财报解读类（台积电第三季，价值投资视角）
- `fin/scenes_tsmc.py` + `sections_tsmc.py` + `build_tsmc.py`：流程是 成绩单 → 股价反应 → 三个原因（预期太高 / 利润率变薄 / 花钱多+明年谨慎）→ 价值投资四问 → 回顾 → 来源。
- 做财报类视频时：先查官方新闻稿，再查路透/法说会摘要，股价和估值数字标注时点与来源口径；不预测、不给买卖建议。
- 封面：`cover/cover_tsmc.html`（芯片 + 向下箭头，无数据）。

## 时长规则（2026-10-16 起）
- 视频时长按内容定，不固定 5 分钟；内容多就长，内容少就短（有平台最低时长时只需达到下限）。
- 不浪费时间：不为凑时长让一个画面停很久，每屏停留以“字幕读完 + 动画出完”为准，章节页和片头片尾也要紧凑。
- 现有 300 秒引擎把场景起止点和音乐分段绑定，做可变时长的片子前需先改造（场景时长按字幕量算，音乐按总长循环/截断）。

## 物理科普·变长引擎 + 空灵合成音效（《费曼讲火》，2026-10-16 起的物理片标准）
- `physics_fire/`：script_fire.py（场景表 SC、字幕、CUE_SPEC/BED_SPEC/MUSIC_SPEC）+ e_core1 / e_help / e_draw1–6 / e_audio / e_core2（build_fire.py 按此顺序拼成一个 IIFE）+ sections_fire.py（史实核对/声音设计/名词/来源）+ css_fire.txt。输出 `/home/claude/feynman-fire.html` 和 `phy2/meta.json`。build_fire.py 里的 ICE 路径指向 ice/ 模板目录，换机器时先改路径。
- 可变时长：每个场景时长由字幕量算出（一行 d = max(2.0, 0.55 + 字数/6.8, hold)，行间隔 0.08，章节页 2.6 秒）。字幕行、音效、背景声、和弦全部挂在“场景锚点”上（`('L',行号,偏移)` / `('T',偏移)` / `('E',偏移)`），build 时换算成全局时间。总长跟着内容走，没有死时间。
- 画面：每场景一个 `DRAW.dN(g, lt, L)`，100×56.25 单位画布，字幕占 y≈47–53，内容保持在 y≤46。粒子/火焰/CO₂ 全部用无状态时间函数；模拟类（小球翻山、麦克斯韦速度采样、链式反应格点）用确定性随机数，保证实时和离线渲染一致。
- 声音设计（只用合成，不放现成音乐，要空灵、沉浸）：长混响（暗色卷积）+ 慢速和弦铺底（CHORDS 表，每场景换和弦）+ 次低频正弦 + 每行字幕开头一声玻璃铃（D 大调五声音阶）+ 背景层（火噼啪、褐噪声火焰轰鸣、粉噪声风声带 LFO、闪烁泛音、小球音高跟随）+ 一次性音效（whoosh/riser/boom/bond/repel/pop/ding/hit/spark/tick/flash/thump/photon/bubble/grow/sun）+ 与动画同步的 DCUES/DBEDS（撞击、火花、热量滴答、链式反应琶音、火势随“已反应比例”上升）。总增益 OUTG=1.6 + 压缩 + 限幅，合成时再加 alimiter=0.93，平均约 −17 dB，不削波。
- 渲染（`render_phy2/`）：`export NODE_PATH=/opt/node-tools/node_modules`；`node audio.js`（约 3 分钟，输出 audio.wav）→ `bash runA.sh 0 2` 与 `bash runA.sh 1 3` 两路并行（1500 帧一段，读 phy2/meta.json 的总帧数）→ 后台运行 `bash mux.sh`（setsid nohup），生成 mp4 并写 mux.done。shots2.js 出测试帧，sheet.py 拼联系表。
- 封面：`cover/cover_fire.html`（篝火+柴堆，无数据，16:9 与 4:3 都在安全区内）。
- 史实核对状态新增一档“简化”：用大白话讲了但与严格物理不完全一致的地方（费曼的“阳光把氧从碳上敲掉”实际氧来自水的光解；热反馈图景 vs 自由基链式反应；活化能“小山”是比喻），必须在页面核对表和回复里说明。

## 封面风格（2026-10-16，参考用户给的同类频道封面截图）
- 参考封面共同点：黑底 + 一个发光的主视觉；两到三行大标题，用反常识的钩子（如“最让人上头的概率，不是 100%”“你闻到的海的味道，其实不是盐”），其中一个关键词放大并换成金色/红色；左上角一个小系列标签（边框小胶囊 + 小号英文）；底部一行白字加一行金字点题。
- 《费曼讲火》新封面（cover/cover_fire.html，旧版在 cover_fire_v1 思路已弃用）：左侧“烧一块木头，/烧的其实是/太阳（超大金字）”，右侧太阳光环里的篝火，封面不放系列标签（用户要求去掉“费曼”“物理科普”字样），底部“树存下来的阳光，火还给你”。文字起点 x=306，主视觉在 x≤1680 内，4:3 裁切后不被切。

## 配乐补充（2026-10-16，用户：“你没有把音乐配上”）
- 物理片的声音 = 固定配乐 vibe.mp3 + 合成空灵层，两者都要有，不能只放合成声。变长引擎里配乐按小节重拼：`physics_fire/e_audio.js` 里 VSEGS = [[视频小节, 曲子小节, 小节数]…]（前奏 → 律动 → 安静段对着“树从哪来” → 律动 → 片尾渐弱对着最后一幕），页面实时播放用它；成片用 `physics_fire/mix_music.py vibe.wav audio.wav audio_mix.wav 0.28` 把同样的编排混进 audio.wav（音乐约 −21 dB，整体约 −16 dB），`render_phy2/mux.sh` 用 audio_mix.wav 合成。vibe.wav 由 `ffmpeg -i vibe.mp3 -ac 2 -ar 44100 vibe.wav` 得到。页面要内嵌 vibe.mp3（build_fire.py 里的 musicdata 标签）。
- 视频里不出现“费曼”：字幕、画面小字、来源页标题都不带人名，只说“节目”“原节目”；来源页只显示域名。

## 转场对拍 + 空灵层要轻（2026-10-16，用户：“空灵的声音有点过多了；视频的转场没有配合音乐”）
- 变长引擎里场景时长要吸附到音乐的拍子：`script_fire.timeline()` 把每个场景的结束点向上取整到一拍（0.53194 秒）；BAR_KEYS（进入律动、安静段开始、律动再起、收尾所在的场景）还要落在小节线上（一小节 = 4 拍）。代价是每处最多多出约 2 秒留白，总长比纯按字幕算多约 5 秒。
- 音乐编排由 `script_fire.music_plan()` 按这些小节线自动算出（前奏 → 律动 → 安静段 → 律动 → 收尾），写进页面数据 vsegs 和 `music_plan.json`；`mix_music.py` 读同一个文件，页面和成片编排一致。
- 转场音效落在场景切换那一拍：章节页的 riser 提前 1.2 秒、boom 正好在切换点；没有章节页的切换用轻 whoosh（峰值落在切换点）。字幕铃音只留每隔一句一次，并吸附到八分音符上。
- 空灵层比重：合成层总增益 OUTG=0.85（原来 1.6），铃音力度 0.10；混音时音乐增益 0.40（音乐约 −18 dB，合成层约 −22 dB，整体约 −16 dB）。原则：配乐当主角，空灵层只做点缀。

## 公司报告类事件片 + 新配乐 Entropy（2026-10-16，《AI 从测试盒子里跑了出来》，OpenAI × Hugging Face 事件）
- 目录：`incident_hf/`（script_hf.py 场景表/字幕/音乐编排，sections_hf.py 页面下方的核对/来源，build_hf.py 拼装，e_hf1–3.js 画面 DRAW.d0–d11，e_audio/e_core/e_help 同变长引擎，mix_music.py）、`render_hf/`（audio.js、runA.sh、mux.sh、list.txt、frames.js 等；render.html 是 build 出来的页面副本，build 后自己复制过来）、`cover/cover_hf.html`、`music/entropy.mp3`。build_hf.py 里的路径指向 ice/ 模板目录，换机器要改。
- Entropy 配乐：150 BPM，一拍 0.4 秒，一小节 1.6 秒，第一拍约在 1.175 秒，F 小调。曲子结构（小节）：0–15 前奏，16–31 律动 A，32–33 静默，34–65 律动 B，66–69 过渡，70–85 中段，86–101 高潮，102–111 尾声。合成层整体降 6 个半音（`TRANSPOSE=-6`，变 Ab 大调）与曲子同调。`music_plan()` 把视频小节映射到曲子小节，页面实时播放（接缝 20 ms 交叉淡化）和 `mix_music.py` 离线混音用同一份 music_plan.json。混音增益 0.50，整体约 −19 dB 再过 alimiter。
- 字幕节拍化：每句字幕时长向上取整到整拍（最少 5 拍），章节页 2.6 秒，场景末尾补到整拍；BAR_KEYS 里的场景从小节线开始。
- 字幕延迟（用户：“还没开始展示字幕就出现了，可以延迟一两秒”）：每个场景首句字幕前留 LEAD 秒（片头 1.6、普通场景 0.8、总结/来源 0.4），先出画面再出字幕。以后所有片子都按这个做；已交付的旧片没有重渲染。
- 公司/机构报告类事件的事实规则：只讲报告页面里能找到的内容；第三方说法一律标“据转述”；不对用户数据、动机做报告没写的断言；页面里单独一节写“核对状态”和来源；只读了网页正文，没读全文 PDF 要在回复里说明。

## 配乐接缝要连贯（2026-10-16，用户：“3:25 和 3:40 左右音乐突然切换，不连贯”）
- 原因：安静段把曲子开头 0–15 小节循环两遍，15→0 是“升调小节→最安静小节”的硬跳（落差约 10 dB），接缝处又叠了两下很响的合成音效（thump/hit）。
- 规则：循环接缝必须选在响度相近的小节（Entropy：第 12 小节 −28 dB 回到第 0 小节 −31.7 dB）；不循环“升调/填充”小节（第 15 小节）；安静段入口先用 67–68 两小节的落空过渡。`music_plan()` 的安静段 = `[67,68] + 0–12 循环 + 0–15`。
- 接缝改成 0.15 秒等功率交叉淡化，下一段提前预卷（下拍落在满音量），`mix_music.py` 与页面 `e_audio.js` 同步（原来 20 ms，几乎等于硬切）。
- 安静段里的一次性音效要轻：同一个 −12 dB 的音效，在 −21 dB 的安静配乐上会像“切歌”。把 thump/hit 换成 soft。
- 只改声音时不用重渲画面：重建页面 → 复制为 render.html → `node audio.js`（约 2 分钟）→ mix_music → `mux.sh`（已改成 `-c:v copy`，几秒完成）。
- 标题要有钩子：用“OpenAI 亲口承认/自曝 + 具体反常识动作”，不要只复述主题；仍不写时间词、不说报告没写的事。

## 物理片：经典原子为什么会塌（2026-10-16，《原子为什么没有塌》，Entropy 引擎）
- 目录：`atom_qa/`（script_qa.py 场景与字幕、sections_qa.py 核对表/名词/来源、build_qa.py 拼页面、e_qa1–3.js 22 幕画面、css_qa.txt）、`render_qa/`（渲染脚本）、`cover/cover_qa.html`（封面）。需要 `incident_hf/` 里同名的 e_audio/e_core/e_help（已一并拷入 atom_qa）。
- 结构：开场塌缩 → 原子的样子 → 麻烦来了（加速就辐射）→ 一瞬间坍缩（约 1.6×10⁻¹¹ 秒）→ 可原子没塌（人、桌子、地球按此都会塌；理论与现实差距）→ 先打个补丁（光谱线 + 轨道跳跃，补丁解释不了氦）→ 电子是波（驻波、限制与吸引的能量平衡、泡利不相容）→ 回顾 → 来源。
- 核对表三档：已核实 / 常识 / 简化。“电子是波”和“ħ/r 不确定性估算”是启发式，必须标简化。页面和视频里不写人名，只写“补丁”“一条规则”；核对表里也不要出现人名，来源标题用内容命名。
- 经典坍缩螺旋：r³ 随时间线性减小，`spiral(u,R) = [R(1-u)^(1/3), TH·(1-sqrt(1-u))]`；封面用更缓的图形螺旋（`r=R(1-u)^0.85`）才看得清。
- 科学计数法用 `sci(g, …, base)` 手绘上标（最后一个参数可换底数文字，如“10²⁸”）。
- 配乐计划 `music_plan()`（安静段 = `[67,68]` + 补长循环 + 0–15；重头戏 = 4 小节循环补长）和接缝规则同上一节；混音时 `mix_music.py` 读取与脚本同目录的 `music_plan.json`，所以每支片子要用自己目录里的那份。
- 渲染：5 段每段 1500 帧并行（`runA.sh`），`node audio.js` 出 audio.wav，再 `mix_music.py … 0.50` 混 Entropy，最后 `mux.sh`（alimiter 0.93，视频流直接复制）。不要 pkill ffmpeg。

## 物理片：半导体是什么（2026-10-16，《沙子，怎么变成了芯片？》，Entropy 引擎，23 幕，约 4 分 08 秒）
- 目录：`semi/`（script_sc.py 场景与字幕、sections_sc.py 核对表/名词/来源、build_sc.py 拼页面、e_sk.js 通用画图工具、e_sc1–3.js 15 幕画面、css_sc.txt）、`render_sc/`（渲染脚本，meta 指向 `sc/meta.json`）、`cover/cover_sc.html`（封面）。
- 结构：开场钩子 → 三种材料 → 能带（价带/导带/带隙，空穴，温度）→ 掺杂（N 型、P 型）→ PN 结与二极管 → 晶体管（栅极电压、沟道）与逻辑 → 数量（1971 vs 2023，对数刻度）→ 沙子到晶圆 → 回顾 → 来源（7 条）。
- 配乐计划用同一个 `music_plan()`：BAR_KEYS=(s1, ch3, ch5, ch6, recap)；要求 ch3→ch5 ≥20 小节、ch5→ch6 ≥18 小节、ch6→recap ≥16 小节，否则要改章节顺序或加长场景。
- 画图小工具：`siAtom` 硅原子、`eSmall` 电子、`holeM` 空穴、`lattice` 晶格（可挖一个空位让它沿键走）、`band` 能带块、`lamp` 灯、`subs` 手绘下标（SiO₂）、`sci` 手绘上标。
- 容易踩的坑：①光晕叠加要用 `lighter`，否则淡出时留灰色污点；②图例、点阵、字幕互相压住，每幕都要截图检查（`shotscene.sh key:行号:偏移`）；③元素的运动路径要限制在画面里（空穴只能沿晶格的键走）；④来源页超过 6 条要收紧 .srclist 的 top 和行距。

## 公司介绍系列 #1：美光（2026-10-17，《AI 的“记忆”，是谁造的？》，Entropy 引擎，26 幕，约 5 分 12 秒）
- 用户要做“AI 基础材料供给公司”系列，每期讲一家公司是什么公司，第一期美光。目录：`company_mu/`（script_mu.py 场景与字幕、sections_mu.py 核对表/名词/来源、build_mu.py、e_mu1–3.js 18 幕画面、css_mu.txt）、`render_mu/`、`cover/cover_mu.html`。新公司照这个目录复制，改脚本、画面和 css 里的 recap/src 场景序号（本片是 .s24/.s25 = 倒数第二、最后一个场景）。
- 系列规则：封面不出现系列标签、不出现数据、不出现人名（CEO 等一律不写）；视频只讲事实，不构成投资建议，不讲股价和市值；每个数字要在核对表里写来源，三档之外加“转述”——凡是来自新闻报道、第三方机构（市场份额）、第三方整理的文字稿（财报电话会，机器转录）的都标“转述”，一手来源只用公司公告和年报（10-K）。
- 结构模板（公司片）：钩子 → 起点（成立、地点、员工）→ 卖什么（产品和占比）→ 产品原理（用比喻讲清楚，如 DRAM=书桌、NAND=书柜）→ 为什么 AI 需要它（HBM）→ 业务部门与市场地位 → 周期（多年收入柱状图 + 行业为什么起落）→ 现在 → 扩产 → 取舍 → 回顾 → 来源。
- 取数要点：2026 财年（53 周，到 2026-09-03）收入 1331.9 亿美元；DRAM 1006.8、NAND 317.9；四个业务部门 430.9 / 375.9 / 366.0 / 158.9 亿；最近一季 542.3 亿（去年同期 113.2）；历年收入取维基百科表（出自年报），2023 财年 155 亿、净亏 58 亿。Counterpoint 的 HBM 份额各家估计差别大，视频不讲。WebFetch 对新闻稿 PDF 可能被拒（PROVENANCE_REQUIRED），改用 8-K 新闻稿和 10-K 网页。
- 画图：新增 `memChip`（带引脚的芯片）、`dieStack`（叠层芯片）、`fab`（锯齿屋顶工厂）、`rack`（机架）、`dramCell`、`bookShelf`、`pwrLamp`、`W_(lt,t0,t1,fi,fo)`（先淡入后淡出的窗口）、`glow`（自带 lighter 的光晕）。画布里别用 `top` 做变量名（浏览器保留名，封面脚本里会让整张图不出现）。环形图的圆弧要 `lineCap='butt'`，否则段与段交接处出现半透明圆点。
- 渲染：7 段每段 1500 帧（`runA.sh 0 2 4 6` 与 `runA.sh 1 3 5` 并行），要用 `setsid nohup … < /dev/null &` 启动，否则命令超时会把渲染进程一起带走；`node audio.js` 单独后台跑。

## 封面不能套同一个模板（用户反馈，2026-10-17：“封面别都是同一模板，我发现你只是把几个字放大了”）
- 之前 hf/qa/sc/mu 四张封面都是“左侧衬线标题 + 巨大金色关键词 + 右侧一张图”，只换了字和图。以后每支片子的封面先想一个独立的视觉概念，再选版式和配色，不得从上一张复制后改字。
- 做法：①版式至少在这几种里轮换：居中纵向（标题在上、主体居中）、左右对开、满幅主体 + 小标题条、上下分层、巨型主体出血；②配色随主题变（美光用青绿 + 橙，不再沿用深蓝 + 金）；③背景元素与内容有关（美光封面背景是淡淡的 DRAM 存储单元阵列）；④主体画出内容的核心结构（美光 = 12 层 HBM 叠层 + 顶部处理器），不是装饰；⑤字号层级也要换，不要总是“一个超大金字”。仍守安全区（x 12.5%–87.5%）、不放系列标签/数据/人名。
- 美光新封面见 `cover/cover_mu.html`（居中叠层塔）；旧的 hf/qa/sc 封面仍是同一模板，用户要时再重做。

## 英文版（2026-10-17，《You Shouldn't Exist》= 《原子为什么没有塌》英文版）
- 目录：`atom_qa_en/`（script_en.py、sections_en.py、build_en.py、css_qa.txt、tr_js.py、e_*.js）、`render_en/`、`cover/cover_qa_en.html`。从中文版 `atom_qa/` 复制后只改文字层，画面、音效、配乐引擎不动。
- 做法：①script_en.py 重写字幕（一行不超过约 52 个字符），阅读速度 17 字符/秒，n_chars 直接用 len，再按旧规则检查音乐小节约束；②tr_js.py 把画面里的中文串逐个替换成英文（找不到会直接报错）；chip 宽度改用 measureText，sci() 增加后缀参数；③字体换成 Inter / Inter Display，字幕字重 700、字号 2.55cqw；④章节大字 10.5cqw，回顾节点文字缩短到一行；⑤页面界面、核对表状态（Verified/Simplified…）、名词、来源全部英文；⑥逐幕截图检查右侧溢出。
- 渲染同其他片：8664 帧分 6 段（runA.sh 0 2 4 与 1 3 5 并行）+ node audio.js → mix_music.py → mux.sh（输出名在 mux.sh 里改）。
- 封面新构图：黄色警示胶带压在坍缩螺旋上（cover_qa_en.html），不使用旧模板。
- 暂停中的项目：铜线/发电机（《牙医椅上，他想到了整座城市》），文件在工作目录 cu/（script、sections、build、css 已写，e_cu1.js 已写 d0–d5，其余画面未写）。

## 文字稿改编类（2026-10-17，《牙医椅上，他想到了整座城市》，约 4 分 05 秒，24 幕）
- 目录：`physics_cu/`（script_cu.py、sections_cu.py、build_cu.py、css_cu.txt、e_cu1.js 通用元件+d0–d5、e_cu2.js d6–d10、e_cu3.js d11–d15）、`render_cu/`、`cover/cover_cu.html`。沿用 Entropy 变长引擎。
- 做法：按关键词链排章节（牙医椅上 → 大坝铜线 → 铜和铁 → 有多快 → 铜里减速 → 同一件事），文字稿里的比喻各占一两幕；用户提供的文字稿就是故事部分的出处；用户明确说“就说是费曼”后，这支片子全程直接写“费曼”（其余系列仍默认不写人名）；章节转场只留一个安静的小词 + 一条铜色细线（不要编号 01/06、不要英文小字、不要副标题，观众会觉得在念 PPT），不再用满屏大字+闪光+粒子；核对表标“出自文字稿”（不再写“转述/没找到原文”；仍不声称核对过原始出版物），物理事实另查维基百科（8 条来源，URL 和标题都不含人名）。
- 常见重叠点：大标题宽度、思想气泡与标签、树状铜线没连到叶子、线圈压住标签、两个箭头重叠，都靠逐幕截图发现。
- 封面：`cover/cover_cu.html`（上标题、下全景）。

## 电力 (es) —— 取材自《费曼物理学讲义》的物理视频
- 素材=一段书稿原文 → script_es.py（场景/字幕/音乐 timeline）+ sections_es.py（核对表标"出自文字稿/简化"）+ e_es1~3.js（24 个场景画面）。
- 章节卡：只有一个安静的词 + 一条细线，不编号。
- 片尾署名："参考《费曼物理学讲义》· 物理整理自公开资料"；来源列表第一条是书的官方在线版。
- 封面 cover/cover_es.html：两个人 + 地球的悬念构图（不写数据）。
- 渲染：render_es/runA.sh 0 1 2 与 3 4 5 并行 + node audio.js；mix_music.py 0.50；mux.sh。

## 热 (hx) —— 从访谈文字稿做的物理视频
- 素材=一段访谈文字稿（多个小节）→ 先定场景表（hero + 4 个章节 + 10 幕 + recap + src），脚本里 BAR_KEYS 的 5 个 key 可以挂在任意场景上（ch6 在这里是"水珠消失"那一幕，不是章节卡）。
- e_hx0.js 是画法工具：jat（抖动的原子，amp/spd/热度色）、bounce（逐次衰减的弹跳）、hexG（六角排布）、heatCol。
- 混音注意：mix_music.py 从自己所在目录读 music_plan.json，所以用 hx/mix_music.py：`python3 ../hx/mix_music.py $SP/mus2/entropy.wav audio.wav audio_mix.wav 0.50`。
- 封面 cover_hx.html：越弹越矮的小球 + 地板原子由冷变热，钩子是一个问句。

## fd（法拉第传记）
- fd/：脚本 script_fd.py、多首歌拼接 make_bed.py（分段节拍网格，歌曲交接落在共同强拍，高潮对准指定场景）、小人系统 e_fd0.js（faraday/davy/maxwell/wheatstone，带名字标签、帽子、胡子）、场景 e_fd1~e_fd4.js。
- render_fd/：分块渲染 runA.sh，块数 = ceil(帧数/1500)，list.txt 要同步。
- 音效：fd/make_sfx.py 合成音效库 → sfx_lib.json 嵌入页面；fd/sfx_cues.py 写所有音效时间点和共享动作时间表；fd/mix_fd.py 带侧链让位的混音（配乐 0.55，最多让 5 dB）。

## mx（麦克斯韦传）
- mx/：script_mx.py（35 幕，7 分 14 秒），e_mx0（3D 斜投影 P3、ring3 前后半圈、人物：年轻/年长麦克斯韦、凯瑟琳、赫兹、小妖）、e_mx1~4 场景，sfx_mx.py 音效表，make_bed_mx.py（Entropy→Nightfall@力线→Awakening@光谱，高潮落在费曼那句）。
