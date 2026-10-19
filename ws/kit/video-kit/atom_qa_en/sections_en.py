# -*- coding: utf-8 -*-
def row(claim, st, note):
    cls = {'Verified': 'ok', 'Common knowledge': 'ok', 'Simplified': 'warn', 'Paraphrased': 'warn', 'Uncertain': 'warn'}[st]
    return f'      <tr><td>{claim}</td><td><span class="badge {cls}">{st}</span></td><td>{note}</td></tr>\n'

rows = ''
rows += row('An electron circling the nucleus keeps changing direction, so it is accelerating', 'Common knowledge', 'In circular motion the velocity direction keeps changing even at constant speed, so there is a centripetal acceleration.')
rows += row('An accelerating charged particle radiates electromagnetic waves, so an electron on a classical orbit would keep losing energy', 'Verified', 'This was understood by 1897. The Wikipedia article on the Bohr model says the same: accelerating charges radiate, so an orbiting electron is mechanically unstable.')
rows += row('In hydrogen, an electron falling from the Bohr radius onto the nucleus takes about 1.6×10⁻¹¹ s under classical radiation', 'Verified', 'The cited paper gives t = a₀³ / (4 r₀² c) ≈ 1.6×10⁻¹¹ s (a₀ = 5.3×10⁻¹¹ m, r₀ = 2.8×10⁻¹⁵ m is the classical electron radius). I recomputed it from the constants and got 1.56×10⁻¹¹ s.')
rows += row('That figure is “the simplest estimate”', 'Simplified', 'The paper assumes a near-circular orbit, non-relativistic motion and electric-dipole radiation only. The real fall would not differ by many orders of magnitude; the video says “the order of magnitude is right.”')
rows += row('“One blink is long enough for billions of collapses”', 'Simplified', 'Taking a blink as about 0.1 s: 0.1 ÷ 1.6×10⁻¹¹ ≈ 6×10⁹, i.e. billions.')
rows += row('The atom is tens of thousands of times wider than its nucleus; scale it to a 100 m stadium and the nucleus is a grain of rice', 'Simplified', 'Hydrogen radius 5.3×10⁻¹¹ m, proton radius about 0.84×10⁻¹⁵ m, ratio about 6×10⁴; 100 m ÷ 6×10⁴ ≈ 1.6 mm, the size of a rice grain. Heavier nuclei are larger, so the ratio runs from tens of thousands to about a hundred thousand.')
rows += row('On the classical Bohr orbit the electron in hydrogen circles about 6.6×10¹⁵ times a second (6.6 quadrillion)', 'Verified', 'From the Coulomb force the orbital speed is about 2.19×10⁶ m/s and the period about 1.52×10⁻¹⁶ s; I computed this myself. It is a number from the classical picture; a real electron has no such orbit.')
rows += row('A 70 kg person contains roughly 7×10²⁷ atoms (7 octillion)', 'Verified', 'The Jefferson Lab education page states “A 70 kg body would have approximately 7×10²⁷ atoms.” This is an order-of-magnitude estimate.')
rows += row('Hydrogen has been stable in the universe for over ten billion years; prediction and fact differ by about 28 orders of magnitude', 'Simplified', 'The universe is about 13.8 billion years old (4.4×10¹⁷ s); 4.4×10¹⁷ ÷ 1.6×10⁻¹¹ ≈ 3×10²⁸. “Stable” means no spontaneous atomic collapse has ever been observed, not that every hydrogen atom is 13.8 billion years old.')
rows += row('Hydrogen’s visible spectrum has a few sharp lines: 656.3, 486.1, 434.0, 410.2 nm (the Balmer series); the empirical formula dates from 1885', 'Verified', 'The Wikipedia article on the hydrogen spectral series gives these four wavelengths; Balmer’s formula was published in 1885.')
rows += row('Classical theory predicts a continuous spectrum', 'Simplified', 'As the electron spirals in, its orbital frequency changes continuously, so the radiated frequency would too, giving a continuous range of colors. This is a common textbook argument; the video only states the conclusion.')
rows += row('The 1913 patch: electrons only on certain orbits, no radiation on an orbit, one packet of light emitted or absorbed per jump; it reproduces hydrogen’s lines', 'Verified', 'Wikipedia, “Bohr model”: stationary orbits, quantized angular momentum, photon emission on jumps; it successfully explained hydrogen’s Lyman, Balmer and Paschen series.')
rows += row('The rule fails for helium; it is a rule, not an explanation', 'Verified', 'Same article: it does not work for (neutral) helium and cannot explain the energy levels of multi-electron atoms.')
rows += row('The 1924 idea: the electron behaves like a wave, and a wave going around an orbit must fit a whole number of wavelengths', 'Verified', 'The orbit condition was later rewritten as a standing-wave condition: the orbit must hold a whole number of wavelengths (Wikipedia, “Bohr model”).')
rows += row('“The electron is a wave”', 'Simplified', 'In modern quantum mechanics the electron is neither a little ball nor a water wave but a quantum object obeying a wave equation, sometimes wave-like and sometimes particle-like. The video uses “wave” as the most accessible picture and does not go into wave functions or probability.')
rows += row('Squeezing the electron toward the nucleus makes its position narrower and its kinetic energy higher; the two balance near 0.05 nm, the size of hydrogen', 'Simplified', 'A heuristic estimate: take momentum about ħ/r, total energy E = ħ²/(2mr²) − e²/(4πε₀r); the minimum is at r = 4πε₀ħ²/(me²) = 0.0529 nm, E = −13.6 eV. It agrees with the exact hydrogen ground state, but the derivation is not rigorous.')
rows += row('Electrons obey the Pauli exclusion principle: no two in the same state; each orbital holds at most two electrons of opposite spin, which builds the shells and the periodic table', 'Verified', 'Wikipedia, “Pauli exclusion principle”: proposed in 1925; helium’s two electrons share 1s with opposite spins, lithium’s third must go to 2s; elements with the same outer-shell count behave alike.')
rows += row('The Pauli principle also gives matter its volume and stability; a rigorous mathematical proof came in 1967', 'Verified', 'Wikipedia, “Pauli exclusion principle” and “Stability of matter”: the first rigorous proof by two mathematical physicists in 1967–1968, with a simpler proof in 1975.')
rows += row('The pictures of atoms, electrons, orbits, waves and energy curves', 'Simplified', 'All schematic: sizes of nucleus and electron, orbit radii, speeds and animation rates are not to scale; “orbit” itself is a classical and old-quantum picture.')
check = f"""    <section>
    <h2 class="sec">Fact check</h2>
    <p class="hint">Each claim in the video and how it was checked. “Verified” means I found it in the cited sources or recomputed it from public physical constants; “Simplified” means the video generalizes for clarity, and the more precise version is written here. I read the web pages and paper abstracts, not every source in full.</p>
    <div class="tablewrap"><table><thead><tr><th>Claim</th><th>Status</th><th>Notes</th></tr></thead><tbody>
{rows}    </tbody></table></div>
  </section>
"""

