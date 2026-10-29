# -*- coding: utf-8 -*-
# 美股财报解读：谷歌 2026 年三季度（亮色、静态画面 + 字幕，快速出片）。python3 build.py -> out/谷歌财报-1028.mp4
import os, subprocess, math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

W, H = 1920, 1080
F = '/usr/share/fonts/opentype/noto/'
def font(w, s): return ImageFont.truetype(F + {'b': 'NotoSansCJK-Bold.ttc', 'k': 'NotoSansCJK-Black.ttc', 'r': 'NotoSansCJK-Regular.ttc', 'm': 'NotoSansCJK-Medium.ttc'}[w], s, index=2)  # index 2 = SC
BG, INK, DIM, RED, GRN, BLUE, GOLD, CARD = '#F6F4EF', '#1E2430', '#6B7280', '#E24B3B', '#16A34A', '#2563EB', '#D97706', '#FFFFFF'

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

SEG = [
 ('谷歌财报出了，盘后大跌', 'open', [
   '谷歌的三季度财报出来了。',
   '收入 1276 亿美元，比去年同期多了 25%。',
   '可股价在盘后一度跌了 9% 多，',
   '从 324.89 美元跌到 294 美元左右。',
   '收入涨了这么多，股价为什么反而大跌？',
   '先说好消息，再说坏消息。']),
 ('好消息一：云业务翻倍', 'cloud', [
   '第一个好消息：谷歌云。',
   '这个季度，谷歌云收入 307 亿美元，',
   '比一年前多了一倍还多。',
   '更重要的是赚钱：云业务的利润 111 亿美元，',
   '一年前只有 36 亿。',
   '手里没做完的云订单，有 5610 亿美元，',
   '公司说，一半以上会在两年内变成收入。']),
 ('好消息二：AI 和搜索都有人用', 'ai', [
   '第二个好消息：AI 真的有人在用。',
   'Gemini 的用户，已经到了 10 亿。',
   '大家担心 AI 会抢走搜索，',
   '可谷歌说，搜索次数的增速是五年来最快的。',
   'YouTube 广告收入 112 亿美元，也比去年多。']),
 ('坏消息一：利润没达标', 'eps', [
   '再说坏消息。第一个：利润没达标。',
   '每股赚了 2.12 美元，市场原本预期 3.02 美元，',
   '差了将近三成。',
   '主要原因，说出来有点意外：SpaceX。',
   '谷歌很早就投资了 SpaceX，',
   '三季度 SpaceX 的股价跌了，',
   '谷歌手里的股票，账面上亏了 80 多亿美元。',
   '这笔是账面亏损，不是真的花出去的钱，',
   '但它会直接算进利润里。',
   '其实看主业，谷歌这个季度的运营利润有 406 亿美元，',
   '利润率 31.8%，比去年同期还高。']),
 ('坏消息二：搜索在放缓', 'search', [
   '第二个坏消息：搜索收入的增长在放慢。',
   '搜索是谷歌最赚钱的生意，',
   '一季度增长 19%，二季度 17%，',
   '这个季度只有 12%。',
   '公司说，主要是汇率的影响。',
   '但连续两个季度放慢，市场还是会紧张。']),
 ('坏消息三：钱花得太快', 'capex', [
   '第三个坏消息：钱花得太快。',
   '这个季度，谷歌花在机房和芯片上的钱，',
   '有 514 亿美元，比一年前多了一倍还多。',
   '结果是：做生意赚进来的钱，减去这些投入，',
   '还倒亏了 91 亿美元，已经连续两个季度是负数。',
   '而且公司说，明年还要花得更多。',
   '说白了，买谷歌就是在押：这些钱，能不能像云业务一样，变成新的收入。']),
 ('持有的人要注意什么', 'note', [
   '那么，持有谷歌的人要注意什么？',
   '这次大跌，一半是 SpaceX 的账面亏损，',
   '一半是搜索放缓和花钱太快。',
   '真正在变强的，是谷歌云。',
   '下个季度可以盯三件事：',
   '搜索能不能止住放缓；',
   '云的订单还能不能继续涨；',
   '明年到底要花多少钱。']),
]

def bigcard(im, d, box, big, lab, col, sub=None, on=True, bs=72):
    shadow_card(im, box, 26); x = (box[0] + box[2]) // 2; h = box[3] - box[1]
    c = col if on else '#D1D5DB'; ctext(d, (x, box[1] + h * 0.42), big, font('k', bs), c); ctext(d, (x, box[1] + h * 0.78), lab, font('m', 28), INK if on else '#D1D5DB')
