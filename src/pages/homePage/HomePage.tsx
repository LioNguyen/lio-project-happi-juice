import { OrderForm } from '@/components/form'
import { MainMenu } from '@/components/menu'

export default function HomePage() {
  return (
    <div className="flex flex-col md:flex-row h-full w-full border rounded-2xl overflow-hidden">
      {/* Menu Section */}
      <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r bg-gray-50 p-4 md:p-8">
        <MainMenu />
      </div>

      {/* Order Form Section */}
      <div className="h-full w-full md:w-1/2 p-4 md:p-8">
        <OrderForm />
      </div>
    </div>
  )
}
