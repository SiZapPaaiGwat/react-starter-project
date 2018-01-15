import {observable, action, runInAction} from 'mobx'
import userStore from './userStore'

class AuthStore {
  @observable inProgress = false
  @observable errors = undefined

  @observable values = {
    username: '',
    email: '',
    password: ''
  }

  @action setUsername (username) {
    this.values.username = username
  }

  @action setEmail (email) {
    this.values.email = email
  }

  @action setPassword (password) {
    this.values.password = password
  }

  @action reset () {
    this.values.username = ''
    this.values.email = ''
    this.values.password = ''
  }

  @action login () {
    this.inProgress = true
    this.errors = undefined
    setTimeout(() => {
      runInAction(() => {
        this.inProgress = false
        userStore.updateUser({
          username: this.values.username,
          email: this.values.email
        })
      })
    }, 1000)
  }

  @action logout () {
    userStore.clear()
  }
}

export default new AuthStore()
