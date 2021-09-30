import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Products from './components/Products/Products'
import Category from './components/Category/Category'
import Footer from './components/Footer/Footer'
import Hero from './components/Hero/Hero'
import './App.css'
import { useEffect, useState } from 'react'
import Header from './components/Header/Header'
import Invest from './components/Invest/Invest'
import About from './components/About/About'
import Error from './components/Error/Error'

function App() {
  const [products, setProduts] = useState([])
  const [cardProducts, setCardProducts] = useState([])

  const [total, setTotal] = useState(0)

  const handleCardProducts = () => {
    return products.filter((products) => products.inCard)
  }

  useEffect(() => {
    const card = handleCardProducts()
    const total = handleTotal(card)
    setTotal(total)
    setCardProducts(card)
  }, [products])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:5000/products')
      const data = await res.json()
      setProduts(data)
      setRandomProducts(getRandomProducts(data))
    }
    fetchData()
  }, [])

  const handleAddToCard = (id) => {
    const updProducts = products.map((product) => {
      if (product.id === id) {
        const prod = { ...product, inCard: !product.inCard }
        updateData(id, prod)
        return prod
      }
      return product
    })
    setProduts(updProducts)
  }

  const updateData = async (id, product) => {
    await fetch(`http://localhost:5000/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(product),
      headers: {
        'Content-type': 'application/json',
      },
    })
  }

  const [navToggle, setNavToggle] = useState({
    'menu-btn': false,
    'cart-btn': false,
    'login-btn': false,
  })

  const handleToggle = (e) => {
    const currentBtn = e.target.id
    let newNavObj = {}
    if (navToggle[currentBtn]) {
      newNavObj = { ...navToggle, [currentBtn]: !navToggle[currentBtn] }
    } else {
      newNavObj = {
        'menu-btn': false,
        'cart-btn': false,
        'login-btn': false,
      }
      newNavObj = { ...newNavObj, [currentBtn]: true }
    }
    setNavToggle(newNavObj)
  }

  const handleTotal = (card) => {
    return card.reduce((total, product) => {
      return (total += product.price)
    }, 0)
  }

  const [search, setSearch] = useState('')
  const [filteredProducts, setFilteredProducts] = useState([])
  const [onSearch, setOnSearch] = useState(false)
  const handleSearch = (e) => {
    setSearch(e.target.value)
    setOnSearch(false)
    if (e.target.value === '') return
    setOnSearch(true)
    const key = Number(e.target.value)
    const filteredProducts = key
      ? searchByPrice(key)
      : searchByName(e.target.value)
    setFilteredProducts(filteredProducts)
  }

  // const searchById = (id) => {
  //   products.filter(product => product.id === id)
  // }

  const searchByPrice = (price) => {
    return products.filter((product) => product.price === price)
  }

  const searchByName = (name) => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(name)
    )
  }

  const [randomProducts, setRandomProducts] = useState([])

  const getRandomProducts = (data) => {
    let randProducts = []
    while (randProducts.length < 3) {
      const index = Math.floor(Math.random() * data.length)
      if (!randProducts.includes(data[index]))
        randProducts = [...randProducts, data[index]]
    }

    return randProducts
  }
  return (
    <Router>
      <div className='App'>
        <Header
          onToggle={handleToggle}
          onActive={navToggle}
          cardProducts={cardProducts}
          onAddToCard={handleAddToCard}
          total={total}
        />
        <Switch>
          <Route exact path='/'>
            <Hero />
            <Category products={randomProducts} onAddToCard={handleAddToCard} />
          </Route>
          <Route path='/products'>
            <Products
              products={onSearch ? filteredProducts : products}
              onAddToCard={handleAddToCard}
              onSearch={handleSearch}
              search={search}
            />
          </Route>
          <Route path='/invest'>
            <Invest />
          </Route>
          <Route path='/about'>
            <About />
          </Route>
          <Route path='*'>
            <Error />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  )
}

export default App
