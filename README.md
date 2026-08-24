# bratzie.shop — Rediseño UX/UI

Rediseño completo y sitio propio para **bratzie.shop** (ropa Y2K / 2000s), en reemplazo
de la tienda actual de Tiendanube (`bratzieshop.mitiendanube.com`).

## Stack

- React 19 + Vite 8 + React Router 7 (mismo stack que `urbani-frontend`)
- CSS propio con design tokens — sin framework
- `lucide-react` para íconos

```bash
npm install
npm run dev      # http://localhost:5180
npm run build
```

## La decisión de producto que ordena todo el diseño

Cada prenda es **una unidad única con talle fijo**. No es un e-commerce de ropa normal:
es más parecido a una tienda de vintage curado. De ahí se desprende:

- El carrito **no tiene cantidades**: una prenda está o no está (`CartContext` guarda slugs).
- El talle y las medidas son **campos filtrables**, no texto dentro del nombre del producto.
- La ficha muestra medidas reales en centímetros, porque los talles de los 2000s no coinciden
  con los actuales. Es la única forma honesta de vender usado online.

## Qué se arregló respecto del sitio viejo

| Problema del sitio viejo | Solución |
|---|---|
| Slider roto en el home (`5 / -2`) y sección "Mujer" vacía (`0 / 0`) | Home rearmado: hero, categorías, destacados, cómo comprar |
| Hero sin imagen ni CTA | Hero con identidad Y2K (cromado + gradiente) y CTA claro |
| Nav gris sobre negro (falla contraste) | `--txt` sobre `--bg`, activo en rosa con subrayado |
| Sin categorías ni filtros | Filtros por categoría, talle y tiro + orden, sincronizados con la URL |
| Talle dentro del nombre del producto | Campo `talle` filtrable |
| Medidas sueltas en la descripción | Tabla de medidas + guía de talles con método de medición |
| Sin señales de confianza | Franja de envíos/cuotas/compra protegida + página de envíos y cambios |
| Estética Y2K desaprovechada | Design system Y2K completo en `src/styles/global.css` |

## Design system

Tokens en `src/styles/global.css`. Lo esencial:

- **Color**: fondo `#0A0A0F`, rosa `#FF2D9B` (tomado del logo), violeta, cian.
  `--txt-dim` está calculado para dar ~7:1 de contraste sobre el fondo.
- **Tipografía**: Archivo Black (display, muy 2000s) + Inter (texto).
- **Firma visual**: `.chrome-text` (gradiente cromado) y `.grad-text` (rosa→violeta→cian).
- Respeta `prefers-reduced-motion`.

## Pagos

El checkout **no toca datos de tarjeta**: crea la orden en el backend y redirige a
**Mercado Pago Checkout Pro**. Mientras el backend no exista, arma el pedido por WhatsApp
para que la tienda pueda operar igual.

Configurar con `VITE_API_URL` en `.env`:

```
VITE_API_URL=http://localhost:8080
```

Sin esa variable, el checkout usa el camino de WhatsApp.

## Datos pendientes de la clienta

El catálogo (`src/data/productos.js`) se extrajo del sitio público. Falta:

1. **Fotos en alta.** La CDN de Tiendanube solo expone hasta **640px**, y hay **una sola foto
   por prenda**. Para moda hacen falta 3–4 ángulos y al menos 1200px para el zoom.
2. **Medidas faltantes** en 6 prendas: Campera 2000s, Jean Baggy CQ26, Jean SIGLO XXI,
   Jean 2000s Girl, Jean Sólido INC Girl, Jean tiro medio con brillos.
   Están marcadas con `medidas: null` y la ficha muestra un aviso con link a WhatsApp.
3. **Talle** de 4 prendas que no lo declaran (`talle: null`): Jean UNIMONG, Campera 2000s,
   las dos polleras.
4. **Composición y estado** de cada prenda (algodón/elastano, detalles de uso).
5. **Instagram real** de la tienda — en el footer está puesto `instagram.com/bratzie.shop`
   como supuesto, hay que confirmarlo.

## Sobre los descuentos

Los 15 productos tienen 30–48% OFF simultáneo. Un descuento permanente en todo el catálogo
hace que el precio tachado deje de significar algo. Vale definir con la clienta si son
precios reales de lista o conviene bajar el precio de referencia.

## Pendiente

- Backend (`bratzie-backend`, Spring Boot) con órdenes, stock y webhook de Mercado Pago
- Panel admin para que la dueña cargue prendas sin tocar código
- Búsqueda por texto
- Galería multi-foto en la ficha (cuando lleguen las fotos)
