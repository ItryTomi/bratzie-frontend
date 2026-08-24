import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useBloquearScroll } from '../hooks/useBloquearScroll'
import './Header.css'

const LINKS = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/catalogo', label: 'Catálogo' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/contacto', label: 'Contacto' },
]

export default function Header() {
  const { cantidad, setAbierto } = useCart()
  const [menu, setMenu] = useState(false)
  useBloquearScroll(menu)

  return (
    <>
      <div className="topbar">
        <span>Envío gratis a todo el país · Prendas únicas, una sola por talle</span>
      </div>

      <header className="hd">
        <div className="wrap hd-in">
          <button className="hd-burger" onClick={() => setMenu(true)} aria-label="Abrir menú">
            <Menu size={24} />
          </button>

          <Link to="/" className="hd-logo">
            <span className="chrome-text">bratzie</span><span className="hd-logo-dot">.shop</span>
          </Link>

          <nav className="hd-nav" aria-label="Principal">
            {LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end}
                className={({ isActive }) => (isActive ? 'hd-link is-active' : 'hd-link')}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          <button className="hd-cart" onClick={() => setAbierto(true)} aria-label={`Carrito, ${cantidad} prendas`}>
            <ShoppingBag size={22} />
            {cantidad > 0 && <span className="hd-count">{cantidad}</span>}
          </button>
        </div>
      </header>

      {menu && (
        <div className="mob" role="dialog" aria-label="Menú">
          <button className="mob-close" onClick={() => setMenu(false)} aria-label="Cerrar menú">
            <X size={26} />
          </button>
          <nav className="mob-nav">
            {LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} onClick={() => setMenu(false)}>
                {l.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}
