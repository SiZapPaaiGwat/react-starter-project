import React from 'react'
import {Switch, Route, HashRouter as Router} from 'react-router-dom'
import {observer, Provider} from 'mobx-react'
import {ThemeProvider} from 'styled-components'
import stores from 'stores'
import {IS_DEV_MODE} from 'constants'
import DevTools from 'mobx-react-devtools'
import Header from 'components/Header'
import Footer from 'components/Footer'
import {Wrapper} from 'components/styled'
import Home from './Home'
import Login from './Login'
import StockChart from './StockChart'
import styles from './app.css'
import 'utils/i18n'

@observer
export default class App extends React.Component {
  render () {
    return (
      <Provider {...stores}>
        <Router>
          <ThemeProvider theme={stores.uiStore.theme}>
            <Wrapper className={styles.wrapper}>
              <Header />

              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/chart" component={StockChart} />
              </Switch>

              <Footer />

              {
                IS_DEV_MODE ? <DevTools /> : null
              }
            </Wrapper>
          </ThemeProvider>
        </Router>
      </Provider>
    )
  }
}
