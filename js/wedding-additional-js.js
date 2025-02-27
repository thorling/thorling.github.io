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
    
    // Simplified header animations - no character-by-character that breaks layout
    document.querySelectorAll('section h2').forEach(heading => {
      heading.style.position = 'relative';
      // Remove overflow:hidden which can cause text truncation
      heading.style.overflow = 'visible';
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
  
  // Add CSS for the additional animations, optimized for mobile
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
  `;
  document.head.appendChild(style);
  
  // // Apply reveal animation to each paragraph in visible sections
  // const revealObserver = new IntersectionObserver((entries) => {
  //   entries.forEach(entry => {
  //     if (entry.isIntersecting) {
  //       const paragraphs = entry.target.querySelectorAll('p:not(.letter-animation)');
  //       paragraphs.forEach((p, index) => {
  //         setTimeout(() => {
  //           p.classList.add('visible');
  //         }, index * 200);
  //       });
  //     }
  //   });
  // }, { threshold: 0.2 });
  
  // // Wrap text elements with reveal-text class
  // document.querySelectorAll('.section p').forEach(p => {
  //   if (!p.classList.contains('message-text')) {
  //     p.classList.add('reveal-text');
  //     revealObserver.observe(p.parentNode);
  //   }
  // });