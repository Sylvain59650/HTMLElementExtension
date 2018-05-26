HTMLElement.prototype.addClass = function(className) {
  this.setAttribute("class", (this.getAttribute("class") || "") + " " + className);
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
  if (cl === "") { return this.addClass(className); }
  return this.removeClass(className);
}

HTMLElement.prototype.hasClass = function(className) {
  return (this.getAttribute("class") || "").indexOf(className) >= 0;
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

// HTMLElement.prototype.appendTo = function(html) {
//   if (typeof html !== "string") {
//     console.error("appendTo:", html, " is not a string");
//   }
//   this.insertAdjacentHTML("beforeend", html);
//   return this;
// }

HTMLElement.prototype.beforeBeginHTML = function(html) { return this.insertAdjacentHTML("beforebegin", html); }
HTMLElement.prototype.afterBeginHTML = function(html) { return this.insertAdjacentHTML("afterBegin", html); }
HTMLElement.prototype.beforeEndHTML = function(html) { return this.insertAdjacentHTML("beforeEnd", html); }
HTMLElement.prototype.afterEndHTML = function(html) { return this.insertAdjacentHTML("afterEnd", html); }

HTMLElement.prototype.beforeBegin = function(el) { return this.insertAdjacentElement("beforebegin", el); }
HTMLElement.prototype.afterBegin = function(el) { return this.insertAdjacentElement("afterbegin", el); }
HTMLElement.prototype.beforeEnd = function(el) { return this.insertAdjacentElement("beforeend", el); }
HTMLElement.prototype.afterEnd = function(el) { return this.insertAdjacentElement("afterend", el); }

HTMLElement.prototype.outerHeight = function(withMargin) {
  //return (this.parentElement) ? this.parentElement.clientHeight : 0;
  if (withMargin) {
    var height = this.offsetHeight;
    var style = getComputedStyle(this);
    height += parseInt(style.marginTop, 10) + parseInt(style.marginBottom, 10);
    return height;
  }
  return this.offsetHeight;

}

HTMLElement.prototype.outerWidth = function(withMargin) {
  if (withMargin) {
    var width = this.offsetWidth;
    var style = getComputedStyle(this);
    width += parseInt(style.marginLeft, 10) + parseInt(style.marginRight, 10);
    return width;
  }
  return this.offsetWidth;

  //return (this.parentElement) ? this.parentElement.clientWidth : 0;
}

HTMLElement.prototype.show = function(visible) {
  if (visible) {
    this.css({ "display": "", visibility: "" });
  } else {
    this.style.display = "none";
  }
}

HTMLElement.prototype.isVisible = function() {
  return this.css("display") !== "none";
}

HTMLElement.prototype.toggleVisible = function() {
  this.show(!this.isVisible());
}

HTMLElement.prototype.html = function(st) {
  if (arguments.length === 0) { return this.innerHTML; }
  this.innerHTML = st;
  return this;
}

HTMLElement.prototype.text = function() {
  return this.textContent;
}

HTMLElement.prototype.parent = function() {
  return this.parentNode;
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


HTMLElement.prototype.attrs = function(attributes) {
  if (arguments.length === 1) {
    for (var a in attributes) {
      this.attr(a, attributes[a]);
    }
    return this;
  }
  return [];
}

HTMLElement.prototype.offset = function() {
  //return { top: this.offsetLeft, left: this.offsetTop };
  var rect = this.getBoundingClientRect();
  return {
    top: rect.top + document.body.scrollTop,
    left: rect.left + document.body.scrollLeft
  };
}

HTMLElement.prototype.qs = function(selector) {
  return this.querySelector(selector);
}

HTMLElement.prototype.qsa = function(selector) {
  return this.querySelectorAll(selector);
}


HTMLElement.prototype.on = function(evtName, fn, useCapture) {
  if (this.addEventListener) {
    // if (this["on" + evtName] !== undefined) {
    //   this["on" + evtName] = fn;
    // } else
    this.addEventListener(evtName, fn, useCapture || false);
    //this[evtName] = fn;
  } else if (this.attachEvent) {
    this.attachEvent("on" + evtName, fn);
  }
}


HTMLElement.prototype.off = function(eventName, eventHandler) {
  if (this.removeEventListener) {
    this.removeEventListener(eventName, eventHandler, false)
  } else if (this.detachEvent) {
    this.detachEvent("on" + eventName, eventHandler)
  }
}