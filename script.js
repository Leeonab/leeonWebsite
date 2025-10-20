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