var express = require('express');
var request = require("sync-request");
var router = express.Router();


const api_key = '815db103a78f0082effbdd1f7afb44b6'
const language = 'fr-FR'
const sort = 'popularity.desc'
const page = 1

const moviesURL = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=${language}&sort_by=${sort}&include_adult=false&include_video=false&page=${page}`

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/new-movies', function(req, res, next) {

  const result = request("GET", moviesURL)
  const resultJSON = JSON.parse(result.body)
  res.json(resultJSON);
});

module.exports = router;

