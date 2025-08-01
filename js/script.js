document.addEventListener('DOMContentLoaded', function() {

    gsap.registerPlugin(ScrollTrigger);

    // --- PRELOADER ---
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            gsap.to(preloader, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    preloader.style.display = 'none';
                    document.body.classList.remove('no-scroll');
                    animateHero();
                    setupScrollAnimations();
                }
            });
        });
        document.body.classList.add('no-scroll');
    } else {
        animateHero();
        setupScrollAnimations();
    }
    
    // --- HERO ANIMATION ---
    function animateHero() {
        if (!document.querySelector('.hero')) return;
        const tl = gsap.timeline({delay: 0.2});
        tl.from('.hero-headline', { duration: 1.2, y: 50, opacity: 0, ease: 'power3.out' })
          .from('.hero-subheadline', { duration: 1, y: 30, opacity: 0, ease: 'power3.out' }, "-=0.8")
          .from('.hero-btn', { duration: 1, y: 30, opacity: 0, ease: 'power3.out' }, "-=0.8");
    }

    // --- GENERAL FADE UP ANIMATION ---
    function setupScrollAnimations() {
        const revealElements = document.querySelectorAll('.anim-fade-up');
        revealElements.forEach(el => {
            gsap.fromTo(el,
                { opacity: 0, y: 50 },
                {
                    opacity: 1, y: 0, duration: 1, ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    }
                }
            );
        });
    }
    
    // --- MOBILE NAVIGATION ---
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (mobileNavToggle && mainNav) {
        mobileNavToggle.addEventListener('click', () => {
            mainNav.classList.toggle('open');
            document.body.classList.toggle('no-scroll');
        });
    }

    // --- FOOTER YEAR ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

});
