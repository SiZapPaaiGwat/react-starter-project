import React from 'react'
import {Switch, Route, withRouter} from 'react-router-dom'
import {observer} from 'mobx-react'
import 'utils/i18n'
import {IS_DEV} from 'utils'
import DevTools from 'mobx-react-devtools'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Home from './Home'
import Login from './Login'
import styles from './app.css'

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

        <Footer />

        {
          IS_DEV ? <DevTools /> : null
        }

      </div>
    )
  }
}
