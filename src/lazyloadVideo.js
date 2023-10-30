import { isInViewport, handleDataAttr } from './utils.js';

function lazyLoadVideo(video) {
    if (!isInViewport(video)) {
        return;
    }

    const src = handleDataAttr(video, 'data-src');
    if (src) {
        video.src = src;
    }

    const poster = handleDataAttr(video, 'data-poster');
    if (poster) {
        video.poster = poster;
    }

    video.addEventListener('load', () => {
        video.removeAttribute('data-src');
        video.removeAttribute('data-poster');
    });
}

function init() {
    const videos = document.querySelectorAll('video[data-src], video[data-poster]');
    videos.forEach(lazyLoadVideo);

    window.addEventListener('scroll', () => {
        videos.forEach(lazyLoadVideo);
    });

    window.addEventListener('resize', () => {
        videos.forEach(lazyLoadVideo);
    });
}

export { init as lazyLoadVideo };