HTMLInputElement.prototype.toTextBox = function() {
  this.attr("type", "text")
}

HTMLInputElement.prototype.toPasswordBox = function() {
  this.attr("type", "password")
}

HTMLInputElement.prototype.togglePassword = function() {
  var type = this.attr("type");
  if (type === "text") {
    this.attr("type", "password");
  } else if (type === "password") {
    this.attr("type", "text");
  } else {
    throw Error("type conversion error");
  }
}

HTMLInputElement.prototype.setNoChanges = function() {
  var type = this.attr("type");
  if (type === "checkbox" || type === "radio") {
    this.attr("old", this.checked);
  } else {
    this.attr("old", this.value);
  }
}

HTMLInputElement.prototype.isModified = function() {
  var type = this.attr("type");
  if (type === "checkbox" || type === "radio") {
    return (this.attr("old") !== "" + this.checked);
  }
  return this.attr("old") !== this.value;
}

HTMLInputElement.prototype.val = function() {
  if (arguments.length == 1) {
    this.value = arguments[0];
  }
  return this.value;
}