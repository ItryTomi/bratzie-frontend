import { Link, useParams } from 'react-router-dom'
import { Check, ShoppingBag, Truck, CreditCard, MessageCircle, ChevronRight, Ruler } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { getProducto, productos, descuento, precioARS, CATEGORIAS } from '../data/productos'
import { useCart } from '../context/CartContext'
import './Producto.css'

const WSP = '5493624960582'

export default function Producto() {
  const { slug } = useParams()
  const p = getProducto(slug)
  const { tiene, agregar } = useCart()

  if (!p) {
    return (
      <div className="wrap pr-404">
        <h1>No encontramos esa prenda</h1>
        <p>Puede que ya se haya vendido — acá cada pieza es única.</p>
        <Link to="/catalogo" className="btn btn-primary">Ver el catálogo</Link>
      </div>
    )
  }

  const off = descuento(p)
  const enCarrito = tiene(p.slug)
  const cuota = Math.round(p.precio / 6)
  const relacionados = productos.filter((r) => r.categoria === p.categoria && r.slug !== p.slug).slice(0, 4)

  return (
    <div className="wrap pr">
      <nav className="pr-crumbs" aria-label="Miga de pan">
        <Link to="/">Inicio</Link> <ChevronRight size={14} />
        <Link to={`/catalogo?categoria=${p.categoria}`}>{CATEGORIAS[p.categoria]}</Link> <ChevronRight size={14} />
        <span>{p.nombre}</span>
      </nav>

      <div className="pr-grid">
        <div className="pr-media">
          <img src={p.img} alt={p.nombre} width="640" height="640" />
          {off > 0 && <span className="badge badge-off pr-off">{off}% off</span>}
        </div>

        <div className="pr-info">
          <span className="badge badge-unica">Pieza única · queda 1</span>
          <h1>{p.nombre}</h1>

          <div className="pr-precio">
            <strong>{precioARS(p.precio)}</strong>
            {p.precioAnterior > p.precio && <s>{precioARS(p.precioAnterior)}</s>}
          </div>
          <p className="pr-cuotas">6 cuotas sin interés de {precioARS(cuota)}</p>

          <p className="pr-desc">{p.descripcion}</p>

          <dl className="pr-specs">
            <div><dt>Talle</dt><dd>{p.talle ?? 'Según medidas'}</dd></div>
            {p.tiro && <div><dt>Tiro</dt><dd>{p.tiro}</dd></div>}
            {p.corte && <div><dt>Corte</dt><dd>{p.corte}</dd></div>}
            <div><dt>Stock</dt><dd>1 unidad</dd></div>
          </dl>

          {/* Medidas reales — antes iban sueltas en la descripción */}
          {p.medidas ? (
            <section className="pr-medidas">
              <h2><Ruler size={17} /> Medidas de esta prenda</h2>
              <table>
                <tbody>
                  <tr><th>Cintura</th><td>{p.medidas.cintura} cm</td></tr>
                  <tr><th>Cadera</th><td>{p.medidas.cadera} cm</td></tr>
                  <tr><th>Largo</th><td>{p.medidas.largo} cm</td></tr>
                </tbody>
              </table>
              <p>
                Medidas tomadas sobre la prenda apoyada y sin estirar.
                Compará con un jean tuyo que te quede bien — es la forma más segura de acertar.{' '}
                <Link to="/guia-de-talles">Cómo medir</Link>
              </p>
            </section>
          ) : (
            <section className="pr-medidas pr-medidas-falta">
              <p>
                Todavía no cargamos las medidas de esta prenda.{' '}
                <a href={`https://wa.me/${WSP}?text=${encodeURIComponent(`Hola! Quería consultar las medidas de: ${p.nombre}`)}`} target="_blank" rel="noreferrer">
                  Consultalas por WhatsApp
                </a>
              </p>
            </section>
          )}

          <button
            className={`btn btn-block ${enCarrito ? 'btn-ghost' : 'btn-primary'}`}
            onClick={() => !enCarrito && agregar(p.slug)}
            disabled={enCarrito}
          >
            {enCarrito ? <><Check size={19} /> Ya está en tu carrito</> : <><ShoppingBag size={19} /> Agregar al carrito</>}
          </button>

          <a
            className="pr-wsp"
            href={`https://wa.me/${WSP}?text=${encodeURIComponent(`Hola! Me interesa: ${p.nombre}`)}`}
            target="_blank" rel="noreferrer"
          >
            <MessageCircle size={17} /> Preguntar por WhatsApp
          </a>

          <ul className="pr-trust">
            <li><Truck size={17} /> Envío a todo el país</li>
            <li><CreditCard size={17} /> Hasta 6 cuotas sin interés</li>
            <li><Check size={17} /> Prenda revisada antes de enviar</li>
          </ul>
        </div>
      </div>

      {relacionados.length > 0 && (
        <section className="pr-rel">
          <h2>Más {CATEGORIAS[p.categoria].toLowerCase()}</h2>
          <div className="grid-prods">
            {relacionados.map((r) => <ProductCard key={r.slug} p={r} />)}
          </div>
        </section>
      )}
    </div>
  )
}
