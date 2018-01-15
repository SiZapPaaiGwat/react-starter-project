import {observable} from 'mobx'

class CommonStore {
  @observable appName = 'React-Starter-Project'
}

export default new CommonStore()
