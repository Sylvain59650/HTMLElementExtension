HTMLSelectElement.prototype.val = function () {
    if (arguments.length == 0) {
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
    else {
        var found = false;
        for (var i = 0; i < this.options.length; i++) {
            if (this.options[i].value == arguments[0]) {
                this.selectedIndex = i;
                found = true;
                break;
            }
        }
        if (!found) {
            this.selectedIndex = -1;
        }
    }
}

HTMLSelectElement.prototype.setNoChanges = function() {
  this.attr("old", this.val());
}

HTMLSelectElement.prototype.isModified = function() {
  return this.attr("old") !== this.val();
}

HTMLSelectElement.prototype.fill = function(data, keyName, textName, linkData) {
  this.options.length = 0;
  data.forEach(element => {
    var option = newElement("option");
    option.value = element[keyName];
	option.text = element[textName];    
    if (linkData) {
      option.data = element;
    }
    this.add(option);
  });
}

HTMLSelectElement.prototype.load = function(url, keyName, textName, linkData) {
  var ctx = this;
  document.getJSON(url, function(data) {
    ctx.fill(data, keyName, textName, linkData);
  }, function() {
    ctx.options.length = 0;
  });
}