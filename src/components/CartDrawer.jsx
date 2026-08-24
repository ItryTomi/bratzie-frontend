import { Link } from 'react-router-dom'
import { X, Trash2, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useBloquearScroll } from '../hooks/useBloquearScroll'
import { precioARS } from '../data/productos'
import './CartDrawer.css'

export default function CartDrawer() {
  const { items, total, ahorro, abierto, setAbierto, quitar } = useCart()
  useBloquearScroll(abierto)
  if (!abierto) return null

  return (
    <>
      <div className="cd-backdrop" onClick={() => setAbierto(false)} />
      <aside className="cd" role="dialog" aria-label="Carrito de compras">
        <header className="cd-head">
          <h3>Tu carrito ({items.length})</h3>
          <button onClick={() => setAbierto(false)} aria-label="Cerrar carrito"><X size={22} /></button>
        </header>

        {items.length === 0 ? (
          <div className="cd-vacio">
            <ShoppingBag size={44} strokeWidth={1.2} />
            <p>Todavía no elegiste nada.</p>
            <Link to="/catalogo" className="btn btn-primary" onClick={() => setAbierto(false)}>
              Ver el catálogo
            </Link>
          </div>
        ) : (
          <>
            <ul className="cd-list">
              {items.map((p) => (
                <li key={p.slug} className="cd-item">
                  <img src={p.img} alt="" width="72" height="72" />
                  <div className="cd-item-info">
                    <Link to={`/producto/${p.slug}`} onClick={() => setAbierto(false)}>{p.nombre}</Link>
                    <span>{p.talle ? `Talle ${p.talle}` : 'Talle según medidas'}</span>
                    <strong>{precioARS(p.precio)}</strong>
                  </div>
                  <button onClick={() => quitar(p.slug)} aria-label={`Quitar ${p.nombre}`}>
                    <Trash2 size={17} />
                  </button>
                </li>
              ))}
            </ul>

            <footer className="cd-foot">
              {ahorro > 0 && (
                <p className="cd-ahorro">Estás ahorrando {precioARS(ahorro)}</p>
              )}
              <div className="cd-total">
                <span>Total</span>
                <strong>{precioARS(total)}</strong>
              </div>
              <Link to="/checkout" className="btn btn-primary btn-block" onClick={() => setAbierto(false)}>
                Finalizar compra
              </Link>
              <button className="cd-seguir" onClick={() => setAbierto(false)}>Seguir mirando</button>
            </footer>
          </>
        )}
      </aside>
    </>
  )
}
