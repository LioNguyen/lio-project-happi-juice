import _ from 'lodash'
import { Check, FlaskConical } from 'lucide-react'
import { memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { AppPopover } from '@/components/appPopover'
import { DRINK_TYPE, useMenuStore } from '@/domains/menu'
import { useOrderStore } from '@/domains/order'
import { MIXED_DRINK_PRICE } from '@/shared/constants'
import { IComponentBase } from '@/shared/types'
import { cn, transformToSortedString } from '@/shared/utils'
import { Button } from '@designSystem/components/button'
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@designSystem/components/command'

// Types and interfaces
interface Option {
  value: string
  label: string
}

interface IDrinkMixProps extends IComponentBase {
  onChange?: (newItem: {
    items: Option[]
    quantity: number
    note: string
    price: number
  }) => void
}

const MAX_SELECTIONS = 3

// Enhanced DrinkMix component
const DrinkMix = ({ className }: IDrinkMixProps) => {
  const { t } = useTranslation()
  const [open, setOpen] = useState<boolean>(false)
  const [selectedItems, setSelectedItems] = useState<Option[]>([])

  const { addOrder } = useOrderStore()

  const { menu } = useMenuStore()
  const DRINK_OPTIONS = menu
    .filter((drink) => drink.type === DRINK_TYPE.original)
    .map((drink) => ({
      value: drink.value,
      label: drink.name,
    }))

  // Handling popover close on window resize
  useEffect(() => {
    const handleResize = () => {
      if (open) {
        setOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [open])

  const handleSelect = (item: Option) => {
    setSelectedItems((prev) => {
      const isSelected = prev.some((i) => i.value === item.value)
      if (isSelected) {
        return prev.filter((i) => i.value !== item.value)
      }
      if (prev.length >= MAX_SELECTIONS) return prev
      return [...prev, item]
    })
  }

  const handleAddOrder = () => {
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

    setSelectedItems([])
    setOpen(false)
  }

  return (
    <div className={cn('w-fit', className)}>
      <AppPopover
        className="p-0 w-[250px]"
        open={open}
        onOpenChange={setOpen}
        side="bottom"
        align="start"
        trigger={
          <Button
            className={cn(
              'relative h-9 gap-2 px-4 rounded-full shadow',
              'bg-primary/5 text-primary hover:bg-primary/15',
              'font-medium text-sm',
              'transition-all duration-200',
            )}
            size="sm"
          >
            <FlaskConical className="h-4 w-4" />
            <span>
              {t('menu.mix_drink.mix_button', {
                count: selectedItems.length,
                max: MAX_SELECTIONS,
              })}
            </span>
          </Button>
        }
      >
        <Command className="rounded-lg border-none shadow-lg">
          <div className="py-2 px-3 border-b">
            <h3 className="text-base font-semibold text-primary">
              {t('menu.mix_drink.title')}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {t('menu.mix_drink.select_up_to', { max: MAX_SELECTIONS })}
            </p>
          </div>
          <CommandList className="px-2">
            <CommandGroup>
              {DRINK_OPTIONS.map((option) => {
                const isSelected = selectedItems.some(
                  (i) => i.value === option.value,
                )
                const isDisabled =
                  selectedItems.length >= MAX_SELECTIONS && !isSelected

                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => handleSelect(option)}
                    disabled={isDisabled}
                    className={cn(
                      'flex items-center justify-between py-2.5',
                      'transition-all duration-200 rounded-lg my-1',
                      isSelected
                        ? 'bg-primary/10 text-primary hover:bg-primary/5'
                        : 'hover:bg-primary/5',
                      isDisabled && 'opacity-50 cursor-not-allowed',
                    )}
                  >
                    <span className="font-medium">{option.label}</span>
                    {isSelected ? (
                      <Check className="h-4 w-4 text-primary" />
                    ) : (
                      <span className="h-4 w-4" />
                    )}
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
          <div className="p-2 border-t">
            <Button
              onClick={handleAddOrder}
              disabled={selectedItems.length === 0}
              className={cn(
                'w-full bg-primary hover:bg-primary/90',
                'font-medium text-white',
                'shadow-sm transition-all',
              )}
            >
              {selectedItems.length > 0
                ? t('menu.mix_drink.add_mix', { count: selectedItems.length })
                : t('menu.mix_drink.select_items')}
            </Button>
          </div>
        </Command>
      </AppPopover>
    </div>
  )
}

export default memo(DrinkMix, _.isEqual)
export type { IDrinkMixProps }
