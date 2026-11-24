const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());

const motion = matchMedia('(prefers-reduced-motion: no-preference)');
const running = new Map();
if ('IntersectionObserver' in window && Element.prototype.animate) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const target = entry.target;
      observer.unobserve(target);
      if (!motion.matches || target.matches(':focus-within')) continue;
      const animation = target.animate([{opacity: .8, translate: '0 16px'}, {opacity: 1, translate: '0 0'}], {duration: 400, easing: 'cubic-bezier(.16,1,.3,1)'});
      running.set(target, animation);
      animation.addEventListener('finish', () => running.delete(target), {once: true});
    }
  }, {threshold: .12});
  for (const target of document.querySelectorAll('[data-reveal]')) if (target.getBoundingClientRect().top >= innerHeight) observer.observe(target);
  motion.addEventListener('change', () => { for (const animation of running.values()) animation.cancel(); running.clear(); });
  document.addEventListener('focusin', event => {
    if (!(event.target instanceof Element)) return;
    const target = event.target.closest('[data-reveal]');
    running.get(target)?.cancel();
    running.delete(target);
  });
}
const stage = document.querySelector('.hero');
const artwork = stage?.querySelector('.hero-visual');
const pointer = matchMedia('(hover: hover) and (pointer: fine)');
if (stage && artwork) {
  const reset = () => { artwork.style.removeProperty('--art-x'); artwork.style.removeProperty('--art-y'); };
  stage.addEventListener('pointermove', event => {
    if (!motion.matches || !pointer.matches || event.pointerType !== 'mouse') return;
    const rect = stage.getBoundingClientRect();
    artwork.style.setProperty('--art-x', `${((event.clientX - rect.left) / rect.width - .5) * 16}px`);
    artwork.style.setProperty('--art-y', `${((event.clientY - rect.top) / rect.height - .5) * 16}px`);
  });
  stage.addEventListener('pointerleave', reset);
  motion.addEventListener('change', reset);
  pointer.addEventListener('change', reset);
}
