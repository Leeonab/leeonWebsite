document.addEventListener('DOMContentLoaded', () => {
    // --- Reveal Animation ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // --- Mobile Menu ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('show');
        hamburger.classList.toggle('active');
    });

    // --- Accessibility Modal ---
    const modal = document.getElementById("accessibility-modal");
    const btn = document.getElementById("accessibility-link");
    const span = document.querySelector(".close-btn");

    btn.onclick = (e) => {
        e.preventDefault();
        modal.style.display = "flex";
    }

    span.onclick = () => modal.style.display = "none";
    window.onclick = (event) => {
        if (event.target == modal) modal.style.display = "none";
    }

    // --- EmailJS Contact Form ---
    emailjs.init("7sqzrgavHU1sl1r2B");

    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const btn = this.querySelector('button');
        btn.innerText = "שולח חזון...";
        
        emailjs.sendForm('service_qo34r5o', 'template_1c02ebv', this)
            .then(() => {
                this.style.display = 'none';
                document.getElementById('responseMessage').style.display = 'block';
            }, (error) => {
                alert('אירעה שגיאה. נסו שוב או פנו אלינו באינסטגרם.');
                console.log('FAILED...', error);
                btn.innerText = "שליחה";
            });
    });

    // --- Video Scroll Controls ---
    const container = document.querySelector('.projects-container');
    document.querySelector('.arrow-prev')?.addEventListener('click', () => {
        container.scrollBy({ left: 300, behavior: 'smooth' });
    });
    document.querySelector('.arrow-next')?.addEventListener('click', () => {
        container.scrollBy({ left: -300, behavior: 'smooth' });
    });
});
