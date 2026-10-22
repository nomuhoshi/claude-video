#!/bin/bash
# 用法: bash tools/render.sh 01_taylor 输出名.mp4   （2 进程并行，每块 1000 帧）
set -e; cd "$(dirname "$0")/.."; P=$1; OUT=$2; export NODE_PATH=/opt/node-tools/node_modules
node tools/mktex.js $P/tex_src.js $P/out/tex.json >/dev/null && python3 tools/build.py $P >/dev/null && node tools/frames.js $P/out/video.html meta
if [ "${AUDIO:-}" = grid ]; then python3 tools/audio_grid.py $P; else python3 tools/audio.py $P "${MUSIC:-../ws/kit/video-kit/music/vibe.mp3}" ${MG:-0.30} ${QUIET:-}; fi
F=$(python3 -c "import json;print(json.load(open('$P/out/meta.json'))['frames'])"); mkdir -p $P/out/ch; rm -f $P/out/ch/*
n=$(( (F + 999) / 1000 )); i=0
while [ $i -lt $n ]; do
  for k in 0 1; do j=$((i+k)); [ $j -ge $n ] && break; s=$((j*1000)); e=$((s+1000)); [ $e -gt $F ] && e=$F
    node tools/frames.js $P/out/video.html $s $e $P/out/ch/c$(printf %03d $j).mp4 & done; wait; i=$((i+2)); done
ls $P/out/ch/c*.mp4 | sort | sed "s|^|file '$PWD/|;s|$|'|" > $P/out/list.txt
ffmpeg -y -loglevel error -f concat -safe 0 -i $P/out/list.txt -i $P/out/audio.wav -c:v copy -c:a aac -b:a 192k -movflags +faststart -shortest "$OUT"
ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUT"
