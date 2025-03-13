// Initialize GSAP animation immediately
(() => {
    // Update copyright year
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Create a timeline
    const tl = gsap.timeline();

    // Start both animations simultaneously
    gsap.from('.hero-content h2', {
        opacity: 0,
        y: 30,
        duration: 0.5,
        ease: 'power2.out'
    });

    gsap.from('.hero-content h1', {
        opacity: 0,
        y: 30,
        duration: 0.5,
        delay: 0.1,
        ease: 'power2.out'
    });

    // Navigation animation
    gsap.from('nav a', {
        opacity: 0,
        y: 40,
        duration: 0.4,
        transformOrigin: "center center",
        force3D: true,
        clearProps: 'all',
        immediateRender: true,
        overwrite: 'auto',
        ease: 'power2.out'
    });

    // Mouse movement effect with pictures on the Home Page
    const hero = document.querySelector('.hero-content');
    const profileImage = document.querySelector('.profile-image-container');
    const logoStack = document.querySelector('.logo-stack-container');
    
    if (profileImage && logoStack) { // Only run on home page
        window.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth - 0.5;
            const mouseY = e.clientY / window.innerHeight - 0.5;
            
            // Profile image moves less and in opposite direction for foreground effect
            gsap.to(profileImage, {
                x: mouseX * -15,
                y: mouseY * -15,
                duration: 1,
                ease: 'power2.out'
            });
            // Logo stack moves more for background effect
            gsap.to(logoStack, {
                x: mouseX * 30,
                y: mouseY * 30,
                duration: 1,
                ease: 'power2.out'
            });
        });
    }

    // Project cards parallax effect
    const projectCards = document.querySelectorAll('.group.perspective');
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    
    if (projectCards.length > 0 && !isMobile) { // Only run on desktop with project cards
        window.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth - 0.5;
            const mouseY = e.clientY / window.innerHeight - 0.5;
            
            projectCards.forEach(card => {
                gsap.to(card, {
                    x: mouseX * 10,
                    y: mouseY * 10, 
                    rotateX: -mouseY * 5,
                    rotateY: mouseX * 5,
                    duration: 1,
                    ease: 'power2.out'
                });
            });
        });
    }


})();

// Page transition logic
let isTransitioning = false;
let currentPage = 'finance';
const transitionDuration = 0.15;
const pageOrder = ['finance', 'dev', 'future'];

// Strict scroll control
let scrollLocked = false;
const MOMENTUM_TIMEOUT = 800; // ms before allowing next scroll
const SCROLL_THRESHOLD = 30; // Ignore tiny scrolls

// Initialize page positions and dots
document.addEventListener('DOMContentLoaded', () => {
    const devPage = document.getElementById('dev-page');
    const futurePage = document.getElementById('future-page');
    if (devPage) devPage.style.top = '100%';
    if (futurePage) futurePage.style.top = '100%';
    
    setupTimelineDots();
    updateDots();
});

// Setup timeline dots functionality
function setupTimelineDots() {
    const dots = document.querySelectorAll('.timeline-dot');
    if (!dots.length) return;

    dots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (isTransitioning) return;
            
            switch(index) {
                case 0:
                    if (currentPage !== 'finance') {
                        startTransition('finance');
                    }
                    break;
                case 1:
                    if (currentPage !== 'dev') {
                        startTransition('dev');
                    }
                    break;
                case 2:
                    if (currentPage !== 'future') {
                        startTransition('future');
                    }
                    break;
            }
        });
    });
}

// Update dots opacity based on current page
function updateDots() {
    const dots = document.querySelectorAll('.timeline-dot');
    dots.forEach((dot, index) => {
        switch(currentPage) {
            case 'finance':
                dot.style.opacity = index === 0 ? '1' : '0.5';
                break;
            case 'dev':
                dot.style.opacity = index === 1 ? '1' : '0.5';
                break;
            case 'future':
                dot.style.opacity = index === 2 ? '1' : '0.5';
                break;
        }
    });
}

// Handle wheel/trackpad events
window.addEventListener('wheel', (e) => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    
    // Only prevent default on desktop
    if (!isMobile) {
        e.preventDefault();
    }
    
    // If transition is in progress, scrolling is locked, or we're on mobile, ignore event
    if (isTransitioning || scrollLocked || isMobile) return;

    // Check if the scroll is significant enough to register
    if (Math.abs(e.deltaY) < SCROLL_THRESHOLD) return;

    // Lock scrolling immediately after a valid swipe
    scrollLocked = true;

    // Get current page index and determine direction
    const currentIndex = pageOrder.indexOf(currentPage);
    const direction = e.deltaY > 0 ? 1 : -1;
    
    // Determine target index (only move one page at a time)
    const targetIndex = Math.max(0, Math.min(pageOrder.length - 1, currentIndex + direction));
    
    // Only transition if we're moving to a different page
    if (targetIndex !== currentIndex) {
        startTransition(pageOrder[targetIndex]);

        // Use requestAnimationFrame to check if momentum is still happening
        requestAnimationFrame(() => {
            setTimeout(() => {
                scrollLocked = false;
            }, MOMENTUM_TIMEOUT);
        });
    } else {
        // If no transition happens, unlock scrolling sooner
        scrollLocked = false;
    }
}, { passive: false });

