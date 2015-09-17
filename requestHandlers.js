var querystring = require('querystring');
var fs = require('fs');
var formidable = require('formidable');
var getPixels = require('get-pixels');
var savePixels = require('save-pixels');

function start(response) {
  console.log('Start manager is called');

  var body = fs.readFile('./form.html', function (error, html) {
    if (error) {
      response.writeHead(500, {'Content-Type': 'text/plain'});
      response.write(error + '\n');
      response.end();
    } else {
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.write(html);
      response.end();
    }
  });
}

function upload(response, request) {
  console.log('Upload manager is called');

  var form = new formidable.IncomingForm();
  console.log('Processing received elements ...');
  form.parse(request, function(error, fields, files) {
    console.log('Processing completed !');

    /* En cas d'erreur sous Windows :
       tentative d'écrasement d'un fichier existant */
    fs.rename(files.upload.path, '/tmp/test.png', function(error) {
      if (error) {
        fs.unlink('/tmp/test.png');
        fs.rename(files.upload.path, '/tmp/test.png');
      }
    });

    getPixels('/tmp/test.png', function(error, pixels) {
      if (error) {
        console.log('Bad image path');
        return;
      }
      var res = '';

      console.log('=========================================');
      
      for (var i = 0; i < 200; i++) {
        res += '[' + pixels.data[i] + ']';
      }

      console.log(res);
      console.log('=========================================');
      console.log(pixels.shape.slice());
      console.log('=========================================');
    });

    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write('Image received :<br/>');
    response.write('<img src="/show" />');
    response.end();
  });
}

function show(response) {
  console.log('Show manager is called');
  fs.readFile('/tmp/test.png', 'binary', function(error, file) {
    if (error) {
      response.writeHead(500, {'Content-Type': 'text/plain'});
      response.write(error + '\n');
      response.end();
    } else {
      response.writeHead(200, {'Content-Type': 'image/png'});
      response.write(file, 'binary');
      response.end();
    }
  });
}

exports.start = start;
exports.upload = upload;
exports.show = show;