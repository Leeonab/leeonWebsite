'use strict';

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

(function initReveal() {
  const obs = new IntersectionObserver((entries, observer) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal').forEach(el => obs.observe(el));
})();

(function initNavScroll() {
  const nav = $('.nav');
  if (!nav) return;
  const handler = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', handler, { passive: true });
  handler();
})();

(function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  const overlay   = document.getElementById('nav-overlay');
  if (!hamburger || !navLinks) return;

  function openMenu() {
    hamburger.classList.add('active');
    navLinks.classList.add('show');
    overlay && overlay.classList.add('show');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    hamburger.classList.remove('active');
    navLinks.classList.remove('show');
    overlay && overlay.classList.remove('show');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => hamburger.classList.contains('active') ? closeMenu() : openMenu());
  overlay && overlay.addEventListener('click', closeMenu);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && navLinks.classList.contains('show')) closeMenu(); });

  $$('.nav-links a').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        closeMenu();
        const target = document.getElementById(href.substring(1));
        if (target) {
          const navH = $('.nav')?.offsetHeight || 64;
          window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navH - 8, behavior: 'smooth' });
        }
      } else { closeMenu(); }
    });
  });
})();

(function initActiveNav() {
  const navAs = $$('.nav-links a');
  // תיקון: הסרת #faq ו-#booking מהניווט הפעיל
  const ids = navAs
    .map(a => a.getAttribute('href'))
    .filter(h => h && h.startsWith('#') && h !== '#faq' && h !== '#booking')
    .map(h => h.substring(1));
  const sections = ids.map(id => document.getElementById(id)).filter(Boolean);

  const handler = () => {
    let current = '';
    const scrollY = window.scrollY + 120;
    sections.forEach(sec => { if (sec.offsetTop <= scrollY) current = sec.id; });
    navAs.forEach(a => a.classList.toggle('active-nav', a.getAttribute('href') === `#${current}`));
  };
  window.addEventListener('scroll', handler, { passive: true });
  handler();
})();

(function initModal() {
  const modal     = document.getElementById('accessibility-modal');
  const accessBtn = document.getElementById('accessibility-link');
  const closeBtn  = modal?.querySelector('.close-btn');
  if (!modal || !accessBtn || !closeBtn) return;

  const openModal  = () => { modal.style.display = 'block'; modal.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; closeBtn.focus(); };
  const closeModal = () => { modal.style.display = 'none';  modal.setAttribute('aria-hidden', 'true');  document.body.style.overflow = ''; accessBtn.focus(); };

  accessBtn.addEventListener('click', e => { e.preventDefault(); openModal(); });
  closeBtn.addEventListener('click', closeModal);
  window.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.style.display === 'block') closeModal(); });
})();

(function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const fields = {
    fullname: { el: form.querySelector('#fullname'), msg: 'אנא הזינו שם מלא' },
    phone:    { el: form.querySelector('#phone'),    msg: 'אנא הזינו מספר טלפון' },
    email:    { el: form.querySelector('#email'),    msg: 'אנא הזינו כתובת אימייל תקינה' },
    message:  { el: form.querySelector('#message'),  msg: 'אנא כתבו הודעה' },
  };

  function showError(field, msg) {
    field.el.classList.add('error');
    let errEl = field.el.nextElementSibling;
    if (!errEl || !errEl.classList.contains('field-error')) {
      errEl = document.createElement('div'); errEl.className = 'field-error';
      field.el.parentNode.insertBefore(errEl, field.el.nextSibling);
    }
    errEl.textContent = msg; errEl.style.display = 'block';
  }
  function clearError(field) {
    field.el.classList.remove('error');
    const errEl = field.el.nextElementSibling;
    if (errEl && errEl.classList.contains('field-error')) errEl.style.display = 'none';
  }

  Object.values(fields).forEach(field => {
    field.el?.addEventListener('input', () => { if (field.el.value.trim()) clearError(field); });
  });

  function validate() {
    let valid = true;
    Object.values(fields).forEach(field => {
      if (!field.el) return;
      const val = field.el.value.trim();
      if (!val) { showError(field, field.msg); valid = false; }
      else if (field.el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) { showError(field, field.msg); valid = false; }
      else clearError(field);
    });
    return valid;
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (!validate()) return;
    const btn = this.querySelector('.form-button');
    btn.disabled = true;
    btn.innerHTML = '<span>שולח...</span>';

    const templateParams = {
      fullname: fields.fullname.el.value.trim(),
      phone:    fields.phone.el.value.trim(),
      email:    fields.email.el.value.trim(),
      message:  fields.message.el.value.trim(),
      date:     new Date().toLocaleDateString('he-IL'),
    };

    if (typeof emailjs !== 'undefined') {
      emailjs.send('service_qo34r5o', 'template_1c02ebv', templateParams)
        .then(() => {
          form.style.display = 'none';
          const resp = document.getElementById('responseMessage');
          if (resp) { resp.style.display = 'flex'; resp.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
        })
        .catch(error => {
          console.error('EmailJS error:', error);
          alert('שגיאה בשליחה, נסו שוב.');
          btn.disabled = false;
          btn.innerHTML = '<span>שלחו עכשיו</span><i class="fas fa-paper-plane"></i>';
        });
    }
  });
})();

