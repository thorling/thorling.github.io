// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // If this is a photo section, animate the photos
            if (entry.target.id === 'photos') {
                const photos = entry.target.getElementsByClassName('photo-item');
                Array.from(photos).forEach((photo, index) => {
                    setTimeout(() => {
                        photo.classList.add('visible');
                    }, index * 200);
                });
            }
        }
    });
}, {
    threshold: 0.1
});

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Photo Modal functions
let slideIndex = 1;

function openPhotoModal(n) {
    document.getElementById('photoModal').classList.add('visible');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    currentSlide(n);
    
    // Add touch event listeners when modal is opened
    setupSwipeListeners();
}

function closePhotoModal() {
    document.getElementById('photoModal').classList.remove('visible');
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Touch swipe functionality for the slideshow
function setupSwipeListeners() {
    let touchStartX = 0;
    let touchEndX = 0;
    
    const slideshowContainer = document.querySelector('.slideshow-container');
    
    slideshowContainer.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    slideshowContainer.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        const swipeThreshold = 50; // Minimum distance for a swipe
        const swipeDistance = touchEndX - touchStartX;
        
        if (Math.abs(swipeDistance) < swipeThreshold) {
            return; // Not a significant swipe
        }
        
        if (swipeDistance < 0) {
            // Swiped left
            plusSlides(1);
        } else {
            // Swiped right
            plusSlides(-1);
        }
    }
}

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    
    // Loop to beginning if at end
    if (n > slides.length) {slideIndex = 1}
    
    // Loop to end if past beginning
    if (n < 1) {slideIndex = slides.length}
    
    // Hide all slides
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    // Remove active class from all dots
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    // Show current slide and activate its dot
    slides[slideIndex-1].style.display = "flex";
    dots[slideIndex-1].className += " active";
}

// Enable arrow key navigation for slideshow
document.addEventListener('keydown', function(e) {
    const photoModal = document.getElementById('photoModal');
    
    // Only process key events if photo modal is open
    if (photoModal.classList.contains('visible')) {
        if (e.key === 'ArrowLeft') {
            plusSlides(-1);
        } else if (e.key === 'ArrowRight') {
            plusSlides(1);
        } else if (e.key === 'Escape') {
            closePhotoModal();
        }
    }
});

// Gift Modal functions
function openGiftModal() {
    document.getElementById('giftModal').classList.add('visible');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
}

function closeGiftModal() {
    document.getElementById('giftModal').classList.remove('visible');
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close modals when clicking outside
window.onclick = function (event) {
    const giftModal = document.getElementById('giftModal');
    const photoModal = document.getElementById('photoModal');
    
    if (event.target === giftModal) {
        closeGiftModal();
    }
    
    if (event.target === photoModal) {
        closePhotoModal();
    }
};

// Add classes to Thai text for animations and apply fonts
document.addEventListener('DOMContentLoaded', function() {
    // Function to check if text contains Thai characters
    function containsThai(text) {
        return /[\u0E00-\u0E7F]/.test(text);
    }
    
    // Find all text nodes and mark Thai text with lang attribute
    function markThaiText(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            if (node.textContent.trim() && containsThai(node.textContent)) {
                // If this is a Thai text node, wrap it with a span with lang="th"
                if (node.parentNode && !node.parentNode.hasAttribute('lang')) {
                    node.parentNode.setAttribute('lang', 'th');
                    node.parentNode.classList.add('th');
                }
            }
            return;
        }
        
        // Skip certain elements that shouldn't have font changes
        if (node.classList && (
            node.classList.contains('icon-circle') || 
            node.classList.contains('heart-icon') ||
            node.tagName === 'SVG' ||
            node.closest('.icon-circle') ||
            node.closest('svg')
        )) {
            return;
        }
        
        // If this element already has Thai text, mark it
        if (node.textContent && containsThai(node.textContent)) {
            node.setAttribute('lang', 'th');
            node.classList.add('th');
        }
        
        // Process child nodes
        Array.from(node.childNodes).forEach(markThaiText);
    }
    
    // Process the document body to mark Thai text
    markThaiText(document.body);
    
    // Make sure hero content is using BrittanySignature
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        heroTitle.style.fontFamily = "'BrittanySignature', 'Great Vibes', cursive";
    }
    
    const heroSubtitle = document.querySelector('.hero-content p');
    if (heroSubtitle) {
        heroSubtitle.style.fontFamily = "'BrittanySignature', 'Italianno', cursive";
    }
    
    // Add animated text reveal for specific elements
    function createLetterSpans(element) {
        const text = element.textContent;
        element.textContent = '';
        
        for (let i = 0; i < text.length; i++) {
            const span = document.createElement('span');
            span.textContent = text[i];
            span.style.animationDelay = `${0.1 + (i * 0.03)}s`;
            span.classList.add('letter-animation');
            element.appendChild(span);
        }
    }
    
    // Apply letter animation to main title
    const mainTitle = document.querySelector('.hero-content h1');
    if (mainTitle) {
        createLetterSpans(mainTitle);
    }
    
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
});