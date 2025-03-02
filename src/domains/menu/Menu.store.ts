import { create } from 'zustand'

import { DRINK_MENU } from './Menu.constants'
import { IMenuItem, IMenuStore } from './Menu.types'

const useMenuStore = create<IMenuStore>((set) => ({
  // Initial state
  menu: DRINK_MENU,
  filteredMenu: DRINK_MENU,

  // Create new menu items
  createMenu: (items: IMenuItem[]) => {
    set((state) => ({
      menu: [...state.menu, ...items],
      filteredMenu: [...state.menu, ...items], // Update filteredMenu as well
    }))
  },

  // Filter menu items
  filterMenu: (items: IMenuItem[]) => {
    set(() => ({
      filteredMenu: items,
    }))
  },

  // Update existing menu item
  updateMenu: (menuId: string, updatedItem: Partial<IMenuItem>) => {
    set((state) => {
      const updatedMenu = state.menu.map((item) =>
        item.id === menuId ? { ...item, ...updatedItem } : item,
      )

      return {
        menu: updatedMenu,
        filteredMenu: updatedMenu, // Update filteredMenu to reflect changes
      }
    })
  },

  // Remove menu item
  removeMenu: (menuId: string) => {
    set((state) => {
      const updatedMenu = state.menu.filter((item) => item.id !== menuId)

      return {
        menu: updatedMenu,
        filteredMenu: updatedMenu, // Update filteredMenu to reflect changes
      }
    })
  },

  // Reset menu to initial state
  resetMenu: () => {
    set({
      menu: DRINK_MENU,
      filteredMenu: DRINK_MENU,
    })
  },
}))

export { useMenuStore }
