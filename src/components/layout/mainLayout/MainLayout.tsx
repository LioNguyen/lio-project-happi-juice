import { useIsMobile } from '@/shared/hooks/useMobile'
import { Image } from '@designSystem/components/image'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  const isMobile = useIsMobile()

  return (
    <div
      id="main-layout"
      className="bg-primary/80 flex items-center justify-center h-screen w-screen"
    >
      <div
        id="main-body"
        className="bg-white rounded-2xl h-[95vh] md:h-[90vh] w-[95vw] relative"
      >
        <div className="absolute -top-[20px] lg:-top-[40px] z-10 left-1/2 -translate-x-1/2">
          <Image
            src="src/shared/assets/logo.png"
            alt="Happi Juice Logo"
            className="w-auto object-contain"
            size={isMobile ? 50 : 120}
          />
        </div>
        <Outlet />
      </div>
    </div>
  )
}
