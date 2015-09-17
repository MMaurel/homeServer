var http = require('http');
var url = require('url');

function start(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log('Request received for [' + pathname + ']');
    route(handle, pathname, response, request);
  }

  http.createServer(onRequest).listen(8888);
  console.log('Starting server ...');
}

exports.start = start;