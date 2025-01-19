import { useMutation } from '@tanstack/react-query'
import { OrderService } from './Order.service'

const orderService = new OrderService()

function useOrder() {
  const useCreateOrder = () => {
    return useMutation({
      mutationFn: (data: any) => orderService.createOrder(data),
    })
  }

  return { useCreateOrder }
}

export { useOrder }
