(() => {
  const revealObserver = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      }),
    { threshold: 0.12 }
  );
  document
    .querySelectorAll('.reveal, .section-kicker, .venture, .pr, .doc')
    .forEach((el) => revealObserver.observe(el));

  document.querySelectorAll('[data-tilt]').forEach((el) => {
    el.addEventListener('pointermove', (event) => {
      const r = el.getBoundingClientRect();
      const x = (event.clientX - r.left) / r.width - 0.5;
      const y = (event.clientY - r.top) / r.height - 0.5;
      el.style.setProperty('--tilt-x', `${y * -5}deg`);
      el.style.setProperty('--tilt-y', `${x * 5}deg`);
    });
    el.addEventListener('pointerleave', () => {
      el.style.setProperty('--tilt-x', '0deg');
      el.style.setProperty('--tilt-y', '0deg');
    });
  });
})();