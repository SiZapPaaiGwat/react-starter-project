import {observable, action} from 'mobx'
import userStore from './userStore'
import ajax from 'utils/ajax'

async function sleep (ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms)
  })
}

class AuthStore {
  @observable inProgress = false
  @observable errors = null
  @observable username = ''
  @observable password = ''

  @action setUsername (username) {
    this.username = username
  }

  @action setPassword (password) {
    this.password = password
  }

  @action reset () {
    this.username = ''
    this.password = ''
    this.inProgress = false
    this.errors = null
  }

  @action mockLogin () {
    this.inProgress = true
    this.errors = null
    // 模拟异步操作
    return sleep(3000).then(() => {
      this.inProgress = false
    })
  }

  @action login () {
    this.inProgress = true
    this.errors = null
    return ajax.get('/').then(res => {
    }).catch(err => {
      this.errors = [
        err
      ]
    }).finally(() => {
      this.inProgress = false
    })
  }

  @action logout () {
    userStore.clear()
  }
}

export default new AuthStore()
