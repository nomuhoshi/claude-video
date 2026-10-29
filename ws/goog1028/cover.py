# -*- coding: utf-8 -*-
# 谷歌财报：亮色封面三尺寸 -> out/cover_16x9_1273x716.png, cover_4x3_1280x960.png, cover_douyin_1620x2160.png
from PIL import Image, ImageDraw, ImageFilter
from build import font, BG, INK, DIM, GRN, RED, CARD

def card(im, box, r=36):
    W, H = im.size; sh = Image.new('L', (W, H), 0); ImageDraw.Draw(sh).rounded_rectangle((box[0], box[1] + 14, box[2], box[3] + 14), r, fill=70)
    im.paste(Image.new('RGB', (W, H), '#C9C3B6'), (0, 0), sh.filter(ImageFilter.GaussianBlur(24))); ImageDraw.Draw(im).rounded_rectangle(box, r, fill=CARD)
def down(d, x, y, s, col):                                   # bold down arrow, (x, y) = tip
    d.polygon([(x, y), (x + 1.0 * s, y - 0.9 * s), (x + 0.38 * s, y - 0.9 * s), (x + 0.38 * s, y - 2.2 * s), (x - 0.38 * s, y - 2.2 * s), (x - 0.38 * s, y - 0.9 * s), (x - 1.0 * s, y - 0.9 * s)], fill=col)
def panel(im, x0, y0, w):
    card(im, (x0, y0, x0 + w, y0 + 470)); d = ImageDraw.Draw(im); cx = x0 + w // 2
    d.text((cx, y0 + 60), '三季度财报', font=font('b', 40), fill=DIM, anchor='mm')
    d.text((cx, y0 + 150), '云 +103%', font=font('k', 74), fill=GRN, anchor='mm')
    d.line((x0 + 50, y0 + 230, x0 + w - 50, y0 + 230), fill='#E5E7EB', width=3)
    d.text((cx, y0 + 290), '每股收益', font=font('b', 36), fill=DIM, anchor='mm')
    d.text((cx, y0 + 380), '2.12 vs 预期 3.02', font=font('k', 52), fill=RED, anchor='mm')
LOGO = Image.open('g_logo.png')
def logo(im, x, y, h):
    l = LOGO.resize((int(LOGO.width * h / LOGO.height), h), Image.LANCZOS); im.paste(l, (x, y), l); return l.width
def wide():
    W, H = 1920, 1080; im = Image.new('RGB', (W, H), BG); d = ImageDraw.Draw(im); d.rectangle((0, 0, W, 14), fill=RED)
    lw = logo(im, 270, 190, 230)
    d.text((270 + lw + 40, 200), '谷歌', font=font('k', 170), fill=INK)
    d.text((280 + lw + 46, 440), 'Google · GOOGL', font=font('b', 40), fill=DIM)
    d.text((272, 510), '财报出炉', font=font('k', 130), fill=INK)
    d.text((272, 670), '盘后跌 9%', font=font('k', 130), fill=RED)
    d.rounded_rectangle((280, 880, 1000, 960), 40, fill=INK); d.text((640, 920), '好在哪？坏在哪？', font=font('b', 46), fill='#FFFFFF', anchor='mm')
    panel(im, 1110, 330, 540); return im
def tall():
    W, H = 1080, 1440; im = Image.new('RGB', (W, H), BG); d = ImageDraw.Draw(im); d.rectangle((0, 0, W, 12), fill=RED)
    lh = 200; lw = int(LOGO.width * lh / LOGO.height); tw = d.textlength('谷歌', font=font('k', 170)); x0 = int((W - lw - 40 - tw) / 2)
    logo(im, x0, 70, lh); d.text((x0 + lw + 40, 60), '谷歌', font=font('k', 170), fill=INK)
    d.text((W // 2, 370), '财报出炉', font=font('k', 130), fill=INK, anchor='mm')
    d.text((W // 2, 525), '盘后跌 9%', font=font('k', 130), fill=RED, anchor='mm')
    panel(im, 140, 660, 800)
    d = ImageDraw.Draw(im); d.rounded_rectangle((W // 2 - 300, 1250, W // 2 + 300, 1340), 45, fill=INK); d.text((W // 2, 1295), '好在哪？坏在哪？', font=font('b', 48), fill='#FFFFFF', anchor='mm')
    return im
if __name__ == '__main__':
    w = wide(); w.resize((1273, 716), Image.LANCZOS).save('out/cover_16x9_1273x716.png')
    w.crop((240, 0, 1680, 1080)).resize((1280, 960), Image.LANCZOS).save('out/cover_4x3_1280x960.png')
    tall().resize((1620, 2160), Image.LANCZOS).save('out/cover_douyin_1620x2160.png'); print('ok')
