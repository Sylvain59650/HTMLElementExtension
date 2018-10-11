HTMLSelectElement.prototype.val = function() {
  var value = "";
  for (var opt of this.selectedOptions) {
    value += opt.value + ",";
  }
  if (value.length > 0) {
    value = value.substring(0, value.length - 1);
  }
  return value;
}

HTMLSelectElement.prototype.setNoChanges = function() {
  this.attr("old", this.val());
}

HTMLSelectElement.prototype.isModified = function() {
  return this.attr("old") !== this.val();
}