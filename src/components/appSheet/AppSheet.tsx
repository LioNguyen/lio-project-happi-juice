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
  sheetFooter?: React.ReactNode
  sheetTrigger?: React.ReactNode
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
  sheetFooter,
  sheetTrigger,
  ...props
}) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange} modal={modal}>
      {sheetTrigger && <SheetTrigger asChild>{sheetTrigger}</SheetTrigger>}
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
        {sheetFooter && <SheetFooter>{sheetFooter}</SheetFooter>}
      </SheetContent>
    </Sheet>
  )
}

export default memo(AppSheet)
export type { IAppSheetProps }
