import { isEqual } from 'lodash'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { FC, memo, useState } from 'react'
import { useTranslation } from 'react-i18next'

// Form Components
import { FormDatePicker, FormInput } from '@/components/form'

// Design System Components
import { Button } from '@designSystem/components/button'
import { Input } from '@designSystem/components/input'
import { ScrollArea } from '@designSystem/components/scrollArea'
import { Text } from '@designSystem/components/text'

// Domain & Utils
import { MODAL_NAME, useGlobal } from '@/domains/global'
import { IOrderItem, useOrder, useOrderStore } from '@/domains/order'
import emptyStateUrl from '@/shared/assets/empty_state.png'
import {
  calculateTotalPrice,
  getLocalStorage,
  setLocalStorage,
} from '@/shared/utils'
import { Badge } from '@designSystem/components/badge'
import { Image } from '@designSystem/components/image'
import { useAnalytics } from '@/shared/hooks/useAnalytics'

interface IOrderFormProps {
  onSubmit?: () => void
}

interface IFormErrors {
  orderedBy?: string
  contact?: string
}

/**
 * Empty state component when no items selected
 */
const EmptyState = ({ t }: { t: (key: string) => string }) => (
  <div className="flex flex-col items-center justify-center h-full py-6 text-gray-500">
    <Image className="opacity-50" src={emptyStateUrl} size={200} />
    <Text className="text-base text-center text-text-muted-foreground max-w-[280px]">
      {t('order.empty_state')}
    </Text>
  </div>
)

/**
 * OrderItem Header component displaying item name, price and delete button
 */
const OrderItemHeader = ({
  index,
  item,
  onDelete,
}: {
  index: number
  item: IOrderItem
  onDelete: () => void
}) => (
  <div className="flex items-center justify-between mb-3">
    <Text className="font-semibold flex-1">
      {index + 1}. {item.name}
    </Text>
    <Text className="font-bold whitespace-nowrap min-w-[100px] mr-2 text-right text-primary">
      {(item.price * item.quantity).toLocaleString()}đ
    </Text>
    <Button
      variant="ghost"
      size="icon"
      className="hover:bg-red-50"
      onClick={onDelete}
    >
      <Trash2 className="h-4 w-4 text-error" />
    </Button>
  </div>
)

/**
 * OrderItem Controls component with quantity, date and note inputs
 */
const OrderItemControls = ({
  item,
  onUpdate,
  onDelete,
  t,
}: {
  item: IOrderItem
  onUpdate: (id: string, updates: Partial<IOrderItem>) => void
  onDelete: (id: string) => void
  t: (key: string) => string
}) => {
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity === 0) {
      onDelete(item.id)
    } else {
      onUpdate(item.id, { quantity: newQuantity })
    }
  }

  return (
    <div className="space-y-3">
      {/* Quantity and Date Row */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
        {/* Quantity Control */}
        <div className="flex items-center gap-2">
          <Text className="text-sm text-gray-500 w-20 md:w-[65px]">
            {t('order.quantity')}:
          </Text>
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleQuantityChange(item.quantity - 1)}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <Text className="w-8 text-center">{item.quantity}</Text>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleQuantityChange(item.quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Date Picker */}
        <div className="flex items-center gap-2 flex-1">
          <Text className="text-sm text-gray-500 whitespace-nowrap w-20 md:w-[75px]">
            {t('order.date')}:
          </Text>
          <FormDatePicker
            className="flex-1 max-w-[180px]"
            value={item.date}
            onChange={(value) => onUpdate(item.id, { date: value })}
          />
        </div>
      </div>

      {/* Note Input */}
      <div className="flex items-center gap-2">
        <Text className="text-sm text-gray-500 w-20 md:w-[65px]">
          {t('order.note')}:
        </Text>
        <Input
          placeholder={t('form.inputs.note')}
          value={item.note}
          onChange={(e) => onUpdate(item.id, { note: e.target.value })}
          className="flex-1"
        />
      </div>
    </div>
  )
}

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
    <OrderItemHeader
      index={index}
      item={item}
      onDelete={() => onDelete(item.id)}
    />
    <OrderItemControls
      item={item}
      onUpdate={onUpdate}
      onDelete={onDelete}
      t={t}
    />
  </div>
)

