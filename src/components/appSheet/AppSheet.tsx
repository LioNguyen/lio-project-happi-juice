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
    <Sheet open={open} onOpenChange={onOpenChange} modal={false}>
      <SheetContent
        side={side}
        className={cn(
          'h-[calc(100vh-100px)] top-[100px] border rounded-2xl shadow-none',
          'data-[state=open]:backdrop-blur-none',
          'overflow-x-hidden',
          'overflow-y-auto custom-scrollbar',
          className,
        )}
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
