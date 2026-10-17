import { useState } from 'react'
import type { ImgHTMLAttributes } from 'react'
import { getImageSources } from '../lib/images'
import type { ImageProfile } from '../lib/images'

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  src: string
  profile?: ImageProfile
}

// Every CMS image is selected by its role, including future uploads. Offscreen
// sections do not compete with the hero and promotion banner for bandwidth.
export default function OptimizedImage({
  src, profile = 'product', loading = 'lazy', sizes = '100vw', onError, ...props
}: Props) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null)
  const image = failedSrc === src ? { src, srcSet: undefined } : getImageSources(src, profile)

  return (
    <img
      {...props}
      src={image.src}
      srcSet={image.srcSet}
      sizes={sizes}
      loading={loading}
      decoding="async"
      onError={event => {
        if (image.src !== src) setFailedSrc(src)
        else onError?.(event)
      }}
    />
  )
}
