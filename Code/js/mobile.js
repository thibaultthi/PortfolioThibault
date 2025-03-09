// Mobile navigation functionality
document.addEventListener('DOMContentLoaded', function() {
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const menuOverlay = document.querySelector('.menu-overlay');
  
  // Toggle menu
  mobileToggle.addEventListener('click', function() {
    mobileMenu.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    
    // Toggle hamburger animation
    const lines = this.querySelectorAll('.hamburger-line');
    if (mobileMenu.classList.contains('active')) {
      lines[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
      lines[1].style.opacity = '0';
      lines[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
    } else {
      lines[0].style.transform = 'none';
      lines[1].style.opacity = '1';
      lines[2].style.transform = 'none';
    }
  });
  
  // Close menu when clicking overlay
  menuOverlay.addEventListener('click', function() {
    mobileMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
    
    // Reset hamburger
    const lines = mobileToggle.querySelectorAll('.hamburger-line');
    lines[0].style.transform = 'none';
    lines[1].style.opacity = '1';
    lines[2].style.transform = 'none';
  });
  
  // Mobile-specific GSAP animations
  if (window.innerWidth <= 768) {
    // Replace mouse movement with device orientation
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', function(event) {
        const tiltX = event.beta / 10; // Convert to reasonable range
        const tiltY = event.gamma / 10;
        
        // Apply tilt effect to elements that had mouse parallax
        gsap.to('.profile-image-container', {
          x: tiltY * -5,
          y: tiltX * -5,
          duration: 1,
          ease: 'power2.out'
        });
        
        gsap.to('.logo-stack-container', {
          x: tiltY * 10,
          y: tiltX * 10,
          duration: 1,
          ease: 'power2.out'
        });
      });
    }
  }
});

// Optimize animations for mobile
if (window.innerWidth <= 768) {
  // Reduce animation complexity
  gsap.ticker.fps(30);
  
  // Lazy load images
  document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            imageObserver.unobserve(img);
          }
        });
      });
      
      images.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback for browsers without IntersectionObserver
      images.forEach(img => {
        img.src = img.dataset.src;
      });
    }
  });
} 