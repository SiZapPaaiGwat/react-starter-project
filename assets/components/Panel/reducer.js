import Reduxis from 'reduxis'

let reduxis = new Reduxis.Component({
  initialState: {
    mode: 'chart',
    datalist: []
  },
  placeholders: [
    'newPlayer',
    'activePlayer'
  ]
})

reduxis.addSyncHandler({
  actionName: 'switchMode',
  reducer: function (state) {
    return {
      ...state,
      mode: state.mode === 'chart' ? 'table' : 'chart'
    }
  }
})
