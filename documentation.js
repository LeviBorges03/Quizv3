// documentation.js
// Contains shared logic for theme switching, star animation, and easter egg,
// extracted from index.js to be reusable by documentation.html or other pages.

// GLOBAL VARIABLES for theme and effects
let isDarkMode = false;
let isSecretThemeActive = false;
let secretThemeClicks = [];
let notificationTimeout = null;
let starsCanvas = null;
let starsContext = null;
let starsArray = [];

// DOM ELEMENT SELECTORS - with checks for existence
const themeSwitcherButton = document.getElementById('theme-switcher-button');
const themeSwitcherIconContainer = document.getElementById('theme-switcher-icon-container');

// Elements that might not be on every page using this script
const appHeaderTitle = document.getElementById('app-header-title') || document.querySelector('.app-title'); // Fallback to class if ID not found
const systemNotificationPanel = document.getElementById('system-notification-panel');

// --- UTILITY FUNCTIONS ---

// Shows a notification panel if it exists
function showNotification(message) {
    if (!systemNotificationPanel) return; // Do nothing if panel doesn't exist

    clearTimeout(notificationTimeout);
    systemNotificationPanel.textContent = message;
    systemNotificationPanel.classList.add('active');
    notificationTimeout = setTimeout(() => {
        systemNotificationPanel.classList.remove('active');
    }, 2700);
}

// --- THEME SWITCHING LOGIC ---

function applyTheme() {
    if (!themeSwitcherIconContainer) return; // Cannot apply theme if icon container is missing

    if (isSecretThemeActive) {
        // Theme switcher icon is handled by activateSecretTheme
        return;
    }

    if (isDarkMode) {
        document.body.classList.add('dark-theme');
        themeSwitcherIconContainer.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path d="M17.75 16.25c-3.45 0-6.25-2.8-6.25-6.25 0-2.41 1.38-4.51 3.39-5.55.55-.29.7-1.01.29-1.45-.37-.39-.98-.45-1.37-.11C9.02 6.16 7 9.36 7 13c0 4.42 3.58 8 8 8 3.64 0 6.84-2.02 7.86-5.31.14-.44-.13-.91-.58-1.04-1.04-.32-2.14-.49-3.28-.45.02 0 .02 0 0 0z" fill="#FFC107"/>
      </svg>
    `;
        drawStars();
    } else {
        document.body.classList.remove('dark-theme');
        themeSwitcherIconContainer.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="6" fill="#FFD600"/>
        <g stroke="#FFD600" stroke-width="1.5" stroke-linecap="round">
          <line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/>
          <line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/>
          <line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/><line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/>
          <line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/><line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/>
        </g>
      </svg>
    `;
        removeStars();
    }
}

if (themeSwitcherButton) {
    themeSwitcherButton.addEventListener('click', () => {
        if (isSecretThemeActive) {
            isSecretThemeActive = false;
            document.body.classList.remove('secret-theme');
            // Check if isDarkMode was previously set or default to false (light theme)
            // This ensures returning to the correct prior state.
            // If not explicitly tracked, might need to re-evaluate or set a default.
            applyTheme();
            showNotification("Tema padrão restaurado!");
            return;
        }
        isDarkMode = !isDarkMode;
        applyTheme();
    });
}

// --- STAR ANIMATION LOGIC ---

function drawStars() {
    if (isSecretThemeActive || !document.body.classList.contains('dark-theme')) return;
    if (!starsCanvas) {
        starsCanvas = document.createElement('canvas');
        starsCanvas.style.position = 'fixed'; starsCanvas.style.top = '0'; starsCanvas.style.left = '0';
        starsCanvas.style.width = '100vw'; starsCanvas.style.height = '100vh';
        starsCanvas.style.pointerEvents = 'none'; starsCanvas.style.zIndex = '0';
        starsCanvas.width = window.innerWidth; starsCanvas.height = window.innerHeight;
        document.body.appendChild(starsCanvas);
        starsContext = starsCanvas.getContext('2d');

        window.addEventListener('resize', () => {
            if (starsCanvas) {
                starsCanvas.width = window.innerWidth;
                starsCanvas.height = window.innerHeight;
            }
        });
    }
    starsArray = [];
    for (let i = 0; i < 85; i++) {
        starsArray.push({
            x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
            r: Math.random() * 1.3 + 0.5,
            brightness: Math.random() * 0.6 + 0.2,
            delta: Math.random() * 0.035 + 0.01,
            phase: Math.random() * Math.PI * 2
        });
    }

    function animateStars() {
        if (!isDarkMode || isSecretThemeActive || !starsContext || !document.body.classList.contains('dark-theme')) {
            if (starsContext) starsContext.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
            return;
        }
        starsContext.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
        for (let star of starsArray) {
            star.phase += star.delta;
            let opacity = star.brightness + Math.sin(star.phase) * 0.35;
            starsContext.beginPath();
            starsContext.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
            starsContext.fillStyle = `rgba(255,255,255,${Math.max(0.09, opacity)})`;
            starsContext.shadowColor = "#fff"; starsContext.shadowBlur = 5;
            starsContext.fill();
            starsContext.shadowBlur = 0;
        }
        requestAnimationFrame(animateStars);
    }
    animateStars();
}

function removeStars() {
    if (starsCanvas) {
        const context = starsCanvas.getContext('2d');
        if (context) {
            context.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
        }
        starsCanvas.remove();
        starsCanvas = null;
        starsContext = null;
        starsArray = [];
    }
}

// --- EASTER EGG LOGIC ---

if (appHeaderTitle) { // Only add listener if the title element exists
    appHeaderTitle.addEventListener('click', () => handleSecretThemeClick());
    appHeaderTitle.addEventListener('keydown', (e) => {
        if (e.key === "Enter" || e.key === " ") handleSecretThemeClick();
    });
}

function handleSecretThemeClick() {
    if (!appHeaderTitle) return; // Should not be called if title doesn't exist, but defensive check

    const now = Date.now();
    secretThemeClicks = secretThemeClicks.filter(timestamp => now - timestamp < 1200);
    secretThemeClicks.push(now);
    if (secretThemeClicks.length >= 10 && !isSecretThemeActive) {
        secretThemeClicks = [];
        activateSecretTheme();
    }
}

function activateSecretTheme() {
    isSecretThemeActive = true;
    document.body.classList.add('secret-theme');
    document.body.classList.remove('dark-theme'); // Ensure dark theme is off
    removeStars(); // Remove normal stars
    if (themeSwitcherIconContainer) { // Check if container exists
        themeSwitcherIconContainer.innerHTML = "🎉";
    }
    showNotification("🎉 Tema secreto ativado! Aproveite o visual especial!");
    setTimeout(() => {
        showNotification("Clique no botão de tema para voltar ao normal.");
    }, 2500);
}

// INITIALIZATION
// Apply theme based on isDarkMode (which is false by default)
// This ensures the correct icon (sun) is set on page load.
// The themeSwitcherButton listener will handle subsequent clicks.
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyTheme);
} else {
    applyTheme();
}

// Final check for elements and console log for debugging if any are missing
if (!themeSwitcherButton) console.warn("Theme switcher button not found. Theme functionality may be limited.");
if (!themeSwitcherIconContainer) console.warn("Theme switcher icon container not found. Theme icons will not be displayed.");
if (!appHeaderTitle) console.warn("App header title element not found. Easter egg functionality will be disabled.");
// systemNotificationPanel is optional, so no warning if it's missing.

console.log("documentation.js loaded and initialized.");
