var express = require('express');
var app = express();
var mongoose = require('mongoose');

app.use(express.bodyParser());

// DB Crap
var db = mongoose.connection;
var mongoUri = process.env.MONGOHQ_URL || 'mongodb://localhost/wvhfood';
mongoose.connect(mongoUri);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log('Connected! :D');
});

var textSchema = mongoose.Schema({
  from: String,
  body: String,
  dateSent: Date
});
var Text = mongoose.model('text', textSchema);

// Show the latest text
app.get('/', function(req, res) {
  var text = Text.find(function(err, texts) {
    if (err) console.log(err);
    res.send(texts);
  });
});

// Create a new Text
app.post('/texts', function(req, res) {
  var text = new Text({ 
    from     : req.body.From,
    body     : req.body.Body,
    dateSent : new Date()
  });

  text.save(function (err, text) {
    if (err) console.log(err);
    console.log(text);
  });

  res.send('<?xml version="1.0" encoding="UTF-8"?>');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});
