:root {
  --red:#c0392b; --red-light:#e74c3c; --red-dark:#922b21;
  --black:#0a0a0a; --dark:#0d0d0d; --dark2:#111111;
  --dark3:#161616; --dark4:#1a1a1a; --white:#ffffff;
  --maxW:1100px; --radius:16px; --radius-lg:24px;
  --transition:all 0.3s cubic-bezier(0.4,0,0.2,1);
  --safe-top:env(safe-area-inset-top,0px);
}

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;overflow-x:hidden}
body{
  font-family:"Alef","Rubik",system-ui,sans-serif;
  background:var(--dark);color:rgba(255,255,255,0.85);
  direction:rtl;-webkit-font-smoothing:antialiased;
  overflow-x:hidden;line-height:1.7;
}

.skip-link{
  position:fixed;top:-100px;right:20px;
  background:var(--red);color:var(--white);
  padding:10px 20px;border-radius:8px;font-weight:700;
  z-index:99999;transition:top 0.2s;text-decoration:none;
}
.skip-link:focus{top:20px}

/* ===== NAV ===== */
.nav{
  position:fixed;top:0;left:0;right:0;
  height:calc(60px + var(--safe-top));
  padding-top:var(--safe-top);
  background:rgba(10,10,10,0.97);
  backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
  border-bottom:1px solid rgba(192,57,43,0.2);
  z-index:9999;transition:box-shadow 0.3s;
}
.nav-inner{
  max-width:var(--maxW);margin:0 auto;height:60px;
  display:flex;align-items:center;justify-content:space-between;
  padding:0 24px;
}
.brand-logo{display:flex;align-items:center;text-decoration:none}
.logo-mark{width:40px;height:40px;border-radius:50%;object-fit:cover}
.nav-name{
  font-family:"Alef",sans-serif;font-weight:700;
  font-size:0.85rem;color:rgba(255,255,255,0.8);
  letter-spacing:0.3px;
}
.accent-dot{color:var(--red-light)}

main{padding-top:calc(60px + var(--safe-top))}

/* ===== SHARED ===== */
.container{max-width:var(--maxW);margin:0 auto;padding:0 20px}
.section-header-center{text-align:center;margin-bottom:52px}

.eyebrow-tag{
  display:inline-block;font-size:0.72rem;font-weight:700;
  letter-spacing:2.5px;text-transform:uppercase;
  color:var(--red-light);padding:5px 14px;
  background:rgba(192,57,43,0.1);
  border:1px solid rgba(192,57,43,0.3);
  border-radius:100px;margin-bottom:14px;
}
.section-title-white{
  font-family:"Playfair Display",serif;
  font-size:clamp(1.9rem,4vw,2.9rem);
  font-weight:700;color:var(--white);line-height:1.25;margin-bottom:12px;
}
.section-title-red{
  font-family:"Playfair Display",serif;
  font-size:clamp(1.9rem,4vw,2.9rem);
  font-weight:700;color:var(--red-light);line-height:1.25;margin-bottom:16px;
}
.section-subtitle-dim{font-size:0.95rem;color:rgba(255,255,255,0.42)}
.text-center{text-align:center}
.highlight-red{color:var(--red-light)}
.reviews-privacy-note{
  font-size:0.78rem;color:rgba(255,255,255,0.32);
  display:flex;align-items:center;justify-content:center;gap:6px;margin-top:6px;
}

/* ===== BUTTONS ===== */
.btn-red-hero{
  display:inline-flex;flex-direction:column;
  align-items:center;justify-content:center;gap:5px;
  background:var(--red);color:var(--white);
  padding:18px 44px;border-radius:50px;
  font-size:1.1rem;font-weight:700;text-decoration:none;
  box-shadow:0 8px 32px rgba(192,57,43,0.5);
  transition:var(--transition);cursor:pointer;border:none;font-family:inherit;
}
.btn-red-hero:hover{background:var(--red-light);transform:translateY(-3px);box-shadow:0 16px 40px rgba(192,57,43,0.6)}
.btn-sub{font-size:0.73rem;font-weight:400;opacity:0.75}

