import { isEqual } from 'lodash'
import { Plus } from 'lucide-react'
import { FC, memo } from 'react'

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@designSystem/components/card'
import { Text } from '@designSystem/components/text'

import { IMenuItem, useMenuStore } from '@/domains/menu'
import { IOrderItem, useOrderStore } from '@/domains/order'
import { IComponentBase } from '@/shared/types'
import { cn, formatNumber } from '@/shared/utils'
import { Image } from '@designSystem/components/image'

// Types & Interfaces
interface IDrinkMenuProps extends IComponentBase {}

interface IDrinkCardProps {
  drink: IMenuItem
  quantity: number
  onAddDrink: (e: React.MouseEvent) => void
}

// Helper Functions
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

// Flame Icon Component - Thay Award bằng Flame
const BestsellerBadge = memo(() => (
  <div
    className={cn(
      'absolute top-1 right-2 z-10',
      'flex items-center justify-center',
      'text-xl drop-shadow-lg',
      'animate-pulse-subtle',
    )}
    style={{
      filter: 'drop-shadow(0 0 3px rgba(255,255,255,0.7))',
    }}
  >
    🔥
  </div>
))

// Thêm animation style mới
const globalStyles = `  
  @keyframes pulse-subtle {  
    0%, 100% { opacity: 1; transform: scale(1); }  
    50% { opacity: 0.95; transform: scale(1.05); }  
  }  
  .animate-pulse-subtle {  
    animation: pulse-subtle 2s infinite ease-in-out;  
  }  
`

// Components
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
        'h-6 w-6 md:h-7 md:w-7 rounded-full',
        'transition-all duration-200 cursor-pointer',
        'bg-white shadow-sm',
        quantity > 0 ? 'bg-green-100' : 'hover:bg-green-100',
      )}
    >
      {quantity > 0 ? (
        <span className="text-primary text-xs font-semibold">{quantity}</span>
      ) : (
        <Plus className="text-primary w-3.5 h-3.5" />
      )}
    </div>
  ),
)

const PriceTag = memo(({ price }: { price: number }) => (
  <Text as="p" className="text-white font-bold text-sm drop-shadow-md">
    {formatNumber(price)}đ
  </Text>
))

const DrinkImageOverlay = memo(
  ({
    drink,
    quantity,
    onAddDrink,
  }: {
    drink: IMenuItem
    quantity: number
    onAddDrink: (e: React.MouseEvent) => void
  }) => {
    return (
      <div className="relative min-h-[150px]">
        {/* Hiển thị Flame icon trong góc hình ảnh */}
        {drink.isBestSeller && <BestsellerBadge />}

        <Image
          src={drink.image}
          alt={drink.name}
          className={cn('object-cover w-full h-full')}
        />
        <div
          className={cn(
            'absolute bottom-0 left-0 right-0',
            'px-2.5 py-2',
            'bg-gradient-to-t from-black/60 via-black/30 to-transparent',
          )}
        >
          <div className="flex justify-between items-center">
            <PriceTag price={drink.price} />
            <AddButton quantity={quantity} onClick={onAddDrink} />
          </div>
        </div>
      </div>
    )
  },
)

const DrinkContent = memo(({ drink }: { drink: IMenuItem }) => (
  <div className="flex flex-col flex-1">
    <CardHeader className="p-2 space-y-2">
      <CardTitle className="leading-tight font-semibold text-base text-primary">
        {drink.name}
      </CardTitle>
      <CardDescription className="text-xs leading-snug">
        {drink.description}
      </CardDescription>
    </CardHeader>
  </div>
))

const DrinkCard = memo(({ drink, quantity, onAddDrink }: IDrinkCardProps) => (
  <Card
    role="button"
    key={drink.id}
    className={cn(
      'overflow-hidden',
      'cursor-pointer flex flex-col',
      'hover:shadow-lg transition-all duration-200',
      'active:scale-[0.99]',
      'bg-white rounded-xl',
    )}
  >
    <DrinkImageOverlay
      drink={drink}
      quantity={quantity}
      onAddDrink={onAddDrink}
    />
    <DrinkContent drink={drink} />
  </Card>
))

// Main Component
const DrinkMenu: FC<IDrinkMenuProps> = ({ className, onChange }) => {
  const { filteredMenu } = useMenuStore()
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

    onChange?.()
  }

  return (
    <>
      {/* Thêm style toàn cục cho animation */}
      <style>{globalStyles}</style>

      <div className={cn('drink-menu w-full h-full relative', className)}>
        <div
          className={cn(
            'grid gap-3',
            'grid-cols-2 md:grid-cols-3 2xl:grid-cols-4',
            'auto-rows-fr pr-4',
            'custom-scrollbar',
          )}
        >
          {filteredMenu.map((drink) => (
            <DrinkCard
              key={drink.id}
              drink={drink}
              quantity={getQuantityForDrink(drink.name, orders.items)}
              onAddDrink={(e) => handleAddDrink(e, drink)}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default memo(DrinkMenu, isEqual)
export type { IDrinkMenuProps }
