import {THEME_LIST} from 'constants'

const hoverColorLight = 'red'
const hoverColorDark = 'green'

/*
 * 主题配置项目
 * 产生的 css 会直接以 style 节点插入到 head 中不参与打包过程
 **/
export const themes = {
  textColor: {
    light: '#333',
    dark: '#fff'
  },
  bgColor: {
    light: '#fff',
    dark: '#333'
  },
  anchorColor: {
    light: 'blue',
    dark: 'yellow'
  },
  hoverColor: {
    light: hoverColorLight,
    dark: hoverColorDark
  }
}

/**
 * 主题皮肤模板，避免为每个模板重复设置
 * 这里配置 global 样式
 */
export const globalThemeSkinTemplate = `
  <%=themeSelector%> a:hover {
    color: <%=theme.hoverColor || ''%>;
  }

  <%=themeSelector%> a {
    color: <%=theme.anchorColor || ''%>;
  }

  <%=themeSelector%> h1, h2, h3 {
    color: <%=theme.textColor || ''%>;
  }
`

const target = {}
for (let key in themes) {
  THEME_LIST.forEach(mode => {
    target[mode] = target[mode] || {}
    target[mode][key] = themes[key][mode]
  })
}

export default target
