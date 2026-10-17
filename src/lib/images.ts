import { LOCAL_IMAGES } from './local-images'

const IMAGE_WIDTHS = {
  desktop: [960, 1440, 1920],
  mobile: [480, 800],
  product: [320, 640],
  portrait: [160, 400],
  company: [640, 1200],
  logo: [220, 440],
} as const

export type ImageProfile = keyof typeof IMAGE_WIDTHS

// Storage serves the original upload by default. Request resized, automatically
// negotiated WebP versions without changing the saved image or its URL in the CMS.
export function getImageSources(src: string, variant: ImageProfile) {
  const local = LOCAL_IMAGES[src]
  if (local?.length) {
    return {
      src: local[local.length - 1].src,
      srcSet: local.map(image => `${image.src} ${image.width}w`).join(', '),
    }
  }

  let url: URL
  try {
    url = new URL(src)
  } catch {
    return { src, srcSet: undefined }
  }

  const originalPath = '/storage/v1/object/public/narom-images/'
  if (url.protocol !== 'https:') return { src, srcSet: undefined }
  if (url.hostname.endsWith('.supabase.co') && url.pathname.startsWith(originalPath)) {
    const fileName = url.pathname.slice(originalPath.length)
    const prepared = /^optimized-v1-(banner|bannerMobile|product|portrait|company)-[\da-f-]+\.(webp|png|jpg)$/.exec(fileName)
    // New admin uploads already meet a hard byte/dimension budget. Serve them
    // straight from the CDN instead of paying another resize/decode round trip.
    // A desktop-only banner still gets a smaller version for phones.
    if (prepared && !(variant === 'mobile' && prepared[1] === 'banner')) {
      return { src, srcSet: undefined }
    }
    url.pathname = url.pathname.replace(originalPath, '/storage/v1/render/image/public/narom-images/')
    url.searchParams.set('quality', '80')
  } else if (url.hostname === 'images.unsplash.com') {
    url.searchParams.set('auto', 'format')
    url.searchParams.set('q', '80')
  } else {
    return { src, srcSet: undefined }
  }
  const widths = IMAGE_WIDTHS[variant]
  const candidates = widths.map(width => {
    url.searchParams.set(url.hostname === 'images.unsplash.com' ? 'w' : 'width', String(width))
    return `${url.href} ${width}w`
  })

  return { src: url.href, srcSet: candidates.join(', ') }
}

export const getPromoImageSources = getImageSources
