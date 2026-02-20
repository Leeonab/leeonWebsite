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
  }, { threshold: 0.15 });

  $$('.reveal').forEach(el => obs.observe(el));
})();

/* Mobile nav */
const hamburger = $('#hamburger');
const navLinks = $('#nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('active');
    navLinks.classList.toggle('show', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu on link click (mobile)
  navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && navLinks.classList.contains('show')) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('show');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}

/* Accessibility modal */
const modal = $("#accessibility-modal");
const btn = $("#accessibility-link");
const closeBtn = $(".close-btn");

function closeModal() {
  if (modal) modal.style.display = "none";
}
function openModal() {
  if (modal) modal.style.display = "block";
}

if (btn) {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  });
}

if (closeBtn) {
  closeBtn.addEventListener('click', closeModal);
  closeBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') closeModal();
  });
}

window.addEventListener('click', (event) => {
  if (event.target === modal) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

/* EmailJS form */
const contactForm = $('#contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(event) {
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
      .then(() => {
        contactForm.style.display = 'none';
        $('#responseMessage').style.display = 'block';
      }, (error) => {
        alert('אירעה שגיאה בשליחת ההודעה, נסה שוב.');
        console.log('FAILED...', error);
      });
  });
}

/* Projects arrows scrolling */
document.addEventListener('DOMContentLoaded', () => {
  const container = $('.projects-container');
  const project = $('.project');
  const prev = $('.arrow-prev');
  const next = $('.arrow-next');

  if (!container || !project) return;

  const gap = 20;
  const projectWidth = project.getBoundingClientRect().width + gap;

  prev?.addEventListener('click', () => {
    container.scrollBy({ left: projectWidth, behavior: 'smooth' });
  });

  next?.addEventListener('click', () => {
    container.scrollBy({ left: -projectWidth, behavior: 'smooth' });
  });
});

/* iOS nav repaint fix */
window.addEventListener('load', () => {
  const nav = $('.nav');
  if (!nav) return;
  nav.style.display = 'none';
  nav.offsetHeight; // reflow
  nav.style.display = 'flex';
});

/* Stable hero height fallback */
window.addEventListener('resize', () => {
  const hero = $('.hero');
  if (hero) hero.style.minHeight = `${window.innerHeight}px`;
});
