import _ from 'lodash'
import { Check, FlaskConical } from 'lucide-react'
import { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { AppSheet } from '@/components/appSheet'
import { DRINK_TYPE, useMenuStore } from '@/domains/menu'
import { useOrderStore } from '@/domains/order'
import { MIXED_DRINK_MAX, MIXED_DRINK_PRICE } from '@/shared/constants'
import { cn, transformToSortedString } from '@/shared/utils'
import { Badge } from '@designSystem/components/badge'
import { Button } from '@designSystem/components/button'
import { Text } from '@designSystem/components/text'

// Types and interfaces
interface Option {
  value: string
  label: string
}

interface IDrinkMixMobileProps {
  onChange?: (newItem: {
    items: Option[]
    quantity: number
    note: string
    price: number
  }) => void
  className?: string
}

/**
 * DrinkMixMobile Component
 * A mobile-friendly drink mixer component that allows users to select and combine different drinks.
 * Supports up to 3 selections and displays them in a bottom sheet layout.
 */
const DrinkMixMobile = ({ className }: IDrinkMixMobileProps) => {
  // Hooks
  const { t } = useTranslation()
  const { addOrder } = useOrderStore()

  // State
  const [open, setOpen] = useState<boolean>(false)
  const [selectedItems, setSelectedItems] = useState<Option[]>([])

  const { menu } = useMenuStore()
  const DRINK_OPTIONS = menu
    .filter((drink) => drink.type === DRINK_TYPE.original)
    .map((drink) => ({
      value: drink.value,
      label: drink.name,
    }))

  /**
   * Resets the selection state
   */
  const resetSelection = useCallback(() => {
    setSelectedItems([])
  }, [])

  /**
   * Handles the sheet open/close events
   */
  const handleSheetChange = useCallback((isOpen: boolean) => {
    setOpen(isOpen)
  }, [])

  /**
   * Handles the selection/deselection of items
   */
  const handleSelect = useCallback((item: Option) => {
    setSelectedItems((prev) => {
      const isSelected = prev.some((i) => i.value === item.value)
      if (isSelected) {
        return prev.filter((i) => i.value !== item.value)
      }
      if (prev.length >= MIXED_DRINK_MAX) return prev
      return [...prev, item]
    })
  }, [])

  /**
   * Handles the mix action when user confirms their selection
   */
  const handleMix = useCallback(() => {
    if (selectedItems.length === 0) return

    addOrder({
      name: transformToSortedString(selectedItems, 'label', ' + '),
      value: transformToSortedString(selectedItems),
      quantity: 1,
      price: MIXED_DRINK_PRICE,
      date: '',
      note: '',
      contact: '',
      orderedBy: '',
    })

    resetSelection()
    setOpen(false)
  }, [selectedItems, addOrder, resetSelection])

  /**
   * Renders individual option item
   */
  const renderOptionItem = (option: Option) => {
    const isSelected = selectedItems.some((i) => i.value === option.value)
    const isDisabled = selectedItems.length >= MIXED_DRINK_MAX && !isSelected

    return (
      <div
        key={option.value}
        className={cn(
          'flex items-center justify-between p-2 rounded-lg transition-colors',
          isSelected
            ? 'bg-primary/10 text-primary hover:bg-primary/5'
            : 'hover:bg-primary/5',
          isDisabled && 'opacity-50 cursor-not-allowed',
        )}
        onClick={() => !isDisabled && handleSelect(option)}
      >
        <Text as="span" className="font-medium">
          {option.label}
        </Text>
        {isSelected && <Check className="h-5 w-5 text-primary" />}
      </div>
    )
  }

  return (
    <div className={cn('w-fit', className)}>
      <AppSheet
        open={open}
        onOpenChange={handleSheetChange}
        className="h-[50vh] flex flex-col"
        title={t('menu.mix_drink.sheet_title')}
        description=""
        trigger={
          <Button
            className="relative p-2 rounded-full bg-primary/10 text-primary w-9 hover:bg-primary/10"
            size="icon"
          >
            <FlaskConical className="h-5 w-5" />
            {selectedItems.length > 0 && (
              <Badge className="absolute -top-1.5 -right-1.5 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-teal-500 border border-white shadow-sm text-white rounded-full">
                {selectedItems.length}
              </Badge>
            )}
          </Button>
        }
        footer={
          <div className="bg-white">
            <Button
              className="w-full"
              disabled={selectedItems.length === 0}
              onClick={handleMix}
            >
              <Text as="span" className="text-inherit">
                {t('menu.mix_drink.mix_button', {
                  count: selectedItems.length,
                  max: MIXED_DRINK_MAX,
                })}
              </Text>
            </Button>
          </div>
        }
      >
        {/* Options List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="space-y-2">{DRINK_OPTIONS.map(renderOptionItem)}</div>
        </div>
      </AppSheet>
    </div>
  )
}

export default memo(DrinkMixMobile, _.isEqual)
export type { IDrinkMixMobileProps }
