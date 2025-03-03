import { type FC, memo, ReactNode } from 'react'

import { ALIGN, SIDE } from '@/shared/constants'
import { cn } from '@/shared/utils'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@designSystem/components/popover'
import { IComponentBase } from '@/shared/types'

interface IAppPopoverProps extends IComponentBase {
  align?: (typeof ALIGN)[keyof typeof ALIGN]
  className?: string
  side?: (typeof SIDE)[keyof typeof SIDE]
  modal?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  trigger: ReactNode
}

const AppPopover: FC<IAppPopoverProps> = ({
  align,
  className,
  children,
  side,
  trigger,
  modal,
  open,
  onOpenChange,
}) => {
  return (
    <Popover open={open} onOpenChange={onOpenChange} modal={modal}>
      {trigger && (
        <PopoverTrigger className="dropdown__trigger cursor-pointer">
          {trigger}
        </PopoverTrigger>
      )}
      <PopoverContent
        className={cn('dropdown__content', 'w-auto p-4', className)}
        side={side || 'right'}
        align={align || 'start'}
      >
        {children}
      </PopoverContent>
    </Popover>
  )
}

export default memo(AppPopover)
export type { IAppPopoverProps }
