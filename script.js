document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    const menuOverlay = document.getElementById('menu-overlay');

    const toggleMenu = () => {
        const isActive = navLinks.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.style.overflow = isActive ? 'hidden' : '';
        
        mobileMenuBtn.setAttribute('aria-expanded', isActive);
        const icon = mobileMenuBtn.querySelector('i');
        
        if (isActive) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
            mobileMenuBtn.setAttribute('aria-label', 'Cerrar menú de navegación');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
            mobileMenuBtn.setAttribute('aria-label', 'Abrir menú de navegación');
        }
    };

    mobileMenuBtn.addEventListener('click', toggleMenu);
    menuOverlay.addEventListener('click', toggleMenu);

    // Close mobile menu when a link is clicked
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Close menu with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            toggleMenu();
            mobileMenuBtn.focus();
        }
    });


    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Hero Parallax Effect ---
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrollValue = window.scrollY;
        if (scrollValue < window.innerHeight) {
            hero.style.backgroundPositionY = `${scrollValue * 0.5}px`;
        }
    });


    // --- Intersection Observer for Scroll Animations ---
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.15 // 15% of the element is visible
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once it's visible to animate only once
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        fadeObserver.observe(el);
    });

});
