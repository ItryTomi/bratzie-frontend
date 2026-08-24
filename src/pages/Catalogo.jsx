import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { productos, talles, CATEGORIAS, precioARS } from '../data/productos'
import { useBloquearScroll } from '../hooks/useBloquearScroll'
import './Catalogo.css'

const ORDENES = {
  nuevo: 'Más nuevos',
  precioAsc: 'Precio: menor a mayor',
  precioDesc: 'Precio: mayor a menor',
  descuento: 'Mayor descuento',
}

const TIROS = ['bajo', 'medio', 'alto']

export default function Catalogo() {
  const [params, setParams] = useSearchParams()
  const [panel, setPanel] = useState(false)
  useBloquearScroll(panel)

  const categoria = params.get('categoria') || ''
  const talle = params.get('talle') || ''
  const tiro = params.get('tiro') || ''
  const orden = params.get('orden') || 'nuevo'

  const setParam = (k, v) => {
    const next = new URLSearchParams(params)
    if (!v || next.get(k) === v) next.delete(k)
    else next.set(k, v)
    setParams(next, { replace: true })
  }

  const limpiar = () => setParams(new URLSearchParams(), { replace: true })
  const activos = [categoria, talle, tiro].filter(Boolean).length

  const lista = useMemo(() => {
    let out = productos.filter(
      (p) =>
        (!categoria || p.categoria === categoria) &&
        (!talle || String(p.talle) === talle) &&
        (!tiro || p.tiro === tiro),
    )
    const off = (p) => (p.precioAnterior ? 1 - p.precio / p.precioAnterior : 0)
    if (orden === 'precioAsc') out = [...out].sort((a, b) => a.precio - b.precio)
    if (orden === 'precioDesc') out = [...out].sort((a, b) => b.precio - a.precio)
    if (orden === 'descuento') out = [...out].sort((a, b) => off(b) - off(a))
    return out
  }, [categoria, talle, tiro, orden])

  const rango = lista.length
    ? `${precioARS(Math.min(...lista.map((p) => p.precio)))} – ${precioARS(Math.max(...lista.map((p) => p.precio)))}`
    : null

  const Filtros = () => (
    <div className="filtros">
      <div className="f-grupo">
        <h4>Categoría</h4>
        {Object.entries(CATEGORIAS).map(([k, label]) => (
          <button
            key={k}
            className={categoria === k ? 'chip is-on' : 'chip'}
            onClick={() => setParam('categoria', k)}
          >
            {label} <small>{productos.filter((p) => p.categoria === k).length}</small>
          </button>
        ))}
      </div>

      <div className="f-grupo">
        <h4>Talle</h4>
        <div className="f-talles">
          {talles.map((t) => (
            <button
              key={t}
              className={talle === String(t) ? 'talle is-on' : 'talle'}
              onClick={() => setParam('talle', String(t))}
            >
              {t}
            </button>
          ))}
        </div>
        <p className="f-nota">Algunas prendas se venden solo por medidas.</p>
      </div>

      <div className="f-grupo">
        <h4>Tiro</h4>
        {TIROS.map((t) => (
          <button key={t} className={tiro === t ? 'chip is-on' : 'chip'} onClick={() => setParam('tiro', t)}>
            Tiro {t}
          </button>
        ))}
      </div>

      {activos > 0 && (
        <button className="btn btn-ghost btn-block" onClick={limpiar}>
          <X size={16} /> Limpiar filtros
        </button>
      )}
    </div>
  )

  return (
    <div className="wrap cat">
      <header className="cat-head">
        <h1>{categoria ? CATEGORIAS[categoria] : 'Catálogo'}</h1>
        <p>
          {lista.length} {lista.length === 1 ? 'prenda única' : 'prendas únicas'}
          {rango && ` · ${rango}`}
        </p>
      </header>

      <div className="cat-bar">
        <button className="cat-filtro-btn" onClick={() => setPanel(true)}>
          <SlidersHorizontal size={17} /> Filtros {activos > 0 && <span className="cat-pill">{activos}</span>}
        </button>
        <label className="cat-orden">
          <span className="sr-only">Ordenar por</span>
          <select value={orden} onChange={(e) => setParam('orden', e.target.value)}>
            {Object.entries(ORDENES).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="cat-body">
        <aside className="cat-side">
          <Filtros />
        </aside>

        <div className="cat-main">
          {lista.length === 0 ? (
            <div className="cat-vacio">
              <p>No hay prendas con esos filtros.</p>
              <button className="btn btn-primary" onClick={limpiar}>Ver todo el catálogo</button>
            </div>
          ) : (
            <div className="grid-prods">
              {lista.map((p) => <ProductCard key={p.slug} p={p} />)}
            </div>
          )}
        </div>
      </div>

      {panel && (
        <div className="cat-panel" role="dialog" aria-label="Filtros">
          <div className="cat-panel-head">
            <h3>Filtros</h3>
            <button onClick={() => setPanel(false)} aria-label="Cerrar filtros"><X size={22} /></button>
          </div>
          <Filtros />
          <button className="btn btn-primary btn-block" onClick={() => setPanel(false)}>
            Ver {lista.length} {lista.length === 1 ? 'prenda' : 'prendas'}
          </button>
        </div>
      )}
    </div>
  )
}
