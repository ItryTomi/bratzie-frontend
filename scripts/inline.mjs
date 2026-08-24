/**
 * Empaqueta el build en un único .html autocontenido (JS + CSS + imágenes en data URI),
 * para poder mirar la demo sin levantar un servidor.
 *
 *   npm run demo
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(raiz, 'dist')

let html = readFileSync(join(dist, 'index.html'), 'utf8')

// --- CSS ---
html = html.replace(/<link[^>]*rel="stylesheet"[^>]*href="\.?\/(assets\/[^"]+\.css)"[^>]*>/g, (_, ruta) => {
  return `<style>\n${readFileSync(join(dist, ruta), 'utf8')}\n</style>`
})

// --- JS (con las imágenes ya embebidas) ---
const imgs = new Map()
for (const f of readdirSync(join(raiz, 'public', 'img'))) {
  const b64 = readFileSync(join(raiz, 'public', 'img', f)).toString('base64')
  imgs.set(`/img/${f}`, `data:image/webp;base64,${b64}`)
}

html = html.replace(/<script[^>]*src="\.?\/(assets\/[^"]+\.js)"[^>]*><\/script>/g, (_, ruta) => {
  let js = readFileSync(join(dist, ruta), 'utf8')
  // El bundler deja las rutas como template literals, así que reemplazamos la ruta pelada.
  // De más larga a más corta para que ninguna sea prefijo de otra.
  for (const clave of [...imgs.keys()].sort((a, b) => b.length - a.length)) {
    js = js.split(clave).join(imgs.get(clave))
  }
  js = js.replace(/<\/script/gi, '<\\/script')
  return `<script type="module">\n${js}\n</script>`
})

const salida = join(raiz, 'bratzie-demo.html')
writeFileSync(salida, html)

const mb = (Buffer.byteLength(html) / 1024 / 1024).toFixed(2)
console.log(`✓ ${salida} — ${mb} MB, ${imgs.size} imágenes embebidas`)
