cd "$(dirname "$0")"
for i in $@; do [ -f ch/c$i.done ] && continue; s=$((i*1500)); e=$((s+1500)); node frames.js $s $e ch/c$i.mp4 > ch/c$i.log 2>&1 && touch ch/c$i.done; done
