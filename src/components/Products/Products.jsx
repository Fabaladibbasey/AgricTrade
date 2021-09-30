import './Products.css'
// import '../Category/Category.css'
import { ProdutCard } from '../Category/Category'

function Products({ products, onAddToCard, onSearch, search }) {
  return (
    <section className='products' id='products'>
      <div className="heading-div">
        <h1 className='heading' id='below-heading'>
          {' '}
          our <span>products</span>{' '}
        </h1>
        <div className='fas fa-search' id='search-btn'></div>
      </div>
      <SearchBar onSearch={onSearch} search={search}/>

      <div className='swiper product-slider'>
        {products.map((product) => {
          return (
            <ProdutCard
              key={product.id}
              product={product}
              onAddToCard={onAddToCard}
            />
          )
        })}
      </div>
    </section>
  )
}

export default Products

function SearchBar({onSearch, search}) {
  return (
    <form action='' className='search-form active'>
      <input type='search' id='search-box' value={search} placeholder='search here...' onChange={onSearch}/>
      <label htmlFor='search-box' className='fas fa-search'></label>
    </form>
  )
}
