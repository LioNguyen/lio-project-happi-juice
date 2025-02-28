import { z } from 'zod'

import { orderItemSchema } from './Order.schema'

type IOrderItem = z.infer<typeof orderItemSchema>

interface IMenuItem
  extends Omit<
    IOrderItem,
    'contact' | 'date' | 'note' | 'orderedBy' | 'quantity'
  > {
  description: string
  image: string
  type: string
}

interface IOrderItemOld {
  items: Array<{
    value: string
    label: string
  }>
  quantity: number
  note: string
  price: number
}

interface ICreateOrderRequestData {
  items: string
  quantity: number
  note: string
  name: string
  contact: string
  date: string
}

interface ICreateOrderForm {
  name: string
  contact: string
  date: string
  items: IOrderItemOld[]
}

interface IOrderStore {
  orders: {
    contact: string
    orderedBy: string
    items: IOrderItem[]
  }
  addOrder: (order: Omit<IOrderItem, 'id'>) => void
  removeOrder: (id: string) => void
  updateOrderInfo: (
    info: Partial<{
      contact: string
      orderedBy: string
    }>,
  ) => void
  updateOrderItem: (id: string, itemUpdate: Partial<IOrderItem>) => void
  resetOrder: () => void
}

export type {
  ICreateOrderForm,
  ICreateOrderRequestData,
  IMenuItem,
  IOrderItem,
  IOrderItemOld,
  IOrderStore,
}
