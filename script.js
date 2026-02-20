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

// Smooth scroll for nav links
$$('.nav-links a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
    if (navLinks.classList.contains('show')) {
      hamburger.click(); // Close mobile menu
    }
  });
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
      alert('שגיאה בשליחה, נסו שוב.');
      console.log('FAILED...', error);
    });
});

// Project scroll
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.projects-container');
  const projectWidth = 300;

  document.querySelector('.arrow-prev')?.addEventListener('click', () => {
    container.scrollBy({ left: projectWidth, behavior: 'smooth' });
  });

  document.querySelector('.arrow-next')?.addEventListener('click', () => {
    container.scrollBy({ left: -projectWidth, behavior: 'smooth' });
  });
});

// Force repaint on load for nav on iOS
window.addEventListener('load', () => {
  const nav = document.querySelector('.nav');
  if (nav) {
    nav.style.display = 'none';
    nav.offsetHeight;
    nav.style.display = 'flex';
  }
});

// Viewport resize fix
window.addEventListener('resize', () => {
  document.querySelector('.hero').style.height = `${window.innerHeight}px`;
});
