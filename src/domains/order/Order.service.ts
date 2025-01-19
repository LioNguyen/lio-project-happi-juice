class OrderService {
  public async createOrder(data: any): Promise<any> {
    const res = await fetch(import.meta.env.VITE_BASE_API_URL, {
      method: 'POST',
      mode: 'no-cors',
      redirect: 'follow',
      body: data,
    })

    return res
  }
}

export { OrderService }
