'use strict';

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

/* NAV SCROLL */
(function initNavScroll() {
  const nav = $('.nav');
  if (!nav) return;
  const update = () => nav.classList.toggle('scrolled', window.scrollY > 30);
  window.addEventListener('scroll', update, { passive: true });
  update();
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
        const navH = $('.nav')?.offsetHeight || 60;
        window.scrollTo({ top: target.offsetTop - navH - 8, behavior: 'smooth' });
      }
    });
  });
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

/* CONTACT FORM */
(function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const SHEETS_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn      = this.querySelector('.form-button-primary');
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

    if (typeof emailjs !== 'undefined') {
      try {
        await emailjs.send('service_qo34r5o', 'template_1c02ebv', {
          fullname: payload.fullname,
          phone:    payload.phone,
          email:    '',
          message:  `שם: ${payload.fullname}\nטלפון: ${payload.phone}\nתאריך: ${payload.date} ${payload.time}`,
          date:     payload.date
        });
      } catch(err) { console.error('EmailJS:', err); }
    }

    if (SHEETS_URL !== 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
      try {
        await fetch(SHEETS_URL, {
          method: 'POST', mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch(err) { console.error('Sheets:', err); }
    }

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

  const open = () => {
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };
  const close = () => {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  accessBtn.addEventListener('click', open);
  closeBtn && closeBtn.addEventListener('click', close);
  modal.addEventListener('click', e => { if (e.target === modal) close(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.style.display === 'block') close();
  });
})();

/*
 * GOOGLE APPS SCRIPT — העתק לתוך Apps Script:
 *
 * function doPost(e) {
 *   try {
 *     var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 *     var data  = JSON.parse(e.postData.contents);
 *     if (sheet.getLastRow() === 0)
 *       sheet.appendRow(['תאריך','שעה','שם מלא','טלפון','מקור']);
 *     sheet.appendRow([data.date||'',data.time||'',data.fullname||'',data.phone||'',data.source||'']);
 *     return ContentService.createTextOutput(JSON.stringify({status:'success'}))
 *       .setMimeType(ContentService.MimeType.JSON);
 *   } catch(err) {
 *     return ContentService.createTextOutput(JSON.stringify({status:'error',message:err.toString()}))
 *       .setMimeType(ContentService.MimeType.JSON);
 *   }
 * }
 */
