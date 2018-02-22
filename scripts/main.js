
var DETAIL_IMAGE_SELECTOR = "[data-image-role = 'target']";
var DETAIL_TITLE_SELECTOR = "[data-image-role = 'title']";
var THUMBNAIL_LINK_SELECTOR = "[data-image-role = 'trigger']";

function setDetails(imageUrl, titleText) {
  "use strict";
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute("src", imageUrl);

  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
  "use strict";
  return thumbnail.getAttribute("data-image-url");
}

function titleFromThumb(thumbnail) {
  "use strict";
  return thumbnail.getAttribute("data-image-title");
}

function setDetailsFromThumb(thumbnail) {
  "use strict";
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
  "use strict";
  thumb.addEventListener("click", function(event) {
    event.preventDefault();
    setDetailsFromThumb(thumb);
  });
}

function getThumbnailsArray() {
  "use strict";
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

function initializeEvents() {
  "use strict";
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);

  document.getElementById("previous").addEventListener("click", function(event) {
    event.preventDefault();
    past();
  });

  document.getElementById("next").addEventListener("click", function(event) {
    event.preventDefault();
    next();
  });
}

initializeEvents();


function getImages() {
  "use strict";
  var imgs = getThumbnailsArray();
  for (var i = 0; i < imgs.length; i++) {
    imgs[i] = imgs[i].href;
  }
  return imgs;
}

function past() {
  var imgs = getImages();
  var thumbnails = getThumbnailsArray();
  var index = imgs.indexOf(document.getElementById("detail-image").src);
  if (index == 0) {
    index = imgs.length - 1;
  } else {
    index = index - 1;
  }
  thumbnails[index].click();
}

function next() {
  var imgs = getImages();
  var thumbnails = getThumbnailsArray();
  var index = imgs.indexOf(document.getElementById("detail-image").src);
  if (index == 6) {
    index = 0;
  } else {
    index = index + 1;
  }
  thumbnails[index].click();
}
