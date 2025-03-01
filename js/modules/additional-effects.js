// additional-effects.js - Contains additional effects from wedding-additional-js.js

const AdditionalEffectsModule = (function() {
    // Create sparkle elements for headings
    function addSparkles(element) {
        if (!element) return;
        
        for (let i = 0; i < 3; i++) {
            const sparkle = document.createElement('span');
            sparkle.classList.add('sparkle');
            sparkle.style.left = `${Math.random() * 100}%`;
            sparkle.style.top = `${Math.random() * 100}%`;
            sparkle.style.animationDelay = `${Math.random() * 3}s`;
            element.appendChild(sparkle);
        }
    }
    
    // Add the additional CSS for animations that was previously inline
    function addAdditionalCSS() {
        const style = document.createElement('style');
        style.textContent = `
            .letter-animation {
                display: inline-block;
                opacity: 0;
                transform: translateY(10px);
                animation: fadeLetters 0.5s ease forwards;
            }
            
            @keyframes fadeLetters {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .pulse {
                animation: pulse 1s cubic-bezier(.66,0,.3,1) forwards;
            }
            
            @keyframes pulse {
                0% {
                    transform: scale(1);
                }
                50% {
                    transform: scale(1.15);
                }
                100% {
                    transform: scale(1);
                }
            }
            
            /* Fade in from bottom animation for text */
            .reveal-text {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.8s ease, transform 0.8s ease;
            }
            
            .reveal-text.visible {
                opacity: 1;
                transform: translateY(0);
            }
            
            /* Sparkle animation */
            .sparkle {
                position: absolute;
                width: 5px;
                height: 5px;
                border-radius: 50%;
                background-color: rgba(255, 255, 255, 0.7);
                pointer-events: none;
                animation: sparkle 3s ease-in-out infinite;
            }
            
            @keyframes sparkle {
                0%, 100% {
                    opacity: 0;
                    transform: scale(0);
                }
                50% {
                    opacity: 1;
                    transform: scale(1);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Apply reveal animation to paragraphs in visible sections
    function setupRevealAnimation() {
        // Wrap text elements with reveal-text class
        document.querySelectorAll('.section p').forEach(p => {
            if (!p.classList.contains('message-text')) {
                p.classList.add('reveal-text');
            }
        });
        
        // Observer for reveal animations
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const paragraphs = entry.target.querySelectorAll('p.reveal-text');
                    paragraphs.forEach((p, index) => {
                        setTimeout(() => {
                            p.classList.add('visible');
                        }, index * 200);
                    });
                }
            });
        }, { threshold: 0.2 });
        
        // Observe sections for reveal animations
        document.querySelectorAll('.section').forEach(section => {
            revealObserver.observe(section);
        });
    }
    
    // Initialize the module
    function init() {
        // Add the additional CSS
        addAdditionalCSS();
        
        // Setup reveal animations (commented out for now as it was commented in original)
        // setupRevealAnimation();
        
        // Add sparkles to headings (commented out for now as it was commented in original)
        // document.querySelectorAll('section h2').forEach(heading => {
        //     heading.style.position = 'relative';
        //     heading.style.overflow = 'visible';
        //     addSparkles(heading);
        // });
    }
    
    // Return public API
    return {
        init: init,
        addSparkles: addSparkles,
        setupRevealAnimation: setupRevealAnimation
    };
})();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    AdditionalEffectsModule.init();
});