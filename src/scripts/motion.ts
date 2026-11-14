const motionPreference = window.matchMedia('(prefers-reduced-motion: no-preference)');
const revealStart: Record<string, Keyframe | undefined> = {
  artwork: { opacity: .68, translate: '0 12px' },
  'community-link': { opacity: .88, translate: '8px 0' },
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

  const observer = new IntersectionObserver((entries) => {
    let principleDelay = 0;
    for (const { target, isIntersecting, boundingClientRect, rootBounds } of entries) {
      if (!isIntersecting && boundingClientRect.bottom > (rootBounds?.top ?? 0)) continue;

      seen.add(target);
      observer.unobserve(target);
      if (!isIntersecting || !motionPreference.matches || target.matches(':focus-within')) continue;

      const reveal = target.getAttribute('data-reveal');
      const delay = reveal === 'principle' ? principleDelay : 0;
      if (reveal === 'principle') principleDelay += 40;

      const from = revealStart[reveal ?? ''] ?? { opacity: .86, translate: '0 7px' };
      const animation = target.animate([from, { opacity: 1, translate: '0 0' }], {
        duration: reveal === 'artwork' ? 500 : 380,
        delay,
        fill: 'backwards',
        easing: 'cubic-bezier(.16, 1, .3, 1)',
      });
      running.set(target, animation);
      animation.addEventListener('finish', () => running.delete(target), { once: true });
    }
  }, { threshold: .12 });

  function updateObservation() {
    observer.disconnect();
    for (const target of running.keys()) finish(target);
    if (!motionPreference.matches) return;

    const viewportHeight = window.innerHeight;
    for (const target of targets) {
      // Already displayed content stays visible on load, history restore and preference changes.
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

observeReveals();
