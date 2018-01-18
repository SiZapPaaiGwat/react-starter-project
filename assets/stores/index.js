import {autorun} from 'mobx'
import authStore from './authStore'
import commonStore from './commonStore'
import userStore from './userStore'
import uiStore from './uiStore'
import {CUSTOM_BODY_THEME_ATTR} from 'constants'

autorun(() => {
  document.body.setAttribute(CUSTOM_BODY_THEME_ATTR, uiStore.themeName)
})

export default {
  authStore,
  commonStore,
  userStore,
  uiStore
}
