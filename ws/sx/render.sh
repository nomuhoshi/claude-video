# renders sx.html in 1500-frame chunks with 2 workers (resumable), then joins them
cd "$(dirname "$0")"; mkdir -p ch
N=$(python3 -c "import json,math;print(math.ceil(json.load(open('tl.json'))['end']*30))"); C=1500; K=$(( (N + C - 1) / C ))
work() { for i in $(seq $1 2 $((K-1))); do [ -f ch/c$i.done ] && continue; a=$((i*C)); b=$((a+C)); [ $b -gt $N ] && b=$N; node frames.js $a $b ch/c$i.mp4 > ch/c$i.log 2>&1 && touch ch/c$i.done; done; }
work 0 & work 1 & wait
rm -f ch/list.txt; for i in $(seq 0 $((K-1))); do echo "file 'c$i.mp4'" >> ch/list.txt; done
ls ch/*.done | wc -l; [ $(ls ch/*.done | wc -l) -eq $K ] && ffmpeg -y -loglevel error -f concat -safe 0 -i ch/list.txt -c copy video.mp4 && echo VIDEO_OK
