import { i18n } from '@/shared/locale'

import {
  default as appleguavaUrl,
  default as generalUrl,
} from '@/shared/assets/appleguava.jpg'
import celeryUrl from '@/shared/assets/celery.jpg'
import guavaUrl from '@/shared/assets/guava.jpg'
import guavapineappleUrl from '@/shared/assets/guavapineapple.jpg'
import orangeUrl from '@/shared/assets/orange.jpg'
import pineappleUrl from '@/shared/assets/pineapple.jpg'
import pomeloUrl from '@/shared/assets/pomelo.jpg'
import cornMilkUrl from '@/shared/assets/corn-milk.jpg'
import pumpkinMilkUrl from '@/shared/assets/pumpkin-milk.jpg'

const DRINK_TYPE = {
  mix: 'mix',
  original: 'original',
  milk: 'milk',
}

const DRINK_MENU = [
  {
    // Basic Information
    id: '1',
    name: i18n.t('menu.drinks.orange'),
    value: 'orange',
    type: DRINK_TYPE.original,
    description: i18n.t('menu.drinks.descriptions.orange'),
    image: orangeUrl,

    // Pricing & Promotion
    price: 20000,
    promotionalPrice: 18000,
    discount: 10, // Percentage %

    // Display & Marketing
    isBestSeller: true,
    priority: 1, // 1: Highest priority

    // Health & Diet
    isDietFriendly: false,
    tags: ['vitamin c', 'immunity', 'fresh'],

    // Inventory
    inStock: true,
  },
  {
    // Basic Information
    id: '2',
    name: i18n.t('menu.drinks.apple'),
    value: 'apple',
    type: DRINK_TYPE.original,
    description: i18n.t('menu.drinks.descriptions.apple'),
    image: generalUrl,

    // Pricing & Promotion
    price: 30000,
    promotionalPrice: null,
    discount: 0,

    // Display & Marketing
    isBestSeller: false,
    priority: 2,

    // Health & Diet
    isDietFriendly: true,
    tags: ['detox', 'weight loss', 'fresh'],

    // Inventory
    inStock: true,
  },
  {
    // Basic Information
    id: '11',
    name: i18n.t('menu.drinks.pomelo'),
    value: 'pomelo',
    type: DRINK_TYPE.original,
    description: i18n.t('menu.drinks.descriptions.pomelo'),
    image: pomeloUrl,

    // Pricing & Promotion
    price: 25000,
    promotionalPrice: null,
    discount: 0,

    // Display & Marketing
    isBestSeller: false,
    priority: 3,

    // Health & Diet
    isDietFriendly: true,
    tags: ['vitamin c', 'weight loss', 'fresh'],

    // Inventory
    inStock: true,
  },
  {
    // Basic Information
    id: '3',
    name: i18n.t('menu.drinks.pineapple'),
    value: 'pineapple',
    type: DRINK_TYPE.original,
    description: i18n.t('menu.drinks.descriptions.pineapple'),
    image: pineappleUrl,

    // Pricing & Promotion
    price: 25000,
    promotionalPrice: 20000,
    discount: 20,

    // Display & Marketing
    isBestSeller: true,
    priority: 2,

    // Health & Diet
    isDietFriendly: true,
    tags: ['digestive', 'enzyme', 'fresh'],

    // Inventory
    inStock: true,
  },
  {
    // Basic Information
    id: '4',
    name: i18n.t('menu.drinks.watermelon'),
    value: 'watermelon',
    type: DRINK_TYPE.original,
    description: i18n.t('menu.drinks.descriptions.watermelon'),
    image: generalUrl,

    // Pricing & Promotion
    price: 20000,
    promotionalPrice: null,
    discount: 0,

    // Display & Marketing
    isBestSeller: false,
    priority: 4,

    // Health & Diet
    isDietFriendly: true,
    tags: ['refreshing', 'hydrating', 'fresh'],

    // Inventory
    inStock: true,
  },
  {
    // Basic Information
    id: '5',
    name: i18n.t('menu.drinks.celery'),
    value: 'celery',
    type: DRINK_TYPE.original,
    description: i18n.t('menu.drinks.descriptions.celery'),
    image: celeryUrl,

    // Pricing & Promotion
    price: 30000,
    promotionalPrice: 22500,
    discount: 10,

    // Display & Marketing
    isBestSeller: false,
    priority: 3,

    // Health & Diet
    isDietFriendly: true,
    tags: ['detox', 'weight loss', 'organic'],

    // Inventory
    inStock: true,
  },
  {
    // Basic Information
    id: '8',
    name: i18n.t('menu.drinks.guava'),
    value: 'guava',
    type: DRINK_TYPE.original,
    description: i18n.t('menu.drinks.descriptions.guava'),
    image: guavaUrl,

    // Pricing & Promotion
    price: 20000,
    promotionalPrice: null,
    discount: 0,

    // Display & Marketing
    isBestSeller: false,
    priority: 3,

    // Health & Diet
    isDietFriendly: true,
    tags: ['vitamin c', 'immunity', 'fresh'],

    // Inventory
    inStock: true,
  },
  {
    // Basic Information
    id: '7',
    name: `${i18n.t('menu.drinks.apple')} + ${i18n.t('menu.drinks.guava')}`,
    value: 'apple,guava',
    type: DRINK_TYPE.mix,
    description: i18n.t('menu.drinks.descriptions.appleguava'),
    image: appleguavaUrl,

    // Pricing & Promotion
    price: 25000,
    promotionalPrice: null,
    discount: 0,

    // Display & Marketing
    isBestSeller: false,
    priority: 2,

    // Health & Diet
    isDietFriendly: true,
    tags: ['immunity', 'vitamin c', 'mixed'],

    // Inventory
    inStock: true,
  },
  {
    // Basic Information
    id: '9',
    name: `${i18n.t('menu.drinks.apple')} + ${i18n.t('menu.drinks.pineapple')}`,
    value: 'apple,pineapple',
    type: DRINK_TYPE.mix,
    description: i18n.t('menu.drinks.descriptions.applepineapple'),
    image: generalUrl,

    // Pricing & Promotion
    price: 25000,
    promotionalPrice: null,
    discount: 0,

    // Display & Marketing
    isBestSeller: false,
    priority: 2,

    // Health & Diet
    isDietFriendly: true,
    tags: ['refreshing', 'digestive', 'mixed'],

    // Inventory
    inStock: true,
  },
  {
    // Basic Information
    id: '10',
    name: `${i18n.t('menu.drinks.apple')} + ${i18n.t('menu.drinks.celery')}`,
    value: 'apple,celery',
    type: DRINK_TYPE.mix,
    description: i18n.t('menu.drinks.descriptions.applecelery'),
    image: generalUrl,

    // Pricing & Promotion
    price: 30000,
    promotionalPrice: 22500,
    discount: 10,

    // Display & Marketing
    isBestSeller: false,
    priority: 2,

    // Health & Diet
    isDietFriendly: true,
    tags: ['detox', 'weight loss', 'mixed'],

    // Inventory
    inStock: true,
  },
  {
    // Basic Information
    id: '12',
    name: `${i18n.t('menu.drinks.guava')} + ${i18n.t('menu.drinks.pineapple')}`,
    value: 'guava,pineapple',
    type: DRINK_TYPE.mix,
    description: i18n.t('menu.drinks.descriptions.guavapineapple'),
    image: guavapineappleUrl,

    // Pricing & Promotion
    price: 25000,
    promotionalPrice: null,
    discount: 0,

    // Display & Marketing
    isBestSeller: false,
    priority: 3,

    // Health & Diet
    isDietFriendly: true,
    tags: ['vitamin c', 'digestive', 'mixed'],

    // Inventory
    inStock: true,
  },
  {
    // Basic Information
    id: '12',
    name: `${i18n.t('menu.drinks.guava')} + ${i18n.t('menu.drinks.pineapple')}`,
    value: 'guava,pineapple',
    type: DRINK_TYPE.mix,
    description: i18n.t('menu.drinks.descriptions.guavapineapple'),
    image: guavapineappleUrl,

    // Pricing & Promotion
    price: 25000,
    promotionalPrice: null,
    discount: 0,

    // Display & Marketing
    isBestSeller: false,
    priority: 3,

    // Health & Diet
    isDietFriendly: true,
    tags: ['vitamin c', 'digestive', 'mixed'],

    // Inventory
    inStock: true,
  },
  {
    // Basic Information
    id: '13',
    name: i18n.t('menu.drinks.corn_milk'),
    value: 'corn_milk',
    type: DRINK_TYPE.milk,
    description: i18n.t('menu.drinks.descriptions.corn_milk'),
    image: cornMilkUrl,

    // Pricing & Promotion
    price: 20000,
    promotionalPrice: null,
    discount: 0,

    // Display & Marketing
    isBestSeller: false,
    priority: 2,

    // Health & Diet
    isDietFriendly: true,
    tags: ['nutritious', 'sweet', 'milk', 'natural'],

    // Inventory
    inStock: true,
  },
  {
    // Basic Information
    id: '14',
    name: i18n.t('menu.drinks.pumpkin_milk'),
    value: 'pumpkin_milk',
    type: DRINK_TYPE.milk,
    description: i18n.t('menu.drinks.descriptions.pumpkin_milk'),
    image: pumpkinMilkUrl,

    // Pricing & Promotion
    price: 20000,
    promotionalPrice: null,
    discount: 0,

    // Display & Marketing
    isBestSeller: false,
    priority: 2,

    // Health & Diet
    isDietFriendly: true,
    tags: ['vitamin a', 'healthy', 'milk', 'natural'],

    // Inventory
    inStock: true,
  },
]

export { DRINK_MENU, DRINK_TYPE }
