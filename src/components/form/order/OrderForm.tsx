import { isEqual } from 'lodash'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { memo, useState } from 'react'
import { useTranslation } from 'react-i18next'

// Form Components
import { FormDatePicker, FormInput } from '@/components/form'

// Design System Components
import { Button } from '@designSystem/components/button'
import { Input } from '@designSystem/components/input'
import { ScrollArea } from '@designSystem/components/scrollArea'
import { Text } from '@designSystem/components/text'

// Domain & Utils
import { IOrderItem, useOrder, useOrderStore } from '@/domains/order'
import {
  calculateTotalPrice,
  getLocalStorage,
  setLocalStorage,
} from '@/shared/utils'
import { MODAL_NAME, useGlobal } from '@/domains/global'

// Types
interface IOrderFormProps {}

interface IFormErrors {
  orderedBy?: string
  contact?: string
}

/**
 * OrderItem Header component displaying item name, price and delete button
 */
const OrderItemHeader = ({
  item,
  onDelete,
}: {
  item: IOrderItem
  onDelete: () => void
}) => (
  <div className="flex items-center justify-between mb-3">
    <div className="flex-1">
      <div className="flex items-center gap-3">
        <Text className="font-medium flex-1">{item.name}</Text>
        <Text className="text-green-600 font-medium whitespace-nowrap">
          {item.price.toLocaleString()}đ
        </Text>
      </div>
    </div>
    <Button
      variant="ghost"
      size="icon"
      className="ml-2 hover:bg-red-50"
      onClick={onDelete}
    >
      <Trash2 className="h-4 w-4 text-red-500" />
    </Button>
  </div>
)

/**
 * OrderItem Controls component with quantity, date and note inputs
 */
const OrderItemControls = ({
  item,
  onUpdate,
  t,
}: {
  item: IOrderItem
  onUpdate: (id: string, updates: Partial<IOrderItem>) => void
  t: (key: string) => string
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
    {/* Quantity Control */}
    <div className="flex items-center gap-2">
      <Text className="text-sm text-gray-500 w-20">{t('order.quantity')}:</Text>
      <div className="flex items-center border rounded-md">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => onUpdate(item.id, { quantity: item.quantity - 1 })}
          disabled={item.quantity <= 1}
        >
          <Minus className="h-3 w-3" />
        </Button>
        <Text className="w-8 text-center">{item.quantity}</Text>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => onUpdate(item.id, { quantity: item.quantity + 1 })}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
    </div>

    {/* Date Picker */}
    <div className="flex items-center gap-2">
      <Text className="text-sm text-gray-500 w-20">{t('order.date')}:</Text>
      <FormDatePicker
        value={item.date}
        onChange={(value) => onUpdate(item.id, { date: value })}
        className="flex-1"
      />
    </div>

    {/* Note Input */}
    <div className="flex items-center gap-2 md:col-span-2">
      <Text className="text-sm text-gray-500 w-20">{t('order.note')}:</Text>
      <Input
        placeholder={t('form.inputs.note')}
        value={item.note}
        onChange={(e) => onUpdate(item.id, { note: e.target.value })}
        className="flex-1"
      />
    </div>
  </div>
)

/**
 * OrderItem Footer component showing subtotal
 */
const OrderItemFooter = ({
  item,
  t,
}: {
  item: IOrderItem
  t: (key: string) => string
}) => (
  <div className="flex justify-between items-center mt-3 pt-3 border-t">
    <Text className="text-sm text-gray-600">{t('order.item.subtotal')}</Text>
    <Text className="font-medium text-green-600">
      {(item.price * item.quantity).toLocaleString()}đ
    </Text>
  </div>
)

/**
 * Individual OrderItem component
 */
const OrderItem = ({
  item,
  index,
  onUpdate,
  onDelete,
  t,
}: {
  item: IOrderItem
  index: number
  onUpdate: (id: string, updates: Partial<IOrderItem>) => void
  onDelete: (id: string) => void
  t: (key: string) => string
}) => (
  <div
    key={index}
    className="flex flex-col border rounded-lg p-3 md:p-4 hover:bg-gray-50"
  >
    <OrderItemHeader item={item} onDelete={() => onDelete(item.id)} />
    <OrderItemControls item={item} onUpdate={onUpdate} t={t} />
    <OrderItemFooter item={item} t={t} />
  </div>
)

