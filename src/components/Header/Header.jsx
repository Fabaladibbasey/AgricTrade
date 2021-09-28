import { Link } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import './Header.css'

function Header({onToggle, onActive, products, onAddToCard, total}) {
  return (
    <header className='header'>
      <Link to='/' className='logo'>
        {' '}
        <i className='fab fa-pagelines'></i> AgricTech{' '}
      </Link>
      <Navbar onToggle = {onToggle} onActive={onActive}/>
      <ShoppingCard onActive={onActive} products={products} onAddToCard={onAddToCard} total={total}/>
    </header>
  )
}

export default Header

function ShoppingCard({onActive, products, onAddToCard, total}) {
 let classes = 'shopping-cart'
  return (
    <div className={onActive['cart-btn'] ? `${classes} active` : classes }>
     {products.map(product => product.inCard && <ShoppingProduct key={product.id} product={product} onAddToCard={onAddToCard}/>)}
      <div className='total'>total: D{total} </div>
      <a href='#' className='btn'>
        checkout
      </a>
    </div>
  )
}

function ShoppingProduct({product, onAddToCard}) {
 const {name, img, id, price} = product
  return (
    <div className='box'>
      <i className='fas fa-trash' onClick={()=>onAddToCard(id)}></i>
      <img src={img} alt={`This is an img of ${name}`} />
      <div className='content'>
        <h3>{name}</h3>
        <span className='price'>D{price} </span>
        <span className='quantity'>qty : 1</span>
      </div>
    </div>
  )
}
