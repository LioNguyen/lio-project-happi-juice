import { i18n } from '@/shared/locale'

import appleguavaUrl from '@/shared/assets/appleguava.jpg'
import generalUrl from '@/shared/assets/appleguava.jpg'
import celeryUrl from '@/shared/assets/celery.jpg'
import orangeUrl from '@/shared/assets/orange.jpg'
import pineappleUrl from '@/shared/assets/pineapple.jpg'
import pomeloUrl from '@/shared/assets/pomelo.jpg'

const DRINK_TYPE = {
  mix: 'mix',
  original: 'original',
}

const DRINK_MENU = [
  {
    id: '1',
    name: i18n.t('menu.drinks.orange'),
    value: 'orange',
    price: 20000,
    description: i18n.t('menu.drinks.descriptions.orange'),
    image: orangeUrl,
    type: DRINK_TYPE.original,
  },
  {
    id: '2',
    name: i18n.t('menu.drinks.apple'),
    value: 'apple',
    price: 25000,
    description: i18n.t('menu.drinks.descriptions.apple'),
    image: generalUrl,
    type: DRINK_TYPE.original,
  },
  {
    id: '11',
    name: i18n.t('menu.drinks.pomelo'),
    value: 'pomelo',
    price: 25000,
    description: i18n.t('menu.drinks.descriptions.pomelo'),
    image: pomeloUrl,
    type: DRINK_TYPE.original,
  },
  {
    id: '3',
    name: i18n.t('menu.drinks.pineapple'),
    value: 'pineapple',
    price: 25000,
    description: i18n.t('menu.drinks.descriptions.pineapple'),
    image: pineappleUrl,
    type: DRINK_TYPE.original,
  },
  {
    id: '4',
    name: i18n.t('menu.drinks.watermelon'),
    value: 'watermelon',
    price: 25000,
    description: i18n.t('menu.drinks.descriptions.watermelon'),
    image: generalUrl,
    type: DRINK_TYPE.original,
  },
  {
    id: '5',
    name: i18n.t('menu.drinks.celery'),
    value: 'celery',
    price: 25000,
    description: i18n.t('menu.drinks.descriptions.celery'),
    image: celeryUrl,
    type: DRINK_TYPE.original,
  },
  {
    id: '8',
    name: i18n.t('menu.drinks.guava'),
    value: 'guava',
    price: 25000,
    description: i18n.t('menu.drinks.descriptions.guava'),
    image: generalUrl,
    type: DRINK_TYPE.original,
  },
  {
    id: '6',
    name: `${i18n.t('menu.drinks.apple')} + ${i18n.t('menu.drinks.orange')}`,
    value: 'apple,orange',
    price: 25000,
    description: i18n.t('menu.drinks.descriptions.appleorange'),
    image: generalUrl,
    type: DRINK_TYPE.mix,
  },
  {
    id: '7',
    name: `${i18n.t('menu.drinks.apple')} + ${i18n.t('menu.drinks.guava')}`,
    value: 'apple,guava',
    price: 25000,
    description: i18n.t('menu.drinks.descriptions.appleguava'),
    image: appleguavaUrl,
    type: DRINK_TYPE.mix,
  },
  {
    id: '9',
    name: `${i18n.t('menu.drinks.apple')} + ${i18n.t('menu.drinks.pineapple')}`,
    value: 'apple,pineapple',
    price: 25000,
    description: i18n.t('menu.drinks.descriptions.applepineapple'),
    image: generalUrl,
    type: DRINK_TYPE.mix,
  },
  {
    id: '10',
    name: `${i18n.t('menu.drinks.apple')} + ${i18n.t('menu.drinks.celery')}`,
    value: 'apple,celery',
    price: 25000,
    description: i18n.t('menu.drinks.descriptions.applecelery'),
    image: generalUrl,
    type: DRINK_TYPE.mix,
  },
]

export { DRINK_MENU, DRINK_TYPE }