.btn-red-solid{
  display:inline-flex;align-items:center;gap:10px;
  background:var(--red);color:var(--white);
  padding:14px 32px;border-radius:12px;
  font-size:1rem;font-weight:700;text-decoration:none;
  box-shadow:0 6px 24px rgba(192,57,43,0.4);
  transition:var(--transition);cursor:pointer;border:none;
  font-family:inherit;margin-top:28px;
}
.btn-red-solid:hover{background:var(--red-light);transform:translateY(-2px)}

a:focus-visible,button:focus-visible,
input:focus-visible,textarea:focus-visible{
  outline:3px solid var(--red-light);outline-offset:3px;
}

/* ===== HERO ===== */
.hero-section{
  background:var(--black);
  min-height:100dvh;
  display:flex;flex-direction:column;
  align-items:center;justify-content:flex-start;
  padding-top:40px;
  text-align:center;padding-left:20px;padding-right:20px;
  padding-bottom:60px;
  position:relative;overflow:hidden;
}
.hero-section::before{
  content:"";position:absolute;
  top:0;left:50%;transform:translateX(-50%);
  width:800px;height:400px;
  background:radial-gradient(ellipse,rgba(192,57,43,0.08) 0%,transparent 70%);
  pointer-events:none;
}
.hero-content{position:relative;z-index:2;max-width:860px;width:100%}

.hero-title{
  font-family:"Playfair Display",serif;
  font-size:clamp(2rem,5.5vw,3.8rem);
  font-weight:900;color:var(--white);
  line-height:1.2;margin-bottom:18px;
  animation:fadeInUp 0.9s ease both;
}
.hero-title-red{color:var(--red-light);display:block}

.hero-subtitle{
  color:rgba(255,255,255,0.68);
  font-size:clamp(1rem,2.5vw,1.1rem);
  line-height:1.75;margin-bottom:32px;
  animation:fadeInUp 0.9s ease 0.2s both;
}

/* VIDEO — למעלה יותר */
.video-wrapper{
  margin:0 auto 28px;max-width:760px;width:100%;
  animation:fadeInUp 0.9s ease 0.35s both;
}
.video-label{
  display:flex;flex-direction:column;align-items:flex-end;
  gap:4px;margin-bottom:8px;
}
.video-label span{font-size:0.95rem;font-weight:700;color:var(--white)}
.video-label-sub{font-size:0.8rem;color:rgba(255,255,255,0.5);font-weight:400}
.video-container{
  background:#0d0d0d;border-radius:var(--radius-lg);
  border:2px solid rgba(192,57,43,0.25);
  overflow:hidden;
  box-shadow:0 20px 60px rgba(0,0,0,0.6),0 0 0 1px rgba(192,57,43,0.1);
  aspect-ratio:16/9;position:relative;
}
.video-container iframe,
.video-container video{width:100%;height:100%;display:block;object-fit:cover}
.video-placeholder{
  position:absolute;inset:0;
  display:flex;flex-direction:column;
  align-items:center;justify-content:center;
  gap:16px;background:#0a0a0a;
}
.video-placeholder.small{position:relative;height:200px}
.video-placeholder p{color:rgba(255,255,255,0.3);font-size:0.85rem}
.video-play-btn{
  width:72px;height:72px;border-radius:50%;
  background:var(--red);cursor:pointer;
  display:flex;align-items:center;justify-content:center;
  font-size:1.5rem;color:var(--white);
  box-shadow:0 8px 32px rgba(192,57,43,0.6);
  transition:var(--transition);
}
.video-play-btn:hover{transform:scale(1.1);background:var(--red-light)}
.hero-cta-block{animation:fadeInUp 0.9s ease 0.5s both}

/* ===== PROBLEM ===== */
.problem-section{
  background:var(--dark2);padding:100px 0;
  border-top:1px solid rgba(192,57,43,0.12);
}
.problem-text-block{max-width:680px;margin:0 auto 80px;text-align:center}
.problem-text{font-size:1.05rem;line-height:1.9;color:rgba(255,255,255,0.78)}
.problem-text strong{color:var(--white);font-weight:700}

.what-we-do-block{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}
.what-text p{font-size:1rem;color:rgba(255,255,255,0.72);line-height:1.82;margin-bottom:4px}
.what-text p strong{color:var(--white)}
.what-list{
  list-style:none;padding:0;margin:12px 0;
  display:flex;flex-direction:column;gap:10px;
}
.what-list li{
  display:flex;align-items:center;gap:10px;
  font-size:0.95rem;color:rgba(255,255,255,0.75);
}
.what-list li i{color:var(--red-light);font-size:0.85rem;flex-shrink:0}

