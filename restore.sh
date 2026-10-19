#!/bin/bash
# 新对话里：git clone 本仓库后运行  bash restore.sh
# 作用：把旧路径 SP 链接到仓库里的 ws/（在 SP 里改的文件就是仓库里的文件，直接 git commit 即可），
#       解压字体、补齐 soundfile、把配乐 mp3 转成 wav、生成三期配乐底轨，并检查渲染环境。
set -e
REPO=$(cd "$(dirname "$0")" && pwd)
SP=/tmp/claude-0/-home-claude/7d578916-a400-5c24-bb34-8996a1a97376/scratchpad
mkdir -p "$(dirname "$SP")" /home/claude
if [ -e "$SP" ] && [ ! -L "$SP" ]; then mv "$SP" "$SP.bak.$(date +%s)"; fi
ln -sfn "$REPO/ws" "$SP"
mkdir -p "$SP/render" && tar -xzf "$REPO/tools/fonts.tgz" -C "$SP/render"
for d in "$SP"/render_*; do [ -d "$d" ] && ln -sfn "$SP/render/node_modules" "$d/node_modules" && mkdir -p "$d/ch"; done

# soundfile：能装就装，装不上就用 scipy 替身（只支持 wav，现有脚本够用）
python3 -c "import soundfile" 2>/dev/null || pip install soundfile --break-system-packages -q 2>/dev/null || \
  cp "$REPO/tools/soundfile_shim.py" "$(python3 -c 'import site;print(site.getsitepackages()[0])')/soundfile.py"
python3 -c "import scipy" 2>/dev/null || pip install scipy --break-system-packages -q || true

cd "$SP/mus2" && ffmpeg -y -loglevel error -i entropy.mp3 -ar 44100 -ac 2 entropy.wav
cd "$SP/mus3" && ffmpeg -y -loglevel error -i awak.mp3 -ar 44100 -ac 2 awak.wav && ffmpeg -y -loglevel error -i nyn_s.mp3 -ar 44100 -ac 2 nyn_s.wav

bed() { cd "$SP/$1" && python3 "$2" >/dev/null && ffmpeg -y -loglevel error -i "$3_bed.wav" -c:a pcm_s16le "$3_bed16.wav" && ffmpeg -y -loglevel error -i "$3_bed.wav" -b:a 128k "$3_bed.mp3" && echo "$1 底轨 OK" || echo "$1 底轨跳过"; }
bed fd make_bed.py fd; bed mx make_bed_mx.py mx; bed lf make_bed_lf.py lf

ls /opt/pw-browsers/chromium >/dev/null 2>&1 && echo "Chromium OK" || echo "缺 Chromium"
NODE_PATH=/opt/node-tools/node_modules node -e "require('playwright');console.log('playwright OK')" 2>/dev/null || echo "缺 playwright"
echo "还原完成：$SP -> $REPO/ws"
