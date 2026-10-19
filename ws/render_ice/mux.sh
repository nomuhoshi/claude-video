cd "$(dirname "$0")"
ffmpeg -y -loglevel error -f concat -safe 0 -i list.txt -i audio.wav -c:v libx264 -preset slow -crf 19 -pix_fmt yuv420p -c:a aac -b:a 192k -movflags +faststart -shortest /home/claude/ice.mp4 && mv /home/claude/ice.mp4 /home/claude/ice-final.mp4 && touch mux.done
