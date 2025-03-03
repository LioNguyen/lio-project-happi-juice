import { type FC, type HTMLAttributes, memo, useState } from 'react'

import { IComponentBase } from '@/shared/types'
import { cn } from '@/shared/utils'

interface IImageProps extends IComponentBase {
  src: string
  alt?: string
  size?: number | string
  imgProps?: Omit<HTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'onClick'>
  onClick?: () => void
  onLoad?: () => void
}

const Image: FC<IImageProps> = ({
  className,
  src,
  alt,
  size,
  imgProps,
  onClick,
  onLoad,
}) => {
  const [isImageLoaded, setIsLoaded] = useState(false)
  const { className: imgClassName, ...restImgProps } = imgProps || {}

  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  return (
    <div
      data-testid="image-test"
      className={cn('image', onClick ? 'cursor-pointer' : '', className)}
      onClick={onClick}
    >
      <img
        className={cn(
          'transition-opacity duration-300',
          imgClassName,
          isImageLoaded ? 'block' : 'hidden',
        )}
        src={src}
        alt={alt || src}
        width={size}
        height={size}
        onLoad={handleLoad}
        {...restImgProps}
      />
    </div>
  )
}

export default memo(Image)
export type { IImageProps }
