var http = require("http");
var url = require("url");
var querystring = require("querystring");
var fs = require("fs");
var path = require("path");
var mime = require("./mime").types;

function start(route, handle){
  function onRequest(request, response){
    var postData ="";
    request.setEncoding("utf8");
    var pathname = url.parse(request.url).pathname;
    var query = url.parse(request.url).query;
    var querys = querystring.parse(query)['username'];
    console.log("Request for "+ pathname +" received.");
    if (querys === undefined) {
      if (pathname === '/') pathname = '/SignUp.html';
      var realPath = "assets" + pathname;
      var ext = path.extname(realPath);
      ext = ext ? ext.slice(1) : 'unknown';
      fs.readFile(realPath, function (err, data) {
        if (err) {
          response.writeHead(404, {'Content-Type': mime['html']});
          fs.readFile("assets"+'/404.html', 'utf-8' ,function (err, data) {
            response.end(data);
          });
        } else {
          response.writeHead(200, {'Content-Type': mime[ext]});
          response.write(data);
          response.end();
        }
      });
    }


    request.addListener("data",function(postDataChunk){
      postData += postDataChunk;
      console.log("Received POST data chunk '"+
      postDataChunk +"'.");
      console.log(decodeURIComponent(postData)+".");
    });

    request.addListener("end",function(){
      route(handle, pathname, response, postData, querys);
    });

  }

  http.createServer(onRequest).listen(8000);
  console.log("Server has started.");
}

exports.start = start;