// Mobile-specific script for projects page
(function() {
  // Only run on mobile devices
  if (window.innerWidth <= 768) {
    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
      // Check if we're on the projects page
      if (document.body.classList.contains('projects-page') || 
          document.querySelector('.projects-section')) {
        
        // Add class to body for targeting
        document.body.classList.add('projects-page');
        
        // Get the grid container
        const gridContainer = document.querySelector('.grid-cols-3') || 
                             document.querySelector('[class*="grid-cols"]');
        
        if (gridContainer) {
          // Force it to be a flex column
          gridContainer.style.display = 'flex';
          gridContainer.style.flexDirection = 'column';
          gridContainer.style.alignItems = 'center';
          gridContainer.style.justifyContent = 'center';
          gridContainer.style.width = '100%';
          gridContainer.style.maxWidth = '100%';
          gridContainer.style.padding = '20px';
          gridContainer.style.margin = '0 auto';
          
          // Get all project cards
          const cards = document.querySelectorAll('.group.perspective');
          
          // Style each card
          cards.forEach(card => {
            card.style.margin = '20px auto';
            card.style.width = '250px';
            card.style.height = '250px';
            card.style.transform = 'none';
            card.style.display = 'block';
            card.style.opacity = '1';
            card.style.visibility = 'visible';
          });
          
          // Make sure the page is scrollable
          document.body.style.overflow = 'auto';
          document.documentElement.style.overflow = 'auto';
          
          // Fix any containers that might be preventing scrolling
          const containers = document.querySelectorAll('.overflow-hidden, .h-screen');
          containers.forEach(container => {
            container.style.overflow = 'visible';
            container.style.height = 'auto';
            container.style.minHeight = '100vh';
          });
        }
      }
    });
  }
})(); 