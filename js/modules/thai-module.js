// thai-module.js - Handles Thai text detection and font application

const ThaiTextModule = (function() {
    // Check if text contains Thai characters
    function containsThai(text) {
        return /[\u0E00-\u0E7F]/.test(text);
    }
    
    // Mark Thai text with appropriate attributes and classes
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
    
    // Initialize animated letter effects
    function createLetterSpans(element) {
        if (!element) return;
        
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

    // Initialize module
    function init() {
        // Process the document body to mark Thai text
        markThaiText(document.body);
        
        // Apply letter animation to main title
        const mainTitle = document.querySelector('.hero-content h1');
        if (mainTitle) {
            createLetterSpans(mainTitle);
        }
        
        // Identify specific Thai text elements for special styling
        const thaiTextElements = document.querySelectorAll(
            '.date-time:first-of-type, ' +
            '.parents-section p:nth-of-type(1), ' +
            '.parents-section p:nth-of-type(2), ' +
            '.gift-title-text, ' +
            '.schedule-item span'
        );
        
        thaiTextElements.forEach(el => {
            el.setAttribute('lang', 'th');
            el.classList.add('th');
        });
        
        // Find all paragraphs with Thai text
        document.querySelectorAll('p').forEach(el => {
            if (el.textContent.match(/[\u0E00-\u0E7F]/)) {
                el.setAttribute('lang', 'th');
                el.classList.add('th');
            }
        });
    }

    // Return public API
    return {
        init: init,
        containsThai: containsThai,
        markThaiText: markThaiText,
        createLetterSpans: createLetterSpans
    };
})();