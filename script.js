const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.navigation');

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Ouvrir le menu' : 'Fermer le menu');
  navigation?.classList.toggle('is-open', !isOpen);
});

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Ouvrir le menu');
    navigation.classList.remove('is-open');
  });
});

const revealTargets = document.querySelectorAll(
  '.section-heading, .about-main, .about-note, .timeline-item, .skill-card, .project-card, .credential-list > div, .goal-list > div, .contact-card',
);

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.setAttribute('data-reveal', '');
        requestAnimationFrame(() => entry.target.classList.add('is-visible'));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach((target) => revealObserver.observe(target));
}