def vis_open(im, d, k):
    shadow_card(im, (100, 170, 880, 870)); ctext(d, (490, 240), 'Alphabet · GOOGL', font('b', 40), INK); ctext(d, (490, 295), '2026 年三季度财报', font('m', 28), DIM)
    ctext(d, (490, 420), '1276 亿美元', font('k', 76), GRN if k >= 1 else '#D1D5DB'); ctext(d, (490, 490), '收入 · 同比 +25%', font('m', 30), INK if k >= 1 else '#D1D5DB')
    if k >= 2:
        ctext(d, (490, 610), '盘后', font('m', 30), DIM); ctext(d, (300, 700), '324.89', font('k', 64), '#9CA3AF'); ctext(d, (490, 700), '→', font('k', 56), INK)
        ctext(d, (680, 700), '294.20', font('k', 64), RED if k >= 3 else '#9CA3AF'); rr(d, (330, 780, 650, 840), 30, '#FEF2F2'); ctext(d, (490, 810), '约 −9.4%', font('b', 32), RED)
    d.text((110, 890), '10 月 28 日收盘价与盘后价（美东 16:41）', font=font('r', 20), fill=DIM)
def vis_cloud(im, d, k):
    bigcard(im, d, (110, 170, 480, 420), '307 亿', '云收入（美元）', GRN, on=k >= 1)
    bigcard(im, d, (500, 170, 870, 420), '+103%', '比一年前', GRN, on=k >= 2)
    bigcard(im, d, (110, 450, 480, 700), '111 亿', '云利润（一年前 36 亿）', GRN, on=k >= 3)
    bigcard(im, d, (500, 450, 870, 700), '5610 亿', '没做完的订单', BLUE, on=k >= 5)
    if k >= 6: rr(d, (110, 740, 870, 830), 30, '#ECFDF5'); ctext(d, (490, 785), '一半以上两年内变成收入', font('b', 34), GRN)
def vis_ai(im, d, k):
    bigcard(im, d, (110, 170, 870, 420), '10 亿', 'Gemini 用户', BLUE, on=k >= 1, bs=96)
    bigcard(im, d, (110, 450, 480, 700), '5 年最快', '搜索次数增速', GRN, on=k >= 3, bs=60)
    bigcard(im, d, (500, 450, 870, 700), '112 亿', 'YouTube 广告（美元）', GRN, on=k >= 4)
def vis_eps(im, d, k):
    shadow_card(im, (100, 170, 880, 500)); ctext(d, (490, 220), '每股收益（美元）', font('b', 32), INK)
    for i, (v, lab, c) in enumerate([(3.02, '市场预期', '#9CA3AF'), (2.12, '实际', RED)]):
        y = 300 + i * 100; ctext(d, (220, y), lab, font('b', 30), INK); w = v * 140
        if k >= 1: d.rectangle((330, y - 26, 330 + w, y + 26), fill=c); ctext(d, (350 + w, y), '%.2f' % v, font('k', 34), c, 'lm')
    if k >= 2: ctext(d, (490, 460), '差了将近三成', font('b', 30), RED)
    if k >= 3:
        shadow_card(im, (100, 540, 880, 870)); ctext(d, (490, 600), 'SpaceX 投资 · 账面亏损', font('b', 34), INK)
        if k < 9:
            ctext(d, (490, 700), '−82 亿美元', font('k', 72), RED if k >= 6 else '#D1D5DB')
            if k >= 7: rr(d, (220, 780, 760, 840), 30, '#F3F4F6'); ctext(d, (490, 810), '不是现金，但算进利润', font('b', 30), INK)
        else:
            d.rectangle((110, 570, 870, 640), fill=CARD); ctext(d, (490, 600), '扣掉它看主业', font('b', 34), INK)
            ctext(d, (490, 700), '406 亿美元', font('k', 72), GRN); ctext(d, (490, 770), '运营利润', font('m', 28), INK)
            if k >= 10: rr(d, (180, 800, 800, 855), 28, '#ECFDF5'); ctext(d, (490, 828), '利润率 31.8%，比去年还高', font('b', 30), GRN)
