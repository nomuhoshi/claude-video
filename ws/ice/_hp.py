# Assemble /home/claude/solid-heat.html from css_base.txt, css_new.txt, the scene markup below, and engine.js
import re, sys
D = '/tmp/claude-0/-home-claude/7d578916-a400-5c24-bb34-8996a1a97376/scratchpad/ice/'
base = open(D + 'css_base.txt', encoding='utf-8').read().split('\n')   # 213 lines of the TSMC head + css
new_css = open(D + 'css_new.txt', encoding='utf-8').read()
engine = open(D + 'engine.js', encoding='utf-8').read()

def lines(a, b):  # 1-based inclusive
    return '\n'.join(base[a - 1:b])

head = '<title>冰下的幽灵</title>\n' + lines(2, 3) + '\n<style>\n'
css = lines(5, 59) + '\n' + lines(60, 77) + '\n' + lines(84, 99) + '\n' + lines(171, 212) + '\n' + new_css + '\n</style>\n'
# drop the download-progress row styles that the physics page does not use
css = re.sub(r'\.dlrow[^\n]*\n', '', css)

def chap(start, end, word, en, sub):
    return f'''
        <div class="scene chap" data-start="{start}" data-end="{end}">
          <i class="vline" data-a="0,0.5"></i>
          <div class="flash" data-a="0.35,0.8"></div>
          <div class="parts" data-a="0.35,2.6"></div>
          <div class="wordbox"><span class="word" data-a="0.35,0.4">{word}</span></div>
          <p class="en" data-a="0.9,0.6">{en}</p>
          <p class="csub" data-a="1.2,0.6">{sub}</p>
        </div>
'''