(function initCarousel() {
  const container = $('.projects-container');
  if (!container) return;
  const projectWidth = 324;
  $('.arrow-prev')?.addEventListener('click', () => container.scrollBy({ left:  projectWidth, behavior: 'smooth' }));
  $('.arrow-next')?.addEventListener('click', () => container.scrollBy({ left: -projectWidth, behavior: 'smooth' }));
})();

(function initFAQ() {
  $$('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item   = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-a');
      const isOpen = item.classList.contains('open');

      $$('.faq-item.open').forEach(openItem => {
        if (openItem === item) return;
        openItem.classList.remove('open');
        openItem.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        openItem.querySelector('.faq-a').classList.remove('open');
      });

      if (isOpen) {
        item.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        answer.classList.remove('open');
      } else {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        answer.classList.add('open');
      }
    });
  });
})();

(function initCardAnimations() {
  const cardObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.card, .review-card').forEach((card, idx) => {
        card.style.opacity = '0'; card.style.transform = 'translateY(24px)';
        card.style.transition = `opacity 0.5s ease ${idx * 0.08}s, transform 0.5s ease ${idx * 0.08}s`;
        requestAnimationFrame(() => requestAnimationFrame(() => { card.style.opacity = '1'; card.style.transform = 'none'; }));
      });
      cardObs.unobserve(entry.target);
    });
  }, { threshold: 0.08 });
  $$('.cards, .reviews-grid').forEach(g => cardObs.observe(g));
})();

(function initHeroHeight() {
  const hero = $('.hero');
  if (!hero || CSS.supports('height', '100svh')) return;
  const setH = () => { hero.style.minHeight = `${window.innerHeight}px`; };
  setH();
  window.addEventListener('resize', setH, { passive: true });
  window.addEventListener('orientationchange', () => setTimeout(setH, 100), { passive: true });
})();

(function initFooterParticles() {
  const canvas = document.getElementById('particles-footer');
  if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ctx = canvas.getContext('2d');
  let particles = [], W = 0, H = 0, rafId;

  function resize() {
    W = canvas.width  = canvas.parentElement?.getBoundingClientRect().width  || canvas.offsetWidth;
    H = canvas.height = canvas.parentElement?.getBoundingClientRect().height || canvas.offsetHeight;
  }

  class Particle {
    constructor() { this.reset(true); }
    reset(init = false) { this.x = Math.random()*W; this.y = init ? Math.random()*H : H+5; this.r = Math.random()*1.8+0.4; this.speed = Math.random()*0.35+0.08; this.alpha = Math.random()*0.45+0.1; this.dir = Math.random()*Math.PI*2; }
    update() { this.x += Math.cos(this.dir)*this.speed; this.y += Math.sin(this.dir)*this.speed; if (this.x<0||this.x>W||this.y<0||this.y>H) this.reset(); }
    draw() { ctx.beginPath(); ctx.arc(this.x,this.y,this.r,0,Math.PI*2); ctx.fillStyle=`rgba(192,57,43,${this.alpha})`; ctx.fill(); }
  }

  resize();
  for (let i = 0; i < 60; i++) particles.push(new Particle());
  let rt; window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(resize, 150); }, { passive: true });
  document.addEventListener('visibilitychange', () => { if (document.hidden) cancelAnimationFrame(rafId); else loop(); });
  function loop() { ctx.clearRect(0,0,W,H); particles.forEach(p=>{p.update();p.draw();}); rafId = requestAnimationFrame(loop); }
  loop();
})();
