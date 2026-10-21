# 交给 Sonnet：《垂直抗力と摩擦力》v3 收尾

画面、字幕、分镜已由 Opus 定稿并逐幕截图检查过（约 2 分 53 秒，5184 帧）。剩下的都是照章执行：

1. 渲染（在 ws/render_edu，`export NODE_PATH=/opt/node-tools/node_modules`）
   - `python3 ../edu_wave/build.py v3 && node frames.js v3 meta`
   - `python3 sfx.py v3`
   - 并行：`bash run.sh v3 0 & bash run.sh v3 1 & bash run.sh v3 2 & bash run.sh v3 3 & bash run.sh v3 4 & wait`（每块 1200 帧，共 5 块）
   - `ls ch/v3_*.mp4 | sort | sed "s|^|file '$PWD/|;s|$|'|" > list_v3.txt`
   - `ffmpeg -y -loglevel error -f concat -safe 0 -i list_v3.txt -i v3_audio.wav -c:v copy -c:a aac -b:a 192k -movflags +faststart -shortest "/home/claude/垂直抗力と摩擦力-1080p.mp4"`
2. 核对：ffprobe 帧数 = meta.frames、时长约 172.8 秒；抽 2–3 帧看块接缝（40 s、80 s 附近）。
3. 用 SendUserFile 把 mp4 发给用户。
4. SOP 第 6 节“高中物理教学片”一条后补一句：第三支《垂直抗力と摩擦力》，橡胶球凸凹模型（blob 压扁 + 错切）、抗力分解成 N 和 F、摩擦方向“もしも摩擦がなかったら”两例（5N/3N、斜面）；第 9 节加修改记录。
5. `git add -A && git commit && git fetch && git rebase origin/main && git push`。
