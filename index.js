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
// SVG CONNECTORS — dynamically drawn to always
// align with the actual DOM position of the
// root card and the two front sections.
// ============================================
const SVG_NS = 'http://www.w3.org/2000/svg';

function drawConnectors() {
    const svg = document.getElementById('connectorSvg');
    const layer = document.getElementById('connectorLayer');
    const rootCard = document.getElementById('rootCard');
    const frontEditora = document.getElementById('frontEditora');
    const frontMoodle = document.getElementById('frontMoodle');

    if (!svg || !layer || !rootCard || !frontEditora || !frontMoodle) return;

    // Clear previous paths
    svg.innerHTML = '';

    // Add gradient definitions
    const defs = document.createElementNS(SVG_NS, 'defs');

    // Left gradient (indigo → purple)
    const gradLeft = document.createElementNS(SVG_NS, 'linearGradient');
    gradLeft.id = 'gradLeft';
    gradLeft.setAttribute('x1', '0');
    gradLeft.setAttribute('y1', '0');
    gradLeft.setAttribute('x2', '0');
    gradLeft.setAttribute('y2', '1');
    const stopL1 = document.createElementNS(SVG_NS, 'stop');
    stopL1.setAttribute('offset', '0%');
    stopL1.setAttribute('stop-color', '#6366f1');
    const stopL2 = document.createElementNS(SVG_NS, 'stop');
    stopL2.setAttribute('offset', '100%');
    stopL2.setAttribute('stop-color', '#8b5cf6');
    gradLeft.appendChild(stopL1);
    gradLeft.appendChild(stopL2);

    // Right gradient (cyan → emerald)
    const gradRight = document.createElementNS(SVG_NS, 'linearGradient');
    gradRight.id = 'gradRight';
    gradRight.setAttribute('x1', '0');
    gradRight.setAttribute('y1', '0');
    gradRight.setAttribute('x2', '0');
    gradRight.setAttribute('y2', '1');
    const stopR1 = document.createElementNS(SVG_NS, 'stop');
    stopR1.setAttribute('offset', '0%');
    stopR1.setAttribute('stop-color', '#06b6d4');
    const stopR2 = document.createElementNS(SVG_NS, 'stop');
    stopR2.setAttribute('offset', '100%');
    stopR2.setAttribute('stop-color', '#10b981');
    gradRight.appendChild(stopR1);
    gradRight.appendChild(stopR2);

    // Horizontal gradient
    const gradH = document.createElementNS(SVG_NS, 'linearGradient');
    gradH.id = 'gradH';
    gradH.setAttribute('x1', '0');
    gradH.setAttribute('y1', '0');
    gradH.setAttribute('x2', '1');
    gradH.setAttribute('y2', '0');
    const stopH1 = document.createElementNS(SVG_NS, 'stop');
    stopH1.setAttribute('offset', '0%');
    stopH1.setAttribute('stop-color', '#6366f1');
    const stopH2 = document.createElementNS(SVG_NS, 'stop');
    stopH2.setAttribute('offset', '100%');
    stopH2.setAttribute('stop-color', '#06b6d4');
    gradH.appendChild(stopH1);
    gradH.appendChild(stopH2);

    // Glow filter
    const filter = document.createElementNS(SVG_NS, 'filter');
    filter.id = 'glow';
    filter.setAttribute('x', '-20%');
    filter.setAttribute('y', '-20%');
    filter.setAttribute('width', '140%');
    filter.setAttribute('height', '140%');
    const feGaussian = document.createElementNS(SVG_NS, 'feGaussianBlur');
    feGaussian.setAttribute('stdDeviation', '2');
    feGaussian.setAttribute('result', 'blur');
    const feMerge = document.createElementNS(SVG_NS, 'feMerge');
    const feMerge1 = document.createElementNS(SVG_NS, 'feMergeNode');
    feMerge1.setAttribute('in', 'blur');
    const feMerge2 = document.createElementNS(SVG_NS, 'feMergeNode');
    feMerge2.setAttribute('in', 'SourceGraphic');
    feMerge.appendChild(feMerge1);
    feMerge.appendChild(feMerge2);
    filter.appendChild(feGaussian);
    filter.appendChild(feMerge);

    defs.appendChild(gradLeft);
    defs.appendChild(gradRight);
    defs.appendChild(gradH);
    defs.appendChild(filter);
    svg.appendChild(defs);

    // Calculate positions relative to the connector layer
    const layerRect = layer.getBoundingClientRect();
    const rootRect = rootCard.getBoundingClientRect();
    const editoraRect = frontEditora.getBoundingClientRect();
    const moodleRect = frontMoodle.getBoundingClientRect();

    // Root bottom center (relative to layer)
    const rootBottomX = rootRect.left + rootRect.width / 2 - layerRect.left;
    const topY = 0;

    // Front top centers (relative to layer)
    const editoraTopX = editoraRect.left + editoraRect.width / 2 - layerRect.left;
    const moodleTopX = moodleRect.left + moodleRect.width / 2 - layerRect.left;
    const bottomY = layerRect.height;

    // Mid point for horizontal bar
    const midY = layerRect.height * 0.45;

    // Draw center vertical line (from root)
    const vertLine = document.createElementNS(SVG_NS, 'line');
    vertLine.setAttribute('x1', rootBottomX);
    vertLine.setAttribute('y1', topY);
    vertLine.setAttribute('x2', rootBottomX);
    vertLine.setAttribute('y2', midY);
    vertLine.setAttribute('stroke', '#6366f1');
    vertLine.setAttribute('stroke-width', '2');
    vertLine.setAttribute('filter', 'url(#glow)');
    svg.appendChild(vertLine);

    // Draw center dot
    const centerDot = document.createElementNS(SVG_NS, 'circle');
    centerDot.setAttribute('cx', rootBottomX);
    centerDot.setAttribute('cy', midY);
    centerDot.setAttribute('r', '4');
    centerDot.setAttribute('fill', '#8b5cf6');
    centerDot.setAttribute('filter', 'url(#glow)');
    svg.appendChild(centerDot);

    // Draw horizontal bar
    const hLine = document.createElementNS(SVG_NS, 'line');
    hLine.setAttribute('x1', editoraTopX);
    hLine.setAttribute('y1', midY);
    hLine.setAttribute('x2', moodleTopX);
    hLine.setAttribute('y2', midY);
    hLine.setAttribute('stroke', 'url(#gradH)');
    hLine.setAttribute('stroke-width', '2');
    hLine.setAttribute('filter', 'url(#glow)');
    svg.appendChild(hLine);

    // Draw left branch (to editora)
    const leftBranch = document.createElementNS(SVG_NS, 'line');
    leftBranch.setAttribute('x1', editoraTopX);
    leftBranch.setAttribute('y1', midY);
    leftBranch.setAttribute('x2', editoraTopX);
    leftBranch.setAttribute('y2', bottomY);
    leftBranch.setAttribute('stroke', 'url(#gradLeft)');
    leftBranch.setAttribute('stroke-width', '2');
    leftBranch.setAttribute('filter', 'url(#glow)');
    svg.appendChild(leftBranch);

    // Draw right branch (to moodle)
    const rightBranch = document.createElementNS(SVG_NS, 'line');
    rightBranch.setAttribute('x1', moodleTopX);
    rightBranch.setAttribute('y1', midY);
    rightBranch.setAttribute('x2', moodleTopX);
    rightBranch.setAttribute('y2', bottomY);
    rightBranch.setAttribute('stroke', 'url(#gradRight)');
    rightBranch.setAttribute('stroke-width', '2');
    rightBranch.setAttribute('filter', 'url(#glow)');
    svg.appendChild(rightBranch);

    // End dots
    const leftDot = document.createElementNS(SVG_NS, 'circle');
    leftDot.setAttribute('cx', editoraTopX);
    leftDot.setAttribute('cy', bottomY - 1);
    leftDot.setAttribute('r', '3');
    leftDot.setAttribute('fill', '#8b5cf6');
    leftDot.setAttribute('filter', 'url(#glow)');
    svg.appendChild(leftDot);

    const rightDot = document.createElementNS(SVG_NS, 'circle');
    rightDot.setAttribute('cx', moodleTopX);
    rightDot.setAttribute('cy', bottomY - 1);
    rightDot.setAttribute('r', '3');
    rightDot.setAttribute('fill', '#10b981');
    rightDot.setAttribute('filter', 'url(#glow)');
    svg.appendChild(rightDot);

    // Junction dots on horizontal bar
    const leftJunction = document.createElementNS(SVG_NS, 'circle');
    leftJunction.setAttribute('cx', editoraTopX);
    leftJunction.setAttribute('cy', midY);
    leftJunction.setAttribute('r', '3');
    leftJunction.setAttribute('fill', '#6366f1');
    leftJunction.setAttribute('filter', 'url(#glow)');
    svg.appendChild(leftJunction);

    const rightJunction = document.createElementNS(SVG_NS, 'circle');
    rightJunction.setAttribute('cx', moodleTopX);
    rightJunction.setAttribute('cy', midY);
    rightJunction.setAttribute('r', '3');
    rightJunction.setAttribute('fill', '#06b6d4');
    rightJunction.setAttribute('filter', 'url(#glow)');
    svg.appendChild(rightJunction);
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

    // Draw connectors after layout settles
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            drawConnectors();
        });
    });

    // Redraw on resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(drawConnectors, 100);
    });
});
