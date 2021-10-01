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
  const [products, setProducts] = useState([])
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
      //url json-server
      // const url = 'http://localhost:5000/products';
      //firebase url
      const url =
        'https://agrictech-997c8-default-rtdb.firebaseio.com/products.json'
      const res = await fetch(url)
      const data = await res.json()
      let newData = []
      for (let key in data) {
        newData.push(data[key])
      }
      setProducts(newData)
      setRandomProducts(getRandomProducts(newData))
    }
    fetchData()
  }, [])

  const handleAddToCard = (id) => {
    const updProducts = products.map((product) => {
      if (product.id === id) {
        const prod = { ...product, inCard: !product.inCard }
        // updateData(id, prod)
        if (filteredProducts.includes(product)) {
          updateFilteredProduct(id, prod)
        }
        if (randomProducts.includes(product)) {
          updateRandomProducts(id, prod)
        }
        return prod
      }
      return product
    })
    setProducts(updProducts)
  }

  const updateFilteredProduct = (id, updPro) => {
    const newFilteredProducts = filteredProducts.map((product) => {
      if (product.id === id) {
        return updPro
      }
      return product
    })
    setFilteredProducts(newFilteredProducts)
  }

  const updateRandomProducts = (id, updPro) => {
    const newRandomProducts = randomProducts.map((product) => {
      if (product.id === id) {
        return updPro
      }
      return product
    })
    setRandomProducts(newRandomProducts)
  }

  //uncomment this function call in handleAddToCard function when dealing with json-server

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
    let currentBtn = e.target.id
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

  useEffect(() => {
    window.addEventListener('scroll', handleToggle)
    // window.addEventListener('click', handleToggle)
    return () => {
      window.removeEventListener('scroll', handleToggle)
      window.removeEventListener('click', handleToggle)
    }
  }, [])

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
      product.name.toLowerCase().includes(name.toLowerCase())
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
