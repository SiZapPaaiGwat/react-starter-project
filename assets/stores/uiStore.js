import {observable, action} from 'mobx'

class UIStore {
  @observable isModalOpen = false

  @action toggleModal () {
    this.isModalOpen = !this.isModalOpen
  }
}

export default new UIStore()
