const motionPreference = window.matchMedia('(prefers-reduced-motion: no-preference)');

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
    let delay = 0;
    for (const { target, isIntersecting, boundingClientRect, rootBounds } of entries) {
      if (!isIntersecting && boundingClientRect.bottom > (rootBounds?.top ?? 0)) continue;

      seen.add(target);
      observer.unobserve(target);
      if (!isIntersecting || !motionPreference.matches || target.matches(':focus-within')) continue;

      // Start only when the element is already on screen. No hidden pending state.
      const animation = target.animate(
        [{ opacity: .58, translate: '0 10px' }, { opacity: 1, translate: '0 0' }],
        { duration: 490, delay, fill: 'backwards', easing: 'cubic-bezier(.22, 1, .36, 1)' },
      );
      running.set(target, animation);
      animation.addEventListener('finish', () => running.delete(target), { once: true });
      delay = Math.min(delay + 55, 165);
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

function addHeroParallax() {
  const region = document.querySelector<HTMLElement>('[data-parallax-region]');
  const artwork = region?.querySelector<HTMLElement>('[data-parallax-artwork]');
  if (!region || !artwork) return;

  const desktopPointer = window.matchMedia('(min-width: 721px) and (hover: hover) and (pointer: fine)');
  let frame = 0;
  let x = 0;
  let y = 0;

  const reset = () => {
    window.cancelAnimationFrame(frame);
    frame = 0;
    artwork.style.removeProperty('--pointer-x');
    artwork.style.removeProperty('--pointer-y');
  };

  region.addEventListener('pointermove', (event) => {
    if (event.pointerType !== 'mouse' || !motionPreference.matches || !desktopPointer.matches) return;
    x = event.clientX;
    y = event.clientY;
    if (frame) return;

    frame = window.requestAnimationFrame(() => {
      const bounds = region.getBoundingClientRect();
      const clamp = (value: number) => Math.min(1, Math.max(-1, value));
      const offsetX = clamp((x - bounds.left) / bounds.width * 2 - 1) * 7;
      const offsetY = clamp((y - bounds.top) / bounds.height * 2 - 1) * 5;
      artwork.style.setProperty('--pointer-x', `${offsetX.toFixed(2)}px`);
      artwork.style.setProperty('--pointer-y', `${offsetY.toFixed(2)}px`);
      frame = 0;
    });
  }, { passive: true });

  region.addEventListener('pointerleave', reset);
  motionPreference.addEventListener('change', reset);
  desktopPointer.addEventListener('change', reset);
  window.addEventListener('pagehide', reset);
}

// The browser owns document navigation and history. These effects only decorate the current page.
observeReveals();
addHeroParallax();
