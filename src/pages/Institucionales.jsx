import { Link } from 'react-router-dom'
import { MessageCircle, Mail, MapPin, Truck, RefreshCw, PartyPopper, Ruler } from 'lucide-react'
import './Institucionales.css'

const WSP = '5493624960582'

/* ---------------- Nosotros ---------------- */
export function Nosotros() {
  return (
    <div className="wrap doc">
      <h1>Quiénes somos</h1>
      <p className="doc-lead">
        bratzie.shop nace de una obsesión concreta: la ropa de los 2000s. Los jeans de tiro bajo,
        los baggy, las polleras cortas, los brillos. Todo eso que volvió — y que cuesta encontrar de verdad.
      </p>

      <h2>Cómo elegimos cada prenda</h2>
      <p>
        No compramos por lote ni revendemos catálogos. Cada prenda se busca, se revisa y se mide de a una.
        Por eso hay <b>una sola unidad de cada cosa</b>: si te gusta y está, es tuya; si se vendió, no vuelve.
      </p>

      <h2>Por qué publicamos las medidas</h2>
      <p>
        Los talles de los 2000s no coinciden con los de hoy, y tampoco entre marcas. Un 38 de una marca
        puede ser un 40 de otra. Por eso cada ficha lleva cintura, cadera y largo en centímetros:
        es la única forma honesta de vender ropa usada online.{' '}
        <Link to="/guia-de-talles">Te explicamos cómo medir</Link>.
      </p>

      <h2>Dónde estamos</h2>
      <p>
        Estamos en De Grandi 538 y enviamos a todo el país. Si querés ver algo en persona,
        escribinos y coordinamos.
      </p>

      <div className="doc-cta">
        <Link to="/catalogo" className="btn btn-primary">Ver el catálogo</Link>
        <a href={`https://wa.me/${WSP}`} target="_blank" rel="noreferrer" className="btn btn-ghost">
          <MessageCircle size={17} /> Escribinos
        </a>
      </div>
    </div>
  )
}

/* ---------------- Contacto ---------------- */
export function Contacto() {
  return (
    <div className="wrap doc">
      <h1>Contacto</h1>
      <p className="doc-lead">
        Lo más rápido es WhatsApp. Contestamos consultas de talles, medidas, envíos y disponibilidad.
      </p>

      <div className="doc-cards">
        <a className="doc-card" href={`https://wa.me/${WSP}`} target="_blank" rel="noreferrer">
          <MessageCircle size={24} />
          <b>WhatsApp</b>
          <span>3624 96-0582</span>
        </a>
        <a className="doc-card" href="mailto:Toralesnidia4@gmail.com">
          <Mail size={24} />
          <b>Email</b>
          <span>Toralesnidia4@gmail.com</span>
        </a>
        <div className="doc-card">
          <MapPin size={24} />
          <b>Dirección</b>
          <span>De Grandi 538</span>
        </div>
      </div>

      <h2>Antes de escribir</h2>
      <ul className="doc-lista">
        <li>Las medidas de cada prenda están publicadas en su ficha, en centímetros.</li>
        <li>Todas las prendas son únicas: si aparece en el catálogo, está disponible.</li>
        <li>Los envíos salen a todo el país y demoran entre 3 y 7 días hábiles.</li>
      </ul>
    </div>
  )
}

/* ---------------- Guía de talles ---------------- */
export function GuiaTalles() {
  return (
    <div className="wrap doc">
      <h1>Guía de talles</h1>
      <p className="doc-lead">
        Acá no vendemos por talle nominal, vendemos por medidas. Es más trabajo, pero es la única
        forma de que te quede bien la primera vez.
      </p>

      <h2><Ruler size={20} /> Cómo medir tu jean</h2>
      <p>Agarrá un jean tuyo que te quede bien, apoyalo sobre una superficie plana y sin estirar:</p>
      <ol className="doc-pasos">
        <li><b>Cintura</b> — medí de lado a lado en la parte más alta y multiplicá por 2 si querés el contorno. En la ficha publicamos la medida de lado a lado.</li>
        <li><b>Cadera</b> — de lado a lado, unos 20 cm por debajo de la cintura, en la parte más ancha.</li>
        <li><b>Largo</b> — desde la cintura hasta el fin de la pierna, por el lado de afuera.</li>
      </ol>
      <p className="doc-nota">
        Todas las medidas que publicamos son <b>de lado a lado, sobre la prenda apoyada</b>. Compará contra tu jean con el mismo criterio.
      </p>

      <h2>Referencia orientativa</h2>
      <table className="doc-tabla">
        <thead>
          <tr><th>Talle</th><th>Cintura (lado a lado)</th><th>Cadera (lado a lado)</th></tr>
        </thead>
        <tbody>
          <tr><td>34</td><td>34 – 35 cm</td><td>43 – 44 cm</td></tr>
          <tr><td>36</td><td>35 – 37 cm</td><td>44 – 46 cm</td></tr>
          <tr><td>38</td><td>37 – 39 cm</td><td>46 – 48 cm</td></tr>
          <tr><td>40</td><td>39 – 41 cm</td><td>48 – 50 cm</td></tr>
          <tr><td>42</td><td>41 – 43 cm</td><td>50 – 52 cm</td></tr>
        </tbody>
      </table>
      <p className="doc-nota">
        Es solo una referencia: la prenda de los 2000s calza distinto según el tiro y el corte.
        Ante la duda, <a href={`https://wa.me/${WSP}`} target="_blank" rel="noreferrer">preguntanos</a>.
      </p>
    </div>
  )
}

