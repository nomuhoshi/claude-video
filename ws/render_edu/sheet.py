import sys,glob
from PIL import Image
v=sys.argv[1]; fs=sorted(glob.glob(f'shots/{v}_*.jpg'),key=lambda f:float(f.split('_')[-1][:-4]))
cols=4; w,h=640,360; rows=(len(fs)+cols-1)//cols
for part in range(0,len(fs),16):
  sub=fs[part:part+16]; r=(len(sub)+cols-1)//cols; im=Image.new('RGB',(w*cols,h*r))
  for i,f in enumerate(sub): im.paste(Image.open(f).resize((w,h)),((i%cols)*w,(i//cols)*h))
  im.save(f'shots/sheet_{v}_{part//16}.jpg',quality=85); print(f'shots/sheet_{v}_{part//16}.jpg')
