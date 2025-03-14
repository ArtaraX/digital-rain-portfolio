const canvas = document.getElementById('digitalRain');
const ctx = canvas.getContext('2d');
const toggleCheckbox = document.getElementById('theme-toggle');
const typedText = document.getElementById('typed-text');

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Characters to display (1s and 0s)
const binary = '01';
const columns = 50;
let fontSize = canvas.width / columns;

// Array to hold rain drops
let drops = [];
for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * (-1) * canvas.height / 2;
}

// Theme toggle logic
let isDarkMode = false; // Start with light mode
toggleCheckbox.addEventListener('change', () => {
    isDarkMode = toggleCheckbox.checked;
    document.body.classList.toggle('light-mode', !isDarkMode);
    document.body.classList.toggle('dark-mode', isDarkMode);
});

// Typewriter effect for one line
const textToType = "Hey, I'm Artem!";
let index = 0;

function typeWriter() {
    if (index < textToType.length) {
        typedText.textContent += textToType.charAt(index);
        index++;
        setTimeout(typeWriter, 300); // Speed of typing (ms)
    }
}

// Start typewriter effect on page load
window.onload = typeWriter;

// Animation function for digital rain
function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.08)'; // Fade for dark mode
    if (!isDarkMode) {
        ctx.fillStyle = 'rgba(240, 240, 240, 0.08)'; // Fade for light mode
    }
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = isDarkMode ? '#0f0' : '#003087'; // Green for dark, greyish for light
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
        const text = binary.charAt(Math.floor(Math.random() * binary.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = -canvas.height;
        }
        drops[i]++;
    }
}

// Resize canvas if window size changes
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    fontSize = canvas.width / columns
});

// Run animations
setInterval(draw, 100);