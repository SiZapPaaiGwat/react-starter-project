import ReactDOM from 'react-dom'
import promiseFinally from 'promise.prototype.finally'
import React from 'react'
// import {useStrict} from 'mobx'
import App from './containers/App'
import 'styles/main.css'
// import 'utils/globalThemeSkin'

promiseFinally.shim()
// useStrict(true)

ReactDOM.render(<App />, document.getElementById('container'))
