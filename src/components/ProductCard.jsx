import { Link } from 'react-router-dom'
import { Check, ShoppingBag } from 'lucide-react'
import { descuento, precioARS } from '../data/productos'
import { useCart } from '../context/CartContext'
import './ProductCard.css'

export default function ProductCard({ p }) {
  const { tiene, agregar } = useCart()
  const off = descuento(p)
  const enCarrito = tiene(p.slug)

  return (
    <article className="card">
      <Link to={`/producto/${p.slug}`} className="card-img" aria-label={p.nombre}>
        <img src={p.img} alt={p.nombre} loading="lazy" width="640" height="640" />
        <div className="card-tags">
          {off > 0 && <span className="badge badge-off">{off}% off</span>}
          <span className="badge badge-unica">Única</span>
        </div>
      </Link>

      <div className="card-body">
        <Link to={`/producto/${p.slug}`}>
          <h3 className="card-title">{p.nombre}</h3>
        </Link>

        <p className="card-meta">
          {p.talle ? `Talle ${p.talle}` : 'Talle según medidas'}
          {p.tiro && ` · Tiro ${p.tiro}`}
        </p>

        <div className="card-precio">
          <strong>{precioARS(p.precio)}</strong>
          {p.precioAnterior > p.precio && <s>{precioARS(p.precioAnterior)}</s>}
        </div>

        <button
          className={`btn btn-block ${enCarrito ? 'btn-ghost' : 'btn-primary'}`}
          onClick={() => !enCarrito && agregar(p.slug)}
          disabled={enCarrito}
        >
          {enCarrito ? <><Check size={17} /> En el carrito</> : <><ShoppingBag size={17} /> Agregar</>}
        </button>
      </div>
    </article>
  )
}
