import { useEffect, useState } from 'react'

import { SCREEN_BREAKPOINTS } from '@/shared/constants'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    const mql = window.matchMedia(
      `(max-width: ${SCREEN_BREAKPOINTS.TABLET - 1}px)`,
    )
    const onChange = () => {
      setIsMobile(window.innerWidth < SCREEN_BREAKPOINTS.TABLET)
    }
    mql.addEventListener('change', onChange)
    setIsMobile(window.innerWidth < SCREEN_BREAKPOINTS.TABLET)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return !!isMobile
}

export { useIsMobile }
