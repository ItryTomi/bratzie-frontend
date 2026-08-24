import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import { productos } from '../data/productos'

const CartCtx = createContext(null)
const KEY = 'bratzie.cart.v1'

export function CartProvider({ children }) {
  // Guardamos solo slugs: cada prenda es única (stock 1), no hay cantidades.
  const [slugs, setSlugs] = useState(() => {
    try {
      const raw = JSON.parse(localStorage.getItem(KEY) || '[]')
      return Array.isArray(raw) ? raw.filter((s) => productos.some((p) => p.slug === s)) : []
    } catch {
      return []
    }
  })
  const [abierto, setAbierto] = useState(false)

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(slugs))
  }, [slugs])

  const items = useMemo(
    () => slugs.map((s) => productos.find((p) => p.slug === s)).filter(Boolean),
    [slugs],
  )

  const total = useMemo(() => items.reduce((a, p) => a + p.precio, 0), [items])
  const ahorro = useMemo(
    () => items.reduce((a, p) => a + Math.max(0, (p.precioAnterior || p.precio) - p.precio), 0),
    [items],
  )

  const tiene = useCallback((slug) => slugs.includes(slug), [slugs])

  const agregar = useCallback((slug) => {
    setSlugs((prev) => (prev.includes(slug) ? prev : [...prev, slug]))
    setAbierto(true)
  }, [])

  const quitar = useCallback((slug) => {
    setSlugs((prev) => prev.filter((s) => s !== slug))
  }, [])

  const vaciar = useCallback(() => setSlugs([]), [])

  const value = useMemo(
    () => ({ items, total, ahorro, cantidad: items.length, tiene, agregar, quitar, vaciar, abierto, setAbierto }),
    [items, total, ahorro, tiene, agregar, quitar, vaciar, abierto],
  )

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>
}

export const useCart = () => {
  const ctx = useContext(CartCtx)
  if (!ctx) throw new Error('useCart debe usarse dentro de <CartProvider>')
  return ctx
}
