import {withRouter} from 'react-router-dom'
import React from 'react'
import {inject, observer} from 'mobx-react'
import PropTypes from 'prop-types'
import {Button} from 'antd'
import {translate} from 'react-i18next'

@translate('translations')
@inject('authStore')
@withRouter
@observer
export default class Login extends React.Component {
  static propTypes = {
    authStore: PropTypes.object,
    t: PropTypes.func.isRequired
  }

  handleEmailChange = e => this.props.authStore.setEmail(e.target.value)

  handlePasswordChange = e => this.props.authStore.setPassword(e.target.value)

  handleSubmitForm = (e) => {
    e.preventDefault()
    // TODO 异步跳转最佳实践
    this.props.authStore.login()
    // .then(() => this.props.history.replace('/'))
  }

  render () {
    const {values, inProgress} = this.props.authStore
    const {t} = this.props
    return (
      <div >
        <h1>Sign In</h1>
        <form onSubmit={this.handleSubmitForm}>
          <fieldset>

            <fieldset >
              <input
                type="email"
                placeholder="Email"
                value={values.email}
                onChange={this.handleEmailChange}
              />
            </fieldset>

            <fieldset >
              <input
                type="password"
                placeholder="Password"
                value={values.password}
                onChange={this.handlePasswordChange}
              />
            </fieldset>

            <Button
              type="submit"
              disabled={inProgress}
            >
              {t('login')}
            </Button>

          </fieldset>
        </form>
      </div>
    )
  }
}
