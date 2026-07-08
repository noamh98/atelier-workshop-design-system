/* ============================================================
   ATELIER · JS ENTRY
   Auto-initializes the runtime for any page that imports it:
       <script type="module" src="…/js/index.js"></script>
   Deck mode is opt-in per page:
       import { initDeck } from '…/js/deck.js'; initDeck();
   All modules are tree-shakeable and dependency-free.
   ============================================================ */
import { initTheme } from './theme.js';
import { initReveal } from './reveal.js';
import { initCounters } from './counters.js';
import { initCharts } from './charts.js';

export { setTheme, setScheme, setDir, toggleScheme, toggleDir } from './theme.js';
export { initReveal } from './reveal.js';
export { initCounters } from './counters.js';
export { initCharts } from './charts.js';
export { initDeck } from './deck.js';

/** Boot the standard component runtime. */
export function init(scope = document) {
  initTheme();
  initReveal(scope);
  initCounters(scope);
  initCharts(scope);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => init());
} else {
  init();
}
