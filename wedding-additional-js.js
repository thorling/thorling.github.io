// Add classes to Thai text for animations
document.addEventListener('DOMContentLoaded', function() {
    // Add lang attribute to Thai text elements
    const thaiTextElements = document.querySelectorAll(
      '.date-time:first-of-type, ' +
      '.parents-section p:nth-of-type(1), ' +
      '.parents-section p:nth-of-type(2), ' +
      '.gift-title-text, ' +
      '.schedule-item p'
    );
    
    // Find Thai text by checking for Thai unicode range
    document.querySelectorAll('p').forEach(el => {
      if (el.textContent.match(/[\u0E00-\u0E7F]/)) {
        el.setAttribute('lang', 'th');
      }
    });
    
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
    
    // Create sparkle elements for headings
    function addSparkles(element) {
      for (let i = 0; i < 3; i++) {
        const sparkle = document.createElement('span');
        sparkle.classList.add('sparkle');
        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.top = `${Math.random() * 100}%`;
        sparkle.style.animationDelay = `${Math.random() * 3}s`;
        element.appendChild(sparkle);
      }
    }
    
    // Add sparkles to section headings
    document.querySelectorAll('section h2').forEach(heading => {
      heading.style.position = 'relative';
      heading.style.overflow = 'hidden';
      addSparkles(heading);
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
  });
  
  // Add CSS for the additional animations
  const style = document.createElement('style');
  style.textContent = `
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
    
    .sparkle {
      position: absolute;
      width: 10px;
      height: 10px;
      background: radial-gradient(circle, #fff 0%, rgba(255,255,255,0) 70%);
      border-radius: 50%;
      pointer-events: none;
      animation: sparkle 3s ease-in-out infinite;
      z-index: 1;
    }
    
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
    
    /* Additional animation for scrolling animation */
    .reveal-text {
      position: relative;
    }
    
    .reveal-text::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #ae6070;
      transform-origin: right;
      transform: scaleX(1);
      transition: transform 1s ease-in-out;
    }
    
    .reveal-text.visible::after {
      transform-origin: left;
      transform: scaleX(0);
    }
  `;
  document.head.appendChild(style);
  
  // Apply reveal animation to each paragraph in visible sections
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const paragraphs = entry.target.querySelectorAll('p:not(.letter-animation)');
        paragraphs.forEach((p, index) => {
          setTimeout(() => {
            p.classList.add('visible');
          }, index * 200);
        });
      }
    });
  }, { threshold: 0.2 });
  
  // Wrap text elements with reveal-text class
  document.querySelectorAll('.section p').forEach(p => {
    if (!p.classList.contains('message-text')) {
      p.classList.add('reveal-text');
      revealObserver.observe(p.parentNode);
    }
  });