sound = """  <section>
    <h2 class="sec">Sound design</h2>
    <p class="hint">The music is “Entropy” (Original), a constant 150 BPM in F minor. I re-cut it by whole bars to the length of this video: intro, groove, breakdown, groove returns, quiet bed, climax, outro. Every scene change and every subtitle change lands on its beat, and the first subtitle of each scene appears a second or two after the picture. A light layer of synthesized sound effects, transposed into the music’s key, sits on top.</p>
    <div class="tablewrap"><table><thead><tr><th>Layer</th><th>How</th><th>Where it falls</th></tr></thead><tbody>
      <tr><td>Music: Entropy</td><td>Cut into bars and rejoined; seams use a 0.15 s equal-power crossfade with the highs rolled off slightly; scene changes snap to 0.4 s beats, chapter pages and big moments to 1.6 s bars</td><td>Intro under the opening; the groove enters at “the atom”; the breakdown under “the collapse”; the groove returns at “but it stands”; a quiet bed under “the patch”; the first beat of the climax lands on “the electron is a wave”; the outro under the recap</td></tr>
      <tr><td>Chord bed</td><td>Sawtooth plus sine, low-passed and slowly swaying; shifted down six semitones to A♭ major (the relative major of F minor), with a deep sine underneath</td><td>One chord per scene, kept in harmony with the music</td></tr>
      <tr><td>Glass chimes</td><td>Pentatonic scale, four overtones, 1–3 s decay, long reverb</td><td>One chime on every other subtitle, snapped to the nearest eighth note</td></tr>
      <tr><td>Transitions</td><td>A rising swell into each chapter page, landing on a deep sub-bass hit and three bell tones; a soft whoosh before ordinary scene changes</td><td>The six chapter pages and every scene change</td></tr>
      <tr><td>Picture effects</td><td>Short synthesized pings, pops, thumps and ticks</td><td>The collapse flash, numbers appearing, everything vanishing, the electron being pushed back</td></tr>
      <tr><td>Wind</td><td>Pink noise, band-pass filtered and swaying</td><td>The opening and the final recap</td></tr>
      <tr><td>Shimmer</td><td>Tiny high sine twinkles</td><td>The two “patch” scenes</td></tr>
    </tbody></table></div>
  </section>
"""

