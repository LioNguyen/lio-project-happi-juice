/* eslint-disable react-hooks/exhaustive-deps */
import { type FC, memo, useEffect } from 'react'

import { AppSheet } from '@/components/appSheet'
import { OrderForm } from '@/components/form'
import { ISheetInstance, SHEET_NAME, useGlobal } from '@/domains/global'
import { cn } from '@/shared/utils'

interface IOrderFormSheetProps extends ISheetInstance {
  data?: {
    item?: any
    successCallback?: () => void
  }
}

const OrderFormSheet: FC<IOrderFormSheetProps> = ({ isOpen }) => {
  const { closeSheet } = useGlobal()

  const handleSheetClose = () => {
    closeSheet?.(SHEET_NAME.orderForm)
  }

  useEffect(() => {
    if (!isOpen) {
      handleSheetClose()
    }
  }, [isOpen])

  return (
    <div className={cn('order-sheet')}>
      <AppSheet
        className="h-[85vh] lg:hidden px-4 py-6 rounded-t-2xl"
        open={isOpen}
        side="bottom"
        onOpenChange={handleSheetClose}
        title=""
        description=""
      >
        <OrderForm onSubmit={handleSheetClose} />
      </AppSheet>
    </div>
  )
}

export default memo(OrderFormSheet)
export type { IOrderFormSheetProps }
