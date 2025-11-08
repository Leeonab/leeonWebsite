const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

(function reveal() {
  const obs = new IntersectionObserver((entries, o) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        o.unobserve(e.target);
      }
    });
  }, {threshold: 0.15});
  $$('.reveal').forEach(el => obs.observe(el));
})();

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('show');
});

const modal = document.getElementById("accessibility-modal");
const btn = document.getElementById("accessibility-link");
const span = document.querySelector(".close-btn");

btn.onclick = function(e) {
  e.preventDefault();
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const today = new Date().toLocaleDateString('he-IL');

  const templateParams = {
    fullname: this.fullname.value,
    phone: this.phone.value,
    email: this.email.value,
    message: this.message.value,
    date: today
  };


  emailjs.send('service_qo34r5o', 'template_1c02ebv', templateParams)
    .then(function(response) {
      document.getElementById('contactForm').style.display = 'none';
      document.getElementById('responseMessage').style.display = 'block';
      console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
      alert('אירעה שגיאה בשליחת ההודעה, אנא נסי שוב.');
      console.log('FAILED...', error);
    });
});

// Custom function for accessibility button
function openAccessibilityModal() {
  document.getElementById('accessibility-modal').style.display = 'block';
}

// מחליף את כל ה-adjustLayout הישן שלך
function fixiPhoneChrome() {
  const n = document.querySelector('.nav').offsetHeight;
  document.body.style.paddingTop = n + 'px';
  
  // הכי חשוב – משתמש ב-100dvh ולא ב-100vh
  document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
  document.querySelector('.hero').style.minHeight = `calc(var(--vh) - ${n}px)`;
}

// הפעלה בכל שינוי
window.addEventListener('load', fixiPhoneChrome); 
window.addEventListener('resize', fixiPhoneChrome); 
window.addEventListener('orientationchange', fixiPhoneChrome); 
fixiPhoneChrome(); // פעם ראשונה
