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
  if (typeof html !== "string") {
    console.error("appendTo:", html, " is not a string");
  }
  this.insertAdjacentHTML("beforeend", html);
  return this;
}

HTMLElement.prototype.before = function(html) { this.insertAdjacentHTML('beforebegin', html); }
HTMLElement.prototype.after = function(html) { this.insertAdjacentHTML('afterend', html); }
HTMLElement.prototype.append = function(elem) { this.parent.appendChild(elem); }
HTMLElement.prototype.prepend = function(elem) { this.parent.insertBefore(elem, this.parent.firstChild); }

HTMLElement.prototype.outerHeight = function(withMargin) {
  //return (this.parentElement) ? this.parentElement.clientHeight : 0;
  if (withMargin) {
    var height = this.offsetHeight;
    var style = getComputedStyle(this);
    height += parseInt(style.marginTop) + parseInt(style.marginBottom);
    return height;
  } else {
    return this.offsetHeight;
  }
}

HTMLElement.prototype.outerWidth = function(withMargin) {
  if (withMargin) {
    var width = this.offsetWidth;
    var style = getComputedStyle(this);
    width += parseInt(style.marginLeft) + parseInt(style.marginRight);
    return width;
  } else {
    return this.offsetWidth;
  }
  //return (this.parentElement) ? this.parentElement.clientWidth : 0;
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

HTMLElement.prototype.text = function() {
  return this.textContent;
}

HTMLElement.prototype.outerHtml = function(st) {
  if (arguments.length === 1) {
    this.outerHTML = st;
  } else {
    return this.outerHTML;
  }
}

HTMLElement.prototype.attr = function(name, value) {
  if (arguments.length === 2) {
    this.setAttribute(name, value);
  } else {
    return this.getAttribute(name);
  }
}


HTMLElement.prototype.offset = function() {
  //return { top: this.offsetLeft, left: this.offsetTop };
  var rect = this.getBoundingClientRect();
  return {
    top: rect.top + document.body.scrollTop,
    left: rect.left + document.body.scrollLeft
  };
}

HTMLElement.prototype.on = function(evtName, fn, useCapture) {
  if (this.addEventListener) {
    //this.addEventListener(evtName, fn, useCapture || false);
    this[evtName] = fn;
  } else if (this.attachEvent) {
    this.attachEvent(evtName, fn);
  }
}


HTMLElement.prototype.off = function(eventName, eventHandler) {
  this.removeEventListener(eventName, eventHandler);
}