import { isInViewport, handleDataAttr } from './utils.js';

function lazyLoadIframe(iframe) {
  if (isInViewport(iframe)) {
    const src = handleDataAttr(iframe, 'data-src');
    if (src) {
      iframe.src = src;
      iframe.removeAttribute('data-src');
    }
  }
}

function init() {
  const iframes = document.querySelectorAll('iframe[data-src]');
  iframes.forEach(lazyLoadIframe);

  window.addEventListener('scroll', () => {
    iframes.forEach(lazyLoadIframe);
  });
}

export { init as lazyLoadIframe };