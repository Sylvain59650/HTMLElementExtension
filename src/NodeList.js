if (!NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function(fn) {
    if (fn) {
      for (let i = 0; i < this.length; i++) {
        let it = this[i];
        fn(it, i, this);
      }
    }
  }
}

NodeList.prototype.addClass = function(classNames) {
  this.forEach((it) => it.addClass(classNames));
  return this;
}

NodeList.prototype.removeClass = function(classNames) {
  this.forEach((it) => it.removeClass(classNames));
  return this;
}

NodeList.prototype.removeAttribute = function(attr) {
  this.forEach((it) => it.removeAttribute(attr));
  return this;
}


NodeList.prototype.toggleClass = function(classNames) {
  this.forEach((it) => it.toggleClass(classNames));
  return this;
}

NodeList.prototype.setClass = function(classNames) {
  this.forEach((it) => it.setClass(classNames));
  return this;
}

NodeList.prototype.attr = function() {
  this.forEach((it) => it.attr(arguments));
  return this;
}

NodeList.prototype.css = function(cssProperty, cssValue) {
  this.forEach((it) => it.css(cssProperty, cssValue));
  return this;
}

NodeList.prototype.show = function(visible) {
  this.forEach((it) => it.show(visible));
  return this;
}

NodeList.prototype.remove = function() {
  this.forEach((it) => it.remove());
}