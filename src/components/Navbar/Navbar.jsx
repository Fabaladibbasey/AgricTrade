import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = ({onToggle, onActive, numItems}) => {
  let classes = 'navbar';
  return (
    <>
      <nav className={onActive['menu-btn'] ? `${classes} active` : classes}  >
        <Link to='/' className="a">Home</Link>
        <Link to='/products' className="a">Products</Link>
        <Link to='/invest' className="a">Invest</Link>
        <Link to='/about' className="a">About</Link>
      </nav>
      
      <div className='icons'>
        <div className='fas fa-bars' id='menu-btn' onClick={onToggle}></div>
        <div className='fas fa-shopping-cart' id='cart-btn' onClick={onToggle}>
          <span id="count-items">{numItems}</span>
        </div>
        <div className='fas fa-user' id='login-btn' onClick={onToggle}></div>
      </div>
    </>
  )
}

export default Navbar
