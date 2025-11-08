/* Helpers */
const $  = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

/* --- Solid mobile viewport fix: updates --vh to innerHeight --- */
function setVh(){
  document.documentElement.style.setProperty('--vh', (window.innerHeight * 0.01) + 'px');
}
window.addEventListener('resize', setVh, {passive:true});
window.addEventListener('orientationchange', setVh);
setVh();

/* --- Reveal on scroll --- */
(function reveal() {
  const obs = new IntersectionObserver((entries, o) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        o.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  $$('.reveal').forEach(el => obs.observe(el));
})();

/* --- Mobile hamburger menu --- */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

if (hamburger && navLinks){
  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('active');
    navLinks.classList.toggle('show');
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // close menu on link click (nice UX)
  navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A'){
      hamburger.classList.remove('active');
      navLinks.classList.remove('show');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}

/* --- Accessibility modal --- */
const modal = document.getElementById('accessibility-modal');
const btn   = document.getElementById('accessibility-link');
const span  = document.querySelector('.close-btn');

if (btn && modal){
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
  });
}
if (span && modal){
  span.addEventListener('click', () => {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
  });
}
window.addEventListener('click', (event) => {
  if (event.target === modal){
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
  }
});

/* --- EmailJS form --- */
const formEl = document.getElementById('contactForm');
if (formEl){
  formEl.addEventListener('submit', function(event){
    event.preventDefault();

    const today = new Date().toLocaleDateString('he-IL');

    const templateParams = {
      fullname: this.fullname.value,
      phone:    this.phone.value,
      email:    this.email.value,
      message:  this.message.value,
      date:     today
    };

    emailjs.send('service_qo34r5o', 'template_1c02ebv', templateParams)
      .then(function(response){
        formEl.style.display = 'none';
        const msg = document.getElementById('responseMessage');
        if (msg){ msg.style.display = 'block'; }
        console.log('SUCCESS!', response.status, response.text);
      }, function(error){
        alert('אירעה שגיאה בשליחת ההודעה, אנא נסו שוב.');
        console.log('FAILED...', error);
      });
  });
}


document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href');
    const el = document.querySelector(id);
    if(el){
      e.preventDefault();
      const top = el.getBoundingClientRect().top + window.scrollY - (parseInt(getComputedStyle(document.body).getPropertyValue('--nav-h')) || 60);
      window.scrollTo({ top, behavior:'smooth' });
    }
  });
});
--- */
