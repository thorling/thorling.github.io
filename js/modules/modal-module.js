// modal-module.js - Handles all modal functionality except photo slideshow

const ModalModule = (function() {
    // Open gift modal
    function openGiftModal() {
        const giftModal = document.getElementById('giftModal');
        if (!giftModal) return;
        
        giftModal.classList.add('visible');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    }

    // Close gift modal
    function closeGiftModal() {
        const giftModal = document.getElementById('giftModal');
        if (!giftModal) return;
        
        giftModal.classList.remove('visible');
        document.body.style.overflow = 'auto'; // Restore scrolling
    }

    // Initialize module
    function init() {
        // Set up gift button click handlers
        const giftButtons = document.querySelectorAll('.gift-button');
        giftButtons.forEach(btn => {
            btn.addEventListener('click', openGiftModal);
        });
        
        // Set up close button handlers for gift modal
        const closeButtons = document.querySelectorAll('.close-modal');
        closeButtons.forEach(btn => {
            if (btn.closest('#giftModal')) {
                btn.addEventListener('click', closeGiftModal);
            }
        });
        
        // Close modals when clicking outside
        window.addEventListener('click', function(event) {
            const giftModal = document.getElementById('giftModal');
            const photoModal = document.getElementById('photoModal');
            
            if (event.target === giftModal) {
                closeGiftModal();
            }
            
            if (event.target === photoModal) {
                PhotoModule.closePhotoModal();
            }
        });
        
        // Expose functions to global scope for use in HTML attributes
        window.openGiftModal = openGiftModal;
        window.closeGiftModal = closeGiftModal;
    }

    // Return public API
    return {
        init: init,
        openGiftModal: openGiftModal,
        closeGiftModal: closeGiftModal
    };
})();