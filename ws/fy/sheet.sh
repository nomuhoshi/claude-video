#!/bin/bash
# usage: sheet.sh name t1 t2 ...   -> shots/_sheet_<name>.png (2 columns)
cd "$(dirname "$0")"; n=$1; shift; rm -f shots/s_*.png
NODE_PATH=/opt/node-tools/node_modules node shot.js "$@" 2>&1 | grep -v "^$" | head -5
python3 - "$n" "$@" <<'P'
import sys
from PIL import Image
n=sys.argv[1]; ts=sys.argv[2:]
ims=[Image.open('shots/s_%s.png'%t).resize((960,540)) for t in ts]
sheet=Image.new('RGB',(1920,540*((len(ims)+1)//2)))
for i,im in enumerate(ims): sheet.paste(im,((i%2)*960,(i//2)*540))
sheet.save('shots/_sheet_%s.png'%n)
P
