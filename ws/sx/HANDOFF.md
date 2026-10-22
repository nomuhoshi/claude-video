# SpaceX 三季度财报：留给 Sonnet 的收尾清单（Opus 部分已完成）

已完成：查证（sections_sx.py 核对表 + 10 条来源，数据截至 10 月 21 日收盘）、口播稿（script_sx.py，约 5 分 22 秒，不出章节卡）、时间表与配乐（tl_sx.py，vibe 停顿小节在“这些收入，是拿什么换来的？”、drop 砸在“花钱，比赚钱快”）、画面（scenes_sx.js = _head.js + _mid_sx.js + _foot.js，截图审查过）、封面三尺寸（out/，模板 ../kit/video-kit/cover/cover_sx.html）、网页脚本 page.py。

B 站标题（≤20 字）：
- 主标题：SpaceX 第一次赚钱了，它在押什么？（20）
- 备选 1：一半收入来自 AI，SpaceX 押什么？（19）
- 备选 2：SpaceX 财报：AI 最能卖，星链最赚钱（20）
小红书标签：#SpaceX #星链 #马斯克 #美股 #财报解读 #AI算力 #投资小白 #科技股

收尾步骤：
1. `python3 tl_sx.py && python3 build.py`
2. 渲染：`export NODE_PATH=/opt/node-tools/node_modules && bash render.sh > render.log 2>&1`（后台，约 50 分钟）→ video.mp4
3. 混音：`python3 audio.py`（−15 LUFS，限幅 0.84）
4. 成片：`ffmpeg -i video.mp4 -i audio.wav -c:v libx264 -preset medium -crf 23 -pix_fmt yuv420p -c:a aac -b:a 192k -movflags +faststart -shortest "out/SpaceX-第一次赚钱了它在押什么-1080p.mp4"`；查响度 ≈ −15 LUFS、真峰值 < −1 dBFS（超了把音频压 0.3 dB 再封装）
5. 网页：`python3 page.py` → 用 Artifact 发布 sx_page.html（icon: chart）
6. 发给用户：mp4 + out/ 三张封面 + 标题 + 小红书标签
7. SOP 第 5 节加“财报解读 SpaceX 2026 Q3”条目、第 9 节加修改记录（要点：财报解读也用“押什么 + 自测清单”；收入最多的 AI vs 最赚钱的星链；净利润高于运营利润要拆开讲；市销率两种口径自算标估算；engine.js timeline 加了无年份时直接返回）
8. commit + push，删掉本文件
