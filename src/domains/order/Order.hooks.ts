import { useMutation } from '@tanstack/react-query'

import { OrderService } from './Order.service'
import { ICreateOrderRequestData } from './Order.types'

const orderService = new OrderService()

function useOrder() {
  const useCreateOrder = () => {
    return useMutation({
      mutationFn: (data: ICreateOrderRequestData[]) =>
        orderService.createOrder(data),
      onSuccess: () => {
        // showToast({
        //   message: t('successful'),
        //   type: 'success',
        // })
      },
    })
  }

  return { useCreateOrder }
}

export { useOrder }
