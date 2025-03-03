import { format, isValid, Locale, parseISO } from 'date-fns'
import { enUS, vi } from 'date-fns/locale'
import _ from 'lodash'

import { IOrderItem } from '@/domains/order'
import { ISelectOption } from '@/shared/types'

interface INumberFormatOptions {
  decimals?: number
  thousandSeparator?: string
  decimalSeparator?: string
}

// ==================== Date Utilities ====================
/**
 * Parse various date formats into Date object
 * @category Date
 * @param {Date | string | undefined} value - Input date
 * @returns {Date | undefined} Parsed Date object or undefined if invalid
 * @example
 * parseDate("2024-02-26") // Date object
 * parseDate("invalid") // undefined
 */
function parseDate(value: Date | string | undefined): Date | undefined {
  if (!value) return undefined
  if (value instanceof Date) return isValid(value) ? value : undefined

  try {
    // Try ISO string parsing first
    const date = parseISO(value)
    if (isValid(date)) return date

    // Fallback to direct Date creation
    const normalDate = new Date(value)
    return isValid(normalDate) ? normalDate : undefined
  } catch {
    return undefined
  }
}

/**
 * Format a date string according to specified format
 * @category Date
 * @param {string} date - Date string to format
 * @param {string} [dateFormat] - Output format (defaults to "yyyy-MM-dd")
 * @returns {string} Formatted date string
 * @example
 * formatDateTime("2024-02-26") // "2024-02-26"
 * formatDateTime("2024-02-26", "dd/MM/yyyy") // "26/02/2024"
 */
function formatDateTime(date: string, dateFormat?: string) {
  return format(date, dateFormat || 'yyyy-MM-dd')
}

const localeMap: Record<string, Locale> = {
  vi: vi,
  en: enUS,
}

// ==================== Number & Price Utilities ====================
/**
 * Format a number with customizable separators and decimals
 * @category Number
 * @param {number} value - Number to format
 * @param {INumberFormatOptions} [options] - Formatting options
 * @returns {string} Formatted number string
 */
const formatNumber = (
  value: number,
  options?: INumberFormatOptions,
): string => {
  const {
    decimals = 0,
    thousandSeparator = ',',
    decimalSeparator = '.',
  } = options || {}

  const parts = value.toFixed(decimals).split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator)

  return parts.join(decimalSeparator)
}

/**
 * Formats the price with thousand separators using locale-specific formatting
 * @category Price
 * @param {string} price - Price string to format
 * @returns {string} Formatted price string
 */
const formatPrice = (price: string) => {
  return Number(price).toLocaleString()
}

// ==================== Array Utilities ====================
/**
 * Transforms an array of select options into a sorted, joined string
 * @category Array
 * @param {ISelectOption[]} array - Array of select options
 * @param {string} [key] - Key to extract from each option
 * @param {string} [separator] - Separator for joining values
 * @returns {string} Sorted and joined string
 */
const transformToSortedString = (
  array: ISelectOption[],
  key: string = 'value',
  separator: string = ',',
): string => {
  return _.chain(array).map(key).sortBy().join(separator).value()
}

// ==================== Order Utilities ====================
/**
 * Calculates the total price for an array of order items
 * @category Order
 * @param {IOrderItem[]} items - Array of order items
 * @returns {number} Total price
 */
const calculateTotalPrice = (items: IOrderItem[]) => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

export {
  // Date utils
  parseDate,
  formatDateTime,
  localeMap,

  // Number & Price utils
  formatNumber,
  formatPrice,

  // Array utils
  transformToSortedString,
  // Order utils
  calculateTotalPrice,
}
