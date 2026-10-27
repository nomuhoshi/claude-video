# -*- coding: utf-8 -*-
# 特斯拉为什么涨：亮色封面三尺寸 -> out/cover_16x9_1273x716.png, cover_4x3_1280x960.png, cover_douyin_1620x2160.png
from PIL import Image, ImageDraw, ImageFilter
from build import font, BG, INK, DIM, GRN, RED, CARD

SHOT = Image.open('moomoo_2344.png').convert('RGB')
ROW = SHOT.crop((0, 640, 1206, 840))                     # the TSLA row of the watchlist screenshot

def card(im, box, r=36):
    W, H = im.size; sh = Image.new('L', (W, H), 0); ImageDraw.Draw(sh).rounded_rectangle((box[0], box[1] + 14, box[2], box[3] + 14), r, fill=70)
    im.paste(Image.new('RGB', (W, H), '#C9C3B6'), (0, 0), sh.filter(ImageFilter.GaussianBlur(24))); ImageDraw.Draw(im).rounded_rectangle(box, r, fill=CARD)

def arrow(d, x, y, s, col):                                # a bold up arrow, (x, y) = tip
    d.polygon([(x, y), (x + 1.0 * s, y + 0.9 * s), (x + 0.38 * s, y + 0.9 * s), (x + 0.38 * s, y + 2.2 * s), (x - 0.38 * s, y + 2.2 * s), (x - 0.38 * s, y + 0.9 * s), (x - 1.0 * s, y + 0.9 * s)], fill=col)

def wide():
    W, H = 1920, 1080; im = Image.new('RGB', (W, H), BG); d = ImageDraw.Draw(im)
    d.rectangle((0, 0, W, 14), fill=RED)
    d.text((280, 190), '特斯拉 TSLA', font=font('b', 64), fill=DIM)
    d.text((272, 280), '一天涨了', font=font('k', 150), fill=INK)
    d.text((272, 460), '6%', font=font('k', 240), fill=GRN)
    arrow(d, 760, 500, 95, GRN)
    d.rounded_rectangle((280, 800, 1040, 880), 40, fill=INK); d.text((660, 840), '三个原因，一次说清', font=font('b', 46), fill='#FFFFFF', anchor='mm')
    # real screenshot row on the right (stays inside the 4:3 centre crop x 240..1680)
    rw = 560; r = ROW.resize((rw, int(ROW.height * rw / ROW.width)), Image.LANCZOS)
    x0, y0 = 1090, 330; card(im, (x0 - 24, y0 - 24, x0 + rw + 24, y0 + r.height + 24 + 220)); im.paste(r, (x0, y0)); d = ImageDraw.Draw(im)
    d.rounded_rectangle((x0 - 6, y0 - 6, x0 + rw + 6, y0 + r.height + 6), 14, outline=RED, width=6)
    d.text((x0 + rw // 2, y0 + r.height + 70), '巴克莱上调评级', font=font('b', 44), fill=INK, anchor='mm')
    d.text((x0 + rw // 2, y0 + r.height + 150), '目标价 370 → 450', font=font('k', 50), fill=GRN, anchor='mm')
    return im

def tall():
    W, H = 1080, 1440; im = Image.new('RGB', (W, H), BG); d = ImageDraw.Draw(im)
    d.rectangle((0, 0, W, 12), fill=RED)
    d.text((W // 2, 140), '特斯拉 TSLA', font=font('b', 56), fill=DIM, anchor='mm')
    d.text((W // 2, 290), '一天涨了', font=font('k', 150), fill=INK, anchor='mm')
    d.text((W // 2 - 60, 500), '6%', font=font('k', 230), fill=GRN, anchor='mm'); arrow(d, W // 2 + 230, 400, 80, GRN)
    rw = 860; r = ROW.resize((rw, int(ROW.height * rw / ROW.width)), Image.LANCZOS)
    x0, y0 = (W - rw) // 2, 720; card(im, (x0 - 26, y0 - 26, x0 + rw + 26, y0 + r.height + 26 + 230)); im.paste(r, (x0, y0)); d = ImageDraw.Draw(im)
    d.rounded_rectangle((x0 - 6, y0 - 6, x0 + rw + 6, y0 + r.height + 6), 14, outline=RED, width=6)
    d.text((W // 2, y0 + r.height + 75), '巴克莱上调评级', font=font('b', 46), fill=INK, anchor='mm')
    d.text((W // 2, y0 + r.height + 160), '目标价 370 → 450', font=font('k', 54), fill=GRN, anchor='mm')
    d.rounded_rectangle((W // 2 - 330, 1250, W // 2 + 330, 1340), 45, fill=INK); d.text((W // 2, 1295), '三个原因，一次说清', font=font('b', 48), fill='#FFFFFF', anchor='mm')
    return im

if __name__ == '__main__':
    w = wide(); w.resize((1273, 716), Image.LANCZOS).save('out/cover_16x9_1273x716.png')
    w.crop((240, 0, 1680, 1080)).resize((1280, 960), Image.LANCZOS).save('out/cover_4x3_1280x960.png')
    tall().resize((1620, 2160), Image.LANCZOS).save('out/cover_douyin_1620x2160.png'); print('ok')
