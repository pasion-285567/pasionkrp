const darkModeToggle = document.getElementById('darkModeToggle');

// Check localStorage for saved preference
let storedDarkMode = localStorage.getItem('darkMode');

// Check system dark mode setting
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Determine initial state
const isDarkMode = storedDarkMode !== null ? storedDarkMode === 'true' : prefersDarkMode;
darkModeToggle.checked = isDarkMode;
document.body.classList.toggle('dark-mode', isDarkMode);

// Listen for toggle changes
darkModeToggle.addEventListener('change', () => {
    const isChecked = darkModeToggle.checked;
    document.body.classList.toggle('dark-mode', isChecked);

    // Save state to localStorage
    localStorage.setItem('darkMode', isChecked);
});