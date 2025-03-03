import {
  addDays,
  format,
  isBefore,
  set,
  startOfDay,
  startOfToday,
} from 'date-fns'
import { vi } from 'date-fns/locale'
import _ from 'lodash'
import { CalendarIcon, HelpCircle, X } from 'lucide-react'
import { type FC, memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { AppPopover } from '@/components/appPopover'
import { AppSheet } from '@/components/appSheet'
import { DATE_PICKER_OPTIONS } from '@/shared/constants'
import { useIsMobile } from '@/shared/hooks/useMobile'
import { IFormBase } from '@/shared/types'
import { cn, localeMap, parseDate } from '@/shared/utils'
import { Button } from '@designSystem/components/button'
import { Calendar } from '@designSystem/components/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@designSystem/components/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@designSystem/components/select'
import { Text } from '@designSystem/components/text'

interface IFormDatePickerProps extends IFormBase {
  errorClassName?: string
  labelClassName?: string
  datePickerClassName?: string
  datetimeFormat?: string
}

const CalendarContent = ({
  date,
  onDateChange,
  onQuickSelect,
  className,
  compact,
}: {
  date?: Date
  onDateChange: (date: Date | undefined) => void
  onQuickSelect: (days: string) => void
  className?: string
  compact?: boolean
}) => {
  const { i18n, t } = useTranslation()

  const baseLanguage = i18n.language.split('-')[0]
  const dateLocale = localeMap[baseLanguage] || vi

  const isDateDisabled = (date: Date) => {
    const tomorrow = addDays(startOfToday(), 1)
    return isBefore(startOfDay(date), tomorrow)
  }

  return (
    <div className={cn('flex flex-col space-y-2', className)}>
      <Select onValueChange={onQuickSelect}>
        <SelectTrigger>
          <SelectValue placeholder={t('form.date_picker_quick_select')} />
        </SelectTrigger>
        <SelectContent position="popper">
          {DATE_PICKER_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="rounded-md border">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onDateChange}
          disabled={isDateDisabled}
          compact={compact}
          locale={dateLocale}
        />
      </div>
    </div>
  )
}

const FormDatePicker: FC<IFormDatePickerProps> = ({
  className,
  disabled = false,
  readOnly = false,
  error,
  id,
  label,
  labelClassName,
  errorClassName,
  datePickerClassName,
  datetimeFormat = 'yyyy-MM-dd',
  onChange,
  placeholder,
  required,
  tooltip,
  value,
  ...props
}) => {
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  const initialDate = parseDate(value)
  const [date, setDate] = useState<Date | undefined>(initialDate)
  const [tempDate, setTempDate] = useState<Date | undefined>(initialDate)

  const handleDateChange = (newDate: Date | undefined) => {
    if (disabled) return

    if (isMobile) {
      setTempDate(newDate)
    } else {
      setDate(newDate)
      if (newDate) {
        const now = new Date()
        const dateWithCurrentTime = set(newDate, {
          hours: now.getHours(),
          minutes: now.getMinutes(),
          seconds: now.getSeconds(),
          milliseconds: now.getMilliseconds(),
        })
        onChange?.(format(dateWithCurrentTime, datetimeFormat))
      } else {
        onChange?.(undefined)
      }
    }
  }

  const handleConfirm = () => {
    if (tempDate) {
      const now = new Date()
      const dateWithCurrentTime = set(tempDate, {
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
        milliseconds: now.getMilliseconds(),
      })
      setDate(tempDate)
      onChange?.(format(dateWithCurrentTime, datetimeFormat))
    }
  }

  const handleQuickSelect = (daysToAdd: string) => {
    const now = new Date()
    const newDate = new Date(
      now.getTime() + parseInt(daysToAdd) * 24 * 60 * 60 * 1000,
    )
    handleDateChange(newDate)
    if (isMobile) {
      handleConfirm()
    }
  }

  const handleClear = (e: React.MouseEvent) => {
    if (disabled) return

    e.stopPropagation()
    setDate(undefined)
    setTempDate(undefined)
    onChange?.(undefined)
  }

  useEffect(() => {
    if (!disabled && !readOnly && !value && !date) {
      const now = new Date()
      const tomorrow = addDays(now, 1)
      const tomorrowWithCurrentTime = set(tomorrow, {
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
        milliseconds: now.getMilliseconds(),
      })
      handleDateChange(tomorrowWithCurrentTime)
    }
  }, [])

  useEffect(() => {
    const newDate = parseDate(value)
    if (!_.isEqual(newDate, date)) {
      setDate(newDate)
      setTempDate(newDate)
    }
  }, [value])

  const datePickerButton = (
    <div className="relative">
      <Button
        variant="outline"
        className={cn(
          'w-full justify-start text-left font-normal',
          !date && 'text-text-muted-foreground',
          error && 'border-error',
          date && 'pr-8',
          disabled && 'cursor-not-allowed opacity-50 pointer-events-none',
          readOnly && 'cursor-not-allowed pointer-events-none',
        )}
        disabled={disabled}
        aria-disabled={disabled}
        aria-readonly={readOnly}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {date ? (
          format(date, datetimeFormat)
        ) : (
          <span>
            {placeholder || datetimeFormat || t('form.date_picker_placeholder')}
          </span>
        )}
      </Button>
      {date && !disabled && !readOnly && (
        <div
          className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer hover:opacity-70"
          onClick={handleClear}
          title="Clear date"
        >
          <X className="h-4 w-4 text-text-muted-foreground" />
        </div>
      )}
    </div>
  )

  return (
    <div
      data-testid="form-date-picker-test"
      className={cn('form-date-picker', className)}
      {...props}
    >
      {label && (
        <div className="flex items-center gap-2 mb-2">
          <Text
            data-testid="text-label"
            as="label"
            variant="label"
            className={cn(
              'form-date-picker__label block',
              labelClassName,
              disabled && 'text-text-muted-foreground cursor-not-allowed',
            )}
            htmlFor={id}
          >
            {label}
            {required && !readOnly && (
              <Text
                data-testid="text-required"
                variant="required"
                className="ml-0.5"
                aria-hidden="true"
              >
                *
              </Text>
            )}
          </Text>
          {tooltip && (
            <AppPopover trigger={<HelpCircle className="h-4 w-4" />}>
              {tooltip}
            </AppPopover>
          )}
        </div>
      )}
      <div className={cn('date-picker-wrapper', datePickerClassName)}>
        {disabled || readOnly ? (
          datePickerButton
        ) : isMobile ? (
          <>
            <AppSheet
              className="h-fit flex flex-col"
              title={t('form.select_date')}
              trigger={<CalendarIcon className="h-4 w-4" />}
            >
              <CalendarContent
                date={tempDate}
                onDateChange={handleDateChange}
                onQuickSelect={handleQuickSelect}
              />
            </AppSheet>
          </>
        ) : (
          <Popover>
            <PopoverTrigger asChild>{datePickerButton}</PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-2">
              <CalendarContent
                date={date}
                onDateChange={handleDateChange}
                onQuickSelect={handleQuickSelect}
                compact
              />
            </PopoverContent>
          </Popover>
        )}
        {error && (
          <Text
            data-testid="text-error"
            variant="error"
            className={cn(
              'form-date-picker__error text-left mt-1',
              errorClassName,
            )}
          >
            {error}
          </Text>
        )}
      </div>
    </div>
  )
}

export default memo(FormDatePicker, _.isEqual)
export type { IFormDatePickerProps }
