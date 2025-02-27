import { isEqual } from 'lodash'
import { Plus } from 'lucide-react'
import { memo } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@designSystem/components/card'
import { Text } from '@designSystem/components/text'

import {
  DRINK_MENU,
  IMenuItem,
  IOrderItem,
  useOrderStore,
} from '@/domains/order'
import { formatNumber } from '@/shared/utils'

interface IDrinkMenuProps {}

interface IDrinkCardProps {
  drink: IMenuItem
  quantity: number
  onAddDrink: (e: React.MouseEvent) => void
}

// ==================== Utility Functions ====================
/**
 * Calculate total quantity for a specific drink from orders
 */
const getQuantityForDrink = (
  drinkName: string,
  orders: IOrderItem[],
): number => {
  return orders.reduce((total, order) => {
    if (order.name === drinkName) {
      return total + order.quantity
    }
    return total
  }, 0)
}

// ==================== Component Functions ====================
/**
 * Renders the drink image with proper aspect ratio
 */
const DrinkImage = memo(({ image, name }: { image: string; name: string }) => (
  <div className="aspect-video relative">
    <img src={image} alt={name} className="object-cover w-full h-full" />
  </div>
))

/**
 * Button component for adding drinks to order
 */
const AddButton = memo(
  ({
    quantity,
    onClick,
  }: {
    quantity: number
    onClick: (e: React.MouseEvent) => void
  }) => (
    <div
      onClick={onClick}
      className={`
        flex items-center justify-center 
        h-8 w-8 md:h-9 md:w-9 rounded-full
        ${quantity > 0 ? 'bg-green-100' : 'hover:bg-green-100'}
        transition-all duration-200
        cursor-pointer
      `}
    >
      {quantity > 0 ? (
        <span className="text-green-600 font-semibold">{quantity}</span>
      ) : (
        <Plus className="text-green-600 w-5 h-5" />
      )}
    </div>
  ),
)

/**
 * Displays drink information and add button
 */
const DrinkContent = memo(
  ({
    drink,
    quantity,
    onAddDrink,
  }: {
    drink: IMenuItem
    quantity: number
    onAddDrink: (e: React.MouseEvent) => void
  }) => (
    <div className="flex flex-col flex-1">
      <CardHeader className="p-3 md:p-4">
        <CardTitle className="text-base md:text-lg">{drink.name}</CardTitle>
        <CardDescription className="mt-1 text-xs md:text-sm">
          {drink.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-auto p-3 md:p-4 border-t">
        <div className="flex justify-between items-center">
          <Text
            as="p"
            className="text-green-600 font-bold text-sm md:text-base"
          >
            {formatNumber(drink.price)}đ
          </Text>
          <AddButton quantity={quantity} onClick={onAddDrink} />
        </div>
      </CardContent>
    </div>
  ),
)

/**
 * Individual drink card component
 */
const DrinkCard = memo(({ drink, quantity, onAddDrink }: IDrinkCardProps) => (
  <Card
    role="button"
    key={drink.id}
    className={`
      overflow-hidden hover:shadow-lg transition-all 
      cursor-pointer flex flex-col min-h-[300px]
      active:scale-[0.99] duration-100
    `}
  >
    <DrinkImage image={drink.image} name={drink.name} />
    <DrinkContent drink={drink} quantity={quantity} onAddDrink={onAddDrink} />
  </Card>
))

/**
 * Main drink menu component displaying all available drinks
 */
function DrinkMenu() {
  // ==================== Hooks ====================
  const { addOrder, orders } = useOrderStore()

  // ==================== Handlers ====================
  const handleAddDrink = (e: React.MouseEvent, drink: IMenuItem) => {
    e.stopPropagation() // Prevent card click when adding drink
    addOrder({
      name: drink.name,
      value: drink.value,
      quantity: 1,
      price: drink.price,
      date: '',
      note: '',
      contact: '',
      orderedBy: '',
    })
  }

  // ==================== Render ====================
  return (
    <div className="drink-menu pr-2 md:pr-4">
      <div className="grid grid-cols-2 md:grid-cols-3  gap-3 md:gap-4">
        {DRINK_MENU.map((drink) => (
          <DrinkCard
            key={drink.id}
            drink={drink}
            quantity={getQuantityForDrink(drink.name, orders.items)}
            onAddDrink={(e) => handleAddDrink(e, drink)}
          />
        ))}
      </div>
    </div>
  )
}

export default memo(DrinkMenu, isEqual)
export type { IDrinkMenuProps }
