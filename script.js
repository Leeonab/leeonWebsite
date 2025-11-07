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


const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

// פונקציה אחת לניהול המצב
const toggleMenu = () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('show');
  **document.body.classList.toggle('no-scroll'); // מונע גלילה ברקע**
};

hamburger.addEventListener('click', toggleMenu);

// הוספה: סגירת התפריט בלחיצה על קישור
**navLinks.querySelectorAll('a').forEach(link => {**
**  link.addEventListener('click', () => {**
**    if (navLinks.classList.contains('show')) {**
**      toggleMenu();**
**    }**
**  });**
**});**

// ... שאר הקוד ממשיך מכאן
