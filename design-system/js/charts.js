/* ============================================================
   MODULE · charts
   Renders dependency-free donut charts from a data attribute.
   Markup:  <div class="donut" data-center="62%"
                 data-donut='[{"value":62,"color":"#7b5cd6"}, …]'></div>
   Bars/line charts are pure CSS/SVG markup (see charts.css).
   ============================================================ */
const NS = 'http://www.w3.org/2000/svg';

function renderDonut(el) {
  let data;
  try { data = JSON.parse(el.dataset.donut); } catch { return; }
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const size = 36, r = 15.5, c = 2 * Math.PI * r; // 36-unit viewBox
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${size} ${size}`);

  const track = document.createElementNS(NS, 'circle');
  track.setAttribute('class', 'donut__track');
  track.setAttribute('cx', size / 2); track.setAttribute('cy', size / 2); track.setAttribute('r', r);
  track.setAttribute('fill', 'none'); track.setAttribute('stroke-width', '4');
  svg.appendChild(track);

  let offset = 0;
  data.forEach(d => {
    const seg = document.createElementNS(NS, 'circle');
    const len = (d.value / total) * c;
    seg.setAttribute('cx', size / 2); seg.setAttribute('cy', size / 2); seg.setAttribute('r', r);
    seg.setAttribute('fill', 'none'); seg.setAttribute('stroke', d.color);
    seg.setAttribute('stroke-width', '4'); seg.setAttribute('stroke-linecap', 'butt');
    seg.setAttribute('stroke-dasharray', `${len} ${c - len}`);
    seg.setAttribute('stroke-dashoffset', -offset);
    seg.style.transition = 'stroke-dasharray .9s cubic-bezier(.2,0,0,1)';
    svg.appendChild(seg);
    offset += len;
  });

  if (el.dataset.center) {
    const txt = document.createElementNS(NS, 'text');
    txt.setAttribute('class', 'donut__center');
    txt.setAttribute('x', size / 2); txt.setAttribute('y', size / 2);
    txt.setAttribute('text-anchor', 'middle'); txt.setAttribute('dominant-baseline', 'central');
    txt.textContent = el.dataset.center;
    svg.appendChild(txt);
  }
  el.replaceChildren(svg);
}

export function initCharts(scope = document) {
  scope.querySelectorAll('.donut[data-donut]').forEach(renderDonut);
}
