cd "$(dirname "$0")"
ffmpeg -y -loglevel error -f concat -safe 0 -i list.txt -i audio_mix.wav -af volume=0.92,alimiter=limit=0.85:level=disabled -c:v copy -c:a aac -b:a 192k -movflags +faststart -shortest /home/claude/kp_tmp.mp4 && mv /home/claude/kp_tmp.mp4 "/home/claude/开普勒-他追着一个错误的梦找到了真理-1080p.mp4" && touch mux.done
