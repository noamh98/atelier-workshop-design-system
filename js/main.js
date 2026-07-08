/* =====================================================================
   ATELIER Design System — runtime (Vanilla JS, no dependencies)
   Handles: theme, direction (RTL/LTR), reveal-on-scroll, count-up,
   progress fills, donut rendering, stroke draw triggering.
   ===================================================================== */
(function () {
  "use strict";

  const root = document.documentElement;
  const store = {
    get t() { try { return localStorage.getItem("atelier-theme"); } catch (e) { return null; } },
    set t(v) { try { localStorage.setItem("atelier-theme", v); } catch (e) {} },
    get d() { try { return localStorage.getItem("atelier-dir"); } catch (e) { return null; } },
    set d(v) { try { localStorage.setItem("atelier-dir", v); } catch (e) {} }
  };

  /* ---- Theme ---- */
  function applyTheme(t) {
    root.setAttribute("data-theme", t);
    store.t = t;
    document.querySelectorAll("[data-theme-label]").forEach(function (el) {
      el.textContent = t === "dark" ? "Dark" : "Light";
    });
  }
  function toggleTheme() {
    applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
  }

  /* ---- Direction ---- */
  function applyDir(d) {
    root.setAttribute("dir", d);
    store.d = d;
    document.querySelectorAll("[data-dir-label]").forEach(function (el) {
      el.textContent = d.toUpperCase();
    });
  }
  function toggleDir() {
    applyDir(root.getAttribute("dir") === "rtl" ? "ltr" : "rtl");
  }

  /* ---- Count-up numbers ---- */
  function countUp(el) {
    const target = parseFloat(el.getAttribute("data-count"));
    if (isNaN(target)) return;
    const dec = (el.getAttribute("data-count").split(".")[1] || "").length;
    const prefix = el.getAttribute("data-prefix") || "";
    const suffix = el.getAttribute("data-suffix") || "";
    const dur = 1100;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + (target * eased).toFixed(dec) + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = prefix + target.toFixed(dec) + suffix;
    }
    requestAnimationFrame(tick);
  }

  /* ---- Donut chart (SVG) ---- */
  function renderDonut(el) {
    const segs = JSON.parse(el.getAttribute("data-donut") || "[]");
    const size = 160, r = 60, cx = size / 2, cy = size / 2, C = 2 * Math.PI * r;
    const total = segs.reduce(function (s, x) { return s + x.value; }, 0) || 1;
    let offset = 0;
    const ns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 " + size + " " + size);
    svg.setAttribute("width", size); svg.setAttribute("height", size);
    const track = document.createElementNS(ns, "circle");
    track.setAttribute("cx", cx); track.setAttribute("cy", cy); track.setAttribute("r", r);
    track.setAttribute("fill", "none"); track.setAttribute("stroke", "var(--paper-2)"); track.setAttribute("stroke-width", 22);
    svg.appendChild(track);
    segs.forEach(function (s, i) {
      const frac = s.value / total;
      const c = document.createElementNS(ns, "circle");
      c.setAttribute("cx", cx); c.setAttribute("cy", cy); c.setAttribute("r", r);
      c.setAttribute("fill", "none"); c.setAttribute("stroke", s.color); c.setAttribute("stroke-width", 22);
      c.setAttribute("stroke-dasharray", (frac * C) + " " + C);
      c.setAttribute("stroke-dashoffset", -offset * C);
      c.setAttribute("transform", "rotate(-90 " + cx + " " + cy + ")");
      c.style.transition = "stroke-dasharray .9s " + getComputedStyle(root).getPropertyValue("--ease-out");
      svg.appendChild(c);
      offset += frac;
    });
    const label = document.createElementNS(ns, "text");
    label.setAttribute("x", cx); label.setAttribute("y", cy + 6);
    label.setAttribute("text-anchor", "middle"); label.setAttribute("font-size", "28");
    label.setAttribute("font-weight", "800"); label.setAttribute("fill", "var(--text)");
    label.textContent = el.getAttribute("data-center") || (Math.round((segs[0] ? segs[0].value / total : 0) * 100) + "%");
    svg.appendChild(label);
    el.appendChild(svg);
  }

  /* ---- Reveal on scroll ---- */
  const io = ("IntersectionObserver" in window) ? new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      const el = e.target;
      el.classList.add("is-in");
      if (el.hasAttribute("data-count")) countUp(el);
      if (el.hasAttribute("data-progress")) {
        const bar = el.querySelector("span");
        if (bar) bar.style.width = el.getAttribute("data-progress") + "%";
      }
      io.unobserve(el);
    });
  }, { threshold: 0.25, rootMargin: "0px 0px -8% 0px" }) : null;

  function observeAll() {
    document.querySelectorAll("[data-reveal],[data-stagger],[data-count],[data-progress],.slide-title,.marker-circle.auto,.freehand.auto").forEach(function (el) {
      if (io) io.observe(el);
      else { el.classList.add("is-in", "is-drawn"); if (el.hasAttribute("data-count")) countUp(el); }
    });
  }

  /* ---- Boot ---- */
  function boot() {
    applyTheme(store.t || (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
    applyDir(store.d || root.getAttribute("dir") || "ltr");
    document.querySelectorAll("[data-donut]").forEach(renderDonut);
    document.querySelectorAll("[data-action='theme']").forEach(function (b) { b.addEventListener("click", toggleTheme); });
    document.querySelectorAll("[data-action='dir']").forEach(function (b) { b.addEventListener("click", toggleDir); });
    document.querySelectorAll("[data-action='print']").forEach(function (b) { b.addEventListener("click", function () { window.print(); }); });
    observeAll();
  }

  // expose for templates
  window.Atelier = { applyTheme: applyTheme, applyDir: applyDir, toggleTheme: toggleTheme, toggleDir: toggleDir, renderDonut: renderDonut, observe: observeAll };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
