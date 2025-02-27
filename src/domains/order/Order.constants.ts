import { i18n } from '@/shared/locale'

const DRINK_MENU = [
  {
    id: '1',
    name: i18n.t('menu.drinks.orange'),
    value: 'orange',
    price: 20000,
    description: i18n.t('menu.drinks.descriptions.orange'),
    image: '/api/placeholder/300/200',
  },
  {
    id: '2',
    name: i18n.t('menu.drinks.apple'),
    value: 'apple',
    price: 25000,
    description: i18n.t('menu.drinks.descriptions.apple'),
    image: '/api/placeholder/300/200',
  },
  {
    id: '3',
    name: i18n.t('menu.drinks.pineapple'),
    value: 'pineapple',
    price: 25000,
    description: i18n.t('menu.drinks.descriptions.pineapple'),
    image: '/api/placeholder/300/200',
  },
  {
    id: '4',
    name: i18n.t('menu.drinks.watermelon'),
    value: 'watermelon',
    price: 25000,
    description: i18n.t('menu.drinks.descriptions.watermelon'),
    image: '/api/placeholder/300/200',
  },
  {
    id: '5',
    name: i18n.t('menu.drinks.celery'),
    value: 'celery',
    price: 25000,
    description: i18n.t('menu.drinks.descriptions.celery'),
    image: '/api/placeholder/300/200',
  },
]

export { DRINK_MENU }
