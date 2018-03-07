document.ready = function(fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}


document.getJSON = function(url, onSuccess, onError) {
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      if (onSuccess) {
        onSuccess(JSON.parse(request.responseText));
      }
    } else {
      if (onError) {
        onError(request);
      }
    }
  };
  request.send();
}

document.ajax = function(method, url, data, onSuccess, onError) {
  var request = new XMLHttpRequest();
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  request.open(method, url, true);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      if (onSuccess) {
        onSuccess(request.responseText);
      }
    } else {
      if (onError) {
        onError(request);
      }
    }
  }
  request.send(data);
}