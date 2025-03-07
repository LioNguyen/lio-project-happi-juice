import { i18n } from '@/shared/locale'

// import {
//   default as appleguavaUrl,
//   default as generalUrl,
// } from '@/shared/assets/appleguava.png'
// import celeryUrl from '@/shared/assets/celery.png'
// import guavaUrl from '@/shared/assets/guava.png'
// import guavapineappleUrl from '@/shared/assets/guavapineapple.png'
// import orangeUrl from '@/shared/assets/orange.png'
// import pineappleUrl from '@/shared/assets/pineapple.png'
// import pomeloUrl from '@/shared/assets/pomelo.png'
// import cornMilkUrl from '@/shared/assets/corn-milk.png'
// import pumpkinMilkUrl from '@/shared/assets/pumpkin-milk.png'

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
    image:
      'https://res.cloudinary.com/dklrfrbg1/image/upload/f_auto,q_auto,w_auto,c_limit,dpr_auto/v1741011669/Happi%20Juice/orange_sz2mdp.png',

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
    image:
      'https://res.cloudinary.com/dklrfrbg1/image/upload/f_auto,q_auto,w_auto,c_limit,dpr_auto/v1741011730/Happi%20Juice/appleguava_vrq9up.png',

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
    image:
      'https://res.cloudinary.com/dklrfrbg1/image/upload/f_auto,q_auto,w_auto,c_limit,dpr_auto/v1741011696/Happi%20Juice/pomelo_nxarek.png',

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
    image:
      'https://res.cloudinary.com/dklrfrbg1/image/upload/f_auto,q_auto,w_auto,c_limit,dpr_auto/v1741011781/Happi%20Juice/pineapple_nrifuu.png',

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
    image:
      'https://res.cloudinary.com/dklrfrbg1/image/upload/f_auto,q_auto,w_auto,c_limit,dpr_auto/v1741011730/Happi%20Juice/appleguava_vrq9up.png',

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
    image:
      'https://res.cloudinary.com/dklrfrbg1/image/upload/f_auto,q_auto,w_auto,c_limit,dpr_auto/v1741011763/Happi%20Juice/celery_hfx19i.png',

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
    image:
      'https://res.cloudinary.com/dklrfrbg1/image/upload/f_auto,q_auto,w_auto,c_limit,dpr_auto/v1741012390/Happi%20Juice/guava_rvfuqe.png',

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
    image:
      'https://res.cloudinary.com/dklrfrbg1/image/upload/f_auto,q_auto,w_auto,c_limit,dpr_auto/v1741011730/Happi%20Juice/appleguava_vrq9up.png',

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
    image:
      'https://res.cloudinary.com/dklrfrbg1/image/upload/f_auto,q_auto,w_auto,c_limit,dpr_auto/v1741011730/Happi%20Juice/appleguava_vrq9up.png',

    // Pricing & Promotion
    price: 25000,
    promotionalPrice: null,
    discount: 0,

    // Display & Marketing
    isBestSeller: true,
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
    image:
      'https://res.cloudinary.com/dklrfrbg1/image/upload/f_auto,q_auto,w_auto,c_limit,dpr_auto/v1741011730/Happi%20Juice/appleguava_vrq9up.png',

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
    image:
      'https://res.cloudinary.com/dklrfrbg1/image/upload/f_auto,q_auto,w_auto,c_limit,dpr_auto/v1741012393/Happi%20Juice/guavapineapple_zlsm8i.png',

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
    image:
      'https://res.cloudinary.com/dklrfrbg1/image/upload/f_auto,q_auto,w_auto,c_limit,dpr_auto/v1741011712/Happi%20Juice/corn-milk_izihza.png',

    // Pricing & Promotion
    price: 20000,
    promotionalPrice: null,
    discount: 0,

    // Display & Marketing
    isBestSeller: true,
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
    image:
      'https://res.cloudinary.com/dklrfrbg1/image/upload/f_auto,q_auto,w_auto,c_limit,dpr_auto/v1741011797/Happi%20Juice/pumpkin-milk_wthha1.png',

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
