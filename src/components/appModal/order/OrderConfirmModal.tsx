import confetti from 'canvas-confetti'
import { PartyPopper } from 'lucide-react'
import { FC, memo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { AppModal } from '@/components/appModal'
import { IModalInstance, MODAL_NAME, useGlobal } from '@/domains/global'
import { useOrderStore } from '@/domains/order'

interface IOrderConfirmModalProps extends IModalInstance {
  data?: {
    onClose?: () => void
  }
}

const OrderConfirmModal: FC<IOrderConfirmModalProps> = ({ isOpen, data }) => {
  const { t } = useTranslation()

  const { closeModal } = useGlobal()

  const { resetOrder } = useOrderStore()

  useEffect(() => {
    if (isOpen) {
      const duration = 3000
      const animationEnd = Date.now() + duration
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min
      }

      const interval: any = setInterval(() => {
        const timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) {
          return clearInterval(interval)
        }

        const particleCount = 50 * (timeLeft / duration)

        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      }, 250)

      return () => clearInterval(interval)
    }
  }, [isOpen])

  const handleModalClose = () => {
    closeModal(MODAL_NAME.orderConfirm)
    resetOrder()
  }

  return (
    <AppModal
      open={isOpen}
      onOpenChange={handleModalClose}
      className="sm:max-w-[425px] px-8 pt-6 pb-12"
    >
      <div className="flex flex-col items-center text-center">
        {/* Success Icon */}
        <div className="rounded-full bg-green-100 p-3 mb-4">
          <PartyPopper className="h-8 w-8 p-1 text-green-600" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-6">
          {t('modal.orderSuccess.title')}
        </h2>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          {t('modal.orderSuccess.description')}
        </p>

        {/* Phone Reminder */}
        <div className="bg-blue-50 rounded-lg p-4 w-full">
          <div className="flex items-center gap-3">
            <p className="text-sm text-blue-700">
              {t('modal.orderSuccess.phoneNotice')}
            </p>
          </div>
        </div>
      </div>
    </AppModal>
  )
}

export default memo(OrderConfirmModal)
export type { IOrderConfirmModalProps }
