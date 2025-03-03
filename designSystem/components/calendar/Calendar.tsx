import { Locale, vi } from 'date-fns/locale'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import * as React from 'react'
import { DayPicker } from 'react-day-picker'

import { cn } from '@/shared/utils'
import { buttonVariants } from '@designSystem/components/button'

type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  fontClassName?: string
  calendarLocale?: Locale
  customFormatCaption?: (date: Date) => string
  compact?: boolean
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  fontClassName,
  calendarLocale = vi,
  customFormatCaption,
  compact = false,
  ...props
}: CalendarProps) {
  const defaultFormatCaption = (date: Date) => {
    return `Tháng ${date.getMonth() + 1} năm ${date.getFullYear()}`
  }

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(compact ? 'p-1.5 w-full text-sm' : 'p-3 w-full', className)}
      locale={calendarLocale}
      formatters={{
        formatCaption: customFormatCaption || defaultFormatCaption,
      }}
      classNames={{
        months: cn(
          'flex flex-col sm:flex-row sm:space-x-4 w-full',
          compact ? 'space-y-2 sm:space-y-0' : 'space-y-4 sm:space-y-0',
        ),
        month: cn('w-full', compact ? 'space-y-2' : 'space-y-4'),
        caption: cn(
          'flex justify-center relative items-center',
          compact ? 'pt-0.5' : 'pt-1',
          fontClassName,
        ),
        caption_label: cn(
          compact ? 'text-xs font-medium' : 'text-sm font-medium',
          fontClassName,
        ),
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          compact ? 'h-5 w-5 p-0' : 'h-7 w-7 p-0',
          'bg-transparent opacity-50 hover:opacity-100',
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse',
        head_row: cn('flex justify-between', compact ? 'my-0.5' : 'mb-1'),
        head_cell: cn(
          'text-text-muted-foreground rounded-md font-normal',
          compact ? 'text-[0.7rem] w-7' : 'text-[0.8rem] w-9',
          fontClassName,
        ),
        row: cn('flex w-full justify-between', compact ? 'mt-1' : 'mt-2'),
        cell: cn(
          'relative p-0 text-center focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md',
          compact ? 'text-xs' : 'text-sm',
          props.mode === 'range'
            ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
            : '[&:has([aria-selected])]:rounded-md',
        ),
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          compact ? 'h-7 w-7 p-0 text-xs' : 'h-9 w-9 p-0 text-sm',
          'font-normal aria-selected:opacity-100',
          fontClassName,
        ),
        day_range_start: 'day-range-start',
        day_range_end: 'day-range-end',
        day_selected:
          'bg-background-secondary text-text-secondary hover:bg-background-secondary hover:text-text-secondary focus:bg-background-secondary focus:text-text-secondary',
        day_today: 'bg-accent text-accent-foreground',
        day_outside:
          'day-outside text-text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-text-muted-foreground',
        day_disabled: 'text-text-muted-foreground opacity-50',
        day_range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft
            className={cn(compact ? 'h-3 w-3' : 'h-4 w-4', className)}
            {...props}
          />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight
            className={cn(compact ? 'h-3 w-3' : 'h-4 w-4', className)}
            {...props}
          />
        ),
      }}
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'

export { Calendar }
export type { CalendarProps }
