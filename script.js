const canvas = document.getElementById('digitalRain');
const ctx = canvas.getContext('2d');
const toggleCheckbox = document.getElementById('theme-toggle');

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Characters to display (1s and 0s)
const binary = '01';
const fontSize = 16;
const columns = canvas.width / fontSize;

// Array to hold rain drops
const drops = [];
for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * canvas.height;
}

// Theme toggle logic
let isDarkMode = false; // Start with light mode
toggleCheckbox.addEventListener('change', () => {
    isDarkMode = toggleCheckbox.checked; // Checked = dark mode
    document.body.classList.toggle('light-mode', !isDarkMode);
    document.body.classList.toggle('dark-mode', isDarkMode);
});

// Animation function
function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // Fade for dark mode
    if (!isDarkMode) {
        ctx.fillStyle = 'rgba(240, 240, 240, 0.05)'; // Fade for light mode
    }
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = isDarkMode ? '#0f0' : '#003087'; // Green for dark, greyish for light
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
        const text = binary.charAt(Math.floor(Math.random() * binary.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

// Resize canvas if window size changes
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = canvas.width / fontSize
});

// Run animation
setInterval(draw, 100);