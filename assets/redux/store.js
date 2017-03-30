import {createStore, applyMiddleware, combineReducers} from 'redux'
import {createLogger} from 'redux-logger'
import thunk from 'redux-thunk'
import ajaxMiddleware from 'dejs/lib/redux-ajax-middleware'
import user from './reducers/user'

const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true,
  duration: true
})

let middlewares = [ajaxMiddleware, thunk]

// 放在最后，不然thunk的action会打印两次，产生干扰
if (process.env.NODE_ENV === 'development') {
  middlewares.push(loggerMiddleware)
}

// chrome redux的工具
const create = window.devToolsExtension
  ? window.devToolsExtension()(createStore)
  : createStore
let finalStoreCreator = applyMiddleware(...middlewares)(create)

export default (initialState) => {
  let finalReducer = combineReducers({
    user: user.getFinalReducer()
  })
  return finalStoreCreator(finalReducer, initialState)
}
