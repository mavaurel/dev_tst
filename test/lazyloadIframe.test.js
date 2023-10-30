const assert = require('assert');
const lazyloadIframe = require('../src/lazyloadIframe.js');
const utils = require('../src/utils.js');

describe('lazyloadIframe', function() {
  let iframe;

  beforeEach(function() {
    iframe = document.createElement('iframe');
    iframe.setAttribute('data-src', 'test.html');
    document.body.appendChild(iframe);
  });

  afterEach(function() {
    document.body.removeChild(iframe);
  });

  it('should not load iframe before it is in viewport', function() {
    assert.equal(iframe.getAttribute('src'), null);
    lazyloadIframe(iframe);
    assert.equal(iframe.getAttribute('src'), null);
  });

  it('should load iframe when it is in viewport', function() {
    utils.isInViewport = () => true;
    lazyloadIframe(iframe);
    assert.equal(iframe.getAttribute('src'), 'test.html');
  });

  it('should not load iframe more than once', function() {
    utils.isInViewport = () => true;
    lazyloadIframe(iframe);
    iframe.setAttribute('data-src', 'test2.html');
    lazyloadIframe(iframe);
    assert.equal(iframe.getAttribute('src'), 'test.html');
  });
});