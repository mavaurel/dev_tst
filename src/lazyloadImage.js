import { isInViewport, handleDataAttr } from './utils.js';

function lazyLoadImage(image) {
  if (isInViewport(image)) {
    const src = handleDataAttr(image, 'data-src');
    if (src) {
      image.src = src;
      image.onload = () => {
        image.removeAttribute('data-src');
      };
    }
  }
}

function init() {
  const images = document.querySelectorAll('img[data-src]');
  images.forEach(lazyLoadImage);
  window.addEventListener('scroll', () => images.forEach(lazyLoadImage));
  window.addEventListener('resize', () => images.forEach(lazyLoadImage));
}

export default init;