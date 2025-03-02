// Interface definition for menu items
interface IMenuItem {
  // Basic Information
  id: string
  name: string
  value: string
  type: string
  description: string
  image: string

  // Pricing & Promotion
  price: number
  promotionalPrice: number | null
  discount: number // Percentage (0-100)

  // Display & Marketing
  isBestSeller: boolean
  priority: number // Lower number = Higher priority

  // Health & Diet
  isDietFriendly: boolean
  tags: string[]

  // Inventory
  inStock: boolean
}

interface IMenuStore {
  // Properties
  menu: IMenuItem[]
  filteredMenu: IMenuItem[]

  // Methods
  createMenu: (items: IMenuItem[]) => void
  filterMenu: (items: IMenuItem[]) => void
  updateMenu: (menuId: string, updatedItem: Partial<IMenuItem>) => void
  removeMenu: (menuId: string) => void
  resetMenu: () => void
}

export type { IMenuItem, IMenuStore }
