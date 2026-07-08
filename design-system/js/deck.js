/* ============================================================
   MODULE · deck
   Presentation navigation for pages composed of <section class="slide">
   (or [data-slide]). Adds keyboard shortcuts, a nav control, a
   progress rail, and smooth scroll/transition between slides.
   Opt-in: call initDeck() only on deck pages.
   Keys: ← / → / Space / Home / End / F (fullscreen) / P (print)
   ============================================================ */
export function initDeck({ selector = '.slide, [data-slide]' } = {}) {
  const slides = Array.from(document.querySelectorAll(selector));
  if (!slides.length) return;

  let index = 0;
  const nav = document.querySelector('.deck-nav');
  const count = nav?.querySelector('.deck-nav__count');
  const progress = document.querySelector('.deck-progress > span');

  slides.forEach((s, i) => {
    s.setAttribute('tabindex', '-1');
    s.setAttribute('role', 'group');
    s.setAttribute('aria-roledescription', 'slide');
    s.setAttribute('aria-label', `Slide ${i + 1} of ${slides.length}`);
  });

  function update() {
    if (count) count.textContent = `${index + 1} / ${slides.length}`;
    if (progress) progress.style.inlineSize = `${((index + 1) / slides.length) * 100}%`;
  }
  function go(to, scroll = true) {
    index = Math.max(0, Math.min(slides.length - 1, to));
    if (scroll) slides[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
    slides[index].focus({ preventScroll: true });
    update();
  }
  const next = () => go(index + 1);
  const prev = () => go(index - 1);

  document.addEventListener('keydown', (e) => {
    if (e.target.matches('input,textarea,select')) return;
    switch (e.key) {
      case 'ArrowRight': case 'PageDown': case ' ': e.preventDefault(); next(); break;
      case 'ArrowLeft': case 'PageUp': e.preventDefault(); prev(); break;
      case 'Home': e.preventDefault(); go(0); break;
      case 'End': e.preventDefault(); go(slides.length - 1); break;
      case 'f': case 'F':
        if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
        else document.exitFullscreen?.();
        break;
      case 'p': case 'P': if (!e.metaKey && !e.ctrlKey) { e.preventDefault(); window.print(); } break;
    }
  });

  nav?.addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.deck === 'next') next();
    if (b.dataset.deck === 'prev') prev();
  });

  // Track active slide while scrolling
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { index = slides.indexOf(entry.target); update(); }
      });
    }, { threshold: 0.55 });
    slides.forEach(s => io.observe(s));
  }

  update();
  return { next, prev, go };
}
