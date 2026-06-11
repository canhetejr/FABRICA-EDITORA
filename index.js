// ============================================
// PARTICLES BACKGROUND
// ============================================
function createParticles() {
    const container = document.getElementById('particles');
    const colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'];
    const count = 40;

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.animationDelay = Math.random() * 12 + 's';
        particle.style.animationDuration = (8 + Math.random() * 8) + 's';
        particle.style.width = (2 + Math.random() * 3) + 'px';
        particle.style.height = particle.style.width;
        container.appendChild(particle);
    }
}

// ============================================
// SCROLL REVEAL
// ============================================
function initScrollReveal() {
    const elements = document.querySelectorAll(
        '.org-front, .nucleo-card, .summary-card, .rationale-card'
    );

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
        }
    );

    elements.forEach((el) => observer.observe(el));
}

// ============================================
// COUNTER ANIMATION
// ============================================
function animateCounter(element, target, duration = 1500) {
    let start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);

        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

function initCounters() {
    const counters = {
        counterExisting: 8,
        counterNew: 16,
        counterTotal: 24,
        counterNucleos: 7,
    };

    const summarySection = document.querySelector('.summary-section');
    let animated = false;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !animated) {
                    animated = true;
                    Object.entries(counters).forEach(([id, target]) => {
                        const el = document.getElementById(id);
                        if (el) {
                            animateCounter(el, target);
                        }
                    });
                }
            });
        },
        { threshold: 0.3 }
    );

    observer.observe(summarySection);
}

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    initScrollReveal();
    initCounters();
});
