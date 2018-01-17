import {autorun} from 'mobx'
import authStore from './authStore'
import commonStore from './commonStore'
import userStore from './userStore'
import uiStore from './uiStore'

autorun(() => {
  document.body.setAttribute('data-theme', uiStore.theme)
})

export default {
  authStore,
  commonStore,
  userStore,
  uiStore
}
