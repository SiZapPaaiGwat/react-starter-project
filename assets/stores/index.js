import {autorun} from 'mobx'
import authStore from './authStore'
import commonStore from './commonStore'
import userStore from './userStore'
import uiStore from './uiStore'
import {CUSTOM_BODY_THEME_ATTR} from 'constants'

const ws = new WebSocket('ws://localhost:3000')
ws.onopen = () => {
  console.log('opening...')
}
ws.onmessage = e => {
  // TODO update store
  console.log(e.data)
}
ws.onclose = e => {
  console.log('closing...')
}

autorun(() => {
  document.body.setAttribute(CUSTOM_BODY_THEME_ATTR, uiStore.themeName)
})

export default {
  authStore,
  commonStore,
  userStore,
  uiStore
}
