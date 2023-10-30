const assert = require('assert');
const lazyloadImage = require('../src/lazyloadImage.js');
const utils = require('../src/utils.js');

describe('lazyloadImage', function() {
  let imgElement;

  beforeEach(function() {
    imgElement = document.createElement('img');
    imgElement.setAttribute('data-src', 'test.jpg');
    document.body.appendChild(imgElement);
  });

  afterEach(function() {
    document.body.removeChild(imgElement);
  });

  it('should set the src attribute when the image is in the viewport', function() {
    utils.isInViewport = () => true;
    lazyloadImage.init(imgElement);
    assert.equal(imgElement.getAttribute('src'), 'test.jpg');
  });

  it('should not set the src attribute when the image is not in the viewport', function() {
    utils.isInViewport = () => false;
    lazyloadImage.init(imgElement);
    assert.equal(imgElement.getAttribute('src'), null);
  });

  it('should set the src attribute when the image enters the viewport', function(done) {
    utils.isInViewport = () => false;
    lazyloadImage.init(imgElement);
    assert.equal(imgElement.getAttribute('src'), null);

    utils.isInViewport = () => true;
    window.dispatchEvent(new Event('scroll'));

    setTimeout(function() {
      assert.equal(imgElement.getAttribute('src'), 'test.jpg');
      done();
    }, 100);
  });
});