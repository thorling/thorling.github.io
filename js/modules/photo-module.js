// photo-module.js - Handles photo grid and slideshow functionality

const PhotoModule = (function() {
    // Current slide index
    let slideIndex = 1;
    
    // Photo-specific observer for staggered animations
    const photoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate photos with a staggered effect
                const photos = entry.target.getElementsByClassName('photo-item');
                Array.from(photos).forEach((photo, index) => {
                    setTimeout(() => {
                        photo.classList.add('visible');
                    }, 100 + (index * 150)); // Staggered timing for smoother appearance
                });
            }
        });
    }, {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Offset trigger point slightly above viewport bottom
    });

    // Initialize touch swipe functionality
    function setupSwipeListeners() {
        let touchStartX = 0;
        let touchEndX = 0;
        
        const slideshowContainer = document.querySelector('.slideshow-container');
        if (!slideshowContainer) return;
        
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

    // Open photo modal
    function openPhotoModal(n) {
        const photoModal = document.getElementById('photoModal');
        if (!photoModal) return;
        
        photoModal.classList.add('visible');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        currentSlide(n);
        
        // Set up touch events when modal is opened
        setupSwipeListeners();
    }

    // Close photo modal
    function closePhotoModal() {
        const photoModal = document.getElementById('photoModal');
        if (!photoModal) return;
        
        photoModal.classList.remove('visible');
        document.body.style.overflow = 'auto'; // Restore scrolling
    }

    // Move to next/previous slide
    function plusSlides(n) {
        showSlides(slideIndex += n);
        console.log(n);
    }

    // Show specific slide
    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    // Display slides
    function showSlides(n) {
        let i;
        const slides = document.getElementsByClassName("mySlides");
        const dots = document.getElementsByClassName("dot");
        
        if (!slides.length || !dots.length) return;
        
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

    // Initialize module
    function init() {
        // Observe photos section for animation
        const photosSection = document.getElementById('photos');
        if (photosSection) {
            photoObserver.observe(photosSection);
        }
        
        // Add modal open handlers to photo items
        document.querySelectorAll('.photo-item').forEach((item, index) => {
            item.addEventListener('click', function() {
                openPhotoModal(index + 1);
            });
        });
        
        // Add keyboard navigation events
        document.addEventListener('keydown', function(e) {
            const photoModal = document.getElementById('photoModal');
            
            // Only process key events if photo modal is open
            if (photoModal && photoModal.classList.contains('visible')) {
                if (e.key === 'ArrowLeft') {
                    plusSlides(-1);
                } else if (e.key === 'ArrowRight') {
                    plusSlides(1);
                } else if (e.key === 'Escape') {
                    closePhotoModal();
                }
            }
        });
        
        // Add click handlers for navigation elements
        const prevButtons = document.querySelectorAll('.prev');
        const nextButtons = document.querySelectorAll('.next');
        const dots = document.querySelectorAll('.dot');
        const closeButtons = document.querySelectorAll('.close-modal');
        
        prevButtons.forEach(btn => {
            // btn.addEventListener('click', () => plusSlides(-1));
        });
        
        nextButtons.forEach(btn => {
            // btn.addEventListener('click', () => plusSlides(1));
        });
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => currentSlide(index + 1));
        });
        
        closeButtons.forEach(btn => {
            if (btn.closest('.photo-modal')) {
                btn.addEventListener('click', closePhotoModal);
            }
        });
        
        // Expose functions to global scope for use in HTML attributes
        window.openPhotoModal = openPhotoModal;
        window.closePhotoModal = closePhotoModal;
        window.plusSlides = plusSlides;
        window.currentSlide = currentSlide;
        
        // Initialize first slide if modal is already open
        if (document.querySelector('.photo-modal.visible')) {
            showSlides(slideIndex);
        }
    }

    // Return public API
    return {
        init: init,
        openPhotoModal: openPhotoModal,
        closePhotoModal: closePhotoModal,
        plusSlides: plusSlides,
        currentSlide: currentSlide
    };
})();