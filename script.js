'use strict';

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

/* REVEAL ON SCROLL */
(function initReveal() {
  const obs = new IntersectionObserver((entries, observer) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal').forEach(el => obs.observe(el));
})();

/* NAV SCROLL */
(function initNavScroll() {
  const nav = $('.nav');
  if (!nav) return;
  const h = () => { nav.style.boxShadow = window.scrollY > 40 ? '0 4px 30px rgba(41,128,185,0.12)' : 'none'; };
  window.addEventListener('scroll', h, { passive: true });
  h();
})();

/* MOBILE NAV */
(function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  const overlay   = document.getElementById('nav-overlay');
  if (!hamburger || !navLinks) return;

  const open = () => {
    hamburger.classList.add('active');
    navLinks.classList.add('show');
    overlay && overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-expanded', 'true');
  };
  const close = () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('show');
    overlay && overlay.classList.remove('show');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
  };

  hamburger.addEventListener('click', () => hamburger.classList.contains('active') ? close() : open());
  overlay && overlay.addEventListener('click', close);

  $$('.nav-links a').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        close();
        const target = document.getElementById(href.substring(1));
        if (target) {
          const navH = $('.nav')?.offsetHeight || 64;
          window.scrollTo({ top: target.offsetTop - navH - 8, behavior: 'smooth' });
        }
      }
    });
  });
})();

/* ACTIVE NAV */
(function initActiveNav() {
  const navAs = $$('.nav-links a');
  const sections = navAs
    .map(a => { const h = a.getAttribute('href'); return h && h.startsWith('#') ? document.getElementById(h.substring(1)) : null; })
    .filter(Boolean);

  const handler = () => {
    let current = '';
    const center = window.innerHeight / 2;
    sections.forEach(sec => {
      const r = sec.getBoundingClientRect();
      if (r.top <= center && r.bottom >= center) current = sec.id;
    });
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 10) current = 'booking';
    navAs.forEach(a => a.classList.toggle('active-nav', a.getAttribute('href') === `#${current}`));
  };
  window.addEventListener('scroll', handler, { passive: true });
  window.addEventListener('resize', handler);
  handler();
})();

/* FAQ ACCORDION */
(function initFAQ() {
  $$('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item   = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-a');
      const isOpen = item.classList.contains('open');

      $$('.faq-item.open').forEach(o => {
        if (o === item) return;
        o.classList.remove('open');
        o.querySelector('.faq-a').classList.remove('open');
        o.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      });

      item.classList.toggle('open', !isOpen);
      answer.classList.toggle('open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
    });
  });
})();

/* CONTACT FORM + GOOGLE SHEETS + EMAILJS */
(function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  /*
   * ═══════════════════════════════════════════════
   * הגדרת Google Sheets — בצע שלבים אלו:
   * 1. פתח Google Sheets חדש
   * 2. Extensions > Apps Script
   * 3. מחק קוד קיים, הדבק את הקוד בתחתית הקובץ
   * 4. שמור > Deploy > New deployment > Web app
   * 5. Execute as: Me | Who has access: Anyone
   * 6. לחץ Deploy, קבל URL, הדבק למטה
   * ═══════════════════════════════════════════════
   */
  const SHEETS_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn      = this.querySelector('.form-button-red');
    const fullname = form.querySelector('#fullname');
    const phone    = form.querySelector('#phone');

    let valid = true;
    [fullname, phone].forEach(f => {
      if (!f || !f.value.trim()) { f && f.classList.add('error'); valid = false; }
      else f && f.classList.remove('error');
    });
    if (!valid) return;

    btn.disabled = true;
    const s = btn.querySelector('span');
    if (s) s.textContent = 'שולח...';

    const payload = {
      fullname: fullname.value.trim(),
      phone:    phone.value.trim(),
      date:     new Date().toLocaleDateString('he-IL'),
      time:     new Date().toLocaleTimeString('he-IL'),
      source:   window.location.href
    };

    /* 1 — EmailJS */
    if (typeof emailjs !== 'undefined') {
      try {
        await emailjs.send('service_qo34r5o', 'template_1c02ebv', {
          fullname: payload.fullname,
          phone:    payload.phone,
          email:    '',
          message:  `שם: ${payload.fullname}\nטלפון: ${payload.phone}\nתאריך: ${payload.date} ${payload.time}`,
          date:     payload.date
        });
      } catch (err) { console.error('EmailJS:', err); }
    }

    /* 2 — Google Sheets */
    if (SHEETS_URL !== 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
      try {
        await fetch(SHEETS_URL, {
          method: 'POST', mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch (err) { console.error('Sheets:', err); }
    }

    /* הצג תודה */
    form.style.display = 'none';
    const msg = document.getElementById('responseMessage');
    if (msg) msg.style.display = 'flex';

    setTimeout(() => {
      const ty = document.getElementById('thank-you-page');
      if (ty) ty.style.display = 'flex';
    }, 1200);
  });
})();

/* MODAL נגישות */
(function initModal() {
  const modal     = document.getElementById('accessibility-modal');
  const accessBtn = document.getElementById('accessibility-link');
  const closeBtn  = modal?.querySelector('.close-btn');
  if (!modal || !accessBtn) return;

  const open  = () => { modal.style.display = 'block'; modal.setAttribute('aria-hidden','false'); document.body.style.overflow = 'hidden'; };
  const close = () => { modal.style.display = 'none';  modal.setAttribute('aria-hidden','true');  document.body.style.overflow = ''; };

  accessBtn.addEventListener('click', open);
  closeBtn  && closeBtn.addEventListener('click', close);
  modal.addEventListener('click', e => { if (e.target === modal) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.style.display === 'block') close(); });
})();

/* SMOOTH SCROLL */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navH = $('.nav')?.offsetHeight || 64;
        window.scrollTo({ top: target.offsetTop - navH - 8, behavior: 'smooth' });
      }
    });
  });
})();

/*
 * ═══════════════════════════════════════════════════
 * GOOGLE APPS SCRIPT — הדבק זאת ב-Apps Script
 * ═══════════════════════════════════════════════════
 *
 * function doPost(e) {
 *   try {
 *     var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 *     var data  = JSON.parse(e.postData.contents);
 *     if (sheet.getLastRow() === 0) {
 *       sheet.appendRow(['תאריך','שעה','שם מלא','טלפון','מקור']);
 *     }
 *     sheet.appendRow([
 *       data.date     || '',
 *       data.time     || '',
 *       data.fullname || '',
 *       data.phone    || '',
 *       data.source   || ''
 *     ]);
 *     return ContentService
 *       .createTextOutput(JSON.stringify({status:'success'}))
 *       .setMimeType(ContentService.MimeType.JSON);
 *   } catch(err) {
 *     return ContentService
 *       .createTextOutput(JSON.stringify({status:'error',message:err.toString()}))
 *       .setMimeType(ContentService.MimeType.JSON);
 *   }
 * }
 *
 * הוראות:
 * 1. פתח Google Sheets חדש
 * 2. Extensions > Apps Script
 * 3. הדבק את הקוד למעלה ושמור
 * 4. Deploy > New deployment > Web app
 * 5. Execute as: Me | Who has access: Anyone
 * 6. לחץ Deploy → קבל URL
 * 7. החלף SHEETS_URL למעלה ב-URL שקיבלת
 * ═══════════════════════════════════════════════════
 */
