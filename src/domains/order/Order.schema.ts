import { z } from 'zod'
import { i18n } from '@/shared/locale'

const orderItemSchema = z.object({
  id: z.string().min(1, i18n.t('errors.validation.id.required')),
  value: z.string().min(1, i18n.t('errors.required')),
  name: z.string().min(1, i18n.t('errors.validation.name.required')),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, i18n.t('errors.validation.date.format')),
  quantity: z
    .number()
    .min(1, i18n.t('errors.validation.quantity.min'))
    .int(i18n.t('errors.validation.quantity.integer')),
  price: z
    .number()
    .min(0, i18n.t('errors.validation.price.min'))
    .nonnegative(i18n.t('errors.validation.price.min')),
  note: z.string().optional().default(''),
  orderedBy: z.string().min(1, i18n.t('errors.validation.orderedBy.required')),
  contact: z.string().min(1, i18n.t('errors.validation.contact.required')),
})

export type OrderItem = z.infer<typeof orderItemSchema>
export { orderItemSchema }
