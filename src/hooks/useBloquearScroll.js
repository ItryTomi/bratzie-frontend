import { useEffect } from 'react'

/** Bloquea el scroll del fondo mientras hay un overlay abierto (menú, carrito, filtros). */
export function useBloquearScroll(activo) {
  useEffect(() => {
    if (!activo) return
    const previo = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previo }
  }, [activo])
}
