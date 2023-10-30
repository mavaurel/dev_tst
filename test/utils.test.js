const assert = require('assert');
const utils = require('../src/utils.js');

describe('Utils', function() {
  describe('#isInViewport()', function() {
    it('should return true when the element is in the viewport', function() {
      let element = {
        getBoundingClientRect: function() {
          return {
            top: 0,
            left: 0,
            bottom: 800,
            right: 600
          };
        }
      };
      assert.equal(utils.isInViewport(element), true);
    });

    it('should return false when the element is not in the viewport', function() {
      let element = {
        getBoundingClientRect: function() {
          return {
            top: 900,
            left: 700,
            bottom: 1700,
            right: 1300
          };
        }
      };
      assert.equal(utils.isInViewport(element), false);
    });
  });

  describe('#attachListener()', function() {
    it('should attach an event listener to an element', function() {
      let element = {};
      utils.attachListener(element, 'click', function() {});
      assert.equal(typeof element.click, 'function');
    });
  });

  describe('#handleDataAttr()', function() {
    it('should return the correct data attribute value', function() {
      let element = {
        getAttribute: function(attr) {
          return attr === 'data-src' ? 'test.jpg' : null;
        }
      };
      assert.equal(utils.handleDataAttr(element, 'src'), 'test.jpg');
    });
  });
});