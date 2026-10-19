cd "$(dirname "$0")"
TOTAL=$(python3 -c "import json;print(json.load(open('/tmp/claude-0/-home-claude/7d578916-a400-5c24-bb34-8996a1a97376/scratchpad/qa_en/meta.json'))['frames'])")
for i in $@; do [ -f ch/c$i.done ] && continue; s=$((i*1500)); e=$((s+1500)); [ $e -gt $TOTAL ] && e=$TOTAL; node frames.js $s $e ch/c$i.mp4 > ch/c$i.log 2>&1 && touch ch/c$i.done; done
