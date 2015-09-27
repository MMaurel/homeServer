var server = require('./server');
var router = require('./router');
var requestHandlers = require('./requestHandlers');

var handle = {}
handle['/'] = requestHandlers.start;
handle['/start'] = requestHandlers.start;
handle['/upload'] = requestHandlers.upload;
handle['/uploadRed'] = requestHandlers.uploadRed;
handle['/uploadGreen'] = requestHandlers.uploadGreen;
handle['/uploadBlue'] = requestHandlers.uploadBlue;
handle['/showOld'] = requestHandlers.showOld;
handle['/showNew'] = requestHandlers.showNew;

server.start(router.route, handle);