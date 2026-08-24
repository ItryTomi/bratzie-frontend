import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Ruler, Truck } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { productos, CATEGORIAS } from '../data/productos'
import './Home.css'

const destacados = productos.filter((p) => p.destacado).slice(0, 8)
const cuenta = (cat) => productos.filter((p) => p.categoria === cat).length

const TILES = [
  { key: 'jean', img: '/img/baggy-cq26-40.webp' },
  { key: 'pollera', img: '/img/pollera-flor.webp' },
  { key: 'campera', img: '/img/campera-2000s.webp' },
]

export default function Home() {
  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="hero">
        <div className="hero-glow" aria-hidden="true" />
        <div className="wrap hero-in">
          <span className="hero-kicker"><Sparkles size={14} /> Ropa Y2K original · 2000s</span>
          <h1>
            <span className="chrome-text">Lo que ves</span><br />
            <span className="grad-text">es lo único que hay</span>
          </h1>
          <p className="hero-sub">
            Jeans, polleras y camperas de los 2000s seleccionadas de a una.
            Cada prenda es una sola unidad, con su talle y sus medidas reales.
          </p>
          <div className="hero-cta">
            <Link to="/catalogo" className="btn btn-primary">
              Ver el catálogo <ArrowRight size={18} />
            </Link>
            <Link to="/guia-de-talles" className="btn btn-ghost">
              <Ruler size={17} /> Guía de talles
            </Link>
          </div>
          <p className="hero-nota">
            <Truck size={15} /> Envío gratis a todo el país · Hasta 6 cuotas sin interés
          </p>
        </div>
      </section>

      {/* ---------- CATEGORÍAS ---------- */}
      <section className="wrap sec">
        <h2 className="sec-tit">Categorías</h2>
        <div className="tiles">
          {TILES.map((t) => (
            <Link key={t.key} to={`/catalogo?categoria=${t.key}`} className="tile">
              <img src={t.img} alt="" loading="lazy" />
              <span className="tile-lbl">
                {CATEGORIAS[t.key]}
                <small>{cuenta(t.key)} {cuenta(t.key) === 1 ? 'prenda' : 'prendas'}</small>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------- DESTACADOS ---------- */}
      <section className="wrap sec">
        <div className="sec-head">
          <h2 className="sec-tit">Recién llegadas</h2>
          <Link to="/catalogo" className="sec-link">Ver todo <ArrowRight size={16} /></Link>
        </div>
        <div className="grid-prods">
          {destacados.map((p) => <ProductCard key={p.slug} p={p} />)}
        </div>
      </section>

      {/* ---------- CÓMO FUNCIONA ---------- */}
      <section className="wrap sec">
        <div className="como">
          <h2 className="sec-tit">Cómo comprar acá</h2>
          <ol>
            <li><b>Mirá las medidas.</b> No vendemos por talle nominal: cada prenda tiene cintura, cadera y largo en centímetros.</li>
            <li><b>Comparala con un jean tuyo.</b> Medí uno que te quede bien y compará. Es el método más seguro.</li>
            <li><b>Es una sola.</b> Si la agregás al carrito, es la única unidad. No hay reposición.</li>
            <li><b>Te llega a tu casa.</b> Envío a todo el país, gratis en las prendas marcadas.</li>
          </ol>
          <Link to="/guia-de-talles" className="btn btn-ghost">Ver guía de talles completa</Link>
        </div>
      </section>
    </>
  )
}
