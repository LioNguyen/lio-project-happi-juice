import { FC, memo, type ComponentPropsWithoutRef } from 'react'

import { cn } from '@/shared/utils'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@designSystem/components/sheet'

interface IAppSheetProps extends ComponentPropsWithoutRef<typeof SheetContent> {
  title?: string
  description?: string
  modal?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  footer?: React.ReactNode
  trigger?: React.ReactNode
}

const AppSheet: FC<IAppSheetProps> = ({
  children,
  title,
  description,
  side = 'bottom',
  className,
  modal = true,
  open,
  onOpenChange,
  footer,
  trigger,
  ...props
}) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange} modal={modal}>
      {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
      <SheetContent
        side={side}
        className={cn('h-[85vh] lg:hidden px-4 py-6 rounded-t-2xl', className)}
        {...props}
      >
        <SheetHeader>
          {title && (
            <SheetTitle className="font-bold text-lg">{title}</SheetTitle>
          )}
          {description && (
            <SheetDescription className="font-medium text-xs text-text-muted-foreground">
              {description}
            </SheetDescription>
          )}
        </SheetHeader>
        {children}
        {footer && <SheetFooter>{footer}</SheetFooter>}
      </SheetContent>
    </Sheet>
  )
}

export default memo(AppSheet)
export type { IAppSheetProps }
