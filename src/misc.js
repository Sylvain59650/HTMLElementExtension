window.newElement = function(tagName, attributes, htmlContent, events, css) {
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
  if (css) {
    tag.css(css);
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

window.qsn = function(name) {
  return document.querySelector("[name='" + name + "']");
}

window.qsnames = function(name) {
  return document.querySelectorAll("[name='" + name + "']");
}