var fs = require('fs');
var AWS = require('aws-sdk');
AWS.config.loadFromPath('./credentials.json');
var s3 = new AWS.S3();


var url = require("url"),
	querystring = require("querystring");
var passport = require('passport');
var fs = require('fs');
var dbURL = 'mongodb://localhost:27017/test';


    var args = process.argv.slice(2);
    if (args[0].length > 0) {
        dbURL = 'mongodb://' + args[0] + ':27017/test';
    }     

var path = require('path'),
  express = require('express'),
  db = require('mongoskin').db(dbURL);


var mongoose = require('mongoose');
mongoose.connect(dbURL); // connect to our database

var app = express();
var secret = 'test' + new Date().getTime().toString()

var session = require('express-session');
app.use(require("cookie-parser")(secret));
var MongoStore = require('connect-mongo')(session);
app.use(session( {store: new MongoStore({
   url: dbURL,
   secret: secret
})}));
app.use(passport.initialize());
app.use(passport.session());
var flash = require('express-flash');
app.use( flash() );

var bodyParser = require("body-parser");
var methodOverride = require("method-override");

app.use(methodOverride());
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended:true
}));
require('./passport/config/passport')(passport); // pass passport for configuration
require('./passport/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport


app.get("/getUserImages", isLoggedIn, function(req,res){
    db.collection("images").find({userID:req.user.local.email}).sort({date:-1}).toArray(function(err, result) {
        res.send(result);
    });

})

app.get("/getImages", function(req,res){

})


app.post('/uploadBase64', function(req, res) {
  console.log(Object.keys(req.body));
  var intname = req.body.intname;
  console.log(intname);
  var s3Path = '/' + intname;
  var buf = new Buffer(req.body.data.replace(/^data:image\/\w+;base64,/, ""), 'base64');
  var params = {
      Bucket: 'bucket470570',
      ACL: 'public-read',
      Key: intname,
      Body: buf,
      ServerSideEncryption: 'AES256'
  };
  s3.putObject(params, function(err, data) {
      db.collection("images").insert({name: "Untitled", url: intname, userID:req.user.local.email, filter:"none", date: new Date().getTime()}, function(err, result) {
          res.end("success");
          console.log(err);
    });
  });
});



app.use(express.static(path.join(__dirname, 'public')));
app.listen(8080);

console.log("server running at http://localhost:8080")

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.send('noauth');
}

