var express = require("express");
var app = express();
var hostname = process.env.HOSTNAME || 'localhost';
var port = 1234;

app.get("/", function (req, res) {
    res.redirect("index.html")
});

app.use(express.static(__dirname + '/public'));

console.log("Simple static server listening at http://" + hostname + ":" + port);
app.listen(port);