/**
 * Main OrderForm component
 */
const OrderForm: FC<IOrderFormProps> = ({ onSubmit }) => {
  const { t } = useTranslation()
  const [errors, setErrors] = useState<IFormErrors>({})

  const { trackEvent } = useAnalytics()

  const { orders, removeOrder, updateOrderInfo, updateOrderItem } =
    useOrderStore()
  const { useCreateOrder } = useOrder()
  const { mutate: createOrder, isPending: isCreateOrderPending } =
    useCreateOrder()

  const { openModal } = useGlobal()

  // Render function for customer information section
  const renderCustomerInfo = () => {
    const handleInputChange = (field: keyof IFormErrors, value: string) => {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }))
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
    setErrors({})

    // Track submit attempt
    trackEvent('order_submit_attempt', {
      items: orders.items,
      items_count: orders.items.length,
      total_amount: calculateTotalPrice(orders.items),
    })

    if (!formValidate()) {
      // Track validation error
      trackEvent('order_submit_validation_error', {
        errors: Object.keys(errors),
        items: orders.items,
        items_count: orders.items.length,
      })
      return
    }

    const submitData = orders.items.map((order: any) => ({
      ...order,
      contact: orders.contact,
      orderedBy: orders.orderedBy,
    }))

    createOrder(submitData, {
      onSuccess: () => {
        // Track successful submission
        trackEvent('order_submit_success', {
          items: orders.items,
          items_count: orders.items.length,
          total_amount: calculateTotalPrice(orders.items),
          customer: orders.orderedBy,
        })

        const newOrderData = {
          timestamp: Date.now(),
          order: {
            items: orders.items,
            contact: orders.contact,
            orderedBy: orders.orderedBy,
          },
        }

        const existingOrders =
          getLocalStorage<Array<typeof newOrderData>>('orders') || []
        const updatedOrders = [...existingOrders, newOrderData]
        setLocalStorage('orders', updatedOrders)

        openModal({ name: MODAL_NAME.orderConfirm })
        onSubmit?.()
      },
    })
  }

  return (
    <div className="order-form h-full flex flex-col">
      <Text
        as="h2"
        className="text-2xl lg:text-3xl text-center font-bold mb-4 md:mb-6"
      >
        {t('order.title')}
      </Text>

      {renderCustomerInfo()}

      <div className="border rounded-lg p-4 mt-4 bg-white flex-1 flex flex-col min-h-0">
        {orders.items.length > 0 && (
          <Text as="h3" className="font-medium mb-4 flex-none">
            {t('order.selected_drinks')}
          </Text>
        )}

        <div className="flex-1 min-h-0">
          {orders.items.length > 0 ? (
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
          ) : (
            <EmptyState t={t} />
          )}
        </div>

        <div className="flex-none mt-2">
          {orders.items.length > 0 && (
            <div className="border-t mt-3 py-3 flex justify-between items-center">
              <div className="flex items-center gap-1">
                <Text className="font-bold">{t('order.total')}</Text>
                {orders.items.length > 0 && (
                  <Badge className=" h-6 w-6 p-1 flex items-center justify-center text-[10px] bg-primary border border-white shadow-sm text-white font-bold rounded-full hover:bg-primary">
                    {orders.items.length}
                  </Badge>
                )}
              </div>
              <Text className="text-xl font-bold text-primary">
                {calculateTotalPrice(orders.items).toLocaleString()}đ
              </Text>
            </div>
          )}
          <Button
            className="w-full"
            disabled={
              !orders.items.length || !orders.contact || !orders.orderedBy
            }
            isLoading={isCreateOrderPending}
            onClick={handleSubmit}
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
