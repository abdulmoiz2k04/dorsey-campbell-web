document.addEventListener('DOMContentLoaded', function() {

    gsap.registerPlugin(ScrollTrigger);

    // --- CUSTOM CURSOR ---
    const cursor = document.querySelector('.custom-cursor');
    const links = document.querySelectorAll('a, button');

    window.addEventListener('mousemove', e => {
        gsap.to(cursor, { duration: 0.3, x: e.clientX, y: e.clientY, ease: 'power2.out' });
    });

    links.forEach(link => {
        link.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
        link.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
    });

    // --- PRELOADER ---
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        const preloaderText = preloader.querySelector('.preloader-text');
        const tlPreload = gsap.timeline();
        tlPreload.from(preloaderText, { duration: 1, y: 30, opacity: 0, ease: 'power3.out' })
                 .to(preloaderText, { duration: 1, y: -30, opacity: 0, ease: 'power3.in', delay: 1 });
        
        window.addEventListener('load', () => {
            gsap.to(preloader, {
                duration: 1,
                opacity: 0,
                delay: 2.5,
                ease: "power2.inOut",
                onComplete: () => {
                    preloader.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    animateHero();
                    setupScrollAnimations();
                }
            });
        });
        document.body.style.overflow = 'hidden';
    } else {
        animateHero();
        setupScrollAnimations();
    }

    // --- HEADER SCROLL ---
    const header = document.querySelector('.header');
    if (header) {
        ScrollTrigger.create({
            start: 'top -50px',
            onUpdate: self => {
                header.classList.toggle('scrolled', self.direction === 1 && self.progress > 0);
            }
        });
    }

    // --- HERO ANIMATION ---
    function animateHero() {
        if (!document.querySelector('.hero')) return;
        const tl = gsap.timeline({ delay: 0.5 });
        tl.from('.hero-headline', { duration: 1.5, y: 80, opacity: 0, ease: 'power3.out' })
          .from('.hero-subheadline', { duration: 1.2, y: 50, opacity: 0, ease: 'power3.out' }, "-=1")
          .from('.scroll-indicator', { duration: 1, opacity: 0, ease: 'power3.out' }, "-=0.5");
    }

    // --- GENERAL SCROLL ANIMATIONS ---
    function setupScrollAnimations() {
        // Fade Up Animation
        const fadeUpElements = document.querySelectorAll('.anim-fade-up');
        fadeUpElements.forEach(el => {
            gsap.from(el, {
                y: 60, opacity: 0, duration: 1.2, ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
            });
        });

        // Image Reveal Animation
        const revealImages = document.querySelectorAll('.anim-reveal-img');
        revealImages.forEach(el => {
            gsap.from(el, {
                scale: 1.1, opacity: 0, duration: 1.5, ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none none' }
            });
        });

        // Horizontal Scroll Gallery
        const gallery = document.querySelector('.sold-gallery-horizontal');
        if (gallery) {
            gsap.to(gallery, {
                x: () => -(gallery.scrollWidth - document.documentElement.clientWidth) + "px",
                ease: "none",
                scrollTrigger: {
                    trigger: ".sold-gallery-wrapper",
                    start: "top top",
                    end: () => "+=" + (gallery.scrollWidth - document.documentElement.clientWidth),
                    scrub: 1,
                    pin: true,
                    invalidateOnRefresh: true,
                }
            });
        }
    }

    // --- FOOTER YEAR ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});