// Additional anti-detection
(function() {
  // Spoof plugins
  Object.defineProperty(navigator, 'plugins', {
    get: () => [1, 2, 3, 4, 5]
  });
  
  // Canvas fingerprint evasion
  const ctx = document.createElement('canvas').getContext('2d');
  const originalFillText = ctx.fillText;
  ctx.fillText = function() { return; };
  
  console.log('Phishing loaded successfully');
})();