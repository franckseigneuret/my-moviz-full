import React from 'react';
import { Nav, NavItem, Button, UncontrolledPopover, PopoverBody, PopoverHeader, Media } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const WishlistMovie = ({ item, handleClickDeleteMovie }) => (
  <Media>
    <Media left className="mr-3">
      <Media object src={item.img} alt={item.name} />
    </Media>
    <Media body className="text-right">
      <span>{item.name}</span>
      <FontAwesomeIcon icon={faTrash} className="trash" onClick={() => handleClickDeleteMovie(item.name)} />
    </Media>
  </Media>
)

const NavBar = ({ moviesCount, wishlist, handleClickDeleteMovie }) => {

  const wishlistComponent = wishlist.map((item, i) => {
    return <WishlistMovie key={i} item={item} handleClickDeleteMovie={handleClickDeleteMovie} />
  })

  return (
    <Nav className="navBar">
      <NavItem>
        <img src="./img/logo.png" alt="" />
      </NavItem>
      <NavItem>
        Last release
      </NavItem>
      <NavItem>
        <Button id="PopoverClick" type="button">
          {moviesCount} film{moviesCount > 1 ? 's' : ''}
        </Button>
        <UncontrolledPopover trigger="click" placement="bottom" target="PopoverClick">
          <PopoverHeader>ma Wishlist</PopoverHeader>
          <PopoverBody className="wishListItems">
            {
              wishlistComponent.length > 0 ? wishlistComponent : <div>aucun film 🙁</div>
            }
          </PopoverBody>
        </UncontrolledPopover>

      </NavItem>
    </Nav>
  )
}

export default NavBar;
