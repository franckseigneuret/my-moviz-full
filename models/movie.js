const mongoose = require('mongoose');

var movieSchema = mongoose.Schema({
  name: String,
  img: String,
  date: Date,
});

module.exports = mongoose.model('movie', movieSchema);
