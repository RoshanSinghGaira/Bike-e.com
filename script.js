/* ============================================
   VELOURA BIKES - Premium E-Commerce
   Interactive JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ============================
    // PRELOADER
    // ============================
    const preloader = document.getElementById('preloader');

    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            // Remove preloader from DOM after animation completes
            setTimeout(() => {
                preloader.remove();
            }, 600);
        }, 2000);
    });

    // Fallback: hide preloader after max wait time
    setTimeout(() => {
        if (preloader && !preloader.classList.contains('hidden')) {
            preloader.classList.add('hidden');
        }
    }, 4000);

    // ============================
    // HEADER SCROLL BEHAVIOR
    // ============================
    const header = document.getElementById('header');
    let lastScrollY = 0;
    let ticking = false;

    function updateHeader() {
        const scrollY = window.scrollY;

        if (scrollY > 80) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }

        lastScrollY = scrollY;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });

    // ============================
    // MOBILE NAVIGATION
    // ============================
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav__link');

    function toggleMobileMenu() {
        const isActive = menuToggle.classList.toggle('active');
        mobileNav.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', isActive);
        document.body.style.overflow = isActive ? 'hidden' : '';
    }

    menuToggle.addEventListener('click', toggleMobileMenu);

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
            toggleMobileMenu();
        }
    });

    // ============================
    // SMOOTH SCROLL FOR ANCHORS
    // ============================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================
    // SCROLL REVEAL ANIMATIONS
    // ============================
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ============================
    // BACK TO TOP BUTTON
    // ============================
    const backToTop = document.getElementById('back-to-top');

    function toggleBackToTop() {
        if (window.scrollY > 600) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', () => {
        requestAnimationFrame(toggleBackToTop);
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ============================
    // NEWSLETTER FORM
    // ============================
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterEmail = document.getElementById('newsletter-email');
    const newsletterSubmit = document.getElementById('newsletter-submit');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = newsletterEmail.value.trim();
            if (!email) return;

            // Simulate subscription
            const originalText = newsletterSubmit.innerHTML;
            newsletterSubmit.innerHTML = `
                Subscribed
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
            `;
            newsletterSubmit.style.backgroundColor = '#4a7c59';
            newsletterSubmit.style.color = '#ffffff';
            newsletterEmail.value = '';
            newsletterSubmit.disabled = true;

            setTimeout(() => {
                newsletterSubmit.innerHTML = originalText;
                newsletterSubmit.style.backgroundColor = '';
                newsletterSubmit.style.color = '';
                newsletterSubmit.disabled = false;
            }, 3000);
        });
    }

    // ============================
    // ACTIVE NAV LINK HIGHLIGHTING
    // ============================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.header__nav-link');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-100px 0px -50% 0px'
    });

    sections.forEach(section => navObserver.observe(section));

    // ============================
    // PARALLAX EFFECT ON HERO
    // ============================
    const heroBg = document.querySelector('.hero__bg img');

    if (heroBg && window.matchMedia('(min-width: 768px)').matches) {
        window.addEventListener('scroll', () => {
            requestAnimationFrame(() => {
                const scrolled = window.scrollY;
                if (scrolled < window.innerHeight) {
                    heroBg.style.transform = `scale(${1.05 + scrolled * 0.0002}) translateY(${scrolled * 0.15}px)`;
                }
            });
        });
    }

    // ============================
    // COUNTER ANIMATION FOR STATS
    // ============================
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            const current = Math.round(start + (target - start) * eased);
            element.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // ============================
    // IMAGE LAZY LOADING ENHANCEMENT
    // ============================
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.6s ease';

                    img.addEventListener('load', () => {
                        img.style.opacity = '1';
                    });

                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ============================
    // PRODUCT CARD HOVER TILT (subtle)
    // ============================
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (window.matchMedia('(min-width: 768px)').matches) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / centerY * -2;
                const rotateY = (x - centerX) / centerX * 2;

                card.style.transform = `translateY(-8px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ============================
    // KEYBOARD ACCESSIBILITY
    // ============================
    // Focus visible styles
    document.body.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });

    document.body.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-nav');
    });

    // ============================
    // PERFORMANCE: Debounce utility
    // ============================
    function debounce(func, wait = 100) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    // Handle window resize
    window.addEventListener('resize', debounce(() => {
        // Close mobile nav on desktop resize
        if (window.innerWidth > 1024 && mobileNav.classList.contains('active')) {
            toggleMobileMenu();
        }
    }));

    // ============================
    // PAGE LOAD COMPLETE LOG
    // ============================
    console.log('%cVeloura Bikes', 'font-family: "Playfair Display", serif; font-size: 24px; font-weight: 700; color: #c8a96e;');
    console.log('%cCrafted for the Road Ahead.', 'font-family: Inter, sans-serif; font-size: 12px; color: #6b6b6b; letter-spacing: 2px;');
});
