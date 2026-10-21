// 本片所有公式（MathJax TeX）。金色 = 这一步变化的地方。
const TEX = {
  title_sum: "f(x)\\approx\\sum_{n=0}^{N}\\frac{f^{(n)}(a)}{n!}\\,(x-a)^n",
  l_fx: 'f(x)', l_x: 'x', l_y: 'y', l_a: 'a', l_ah: 'a+h', l_h: 'h', l_fa: 'f(a)', l_fah: 'f(a+h)', l_dy: 'f(a+h)-f(a)',
  l_yfa: 'y=f(a)', l_sq: 'y=x^2', l_tan: 'y=1+2(x-1)', l_one: '1', l_x1: 'x=1.1', l_x5: 'x=1.5',
  // ① 导数
  d_slope: "\\frac{f(a+h)-f(a)}{h}",
  d_lim: "\\lim_{h\\to 0}\\frac{f(a+h)-f(a)}{h}\\;\\equiv\\;{\\color{#FFC857}{f'(a)}}",
  // 例子 x^2
  ex_head: "f(x)=x^2,\\qquad a=1",
  ex1: "\\frac{f(1+h)-f(1)}{h}=\\frac{(1+h)^2-1}{h}",
  ex2: "=\\frac{{\\color{#FFC857}{1+2h+h^2}}-1}{h}=\\frac{2h+h^2}{h}",
  ex3: "={\\color{#FFC857}{2+h}}",
  ex4: "\\xrightarrow{\\;h\\to 0\\;}\\;2\\qquad\\Longrightarrow\\qquad {\\color{#FFC857}{f'(1)=2}}",
  ex_q: "\\frac{f(1+h)-f(1)}{h}",
  // ② 零次近似
  z1: "f(x)\\approx f(a)",
  // ③ 一次近似（笔记原样四行）
  eA: "x=a+h,\\qquad h=x-a",
  eB1: "f'(a)=\\lim_{h\\to 0}\\frac{f(a+h)-f(a)}{h}",
  eB2: "f'(a){\\color{#FFC857}{\\;\\approx\\;}}\\frac{f(a+h)-f(a)}{h}",
  eB3: "\\;\\approx\\;\\frac{f({\\color{#FFC857}{x}})-f(a)}{{\\color{#FFC857}{x-a}}}",
  eC: "f'(a){\\color{#FFC857}{(x-a)}}\\approx f(x)-f(a)",
  eD: "f(x)\\approx {\\color{#FFC857}{f(a)}}+f'(a)(x-a)",
  eD_plain: "f(x)\\approx f(a)+f'(a)(x-a)",
  // 检验
  sq_head: "f(x)=x^2,\\quad a=1",
  sq_err: "x^2-\\big[\\,1+2(x-1)\\,\\big]={\\color{#FFC857}{(x-1)^2}}",
  n2: "f(x)\\approx f(a)+f'(a)(x-a){\\color{#FFC857}{\\;+\\;\\frac{f''(a)}{2}(x-a)^2}}",
};
