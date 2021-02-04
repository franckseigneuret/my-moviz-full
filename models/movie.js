const mongoose = require('mongoose');

var movieSchema = mongoose.Schema({
  name: String,
  note: String,
  vote: String,
  vue: String,
  description: String,
  img: String,
});

module.exports = mongoose.model('movie', movieSchema);
