import axios from 'axios'

// Đổi BASE_API_URL thành URL của Google Apps Script Web App sau khi deploy
const BASE_API_URL = import.meta.env.VITE_BASE_API_URL

const createAPIInstance = () => {
  const instance = axios.create({
    baseURL: BASE_API_URL,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded', // Quan trọng: Google Apps Script expect this
      Accept: 'application/json',
    },
    withCredentials: false,
  })

  // Transform request data thành format mà Google Apps Script có thể xử lý
  instance.interceptors.request.use(
    async (config) => {
      if (config.method === 'post' && config.data) {
        // Convert data object thành URLSearchParams
        const params = new URLSearchParams()
        Object.keys(config.data).forEach((key) => {
          params.append(key, config.data[key])
        })
        config.data = params
      }
      return config
    },
    (error) => {
      if (error instanceof Error) {
        return Promise.reject(error)
      }
      return Promise.reject(new Error(error?.message))
    },
  )

  // Xử lý response
  instance.interceptors.response.use(
    (response) => {
      return response.data
    },
    (error) => {
      console.error('Request failed:', error)
      return Promise.reject(
        new Error(error?.response?.data?.message || 'Request failed'),
      )
    },
  )

  return instance
}

// Service để gọi API
const juiceOrderService = {
  submitOrder: async (orderData: any) => {
    try {
      const api = createAPIInstance()
      const response = await api.post('', orderData)
      return response
    } catch (error: any) {
      throw new Error(error.message)
    }
  },
}

export { createAPIInstance, juiceOrderService }
