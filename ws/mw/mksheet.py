import sys
from PIL import Image
ts = sys.argv[2:]; out = sys.argv[1]
ims = [Image.open(f'shots/s_{t}.png').resize((960, 540)) for t in ts]
rows = (len(ims) + 1) // 2
W = Image.new('RGB', (1920, 540 * rows))
for i, im in enumerate(ims): W.paste(im, ((i % 2) * 960, (i // 2) * 540))
W.save(out)
