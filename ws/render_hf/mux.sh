cd "$(dirname "$0")"
# audio_mix.wav = synthesized layer (audio.wav) + Entropy bed from ../hf/mix_music.py
ffmpeg -y -loglevel error -f concat -safe 0 -i list.txt -i audio_mix.wav -af alimiter=limit=0.93 -c:v copy -c:a aac -b:a 192k -movflags +faststart -shortest /home/claude/hf.mp4 && mv /home/claude/hf.mp4 "/home/claude/AI从测试盒子里跑了出来-1080p.mp4" && touch mux.done
