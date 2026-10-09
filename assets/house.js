(() => {
  const theme = (function (root) {
    const meta = document.querySelector('meta[name="theme-color"]');
    function apply(t, persist) {
      root.dataset.theme = t;
      const light = t === 'light';
      document.querySelectorAll('[data-theme-toggle]').forEach((b) => {
        const label = light ? 'Switch to dark theme' : 'Switch to light theme';
        b.setAttribute('aria-label', label);
        b.setAttribute('title', label);
      });
      if (meta) meta.setAttribute('content', light ? '#faf7f0' : '#0a0a0a');
      if (persist) {
        try {
          localStorage.setItem('dv-theme', t);
        } catch (e) {}
      }
    }
    return {
      apply,
      fit: () => apply(root.dataset.theme || 'dark', false),
      attach: () =>
        document.querySelectorAll('[data-theme-toggle]').forEach((b) =>
          b.addEventListener('click', () =>
            apply(root.dataset.theme === 'light' ? 'dark' : 'light', true)
          )
        ),
    };
  })(document.documentElement);
  theme.fit();
  theme.attach();

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