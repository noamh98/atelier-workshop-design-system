/* ============================================================
   MODULE · reveal
   IntersectionObserver-driven reveal / stagger / draw animations.
   Adds .is-in when an element scrolls into view. Respects
   prefers-reduced-motion (elements are shown immediately).
   ============================================================ */
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initReveal(scope = document) {
  const targets = scope.querySelectorAll('[data-reveal],[data-stagger],.draw,.marker-sweep,.drop');
  if (reduce || !('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('is-in'));
    return;
  }
  // Pre-measure SVG stroke lengths for the ink-draw effect
  scope.querySelectorAll('.draw').forEach(svg => {
    svg.querySelectorAll('path,polyline,circle').forEach(p => {
      try { p.style.setProperty('--len', Math.ceil(p.getTotalLength())); } catch { /* non-path */ }
    });
  });

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-in'); obs.unobserve(entry.target); }
    });
  }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });

  targets.forEach(el => io.observe(el));
}
