# 闪迪：留给 Sonnet 的收尾清单（Opus 部分已完成）

已完成：简报、查证、口播稿（script_sd.py）、核对表与来源（sections_sd.py）、时间表与配乐计划（tl_sd.py）、画面（scenes_sd.js，截图审查过）、封面三尺寸（out/，模板 ../kit/video-kit/cover/cover_sd.html）、标题。

B 站标题：
- 主标题：卖内存卡的，凭什么涨了几十倍？｜看懂闪迪
- 备选 1：一年多涨了 84 倍：毛利率比英伟达还高的闪迪，买它在押什么？
- 备选 2：存储超级周期：闪迪暴赚的真相和风险｜5 分钟看懂

收尾步骤（照 CoreWeave ws/cw 的做法，直接复制改名即可）：
1. `python3 tl_sd.py && python3 build.py`
2. 渲染：`export NODE_PATH=/opt/node-tools/node_modules && bash render.sh > render.log 2>&1`（约 50 分钟，后台跑）→ video.mp4
3. 混音：`cp ../cw/audio.py .`，跑 `python3 audio.py`（vibe 按 tl.json 的 mus 重剪，−15 LUFS，限幅 0.84）
4. 成片：`ffmpeg -i video.mp4 -i audio.wav -c:v libx264 -preset medium -crf 23 -pix_fmt yuv420p -c:a aac -b:a 192k -movflags +faststart -shortest "out/闪迪-卖内存卡的凭什么涨了几十倍-1080p.mp4"`；查响度 ≈ −15 LUFS、真峰值 < −1 dBFS（超了就像 CoreWeave 那样把音频压 0.3 dB 再封装）
5. 网页：`cp ../cw/page.py .`，把 sections_cw/script_cw/cw_page 改成 sd，title 改成 TITLE，简介改成闪迪，数据截至 10 月 20 日；用 Artifact 发布 sd_page.html（icon: chart）
6. 发给用户：mp4 + out/ 里三张封面 + 标题 + 来源
7. SOP 第 5 节加“公司介绍系列 #3 闪迪”条目、第 9 节加一行修改记录（要点：不出章节卡；“押什么 + 自测清单”让观众自己判断；市盈率两种口径自算标估算；vibe 停顿小节放在“涨价会一直涨下去吗”、drop 砸在“存储是周期生意”）
8. commit + push，删掉本文件
