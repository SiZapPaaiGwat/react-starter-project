import {observable, action} from 'mobx'
import * as constants from 'constants'

class UIStore {
  /* 主题名称 */
  @observable theme = constants.DEFAULT_THEME

  /* 模态窗口是否打开 */
  @observable isModalOpen = false

  @action toggleModal () {
    this.isModalOpen = !this.isModalOpen
  }

  @action changeTheme (theme) {
    if (constants.THEME_LIST.indexOf(theme) === -1) {
      throw new Error('Not support theme name')
    }

    this.theme = theme
  }
}

export default new UIStore()
