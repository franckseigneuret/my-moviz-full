import React, { useState, useEffect } from 'react';
import { Container, Row } from 'reactstrap'
import './App.css'

import Movie from './components/Movie'
import NavBar from './components/NavBar'

// import moviesDatas from './moviesDatas'

const App = (props) => {
  const [wishlist, setWishList] = useState([]) // wishList = tableau de noms de film
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    // Au chargement de la page
    // fetch de new-movies qui fait une request de l'API themoviedb
    const loadData = async () => {
      var rawResponse = await fetch('/new-movies');
      var response = await rawResponse.json();

      let formatResponse = []
      response.forEach(element => {
        let desc = element.overview.length > 80 ? element.overview.slice(0, 80) + '...' : element.overview
        let img = element.backdrop_path.length > 0 ? 'https://image.tmdb.org/t/p/w500/' + element.backdrop_path : '/generique.jpg'
          formatResponse.push({
            name: element.title,
            desc,
            img,
            note: element.popularity,
            vote: element.vote_count,
            vue: 0,
          })
      });
      setMovieList(formatResponse)
    }
    loadData()
  }, [])

  const handleAddMovieToWishlist = async (isWished, name, img) => {
    // si on LIKE un film et que wishList ne le contient pas 
    if (isWished && wishlist.findIndex(item => item.name === name) < 0) {
      // on AJOUTE ce film dans la wishList
      setWishList([...wishlist, { name: name, img: img }])
      // et 
      // on fetch pour l'enregistrement en DB
      await fetch('/wishlist-movie', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `name=${name}&img=${img}`
      })
    }

    // si on UN-like un film et que wishList le contient 
    else if (!isWished && wishlist.findIndex(item => item.name === name) >= 0) {
      // on SUPPRIME ce film dans la wishList
      setWishList(wishlist.filter(item => item.name !== name))
    }
  }

  // Suppression film de la wishList au clic poubelle
  const handleClickDeleteMovie = (name) => {
    setWishList(wishlist.filter(item => item.name !== name))
  }

  const moviesComponent = movieList.map((movie, i) => {
    const isWished = wishlist.findIndex(item => item.name === movie.name) >= 0 ? true : false
    return <Movie key={i} isWished={isWished} datas={movie} handleCountMovie={handleAddMovieToWishlist} />
  })

  return (
    <Container>
      <Row className="py-3">
        <NavBar moviesCount={wishlist.length} wishlist={wishlist} handleClickDeleteMovie={handleClickDeleteMovie} />
      </Row>
      <Row>
        {moviesComponent}
      </Row>
    </Container>
  );
}

export default App;
