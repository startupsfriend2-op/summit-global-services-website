document.addEventListener('DOMContentLoaded', () => {

    // =========================================
    // Typing Hero Text
    // =========================================
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const services = [
            "Legal Process Outsourcing",
            "Medical Records & IME",
            "Retail Back Office",
            "Accounting & Tax"
        ];
        let serviceIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingDelay = 80;
        let erasingDelay = 40;
        let newTextDelay = 2000;

        function type() {
            const currentService = services[serviceIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentService.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentService.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? erasingDelay : typingDelay;

            if (!isDeleting && charIndex === currentService.length) {
                typeSpeed = newTextDelay;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                serviceIndex = (serviceIndex + 1) % services.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }

        setTimeout(type, 500);
    }

    // =========================================
    // Mobile Menu Toggle
    // =========================================
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    
    if (toggle && links) {
        toggle.addEventListener('click', () => {
            links.classList.toggle('active');
        });
    }

    // =========================================
    // Active Navigation State
    // =========================================
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.nav-links a:not(.btn)').forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        }
    });

    // =========================================
    // FAQ Accordion
    // =========================================
    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(faq => faq.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

    // =========================================
    // Universal Scroll Animation System
    // =========================================

    // Prepare all elements that should animate on scroll
    function prepareAnimations() {
        // 1. Section headings — fade up
        document.querySelectorAll('.section h2, .hero-service h1').forEach(el => {
            if (!el.closest('.navbar') && !el.closest('.footer')) {
                el.classList.add('animate-fade-up');
            }
        });

        // 2. Section subtext paragraphs (directly under .text-center or .container)
        document.querySelectorAll('.text-center > p, .hero-service p, .hero-overlap-card p').forEach(el => {
            el.classList.add('animate-fade-up');
        });

        // 3. Feature cards — staggered fade up
        document.querySelectorAll('.features-grid').forEach(grid => {
            grid.classList.add('stagger-children');
            grid.querySelectorAll('.feature-card').forEach(card => {
                card.classList.add('animate-fade-up');
            });
        });

        // 4. Service cards — staggered fade up
        document.querySelectorAll('.services-grid').forEach(grid => {
            grid.classList.add('stagger-children');
            grid.querySelectorAll('.service-card').forEach(card => {
                card.classList.add('animate-fade-up');
            });
        });

        // 5. Service card modern — staggered
        document.querySelectorAll('.services-modern-grid').forEach(grid => {
            grid.classList.add('stagger-children');
            grid.querySelectorAll('.service-card-modern').forEach(card => {
                card.classList.add('animate-fade-up');
            });
        });

        // 6. CTA sections — scale in
        document.querySelectorAll('.section-dark .container.text-center, .section > .container.text-center').forEach(el => {
            el.classList.add('animate-scale-in');
        });

        // 7. FAQ items — staggered
        document.querySelectorAll('.faq-container').forEach(container => {
            container.classList.add('stagger-children');
            container.querySelectorAll('.faq-item').forEach(item => {
                item.classList.add('animate-fade-up');
            });
        });

        // 8. Footer grid columns — staggered fade up
        document.querySelectorAll('.footer-grid').forEach(grid => {
            grid.classList.add('stagger-children');
            Array.from(grid.children).forEach(child => {
                child.classList.add('animate-fade-up');
            });
        });

        // 9. Contact form & info — slide from sides
        const contactGrid = document.querySelector('[style*="grid-template-columns: 1fr 1fr"]');
        if (contactGrid) {
            const children = Array.from(contactGrid.children);
            if (children[0]) children[0].classList.add('animate-fade-left');
            if (children[1]) children[1].classList.add('animate-fade-right');
        }

        // 10. Services header — fade left for text, fade right for button
        document.querySelectorAll('.services-header').forEach(header => {
            const text = header.querySelector('.services-header-text');
            if (text) text.classList.add('animate-fade-left');
            const btnWrap = header.querySelector('div:last-child');
            if (btnWrap && btnWrap !== text) btnWrap.classList.add('animate-fade-right');
        });

        // 11. Hero service badge text — fade down
        document.querySelectorAll('.hero-service > .container > p:first-child').forEach(el => {
            el.classList.add('animate-fade-down');
        });

        // 12. Hero CTA buttons — fade up with delay
        document.querySelectorAll('.hero-service .btn, .hero-overlap-btns').forEach(el => {
            el.classList.add('animate-fade-up');
        });

        // 13. About page text blocks
        document.querySelectorAll('.section > .container > .fade-in').forEach(el => {
            if (!el.classList.contains('animate-fade-up') && 
                !el.classList.contains('animate-fade-left') && 
                !el.classList.contains('animate-fade-right') &&
                !el.classList.contains('animate-scale-in')) {
                el.classList.add('animate-fade-up');
            }
        });
    }

    prepareAnimations();

    // =========================================
    // IntersectionObserver — trigger animations
    // =========================================
    const animSelectors = '.animate-fade-up, .animate-fade-down, .animate-fade-left, .animate-fade-right, .animate-scale-in';

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.08
    });

    document.querySelectorAll(animSelectors).forEach(el => {
        scrollObserver.observe(el);
    });

    // Immediately reveal elements already in viewport on page load
    requestAnimationFrame(() => {
        document.querySelectorAll(animSelectors).forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85 && rect.bottom > 0) {
                el.classList.add('animate-visible');
                scrollObserver.unobserve(el);
            }
        });
    });

    // =========================================
    // Navbar Scroll Effect (Shrink + Branded Shadow)
    // =========================================
    const navbar = document.querySelector('.navbar');
    let ticking = false;

    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(45, 127, 211, 0.08)';
            navbar.style.padding = '12px 0';
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.padding = '20px 0';
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });

    // =========================================
    // Counter Animation (for data-count elements)
    // =========================================
    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-count') || el.textContent.replace(/[^0-9]/g, ''));
        const suffix = el.textContent.replace(/[0-9,]/g, '');
        const duration = 2000;
        const start = performance.now();
        
        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(target * eased);
            el.textContent = current.toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

    // =========================================
    // Subtle Parallax for Hero Background
    // =========================================
    const heroRight = document.querySelector('.hero-split-bg-right');
    if (heroRight) {
        window.addEventListener('scroll', () => {
            requestAnimationFrame(() => {
                const scrolled = window.scrollY;
                if (scrolled < window.innerHeight) {
                    heroRight.style.transform = `translateY(${scrolled * 0.12}px)`;
                }
            });
        });
    }

    // =========================================
    // 3D Tilt on Cards (subtle, professional)
    // =========================================
    document.querySelectorAll('.service-card, .feature-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / centerY * -2;
            const rotateY = (x - centerX) / centerX * 2;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // =========================================
    // Magnetic CTA Buttons
    // =========================================
    document.querySelectorAll('.btn-primary').forEach(btn => {
        // Skip nav buttons
        if (btn.closest('.navbar')) return;
        
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px) translateY(-2px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });

    // =========================================
    // Contact Form Focus Animations
    // =========================================
    document.querySelectorAll('input, textarea, select').forEach(field => {
        field.addEventListener('focus', () => {
            field.style.borderColor = '#2D7FD3';
            field.style.boxShadow = '0 0 0 3px rgba(45, 127, 211, 0.1)';
        });
        field.addEventListener('blur', () => {
            field.style.borderColor = '#e2e8f0';
            field.style.boxShadow = 'none';
        });
    });

    // =========================================
    // Smooth Page Load Transition
    // =========================================
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease';
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });

});
