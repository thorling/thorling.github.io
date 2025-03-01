// main.js - Core functionality for the wedding website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    AnimationModule.init();
    PhotoModule.init();
    ModalModule.init();
    ThaiTextModule.init();
    
    // Log initialization complete
    console.log('Wedding website initialized');
});

// Animation Module - Handles scroll animations and element visibility
const AnimationModule = (function() {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    // Initialize the module
    function init() {
        // Observe all sections for scroll animations
        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section);
        });
        
        // Enhance heart icon with pulsing effect
        const heartIcon = document.querySelector('.heart-icon');
        if (heartIcon) {
            setInterval(() => {
                heartIcon.classList.add('pulse');
                setTimeout(() => {
                    heartIcon.classList.remove('pulse');
                }, 1000);
            }, 3000);
        }
        
        // Add subtle animation to bride and groom names
        const brideGroomNames = document.querySelectorAll('.parents-section p');
        brideGroomNames.forEach((name, index) => {
            name.style.animationDelay = `${0.3 * index}s`;
        });
    }

    return {
        init: init,
        observer: observer
    };
})();