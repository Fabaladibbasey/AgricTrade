import { BrowserRouter as Router, Route } from 'react-router-dom'
import Category from './components/Category/Category'
import Footer from './components/Footer/Footer'
import Hero from './components/Hero/Hero'
import Products from './components/Products/index'
import './App.css'
import { useEffect, useState } from 'react'
import Header from './components/Header/Header'

function App() {
  const [products, setProduts] = useState([
    {
      id: 1,
      img: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      name: 'Carrot',
      price: 70,
      inCard: true,
    },
    {
      id: 2,
      img: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      name: 'Carrot',
      price: 60,
      inCard: false,
    },
    {
      id: 3,
      img: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      name: 'Carrot',
      price: 20,
      inCard: true,
    },
    {
      id: 4,
      img: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      name: 'Carrot',
      price: 60,
      inCard: false,
    },
  ])

  useEffect(() => {
    handleTotal()
  }, [])

  const handleAddToCard = (id) => {
    const updProducts = products.map((product) => {
      if (product.id === id) {
        return { ...product, inCard: !product.inCard }
      }
      return product
    })
    setProduts(updProducts)
    handleTotal()
  }
  const [navToggle, setNavToggle] = useState({
    'menu-btn': false,
    'cart-btn': false,
    'login-btn': false,
  })

  const handleToggle = (e) => {
    const currentBtn = e.target.id
    if (navToggle[currentBtn]) {
      setNavToggle({
        'menu-btn': false,
        'cart-btn': false,
        'login-btn': false,
      })
      console.log('in if', navToggle)
      return
    }
    setNavToggle({
      'menu-btn': false,
      'cart-btn': false,
      'login-btn': false,
    })
    setNavToggle({ ...navToggle, [currentBtn]: true })
    // console.log(navToggle)
  }
  const [total, setTotal] = useState(0)

  const handleTotal = () => {
    let total = 0
    products.forEach((product) => {})
  }

  return (
    <Router>
      <div className='App'>
        <Header
          onToggle={handleToggle}
          onActive={navToggle}
          products={products}
          onAddToCard={handleAddToCard}
          total={total}
        />
        <Hero />
        <Category products={products} onAddToCard={handleAddToCard} />
        {/* <Products /> */}
        <Footer />
      </div>
    </Router>
  )
}

export default App
