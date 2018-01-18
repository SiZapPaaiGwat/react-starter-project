import _ from 'lodash'
import themes, {globalThemeSkinTemplate} from 'configs/theme'
import {THEME_LIST, CUSTOM_BODY_THEME_ATTR} from 'constants'
import {insertStyle} from './index'

const cssText = THEME_LIST.map(mode => {
  return _.template(globalThemeSkinTemplate)({
    theme: themes[mode],
    themeSelector: `[${CUSTOM_BODY_THEME_ATTR}="${mode}"]`
  })
}).join('\n')

insertStyle(cssText)
