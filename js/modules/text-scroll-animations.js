// Simple Text Animation Plugin - Will safely enhance the existing website
// Add this code to a new file named text-scroll-animations.js

document.addEventListener('DOMContentLoaded', function() {
    // Wait a moment to ensure other scripts have loaded
    setTimeout(function() {
        // Set up the text animation observer
        setupTextAnimations();
        console.log('Text animations initialized');
    }, 500);
});

function setupTextAnimations() {
    // Create a new intersection observer for text animations
    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // When section becomes visible, animate its text elements
                animateTextInSection(entry.target);
                
                // Stop observing once animation is applied
                textObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, 
        rootMargin: '-50px 0px'
    });
    
    // Start observing all sections
    document.querySelectorAll('.section').forEach(section => {
        textObserver.observe(section);
    });
    
    // Also observe the message section
    const messageSection = document.querySelector('.message-section');
    if (messageSection) {
        textObserver.observe(messageSection);
    }
}

// Apply staggered fade-in animations to text elements
function animateTextInSection(section) {
    // Don't re-animate sections
    if (section.classList.contains('text-animated')) return;
    section.classList.add('text-animated');
    
    // Find and animate headings
    const headings = section.querySelectorAll('h2, h3, h4');
    headings.forEach((heading, index) => {
        heading.style.opacity = '0';
        heading.style.transform = 'translateY(15px)';
        
        setTimeout(() => {
            heading.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
            heading.style.opacity = '1';
            heading.style.transform = 'translateY(0)';
        }, 100 + (index * 150));
    });
    
    // Find and animate paragraphs
    const paragraphs = section.querySelectorAll('p:not(.couple-name):not(.couple-thai-name)');
    paragraphs.forEach((paragraph, index) => {
        paragraph.style.opacity = '0';
        paragraph.style.transform = 'translateY(15px)';
        
        setTimeout(() => {
            paragraph.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
            paragraph.style.opacity = '1';
            paragraph.style.transform = 'translateY(0)';
        }, 300 + (index * 120));
    });
    
    // Find and animate schedule items
    const scheduleItems = section.querySelectorAll('.schedule-item span');
    scheduleItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(15px)';
        
        setTimeout(() => {
            item.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 500 + (index * 100));
    });
    
    // Find and animate buttons
    const buttons = section.querySelectorAll('button, .gift-button, .rsvp-button');
    buttons.forEach((button, index) => {
        button.style.opacity = '0';
        button.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            button.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
            button.style.opacity = '1';
            button.style.transform = 'translateY(0)';
        }, 600 + (index * 100));
    });
}