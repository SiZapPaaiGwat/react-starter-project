import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {polyfill} from 'es6-promise'
import {message} from 'antd'
import {ajaxSetup} from 'dejs/lib/ajax'

import routes from './redux/routes'
import createStore from './redux/store'
import startMock from './mocks'

polyfill()

message.config({
  top: 400,
  duration: 1800
})

/**
 * 正式java环境会统一部署
 * 域名中会多加一个目录作为系统标识
 */
ajaxSetup({
  contextPath: App.CONTEXT_PATH || '',
  ajaxSuccess: (json) => {
  },
  ajaxError: (err) => {
    console.error(err)
  }
})

/**
 * 开发阶段mock可以选择打开或者关闭
 * url中的查询字符串包含mock则开启，默认关闭
 */
if (App.useMock) {
  startMock()
}

const store = createStore()

let Root = React.createClass({
  render () {
    return (
      <Provider store={store}>
        {routes}
      </Provider>
    )
  }
})

ReactDOM.render(<Root />, document.querySelector('#container'))