/* Mockup */
.mockup-screen{
  background:#0a0a0a;
  border:2px solid rgba(192,57,43,0.25);
  border-radius:var(--radius-lg);overflow:hidden;
  box-shadow:0 20px 60px rgba(0,0,0,0.6);
}
.mockup-header{
  background:#1a0808;padding:12px 16px;
  display:flex;align-items:center;gap:8px;
  font-size:0.78rem;color:rgba(255,255,255,0.55);
}
.mockup-dot{width:9px;height:9px;border-radius:50%;background:var(--red-light)}
.mockup-body{padding:20px}
.mockup-video-thumb{
  background:#060606;border-radius:var(--radius);
  height:140px;display:flex;flex-direction:column;
  align-items:center;justify-content:center;
  gap:8px;color:rgba(255,255,255,0.35);font-size:0.82rem;
  margin-bottom:16px;border:1px solid rgba(255,255,255,0.04);
}
.mockup-video-thumb i{font-size:2.2rem;color:var(--red-light)}
.mockup-stats{display:flex;gap:10px}
.mockup-stat{
  flex:1;background:rgba(192,57,43,0.08);
  border-radius:12px;padding:12px;text-align:center;
  border:1px solid rgba(192,57,43,0.18);
}
.stat-val{
  display:block;font-size:1rem;font-weight:700;
  color:var(--white);line-height:1.3;margin-bottom:4px;
}
.stat-lbl{font-size:0.68rem;color:rgba(255,255,255,0.45);display:block}

/* ===== ABOUT ===== */
.about-section{background:var(--black);padding:100px 0}
.about-grid{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}
.about-image{
  height:500px;border-radius:var(--radius-lg);
  background-size:cover;background-position:center top;
  border:2px solid rgba(192,57,43,0.2);
  box-shadow:0 20px 60px rgba(0,0,0,0.5);
}
.about-text-col p{font-size:1rem;color:rgba(255,255,255,0.73);line-height:1.85}
.about-text-col p strong{color:var(--white)}

/* ===== PROCESS ===== */
.process-section{
  background:var(--dark2);padding:100px 0;
  border-top:1px solid rgba(192,57,43,0.1);
}
.process-timeline{
  max-width:700px;margin:0 auto;
  display:flex;flex-direction:column;gap:0;
}
.process-step{
  display:grid;grid-template-columns:60px 1fr;
  gap:0 20px;align-items:stretch;
  position:relative;
}
.process-step-icon{
  width:56px;height:56px;border-radius:50%;
  background:rgba(192,57,43,0.1);
  border:2px solid rgba(192,57,43,0.3);
  display:flex;align-items:center;justify-content:center;
  font-size:1.6rem;flex-shrink:0;z-index:2;
  margin-top:0;
}
.process-step-content{padding:0 0 12px 0;padding-top:8px}
.process-step-num{
  font-size:0.65rem;font-weight:700;letter-spacing:2px;
  color:var(--red-light);margin-bottom:4px;text-transform:uppercase;
}
.process-step-content h3{font-size:1rem;color:var(--white);margin-bottom:6px}
.process-step-content p{font-size:0.88rem;color:rgba(255,255,255,0.5);line-height:1.7}

.process-bar{
  grid-column:1;grid-row:2;
  width:2px;background:rgba(192,57,43,0.25);
  margin:0 auto;height:40px;position:relative;
}
.process-bar-fill{
  position:absolute;top:0;left:0;width:100%;
  height:100%;background:var(--red);
  border-radius:2px;
}
.process-bar-last{display:none}

