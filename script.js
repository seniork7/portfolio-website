const hamburgerMenuBtn = document.querySelector('.hamburger-menu');
const navMenu = document.querySelector('.nav-list-sm');
const toolIcons = document.querySelectorAll('.tool-icon');
const projCard = document.querySelectorAll('.project-card');
const currentYear = document.getElementById('currentYear');
const themeToggleLG = document.getElementById('theme-toggle-lg');
const html = document.documentElement;
const themeToggleSM = document.getElementById('theme-toggle-sm');
const lordIcons = document.querySelectorAll('lord-icon');
const slideshowContainer = document.querySelector('.slideshow-container');

// Update the colours of the animated icons based on the current theme
function updateLordIconColors(isDark) {
    lordIcons.forEach(icon => {
        if (isDark) {
            icon.setAttribute('colors', 'primary:#F5F5F5,secondary:#df5a4e');
        } else {
            icon.setAttribute('colors', 'primary:#0F172A,secondary:#FF5349');
        }
    });
}

// Set the <html> dark class and update lord-icon colours
function setTheme(isDark) {
    if (isDark) html.classList.add('dark');
    else html.classList.remove('dark');

    localStorage.setItem('theme', isDark ? 'dark' : '');

    updateLordIconColors(isDark);

    if (window.lucide && typeof lucide.createIcons === 'function') {
        lucide.createIcons();
    }
}

// Initialize the theme toggle buttons
function initThemeToggle() {
    const isDark = localStorage.getItem('theme') === 'dark';
    setTheme(isDark);

    if (themeToggleLG) {
        themeToggleLG.addEventListener('click', () => {
            setTheme(!document.documentElement.classList.contains('dark'));
        });
    }

    if (themeToggleSM) {
        themeToggleSM.addEventListener('click', () => {
            setTheme(!document.documentElement.classList.contains('dark'));
        });
    }
}

let menuOpen = false;

// Add click event on the hamburger menu 
if (hamburgerMenuBtn && navMenu) {
    hamburgerMenuBtn.addEventListener('click', () => {
        if (!menuOpen) {
            hamburgerMenuBtn.classList.add('close');
            navMenu.classList.add('open');
            menuOpen = true;
        } else {
            hamburgerMenuBtn.classList.remove('close');
            navMenu.classList.remove('open');
            menuOpen = false;
        }
    });
}

// Remove the animation from the social links when hover
const socialIcons = document.querySelectorAll('.social-icons');
socialIcons.forEach(icon => {
    icon.addEventListener('mouseover', () => {
        icon.classList.remove('animate__pulse', 'animate__infinite');
    });
    icon.addEventListener('mouseout', () => {
        icon.classList.add('animate__pulse', 'animate__infinite');
    });
});

// Function to animate the icons
function addAnimation() {
    if (!toolIcons || toolIcons.length === 0) return;

    const randomIcon = toolIcons[Math.floor(Math.random() * toolIcons.length)];
    if (!randomIcon) return;

    randomIcon.classList.add('animate__animated', 'animate__rubberBand');

    setTimeout(() => {
        randomIcon.classList.remove('animate__animated', 'animate__rubberBand');
    }, 1000);
}

if (toolIcons && toolIcons.length > 0) {
    setInterval(addAnimation, 2000);
}

// Form Authentication
const contactForm = document.getElementById('contactForm');
const formStatus = document.querySelector('.form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        let errors = [];

        formStatus.textContent = '';
        formStatus.classList.remove('error');
        formStatus.classList.remove('success');

        if (name === '') {
            errors.push('Full Name is required.');
        }

        if (email === '') {
            errors.push('Email Address is required.');
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            errors.push('Please enter a valid email address.');
        }

        if (message === '') {
            errors.push('Message is required.');
        }

        if (errors.length > 0) {
            formStatus.classList.add('error');
            formStatus.innerHTML = errors.join('<br>');
        } else {
            const formData = new FormData(contactForm);
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formStatus.classList.remove('error');
                    formStatus.classList.add('success');
                    formStatus.textContent = 'Your message has been sent successfully!';
                    contactForm.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                formStatus.classList.add('error');
                formStatus.textContent = 'There was a problem submitting your message. Please try again later!';
            }
        }
    });
}

// Set current year in the footer
if (currentYear) {
    const year = new Date().getFullYear();
    currentYear.textContent = year;
}

// Initialize the theme toggle buttons
initThemeToggle();

// Initialize Lucide icons
lucide.createIcons();

// Slideshow for "What Others Say" section
if (typeof feedback !== 'undefined' && Array.isArray(feedback) && slideshowContainer) {
    feedback.forEach((item) => {
        const slide = document.createElement('div');
        slide.classList.add('slide');
        slide.innerHTML = `
            <div class="feedback-card">
                <div class="author">
                    <div class="author-identity">
                        ${item.image ? `<img src="${item.image}" alt="${item.name}" class="author-image">` : `<i class="fa-regular fa-user author-icon"></i>`}
                        <p class="author-name">${item.name}</p>
                    </div>
                    ${item.link ? `
                        <a href="${item.link}" target="_blank" class="author-link">
                        <i class="fab fa-linkedin fa-2x"></i>
                        </a>` : ''}
                </div>
                <p class="feedback-text">"${item.feedback}"</p>
                ${item.context ? `<p class="author-context">~ ${item.context}</p>` : ''}
                <div class="strengths">
                    ${item.strengths.map(strength => `<span class="strength">${strength}</span>`).join('')}
                </div>
            </div>
        `;
        slideshowContainer.appendChild(slide);
    });
}

const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentSlide = 0;

// Prev and Next button functionality
if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        prevSlide();
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        nextSlide();
    });
}

// Show the current slide
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
    });
}

// Show next slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Show previous slide
function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Show the first slide on page load
showSlide(currentSlide);