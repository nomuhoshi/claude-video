cd "$(dirname "$0")"
ffmpeg -y -loglevel error -f concat -safe 0 -i list.txt -i audio_mix.wav -af alimiter=limit=0.93 -c:v copy -c:a aac -b:a 192k -movflags +faststart -shortest /home/claude/mu.mp4 && mv /home/claude/mu.mp4 "/home/claude/美光-AI的记忆是谁造的-1080p.mp4" && touch mux.done
