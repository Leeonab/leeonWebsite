'use strict';

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

// חשיפת אלמנטים בגלילה
(function initReveal() {
  const obs = new IntersectionObserver((entries, observer) => {
    entries.forEach(e => {
      if (e.isIntersecting) { 
        e.target.classList.add('visible'); 
        observer.unobserve(e.target); 
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal').forEach(el => obs.observe(el));
})();

// שינוי עיצוב ה-Nav בגלילה
(function initNavScroll() {
  const nav = $('.nav');
  if (!nav) return;
  const handler = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', handler, { passive: true });
  handler();
})();

// ניווט מובייל וקליקים על קישורים
(function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  const overlay   = document.getElementById('nav-overlay');
  if (!hamburger || !navLinks) return;

  const navAs = $$('.nav-links a');

  function openMenu() {
    hamburger.classList.add('active');
    navLinks.classList.add('show');
    overlay && overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
  
  function closeMenu() {
    hamburger.classList.remove('active');
    navLinks.classList.remove('show');
    overlay && overlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => hamburger.classList.contains('active') ? closeMenu() : openMenu());
  overlay && overlay.addEventListener('click', closeMenu);

  navAs.forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        closeMenu();
        const target = document.getElementById(href.substring(1));
        if (target) {
          const navH = $('.nav')?.offsetHeight || 64;
          window.scrollTo({ 
            top: target.offsetTop - navH - 8, 
            behavior: 'smooth' 
          });
        }
      }
    });
  });
})();

// מעקב גלילה וסימון קישור אקטיבי (התיקון המרכזי)
(function initActiveNav() {
  const navAs = $$('.nav-links a');
  
  // אוספים רק את הקישורים שיש להם יעד אמיתי בדף
  const sections = navAs
    .map(a => {
      const href = a.getAttribute('href');
      return (href && href.startsWith('#')) ? document.getElementById(href.substring(1)) : null;
    })
    .filter(Boolean);

  const handler = () => {
    let current = '';
    const scrollY = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    // פתרון לקצה הדף: אם הגענו לסוף, נסמן את האלמנט האחרון שקיים בתפריט
    if (scrollY + clientHeight >= scrollHeight - 80) {
        current = sections[sections.length - 1].id;
    } else {
      // אחרת, נבדוק מי הסקשן שנמצא כרגע בטווח הראייה
      sections.forEach(sec => {
        if (scrollY >= sec.offsetTop - 200) {
          current = sec.id;
        }
      });
    }

    navAs.forEach(a => {
      const href = a.getAttribute('href');
      a.classList.toggle('active-nav', href === `#${current}`);
    });
  };

  window.addEventListener('scroll', handler, { passive: true });
  // הפעלה ראשונית כדי לסמן את "דף הבית" בטעינה
  handler();
})();

// שאלות נפוצות - אקורדיון
(function initFAQ() {
  $$('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-a');
      const isOpen = item.classList.contains('open');

      $$('.faq-item.open').forEach(openItem => {
        if (openItem === item) return;
        openItem.classList.remove('open');
        openItem.querySelector('.faq-a').classList.remove('open');
      });

      item.classList.toggle('open', !isOpen);
      answer.classList.toggle('open', !isOpen);
      btn.setAttribute('aria-expanded', !isOpen);
    });
  });
})();

// טופס יצירת קשר
(function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('.form-button');
    const fields = {
        fullname: form.querySelector('#fullname'),
        phone: form.querySelector('#phone'),
        email: form.querySelector('#email'),
        message: form.querySelector('#message')
    };

    // וולידציה בסיסית
    let valid = true;
    Object.values(fields).forEach(f => {
        if(!f.value.trim()) { f.classList.add('error'); valid = false; }
        else { f.classList.remove('error'); }
    });

    if (!valid) return;

    btn.disabled = true;
    btn.innerHTML = '<span>שולח...</span>';

    if (typeof emailjs !== 'undefined') {
      emailjs.send('service_qo34r5o', 'template_1c02ebv', {
        fullname: fields.fullname.value,
        phone: fields.phone.value,
        email: fields.email.value,
        message: fields.message.value,
        date: new Date().toLocaleDateString('he-IL')
      }).then(() => {
          form.style.display = 'none';
          $('#responseMessage').style.display = 'flex';
      }).catch(() => {
          alert('שגיאה בשליחה');
          btn.disabled = false;
          btn.innerHTML = '<span>שלחו עכשיו</span>';
      });
    }
  });
})();

// שאר הפונקציות (מודל נגישות, קרוסלה וכו') נשארו ללא שינוי לוגי
(function initModal() {
  const modal = document.getElementById('accessibility-modal');
  const accessBtn = document.getElementById('accessibility-link');
  const closeBtn = modal?.querySelector('.close-btn');
  if (!modal || !accessBtn) return;
  accessBtn.onclick = () => { modal.style.display = 'block'; document.body.style.overflow = 'hidden'; };
  closeBtn.onclick = () => { modal.style.display = 'none'; document.body.style.overflow = ''; };
})();

(function initCarousel() {
  const container = $('.projects-container');
  if (!container) return;
  $('.arrow-prev')?.addEventListener('click', () => container.scrollBy({ left: 324, behavior: 'smooth' }));
  $('.arrow-next')?.addEventListener('click', () => container.scrollBy({ left: -324, behavior: 'smooth' }));
})();

(function initFooterParticles() {
  const canvas = document.getElementById('particles-footer');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W = canvas.width = canvas.offsetWidth;
  let H = canvas.height = canvas.offsetHeight;
  let particles = [];
  for(let i=0; i<40; i++) particles.push({x:Math.random()*W, y:Math.random()*H, r:Math.random()*2, s:Math.random()*0.5});
  function draw() {
    ctx.clearRect(0,0,W,H);
    ctx.fillStyle = 'rgba(192,57,43,0.3)';
    particles.forEach(p => {
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2); ctx.fill();
      p.y -= p.s; if(p.y < 0) p.y = H;
    });
    requestAnimationFrame(draw);
  }
  draw();
})();
