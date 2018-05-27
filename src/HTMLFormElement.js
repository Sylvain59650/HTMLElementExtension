/* global qsa */

HTMLFormElement.prototype.val = function() {
  var dic = {};
  var formdata = new FormData(this);
  var done = false;
  var iterator = formdata.entries();
  do {
    var prop = iterator.next();
    if (prop.done && !prop.value) {
      done = true;
    } else {
      dic[prop.value[0]] = prop.value[1];
    }

  } while (!done);
  return dic;
}

HTMLFormElement.prototype.setInputs = function(obj, triggerChange = true) {
  var evt = new Event("change");
  for (var key in obj) {
    let val = obj[key];
    var inputs = this.qsa("[name='" + key + "']");
    if (inputs) {
      if (inputs.length > 1) {
        for (let input of inputs) {
          if (input.checked) { input.checked = false; }
          let vals = String(val).split(",");
          for (let v of vals) {
            if (input.value === v) {
              input.checked = true;
              if (triggerChange) {
                input.dispatchEvent(evt);
              }
              break;
            }
          }
        }
      } else if (inputs.length === 1) {
        let input = inputs[0];
        if (input.type === "checkbox") {
          if (input.checked) { input.checked = false; }
          if (input.value == val) {
            input.checked = true;
          }
        } else {
          input.value = val;
        }
      }

    }
  }
}