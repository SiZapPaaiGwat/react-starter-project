import _ from 'lodash'

let actionNameList = []
let startSuffix = '$$Start'
let errorSuffix = '$$Error'

function isValidActionName (name) {
  return _.isString(name) && /^[a-z]+[a-zA-Z$\d]+$/.test(name)
}

function prepareActionName (name) {
  if (!isValidActionName(name)) {
    throw new Error(`Invalid action name: ${name}, should match /^[a-z]+[a-zA-Z\\d]+$/.`)
  }

  if (actionNameList.indexOf(name) > -1) {
    throw new Error(`Existed action name: ${name}`)
  }

  actionNameList.push(name)
}

// function prepareReducer(reducer, actionName) {
//   if (!_.isFunction(reducer)) {
//     throw new Error(`Reducer is not a function for action: ${actionName}`)
//   }
// }

function getStartAction (name) {
  return `${name}${startSuffix}`
}

function getErrorAction (name) {
  return `${name}${errorSuffix}`
}

function getStartStateName (name) {
  return `${name}Loading`
}

function getErrorStateName (name) {
  return `${name}Error`
}

export default class Reduxis {
  constructor (opts) {
    this.initialState = {
      ...opts.initialState
    }
    this.handlers = []
  }

  addHandler ({actionName, reducer}) {
    prepareActionName(actionName)

    this.handlers.push({
      actionName,
      reducer,
      async: false
    })
  }

  addAsyncHandler ({actionName, reducer, actionCreator}) {
    prepareActionName(actionName)
    this.handlers.push({
      actionName,
      reducer,
      actionCreator,
      async: true
    })

    let startAction = getStartAction(actionName)
    let errorAction = getErrorAction(actionName)
    let startStateName = getStartStateName(actionName)
    let errorStateName = getErrorStateName(actionName)

    prepareActionName(startAction)
    prepareActionName(errorAction)

    this.handlers.push({
      actionName: startAction,
      reducer: function (state, action) {
        return {
          ...state,
          [startStateName]: true,
          [errorStateName]: false
        }
      }
    })
    this.handlers.push({
      actionName: errorAction,
      reducer: function (state, action) {
        return {
          ...state,
          [startStateName]: false,
          [errorStateName]: action.error || new Error('操作出错！')
        }
      }
    })

    this.initialState[startStateName] = false
    this.initialState[errorStateName] = null
  }

  getFinalReducer () {
    let handlers = this.handlers
    return (state, action) => {
      let defaultState = state || {...this.initialState}
      // thunk
      if (!action.type) {
        return defaultState
      }

      let handler = _.find(handlers, {actionName: action.type})
      if (!handler) {
        return defaultState
      }

      let updatedState = handler.reducer(defaultState, action)
      if (handler.async) {
        return {
          ...updatedState,
          // auto update state
          [getStartStateName(action.type)]: false,
          [getErrorStateName(action.type)]: null
        }
      }

      return updatedState
    }
  }

  getActionMap () {
    let handlers = this.handlers
    let map = {}
    handlers.forEach(item => {
      map[item.actionName] = item.async ? (params) => {
        return async (dispatch, getState) => {
          try {
            dispatch({
              type: getStartAction(item.actionName),
              meta: {
                params
              }
            })
            let json = await item.actionCreator(dispatch, getState, params)
            dispatch({
              type: item.actionName,
              payload: json,
              meta: {
                params
              }
            })
          } catch (e) {
            dispatch({
              type: getErrorAction(item.actionName),
              error: e,
              meta: {
                params
              }
            })
          }
        }
      } : (payload) => {
        return _.assign({
          type: item.actionName,
          payload
        })
      }
    })
    return map
  }
}
