import { useEffect } from 'react'
import { BrowserRouter, HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import { CartProvider } from './context/CartContext'
import Home from './pages/Home'
import Catalogo from './pages/Catalogo'
import Producto from './pages/Producto'
import Checkout from './pages/Checkout'
import {
  Nosotros, Contacto, GuiaTalles, Envios, Arrepentimiento, Gracias, NoEncontrado,
} from './pages/Institucionales'

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

// El build de demo (un solo archivo, sin servidor) necesita rutas por hash.
const Router = import.meta.env.VITE_HASH_ROUTER ? HashRouter : BrowserRouter

export default function App() {
  return (
    <Router>
      <CartProvider>
        <ScrollTop />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/producto/:slug" element={<Producto />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/gracias" element={<Gracias />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/guia-de-talles" element={<GuiaTalles />} />
            <Route path="/envios" element={<Envios />} />
            <Route path="/arrepentimiento" element={<Arrepentimiento />} />
            <Route path="*" element={<NoEncontrado />} />
          </Routes>
        </main>
        <Footer />
        <CartDrawer />
      </CartProvider>
    </Router>
  )
}
