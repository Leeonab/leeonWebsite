const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

(function reveal() {
  const obs = new IntersectionObserver((entries, o) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); o.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  $$('.reveal').forEach(el => obs.observe(el));
})();

window.addEventListener('scroll', () => {
  const nav = $('.nav');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('active');
  navLinks.classList.toggle('show');
  hamburger.setAttribute('aria-expanded', isOpen);
});
document.addEventListener('click', e => {
  if (navLinks.classList.contains('show') && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
    hamburger.classList.remove('active');
    navLinks.classList.remove('show');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (navLinks.classList.contains('show')) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('show');
      hamburger.setAttribute('aria-expanded', 'false');
    }
    if (document.getElementById('accessibility-modal').style.display === 'block') {
      document.getElementById('accessibility-modal').style.display = 'none';
      document.body.style.overflow = '';
    }
  }
});

$$('.nav-links a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      const navH = document.querySelector('.nav').offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navH - 8;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    if (navLinks.classList.contains('show')) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('show');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
});

const modal = document.getElementById('accessibility-modal');
const accessBtn = document.getElementById('accessibility-link');
const closeBtn = document.querySelector('.close-btn');
accessBtn.addEventListener('click', e => {
  e.preventDefault();
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
  closeBtn.focus();
});
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  document.body.style.overflow = '';
  accessBtn.focus();
});
window.addEventListener('click', e => {
  if (e.target === modal) { modal.style.display = 'none'; document.body.style.overflow = ''; }
});

document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const btn = this.querySelector('.form-button');
  btn.disabled = true;
  btn.innerHTML = '<span>שולח...</span>';
  const today = new Date().toLocaleDateString('he-IL');
  const templateParams = {
    fullname: this.fullname.value,
    phone: this.phone.value,
    email: this.email.value,
    message: this.message.value,
    date: today
  };
  emailjs.send('service_qo34r5o', 'template_1c02ebv', templateParams)
    .then(() => {
      this.style.display = 'none';
      const resp = document.getElementById('responseMessage');
      resp.style.display = 'flex';
      resp.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, error => {
      console.log('FAILED...', error);
      alert('שגיאה בשליחה, נסו שוב.');
      btn.disabled = false;
      btn.innerHTML = '<span>שלחו עכשיו</span><i class="fas fa-paper-plane" aria-hidden="true"></i>';
    });
});

document.addEventListener('DOMContentLoaded', () => {
  const container = $('.projects-container');
  if (!container) return;
  const projectWidth = 324;
  $('.arrow-prev')?.addEventListener('click', () => container.scrollBy({ left: projectWidth, behavior: 'smooth' }));
  $('.arrow-next')?.addEventListener('click', () => container.scrollBy({ left: -projectWidth, behavior: 'smooth' }));
});

(function footerParticles() {
  const canvas = document.getElementById('particles-footer');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let W, H;
  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });
  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.r = Math.random() * 1.8 + 0.4;
      this.speed = Math.random() * 0.35 + 0.08;
      this.alpha = Math.random() * 0.45 + 0.1;
      this.dir = Math.random() * Math.PI * 2;
    }
    update() {
      this.x += Math.cos(this.dir) * this.speed;
      this.y += Math.sin(this.dir) * this.speed;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(192,57,43,${this.alpha})`;
      ctx.fill();
    }
  }
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    for (let i = 0; i < 80; i++) particles.push(new Particle());
    (function loop() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => { p.update(); p.draw(); });
      requestAnimationFrame(loop);
    })();
  }
})();

function setHeroHeight() {
  const hero = $('.hero');
  if (hero) hero.style.minHeight = `${window.innerHeight}px`;
}
setHeroHeight();
window.addEventListener('resize', setHeroHeight, { passive: true });

window.addEventListener('load', () => {
  const nav = $('.nav');
  if (nav) { nav.style.display = 'none'; nav.offsetHeight; nav.style.display = ''; }
});

const cardObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const cards = entry.target.querySelectorAll('.card, .review-card');
      cards.forEach((card, idx) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(24px)';
        card.style.transition = `opacity 0.5s ease ${idx * 0.1}s, transform 0.5s ease ${idx * 0.1}s`;
        requestAnimationFrame(() => requestAnimationFrame(() => {
          card.style.opacity = '1';
          card.style.transform = 'none';
        }));
      });
      cardObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
$$('.cards, .reviews-grid').forEach(g => cardObs.observe(g));

const sections = $$('section[id]');
const navAs = $$('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  const scrollY = window.scrollY + 120;
  sections.forEach(sec => { if (sec.offsetTop <= scrollY) current = sec.id; });
  navAs.forEach(a => {
    a.classList.remove('active-nav');
    if (a.getAttribute('href') === `#${current}`) a.classList.add('active-nav');
  });
}, { passive: true });

const activeStyle = document.createElement('style');
activeStyle.textContent = '.nav-links a.active-nav { color: #e74c3c !important; background: rgba(192,57,43,0.15) !important; }';
document.head.appendChild(activeStyle);

// FAQ accordion
$$('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const answer = item.querySelector('.faq-a');
    const isOpen = item.classList.contains('open');

    $$('.faq-item.open').forEach(openItem => {
      openItem.classList.remove('open');
      openItem.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      const a = openItem.querySelector('.faq-a');
      a.classList.remove('expanded');
      setTimeout(() => { if (!openItem.classList.contains('open')) a.hidden = true; }, 400);
    });

    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      answer.hidden = false;
      requestAnimationFrame(() => requestAnimationFrame(() => answer.classList.add('expanded')));
    }
  });
});
