HTMLElement.prototype.addClass = function(className) {
  debugger;
  this.setAttribute("class", this.getAttribute("class") || "" + " " + className);
  return this;
}

HTMLElement.prototype.removeClass = function(className) {
  var cl = this.getAttribute("class") || "";
  cl = cl.replace(className, "").trim();
  this.setAttribute("class", cl);
  return this;
}

HTMLElement.prototype.toggleClass = function(className) {
  var cl = this.getAttribute("class") || "";
  if (cl === "") return this.addClass(className);
  return this.removeClass(className);
}


HTMLElement.prototype.css = function(cssProperty, cssValue) {
  var s = this.style;
  if (arguments.length === 1 && typeof cssProperty === "string") {
    return s[cssProperty];
  }
  if (typeof cssProperty === "object") {
    for (var p in cssProperty) {
      s[p] = cssProperty[p];
    }
  } else {
    this.style[cssProperty] = cssValue;
  }
  return this;
}

HTMLElement.prototype.appendTo = function(html) {
  this.insertAdjacentHTML("beforeend", html);
  return this;
}

HTMLElement.prototype.outerHeight = function() {
  return (this.parentElement) ? this.parentElement.clientHeight : 0;
}

HTMLElement.prototype.outerWidth = function() {
  return (this.parentElement) ? this.parentElement.clientWidth : 0;
}


HTMLElement.prototype.hide = function() {
  this.style.display = "none";
}

HTMLElement.prototype.show = function() {
  this.css({ "display": "", visibility: "" });
}

HTMLElement.prototype.isVisible = function() {
  return this.css("display") !== "none";
}

HTMLElement.prototype.toggleVisible = function() {
  if (this.isVisible()) { return this.hide(); }
  return this.show();
}

HTMLElement.prototype.html = function(st) {
  if (arguments.length === 0) return this.innerHTML;
  this.innerHTML = st;
  return this;
}



HTMLElement.prototype.offset = function() {
  return { top: this.offsetLeft, left: this.offsetTop };
}

HTMLElement.prototype.on = function(evtName, fn, useCapture) {
  if (this.addEventListener) {
    //this.addEventListener(evtName, fn, useCapture || false);
    this[evtName] = fn;
  } else if (this.attachEvent) {
    this.attachEvent(evtName, fn);
  }
}