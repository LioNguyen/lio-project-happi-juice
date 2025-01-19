/* eslint-disable react-hooks/exhaustive-deps */
import _ from 'lodash'
import { Check, ChevronsUpDown, Minus, Plus, Trash2 } from 'lucide-react'
import { memo, useEffect, useState } from 'react'

import { cn } from '@/shared/utils'
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
import { Input } from '@designSystem/components/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@designSystem/components/popover'

interface Option {
  value: string
  label: string
}

interface RowItem {
  items: Option[]
  quantity: number
  note: string
}

interface JuiceMultiSelectProps {
  options: Option[]
  defaultRows?: RowItem[]
  onChange?: (rows: RowItem[]) => void
  placeholder?: string
  error?: string
  className?: string
}

const JuiceMultiSelect = ({
  options = [],
  defaultRows,
  onChange,
  placeholder = 'Chọn loại nước',
  error,
  className,
}: JuiceMultiSelectProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>('')
  const [selectedItems, setSelectedItems] = useState<Option[]>([])
  const [rows, setRows] = useState<RowItem[]>(defaultRows || [])

  // Đồng bộ defaultRows với state nội bộ
  useEffect(() => {
    if (defaultRows && !_.isEqual(defaultRows, rows)) {
      setRows(defaultRows)
    }
  }, [defaultRows])

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

    setRows((prev) => [
      ...prev,
      {
        items: [...selectedItems],
        quantity: 1,
        note: '',
      },
    ])
    setSelectedItems([])
    setOpen(false)
  }

  const updateQuantity = (index: number, increment: number) => {
    setRows((prev) =>
      prev.map((row, i) => {
        if (i === index) {
          return {
            ...row,
            quantity: Math.max(1, row.quantity + increment),
          }
        }
        return row
      }),
    )
  }

  const updateNote = (index: number, note: string) => {
    setRows((prev) =>
      prev.map((row, i) => (i === index ? { ...row, note } : row)),
    )
  }

  const removeRow = (index: number) => {
    setRows((prev) => prev.filter((_, i) => i !== index))
  }

  useEffect(() => {
    onChange?.(rows)
  }, [rows])

  return (
    <div className={cn('w-full space-y-4', className)}>
      <div className="flex gap-2 w-full lg:w-[400px]">
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
              <div className="flex gap-1 flex-wrap">
                {selectedItems.length > 0
                  ? selectedItems.map((item) => (
                      <Badge key={item.value} variant="secondary">
                        {item.label}
                      </Badge>
                    ))
                  : placeholder}
              </div>
              <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
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

      <div className="space-y-3">
        {rows.map((row, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-3 border rounded-lg"
          >
            <div className="flex gap-1 flex-wrap flex-1">
              {row.items.map((item) => (
                <Badge key={item.value} variant="secondary">
                  {item.label}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateQuantity(index, -1)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center">{row.quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateQuantity(index, 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <Input
              value={row.note}
              onChange={(e) => updateNote(index, e.target.value)}
              placeholder="Ghi chú..."
              className="w-40"
            />

            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeRow(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(JuiceMultiSelect, _.isEqual)
