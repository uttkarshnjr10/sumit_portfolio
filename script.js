// This script handles the mobile menu toggle and the scroll reveal animation.

// Function to handle the mobile menu toggle
function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('-translate-x-full');
}

// Function to close the mobile menu
function closeMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.add('-translate-x-full');
}

// Attach event listeners to the menu button and navigation links
document.getElementById('menu-button').addEventListener('click', toggleMenu);

// Select all scroll reveal items
const scrollRevealItems = document.querySelectorAll('.animate-on-scroll');

// Create a new IntersectionObserver
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Unobserve the element once it's visible to avoid redundant checks
            observer.unobserve(entry.target);
        }
    });
}, {
    // options
    threshold: 0.2 // Trigger when 20% of the item is visible
});

// Observe each item
scrollRevealItems.forEach(item => {
    observer.observe(item);
});

// Fade in the main content on page load
window.addEventListener('load', () => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        mainContent.style.opacity = '1';
    }
    // Initialize Particles.js
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 6,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "repulse"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 400,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }

    // Typing Effect Logic
    const professions = ["A Digital Creator", "A Youtuber & Gamer", "An AI Explorer"];
    let professionIndex = 0;
    let charIndex = 0;
    const professionTextElement = document.getElementById("profession-text");

    function type() {
        if (professionIndex < professions.length) {
            const currentProfession = professions[professionIndex];
            if (charIndex < currentProfession.length) {
                professionTextElement.textContent += currentProfession.charAt(charIndex);
                charIndex++;
                setTimeout(type, 100); // Typing speed
            } else {
                setTimeout(erase, 2000); // Wait 2 seconds before erasing
            }
        }
    }

    function erase() {
        if (charIndex > 0) {
            const currentText = professionTextElement.textContent;
            professionTextElement.textContent = currentText.substring(0, currentText.length - 1);
            charIndex--;
            setTimeout(erase, 50); // Erasing speed
        } else {
            professionIndex = (professionIndex + 1) % professions.length;
            setTimeout(type, 500); // Wait 0.5 seconds before typing the next profession
        }
    }

    // Start the typing animation
    if (professionTextElement) {
        setTimeout(type, 1500); // Initial delay
    }
});
