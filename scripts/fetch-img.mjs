/**
 * Descarga las fotos de producto a public/img si no están.
 *
 * Corre solo en el build (npm run prebuild). Existe porque todavía no tenemos las fotos
 * originales de la clienta y las estamos tomando de la tienda vieja de Tiendanube.
 * Cuando lleguen las fotos en alta, este script se borra y las imágenes quedan versionadas.
 */
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const CDN = 'https://dcdn-us.mitiendanube.com/stores/008/062/610/products'

const FOTOS = {
  'solido-inc-38': '8c3aae9e-52ef-4f34-a2d7-ad822d8e9356-0822b352af66c42cda17875630878476',
  'diseno-38': 'c2b92b24-e17e-4256-9d1a-17cc82d2f3bb-b4f16bc3e838a44b9e17875627764807',
  'unimong': '950adc5a-f144-41c7-b6cf-3b745009e859-cf4892609eb5c1b25617875625333861',
  'scasso-36': '0df1715c-0987-4c2e-a9b0-6fe9686c7ffb-f4a26739a1dd982b0517875623825716',
  'campera-2000s': 'copy_624fe008-4a16-426a-b042-ab34a32f4376-b59452dcbdee13d82f17875482206348',
  'pollera': '7e3dce4c-7bd2-48f5-a8dd-14b04bcf69d7-595038be295edfd46817875433599537',
  'baggy-cq26-40': 'copy_ae3a9fb9-bd9b-4a9d-9cd7-b524a2eb8d36-2f642c44ae8c2735ae17875430460350',
  'pollera-flor': 'copy_f6b99967-cec9-4b71-99fe-ad64047b8d95-1d5fcd9661b082ccdb17875425690328',
  'siglo-xxi-38': '712e79d2-d7a8-4396-8aae-e67007ae00cd-4bd072f282f3221b2517861655413155',
  'strips-36': 'c42a5b7e-746e-409e-b26e-6e74c7c47975-a289ac40136575675417861653454301',
  'inc-girls-36': 'img_8074-ed0b2bc59e93f70e8a17861651209752',
  'girl-2000s-36': 'img_8080-a59a8af4832af96d5c17861525470451',
  'solido-inc-34': 'img_8051-020a03652e892d4a1617861498390055',
  'tiro-medio-42': 'img_7954-3ddf186a81c78a539917860934773308',
  'jeans-2000s-42': 'img_7961-bef6dcb04a6da84b8417860799143959',
}

const destino = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'img')
mkdirSync(destino, { recursive: true })

let bajadas = 0
let existentes = 0

for (const [nombre, id] of Object.entries(FOTOS)) {
  const archivo = join(destino, `${nombre}.webp`)
  if (existsSync(archivo)) { existentes++; continue }

  // 640 es el tamaño máximo que expone la CDN de Tiendanube.
  const r = await fetch(`${CDN}/${id}-640-0.webp`)
  if (!r.ok) throw new Error(`No se pudo bajar ${nombre}.webp (HTTP ${r.status})`)

  const buf = Buffer.from(await r.arrayBuffer())
  if (buf.length < 1000) throw new Error(`${nombre}.webp vino vacío o con error`)

  writeFileSync(archivo, buf)
  bajadas++
}

console.log(`✓ fotos: ${existentes} ya estaban, ${bajadas} descargadas`)
