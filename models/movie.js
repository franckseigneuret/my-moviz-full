const mongoose = require('mongoose');

var movieSchema = mongoose.Schema({
  name: String,
  img: String,
  note: Number,
  vote: Number,
  vue: Number,
  desc: String,
});

module.exports = mongoose.model('movie', movieSchema);
