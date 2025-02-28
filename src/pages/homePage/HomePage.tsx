import { OrderForm } from '@/components/form'
import { MainMenu } from '@/components/menu'

export default function HomePage() {
  return (
    <div className="flex flex-col lg:flex-row h-full w-full border rounded-2xl overflow-hidden">
      {/* Menu Section */}
      <div className="h-full w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r bg-gray-50 p-3 lg:p-6">
        <MainMenu />
      </div>

      {/* Order Form Section - Visible on desktop */}
      <div className="h-full w-full hidden lg:block lg:w-1/2 p-4 lg:p-6 overflow-auto">
        <OrderForm />
      </div>
    </div>
  )
}
