var mongoose = require('mongoose')
  , db = mongoose.connection
  , mongoUri = process.env.MONGOHQ_URL || 'mongodb://localhost/wvhfood';

mongoose.connect(mongoUri);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log('Connected to mongo');
});

/* Represents a text message (SMS) sent to the app */
var textSchema = mongoose.Schema({
    from: String          // Sender's phone number
  , body: String          // The text message's content
  , smsSid: String        // The Twilio SmsSid of the text
  , dateReceived: Date    // When this text was received
});

var Text = mongoose.model('text', textSchema);

module.exports = Text;
