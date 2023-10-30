import { isInViewport, handleDataAttr } from './utils.js';

function lazyloadBackground(element) {
  if (!isInViewport(element)) {
    return;
  }

  const dataBackground = handleDataAttr(element, 'data-background');

  if (!dataBackground) {
    console.error('No data-background attribute found for element:', element);
    return;
  }

  element.style.backgroundImage = `url(${dataBackground})`;
  element.removeAttribute('data-background');
}

export default lazyloadBackground;