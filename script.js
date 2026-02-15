document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
        if (savedTheme === 'dark-mode') {
            icon.classList.replace('fa-moon', 'fa-sun');
        }
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark-mode');
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            localStorage.removeItem('theme');
            icon.classList.replace('fa-sun', 'fa-moon');
        }
    });

    // Mobile Menu Logic
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

    function toggleMenu() {
        navList.classList.toggle('active');
        const iconInfo = mobileMenuToggle.querySelector('i');
        
        if (navList.classList.contains('active')) {
            iconInfo.classList.replace('fa-bars', 'fa-times');
            // Prevent body scroll when menu is open
            document.body.style.overflow = 'hidden'; 
        } else {
            iconInfo.classList.replace('fa-times', 'fa-bars');
            document.body.style.overflow = '';
        }
    }

    mobileMenuToggle.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navList.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Header Shadow on Scroll
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 1px 0 var(--border-color)';
        }
    });

    // Smooth Scroll for Anchors (Standard browser behavior is usually enough, but ensuring it)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Account for fixed header height
                const headerHeight = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
        
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});
