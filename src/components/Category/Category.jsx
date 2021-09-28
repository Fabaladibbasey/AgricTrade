import React from 'react'
import './Category.css'
const Category = ({products, onAddToCard}) => {
  return (
    <section className='products' id='products'>
      <h1 className='heading'>
        {' '}
        our <span>products</span>{' '}
      </h1>

      <div className='swiper product-slider'>
      {products.map(product => {
        return <ProdutCard key={product.id} product={product} onAddToCard={onAddToCard}/>
      })}
      </div>
    </section>
  )
}

export default Category

function ProdutCard({product, onAddToCard}) {
  const {name, img, id, price, inCard} = product
  return (
    <div className='swiper-slide box'>
      <img
        src={img}
        alt={`This is an imgage of ${name}`}
      />
      <h3>{name}</h3>
      <div className='price'> Dalasis {price} </div>
      <button className='btn' onClick={()=> onAddToCard(id)}>
        {!inCard ? 'add to cart' : 'remove from card'}
      </button>
    </div>
  )
}