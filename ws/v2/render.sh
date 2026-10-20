# renders the video track in 4 parallel chunks, then joins them
cd "$(dirname "$0")"; mkdir -p ch
N=$(python3 -c "import json;print(int(round(json.load(open('tl.json'))['end']*30)))"); K=2; S=$(( (N + K - 1) / K ))
for i in $(seq 0 $((K-1))); do a=$((i*S)); b=$((a+S)); [ $b -gt $N ] && b=$N; node frames.js $a $b ch/c$i.mp4 > ch/c$i.log 2>&1 & done; wait
rm -f ch/list.txt; for i in $(seq 0 $((K-1))); do echo "file 'c$i.mp4'" >> ch/list.txt; done
ffmpeg -y -loglevel error -f concat -safe 0 -i ch/list.txt -c copy video.mp4 && echo VIDEO_OK
