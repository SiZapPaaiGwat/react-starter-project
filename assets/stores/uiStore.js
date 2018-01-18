import {observable, action} from 'mobx'
import * as constants from 'constants'
import themeSkins from 'configs/theme'

class UIStore {
  /* 主题名称 */
  @observable themeName = constants.DEFAULT_THEME

  @observable theme = themeSkins[constants.DEFAULT_THEME]

  /* 模态窗口是否打开 */
  @observable isModalOpen = false

  @action toggleModal () {
    this.isModalOpen = !this.isModalOpen
  }

  @action changeTheme (name) {
    if (constants.THEME_LIST.indexOf(name) === -1) {
      throw new Error('Not support theme name')
    }

    this.themeName = name
    this.theme = themeSkins[name]
  }
}

export default new UIStore()
