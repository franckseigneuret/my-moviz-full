import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const Average = ({ note }) => {
  // console.log(note)
  const stars = []
  for (let i = 0; i < 10; i++) {
    let style = 'yellow'
    if (i >= note) {
      style = ''
    }

    stars.push(<FontAwesomeIcon key={i} icon={faStar} className={style} />)
  }

  return stars
}

export default Average