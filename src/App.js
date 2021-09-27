import Category from './components/Category'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Products from './components/Products/index'
// import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero/>
      <Category/>
      <Products />
      <Footer/>

    </div>
  );
}

export default App;
