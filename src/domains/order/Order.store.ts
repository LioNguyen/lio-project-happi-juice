import { nanoid } from 'nanoid'
import { create } from 'zustand'

import { IOrderStore } from './Order.types'

const useOrderStore = create<IOrderStore>((set) => ({
  orders: {
    contact: '',
    orderedBy: '',
    items: [],
  },

  addOrder: (order) =>
    set((state) => {
      // Find order has the same name in items array
      const existingOrder = state.orders.items.find(
        (item) => item.name === order.name,
      )

      if (existingOrder) {
        // Update existed order quantity in items array
        return {
          orders: {
            ...state.orders,
            items: state.orders.items.map((item) =>
              item.id === existingOrder.id
                ? {
                    ...item,
                    quantity: item.quantity + order.quantity,
                  }
                : item,
            ),
          },
        }
      }

      // Create new order if not existed
      return {
        orders: {
          ...state.orders,
          items: [...state.orders.items, { ...order, id: nanoid() }],
        },
      }
    }),

  removeOrder: (id) =>
    set((state) => ({
      orders: {
        ...state.orders,
        items: state.orders.items.filter((item) => item.id !== id),
      },
    })),

  updateOrderInfo: (info) =>
    set((state) => ({
      orders: {
        ...state.orders,
        ...info,
      },
    })),

  updateOrderItem: (id, itemUpdate) =>
    set((state) => {
      const itemIndex = state.orders.items.findIndex((item) => item.id === id)

      // If item not found, return current state
      if (itemIndex === -1) {
        return state
      }

      // Update item
      const updatedItems = [...state.orders.items]
      updatedItems[itemIndex] = {
        ...updatedItems[itemIndex],
        ...itemUpdate,
      }

      return {
        orders: {
          ...state.orders,
          items: updatedItems,
        },
      }
    }),

  resetOrder: () =>
    set(() => ({
      orders: {
        contact: '',
        orderedBy: '',
        items: [],
      },
    })),
}))

export { useOrderStore }
