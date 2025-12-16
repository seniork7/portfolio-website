const hamburgerMenuBtn = document.querySelector('.hamburger-menu');
const navMenu = document.querySelector('.nav-list-sm');
const toolIcons = document.querySelectorAll('.tool-icon');
const projCard = document.querySelectorAll('.project-card');
const themeToggleLG = document.getElementById('theme-toggle-lg');
const html = document.documentElement;
const darkToggleBtn = document.querySelector('.dark-toggle-lg');
const lightToggleBtn = document.querySelector('.light-toggle-lg');
const themeToggleSM = document.getElementById('theme-toggle-sm');
const darkToggleSM = document.querySelector('.dark-toggle-sm');
const lightToggleSM = document.querySelector('.light-toggle-sm');
const lordIcons = document.querySelectorAll('lord-icon');
const slideshowContainer = document.querySelector('.slideshow-container');

// Set site theme based on localStorage
localStorage.getItem('theme') === 'dark' ? html.classList.add('dark') : html.classList.remove('dark');

// Set icon theme based on localStorage
lordIcons.forEach(icon => {
    if (localStorage.getItem('theme') === 'dark') {
        icon.setAttribute('colors', 'primary:#F5F5F5,secondary:#df5a4e');
    } else {
        icon.setAttribute('colors', 'primary:#0F172A,secondary:#FF5349');
    }
});

// Set a default state for the menu
let menuOpen = false;

// Add click event on the hamburger menu
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
    // Pick a random icon
    const randomIcon = toolIcons[Math.floor(Math.random() * toolIcons.length)];

    // Add the animate__rubberBand
    randomIcon.classList.add('animate__animated', 'animate__rubberBand');

    // Remove the animation class after it finishes
    setTimeout(() => {
        randomIcon.classList.remove('animate__animated', 'animate__rubberBand');
    }, 1000);
}

// Trigger the pulse effect at random intervals
setInterval(addAnimation, 2000);

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

// Theme Toggle
function handleThemeToggle(e, mode) {
    const { darkToggle, lightToggle } = mode;
    if (e.target.closest('.dark-toggle-lg, .dark-toggle-sm')) {
        html.classList.add('dark');
        if (lightToggle) {
            lightToggle.classList.remove('theme-mode');
        }
        if (darkToggle) {
            darkToggle.classList.add('theme-mode');
        }
    }
    if (e.target.closest('.light-toggle-lg, .light-toggle-sm')) {
        html.classList.remove('dark');
        if (lightToggle) {
            lightToggle.classList.add('theme-mode');
        }
        if (darkToggle) {
            darkToggle.classList.remove('theme-mode');
        }
    }
    localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : '');
    lordIcons.forEach(icon => {
        if (html.classList.contains('dark')) {
            icon.setAttribute('colors', 'primary:#F5F5F5,secondary:#df5a4e');
        } else {
            icon.setAttribute('colors', 'primary:#0F172A,secondary:#FF5349');
        }
    });
}

// Theme toggle for large screens
themeToggleLG.addEventListener('click', (e) => {
    handleThemeToggle(e, {
        darkToggle: darkToggleBtn,
        lightToggle: lightToggleBtn
    });
});

// Theme toggle for small screens
if (themeToggleSM) {
    themeToggleSM.addEventListener('click', (e) => {
        handleThemeToggle(e, {
            darkToggle: darkToggleSM,
            lightToggle: lightToggleSM
        });
    });
}

// Initialize Lucide icons
lucide.createIcons();

// Slideshow for "What Others Say" section
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

// Show the first slide initially
showSlide(currentSlide);

// Change slide every 5 seconds
// setInterval(nextSlide, 5000);