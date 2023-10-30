import { isInViewport, attachListener, handleDataAttr } from './utils.js';
import lazyloadImage from './lazyloadImage.js';
import lazyloadBackground from './lazyloadBackground.js';
import lazyloadIframe from './lazyloadIframe.js';
import lazyloadVideo from './lazyloadVideo.js';

const lazyLoad = (options = {}) => {
  const defaultOptions = {
    threshold: 0,
    rootMargin: '0px',
    root: null,
  };

  const observerOptions = {
    ...defaultOptions,
    ...options,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const lazyElement = entry.target;
        const dataType = handleDataAttr(lazyElement, 'type');

        switch (dataType) {
          case 'image':
            lazyloadImage(lazyElement);
            break;
          case 'background':
            lazyloadBackground(lazyElement);
            break;
          case 'iframe':
            lazyloadIframe(lazyElement);
            break;
          case 'video':
            lazyloadVideo(lazyElement);
            break;
          default:
            console.error('Invalid data-type for lazy loading');
        }

        observer.unobserve(lazyElement);
      }
    });
  }, observerOptions);

  const lazyElements = document.querySelectorAll('[data-lazy]');

  lazyElements.forEach(lazyElement => {
    if (isInViewport(lazyElement)) {
      const dataType = handleDataAttr(lazyElement, 'type');

      switch (dataType) {
        case 'image':
          lazyloadImage(lazyElement);
          break;
        case 'background':
          lazyloadBackground(lazyElement);
          break;
        case 'iframe':
          lazyloadIframe(lazyElement);
          break;
        case 'video':
          lazyloadVideo(lazyElement);
          break;
        default:
          console.error('Invalid data-type for lazy loading');
      }
    } else {
      observer.observe(lazyElement);
    }
  });

  attachListener(window, 'resize', () => {
    lazyElements.forEach(lazyElement => {
      if (isInViewport(lazyElement)) {
        observer.unobserve(lazyElement);
      } else {
        observer.observe(lazyElement);
      }
    });
  });
};

export default lazyLoad;