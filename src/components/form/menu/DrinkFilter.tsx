import _ from 'lodash'
import { ArrowDown, ArrowUp, ArrowUpDown, X } from 'lucide-react' // Thêm X vào imports
import { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useMenuStore } from '@/domains/menu'
import { IComponentBase } from '@/shared/types'
import { cn } from '@/shared/utils'
import { Badge } from '@designSystem/components/badge'
import { Button } from '@designSystem/components/button'

// Types and interfaces
interface FilterOption {
  id: string
  label: string
  type: 'value' | 'bestSeller'
  value?: string
}

type SortOrder = 'none' | 'asc' | 'desc'

interface IDrinkFilterProps extends IComponentBase {}

// Enhanced DrinkFilter component
const DrinkFilter = ({ className }: IDrinkFilterProps) => {
  // Hooks
  const { t } = useTranslation()
  const { menu, filterMenu } = useMenuStore()

  // State
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<SortOrder>('none')

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
   * Applies filter and sort based on the selected option and sort order
   */
  const applyFilterAndSort = useCallback(
    (option: FilterOption | null, order: SortOrder) => {
      let filteredItems = [...menu]

      // Apply filter if option is provided
      if (option) {
        if (option.type === 'value' && option.value) {
          filteredItems = filteredItems.filter((item) => {
            const values = item.value.split(',')
            return values.includes(option.value!)
          })
        } else if (option.type === 'bestSeller') {
          filteredItems = filteredItems.filter((item) => item.isBestSeller)
        }
      }

      // Apply sorting
      if (order === 'asc') {
        filteredItems = _.sortBy(filteredItems, ['price'])
      } else if (order === 'desc') {
        filteredItems = _.sortBy(filteredItems, ['price']).reverse()
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
        // If clicking active filter, reset filter but keep sort
        setActiveFilter(null)
        applyFilterAndSort(null, sortOrder)
      } else {
        // Apply new filter with current sort
        setActiveFilter(option.id)
        applyFilterAndSort(option, sortOrder)
      }
    },
    [activeFilter, sortOrder, applyFilterAndSort],
  )

  /**
   * Renders individual filter option as a badge
   */
  const renderFilterBadge = (option: FilterOption) => {
    const isSelected = activeFilter === option.id

    return (
      <Badge
        key={option.id}
        className={cn(
          'cursor-pointer transition-all duration-200 whitespace-nowrap',
          'flex items-center gap-1.5',
          'py-1 px-3 rounded-full font-medium border-0 text-sm',
          isSelected
            ? 'bg-primary text-white'
            : 'bg-primary/5 text-primary hover:bg-primary/15',
        )}
        onClick={() => handleFilter(option)}
      >
        {option.label}
        {isSelected && <X className="h-3 w-3 ml-1" />}
      </Badge>
    )
  }

  return (
    <div className={cn('block', className)}>
      <div className="flex items-center gap-2">
        {FILTER_OPTIONS.map(renderFilterBadge)}
      </div>
    </div>
  )
}

export default memo(DrinkFilter, _.isEqual)
export type { IDrinkFilterProps }