gloss = """  <section>
    <h2 class="sec">Glossary</h2>
    <dl class="gl">
      <dt>Nucleus / electron</dt><dd>The positively charged core of an atom and the very light, negatively charged electrons outside it. The nucleus pulls the electrons in with electric attraction.</dd>
      <dt>Radiation (electromagnetic waves)</dt><dd>Waves a charged particle sends out when it accelerates. Light, radio and phone signals are all electromagnetic waves, and they carry energy away.</dd>
      <dt>Classical physics</dt><dd>Physics before quantum theory: Newton’s mechanics plus electromagnetism. Here it means the picture of electrons circling the nucleus like little balls.</dd>
      <dt>Spectrum</dt><dd>What you get when light is split by color. Hydrogen’s light has a few sharp lines, not a continuous rainbow.</dd>
      <dt>Order of magnitude</dt><dd>A factor of ten. “28 orders of magnitude apart” means a factor of 10²⁸.</dd>
      <dt>Standing wave</dt><dd>A wave fixed at both ends, like a guitar string, which can only hold whole numbers of half-wavelengths. A wave circling a nucleus joins up with itself, so it can only hold whole numbers of wavelengths.</dd>
      <dt>Pauli exclusion principle</dt><dd>Two electrons cannot be in the same quantum state. One orbital holds at most two electrons, with opposite spins.</dd>
    </dl>
  </section>
"""

SRC = [
    ('Paper: classical lifetime of a hydrogen atom', 'home.agh.edu.pl · the 1.6×10⁻¹¹ s formula', 'https://home.agh.edu.pl/~czapli/Classical%20Lifetime%20of%20a%20Bohr%20Atom_Olsen.pdf'),
    ('Wikipedia: Bohr model', 'en.wikipedia.org · history 1911–1924 and limits', 'https://en.wikipedia.org/wiki/Bohr_model'),
    ('Wikipedia: Hydrogen spectral series', 'en.wikipedia.org · Balmer wavelengths', 'https://en.wikipedia.org/wiki/Hydrogen_spectral_series'),
    ('Wikipedia: Pauli exclusion principle', 'en.wikipedia.org · 1925, shells and stability', 'https://en.wikipedia.org/wiki/Pauli_exclusion_principle'),
    ('Wikipedia: Stability of matter', 'en.wikipedia.org · proofs 1967–1975', 'https://en.wikipedia.org/wiki/Stability_of_matter'),
    ('Jefferson Lab: atoms in the human body', 'education.jlab.org · 7×10²⁷', 'https://education.jlab.org/qa/mathatom_04.html'),
]
srcs = ''.join(f'      <li><span class="nm">{n}</span> <span>{d}</span><br><a href="{u}" target="_blank" rel="noopener">{u}</a></li>\n' for n, d, u in SRC)
srcsec = f"""  <section>
    <h2 class="sec">Sources</h2>
    <ul class="srcs">
{srcs}    </ul>
    <p class="hint" style="margin-top:12px">The video is compiled from these public sources; some numbers I recomputed from public constants, and the fact-check table above says which. All pictures are schematic.</p>
  </section>
"""
