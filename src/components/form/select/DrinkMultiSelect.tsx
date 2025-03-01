import _ from 'lodash'
import { Check, ChevronsUpDown, Plus } from 'lucide-react'
import { memo, useState } from 'react'

import { useOrderStore } from '@/domains/order'
import { MIXED_DRINK_PRICE } from '@/shared/constants'
import { cn, transformToSortedString } from '@/shared/utils'
import { Badge } from '@designSystem/components/badge'
import { Button } from '@designSystem/components/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@designSystem/components/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@designSystem/components/popover'

interface Option {
  value: string
  label: string
}

interface IDrinkMultiSelectProps {
  options: Option[]
  onChange?: (newItem: {
    items: Option[]
    quantity: number
    note: string
    price: number
  }) => void
  placeholder?: string
  error?: string
  className?: string
}

const DrinkMultiSelect = ({
  options = [],
  placeholder = 'Chọn loại nước',
  error,
  className,
}: IDrinkMultiSelectProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>('')
  const [selectedItems, setSelectedItems] = useState<Option[]>([])

  const { addOrder } = useOrderStore()

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchValue.toLowerCase()),
  )

  const handleSelect = (item: Option) => {
    setSelectedItems((prev) => {
      const isSelected = prev.some((i) => i.value === item.value)
      if (isSelected) {
        return prev.filter((i) => i.value !== item.value)
      }
      return [...prev, item]
    })
  }

  const handleAddRow = () => {
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

  const renderSelectedBadges = () => {
    if (selectedItems.length === 0) return placeholder

    return (
      <div className="flex gap-1 flex-wrap">
        {/* Desktop view */}
        <div className="hidden lg:flex gap-1 flex-wrap">
          {selectedItems.slice(0, 4).map((item) => (
            <Badge
              key={item.value}
              className="bg-[#F85C2C] hover:bg-[#E04A1B] text-white"
            >
              {item.label}
            </Badge>
          ))}
          {selectedItems.length > 4 && (
            <Badge className="bg-[#FFF1EC] hover:bg-[#FFE4D9] text-[#F85C2C]">
              +{selectedItems.length - 4}
            </Badge>
          )}
        </div>

        {/* Mobile view */}
        <div className="flex lg:hidden gap-1 flex-wrap">
          {selectedItems.slice(0, 1).map((item) => (
            <Badge
              key={item.value}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              {item.label}
            </Badge>
          ))}
          {selectedItems.length > 1 && (
            <Badge className="bg-orange-100 hover:bg-orange-200 text-orange-700">
              +{selectedItems.length - 1}
            </Badge>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={cn('w-full space-y-4', className)}>
      <div className="flex gap-2 w-full lg:w-[450px]">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={cn(
                'w-full justify-between',
                error && 'border-red-500',
                !selectedItems.length && 'text-text-muted-foreground',
              )}
            >
              {renderSelectedBadges()}
              <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-[--radix-popover-trigger-width] p-0"
            side="bottom"
            align="start"
            sideOffset={4}
            collisionPadding={8}
            avoidCollisions={false}
          >
            <Command>
              <CommandInput
                placeholder="Tìm kiếm..."
                value={searchValue}
                onValueChange={setSearchValue}
              />
              <CommandList>
                <CommandEmpty>Không tìm thấy kết quả</CommandEmpty>
                <CommandGroup>
                  {filteredOptions.map((option) => (
                    <CommandItem
                      key={option.value}
                      onSelect={() => handleSelect(option)}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          selectedItems.some((i) => i.value === option.value)
                            ? 'opacity-100'
                            : 'opacity-0',
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <Button
          onClick={handleAddRow}
          disabled={selectedItems.length === 0}
          className="w-16"
          variant="outline"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export default memo(DrinkMultiSelect, _.isEqual)
export type { IDrinkMultiSelectProps }
