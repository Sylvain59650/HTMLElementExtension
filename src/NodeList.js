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

NodeList.prototype.forObject = function(fn) {
  // this.forEach((it) => fn.bind(it).call());
  debugger;
  fn.apply(null, this);
  // if (fn) {
  //   for (let i = 0; i < this.length; i++) {
  //     let it = this[i];

  //     var f = fn.bind(it);
  //     f.apply(it);
  //   }
  // }
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

NodeList.prototype.class = function(classNames) {
  this.forEach((it) => it.class(classNames));
}

NodeList.prototype.css = function(cssProperty, cssValue) {
  this.forEach((it) => it.css(cssProperty, cssValue));
}

NodeList.prototype.show = function(visible) {
  this.forEach((it) => it.show(visible));
}