// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Accordion functionality for FAQs
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const accordionItem = header.parentElement;
        const isActive = accordionItem.classList.contains('active');
        
        // Close all accordion items
        document.querySelectorAll('.accordion-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            accordionItem.classList.add('active');
        }
    });
});

// Form validation
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form fields
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const phone = this.querySelector('input[type="tel"]').value;
        const course = this.querySelector('select').value;
        const message = this.querySelector('textarea').value;
        
        // Basic validation
        let isValid = true;
        let errorMessage = '';
        
        if (!name.trim()) {
            isValid = false;
            errorMessage += 'Please enter your name.\n';
        }
        
        if (!email.trim() || !isValidEmail(email)) {
            isValid = false;
            errorMessage += 'Please enter a valid email address.\n';
        }
        
        if (!phone.trim() || !isValidPhone(phone)) {
            isValid = false;
            errorMessage += 'Please enter a valid phone number.\n';
        }
        
        if (!course) {
            isValid = false;
            errorMessage += 'Please select a preferred course.\n';
        }
        
        if (!message.trim()) {
            isValid = false;
            errorMessage += 'Please enter your message.\n';
        }
        
        if (isValid) {
            // Here you would typically send the form data to a server
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        } else {
            alert(errorMessage);
        }
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation helper
function isValidPhone(phone) {
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    return phoneRegex.test(phone);
}

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements with animation
document.querySelectorAll('.service-card, .feature, .testimonial-card').forEach(element => {
    element.classList.add('fade-in');
    observer.observe(element);
});

// Mobile menu toggle
const mobileMenuButton = document.createElement('button');
mobileMenuButton.classList.add('mobile-menu-button');
mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';

const nav = document.querySelector('.nav');
const headerContainer = document.querySelector('.header .container');

headerContainer.insertBefore(mobileMenuButton, nav);

mobileMenuButton.addEventListener('click', () => {
    nav.classList.toggle('active');
    mobileMenuButton.innerHTML = nav.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !mobileMenuButton.contains(e.target)) {
        nav.classList.remove('active');
        mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// Loading Animation
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.createElement('div');
    loader.className = 'loading';
    loader.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loader);

    window.addEventListener('load', () => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    });
});

// Scroll Reveal Animation
const scrollReveal = () => {
    const elements = document.querySelectorAll('.service-card, .testimonial-card, .stat-card, .feature');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', scrollReveal);
window.addEventListener('load', scrollReveal);

// Parallax Effect for Hero Section
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (hero) {
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// Animated Counter for Statistics
const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            clearInterval(timer);
            current = target;
        }
        element.textContent = Math.floor(current) + (element.dataset.suffix || '');
    }, 20);
};

// Initialize counters when they come into view
const counterObserverCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target.querySelector('h3');
            const target = parseInt(counter.textContent);
            animateCounter(counter, target);
            observer.unobserve(entry.target);
        }
    });
};

const counterObserver = new IntersectionObserver(counterObserverCallback, {
    threshold: 0.5
});

document.querySelectorAll('.stat-card').forEach(card => {
    counterObserver.observe(card);
});

// Testimonial Card Hover Effect
document.querySelectorAll('.testimonial-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Mobile Menu Toggle
const createMobileMenu = () => {
    const headerContainer = document.querySelector('.header .container');
    const nav = document.querySelector('.nav');
    
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-button';
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    menuButton.setAttribute('aria-label', 'Toggle navigation menu');
    
    headerContainer.insertBefore(menuButton, nav);
    
    menuButton.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuButton.innerHTML = nav.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !menuButton.contains(e.target)) {
            nav.classList.remove('active');
            menuButton.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Close menu when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            nav.classList.remove('active');
            menuButton.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
};

// Initialize mobile menu for smaller screens
if (window.innerWidth <= 768) {
    createMobileMenu();
}

// Form Validation and Animation
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Add loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual form submission)
        setTimeout(() => {
            submitButton.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
            submitButton.style.backgroundColor = '#27ae60';
            
            // Reset form after success
            setTimeout(() => {
                form.reset();
                submitButton.textContent = originalText;
                submitButton.style.backgroundColor = '';
                submitButton.disabled = false;
            }, 2000);
        }, 1500);
    });
});

// Add hover effect to service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('i');
        icon.style.transform = 'scale(1.2) rotate(5deg)';
    });
    
    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('i');
        icon.style.transform = 'scale(1) rotate(0)';
    });
});

// Initialize AOS (Animate On Scroll) for elements
const initAOS = () => {
    const elements = document.querySelectorAll('.service-card, .testimonial-card, .stat-card');
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.5s ease-out';
        element.style.transitionDelay = `${index * 0.1}s`;
    });
    
    const aosObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => aosObserver.observe(element));
};

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initAOS();
    scrollReveal();
    
    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Load theme switcher
const themeScript = document.createElement('script');
themeScript.src = 'theme-switcher.js';
document.body.appendChild(themeScript); 