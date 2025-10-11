
const hamburgerMenuBtn = document.querySelector('.hamburger-menu');
const navMenu = document.querySelector('.nav-list-sm');
const toolIcons = document.querySelectorAll('.tool-icon');
const projCard = document.querySelectorAll('.project-card');
const icons = ["you", "👩‍💻", "🎧", "👨‍🎨", "🧠", "👨🏼‍💼", "👋🏼", "🚀",];

// Set a default state for the menu
let menuOpen = false;

// Add click event on the hamburger menu
hamburgerMenuBtn.addEventListener('click', () => {
    if (!menuOpen) {
        hamburgerMenuBtn.classList.add('close');
        navMenu.classList.add('open');
        // set state for menu
        menuOpen = true;
    } else {
        hamburgerMenuBtn.classList.remove('close');
        navMenu.classList.remove('open');
        // set state for menu
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

// Loop through the icons in the #you element
let i = 0;
setInterval(() => {
document.querySelector("#you").textContent = icons[i++ % icons.length];
}, 1500);

// projCardImg.map(card => card.addEventListener("mouseover", (e) => {

// })


  lucide.createIcons();