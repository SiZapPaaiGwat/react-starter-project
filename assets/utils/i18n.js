import i18n from 'i18next'
import Backend from 'i18next-xhr-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import {reactI18nextModule} from 'react-i18next'
import {IS_DEV} from 'utils'

const prefix = IS_DEV ? '/public' : ''

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
    debug: true,
    interpolation: {
      escapeValue: false
    },
    react: {
      wait: true
    }
  })
