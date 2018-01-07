import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import Header from '../components/Header'
import Home from './Home'
import Login from './Login'

@withRouter
@observer
export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    )
  }
}
