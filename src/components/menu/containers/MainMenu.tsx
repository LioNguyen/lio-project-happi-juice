/* eslint-disable react-hooks/exhaustive-deps */
import { isEqual } from 'lodash'
import { ShoppingCart } from 'lucide-react'
import { FC, memo, useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { DrinkMix, DrinkMixMobile } from '@/components/form'
import { DrinkFilterMobile } from '@/components/form/menu'
import { DrinkMenu } from '@/components/menu/contents'
import { SHEET_NAME, useGlobal } from '@/domains/global'
import { useOrderStore } from '@/domains/order'
import { MIXED_DRINK_PRICE } from '@/shared/constants'
import { useIsMobile } from '@/shared/hooks/useMobile'
import { transformToSortedString } from '@/shared/utils'
import { Badge } from '@designSystem/components/badge'
import { Button } from '@designSystem/components/button'
import { Text } from '@designSystem/components/text'

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

  const { closeSheet, openSheet } = useGlobal()
  const { addOrder, orders } = useOrderStore()

  const mainMenuRef = useRef<HTMLDivElement>(null)
  const [drinkMenuHeight, setDrinkMenuHeight] = useState<number>(0)
  const isMobile = useIsMobile()

  useEffect(() => {
    const calculateDrinkMenuHeight = () => {
      if (!mainMenuRef.current) return
      const mainMenuHeight = mainMenuRef.current.clientHeight
      setDrinkMenuHeight(Math.max(mainMenuHeight - (isMobile ? 60 : 100), 200)) // Minimum height 200px
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

  useEffect(() => {
    if (orders.items.length > 0) {
      openSheet({ name: SHEET_NAME.orderButtonCheck })
    } else {
      closeSheet(SHEET_NAME.orderButtonCheck)
    }
  }, [orders.items.length])

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

  const renderMenuSection = () => (
    <div className="flex-1 min-h-0 lg:mt-1">
      {/* Mobile View */}
      <div className="flex lg:hidden items-center justify-between lg:justify-between px-1 mb-3">
        <div className="flex items-center gap-1">
          <DrinkFilterMobile />
          <DrinkMixMobile onChange={handleDrinkChange} />
        </div>

        <div className="flex items-center gap-1">
          <Button
            className="relative p-2 rounded-full bg-primary/10 text-primary w-9 lg:hidden hover:bg-primary/10"
            size="icon"
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
      </div>

      {/* Desktop View */}
      <div className="hidden lg:flex items-center justify-between lg:justify-between px-1 mb-3">
        <div>{/* Filter icon */}</div>
        <div className="flex items-center justify-end gap-1">
          <DrinkMix className="w-fit" />
        </div>
      </div>

      <div
        className="h-full rounded-xl overflow-y-auto custom-scrollbar"
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
        className="hidden lg:block lg:text-3xl font-bold text-center lg:mt-0"
      >
        {t('menu.drinks_menu')}
      </Text>

      {renderMenuSection()}
    </div>
  )
}

const MemoizedMainMenu = memo(MainMenu, isEqual)

export default MemoizedMainMenu
export type { IMainMenuProps }
