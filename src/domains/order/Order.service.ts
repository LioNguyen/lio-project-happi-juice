import { ICreateOrderRequestData } from './Order.types'

class OrderService {
  public async createOrder(data: ICreateOrderRequestData[]): Promise<any> {
    const res = await fetch(import.meta.env.VITE_BASE_API_URL, {
      method: 'POST',
      mode: 'no-cors',
      redirect: 'follow',
      body: JSON.stringify(data),
    })

    return res
  }
}

export { OrderService }
