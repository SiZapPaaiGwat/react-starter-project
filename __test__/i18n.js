import i18n from 'i18next'
import {reactI18nextModule} from 'react-i18next'
import zhCN from '../public/locales/zh-CN/translations.json'
import zh from '../public/locales/zh/translations.json'
import en from '../public/locales/en/translations.json'

i18n
  .use(reactI18nextModule)
  .init({
    lang: 'en',
    fallbackLng: 'en',
    ns: ['translations'],
    defaultNS: 'translations',
    interpolation: {
      escapeValue: false
    }
  })

i18n.addResourceBundle('en', 'translations', en, true, true)

export {en, zh, zhCN}
