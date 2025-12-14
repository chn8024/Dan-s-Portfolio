// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const taglineElement = document.getElementById('tagline');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const messageError = document.getElementById('message-error');
const successMessage = document.getElementById('success-message');
const navLinks = document.querySelectorAll('.nav-link');
const menuToggle = document.getElementById('menu-toggle');

// Taglines array
const taglines = [
    'Building clean and functional web experiences',
    'Designing with purpose, coding with logic',
    'Turning ideas into interactive interfaces'
];

// Dark/Light Mode Toggle
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme === 'light');
}

function updateThemeIcon(isLightMode) {
    const icon = themeToggle.querySelector('i');
    icon.className = isLightMode ? 'fas fa-sun' : 'fas fa-moon';
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme === 'light');
}

// Mobile Menu Toggle
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
}

// Dynamic Tagline
function changeTagline() {
    let currentIndex = 0;
    setInterval(() => {
        currentIndex = (currentIndex + 1) % taglines.length;
        taglineElement.style.opacity = '0';
        setTimeout(() => {
            taglineElement.textContent = taglines[currentIndex];
            taglineElement.style.opacity = '1';
        }, 300);
    }, 4000);
}

// Project Filtering
function filterProjects(category) {
    projectCards.forEach(card => {
        const cardCategory = card.dataset.category;
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            setTimeout(() => card.classList.add('fade-in'), 10);
        } else {
            card.classList.remove('fade-in');
            setTimeout(() => card.style.display = 'none', 300);
        }
    });
}

function setupFilters() {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.dataset.filter;
            filterProjects(filter);
        });
    });
}

// Form Validation
function validateName() {
    const name = nameInput.value.trim();
    if (name === '') {
        nameError.textContent = 'Name is required';
        return false;
    } else if (name.length < 2) {
        nameError.textContent = 'Name must be at least 2 characters';
        return false;
    } else {
        nameError.textContent = '';
        return true;
    }
}

function validateEmail() {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        emailError.textContent = 'Email is required';
        return false;
    } else if (!emailRegex.test(email)) {
        emailError.textContent = 'Please enter a valid email';
        return false;
    } else {
        emailError.textContent = '';
        return true;
    }
}

function validateMessage() {
    const message = messageInput.value.trim();
    if (message === '') {
        messageError.textContent = 'Message is required';
        return false;
    } else if (message.length < 10) {
        messageError.textContent = 'Message must be at least 10 characters';
        return false;
    } else {
        messageError.textContent = '';
        return true;
    }
}

function validateForm() {
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();
    return isNameValid && isEmailValid && isMessageValid;
}

// Smooth Scrolling
function setupSmoothScrolling() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// Scroll Reveal Animation
function setupScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Social Media Interaction
function setupSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // For demo purposes, just show an alert
            alert('Social media link clicked!');
        });
    });
}

// Event Listeners
themeToggle.addEventListener('click', toggleTheme);
if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
}

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm()) {
        // Simulate form submission
        successMessage.textContent = 'Message sent successfully!';
        contactForm.reset();
        setTimeout(() => {
            successMessage.textContent = '';
        }, 5000);
    }
});

nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
messageInput.addEventListener('input', validateMessage);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    changeTagline();
    setupFilters();
    setupSmoothScrolling();
    setupScrollReveal();
    setupSocialLinks();
});