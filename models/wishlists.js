const mongoose = require('mongoose');

var wishlistsSchema = mongoose.Schema({
  movieName: String,
  movieImg: String,
});

module.exports = mongoose.model('wishlists', wishlistsSchema);
