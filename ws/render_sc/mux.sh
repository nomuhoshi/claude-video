cd "$(dirname "$0")"
ffmpeg -y -loglevel error -f concat -safe 0 -i list.txt -i audio_mix.wav -af alimiter=limit=0.93 -c:v copy -c:a aac -b:a 192k -movflags +faststart -shortest /home/claude/sc.mp4 && mv /home/claude/sc.mp4 "/home/claude/沙子怎么变成芯片-1080p.mp4" && touch mux.done
