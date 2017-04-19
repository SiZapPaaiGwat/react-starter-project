/**
 * 全局路由配置
 * 与redux相关的不要写在此文件中
 */

import React from 'react'
import {Route, Router, hashHistory, IndexRedirect} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import _ from 'lodash'
import './reducers/user'
import '../components/Panel/reducer'
import Reduxis from 'reduxis'
import Layout from 'containers/Layout'
import Home from 'containers/Home'

function mapStateToProps (state) {
  return {
    states: _.assign({}, state)
  }
}

function mapDispatchToProps (dispatch) {
  let actions = bindActionCreators(Reduxis.assemble().actions, dispatch)
  return {actions}
}

const Root = connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout)

// function requireAuth (nextState, replace) {
//   if (App.accountId === '' || App.userName === '') {
//     replace({
//       pathname: '/login'
//     })
//     return false
//   }
// }

export default (
  <Router history={hashHistory}>
    <Route path="/" component={Root}>
      <IndexRedirect to="Home" />
      <Route path="Home" breadcrumbName="首页" component={Home} />
    </Route>
  </Router>
)
