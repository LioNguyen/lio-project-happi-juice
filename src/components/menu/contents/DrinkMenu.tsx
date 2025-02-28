import { isEqual } from 'lodash'
import { Plus } from 'lucide-react'
import { FC, memo } from 'react'

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
import { IComponentBase } from '@/shared/types'
import { cn, formatNumber } from '@/shared/utils'

interface IDrinkMenuProps extends IComponentBase {}

interface IDrinkCardProps {
  drink: IMenuItem
  quantity: number
  onAddDrink: (e: React.MouseEvent) => void
}

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

const DrinkImage = memo(({ image, name }: { image: string; name: string }) => (
  <div className="aspect-video relative">
    <img src={image} alt={name} className="object-cover w-full h-full" />
  </div>
))

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
      className={cn(
        'flex items-center justify-center',
        'h-7 w-7 md:h-9 md:w-9 rounded-full',
        'transition-all duration-200 cursor-pointer',
        quantity > 0 ? 'bg-green-100' : 'hover:bg-green-100',
      )}
    >
      {quantity > 0 ? (
        <span className="text-primary text-sm lg:text-base font-semibold">
          {quantity}
        </span>
      ) : (
        <Plus className="text-primary w-5 h-5" />
      )}
    </div>
  ),
)

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
          <Text as="p" className="text-primary font-bold text-sm md:text-base">
            {formatNumber(drink.price)}đ
          </Text>
          <AddButton quantity={quantity} onClick={onAddDrink} />
        </div>
      </CardContent>
    </div>
  ),
)

const DrinkCard = memo(({ drink, quantity, onAddDrink }: IDrinkCardProps) => (
  <Card
    role="button"
    key={drink.id}
    className={cn(
      'overflow-hidden hover:shadow-lg transition-all',
      'cursor-pointer flex flex-col',
      'active:scale-[0.99] duration-100',
      'min-h-[320px] md:min-h-[320px]',
    )}
  >
    <DrinkImage image={drink.image} name={drink.name} />
    <DrinkContent drink={drink} quantity={quantity} onAddDrink={onAddDrink} />
  </Card>
))

const DrinkMenu: FC<IDrinkMenuProps> = ({ className }) => {
  const { addOrder, orders } = useOrderStore()

  const handleAddDrink = (e: React.MouseEvent, drink: IMenuItem) => {
    e.stopPropagation()
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

  return (
    <div className={cn('drink-menu h-full', className)}>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
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
