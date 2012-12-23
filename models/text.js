var mongoose = require('mongoose')
  , db = mongoose.connection
  , mongoUri = process.env.MONGOHQ_URL || 'mongodb://localhost/wvhfood';

mongoose.connect(mongoUri);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log('Connected to mongo');
});

var textSchema = mongoose.Schema({
  from: String,
  body: String,
  dateSent: Date
});

var Text = mongoose.model('text', textSchema);

module.exports = Text;
