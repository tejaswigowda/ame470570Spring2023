var MS = require('mongoskin');
var db = MS.db("mongodb://3.101.54.125:27017/rssReader")   // connect to the rssReader database 
var express = require("express");
var server = express();
var hostname = process.env.HOSTNAME || 'localhost';
var port = 1234;
var Client = require('node-rest-client').Client;
var client = new Client();
 

server.get("/editFeed", function (req, res) {
    var data = req.query;
    var id = data.id;
    console.log(data, id);
    db.collection('feeds').update({ _id: MS.helper.toObjectID(id) }, { $set: { name: data.name} }, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log('updated:', result.length, result);
            res.send(result);
        }
    });
});

server.get("/getFeeds", function (req, res) {
    db.collection('feeds').find().toArray(function (err, result) {
        if (err) {
            console.log(err);
        } else if (result.length) {
            console.log('Found:', result);
            res.send(result);
        } else {
            console.log('No document(s) found with defined "find" criteria!');
        }
    });
});

server.get("/addFeed", function (req, res) {
    var data = req.query;
    data.time = new Date().getTime();
    data.name = "Untitled";
    db.collection('feeds').insert(data, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log('Inserted %d documents into the "feeds" collection. The documents inserted with "_id" are:', result.length, result);
            res.send(result);
        }
    });
});

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
