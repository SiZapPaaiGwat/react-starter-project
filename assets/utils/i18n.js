import i18n from 'i18next'
import Backend from 'i18next-xhr-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import {reactI18nextModule} from 'react-i18next'
import {IS_DEV_MODE} from 'constants'

const prefix = IS_DEV_MODE ? '/public' : ''

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(reactI18nextModule)
  .init({
    fallbackLng: 'en',
    backend: {
      loadPath: `${prefix}/locals/{{lng}}/{{ns}}.json`
    },
    ns: ['translations'],
    defaultNS: 'translations',
    debug: IS_DEV_MODE,
    interpolation: {
      escapeValue: false
    },
    react: {
      wait: true
    }
  })
