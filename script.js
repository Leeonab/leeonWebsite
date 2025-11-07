const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

// גילוי רכיבים (Reveal)
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


// **לוגיקה של תפריט ההמבורגר**
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

const toggleMenu = () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('show');
  document.body.classList.toggle('no-scroll'); // מונע גלילת רקע
};

hamburger.addEventListener('click', toggleMenu);

// סגירת התפריט בלחיצה על קישור (במצב נייד)
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (navLinks.classList.contains('show')) {
      toggleMenu();
    }
  });
});


// **לוגיקת מודל נגישות**
const modal = document.getElementById("accessibility-modal");
const btn = document.getElementById("accessibility-link");
const span = document.querySelector(".close-btn");

btn.onclick = function(e) {
  e.preventDefault();
  modal.style.display = "block";
  document.body.classList.add('no-scroll'); // מונע גלילה כשהמודל פתוח
}

span.onclick = function() {
  modal.style.display = "none";
  document.body.classList.remove('no-scroll');
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    document.body.classList.remove('no-scroll');
  }
}


// **לוגיקת טופס (Form Submission)**
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
      // הוסר alert() - הוחלף בהודעה מותאמת
      console.error('FAILED to send message:', error);
      // ניתן להציג הודעת שגיאה מותאמת אישית כאן אם רוצים
    });
});
