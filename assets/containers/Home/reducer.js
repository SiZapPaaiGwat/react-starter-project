import {post} from 'dejs/lib/ajax'
import Reduxis from 'reduxis'

let reduxis = new Reduxis({
  initialState: {
    showModal: false,
    datalist: []
  },
  placeholder: 'user'
})

reduxis.addSyncHandler({
  actionName: 'toggleUserDialog',
  reducer: function (state) {
    return {
      ...state,
      showModal: !state.showModal
    }
  }
})

reduxis.addAsyncHandler({
  actionName: 'removeUser',
  actionCreator: async (dispatch, getState, params) => {
    return await post('/user/delete', {uid: params})
  },
  reducer: function (state, action) {
    return {
      ...state,
      datalist: state.datalist.filter(item => item.uid !== action.meta.params)
    }
  }
})

reduxis.addAsyncHandler({
  actionName: 'insertUser',
  actionCreator: async (dispatch, getState, params) => {
    let res = await post('/user/create', params)
    return res.body
  },
  reducer: function (state, action) {
    return {
      ...state,
      datalist: state.datalist.concat(action.payload.content)
    }
  }
})
