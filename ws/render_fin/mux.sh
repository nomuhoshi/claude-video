cd "$(dirname "$0")"
ffmpeg -y -loglevel error -f concat -safe 0 -i list.txt -i audio.wav -c:v libx264 -preset slow -crf 19 -pix_fmt yuv420p -c:a aac -b:a 192k -movflags +faststart -shortest /home/claude/fin.mp4 && mv /home/claude/fin.mp4 /home/claude/台积电财报解读-1080p.mp4 && touch mux.done
