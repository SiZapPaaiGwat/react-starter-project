import React from 'react'
import {Switch, Route, withRouter} from 'react-router-dom'
import {observer} from 'mobx-react'
import Header from '../components/Header'
import Home from './Home'
import Login from './Login'
import styles from '../styles/main.css'

@withRouter
@observer
export default class App extends React.Component {
  render () {
    return (
      <div className={styles.wrapper}>
        <Header />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    )
  }
}
