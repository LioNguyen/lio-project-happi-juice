import { isEqual } from 'lodash'
import { Info, Sparkles } from 'lucide-react'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { DrinkMultiSelect } from '@/components/form'
import { DrinkMenu } from '@/components/menu/contents'
import { DRINK_MENU, useOrderStore } from '@/domains/order'
import { MIXED_DRINK_PRICE } from '@/shared/constants'
import { transformToSortedString } from '@/shared/utils'
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

function MainMenu() {
  const { t } = useTranslation()
  const { addOrder } = useOrderStore()
  const mainMenuRef = useRef<HTMLDivElement>(null)
  const [drinkMenuHeight, setDrinkMenuHeight] = useState<number>(0)

  useEffect(() => {
    const calculateDrinkMenuHeight = () => {
      if (!mainMenuRef.current) return
      const mainMenuHeight = mainMenuRef.current.clientHeight
      setDrinkMenuHeight(Math.max(mainMenuHeight - 507, 200)) // Minimum height 200px
    }

    calculateDrinkMenuHeight()

    const resizeObserver = new ResizeObserver(calculateDrinkMenuHeight)
    if (mainMenuRef.current) {
      resizeObserver.observe(mainMenuRef.current)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  const DRINK_OPTIONS = DRINK_MENU.map((drink) => ({
    value: drink.value,
    label: drink.name,
  }))

  const POPULAR_MIXES = [
    {
      name: `${t('menu.drinks.orange')} + ${t('menu.drinks.apple')}`,
      items: [
        { value: 'orange', label: t('menu.drinks.orange') },
        { value: 'apple', label: t('menu.drinks.apple') },
      ],
    },
    {
      name: `${t('menu.drinks.watermelon')} + ${t('menu.drinks.pineapple')}`,
      items: [
        { value: 'watermelon', label: t('menu.drinks.watermelon') },
        { value: 'pineapple', label: t('menu.drinks.pineapple') },
      ],
    },
  ]

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

  const handlePopularMixClick = useCallback(
    (items: DrinkOption[]) => {
      handleAddMixedDrink(items)
    },
    [handleAddMixedDrink],
  )

  const renderMixDrinkSection = () => (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl shadow-sm border border-purple-100">
      <div className="p-4 md:p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Text
              as="h2"
              className="text-base md:text-lg font-bold text-purple-900"
            >
              {t('menu.mix_drink.title')}
            </Text>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info size={16} className="text-purple-600" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm">
                    Mix từ {MIN_MIXED_ITEMS} đến {MAX_MIXED_ITEMS} loại đồ uống
                    để tạo thức uống độc đáo của riêng bạn
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Text as="span" className="text-sm font-medium text-purple-700">
            {MIXED_DRINK_PRICE.toLocaleString()}đ/ly
          </Text>
        </div>

        <div className="space-y-3">
          <DrinkMultiSelect
            placeholder={t('menu.mix_drink.placeholder')}
            options={DRINK_OPTIONS}
            onChange={handleDrinkChange}
            className="w-full"
          />

          <div className="pt-3 border-t border-purple-100">
            <div className="flex items-center gap-1.5 mb-2">
              <Sparkles size={14} className="text-amber-500" />
              <Text as="h3" className="text-sm font-medium text-gray-700">
                Mix phổ biến
              </Text>
            </div>
            <div className="flex flex-wrap gap-2">
              {POPULAR_MIXES.map((mix) => (
                <button
                  key={mix.name}
                  onClick={() => handlePopularMixClick(mix.items)}
                  className="px-3 py-1.5 text-sm bg-white rounded-full border border-purple-200   
                    hover:bg-purple-50 hover:border-purple-300 transition-colors  
                    text-purple-700"
                >
                  {mix.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderMenuSection = () => (
    <div className="p-3 md:p-4">
      <Text as="h2" className="text-base md:text-lg font-semibold mb-3 md:mb-4">
        {t('menu.title')}
      </Text>
      <div
        style={{ height: `${drinkMenuHeight}px` }}
        className="overflow-y-auto"
      >
        <DrinkMenu />
      </div>
    </div>
  )

  return (
    <div ref={mainMenuRef} className="main-menu h-screen">
      <Text as="h1" className="text-xl md:text-2xl font-bold text-center mb-6">
        {t('menu.drinks_menu')}
      </Text>

      {renderMixDrinkSection()}
      {renderMenuSection()}
    </div>
  )
}

export default memo(MainMenu, isEqual)
export type { IMainMenuProps }
