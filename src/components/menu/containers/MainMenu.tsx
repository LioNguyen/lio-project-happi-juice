import { isEqual } from 'lodash'
import { Info, ShoppingCart } from 'lucide-react'
import { FC, memo, useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { DrinkMultiSelect } from '@/components/form'
import { DrinkMenu } from '@/components/menu/contents'
import { SHEET_NAME, useGlobal } from '@/domains/global'
import { DRINK_MENU, DRINK_TYPE, useOrderStore } from '@/domains/order'
import { MIXED_DRINK_PRICE } from '@/shared/constants'
import { useIsMobile } from '@/shared/hooks/useMobile'
import { transformToSortedString } from '@/shared/utils'
import { Badge } from '@designSystem/components/badge'
import { Button } from '@designSystem/components/button'
import { Text } from '@designSystem/components/text'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@designSystem/components/tooltip'

interface IMainMenuProps {}

type DrinkOption = {
  value: string
  label: string
}

interface SelectedDrinks {
  items: DrinkOption[]
  quantity: number
  note: string
  price: number
}

const MAX_MIXED_ITEMS = 3
const MIN_MIXED_ITEMS = 1

const MainMenu: FC<IMainMenuProps> = () => {
  const { t } = useTranslation()

  const { openSheet } = useGlobal()
  const { addOrder, orders } = useOrderStore()

  const mainMenuRef = useRef<HTMLDivElement>(null)
  const [drinkMenuHeight, setDrinkMenuHeight] = useState<number>(0)
  const isMobile = useIsMobile()

  useEffect(() => {
    const calculateDrinkMenuHeight = () => {
      if (!mainMenuRef.current) return
      const mainMenuHeight = mainMenuRef.current.clientHeight
      setDrinkMenuHeight(Math.max(mainMenuHeight - (isMobile ? 190 : 220), 200)) // Minimum height 200px
    }

    calculateDrinkMenuHeight()

    const resizeObserver = new ResizeObserver(calculateDrinkMenuHeight)
    if (mainMenuRef.current) {
      resizeObserver.observe(mainMenuRef.current)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [isMobile])

  const DRINK_OPTIONS = DRINK_MENU.filter(
    (drink) => drink.type === DRINK_TYPE.original,
  ).map((drink) => ({
    value: drink.value,
    label: drink.name,
  }))

  const handleAddMixedDrink = useCallback(
    (items: DrinkOption[]) => {
      if (items.length < MIN_MIXED_ITEMS || items.length > MAX_MIXED_ITEMS)
        return

      addOrder({
        name: transformToSortedString(items, 'label', ' + '),
        value: transformToSortedString(items),
        quantity: 1,
        price: MIXED_DRINK_PRICE,
        date: '',
        note: '',
        contact: '',
        orderedBy: '',
      })
    },
    [addOrder],
  )

  const handleDrinkChange = useCallback(
    (newItem: SelectedDrinks) => {
      if (
        newItem.items.length >= MIN_MIXED_ITEMS &&
        newItem.items.length <= MAX_MIXED_ITEMS
      ) {
        handleAddMixedDrink(newItem.items)
      }
    },
    [handleAddMixedDrink],
  )

  // renderMixDrinkSection
  const renderMixDrinkSection = () => (
    <div className="bg-[#FFF9F5] rounded-lg shadow-sm border border-[#FFE4D9] mt-8 lg:mt-0">
      <div className="p-4">
        <div className="hidden lg:flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Text
              as="h2"
              className="text-sm md:text-base font-bold text-[#C4361D]"
            >
              {t('menu.mix_drink.title')}
            </Text>
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info
                    size={16}
                    className="text-[#F85C2C] hidden lg:block cursor-help"
                  />
                </TooltipTrigger>
                <TooltipContent
                  className="max-w-[280px] font-semibold"
                  side="right"
                  sideOffset={5}
                >
                  <Text className="text-sm text-inherit">
                    {t('menu.mix_drink.info_tooltip', {
                      min: MIN_MIXED_ITEMS,
                      max: MAX_MIXED_ITEMS,
                    })}
                  </Text>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Text
            as="span"
            className="text-xs md:text-sm font-semibold text-[#F85C2C]"
          >
            {MIXED_DRINK_PRICE.toLocaleString()}
            {t('menu.mix_drink.price_unit')}
          </Text>
        </div>

        <DrinkMultiSelect
          placeholder={t('menu.mix_drink.placeholder')}
          options={DRINK_OPTIONS}
          onChange={handleDrinkChange}
          className="w-full"
        />
      </div>
    </div>
  )

  const renderMenuSection = () => (
    <div className="flex-1 min-h-0 mt-4">
      <div className="flex items-center justify-between px-1 mb-3">
        <Text as="h2" className="text-base font-semibold">
          {t('menu.title')}
        </Text>

        <Button
          className="relative p-2 rounded-full bg-primary/10 text-primary w-9 lg:hidden hover:bg-primary/10"
          onClick={() => {
            openSheet({ name: SHEET_NAME.orderFormMobile })
          }}
        >
          <ShoppingCart size={18} />
          {orders.items.length > 0 && (
            <Badge className="absolute -top-1.5 -right-1.5 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-teal-500 border border-white shadow-sm text-white rounded-full">
              {orders.items.length}
            </Badge>
          )}
        </Button>
      </div>

      <div
        className="h-full overflow-y-auto"
        style={{ height: `${drinkMenuHeight}px` }}
      >
        <DrinkMenu className="pb-4" />
      </div>
    </div>
  )

  return (
    <div ref={mainMenuRef} className="flex flex-col h-full">
      <Text
        as="h1"
        className="hidden lg:block lg:text-3xl font-bold text-center lg:mt-0 lg:mb-6"
      >
        {t('menu.drinks_menu')}
      </Text>

      {renderMixDrinkSection()}
      {renderMenuSection()}
    </div>
  )
}

const MemoizedMainMenu = memo(MainMenu, isEqual)

export default MemoizedMainMenu
export type { IMainMenuProps }
