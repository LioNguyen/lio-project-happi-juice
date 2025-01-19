import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { useGlobal } from '@/domains/global'
import { OrderService } from './Order.service'

const orderService = new OrderService()

function useOrder() {
  const { showToast } = useGlobal()
  const { t } = useTranslation()

  const useCreateOrder = () => {
    return useMutation({
      mutationFn: (data: any) => orderService.createOrder(data),
      onSuccess: () => {
        showToast({
          message: t('successful'),
          type: 'success',
        })
      },
    })
  }

  return { useCreateOrder }
}

export { useOrder }
