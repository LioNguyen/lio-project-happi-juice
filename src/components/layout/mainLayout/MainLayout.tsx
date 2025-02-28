import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div
      id="main-layout"
      className="bg-primary/80 flex items-center justify-center h-screen w-screen"
    >
      <div
        id="main-body"
        className="bg-white rounded-2xl h-[95vh] md:h-[85vh] w-[95vw]"
      >
        <Outlet />
      </div>
    </div>
  )
}
