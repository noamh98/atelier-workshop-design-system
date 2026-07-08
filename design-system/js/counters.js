/* ============================================================
   MODULE · counters
   Animated count-up for KPI values + progress-bar fills.
   Triggered when the element enters the viewport.
   Markup:  <div class="kpi__value" data-count="62" data-suffix="%"
                 data-prefix="₪" data-decimals="1">0</div>
            <div class="progress" data-progress="72"><span></span></div>
   ============================================================ */
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

function animateCount(el) {
  const target = parseFloat(el.dataset.count || '0');
  const decimals = parseInt(el.dataset.decimals ?? (String(target).includes('.') ? 1 : 0), 10);
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const dur = 1100;
  if (reduce) { el.textContent = prefix + target.toFixed(decimals) + suffix; return; }
  const start = performance.now();
  function frame(now) {
    const t = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
    el.textContent = prefix + (target * eased).toFixed(decimals) + suffix;
    if (t < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

export function initCounters(scope = document) {
  const counts = scope.querySelectorAll('[data-count]');
  const bars = scope.querySelectorAll('[data-progress]');

  if (!('IntersectionObserver' in window)) {
    counts.forEach(animateCount);
    bars.forEach(b => { const s = b.querySelector('span'); if (s) s.style.inlineSize = b.dataset.progress + '%'; });
    return;
  }
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      if (el.hasAttribute('data-count')) animateCount(el);
      if (el.hasAttribute('data-progress')) {
        const span = el.querySelector('span');
        if (span) span.style.inlineSize = el.dataset.progress + '%';
      }
      obs.unobserve(el);
    });
  }, { threshold: 0.4 });

  counts.forEach(el => io.observe(el));
  bars.forEach(el => io.observe(el));
}
