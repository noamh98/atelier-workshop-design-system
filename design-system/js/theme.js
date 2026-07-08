/* ============================================================
   MODULE · theme
   Controls the active theme + color scheme + text direction.
   State persists to localStorage. Pure DOM, no dependencies.
   ============================================================ */
const THEMES = ['workshop', 'glass', 'scandi', 'ai'];
const STORE = 'atelier:prefs';

const root = document.documentElement;

function load() {
  try { return JSON.parse(localStorage.getItem(STORE)) || {}; }
  catch { return {}; }
}
function save(prefs) {
  try { localStorage.setItem(STORE, JSON.stringify(prefs)); } catch { /* ignore */ }
}

export function setTheme(name) {
  if (!THEMES.includes(name)) return;
  root.setAttribute('data-theme', name);
  const prefs = load(); prefs.theme = name; save(prefs);
  document.querySelectorAll('[data-theme-name]').forEach(el => { el.textContent = name; });
}

export function setScheme(scheme) {
  root.setAttribute('data-scheme', scheme);
  const prefs = load(); prefs.scheme = scheme; save(prefs);
  document.querySelectorAll('[data-scheme-label]').forEach(el => {
    el.textContent = scheme === 'dark' ? 'Dark' : 'Light';
  });
}

export function toggleScheme() {
  setScheme(root.getAttribute('data-scheme') === 'dark' ? 'light' : 'dark');
}

export function setDir(dir) {
  root.setAttribute('dir', dir);
  const prefs = load(); prefs.dir = dir; save(prefs);
  document.querySelectorAll('[data-dir-label]').forEach(el => { el.textContent = dir.toUpperCase(); });
}

export function toggleDir() {
  setDir(root.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl');
}

/** Wire up any [data-action] controls and restore saved prefs. */
export function initTheme() {
  const prefs = load();
  if (prefs.theme) setTheme(prefs.theme);
  if (prefs.scheme) setScheme(prefs.scheme);
  // dir is normally set per-document (he vs en); only restore if user toggled
  if (prefs.dir && root.dataset.lockDir === undefined) setDir(prefs.dir);

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    switch (btn.dataset.action) {
      case 'theme': toggleScheme(); break;
      case 'dir': toggleDir(); break;
      case 'print': window.print(); break;
      case 'set-theme': setTheme(btn.dataset.theme); break;
    }
  });
}
