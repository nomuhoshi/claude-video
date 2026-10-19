# bash run.sh v1 <块号...>   每块 1200 帧
cd "$(dirname "$0")"; v=$1; shift
TOTAL=$(python3 -c "import json;print(json.load(open('${v}_meta.json'))['frames'])")
for i in "$@"; do s=$((i*1200)); e=$((s+1200)); [ $s -ge $TOTAL ] && continue; [ $e -gt $TOTAL ] && e=$TOTAL
  node frames.js $v $s $e ch/${v}_$(printf %02d $i).mp4 > ch/${v}_$i.log 2>&1; done
