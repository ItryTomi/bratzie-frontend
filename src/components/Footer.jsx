import { Link } from 'react-router-dom'
import { MessageCircle, Mail, MapPin, Truck, ShieldCheck, CreditCard } from 'lucide-react'
import './Footer.css'

const WSP = '5493624960582'

// lucide v1 dejó de incluir íconos de marca — lo dibujamos acá.
const IconInstagram = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
  </svg>
)

const IconTikTok = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M15 3v11.5a4 4 0 1 1-3-3.87" />
    <path d="M15 6.5A5 5 0 0 0 20 9.5" />
  </svg>
)

export default function Footer() {
  return (
    <footer className="ft">
      {/* Señales de confianza — el sitio viejo no tenía ninguna */}
      <div className="wrap ft-trust">
        <div><Truck size={22} /><b>Envío gratis</b><span>A todo el país en compras seleccionadas</span></div>
        <div><CreditCard size={22} /><b>Hasta 6 cuotas</b><span>Sin interés con Mercado Pago</span></div>
        <div><ShieldCheck size={22} /><b>Compra protegida</b><span>Pagás con la seguridad de Mercado Pago</span></div>
      </div>

      <div className="wrap ft-main">
        <div className="ft-brand">
          <span className="ft-logo"><span className="brillo-text">bratzie</span><span>.shop</span></span>
          <p>Ropa Y2K y de los 2000s. Prendas originales, seleccionadas de a una. Lo que ves es lo único que hay.</p>
          <div className="ft-social">
            <a href={`https://wa.me/${WSP}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle size={19} /></a>
            <a href="https://instagram.com/bratzie.shop" target="_blank" rel="noreferrer" aria-label="Instagram"><IconInstagram /></a>
            <a href="https://tiktok.com/@bratzie.shop" target="_blank" rel="noreferrer" aria-label="TikTok"><IconTikTok /></a>
            <a href="mailto:Toralesnidia4@gmail.com" aria-label="Email"><Mail size={19} /></a>
          </div>
        </div>

        <nav className="ft-col" aria-label="Tienda">
          <h4>Tienda</h4>
          <Link to="/catalogo">Todo el catálogo</Link>
          <Link to="/catalogo?categoria=jean">Jeans</Link>
          <Link to="/catalogo?categoria=pollera">Polleras</Link>
          <Link to="/catalogo?categoria=campera">Camperas</Link>
        </nav>

        <nav className="ft-col" aria-label="Ayuda">
          <h4>Ayuda</h4>
          <Link to="/nosotros">Quiénes somos</Link>
          <Link to="/contacto">Contacto</Link>
          <Link to="/guia-de-talles">Guía de talles</Link>
          <Link to="/envios">Envíos y cambios</Link>
        </nav>

        <div className="ft-col">
          <h4>Contacto</h4>
          <a href={`https://wa.me/${WSP}`} target="_blank" rel="noreferrer">3624 96-0582</a>
          <a href="mailto:Toralesnidia4@gmail.com">Toralesnidia4@gmail.com</a>
          <span className="ft-dir"><MapPin size={14} /> De Grandi 538</span>
        </div>
      </div>

      <div className="wrap ft-legal">
        <p>© {new Date().getFullYear()} bratzie.shop — CUIT 27-46776367-4. Todos los derechos reservados.</p>
        <p>
          <a href="https://www.argentina.gob.ar/produccion/defensadelconsumidor/formulario" target="_blank" rel="noreferrer">Defensa de las y los consumidores</a>
          <span aria-hidden="true"> · </span>
          <Link to="/arrepentimiento">Botón de arrepentimiento</Link>
        </p>
      </div>
    </footer>
  )
}
