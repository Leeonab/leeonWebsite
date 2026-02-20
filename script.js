document.addEventListener('DOMContentLoaded', () => {
    
    // Intersection Observer for Reveal Effect
    const observerOptions = { threshold: 0.15 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Hamburger Menu Logic
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('show');
        hamburger.classList.toggle('active');
    });

    // EmailJS Implementation
    (function(){
        emailjs.init("7sqzrgavHU1sl1r2B"); // ה-Public Key שלך
    })();

    const contactForm = document.getElementById('contactForm');
    const responseMsg = document.getElementById('responseMessage');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const params = {
            fullname: this.fullname.value,
            phone: this.phone.value,
            message: this.message.value,
            date: new Date().toLocaleDateString('he-IL')
        };

        emailjs.send('service_qo34r5o', 'template_1c02ebv', params)
            .then(() => {
                contactForm.style.display = 'none';
                responseMsg.style.display = 'block';
            })
            .catch((err) => {
                alert('שגיאה בשליחה. נסו שוב מאוחר יותר.');
                console.error('EmailJS Error:', err);
            });
    });

    // Smooth Scrolling for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
