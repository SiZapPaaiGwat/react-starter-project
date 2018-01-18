import React from 'react'
import PropTypes from 'prop-types'
import {Switch, Route, withRouter} from 'react-router-dom'
import {observer, inject} from 'mobx-react'
import 'utils/i18n'
import {IS_DEV_MODE} from 'constants'
import DevTools from 'mobx-react-devtools'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Home from './Home'
import Login from './Login'
import styles from './app.css'
import themes from 'configs/theme'

@inject('uiStore')
@withRouter
@observer
export default class App extends React.Component {
  static propTypes = {
    uiStore: PropTypes.object.isRequired
  }

  render () {
    const theme = themes[this.props.uiStore.theme]
    const rules = {
      color: theme.textColor,
      backgroundColor: theme.bgColor
    }

    return (
      <div className={styles.wrapper} style={rules}>
        <Header />

        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={Home} />
        </Switch>

        <Footer />

        {
          IS_DEV_MODE ? <DevTools /> : null
        }

      </div>
    )
  }
}
