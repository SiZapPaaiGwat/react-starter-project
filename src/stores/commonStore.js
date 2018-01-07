import { observable, action, reaction } from 'mobx'

class CommonStore {

  @observable appName = 'React-Starter-Project'
  @observable token = window.localStorage.getItem('jwt')
  @observable appLoaded = false

  constructor() {
    // TODO
    reaction(
      () => this.token,
      token => {
        if (token) {
          window.localStorage.setItem('jwt', token)
        } else {
          window.localStorage.removeItem('jwt')
        }
      }
    )
  }

  @action setAppLoaded() {
    this.appLoaded = true
  }

}

export default new CommonStore()
