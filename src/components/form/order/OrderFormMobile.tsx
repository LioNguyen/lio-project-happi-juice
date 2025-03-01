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
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@designSystem/components/sheet'
import { Text } from '@designSystem/components/text'

// Domain & Utils
import { MODAL_NAME, useGlobal } from '@/domains/global'
import { IOrderItem, useOrder, useOrderStore } from '@/domains/order'
import emptyStateUrl from '@/shared/assets/empty_state.png'
import { useAnalytics } from '@/shared/hooks/useAnalytics'
import {
  calculateTotalPrice,
  getLocalStorage,
  setLocalStorage,
} from '@/shared/utils'
import { Badge } from '@designSystem/components/badge'
import { Image } from '@designSystem/components/image'

interface IOrderFormMobileProps {
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
  item,
  onDelete,
}: {
  item: IOrderItem
  onDelete: () => void
}) => (
  <div className="flex items-center justify-between mb-3">
    <Text className="font-semibold flex-1">{item.name}</Text>
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
    <OrderItemHeader item={item} onDelete={() => onDelete(item.id)} />
    <OrderItemControls
      item={item}
      onUpdate={onUpdate}
      onDelete={onDelete}
      t={t}
    />
  </div>
)

const CustomerInfoSheet = ({
  isOpen,
  onOpenChange,
  onSubmit,
  isSubmitting,
}: {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: () => void
  isSubmitting: boolean
}) => {
  const { t } = useTranslation()
  const [errors, setErrors] = useState<IFormErrors>({})
  const { orders, updateOrderInfo } = useOrderStore()

  const handleInputChange = (field: keyof IFormErrors, value: string) => {
    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }))
    updateOrderInfo({ [field]: value })
  }

  const isFormValid = orders.contact && orders.orderedBy

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange} modal={true}>
      <SheetContent side="bottom" className="px-4 py-6 rounded-t-2xl">
        <SheetHeader>
          <SheetTitle>{t('order.customer_info')}</SheetTitle>
        </SheetHeader>

        <div className="space-y-4 py-4">
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

        <SheetFooter>
          <Button
            className="w-full"
            onClick={onSubmit}
            disabled={!isFormValid}
            isLoading={isSubmitting}
          >
            {t('order.submit')}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

/**
 * Main OrderFormMobile component
 */
const OrderFormMobile: FC<IOrderFormMobileProps> = ({ onSubmit }) => {
  const { t } = useTranslation()
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const { trackEvent } = useAnalytics()

  const { orders, removeOrder, updateOrderItem } = useOrderStore()
  const { useCreateOrder } = useOrder()
  const { mutate: createOrder, isPending: isCreateOrderPending } =
    useCreateOrder()
  const { openModal } = useGlobal()

  const handleSubmit = () => {
    // Track submit attempt
    trackEvent('order_submit_attempt', {
      items: orders.items,
      items_count: orders.items.length,
      total_amount: calculateTotalPrice(orders.items),
    })

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

        setIsSheetOpen(false)
        openModal({ name: MODAL_NAME.orderConfirm })
        onSubmit?.()
      },
    })
  }

  return (
    <div className="order-form h-full flex flex-col">
      <Text
        as="h2"
        className="text-2xl lg:text-3xl text-center font-bold mb-3 lg:mb-6"
      >
        {t('order.title')}
      </Text>

      <div className="p-4 bg-white flex-1 flex flex-col min-h-0">
        {orders.items.length > 0 && (
          <Text as="h3" className="hidden lg:block font-medium mb-4 flex-none">
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
                <Badge className="h-6 w-6 p-1 flex items-center justify-center text-[10px] bg-primary border border-white shadow-sm text-white font-bold rounded-full hover:bg-primary">
                  {orders.items.length}
                </Badge>
              </div>
              <Text className="text-xl font-bold text-primary">
                {calculateTotalPrice(orders.items).toLocaleString()}đ
              </Text>
            </div>
          )}
          <Button
            className="w-full"
            disabled={!orders.items.length}
            onClick={() => setIsSheetOpen(true)}
          >
            {t('order.proceed_to_checkout')}
          </Button>
        </div>
      </div>

      <CustomerInfoSheet
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        onSubmit={handleSubmit}
        isSubmitting={isCreateOrderPending}
      />
    </div>
  )
}

export default memo(OrderFormMobile, isEqual)
export type { IOrderFormMobileProps }
