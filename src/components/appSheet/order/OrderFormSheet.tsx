/* eslint-disable react-hooks/exhaustive-deps */
import { type FC, memo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { AppSheet } from '@/components/appSheet'
import { ISheetInstance, SHEET_NAME, useGlobal } from '@/domains/global'
import { cn } from '@/shared/utils'

interface IOrderFormSheetProps extends ISheetInstance {
  data?: {
    item?: any
    successCallback?: () => void
  }
}

const OrderFormSheet: FC<IOrderFormSheetProps> = ({ isOpen, data }) => {
  const { item } = data || {}
  const formData = item

  const { closeSheet } = useGlobal()
  const { t } = useTranslation()

  const getModalContent = () => {
    const { id } = formData || {}

    if (id) {
      return {
        title: t('form.update_title'),
        description: t('form.update_description'),
      }
    }

    return {
      title: t('form.create_title'),
      description: t('form.create_description'),
    }
  }

  const handleSheetClose = () => {
    closeSheet?.(SHEET_NAME.orderForm)
  }

  const handleOpenChange = () => {
    closeSheet?.(SHEET_NAME.orderForm)
  }

  useEffect(() => {
    if (!isOpen) {
      handleSheetClose()
    }
  }, [isOpen])

  const { title, description } = getModalContent()

  return (
    <div className={cn('order-sheet')}>
      <AppSheet
        className="w-full"
        open={isOpen}
        side="bottom"
        onOpenChange={handleOpenChange}
        title={title}
        description={description}
      >
        <div className="flex flex-col gap-4 items-stretch justify-start mt-8 w-full"></div>
      </AppSheet>
    </div>
  )
}

export default memo(OrderFormSheet)
export type { IOrderFormSheetProps }
