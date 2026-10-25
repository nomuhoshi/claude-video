# -*- coding: utf-8 -*-
# id -> LaTeX. Colour macros: \gd{} gold, \bl{} blue, \rd{} red (see render_forms.js). Rendered by KaTeX to transparent PNGs.
FORMS = {
 # --- self energy
 'U':      r'U=\dfrac{e^{2}}{8\pi\varepsilon_{0}\,r}',
 'Uinf':   r'r\to0\;\Longrightarrow\;U\to\rd{\infty}',
 're':     r'U=mc^{2}\;\Rightarrow\;r=\dfrac{e^{2}}{8\pi\varepsilon_{0}mc^{2}}=\dfrac{r_e}{2}\approx\gd{1.4\ \mathrm{fm}}',
 're2':    r'r_e=\dfrac{e^{2}}{4\pi\varepsilon_{0}mc^{2}}\approx2.8\ \mathrm{fm}',
 'zpe':    r'E_0=\sum_{\mathbf k}\tfrac12\hbar\omega_{\mathbf k}\;\to\;\rd{\infty}',
 # --- radiation reaction
 'larmor': r'P=\dfrac{e^{2}a^{2}}{6\pi\varepsilon_{0}c^{3}}',
 # --- action
 'S1':     r'S=\sum_i m_i\!\int\! d\tau_i',
 'S2':     r'+\;\tfrac12\sum_{i\neq j}e_ie_j\!\iint\!\delta\!\left(I_{ij}^{2}\right)\,dx_i\!\cdot\!dx_j',
 'I2':     r'I_{12}^{2}=c^{2}(t_1-t_2)^{2}-|\mathbf r_1-\mathbf r_2|^{2}',
 'dI':     r'\delta\!\left(I_{12}^{2}\right)\ne0\;\Longleftrightarrow\;t_1-t_2=\pm\dfrac{|\mathbf r_1-\mathbf r_2|}{c}',
 'ineqj':  r'i\neq j',
 # --- hamiltonian / schrodinger
 'sch':    r'i\hbar\,\partial_t\psi=\hat H\psi',
 # --- Dirac / Jehle
 'dirac1': r'K(x\!+\!\delta x,\,x)\ \ \text{“对应于”}\ \ \exp\!\Big[\dfrac{i}{\hbar}\,\varepsilon L\Big]',
 'dirac2': r'K(x\!+\!\delta x,\,x)=\dfrac{1}{A}\,\exp\!\Big[\dfrac{i}{\hbar}\,\varepsilon L\Big]',
 'Lag':    r'L=\tfrac12 m\dot x^{2}-V(x)',
 # --- slicing derivation
 'sl1':    r'\psi(x,t\!+\!\varepsilon)=\displaystyle\int\!\dfrac{dy}{A}\;\exp\!\Big\{\dfrac{i}{\hbar}\Big[\dfrac{m(x-y)^{2}}{2\varepsilon}-\varepsilon V(x)\Big]\Big\}\,\psi(y,t)',
 'sl2':    r'y=x+\eta:\qquad\int e^{\,im\eta^{2}/2\hbar\varepsilon}\,d\eta=\sqrt{\dfrac{2\pi i\hbar\varepsilon}{m}}\equiv A,\qquad\langle\eta^{2}\rangle=\dfrac{i\hbar\varepsilon}{m}',
 'sl3':    r'\psi+\varepsilon\,\partial_t\psi=\Big(1-\dfrac{i\varepsilon V}{\hbar}\Big)\Big[\psi+\dfrac{i\hbar\varepsilon}{2m}\,\partial_x^{2}\psi\Big]',
 'sl4':    r'i\hbar\,\partial_t\psi=-\dfrac{\hbar^{2}}{2m}\,\partial_x^{2}\psi+V\psi',
 'sl_note':r'\eta\ \text{的奇次项积分为 }0',
 # --- sum over paths
 'Kslice': r'K(B,A)=\lim_{N\to\infty}\!\int\!\!\cdots\!\!\int\prod_{k=1}^{N-1}\dfrac{dx_k}{A}\;\exp\!\Big[\dfrac{i}{\hbar}\sum_k\varepsilon L_k\Big]',
 'Kpath':  r'K(B,A)=\gd{\int\mathcal{D}x(t)}\;e^{\,iS[x(t)]/\hbar}',
 'Sx':     r'S[x]=\int_{t_A}^{t_B}L\,dt',
 'amp':    r'e^{\,iS[x]/\hbar}',
 'prob':   r'P(A\to B)=\left|K(B,A)\right|^{2}',
 # --- stationary phase
 'sp1':    r'\dfrac{S}{\hbar}\gg1\ \Longrightarrow\ \text{相位转得极快}',
 'sp2':    r'S[x_{\rm cl}+\delta x]=S[x_{\rm cl}]+\tfrac12\,\delta^{2}S+\cdots',
 'sp3':    r'\delta S=0\ \Longleftrightarrow\ \text{最小作用量原理}',
 'sp4':    r'K\approx\sum_{\rm cl}e^{\,iS_{\rm cl}/\hbar}\ \ (\hbar\to0)',
 # --- two slits
 'slit1':  r'\psi=\psi_1+\psi_2',
 'slit2':  r'|\psi|^{2}=|\psi_1|^{2}+|\psi_2|^{2}+2\,\mathrm{Re}\,\psi_1^{*}\psi_2',
 # --- renormalisation
 'ren1':   r'm_{\rm phys}=m_0+\delta m',
 'ren2':   r'\delta m\simeq\dfrac{3\alpha}{4\pi}\,m\,\ln\dfrac{\Lambda^{2}}{m^{2}}',
 'alpha':  r'\alpha=\dfrac{e^{2}}{4\pi\varepsilon_{0}\hbar c}\approx\dfrac{1}{137}',
 'lamb':   r'\Delta\nu\approx1058\ \mathrm{MHz}',
 'cut1':   r'\delta\!\left(I^{2}\right)\ \to\ f\!\left(I^{2};a\right)',
 'cut2':   r'\delta m\ \propto\ \ln a\ \ (\text{有限})',
 'unit':   r'\sum_{\rm outcomes}P\;\ne\;1',
 # --- feynman diagrams
 'series': r'\mathcal M=c_1\,\alpha+c_2\,\alpha^{2}+c_3\,\alpha^{3}+\cdots',
 # --- three formulations
 'v1':     r'i\hbar\,\partial_t\psi=\hat H\psi',
 'v2':     r'\dfrac{d\hat A}{dt}=\dfrac{i}{\hbar}\,[\hat H,\hat A]',
 'v3':     r'K=\int\mathcal{D}x\;e^{\,iS/\hbar}',
 'En':     r'E_n=\hbar\omega\left(n+\tfrac12\right)',
 'hero':   r'\int\mathcal{D}x\;e^{\,iS[x]/\hbar}',
}
