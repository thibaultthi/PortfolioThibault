// Immediate self-executing function to fix mobile layout
(function() {
  // Only run on mobile devices
  if (window.innerWidth <= 768) {
    // Apply immediate fixes
    function applyFixes() {
      console.log("Applying mobile fixes");
      
      // GLOBAL FIXES FOR ALL PAGES
      
      // Hide the name link in top left
      const nameLinks = document.querySelectorAll('a.absolute.top-8.left-8, a[href="index.html"].absolute');
      nameLinks.forEach(link => {
        link.style.display = 'none';
        link.style.opacity = '0';
        link.style.visibility = 'hidden';
      });
      
      // Fix header positioning to make room for content
      const header = document.querySelector('header');
      if (header) {
        header.style.height = 'auto';
        header.style.minHeight = '60px';
        header.style.paddingBottom = '0';
        header.style.marginBottom = '0';
        header.style.position = 'relative';
        header.style.zIndex = '100';
      }
      
      // Fix main container to allow scrolling and move content up
      const mainContainer = document.querySelector('main');
      if (mainContainer) {
        mainContainer.style.height = 'auto';
        mainContainer.style.minHeight = '100vh';
        mainContainer.style.overflow = 'visible';
        mainContainer.style.position = 'relative';
        mainContainer.style.paddingTop = '10px';
        mainContainer.style.paddingBottom = '50px';
        mainContainer.style.width = '100%';
        mainContainer.style.maxWidth = '100%';
        mainContainer.style.boxSizing = 'border-box';
      }
      
      // Fix title visibility and padding
      const titles = document.querySelectorAll('h1, h2, .projects-section h1, main h1, h1.text-black');
      titles.forEach(title => {
        title.style.paddingLeft = '20px';
        title.style.paddingRight = '20px';
        title.style.width = '100%';
        title.style.boxSizing = 'border-box';
        title.style.textAlign = 'left';
        title.style.display = 'block';
        title.style.position = 'relative';
        title.style.zIndex = '100';
        title.style.marginTop = '20px';
        title.style.marginBottom = '20px';
        title.style.fontSize = title.tagName === 'H1' ? '32px' : '24px';
        title.style.lineHeight = '1.2';
      });
      
      // Fix all paragraphs for better readability
      const paragraphs = document.querySelectorAll('p');
      paragraphs.forEach(p => {
        p.style.fontSize = '16px';
        p.style.lineHeight = '1.5';
        p.style.padding = '0 20px';
        p.style.margin = '10px 0';
        p.style.width = '100%';
        p.style.boxSizing = 'border-box';
        p.style.maxWidth = '100%';
      });
      
      // PROJECTS PAGE FIXES
      if (window.location.href.includes('projects.html')) {
        // Fix project cards container
        const gridContainer = document.querySelector('.grid-cols-3') || 
                             document.querySelector('[class*="grid-cols"]');
        
        if (gridContainer) {
          // Reset any transforms or positioning that might be causing issues
          gridContainer.style.transform = 'none';
          gridContainer.style.position = 'relative';
          gridContainer.style.display = 'flex';
          gridContainer.style.flexDirection = 'column';
          gridContainer.style.alignItems = 'center';
          gridContainer.style.width = '100%';
          gridContainer.style.padding = '10px 20px';
          gridContainer.style.marginTop = '0';
          
          // Style each card
          const cards = document.querySelectorAll('.group.perspective');
          cards.forEach((card, index) => {
            card.style.margin = index === 0 ? '0 auto 20px' : '20px auto';
            card.style.display = 'block';
            card.style.opacity = '1';
            card.style.visibility = 'visible';
            card.style.position = 'relative';
            card.style.width = '280px';
            card.style.height = '280px';
            
            // Find and resize card content
            const cardContent = card.querySelectorAll('.preserve-3d, .preserve-3d > div > div');
            cardContent.forEach(content => {
              content.style.width = '280px';
              content.style.height = '280px';
            });
          });
        }
      }
      
      // ABOUT PAGE FIXES
      if (window.location.href.includes('about.html')) {
        console.log("Applying About page fixes");
        
        // Make all pages visible and scrollable
        const aboutPages = document.querySelectorAll('#finance-page, #dev-page, #future-page');
        aboutPages.forEach(page => {
          page.style.position = 'relative';
          page.style.top = 'auto';
          page.style.left = 'auto';
          page.style.height = 'auto';
          page.style.minHeight = '100vh';
          page.style.overflow = 'visible';
          page.style.marginBottom = '50px';
          page.style.paddingTop = '20px';
          page.style.display = 'block';
          page.style.opacity = '1';
          page.style.visibility = 'visible';
          page.style.width = '100%';
          page.style.maxWidth = '100%';
        });
        
        // Fix the about cards layout
        const cardContainers = document.querySelectorAll('.flex.justify-center.gap-\\[35px\\], [class*="justify-center"][class*="gap"]');
        cardContainers.forEach(container => {
          container.style.display = 'flex';
          container.style.flexDirection = 'column';
          container.style.alignItems = 'center';
          container.style.gap = '30px';
          container.style.width = '100%';
          container.style.padding = '20px 0';
          container.style.margin = '0 auto';
        });
        
        // Fix individual about cards
        const aboutCards = document.querySelectorAll('[class*="w-[210px]"], [class*="h-[260px]"]');
        aboutCards.forEach(card => {
          card.style.width = '85%';
          card.style.maxWidth = '320px';
          card.style.height = 'auto';
          card.style.aspectRatio = '0.8/1';
          card.style.margin = '15px auto';
          card.style.display = 'block';
          card.style.position = 'relative';
          card.style.borderRadius = '10px';
          card.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
          
          // Fix card content
          const cardContent = card.querySelectorAll('p, h3, h4');
          cardContent.forEach(content => {
            content.style.padding = '10px 15px';
            content.style.margin = '5px 0';
            content.style.fontSize = content.tagName.startsWith('H') ? '20px' : '16px';
          });
        });
        
        // Hide the timeline navigation dots on mobile
        const timelineNav = document.querySelector('.fixed.right-8.top-\\[45\\%\\], [class*="fixed"][class*="right-8"]');
        if (timelineNav) {
          timelineNav.style.display = 'none';
        }
      }
      
      // CONTACT PAGE FIXES
      if (window.location.href.includes('contact.html')) {
        // Fix contact form container
        const contactContainer = document.querySelector('.contact-container');
        if (contactContainer) {
          contactContainer.style.flexDirection = 'column';
          contactContainer.style.width = '100%';
          contactContainer.style.padding = '20px';
          contactContainer.style.boxSizing = 'border-box';
        }
        
        // Fix contact form
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
          contactForm.style.width = '100%';
          contactForm.style.maxWidth = '100%';
          contactForm.style.padding = '20px';
          contactForm.style.boxSizing = 'border-box';
          contactForm.style.margin = '0 auto';
        }
        
        // Fix form inputs
        const formInputs = document.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
          input.style.width = '100%';
          input.style.padding = '12px';
          input.style.fontSize = '16px';
          input.style.marginBottom = '15px';
          input.style.boxSizing = 'border-box';
        });
        
        // Fix map container
        const mapContainer = document.querySelector('.map-container');
        if (mapContainer) {
          mapContainer.style.width = '100%';
          mapContainer.style.maxWidth = '100%';
          mapContainer.style.marginTop = '30px';
          mapContainer.style.boxSizing = 'border-box';
        }
        
        // Fix map
        const map = document.querySelector('#map');
        if (map) {
          map.style.width = '100%';
          map.style.height = '300px';
          map.style.maxWidth = '100%';
        }
      }
      
      // Make sure the page is scrollable - apply to all possible containers
      document.body.style.overflow = 'auto';
      document.body.style.height = 'auto';
      document.documentElement.style.overflow = 'auto';
      document.documentElement.style.height = 'auto';
      
      // Fix any containers that might be preventing scrolling
      const containers = document.querySelectorAll('.overflow-hidden, .h-screen, [class*="overflow"]');
      containers.forEach(container => {
        container.style.overflow = 'visible';
        container.style.height = 'auto';
      });
      
      // Fix GSAP errors
      if (window.gsap) {
        try {
          gsap.killAll();
        } catch(e) {
          console.log("Error killing GSAP animations");
        }
      }
    }
    
    // Run immediately
    applyFixes();
    
    // Also run after DOM is loaded
    document.addEventListener('DOMContentLoaded', applyFixes);
    
    // And after a delay to catch any late-loading elements
    setTimeout(applyFixes, 500);
    setTimeout(applyFixes, 1000);
  }
})(); 