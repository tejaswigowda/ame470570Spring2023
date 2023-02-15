var mongo = require('mongoskin');
var db = mongo.db("mongodb://3.101.191.42:27017/testdb");

/*
db.collection('user').find().toArray(function(err, result) {
  console.log(result);
});
*/

var express = require("express");
var server = express();
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var methodOverride = require('method-override');
var hostname = process.env.HOSTNAME || 'localhost';
var port = 1234;



server.get("/add", function (req, res) {
  console.log(req.query);
  req.query.op = "add";
  req.query.time = new Date().getTime();
  db.collection("data").insert(req.query, function(err, result) {
    var a = parseFloat(req.query.a);
    var b = parseFloat(req.query.b);
    res.send((a+b).toString()); // send response body
  });
});

server.get("/sub", function (req, res) {
  console.log(req.query);
  req.query.op = "sub";
  req.query.time = new Date().getTime();
  db.collection("data").insert(req.query, function(err, result) {
    var a = parseFloat(req.query.a);
    var b = parseFloat(req.query.b);
    res.send((a-b).toString()); // send response body
  });
});

server.get("/mul", function (req, res) {
  console.log(req.query);
  req.query.op = "mul";
  req.query.time = new Date().getTime();
  db.collection("data").insert(req.query, function(err, result) {
    var a = parseFloat(req.query.a);
    var b = parseFloat(req.query.b);
    res.send((a*b).toString()); // send response body

  });
});

server.get("/div", function (req, res) {
  console.log(req.query);
  req.query.op = "div";
  req.query.time = new Date().getTime();
  db.collection("data").insert(req.query, function(err, result) {
    var a = parseFloat(req.query.a);
    var b = parseFloat(req.query.b);
    res.send((a/b).toString()); // send response body
  });
});

server.get("/mod", function (req, res) {
  console.log(req.query);
  req.query.op = "mod";
  req.query.time = new Date().getTime();
  db.collection("data").insert(req.query, function(err, result) {
    var a = parseFloat(req.query.a);
    var b = parseFloat(req.query.b);
    res.send((a%b).toString()); // send response body
  });
});


server.get("/pow", function (req, res) {
  console.log(req.query);
  req.query.op = "pow";
  req.query.time = new Date().getTime();
  db.collection("data").insert(req.query, function(err, result) {
    var a = parseFloat(req.query.a);
    var b = parseFloat(req.query.b);
    res.send((a**b).toString()); // send response body
  });
});


server.get("/history", function (req, res) {
  db.collection("data").find().sort({time:-1}).toArray(function(err, result) {
    res.send(result);
  });
});

server.get("/delete", function (req, res) {
  var id = req.query.id;
  console.log(typeof id, id)
  db.collection("data").remove({_id: mongo.helper.toObjectID(id)}, function(err, result) {
    console.log(err);
    res.send("Deleted");
  });
});

server.use(methodOverride());
server.use(bodyParser());
server.use(errorHandler());
server.use(express.static(__dirname + '/public'));

console.log("Simple static server listening at http://" + hostname + ":" + port);
server.listen(port);