/* ===== PROOF / BEFORE-AFTER ===== */
.proof-section{
  background:var(--dark3);padding:100px 0;
  border-top:1px solid rgba(192,57,43,0.1);
}
.before-after-grid{
  display:grid;grid-template-columns:1fr auto 1fr;
  gap:16px;align-items:center;max-width:800px;margin:0 auto;
}
.ba-card{border-radius:var(--radius-lg);overflow:hidden}
.ba-label{
  text-align:center;font-size:0.75rem;font-weight:700;
  letter-spacing:1px;text-transform:uppercase;
  padding:8px 16px;
}
.ba-label-before{background:rgba(255,255,255,0.05);color:rgba(255,255,255,0.5)}
.ba-label-after{background:rgba(192,57,43,0.15);color:var(--red-light)}
.ba-img{
  height:220px;background-size:cover;background-position:center;
  border:1px solid rgba(255,255,255,0.08);
}
.ba-arrow{
  font-size:1.5rem;color:var(--red-light);
  display:flex;align-items:center;justify-content:center;
  width:40px;
}

.brands-note{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin-bottom:40px}
.brands-badge{
  background:rgba(192,57,43,0.1);
  border:1px solid rgba(192,57,43,0.3);
  color:var(--red-light);font-size:0.84rem;font-weight:700;
  padding:8px 18px;border-radius:100px;
  display:flex;align-items:center;gap:8px;
}
.brands-logos-grid{
  display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:14px;
  margin-top:40px;
}
.brand-card{
  background:var(--dark4);border-radius:var(--radius);
  overflow:hidden;border:1px solid rgba(255,255,255,0.05);
  transition:var(--transition);
}
.brand-card:hover{transform:translateY(-4px);border-color:rgba(192,57,43,0.28)}
.brand-card img{width:100%;height:auto;display:block}

/* ===== SERVICES ===== */
.services-section{background:var(--dark4);padding:100px 0;border-top:1px solid rgba(192,57,43,0.1)}
.services-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:26px}
.service-card{
  background:var(--dark2);border-radius:var(--radius-lg);
  overflow:hidden;border:1px solid rgba(255,255,255,0.05);
  transition:var(--transition);position:relative;
}
.service-card:hover{transform:translateY(-10px);box-shadow:0 24px 50px rgba(192,57,43,0.14);border-color:rgba(192,57,43,0.28)}
.service-card-img{height:200px;background-size:cover;background-position:center;position:relative}
.service-tag{
  position:absolute;top:14px;right:14px;
  background:var(--red);color:var(--white);
  font-size:0.68rem;font-weight:700;letter-spacing:1px;
  text-transform:uppercase;padding:4px 11px;border-radius:100px;
}
.service-body{padding:22px}
.service-body h3{font-family:"Playfair Display",serif;font-size:1.2rem;color:var(--white);margin-bottom:10px}
.service-body p{color:rgba(255,255,255,0.58);font-size:0.9rem;line-height:1.62}
.service-features{
  list-style:none;margin-top:16px;padding-top:14px;
  border-top:1px solid rgba(255,255,255,0.05);
  display:flex;flex-direction:column;gap:7px;
}
.service-features li{font-size:0.83rem;color:rgba(255,255,255,0.48);display:flex;align-items:center;gap:8px}
.service-features li i{color:var(--red-light);font-size:0.78rem}

/* ===== FOR WHO ===== */
.for-who-section{background:var(--black);padding:100px 0}
.for-who-section h2{margin-bottom:50px}
.for-who-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px}
.for-who-card{border-radius:var(--radius-lg);overflow:hidden}
.for-who-card-header{padding:22px 28px 14px}
.for-who-card-header h3{font-family:"Playfair Display",serif;font-size:1.25rem;font-weight:700}
.for-who-card ul{list-style:none;padding:0 28px 24px;display:flex;flex-direction:column;gap:16px}
.for-who-card ul li{display:flex;align-items:flex-start;gap:13px;font-size:0.93rem;line-height:1.6}

/* NO card */
.for-who-no{background:rgba(12,12,12,0.8);border:1.5px solid rgba(255,255,255,0.07)}
.for-who-no .for-who-card-header{background:rgba(255,255,255,0.03)}
.for-who-no .for-who-card-header h3{color:rgba(255,255,255,0.9)}
.for-who-no ul li{color:rgba(255,255,255,0.62)}
.x-icon{
  width:25px;height:25px;min-width:25px;border-radius:50%;
  background:rgba(192,57,43,0.12);
  border:1.5px solid rgba(192,57,43,0.45);
  display:flex;align-items:center;justify-content:center;
  color:var(--red-light);font-size:0.68rem;
}

