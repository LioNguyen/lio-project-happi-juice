import { i18n } from '@/shared/locale'

const MIXED_DRINK_PRICE = 25000

const SHEET_OFFSET = 32

/**
 * Responsive design breakpoints
 */
const SCREEN_BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1280,
} as const

// =============================================================================
// DOMAIN CONSTANTS
// Business logic related constants
// =============================================================================

/**
 * Date picker options
 */
const DATE_PICKER_OPTIONS = [
  // {
  //   label: i18n.t('form.date_picker_option_today'),
  //   value: '0',
  // },
  {
    label: i18n.t('form.date_picker_option_tomorrow'),
    value: '1',
  },
  {
    label: i18n.t('form.date_picker_option_day_after_tomorrow'),
    value: '2',
  },
  {
    label: i18n.t('form.date_picker_option_next_week'),
    value: '7',
  },
] as const

export {
  DATE_PICKER_OPTIONS,
  MIXED_DRINK_PRICE,
  SCREEN_BREAKPOINTS,
  SHEET_OFFSET,
}
