var mongoose = require('mongoose')
  , Text = require('../models/text');

/*
 * GET home page.
 */
exports.index = function(req, res){
  var texts = Text.find(function(err, data) {
    if (err) console.log(err);
    res.render('index', { title: "WVHFood", texts: data });
  });
};


/*
 * POST create text
 */
exports.create = function(req, res) {
  var text = new Text({ 
    from: req.body.From,
    body: req.body.Body,
    dateSent: new Date()
  });

  text.save(function (err, text) {
    if (err) console.log(err);
    console.log(text);
    res.send('<?xml version="1.0" encoding="UTF-8"?>\n<Response>\n</Response>');
  });
};
