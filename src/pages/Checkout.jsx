import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Lock, Trash2, ArrowLeft, Loader2 } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { precioARS } from '../data/productos'
import './Checkout.css'

const WSP = '5493624960582'
const API = import.meta.env.VITE_API_URL || ''

const ENTREGAS = {
  envio: { label: 'Envío a domicilio', detalle: 'Correo Argentino · 3 a 7 días hábiles', costo: 0 },
  retiro: { label: 'Retiro en persona', detalle: 'De Grandi 538 · coordinamos por WhatsApp', costo: 0 },
}

const vacio = {
  nombre: '', email: '', telefono: '', dni: '',
  calle: '', numero: '', piso: '', cp: '', ciudad: '', provincia: '',
  notas: '',
}

export default function Checkout() {
  const { items, total, ahorro, quitar } = useCart()
  const [f, setF] = useState(vacio)
  const [entrega, setEntrega] = useState('envio')
  const [errores, setErrores] = useState({})
  const [enviando, setEnviando] = useState(false)
  const navigate = useNavigate()

  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }))

  const validar = () => {
    const e = {}
    if (!f.nombre.trim()) e.nombre = 'Necesitamos tu nombre'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'Revisá el email'
    if (f.telefono.replace(/\D/g, '').length < 8) e.telefono = 'Revisá el teléfono'
    if (entrega === 'envio') {
      if (!f.calle.trim()) e.calle = 'Falta la calle'
      if (!f.numero.trim()) e.numero = 'Falta el número'
      if (!/^\d{4}$/.test(f.cp)) e.cp = 'CP de 4 dígitos'
      if (!f.ciudad.trim()) e.ciudad = 'Falta la ciudad'
      if (!f.provincia.trim()) e.provincia = 'Falta la provincia'
    }
    setErrores(e)
    return Object.keys(e).length === 0
  }

  const textoWhatsapp = () => {
    const lineas = items.map((p) => `• ${p.nombre}${p.talle ? ` (talle ${p.talle})` : ''} — ${precioARS(p.precio)}`)
    const dir = entrega === 'envio'
      ? `${f.calle} ${f.numero}${f.piso ? ` piso ${f.piso}` : ''}, ${f.ciudad}, ${f.provincia} (CP ${f.cp})`
      : 'Retiro en persona'
    return [
      '¡Hola! Quiero hacer este pedido:', '', ...lineas, '',
      `Total: ${precioARS(total)}`, '',
      `Nombre: ${f.nombre}`, `Email: ${f.email}`, `Teléfono: ${f.telefono}`,
      `Entrega: ${ENTREGAS[entrega].label}`, `Dirección: ${dir}`,
      f.notas ? `Notas: ${f.notas}` : '',
    ].filter(Boolean).join('\n')
  }

  const onSubmit = async (ev) => {
    ev.preventDefault()
    if (!validar()) {
      document.querySelector('.is-error')?.scrollIntoView({ block: 'center', behavior: 'smooth' })
      return
    }
    setEnviando(true)

    // Con backend: crea la preferencia y redirige a Mercado Pago Checkout Pro.
    // Sin backend todavía: deja el pedido armado en WhatsApp para no frenar la venta.
    if (API) {
      try {
        const r = await fetch(`${API}/api/ordenes`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: items.map((p) => p.slug), cliente: f, entrega }),
        })
        if (!r.ok) throw new Error('No se pudo crear la orden')
        const { initPoint } = await r.json()
        window.location.href = initPoint
        return
      } catch (err) {
        setErrores({ general: 'No pudimos conectar con el pago. Te llevamos a WhatsApp para completar el pedido.' })
      }
    }

    window.open(`https://wa.me/${WSP}?text=${encodeURIComponent(textoWhatsapp())}`, '_blank', 'noopener')
    setEnviando(false)
    navigate('/gracias')
  }

  if (items.length === 0) {
    return (
      <div className="wrap ck-vacio">
        <h1>Tu carrito está vacío</h1>
        <p>Elegí alguna prenda antes de seguir.</p>
        <Link to="/catalogo" className="btn btn-primary">Ver el catálogo</Link>
      </div>
    )
  }

  const campo = (k, label, props = {}) => (
    <label className={errores[k] ? 'ck-campo is-error' : 'ck-campo'}>
      <span>{label}</span>
      <input value={f[k]} onChange={set(k)} aria-invalid={!!errores[k]} {...props} />
      {errores[k] && <em>{errores[k]}</em>}
    </label>
  )

  return (
    <div className="wrap ck">
      <Link to="/catalogo" className="ck-volver"><ArrowLeft size={16} /> Seguir mirando</Link>
      <h1>Finalizar compra</h1>

      <form className="ck-grid" onSubmit={onSubmit} noValidate>
        <div className="ck-form">
          <fieldset>
            <legend>Tus datos</legend>
            <div className="ck-fila">
              {campo('nombre', 'Nombre y apellido', { autoComplete: 'name' })}
              {campo('dni', 'DNI (opcional)', { inputMode: 'numeric' })}
            </div>
            <div className="ck-fila">
              {campo('email', 'Email', { type: 'email', autoComplete: 'email' })}
              {campo('telefono', 'Teléfono / WhatsApp', { type: 'tel', autoComplete: 'tel' })}
            </div>
          </fieldset>

          <fieldset>
            <legend>Entrega</legend>
            <div className="ck-entregas">
              {Object.entries(ENTREGAS).map(([k, v]) => (
                <label key={k} className={entrega === k ? 'ck-entrega is-on' : 'ck-entrega'}>
                  <input type="radio" name="entrega" value={k} checked={entrega === k} onChange={() => setEntrega(k)} />
                  <span>
                    <b>{v.label}</b>
                    <small>{v.detalle}</small>
                  </span>
                  <strong>{v.costo === 0 ? 'Gratis' : precioARS(v.costo)}</strong>
                </label>
              ))}
            </div>

            {entrega === 'envio' && (
              <div className="ck-dir">
                <div className="ck-fila">
                  {campo('calle', 'Calle', { autoComplete: 'address-line1' })}
                  {campo('numero', 'Número', { inputMode: 'numeric' })}
                  {campo('piso', 'Piso / Depto (opcional)')}
                </div>
                <div className="ck-fila">
                  {campo('cp', 'Código postal', { inputMode: 'numeric', maxLength: 4, autoComplete: 'postal-code' })}
                  {campo('ciudad', 'Ciudad', { autoComplete: 'address-level2' })}
                  {campo('provincia', 'Provincia', { autoComplete: 'address-level1' })}
                </div>
              </div>
            )}

            <label className="ck-campo">
              <span>Notas para la entrega (opcional)</span>
              <textarea rows="3" value={f.notas} onChange={set('notas')} />
            </label>
          </fieldset>
        </div>

        <aside className="ck-resumen">
          <h2>Tu pedido</h2>
          <ul>
            {items.map((p) => (
              <li key={p.slug}>
                <img src={p.img} alt="" width="56" height="56" />
                <div>
                  <span>{p.nombre}</span>
                  <small>{p.talle ? `Talle ${p.talle}` : 'Según medidas'}</small>
                </div>
                <b>{precioARS(p.precio)}</b>
                <button type="button" onClick={() => quitar(p.slug)} aria-label={`Quitar ${p.nombre}`}>
                  <Trash2 size={15} />
                </button>
              </li>
            ))}
          </ul>

          <div className="ck-lineas">
            <div><span>Subtotal</span><span>{precioARS(total)}</span></div>
            <div><span>Envío</span><span className="ck-gratis">Gratis</span></div>
            {ahorro > 0 && <div><span>Ahorrás</span><span className="ck-gratis">{precioARS(ahorro)}</span></div>}
          </div>

          <div className="ck-total"><span>Total</span><strong>{precioARS(total)}</strong></div>

          {errores.general && <p className="ck-error-gral">{errores.general}</p>}

          <button type="submit" className="btn btn-primary btn-block" disabled={enviando}>
            {enviando ? <><Loader2 size={18} className="ck-spin" /> Procesando…</> : <><Lock size={17} /> Confirmar pedido</>}
          </button>

          <p className="ck-seguro">
            <Lock size={13} /> El pago se completa en Mercado Pago. Nunca manejamos los datos de tu tarjeta.
          </p>
        </aside>
      </form>
    </div>
  )
}
