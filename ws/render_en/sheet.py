import sys
from PIL import Image
files = sys.argv[2:]
ims = [Image.open(f).convert('RGB').resize((960, 540)) for f in files]
cols = 2; rows = (len(ims) + 1) // 2
sh = Image.new('RGB', (960 * cols, 540 * rows), (0, 0, 0))
for i, im in enumerate(ims): sh.paste(im, ((i % cols) * 960, (i // cols) * 540))
sh.save(sys.argv[1])
