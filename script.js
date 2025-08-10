// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add scroll effect to navigation
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('.main-nav');
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // Add active class to current navigation item
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-menu a');
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPage) {
            item.classList.add('active');
        }
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.project-card, .skill-item, .about-preview');
    animateElements.forEach(el => observer.observe(el));
});

// Form validation for contact form
function validateContactForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return false;
    }
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add loading state to buttons
function addLoadingState(button) {
    const originalText = button.textContent;
    button.textContent = 'Sending...';
    button.disabled = true;
    
    // Reset after 3 seconds (form submission should handle this properly)
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
    }, 3000);
}

// Smooth reveal animation for elements
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Add reveal class to elements
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.project-card, .skill-item, .about-preview');
    elements.forEach(el => el.classList.add('reveal'));
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
});