def vis_search(im, d, k):
    shadow_card(im, (100, 170, 880, 870)); ctext(d, (490, 230), '搜索收入 · 同比增长', font('b', 34), INK)
    base = 760
    for i, (q, v) in enumerate([('一季度', 19), ('二季度', 17), ('三季度', 12)]):
        x = 260 + i * 230; on = k >= (2 if i < 2 else 3); h = v * 22
        d.rectangle((x - 70, base - h, x + 70, base), fill=(GRN if i < 2 else RED) if on else '#E5E7EB')
        ctext(d, (x, base - h - 36), '%d%%' % v, font('k', 44), (GRN if i < 2 else RED) if on else '#D1D5DB'); ctext(d, (x, base + 40), q, font('m', 28), INK)
    d.line((140, base, 840, base), fill='#CBD5E1', width=3)
def vis_capex(im, d, k):
    bigcard(im, d, (110, 170, 870, 420), '514 亿', '这个季度花在机房和芯片上（美元）', RED, on=k >= 2, bs=96)
    bigcard(im, d, (110, 450, 870, 700), '−91 亿', '赚进来的钱 − 投入（自由现金流）', RED, on=k >= 4, bs=96)
    if k == 5: rr(d, (110, 740, 870, 830), 30, '#FEF2F2'); ctext(d, (490, 785), '明年还要“大幅增加”', font('b', 34), RED)
    if k >= 6: rr(d, (110, 740, 870, 830), 30, '#EFF6FF'); ctext(d, (490, 785), '押的是：投入能否变成新收入', font('b', 34), BLUE)
def vis_note(im, d, k):
    shadow_card(im, (100, 170, 880, 470)); ctext(d, (490, 220), '这次大跌，来自', font('b', 32), INK)
    if k >= 1: ctext(d, (300, 330), 'SpaceX', font('k', 48), RED); ctext(d, (300, 400), '账面亏损', font('m', 28), INK)
    if k >= 2: ctext(d, (680, 330), '搜索 + 花钱', font('k', 48), RED); ctext(d, (680, 400), '放缓 · 烧钱', font('m', 28), INK)
    if k >= 3: rr(d, (100, 500, 880, 580), 30, '#ECFDF5'); ctext(d, (490, 540), '真正在变强的：谷歌云', font('b', 36), GRN)
    if k >= 4:
        shadow_card(im, (100, 610, 880, 900))
        for i, s in enumerate(['搜索止住放缓了吗？', '云订单还在涨吗？', '明年要花多少？']):
            y = 670 + i * 80; on = k >= 5 + i; c = GRN if on else '#D1D5DB'
            d.rounded_rectangle((150, y - 24, 198, y + 24), 8, outline=c, width=5)
            if on: d.line((160, y, 172, y + 13, 190, y - 14), fill=c, width=6)
            d.text((225, y), s, font=font('b', 34), fill=INK if on else '#D1D5DB', anchor='lm')
VIS = dict(open=vis_open, cloud=vis_cloud, ai=vis_ai, eps=vis_eps, search=vis_search, capex=vis_capex, note=vis_note)

def frame(si, k):
    head, vis, lines = SEG[si]; im = Image.new('RGB', (W, H), BG); d = ImageDraw.Draw(im)
    d.rectangle((0, 0, W, 96), fill=CARD); d.rectangle((0, 96, W, 100), fill='#E5E1D8')
    d.text((60, 48), '美股 · 财报解读', font=font('k', 36), fill=INK, anchor='lm'); d.text((420, 48), '10 月 28 日 · 谷歌 GOOGL', font=font('m', 28), fill=DIM, anchor='lm')
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

