document.addEventListener('DOMContentLoaded', () => {
    // EmailJS
    emailjs.init("7sqzrgavHU1sl1r2B");

    // Accessibility Modal
    const modal = document.getElementById("accessibility-modal");
    const accBtn = document.getElementById("accessibility-link");
    const closeBtn = document.querySelector(".close-btn");

    accBtn.onclick = (e) => { e.preventDefault(); modal.style.display = "block"; };
    closeBtn.onclick = () => { modal.style.display = "none"; };
    window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };

    // Projects Scroll
    const container = document.querySelector('.projects-container');
    document.querySelector('.arrow-next').onclick = () => container.scrollBy({ left: 320, behavior: 'smooth' });
    document.querySelector('.arrow-prev').onclick = () => container.scrollBy({ left: -320, behavior: 'smooth' });

    // Mobile Menu
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    hamburger.onclick = () => {
        navLinks.classList.toggle('show');
        hamburger.classList.toggle('active');
    };

    // Form
    document.getElementById('contactForm').onsubmit = function(e) {
        e.preventDefault();
        const btn = this.querySelector('button');
        btn.innerText = "שולח...";
        emailjs.sendForm('service_qo34r5o', 'template_1c02ebv', this)
            .then(() => {
                this.style.display = 'none';
                document.getElementById('responseMessage').style.display = 'block';
            });
    };
});
