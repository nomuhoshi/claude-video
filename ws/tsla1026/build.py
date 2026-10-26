# -*- coding: utf-8 -*-
# 美股个股异动：特斯拉为什么涨（亮色、静态画面 + 字幕，快速出片）。python3 build.py -> out/tsla.mp4
import os, subprocess, math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

W, H = 1920, 1080
F = '/usr/share/fonts/opentype/noto/'
def font(w, s): return ImageFont.truetype(F + {'b': 'NotoSansCJK-Bold.ttc', 'k': 'NotoSansCJK-Black.ttc', 'r': 'NotoSansCJK-Regular.ttc', 'm': 'NotoSansCJK-Medium.ttc'}[w], s, index=2)  # index 2 = SC
BG, INK, DIM, RED, GRN, BLUE, GOLD, CARD = '#F6F4EF', '#1E2430', '#6B7280', '#E24B3B', '#16A34A', '#2563EB', '#D97706', '#FFFFFF'
SHOT = Image.open('moomoo_2344.png').convert('RGB')

# ---------------- script: (segment heading, visual, [lines]) ----------------
SEG = [
 ('特斯拉，今天涨了 6%', 'shot', [
   '10 月 26 日美股开盘后，特斯拉一度涨了 6%。',
   '截图里是日本时间晚上 11 点 44 分，股价 394.9 美元。',
   '上周五它收在 372.22 美元。',
   '一个周末过去，为什么突然涨这么多？',
   '原因主要有三个。']),
 ('原因一：巴克莱上调评级', 'barclays', [
   '第一个原因：投行巴克莱给它升级了。',
   '分析师 Dan Levy 把评级从“中性”调到“增持”，',
   '也就是从“持有”改成了“看好”。',
   '目标价从 370 美元，一口气提到 450 美元，',
   '比上周五的收盘价高了两成左右。',
   '大行升级，往往是一只股票当天大涨的直接导火索。']),
 ('原因二：汽车生意回暖', 'auto', [
   '第二个原因：巴克莱认为，汽车生意要回暖了。',
   '特斯拉的汽车业务已经连续两年下滑，',
   '巴克莱预计会重新增长，明年继续增长。',
   '一是自动驾驶 FSD：三季度北美的新车，',
   '超过 75% 都买了 FSD。',
   '二是上海工厂的出口在增加。',
   '三是储能：公司说 2027 年的储能产品已经快卖光了，',
   '巴克莱认为出货量可能增长五成以上。',
   '另外，Robotaxi 无人出租车最近跑的里程也在大涨。']),
 ('原因三：和 SpaceX 合并的想象', 'spacex', [
   '第三个原因：和 SpaceX 合并的想象。',
   '10 月 20 日，马斯克说，',
   '特斯拉和 SpaceX 已经各自成立了特别委员会，',
   '讨论两家公司要不要合并。',
   '巴克莱说，如果真的合并，',
   '特斯拉股东可能拿到一笔溢价。',
   '不过马斯克也说了：双方还没谈拢条件，',
   '合并能不能成，现在谁也说不准。']),
 ('上周发生了什么', 'week', [
   '再往回看一点。',
   '上周三，特斯拉发了三季度财报。',
   '每股赚 0.48 美元，收入约 280 亿美元，都比预期好。',
   '但它把全年的资本开支，从 250 亿美元砍到了 200 亿。',
   '市场担心 AI 和机器人的投入会放慢，',
   '第二天，股价跌了 3.1%。',
   '这周一的大涨，算是把财报后的跌幅又涨了回来。']),
 ('持有的人要注意什么', 'note', [
   '那么，持有特斯拉的人要注意什么？',
   '第一，这次涨，主要靠一份升级报告和合并预期。',
   '如果两家公司谈不拢，合并溢价可能很快消失。',
   '第二，这不是整个电动车板块在涨：',
   '同一天，Lucid 跌了 4%，Rivian 跌了 2%。',
   '第三，分析师的意见并不一致：',
   '27 位分析师里，13 位看好，12 位中性，2 位看空，',
   '平均目标价约 411 美元。']),
 ('接下来盯什么', 'next', [
   '接下来可以盯三件事：',
   '特斯拉和 SpaceX 的委员会，能不能谈出合并条件；',
   'Robotaxi 无人出租车，能不能继续扩张；',
   '四季度的交付量，能不能证明汽车生意真的回暖。',
   '以上是盘中数据，收盘价可能不同。',
   '信息整理，不构成投资建议。我们下期见。']),
]

def rr(d, box, r, fill, outline=None, w=0): d.rounded_rectangle(box, r, fill=fill, outline=outline, width=w)
def shadow_card(im, box, r=28):
    sh = Image.new('L', (W, H), 0); ImageDraw.Draw(sh).rounded_rectangle((box[0], box[1] + 10, box[2], box[3] + 10), r, fill=60)
    sh = sh.filter(ImageFilter.GaussianBlur(18)); im.paste(Image.new('RGB', (W, H), '#C9C3B6'), (0, 0), sh)
    ImageDraw.Draw(im).rounded_rectangle(box, r, fill=CARD)
