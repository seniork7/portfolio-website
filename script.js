
const hamburgerMenuBtn = document.querySelector('.hamburger-menu');
const navMenu = document.querySelector('.nav-list-sm');
const toolIcons = document.querySelectorAll('.tool-icon');
const projCard = document.querySelectorAll('.project-card');

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

// Initialize Lucide icons
lucide.createIcons();


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
