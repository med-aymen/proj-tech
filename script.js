// ========================================
// Navigation
// ========================================

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Scroll effect on navbar
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ========================================
// Smooth Scroll with Offset
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Particles Background Animation
// ========================================

function createParticles() {
    const particlesBg = document.getElementById('particles-bg');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: ${Math.random() > 0.5 ? 'rgba(0, 240, 255, 0.3)' : 'rgba(255, 0, 247, 0.3)'};
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        particlesBg.appendChild(particle);
    }
    
    // Add CSS animation for particles
    if (!document.getElementById('particle-animation')) {
        const style = document.createElement('style');
        style.id = 'particle-animation';
        style.textContent = `
            @keyframes float {
                0%, 100% {
                    transform: translate(0, 0);
                    opacity: 0;
                }
                10%, 90% {
                    opacity: 1;
                }
                50% {
                    transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

createParticles();

// ========================================
// Reveal Elements on Scroll
// ========================================

const revealElements = document.querySelectorAll('.reveal-element');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 100;
        
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('revealed');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ========================================
// Parallax Effect on Hero
// ========================================

const heroBgImg = document.querySelector('.hero-bg-img');
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.5;
    
    if (heroBgImg) {
        heroBgImg.style.transform = `translateY(${rate}px)`;
    }
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${rate}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// ========================================
// Gallery Modal
// ========================================

const galleryItems = document.querySelectorAll('.gallery-item');
const modal = document.getElementById('galleryModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalClose = document.getElementById('modalClose');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const overlay = item.querySelector('.gallery-overlay');
        const title = overlay.querySelector('h3').textContent;
        const description = overlay.querySelector('p').textContent;
        
        modalImage.src = img.src;
        modalImage.alt = img.alt;
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Close modal
modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ========================================
// Back to Top Button
// ========================================

const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================================
// Animated Counters for Stats
// ========================================

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.ceil(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// Observe stats for animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValues = entry.target.querySelectorAll('.stat-value');
            statValues.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.match(/\d+/)?.[0]);
                
                if (number && !stat.dataset.animated) {
                    stat.dataset.animated = 'true';
                    const originalText = stat.textContent;
                    stat.textContent = '0';
                    
                    setTimeout(() => {
                        animateCounter(stat, number);
                        setTimeout(() => {
                            stat.textContent = originalText;
                        }, 2100);
                    }, 300);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.card-stats').forEach(card => {
    statsObserver.observe(card);
});

// ========================================
// Animate Comparison Bars
// ========================================

const barsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                setTimeout(() => {
                    bar.style.width = bar.style.width || '0%';
                    const targetWidth = bar.getAttribute('style').match(/width:\s*(\d+)%/)?.[1] || 0;
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = `${targetWidth}%`;
                    }, 100);
                }, index * 200);
            });
            barsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.applications-chart').forEach(chart => {
    barsObserver.observe(chart);
});

// ========================================
// Radar Chart (Simple Canvas Implementation)
// ========================================

function drawRadarChart() {
    const canvas = document.getElementById('radarChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.parentElement.offsetWidth;
    const height = Math.min(400, width);
    
    canvas.width = width;
    canvas.height = height;
    
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 60;
    
    const categories = [
        'Légèreté',
        'Résistance',
        'Thermique',
        'Coût',
        'Corrosion',
        'Durabilité'
    ];
    
    const compositeData = [5, 5, 3, 2, 5, 4];
    const mineralData = [2, 4, 5, 4, 4, 5];
    
    const angleStep = (Math.PI * 2) / categories.length;
    
    // Draw background circles
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    
    for (let i = 1; i <= 5; i++) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, (radius / 5) * i, 0, Math.PI * 2);
        ctx.stroke();
    }
    
    // Draw axes
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1;
    
    for (let i = 0; i < categories.length; i++) {
        const angle = angleStep * i - Math.PI / 2;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.stroke();
        
        // Draw labels
        ctx.fillStyle = '#b0b0c3';
        ctx.font = '14px Space Grotesk';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const labelX = centerX + Math.cos(angle) * (radius + 30);
        const labelY = centerY + Math.sin(angle) * (radius + 30);
        
        ctx.fillText(categories[i], labelX, labelY);
    }
    
    // Draw composite data
    ctx.strokeStyle = '#00f0ff';
    ctx.fillStyle = 'rgba(0, 240, 255, 0.2)';
    ctx.lineWidth = 3;
    
    ctx.beginPath();
    for (let i = 0; i < compositeData.length; i++) {
        const angle = angleStep * i - Math.PI / 2;
        const value = (compositeData[i] / 5) * radius;
        const x = centerX + Math.cos(angle) * value;
        const y = centerY + Math.sin(angle) * value;
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // Draw composite points
    ctx.fillStyle = '#00f0ff';
    for (let i = 0; i < compositeData.length; i++) {
        const angle = angleStep * i - Math.PI / 2;
        const value = (compositeData[i] / 5) * radius;
        const x = centerX + Math.cos(angle) * value;
        const y = centerY + Math.sin(angle) * value;
        
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Draw mineral data
    ctx.strokeStyle = '#ff00f7';
    ctx.fillStyle = 'rgba(255, 0, 247, 0.2)';
    ctx.lineWidth = 3;
    
    ctx.beginPath();
    for (let i = 0; i < mineralData.length; i++) {
        const angle = angleStep * i - Math.PI / 2;
        const value = (mineralData[i] / 5) * radius;
        const x = centerX + Math.cos(angle) * value;
        const y = centerY + Math.sin(angle) * value;
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // Draw mineral points
    ctx.fillStyle = '#ff00f7';
    for (let i = 0; i < mineralData.length; i++) {
        const angle = angleStep * i - Math.PI / 2;
        const value = (mineralData[i] / 5) * radius;
        const x = centerX + Math.cos(angle) * value;
        const y = centerY + Math.sin(angle) * value;
        
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Draw legend
    const legendY = height - 20;
    
    // Composite legend
    ctx.fillStyle = '#00f0ff';
    ctx.fillRect(centerX - 100, legendY, 20, 3);
    ctx.fillStyle = '#b0b0c3';
    ctx.font = '12px Space Grotesk';
    ctx.textAlign = 'left';
    ctx.fillText('Composites', centerX - 75, legendY + 2);
    
    // Mineral legend
    ctx.fillStyle = '#ff00f7';
    ctx.fillRect(centerX + 20, legendY, 20, 3);
    ctx.fillStyle = '#b0b0c3';
    ctx.fillText('Minéraux', centerX + 45, legendY + 2);
}

// Draw radar chart when visible
const radarObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(drawRadarChart, 300);
            radarObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const radarChart = document.getElementById('radarChart');
if (radarChart) {
    radarObserver.observe(radarChart.parentElement);
}

// Redraw on resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (document.getElementById('radarChart')) {
            drawRadarChart();
        }
    }, 300);
});

// ========================================
// Hover Effects for Cards
// ========================================

const cards = document.querySelectorAll('.glass-card, .type-card, .gallery-item');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ========================================
// Loading Animation
// ========================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial reveal
    setTimeout(() => {
        revealOnScroll();
    }, 100);
});

// ========================================
// Cursor Trail Effect (Optional - Decorative)
// ========================================

let cursorTrail = [];
const trailLength = 10;

document.addEventListener('mousemove', (e) => {
    if (window.innerWidth < 768) return; // Disable on mobile
    
    cursorTrail.push({ x: e.clientX, y: e.clientY });
    
    if (cursorTrail.length > trailLength) {
        cursorTrail.shift();
    }
    
    // You can add visual trail elements here if desired
});

// ========================================
// Keyboard Navigation Enhancement
// ========================================

document.addEventListener('keydown', (e) => {
    // Space or Enter on buttons
    if ((e.key === ' ' || e.key === 'Enter') && e.target.tagName === 'BUTTON') {
        e.preventDefault();
        e.target.click();
    }
    
    // Navigation with arrow keys
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        const scrollAmount = window.innerHeight / 2;
        
        if (e.key === 'ArrowUp') {
            window.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
        } else {
            window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
        }
    }
});

// ========================================
// Performance Optimization - Lazy Loading
// ========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// Active Navigation Link Highlight
// ========================================

const sections = document.querySelectorAll('.section');
const navLinksArray = Array.from(navLinks);

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - navbar.offsetHeight - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksArray.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ========================================
// Console Welcome Message
// ========================================

console.log('%c🔬 Bienvenue sur MatériauxPro! 🔬', 
    'font-size: 20px; font-weight: bold; color: #00f0ff; text-shadow: 2px 2px 4px rgba(0,240,255,0.3);');
console.log('%cProjet éducatif sur les matériaux composites et minéraux', 
    'font-size: 14px; color: #b0b0c3;');
console.log('%cDéveloppé avec ❤️ par l\'équipe du projet', 
    'font-size: 12px; color: #6a6a7a; font-style: italic;');

// ========================================
// Accessibility Improvements
// ========================================

// Add skip to main content link
const skipLink = document.createElement('a');
skipLink.href = '#composites';
skipLink.className = 'skip-link';
skipLink.textContent = 'Passer au contenu principal';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--primary-color);
    color: var(--dark-bg);
    padding: 8px;
    text-decoration: none;
    z-index: 10000;
`;
skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
});
skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
});
document.body.insertBefore(skipLink, document.body.firstChild);

// Announce page changes for screen readers
function announcePageChange(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Add screen reader only class
const srOnlyStyle = document.createElement('style');
srOnlyStyle.textContent = `
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
    }
`;
document.head.appendChild(srOnlyStyle);

// ========================================
// Theme Toggle (Optional Enhancement)
// ========================================

// You can add a theme toggle button if needed
// This is a placeholder for potential future enhancement

// ========================================
// Service Worker Registration (for PWA)
// ========================================

if ('serviceWorker' in navigator) {
    // Uncomment when you have a service worker file
    // navigator.serviceWorker.register('/sw.js')
    //     .then(reg => console.log('Service Worker registered'))
    //     .catch(err => console.log('Service Worker registration failed'));
}

// ========================================
// Initialize Everything
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Initial setup
    revealOnScroll();
    
    // Add loaded class to body
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});
