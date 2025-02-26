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