/* YES card */
.for-who-yes{background:rgba(30,10,10,0.7);border:1.5px solid rgba(192,57,43,0.35)}
.for-who-yes .for-who-card-header{background:rgba(192,57,43,0.1)}
.for-who-yes .for-who-card-header h3{color:var(--red-light)}
.for-who-yes ul li{color:rgba(255,255,255,0.8)}
.for-who-yes .btn-red-solid{margin:0 28px 28px}
.check-icon{
  width:25px;height:25px;min-width:25px;border-radius:50%;
  background:rgba(192,57,43,0.15);
  border:1.5px solid var(--red-light);
  display:flex;align-items:center;justify-content:center;
  color:var(--red-light);font-size:0.68rem;
}

/* ===== BOOKING ===== */
.booking-section{
  background:var(--dark3);padding:100px 0;
  position:relative;overflow:hidden;
  border-top:1px solid rgba(192,57,43,0.12);
}
.booking-glow{
  position:absolute;top:50%;left:50%;
  transform:translate(-50%,-50%);
  width:600px;height:600px;
  background:radial-gradient(circle,rgba(192,57,43,0.06) 0%,transparent 70%);
  pointer-events:none;
}
.booking-inner{
  display:grid;grid-template-columns:1fr 1fr;
  gap:60px;align-items:start;position:relative;z-index:1;
}
.booking-text .eyebrow-tag{display:block;margin-bottom:14px}
.booking-subtitle{color:rgba(255,255,255,0.58);font-size:1rem;margin-bottom:30px}
.booking-subtitle strong{color:var(--white)}
.booking-benefits{display:flex;flex-direction:column;gap:12px}
.benefit-item{display:flex;align-items:center;gap:10px;font-size:0.93rem;color:rgba(255,255,255,0.72)}
.benefit-item i{color:var(--red-light)}

.booking-form-wrapper{
  background:var(--dark4);
  border:1.5px solid rgba(192,57,43,0.18);
  border-radius:var(--radius-lg);padding:34px;
  box-shadow:0 20px 60px rgba(0,0,0,0.3);
}
.form-group{margin-bottom:20px}
label{display:block;margin-bottom:8px;font-weight:700;font-size:0.88rem;color:var(--white)}
input[type="text"],input[type="tel"],input[type="email"],textarea{
  width:100%;padding:13px 15px;
  border:1.5px solid rgba(192,57,43,0.18);
  border-radius:12px;background:#222;
  color:var(--white);font-size:1rem;font-family:inherit;
  resize:vertical;transition:var(--transition);
}
input::placeholder,textarea::placeholder{color:rgba(255,255,255,0.22)}
input:focus,textarea:focus{
  outline:none;border-color:var(--red-light);
  background:#292929;box-shadow:0 0 0 4px rgba(192,57,43,0.08);
}
input.error,textarea.error{border-color:var(--red-light)}
.form-button-red{
  width:100%;padding:17px 20px;
  background:var(--red);color:var(--white);
  border:none;border-radius:12px;
  font-size:1rem;font-weight:700;cursor:pointer;
  display:flex;flex-direction:column;align-items:center;gap:4px;
  transition:var(--transition);
  box-shadow:0 8px 28px rgba(192,57,43,0.38);
  font-family:inherit;
}
.form-button-red:hover{background:var(--red-light);transform:translateY(-2px)}
.form-btn-sub{font-size:0.72rem;font-weight:400;opacity:0.68}
.form-privacy{
  text-align:center;font-size:0.76rem;
  color:rgba(255,255,255,0.28);margin-top:12px;
  display:flex;align-items:center;justify-content:center;gap:5px;
}
.response-message{
  background:rgba(192,57,43,0.08);
  border:1.5px solid rgba(192,57,43,0.28);
  color:var(--red-light);border-radius:var(--radius);
  padding:22px;font-size:1.05rem;font-weight:700;
  display:flex;align-items:center;justify-content:center;gap:10px;
}

