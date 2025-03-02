/* eslint-disable react-hooks/exhaustive-deps */
import { type FC, memo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { AppSheet } from '@/components/appSheet'
import { OrderFormMobile } from '@/components/form'
import { ISheetInstance, SHEET_NAME, useGlobal } from '@/domains/global'
import { cn } from '@/shared/utils'

interface IOrderFormMobileSheetProps extends ISheetInstance {
  data?: {
    item?: any
    successCallback?: () => void
  }
}

const OrderFormMobileSheet: FC<IOrderFormMobileSheetProps> = ({ isOpen }) => {
  const { t } = useTranslation()

  const { closeSheet } = useGlobal()

  const handleSheetClose = () => {
    closeSheet?.(SHEET_NAME.orderFormMobile)
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
        title={t('order.title')}
        description=""
      >
        <OrderFormMobile onSubmit={handleSheetClose} />
      </AppSheet>
    </div>
  )
}

export default memo(OrderFormMobileSheet)
export type { IOrderFormMobileSheetProps }
