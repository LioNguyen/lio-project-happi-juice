import { useCallback } from 'react'

declare global {
  interface Window {
    gtag: (
      command: string,
      eventName: string,
      eventParams?: Record<string, any>,
    ) => void
  }
}

export const useAnalytics = () => {
  const trackEvent = useCallback(
    (eventName: string, eventParams: Record<string, any> = {}) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', eventName, eventParams)
      }
    },
    [],
  )

  return { trackEvent }
}
