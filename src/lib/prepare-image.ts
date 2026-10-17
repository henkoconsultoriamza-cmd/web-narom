import { ALLOWED_IMAGE_TYPES, IMAGE_POLICY, MAX_UPLOAD_BYTES, assertPreparedImage } from './image-policy'
import type { ImageKind } from './image-policy'

function encode(canvas: HTMLCanvasElement, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (blob?.type === 'image/webp') resolve(blob)
      else reject(new Error('El navegador no pudo preparar la imagen. Intentá con Chrome o Edge actualizado.'))
    }, 'image/webp', quality)
  })
}

// Runs before Storage is called. Keep the original aspect ratio, orientation
// and transparency, and never enlarge or unnecessarily recompress a small file.
export async function prepareImage(file: File, kind: ImageKind): Promise<File> {
  if (!ALLOWED_IMAGE_TYPES.has(file.type) || file.size === 0) {
    throw new Error('Elegí una imagen JPG, PNG o WEBP válida.')
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error('La imagen supera los 8 MB. Elegí un archivo más pequeño.')
  }

  let bitmap: ImageBitmap
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' })
  } catch {
    throw new Error('No se pudo leer la imagen. Elegí un archivo JPG, PNG o WEBP válido.')
  }

  const canvas = document.createElement('canvas')
  try {
    if (bitmap.width * bitmap.height > 40_000_000) {
      throw new Error('La imagen tiene demasiada resolución. Elegí una versión de hasta 40 megapíxeles.')
    }
    const policy = IMAGE_POLICY[kind]
    let scale = Math.min(1, policy.maxWidth / bitmap.width, policy.maxHeight / bitmap.height)
    if (scale === 1 && file.size <= policy.maxBytes) return file

    const context = canvas.getContext('2d')
    if (!context) throw new Error('No se pudo preparar la imagen. Intentá con otro navegador.')

    // Start with high quality. If necessary, reduce dimensions proportionally
    // rather than uploading an oversized file or destroying text with low quality.
    for (let attempt = 0; attempt < 7; attempt++) {
      canvas.width = Math.max(1, Math.round(bitmap.width * scale))
      canvas.height = Math.max(1, Math.round(bitmap.height * scale))
      context.imageSmoothingEnabled = true
      context.imageSmoothingQuality = 'high'
      context.drawImage(bitmap, 0, 0, canvas.width, canvas.height)

      for (const quality of [0.88, 0.8]) {
        const blob = await encode(canvas, quality)
        if (blob.size <= policy.maxBytes) {
          const prepared = new File([blob], `${file.name.replace(/\.[^.]+$/, '')}.webp`, {
            type: 'image/webp', lastModified: Date.now(),
          })
          assertPreparedImage(prepared, kind)
          return prepared
        }
      }
      scale *= 0.8
    }
    throw new Error('No se pudo preparar una versión liviana de la imagen. Probá con otra imagen.')
  } finally {
    bitmap.close()
    canvas.width = 0
    canvas.height = 0
  }
}
