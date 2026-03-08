'use strict';
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

/* ── NAV ── */
(function initNav() {
  const nav = $('.nav');
  if (!nav) return;
  const update = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', update, { passive: true });
  update();
})();

/* ── STICKY CTA ── */
(function initStickyCta() {
  const cta    = $('#stickyCta');
  const hero   = $('.hero-section');
  const booking = $('#booking');
  if (!cta || !hero || !booking) return;
  const update = () => {
    const heroBot   = hero.getBoundingClientRect().bottom;
    const bookingTop = booking.getBoundingClientRect().top;
    if (heroBot < 0 && bookingTop > window.innerHeight) {
      cta.classList.add('visible');
    } else {
      cta.classList.remove('visible');
    }
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
})();

/* ── SMOOTH SCROLL ── */
(function initSmooth() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const t = document.querySelector(href);
      if (t) {
        e.preventDefault();
        const navH = $('.nav')?.offsetHeight || 58;
        window.scrollTo({ top: t.offsetTop - navH - 8, behavior: 'smooth' });
      }
    });
  });
})();

/* ── BEFORE/AFTER SLIDER ── */
(function initSliders() {
  function setupSlider(sliderId, beforeId, handleId) {
    const slider = document.getElementById(sliderId);
    const before = document.getElementById(beforeId);
    const handle = document.getElementById(handleId);
    if (!slider || !before || !handle) return;

    let dragging = false;
    let pct = 50; // percent from right (RTL)

    function setPos(x) {
      const rect = slider.getBoundingClientRect();
      // RTL: left side = "before", right side = "after"
      let raw = (x - rect.left) / rect.width;
      raw = Math.max(0.04, Math.min(0.96, raw));
      pct = raw * 100;
      // clip-path: show left portion as "before"
      before.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
      handle.style.left = pct + '%';
    }

    // Init
    before.style.clipPath = 'inset(0 50% 0 0)';

    slider.addEventListener('mousedown', e => {
      dragging = true;
      setPos(e.clientX);
    });
    window.addEventListener('mousemove', e => {
      if (dragging) setPos(e.clientX);
    });
    window.addEventListener('mouseup', () => { dragging = false; });

    slider.addEventListener('touchstart', e => {
      dragging = true;
      setPos(e.touches[0].clientX);
    }, { passive: true });
    window.addEventListener('touchmove', e => {
      if (dragging) setPos(e.touches[0].clientX);
    }, { passive: true });
    window.addEventListener('touchend', () => { dragging = false; });
  }

  setupSlider('baSlider1', 'baBefore1', 'baHandle1');
  setupSlider('baSlider2', 'baBefore2', 'baHandle2');
})();

/* ── FAQ ── */
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
        o.querySelector('.faq-q').setAttribute('aria-expanded','false');
      });
      item.classList.toggle('open', !isOpen);
      answer.classList.toggle('open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
    });
  });
})();

/* ── CONTACT FORM ── */
(function initForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const SHEETS_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn  = this.querySelector('.form-submit');
    const name = form.querySelector('#fullname');
    const ph   = form.querySelector('#phone');

    let ok = true;
    [name, ph].forEach(f => {
      if (!f.value.trim()) { f.classList.add('error'); ok = false; }
      else f.classList.remove('error');
    });
    if (!ok) return;

    btn.disabled = true;
    const s = btn.querySelector('span');
    if (s) s.textContent = 'שולח...';

    const payload = {
      fullname: name.value.trim(),
      phone:    ph.value.trim(),
      date:     new Date().toLocaleDateString('he-IL'),
      time:     new Date().toLocaleTimeString('he-IL'),
      source:   window.location.href
    };

    if (typeof emailjs !== 'undefined') {
      try {
        await emailjs.send('service_qo34r5o','template_1c02ebv',{
          fullname: payload.fullname,
          phone:    payload.phone,
          email:    '',
          message:  `שם: ${payload.fullname}\nטלפון: ${payload.phone}\nתאריך: ${payload.date} ${payload.time}`,
          date:     payload.date
        });
      } catch(err){ console.error('EmailJS:',err); }
    }

    if (SHEETS_URL !== 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
      try {
        await fetch(SHEETS_URL,{
          method:'POST',mode:'no-cors',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify(payload)
        });
      } catch(err){ console.error('Sheets:',err); }
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

/* ── MODAL ── */
(function initModal() {
  const modal  = document.getElementById('accessibility-modal');
  const accBtn = document.getElementById('accessibility-link');
  const close  = modal?.querySelector('.modal-close');
  if (!modal || !accBtn) return;
  const open  = () => { modal.style.display='block'; modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; };
  const shut  = () => { modal.style.display='none';  modal.setAttribute('aria-hidden','true');  document.body.style.overflow=''; };
  accBtn.addEventListener('click', open);
  close && close.addEventListener('click', shut);
  modal.addEventListener('click', e => { if (e.target===modal) shut(); });
  document.addEventListener('keydown', e => { if (e.key==='Escape' && modal.style.display==='block') shut(); });
})();

/*
 * GOOGLE APPS SCRIPT:
 * function doPost(e) {
 *   var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 *   var data  = JSON.parse(e.postData.contents);
 *   if (sheet.getLastRow()===0) sheet.appendRow(['תאריך','שעה','שם','טלפון','מקור']);
 *   sheet.appendRow([data.date,data.time,data.fullname,data.phone,data.source]);
 *   return ContentService.createTextOutput(JSON.stringify({status:'success'})).setMimeType(ContentService.MimeType.JSON);
 * }
 */
