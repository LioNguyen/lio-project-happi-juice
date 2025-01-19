import _ from 'lodash'
import { Eye, EyeOff, HelpCircle } from 'lucide-react'
import {
  type ChangeEvent,
  type ComponentPropsWithRef,
  type FC,
  type HTMLInputTypeAttribute,
  memo,
  useEffect,
  useState,
} from 'react'

import { AppPopover } from '@/components/appPopover'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { IFormBase } from '@/shared/types'
import { cn } from '@/shared/utils'
import { Button } from '@designSystem/components/button'
import { Input } from '@designSystem/components/input'
import { Text } from '@designSystem/components/text'

interface IFormInputProps extends IFormBase {
  inputDelay?: number
  inputProps?: Omit<
    ComponentPropsWithRef<typeof Input>,
    'id' | 'onChange' | 'placeholder' | 'type' | 'value'
  >
  labelClassName?: string
  onChange?: (value: any) => void
  type?: HTMLInputTypeAttribute
  value?: any
}

const FormInput: FC<IFormInputProps> = ({
  className,
  error,
  id,
  inputDelay,
  inputProps,
  label,
  labelClassName,
  onChange,
  placeholder,
  required,
  tooltip,
  type,
  value,
  ...props
}) => {
  const [inputValue, setInputValue] = useState(value || '')
  const [showPassword, setShowPassword] = useState(false)
  const debounceValue = useDebounce(inputValue, inputDelay ?? 400)

  const { className: inputClassName, ...restInputProps } = inputProps || {}

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  useEffect(() => {
    setInputValue(value ?? '')
  }, [value])

  useEffect(() => {
    onChange?.(debounceValue)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue])

  return (
    <div
      data-testid="form-input-test"
      className={cn('form-input', className)}
      {...props}
    >
      {label && (
        <div className="flex items-center gap-2 mb-2">
          <Text
            as="label"
            variant="label"
            className={cn('form-input__label block', labelClassName)}
            htmlFor={id}
          >
            {label}
            {required && (
              <Text variant="required" className="ml-0.5" aria-hidden="true">
                *
              </Text>
            )}
          </Text>
          {tooltip && (
            <AppPopover
              trigger={<HelpCircle className="h-4 w-4" />}
              content={tooltip}
            />
          )}
        </div>
      )}
      <div className="relative">
        <Input
          id={id}
          className={cn(
            'form-input__input',
            inputClassName,
            error && 'border-error',
            type === 'password' && 'pr-10',
          )}
          onChange={handleInputChange}
          placeholder={placeholder}
          type={
            type === 'password' ? (showPassword ? 'text' : 'password') : type
          }
          value={inputValue}
          {...restInputProps}
        />
        {type === 'password' && (
          <Button
            className={cn(
              'absolute right-3 top-[18px] -translate-y-1/2 px-0',
              'text-text-muted-foreground hover:bg-transparent focus:outline-none',
              'transition-colors duration-200',
            )}
            onClick={togglePasswordVisibility}
            tabIndex={-1}
            type="button"
            variant={'ghost'}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Eye className="h-4 w-4" aria-hidden="true" />
            )}
          </Button>
        )}
        {error && (
          <Text variant="error" className="form-input__error text-left mt-1">
            {error}
          </Text>
        )}
      </div>
    </div>
  )
}

export default memo(FormInput, _.isEqual)
export type { IFormInputProps }
