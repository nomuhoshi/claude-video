# usage: shotscene.sh key:lineIdx[:off] ... -> sheet.png (2 cols)
cd "$(dirname "$0")"
export NODE_PATH=/opt/node-tools/node_modules
T=$(python3 - "$@" <<'PY'
import sys; sys.path.insert(0,'../mu'); import script_mu as F
o=[]
for a in sys.argv[1:]:
    p=a.split(':'); k=p[0]; li=int(p[1]); off=float(p[2]) if len(p)>2 else 1.6
    t=F.TL[F.IDX[k]]; o.append(min(t['e']-0.2, t['s']+t['ls'][li]+off))
print(' '.join(f'{x:.2f}' for x in o))
PY
)
rm -f s_*.png
node shots2.js $T 2>&1 | tail -5
python3 - $T <<'PY'
import sys; from PIL import Image
ts=sys.argv[1:]; W,H=960,540; cols=2; rows=(len(ts)+1)//2
im=Image.new('RGB',(W*cols,H*rows))
for k,t in enumerate(ts):
    im.paste(Image.open(f's_{t}.png').resize((W,H)),((k%cols)*W,(k//cols)*H))
im.save('sheet.png'); print('ok',ts)
PY
