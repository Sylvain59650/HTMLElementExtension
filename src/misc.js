function newElement(tagName, attributes, htmlContent, events) {
  var tag = document.createElement(tagName);
  if (attributes) {
    tag.attrs(attributes);
  }
  if (htmlContent) {
    tag.html(htmlContent);
  }
  if (events) {
    for (var ev in events) {
      //tag.on(ev, events[ev], false);
      tag.addEventListener(ev, events[ev]);
    }

  }
  return tag;
}

function qs(id) {
  return document.querySelector(id);
}

function qsa(selectors) {
  return document.querySelectorAll(selectors);
}