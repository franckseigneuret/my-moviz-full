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
    const loadData = async () => {
      var rawResponse = await fetch('/wishlist-movie');
      var response = await rawResponse.json();
      setMovieList(response.movies)
    }
    loadData()
  }, [])

  const checkMovieWished = (isWished, name, img) => {
    if (isWished && wishlist.findIndex(item => item.name === name) < 0) { // si on LIKE un film et que wishList ne le contient pas 
      setWishList([...wishlist, { name: name, img: img }])          // on AJOUTE ce film dans la wishList
    } else if (!isWished && wishlist.findIndex(item => item.name === name) >= 0) {   // si on UN-like un film et que wishList le contient 
      setWishList(wishlist.filter(item => item.name !== name)) // on SUPPRIME ce film dans la wishList
    }
  }

  // Suppression film de la wishList au clic poubelle
  const handleClickDeleteMovie = (name) => {
    setWishList(wishlist.filter(item => item.name !== name))
  }

  const moviesComponent = movieList.map((movie, i) => {
    const isWished = wishlist.findIndex(item => item.name === movie.name) >= 0 ? true : false
    return <Movie key={i} isWished={isWished} datas={movie} handleCountMovie={checkMovieWished} />
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
