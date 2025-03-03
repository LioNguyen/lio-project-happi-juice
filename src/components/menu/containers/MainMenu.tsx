/* eslint-disable react-hooks/exhaustive-deps */
import { isEqual } from 'lodash'
import { ArrowUp, ShoppingCart } from 'lucide-react'
import { FC, memo, useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { DrinkMix, DrinkMixMobile } from '@/components/form'
import { DrinkFilterMobile } from '@/components/form/menu'
import { DrinkMenu } from '@/components/menu/contents'
import { SHEET_NAME, useGlobal } from '@/domains/global'
import { useOrderStore } from '@/domains/order'
import {
  MIXED_DRINK_MAX,
  MIXED_DRINK_MIN,
  MIXED_DRINK_PRICE,
} from '@/shared/constants'
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

const MainMenu: FC<IMainMenuProps> = () => {
  const { t } = useTranslation()
  const { openSheet } = useGlobal()
  const { addOrder, orders } = useOrderStore()
  const isMobile = useIsMobile()

  // Refs
  const mainMenuRef = useRef<HTMLDivElement>(null)
  const menuScrollRef = useRef<HTMLDivElement>(null)

  // States
  const [drinkMenuHeight, setDrinkMenuHeight] = useState<number>(0)
  const [showScrollToTop, setShowScrollToTop] = useState<boolean>(false)

  // Calculate menu height on resize
  useEffect(() => {
    const calculateDrinkMenuHeight = () => {
      if (!mainMenuRef.current) return
      const mainMenuHeight = mainMenuRef.current.clientHeight
      // Minimum height 200px
      setDrinkMenuHeight(Math.max(mainMenuHeight - (isMobile ? 60 : 100), 200))
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

  // Track scroll position to show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (!menuScrollRef.current) return

      const scrollTop = menuScrollRef.current.scrollTop
      // Show button when scrolled down more than 200px
      setShowScrollToTop(scrollTop > 200)
    }

    const menuElement = menuScrollRef.current
    if (menuElement) {
      menuElement.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (menuElement) {
        menuElement.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  // Handle scroll to top action
  const handleScrollToTop = () => {
    if (!menuScrollRef.current) return

    menuScrollRef.current.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  // Handle adding mixed drinks to order
  const handleAddMixedDrink = useCallback(
    (items: DrinkOption[]) => {
      if (items.length < MIXED_DRINK_MIN || items.length > MIXED_DRINK_MAX)
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

  // Handle drink selections
  const handleDrinkChange = useCallback(
    (newItem: SelectedDrinks) => {
      if (
        newItem.items.length >= MIXED_DRINK_MIN &&
        newItem.items.length <= MIXED_DRINK_MAX
      ) {
        handleAddMixedDrink(newItem.items)
      }
    },
    [handleAddMixedDrink],
  )

  const renderMenuContent = () => {
    return (
      <div className="flex-1 min-h-0 lg:mt-1">
        {/* Mobile Controls */}
        <div className="flex lg:hidden items-center justify-between px-1 mb-3">
          <div className="flex items-center gap-1">
            <DrinkMixMobile onChange={handleDrinkChange} />
          </div>
          <div className="flex items-center gap-1">
            <DrinkFilterMobile />
          </div>
        </div>

        {/* Desktop Controls */}
        <div className="hidden lg:flex items-center justify-between px-1 mb-3">
          <div className="flex items-center justify-end gap-1">
            <DrinkMix className="w-fit" />
          </div>
        </div>

        {/* Menu Items Container */}
        <div
          ref={menuScrollRef}
          className="h-full rounded-xl overflow-y-auto custom-scrollbar"
          style={{ height: `${drinkMenuHeight}px` }}
        >
          <DrinkMenu className="pb-4" />
        </div>
      </div>
    )
  }

  const renderActionButtons = () => {
    return (
      <div className="fixed right-6 bottom-16 flex flex-col items-center gap-2 z-20 lg:hidden">
        {/* Scroll to top button - appears when scrolled down */}
        {showScrollToTop && (
          <Button
            className="rounded-full bg-gray-600 hover:bg-gray-700 text-white shadow-md w-9 h-9 p-0"
            size="icon"
            onClick={handleScrollToTop}
          >
            <ArrowUp size={18} />
          </Button>
        )}

        {/* Shopping cart button */}
        <Button
          className="relative rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-lg w-12 h-12 p-0"
          size="icon"
          onClick={() => {
            openSheet({ name: SHEET_NAME.orderFormMobile })
          }}
        >
          <ShoppingCart size={20} />
          {orders.items.length > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs font-bold bg-teal-500 border-2 border-white shadow-sm text-white rounded-full">
              {orders.items.length}
            </Badge>
          )}
        </Button>
      </div>
    )
  }

  return (
    <div ref={mainMenuRef} className="flex flex-col h-full">
      {/* Title - visible only on desktop */}
      <Text
        as="h1"
        className="hidden lg:block lg:text-3xl font-bold text-center lg:mt-0"
      >
        {t('menu.drinks_menu')}
      </Text>

      {/* Menu Content */}
      {renderMenuContent()}

      {/* Floating Action Buttons - visible only on mobile */}
      {renderActionButtons()}
    </div>
  )
}

const MemoizedMainMenu = memo(MainMenu, isEqual)

export default MemoizedMainMenu
export type { IMainMenuProps }