/* ---------------- Envíos y cambios ---------------- */
export function Envios() {
  return (
    <div className="wrap doc">
      <h1>Envíos y cambios</h1>

      <h2><Truck size={20} /> Envíos</h2>
      <ul className="doc-lista">
        <li>Enviamos a todo el país por Correo Argentino.</li>
        <li>Demora estimada: 3 a 7 días hábiles desde que se acredita el pago.</li>
        <li>Envío gratis en las prendas marcadas con la etiqueta correspondiente.</li>
        <li>También podés retirar en persona en De Grandi 538, coordinando por WhatsApp.</li>
      </ul>

      <h2><RefreshCw size={20} /> Cambios y devoluciones</h2>
      <p>
        Como cada prenda es una unidad única, no podemos hacer cambios por otro talle del mismo
        artículo: no existe otro. Por eso publicamos todas las medidas antes de la compra.
      </p>
      <ul className="doc-lista">
        <li>Si la prenda llega con un defecto que no estaba declarado, la devolución es sin cargo.</li>
        <li>Tenés 10 días corridos desde que la recibís para ejercer el derecho de arrepentimiento, según la Ley 24.240.</li>
        <li>La prenda debe volver en el mismo estado en que se envió.</li>
      </ul>
      <p className="doc-nota">
        Para iniciar cualquier gestión, escribinos por <a href={`https://wa.me/${WSP}`} target="_blank" rel="noreferrer">WhatsApp</a> con tu número de pedido.
      </p>
    </div>
  )
}

/* ---------------- Botón de arrepentimiento (obligatorio por ley) ---------------- */
export function Arrepentimiento() {
  return (
    <div className="wrap doc">
      <h1>Botón de arrepentimiento</h1>
      <p className="doc-lead">
        Si compraste online, tenés derecho a arrepentirte dentro de los <b>10 días corridos</b> de
        recibida la prenda, sin costo ni justificación (Ley 24.240 de Defensa del Consumidor,
        art. 34 y Resolución 424/2020).
      </p>

      <h2>Cómo hacerlo</h2>
      <ol className="doc-pasos">
        <li>Escribinos por <a href={`https://wa.me/${WSP}`} target="_blank" rel="noreferrer">WhatsApp al 3624 96-0582</a> o a <a href="mailto:Toralesnidia4@gmail.com">Toralesnidia4@gmail.com</a>.</li>
        <li>Indicá tu nombre, número de pedido y que querés ejercer el derecho de arrepentimiento.</li>
        <li>Te confirmamos la solicitud y coordinamos la devolución de la prenda sin cargo para vos.</li>
        <li>Una vez recibida, te reintegramos el importe por el mismo medio de pago.</li>
      </ol>

      <p className="doc-nota">
        También podés presentar un reclamo ante{' '}
        <a href="https://www.argentina.gob.ar/produccion/defensadelconsumidor/formulario" target="_blank" rel="noreferrer">
          Defensa de las y los Consumidores
        </a>.
      </p>
    </div>
  )
}

/* ---------------- Gracias ---------------- */
export function Gracias() {
  return (
    <div className="wrap doc doc-centro">
      <PartyPopper size={52} />
      <h1>¡Pedido enviado!</h1>
      <p className="doc-lead">
        Te contactamos por WhatsApp para confirmar el pago y coordinar la entrega.
        Guardá el mensaje: ahí queda el detalle de tu pedido.
      </p>
      <div className="doc-cta">
        <Link to="/catalogo" className="btn btn-primary">Seguir mirando</Link>
        <Link to="/" className="btn btn-ghost">Volver al inicio</Link>
      </div>
    </div>
  )
}

/* ---------------- 404 ---------------- */
export function NoEncontrado() {
  return (
    <div className="wrap doc doc-centro">
      <h1>404</h1>
      <p className="doc-lead">Esta página no existe. Puede que el link esté viejo.</p>
      <Link to="/catalogo" className="btn btn-primary">Ver el catálogo</Link>
    </div>
  )
}
