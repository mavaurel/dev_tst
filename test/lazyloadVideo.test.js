const assert = require('assert');
const lazyloadVideo = require('../src/lazyloadVideo.js');

describe('lazyloadVideo', function() {
  it('should lazy load video when in viewport', function() {
    const video = document.createElement('video');
    video.setAttribute('data-src', 'test.mp4');
    document.body.appendChild(video);

    lazyloadVideo.init();
    assert.equal(video.getAttribute('src'), 'test.mp4');
  });

  it('should not load video when not in viewport', function() {
    const video = document.createElement('video');
    video.setAttribute('data-src', 'test.mp4');
    video.style.position = 'absolute';
    video.style.top = '10000px';
    document.body.appendChild(video);

    lazyloadVideo.init();
    assert.equal(video.getAttribute('src'), null);
  });

  it('should load video when scrolled into viewport', function(done) {
    const video = document.createElement('video');
    video.setAttribute('data-src', 'test.mp4');
    video.style.position = 'absolute';
    video.style.top = '10000px';
    document.body.appendChild(video);

    lazyloadVideo.init();
    assert.equal(video.getAttribute('src'), null);

    window.scrollTo(0, 10000);
    setTimeout(function() {
      assert.equal(video.getAttribute('src'), 'test.mp4');
      done();
    }, 1000);
  });
});