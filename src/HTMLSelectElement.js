HTMLSelectElement.prototype.val = function() {
  if (!!this.value) {
    return this.value;
  }
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

HTMLSelectElement.prototype.fill = function(data, keyName, valueName, linkData) {
  this.options.length = 0;
  data.forEach(element => {
    var option = newElement("option");
    option.text = element[keyName];
    option.value = element[valueName];
    if (linkData) {
      option.data = element;
    }
    this.add(option);
  });
}

HTMLSelectElement.prototype.load = function(url, keyName, valueName, linkData) {
  var ctx = this;
  document.getJSON(url, function(data) {
    ctx.fill(data, keyName, valueName, linkData);
  }, function() {
    ctx.options.length = 0;
  });
}