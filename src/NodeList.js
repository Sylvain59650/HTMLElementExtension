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
}

NodeList.prototype.removeClass = function(classNames) {
  this.forEach((it) => it.removeClass(classNames));
}

NodeList.prototype.toggleClass = function(classNames) {
  this.forEach((it) => it.toggleClass(classNames));
}

NodeList.prototype.css = function(cssProperty, cssValue) {
  this.forEach((it) => it.css(cssProperty, cssValue));
}

NodeList.prototype.show = function(visible) {
  this.forEach((it) => it.show(visible));
}

NodeList.prototype.attrs = function(attributes) {
  this.forEach((it) => it.attrs(attributes));
}
NodeList.prototype.on = function(evtNames, fn, option) {
  this.forEach((it) => it.on(evtNames, fn, option));
}