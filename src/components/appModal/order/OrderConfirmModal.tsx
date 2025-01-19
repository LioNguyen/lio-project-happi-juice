import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'

import { AppModal } from '@/components/appModal'
import { IModalInstance, MODAL_NAME, useGlobal } from '@/domains/global'
import { Button } from '@designSystem/components/button'

interface IOrderConfirmModalProps extends IModalInstance {
  data?: {
    onClose?: () => void
  }
}

const OrderConfirmModal: FC<IOrderConfirmModalProps> = ({ isOpen, data }) => {
  const { closeModal } = useGlobal()
  const { t } = useTranslation()

  const handleModalClose = () => {
    closeModal(MODAL_NAME.orderConfirm)
  }

  const handleConfirm = () => {
    data?.onClose?.()
    handleModalClose()
  }

  return (
    <AppModal
      open={isOpen}
      onOpenChange={handleModalClose}
      title={t('modal.closeSheet.title')}
      description={t('modal.closeSheet.description')}
      footer={
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleModalClose}>
            {t('modal.closeSheet.action.cancel')}
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            {t('modal.closeSheet.action.confirm')}
          </Button>
        </div>
      }
    />
  )
}

export default memo(OrderConfirmModal)
export type { IOrderConfirmModalProps }
