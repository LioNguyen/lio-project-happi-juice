import { Outlet } from 'react-router-dom'

import logoUrl from '@/shared/assets/logo.png'
import { useIsMobile } from '@/shared/hooks/useMobile'
import { Image } from '@designSystem/components/image'

export default function MainLayout() {
  const isMobile = useIsMobile()

  return (
    <div
      id="main-layout"
      className="bg-primary/80 flex items-center justify-center h-screen w-screen"
    >
      <div
        id="main-body"
        className="bg-white rounded-2xl h-[92vh] lg:h-[90vh] w-[95vw] relative"
      >
        <div className="absolute -top-[35px] lg:-top-[45px] z-10 left-1/2 -translate-x-1/2">
          <Image
            src={logoUrl}
            alt="Happi Juice Logo"
            className="w-auto object-contain"
            size={isMobile ? 100 : 120}
          />
        </div>
        <Outlet />
      </div>
    </div>
  )
}
