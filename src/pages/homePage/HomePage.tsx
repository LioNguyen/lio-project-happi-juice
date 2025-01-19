import { useState } from 'react'

import JuiceMultiSelect from '@/components/form/JuiceMultiSelect'
import { useOrder } from '@/domains/order'
import { Button } from '@designSystem/components/button'
import FormInput from '@/components/form/FormInput'

interface Option {
  value: string
  label: string
}

interface FormData {
  name: string
  contact: string
  items: any[]
}

export default function HomePage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    contact: '',
    items: [],
  })

  console.log('🚀 @log ~ file: HomePage.tsx:26 ~ formData:', formData)

  const { useCreateOrder } = useOrder()
  const { mutate: createOrder, isPending } = useCreateOrder()

  const options: Option[] = [
    { value: 'orange', label: 'Cam' },
    { value: 'apple', label: 'Táo' },
    { value: 'watermelon', label: 'Dưa hấu' },
  ]

  const handleSubmit = async () => {
    const orderData = formData.items.map((data: any) => ({
      ...data,
      name: formData.name,
      contact: formData.contact,
      items: data.items.map((item: any) => item?.label).join(','),
    }))

    createOrder(JSON.stringify(orderData), {
      onSuccess: () => {
        setFormData({
          name: '',
          contact: '',
          items: [],
        })
      },
    })
  }

  return (
    <div
      id="home-page"
      className="flex items-center justify-center h-full w-full"
    >
      <div className="home-page__left-side flex-1 flex flex-col items-start justify-center h-full p-4 gap-2">
        <FormInput
          placeholder="Name"
          value={formData.name}
          onChange={(value) => {
            setFormData({
              ...formData,
              name: value,
            })
          }}
        />
        <FormInput
          placeholder="Contact"
          value={formData.contact}
          onChange={(value) => {
            setFormData({
              ...formData,
              contact: value,
            })
          }}
        />
        <JuiceMultiSelect
          placeholder="Mix your drink"
          options={options}
          defaultRows={formData.items}
          onChange={(value) =>
            setFormData({
              ...formData,
              items: value,
            })
          }
        />
        <Button isLoading={isPending} onClick={handleSubmit}>
          Đặt đơn hàng
        </Button>
      </div>
      <div className="home-page__right-side flex-1 hidden lg:flex items-center justify-center h-full">
        Right
      </div>
    </div>
  )
}
