import React, { useState } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, ButtonGroup, Button, Badge } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faVideo } from '@fortawesome/free-solid-svg-icons'

import MyAdvice from './MyAdvice'
import Average from './Average'

const Movie = (props) => {
  const {
    name,
    desc,
    img,
    note,
    vote,
    vue,
  } = props.datas

  const {
    handleCountMovie,
    isWished,
  } = props

  let haveVote = false
  const [watchMovie, setWatchMovie] = useState(false)
  const [countWatchMovie, setCountWatchMovie] = useState(vue)
  const [myRatingMovie, setMyRatingMovie] = useState(0)
  const [nbVote, setNbVote] = useState(vote)

  const wishClass = isWished ? 'wish' : ''
  const watchClass = watchMovie ? 'have-seen' : ''

  const handleWatchClick = () => {
    setWatchMovie(!watchMovie)
    const toggle = watchMovie ? -1 : 1
    setCountWatchMovie(countWatchMovie + toggle)
  }

  const setMyRating = (rating) => {
    if (rating < 0) {
      rating = 0
    }
    if (rating > 10) {
      rating = 10
    }
    setMyRatingMovie(rating)

    haveVote = rating > 0 ? true : false
    if(haveVote && nbVote === vote) {
      setNbVote(vote + 1)
    } else if(!haveVote) {
      setNbVote(vote)
    }
  }

  const averageCalcul = () => {
    const realNote = (note * vote + myRatingMovie) / nbVote
    const averageNote = Math.round(realNote)
    return averageNote
  }

  const starClick = (item) => {
    setMyRating(item)
  }

  return (
    <div className="col-12 col-lg-6 col-xl-4 movie-card">
      <Card>
        <CardImg top width="100%" src={img} alt="Card image cap" />
        <CardBody>
          <div>
            Wish{' '}
            <FontAwesomeIcon icon={faHeart}
              className={wishClass}
              style={{ cursor: 'pointer' }}
              onClick={() => handleCountMovie(!isWished, name, img)} />
          </div>

          <div>
            Nombre de vue
            {' '}
            <FontAwesomeIcon icon={faVideo}
              className={watchClass}
              onClick={() => handleWatchClick()} />
            {' '}
            <Badge>{countWatchMovie}</Badge>
          </div>

          <div>
            Mon avis
            <MyAdvice myRatingMovie={myRatingMovie} starClick={starClick} />

            <ButtonGroup size="sm">
              <Button onClick={() => setMyRating(myRatingMovie - 1)}>-</Button>
              <Button onClick={() => setMyRating(myRatingMovie + 1)}>+</Button>
            </ButtonGroup>
          </div>
          <div>
            Moyenne <Average note={averageCalcul()} /> ({nbVote} votes)
          </div>
          <CardTitle tag="h5">{name}</CardTitle>
          <CardText>{desc}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

export default Movie;
