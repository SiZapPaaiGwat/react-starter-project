import {observable, action, runInAction} from 'mobx'

class UserStore {
  @observable currentUser = null
  @observable updatingUser = false

  @action updateUser (newUser) {
    this.updatingUser = true
    setTimeout(() => {
      runInAction(() => {
        this.updatingUser = false
        this.currentUser = newUser
      })
    }, 1000)
  }

  @action clear () {
    this.currentUser = null
  }
}

export default new UserStore()
