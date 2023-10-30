const assert = require('assert');
const lazyloadBackground = require('../src/lazyloadBackground.js');

describe('lazyloadBackground', function() {
  it('should lazy load background images when they are in the viewport', function() {
    const element = {
      getBoundingClientRect: function() {
        return {
          top: 0,
          left: 0,
          width: 100,
          height: 100
        };
      },
      dataset: {
        src: 'test.jpg'
      },
      style: {
        backgroundImage: ''
      }
    };

    lazyloadBackground(element);

    assert.equal(element.style.backgroundImage, 'url(test.jpg)');
  });

  it('should not lazy load background images when they are not in the viewport', function() {
    const element = {
      getBoundingClientRect: function() {
        return {
          top: 1000,
          left: 1000,
          width: 100,
          height: 100
        };
      },
      dataset: {
        src: 'test.jpg'
      },
      style: {
        backgroundImage: ''
      }
    };

    lazyloadBackground(element);

    assert.equal(element.style.backgroundImage, '');
  });
});