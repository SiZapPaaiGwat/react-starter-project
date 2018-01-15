import {observable, action} from 'mobx'
import userStore from './userStore'

async function sleep (ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms)
  })
}

class AuthStore {
  @observable inProgress = false
  @observable errors = undefined
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
  }

  @action login () {
    this.inProgress = true
    this.errors = undefined
    // 模拟异步操作
    return sleep(3000).then(() => {
      this.inProgress = false
    })
  }

  @action logout () {
    userStore.clear()
  }
}

export default new AuthStore()
