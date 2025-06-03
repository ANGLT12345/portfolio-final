// Main JavaScript for Liang Tze's Portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initTypingEffect();
    initNavigation();
    initScrollEffects();
    initCounters();
    initSkillBars();
    initCertificateModals();
    initContactForm();
});

// Typing effect for hero title
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    
    if (!typingElement) return;
    
    const text = typingElement.getAttribute('data-text');
    typingElement.textContent = '';
    
    let i = 0;
    const speed = 100; // Typing speed in milliseconds
    
    function typeWriter() {
        if (i < text.length) {
            typingElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    
    setTimeout(() => {
        typeWriter();
    }, 500);
}

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger to X
            this.classList.toggle('active');
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    const spans = navToggle.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
                
                // Scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Account for navbar height
                    behavior: 'smooth'
                });
                
                // Update active link
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
}

// Scroll effects
function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add animation class to elements when they come into view
    const animateOnScroll = function() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.8) {
                section.classList.add('fade-in-up');
            }
        });
        
        // Change navbar style on scroll
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    };
    
    // Initial call to set initial states
    animateOnScroll();
    
    // Listen for scroll events
    window.addEventListener('scroll', animateOnScroll);
}

// Animated counters
function initCounters() {
    const countElements = document.querySelectorAll('.stat-number');
    
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // Animation duration in milliseconds
        const step = target / (duration / 16); // 60fps
        
        let current = 0;
        const timer = setInterval(() => {
            current += step;
            element.textContent = Math.floor(current);
            
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }
    
    // Start counter animation when element is in viewport
    function checkCounters() {
        countElements.forEach(element => {
            const position = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (position < windowHeight * 0.8 && !element.classList.contains('counted')) {
                element.classList.add('counted');
                animateCounter(element);
            }
        });
    }
    
    // Initial check and listen for scroll
    checkCounters();
    window.addEventListener('scroll', checkCounters);
}

// Skill bars animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-fill');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const position = bar.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (position < windowHeight * 0.8 && !bar.classList.contains('animated')) {
                const skill = bar.getAttribute('data-skill');
                bar.style.width = `${skill}%`;
                bar.classList.add('animated');
            }
        });
    }
    
    // Initial check and listen for scroll
    animateSkillBars();
    window.addEventListener('scroll', animateSkillBars);
}

// Certificate modal functionality
function initCertificateModals() {
    const certBadges = document.querySelectorAll('.cert-badge');
    const modal = document.getElementById('cert-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalClose = document.querySelector('.modal-close');
    
    if (!modal) return;
    
    // Certificate information
    const certInfo = {
        'Microsoft AI Skills Challenge Badge': {
            title: 'Microsoft AI Skills Challenge Badge',
            description: 'Awarded for successfully completing the Microsoft AI Skills Challenge, demonstrating proficiency in artificial intelligence fundamentals and applications.'
        },
        'Kahoot! Ambassador': {
            title: 'Kahoot! Ambassador',
            description: 'Recognized as an official Kahoot! Ambassador for innovative use of the platform in educational settings and promoting interactive learning.'
        },
        'Edpuzzle Certified Coach': {
            title: 'Edpuzzle Certified Coach',
            description: 'Certified as an Edpuzzle Coach for expertise in using video-based learning tools to enhance student engagement and comprehension.'
        },
        'Nearpod Certified Educator': {
            title: 'Nearpod Certified Educator',
            description: 'Certified for excellence in implementing Nearpod technology to create interactive learning experiences in educational environments.'
        },
        'Wakelet Community Leader': {
            title: 'Wakelet Community Leader',
            description: 'Recognized as a community leader for exemplary use of Wakelet in organizing and sharing educational content and resources.'
        },
        'Webex Insider User Group': {
            title: 'Webex Insider User Group',
            description: 'Selected member of the Webex Insider User Group, contributing to product testing and providing feedback for platform improvements.'
        }
    };
    
    // Open modal when certificate is clicked
    certBadges.forEach(badge => {
        badge.addEventListener('click', function() {
            const certName = this.getAttribute('data-cert');
            const info = certInfo[certName];
            
            if (info) {
                modalTitle.textContent = info.title;
                modalDescription.textContent = info.description;
                modal.style.display = 'block';
            }
        });
    });
    
    // Close modal
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Contact form validation
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value.trim();
        
        // Validate form
        let isValid = true;
        let errorMessage = '';
        
        if (name === '') {
            isValid = false;
            errorMessage += 'Please enter your name.\n';
        }
        
        if (email === '') {
            isValid = false;
            errorMessage += 'Please enter your email address.\n';
        } else if (!isValidEmail(email)) {
            isValid = false;
            errorMessage += 'Please enter a valid email address.\n';
        }
        
        if (subject === '') {
            isValid = false;
            errorMessage += 'Please select a subject.\n';
        }
        
        if (message === '') {
            isValid = false;
            errorMessage += 'Please enter your message.\n';
        }
        
        if (!isValid) {
            alert(errorMessage);
            return;
        }
        
        // For demo purposes, show success message
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
    
    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    function toggleEmbed(id) {
        const embedContent = document.getElementById(id);
        if (embedContent.style.display === "none" || embedContent.style.display === "") {
            embedContent.style.display = "block";
        } else {
            embedContent.style.display = "none";
        }
    }
}