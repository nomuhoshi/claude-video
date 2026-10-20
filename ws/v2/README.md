# 新质感引擎 v2 · 试片《八角分》

做法见 SOP 4.6，参考片学习笔记见 `../kit/video-kit/sfx_ref/NOTES.md`。

```
python3 tl.py        # 时间表 → tl.json（字幕、计数、音效、抖动、配乐小节）
python3 build.py     # tl.json + engine.js + scenes.js → demo.html
node shot.js 3 24.1  # 截几帧检查 → shots/
./render.sh          # 两进程逐帧渲染 → video.mp4
python3 audio.py     # 配乐按小节剪 + 音效 + 让位 + −15 LUFS → audio.wav
ffmpeg -i video.mp4 -i audio.wav -c:v copy -c:a aac -b:a 192k -movflags +faststart -shortest 成片.mp4
```

需要 `ws/mus2/entropy.wav`（restore.sh 会从 mp3 还原）和 `../kit/video-kit/sfx_ref/sfx_ref_lib.json`（`make_sfx_ref.py` 生成）。
