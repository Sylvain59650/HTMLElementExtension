/* global isDef */

HTMLElement.prototype.addClass = function(className) {
  var classes = className.split(" ");
  for (var i = 0; i < classes.length; i++) {
    var cl = classes[i];
    if (this.classList.contains(cl)) { continue; }
    this.classList.add(cl);
  }
  return this;
}

HTMLElement.prototype.removeClass = function(className) {
  var classes = className.split(" ");
  this.classList.remove(classes);
  return this;
}

HTMLElement.prototype.toggleClass = function(className) {
  var classes = className.split(" ");
  for (var i = 0; i < classes.length; i++) {
    var cl = classes[i];
    if (this.classList.contains(cl)) {
      this.classList.remove(cl);
    } else { this.classList.add(cl); }
  }
}

HTMLElement.prototype.class = function(classNames) {
  if (classNames === "") {
    this.attr("class", "");
    return this;
  }
  var classes = classNames.split(" ");
  for (var i = 0; i < classes.length; i++) {
    var cl = classes[i];
    if (cl[0] === "-") {
      cl = cl.substring(1);
      if (this.classList.contains(cl)) {
        this.classList.remove(cl);
      }
    } else {
      if (cl[0] === "+") {
        cl = cl.substring(1);
      }
      this.classList.add(cl);
    }
  }
}

HTMLElement.prototype.hasClass = function(className) {
  return this.classList.contains(className);
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

HTMLElement.prototype.text = function(st) {
  if (arguments.length === 0) { return this.textContent; }
  this.textContent = st;
  return this;
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

HTMLElement.prototype.val = function(value) {
  if (arguments.length === 1) {
    this.setAttribute("value", value);
  } else {
    return this.getAttribute("value");
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

HTMLElement.prototype.contains = function(item) {
  var it = item;
  if (isDef(item)) {
    while (it.parentNode !== null && it !== this) {
      it = it.parentNode;
    }
    return (it === this);
  }
  return false;
}

if (!Element.prototype.remove) {
  Element.prototype.remove = function() {
    if (this.parentNode) {
      this.parentNode.removeChild(this);
    }
  };
}

HTMLElement.prototype.offset = function() {
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

HTMLElement.prototype.qsn = function(name) {
  return this.querySelector("[name='" + name + "']");
}

HTMLElement.prototype.qsnames = function(name) {
  return this.querySelectorAll("[name='" + name + "']");
}