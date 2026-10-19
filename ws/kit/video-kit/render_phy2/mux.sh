cd "$(dirname "$0")"
# audio_mix.wav = synthesized layer (audio.wav) + vibe.mp3 bed from ../phy2/mix_music.py
ffmpeg -y -loglevel error -f concat -safe 0 -i list.txt -i audio_mix.wav -af alimiter=limit=0.93 -c:v libx264 -preset slow -crf 19 -pix_fmt yuv420p -c:a aac -b:a 192k -movflags +faststart -shortest /home/claude/fire.mp4 && mv /home/claude/fire.mp4 "/home/claude/火到底是什么-1080p.mp4" && touch mux.done
