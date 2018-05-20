window.newElement = function(tagName, attributes, htmlContent, events) {
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

window.qs = function(id) {
  return document.querySelector(id);
}

window.qsa = function(selectors) {
  return document.querySelectorAll(selectors);
}

window.qsi = function(id) {
  return document.querySelector("#" + id);
}