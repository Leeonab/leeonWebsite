'use strict';
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

/* ── NAV ── */
(function(){
  const nav = $('.nav');
  if(!nav) return;
  const tick = () => nav.classList.toggle('scrolled', window.scrollY > 30);
  window.addEventListener('scroll', tick, {passive:true});
  tick();
})();

/* ── STICKY BAR ── */
(function(){
  const bar  = $('#stickyBar');
  const hero = $('.hero');
  const book = $('#booking');
  if(!bar||!hero||!book) return;
  const tick = () => {
    const hBot = hero.getBoundingClientRect().bottom;
    const bTop = book.getBoundingClientRect().top;
    bar.classList.toggle('visible', hBot < 0 && bTop > window.innerHeight);
  };
  window.addEventListener('scroll', tick, {passive:true});
  tick();
})();

/* ── SMOOTH SCROLL ── */
(function(){
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e){
      const id = this.getAttribute('href');
      if(id==='#') return;
      const t = document.querySelector(id);
      if(t){ e.preventDefault(); const navH=$('.nav')?.offsetHeight||58; window.scrollTo({top:t.offsetTop-navH-8,behavior:'smooth'}); }
    });
  });
})();

/* ── BEFORE/AFTER SLIDERS ── */
(function(){
  function init(sliderId,beforeId,handleId){
    const slider=document.getElementById(sliderId);
    const before=document.getElementById(beforeId);
    const handle=document.getElementById(handleId);
    if(!slider||!before||!handle) return;
    let drag=false;
    function setPos(clientX){
      const r=slider.getBoundingClientRect();
      let p=(clientX-r.left)/r.width;
      p=Math.max(0.03,Math.min(0.97,p));
      before.style.clipPath=`inset(0 ${(1-p)*100}% 0 0)`;
      handle.style.left=(p*100)+'%';
    }
    before.style.clipPath='inset(0 50% 0 0)';
    handle.style.left='50%';
    slider.addEventListener('mousedown', e=>{drag=true;setPos(e.clientX);});
    window.addEventListener('mousemove', e=>{if(drag)setPos(e.clientX);});
    window.addEventListener('mouseup',   ()=>{drag=false;});
    slider.addEventListener('touchstart',e=>{drag=true;setPos(e.touches[0].clientX);},{passive:true});
    window.addEventListener('touchmove', e=>{if(drag)setPos(e.touches[0].clientX);},{passive:true});
    window.addEventListener('touchend',  ()=>{drag=false;});
  }
  init('baSlider1','baBefore1','baHandle1');
  init('baSlider2','baBefore2','baHandle2');
  init('baSlider3','baBefore3','baHandle3');
  init('baSlider4','baBefore4','baHandle4');
})();

/* ── FAQ ── */
(function(){
  $$('.faq-q').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const item=btn.closest('.faq-item');
      const ans=item.querySelector('.faq-a');
      const open=item.classList.contains('open');
      $$('.faq-item.open').forEach(o=>{
        if(o===item) return;
        o.classList.remove('open');
        o.querySelector('.faq-a').classList.remove('open');
        o.querySelector('.faq-q').setAttribute('aria-expanded','false');
      });
      item.classList.toggle('open',!open);
      ans.classList.toggle('open',!open);
      btn.setAttribute('aria-expanded',String(!open));
    });
  });
})();

/* ── FORM ── */
(function(){
  const form=document.getElementById('contactForm');
  if(!form) return;
  const SHEETS='https://script.google.com/macros/s/AKfycbwRAdiq6dumuH0QVD2b8XFnH9fXi4lMjI2XC5AwfaXq0y9AfE3BnQ4zhxL-2O1Wx8a0Mg/exec';
  form.addEventListener('submit',async function(e){
    e.preventDefault();
    const btn=this.querySelector('.form-btn');
    const name=form.querySelector('#fullname');
    const ph=form.querySelector('#phone');
    let ok=true;
    [name,ph].forEach(f=>{ f.classList.toggle('error',!f.value.trim()); if(!f.value.trim()) ok=false; });
    if(!ok) return;
    btn.disabled=true;
    btn.querySelector('span').textContent='שולח...';
    const payload={
      fullname: name.value.trim(),
      phone:    ph.value.trim(),
      date:     new Date().toLocaleDateString('he-IL'),
      time:     new Date().toLocaleTimeString('he-IL'),
      source:   location.href
    };
    if(typeof emailjs!=='undefined'){
      try{
        await emailjs.send('service_qo34r5o','template_1c02ebv',{
          fullname: payload.fullname,
          phone:    payload.phone,
          date:     payload.date,
          message:  `שם: ${payload.fullname}\nטלפון: ${payload.phone}\nתאריך: ${payload.date}\nשעה: ${payload.time}`
        });
      }
      catch(err){ console.error('EmailJS:',err); }
    }
    try{
      await fetch(SHEETS,{method:'POST',mode:'no-cors',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
    }
    catch(err){ console.error('Sheets:',err); }
    form.style.display='none';
    if(typeof gtag !== 'undefined'){
         gtag('event', 'lead_submitted', {event_category:'form', event_label:'booking_form'});
      }

    const msg=document.getElementById('responseMessage');
    if(msg) msg.style.display='flex';
    setTimeout(()=>{ const ty=document.getElementById('thank-you-page'); if(ty) ty.style.display='flex'; },1200);
  });
})();

/* ── MODAL ── */
(function(){
  const modal=document.getElementById('accessibility-modal');
  const btn=document.getElementById('accessibility-link');
  const close=modal?.querySelector('.modal-close');
  if(!modal||!btn) return;
  const open=()=>{modal.style.display='block';modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';};
  const shut=()=>{modal.style.display='none';modal.setAttribute('aria-hidden','true');document.body.style.overflow='';};
  btn.addEventListener('click',open);
  close?.addEventListener('click',shut);
  modal.addEventListener('click',e=>{if(e.target===modal)shut();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.style.display==='block')shut();});
})();
