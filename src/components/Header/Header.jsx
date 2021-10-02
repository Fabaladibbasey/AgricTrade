import { Link } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import './Header.css'

function Header({onToggle, onActive, cardProducts, onAddToCard, total, numItems}) {
  return (
    <header className='header' id="home">
      <Link to='/' className='logo'>
        {' '}
        <i className='fab fa-pagelines'></i> AgricTech{' '}
      </Link>
      <Navbar onToggle = {onToggle} onActive={onActive} numItems={numItems}/>
      {/* <div className="wave">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
    </svg>
</div> */}
{/* <div class="custom-shape-divider-top-1633216933">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
    </svg>
</div> */}
      <ShoppingCard onActive={onActive} cardProducts={cardProducts} onAddToCard={onAddToCard} total={total}/>
    </header>
  )
}

export default Header

function ShoppingCard({onActive, cardProducts, onAddToCard, total}) {
 let classes = 'shopping-cart'
  return (
    <div className={onActive['cart-btn'] ? `${classes} active` : classes }>
     {cardProducts.map(product => <ShoppingProduct key={product.id} product={product} onAddToCard={onAddToCard}/>)}
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
