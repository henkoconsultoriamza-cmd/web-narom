// Every admin upload uses this policy. Byte limits apply to the stored file,
// not just to a recommendation shown beside the upload control.
export const IMAGE_POLICY = {
  banner: { maxWidth: 1920, maxHeight: 1920, maxBytes: 450 * 1024 },
  bannerMobile: { maxWidth: 800, maxHeight: 1200, maxBytes: 250 * 1024 },
  product: { maxWidth: 640, maxHeight: 640, maxBytes: 120 * 1024 },
  portrait: { maxWidth: 400, maxHeight: 600, maxBytes: 100 * 1024 },
  company: { maxWidth: 1200, maxHeight: 1000, maxBytes: 250 * 1024 },
} as const

export type ImageKind = keyof typeof IMAGE_POLICY
export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024
export const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp'])

export function assertPreparedImage(file: File, kind: ImageKind) {
  if (!ALLOWED_IMAGE_TYPES.has(file.type) || file.size === 0) {
    throw new Error('Elegí una imagen JPG, PNG o WEBP válida.')
  }
  if (file.size > IMAGE_POLICY[kind].maxBytes) {
    throw new Error('No se pudo preparar una versión liviana de la imagen. Probá con otra imagen.')
  }
}
