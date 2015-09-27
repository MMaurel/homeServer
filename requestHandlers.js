var querystring = require('querystring');
var fs = require('fs');
var formidable = require('formidable');
var getPixels = require('get-pixels');
var savePixels = require('save-pixels');
var PNG = require('pngjs').PNG;
var exec = require("child_process").exec;

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
  uploadRed(response, request);
}

function uploadRed(response, request) {
  console.log('UploadRed manager is called');

  exec('rm /tmp/*.png', function (error, stdout, stderr) {
    
  });

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
        response.writeHead(500, {'Content-Type': 'text/plain'});
        response.write(error + '\n');
        response.end();
        return;
      }

      var wstream = fs.createWriteStream('/tmp/coloredTest.png');

      toRed(pixels.data);
      savePixels(pixels, 'png').pipe(wstream).on('finish', function() {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write('Image received :<br/>');
        response.write('<img src="/showOld" /><br/><br/><br/>');
        response.write('Image converted to grayscale :<br/>');
        response.write('<img src="/showNew" />');
        response.end();
      });
    });
  });
}

function uploadGreen(response, request) {
  console.log('UploadGreen manager is called');

  exec('rm /tmp/*.png', function (error, stdout, stderr) {
    
  });

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
        response.writeHead(500, {'Content-Type': 'text/plain'});
        response.write(error + '\n');
        response.end();
        return;
      }

      var wstream = fs.createWriteStream('/tmp/coloredTest.png');

      toGreen(pixels.data);
      savePixels(pixels, 'png').pipe(wstream).on('finish', function() {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write('Image received :<br/>');
        response.write('<img src="/showOld" /><br/><br/><br/>');
        response.write('Image converted to grayscale :<br/>');
        response.write('<img src="/showNew" />');
        response.end();
      });
    });
  });
}

function uploadBlue(response, request) {
  console.log('UploadBlue manager is called');

  exec('rm /tmp/*.png', function (error, stdout, stderr) {
    
  });

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
        response.writeHead(500, {'Content-Type': 'text/plain'});
        response.write(error + '\n');
        response.end();
        return;
      }

      var wstream = fs.createWriteStream('/tmp/coloredTest.png');

      toBlue(pixels.data);
      savePixels(pixels, 'png').pipe(wstream).on('finish', function() {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write('Image received :<br/>');
        response.write('<img src="/showOld" /><br/><br/><br/>');
        response.write('Image converted to grayscale :<br/>');
        response.write('<img src="/showNew" />');
        response.end();
      });
    });
  });
}

function showOld(response) {
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

function showNew(response) {
  console.log('Show manager is called');
  fs.readFile('/tmp/coloredTest.png', 'binary', function(error, file) {
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

function grayscale(data) {
  for (var i = 0; i < data.length; i+=4) {
    var r = data[i];
    var g = data[i + 1];
    var b = data[i + 2];
    var grayscale = (0.2126 * r) + (0.7152 * g) + (0.0722 * b);
    
    data[i] = grayscale;
    data[i + 1] = grayscale;
    data[i + 2] = grayscale;
  }
}

function toRed(data) {
  for (var i = 0; i < data.length; i+=4) {
    var r = data[i];
    var g = data[i + 1];
    var b = data[i + 2];
    var a = data[i + 3];
    var grayscale = (0.2126 * r) + (0.7152 * g) + (0.0722 * b);
    var hsl = rgbToHsl(r, g, b);
    
    if ((hsl[0] < (345 / 360)) && (hsl[0] > (15 / 360))) {
      data[i] = grayscale;
      data[i + 1] = grayscale;
      data[i + 2] = grayscale;
    }
  }
}

function toGreen(data) {
  for (var i = 0; i < data.length; i+=4) {
    var r = data[i];
    var g = data[i + 1];
    var b = data[i + 2];
    var a = data[i + 3];
    var grayscale = (0.2126 * r) + (0.7152 * g) + (0.0722 * b);
    var hsl = rgbToHsl(r, g, b);
    
    if ((hsl[0] < (80 / 360)) || (hsl[0] > (160 / 360))) {
      data[i] = grayscale;
      data[i + 1] = grayscale;
      data[i + 2] = grayscale;
    }
  }
}

function toBlue(data) {
  for (var i = 0; i < data.length; i+=4) {
    var r = data[i];
    var g = data[i + 1];
    var b = data[i + 2];
    var a = data[i + 3];
    var grayscale = (0.2126 * r) + (0.7152 * g) + (0.0722 * b);
    var hsl = rgbToHsl(r, g, b);
    
    if ((hsl[0] < (180 / 360)) || (hsl[0] > (270 / 360))) {
      data[i] = grayscale;
      data[i + 1] = grayscale;
      data[i + 2] = grayscale;
    }
  }
}

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */
function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSL representation
 */
function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}



exports.start = start;
exports.upload = upload;
exports.uploadRed = uploadRed;
exports.uploadGreen = uploadGreen;
exports.uploadBlue = uploadBlue;
exports.showOld = showOld;
exports.showNew = showNew;