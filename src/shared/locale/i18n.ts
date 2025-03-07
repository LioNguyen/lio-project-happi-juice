import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import commonEn from './en/common.json'

import commonVi from './vi/common.json'

i18n.use(initReactI18next).init({
  fallbackLng: 'vi',
  interpolation: {
    escapeValue: false,
  },
  ns: ['common'],
  defaultNS: 'common',
  resources: {
    en: {
      common: commonEn,
    },
    vi: {
      common: commonVi,
    },
  },
})

export default i18n