function startTransition(targetPage) {
    if (isTransitioning) return;
    
    isTransitioning = true;
    const devPage = document.getElementById('dev-page');
    const futurePage = document.getElementById('future-page');
    
    // Kill any existing animations
    gsap.killTweensOf([devPage, futurePage]);
    
    // Force pages to their current positions
    snapPagesToCurrentState(devPage, futurePage);
    
    switch(targetPage) {
        case 'finance':
            animateToFinance(devPage, futurePage);
            break;
        case 'dev':
            animateToDev(devPage, futurePage);
            break;
        case 'future':
            animateToFuture(devPage, futurePage);
            break;
    }
}

function snapPagesToCurrentState(devPage, futurePage) {
    switch(currentPage) {
        case 'finance':
            devPage.style.top = '100%';
            futurePage.style.top = '200%';
            break;
        case 'dev':
            devPage.style.top = '0%';
            futurePage.style.top = '100%';
            break;
        case 'future':
            devPage.style.top = '-100%';
            futurePage.style.top = '0%';
            break;
    }
}

function animateToFinance(devPage, futurePage) {
    gsap.to(devPage, {
        top: '100%',
        duration: transitionDuration,
        ease: 'power3.out'
    });
    gsap.to(futurePage, {
        top: '200%',
        duration: transitionDuration,
        ease: 'power3.out',
        onComplete: () => finishTransition('finance')
    });
}

function animateToDev(devPage, futurePage) {
    gsap.to(devPage, {
        top: '0%',
        duration: transitionDuration,
        ease: 'power3.out'
    });
    gsap.to(futurePage, {
        top: '100%',
        duration: transitionDuration,
        ease: 'power3.out',
        onComplete: () => finishTransition('dev')
    });
}

function animateToFuture(devPage, futurePage) {
    gsap.to(devPage, {
        top: '-100%',
        duration: transitionDuration,
        ease: 'power3.out'
    });
    gsap.to(futurePage, {
        top: '0%',
        duration: transitionDuration,
        ease: 'power3.out',
        onComplete: () => finishTransition('future')
    });
}

function finishTransition(targetPage) {
    currentPage = targetPage;
    isTransitioning = false;
    updateDots();
}

// Initialize Google Map if we're on the contact page
if (document.getElementById('map')) {
    // San Francisco coordinates
    const sf = { lat: 37.7749, lng: -122.4194 };
    
    // Custom map style
    const mapStyle = [
        {
            "featureType": "all",
            "elementType": "geometry",
            "stylers": [{"color": "#1a1a1a"}]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [{"color": "#000000"}]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#cccccc"}]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{"color": "#000000"}]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [{"color": "#404040"}]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [{"color": "#1d1d1d"}]
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [{"visibility": "off"}]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [{"visibility": "off"}]
        }
    ];
    
    // Map options
    const mapOptions = {
        center: sf,
        zoom: 12,
        disableDefaultUI: true,
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_TOP
        },
        styles: mapStyle,
        scrollwheel: false,
        backgroundColor: '#1a1a1a'
    };
    
    // Create the map
    const map = new google.maps.Map(document.getElementById('map'), mapOptions);
    
    // Add marker
    const marker = new google.maps.Marker({
        position: sf,
        map: map,
        title: 'San Francisco'
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        google.maps.event.trigger(map, 'resize');
        map.setCenter(sf);
    });
}

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    
    if (mobileMenuBtn && closeMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            mobileNav.classList.remove('translate-x-full');
            document.body.classList.add('overflow-hidden');
        });
        
        closeMenuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            mobileNav.classList.add('translate-x-full');
            document.body.classList.remove('overflow-hidden');
        });
        
        // Close menu when clicking a link
        const mobileNavLinks = mobileNav.querySelectorAll('a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Don't prevent default here as we want to navigate
                e.stopPropagation();
                mobileNav.classList.add('translate-x-full');
                document.body.classList.remove('overflow-hidden');
            });
        });
    }
});

// Fix mobile scrolling
document.addEventListener('DOMContentLoaded', () => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    
    if (isMobile) {
      // Remove height constraints from body and main
      const bgLayers = document.querySelectorAll('.fixed.inset-0');
      bgLayers.forEach(layer => {
        layer.style.pointerEvents = 'none';
      });
      document.body.style.touchAction = 'auto';
      document.documentElement.style.height = 'auto';
      document.body.style.height = 'auto';
      
      // Enable scrolling directly (higher priority than CSS)
      document.documentElement.style.overflowY = 'auto';
      document.body.style.overflowY = 'auto';
      
      // Force main element to be scrollable
      const mainElement = document.querySelector('main');
      if (mainElement) {
        mainElement.style.overflow = 'visible';
        mainElement.style.minHeight = '0';
        mainElement.style.flex = 'none';
      }
      
      // Disable parallax completely on mobile to prevent interference
      const projectCards = document.querySelectorAll('.group.perspective');
      projectCards.forEach(card => {
        card.style.transform = 'none';
      });
    }
  });