def ctext(d, xy, s, f, fill, anchor='mm'): d.text(xy, s, font=f, fill=fill, anchor=anchor)
def wrap(s, f, maxw, d):
    out, cur = [], ''
    for ch in s:
        if d.textlength(cur + ch, font=f) > maxw: out.append(cur); cur = ch
        else: cur += ch
    return out + [cur] if cur else out

# ---------------- visuals (left panel 80..900) ----------------
def vis_shot(im, d, k):
    s = SHOT.crop((0, 300, 1206, 2400)); h = 690; w = int(s.width * h / s.height); s = s.resize((w, h), Image.LANCZOS)
    x0, y0 = 490 - w // 2, 150; shadow_card(im, (x0 - 16, y0 - 16, x0 + w + 16, y0 + h + 16), 24); im.paste(s, (x0, y0))
    # highlight the TSLA row (rows start ~y=490 in the 2000-tall preview -> ~640 in the original)
    ry0 = y0 + int((640 - 300) * h / 2100); ry1 = y0 + int((840 - 300) * h / 2100)
    d.rounded_rectangle((x0 - 6, ry0 - 4, x0 + w + 6, ry1 + 4), 12, outline=RED, width=6)
    d.text((x0, y0 + h + 30), '截图：moomoo 自选 · 10 月 26 日 23:44（日本时间）', font=font('r', 22), fill=DIM)
def vis_barclays(im, d, k):
    shadow_card(im, (100, 180, 880, 860)); ctext(d, (490, 260), '巴克莱 Barclays', font('b', 44), INK)
    ctext(d, (490, 330), '分析师 Dan Levy', font('r', 30), DIM)
    for i, (a, b, lab) in enumerate([('中性', '增持', '评级'), ('370', '450', '目标价（美元）')]):
        y = 470 + i * 200; ctext(d, (490, y - 60), lab, font('m', 28), DIM)
        ctext(d, (300, y), a, font('k', 76), '#9CA3AF'); ctext(d, (490, y), '→', font('k', 64), INK); ctext(d, (690, y), b, font('k', 76), GRN if k >= 1 + 2 * i else '#9CA3AF')
    if k >= 4: rr(d, (250, 790, 730, 840), 25, '#ECFDF5'); ctext(d, (490, 815), '比上周五收盘高约 21%', font('b', 28), GRN)
