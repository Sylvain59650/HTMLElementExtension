/* global isDef */

document.ready = function(fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}


document.getJSON = function(url, onSuccess, onError, options) {
  var request = new XMLHttpRequest();
  if (isDef(options)) {
    if (options.forceReload) {
      var rnd = Math.random();
      url += (url.indexOf("?") === -1) ? "?" : "&";
      url += "___t=" + rnd;
    }
  }
  request.open("GET", url, true);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      if (onSuccess) {
        var result = "";
        if (request.status === 200) {
          result = JSON.parse(request.responseText);
        }
        onSuccess(result);

      }
    } else {
      console.error("ajax error", request);
      if (onError) {
        onError(request);
      }
    }
  };
  request.send();
}

document.ajax = function(method, url, data, onSuccess, onError) {
  var request = new XMLHttpRequest();
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
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


document.getScripts = function(arrScriptsUrl) {
  for (var url of arrScriptsUrl) {
    document.afterBegin(newElement("script", { src: url }));
  }
}

document.getStyles = function(arrStylessUrl, media = "all") {
  for (var url of arrStylessUrl) {
    document.afterBegin(newElement("link", { rel: "stylesheet", type: "text/css", href: url, media: media }));
  }
}