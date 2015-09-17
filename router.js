function route(handle, pathname, response, request) {
  console.log('Processing URL [' + pathname + '] ...');
  if (typeof handle[pathname] === 'function') {
    handle[pathname](response, request);
  } else {
    console.log('No manager  associated to [' + pathname + ']');
    response.writeHead(404, {'Content-Type': 'text/html'});
    response.write('404 not found !');
    response.end();
  }
}

exports.route = route;