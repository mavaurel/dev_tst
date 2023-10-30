```javascript
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function attachListener(element, event, callback) {
    if (element.addEventListener) {
        element.addEventListener(event, callback, false);
    } else if (element.attachEvent) {
        element.attachEvent('on' + event, callback);
    }
}

function handleDataAttr(element, attr) {
    return element.getAttribute('data-' + attr);
}

function init() {
    const elements = document.querySelectorAll('[data-lazy]');
    for (let i = 0; i < elements.length; i++) {
        if (isInViewport(elements[i])) {
            elements[i].src = handleDataAttr(elements[i], 'src');
        } else {
            attachListener(window, 'scroll', function() {
                if (isInViewport(elements[i])) {
                    elements[i].src = handleDataAttr(elements[i], 'src');
                }
            });
        }
    }
}

export { isInViewport, attachListener, handleDataAttr, init };
```