/* ===== FAQ ===== */
.faq-section{background:var(--dark2);padding:100px 0;border-top:1px solid rgba(255,255,255,0.04)}
.faq-list{max-width:760px;margin:0 auto;display:flex;flex-direction:column;gap:10px}
.faq-item{
  background:var(--dark4);
  border:1px solid rgba(255,255,255,0.06);
  border-radius:var(--radius);overflow:hidden;
}
.faq-item.open{border-color:rgba(192,57,43,0.38)}
.faq-q{
  width:100%;display:flex;align-items:center;
  justify-content:space-between;gap:16px;
  padding:20px 24px;background:none;border:none;
  cursor:pointer;text-align:right;font-family:inherit;
  font-size:0.98rem;font-weight:700;color:var(--white);
  transition:color 0.25s;
}
.faq-q:hover{color:var(--red-light)}
.faq-item.open .faq-q{color:var(--red-light)}
.faq-plus{
  flex-shrink:0;width:28px;height:28px;
  background:rgba(192,57,43,0.1);border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  color:var(--red-light);font-size:0.78rem;
  transition:transform 0.3s,background 0.3s;
}
.faq-item.open .faq-plus{transform:rotate(45deg);background:rgba(192,57,43,0.18)}
.faq-a{max-height:0;overflow:hidden;transition:max-height 0.4s cubic-bezier(0.4,0,0.2,1)}
.faq-a.open{max-height:400px}
.faq-a-inner{padding:0 24px 20px}
.faq-a p{font-size:0.9rem;line-height:1.78;color:rgba(255,255,255,0.58)}

