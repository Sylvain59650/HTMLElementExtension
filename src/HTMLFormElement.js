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