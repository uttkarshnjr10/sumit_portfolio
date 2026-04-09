document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const menuButton = document.getElementById('menu-button');
    const closeMenuButton = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav a');
    const backToTopButton = document.getElementById('back-to-top');
    const progressBar = document.getElementById('scroll-progress');
    const portraitShell = document.querySelector('.portrait-shell');

    const openMenu = () => {
        if (!mobileMenu || !menuButton) {
            return;
        }

        mobileMenu.classList.add('is-open');
        document.body.classList.add('menu-open');
        menuButton.setAttribute('aria-expanded', 'true');
    };

    const closeMenu = () => {
        if (!mobileMenu || !menuButton) {
            return;
        }

        mobileMenu.classList.remove('is-open');
        document.body.classList.remove('menu-open');
        menuButton.setAttribute('aria-expanded', 'false');
    };

    if (menuButton) {
        menuButton.addEventListener('click', () => {
            if (mobileMenu && mobileMenu.classList.contains('is-open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    if (closeMenuButton) {
        closeMenuButton.addEventListener('click', closeMenu);
    }

    mobileLinks.forEach((link) => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });

    if (mobileMenu) {
        mobileMenu.addEventListener('click', (event) => {
            if (event.target === mobileMenu) {
                closeMenu();
            }
        });
    }

    const revealItems = document.querySelectorAll('.reveal');
    if (prefersReducedMotion) {
        revealItems.forEach((item) => item.classList.add('visible'));
    } else {
        const observer = new IntersectionObserver((entries, currentObserver) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                const delay = entry.target.getAttribute('data-delay');
                if (delay) {
                    entry.target.style.transitionDelay = `${delay}ms`;
                }

                entry.target.classList.add('visible');
                currentObserver.unobserve(entry.target);
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -8% 0px'
        });

        revealItems.forEach((item) => observer.observe(item));
    }

    const typingElement = document.getElementById('profession-text');
    if (typingElement) {
        const labels = [
            'DNS Cadet at IMI Noida',
            'Fleet Management Sponsored Trainee',
            'Future Merchant Navy Deck Officer'
        ];

        let labelIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const updateTyping = () => {
            const current = labels[labelIndex];

            if (!isDeleting) {
                typingElement.textContent = current.slice(0, charIndex + 1);
                charIndex += 1;

                if (charIndex === current.length) {
                    isDeleting = true;
                    setTimeout(updateTyping, 1500);
                    return;
                }

                setTimeout(updateTyping, 85);
                return;
            }

            typingElement.textContent = current.slice(0, charIndex - 1);
            charIndex -= 1;

            if (charIndex === 0) {
                isDeleting = false;
                labelIndex = (labelIndex + 1) % labels.length;
                setTimeout(updateTyping, 420);
                return;
            }

            setTimeout(updateTyping, 50);
        };

        setTimeout(updateTyping, 750);
    }

    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-nav a');

    const updateActiveLink = () => {
        const currentOffset = window.scrollY + 180;
        let currentId = '';

        sections.forEach((section) => {
            const top = section.offsetTop;
            const height = section.offsetHeight;

            if (currentOffset >= top && currentOffset < top + height) {
                currentId = section.id;
            }
        });

        navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            const isActive = href === `#${currentId}`;
            link.classList.toggle('active', Boolean(currentId) && isActive);
        });
    };

    const updateScrollUI = () => {
        const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = totalScroll > 0 ? (window.scrollY / totalScroll) * 100 : 0;

        if (progressBar) {
            progressBar.style.width = `${Math.min(scrolled, 100)}%`;
        }

        if (backToTopButton) {
            backToTopButton.classList.toggle('show', window.scrollY > 520);
        }

        updateActiveLink();
    };

    window.addEventListener('scroll', updateScrollUI, { passive: true });
    window.addEventListener('resize', updateScrollUI);
    updateScrollUI();

    if (backToTopButton) {
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        });
    }

    if (portraitShell && !prefersReducedMotion) {
        window.addEventListener('mousemove', (event) => {
            if (window.innerWidth < 980) {
                portraitShell.style.transform = '';
                return;
            }

            const xRatio = (event.clientX / window.innerWidth - 0.5) * 2;
            const yRatio = (event.clientY / window.innerHeight - 0.5) * 2;

            portraitShell.style.transform = `translate3d(${xRatio * 8}px, ${yRatio * 6}px, 0)`;
        });
    }

    if (typeof particlesJS !== 'undefined') {
        const particleCount = window.innerWidth < 768 ? 42 : 68;

        particlesJS('particles-js', {
            particles: {
                number: {
                    value: particleCount,
                    density: {
                        enable: true,
                        value_area: 900
                    }
                },
                color: {
                    value: ['#5ab4dd', '#f3bb6b', '#9dd6f0']
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.38,
                    random: true
                },
                size: {
                    value: 2.8,
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 148,
                    color: '#4a90ba',
                    opacity: 0.24,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1.8,
                    direction: 'none',
                    out_mode: 'out',
                    random: false,
                    straight: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    repulse: {
                        distance: 90,
                        duration: 0.45
                    },
                    push: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }

    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = String(new Date().getFullYear());
    }
});
