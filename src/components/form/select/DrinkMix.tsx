import _ from 'lodash'
import { Check, FlaskConical } from 'lucide-react'
import { memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { AppPopover } from '@/components/appPopover'
import { DRINK_TYPE, useMenuStore } from '@/domains/menu'
import { useOrderStore } from '@/domains/order'
import { MIXED_DRINK_MAX, MIXED_DRINK_PRICE } from '@/shared/constants'
import { IComponentBase } from '@/shared/types'
import { cn, transformToSortedString } from '@/shared/utils'
import { Badge } from '@designSystem/components/badge'
import { Button } from '@designSystem/components/button'
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@designSystem/components/command'

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

  // Xử lý đóng popover khi cửa sổ thay đổi kích thước
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
    <div className={cn('w-full space-y-4', className)}>
      <div className="hidden lg:flex gap-2 w-full">
        <AppPopover
          className="p-0 w-[200px]"
          open={open}
          onOpenChange={setOpen}
          side="bottom"
          align="end"
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
        >
          <Command>
            <CommandList className="px-1 py-2">
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
                        'transition-colors rounded-lg',
                        isSelected ? 'bg-orange-100' : 'hover:bg-orange-100',
                        isDisabled && 'opacity-50 cursor-not-allowed',
                      )}
                    >
                      {isSelected ? (
                        <Check className="mr-2 h-5 w-5 text-orange-500" />
                      ) : (
                        <div className="mr-2 h-5 w-5" />
                      )}
                      {option.label}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </CommandList>
            <div className="p-2 border-t">
              <Button
                onClick={handleAddOrder}
                disabled={selectedItems.length === 0}
                className="w-full"
              >
                {t('menu.mix_drink.mix_button', {
                  count: selectedItems.length,
                  max: MIXED_DRINK_MAX,
                })}
              </Button>
            </div>
          </Command>
        </AppPopover>
      </div>
    </div>
  )
}

export default memo(DrinkMix, _.isEqual)
export type { IDrinkMixProps }
