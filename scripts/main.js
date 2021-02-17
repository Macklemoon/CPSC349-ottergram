/*jslint browser:true*/

var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';

var TINY_EFFECT_CLASS = 'is-tiny';

var ESC_KEY = 27;

function setDetails(imageUrl, titleText) {
    'use strict';
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
    'use strict';

    return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
    'use strict';

    return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
    'use strict';

    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function imageFromDetail(detail) {
    'use strict';

    return detail.getAttribute('data-image-url');
}

function titleFromDetail(detail) {
    'use strict';

    return detail.getAttribute('data-image-title');
}


function hideDetails() {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
    'use strict';
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);

    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function () {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
}

function addThumbClickHandler(thumb) {
    'use strict';
    thumb.addEventListener('click', function (event) {
        event.preventDefault();
        setDetailsFromThumb(thumb);
        showDetails();
    });
}

function getThumbnailsArray() {
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

function goLeft() {
    'use strict';
    var thumbnails = getThumbnailsArray();
    var count = 0;
    var index = 0;
    var len = thumbnails.length;
    while (count < len) {
        if (thumbnails[count].getAttribute('data-image-url') === document.querySelector(DETAIL_IMAGE_SELECTOR).getAttribute('src')) {
            index = count - 1;
            count = len;
            if (index === -1) {
                index = len - 1;
            }
        }
        count = count + 1;
    }

    setDetails(imageFromThumb(thumbnails[index]), titleFromThumb(thumbnails[index]));
}

function goRight() {
    'use strict';
    var thumbnails = getThumbnailsArray();
    var index = 0;
    var len = thumbnails.length;
    var count = len - 1;
    while (0 < count) {
        if (thumbnails[count].getAttribute('data-image-url') === document.querySelector(DETAIL_IMAGE_SELECTOR).getAttribute('src')) {
            index = count + 1;
            count = 0;
            // when oob, loop around
            if (index === len) {
                index = 0;
            }
        }

        count = count - 1;
    }

    setDetails(imageFromThumb(thumbnails[index]), titleFromThumb(thumbnails[index]));
}

function addKeyPressHandler() {
    'use strict';
    document.body.addEventListener('keyup', function (event) {
        event.preventDefault();
        console.log(event.keyCode);
        if (event.keyCode === ESC_KEY) {
            hideDetails();
        }
    });
}

function initializeEvents() {
    'use strict';
    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);
    addKeyPressHandler();
}

initializeEvents();