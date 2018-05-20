NodeList.prototype.addClass = function(classNames) {
  for (let it of this) {
    it.addClass(classNames);
  }
}

NodeList.prototype.removeClass = function(classNames) {
  for (let it of this) {
    it.removeClass(classNames);
  }
}

NodeList.prototype.toggleClass = function(classNames) {
  for (let it of this) {
    it.toggleClass(classNames);
  }
}

NodeList.prototype.css = function(cssProperty, cssValue) {
  for (let it of this) {
    it.css(cssProperty, cssValue);
  }
}

NodeList.prototype.show = function(visible) {
  for (let it of this) {
    it.show(visible);
  }
}

NodeList.prototype.attrs = function(attributes) {
  for (let it of this) {
    it.attrs(attributes);
  }
}
NodeList.prototype.on = function(evtNames, fn, option) {
  for (let it of this) {
    it.on(evtNames, fn, option);
  }
}