/* ===== CTA BANNER ===== */
.cta-banner-final{
  background:linear-gradient(135deg,#1a0808 0%,#2d0d0d 50%,#1a0808 100%);
  padding:72px 20px;text-align:center;
  position:relative;overflow:hidden;
  border-top:1px solid rgba(192,57,43,0.18);
}
.cta-banner-final::before{
  content:"";position:absolute;inset:0;
  background:radial-gradient(ellipse at center,rgba(192,57,43,0.1) 0%,transparent 70%);
}
.cta-banner-final-inner{position:relative;z-index:1;max-width:580px;margin:0 auto}
.cta-banner-final h3{
  font-family:"Playfair Display",serif;
  font-size:clamp(1.5rem,3vw,2.2rem);color:var(--white);margin-bottom:12px;
}
.cta-banner-final p{color:rgba(255,255,255,0.62);margin-bottom:28px}

/* ===== FOOTER ===== */
.site-footer{
  background:var(--black);padding:60px 20px 40px;
  text-align:center;border-top:1px solid rgba(192,57,43,0.12);
}
.footer-inner{max-width:var(--maxW);margin:0 auto}
.footer-brand{display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:12px}
.footer-brand img{border-radius:50%}
.footer-name{font-family:"Playfair Display",serif;font-size:1.35rem;font-weight:700;color:var(--white)}
.footer-tagline{font-size:0.82rem;color:rgba(255,255,255,0.28);letter-spacing:1.5px;margin-bottom:22px}
.social-links{margin-bottom:26px}
.social-links a{
  display:inline-flex;align-items:center;justify-content:center;
  width:44px;height:44px;
  background:rgba(192,57,43,0.1);
  border:1px solid rgba(192,57,43,0.28);
  border-radius:50%;color:var(--red-light);
  font-size:1.2rem;text-decoration:none;transition:var(--transition);
}
.social-links a:hover{background:var(--red);color:var(--white);transform:translateY(-3px)}
.footer-bottom{
  display:flex;align-items:center;justify-content:center;
  gap:22px;flex-wrap:wrap;font-size:0.8rem;
  color:rgba(255,255,255,0.28);
  border-top:1px solid rgba(255,255,255,0.05);
  padding-top:20px;margin-bottom:12px;
}
.accessibility-link-btn{
  background:none;border:none;color:var(--red-light);
  text-decoration:underline;cursor:pointer;
  font-size:0.8rem;font-family:inherit;padding:0;
}
.footer-links{
  font-size:0.76rem;color:rgba(255,255,255,0.22);
  display:flex;align-items:center;justify-content:center;gap:10px;
}
.footer-links a{color:rgba(255,255,255,0.22);text-decoration:none}
.footer-links a:hover{color:var(--red-light)}
.credit{margin-top:14px;font-size:0.78rem;color:rgba(255,255,255,0.18)}
.credit-name{color:rgba(192,57,43,0.45)}

/* ===== THANK YOU PAGE ===== */
.thank-you-page{
  position:fixed;inset:0;background:rgba(0,0,0,0.97);
  z-index:99998;overflow-y:auto;
  display:flex;align-items:flex-start;
  justify-content:center;padding:40px 20px;
}
.thank-you-inner{
  max-width:580px;width:100%;
  background:var(--dark4);
  border:1.5px solid rgba(192,57,43,0.28);
  border-radius:var(--radius-lg);padding:44px 36px;text-align:center;
}
.thank-you-check{
  font-size:3.5rem;color:#2ecc71;
  margin-bottom:18px;
}
.thank-you-inner h2{
  font-family:"Playfair Display",serif;
  font-size:1.75rem;color:var(--white);margin-bottom:10px;
}
.thank-you-inner>p{color:rgba(255,255,255,0.55);margin-bottom:32px}
.thank-you-video-block{text-align:right}
.thank-you-video-block h3{font-size:0.95rem;color:var(--white);margin-bottom:18px}
.thank-you-checklist{display:flex;flex-direction:column;gap:10px;margin-bottom:24px}
.ty-check-item{
  display:flex;align-items:center;gap:12px;
  background:rgba(192,57,43,0.07);
  border:1px solid rgba(192,57,43,0.18);
  border-radius:10px;padding:11px 14px;
  font-size:0.9rem;color:rgba(255,255,255,0.78);
}
.ty-check-item i{color:var(--red-light);min-width:18px}
.ty-video-wrap{background:#0a0a0a;border-radius:var(--radius);overflow:hidden;margin-bottom:24px}
.ty-video-wrap iframe{width:100%;height:200px;display:block;border:none}

/* ===== MODAL ===== */
.modal{
  display:none;position:fixed;z-index:99999;inset:0;
  background:rgba(0,0,0,0.92);backdrop-filter:blur(8px);
  overflow-y:auto;padding:40px 20px;
}
.modal-content{
  background:var(--dark4);max-width:640px;margin:0 auto;
  border-radius:var(--radius-lg);padding:44px;
  position:relative;direction:rtl;color:var(--white);
  border:1px solid rgba(192,57,43,0.14);
}
.modal-content h2{font-family:"Playfair Display",serif;color:var(--red-light);margin-bottom:20px}
.modal-content p{margin-bottom:12px;font-size:0.88rem;line-height:1.7;color:rgba(255,255,255,0.62)}
.modal-content ul{padding-right:20px;margin-bottom:12px}
.modal-content li{font-size:0.88rem;color:rgba(255,255,255,0.62);line-height:1.7;margin-bottom:4px}
.close-btn{
  position:absolute;top:16px;left:16px;
  width:34px;height:34px;background:rgba(255,255,255,0.06);
  border:none;border-radius:50%;font-size:1.1rem;cursor:pointer;
  display:flex;align-items:center;justify-content:center;
  color:var(--white);transition:var(--transition);
}
.close-btn:hover{background:rgba(192,57,43,0.2);color:var(--red-light)}

/* ===== ANIMATIONS ===== */
@keyframes fadeInUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}

/* ===== RESPONSIVE ===== */
@media(max-width:900px){
  .what-we-do-block{grid-template-columns:1fr;gap:40px}
  .about-grid{grid-template-columns:1fr;gap:36px}
  .about-image{height:320px}
  .booking-inner{grid-template-columns:1fr;gap:40px}
  .for-who-grid{grid-template-columns:1fr}
  .before-after-grid{grid-template-columns:1fr;gap:12px}
  .ba-arrow{transform:rotate(90deg)}
}
@media(max-width:768px){
  .nav-name{font-size:0.75rem}
  .services-cards{grid-template-columns:1fr}
  .booking-form-wrapper{padding:22px 18px}
  .thank-you-inner{padding:28px 18px}
  .for-who-card ul{padding:0 18px 20px}
  .for-who-card-header{padding:18px 18px 12px}
  .for-who-yes .btn-red-solid{margin:0 18px 20px}
  .process-timeline{max-width:100%}
}
@media(max-width:480px){
  .hero-title{font-size:1.75rem}
  .brands-logos-grid{grid-template-columns:repeat(2,1fr)}
  .modal-content{padding:28px 18px}
  .nav-name{display:none}
}
@media(prefers-reduced-motion:reduce){
  *,*::before,*::after{animation-duration:0.01ms!important;transition-duration:0.01ms!important}
}
