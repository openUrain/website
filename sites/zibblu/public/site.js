(() => {
const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());

const motion = matchMedia('(prefers-reduced-motion: no-preference)');
const finePointer = matchMedia('(hover: hover) and (pointer: fine)');

/* Sticky dark-glass header elevation state */
const header = document.querySelector('[data-site-header]');
if (header) {
  let ticking = false;
  const updateHeader = () => {
    header.dataset.scrolled = window.scrollY > 16 ? 'true' : 'false';
    ticking = false;
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateHeader);
      }
    },
    { passive: true },
  );
  updateHeader();
}

/* Scroll-driven reveal choreography */
const running = new Map();
if ('IntersectionObserver' in window && Element.prototype.animate) {
  const observer = new IntersectionObserver(
    (entries) => {
      let stagger = 0;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const target = entry.target;
        observer.unobserve(target);
        if (!motion.matches || target.matches(':focus-within')) continue;

        const kind = target.getAttribute('data-reveal');
        const delay = kind === 'stagger' ? stagger++ * 70 : 0;
        const from =
          kind === 'artwork'
            ? { opacity: 0, transform: 'translateY(24px) scale(0.985)' }
            : { opacity: 0, transform: 'translateY(16px)' };

        const animation = target.animate(
          [from, { opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)' }],
          {
            duration: kind === 'artwork' ? 400 : 320,
            delay,
            fill: 'backwards',
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          },
        );
        running.set(target, animation);
        animation.addEventListener('finish', () => running.delete(target), { once: true });
      }
    },
    { threshold: 0.12 },
  );

  for (const target of document.querySelectorAll('[data-reveal]')) {
    if (target.getBoundingClientRect().top >= innerHeight) observer.observe(target);
  }

  motion.addEventListener('change', () => {
    for (const animation of running.values()) animation.cancel();
    running.clear();
  });

  document.addEventListener('focusin', (event) => {
    if (!(event.target instanceof Element)) return;
    const target = event.target.closest('[data-reveal]');
    running.get(target)?.cancel();
    running.delete(target);
  });
}

/* Desktop multi-depth pointer parallax for glass stages */
for (const stage of document.querySelectorAll('[data-parallax-stage]')) {
  const layers = [...stage.querySelectorAll('[data-parallax-depth]')];
  if (layers.length === 0) continue;

  let rafId = 0;
  let tx = 0;
  let ty = 0;

  const apply = () => {
    rafId = 0;
    for (const layer of layers) {
      const depth = Number(layer.dataset.parallaxDepth || '0');
      layer.style.setProperty('--px', `${(tx * depth * 12).toFixed(1)}px`);
      layer.style.setProperty('--py', `${(ty * depth * 8).toFixed(1)}px`);
    }
  };

  const reset = () => {
    tx = 0;
    ty = 0;
    if (rafId) cancelAnimationFrame(rafId);
    apply();
  };

  stage.addEventListener('pointermove', (event) => {
    if (!motion.matches || !finePointer.matches || event.pointerType !== 'mouse') return;
    const rect = stage.getBoundingClientRect();
    tx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    ty = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    if (!rafId) rafId = requestAnimationFrame(apply);
  });

  stage.addEventListener('pointerleave', reset);
  motion.addEventListener('change', reset);
  finePointer.addEventListener('change', reset);
}
})();
