import _ from 'lodash'
import { Check, Filter, X } from 'lucide-react'
import { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useMenuStore } from '@/domains/menu'
import { cn } from '@/shared/utils'
import { Badge } from '@designSystem/components/badge'
import { Button } from '@designSystem/components/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@designSystem/components/sheet'
import { Text } from '@designSystem/components/text'

// Types and interfaces
interface FilterOption {
  id: string
  label: string
  type: 'value' | 'bestSeller'
  value?: string
}

interface IDrinkFilterMobileProps {
  className?: string
}

/**
 * DrinkFilterMobile Component
 * A mobile-friendly drink filter component that allows users to filter drinks by mix types and best sellers.
 */
const DrinkFilterMobile = ({ className }: IDrinkFilterMobileProps) => {
  // Hooks
  const { t } = useTranslation()
  const { menu, filterMenu } = useMenuStore()

  // State
  const [open, setOpen] = useState<boolean>(false)
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  // Constants
  const FILTER_OPTIONS: FilterOption[] = [
    {
      id: 'best-seller',
      label: t('menu.filter.options.best_seller'),
      type: 'bestSeller',
    },
    {
      id: 'mix-apple',
      label: t('menu.filter.options.mix_apple'),
      type: 'value',
      value: 'apple',
    },
    {
      id: 'mix-guava',
      label: t('menu.filter.options.mix_guava'),
      type: 'value',
      value: 'guava',
    },
  ]

  /**
   * Handles the sheet open/close events
   */
  const handleSheetChange = useCallback((isOpen: boolean) => {
    setOpen(isOpen)
  }, [])

  /**
   * Applies filter based on the selected option
   */
  const applyFilter = useCallback(
    (option: FilterOption) => {
      let filteredItems = menu

      if (option.type === 'value' && option.value) {
        filteredItems = menu.filter((item) => {
          const values = item.value.split(',')
          return values.includes(option.value!)
        })
      } else if (option.type === 'bestSeller') {
        filteredItems = menu.filter((item) => item.isBestSeller)
      }

      filterMenu(filteredItems)
    },
    [menu, filterMenu],
  )

  /**
   * Handles filter selection
   */
  const handleFilter = useCallback(
    (option: FilterOption) => {
      if (activeFilter === option.id) {
        // If clicking active filter, reset
        setActiveFilter(null)
        filterMenu(menu)
      } else {
        // Apply new filter
        setActiveFilter(option.id)
        applyFilter(option)
      }
    },
    [activeFilter, menu, filterMenu, applyFilter],
  )

  /**
   * Handles resetting all filters
   */
  const handleReset = useCallback(
    (e?: React.MouseEvent) => {
      if (e) {
        e.stopPropagation() // Prevent triggering sheet open
      }
      setActiveFilter(null)
      filterMenu(menu)
      setOpen(false)
    },
    [menu, filterMenu],
  )

  /**
   * Renders individual filter option
   */
  const renderFilterOption = (option: FilterOption) => {
    const isSelected = activeFilter === option.id

    return (
      <div
        key={option.id}
        className={cn(
          'flex items-center justify-between p-2 rounded-lg transition-colors cursor-pointer',
          isSelected ? 'bg-orange-100' : 'hover:bg-orange-50',
        )}
        onClick={() => handleFilter(option)}
      >
        <Text as="span" className="font-medium">
          {option.label}
        </Text>
        {isSelected && <Check className="h-5 w-5 text-orange-500" />}
      </div>
    )
  }

  return (
    <div className={cn('w-fit', className)}>
      <Sheet open={open} onOpenChange={handleSheetChange}>
        {/* Trigger Button */}
        <SheetTrigger asChild>
          <Button
            className="relative p-2 rounded-full bg-primary/10 text-primary w-9 lg:hidden hover:bg-primary/10"
            size="icon"
          >
            <Filter className="h-5 w-5" />
            {activeFilter && (
              <Badge
                className="absolute -top-1.5 -right-1.5 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-teal-500 border border-white shadow-sm text-white rounded-full cursor-pointer hover:bg-teal-600"
                onClick={handleReset}
              >
                <X className="h-3 w-3" />
              </Badge>
            )}
          </Button>
        </SheetTrigger>

        {/* Bottom Sheet Content */}
        <SheetContent
          side="bottom"
          className="h-[40vh] p-0 rounded-t-2xl flex flex-col"
        >
          {/* Header */}
          <div className="px-4 py-4 border-b">
            <SheetHeader>
              <SheetTitle className="flex items-center justify-center">
                <Text as="span">{t('menu.filter.sheet_title')}</Text>
              </SheetTitle>
            </SheetHeader>
          </div>

          {/* Filter Options List */}
          <div className="flex-1 overflow-y-auto px-4 py-2">
            <div className="space-y-2">
              {FILTER_OPTIONS.map(renderFilterOption)}
            </div>
          </div>

          {/* Action Footer */}
          <div className="border-t p-4 bg-white">
            <Button
              className="w-full"
              onClick={() => handleReset()}
              disabled={!activeFilter}
            >
              <Text as="span" className="text-inherit">
                {t('menu.filter.reset_button')}
              </Text>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default memo(DrinkFilterMobile, _.isEqual)
export type { IDrinkFilterMobileProps }
