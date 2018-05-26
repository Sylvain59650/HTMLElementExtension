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