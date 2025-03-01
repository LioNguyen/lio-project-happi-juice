import { FC, memo, type ComponentPropsWithoutRef } from 'react'

import { cn } from '@/shared/utils'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@designSystem/components/sheet'

interface IAppSheetProps extends ComponentPropsWithoutRef<typeof SheetContent> {
  title?: string
  description?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const AppSheet: FC<IAppSheetProps> = ({
  children,
  title,
  description,
  side = 'right',
  className,
  open,
  onOpenChange,
  ...props
}) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange} modal={true}>
      <SheetContent
        side={side}
        className={cn('h-[85vh] lg:hidden px-4 py-6 rounded-t-2xl', className)}
        {...props}
      >
        <SheetHeader>
          <SheetTitle className="font-bold text-lg">{title}</SheetTitle>
          <SheetDescription className="font-medium text-xs text-text-muted-foreground">
            {description}
          </SheetDescription>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  )
}

export default memo(AppSheet)
export type { IAppSheetProps }
