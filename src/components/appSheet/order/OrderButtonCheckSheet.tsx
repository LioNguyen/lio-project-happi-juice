/* eslint-disable react-hooks/exhaustive-deps */
import { type FC, memo, useEffect } from 'react'

import { AppSheet } from '@/components/appSheet'
import { ISheetInstance, SHEET_NAME, useGlobal } from '@/domains/global'
import { cn } from '@/shared/utils'
import { Button } from '@designSystem/components/button'
import { useTranslation } from 'react-i18next'

interface IOrderButtonCheckSheetProps extends ISheetInstance {
  data?: {
    item?: any
    successCallback?: () => void
  }
}

const OrderButtonCheckSheet: FC<IOrderButtonCheckSheetProps> = ({ isOpen }) => {
  const { t } = useTranslation()

  const { closeSheet, openSheet } = useGlobal()

  const handleSheetClose = () => {
    closeSheet?.(SHEET_NAME.orderButtonCheck)
  }

  const handleButtonClick = () => {
    openSheet?.({ name: SHEET_NAME.orderFormMobile })
  }

  useEffect(() => {
    if (!isOpen) {
      handleSheetClose()
    }
  }, [isOpen])

  return (
    <div className={cn('order-button-check-sheet')}>
      <AppSheet
        className="h-fit lg:hidden px-4 pt-4 pb-4 rounded-t-2xl"
        modal={false}
        open={isOpen}
        side="bottom"
        onOpenChange={handleSheetClose}
        title=""
        description=""
        onInteractOutside={(e) => e.preventDefault()}
        closeProps={{ className: 'hidden' }}
      >
        <Button className="w-full" onClick={handleButtonClick}>
          {t('order.title')}
        </Button>
      </AppSheet>
    </div>
  )
}

export default memo(OrderButtonCheckSheet)
export type { IOrderButtonCheckSheetProps }
