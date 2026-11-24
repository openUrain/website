export {};

const motionPreference = window.matchMedia('(prefers-reduced-motion: no-preference)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

/* Sticky optical header elevation state */
function initHeaderElevation() {
  const header = document.querySelector<HTMLElement>('[data-site-header]');
  if (!header) return;

  let ticking = false;
  const update = () => {
    header.dataset.scrolled = window.scrollY > 12 ? 'true' : 'false';
    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  update();
}

/* Scroll-driven reveal choreography via Web Animations API */
const revealKeyframes: Record<string, Keyframe> = {
  artwork: { opacity: 0, transform: 'translateY(24px) scale(0.985)' },
  product: { opacity: 0, transform: 'translateY(20px)' },
  principle: { opacity: 0, transform: 'translateY(14px)' },
  'community-link': { opacity: 0, transform: 'translateX(12px)' },
};

function observeReveals() {
  if (!('IntersectionObserver' in window) || !Element.prototype.animate) return;

  const seen = new WeakSet<Element>();
  const running = new Map<Element, Animation>();
  const targets = [...document.querySelectorAll<HTMLElement>('[data-reveal]')];

  function finish(target: Element) {
    running.get(target)?.cancel();
    running.delete(target);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      let staggerIndex = 0;
      for (const { target, isIntersecting, boundingClientRect, rootBounds } of entries) {
        if (!isIntersecting && boundingClientRect.bottom > (rootBounds?.top ?? 0)) continue;

        seen.add(target);
        observer.unobserve(target);
        if (!isIntersecting || !motionPreference.matches || target.matches(':focus-within')) continue;

        const kind = target.getAttribute('data-reveal') ?? '';
        const delay = kind === 'principle' ? staggerIndex++ * 60 : 0;
        const from = revealKeyframes[kind] ?? { opacity: 0, transform: 'translateY(16px)' };

        const animation = target.animate([from, { opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)' }], {
          duration: kind === 'artwork' || kind === 'product' ? 400 : 300,
          delay,
          fill: 'backwards',
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        });
        running.set(target, animation);
        animation.addEventListener('finish', () => running.delete(target), { once: true });
      }
    },
    { threshold: 0.12 },
  );

  function updateObservation() {
    observer.disconnect();
    for (const target of running.keys()) finish(target);
    if (!motionPreference.matches) return;

    const viewportHeight = window.innerHeight;
    for (const target of targets) {
      if (target.getBoundingClientRect().top < viewportHeight) seen.add(target);
      if (!seen.has(target)) observer.observe(target);
    }
  }

  document.addEventListener('focusin', (event) => {
    if (!(event.target instanceof Element)) return;
    const reveal = event.target.closest('[data-reveal]');
    if (reveal) finish(reveal);
  });

  motionPreference.addEventListener('change', updateObservation);
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) updateObservation();
  });
  updateObservation();
}

/* Subtle desktop pointer parallax for layered optical glass stages */
function initParallaxStages() {
  const stages = [...document.querySelectorAll<HTMLElement>('[data-parallax-stage]')];
  if (stages.length === 0) return;

  for (const stage of stages) {
    const layers = [...stage.querySelectorAll<HTMLElement>('[data-parallax-depth]')];
    if (layers.length === 0) continue;

    let rafId = 0;
    let targetX = 0;
    let targetY = 0;

    const apply = () => {
      rafId = 0;
      for (const layer of layers) {
        const depth = Number(layer.dataset.parallaxDepth || '0');
        layer.style.setProperty('--px', `${(targetX * depth * 14).toFixed(1)}px`);
        layer.style.setProperty('--py', `${(targetY * depth * 10).toFixed(1)}px`);
      }
    };

    const reset = () => {
      targetX = 0;
      targetY = 0;
      if (rafId) cancelAnimationFrame(rafId);
      apply();
    };

    stage.addEventListener('pointermove', (event) => {
      if (!motionPreference.matches || !finePointer.matches || event.pointerType !== 'mouse') return;
      const rect = stage.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      if (!rafId) rafId = requestAnimationFrame(apply);
    });

    stage.addEventListener('pointerleave', reset);
    motionPreference.addEventListener('change', reset);
    finePointer.addEventListener('change', reset);
  }
}

initHeaderElevation();
observeReveals();
initParallaxStages();