def align(vo, lst):
    """Each slide = one sentence. Find the pauses in the voice track and snap every sentence boundary to the pause
    nearest to where it should fall (by character count), so slides change exactly when the voice moves on."""
    import re
    r = subprocess.run(['ffmpeg', '-i', vo, '-af', 'silencedetect=noise=-35dB:d=0.18', '-f', 'null', '-'], capture_output=True, text=True).stderr
    vd = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', vo], capture_output=True, text=True).stdout)
    st = [float(x) for x in re.findall(r'silence_start: ([\d.]+)', r)]; en = [float(x) for x in re.findall(r'silence_end: ([\d.]+)', r)]
    sil = list(zip(st, en + [vd] * (len(st) - len(en))))
    t0 = sil[0][1] if sil and sil[0][0] < 0.05 else 0.0                       # leading silence
    t1 = sil[-1][0] if sil and sil[-1][1] >= vd - 0.05 else vd                 # trailing silence
    mids = [(a + b) / 2 for a, b in sil if a > t0 + 0.3 and b < t1 - 0.3]
    L = [s for h, v, ls in SEG for s in ls]; w = [max(2, len(re.sub(r'[\s，。、：；？！“”]', '', s))) for s in L]; tot = sum(w)
    # dynamic programming: pick N-1 of the pauses, in order, so each sentence's length best matches its character count
    N, M = len(L), len(mids); rate = (t1 - t0) / tot
    if M >= N - 1:
        P = [t0] + mids + [t1]; INF = float('inf')
        cost = [[INF] * (M + 2) for _ in range(N + 1)]; back = [[0] * (M + 2) for _ in range(N + 1)]; cost[0][0] = 0
        for i in range(1, N + 1):
            jr = [M + 1] if i == N else range(i, M + 1)
            for j in jr:
                for k in range(i - 1, j):
                    if cost[i - 1][k] == INF: continue
                    c = cost[i - 1][k] + ((P[j] - P[k]) - w[i - 1] * rate) ** 2
                    if c < cost[i][j]: cost[i][j], back[i][j] = c, k
        idx, j = [], M + 1
        for i in range(N, 0, -1): idx.append(j); j = back[i][j]
        idx = idx[::-1]; cuts = [0.0] + [P[j] for j in idx[:-1]]
    else:                                                                       # too few pauses: fall back to character share
        acc, cuts = 0, [0.0]
        for i in range(N - 1): acc += w[i]; cuts.append(t0 + (t1 - t0) * acc / tot)
    cuts.append(vd)
    return [(p, round(cuts[i + 1] - cuts[i], 3)) for i, (p, _) in enumerate(lst)], vd

if __name__ == '__main__':
    os.makedirs('fr', exist_ok=True); os.makedirs('out', exist_ok=True); lst = []; t = 0
    for si, (h, v, lines) in enumerate(SEG):
        for k, s in enumerate(lines):
            p = 'fr/%02d_%02d.png' % (si, k); frame(si, k).save(p)
            dur = round(max(2.4, 0.6 + len(s) / 6.0), 2); lst.append((p, dur)); t += dur
    # with a recorded voiceover (voice.* in this folder), stretch the slides to its length; music sits far under the voice
    vo = next((f for f in os.listdir('.') if f.startswith('voice.')), None)
    if vo and os.path.exists('cuts.json'):                                   # explicit slide start times (e.g. read off the editor's subtitles)
        import json; c = json.load(open('cuts.json')); S0 = c['starts'] + [c['end']]
        lst = [(p, round(S0[i + 1] - S0[i], 3)) for i, (p, _) in enumerate(lst)]; t = c['end']; print('cuts.json: %.1f s' % t)
    elif vo: lst, t = align(vo, lst); print('aligned to voice: %.1f s' % t)
    with open('fr/list.txt', 'w') as fo:
        for p, dur in lst: fo.write("file '%s'\nduration %.2f\n" % (os.path.basename(p), dur))
        fo.write("file '%s'\n" % os.path.basename(lst[-1][0]))
    print('frames', len(lst), 'duration %.1f s' % t)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', 'fr/list.txt', '-vf', 'fps=30,format=yuv420p', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '22', 'fr/video.mp4'], check=True)
    music = '/home/claude/claude-video/ws/kit/video-kit/music/vibe.mp3'
    if vo: fc, ins = '[2:a]atrim=0:%.2f,loudnorm=I=-16:TP=-2,aresample=44100,apad[v];' % t + '[1:a]aresample=44100,volume=0.08,afade=t=in:d=1.5,afade=t=out:st=%.2f:d=3[m];[v][m]amix=inputs=2:duration=longest:normalize=0,alimiter=limit=0.8:level=disabled,atrim=0:%.2f[a]' % (t - 3, t), ['-i', vo]
    else: fc, ins = '[1:a]volume=0.2,afade=t=in:d=1.5,afade=t=out:st=%.2f:d=3,loudnorm=I=-24:TP=-2[a]' % (t - 3), []
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', 'fr/video.mp4', '-stream_loop', '-1', '-i', music] + ins + ['-filter_complex', fc, '-map', '0:v', '-map', '[a]',
                    '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-t', '%.2f' % t, '-movflags', '+faststart', 'out/谷歌财报-1028.mp4'], check=True)
    print('ok')
