var express = require('express');
var request = require("sync-request");
var router = express.Router();


const movieModel = require('../models/movie')
const wishlistModel = require('../models/wishlists')

const api_key = '815db103a78f0082effbdd1f7afb44b6'
const language = 'fr-FR'
const sort = 'popularity.desc'
const page = 1


/* GET home page. */
router.get('/', function (req, res, next) {
  console.log('where : GET /')
  res.render('index', { title: 'Express' });
});

router.get('/new-movies', function (req, res, next) {
  console.log('where : GET /new-movies')
  const moviesURL = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=${language}&sort_by=${sort}&include_adult=false&include_video=false&page=${page}`
  const result = request("GET", moviesURL)
  const resultJSON = JSON.parse(result.body)
  
  res.json(resultJSON.results);
});

// ajoute un film en DB
router.post('/wishlist-movie', async function (req, res, next) {
  console.log('where : POST /wishlist-movie')
  const addMovieWishlist = new movieModel({
    name: req.body.name,
    img: req.body.img,
    date: new Date(),
  });
  
  const movieAdded = await addMovieWishlist.save()
  
  const message = movieAdded.name === req.body.name ? true : false
  console.log('message = ', message)
  res.json({ message });
});

// supprime un film en DB (syntaxe 1)
router.delete('/wishlist-movie', async function (req, res, next) {
  console.log('where : DELETE /wishlist-movie')
  const deleteMovieWishlist = await movieModel.deleteOne({
    name: req.body.name,
  });
  
  const message = deleteMovieWishlist.deletedCount === 1 ? true : false
  res.json({ message });
})

// supprime un film en DB (syntaxe 2)
// deleteMany utilisé plutôt que deleteOne pour des raisons de DEV
router.delete('/wishlist-movie/:name', async function (req, res, next) {
  console.log('where : DELETE /wishlist-movie:name')
  const deleteMovieWishlist = await movieModel.deleteMany({
    name: req.params.name,
  });
  
  const message = deleteMovieWishlist.deletedCount === 1 ? true : false
  res.json({ message });
})

// retourne les films de la DB
router.get('/wishlist-movie', async function (req, res, next) {
  console.log('where : GET /wishlist-movie')

  var movies = await movieModel.find()

  res.json({ movies });
})

module.exports = router;
