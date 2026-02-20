const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

// ========== REVEAL ON SCROLL ==========
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

// ========== HAMBURGER ==========
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('show');
});

$$('.nav-links a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
    if (navLinks.classList.contains('show')) {
      hamburger.click();
    }
  });
});

// ========== ACCESSIBILITY MODAL ==========
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

// ========== CONTACT FORM ==========
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
    }, function(error) {
      alert('שגיאה בשליחה, נסו שוב.');
      console.log('FAILED...', error);
    });
});

// ========== PROJECT SCROLL ARROWS ==========
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.projects-container');
  const projectWidth = 324; // 300px + 24px gap

  document.querySelector('.arrow-prev')?.addEventListener('click', () => {
    container.scrollBy({ left: projectWidth, behavior: 'smooth' });
  });

  document.querySelector('.arrow-next')?.addEventListener('click', () => {
    container.scrollBy({ left: -projectWidth, behavior: 'smooth' });
  });
});

// ========== VIDEO FIX: Force play + fallback ==========
function initVideos() {
  const videos = document.querySelectorAll('video');

  videos.forEach(function(video, index) {
    video.load();

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(function() {
        // Retry on first user interaction (iOS autoplay policy)
        const retryPlay = function() {
          video.play().catch(function(){});
        };
        document.addEventListener('touchstart', retryPlay, { once: true });
        document.addEventListener('click', retryPlay, { once: true });
      });
    }

    // Show fallback image if video fails to load
    video.addEventListener('error', function() {
      const fallback = document.getElementById('vid' + (index + 1) + '-fallback');
      if (fallback) {
        video.style.display = 'none';
        fallback.style.display = 'block';
      }
    });

    // Fix stalled/blank video
    video.addEventListener('stalled', function() {
      video.load();
      video.play().catch(function(){});
    });
  });
}

// ========== VIDEO: Play only when in viewport ==========
const videoObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    const video = entry.target;
    if (entry.isIntersecting) {
      video.play().catch(function(){});
    } else {
      video.pause();
    }
  });
}, { threshold: 0.25 });

document.querySelectorAll('video').forEach(function(v) {
  videoObserver.observe(v);
});

// ========== INIT ==========
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initVideos);
} else {
  initVideos();
}

window.addEventListener('load', function() {
  initVideos();

  // iOS nav repaint fix
  const nav = document.querySelector('.nav');
  if (nav) {
    nav.style.display = 'none';
    nav.offsetHeight;
    nav.style.display = 'flex';
  }
});
