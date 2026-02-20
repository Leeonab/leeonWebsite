/**
 * LEEON.AI - Official Script 2026
 * מנטור אישי: הקוד הזה נבנה כדי להיות מהיר, נגיש ומקצועי.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. בחירת אלמנטים קריטיים ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const contactForm = document.getElementById('contactForm');
    const responseMessage = document.getElementById('responseMessage');
    const modal = document.getElementById("accessibility-modal");
    const accessibilityBtn = document.getElementById("accessibility-link");
    const closeBtn = document.querySelector(".close-btn");

    // --- 2. לוגיקה של תפריט המבורגר (נייד) ---
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('show');
        });

        // סגירת התפריט בלחיצה על לינק (חווית משתמש טובה יותר)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('show');
            });
        });
    }

    // --- 3. אנימציות חשיפה (Reveal on Scroll) ---
    // מוסיף את המחלקה 'visible' לאלמנטים כשהם נכנסים למסך
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // ברגע שנחשף, אין צורך להמשיך לעקוב (ביצועים טובים יותר)
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // --- 4. מודל נגישות (החלק שביקשת להחזיר) ---
    if (accessibilityBtn && modal) {
        accessibilityBtn.onclick = (e) => {
            e.preventDefault();
            modal.style.display = "block";
            document.body.style.overflow = "hidden"; // מניעת גלילה כשהמודל פתוח
        };
    }

    if (closeBtn) {
        closeBtn.onclick = () => {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        };
    }

    // סגירת המודל בלחיצה מחוץ לתוכן שלו
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    };

    // --- 5. טיפול בטופס יצירת קשר (EmailJS) ---
    if (contactForm) {
        // אתחול EmailJS עם ה-Public Key שלך
        emailjs.init("7sqzrgavHU1sl1r2B");

        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // אינדיקציה ויזואלית לשליחה
            const submitBtn = this.querySelector('button');
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = "שולח...";
            submitBtn.disabled = true;

            const templateParams = {
                fullname: this.fullname.value,
                phone: this.phone.value,
                email: this.email ? this.email.value : 'לא הוזן',
                message: this.message.value,
                date: new Date().toLocaleDateString('he-IL')
            };

            emailjs.send('service_qo34r5o', 'template_1c02ebv', templateParams)
                .then((response) => {
                    console.log('SUCCESS!', response.status, response.text);
                    contactForm.style.display = 'none';
                    responseMessage.style.display = 'block';
                    responseMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, (error) => {
                    console.error('FAILED...', error);
                    alert('אופס! אירעה שגיאה בשליחה. אנא נסה שוב או צור קשר באינסטגרם.');
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }

    // --- 6. גלילה חלקה (Smooth Scroll) לכל הלינקים הפנימיים ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 7. תיקוני iOS וביצועים ---
    window.addEventListener('load', () => {
        // תיקון קפיצות של ה-Nav ב-iPhone
        const nav = document.querySelector('.nav');
        if (nav) {
            nav.style.display = 'none';
            nav.offsetHeight; // Force reflow
            nav.style.display = 'flex';
        }
    });

    // עדכון גובה ה-Hero בשינוי גודל מסך (למניעת בעיות ב-Mobile Browser Address Bar)
    window.addEventListener('resize', () => {
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.height = `${window.innerHeight}px`;
        }
    });
});
