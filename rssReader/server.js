var express = require("express");
var server = express();
var hostname = process.env.HOSTNAME || 'localhost';
var port = 1234;
var Client = require('node-rest-client').Client;
var client = new Client();
 

server.get("/makeHTTPReq", function (req, res) {
  var url = req.query.url;
  client.get(url, function (data, response) {
    // parsed response body as js object
    console.log(data);
    res.send(data);
  });
});

server.use(express.static(__dirname + '/public'));

console.log("Simple static server listening at http://" + hostname + ":" + port);
server.listen(port);