/**
 * Main OrderForm component
 * Manages the ordering process including customer information,
 * order items, and total calculation
 */
function OrderForm() {
  const { t } = useTranslation()
  const [errors, setErrors] = useState<IFormErrors>({})

  const { orders, removeOrder, updateOrderInfo, updateOrderItem } =
    useOrderStore()
  const { useCreateOrder } = useOrder()
  const { mutate: createOrder, isPending: isCreateOrderPending } =
    useCreateOrder()

  const { openModal } = useGlobal()

  // Render function for customer information section
  const renderCustomerInfo = () => {
    const handleInputChange = (field: keyof IFormErrors, value: string) => {
      // Reset errors when input changes
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }))

      // Update order info
      updateOrderInfo({ [field]: value })
    }

    return (
      <div className="space-y-3 md:space-y-4">
        <FormInput
          placeholder={t('form.inputs.name')}
          value={orders.orderedBy}
          onChange={(value) => handleInputChange('orderedBy', value)}
          error={errors.orderedBy}
          inputDelay={0}
        />
        <FormInput
          placeholder={t('form.inputs.contact')}
          value={orders.contact}
          onChange={(value) => handleInputChange('contact', value)}
          error={errors.contact}
          inputDelay={0}
        />
      </div>
    )
  }

  const formValidate = () => {
    let hasError = false
    const newErrors: IFormErrors = {}

    if (!orders.contact) {
      hasError = true
      newErrors.contact = t('errors.validation.contact.required')
    }

    if (!orders.orderedBy) {
      hasError = true
      newErrors.orderedBy = t('errors.validation.orderedBy.required')
    }

    setErrors(newErrors)
    return !hasError
  }

  const handleSubmit = () => {
    // Reset errors before validation
    setErrors({})

    // Validate form
    if (!formValidate()) {
      return
    }

    const submitData = orders.items.map((order: any) => ({
      ...order,
      contact: orders.contact,
      orderedBy: orders.orderedBy,
    }))

    createOrder(submitData, {
      onSuccess: () => {
        // Create new order object with timestamp
        const newOrderData = {
          timestamp: Date.now(),
          order: {
            items: orders.items,
            contact: orders.contact,
            orderedBy: orders.orderedBy,
          },
        }

        // Get existing orders from localStorage or initialize empty array
        const existingOrders =
          getLocalStorage<Array<typeof newOrderData>>('orders') || []

        // Append new order to existing orders array
        const updatedOrders = [...existingOrders, newOrderData]

        // Save updated orders array back to localStorage
        setLocalStorage('orders', updatedOrders)

        // Show confirmation modal
        openModal({ name: MODAL_NAME.orderConfirm })
      },
    })
  }

  return (
    <div className="order-form h-full flex flex-col">
      {/* Form Header */}
      <Text
        as="h2"
        className="text-xl md:text-2xl text-center font-bold mb-4 md:mb-6"
      >
        {t('order.title')}
      </Text>

      {/* Customer Information */}
      {renderCustomerInfo()}

      {/* Order Items Container */}
      <div className="border rounded-lg p-4 mt-4 bg-white flex-1 flex flex-col min-h-0">
        <Text as="h3" className="font-medium mb-4 flex-none">
          {t('order.selected_drinks')}
        </Text>

        {/* Scrollable Order Items List */}
        <div className="flex-1 min-h-0">
          <ScrollArea className="h-full">
            <div className="space-y-4">
              {orders.items.map((item, index) => (
                <OrderItem
                  key={index}
                  item={item}
                  index={index}
                  onUpdate={updateOrderItem}
                  onDelete={removeOrder}
                  t={t}
                />
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Order Summary and Submit */}
        <div className="order-form__summary flex-none">
          {orders.items.length > 0 && (
            <div className="border-t mt-4 pt-4 flex justify-between items-center">
              <Text className="font-bold">{t('order.total')}</Text>
              <Text className="text-xl font-bold text-green-600">
                {calculateTotalPrice(orders.items).toLocaleString()}đ
              </Text>
            </div>
          )}
          <Button
            className="w-full mt-4"
            disabled={
              !orders.items.length || !orders.contact || !orders.orderedBy
            }
            isLoading={isCreateOrderPending}
            onClick={() => handleSubmit()}
          >
            {t('order.submit')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default memo(OrderForm, isEqual)
export type { IOrderFormProps }
