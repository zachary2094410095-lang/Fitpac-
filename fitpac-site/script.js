const header = document.getElementById('siteHeader');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const backTop = document.getElementById('backTop');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
  backTop.classList.toggle('show', window.scrollY > 700);
});

navToggle?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  document.body.classList.toggle('no-scroll', open);
});
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('is-open');
  navToggle?.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('no-scroll');
}));

// Packaging path tabs
const tabs = document.querySelectorAll('.path-tab');
const panels = document.querySelectorAll('.path-panel');
tabs.forEach(tab => tab.addEventListener('click', () => {
  const key = tab.dataset.tab;
  tabs.forEach(t => t.classList.toggle('is-active', t === tab));
  panels.forEach(p => p.classList.toggle('is-active', p.dataset.panel === key));
}));

// Industry interaction
document.querySelectorAll('.industry-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.industry-item').forEach(x => x.classList.remove('is-active'));
    item.classList.add('is-active');
  });
});

// Reveal on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Count-up
const countObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count);
    let start = 0;
    const duration = 800;
    const started = performance.now();
    const tick = now => {
      const progress = Math.min((now - started) / duration, 1);
      el.textContent = Math.round(start + (target - start) * (1 - Math.pow(1 - progress, 3)));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    countObserver.unobserve(el);
  });
}, { threshold: .7 });
document.querySelectorAll('[data-count]').forEach(el => countObserver.observe(el));

// Quote demo submission
const form = document.getElementById('quoteForm');
const toast = document.getElementById('toast');
form?.addEventListener('submit', e => {
  e.preventDefault();
  toast.classList.add('show');
  form.reset();
  setTimeout(() => toast.classList.remove('show'), 3500);
});

backTop?.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
document.getElementById('year').textContent = new Date().getFullYear();