def vis_auto(im, d, k):
    items = [(3, '75%+', '北美新车买 FSD'), (5, '上海', '出口增加'), (6, '≈ 售罄', '2027 年储能'), (7, '+50%', '储能出货（巴克莱预计）'), (8, 'Robotaxi', '里程大涨')]
    for i, (t, big, lab) in enumerate(items):
        x, y = 120 + (i % 2) * 390, 170 + (i // 2) * 230; on = k >= t
        shadow_card(im, (x, y, x + 360, y + 200), 22)
        ctext(d, (x + 180, y + 80), big, font('k', 58 if len(big) < 6 else 46), GRN if on else '#D1D5DB'); ctext(d, (x + 180, y + 150), lab, font('m', 26), INK if on else '#D1D5DB')
def vis_spacex(im, d, k):
    for i, (n, c) in enumerate([('特斯拉', RED), ('SpaceX', BLUE)]):
        x = 140 + i * 400; shadow_card(im, (x, 260, x + 330, 520), 26); ctext(d, (x + 165, 390), n, font('k', 56), c)
    if k >= 2: rr(d, (250, 590, 730, 660), 35, '#EEF2FF'); ctext(d, (490, 625), '各自成立特别委员会', font('b', 32), BLUE)
    if k >= 4: rr(d, (250, 690, 730, 760), 35, '#ECFDF5'); ctext(d, (490, 725), '合并 → 可能有溢价', font('b', 32), GRN)
    if k >= 6: rr(d, (250, 790, 730, 860), 35, '#FEF2F2'); ctext(d, (490, 825), '条件还没谈拢', font('b', 32), RED)
def vis_week(im, d, k):
    cards = [(1, '10/21 周三', '发三季度财报', INK), (5, '10/22 周四', '股价 −3.1%', RED), (6, '10/23 周五', '收 372.22', INK), (6, '10/26 周一', '盘中 394.9', GRN)]
    for i, (t, a, b, c) in enumerate(cards):
        x, y = 120 + (i % 2) * 390, 190 + (i // 2) * 330; on = k >= t
        shadow_card(im, (x, y, x + 360, y + 280), 24)
        ctext(d, (x + 180, y + 80), a, font('b', 34), DIM if on else '#D1D5DB'); ctext(d, (x + 180, y + 180), b, font('k', 46), c if on else '#D1D5DB')
def vis_note(im, d, k):
    shadow_card(im, (100, 170, 880, 560)); ctext(d, (490, 220), '同一天（盘中）', font('b', 32), INK)
    for i, (n, v) in enumerate([('特斯拉', 6), ('Lucid', -4), ('Rivian', -2)]):
        y = 300 + i * 85; ctext(d, (230, y), n, font('b', 32), INK); w = abs(v) * 50
        d.rectangle((420, y - 22, 420 + w, y + 22) if v > 0 else (420 - 0, y - 22, 420 + w, y + 22), fill=GRN if v > 0 else RED); ctext(d, (440 + w, y), ('+' if v > 0 else '') + str(v) + '%', font('k', 32), GRN if v > 0 else RED, 'lm')
    if k >= 5:
        shadow_card(im, (100, 600, 880, 870)); ctext(d, (490, 650), '27 位分析师', font('b', 32), INK)
        for i, (n, c, lab) in enumerate([(13, GRN, '看好'), (12, '#9CA3AF', '中性'), (2, RED, '看空')]):
            x = 220 + i * 270; ctext(d, (x, 740), str(n), font('k', 64), c); ctext(d, (x, 810), lab, font('m', 28), INK)
def vis_next(im, d, k):
    shadow_card(im, (100, 170, 880, 870))
    for i, s in enumerate(['合并条件谈得拢吗？', 'Robotaxi 继续扩张吗？', '四季度交付回暖吗？']):
        y = 290 + i * 150; on = k >= 1 + i; c = GRN if on else '#D1D5DB'
        d.rounded_rectangle((150, y - 30, 210, y + 30), 10, outline=c, width=5)
        if on: d.line((162, y, 178, y + 16, 200, y - 18), fill=c, width=7)
        d.text((240, y), s, font=font('b', 38), fill=INK if on else '#D1D5DB', anchor='lm')
    if k >= 4: rr(d, (150, 740, 830, 830), 20, '#F3F4F6'); ctext(d, (490, 785), '信息整理，不构成投资建议', font('b', 34), INK)
VIS = dict(shot=vis_shot, barclays=vis_barclays, auto=vis_auto, spacex=vis_spacex, week=vis_week, note=vis_note, next=vis_next)

def frame(si, k):
    head, vis, lines = SEG[si]; im = Image.new('RGB', (W, H), BG); d = ImageDraw.Draw(im)
    d.rectangle((0, 0, W, 96), fill=CARD); d.rectangle((0, 96, W, 100), fill='#E5E1D8')
    d.text((60, 48), '美股 · 个股异动', font=font('k', 36), fill=INK, anchor='lm'); d.text((420, 48), '10 月 26 日 · 特斯拉 TSLA', font=font('m', 28), fill=DIM, anchor='lm')
    d.text((W - 60, 48), '信息整理，不构成投资建议', font=font('r', 24), fill=DIM, anchor='rm')
    VIS[vis](im, d, k); d = ImageDraw.Draw(im)
    # right column: heading + running list of lines spoken so far in this segment
    d.text((960, 150), head, font=font('k', 58), fill=INK); d.rectangle((960, 238, 1060, 246), fill=RED)
    f = font('m', 30); y = 290; shown = lines[:k + 1][-6:]
    for j, s in enumerate(shown):
        cur = j == len(shown) - 1
        for ln in wrap(s, f, 880, d):
            d.text((960, y), ln, font=f, fill=INK if cur else '#9CA3AF'); y += 46
        y += 14
    # bottom subtitle band with the current line
    s = lines[k]; fs = font('b', 46); ls = wrap(s, fs, 1700, d); bh = 70 * len(ls) + 40
    rr(d, (80, H - 40 - bh, W - 80, H - 40), 24, INK)
    for j, ln in enumerate(ls): ctext(d, (W // 2, H - 40 - bh + 55 + 70 * j), ln, fs, '#FFFFFF')
    return im

if __name__ == '__main__':
    os.makedirs('fr', exist_ok=True); os.makedirs('out', exist_ok=True); lst = []; t = 0
    for si, (h, v, lines) in enumerate(SEG):
        for k, s in enumerate(lines):
            p = 'fr/%02d_%02d.png' % (si, k); frame(si, k).save(p)
            dur = round(max(2.4, 0.6 + len(s) / 6.0), 2); lst.append((p, dur)); t += dur
    with open('fr/list.txt', 'w') as fo:
        for p, dur in lst: fo.write("file '%s'\nduration %.2f\n" % (os.path.basename(p), dur))
        fo.write("file '%s'\n" % os.path.basename(lst[-1][0]))
    print('frames', len(lst), 'duration %.1f s' % t)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', 'fr/list.txt', '-vf', 'fps=30,format=yuv420p', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '22', 'fr/video.mp4'], check=True)
    music = '/home/claude/claude-video/ws/kit/video-kit/music/vibe.mp3'
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', 'fr/video.mp4', '-stream_loop', '-1', '-i', music, '-filter_complex',
                    '[1:a]volume=0.35,afade=t=in:d=1.5,afade=t=out:st=%.2f:d=3,loudnorm=I=-20:TP=-2[a]' % (t - 3), '-map', '0:v', '-map', '[a]',
                    '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', 'out/特斯拉为什么涨-1026.mp4'], check=True)
    print('ok')
