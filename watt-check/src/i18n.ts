import { createI18n } from 'vue-i18n'
import pl from './locales/pl'
import en from './locales/en'

const messages = {
  pl,
  en
}

const i18n = createI18n({
  legacy: false, // potrzebne do Composition API
  locale: 'pl',  // domyślny język
  fallbackLocale: 'en',
  messages
})

export default i18n
